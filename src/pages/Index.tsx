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
import FaqSection from "@/components/FaqSection";
import WhyBitcoinSection from "@/components/WhyBitcoinSection";
import FooterSection from "@/components/FooterSection";
import QuoteCarousel from "@/components/QuoteCarousel";
import NetworkTicker from "@/components/NetworkTicker";
import SovereignTermModal from "@/components/SovereignTermModal";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground pt-[38px]">
      <NetworkTicker />
      <SovereignTermModal />
      <NoiseBackground />

      {/* Dust Particles Atmosphere */}
      <div className="fixed inset-0 lg:left-[260px] pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="dust-layer-home"></div>
        <div className="dust-layer-home dust-layer-home-2"></div>
        <div className="dust-layer-home dust-layer-home-3"></div>
      </div>

      <style>{`
        @keyframes driftHome {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-1000px) translateX(100px); }
        }
        .dust-layer-home {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.5) 100%, transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(16,185,129,0.3) 100%, transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 80% 80%, rgba(255,255,255,0.3) 100%, transparent);
          background-size: 200px 200px;
          animation: driftHome 50s linear infinite;
        }
        .dust-layer-home-2 {
          background-size: 300px 300px;
          animation: driftHome 70s linear infinite;
          opacity: 0.7;
        }
        .dust-layer-home-3 {
          background-size: 400px 400px;
          animation: driftHome 100s linear infinite;
          opacity: 0.4;
        }
      `}</style>
      <AppSidebar />
      <MobileNav />

      {/* Main content with sidebar offset on desktop */}
      <div className="relative z-10 lg:ml-[260px] pb-10">
        <HeroSection />

        <div id="manifesto" className="section-divider">
          <ManifestoSection />
        </div>

        <div className="section-alt section-divider">
          <ConfiscoTimeline />
        </div>

        {/* Quote Carousel */}
        <div className="section-divider section-padding py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <QuoteCarousel />
          </div>
        </div>

        <div id="pix-crypto" className="section-alt section-divider">
          <PixBitcoinSection />
        </div>

        <div id="ferramentas" className="section-divider">
          <ToolsSection />
        </div>

        <div id="educacao" className="section-alt section-divider">
          <KnowledgeSection />
        </div>

        <div id="audioteca" className="section-divider">
          <AudiotecaSection />
        </div>

        <div id="faq" className="section-alt section-divider">
          <FaqSection />
        </div>

        <div className="section-divider">
          <WhyBitcoinSection />
        </div>

        <div id="apoio" className="section-alt section-divider">
          <FooterSection />
        </div>
      </div>

    </div>
  );
};

export default Index;
