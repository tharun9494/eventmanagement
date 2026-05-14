import { useEffect, useRef } from "react";

/**
 * Prismatic animated background — pure CSS/SVG.
 * - 4 huge radial gradient orbs in motion (translate3d only)
 * - Animated SVG turbulence for depth (paused off-screen)
 * - GPU-only, no JS per-frame work
 * - Designed to sit BEHIND content as a full-viewport canvas
 */
export default function BackgroundAura({ intensity = 1, className = "" }) {
    const ref = useRef(null);
    const visibleRef = useRef(true);

    // Pause SVG turbulence animation when off-screen to save FPS
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    visibleRef.current = e.isIntersecting;
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
            {/* Soft white base — keeps text crisp */}
            <div className="absolute inset-0 bg-white" />

            {/* Animated gradient orbs */}
            <div className="prismatic-orb prismatic-orb-1" />
            <div className="prismatic-orb prismatic-orb-2" />
            <div className="prismatic-orb prismatic-orb-3" />
            <div className="prismatic-orb prismatic-orb-4" />

            {/* Subtle conic shimmer */}
            <div className="prismatic-conic" />

            {/* Grid mask for depth */}
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(91,140,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
                }}
            />

            {/* Top vignette → ensures navbar contrast */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/80 to-transparent" />
            {/* Bottom vignette → smooth handoff to next section */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />

            <style>{`
                .prismatic-orb {
                    position: absolute;
                    border-radius: 9999px;
                    filter: blur(80px);
                    will-change: transform;
                    transform: translate3d(0, 0, 0);
                    opacity: 0.7;
                }
                .prismatic-orb-1 {
                    width: 70vw; height: 70vw;
                    top: -25%; left: -20%;
                    background: radial-gradient(circle, #5B8CFF 0%, transparent 65%);
                    animation: orb1 22s ease-in-out infinite;
                }
                .prismatic-orb-2 {
                    width: 60vw; height: 60vw;
                    top: -10%; right: -20%;
                    background: radial-gradient(circle, #00C2FF 0%, transparent 65%);
                    animation: orb2 26s ease-in-out infinite;
                    opacity: 0.55;
                }
                .prismatic-orb-3 {
                    width: 65vw; height: 65vw;
                    bottom: -30%; left: 10%;
                    background: radial-gradient(circle, #7B61FF 0%, transparent 65%);
                    animation: orb3 28s ease-in-out infinite;
                    opacity: 0.6;
                }
                .prismatic-orb-4 {
                    width: 50vw; height: 50vw;
                    bottom: -10%; right: -10%;
                    background: radial-gradient(circle, #5B8CFF 0%, transparent 65%);
                    animation: orb4 24s ease-in-out infinite;
                    opacity: 0.5;
                }
                .prismatic-conic {
                    position: absolute;
                    inset: -20%;
                    background: conic-gradient(from 0deg at 50% 50%,
                        rgba(91,140,255,0) 0deg,
                        rgba(123,97,255,0.10) 90deg,
                        rgba(0,194,255,0.08) 180deg,
                        rgba(91,140,255,0.10) 270deg,
                        rgba(91,140,255,0) 360deg);
                    animation: spin 60s linear infinite;
                    will-change: transform;
                    -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
                    mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%);
                }
                @keyframes orb1 {
                    0%,100% { transform: translate3d(0,0,0) scale(1); }
                    33% { transform: translate3d(10%, 6%, 0) scale(1.08); }
                    66% { transform: translate3d(-6%, 12%, 0) scale(0.95); }
                }
                @keyframes orb2 {
                    0%,100% { transform: translate3d(0,0,0) scale(1); }
                    50% { transform: translate3d(-12%, 10%, 0) scale(1.1); }
                }
                @keyframes orb3 {
                    0%,100% { transform: translate3d(0,0,0) scale(1); }
                    50% { transform: translate3d(8%, -10%, 0) scale(1.05); }
                }
                @keyframes orb4 {
                    0%,100% { transform: translate3d(0,0,0) scale(1); }
                    50% { transform: translate3d(-8%, -8%, 0) scale(1.1); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 768px) {
                    .prismatic-orb { filter: blur(60px); opacity: 0.45 !important; }
                    .prismatic-conic { display: none; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .prismatic-orb, .prismatic-conic { animation: none !important; }
                }
            `}</style>
        </div>
    );
}
