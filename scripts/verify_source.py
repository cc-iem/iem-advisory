"""Verify the copied files against the snapshot manifest and the live website."""

import concurrent.futures
import hashlib
import json
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = json.loads((ROOT / "SOURCE.json").read_text())


def verify(entry):
    path = entry["path"]
    local = (ROOT / path).read_bytes()
    if hashlib.sha256(local).hexdigest() != entry["sha256"]:
        return path + ": differs from the saved snapshot"
    response = subprocess.run(
        ["curl", "--silent", "--show-error", "--fail", "--location",
         "--retry", "2", "--max-time", "60", MANIFEST["source"] + path],
        capture_output=True,
        check=False,
    )
    if response.returncode:
        return path + ": could not retrieve live file: " + response.stderr.decode().strip()
    if local != response.stdout:
        return path + ": differs from the current live website"
    return None


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        failures = [failure for failure in pool.map(verify, MANIFEST["files"]) if failure]
    if failures:
        print("\n".join(failures))
        raise SystemExit(1)
    print("All {} files are byte-for-byte identical to the snapshot and live website.".format(
        len(MANIFEST["files"])))
