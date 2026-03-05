import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
import BitcoinInsightsSection from "@/components/BitcoinInsightsSection";
import NetworkTicker from "@/components/NetworkTicker";
import CommandCenter from "@/components/CommandCenter";
import SovereignTermModal from "@/components/SovereignTermModal";
import NivelZero from "@/components/NivelZero";
import StrategicSignature from "@/components/StrategicSignature";
import RiskBlock from "@/components/RiskBlock";

import bgHeroAtmosphere from "@/assets/bg-hero-atmosphere.jpg";
import bgMidLayer from "@/assets/bg-mid-layer.jpg";
import bgDeepLayer from "@/assets/bg-deep-layer.jpg";

/* ── Nobel Section Wrapper — Cinematic reveal on scroll ── */
const NobelSection = ({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 50, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();

  // Parallax: background moves slower than content
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const dustY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="min-h-screen text-foreground pt-[62px] overflow-x-hidden">
      <NetworkTicker />
      <CommandCenter />
      <SovereignTermModal />
      <NivelZero />
      <NoiseBackground />

      {/* ── CINEMATIC BACKGROUND WITH PARALLAX ── */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Radial glow — top right orange bleed */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--gold)/0.12),_transparent_60%)]" />
        {/* Radial glow — bottom left deep red */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--chart-red)/0.06),_transparent_60%)]" />
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px"
        }} />
      </motion.div>

      {/* Dust Particles Atmosphere — with scroll parallax */}
      <motion.div
        style={{ y: dustY }}
        className="fixed inset-0 lg:left-[260px] pointer-events-none z-0 overflow-hidden opacity-60"
      >
        <div className="dust-layer-home"></div>
        <div className="dust-layer-home dust-layer-home-2"></div>
        <div className="dust-layer-home dust-layer-home-3"></div>
      </motion.div>

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

        <NobelSection id="manifesto" className="section-divider">
          <ManifestoSection />
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <ConfiscoTimeline />
        </NobelSection>

        <NobelSection className="section-divider section-padding py-12 md:py-16" delay={0.05}>
          <div className="max-w-3xl mx-auto">
            <QuoteCarousel />
          </div>
        </NobelSection>

        <NobelSection id="pix-crypto" className="section-alt section-divider" delay={0.1}>
          <PixBitcoinSection />
        </NobelSection>

        <NobelSection id="ferramentas" className="section-divider" delay={0.1}>
          <ToolsSection />
        </NobelSection>

        <NobelSection id="educacao" className="section-alt section-divider" delay={0.1}>
          <KnowledgeSection />
        </NobelSection>

        <NobelSection id="audioteca" className="section-divider" delay={0.1}>
          <AudiotecaSection />
        </NobelSection>

        <NobelSection id="faq" className="section-alt section-divider" delay={0.1}>
          <FaqSection />
        </NobelSection>

        <NobelSection className="section-divider" delay={0.1}>
          <WhyBitcoinSection />
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <StrategicSignature />
        </NobelSection>

        <NobelSection className="section-divider section-padding" delay={0.15}>
          <div className="max-w-5xl mx-auto">
            <RiskBlock
              title="Sem esta base, o que acontece?"
              showImage
              consequences={[
                "Dependência total de intermediários financeiros que podem bloquear seu acesso a qualquer momento.",
                "Patrimônio exposto à desvalorização monetária contínua sem nenhuma camada de proteção.",
                "Incapacidade de operar fora do sistema convencional em cenários de restrição ou colapso.",
                "Conhecimento fragmentado que não se converte em ação prática nem em transmissão familiar.",
                "Vulnerabilidade alimentar, energética e informacional em eventos de ruptura sistêmica.",
              ]}
            />
          </div>
        </NobelSection>

        <NobelSection className="section-alt section-divider" delay={0.1}>
          <BitcoinInsightsSection />
        </NobelSection>

        <NobelSection id="apoio" className="section-alt section-divider" delay={0.1}>
          <FooterSection />
        </NobelSection>
      </div>
    </div>
  );
};

export default Index;
