import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Zap, Layers, Repeat, Smartphone, Coffee, ZapOff,
  ArrowRight, Shield, Lock, Eye, Globe, ShoppingCart,
  Wifi, WifiOff, Users, Copy, Check, QrCode,
  AlertTriangle, CheckCircle, XCircle, Clock, DollarSign,
  Radio, Server, Route, Hash, X, ChevronDown
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import qrCodeImage from '@/assets/qrcode-lightning.jpeg';

/* ─── SEO ─── */
const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";

const faqItems = [
  { q: 'Preciso ter um Bitcoin inteiro para usar a Lightning?', a: 'Não. Você pode enviar e receber frações mínimas chamadas satoshis (1 BTC = 100 milhões de sats). Com a Lightning, é possível transacionar até 1 sat — o equivalente a frações de centavo.' },
  { q: 'A Lightning Network é segura?', a: 'Sim. Ela herda a segurança do Bitcoin L1. Os fundos são protegidos por contratos multisig na blockchain. Se algo der errado no canal, você sempre pode fechar e recuperar seus sats na cadeia principal.' },
  { q: 'Posso receber pagamentos Lightning sem estar online?', a: 'Depende da carteira. Phoenix e Zeus podem receber offline e sincronizar depois. Carteiras custodiais como Wallet of Satoshi recebem a qualquer momento porque o servidor está sempre online — mas as chaves não são suas.' },
  { q: 'Qual a diferença entre Lightning Address e Invoice?', a: 'Invoice é um código único para cada pagamento (expira). Lightning Address funciona como um e-mail (ex: usuario@wallet.com) — permanente e reutilizável. Ambos funcionam, mas o Address é mais prático para receber.' },
  { q: 'A Lightning substitui o Bitcoin?', a: 'Não. Ela complementa. O Bitcoin L1 é a camada de liquidação final (o cofre). A Lightning é a camada de uso diário (o bolso). Juntas, formam um sistema monetário completo.' },
  { q: 'Posso usar Lightning no Brasil?', a: 'Sim. Qualquer pessoa com um smartphone pode instalar Phoenix ou Zeus e começar a transacionar em minutos. Não precisa de banco, CPF ou aprovação de ninguém.' },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question", "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "Lightning Network — Pagamentos Instantâneos em Bitcoin",
  "description": "Guia completo sobre a Lightning Network: como funciona, carteiras, casos de uso reais e como começar a usar Bitcoin no dia a dia.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-09", "url": "https://lordjunnior.com.br/lightning"
};

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

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

/* ─── Wallet Data ─── */
const wallets = [
  {
    name: 'Phoenix', type: 'Non-Custodial', verdict: 'Recomendada',
    icon: Zap, accent: 'yellow',
    pros: ['Chaves no seu dispositivo', 'Backup automático', 'Abertura de canal automática', 'Interface limpa'],
    cons: ['Taxa inicial de abertura de canal', 'Requer liquidez mínima'],
    desc: 'Desenvolvida pela ACINQ (criadores do eclair). A melhor experiência non-custodial para iniciantes. Abre canais automaticamente e gerencia liquidez sem que você precise entender o protocolo.',
  },
  {
    name: 'Zeus', type: 'Non-Custodial', verdict: 'Avançada',
    icon: Server, accent: 'blue',
    pros: ['Conecta ao seu próprio node', 'Controle total de canais', 'Multi-conta', 'Tor nativo'],
    cons: ['Curva de aprendizado maior', 'Requer node próprio para máximo controle'],
    desc: 'Para quem quer ser seu próprio banco de verdade. Conecta-se ao seu node LND ou CLN. Controle absoluto sobre roteamento, canais e liquidez. O nível máximo de soberania.',
  },
  {
    name: 'Wallet of Satoshi', type: 'Custodial', verdict: 'Risco',
    icon: Coffee, accent: 'red',
    pros: ['Zero configuração', 'Interface simples', 'Recebe offline'],
    cons: ['Chaves não são suas', 'Pode congelar fundos', 'Empresa pode fechar', 'Sem privacidade real'],
    desc: 'Funciona como um banco digital — fácil de usar, mas você é apenas um número no servidor deles. Se a empresa cair, se um governo exigir, seus sats somem. Útil para micro-valores descartáveis, perigosa para qualquer coisa séria.',
  },
];

