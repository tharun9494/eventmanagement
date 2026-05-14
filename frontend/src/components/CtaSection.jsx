import { motion } from "framer-motion";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";

export default function CtaSection() {
    return (
        <section
            id="create"
            data-testid="cta-section"
            className="relative py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-[2rem] p-10 sm:p-16 lg:p-20"
                    style={{
                        background:
                            "linear-gradient(135deg, #0B1221 0%, #1a1f3a 60%, #2a1e54 100%)",
                    }}
                >
                    {/* Background orbs */}
                    <div className="absolute -top-32 -right-32 size-96 rounded-full bg-[#5B8CFF]/40 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-[#00C2FF]/30 blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
                            backgroundSize: "48px 48px",
                            WebkitMaskImage:
                                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                            maskImage:
                                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                        }}
                    />

                    <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
                                <Sparkle
                                    weight="fill"
                                    className="size-3.5 text-[#00C2FF]"
                                />
                                Start in minutes
                            </div>
                            <h2 className="mt-5 font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                                Host the next
                                <br className="hidden sm:block" />
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(135deg,#7B61FF,#00C2FF)",
                                    }}
                                >
                                    unforgettable
                                </span>{" "}
                                event.
                            </h2>
                            <p className="mt-5 text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
                                Beautiful event pages, intelligent ticketing, and
                                cinematic attendee experiences — all in one
                                premium platform.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                            <a
                                href="#upcoming"
                                data-testid="cta-primary"
                                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#0B1221] font-semibold text-sm hover:scale-[1.03] active:scale-95 transition"
                            >
                                Create Event
                                <ArrowUpRight
                                    weight="bold"
                                    className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                                />
                            </a>
                            <a
                                href="#gallery"
                                data-testid="cta-secondary"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur text-white font-semibold text-sm hover:bg-white/20 transition"
                            >
                                See gallery
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
