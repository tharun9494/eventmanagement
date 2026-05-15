import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    SquaresFour,
    CalendarBlank,
    Users as UsersIcon,
    CurrencyDollar,
    UploadSimple,
    Gear,
    SignOut,
    Plus,
    MagnifyingGlass,
} from "@phosphor-icons/react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

// Import tabs
import Overview from "./Overview";
import Events from "./Events";
import Users from "./Users";
import Revenue from "./Revenue";
import Uploads from "./Uploads";
import Settings from "./Settings";

const navItems = [
    { id: "overview", icon: SquaresFour, label: "Overview" },
    { id: "events", icon: CalendarBlank, label: "Events" },
    { id: "users", icon: UsersIcon, label: "Users" },
    { id: "revenue", icon: CurrencyDollar, label: "Revenue" },
    { id: "uploads", icon: UploadSimple, label: "Uploads" },
    { id: "settings", icon: Gear, label: "Settings" },
];

export default function AdminDashboard() {
    const [active, setActive] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user || user.email !== "ontimittatharun2002@gmail.com") {
                navigate("/");
            } else {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (isLoading) return;
        // Listen to all events
        const unsubEvents = onSnapshot(collection(db, "events"), (snap) => {
            setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        
        // Listen to all users
        const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
            setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubEvents();
            unsubUsers();
        };
    }, [isLoading]);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/");
    };

    const renderContent = () => {
        switch (active) {
            case "overview": return <Overview events={events} users={users} />;
            case "events": return <Events events={events} />;
            case "users": return <Users users={users} />;
            case "revenue": return <Revenue />;
            case "uploads": return <Uploads />;
            case "settings": return <Settings />;
            default: return <Overview events={events} users={users} />;
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[#F7F9FF] flex items-center justify-center font-display font-bold text-[#0B1221]">Verifying access...</div>;
    }

    return (
        <div className="min-h-screen bg-[#F7F9FF] flex">
            {/* Dark sidebar */}
            <aside
                data-testid="admin-sidebar"
                className="hidden lg:flex w-72 shrink-0 flex-col p-5 bg-[#0B1221] text-white sticky top-0 h-screen"
            >
                <Link to="/" className="flex items-center gap-2 px-2 py-1">
                    <div className="size-9 rounded-xl bg-brand-gradient flex items-center justify-center">
                        <SquaresFour
                            weight="fill"
                            className="text-white size-5"
                        />
                    </div>
                    <span className="font-display font-bold text-lg">
                        Lumen <span className="text-[#00C2FF]">·</span> Admin
                    </span>
                </Link>

                <nav className="mt-8 space-y-1 flex-1">
                    {navItems.map((it) => (
                        <button
                            key={it.id}
                            data-testid={`admin-nav-${it.id}`}
                            onClick={() => setActive(it.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                active === it.id
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <it.icon
                                weight={active === it.id ? "fill" : "duotone"}
                                className="size-5"
                            />
                            {it.label}
                            {active === it.id && (
                                <span className="ml-auto size-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_10px_#00C2FF]" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#00C2FF]">
                        System Status
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="size-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e]" />
                        All systems normal
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5"
                    data-testid="admin-signout"
                >
                    <SignOut weight="duotone" className="size-5" />
                    Sign out
                </button>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Topbar */}
                <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-[#EEF4FF]">
                    <div className="px-4 sm:px-8 py-4 flex items-center gap-4">
                        <div className="lg:hidden">
                            <Link
                                to="/"
                                className="font-display font-bold text-[#0B1221]"
                            >
                                Lumen Admin
                            </Link>
                        </div>
                        <div className="relative flex-1 max-w-md">
                            <MagnifyingGlass
                                weight="duotone"
                                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#475569]"
                            />
                            <input
                                data-testid="admin-search"
                                type="text"
                                placeholder="Search events, users, transactions..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F7F9FF] border border-transparent focus:border-[#5B8CFF]/30 focus:bg-white focus:outline-none text-sm transition"
                            />
                        </div>
                        <button
                            data-testid="admin-new-event"
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1221] text-white text-sm font-semibold hover:bg-black hover:scale-[1.02] active:scale-95 transition"
                        >
                            <Plus weight="bold" className="size-4" />
                            New Event
                        </button>
                        <div className="size-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold shrink-0">
                            A
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
