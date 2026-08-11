const fs = require('fs');
let content = fs.readFileSync('pages/about.html', 'utf8');

const targetStr = `        <a href="about.html" class="tab-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>About</span>
        </a>`;

const replaceStr = `        <a href="profile.html" class="tab-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Profile</span>
        </a>`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('pages/about.html', content);
console.log('About updated');
