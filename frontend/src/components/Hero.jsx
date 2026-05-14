import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowUpRight,
    Lightning,
    PlayCircle,
    Calendar,
    MapPin,
} from "@phosphor-icons/react";
import BackgroundAura from "./BackgroundAura";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    return (
        <section
            ref={ref}
            data-testid="hero-section"
            className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden min-h-[92vh] flex items-center"
        >
            {/* Prismatic animated background */}
            <BackgroundAura />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full"
            >
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-xs font-semibold text-[#0B1221]"
                    >
                        <Lightning
                            weight="fill"
                            className="size-3.5 text-[#7B61FF]"
                        />
                        <span className="uppercase tracking-[0.2em] text-[10px]">
                            New · Aurora Tech Summit 2027 open
                        </span>
                        <span className="size-1 rounded-full bg-[#0B1221]/30" />
                        <a
                            href="#upcoming"
                            className="text-[#5B8CFF] hover:text-[#0B1221] transition"
                        >
                            Register →
                        </a>
                    </motion.div>

                    <h1
                        data-testid="hero-heading"
                        className="font-display font-black tracking-tighter text-[#0B1221] mt-6 text-5xl sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] leading-[0.95]"
                    >
                        <SplitReveal text="Experience Events" />
                        <span className="block text-gradient">
                            Like Never Before
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-6 text-base sm:text-lg lg:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed"
                        data-testid="hero-subheading"
                    >
                        Discover immersive premium events with futuristic
                        digital interaction. Curated experiences, live
                        atmospheres, instant booking.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.65 }}
                        className="mt-9 flex flex-wrap items-center justify-center gap-3"
                    >
                        <a
                            href="#upcoming"
                            data-testid="hero-explore-button"
                            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0B1221] text-white font-semibold text-sm hover:scale-[1.04] active:scale-95 transition-transform shadow-[0_18px_40px_-12px_rgba(11,18,33,0.4)]"
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
                            <PlayCircle
                                weight="duotone"
                                className="size-5 text-[#5B8CFF]"
                            />
                            Create Event
                        </a>
                    </motion.div>

                    {/* Floating mini stats row (glass cards arranged in a curved row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.85 }}
                        className="mt-14 grid grid-cols-3 max-w-2xl mx-auto gap-3 sm:gap-4"
                        data-testid="hero-stats"
                    >
                        <StatPill k="12k+" v="Events" />
                        <StatPill k="2.4M" v="Attendees" highlight />
                        <StatPill k="4.96" v="Rating" />
                    </motion.div>
                </div>

                {/* Floating "Next Up" glass card — top-right corner, away from content */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="hidden"
                    data-testid="hero-floating-card"
                >
                    <div className="glass-strong rounded-2xl p-4 shadow-[0_20px_60px_-12px_rgba(91,140,255,0.35)]">
                        <div className="flex items-center gap-3">
                            <div className="size-11 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md">
                                <Calendar
                                    weight="duotone"
                                    className="text-white size-5"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                                    Next Up
                                </div>
                                <div className="font-display font-bold text-sm text-[#0B1221] truncate">
                                    Aurora Tech Summit
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-[#475569] mt-0.5">
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
                                    delay: 1.4,
                                    ease: "easeOut",
                                }}
                                className="h-full bg-brand-gradient"
                            />
                        </div>
                        <div className="mt-1.5 text-[10px] text-[#475569]">
                            72% sold · 348 seats left
                        </div>
                    </div>
                </motion.div>

                {/* Floating "Live now" pill — hidden to keep hero clean */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 1.1 }}
                    className="hidden items-center gap-2 px-3 py-2 rounded-full glass-strong"
                >
                    <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                    <span className="text-xs font-semibold text-[#0B1221]">
                        2,184 attending now
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}

function StatPill({ k, v, highlight = false }) {
    return (
        <div
            className={`relative rounded-2xl px-4 py-3 backdrop-blur-xl border ${
                highlight
                    ? "bg-[#0B1221]/95 text-white border-[#0B1221]"
                    : "bg-white/70 border-white/60 text-[#0B1221]"
            } transition-transform hover:-translate-y-0.5`}
        >
            <div
                className={`font-display font-black text-2xl sm:text-3xl tracking-tighter ${highlight ? "text-white" : ""}`}
            >
                {k}
            </div>
            <div
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-0.5 ${
                    highlight ? "text-white/70" : "text-[#475569]"
                }`}
            >
                {v}
            </div>
        </div>
    );
}

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
