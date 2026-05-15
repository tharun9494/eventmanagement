import { useState, useEffect } from "react";
import { User, Sparkle, CheckCircle, WarningCircle, CircleNotch } from "@phosphor-icons/react";
import { db, auth } from "../../lib/firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function Profile({ user }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            const fetchUserData = async () => {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        if (data.phone) setPhone(data.phone);
                        if (data.location) setLocation(data.location);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        setStatus(null);
        try {
            if (name !== user.displayName) {
                await updateProfile(auth.currentUser, { displayName: name });
            }
            await setDoc(doc(db, "users", user.uid), {
                displayName: name,
                phone: phone,
                location: location
            }, { merge: true });
            setStatus({ type: 'success', msg: 'Profile updated successfully!' });
        } catch (error) {
            console.error("Error updating profile:", error);
            setStatus({ type: 'error', msg: 'Failed to update profile. Ensure you have permission.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(null), 4000);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EEF4FF] shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#EEF4FF]">
                    <div className="size-28 rounded-3xl bg-brand-gradient flex items-center justify-center shadow-lg relative group overflow-hidden shrink-0">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="size-full object-cover" />
                        ) : (
                            <User weight="fill" className="text-white size-12" />
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Update</span>
                        </div>
                    </div>
                    <div className="text-center sm:text-left mt-2 sm:mt-0 flex-1">
                        <h3 className="font-display font-black text-3xl text-[#0B1221]">{user?.displayName || "Eventra Member"}</h3>
                        <p className="text-[#475569] mt-1 font-medium">{user?.email}</p>
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                            <Sparkle weight="fill" className="size-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-700">Gold Tier Member</span>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 space-y-6">
                    {status && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            {status.type === 'success' ? <CheckCircle weight="fill" className="size-5" /> : <WarningCircle weight="fill" className="size-5" />}
                            {status.msg}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Display Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name" 
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221] shadow-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <input 
                                type="email" 
                                disabled 
                                value={user?.email || ""} 
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent text-sm font-medium text-gray-500 cursor-not-allowed opacity-70" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000" 
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221] shadow-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 ml-1">Location</label>
                            <input 
                                type="text" 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="City, Country" 
                                className="w-full px-4 py-3.5 rounded-xl bg-[#F7F9FF] border border-[#EEF4FF] focus:border-[#5B8CFF] focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#0B1221] shadow-sm" 
                            />
                        </div>
                    </div>
                    <div className="pt-6 flex items-center justify-end gap-3 border-t border-[#EEF4FF]">
                        <button 
                            disabled={loading}
                            onClick={() => {
                                setName(user?.displayName || "");
                                // Ideally we'd reset phone/location to their original fetched state too
                                // For simplicity, we just trigger a small re-render
                            }}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#475569] hover:bg-[#F8FAFC] transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={loading}
                            onClick={handleSave}
                            className="px-6 py-2.5 rounded-xl bg-[#0B1221] text-white text-sm font-bold hover:scale-105 transition-transform shadow-[0_10px_20px_-10px_rgba(11,18,33,0.5)] disabled:opacity-80 disabled:hover:scale-100 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <CircleNotch weight="bold" className="size-4 animate-spin" />
                                    Saving...
                                </>
                            ) : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
