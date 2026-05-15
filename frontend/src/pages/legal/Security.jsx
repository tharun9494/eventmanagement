import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Security() {
    return (
        <div className="min-h-screen bg-[#F7F9FF] flex flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 w-full">
                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF] mb-2">Legal</div>
                <h1 className="font-display font-black text-4xl tracking-tighter text-[#0B1221] mb-8">Security</h1>
                <div className="prose prose-slate max-w-none text-[#475569] space-y-4">
                    <p>At Eventra Network, we take the security of your data very seriously. We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.</p>
                    <p>All data is encrypted in transit using TLS and at rest using AES-256 encryption. Our infrastructure is hosted on Google Cloud Platform, inheriting their world-class physical and network security.</p>
                    <h3 className="text-xl font-bold text-[#0B1221] mt-8 mb-4">1. Vulnerability Reporting</h3>
                    <p>If you believe you have found a security vulnerability in Eventra Network, please contact us immediately. We will investigate all legitimate reports and do our best to quickly fix the problem.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
