import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, XCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { CriteriosUso } from '@/components/conhecimento-perdido/CriteriosUso';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function SegurancaLimites() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] left-[8%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
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
          <span className="text-amber-400">Segurança e Limites</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/25">
              <Shield className="text-amber-400" size={22} />
            </div>
            <span className="text-amber-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 03 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            SEGURANÇA E <span className="text-amber-400">LIMITES</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Critérios de uso responsável, contraindicações documentadas, interações medicamentosas conhecidas 
            e parâmetros claros de suspensão. Sem essa base, não existe credibilidade — e sem credibilidade, não existe autoridade.
          </p>
        </motion.header>

        {/* ─── CRITÉRIOS DE USO RESPONSÁVEL ─── */}
        <CriteriosUso />

        {/* ─── QUANDO NÃO USAR ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-red-950/30 border border-red-800/25 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-red-400" />
              <h3 className="text-sm font-bold text-red-300 uppercase tracking-wider">Quando NÃO usar fitoterapia sozinha</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                'Febre persistente > 38,5°C', 'Sintomas que pioram após 48h',
                'Dor intensa ou localizada', 'Confusão mental ou prostração',
                'Sangramento inesperado', 'Gestante ou lactante sem orientação',
                'Criança < 2 anos', 'Uso de medicação contínua',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/15 p-2.5 rounded-lg">
                  <XCircle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 italic">Em qualquer dessas situações, busque atendimento médico profissional.</p>
          </div>
        </motion.section>

        {/* ─── BLOCO DE RESPONSABILIDADE ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-amber-950/20 border border-amber-700/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-lg font-bold text-stone-200 mb-6">A linha entre remédio e veneno</h2>
            <div className="space-y-5 text-stone-400 text-base leading-relaxed max-w-3xl">
              <p>
                Arnica causa parada cardíaca se ingerida. Boldo destrói o fígado em uso prolongado. 
                Mulungu derruba a pressão de quem já toma medicação anti-hipertensiva. 
                Confrei causa doença veno-oclusiva hepática.
              </p>
              <p>
                Nenhuma planta é inofensiva por ser natural. A diferença entre remédio e veneno é 
                <span className="text-amber-400 font-semibold"> dose, via de uso, tempo de administração e contexto individual</span>. 
                Este bloco existe para documentar exatamente esses limites — faixa segura de uso, contraindicações absolutas e relativas, 
                interações medicamentosas catalogadas, duração máxima recomendada e sinais objetivos para suspensão imediata.
              </p>
              <p>
                Cada ficha técnica deste ecossistema inclui esses parâmetros. Se uma planta não tem contraindicação listada, 
                não é porque ela é segura — é porque não foi documentada adequadamente. E material não documentado não entra aqui.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/conhecimento-perdido/base-fisiologica"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Base Fisiológica
          </Link>
          <Link to="/conhecimento-perdido/aplicacao-pratica"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-xl px-6 py-4 text-amber-300 text-sm font-bold hover:bg-amber-600/30 transition-all group">
            Próximo: Aplicação Prática <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
