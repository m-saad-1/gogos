const fs = require('fs');
const path = require('path');

const pagesDir = 'd:\\WEB_DEVELOPMENT\\Takeaway-fastfood\\pages';

const contactBtnHtml = `<!-- Contact quick-action icon -->
                <button class="contact-header-btn" id="contact-header-btn" aria-label="Contact us">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"></path></svg>
                </button>`;

const modalsHtml = `<!-- ===== Menu Item Detail Modal ===== -->
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
    </div>

    <!-- ===== Contact Quick-Action Modal ===== -->
    <div class="modal-overlay" id="contact-modal" role="dialog" aria-modal="true">
        <div class="modal-sheet">
            <div class="modal-drag-handle"></div>
            <div class="contact-modal-header">
                <span class="contact-modal-title">Contact Us</span>
                <button class="contact-modal-close" id="contact-modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="contact-modal-body">
                <a href="tel:+923001234567" class="contact-action-row">
                    <div class="contact-action-icon phone">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"></path></svg>
                    </div>
                    <div class="contact-action-text">
                        <span class="contact-action-label">Call Us</span>
                        <span class="contact-action-value">+92 300 123 4567</span>
                    </div>
                    <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener" class="contact-action-row">
                    <div class="contact-action-icon whatsapp">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </div>
                    <div class="contact-action-text">
                        <span class="contact-action-label">WhatsApp</span>
                        <span class="contact-action-value">Chat with us instantly</span>
                    </div>
                    <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <a href="mailto:info@takeaway.pk" class="contact-action-row">
                    <div class="contact-action-icon email">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div class="contact-action-text">
                        <span class="contact-action-label">Email Us</span>
                        <span class="contact-action-value">info@takeaway.pk</span>
                    </div>
                    <svg class="contact-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </div>`;

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add nav-right icon
    if (!content.includes('id="contact-header-btn"')) {
        content = content.replace('<div class="nav-right">', '<div class="nav-right">\n                ' + contactBtnHtml);
    }
    
    // Add modals
    if (!content.includes('id="item-modal"')) {
        content = content.replace('<script src="../assets/js/script.js" defer></script>', modalsHtml + '\n    <script src="../assets/js/script.js" defer></script>');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