/* ─── Use Cases ─── */
const useCases = [
  {
    icon: Coffee, title: 'Café & Comércio Local',
    desc: 'Pague seu café em satoshis. Sem maquininha, sem taxa de cartão, sem intermediário. O comerciante recebe em segundos, liquidação final.',
    example: 'Um café de R$ 8 = ~1.200 sats. Taxa Lightning: ~1 sat. Taxa do cartão de crédito: R$ 0,40. Quem paga a diferença? Você.',
  },
  {
    icon: Globe, title: 'Remessas Internacionais',
    desc: 'Envie dinheiro para qualquer país em segundos. Sem Swift, sem 5 dias úteis, sem taxa de 8%. Lightning não conhece fronteiras.',
    example: 'Enviar R$ 500 do Brasil para o Paraguai via banco: R$ 40 de taxa + 3 dias. Via Lightning: ~R$ 0,01 + 3 segundos.',
  },
  {
    icon: ShoppingCart, title: 'E-commerce Soberano',
    desc: 'Venda produtos e serviços sem processador de pagamentos. Sem chargebacks, sem estornos fraudulentos. Pagamento final e irreversível.',
    example: 'Integre com BTCPay Server e receba diretamente na sua carteira. Zero intermediários, zero taxas de plataforma.',
  },
  {
    icon: Users, title: 'Gorjetas & Micropagamentos',
    desc: 'Envie 100 sats para um artigo que mudou sua vida. Monetize conteúdo sem anúncios, sem assinaturas, sem plataformas que ficam com 30%.',
    example: 'Podcasters usam Lightning para receber sats por minuto de escuta. Criadores de conteúdo integram com Nostr para value4value.',
  },
  {
    icon: WifiOff, title: 'Economia de Crise',
    desc: 'Quando o sistema bancário trava, a Lightning continua funcionando. Sem dependência de servidores centrais, sem horário comercial.',
    example: 'Na Argentina, durante controles cambiais, a Lightning se tornou via de escape para transações P2P fora do radar bancário.',
  },
  {
    icon: Radio, title: 'Streaming de Dinheiro',
    desc: 'Pague por segundo de uso. Música, vídeo, API, computação. O dinheiro flui como dados — contínuo, fracionado, instantâneo.',
    example: 'Apps como Fountain pagam podcasters em sats por segundo de escuta. Sem contrato, sem mínimo, sem intermediário.',
  },
];

/* ─── Network Stats ─── */
const networkStats = [
  { label: 'Capacidade da Rede', value: '~5.000 BTC', detail: 'Liquidez total disponível nos canais' },
  { label: 'Nodes Ativos', value: '~16.000+', detail: 'Pontos de roteamento globais' },
  { label: 'Canais Abertos', value: '~75.000+', detail: 'Conexões bilaterais ativas' },
  { label: 'Tempo Médio', value: '<3 seg', detail: 'Do envio à confirmação final' },
  { label: 'Taxa Média', value: '<1 sat', detail: 'Frações de centavo por transação' },
  { label: 'Throughput Teórico', value: '~1M TPS', detail: 'Transações por segundo possíveis' },
];

