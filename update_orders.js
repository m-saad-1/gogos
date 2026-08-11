const fs = require('fs');
let content = fs.readFileSync('pages/orders.html', 'utf8');

const targetStr = `                    <!-- Active Order -->
                    <div class="order-card active-order">
                        <div class="order-header">
                            <div>
                                <span class="order-status">PREPARING</span>
                                <h3 class="order-id">Order #4092</h3>
                                <span class="order-time">Today, 19:42</span>
                            </div>
                            <div style="text-align: right;">
                                <span class="order-price">Rs 231,80</span>
                            </div>
                        </div>
                        <p class="order-items">1x King Deal 1<br>1x Supreme Pizza</p>
                        
                        <div class="order-progress-box">
                            <strong class="order-progress-title">Estimated Delivery: 20:15 - 20:30</strong>
                            <div class="order-progress-bar">
                                <div class="order-progress-fill"></div>
                            </div>
                            <div class="order-progress-steps">
                                <span>Confirmed</span>
                                <span class="active">Preparing</span>
                                <span>Out for Delivery</span>
                            </div>
                        </div>
                    </div>
                    
                    <h3 style="margin-bottom: 1.5rem; color: #444;">Order History</h3>
                    
                    <!-- Past Order -->
                    <div class="order-card">
                        <div class="order-header" style="border: none; padding-bottom: 0; margin-bottom: 0;">
                            <div>
                                <span class="order-status delivered">DELIVERED</span>
                                <h3 class="order-id">Order #3911</h3>
                                <span class="order-time">01/08/2026</span>
                            </div>
                            <div style="text-align: right;">
                                <span class="order-price">Rs 139,90</span>
                                <button class="btn btn-outline" style="border-radius: 50px;">Reorder</button>
                            </div>
                        </div>
                    </div>`;

const replaceStr = `                    <!-- Active Order -->
                    <div class="order-card active-order" style="border: 1px solid #eee; box-shadow: 0 4px 15px rgba(0,0,0,0.05); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; background: #fff;">
                        <div class="order-header" style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f0f0f0; padding-bottom: 1rem; margin-bottom: 1rem;">
                            <div>
                                <span class="order-status" style="background: rgba(220, 38, 38, 0.1); color: var(--clr-primary); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">PREPARING</span>
                                <h3 class="order-id" style="margin: 0.5rem 0 0.2rem; font-size: 1.25rem;">Order #4092</h3>
                                <span class="order-time" style="color: #666; font-size: 0.9rem;">Today, 19:42</span>
                            </div>
                            <div style="text-align: right;">
                                <span class="order-price" style="font-size: 1.25rem; font-weight: 700; color: var(--clr-text-primary);">Rs 167,80</span>
                            </div>
                        </div>
                        <p class="order-items" style="color: #555; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">
                            1x Takeaway Special Deal<br>
                            1x Supreme Pizza
                        </p>
                        
                        <div class="order-progress-box" style="background: #f9f9f9; padding: 1.25rem; border-radius: 12px;">
                            <strong class="order-progress-title" style="display: block; margin-bottom: 0.8rem; color: #333;">Estimated Delivery: 20:15 - 20:30</strong>
                            <div class="order-progress-bar" style="height: 6px; background: #e0e0e0; border-radius: 3px; margin-bottom: 0.8rem; overflow: hidden;">
                                <div class="order-progress-fill" style="width: 50%; height: 100%; background: var(--clr-primary); border-radius: 3px;"></div>
                            </div>
                            <div class="order-progress-steps" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888;">
                                <span style="color: var(--clr-primary); font-weight: 600;">Confirmed</span>
                                <span class="active" style="color: var(--clr-text-primary); font-weight: 600;">Preparing</span>
                                <span>Out for Delivery</span>
                            </div>
                        </div>
                    </div>
                    
                    <h3 style="margin-bottom: 1.5rem; color: #444; font-size: 1.25rem;">Order History</h3>
                    
                    <!-- Past Order -->
                    <div class="order-card" style="border: 1px solid #eee; box-shadow: 0 4px 10px rgba(0,0,0,0.02); padding: 1.5rem; border-radius: 16px; margin-bottom: 1rem; background: #fff;">
                        <div class="order-header" style="display: flex; justify-content: space-between; align-items: flex-start; border: none; padding-bottom: 0; margin-bottom: 0;">
                            <div>
                                <span class="order-status delivered" style="background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">DELIVERED</span>
                                <h3 class="order-id" style="margin: 0.5rem 0 0.2rem; font-size: 1.25rem;">Order #3911</h3>
                                <span class="order-time" style="color: #666; font-size: 0.9rem;">01/08/2026</span>
                                <p class="order-items" style="color: #555; line-height: 1.6; margin-top: 0.8rem; font-size: 0.95rem;">
                                    1x Classic Burger Combo
                                </p>
                            </div>
                            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;">
                                <span class="order-price" style="font-size: 1.25rem; font-weight: 700; color: var(--clr-text-primary);">Rs 57,90</span>
                                <a href="menu.html" class="btn btn-outline" style="border-radius: 50px; font-size: 0.85rem; padding: 0.5rem 1rem; text-decoration: none;">Reorder</a>
                            </div>
                        </div>
                    </div>`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('pages/orders.html', content);
console.log('Orders updated');
