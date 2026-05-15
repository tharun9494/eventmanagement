import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowRight, CalendarBlank, MapPin, UsersThree } from "@phosphor-icons/react";
import BackgroundAura from "./BackgroundAura";

export default function Hero() {


    // Mouse tracking setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            data-testid="hero-section"
            className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[94vh] flex items-center overflow-visible"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-b-[40px] z-0">


                {/* Concentric Orbital Rings on the Right */}
                <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.15]">
                    <div className="absolute inset-0 m-auto w-full h-full rounded-full border border-[#5B8CFF] border-dashed animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full border border-[#7B61FF] animate-[spin_80s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 m-auto w-[50%] h-[50%] rounded-full border border-[#00C2FF] border-dashed animate-[spin_40s_linear_infinite]" />
                </div>

                {/* Light minimal constellation overlay */}
                <div className="absolute inset-0 opacity-[0.25] mix-blend-multiply">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#5B8CFF" />
                                <stop offset="50%" stopColor="#7B61FF" />
                                <stop offset="100%" stopColor="#00C2FF" />
                            </linearGradient>
                        </defs>
                        <g stroke="url(#line-grad)" strokeWidth="0.5" fill="none">
                            <path d="M 50 150 L 250 100 L 450 250 L 650 150 L 850 350 L 1100 100 L 1350 200" />
                            <path d="M 100 350 L 200 500 L 400 400 L 600 550 L 800 400 L 1000 600 L 1250 400" />
                            <path d="M 150 50 L 350 300 L 550 50 L 750 300 L 950 50 L 1150 300" />
                        </g>
                        <g fill="#7B61FF" opacity="0.6">
                            <circle cx="50" cy="150" r="1.5" />
                            <circle cx="250" cy="100" r="1.5" />
                            <circle cx="450" cy="250" r="2" />
                            <circle cx="650" cy="150" r="1.5" />
                            <circle cx="850" cy="350" r="1.5" />
                            <circle cx="1100" cy="100" r="2" />
                            <circle cx="1350" cy="200" r="1.5" />
                        </g>
                    </svg>
                </div>
            </div>

            <motion.div
                className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full flex flex-col lg:flex-row items-center gap-10"
            >
                {/* Left Content */}
                <div className="flex-1 text-left lg:max-w-[50%] pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 text-[11px] font-semibold text-[#475569] shadow-sm mb-6"
                    >
                        <span className="size-1.5 rounded-full bg-[#10B981]" />
                        Now booking · Winter '26 season
                    </motion.div>

                    <h1
                        data-testid="hero-heading"
                        className="font-display font-black tracking-tighter text-[#0B1221] text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05]"
                    >
                        Experience events
                        <span className="block bg-gradient-to-r from-[#7B61FF] via-[#5B8CFF] to-[#00C2FF] bg-clip-text text-transparent pb-1">
                            like never before.
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-5 text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed"
                    >
                        Discover, manage, and live premium networking events with immersive digital interaction — built for founders, operators and the curious few.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mt-8 flex flex-wrap items-center gap-3"
                    >
                        <a
                            href="#upcoming"
                            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF] text-white font-semibold text-[13px] hover:scale-[1.03] active:scale-95 transition-transform shadow-[0_10px_20px_-10px_rgba(123,97,255,0.6)]"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Explore events
                            <ArrowRight weight="bold" className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                            href="#create"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 text-[#0B1221] font-semibold text-[13px] hover:bg-white transition-all shadow-sm"
                        >
                            Create event
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="mt-10 flex items-center gap-3"
                    >
                        <div className="flex -space-x-2">
                            <img src="https://i.pravatar.cc/100?img=11" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/100?img=12" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/100?img=13" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/100?img=14" alt="User 4" className="w-8 h-8 rounded-full border-2 border-white" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <div className="flex text-[#FFB800] text-[11px] tracking-tight">
                                    ★★★★★
                                </div>
                                <span className="text-[13px] font-bold text-[#0B1221]">4.96</span>
                            </div>
                            <span className="text-[10px] text-[#475569] font-medium mt-0.5">trusted by 87k+ operators worldwide</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Floating Cards Content */}
                <div className="flex-1 relative h-[450px] w-full hidden lg:block perspective-1000 mt-6">
                    
                    {/* Main Image Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute top-[8%] right-[15%] z-20"
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[320px] bg-white rounded-[1.5rem] p-3 shadow-[0_20px_50px_-15px_rgba(11,18,33,0.12)] border border-[#E2E8F0]"
                        >
                            <div className="flex items-center gap-2.5 mb-3 px-1">
                                <div className="bg-[#7B61FF] rounded-lg p-2">
                                    <CalendarBlank weight="fill" className="text-white size-4" />
                                </div>
                                <div>
                                    <div className="text-[9px] font-bold tracking-widest text-[#475569] uppercase mb-0.5">Live Now</div>
                                    <div className="font-display font-bold text-lg leading-none text-[#0B1221]">AI Builders Summit</div>
                                </div>
                            </div>
                            <div className="relative rounded-[1.2rem] overflow-hidden mb-3">
                                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" alt="Event" className="w-full h-[150px] object-cover" />
                            </div>
                            <div className="flex items-center justify-between px-2 pb-1">
                                <div className="flex items-center gap-1.5 text-[11px] text-[#475569] font-semibold">
                                    <MapPin weight="bold" className="size-3.5 text-[#94A3B8]" />
                                    San Francisco
                                </div>
                                <div className="text-[11px] font-bold text-[#0B1221]">96% full</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Top Right Small Chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, rotate: 2 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute -top-[5%] right-[0%] z-30"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="bg-white rounded-full p-2 pr-4 flex items-center gap-2.5 shadow-[0_15px_30px_-10px_rgba(11,18,33,0.12)] border border-[#E2E8F0]"
                        >
                            <div className="bg-[#E0F2FE] text-[#0284C7] size-7 rounded-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div className="text-[11px] font-bold text-[#0B1221]">+19 new connections</div>
                            <div className="flex -space-x-1.5 ml-0.5">
                                <img src="https://i.pravatar.cc/100?img=1" className="w-5 h-5 rounded-full border border-white" alt="u1" />
                                <img src="https://i.pravatar.cc/100?img=2" className="w-5 h-5 rounded-full border border-white" alt="u2" />
                                <img src="https://i.pravatar.cc/100?img=3" className="w-5 h-5 rounded-full border border-white" alt="u3" />
                                <div className="w-5 h-5 rounded-full border border-white bg-[#EEF2FF] text-[#4F46E5] text-[8px] font-bold flex items-center justify-center">+16</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Left Match Rate Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, rotate: 4 }}
                        animate={{ opacity: 1, x: 0, rotate: -2 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute bottom-[22%] left-[8%] z-10"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            className="bg-white rounded-[1.5rem] p-3 pr-6 flex items-center gap-3 shadow-[0_15px_30px_-10px_rgba(11,18,33,0.12)] border border-[#E2E8F0]"
                        >
                            <div className="bg-[#0EA5E9] p-2.5 rounded-[1rem]">
                                <UsersThree weight="fill" className="text-white size-5" />
                            </div>
                            <div>
                                <div className="text-[9px] font-bold tracking-widest text-[#475569] uppercase mb-0.5">Match Rate</div>
                                <div className="font-display font-black text-2xl text-[#0B1221] leading-none">96<span className="text-sm text-[#475569]">%</span></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Middle Timer Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, rotate: 3 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="absolute bottom-[5%] left-[32%] z-30"
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="bg-white rounded-[1.5rem] py-4 px-8 shadow-[0_20px_40px_-10px_rgba(11,18,33,0.12)] border border-[#E2E8F0]"
                        >
                            <div className="text-center">
                                <div className="font-display font-black text-3xl text-[#5B8CFF]">12d</div>
                                <div className="text-[9px] font-bold tracking-widest text-[#475569] uppercase mt-1.5">Until Next Event</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Right Live Ticker Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotate: -4 }}
                        animate={{ opacity: 1, x: 0, rotate: 2 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="absolute top-[48%] -right-[5%] z-10"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                            className="bg-white rounded-[1.5rem] p-5 shadow-[0_15px_40px_-10px_rgba(11,18,33,0.12)] border border-[#E2E8F0] min-w-[200px]"
                        >
                            <div className="text-[9px] font-bold tracking-widest text-[#94A3B8] uppercase mb-4">Live Ticker</div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-medium text-[#475569]">Founders' Circle</span>
                                    <span className="font-bold text-[#10B981]">+12</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-medium text-[#475569]">Design Mixer</span>
                                    <span className="font-bold text-[#10B981]">+24</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-medium text-[#475569]">Venture Salon</span>
                                    <span className="font-bold text-[#10B981]">+8</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#475569]"
                data-testid="hero-scroll"
            >
                <span className="uppercase tracking-[0.25em] text-[9px] font-semibold">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-4 h-7 border-[1.5px] border-[#475569] rounded-full flex justify-center p-1"
                >
                    <motion.div className="w-[3px] h-[3px] bg-[#475569] rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
