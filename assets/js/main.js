/* =====================================================================
   ΚΑΥΚΑΣ — Shared logic: header/footer, cart, reveals, toasts
   ===================================================================== */
'use strict';

/* ----------  Restore scroll position on refresh (content is JS-rendered) ---------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
(function () {
  const key = 'kafkas_scroll_' + location.pathname + location.search;
  let queued = 0;
  function save() { try { sessionStorage.setItem(key, String(Math.round(window.scrollY))); } catch (e) {} }
  addEventListener('scroll', function () { if (queued) return; queued = requestAnimationFrame(function () { save(); queued = 0; }); }, { passive: true });
  addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', function () { if (document.hidden) save(); });
  const nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
  if (nav.type === 'reload' || nav.type === 'back_forward') {
    addEventListener('load', function () {
      let y = 0; try { y = parseInt(sessionStorage.getItem(key) || '0', 10) || 0; } catch (e) {}
      if (y > 0) requestAnimationFrame(function () {
        const html = document.documentElement, prev = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, y);
        html.style.scrollBehavior = prev;
      });
    });
  }
})();

const STORE = {
  name: 'ΚΑΥΚΑΣ',
  freeShip: 49,
  phone: '+30 210 000 0000',
  email: 'hello@kafkas.gr',
  hours: 'Δευτέρα–Σάββατο, 09:00–21:00'
};

/* ----------  Logo (recreated as inline SVG — sharp at any size)  ---------- */
function logoSvg(cls) {
  const id = 'lgK' + Math.random().toString(36).slice(2, 7);
  return `<svg class="${cls || 'logo'}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${id}" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4da3ff"/><stop offset="1" stop-color="#34e0ff"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="29.5" stroke="url(#${id})" stroke-width="2" opacity="0.45"/>
    <!-- left chevron stem -->
    <path d="M22 13 L15.5 32 L22 51" stroke="url(#${id})" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- upper arm -->
    <path d="M18.5 32 L41 16" stroke="url(#${id})" stroke-width="5.4" stroke-linecap="round"/>
    <!-- lower arm -->
    <path d="M18.5 32 L41 48" stroke="url(#${id})" stroke-width="5.4" stroke-linecap="round"/>
    <!-- right arrowhead -->
    <path d="M39 23 L52 32 L39 41 Z" fill="url(#${id})"/>
  </svg>`;
}

/* ----------  Payment brand logos (inline SVG)  ---------- */
const PAY = {
  visa: '<svg viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visa"><text x="24" y="13" font-family="Arial, Helvetica, sans-serif" font-size="14" font-style="italic" font-weight="700" fill="#1A1F71" text-anchor="middle" letter-spacing="1.5">VISA</text></svg>',
  mastercard: '<svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard"><circle cx="15" cy="12" r="9" fill="#EB001B"/><circle cx="25" cy="12" r="9" fill="#F79E1B"/><path d="M20 5.2a9 9 0 0 0 0 13.6 9 9 0 0 0 0-13.6z" fill="#FF5F00"/></svg>',
  maestro: '<svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maestro"><circle cx="15" cy="12" r="9" fill="#0099DF"/><circle cx="25" cy="12" r="9" fill="#ED0006"/><path d="M20 5.2a9 9 0 0 0 0 13.6 9 9 0 0 0 0-13.6z" fill="#6C6BBD"/></svg>',
  paypal: '<svg viewBox="0 0 62 16" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PayPal"><text x="0" y="13" font-family="Arial, Helvetica, sans-serif" font-size="13" font-style="italic" font-weight="700"><tspan fill="#253B80">Pay</tspan><tspan fill="#179BD7">Pal</tspan></text></svg>',
  cod: '<svg viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Αντικαταβολή" fill="none" stroke="#1A1F71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="22" height="12" rx="2"/><circle cx="14" cy="12" r="2.6"/><path d="M7 9.5v5M21 9.5v5"/></svg>'
};

