import { motion } from "framer-motion";
import { MagnifyingGlass, Ticket, ShootingStar } from "@phosphor-icons/react";

const steps = [
    {
        n: "01",
        title: "Discover",
        desc: "Browse 12k+ curated events across 84 countries. Smart filters surface what's perfect for you.",
        icon: MagnifyingGlass,
        hue: "from-[#5B8CFF] to-[#7B61FF]",
    },
    {
        n: "02",
        title: "Book",
        desc: "One-tap checkout with Razorpay, Stripe or UPI. Your QR ticket lives in a permanent wallet.",
        icon: Ticket,
        hue: "from-[#7B61FF] to-[#00C2FF]",
    },
    {
        n: "03",
        title: "Experience",
        desc: "Show up, scan in, glow up. Lumen powers premium moments — from atmosphere to after-party.",
        icon: ShootingStar,
        hue: "from-[#00C2FF] to-[#5B8CFF]",
    },
];

export default function HowItWorks() {
    return (
        <section
            data-testid="how-it-works"
            className="relative py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                        How it works
                    </div>
                    <h2 className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl">
                        Three steps to your
                        <span className="text-gradient"> best night out.</span>
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Connector line (desktop) */}
                    <div
                        className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, #5B8CFF44 15%, #7B61FF66 50%, #00C2FF44 85%, transparent)",
                        }}
                    />
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.n}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            data-testid={`step-${s.n}`}
                            className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#EEF4FF] hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(91,140,255,0.3)] transition-all duration-500"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`relative size-14 rounded-2xl bg-gradient-to-br ${s.hue} flex items-center justify-center text-white shadow-[0_10px_30px_-10px_rgba(91,140,255,0.6)]`}
                                >
                                    <s.icon
                                        weight="duotone"
                                        className="size-6"
                                    />
                                </div>
                                <div className="font-display font-black text-5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#0B1221]/15 to-[#0B1221]/5">
                                    {s.n}
                                </div>
                            </div>
                            <h3 className="mt-5 font-display font-bold text-2xl text-[#0B1221] tracking-tight">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-[#475569] text-sm leading-relaxed">
                                {s.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
