import { motion } from "framer-motion";
import {
    Cpu,
    MusicNotes,
    PaintBrush,
    Briefcase,
    Heart,
    ForkKnife,
    ArrowRight,
} from "@phosphor-icons/react";
import { categories } from "../data/events";

const iconMap = { Cpu, MusicNotes, PaintBrush, Briefcase, Heart, ForkKnife };

export default function CategoriesExplorer() {
    return (
        <section
            id="categories"
            data-testid="categories-section"
            className="relative py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5 }}
                            className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]"
                        >
                            Explore by mood
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-2 font-display font-black tracking-tighter text-[#0B1221] text-3xl sm:text-4xl lg:text-5xl"
                        >
                            Find your next
                            <span className="text-gradient"> obsession.</span>
                        </motion.h2>
                    </div>
                    <a
                        href="#upcoming"
                        className="group inline-flex items-center gap-2 self-start sm:self-end text-sm font-semibold text-[#0B1221] hover:text-[#5B8CFF] transition"
                        data-testid="categories-view-all"
                    >
                        Browse all 12k+ events
                        <ArrowRight
                            weight="bold"
                            className="size-4 group-hover:translate-x-0.5 transition"
                        />
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((c, i) => {
                        const Icon = iconMap[c.icon];
                        return (
                            <motion.a
                                href="#upcoming"
                                key={c.id}
                                data-testid={`category-${c.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group relative aspect-square rounded-2xl p-5 bg-white border border-[#EEF4FF] hover:border-transparent hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(91,140,255,0.35)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                            >
                                <div
                                    className={`size-12 rounded-xl bg-gradient-to-br ${c.hue} flex items-center justify-center text-white shadow-[0_8px_24px_-8px_rgba(91,140,255,0.6)]`}
                                >
                                    <Icon
                                        weight="duotone"
                                        className="size-6"
                                    />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-sm sm:text-base text-[#0B1221] tracking-tight">
                                        {c.name}
                                    </div>
                                    <div className="text-xs text-[#475569] mt-0.5">
                                        {c.count.toLocaleString()} live events
                                    </div>
                                </div>

                                {/* Hover gradient sheen */}
                                <div
                                    className={`absolute -inset-1 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${c.hue} blur-xl`}
                                />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
