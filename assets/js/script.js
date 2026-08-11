// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('HDM Gourmet - Script Loaded');
    
    // --- Phase 5: Cart Manager ---
    window.CartManager = {
        state: { items: [] },
        init() {
            const saved = localStorage.getItem('hdm_cart');
            if (saved) {
                try { this.state.items = JSON.parse(saved); } catch(e) {}
            }
            this.updateUI();
        },
        save() {
            localStorage.setItem('hdm_cart', JSON.stringify(this.state.items));
            this.updateUI();
            
            // If on cart page, trigger re-render
            if (window.renderCartPage) window.renderCartPage();
        },
        addItem(item) {
            const existing = this.state.items.find(i => i.title === item.title && i.addonsTotal === item.addonsTotal);
            if (existing) {
                existing.qty += item.qty;
            } else {
                this.state.items.push(item);
            }
            this.save();
        },
        updateItemQty(index, newQty) {
            if (newQty < 1) return;
            if (this.state.items[index]) {
                this.state.items[index].qty = newQty;
                this.save();
            }
        },
        removeItem(index) {
            this.state.items.splice(index, 1);
            this.save();
        },
        getTotalItems() {
            return this.state.items.reduce((acc, item) => acc + item.qty, 0);
        },
        getSubtotal() {
            return this.state.items.reduce((acc, item) => acc + ((item.basePrice + (item.addonsTotal || 0)) * item.qty), 0);
        },
        updateUI() {
            const totalItems = this.getTotalItems();
            const subtotal = this.getSubtotal();
            const priceStr = `Rs ${subtotal.toFixed(2).replace('.', ',')}`;
            
            // Update all badges
            document.querySelectorAll('a[href*="cart.html"] .badge').forEach(badge => {
                badge.textContent = totalItems;
                badge.style.display = totalItems > 0 ? 'flex' : 'none';
            });
            
            // Update floating cart bar (mobile)
            const floatingCart = document.querySelector('.floating-cart-bar');
            if (floatingCart) {
                if (totalItems > 0 && !window.location.pathname.includes('cart.html')) {
                    floatingCart.style.display = 'flex';
                    floatingCart.querySelector('.cart-count').textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
                    floatingCart.querySelector('.cart-total').textContent = priceStr;
                } else {
                    floatingCart.style.display = 'none';
                }
            }
        }
    };
    CartManager.init();
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    
    if (mobileMenuBtn && navCenter) {
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
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // --- Category Filtering (Visual Only) ---
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- Reservation Form Submit (Mock) ---
    const resForm = document.getElementById('reservationForm');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your reservation has been submitted! We will get in touch soon.');
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
                void lightbox.offsetWidth;
                lightbox.classList.add('show');
                lightboxImg.src = e.target.src;
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
        });
    }
    
    // --- Cart Functionality ---
    const cartBtns = document.querySelectorAll('.product-card .btn, .hero-order-btn, .header-order-btn');
    let cart = JSON.parse(localStorage.getItem('takeaway_cart')) || [];
    
    const updateCartUI = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.badge').forEach(badge => {
            badge.textContent = totalItems;
        });
        localStorage.setItem('takeaway_cart', JSON.stringify(cart));
        
        // Handle Floating Cart Bar and Chatbot Widget position dynamically
        const floatingCartBar = document.querySelector('.floating-cart-bar');
        const chatbotWidget = document.querySelector('.chatbot-widget');
        if (floatingCartBar) {
            if (totalItems > 0 && window.innerWidth <= 768) {
                floatingCartBar.style.display = 'flex';
                
                // Update floating cart text
                let subtotal = 0;
                cart.forEach(item => {
                    const priceNum = parseFloat(item.price.replace('Rs', '').replace(',', '.').trim());
                    if (!isNaN(priceNum)) subtotal += priceNum * item.quantity;
                });
                const countEl = floatingCartBar.querySelector('.cart-count');
                const totalEl = floatingCartBar.querySelector('.cart-total');
                if (countEl) countEl.textContent = totalItems === 1 ? '1 item' : `${totalItems} items`;
                if (totalEl) totalEl.textContent = `Rs ${subtotal.toFixed(0)}`;

                if (chatbotWidget) chatbotWidget.style.bottom = '170px';
                
                const viewCartBtn = floatingCartBar.querySelector('.cart-view-btn');
                if (viewCartBtn && viewCartBtn.tagName === 'BUTTON') {
                    viewCartBtn.onclick = () => {
                        const href = window.location.pathname.includes('/pages/') ? 'cart.html' : 'pages/cart.html';
                        window.location.href = href;
                    };
                }
            } else {
                floatingCartBar.style.display = 'none';
                if (chatbotWidget && window.innerWidth <= 768) chatbotWidget.style.bottom = '90px';
            }
        }
        
        // If on cart page, render items
        const cartWrapper = document.querySelector('.cart-items-wrapper');
        const emptyState = document.querySelector('.empty-cart-state');
        if (cartWrapper && emptyState) {
            if (cart.length === 0) {
                cartWrapper.style.display = 'none';
                const summaryBox = document.querySelector('.checkout-summary-box');
                if (summaryBox) summaryBox.style.display = 'none';
                emptyState.style.display = 'block';
            } else {
                cartWrapper.style.display = 'block';
                const summaryBox = document.querySelector('.checkout-summary-box');
                if (summaryBox) summaryBox.style.display = 'block';
                emptyState.style.display = 'none';
                
                cartWrapper.innerHTML = '';
                let subtotal = 0;
                
                cart.forEach((item, index) => {
                    const priceNum = parseFloat(item.price.replace('Rs', '').replace(',', '.').trim());
                    if (!isNaN(priceNum)) subtotal += priceNum * item.quantity;
                    
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
                        <img src="${item.imgSrc || './assets/images/Deal (1).avif'}" class="cart-item-img lightbox-trigger" alt="${item.title}" style="cursor: pointer;">
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
                            <button class="cart-remove-btn" data-index="${index}" aria-label="Remove">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    `;
                    cartWrapper.appendChild(div);
                });
                
                // Re-bind Lightbox for new cart items
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
                        const idx = parseInt(e.target.dataset.index);
                        cart[idx].quantity++;
                        updateCartUI();
                    });
                });
                cartWrapper.querySelectorAll('.minus-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(e.target.dataset.index);
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
                        const idx = parseInt(e.currentTarget.dataset.index);
                        cart.splice(idx, 1);
                        updateCartUI();
                    });
                });
                
                const subtotalEl = document.querySelector('.subtotal-val');
                const totalEl = document.querySelector('.total-val');
                const deliveryFee = 100; // Rs 100 delivery
                if (subtotalEl) subtotalEl.textContent = 'Rs ' + subtotal.toFixed(0);
                if (totalEl) totalEl.textContent = 'Rs ' + (subtotal + deliveryFee).toFixed(0);
            }
        }
    };
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            let title = 'Special Item';
            let priceText = 'Rs 500';
            let imgSrc = './assets/images/Deal (1).avif';
            
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

    if (chatToggle && chatContainer) {
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
            if (text) {
                addMessage(text, 'user');
                chatInput.value = '';
                setTimeout(() => {
                    addMessage('Thank you for your message! Our team will assist you shortly. You can also call us directly.', 'bot');
                }, 1000);
            }
        };

        if (chatSend) chatSend.addEventListener('click', handleSend);
        if (chatInput) chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
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
                        video.play().catch(e => console.log('Autoplay prevented', e));
                        source.removeAttribute('data-src');
                    }
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: '0px 0px 200px 0px' });

        lazyVideos.forEach(video => {
            if (video.querySelector('source[data-src]')) {
                videoObserver.observe(video);
            }
        });
    }

    // --- Hero Carousel — Infinite One-Direction Loop ---
    const carouselTrack = document.getElementById('hero-carousel-track');
    const carouselContainer = document.getElementById('hero-carousel-container');
    const indicators = document.querySelectorAll('#hero-indicators .indicator');
    if (carouselTrack && indicators.length > 0) {
        const totalSlides = indicators.length;
        let currentSlide = 0;
        let autoPlayInterval;
        let isDragging = false;
        let startX = 0;
        let hasDragged = false;

        const updateCarousel = (animate = true) => {
            carouselTrack.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
            carouselTrack.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
            indicators.forEach((ind, i) => {
                const isActive = i === currentSlide;
                ind.classList.toggle('active', isActive);
                ind.style.opacity = isActive ? '1' : '0.5';
            });
        };

        const goTo = (index) => {
            currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
            updateCarousel(true);
        };

        const nextSlide = () => goTo(currentSlide + 1);

        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 3500);
        };

        const stopAutoPlay = () => clearInterval(autoPlayInterval);

        // Indicator dot clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(index);
                startAutoPlay();
            });
        });

        // Click anywhere on carousel = next slide
        if (carouselContainer) {
            carouselContainer.addEventListener('click', (e) => {
                if (hasDragged) { hasDragged = false; return; }
                if (e.target.closest('#hero-indicators') || e.target.closest('.hero-order-btn')) return;
                nextSlide();
                startAutoPlay();
            });
        }

        // Touch / drag for swipe
        const onDragStart = (e) => {
            isDragging = true;
            hasDragged = false;
            startX = e.type.includes('touch') ? e.touches[0].clientX : e.pageX;
            stopAutoPlay();
        };

        const onDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.type.includes('touch') ? (e.changedTouches[0]?.clientX ?? startX) : e.pageX;
            const diff = endX - startX;
            if (Math.abs(diff) > 40) {
                hasDragged = true;
                if (diff < 0) {
                    goTo(currentSlide + 1); // swipe left → next
                } else {
                    goTo(currentSlide - 1); // swipe right → prev (wraps)
                }
            }
            startAutoPlay();
        };

        if (carouselContainer) {
            carouselContainer.addEventListener('mousedown', onDragStart);
            carouselContainer.addEventListener('touchstart', onDragStart, { passive: true });
            carouselContainer.addEventListener('mouseup', onDragEnd);
            carouselContainer.addEventListener('touchend', onDragEnd, { passive: true });
            carouselContainer.addEventListener('mouseleave', (e) => { if (isDragging) onDragEnd(e); });
        }

        // Prevent image/text drag
        carouselTrack.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });

        startAutoPlay();
    }

    // --- Phase 3: Sticky Category Navigation ---
    const categoryStickyWrapper = document.getElementById('category-sticky-wrapper');
    if (categoryStickyWrapper) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 60;

        // Update top offset to account for navbar height
        categoryStickyWrapper.style.top = navbarHeight + 'px';

        // Use IntersectionObserver to detect when wrapper has hit the sticky point
        const sentinel = document.createElement('div');
        sentinel.style.cssText = 'height: 1px; pointer-events: none; position: relative;';
        categoryStickyWrapper.parentElement.insertBefore(sentinel, categoryStickyWrapper);

        const stickyObserver = new IntersectionObserver(
            ([entry]) => {
                categoryStickyWrapper.classList.toggle('is-sticky', !entry.isIntersecting);
            },
            { rootMargin: `-${navbarHeight}px 0px 0px 0px`, threshold: 0 }
        );
        stickyObserver.observe(sentinel);

        // Update active tab on category click
        const categoryLinks = categoryStickyWrapper.querySelectorAll('.category-circle-btn');
        categoryLinks.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryLinks.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Auto-update active category on scroll using IntersectionObserver
        const sections = document.querySelectorAll('[id="deals"], [id="chicken"], [id="skewers"], [id="soups"], [id="drinks"], [id="desserts"]');
        const sectionIds = ['deals', 'chicken', 'skewers', 'soups', 'drinks', 'desserts'];
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    categoryLinks.forEach(btn => {
                        const href = btn.getAttribute('href');
                        btn.classList.toggle('active', href === `#${id}`);
                    });
                }
            });
        }, { rootMargin: `-${navbarHeight + 80}px 0px -60% 0px`, threshold: 0 });

        sections.forEach(sec => {
            if (sec) sectionObserver.observe(sec);
        });
    }

    // --- Phase 3: Real-Time Menu Search ---
    const menuSearchInput = document.getElementById('menu-search-input');
    const menuFilterClear = document.getElementById('menu-filter-clear');
    if (menuSearchInput) {
        const allProductCards = document.querySelectorAll('.product-card');
        const allCategoryHeadings = document.querySelectorAll('.menu-grid');

        // Create "no results" message element
        let noResultsEl = document.getElementById('menu-no-results');
        if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.id = 'menu-no-results';
            noResultsEl.style.cssText = 'display:none; text-align:center; padding:3rem 1rem; color:#999;';
            noResultsEl.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2" style="margin-bottom:1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <p style="font-size:1rem; font-weight:600; margin:0 0 0.4rem;">No dishes found</p>
                <p style="font-size:0.85rem; margin:0;">Try a different search term</p>
            `;
            const menuSection = document.getElementById('cardapio');
            if (menuSection) menuSection.querySelector('.container').appendChild(noResultsEl);
        }

        menuSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            // Show/hide clear button
            if (menuFilterClear) {
                menuFilterClear.style.display = query.length > 0 ? 'flex' : 'none';
            }

            if (!query) {
                // Show all
                allProductCards.forEach(card => card.style.display = '');
                document.querySelectorAll('.menu-category-header, .menu-grid').forEach(el => el.style.display = '');
                noResultsEl.style.display = 'none';
                return;
            }

            let anyVisible = false;
            allProductCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
                const matches = title.includes(query) || desc.includes(query);
                card.style.display = matches ? '' : 'none';
                if (matches) anyVisible = true;
            });

            // Hide empty category headings
            document.querySelectorAll('.menu-grid').forEach(grid => {
                const visibleCards = grid.querySelectorAll('.product-card[style=""],.product-card:not([style*="none"])');
                const hasVisible = Array.from(grid.querySelectorAll('.product-card')).some(c => c.style.display !== 'none');
                // Hide preceding header
                const prevHeader = grid.previousElementSibling;
                if (prevHeader) prevHeader.style.display = hasVisible ? '' : 'none';
                grid.style.display = hasVisible ? '' : 'none';
            });

        });
    }

    // --- Phase 4: Modals Logic ---
    // 1. Contact Header Modal
    const contactHeaderBtns = document.querySelectorAll('.contact-header-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = document.getElementById('contact-modal-close');

    if (contactModal) {
        contactHeaderBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                contactModal.classList.add('active');
            });
        });
        
        if (contactModalClose) {
            contactModalClose.addEventListener('click', () => contactModal.classList.remove('active'));
        }
    }

    // 2. Menu Item Detail Modal
    const itemModal = document.getElementById('item-modal');
    if (itemModal) {
        const modalImg = document.getElementById('modal-item-img');
        const modalCategory = document.getElementById('modal-item-category');
        const modalName = document.getElementById('modal-item-name');
        const modalDesc = document.getElementById('modal-item-desc');
        const modalPrice = document.getElementById('modal-item-price');
        const modalAddTotal = document.getElementById('modal-add-total');
        const modalQtyVal = document.getElementById('modal-qty-val');
        const qtyMinus = document.getElementById('modal-qty-minus');
        const qtyPlus = document.getElementById('modal-qty-plus');
        const addonWrap = document.getElementById('modal-addons-wrap');
        const addonOptions = document.getElementById('modal-addon-options');
        const addToCartBtn = document.getElementById('modal-add-to-cart');

        let currentBasePrice = 0;
        let currentQty = 1;
        let selectedAddonsTotal = 0;

        function updateModalTotal() {
            const total = (currentBasePrice + selectedAddonsTotal) * currentQty;
            modalAddTotal.textContent = `Rs ${total.toFixed(2).replace('.', ',')}`;
        }

        // Handle Qty Stepper
        if (qtyMinus && qtyPlus) {
            qtyMinus.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    modalQtyVal.textContent = currentQty;
                    updateModalTotal();
                }
            });
            qtyPlus.addEventListener('click', () => {
                if (currentQty < 99) {
                    currentQty++;
                    modalQtyVal.textContent = currentQty;
                    updateModalTotal();
                }
            });
        }

        // Open modal on product card click
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // If they clicked the 'Add' button directly, we can either add to cart immediately or just open modal
                // For Phase 4, we open the modal for everything
                e.preventDefault();
                
                const img = card.querySelector('.card-image img');
                const title = card.querySelector('h3');
                const desc = card.querySelector('.card-desc');
                const priceEl = card.querySelector('.price');

                // Try to find category from closest menu-grid's previous heading, or fallback
                let categoryName = 'Menu Item';
                const grid = card.closest('.menu-grid');
                if (grid && grid.previousElementSibling && grid.previousElementSibling.querySelector('h3')) {
                    categoryName = grid.previousElementSibling.querySelector('h3').textContent;
                }

                // Populate Modal
                if (img) modalImg.src = img.src;
                if (title) modalName.textContent = title.textContent;
                if (desc) modalDesc.textContent = desc.textContent;
                else modalDesc.textContent = '';
                
                modalCategory.textContent = categoryName;
                
                // Parse price
                let rawPrice = 0;
                if (priceEl) {
                    const priceText = priceEl.textContent.replace(/[^\d.,]/g, '').replace(',', '.');
                    rawPrice = parseFloat(priceText) || 0;
                    modalPrice.textContent = priceEl.textContent;
                }
                currentBasePrice = rawPrice;
                currentQty = 1;
                selectedAddonsTotal = 0;
                modalQtyVal.textContent = currentQty;
                
                // Mock Add-ons based on category (just for UI completeness as requested)
                addonOptions.innerHTML = '';
                if (categoryName.toLowerCase().includes('burger') || categoryName.toLowerCase().includes('sandwich')) {
                    addonWrap.style.display = 'block';
                    addonOptions.innerHTML = `
                        <div class="addon-chip" data-price="2.50">+ Extra Cheese (Rs 2,50)</div>
                        <div class="addon-chip" data-price="3.00">+ Bacon (Rs 3,00)</div>
                    `;
                } else if (categoryName.toLowerCase().includes('pizza')) {
                    addonWrap.style.display = 'block';
                    addonOptions.innerHTML = `
                        <div class="addon-chip" data-price="5.00">+ Stuffed Crust (Rs 5,00)</div>
                        <div class="addon-chip" data-price="4.50">+ Extra Pepperoni (Rs 4,50)</div>
                    `;
                } else {
                    addonWrap.style.display = 'none';
                }

                // Add-on chip click logic
                addonOptions.querySelectorAll('.addon-chip').forEach(chip => {
                    chip.addEventListener('click', () => {
                        chip.classList.toggle('selected');
                        const p = parseFloat(chip.getAttribute('data-price'));
                        if (chip.classList.contains('selected')) {
                            selectedAddonsTotal += p;
                        } else {
                            selectedAddonsTotal -= p;
                        }
                        updateModalTotal();
                    });
                });

                updateModalTotal();
                itemModal.classList.add('active');
            });
        });

        // Add to cart animation from modal
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const originalText = addToCartBtn.innerHTML;
                addToCartBtn.innerHTML = 'Added! ✓';
                addToCartBtn.style.background = '#4CAF50';
                
                // Trigger cart update
                CartManager.addItem({
                    title: modalName.textContent,
                    image: modalImg.src,
                    basePrice: currentBasePrice,
                    addonsTotal: selectedAddonsTotal,
                    qty: currentQty
                });

                setTimeout(() => {
                    addToCartBtn.innerHTML = originalText;
                    addToCartBtn.style.background = '';
                    itemModal.classList.remove('active');
                }, 800);
            });
        }
    }

    // 3. Global Modal Overlay Click-to-Close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // --- Phase 5: Cart Page Rendering ---
    const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
    if (cartItemsWrapper && window.location.pathname.includes('cart.html')) {
        window.renderCartPage = function() {
            const items = CartManager.state.items;
            const emptyState = document.querySelector('.empty-cart-state');
            const summaryBox = document.querySelector('.checkout-summary-box');
            
            if (items.length === 0) {
                cartItemsWrapper.style.display = 'none';
                if (summaryBox) summaryBox.style.display = 'none';
                if (emptyState) emptyState.style.display = 'block';
                return;
            }
            
            cartItemsWrapper.style.display = 'block';
            if (summaryBox) summaryBox.style.display = 'block';
            if (emptyState) emptyState.style.display = 'none';
            
            cartItemsWrapper.innerHTML = '';
            items.forEach((item, index) => {
                const itemTotal = (item.basePrice + (item.addonsTotal || 0)) * item.qty;
                const html = `
                    <div class="cart-item">
                        <img src="${item.image}" class="cart-item-img lightbox-trigger" alt="${item.title}">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.title}</h4>
                            ${item.addonsTotal > 0 ? `<p style="font-size:0.8rem; color:#888; margin-bottom:0.2rem;">+ Add-ons (Rs ${item.addonsTotal.toFixed(2).replace('.', ',')})</p>` : ''}
                            <span class="cart-item-price">Rs ${itemTotal.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-stepper">
                                <button class="stepper-btn" onclick="CartManager.updateItemQty(${index}, ${item.qty - 1})">-</button>
                                <span class="stepper-value">${item.qty}</span>
                                <button class="stepper-btn" onclick="CartManager.updateItemQty(${index}, ${item.qty + 1})">+</button>
                            </div>
                            <button class="cart-remove-btn" onclick="CartManager.removeItem(${index})" aria-label="Remover">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsWrapper.insertAdjacentHTML('beforeend', html);
            });
            
            // Re-bind lightboxes
            cartItemsWrapper.querySelectorAll('.lightbox-trigger').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const lightbox = document.getElementById('lightbox');
                    const lightboxImg = document.getElementById('lightbox-img');
                    if (lightbox && lightboxImg) {
                        lightboxImg.src = trigger.src;
                        lightbox.classList.add('active');
                    }
                });
            });

            // Update subtotal / total
            const subtotal = CartManager.getSubtotal();
            const deliveryFee = 12.00;
            const subEl = document.querySelector('.subtotal-val');
            const totEl = document.querySelector('.total-val');
            if (subEl) subEl.textContent = `Rs ${subtotal.toFixed(2).replace('.', ',')}`;
            if (totEl) totEl.textContent = `Rs ${(subtotal + deliveryFee).toFixed(2).replace('.', ',')}`;
            
            // Checkout Form Submit
            const checkoutForm = document.getElementById('checkout-form');
            if (checkoutForm) {
                checkoutForm.onsubmit = function(e) {
                    e.preventDefault();
                    // Clear cart
                    CartManager.state.items = [];
                    CartManager.save();
                    alert('Order placed successfully! Redirecting to your orders...');
                    window.location.href = 'orders.html';
                };
            }
        };
        window.renderCartPage();
    }
});
