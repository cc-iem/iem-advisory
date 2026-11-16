/* Reuse the planner's activity views inside the catalog's detail panel. */
(function () {
  'use strict';
  const T = window.CC_GREENFIELD, views = window.CCPlannerViews;
  const panel = document.getElementById('detailPanel');
  const products = new Map(window.CC_CATALOG.map(p => [p.id, p]));
  const connectionViews = new Map();
  let profileView = 'timeline';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const workstream = id => T.workstreams.find(w => w.id === id || w.code === id);
  function bodyHTML(id) {
    return views.body(id, profileView).replace(/id="planSearch"/g, 'id="profilePlanSearch"').replace(/id="workstreamResults"/g, 'id="profileWorkstreamResults"');
  }
  function open(id, opener) {
    const w = workstream(id);
    if (!w) return;
    profileView = 'timeline';
    window.CCApp.profile(
      '<div class="panel-head on-navy"><div class="panel-top"><span class="ref">Hospital workstream</span><button type="button" class="close-btn" data-action="close-panel" aria-label="Close">×</button></div>' +
      '<h2 class="panel-title" id="detailTitle">' + window.CCWorkstreamTags.html(w.id, window.CCProject.get().id) + '</h2><p class="panel-sub">Activities, deliverables and advisory support for this workstream.</p></div>' +
      '<div class="panel-body workstream-profile-body">' + bodyHTML(w.id) + '</div>' +
      '<div class="panel-foot"><a class="btn btn-primary" data-full-workstream-page href="#planner/workstreams/' + esc(w.code) + '">Open full workstream page →</a><button class="btn btn-secondary" data-profile-action="export">Export activities</button></div>', opener);
    panel.dataset.workstreamProfile = w.id;
  }
  function refresh() {
    if (panel.hidden || !panel.dataset.workstreamProfile) return;
    const id = panel.dataset.workstreamProfile, body = panel.querySelector('.panel-body');
    if (!body) return;
    const scroll = body.scrollTop;
    body.innerHTML = bodyHTML(id);
    body.scrollTop = scroll;
    panel.querySelector('#detailTitle').innerHTML = window.CCWorkstreamTags.html(id, window.CCProject.get().id);
  }
  function refreshActivities(id) {
    panel.querySelector('#profileWorkstreamResults').innerHTML = views.content(id, profileView);
  }
  function renderConnections(host) {
    const product = products.get(host.dataset.productConnections);
    if (!product) return;
    const view = connectionViews.get(product.id) || 'timeline';
    host.dataset.connectionsReady = 'true';
    host.innerHTML = '<div class="segmented connection-view-toggle" role="group" aria-label="Workstream connections view">' + ['table','timeline'].map(v => '<button type="button" data-profile-action="connection-view" data-view="' + v + '" aria-pressed="' + (view === v) + '">' + (v === 'table' ? 'Table' : 'Gantt') + '</button>').join('') + '</div>' +
      (view === 'timeline' ? '<p class="scope-note">Workstream date ranges from your hospital plan. Select a row or bar to inspect its activities.</p>' : '') + views.connections(product, view);
  }
  function hydrate(node) {
    if (node.nodeType !== 1 || !node.isConnected) return;
    if (node.matches('[data-product-connections]:not([data-connections-ready])')) renderConnections(node);
    node.querySelectorAll('[data-product-connections]:not([data-connections-ready])').forEach(renderConnections);
  }
  document.addEventListener('click', ev => {
    const host = ev.target.closest('[data-product-connections]');
    const connectionToggle = ev.target.closest('[data-profile-action="connection-view"]');
    if (host && connectionToggle) {
      ev.preventDefault(); ev.stopPropagation();
      connectionViews.set(host.dataset.productConnections, connectionToggle.dataset.view);
      renderConnections(host);
      host.querySelector('[data-view="' + connectionToggle.dataset.view + '"]').focus();
      return;
    }
    if (!ev.target.closest('#detailPanel[data-workstream-profile]')) return;
    const id = panel.dataset.workstreamProfile;
    const fullPage = ev.target.closest('[data-full-workstream-page]');
    if (fullPage) { window.CCApp.close(); return; }
    const neighbor = ev.target.closest('.ws-page-neighbors a');
    if (neighbor) {
      ev.preventDefault(); ev.stopPropagation();
      open(decodeURIComponent(neighbor.hash.split('/').pop()), neighbor);
      return;
    }
    const task = ev.target.closest('[data-task]');
    if (task) { ev.preventDefault(); ev.stopPropagation(); views.activity(task.dataset.task, id); return; }
    const action = ev.target.closest('[data-plan-action],[data-profile-action]');
    if (!action) return;
    const kind = action.dataset.planAction || action.dataset.profileAction;
    if (!['workstream-view','toggle-gantt','export','export-csv'].includes(kind)) return;
    ev.preventDefault(); ev.stopPropagation();
    if (kind === 'workstream-view') {
      profileView = action.dataset.view;
      panel.querySelectorAll('.workstream-view-toggle button').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.view === action.dataset.view));
        b.setAttribute('aria-checked', String(b.dataset.view === action.dataset.view));
      });
      refreshActivities(id);
    } else if (kind === 'toggle-gantt') { views.toggle(id); refreshActivities(id); }
    else views.export(id);
  }, true);
  document.addEventListener('input', ev => {
    if (ev.target.id !== 'profilePlanSearch' || !panel.dataset.workstreamProfile) return;
    views.setQuery(panel.dataset.workstreamProfile, ev.target.value);
    refreshActivities(panel.dataset.workstreamProfile);
  });
  new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(hydrate))).observe(panel, {childList:true, subtree:true});
  window.addEventListener('advisory-project-change', () => {
    refresh();
    panel.querySelectorAll('[data-product-connections]').forEach(renderConnections);
  });
  window.CCWorkstreamProfiles = {open, refresh};
  hydrate(panel);
})();
