(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function getCurrentPage() {
    const path = (window.location.pathname || "").split("/").pop() || "index.html";
    return path.toLowerCase();
  }

  function setActiveNav() {
    const current = getCurrentPage();
    const links = $$('a[data-nav]');
    links.forEach(a => {
      const href = (a.getAttribute('href') || "").toLowerCase();
      a.classList.toggle('active', href === current);
    });
  }

  function setupMobileMenu() {
    const btn = $('[data-hamburger]');
    const panel = $('[data-mobile-panel]');
    if (!btn || !panel) return;

    const toggle = () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', toggle);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // close when navigating
    $$('a', panel).forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  function setupReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(el => obs.observe(el));
  }

  function setupSkillBars() {
    const bars = $$('.bar-fill[data-level]');
    if (!bars.length) return;

    bars.forEach(b => {
      const level = b.getAttribute('data-level') || '0%';
      b.style.setProperty('--level', level);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.classList.add('filled');
          obs.unobserve(fill);
        }
      });
    }, { threshold: 0.35 });

    bars.forEach(b => obs.observe(b));
  }

  function setupPortfolioFilters() {
    const wrap = $('[data-portfolio]');
    if (!wrap) return;

    const buttons = $$('[data-filter]');
    const cards = $$('[data-project]');

    const setActive = (btn) => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
    };

    const apply = (filter) => {
      const f = (filter || 'all').toLowerCase();
      cards.forEach(card => {
        const type = (card.getAttribute('data-project') || 'all').toLowerCase();
        const show = f === 'all' || type === f;
        card.style.display = show ? '' : 'none';
      });
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        setActive(btn);
        apply(filter);
      });
    });

    // default
    const active = buttons.find(b => b.classList.contains('active')) || buttons[0];
    if (active) apply(active.getAttribute('data-filter'));
  }

  function setupContactForm() {
    const form = $('[data-contact-form]');
    if (!form) return;

    const toast = $('[data-toast]');
    const showToast = (msg) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      window.clearTimeout(showToast._t);
      showToast._t = window.setTimeout(() => toast.classList.remove('show'), 2600);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const subject = String(fd.get('subject') || '').trim();
      const message = String(fd.get('message') || '').trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields.');
        return;
      }
      showToast('Message queued (demo). Replace with real backend later.');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
    setActiveNav();
    setupMobileMenu();
    setupReveal();
    setupSkillBars();
    setupPortfolioFilters();
    setupContactForm();
  });
})();

