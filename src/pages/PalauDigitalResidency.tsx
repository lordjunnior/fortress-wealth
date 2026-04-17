import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  CreditCard,
  Globe,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";

import heroImg from "@/assets/palau-v2-hero.jpg";
import clarityImg from "@/assets/palau-v2-clarity.jpg";
import exchangesImg from "@/assets/palau-v2-exchanges.jpg";
import neobanksImg from "@/assets/palau-v2-neobanks.jpg";
import errorImg from "@/assets/palau-v2-error.jpg";
import bankImg from "@/assets/palau-v2-bank.jpg";
import roadmapImg from "@/assets/palau-v2-roadmap.jpg";
import ctaImg from "@/assets/palau-v2-cta.jpg";

// ─── Editorial Light Theme (locked to this page) ─────────────────────────
const theme: React.CSSProperties = {
  // Paleta obrigatória do briefing
  ["--bg" as any]: "#F5EFE4",
  ["--bg-2" as any]: "#EFE6D6",
  ["--surface" as any]: "#FAF7F1",
  ["--ink" as any]: "#1F2430",
  ["--ink-2" as any]: "#5F6673",
  ["--blue" as any]: "#1F3560",
  ["--green" as any]: "#2E5A4F",
  ["--gold" as any]: "#B08A4A",
  ["--line" as any]: "rgba(31, 53, 96, 0.14)",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// ─── FAQ ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "O ID de Palau é cidadania?",
    a: "Não. O ID de Palau não equivale a uma cidadania completa nem concede, por si só, os direitos típicos de um passaporte ou de uma naturalização formal.",
  },
  {
    q: "O ID de Palau é residência?",
    a: "Não exatamente. Ele não funciona como uma residência tradicional com todos os direitos de permanência local. Trata-se de um documento emitido por um governo soberano, com usos específicos.",
  },
  {
    q: "Posso usar o ID de Palau em exchanges?",
    a: "Algumas exchanges podem aceitar o documento em processos de verificação, mas as regras mudam com frequência. Cada plataforma deve ser verificada no momento do onboarding.",
  },
  {
    q: "Posso abrir conta em qualquer banco usando o ID de Palau?",
    a: "Não. A maioria dos bancos tradicionais exige passaporte e comprovantes adicionais. O ID de Palau tende a ter utilidade maior em alguns neobanks e plataformas digitais.",
  },
  {
    q: "Preciso de comprovante de endereço?",
    a: "Em muitos casos, sim. Dependendo da instituição, só o documento não basta. Endereço e outros elementos de verificação podem ser exigidos.",
  },
  {
    q: "O ID de Palau substitui passaporte?",
    a: "Não. Ele não substitui passaporte em processos que exigem documento de viagem ou prova formal de nacionalidade.",
  },
  {
    q: "O ID de Palau resolve minha vida financeira internacional?",
    a: "Não sozinho. Ele pode ser útil em situações específicas, mas funciona melhor como parte de uma estrutura internacional mais ampla.",
  },
  {
    q: "Quanto custa o ID de Palau?",
    a: "Os planos podem variar conforme prazo de validade e taxas aplicáveis. Valores e regras podem mudar ao longo do tempo.",
  },
  {
    q: "O ID de Palau é legal?",
    a: "Sim, quando obtido e utilizado dentro das regras da plataforma emissora e das exigências das instituições envolvidas.",
  },
  {
    q: "Vale a pena fazer o ID de Palau?",
    a: "Depende do seu objetivo. Para algumas pessoas, ele pode ser uma peça útil de uma estratégia de privacidade e redundância documental. Para outras, isoladamente, pode não fazer sentido.",
  },
];

const EXCHANGES_LIST = ["Coinbase", "Bitget", "Gate.io", "KuCoin", "CEX.IO", "MEXC"];
const NEOBANKS_LIST = ["The Kingdom Bank", "Vexel", "Ultimopay", "Blackcatcard"];

