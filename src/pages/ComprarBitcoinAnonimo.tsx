import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Shield, Eye, EyeOff, Zap, Download, Globe, Lock, UserX,
  CheckCircle, AlertTriangle, MessageSquare, ArrowRight, Bot, Wallet,
  ShieldCheck, Clock, Handshake, FileCheck, Smartphone, ExternalLink
} from "lucide-react";
import ScrollProgressBar from "@/components/confisco/ScrollProgressBar";

import ScrollToTop from "@/components/ScrollToTop";
import SnippetBait from "@/components/SnippetBait";
import RiskBlock from "@/components/RiskBlock";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";

import heroImg from "@/assets/robosats-hero.jpg";
import anonimatoImg from "@/assets/robosats-anonimato.jpg";
import prerequisitosImg from "@/assets/robosats-prerequisitos.jpg";
import p2pImg from "@/assets/robosats-p2p.jpg";
import plataformaImg from "@/assets/robosats-plataforma.jpg";
import escrowImg from "@/assets/robosats-escrow.jpg";
import segurancaImg from "@/assets/robosats-seguranca.jpg";
import sucessoImg from "@/assets/robosats-sucesso.jpg";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const chapters = [
  { id: "por-que", title: "Por Que Comprar Sem Documento?" },
  { id: "o-que-e-robosats", title: "O Que é a RoboSats?" },
  { id: "pre-requisitos", title: "Pré-Requisitos (3 Itens)" },
  { id: "passo-a-passo", title: "Tutorial: 8 Passos" },
  { id: "escrow", title: "Segurança: O Escrow" },
  { id: "cuidados", title: "Cuidados e Riscos" },
  { id: "faq", title: "Perguntas Frequentes" },
];

