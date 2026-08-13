/* ==========================================================================
   Banging Burgers - Component Loader
   Injects shared navbar, footer, chatbot, and modals into every page
   automatically. No more copy-pasting HTML across files.

   Usage: Add these two tags to any page's <head> (before closing </body>):
     <script src="/assets/js/config.js"></script>
     <script src="/assets/js/loader.js"></script>
   ========================================================================== */

(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────────────────────── */

  /**
   * Resolve a path from config relative to the current page.
   * Works from both root (index.html) and sub-pages (pages/*.html).
   */
  function resolvePath(configPath) {
    const depth = window.location.pathname.split('/').length - 2;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    return prefix + configPath;
  }

  /** Return the page's filename so nav links can mark the active item. */
  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  /**
   * Inject an HTML string before the first matching selector.
   * @param {string} position - 'afterbegin' | 'beforeend'
   * @param {string} selector - CSS selector for target element
   * @param {string} html     - HTML to inject
   */
  function inject(position, selector, html) {
    const el = document.querySelector(selector);
    if (el) el.insertAdjacentHTML(position, html);
  }

  /* ── Navbar ───────────────────────────────────────────────────────────── */

  function buildNavbar() {
    const cfg = window.BB_CONFIG;
    const page = currentPage();
    const logo = resolvePath(cfg.images.logo);

    const navLinks = [
      { href: 'index.html',              label: 'Home',         cls: 'mobile-hide' },
      { href: 'pages/menu.html',         label: 'Menu',         cls: 'mobile-hide' },
      { href: 'pages/reservations.html', label: 'Reservations', cls: '' },
      { href: 'pages/gallery.html',      label: 'Gallery',      cls: '' },
      { href: 'pages/about.html',        label: 'About',        cls: '' },
      { href: 'pages/contact.html#localizacao',      label: 'Location',      cls: 'desktop-hide' },
    ];

    const linksHTML = navLinks.map(l => {
      const href = resolvePath(l.href);
      const active = (page === l.href.split('/').pop()) ? ' class="active"' : '';
      return `<li${l.cls ? ` class="${l.cls}"` : ''}><a href="${href}"${active}>${l.label}</a></li>`;
    }).join('\n');

    const cartHref   = resolvePath('pages/cart.html');
    const profileHref = resolvePath('pages/profile.html');
    const contactHref = resolvePath('pages/contact.html');

    inject('afterbegin', 'body', `
<header class="navbar">
  <div class="container">
    <div class="nav-left">
      <a href="${resolvePath('index.html')}" class="logo">
        <img fetchpriority="high" decoding="sync" src="${logo}" alt="Banging Burgers Logo" class="header-logo">
      </a>
      <span class="greeting">Hello, welcome! 👋</span>
    </div>

    <nav class="nav-center">
      <ul>${linksHTML}</ul>
      <div class="mobile-only-btn-wrapper">
        <a href="${contactHref}" class="btn btn-primary menu-contact-btn">Contact Us</a>
      </div>
    </nav>

    <div class="nav-right">
      <button class="contact-header-btn" id="contact-header-btn" aria-label="Contact us">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"></path></svg>
      </button>

      <div class="notification-wrapper" style="position:relative;">
        <button class="icon-btn" aria-label="Notifications" id="notification-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>
        <div class="notification-panel" id="notification-panel">
          <div class="notification-header">
            <h4>Notifications</h4>
            <span class="mark-read">Mark all as read</span>
          </div>
          <div class="notification-body empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <p class="m-0">No new notifications</p>
          </div>
        </div>
      </div>

      <a href="${cartHref}" class="icon-btn cart-icon-link" aria-label="Cart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <span class="badge">0</span>
      </a>

      <a href="${profileHref}" class="icon-btn" aria-label="Profile">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </a>

      <button class="mobile-menu-btn" aria-label="Menu">
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
      </button>
    </div>
  </div>
</header>`);
  }

  /* ── Footer ───────────────────────────────────────────────────────────── */

  function buildFooter() {
    const cfg = window.BB_CONFIG;
    const logo = resolvePath(cfg.images.logo);

    const hoursHTML = cfg.hours.map(h =>
      `<li><span>${h.label}:</span> ${h.value}</li>`
    ).join('\n');

    inject('beforeend', 'body', `
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${resolvePath('index.html')}" class="logo footer-logo-link">
          <img fetchpriority="high" decoding="sync" src="${logo}" alt="Logo" class="footer-logo-img">
          Banging Burgers<span class="footer-dot">.</span>
        </a>
        <p>${cfg.brand.tagline}. The perfect place to eat well and gather friends.</p>
      </div>
      <div class="footer-links">
        <h4>Navigation</h4>
        <ul>
          <li><a href="${resolvePath('index.html')}">Home</a></li>
          <li><a href="${resolvePath('pages/menu.html')}">Menu</a></li>
          <li><a href="${resolvePath('pages/offers.html')}">Deals</a></li>
          <li><a href="${resolvePath('pages/about.html')}">About Us</a></li>
        </ul>
      </div>
      <div class="footer-hours">
        <h4>Opening Hours</h4>
        <ul>${hoursHTML}</ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${cfg.brand.copyright}</p>
      <div class="social-links">
        <a href="${cfg.brand.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a href="#">Facebook</a>
      </div>
    </div>
  </div>
</footer>`);
  }

  /* ── Mobile Tab Bar ───────────────────────────────────────────────────── */

  function buildTabBar() {
    const page = currentPage();
    const tabs = [
      { href: 'index.html',         label: 'Home',   icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
      { href: 'pages/menu.html',    label: 'Menu',   icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>' },
      { href: 'pages/offers.html',  label: 'Deals', icon: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>' },
      { href: 'pages/orders.html',  label: 'Orders', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>' },
      { href: 'pages/profile.html', label: 'Profile',icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' },
    ];

    const tabsHTML = tabs.map(t => {
      const active = (page === t.href.split('/').pop()) ? ' active' : '';
      return `<a href="${resolvePath(t.href)}" class="tab-item${active}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${t.icon}</svg>
        <span>${t.label}</span>
      </a>`;
    }).join('\n');

    inject('beforeend', 'body', `
<nav class="mobile-tab-bar">${tabsHTML}</nav>

<div class="floating-cart-bar">
  <div class="cart-info">
    <span class="cart-count">0 items</span>
    <span class="cart-total">Rs 0</span>
  </div>
  <a href="${resolvePath('pages/cart.html')}" class="btn btn-primary cart-view-btn">View Cart</a>
</div>`);
  }

  /* ── Contact Modal ────────────────────────────────────────────────────── */

  function buildContactModal() {
    const cfg = window.BB_CONFIG;
    inject('beforeend', 'body', `
<div class="modal-overlay" id="contact-modal" role="dialog" aria-modal="true">
  <div class="modal-sheet">
    <div class="modal-drag-handle"></div>
    <div class="contact-modal-header">
      <span class="contact-modal-title">Contact Us</span>
      <button class="contact-modal-close" id="contact-modal-close" aria-label="Close">&times;</button>
    </div>
    <div class="contact-modal-body">
      <a href="tel:${cfg.brand.phone}" class="contact-action-row">
        <div class="contact-action-icon phone">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"></path></svg>
        </div>
        <div class="contact-action-text">
          <span class="contact-action-label">Call Us</span>
          <span class="contact-action-value">${cfg.brand.phonePretty}</span>
        </div>
        <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </a>
      <a href="${cfg.brand.whatsapp}" target="_blank" rel="noopener" class="contact-action-row">
        <div class="contact-action-icon whatsapp">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </div>
        <div class="contact-action-text">
          <span class="contact-action-label">WhatsApp</span>
          <span class="contact-action-value">Chat with us instantly</span>
        </div>
        <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </a>
      <a href="mailto:${cfg.brand.email}" class="contact-action-row">
        <div class="contact-action-icon email">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <div class="contact-action-text">
          <span class="contact-action-label">Email Us</span>
          <span class="contact-action-value">${cfg.brand.email}</span>
        </div>
        <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </a>
    </div>
  </div>
</div>`);
  }

  /* ── Item Detail Modal ─────────────────────────────────────────────────── */
  function buildItemModal() {
    inject('beforeend', 'body', `
<div class="modal-overlay" id="item-modal" role="dialog" aria-modal="true" aria-labelledby="modal-item-name">
  <div class="modal-sheet">
    <div class="modal-drag-handle"></div>
    <div class="modal-img-wrap">
      <img id="modal-item-img" src="" alt="" loading="lazy">
    </div>
    <div class="modal-body">
      <span class="modal-category-tag" id="modal-item-category">Category</span>
      <h2 class="modal-item-name" id="modal-item-name">Item Name</h2>
      <p class="modal-item-desc" id="modal-item-desc">Description goes here.</p>
      <div class="modal-price-row">
        <span class="modal-price" id="modal-item-price">Rs 0</span>
        <div class="modal-rating">
          <span>★</span> 4.8 &nbsp;(120+)
        </div>
      </div>
      <!-- Add-ons -->
      <div id="modal-addons-wrap">
        <p class="modal-addons-title">Add-ons</p>
        <div class="addon-options" id="modal-addon-options">
          <!-- Chips injected by JS -->
        </div>
      </div>
      <!-- Qty + Cart -->
      <div class="modal-footer">
        <div class="modal-qty-stepper">
          <button class="modal-qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">−</button>
          <span class="modal-qty-val" id="modal-qty-val">1</span>
          <button class="modal-qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary modal-add-btn" id="modal-add-to-cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Add to Cart — <span id="modal-add-total">Rs 0</span>
        </button>
      </div>
    </div>
  </div>
</div>`);
  }

  /* ── Chatbot ──────────────────────────────────────────────────────────── */

  function buildChatbot() {
    inject('beforeend', 'body', `
<div class="chatbot-widget">
  <button class="chatbot-toggle" aria-label="Open chat">
    <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
  </button>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <div class="chatbot-title">
        <span class="chatbot-avatar">🤖</span>
        <div>
          <h4>Banging Burgers Assistant</h4>
          <span class="online-status">Online now</span>
        </div>
      </div>
      <button class="chatbot-close">&times;</button>
    </div>
    <div class="chatbot-messages">
      <div class="chat-message bot">
        <div class="msg-content">Hello! Welcome to Banging Burgers. How can I help you today?</div>
      </div>
    </div>
    <div class="chatbot-input">
      <input type="text" placeholder="Type your message..." id="chat-input-field">
      <button id="chat-send-btn" aria-label="Send">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  </div>
</div>`);
  }

  /* ── Lightbox ─────────────────────────────────────────────────────────── */

  function buildLightbox() {
    inject('beforeend', 'body', `
<div id="lightbox" class="lightbox">
  <span class="lightbox-close">&times;</span>
  <img loading="lazy" decoding="async" class="lightbox-content" id="lightbox-img">
</div>`);
  }

  /* ── Init ─────────────────────────────────────────────────────────────── */

  function init() {
    buildNavbar();
    buildFooter();
    buildTabBar();
    buildContactModal();
    buildItemModal();
    buildChatbot();
    buildLightbox();
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
