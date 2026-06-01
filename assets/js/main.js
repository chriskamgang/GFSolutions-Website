/* =============================================
   GFS – Global Financial Solution – main.js
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== BARRE DE RECHERCHE ===== */
  const searchBar    = document.getElementById('searchBar');
  const searchToggle = document.getElementById('searchToggle');
  const searchClose  = document.getElementById('searchClose');

  searchToggle?.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) document.getElementById('searchInput')?.focus();
  });
  searchClose?.addEventListener('click', () => searchBar.classList.remove('open'));

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
    backTop?.classList.toggle('show', window.scrollY > 400);
  });

  /* ===== HAMBURGER ===== */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  navMenu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ===== HERO SLIDER ===== */
  const slides = document.querySelectorAll('.hero-slide');
  const sdots  = document.querySelectorAll('.sdot');
  let cur = 0, timer;

  function goSlide(n) {
    slides[cur].classList.remove('active');
    sdots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    sdots[cur].classList.add('active');
  }
  function next() { goSlide(cur + 1); }
  function prev() { goSlide(cur - 1); }
  function startTimer() { clearInterval(timer); timer = setInterval(next, 5500); }

  document.getElementById('heroNext')?.addEventListener('click', () => { next(); startTimer(); });
  document.getElementById('heroPrev')?.addEventListener('click', () => { prev(); startTimer(); });
  sdots.forEach((d, i) => d.addEventListener('click', () => { goSlide(i); startTimer(); }));
  startTimer();

  /* ===== SIMULATEUR CRÉDIT ===== */
  const simAmount   = document.getElementById('simAmount');
  const simDuration = document.getElementById('simDuration');
  const creditTypes = document.querySelectorAll('.credit-type-opt');

  function fmt(n) { return new Intl.NumberFormat('fr-CM').format(Math.round(n)) + ' FCFA'; }

  function calcCredit() {
    const P = parseFloat(simAmount?.value || 1000000);
    const n = parseInt(simDuration?.value || 24);
    const active = document.querySelector('.credit-type-opt.active');
    const r = parseFloat(active?.dataset.rate || 1.5) / 100;

    document.getElementById('simAmountVal').textContent   = fmt(P);
    document.getElementById('simDurationVal').textContent = n + ' mois';
    document.getElementById('resMontant').textContent     = fmt(P);
    document.getElementById('resDuree').textContent       = n + ' mois';

    if (r === 0) {
      const m = P / n;
      document.getElementById('resMensualite').textContent = fmt(m);
      document.getElementById('resInterets').textContent   = fmt(0);
      document.getElementById('resTotal').textContent      = fmt(P);
    } else {
      const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      document.getElementById('resMensualite').textContent = fmt(m);
      document.getElementById('resInterets').textContent   = fmt(m * n - P);
      document.getElementById('resTotal').textContent      = fmt(m * n);
    }
  }

  simAmount?.addEventListener('input', calcCredit);
  simDuration?.addEventListener('input', calcCredit);
  creditTypes.forEach(opt => {
    opt.addEventListener('click', () => {
      creditTypes.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      calcCredit();
    });
  });
  calcCredit();

  /* ===== CONTACT FORM ===== */
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-cf-submit');
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès !';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
      btn.style.background = '';
      e.target.reset();
    }, 3500);
  });

  /* ===== SCROLL ANIMATIONS ===== */
  const animEls = document.querySelectorAll(
    '.service-card, .news-card, .stat-item, .pillar, .contact-card, .acc-type, .mega-item'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
