import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight, GraduationCap, Coins, TrendingDown, AlertTriangle, Lock,
  Zap, BookOpen, Shield, Flag
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';

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

const TRILHA = [
  {
    fase: 1, titulo: 'Entendendo o Sistema', cor: 'amber',
    desc: 'Antes de buscar soluções, você precisa entender o problema. Essas páginas revelam como o sistema monetário funciona e por que ele trabalha contra você.',
    itens: [
      { to: '/historia-do-dinheiro', titulo: 'A História do Dinheiro', desc: 'Do escambo ao ouro, do papel-moeda ao Bitcoin. A história que nunca te contaram na escola.', icon: Coins, tag: 'FUNDAMENTO' },
      { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação funciona, quem se beneficia e por que seu dinheiro vale menos a cada dia.', icon: TrendingDown, tag: 'EDUCAÇÃO' },
    ],
  },
  {
    fase: 2, titulo: 'Reconhecendo os Riscos', cor: 'red',
    desc: 'Os alertas que mostram o que está acontecendo agora, no Brasil e no mundo. Controle financeiro, vigilância e o fim da privacidade monetária.',
    itens: [
      { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'O Fim do Dinheiro Vivo', desc: 'O PL 3.951/2019, os limites ao dinheiro em espécie e o caminho para o controle total.', icon: AlertTriangle, tag: 'ALERTA' },
      { to: '/alertas/cbdc-brasil', titulo: 'DREX: A CBDC Brasileira', desc: 'A moeda digital programável do Banco Central e seus riscos para sua privacidade e liberdade.', icon: Lock, tag: 'ALERTA' },
    ],
  },
  {
    fase: 3, titulo: 'Descobrindo a Alternativa', cor: 'orange',
    desc: 'O Bitcoin não é uma moda. É a resposta tecnológica ao problema monetário mais antigo da civilização.',
    itens: [
      { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Dinheiro Fiat', desc: 'Comparação direta em 14 fatores: escassez, controle, inflação, privacidade, censura e mais.', icon: Zap, tag: 'COMPARAÇÃO' },
      { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à compreensão completa. O que é, como funciona e por que importa.', icon: BookOpen, tag: 'FUNDAMENTO' },
    ],
  },
  {
    fase: 4, titulo: 'Construindo Soberania', cor: 'emerald',
    desc: 'Saber não basta. Essas páginas transformam conhecimento em ação prática. Autocustódia, diversificação e independência financeira real.',
    itens: [
      { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro. Como armazenar Bitcoin de forma que ninguém possa confiscar.', icon: Shield, tag: 'PRÁTICA' },
      { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', desc: 'Diversificação jurisdicional: cidadania, contas, empresas e patrimônio em múltiplas jurisdições.', icon: Flag, tag: 'ESTRATÉGIA' },
    ],
  },
];

const corMap: Record<string, { border: string; bg: string; text: string; accent: string }> = {
  amber:   { border: 'border-amber-500/20',   bg: 'bg-amber-500/8',   text: 'text-amber-400',   accent: 'hover:border-amber-500/40' },
  red:     { border: 'border-red-500/20',     bg: 'bg-red-500/8',     text: 'text-red-400',     accent: 'hover:border-red-500/40' },
  orange:  { border: 'border-orange-500/20',  bg: 'bg-orange-500/8',  text: 'text-orange-400',  accent: 'hover:border-orange-500/40' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/8', text: 'text-emerald-400', accent: 'hover:border-emerald-500/40' },
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

export default function IndiceDoDesespertar() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/50 relative overflow-hidden"
      style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <Helmet>
        <title>Índice do Despertar — Guia da Soberania Financeira | Lord Junnior</title>
        <meta name="description" content="O mapa completo para entender o sistema monetário, reconhecer os riscos financeiros e construir soberania pessoal. Do zero à liberdade financeira." />
        <link rel="canonical" href="https://lordjunnior.com.br/indice-da-soberania" />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(245,158,11,0.06) 50%, transparent 70%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-emerald-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/economia-paralela.webp"
        phase="Mapa de Estudos"
        title="Índice do Despertar"
        subtitle="O caminho completo, do choque cognitivo à soberania financeira. Cada fase constrói sobre a anterior. 4 fases. 8 páginas essenciais."
        icon={GraduationCap}
        accentColor="amber"
        backLink="/"
        backLabel="Início"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══ TRILHA DE FASES ═══ */}
        {TRILHA.map((fase, faseIdx) => {
          const cores = corMap[fase.cor];
          return (
            <React.Fragment key={fase.fase}>
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                className="mb-20">
                <motion.div variants={fadeUp} custom={0} className="mb-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full ${cores.bg} border ${cores.border} flex items-center justify-center shrink-0`}>
                      <span className={`${cores.text} font-bold text-lg`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{fase.fase}</span>
                    </div>
                    <div>
                      <span className={`${cores.text} text-[10px] font-bold tracking-[0.5em] uppercase`}>Fase {fase.fase}</span>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {fase.titulo}
                      </h2>
                    </div>
                  </div>
                </motion.div>

                <motion.p variants={fadeUp} custom={1} className="text-stone-500 text-sm leading-relaxed max-w-3xl mb-8">
                  {fase.desc}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fase.itens.map((item, i) => (
                    <motion.div key={i} variants={scaleIn} custom={i}>
                      <Link to={item.to}
                        className={`block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                                   ${cores.accent} hover:bg-white/[0.04] transition-all duration-500 group`}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${cores.bg} border ${cores.border} shrink-0`}>
                            <item.icon size={20} className={cores.text} />
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] font-bold tracking-[0.3em] text-stone-600 uppercase">{item.tag}</span>
                            <h3 className="text-white font-bold text-lg tracking-tight mt-1 mb-2"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {item.titulo}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                          <ArrowRight size={16} className="text-stone-700 group-hover:text-white transition-colors shrink-0 mt-2 group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {faseIdx < TRILHA.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
              )}
            </React.Fragment>
          );
        })}

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-20" />

        {/* ═══ CTA FINAL ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Comece pela <span className="text-amber-500">Fase 1</span>
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
                Se você nunca estudou esses temas, comece pela História do Dinheiro. É a base de tudo que vem depois.
              </p>
              <div className="pt-4">
                <Link to="/historia-do-dinheiro"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-10 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 group">
                  📖 Começar a Jornada <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── SEO SECTION ─── */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-stone-700 text-xs leading-relaxed">
            <strong className="text-stone-600">Temas abordados:</strong> soberania financeira, educação monetária, história do dinheiro, inflação, CBDC, DREX, Bitcoin, autocustódia, teoria das bandeiras, diversificação jurisdicional, liberdade financeira.
          </p>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
