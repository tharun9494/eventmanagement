import { motion } from "framer-motion";
import { brandsRow } from "../data/events";

export default function BrandsMarquee() {
    return (
        <section
            data-testid="brands-marquee"
            className="relative py-12 sm:py-16 border-y border-[#EEF4FF] bg-white"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-6 text-center">
                <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#475569]">
                    Trusted by world-class teams
                </p>
            </div>
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
                <motion.div
                    className="flex items-center gap-16 marquee"
                    style={{ width: "max-content" }}
                >
                    {[...brandsRow, ...brandsRow].map((b, i) => (
                        <span
                            key={`${b}-${i}`}
                            className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#0B1221]/30 hover:text-[#0B1221] transition-colors duration-500 whitespace-nowrap"
                        >
                            {b}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
