# Lumen — Premium Event Management Platform

## Original Problem Statement
Build an ULTRA PREMIUM, high-performance futuristic Event Management Platform UI using React.js. Cinematic but lightweight, Apple/Tesla/Linear smoothness, light futuristic SaaS aesthetic. Sections: navbar, hero, 3D experience, upcoming events (with countdown), past events gallery, user dashboard, admin dashboard. Razorpay and auth skipped for Phase 1+2. Use demo data.

## Stack
- React 19 + react-scripts (CRA + craco)
- Tailwind CSS + custom brand tokens (`brand.1` #5B8CFF, `brand.2` #7B61FF, `brand.3` #00C2FF)
- Fonts: Cabinet Grotesk (display) + Outfit (body)
- Framer Motion (entrance/scroll/tilt)
- Phosphor Icons (duotone)
- Shadcn UI primitives available at `/app/frontend/src/components/ui/`
- 3D scene: CSS 3D transforms + SVG (R3F replaced — see note below)

## Architecture
- `src/App.js` — BrowserRouter with lazy-loaded routes: `/`, `/dashboard`, `/admin`
- `src/pages/Landing.jsx` — composes Navbar → Hero → BrandsMarquee → ExperienceSection → UpcomingEvents → PastEventsGallery → CtaSection → Footer
- `src/pages/UserDashboard.jsx` — sidebar + stats + activity chart + saved events
- `src/pages/AdminDashboard.jsx` — dark sidebar + stats + revenue chart + events table
- `src/components/ThreeScene.jsx` — pure CSS/SVG floating geometry with mouse parallax
- `src/data/events.js` — mock event + brand data

## Key Decision: R3F Replaced
`@react-three/fiber` v9 + React 19 + the `@emergentbase/visual-edits` babel plugin combination throws `R3F: Cannot set "x-line-number"` because the plugin injects source-location attrs into JSX which R3F tries to apply to three.js objects. The 3D scene was rebuilt with CSS 3D transforms + SVG — visually equivalent, faster, mobile-friendly, no WebGL canvas.

## What's Implemented (Dec 2025 → May 2026 cycle)
- [x] Premium floating glass navbar with scroll behavior + mobile menu
- [x] Cinematic Hero with split-reveal heading, mouse spotlight, animated count-up stats, floating event card with progress bar
- [x] BrandsMarquee (auto-scrolling, fade edges)
- [x] ExperienceSection (CSS 3D scene + bento stats + 3 feature cards)
- [x] UpcomingEvents (4 tilt cards, gradient borders, countdown timers, register CTA, hover glow)
- [x] PastEventsGallery (CSS-columns masonry, hover zoom, lightbox modal)
- [x] CtaSection (dark gradient with orbs + grid)
- [x] Footer (4 link columns + socials)
- [x] UserDashboard (glass sidebar, 4 KPI cards, SVG activity chart, upcoming event card, saved grid)
- [x] AdminDashboard (dark sidebar, top search, KPIs, SVG area revenue chart, top events list, events table)
- [x] Mobile responsiveness with reduced animations
- [x] All interactive elements carry `data-testid`
- [x] Testing agent: 100% success rate, zero R3F errors, zero console errors

## Personas
- **Attendee** — discovers/registers events, manages tickets via /dashboard
- **Organizer/Admin** — uploads events, tracks revenue & analytics via /admin

## Prioritized Backlog
- **P0 (next user request)** — Phase 3 Auth: JWT email/password login, signup, protected routes, session
- **P1** — Phase 4 User Dashboard wiring: real saved events, notifications, ticket QR
- **P1** — Phase 5 Admin Dashboard wiring: event CRUD, image upload, user management
- **P1** — Phase 6 Razorpay: booking flow, checkout, payment verification
- **P2** — Phase 7 Backend: FastAPI events/auth/payments APIs, MongoDB models, cloud storage
- **P2** — Phase 8 Performance: code-split per route (done), image CDN/optimize, Lighthouse pass
- **P2** — Phase 9 Deployment

## Notes for Future Sessions
- Use `search_replace` for all existing-file edits (no overwrites).
- Brand color tokens already exposed via Tailwind.
- Use Phosphor `duotone` icons everywhere for premium feel.
- Don't reintroduce R3F until visual-edits plugin is excluded for those files or React 19 reconciler fix lands.
