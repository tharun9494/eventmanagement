import { useEffect, useRef } from "react";

/**
 * Rich prismatic 3D background — pure CSS/SVG, GPU only.
 * Layers (bottom → top):
 *  1. Soft white base
 *  2. 5 huge animated radial orbs (translate3d + scale)
 *  3. Slowly spinning conic shimmer
 *  4. Animated SVG flowing "aurora" path (CSS animation on stroke)
 *  5. SVG turbulence "frosted glass" noise overlay (very subtle)
 *  6. Dotted depth grid mask
 *  7. Top + bottom vignettes for contrast
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

            {/* Animated orbs */}
            <div className="bg-aura-orb bg-aura-orb-1" />
            <div className="bg-aura-orb bg-aura-orb-2" />
            <div className="bg-aura-orb bg-aura-orb-3" />
            <div className="bg-aura-orb bg-aura-orb-4" />
            <div className="bg-aura-orb bg-aura-orb-5" />

            {/* Conic shimmer */}
            <div className="bg-aura-conic" />

            {/* Flowing aurora SVG path */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
                style={{ mixBlendMode: "screen" }}
            >
                <defs>
                    <linearGradient id="aurora-grad-1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0" />
                        <stop offset="40%" stopColor="#7B61FF" stopOpacity="0.55" />
                        <stop offset="60%" stopColor="#00C2FF" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="aurora-grad-2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
                        <stop offset="50%" stopColor="#5B8CFF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                    </linearGradient>
                    <filter id="aurora-blur">
                        <feGaussianBlur stdDeviation="22" />
                    </filter>
                </defs>
                <path
                    className="aurora-path-1"
                    d="M -200,450 C 200,300 500,600 720,450 C 940,300 1240,600 1640,450"
                    fill="none"
                    stroke="url(#aurora-grad-1)"
                    strokeWidth="120"
                    filter="url(#aurora-blur)"
                    strokeLinecap="round"
                />
                <path
                    className="aurora-path-2"
                    d="M -200,500 C 250,650 480,300 760,520 C 1040,740 1240,360 1640,520"
                    fill="none"
                    stroke="url(#aurora-grad-2)"
                    strokeWidth="100"
                    filter="url(#aurora-blur)"
                    strokeLinecap="round"
                />
            </svg>

            {/* SVG turbulence noise — very subtle */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-multiply"
                aria-hidden="true"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.85"
                        numOctaves="2"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

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

            {/* Vignettes */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/85 to-transparent" />

            <style>{`
                .bg-aura-orb {
                    position: absolute;
                    border-radius: 9999px;
                    filter: blur(80px);
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
                .bg-aura-orb-4 { width:50vw;height:50vw;bottom:-10%;right:-10%;opacity:.5;
                    background: radial-gradient(circle, #5B8CFF 0%, transparent 65%);
                    animation: bgOrb4 24s ease-in-out infinite; }
                .bg-aura-orb-5 { width:42vw;height:42vw;top:30%;left:35%;opacity:.38;
                    background: radial-gradient(circle, #B69CFF 0%, transparent 65%);
                    animation: bgOrb5 30s ease-in-out infinite; }
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
                .aurora-path-1 {
                    stroke-dasharray: 2400; stroke-dashoffset: 0;
                    animation: auroraDrift1 18s ease-in-out infinite alternate;
                    opacity: 0.85;
                    will-change: transform;
                }
                .aurora-path-2 {
                    stroke-dasharray: 2400; stroke-dashoffset: 0;
                    animation: auroraDrift2 22s ease-in-out infinite alternate;
                    opacity: 0.75;
                    will-change: transform;
                }
                @keyframes bgOrb1 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(10%,6%,0) scale(1.08)} 66%{transform:translate3d(-6%,12%,0) scale(.95)} }
                @keyframes bgOrb2 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(-12%,10%,0) scale(1.1)} }
                @keyframes bgOrb3 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(8%,-10%,0) scale(1.05)} }
                @keyframes bgOrb4 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(-8%,-8%,0) scale(1.1)} }
                @keyframes bgOrb5 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(5%,7%,0) scale(.9)} }
                @keyframes bgSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
                @keyframes auroraDrift1 {
                    0% { transform: translate3d(0,0,0); }
                    100% { transform: translate3d(-3%, -2%, 0) scaleY(1.1); }
                }
                @keyframes auroraDrift2 {
                    0% { transform: translate3d(0,0,0); }
                    100% { transform: translate3d(4%, 3%, 0) scaleY(0.95); }
                }
                @media (max-width: 768px) {
                    .bg-aura-orb { filter: blur(60px); opacity: 0.4 !important; }
                    .bg-aura-conic, .aurora-path-2 { display: none; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .bg-aura-orb, .bg-aura-conic, .aurora-path-1, .aurora-path-2 { animation: none !important; }
                }
            `}</style>
        </div>
    );
}
