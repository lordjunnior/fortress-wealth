import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '@/components/ScrollToTop';
import { EducacaoBotanica } from '@/components/conhecimento-perdido/EducacaoBotanica';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

export default function ContinuidadeFamiliar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-purple-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f0f1a 8%, #11111f 20%, #141422 40%, #11111f 70%, #0f0f1a 90%, #0a0d08 100%)' }}
    >
      {/* ─── READING PROGRESS ─── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-purple-500" style={{ width: progressWidth }} />

      {/* ─── ATMOSPHERIC ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[30%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        {/* Spore particles */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-purple-400/20"
            style={{
              left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite ${Math.random() * 5}s`,
            }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="text-stone-600 hover:text-purple-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo" className="text-stone-600 hover:text-purple-400 transition-colors">Projeto Autônomo</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo/conhecimento-perdido" className="text-stone-600 hover:text-purple-400 transition-colors">Conhecimento Perdido</Link>
          <span className="text-stone-700">/</span>
          <span className="text-purple-400">Continuidade Familiar</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/25 backdrop-blur-sm">
              <Users className="text-purple-400" size={24} />
            </div>
            <span className="text-purple-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 05 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide uppercase leading-[0.9] text-white mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            CONTINUIDADE<br />
            <span className="text-purple-400" style={{ textShadow: '0 0 60px rgba(168,85,247,0.3)' }}>FAMILIAR</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica. 
            O conhecimento que não é transmitido morre em uma geração — este bloco garante que isso não aconteça.
          </p>
          <div className="mt-8 h-px w-32 bg-gradient-to-r from-purple-500/60 to-transparent" />
        </motion.header>

        {/* ─── CONTEXTO ─── */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-purple-950/20 border border-purple-700/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Por que isso importa
              </h2>
              <div className="space-y-6 text-stone-300 text-base leading-relaxed max-w-3xl">
                <p>
                  Quando uma geração perde a capacidade de identificar uma planta, de preparar um alimento sem embalagem, 
                  de entender o que o próprio corpo está dizendo — ela se torna <span className="text-purple-400 font-semibold">dependente</span>.
                </p>
                <p>
                  Dependente de quem vende o remédio. De quem embala o alimento. De quem interpreta os sintomas. 
                  De quem define o que é "saudável". Não é teoria. É o que aconteceu.
                </p>
                <p>
                  Aqui não se trata de rejeitar a medicina moderna ou viver isolado. Se trata de 
                  <span className="text-stone-100 font-semibold"> não depender exclusivamente de um sistema que pode falhar</span>. 
                  De ter autonomia para cuidar do básico. De reconhecer que o conhecimento que sustentou famílias por séculos 
                  não é "ultrapassado" — é fundamento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── EDUCAÇÃO BOTÂNICA EXPANDIDA ─── */}
        <div className="gsap-reveal mb-20">
          <EducacaoBotanica />
        </div>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="gsap-reveal flex flex-col sm:flex-row gap-4 mt-20">
          <Link to="/conhecimento-perdido/aplicacao-pratica"
            className="flex-1 group flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-stone-400 text-sm font-bold hover:bg-purple-500/10 hover:border-purple-500/20 hover:text-purple-400 transition-all duration-300">
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Aplicação Prática
          </Link>
          <Link to="/projeto-autonomo/conhecimento-perdido"
            className="flex-1 group flex items-center justify-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-2xl px-6 py-5 text-purple-400 text-sm font-bold hover:bg-purple-500/15 hover:border-purple-400/30 transition-all duration-300">
            Voltar ao Hub
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <ScrollToTop />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          66% { transform: translateY(-10px) translateX(-8px); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
