# Highway Delite - Project Tasks

## Project Overview
Building a fullstack booking application for travel experiences with Next.js + TypeScript frontend and Express/NestJS backend.

---

## 📋 ASSETS NEEDED

### Images Required (from Figma analysis):
1. **Logo**: Highway Delite logo with pin icon (black)
2. **Experience Images** (8 experiences visible):
   - Kayaking (Udupi) - mangrove waterway with kayak
   - Nandi Hills Sunrise (Bangalore) - sunrise over hills
   - Coffee Trail (Coorg) - misty green hills
   - Kayaking (Udupi, Karnataka) - person kayaking
   - Nandi Hills Sunrise (Bangalore) - sunset over mountains
   - Boat Cruise (Sunderban) - white boat on water
   - Bunjee Jumping (Manali) - person on bunjee setup
   - Coffee Trail (Coorg) - misty forest path

### Icons Needed:
- Search icon (for search bar)
- Back arrow icon (for Details/Checkout pages)
- Checkmark icon in circle (for success page)
- Plus/Minus icons (for quantity selector)

### Color Palette (from Figma):
- Primary Yellow: `#FCD34D` (buttons)
- Background Gray: `#F5F5F5` or similar
- Text Dark: `#1F2937` or similar
- Text Gray: `#6B7280` or similar
- Border Gray: `#E5E7EB`
- Success Green: `#10B981` (checkmark)
- Sold Out Red: Badge color for sold slots

---

## 🎯 PROJECT STRUCTURE

### Frontend Structure Needed:
```
app/
├── page.tsx                    # Home page (experiences list)
├── experiences/
│   └── [id]/
│       └── page.tsx           # Details page (slots, dates)
├── checkout/
│   └── page.tsx               # Checkout page (user info, promo)
├── confirmation/
│   └── page.tsx               # Success/failure page
├── components/
│   ├── ExperienceCard.tsx     # Card component for home
│   ├── Header.tsx             # Header with logo and search
│   ├── DateSelector.tsx       # Date selection component
│   ├── TimeSlotSelector.tsx   # Time slot selection
│   ├── PriceSummary.tsx       # Price breakdown sidebar
│   └── PromoCodeInput.tsx     # Promo code validator
├── lib/
│   ├── api.ts                 # API client functions
│   └── types.ts               # TypeScript interfaces
└── globals.css                # Global styles
```

### Backend Structure Needed:
```
server/
├── src/
│   ├── index.ts               # Main server file
│   ├── routes/
│   │   ├── experiences.ts     # GET /experiences, GET /experiences/:id
│   │   ├── bookings.ts        # POST /bookings
│   │   └── promo.ts           # POST /promo/validate
│   ├── models/
│   │   ├── Experience.ts      # Experience schema
│   │   ├── Slot.ts            # Slot schema
│   │   └── Booking.ts         # Booking schema
│   ├── controllers/
│   │   ├── experienceController.ts
│   │   ├── bookingController.ts
│   │   └── promoController.ts
│   └── db/
│       ├── connection.ts      # Database connection
│       └── seed.ts            # Seed data
├── package.json
└── tsconfig.json
```

---

## ✅ TASK CHECKLIST

### Phase 1: Setup & Configuration ✅ COMPLETED
- [✅] Next.js project initialized
- [✅] TailwindCSS configured
- [✅] TypeScript configured
- [✅] Install additional dependencies (axios, react-hook-form, lucide-react)

### Phase 2: Asset Collection & Preparation ✅ COMPLETED
- [✅] Create/collect logo image (HDlogo.png)
- [✅] Collect 8 experience images from Unsplash/Pexels
- [✅] Add images to `/public` folder
- [✅] Create SVG icons or use icon library (lucide-react installed)

### Phase 3: Backend Development ✅ COMPLETED
- [✅] Create API routes in `/app/api` folder (Next.js API routes)
- [✅] Setup mock in-memory database in `lib/mockData.ts`
- [✅] Create database schemas (Experience, Slot, Booking)
- [✅] Implement GET /api/experiences endpoint
- [✅] Implement GET /api/experiences/:id endpoint
- [✅] Implement POST /api/bookings endpoint
- [✅] Implement POST /api/promo/validate endpoint
- [✅] Add validation and error handling
- [✅] Seed database with experience data (8 experiences)
- [✅] Integrated with frontend (no separate server needed)

### Phase 4: Frontend - Type Definitions & API Client ✅ COMPLETED
- [✅] Create TypeScript interfaces in `lib/types.ts`
- [✅] Create API client functions in `lib/api.ts`
- [✅] Setup Axios with base URL configuration

### Phase 5: Frontend - Shared Components ✅ IN PROGRESS
- [✅] Create Header component with logo and search
- [✅] Create PriceSummary component (sidebar)
- [✅] Create ExperienceCard component
- [ ] Create Loading state component
- [ ] Create Error message component

### Phase 6: Frontend - Home Page ✅ COMPLETED
- [✅] Build ExperienceCard component
- [✅] Implement home page layout (grid of cards)
- [✅] Fetch experiences from API
- [✅] Add loading and error states
- [✅] Implement responsive design (mobile/desktop)
- [ ] Match Figma design exactly (spacing, colors, typography)

