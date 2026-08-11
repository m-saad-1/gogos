const fs = require('fs');
let content = fs.readFileSync('pages/profile.html', 'utf8');

const targetStr = `                <div class="profile-stacked-wrapper" style="max-width: 900px; margin: 0 auto;">
                    
                    <div class="profile-header" style="background: white; border-radius: 16px; padding: 2.5rem 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; margin-bottom: 2rem;">
                        <div style="width: 90px; height: 90px; background: var(--clr-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; margin: 0 auto 1.5rem;">M</div>
                        <h3 style="margin-bottom: 0.5rem; font-size: 1.3rem;">Maria Silva</h3>
                        <p style="color: #666; font-size: 0.95rem;">maria.silva@email.com</p>
                    </div>

                    <div class="profile-nav-buttons">
                        <a href="profile.html" class="profile-btn active">
                            <span class="btn-icon">👤</span>
                            <span class="btn-text">My Details</span>
                        </a>
                        <a href="orders.html" class="profile-btn">
                            <span class="btn-icon">📦</span>
                            <span class="btn-text">My Orders</span>
                        </a>
                        <a href="#" class="profile-btn">
                            <span class="btn-icon">📍</span>
                            <span class="btn-text">Address</span>
                        </a>
                        <a href="#" class="profile-btn danger">
                            <span class="btn-icon">🚪</span>
                            <span class="btn-text">Logout</span>
                        </a>
                    </div>
                    
                    <div class="profile-content" style="background: white; border-radius: 16px; padding: 3.5rem; box-shadow: 0 15px 40px rgba(0,0,0,0.08);">
                        <div class="section-header" style="text-align: left; margin-bottom: 2.5rem;">
                            <h2 style="font-size: 2rem;">Personal Data</h2>
                            <p style="color: #666;">Update your information and preferences.</p>
                        </div>
                        
                        <form id="profileForm">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Full Name</label>
                                    <input type="text" value="Maria Silva" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">CPF</label>
                                    <input type="text" value="123.456.789-00" style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; color: #888; font-family: var(--ff-body); outline: none;" disabled>
                                </div>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Email</label>
                                    <input type="email" value="maria.silva@email.com" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Phone</label>
                                    <input type="tel" value="(11) 98765-4321" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                            </div>
                            
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 3rem 0;">

                            <h3 style="margin-bottom: 1.5rem; color: var(--clr-text-primary); font-size: 1.5rem;">Delivery Address</h3>
                            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Street</label>
                                    <input type="text" value="Avenida Paulista, 1000" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Number / Apto</label>
                                    <input type="text" value="Apto 45" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Neighborhood</label>
                                    <input type="text" value="Bela Vista" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">City</label>
                                    <input type="text" value="Islamabad" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Zip Code</label>
                                    <input type="text" value="01310-100" required style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: var(--ff-body); outline: none;">
                                </div>
                            </div>

                            <hr style="border: 0; border-top: 1px solid #eee; margin: 3rem 0;">
                            
                            <h3 style="margin-bottom: 1.5rem; color: var(--clr-text-primary); font-size: 1.5rem;">Payment Preference</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 3rem;">
                                <label style="flex: 1 1 200px; padding: 1.5rem; border: 2px solid var(--clr-primary); border-radius: 12px; cursor: pointer; text-align: center; position: relative; background: #fffbf8;">
                                    <input type="radio" name="payment" checked style="position: absolute; opacity: 0;">
                                    <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">💳</span>
                                    <span style="font-weight: 600; display: block;">Credit Card</span>
                                    <span style="font-size: 0.85rem; color: #666;">Ending in 4321</span>
                                </label>
                                <label style="flex: 1 1 200px; padding: 1.5rem; border: 2px solid #ddd; border-radius: 12px; cursor: pointer; text-align: center; position: relative;">
                                    <input type="radio" name="payment" style="position: absolute; opacity: 0;">
                                    <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">📱</span>
                                    <span style="font-weight: 600; display: block;">PIX</span>
                                    <span style="font-size: 0.85rem; color: #666;">Registered Key</span>
                                </label>
                            </div>

                            <div style="display: flex; justify-content: flex-end;">
                                <button type="button" onclick="alert('Data updated successfully!')" class="btn btn-primary" style="border-radius: 50px; padding: 1rem 3rem; font-size: 1.1rem; box-shadow: 0 10px 25px rgba(211, 47, 47, 0.4); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>`;

