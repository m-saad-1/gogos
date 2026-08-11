const fs = require('fs');
const glob = require('glob');
const path = require('path');

const fixFooter = (filePath, isRoot) => {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Fix footer ID
    html = html.replace(/<footer class="footer" id="contato">/g, '<footer class="footer" id="footer">');
    
    // Build new nav links
    const homeLink = isRoot ? 'index.html' : '../index.html';
    const menuLink = isRoot ? 'pages/menu.html' : 'menu.html';
    const offersLink = isRoot ? 'pages/offers.html' : 'offers.html';
    const aboutLink = isRoot ? 'pages/about.html' : 'about.html';
    
    const newNav = `<li><a href="${homeLink}">Home</a></li>
                        <li><a href="${menuLink}">Menu</a></li>
                        <li><a href="${offersLink}">Offers</a></li>
                        <li><a href="${aboutLink}">About Us</a></li>`;
                        
    // Find the navigation ul
    const navRegex = /<li><a href="#home">Home<\/a><\/li>\s*<li><a href="#cardapio">Menu<\/a><\/li>\s*<li><a href="#ofertas">Offers<\/a><\/li>\s*<li><a href="#sobre">About Us<\/a><\/li>/g;
    html = html.replace(navRegex, newNav);
    
    // Also handle case where home is not #home but #
    const navRegex2 = /<li><a href="#">Home<\/a><\/li>\s*<li><a href="#cardapio">Menu<\/a><\/li>\s*<li><a href="#ofertas">Offers<\/a><\/li>\s*<li><a href="#sobre">About Us<\/a><\/li>/g;
    html = html.replace(navRegex2, newNav);
    
    fs.writeFileSync(filePath, html);
};

// Root files
['index.html'].forEach(f => fixFooter(f, true));

// Pages
const pages = [
    'pages/about.html',
    'pages/cart.html',
    'pages/contact.html',
    'pages/gallery.html',
    'pages/menu.html',
    'pages/offers.html',
    'pages/orders.html',
    'pages/profile.html',
    'pages/reservations.html'
];
pages.forEach(f => fixFooter(f, false));

// Also fix index.html section IDs that are Portuguese
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/id="cardapio"/g, 'id="menu-section"');
indexHtml = indexHtml.replace(/href="#cardapio"/g, 'href="pages/menu.html"'); // Or leave it as is if it's already fixed in footer. Wait, there's a hero-order-btn that links to #cardapio.
indexHtml = indexHtml.replace(/id="contato"/g, 'id="contact-section"');
indexHtml = indexHtml.replace(/id="sobre"/g, 'id="about-section"');
fs.writeFileSync('index.html', indexHtml);

console.log('Footer links and Portuguese IDs fixed.');
