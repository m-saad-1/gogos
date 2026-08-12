// Central price formatting function helper to remove trailing zeros
function formatPrice(price) {
    if (typeof price === 'string') {
        price = price.replace(',', '.');
    }
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    
    let formatted = num.toFixed(2).replace('.', ',');
    if (formatted.endsWith(',00')) {
        return formatted.substring(0, formatted.length - 3);
    }
    if (formatted.includes(',') && formatted.endsWith('0')) {
        return formatted.substring(0, formatted.length - 1);
    }
    return formatted;
}

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
            
            const floatingCart = document.querySelector('.floating-cart-bar');
            if (floatingCart) {
                floatingCart.style.cursor = 'pointer';
                floatingCart.addEventListener('click', () => {
                    const isSubpage = window.location.pathname.includes('/pages/');
                    window.location.href = isSubpage ? 'cart.html' : 'pages/cart.html';
                });
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
            const priceStr = `Rs ${formatPrice(subtotal)}`;
            
            // Update all badges
            document.querySelectorAll('a[href*="cart.html"] .badge').forEach(badge => {
                badge.textContent = totalItems;
                badge.style.display = totalItems > 0 ? 'flex' : 'none';
            });
            
            // Update floating cart bar (mobile)
            const floatingCart = document.querySelector('.floating-cart-bar');
            const chatbotWidget = document.querySelector('.chatbot-widget');
            
            if (floatingCart) {
                if (totalItems > 0 && !window.location.pathname.includes('cart.html')) {
                    floatingCart.style.display = 'flex';
                    const countEl = floatingCart.querySelector('.cart-count');
                    const totalEl = floatingCart.querySelector('.cart-total');
                    if (countEl) countEl.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
                    if (totalEl) totalEl.textContent = priceStr;
                    
                    if (chatbotWidget && window.innerWidth <= 768) {
                        chatbotWidget.style.bottom = '160px';
                    }
                } else {
                    floatingCart.style.display = 'none';
                    if (chatbotWidget && window.innerWidth <= 768) {
                        chatbotWidget.style.bottom = '75px';
                    }
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
        // Event delegation for all lightbox triggers (including dynamic ones)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.lightbox-trigger');
            if (trigger) {
                e.preventDefault();
                lightbox.style.display = 'flex';
                void lightbox.offsetWidth;
                lightbox.classList.add('show');
                
                if (lightboxImg) {
                    const src = trigger.src || trigger.currentSrc || (trigger.querySelector('source') ? trigger.querySelector('source').getAttribute('data-src') || trigger.querySelector('source').src : '');
                    
                    let videoEl = lightbox.querySelector('video');
                    if (src.endsWith('.mp4') || trigger.tagName.toLowerCase() === 'video') {
                        lightboxImg.style.display = 'none';
                        if (!videoEl) {
                            videoEl = document.createElement('video');
                            videoEl.style.maxWidth = '90%';
                            videoEl.style.maxHeight = '80vh';
                            videoEl.style.borderRadius = '8px';
                            videoEl.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
                            videoEl.controls = true;
                            videoEl.autoplay = true;
                            videoEl.className = 'lightbox-video';
                            lightbox.appendChild(videoEl);
                        }
                        videoEl.style.display = 'block';
                        videoEl.src = src;
                        videoEl.play();
                    } else {
                        if (videoEl) {
                            videoEl.style.display = 'none';
                            videoEl.pause();
                        }
                        lightboxImg.style.display = 'block';
                        lightboxImg.src = src;
                    }
                }
            }
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            const videoEl = lightbox.querySelector('video');
            if (videoEl) {
                videoEl.pause();
            }
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
        });
    }
    
    // --- Chatbot Functionality ---
    const chatToggle = document.querySelector('.chatbot-toggle');
    const chatContainer = document.querySelector('.chatbot-container');
    const chatClose = document.querySelector('.chatbot-close');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send-btn');
    const chatMessages = document.querySelector('.chatbot-messages');
    let isTyping = false;

    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.toggle('show');
            if (chatContainer.classList.contains('show') && chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        });

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatContainer.classList.remove('show');
            });
        }

        const addMessage = (text, type) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${type}`;
            msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const showTyping = () => {
            isTyping = true;
            if (chatSend) chatSend.disabled = true;
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message bot typing-indicator';
            typingDiv.innerHTML = `
                <div class="msg-content">
                    <div class="typing-bubble">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const removeTyping = () => {
            isTyping = false;
            if (chatSend) chatSend.disabled = false;
            const typingInd = chatMessages.querySelector('.typing-indicator');
            if (typingInd) typingInd.remove();
        };

        const handleSend = () => {
            if (isTyping) return;
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, 'user');
                chatInput.value = '';
                if (chatSend) chatSend.disabled = true;
                
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage('Thank you for your message! Our team will assist you shortly.', 'bot');
                }, 1500);
            }
        };

        if (chatSend) {
            chatSend.addEventListener('click', handleSend);
            chatSend.disabled = true; // initially empty
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend();
            });
            chatInput.addEventListener('input', () => {
                if (chatSend) chatSend.disabled = chatInput.value.trim().length === 0 || isTyping;
            });
        }
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
    
    if (carouselTrack) {
        const initialSlides = carouselTrack.querySelectorAll('.hero-full-img, img');
        if (initialSlides.length === 1) {
            const clone1 = initialSlides[0].cloneNode(true);
            const clone2 = initialSlides[0].cloneNode(true);
            carouselTrack.appendChild(clone1);
            carouselTrack.appendChild(clone2);
        }
    }
    
    const indicators = document.querySelectorAll('#hero-indicators .indicator');
    if (carouselTrack && indicators.length > 0) {
        const totalSlides = indicators.length;
        let currentSlide = 0;
        let autoPlayInterval;
        let isDragging = false;
        let startX = 0;
        let hasDragged = false;
        let isAnimating = false;

        const updateIndicators = () => {
            indicators.forEach((ind, i) => {
                const isActive = i === currentSlide;
                ind.classList.toggle('active', isActive);
                ind.style.opacity = isActive ? '1' : '0.5';
            });
        };

        const nextSlide = () => {
            if (isAnimating) return;
            isAnimating = true;
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = `translateX(-33.3333%)`;
            
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                carouselTrack.appendChild(carouselTrack.firstElementChild);
                carouselTrack.style.transform = 'translateX(0)';
                currentSlide = (currentSlide + 1) % totalSlides;
                updateIndicators();
                isAnimating = false;
            }, 500);
        };

        const prevSlide = () => {
            if (isAnimating) return;
            isAnimating = true;
            carouselTrack.style.transition = 'none';
            carouselTrack.insertBefore(carouselTrack.lastElementChild, carouselTrack.firstElementChild);
            carouselTrack.style.transform = `translateX(-33.3333%)`;
            void carouselTrack.offsetWidth;
            
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateIndicators();
                isAnimating = false;
            }, 500);
        };

        const goTo = (index) => {
            if (index === currentSlide || isAnimating) return;
            const diff = index - currentSlide;
            if (diff === 1 || diff === -(totalSlides - 1)) {
                nextSlide();
            } else if (diff === -1 || diff === (totalSlides - 1)) {
                prevSlide();
            } else {
                nextSlide(); // For diffs > 1, fallback to single slide to keep it simple
            }
        };

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
                    nextSlide(); // swipe left → next
                } else {
                    prevSlide(); // swipe right → prev
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

        // Create "no results" message element if doesn't exist
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
            const menuSection = document.getElementById('cardapio') || document.getElementById('menu-section');
            if (menuSection) menuSection.querySelector('.container').appendChild(noResultsEl);
        }

        if (menuFilterClear) {
            menuFilterClear.addEventListener('click', () => {
                if (menuSearchInput.value.length > 0) {
                    menuSearchInput.value = '';
                    menuSearchInput.dispatchEvent(new Event('input'));
                }
            });
        }

        menuSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            // Toggle filter icon to clear (X) icon when typing
            if (menuFilterClear) {
                if (query.length > 0) {
                    menuFilterClear.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                    menuFilterClear.style.color = 'var(--clr-primary)';
                } else {
                    menuFilterClear.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>';
                    menuFilterClear.style.color = 'var(--clr-text-primary)';
                }
            }

            if (!query) {
                allProductCards.forEach(card => card.style.display = '');
                document.querySelectorAll('.menu-category-header, .menu-grid').forEach(el => el.style.display = '');
                if (noResultsEl) noResultsEl.style.display = 'none';
                // Reset category headers
                document.querySelectorAll('.menu-grid').forEach(grid => {
                    if (grid.previousElementSibling) grid.previousElementSibling.style.display = '';
                });
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
                
                const prevHeader = grid.previousElementSibling;
                if (prevHeader && (prevHeader.tagName === 'H3' || prevHeader.querySelector('h3'))) {
                    prevHeader.style.display = hasVisible ? '' : 'none';
                }
                grid.style.display = hasVisible ? '' : 'none';
            });
            
            if (noResultsEl) noResultsEl.style.display = anyVisible ? 'none' : 'block';

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
        if (modalImg) {
            modalImg.style.cursor = 'pointer';
            modalImg.addEventListener('click', () => {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = modalImg.src;
                    lightbox.style.display = 'flex';
                    void lightbox.offsetWidth;
                    lightbox.classList.add('show');
                }
            });
        }
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
            modalAddTotal.textContent = `Rs ${formatPrice(total)}`;
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
                if (grid) {
                    if (window.location.pathname.includes('offers.html')) {
                        categoryName = 'Offer';
                    } else if (grid.previousElementSibling) {
                        const heading = grid.previousElementSibling.querySelector('h3, h2');
                        if (heading) {
                            categoryName = heading.textContent.trim();
                        }
                    }
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
                    modalPrice.textContent = 'Rs ' + formatPrice(rawPrice);
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
                        <div class="addon-chip" data-price="2.5">+ Extra Cheese (Rs 2,5)</div>
                        <div class="addon-chip" data-price="3">+ Bacon (Rs 3)</div>
                    `;
                } else if (categoryName.toLowerCase().includes('pizza')) {
                    addonWrap.style.display = 'block';
                    addonOptions.innerHTML = `
                        <div class="addon-chip" data-price="5">+ Stuffed Crust (Rs 5)</div>
                        <div class="addon-chip" data-price="4.5">+ Extra Pepperoni (Rs 4,5)</div>
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
                            ${item.addonsTotal > 0 ? `<p style="font-size:0.8rem; color:#888; margin-bottom:0.2rem;">+ Add-ons (Rs ${formatPrice(item.addonsTotal)})</p>` : ''}
                            <span class="cart-item-price">Rs ${formatPrice(itemTotal)}</span>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-stepper">
                                <button class="stepper-btn" onclick="CartManager.updateItemQty(${index}, ${item.qty - 1})">-</button>
                                <span class="stepper-value">${item.qty}</span>
                                <button class="stepper-btn" onclick="CartManager.updateItemQty(${index}, ${item.qty + 1})">+</button>
                            </div>
                            <button class="cart-remove-btn" onclick="CartManager.removeItem(${index})" aria-label="Remove">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsWrapper.insertAdjacentHTML('beforeend', html);
            });
            
            // Handled automatically via global delegated lightbox event listener

            // Update subtotal / total
            const subtotal = CartManager.getSubtotal();
            const deliveryFee = 12.00;
            const subEl = document.querySelector('.subtotal-val');
            const totEl = document.querySelector('.total-val');
            if (subEl) subEl.textContent = `Rs ${formatPrice(subtotal)}`;
            if (totEl) totEl.textContent = `Rs ${formatPrice(subtotal + deliveryFee)}`;
            
            // Checkout Form Submit
            const checkoutForm = document.getElementById('checkout-form');
            if (checkoutForm) {
                checkoutForm.onsubmit = function(e) {
                    e.preventDefault();
                    const newOrder = {
                        id: Math.floor(1000 + Math.random() * 9000),
                        date: new Date().toLocaleDateString('en-GB') + ', ' + new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'}),
                        items: [...CartManager.state.items],
                        total: CartManager.getSubtotal() + 12.00,
                        status: 'PREPARING'
                    };
                    
                    let savedOrders = JSON.parse(localStorage.getItem('hdm_orders')) || [];
                    savedOrders.unshift(newOrder);
                    localStorage.setItem('hdm_orders', JSON.stringify(savedOrders));

                    CartManager.state.items = [];
                    CartManager.save();
                    alert('Order placed successfully! Redirecting to your orders...');
                    window.location.href = 'orders.html';
                };
            }
        };
        window.renderCartPage();
    }

    // --- Phase 6: Render Orders Page ---
    const ordersContainer = document.querySelector('.dynamic-orders-wrapper');
    if (window.location.pathname.includes('orders.html') && ordersContainer) {
        const renderOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem('hdm_orders')) || [];
            if (savedOrders.length > 0) {
                let html = '';
                savedOrders.forEach(order => {
                    let itemsHtml = order.items.map(i => `<strong style="color:#333;">${i.qty}x</strong> ${i.title}`).join('<br>');
                    html += `
                    <div class="order-card active-order" style="background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 2px solid var(--clr-primary);">
                        <div class="order-header" style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1rem;">
                            <div>
                                <span class="order-status" style="display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 0.3rem 0.8rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">${order.status}</span>
                                <h3 class="order-id" style="margin: 0 0 0.2rem 0; font-size: 1.2rem; color: var(--clr-text-primary);">Order #${order.id}</h3>
                                <span class="order-time" style="color: #666; font-size: 0.85rem;">${order.date}</span>
                            </div>
                            <div style="text-align: right;">
                                <span class="order-price" style="font-weight: 700; color: var(--clr-text-primary); font-size: 1.2rem; display: block; margin-bottom: 0.5rem;">Rs ${formatPrice(order.total)}</span>
                                <span style="font-size: 0.8rem; color: #888;">${order.items.reduce((a,b)=>a+b.qty, 0)} items</span>
                            </div>
                        </div>
                        <div class="order-items-list" style="margin-bottom: 1.5rem;">
                            <p class="order-items" style="margin: 0; color: #555; line-height: 1.6; font-size: 0.95rem;">
                                ${itemsHtml}
                            </p>
                        </div>
                        <div class="order-progress-box" style="background: #f9f9f9; padding: 1rem; border-radius: 12px;">
                            <strong class="order-progress-title" style="display: block; margin-bottom: 0.8rem; color: var(--clr-text-primary); font-size: 0.95rem;">Estimated Delivery: +30-45 mins</strong>
                            <div class="order-progress-bar" style="height: 8px; background: #e0e0e0; border-radius: 4px; margin-bottom: 0.8rem; overflow: hidden;">
                                <div class="order-progress-fill" style="height: 100%; width: 50%; background: var(--clr-primary); border-radius: 4px;"></div>
                            </div>
                            <div class="order-progress-steps" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-weight: 500;">
                                <span style="color: var(--clr-primary);">Confirmed</span>
                                <span class="active" style="color: var(--clr-primary); font-weight: 700;">Preparing</span>
                                <span>Out for Delivery</span>
                            </div>
                        </div>
                    </div>
                    `;
                });
                ordersContainer.innerHTML = html;
                const emptyState = document.querySelector('.empty-orders-state');
                if (emptyState) emptyState.style.display = 'none';
            }
        };
        renderOrders();
    }

    // Dynamic chatbot positioning update on resize
    window.addEventListener('resize', () => {
        if (window.CartManager) {
            window.CartManager.updateUI();
        }
    });

});

    // Search Functionality
    const searchInputs = document.querySelectorAll('.search-input-wrapper input, #search-input');
    const menuItems = document.querySelectorAll('.menu-item');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Sync all search inputs on the page
            searchInputs.forEach(otherInput => {
                if (otherInput !== input) otherInput.value = e.target.value;
            });
            
            menuItems.forEach(item => {
                const title = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
                const desc = item.querySelector('.menu-desc') ? item.querySelector('.menu-desc').textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Hide clear button if empty
            const clearBtn = input.parentElement.querySelector('.filter-btn');
            if (clearBtn) {
                if (searchTerm.length > 0) {
                    clearBtn.style.display = 'flex';
                } else {
                    clearBtn.style.display = 'none'; // or reset
                }
            }
        });
    });
