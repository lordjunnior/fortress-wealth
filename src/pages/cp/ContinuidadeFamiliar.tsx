import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Leaf, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { EducacaoBotanica } from '@/components/conhecimento-perdido/EducacaoBotanica';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function ContinuidadeFamiliar() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
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
          <span className="text-purple-400">Continuidade Familiar</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/25">
              <Users className="text-purple-400" size={22} />
            </div>
            <span className="text-purple-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 05 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            CONTINUIDADE <span className="text-purple-400">FAMILIAR</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica. 
            O conhecimento que não é transmitido morre em uma geração — este bloco garante que isso não aconteça.
          </p>
        </motion.header>

        {/* ─── CONTEXTO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-purple-950/20 border border-purple-700/20 rounded-2xl p-8 md:p-12">
            <div className="space-y-5 text-stone-400 text-base leading-relaxed max-w-3xl">
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
                <span className="text-stone-200 font-semibold"> não depender exclusivamente de um sistema que pode falhar</span>. 
                De ter autonomia para cuidar do básico. De reconhecer que o conhecimento que sustentou famílias por séculos 
                não é "ultrapassado" — é fundamento.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── EDUCAÇÃO BOTÂNICA EXPANDIDA ─── */}
        <EducacaoBotanica />

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4 mt-20">
          <Link to="/conhecimento-perdido/aplicacao-pratica"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Aplicação Prática
          </Link>
          <Link to="/projeto-autonomo/conhecimento-perdido"
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-xl px-6 py-4 text-purple-300 text-sm font-bold hover:bg-purple-600/30 transition-all group">
            Voltar ao Hub <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
