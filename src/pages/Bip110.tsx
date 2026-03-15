import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  GitFork,
  Shield,
  AlertTriangle,
  Network,
  Scale,
  Clock,
  Users,
  Zap,
  BookOpen,
  Lock,
  Layers,
  Binary,
  MessageSquare,
  Target,
  BadgeAlert,
  Vote,
  Pickaxe,
  Radar,
  CircleDollarSign,
  CheckCircle2,
} from 'lucide-react';

import NobelVFX from '@/components/NobelVFX';
import CinematicHero from '@/components/CinematicHero';
import FooterSection from '@/components/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import blockchainRedeGlobal from '@/assets/blockchain-rede-global.jpg';
import blockchainBlocos from '@/assets/blockchain-blocos.jpg';
import blockchainLivroRazao from '@/assets/blockchain-livro-razao.jpg';

const AFFILIATE_LINK = 'https://www.kucoin.com/r/rf/QBAPZG6X';
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const sectionShell = 'relative z-10 py-14 md:py-20';
const sectionInner = 'max-w-6xl mx-auto px-4 md:px-10';
const panelClass = 'rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm shadow-sm';

const SectionGlow = () => (
  <div className="relative z-10 h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />
);

const ChapterKickoff: React.FC<{ number: string; title: string; subtitle: string }> = ({ number, title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-10 md:mb-14">
      <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">{number}</span>
        <div className="h-px w-10 bg-gradient-to-r from-primary/70 to-transparent" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-3 leading-[1.1]"
        style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif" }}
      >
        {title}
      </motion.h2>

      <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-sm md:text-base max-w-3xl leading-relaxed">
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

const InfoCard: React.FC<{ icon: React.ElementType; title: string; desc: string; delay?: number }> = ({
  icon: Icon,
  title,
  desc,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: APPLE_EASE, delay }}
      className={`${panelClass} group p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.article>
  );
};

const TimelineItem: React.FC<{ time: string; title: string; delay?: number }> = ({ time, title, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: APPLE_EASE, delay }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary/70 border-2 border-primary" />
        <div className="w-px h-full bg-border min-h-[28px]" />
      </div>
      <div className="pb-5">
        <span className="font-mono text-[10px] text-primary/90 tracking-wider">{time}</span>
        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{title}</p>
      </div>
    </motion.div>
  );
};

export default function Bip110() {
  const faqData = [
    {
      q: 'O que é a BIP-110?',
      a: 'A BIP-110 (Reduced Data Temporary Softfork — RDTS) é uma proposta de mudança de consenso no Bitcoin para limitar dados não monetários na blockchain por um período definido (52.416 blocos). A tese central é restaurar limites históricos de propagação e reduzir pressão artificial de taxas causada por inscrições e tokens.',
    },
    {
      q: 'A BIP-110 pode afetar meus satoshis em autocustódia?',
      a: 'Não existe confisco automático de saldo. O risco discutido não é perda direta de custódia, e sim instabilidade operacional caso houvesse ruptura de consenso entre implementações diferentes. Nesse cenário extremo, moedas continuariam existindo, mas fluxos de liquidação, serviços e UX poderiam ficar temporariamente desorganizados.',
    },
    {
      q: 'Qual é a diferença prática entre soft fork e hard fork nesse debate?',
      a: 'Soft fork mantém retrocompatibilidade de validação para regras mais restritivas, enquanto hard fork quebra compatibilidade e cria outra rede. A crítica principal à BIP-110 é que, mesmo sendo formalmente soft fork, uma ativação sem consenso social amplo pode produzir efeitos práticos semelhantes a cisão de mercado.',
    },
    {
      q: 'Por que a ideia de "soft fork temporário" é tão controversa?',
      a: 'Porque estabilidade previsível é um pilar do Bitcoin. Regras com "prazo para expirar" levantam dúvidas de coordenação, segurança jurídica e governança técnica. O argumento contrário é que exceções temporárias podem abrir precedente para ciclos políticos de intervenção no protocolo.',
    },
    {
      q: 'Isso impacta a Lightning Network?',
      a: 'Indiretamente, pode impactar. A Lightning depende da camada base para abertura/fechamento de canais e execução de penalidades. Divergências na camada de consenso, mesmo raras, aumentam risco operacional para roteadores, custodians e usuários que exigem liquidação rápida e previsível em L1.',
    },
    {
      q: 'Quem está a favor e quem está contra?',
      a: 'A favor: grupos que priorizam uso estritamente monetário da camada base e defendem filtragem mais dura de dados arbitrários. Contra: desenvolvedores e operadores que enxergam risco de centralização política das regras, censura de uso legítimo e instabilidade de consenso em um protocolo que deve mudar lentamente.',
    },
    {
      q: 'Preciso tomar alguma ação agora?',
      a: 'Para a maioria dos holders, não. A resposta racional é reforçar autocustódia, backups de seed, teste de recuperação e diversificação operacional (wallet + canal de liquidez + plano de contingência). A discussão da BIP-110 é estratégica para quem acompanha infraestrutura e governança de rede.',
    },
    {
      q: 'A proposta tem chance alta de aprovação em 2025?',
      a: 'Hoje a probabilidade parece baixa sem realinhamento relevante entre operadores de node, mineradores, empresas e comunidade técnica. Mudanças de consenso no Bitcoin historicamente exigem debate longo, sinalização robusta e convergência social, não apenas argumento técnico isolado.',
    },
  ];

  const protocolRules = [
    {
      icon: Clock,
      title: 'Janela de execução de 52.416 blocos',
      desc: 'A proposta estabelece um ciclo aproximado de um ano. Esse recorte temporal tenta reduzir danos percebidos no curto prazo, mas cria uma nova superfície de coordenação: como entrar e sair das regras sem desorganizar o ecossistema?',
    },
    {
      icon: Binary,
      title: 'Reaperto de limites de dados',
      desc: 'A lógica técnica busca reverter permissões amplas de propagação e restabelecer limites históricos associados ao OP_RETURN e estruturas adjacentes. O alvo é reduzir cargas consideradas não monetárias na camada base.',
    },
    {
      icon: Layers,
      title: 'Restrições em partes de witness/script',
      desc: 'A proposta discute invalidação de estruturas acima de certos tamanhos e exceções para estados anteriores. O ponto sensível é evitar efeitos colaterais em contratos válidos, monitoramento de mempool e ferramentas de infraestrutura.',
    },
    {
      icon: Lock,
      title: 'Compatibilidade e exceções históricas',
      desc: 'Para mitigar quebra imediata, são citadas exceções para UTXOs já existentes antes da ativação. Ainda assim, críticos apontam que exceções complexas tendem a elevar custo de auditoria e risco de interpretações divergentes entre clientes.',
    },
  ];

  const timeline = [
    { time: '2009', title: 'Bloco gênesis inaugura o uso narrativo de dados no Bitcoin, mas com foco monetário explícito e contexto de crítica ao sistema bancário.' },
    { time: '2015-2017', title: 'Período da guerra dos blocos amadurece a noção de que mudanças sem coordenação social profunda cobram preço alto em confiança coletiva.' },
    { time: '2021', title: 'Ativação do Taproot amplia possibilidades de script e eficiência, abrindo também novas interpretações sobre limite entre uso financeiro e uso arbitrário de dados.' },
    { time: '2023-2024', title: 'Escalada de Ordinals/Inscriptions e tokens aumenta disputa por espaço de bloco, elevando taxas e polarizando narrativas sobre liberdade versus ruído.' },
    { time: 'Core v30', title: 'Afrouxamentos de política operacional reacendem o conflito. Parte da comunidade lê como evolução pragmática; outra parte, como porta aberta para degradação da função monetária.' },
    { time: 'BIP-110', title: 'Surge como resposta de contenção: filtrar tráfego não monetário por janela temporária para tentar recuperar previsibilidade de uso econômico da camada base.' },
  ];

  const positions = [
    {
      name: 'Adam Back',
      pos: 'Contra',
      quote:
        'Mudar consenso para responder spam pode gerar mais risco sistêmico que o próprio problema original. O custo de coordenação social precisa ser tratado como variável de primeira ordem.',
    },
    {
      name: 'Matt Odell',
      pos: 'Contra',
      quote:
        'Intervenções desse tipo podem virar ferramenta de disputa entre implementações e enfraquecer a previsibilidade institucional do protocolo para o mercado global.',
    },
    {
      name: 'Comunidade Knots',
      pos: 'A favor',
      quote:
        'Sem filtros mais firmes, a camada base corre risco de virar canal de carga oportunista, pressionando taxas e dificultando operação de nodes por indivíduos comuns.',
    },
    {
      name: 'Luke Dashjr',
      pos: 'A favor',
      quote:
        'Manter custos de validação em níveis acessíveis é requisito de descentralização. Se rodar node ficar proibitivo, a segurança política da rede enfraquece.',
    },
  ];

  const impactScenarios = [
    {
      img: blockchainRedeGlobal,
      title: 'Infraestrutura Global de Nodes',
      desc: 'Se espaço de bloco continuar pressionado por usos não monetários de alta densidade, aumenta a barreira operacional para novos validadores independentes.'
    },
    {
      img: blockchainBlocos,
      title: 'Mercado de Taxas e Prioridade',
      desc: 'A disputa por inclusão em bloco determina quem liquida primeiro. Mudanças de política alteram incentivos econômicos de usuários, carteiras e serviços.'
    },
    {
      img: blockchainLivroRazao,
      title: 'Governança de Longo Prazo',
      desc: 'Cada precedente em consenso impacta expectativas futuras. O mercado observa não só a regra técnica, mas o método político de atualização adotado.'
    },
  ];

  const riskMatrix = [
    {
      icon: Radar,
      title: 'Risco de Narrativa Binária',
      severity: 'Alto',
      action:
        'Evitar leitura tribal ("censura" vs "liberdade total"). Avaliar métricas: custo de node, compressão de taxas, impacto em uso monetário real e robustez de consenso.',
    },
    {
      icon: Network,
      title: 'Risco de Fragmentação Operacional',
      severity: 'Médio/Alto',
      action:
        'Monitorar aderência de clientes e provedores de infraestrutura. Em divergência, priorizar carteiras com boa telemetria de rede e plano de fallback transacional.',
    },
    {
      icon: Zap,
      title: 'Risco para Liquidação em L2',
      severity: 'Médio',
      action:
        'Revisar estratégias de abertura/fechamento de canais Lightning, limites de roteamento e contingência para períodos de taxa elevada e latência de confirmação.',
    },
    {
      icon: Pickaxe,
      title: 'Risco para Receita de Mineradores',
      severity: 'Médio',
      action:
        'Acompanhar equilíbrio entre fee market de curto prazo e saúde monetária de longo prazo. Incentivos imediatos não podem corroer a confiança na camada base.',
    },
    {
      icon: Shield,
      title: 'Risco para Holder Desinformado',
      severity: 'Baixo/Médio',
      action:
        'Blindar autocustódia: seed offline, teste de restauração, redundância geográfica de backup e higiene operacional contra golpes em momentos de ruído narrativo.',
    },
    {
      icon: CircleDollarSign,
      title: 'Risco de Dependência de Terceiros',
      severity: 'Alto',
      action:
        'Construir rota alternativa de liquidez e saída. Não depender de um único banco, uma única exchange ou um único trilho de pagamento para decisões críticas.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>BIP-110: O Que É o Soft Fork Temporário Que Divide o Bitcoin | Guia Editorial 2025</title>
        <meta
          name="description"
          content="BIP-110 (RDTS) sem simplificação: regras técnicas, impactos em consenso, mineração e Lightning, análise de risco operacional e veredicto editorial para quem protege patrimônio em Bitcoin."
        />
        <meta
          name="keywords"
          content="BIP-110, RDTS, soft fork temporário, OP_RETURN 83 bytes, Bitcoin Knots, Bitcoin Core v30, consenso Bitcoin, chain split, Lightning Network, mineração, espaço de bloco, descentralização"
        />
        <meta property="og:title" content="BIP-110: O Soft Fork Temporário Que Divide o Bitcoin" />
        <meta
          property="og:description"
          content="Análise técnica e estratégica da BIP-110: regras, controvérsias, impactos e plano de ação para holders em autocustódia."
        />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <meta property="og:url" content="https://lordjunnior.com.br/protocolo-bitcoin/bip-110" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BIP-110: Guia Editorial Técnico 2025" />
        <meta
          name="twitter:description"
          content="A proposta RDTS explicada com profundidade: riscos de consenso, efeitos econômicos e veredicto para quem vive autocustódia de verdade."
        />
        <meta name="twitter:image" content="https://lordjunnior.com.br/heroes/bip-110.webp" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="author" content="Lord Junnior" />
        <link rel="canonical" href="https://lordjunnior.com.br/protocolo-bitcoin/bip-110" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'BIP-110: O Que É o Soft Fork Temporário Que Divide o Bitcoin',
              description:
                'Análise técnica e estratégica da BIP-110 (RDTS): regras de consenso, disputa de narrativas, impactos operacionais e plano de blindagem para holders.',
              author: { '@type': 'Person', name: 'Lord Junnior', url: 'https://lordjunnior.com.br' },
              publisher: {
                '@type': 'Organization',
                name: 'Lord Junnior',
                url: 'https://lordjunnior.com.br',
                logo: { '@type': 'ImageObject', url: 'https://lordjunnior.com.br/og-image.png' },
              },
              datePublished: '2025-02-22',
              dateModified: '2026-03-15',
              image: 'https://lordjunnior.com.br/heroes/bip-110.webp',
              url: 'https://lordjunnior.com.br/protocolo-bitcoin/bip-110',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://lordjunnior.com.br/protocolo-bitcoin/bip-110',
              },
              keywords:
                'BIP-110, RDTS, OP_RETURN, Bitcoin Knots, consenso Bitcoin, chain split, Lightning Network, espaço de bloco, mineração',
              articleSection: 'Protocolo Bitcoin',
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
              mainEntity: faqData.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br' },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Protocolo Bitcoin',
                  item: 'https://lordjunnior.com.br/protocolo-bitcoin',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'BIP-110',
                  item: 'https://lordjunnior.com.br/protocolo-bitcoin/bip-110',
                },
              ],
            }),
          }}
        />
      </Helmet>

      <NobelVFX accentColor="amber" />

      <CinematicHero
        phase="PROTOCOLO BITCOIN • ANÁLISE EDITORIAL"
        title="BIP-110: O Soft Fork Temporário Que Divide o Bitcoin"
        subtitle="Sem resumo raso: aqui você entende regras técnicas, disputa de consenso e impacto real para quem protege patrimônio em autocustódia."
        image="/heroes/bip-110.webp"
        icon={GitFork}
        accentColor="amber"
        backLink="/blockchain"
        backLabel="Blockchain"
      />

      <main className="relative z-10">
        <section className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: APPLE_EASE }}
              className={`${panelClass} p-6 md:p-8`}
            >
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                A BIP-110 (Reduced Data Temporary Softfork) não é uma pauta periférica: ela toca no coração da
                governança do Bitcoin. A proposta tenta reimpor limites de dados para preservar a camada base como
                trilho monetário prioritário, reduzindo pressão de cargas não financeiras. Defensores afirmam que isso
                protege descentralização e acessibilidade para quem roda node; críticos argumentam que filtros podem
                abrir precedente político perigoso e elevar risco de fragmentação social do consenso. O ponto-chave não
                é apenas “spam versus liberdade”, mas o custo sistêmico de qualquer mudança em um protocolo cujo valor
                depende de previsibilidade, neutralidade e credibilidade intergeracional.
              </p>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 01"
              title="Antes da BIP-110: Como o Bitcoin Realmente Evolui"
              subtitle="Sem CEO, sem comitê central e sem atalho político. Mudança de consenso exige convergência técnica e social em ritmo lento por design."
            />
            <div className="grid md:grid-cols-2 gap-5">
              <InfoCard
                icon={BookOpen}
                title="BIP como rito de mudança"
                desc="Bitcoin Improvement Proposal é o formato aberto para discutir alterações de protocolo. Não é decreto: é documento vivo submetido a revisão pública, stress test intelectual e disputa argumentativa entre pessoas com incentivos diferentes."
              />
              <InfoCard
                icon={GitFork}
                title="Soft fork ≠ passe livre"
                desc="Mesmo retrocompatível no papel, soft fork depende de coordenação real de mercado. Sem legitimidade social ampla, a mudança vira vetor de atrito operacional, fragmenta expectativas e corrói confiança no mecanismo de governança."
                delay={0.08}
              />
              <InfoCard
                icon={Vote}
                title="Consenso é processo, não slogan"
                desc="Consenso no Bitcoin não nasce de likes no X. Ele emerge quando operadores de node, mineradores, empresas e usuários convergem para um mesmo conjunto de regras com horizonte de longo prazo."
                delay={0.16}
              />
              <InfoCard
                icon={Shield}
                title="Lentidão é blindagem"
                desc="A dificuldade de mudar o protocolo é justamente o que protege o ativo de capturas oportunistas. Um sistema monetário global não pode funcionar em lógica de atualização apressada por pressão de curto prazo."
                delay={0.24}
              />
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 02"
              title="Anatomia Técnica da BIP-110 (RDTS)"
              subtitle="O texto propõe uma janela temporária de endurecimento para reduzir tráfego não monetário em camada base e reequilibrar o mercado de espaço de bloco."
            />

            <article className={`${panelClass} p-6 md:p-10 mb-10`}>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">REGRAS OPERACIONAIS EM DISCUSSÃO</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {protocolRules.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08, ease: APPLE_EASE }}
                    className="rounded-xl border border-border/60 bg-secondary/30 p-4 md:p-5"
                  >
                    <item.icon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-4"
              >
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <span className="font-bold text-primary">Hipótese de impacto declarada:</span> redução relevante de cargas
                  não monetárias e recuperação de previsibilidade de taxas para liquidação financeira. A discussão crítica
                  é se o benefício operacional compensa o risco político de um soft fork com validade temporária.
                </p>
              </motion.div>
            </article>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 03"
              title="A Guerra do Espaço de Bloco"
              subtitle="O conflito é antigo: quem define o uso legítimo de um recurso escasso global chamado bloco?"
            />

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <article className={`${panelClass} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Linha do Tempo Estratégica
                </h3>
                <div className="space-y-0">
                  {timeline.map((item, i) => (
                    <TimelineItem key={item.time} time={item.time} title={item.title} delay={i * 0.04} />
                  ))}
                </div>
              </article>

              <article className={`${panelClass} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" /> Os Dois Eixos de Disputa
                </h3>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/70 bg-secondary/30 p-5">
                    <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Eixo 1 — Bitcoin como trilho monetário
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Esta leitura sustenta que a camada base deve priorizar liquidação financeira e preservar custo de
                      validação baixo para indivíduos. Sob essa ótica, dados arbitrários deslocam função monetária,
                      encarecem operação e podem induzir concentração técnica no longo prazo.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-secondary/30 p-5">
                    <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Eixo 2 — Neutralidade de uso mediante taxa
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Esta leitura argumenta que, se a transação cumpre regra de consenso e paga taxa de mercado, não
                      cabe filtragem política de finalidade. O risco seria transformar política de mempool em instrumento
                      de censura, enfraquecendo a neutralidade credível da rede.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 04"
              title="Impactos Sistêmicos: Mineração, Lightning e Consenso"
              subtitle="Se regras de propagação e validação mudam, os efeitos viajam por toda a cadeia econômica do Bitcoin."
            />
            <div className="grid md:grid-cols-3 gap-5">
              <InfoCard
                icon={Pickaxe}
                title="Mineradores"
                desc="No curto prazo, filtrar certo tipo de carga pode reduzir competição por bloco e alterar curva de fees. A pergunta estratégica é se o ajuste reforça ou enfraquece o valor do ativo que remunera a própria mineração no longo prazo."
              />
              <InfoCard
                icon={Zap}
                title="Lightning Network"
                desc="A Lightning depende da camada base para abertura, fechamento e enforcement. Qualquer ruído de consenso aumenta risco de execução para operadores de canais, provedores de liquidez e usuários com necessidade de settlement confiável."
                delay={0.1}
              />
              <InfoCard
                icon={Network}
                title="Estabilidade de consenso"
                desc="O maior risco não está no código isolado, mas na coordenação social. Se diferentes grupos adotarem narrativas irreconciliáveis, o mercado precifica incerteza institucional — e isso afeta usabilidade, confiança e alocação de capital."
                delay={0.2}
              />
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 05"
              title="Cenários Reais: Onde Isso Bate no Mundo Prático"
              subtitle="Nada aqui é teoria de fórum. Decisões de consenso impactam operação, custos e previsibilidade para quem usa Bitcoin como infraestrutura de soberania."
            />
            <div className="grid md:grid-cols-3 gap-5">
              {impactScenarios.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: APPLE_EASE }}
                  className={`${panelClass} overflow-hidden`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 06"
              title="Mapa de Risco Operacional para Holder e Operador"
              subtitle="No lugar de timestamps de vídeo: uma matriz de decisão prática para atravessar ruído narrativo sem perder controle estratégico."
            />

            <div className="grid md:grid-cols-2 gap-5">
              {riskMatrix.map((risk, i) => (
                <motion.article
                  key={risk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: APPLE_EASE }}
                  className={`${panelClass} p-6`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                      <risk.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{risk.title}</h3>
                      <p className="font-mono text-[10px] tracking-wider text-primary">SEVERIDADE: {risk.severity}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{risk.action}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 07"
              title="Quem se Posicionou e Por Quê"
              subtitle="A divergência é séria porque envolve filosofia de protocolo, incentivos econômicos e risco político de governança."
            />

            <div className="grid md:grid-cols-2 gap-5">
              {positions.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: APPLE_EASE }}
                  className={`${panelClass} p-6`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-foreground">{p.name}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-wider font-bold border border-primary/30 bg-primary/10 text-primary">
                      {p.pos.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">“{p.quote}”</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className={sectionInner}>
            <ChapterKickoff
              number="CAPÍTULO 08"
              title="Veredicto Editorial: Probabilidade, Risco e Postura"
              subtitle="A decisão inteligente não é torcer por lado; é blindar patrimônio enquanto o debate amadurece."
            />

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.72, ease: APPLE_EASE }}
              className={`${panelClass} p-8 md:p-12`}
            >
              <div className="flex items-center gap-3 mb-6">
                <BadgeAlert className="w-6 h-6 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary font-bold">VEREDICTO</span>
              </div>

              <h3 className="text-xl md:text-3xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                A chance de aprovação rápida é baixa — o valor está em aprender a operar no meio do ruído.
              </h3>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Mudanças de consenso no Bitcoin exigem coalizão ampla e tempo de maturação social. Hoje, o cenário
                  sugere assimetria entre intensidade de debate e capacidade real de ativação coordenada. Isso reduz
                  probabilidade de avanço imediato, mas não reduz a importância do tema.
                </p>
                <p>
                  O aprendizado central para quem constrói soberania não é “ganhar discussão em rede social”; é elevar
                  prontidão operacional: autocustódia sólida, redundância de liquidez, leitura crítica de narrativas e
                  acompanhamento técnico sem terceirizar julgamento.
                </p>
                <p className="text-foreground font-semibold">
                  Em termos práticos: segure seus satoshis com disciplina, fortaleça infraestrutura pessoal e use o
                  debate da BIP-110 como treino de governança para as próximas batalhas do protocolo.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className="max-w-5xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 09"
              title="Trio da Blindagem: Plano de Ação em 3 Níveis"
              subtitle="Autoridade técnica, conversão operacional e execução de contingência — sem depender de uma única rota."
            />

            <div className="grid md:grid-cols-3 gap-5">
              <article className={`${panelClass} p-6`}>
                <p className="font-mono text-[10px] tracking-[0.25em] text-primary mb-2">NÍVEL 01</p>
                <h3 className="text-base font-bold text-foreground mb-2">Base de Autoridade</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Domine os fundamentos técnicos da camada base para interpretar qualquer nova proposta sem depender de
                  opinião de terceiros.
                </p>
                <Link
                  to="/blockchain"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  Estudar Blockchain <ArrowRight className="w-4 h-4" />
                </Link>
              </article>

              <article className={`${panelClass} p-6`}>
                <p className="font-mono text-[10px] tracking-[0.25em] text-primary mb-2">NÍVEL 02</p>
                <h3 className="text-base font-bold text-foreground mb-2">Rota de Liquidez</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Tenha um canal alternativo de execução para quando o sistema tradicional travar. Não espere emergência
                  para montar infraestrutura.
                </p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  Ativar rota operacional <ArrowRight className="w-4 h-4" />
                </a>
              </article>

              <article className={`${panelClass} p-6`}>
                <p className="font-mono text-[10px] tracking-[0.25em] text-primary mb-2">NÍVEL 03</p>
                <h3 className="text-base font-bold text-foreground mb-2">Execução Completa</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Integre conta internacional, autocustódia, redundância de acesso e protocolo de contingência para não
                  ficar refém de um único trilho financeiro.
                </p>
                <Link
                  to="/soberania-financeira"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  Ver ecossistema completo <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              className={`${panelClass} mt-8 p-6 md:p-7`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground">Checklist rápido de blindagem operacional</p>
                  <p className="text-xs text-muted-foreground mt-1">3 verificações mínimas antes da próxima crise de narrativa</p>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Seed testada e restaurável</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Rota secundária de liquidez ativa</span>
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Plano de execução documentado</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionGlow />

        <section className={sectionShell}>
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <ChapterKickoff
              number="CAPÍTULO 10"
              title="Perguntas Frequentes sobre BIP-110"
              subtitle="FAQ sincronizado com o conteúdo visível para manter consistência editorial e estrutura técnica de SEO."
            />
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl px-5 border border-border/70 bg-card/60">
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
