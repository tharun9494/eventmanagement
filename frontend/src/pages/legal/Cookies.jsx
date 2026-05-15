import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Cookies() {
    return (
        <div className="min-h-screen bg-[#F7F9FF] flex flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-20 mx-auto max-w-3xl px-4 sm:px-6 w-full">
                <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#5B8CFF] mb-2">Legal</div>
                <h1 className="font-display font-black text-4xl tracking-tighter text-[#0B1221] mb-8">Cookie Policy</h1>
                <div className="prose prose-slate max-w-none text-[#475569] space-y-4">
                    <p>We use cookies to help improve your experience of Eventra Network. This cookie policy is part of Lumen Labs' privacy policy, and covers the use of cookies between your device and our site.</p>
                    <p>A cookie is a small piece of data that a website stores on your device when you visit, typically containing information about the website itself, a unique identifier that allows the site to recognise your web browser when you return, additional data that serves the purpose of the cookie, and the lifespan of the cookie itself.</p>
                    <h3 className="text-xl font-bold text-[#0B1221] mt-8 mb-4">1. How we use cookies</h3>
                    <p>We use cookies to retain your user session securely and to analyze our website traffic to improve our services.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
