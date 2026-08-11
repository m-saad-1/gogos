const fs = require('fs');
let content = fs.readFileSync('pages/contact.html', 'utf8');

content = content.replace('Envie uma Message', 'Send a Message');
content = content.replace('<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Nome</label>', '<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Name</label>');
content = content.replace('<button onclick="document.getElementById(\\\'contactModal\\\').style.display=\\\'none\\\'" class="btn btn-primary" style="width: 100%; border-radius: 50px;">Fechar</button>', '<button onclick="document.getElementById(\\\'contactModal\\\').style.display=\\\'none\\\'" class="btn btn-primary" style="width: 100%; border-radius: 50px;">Close</button>');
// And the "Redes Sociais"
content = content.replace('Redes Sociais', 'Social Networks');

fs.writeFileSync('pages/contact.html', content);
console.log('Contact updated');
