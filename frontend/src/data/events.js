// Mock events + rich data

export const upcomingEvents = [
    {
        id: "evt-001",
        title: "Aurora Tech Summit 2027",
        category: "Tech Conference",
        date: "2027-03-14T18:00:00",
        dateLabel: "Mar 14, 2027",
        time: "6:00 PM",
        location: "Lisbon, Portugal",
        price: "$249",
        image: "https://images.unsplash.com/photo-1771911650360-31fdb3344c74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        featured: true,
        tag: "Featured",
        sold: 72,
        capacity: 1200,
        speakers: 48,
    },
    {
        id: "evt-002",
        title: "Neon Pulse Music Festival",
        category: "Live Music",
        date: "2026-08-22T20:00:00",
        dateLabel: "Aug 22, 2026",
        time: "8:00 PM",
        location: "Berlin, Germany",
        price: "$89",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "Hot",
        sold: 58,
        capacity: 8500,
        speakers: 24,
    },
    {
        id: "evt-003",
        title: "Frontier AI Conference",
        category: "AI / ML",
        date: "2026-09-09T09:00:00",
        dateLabel: "Sep 09, 2026",
        time: "9:00 AM",
        location: "San Francisco, USA",
        price: "$399",
        image: "https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "New",
        sold: 44,
        capacity: 2000,
        speakers: 36,
    },
    {
        id: "evt-004",
        title: "Designers' Crystal Night",
        category: "Design Gala",
        date: "2026-10-18T19:30:00",
        dateLabel: "Oct 18, 2026",
        time: "7:30 PM",
        location: "Tokyo, Japan",
        price: "$179",
        image: "https://images.unsplash.com/photo-1683368727353-a9a72b38d567?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85",
        tag: "VIP",
        sold: 30,
        capacity: 900,
        speakers: 14,
    },
];

