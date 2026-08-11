const fs = require('fs');
let indexHTML = fs.readFileSync('index.html', 'utf8');

const targetForm = `                            <form id="contactForm" class="compact-form">
                                <h3 style="margin-bottom: 1.2rem; font-size: 1.2rem; color: var(--clr-text-primary);">Send Us a Message</h3>
                                <div class="form-group">
                                    <label style="display:block; font-weight:500; margin-bottom:0.4rem; font-size:0.9rem; color:#444;">Full Name</label>
                                    <input type="text" placeholder="Your full name" required>
                                </div>
                                <div class="form-group">
                                    <label style="display:block; font-weight:500; margin-bottom:0.4rem; font-size:0.9rem; color:#444;">Email</label>
                                    <input type="email" placeholder="your@email.com" required>
                                </div>
                                <div class="form-group">
                                    <label style="display:block; font-weight:500; margin-bottom:0.4rem; font-size:0.9rem; color:#444;">Phone</label>
                                    <input type="tel" placeholder="+92 300 0000000">
                                </div>
                                <div class="form-group">
                                    <label style="display:block; font-weight:500; margin-bottom:0.4rem; font-size:0.9rem; color:#444;">Subject</label>
                                    <select style="width:100%; padding:0.8rem 1rem; border:1px solid #E5E5E5; border-radius:var(--border-radius); font-family:var(--ff-body); font-size:0.9rem; background:#F8F9FA; appearance:auto;">
                                        <option value="">Select subject...</option>
                                        <option>Order Enquiry</option>
                                        <option>Reservation</option>
                                        <option>Feedback</option>
                                        <option>Complaint</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label style="display:block; font-weight:500; margin-bottom:0.4rem; font-size:0.9rem; color:#444;">Message</label>
                                    <textarea placeholder="How can we help you?" rows="4" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" style="width: 100%; border-radius: 50px;">Send Message</button>
                            </form>`;

const replacementForm = `                        <form class="contact-form" style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);" id="contactForm">
                            <h3 style="margin-bottom: 1.5rem; color: var(--clr-text-primary);">Send a Message</h3>
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Name</label>
                                <input type="text" placeholder="Your name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
                            </div>
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Email</label>
                                <input type="email" placeholder="your@email.com" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
                            </div>
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Subject</label>
                                <select required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; background: white;">
                                    <option value="">Select the subject...</option>
                                    <option>Question</option>
                                    <option>Suggestion</option>
                                    <option>Compliment</option>
                                    <option>Complaint</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: #444;">Message</label>
                                <textarea rows="5" placeholder="How can we help?" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%; border-radius: 50px;">Send Message</button>
                        </form>`;

indexHTML = indexHTML.replace(targetForm, replacementForm);
fs.writeFileSync('index.html', indexHTML);
console.log('index.html form updated');
