import { motion } from "framer-motion";
import { ArrowUpRight, DotsThreeVertical } from "@phosphor-icons/react";

export default function Overview({ events = [], users = [] }) {
    // Basic aggregations
    const totalRevenue = events.reduce((acc, evt) => acc + (evt.price ? parseInt(evt.price.toString().replace('$', '')) || 0 : 0) * (evt.sold || 0), 0);
    const totalTickets = events.reduce((acc, evt) => acc + (evt.sold || 0), 0);

    return (
        <div className="space-y-6">
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
                    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, delta: "+18.4%", up: true },
                    { label: "Tickets Sold", value: totalTickets.toLocaleString(), delta: "+9.2%", up: true },
                    { label: "Active Users", value: users.length.toLocaleString(), delta: "+12.0%", up: true },
                    { label: "Live Events", value: events.length.toString(), delta: "+2", up: true },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="p-5 rounded-2xl bg-white border border-[#EEF4FF] hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.3)] transition-all"
                    >
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569]">
                            {s.label}
                        </div>
                        <div className="mt-2 font-display font-black text-3xl tracking-tighter text-[#0B1221]">
                            {s.value}
                        </div>
                        <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                            {s.delta}
                            <ArrowUpRight weight="bold" className={`size-3 ${s.up ? "" : "rotate-90"}`} />
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
                        By attendance
                    </h3>
                    {events.length > 0 ? (
                        <ul className="space-y-4">
                            {events.slice(0, 4).map((e, i) => (
                                <li key={e.id} className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl overflow-hidden shrink-0">
                                        <img src={e.image} alt={e.title} className="size-full object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-sm text-[#0B1221] truncate">
                                            {e.title}
                                        </div>
                                        <div className="text-xs text-[#475569]">
                                            {e.sold || 0} tickets
                                        </div>
                                    </div>
                                    <div className="font-display font-bold text-sm text-[#0B1221]">
                                        ${((e.price ? parseInt(e.price.toString().replace('$', '')) : 0) * (e.sold || 0)).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-sm text-[#475569]">No events found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function RevenueChart() {
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
