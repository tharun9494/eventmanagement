import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarBlank, Play } from "@phosphor-icons/react";
import { pastEvents } from "../data/events";

const heightMap = {
    short: "h-56 sm:h-64",
    medium: "h-72 sm:h-80",
    tall: "h-80 sm:h-[26rem]",
};

export default function PastEventsGallery() {
    const [active, setActive] = useState(null);

    return (
        <section
            id="gallery"
            data-testid="past-events"
            className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-[#F7F9FF] to-white"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]"
                    >
                        Past Editions
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-3 font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-6xl"
                    >
                        Moments we made
                        <span className="text-gradient"> together.</span>
                    </motion.h2>
                </div>

                {/* Masonry via CSS columns — lightweight */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                    {pastEvents.map((p, i) => (
                        <motion.button
                            key={p.id}
                            data-testid={`gallery-item-${p.id}`}
                            onClick={() => setActive(p)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`group mb-6 w-full break-inside-avoid relative overflow-hidden rounded-2xl ${heightMap[p.height]} text-left cursor-pointer`}
                        >
                            <img
                                src={p.image}
                                alt={p.title}
                                loading="lazy"
                                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl" />

                            {/* Cyan glow on hover */}
                            <div className="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#00C2FF]/30 blur-2xl" />

                            {/* Play preview indicator */}
                            <div className="absolute top-4 right-4 size-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-500">
                                <Play weight="fill" className="size-4" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-80">
                                    {p.date}
                                </div>
                                <div className="font-display font-bold text-xl tracking-tight mt-1">
                                    {p.title}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs mt-1.5 opacity-80">
                                    <MapPin
                                        weight="duotone"
                                        className="size-3.5"
                                    />
                                    {p.location}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1221]/85 backdrop-blur-xl"
                        onClick={() => setActive(null)}
                        data-testid="gallery-lightbox"
                    >
                        <button
                            className="absolute top-6 right-6 size-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition"
                            onClick={() => setActive(null)}
                            data-testid="gallery-lightbox-close"
                        >
                            <X weight="bold" className="size-5 text-[#0B1221]" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative max-w-5xl w-full max-h-[85vh] rounded-3xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={active.image}
                                alt={active.title}
                                className="w-full max-h-[85vh] object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/85 to-transparent text-white">
                                <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                                    {active.date}
                                </div>
                                <div className="font-display font-black text-3xl sm:text-4xl tracking-tighter mt-2">
                                    {active.title}
                                </div>
                                <div className="mt-2 flex items-center gap-4 text-sm opacity-90">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin
                                            weight="duotone"
                                            className="size-4"
                                        />
                                        {active.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarBlank
                                            weight="duotone"
                                            className="size-4"
                                        />
                                        {active.date}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
