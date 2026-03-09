import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Zap, Layers, Repeat, Smartphone, Coffee, ZapOff,
  ArrowRight, Shield, Lock, Eye, Globe, ShoppingCart,
  Wifi, WifiOff, Users, Copy, Check, QrCode,
  AlertTriangle, CheckCircle, XCircle, Clock, DollarSign,
  Radio, Server, Route, Hash, X, ChevronDown, 
  Cpu, Network, TrendingUp, Scale, Banknote, MapPin,
  Car, CreditCard, Tag, Landmark, ArrowUpRight
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import qrCodeImage from '@/assets/qrcode-lightning.jpeg';

/* ─── CONSTANTS ─── */
const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';
const BG_ALT = '#070b0b';

/* ─── ANIMATION VARIANTS ─── */
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

const slideLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ─── MOUSE PARALLAX ─── */
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

/* ─── TOC CHAPTERS ─── */
const chapters = [
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'layer-2', label: 'Layer-2' },
  { id: 'como-usar', label: 'Como Usar' },
  { id: 'casos-de-uso', label: 'Casos de Uso' },
  { id: 'arsenal-carteiras', label: 'Carteiras' },
  { id: 'criadores', label: 'Criadores' },
  { id: 'adocao-global', label: 'Adoção Global' },
  { id: 'numeros', label: 'Números' },
  { id: 'faq', label: 'FAQ' },
  { id: 'apoie', label: 'Apoie' },
];

/* ─── FAQ DATA ─── */
const faqItems = [
  { q: 'Preciso ter um Bitcoin inteiro para usar a Lightning?', a: 'Não. Você pode enviar e receber frações chamadas satoshis (1 BTC = 100 milhões de sats). Com a Lightning, é possível transacionar até 1 sat — o equivalente a frações de centavo. A barreira de entrada é zero.' },
  { q: 'A Lightning Network é realmente segura?', a: 'Sim. Ela herda a segurança da blockchain do Bitcoin. Os fundos são protegidos por contratos multisig na cadeia principal. Se algo der errado no canal, você pode fechá-lo a qualquer momento e recuperar seus satoshis na Layer 1. A segurança é matemática, não baseada em promessas.' },
  { q: 'Posso receber pagamentos Lightning sem estar online?', a: 'Depende da carteira. Phoenix e Zeus sincronizam pagamentos recebidos quando você volta a ficar online. Carteiras custodiais como Wallet of Satoshi recebem a qualquer momento porque o servidor deles nunca dorme — mas as chaves não são suas. Soberania tem preço: atenção.' },
  { q: 'Qual a diferença entre Lightning Address e Invoice?', a: 'Invoice é um código único para cada pagamento, com prazo de expiração. Lightning Address funciona como um e-mail permanente (ex: usuario@wallet.com) — reutilizável e estático. Ambos funcionam, mas o Address é mais prático para receber contribuições recorrentes.' },
  { q: 'A Lightning Network substitui o Bitcoin?', a: 'Jamais. Ela complementa. O Bitcoin L1 é a camada de liquidação definitiva — o cofre de aço. A Lightning é a camada de uso diário — o bolso com acesso rápido. Juntas, formam o sistema monetário mais robusto já concebido pela humanidade.' },
  { q: 'Posso usar Lightning no Brasil?', a: 'Sim. Qualquer pessoa com um smartphone pode instalar Phoenix ou Zeus e começar a transacionar em minutos. Não precisa de banco, CPF, aprovação de ninguém ou horário comercial. A Lightning não conhece fronteiras, jurisdições ou feriados bancários.' },
  { q: 'Quanto custa uma transação Lightning?', a: 'Em média, menos de 1 satoshi — o equivalente a frações de centavo de real. Compare com as taxas do cartão de crédito (2-5%), do PIX empresarial (0,22%), ou das remessas internacionais (5-8%). Lightning é ordens de magnitude mais barata.' },
  { q: 'Lightning funciona sem internet?', a: 'A Lightning requer conexão para enviar e receber transações em tempo real. Porém, uma vez recebido, o saldo é seu — não depende de um banco estar operando. Em cenários de crise, qualquer conexão momentânea é suficiente para liquidar.' },
];

/* ─── SCHEMA.ORG ─── */
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question", "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo",
  "description": "Guia completo sobre a Lightning Network do Bitcoin: funcionamento técnico, carteiras non-custodiais, casos de uso reais, criadores e como começar hoje.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-09", "dateModified": "2026-03-09",
  "url": "https://lordjunnior.com.br/lightning"
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  "name": "Como usar a Lightning Network",
  "step": [
    { "@type": "HowToStep", "name": "Instale uma carteira compatível", "text": "Baixe Phoenix (recomendada) ou Zeus para máxima soberania." },
    { "@type": "HowToStep", "name": "Receba ou compre Bitcoin", "text": "Transfira BTC para sua carteira Lightning ou compre diretamente via exchange compatível." },
    { "@type": "HowToStep", "name": "Envie e receba instantaneamente", "text": "Use Lightning Address ou Invoice para transações instantâneas com taxas próximas a zero." },
  ]
};

