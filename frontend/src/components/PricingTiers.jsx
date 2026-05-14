import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { pricingTiers } from "../data/events";

export default function PricingTiers() {
    return (
        <section
            id="pricing"
            data-testid="pricing-section"
            className="relative py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                        Pricing for organizers
                    </div>
                    <h2 className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl">
                        Simple plans.
                        <span className="text-gradient"> Premium results.</span>
                    </h2>
                    <p className="mt-4 text-[#475569] text-base sm:text-lg">
                        Start free. Upgrade only when you outgrow it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                    {pricingTiers.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            data-testid={`tier-${t.name.toLowerCase()}`}
                            className={`relative rounded-3xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${
                                t.highlight
                                    ? "bg-[#0B1221] text-white shadow-[0_30px_80px_-30px_rgba(91,140,255,0.55)] md:scale-105"
                                    : "bg-white border border-[#EEF4FF] text-[#0B1221] hover:border-[#5B8CFF]/30"
                            } overflow-hidden`}
                        >
                            {t.highlight && (
                                <>
                                    <div className="absolute -top-16 -right-16 size-56 rounded-full bg-[#7B61FF]/30 blur-3xl pointer-events-none" />
                                    <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-[#00C2FF]/25 blur-3xl pointer-events-none" />
                                </>
                            )}
                            {t.badge && (
                                <div className="relative inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full bg-[#00C2FF]/15 text-[#00C2FF] text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <Sparkle weight="fill" className="size-3" />
                                    {t.badge}
                                </div>
                            )}
                            <div className="relative">
                                <div
                                    className={`text-[11px] uppercase tracking-[0.25em] font-semibold ${
                                        t.highlight
                                            ? "text-[#00C2FF]"
                                            : "text-[#5B8CFF]"
                                    }`}
                                >
                                    {t.name}
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="font-display font-black text-5xl sm:text-6xl tracking-tighter">
                                        {t.price}
                                    </span>
                                </div>
                                <div
                                    className={`mt-1 text-sm ${
                                        t.highlight
                                            ? "text-white/60"
                                            : "text-[#475569]"
                                    }`}
                                >
                                    {t.sub}
                                </div>

                                <a
                                    href="#"
                                    className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                                        t.highlight
                                            ? "bg-white text-[#0B1221] hover:scale-[1.02] active:scale-95"
                                            : "bg-[#0B1221] text-white hover:bg-black hover:scale-[1.02] active:scale-95"
                                    }`}
                                    data-testid={`tier-cta-${t.name.toLowerCase()}`}
                                >
                                    {t.cta}
                                    <ArrowUpRight
                                        weight="bold"
                                        className="size-4"
                                    />
                                </a>

                                <ul
                                    className={`mt-7 space-y-3 ${
                                        t.highlight
                                            ? "text-white/85"
                                            : "text-[#0B1221]"
                                    }`}
                                >
                                    {t.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-2.5 text-sm"
                                        >
                                            <span
                                                className={`mt-0.5 size-4 rounded-full flex items-center justify-center shrink-0 ${
                                                    t.highlight
                                                        ? "bg-[#00C2FF]/20 text-[#00C2FF]"
                                                        : "bg-[#5B8CFF]/15 text-[#5B8CFF]"
                                                }`}
                                            >
                                                <Check
                                                    weight="bold"
                                                    className="size-3"
                                                />
                                            </span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
