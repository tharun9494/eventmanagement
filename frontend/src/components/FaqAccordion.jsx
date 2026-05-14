import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Question } from "@phosphor-icons/react";
import { faqs } from "../data/events";

export default function FaqAccordion() {
    const [open, setOpen] = useState(0);
    return (
        <section
            data-testid="faq-section"
            className="relative py-24 sm:py-28 bg-gradient-to-b from-white via-[#F7F9FF] to-white"
        >
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                            <Question
                                weight="duotone"
                                className="size-4"
                            />
                            Frequently asked
                        </div>
                        <h2 className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl">
                            Questions, answered
                            <span className="text-gradient"> beautifully.</span>
                        </h2>
                        <p className="mt-4 text-[#475569] text-base leading-relaxed">
                            Can't find what you're looking for? Reach our
                            humans at{" "}
                            <a
                                href="mailto:hello@lumen.events"
                                className="text-[#5B8CFF] hover:text-[#0B1221] underline-offset-2 hover:underline"
                            >
                                hello@lumen.events
                            </a>
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-3">
                        {faqs.map((f, i) => {
                            const isOpen = open === i;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.45,
                                        delay: i * 0.05,
                                    }}
                                    data-testid={`faq-${i}`}
                                    className={`rounded-2xl border transition-all overflow-hidden ${
                                        isOpen
                                            ? "bg-white border-[#5B8CFF]/30 shadow-[0_18px_40px_-24px_rgba(91,140,255,0.4)]"
                                            : "bg-white border-[#EEF4FF] hover:border-[#5B8CFF]/20"
                                    }`}
                                >
                                    <button
                                        onClick={() =>
                                            setOpen(isOpen ? -1 : i)
                                        }
                                        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left"
                                        data-testid={`faq-toggle-${i}`}
                                    >
                                        <span className="font-display font-bold text-base sm:text-lg text-[#0B1221] tracking-tight">
                                            {f.q}
                                        </span>
                                        <span
                                            className={`size-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                                                isOpen
                                                    ? "bg-[#0B1221] text-white"
                                                    : "bg-[#F7F9FF] text-[#0B1221]"
                                            }`}
                                        >
                                            {isOpen ? (
                                                <Minus
                                                    weight="bold"
                                                    className="size-4"
                                                />
                                            ) : (
                                                <Plus
                                                    weight="bold"
                                                    className="size-4"
                                                />
                                            )}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                            >
                                                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[#475569] text-sm leading-relaxed">
                                                    {f.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
