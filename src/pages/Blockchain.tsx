import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Blocks, Lock, Database, Search, ShieldCheck, Network, Cpu, ChevronDown, Fingerprint, Globe, Clock, Users, Zap, BookOpen, Scale, Eye, Hash, Box, Link2, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import blockchainBlocosImg from '@/assets/blockchain-blocos.jpg';
import blockchainMineracaoImg from '@/assets/blockchain-mineracao.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(s = 15) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const h = useCallback((e: MouseEvent) => { mx.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * s); my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * s); }, [mx, my, s]);
  useEffect(() => { window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, [h]);
  return { sx, sy };
}

const BLOCOS = [
  { icon: Database, title: 'O que é um Bloco', accent: '#d4af37', desc: 'Um bloco é um pacote de dados que contém um conjunto de transações verificadas, um carimbo de tempo (timestamp), o hash do bloco anterior e um nonce (número usado uma única vez). No Bitcoin, cada bloco tem capacidade de aproximadamente 1MB, o que força a priorização econômica das transações por taxa (fee). Quando preenchido e validado, ele é permanentemente anexado à cadeia — parte do registro público imutável que nunca mais poderá ser alterado.' },
  { icon: Lock, title: 'Hashing & Criptografia SHA-256', accent: '#38bdf8', desc: 'O hash é uma função matemática que transforma qualquer entrada em uma sequência fixa de caracteres. No Bitcoin, usa-se SHA-256. A mágica: alterar um único caractere na entrada produz um hash completamente diferente. Isso significa que qualquer tentativa de adulterar uma transação passada muda o hash do bloco, que muda o hash do próximo, que invalida toda a cadeia subsequente. É matematicamente impossível fraudar sem refazer o trabalho de todos os blocos seguintes — mais rápido que toda a rede combinada.' },
  { icon: Cpu, title: 'Proof of Work (PoW)', accent: '#34d399', desc: 'Para adicionar um novo bloco, mineradores competem para resolver um quebra-cabeça criptográfico: encontrar um nonce que, combinado com os dados do bloco, produza um hash abaixo de um valor-alvo (difficulty target). Esse processo consome energia real e tempo computacional — é o custo que torna o ataque à rede economicamente inviável. O primeiro minerador a resolver transmite o bloco, recebe a recompensa em bitcoins (block reward) e as taxas das transações incluídas.' },
  { icon: Network, title: 'Nós, Consenso e Validação', accent: '#c084fc', desc: 'A blockchain não vive em um servidor central — ela é replicada em milhares de full nodes ao redor do mundo. Cada nó verifica independentemente cada transação e cada bloco segundo as regras do protocolo. Um minerador só pode adicionar uma transação se a maioria da rede (50%+1) concordar que ela é legítima. Se alguém tentar incluir uma transação inválida ou criar bitcoins do nada, os nós rejeitam o bloco automaticamente. Ninguém precisa confiar em ninguém — todos verificam tudo.' },
  { icon: Fingerprint, title: 'Imutabilidade Absoluta', accent: '#f43f5e', desc: 'Uma vez que um bloco é adicionado e confirmado por blocos subsequentes, alterá-lo se torna exponencialmente mais difícil. Após 6 confirmações (~1 hora), é considerado praticamente irreversível. Esta propriedade é o que dá ao Bitcoin a característica de "ouro digital": não pode ser falsificado, duplicado ou censurado. A história de cada satoshi desde sua criação está registrada permanentemente na cadeia, acessível a qualquer pessoa com uma conexão à internet.' },
  { icon: Globe, title: 'Transparência Radical', accent: '#f59e0b', desc: 'Cada transação jamais realizada está publicamente visível em qualquer blockchain explorer. Qualquer pessoa pode auditar o suprimento total, verificar a validade de uma transação ou rastrear o fluxo de fundos entre endereços. Esta transparência radical é o oposto do sistema bancário tradicional, onde balanços são opacos, auditorias são raras e a impressão de dinheiro acontece nos bastidores. Na blockchain, a matemática substitui a confiança e o código substitui a política.' },
];

