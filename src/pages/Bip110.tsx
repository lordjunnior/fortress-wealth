import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Binary,
  Blocks,
  BookOpen,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  GitFork,
  HandCoins,
  Layers,
  List,
  Lock,
  MessageSquare,
  Network,
  Pickaxe,
  Scale,
  Shield,
  Target,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

import NobelVFX from '@/components/NobelVFX';
import CinematicHero from '@/components/CinematicHero';
import FooterSection from '@/components/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import blockchainBlocos from '@/assets/blockchain-blocos.jpg';
import blockchainLivroRazao from '@/assets/blockchain-livro-razao.jpg';
import blockchainRedeGlobal from '@/assets/blockchain-rede-global.jpg';
import qrCodeImage from '@/assets/qrcode-lightning.jpeg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const AFFILIATE_LINK = 'https://www.kucoin.com/r/rf/QBAPZG6X';
const LIGHTNING_ADDRESS = 'securecorn53@walletofsatoshi.com';

const CHAPTERS = [
  { id: 'problema', label: 'O Problema', num: '01' },
  { id: 'bip-110', label: 'O que é BIP-110', num: '02' },
  { id: 'guerra-bloco', label: 'A Guerra', num: '03' },
  { id: 'impactos', label: 'Impactos Reais', num: '04' },
  { id: 'cenarios', label: 'Cenários', num: '05' },
  { id: 'holder', label: 'Quem possui BTC', num: '06' },
  { id: 'veredicto', label: 'Veredicto', num: '07' },
  { id: 'proximo-passo', label: 'Próximo Passo', num: '08' },
  { id: 'apoiar', label: 'Apoiar Projeto', num: '09' },
  { id: 'faq', label: 'FAQ', num: '10' },
];

const FAQ_DATA = [
  {
    q: 'A BIP-110 é uma tentativa de censura no Bitcoin?',
    a: 'Depende da lente. Para um grupo, ela é limitação técnica para preservar o uso monetário da camada base. Para outro, ela abre precedente de filtragem política sobre o que pode circular. O ponto central é equilibrar neutralidade da rede com custo de validação sustentável.',
  },
  {
    q: 'O número 83 bytes no OP_RETURN é arbitrário?',
    a: 'Não. Esse valor está ligado a políticas históricas de propagação e virou referência no debate sobre “uso aceitável” de espaço de bloco. A controvérsia não é apenas o número em si, mas quem define quando esse limite pode ser relaxado ou reapertado.',
  },
  {
    q: 'Se a BIP-110 avançar, meus satoshis ficam em risco?',
    a: 'Custódia não some automaticamente. O risco maior seria operacional, caso surgisse divergência de consenso entre partes relevantes da rede. Em cenários extremos, usuários poderiam enfrentar confusão temporária de infraestrutura, serviços e confirmação entre implementações.',
  },
  {
    q: 'A proposta realmente reduziria “spam” e liberaria espaço de bloco?',
    a: 'A hipótese dos defensores é exatamente essa: filtrar parte relevante de dados não monetários, reduzir congestionamento e reequilibrar o mercado de taxas para liquidações financeiras. Críticos questionam efeitos colaterais e viabilidade social dessa intervenção.',
  },
  {
    q: 'Qual a chance real de ativação no curto prazo?',
    a: 'Hoje, baixa. Mudanças de consenso no Bitcoin exigem convergência técnica e social ampla por longos ciclos de debate. Sem coordenação robusta entre operadores de node, mineradores, empresas e usuários, ativação rápida tende a não acontecer.',
  },
  {
    q: 'O que um holder deveria fazer agora?',
    a: 'Blindar a base: autocustódia testada, backup funcional, plano de liquidez alternativo e leitura crítica de narrativas. A utilidade prática da discussão é fortalecer sua arquitetura de decisão para eventos de governança futuros.',
  },
];

const METRICS = [
  {
    value: '41%',
    label: 'Transações não monetárias potencialmente filtradas',
    note: 'Estimativa citada por defensores da proposta para justificar a intervenção temporária.',
  },
  {
    value: '36%',
    label: 'Espaço de bloco potencialmente recuperado',
    note: 'Meta operacional: reduzir pressão de mempool em períodos de sobrecarga por inscrições/tokens.',
  },
  {
    value: '83 bytes',
    label: 'Referência histórica para OP_RETURN',
    note: 'Número-símbolo do debate entre limitação técnica e abertura de uso de dados na rede.',
  },
];

