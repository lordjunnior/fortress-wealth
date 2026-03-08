import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Download, KeyRound, ArrowRight, AlertTriangle } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 } }),
};

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 }); const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => { mouseX.set(((e.clientX - window.innerWidth/2) / (window.innerWidth/2)) * strength); mouseY.set(((e.clientY - window.innerHeight/2) / (window.innerHeight/2)) * strength); }, [mouseX, mouseY, strength]);
  useEffect(() => { window.addEventListener('mousemove', handleMouse); return () => window.removeEventListener('mousemove', handleMouse); }, [handleMouse]);
  return { springX, springY };
}

export default function EntendaBitcoin() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(t > 0 ? Math.min((window.scrollY / t) * 100, 100) : 0); };
    window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Entenda o Bitcoin — Guia para Leigos Absolutos | Lord Junnior</title>
        <meta name="description" content="Guia completo e gratuito para entender o Bitcoin do zero: história do dinheiro, por que Bitcoin tem valor, como funciona a segurança. Linguagem simples, sem jargão." />
      </Helmet>
      <ScrollToTop />

      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #eab308)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(234,179,8,0.08) 50%, transparent 70%)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }} className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.04]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      <CinematicHero image="/heroes/entenda-bitcoin.webp" phase="Para Leigos Absolutos" title="Entenda o Bitcoin"
        subtitle="Você não precisa entender de economia, programação ou gráficos. Este material usa linguagem simples e analogias do dia a dia. É o fim das dúvidas e o início da sua liberdade."
        icon={BookOpen} accentColor="amber" backLink="/educacao" backLabel="Arsenal Técnico" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* Citação */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.03] border border-amber-500/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="border-l-2 border-amber-500/40 pl-6">
              <p className="text-stone-300 text-base italic leading-relaxed">
                "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
              </p>
              <p className="text-amber-400 text-xs font-bold mt-4 tracking-[0.3em] uppercase">Lord Junnior</p>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* O que você vai entender */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O que você vai entender</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'A história do dinheiro (explicada como uma história, não uma aula).',
              'Por que o Bitcoin vale algo e por que não pode ser copiado.',
              'Como funciona sua "senha mestre" e a segurança da rede.',
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500 group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all">
                  <span className="text-amber-400 font-bold">{i + 1}</span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* Por que este material existe */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Por que este material existe</h2>
          </motion.div>
          <motion.div variants={scaleIn} custom={1} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 max-w-4xl">
            <div className="space-y-5 text-stone-400 leading-relaxed">
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A queda não é do mercado. É da consciência.</p>
              <p>A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele.</p>
              <p>Bitcoin não surge como solução mágica. Surge como <strong className="text-white">explicação tardia</strong>.</p>
              <p>Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.</p>
              <div className="pt-5 border-t border-white/[0.05]">
                <p className="text-stone-500 text-xs">Este material é gratuito, não exige cadastro e não é uma "isca" para vender curso. Baixe, leia e tire suas conclusões.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* Download CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <button className="inline-flex items-center gap-3 bg-amber-500/15 border border-amber-500/30 rounded-xl px-10 py-5 text-amber-400 text-base font-bold uppercase tracking-wider hover:bg-amber-500/25 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.12)] transition-all duration-500 group animate-pulse">
              <Download size={20} /> Baixar PDF Gratuito
            </button>
          </motion.div>
        </motion.section>

        {/* Próximo Nível */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-28">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <KeyRound size={32} className="text-amber-400 mx-auto" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500/60">Próximo Nível</p>
              <p className="text-stone-300 text-sm max-w-lg mx-auto">Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática.</p>
              <Link to="/educacao" className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4 text-amber-400 text-sm font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
                Ir para o Arsenal Técnico <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Warning */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp} custom={0} className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-6">
            <p className="text-red-400 text-xs font-bold flex items-start gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              Not your keys, not your money. Quem não assume a custódia aceita a dependência. Autocustódia exige responsabilidade.
            </p>
          </motion.div>
        </motion.div>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
