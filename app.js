const form = document.getElementById('serverForm');
const nameInput = document.getElementById('serverName');
const edition = document.getElementById('edition');
const software = document.getElementById('software');
const version = document.getElementById('version');
const ram = document.getElementById('ram');
const previewName = document.getElementById('previewName');
const previewDetails = document.getElementById('previewDetails');
const message = document.getElementById('formMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  previewName.textContent = name;
  previewDetails.textContent = `${edition.value} · ${software.value} · Version ${version.value.trim()} · ${ram.value}`;
  message.textContent = `Konfiguration für „${name}“ wurde in dieser Vorschau erstellt. Es wurde noch kein echter Server gestartet.`;
  document.getElementById('panel').scrollIntoView({behavior:'smooth'});
});

const modal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const usernameWrap = document.getElementById('usernameWrap');
const authSubmit = document.getElementById('authSubmit');
const authMessage = document.getElementById('authMessage');
let authMode = 'register';

function openAuth() {
  modal.hidden = false;
  authMessage.textContent = '';
}
function closeAuth() {
  modal.hidden = true;
}
function setMode(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  authTitle.textContent = mode === 'register' ? 'Konto erstellen' : 'Willkommen zurück';
  authSubmit.textContent = mode === 'register' ? 'Demo-Konto erstellen' : 'Demo-Anmeldung';
  usernameWrap.hidden = mode === 'login';
  document.getElementById('authUsername').required = mode === 'register';
  document.getElementById('authPassword').autocomplete = mode === 'register' ? 'new-password' : 'current-password';
  authMessage.textContent = '';
}
document.getElementById('loginBtn').addEventListener('click', openAuth);
document.getElementById('closeAuth').addEventListener('click', closeAuth);
modal.addEventListener('click', event => { if (event.target === modal) closeAuth(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeAuth(); });
document.querySelectorAll('.auth-tab').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

authForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  if (password.length < 8) {
    authMessage.textContent = 'Bitte verwende mindestens 8 Zeichen.';
    return;
  }
  // Demo only: do not save passwords or claim a real account exists.
  authMessage.textContent = authMode === 'register'
    ? `Formular geprüft für ${email}. Es wurde kein Konto angelegt, da noch kein Backend verbunden ist.`
    : `Anmeldeformular geprüft für ${email}. Ohne Backend kann kein Konto angemeldet werden.`;
});