const MITOS = [
  { mito: '"Blockchain é apenas Bitcoin"', verdade: 'A blockchain é a tecnologia. O Bitcoin é a primeira e mais robusta aplicação dela. Existem outras blockchains, mas nenhuma com o mesmo nível de descentralização, segurança e efeito de rede do Bitcoin. É como dizer que "a internet é apenas o Google".' },
  { mito: '"Blockchain pode ser hackeada"', verdade: 'Para hackear o Bitcoin, seria necessário controlar 51% do poder computacional global da rede — um custo estimado em bilhões de dólares por hora, sem garantia de sucesso. Nunca aconteceu em 16+ anos de operação ininterrupta.' },
  { mito: '"É só um banco de dados glorificado"', verdade: 'Bancos de dados tradicionais têm administradores que podem alterar, deletar ou censurar registros a qualquer momento. A blockchain é um livro-razão distribuído onde nenhuma entidade individual tem poder de alteração — nem governos, nem corporações, nem o próprio criador.' },
  { mito: '"Gasta energia demais, é insustentável"', verdade: 'A segurança da rede é proporcional à energia consumida. O Proof of Work transforma eletricidade em segurança imutável. Sem custo real, não há segurança real. O sistema bancário tradicional consome significativamente mais quando se inclui agências, data centers, transporte de valores, impressão de cédulas e infraestrutura regulatória.' },
];

const FLUXO = [
  { step: '01', title: 'Transação Criada', desc: 'Você envia Bitcoin. A transação é assinada digitalmente com sua chave privada e transmitida instantaneamente para a rede peer-to-peer global.', icon: Zap },
  { step: '02', title: 'Mempool (Sala de Espera)', desc: 'A transação entra na mempool — a fila de transações não confirmadas. Mineradores selecionam transações com base na taxa oferecida (fee). Quanto maior a taxa, maior a prioridade.', icon: Clock },
  { step: '03', title: 'Mineração do Bloco', desc: 'Mineradores competem para resolver o puzzle criptográfico (PoW). A cada ~10 minutos, é formado um novo bloco de transações que se liga ao bloco anterior, formando a cadeia.', icon: Cpu },
  { step: '04', title: 'Validação pela Rede (Consenso)', desc: 'Os full nodes verificam se o bloco segue todas as regras do protocolo. A maioria simples (50%+1) da rede precisa concordar que a transação é legítima. Se válido, o bloco é adicionado. Se inválido, é rejeitado imediatamente.', icon: ShieldCheck },
  { step: '05', title: 'Confirmações Acumulam', desc: 'Cada novo bloco adicionado após o seu é uma "confirmação". Após 6 confirmações (~60 minutos), a transação é considerada matematicamente irreversível. Seu registro agora é eterno.', icon: Lock },
];

