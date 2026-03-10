import React, { useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShieldCheck, Globe, Server, Zap, BookOpen,
  AlertTriangle, ChevronDown, Crosshair, Shield, Swords, Target, Radar
} from 'lucide-react';

/* ─── SEO: meta keywords target ───
   arsenal técnico bitcoin, autocustódia bitcoin, economia paralela cripto,
   infraestrutura node bitcoin, lightning network brasil, segurança bitcoin,
   manuais bitcoin, operação bitcoin, soberania financeira
─────────────────────────────────── */

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

/* ─── Mouse Parallax Hook ─── */
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

/* ─── DATA ─── */
const ARSENAL_MODULES = [
  {
    to: '/autocustodia',
    icon: ShieldCheck,
    num: '01',
    label: 'CUSTÓDIA',
    title: 'Arquitetura de Autocustódia',
    hook: 'Cold Wallets, PGP, Multisig & Wasabi.',
    desc: 'A posse real das suas chaves privadas é o único método de garantir que o Bitcoin é seu. Se as suas moedas estão em uma corretora, você não possui Bitcoin — você possui uma promessa de pagamento que pode ser bloqueada a qualquer momento.',
    accent: '#d4af37',
    cta: 'ASSUMIR CUSTÓDIA',
  },
  {
    to: '/economia-paralela',
    icon: Globe,
    num: '02',
    label: 'P2P',
    title: 'Economia Paralela',
    hook: 'Mercados BISQ, P2P & OpSec.',
    desc: 'O Bitcoin é pseudônimo, não anônimo. Proteja seu rastro através de transações diretas, sem intermediários e sem KYC. A privacidade financeira não é luxo — é o mínimo que separa o cidadão do súdito.',
    accent: '#38bdf8',
    cta: 'OPERAR SEM RASTRO',
  },
  {
    to: '/infraestrutura',
    icon: Server,
    num: '03',
    label: 'NODE',
    title: 'Rede de Validação',
    hook: 'Full Nodes, Hardware & Validação.',
    desc: 'Seja o auditor da rede. Verifique cada transação e garanta o limite de 21 milhões. "Don\'t trust, verify" — não é slogan, é método operacional. Quem roda um nó completo não precisa confiar em ninguém.',
    accent: '#34d399',
    cta: 'VALIDAR A REDE',
  },
  {
    to: '/lightning',
    icon: Zap,
    num: '04',
    label: 'LIGHTNING',
    title: 'Lightning no Bolso',
    hook: 'Camada 2, Phoenix & Velocidade.',
    desc: 'Transfira frações de centavo instantaneamente. A camada de liquidez que torna o Bitcoin dinheiro corrente — no café, no mercado, na rua. O Satoshi é a unidade do futuro soberano.',
    accent: '#c084fc',
    cta: 'ATIVAR LIQUIDEZ',
  },
];

