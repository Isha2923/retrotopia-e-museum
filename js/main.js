// RETROTOPIA - shared site behaviour
(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- language menu (cosmetic - display only) ---- */
  var langSelect = document.querySelector(".lang-select");
  if (langSelect) {
    langSelect.querySelectorAll(".lang-menu button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var label = langSelect.querySelector("summary strong");
        if (label) label.textContent = btn.dataset.code || label.textContent;
        langSelect.removeAttribute("open");
      });
    });
    document.addEventListener("click", function (e) {
      if (!langSelect.contains(e.target)) langSelect.removeAttribute("open");
    });
  }

  /* ---- light / dark theme toggle ----
     The <html> element already has data-theme set by a tiny inline
     script in <head> on every page (reads localStorage before first
     paint, so there's no flash of the wrong theme). This just wires
     up the switch and keeps the choice in sync across pages. */
  var THEME_KEY = "retrotopia-theme";
  var root = document.documentElement;
  var modeSwitch = document.querySelector(".switch[data-mode-toggle]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (modeSwitch)
      modeSwitch.setAttribute(
        "aria-pressed",
        theme === "light" ? "true" : "false",
      );
  }

  if (modeSwitch) {
    applyTheme(root.getAttribute("data-theme") || "dark");
    modeSwitch.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---- active nav link by current file ---- */
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".main-nav a[href]").forEach(function (a) {
    var href = a.getAttribute("href").toLowerCase();
    if (href === here || (here === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---- reveal on scroll (single, restrained) ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---- back to top ---- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("visible", window.scrollY > 500);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- lightbox for gallery ---- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector(".lightbox-cap");
    document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var img = trigger.querySelector("img");
        lbImg.src = trigger.getAttribute("href") || (img && img.src);
        lbCap.textContent = trigger.dataset.caption || (img && img.alt) || "";
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---- gallery filter chips ---- */
  var chips = document.querySelectorAll("[data-filter]");
  var galleryItems = document.querySelectorAll("[data-category]");
  if (chips.length && galleryItems.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.remove("is-active");
        });
        chip.classList.add("is-active");
        var val = chip.dataset.filter;
        galleryItems.forEach(function (item) {
          var show = val === "all" || item.dataset.category === val;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- forms: prevent real submit, show a friendly confirmation ---- */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent =
          form.dataset.successMessage || "Thanks, we'll be in touch shortly.";
      }
      form.reset();
    });
  });

  /* ---- ticket quantity + total ---- */
  var ticketForm = document.querySelector("[data-ticket-form]");
  if (ticketForm) {
    var rows = ticketForm.querySelectorAll("[data-ticket-row]");
    var totalEl = ticketForm.querySelector("[data-ticket-total]");
    function recalc() {
      var total = 0;
      rows.forEach(function (row) {
        var price = parseFloat(row.dataset.price);
        var qty = parseInt(row.querySelector("input").value, 10) || 0;
        total += price * qty;
      });
      if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
    }
    rows.forEach(function (row) {
      row.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var input = row.querySelector("input");
          var step = btn.dataset.step === "down" ? -1 : 1;
          input.value = Math.max(0, parseInt(input.value, 10) + step);
          recalc();
        });
      });
    });
    recalc();
  }

  /* ---- current year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
