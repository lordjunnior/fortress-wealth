import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, QrCode, Gift, Zap, ShoppingCart, Shield,
  Smartphone, CreditCard, Coffee, Fuel, Pill, Star,
  CheckCircle, Clock, DollarSign, TrendingUp, ChevronDown,
  Headphones, Trophy, Sparkles, Target, AlertTriangle
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import NobelVFX from '@/components/NobelVFX';

import kucoinSupermercado from '@/assets/kucoin-supermercado.jpg';
import kucoinPosto from '@/assets/kucoin-posto.jpg';
import kucoinCafe from '@/assets/kucoin-cafe.jpg';
import kucoinFarmacia from '@/assets/kucoin-farmacia.jpg';

const AFFILIATE_LINK = 'https://www.kucoin.com/r/rf/QBAPZG6X';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';

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


const rewards = [
  {
    tier: 'Recompensa 1',
    badge: 'Novos Usuários',
    badgeColor: 'emerald',
    title: '50% de Cashback no Primeiro Pagamento',
    requirement: 'Complete seu primeiro pagamento Pix ≥ 5 USDT (ou equivalente em qualquer criptomoeda suportada) via KuCoin Pay.',
    reward: '50% de cashback em USDT (até 2 USDT)',
    tip: 'Basicamente metade do preço no seu primeiro scan!',
    icon: Gift,
  },
  {
    tier: 'Recompensa 2',
    badge: 'Todos os Usuários',
    badgeColor: 'amber',
    title: 'Pague 3 Vezes e Ganhe 5 USDT',
    requirement: 'Complete três pagamentos Pix ≥ 13 USDT (ou equivalente em qualquer criptomoeda suportada) via KuCoin Pay durante o período da campanha.',
    reward: 'Bônus de 5 USDT',
    tip: 'Mais scans, mais recompensas garantidas!',
    icon: Trophy,
  },
  {
    tier: 'Recompensa 3',
    badge: 'Volume Premium',
    badgeColor: 'purple',
    title: 'Cashback Aleatório + Sorteio Samsung Galaxy Buds',
    requirement: 'Alcance um volume total de pagamentos Pix ≥ 500 USDT (ou equivalente em qualquer criptomoeda suportada) via KuCoin Pay durante o período da campanha.',
    reward: 'Cashback aleatório entre 2–100 USDT + uma entrada no sorteio dos Samsung Galaxy Buds.',
    tip: 'Usuários com maior volume total durante a campanha podem receber cashback (USDT) mais alto.',
    icon: Headphones,
  },
];

const steps = [
  {
    step: '01',
    title: 'Crie Sua Conta Gratuita',
    desc: 'O primeiro passo é criar sua conta — leva menos de 2 minutos. Sem isso, você não consegue ativar o KuCoin Pay nem participar das recompensas.',
    icon: Target,
    cta: true,
  },
  {
    step: '02',
    title: 'Vá a Qualquer Local com Pix',
    desc: 'Supermercados como Pão de Açúcar ou Carrefour, postos como Ipiranga, cafés como Starbucks, farmácias como Droga Raia — qualquer estabelecimento que aceite Pix.',
    icon: ShoppingCart,
  },
  {
    step: '03',
    title: 'Escaneie o Pix com KuCoin Pay',
    desc: 'Abra o KuCoin Pay, escaneie o QR Code do Pix e complete o pagamento com cripto. Simples como usar seu app de banco.',
    icon: QrCode,
  },
  {
    step: '04',
    title: 'Receba Suas Recompensas',
    desc: 'Pagamentos que atendem às condições da campanha são registrados automaticamente e contabilizados para a distribuição de recompensas.',
    icon: Gift,
  },
];