export default function Educacao() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { springX, springY } = useMouseParallax(12);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-stone-100 font-sans selection:bg-yellow-400/30 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }}
      />

      {/* ── AMBIENT BACKGROUND LAYERS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Shield particles */}
        <style>{`
          @keyframes shieldDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.2; }
            100% { transform: translateY(-900px) translateX(70px) rotate(360deg); opacity: 0; }
          }
        `}</style>

        {/* Reactive orbs */}
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)',
            x: springX,
            y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)',
            x: useTransform(springX, v => -v * 0.5),
            y: useTransform(springY, v => -v * 0.5),
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Light beams */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(240deg,transparent_35%,hsl(40_92%_56%/0.01)_48%,transparent_55%)]" />
      </div>

      {/* ── FLOATING PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 2 === 0 ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.2)',
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animation: `shieldDrift ${35 + Math.random() * 40}s linear ${Math.random() * 20}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 1 — FULL-VIEWPORT CINEMATIC HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Hero background with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url('/heroes/arsenal-operacional.webp')`,
              filter: 'brightness(0.40) saturate(0.80)',
            }}
          />
          {/* Cinematic overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.55) 40%, rgba(5,8,8,0.92) 75%, rgba(5,8,8,1) 100%)',
            }}
          />
          {/* Side vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.85) 100%)',
            }}
          />
        </motion.div>

        {/* Breadcrumb */}
        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/" className="text-stone-600 hover:text-yellow-400 transition-colors flex items-center gap-2">
            <ArrowLeft size={12} /> Início
          </Link>
          <span className="text-stone-700">/</span>
          <span className="text-yellow-400">Arsenal Técnico</span>
        </nav>

        <div className="max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3.5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Crosshair className="text-yellow-400" size={24} />
              </motion.div>
              <span className="text-yellow-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">
                Manuais Técnicos de Operação
              </span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span
              className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white"
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}
            >
              ARSENAL
            </motion.span>
            <motion.span
              className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter"
              style={{ color: '#d4af37' }}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
            >
              TÉCNICO
            </motion.span>
          </h1>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              Estes materiais não são dicas de investimento. São <span className="font-bold" style={{ color: '#d4af37' }}>manuais técnicos de operação</span> para
              quem decidiu assumir a responsabilidade total sobre seu patrimônio.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Escolha sua arma. Cada módulo é um <span className="font-semibold text-stone-300">pilar de soberania</span> que remove uma camada de dependência do sistema.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar</span>
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>

        {/* Side decoration */}
        <motion.div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent" />
          <span className="text-yellow-500/30 text-[9px] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr]">4 Módulos</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2 — ESSENCIAL: COMECE PELO BÁSICO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Ponto de Partida</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Antes de operar: <span style={{ color: '#d4af37' }}>entenda.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
            <Link to="/o-que-e-bitcoin" className="group block">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-10 md:p-16 transition-all duration-700 hover:border-yellow-500/30 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06), transparent 60%)' }}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(212,175,55,0.1), transparent 60%)' }}
                />

                {/* Background icon */}
                <BookOpen
                  size={300}
                  className="absolute -top-10 -right-10 text-yellow-500/[0.03] group-hover:text-yellow-500/[0.06] group-hover:scale-110 transition-all duration-1000"
                />

                {/* Shimmer */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent group-hover:left-full transition-all duration-[1.5s] ease-in-out" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span
                      className="font-mono text-[10px] tracking-[0.4em] px-3 py-1.5 rounded-md border"
                      style={{ color: '#d4af37', background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.2)' }}
                    >
                      ESSENCIAL
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.4em] text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md">
                      FÁCIL E RÁPIDO
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Comece pelo{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #d4af37, #f59e0b)' }}>
                      Básico
                    </span>
                  </h3>

                  <p className="text-stone-400 text-base md:text-lg max-w-2xl leading-relaxed mb-4">
                    Antes de operar as ferramentas abaixo, leia <strong className="text-white">"Entenda o Bitcoin — ainda hoje"</strong>.
                    É um guia para leigos absolutos, sem termos técnicos. Entenda o "porquê" antes do "como".
                  </p>

                  <p className="text-stone-600 text-sm leading-relaxed mb-10 max-w-xl">
                    A diferença entre perder tudo e proteger tudo começa com um entendimento de 15 minutos.
                  </p>

                  <div className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 group-hover:gap-4"
                    style={{ background: 'rgba(212,175,55,0.9)' }}
                  >
                    ACESSAR GUIA ESSENCIAL
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         MANIFESTO BREAK — PNL Trigger
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Swords className="mx-auto text-yellow-500/40 mb-6" size={28} />
            <p className="text-yellow-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Princípio de operação</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { bold: 'Quem possui as chaves', rest: 'possui o Bitcoin. Quem não possui, tem apenas uma promessa de terceiros.' },
                { bold: 'Quem valida suas transações', rest: 'não precisa confiar em gerentes, corretoras ou governos.' },
                { bold: 'Quem opera sem KYC', rest: 'preserva o direito fundamental à privacidade financeira.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                  <div className="h-px w-10 mx-auto mb-4" style={{ background: 'rgba(212,175,55,0.2)' }} />
                  <p className="text-stone-500 text-sm leading-relaxed">
                    <span className="text-stone-200 font-semibold block mb-1">{item.bold}</span>
                    {item.rest}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3 — OS QUATRO MÓDULOS (Timeline Vertical)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Escolha sua Arma</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro módulos. <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #d4af37, #f59e0b)' }}>Uma blindagem.</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.3), rgba(56,189,248,0.2), rgba(52,211,153,0.2), rgba(192,132,252,0.3))' }}
            />
            <div className="absolute left-6 top-0 bottom-0 w-px md:hidden"
              style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.2), rgba(192,132,252,0.2))' }}
            />

            {ARSENAL_MODULES.map((mod, i) => {
              const isLeft = i % 2 === 0;
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className={`relative flex items-start gap-6 md:gap-0 mb-16 md:mb-24 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 0px ${mod.accent}00`,
                          `0 0 16px ${mod.accent}30`,
                          `0 0 0px ${mod.accent}00`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: mod.accent, background: `${mod.accent}15` }}
                    >
                      <Icon size={18} style={{ color: mod.accent }} />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 ${isLeft ? 'md:w-[45%] md:pr-16' : 'md:w-[45%] md:pl-16'} ${isLeft ? '' : 'md:ml-auto'}`}>
                    <Link to={mod.to} className="group block">
                      <div
                        className="cursor-pointer rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${mod.accent}08, transparent 60%)` }}
                      >
                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at top left, ${mod.accent}15, transparent 60%)` }}
                        />

                        {/* Shimmer */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          <div
                            className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-1000 ease-in-out"
                            style={{ background: `linear-gradient(to right, transparent, ${mod.accent}40, transparent)` }}
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: mod.accent }}>
                              Módulo {mod.num}
                            </span>
                            <span
                              className="font-mono text-[9px] tracking-[0.3em] px-2.5 py-1 rounded-md border"
                              style={{ color: mod.accent, background: `${mod.accent}10`, borderColor: `${mod.accent}25` }}
                            >
                              {mod.label}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-stone-100 transition-colors">
                            {mod.title}
                          </h3>

                          <p className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-70" style={{ color: mod.accent }}>
                            {mod.hook}
                          </p>

                          <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: `${mod.accent}40` }} />

                          <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors mb-6">
                            {mod.desc}
                          </p>

                          <div
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-500"
                            style={{ color: mod.accent }}
                          >
                            {mod.cta}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3B — FORMAÇÃO COMPLEMENTAR
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Complemento Técnico</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Formação <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #d4af37, #f59e0b)' }}>expandida.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { to: '/blockchain', num: '05', label: 'FUNDAMENTO', title: 'O Que é Blockchain', hook: 'Blocos, Hashing, PoW & Consenso.', desc: 'A espinha dorsal do Bitcoin. Entenda como a cadeia de blocos elimina a necessidade de confiar em terceiros e cria um registro imutável e transparente.', accent: '#38bdf8', cta: 'DOMINAR A BASE' },
              { to: '/candlestick', num: '06', label: 'ANÁLISE', title: 'Candlestick', hook: 'Velas, Padrões & Psicologia de Mercado.', desc: 'A linguagem visual do mercado. Domine a leitura de gráficos japoneses para entender a batalha entre compradores e vendedores em qualquer timeframe.', accent: '#34d399', cta: 'LER O MERCADO' },
              { to: '/diversificacao', num: '07', label: 'ESTRATÉGIA', title: 'A Falácia da Diversificação', hook: 'Correlação, Inflação & Assimetria.', desc: 'Por que diversificar entre ativos fiat é diluir patrimônio com ilusão de segurança. Dados, tabelas comparativas e argumentos que encerram o debate.', accent: '#f59e0b', cta: 'VER OS DADOS' },
              { to: '/bitcoin-vs-altcoins', num: '08', label: 'VEREDICTO', title: 'Bitcoin vs Altcoins', hook: 'ETH, XRP, LTC & Stablecoins.', desc: 'Análise técnica destruindo os argumentos de Ethereum, XRP, Litecoin e stablecoins. Por que só existe um Bitcoin e por que este projeto não recomenda alternativas.', accent: '#f43f5e', cta: 'VER O VEREDICTO' },
            ].map((mod, i) => (
              <motion.div key={mod.num} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.15}>
                <Link to={mod.to} className="group block">
                  <div className="rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${mod.accent}08, transparent 60%)` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${mod.accent}15, transparent 60%)` }} />
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                      <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-1000 ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${mod.accent}40, transparent)` }} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: mod.accent }}>Módulo {mod.num}</span>
                        <span className="font-mono text-[9px] tracking-[0.3em] px-2.5 py-1 rounded-md border" style={{ color: mod.accent, background: `${mod.accent}10`, borderColor: `${mod.accent}25` }}>{mod.label}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-stone-100 transition-colors">{mod.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-70" style={{ color: mod.accent }}>{mod.hook}</p>
                      <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: `${mod.accent}40` }} />
                      <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors mb-6">{mod.desc}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-500" style={{ color: mod.accent }}>
                        {mod.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 4 — WARNING BLOCK
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
            <div
              className="relative overflow-hidden rounded-2xl border p-8 md:p-10"
              style={{ borderColor: 'rgba(220,38,38,0.2)', background: 'linear-gradient(135deg, rgba(220,38,38,0.04), transparent 60%)' }}
            >
              <AlertTriangle size={200} className="absolute -bottom-8 -right-8 text-red-500/[0.03]" />
              <div className="relative z-10 flex items-start gap-4">
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(220,38,38,0)', '0 0 14px rgba(220,38,38,0.15)', '0 0 0px rgba(220,38,38,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl shrink-0"
                >
                  <AlertTriangle className="text-red-400" size={20} />
                </motion.div>
                <div>
                  <h4 className="text-lg font-bold text-red-300 mb-2">Autocustódia exige responsabilidade</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    <strong className="text-stone-300">Not your keys, not your money.</strong> Quem não assume a custódia aceita a dependência.
                    As ferramentas acima são armas de proteção — mas toda arma exige disciplina, estudo e comprometimento com a própria segurança.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom signature ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">
            Dependência financeira nunca foi acidente. Sempre foi projeto.
          </p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">
            Lord Junnior © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
