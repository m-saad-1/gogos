const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Target directory
const baseDir = __dirname;

// CSS updates
const cssPath = path.join(baseDir, 'assets/css/style.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/padding: 5rem 0 6rem;/g, 'padding: 3rem 0 4rem;');
    css = css.replace(/padding: 5rem 0;/g, 'padding: 3.5rem 0;');
    css = css.replace(/padding: 6rem 0;/g, 'padding: 4rem 0;');
    css = css.replace(/padding: 4rem 0;/g, 'padding: 2.5rem 0;');
    css = css.replace(/padding: 4rem 1.5rem;/g, 'padding: 2.5rem 1.5rem;');
    css = css.replace(/margin-top: 4rem;/g, 'margin-top: 2.5rem;');
    fs.writeFileSync(cssPath, css);
}

// HTML Updates
const files = [
    'index.html',
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

files.forEach(f => {
    const fullPath = path.join(baseDir, f);
    if (fs.existsSync(fullPath)) {
        let html = fs.readFileSync(fullPath, 'utf8');
        html = html.replace(/padding: 4rem 0;/g, 'padding: 2.5rem 0;');
        html = html.replace(/padding: 5rem 0;/g, 'padding: 3rem 0;');
        html = html.replace(/padding: 6rem 0;/g, 'padding: 3.5rem 0;');
        html = html.replace(/margin-top: 4rem;/g, 'margin-top: 2.5rem;');
        html = html.replace(/margin-top: 5rem;/g, 'margin-top: 3rem;');
        fs.writeFileSync(fullPath, html);
    }
});

console.log('Global spacing reduced');
