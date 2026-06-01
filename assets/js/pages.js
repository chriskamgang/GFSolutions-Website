/* JS commun – pages internes GFS */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== SIMULATEUR CRÉDIT (pages crédit) ===== */
  const simAmount   = document.getElementById('simAmount');
  const simDuration = document.getElementById('simDuration');
  const creditTypes = document.querySelectorAll('.credit-type-opt');

  function fmt(n) { return new Intl.NumberFormat('fr-CM').format(Math.round(n)) + ' FCFA'; }

  function calcCredit() {
    if (!simAmount) return;
    const P = parseFloat(simAmount.value);
    const n = parseInt(simDuration.value);
    const active = document.querySelector('.credit-type-opt.active');
    const r = parseFloat(active?.dataset.rate || 1.5) / 100;

    document.getElementById('simAmountVal').textContent   = fmt(P);
    document.getElementById('simDurationVal').textContent = n + ' mois';
    if (document.getElementById('resMontant')) document.getElementById('resMontant').textContent = fmt(P);
    if (document.getElementById('resDuree'))   document.getElementById('resDuree').textContent   = n + ' mois';

    const m = P * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
    if (document.getElementById('resMensualite')) document.getElementById('resMensualite').textContent = fmt(m);
    if (document.getElementById('resInterets'))   document.getElementById('resInterets').textContent   = fmt(m*n-P);
    if (document.getElementById('resTotal'))      document.getElementById('resTotal').textContent      = fmt(m*n);
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
  if (simAmount) calcCredit();

  /* ===== FILTRES AGENCES ===== */
  document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const city = btn.dataset.city;
      document.querySelectorAll('.agency-full-card').forEach(card => {
        card.style.display = (city === 'all' || card.dataset.city === city) ? 'block' : 'none';
      });
    });
  });

  /* ===== FORMULAIRES ===== */
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Demande envoyée avec succès !';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  });

  /* ===== SCROLL ANIMATIONS ===== */
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }, i*70);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .agency-full-card, .doc-item, .step, .ns-item').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
});
