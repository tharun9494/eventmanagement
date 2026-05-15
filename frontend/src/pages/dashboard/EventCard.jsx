import { Bookmark, CalendarBlank, MapPin } from "@phosphor-icons/react";

export default function EventCard({ event }) {
    return (
        <div className="group rounded-2xl bg-white border border-[#EEF4FF] overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.35)] transition-all cursor-pointer flex flex-col">
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 size-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#0B1221] shadow-sm">
                    <Bookmark weight="fill" className="size-4" />
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5B8CFF]">
                    {event.category}
                </div>
                <div className="font-display font-bold text-[#0B1221] mt-1.5 leading-snug">
                    {event.title}
                </div>
                <div className="mt-auto pt-4 flex items-center gap-3 text-xs font-medium text-[#475569]">
                    <span className="flex items-center gap-1"><CalendarBlank className="size-3.5"/> {event.dateLabel}</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 truncate"><MapPin className="size-3.5"/> {event.location}</span>
                </div>
            </div>
        </div>
    );
}
