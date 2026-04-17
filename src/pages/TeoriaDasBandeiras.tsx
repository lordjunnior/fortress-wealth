import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronDown, HelpCircle, Shield, Globe, Flag, AlertTriangle, BookOpen, Wallet, Check, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { BANDEIRAS, POR_QUE_AGORA, CASO_BRASIL, PRIMEIROS_PASSOS, FERRAMENTAS, FAQ_ITEMS } from '@/lib/teoriaBandeirasData';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import PageFloatingToc from '@/components/PageFloatingToc';
import heroImg from '@/assets/bandeiras-hero.jpg';
import palauImg from '@/assets/bandeiras-palau.jpg';
import passportsImg from '@/assets/bandeiras-passports.jpg';

/* ────────────────────────────────
   PALETA: Pergaminho & Indigo Real
   Cream #F5F0E1 / Bone #E8DFC8 / Indigo #1E3A8A / Gold #C9A227
   ──────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const TOC_ITEMS = [
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'bandeiras', label: 'As 5 Bandeiras' },
  { id: 'por-que', label: 'Por Que Agora' },
  { id: 'brasil', label: 'O Caso Brasil' },
  { id: 'primeiros-passos', label: 'Primeiros Passos' },
  { id: 'ferramentas', label: 'Arsenal Prático' },
  { id: 'palau', label: 'Refúgio Palau' },
  { id: 'faq', label: 'FAQ' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: item.resposta },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Teoria das Bandeiras: Diversificação Jurisdicional para Soberania Pessoal',
  description: 'A Teoria das Bandeiras (Flag Theory) é a estratégia de distribuir cidadania, contas, empresas e patrimônio entre múltiplas jurisdições. Guia completo com as 5 bandeiras, caso Brasil e refúgio em Palau.',
  author: { '@type': 'Person', name: 'Lord Junnior' },
  publisher: { '@type': 'Organization', name: 'Lord Junnior', url: 'https://lordjunnior.com.br' },
  datePublished: '2026-03-07',
  dateModified: '2026-04-17',
  url: 'https://lordjunnior.com.br/teoria-das-bandeiras',
  image: 'https://lordjunnior.com.br/og-bandeiras.jpg',
  keywords: 'teoria das bandeiras, flag theory, diversificação jurisdicional, segunda cidadania, residência paraguai, residência palau, offshore brasileiro, soberania pessoal, autocustódia bitcoin, plano b patrimonial',
};

export default function TeoriaDasBandeiras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeBandeira, setActiveBandeira] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5F0E1 0%, #EFE7D2 50%, #E8DFC8 100%)',
        color: '#1A1A2E',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Helmet>
        <title>Teoria das Bandeiras 2026: Guia Completo de Diversificação Jurisdicional | Lord Junnior</title>
        <meta name="description" content="Aprenda a Teoria das Bandeiras (Flag Theory): cidadania, contas, impostos, empresas e patrimônio em múltiplas jurisdições. Inclui caso Brasil, residência no Paraguai e ID de Palau. Guia 2026." />
        <meta name="keywords" content="teoria das bandeiras, flag theory brasileiro, segunda cidadania, residência paraguai, ID Palau, plano B patrimonial, soberania pessoal, offshore legal, autocustódia bitcoin, diversificação internacional" />
        <link rel="canonical" href="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:title" content="Teoria das Bandeiras: A Estratégia para Não Depender de Um Único Governo" />
        <meta property="og:description" content="As 5 bandeiras que protegem seu patrimônio, sua liberdade e sua família. Inclui o gancho Palau Digital Residency." />
        <meta property="og:url" content="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-bandeiras.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="relative z-30 px-4 sm:px-8 lg:px-16 pt-6">
        <BackToHome />
      </div>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />
      <ScrollToTop />

      {/* ═══════════ HERO CLARO ═══════════ */}
      <header className="relative w-full min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Bandeiras de múltiplas nações representando diversificação jurisdicional"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(245,240,225,0.55) 0%, rgba(245,240,225,0.85) 70%, #F5F0E1 100%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.25)' }}
          >
            <Sparkles size={16} style={{ color: '#C9A227' }} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#1E3A8A' }}>
              Estratégia Avançada de Soberania
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE, delay: 0.15 }}
            className="font-black leading-[0.95] tracking-tight mb-8"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#1A1A2E',
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            }}
          >
            Teoria das<br />
            <span style={{ color: '#1E3A8A', fontStyle: 'italic' }}>Bandeiras.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.3 }}
            className="max-w-3xl mb-10 leading-relaxed"
            style={{
              color: '#3D3D5C',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
              fontWeight: 400,
            }}
          >
            A estratégia centenária para distribuir sua vida financeira, jurídica e patrimonial entre <strong style={{ color: '#1E3A8A' }}>múltiplas jurisdições</strong>, para que <strong style={{ color: '#B91C1C' }}>nenhum governo</strong> tenha controle absoluto sobre sua existência.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#bandeiras"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
                color: '#F5F0E1',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                boxShadow: '0 10px 30px -10px rgba(30,58,138,0.5)',
              }}
            >
              Conhecer as 5 Bandeiras <ChevronRight size={20} />
            </a>
            <a
              href="#palau"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
              style={{
                background: 'transparent',
                color: '#C9A227',
                border: '2px solid #C9A227',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              }}
            >
              <Flag size={18} /> Refúgio Palau
            </a>
          </motion.div>
        </div>
      </header>

      {/* ═══════════ CONTEÚDO PRINCIPAL ═══════════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-20">

        {/* ═══ O QUE É ═══ */}
        <motion.section
          id="o-que-e"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#1E3A8A' }}>
            <Globe size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              O Que É
            </h2>
          </div>

          <div
            className="rounded-2xl p-7 sm:p-12"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(30,58,138,0.15)',
              boxShadow: '0 20px 60px -30px rgba(30,58,138,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="space-y-6" style={{ color: '#2D2D44', fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', lineHeight: 1.75 }}>
              <p>
                A <strong style={{ color: '#1E3A8A' }}>Teoria das Bandeiras</strong> (Flag Theory) foi popularizada por Harry D. Schultz nos anos 1960. A ideia é simples e poderosa: <strong style={{ color: '#B91C1C' }}>não dependa de um único governo para tudo</strong>.
              </p>
              <p>
                A maioria das pessoas nasce, vive, trabalha, guarda dinheiro e morre sob a jurisdição de um único país. Isso significa que <strong style={{ color: '#1A1A2E' }}>um único governo controla 100% da sua existência</strong>.
              </p>
              <p>
                A Teoria das Bandeiras propõe que você distribua esses elementos entre múltiplas jurisdições. Não é sobre fugir. É sobre <strong style={{ color: '#C9A227' }}>ter opções, ter rotas de fuga, ter dignidade.</strong>
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ AS 5 BANDEIRAS ═══ */}
        <motion.section
          id="bandeiras"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#1E3A8A' }}>
            <Flag size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              As 5 Bandeiras
            </h2>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {BANDEIRAS.map((b, i) => (
              <button
                key={i}
                onClick={() => setActiveBandeira(i)}
                className="px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-all"
                style={{
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                  background: activeBandeira === i ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' : 'rgba(255,255,255,0.7)',
                  color: activeBandeira === i ? '#F5F0E1' : '#1E3A8A',
                  border: `2px solid ${activeBandeira === i ? '#1E3A8A' : 'rgba(30,58,138,0.2)'}`,
                  boxShadow: activeBandeira === i ? '0 8px 20px -8px rgba(30,58,138,0.4)' : 'none',
                }}
              >
                {b.numero}ª · {b.titulo.split(' / ')[0]}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          {BANDEIRAS.map((b, i) => activeBandeira === i && (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-7 sm:p-12"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '2px solid #C9A227',
                boxShadow: '0 25px 70px -30px rgba(201,162,39,0.3)',
              }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A227 0%, #E8C25A 100%)', boxShadow: '0 10px 25px -10px rgba(201,162,39,0.5)' }}
                >
                  <b.icon size={32} color="#1A1A2E" />
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
                    BANDEIRA Nº {b.numero}
                  </span>
                  <h3
                    className="font-black mt-1 leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      color: '#1E3A8A',
                    }}
                  >
                    {b.titulo}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold uppercase tracking-wider mt-1" style={{ color: '#5D5D7D' }}>
                    {b.subtitulo}
                  </p>
                </div>
              </div>

              <p
                className="my-6 leading-relaxed"
                style={{ color: '#2D2D44', fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}
              >
                {b.descricao}
              </p>

              <div className="space-y-3 mb-7">
                {b.exemplos.map((ex, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: '#1E3A8A' }}>
                      <Check size={14} color="#F5F0E1" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#2D2D44', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}>{ex}</span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-5 sm:p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.05) 100%)',
                  borderLeft: '4px solid #C9A227',
                }}
              >
                <p
                  className="font-bold italic leading-snug"
                  style={{
                    color: '#1E3A8A',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  }}
                >
                  "{b.destaque}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ═══ POR QUE AGORA ═══ */}
        <motion.section
          id="por-que"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#B91C1C' }}>
            <AlertTriangle size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Por Que Agora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POR_QUE_AGORA.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl p-7 transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(185,28,28,0.2)',
                  boxShadow: '0 15px 40px -20px rgba(185,28,28,0.15)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)' }}
                >
                  <item.icon size={26} color="#F5F0E1" />
                </div>
                <h3
                  className="font-black mb-3 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                    color: '#1A1A2E',
                  }}
                >
                  {item.titulo}
                </h3>
                <p style={{ color: '#3D3D5C', fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', lineHeight: 1.7 }}>
                  {item.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ CASO BRASIL ═══ */}
        <motion.section
          id="brasil"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#B91C1C' }}>
            <MapPin size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              O Caso Brasil
            </h2>
          </div>

          <div
            className="rounded-2xl p-7 sm:p-12"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '2px solid rgba(185,28,28,0.3)',
              boxShadow: '0 25px 60px -30px rgba(185,28,28,0.25)',
            }}
          >
            <p
              className="mb-8 leading-relaxed"
              style={{ color: '#2D2D44', fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)' }}
            >
              O Brasil combina <strong style={{ color: '#B91C1C' }}>instabilidade histórica com poder estatal crescente</strong>. Veja os fatos:
            </p>

            <div className="space-y-4">
              {CASO_BRASIL.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)', boxShadow: '0 4px 12px -2px rgba(185,28,28,0.4)' }}
                  >
                    <span className="font-black text-sm" style={{ color: '#F5F0E1' }}>{i + 1}</span>
                  </div>
                  <span style={{ color: '#1A1A2E', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-6 sm:p-8 mt-8"
              style={{
                background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A8A 100%)',
              }}
            >
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#C9A227' }}>
                Conclusão
              </p>
              <p
                className="font-black uppercase leading-tight"
                style={{
                  color: '#F5F0E1',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                }}
              >
                Quem tem 100% da vida sob uma única jurisdição está 100% vulnerável.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ IMAGEM EDITORIAL: PASSAPORTES ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-24 sm:mb-32"
        >
          <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: '0 30px 80px -30px rgba(30,58,138,0.4)' }}>
            <img
              src={passportsImg}
              alt="Múltiplos passaportes, compasso, globo e moedas estrangeiras representando preparação para diversificação jurisdicional"
              className="w-full h-auto"
              loading="lazy"
              width={1600}
              height={1000}
            />
            <div className="absolute inset-0 flex items-end p-6 sm:p-12" style={{ background: 'linear-gradient(0deg, rgba(26,26,46,0.9) 0%, transparent 60%)' }}>
              <p
                className="font-black uppercase leading-tight max-w-2xl"
                style={{
                  color: '#F5F0E1',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                }}
              >
                Um passaporte é uma saída de emergência. <span style={{ color: '#C9A227' }}>Dois passaportes são uma estratégia.</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ PRIMEIROS PASSOS ═══ */}
        <motion.section
          id="primeiros-passos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#1E3A8A' }}>
            <Wallet size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Primeiros Passos
            </h2>
          </div>

          <div className="space-y-5">
            {PRIMEIROS_PASSOS.map((step, i) => (
              <motion.div
                key={step.passo}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(30,58,138,0.18)',
                  boxShadow: '0 12px 35px -20px rgba(30,58,138,0.2)',
                }}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
                    boxShadow: '0 10px 25px -10px rgba(30,58,138,0.5)',
                  }}
                >
                  <span className="font-black text-2xl sm:text-3xl" style={{ color: '#F5F0E1', fontFamily: "'Playfair Display', serif" }}>
                    {step.passo}
                  </span>
                </div>

                <div className="flex-1">
                  <h3
                    className="font-black mb-3 leading-tight"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                      color: '#1E3A8A',
                    }}
                  >
                    {step.titulo}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span
                      className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(201,162,39,0.15)', color: '#8B6F0F', border: '1px solid rgba(201,162,39,0.3)' }}
                    >
                      {step.dificuldade}
                    </span>
                    <span
                      className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(30,58,138,0.1)', color: '#1E3A8A', border: '1px solid rgba(30,58,138,0.25)' }}
                    >
                      Custo: {step.custo}
                    </span>
                  </div>

                  <p style={{ color: '#3D3D5C', fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', lineHeight: 1.7 }}>
                    {step.descricao}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ ARSENAL PRÁTICO ═══ */}
        <motion.section
          id="ferramentas"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#1E3A8A' }}>
            <Shield size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Arsenal Prático
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FERRAMENTAS.map((tool, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl p-7 transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(201,162,39,0.3)',
                  boxShadow: '0 15px 40px -20px rgba(201,162,39,0.2)',
                }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9A227 0%, #E8C25A 100%)' }}
                  >
                    <tool.icon size={26} color="#1A1A2E" />
                  </div>
                  <div>
                    <h3
                      className="font-black leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                        color: '#1E3A8A',
                      }}
                    >
                      {tool.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#C9A227' }}>
                      {tool.subtitulo}
                    </p>
                  </div>
                </div>

                <p className="mb-5" style={{ color: '#3D3D5C', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.7 }}>
                  {tool.descricao}
                </p>

                <div
                  className="rounded-lg p-4"
                  style={{
                    background: 'rgba(30,58,138,0.07)',
                    borderLeft: '3px solid #1E3A8A',
                  }}
                >
                  <p
                    className="font-bold italic"
                    style={{ color: '#1E3A8A', fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                  >
                    "{tool.destaque}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ GANCHO PALAU ═══ */}
        <motion.section
          id="palau"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#0F766E' }}>
            <Flag size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Refúgio Final · Palau
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 35px 90px -35px rgba(15,118,110,0.4)',
              border: '2px solid rgba(15,118,110,0.25)',
            }}
          >
            <div className="relative h-[280px] sm:h-[420px]">
              <img
                src={palauImg}
                alt="Vista aérea das ilhas paradisíacas de Palau, refúgio sobereano para residência digital"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(15,118,110,0.6) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em]" style={{ color: '#FDE047' }}>
                  Palau Digital Residency
                </span>
                <h3
                  className="font-black mt-2 leading-tight"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                  }}
                >
                  Sua ID Soberana<br />no Pacífico.
                </h3>
              </div>
            </div>

            <div className="p-7 sm:p-12" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: '#2D2D44', fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)' }}
              >
                Palau é uma nação insular soberana no Pacífico que oferece um dos programas de <strong style={{ color: '#0F766E' }}>residência digital mais acessíveis do mundo</strong>. Com a ID de Palau você obtém:
              </p>

              <div className="space-y-3 mb-7">
                {[
                  'Documento oficial de identidade reconhecido internacionalmente',
                  'Abertura de contas em exchanges globais (Binance, Kraken, Bybit) sem CPF',
                  'Acesso a serviços financeiros e fintechs internacionais',
                  'Processo 100% online, sem necessidade de viajar',
                  'Custo acessível: a partir de US$ 248 por ano',
                ].map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: '#0F766E' }}>
                      <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#1A1A2E', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-5 sm:p-7 mb-7"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,118,110,0.08) 0%, rgba(15,118,110,0.03) 100%)',
                  borderLeft: '4px solid #0F766E',
                }}
              >
                <p
                  className="font-bold italic leading-snug"
                  style={{
                    color: '#0F766E',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
                  }}
                >
                  "Enquanto o mundo briga por privacidade, Palau a vende em formato digital."
                </p>
              </div>

              <p
                className="mb-7"
                style={{ color: '#3D3D5C', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.7 }}
              >
                <strong style={{ color: '#1A1A2E' }}>Em breve:</strong> guia completo passo a passo para obter sua ID de Palau, com tutorial em vídeo, contornos de KYC e estratégias de uso para autocustódia, exchanges sem KYC brasileiro e construção do seu Plano B.
              </p>

              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)',
                    color: '#FFFFFF',
                    fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                    boxShadow: '0 10px 25px -10px rgba(15,118,110,0.5)',
                  }}
                >
                  <Sparkles size={16} /> Conteúdo em Produção
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ FAQ ═══ */}
        <motion.section
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-8" style={{ color: '#1E3A8A' }}>
            <HelpCircle size={28} />
            <h2
              className="font-black uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontFamily: "'Playfair Display', serif" }}
            >
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(30,58,138,0.18)',
                  boxShadow: '0 8px 25px -15px rgba(30,58,138,0.15)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 transition-colors hover:bg-[rgba(30,58,138,0.04)]"
                >
                  <h3
                    className="font-bold leading-snug pr-4"
                    style={{
                      color: '#1A1A2E',
                      fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {item.pergunta}
                  </h3>
                  <ChevronDown
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    size={22}
                    style={{ color: '#1E3A8A' }}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div
                    className="px-5 sm:px-7 pb-6 pt-2"
                    style={{ borderTop: '1px solid rgba(30,58,138,0.12)' }}
                  >
                    <p style={{ color: '#3D3D5C', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.75, paddingTop: '1rem' }}>
                      {item.resposta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══ CTA FINAL ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-14"
            style={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A8A 100%)',
              boxShadow: '0 35px 80px -30px rgba(30,58,138,0.5)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(201,162,39,0.15) 0%, transparent 60%)' }}
            />

            <div className="relative z-10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em]" style={{ color: '#C9A227' }}>
                Soberania Pessoal
              </span>

              <h3
                className="font-black mt-3 mb-7 leading-[0.95]"
                style={{
                  color: '#F5F0E1',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                }}
              >
                Comece hoje.<br />
                <span style={{ color: '#C9A227', fontStyle: 'italic' }}>Comece pelo Bitcoin.</span>
              </h3>

              <div className="space-y-5 mb-9 max-w-2xl" style={{ color: '#E8DFC8', fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', lineHeight: 1.75 }}>
                <p>
                  A Teoria das Bandeiras não é sobre paranoia. É sobre <strong style={{ color: '#F5F0E1' }}>planejamento racional</strong>. Cada bandeira que você planta é <strong style={{ color: '#C9A227' }}>uma camada a mais de proteção</strong> entre você e qualquer governo abusivo.
                </p>
                <p>
                  Comece com Bitcoin. Depois, uma conta internacional. Depois, uma segunda residência. <strong style={{ color: '#F5F0E1' }}>Um passo de cada vez. Sem pressa. Com estratégia.</strong>
                </p>
              </div>

              <Link
                to="/autocustodia"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-black uppercase tracking-wider transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #C9A227 0%, #E8C25A 100%)',
                  color: '#1A1A2E',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                  boxShadow: '0 15px 35px -10px rgba(201,162,39,0.5)',
                }}
              >
                Começar com Autocustódia <ChevronRight size={22} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ═══ LEIA TAMBÉM ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-7" style={{ color: '#5D5D7D' }}>
            <BookOpen size={22} />
            <h2 className="font-bold uppercase tracking-[0.2em]" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}>
              Leia Também
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação definitiva entre dinheiro sólido e dinheiro de papel', tag: 'COMPARAÇÃO' },
              { to: '/alertas/cbdc-brasil', titulo: 'DREX: A Moeda Programável', desc: 'Como o governo brasileiro pretende controlar cada centavo', tag: 'ALERTA' },
              { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à soberania financeira em capítulos didáticos', tag: 'FUNDAMENTO' },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="rounded-xl p-6 transition-all hover:-translate-y-1 group"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(30,58,138,0.15)',
                  boxShadow: '0 8px 25px -15px rgba(30,58,138,0.15)',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C9A227' }}>
                  {link.tag}
                </span>
                <h3
                  className="font-black mt-2 mb-2 leading-tight transition-colors group-hover:text-[#1E3A8A]"
                  style={{
                    color: '#1A1A2E',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                  }}
                >
                  {link.titulo}
                </h3>
                <p style={{ color: '#5D5D7D', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', lineHeight: 1.6 }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}
