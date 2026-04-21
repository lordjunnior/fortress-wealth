import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bitcoin, Sprout, BookOpen, AlertTriangle, Globe, Lock, Heart, Flame,
  Map, Search, ArrowRight, Compass, Shield, Eye, Zap, Library, Plane
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgMapa from '@/assets/backgrounds/bg-mapa-soberania.jpg';
import imgFaseDescobrir from '@/assets/mapa-fase-descobrir.jpg';
import imgFaseBlindar from '@/assets/mapa-fase-blindar.jpg';
import imgFaseAgir from '@/assets/mapa-fase-agir.jpg';
import imgFaseExpandir from '@/assets/mapa-fase-expandir.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

// ─── FASES DE JORNADA ─────────────────────────────────
interface Phase {
  num: string;
  kicker: string;
  title: string;
  manifesto: string;
  image: string;
  accent: string;
  pages: { title: string; href: string; desc: string }[];
}

const PHASES: Phase[] = [
  {
    num: '01',
    kicker: 'Fase 01 · Descobrir',
    title: 'Você está sendo roubado todos os dias.',
    manifesto: 'O sistema monetário é uma fraude consentida. Antes de proteger seu patrimônio, você precisa enxergar a engrenagem que corrói seu tempo, sua liberdade e o futuro dos seus filhos.',
    image: imgFaseDescobrir,
    accent: 'amber',
    pages: [
      { title: 'O que é Bitcoin', href: '/o-que-e-bitcoin', desc: 'O fundamento. Sem isso, nada faz sentido.' },
      { title: 'Inflação: Imposto Oculto', href: '/inflacao-imposto-oculto', desc: 'A máquina silenciosa que apaga seu salário.' },
      { title: 'História do Dinheiro', href: '/historia-do-dinheiro', desc: 'Da concha ao FIAT. Por que tudo desaba.' },
      { title: 'Confisco de 1990', href: '/confisco-1990', desc: 'A noite em que o Brasil bloqueou poupanças.' },
    ],
  },
  {
    num: '02',
    kicker: 'Fase 02 · Blindar',
    title: 'Suas chaves. Suas moedas. Sua fortaleza.',
    manifesto: 'Comprar Bitcoin não é proteção. Proteção começa quando você assume a responsabilidade pelas chaves privadas. A blockchain nunca foi hackeada. O fator humano sim.',
    image: imgFaseBlindar,
    accent: 'sky',
    pages: [
      { title: 'Autocustódia de Elite', href: '/autocustodia', desc: 'O protocolo definitivo de soberania técnica.' },
      { title: 'Hardware Wallet DIY', href: '/autocustodia/hardware-wallet-diy-bitcoin', desc: 'Construa seu próprio cofre. Sem rastros.' },
      { title: 'Mobilidade de Chaves', href: '/mobilidade-de-chaves', desc: 'Backup que sobrevive a fogo, água e Estado.' },
      { title: 'Blindagem contra Golpes', href: '/blindagem-golpes', desc: 'Os 12 vetores de ataque mais usados em 2025.' },
    ],
  },
  {
    num: '03',
    kicker: 'Fase 03 · Agir',
    title: 'Diversifique jurisdições. Não dependa de ninguém.',
    manifesto: 'Um passaporte. Uma conta. Um país. Isso não é diversificação, é dependência. Construa redundância geopolítica antes de precisar dela.',
    image: imgFaseAgir,
    accent: 'emerald',
    pages: [
      { title: 'Soberania Financeira', href: '/soberania-financeira', desc: 'Hub central de contas internacionais.' },
      { title: 'Teoria das Bandeiras', href: '/teoria-das-bandeiras', desc: 'Diversificação geopolítica de ativos.' },
      { title: 'Exchanges sem KYC', href: '/soberania-financeira/exchanges-sem-kyc', desc: 'Compre Bitcoin sem entregar documentos.' },
      { title: 'Comprar Bitcoin Anônimo', href: '/comprar-bitcoin-anonimo', desc: 'O passo cirúrgico para sair do radar.' },
    ],
  },
  {
    num: '04',
    kicker: 'Fase 04 · Expandir',
    title: 'Autonomia biológica. O ativo final.',
    manifesto: 'De que adianta blindar dinheiro se seu corpo, sua casa e sua mesa dependem do mesmo sistema que você está fugindo? A última camada é orgânica.',
    image: imgFaseExpandir,
    accent: 'rose',
    pages: [
      { title: 'Saúde Preventiva', href: '/soberania-organica/saude-preventiva', desc: 'Protocolos de longevidade fora do SUS.' },
      { title: 'Fitoterapia Aplicada', href: '/soberania-organica/fitoterapia-aplicada', desc: '13 protocolos de plantas por sistema.' },
      { title: 'Autonomia Alimentar', href: '/soberania-organica/horta-urbana', desc: 'Sua mesa começa no quintal.' },
      { title: 'Kit Tático 72h', href: '/soberania-organica/kit-72h', desc: 'O que ter pronto antes do colapso.' },
    ],
  },
];

