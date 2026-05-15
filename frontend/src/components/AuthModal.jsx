import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GoogleLogo, EnvelopeSimple, LockKey } from "@phosphor-icons/react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError("");
            await signInWithPopup(auth, googleProvider);
            onClose(); // Close modal on success
        } catch (err) {
            setError("Failed to sign in with Google.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onClose(); // Close modal on success
        } catch (err) {
            setError(err.message || "Authentication failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-[#0B1221]/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-[400px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(11,18,33,0.3)] border border-[#E2E8F0] overflow-hidden pointer-events-auto flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 pb-2">
                                <div className="font-display font-black text-2xl text-[#0B1221]">
                                    {isLogin ? "Welcome back" : "Create account"}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
                                >
                                    <X weight="bold" className="size-5" />
                                </button>
                            </div>
                            
                            <div className="px-6 pb-6 pt-2">
                                <p className="text-[#64748B] text-sm mb-6">
                                    {isLogin 
                                        ? "Sign in to access your dashboard and manage your events." 
                                        : "Join Eventra to discover and host amazing events worldwide."}
                                </p>

                                {/* Google Button */}
                                <button
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#E2E8F0] text-[#0B1221] font-semibold text-sm hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
                                >
                                    <GoogleLogo weight="bold" className="size-5 text-[#EA4335]" />
                                    Continue with Google
                                </button>

                                <div className="flex items-center gap-3 my-6">
                                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                                    <div className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                                        Or with email
                                    </div>
                                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                                </div>

                                {/* Form */}
                                <form onSubmit={handleEmailAuth} className="space-y-4">
                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#475569] ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <EnvelopeSimple weight="bold" className="size-4 text-[#94A3B8]" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0B1221] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#475569] ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <LockKey weight="bold" className="size-4 text-[#94A3B8]" />
                                            </div>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0B1221] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]/30 focus:border-[#5B8CFF] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-2 py-3.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF] hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_8px_20px_-6px_rgba(123,97,255,0.4)] disabled:opacity-50"
                                    >
                                        {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                                    </button>
                                </form>

                                <div className="mt-6 text-center text-sm text-[#64748B]">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setError("");
                                        }}
                                        className="font-bold text-[#5B8CFF] hover:text-[#7B61FF] transition-colors"
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
