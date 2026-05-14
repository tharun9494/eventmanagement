import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowUpRight,
    Lightning,
    Calendar,
    MapPin,
} from "@phosphor-icons/react";

const ThreeScene = lazy(() => import("./ThreeScene"));

export default function Hero() {
    const ref = useRef(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Mouse spotlight effect — pure CSS transforms, no re-renders
    const handleMouseMove = (e) => {
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const yy = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${yy}%`);
    };

    return (
        <section
            ref={ref}
            data-testid="hero-section"
            className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
        >
            {/* Spotlight + Aurora */}
            <div
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(800px circle at var(--mx, 50%) var(--my, 30%), rgba(123,97,255,0.18), rgba(91,140,255,0.10) 30%, transparent 60%)",
                    transition: "background 0.15s linear",
                }}
            >
                <div className="aurora" />
                <div className="absolute inset-0 bg-grid opacity-60" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="mx-auto max-w-7xl px-4 sm:px-6"
            >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Text */}
                    <div className="lg:col-span-7 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold tracking-wide text-[#0B1221]"
                        >
                            <Lightning
                                weight="fill"
                                className="size-3.5 text-[#7B61FF]"
                            />
                            <span className="uppercase tracking-[0.2em] text-[10px]">
                                Live in 84 cities
                            </span>
                        </motion.div>

                        <h1
                            data-testid="hero-heading"
                            className="font-display font-black tracking-tighter text-[#0B1221] mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] leading-[0.95]"
                        >
                            <SplitReveal text="Experience Events" />
                            <span className="block text-gradient">
                                Like Never Before
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-6 text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed"
                            data-testid="hero-subheading"
                        >
                            Discover immersive premium events with futuristic
                            digital interaction. Curated experiences, live
                            atmospheres, and instant booking — beautifully
                            simple.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.65 }}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <a
                                href="#upcoming"
                                data-testid="hero-explore-button"
                                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0B1221] text-white font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-transform shadow-[0_18px_40px_-12px_rgba(11,18,33,0.4)]"
                            >
                                Explore Events
                                <ArrowUpRight
                                    weight="bold"
                                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                                <span className="absolute inset-0 -z-10 rounded-2xl bg-brand-gradient blur-xl opacity-0 group-hover:opacity-50 transition" />
                            </a>
                            <a
                                href="#create"
                                data-testid="hero-create-button"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-strong text-[#0B1221] font-semibold text-sm hover:bg-white transition-all"
                            >
                                Create Event
                                <span className="size-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_10px_#00C2FF]" />
                            </a>
                        </motion.div>

                        {/* Quick stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.85 }}
                            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
                            data-testid="hero-stats"
                        >
                            {[
                                { k: "12k+", v: "Events" },
                                { k: "2.4M", v: "Attendees" },
                                { k: "4.96", v: "Rating" },
                            ].map((s) => (
                                <div key={s.v}>
                                    <div className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#0B1221]">
                                        {s.k}
                                    </div>
                                    <div className="text-xs text-[#475569] mt-0.5">
                                        {s.v}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* 3D / Floating ticket */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative aspect-[4/5] w-full max-w-[520px] mx-auto"
                        >
                            <div className="absolute inset-0 rounded-[2rem] overflow-hidden glass-strong">
                                <Suspense
                                    fallback={
                                        <div className="size-full bg-gradient-to-br from-[#EEF4FF] to-white animate-pulse" />
                                    }
                                >
                                    <ThreeScene compact />
                                </Suspense>
                            </div>

                            {/* Floating event card */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.7 }}
                                className="absolute -bottom-6 -left-6 sm:-left-10 w-[78%] glass-strong rounded-2xl p-4 shadow-[0_20px_60px_-12px_rgba(91,140,255,0.35)]"
                                data-testid="hero-floating-card"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md">
                                        <Calendar
                                            weight="duotone"
                                            className="text-white size-6"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                                            Next Up
                                        </div>
                                        <div className="font-display font-bold text-sm sm:text-base text-[#0B1221] truncate">
                                            Aurora Tech Summit
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[#475569] mt-0.5">
                                            <MapPin
                                                weight="duotone"
                                                className="size-3.5"
                                            />
                                            Lisbon · Mar 14
                                        </div>
                                    </div>
                                    <div className="size-2 rounded-full bg-[#00C2FF] shadow-[0_0_12px_#00C2FF] animate-pulse" />
                                </div>
                                <div className="mt-3 h-1 rounded-full bg-[#EEF4FF] overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "72%" }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 1,
                                            ease: "easeOut",
                                        }}
                                        className="h-full bg-brand-gradient"
                                    />
                                </div>
                                <div className="mt-1.5 text-[11px] text-[#475569]">
                                    72% sold · 348 seats left
                                </div>
                            </motion.div>

                            {/* Glow halo */}
                            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-25 blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// Staggered word reveal
function SplitReveal({ text }) {
    const words = text.split(" ");
    return (
        <span className="block">
            {words.map((w, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom pr-[0.18em]"
                >
                    <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            duration: 0.7,
                            delay: 0.15 + i * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