export default function Lightning() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const Divider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-28" />
  );

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-yellow-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}>

      <Helmet>
        <title>Lightning Network — Guia Completo de Pagamentos Instantâneos em Bitcoin | Lord Junnior</title>
        <meta name="description" content="Guia definitivo da Lightning Network: como funciona, carteiras non-custodiais (Phoenix, Zeus), casos de uso reais, comparativo e como começar. Soberania instantânea." />
        <link rel="canonical" href="https://lordjunnior.com.br/lightning" />
        <meta property="og:title" content="Lightning Network — Pagamentos Instantâneos em Bitcoin" />
        <meta property="og:description" content="Guia completo: canais de pagamento, roteamento onion, carteiras e casos de uso reais." />
        <meta property="og:url" content="https://lordjunnior.com.br/lightning" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #eab308, #f59e0b, #f97316)' }} />
      </div>

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
        phase="Protocolo de Alta Frequência"
        title="Lightning Network"
        subtitle="O Bitcoin L1 é o tribunal final: lento e caro. Para a rua, precisamos de velocidade luz e soberania instantânea. Layer 2 é onde a revolução acontece no dia a dia."
        icon={Zap}
        accentColor="amber"
        backLink="/arsenal"
        backLabel="Torre de Controle"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — O TRIBUNAL VS A RUA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Tribunal vs A Rua
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-4 max-w-2xl">
              Imagine o Bitcoin como um sistema judicial: a blockchain é o tribunal supremo — lento, caro, mas com sentença definitiva. 
              A Lightning Network é o acordo extrajudicial — rápido, barato e igualmente vinculante. Só recorre ao tribunal quando necessário.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10 backdrop-blur-sm
                         hover:border-stone-700/50 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40">
                  <Lock size={20} className="text-stone-500" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-600">Layer 1: O Tribunal</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-400 mb-3 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Lento. Seguro. Caro.
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Arbitragem final. Liquidação de grandes volumes. A camada de ouro digital onde cada transação é gravada para sempre na blockchain. Ideal para valores altos e custódia de longo prazo.
              </p>
              <div className="space-y-2 text-stone-600 text-xs">
                <div className="flex items-center gap-2"><Clock size={12} /> <span>~10 min por confirmação</span></div>
                <div className="flex items-center gap-2"><DollarSign size={12} /> <span>Taxa: R$ 5–50+ dependendo do congestionamento</span></div>
                <div className="flex items-center gap-2"><Hash size={12} /> <span>~7 transações por segundo</span></div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 md:p-10 backdrop-blur-sm
                         hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(234,179,8,0.06)] transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-yellow-500/70">Layer 2: A Rua</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Instantâneo. Privado. Barato.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Transações do dia a dia. Café, serviços, circularidade. Moeda de troca soberana com taxas de frações de centavo e confirmação em milissegundos.
              </p>
              <div className="space-y-2 text-yellow-500/70 text-xs">
                <div className="flex items-center gap-2"><Clock size={12} /> <span>~1-3 segundos para confirmação</span></div>
                <div className="flex items-center gap-2"><DollarSign size={12} /> <span>Taxa: ~1 satoshi (~R$ 0,005)</span></div>
                <div className="flex items-center gap-2"><Hash size={12} /> <span>~1.000.000 transações por segundo</span></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — COMO FUNCIONA (DEEP DIVE)
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como Funciona — O Protocolo
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
              Três passos. Uma revolução. Entenda o ciclo de vida de um canal de pagamento Lightning e por que ele muda tudo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Layers, title: 'Abertura do Canal',
                desc: 'Alice e Bob travam BTC num contrato multisig na blockchain. Esse depósito bilateral abre uma via expressa: a partir de agora, podem trocar sats infinitamente entre si sem tocar na cadeia principal.',
                detail: 'É como abrir uma conta corrente conjunta com um amigo. O dinheiro está lá, protegido pela blockchain, mas vocês transacionam entre si sem ir ao banco.',
                step: '01'
              },
              {
                icon: Route, title: 'Roteamento Onion',
                desc: 'Não tem canal direto com o destino? Sem problema. O pagamento salta entre nodes intermediários — e nenhum deles sabe quem é o remetente ou o destinatário final.',
                detail: 'Funciona como o Tor: cada node só conhece o node anterior e o próximo. Privacidade criptográfica por design, não por promessa.',
                step: '02'
              },
              {
                icon: Repeat, title: 'Fechamento',
                desc: 'Quando quiser, feche o canal. Apenas o saldo final é publicado na blockchain — milhares de transações comprimidas em uma única gravação.',
                detail: 'Se Alice enviou 50.000 sats para Bob em 200 transações, a blockchain só vê: "Alice tinha X, agora Bob tem X+50.000". Eficiência máxima.',
                step: '03'
              },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 
                           hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.3em] text-yellow-500/30 uppercase">
                  Passo {item.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] mx-auto flex items-center justify-center mb-6
                               group-hover:bg-yellow-500/15 group-hover:border-yellow-500/30 transition-all duration-500">
                  <item.icon size={28} className="text-yellow-500" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight text-center"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 text-center">{item.desc}</p>
                <p className="text-stone-600 text-xs leading-relaxed italic text-center border-t border-white/[0.05] pt-4">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Network Stats Grid */}
          <motion.div variants={fadeUp} custom={3}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {networkStats.map((stat, i) => (
              <div key={stat.label}
                className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center
                           hover:border-yellow-500/15 transition-all duration-300">
                <div className="text-yellow-500 text-lg md:text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-stone-500 text-[10px] font-bold tracking-wider uppercase">{stat.label}</div>
                <div className="text-stone-700 text-[9px] mt-1">{stat.detail}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 03 — CASOS DE USO REAIS
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-16">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Na Prática — Casos de Uso Reais
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-4 max-w-2xl">
              Lightning não é teoria. É infraestrutura monetária funcionando agora, em tempo real, em dezenas de países. 
              El Salvador adotou como moeda de curso legal. A Argentina usa como rota de fuga. O Brasil está acordando.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                           hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/[0.08] border border-yellow-500/[0.15] flex items-center justify-center mb-5
                               group-hover:bg-yellow-500/15 transition-all duration-500">
                  <uc.icon size={22} className="text-yellow-500" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {uc.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{uc.desc}</p>
                <div className="bg-yellow-500/[0.04] border border-yellow-500/[0.1] rounded-lg p-3">
                  <p className="text-yellow-500/80 text-xs leading-relaxed">
                    <span className="font-bold uppercase tracking-wider text-[9px]">Exemplo real: </span>
                    {uc.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 04 — ARSENAL DE CARTEIRAS
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Arsenal de Carteiras
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
              A carteira que você escolhe define quem controla seu dinheiro. Não existe meio-termo: 
              ou as chaves são suas, ou você é refém de um servidor que pode sumir amanhã.
            </p>
          </motion.div>

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
                    {/* Left: Info */}
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

                    {/* Right: Pros/Cons */}
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

          {/* Verdict Box */}
          <motion.div variants={fadeUp} custom={4}
            className="mt-8 bg-yellow-500/[0.04] border border-yellow-500/[0.15] rounded-2xl p-8 text-center">
            <AlertTriangle size={24} className="text-yellow-500 mx-auto mb-4" />
            <p className="text-white text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Regra de Ouro
            </p>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xl mx-auto">
              Use carteiras custodiais <strong className="text-stone-300">apenas</strong> para valores que você está disposto a perder — como troco no bolso. 
              Para qualquer valor significativo, a soberania das suas chaves é inegociável. 
              <span className="text-yellow-500 font-bold"> Not your keys, not your coins.</span>
            </p>
          </motion.div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 05 — EL SALVADOR & ADOÇÃO GLOBAL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 05</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Adoção Global — Quem Já Usa
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-yellow-500/20 transition-all duration-500">
              <div className="text-2xl mb-4">🇸🇻</div>
              <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                El Salvador — O Primeiro País
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Em setembro de 2021, El Salvador se tornou o primeiro país a adotar Bitcoin como moeda de curso legal. 
                A Lightning Network é a espinha dorsal dos pagamentos diários via app Chivo Wallet. Milhões de transações processadas, 
                remessas internacionais sem Western Union, e inclusão financeira para 70% da população que não tinha conta bancária.
              </p>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-yellow-500/20 transition-all duration-500">
              <div className="text-2xl mb-4">🌍</div>
              <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Adoção Crescente
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Argentina usa Lightning para escapar de controles cambiais. Nigéria e Gana para remessas. Europa para micropagamentos em conteúdo. 
                Japão para compras em lojas físicas. A rede cresce organicamente porque resolve problemas reais: 
                enviar dinheiro sem pedir permissão, sem fronteiras, sem intermediários.
              </p>
            </motion.div>

            <motion.div variants={scaleIn} custom={2}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-yellow-500/20 transition-all duration-500 md:col-span-2">
              <div className="text-2xl mb-4">🇧🇷</div>
              <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Brasil — O Gigante Adormecido
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                O Brasil é um dos maiores mercados de Bitcoin do mundo, mas a adoção da Lightning ainda está no início. 
                Comunidades em São Paulo, Florianópolis e Brasília já aceitam pagamentos Lightning em feiras e comércios locais. 
                Com o DREX (Real Digital) avançando como ferramenta de vigilância estatal, a Lightning se posiciona como a alternativa soberana — 
                pagamentos instantâneos sem CPF, sem rastreamento, sem limite de horário. 
                <span className="text-yellow-500 font-medium"> O Pix do povo é o Lightning.</span>
              </p>
            </motion.div>
          </div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 06 — FAQ
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-yellow-500/60">Capítulo 06</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Perguntas Frequentes
            </h2>
          </motion.div>

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
                        <p className="text-stone-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════
            CTA FINAL — LIGHTNING DONATION + PNL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-yellow-500/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-yellow-500/[0.04] via-transparent to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
            
            <div className="relative z-10">
              {/* Manifesto */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Agora que você sabe,<br />
                  <span className="text-yellow-500">coloque em prática.</span>
                </h2>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                  Este conteúdo é gratuito, sem anúncios, sem paywall, sem rastreamento. Se ele ampliou sua visão, 
                  considere enviar alguns satoshis como sinal de que informação livre tem valor. 
                  Qualquer quantia — até 1 sat — é um voto pela soberania do conhecimento.
                </p>
              </div>

              {/* Lightning Address Card */}
              <div className="max-w-lg mx-auto">
                <div className="bg-white/[0.03] border border-yellow-500/20 rounded-2xl p-8 text-center
                               hover:border-yellow-500/30 hover:shadow-[0_0_60px_rgba(234,179,8,0.06)] transition-all duration-500">
                  {/* QR Code */}
                  <button onClick={() => setShowQrModal(true)}
                    className="w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-yellow-500/20 
                               hover:border-yellow-500/40 hover:scale-105 transition-all duration-300 cursor-pointer">
                    <img src={qrCodeImage} alt="QR Code Lightning" className="w-full h-full object-cover" />
                  </button>

                  <p className="text-stone-600 text-[9px] font-bold tracking-[0.5em] uppercase mb-4">
                    Lightning Address
                  </p>

                  {/* Copyable Address */}
                  <button onClick={handleCopy}
                    className="flex items-center gap-3 mx-auto bg-yellow-500/[0.06] border border-yellow-500/15 rounded-xl px-5 py-3
                               hover:bg-yellow-500/10 hover:border-yellow-500/25 transition-all duration-300 group">
                    <Zap size={14} className="text-yellow-500" />
                    <span className="text-yellow-400/80 text-xs font-mono tracking-wide">{LIGHTNING_ADDRESS}</span>
                    {copied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} className="text-stone-600 group-hover:text-yellow-500/60 transition-colors" />
                    )}
                  </button>

                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-400/70 text-[10px] font-bold tracking-wider uppercase mt-3">
                      Endereço copiado ⚡
                    </motion.p>
                  )}

                  <p className="text-stone-700 text-xs mt-6 leading-relaxed">
                    Escaneie o QR ou copie o endereço. Envie de qualquer carteira Lightning.
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
              </div>

              {/* Continue exploring */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl px-8 py-4
                             text-yellow-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-500 group">
                  Aprenda Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/entenda-bitcoin"
                  className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-8 py-4
                             text-stone-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500">
                  Entenda Bitcoin <ArrowRight size={16} />
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

      {/* ─── QR MODAL ─── */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setShowQrModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-950 border border-yellow-500/20 rounded-2xl p-8 max-w-sm w-full text-center relative">
              <button onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <img src={qrCodeImage} alt="QR Code Lightning" className="w-64 h-64 mx-auto rounded-xl mb-4" />
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
