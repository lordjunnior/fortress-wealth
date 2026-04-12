import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Key, Lock, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import coverImage from '@/assets/cover-silencio-queda.jpg';
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

const SilencioQueda: React.FC = () => {
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

  const handleDownload = () => {
    alert("Iniciando o download do Material Autoral...");
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/50 relative overflow-hidden"
      style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <Helmet>
        <title>O Silêncio da Queda — Entenda o Bitcoin do Zero | Lord Junnior</title>
        <meta name="description" content="Material gratuito para leigos absolutos. Entenda o Bitcoin usando linguagem simples e analogias do dia a dia. Sem jargão, sem especulação." />
        <link rel="canonical" href="https://lordjunnior.com.br/silencio-da-queda" />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #d4af37, #f5d060)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(212,175,55,0.06) 50%, transparent 70%)' }} />
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
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image={coverImage}
        phase="Material Autoral"
        title="O Silêncio da Queda"
        subtitle="Você não precisa entender de economia, programação ou gráficos. Este material usa linguagem simples e analogias do dia a dia para explicar o Bitcoin."
        icon={BookOpen}
        accentColor="amber"
        backLink="/"
        backLabel="Início"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — PARA QUEM É ESTE MATERIAL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Entenda o Bitcoin — Ainda Hoje
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden
                       hover:border-amber-500/15 transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Cover */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                  <img src={coverImage} alt="O Silêncio da Queda" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em]">Para Leigos Absolutos</span>
                </div>

                <div className="space-y-4 text-stone-400 leading-relaxed">
                  <p>Você não precisa entender de economia, programação ou gráficos.</p>
                  <p>Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura.</p>
                </div>

                <div className="border-l-2 border-amber-500/40 pl-6 py-3 bg-amber-500/[0.03] rounded-r-xl">
                  <p className="text-white text-lg font-medium">É o fim das dúvidas e o início da sua liberdade.</p>
                </div>

                <blockquote className="border-l-2 border-stone-700 pl-6">
                  <p className="text-stone-500 italic text-sm leading-relaxed mb-2">
                    "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
                  </p>
                  <footer className="text-amber-500 font-bold text-[10px] tracking-[0.3em] uppercase">— Lord Junnior</footer>
                </blockquote>

                <button onClick={handleDownload}
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 group">
                  <Download size={16} /> Baixar PDF Gratuito
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — O QUE VOCÊ VAI ENTENDER
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Que Você Vai Entender
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10
                         hover:border-amber-500/20 transition-all duration-500">
              <h4 className="text-xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Conteúdo</h4>
              <ul className="space-y-5">
                {[
                  'A história do dinheiro (explicada como uma história, não uma aula).',
                  'Por que o Bitcoin vale algo e por que não pode ser copiado.',
                  'Como funciona sua "senha mestre" e a segurança da rede.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-0.5 p-1 rounded-full border border-amber-500/20 bg-amber-500/5 shrink-0">
                      <CheckCircle2 size={14} className="text-amber-400" />
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={scaleIn} custom={1}
              className="bg-white/[0.02] border border-stone-800/40 rounded-2xl p-8 md:p-10
                         hover:border-amber-500/15 transition-all duration-500">
              <h4 className="text-xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Por Que Este Material Existe</h4>
              <div className="space-y-4 text-stone-500 text-sm leading-relaxed">
                <p>A queda não é do mercado. <strong className="text-white">É da consciência.</strong></p>
                <p>A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele.</p>
                <div className="pl-4 border-l-2 border-amber-500/30 py-2 my-4">
                  <p className="text-white text-sm">Bitcoin não surge como solução mágica.</p>
                  <p className="text-stone-500 text-sm">Surge como explicação tardia.</p>
                </div>
                <p className="pt-4 border-t border-white/5 italic text-stone-600">
                  Este material é gratuito, não exige cadastro e não é uma "isca" para vender curso. Baixe, leia e tire suas conclusões.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CTA FINAL — PRÓXIMO NÍVEL
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                <Key size={24} className="text-amber-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Próximo <span className="text-amber-500">Nível</span>
              </h2>
              <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
                Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática.
              </p>
              <div className="pt-4">
                <Link to="/educacao"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 group">
                  Ir para o Arsenal Técnico <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center space-y-4">
          <p className="text-white/80 text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Not your keys, not your money.
          </p>
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default SilencioQueda;
