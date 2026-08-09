/* FindRun landing page — vanilla JS, no dependencies.
   Interactions: sticky header, mobile nav, scroll-spy, reveal-on-scroll,
   holographic card tilt, single-open FAQ, waitlist validation. */
(function () {
  "use strict";

  // JS is available → let CSS reveal-hide the [data-reveal] elements.
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------- sticky header
  var header = document.querySelector("[data-header]");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", syncHeader, { passive: true });
    syncHeader();
  }

  // ------------------------------------------------------------- mobile nav
  var navToggle = document.querySelector("[data-nav-toggle]");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    var setNav = function (open) {
      navToggle.setAttribute("aria-expanded", String(open));
      siteNav.classList.toggle("is-open", open);
    };
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
    document.addEventListener("click", function (e) {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
    });
  }

  // -------------------------------------------------------------- scroll-spy
  var navLinks = Array.prototype.slice
    .call(document.querySelectorAll("[data-navlink]"));
  var sections = navLinks
    .map(function (link) {
      var href = link.getAttribute("href") || "";
      return href.charAt(0) === "#" ? document.querySelector(href) : null;
    })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var setActive = function (id) {
      navLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // --------------------------------------------------------- reveal on scroll
  var revealEls = Array.prototype.slice
    .call(document.querySelectorAll("[data-reveal]"));
  revealEls.forEach(function (el) {
    var delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.transitionDelay = (parseInt(delay, 10) * 90) + "ms";
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-revealed"); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  // ------------------------------------------------------ soft card tilt
  // Pointer position drives a gentle 3D tilt plus a soft light sweep
  // (the --mx/--my vars feed .card__sheen). Disabled under reduced-motion
  // and on touch, where a hover tilt only gets in the way.
  var finePointer = !window.matchMedia || window.matchMedia("(hover: hover)").matches;
  if (!reduceMotion && finePointer) {
    document.querySelectorAll("[data-card]").forEach(function (card) {
      var raf = null, pending = null;
      var apply = function () {
        raf = null;
        var r = card.getBoundingClientRect();
        var x = (pending.x - r.left) / r.width;   // 0..1
        var y = (pending.y - r.top) / r.height;   // 0..1
        x = Math.max(0, Math.min(1, x));
        y = Math.max(0, Math.min(1, y));
        var rx = (0.5 - y) * 10;                  // tilt up/down (gentle)
        var ry = (x - 0.5) * 12;                  // tilt left/right
        card.style.transform =
          "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" +
          ry.toFixed(2) + "deg) translateZ(4px)";
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      };
      var onMove = function (e) {
        pending = { x: e.clientX, y: e.clientY };
        if (!raf) raf = requestAnimationFrame(apply);
      };
      card.addEventListener("pointerenter", function () {
        card.classList.add("card--lit");
        card.style.animation = "none";   // pause the idle float while lit
      });
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", function () {
        card.classList.remove("card--lit");
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        card.style.transform = "";
        card.style.animation = "";       // resume float (hero card)
      });
    });
  }

  // -------------------------------------------------------- single-open FAQ
  var faq = document.querySelector("[data-faq]");
  if (faq) {
    var items = Array.prototype.slice.call(faq.querySelectorAll("details"));
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  // ---------------------------------------------------------- waitlist form
  var waitlist = document.querySelector("[data-waitlist]");
  if (waitlist) {
    var ok = document.querySelector("[data-waitlist-ok]");
    waitlist.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = waitlist.querySelector('input[type="email"]');
      if (!input || !input.value || input.value.indexOf("@") === -1) {
        if (input) input.focus();
        return;
      }
      waitlist.hidden = true;
      if (ok) ok.hidden = false;
    });
  }
})();
