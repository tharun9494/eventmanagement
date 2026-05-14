import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Star, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { testimonials } from "../data/events";

export default function Testimonials() {
    const [idx, setIdx] = useState(0);
    const t = testimonials[idx];

    return (
        <section
            data-testid="testimonials"
            className="relative py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-4">
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                            Loved by creators
                        </div>
                        <h2 className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl">
                            Built for teams who
                            <span className="text-gradient"> care.</span>
                        </h2>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex items-center gap-0.5">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <Star
                                        key={i}
                                        weight="fill"
                                        className="size-4 text-[#7B61FF]"
                                    />
                                ))}
                            </div>
                            <div className="text-sm font-semibold text-[#0B1221]">
                                4.96
                            </div>
                            <div className="text-sm text-[#475569]">
                                · 2,840 reviews
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setIdx(
                                        (idx - 1 + testimonials.length) %
                                            testimonials.length,
                                    )
                                }
                                data-testid="testimonial-prev"
                                className="size-10 rounded-full bg-white border border-[#EEF4FF] hover:bg-[#F7F9FF] hover:border-[#5B8CFF]/30 transition flex items-center justify-center"
                                aria-label="Previous"
                            >
                                <CaretLeft weight="bold" className="size-4" />
                            </button>
                            <button
                                onClick={() =>
                                    setIdx((idx + 1) % testimonials.length)
                                }
                                data-testid="testimonial-next"
                                className="size-10 rounded-full bg-[#0B1221] text-white hover:bg-black hover:scale-105 active:scale-95 transition flex items-center justify-center"
                                aria-label="Next"
                            >
                                <CaretRight weight="bold" className="size-4" />
                            </button>
                            <div className="ml-3 text-xs font-mono text-[#475569]">
                                {String(idx + 1).padStart(2, "0")} /{" "}
                                {String(testimonials.length).padStart(2, "0")}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="relative rounded-3xl bg-white border border-[#EEF4FF] p-8 sm:p-12 min-h-[300px] overflow-hidden">
                            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-[#5B8CFF]/10 blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-[#00C2FF]/10 blur-3xl" />

                            <Quotes
                                weight="fill"
                                className="relative size-12 text-[#5B8CFF]/25"
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative"
                                >
                                    <p className="mt-4 font-display font-medium text-2xl sm:text-3xl tracking-tight text-[#0B1221] leading-snug">
                                        {t.quote}
                                    </p>
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-display font-bold">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-[#0B1221]">
                                                {t.name}
                                            </div>
                                            <div className="text-xs text-[#475569]">
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