const TIMELINE = [
  {
    year: '2009',
    text: 'Bloco gênesis inaugura o Bitcoin com mensagem política clara e foco na função monetária da rede.',
  },
  {
    year: '2017',
    text: 'Guerra dos blocos consolida a lição: mudanças de protocolo sem convergência social cobram preço alto em confiança.',
  },
  {
    year: '2021',
    text: 'Taproot expande expressividade técnica e abre novos caminhos para usos de dados além de pagamentos.',
  },
  {
    year: '2024',
    text: 'Escalada de inscriptions/tokens intensifica o conflito sobre escassez de bloco e prioridade econômica da camada base.',
  },
  {
    year: '2025',
    text: 'BIP-110 surge como resposta de contenção: limitação temporária para tentar restaurar previsibilidade monetária.',
  },
];

const SCENARIOS = [
  {
    title: 'Cenário A — Convergência gradual',
    desc: 'O debate amadurece, regras são refinadas, e o mercado encontra ponto de equilíbrio sem ruptura. Impacto: redução de ruído, menor choque institucional e aprendizado técnico coletivo.',
    icon: CheckCircle2,
  },
  {
    title: 'Cenário B — Impasse prolongado',
    desc: 'Nenhum lado constrói massa crítica suficiente e a disputa permanece no campo narrativo. Impacto: volatilidade de percepção, desgaste político e incerteza recorrente sobre governança.',
    icon: Scale,
  },
  {
    title: 'Cenário C — Fricção operacional',
    desc: 'Partes relevantes do ecossistema divergem em práticas de validação/propagação. Impacto: UX piora no curto prazo, aumenta custo de coordenação e necessidade de planos de contingência.',
    icon: AlertTriangle,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.09 },
  }),
};

const sectionShell = 'relative z-10 py-14 md:py-20';
const panelClass =
  'rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm shadow-[0_10px_35px_hsl(var(--foreground)/0.08)]';

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-border/30">
      <motion.div className="h-full origin-left bg-gradient-to-r from-primary via-primary to-accent" style={{ scaleX }} />
    </div>
  );
};