export default function Blockchain() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-cyan-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>O Que é Blockchain — Como Funciona a Tecnologia por Trás do Bitcoin | Arsenal Técnico</title>
        <meta name="description" content="Entenda o que é blockchain de verdade: como funciona, como os dados são armazenados em blocos, como a rede é formada por mineradores e como transações são validadas por consenso. Guia completo com Proof of Work, hashing SHA-256 e imutabilidade." />
        <meta name="keywords" content="blockchain, o que é blockchain, como funciona blockchain, bitcoin blockchain, proof of work, mineração bitcoin, hash SHA-256, livro-razão distribuído, consenso blockchain" />
      </Helmet>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #38bdf8, #06b6d4)' }} />

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/heroes/blockchain.webp')`, filter: 'brightness(0.35) saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.55) 40%, rgba(5,8,8,0.92) 75%, rgba(5,8,8,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
        </motion.div>

        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/educacao" className="text-stone-600 hover:text-cyan-400 transition-colors flex items-center gap-2"><ArrowLeft size={12} /> Arsenal Técnico</Link>
          <span className="text-stone-700">/</span>
          <span className="text-cyan-400">Blockchain</span>
        </nav>

        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div className="p-3.5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl" whileHover={{ scale: 1.1, rotate: 5 }}>
                <Blocks className="text-cyan-400" size={24} />
              </motion.div>
              <span className="text-cyan-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">Fundamento Técnico</span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}>
              BLOCK
            </motion.span>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-cyan-400" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}>
              CHAIN
            </motion.span>
          </h1>

          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              A tecnologia Blockchain é um <span className="font-bold text-cyan-400">livro-razão público</span> que registra transações de moeda digital de forma confiável, transparente e imutável — sem intermediários, sem permissão, sem censura.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Não é "tecnologia do futuro". É a infraestrutura que já opera <span className="text-stone-300 font-semibold">24 horas por dia, 365 dias por ano</span>, há mais de 16 anos — sem downtime, sem CEO e sem banco central. E suas utilizações vão muito além de fazer transações.
            </p>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar</span>
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ O QUE REGISTRA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <BookOpen className="mx-auto text-cyan-500/40 mb-5" size={28} />
            <p className="text-cyan-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">O que a Blockchain registra</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Cada transação é um <span className="text-cyan-400">registro permanente</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              A blockchain registra <span className="text-stone-300 font-semibold">exatamente</span>: a quantia transacionada, quem enviou, quem recebeu, quando a transação foi feita e em qual posição do livro ela está registrada. Nada fica escondido. <span className="text-cyan-400/80">A transparência é o atributo central.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { icon: Scale, label: 'Quantia', detail: 'Valor exato em BTC/sats transferido' },
              { icon: ArrowRight, label: 'Remetente', detail: 'Endereço público de quem enviou' },
              { icon: Users, label: 'Destinatário', detail: 'Endereço público de quem recebeu' },
              { icon: Clock, label: 'Timestamp', detail: 'Data e hora exata da transação' },
              { icon: Hash, label: 'Posição', detail: 'Localização no livro-razão público' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative p-5 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 text-center hover:-translate-y-1"
                style={{ background: 'rgba(56,189,248,0.03)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)' }} />
                <item.icon size={20} className="text-cyan-400/70 mx-auto mb-3" />
                <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                <p className="text-stone-600 text-xs leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ANALOGIA PARA LEIGOS ══ */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Blocks className="mx-auto text-cyan-500/40 mb-6" size={28} />
            <p className="text-cyan-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Analogia para leigos</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Imagine um <span className="text-cyan-400">caderno contábil</span> indestruível
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
              A blockchain é, na essência, um livro de razão pública — um livro contábil que registra cada transação de forma confiável e imutável. Mas diferente de qualquer livro que você já viu:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Box, bold: 'Cada página é um bloco.', rest: 'Contém uma lista de transações, a data exata e uma assinatura única (hash) que conecta à página anterior. A cada ~10 minutos, uma nova página é criada e ligada à anterior — formando a cadeia.' },
                { icon: Lock, bold: 'Ninguém pode arrancar páginas.', rest: 'Se alguém tentar adulterar uma transação antiga, todas as páginas seguintes ficam instantaneamente inválidas. Os blocos são dependentes uns dos outros — por isso o nome: Block + Chain.' },
                { icon: Users, bold: 'Todos têm uma cópia idêntica.', rest: 'Milhares de pessoas ao redor do mundo guardam cópias completas. Para fraudar, seria preciso alterar todas simultaneamente — algo computacionalmente impossível.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group p-6 rounded-xl border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-1 text-left"
                  style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), transparent 60%)' }}
                >
                  <item.icon size={20} className="text-cyan-400/60 mb-4" />
                  <p className="text-stone-200 font-bold text-sm mb-2">{item.bold}</p>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{item.rest}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM BLOCOS ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={blockchainBlocosImg} alt="Blocos conectados na cadeia blockchain" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.75) saturate(0.9)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Cada bloco é um elo permanente na cadeia de confiança</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ COMO A REDE É FORMADA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Infraestrutura</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como a <span className="text-cyan-400">rede</span> é formada
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              A rede blockchain é formada por <span className="text-stone-300 font-semibold">mineradores</span> que verificam e registram as transações nos blocos. Para que isso seja possível, eles emprestam poder computacional para a rede. Como incentivo para continuarem colaborando — e tornar a rede mais segura e sustentável — recebem recompensa em moedas digitais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, accent: '#34d399', title: 'Mineradores', desc: 'Computadores especializados que competem para validar transações. Emprestam poder computacional real à rede em troca de recompensas em Bitcoin.' },
              { icon: Network, accent: '#c084fc', title: 'Full Nodes', desc: 'Guardiões do protocolo. Cada nó mantém uma cópia completa de toda a blockchain e verifica independentemente cada transação e bloco.' },
              { icon: Link2, accent: '#38bdf8', title: 'Cadeia de Blocos', desc: 'Os blocos se encadeiam criptograficamente: cada bloco contém o hash do anterior. Duas cadeias podem se formar ao mesmo tempo — a rede sempre escolhe a com maior trabalho acumulado.' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group relative rounded-2xl border border-white/[0.06] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.accent}08, transparent 60%)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${item.accent}12, transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="p-2.5 rounded-xl border w-fit mb-4" style={{ background: `${item.accent}10`, borderColor: `${item.accent}25` }}>
                    <item.icon size={20} style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMAGEM MINERAÇÃO ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={blockchainMineracaoImg} alt="Infraestrutura de mineração blockchain" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.65) saturate(0.85)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Energia real convertida em segurança matemática</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 6 PILARES TÉCNICOS ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Arquitetura Profunda</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Os 6 pilares da <span className="text-cyan-400">blockchain</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOCOS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.15}
                  className="group relative rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${b.accent}08, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${b.accent}12, transparent 60%)` }} />
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${b.accent}40, transparent)` }} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl border" style={{ background: `${b.accent}10`, borderColor: `${b.accent}25` }}>
                        <Icon size={18} style={{ color: b.accent }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: b.accent }}>0{i + 1}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3">{b.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FLUXO VISUAL: DA TRANSAÇÃO AO REGISTRO PERMANENTE ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 text-center">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Ciclo de Vida</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como a transação é <span className="text-cyan-400">validada</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              De uma simples instrução digital até um registro permanente e irreversível — este é o caminho que cada transação percorre na blockchain.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.3), rgba(6,182,212,0.1))' }} />
            {FLUXO.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.2}
                className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div animate={{ boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 16px rgba(56,189,248,0.25)', '0 0 0px rgba(56,189,248,0)'] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold"
                  >
                    <item.icon size={16} />
                  </motion.div>
                </div>
                <div className={`ml-16 md:ml-0 ${i % 2 === 0 ? 'md:w-[45%] md:pr-12' : 'md:w-[45%] md:pl-12'} ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                  <p className="text-cyan-500/50 font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Etapa {item.step}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESUMO BLINDADO ══ */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <Eye className="mx-auto text-cyan-500/40 mb-5" size={28} />
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resumindo: <span className="text-cyan-400">o que você precisa saber</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-cyan-500/15 p-8 md:p-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), rgba(6,182,212,0.02))' }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.3), transparent 50%)' }} />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                A tecnologia blockchain é um <span className="text-cyan-400 font-bold">livro contábil público e distribuído</span> que registra todas as transações de moeda virtual em uma cadeia de blocos, que <span className="text-white font-semibold">qualquer um pode participar</span>.
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Ela armazena informações em blocos a cada <span className="text-cyan-400 font-bold">~10 minutos</span>. Cada bloco se liga ao anterior, formando uma cadeia inquebrável. Os mineradores verificam e registram as transações, emprestando poder computacional à rede em troca de recompensas.
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Uma transação só é incluída no bloco se a <span className="text-cyan-400 font-bold">maioria da rede (50%+1)</span> concordar que ela é legítima — o consenso. No Bitcoin, esse consenso é medido pelo poder computacional. Se duas cadeias se formam ao mesmo tempo, <span className="text-white font-semibold">ganha a com mais trabalho acumulado</span>.
              </p>
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)' }} />
              <p className="text-stone-400 text-sm md:text-base leading-relaxed italic">
                As informações registradas são <span className="text-white font-semibold">confiáveis, imutáveis e transparentes</span> — desde que a maioria da rede se mantenha honesta. E em 16 anos, ela se manteve.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MITOS DESTRUÍDOS ══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <AlertTriangle className="text-red-400/50 mb-4" size={24} />
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Destruindo Narrativas</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Mitos que <span className="text-red-400">precisam morrer</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MITOS.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group rounded-2xl border border-red-500/10 hover:border-red-500/25 p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.04), transparent 60%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.06), transparent 60%)' }} />
                <p className="text-red-400/80 font-mono text-xs font-bold tracking-wider uppercase mb-3 line-through decoration-red-500/40">{m.mito}</p>
                <div className="w-8 h-px bg-emerald-500/30 mb-3" />
                <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-300 transition-colors">
                  <span className="text-emerald-400 font-bold">Verdade: </span>{m.verdade}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NÚMEROS DA REDE ══ */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A rede em <span className="text-cyan-400">números</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '900K+', label: 'Blocos minerados' },
              { val: '~1B', label: 'Transações processadas' },
              { val: '19.000+', label: 'Full nodes ativos' },
              { val: '99.98%', label: 'Uptime desde 2009' },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="text-center p-6 rounded-xl border border-white/[0.06] hover:border-cyan-500/20 transition-colors"
                style={{ background: 'rgba(56,189,248,0.03)' }}
              >
                <p className="text-2xl md:text-3xl font-black text-cyan-400 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</p>
                <p className="text-stone-600 text-xs font-bold uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Search className="mx-auto text-cyan-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A blockchain não pede <span className="text-cyan-400">permissão</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Ela opera independentemente de governos, bancos e corporações. Entender como ela funciona é o primeiro passo para entender por que o Bitcoin é inevitável — e por que ninguém conseguirá pará-lo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/o-que-e-bitcoin" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4">
                O Que é Bitcoin <ArrowRight size={16} />
              </Link>
              <Link to="/mineracao" className="inline-flex items-center gap-3 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Mineração <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">A verdade está nos blocos. Sempre esteve.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
