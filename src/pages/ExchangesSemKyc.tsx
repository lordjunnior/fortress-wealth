import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowLeft, Shield, AlertTriangle, ChevronRight,
  Lock, Eye, Zap, Globe, Search,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import NobelVFX from '@/components/NobelVFX';
import { useState } from 'react';
import heroImg from '@/assets/exchanges-nokyc-hero.jpg';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

/* ── Active Reviews ── */
const ACTIVE_REVIEWS = [
  {
    name: 'KYCNot.me',
    desc: 'Diretório que agrega e ranqueia plataformas por nível de privacidade.',
    type: 'Diretório',
    link: '/soberania-financeira/exchanges-sem-kyc/kycnot-me',
  },
  {
    name: 'Optima Exchange',
    desc: 'Troca de cripto por dinheiro vivo via Telegram, sem rastro digital.',
    type: 'P2P / Telegram',
    link: '/soberania-financeira/exchanges-sem-kyc/optima-exchange',
  },
  {
    name: 'PegasusSwap',
    desc: 'Swap instantâneo de 1.000+ criptos sem registro, sem documento, sem KYC oculto.',
    type: 'Swap Instantâneo',
    link: '/soberania-financeira/exchanges-sem-kyc/pegasus-swap',
  },
];

/* ── Upcoming Platforms ── */
const UPCOMING = [
  {
    rank: 1,
    name: 'Bisq',
    desc: 'Exchange P2P descentralizada com negociação direta entre usuários.',
    type: 'P2P',
    custodia: 'Não custodial',
    kyc: 'Não obrigatório',
    rede: 'Bitcoin',
    veredicto: 'Solução robusta para quem busca descentralização real.',
  },
  {
    rank: 2,
    name: 'SideShift AI',
    desc: 'Serviço de swap instantâneo entre diferentes criptomoedas.',
    type: 'Swap',
    custodia: 'Custodial temporário',
    kyc: 'Variável',
    rede: 'Multichain',
    veredicto: 'Simples para trocas rápidas entre ativos.',
  },
  {
    rank: 3,
    name: 'SimpleSwap',
    desc: 'Agregador de swaps com várias rotas de liquidez.',
    type: 'Agregador',
    custodia: 'Custodial temporário',
    kyc: 'Variável',
    rede: 'Multichain',
    veredicto: 'Interface simples e ampla cobertura de moedas.',
  },
];