export const pastEvents = [
    { id: "past-1", title: "Skyline Founders Mixer", location: "New York", date: "Nov 2025", image: "https://images.unsplash.com/photo-1771911650360-31fdb3344c74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "tall" },
    { id: "past-2", title: "Sonic Wave Festival", location: "Amsterdam", date: "Oct 2025", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "short" },
    { id: "past-3", title: "Quantum Devs Summit", location: "London", date: "Sep 2025", image: "https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "tall" },
    { id: "past-4", title: "Crowd Energy Concert", location: "Madrid", date: "Aug 2025", image: "https://images.unsplash.com/photo-1683368727353-a9a72b38d567?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "medium" },
    { id: "past-5", title: "Design Crystal Gala", location: "Paris", date: "Jul 2025", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBkYXl0aW1lfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "medium" },
    { id: "past-6", title: "Future Stage Mixer", location: "Singapore", date: "Jun 2025", image: "https://images.unsplash.com/photo-1771911650360-31fdb3344c74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDB8fHx8MTc3ODc0MzA5NXww&ixlib=rb-4.1.0&q=85", height: "tall" },
];

export const brandsRow = ["AURORA","NEBULA","VANTA","ORBIT","PRISM","LUMEN","HALO","ZENITH","PULSE","STELLAR"];

export const stats = [
    { label: "Events Hosted", value: "12k+" },
    { label: "Active Attendees", value: "2.4M" },
    { label: "Avg. Rating", value: "4.96" },
    { label: "Countries", value: "84" },
];

export const heroChips = [
    "Tech Summits",
    "Music Festivals",
    "Design Galas",
    "Founder Mixers",
    "AI Conferences",
    "Crypto Meetups",
    "Wellness Retreats",
];

export const categories = [
    { id: "tech", name: "Tech & AI", icon: "Cpu", count: 1240, hue: "from-[#5B8CFF] to-[#7B61FF]" },
    { id: "music", name: "Music & Concerts", icon: "MusicNotes", count: 3208, hue: "from-[#7B61FF] to-[#00C2FF]" },
    { id: "design", name: "Design & Art", icon: "PaintBrush", count: 814, hue: "from-[#00C2FF] to-[#5B8CFF]" },
    { id: "business", name: "Business & Startups", icon: "Briefcase", count: 1907, hue: "from-[#5B8CFF] to-[#00C2FF]" },
    { id: "wellness", name: "Wellness & Sports", icon: "Heart", count: 692, hue: "from-[#7B61FF] to-[#5B8CFF]" },
    { id: "food", name: "Food & Lifestyle", icon: "ForkKnife", count: 1156, hue: "from-[#00C2FF] to-[#7B61FF]" },
];

export const liveFeed = [
    { who: "Sarah K.", action: "booked", what: "Aurora Tech Summit", where: "Lisbon", ago: "2m" },
    { who: "Marcus T.", action: "joined", what: "Neon Pulse Festival", where: "Berlin", ago: "5m" },
    { who: "Priya V.", action: "registered for", what: "Frontier AI Conf", where: "SF", ago: "7m" },
    { who: "Liam B.", action: "saved", what: "Designers' Crystal Night", where: "Tokyo", ago: "9m" },
    { who: "Emma R.", action: "booked", what: "Quantum Devs Summit", where: "London", ago: "12m" },
    { who: "Yuki S.", action: "joined", what: "Founder Skyline Mixer", where: "NYC", ago: "15m" },
    { who: "Diego M.", action: "registered for", what: "Sonic Wave", where: "Amsterdam", ago: "18m" },
    { who: "Aisha K.", action: "booked", what: "Crystal Gala", where: "Paris", ago: "22m" },
];

export const cities = [
    { name: "New York", country: "USA", events: 184, x: 25, y: 38, hot: true },
    { name: "London", country: "UK", events: 156, x: 46, y: 32, hot: true },
    { name: "Tokyo", country: "Japan", events: 142, x: 82, y: 42 },
    { name: "Berlin", country: "Germany", events: 128, x: 49, y: 33 },
    { name: "Lisbon", country: "Portugal", events: 76, x: 44, y: 41, hot: true },
    { name: "San Francisco", country: "USA", events: 198, x: 14, y: 41, hot: true },
    { name: "Singapore", country: "SG", events: 84, x: 75, y: 60 },
    { name: "Dubai", country: "UAE", events: 92, x: 60, y: 50 },
    { name: "Sydney", country: "Australia", events: 64, x: 88, y: 78 },
    { name: "São Paulo", country: "Brazil", events: 72, x: 32, y: 72 },
    { name: "Mumbai", country: "India", events: 88, x: 66, y: 55 },
    { name: "Amsterdam", country: "NL", events: 110, x: 47, y: 30 },
];

export const testimonials = [
    {
        quote: "Lumen turned our launch into a sold-out event in 72 hours. The animations, the flow, the analytics — every detail feels considered.",
        name: "Elena Vasquez",
        role: "Head of Brand · Nebula Labs",
        avatar: "EV",
    },
    {
        quote: "We've used five platforms in the last decade. Lumen is the first one our attendees compliment by name.",
        name: "Marcus Chen",
        role: "Founder · Orbit Conferences",
        avatar: "MC",
    },
    {
        quote: "Razorpay + analytics + cinematic landing pages out of the box. Our team ships 4x faster now.",
        name: "Priya Sharma",
        role: "VP Events · Stellar Inc.",
        avatar: "PS",
    },
];

export const pricingTiers = [
    {
        name: "Starter",
        price: "Free",
        sub: "for organizers exploring",
        features: ["1 active event", "Up to 100 tickets", "Basic analytics", "Email support"],
        cta: "Start free",
        highlight: false,
    },
    {
        name: "Studio",
        price: "$49",
        sub: "/event · pro creators",
        features: ["Unlimited events", "Unlimited tickets", "Razorpay + Stripe", "Custom branding", "Priority support", "Realtime analytics"],
        cta: "Choose Studio",
        highlight: true,
        badge: "Most popular",
    },
    {
        name: "Atelier",
        price: "Custom",
        sub: "for enterprises & venues",
        features: ["Everything in Studio", "White-label", "API + webhooks", "Dedicated CSM", "SLA 99.99%", "On-prem options"],
        cta: "Talk to sales",
        highlight: false,
    },
];

export const faqs = [
    {
        q: "How quickly can I publish an event?",
        a: "Under 90 seconds. Drag-drop your banner, set a date and price, and Lumen auto-generates a premium event page with ticketing, analytics, and a shareable link.",
    },
    {
        q: "Which payment gateways are supported?",
        a: "Razorpay, Stripe, PayPal, Apple Pay and UPI out of the box. Settlement happens daily and you can preview revenue in the admin dashboard in real time.",
    },
    {
        q: "Can I customize the event page design?",
        a: "Yes — choose from 12 cinematic templates, then tune colors, fonts, motion, and 3D scene density. Everything is preserve-aspect-ratio and mobile-ready.",
    },
    {
        q: "Do attendees need to create an account to buy?",
        a: "No. Guests can checkout with just an email. Returning users get a one-tap re-purchase and a permanent ticket wallet.",
    },
    {
        q: "What about offline scanning at the venue?",
        a: "Every QR ticket supports offline validation. Cache the event door-list on your phone once and scan thousands without network.",
    },
    {
        q: "Is there a free trial?",
        a: "The Starter plan is free forever — perfect for your first community event. Upgrade only when you need unlimited tickets or pro analytics.",
    },
];
