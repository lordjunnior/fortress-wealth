import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ConfiscoTimeline from "@/components/ConfiscoTimeline";
import PixBitcoinSection from "@/components/PixBitcoinSection";
import ToolsSection from "@/components/ToolsSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import AudiotecaSection from "@/components/AudiotecaSection";
import FooterSection from "@/components/FooterSection";
import QuoteCarousel from "@/components/QuoteCarousel";
import NetworkTicker from "@/components/NetworkTicker";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      {/* Main content with sidebar offset on desktop */}
      <div className="relative z-10 lg:ml-[260px] pb-10">
        <HeroSection />

        <div id="manifesto">
          <ManifestoSection />
        </div>

        <ConfiscoTimeline />

        {/* Quote Carousel */}
        <div className="section-padding py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <QuoteCarousel />
          </div>
        </div>

        <div id="pix-crypto">
          <PixBitcoinSection />
        </div>

        <div id="ferramentas">
          <ToolsSection />
        </div>

        <div id="educacao">
          <KnowledgeSection />
        </div>

        <div id="audioteca">
          <AudiotecaSection />
        </div>

        <div id="apoio">
          <FooterSection />
        </div>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default Index;
