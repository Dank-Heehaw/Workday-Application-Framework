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
  const routes = {
    1: 'index.html',
    2: 'application-form.html',
    3: 'documents.html',
    4: 'applications.html',
    5: 'confirmation.html',
    6: 'profile.html',
    7: 'review.html'
  };

  __agentLog('pre-fix', 'H5', 'workday/index.html:goTo', 'Navigation triggered', { screen: n });

  const target = routes[n];
  if (target) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage !== target) {
      window.location.href = target;
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Legacy fallback: toggle in-page screens only when no route is defined.
  const currentScreen = document.getElementById('screen-' + n);
  if (currentScreen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    currentScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) {
    return;
  }
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function toggleSignInModal(forceOpen) {
  const modal = document.getElementById('signin-modal');
  if (!modal) {
    return;
  }

  const isOpen = modal.classList.contains('show');
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;

  modal.classList.toggle('show', shouldOpen);
  document.body.classList.toggle('modal-open', shouldOpen);

  if (shouldOpen) {
    showSocialSignIn();
  }
}

function showSocialSignIn() {
  const socialView = document.getElementById('signin-social-view');
  const emailView = document.getElementById('signin-email-view');
  if (!socialView || !emailView) {
    return;
  }
  socialView.classList.add('active');
  emailView.classList.remove('active');
}

function showEmailSignIn() {
  const socialView = document.getElementById('signin-social-view');
  const emailView = document.getElementById('signin-email-view');
  if (!socialView || !emailView) {
    return;
  }
  socialView.classList.remove('active');
  emailView.classList.add('active');
}

function runModalSignInDemo(buttonEl) {
  const emailInput = document.getElementById('modal-email');
  const passwordInput = document.getElementById('modal-password');
  if (!emailInput || !passwordInput) {
    return;
  }

  if (buttonEl) {
    buttonEl.disabled = true;
  }

  const demoEmail = 'alex.johnson@email.com';
  const demoPassword = 'Workday2026!';
  emailInput.value = '';
  passwordInput.value = '';

  let emailIndex = 0;
  let passwordIndex = 0;

  const typeEmail = setInterval(() => {
    emailInput.value += demoEmail[emailIndex];
    emailIndex += 1;

    if (emailIndex >= demoEmail.length) {
      clearInterval(typeEmail);
      const typePassword = setInterval(() => {
        passwordInput.value += demoPassword[passwordIndex];
        passwordIndex += 1;

        if (passwordIndex >= demoPassword.length) {
          clearInterval(typePassword);
          setTimeout(() => {
            toggleSignInModal(false);
            document.querySelectorAll('.js-signin-trigger').forEach(btn => {
              btn.textContent = 'Alex J.';
            });
            showToast('Signed in successfully');
            if (buttonEl) {
              buttonEl.disabled = false;
            }
          }, 300);
        }
      }, 55);
    }
  }, 45);
}

// Activate filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    __agentLog('pre-fix', 'H5', 'workday/index.html:filter-chip', 'Filter chip clicked', { label: chip.textContent.trim() });
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});
