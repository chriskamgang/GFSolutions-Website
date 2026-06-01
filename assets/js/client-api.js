/* ===== GFS CLIENT API — Module partagé espace client ===== */

const GFS_API = 'http://localhost:3000/api/v1';

/* --- Token & session --- */
function getToken()   { return localStorage.getItem('gfs_client_token'); }
function setToken(t)  { localStorage.setItem('gfs_client_token', t); }
function removeToken(){ localStorage.removeItem('gfs_client_token'); }

function getClient()  { return JSON.parse(localStorage.getItem('gfs_client') || 'null'); }
function setClient(c) { localStorage.setItem('gfs_client', JSON.stringify(c)); }
function removeClient(){ localStorage.removeItem('gfs_client'); }

function isLoggedIn() { return !!getToken(); }

/* Déterminer le chemin de retour selon la profondeur */
function loginUrl() {
  const p = window.location.pathname;
  if (p.includes('/espace-client/')) return '../banque-en-ligne.html';
  if (p.includes('/pages/'))         return 'banque-en-ligne.html';
  return 'pages/banque-en-ligne.html';
}

/* Rediriger vers login si non connecté */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = loginUrl();
    return false;
  }
  return true;
}

/* Rediriger vers dashboard si déjà connecté (pour la page login) */
function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    const p = window.location.pathname;
    if (p.includes('/pages/')) {
      window.location.href = 'espace-client/index.html';
    } else {
      window.location.href = 'pages/espace-client/index.html';
    }
  }
}

/* --- Fetch wrapper avec Bearer token --- */
async function api(path, options = {}) {
  const token = getToken();
  let res;
  try {
    res = await fetch(`${GFS_API}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined,
    });
  } catch (e) {
    throw new Error('Impossible de contacter le serveur. Vérifiez que le backend est démarré.');
  }

  if (res.status === 401) {
    removeToken(); removeClient();
    window.location.href = loginUrl();
    return null;
  }

  let data;
  try { data = await res.json(); } catch(e) { data = {}; }

  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message.join(', ') : (data.message || 'Erreur serveur');
    throw new Error(msg);
  }
  return data;
}

/* --- Déconnexion --- */
async function logout() {
  try { await api('/client-auth/logout', { method: 'POST' }); } catch(e) {}
  removeToken();
  removeClient();
  window.location.href = loginUrl();
}

/* --- Formatage --- */
function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '– FCFA';
  return new Intl.NumberFormat('fr-CM').format(Math.round(n)) + ' FCFA';
}

function fmtDate(d) {
  if (!d) return '–';
  return new Date(d).toLocaleDateString('fr-CM', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtDateTime(d) {
  if (!d) return '–';
  return new Date(d).toLocaleString('fr-CM', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function txSign(type) {
  const credit = ['DEPOT', 'VIREMENT_RECU', 'INTEREST', 'CREDIT_DECAISSEMENT'];
  return credit.includes(type) ? '+' : '-';
}

function txColor(type) {
  const credit = ['DEPOT', 'VIREMENT_RECU', 'INTEREST', 'CREDIT_DECAISSEMENT'];
  return credit.includes(type) ? 'var(--green, #27ae60)' : '#e74c3c';
}

function txLabel(type) {
  const labels = {
    DEPOT: 'Dépôt', RETRAIT: 'Retrait',
    VIREMENT_EMIS: 'Virement envoyé', VIREMENT_RECU: 'Virement reçu',
    FRAIS: 'Frais', INTEREST: 'Intérêts',
    CREDIT_DECAISSEMENT: 'Décaissement crédit', CREDIT_REMBOURSEMENT: 'Remboursement crédit',
  };
  return labels[type] || type;
}

function accountTypeLabel(type) {
  const labels = { COURANT: 'Compte Courant', EPARGNE: 'Compte Épargne', DAT: 'Dépôt à Terme', ENTREPRISE: 'Compte Entreprise' };
  return labels[type] || type;
}

/* --- Remplir le header avec nom du client --- */
function fillClientHeader() {
  const client = getClient();
  if (!client) return;
  const nameEl = document.getElementById('clientName');
  const avatarEl = document.getElementById('clientAvatar');
  if (nameEl) nameEl.textContent = `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.clientNumber;
  if (avatarEl) avatarEl.textContent = (client.firstName || 'C')[0].toUpperCase();
}

/* --- Charger le profil depuis l'API et mettre à jour le storage --- */
async function loadProfile() {
  try {
    const data = await api('/client-auth/me');
    if (data) { setClient(data); fillClientHeader(); }
    return data;
  } catch(e) { return getClient(); }
}
