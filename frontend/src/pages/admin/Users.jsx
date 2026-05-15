import { User, DotsThreeVertical } from "@phosphor-icons/react";

export default function Users({ users }) {
    return (
        <div className="space-y-6">
            <div>
                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF]">
                    Manage
                </div>
                <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[#0B1221] mt-1">
                    Users Directory
                </h1>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EEF4FF]">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-xl text-[#0B1221]">
                        Registered Users
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] uppercase tracking-[0.2em] font-semibold text-[#475569] border-b border-[#EEF4FF]">
                                <th className="py-3 pr-4">User</th>
                                <th className="py-3 pr-4">Email</th>
                                <th className="py-3 pr-4">Tier</th>
                                <th className="py-3 pr-4">Joined</th>
                                <th className="py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-[#EEF4FF] hover:bg-[#F7F9FF] transition-colors">
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl overflow-hidden shrink-0 bg-brand-gradient flex items-center justify-center">
                                                {u.photoURL ? (
                                                    <img src={u.photoURL} alt="" className="size-full object-cover" />
                                                ) : (
                                                    <User weight="fill" className="text-white size-5" />
                                                )}
                                            </div>
                                            <div className="font-semibold text-sm text-[#0B1221]">{u.displayName || "Unknown User"}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-[#475569]">{u.email}</td>
                                    <td className="py-4 pr-4">
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">{u.tier || "Member"}</span>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-[#475569]">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="py-4">
                                        <button className="size-8 rounded-lg hover:bg-[#EEF4FF] flex items-center justify-center text-[#475569]">
                                            <DotsThreeVertical weight="bold" className="size-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-[#475569] text-sm">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
