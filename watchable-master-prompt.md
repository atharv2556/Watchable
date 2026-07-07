# MASTER PROMPT — "Watchable" Watch Store Landing Page
*Copy everything below this line and paste it into any AI coding agent (Claude Code, Cursor, v0, Bolt, Devin, etc.)*

---

## ROLE

You are a senior full-stack web developer and UI/UX designer. Build a **production-ready, fully responsive marketing landing page** for a real watch store called **"Watchable"**. This is a real business website that will go live for real customers — treat it with production-level code quality, not a prototype.

---

## 1. BUSINESS CONTEXT (use this real data throughout the site — do not invent placeholder business info)

- **Store name:** Watchable
- **Owner:** Jetha Lal
- **Location:** Bardoli, Gujarat, India
- **Established:** 1992 (30+ years of legacy — this should be a trust signal throughout the site)
- **Daily recurring customers:** 55+ (use as a social-proof stat)
- **Contact number for enquiries:** +91 93282 91864
- **Category:** Watch retail, resale, and rental store — modern, traditional, and unique/vintage watches

### Core products
- Modern watches (smartwatches, contemporary analog/digital)
- Traditional watches (classic mechanical, heritage brands, vintage-style)
- Unique/rare watches (limited edition, antique, collector pieces)

### Core services (this is NOT a simple e-commerce store — emphasize these differentiators)
1. **Buy & Sell** — customers can sell their old/used watches to the store
2. **Refurbishment** — store professionally refurbishes bought watches and resells them at a lower price (a certified pre-owned style program)
3. **Festive Discounts** — seasonal/festival-based discount campaigns (Diwali, New Year, etc.)
4. **Watch Rental** — daily watch rental service (rent a premium watch for a day — for weddings, events, functions)
5. **Watch Wikipedia / Encyclopedia** — a free knowledge-base/wiki service where users can browse and learn about different watch brands, movements, history, and terminology (this is a unique value-add, treat it as a real content section/mini-database, not just a blurb)

---

## 2. GOAL OF THE PAGE

A single, polished, conversion-focused **landing page** (with the Watch Wiki as either an embedded section or a linked sub-page) that:
- Builds instant trust (30+ years legacy, owner's name, real contact number, local Bardoli identity)
- Clearly explains all 5 services above (not just "we sell watches")
- Has strong calls-to-action: **Call Now**, **WhatsApp Enquiry**, **Book a Rental**, **Sell Your Watch**
- Works flawlessly on **mobile devices first**, then tablet and desktop
- Loads fast and is SEO-optimized for local search ("watch store Bardoli", "watch rental Gujarat", "sell old watch Bardoli", etc.)

---

## 3. TECH STACK (required)

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix primitives) for buttons, dialogs, accordions, forms, tabs
- **Icons:** lucide-react
- **Animations:** Framer Motion (subtle, tasteful — fade/slide on scroll, hover micro-interactions; do not overdo it)
- **Forms:** React Hook Form + Zod validation (for the enquiry/contact form)
- **Images:** next/image for automatic optimization; use high-quality placeholder watch imagery (Unsplash-style royalty-free) until real product photos are supplied
- **Fonts:** A refined serif (e.g. "Playfair Display" or "Cormorant Garamond") for headings to convey heritage/luxury, paired with a clean sans-serif (e.g. "Inter" or "Manrope") for body text
- **Deployment target:** Vercel
- **Package manager:** npm or pnpm
- **Linting/formatting:** ESLint + Prettier configured
- **Analytics-ready:** structure the code so Google Analytics / Meta Pixel can be dropped in later via a single config file

Do **not** substitute a different framework unless explicitly asked — Next.js + Tailwind + shadcn/ui is the required baseline for production quality and maintainability.

---

## 4. DESIGN DIRECTION

- **Aesthetic:** Premium, warm, heritage-meets-modern — think a boutique watch atelier, not a generic tech startup template. Avoid cookie-cutter "SaaS landing page" look (no default blue/purple gradients, no generic stock hero layout).
- **Color palette:** Deep charcoal/black + warm gold/brass accent + cream/off-white background. This should evoke precision, luxury, and trust. Support a clean light mode as default; dark mode is a nice-to-have, not required.
- **Typography:** Large confident headings, generous whitespace, clear visual hierarchy.
- **Imagery:** Watch close-ups, macro shots of dials/straps, warm lighting.
- **Motion:** Subtle scroll-reveal animations, smooth hover states on cards and buttons, no jarring or excessive motion.
- **Mobile-first:** Design and build mobile layout first, then scale up to tablet (768px) and desktop (1280px+) using Tailwind's responsive breakpoints (`sm`, `md`, `lg`, `xl`). Every section must be tested and look correct at 375px width (small phone) as the baseline.

Refer to any internal frontend-design guidance available to you for spacing, contrast, and componentization best practices before writing code.

---

## 5. SITE STRUCTURE / SECTIONS (in order)

1. **Sticky Header/Navbar**
   - Logo/wordmark "Watchable"
   - Nav links: Home, Shop, Sell Your Watch, Rent a Watch, Watch Wiki, About, Contact
   - Prominent "Call Now" button (tel: link) always visible, especially on mobile (sticky bottom bar on mobile with Call + WhatsApp icons)

