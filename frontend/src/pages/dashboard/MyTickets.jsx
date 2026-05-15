import { CalendarBlank, MapPin } from "@phosphor-icons/react";

export default function MyTickets({ tickets }) {
    if (!tickets || tickets.length === 0) {
        return <div className="text-center py-20 text-[#475569] font-medium">You don't have any tickets yet.</div>;
    }
    
    return (
        <div className="space-y-5">
            {tickets.map((e) => (
                <div key={e.id} className="flex flex-col md:flex-row bg-white border border-[#EEF4FF] rounded-3xl overflow-hidden hover:shadow-[0_18px_40px_-20px_rgba(91,140,255,0.35)] transition-all">
                    <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
                        <img src={e.image} alt={e.title} className="size-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="text-[10px] uppercase font-bold text-white/80 tracking-widest">{e.category}</div>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between border-dashed border-[#E2E8F0] md:border-l-2 relative bg-white">
                        <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-[#F7F9FF] border-r border-[#E2E8F0]"></div>
                        
                        <div>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-display font-black text-2xl text-[#0B1221]">{e.title}</h3>
                                    <div className="mt-2 text-sm text-[#475569] flex flex-wrap items-center gap-x-5 gap-y-2">
                                        <span className="flex items-center gap-1.5 font-medium"><CalendarBlank className="size-4 text-[#5B8CFF]"/> {e.dateLabel}</span>
                                        <span className="flex items-center gap-1.5 font-medium"><MapPin className="size-4 text-[#5B8CFF]"/> {e.location}</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold whitespace-nowrap">Confirmed</div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t border-[#EEF4FF] gap-4">
                            <div>
                                <div className="text-[10px] uppercase text-[#94A3B8] font-bold tracking-widest">Ticket ID</div>
                                <div className="font-mono font-bold text-[#0B1221] text-sm mt-0.5">#{e.id.toUpperCase()}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-[#0B1221] text-sm font-bold hover:bg-[#F8FAFC] transition">Add to Wallet</button>
                                <button className="px-5 py-2.5 rounded-xl bg-[#0B1221] text-white text-sm font-bold hover:scale-105 transition-transform shadow-md">Download PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
