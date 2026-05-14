import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Premium "3D-feel" scene built entirely with CSS 3D transforms + SVG.
 * - GPU-accelerated translate3d/rotate3d only
 * - No WebGL canvas = perfect mobile FPS
 * - Mouse parallax for cinematic depth
 * - Compatible with all React versions / dev tooling
 */

export default function ThreeScene({ compact = false }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf;
        let targetX = 0;
        let targetY = 0;
        let curX = 0;
        let curY = 0;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            targetX = ((e.clientX - cx) / rect.width) * 2;
            targetY = ((e.clientY - cy) / rect.height) * 2;
        };

        const onLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const tick = () => {
            curX += (targetX - curX) * 0.06;
            curY += (targetY - curY) * 0.06;
            el.style.setProperty("--mx", curX.toFixed(3));
            el.style.setProperty("--my", curY.toFixed(3));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        window.addEventListener("mousemove", onMove, { passive: true });
        el.addEventListener("mouseleave", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    const scale = compact ? 0.85 : 1;

    return (
        <div
            ref={ref}
            data-testid="three-scene"
            className="relative w-full h-full overflow-hidden"
            style={{
                perspective: "1200px",
                "--mx": 0,
                "--my": 0,
                background:
                    "radial-gradient(80% 70% at 50% 40%, #F7F9FF 0%, #EEF4FF 60%, #FFFFFF 100%)",
            }}
        >
            {/* Background ambient blobs */}
            <div
                className="absolute -top-20 -left-20 size-72 rounded-full opacity-60 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, #5B8CFF 0%, transparent 70%)",
                    transform: "translate3d(calc(var(--mx) * 8px), calc(var(--my) * 8px), 0)",
                }}
            />
            <div
                className="absolute -bottom-20 -right-16 size-80 rounded-full opacity-50 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, #00C2FF 0%, transparent 70%)",
                    transform: "translate3d(calc(var(--mx) * -10px), calc(var(--my) * -10px), 0)",
                }}
            />

            {/* Grid floor */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(91,140,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 75%)",
                    maskImage:
                        "radial-gradient(ellipse at center, black 35%, transparent 75%)",
                    transform:
                        "translate3d(calc(var(--mx) * 12px), calc(var(--my) * 12px), 0)",
                }}
            />

            {/* Scene container with preserve-3d */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    transformStyle: "preserve-3d",
                    transform:
                        "rotateX(calc(var(--my) * -6deg)) rotateY(calc(var(--mx) * 8deg))",
                    transition: "transform 80ms linear",
                }}
            >
                {/* Center glass cube — 6 faces */}
                <GlassCube scale={scale} />

                {/* Floating torus rings (SVG for crisp edges) */}
                <FloatingShape
                    style={{
                        top: "12%",
                        left: "8%",
                        animationDelay: "0s",
                        animationDuration: "7s",
                    }}
                    parallax={[14, 18]}
                >
                    <Torus color="#5B8CFF" size={88 * scale} />
                </FloatingShape>

                <FloatingShape
                    style={{
                        top: "62%",
                        right: "6%",
                        animationDelay: "1.4s",
                        animationDuration: "8s",
                    }}
                    parallax={[-18, 16]}
                >
                    <Torus color="#00C2FF" size={76 * scale} />
                </FloatingShape>

                {/* Gradient spheres */}
                <FloatingShape
                    style={{
                        top: "20%",
                        right: "10%",
                        animationDelay: "0.6s",
                        animationDuration: "9s",
                    }}
                    parallax={[-20, 12]}
                >
                    <Sphere color="#7B61FF" size={72 * scale} />
                </FloatingShape>

                <FloatingShape
                    style={{
                        bottom: "14%",
                        left: "10%",
                        animationDelay: "2s",
                        animationDuration: "10s",
                    }}
                    parallax={[18, -14]}
                >
                    <Sphere color="#5B8CFF" size={60 * scale} />
                </FloatingShape>

                {/* Small ring back */}
                <FloatingShape
                    style={{
                        top: "44%",
                        left: "44%",
                        animationDelay: "3s",
                        animationDuration: "12s",
                    }}
                    parallax={[8, -10]}
                >
                    <Ring color="#00C2FF" size={140 * scale} />
                </FloatingShape>

                {/* Floating glass panel back */}
                <FloatingShape
                    style={{
                        top: "8%",
                        right: "32%",
                        animationDelay: "1.2s",
                        animationDuration: "11s",
                    }}
                    parallax={[-10, -10]}
                >
                    <GlassPanel scale={scale * 0.8} />
                </FloatingShape>
            </div>

            {/* Ambient highlight overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(400px circle at calc(50% + var(--mx) * 80px) calc(40% + var(--my) * 60px), rgba(0,194,255,0.25), transparent 60%)",
                }}
            />
        </div>
    );
}

function FloatingShape({ children, style, parallax = [0, 0] }) {
    const [px, py] = parallax;
    return (
        <motion.div
            className="absolute"
            style={{
                ...style,
                transform: `translate3d(calc(var(--mx) * ${px}px), calc(var(--my) * ${py}px), 0)`,
                animation: `floatYY ${style.animationDuration || "8s"} ease-in-out infinite`,
                animationDelay: style.animationDelay,
                willChange: "transform",
            }}
        >
            {children}
            <style>{`
                @keyframes floatYY {
                    0%, 100% { translate: 0 0; }
                    50% { translate: 0 -14px; }
                }
            `}</style>
        </motion.div>
    );
}

function GlassCube({ scale = 1 }) {
    const s = 110 * scale;
    return (
        <div
            className="relative"
            style={{
                width: s,
                height: s,
                transformStyle: "preserve-3d",
                animation: "spinCube 16s linear infinite",
            }}
        >
            <style>{`
                @keyframes spinCube {
                    from { transform: rotateX(20deg) rotateY(0deg); }
                    to { transform: rotateX(20deg) rotateY(360deg); }
                }
            `}</style>
            {/* Six faces */}
            {[
                { t: `translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(91,140,255,0.35))" },
                { t: `rotateY(180deg) translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(0,194,255,0.35))" },
                { t: `rotateY(90deg) translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(123,97,255,0.35))" },
                { t: `rotateY(-90deg) translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(91,140,255,0.3))" },
                { t: `rotateX(90deg) translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(91,140,255,0.2))" },
                { t: `rotateX(-90deg) translateZ(${s / 2}px)`, g: "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(0,194,255,0.25))" },
            ].map((f, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        inset: 0,
                        transform: f.t,
                        background: f.g,
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.6)",
                        borderRadius: 14,
                        boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 24px rgba(91,140,255,0.25)",
                    }}
                />
            ))}
        </div>
    );
}

function Torus({ color = "#5B8CFF", size = 80 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
                <linearGradient id={`tg-${color}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
                </linearGradient>
                <filter id="tglow">
                    <feGaussianBlur stdDeviation="2.4" />
                </filter>
            </defs>
            <ellipse
                cx="50"
                cy="50"
                rx="38"
                ry="14"
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeOpacity="0.55"
                filter="url(#tglow)"
            />
            <ellipse
                cx="50"
                cy="50"
                rx="38"
                ry="14"
                fill="none"
                stroke={`url(#tg-${color})`}
                strokeWidth="5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function Ring({ color = "#00C2FF", size = 120 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
                <linearGradient id={`rg-${color}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={`url(#rg-${color})`}
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.85"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="24s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

function Sphere({ color = "#7B61FF", size = 64 }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 28%, #FFFFFF 0%, ${color}aa 35%, ${color} 70%, #0B1221 110%)`,
                boxShadow: `0 12px 30px ${color}66, inset -4px -8px 18px rgba(11,18,33,0.35), inset 4px 4px 12px rgba(255,255,255,0.4)`,
            }}
        />
    );
}

function GlassPanel({ scale = 1 }) {
    return (
        <div
            style={{
                width: 92 * scale,
                height: 64 * scale,
                background:
                    "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(91,140,255,0.2))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: 12,
                boxShadow:
                    "0 12px 30px rgba(91,140,255,0.25), inset 0 1px 0 rgba(255,255,255,0.7)",
                transform: "rotateX(20deg) rotateY(-15deg)",
            }}
        >
            <div className="p-2 flex flex-col gap-1">
                <div className="h-1 w-10 rounded-full bg-[#5B8CFF]/40" />
                <div className="h-1 w-8 rounded-full bg-[#00C2FF]/40" />
                <div className="h-1 w-12 rounded-full bg-[#7B61FF]/40" />
            </div>
        </div>
    );
}
