import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sparkle } from "@phosphor-icons/react";

const navItems = [
    { label: "Events", href: "#upcoming" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onLanding = location.pathname === "/";

    return (
        <motion.header
            data-testid="navbar"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                scrolled ? "py-3" : "py-5"
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div
                    className={`flex items-center justify-between gap-4 px-3 sm:px-5 py-2.5 rounded-2xl transition-all duration-500 ${
                        scrolled
                            ? "glass-strong shadow-[0_8px_30px_rgba(91,140,255,0.10)]"
                            : "bg-white/40 backdrop-blur-md border border-white/40"
                    }`}
                >
                    <Link
                        to="/"
                        data-testid="navbar-logo"
                        className="flex items-center gap-2 group"
                    >
                        <div className="relative">
                            <div className="size-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-[0_8px_24px_rgba(91,140,255,0.45)] group-hover:scale-110 transition-transform duration-300">
                                <Sparkle
                                    weight="fill"
                                    className="text-white size-5"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-brand-gradient blur-xl opacity-30 -z-10 group-hover:opacity-50 transition" />
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight text-[#0B1221]">
                            Lumen
                            <span className="text-gradient">.</span>
                        </span>
                    </Link>

                    {onLanding && (
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((it) => (
                                <a
                                    key={it.label}
                                    href={it.href}
                                    data-testid={`nav-${it.label.toLowerCase()}`}
                                    className="relative px-4 py-2 text-sm font-medium text-[#475569] hover:text-[#0B1221] transition-colors group"
                                >
                                    {it.label}
                                    <span className="absolute inset-x-3 bottom-1 h-px bg-brand-gradient scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                                </a>
                            ))}
                        </nav>
                    )}

                    <div className="flex items-center gap-2">
                        <Link
                            to="/dashboard"
                            data-testid="navbar-dashboard-link"
                            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-xl text-[#0B1221] hover:bg-[#F7F9FF] transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/admin"
                            data-testid="navbar-cta"
                            className="relative inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-[#0B1221] text-white hover:bg-black transition-all hover:scale-[1.03] active:scale-95"
                        >
                            <span>Get Started</span>
                            <span className="size-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]" />
                        </Link>
                        <button
                            data-testid="navbar-mobile-toggle"
                            onClick={() => setOpen((v) => !v)}
                            className="lg:hidden p-2 rounded-xl hover:bg-[#F7F9FF] transition"
                            aria-label="Toggle menu"
                        >
                            {open ? (
                                <X weight="bold" className="size-5" />
                            ) : (
                                <List weight="bold" className="size-5" />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && onLanding && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden mt-2 glass-strong rounded-2xl p-2"
                            data-testid="navbar-mobile-menu"
                        >
                            {navItems.map((it) => (
                                <a
                                    key={it.label}
                                    href={it.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[#0B1221] hover:bg-[#F7F9FF]"
                                >
                                    {it.label}
                                </a>
                            ))}
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 rounded-xl text-sm font-medium text-[#0B1221] hover:bg-[#F7F9FF]"
                            >
                                Dashboard
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
