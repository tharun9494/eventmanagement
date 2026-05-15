import { motion } from "framer-motion";
import { Ticket, Bookmark, Sparkle, TrendUp, CalendarBlank, MapPin } from "@phosphor-icons/react";
import ActivityChart from "./ActivityChart";
import EventCard from "./EventCard";

export default function Overview({ user, setActive, events, savedEvents, tickets }) {
    const nextEvent = tickets && tickets.length > 0 ? tickets[0] : null;

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Tickets", value: tickets?.length || 0, sub: "Total purchased", icon: Ticket },
                    { label: "Saved", value: savedEvents?.length || 0, sub: "Bookmarked", icon: Bookmark },
                    { label: "Attended", value: 0, sub: "Events completed", icon: Sparkle },
                    { label: "Points", value: "0", sub: user?.tier || "Gold tier", icon: TrendUp },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="relative p-5 rounded-2xl bg-white border border-[#EEF4FF] hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.35)] transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="size-10 rounded-xl bg-[#F7F9FF] flex items-center justify-center text-[#5B8CFF]">
                                <s.icon weight="duotone" className="size-5" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569]">
                                {s.label}
                            </span>
                        </div>
                        <div className="mt-3 font-display font-black text-3xl tracking-tighter text-[#0B1221]">
                            {s.value}
                        </div>
                        <div className="mt-1 text-xs text-[#475569]">{s.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Activity chart & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#EEF4FF]">
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
                            0%
                        </span>
                    </div>
                    <ActivityChart />
                </div>

                <div className="p-6 rounded-3xl bg-[#0B1221] text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -top-12 -right-12 size-56 rounded-full bg-[#7B61FF]/40 blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 size-56 rounded-full bg-[#00C2FF]/30 blur-3xl" />
                    <div className="relative z-10">
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#00C2FF]">
                            Upcoming
                        </div>
                        <div className="font-display font-bold text-xl mt-1">Your next event</div>
                        
                        {nextEvent ? (
                            <>
                                <div className="mt-6 font-display font-black text-2xl tracking-tighter">
                                    {nextEvent.title}
                                </div>
                                <div className="mt-2 text-sm text-white/70 flex flex-col gap-1.5">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarBlank weight="duotone" className="size-4" /> {nextEvent.dateLabel}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin weight="duotone" className="size-4" /> {nextEvent.location}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="mt-6 text-sm text-white/50">
                                You don't have any upcoming events. Browse the platform to find your next experience.
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setActive("tickets")}
                        className="relative z-10 mt-6 w-full px-4 py-3 rounded-xl bg-white text-[#0B1221] font-semibold text-sm hover:scale-[1.02] active:scale-95 transition"
                    >
                        {nextEvent ? "View Ticket" : "Browse Events"}
                    </button>
                </div>
            </div>

            {/* Saved events preview */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-2xl text-[#0B1221]">Recent Saves</h2>
                    <button onClick={() => setActive("saved")} className="text-sm font-semibold text-[#5B8CFF] hover:underline">
                        View all
                    </button>
                </div>
                {savedEvents && savedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {savedEvents.slice(0, 3).map((e) => (
                            <EventCard key={e.id} event={e} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white border border-[#EEF4FF] rounded-3xl">
                        <Bookmark weight="duotone" className="size-8 mx-auto text-[#94A3B8] mb-2" />
                        <div className="text-sm font-medium text-[#475569]">You haven't saved any events yet.</div>
                    </div>
                )}
            </div>
        </div>
    );
}