### Phase 7: Frontend - Details Page 🚧 NEXT
- [ ] Create dynamic route for experiences/[id]
- [ ] Build DateSelector component
- [ ] Build TimeSlotSelector component (with availability badges)
- [ ] Implement quantity selector
- [ ] Display experience details and image
- [ ] Integrate PriceSummary with live calculation
- [ ] Handle slot selection and price updates
- [ ] Add "Confirm" button navigation to checkout
- [ ] Match Figma design exactly

## ✅ COMPLETED SO FAR

### Backend (100% Complete)
✅ Next.js API routes (serverless)
✅ All 4 required API endpoints:
  - GET /api/experiences
  - GET /api/experiences/[id]
  - POST /api/bookings
  - POST /api/promo/validate
✅ Mock database with 8 experiences (in-memory)
✅ Promo code validation (SAVE10, FLAT100)
✅ Slot availability tracking
✅ No separate server needed - integrated with Next.js
✅ Running on http://localhost:3000/api

### Frontend (Home Page Complete)
✅ Next.js 16 with TypeScript
✅ TailwindCSS styling
✅ Header component with logo and search
✅ ExperienceCard component
✅ PriceSummary component
✅ Home page with experience grid
✅ API integration with Axios
✅ Loading and error states
✅ Responsive design
✅ Running on http://localhost:3001

### Assets
✅ HDlogo.png added
✅ 8 experience images added
✅ Assignment screenshots saved

## 🎯 WHAT'S NEXT

1. **Details Page** - Build the experience details page with date/time slot selection
2. **Checkout Page** - Create checkout form with promo code input
3. **Confirmation Page** - Success/failure messaging
4. **Polish UI** - Match Figma design exactly
5. **Testing** - End-to-end booking flow
6. **Deployment** - Deploy to Vercel and Render

### Phase 8: Frontend - Checkout Page
- [ ] Create checkout page layout
- [ ] Build form inputs (name, email)
- [ ] Build PromoCodeInput component with "Apply" button
- [ ] Add terms and conditions checkbox
- [ ] Integrate promo validation API
- [ ] Update price summary with promo discount
- [ ] Implement form validation
- [ ] Add "Pay and Confirm" button
- [ ] Match Figma design exactly

### Phase 9: Frontend - Confirmation Page
- [ ] Create confirmation page layout
- [ ] Display success message with checkmark icon
- [ ] Show booking reference ID
- [ ] Add "Back to Home" button
- [ ] Handle failure states
- [ ] Match Figma design exactly

### Phase 10: Integration & Testing ✅ COMPLETED
- [✅] Fixed TypeScript type issues in all pages
- [✅] Replaced fetch with axios throughout the app
- [✅] Fixed setState in useEffect warning in confirmation page
- [✅] Added proper error handling with axios
- [✅] Improved type safety with BookingData interface
- [✅] Updated global CSS for better UI consistency
- [ ] Test complete booking flow end-to-end
- [ ] Test promo code validation (SAVE10, FLAT100)
- [ ] Test slot availability and sold-out states
- [ ] Test responsive design on multiple devices

### Phase 11: Polish & Optimization
- [ ] Ensure exact Figma design match (colors, spacing, fonts)
- [ ] Add smooth transitions and hover states
- [ ] Optimize images
- [ ] Add meta tags for SEO
- [ ] Test performance and optimize
- [ ] Add proper error boundaries

### Phase 12: Deployment
- [ ] Setup environment variables
- [ ] Deploy backend to Render/Railway
- [ ] Deploy frontend to Vercel
- [ ] Test production deployment
- [ ] Update README with setup instructions
- [ ] Create GitHub repository
- [ ] Submit project links

---

## 📝 CURRENT STATUS
**Phase:** 7 - Details Page Development
**Next Step:** Start dev server and build experience details page

---

## 🔄 RECENT CHANGES
- 2024-10-29: Next.js project initialized with TypeScript and TailwindCSS
- 2024-10-29: Assets added (logo, 8 images), dependencies installed (axios, react-hook-form, lucide-react)
- 2024-10-29: ✅ Created type definitions and API client
- 2024-10-29: ✅ Built Header, ExperienceCard, PriceSummary components
- 2024-10-29: ✅ Implemented Home page with experience grid
- 2024-10-29: ✅ Created Next.js API routes (no separate backend needed!)
  - /api/experiences - GET all experiences
  - /api/experiences/[id] - GET experience by ID
  - /api/bookings - POST create booking
  - /api/promo/validate - POST validate promo code
- 2024-10-29: All data in-memory storage (mockData.ts)

---

## 📌 NOTES
- Use royalty-free images from Unsplash/Pexels
- Promo codes to implement: SAVE10 (10% off), FLAT100 (₹100 off)
- Tax calculation: appears to be ~6% based on Figma (₹999 → ₹59 tax)
- All prices in Indian Rupees (₹)
- Time slots show availability indicators (e.g., "4 left", "Sold out")
- IST timezone (GMT +5:30)
- Design must be pixel-perfect match to Figma

---

## 🐛 KNOWN ISSUES
None yet.

---

## ⚡ QUICK COMMANDS
```bash
# Frontend (root directory)
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Run ESLint

# Backend (server directory)
npm run dev              # Start backend server
npm run seed             # Seed database
```
