function __agentLog(runId, hypothesisId, location, message, data) {
  // #region agent log
  fetch('http://127.0.0.1:7864/ingest/5d906c46-a3fc-4e36-a31f-13908e2c183a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'a464cf' },
    body: JSON.stringify({
      sessionId: 'a464cf',
      runId: runId,
      hypothesisId: hypothesisId,
      location: location,
      message: message,
      data: data,
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion
}

__agentLog('pre-fix', 'H2', 'workday/index.html:script-init', 'Page script initialized', {
  path: window.location.pathname,
  hasCssLink: !!document.querySelector('link[href="assets/css/style.css"]')
});

function goTo(n) {
  __agentLog('pre-fix', 'H5', 'workday/index.html:goTo', 'Screen navigation triggered', { screen: n });
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + n).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Activate filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    __agentLog('pre-fix', 'H5', 'workday/index.html:filter-chip', 'Filter chip clicked', { label: chip.textContent.trim() });
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});
