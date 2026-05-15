import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#F7F9FF] flex flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 w-full">
                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF] mb-2">Legal</div>
                <h1 className="font-display font-black text-4xl tracking-tighter text-[#0B1221] mb-8">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none text-[#475569] space-y-4">
                    <p>Your privacy is important to us. It is Eventra Network's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, and other sites we own and operate.</p>
                    <p>Personal information is any information about you which can be used to identify you. This includes information about you as a person (such as name, address, and date of birth), your devices, payment details, and even information about how you use a website or online service.</p>
                    <h3 className="text-xl font-bold text-[#0B1221] mt-8 mb-4">1. Information We Collect</h3>
                    <p>We only collect personal information when we have a legitimate reason to do so, and we only collect the information that is reasonably necessary to provide our services to you.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
