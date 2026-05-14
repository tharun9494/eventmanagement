import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandsMarquee from "../components/BrandsMarquee";
import CategoriesExplorer from "../components/CategoriesExplorer";
import FeaturedEventHero from "../components/FeaturedEventHero";
import ExperienceSection from "../components/ExperienceSection";
import UpcomingEvents from "../components/UpcomingEvents";
import HowItWorks from "../components/HowItWorks";
import LiveActivity from "../components/LiveActivity";
import GlobalCities from "../components/GlobalCities";
import PastEventsGallery from "../components/PastEventsGallery";
import Testimonials from "../components/Testimonials";
import PricingTiers from "../components/PricingTiers";
import FaqAccordion from "../components/FaqAccordion";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

export default function Landing() {
    return (
        <div data-testid="landing-page" className="relative">
            <Navbar />
            <main className="relative">
                <Hero />
                <BrandsMarquee />
                <CategoriesExplorer />
                <FeaturedEventHero />
                <ExperienceSection />
                <UpcomingEvents />
                <HowItWorks />
                <LiveActivity />
                <GlobalCities />
                <PastEventsGallery />
                <Testimonials />
                <PricingTiers />
                <FaqAccordion />
                <CtaSection />
            </main>
            <Footer />
        </div>
    );
}
