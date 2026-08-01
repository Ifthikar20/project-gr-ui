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

  /* ------------------------------ Footer ------------------------------- */

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
