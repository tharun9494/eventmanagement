import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    House,
    Ticket,
    BellRinging,
    User,
    Bookmark,
    ChartBar,
    SignOut,
    MagnifyingGlass,
    Sparkle,
    CalendarBlank,
    MapPin,
    TrendUp,
} from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import { upcomingEvents } from "../data/events";

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
    return (
        <div className="min-h-screen bg-[#F7F9FF]">
            <Navbar />
            <div className="pt-28 pb-16 mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <aside
                        data-testid="user-sidebar"
                        className="lg:col-span-3 glass-strong rounded-3xl p-4 h-fit lg:sticky lg:top-28"
                    >
                        <div className="px-3 py-4 flex items-center gap-3">
                            <div className="size-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md">
                                <User
                                    weight="fill"
                                    className="text-white size-6"
                                />
                            </div>
                            <div>
                                <div className="font-display font-bold text-[#0B1221]">
                                    Avery Quinn
                                </div>
                                <div className="text-xs text-[#475569]">
                                    Premium Member
                                </div>
                            </div>
                        </div>
                        <nav className="mt-2 space-y-1">
                            {sidebarItems.map((it) => (
                                <button
                                    key={it.id}
                                    data-testid={`sidebar-${it.id}`}
                                    onClick={() => setActive(it.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        active === it.id
                                            ? "bg-[#0B1221] text-white shadow-md"
                                            : "text-[#475569] hover:bg-white hover:text-[#0B1221]"
                                    }`}
                                >
                                    <it.icon
                                        weight={
                                            active === it.id
                                                ? "fill"
                                                : "duotone"
                                        }
                                        className="size-5"
                                    />
                                    {it.label}
                                </button>
                            ))}
                            <Link
                                to="/"
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#475569] hover:bg-white hover:text-[#0B1221] transition mt-4"
                                data-testid="sidebar-signout"
                            >
                                <SignOut weight="duotone" className="size-5" />
                                Sign out
                            </Link>
                        </nav>
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
                                    Welcome back
                                </div>
                                <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[#0B1221] mt-1">
                                    Hi, Avery 👋
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
                                    placeholder="Search events..."
                                    className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#EEF4FF] focus:border-[#5B8CFF]/50 focus:outline-none text-sm w-full sm:w-72 transition"
                                />
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "Tickets",
                                    value: "12",
                                    sub: "+3 this month",
                                    icon: Ticket,
                                },
                                {
                                    label: "Saved",
                                    value: "28",
                                    sub: "+5 new",
                                    icon: Bookmark,
                                },
                                {
                                    label: "Attended",
                                    value: "47",
                                    sub: "vs 39 LY",
                                    icon: Sparkle,
                                },
                                {
                                    label: "Points",
                                    value: "1.2k",
                                    sub: "Gold tier",
                                    icon: TrendUp,
                                },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    data-testid={`dashboard-stat-${s.label.toLowerCase()}`}
                                    className="relative p-5 rounded-2xl bg-white border border-[#EEF4FF] hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.35)] transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="size-10 rounded-xl bg-[#F7F9FF] flex items-center justify-center text-[#5B8CFF]">
                                            <s.icon
                                                weight="duotone"
                                                className="size-5"
                                            />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569]">
                                            {s.label}
                                        </span>
                                    </div>
                                    <div className="mt-3 font-display font-black text-3xl tracking-tighter text-[#0B1221]">
                                        {s.value}
                                    </div>
                                    <div className="mt-1 text-xs text-[#475569]">
                                        {s.sub}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Activity chart */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#EEF4FF]"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                            Activity
                                        </div>
                                        <h3 className="font-display font-bold text-xl text-[#0B1221] mt-1">
                                            Events attended · last 12 months
                                        </h3>
                                    </div>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#5B8CFF] font-semibold">
                                        +28%
                                    </span>
                                </div>
                                <ActivityChart />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="p-6 rounded-3xl bg-[#0B1221] text-white relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 size-56 rounded-full bg-[#7B61FF]/40 blur-3xl" />
                                <div className="absolute -bottom-12 -left-12 size-56 rounded-full bg-[#00C2FF]/30 blur-3xl" />
                                <div className="relative">
                                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                                        Upcoming
                                    </div>
                                    <div className="font-display font-bold text-xl mt-1">
                                        Your next event
                                    </div>
                                    <div className="mt-6 font-display font-black text-2xl tracking-tighter">
                                        Aurora Tech Summit 2027
                                    </div>
                                    <div className="mt-2 text-sm text-white/70 flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarBlank
                                                weight="duotone"
                                                className="size-4"
                                            />
                                            Mar 14, 2027
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin
                                                weight="duotone"
                                                className="size-4"
                                            />
                                            Lisbon
                                        </span>
                                    </div>
                                    <button
                                        data-testid="dashboard-view-ticket"
                                        className="mt-6 w-full px-4 py-3 rounded-xl bg-white text-[#0B1221] font-semibold text-sm hover:scale-[1.02] active:scale-95 transition"
                                    >
                                        View Ticket
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Saved events */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display font-bold text-2xl text-[#0B1221]">
                                    Saved Events
                                </h2>
                                <Link
                                    to="/"
                                    className="text-sm font-semibold text-[#5B8CFF] hover:underline"
                                >
                                    Browse all
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {upcomingEvents.slice(0, 3).map((e) => (
                                    <div
                                        key={e.id}
                                        data-testid={`saved-${e.id}`}
                                        className="group rounded-2xl bg-white border border-[#EEF4FF] overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.35)] transition-all"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={e.image}
                                                alt={e.title}
                                                loading="lazy"
                                                className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B8CFF]">
                                                {e.category}
                                            </div>
                                            <div className="font-display font-bold text-[#0B1221] mt-1">
                                                {e.title}
                                            </div>
                                            <div className="mt-1 text-xs text-[#475569] flex items-center gap-3">
                                                <span>{e.dateLabel}</span>
                                                <span>·</span>
                                                <span>{e.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function ActivityChart() {
    // Pure SVG bar chart — featherweight, animated
    const data = [3, 5, 4, 6, 5, 7, 4, 8, 6, 9, 7, 11];
    const labels = [
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D",
    ];
    const max = Math.max(...data);
    return (
        <div className="w-full" data-testid="activity-chart">
            <svg viewBox="0 0 600 180" className="w-full h-44">
                <defs>
                    <linearGradient id="bargrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B61FF" />
                        <stop offset="100%" stopColor="#5B8CFF" />
                    </linearGradient>
                </defs>
                {data.map((v, i) => {
                    const h = (v / max) * 140;
                    const x = i * 48 + 16;
                    return (
                        <g key={i}>
                            <rect
                                x={x}
                                y={160 - h}
                                width={28}
                                height={h}
                                rx={8}
                                fill="url(#bargrad)"
                                opacity={0.9}
                            >
                                <animate
                                    attributeName="height"
                                    from="0"
                                    to={h}
                                    dur="0.9s"
                                    fill="freeze"
                                    begin={`${i * 0.04}s`}
                                />
                                <animate
                                    attributeName="y"
                                    from="160"
                                    to={160 - h}
                                    dur="0.9s"
                                    fill="freeze"
                                    begin={`${i * 0.04}s`}
                                />
                            </rect>
                            <text
                                x={x + 14}
                                y={176}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#475569"
                                fontWeight="600"
                            >
                                {labels[i]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
