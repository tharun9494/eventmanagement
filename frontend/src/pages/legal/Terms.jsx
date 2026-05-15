import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#F7F9FF] flex flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 w-full">
                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF] mb-2">Legal</div>
                <h1 className="font-display font-black text-4xl tracking-tighter text-[#0B1221] mb-8">Terms of Service</h1>
                <div className="prose prose-slate max-w-none text-[#475569] space-y-4">
                    <p>These Terms of Service govern your use of the website located at Eventra Network and any related services provided by Lumen Labs.</p>
                    <p>By accessing Eventra Network, you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these Terms of Service, you are prohibited from using or accessing this website or using any other services provided by Lumen Labs.</p>
                    <h3 className="text-xl font-bold text-[#0B1221] mt-8 mb-4">1. Limitations of Use</h3>
                    <p>By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
