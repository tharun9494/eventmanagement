import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    Lightning,
    PlayCircle,
    CaretDown,
} from "@phosphor-icons/react";
import BackgroundAura from "./BackgroundAura";
import { heroChips } from "../data/events";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    // Rotating category chip
    const [chipIdx, setChipIdx] = useState(0);
    useEffect(() => {
        const id = setInterval(
            () => setChipIdx((i) => (i + 1) % heroChips.length),
            2200,
        );
        return () => clearInterval(id);
    }, []);

    return (
        <section
            ref={ref}
            data-testid="hero-section"
            className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden min-h-[94vh] flex items-center"
        >
            <BackgroundAura />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full"
            >
                <motion.div
                    style={{ scale: headingScale }}
                    className="mx-auto max-w-5xl text-center"
                >
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
                        aria-label="Experience Events Like Never Before"
                        className="font-display font-black tracking-tighter text-[#0B1221] mt-6 text-5xl sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] leading-[0.95]"
                    >
                        <SplitReveal text="Experience Events" />
                        <span className="block text-gradient">
                            Like Never Before
                        </span>
                    </h1>

                    {/* Rotating category chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-7 inline-flex items-center gap-2 text-sm sm:text-base text-[#475569]"
                    >
                        <span>From</span>
                        <span className="relative inline-flex h-7 sm:h-8 overflow-hidden align-middle">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={chipIdx}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "-100%", opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="font-display font-bold text-[#0B1221] tracking-tight whitespace-nowrap inline-flex items-center px-3 rounded-lg bg-white/80 backdrop-blur"
                                    data-testid="hero-rotating-chip"
                                >
                                    {heroChips[chipIdx]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span>to private galas — all in one place.</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="mt-5 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed"
                        data-testid="hero-subheading"
                    >
                        Discover immersive premium events with futuristic
                        digital interaction. Curated experiences, live
                        atmospheres, instant booking.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
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

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="mt-14 grid grid-cols-3 max-w-2xl mx-auto gap-3 sm:gap-4"
                        data-testid="hero-stats"
                    >
                        <StatPill k="12k+" v="Events" />
                        <StatPill k="2.4M" v="Attendees" highlight />
                        <StatPill k="4.96" v="Rating" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#475569] hover:text-[#0B1221] transition"
                data-testid="hero-scroll"
            >
                <span className="uppercase tracking-[0.25em] text-[10px] font-semibold">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <CaretDown weight="bold" className="size-4" />
                </motion.div>
            </motion.a>
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
        <span className="inline-flex flex-wrap justify-center gap-x-[0.18em]">
            {words.map((w, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom"
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
