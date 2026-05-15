import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowRight, UserCircle } from "@phosphor-icons/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import AuthModal from "./AuthModal";

const navItems = [
    { label: "Home", href: "/", to: "/", exact: true },
    { label: "Events", href: "#upcoming" },
    { label: "Gallery", href: "#gallery" },
    { label: "Admin", to: "/admin" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [imgError, setImgError] = useState(false);
    const [active, setActive] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setImgError(false);
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
            unsubscribe();
        };
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
                    className={`relative flex items-center justify-between gap-3 pl-2.5 pr-2 py-2 rounded-full transition-all duration-500 ${
                        scrolled
                            ? "bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_15px_40px_-12px_rgba(91,140,255,0.18)]"
                            : "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_-12px_rgba(91,140,255,0.12)]"
                    }`}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        data-testid="navbar-logo"
                        className="flex items-center gap-3 group pr-3"
                    >
                        <div className="relative">
                            <div className="size-9 rounded-[10px] bg-gradient-to-br from-[#5B8CFF] to-[#7B61FF] flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(91,140,255,0.5)] group-hover:scale-105 transition-transform duration-300">
                                <span className="font-display font-black text-white text-lg leading-none">
                                    E
                                </span>
                            </div>
                            <div className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-[#5B8CFF] to-[#7B61FF] blur-md opacity-40 -z-10 group-hover:opacity-60 transition" />
                        </div>
                        <div className="leading-none">
                            <div className="font-display font-black text-[15px] tracking-tight text-[#0B1221]">
                                Eventra
                            </div>
                            <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#475569] mt-0.5">
                                Network
                            </div>
                        </div>
                    </Link>

                    {/* Nav pills (desktop) */}
                    <nav className="hidden lg:flex items-center gap-1 relative">
                        {navItems.filter(it => it.label !== "Admin" || (user && user.email === "ontimittatharun2002@gmail.com")).map((it) => {
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
                                    className={`relative px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
                                        isActive
                                            ? "text-[#0B1221]"
                                            : "text-[#64748B] hover:text-[#0B1221]"
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
                        {user ? (
                            <Link
                                to="/dashboard"
                                data-testid="navbar-profile"
                                className="hidden sm:inline-flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B1221] hover:bg-white transition-all shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]"
                            >
                                {user.photoURL && !imgError ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="size-6 rounded-full object-cover shrink-0"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <UserCircle weight="fill" className="size-6 text-[#94A3B8] shrink-0" />
                                )}
                                <span className="max-w-[100px] truncate">
                                    {user.displayName || user.email.split("@")[0]}
                                </span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => setAuthOpen(true)}
                                data-testid="navbar-login"
                                className="hidden sm:inline-flex items-center text-[13px] font-bold px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 text-[#0B1221] hover:bg-white transition-all shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]"
                            >
                                Log in
                            </button>
                        )}
                        <a
                            href="/#pricing"
                            data-testid="navbar-cta"
                            className="relative group inline-flex items-center gap-1.5 text-[13px] font-bold pl-5 pr-4 py-2.5 rounded-full text-white bg-gradient-to-r from-[#5B8CFF] via-[#7B61FF] to-[#7B61FF] hover:scale-[1.03] active:scale-95 transition-transform shadow-[0_10px_20px_-8px_rgba(123,97,255,0.5)]"
                        >
                            <span>Join Eventra</span>
                            <ArrowRight
                                weight="bold"
                                className="size-3.5 group-hover:translate-x-0.5 transition"
                            />
                            <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF] blur-md opacity-0 group-hover:opacity-40 transition" />
                        </a>
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
                            {navItems.filter(it => it.label !== "Admin" || (user && user.email === "ontimittatharun2002@gmail.com")).map((it) => {
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

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </motion.header>
    );
}
