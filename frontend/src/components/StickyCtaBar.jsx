import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Ticket } from "@phosphor-icons/react";

/**
 * Sticky bottom CTA — appears after user scrolls past hero.
 * Dismissable per session.
 */
export default function StickyCtaBar() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (dismissed) return;
            const past = window.scrollY > window.innerHeight * 0.9;
            const nearBottom =
                window.scrollY + window.innerHeight >
                document.documentElement.scrollHeight - 600;
            setShow(past && !nearBottom);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [dismissed]);

    return (
        <AnimatePresence>
            {show && !dismissed && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    data-testid="sticky-cta"
                    className="fixed bottom-4 inset-x-3 sm:left-1/2 sm:-translate-x-1/2 sm:inset-x-auto sm:bottom-6 z-50 sm:w-[min(640px,calc(100%-32px))]"
                >
                    <div className="glass-strong rounded-2xl pl-4 pr-2 py-2 flex items-center gap-3 shadow-[0_20px_60px_-20px_rgba(11,18,33,0.35)]">
                        <div className="size-9 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                            <Ticket
                                weight="duotone"
                                className="text-white size-5"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[13px] text-[#0B1221] truncate">
                                Aurora Tech Summit · 72% sold
                            </div>
                            <div className="text-[11px] text-[#475569] truncate">
                                Lisbon · Mar 14, 2027 · From $249
                            </div>
                        </div>
                        <a
                            href="#upcoming"
                            data-testid="sticky-cta-register"
                            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1221] text-white text-xs font-semibold hover:scale-[1.03] active:scale-95 transition shrink-0"
                        >
                            Register
                            <ArrowUpRight
                                weight="bold"
                                className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                            />
                        </a>
                        <button
                            onClick={() => setDismissed(true)}
                            aria-label="Dismiss"
                            data-testid="sticky-cta-close"
                            className="size-8 rounded-lg hover:bg-[#F7F9FF] flex items-center justify-center text-[#475569] shrink-0"
                        >
                            <X weight="bold" className="size-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
