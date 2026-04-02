import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import {
  Wallet, ShieldCheck, QrCode, Zap, ArrowRight,
  AlertTriangle, Smartphone, Lock, Eye, Ban,
  CheckCircle2, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import CinematicHero from "@/components/CinematicHero";
import ScrollToTop from "@/components/ScrollToTop";
import SovereignDisclaimer from "@/components/SovereignDisclaimer";
import BackToHome from "@/components/BackToHome";
import PageFloatingToc from "@/components/PageFloatingToc";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

const BG_DARK = "#050808";
const BG_ALT = "#070b0b";

const tocItems = [
  { id: "problema", label: "O Problema" },
  { id: "carteira", label: "Passo 1: Carteira" },
  { id: "ponte", label: "Passo 2: A Ponte" },
  { id: "qrcode", label: "Passo 3: QR Code" },
  { id: "comparativo", label: "Comparativo" },
  { id: "faq", label: "FAQ" },
];

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Crie sua carteira descentralizada",
    desc: "Funciona como sua conta bancária, só que sem banco. Crie em poucos minutos usando MetaMask ou qualquer carteira non-custodial. Você controla o dinheiro através de uma chave privada que precisa ser guardada com máxima segurança.",
    highlight: "Sair de um sistema onde você pede permissão para um sistema onde você tem soberania total",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Conecte à plataforma de ponte",
    desc: "Crie uma conta em uma plataforma que faz a ponte entre o sistema descentralizado e o PIX. Ela transforma sua carteira internacional em algo funcional dentro do Brasil.",
    highlight: "A conexão entre o mundo descentralizado e o sistema financeiro local",
  },
  {
    number: "03",
    icon: Zap,
    title: "Gere seu QR Code e receba",
    desc: "Conecte sua carteira à plataforma e gere um QR Code. Qualquer pessoa te paga via PIX e o valor recebido é convertido automaticamente em dólar digital dentro da sua carteira.",
    highlight: "Elimina intermediários, reduz dependência e coloca o controle totalmente nas suas mãos",
  },
];

const problems = [
  { icon: Ban, label: "Contas bloqueadas sem aviso" },
  { icon: Eye, label: "Cada centavo monitorado" },
  { icon: Lock, label: "Limites impostos por terceiros" },
  { icon: AlertTriangle, label: "Fundos congelados judicialmente" },
];

const faqData = [
  {
    q: "Como receber PIX sem conta bancária passo a passo?",
    a: "Você cria uma carteira descentralizada (como MetaMask), conecta a uma plataforma de ponte (como DepixOnline) e gera um QR Code. Qualquer pessoa te paga via PIX e o valor é convertido automaticamente em dólar digital na sua carteira.",
  },
  {
    q: "É legal receber PIX sem banco no Brasil?",
    a: "Sim. Utilizar carteiras descentralizadas e plataformas de conversão é uma prática permitida. Você está usando ferramentas de código aberto para gerenciar seus próprios ativos digitais.",
  },
  {
    q: "Qual a diferença entre PIX via banco e PIX via carteira descentralizada?",
    a: "No banco, seus fundos podem ser bloqueados, monitorados e limitados por terceiros. Na carteira descentralizada, apenas você controla o saldo através da sua chave privada. O PIX funciona como mecanismo de entrada, não como custódia.",
  },
  {
    q: "Preciso de documentos ou KYC para receber PIX assim?",
    a: "A carteira descentralizada não exige documentos. Algumas plataformas de ponte podem ter verificações mínimas, mas existem alternativas P2P que operam sem KYC.",
  },
  {
    q: "O valor recebido fica em dólar digital?",
    a: "Sim. O valor em BRL recebido via PIX é convertido automaticamente em stablecoins (como USDT ou USDC) dentro da sua carteira. Isso protege seu poder de compra da inflação do real.",
  },
  {
    q: "Posso usar esse saldo para fazer pagamentos depois?",
    a: "Sim. Você pode enviar novos pagamentos, converter para outras criptomoedas ou gerar novos QR Codes para receber mais valores. A autonomia é total.",
  },
];

