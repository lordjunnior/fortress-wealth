import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '@/components/ScrollToTop';
import CinematicHero from '@/components/CinematicHero';
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
    <>
      <Helmet>
        <title>Continuidade Familiar: Educação Botânica e Autonomia Biológica para Gerações | Lord Junnior</title>
        <meta name="description" content="Como transmitir conhecimento ancestral de plantas medicinais para as próximas gerações. Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica familiar." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/continuidade-familiar" />
        <meta property="og:title" content="Continuidade Familiar: O Conhecimento que Não Pode Morrer" />
        <meta property="og:description" content="Educação botânica para crianças e famílias. Transmita autonomia biológica antes que o conhecimento desapareça." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/continuidade-familiar" />
      </Helmet>
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-purple-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />
      <CinematicHero
        image="/heroes/cp-continuidade-familiar.webp"
        phase="Bloco 05 · Conhecimento Perdido"
        title="Continuidade Familiar"
        subtitle="Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica. O conhecimento que não é transmitido morre em uma geração."
        icon={Users}
        accentColor="teal"
        backLink="/projeto-autonomo/conhecimento-perdido"
        backLabel="Conhecimento Perdido"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">
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
