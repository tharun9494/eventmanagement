import { useState } from "react";
import { DotsThreeVertical, Plus, X, CircleNotch } from "@phosphor-icons/react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Events({ events }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: "",
        category: "Music",
        dateLabel: "",
        location: "",
        price: "$0",
        image: ""
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "events"), {
                ...formData,
                sold: 0,
                createdAt: new Date().toISOString()
            });
            setIsModalOpen(false);
            setFormData({
                title: "",
                category: "Music",
                dateLabel: "",
                location: "",
                price: "$0",
                image: ""
            });
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                        Manage
                    </div>
                    <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[#0B1221] mt-1">
                        All Events
                    </h1>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex self-start sm:self-auto items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B1221] text-white text-sm font-semibold hover:bg-black hover:scale-[1.02] active:scale-95 transition shadow-lg"
                >
                    <Plus weight="bold" className="size-4" />
                    Create Event
                </button>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-xl text-[#0B1221]">
                        Event Directory
                    </h3>
                    <button className="text-sm font-semibold text-[#5B8CFF] hover:underline">
                        Export CSV
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
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
                            {events.map((e, i) => (
                                <tr key={e.id} className="border-b border-[#EEF4FF] hover:bg-[#F7F9FF] transition-colors">
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl overflow-hidden shrink-0">
                                                <img src={e.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=200"} alt="" className="size-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm text-[#0B1221]">{e.title}</div>
                                                <div className="text-xs text-[#475569]">{e.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-[#475569]">{e.dateLabel || e.date}</td>
                                    <td className="py-4 pr-4 text-sm text-[#475569]">{e.location}</td>
                                    <td className="py-4 pr-4">
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">Live</span>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-[#0B1221] font-semibold">{e.sold || 0}</td>
                                    <td className="py-4">
                                        <button className="size-8 rounded-lg hover:bg-[#EEF4FF] flex items-center justify-center text-[#475569]">
                                            <DotsThreeVertical weight="bold" className="size-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-[#475569] text-sm">No events found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1221]/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-[#EEF4FF] flex items-center justify-between shrink-0">
                            <h2 className="font-display font-bold text-xl text-[#0B1221]">Create New Event</h2>
                            <button onClick={() => setIsModalOpen(false)} className="size-8 rounded-full bg-[#F7F9FF] flex items-center justify-center text-[#475569] hover:bg-red-50 hover:text-red-600 transition">
                                <X weight="bold" className="size-4" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="createEventForm" onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Event Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]" placeholder="Epic Music Festival" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Category</label>
                                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]">
                                            <option>Music</option>
                                            <option>Tech</option>
                                            <option>Art</option>
                                            <option>Food</option>
                                            <option>Business</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Price</label>
                                        <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]" placeholder="$49" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Date & Time Label</label>
                                    <input required type="text" value={formData.dateLabel} onChange={e => setFormData({...formData, dateLabel: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]" placeholder="Oct 24, 2026 • 8:00 PM" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Location</label>
                                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]" placeholder="Madison Square Garden" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Image URL</label>
                                    <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221]" placeholder="https://images.unsplash.com/..." />
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-[#EEF4FF] shrink-0">
                            <button form="createEventForm" disabled={loading} type="submit" className="w-full py-3 rounded-xl bg-[#0B1221] text-white text-sm font-bold shadow-lg hover:shadow-[0_10px_20px_-10px_rgba(11,18,33,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                {loading ? <CircleNotch weight="bold" className="size-4 animate-spin" /> : "Publish Event"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
