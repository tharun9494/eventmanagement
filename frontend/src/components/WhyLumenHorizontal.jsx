import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Lightning,
    Shield,
    Sparkle,
    Confetti,
    Globe,
    ChartLineUp,
} from "@phosphor-icons/react";

const panels = [
    {
        n: "01",
        icon: Sparkle,
        title: "Cinematic by default",
        desc: "Every event page ships with glass cards, ambient light, tilt motion and cinematic typography. No design work needed.",
        hue: "from-[#5B8CFF] to-[#7B61FF]",
    },
    {
        n: "02",
        icon: Lightning,
        title: "Lightning checkout",
        desc: "Sub-second booking flow. One-tap re-purchase for returning attendees. UPI, Razorpay, Stripe, Apple Pay all native.",
        hue: "from-[#7B61FF] to-[#00C2FF]",
    },
    {
        n: "03",
        icon: ChartLineUp,
        title: "Real-time analytics",
        desc: "Ticket velocity, geo distribution, attendee engagement — live charts that look as good as your event.",
        hue: "from-[#00C2FF] to-[#5B8CFF]",
    },
    {
        n: "04",
        icon: Shield,
        title: "Fortress-grade security",
        desc: "SOC-2 controls, encrypted ticket QR rotation, offline scanning. Zero data anxiety, full PCI compliance.",
        hue: "from-[#5B8CFF] to-[#00C2FF]",
    },
    {
        n: "05",
        icon: Globe,
        title: "Global ready",
        desc: "Multi-currency, multi-language, multi-timezone. 84 countries supported out of the box.",
        hue: "from-[#7B61FF] to-[#5B8CFF]",
    },
    {
        n: "06",
        icon: Confetti,
        title: "Loved by humans",
        desc: "4.96 from 2,840 organizers. Premium support that actually picks up. Hand-built playbooks for your launch night.",
        hue: "from-[#00C2FF] to-[#7B61FF]",
    },
];

export default function WhyLumenHorizontal() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    // 6 panels — translate from 0 to about -68% of width
    const x = useTransform(scrollYProgress, [0, 1], ["3%", "-72%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 0.6]);
    const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            ref={ref}
            data-testid="why-eventra"
            className="relative"
            style={{ height: "420vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
                {/* Header */}
                <motion.div
                    style={{ opacity: headerOpacity }}
                    className="relative z-10 pt-20 pb-6 px-4 sm:px-10"
                >
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                        <div>
                            <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                Why teams pick Eventra
                            </div>
                            <h2 className="mt-3 font-display font-bold tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                                Six reasons we feel
                                <br />
                                <span
                                    className="bg-clip-text text-transparent pb-2"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(135deg,#5B8CFF,#7B61FF,#00C2FF)",
                                    }}
                                >
                                    unlike anything else.
                                </span>
                            </h2>
                        </div>
                        <div className="hidden lg:flex items-center gap-3 text-sm font-bold text-[#475569]">
                            <span>Scroll to explore</span>
                            <span className="size-2 rounded-full bg-[#00C2FF] animate-pulse" />
                        </div>
                    </div>
                </motion.div>



                {/* Horizontal scroll track */}
                <div className="flex-1 flex items-center overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex items-stretch gap-6 sm:gap-8 px-4 sm:px-10 pb-10 will-change-transform"
                    >
                        {panels.map((p, i) => (
                            <Panel key={p.n} panel={p} index={i} />
                        ))}
                    </motion.div>
                </div>

                {/* Bottom progress bar */}
                <div className="relative z-10 px-4 sm:px-10 pb-8">
                    <div className="max-w-7xl mx-auto flex items-center gap-4">
                        <div className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#475569] font-mono">
                            01 / 06
                        </div>
                        <div className="flex-1 h-[3px] rounded-full bg-[#EEF4FF] overflow-hidden shadow-inner">
                            <motion.div
                                style={{
                                    scaleX: progressScale,
                                    transformOrigin: "0% 50%",
                                }}
                                className="h-full bg-gradient-to-r from-[#5B8CFF] via-[#7B61FF] to-[#00C2FF]"
                            />
                        </div>
                        <div className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#475569] font-mono">
                            06 / 06
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Panel({ panel, index }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            data-testid={`why-panel-${panel.n}`}
            className="relative shrink-0 w-[88vw] sm:w-[60vw] lg:w-[40vw] xl:w-[32vw] aspect-[5/6] sm:aspect-[4/5] rounded-[2.5rem] p-8 sm:p-12 overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_-15px_rgba(91,140,255,0.2)] flex flex-col justify-between"
        >
            {/* Gradient halo */}
            <div
                className={`absolute -top-20 -right-20 size-60 rounded-full bg-gradient-to-br ${panel.hue} opacity-30 blur-3xl`}
            />
            <div className="relative flex items-start justify-between">
                <div
                    className={`size-14 rounded-2xl bg-gradient-to-br ${panel.hue} flex items-center justify-center text-white shadow-[0_12px_30px_-12px_rgba(91,140,255,0.6)]`}
                >
                    <panel.icon weight="duotone" className="size-7" />
                </div>
                <div className="font-display font-bold text-6xl sm:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#0B1221]/10 to-transparent">
                    {panel.n}
                </div>
            </div>
            <div className="relative">
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1221] tracking-tighter leading-[1]">
                    {panel.title}
                </h3>
                <p className="mt-4 text-[#475569] text-sm sm:text-base font-medium leading-relaxed max-w-[36ch]">
                    {panel.desc}
                </p>
            </div>
        </motion.div>
    );
}