const HOWTO_STEPS = [
  { title: "Solicitação", text: "Inicie o pedido pela plataforma responsável." },
  { title: "Verificação", text: "Passe pelo processo de validação exigido." },
  { title: "Emissão", text: "Aguarde a aprovação e a emissão do documento." },
  { title: "Entrega", text: "Receba o cartão físico onde estiver." },
  { title: "Configuração estratégica", text: "Avalie documentação complementar para usos específicos." },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Privacidade operacional",
    text: "Menor exposição direta da jurisdição de origem em alguns contextos operacionais.",
  },
  {
    icon: Globe,
    title: "Acesso internacional",
    text: "Possível utilidade em plataformas globais, sujeito a critérios de compliance.",
  },
  {
    icon: Sparkles,
    title: "Baixo custo de entrada",
    text: "Opção relativamente acessível em comparação com outras estruturas internacionais.",
  },
  {
    icon: Layers,
    title: "Processo online",
    text: "Solicitação digital, com emissão e envio físico globalmente.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────────
export default function PalauDigitalResidency() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const palauRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "20%"]);
  const heroImgScale = useTransform(heroProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.15]);

  const { scrollYProgress: palauProgress } = useScroll({
    target: palauRef,
    offset: ["start end", "end start"],
  });
  const palauY = useTransform(palauProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <div
      style={theme}
      className="relative min-h-screen w-full overflow-x-hidden text-[color:var(--ink)] antialiased"
    >
      {/* SEO + JSON-LD */}
      <Helmet>
        <title>ID de Palau: o que é, onde funciona e como usar com estratégia</title>
        <meta
          name="description"
          content="Entenda o que é o ID de Palau, onde ele pode ser usado, suas limitações, vantagens e como ele se encaixa em uma estratégia internacional de soberania pessoal."
        />
        <link rel="canonical" href="https://lordjunnior.com.br/palau-digital-residency" />
        <meta property="og:title" content="ID de Palau: o que é, onde funciona e como usar com estratégia" />
        <meta
          property="og:description"
          content="Guia editorial sobre o ID de Palau, suas aplicações práticas, limitações e papel dentro de uma estratégia maior de soberania pessoal."
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "ID de Palau: o que é, onde funciona e como usar com estratégia",
          description:
            "Guia editorial sobre o ID de Palau, suas aplicações práticas, limitações, uso em onboarding internacional e seu papel dentro de uma estratégia maior de soberania pessoal.",
          author: { "@type": "Person", name: "Lord Junnior" },
          publisher: { "@type": "Organization", name: "Lord Junnior" },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://lordjunnior.com.br/palau-digital-residency",
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como obter o ID de Palau",
          description: "Passo a passo editorial de como solicitar e entender o uso correto do ID de Palau.",
          step: HOWTO_STEPS.map((s) => ({
            "@type": "HowToStep",
            name: s.title,
            text: s.text,
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>

      {/* Local typography + atmosphere */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');
        .palau-page { background: var(--bg); }
        .palau-page h1, .palau-page h2, .palau-page h3, .palau-page .serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: -0.01em;
        }
        .palau-page, .palau-page p, .palau-page li, .palau-page button, .palau-page a, .palau-page span {
          font-family: 'Inter', system-ui, sans-serif;
        }
        .palau-page p { line-height: 1.75; }
        .palau-body { font-size: clamp(18px, 1.1vw + 14px, 22px); }
        .palau-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .palau-divider {
          background: linear-gradient(90deg, transparent, var(--line), transparent);
          height: 1px;
        }
        .palau-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.14 0 0 0 0 0.18 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: .07;
        }
        .palau-cta-primary {
          background: var(--blue);
          color: #FAF7F1;
          transition: all .35s ease;
          position: relative;
          overflow: hidden;
        }
        .palau-cta-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(176,138,74,.35) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform .7s ease;
        }
        .palau-cta-primary:hover::before { transform: translateX(100%); }
        .palau-cta-primary:hover { background: #16284A; transform: translateY(-2px); box-shadow: 0 18px 40px -18px rgba(31,53,96,.45); }
        .palau-cta-ghost {
          border: 1px solid var(--line);
          color: var(--ink);
          background: transparent;
          transition: all .35s ease;
        }
        .palau-cta-ghost:hover {
          border-color: var(--blue);
          background: var(--surface);
          transform: translateY(-2px);
        }
        .palau-card {
          background: var(--surface);
          border: 1px solid var(--line);
          transition: all .5s cubic-bezier(.22,1,.36,1);
        }
        .palau-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 60px -30px rgba(31,53,96,.25);
          border-color: rgba(176,138,74,.4);
        }
        .palau-card .palau-img { transition: transform .8s cubic-bezier(.22,1,.36,1); }
        .palau-card:hover .palau-img { transform: scale(1.06); }
        .palau-badge-float { animation: palauFloat 5s ease-in-out infinite; }
        @keyframes palauFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .palau-step-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 8vw, 110px);
          font-weight: 500;
          color: var(--gold);
          line-height: 1;
          font-style: italic;
        }
      `}</style>

      <div className="palau-page relative">
        {/* Atmospheric layers */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 40% at 15% 10%, rgba(176,138,74,0.08), transparent 70%), radial-gradient(50% 35% at 90% 80%, rgba(31,53,96,0.07), transparent 70%), radial-gradient(40% 30% at 50% 50%, rgba(46,90,79,0.05), transparent 70%)",
            }}
          />
          <div className="palau-grain absolute inset-0" />
        </div>

        <div className="relative z-10">
          {/* ═══════════════════ 1. HERO FULL-BLEED ═══════════════════ */}
          <section ref={heroRef} className="relative w-full overflow-hidden">
            <div className="grid w-full lg:grid-cols-12 lg:min-h-[100vh]">
              {/* LEFT - Text */}
              <div className="lg:col-span-6 flex items-center px-6 sm:px-10 lg:pl-16 lg:pr-12 py-20 lg:py-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                  className="w-full max-w-xl"
                >
                  <motion.div variants={fadeUp} className="palau-eyebrow text-[color:var(--gold)] mb-6">
                    Nova Camada de Soberania
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    className="font-medium leading-[0.95] mb-8"
                    style={{ fontSize: "clamp(56px, 8vw, 128px)", color: "var(--ink)" }}
                  >
                    ID de <em className="italic font-normal text-[color:var(--blue)]">Palau</em>
                  </motion.h1>

                  <motion.h2
                    variants={fadeUp}
                    className="font-normal mb-8"
                    style={{
                      fontSize: "clamp(22px, 1.8vw + 10px, 32px)",
                      color: "var(--ink-2)",
                      lineHeight: 1.4,
                    }}
                  >
                    Uma identidade internacional fora da sua jurisdição principal.
                  </motion.h2>

                  <motion.p variants={fadeUp} className="palau-body mb-10 text-[color:var(--ink-2)]">
                    A maioria das pessoas entende cidadania, residência e passaporte. Poucas entendem o papel de uma identidade
                    internacional emitida por um Estado soberano. Esta página mostra, de forma clara e prática, onde o ID de Palau se
                    encaixa, onde ele funciona e onde ele não resolve o problema.
                  </motion.p>

                  <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                    <a
                      href="#clareza"
                      className="palau-cta-primary inline-flex items-center gap-3 px-8 py-5 text-base font-semibold tracking-wide rounded-sm"
                    >
                      Entender como funciona
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#onde"
                      className="palau-cta-ghost inline-flex items-center gap-3 px-8 py-5 text-base font-semibold tracking-wide rounded-sm"
                    >
                      Ver onde pode ser usado
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT - Image */}
              <div className="relative lg:col-span-6 min-h-[60vh] lg:min-h-[100vh] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ y: heroImgY, scale: heroImgScale }}
                >
                  <img
                    src={heroImg}
                    alt="Mão segurando o cartão de identidade de Palau sobre uma mesa premium com mapa, passaporte e luz natural"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    width={1920}
                    height={1280}
                  />
                </motion.div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--bg) 0%, transparent 18%), linear-gradient(0deg, rgba(31,36,48,0.18), transparent 50%)",
                  }}
                />

                {/* Floating Badges */}
                <div className="hidden lg:flex absolute top-12 right-10 flex-col gap-4 max-w-[260px]">
                  {[
                    { icon: ShieldCheck, label: "Emitido por governo soberano" },
                    { icon: Globe, label: "Processo 100% online" },
                  ].map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: EASE }}
                      className="palau-badge-float"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    >
                      <div className="flex items-center gap-3 backdrop-blur-md bg-[color:var(--surface)]/85 border border-[color:var(--line)] px-5 py-3 rounded-sm shadow-xl">
                        <b.icon className="h-4 w-4 text-[color:var(--gold)]" />
                        <span className="text-sm font-medium text-[color:var(--ink)]">{b.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="hidden lg:flex absolute bottom-12 right-10 flex-col gap-4 max-w-[260px]">
                  {[
                    { icon: CheckCircle2, label: "Aceito em algumas plataformas" },
                    { icon: Sparkles, label: "Baixo custo inicial" },
                  ].map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.15, duration: 0.7, ease: EASE }}
                      className="palau-badge-float"
                      style={{ animationDelay: `${(i + 2) * 0.6}s` }}
                    >
                      <div className="flex items-center gap-3 backdrop-blur-md bg-[color:var(--surface)]/85 border border-[color:var(--line)] px-5 py-3 rounded-sm shadow-xl">
                        <b.icon className="h-4 w-4 text-[color:var(--green)]" />
                        <span className="text-sm font-medium text-[color:var(--ink)]">{b.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════ 2. CLAREZA INICIAL ═══════════════════ */}
          <section id="clareza" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="max-w-7xl mx-auto"
            >
              <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Clareza primeiro</div>
              <h2
                className="font-medium leading-[1] mb-16 max-w-4xl"
                style={{ fontSize: "clamp(40px, 5vw, 80px)", color: "var(--ink)" }}
              >
                O que o ID de Palau <em className="italic font-normal text-[color:var(--blue)]">não</em> é.
              </h2>

              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-7 space-y-10">
                  <ul className="space-y-5">
                    {[
                      "Não é cidadania completa.",
                      "Não é residência tradicional.",
                      "Não é passaporte.",
                      "Não garante, por si só, acesso universal a bancos e serviços.",
                    ].map((t, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                        className="flex items-start gap-5 palau-body"
                      >
                        <XCircle className="h-6 w-6 mt-1 text-[color:var(--blue)] shrink-0" />
                        <span className="text-[color:var(--ink)]">{t}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="palau-divider w-full my-10" />

                  <div>
                    <h3
                      className="font-medium mb-6"
                      style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "var(--ink)" }}
                    >
                      O que ele <em className="italic font-normal text-[color:var(--green)]">é</em>.
                    </h3>
                    <p className="palau-body text-[color:var(--ink-2)]">
                      Uma identidade emitida por um governo soberano, com utilidade prática em alguns processos de verificação e
                      onboarding internacional, especialmente quando inserida numa estratégia maior e acompanhada da documentação
                      complementar exigida por cada plataforma.
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE }}
                  className="lg:col-span-5 relative aspect-[4/5] overflow-hidden"
                >
                  <img
                    src={clarityImg}
                    alt="Documento físico, papéis institucionais e passaporte sobre mesa cor creme com luz natural"
                    className="palau-img h-full w-full object-cover"
                    loading="lazy"
                    width={1600}
                    height={1200}
                  />
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-[color:var(--surface)]/85 border border-[color:var(--line)] px-5 py-4">
                    <div className="palau-eyebrow text-[color:var(--gold)] mb-1">Documento oficial</div>
                    <div className="text-[color:var(--ink)] font-medium text-sm">Emitido por uma nação soberana</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Animated divider */}
          <div className="px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ originX: 0 }}
              className="palau-divider w-full"
            />
          </div>

          {/* ═══════════════════ 3. ONDE FUNCIONA ═══════════════════ */}
          <section id="onde" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="max-w-4xl mb-16 lg:mb-24"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Aplicação prática</div>
                <h2
                  className="font-medium leading-[1.02] mb-8"
                  style={{ fontSize: "clamp(40px, 5vw, 80px)", color: "var(--ink)" }}
                >
                  Onde o ID de Palau <em className="italic font-normal text-[color:var(--blue)]">pode</em> ser útil na prática.
                </h2>
                <p className="palau-body text-[color:var(--ink-2)]">
                  Nem toda utilidade é universal. O valor do documento está em casos específicos.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    img: exchangesImg,
                    alt: "Pessoa operando notebook com interface de exchange cripto e smartphone com aplicativo financeiro",
                    title: "Exchanges",
                    text: "Algumas exchanges aceitam o ID de Palau em seus processos de verificação, sujeito a mudanças de compliance.",
                    list: EXCHANGES_LIST,
                    accent: "var(--blue)",
                  },
                  {
                    img: neobanksImg,
                    alt: "Cartão premium dourado ao lado de smartphone exibindo aplicativo de neobank em mesa creme",
                    title: "Neobanks e fintechs",
                    text: "Algumas plataformas digitais podem aceitar o documento no onboarding, mas reputação e exigências devem ser verificadas caso a caso.",
                    list: NEOBANKS_LIST,
                    accent: "var(--green)",
                  },
                  {
                    img: roadmapImg,
                    alt: "Mapa-múndi com passaporte, identidade e bússola conectando pontos geográficos",
                    title: "Camada operacional internacional",
                    text: "O ID pode servir como peça complementar de uma estrutura internacional de documentação, onboarding e redundância.",
                    list: ["Onboarding internacional", "Redundância documental", "Estratégia patrimonial"],
                    accent: "var(--gold)",
                  },
                ].map((card, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
                    className="palau-card group flex flex-col rounded-sm overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.alt}
                        className="palau-img h-full w-full object-cover"
                        loading="lazy"
                        width={1600}
                        height={1200}
                      />
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col flex-1">
                      <div
                        className="h-[3px] w-12 mb-6"
                        style={{ background: card.accent }}
                      />
                      <h3
                        className="font-medium mb-4"
                        style={{ fontSize: "clamp(26px, 2vw, 34px)", color: "var(--ink)" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[17px] leading-[1.7] text-[color:var(--ink-2)] mb-6">{card.text}</p>
                      <ul className="space-y-2 mt-auto">
                        {card.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-[15px] text-[color:var(--ink)] font-medium"
                          >
                            <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════ 4. ERRO 99% ═══════════════════ */}
          <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16" style={{ background: "var(--bg-2)" }}>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="lg:col-span-7"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Quebra de crença</div>
                <h2
                  className="font-medium leading-[1.02] mb-8"
                  style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "var(--ink)" }}
                >
                  O erro que <em className="italic font-normal text-[color:var(--blue)]">99%</em> das pessoas comete.
                </h2>
                <p className="palau-body mb-10 text-[color:var(--ink)] font-medium">
                  Comprar o ID e imaginar que ele, sozinho, resolve tudo.
                </p>
                <p className="palau-body mb-6 text-[color:var(--ink-2)]">
                  Na prática, muitas plataformas também exigem:
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Comprovante de endereço.",
                    "Telefone local, em alguns casos.",
                    "Documentação complementar.",
                    "Alinhamento entre identidade e residência declarada.",
                  ].map((t, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                      className="flex items-start gap-4 text-[18px] leading-[1.7] text-[color:var(--ink)]"
                    >
                      <CheckCircle2 className="h-5 w-5 mt-1 text-[color:var(--green)] shrink-0" />
                      <span>{t}</span>
                    </motion.li>
                  ))}
                </ul>

                <blockquote
                  className="border-l-2 pl-6 py-4 italic"
                  style={{ borderColor: "var(--gold)", fontFamily: "Cormorant Garamond, serif" }}
                >
                  <p className="text-[24px] sm:text-[28px] leading-[1.5] text-[color:var(--ink)]">
                    O report fiscal não se baseia apenas no documento. Em geral, depende da residência informada e da política da
                    instituição.
                  </p>
                </blockquote>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="lg:col-span-5 relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={errorImg}
                  alt="Mesa creme organizada com documentos, passaporte, caderno de couro, caneta e xícara de café à luz natural"
                  className="palau-img h-full w-full object-cover"
                  loading="lazy"
                  width={1600}
                  height={1200}
                />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════ 5. LIMITAÇÕES ═══════════════════ */}
          <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="lg:col-span-6 order-2 lg:order-1 relative aspect-[5/4] overflow-hidden"
              >
                <img
                  src={bankImg}
                  alt="Lobby clássico de instituição bancária internacional com colunas de mármore creme e luz natural"
                  className="palau-img h-full w-full object-cover"
                  loading="lazy"
                  width={1600}
                  height={1200}
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="lg:col-span-6 order-1 lg:order-2"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Limitações reais</div>
                <h2
                  className="font-medium leading-[1.02] mb-8"
                  style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "var(--ink)" }}
                >
                  Onde o ID de Palau <em className="italic font-normal text-[color:var(--blue)]">não</em> resolve o problema.
                </h2>
                <p className="palau-body mb-8 text-[color:var(--ink-2)]">
                  A maioria dos bancos tradicionais e instituições fiduciárias clássicas não aceita apenas um ID local como documento
                  suficiente.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Bancos tradicionais costumam exigir passaporte.",
                    "Muitos exigem comprovante de residência robusto.",
                    "O ID sozinho não substitui uma estrutura internacional completa.",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-4 text-[18px] leading-[1.7] text-[color:var(--ink)]">
                      <span className="h-1.5 w-1.5 mt-3 rounded-full bg-[color:var(--blue)] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="serif italic text-[color:var(--ink)] border-t pt-8"
                  style={{ borderColor: "var(--line)", fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 1.4 }}
                >
                  Ferramenta útil não é solução total.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════ 6. POR QUE USAM ═══════════════════ */}
          <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16" style={{ background: "var(--bg-2)" }}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-4xl mb-16 lg:mb-24"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Vetores de adoção</div>
                <h2
                  className="font-medium leading-[1.02]"
                  style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "var(--ink)" }}
                >
                  Por que tantas pessoas se interessam pelo ID de Palau.
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {REASONS.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
                    className="palau-card p-8 lg:p-10 rounded-sm"
                  >
                    <r.icon className="h-8 w-8 mb-6 text-[color:var(--gold)]" strokeWidth={1.5} />
                    <h3
                      className="font-medium mb-4"
                      style={{ fontSize: "clamp(22px, 1.8vw, 28px)", color: "var(--ink)" }}
                    >
                      {r.title}
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[color:var(--ink-2)]">{r.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <a
                  href="#how-to"
                  className="palau-cta-ghost inline-flex items-center gap-3 px-8 py-5 text-base font-semibold rounded-sm"
                >
                  Ver o passo a passo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ═══════════════════ 7. HOW TO ═══════════════════ */}
          <section id="how-to" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-4xl mb-16 lg:mb-24"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Jornada</div>
                <h2
                  className="font-medium leading-[1.02] mb-8"
                  style={{ fontSize: "clamp(40px, 5vw, 76px)", color: "var(--ink)" }}
                >
                  Como obter o ID de Palau.
                </h2>
                <p className="palau-body text-[color:var(--ink-2)]">
                  Uma jornada simples na superfície, mas que exige entendimento correto do que o documento faz.
                </p>
              </motion.div>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[28px] sm:left-[42px] top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(180deg, var(--gold) 0%, var(--line) 100%)" }}
                />

                <div className="space-y-16 lg:space-y-20">
                  {HOWTO_STEPS.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
                      className="relative pl-20 sm:pl-32"
                    >
                      <div
                        className="absolute left-0 top-2 w-14 sm:w-20 h-14 sm:h-20 rounded-full flex items-center justify-center"
                        style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
                      >
                        <span className="palau-step-num text-[42px] sm:text-[56px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3
                        className="font-medium mb-4"
                        style={{ fontSize: "clamp(28px, 2.4vw, 40px)", color: "var(--ink)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="palau-body text-[color:var(--ink-2)] max-w-2xl">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════ 8. ROADMAP / CAMADA FUTURA ═══════════════════ */}
          <section ref={palauRef} className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden" style={{ background: "var(--bg-2)" }}>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ y: palauY }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(50% 40% at 80% 20%, rgba(176,138,74,0.18), transparent 70%), radial-gradient(40% 30% at 10% 80%, rgba(31,53,96,0.12), transparent 70%)",
                }}
              />
            </motion.div>

            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-6"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Camada futura</div>
                <h2
                  className="font-medium leading-[1.02] mb-8"
                  style={{ fontSize: "clamp(36px, 4.4vw, 68px)", color: "var(--ink)" }}
                >
                  Uma camada que pode <em className="italic font-normal text-[color:var(--blue)]">crescer de valor</em> com a estrutura certa.
                </h2>
                <p className="palau-body mb-10 text-[color:var(--ink-2)]">
                  O potencial do ID aumenta quando inserido em uma estratégia mais ampla de soberania pessoal, redundância documental
                  e presença internacional.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: MapPin, label: "Endereço local" },
                    { icon: Globe, label: "Número local" },
                    { icon: Layers, label: "Serviços complementares" },
                    { icon: Compass, label: "Estruturas operacionais" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 rounded-sm"
                      style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
                    >
                      <item.icon className="h-5 w-5 text-[color:var(--gold)]" strokeWidth={1.5} />
                      <span className="text-[16px] font-medium text-[color:var(--ink)]">{item.label}</span>
                    </div>
                  ))}
                </div>

                <p
                  className="serif italic border-l-2 pl-6 py-2"
                  style={{
                    borderColor: "var(--gold)",
                    fontSize: "clamp(22px, 2vw, 30px)",
                    color: "var(--ink)",
                    lineHeight: 1.45,
                  }}
                >
                  Sozinho, ele é limitado. Dentro de uma arquitetura maior, ele muda de patamar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="lg:col-span-6 relative aspect-[4/3] overflow-hidden"
              >
                <img
                  src={roadmapImg}
                  alt="Mapa-múndi com passaporte, ID e bússola conectando pontos geográficos sob luz natural"
                  className="palau-img h-full w-full object-cover"
                  loading="lazy"
                  width={1600}
                  height={1100}
                />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════ 9. TRANSIÇÃO / GANCHO ═══════════════════ */}
          <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="palau-eyebrow text-[color:var(--gold)] mb-8">Encaixe estratégico</div>
              <h2
                className="font-medium leading-[1.05] mb-10"
                style={{ fontSize: "clamp(36px, 4.6vw, 72px)", color: "var(--ink)" }}
              >
                O ID de Palau não <em className="italic font-normal text-[color:var(--blue)]">substitui</em> estratégia.
                <br />
                Ele <em className="italic font-normal text-[color:var(--green)]">complementa</em> estratégia.
              </h2>
              <p className="palau-body text-[color:var(--ink-2)] mb-12 max-w-3xl mx-auto">
                Esse documento faz mais sentido quando entendido como peça tática dentro de um plano maior de soberania, mobilidade e
                redundância internacional.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/teoria-das-bandeiras"
                  className="palau-cta-primary inline-flex items-center gap-3 px-10 py-5 text-base font-semibold rounded-sm"
                >
                  Ver a estratégia completa
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#faq"
                  className="palau-cta-ghost inline-flex items-center gap-3 px-10 py-5 text-base font-semibold rounded-sm"
                >
                  Entender onde ele se encaixa
                </a>
              </div>
            </motion.div>
          </section>

          {/* ═══════════════════ 10. FAQ ═══════════════════ */}
          <section id="faq" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16" style={{ background: "var(--bg-2)" }}>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mb-16 lg:mb-20"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-6">Perguntas frequentes</div>
                <h2
                  className="font-medium leading-[1.02]"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)", color: "var(--ink)" }}
                >
                  As <em className="italic font-normal text-[color:var(--blue)]">10 perguntas</em> mais importantes.
                </h2>
              </motion.div>

              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`q-${i}`}
                    className="border rounded-sm overflow-hidden"
                    style={{ background: "var(--surface)", borderColor: "var(--line)" }}
                  >
                    <AccordionTrigger
                      className="px-6 sm:px-8 py-6 hover:no-underline text-left group"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      <span
                        className="font-medium text-[color:var(--ink)] pr-6"
                        style={{ fontSize: "clamp(20px, 1.6vw, 26px)", lineHeight: 1.4 }}
                      >
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 sm:px-8 pb-7">
                      <p className="text-[18px] leading-[1.75] text-[color:var(--ink-2)]">{f.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* ═══════════════════ 11. CTA FINAL ═══════════════════ */}
          <section className="relative w-full overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={ctaImg}
                alt="Mesa premium com identidade, caderno de couro, caneta tinteiro, mapa e xícara de café à luz natural"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1920}
                height={1100}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(245,239,228,0.97) 0%, rgba(245,239,228,0.85) 50%, rgba(245,239,228,0.55) 100%)",
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 lg:py-44">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-3xl"
              >
                <div className="palau-eyebrow text-[color:var(--gold)] mb-8">Decisão consciente</div>
                <h2
                  className="font-medium leading-[1] mb-10"
                  style={{ fontSize: "clamp(48px, 6vw, 96px)", color: "var(--ink)" }}
                >
                  Clareza primeiro. <em className="italic font-normal text-[color:var(--blue)]">Estrutura</em> depois.
                </h2>
                <p className="palau-body mb-12 text-[color:var(--ink-2)]">
                  O valor do ID de Palau não está no hype. Está no uso correto. Quando você entende o que ele é, o que ele não é e
                  onde ele realmente funciona, a decisão fica mais inteligente.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/teoria-das-bandeiras"
                    className="palau-cta-primary inline-flex items-center gap-3 px-10 py-6 text-base font-semibold rounded-sm"
                  >
                    Ver como ele se encaixa na estratégia
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://rns.id/?rc_by=UaXUiIDb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="palau-cta-ghost inline-flex items-center gap-3 px-10 py-6 text-base font-semibold rounded-sm"
                  >
                    Continuar para o próximo passo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer of page */}
          <div className="px-6 sm:px-10 lg:px-16 py-12 border-t" style={{ borderColor: "var(--line)" }}>
            <BackToHome />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
