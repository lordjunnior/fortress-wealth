import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Flame, Wind, Shield, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import imgSistemas from '@/assets/cp-sistemas-corpo.jpg';
import imgPlantas from '@/assets/cp-plantas-pratica.jpg';

import { DIGESTIVO, RESPIRATORIO, NERVOSO, IMUNE, MUSCULAR } from '@/components/conhecimento-perdido/PlantData';
import { SistemaSection } from '@/components/conhecimento-perdido/SistemaSection';
import { MatrizComparativa } from '@/components/conhecimento-perdido/MatrizComparativa';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function BaseFisiologica() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] right-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap">
          <Link to="/" className="text-stone-600 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo" className="text-stone-600 hover:text-emerald-400 transition-colors">Projeto Autônomo</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo/conhecimento-perdido" className="text-stone-600 hover:text-emerald-400 transition-colors">Conhecimento Perdido</Link>
          <span className="text-stone-700">/</span>
          <span className="text-cyan-400">Base Fisiológica</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/25">
              <Brain className="text-cyan-400" size={22} />
            </div>
            <span className="text-cyan-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 02 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            BASE <span className="text-cyan-400">FISIOLÓGICA</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Organização técnica por sistemas corporais, mecanismos bioquímicos e resposta adaptativa do organismo. 
            Flavonoides, alcaloides, terpenos e compostos fenólicos aplicados — não em teoria, mas em fichas técnicas completas.
          </p>
        </motion.header>

        {/* ─── MAPA DOS SISTEMAS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgSistemas} alt="Os 5 sistemas fisiológicos" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex flex-wrap gap-2">
                {['Digestivo', 'Respiratório', 'Nervoso', 'Imune', 'Muscular'].map(s => (
                  <span key={s} className="text-[10px] font-bold tracking-widest uppercase bg-cyan-500/15 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-700/20 rounded-2xl p-8 md:p-12 mb-14">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-4">
              Flavonoides reduzem estresse oxidativo. Compostos amargos estimulam o fígado. 
              Fibras modulam microbiota intestinal. Óleos essenciais possuem ação antimicrobiana. 
              <span className="text-cyan-400 font-semibold"> Nada aqui é crença — é bioquímica aplicada.</span>
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Cada planta documentada abaixo atua em vias bioquímicas específicas, com mecanismo de ação identificado, 
              compostos ativos listados e dosagens conservadoras baseadas em farmacopeias reconhecidas.
            </p>
          </div>
        </motion.section>

        {/* ─── FICHAS POR SISTEMA ─── */}
        <div className="mb-28">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgPlantas} alt="Plantas medicinais na prática" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
          </div>

          <SistemaSection titulo="DIGESTIVO" subtitulo="Bile, motilidade intestinal e proteção da mucosa gástrica." icon={Flame} plantas={DIGESTIVO} accentColor="green" index={1} />
          <SistemaSection titulo="RESPIRATÓRIO" subtitulo="Broncodilatação, fluidificação de muco e ação antimicrobiana leve." icon={Wind} plantas={RESPIRATORIO} accentColor="cyan" index={2} />
          <SistemaSection titulo="NERVOSO" subtitulo="Modulação GABA, relaxamento e qualidade do sono." icon={Brain} plantas={NERVOSO} accentColor="purple" index={3} />
          <SistemaSection titulo="IMUNE" subtitulo="Modulação da resposta imune, ação antimicrobiana e anti-inflamatória." icon={Shield} plantas={IMUNE} accentColor="amber" index={4} />
          <SistemaSection titulo="MUSCULAR & INFLAMATÓRIO" subtitulo="Circulação local, cicatrização e redução da inflamação tópica." icon={Heart} plantas={MUSCULAR} accentColor="orange" index={5} />
        </div>

        {/* ─── MATRIZ COMPARATIVA ─── */}
        <MatrizComparativa />

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4 mt-20">
          <Link to="/conhecimento-perdido/contexto-historico"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Contexto Histórico
          </Link>
          <Link to="/conhecimento-perdido/seguranca-e-limites"
            className="flex-1 flex items-center justify-center gap-2 bg-cyan-600/20 border border-cyan-500/30 rounded-xl px-6 py-4 text-cyan-300 text-sm font-bold hover:bg-cyan-600/30 transition-all group">
            Próximo: Segurança e Limites <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
