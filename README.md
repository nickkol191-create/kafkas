# ΚΑΥΚΑΣ — Premium Electronics Store

A complete, multi-page e-commerce **front-end** for an electrical gadgets & devices store.
Deep-navy / electric-blue glow theme, glassmorphism, smooth animations, fully responsive,
Greek language. No build step, no framework — opens in any browser.

## What's inside

| Page | File | Description |
|------|------|-------------|
| Αρχική (Home) | `index.html` | Hero, categories, best sellers, smart-home showcase, why-us, testimonials, newsletter |
| Κατάστημα (Shop) | `shop.html` | Full catalog with category filters, price slider, sort, live search |
| Προϊόν (Product) | `product.html?id=...` | Gallery, specs tabs, related products, add-to-cart |
| Καλάθι (Cart) | `cart.html` | Editable line items, free-shipping bar, totals |
| Ταμείο (Checkout) | `checkout.html` | Contact / shipping / payment form → order confirmation |
| Σχετικά (About) | `about.html` | Story, stats, values, timeline |
| Επικοινωνία (Contact) | `contact.html` | Contact cards, message form, FAQ accordion |

### Features
- 🛒 Working cart with **localStorage** persistence (survives page reloads)
- 🔎 Live search overlay + shop filtering / sorting
- ✨ Scroll-reveal animations, glow hovers, floating hero — all GPU-friendly (transform/opacity only)
- ♿ Accessible: keyboard nav, focus rings, ARIA labels, `prefers-reduced-motion` respected
- 📱 Responsive at 375 / 768 / 1024 / 1440px, no horizontal scroll
- 🖼️ Product visuals are **generated inline SVG** (no external image files) → loads instantly even on weak devices

## Run it

Just open `index.html` in a browser. For clean navigation between pages, serve the folder:

```bash
# from this folder
python -m http.server 5566
# then visit http://localhost:5566
```

## Customize

| What | Where |
|------|-------|
| Store name, phone, email, hours, free-shipping threshold | `assets/js/main.js` → `STORE = {...}` |
| Products (name, price, specs, badges, category) | `assets/js/data.js` → `PRODUCTS` |
| Categories | `assets/js/data.js` → `CATEGORIES` |
| Brand colors, glow, fonts, spacing | `assets/css/styles.css` → `:root { --... }` |
| Fonts | Montserrat (headings) + Open Sans (body), both with full Greek. Swap in the `<link>` of each page + the `:root`/`h1-h4` rules |
| Announcement bar text | `assets/js/main.js` → `buildHeader()` (the `.announcement-bar` block) |
| Logo | `assets/js/main.js` → `logoSvg()` (recreated as inline SVG). **For a pixel-exact logo:** drop your file at `assets/img/logo.svg` (or `.png`) and replace the `logoSvg()` return with an `<img src="assets/img/logo.svg" class="logo">` |

### Swapping in real product photos
The product visual is built by `productVisual()` in `data.js`. To use real photos, replace the
`.pv` markup with an `<img loading="lazy" src="assets/img/your-photo.webp" alt="...">` and add a
`img` field to each product. The CSS already styles `.pv` containers at a 1:1 ratio.

## Going live with real payments
This is a static front-end, so checkout currently **simulates** the order (no money moves).
To accept real payments, connect the checkout form to a provider — e.g. **Stripe Checkout**,
**Viva Wallet**, or a small backend. The cart data is in `localStorage` under `kafkas_cart_v1`
and is easy to POST to a payment session.

---
Brand color sampled from the logo. Built as a polished, production-ready storefront shell.
