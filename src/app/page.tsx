import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureProducts from "@/components/SignatureProducts";
import WhyMatchaman from "@/components/WhyMatchaman";
import BrandStory from "@/components/BrandStory";
import StoreExperience from "@/components/StoreExperience";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import Testimonials from "@/components/Testimonials";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import LeafDecorations from "@/components/LeafDecorations";
import WelcomeGiftModal from "@/components/WelcomeGiftModal";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream selection:bg-matcha selection:text-cream">
      {/* Ambient background leaf particles */}
      <LeafDecorations />

      {/* Sticky Navigation Bar */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Signature Products */}
        <SignatureProducts />

        {/* 4. Why Matchaman */}
        <WhyMatchaman />

        {/* 5. Brand Story Section */}
        <BrandStory />

        {/* 6. Store Experience Section */}
        <StoreExperience />

        {/* 7. Loyalty Program Section */}
        <LoyaltyProgram />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. Instagram/Social Feed Section */}
        <SocialFeed />
      </main>

      {/* 10. Footer & Newsletter */}
      <Footer />

      {/* First-Time Visitor Welcome Gift Experience */}
      <WelcomeGiftModal />
    </div>
  );
}

