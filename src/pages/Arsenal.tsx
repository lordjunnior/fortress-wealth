import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import {
  ShieldAlert, Lock, Globe, Cpu, Zap, ArrowRight, ArrowLeft,
  ShieldCheck, AlertTriangle, Crosshair, Skull, Eye, Fingerprint,
  ChevronDown, Target, Swords, Shield, Radar
} from 'lucide-react';

/* ─── SEO: meta keywords target ───
   torre de controle bitcoin, autocustódia bitcoin,
   economia paralela cripto, infraestrutura node bitcoin, lightning network,
   segurança bitcoin, blindagem golpes cripto, seed phrase segurança
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
const PILLARS = [
  {
    to: '/autocustodia',
    icon: Lock,
    num: '01',
    label: 'CUSTÓDIA',
    title: 'Arquitetura de Autocustódia',
    hook: 'A posse real das chaves.',
    desc: 'Use chaves privadas para provar propriedade e assinar transações sem intermediários. Se as suas moedas estão em uma corretora, você não possui Bitcoin — você possui uma promessa.',
    accent: '#d4af37',
    cta: 'ASSUMIR CONTROLE',
  },
  {
    to: '/economia-paralela',
    icon: Globe,
    num: '02',
    label: 'P2P',
    title: 'Economia Paralela',
    hook: 'Privacidade e transações diretas.',
    desc: 'O Bitcoin é pseudônimo, não anônimo. Proteja seu rastro através de transações P2P, sem intermediários e sem KYC. A privacidade financeira é um direito, não um privilégio.',
    accent: '#10b981',
    cta: 'OPERAR SEM RASTRO',
  },
  {
    to: '/infraestrutura',
    icon: Cpu,
    num: '03',
    label: 'NODO',
    title: 'Rede de Validação',
    hook: 'Rodando seu próprio nó.',
    desc: 'Seja o auditor da rede. Verifique cada transação e garanta o limite de 21 milhões. "Don\'t trust, verify" — não é slogan, é método operacional.',
    accent: '#3b82f6',
    cta: 'VALIDAR A REDE',
  },
  {
    to: '/lightning',
    icon: Zap,
    num: '04',
    label: 'LIGHTNING',
    title: 'Lightning no Bolso',
    hook: 'Microtransações em Satoshis.',
    desc: 'Transfira frações de centavo instantaneamente. A camada de liquidez que torna o Bitcoin dinheiro corrente — no café, no mercado, na rua.',
    accent: '#f59e0b',
    cta: 'ATIVAR LIQUIDEZ',
  },
];

const DEFENSE_ITEMS = [
  {
    icon: Skull,
    title: 'Engenharia Social',
    desc: 'Hackers não quebram o SHA-256. Eles quebram sua confiança usando medo, urgência e ganância. O ataque mais devastador não precisa de uma linha de código.',
    stat: '95%',
    statLabel: 'dos ataques exploram o fator humano',
  },
  {
    icon: Eye,
    title: 'A Regra de Ouro',
    desc: 'Ninguém legítimo jamais pedirá suas 12/24 palavras (Seed Phrase). Se pedirem, é roubo. Sem exceção. Sem "suporte técnico". Sem "verificação de conta".',
    stat: '0%',
    statLabel: 'de chance de recuperar seeds roubadas',
  },
  {
    icon: Fingerprint,
    title: 'Higiene Digital',
    desc: 'Use Cold Storage para quantias significativas. Autenticação 2FA por app (nunca SMS). Nunca clique em links suspeitos. A blockchain nunca foi hackeada — mas você pode ser.',
    stat: '100%',
    statLabel: 'da sua segurança depende de você',
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Arsenal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { springX, springY } = useMouseParallax(12);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-stone-100 font-sans selection:bg-red-400/30 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #dc2626, #d4af37)' }}
      />

      {/* ── AMBIENT BACKGROUND LAYERS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radar particles */}
        <style>{`
          @keyframes radarDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.2; }
            100% { transform: translateY(-900px) translateX(60px) rotate(360deg); opacity: 0; }
          }
          @keyframes radarSweep {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {/* Reactive orbs */}
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 60%)',
            x: springX,
            y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)',
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

        {/* Light beams (cinematic) */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(240deg,transparent_35%,hsl(0_84%_60%/0.01)_48%,transparent_55%)]" />
      </div>

      {/* ── RADAR PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 3 === 0 ? 'rgba(220,38,38,0.4)' : 'rgba(212,175,55,0.3)',
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animation: `radarDrift ${35 + Math.random() * 40}s linear ${Math.random() * 20}s infinite`,
            }}
          />
        ))}
        {/* Radar sweep (subtle) */}
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(220,38,38,0.04) 30deg, transparent 60deg)',
            animation: 'radarSweep 15s linear infinite',
          }}
        />
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
          <Link to="/" className="text-stone-600 hover:text-red-400 transition-colors flex items-center gap-2">
            <ArrowLeft size={12} /> Início
          </Link>
          <span className="text-stone-700">/</span>
          <span className="text-red-400">Arsenal Técnico</span>
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
                className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Crosshair className="text-red-400" size={24} />
              </motion.div>
              <span className="text-red-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">
                Domínio Técnico e Defesa de Ativos
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
              TORRE DE
            </motion.span>
            <motion.span
              className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-red-500"
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
            >
              CONTROLE
            </motion.span>
          </h1>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              A soberania começa quando você detém as <span className="text-red-400 font-bold">ferramentas certas</span>.
              Não basta entender o sistema — é preciso saber <span className="text-red-400 font-bold">operar fora dele</span>.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quatro pilares técnicos. Uma blindagem completa. O caminho da <span className="font-semibold text-stone-300">soberania operacional</span>.
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

        {/* Decorative side line */}
        <motion.div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
          <span className="text-red-500/30 text-[9px] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr]">4 Pilares</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2 — PROTOCOLO INICIAL (Master Card)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-red-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Ponto de Partida</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Antes de tudo: <span className="text-red-400">reprograme.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
            <Link to="/protocolo-inicial" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-10 md:p-16 transition-all duration-700 hover:border-red-500/30 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08), transparent 60%)' }}
              >
                {/* Animated glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(220,38,38,0.1), transparent 60%)' }}
                />

                {/* Background icon */}
                <ShieldAlert
                  size={320}
                  className="absolute -top-10 -right-10 text-red-500/[0.03] group-hover:text-red-500/[0.06] group-hover:scale-110 transition-all duration-1000"
                />

                {/* Shimmer line */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent group-hover:left-full transition-all duration-[1.5s] ease-in-out" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ boxShadow: ['0 0 0px rgba(220,38,38,0)', '0 0 20px rgba(220,38,38,0.15)', '0 0 0px rgba(220,38,38,0)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <Target className="text-red-400" size={24} />
                    </motion.div>
                    <span className="font-mono text-[10px] tracking-[0.4em] text-red-400/70">
                      PROTOCOLO ZERO
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Protocolo{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                      Inicial
                    </span>
                  </h3>

                  <p className="text-stone-400 text-base md:text-lg max-w-2xl leading-relaxed mb-4">
                    Neutralize o tédio e a mentira. Aprenda por que o limite de 21 milhões é a lei suprema
                    e como sua semente (seed) é seu único exército.
                  </p>

                  <p className="text-stone-600 text-sm leading-relaxed mb-10 max-w-xl">
                    O ponto de partida para quem decidiu parar de ser espectador e começar a operar com soberania.
                  </p>

                  <div className="inline-flex items-center gap-3 bg-red-600/90 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 group-hover:gap-4">
                    REPROGRAMAR CONSCIÊNCIA
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3 — OS QUATRO PILARES (Timeline vertical)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Arquitetura de Soberania</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro pilares. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Uma blindagem.</span>
            </h2>
          </motion.div>

          {/* Timeline vertical */}
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/30 via-emerald-500/20 via-blue-500/20 to-amber-500/30 hidden md:block" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/20 to-amber-500/20 md:hidden" />

            {PILLARS.map((pillar, i) => {
              const isLeft = i % 2 === 0;
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className={`relative flex items-start gap-6 md:gap-0 mb-16 md:mb-24 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 0px ${pillar.accent}00`,
                          `0 0 16px ${pillar.accent}30`,
                          `0 0 0px ${pillar.accent}00`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: pillar.accent, background: `${pillar.accent}15` }}
                    >
                      <Icon size={18} style={{ color: pillar.accent }} />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 ${isLeft ? 'md:w-[45%] md:pr-16' : 'md:w-[45%] md:pl-16'} ${isLeft ? '' : 'md:ml-auto'}`}>
                    <Link to={pillar.to} className="group block">
                      <div
                        className="cursor-pointer rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.15] relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${pillar.accent}08, transparent 60%)` }}
                      >
                        {/* Glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at top left, ${pillar.accent}15, transparent 60%)` }}
                        />

                        {/* Shimmer */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          <div
                            className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-1000 ease-in-out"
                            style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}40, transparent)` }}
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: pillar.accent }}>
                              Pilar {pillar.num}
                            </span>
                            <span
                              className="font-mono text-[9px] tracking-[0.3em] px-2.5 py-1 rounded-md border"
                              style={{
                                color: pillar.accent,
                                background: `${pillar.accent}10`,
                                borderColor: `${pillar.accent}25`,
                              }}
                            >
                              {pillar.label}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-stone-100 transition-colors">
                            {pillar.title}
                          </h3>

                          <p className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-70" style={{ color: pillar.accent }}>
                            {pillar.hook}
                          </p>

                          <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: `${pillar.accent}40` }} />

                          <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors mb-6">
                            {pillar.desc}
                          </p>

                          <div
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-500"
                            style={{ color: pillar.accent }}
                          >
                            {pillar.cta}
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
         MANIFESTO BREAK — PNL Trigger
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Swords className="mx-auto text-red-500/40 mb-6" size={28} />
            <p className="text-red-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Princípio operacional</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { bold: 'Quem possui as chaves', rest: 'possui o Bitcoin. Quem não possui, tem apenas uma promessa de terceiros.' },
                { bold: 'Quem valida suas transações', rest: 'não precisa confiar em gerentes, corretoras ou governos.' },
                { bold: 'Quem opera sem KYC', rest: 'preserva o direito fundamental à privacidade financeira.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                  <div className="h-px w-10 bg-red-500/20 mx-auto mb-4" />
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
         SECTION 4 — BLINDAGEM CONTRA GOLPES (Bento Grid)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-red-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Defesa Contra Predadores</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O ataque mais letal <span className="text-red-400">não usa código.</span>
            </h2>
            <p className="text-stone-500 text-base mt-4 max-w-2xl leading-relaxed">
              A blockchain nunca foi hackeada. Mas milhares de pessoas perdem Bitcoin todos os dias — não por falhas técnicas, mas por <span className="text-stone-300 font-semibold">engenharia social</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DEFENSE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:border-red-500/30 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.04), transparent 60%)' }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.08), transparent 70%)' }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        boxShadow: ['0 0 0px rgba(220,38,38,0)', '0 0 14px rgba(220,38,38,0.12)', '0 0 0px rgba(220,38,38,0)'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                      className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6"
                    >
                      <Icon className="w-6 h-6 text-red-400" />
                    </motion.div>

                    <h4 className="text-lg font-bold mb-3 group-hover:text-red-300 transition-colors duration-500">{item.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">{item.desc}</p>

                    {/* Stat pill */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <span className="text-2xl font-black text-red-400">{item.stat}</span>
                      <span className="text-[10px] text-stone-600 uppercase tracking-wider font-bold leading-tight">{item.statLabel}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mt-10">
            <Link
              to="/blindagem-golpes"
              className="group inline-flex items-center gap-3 text-red-400 text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all duration-500"
            >
              <Shield size={16} />
              Acessar Protocolo Completo de Blindagem
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 5 — PROJETO AUTÔNOMO (CTA Final)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}>
            <Link to="/projeto-autonomo" className="group block">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-10 md:p-16 transition-all duration-700 hover:border-emerald-500/30 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(245,158,11,0.03), transparent 60%)' }}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(16,185,129,0.1), transparent 60%)' }}
                />

                {/* Background icon */}
                <ShieldCheck
                  size={300}
                  className="absolute -top-8 -right-8 text-emerald-500/[0.03] group-hover:text-emerald-500/[0.06] group-hover:scale-110 transition-all duration-1000"
                />

                {/* Shimmer */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent group-hover:left-full transition-all duration-[1.5s] ease-in-out" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 20px rgba(16,185,129,0.15)', '0 0 0px rgba(16,185,129,0)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                    >
                      <Radar className="text-emerald-400" size={24} />
                    </motion.div>
                    <span className="font-mono text-[10px] tracking-[0.4em] text-emerald-400/70">
                      MÓDULO DE RESILIÊNCIA
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Projeto{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                      Autônomo
                    </span>
                  </h3>

                  <p className="text-stone-400 text-base md:text-lg max-w-2xl leading-relaxed mb-4">
                    Base 72 · Autonomia Biológica · Soberania Alimentar — Preparação real para quando o sistema falhar.
                    Quatro fases. Uma progressão lógica. A construção da sua independência real.
                  </p>

                  <p className="text-stone-600 text-sm leading-relaxed mb-10 max-w-xl">
                    A soberania financeira sem soberania física é uma ilusão. Este módulo completa a blindagem.
                  </p>

                  <div className="inline-flex items-center gap-3 bg-emerald-600/90 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 group-hover:gap-4">
                    ACESSAR PROTOCOLO
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom signature ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-8" />
          <p className="text-stone-700 font-bold uppercase tracking-[0.2em] text-[10px] italic" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Not your keys, not your money.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
