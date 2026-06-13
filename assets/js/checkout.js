/* =====================================================================
   ΚΑΥΚΑΣ — Checkout page
   ===================================================================== */
'use strict';

const SHIP_FLAT_CO = 3.90;

function renderOrderSummary() {
  const box = document.getElementById('orderSummary'); if (!box) return;
  const cart = getCart();
  if (!cart.length) {
    box.innerHTML = `<div class="empty-state">${icon('cart')}<p>Το καλάθι είναι άδειο.</p><a class="btn btn-accent btn-sm" href="shop.html">Στο κατάστημα</a></div>`;
    return;
  }
  const rows = cart.map(i => {
    const p = getProduct(i.id); if (!p) return '';
    return `<div class="order-row">
      <div class="or-thumb-wrap"><div class="thumb">${productVisual(p)}</div><span class="or-q">${i.qty}</span></div>
      <span class="or-name">${p.name}</span>
      <span class="or-price">${fmt(p.price * i.qty)}</span>
    </div>`;
  }).join('');
  const subtotal = cartSubtotal();
  const ship = subtotal >= STORE.freeShip ? 0 : SHIP_FLAT_CO;
  const total = subtotal + ship;
  box.innerHTML = `
    ${rows}
    <div class="s-row" style="margin-top:14px"><span>Υποσύνολο</span><span>${fmt(subtotal)}</span></div>
    <div class="s-row"><span>Αποστολή</span><span>${ship === 0 ? 'Δωρεάν' : fmt(ship)}</span></div>
    <div class="s-row total"><span>Σύνολο</span><b>${fmt(total)}</b></div>`;
}

function showSuccess() {
  const cart = getCart();
  const total = cartSubtotal() + (cartSubtotal() >= STORE.freeShip ? 0 : SHIP_FLAT_CO);
  const orderNo = 'KX' + Math.floor(100000 + Math.random() * 900000);
  setCart([]); // clear
  const main = document.getElementById('checkoutMain');
  main.innerHTML = `
  <div class="order-success reveal in">
    <div class="success-check">${icon('check')}</div>
    <h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">Ευχαριστούμε για την παραγγελία!</h1>
    <p style="color:var(--muted);margin-top:12px">Η παραγγελία <b style="color:var(--accent)">#${orderNo}</b> καταχωρήθηκε. Θα λάβεις email επιβεβαίωσης με τις λεπτομέρειες αποστολής.</p>
    <div class="glass" style="padding:22px;margin:26px auto;max-width:360px;text-align:left">
      <div class="s-row"><span>Αριθμός παραγγελίας</span><b>#${orderNo}</b></div>
      <div class="s-row"><span>Σύνολο</span><b style="color:var(--gold)">${fmt(total)}</b></div>
      <div class="s-row"><span>Εκτιμώμενη παράδοση</span><b>1–3 ημέρες</b></div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-accent" href="shop.html">Συνέχεια αγορών</a>
      <a class="btn btn-ghost" href="index.html">Στην αρχική</a>
    </div>
  </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('Η παραγγελία ολοκληρώθηκε!', 'check');
}

document.addEventListener('DOMContentLoaded', () => {
  if (!getCart().length) {
    // redirect feel: show empty notice
  }
  renderOrderSummary();

  // payment selection
  document.querySelectorAll('.pay-opt').forEach(opt => opt.addEventListener('click', () => {
    document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    const card = document.getElementById('cardFields');
    if (card) card.style.display = opt.getAttribute('data-pay') === 'card' ? 'block' : 'none';
  }));

  // form submit
  document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!getCart().length) { toast('Το καλάθι είναι άδειο', 'cart'); return; }
    const btn = e.submitter || document.getElementById('placeOrder');
    if (btn) { btn.disabled = true; btn.innerHTML = 'Επεξεργασία…'; }
    setTimeout(showSuccess, 900);
  });

  scanReveal(document);
});
