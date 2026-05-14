import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Lightning, TrendUp, MapPin } from "@phosphor-icons/react";
import { liveFeed } from "../data/events";

export default function LiveActivity() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const id = setInterval(
            () => setIdx((i) => (i + 1) % liveFeed.length),
            2400,
        );
        return () => clearInterval(id);
    }, []);

    const visible = [
        liveFeed[idx],
        liveFeed[(idx + 1) % liveFeed.length],
        liveFeed[(idx + 2) % liveFeed.length],
    ];

    return (
        <section
            data-testid="live-activity"
            className="relative py-20 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold">
                            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                            <span className="uppercase tracking-[0.2em] text-[10px]">
                                Live · Real-time
                            </span>
                        </div>
                        <h2 className="mt-4 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl">
                            People are booking
                            <span className="text-gradient"> right now.</span>
                        </h2>
                        <p className="mt-4 text-[#475569] text-base sm:text-lg leading-relaxed max-w-md">
                            Watch the platform pulse as creators sell tickets,
                            attendees discover their next favorite night, and
                            cities light up across the globe.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                            <MiniStat
                                icon={<Ticket weight="duotone" />}
                                k="284"
                                v="Sold today"
                            />
                            <MiniStat
                                icon={<Lightning weight="duotone" />}
                                k="9.4s"
                                v="Avg checkout"
                            />
                            <MiniStat
                                icon={<TrendUp weight="duotone" />}
                                k="+18%"
                                v="vs last wk"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="relative rounded-3xl bg-[#0B1221] text-white p-5 sm:p-7 overflow-hidden">
                            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-[#7B61FF]/40 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[#00C2FF]/30 blur-3xl" />

                            <div className="relative flex items-center justify-between mb-5">
                                <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                                    Activity Feed
                                </div>
                                <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">
                                    LUMEN · LIVE
                                </div>
                            </div>

                            <div className="relative space-y-3 min-h-[260px]">
                                <AnimatePresence initial={false}>
                                    {visible.map((item, i) => (
                                        <motion.div
                                            key={`${idx}-${i}`}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: i === 0 ? 1 : 0.55 - i * 0.18,
                                                y: 0,
                                                scale: 1 - i * 0.04,
                                            }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.55,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                                        >
                                            <div className="size-11 shrink-0 rounded-xl bg-brand-gradient flex items-center justify-center font-display font-bold text-white">
                                                {item.who
                                                    .split(" ")
                                                    .map((s) => s[0])
                                                    .join("")}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-sm">
                                                    <span className="font-semibold">
                                                        {item.who}
                                                    </span>{" "}
                                                    <span className="text-white/60">
                                                        {item.action}
                                                    </span>{" "}
                                                    <span className="font-semibold">
                                                        {item.what}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
                                                    <MapPin
                                                        weight="duotone"
                                                        className="size-3"
                                                    />
                                                    {item.where}
                                                    <span className="size-0.5 rounded-full bg-white/30" />
                                                    {item.ago} ago
                                                </div>
                                            </div>
                                            <div className="shrink-0 size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#22c55e]" />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="relative mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                                <span>Streaming events from 84 countries</span>
                                <span className="font-mono">
                                    {new Date().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MiniStat({ icon, k, v }) {
    return (
        <div className="rounded-2xl bg-white border border-[#EEF4FF] p-4">
            <div className="size-9 rounded-xl bg-[#F7F9FF] flex items-center justify-center text-[#5B8CFF]">
                {icon}
            </div>
            <div className="mt-3 font-display font-bold text-2xl tracking-tighter text-[#0B1221]">
                {k}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569] mt-0.5">
                {v}
            </div>
        </div>
    );
}
