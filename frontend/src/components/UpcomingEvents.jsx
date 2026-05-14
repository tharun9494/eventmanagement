import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    CalendarBlank,
    MapPin,
    Ticket,
    ArrowRight,
} from "@phosphor-icons/react";
import { upcomingEvents } from "../data/events";

export default function UpcomingEvents() {
    return (
        <section
            id="upcoming"
            data-testid="upcoming-events"
            className="relative py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5 }}
                            className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]"
                        >
                            Upcoming · Curated
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl mt-3"
                        >
                            Experiences worth
                            <br className="hidden sm:block" />
                            <span className="text-gradient">showing up for.</span>
                        </motion.h2>
                    </div>
                    <motion.a
                        href="#all"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group inline-flex items-center gap-2 self-start sm:self-end px-5 py-3 rounded-2xl bg-white border border-[#EEF4FF] hover:border-[#5B8CFF]/40 transition-all font-semibold text-sm text-[#0B1221]"
                        data-testid="upcoming-view-all"
                    >
                        View all events
                        <ArrowRight
                            weight="bold"
                            className="size-4 group-hover:translate-x-1 transition-transform"
                        />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {upcomingEvents.map((event, i) => (
                        <EventCard key={event.id} event={event} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function EventCard({ event, delay = 0 }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-30, 30], [8, -8]), {
        stiffness: 200,
        damping: 18,
    });
    const ry = useSpring(useTransform(x, [-30, 30], [-8, 8]), {
        stiffness: 200,
        damping: 18,
    });

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const countdown = useCountdown(event.date);

    return (
        <motion.div
            ref={ref}
            data-testid={`event-card-${event.id}`}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <div
                className={`relative rounded-3xl overflow-hidden bg-white border border-[#EEF4FF] hover:border-transparent transition-all duration-500 will-change-transform hover:-translate-y-1 ${
                    event.featured ? "shadow-[0_20px_60px_-20px_rgba(91,140,255,0.4)]" : "shadow-sm"
                }`}
            >
                {/* Animated gradient border for featured */}
                {event.featured && (
                    <div className="absolute inset-0 rounded-3xl pointer-events-none">
                        <div
                            className="absolute inset-0 rounded-3xl p-px"
                            style={{
                                background:
                                    "linear-gradient(135deg, #5B8CFF, #7B61FF, #00C2FF)",
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                            }}
                        />
                    </div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    {event.tag && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold tracking-wide text-[#0B1221] uppercase">
                            {event.tag}
                        </div>
                    )}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B1221]/80 backdrop-blur text-white text-[11px] font-semibold">
                        {event.price}
                    </div>
                    {/* Countdown overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-90">
                            {event.category}
                        </div>
                        <div
                            className="text-[11px] font-mono tabular-nums px-2 py-1 rounded-md bg-white/15 backdrop-blur"
                            data-testid={`countdown-${event.id}`}
                        >
                            {countdown}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-[#0B1221] tracking-tight line-clamp-1">
                        {event.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-4 text-xs text-[#475569]">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarBlank weight="duotone" className="size-4" />
                            {event.dateLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin weight="duotone" className="size-4" />
                            {event.location}
                        </span>
                    </div>

                    <button
                        data-testid={`register-${event.id}`}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1221] text-white text-sm font-semibold hover:bg-black hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Ticket weight="duotone" className="size-4" />
                        Register
                    </button>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -inset-2 rounded-3xl bg-brand-gradient blur-2xl opacity-25 -z-10" />
                </div>
            </div>
        </motion.div>
    );
}

function useCountdown(targetIso) {
    const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
