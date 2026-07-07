/* ==========================================
   WATCHABLE INTERACTIVE LOGIC & ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU DRAWER SYSTEM
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

    // 3. CATALOG FILTER SYSTEM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const watchCards = document.querySelectorAll('.watch-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filters
            filterButtons.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

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

    // 4. WATCH WIKI (DICTIONARY ENGINE)
    const wikiData = [
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

    const wikiSearchInput = document.getElementById('wikiSearchInput');
    const wikiCatButtons = document.querySelectorAll('.wiki-cat-btn');
    const wikiResults = document.getElementById('wikiResults');

    let currentWikiCategory = 'all';
    let wikiQuery = '';

    // Render Wiki Cards
    function renderWiki() {
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
    wikiSearchInput.addEventListener('input', (e) => {
        wikiQuery = e.target.value.toLowerCase().trim();
        renderWiki();
    });

    // Category click
    wikiCatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            wikiCatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWikiCategory = btn.getAttribute('data-cat');
            renderWiki();
        });
    });

    // Initial wiki load
    renderWiki();

    // 5. DAILY RENTAL CALCULATOR
    const rentalWatchType = document.getElementById('rentalWatchType');
    const rentalDays = document.getElementById('rentalDays');
    const rentalResult = document.getElementById('rentalResult');
    const btnBookRental = document.getElementById('btnBookRental');

    // Rental rates config
    const rentalRates = {
        traditional: 500,
        modern: 750,
        unique: 1250
    };

    function calculateRental() {
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

    rentalWatchType.addEventListener('change', calculateRental);
    rentalDays.addEventListener('input', calculateRental);

    btnBookRental.addEventListener('click', () => {
        const typeStr = rentalWatchType.options[rentalWatchType.selectedIndex].text.split(' (')[0];
        const days = rentalDays.value;
        const price = rentalResult.textContent;
        
        alert(`Rental Request Placed!\n\nStyle: ${typeStr}\nDuration: ${days} Days\nEst. Cost: ${price}\n\nJetha Lal's desk will call you at +91 9328291864 shortly to organize security deposit and delivery coordinates in Bardoli.`);
    });


    // 6. REFURBISH VALUATION ESTIMATOR
    const watchTier = document.getElementById('watchTier');
    const watchCondition = document.getElementById('watchCondition');
    const valuationResult = document.getElementById('valuationResult');
    const btnSubmitValuation = document.getElementById('btnSubmitValuation');

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

    watchTier.addEventListener('change', calculateValuation);
    watchCondition.addEventListener('change', calculateValuation);

    btnSubmitValuation.addEventListener('click', () => {
        const tierText = watchTier.options[watchTier.selectedIndex].text.split(' (')[0];
        const conditionText = watchCondition.options[watchCondition.selectedIndex].text.split(' (')[0];
        const range = valuationResult.textContent;

        alert(`Appraisal Request Submitted!\n\nWatch Class: ${tierText}\nAssessed Condition: ${conditionText}\nEstimated Value: ${range}\n\nWe will get back to you to schedule an expert appraisal check at our Bardoli showroom.`);
    });

    // Initial calculations
    calculateRental();
    calculateValuation();


    // 7. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success alert inline
        contactSuccess.style.display = 'block';
        contactForm.reset();
        
        // Scroll slightly down to focus the success alert
        contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            contactSuccess.style.display = 'none';
        }, 8000);
    });

});

// 8. PRE-FILL ENQUIRY FROM CATALOG CARD
window.prefillEnquiry = function(watchName) {
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    // Select the "Purchase" option
    subject.value = 'purchase';
    
    // Set customized body message
    message.value = `Hello Jetha Lal, I am interested in purchasing the watch model: "${watchName}" showcased in your catalog. Please let me know its availability and final discount details.`;
    
    // Smooth scroll to the contact form panel
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
};
