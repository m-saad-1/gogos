const fs = require('fs');

const searchBarHTML = `        <div class="mobile-search-bar">
            <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search dishes..." id="menu-search-input" autocomplete="off">
                <button class="filter-btn" aria-label="Filter" id="menu-filter-clear" style="display:none; color: var(--clr-primary);" onclick="document.getElementById('menu-search-input').value=''; document.getElementById('menu-search-input').dispatchEvent(new Event('input'));">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>`;

// Update index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
const oldIndexSearch = `        <div class="mobile-search-bar">
            <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search dishes...">
                <button class="filter-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </button>
            </div>
        </div>`;
if (indexContent.includes(oldIndexSearch)) {
    fs.writeFileSync('index.html', indexContent.replace(oldIndexSearch, searchBarHTML));
}

// Update menu.html
let menuContent = fs.readFileSync('pages/menu.html', 'utf8');
const oldMenuSearch = `        <div class="mobile-search-bar" style="display: block; background: transparent; padding: 1.2rem 16px 0.8rem;">
            <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Search dishes..." id="menu-search-input" autocomplete="off">
                <button class="filter-btn" aria-label="Filter" id="menu-filter-clear" style="display:none; color: var(--clr-primary);" onclick="document.getElementById('menu-search-input').value=''; document.getElementById('menu-search-input').dispatchEvent(new Event('input'));">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>`;
if (menuContent.includes(oldMenuSearch)) {
    fs.writeFileSync('pages/menu.html', menuContent.replace(oldMenuSearch, searchBarHTML));
}

console.log('Search bars synchronized');
