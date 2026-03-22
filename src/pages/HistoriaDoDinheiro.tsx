import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight, ChevronDown, Zap, HelpCircle, Clock, ArrowDown, AlertTriangle, Coins } from 'lucide-react';
import { NAV_ITEMS, ERAS, TIMELINE_ITEMS, CONSEQUENCIAS, FAQ_ITEMS } from '@/lib/historiaDinheiroData';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import NoiseBackground from '@/components/NoiseBackground';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "A História do Dinheiro: Do Escambo ao Bitcoin",
  "description": "A história completa do dinheiro: escambo, ouro, papel-moeda, bancos centrais, Nixon Shock de 1971 e o surgimento do Bitcoin como resposta.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07", "dateModified": "2026-03-07",
  "url": "https://lordjunnior.com.br/historia-do-dinheiro",
  "keywords": "história do dinheiro, origem do dinheiro, como surgiu o dinheiro, padrão ouro, moeda fiat, Nixon Shock 1971, banco central, Bitcoin, o que é dinheiro"
};

const TAMBEM_ACONTECEU: Record<string, { ano: string; fato: string }[]> = {
  'escambo': [
    { ano: '~9000 a.C.', fato: 'Primeiras comunidades agrícolas no Crescente Fértil' },
    { ano: '~5000 a.C.', fato: 'Civilização suméria desenvolve a escrita cuneiforme' },
    { ano: '~3000 a.C.', fato: 'Egito unificado sob o primeiro faraó' },
  ],
  'ouro': [
    { ano: '~600 a.C.', fato: 'Lídia cunha as primeiras moedas padronizadas' },
    { ano: '27 a.C.', fato: 'Roma estabelece o denário como moeda oficial do Império' },
    { ano: '1252', fato: 'Florença cunha o florim de ouro, padrão monetário europeu' },
  ],
  'papel': [
    { ano: '1694', fato: 'Criação do Bank of England para financiar guerras' },
    { ano: '1716', fato: 'John Law cria o primeiro esquema de papel-moeda na França, que colapsa em 4 anos' },
    { ano: '1913', fato: 'Criação do Federal Reserve nos Estados Unidos' },
  ],
  'banco-central': [
    { ano: '1933', fato: 'Roosevelt confisca o ouro dos cidadãos americanos' },
    { ano: '1944', fato: 'Acordo de Bretton Woods estabelece o dólar como reserva mundial' },
    { ano: '1964', fato: 'Criação do Banco Central do Brasil' },
  ],
  'nixon': [
    { ano: '1971', fato: 'Nixon encerra a conversibilidade dólar-ouro' },
    { ano: '1980', fato: 'Brasil entra em espiral de hiperinflação' },
    { ano: '1990', fato: 'Confisco Collor: governo brasileiro congela poupanças' },
    { ano: '2009', fato: 'Satoshi Nakamoto lança a rede Bitcoin' },
  ],
};


const TOC_ITEMS = [
  { id: "timeline", label: "Cronologia" },
  { id: "consequencias", label: "Diagnóstico" },
  { id: "bitcoin-saida", label: "Bitcoin: A Saída" },
  { id: "faq", label: "FAQ" },
];

