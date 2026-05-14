import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Microphone,
    Users,
    Ticket,
    ArrowUpRight,
} from "@phosphor-icons/react";
import { upcomingEvents } from "../data/events";

export default function FeaturedEventHero() {
    const e = upcomingEvents[0];
    const c = useCountdown(e.date);
    return (
        <section
            data-testid="featured-event"
            className="relative py-20 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2rem] overflow-hidden grid lg:grid-cols-12 gap-0 bg-[#0B1221] text-white"
                >
                    {/* Image side */}
                    <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                        <img
                            src={e.image}
                            alt={e.title}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/40 to-transparent lg:bg-gradient-to-r" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/80 via-transparent to-transparent" />

                        {/* Featured badge */}
                        <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold">
                            <span className="size-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_10px_#00C2FF] animate-pulse" />
                            Featured event
                        </div>

                        {/* Floating mini chip */}
                        <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-[#0B1221] text-xs font-semibold">
                            <Microphone
                                weight="duotone"
                                className="size-3.5 text-[#7B61FF]"
                            />
                            {e.speakers} world-class speakers
                        </div>
                    </div>

                    {/* Content side */}
                    <div className="relative lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-8">
                        {/* Background orbs */}
                        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-[#7B61FF]/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[#00C2FF]/20 blur-3xl" />

                        <div className="relative">
                            <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                                {e.category} · {e.dateLabel}
                            </div>
                            <h3 className="mt-3 font-display font-black tracking-tighter text-3xl sm:text-4xl lg:text-5xl leading-[1]">
                                {e.title}
                            </h3>
                            <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
                                Three days of cinematic talks, hands-on labs, and
                                premium networking with the brightest minds in
                                product, AI, and design.
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Pill icon={<Calendar weight="duotone" className="size-4" />} label={e.time} />
                                <Pill icon={<MapPin weight="duotone" className="size-4" />} label={e.location} />
                                <Pill icon={<Ticket weight="duotone" className="size-4" />} label={`From ${e.price}`} />
                                <Pill icon={<Users weight="duotone" className="size-4" />} label={`${e.capacity.toLocaleString()} cap.`} />
                            </div>
                        </div>

                        <div className="relative">
                            {/* Countdown */}
                            <div className="grid grid-cols-4 gap-2 mb-5">
                                {[
                                    { v: c.d, l: "Days" },
                                    { v: c.h, l: "Hrs" },
                                    { v: c.m, l: "Min" },
                                    { v: c.s, l: "Sec" },
                                ].map((t) => (
                                    <div
                                        key={t.l}
                                        className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 px-2 py-2.5 text-center"
                                    >
                                        <div className="font-display font-black text-xl sm:text-2xl tracking-tighter tabular-nums">
                                            {String(t.v).padStart(2, "0")}
                                        </div>
                                        <div className="text-[9px] uppercase tracking-[0.2em] font-semibold text-white/60 mt-0.5">
                                            {t.l}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Capacity bar */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                                    <span>Capacity filling fast</span>
                                    <span className="font-semibold text-white">
                                        {e.sold}%
                                    </span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${e.sold}%` }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeOut",
                                        }}
                                        className="h-full bg-brand-gradient"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a
                                    href="#upcoming"
                                    data-testid="featured-register"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0B1221] font-semibold text-sm hover:scale-[1.02] active:scale-95 transition"
                                >
                                    Register now
                                    <ArrowUpRight
                                        weight="bold"
                                        className="size-4"
                                    />
                                </a>
                                <a
                                    href="#upcoming"
                                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 backdrop-blur text-white font-semibold text-sm hover:bg-white/20 transition"
                                >
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Pill({ icon, label }) {
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
            <span className="text-[#00C2FF]">{icon}</span>
            <span className="truncate">{label}</span>
        </div>
    );
}

function useCountdown(targetIso) {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const diff = Math.max(0, new Date(targetIso).getTime() - now);
    return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
    };
}
