import { BellRinging, CreditCard, ShieldCheck, MapPin } from "@phosphor-icons/react";

const getIcon = (name) => {
    switch(name) {
        case 'CreditCard': return CreditCard;
        case 'ShieldCheck': return ShieldCheck;
        case 'MapPin': return MapPin;
        default: return BellRinging;
    }
}

export default function Notifications({ notifications }) {
    if (!notifications || notifications.length === 0) {
        return <div className="text-center py-20 text-[#475569] font-medium">You have no new notifications.</div>;
    }
    
    return (
        <div className="max-w-3xl space-y-3">
            {notifications.map(n => {
                const Icon = getIcon(n.icon);
                return (
                <div key={n.id} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#EEF4FF] hover:shadow-[0_10px_30px_-15px_rgba(91,140,255,0.2)] transition-all cursor-pointer">
                    <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${n.bg || 'bg-[#EEF4FF]'} ${n.color || 'text-[#5B8CFF]'}`}>
                        <Icon weight="fill" className="size-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="font-display font-bold text-[#0B1221] truncate">{n.title}</h4>
                            <span className="text-xs font-semibold text-[#94A3B8] whitespace-nowrap shrink-0">{n.time}</span>
                        </div>
                        <p className="text-sm text-[#475569] mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                </div>
            )})}
        </div>
    );
}
