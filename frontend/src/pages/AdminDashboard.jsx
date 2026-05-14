import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    SquaresFour,
    CalendarBlank,
    Users,
    CurrencyDollar,
    UploadSimple,
    Gear,
    SignOut,
    Plus,
    MagnifyingGlass,
    DotsThreeVertical,
    ArrowUpRight,
} from "@phosphor-icons/react";
import { upcomingEvents } from "../data/events";

const navItems = [
    { id: "overview", icon: SquaresFour, label: "Overview" },
    { id: "events", icon: CalendarBlank, label: "Events" },
    { id: "users", icon: Users, label: "Users" },
    { id: "revenue", icon: CurrencyDollar, label: "Revenue" },
    { id: "uploads", icon: UploadSimple, label: "Uploads" },
    { id: "settings", icon: Gear, label: "Settings" },
];

export default function AdminDashboard() {
    const [active, setActive] = useState("overview");
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
                <Link
                    to="/"
                    className="mt-4 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5"
                    data-testid="admin-signout"
                >
                    <SignOut weight="duotone" className="size-5" />
                    Back to site
                </Link>
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
                        <div className="size-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-8 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                            Dashboard
                        </div>
                        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[#0B1221] mt-1">
                            Operations Overview
                        </h1>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Revenue",
                                value: "$284.5k",
                                delta: "+18.4%",
                                up: true,
                            },
                            {
                                label: "Tickets Sold",
                                value: "12,840",
                                delta: "+9.2%",
                                up: true,
                            },
                            {
                                label: "Active Users",
                                value: "8,492",
                                delta: "+12.0%",
                                up: true,
                            },
                            {
                                label: "Conversion",
                                value: "4.62%",
                                delta: "-0.3%",
                                up: false,
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                data-testid={`admin-stat-${i}`}
                                className="p-5 rounded-2xl bg-white border border-[#EEF4FF] hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.3)] transition-all"
                            >
                                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569]">
                                    {s.label}
                                </div>
                                <div className="mt-2 font-display font-black text-3xl tracking-tighter text-[#0B1221]">
                                    {s.value}
                                </div>
                                <div
                                    className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                                        s.up ? "text-emerald-600" : "text-rose-500"
                                    }`}
                                >
                                    {s.delta}
                                    <ArrowUpRight
                                        weight="bold"
                                        className={`size-3 ${s.up ? "" : "rotate-90"}`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts + Top events */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                        Revenue
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-[#0B1221] mt-1">
                                        Last 30 days
                                    </h3>
                                </div>
                                <div className="text-xs px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#5B8CFF] font-semibold">
                                    Razorpay
                                </div>
                            </div>
                            <RevenueChart />
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                            <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                Top Events
                            </div>
                            <h3 className="font-display font-bold text-xl text-[#0B1221] mt-1 mb-4">
                                By revenue
                            </h3>
                            <ul className="space-y-4">
                                {upcomingEvents.slice(0, 4).map((e, i) => (
                                    <li
                                        key={e.id}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="size-10 rounded-xl overflow-hidden shrink-0">
                                            <img
                                                src={e.image}
                                                alt={e.title}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-semibold text-sm text-[#0B1221] truncate">
                                                {e.title}
                                            </div>
                                            <div className="text-xs text-[#475569]">
                                                {(2400 - i * 360).toLocaleString()} tickets
                                            </div>
                                        </div>
                                        <div className="font-display font-bold text-sm text-[#0B1221]">
                                            ${(48 - i * 7).toFixed(1)}k
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Events table */}
                    <div className="p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                                    Manage
                                </div>
                                <h3 className="font-display font-bold text-xl text-[#0B1221] mt-1">
                                    All Events
                                </h3>
                            </div>
                            <button className="text-sm font-semibold text-[#5B8CFF] hover:underline">
                                Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table
                                className="w-full"
                                data-testid="admin-events-table"
                            >
                                <thead>
                                    <tr className="text-left text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569] border-b border-[#EEF4FF]">
                                        <th className="py-3 pr-4">Event</th>
                                        <th className="py-3 pr-4">Date</th>
                                        <th className="py-3 pr-4">Location</th>
                                        <th className="py-3 pr-4">Status</th>
                                        <th className="py-3 pr-4">Sold</th>
                                        <th className="py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingEvents.map((e, i) => (
                                        <tr
                                            key={e.id}
                                            className="border-b border-[#EEF4FF] hover:bg-[#F7F9FF] transition-colors"
                                            data-testid={`admin-row-${e.id}`}
                                        >
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-xl overflow-hidden shrink-0">
                                                        <img
                                                            src={e.image}
                                                            alt=""
                                                            className="size-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-sm text-[#0B1221]">
                                                            {e.title}
                                                        </div>
                                                        <div className="text-xs text-[#475569]">
                                                            {e.category}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4 text-sm text-[#475569]">
                                                {e.dateLabel}
                                            </td>
                                            <td className="py-4 pr-4 text-sm text-[#475569]">
                                                {e.location}
                                            </td>
                                            <td className="py-4 pr-4">
                                                <span
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                        i % 2 === 0
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-amber-50 text-amber-700"
                                                    }`}
                                                >
                                                    {i % 2 === 0 ? "Live" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-4 text-sm text-[#0B1221] font-semibold">
                                                {72 - i * 14}%
                                            </td>
                                            <td className="py-4">
                                                <button className="size-8 rounded-lg hover:bg-[#EEF4FF] flex items-center justify-center text-[#475569]">
                                                    <DotsThreeVertical
                                                        weight="bold"
                                                        className="size-5"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RevenueChart() {
    // Smooth area chart with sparkline glow
    const data = [
        12, 18, 14, 22, 28, 24, 32, 36, 30, 40, 44, 38, 48, 52, 50, 58, 62, 60,
        68, 72, 66, 76, 84, 80, 88, 92, 86, 100, 96, 108,
    ];
    const max = Math.max(...data);
    const w = 600;
    const h = 200;
    const step = w / (data.length - 1);
    const pts = data.map((v, i) => [i * step, h - (v / max) * (h - 20) - 10]);

    const path = pts
        .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
        .join(" ");
    const fill = `${path} L ${w} ${h} L 0 ${h} Z`;

    return (
        <div data-testid="revenue-chart">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
                <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#5B8CFF" />
                        <stop offset="50%" stopColor="#7B61FF" />
                        <stop offset="100%" stopColor="#00C2FF" />
                    </linearGradient>
                </defs>
                <path d={fill} fill="url(#area)" />
                <path
                    d={path}
                    fill="none"
                    stroke="url(#line)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {pts.map((p, i) =>
                    i === pts.length - 1 ? (
                        <circle
                            key={i}
                            cx={p[0]}
                            cy={p[1]}
                            r={5}
                            fill="white"
                            stroke="#7B61FF"
                            strokeWidth="2.5"
                        />
                    ) : null,
                )}
            </svg>
        </div>
    );
}