/* ── JSON-LD Schemas ── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como Comprar Bitcoin Anônimo por R$10 via RoboSats",
  description: "Guia completo passo a passo para comprar Bitcoin sem documentos usando RoboSats via Tor Browser e Lightning Network. Para iniciantes absolutos.",
  totalTime: "PT30M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: "10" },
  tool: [
    { "@type": "HowToTool", name: "Tor Browser" },
    { "@type": "HowToTool", name: "Carteira Lightning (Phoenix, Blixt ou Zeus)" },
  ],
  step: [
    { "@type": "HowToStep", name: "Instalar Tor Browser", text: "Baixe e instale o Tor Browser do site oficial torproject.org" },
    { "@type": "HowToStep", name: "Instalar Carteira Lightning", text: "Baixe uma carteira Lightning como Phoenix Wallet no seu celular" },
    { "@type": "HowToStep", name: "Acessar RoboSats via Tor", text: "Abra o Tor Browser e acesse robosats6tkf3eva7x2voqso3a5wcorsnw34jveyrat2fgdszj3id.onion" },
    { "@type": "HowToStep", name: "Gerar Identidade Robot", text: "Clique em Generate Robot para criar sua identidade temporária anônima" },
    { "@type": "HowToStep", name: "Encontrar Oferta de Venda", text: "No livro de ofertas, filtre por BRL e encontre vendedores com boa reputação" },
    { "@type": "HowToStep", name: "Criar ou Aceitar Ordem", text: "Aceite uma oferta existente ou crie sua própria ordem de compra" },
    { "@type": "HowToStep", name: "Depositar Fiança Lightning", text: "Deposite a fiança (bond) via Lightning para garantir a negociação" },
    { "@type": "HowToStep", name: "Enviar Pagamento e Receber BTC", text: "Envie o Pix ao vendedor, confirme no chat, e receba seus satoshis via Lightning" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "É ilegal comprar Bitcoin sem documentos no Brasil?",
      acceptedAnswer: { "@type": "Answer", text: "Não. Não existe lei no Brasil que obrigue a apresentação de documentos para comprar Bitcoin. A obrigação de KYC recai sobre as exchanges centralizadas, não sobre transações peer-to-peer entre indivíduos." },
    },
    {
      "@type": "Question",
      name: "Quanto custa para comprar Bitcoin na RoboSats?",
      acceptedAnswer: { "@type": "Answer", text: "Você pode comprar a partir de valores tão baixos quanto R$10. A RoboSats cobra uma taxa de aproximadamente 0,2% sobre cada transação, significativamente menor que exchanges tradicionais." },
    },
    {
      "@type": "Question",
      name: "O que é a Lightning Network?",
      acceptedAnswer: { "@type": "Answer", text: "A Lightning Network é uma camada construída sobre o Bitcoin que permite transações instantâneas e com taxas muito baixas. É como uma 'via expressa' para pagamentos rápidos em Bitcoin, ideal para valores menores." },
    },
    {
      "@type": "Question",
      name: "O que acontece se o vendedor não enviar os bitcoins?",
      acceptedAnswer: { "@type": "Answer", text: "A RoboSats utiliza um sistema de escrow (garantia). Os bitcoins do vendedor ficam travados em um contrato inteligente. Se ele não cumprir, perde a fiança e o comprador é reembolsado. O sistema protege ambos os lados." },
    },
    {
      "@type": "Question",
      name: "Preciso de VPN além do Tor Browser?",
      acceptedAnswer: { "@type": "Answer", text: "Não é necessário. O Tor Browser já criptografa sua conexão e oculta seu IP de forma mais eficaz que a maioria das VPNs. Usar VPN junto com Tor pode até reduzir a privacidade em alguns casos." },
    },
    {
      "@type": "Question",
      name: "A RoboSats funciona no celular?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. Você pode acessar a RoboSats pelo Tor Browser no Android, ou usar o Orbot + navegador no iOS. A interface é responsiva e funciona bem em telas menores." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://lordjunnior.com.br" },
    { "@type": "ListItem", position: 2, name: "Bitcoin", item: "https://lordjunnior.com.br/bitcoin" },
    { "@type": "ListItem", position: 3, name: "Comprar Bitcoin Anônimo", item: "https://lordjunnior.com.br/comprar-bitcoin-anonimo" },
  ],
};

/* ── Chapter Block Component ── */
const ChapterBlock = ({
  id, phase, title, icon: Icon, image, imageAlt, children, index,
}: {
  id: string; phase: string; title: string; icon: React.ElementType;
  image: string; imageAlt: string; children: React.ReactNode; index: number;
}) => {
  const ref = useRef(null);
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative"
    >
      {/* Image */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-sm">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        {/* Phase badge */}
        <motion.div custom={0} variants={fadeUp} className="absolute top-6 left-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
            <Icon className="w-3.5 h-3.5" />
            {phase}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 bg-card/60 backdrop-blur-sm border border-border/30 rounded-b-sm">
        <motion.h3 custom={1} variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
          {title}
        </motion.h3>
        <motion.div custom={2} variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ── Step Card Component ── */
const StepCard = ({
  number, title, description, tip, icon: Icon,
}: {
  number: number; title: string; description: string; tip?: string; icon: React.ElementType;
}) => (
  <motion.div
    custom={number}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    className="group relative p-6 rounded-sm border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/70 transition-all duration-500"
  >
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all" />
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
          <span className="text-primary font-bold text-lg">{number}</span>
        </div>
        <Icon className="absolute -bottom-1 -right-1 w-5 h-5 text-primary/60 bg-background rounded-full p-0.5" />
      </div>
      <div className="flex-1">
        <h4 className="text-foreground font-semibold mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        {tip && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-sm bg-amber-500/[0.06] border border-amber-500/15">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/80 leading-relaxed">{tip}</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── FAQ Item ── */
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const ref = useRef(null);
  return (
    <motion.details
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border border-border/30 rounded-sm bg-card/40 backdrop-blur-sm"
    >
      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-card/60 transition-colors">
        <span className="text-foreground font-medium text-sm pr-4">{q}</span>
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </motion.details>
  );
};

/* ══════════════════════ MAIN PAGE ══════════════════════ */
export default function ComprarBitcoinAnonimo() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Como Comprar Bitcoin Anônimo por R$10 | Guia RoboSats Completo 2026</title>
        <meta name="description" content="Aprenda a comprar Bitcoin sem documentos, sem KYC, a partir de R$10 usando RoboSats e Lightning Network. Tutorial passo a passo para iniciantes absolutos. Seu dinheiro, suas regras." />
        <meta name="keywords" content="comprar bitcoin anônimo, bitcoin sem kyc, robosats tutorial, bitcoin sem documento, comprar bitcoin pix anônimo, lightning network, bitcoin privacidade" />
        <link rel="canonical" href="https://lordjunnior.com.br/comprar-bitcoin-anonimo" />
        <meta property="og:title" content="Comprar Bitcoin Anônimo por R$10 — Sem Documento, Sem Rastro" />
        <meta property="og:description" content="O guia definitivo para comprar Bitcoin sem KYC. De R$10 a soberania financeira total." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/comprar-bitcoin-anonimo" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <ScrollProgressBar />
      <FloatingToc chapters={chapters} />
      <ScrollToTop />
      <AppSidebar />
      <MobileNav />

      <div className="lg:ml-[260px]">
        {/* ════════ HERO ════════ */}
        <header ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-end">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <img
              src={heroImg}
              alt="Pessoa segurando smartphone com interface Lightning Bitcoin em ambiente noturno"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ filter: "brightness(0.3) saturate(0.85)" }}
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(247,147,26,0.08),_transparent_60%)] z-[1]" />

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-4xl">
            {/* Breadcrumb */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-2 mb-6">
              <Link to="/bitcoin" className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-wider uppercase">
                Bitcoin
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-primary/70 text-xs font-mono tracking-wider uppercase">Compra Anônima</span>
            </motion.div>

            {/* Pre-title */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-[ping_2.5s_ease-in-out_infinite]" />
                <EyeOff className="relative w-5 h-5 text-primary" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase font-bold">
                Guia de Soberania · Nível: Iniciante Absoluto
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[0.95]"
            >
              Seu Primeiro Bitcoin{" "}
              <span className="text-primary">Sem Rastro</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
            >
              R$10 é tudo que você precisa. Sem CPF. Sem selfie. Sem banco.
              Neste guia, você vai comprar Bitcoin pela primeira vez usando uma ferramenta que{" "}
              <span className="text-foreground font-semibold">nenhuma exchange controla</span>.
            </motion.p>

            {/* CTA */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-4">
              <a
                href="#pre-requisitos"
                className="group inline-flex items-center gap-3 py-4 px-8 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                Começar Agora — É Grátis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </a>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                Tempo estimado: 30 min · Custo: R$10
              </span>
            </motion.div>
          </motion.div>
        </header>

        {/* ════════ CONTENT ════════ */}
        <main className="relative z-10 px-5 md:px-8 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">

            {/* ── SNIPPET BAIT ── */}
            <SnippetBait
              text="Para comprar Bitcoin anônimo no Brasil em 2026, use a RoboSats via Tor Browser: instale uma carteira Lightning (Phoenix), acesse a plataforma .onion, gere um Robot ID, encontre uma oferta em BRL, deposite a fiança via Lightning, envie o Pix ao vendedor e receba seus satoshis automaticamente. Sem CPF, sem selfie, sem limites arbitrários."
              cta="Leia o guia completo abaixo ↓"
              href="#por-que"
            />

            {/* ── CAP 1: POR QUE ANONIMATO ── */}
            <ChapterBlock
              id="por-que"
              phase="Capítulo 1"
              title="Por Que Comprar Bitcoin Sem Documentos?"
              icon={EyeOff}
              image={anonimatoImg}
              imageAlt="Câmera de vigilância em rua urbana noturna — conceito de privacidade financeira"
              index={0}
            >
              <p>
                Você não precisa ser criminoso para querer privacidade. Você tranca a porta do banheiro mesmo sem ter nada a esconder. Você fecha o extrato bancário quando alguém olha por cima do seu ombro. <strong className="text-foreground">Privacidade é um direito, não um privilégio.</strong>
              </p>
              <p>
                Quando você compra Bitcoin em uma exchange tradicional (como Binance, Mercado Bitcoin ou Foxbit), você entrega:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  "CPF, RG e comprovante de endereço",
                  "Selfie com documento (reconhecimento facial)",
                  "Dados bancários completos",
                  "Histórico de todas as suas transações",
                  "Sua identidade vinculada permanentemente a cada satoshi comprado",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Eye className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Esses dados ficam armazenados para sempre nos servidores dessas empresas. Se houver um vazamento de dados (e vazamentos acontecem o tempo todo), <strong className="text-foreground">criminosos saberão exatamente quanto Bitcoin você tem e onde você mora</strong>.
              </p>
              <p>
                Comprar sem KYC (Know Your Customer) significa: <strong className="text-foreground">você compra Bitcoin diretamente de outra pessoa, sem intermediários, sem câmeras, sem formulários</strong>. É assim que o Bitcoin foi projetado para funcionar desde o primeiro dia.
              </p>

              {/* Mini alert */}
              <div className="mt-4 p-4 rounded-sm border border-amber-500/20 bg-amber-500/[0.05]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300 mb-1">Isso é legal?</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sim. Não existe nenhuma lei no Brasil que obrigue a apresentação de documentos para comprar Bitcoin entre pessoas físicas. A obrigação de KYC recai sobre instituições financeiras regulamentadas, não sobre transações peer-to-peer. Você está exercendo seu direito constitucional à privacidade (Art. 5º, X e XII da CF/88).
                    </p>
                  </div>
                </div>
              </div>
            </ChapterBlock>

            {/* ── CAP 2: O QUE É ROBOSATS ── */}
            <ChapterBlock
              id="o-que-e-robosats"
              phase="Capítulo 2"
              title="O Que é a RoboSats? (Explicado Para Leigos)"
              icon={Bot}
              image={plataformaImg}
              imageAlt="Robô operando múltiplas telas com livro de ofertas Bitcoin — marketplace peer-to-peer"
              index={1}
            >
              <p>
                Imagine um mercado livre de Bitcoin. Não existe dono. Não existe empresa. Não existe servidor central que pode ser desligado. <strong className="text-foreground">A RoboSats é um marketplace peer-to-peer (pessoa a pessoa) que funciona dentro do Tor Browser.</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                {[
                  { icon: UserX, label: "100% Anônimo", desc: "Sem cadastro, sem e-mail, sem documentos. Sua identidade é um robô aleatório." },
                  { icon: Zap, label: "Via Lightning", desc: "Pagamentos instantâneos e com taxas quase zero. Receba em segundos." },
                  { icon: Lock, label: "Escrow Seguro", desc: "Garantia automática: se o vendedor não cumprir, ele perde dinheiro, não você." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-4 rounded-sm border border-border/30 bg-card/40">
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <p>
                Funciona assim: vendedores publicam ofertas dizendo "vendo X satoshis por Y reais". Compradores escolhem a oferta, pagam via Pix (ou outro método), e recebem os satoshis automaticamente via Lightning Network. O robô da RoboSats garante que ninguém trapaceie.
              </p>
              <p className="text-sm italic text-muted-foreground/70">
                Pense na RoboSats como um "Uber do Bitcoin": conecta compradores e vendedores diretamente, sem intermediário. Mas diferente do Uber, <strong className="text-foreground/80">ninguém sabe quem você é</strong>.
              </p>
            </ChapterBlock>

            {/* ── CAP 3: PRÉ-REQUISITOS ── */}
            <ChapterBlock
              id="pre-requisitos"
              phase="Capítulo 3"
              title="Antes de Começar: 3 Itens Obrigatórios"
              icon={Download}
              image={prerequisitosImg}
              imageAlt="Laptop com Tor Browser e carteira Lightning sobre mesa escura — ferramentas de privacidade"
              index={2}
            >
              <p className="mb-6">
                Você só precisa de 3 coisas para começar. Todas são <strong className="text-foreground">gratuitas</strong> e levam menos de 10 minutos para configurar.
              </p>

              {/* Item 1 */}
              <div className="p-5 rounded-sm border border-border/30 bg-card/40 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">1. Tor Browser (Navegador Anônimo)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      O Tor Browser é um navegador gratuito que esconde seu endereço IP (sua "localização digital"). É o mesmo navegador usado por jornalistas, ativistas e denunciantes no mundo inteiro para se proteger de governos autoritários.
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      <strong className="text-foreground/80">Onde baixar:</strong> Vá em <span className="text-primary font-mono">torproject.org</span> e clique em "Download". Instale como qualquer programa normal. No Android, procure "Tor Browser" na Play Store.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-5 rounded-sm border border-border/30 bg-card/40 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                    <Wallet className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">2. Carteira Lightning (Sua "Conta" de Bitcoin)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Uma carteira Lightning é um aplicativo no seu celular que funciona como uma "conta bancária" de Bitcoin — mas sem banco. Você é o dono. Ninguém pode bloquear, congelar ou confiscar.
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-2">
                      <strong className="text-foreground/80">Recomendação para iniciantes:</strong> <span className="text-primary">Phoenix Wallet</span> (Android/iOS). É a mais simples e confiável. Baixe, abra, e pronto — sua carteira está criada em 30 segundos.
                    </p>
                    <p className="text-xs text-muted-foreground/60 italic">
                      Alternativas: Blixt Wallet, Zeus, Breez. Todas são gratuitas e não pedem seus dados.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-5 rounded-sm border border-border/30 bg-card/40">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">3. Pix Ativo (Para Pagar o Vendedor)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Você vai pagar o vendedor de Bitcoin via Pix (ou outro método que ele aceite). Qualquer conta bancária com Pix funciona. O vendedor só verá seu nome no comprovante do Pix — nenhum outro dado pessoal é compartilhado com a RoboSats.
                    </p>
                  </div>
                </div>
              </div>
            </ChapterBlock>

            {/* ── CAP 4: PASSO A PASSO ── */}
            <section id="passo-a-passo" className="space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {/* Section image */}
                <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-sm mb-0">
                  <img src={p2pImg} alt="Mão segurando moeda Bitcoin sob luz de velas — troca peer-to-peer" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                  <motion.div custom={0} variants={fadeUp} className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                      <FileCheck className="w-3.5 h-3.5" />
                      Tutorial Completo
                    </span>
                  </motion.div>
                </div>
                <div className="p-8 md:p-10 bg-card/60 backdrop-blur-sm border border-border/30 rounded-b-sm mb-8">
                  <motion.h3 custom={1} variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                    8 Passos Para Sua Primeira Compra
                  </motion.h3>
                  <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed">
                    Siga cada passo exatamente como descrito. Se é sua primeira vez, vá com calma. <strong className="text-foreground">R$10 é suficiente para aprender sem risco.</strong>
                  </motion.p>
                </div>
              </motion.div>

              <div className="space-y-4">
                <StepCard
                  number={1}
                  title="Abra o Tor Browser"
                  description="Abra o Tor Browser que você instalou. Ele vai se conectar à rede Tor automaticamente (pode levar 10-30 segundos). Quando a barra de progresso chegar a 100%, você está conectado e anônimo."
                  tip="Se estiver lento, não se preocupe. O Tor é mais lento que um navegador normal porque sua conexão passa por 3 computadores diferentes pelo mundo para esconder quem você é."
                  icon={Globe}
                />
                <StepCard
                  number={2}
                  title="Acesse a RoboSats"
                  description="Na barra de endereço do Tor Browser, cole o endereço .onion da RoboSats. Ele é longo e estranho — isso é normal. Endereços .onion são como 'endereços secretos' que só funcionam no Tor. Você também pode acessar unsafe.robosats.com pelo navegador normal para fins de teste (menos privado)."
                  tip="Salve o endereço .onion nos favoritos do Tor Browser para não precisar digitar novamente. Nunca acesse a RoboSats por links de terceiros — sempre use o endereço oficial."
                  icon={ExternalLink}
                />
                <StepCard
                  number={3}
                  title="Gere Seu Robot (Identidade Anônima)"
                  description="Ao entrar na RoboSats, clique em 'Generate Robot'. O sistema vai criar um apelido aleatório e um avatar de robô para você. Essa é sua identidade na plataforma — não está vinculada a nenhum dado pessoal. IMPORTANTE: Copie e salve o token que aparecer. Esse token é seu 'login'. Se fechar o navegador, você precisará dele para voltar à mesma identidade."
                  tip="Anote o token em um papel ou salve em um gerenciador de senhas. Sem ele, você perde acesso a negociações em andamento."
                  icon={Bot}
                />
                <StepCard
                  number={4}
                  title="Explore o Livro de Ofertas"
                  description="Clique em 'Offers' para ver as ofertas disponíveis. Filtre por moeda: selecione 'BRL' (Real Brasileiro). Você verá uma lista de vendedores oferecendo Bitcoin em troca de Pix. Cada oferta mostra: preço por BTC, método de pagamento aceito, valor mínimo/máximo e reputação do vendedor."
                  tip="Prefira vendedores com muitas negociações concluídas (ícone de estrela). No início, escolha ofertas que aceitem 'Pix' como método de pagamento — é o mais rápido."
                  icon={MessageSquare}
                />
                <StepCard
                  number={5}
                  title="Aceite Uma Oferta de Compra"
                  description="Encontrou uma oferta boa? Clique nela. Defina o valor que quer comprar (comece com R$10-R$50 para testar). Clique em 'Take Order' (Aceitar Ordem). A RoboSats vai pedir que você deposite uma 'fiança' (bond) via Lightning. Essa fiança é pequena (geralmente 3% do valor) e serve para provar que você é sério."
                  tip="A fiança volta para você depois que a negociação terminar com sucesso. Ela só é perdida se você abandonar a negociação no meio."
                  icon={Handshake}
                />
                <StepCard
                  number={6}
                  title="Deposite a Fiança via Lightning"
                  description="A RoboSats vai gerar um 'invoice' Lightning (um código QR ou texto). Abra sua carteira Phoenix (ou outra Lightning), escaneie o QR Code ou cole o texto, e confirme o pagamento. A fiança é processada em segundos."
                  tip="Se sua carteira Phoenix estiver vazia, você precisará de um pequeno saldo inicial para pagar a fiança. Peça a um amigo para enviar alguns satoshis, ou faça uma primeira compra pequena em uma exchange apenas para ter saldo na Lightning."
                  icon={Zap}
                />
                <StepCard
                  number={7}
                  title="Faça o Pix ao Vendedor"
                  description="Após ambos depositarem a fiança, um chat criptografado será aberto entre você e o vendedor. O vendedor vai enviar a chave Pix dele. Abra o app do seu banco, faça o Pix no valor combinado e envie o comprovante no chat da RoboSats. Clique em 'Confirmar Pagamento Enviado'."
                  tip="Nunca pague fora do valor combinado na RoboSats. Se o vendedor pedir para enviar para outra conta ou valor diferente, cancele a operação imediatamente."
                  icon={CheckCircle}
                />
                <StepCard
                  number={8}
                  title="Receba Seus Satoshis!"
                  description="Assim que o vendedor confirmar que recebeu o Pix, a RoboSats libera automaticamente os satoshis para sua carteira Lightning. Em segundos, você verá o saldo aparecer na sua Phoenix Wallet. Parabéns: você acabou de comprar Bitcoin sem entregar um único documento."
                  tip="Seus satoshis estão agora na sua carteira Lightning, sob seu controle total. Nenhum governo, banco ou empresa pode congelá-los ou confiscá-los."
                  icon={ShieldCheck}
                />
              </div>
            </section>

            {/* ── CAP 5: ESCROW ── */}
            <ChapterBlock
              id="escrow"
              phase="Capítulo 5"
              title="Como a RoboSats Protege Você (Sistema de Escrow)"
              icon={Shield}
              image={escrowImg}
              imageAlt="Smartphone com interface de chat criptografado e ícones de segurança — sistema escrow"
              index={4}
            >
              <p>
                "Mas e se o vendedor pegar meu Pix e não enviar os bitcoins?" — Esta é a pergunta mais importante, e a resposta é o que torna a RoboSats segura.
              </p>
              <p>
                A RoboSats usa um sistema chamado <strong className="text-foreground">escrow (garantia)</strong>. Funciona assim:
              </p>
              <ol className="space-y-3 pl-4 list-decimal list-inside">
                <li className="text-sm"><strong className="text-foreground">Antes da negociação:</strong> O vendedor deposita os bitcoins + fiança em um "cofre digital" controlado pela RoboSats. Ele não tem acesso a esse dinheiro.</li>
                <li className="text-sm"><strong className="text-foreground">Durante a negociação:</strong> Você faz o Pix. O dinheiro do vendedor continua travado no cofre.</li>
                <li className="text-sm"><strong className="text-foreground">Após confirmação:</strong> Quando o vendedor confirma que recebeu o Pix, o cofre libera automaticamente os bitcoins para você.</li>
                <li className="text-sm"><strong className="text-foreground">Se houver disputa:</strong> Se o vendedor não confirmar (tentativa de golpe), você abre uma disputa. Um mediador analisa as evidências (comprovante do Pix) e decide a favor de quem tem razão.</li>
              </ol>
              <p className="mt-4">
                <strong className="text-foreground">Resumo:</strong> O vendedor tem mais a perder do que você. Se ele tentar trapacear, perde a fiança E os bitcoins. O sistema é desenhado para tornar a honestidade a opção mais lucrativa.
              </p>
            </ChapterBlock>

            {/* ── CAP 6: CUIDADOS ── */}
            <ChapterBlock
              id="cuidados"
              phase="Capítulo 6"
              title="Cuidados Essenciais e Riscos Reais"
              icon={AlertTriangle}
              image={segurancaImg}
              imageAlt="Escudo com cadeado brilhando em âmbar sobre fundo escuro — segurança e precaução"
              index={5}
            >
              <div className="space-y-4">
                {[
                  { title: "Comece Pequeno", desc: "Sua primeira compra deve ser de R$10 a R$50. Aprenda o processo antes de aumentar os valores. Erros com R$10 são lições; erros com R$1.000 são prejuízo." },
                  { title: "Nunca Compartilhe Seu Token Robot", desc: "O token é seu acesso à identidade na RoboSats. Se alguém tiver seu token, pode acessar suas negociações em andamento." },
                  { title: "Verifique o Endereço .onion", desc: "Sempre acesse a RoboSats pelo endereço oficial. Sites falsos (phishing) podem parecer idênticos mas roubam suas fianças. Confira o endereço caractere por caractere." },
                  { title: "Não Negocie Fora da Plataforma", desc: "Se um vendedor pedir para continuar a conversa no Telegram ou WhatsApp, recuse. Fora da plataforma, o escrow não funciona e você perde a proteção." },
                  { title: "Backup da Carteira Lightning", desc: "Após receber os satoshis, faça backup da sua carteira Phoenix. Anote as 12 palavras de recuperação (seed) em papel e guarde em local seguro. Se perder o celular, essas palavras são sua única forma de recuperar os bitcoins." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-sm border border-destructive/15 bg-destructive/[0.03]">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChapterBlock>

            {/* ── SUCCESS IMAGE ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-56 md:h-72 overflow-hidden rounded-sm"
            >
              <img src={sucessoImg} alt="Mão segurando celular com confirmação de compra Bitcoin bem-sucedida" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Você agora é <span className="text-primary">soberano</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Seus primeiros satoshis estão na sua carteira. Sem intermediários. Sem permissão.</p>
              </div>
            </motion.div>

            {/* ── RISK BLOCK ── */}
            <RiskBlock
              title="Sem privacidade financeira, o que acontece?"
              consequences={[
                "Suas compras de Bitcoin ficam vinculadas permanentemente à sua identidade civil em bancos de dados de exchanges.",
                "Vazamentos de dados expõem exatamente quanto Bitcoin você possui e onde mora — tornando você alvo de criminosos.",
                "Governos podem rastrear, taxar retroativamente ou até confiscar seus ativos digitais com uma simples ordem judicial.",
                "Seu histórico financeiro completo fica disponível para empresas, seguradoras e empregadores que compram dados vazados.",
                "Sem o conhecimento de compra anônima, você depende 100% de intermediários que podem bloquear seu acesso a qualquer momento.",
              ]}
            />

            {/* ── FAQ ── */}
            <section id="faq" className="space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h3 custom={0} variants={fadeUp} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Perguntas Frequentes
                </motion.h3>
                <motion.p custom={1} variants={fadeUp} className="text-muted-foreground text-sm mb-6">
                  As dúvidas mais comuns de quem está comprando Bitcoin pela primeira vez sem KYC.
                </motion.p>
              </motion.div>

              <div className="space-y-3">
                {faqSchema.mainEntity.map((item, i) => (
                  <FaqItem key={i} q={item.name} a={item.acceptedAnswer.text} />
                ))}
              </div>
            </section>

            {/* ── FINAL CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12 space-y-6"
            >
              <p className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Pronto para <span className="text-primary">comprar sem rastro</span>?
              </p>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                O primeiro passo é sempre o mais difícil. Mas com R$10 e 30 minutos, você quebra a maior barreira: o medo do desconhecido.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#pre-requisitos"
                  className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.18] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Voltar ao Passo 1
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </a>
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 py-4 px-8 rounded-sm border border-border/30 bg-card/40 hover:bg-card/60 text-foreground text-sm transition-all"
                >
                  Próximo Nível: Autocustódia →
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/50 italic mt-6">
                "Quem controla as chaves, controla o futuro." — Este guia é educacional. Suas decisões financeiras são sua responsabilidade.
              </p>
            </motion.div>

            {/* ── BACK ── */}
            <div className="pt-8 border-t border-border/20">
              <Link
                to="/bitcoin"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Bitcoin
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
