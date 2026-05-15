import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    Sparkle,
    Rocket,
    ChartLineUp,
    QrCode,
    Globe,
    Lightning,
} from "@phosphor-icons/react";
import { stats } from "../data/events";

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            data-testid="experience-section"
            className="relative py-24 sm:py-32 overflow-visible"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
                {/* Header */}
                <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold"
                        >
                            <Sparkle
                                weight="fill"
                                className="size-3.5 text-[#7B61FF]"
                            />
                            <span className="uppercase tracking-[0.2em] text-[10px]">
                                The Eventra Experience
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-4 font-display font-bold tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl"
                        >
                            Built for the
                            <span className="text-gradient"> next era </span>
                            of events.
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-5 text-[#475569] text-base sm:text-lg leading-relaxed"
                    >
                        Cinematic design, real-time engagement, and effortless operations — engineered to feel premium on every device.
                    </motion.p>
                </div>

                {/* Stats row — prominent */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map((s, i) => (
                        <StatCard key={s.label} {...s} delay={i * 0.06} />
                    ))}
                </div>

                {/* Feature bento grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    <FeatureCard
                        icon={<Rocket weight="duotone" className="size-6" />}
                        title="GPU-accelerated motion"
                        desc="Every interaction runs at 60+ FPS with transform-only animations, lazy loading, and code splitting."
                        gradient="from-[#5B8CFF] to-[#7B61FF]"
                        delay={0}
                    />
                    <FeatureCard
                        icon={
                            <ChartLineUp
                                weight="duotone"
                                className="size-6"
                            />
                        }
                        title="Real-time analytics"
                        desc="Track ticket velocity, geo distribution, and engagement — beautifully visualized for organizers."
                        gradient="from-[#7B61FF] to-[#00C2FF]"
                        delay={0.08}
                    />
                    <FeatureCard
                        icon={<QrCode weight="duotone" className="size-6" />}
                        title="Smart QR tickets"
                        desc="Frictionless check-in. Each ticket carries an animated QR with anti-fraud rotation and offline scanning."
                        gradient="from-[#00C2FF] to-[#5B8CFF]"
                        delay={0.16}
                    />
                    <FeatureCard
                        icon={<Globe weight="duotone" className="size-6" />}
                        title="Global ready"
                        desc="Multi-currency, multi-language, multi-timezone. Razorpay, Stripe, and Apple Pay supported."
                        gradient="from-[#5B8CFF] to-[#00C2FF]"
                        delay={0.24}
                    />
                    <FeatureCard
                        icon={<Lightning weight="duotone" className="size-6" />}
                        title="Lightning checkout"
                        desc="Sub-second booking flow. One-tap re-purchase for returning attendees. No friction, no lost carts."
                        gradient="from-[#7B61FF] to-[#5B8CFF]"
                        delay={0.32}
                    />
                    <FeatureCard
                        icon={<Sparkle weight="duotone" className="size-6" />}
                        title="Cinematic by default"
                        desc="Glassmorphism, ambient light, tilt cards and reactive cursor — premium without the weight."
                        gradient="from-[#00C2FF] to-[#7B61FF]"
                        delay={0.4}
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
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative p-5 sm:p-8 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_15px_40px_-15px_rgba(91,140,255,0.15)] flex flex-col justify-center"
        >
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                {label}
            </div>
            <div className="mt-2 font-display font-bold text-[1.65rem] leading-none sm:text-4xl lg:text-5xl tracking-tighter text-[#0B1221] whitespace-nowrap">
                <CountUp value={value} />
            </div>
            <div className="mt-3 h-px bg-gradient-to-r from-[#5B8CFF]/40 to-transparent" />
        </motion.div>
    );
}

function FeatureCard({ icon, title, desc, gradient, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative p-5 sm:p-8 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_15px_40px_-15px_rgba(91,140,255,0.15)] overflow-hidden"
        >
            <div
                className={`size-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-[0_8px_24px_-8px_rgba(91,140,255,0.6)]`}
            >
                {icon}
            </div>
            <h3 className="mt-4 font-display font-bold text-lg text-[#0B1221] tracking-tight">
                {title}
            </h3>
            <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">
                {desc}
            </p>
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div
                    className={`absolute inset-0 rounded-2xl p-px bg-gradient-to-br ${gradient}`}
                    style={{
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />
            </div>
        </motion.div>
    );
}

function CountUp({ value }) {
    const [display, setDisplay] = useState(value);
    const startedRef = useRef(false);
    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        const match = String(value).match(/^([\d.]+)([\D]*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }
        const end = parseFloat(match[1]);
        const suffix = match[2] || "";
        const dur = 1100;
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = end * eased;
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
