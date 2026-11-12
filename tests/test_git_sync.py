"""End-to-end checks for the repo-local git sync shortcut."""

import re
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
ANSI = re.compile(r"\x1b\[[0-9;]*m")


def run(cwd, *args, check=True):
    result = subprocess.run(
        args, cwd=cwd, text=True, capture_output=True, check=False
    )
    if check and result.returncode:
        raise AssertionError(f"{' '.join(args)} failed:\n{result.stdout}\n{result.stderr}")
    return result


def git(cwd, *args):
    return run(cwd, "git", *args).stdout.strip()


def configure_user(cwd):
    git(cwd, "config", "user.name", "Git Sync Test")
    git(cwd, "config", "user.email", "git-sync@example.test")


@unittest.skipUnless(shutil.which("git-lfs"), "git-lfs is required")
class GitSyncTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.remote = root / "remote.git"
        run(root, "git", "init", "--bare", "--initial-branch=main", str(self.remote))

        seed = root / "seed"
        run(root, "git", "clone", str(self.remote), str(seed))
        configure_user(seed)
        shutil.copytree(REPO_ROOT / "scripts", seed / "scripts")
        shutil.copy2(REPO_ROOT / "AGENTS.md", seed / "AGENTS.md")
        (seed / "tracked.txt").write_text("base\n", encoding="utf-8")
        git(seed, "add", "-A")
        git(seed, "commit", "-m", "Initial state")
        git(seed, "push", "-u", "origin", "main")

        self.local = root / "local"
        self.upstream = root / "upstream"
        for clone in (self.local, self.upstream):
            run(root, "git", "clone", str(self.remote), str(clone))
            configure_user(clone)
        run(self.local, "./scripts/bootstrap.sh")
        run(self.local, "./scripts/bootstrap.sh", "--check")

    def sync(self, message="Sync local changes"):
        return run(
            self.local,
            "git",
            "sync",
            "--message",
            message,
            check=False,
        )

    def assert_status(self, result, expected):
        self.assertEqual(expected, ANSI.sub("", result.stdout.splitlines()[-1]))

    def assert_remote_matches_head(self):
        remote_head = git(self.remote, "rev-parse", "refs/heads/main")
        self.assertEqual(remote_head, git(self.local, "rev-parse", "HEAD"))

    def test_commits_worktree_and_verifies_remote(self):
        (self.local / "local.txt").write_text("local\n", encoding="utf-8")
        result = self.sync("Add local file")
        self.assertEqual(0, result.returncode, result.stderr)
        self.assert_status(result, "SUCCESS")
        self.assertEqual("Add local file", git(self.local, "log", "-1", "--format=%s"))
        self.assert_remote_matches_head()

    def test_sync_without_new_changes(self):
        old_head = git(self.local, "rev-parse", "HEAD")
        result = self.sync()
        self.assertEqual(0, result.returncode, result.stderr)
        self.assert_status(result, "SUCCESS")
        self.assertEqual(old_head, git(self.local, "rev-parse", "HEAD"))
        self.assert_remote_matches_head()

    def prepare_empty_remote(self):
        root = Path(self.temp.name)
        self.remote = root / "initial-remote.git"
        self.local = root / "initial-local"
        run(root, "git", "init", "--bare", "--initial-branch=main", str(self.remote))
        run(root, "git", "clone", str(self.remote), str(self.local))
        configure_user(self.local)
        shutil.copytree(REPO_ROOT / "scripts", self.local / "scripts")
        shutil.copy2(REPO_ROOT / "AGENTS.md", self.local / "AGENTS.md")
        run(self.local, "./scripts/bootstrap.sh")
        run(self.local, "./scripts/bootstrap.sh", "--check")

    def test_plain_git_sync_initializes_empty_remote(self):
        self.prepare_empty_remote()
        (self.local / "local.txt").write_text("initial\n", encoding="utf-8")
        result = run(self.local, "git", "sync", check=False)
        self.assertEqual(0, result.returncode, result.stderr)
        self.assert_status(result, "SUCCESS")
        self.assert_remote_matches_head()
        self.assertEqual("Sync iem-advisory changes", git(self.local, "log", "-1", "--format=%s"))
        self.assertEqual("", git(self.local, "status", "--porcelain"))

    def test_initial_push_rejects_oversized_lfs_pointer(self):
        self.prepare_empty_remote()
        (self.local / "oversized.bin").write_text(
            "version https://git-lfs.github.com/spec/v1\n"
            f"oid sha256:{'0' * 64}\n"
            "size 104857600\n",
            encoding="ascii",
        )
        result = run(self.local, "git", "sync", check=False)
        self.assertNotEqual(0, result.returncode)
        self.assert_status(result, "FAIL")
        self.assertEqual("", git(self.remote, "for-each-ref", "refs/heads"))

    def test_replays_local_change_after_upstream_moves(self):
        (self.upstream / "upstream.txt").write_text("upstream\n", encoding="utf-8")
        git(self.upstream, "add", "upstream.txt")
        git(self.upstream, "commit", "-m", "Add upstream file")
        git(self.upstream, "push", "origin", "main")
        (self.local / "local.txt").write_text("local\n", encoding="utf-8")

        result = self.sync()
        self.assertEqual(0, result.returncode, result.stderr)
        self.assert_status(result, "SUCCESS")
        self.assertEqual("local\n", (self.local / "local.txt").read_text())
        self.assertEqual("upstream\n", (self.local / "upstream.txt").read_text())
        self.assert_remote_matches_head()

    def test_rejects_oversized_lfs_pointer_before_push(self):
        old_remote_head = git(self.remote, "rev-parse", "refs/heads/main")
        (self.local / "oversized.bin").write_text(
            "version https://git-lfs.github.com/spec/v1\n"
            f"oid sha256:{'0' * 64}\n"
            "size 104857600\n",
            encoding="ascii",
        )
        result = self.sync()
        self.assertNotEqual(0, result.returncode)
        self.assert_status(result, "FAIL")
        self.assertEqual(old_remote_head, git(self.remote, "rev-parse", "refs/heads/main"))


if __name__ == "__main__":
    unittest.main()
