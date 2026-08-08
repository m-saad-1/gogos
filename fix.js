const fs = require('fs');
let content = fs.readFileSync('d:\\WEB_DEVELOPMENT\\Rosana_Restaurant\\profile.html', 'utf8');

const replacements = {
    'ðŸ‘¤': '??',
    'ðŸ“¦': '??',
    'ðŸ“ ': '??',
    'ðŸšª': '??',
    'Ã£': 'ã',
    'Ã§': 'ç',
    'Ãµ': 'õ',
    'Ãª': 'ê',
    'Ã¡': 'á',
    'Ã³': 'ó',
    'Ã­': 'í',
    'Ã©': 'é',
    'ðŸ’³': '??',
    'ðŸ“±': '??',
    '<form id="profileForm">        \r\n                        <form id="profileForm">': '<form id="profileForm">'
};

for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
}

// Add back the missing div for profile-header
content = content.replace(
    '<p style="color: #666; font-size: 0.95rem;">maria.silva@email.com</p>\r\n                    <div class="profile-nav-buttons">',
    '<p style="color: #666; font-size: 0.95rem;">maria.silva@email.com</p>\r\n                    </div>\r\n\r\n                    <div class="profile-nav-buttons">'
);

fs.writeFileSync('d:\\WEB_DEVELOPMENT\\Rosana_Restaurant\\profile.html', content, 'utf8');
console.log('Fixed profile.html');
