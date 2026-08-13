# Bun and Buzz — Agent Rules

## Project Structure

```
Bun-and-buzz/
├── index.html                  # Homepage
├── pages/                      # Subpages (about, cart, contact, gallery, menu, offers, orders, profile, reservations)
├── assets/
│   ├── css/
│   │   ├── style.css           # Entry point — @import only
│   │   ├── variables.css       # Design tokens (colors, fonts, radii)
│   │   ├── navigation.css      # Navbar, footer, mobile tab bar
│   │   ├── categories.css      # Category circles + sticky bar
│   │   ├── menu-cards.css      # Product cards, menu grid, search bar
│   │   ├── cart-ui.css         # Floating cart, quantity stepper, cart page
│   │   ├── mobile-ui.css       # App-style mobile overrides
│   │   ├── reservations.css    # Reservation page specific styles
│   │   ├── gallery.css         # Gallery grid, lightbox
│   │   ├── notifications.css   # Notifications panel
│   │   ├── orders.css          # Orders & profile page styles
│   │   ├── pages.css           # Hero, about, contact, profile layout
│   │   ├── modals.css          # Shared modal/sheet styles
│   │   └── chatbot.css         # Chatbot widget
│   └── js/
│       ├── script.js           # Entry point — ES module imports only
│       ├── cart.js             # CartManager + cart page rendering
│       ├── chatbot.js          # Chatbot widget logic
│       ├── carousel.js         # Hero image carousel
│       ├── menu.js             # Category sticky nav + real-time search
│       ├── modals.js           # Item detail modal + contact modal
│       ├── orders.js           # Orders page rendering
│       └── ui.js               # formatPrice, lightbox, lazy video, navbar scroll, notifications, mobile menu
└── Docs/                       # Project documentation (do not modify)
```

---

## HTML Page Structure — Shared Boilerplate

> **Do NOT re-read the boilerplate sections of HTML files.** They are identical across all pages.
> Only read the `<main>` content of the specific page you are modifying.

Every HTML page (`index.html` and all `pages/*.html`) contains these **identical** sections:

### `<head>`
- Charset, viewport, Google Fonts (Inter + Poppins)
- `<link rel="stylesheet" href="[../]assets/css/style.css">`
- `<script src="[../]assets/js/script.js" type="module">`

### `<header class="navbar">`
- Logo → `assets/images/logo.png`
- Desktop nav: Home, Menu, Reservations, Gallery, About
- Mobile hamburger menu with same links + Contact button
- Right icons: contact phone button, notification bell, cart icon (with `.badge`), profile icon

### `<footer class="footer">`
- Brand column: logo + tagline
- Navigation links column
- Opening Hours column
- Footer bottom: copyright + social links

### `<nav class="mobile-tab-bar">`
- 5 tabs: Home, Menu, Offers, Orders, Profile
- Active tab differs per page

### Modals (identical on every page)
- `#item-modal` — menu item detail sheet
- `#contact-modal` — contact quick-action sheet (phone, WhatsApp, email)

### Chatbot Widget
- `.chatbot-widget` with toggle button and chat container
- Header reads: **"Bun and Buzz Assistant"**

### What IS unique per page (in `<main>`)
| Page | Unique Content |
|---|---|
| `index.html` | Hero carousel, menu preview, offers, contact section, gallery preview |
| `menu.html` | Category nav + full menu grid with all items |
| `about.html` | About hero, story, why-us cards, delivery/takeaway info, map |
| `contact.html` | Contact info, form, map, FAQs |
| `reservations.html` | Reservation form + info cards |
| `gallery.html` | Gallery grid (videos + images) |
| `offers.html` | Offer promo banners + product grid |
| `cart.html` | Cart items wrapper + checkout summary |
| `orders.html` | Dynamic orders wrapper |
| `profile.html` | Profile header, nav buttons, personal data form |

---

## MODIFICATION RULES

1. **Do NOT scan or modify the entire project for a small UI change.**
2. **First identify the smallest relevant HTML/CSS/JS files** using the structure above.
3. **Only read the `<main>` section of HTML files** — never re-read nav/footer/modals boilerplate.
4. **Do NOT modify unrelated files.**
5. **Do NOT refactor existing code unless explicitly requested.**
6. **Preserve existing design and functionality.**
7. **For CSS changes**, check page-specific CSS before changing global CSS.
8. **Prefer page-specific selectors** when the requested change applies to one page.
9. **Do not duplicate existing styles.**
10. **Do not rewrite large files** when a small targeted edit is sufficient.
11. **Before editing, state which files will be changed** (1–2 sentences max).
12. **After editing, report only the files actually modified.**

---

## Efficiency Rules — Minimizing Token Usage

| Problem | Fix |
|---|---|
| Re-reading files | Use `grep_search` with `MatchPerLine: true` to find exact lines → edit only those lines |
| Bulk text changes across files | Use PowerShell `Get-ChildItem + -replace` — replaces across all files in 1 command |
| Long conversation history | Start a **new conversation** for a new task. Old context inflates every message. |
| Reading full large files | Use `view_file` with `StartLine`/`EndLine` to read only the relevant section |
| Verification after edits | Trust the edit tool output — **do NOT re-read the file after every change** |
| Reading HTML boilerplate | Use the shared structure documented above — never read nav/footer/modals again |
| Searching project-wide | Run a single `grep_search` first to identify affected files before reading any |

---

## Brand Identity

- **Name:** Bun and Buzz
- **Instagram:** https://www.instagram.com/bunandbuzz
- **Location:** Main Boulevard, Gulberg III, Lahore, Pakistan
- **Currency:** Rs (Pakistani Rupees) — no decimal zeros (e.g. `Rs 500` not `Rs 500.00`)
- **Logo file:** `assets/images/logo.png`
- **Hero file:** `assets/images/hero.png`
- **Contact phone:** +923001234567
- **Email:** info@bunandbuzz.pk

---

## Common Patterns

- Cart state: `localStorage` key `hdm_cart` — managed by `CartManager` in `cart.js`
- Orders state: `localStorage` key `hdm_orders`
- All JS files are ES modules — use `import/export`
- `script.js` is the single entry point referenced in all HTML files (`type="module"`)
- CSS is imported via `style.css` — add new module imports there
- `formatPrice()` is in `ui.js` — import it wherever prices are rendered
