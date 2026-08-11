const fs = require('fs');
let content = fs.readFileSync('pages/contact.html', 'utf8');

// Fix Portuguese Modal Text
content = content.replace('Message Enviada!', 'Message Sent!');
content = content.replace('Agradecemos seu contato. We will reply soon.', 'Thank you for contacting us. We will reply soon.');
content = content.replace('>Fechar<', '>Close<');

// Redesign FAQ
const oldFaq = `                <div style="margin-top: 4rem; text-align: center;">
                    <h3 style="color: var(--clr-primary); margin-bottom: 2rem;">Frequently Asked Questions</h3>
                    <div style="max-width: 800px; margin: 0 auto; text-align: left;">
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem;">Do you accept meal vouchers?</strong>
                            <p style="color: #666; font-size: 0.95rem;">Yes, we accept major meal vouchers.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem;">Does the restaurant have a kids area?</strong>
                            <p style="color: #666; font-size: 0.95rem;">Yes, we have a recreational area with monitors on weekends.</p>
                        </div>
                    </div>
                </div>`;

const newFaq = `                <div style="margin-top: 5rem; text-align: center;" id="faq">
                    <h3 style="color: var(--clr-primary); margin-bottom: 0.5rem; font-size: 2rem;">Frequently Asked Questions</h3>
                    <p style="color: #666; margin-bottom: 3rem;">Find quick answers to common questions about our service.</p>
                    <div style="max-width: 800px; margin: 0 auto; text-align: left; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border-left: 4px solid var(--clr-primary);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">What are your delivery hours?</strong>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">We deliver from 11:00 AM to midnight every day. Special deals are available on Fridays.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border-left: 4px solid var(--clr-primary);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">How long does delivery take?</strong>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Our average delivery time is 30-45 minutes depending on your location and traffic.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border-left: 4px solid var(--clr-primary);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">What payment methods do you accept?</strong>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">We accept Cash on Delivery and all major Credit Cards online.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border-left: 4px solid var(--clr-primary);">
                            <strong style="color: var(--clr-text-primary); display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Can I track my order?</strong>
                            <p style="color: #555; font-size: 0.95rem; line-height: 1.5;">Yes! You can check your order status (Preparing, Out for Delivery) on the Orders page in your Profile.</p>
                        </div>
                    </div>
                </div>`;

content = content.replace(oldFaq, newFaq);
fs.writeFileSync('pages/contact.html', content);
console.log('Contact FAQ and text updated');
