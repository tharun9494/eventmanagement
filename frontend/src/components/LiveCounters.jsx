import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Ticket, Users, MapPin, Star } from "@phosphor-icons/react";

const items = [
    { label: "Tickets sold this week", end: 48214, icon: Ticket, hue: "from-[#5B8CFF] to-[#7B61FF]" },
    { label: "Active attendees", end: 2400000, icon: Users, hue: "from-[#7B61FF] to-[#00C2FF]", suffix: "" },
    { label: "Cities lit up tonight", end: 84, icon: MapPin, hue: "from-[#00C2FF] to-[#5B8CFF]" },
    { label: "Average rating", end: 4.96, icon: Star, hue: "from-[#5B8CFF] to-[#00C2FF]", decimals: 2 },
];

export default function LiveCounters() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section
            ref={ref}
            data-testid="live-counters"
            className="relative py-24 sm:py-32 overflow-visible"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                            Live · Network Pulse
                        </div>
                        <h2 className="mt-2 font-display font-bold tracking-tighter text-[#0B1221] text-3xl sm:text-4xl lg:text-5xl">
                            The numbers
                            <span className="text-gradient"> never sleep.</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#475569]">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Updating in real-time
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {items.map((it, i) => (
                        <motion.div
                            key={it.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            data-testid={`counter-${i}`}
                            className="relative group rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white/60 p-5 sm:p-8 shadow-[0_15px_40px_-15px_rgba(91,140,255,0.15)] overflow-hidden flex flex-col justify-between"
                        >
                            <div
                                className={`absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${it.hue} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                            />
                            <div className="relative flex items-center justify-between">
                                <div
                                    className={`size-12 rounded-2xl bg-gradient-to-br ${it.hue} flex items-center justify-center text-white shadow-[0_8px_24px_-8px_rgba(91,140,255,0.6)]`}
                                >
                                    <it.icon
                                        weight="duotone"
                                        className="size-6"
                                    />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5B8CFF]">
                                    Live
                                </span>
                            </div>
                            <RollingNumber
                                end={it.end}
                                play={inView}
                                decimals={it.decimals}
                            />
                            <div className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
                                {it.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* Rolling-digit number that counts up smoothly when in view */
function RollingNumber({ end, play, decimals = 0 }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!play) return;
        const dur = 1600;
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 4);
            setVal(end * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [end, play]);

    const text =
        decimals > 0
            ? val.toFixed(decimals)
            : Math.round(val).toLocaleString();

    return (
        <div className="relative mt-4 sm:mt-5 font-display font-bold text-[1.65rem] leading-none sm:text-4xl lg:text-5xl tracking-tighter text-[#0B1221] tabular-nums whitespace-nowrap">
            {text}
        </div>
    );
}
