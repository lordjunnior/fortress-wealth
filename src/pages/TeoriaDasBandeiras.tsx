import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ChevronDown, HelpCircle, Shield, Globe, Flag, AlertTriangle,
  Wallet, Check, MapPin, Sparkles, ArrowRight, Plane, Building2,
  FileSignature, Bitcoin, Clock, BookOpen, CheckCircle2,
} from 'lucide-react';
import { POR_QUE_AGORA, CASO_BRASIL, PRIMEIROS_PASSOS, FAQ_ITEMS } from '@/lib/teoriaBandeirasData';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import PageFloatingToc from '@/components/PageFloatingToc';

import heroImg from '@/assets/bandeiras-hero-flatlay.jpg';
import palauImg from '@/assets/bandeiras-palau-island.jpg';
import imgPassport from '@/assets/bandeiras-passport-airport.jpg';
import imgCard from '@/assets/bandeiras-card.jpg';
import imgDoc from '@/assets/bandeiras-document.jpg';
import imgSkyline from '@/assets/bandeiras-skyline.jpg';
import imgBitcoinGold from '@/assets/bandeiras-bitcoin-gold.jpg';

/* ─────────────────────────────────────────────
   PALETA "Pergaminho & Indigo Real"
   Cream #F8F4E9 · Bone #EFE6CE · Indigo #1E3A8A
   Gold #C9A227 · Emerald #047857 · Ink #1A1A2E
   Tipografia ampliada para leitura sênior:
   corpo 20–22px · line-height 1.7
   ───────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

const TOC_ITEMS = [
  { id: 'crenca', label: 'Quebra de Crença' },
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'problema', label: 'O Problema' },
  { id: 'bandeiras', label: 'As 5 Bandeiras' },
  { id: 'por-que', label: 'Por Que Agora' },
  { id: 'brasil', label: 'O Caso Brasil' },
  { id: 'primeiros-passos', label: 'Primeiros Passos' },
  { id: 'transicao', label: 'Nova Camada' },
  { id: 'palau', label: 'Refúgio Palau' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta-final', label: 'Comece Hoje' },
];

const BANDEIRA_CARDS = [
  {
    numero: 1,
    titulo: 'Cidadania / Residência',
    subtitulo: 'Mobilidade jurídica',
    img: imgPassport,
    alt: 'Passaporte aberto com vistos em terminal de aeroporto',
    icon: Plane,
  },
  {
    numero: 2,
    titulo: 'Contas Internacionais',
    subtitulo: 'Redundância financeira',
    img: imgCard,
    alt: 'Cartão de débito internacional sobre smartphone com app bancário',
    icon: Wallet,
  },
  {
    numero: 3,
    titulo: 'Domicílio Fiscal',
    subtitulo: 'Eficiência tributária',
    img: imgDoc,
    alt: 'Caneta tinteiro assinando documento oficial com selo de cera',
    icon: FileSignature,
  },
  {
    numero: 4,
    titulo: 'Negócios Internacionais',
    subtitulo: 'Estrutura global',
    img: imgSkyline,
    alt: 'Skyline de distrito financeiro internacional ao amanhecer',
    icon: Building2,
  },
  {
    numero: 5,
    titulo: 'Ativos Descentralizados',
    subtitulo: 'Proteção patrimonial',
    img: imgBitcoinGold,
    alt: 'Moeda física de Bitcoin ao lado de barra de ouro sobre mármore',
    icon: Bitcoin,
  },
];

const TIMELINE_BRASIL = [
  { ano: '1990', titulo: 'Confisco da Poupança', desc: 'Plano Collor bloqueou cruzados de toda uma geração da noite para o dia.' },
  { ano: '1986–94', titulo: 'Hiperinflação', desc: 'Seis trocas de moeda em menos de 10 anos. Poder de compra evaporou.' },
  { ano: 'Hoje', titulo: 'Tributação Crescente', desc: 'Carga tributária ~34% do PIB. Reforma elevando ITCMD em quase todos os estados.' },
  { ano: 'Hoje', titulo: 'Bloqueios Judiciais', desc: 'Decisões cautelares congelam contas e patrimônio sem aviso prévio.' },
  { ano: '2025+', titulo: 'Avanço do DREX', desc: 'CBDC programável em desenvolvimento pelo Banco Central.' },
  { ano: 'Em pauta', titulo: 'Restrições ao Físico', desc: 'Projetos como o PL 3.951 abrem precedente para limitar dinheiro em espécie.' },
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
  headline: 'Teoria das Bandeiras: Como Construir uma Vida Que Não Dependa de Um Único Governo',
  description: 'Guia completo da Teoria das Bandeiras (Flag Theory) com as 5 bandeiras, caso Brasil, primeiros passos práticos e gancho para a ID de Palau.',
  author: { '@type': 'Person', name: 'Lord Junnior' },
  publisher: { '@type': 'Organization', name: 'Lord Junnior', url: 'https://lordjunnior.com.br' },
  datePublished: '2026-03-07',
  dateModified: '2026-04-17',
  url: 'https://lordjunnior.com.br/teoria-das-bandeiras',
  image: 'https://lordjunnior.com.br/og-bandeiras.jpg',
  keywords: 'teoria das bandeiras, flag theory, diversificação jurisdicional, segunda cidadania, residência paraguai, ID Palau, soberania pessoal, plano b patrimonial, autocustódia bitcoin',
};

/* Tipos visuais reusáveis */
const SectionTitle: React.FC<{
  Icon: React.ElementType; color: string; eyebrow?: string; children: React.ReactNode;
}> = ({ Icon, color, eyebrow, children }) => (
  <div className="mb-10">
    {eyebrow && (
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color }}>
        {eyebrow}
      </p>
    )}
    <div className="flex items-center gap-4" style={{ color: '#1A1A2E' }}>
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0"
        style={{ background: color, boxShadow: `0 10px 25px -10px ${color}80` }}
      >
        <Icon size={26} color="#F8F4E9" />
      </div>
      <h2
        className="font-black tracking-tight leading-[1.05]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
        }}
      >
        {children}
      </h2>
    </div>
  </div>
);

