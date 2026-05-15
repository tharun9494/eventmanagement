import { useEffect, useRef } from "react";

/**
 * Optimized background — simplified for performance
 * - Reduced number of animated orbs from 5 to 3
 * - Removed expensive SVG turbulence noise
 * - Simplified aurora paths
 * - Reduced blur intensity
 */
export default function BackgroundAura({ intensity = 1, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    el.style.setProperty(
                        "animation-play-state",
                        e.isIntersecting ? "running" : "paused",
                    );
                });
            },
            { threshold: 0 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            style={{ opacity: intensity }}
        >
            <div className="absolute inset-0 bg-white" />

            {/* Simplified animated orbs - reduced from 5 to 3 */}
            <div className="bg-aura-orb bg-aura-orb-1" />
            <div className="bg-aura-orb bg-aura-orb-2" />
            <div className="bg-aura-orb bg-aura-orb-3" />

            {/* Simplified conic shimmer */}
            <div className="bg-aura-conic" />



            {/* Dot depth grid */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(91,140,255,0.18) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
                }}
            />



            <style>{`
                .bg-aura-orb {
                    position: absolute;
                    border-radius: 9999px;
                    filter: blur(60px);
                    will-change: transform;
                    transform: translate3d(0,0,0);
                }
                .bg-aura-orb-1 { width:70vw;height:70vw;top:-25%;left:-20%;opacity:.65;
                    background: radial-gradient(circle, #5B8CFF 0%, transparent 65%);
                    animation: bgOrb1 22s ease-in-out infinite; }
                .bg-aura-orb-2 { width:60vw;height:60vw;top:-10%;right:-20%;opacity:.55;
                    background: radial-gradient(circle, #00C2FF 0%, transparent 65%);
                    animation: bgOrb2 26s ease-in-out infinite; }
                .bg-aura-orb-3 { width:65vw;height:65vw;bottom:-30%;left:5%;opacity:.6;
                    background: radial-gradient(circle, #7B61FF 0%, transparent 65%);
                    animation: bgOrb3 28s ease-in-out infinite; }
                .bg-aura-conic {
                    position: absolute; inset: -20%;
                    background: conic-gradient(from 0deg at 50% 50%,
                        rgba(91,140,255,0) 0deg,
                        rgba(123,97,255,0.10) 90deg,
                        rgba(0,194,255,0.08) 180deg,
                        rgba(91,140,255,0.10) 270deg,
                        rgba(91,140,255,0) 360deg);
                    animation: bgSpin 60s linear infinite;
                    will-change: transform;
                    -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
                    mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
                }

                @keyframes bgOrb1 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(10%,6%,0) scale(1.08)} 66%{transform:translate3d(-6%,12%,0) scale(.95)} }
                @keyframes bgOrb2 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(-12%,10%,0) scale(1.1)} }
                @keyframes bgOrb3 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(8%,-10%,0) scale(1.05)} }
                @keyframes bgSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }

                @media (max-width: 768px) {
                    .bg-aura-orb { filter: blur(40px); opacity: 0.3 !important; }
                    .bg-aura-conic { display: none; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .bg-aura-orb, .bg-aura-conic { animation: none !important; }
                }
            `}</style>
        </div>
    );
}
