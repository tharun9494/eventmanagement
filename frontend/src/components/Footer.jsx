import { Link } from "react-router-dom";
import { Sparkle, InstagramLogo, TwitterLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer
            data-testid="footer"
            className="relative bg-white border-t border-[#EEF4FF]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="size-9 rounded-xl bg-brand-gradient flex items-center justify-center">
                                <Sparkle weight="fill" className="text-white size-5" />
                            </div>
                            <span className="font-display font-bold text-lg tracking-tight">
                                Lumen<span className="text-gradient">.</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-[#475569] max-w-xs leading-relaxed">
                            The premium event platform for immersive,
                            unforgettable experiences. Built for creators,
                            organizers and dreamers.
                        </p>
                        <div className="mt-5 flex items-center gap-2">
                            {[
                                { Icon: InstagramLogo, label: "instagram" },
                                { Icon: TwitterLogo, label: "twitter" },
                                { Icon: LinkedinLogo, label: "linkedin" },
                                { Icon: YoutubeLogo, label: "youtube" },
                            ].map(({ Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    data-testid={`footer-social-${label}`}
                                    className="size-9 rounded-xl bg-[#F7F9FF] hover:bg-[#0B1221] text-[#0B1221] hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <Icon weight="duotone" className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterCol
                        title="Product"
                        links={[
                            "Events",
                            "Pricing",
                            "Dashboard",
                            "Integrations",
                            "Changelog",
                        ]}
                    />
                    <FooterCol
                        title="Company"
                        links={["About", "Careers", "Press", "Blog", "Contact"]}
                    />
                    <FooterCol
                        title="Resources"
                        links={[
                            "Documentation",
                            "Help Center",
                            "Community",
                            "Partners",
                            "API",
                        ]}
                    />
                    <FooterCol
                        title="Legal"
                        links={["Privacy", "Terms", "Security", "Cookies"]}
                    />
                </div>

                <div className="mt-14 pt-6 border-t border-[#EEF4FF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-[#475569]">
                        © 2026 Lumen Labs. All rights reserved.
                    </p>
                    <p className="text-xs text-[#475569]">
                        Crafted with care · Cinematic by design.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({ title, links }) {
    return (
        <div>
            <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0B1221]">
                {title}
            </div>
            <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                    <li key={l}>
                        <a
                            href="#"
                            className="text-sm text-[#475569] hover:text-[#0B1221] transition-colors"
                        >
                            {l}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