/* ----------  Cart state (localStorage)  ---------- */
const CART_KEY = 'kafkas_cart_v1';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function setCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartUI(); }
function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
function cartSubtotal() { return getCart().reduce((s, i) => { const p = getProduct(i.id); return p ? s + p.price * i.qty : s; }, 0); }

function addToCart(id, qty) {
  qty = qty || 1;
  const cart = getCart();
  const line = cart.find(i => i.id === id);
  if (line) line.qty += qty; else cart.push({ id, qty });
  setCart(cart);
  const p = getProduct(id);
  toast(`${p ? p.name : 'Προϊόν'} προστέθηκε στο καλάθι`, 'cart');
  bumpBadge();
  openDrawer();
}
function setQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) { cart = cart.filter(i => i.id !== id); }
  else { const l = cart.find(i => i.id === id); if (l) l.qty = qty; }
  setCart(cart);
}
function removeFromCart(id) { setCart(getCart().filter(i => i.id !== id)); }

/* ----------  Header  ---------- */
function buildHeader(active) {
  const links = [
    ['index.html', 'Αρχική', 'home'],
    ['shop.html', 'Κατάστημα', 'shop'],
    ['about.html', 'Σχετικά', 'about'],
    ['contact.html', 'Επικοινωνία', 'contact']
  ];
  const linkHtml = links.map(([href, label, key]) =>
    `<a href="${href}" class="${active === key ? 'active' : ''}">${label}</a>`).join('');
  const mLinkHtml = links.map(([href, label, key]) =>
    `<a href="${href}" class="${active === key ? 'active' : ''}">${label} ${icon('chevRight')}</a>`).join('');

  return `
  <div class="scroll-progress" id="scrollProgress"></div>
  <div class="announcement-bar" id="announcementBar">
    <div class="ann-inner">
      <span class="ann-item">${icon('truck')} Δωρεάν αποστολή άνω των €${STORE.freeShip}</span>
      <span class="ann-sep opt">•</span>
      <span class="ann-item opt">${icon('zap')} Άμεση παράδοση 1–3 ημέρες</span>
      <span class="ann-sep opt">•</span>
      <span class="ann-item opt">${icon('shield')} Γνήσια προϊόντα με εγγύηση</span>
      <button class="ann-close" id="annClose" aria-label="Απόκρυψη">${icon('close')}</button>
    </div>
  </div>
  <header class="site-header" id="siteHeader">
    <nav class="nav" aria-label="Κύρια πλοήγηση">
      <a class="brand" href="index.html" aria-label="${STORE.name} αρχική">
        <span class="brand-logo"><img src="assets/logo.png" alt="ΚΑΥΚΑΣ" width="44" height="44"></span>
        <span class="wordmark">ΚΑΥ<b>ΚΑΣ</b></span>
      </a>
      <div class="nav-links"><span class="nav-lamp" id="navLamp"><span class="tube"></span></span>${linkHtml}</div>
      <div class="nav-actions">
        <button class="icon-btn" id="searchOpen" aria-label="Αναζήτηση">${icon('search')}</button>
        <button class="icon-btn" id="cartOpen" aria-label="Άνοιγμα καλαθιού">
          ${icon('cart')}<span class="cart-badge" id="cartBadge">0</span>
        </button>
        <a class="btn btn-white btn-sm nav-cta" href="shop.html">Αγορά τώρα</a>
        <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Μενού" aria-expanded="false">${icon('menu')}</button>
      </div>
    </nav>
  </header>

  <div class="mobile-panel" id="mobilePanel">
    <div class="inner">
      ${mLinkHtml}
      <a class="btn btn-accent btn-block" href="shop.html" style="margin-top:14px">Αγορά τώρα ${icon('arrowRight')}</a>
    </div>
  </div>

  <!-- Cart drawer -->
  <div class="drawer-scrim" id="drawerScrim"></div>
  <aside class="drawer" id="cartDrawer" aria-label="Καλάθι αγορών">
    <div class="drawer-head">
      <h3>Το καλάθι σου</h3>
      <button class="icon-btn" id="drawerClose" aria-label="Κλείσιμο">${icon('close')}</button>
    </div>
    <div class="drawer-body" id="drawerBody"></div>
    <div class="drawer-foot" id="drawerFoot"></div>
  </aside>

  <!-- Search overlay -->
  <div class="drawer-scrim" id="searchScrim"></div>
  <div class="drawer" id="searchPanel" aria-label="Αναζήτηση" style="width:min(94vw,460px)">
    <div class="drawer-head">
      <h3>Αναζήτηση</h3>
      <button class="icon-btn" id="searchClose" aria-label="Κλείσιμο">${icon('close')}</button>
    </div>
    <div class="drawer-body">
      <div class="shop-search" style="max-width:none">
        ${icon('search')}
        <input type="search" id="globalSearch" placeholder="Τι ψάχνεις;" aria-label="Αναζήτηση προϊόντων" autocomplete="off">
      </div>
      <div id="searchResults" style="margin-top:16px;display:flex;flex-direction:column;gap:10px"></div>
    </div>
  </div>

  <div class="toast-wrap" id="toastWrap" aria-live="polite"></div>`;
}