const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setShow(v > 0.06 && v < 0.985);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: APPLE_EASE }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex flex-col gap-3"
            aria-label="Sumário da página"
          >
            {CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={`group flex items-center gap-3 transition-all duration-300 ${
                  active === chapter.id ? 'opacity-100' : 'opacity-35 hover:opacity-70'
                }`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active === chapter.id
                      ? 'w-3 h-3 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.55)]'
                      : 'w-2 h-2 bg-muted-foreground/60'
                  }`}
                />
                <span
                  className={`text-[9px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                    active === chapter.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {chapter.num} · {chapter.label}
                </span>
              </a>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed right-4 bottom-4 z-[55] xl:hidden"
          >
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-12 h-12 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg flex items-center justify-center"
              aria-label="Abrir sumário"
            >
              <List className="w-5 h-5 text-foreground" />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  className="absolute bottom-14 right-0 min-w-[210px] p-3 rounded-xl border border-border bg-card/95 backdrop-blur-sm"
                  aria-label="Sumário da página"
                >
                  {CHAPTERS.map((chapter) => (
                    <a
                      key={chapter.id}
                      href={`#${chapter.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`block text-xs px-3 py-2 rounded-lg transition-colors ${
                        active === chapter.id
                          ? 'bg-primary/15 text-primary font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      {chapter.num} · {chapter.label}
                    </a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ChapterKickoff: React.FC<{ number: string; title: string; subtitle: string }> = ({ number, title, subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-10 md:mb-14">
      <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">{number}</span>
        <div className="h-px w-10 bg-gradient-to-r from-primary/80 to-transparent" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-3 leading-[1.05]"
        style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif" }}
      >
        {title}
      </motion.h2>

      <motion.p variants={fadeUp} custom={2} className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

const SectionGlow = () => (
  <div className="relative z-10 max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />
);

const TimelineItem: React.FC<{ year: string; text: string; delay: number }> = ({ year, text, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.52, ease: APPLE_EASE, delay }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/70" />
        <div className="w-px h-full min-h-[28px] bg-border" />
      </div>
      <div className="pb-5">
        <p className="font-mono text-[10px] tracking-wider text-primary">{year}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{text}</p>
      </div>
    </motion.div>
  );
};

export default function Bip110() {
  return (
    <>
      <Helmet>
        <title>A Guerra do Espaço de Bloco (BIP-110): O Conflito Dentro do Bitcoin | Lord Junnior</title>
        <meta
          name="description"
          content="A Guerra do Espaço de Bloco: análise estratégica da BIP-110 com narrativa progressiva, impactos em taxas, mineração e Lightning, cenários possíveis e veredicto editorial para quem possui Bitcoin."
        />
        <meta
          name="keywords"
          content="BIP-110, guerra do espaço de bloco, conflito dentro do Bitcoin, OP_RETURN 83 bytes, RDTS, consenso Bitcoin, Lightning Network, mineração, taxas, autocustódia"
        />
        <meta property="og:title" content="A Guerra do Espaço de Bloco (BIP-110): O Conflito Dentro do Bitcoin" />
        <meta
          property="og:description"
          content="Entenda o conflito técnico e político sobre a BIP-110: limitação de dados, consenso, impactos reais e o que muda para quem possui Bitcoin."
        />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <meta property="og:url" content="https://lordjunnior.com.br/protocolo-bitcoin/bip-110" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A Guerra do Espaço de Bloco: BIP-110 sem simplificação" />
        <meta
          name="twitter:description"
          content="Uma análise forte e defensável sobre a BIP-110: disputa de consenso, impactos econômicos e plano de ação para holders."
        />
        <meta name="twitter:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/protocolo-bitcoin/bip-110" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'A Guerra do Espaço de Bloco (BIP-110): O Conflito Dentro do Bitcoin',
              description:
                'Página editorial sobre BIP-110 com estrutura progressiva: problema, explicação, impactos, cenários e veredicto para quem possui Bitcoin.',
              author: { '@type': 'Person', name: 'Lord Junnior' },
              publisher: {
                '@type': 'Organization',
                name: 'Lord Junnior',
                logo: { '@type': 'ImageObject', url: 'https://lordjunnior.com.br/og-image.png' },
              },
              datePublished: '2025-02-22',
              dateModified: '2026-03-15',
              image: 'https://lordjunnior.com.br/heroes/bip-110.webp',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://lordjunnior.com.br/protocolo-bitcoin/bip-110',
              },
              inLanguage: 'pt-BR',
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_DATA.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </Helmet>

      <ReadingProgressBar />
      <FloatingToc />
      <NobelVFX accentColor="amber" />

      <CinematicHero
        phase="PROTOCOLO BITCOIN • ANÁLISE EDITORIAL"
        title="A GUERRA SILENCIOSA DENTRO DO BITCOIN"
        subtitle="Uma proposta chamada BIP-110 pode redefinir o que pode — e o que não pode — ocupar o espaço de bloco da rede."
        image="/heroes/bip-110.webp"
        icon={GitFork}
        accentColor="amber"
        backLink="/blockchain"
        backLabel="Blockchain"
      />

      <main className="relative z-10">
        <section id="problema" className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: APPLE_EASE }}
              className={`${panelClass} p-6 md:p-8`}
            >
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                Existe uma guerra acontecendo dentro do Bitcoin. Ela não gira em torno do preço. Ela não gira em torno
                de promessas de marketing. Ela gira em torno de uma pergunta estrutural: quem define o que pode existir
                dentro da blockchain? Fotos, tokens, inscrições e dados arbitrários devem competir em igualdade total
                com transações monetárias, ou a camada base precisa de limitação técnica para preservar sua função
                principal de liquidação financeira global?
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
                Esse é o erro que quase todos cometem: focar no ruído e ignorar a arquitetura de controle. A BIP-110
                não é só uma proposta técnica; ela é um teste de governança sobre o futuro institucional do Bitcoin.
              </p>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        <section id="bip-110" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 02"
              title="O que é a BIP-110, sem enrolação"
              subtitle="Uma proposta de soft fork temporário (RDTS) para limitar dados não monetários por uma janela de aproximadamente um ano."
            />

            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {METRICS.map((metric, idx) => (
                <motion.article
                  key={metric.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.56, ease: APPLE_EASE, delay: idx * 0.08 }}
                  className={`${panelClass} p-5 md:p-6`}
                >
                  <p className="text-2xl md:text-3xl font-black text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {metric.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">{metric.label}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{metric.note}</p>
                </motion.article>
              ))}
            </div>

            <article className={`${panelClass} p-6 md:p-8`}>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Clock,
                    title: 'Janela de 52.416 blocos',
                    desc: 'A proposta define prazo para endurecimento temporário das regras de uso de espaço de bloco.',
                  },
                  {
                    icon: Binary,
                    title: 'Foco em limitação de carga não monetária',
                    desc: 'A tese é reduzir pressão artificial no mempool sem bloquear transações financeiras legítimas.',
                  },
                  {
                    icon: Layers,
                    title: 'Regras em script/witness sob revisão',
                    desc: 'Debate técnico envolve impacto em estruturas de dados e possíveis exceções para estados prévios.',
                  },
                  {
                    icon: Lock,
                    title: 'Coordenação social é o ponto crítico',
                    desc: 'Mesmo com lógica técnica coerente, ativação depende de legitimidade ampla entre os atores da rede.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border/70 bg-secondary/40 p-4">
                    <item.icon className="w-4 h-4 text-primary mb-2" />
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <SectionGlow />

        <section id="guerra-bloco" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 03"
              title="A guerra pelo espaço de bloco"
              subtitle="Dois princípios legítimos em choque: preservar função monetária versus manter neutralidade total de uso mediante taxa."
            />

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <article className={`${panelClass} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Linha do tempo do conflito
                </h3>
                <div>
                  {TIMELINE.map((item, i) => (
                    <TimelineItem key={item.year} year={item.year} text={item.text} delay={i * 0.05} />
                  ))}
                </div>
              </article>

              <article className={`${panelClass} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" /> Lado A vs Lado B
                </h3>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/70 bg-secondary/40 p-5">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" /> Lado A — Bitcoin deve priorizar dinheiro
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A visão defende limitação de dados não monetários para manter custo de node acessível, preservar
                      descentralização prática e evitar deslocamento da função monetária por cargas oportunistas de alta
                      densidade.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-secondary/40 p-5">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" /> Lado B — Quem paga taxa pode usar como quiser
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A visão sustenta que filtrar finalidade de dados cria precedente político perigoso. Se uma
                      transação atende regras de consenso e paga o preço de mercado, bloquear uso seria enfraquecer a
                      neutralidade que dá credibilidade global ao protocolo.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <SectionGlow />

        <section id="impactos" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 04"
              title="Impactos reais"
              subtitle="Se o debate avança, os efeitos atingem mineração, taxas de transação e estabilidade de liquidação para Lightning."
            />

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  img: blockchainBlocos,
                  icon: Pickaxe,
                  title: 'Mineradores',
                  desc: 'No curto prazo, mudanças de política alteram composição de fees; no longo prazo, o mercado avalia se isso fortalece ou fragiliza o valor do ativo base que remunera a segurança da rede.',
                },
                {
                  img: blockchainLivroRazao,
                  icon: CircleDollarSign,
                  title: 'Taxas de transação',
                  desc: 'A disputa por espaço de bloco define prioridade econômica de liquidação. Limitações podem reduzir sobrecarga em certos cenários, mas também mudam incentivos de produção de demanda.',
                },
                {
                  img: blockchainRedeGlobal,
                  icon: Zap,
                  title: 'Lightning Network',
                  desc: 'A camada 2 depende de previsibilidade em L1 para abrir e fechar canais com segurança. Em ambiente de fricção de consenso, aumenta o custo de coordenação operacional.',
                },
              ].map((card, i) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.58, ease: APPLE_EASE, delay: i * 0.08 }}
                  className={`${panelClass} overflow-hidden`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <card.icon className="w-4 h-4 text-primary" /> {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        <section id="cenarios" className={sectionShell}>
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 05"
              title="Cenários possíveis"
              subtitle="Três caminhos plausíveis para o ecossistema caso o debate continue escalando."
            />

            <div className="grid md:grid-cols-3 gap-5">
              {SCENARIOS.map((scenario, i) => (
                <motion.article
                  key={scenario.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: APPLE_EASE, delay: i * 0.08 }}
                  className={`${panelClass} p-6`}
                >
                  <scenario.icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-sm font-bold text-foreground">{scenario.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{scenario.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        <section id="holder" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 06"
              title="O que isso muda para quem possui Bitcoin"
              subtitle="Menos ansiedade, mais protocolo: a resposta prática está em blindagem operacional e não em reação emocional ao feed."
            />

            <article className={`${panelClass} p-6 md:p-8`}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-border/70 bg-secondary/40 p-5">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-primary" /> Para o holder
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    O foco continua sendo autocustódia sólida, backup testado e disciplina de longo prazo. A BIP-110 não
                    exige pânico operacional imediato para quem já tem arquitetura básica de segurança pessoal.
                  </p>
                </div>

                <div className="rounded-xl border border-border/70 bg-secondary/40 p-5">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                    <Network className="w-4 h-4 text-primary" /> Para quem depende de liquidez
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ter apenas uma rota de execução é fragilidade. Monte redundância: canal alternativo de saída,
                    infraestrutura de recebimento e plano de contingência para períodos de ruído narrativo.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <SectionGlow />

        <section id="veredicto" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 07"
              title="Veredicto editorial"
              subtitle="Forte, porém defensável: avaliação técnica sem alarmismo e sem fragilidade argumentativa."
            />

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.72, ease: APPLE_EASE }}
              className={`${panelClass} p-8 md:p-10`}
            >
              <div className="flex items-center gap-3 mb-5">
                <BadgeAlert className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">ANÁLISE FINAL</span>
              </div>

              <h3 className="text-xl md:text-3xl font-black text-foreground leading-tight mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Hoje, a chance de ativação rápida da BIP-110 é extremamente baixa.
              </h3>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  O suporte público observado segue minoritário e não sinaliza convergência de curto prazo. Mudanças de
                  consenso no Bitcoin historicamente exigem ciclos longos de debate técnico, coordenação social e
                  teste institucional antes de qualquer movimento robusto de ativação.
                </p>
                <p>
                  Em linguagem prática: o debate importa muito, mas o risco imediato para quem possui Bitcoin em
                  autocustódia disciplinada permanece controlável. O ganho real está em usar esse tema para elevar sua
                  maturidade de decisão e sua infraestrutura de soberania.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        <section id="proximo-passo" className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 08"
              title="Próximo passo"
              subtitle="Se você quer interpretar debates como a BIP-110 sem depender de terceiros, precisa dominar o protocolo por dentro."
            />

            <div className="grid md:grid-cols-3 gap-5">
              <article className={`${panelClass} p-6`}>
                <BookOpen className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-2">Fundamentos de Blockchain</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Entenda bloco, mempool, validação e consenso para não ser refém de simplificações frágeis.
                </p>
                <Link to="/blockchain" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                  Estudar agora <ArrowRight className="w-4 h-4" />
                </Link>
              </article>

              <article className={`${panelClass} p-6`}>
                <Blocks className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-2">Camada de Mineração</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Compreenda incentivos de taxa e segurança para avaliar consequências reais de qualquer mudança.
                </p>
                <Link to="/mineracao" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                  Ver mineração <ArrowRight className="w-4 h-4" />
                </Link>
              </article>

              <article className={`${panelClass} p-6`}>
                <Shield className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm font-bold text-foreground mb-2">Rota operacional ativa</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Não espere crise para montar alternativa de liquidez. Estruture execução enquanto há calma.
                </p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  Ativar rota <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <SectionGlow />

        <section id="apoiar" className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 09"
              title="Apoiar o projeto"
              subtitle="Depois de consumir o conteúdo e validar valor, você pode fortalecer a continuidade da biblioteca educacional."
            />

            <article className={`${panelClass} p-6 md:p-8`}>
              <div className="grid md:grid-cols-[220px,1fr] gap-6 items-center">
                <div className="rounded-xl border border-border/70 bg-secondary/40 p-3">
                  <img src={qrCodeImage} alt="QR Code Lightning" className="w-full h-auto rounded-lg" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                    <HandCoins className="w-4 h-4 text-primary" /> Apoio via Lightning Network
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Seu apoio mantém produção editorial independente, aprofundamento técnico e expansão contínua do
                    ecossistema de soberania financeira em português.
                  </p>
                  <p className="text-xs font-mono text-primary break-all mb-4">{LIGHTNING_ADDRESS}</p>
                  <a
                    href={`lightning:${LIGHTNING_ADDRESS}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/15 transition-colors"
                  >
                    Doar via Lightning <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <SectionGlow />

        <section id="faq" className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 10"
              title="Perguntas frequentes"
              subtitle="FAQ alinhado ao conteúdo visível da página para reforçar consistência técnica e SEO estruturado."
            />

            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="rounded-xl border border-border/80 bg-card/75 px-5">
                  <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