const faqs = [
  {
    q: 'O que é o KuCoin Pay Pix?',
    a: 'KuCoin Pay é uma funcionalidade da exchange KuCoin que permite pagar via Pix usando criptomoedas. Você escaneia o QR Code do Pix normalmente e o pagamento é feito com seus ativos cripto.',
  },
  {
    q: 'Preciso ter conta na KuCoin?',
    a: 'Sim, é necessário ter uma conta na KuCoin com saldo em criptomoedas suportadas para utilizar o KuCoin Pay.',
  },
  {
    q: 'Quais criptomoedas são aceitas?',
    a: 'O KuCoin Pay suporta diversas criptomoedas incluindo USDT, BTC, ETH e outras. O valor é convertido automaticamente no momento do pagamento.',
  },
  {
    q: 'O cashback é automático?',
    a: 'Sim, após o registro na campanha, todos os pagamentos elegíveis são rastreados automaticamente. O cashback é distribuído conforme as regras de cada recompensa.',
  },
  {
    q: 'Até quando vai a campanha?',
    a: 'A campanha vai de 10 de março de 2026 (00:00 UTC+8) até 8 de abril de 2026 (23:59 UTC+8).',
  },
  {
    q: 'O KuCoin Pay funciona em qualquer estabelecimento?',
    a: 'Sim, funciona em qualquer local que aceite Pix no Brasil — supermercados, postos de gasolina, farmácias, cafés e muito mais.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'KuCoin Pay Pix — Pague com Cripto via Pix e Ganhe até 100 USDT de Cashback',
  description: 'Guia completo sobre o KuCoin Pay Pix: como pagar com criptomoedas via Pix em qualquer estabelecimento do Brasil e participar da campanha de cashback.',
  author: { '@type': 'Person', name: 'Lord Junnior' },
  datePublished: '2026-03-15',
};

export default function KucoinPayPix() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/50 relative overflow-hidden"
      style={{ background: BG_DARK }}>

      <Helmet>
        <title>KuCoin Pay Pix — Pague com Cripto via Pix e Ganhe Cashback | Lord Junnior</title>
        <meta name="description" content="Guia completo do KuCoin Pay Pix: pague com criptomoedas via Pix em qualquer estabelecimento do Brasil. Campanha de cashback de até 100 USDT + sorteio Samsung Galaxy Buds." />
        <link rel="canonical" href="https://lordjunnior.com/kucoin-pay-pix" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #10b981, #f59e0b)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        {/* Sweeping light beam 1 */}
        <motion.div className="absolute inset-0 opacity-[0.04]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'linear-gradient(125deg, transparent 20%, rgba(16,185,129,0.12) 35%, transparent 50%, rgba(245,158,11,0.08) 65%, transparent 80%)', backgroundSize: '300% 300%' }} />
        {/* Sweeping light beam 2 (counter) */}
        <motion.div className="absolute inset-0 opacity-[0.03]"
          animate={{ backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'linear-gradient(225deg, transparent 30%, rgba(16,185,129,0.08) 45%, transparent 60%, rgba(168,85,247,0.06) 75%, transparent 90%)', backgroundSize: '400% 400%' }} />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      {/* ─── REACTIVE ORBS (breathing, mouse-tracked) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary emerald orb */}
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[10%] left-[8%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-emerald-500/40 to-transparent blur-3xl" />
        </motion.div>
        {/* Secondary amber orb */}
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[15%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          animate={{ scale: [1.1, 0.95, 1.1], rotate: [0, -3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
        {/* Tertiary teal mid-page orb */}
        <motion.div
          className="absolute top-[50%] left-[50%] w-[700px] h-[700px] rounded-full opacity-[0.025]"
          animate={{ scale: [0.9, 1.1, 0.9], x: [-50, 50, -50], y: [-30, 30, -30] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-teal-400/20 to-transparent blur-3xl" />
        </motion.div>
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/20"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/kucoin-pay-pix.webp"
        phase="Pagamentos Cripto"
        title="KuCoin Pay Pix"
        subtitle="Pague com criptomoedas via Pix em qualquer estabelecimento do Brasil. Escaneie, pague e receba cashback de até 100 USDT."
        icon={QrCode}
        accentColor="emerald"
        backLink="/soberania-financeira"
        backLabel="Soberania Financeira"
      />

      {/* ─── SOVEREIGN DISCLAIMER ─── */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16">
        <SovereignDisclaimer variant="payment" />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══ CAMPAIGN BANNER ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={scaleIn} custom={0}
            className="bg-gradient-to-br from-emerald-500/[0.06] to-amber-500/[0.04] border border-emerald-500/15 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <Clock size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">
                  10 Mar – 08 Abr 2026
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Scan Pix to Win:{' '}
                <span className="text-emerald-400">50% Cashback</span> on USDT & More
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
                Café, supermercado, posto de gasolina ou farmácia — o KuCoin Pay torna sua cripto utilizável em qualquer lugar onde o Pix funciona. É a experiência que você já conhece, mas agora pague com cripto.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-28" />

        {/* ═══ CAPÍTULO 01 — REWARDS ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Recompensas da Campanha
            </h2>
            <p className="text-stone-500 mt-4 max-w-2xl leading-relaxed">
              Três níveis de recompensa para quem usa o KuCoin Pay no dia a dia. Quanto mais você paga, mais você ganha.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {rewards.map((r, i) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/15' },
                amber: { text: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/15' },
                purple: { text: 'text-purple-400', bg: 'bg-purple-500/8', border: 'border-purple-500/15' },
              };
              const c = colorMap[r.badgeColor] || colorMap.emerald;
              return (
                <motion.div key={r.tier} variants={scaleIn} custom={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden
                             hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-500 group">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl ${c.bg} border ${c.border}`}>
                      <r.icon size={20} className={c.text} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${c.text} ${c.bg} ${c.border} border rounded-full px-3 py-1`}>
                      {r.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4 tracking-tight leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {r.title}
                  </h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-2 items-start">
                      <CheckCircle size={14} className="text-emerald-500/60 shrink-0 mt-0.5" />
                      <p className="text-stone-400 text-sm leading-relaxed"><strong className="text-stone-300">Requisito:</strong> {r.requirement}</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Gift size={14} className="text-amber-500/60 shrink-0 mt-0.5" />
                      <p className="text-stone-400 text-sm leading-relaxed"><strong className="text-stone-300">Prêmio:</strong> {r.reward}</p>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3">
                    <p className="text-[11px] text-amber-400/70 font-medium">💡 {r.tip}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── MID-PAGE CTA ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 text-center">
          <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 to-amber-500/10 border border-emerald-500/25 rounded-2xl px-10 py-5
                       text-emerald-400 text-sm font-bold uppercase tracking-wider
                       hover:from-emerald-500/25 hover:to-amber-500/15 hover:shadow-[0_0_60px_rgba(16,185,129,0.12)]
                       transition-all duration-500 group">
            <Shield size={18} /> Ainda não tem conta? Crie a sua em 2 minutos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-stone-600 text-[11px] mt-3">É necessário para seguir o tutorial abaixo.</p>
        </motion.div>

        {/* ─── DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-28" />

        {/* ═══ CAPÍTULO 02 — TUTORIAL ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como Pagar com Pix via KuCoin Pay
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden
                           hover:border-emerald-500/15 transition-all duration-500 group">
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.3em] text-emerald-500/20 uppercase">
                  Passo {s.step}
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15 w-fit mb-6
                                group-hover:bg-emerald-500/12 transition-all duration-500">
                  <s.icon size={22} className="text-emerald-400" />
                </div>
                <h5 className="text-lg font-bold text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.title}
                </h5>
                <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
                {'cta' in s && (s as any).cta && (
                  <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2
                               text-emerald-400 text-xs font-bold uppercase tracking-wider
                               hover:bg-emerald-500/20 transition-all duration-300">
                    <Sparkles size={12} /> Começar Agora <ArrowRight size={12} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-28" />

        {/* ═══ CAPÍTULO 03 — ONDE USAR ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Onde Usar o KuCoin Pay
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShoppingCart, label: 'Supermercados', example: 'Pão de Açúcar, Carrefour', img: kucoinSupermercado },
              { icon: Fuel, label: 'Postos', example: 'Posto Ipiranga, Shell', img: kucoinPosto },
              { icon: Coffee, label: 'Cafés', example: 'Starbucks, Padarias', img: kucoinCafe },
              { icon: Pill, label: 'Farmácias', example: 'Droga Raia, Drogasil', img: kucoinFarmacia },
            ].map((place, i) => (
              <motion.div key={place.label} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden
                           hover:border-emerald-500/15 transition-all duration-500 group">
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img src={place.img} alt={place.label} className="w-full h-full object-cover
                    group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/40 to-transparent" />
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
                    <place.icon size={16} className="text-emerald-400" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h5 className="text-sm font-bold text-white mb-1">{place.label}</h5>
                  <p className="text-[11px] text-stone-600">{place.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-28" />

        {/* ═══ CAPÍTULO 04 — FAQ ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capítulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Perguntas Frequentes
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden
                           hover:border-emerald-500/10 transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-stone-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-stone-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-28" />

        {/* ═══ CTA FINAL ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-emerald-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5">
                <AlertTriangle size={12} className="text-amber-400" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400">Campanha limitada</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Pare de deixar sua cripto{' '}
                <span className="text-emerald-400">parada.</span>
              </h2>
              <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
                Use-a no café da manhã, no tanque do carro, na farmácia. O KuCoin Pay transforma cada pagamento Pix em uma oportunidade de cashback.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-8 py-4
                             text-emerald-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-emerald-500/25 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]
                             transition-all duration-500 group animate-pulse">
                  <Zap size={16} /> Criar Conta Gratuita
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link to="/soberania-financeira"
                  className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-8 py-4
                             text-stone-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group">
                  Explorar Soberania <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