// ─── ÍNDICE COMPLETO (silos premium) ──────────────────
interface SiloLink { title: string; href: string; }
interface Silo {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  links: SiloLink[];
}

const SILOS: Silo[] = [
  {
    title: 'Bitcoin & Economia',
    description: 'Do conceito à mecânica. Tudo o que você precisa saber sobre o ativo mais escasso do universo.',
    icon: Bitcoin,
    accent: 'amber',
    links: [
      { title: 'O que é Bitcoin', href: '/o-que-e-bitcoin' },
      { title: 'Blockchain', href: '/blockchain' },
      { title: 'Noções Fundamentais', href: '/nocoes-bitcoin' },
      { title: 'Bitcoin Seguro', href: '/bitcoin-seguro' },
      { title: 'Chaves Privadas', href: '/chaves' },
      { title: 'Transações Bitcoin', href: '/transacoes' },
      { title: 'Mineração', href: '/mineracao' },
      { title: 'Lightning Network', href: '/lightning' },
      { title: 'Hard Cap 21 Milhões', href: '/21-milhoes' },
      { title: 'Supply Shock', href: '/supply-shock' },
      { title: 'Halving Bitcoin', href: '/halving-bitcoin' },
      { title: 'Volatilidade', href: '/volatilidade' },
      { title: 'Lastro do Bitcoin', href: '/lastro' },
      { title: 'Candlestick', href: '/candlestick' },
      { title: 'Diversificação: A Falácia', href: '/diversificacao' },
      { title: 'Bitcoin vs Altcoins', href: '/bitcoin-vs-altcoins' },
      { title: 'Bitcoin vs Fiat', href: '/bitcoin-vs-fiat' },
      { title: 'Bitcoin vs Imóvel', href: '/bitcoin-vs-imovel' },
      { title: 'Futuro do Bitcoin', href: '/futuro-bitcoin' },
      { title: 'Dicionário Cripto', href: '/dicionario-cripto' },
      { title: 'BIP-110', href: '/bitcoin/bip-110-guerra-espaco-bloco' },
    ],
  },
  {
    title: 'Autocustódia & Segurança',
    description: 'O cofre sem porta para o Estado. Suas chaves, suas moedas, sua responsabilidade.',
    icon: Lock,
    accent: 'sky',
    links: [
      { title: 'Autocustódia de Elite', href: '/autocustodia' },
      { title: 'Hardware Wallet DIY', href: '/autocustodia/hardware-wallet-diy-bitcoin' },
      { title: 'Seed Phrase em Aço', href: '/autocustodia/seed-phrase-em-aco' },
      { title: 'CoinJoin & Privacidade On-chain', href: '/autocustodia/coinjoin-privacidade' },
      { title: 'Herança Bitcoin: Sucessão', href: '/autocustodia/heranca-bitcoin' },
      { title: 'Mobilidade de Chaves', href: '/mobilidade-de-chaves' },
      { title: 'Blindagem contra Golpes', href: '/blindagem-golpes' },
      { title: 'Gerador de Entropia', href: '/ferramentas' },
    ],
  },
  {
    title: 'Soberania Financeira',
    description: 'Bandeiras, contas internacionais, gateways anônimos e a arquitetura para sair do sistema.',
    icon: Globe,
    accent: 'emerald',
    links: [
      { title: 'Hub Soberania Financeira', href: '/soberania-financeira' },
      { title: 'Neobankless', href: '/soberania-financeira/contas-internacionais/neobankless' },
      { title: 'Bank of Georgia', href: '/soberania-financeira/contas-internacionais/bank-of-georgia' },
      { title: 'Wise', href: '/soberania-financeira/contas-internacionais/wise' },
      { title: 'Payoneer', href: '/soberania-financeira/contas-internacionais/payoneer' },
      { title: 'GrabrFi', href: '/soberania-financeira/contas-internacionais/grabrfi' },
      { title: 'Contas Offshore: Top 10', href: '/soberania-financeira/contas-offshore/top-10' },
      { title: 'Abertura Remota', href: '/soberania-financeira/contas-offshore/abertura-remota' },
      { title: 'Exchanges sem KYC', href: '/soberania-financeira/exchanges-sem-kyc' },
      { title: 'KYCnot.me', href: '/soberania-financeira/exchanges-sem-kyc/kycnot-me' },
      { title: 'Optima Exchange', href: '/soberania-financeira/exchanges-sem-kyc/optima-exchange' },
      { title: 'Pegasus Swap', href: '/soberania-financeira/exchanges-sem-kyc/pegasus-swap' },
      { title: 'BRICS Pay', href: '/soberania-financeira/brics-pay' },
      { title: 'KuCoin Pay + PIX', href: '/soberania-financeira/kucoin-pay-pix' },
      { title: 'PIX → Cripto', href: '/pix-cripto' },
      { title: 'Índice de Soberania', href: '/indice-de-soberania-financeira' },
      { title: 'Teoria das Bandeiras', href: '/teoria-das-bandeiras' },
      { title: 'Taxa de Fuga', href: '/taxa-de-fuga' },
    ],
  },
  {
    title: 'Alertas Críticos',
    description: 'O que está sendo construído contra você agora. CBDCs, vigilância e o cerco bancário.',
    icon: AlertTriangle,
    accent: 'red',
    links: [
      { title: 'Central de Alertas', href: '/alertas' },
      { title: 'CBDC Brasil', href: '/alertas/cbdc-brasil' },
      { title: 'DePIX: Reporte 2026', href: '/alertas/depix-reporte-2026' },
      { title: 'Proibição do Dinheiro Vivo', href: '/proibicao-dinheiro' },
      { title: 'Confisco de 1990', href: '/confisco-1990' },
      { title: 'Inflação: Imposto Oculto', href: '/inflacao-imposto-oculto' },
      { title: 'História do Dinheiro', href: '/historia-do-dinheiro' },
      { title: 'Economia Paralela', href: '/economia-paralela' },
    ],
  },
  {
    title: 'Resiliência Tática · Base 72',
    description: 'Água, abrigo, energia e comunicação para os primeiros 72 horas de qualquer colapso.',
    icon: Flame,
    accent: 'orange',
    links: [
      { title: 'Hub Resiliência', href: '/soberania-organica' },
      { title: 'Kit Tático 72h', href: '/soberania-organica/kit-72h' },
      { title: 'EDC: O Que Carregar Todo Dia', href: '/soberania-organica/edc' },
      { title: 'Primeiros Socorros Táticos', href: '/soberania-organica/primeiros-socorros-taticos' },
      { title: 'Protocolo de Fogo: Ignição, Úmido, Discreto', href: '/soberania-organica/protocolo-fogo' },
      { title: 'Purificação de Água', href: '/soberania-organica/purificacao-agua' },
      { title: 'Protocolos de Apagão', href: '/soberania-organica/protocolos-apagao' },
      { title: 'Abrigo de Emergência', href: '/soberania-organica/abrigo-emergencia' },
      { title: 'Comunicação Offline', href: '/soberania-organica/comunicacao-offline' },
      { title: 'Navegação Primária', href: '/soberania-organica/navegacao-primaria' },
      { title: 'Conservação e Armazenamento', href: '/soberania-organica/conservacao-armazenamento' },
      { title: 'Conservação de Alimentos: Fermentação, Cura, Conservas', href: '/soberania-organica/conservacao-alimentos' },
      { title: 'Defesa Pessoal Básica: Postura, Distância, Fuga', href: '/soberania-organica/defesa-pessoal' },
      { title: 'Defesa Domiciliar: Blindagem, Perímetro, Quarto Seguro', href: '/soberania-organica/defesa-domiciliar' },
      { title: 'Higiene Mental: Sono, Detox, Meditação, Anti-Ansiedade', href: '/soberania-organica/higiene-mental' },
      { title: 'Autonomia Veicular: Blindagem, Kit, Antiassalto, Antirrastreamento', href: '/soberania-organica/autonomia-veicular' },
      { title: 'Defesa Digital Pessoal: Senhas, 2FA Hardware, VPN, Antiphishing', href: '/soberania-organica/defesa-digital' },
      { title: 'Comunicação Segura: Signal, SimpleX, PGP, Meshtastic, Faraday', href: '/soberania-organica/comunicacao-segura' },
      { title: 'Autonomia Energética: Solar Off-Grid, LiFePO4, Inversor Híbrido, Gerador', href: '/soberania-organica/autonomia-energetica' },
      { title: 'Refúgio Rural Tático: Terreno, Construção, Água, Defesa e Logística', href: '/soberania-organica/refugio-rural' },
    ],
  },
  {
    title: 'Autonomia Alimentar',
    description: 'Sua mesa começa no quintal. Horta, solo, proteína e produção em pequenos espaços.',
    icon: Sprout,
    accent: 'lime',
    links: [
      { title: 'Horta Urbana', href: '/soberania-organica/horta-urbana' },
      { title: 'Solo e Fertilidade', href: '/soberania-organica/solo-fertilidade' },
      { title: 'Produção em Pequenos Espaços', href: '/soberania-organica/producao-pequenos-espacos' },
      { title: 'Proteína Sustentável', href: '/soberania-organica/proteina-sustentavel' },
      { title: 'Sementes Crioulas: Banco Pessoal', href: '/soberania-organica/sementes-crioulas' },
      { title: 'Conservas Fermentadas: Despensa Viva', href: '/soberania-organica/conservas-fermentadas' },
    ],
  },
  {
    title: 'Autonomia Biológica & Saúde',
    description: 'Protocolos clínicos, fitoterapia, primeiros socorros e tóxicos ocultos do dia a dia.',
    icon: Heart,
    accent: 'pink',
    links: [
      { title: 'Hub Autonomia Biológica', href: '/soberania-organica/autonomia-biologica' },
      { title: 'Primeiros Socorros', href: '/soberania-organica/primeiros-socorros' },
      { title: 'Primeiros Socorros Táticos: MARCH + IFAK', href: '/soberania-organica/primeiros-socorros-taticos' },
      { title: 'Avaliação de Sinais Vitais', href: '/soberania-organica/avaliacao-sinais' },
      { title: 'Saúde Preventiva', href: '/soberania-organica/saude-preventiva' },
      { title: 'Fitoterapia Aplicada', href: '/soberania-organica/fitoterapia-aplicada' },
      { title: 'Controle de Vetores', href: '/soberania-organica/controle-vetores' },
      { title: 'Sabedoria Ancestral', href: '/soberania-organica/sabedoria-ancestral' },
      { title: 'Babosa & Acemannan', href: '/soberania-organica/babosa-acemannan' },
      { title: 'Óleo de Rícino: Biohacker', href: '/soberania-organica/oleo-ricino-biohacker' },
      { title: 'Tóxicos Ocultos', href: '/soberania-organica/toxicos-ocultos' },
      { title: 'Toxinas Alimentares', href: '/soberania-organica/toxicos-ocultos/toxinas-alimentares' },
      { title: 'Toxinas Ambientais', href: '/soberania-organica/toxicos-ocultos/toxinas-ambientais' },
      { title: 'Manipulação Informacional', href: '/soberania-organica/toxicos-ocultos/manipulacao-informacional' },
      { title: 'Dependência Tecnológica', href: '/soberania-organica/toxicos-ocultos/dependencia-tecnologica' },
    ],
  },
  {
    title: 'Conhecimento Perdido',
    description: 'Práticas ancestrais que sobreviveram à modernidade. Para quem busca a raiz.',
    icon: BookOpen,
    accent: 'violet',
    links: [
      { title: 'Hub Conhecimento Perdido', href: '/soberania-organica/conhecimento-perdido' },
      { title: 'Contexto Histórico', href: '/conhecimento-perdido/contexto-historico' },
      { title: 'Base Fisiológica', href: '/conhecimento-perdido/base-fisiologica' },
      { title: 'Segurança e Limites', href: '/conhecimento-perdido/seguranca-e-limites' },
      { title: 'Aplicação Prática', href: '/conhecimento-perdido/aplicacao-pratica' },
      { title: 'Continuidade Familiar', href: '/conhecimento-perdido/continuidade-familiar' },
    ],
  },
  {
    title: 'Educação & Biblioteca',
    description: 'Audiobooks, e-books, manifestos e a trilha completa de formação técnica.',
    icon: Library,
    accent: 'cyan',
    links: [
      { title: 'Audiobooks', href: '/audiobooks' },
      { title: 'E-books e PDFs', href: '/ebooks' },
      { title: 'Silêncio e Queda', href: '/silencio-queda' },
      { title: 'Índice do Despertar', href: '/indice-do-despertar' },
      { title: 'Protocolo Inicial', href: '/protocolo-inicial' },
      { title: 'Arsenal Completo', href: '/arsenal' },
    ],
  },
  {
    title: 'Saída & Infraestrutura',
    description: 'Bandeiras de mobilidade física: passaportes, residência fiscal, jurisdições amigáveis e infraestrutura de saída.',
    icon: Plane,
    accent: 'amber',
    links: [
      { title: 'Estratégias de Saída (Hub)', href: '/saida' },
      { title: 'Gateway PIX → Bitcoin', href: '/saida/gateway' },
      { title: 'Segundo Passaporte: O Guia', href: '/saida/segundo-passaporte' },
      { title: 'Residência Fiscal: Saída do Brasil', href: '/saida/residencia-fiscal' },
      { title: 'Jurisdições Amigáveis: Ranking 2026', href: '/saida/jurisdicoes-amigaveis' },
      { title: 'Infraestrutura', href: '/infraestrutura' },
      { title: 'Economia Paralela', href: '/economia-paralela' },
    ],
  },
];

