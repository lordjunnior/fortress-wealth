import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flag,
  Globe,
  Quote,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  PALAU_PRICING,
  PALAU_INCLUI,
  PALAU_USOS,
  NEOBANKS,
  EXCHANGES,
  LIMITACOES,
  FAQ_PALAU,
  PALAU_VS_PARAGUAI,
} from '@/lib/palauData';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import PageFloatingToc from '@/components/PageFloatingToc';

import heroImg from '@/assets/palau-hero-flatlay.jpg';
import islandsImg from '@/assets/palau-islands-aerial.jpg';
import idHandsImg from '@/assets/palau-id-hands.jpg';
import exchangePhoneImg from '@/assets/palau-exchange-phone.jpg';
import neobankCardImg from '@/assets/palau-neobank-card.jpg';
import passportImg from '@/assets/palau-passport-travel.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

const pageTheme = {
  '--page-bg': '42 52% 95%',
  '--page-surface': '44 45% 98%',
  '--page-surface-strong': '40 42% 92%',
  '--page-ink': '226 34% 18%',
  '--page-muted': '224 15% 36%',
  '--page-primary': '210 78% 36%',
  '--page-primary-strong': '212 85% 26%',
  '--page-secondary': '157 54% 31%',
  '--page-gold': '44 75% 50%',
  '--page-danger': '0 70% 43%',
  '--page-border': '224 26% 80%',
  '--page-shadow': '212 60% 28%',
} as React.CSSProperties;

const tocItems = [
  { id: 'hero', label: 'Visão Geral' },
  { id: 'crenca', label: 'Quebra de Crença' },
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'inclui', label: 'O Que Inclui' },
  { id: 'precos', label: 'Preços' },
  { id: 'usos', label: 'Onde Usar' },
  { id: 'neobanks', label: 'Neobanks' },
  { id: 'exchanges', label: 'Exchanges' },
  { id: 'limitacoes', label: 'Limitações' },
  { id: 'comparativo', label: 'Vs Paraguai' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta-final', label: 'Fechamento' },
];

const heroBadges = [
  { icon: BookOpen, label: 'Guia Completo' },
  { icon: Clock, label: 'Leitura: 8 min' },
  { icon: CheckCircle2, label: 'Passo a passo' },
  { icon: Flag, label: 'USD 248 / ano' },
];

const titleStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  lineHeight: 0.95,
  letterSpacing: '-0.03em',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: index * 0.08 },
  }),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Palau Digital Residency: Identidade Soberana no Pacífico para KYC Internacional',
  description:
    'Guia completo do ID de Palau (Sovereignty-Backed Web3 ID): o que é, quanto custa, quais neobanks e exchanges aceitam, limitações reais e quando faz sentido para brasileiros.',
  author: { '@type': 'Person', name: 'Lord Junnior' },
  publisher: { '@type': 'Organization', name: 'Lord Junnior' },
  datePublished: '2026-04-17',
  dateModified: '2026-04-17',
  url: 'https://lordjunnior.com.br/palau-digital-residency',
  image: 'https://lordjunnior.com.br/og-palau.jpg',
  keywords:
    'palau id, palau digital residency, rns id, kyc palau, neobank palau, exchange palau, identidade soberana, soulbound token, web3 id, soberania documental',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_PALAU.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: item.resposta },
  })),
};

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-4xl mb-10 sm:mb-14">
      <p
        className="mb-4 text-sm sm:text-base font-black uppercase tracking-[0.32em]"
        style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
      >
        {kicker}
      </p>
      <h2
        className="text-5xl sm:text-6xl lg:text-7xl"
        style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-5 max-w-3xl text-lg sm:text-xl lg:text-[1.45rem] leading-[1.75]"
          style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function CTAButton({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener sponsored' : undefined}
      className="group inline-flex items-center justify-center gap-3 rounded-full px-7 sm:px-9 py-4 sm:py-5 text-sm sm:text-base font-black uppercase tracking-[0.18em] transition-all duration-500 hover:-translate-y-0.5"
      style={{
        ...bodyStyle,
        color: secondary ? 'hsl(var(--page-ink))' : 'hsl(var(--page-surface))',
        background: secondary
          ? 'hsl(var(--page-surface) / 0.85)'
          : 'linear-gradient(135deg, hsl(var(--page-primary)) 0%, hsl(var(--page-primary-strong)) 100%)',
        border: secondary ? '1px solid hsl(var(--page-border))' : '1px solid hsl(var(--page-primary) / 0.35)',
        boxShadow: secondary
          ? '0 16px 40px -24px hsl(var(--page-shadow) / 0.22)'
          : '0 22px 55px -22px hsl(var(--page-primary) / 0.55)',
      }}
    >
      {children}
      {external ? (
        <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" size={18} />
      ) : (
        <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" size={18} />
      )}
    </a>
  );
}

