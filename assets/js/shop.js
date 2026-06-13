/* =====================================================================
   ΚΑΥΚΑΣ — Shop page: filters, search, sort
   ===================================================================== */
'use strict';

const ShopState = { cat: 'all', q: '', sort: 'pop', max: 200 };

function getParam(name) { return new URLSearchParams(location.search).get(name); }

function renderCatFilters() {
  const box = document.getElementById('catFilters'); if (!box) return;
  const all = `<button class="filter-opt ${ShopState.cat === 'all' ? 'active' : ''}" data-cat="all">
      <span>Όλα τα προϊόντα</span><span class="cnt">${PRODUCTS.length}</span></button>`;
  box.innerHTML = all + CATEGORIES.map(c => `
    <button class="filter-opt ${ShopState.cat === c.slug ? 'active' : ''}" data-cat="${c.slug}">
      <span>${c.name}</span><span class="cnt">${catCount(c.slug)}</span></button>`).join('');
}

function renderChips() {
  const box = document.getElementById('catChips'); if (!box) return;
  const mk = (slug, label) => `<button class="chip ${ShopState.cat === slug ? 'active' : ''}" data-cat="${slug}">${label}</button>`;
  box.innerHTML = mk('all', 'Όλα') + CATEGORIES.map(c => mk(c.slug, c.name)).join('');
}

function applyShop() {
  let list = PRODUCTS.slice();
  if (ShopState.cat !== 'all') list = list.filter(p => p.cat === ShopState.cat);
  if (ShopState.q) {
    const q = ShopState.q.toLowerCase();
    list = list.filter(p => (p.name + ' ' + (catBySlug(p.cat)?.name || '') + ' ' + p.brand).toLowerCase().includes(q));
  }
  list = list.filter(p => p.price <= ShopState.max);
  switch (ShopState.sort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    case 'new': list.sort((a, b) => (b.badge === 'new') - (a.badge === 'new')); break;
    default: list.sort((a, b) => b.reviews - a.reviews);
  }

  const grid = document.getElementById('shopGrid');
  const count = document.getElementById('shopCount');
  if (count) count.innerHTML = `<b>${list.length}</b> προϊόντα`;
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${icon('search')}<p>Δεν βρέθηκαν προϊόντα.</p>
      <button class="btn btn-ghost btn-sm" id="resetShop">Καθαρισμός φίλτρων</button></div>`;
    document.getElementById('resetShop')?.addEventListener('click', () => { ShopState.cat = 'all'; ShopState.q = ''; ShopState.max = 200; syncControls(); renderAllShop(); });
    return;
  }
  grid.innerHTML = list.map(productCard).join('');
  // slide in from the left, staggered in reading order (clear left-to-right wave)
  grid.querySelectorAll('.product-card').forEach((c, i) => {
    c.classList.remove('reveal');
    c.classList.add('shop-anim');
    c.style.animationDelay = Math.min(i * 45, 650) + 'ms';
  });
}

function renderAllShop() { renderCatFilters(); renderChips(); applyShop(); updateTitle(); }

function updateTitle() {
  const t = document.getElementById('shopTitle');
  const c = catBySlug(ShopState.cat);
  if (t) t.textContent = ShopState.cat === 'all' ? 'Όλα τα προϊόντα' : c.name;
}

function syncControls() {
  const s = document.getElementById('shopSearch'); if (s) s.value = ShopState.q;
  const pr = document.getElementById('priceRange'); if (pr) pr.value = ShopState.max;
  const pv = document.getElementById('priceVal'); if (pv) pv.textContent = ShopState.max >= 200 ? '€200+' : fmt(ShopState.max);
  const so = document.getElementById('sortSelect'); if (so) so.value = ShopState.sort;
}

document.addEventListener('DOMContentLoaded', () => {
  const c = getParam('cat'); if (c && (c === 'all' || catBySlug(c))) ShopState.cat = c;
  const q = getParam('q'); if (q) ShopState.q = q;

  syncControls();
  renderAllShop();

  // category clicks (sidebar + chips)
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (b) { ShopState.cat = b.getAttribute('data-cat'); renderAllShop(); document.getElementById('filtersPanel')?.classList.remove('open'); window.scrollTo({ top: document.getElementById('shopTop')?.offsetTop - 90 || 0, behavior: 'smooth' }); }
  });

  document.getElementById('shopSearch')?.addEventListener('input', (e) => { ShopState.q = e.target.value; applyShop(); });
  document.getElementById('sortSelect')?.addEventListener('change', (e) => { ShopState.sort = e.target.value; applyShop(); });
  const pr = document.getElementById('priceRange');
  pr?.addEventListener('input', (e) => {
    ShopState.max = +e.target.value;
    document.getElementById('priceVal').textContent = ShopState.max >= 200 ? '€200+' : fmt(ShopState.max);
    applyShop();
  });

  document.getElementById('filterToggle')?.addEventListener('click', () => document.getElementById('filtersPanel')?.classList.add('open'));
  document.getElementById('filtersClose')?.addEventListener('click', () => document.getElementById('filtersPanel')?.classList.remove('open'));
});
