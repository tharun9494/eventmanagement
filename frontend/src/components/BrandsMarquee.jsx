import { Star } from "@phosphor-icons/react";

/**
 * Premium 3-row marquee tape — opposite directions for energy.
 * Replaces the old basic BrandsMarquee.
 */
const tapeWords = [
    "Premium Events",
    "Live Now",
    "Cinematic UX",
    "Smart Tickets",
    "Real-time Analytics",
    "Global Cities",
    "Razorpay Native",
    "Loved by Creators",
    "Sub-second Checkout",
    "Sold Out",
];

export default function MarqueeTape() {
    return (
        <section
            data-testid="marquee-tape"
            className="relative py-10 sm:py-14 overflow-hidden bg-white/40 backdrop-blur-lg border-y border-white/60 shadow-[0_10px_40px_-10px_rgba(91,140,255,0.1)]"
        >
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="size-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, #0B1221 1px, transparent 1px)",
                        backgroundSize: "12% 100%",
                    }}
                />
            </div>

            {/* Row 1 — large, left */}
            <Row direction="left" duration={32} large>
                {tapeWords}
            </Row>

            {/* Divider line */}
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#5B8CFF]/20 to-transparent" />

            {/* Row 2 — small, right */}
            <Row direction="right" duration={42}>
                {[
                    "AURORA",
                    "NEBULA",
                    "VANTA",
                    "ORBIT",
                    "PRISM",
                    "EVENTRA",
                    "HALO",
                    "ZENITH",
                    "PULSE",
                    "STELLAR",
                    "RADIANT",
                    "VERTEX",
                ]}
            </Row>
        </section>
    );
}

function Row({ children, direction = "left", duration = 30, large = false }) {
    const items = [...children, ...children, ...children];
    const animClass = direction === "left" ? "tape-left" : "tape-right";
    return (
        <div className="relative">
            <div
                className={`flex items-center gap-10 sm:gap-14 whitespace-nowrap ${animClass} will-change-transform`}
                style={{ animationDuration: `${duration}s` }}
            >
                {items.map((it, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-10 sm:gap-14 shrink-0"
                    >
                        <span
                            className={`font-display font-black tracking-tighter ${
                                large
                                    ? "text-4xl sm:text-6xl lg:text-7xl"
                                    : "text-xl sm:text-2xl"
                            } text-[#0B1221]/20 hover:text-[#0B1221] transition-colors duration-500`}
                        >
                            {it}
                        </span>
                        <Star
                            weight="fill"
                            className={`${
                                large ? "size-7 sm:size-9" : "size-4 sm:size-5"
                            } text-[#7B61FF]/60 shrink-0`}
                        />
                    </div>
                ))}
            </div>
            <style>{`
                .tape-left { animation: tapeL linear infinite; }
                .tape-right { animation: tapeR linear infinite; }
                @keyframes tapeL { from { transform: translate3d(0,0,0); } to { transform: translate3d(-33.333%,0,0); } }
                @keyframes tapeR { from { transform: translate3d(-33.333%,0,0); } to { transform: translate3d(0,0,0); } }
                @media (prefers-reduced-motion: reduce) {
                    .tape-left, .tape-right { animation-play-state: paused; }
                }
            `}</style>
        </div>
    );
}