export default function TeoriaDasBandeiras() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F4E9 0%, #F1E9D2 60%, #EFE6CE 100%)',
        color: '#1A1A2E',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Helmet>
        <title>Teoria das Bandeiras: Não Dependa de Um Único Governo | Lord Junnior</title>
        <meta name="description" content="Guia definitivo da Teoria das Bandeiras (Flag Theory) para brasileiros: as 5 bandeiras, o caso Brasil, primeiros passos práticos e a ID Soberana de Palau. Construa seu Plano B." />
        <meta name="keywords" content="teoria das bandeiras, flag theory brasil, segunda cidadania, residência paraguai, ID Palau, plano B patrimonial, soberania pessoal, autocustódia bitcoin, diversificação jurisdicional, offshore legal" />
        <link rel="canonical" href="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:title" content="Teoria das Bandeiras: A Estratégia Para Não Depender de Um Único Governo" />
        <meta property="og:description" content="As 5 bandeiras que protegem patrimônio, liberdade e família. Inclui o gancho da ID Soberana de Palau." />
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

      {/* ═══════════ HERO 2 COLUNAS ═══════════ */}
      <header className="relative w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-20 sm:pt-16 sm:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ESQUERDA */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.25)' }}
            >
              <Sparkles size={16} style={{ color: '#C9A227' }} />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em]" style={{ color: '#1E3A8A' }}>
                Estratégia Avançada de Soberania
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="font-black uppercase tracking-[0.18em] mb-5"
              style={{ color: '#B91C1C', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
            >
              Faça isso hoje. Agradeça amanhã.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="font-black leading-[0.98] tracking-tight mb-7"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#1A1A2E',
                fontSize: 'clamp(2.6rem, 6vw, 5.4rem)',
              }}
            >
              Como construir uma vida que <span style={{ color: '#1E3A8A', fontStyle: 'italic' }}>não dependa</span> de um único governo.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="space-y-5 mb-9"
              style={{ color: '#2D2D44', fontSize: 'clamp(1.18rem, 1.5vw, 1.4rem)', lineHeight: 1.7 }}
            >
              <p>
                A maioria das pessoas concentra <strong style={{ color: '#1E3A8A' }}>dinheiro, documentos, negócios e liberdade</strong> em uma única jurisdição.
              </p>
              <p>
                Isso não é obrigatório. <strong style={{ color: '#B91C1C' }}>É apenas o padrão.</strong>
              </p>
              <p>
                Esta página mostra como construir alternativas reais, passo a passo, com base na Teoria das Bandeiras.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#bandeiras"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
                  color: '#F8F4E9',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                  boxShadow: '0 14px 35px -12px rgba(30,58,138,0.55)',
                }}
              >
                Ver a estratégia completa <ArrowRight size={20} />
              </a>
              <a
                href="#primeiros-passos"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                style={{
                  background: 'transparent',
                  color: '#1A1A2E',
                  border: '2px solid #1A1A2E',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                }}
              >
                Começar pelo primeiro passo
              </a>
            </motion.div>
          </div>

          {/* DIREITA — Imagem editorial flat-lay com badges flutuantes */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 35px 90px -25px rgba(30,58,138,0.35)', border: '1px solid rgba(201,162,39,0.25)' }}
            >
              <img
                src={heroImg}
                alt="Mesa clara com passaporte, mapa, cartão e compasso, simbolizando diversificação jurisdicional"
                className="w-full h-auto block"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(248,244,233,0.25) 100%)' }} />
            </motion.div>

            {/* Badges flutuantes */}
            {[
              { Icon: BookOpen, text: 'Guia Completo', top: '-14px', left: '-14px', bg: '#1E3A8A', color: '#F8F4E9' },
              { Icon: Clock, text: 'Leitura: 8 min', top: '-14px', right: '-14px', bg: '#C9A227', color: '#1A1A2E' },
              { Icon: CheckCircle2, text: 'Passo a passo', bottom: '-14px', left: '-14px', bg: '#047857', color: '#F8F4E9' },
              { Icon: Flag, text: 'Aplicável no Brasil', bottom: '-14px', right: '-14px', bg: '#1A1A2E', color: '#F8F4E9' },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.6 + i * 0.1 }}
                className="absolute hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap"
                style={{
                  top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                  background: b.bg, color: b.color,
                  boxShadow: '0 10px 25px -8px rgba(0,0,0,0.25)',
                }}
              >
                <b.Icon size={14} />
                {b.text}
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════ CONTEÚDO PRINCIPAL ═══════════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">

        {/* ═══ BLOCO 1 — QUEBRA DE CRENÇA (PNL) ═══ */}
        <motion.section
          id="crenca"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={Sparkles} color="#B91C1C" eyebrow="Bloco 01">
            Dependência<br />não é inevitável.
          </SectionTitle>

          <div
            className="rounded-2xl p-7 sm:p-12"
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(185,28,28,0.18)',
              boxShadow: '0 22px 60px -30px rgba(185,28,28,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="mb-6" style={{ color: '#2D2D44', fontSize: 'clamp(1.18rem, 1.55vw, 1.4rem)', lineHeight: 1.7 }}>
              Você foi condicionado a acreditar que:
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Seu dinheiro deve estar no sistema local.',
                'Sua vida jurídica depende de um único país.',
                'Sua mobilidade é limitada ao seu passaporte.',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: 'rgba(185,28,28,0.12)', border: '1px solid rgba(185,28,28,0.35)' }}>
                    <span className="font-black text-sm" style={{ color: '#B91C1C' }}>{i + 1}</span>
                  </div>
                  <p style={{ color: '#1A1A2E', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', lineHeight: 1.65 }}>{t}</p>
                </div>
              ))}
            </div>
            <p className="font-black leading-tight" style={{ color: '#1E3A8A', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>
              Nada disso é estrutural.<br />
              Tudo isso é apenas <em>organização padrão</em>.
            </p>
            <p className="mt-3 font-bold" style={{ color: '#C9A227', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)' }}>
              E padrões podem ser reconfigurados.
            </p>
          </div>
        </motion.section>

        {/* ═══ BLOCO 2 — O QUE É (SEO) ═══ */}
        <motion.section
          id="o-que-e"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={Globe} color="#1E3A8A" eyebrow="Bloco 02">
            O que é a <span style={{ fontStyle: 'italic' }}>Teoria das Bandeiras</span>.
          </SectionTitle>

          <div
            className="rounded-2xl p-7 sm:p-12"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(30,58,138,0.18)',
              boxShadow: '0 22px 60px -30px rgba(30,58,138,0.22)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="space-y-6" style={{ color: '#2D2D44', fontSize: 'clamp(1.18rem, 1.55vw, 1.4rem)', lineHeight: 1.75 }}>
              <p>
                A <strong style={{ color: '#1E3A8A' }}>Teoria das Bandeiras</strong> (Flag Theory) é uma estratégia internacional de diversificação de jurisdição.
              </p>
              <p>
                A ideia é simples: <strong style={{ color: '#B91C1C' }}>não concentrar sua vida em um único governo</strong>.
              </p>
              <p>Ao distribuir:</p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 not-prose">
                {['Cidadania', 'Contas', 'Negócios', 'Ativos'].map((w, i) => (
                  <li key={i}
                    className="rounded-xl p-4 text-center font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.2)', color: '#1E3A8A', fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
                    {w}
                  </li>
                ))}
              </ul>
              <p>
                você reduz risco, aumenta liberdade e cria <strong style={{ color: '#047857' }}>redundância</strong>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 3 — PROBLEMA ═══ */}
        <motion.section
          id="problema"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={AlertTriangle} color="#B91C1C" eyebrow="Bloco 03">
            O problema de depender<br />de <span style={{ fontStyle: 'italic' }}>um único país</span>.
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { titulo: 'Patrimônio sob influência', desc: 'Um governo influencia diretamente seu patrimônio.' },
              { titulo: 'Vida financeira bloqueável', desc: 'Uma decisão pode bloquear toda sua vida financeira.' },
              { titulo: 'Estrutura volátil', desc: 'Uma mudança política altera toda sua estrutura.' },
            ].map((c, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUp}
                className="rounded-2xl p-6 sm:p-7"
                style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(185,28,28,0.2)', boxShadow: '0 14px 35px -20px rgba(185,28,28,0.2)' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)' }}>
                  <span className="font-black" style={{ color: '#B91C1C' }}>{i + 1}</span>
                </div>
                <h3 className="font-black mb-2" style={{ color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 1.7vw, 1.45rem)' }}>{c.titulo}</h3>
                <p style={{ color: '#3D3D5C', fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', lineHeight: 1.7 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div
            className="rounded-2xl p-7 sm:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A8A 100%)' }}
          >
            <p className="font-black leading-tight" style={{ color: '#F8F4E9', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Concentração é <span style={{ color: '#B91C1C' }}>vulnerabilidade</span>.<br />
              Diversificação é <span style={{ color: '#C9A227' }}>estratégia</span>.
            </p>
          </div>
        </motion.section>

        {/* ═══ BLOCO 4 — AS 5 BANDEIRAS (CARDS COM IMAGEM) ═══ */}
        <motion.section
          id="bandeiras"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={Flag} color="#1E3A8A" eyebrow="Bloco 04">
            As 5 Bandeiras<br />da Soberania.
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {BANDEIRA_CARDS.map((b, i) => (
              <motion.article
                key={i} custom={i} variants={fadeUp}
                className="rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(30,58,138,0.18)',
                  boxShadow: '0 18px 45px -25px rgba(30,58,138,0.3)',
                }}
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1024}
                    height={1024}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(26,26,46,0.65) 100%)' }} />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center font-black"
                    style={{ background: '#C9A227', color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', boxShadow: '0 8px 20px -6px rgba(0,0,0,0.4)' }}>
                    {b.numero}
                  </div>
                  <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(248,244,233,0.95)' }}>
                    <b.icon size={20} color="#1E3A8A" />
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-black leading-tight mb-2" style={{ color: '#1E3A8A', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2vw, 1.75rem)' }}>
                    {b.titulo}
                  </h3>
                  <p className="font-bold uppercase tracking-widest" style={{ color: '#C9A227', fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)' }}>
                    {b.subtitulo}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* ═══ BLOCO 5 — POR QUE AGORA ═══ */}
        <motion.section
          id="por-que"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={AlertTriangle} color="#B91C1C" eyebrow="Bloco 05">
            Por que essa estratégia<br />deixou de ser opcional.
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POR_QUE_AGORA.map((item, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUp}
                className="rounded-2xl p-7 transition-all hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(185,28,28,0.2)', boxShadow: '0 15px 40px -20px rgba(185,28,28,0.18)' }}
              >
                <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#C9A227' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)' }}>
                  <item.icon size={26} color="#F8F4E9" />
                </div>
                <h3 className="font-black mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 1.85vw, 1.55rem)', color: '#1A1A2E' }}>
                  {item.titulo}
                </h3>
                <p style={{ color: '#3D3D5C', fontSize: 'clamp(1.05rem, 1.35vw, 1.18rem)', lineHeight: 1.7 }}>
                  {item.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ BLOCO 6 — CASO BRASIL (TIMELINE) ═══ */}
        <motion.section
          id="brasil"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={MapPin} color="#1A1A2E" eyebrow="Bloco 06 · Prova">
            O Caso Brasil.
          </SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-8 relative">
              <div className="absolute left-5 sm:left-6 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg, #1E3A8A 0%, #C9A227 50%, #B91C1C 100%)' }} />
              <div className="space-y-6">
                {TIMELINE_BRASIL.map((t, i) => (
                  <motion.div
                    key={i} custom={i} variants={fadeUp}
                    className="relative pl-14 sm:pl-16"
                  >
                    <div className="absolute left-0 top-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                      style={{ background: '#1A1A2E', border: '2px solid #C9A227', boxShadow: '0 6px 16px -4px rgba(0,0,0,0.3)' }}>
                      <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: '#C9A227' }}>
                        {t.ano}
                      </span>
                    </div>
                    <div className="rounded-xl p-5 sm:p-6"
                      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(30,58,138,0.15)' }}>
                      <h3 className="font-black mb-2 leading-snug"
                        style={{ color: '#1E3A8A', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)' }}>
                        {t.titulo}
                      </h3>
                      <p style={{ color: '#3D3D5C', fontSize: 'clamp(1.05rem, 1.4vw, 1.18rem)', lineHeight: 1.7 }}>
                        {t.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Destaque lateral */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 rounded-2xl p-7 sm:p-8"
                style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #1E3A8A 100%)', boxShadow: '0 25px 60px -25px rgba(30,58,138,0.5)' }}>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A227' }}>
                  Conclusão
                </p>
                <p className="font-black leading-tight"
                  style={{ color: '#F8F4E9', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                  Quem tem 100% da vida em um país está <span style={{ color: '#C9A227' }}>100% exposto</span>.
                </p>
                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(201,162,39,0.25)' }}>
                  <p style={{ color: 'rgba(248,244,233,0.85)', fontSize: '1rem', lineHeight: 1.65 }}>
                    Os fatos do dossiê ao lado não são teoria. São <strong style={{ color: '#F8F4E9' }}>histórico verificável</strong>.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Bullets adicionais do dataset original */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CASO_BRASIL.slice(6).map((b, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-4"
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(30,58,138,0.12)' }}>
                <Check size={18} color="#1E3A8A" className="mt-1 shrink-0" />
                <span style={{ color: '#1A1A2E', fontSize: '1.05rem', lineHeight: 1.55 }}>{b}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══ BLOCO 7 — PRIMEIROS PASSOS (JORNADA) ═══ */}
        <motion.section
          id="primeiros-passos"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={Wallet} color="#047857" eyebrow="Bloco 07 · Jornada">
            Como começar<br />na prática.
          </SectionTitle>

          <div className="relative">
            {/* Barra lateral de progresso */}
            <div className="absolute left-7 sm:left-9 top-4 bottom-4 w-1 rounded-full hidden sm:block"
              style={{ background: 'linear-gradient(180deg, #047857 0%, #1E3A8A 50%, #C9A227 100%)' }} />

            <div className="space-y-6">
              {PRIMEIROS_PASSOS.map((step, i) => (
                <motion.div
                  key={step.passo} custom={i} variants={fadeUp}
                  className="relative sm:pl-24 rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(4,120,87,0.2)', boxShadow: '0 14px 40px -22px rgba(4,120,87,0.25)' }}
                >
                  <div
                    className="sm:absolute sm:left-2 sm:top-6 mb-4 sm:mb-0 w-16 h-16 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #047857 0%, #0D9488 100%)', boxShadow: '0 10px 25px -10px rgba(4,120,87,0.55)' }}
                  >
                    <span className="font-black text-2xl sm:text-3xl" style={{ color: '#F8F4E9', fontFamily: "'Playfair Display', serif" }}>
                      {step.passo}
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: '#047857' }}>
                    Etapa {step.passo}
                  </p>
                  <h3 className="font-black leading-tight mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', color: '#1E3A8A' }}>
                    {step.titulo}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(201,162,39,0.15)', color: '#8B6F0F', border: '1px solid rgba(201,162,39,0.3)' }}>
                      Dificuldade: {step.dificuldade}
                    </span>
                    <span className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(30,58,138,0.1)', color: '#1E3A8A', border: '1px solid rgba(30,58,138,0.25)' }}>
                      Custo: {step.custo}
                    </span>
                  </div>

                  <p style={{ color: '#3D3D5C', fontSize: 'clamp(1.1rem, 1.45vw, 1.25rem)', lineHeight: 1.7 }}>
                    {step.descricao}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 8 — TRANSIÇÃO ═══ */}
        <motion.section
          id="transicao"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <div
            className="rounded-2xl p-8 sm:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(201,162,39,0.08) 100%)',
              border: '1px dashed rgba(30,58,138,0.3)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-5" style={{ color: '#C9A227' }}>
              Bloco 08 · Transição
            </p>
            <h2 className="font-black leading-tight mb-7"
              style={{ fontFamily: "'Playfair Display', serif", color: '#1A1A2E', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Uma nova camada<br />de <span style={{ color: '#1E3A8A', fontStyle: 'italic' }}>soberania</span>.
            </h2>
            <p className="max-w-2xl mx-auto mb-7" style={{ color: '#3D3D5C', fontSize: 'clamp(1.15rem, 1.55vw, 1.35rem)', lineHeight: 1.7 }}>
              Historicamente, a estratégia envolvia <strong>território, bancos e estruturas jurídicas</strong>.
            </p>
            <p className="font-black" style={{ color: '#1E3A8A', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>
              Hoje existe uma nova camada:<br />
              <span style={{ color: '#047857', fontStyle: 'italic' }}>identidade internacional digital.</span>
            </p>
          </div>
        </motion.section>

        {/* ═══ BLOCO 9 — PALAU (FULL WIDTH) ═══ */}
        <motion.section
          id="palau"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24 -mx-5 sm:-mx-8 lg:-mx-12"
        >
          <div className="relative overflow-hidden">
            <div className="relative h-[420px] sm:h-[560px]">
              <img
                src={palauImg}
                alt="Vista aérea das ilhas paradisíacas de Palau, refúgio soberano para residência digital"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.55) 0%, rgba(26,26,46,0.7) 100%)' }} />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#FDE047' }}>
                    Bloco 09 · Gancho Premium
                  </p>
                  <h2 className="font-black leading-[0.95] mb-5"
                    style={{ color: '#FFFFFF', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
                    Refúgio Final:<br /><em>Palau</em>.
                  </h2>
                  <p className="max-w-2xl" style={{ color: 'rgba(255,255,255,0.92)', fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', lineHeight: 1.6 }}>
                    Uma <strong>identidade soberana</strong> emitida por uma nação no Pacífico.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(248,244,233,0.97)' }}>
              <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
                <p className="mb-7" style={{ color: '#2D2D44', fontSize: 'clamp(1.18rem, 1.55vw, 1.4rem)', lineHeight: 1.75 }}>
                  Palau oferece um dos programas mais acessíveis de <strong style={{ color: '#0F766E' }}>identidade digital emitida por uma nação soberana</strong>. Para quem busca:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { t: 'Redundância documental', d: 'Segundo documento oficial reconhecido internacionalmente.' },
                    { t: 'Acesso internacional', d: 'Abertura de contas em exchanges e fintechs globais sem CPF.' },
                    { t: 'Flexibilidade operacional', d: 'Processo 100% online, sem necessidade de viajar.' },
                  ].map((b, i) => (
                    <div key={i} className="rounded-xl p-5"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(15,118,110,0.25)', boxShadow: '0 10px 25px -15px rgba(15,118,110,0.3)' }}>
                      <Check size={22} color="#0F766E" className="mb-3" />
                      <h4 className="font-black mb-2" style={{ color: '#0F766E', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)' }}>
                        {b.t}
                      </h4>
                      <p style={{ color: '#3D3D5C', fontSize: '1.05rem', lineHeight: 1.6 }}>{b.d}</p>
                    </div>
                  ))}
                </div>

                <p className="font-black italic mb-9 leading-snug"
                  style={{ color: '#0F766E', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.4vw, 1.95rem)', borderLeft: '4px solid #C9A227', paddingLeft: '1.25rem' }}>
                  "Enquanto o mundo briga por privacidade,<br />Palau a vende em formato digital."
                </p>

                <div className="flex flex-wrap gap-4">
                  <span
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-lg font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)',
                      color: '#FFFFFF',
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                      boxShadow: '0 12px 30px -10px rgba(15,118,110,0.55)',
                    }}
                  >
                    <Sparkles size={18} /> Ver como funciona (em breve)
                  </span>
                  <span
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-lg font-bold uppercase tracking-wider"
                    style={{
                      background: 'transparent',
                      color: '#0F766E',
                      border: '2px solid #0F766E',
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                    }}
                  >
                    Entrar na lista de espera
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 10 — FAQ ═══ */}
        <motion.section
          id="faq"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="mb-24 sm:mb-32 scroll-mt-24"
        >
          <SectionTitle Icon={HelpCircle} color="#1E3A8A" eyebrow="Bloco 10">
            Perguntas Frequentes.
          </SectionTitle>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              const isHighlight = i === 0;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: isHighlight ? 'rgba(201,162,39,0.07)' : 'rgba(255,255,255,0.85)',
                    border: isHighlight ? '2px solid rgba(201,162,39,0.45)' : '1px solid rgba(30,58,138,0.18)',
                    boxShadow: isOpen ? '0 12px 30px -18px rgba(30,58,138,0.25)' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-5 p-5 sm:p-7 text-left"
                  >
                    <span className="font-bold leading-snug" style={{ color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.15rem, 1.7vw, 1.4rem)' }}>
                      {isHighlight && <span className="text-xs font-black uppercase tracking-[0.25em] mr-2" style={{ color: '#C9A227' }}>★</span>}
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      size={22}
                      className="shrink-0 transition-transform"
                      style={{ color: '#1E3A8A', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-6 sm:pb-7" style={{ color: '#3D3D5C', fontSize: 'clamp(1.08rem, 1.4vw, 1.22rem)', lineHeight: 1.75 }}>
                      {item.resposta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══ BLOCO 11 — CTA FINAL ═══ */}
        <motion.section
          id="cta-final"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="scroll-mt-24"
        >
          <div
            className="rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F1E9D2 100%)',
              border: '2px solid rgba(201,162,39,0.4)',
              boxShadow: '0 30px 80px -30px rgba(201,162,39,0.35)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-30"
              style={{ background: 'radial-gradient(circle at 30% 20%, rgba(30,58,138,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(201,162,39,0.2), transparent 50%)' }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-5" style={{ color: '#C9A227' }}>
                Bloco 11 · Soberania Pessoal
              </p>
              <h2 className="font-black leading-[1.02] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1A1A2E', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
                Comece hoje.<br /><span style={{ color: '#1E3A8A', fontStyle: 'italic' }}>Com estratégia.</span>
              </h2>
              <p className="max-w-xl mx-auto mb-9" style={{ color: '#2D2D44', fontSize: 'clamp(1.18rem, 1.55vw, 1.4rem)', lineHeight: 1.7 }}>
                Você não precisa mudar tudo de uma vez.<br />
                <strong style={{ color: '#B91C1C' }}>Mas precisa começar.</strong>
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#primeiros-passos"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
                    color: '#F8F4E9',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                    boxShadow: '0 14px 35px -12px rgba(30,58,138,0.55)',
                  }}
                >
                  Começar agora <ArrowRight size={20} />
                </a>
                <a
                  href="#bandeiras"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  style={{
                    background: 'transparent',
                    color: '#1A1A2E',
                    border: '2px solid #1A1A2E',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                  }}
                >
                  Ver plano completo
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