// Map accent to actual tailwind classes (avoid runtime composition)
const ACCENT: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  amber:   { text: 'text-amber-400',   bg: 'bg-amber-500/[0.08]',   border: 'border-amber-500/20',   glow: 'group-hover:shadow-amber-500/20' },
  sky:     { text: 'text-sky-400',     bg: 'bg-sky-500/[0.08]',     border: 'border-sky-500/20',     glow: 'group-hover:shadow-sky-500/20' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/[0.08]', border: 'border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/20' },
  red:     { text: 'text-red-400',     bg: 'bg-red-500/[0.08]',     border: 'border-red-500/20',     glow: 'group-hover:shadow-red-500/20' },
  rose:    { text: 'text-rose-400',    bg: 'bg-rose-500/[0.08]',    border: 'border-rose-500/20',    glow: 'group-hover:shadow-rose-500/20' },
  orange:  { text: 'text-orange-400',  bg: 'bg-orange-500/[0.08]',  border: 'border-orange-500/20',  glow: 'group-hover:shadow-orange-500/20' },
  lime:    { text: 'text-lime-400',    bg: 'bg-lime-500/[0.08]',    border: 'border-lime-500/20',    glow: 'group-hover:shadow-lime-500/20' },
  pink:    { text: 'text-pink-400',    bg: 'bg-pink-500/[0.08]',    border: 'border-pink-500/20',    glow: 'group-hover:shadow-pink-500/20' },
  violet:  { text: 'text-violet-400',  bg: 'bg-violet-500/[0.08]',  border: 'border-violet-500/20',  glow: 'group-hover:shadow-violet-500/20' },
  cyan:    { text: 'text-cyan-400',    bg: 'bg-cyan-500/[0.08]',    border: 'border-cyan-500/20',    glow: 'group-hover:shadow-cyan-500/20' },
};

