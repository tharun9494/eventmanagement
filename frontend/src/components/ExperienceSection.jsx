import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle, Rocket, ChartLineUp } from "@phosphor-icons/react";
import { stats } from "../data/events";

const ThreeScene = lazy(() => import("./ThreeScene"));

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            data-testid="experience-section"
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Soft background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#F7F9FF] to-white" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5B8CFF]/30 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold"
                        >
                            <Sparkle
                                weight="fill"
                                className="size-3.5 text-[#7B61FF]"
                            />
                            <span className="uppercase tracking-[0.2em] text-[10px]">
                                Immersive 3D Experience
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-4 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl"
                        >
                            Step inside the
                            <span className="text-gradient"> future of events</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 text-[#475569] text-base sm:text-lg leading-relaxed"
                    >
                        Cinematic depth, real-time lighting, and tactile motion —
                        engineered to make every interaction feel premium and
                        alive.
                    </motion.p>
                </div>

                {/* Main 3D Bento */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Large 3D canvas */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] rounded-3xl glass-strong overflow-hidden"
                    >
                        <Suspense
                            fallback={
                                <div className="size-full bg-gradient-to-br from-[#EEF4FF] via-white to-[#F7F9FF] animate-pulse" />
                            }
                        >
                            <ThreeScene />
                        </Suspense>

                        {/* Overlay UI */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xl text-xs font-semibold text-[#0B1221]">
                                    <span className="size-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
                                    Live Render · 60 FPS
                                </div>
                                <div className="text-xs font-mono text-[#475569] hidden sm:block">
                                    LUMEN · v2.4
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                                    Floating geometry
                                </div>
                                <div className="font-display font-bold text-2xl sm:text-3xl text-[#0B1221] tracking-tight">
                                    Move your cursor.
                                </div>
                            </div>
                        </div>

                        {/* corner highlights */}
                        <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/40" />
                    </motion.div>

                    {/* Stats column */}
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
                        {stats.map((s, i) => (
                            <StatCard key={s.label} {...s} delay={0.1 * i} />
                        ))}
                    </div>
                </div>

                {/* Feature row */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Rocket weight="duotone" className="size-6" />}
                        title="GPU-accelerated motion"
                        desc="Every interaction runs at 60+ FPS with transform-only animations and smart lazy loading."
                        delay={0}
                    />
                    <FeatureCard
                        icon={<ChartLineUp weight="duotone" className="size-6" />}
                        title="Real-time analytics"
                        desc="Track ticket velocity, geo distribution, and engagement — beautifully visualized."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Sparkle weight="duotone" className="size-6" />}
                        title="Cinematic interactions"
                        desc="Glassmorphism, ambient light, tilt cards and reactive cursor — premium without the weight."
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}

function StatCard({ label, value, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay }}
            data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="relative gradient-border p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-500"
        >
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                {label}
            </div>
            <div className="mt-2 font-display font-black text-4xl sm:text-5xl tracking-tighter text-[#0B1221]">
                <CountUp value={value} />
            </div>
            <div className="mt-3 h-px bg-gradient-to-r from-[#5B8CFF]/40 to-transparent" />
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay }}
            className="group relative p-6 rounded-2xl bg-white border border-[#EEF4FF] hover:border-[#5B8CFF]/40 hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_24px_60px_-20px_rgba(91,140,255,0.35)]"
        >
            <div className="size-12 rounded-xl bg-[#F7F9FF] flex items-center justify-center text-[#5B8CFF] group-hover:bg-brand-gradient group-hover:text-white transition-colors duration-500">
                {icon}
            </div>
            <h3 className="mt-4 font-display font-bold text-lg text-[#0B1221]">
                {title}
            </h3>
            <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
}

// Lightweight count-up
function CountUp({ value }) {
    const [display, setDisplay] = useState(value);
    useEffect(() => {
        // For string values like "12k+", just animate the numeric portion
        const match = String(value).match(/^([\d.]+)([\D]*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }
        const end = parseFloat(match[1]);
        const suffix = match[2] || "";
        let start = 0;
        const dur = 1200;
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = start + (end - start) * eased;
            setDisplay(
                (Number.isInteger(end) ? Math.round(v) : v.toFixed(2)) + suffix,
            );
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value]);
    return <span>{display}</span>;
}
