/* Navigation & footer partagés sur toutes les pages */
const isRoot = !window.location.pathname.includes('/pages/');
const base = isRoot ? '' : '../';

const NAV_HTML = `
<div class="secondary-bar">
  <div class="container secondary-inner">
    <div class="secondary-left">
      <a href="${base}index.html">GFS Groupe</a>
      <a href="${base}pages/carrieres.html">Carrières</a>
      <a href="${base}pages/agences.html">Localisateur de GAB / Agences</a>
    </div>
    <div class="secondary-right">
      <div class="country-selector">
        <span class="flag">🇨🇲</span><span>CAMEROUN</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <button class="search-btn" id="searchToggle"><i class="fas fa-search"></i></button>
    </div>
  </div>
  <div class="search-bar" id="searchBar">
    <div class="container">
      <input type="text" placeholder="Rechercher un produit, service, agence..." id="searchInput" />
      <button class="search-submit"><i class="fas fa-search"></i> Rechercher</button>
      <button class="search-close" id="searchClose"><i class="fas fa-times"></i></button>
    </div>
  </div>
</div>

<nav class="navbar" id="navbar">
  <div class="container navbar-inner">
    <a href="${base}pages/banque-en-ligne.html" class="btn-online-banking">
      <i class="fas fa-lock"></i> BANQUE EN LIGNE
    </a>
    <a href="${base}index.html" class="logo">
      <div class="logo-icon">
        <span class="logo-g">G</span><span class="logo-f">F</span><span class="logo-s">S</span>
      </div>
      <div class="logo-text">
        <span class="logo-name">Global Financial Solution</span>
        <span class="logo-tagline">Votre partenaire de confiance</span>
      </div>
    </a>
    <ul class="nav-menu" id="navMenu">
      <li class="nav-item">
        <a href="${base}index.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item has-mega">
        <a href="#" class="nav-link">PARTICULIERS <i class="fas fa-chevron-down"></i></a>
        <div class="mega-dropdown">
          <div class="container">
            <div class="mega-grid-8">
              <a href="${base}pages/ouvrir-compte.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-university"></i></div>
                <span>Comptes Particuliers</span>
              </a>
              <a href="${base}pages/cartes.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-credit-card"></i></div>
                <span>Cartes Bancaires</span>
              </a>
              <a href="${base}pages/mobile-banking.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-mobile-alt"></i></div>
                <span>Banque Digitale</span>
              </a>
              <a href="${base}pages/transfert.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-exchange-alt"></i></div>
                <span>Transfert D'argent</span>
              </a>
              <a href="${base}pages/assurance.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-shield-alt"></i></div>
                <span>Solutions D'assurance GFS</span>
              </a>
              <a href="${base}pages/epargne.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-box"></i></div>
                <span>GFS EPack</span>
              </a>
              <a href="${base}pages/elite.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-crown"></i></div>
                <span>GFS Elite Program</span>
              </a>
              <a href="${base}pages/ladies.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-female"></i></div>
                <span>GFS Ladies Program</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item has-mega">
        <a href="#" class="nav-link">PME <i class="fas fa-chevron-down"></i></a>
        <div class="mega-dropdown">
          <div class="container">
            <div class="mega-grid-8">
              <a href="${base}pages/ouvrir-compte.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-building"></i></div>
                <span>Compte PME</span>
              </a>
              <a href="${base}pages/credit.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-chart-line"></i></div>
                <span>Crédit PME</span>
              </a>
              <a href="${base}pages/credit.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-file-invoice-dollar"></i></div>
                <span>Crédit Campagne</span>
              </a>
              <a href="${base}pages/corporate.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-handshake"></i></div>
                <span>GFS Business Pack</span>
              </a>
              <a href="${base}pages/mobile-banking.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-laptop"></i></div>
                <span>Digital Business</span>
              </a>
              <a href="${base}pages/finance-agricole.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-leaf"></i></div>
                <span>Finance Agricole</span>
              </a>
              <a href="${base}pages/corporate.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-tags"></i></div>
                <span>Affacturage</span>
              </a>
              <a href="${base}pages/assurance.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-shield-alt"></i></div>
                <span>Assurance Entreprise</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item has-mega">
        <a href="#" class="nav-link">ENTREPRISES <i class="fas fa-chevron-down"></i></a>
        <div class="mega-dropdown">
          <div class="container">
            <div class="mega-grid-8">
              <a href="${base}pages/ouvrir-compte.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-city"></i></div>
                <span>Compte Entreprise</span>
              </a>
              <a href="${base}pages/salaires.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-money-bill-wave"></i></div>
                <span>Virements Salaires</span>
              </a>
              <a href="${base}pages/salaires.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-users"></i></div>
                <span>Gestion Employés</span>
              </a>
              <a href="${base}pages/transfert.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-globe"></i></div>
                <span>Transferts Internationaux</span>
              </a>
              <a href="${base}pages/corporate.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-balance-scale"></i></div>
                <span>GFS Corporate Pack</span>
              </a>
              <a href="${base}pages/corporate.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-chart-bar"></i></div>
                <span>Cash Management</span>
              </a>
              <a href="${base}pages/credit.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-file-contract"></i></div>
                <span>Financement Projets</span>
              </a>
              <a href="${base}pages/mobile-banking.html" class="mega-item">
                <div class="mega-item-icon"><i class="fas fa-qrcode"></i></div>
                <span>Paiement Marchand QR</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item">
        <a href="${base}pages/a-propos.html" class="nav-link">A PROPOS DE NOUS</a>
      </li>
      <li class="nav-item">
        <a href="${base}pages/actualites.html" class="nav-link">ACTUALITES</a>
      </li>
      <li class="nav-item">
        <a href="${base}pages/contact.html" class="nav-link">AIDE</a>
      </li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-main">
    <div class="container">
      <div class="footer-cols">
        <div class="fc fc-brand">
          <div class="footer-logo-wrap">
            <div class="logo-icon"><span class="logo-g">G</span><span class="logo-f">F</span><span class="logo-s">S</span></div>
            <div class="logo-text">
              <span class="logo-name">Global Financial Solution</span>
              <span class="logo-tagline">Votre partenaire de confiance</span>
            </div>
          </div>
          <p>Institution de microfinance agréée COBAC/CEMAC. Nous mettons la finance au service de chaque Camerounais.</p>
          <div class="footer-social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
          <div class="footer-badges">
            <span class="f-badge"><i class="fas fa-shield-alt"></i> Agréé COBAC</span>
            <span class="f-badge"><i class="fas fa-check-circle"></i> Membre ANEMCAM</span>
          </div>
        </div>
        <div class="fc">
          <h5>PARTICULIERS</h5>
          <ul>
            <li><a href="${base}pages/ouvrir-compte.html">Comptes Particuliers</a></li>
            <li><a href="${base}pages/cartes.html">Cartes Bancaires</a></li>
            <li><a href="${base}pages/mobile-banking.html">Banque Digitale</a></li>
            <li><a href="${base}pages/transfert.html">Transfert D'argent</a></li>
            <li><a href="${base}pages/assurance.html">Solutions D'assurance</a></li>
            <li><a href="${base}pages/epargne.html">Épargne & DAT</a></li>
            <li><a href="${base}pages/elite.html">GFS Elite Program</a></li>
            <li><a href="${base}pages/ladies.html">GFS Ladies Program</a></li>
          </ul>
        </div>
        <div class="fc">
          <h5>PME & ENTREPRISES</h5>
          <ul>
            <li><a href="${base}pages/ouvrir-compte.html">Compte Entreprise</a></li>
            <li><a href="${base}pages/credit.html">Crédit PME</a></li>
            <li><a href="${base}pages/salaires.html">Virements Salaires</a></li>
            <li><a href="${base}pages/finance-agricole.html">Finance Agricole</a></li>
            <li><a href="${base}pages/corporate.html">GFS Corporate Pack</a></li>
            <li><a href="${base}pages/corporate.html">Affacturage</a></li>
          </ul>
        </div>
        <div class="fc">
          <h5>SERVICES DIGITAUX</h5>
          <ul>
            <li><a href="${base}pages/mobile-banking.html">Application GFS Mobile</a></li>
            <li><a href="${base}pages/mobile-banking.html">Paiement de Factures</a></li>
            <li><a href="${base}pages/mobile-banking.html">Paiement QR Marchand</a></li>
            <li><a href="${base}pages/transfert.html">Orange Money</a></li>
            <li><a href="${base}pages/transfert.html">MTN Mobile Money</a></li>
          </ul>
        </div>
        <div class="fc">
          <h5>GFS</h5>
          <ul>
            <li><a href="${base}pages/a-propos.html">À propos de nous</a></li>
            <li><a href="${base}pages/agences.html">Nos agences</a></li>
            <li><a href="${base}pages/actualites.html">Actualités</a></li>
            <li><a href="${base}pages/carrieres.html">Carrières</a></li>
            <li><a href="${base}pages/contact.html">Contact & Aide</a></li>
            <li><a href="${base}pages/agences.html">Localisateur GAB</a></li>
            <li style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1)"><a href="https://admin.gfinancials.com" target="_blank" rel="noopener" style="opacity:0.5;font-size:0.8em;letter-spacing:0.02em;"><i class="fas fa-lock" style="margin-right:5px;font-size:0.75em;"></i>Espace Administration</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-row">
      <p>© 2026 Global Financial Solution S.A. Tous droits réservés. | EMF Agréé COBAC N°EMF/2026/XXX</p>
      <div class="footer-legal-links">
        <a href="#">Mentions légales</a>
        <a href="#">Confidentialité</a>
        <a href="#">CGU</a>
        <a href="#">Tarifs & Frais</a>
        <a href="https://admin.gfinancials.com" target="_blank" rel="noopener" style="opacity:0.45;font-size:0.8em;"><i class="fas fa-lock" style="margin-right:4px;font-size:0.75em;"></i>Admin</a>
      </div>
    </div>
  </div>
</footer>
<a href="#" class="back-top" id="backTop"><i class="fas fa-chevron-up"></i></a>`;

// Inject nav and footer
document.getElementById('nav-placeholder')?.insertAdjacentHTML('afterend', NAV_HTML);
document.getElementById('nav-placeholder')?.remove();
document.getElementById('footer-placeholder')?.insertAdjacentHTML('afterend', FOOTER_HTML);
document.getElementById('footer-placeholder')?.remove();

// Init nav behavior after injection
window.addEventListener('load', initNav);
document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  const searchBar = document.getElementById('searchBar');
  document.getElementById('searchToggle')?.addEventListener('click', () => {
    searchBar?.classList.toggle('open');
    if (searchBar?.classList.contains('open')) document.getElementById('searchInput')?.focus();
  });
  document.getElementById('searchClose')?.addEventListener('click', () => searchBar?.classList.remove('open'));

  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
    backTop?.classList.toggle('show', window.scrollY > 400);
  });

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('open');
  });

  // Mark active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href').replace('../', '').replace('./', ''))) {
      link.classList.add('active-link');
    }
  });
}
