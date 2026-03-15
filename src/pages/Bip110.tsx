import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Blocks, GitFork, Shield, AlertTriangle, Network, Scale, Clock,
  Users, Zap, BookOpen, Lock, Layers, Binary,
  ArrowLeft, MessageSquare, Target, BadgeAlert, Vote, Pickaxe
} from 'lucide-react';
import NobelVFX from '@/components/NobelVFX';
import CinematicHero from '@/components/CinematicHero';
import FooterSection from '@/components/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ══ Section Glow Divider ══ */
const SectionGlow = () => (
  <div className="relative z-10 h-px max-w-5xl mx-auto">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.15), transparent)' }} />
  </div>
);

/* ══ Chapter Kickoff ══ */
const ChapterKickoff: React.FC<{ number: string; title: string; subtitle: string }> = ({ number, title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-10 md:mb-14">
      <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 font-bold">{number}</span>
        <div className="w-8 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
      </motion.div>
      <motion.h2 variants={fadeUp} custom={1}
        className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-3 leading-[1.1]"
        style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif" }}
      >{title}</motion.h2>
      <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

/* ══ Info Card ══ */
const InfoCard: React.FC<{ icon: React.ElementType; title: string; desc: string; accent: string; delay?: number }> = ({ icon: Icon, title, desc, accent, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: APPLE_EASE, delay }}
      className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] hover:border-amber-500/20 transition-all duration-500"
      style={{ background: `linear-gradient(135deg, ${accent}08, transparent 60%)` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}15` }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
};

/* ══ Timeline Item ══ */
const TimelineItem: React.FC<{ time: string; title: string; delay?: number }> = ({ time, title, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: APPLE_EASE, delay }}
      className="flex items-start gap-4 group"
    >
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors border-2 border-amber-500/60" />
        <div className="w-px h-full bg-amber-500/15 min-h-[30px]" />
      </div>
      <div className="pb-5">
        <span className="font-mono text-[10px] text-amber-500/70 tracking-wider">{time}</span>
        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{title}</p>
      </div>
    </motion.div>
  );
};

/* ══ MAIN PAGE ══ */
export default function Bip110() {
  const faqData = [
    {
      q: 'O que é a BIP-110?',
      a: 'A BIP-110 (Reduced Data Temporary Softfork — RDTS) é uma proposta de melhoria do Bitcoin que visa criar um soft fork temporário de um ano para restringir a inserção de dados não-monetários na blockchain, como NFTs e tokens especulativos, restaurando limites históricos de campos como OP_RETURN para 83 bytes.'
    },
    {
      q: 'A BIP-110 pode fazer eu perder meus Bitcoins?',
      a: 'Não. A proposta não altera a quantidade de moedas nem afeta a custódia. Seus satoshis permanecem seguros na sua hardware wallet. O pior cenário — extremamente improvável — seria um chain split, onde suas moedas existiriam nas duas versões da rede.'
    },
    {
      q: 'Qual a diferença entre soft fork e hard fork?',
      a: 'Um soft fork é uma atualização retrocompatível — nodes antigos ainda se comunicam com os novos. Um hard fork cria uma rede completamente separada e incompatível, como aconteceu com o Bitcoin Cash. O Bitcoin historicamente só evoluiu via soft forks.'
    },
    {
      q: 'Por que a BIP-110 é temporária?',
      a: 'A proposta teria duração de 52.416 blocos (aproximadamente um ano), servindo como medida emergencial enquanto soluções permanentes são desenvolvidas. Esse caráter temporário é, paradoxalmente, um dos pontos mais criticados — um soft fork temporário é algo inédito no Bitcoin.'
    },
    {
      q: 'A BIP-110 pode afetar a Lightning Network?',
      a: 'Indiretamente, sim. Se um chain split ocorresse, canais Lightning poderiam enfrentar problemas de compatibilidade entre as duas redes, especialmente em transações multisig que são a base dos canais de pagamento. Porém, isso só aconteceria em um cenário extremo de falha de consenso.'
    },
    {
      q: 'Quem é contra e quem é a favor da BIP-110?',
      a: 'A favor: comunidade que roda Bitcoin Knots e defende que Bitcoin deve ser exclusivamente uma rede monetária, filtrando "spam" como Ordinals e tokens. Contra: figuras como Adam Back e Matt Odell, que argumentam que a proposta gera insegurança no consenso e que mudanças temporárias são contraditórias com a filosofia de estabilidade do Bitcoin.'
    },
    {
      q: 'Preciso fazer algo agora por causa da BIP-110?',
      a: 'Não. Se você é um holder que compra e guarda Bitcoin em autocustódia, não há nenhuma ação necessária. A proposta afeta o nível de consenso da rede e quem roda nodes. Continue com sua estratégia de acumulação e autocustódia normalmente.'
    },
    {
      q: 'Essa proposta vai ser aprovada?',
      a: 'É muito improvável. Para um soft fork ser ativado, precisa de consenso massivo da rede (sinalização de mais de 55% dos nodes). Atualmente, apenas cerca de 2-3% da rede apoia a BIP-110. Historicamente, mudanças de consenso no Bitcoin levam anos de debate — como o SegWit, que levou de 2015 a 2017.'
    },
  ];

  return (
    <>
      <Helmet>
        <title>BIP-110: O Que É a Proposta de Soft Fork Temporário no Bitcoin (RDTS) — Guia Completo 2025</title>
        <meta name="description" content="BIP-110 explicada: entenda o que é a Reduced Data Temporary Softfork, por que divide a comunidade Bitcoin, quem é contra (Adam Back), quem apoia, se afeta seus BTC e se vai passar. Análise técnica completa com FAQ." />
        <meta name="keywords" content="BIP-110, BIP 110 Bitcoin, soft fork Bitcoin 2025, Reduced Data Temporary Softfork, RDTS Bitcoin, proposta soft fork temporário, spam blockchain Bitcoin, Ordinals Bitcoin polêmica, OP_RETURN Bitcoin, Bitcoin Knots vs Core, filtro spam Bitcoin, chain split Bitcoin, Bitcoin Core v30, Taproot consequências, espaço de bloco Bitcoin, security budget mineradores, hard fork vs soft fork, UASF Bitcoin, SegWit história, consensus Bitcoin, Luke Dashjr BIP, Adam Back BIP-110, Matt Odell opinião, Lightning Network impacto, multisig chain split, Bitcoin descentralização nodes, NFT Bitcoin Inscriptions, autocustódia segura, halving security budget, Bitcoin melhoria proposta" />
        <meta property="og:title" content="BIP-110: A Proposta Polêmica de Soft Fork Temporário no Bitcoin — Guia Completo" />
        <meta property="og:description" content="Análise técnica e editorial da BIP-110 (RDTS). Entenda o debate que divide a comunidade Bitcoin sobre uso do espaço de bloco, spam, Ordinals e o futuro do consenso." />
        <meta property="og:image" content="https://lordjunnior.com/heroes/bip-110.webp" />
        <meta property="og:url" content="https://lordjunnior.com/bip-110" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BIP-110: O Soft Fork Temporário Que Divide o Bitcoin — Guia Completo 2025" />
        <meta name="twitter:description" content="BIP-110 (RDTS): o que é, quem apoia, quem é contra, impactos em Lightning e mineração, e se vai passar. Análise editorial completa." />
        <meta name="twitter:image" content="https://lordjunnior.com/heroes/bip-110.webp" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Lord Junnior" />
        <meta name="article:published_time" content="2025-02-22T00:00:00Z" />
        <meta name="article:modified_time" content="2025-03-15T00:00:00Z" />
        <meta name="article:section" content="Bitcoin" />
        <meta name="article:tag" content="BIP-110" />
        <meta name="article:tag" content="Soft Fork" />
        <meta name="article:tag" content="Bitcoin Consenso" />
        <meta name="article:tag" content="Blockchain" />
        <meta name="article:tag" content="RDTS" />
        <meta name="article:tag" content="Ordinals" />
        <meta name="article:tag" content="OP_RETURN" />
        <meta name="article:tag" content="Bitcoin Knots" />
        <meta name="article:tag" content="Lightning Network" />
        <meta name="article:tag" content="Descentralização" />
        <link rel="canonical" href="https://lordjunnior.com/bip-110" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'BIP-110: O Que É a Proposta de Soft Fork Temporário no Bitcoin (RDTS) — Guia Completo 2025',
          description: 'Análise técnica completa da BIP-110 — Reduced Data Temporary Softfork. O debate sobre spam, consenso, Ordinals e o futuro do espaço de bloco no Bitcoin.',
          author: { '@type': 'Person', name: 'Lord Junnior', url: 'https://lordjunnior.com' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior', url: 'https://lordjunnior.com', logo: { '@type': 'ImageObject', url: 'https://lordjunnior.com/og-image.png' } },
          datePublished: '2025-02-22',
          dateModified: '2025-03-15',
          image: 'https://lordjunnior.com/heroes/bip-110.webp',
          url: 'https://lordjunnior.com/bip-110',
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lordjunnior.com/bip-110' },
          keywords: 'BIP-110, soft fork Bitcoin, RDTS, Reduced Data Temporary Softfork, spam blockchain, Ordinals, OP_RETURN, Bitcoin Knots, chain split, Lightning Network, Adam Back, descentralização',
          articleSection: 'Bitcoin',
          inLanguage: 'pt-BR',
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com' },
            { '@type': 'ListItem', position: 2, name: 'Blockchain', item: 'https://lordjunnior.com/blockchain' },
            { '@type': 'ListItem', position: 3, name: 'BIP-110', item: 'https://lordjunnior.com/bip-110' },
          ],
        })}</script>
      </Helmet>

      <NobelVFX accentColor="amber" />

      {/* ─── HERO ─── */}
      <CinematicHero
        phase="ANÁLISE TÉCNICA • GUIA COMPLETO 2025"
        title="BIP-110: O Que É o Soft Fork Temporário Que Divide o Bitcoin"
        subtitle="Entenda a Reduced Data Temporary Softfork (RDTS), quem apoia, quem é contra, se afeta seus BTC em autocustódia e se essa proposta polêmica vai passar."
        image="/heroes/bip-110.webp"
        icon={GitFork}
        accentColor="amber"
      />

      <main className="relative z-10">
        {/* ─── BACK NAV ─── */}
        <div className="max-w-6xl mx-auto px-4 md:px-10 pt-8">
          <Link to="/blockchain" className="inline-flex items-center gap-2 text-amber-500/70 hover:text-amber-500 text-xs font-mono tracking-wider transition-colors">
            <ArrowLeft className="w-3 h-3" /> VOLTAR PARA BLOCKCHAIN
          </Link>
        </div>

        {/* ═══ PARÁGRAFO DE ABERTURA SEO ═══ */}
        <section className="relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                A <strong className="text-foreground">BIP-110</strong>, também conhecida como <strong className="text-foreground">Reduced Data Temporary Softfork (RDTS)</strong>, é uma proposta de melhoria do Bitcoin que quer criar um <strong className="text-foreground">soft fork temporário de um ano</strong> para restringir a inserção de dados não-monetários na blockchain — como NFTs, Ordinals, Inscriptions e tokens especulativos. A proposta restauraria o limite histórico de <strong className="text-foreground">83 bytes no OP_RETURN</strong> e filtraria até 41% das transações consideradas "spam", liberando 36% de espaço no bloco. Mas o debate vai muito além da técnica: envolve <strong className="text-foreground">consenso, descentralização, censura, security budget</strong> e o próprio futuro do Bitcoin como rede monetária. Figuras como <strong className="text-foreground">Adam Back</strong> se posicionaram contra, enquanto a comunidade que roda <strong className="text-foreground">Bitcoin Knots</strong> defende a medida. Neste guia completo, você entende tudo sobre a BIP-110 — o que é, quem apoia, quem é contra, se afeta seus Bitcoins em autocustódia e se essa proposta tem chance real de ser aprovada em 2025.
              </p>
            </motion.div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.01 — O QUE É BIP ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 01" title="Antes de Tudo: O Que é uma BIP?" subtitle="Bitcoin Improvement Proposal — a única forma de evoluir o protocolo mais descentralizado do mundo. Sem CEO, sem roadmap, sem permissão." />
            <div className="grid md:grid-cols-2 gap-5">
              <InfoCard icon={BookOpen} title="Bitcoin Improvement Proposal" accent="#f59e0b"
                desc="BIP é uma sigla para Bitcoin Improvement Proposal — uma proposta de melhoria para o Bitcoin. Como o Bitcoin é um protocolo open source, não existe nenhuma empresa, CEO ou startup definindo qual será a próxima atualização. Todas as melhorias, correções de bugs e atualizações acontecem através de BIPs que desenvolvedores propõem de forma aberta. Toda a rede — mantenedores, nodes, mineradores e até quem apenas acompanha — pode analisar, debugar e comentar nas propostas."
              />
              <InfoCard icon={GitFork} title="Soft Fork vs. Hard Fork" accent="#38bdf8" delay={0.1}
                desc="Toda vez que uma BIP é implementada, o Bitcoin evolui via soft forks — atualizações retrocompatíveis onde nodes antigos ainda se comunicam com os novos. Um hard fork cria uma rede completamente incompatível: as moedas não transitam mais entre as redes, os nodes não se comunicam. Bitcoin nunca fez hard fork. Quem fez foram protocolos que copiaram o código e mudaram tanto que criaram redes separadas — como Bitcoin Cash e Bitcoin SV, que definharam."
              />
              <InfoCard icon={Vote} title="Consenso Descentralizado" accent="#34d399" delay={0.2}
                desc="Para uma BIP ser ativada, não basta um grupo propor — a rede inteira precisa concordar. Se a maioria dos nodes não atualiza para a nova versão, a proposta simplesmente não passa. É por isso que mudanças no Bitcoin levam anos: o SegWit, por exemplo, foi debatido de 2015 a 2017 até ser ativado. Essa lentidão proposital é uma feature, não um bug — é o que impede que qualquer grupo centralize decisões sobre o dinheiro de todos."
              />
              <InfoCard icon={Shield} title="A Lição dos Hard Forks Fracassados" accent="#c084fc" delay={0.3}
                desc="Bitcoin Cash, Bitcoin SV, Bitcoin Gold — todos fizeram hard forks do Bitcoin tentando 'melhorar' o protocolo. Todos definharam: queda de mais de 90% no preço e hash rate milhões de vezes abaixo da rede Bitcoin. A 'evolução natural' do Bitcoin funciona assim: ideias que não atingem consenso criam forks para tentar sobreviver sozinhas — e as que não funcionam, morrem. É a lei da selva aplicada ao dinheiro digital."
              />
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.03 — A PROPOSTA ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 02" title="BIP-110: Reduced Data Temporary Softfork" subtitle="A proposta quer criar um soft fork temporário de um ano para filtrar 'spam' da blockchain e restaurar limites históricos de dados por bloco." />

            <div className="relative p-6 md:p-10 rounded-2xl border border-amber-500/15 mb-10" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.04), transparent 60%)' }}>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 font-bold">REGRAS TÉCNICAS DA BIP-110</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Clock, title: 'Duração: 52.416 blocos', desc: 'Aproximadamente um ano de vigência. Um soft fork temporário — algo inédito na história do Bitcoin.' },
                  { icon: Binary, title: 'Scripts PubKey > 34 bytes', desc: 'Novos scripts com mais de 34 bytes serão invalidados, exceto OP_RETURN até 83 bytes (limite histórico).' },
                  { icon: Layers, title: 'Witness SegWit limitado', desc: 'Elementos de witness acima de 256 bytes também serão invalidados, criando restrições em campos do Taproot.' },
                  { icon: Lock, title: 'Restrições em Taproot', desc: 'Campos como OP_IF e OP_NOTIF para tap scripts limitados a 257 bytes. Exceções para UTXOs criados antes da ativação.' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: APPLE_EASE }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-amber-500/15 transition-colors"
                    style={{ background: 'rgba(245,158,11,0.02)' }}
                  >
                    <item.icon className="w-5 h-5 text-amber-500/70 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5 }} className="mt-6 p-4 rounded-xl border border-emerald-500/15" style={{ background: 'rgba(16,185,129,0.03)' }}>
                <p className="text-sm text-foreground/80">
                  <span className="font-bold text-emerald-400">Impacto simulado:</span> filtraria <span className="text-amber-400 font-bold">41%</span> das transações de spam e liberaria <span className="text-amber-400 font-bold">36%</span> de espaço no bloco — sem bloquear nenhuma transação financeira legítima.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.04 — O CONTEXTO / LINHA DO TEMPO ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 03" title="A Guerra do Espaço de Bloco" subtitle="O conflito não começou agora. A briga sobre como o espaço de bloco deve ser usado vem desde os primórdios do Bitcoin — e se intensificou com Ordinals, Inscriptions e o Taproot." />

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-500" /> Linha do Tempo do Conflito
                </h3>
                <div className="space-y-0">
                  <TimelineItem time="2009" title="Satoshi registra a primeira informação no bloco Gênesis via OP_RETURN: 'Chancellor on the brink of second bailout for banks'" />
                  <TimelineItem time="2015-2017" title="Guerra dos blocos: debate sobre tamanho de bloco culmina na ativação do SegWit via UASF (User Activated Soft Fork)" delay={0.05} />
                  <TimelineItem time="2017" title="Hard forks fracassados: Bitcoin Cash e Bitcoin SV tentam aumentar blocos e definham (–90% vs BTC)" delay={0.1} />
                  <TimelineItem time="2021" title="Ativação do Taproot: soft fork que abre novas possibilidades de scripts — incluindo as que permitem Ordinals" delay={0.15} />
                  <TimelineItem time="2023-2024" title="Explosão de Inscriptions e Ordinals: NFTs e tokens dentro do Bitcoin geram debate feroz sobre 'spam' na blockchain" delay={0.2} />
                  <TimelineItem time="Nov 2024" title="Bitcoin Core v30 afrouxa limites de OP_RETURN de 83 bytes para 100.000 bytes — polêmica entre Core e comunidade de nodes" delay={0.25} />
                  <TimelineItem time="Dez 2024" title="BIP-110 é proposta por desenvolvedor anônimo como resposta direta ao afrouxamento do Core v30" delay={0.3} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-500" /> Os Dois Lados
                </h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-emerald-500/15" style={{ background: 'rgba(16,185,129,0.03)' }}>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Bitcoin é Dinheiro — Filtre o Spam
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A blockchain é uma rede financeira. Dados aleatórios — fotos de gatinhos, NFTs especulativas, tokens de shitcoin — são ruído que enche os blocos, expulsa transações monetárias legítimas via taxas altas e faz a blockchain ficar cada vez mais pesada, dificultando que pessoas comuns rodem seus próprios nodes. Com o tempo, isso empurra a rede para centralização em data centers — exatamente como aconteceu com as altcoins que faliram.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-purple-500/15" style={{ background: 'rgba(168,85,247,0.03)' }}>
                    <h4 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Rede Livre — Quem Paga Taxa, Decide
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Quem define como a rede Bitcoin deve ser usada? Se eu pago a taxa para inserir minha transação no bloco, por que deveria ser bloqueado? Filtros de dados são uma forma de censura disfarçada de proteção. A flexibilidade gera mais demanda, mais uso de espaço de bloco, taxas mais altas — o que resolve o problema do security budget dos mineradores a longo prazo, já que a recompensa por bloco diminui a cada halving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.05 — IMPACTOS ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 04" title="Impactos: Mineração, Lightning e Consenso" subtitle="Se a BIP-110 passasse, quais seriam as consequências reais para mineradores, Lightning Network e a estabilidade da rede?" />
            <div className="grid md:grid-cols-3 gap-5">
              <InfoCard icon={Pickaxe} title="Mineradores" accent="#f59e0b"
                desc="Bloquear transações não-monetárias reduziria a competição por espaço de bloco, potencialmente diminuindo as taxas. No curto prazo, mineradores receberiam menos em fees. Porém, defensores argumentam que proteger a descentralização garante o valor do Bitcoin a longo prazo — e mineradores só ganham se o Bitcoin continuar valendo algo."
              />
              <InfoCard icon={Zap} title="Lightning Network" accent="#38bdf8" delay={0.1}
                desc="A Lightning funciona através de transações multisig registradas na blockchain. Num chain split, canais poderiam enfrentar problemas de compatibilidade — uma abertura de canal numa rede, fechamento na outra, reorganização de blocos que invalidariam transações confirmadas. Porém, esse cenário extremo exigiria uma falha massiva de consenso, que é improvável."
              />
              <InfoCard icon={Network} title="Risco de Chain Split" accent="#ef4444" delay={0.2}
                desc="Se a proposta fosse ativada na marra sem consenso, poderia ocorrer um chain split — duas versões paralelas da rede. Parte dos nodes rodando a versão com filtros e outra parte sem. Isso geraria insegurança sobre confirmações, reorganização de blocos e incompatibilidade entre redes. É o cenário mais temido e o principal argumento contra forçar a barra."
              />
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.06 — QUEM DISSE O QUÊ ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 05" title="Quem se Posicionou e o Que Disseram" subtitle="As figuras mais influentes do ecossistema Bitcoin já se posicionaram sobre a BIP-110. O debate é técnico, ideológico e filosófico." />

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { name: 'Adam Back', pos: 'CONTRA', color: '#ef4444', quote: 'Fazer uma mudança de consenso para resolver spam gera mais insegurança do que o próprio problema que tenta resolver. Soft forks temporários são contraditórios com a filosofia de estabilidade do Bitcoin.' },
                { name: 'Matt Odell', pos: 'CONTRA', color: '#ef4444', quote: 'A proposta pode ser uma tentativa de ampliar o uso de implementações alternativas como o Knots. Mudanças de consenso não devem servir interesses de grupos específicos.' },
                { name: 'Comunidade Knots', pos: 'A FAVOR', color: '#22c55e', quote: 'O Bitcoin Core foi infiltrado por empresas com interesse em lançar protocolos de tokens dentro do Bitcoin. O afrouxamento de políticas de propagação de dados é um ataque à descentralização.' },
                { name: 'Luke Dashjr', pos: 'A FAVOR', color: '#22c55e', quote: 'Os filtros de spam são necessários para manter a rede enxuta e acessível. Sem eles, rodar um full node vai se tornar cada vez mais caro e inviável para pessoas comuns.' },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: APPLE_EASE }}
                  className="p-6 rounded-2xl border border-white/[0.06] hover:border-amber-500/15 transition-all duration-500"
                  style={{ background: `${p.color}04` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-4 h-4" style={{ color: p.color }} />
                    <span className="text-sm font-bold text-foreground">{p.name}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-wider font-bold"
                      style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                    >{p.pos}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{p.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.07 — VEREDICTO ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 06" title="Veredicto: Vai Passar ou Não?" subtitle="Nossa análise sobre a probabilidade real desta proposta avançar — e o que você, holder, precisa (ou não) fazer." />

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="relative p-8 md:p-12 rounded-2xl border border-amber-500/20"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(16,185,129,0.03) 60%, transparent)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <BadgeAlert className="w-6 h-6 text-amber-500" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 font-bold">VEREDICTO EDITORIAL</span>
              </div>

              <h3 className="text-xl md:text-3xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                A BIP-110 provavelmente não vai passar.
              </h3>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para um soft fork ser ativado, é necessário consenso massivo da rede — sinalização de mais de 55% dos nodes. Atualmente, <span className="text-amber-400 font-bold">apenas 2-3% da rede apoia a BIP-110</span>. Historicamente, mudanças de consenso no Bitcoin levam anos de debate intenso.
                </p>
                <p>
                  A proposta de um soft fork temporário é algo inédito e contraditório com a filosofia central do Bitcoin: estabilidade e previsibilidade. Você propõe uma mudança para depois mudar de novo — isso gera insegurança jurídica, técnica e filosófica no protocolo.
                </p>
                <p>
                  O debate é legítimo e fortalece o Bitcoin. A polarização entre "Bitcoin é dinheiro" e "a rede é livre" é saudável porque força a comunidade a ser mais consciente sobre o que fortalece e o que enfraquece a rede. Mas não é através de um soft fork temporário imposto por uma minoria que esse problema de décadas será resolvido.
                </p>
                <p className="text-foreground font-semibold">
                  Se você é holder: não há nada a fazer. Seus satoshis continuam seguros na sua hardware wallet. Continue com sua estratégia de autocustódia e acumulação.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.08 — TIMESTAMPS ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 07" title="Índice Detalhado do Conteúdo" subtitle="Navegue pelos tópicos abordados nesta análise completa da BIP-110." />

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-0">
              {[
                { t: '00:00', d: 'O que é a proposta chamada BIP-110' },
                { t: '02:41', d: 'O "problema" que motivou a BIP-110' },
                { t: '03:33', d: 'O que é BIP-110 e por que virou briga' },
                { t: '04:35', d: 'Como o Bitcoin evolui: melhorias via BIPs' },
                { t: '05:27', d: 'Processo aberto: devs propõem e refinam em público' },
                { t: '07:09', d: 'Histórico da treta e as narrativas em disputa' },
                { t: '08:58', d: 'Risco de incompatibilidade entre nodes' },
                { t: '09:56', d: 'Taproot e seus efeitos colaterais' },
                { t: '11:44', d: '"Ruído" na blockchain: a crítica contra certos usos' },
                { t: '13:33', d: 'O que é rodar um nó: verificar sua própria rede' },
                { t: '15:23', d: 'Bitcoin Core v30: a mudança que acendeu o debate' },
                { t: '16:27', d: 'Por que fazer um soft fork durar um ano?' },
                { t: '17:30', d: 'Comparação com SegWit: mecanismo já usado no passado' },
                { t: '20:25', d: 'Adam Back e outros contra: posicionamentos' },
                { t: '23:33', d: 'Regras técnicas: o que ficaria inválido' },
                { t: '24:37', d: 'Limites históricos de 83 bytes: origem do número' },
                { t: '26:29', d: 'Impacto em taxas e mineradores' },
                { t: '29:09', d: 'Quem decide o "uso correto" do Bitcoin?' },
                { t: '31:56', d: 'Taxas mais altas: bom para mineradores?' },
                { t: '34:34', d: '"Lei da selva": propostas que morrem e sobrevivem' },
                { t: '37:25', d: 'Lightning Network cresceu absurdamente em 2025' },
                { t: '38:19', d: 'Como a BIP-110 impactaria a Lightning?' },
                { t: '39:17', d: 'Risco de chain split e rede "partida"' },
                { t: '42:10', d: 'Por que coordenação rápida é irrealista' },
                { t: '44:04', d: 'Consenso não nasce do nada: não vai "passar rápido"' },
                { t: '49:18', d: 'Opinião final: chance real de avançar' },
                { t: '52:06', d: 'Todo ano tem uma polêmica técnica no Bitcoin' },
              ].map((item, i) => (
                <TimelineItem key={i} time={item.t} title={item.d} delay={i * 0.02} />
              ))}
            </div>
          </div>
        </section>

        <SectionGlow />

        {/* ═══ CH.09 — FAQ ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <ChapterKickoff number="CAPÍTULO 09" title="Perguntas Frequentes" subtitle="As dúvidas mais comuns sobre a BIP-110, soft forks, chain splits e o impacto nos seus Bitcoins." />
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl px-5 hover:border-amber-500/20 transition-colors">
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

        <SectionGlow />

        {/* ═══ CTA FINAL ═══ */}
        <section className="relative z-10 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-amber-500 font-bold mb-4">PRÓXIMO PASSO</p>
              <h3 className="text-xl md:text-3xl font-black text-foreground mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Entenda a Tecnologia por Trás do Debate
              </h3>
              <p className="text-muted-foreground text-sm mb-8 max-w-lg mx-auto">
                Para compreender a BIP-110 em profundidade, você precisa dominar como a blockchain funciona. Nosso guia completo desmonta cada camada técnica.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/blockchain" className="group inline-flex items-center gap-3 py-3 px-6 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] hover:bg-amber-500/[0.15] hover:border-amber-500/50 text-amber-500 font-semibold text-sm tracking-wide transition-all duration-300">
                  <Blocks className="w-4 h-4" /> Guia Blockchain Completo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <Link to="/autocustodia" className="group inline-flex items-center gap-3 py-3 px-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.15] hover:border-emerald-500/50 text-emerald-400 font-semibold text-sm tracking-wide transition-all duration-300">
                  <Shield className="w-4 h-4" /> Autocustódia — Proteja seus BTC <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
