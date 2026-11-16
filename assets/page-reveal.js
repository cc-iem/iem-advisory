/* Stagger visible content without changing layout or the schedule's bar widths. */
(function () {
  'use strict';
  const surfaces = '#top, #detailPanel, #cartPanel, #activityDialog';
  const items = 'h1, h2, h3, h4, p, li, tr, dl > div, [role="row"], .gantt-header, .gantt-row, .option, .planner-stat, .ws-overview-card, .offering-row, .form-field, .panel-foot';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet();
  let queued = false;
  function reveal(elements) {
    elements.forEach((element, index) => {
      element.classList.remove('enter-pending');
      if (motion.matches) return;
      const delay = Math.min(index, 9) * 35;
      element.style.setProperty('--enter-delay', delay + 'ms');
      element.classList.add('enter-item');
      element.querySelectorAll('.gantt-bar:not(.milestone)').forEach(bar => {
        bar.style.setProperty('--enter-delay', (delay + 90) + 'ms');
        bar.classList.add('enter-bar');
      });
    });
  }
  const viewport = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
    visible.forEach(element => viewport.unobserve(element));
    reveal(visible);
  }, {threshold:0, rootMargin:'0px 0px -12px 0px'}) : null;
  function scan() {
    queued = false;
    document.querySelectorAll(surfaces).forEach(surface => {
      if (surface.closest('[hidden]') || !surface.getClientRects().length) return;
      const fresh = [...surface.querySelectorAll(items)].filter(element => {
        if (seen.has(element) || element.closest('[hidden], details:not([open])') || !element.getClientRects().length) return false;
        if (element.closest('.model-panel') && !element.closest('.model-workstream-timeline')) return false;
        // Animate a whole row/card once, keeping its tags and text together.
        const parent = element.parentElement.closest(items);
        return !parent || !surface.contains(parent);
      });
      fresh.forEach(element => seen.add(element));
      if (!viewport || motion.matches) reveal(fresh);
      else fresh.forEach(element => { element.classList.add('enter-pending'); viewport.observe(element); });
    });
  }
  function queue() {
    if (!queued) { queued = true; requestAnimationFrame(scan); }
  }
  new MutationObserver((records = []) => {
    if (viewport) records.forEach(record => record.removedNodes?.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches('.enter-pending')) viewport.unobserve(node);
      node.querySelectorAll('.enter-pending').forEach(element => viewport.unobserve(element));
    }));
    queue();
  }).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['hidden','open']});
  motion.addEventListener('change', () => {
    if (motion.matches) document.querySelectorAll('.enter-pending, .enter-item, .enter-bar').forEach(element => {
      element.classList.remove('enter-pending','enter-item','enter-bar');
      viewport?.unobserve(element);
    });
    queue();
  });
  queue();
})();