/* ----------  Footer  ---------- */
function buildFooter() {
  const catLinks = CATEGORIES.slice(0, 5).map(c => `<li><a href="shop.html?cat=${c.slug}">${c.name}</a></li>`).join('');
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="index.html"><span class="brand-logo"><img src="assets/logo.png" alt="ΚΑΥΚΑΣ" width="44" height="44"></span><span class="wordmark">ΚΑΥ<b>ΚΑΣ</b></span></a>
          <p>Έξυπνες συσκευές & ηλεκτρολογικό υλικό για κάθε σπίτι και επιχείρηση. Διαθέσιμο σε όλη την Ελλάδα.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">${icon('facebook')}</a>
            <a href="#" aria-label="Instagram">${icon('instagram')}</a>
            <a href="#" aria-label="TikTok">${icon('tiktok')}</a>
            <a href="#" aria-label="YouTube">${icon('youtube')}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Κατηγορίες</h4>
          <ul>${catLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Εταιρεία</h4>
          <ul>
            <li><a href="about.html">Σχετικά με εμάς</a></li>
            <li><a href="contact.html">Επικοινωνία</a></li>
            <li><a href="shop.html">Όλα τα προϊόντα</a></li>
            <li><a href="about.html">Καριέρα</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Εξυπηρέτηση</h4>
          <ul>
            <li><a href="contact.html">Αποστολές & Παράδοση</a></li>
            <li><a href="contact.html">Επιστροφές</a></li>
            <li><a href="contact.html">Εγγύηση</a></li>
            <li><a href="contact.html">Συχνές ερωτήσεις</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${STORE.name}. Με επιφύλαξη παντός δικαιώματος.</span>
        <div class="pays" aria-label="Τρόποι πληρωμής">
          <span class="pay-badge" title="Visa">${PAY.visa}</span>
          <span class="pay-badge" title="Mastercard">${PAY.mastercard}</span>
          <span class="pay-badge" title="Maestro">${PAY.maestro}</span>
          <span class="pay-badge" title="PayPal">${PAY.paypal}</span>
          <span class="pay-badge" title="Αντικαταβολή">${PAY.cod}</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ----------  Cart UI rendering  ---------- */
function updateCartUI() {
  const count = cartCount();
  const badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = count; badge.classList.toggle('show', count > 0); }

  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  if (body && foot) {
    const cart = getCart();
    if (!cart.length) {
      body.innerHTML = `<div class="empty-state">${icon('cart')}<p>Το καλάθι σου είναι άδειο.</p>
        <a class="btn btn-accent btn-sm" href="shop.html">Δες προϊόντα</a></div>`;
      foot.innerHTML = '';
    } else {
      body.innerHTML = cart.map(i => {
        const p = getProduct(i.id); if (!p) return '';
        return `<div class="mini-item">
          <div class="thumb">${productVisual(p)}</div>
          <div>
            <div class="mi-name">${p.name}</div>
            <div class="mi-meta"><span class="mi-price">${fmt(p.price)}</span></div>
            <div class="mini-qty">
              <button data-ddec="${p.id}" aria-label="Μείωση">${icon('minus')}</button>
              <span class="q">${i.qty}</span>
              <button data-dinc="${p.id}" aria-label="Αύξηση">${icon('plus')}</button>
            </div>
          </div>
          <button class="mi-remove" data-remove="${p.id}" aria-label="Αφαίρεση">${icon('trash')}</button>
        </div>`;
      }).join('');
      foot.innerHTML = `
        <div class="row"><span>Υποσύνολο</span><span class="total">${fmt(cartSubtotal())}</span></div>
        <a class="btn btn-white btn-block" href="cart.html">Ολοκλήρωση αγοράς ${icon('arrowRight')}</a>`;
    }
  }
  document.dispatchEvent(new CustomEvent('cart:changed'));
}

function bumpBadge() {
  const b = document.getElementById('cartBadge');
  if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}

/* ----------  Drawer / panels  ---------- */
function openDrawer() { document.getElementById('cartDrawer')?.classList.add('open'); document.getElementById('drawerScrim')?.classList.add('open'); }
function closeDrawer() { document.getElementById('cartDrawer')?.classList.remove('open'); document.getElementById('drawerScrim')?.classList.remove('open'); }
function openSearch() { document.getElementById('searchPanel')?.classList.add('open'); document.getElementById('searchScrim')?.classList.add('open'); setTimeout(() => document.getElementById('globalSearch')?.focus(), 280); }
function closeSearch() { document.getElementById('searchPanel')?.classList.remove('open'); document.getElementById('searchScrim')?.classList.remove('open'); }

/* ----------  Toast  ---------- */
let toastTimer;
function toast(msg, ic) {
  const wrap = document.getElementById('toastWrap'); if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ic">${icon(ic || 'check')}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 360); }, 2600);
}

/* ----------  Search results  ---------- */
function renderSearch(q) {
  const box = document.getElementById('searchResults'); if (!box) return;
  q = (q || '').trim().toLowerCase();
  if (!q) { box.innerHTML = `<p style="color:var(--muted);font-size:.9rem">Δοκίμασε «ακουστικά», «λάμπα», «φορτιστής»…</p>`; return; }
  const hits = PRODUCTS.filter(p => (p.name + ' ' + (catBySlug(p.cat)?.name || '')).toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) { box.innerHTML = `<p style="color:var(--muted)">Δεν βρέθηκαν προϊόντα για «${q}».</p>`; return; }
  box.innerHTML = hits.map(p => `<a class="mini-item" href="product.html?id=${p.id}" style="text-decoration:none">
      <div class="thumb">${productVisual(p)}</div>
      <div><div class="mi-name">${p.name}</div><div class="mi-meta"><span class="mi-price">${fmt(p.price)}</span></div></div>
      <span style="color:var(--accent)">${icon('arrowRight')}</span>
    </a>`).join('');
}

/* ----------  Scroll reveal  ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(e => e.classList.add('in')); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
}
/* re-scan for dynamically added reveals */
function scanReveal(scope) {
  (scope || document).querySelectorAll('.reveal:not(.in)').forEach(e => {
    if (!('IntersectionObserver' in window)) { e.classList.add('in'); return; }
    revealObserver.observe(e);
  });
}
let revealObserver;

/* ----------  Tubelight nav indicator  ---------- */
function moveLamp(target) {
  const lamp = document.getElementById('navLamp');
  const links = document.querySelector('.nav-links');
  if (!lamp || !target || !links) return;
  const lr = links.getBoundingClientRect();
  const tr = target.getBoundingClientRect();
  lamp.style.left = (tr.left - lr.left) + 'px';
  lamp.style.width = tr.width + 'px';
  lamp.style.opacity = '1';
}
function initNavLamp() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const activeOf = () => links.querySelector('a.active') || links.querySelector('a');
  const place = () => moveLamp(activeOf());
  requestAnimationFrame(place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  links.querySelectorAll('a').forEach(a => a.addEventListener('mouseenter', () => moveLamp(a)));
  links.addEventListener('mouseleave', place);
  window.addEventListener('resize', place, { passive: true });
}

/* ----------  Header scroll state + progress  ---------- */
function initScrollFx() {
  const header = document.getElementById('siteHeader');
  const prog = document.getElementById('scrollProgress');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header?.classList.toggle('scrolled', y > 20);
      if (prog) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----------  Mount  ---------- */
function mountChrome(active) {
  const head = document.getElementById('site-header');
  const foot = document.getElementById('site-footer');
  if (head) head.innerHTML = buildHeader(active);
  if (foot) foot.innerHTML = buildFooter();

  // reveal observer instance
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  }

  updateCartUI();
  initScrollFx();
  initReveal();
  initNavLamp();

  // events
  document.getElementById('cartOpen')?.addEventListener('click', openDrawer);
  document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerScrim')?.addEventListener('click', closeDrawer);
  document.getElementById('searchOpen')?.addEventListener('click', openSearch);
  document.getElementById('searchClose')?.addEventListener('click', closeSearch);
  document.getElementById('searchScrim')?.addEventListener('click', closeSearch);
  document.getElementById('globalSearch')?.addEventListener('input', (e) => renderSearch(e.target.value));

  document.getElementById('annClose')?.addEventListener('click', () => {
    // hide for this view only — reappears on refresh
    document.getElementById('announcementBar')?.classList.add('hide');
  });

  const panel = document.getElementById('mobilePanel');
  const menuBtn = document.getElementById('menuToggle');
  menuBtn?.addEventListener('click', () => {
    const open = panel?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const header = document.getElementById('siteHeader');
      const inner = panel.querySelector('.inner');
      const top = header ? header.getBoundingClientRect().bottom : 100;
      if (inner) inner.style.paddingTop = Math.max(top + 18, 96) + 'px';
    }
  });
  document.getElementById('menuClose')?.addEventListener('click', () => { panel?.classList.remove('open'); menuBtn?.setAttribute('aria-expanded', 'false'); });
  panel?.addEventListener('click', (e) => { if (e.target === panel) panel.classList.remove('open'); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDrawer(); closeSearch(); panel?.classList.remove('open'); }
  });

  // delegated cart actions (works for dynamically rendered cards)
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); addToCart(add.getAttribute('data-add')); flyToCart(add); return; }
    const rem = e.target.closest('[data-remove]');
    if (rem) { e.preventDefault(); removeFromCart(rem.getAttribute('data-remove')); return; }
    const dinc = e.target.closest('[data-dinc]');
    if (dinc) { e.preventDefault(); const id = dinc.getAttribute('data-dinc'); const l = getCart().find(x => x.id === id); setQty(id, (l ? l.qty : 1) + 1); return; }
    const ddec = e.target.closest('[data-ddec]');
    if (ddec) { e.preventDefault(); const id = ddec.getAttribute('data-ddec'); const l = getCart().find(x => x.id === id); setQty(id, (l ? l.qty : 1) - 1); return; }
    const wish = e.target.closest('[data-wish]');
    if (wish) { e.preventDefault(); wish.classList.toggle('active'); toast(wish.classList.contains('active') ? 'Προστέθηκε στα αγαπημένα' : 'Αφαιρέθηκε από τα αγαπημένα', 'heart'); return; }
  });
}

/* small flourish: pulse the add button */
function flyToCart(btn) {
  btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.86)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'ease-out' });
}

document.addEventListener('DOMContentLoaded', () => {
  const active = document.body.getAttribute('data-page') || '';
  mountChrome(active);
});
