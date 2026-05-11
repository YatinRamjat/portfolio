(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navLinks = document.querySelector(".nav-links");
  var navToggle = document.querySelector(".nav-toggle");
  var openIcon = navToggle?.querySelector(".fa-bars");
  var closeIcon = navToggle?.querySelector(".fa-xmark");

  function setScrolledNav() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  setScrolledNav();
  window.addEventListener("scroll", setScrolledNav, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (openIcon) openIcon.hidden = isOpen;
      if (closeIcon) closeIcon.hidden = !isOpen;
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          navLinks.classList.remove("is-open");
          document.body.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
          if (openIcon) openIcon.hidden = false;
          if (closeIcon) closeIcon.hidden = true;
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        navLinks.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
        if (openIcon) openIcon.hidden = false;
        if (closeIcon) closeIcon.hidden = true;
      }
    });
  }

  /** Smooth scroll fallback for Safari / older browsers */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var top =
          target.getBoundingClientRect().top +
          window.scrollY -
          parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) -
          8;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  /** Intersection Observer — fade sections on scroll */
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    document.querySelectorAll(".fade-in-section").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".fade-in-section").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