export default function MapaDaSoberania() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [query, setQuery] = useState('');

  const totalPages = useMemo(() => SILOS.reduce((sum, s) => sum + s.links.length, 0), []);

  const filteredSilos = useMemo(() => {
    if (!query.trim()) return SILOS;
    const q = query.toLowerCase();
    return SILOS
      .map(s => ({ ...s, links: s.links.filter(l => l.title.toLowerCase().includes(q)) }))
      .filter(s => s.links.length > 0);
  }, [query]);

  return (
    <>
      <SeoHead path="/mapa-da-soberania" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-stone-100 relative">
        <FixedThematicBackground image={bgMapa} intensity="heavy" />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative z-10 min-h-[80vh] flex items-center justify-center px-5 md:px-8 py-20">
          <motion.div {...fade(0)} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] mb-8">
              <Map size={14} className="text-amber-400" />
              <span className="text-amber-400 font-mono text-[10px] font-bold tracking-[0.35em] uppercase">Índice Mestre</span>
            </div>

            <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.88] tracking-tighter mb-8 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O mapa completo<br />
              <span className="italic font-serif text-amber-400 normal-case tracking-tight font-light">da sua soberania.</span>
            </h1>

            <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light mb-10">
              Não é uma trilha linear. É uma arquitetura de <strong className="text-stone-100 font-semibold">{totalPages} páginas</strong> distribuídas em 4 fases de jornada e {SILOS.length} silos estratégicos. Você decide por onde entra.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500">
              <span className="flex items-center gap-2"><Eye size={12} className="text-amber-400" /> 4 Fases de Jornada</span>
              <span className="flex items-center gap-2"><Library size={12} className="text-amber-400" /> {SILOS.length} Silos</span>
              <span className="flex items-center gap-2"><Zap size={12} className="text-amber-400" /> {totalPages} Páginas</span>
            </div>

            <a href="#fases" className="inline-flex items-center gap-2 mt-12 text-stone-400 hover:text-amber-400 transition-colors text-xs font-mono uppercase tracking-[0.3em] group">
              Iniciar jornada
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* ═══════════ FASES DA JORNADA ═══════════ */}
        <section id="fases" className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="text-center mb-20">
            <span className="text-amber-400 font-mono text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">A Jornada</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Quatro fases. Uma direção.
            </h2>
            <p className="text-stone-400 mt-4 max-w-xl mx-auto">A maioria começa pelo Bitcoin e morre na autocustódia. Aqui você atravessa as quatro camadas.</p>
          </motion.div>

          <div className="space-y-32">
            {PHASES.map((phase, idx) => {
              const accent = ACCENT[phase.accent];
              const reverse = idx % 2 === 1;
              return (
                <motion.div key={phase.num} {...fade(0.05)} className="relative">
                  <div className={`grid lg:grid-cols-12 gap-6 lg:gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    {/* IMAGEM CINEMATOGRÁFICA */}
                    <div className="lg:col-span-7 relative h-[420px] md:h-[520px] rounded-sm overflow-hidden group">
                      <img
                        src={phase.image}
                        alt={`${phase.kicker}: ${phase.title}`}
                        loading="lazy"
                        width={1600}
                        height={900}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.3) 50%, rgba(5,8,8,0.95) 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <span className={`inline-block ${accent.bg} ${accent.text} ${accent.border} border px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-[0.3em] uppercase mb-3`}>{phase.kicker}</span>
                        <p className="text-white font-black text-2xl md:text-4xl uppercase italic tracking-tight leading-[1.05] max-w-md" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}>
                          {phase.title}
                        </p>
                      </div>
                      <span className={`absolute top-6 right-6 font-black text-[120px] md:text-[180px] leading-none opacity-10 ${accent.text}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {phase.num}
                      </span>
                    </div>

                    {/* MANIFESTO + LINKS */}
                    <div className="lg:col-span-5 space-y-6">
                      <p className={`font-mono text-[10px] tracking-[0.4em] uppercase ${accent.text}`}>{phase.kicker}</p>
                      <p className="text-stone-300 text-base md:text-lg leading-relaxed font-light italic">
                        {phase.manifesto}
                      </p>
                      <div className="space-y-2 pt-2">
                        {phase.pages.map(p => (
                          <Link
                            key={p.href}
                            to={p.href}
                            className={`block group p-4 rounded-sm border ${accent.border} bg-stone-950/40 hover:bg-stone-950/70 transition-all hover:-translate-y-0.5 hover:shadow-lg ${accent.glow}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className={`font-bold text-sm text-stone-100 group-hover:${accent.text} transition-colors`}>{p.title}</p>
                                <p className="text-stone-500 text-xs mt-0.5 leading-snug">{p.desc}</p>
                              </div>
                              <ArrowRight size={14} className={`${accent.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1`} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════ DIVISOR DRAMÁTICO ═══════════ */}
        <section className="relative z-10 overflow-hidden py-40 md:py-56">
          {/* Watermark gigante de fundo (atrás do conteúdo, sem colidir) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 bottom-0 flex items-start justify-center pointer-events-none select-none pt-4 md:pt-2"
          >
            <span
              className="font-black uppercase text-amber-500/[0.035] whitespace-nowrap leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(7rem, 20vw, 18rem)',
                letterSpacing: '-0.04em',
              }}
            >
              ÍNDICE
            </span>
          </div>

          {/* Linhas decorativas */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-transparent" />

          <motion.div {...fade(0)} className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center mt-32 md:mt-44">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
              <Compass size={20} className="text-amber-400" />
              <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-amber-400 font-bold">
                Atalho Cirúrgico
              </span>
              <Compass size={20} className="text-amber-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>

            <h2
              className="font-black uppercase tracking-tighter text-stone-100 mb-6 leading-[0.85]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              }}
            >
              Índice <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">completo</span>
            </h2>

            <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Todas as <strong className="text-amber-400 font-semibold">{totalPages} páginas</strong>, organizadas em {SILOS.length} silos estratégicos.
              <br className="hidden md:block" />
              Para quem já conhece o terreno e quer atalho cirúrgico.
            </p>

            <div className="flex items-center justify-center gap-2 mt-10">
              <span className="h-1 w-1 rounded-full bg-amber-500/60" />
              <span className="h-1 w-12 rounded-full bg-amber-500/40" />
              <span className="h-1 w-1 rounded-full bg-amber-500/60" />
            </div>
          </motion.div>
        </section>

        {/* ═══════════ BUSCA ═══════════ */}
        <section className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 mb-12">
          <motion.div {...fade(0)} className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar páginas (ex: bitcoin, fitoterapia, exchange)..."
              className="w-full bg-stone-950/60 border border-stone-800 rounded-sm pl-11 pr-4 py-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 focus:bg-stone-950/80 transition-all font-mono"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 text-xs font-mono uppercase tracking-wider">
                Limpar
              </button>
            )}
          </motion.div>
        </section>

        {/* ═══════════ ÍNDICE PREMIUM ═══════════ */}
        <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-32">
          {filteredSilos.length === 0 ? (
            <motion.div {...fade(0)} className="text-center py-20 text-stone-500">
              <p className="text-base">Nenhuma página encontrada para "<span className="text-amber-400">{query}</span>".</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSilos.map((silo, idx) => {
                const accent = ACCENT[silo.accent];
                return (
                  <motion.div
                    key={silo.title}
                    {...fade(idx * 0.04)}
                    className={`group relative overflow-hidden rounded-sm border ${accent.border} bg-stone-950/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${accent.glow} hover:bg-stone-950/80`}
                  >
                    {/* Linha dourada no topo — aparece no hover */}
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center"
                    />
                    {/* Glow sutil interno no hover */}
                    <span
                      aria-hidden
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    <div className="relative flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded ${accent.bg} ${accent.border} border`}>
                        <silo.icon size={18} className={accent.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-stone-100 text-base leading-tight uppercase tracking-tight">{silo.title}</h3>
                        <span className={`text-[10px] font-mono ${accent.text} uppercase tracking-widest`}>{silo.links.length} {silo.links.length === 1 ? 'página' : 'páginas'}</span>
                      </div>
                    </div>
                    <p className="relative text-stone-400 text-xs leading-relaxed mb-5 italic font-light">{silo.description}</p>
                    <div className="relative space-y-0.5 max-h-[280px] overflow-y-auto pr-2 -mr-2">
                      {silo.links.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={`block text-[13px] text-stone-400 hover:text-stone-100 transition-colors py-1.5 pl-3 border-l border-stone-800 hover:${accent.text.replace('text-', 'border-')}`}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CTA Bottom */}
          <motion.div {...fade(0.2)} className="text-center mt-24 border-t border-stone-800 pt-16">
            <Shield size={28} className="text-amber-400/70 mx-auto mb-5" />
            <p className="text-stone-300 text-lg italic font-light max-w-xl mx-auto mb-6">
              Autonomia não é isolamento. É redução inteligente de dependência.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-400 text-xs font-bold uppercase tracking-[0.3em] transition-colors font-mono">
              <ArrowRight size={12} className="rotate-180" /> Voltar à Base
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}
