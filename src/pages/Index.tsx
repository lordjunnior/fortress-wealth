import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import AlertBanner from "@/components/AlertBanner";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ── Nobel Section Wrapper — GSAP ScrollTrigger + Framer Motion hybrid ── */
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

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 60, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [delay]);

  return (
    <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();

  // GSAP: ScrollTrigger cleanup
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  // Dust parallax
  const dustY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "E se o governo proibir Bitcoin no Brasil?",
        "acceptedAnswer": { "@type": "Answer", "text": "Governos podem dificultar o acesso, mas não podem impedir o funcionamento do protocolo. O Bitcoin opera em uma rede descentralizada global — não existe um servidor para desligar. Com conhecimento técnico de autocustódia e operações P2P, você opera com soberania independentemente da regulação local." }
      },
      {
        "@type": "Question",
        "name": "Bitcoin é pirâmide financeira?",
        "acceptedAnswer": { "@type": "Answer", "text": "Não. Pirâmides dependem de novos participantes pagando os antigos. O Bitcoin é um protocolo matemático com oferta fixa de 21 milhões de unidades, sem dono, sem empresa por trás, sem promessa de retorno. Ele é dinheiro — não um esquema de investimento." }
      },
      {
        "@type": "Question",
        "name": "Preciso ser programador para usar Bitcoin?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutamente não. Assim como você não precisa entender TCP/IP para usar a internet, você não precisa programar para usar Bitcoin. As ferramentas modernas de autocustódia são intuitivas. O que você precisa é de educação financeira." }
      },
      {
        "@type": "Question",
        "name": "Posso deixar Bitcoin em corretora?",
        "acceptedAnswer": { "@type": "Answer", "text": "Pode, mas não deveria. Corretoras são bancos de dados centralizados — sujeitas a hacks, bloqueios judiciais, falências e confiscos. A regra é simples: Not your keys, not your coins. Aprenda autocustódia." }
      },
      {
        "@type": "Question",
        "name": "Como começar com pouco dinheiro?",
        "acceptedAnswer": { "@type": "Answer", "text": "O Bitcoin é divisível em 100 milhões de satoshis. Você pode começar com R$50. Compre uma fração, transfira para sua própria carteira, aprenda autocustódia. O hábito de empilhar satoshis regularmente é mais poderoso do que qualquer aporte único." }
      },
      {
        "@type": "Question",
        "name": "Bitcoin substitui bancos?",
        "acceptedAnswer": { "@type": "Answer", "text": "O Bitcoin não substitui bancos — ele torna bancos opcionais. Você pode enviar, receber e guardar valor sem precisar de permissão de nenhuma instituição. Pela primeira vez na história, o indivíduo pode ser seu próprio banco." }
      },
      {
        "@type": "Question",
        "name": "Lightning Network é segura?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sim. A Lightning Network é uma camada de pagamentos construída sobre o Bitcoin que permite transações instantâneas com taxas próximas de zero. Ela herda a segurança da blockchain e é ideal para pagamentos do dia a dia." }
      },
      {
        "@type": "Question",
        "name": "Já perdi muito tempo, vale a pena comprar Bitcoin hoje?",
        "acceptedAnswer": { "@type": "Answer", "text": "O Bitcoin ainda está no início da curva de adoção global. Menos de 5% da população mundial possui Bitcoin. Você não está atrasado — a maioria das pessoas ainda nem começou a entender o que está acontecendo com o sistema monetário." }
      },
      {
        "@type": "Question",
        "name": "Existe risco regulatório com Bitcoin?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sempre existe risco regulatório em qualquer ativo. Mas o Bitcoin foi projetado para ser resistente à censura. Com autocustódia e conhecimento técnico de operações P2P, você minimiza drasticamente a exposição regulatória." }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lord Junnior — Soberania Individual",
    "url": "https://lordjunnior.com",
    "description": "Alfabetização monetária, autocustódia Bitcoin e estratégias de saída do sistema fiat. O manual que o sistema não quer que você leia.",
    "inLanguage": "pt-BR",
    "publisher": {
      "@type": "Person",
      "name": "Lord Junnior",
      "url": "https://lordjunnior.com"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lord Junnior",
    "url": "https://lordjunnior.com",
    "logo": "https://lordjunnior.com/favicon.svg",
    "sameAs": [],
    "description": "Ecossistema de soberania individual: Bitcoin, autocustódia, autonomia alimentar e blindagem financeira."
  };

  return (
    <div className="min-h-screen text-foreground pt-[62px] overflow-x-hidden">
      <Helmet>
        <title>Seu dinheiro está derretendo — Lord Junnior | Soberania Individual</title>
        <meta name="description" content="Alfabetização monetária, autocustódia Bitcoin e estratégias de saída. A infraestrutura técnica e intelectual para quem decidiu parar de financiar o próprio roubo." />
        <link rel="canonical" href="https://lordjunnior.com/" />
        <meta property="og:title" content="Seu dinheiro está derretendo. A culpa não é do acaso." />
        <meta property="og:description" content="O manual que o sistema não quer que você leia. Alfabetização monetária, autocustódia e estratégias de saída do sistema fiat." />
        <meta property="og:url" content="https://lordjunnior.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lordjunnior.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seu dinheiro está derretendo. A culpa não é do acaso." />
        <meta name="twitter:description" content="O manual que o sistema não quer que você leia. Alfabetização monetária, autocustódia e estratégias de saída." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <NetworkTicker />
      <CommandCenter />
      <SovereignTermModal />
      <NivelZero />
      <NoiseBackground />

      {/* ── CINEMATIC BACKGROUND — Radial glows + grain ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--gold)/0.1),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--chart-red)/0.06),_transparent_60%)]" />
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px"
        }} />
      </div>

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

        <NobelSection className="section-divider" delay={0.05}>
          <AlertBanner />
        </NobelSection>

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
