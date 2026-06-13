/* =====================================================================
   ΚΑΥΚΑΣ — Product detail page
   ===================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(location.search).get('id');
  const p = getProduct(id) || PRODUCTS[0];
  const cat = catBySlug(p.cat);
  const root = document.getElementById('productRoot');
  if (!root) return;

  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const wasHtml = p.old ? `<span class="was">${fmt(p.old)}</span><span class="off">-${off}%</span>` : '';

  // 4 angle "thumbnails" reuse the generated visual (placeholder for real photos)
  const thumbs = [0, 1, 2, 3].map(i => `
    <button class="pd-thumb ${i === 0 ? 'active' : ''}" data-thumb="${i}" aria-label="Όψη ${i + 1}">${productVisual(p)}</button>`).join('');

  const specRows = p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  root.innerHTML = `
  <nav class="breadcrumbs reveal">
    <a href="index.html">Αρχική</a> ${icon('chevRight')}
    <a href="shop.html">Κατάστημα</a> ${icon('chevRight')}
    <a href="shop.html?cat=${p.cat}">${cat.name}</a> ${icon('chevRight')}
    <span>${p.name}</span>
  </nav>

  <div class="pd-grid">
    <div class="pd-gallery reveal">
      <div class="pd-stage" id="pdStage">${productVisual(p)}</div>
      <div class="pd-thumbs">${thumbs}</div>
    </div>

    <div class="pd-info reveal" data-delay="1">
      <span class="pc-cat">${cat.name} · ${p.brand}</span>
      <h1>${p.name}</h1>
      <div class="pd-meta">
        ${starsHtml(p.rating)} <span>${p.rating.toFixed(1)} (${p.reviews} αξιολογήσεις)</span>
        <span style="color:var(--success)">● Διαθέσιμο</span>
      </div>
      <div class="pd-price"><span class="now">${fmt(p.price)}</span>${wasHtml}</div>
      <p class="pd-desc">${p.desc}</p>

      <div class="pd-buy">
        <div class="qty">
          <button id="qMinus" aria-label="Μείωση">${icon('minus')}</button>
          <input id="qInput" type="number" value="1" min="1" max="99" aria-label="Ποσότητα">
          <button id="qPlus" aria-label="Αύξηση">${icon('plus')}</button>
        </div>
        <button class="btn btn-accent btn-lg" id="pdAdd">${icon('cart')} Προσθήκη στο καλάθι</button>
        <button class="btn btn-ghost" id="pdWish" aria-label="Αγαπημένα">${icon('heart')}</button>
      </div>

      <div class="pd-assure">
        <div class="a">${icon('truck')}<div><strong>Δωρεάν αποστολή</strong><small>για παραγγελίες άνω των €${STORE.freeShip}</small></div></div>
        <div class="a">${icon('refresh')}<div><strong>14 ημέρες</strong><small>εύκολες επιστροφές</small></div></div>
        <div class="a">${icon('shield')}<div><strong>Επίσημη εγγύηση</strong><small>γνήσια προϊόντα</small></div></div>
        <div class="a">${icon('headset')}<div><strong>Υποστήριξη</strong><small>${STORE.hours}</small></div></div>
      </div>
    </div>
  </div>

  <div class="tabs reveal">
    <div class="tab-btns">
      <button class="tab-btn active" data-tab="desc">Περιγραφή</button>
      <button class="tab-btn" data-tab="spec">Χαρακτηριστικά</button>
      <button class="tab-btn" data-tab="ship">Αποστολή & Επιστροφές</button>
    </div>
    <div class="tab-panel active" data-panel="desc">
      <p style="color:var(--text-soft);max-width:70ch">${p.desc} Σχεδιασμένο για καθημερινή χρήση με προσοχή στη λεπτομέρεια, συνδυάζει ποιότητα κατασκευής, αξιοπιστία και εξαιρετική σχέση ποιότητας–τιμής. Όλα τα προϊόντα ${STORE.name} συνοδεύονται από επίσημη εγγύηση και υποστήριξη.</p>
    </div>
    <div class="tab-panel" data-panel="spec">
      <table class="spec-table" style="max-width:560px">${specRows}</table>
    </div>
    <div class="tab-panel" data-panel="ship">
      <p style="color:var(--text-soft);max-width:70ch">Αποστολή σε όλη την Ελλάδα εντός 1–3 εργάσιμων ημερών. Δωρεάν μεταφορικά για παραγγελίες άνω των €${STORE.freeShip}. Δυνατότητα αντικαταβολής. Επιστροφές εντός 14 ημερών χωρίς ερωτήσεις, με επιστροφή χρημάτων ή αλλαγή προϊόντος.</p>
    </div>
  </div>

  <section class="section" style="padding-top:clamp(40px,6vw,80px)">
    <div class="section-head"><span class="eyebrow">Σου προτείνουμε</span><h2>Σχετικά προϊόντα</h2></div>
    <div class="product-grid" id="relatedGrid"></div>
  </section>`;

  // title
  document.title = `${p.name} — ${STORE.name}`;

  // related
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const fill = PRODUCTS.filter(x => x.id !== p.id && !related.includes(x)).slice(0, 4 - related.length);
  document.getElementById('relatedGrid').innerHTML = related.concat(fill).map(productCard).join('');

  // qty
  const qInput = document.getElementById('qInput');
  document.getElementById('qMinus').addEventListener('click', () => { qInput.value = Math.max(1, (+qInput.value || 1) - 1); });
  document.getElementById('qPlus').addEventListener('click', () => { qInput.value = Math.min(99, (+qInput.value || 1) + 1); });
  document.getElementById('pdAdd').addEventListener('click', () => addToCart(p.id, Math.max(1, +qInput.value || 1)));
  document.getElementById('pdWish').addEventListener('click', (e) => { e.currentTarget.classList.toggle('btn-accent'); toast('Ενημερώθηκαν τα αγαπημένα', 'heart'); });

  // tabs
  root.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    root.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    root.querySelectorAll('.tab-panel').forEach(pn => pn.classList.remove('active'));
    btn.classList.add('active');
    root.querySelector(`[data-panel="${btn.getAttribute('data-tab')}"]`).classList.add('active');
  }));

  // thumb active state
  root.querySelectorAll('.pd-thumb').forEach(t => t.addEventListener('click', () => {
    root.querySelectorAll('.pd-thumb').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
  }));

  scanReveal(root);
});
