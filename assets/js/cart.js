/* =====================================================================
   ΚΑΥΚΑΣ — Cart page
   ===================================================================== */
'use strict';

const SHIP_FLAT = 3.90;

function renderCartPage() {
  const wrap = document.getElementById('cartContent'); if (!wrap) return;
  const cart = getCart();

  if (!cart.length) {
    wrap.innerHTML = `<div class="empty-state" style="padding:80px 10px">
      ${icon('cart')}
      <h2 style="font-family:'Playfair Display',serif;color:var(--text)">Το καλάθι σου είναι άδειο</h2>
      <p>Ανακάλυψε έξυπνες συσκευές και gadgets σε ασυναγώνιστες τιμές.</p>
      <a class="btn btn-accent" href="shop.html">${icon('arrowRight')} Συνέχισε τις αγορές</a>
    </div>`;
    return;
  }

  const lines = cart.map(i => {
    const p = getProduct(i.id); if (!p) return '';
    const cat = catBySlug(p.cat);
    return `<div class="cart-line" data-line="${p.id}">
      <div class="thumb">${productVisual(p)}</div>
      <div>
        <span class="cl-cat">${cat.name}</span>
        <div class="cl-name"><a href="product.html?id=${p.id}">${p.name}</a></div>
        <div class="cl-price">${fmt(p.price)}</div>
      </div>
      <div class="cl-actions">
        <div class="qty">
          <button data-dec="${p.id}" aria-label="Μείωση">${icon('minus')}</button>
          <input type="number" value="${i.qty}" min="1" max="99" data-qty="${p.id}" aria-label="Ποσότητα">
          <button data-inc="${p.id}" aria-label="Αύξηση">${icon('plus')}</button>
        </div>
        <button class="cl-remove" data-del="${p.id}">${icon('trash')} Αφαίρεση</button>
      </div>
    </div>`;
  }).join('');

  const subtotal = cartSubtotal();
  const ship = subtotal >= STORE.freeShip || subtotal === 0 ? 0 : SHIP_FLAT;
  const remaining = Math.max(0, STORE.freeShip - subtotal);
  const pct = Math.min(100, (subtotal / STORE.freeShip) * 100);
  const total = subtotal + ship;

  wrap.innerHTML = `
  <div class="cart-layout">
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h2 style="font-size:1.4rem">${cartCount()} προϊόντα</h2>
        <button class="cl-remove" id="clearCart">${icon('trash')} Άδειασμα καλαθιού</button>
      </div>
      ${lines}
    </div>
    <aside class="summary">
      <h3>Σύνοψη παραγγελίας</h3>
      <div class="free-bar">
        <div class="track"><div class="fill" style="width:${pct}%"></div></div>
        <small>${remaining > 0 ? `Πρόσθεσε ακόμη <b style="color:var(--accent)">${fmt(remaining)}</b> για ΔΩΡΕΑΝ αποστολή!` : '🎉 Κέρδισες δωρεάν αποστολή!'}</small>
      </div>
      <div class="s-row"><span>Υποσύνολο</span><span>${fmt(subtotal)}</span></div>
      <div class="s-row"><span>Αποστολή</span><span>${ship === 0 ? 'Δωρεάν' : fmt(ship)}</span></div>
      <div class="promo-row">
        <input class="input" placeholder="Κωδικός κουπονιού" id="promoInput">
        <button class="btn btn-ghost btn-sm" id="promoBtn">Εφαρμογή</button>
      </div>
      <div class="s-row total"><span>Σύνολο</span><b>${fmt(total)}</b></div>
      <a class="btn btn-white btn-block btn-lg" href="checkout.html" style="margin-top:16px">Ολοκλήρωση αγοράς ${icon('arrowRight')}</a>
      <a class="btn btn-ghost btn-block" href="shop.html" style="margin-top:10px">Συνέχεια αγορών</a>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:18px;color:var(--muted);font-size:.82rem;align-items:center">
        ${icon('shield')} Ασφαλείς συναλλαγές με κρυπτογράφηση
      </div>
    </aside>
  </div>`;

  // bind
  wrap.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => { const id = b.getAttribute('data-inc'); const l = getCart().find(x => x.id === id); setQty(id, (l ? l.qty : 1) + 1); renderCartPage(); }));
  wrap.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => { const id = b.getAttribute('data-dec'); const l = getCart().find(x => x.id === id); setQty(id, (l ? l.qty : 1) - 1); renderCartPage(); }));
  wrap.querySelectorAll('[data-qty]').forEach(inp => inp.addEventListener('change', () => { setQty(inp.getAttribute('data-qty'), Math.max(0, +inp.value || 0)); renderCartPage(); }));
  wrap.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => { removeFromCart(b.getAttribute('data-del')); renderCartPage(); toast('Αφαιρέθηκε από το καλάθι', 'trash'); }));
  document.getElementById('clearCart')?.addEventListener('click', () => { setCart([]); renderCartPage(); toast('Το καλάθι άδειασε', 'trash'); });
  document.getElementById('promoBtn')?.addEventListener('click', () => toast('Ο κωδικός δεν είναι έγκυρος', 'spark'));

  scanReveal(wrap);
}

document.addEventListener('DOMContentLoaded', renderCartPage);
document.addEventListener('cart:changed', () => { /* keep page in sync if drawer used */ });
