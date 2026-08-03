/* GemRun landing page — vanilla JS, no dependencies.
   Interactions: sticky header, mobile nav, scroll-spy, reveal-on-scroll,
   stat counters, rarity tier tabs, single-open FAQ, waitlist validation. */

(function () {
  'use strict';

  // Signals JS is available; CSS only hides [data-reveal] under .js so the
  // page stays fully visible with scripts disabled.
  document.documentElement.classList.add('js');

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------ Header ------------------------------ */

  var header = document.querySelector('[data-header]');

  function syncHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* ---------------------------- Mobile nav ---------------------------- */

  var navToggle = document.querySelector('[data-nav-toggle]');
  var siteNav = document.getElementById('site-nav');

  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  navToggle.addEventListener('click', function () {
    setNav(!document.body.classList.contains('nav-open'));
  });

  siteNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setNav(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setNav(false);
  });

  document.addEventListener('click', function (event) {
    if (
      document.body.classList.contains('nav-open') &&
      !event.target.closest('.site-header')
    ) {
      setNav(false);
    }
  });

  /* ---------------------------- Scroll-spy ----------------------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('[data-navlink]')
  );
  var spied = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && spied.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    spied.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------- Reveal on scroll -------------------------- */

  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll('[data-reveal]')
  );

  revealEls.forEach(function (el) {
    var delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.setProperty('--reveal-delay', delay);
  });

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  /* --------------------------- Stat counters --------------------------- */

  var counters = Array.prototype.slice.call(
    document.querySelectorAll('[data-count-to]')
  );

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10);
    if (prefersReducedMotion || !isFinite(target)) {
      el.textContent = String(target);
      return;
    }
    var duration = 1200;
    var start = null;
    function tick(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var counting = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counting.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counting.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* -------------------------- Rarity tier tabs -------------------------- */

  var TIERS = [
    {
      xp: 10,
      respawn: 'Respawns daily, per runner',
      rule:
        'The everyday find — placeable anywhere on a route, back again ' +
        'tomorrow. Quartz keeps your home loop paying out and your streak alive.'
    },
    {
      xp: 25,
      respawn: 'Respawns daily, per runner',
      rule:
        'Worth a small detour. Daily respawns like Quartz, better XP — the ' +
        'backbone of streak multipliers.'
    },
    {
      xp: 75,
      respawn: 'Once per runner, per route',
      rule:
        'Sapphires sit at least 40% of the way into a route — a reason to ' +
        'finish what you started, and to keep trying new routes.'
    },
    {
      xp: 200,
      respawn: 'Once per runner, per route',
      rule:
        'Amethysts only live on genuinely hard ground: a steep sustained ' +
        'climb, or deep into a long route. If you collected one, you earned it.'
    },
    {
      xp: 500,
      respawn: 'One appearance, one winner',
      rule:
        'Embers are seeded by the system only — nobody can plant one for ' +
        'themselves. The first runner to reach it claims a unique first-find ' +
        'variant. Everyone else gets the story.'
    }
  ];

  var rarity = document.querySelector('[data-rarity]');

  if (rarity) {
    var tierButtons = Array.prototype.slice.call(
      rarity.querySelectorAll('[data-tier]')
    );
    var xpEl = rarity.querySelector('[data-tier-xp]');
    var respawnEl = rarity.querySelector('[data-tier-respawn]');
    var ruleEl = rarity.querySelector('[data-tier-rule]');

    function selectTier(index) {
      var tier = TIERS[index];
      if (!tier) return;
      tierButtons.forEach(function (button, i) {
        var active = i === index;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', String(active));
      });
      xpEl.textContent = String(tier.xp);
      respawnEl.textContent = tier.respawn;
      ruleEl.textContent = tier.rule;
    }

    tierButtons.forEach(function (button, index) {
      button.addEventListener('click', function () { selectTier(index); });
    });

    rarity.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      var current = tierButtons.findIndex(function (button) {
        return button.classList.contains('is-active');
      });
      var next =
        (current + (event.key === 'ArrowRight' ? 1 : -1) + TIERS.length) %
        TIERS.length;
      selectTier(next);
      tierButtons[next].focus();
    });
  }

  /* ------------------------- FAQ (single open) -------------------------- */

  var faq = document.querySelector('[data-faq]');

  if (faq) {
    var items = Array.prototype.slice.call(faq.querySelectorAll('details'));
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* --------------------------- Waitlist form ---------------------------- */

  var waitlist = document.querySelector('[data-waitlist]');

  if (waitlist) {
    var input = waitlist.querySelector('input[type="email"]');
    var msg = waitlist.querySelector('[data-waitlist-msg]');
    var submitButton = waitlist.querySelector('button[type="submit"]');
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    waitlist.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input.value.trim();

      if (!EMAIL.test(value)) {
        waitlist.classList.remove('is-success');
        waitlist.classList.add('is-error');
        msg.textContent = 'That doesn’t look like an email — try again?';
        input.focus();
        return;
      }

      // TODO: POST to the launch-list endpoint once the backend exposes one.
      waitlist.classList.remove('is-error');
      waitlist.classList.add('is-success');
      msg.textContent =
        'You’re on the list — we’ll ping you at ' + value + '.';
      input.disabled = true;
      submitButton.disabled = true;
    });

    input.addEventListener('input', function () {
      waitlist.classList.remove('is-error');
      if (!waitlist.classList.contains('is-success')) msg.textContent = '';
    });
  }

  /* ------------------------- Map capture demo --------------------------- */

  var demo = document.querySelector('[data-demo]');

  if (demo) {
    var route = demo.querySelector('#demo-route');
    var runner = demo.querySelector('[data-demo-runner]');
    var gemChip = demo.querySelector('[data-demo-gems]');
    var xpChip = demo.querySelector('[data-demo-xp]');
    var playBtn = demo.querySelector('[data-demo-play]');
    var stepEls = Array.prototype.slice.call(
      demo.querySelectorAll('.demo-step')
    );
    var CLAIM_RADIUS = 40; // matches the runner's "100 ft" ring in SVG units
    var DURATION = 9000;
    var routeLength = route.getTotalLength();

    // Project each gem onto the route: the path length at which the runner
    // is closest to it (gems sit exactly on the route, so this is exact).
    var demoGems = Array.prototype.slice
      .call(demo.querySelectorAll('.demo-gem'))
      .map(function (el) {
        var gx = parseFloat(el.getAttribute('data-x'));
        var gy = parseFloat(el.getAttribute('data-y'));
        var bestLen = 0;
        var bestDist = Infinity;
        for (var l = 0; l <= routeLength; l += 3) {
          var p = route.getPointAtLength(l);
          var d = Math.hypot(p.x - gx, p.y - gy);
          if (d < bestDist) { bestDist = d; bestLen = l; }
        }
        return { el: el, len: bestLen, xp: parseInt(el.getAttribute('data-xp'), 10) };
      });

    var demoPlaying = false;
    var demoPlayed = false;
    var claimedCount = 0;
    var xpTotal = 0;

    var updateChips = function () {
      gemChip.textContent = claimedCount + '/' + demoGems.length + ' gems';
      xpChip.textContent = xpTotal + ' XP';
    };

    var placeRunner = function (len) {
      var p = route.getPointAtLength(Math.min(len, routeLength));
      runner.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')');
    };

    var claimThrough = function (len) {
      demoGems.forEach(function (gem) {
        if (
          !gem.el.classList.contains('is-claimed') &&
          len >= gem.len - CLAIM_RADIUS
        ) {
          gem.el.classList.add('is-claimed');
          claimedCount += 1;
          xpTotal += gem.xp;
          updateChips();
          stepEls[1].classList.add('is-done');
          stepEls[1].classList.remove('is-active');
          stepEls[2].classList.add('is-active');
        }
      });
    };

    var resetDemo = function () {
      demoGems.forEach(function (gem) { gem.el.classList.remove('is-claimed'); });
      claimedCount = 0;
      xpTotal = 0;
      updateChips();
      placeRunner(0);
      stepEls.forEach(function (el, i) {
        el.classList.toggle('is-active', i === 0);
        el.classList.remove('is-done');
      });
    };

    var finishDemo = function () {
      placeRunner(routeLength);
      claimThrough(routeLength + CLAIM_RADIUS);
      stepEls.forEach(function (el) {
        el.classList.add('is-done');
        el.classList.remove('is-active');
      });
      demoPlaying = false;
      playBtn.disabled = false;
      playBtn.textContent = 'Replay the hunt';
    };

    var playDemo = function () {
      if (demoPlaying) return;
      demoPlaying = true;
      demoPlayed = true;
      resetDemo();
      playBtn.disabled = true;
      playBtn.textContent = 'Running…';

      if (prefersReducedMotion) {
        finishDemo();
        return;
      }

      var startTime = null;
      var frame = function (now) {
        if (startTime === null) startTime = now;
        var progress = Math.min((now - startTime) / DURATION, 1);
        var len = routeLength * progress;
        placeRunner(len);
        claimThrough(len);
        if (progress > 0.12) {
          stepEls[0].classList.add('is-done');
          stepEls[0].classList.remove('is-active');
          if (!stepEls[2].classList.contains('is-active')) {
            stepEls[1].classList.add('is-active');
          }
        }
        if (progress < 1) requestAnimationFrame(frame);
        else finishDemo();
      };
      requestAnimationFrame(frame);
    };

    playBtn.addEventListener('click', playDemo);

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      var demoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !demoPlayed) {
              playDemo();
              demoObserver.disconnect();
            }
          });
        },
        { threshold: 0.45 }
      );
      demoObserver.observe(demo);
    }
  }

  /* --------------------------- Screens carousel ------------------------- */

  var screens = document.querySelector('[data-screens]');

  if (screens) {
    var scrollByCard = function (direction) {
      var card = screens.querySelector('.screen-card');
      var step = card ? card.getBoundingClientRect().width + 20 : 320;
      screens.scrollBy({ left: step * direction, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    var prevBtn = document.querySelector('[data-screens-prev]');
    var nextBtn = document.querySelector('[data-screens-next]');

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    screens.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); scrollByCard(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); scrollByCard(-1); }
    });
  }

  /* -------------------------- Calorie estimator ------------------------- */

  var estimator = document.querySelector('[data-estimator]');

  if (estimator) {
    var weightInput = estimator.querySelector('[data-est-weight]');
    var distInput = estimator.querySelector('[data-est-dist]');
    var weightOut = estimator.querySelector('[data-est-weight-out]');
    var distOut = estimator.querySelector('[data-est-dist-out]');
    var kcalOut = estimator.querySelector('[data-est-kcal]');

    var updateEstimate = function () {
      var w = parseFloat(weightInput.value);
      var d = parseFloat(distInput.value);
      weightOut.textContent = w + ' kg';
      distOut.textContent = d + ' km';
      // Net running burn ≈ 1.036 kcal per kg per km on flat ground.
      kcalOut.textContent = String(Math.round(w * d * 1.036));
    };

    weightInput.addEventListener('input', updateEstimate);
    distInput.addEventListener('input', updateEstimate);
    updateEstimate();
  }

  /* ------------------------------ Modals -------------------------------- */

  var openModals = 0;

  var showModal = function (modal) {
    if (modal.hidden === false) return;
    modal.hidden = false;
    openModals += 1;
    document.body.style.overflow = 'hidden';
  };

  var hideModal = function (modal) {
    if (modal.hidden) return;
    modal.hidden = true;
    openModals = Math.max(0, openModals - 1);
    if (openModals === 0) document.body.style.overflow = '';
  };

  /* ------------------------ Cookie consent popup ------------------------- */

  var cookieModal = document.querySelector('[data-cookie]');

  if (cookieModal) {
    var CONSENT_KEY = 'gemrun-consent';

    var readConsent = function () {
      try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    };

    var chooseConsent = function (value) {
      try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* private mode */ }
      hideModal(cookieModal);
    };

    cookieModal
      .querySelector('[data-cookie-accept]')
      .addEventListener('click', function () { chooseConsent('all'); });

    cookieModal
      .querySelector('[data-cookie-essential]')
      .addEventListener('click', function () { chooseConsent('essential'); });

    Array.prototype.slice
      .call(document.querySelectorAll('[data-cookie-open]'))
      .forEach(function (button) {
        button.addEventListener('click', function () { showModal(cookieModal); });
      });

    if (!readConsent()) {
      setTimeout(function () { showModal(cookieModal); }, 900);
    }
  }

  /* -------------------------- Login & session --------------------------- */

  var loginModal = document.querySelector('[data-login]');

  if (loginModal) {
    var SESSION_KEY = 'gemrun-web-session';
    var loginButton = document.querySelector('[data-login-open]');
    var sessionChip = document.querySelector('[data-session]');
    var sessionInitial = document.querySelector('[data-session-initial]');
    var loginForm = loginModal.querySelector('[data-login-form]');
    var emailInput = loginModal.querySelector('[data-login-email]');
    var passwordInput = loginModal.querySelector('[data-login-password]');
    var loginMsg = loginModal.querySelector('[data-login-msg]');
    var loginSubmit = loginModal.querySelector('[data-login-submit]');
    var LOGIN_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var readSession = function () {
      try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
    };

    var syncSession = function () {
      var email = readSession();
      if (email) {
        loginButton.hidden = true;
        sessionChip.hidden = false;
        sessionInitial.textContent = email.charAt(0).toUpperCase();
        sessionChip.title = 'Signed in as ' + email;
      } else {
        loginButton.hidden = false;
        sessionChip.hidden = true;
      }
    };

    var openLogin = function () {
      showModal(loginModal);
      emailInput.focus();
    };

    var closeLogin = function () {
      hideModal(loginModal);
      loginForm.classList.remove('is-error');
      loginMsg.textContent = '';
    };

    loginButton.addEventListener('click', openLogin);

    Array.prototype.slice
      .call(loginModal.querySelectorAll('[data-login-close]'))
      .forEach(function (el) { el.addEventListener('click', closeLogin); });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !loginModal.hidden) closeLogin();
    });

    loginModal
      .querySelector('[data-apple-login]')
      .addEventListener('click', function () {
        loginForm.classList.remove('is-error');
        loginMsg.textContent = 'Sign in with Apple arrives with the public launch — use email for now.';
      });

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = emailInput.value.trim();

      if (!LOGIN_EMAIL.test(email)) {
        loginForm.classList.add('is-error');
        loginMsg.textContent = 'That doesn’t look like an email — try again?';
        emailInput.focus();
        return;
      }
      if (passwordInput.value.length < 6) {
        loginForm.classList.add('is-error');
        loginMsg.textContent = 'Passwords are at least 6 characters.';
        passwordInput.focus();
        return;
      }

      loginForm.classList.remove('is-error');
      loginMsg.textContent = '';
      loginSubmit.classList.add('is-loading');

      // TODO: replace the timeout with POST {API_BASE}/v1/auth/login once
      // the web backend is exposed; store the returned token instead.
      setTimeout(function () {
        try { localStorage.setItem(SESSION_KEY, email); } catch (e) { /* private mode */ }
        loginSubmit.classList.remove('is-loading');
        closeLogin();
        loginForm.reset();
        syncSession();
      }, 900);
    });

    document.querySelector('[data-logout]').addEventListener('click', function () {
      try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* private mode */ }
      syncSession();
    });

    syncSession();
  }

  /* ------------------------- Hero phone tilt ----------------------------- */

  var tiltEl = document.querySelector('[data-tilt]');

  if (tiltEl && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    tiltEl.addEventListener('mousemove', function (event) {
      var rect = tiltEl.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltEl.style.transform =
        'perspective(900px) rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 10).toFixed(2) + 'deg)';
    });
    tiltEl.addEventListener('mouseleave', function () {
      tiltEl.style.transform = '';
    });
  }

  /* ------------------------------ Footer ------------------------------- */

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
