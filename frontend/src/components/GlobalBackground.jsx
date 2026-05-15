import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import BackgroundAura from "./BackgroundAura";

export default function GlobalBackground() {
    // Mouse tracking setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            {/* The base gradient aura */}
            <BackgroundAura intensity={0.6} />

            {/* Base Faint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#5B8CFF10_1px,transparent_1px),linear-gradient(to_bottom,#5B8CFF10_1px,transparent_1px)] bg-[size:60px_60px]" />
            
            {/* Mouse Tracking Bright Grid */}
            <motion.div
                className="absolute inset-0 bg-[linear-gradient(to_right,#5B8CFF45_1px,transparent_1px),linear-gradient(to_bottom,#5B8CFF45_1px,transparent_1px)] bg-[size:60px_60px]"
                style={{
                    WebkitMaskImage: useMotionTemplate`radial-gradient(450px circle at ${smoothX}px ${smoothY}px, black, transparent)`,
                    maskImage: useMotionTemplate`radial-gradient(450px circle at ${smoothX}px ${smoothY}px, black, transparent)`
                }}
            />

            {/* Mouse Tracking 3D Blob */}
            <motion.div
                className="absolute left-0 top-0 w-[500px] h-[500px] mix-blend-screen opacity-50 blur-[100px] rounded-full"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle at 50% 50%, rgba(123,97,255,0.7) 0%, rgba(91,140,255,0.3) 40%, rgba(0,194,255,0.05) 70%, transparent 100%)",
                }}
            />

            {/* Ambient floating blobs */}
            <motion.div
                animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#5B8CFF]/10 rounded-full blur-[100px] mix-blend-screen"
            />
            <motion.div
                animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-[#7B61FF]/10 rounded-full blur-[100px] mix-blend-screen"
            />
        </div>
    );
}