export default function PalauDigitalResidency() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.14]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.35], [0, prefersReducedMotion ? 0 : -64]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.86]);
  const islandY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        ...pageTheme,
        backgroundColor: 'hsl(var(--page-bg))',
        color: 'hsl(var(--page-ink))',
      }}
    >
      <Helmet>
        <title>Palau ID: Residência Digital, KYC e Soberania Documental | Lord Junnior</title>
        <meta
          name="description"
          content="Guia completo do Palau Digital Residency (ID de Palau): o que é, quanto custa, neobanks e exchanges que aceitam, limitações reais e como usar para soberania documental."
        />
        <meta
          name="keywords"
          content="palau id, palau digital residency, rns id, kyc palau, neobank palau, exchange palau, soulbound token, identidade soberana, web3 id"
        />
        <link rel="canonical" href="https://lordjunnior.com.br/palau-digital-residency" />
        <meta property="og:title" content="Palau ID: Identidade Soberana no Pacífico" />
        <meta
          property="og:description"
          content="Como funciona o ID de Palau, onde usar, quanto custa e por que ele é a próxima camada de soberania documental para brasileiros."
        />
        <meta property="og:url" content="https://lordjunnior.com.br/palau-digital-residency" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-palau.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative z-40 px-4 sm:px-8 lg:px-16 pt-6">
        <BackToHome />
      </div>

      <PageFloatingToc items={tocItems} accentColor="amber" />
      <ScrollToTop />

      {/* HERO */}
      <header id="hero" className="relative min-h-[100svh] -mt-16 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={heroImg}
            alt="Composição editorial com cartão de identidade de Palau, passaporte, smartphone bancário e bússola sobre mesa clara"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(var(--page-bg) / 0.12) 0%, hsl(var(--page-bg) / 0.05) 22%, hsl(var(--page-bg) / 0.58) 58%, hsl(var(--page-bg)) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, hsl(var(--page-bg) / 0.95) 0%, hsl(var(--page-bg) / 0.65) 28%, transparent 58%, transparent 100%)',
          }}
        />

        <div className="relative z-20 mx-auto flex min-h-[100svh] w-[min(1700px,94vw)] items-end pb-14 pt-28 sm:pb-20 lg:pb-24">
          <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-14">
            <motion.div
              style={{ y: heroContentY, opacity: heroContentOpacity }}
              className="max-w-5xl rounded-[2rem] p-6 sm:p-9 lg:p-12"
            >
              <div
                className="inline-flex items-center gap-3 rounded-full px-5 py-3 mb-6"
                style={{
                  backgroundColor: 'hsl(var(--page-surface) / 0.78)',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 16px 50px -28px hsl(var(--page-shadow) / 0.22)',
                }}
              >
                <Sparkles size={18} style={{ color: 'hsl(var(--page-gold))' }} />
                <span
                  className="text-sm sm:text-base font-black uppercase tracking-[0.3em]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
                >
                  Identidade Soberana no Pacífico
                </span>
              </div>

              <p
                className="mb-5 text-base sm:text-lg font-black uppercase tracking-[0.24em]"
                style={{ ...bodyStyle, color: 'hsl(var(--page-danger))' }}
              >
                A Camada Documental Que Falta na Sua Estratégia.
              </p>

              <h1
                className="max-w-5xl text-[4.2rem] leading-none sm:text-[5.8rem] lg:text-[8.5rem] xl:text-[9.6rem]"
                style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}
              >
                Palau Digital Residency
              </h1>

              <p
                className="mt-7 max-w-3xl text-2xl sm:text-3xl lg:text-[2.1rem] leading-[1.35] font-bold"
                style={{ ...bodyStyle, color: 'hsl(var(--page-primary-strong))' }}
              >
                Uma identidade emitida por uma nação soberana. USD 248 e algumas semanas de espera.
              </p>

              <div className="mt-6 max-w-3xl space-y-5">
                <p
                  className="text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.7]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}
                >
                  O Palau ID é um cartão oficial emitido pelo governo da República de Palau. Você usa para KYC em
                  exchanges, onboarding em neobanks e em qualquer plataforma que exija comprovação legal de identidade.
                </p>
                <p
                  className="text-lg sm:text-xl lg:text-[1.35rem] leading-[1.75]"
                  style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}
                >
                  Esta página mostra exatamente onde funciona, onde não funciona, quanto custa e como integrar à sua
                  estratégia de soberania.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  'Entrega global em algumas semanas',
                  'Onboarding em neobanks alternativos',
                  'KYC aceito em grandes exchanges',
                ].map((proof) => (
                  <div
                    key={proof}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface) / 0.92)',
                      border: '1px solid hsl(var(--page-secondary) / 0.4)',
                      boxShadow: '0 10px 30px -22px hsl(var(--page-shadow) / 0.3)',
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'hsl(var(--page-secondary))' }} />
                    <span className="text-sm sm:text-base font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {proof}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="https://rns.id/?rc_by=UaXUiIDb" external>
                  Solicitar meu Palau ID
                </CTAButton>
                <CTAButton href="#neobanks" secondary>
                  Ver onde funciona
                </CTAButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
                {heroBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface) / 0.92)',
                      border: '1px solid hsl(var(--page-border))',
                    }}
                  >
                    <badge.icon size={18} style={{ color: 'hsl(var(--page-primary))' }} />
                    <span className="text-sm font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="hidden lg:flex flex-col gap-4">
              {heroBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl px-6 py-5"
                  style={{
                    backgroundColor: 'hsl(var(--page-surface) / 0.94)',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 18px 50px -30px hsl(var(--page-shadow) / 0.4)',
                  }}
                >
                  <badge.icon size={22} style={{ color: 'hsl(var(--page-primary))' }} />
                  <span className="text-base font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* QUEBRA DE CRENÇA */}
      <section id="crenca" className="relative py-24 sm:py-32">
        <div className="mx-auto w-[min(1500px,92vw)]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center"
          >
            <div>
              <SectionHeading
                kicker="Quebra de Crença"
                title={<>Você não precisa de cidadania para ter privacidade documental.</>}
                description="A maioria assume que só passaporte e residência geram alternativas reais. Errado. O Palau ID adiciona uma camada documental que não exige mudança de país, processo presencial, advogado nem investimento alto. É a porta mais simples para começar."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Tudo precisa estar no seu CPF.',
                  'Só passaporte funciona em fintechs.',
                  'É preciso morar fora para ter ID estrangeiro.',
                  'Identidade digital não é levada a sério.',
                ].map((myth) => (
                  <div
                    key={myth}
                    className="flex items-start gap-3 rounded-2xl p-5"
                    style={{
                      backgroundColor: 'hsl(var(--page-surface))',
                      border: '1px solid hsl(var(--page-border))',
                    }}
                  >
                    <XCircle size={22} style={{ color: 'hsl(var(--page-danger))' }} className="mt-0.5 shrink-0" />
                    <p className="text-lg sm:text-[1.2rem] leading-[1.6] font-semibold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                      {myth}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="relative overflow-hidden rounded-[2rem]"
              style={{ boxShadow: '0 40px 100px -50px hsl(var(--page-shadow) / 0.5)' }}
            >
              <img
                src={idHandsImg}
                alt="Mãos segurando cartão de identidade governamental sobre mesa clara com laptop ao fundo"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                width={1600}
                height={1100}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O QUE É */}
      <section id="o-que-e" className="relative py-24 sm:py-32" style={{ backgroundColor: 'hsl(var(--page-surface))' }}>
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="O Que É"
            title={<>O ID que vem de um país, não de uma empresa.</>}
            description="O Palau Digital Residency (RNS ID) é uma identificação oficial emitida pelo governo da República de Palau, nação soberana no Pacífico. Não é cartão de fidelidade, não é mock-up, não é credencial corporativa. É documento estatal real, com cartão físico enviado ao seu endereço em qualquer país do mundo."
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              {[
                {
                  titulo: 'Backed by Sovereignty',
                  texto:
                    'Emitido pelo governo de Palau via plataforma RNS ID, o protocolo oficial autorizado pela legislação local.',
                },
                {
                  titulo: 'Soulbound Web3 ID',
                  texto:
                    'Inspirado no padrão SBT proposto por Vitalik Buterin: identidade intransferível e verificável publicamente, ponte natural entre Web2 e Web3.',
                },
                {
                  titulo: 'Adoção Real',
                  texto:
                    'Tim Draper, bilionário do Vale do Silício, foi o primeiro residente digital da plataforma em 2022. Hoje milhares de usuários globais utilizam o ID em fintechs e exchanges.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.titulo}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 sm:p-7"
                  style={{
                    backgroundColor: 'hsl(var(--page-bg))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: '0 14px 40px -28px hsl(var(--page-shadow) / 0.3)',
                  }}
                >
                  <h3
                    className="text-3xl sm:text-4xl mb-2"
                    style={{ ...titleStyle, color: 'hsl(var(--page-primary-strong))' }}
                  >
                    {item.titulo}
                  </h3>
                  <p className="text-lg sm:text-[1.2rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                    {item.texto}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="relative overflow-hidden rounded-[2rem] aspect-[4/5]"
              style={{ boxShadow: '0 40px 100px -50px hsl(var(--page-shadow) / 0.5)' }}
            >
              <img
                src={passportImg}
                alt="Passaporte aberto sobre mesa clara com sombra de palmeiras tropicais"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                width={1600}
                height={1100}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* INCLUI */}
      <section id="inclui" className="relative py-24 sm:py-32">
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="O Que Vem no Pacote"
            title={<>4 camadas em uma única solicitação.</>}
            description="Quando você adquire o ID de Palau via RNS ID, recebe quatro componentes integrados que cobrem tanto o uso tradicional (cartão físico) quanto o universo Web3 (DIDs cunhados em blockchain)."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {PALAU_INCLUI.map((item, i) => (
              <motion.div
                key={item.titulo}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: 'hsl(var(--page-surface))',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 18px 48px -32px hsl(var(--page-shadow) / 0.32)',
                }}
              >
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--page-primary)), hsl(var(--page-primary-strong)))',
                    color: 'hsl(var(--page-surface))',
                  }}
                >
                  <item.icon size={26} />
                </div>
                <h3 className="text-3xl sm:text-4xl mb-3" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                  {item.titulo}
                </h3>
                <p className="text-lg sm:text-[1.2rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                  {item.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECOS */}
      <section
        id="precos"
        className="relative py-24 sm:py-32"
        style={{ backgroundColor: 'hsl(var(--page-surface-strong))' }}
      >
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="Preços Oficiais (RNS ID)"
            title={<>Três janelas de validade. Você escolhe.</>}
            description="O ID tem validade de 1, 5 ou 10 anos, semelhante a qualquer documento estatal. Quanto maior a duração, menor o custo médio anual e maior a proteção contra futuras mudanças de preço."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {PALAU_PRICING.map((plan, i) => (
              <motion.div
                key={plan.duracao}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl p-8 sm:p-10 transition-transform duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: plan.destaque ? 'hsl(var(--page-primary-strong))' : 'hsl(var(--page-surface))',
                  border: plan.destaque
                    ? '1px solid hsl(var(--page-gold))'
                    : '1px solid hsl(var(--page-border))',
                  boxShadow: plan.destaque
                    ? '0 30px 80px -40px hsl(var(--page-primary-strong) / 0.6)'
                    : '0 18px 48px -32px hsl(var(--page-shadow) / 0.3)',
                  color: plan.destaque ? 'hsl(var(--page-surface))' : 'hsl(var(--page-ink))',
                }}
              >
                {plan.destaque && (
                  <div
                    className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: 'hsl(var(--page-gold))',
                      color: 'hsl(var(--page-primary-strong))',
                    }}
                  >
                    <Sparkles size={12} /> Recomendado
                  </div>
                )}
                <p
                  className="mb-2 text-sm font-black uppercase tracking-[0.3em]"
                  style={{ ...bodyStyle, color: plan.destaque ? 'hsl(var(--page-gold))' : 'hsl(var(--page-primary))' }}
                >
                  Duração
                </p>
                <h3 className="text-5xl sm:text-6xl mb-4" style={{ ...titleStyle }}>
                  {plan.duracao}
                </h3>
                <p
                  className="text-3xl sm:text-4xl font-black mb-5"
                  style={{ ...bodyStyle, color: plan.destaque ? 'hsl(var(--page-gold))' : 'hsl(var(--page-primary-strong))' }}
                >
                  {plan.preco}
                </p>
                <p
                  className="text-lg sm:text-[1.15rem] leading-[1.7]"
                  style={{
                    ...bodyStyle,
                    color: plan.destaque ? 'hsl(var(--page-surface) / 0.85)' : 'hsl(var(--page-muted))',
                  }}
                >
                  {plan.descricao}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl p-7 sm:p-8"
            style={{
              backgroundColor: 'hsl(var(--page-surface))',
              border: '1px solid hsl(var(--page-border))',
            }}
          >
            <div className="max-w-2xl">
              <p
                className="mb-1 text-sm font-black uppercase tracking-[0.3em]"
                style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
              >
                Pagamento
              </p>
              <p className="text-xl sm:text-2xl font-bold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                Stripe (cartão internacional) ou Web3: ETH, BNB, MATIC, USDT, USDC e BUSD nas redes ETH e BSC.
              </p>
            </div>
            <CTAButton href="https://rns.id/?rc_by=UaXUiIDb" external>
              Iniciar solicitação
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* USOS */}
      <section id="usos" className="relative py-24 sm:py-32">
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="Onde Usar"
            title={<>Aplicações práticas que justificam o investimento.</>}
            description="O ID de Palau não é decoração. Ele resolve casos reais e recorrentes do operador internacional moderno."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {PALAU_USOS.map((uso, i) => (
              <motion.div
                key={uso.titulo}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex items-start gap-5 rounded-3xl p-7 sm:p-8 transition-transform duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: 'hsl(var(--page-surface))',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 14px 40px -28px hsl(var(--page-shadow) / 0.3)',
                }}
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: 'hsl(var(--page-primary) / 0.12)',
                    color: 'hsl(var(--page-primary-strong))',
                  }}
                >
                  <uso.icon size={26} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl mb-2" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                    {uso.titulo}
                  </h3>
                  <p className="text-lg sm:text-[1.15rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    {uso.descricao}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEOBANKS */}
      <section id="neobanks" className="relative py-24 sm:py-32" style={{ backgroundColor: 'hsl(var(--page-surface))' }}>
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="Bancos Digitais que Aceitam"
            title={<>Os neobanks compatíveis em 2026.</>}
            description="Bancos tradicionais americanos exigem passaporte e comprovante local. Esses neobanks são a alternativa real para começar a operar com o ID de Palau hoje."
          />

          <div className="mb-10 flex items-start gap-4 rounded-3xl p-6 sm:p-7"
               style={{
                 backgroundColor: 'hsl(var(--page-danger) / 0.08)',
                 border: '1px solid hsl(var(--page-danger) / 0.4)',
               }}>
            <AlertTriangle size={28} style={{ color: 'hsl(var(--page-danger))' }} className="shrink-0 mt-0.5" />
            <p className="text-lg sm:text-[1.2rem] leading-[1.7] font-semibold" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
              Pesquise a reputação de cada instituição antes de fazer depósitos.
              Alguns desses neobanks ainda não puderam ser auditados por nosso time.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {NEOBANKS.map((bank, i) => (
              <motion.a
                key={bank.nome}
                href={bank.link}
                target="_blank"
                rel="noopener sponsored"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group block overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: 'hsl(var(--page-bg))',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 18px 48px -32px hsl(var(--page-shadow) / 0.32)',
                }}
              >
                <div className="aspect-[16/8] overflow-hidden">
                  <img
                    src={neobankCardImg}
                    alt={`Cartão internacional representando ${bank.nome}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1600}
                    height={800}
                  />
                </div>
                <div className="p-7 sm:p-8">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-3xl sm:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                      {bank.nome}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em]"
                      style={{
                        backgroundColor:
                          bank.nivel === 'verificado'
                            ? 'hsl(var(--page-secondary) / 0.15)'
                            : 'hsl(var(--page-gold) / 0.18)',
                        color:
                          bank.nivel === 'verificado'
                            ? 'hsl(var(--page-secondary))'
                            : 'hsl(var(--page-gold))',
                      }}
                    >
                      {bank.nivel === 'verificado' ? 'Verificado' : 'Cautela'}
                    </span>
                  </div>
                  <p className="text-lg sm:text-[1.15rem] leading-[1.7] mb-4" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    {bank.descricao}
                  </p>
                  {bank.aviso && (
                    <p
                      className="mb-4 flex items-start gap-2 text-base font-semibold"
                      style={{ ...bodyStyle, color: 'hsl(var(--page-danger))' }}
                    >
                      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                      {bank.aviso}
                    </p>
                  )}
                  <span
                    className="inline-flex items-center gap-2 text-base font-black uppercase tracking-[0.2em]"
                    style={{ ...bodyStyle, color: 'hsl(var(--page-primary))' }}
                  >
                    Abrir conta <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* EXCHANGES */}
      <section id="exchanges" className="relative py-24 sm:py-32">
        <div className="mx-auto w-[min(1500px,92vw)]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center mb-14">
            <div>
              <SectionHeading
                kicker="Exchanges Compatíveis"
                title={<>As corretoras que aceitam o Palau ID.</>}
                description="Compliance muda constantemente. No momento desta publicação, estas são as exchanges relevantes que aceitam o ID de Palau no KYC. Sempre revalide antes de migrar volumes."
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="relative overflow-hidden rounded-[2rem]"
              style={{ boxShadow: '0 40px 100px -50px hsl(var(--page-shadow) / 0.5)' }}
            >
              <img
                src={exchangePhoneImg}
                alt="Smartphone exibindo dashboard de exchange cripto sobre mesa clara com café e caderno"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                width={1600}
                height={1100}
              />
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXCHANGES.map((ex, i) => (
              <motion.a
                key={ex.nome}
                href={ex.link}
                target="_blank"
                rel="noopener sponsored"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex items-center justify-between gap-4 rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: 'hsl(var(--page-surface))',
                  border: '1px solid hsl(var(--page-border))',
                  boxShadow: '0 14px 40px -28px hsl(var(--page-shadow) / 0.3)',
                }}
              >
                <div>
                  <h3 className="text-3xl mb-1" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                    {ex.nome}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                    {ex.regiao}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  style={{ color: 'hsl(var(--page-primary))' }}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </motion.a>
            ))}
          </div>

          <p className="mt-8 text-base sm:text-lg italic" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
            * Bybit é citada por alguns operadores, mas em testes recentes o cadastro com Palau ID não foi concluído.
            Algumas exchanges brasileiras também alegam aceitar via regulação local — sempre teste antes de assumir.
          </p>
        </div>
      </section>

      {/* LIMITAÇÕES */}
      <section
        id="limitacoes"
        className="relative py-24 sm:py-32"
        style={{ backgroundColor: 'hsl(var(--page-surface-strong))' }}
      >
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="Limites Reais"
            title={<>O que o Palau ID NÃO faz.</>}
            description="Influenciadores costumam vender o ID de Palau como solução universal. Não é. Aqui estão as limitações reais que você precisa entender antes de comprar."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {LIMITACOES.map((lim, i) => (
              <motion.div
                key={lim.titulo}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl p-7 sm:p-8"
                style={{
                  backgroundColor: 'hsl(var(--page-surface))',
                  border: '1px solid hsl(var(--page-danger) / 0.3)',
                  boxShadow: '0 18px 48px -32px hsl(var(--page-shadow) / 0.3)',
                }}
              >
                <div className="mb-3 flex items-start gap-3">
                  <XCircle size={26} style={{ color: 'hsl(var(--page-danger))' }} className="shrink-0 mt-0.5" />
                  <h3 className="text-3xl sm:text-4xl" style={{ ...titleStyle, color: 'hsl(var(--page-ink))' }}>
                    {lim.titulo}
                  </h3>
                </div>
                <p className="text-lg sm:text-[1.2rem] leading-[1.7]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                  {lim.descricao}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 flex items-start gap-5 rounded-3xl p-8 sm:p-10"
            style={{
              backgroundColor: 'hsl(var(--page-primary-strong))',
              boxShadow: '0 30px 80px -40px hsl(var(--page-primary-strong) / 0.6)',
            }}
          >
            <Quote size={40} style={{ color: 'hsl(var(--page-gold))' }} className="shrink-0" />
            <p
              className="text-2xl sm:text-3xl lg:text-4xl leading-[1.4] font-bold"
              style={{ ...bodyStyle, color: 'hsl(var(--page-surface))' }}
            >
              O ID de Palau não substitui passaporte nem residência. Ele adiciona uma camada documental
              que reduz exposição e abre portas em fintechs e exchanges. Use como complemento, nunca como solução única.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section id="comparativo" className="relative py-24 sm:py-32">
        <div className="mx-auto w-[min(1500px,92vw)]">
          <SectionHeading
            kicker="Palau vs Cédula Paraguaia"
            title={<>Documento digital ou residência permanente?</>}
            description="Comparação direta entre as duas estratégias mais buscadas por brasileiros para sair da dependência exclusiva do CPF."
          />

          <div
            className="overflow-hidden rounded-3xl"
            style={{
              backgroundColor: 'hsl(var(--page-surface))',
              border: '1px solid hsl(var(--page-border))',
              boxShadow: '0 18px 48px -32px hsl(var(--page-shadow) / 0.3)',
            }}
          >
            <div
              className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 px-6 sm:px-8 py-5"
              style={{
                backgroundColor: 'hsl(var(--page-primary-strong))',
                color: 'hsl(var(--page-surface))',
              }}
            >
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.18em]" style={bodyStyle}>
                Critério
              </p>
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.18em]" style={bodyStyle}>
                Palau ID
              </p>
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.18em]" style={bodyStyle}>
                Cédula Paraguaia
              </p>
            </div>

            {PALAU_VS_PARAGUAI.map((row, i) => (
              <div
                key={row.criterio}
                className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 px-6 sm:px-8 py-5"
                style={{
                  borderTop: '1px solid hsl(var(--page-border))',
                  backgroundColor: i % 2 === 0 ? 'hsl(var(--page-surface))' : 'hsl(var(--page-bg))',
                }}
              >
                <p className="text-base sm:text-lg font-black" style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}>
                  {row.criterio}
                </p>
                <p className="text-base sm:text-lg leading-[1.6]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                  {row.palau}
                </p>
                <p className="text-base sm:text-lg leading-[1.6]" style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}>
                  {row.paraguai}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGEM PARALLAX ILHAS */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: islandY, scale: 1.1 }}>
          <img
            src={islandsImg}
            alt="Vista aérea das ilhas de Palau no Pacífico, com lagoas turquesa e ilhas verdes em formato de cogumelo"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(var(--page-bg)) 0%, transparent 22%, transparent 78%, hsl(var(--page-bg)) 100%)',
          }}
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <p
            className="max-w-4xl text-center text-3xl sm:text-5xl lg:text-6xl leading-[1.2] font-bold"
            style={{
              ...bodyStyle,
              color: 'hsl(var(--page-surface))',
              textShadow: '0 4px 32px hsl(var(--page-shadow) / 0.6)',
            }}
          >
            Uma nação soberana no Pacífico emite o seu próximo documento.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="relative py-24 sm:py-32"
        style={{ backgroundColor: 'hsl(var(--page-surface))' }}
      >
        <div className="mx-auto w-[min(1200px,92vw)]">
          <SectionHeading
            kicker="Perguntas Frequentes"
            title={<>Tudo que você quer saber antes de comprar.</>}
            description="Respostas diretas para as buscas mais frequentes sobre Palau ID, RNS ID, neobanks e KYC internacional."
          />

          <div className="space-y-4">
            {FAQ_PALAU.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={item.pergunta}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="overflow-hidden rounded-3xl"
                  style={{
                    backgroundColor: 'hsl(var(--page-bg))',
                    border: '1px solid hsl(var(--page-border))',
                    boxShadow: isOpen ? '0 24px 60px -36px hsl(var(--page-shadow) / 0.45)' : 'none',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 sm:px-8 py-6 sm:py-7 text-left"
                  >
                    <span
                      className="text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.35] font-bold"
                      style={{ ...bodyStyle, color: 'hsl(var(--page-ink))' }}
                    >
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      size={24}
                      style={{ color: 'hsl(var(--page-primary))' }}
                      className={`shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-6 sm:px-8 pb-7 text-lg sm:text-[1.2rem] leading-[1.75]"
                      style={{ ...bodyStyle, color: 'hsl(var(--page-muted))' }}
                    >
                      {item.resposta}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" className="relative py-28 sm:py-36">
        <div className="mx-auto w-[min(1400px,92vw)]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-16 lg:p-20"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--page-primary-strong)) 0%, hsl(var(--page-primary)) 60%, hsl(var(--page-secondary)) 100%)',
              boxShadow: '0 50px 120px -50px hsl(var(--page-primary-strong) / 0.7)',
            }}
          >
            <div className="absolute inset-0 opacity-30">
              <img src={islandsImg} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--page-primary-strong) / 0.85), hsl(var(--page-primary) / 0.7))' }} />

            <div className="relative z-10 max-w-4xl">
              <p
                className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.32em]"
                style={{ ...bodyStyle, color: 'hsl(var(--page-gold))' }}
              >
                Próximo Passo
              </p>
              <h2
                className="text-5xl sm:text-7xl lg:text-8xl"
                style={{ ...titleStyle, color: 'hsl(var(--page-surface))' }}
              >
                Solicite seu Palau ID hoje.
              </h2>
              <p
                className="mt-6 max-w-3xl text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.55] font-semibold"
                style={{ ...bodyStyle, color: 'hsl(var(--page-surface) / 0.95)' }}
              >
                USD 248 e algumas semanas. Você passa a ter uma identidade emitida por uma nação soberana,
                pronta para KYC em exchanges, neobanks e qualquer plataforma que exija comprovação legal.
              </p>
              <p
                className="mt-5 max-w-3xl text-lg sm:text-xl leading-[1.7]"
                style={{ ...bodyStyle, color: 'hsl(var(--page-surface) / 0.85)' }}
              >
                Se você não fizer nada, nada muda. Se solicitar hoje, em algumas semanas você ganha uma camada
                documental que a maioria dos brasileiros nem sabe que existe.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://rns.id/?rc_by=UaXUiIDb"
                  target="_blank"
                  rel="noopener sponsored"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-9 py-5 text-base font-black uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    ...bodyStyle,
                    backgroundColor: 'hsl(var(--page-gold))',
                    color: 'hsl(var(--page-primary-strong))',
                    boxShadow: '0 22px 55px -22px hsl(var(--page-gold) / 0.7)',
                  }}
                >
                  Solicitar via RNS ID
                  <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" size={20} />
                </a>
                <a
                  href="/teoria-das-bandeiras"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-9 py-5 text-base font-black uppercase tracking-[0.2em] transition-all duration-500"
                  style={{
                    ...bodyStyle,
                    backgroundColor: 'hsl(var(--page-surface) / 0.15)',
                    color: 'hsl(var(--page-surface))',
                    border: '1px solid hsl(var(--page-surface) / 0.3)',
                  }}
                >
                  Ver Teoria das Bandeiras
                  <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