2. **Hero Section**
   - Strong headline referencing legacy + variety ("Timeless Watches Since 1992" or similar)
   - Subheadline mentioning modern, traditional & unique watches
   - Primary CTA: "Explore Collection" / Secondary CTA: "Sell Your Watch"
   - Hero image/carousel of watches
   - Trust badges: "Est. 1992", "55+ Daily Customers", "Bardoli, Gujarat"

3. **Product Categories Section**
   - Three cards: Modern Watches / Traditional Watches / Unique & Rare Watches
   - Each with image, short description, "View Collection" button

4. **Our Services Section** (the differentiator — give this real visual weight, 4–5 cards/tabs)
   - Buy & Sell Watches
   - Certified Refurbished Watches (at lower prices)
   - Daily Watch Rental
   - Festive Discounts & Offers
   - Watch Encyclopedia / Wiki
   - Each service gets an icon, short explanation, and its own CTA

5. **Watch Wiki / Encyclopedia Section**
   - A searchable/browsable mini-directory (can be a grid of brand/term cards, e.g. "Automatic Movement", "Chronograph", "Rolex", "HMT", "Titan", etc.)
   - Include a search input (client-side filter is fine for MVP) and a "View Full Wiki" link if implemented as a sub-page (`/wiki`)
   - Structure data as a typed array/JSON so content can be expanded later without touching layout code

6. **Why Choose Us / Trust Section**
   - Stats bar: "30+ Years", "55+ Daily Customers", "Certified Refurbishment", "Same-Day Rental"
   - Short story about Jetha Lal and the store's heritage in Bardoli

7. **Testimonials Section**
   - Placeholder testimonial cards (clearly marked as sample content to be replaced with real reviews)

8. **Festive Offers / Promotions Banner**
   - Eye-catching seasonal discount banner component that can be toggled on/off and content-edited easily (store the current offer text in a single config/constants file)

9. **Contact / Enquiry Section**
   - Store address (Bardoli, Gujarat), phone number (clickable `tel:+919328291864`), WhatsApp click-to-chat link
   - Enquiry form: Name, Phone, Enquiry Type (Buy / Sell / Rent / Wiki Question / Other), Message — validated with Zod, shows success/error state (backend submission can stub to a `/api/enquiry` route with a TODO for real email/CRM integration)
   - Embedded Google Map (Bardoli, Gujarat) — iframe embed
   - Store hours

10. **Footer**
    - Logo, short tagline, quick links, social icons (placeholders), owner credit, copyright, phone number repeated

11. **Mobile-only sticky bottom action bar**
    - Fixed bottom bar with "Call Now" and "WhatsApp" buttons, visible only on mobile viewports, always accessible while scrolling

---

## 6. FUNCTIONAL REQUIREMENTS

- Fully responsive: mobile (375px+), tablet (768px+), desktop (1280px+) — no horizontal scroll, no overlapping elements, tap targets at least 44x44px on mobile
- All CTAs functional: `tel:+919328291864` links, WhatsApp deep link (`https://wa.me/919328291864`), working enquiry form with client + server-side validation
- Accessible: semantic HTML5, proper heading hierarchy, alt text on all images, sufficient color contrast (WCAG AA), keyboard navigable, visible focus states, ARIA labels on icon-only buttons
- SEO: proper `<title>`, meta description, Open Graph tags, semantic structure, local-business schema markup (JSON-LD `LocalBusiness` type with name, address, phone, owner)
- Performance: images optimized/lazy-loaded, no layout shift, Lighthouse performance score target 90+
- Clean, componentized code: break the page into reusable components (`Hero.tsx`, `ServicesSection.tsx`, `ProductCategories.tsx`, `WikiSection.tsx`, `Testimonials.tsx`, `ContactForm.tsx`, `Footer.tsx`, etc.) — no single giant page file
- Content (business info, services, wiki entries) should live in typed constants/JSON files (e.g. `lib/data/business.ts`, `lib/data/wiki.ts`) so non-developers can update text without touching component logic
- Include a `README.md` explaining how to run, build, and deploy the project, and how to edit business content

---

## 7. NON-FUNCTIONAL / PRODUCTION REQUIREMENTS

- TypeScript strict mode enabled, no `any` types where avoidable
- No console errors or warnings in production build
- Environment-variable-ready structure for any future API keys (`.env.example` file included)
- Git-ready project structure with a sensible `.gitignore`
- Cross-browser tested logic (avoid browser-specific CSS hacks)
- Code must be clean, commented where non-obvious, and easy for another developer to extend (e.g., adding a real product catalog or e-commerce checkout later)

---

## 8. CONTENT TONE

Warm, trustworthy, rooted in heritage but not old-fashioned. Speak to both younger buyers (interested in modern/smartwatches and rentals for events) and traditional customers (interested in classic/heritage pieces and repair/refurbishment). Highlight the family-business, three-decade trust angle without sounding old or outdated.

---

## 9. DELIVERABLE

Produce the complete working codebase (all files), not just snippets — a project that can be run immediately with `npm install && npm run dev`, and deployed to Vercel with zero additional configuration beyond environment variables. Include placeholder image URLs/comments clearly marked `// TODO: replace with real store photography` wherever real photos of Jetha Lal's actual inventory should eventually go.

---

*End of master prompt.*
