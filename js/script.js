// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Restaurante da Rosana - Script Loaded');
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    
    mobileMenuBtn.addEventListener('click', () => {
        navCenter.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-center a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navCenter.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
            
            // Handle active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Category Filtering (Visual Only) ---
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
        });
    });

    // --- Reservation Form Submit (Mock) ---
    const resForm = document.getElementById('reservationForm');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sua reserva foi enviada com sucesso! Entraremos em contato em breve.');
            resForm.reset();
        });
    }

    // --- Notifications Panel ---
    const notifBtn = document.getElementById('notification-btn');
    const notifPanel = document.getElementById('notification-panel');
    
    if (notifBtn && notifPanel) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!notifPanel.contains(e.target)) {
                notifPanel.classList.remove('show');
            }
        });
    }

    // --- Global Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (lightbox) {
        document.querySelectorAll('.card-image img, .lightbox-trigger').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                lightbox.style.display = 'flex';
                // Trigger reflow
                void lightbox.offsetWidth;
                lightbox.classList.add('show');
                lightboxImg.src = e.target.src;
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300); // match transition duration
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }
    
    // --- Cart Functionality ---
    const cartBtns = document.querySelectorAll('.product-card .btn, .hero-order-btn, .header-order-btn');
    let cart = JSON.parse(localStorage.getItem('rosanarefeicoes_cart')) || [];
    
    const updateCartUI = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.badge').forEach(badge => {
            badge.textContent = totalItems;
        });
        localStorage.setItem('rosanarefeicoes_cart', JSON.stringify(cart));
        
        // Handle Floating Cart Bar and Chatbot Widget position dynamically
        const floatingCartBar = document.querySelector('.floating-cart-bar');
        const chatbotWidget = document.querySelector('.chatbot-widget');
        if (floatingCartBar) {
            if (totalItems > 0 && window.innerWidth <= 768) {
                floatingCartBar.style.display = 'flex';
                if (chatbotWidget) chatbotWidget.style.bottom = '155px'; // Gap above cart box
            } else {
                floatingCartBar.style.display = 'none';
                if (chatbotWidget && window.innerWidth <= 768) chatbotWidget.style.bottom = '80px'; // Rest at tab bar level
            }
        }
        
        // If on cart page, render items
        const cartWrapper = document.querySelector('.cart-items-wrapper');
        const emptyState = document.querySelector('.empty-cart-state');
        if (cartWrapper && emptyState) {
            if (cart.length === 0) {
                cartWrapper.style.display = 'none';
                document.querySelector('.checkout-summary-box').style.display = 'none';
                emptyState.style.display = 'block';
            } else {
                cartWrapper.style.display = 'block';
                document.querySelector('.checkout-summary-box').style.display = 'block';
                emptyState.style.display = 'none';
                
                cartWrapper.innerHTML = '';
                let subtotal = 0;
                
                cart.forEach((item, index) => {
                    const priceNum = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
                    subtotal += priceNum * item.quantity;
                    
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
                        <img src="${item.imgSrc || './Images/Deal1.avif'}" class="cart-item-img lightbox-trigger" alt="${item.title}" style="cursor: pointer;">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.title}</h4>
                            <span class="cart-item-price">${item.price}</span>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-stepper">
                                <button class="stepper-btn minus-btn" data-index="${index}">-</button>
                                <span class="stepper-value">${item.quantity}</span>
                                <button class="stepper-btn plus-btn" data-index="${index}">+</button>
                            </div>
                            <button class="cart-remove-btn" data-index="${index}" aria-label="Remover">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    `;
                    cartWrapper.appendChild(div);
                });
                
                // Re-bind Lightbox for new cart items
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                if (lightbox && lightboxImg) {
                    cartWrapper.querySelectorAll('.lightbox-trigger').forEach(img => {
                        img.addEventListener('click', (e) => {
                            lightbox.style.display = 'flex';
                            void lightbox.offsetWidth;
                            lightbox.classList.add('show');
                            lightboxImg.src = e.target.src;
                        });
                    });
                }
                
                // Listeners
                cartWrapper.querySelectorAll('.plus-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        cart[e.target.dataset.index].quantity++;
                        updateCartUI();
                    });
                });
                cartWrapper.querySelectorAll('.minus-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.dataset.index;
                        if (cart[idx].quantity > 1) {
                            cart[idx].quantity--;
                        } else {
                            cart.splice(idx, 1);
                        }
                        updateCartUI();
                    });
                });
                cartWrapper.querySelectorAll('.cart-remove-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        cart.splice(e.currentTarget.dataset.index, 1);
                        updateCartUI();
                    });
                });
                
                const subtotalEl = document.querySelector('.subtotal-val');
                const totalEl = document.querySelector('.total-val');
                if (subtotalEl && totalEl) {
                    subtotalEl.textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
                    totalEl.textContent = 'R$ ' + (subtotal + 12).toFixed(2).replace('.', ',');
                }
            }
        }
    };
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            let title = 'Produto Especial';
            let priceText = 'R$ 35,90';
            let imgSrc = './Images/Deal1.avif';
            
            if (card) {
                const titleEl = card.querySelector('h3');
                const priceEl = card.querySelector('.price');
                const imgEl = card.querySelector('img');
                
                if (titleEl) title = titleEl.textContent;
                if (priceEl) priceText = priceEl.textContent;
                if (imgEl) imgSrc = imgEl.src;
            }
            
            const existing = cart.find(item => item.title === title);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ title, price: priceText, quantity: 1, imgSrc });
            }
            
            updateCartUI();
            
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '✓';
            setTimeout(() => btn.innerHTML = originalHTML, 1000);
        });
    });
    
    // Init
    updateCartUI();
    window.addEventListener('resize', updateCartUI);

    // --- Chatbot Functionality ---
    const chatToggle = document.querySelector('.chatbot-toggle');
    const chatContainer = document.querySelector('.chatbot-container');
    const chatClose = document.querySelector('.chatbot-close');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send-btn');
    const chatMessages = document.querySelector('.chatbot-messages');

    if(chatToggle && chatContainer) {
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.toggle('show');
        });
        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('show');
        });

        const addMessage = (text, type) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${type}`;
            msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if(text) {
                addMessage(text, 'user');
                chatInput.value = '';
                
                // Demo bot response
                setTimeout(() => {
                    addMessage('Desculpe, sou apenas um assistente de demonstração no momento. Como posso ajudar com seu pedido?', 'bot');
                }, 1000);
            }
        };

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSend();
        });
    }
    // --- Lazy Load Videos ---
    const lazyVideos = document.querySelectorAll('video');
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source[data-src]');
                    if (source) {
                        source.src = source.dataset.src;
                        video.load();
                        // Only play if it was successfully loaded and muted
                        video.play().catch(e => console.log('Autoplay prevented', e));
                        // Remove data-src to prevent reloading
                        source.removeAttribute('data-src');
                    }
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: "0px 0px 200px 0px" });

        lazyVideos.forEach(video => {
            if(video.querySelector('source[data-src]')) {
                videoObserver.observe(video);
            }
        });
    }
});
