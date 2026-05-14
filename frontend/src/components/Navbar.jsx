import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowRight } from "@phosphor-icons/react";

const navItems = [
    { label: "Home", href: "/", to: "/", exact: true },
    { label: "Events", href: "#upcoming" },
    { label: "Gallery", href: "#gallery" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Admin", to: "/admin" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (location.pathname === "/dashboard") setActive("Dashboard");
        else if (location.pathname === "/admin") setActive("Admin");
        else setActive("Home");
    }, [location.pathname]);

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
                    className={`relative flex items-center justify-between gap-3 pl-3 pr-2 py-2 rounded-full transition-all duration-500 ${
                        scrolled
                            ? "bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_-12px_rgba(91,140,255,0.18)]"
                            : "bg-white/60 backdrop-blur-md border border-white/50 shadow-[0_8px_24px_-12px_rgba(91,140,255,0.12)]"
                    }`}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        data-testid="navbar-logo"
                        className="flex items-center gap-2.5 group pr-2"
                    >
                        <div className="relative">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-[#5B8CFF] to-[#7B61FF] flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(91,140,255,0.55)] group-hover:scale-110 transition-transform duration-300">
                                <span className="font-display font-black text-white text-xl leading-none">
                                    L
                                </span>
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#5B8CFF] to-[#7B61FF] blur-xl opacity-30 -z-10 group-hover:opacity-50 transition" />
                        </div>
                        <div className="leading-tight">
                            <div className="font-display font-black text-base tracking-tight text-[#0B1221]">
                                Lumen
                            </div>
                            <div className="text-[9px] uppercase tracking-[0.28em] font-semibold text-[#475569] -mt-0.5">
                                Network
                            </div>
                        </div>
                    </Link>

                    {/* Nav pills (desktop) */}
                    <nav className="hidden lg:flex items-center gap-1 relative">
                        {navItems.map((it) => {
                            const isActive = active === it.label;
                            const Comp = it.to ? Link : "a";
                            const props = it.to
                                ? { to: it.to }
                                : { href: it.href };
                            return (
                                <Comp
                                    key={it.label}
                                    {...props}
                                    data-testid={`nav-${it.label.toLowerCase()}`}
                                    onClick={() =>
                                        !it.to && setActive(it.label)
                                    }
                                    onMouseEnter={() => setActive(it.label)}
                                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                                        isActive
                                            ? "text-[#0B1221]"
                                            : "text-[#475569] hover:text-[#0B1221]"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 32,
                                            }}
                                            className="absolute inset-0 rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(91,140,255,0.45),inset_0_0_0_1px_rgba(91,140,255,0.18)]"
                                        />
                                    )}
                                    <span className="relative">{it.label}</span>
                                </Comp>
                            );
                        })}
                    </nav>

                    {/* Right CTAs */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/dashboard"
                            data-testid="navbar-login"
                            className="hidden sm:inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-full text-[#0B1221] hover:bg-white transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/admin"
                            data-testid="navbar-cta"
                            className="relative group inline-flex items-center gap-1.5 text-sm font-semibold pl-5 pr-4 py-2.5 rounded-full text-white bg-gradient-to-r from-[#5B8CFF] via-[#7B61FF] to-[#7B61FF] hover:scale-[1.03] active:scale-95 transition-transform shadow-[0_10px_30px_-10px_rgba(123,97,255,0.55)]"
                        >
                            <span>Join Lumen</span>
                            <ArrowRight
                                weight="bold"
                                className="size-3.5 group-hover:translate-x-0.5 transition"
                            />
                            <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF] blur-xl opacity-0 group-hover:opacity-60 transition" />
                        </Link>
                        <button
                            data-testid="navbar-mobile-toggle"
                            onClick={() => setOpen((v) => !v)}
                            className="lg:hidden size-10 rounded-full hover:bg-white transition flex items-center justify-center"
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
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden mt-2 p-2 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-20px_rgba(91,140,255,0.3)]"
                            data-testid="navbar-mobile-menu"
                        >
                            {navItems.map((it) => {
                                const Comp = it.to ? Link : "a";
                                const props = it.to
                                    ? { to: it.to }
                                    : { href: it.href };
                                return (
                                    <Comp
                                        key={it.label}
                                        {...props}
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-3 rounded-2xl text-sm font-semibold text-[#0B1221] hover:bg-[#F7F9FF]"
                                    >
                                        {it.label}
                                    </Comp>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