/* ─── WALLET DATA ─── */
const wallets = [
  {
    name: 'Phoenix', type: 'Non-Custodial', verdict: 'Recomendada',
    icon: Zap, accent: 'yellow',
    pros: ['Chaves privadas no seu dispositivo', 'Backup automático e criptografado', 'Abertura de canal automática', 'Interface limpa e intuitiva'],
    cons: ['Taxa inicial para abertura do primeiro canal', 'Requer liquidez mínima para começar'],
    desc: 'Desenvolvida pela ACINQ — a mesma equipe por trás do Eclair, uma das implementações de referência do protocolo Lightning. Phoenix é a carteira que recomendamos para quem quer soberania sem complicação. Ela abre canais automaticamente, gerencia liquidez nos bastidores e protege suas chaves localmente. Você usa Bitcoin como dinheiro do dia a dia, sem abrir mão de ser o único dono dos seus satoshis.',
  },
  {
    name: 'Zeus', type: 'Non-Custodial', verdict: 'Para Veteranos',
    icon: Server, accent: 'blue',
    pros: ['Conecta ao seu próprio node (LND/CLN)', 'Controle total de canais e roteamento', 'Suporte a multi-conta', 'Conexão nativa via Tor'],
    cons: ['Curva de aprendizado significativa', 'Exige node próprio para controle máximo'],
    desc: 'Zeus é para quem quer ser o próprio banco — literalmente. Conecta-se ao seu node Lightning via Tor, dando controle absoluto sobre canais, roteamento, liquidez e privacidade. Não é para iniciantes, mas é a ferramenta definitiva para quem entende que soberania de verdade exige infraestrutura própria. Se você roda um node, Zeus é a sua interface de comando.',
  },
  {
    name: 'Wallet of Satoshi', type: 'Custodial', verdict: '⚠ Risco',
    icon: Coffee, accent: 'red',
    pros: ['Configuração zero — instala e usa', 'Interface extremamente simples', 'Recebe pagamentos mesmo offline'],
    cons: ['As chaves NÃO são suas', 'Empresa pode congelar fundos a qualquer momento', 'Sem privacidade real — tudo é rastreável', 'Depende de um servidor centralizado'],
    desc: 'Funciona como um banco digital: fácil, rápido, conveniente — e igualmente perigoso. Você é apenas um registro no servidor deles. Se a empresa cair, se um governo exigir, se uma regulação mudar, seus satoshis desaparecem. Use exclusivamente para micro-valores descartáveis que você aceita perder. Para qualquer coisa séria, a custódia é inegociável.',
  },
];

/* ─── USE CASES ─── */
const useCases = [
  {
    icon: Coffee, title: 'Café & Comércio Local',
    desc: 'Pague seu café em satoshis. Sem maquininha de cartão, sem taxa de adquirente, sem intermediário bancário. O comerciante recebe a liquidação final em menos de 3 segundos.',
    example: 'Um café de R$ 8 = ~1.200 sats. Taxa Lightning: ~1 sat (R$ 0,005). Taxa do cartão de crédito no mesmo café: R$ 0,40. Em 100 cafés, o comerciante economiza R$ 39. Multiplique por um mês.',
    impact: 'alto',
  },
  {
    icon: Globe, title: 'Remessas Internacionais',
    desc: 'Envie dinheiro para qualquer país do planeta em 3 segundos. Sem Swift, sem 5 dias úteis, sem taxa de 8%, sem câmbio manipulado. A Lightning não reconhece fronteiras geopolíticas.',
    example: 'Enviar R$ 500 do Brasil para o Paraguai via banco: R$ 40 de taxa + 3 dias úteis. Via Lightning: ~R$ 0,01 + 3 segundos. A diferença não é marginal — é civilizacional.',
    impact: 'alto',
  },
  {
    icon: ShoppingCart, title: 'E-commerce Sem Intermediários',
    desc: 'Venda produtos e serviços sem processador de pagamentos. Sem chargebacks fraudulentos, sem estornos, sem Stripe ficando com 2,9%. Pagamento final, irreversível e soberano.',
    example: 'Integre BTCPay Server à sua loja e receba diretamente na sua carteira. Zero intermediários, zero taxas de plataforma, zero risco de cancelamento pós-venda.',
    impact: 'medio',
  },
  {
    icon: Users, title: 'Gorjetas & Micropagamentos',
    desc: 'Envie 100 sats para um artigo que mudou sua perspectiva. Monetize conteúdo sem anúncios invasivos, sem assinaturas mensais, sem plataformas que retêm 30% da receita do criador.',
    example: 'Podcasters usam Lightning para receber sats por minuto de escuta. Criadores de conteúdo integram com Nostr para o modelo value4value: você paga o que vale.',
    impact: 'medio',
  },
  {
    icon: WifiOff, title: 'Economia de Crise',
    desc: 'Quando o sistema bancário trava — e ele trava —, a Lightning continua operando. Sem dependência de servidores centrais, sem horário comercial, sem feriado bancário.',
    example: 'Na Argentina, durante controles cambiais severos, a Lightning se tornou rota de escape para transações P2P fora do radar bancário. No Líbano, bancos bloquearam saques por meses — Lightning não parou.',
    impact: 'alto',
  },
  {
    icon: Radio, title: 'Streaming de Dinheiro',
    desc: 'Pague por segundo de uso. Música, vídeo, API, computação. O dinheiro flui como dados numa rede — contínuo, fracionado, instantâneo. Esta é a monetização nativa da internet.',
    example: 'Apps como Fountain pagam podcasters em sats por segundo de escuta. Sem contrato, sem mínimo de audiência, sem intermediário. O ouvinte vota com satoshis, não com likes.',
    impact: 'medio',
  },
];

