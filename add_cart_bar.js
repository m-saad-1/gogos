const fs = require('fs');

const cartBarHTML = `
    <!-- Floating Cart Summary (Mobile) -->
    <div class="floating-cart-bar">
        <div class="cart-info">
            <span class="cart-count">0 items</span>
            <span class="cart-total">Rs 0,00</span>
        </div>
        <a href="cart.html" class="btn btn-primary cart-view-btn" style="text-decoration:none; display:flex; align-items:center; justify-content:center;">View Cart</a>
    </div>
`;

function injectCartBar(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    if (!content.includes('<div class="floating-cart-bar">')) {
        content = content.replace('    <!-- ===== Menu Item Detail Modal ===== -->', cartBarHTML + '    <!-- ===== Menu Item Detail Modal ===== -->');
        fs.writeFileSync(filename, content);
        console.log('Added to ' + filename);
    } else {
        console.log('Already exists in ' + filename);
    }
}

injectCartBar('pages/profile.html');
injectCartBar('pages/orders.html');
