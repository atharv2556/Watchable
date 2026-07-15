/* ==========================================
   WATCHABLE INTERACTIVE LOGIC & ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', async () => {

    // Load .env configuration dynamically
    const env = await window.WatchableAuth.loadEnvConfig();

    // 1. SUPABASE CLIENT INITIALIZATION
    const supabaseUrl = env.SUPABASE_URL || 'https://sebusfrzbejgjnlmsfvv.supabase.co';
    const supabaseKey = env.SUPABASE_ANON_KEY || '';

    let supabase;
    if (window.supabase && supabaseUrl && supabaseKey) {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.error("Supabase SDK not loaded or environment credentials missing. Reverting to static fallback mode.");
    }

    // 2. STICKY HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. MOBILE MENU DRAWER SYSTEM
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add Telephone Quick Link directly into navigation menu for Mobile screens only
    const drawerTel = document.createElement('a');
    drawerTel.href = 'tel:+919328291864';
    drawerTel.className = 'btn-tel btn-tel-drawer';
    drawerTel.style.display = 'none';
    drawerTel.style.marginTop = '20px';
    drawerTel.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>+91 9328291864</span>
    `;
    navMenu.appendChild(drawerTel);

    // 4. DATA SOURCES & DATABASE SYNC
    let watchesData = [
        {
            id: "static-1",
            name: "Chrono-Tech Titanium",
            description: "Minimalist matte titanium bezel with elegant gold indices and hybrid movement.",
            price: 18500,
            category: "modern",
            case_size: "42mm Case",
            movement: "Hybrid Auto",
            band_material: "Titanium Band",
            image_url: "assets/modern_watch.png"
        },
        {
            id: "static-2",
            name: "The Heritage Emperor",
            description: "Roman numerals, polished gold casing, and premium alligator leather strap.",
            price: 24000,
            category: "traditional",
            case_size: "40mm Case",
            movement: "Hand-Wound",
            band_material: "Alligator Leather",
            image_url: "assets/traditional_watch.png"
        },
        {
            id: "static-3",
            name: "The Skeleton Odyssey",
            description: "Skeleton sapphire face displaying intricate brass gears and royal blue hands.",
            price: 45500,
            category: "unique",
            case_size: "44mm Case",
            movement: "Tourbillon Auto",
            band_material: "Sapphire Crystal",
            image_url: "assets/unique_watch.png"
        }
    ];

    let wikiData = [
        {
            term: "Tourbillon",
            category: "complication",
            definition: "An addition to the mechanics of a watch escapement developed around 1795 by Abraham-Louis Breguet. It mounts the escapement and balance wheel in a rotating cage, to negate the effects of gravity when the watch is stuck in a single position."
        },
        {
            term: "Chronograph",
            category: "complication",
            definition: "A specific watch movement featuring an integrated stopwatch mechanism. It allows the measuring of elapsed time intervals via sub-dials, typically controlled by start/stop and reset pushers on the side."
        },
        {
            term: "Automatic winding",
            category: "movement",
            definition: "Also called self-winding. A mechanical movement which winds its mainspring through the natural kinetic movement of the wearer's wrist, using an internal oscillating rotor weight."
        },
        {
            term: "Quartz caliber",
            category: "movement",
            definition: "A highly precise timekeeping movement powered by a battery. It relies on an integrated electronic circuit and a tiny quartz crystal tuning fork vibrating at 32,768 Hz to govern the steps of the hands."
        },
        {
            term: "GMT & Dual Time",
            category: "complication",
            definition: "Greenwich Mean Time complication. Includes an additional independent hour hand that completes a full dial rotation in 24 hours, letting travelers monitor two or more time zones simultaneously."
        },
        {
            term: "Refurbished (Certified)",
            category: "services",
            definition: "A pre-owned luxury watch that undergoes multi-point inspection, ultrasonic deep-cleaning, calibration adjustments on a timegrapher, mechanical seal renewals, and timing checks by Jetha Lal's team before listing."
        },
        {
            term: "Escapement",
            category: "movement",
            definition: "The core heartbeat mechanism in a mechanical watch that regulates and transfers the rotational energy from the mainspring to the balance wheel via incremental tick-tock movements."
        },
        {
            term: "Daily Rental Service",
            category: "services",
            definition: "A Watchable signature lounge service enabling patrons to rent authentic premium timepieces (Traditional, Modern, or Skeleton models) for events, weddings, or meetings at a daily computed rate."
        }
    ];

    // Fetch Watches from Supabase
    async function loadWatches() {
        if (!supabase) return;
        const { data, error } = await supabase.from('watches').select('*').order('created_at', { ascending: true });
        if (error) {
            console.error("Error loading watches:", error);
        } else if (data && data.length > 0) {
            watchesData = data;
        }
        renderWatches();
    }

    // Fetch Wiki Terms from Supabase
    async function loadWikiTerms() {
        if (!supabase) return;
        const { data, error } = await supabase.from('wiki_terms').select('*').order('term', { ascending: true });
        if (error) {
            console.error("Error loading wiki terms:", error);
        } else if (data && data.length > 0) {
            wikiData = data;
        }
        renderWiki();
    }

    // Render Watch Cards into Catalog Grid
    function renderWatches() {
        const catalogGrid = document.getElementById('catalogGrid');
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';

        watchesData.forEach(watch => {
            const card = document.createElement('article');
            card.className = 'watch-card';
            card.setAttribute('data-category', watch.category);
            card.setAttribute('id', `watch-${watch.id}`);

            card.innerHTML = `
                <div class="watch-img-container">
                    <img src="${watch.image_url}" alt="${watch.name}" class="watch-img">
                    <span class="watch-tag">${watch.category}</span>
                </div>
                <div class="watch-info">
                    <h3 class="watch-name">${watch.name}</h3>
                    <p class="watch-desc">${watch.description}</p>
                    <div class="watch-specs">
                        <span>${watch.case_size || 'N/A'}</span>
                        <span>${watch.movement || 'N/A'}</span>
                        <span>${watch.band_material || 'N/A'}</span>
                    </div>
                    <div class="watch-footer">
                        <span class="watch-price">₹${watch.price.toLocaleString('en-IN')}</span>
                        <div class="catalog-card-buttons">
                            <button class="btn-card-add-cart" onclick="addToCart('${watch.id}')" aria-label="Add ${watch.name} to cart">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                            <a href="#contact" class="btn-card-enquiry" onclick="prefillEnquiry('${watch.name}')">Enquire</a>
                        </div>
                    </div>
                </div>
            `;
            catalogGrid.appendChild(card);
        });

        // Initialize Filter Event Listeners with freshly rendered cards
        initCatalogFilters();
    }

    // 5. CATALOG FILTER SYSTEM
    function initCatalogFilters() {
        const watchCards = document.querySelectorAll('.watch-card');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            // Remove previous listeners (by cloning and replacing, or simple checks)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(f => f.classList.remove('active'));
                newBtn.classList.add('active');

                const filterValue = newBtn.getAttribute('data-filter');

                watchCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeReveal 0.4s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. WATCH WIKI (DICTIONARY ENGINE)
    const wikiSearchInput = document.getElementById('wikiSearchInput');
    const wikiCatButtons = document.querySelectorAll('.wiki-cat-btn');
    const wikiResults = document.getElementById('wikiResults');

    let currentWikiCategory = 'all';
    let wikiQuery = '';

    // Render Wiki Cards
    function renderWiki() {
        if (!wikiResults) return;
        wikiResults.innerHTML = '';
        
        const filtered = wikiData.filter(item => {
            const matchesCat = (currentWikiCategory === 'all' || item.category === currentWikiCategory);
            const matchesQuery = item.term.toLowerCase().includes(wikiQuery) || 
                                 item.definition.toLowerCase().includes(wikiQuery);
            return matchesCat && matchesQuery;
        });

        if (filtered.length === 0) {
            wikiResults.innerHTML = `
                <div class="wiki-empty">
                    <p>No dictionary matches found for "${escapeHtml(wikiQuery)}". Try searching another term like "Chronograph" or "Quartz".</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('article');
            card.className = 'wiki-item';
            
            // Highlight search matches
            let termHtml = item.term;
            let defHtml = item.definition;
            if (wikiQuery.trim() !== '') {
                const regex = new RegExp(`(${escapeRegExp(wikiQuery)})`, 'gi');
                termHtml = item.term.replace(regex, '<mark style="background: rgba(212, 175, 55, 0.3); color: #FFF; padding: 0 2px;">$1</mark>');
                defHtml = item.definition.replace(regex, '<mark style="background: rgba(212, 175, 55, 0.3); color: #FFF; padding: 0 2px;">$1</mark>');
            }

            card.innerHTML = `
                <div class="wiki-item-header">
                    <h4 class="wiki-term">${termHtml}</h4>
                    <span class="wiki-badge">${item.category}</span>
                </div>
                <p class="wiki-definition">${defHtml}</p>
            `;
            wikiResults.appendChild(card);
        });
    }

    // Helper functions
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    // Search Keyup
    if (wikiSearchInput) {
        wikiSearchInput.addEventListener('input', (e) => {
            wikiQuery = e.target.value.toLowerCase().trim();
            renderWiki();
        });
    }

    // Category click
    wikiCatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            wikiCatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWikiCategory = btn.getAttribute('data-cat');
            renderWiki();
        });
    });

    // 7. DAILY RENTAL CALCULATOR
    const rentalForm = document.getElementById('rentalForm');
    const rentalWatchType = document.getElementById('rentalWatchType');
    const rentalDays = document.getElementById('rentalDays');
    const rentalResult = document.getElementById('rentalResult');

    // Rental rates config
    const rentalRates = {
        traditional: 500,
        modern: 750,
        unique: 1250
    };

    function calculateRental() {
        if (!rentalWatchType || !rentalDays || !rentalResult) return;
        const type = rentalWatchType.value;
        const days = parseInt(rentalDays.value) || 0;
        
        if (days <= 0) {
            rentalResult.textContent = '₹0';
            return;
        }

        const ratePerDay = rentalRates[type] || 0;
        let total = ratePerDay * days;

        // Apply progressive rental length discounts
        let discountPct = 0;
        if (days >= 20) {
            discountPct = 25; // 25% discount for long terms
        } else if (days >= 10) {
            discountPct = 15; // 15% discount
        } else if (days >= 5) {
            discountPct = 10; // 10% discount
        }

        if (discountPct > 0) {
            total = total * (1 - discountPct / 100);
        }

        // Format to INR Currency
        rentalResult.textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
    }

    if (rentalWatchType) rentalWatchType.addEventListener('change', calculateRental);
    if (rentalDays) rentalDays.addEventListener('input', calculateRental);

    if (rentalForm) {
        rentalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('rentalName').value;
            const phone = document.getElementById('rentalPhone').value;
            const typeStr = rentalWatchType.options[rentalWatchType.selectedIndex].text.split(' (')[0];
            const days = parseInt(rentalDays.value) || 0;
            const price = rentalResult.textContent;
            
            if (supabase) {
                const { error } = await supabase.from('rentals').insert({
                    name,
                    phone,
                    watch_style: typeStr,
                    duration_days: days,
                    estimated_cost: price
                });

                if (error) {
                    console.error("Error submitting rental to Supabase:", error);
                    alert("Submission failed. Please check your network and try again.");
                    return;
                }
            }

            alert(`Rental Request Placed!\n\nStyle: ${typeStr}\nDuration: ${days} Days\nEst. Cost: ${price}\n\nJetha Lal's desk will call you at ${phone} shortly to organize security deposit and delivery coordinates in Bardoli.`);
            rentalForm.reset();
            calculateRental();
        });
    }

    // 8. REFURBISH VALUATION ESTIMATOR
    const valuationForm = document.getElementById('valuationForm');
    const watchTier = document.getElementById('watchTier');
    const watchCondition = document.getElementById('watchCondition');
    const valuationResult = document.getElementById('valuationResult');

    // Base valuations by brand tier
    const baseValuations = {
        luxury: 60000,
        premium: 10000,
        standard: 2000
    };

    // Multipliers by condition
    const conditionMultipliers = {
        excellent: 1.25,
        good: 0.95,
        fair: 0.50
    };

    function calculateValuation() {
        if (!watchTier || !watchCondition || !valuationResult) return;
        const tier = watchTier.value;
        const condition = watchCondition.value;

        const base = baseValuations[tier] || 0;
        const multiplier = conditionMultipliers[condition] || 0;

        const estimatedValue = base * multiplier;
        
        // Calculate lower and upper range boundaries (+/- 15%)
        const lowerRange = Math.round(estimatedValue * 0.85);
        const upperRange = Math.round(estimatedValue * 1.15);

        // Format as Currency Range
        valuationResult.textContent = `₹${lowerRange.toLocaleString('en-IN')} - ₹${upperRange.toLocaleString('en-IN')}`;
    }

    if (watchTier) watchTier.addEventListener('change', calculateValuation);
    if (watchCondition) watchCondition.addEventListener('change', calculateValuation);

    if (valuationForm) {
        valuationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('valuationName').value;
            const phone = document.getElementById('valuationPhone').value;
            const tierText = watchTier.options[watchTier.selectedIndex].text.split(' (')[0];
            const conditionText = watchCondition.options[watchCondition.selectedIndex].text.split(' (')[0];
            const range = valuationResult.textContent;

            if (supabase) {
                const { error } = await supabase.from('appraisals').insert({
                    name,
                    phone,
                    brand_tier: tierText,
                    condition: conditionText,
                    estimated_value: range
                });

                if (error) {
                    console.error("Error submitting appraisal to Supabase:", error);
                    alert("Submission failed. Please check your network and try again.");
                    return;
                }
            }

            alert(`Appraisal Request Submitted!\n\nWatch Class: ${tierText}\nAssessed Condition: ${conditionText}\nEstimated Value: ${range}\n\nWe will get back to you at ${phone} to schedule an expert appraisal check at our Bardoli showroom.`);
            valuationForm.reset();
            calculateValuation();
        });
    }

    // 9. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            if (supabase) {
                const { error } = await supabase.from('enquiries').insert({
                    name,
                    phone,
                    subject,
                    message
                });

                if (error) {
                    console.error("Error submitting enquiry to Supabase:", error);
                    alert("Enquiry failed to send. Please check your connection.");
                    return;
                }
            }
            
            // Show success alert inline
            contactSuccess.style.display = 'block';
            contactForm.reset();
            
            // Scroll slightly down to focus the success alert
            contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            setTimeout(() => {
                contactSuccess.style.display = 'none';
            }, 8000);
        });
    }

    // 10. SHOPPING CART ENGINE
    let sessionId = localStorage.getItem('watchable_session_id');
    if (!sessionId) {
        // Robust UUID generator fallback
        if (typeof crypto.randomUUID === 'function') {
            sessionId = crypto.randomUUID();
        } else {
            sessionId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
        localStorage.setItem('watchable_session_id', sessionId);
    }

    let cartItems = [];

    // Cart Elements
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const cartShopNowBtn = document.getElementById('cartShopNowBtn');
    
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartDrawerFooter = document.getElementById('cartDrawerFooter');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartBadgeCount = document.getElementById('cartBadgeCount');

    // Cart Drawer Toggle
    if (cartToggleBtn) cartToggleBtn.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (cartShopNowBtn) cartShopNowBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

    // Fetch active cart items from Supabase
    async function fetchCart() {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                quantity,
                watch_id,
                watches (
                    id,
                    name,
                    price,
                    image_url
                )
            `)
            .eq('session_id', sessionId);

        if (error) {
            console.error("Error fetching cart items:", error);
        } else {
            cartItems = data || [];
            updateCartUI();
        }
    }

    // Expose Cart actions globally
    window.addToCart = async function(watchId) {
        if (!supabase) {
            alert("Database offline. Cart actions disabled.");
            return;
        }

        const existing = cartItems.find(item => item.watch_id === watchId);
        if (existing) {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: existing.quantity + 1 })
                .eq('id', existing.id);
            if (error) console.error("Error incrementing cart quantity:", error);
        } else {
            const { error } = await supabase
                .from('cart_items')
                .insert({
                    session_id: sessionId,
                    watch_id: watchId,
                    quantity: 1
                });
            if (error) console.error("Error adding item to cart:", error);
        }

        await fetchCart();
        cartDrawer.classList.add('active'); // Slide in cart drawer on success
    };

    window.updateCartQty = async function(cartItemId, newQty) {
        if (!supabase) return;
        if (newQty <= 0) {
            await window.removeCartItem(cartItemId);
            return;
        }

        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQty })
            .eq('id', cartItemId);
        if (error) console.error("Error updating cart quantity:", error);
        
        await fetchCart();
    };

    window.removeCartItem = async function(cartItemId) {
        if (!supabase) return;
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId);
        if (error) console.error("Error removing cart item:", error);
        
        await fetchCart();
    };

    function updateCartUI() {
        if (!cartItemsContainer || !cartDrawerFooter || !cartTotalPrice || !cartBadgeCount) return;

        let totalQty = 0;
        let totalCost = 0;

        cartItems.forEach(item => {
            totalQty += item.quantity;
            if (item.watches) {
                totalCost += item.watches.price * item.quantity;
            }
        });

        cartBadgeCount.textContent = totalQty;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <p>Your cart is empty.</p>
                    <a href="#catalog" class="btn-primary btn-shop-now" onclick="document.getElementById('cartDrawer').classList.remove('active')">Shop Collection</a>
                </div>
            `;
            cartDrawerFooter.style.display = 'none';
            return;
        }

        cartDrawerFooter.style.display = 'flex';
        cartTotalPrice.textContent = `₹${totalCost.toLocaleString('en-IN')}`;

        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const watch = item.watches;
            if (!watch) return;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${watch.image_url}" alt="${watch.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${watch.name}</div>
                    <div class="cart-item-price">₹${watch.price.toLocaleString('en-IN')}</div>
                    <div class="cart-item-actions">
                        <div class="cart-qty-controls">
                            <button class="btn-qty" onclick="updateCartQty('${item.id}', ${item.quantity - 1})">-</button>
                            <span class="cart-qty-val">${item.quantity}</span>
                            <button class="btn-qty" onclick="updateCartQty('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="btn-remove-item" onclick="removeCartItem('${item.id}')">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    // 11. CHECKOUT MODAL LOGIC
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutTotalQty = document.getElementById('checkoutTotalQty');
    const checkoutTotalPrice = document.getElementById('checkoutTotalPrice');

    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            let totalQty = 0;
            let totalCost = 0;
            cartItems.forEach(item => {
                totalQty += item.quantity;
                if (item.watches) {
                    totalCost += item.watches.price * item.quantity;
                }
            });

            checkoutTotalQty.textContent = totalQty;
            checkoutTotalPrice.textContent = `₹${totalCost.toLocaleString('en-IN')}`;

            cartDrawer.classList.remove('active');
            checkoutModal.classList.add('active');
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
    if (checkoutModalOverlay) checkoutModalOverlay.addEventListener('click', () => checkoutModal.classList.remove('active'));

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('checkoutName').value;
            const phone = document.getElementById('checkoutPhone').value;

            let totalCost = 0;
            cartItems.forEach(item => {
                if (item.watches) {
                    totalCost += item.watches.price * item.quantity;
                }
            });

            if (!supabase) return;

            // Step 1: Create Order record
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    session_id: sessionId,
                    customer_name: name,
                    customer_phone: phone,
                    total_price: totalCost
                })
                .select();

            if (orderError) {
                console.error("Error creating order:", orderError);
                alert("Checkout failed. Please try again.");
                return;
            }

            const orderId = orderData[0].id;

            // Step 2: Save Order details
            const orderItemsInsert = cartItems.map(item => ({
                order_id: orderId,
                watch_id: item.watch_id,
                quantity: item.quantity,
                price: item.watches ? item.watches.price : 0
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItemsInsert);

            if (itemsError) {
                console.error("Error creating order items:", itemsError);
            }

            // Step 3: Empty active cart
            const { error: clearError } = await supabase
                .from('cart_items')
                .delete()
                .eq('session_id', sessionId);

            if (clearError) {
                console.error("Error clearing cart items:", clearError);
            }

            alert(`Order Enquiry Placed Successfully!\n\nThank you, ${name}! Your purchase request has been submitted.\n\nJetha Lal's desk will call you at ${phone} within 2 hours to confirm your delivery coordinates in Bardoli.`);
            
            checkoutForm.reset();
            checkoutModal.classList.remove('active');
            await fetchCart();
        });
    }

    /* ==========================================================
       WATCHABLE GOOGLE OAUTH & PROFILE ENCRYPTION CONTROLLER
       ========================================================== */

    // DOM Elements
    const authToggleBtn = document.getElementById('authToggleBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const btnShowAuthModal = document.getElementById('btnShowAuthModal');
    const btnShowConfigModal = document.getElementById('btnShowConfigModal');
    const btnSignOut = document.getElementById('btnSignOut');
    
    const authModal = document.getElementById('authModal');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
    const authModalOverlay = document.getElementById('authModalOverlay');
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    const authStateSignedOut = document.getElementById('authStateSignedOut');
    const authStateSignedIn = document.getElementById('authStateSignedIn');
    
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userStatusDot = document.getElementById('userStatusDot');
    const dropdownUsername = document.getElementById('dropdownUsername');
    const dropdownEmail = document.getElementById('dropdownEmail');
    
    const profileDetailAvatar = document.getElementById('profileDetailAvatar');
    const profileDetailName = document.getElementById('profileDetailName');
    const profileDetailEmail = document.getElementById('profileDetailEmail');
    const decryptedPayloadJson = document.getElementById('decryptedPayloadJson');
    
    const btnSignOutModal = document.getElementById('btnSignOutModal');
    
    // Config Form Elements
    const configForm = document.getElementById('configForm');
    const configClientId = document.getElementById('configClientId');
    const configClientSecret = document.getElementById('configClientSecret');
    const configEncryptionKey = document.getElementById('configEncryptionKey');
    const btnGenerateKey = document.getElementById('btnGenerateKey');
    const btnResetConfig = document.getElementById('btnResetConfig');

    // 1. Toggle User Dropdown Menu
    if (authToggleBtn) {
        authToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdownMenu.classList.toggle('active');
        });
    }

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (userDropdownMenu && !userDropdownMenu.contains(e.target) && e.target !== authToggleBtn) {
            userDropdownMenu.classList.remove('active');
        }
    });

    // 2. Tab Navigation inside Auth Modal
    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalTabBtns.forEach(b => b.classList.remove('active'));
            modalTabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(targetTab);
            if (tabContent) tabContent.classList.add('active');
        });
    });

    // 3. Open Modal helpers
    function openModalToTab(tabId) {
        if (!authModal) return;
        authModal.classList.add('active');
        userDropdownMenu.classList.remove('active');
        
        // Activate matching tab button
        modalTabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show matching tab content
        modalTabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    if (btnShowAuthModal) {
        btnShowAuthModal.addEventListener('click', () => openModalToTab('tab-signin'));
    }
    if (btnShowConfigModal) {
        btnShowConfigModal.addEventListener('click', () => openModalToTab('tab-config'));
    }

    // Close Modals
    if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', () => authModal.classList.remove('active'));
    if (authModalOverlay) authModalOverlay.addEventListener('click', () => authModal.classList.remove('active'));

    // 4. Developer Configuration Manager
    function loadConfigInputs() {
        const config = window.WatchableAuth.getAuthConfig();
        if (configClientId) configClientId.value = config.googleClientId;
        if (configClientSecret) configClientSecret.value = config.googleClientSecret;
        if (configEncryptionKey) configEncryptionKey.value = config.encryptionSecretKey;
    }

    loadConfigInputs(); // Initialize input values

    // Key Generator (Generates a secure 16-character key)
    if (btnGenerateKey) {
        btnGenerateKey.addEventListener('click', () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            let result = '';
            for (let i = 0; i < 16; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            configEncryptionKey.value = result;
        });
    }

    // Save configuration
    if (configForm) {
        configForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.WatchableAuth.saveAuthConfig(
                configClientId.value,
                configClientSecret.value,
                configEncryptionKey.value
            );
            alert("Developer Configuration Saved successfully!\n\nRe-initializing Google Sign-in Client with new credentials...");
            initGoogleSignIn();
        });
    }

    // Reset configuration
    if (btnResetConfig) {
        btnResetConfig.addEventListener('click', () => {
            if (confirm("Are you sure you want to reset configuration? This will restore defaults and clear localStorage settings.")) {
                window.WatchableAuth.resetAuthConfig();
                loadConfigInputs();
                alert("Configuration reset to defaults.");
                initGoogleSignIn();
            }
        });
    }

    // 5. Initialize Google Sign-in SDK Client
    function initGoogleSignIn() {
        const config = window.WatchableAuth.getAuthConfig();
        const googleBtnContainer = document.getElementById('google-signin-btn');
        
        if (!googleBtnContainer) return;
        googleBtnContainer.innerHTML = ''; // Clear previous button or message

        if (!config.googleClientId) {
            googleBtnContainer.innerHTML = `
                <div class="auth-no-client" style="text-align: center; color: var(--accent-gold); padding: 10px; border: 1px dashed var(--border-gold); border-radius: 4px;">
                    <p style="font-size: 0.85rem; margin-bottom: 5px;">⚠️ Google Client ID not configured</p>
                    <button class="btn-small-action" onclick="document.querySelector('[data-tab=tab-config]').click()" style="padding: 4px 8px;">Configure Now</button>
                </div>
            `;
            return;
        }

        try {
            if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
                // If the GSI SDK script isn't loaded yet, try again in 500ms
                setTimeout(initGoogleSignIn, 500);
                return;
            }

            google.accounts.id.initialize({
                client_id: config.googleClientId,
                callback: handleGoogleSignInSuccess
            });

            google.accounts.id.renderButton(
                googleBtnContainer,
                { 
                    theme: "outline", 
                    size: "large", 
                    width: "320", 
                    text: "signin_with",
                    shape: "rectangular"
                }
            );
        } catch (err) {
            console.error("Error initializing Google OAuth SDK:", err);
            googleBtnContainer.innerHTML = `<p style="color: red; font-size: 0.8rem;">Failed to initialize Google Sign-in: ${err.message}</p>`;
        }
    }

    // Google Sign-In SDK Credential Callback
    async function handleGoogleSignInSuccess(response) {
        if (!supabase) {
            alert("Supabase is not initialized. Cannot sign in.");
            return;
        }
        
        const idToken = response.credential;
        
        try {
            // Sign in to Supabase Auth with Google ID Token
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: idToken
            });
            
            if (error) throw error;
            
            alert("Successfully authenticated with Google through Supabase Auth!");
        } catch (err) {
            console.error("Supabase Authentication Error:", err);
            alert(`Authentication failed: ${err.message}`);
        }
    }

    // 6. Handle Encrypted Data Synchronization and Profile View Updates
    async function syncAndLoadUserProfile(session) {
        if (!supabase || !session || !session.user) return;
        
        const user = session.user;
        const profileId = user.id;
        
        try {
            // Check if profile exists in public.encrypted_user_profiles
            const { data: existingProfile, error: selectError } = await supabase
                .from('encrypted_user_profiles')
                .select('*')
                .eq('id', profileId)
                .maybeSingle();
                
            if (selectError) throw selectError;
            
            let encryptedRow;
            
            if (!existingProfile) {
                // Profile doesn't exist - this is a new signup registration!
                // Extract metadata from oauth provider
                const name = user.user_metadata.full_name || user.user_metadata.name || 'Watchable User';
                const email = user.email || '';
                const avatar = user.user_metadata.avatar_url || '';
                
                // Encrypt details client-side using CryptoJS before sending
                const encEmail = window.WatchableAuth.encryptData(email);
                const encName = window.WatchableAuth.encryptData(name);
                const encAvatar = window.WatchableAuth.encryptData(avatar);
                
                // Save encrypted profile row to Supabase
                const { data: newProfile, error: insertError } = await supabase
                    .from('encrypted_user_profiles')
                    .insert({
                        id: profileId,
                        encrypted_email: encEmail,
                        encrypted_name: encName,
                        encrypted_avatar_url: encAvatar
                    })
                    .select()
                    .single();
                    
                if (insertError) throw insertError;
                encryptedRow = newProfile;
            } else {
                // Profile already exists - this is a login!
                encryptedRow = existingProfile;
            }
            
            // Decrypt the details client-side
            const decryptedName = window.WatchableAuth.decryptData(encryptedRow.encrypted_name);
            const decryptedEmail = window.WatchableAuth.decryptData(encryptedRow.encrypted_email);
            const decryptedAvatar = window.WatchableAuth.decryptData(encryptedRow.encrypted_avatar_url);
            
            // 7. Update UI elements with Decrypted details
            // Update Header actions
            if (dropdownUsername) dropdownUsername.textContent = decryptedName;
            if (dropdownEmail) dropdownEmail.textContent = decryptedEmail;
            if (userStatusDot) userStatusDot.classList.add('signed-in');
            
            // Update Header Avatar
            if (decryptedAvatar && userAvatarImg) {
                userAvatarImg.src = decryptedAvatar;
                userAvatarImg.style.display = 'block';
                const avatarIcon = document.querySelector('.icon-avatar-default');
                if (avatarIcon) avatarIcon.style.display = 'none';
            }
            
            // Update Modal Profile Panel
            if (profileDetailName) profileDetailName.textContent = decryptedName;
            if (profileDetailEmail) profileDetailEmail.textContent = decryptedEmail;
            
            if (decryptedAvatar && profileDetailAvatar) {
                profileDetailAvatar.src = decryptedAvatar;
                profileDetailAvatar.style.display = 'block';
                const avatarDetailIcon = document.querySelector('.icon-avatar-detail-default');
                if (avatarDetailIcon) avatarDetailIcon.style.display = 'none';
            }
            
            // Display encrypted and decrypted JSON payload in config preview
            if (decryptedPayloadJson) {
                const payload = {
                    database_status: "SUCCESSFULLY_RETRIEVED",
                    raw_database_payload: {
                        id: encryptedRow.id,
                        encrypted_name: encryptedRow.encrypted_name.substring(0, 15) + "...",
                        encrypted_email: encryptedRow.encrypted_email.substring(0, 15) + "...",
                        encrypted_avatar_url: encryptedRow.encrypted_avatar_url ? (encryptedRow.encrypted_avatar_url.substring(0, 15) + "...") : null,
                        created_at: encryptedRow.created_at
                    },
                    decrypted_client_side: {
                        name: decryptedName,
                        email: decryptedEmail,
                        avatar_url: decryptedAvatar
                    }
                };
                decryptedPayloadJson.textContent = JSON.stringify(payload, null, 2);
            }
            
            // Update button visibility
            if (btnShowAuthModal) btnShowAuthModal.style.display = 'none';
            if (btnSignOut) btnSignOut.style.display = 'block';
            if (authStateSignedOut) authStateSignedOut.style.display = 'none';
            if (authStateSignedIn) authStateSignedIn.style.display = 'block';
            
        } catch (err) {
            console.error("Error loading or synchronizing encrypted user profile:", err);
            if (decryptedPayloadJson) {
                decryptedPayloadJson.textContent = `Error syncing profile: ${err.message}`;
            }
        }
    }

    // 8. Reset UI state on Sign Out
    function handleSignedOutUI() {
        if (dropdownUsername) dropdownUsername.textContent = 'Guest User';
        if (dropdownEmail) dropdownEmail.textContent = 'Not signed in';
        if (userStatusDot) userStatusDot.classList.remove('signed-in');
        
        if (userAvatarImg) {
            userAvatarImg.src = '';
            userAvatarImg.style.display = 'none';
        }
        const avatarIcon = document.querySelector('.icon-avatar-default');
        if (avatarIcon) avatarIcon.style.display = 'block';
        
        const avatarDetailIcon = document.querySelector('.icon-avatar-detail-default');
        if (avatarDetailIcon) avatarDetailIcon.style.display = 'block';
        if (profileDetailAvatar) {
            profileDetailAvatar.src = '';
            profileDetailAvatar.style.display = 'none';
        }
        
        if (btnShowAuthModal) btnShowAuthModal.style.display = 'block';
        if (btnSignOut) btnSignOut.style.display = 'none';
        if (authStateSignedOut) authStateSignedOut.style.display = 'block';
        if (authStateSignedIn) authStateSignedIn.style.display = 'none';
    }

    // Sign Out Handlers
    async function executeSignOut() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
            alert(`Logout failed: ${error.message}`);
        } else {
            handleSignedOutUI();
            alert("Signed out successfully!");
            if (authModal) authModal.classList.remove('active');
        }
    }

    if (btnSignOut) btnSignOut.addEventListener('click', executeSignOut);
    if (btnSignOutModal) btnSignOutModal.addEventListener('click', executeSignOut);

    // 9. Subscribe to Supabase Auth State Changes
    if (supabase) {
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Supabase Auth State Change Event:", event);
            if (session) {
                await syncAndLoadUserProfile(session);
            } else {
                handleSignedOutUI();
            }
        });
    }

    // Initialize Google Button
    initGoogleSignIn();

    // Initialize Database Loading Actions
    renderWatches(); // Render static fallbacks immediately
    renderWiki(); // Render static wiki fallbacks immediately
    
    await loadWatches(); // Load dynamically from database
    await loadWikiTerms(); // Load dynamically from database
    await fetchCart(); // Load active cart items from database
});

// 12. PRE-FILL ENQUIRY FROM CATALOG CARD
window.prefillEnquiry = function(watchName) {
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    if (subject && message) {
        // Select the "Purchase" option
        subject.value = 'purchase';
        
        // Set customized body message
        message.value = `Hello Jetha Lal, I am interested in purchasing the watch model: "${watchName}" showcased in your catalog. Please let me know its availability and final discount details.`;
        
        // Smooth scroll to the contact form panel
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};
