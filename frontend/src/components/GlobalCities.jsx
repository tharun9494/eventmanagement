import { motion } from "framer-motion";
import { Globe } from "@phosphor-icons/react";
import { cities } from "../data/events";

export default function GlobalCities() {
    return (
        <section
            data-testid="global-cities"
            className="relative py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                        Worldwide
                    </div>
                    <h2 className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl">
                        Lighting up
                        <span className="text-gradient"> 84 cities.</span>
                    </h2>
                    <p className="mt-4 text-[#475569] text-base sm:text-lg leading-relaxed">
                        From rooftop mixers in Lisbon to immersive concerts in
                        Tokyo — Lumen powers premium nights, everywhere.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                    {/* World map */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-8 relative rounded-3xl bg-gradient-to-br from-[#0B1221] via-[#101733] to-[#1a1f3a] text-white p-6 sm:p-8 overflow-hidden min-h-[400px]"
                    >
                        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-[#7B61FF]/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-[#00C2FF]/25 blur-3xl" />
                        {/* Latitude lines */}
                        <div
                            className="absolute inset-0 opacity-25"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(91,140,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.15) 1px, transparent 1px)",
                                backgroundSize: "8% 12%",
                            }}
                        />

                        <div className="relative flex items-center justify-between mb-2">
                            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                                <Globe weight="duotone" className="size-4" />
                                World Map · Live
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">
                                {cities.length} hot spots
                            </div>
                        </div>

                        <div className="relative w-full aspect-[16/8] mt-3">
                            {/* SVG dotted world silhouette */}
                            <svg
                                viewBox="0 0 100 50"
                                className="absolute inset-0 w-full h-full opacity-40"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <pattern
                                        id="cityDots"
                                        x="0"
                                        y="0"
                                        width="2.2"
                                        height="2.2"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle
                                            cx="1.1"
                                            cy="1.1"
                                            r="0.3"
                                            fill="#5B8CFF"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width="100"
                                    height="50"
                                    fill="url(#cityDots)"
                                    style={{
                                        WebkitMaskImage:
                                            "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
                                        maskImage:
                                            "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
                                    }}
                                />
                            </svg>

                            {/* City markers */}
                            {cities.map((c, i) => (
                                <motion.div
                                    key={c.name}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                    }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                                    data-testid={`city-${c.name.replace(/\s/g, "-").toLowerCase()}`}
                                >
                                    <div className="relative group">
                                        {c.hot && (
                                            <span className="absolute inset-0 size-3 rounded-full bg-[#00C2FF] animate-ping opacity-60" />
                                        )}
                                        <span
                                            className={`relative block size-3 rounded-full ${
                                                c.hot
                                                    ? "bg-[#00C2FF] shadow-[0_0_14px_#00C2FF]"
                                                    : "bg-[#5B8CFF] shadow-[0_0_8px_#5B8CFF]"
                                            }`}
                                        />
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                            <div className="px-2.5 py-1.5 rounded-lg bg-white text-[#0B1221] text-[11px] font-semibold shadow-lg">
                                                {c.name} · {c.events}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top cities list */}
                    <div className="lg:col-span-4 space-y-3">
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF] mb-2">
                            Top performing cities
                        </div>
                        {cities
                            .slice(0, 6)
                            .sort((a, b) => b.events - a.events)
                            .map((c, i) => (
                                <motion.div
                                    key={c.name}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.06,
                                    }}
                                    className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EEF4FF] hover:border-[#5B8CFF]/40 hover:-translate-y-0.5 transition-all"
                                >
                                    <div className="font-display font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#5B8CFF] to-[#00C2FF] w-8">
                                        #{i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-[#0B1221]">
                                            {c.name}
                                        </div>
                                        <div className="text-[11px] text-[#475569]">
                                            {c.country}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-display font-bold text-sm text-[#0B1221]">
                                            {c.events}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#475569]">
                                            events
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