const replaceStr = `                <div class="profile-layout" style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                    <div class="profile-nav-buttons" style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: thin;">
                        <a href="profile.html" class="profile-btn active" style="flex: 1; min-width: 120px;">
                            <span class="btn-icon">👤</span>
                            <span class="btn-text">My Details</span>
                        </a>
                        <a href="orders.html" class="profile-btn" style="flex: 1; min-width: 120px;">
                            <span class="btn-icon">📦</span>
                            <span class="btn-text">My Orders</span>
                        </a>
                        <a href="#" class="profile-btn" style="flex: 1; min-width: 120px;">
                            <span class="btn-icon">📍</span>
                            <span class="btn-text">Addresses</span>
                        </a>
                        <a href="#" class="profile-btn danger" style="flex: 1; min-width: 120px;">
                            <span class="btn-icon">🚪</span>
                            <span class="btn-text">Logout</span>
                        </a>
                    </div>
                    
                    <div class="profile-content" style="background: white; border-radius: 16px; padding: 2.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
                            <h2 style="font-size: 1.8rem;">Personal Data</h2>
                            <p style="color: #666;">Update your information and preferences.</p>
                        </div>
                        
                        <form id="profileForm">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Full Name</label>
                                    <input type="text" value="Maria Silva" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Account ID</label>
                                    <input type="text" value="ACC-849201" style="width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: #f9f9f9; color: #888; font-family: var(--ff-body); outline: none;" disabled>
                                </div>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Email Address</label>
                                    <input type="email" value="maria.silva@email.com" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Phone Number</label>
                                    <input type="tel" value="+92 300 1234567" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                            </div>
                            
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 2.5rem 0;">

                            <h3 style="margin-bottom: 1.5rem; color: var(--clr-text-primary); font-size: 1.4rem;">Delivery Address</h3>
                            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Street Address</label>
                                    <input type="text" value="Jinnah Avenue, Blue Area" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Apt / Suite</label>
                                    <input type="text" value="Floor 4, Office 402" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Sector / Area</label>
                                    <input type="text" value="Sector F-7" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">City</label>
                                    <input type="text" value="Islamabad" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #444;">Postal Code</label>
                                    <input type="text" value="44000" required style="width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: var(--ff-body); outline: none; transition: border-color 0.2s;">
                                </div>
                            </div>

                            <hr style="border: 0; border-top: 1px solid #eee; margin: 2.5rem 0;">
                            
                            <h3 style="margin-bottom: 1.5rem; color: var(--clr-text-primary); font-size: 1.4rem;">Payment Preference</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2.5rem;">
                                <label style="flex: 1 1 200px; padding: 1.5rem; border: 2px solid var(--clr-primary); border-radius: 16px; cursor: pointer; text-align: center; position: relative; background: #fffbf8; transition: all 0.2s ease;">
                                    <input type="radio" name="payment" checked style="position: absolute; opacity: 0;">
                                    <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">💳</span>
                                    <span style="font-weight: 600; display: block; font-size: 1.1rem;">Credit Card</span>
                                    <span style="font-size: 0.85rem; color: #666;">Ending in 4321</span>
                                </label>
                                <label style="flex: 1 1 200px; padding: 1.5rem; border: 2px solid #e0e0e0; border-radius: 16px; cursor: pointer; text-align: center; position: relative; transition: all 0.2s ease;">
                                    <input type="radio" name="payment" style="position: absolute; opacity: 0;">
                                    <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">💵</span>
                                    <span style="font-weight: 600; display: block; font-size: 1.1rem;">Cash on Delivery</span>
                                    <span style="font-size: 0.85rem; color: #666;">Pay at doorstep</span>
                                </label>
                            </div>

                            <div style="display: flex; justify-content: flex-end;">
                                <button type="button" onclick="alert('Data updated successfully!')" class="btn btn-primary" style="border-radius: 50px; padding: 1rem 3rem; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3); transition: transform 0.2s ease;">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('pages/profile.html', content);
console.log('Profile updated');
