import { motion } from "framer-motion";
import { Ticket, Sparkle } from "@phosphor-icons/react";
import ActivityChart from "./ActivityChart";

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">Engagement</div>
                        <h3 className="font-display font-bold text-xl text-[#0B1221] mt-1">Event attendance over time</h3>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-bold">+28%</span>
                </div>
                <ActivityChart />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1221] text-white">
                     <h3 className="font-display font-bold text-lg mb-6">Favorite Categories</h3>
                     <div className="space-y-5">
                         {['Technology', 'Music & Entertainment', 'Art & Design', 'Business'].map((c, i) => {
                             const pct = 85 - i * 20;
                             return (
                                 <div key={c}>
                                     <div className="flex items-center justify-between mb-2">
                                         <span className="text-sm font-medium text-white/90">{c}</span>
                                         <span className="text-xs font-bold text-[#00C2FF]">{pct}%</span>
                                     </div>
                                     <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                         <motion.div 
                                             initial={{ width: 0 }} 
                                             animate={{ width: `${pct}%` }} 
                                             transition={{ duration: 1, delay: i * 0.1 }}
                                             className="h-full bg-gradient-to-r from-[#5B8CFF] to-[#00C2FF] rounded-full" 
                                         />
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                 </div>
                 
                 <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EEF4FF]">
                     <h3 className="font-display font-bold text-lg text-[#0B1221] mb-6">Spending Overview</h3>
                     <div className="flex items-end gap-4 mb-8">
                         <div className="text-5xl font-display font-black tracking-tighter text-[#0B1221]">$1,240</div>
                         <div className="text-sm text-[#475569] mb-1">spent this year</div>
                     </div>
                     <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F9FF] border border-[#EEF4FF]">
                             <div className="flex items-center gap-3">
                                 <Ticket className="size-5 text-[#5B8CFF]" weight="duotone" />
                                 <span className="text-sm font-semibold text-[#0B1221]">Total Tickets</span>
                             </div>
                             <span className="font-display font-bold text-lg text-[#0B1221]">14</span>
                         </div>
                         <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F9FF] border border-[#EEF4FF]">
                             <div className="flex items-center gap-3">
                                 <Sparkle className="size-5 text-[#7B61FF]" weight="duotone" />
                                 <span className="text-sm font-semibold text-[#0B1221]">VIP Upgrades</span>
                             </div>
                             <span className="font-display font-bold text-lg text-[#0B1221]">3</span>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
}
