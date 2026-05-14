import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandsMarquee from "../components/BrandsMarquee";
import ExperienceSection from "../components/ExperienceSection";
import UpcomingEvents from "../components/UpcomingEvents";
import PastEventsGallery from "../components/PastEventsGallery";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

export default function Landing() {
    return (
        <div data-testid="landing-page" className="relative">
            <Navbar />
            <main>
                <Hero />
                <BrandsMarquee />
                <ExperienceSection />
                <UpcomingEvents />
                <PastEventsGallery />
                <CtaSection />
            </main>
            <Footer />
        </div>
    );
}