const PixSemBanco = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: BG_DARK }}>
      <Helmet>
        <title>Como Receber PIX Sem Banco | Método Descentralizado 2026</title>
        <meta name="description" content="Aprenda como receber PIX sem conta bancária usando carteira descentralizada. Método passo a passo, sem KYC, sem bloqueio. Controle total do seu dinheiro." />
        <meta name="keywords" content="pix sem banco, receber pix sem conta bancária, carteira descentralizada pix, pix via cripto, pix metamask, dólar digital pix" />
        <meta property="og:title" content="Como Receber PIX Sem Banco | Ninguém Te Mostra Isso" />
        <meta property="og:description" content="O método que transforma qualquer pessoa em seu próprio banco. Receba PIX direto na carteira descentralizada." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/pix-sem-banco" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Como Receber PIX Sem Banco",
          "description": "Método passo a passo para receber PIX usando carteira descentralizada, sem conta bancária tradicional.",
          "step": steps.map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": s.title,
            "text": s.desc,
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        })}</script>
      </Helmet>

      <ScrollToTop />
      <PageFloatingToc items={tocItems} />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: "128px 128px" }} />
      </div>

      {/* ═══ HERO ═══ */}
      <CinematicHero
        image="/heroes/economia-paralela.webp"
        phase="Soberania Financeira"
        title={<>Como Receber PIX <span style={{ color: "#f59e0b" }}>Sem Banco</span></>}
        subtitle="O método que ninguém está te mostrando. Receba pagamentos PIX direto na sua carteira descentralizada, sem conta bancária, sem KYC, sem pedir permissão."
        icon={Wallet}
        accentColor="amber"
        backLink="/soberania-financeira"
        backLabel="Soberania Financeira"
      />

      {/* ═══ DISCLAIMER ═══ */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        <SovereignDisclaimer variant="payment" />
      </div>

      {/* ═══ O PROBLEMA ═══ */}
      <section id="problema" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">O problema real</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Você ainda acha que precisa de banco para receber dinheiro?
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-8">
              Enquanto a maioria das pessoas continua presa em contas que podem ser bloqueadas, limitadas ou monitoradas, existe um caminho alternativo que poucos conhecem e menos ainda utilizam. Aqui, você não depende de aprovação, não pede autorização e não corre o risco de ter seus fundos congelados.
            </p>
            <p className="text-base md:text-lg text-white font-medium leading-relaxed">
              Tudo isso funciona hoje, de forma prática, acessível e replicável.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="grid grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1}
                className="rounded-2xl border border-red-500/10 p-5 flex flex-col items-center gap-3 text-center"
                style={{ background: "rgba(239,68,68,0.04)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/20">
                  <p.icon className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-sm text-stone-400 leading-snug">{p.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PASSO A PASSO ═══ */}
      {steps.map((step, i) => (
        <section
          key={step.number}
          id={i === 0 ? "carteira" : i === 1 ? "ponte" : "qrcode"}
          className="relative z-10 py-20 px-6 md:px-16 lg:px-24"
          style={{ background: i % 2 === 0 ? BG_DARK : BG_ALT }}
        >
          <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className={i % 2 !== 0 ? "lg:order-2" : ""}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-5xl font-black text-amber-400/20">{step.number}</span>
                <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase">Passo {step.number}</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                {step.title}
              </h2>
              <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-6">
                {step.desc}
              </p>
              <div className="rounded-xl border border-amber-500/15 p-5" style={{ background: "rgba(245,158,11,0.04)" }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-200/80 leading-relaxed">{step.highlight}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
              className={`flex justify-center ${i % 2 !== 0 ? "lg:order-1" : ""}`}
            >
              <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] p-8 flex flex-col items-center gap-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center border border-amber-500/20" style={{ background: "rgba(245,158,11,0.08)" }}>
                  <step.icon className="w-10 h-10 text-amber-400" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-[10px] tracking-widest text-stone-600 uppercase mb-2">Etapa {step.number}</p>
                  <p className="text-lg font-semibold text-white">{step.title}</p>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Controle total, sem intermediários</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ═══ COMPARATIVO ═══ */}
      <section id="comparativo" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Comparativo direto</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Banco Tradicional vs. Carteira Descentralizada
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="grid grid-cols-3 gap-0">
              <div className="p-4 md:p-6 border-b border-r border-white/[0.06]">
                <p className="font-mono text-[10px] tracking-widest text-stone-600 uppercase">Critério</p>
              </div>
              <div className="p-4 md:p-6 border-b border-r border-white/[0.06] text-center">
                <p className="font-mono text-[10px] tracking-widest text-red-400 uppercase">Banco</p>
              </div>
              <div className="p-4 md:p-6 border-b border-white/[0.06] text-center">
                <p className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">Descentralizado</p>
              </div>
              {[
                ["Bloqueio de conta", "Pode bloquear a qualquer momento", "Impossível bloquear"],
                ["Monitoramento", "Cada centavo rastreado", "Privacidade total"],
                ["Limites", "Limites diários e mensais", "Sem limites"],
                ["Horário", "Dias úteis, horário comercial", "24/7, sem pausa"],
                ["Documentos", "CPF, selfie, comprovante", "Nenhum documento"],
                ["Custódia", "Banco controla seus fundos", "Apenas você controla"],
              ].map(([criterio, banco, desc], i) => (
                <div key={i} className="contents">
                  <div className="p-4 md:p-6 border-b border-r border-white/[0.06]">
                    <p className="text-sm text-white font-medium">{criterio}</p>
                  </div>
                  <div className="p-4 md:p-6 border-b border-r border-white/[0.06] text-center">
                    <p className="text-sm text-stone-500">{banco}</p>
                  </div>
                  <div className="p-4 md:p-6 border-b border-white/[0.06] text-center">
                    <p className="text-sm text-emerald-400 font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA CENTRAL ═══ */}
      <section className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_DARK }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Próximo passo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              O controle do seu dinheiro começa agora
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-10">
              Não é teoria. É aplicação direta. Veja o tutorial completo com o passo a passo prático para configurar sua primeira carteira e receber seu primeiro PIX sem banco.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pix-cripto"
                className="px-8 py-4 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-3 text-stone-900 transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                <Zap className="w-4 h-4" />
                EXECUTAR PRIMEIRA OPERAÇÃO
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/saida/gateway"
                className="px-8 py-4 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-3 text-white border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                SIMULAR GATEWAY
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Dúvidas frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Perguntas que você precisa responder
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-white/[0.06] px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <AccordionTrigger className="text-left text-white hover:text-amber-400 transition-colors text-sm md:text-base py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-stone-400 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Not your keys. Not your money.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PixSemBanco;