const FAQ_ITEMS = [
  { q: 'O que significa KYC?', a: 'KYC significa "Know Your Customer" (Conheça Seu Cliente). É o processo de verificação de identidade exigido por instituições financeiras e exchanges regulamentadas. Envolve envio de documentos, selfies e comprovantes de residência.' },
  { q: 'Plataformas sem KYC são seguras?', a: 'Cada plataforma possui riscos e políticas próprias. Plataformas P2P e não custodiais reduzem o risco de perda por hack, mas exigem mais responsabilidade do usuário. Sempre pesquise antes de utilizar qualquer serviço.' },
  { q: 'Posso usar essas plataformas no Brasil?', a: 'O acesso depende das políticas da plataforma e da legislação vigente. Muitas operam globalmente, mas cada jurisdição possui regulamentações específicas. Este conteúdo é educativo e não constitui recomendação.' },
];

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Plataformas sem KYC — Exchanges e Serviços Privados',
  description: 'Diretório de plataformas sem verificação KYC: exchanges privadas, swaps e ferramentas para maior privacidade financeira.',
  url: 'https://autonomiadoindividuo.com/soberania-financeira/exchanges-sem-kyc',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const ExchangesSemKyc = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <>
      <LeadCaptureModal isOpen={leadOpen} onClose={() => setLeadOpen(false)} interesse="exchanges-sem-kyc" />
      <Helmet>
        <title>Plataformas sem KYC — Exchanges e Serviços Privados</title>
        <meta name="description" content="Descubra plataformas sem verificação KYC: exchanges privadas, swaps e ferramentas para maior privacidade financeira." />
        <link rel="canonical" href="https://autonomiadoindividuo.com/soberania-financeira/exchanges-sem-kyc" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <ScrollToTop />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        <NobelVFX accentColor="amber" />
        {/* ── Back Button ── */}
        <Link
          to="/soberania-financeira"
          className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
        >
          <ArrowLeft size={14} /> Soberania Financeira
        </Link>

        {/* ── Hero ── */}
        <div ref={heroRef} className="relative h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
            <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/40 via-transparent to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-3xl">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-400/70 mb-4">
                  PRIVACIDADE FINANCEIRA
                </p>
              </motion.div>
              <motion.h1
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Plataformas sem<br />
                <span className="text-emerald-400">Verificação KYC</span>
              </motion.h1>
              <motion.p
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
                className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
              >
                Explore serviços digitais que operam com maior foco em privacidade.
                Exchanges, swaps e ferramentas que podem ser utilizadas sem verificação obrigatória.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── Critical Alert ── */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={22} />
              <div>
                <h2 className="text-base font-bold text-amber-300 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Condição Crítica
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                  Existem dois caminhos comuns utilizados por usuários que buscam maior privacidade financeira:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <Lock size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-stone-300">Uso de plataformas digitais sem verificação</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Globe size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-stone-300">Estrutura jurídica alternativa como residência no Paraguai</span>
                  </div>
                </div>
                <p className="text-stone-500 text-xs mt-4">
                  Cada abordagem possui riscos e requisitos próprios. Sempre pesquise antes de utilizar qualquer serviço.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Active Reviews ── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/60 mb-2">ANÁLISES DISPONÍVEIS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Reviews Editoriais
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {ACTIVE_REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  to={r.link}
                  className="group block rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 hover:bg-emerald-500/[0.08] hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400/60">{r.type}</span>
                    <ChevronRight size={16} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Upcoming Platforms ── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/60 mb-2">EM BREVE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Plataformas que serão adicionadas
            </h2>
          </motion.div>
          <div className="space-y-4">
            {UPCOMING.map((p, i) => (
              <motion.div
                key={p.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber-400/50 bg-amber-500/10 px-2.5 py-1 rounded-full shrink-0">
                    Rank #{p.rank}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</h3>
                    <p className="text-stone-400 text-sm mt-1">{p.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] mb-4">
                  <div className="bg-white/[0.03] rounded-lg px-3 py-2">
                    <span className="text-stone-600 block">Tipo</span>
                    <span className="text-stone-300 font-semibold">{p.type}</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg px-3 py-2">
                    <span className="text-stone-600 block">Custódia</span>
                    <span className="text-stone-300 font-semibold">{p.custodia}</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg px-3 py-2">
                    <span className="text-stone-600 block">KYC</span>
                    <span className="text-stone-300 font-semibold">{p.kyc}</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg px-3 py-2">
                    <span className="text-stone-600 block">Rede</span>
                    <span className="text-stone-300 font-semibold">{p.rede}</span>
                  </div>
                </div>
                <p className="text-emerald-400/70 text-xs font-medium">
                  <span className="text-stone-600">Veredicto:</span> {p.veredicto}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Comparação de Plataformas
            </h2>
          </motion.div>
          <div className="hidden md:block rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] overflow-hidden">
            <div className="grid grid-cols-4 gap-2 px-6 py-4 border-b border-white/5 text-[10px] font-bold tracking-[0.15em] uppercase text-stone-500">
              <span>Plataforma</span><span>Tipo</span><span>KYC</span><span>Custódia</span>
            </div>
            {UPCOMING.map((p, i) => (
              <div key={p.name} className={`grid grid-cols-4 gap-2 px-6 py-4 text-sm ${i !== UPCOMING.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}>
                <span className="text-white font-semibold">{p.name}</span>
                <span className="text-stone-400">{p.type}</span>
                <span className="text-stone-400">{p.kyc}</span>
                <span className="text-stone-500">{p.custodia}</span>
              </div>
            ))}
          </div>
          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {UPCOMING.map((p) => (
              <div key={p.name} className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-4">
                <p className="text-white font-semibold text-sm mb-2">{p.name}</p>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div><span className="text-stone-600">Tipo:</span> <span className="text-stone-300">{p.type}</span></div>
                  <div><span className="text-stone-600">KYC:</span> <span className="text-stone-300">{p.kyc}</span></div>
                  <div><span className="text-stone-600">Custódia:</span> <span className="text-stone-300">{p.custodia}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 md:p-8 text-center"
          >
            <h2 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Receba atualizações das plataformas
            </h2>
            <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
              Novas plataformas privadas surgem constantemente. Receba atualizações quando novos serviços forem analisados.
            </p>
            <button
              onClick={() => setLeadOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300"
            >
              <Eye size={16} /> Acompanhar atualizações
            </button>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Perguntas Frequentes
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_ITEMS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                <AccordionTrigger className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 text-sm text-stone-200 hover:bg-white/[0.04] hover:no-underline transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="rounded-b-xl border border-t-0 border-white/5 bg-white/[0.02] px-5 pb-4 text-stone-400 text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-10 text-center">
          <Link to="/soberania-financeira" className="text-stone-600 text-xs tracking-widest uppercase hover:text-stone-400 transition-colors">
            ← Voltar ao Hub de Soberania Financeira
          </Link>
        </footer>
      </div>
    </>
  );
};

export default ExchangesSemKyc;