export default function HistoriaDoDinheiro() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { springX, springY } = useMouseParallax(8);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden"
      style={{ background: '#050808' }}>

      <Helmet>
        <title>A História do Dinheiro: Do Escambo ao Bitcoin | Lord Junnior</title>
        <meta name="description" content="A história completa do dinheiro: do escambo ao ouro, do papel-moeda aos bancos centrais, do Nixon Shock ao Bitcoin. Entenda como o dinheiro foi corrompido e como se proteger." />
        <link rel="canonical" href="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:title" content="A História do Dinheiro: Do Escambo ao Bitcoin" />
        <meta property="og:description" content="Entenda como o dinheiro foi criado, corrompido e como o Bitcoin representa a resposta." />
        <meta property="og:url" content="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
      <NoiseBackground />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(245,158,11,0.06) 50%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ background: 'linear-gradient(225deg, transparent 40%, rgba(212,175,55,0.05) 55%, transparent 75%)' }} />
      </div>

      {/* ─── BREATHING ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-400/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/historia-dinheiro.webp"
        phase="Educação Monetária"
        title={<>A História do Dinheiro<br /><span className="italic" style={{ color: '#fbbf24' }}>Que Nunca Te Contaram</span></>}
        subtitle="Do escambo ao ouro, do papel-moeda aos bancos centrais, do Nixon Shock de 1971 ao Bitcoin. A história completa de como o dinheiro foi criado, corrompido — e como a humanidade encontrou uma saída."
        icon={Coins}
        accentColor="amber"
        backLink="/educacao"
        backLabel="Arsenal Técnico"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══ ERAS DO DINHEIRO ═══ */}
        {ERAS.map((era, eraIndex) => (
          <motion.section key={era.id} id={era.id}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="mb-28 scroll-mt-24">

            <motion.div variants={fadeUp} custom={0} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">
                Era {String(eraIndex + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <era.icon size={20} className="text-amber-400" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {era.titulo}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Clock className="text-stone-600" size={12} />
                <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.3em]">{era.periodo}</span>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden
                         hover:border-amber-500/15 transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
              <div className="space-y-5 text-stone-400 leading-relaxed">
                {era.conteudo.map((p, i) => (
                  <p key={i} className="text-base" dangerouslySetInnerHTML={{ __html: p.replace(/(".*?")/g, '<em class="text-stone-300">$1</em>') }} />
                ))}
              </div>
            </motion.div>

            {/* TAMBÉM ACONTECEU NESTA ÉPOCA */}
            {TAMBEM_ACONTECEU[era.id] && (
              <motion.div variants={fadeUp} custom={2}
                className="mt-6 bg-amber-950/15 border border-amber-500/15 rounded-2xl p-6">
                <p className="text-amber-500/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Também aconteceu nesta época</p>
                <div className="space-y-3">
                  {TAMBEM_ACONTECEU[era.id].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-amber-500/50 font-bold text-[10px] tracking-wider shrink-0 w-20">{item.ano}</span>
                      <span className="text-stone-400 text-xs">{item.fato}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Section divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mt-28" />
          </motion.section>
        ))}

        {/* ═══ TIMELINE ═══ */}
        <motion.section id="timeline" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Cronologia</span>
            <div className="flex items-center gap-3 mt-2">
              <Clock size={20} className="text-amber-400" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Linha do Tempo Monetária
              </h2>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />
            <div className="space-y-8">
              {TIMELINE_ITEMS.map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i * 0.08}
                  className="relative flex gap-6 group">
                  <div className="relative z-10 shrink-0">
                    <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-amber-500 bg-amber-500/20' : 'border-amber-500/30 bg-white/[0.02] group-hover:border-amber-500/60'} transition-colors`}>
                      <span className="text-amber-500 font-bold text-[8px]">{item.ano}</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex-1 group-hover:border-amber-500/20 transition-colors">
                    <h3 className="text-white font-bold text-sm tracking-tight mb-2">{item.evento}</h3>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mb-28" />

        {/* ═══ CONSEQUÊNCIAS ═══ */}
        <motion.section id="consequencias" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Diagnóstico</span>
            <div className="flex items-center gap-3 mt-2">
              <AlertTriangle size={20} className="text-red-400" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Resultado
              </h2>
            </div>
            <p className="text-stone-500 text-base leading-relaxed mt-4 max-w-3xl">
              O que acontece quando governos controlam o dinheiro sem lastro em nada real? Três consequências que você vive todos os dias, mesmo sem perceber:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSEQUENCIAS.map((item, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                           hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <item.icon className="text-red-400" size={18} />
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-tight">{item.titulo}</h3>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{item.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mb-28" />

        {/* ═══ A SAÍDA: BITCOIN ═══ */}
        <motion.section id="bitcoin-saida" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={scaleIn} custom={0}
            className="bg-white/[0.02] border-2 border-amber-500/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.04] via-transparent to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-amber-400" size={14} />
                <span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[10px]">A Resposta</span>
              </div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Em 2009, Surgiu<br /><span className="text-amber-400 italic">A Saída.</span>
              </h3>
              <div className="space-y-5 text-stone-400 leading-relaxed max-w-3xl">
                <p className="text-base">Em 3 de janeiro de 2009, em meio à maior crise financeira desde 1929, um programador (ou grupo) sob o pseudônimo <strong className="text-white">Satoshi Nakamoto</strong> lançou a rede Bitcoin. Na primeira transação, gravou na blockchain a manchete do jornal The Times: <em className="text-amber-400">"Chancellor on brink of second bailout for banks"</em>.</p>
                <p className="text-base">O Bitcoin foi projetado como o <strong className="text-white">oposto exato do dinheiro estatal</strong>: oferta fixa (21 milhões), descentralizado (sem banco central), resistente à censura (ninguém pode bloqueá-lo), transparente (blockchain pública) e permissionless (não precisa de aprovação para usar).</p>
                <p className="text-base">Pela primeira vez em 5.000 anos, a humanidade tem acesso a uma forma de dinheiro que <strong className="text-white">não pode ser corrompida por governos</strong>. Não pode ser impressa. Não pode ser confiscada com autocustódia. Não pode ser censurada.</p>
              </div>
              <div className="mt-10">
                <Link to="/o-que-e-bitcoin"
                  className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  ₿ O Que é o Bitcoin <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mb-28" />

        {/* ═══ FAQ ═══ */}
        <motion.section id="faq" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">FAQ</span>
            <div className="flex items-center gap-3 mt-2">
              <HelpCircle size={20} className="text-amber-400" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Perguntas Frequentes
              </h2>
            </div>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.08}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-amber-500/15 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                  <ChevronDown className={`text-amber-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-white/[0.05] pt-4">
                    <p className="text-stone-400 text-sm leading-relaxed">{item.resposta}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ CTA FINAL ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={scaleIn} custom={0}
            className="bg-white/[0.02] border-2 border-amber-500/25 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">
                "O dinheiro sempre foi uma ferramenta de poder."
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O Despertar<br />Começa{' '}
                <span className="text-amber-400">Aqui.</span>
              </h2>
              <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Agora você sabe o que nunca te ensinaram na escola: que o dinheiro foi corrompido, que a inflação é um imposto, que bancos centrais destroem poder de compra. O próximo passo é <strong className="text-amber-400">agir</strong>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/o-que-e-bitcoin"
                  className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  ₿ O Que é o Bitcoin <ChevronRight size={16} />
                </Link>
                <Link to="/inflacao-imposto-oculto"
                  className="inline-flex items-center gap-3 border border-amber-500/30 hover:border-amber-500/60 text-amber-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                  Inflação: O Imposto Oculto <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