/* ─── NETWORK STATS ─── */
const networkStats = [
  { label: 'Capacidade Total', value: '~5.000 BTC', detail: 'Liquidez disponível nos canais públicos', icon: Banknote },
  { label: 'Nodes Ativos', value: '19.374+', detail: 'Pontos de roteamento globais', icon: Cpu },
  { label: 'Canais Abertos', value: '75.000+', detail: 'Conexões bilaterais ativas', icon: Network },
  { label: 'Tempo Médio', value: '<3 seg', detail: 'Do envio à confirmação final', icon: Clock },
  { label: 'Taxa Média', value: '<1 sat', detail: 'Frações de centavo por transação', icon: DollarSign },
  { label: 'Throughput', value: '~1M TPS', detail: 'Transações por segundo teóricas', icon: TrendingUp },
];

/* ─── FLOATING TOC ─── */
function FloatingTOC({ activeChapter }: { activeChapter: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-end gap-1.5">
        {chapters.map((ch) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group flex items-center gap-2 transition-all duration-300 ${
              activeChapter === ch.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}
          >
            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
              activeChapter === ch.id ? 'text-yellow-500 opacity-100 translate-x-0' : 'text-stone-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              {ch.label}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeChapter === ch.id ? 'bg-yellow-500 scale-125 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-stone-700 group-hover:bg-stone-500'
            }`} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── CHAPTER HEADER ─── */
function ChapterHeader({ number, title, subtitle, align = 'left' }: { number: string; title: string; subtitle?: string; align?: 'left' | 'center' }) {
  return (
    <motion.div variants={fadeUp} custom={0} className={`mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/50 block mb-2">{number}</span>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-stone-500 text-sm md:text-base leading-relaxed mt-4 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─── DIVIDER ─── */
function Divider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent my-24 md:my-32" />;
}

/* ─── MAIN COMPONENT ─── */
export default function Lightning() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeChapter, setActiveChapter] = useState('o-que-e');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active chapter tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' }
    );
    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-yellow-300/50 relative overflow-hidden" style={{ background: BG_DARK }}>
      <Helmet>
        <title>Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo | Lord Junnior</title>
        <meta name="description" content="Guia definitivo da Lightning Network do Bitcoin: o que é, como funciona a layer-2, carteiras non-custodiais (Phoenix, Zeus), casos de uso reais, criadores e como começar hoje. Soberania instantânea." />
        <link rel="canonical" href="https://lordjunnior.com.br/lightning" />
        <meta property="og:title" content="Lightning Network: O Que É, Como Funciona e Como Usar — Guia Definitivo" />
        <meta property="og:description" content="Guia completo: canais de pagamento, roteamento onion, carteiras, casos de uso reais e o passo a passo para usar Bitcoin no dia a dia." />
        <meta property="og:url" content="https://lordjunnior.com.br/lightning" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #eab308, #f59e0b, #f97316)' }} />
      </div>

      {/* ─── FLOATING TOC ─── */}
      <FloatingTOC activeChapter={activeChapter} />

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(234,179,8,0.08) 50%, transparent 70%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/lightning-network.webp"
        phase="A Segunda Camada do Bitcoin"
        title="Lightning Network"
        subtitle="A solução de layer-2 que transforma o Bitcoin em dinheiro instantâneo. Taxas de frações de centavo. Confirmação em milissegundos. Soberania sem compromisso."
        icon={Zap}
        accentColor="amber"
        backLink="/arsenal"
        backLabel="Torre de Controle"
      />

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 01 — O QUE É A LIGHTNING NETWORK             ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="o-que-e" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 01"
                title="O Que É a Lightning Network?"
                subtitle="E por que ela é a peça que faltava para o Bitcoin dominar o cotidiano."
              />

              {/* Editorial 2-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Main Column */}
                <motion.div variants={fadeUp} custom={1} className="lg:col-span-7 space-y-6">
                  <p className="text-stone-300 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    A <strong className="text-yellow-500">Lightning Network</strong> é uma solução de segunda camada (layer-2) construída especificamente sobre a blockchain do Bitcoin — a maior e mais segura rede criptográfica do planeta. Seu propósito é cirúrgico: <strong className="text-white">resolver o maior gargalo do BTC — a escalabilidade</strong> — sem sacrificar a descentralização ou a segurança que tornaram o Bitcoin uma revolução.
                  </p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                    Apesar de ser a primeira rede criptográfica já desenvolvida — e amplamente considerada a maior revolução do sistema financeiro moderno —, a blockchain do Bitcoin ainda não consegue ser autônoma o suficiente para manter velocidade, custo baixo, descentralização e segurança simultaneamente. São quatro pilares que competem entre si. Se você otimiza velocidade, sacrifica descentralização. Se prioriza segurança, paga com lentidão.
                  </p>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                    A Lightning Network não é uma tentativa de "consertar" o Bitcoin — é uma <strong className="text-stone-200">camada de extensão estratégica</strong> que oferece uma segunda via para transações do dia a dia. Com ela, você pode enviar e receber Bitcoin <strong className="text-yellow-500">quase instantaneamente</strong>, com taxas tão baixas que chegam a frações de centavo — e com isso, as chamadas <strong className="text-white">microtransações</strong> se tornaram viáveis pela primeira vez na história do dinheiro digital.
                  </p>

                  {/* Pull Quote */}
                  <motion.div variants={fadeUp} custom={2}
                    className="border-l-2 border-yellow-500/40 pl-6 py-4 my-8">
                    <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      "O Bitcoin é o cofre de aço. A Lightning é o bolso com acesso instantâneo. Juntos, formam o sistema monetário mais completo já concebido."
                    </p>
                    <span className="text-stone-600 text-xs font-bold tracking-[0.3em] uppercase mt-3 block">
                      Analogia Soberana
                    </span>
                  </motion.div>
                </motion.div>

                {/* Side Column — Key Metrics */}
                <motion.div variants={slideRight} custom={2} className="lg:col-span-5 space-y-5">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm">
                    <h4 className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/50 mb-6">O Problema Que Ela Resolve</h4>
                    <div className="space-y-5">
                      {[
                        { label: 'Velocidade Bitcoin L1', value: '~10 min', sublabel: 'por confirmação', bad: true },
                        { label: 'Velocidade Lightning', value: '<3 seg', sublabel: 'confirmação final', bad: false },
                        { label: 'Taxa Bitcoin L1', value: 'R$ 5–50+', sublabel: 'por transação', bad: true },
                        { label: 'Taxa Lightning', value: '~R$ 0,005', sublabel: 'por transação', bad: false },
                        { label: 'TPS Bitcoin L1', value: '~7', sublabel: 'transações/seg', bad: true },
                        { label: 'TPS Lightning', value: '~1.000.000', sublabel: 'transações/seg', bad: false },
                      ].map((m, i) => (
                        <div key={m.label} className="flex items-center justify-between">
                          <div>
                            <p className={`text-xs font-medium ${m.bad ? 'text-stone-600' : 'text-stone-300'}`}>{m.label}</p>
                            <p className="text-[10px] text-stone-700">{m.sublabel}</p>
                          </div>
                          <span className={`text-lg font-bold ${m.bad ? 'text-red-500/60' : 'text-yellow-500'}`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA mini */}
                  <div className="bg-yellow-500/[0.04] border border-yellow-500/[0.12] rounded-2xl p-6 text-center">
                    <Zap size={20} className="text-yellow-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Quer ver na prática?
                    </p>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      Role até o final desta página e envie seu primeiro pagamento Lightning. Pode ser 1 sat. A experiência muda tudo.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 02 — COMO FUNCIONA                           ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="como-funciona" className="py-24 md:py-32" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 02"
                title="Como Funciona a Lightning Network?"
                subtitle="A mecânica dos canais de pagamento — e por que cada transação que você faz na Lightning nunca toca a blockchain principal."
                align="center"
              />

              {/* Intro text */}
              <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  O coração do funcionamento da Lightning é a criação de <strong className="text-white">canais de pagamento</strong> entre os participantes. Em vez de registrar cada transação individualmente na blockchain — o que geraria congestionamento e custos —, as operações acontecem <strong className="text-yellow-500">off-chain</strong> (fora da rede principal). Apenas os saldos finais são gravados efetivamente na blockchain do Bitcoin. Isso permite uma quantidade massiva de transações quase instantâneas, sem esperar a confirmação da rede principal.
                </p>
              </motion.div>

              {/* 3-Step Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  {
                    icon: Layers, title: 'Abertura do Canal', step: '01',
                    desc: 'Dois participantes travam Bitcoin num contrato multisig na blockchain. Esse depósito bilateral abre uma via expressa privada: a partir deste momento, podem trocar satoshis ilimitadamente entre si sem tocar na cadeia principal.',
                    detail: 'É como abrir uma conta corrente conjunta com alguém. O dinheiro está lá, protegido pela blockchain, mas vocês transacionam livremente sem ir ao banco a cada operação.',
                  },
                  {
                    icon: Route, title: 'Roteamento Onion', step: '02',
                    desc: 'Não tem canal direto com o destinatário? O pagamento salta automaticamente entre nodes intermediários — e nenhum deles conhece o remetente original ou o destinatário final. Privacidade criptográfica por arquitetura.',
                    detail: 'O modelo replica o funcionamento do Tor: cada node da rota só conhece o node anterior e o próximo. Não existe um ponto central que enxerga a transação completa.',
                  },
                  {
                    icon: Repeat, title: 'Fechamento do Canal', step: '03',
                    desc: 'Quando quiser, feche o canal. A transação final é publicada na blockchain refletindo os saldos finais de cada participante. Milhares de transações intermediárias comprimidas numa única gravação.',
                    detail: 'Se Alice enviou 50.000 sats para Bob em 200 micro-transações, a blockchain só registra: "Alice tinha X, agora Bob tem X+50.000". Eficiência brutal.',
                  },
                ].map((item, i) => (
                  <motion.div key={item.title} variants={scaleIn} custom={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden
                               hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-500 group">
                    <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.3em] text-yellow-500/25 uppercase">
                      Passo {item.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] flex items-center justify-center mb-6
                                    group-hover:bg-yellow-500/15 group-hover:border-yellow-500/30 transition-all duration-500">
                      <item.icon size={28} className="text-yellow-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <p className="text-stone-600 text-xs leading-relaxed italic border-t border-white/[0.05] pt-4">{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* Toll Road Analogy — Full width callout */}
              <motion.div variants={fadeUp} custom={4}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Car size={32} className="text-yellow-500/60 mb-4" />
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      A Analogia da Rodovia com Pedágio
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Pense no tráfego em rodovias com pedágio. Usar a rede principal do Bitcoin para cada transação é a mesma coisa que parar no guichê, pegar moedas e cédulas e pagar o ticket manualmente — cada carro, cada vez, congestionando a fila.
                    </p>
                  </div>
                  <div className="bg-yellow-500/[0.04] border border-yellow-500/[0.12] rounded-xl p-6">
                    <Tag size={24} className="text-yellow-500 mb-3" />
                    <h5 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Lightning = Tag Automática
                    </h5>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      A Lightning representa os carros com tag de abertura automática da cancela. A passagem é instantânea, o pedágio é registrado — mas o débito final só é liquidado quando o ciclo fecha. Milhares de passagens, uma única cobrança consolidada na blockchain. Velocidade sem sacrificar a segurança.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 03 — O QUE SÃO SOLUÇÕES DE LAYER-2          ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="layer-2" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 03"
                title="O Que São Soluções de Segunda Camada?"
                subtitle="A arquitetura que separa velocidade de segurança — e permite que ambas coexistam."
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <motion.div variants={fadeUp} custom={1} className="space-y-6">
                  <p className="text-stone-300 text-base leading-relaxed">
                    Soluções de segunda camada — como a Lightning Network — são <strong className="text-white">protocolos construídos sobre uma blockchain existente</strong>. No caso, sobre a blockchain do Bitcoin. Elas existem com um propósito específico: aumentar a capacidade de transação da rede sem comprometer a segurança da cadeia principal.
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Ao processar transações fora da blockchain principal (off-chain) e registrar apenas os resultados finais, essas soluções conseguem oferecer <strong className="text-yellow-500">transações mais rápidas, mais baratas e mais privadas</strong> — enquanto ainda se beneficiam da segurança e da imutabilidade da blockchain subjacente. É o melhor dos dois mundos: a velocidade de um sistema digital moderno com a garantia de um registro inviolável.
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    A grande sacada é que a Layer-2 não precisa reinventar a roda. Ela <strong className="text-stone-200">herda a segurança</strong> da Layer-1 e adiciona velocidade e eficiência por cima. Se algo der errado em qualquer canal Lightning, o usuário sempre pode recorrer à blockchain principal para resolver — exatamente como um tribunal supremo que está lá para quando o acordo extrajudicial falha.
                  </p>
                </motion.div>

                <motion.div variants={slideRight} custom={2}>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 space-y-6">
                    <h4 className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/50">
                      Arquitetura em Camadas
                    </h4>
                    {[
                      { layer: 'Layer 1 — Bitcoin Blockchain', role: 'Tribunal Supremo. Liquidação final. Segurança absoluta. Registro imutável e permanente de cada transação.', color: 'stone', icon: Lock },
                      { layer: 'Layer 2 — Lightning Network', role: 'Acordo extrajudicial. Velocidade instantânea. Taxas mínimas. Privacidade por design. Escalabilidade ilimitada.', color: 'yellow', icon: Zap },
                    ].map((l, i) => (
                      <div key={l.layer}
                        className={`p-5 rounded-xl border ${l.color === 'yellow' ? 'bg-yellow-500/[0.04] border-yellow-500/[0.15]' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <l.icon size={16} className={l.color === 'yellow' ? 'text-yellow-500' : 'text-stone-500'} />
                          <span className={`text-xs font-bold tracking-wider uppercase ${l.color === 'yellow' ? 'text-yellow-500' : 'text-stone-400'}`}>
                            {l.layer}
                          </span>
                        </div>
                        <p className="text-stone-500 text-xs leading-relaxed">{l.role}</p>
                      </div>
                    ))}
                    <p className="text-stone-600 text-[10px] italic leading-relaxed border-t border-white/[0.05] pt-4">
                      A segurança da Layer-2 não é baseada em promessa — é matemática. Os fundos estão protegidos por contratos multisig na Layer-1. Se qualquer coisa sair do esperado, você fecha o canal e seus satoshis voltam para a blockchain principal.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 04 — COMO USAR                               ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="como-usar" className="py-24 md:py-32" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 04"
                title="Como Usar a Lightning Network?"
                subtitle="O passo a passo concreto para começar a transacionar em Bitcoin instantâneo — sem banco, sem CPF, sem permissão."
                align="center"
              />

              {/* 3-Step Tutorial */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  {
                    step: '01', icon: Smartphone,
                    title: 'Instale Uma Carteira Compatível',
                    desc: 'Para aproveitar as vantagens da Lightning, você precisa de uma carteira que suporte o protocolo. Recomendamos a Phoenix (non-custodial) para iniciantes — ou Zeus para quem já roda um node próprio. Uma vez instalada, a carteira já está pronta para receber Bitcoin ou enviar se já tiver saldo.',
                    cta: 'Veja o Arsenal de Carteiras abaixo →',
                  },
                  {
                    step: '02', icon: Route,
                    title: 'Abra Um Canal de Pagamento',
                    desc: 'Quando você seleciona a rede Lightning, um canal de pagamento é estabelecido automaticamente. Na Phoenix, isto acontece sem que você precise configurar nada. O canal conecta você à rede global — a partir daí, pode realizar um número ilimitado de transações com qualquer participante.',
                    cta: 'A abertura é automática na Phoenix →',
                  },
                  {
                    step: '03', icon: Zap,
                    title: 'Envie e Receba em Segundos',
                    desc: 'Use Lightning Address (como um e-mail permanente) ou Invoice (código único) para receber. Para enviar, basta escanear o QR Code ou colar o endereço. Quando quiser encerrar, a transação final é registrada na blockchain do Bitcoin com os saldos finais de cada participante.',
                    cta: 'Teste agora — envie 1 sat no final desta página →',
                  },
                ].map((item, i) => (
                  <motion.div key={item.step} variants={scaleIn} custom={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden
                               hover:border-yellow-500/20 transition-all duration-500 group">
                    <div className="absolute top-4 right-4">
                      <span className="text-yellow-500/20 text-5xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {item.step}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] flex items-center justify-center mb-6
                                    group-hover:bg-yellow-500/15 transition-all duration-500">
                      <item.icon size={24} className="text-yellow-500" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <p className="text-yellow-500/60 text-xs font-medium">{item.cta}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 05 — CASOS DE USO REAIS                      ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="casos-de-uso" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 05"
                title="Na Prática — Casos de Uso Reais"
                subtitle="Lightning não é teoria, white paper ou promessa de futuro. É infraestrutura monetária funcionando agora, em tempo real, em dezenas de países. El Salvador adotou como moeda de curso legal. A Argentina usa como rota de fuga. O Brasil está acordando."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((uc, i) => (
                  <motion.div key={uc.title} variants={scaleIn} custom={i}
                    className={`bg-white/[0.03] border rounded-2xl p-8 transition-all duration-500 group relative overflow-hidden ${
                      uc.impact === 'alto' ? 'border-yellow-500/[0.12] hover:border-yellow-500/25 hover:shadow-[0_0_40px_rgba(234,179,8,0.04)]' : 'border-white/[0.06] hover:border-white/[0.12]'
                    }`}>
                    {uc.impact === 'alto' && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/25 to-transparent" />
                    )}
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] flex items-center justify-center mb-5
                                    group-hover:bg-yellow-500/15 transition-all duration-500">
                      <uc.icon size={22} className="text-yellow-500" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {uc.title}
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{uc.desc}</p>
                    <div className="bg-yellow-500/[0.04] border border-yellow-500/[0.1] rounded-lg p-3">
                      <p className="text-yellow-500/80 text-xs leading-relaxed">
                        <span className="font-bold uppercase tracking-wider text-[9px] text-yellow-500/60 block mb-1">Exemplo real</span>
                        {uc.example}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 06 — ARSENAL DE CARTEIRAS                    ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="arsenal-carteiras" className="py-24 md:py-32" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 06"
                title="Arsenal de Carteiras Lightning"
                subtitle="A carteira que você escolhe define quem controla o seu dinheiro. Não existe meio-termo nesta decisão: ou as chaves são suas, ou você é refém de um servidor que pode sumir amanhã."
                align="center"
              />

              <div className="space-y-6">
                {wallets.map((w, i) => {
                  const isRisk = w.accent === 'red';
                  const borderColor = isRisk ? 'border-red-500/10 hover:border-red-500/25' :
                    w.accent === 'blue' ? 'border-blue-500/10 hover:border-blue-500/25' : 'border-yellow-500/20 hover:border-yellow-500/40';
                  const bgColor = isRisk ? 'bg-white/[0.02]' : w.accent === 'blue' ? 'bg-blue-500/[0.02]' : 'bg-yellow-500/[0.03]';
                  const accentText = isRisk ? 'text-red-400' : w.accent === 'blue' ? 'text-blue-400' : 'text-yellow-500';
                  const badgeBg = isRisk ? 'bg-red-500/8 text-red-500/70 border-red-500/15' :
                    w.accent === 'blue' ? 'bg-blue-500/8 text-blue-400/70 border-blue-500/15' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';

                  return (
                    <motion.div key={w.name} variants={scaleIn} custom={i}
                      className={`${bgColor} border ${borderColor} rounded-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-500 group`}>
                      {!isRisk && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />}

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-xl ${isRisk ? 'bg-red-500/[0.08] border border-red-500/[0.15]' : w.accent === 'blue' ? 'bg-blue-500/[0.08] border border-blue-500/[0.15]' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                              <w.icon size={24} className={accentText} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {w.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[9px] font-bold tracking-[0.4em] uppercase px-2.5 py-1 rounded-md border ${badgeBg}`}>
                                  {w.type}
                                </span>
                                <span className={`text-[9px] font-bold tracking-[0.3em] uppercase ${accentText}`}>
                                  {w.verdict}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-stone-400 text-sm leading-relaxed">{w.desc}</p>
                        </div>

                        <div className="md:w-[320px] space-y-4">
                          <div>
                            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-emerald-500/60 mb-2 block">Prós</span>
                            <div className="space-y-1.5">
                              {w.pros.map(p => (
                                <div key={p} className="flex items-center gap-2 text-stone-400 text-xs">
                                  <CheckCircle size={12} className="text-emerald-500/60 shrink-0" />
                                  <span>{p}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-red-500/60 mb-2 block">Contras</span>
                            <div className="space-y-1.5">
                              {w.cons.map(c => (
                                <div key={c} className="flex items-center gap-2 text-stone-500 text-xs">
                                  <XCircle size={12} className="text-red-500/50 shrink-0" />
                                  <span>{c}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Golden Rule */}
              <motion.div variants={fadeUp} custom={4}
                className="mt-10 bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 md:p-10 text-center">
                <AlertTriangle size={28} className="text-yellow-500 mx-auto mb-4" />
                <p className="text-white text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                  Regra de Ouro da Custódia
                </p>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xl mx-auto">
                  Use carteiras custodiais <strong className="text-stone-200">exclusivamente</strong> para valores que você está disposto a perder — como troco no bolso.
                  Para qualquer valor significativo, a soberania das suas chaves privadas é absolutamente inegociável.
                  <span className="text-yellow-500 font-bold block mt-3 text-base"> Not your keys, not your coins.</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 07 — CRIADORES                               ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="criadores" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 07"
                title="Os Criadores da Lightning Network"
                subtitle="Quem projetou a solução que transformou o Bitcoin de ouro digital em dinheiro instantâneo."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    name: 'Joseph Poon',
                    role: 'Co-autor do White Paper',
                    desc: 'Pesquisador e criptógrafo que co-concebeu a arquitetura dos canais de pagamento bidirecionais. Seu trabalho definiu como transações off-chain poderiam herdar a segurança da blockchain principal sem comprometer a descentralização. Também contribuiu para o desenvolvimento do conceito de Plasma na Ethereum.',
                  },
                  {
                    name: 'Thaddeus Dryja',
                    role: 'Co-autor do White Paper',
                    desc: 'Engenheiro e pesquisador do MIT Digital Currency Initiative. Co-desenvolveu o protocolo de canais de pagamento e os mecanismos de penalidade que garantem honestidade entre participantes. Seu trabalho posterior no MIT focou em Utreexo, uma proposta para comprimir a blockchain do Bitcoin.',
                  },
                ].map((person, i) => (
                  <motion.div key={person.name} variants={scaleIn} custom={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10
                               hover:border-yellow-500/15 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/[0.06] border border-yellow-500/[0.12] flex items-center justify-center mb-5">
                      <Cpu size={24} className="text-yellow-500/70" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {person.name}
                    </h4>
                    <p className="text-yellow-500/60 text-xs font-bold tracking-[0.3em] uppercase mb-4">{person.role}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{person.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={3}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <Landmark size={24} className="text-yellow-500/50 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Da Proposta à Revolução (2015 – Hoje)
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Em 2015, Poon e Dryja publicaram o white paper "The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments" — o documento que formalizou a visão de uma rede descentralizada de micropagamentos capaz de resolver os problemas de escalabilidade do Bitcoin. A versão beta foi lançada em 2018, e desde então a Lightning tem sido desenvolvida, testada e aprimorada por uma comunidade dedicada de desenvolvedores, empresas e entusiastas ao redor do mundo. Não é um produto de uma empresa — é um protocolo aberto que pertence a todos.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 08 — ADOÇÃO GLOBAL                          ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="adocao-global" className="py-24 md:py-32" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 08"
                title="Adoção Global — Quem Já Está Usando"
                subtitle="De El Salvador às favelas da Nigéria. A Lightning cresce organicamente porque resolve problemas reais que o sistema bancário tradicional ignora."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={scaleIn} custom={0}
                  className="bg-white/[0.03] border border-yellow-500/[0.12] rounded-2xl p-8 hover:border-yellow-500/25 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
                  <div className="text-3xl mb-4">🇸🇻</div>
                  <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    El Salvador — O Primeiro País
                  </h4>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Em setembro de 2021, El Salvador se tornou o primeiro país do mundo a adotar Bitcoin como moeda de curso legal.
                    A Lightning Network é a espinha dorsal dos pagamentos diários via app Chivo Wallet. Milhões de transações processadas,
                    remessas internacionais sem Western Union, e inclusão financeira real para 70% da população que simplesmente não tinha conta bancária.
                    Não é teoria — é política monetária soberana em ação.
                  </p>
                </motion.div>

                <motion.div variants={scaleIn} custom={1}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] transition-all duration-500">
                  <div className="text-3xl mb-4">🌍</div>
                  <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Expansão Orgânica
                  </h4>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Argentina usa Lightning para escapar de controles cambiais sufocantes. Nigéria e Gana para remessas familiares que antes perdiam 8% para intermediários.
                    Europa para micropagamentos em conteúdo digital. Japão para compras em lojas físicas com QR Code.
                    A rede não cresce por marketing — cresce porque resolve problemas que o sistema financeiro tradicional criou e se recusa a solucionar.
                  </p>
                </motion.div>
              </div>

              <motion.div variants={scaleIn} custom={2}
                className="bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 md:p-10 hover:border-yellow-500/25 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
                <div className="text-3xl mb-4">🇧🇷</div>
                <h4 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Brasil — O Gigante Que Está Acordando
                </h4>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                  O Brasil é um dos maiores mercados de Bitcoin do mundo, mas a adoção da Lightning ainda está nos estágios iniciais.
                  Comunidades em São Paulo, Florianópolis e Brasília já aceitam pagamentos Lightning em feiras, mercados locais e comércios independentes.
                  Com o DREX (Real Digital) avançando silenciosamente como a ferramenta definitiva de vigilância financeira estatal,
                  a Lightning se posiciona como a alternativa soberana: pagamentos instantâneos, sem CPF, sem rastreamento comportamental,
                  sem limite de horário, sem permissão de burocrata.
                </p>
                <p className="text-yellow-500 font-bold text-lg mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  O Pix do povo é o Lightning. E ele não precisa de banco central.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 09 — OS NÚMEROS                              ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="numeros" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 09"
                title="Os Números Não Mentem"
                subtitle="Crescimento de 132% em nodes públicos entre 2021 e 2022. E estes são apenas os nodes visíveis — os privados amplificariam esses dados exponencialmente."
                align="center"
              />

              {/* Growth Stats */}
              <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto mb-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center">
                    <p className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">Janeiro 2021</p>
                    <p className="text-3xl md:text-4xl font-bold text-stone-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      8.321
                    </p>
                    <p className="text-stone-600 text-xs mt-2">Nodes públicos ativos</p>
                  </div>
                  <div className="bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 text-center">
                    <p className="text-yellow-500/50 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">Janeiro 2022</p>
                    <p className="text-3xl md:text-4xl font-bold text-yellow-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      19.374
                    </p>
                    <p className="text-stone-500 text-xs mt-2">Nodes públicos ativos <span className="text-emerald-400 font-bold">(+132%)</span></p>
                  </div>
                </div>
                <p className="text-stone-600 text-xs text-center mt-4 italic">
                  * Estes números não incluem os chamados "nodes privados". Se contabilizados, o total de conexões na rede seria exponencialmente maior.
                </p>
              </motion.div>

              {/* Network Stats Grid */}
              <motion.div variants={fadeUp} custom={2}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {networkStats.map((stat) => (
                    <div key={stat.label}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center
                                 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-300 group">
                      <stat.icon size={18} className="text-yellow-500/50 mx-auto mb-2 group-hover:text-yellow-500 transition-colors" />
                      <div className="text-yellow-500 text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-stone-400 text-[10px] font-bold tracking-wider uppercase">{stat.label}</div>
                      <div className="text-stone-700 text-[9px] mt-1">{stat.detail}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CAPÍTULO 10 — FAQ                                     ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="faq" className="py-24 md:py-32" style={{ background: BG_ALT }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <ChapterHeader
                number="Capítulo 10"
                title="Perguntas Frequentes"
                subtitle="As dúvidas mais comuns sobre a Lightning Network — respondidas com clareza técnica e sem rodeios."
                align="center"
              />

              <div className="max-w-3xl mx-auto space-y-3">
                {faqItems.map((faq, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden
                               hover:border-yellow-500/15 transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left group">
                      <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-yellow-500/50 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: APPLE_EASE }}>
                          <div className="px-5 pb-5 border-t border-white/[0.05]">
                            <p className="text-stone-400 text-sm leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  CTA FINAL — LIGHTNING DONATION + PNL                  ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="apoie" className="py-24 md:py-32" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.div variants={fadeUp} custom={0}
                className="bg-white/[0.02] border border-yellow-500/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-yellow-500/[0.04] via-transparent to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

                <div className="relative z-10">
                  {/* Manifesto */}
                  <div className="text-center mb-12">
                    <motion.h2 variants={fadeUp} custom={1}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                      Agora Que Você Sabe,{' '}
                      <span className="text-yellow-500">Coloque em Prática.</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2}
                      className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                      Este conteúdo é gratuito, sem anúncios, sem paywall, sem rastreamento e sem patrocínio. Se ele ampliou sua visão e colocou
                      ferramentas reais nas suas mãos, considere enviar alguns satoshis como sinal de que informação livre tem valor de verdade.
                      Qualquer quantia — até 1 sat — é um voto pela soberania do conhecimento.
                    </motion.p>
                  </div>

                  {/* Lightning Address Card */}
                  <motion.div variants={scaleIn} custom={3} className="max-w-lg mx-auto">
                    <div className="bg-white/[0.03] border border-yellow-500/20 rounded-2xl p-8 text-center
                                    hover:border-yellow-500/30 hover:shadow-[0_0_60px_rgba(234,179,8,0.06)] transition-all duration-500">
                      <button onClick={() => setShowQrModal(true)}
                        className="w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-yellow-500/20
                                   hover:border-yellow-500/40 hover:scale-105 transition-all duration-300 cursor-pointer">
                        <img src={qrCodeImage} alt="QR Code Lightning Network" className="w-full h-full object-cover" loading="lazy" />
                      </button>

                      <p className="text-stone-600 text-[9px] font-bold tracking-[0.5em] uppercase mb-4">
                        Lightning Address
                      </p>

                      <button onClick={handleCopy}
                        className="flex items-center gap-3 mx-auto bg-yellow-500/[0.06] border border-yellow-500/15 rounded-xl px-5 py-3
                                   hover:bg-yellow-500/10 hover:border-yellow-500/25 transition-all duration-300 group">
                        <Zap size={14} className="text-yellow-500" />
                        <span className="text-yellow-400/80 text-xs font-mono tracking-wide">{LIGHTNING_ADDRESS}</span>
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-stone-600 group-hover:text-yellow-500/60 transition-colors" />}
                      </button>

                      {copied && (
                        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-emerald-400/70 text-[10px] font-bold tracking-wider uppercase mt-3">
                          Endereço copiado ⚡
                        </motion.p>
                      )}

                      <p className="text-stone-700 text-xs mt-6 leading-relaxed">
                        Escaneie o QR Code ou copie o endereço acima. Envie de qualquer carteira Lightning compatível.
                      </p>
                    </div>

                    {/* PNL Anchoring */}
                    <div className="mt-6 grid grid-cols-4 gap-2">
                      {[
                        { sats: '1.000', label: 'Um café' },
                        { sats: '5.000', label: 'Uma aula' },
                        { sats: '10.000', label: 'Um capítulo' },
                        { sats: 'Livre', label: 'Soberania' },
                      ].map((level) => (
                        <div key={level.sats}
                          className="bg-white/[0.02] border border-white/[0.05] rounded-lg py-3 px-2 text-center
                                     hover:border-yellow-500/20 transition-all duration-300">
                          <div className="text-yellow-500 text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {level.sats}
                          </div>
                          <div className="text-stone-600 text-[9px] tracking-wider uppercase mt-0.5">{level.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Continue Exploring */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <Link to="/autocustodia"
                      className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl px-8 py-4
                                 text-yellow-400 text-sm font-bold uppercase tracking-wider
                                 hover:bg-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-500 group">
                      Aprenda Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/o-que-e-bitcoin"
                      className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-8 py-4
                                 text-stone-400 text-sm font-bold uppercase tracking-wider
                                 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500">
                      O Que é o Bitcoin <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] py-12 text-center" style={{ background: BG_DARK }}>
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>

      {/* ─── QR MODAL ─── */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setShowQrModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-950 border border-yellow-500/20 rounded-2xl p-8 max-w-sm w-full text-center relative">
              <button onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <img src={qrCodeImage} alt="QR Code Lightning Network" className="w-64 h-64 mx-auto rounded-xl mb-4" loading="lazy" />
              <p className="text-white text-sm font-bold mb-2">Escaneie com sua carteira Lightning</p>
              <button onClick={handleCopy}
                className="flex items-center gap-2 mx-auto text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span className="font-mono">{LIGHTNING_ADDRESS}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
