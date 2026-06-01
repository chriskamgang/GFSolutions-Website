/* Layout commun espace client — sidebar HTML */
function renderSidebar(activePage) {
  const client = getClient();
  const firstName = (client && client.firstName) || '';
  const lastName  = (client && client.lastName)  || '';
  const clientNum = (client && client.clientNumber) || 'Client GFS';
  const fullName  = (firstName + ' ' + lastName).trim() || clientNum;
  const avatar    = fullName[0].toUpperCase();

  const pages = [
    { id: 'index',         href: 'index.html',         icon: 'fa-tachometer-alt',   label: 'Tableau de bord', badge: null },
    { id: 'comptes',       href: 'comptes.html',        icon: 'fa-university',       label: 'Mes Comptes',     badge: null },
    { id: 'virement',      href: 'virement.html',       icon: 'fa-paper-plane',      label: 'Faire un virement', badge: null },
    { id: 'transactions',  href: 'transactions.html',   icon: 'fa-exchange-alt',     label: 'Transactions',    badge: null },
    { id: 'credits',       href: 'credits.html',        icon: 'fa-hand-holding-usd', label: 'Mes Crédits',     badge: null },
    { id: 'notifications', href: 'notifications.html',  icon: 'fa-bell',             label: 'Notifications',   badge: 'sidebarNotifBadge' },
    { id: 'profil',        href: 'profil.html',         icon: 'fa-user-circle',      label: 'Mon Profil',      badge: null },
  ];

  const navItems = pages.map(function(p) {
    var badgeHtml = p.badge
      ? '<span id="' + p.badge + '" style="display:none;margin-left:auto;background:#F5A623;color:#1B2A4A;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;"></span>'
      : '';
    return '<a href="' + p.href + '" class="' + (activePage === p.id ? 'active' : '') + '" style="display:flex;align-items:center;">'
      + '<i class="fas ' + p.icon + '"></i> ' + p.label + badgeHtml + '</a>';
  }).join('');

  document.getElementById('sidebarMount').innerHTML =
    '<aside class="cp-sidebar" id="cpSidebar">'
    + '<a href="../../index.html" class="cp-sidebar-logo">'
    +   '<div class="cp-logo-icon">GFS</div>'
    +   '<div class="cp-logo-text"><strong>Global Financial</strong><span>Banque en Ligne</span></div>'
    + '</a>'
    + '<div class="cp-client-card">'
    +   '<div class="cp-client-avatar" id="clientAvatar">' + avatar + '</div>'
    +   '<div class="cp-client-info"><strong id="clientName">' + fullName + '</strong><span>Client GFS</span></div>'
    + '</div>'
    + '<nav class="cp-nav"><div class="cp-nav-section">Navigation</div>'
    + navItems
    + '<div class="cp-nav-section" style="margin-top:12px;">Opérations</div>'
    + '<a href="../ouvrir-compte.html"><i class="fas fa-plus-circle"></i> Ouvrir un compte</a>'
    + '<a href="../credit.html"><i class="fas fa-hand-holding-usd"></i> Demande de crédit</a>'
    + '<div class="cp-nav-logout"><a href="#" onclick="logout();return false;"><i class="fas fa-sign-out-alt"></i> Déconnexion</a></div>'
    + '</nav></aside>';

  // Charger le badge notifications en arrière-plan
  setTimeout(function() {
    if (typeof api === 'function') {
      api('/client-auth/notifications?limit=1').then(function(data) {
        var unread = (data && data.unreadCount) || 0;
        var badge = document.getElementById('sidebarNotifBadge');
        if (badge && unread > 0) { badge.textContent = unread; badge.style.display = 'inline-block'; }
      }).catch(function() {});
    }
  }, 500);
}
