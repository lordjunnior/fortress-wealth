import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Zap, Layers, Repeat, Smartphone, Coffee, ZapOff,
  ArrowLeft, ArrowRight, ChevronDown, Shield, Lock, Eye
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

/* ─── SEO: meta keywords target ───
   lightning network bitcoin, pagamento instantâneo bitcoin, layer 2 bitcoin,
   carteira non-custodial, phoenix wallet, zeus wallet, roteamento onion,
   canais de pagamento bitcoin, soberania instantânea
─────────────────────────────────── */

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
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

/* ─── Mouse Parallax Hook ─── */
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

export default function Lightning() {
  const { scrollY } = useScroll();
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-yellow-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}>

      <Helmet>
        <title>Lightning Network — Pagamentos Instantâneos em Bitcoin | Lord Junnior</title>
        <meta name="description" content="Entenda como a Lightning Network funciona: canais de pagamento, roteamento onion, carteiras custodiais vs non-custodiais. Soberania instantânea no seu bolso." />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #eab308, #f59e0b, #f97316)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(234,179,8,0.08) 50%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ background: 'linear-gradient(225deg, transparent 40%, rgba(245,158,11,0.06) 55%, transparent 75%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          >
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/lightning-network.webp"
        phase="Protocolo de Alta Frequência"
        title="Lightning Network"
        subtitle="O Bitcoin L1 é o tribunal final: lento e caro. Para a rua, precisamos de velocidade luz e soberania instantânea. Layer 2 é onde a revolução acontece no dia a dia."
        icon={Zap}
        accentColor="amber"
        backLink="/arsenal"
        backLabel="Torre de Controle"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — O TRIBUNAL VS A RUA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Tribunal vs A Rua
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10 backdrop-blur-sm
                         hover:border-stone-700/50 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40">
                  <Lock size={20} className="text-stone-500" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-600">Layer 1: O Tribunal</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-400 mb-3 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Lento. Seguro. Caro.
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Arbitragem final. Liquidação de grandes volumes. A camada de ouro digital onde cada transação é gravada para sempre na blockchain. Ideal para valores altos e custódia de longo prazo.
              </p>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 md:p-10 backdrop-blur-sm
                         hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.06)] transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-yellow-500/70">Layer 2: A Rua</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Instantâneo. Privado. Barato.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Transações do dia a dia. Café, serviços, circularidade. Moeda de troca soberana com taxas de frações de centavo e confirmação em milissegundos.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — INFRAESTRUTURA DE CANAIS
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Infraestrutura de Canais
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers, title: 'Abertura',
                desc: 'Contrato Multisig travado na Blockchain. Um depósito bilateral que abre a via expressa para transações infinitas off-chain.',
                step: '01'
              },
              {
                icon: Eye, title: 'Roteamento Onion',
                desc: 'Intermediários não sabem quem paga nem quem recebe. Privacidade por padrão, como o Tor aplicado ao dinheiro.',
                step: '02'
              },
              {
                icon: Repeat, title: 'Fechamento',
                desc: 'Só o saldo final é liquidado no Tribunal L1. Milhares de transações comprimidas em uma única gravação na blockchain.',
                step: '03'
              },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center
                           hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.3em] text-yellow-500/30 uppercase">
                  Passo {item.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/8 border border-yellow-500/15 mx-auto flex items-center justify-center mb-6
                               group-hover:bg-yellow-500/15 group-hover:border-yellow-500/30 transition-all duration-500">
                  <item.icon size={28} className="text-yellow-500" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 03 — A ESCOLHA DA ARMA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A Escolha da Arma
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CUSTODIAL */}
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-8 md:p-10 relative overflow-hidden
                         hover:border-red-500/25 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/15">
                    <Coffee size={24} className="text-red-400/60" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-red-500/50 bg-red-500/8 px-3 py-1.5 rounded-lg border border-red-500/15">
                    Risco Máximo
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-stone-400 mb-4 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Custodial
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  Wallet of Satoshi. Se o servidor cair, você é apenas um passageiro sem bilhete. Seus sats não são seus. Dependência total de terceiros que podem congelar seus fundos a qualquer momento.
                </p>
                <div className="flex items-center gap-3 text-red-500/50">
                  <ZapOff size={14} />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Dependência do Sistema</span>
                </div>
              </div>
            </motion.div>

            {/* NON-CUSTODIAL */}
            <motion.div variants={scaleIn} custom={1}
              className="bg-yellow-500/[0.03] border border-yellow-500/20 rounded-2xl p-8 md:p-10 relative overflow-hidden
                         hover:border-yellow-500/40 hover:shadow-[0_0_60px_rgba(234,179,8,0.08)] transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <Smartphone size={24} className="text-yellow-500" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20 animate-pulse">
                    Soberania Total
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Non-Custodial
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-medium">
                  Phoenix / Zeus. As chaves moram no seu dispositivo. Ninguém, nem o desenvolvedor, pode congelar seus fundos. Soberania absoluta sobre cada satoshi.
                </p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <Zap size={14} />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Independência Absoluta</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            MANIFESTO FINAL — CTA + PNL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-yellow-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-yellow-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quem facilita a custódia,<br />facilita a{' '}
                <span className="text-yellow-500">censura.</span>
              </h2>
              <p className="text-stone-500 text-sm font-bold tracking-[0.5em] uppercase">
                Not your keys, not your money.
              </p>
              <div className="pt-8">
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl px-8 py-4
                             text-yellow-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-500 group">
                  Aprenda Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
