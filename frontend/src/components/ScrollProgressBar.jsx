import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });
    return (
        <motion.div
            data-testid="scroll-progress"
            style={{ scaleX, transformOrigin: "0% 50%" }}
            className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-[#5B8CFF] via-[#7B61FF] to-[#00C2FF] origin-left"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#5B8CFF] via-[#7B61FF] to-[#00C2FF] blur-md opacity-70" />
        </motion.div>
    );
}
