import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    House,
    Ticket,
    BellRinging,
    User,
    Bookmark,
    ChartBar,
    SignOut,
    MagnifyingGlass,
} from "@phosphor-icons/react";
import Navbar from "../../components/Navbar";
import { db, auth } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

// Import new separated components
import Overview from "./Overview";
import SavedEvents from "./SavedEvents";
import MyTickets from "./MyTickets";
import Notifications from "./Notifications";
import Analytics from "./Analytics";
import Profile from "./Profile";

const sidebarItems = [
    { id: "overview", icon: House, label: "Overview" },
    { id: "saved", icon: Bookmark, label: "Saved Events" },
    { id: "tickets", icon: Ticket, label: "My Tickets" },
    { id: "notifications", icon: BellRinging, label: "Notifications" },
    { id: "analytics", icon: ChartBar, label: "Analytics" },
    { id: "profile", icon: User, label: "Profile" },
];

export default function UserDashboard() {
    const [active, setActive] = useState("overview");
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const snap = await getDocs(collection(db, "events"));
            setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!user) return;
        
        const unsubSaved = onSnapshot(collection(db, "users", user.uid, "savedEvents"), (snap) => {
            setSavedEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        const unsubTickets = onSnapshot(collection(db, "users", user.uid, "tickets"), (snap) => {
            setTickets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        const unsubNotifs = onSnapshot(collection(db, "users", user.uid, "notifications"), (snap) => {
            setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => {
            unsubSaved();
            unsubTickets();
            unsubNotifs();
        };
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const renderContent = () => {
        switch (active) {
            case "overview":
                return <Overview user={user} setActive={setActive} events={events} savedEvents={savedEvents} tickets={tickets} />;
            case "saved":
                return <SavedEvents events={savedEvents} />;
            case "tickets":
                return <MyTickets tickets={tickets} />;
            case "notifications":
                return <Notifications notifications={notifications} />;
            case "analytics":
                return <Analytics tickets={tickets} />;
            case "profile":
                return <Profile user={user} />;
            default:
                return <Overview user={user} setActive={setActive} events={events} savedEvents={savedEvents} tickets={tickets} />;
        }
    };

    const activeLabel = sidebarItems.find(i => i.id === active)?.label || "Dashboard";
    const headerTitle = active === "overview" 
        ? `Hi, ${user?.displayName?.split(" ")[0] || (user?.email ? user.email.split("@")[0] : "There")} 👋` 
        : activeLabel;

    return (
        <div className="min-h-screen bg-[#F7F9FF]">
            <Navbar />
            <div className="pt-28 pb-16 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar / Mobile Nav */}
                    <aside
                        data-testid="user-sidebar"
                        className="lg:col-span-3 lg:sticky lg:top-28 z-10"
                    >
                        <div className="glass-strong rounded-3xl p-4 h-fit">
                            <div className="px-3 py-2 lg:py-4 flex items-center gap-3">
                                <div className="size-10 lg:size-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shrink-0">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Avatar" className="size-full rounded-2xl object-cover" />
                                    ) : (
                                        <User weight="fill" className="text-white size-5 lg:size-6" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-display font-bold text-sm lg:text-base text-[#0B1221] truncate">
                                        {user?.displayName || (user?.email ? user.email.split("@")[0] : "Eventra Member")}
                                    </div>
                                    <div className="text-[10px] lg:text-xs text-[#475569] truncate">
                                        Premium Member
                                    </div>
                                </div>
                            </div>
                            <nav className="mt-4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1 pb-2 lg:pb-0 hide-scrollbar">
                                {sidebarItems.map((it) => (
                                    <button
                                        key={it.id}
                                        data-testid={`sidebar-${it.id}`}
                                        onClick={() => setActive(it.id)}
                                        className={`shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-medium transition-all ${
                                            active === it.id
                                                ? "bg-[#0B1221] text-white shadow-md"
                                                : "bg-[#F7F9FF] lg:bg-transparent text-[#475569] hover:bg-white hover:text-[#0B1221]"
                                        }`}
                                    >
                                        <it.icon
                                            weight={active === it.id ? "fill" : "duotone"}
                                            className="size-4 lg:size-5 shrink-0"
                                        />
                                        <span className="whitespace-nowrap">{it.label}</span>
                                    </button>
                                ))}
                                <button
                                    onClick={handleSignOut}
                                    className="shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-medium bg-red-50 lg:bg-transparent text-red-600 lg:text-[#475569] lg:hover:bg-white lg:hover:text-[#0B1221] transition lg:mt-4"
                                    data-testid="sidebar-signout"
                                >
                                    <SignOut weight="duotone" className="size-4 lg:size-5 shrink-0" />
                                    <span className="whitespace-nowrap">Sign out</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="lg:col-span-9 space-y-6">
                        {/* Topbar */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center justify-between gap-4"
                        >
                            <div>
                                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                    {active === "overview" ? "Welcome back" : "Dashboard"}
                                </div>
                                <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[#0B1221] mt-1">
                                    {headerTitle}
                                </h1>
                            </div>
                            <div className="relative">
                                <MagnifyingGlass
                                    weight="duotone"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#475569]"
                                />
                                <input
                                    data-testid="dashboard-search"
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#EEF4FF] focus:border-[#5B8CFF]/50 focus:outline-none text-sm w-full sm:w-64 transition shadow-sm"
                                />
                            </div>
                        </motion.div>

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
                    </main>
                </div>
            </div>
        </div>
    );
}
