# AI Coding Agent Master Prompt: Watchable Landing Page

You are tasked with building a production-grade, highly professional, and visually stunning landing page for **Watchable**, a premium watch store. The store is located in Bardoli, Gujarat, India, was established in 1992, and is owned by Jetha Lal. 

Follow the specifications below to create the entire codebase (HTML, CSS, JS) from scratch.

---

## 1. Project Overview & Store Brand Info
*   **Store Name:** Watchable
*   **Established:** 1992 (with 55+ daily recurring loyal customers)
*   **Owner:** Jetha Lal
*   **Location:** Gujarat Bardoli, India
*   **Contact Info:** +91 9328291864 (Enquiries)
*   **Core Offerings:**
    1.  **Catalog:** Buying/selling Modern, Traditional, and Unique watches.
    2.  **Services:**
        *   **Buyback & Refurbishment:** Buying pre-owned watches, refurbishing them to high standards, and selling them at a lower price point.
        *   **Festive Discounts:** Timely promotional offers during major Indian festivals.
        *   **Daily Rental Service:** Renting luxury watches on a per-day rate.
        *   **Watch Wiki / Dictionary:** An educational watch encyclopedia/dictionary directory service for horology enthusiasts.

---

## 2. Technology Stack & Technical Constraints
*   **HTML5:** Clean, semantic structure (header, main, section, footer, article, aside). No empty tags or layout wrappers without meaning. Use semantic elements for SEO.
*   **CSS3 (Vanilla):** No CSS framework (e.g. no Tailwind, Bootstrap) unless explicitly overridden. Use CSS variables for a central design system. Include animations (fade-ins, card flips, hover shifts) and full mobile responsiveness via media queries (Breakpoint widths: Mobile < 768px, Tablet 768px-1024px, Desktop > 1024px).
*   **Vanilla JavaScript:** Clean ES6+ logic. Handled modularly for interactive features:
    *   Responsive mobile navigation drawer.
    *   Filterable catalog.
    *   Watch Wiki search engine.
    *   Rental price calculator.
    *   Refurbishment estimator tool.
*   **SEO:** Include Title tags, Meta descriptions, OpenGraph tags, unique element IDs, and Alt tags on all images.
*   **Performance:** Optimize font loading (using Google Fonts display swap) and utilize performant transitions (prefer `transform` and `opacity` over layout shifts).

---

## 3. Visual Identity & Design System (Luxury Theme)
*   **Primary Theme:** Premium Dark/Onyx theme with Gold/Bronze accents.
*   **Color Palette:**
    *   *Onyx Background (Primary):* `#0B0B0C` (or deep gray `#121214`)
    *   *Champagne Gold (Accent):* `#D4AF37`
    *   *Soft Gold/Yellow:* `#F3E5AB`
    *   *Slate/Charcoal (Secondary):* `#1C1C1E`
    *   *Brushed Silver (Text/Details):* `#E5E5EA`
    *   *High-Contrast White:* `#FFFFFF`
*   **Typography:**
    *   *Serif Font (Headers):* 'Playfair Display', serif (elegant, historic, high-end feel).
    *   *Sans-Serif Font (Body/UI):* 'Inter' or 'Outfit', sans-serif (modern, crisp, legible on small screens).
*   **Effects:** Glassmorphism on cards/navbars (`background: rgba(28, 28, 30, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.15)`).

---

## 4. Page Layout & Components

### A. Navigation Bar (Sticky Header)
*   Logo: **Watchable** in elegant serif typography with a miniature gold clock/watch emblem.
*   Menu items: Catalog, Services, Watch Wiki, Legacy, Contact.
*   Enquiry Call-to-Action button highlighting the phone number.
*   Mobile responsive Hamburger menu that opens a sliding overlay drawer.

### B. Hero Section
*   Catchy headline: "Crafting Time, Preserving Legacy" or "Timepieces of Distinction Since 1992".
*   Sub-headline highlighting the owner Jetha Lal, Gujarat Bardoli heritage, and their 55+ daily recurring clients.
*   Stunning hero image of a skeleton watch with exposed gear gold work.
*   Quick call-to-action buttons: "Explore Catalog" and "Rent a Watch".
*   Stat badges: "30+ Years Legacy", "55+ Daily Visitors", "100% Certified Refurbished".

### C. Watch Catalog (Filterable Grid)
*   Interactive tab filters: "All", "Modern", "Traditional", "Unique".
*   Watch Cards featuring high-quality images, clean borders, price tags, and hover reveal effects showing specifications (Case size, movement, material).
*   Mock watch items:
    *   **Modern:** "The Chrono-Tech Sleek" - minimalist matte black, gold indices.
    *   **Traditional:** "The Heritage Emperor" - Roman numerals, alligator leather strap.
    *   **Unique:** "The Skeleton Masterpiece" - visible automatic tourbillon gear movement.

### D. Services Section
Highlight the distinct value propositions:
1.  **Refurbishment Program:** "We Buy, Revitalize & Resell." Detail the multi-step cleaning, timing calibration, and verification process. Includes an interactive valuation estimator.
2.  **Daily Rentals:** "Luxury for a Day." Perfect for wedding events, photo shoots, and interviews.
3.  **Festive Discounts:** Banner promoting custom discount campaigns (e.g. Diwali, Navratri, New Year) with code checkout styling.

### E. Interactive Watch Wiki / Dictionary
*   A dedicated module styled like a clean encyclopedia card.
*   Includes a search bar with a live filter mechanism.
*   Pre-populated with rich horological terms and descriptions:
    *   *Tourbillon:* A complex mechanism designed to counter the effects of gravity on timekeeping.
    *   *Chronograph:* A specific type of watch that is used as a stopwatch combined with a display watch.
    *   *Automatic Movement:* A self-winding mechanical watch powered by the natural motion of the wearer's wrist.
    *   *Quartz Movement:* A highly accurate timekeeping mechanism powered by a battery and synchronized by a quartz crystal.
    *   *Refurbished (Certified):* A pre-owned watch that has been deep-cleaned, serviced, calibrated, and certified for retail resell.
    *   *GMT (Greenwich Mean Time):* A watch that can display two or more time zones simultaneously.

### F. Owner's Legacy & Location Section
*   A stylized biography card of owner Jetha Lal.
*   Quotes about horological passion and serving Gujarat's Bardoli community since 1992.
*   Physical address coordinates: "Opp. Station Road, Bardoli, Gujarat, India".
*   Store hours grid and visual map outline.

### G. Interactive Forms & Footer
*   **Rental Estimator:** Let users select a watch type and enter a number of days to get a cost projection (e.g., Traditional: ₹500/day, Modern: ₹700/day, Unique: ₹1200/day).
*   **Valuation Estimator:** Let users input their watch brand tier (Luxury, Premium, Budget) and condition (Excellent, Good, Fair) to see an estimated trade-in value.
*   **Enquiry Form:** Form fields for Name, Phone, and Message.
*   **Footer:** Logo, copyright info, direct WhatsApp chat link for `+919328291864`.

---

## 5. Implementation Steps for the Coder Agent
1.  **CSS Foundation:** Define CSS custom properties, global styles, and scroll behaviors.
2.  **HTML Architecture:** Write the core semantic grid. Ensure all sections are labeled properly.
3.  **JavaScript Interactivities:**
    *   Implement event listeners for tab switching.
    *   Build search filter matching functions using string matching.
    *   Construct estimation formulas in response to form changes.
4.  **Polish:** Add transition delay states to grid items to load them smoothly. Test layouts on standard mobile viewports. Ensure all text fits without overflow.
