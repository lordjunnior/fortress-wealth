import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Activity, XCircle, FlaskConical, Beaker, Thermometer, Clock, Ban, Zap } from 'lucide-react';
import type { PlantaFicha } from './PlantData';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const termicoLabel = {
  aquecedora: { label: 'AQUECEDORA', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  refrescante: { label: 'REFRESCANTE', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  neutra: { label: 'NEUTRA', color: 'text-stone-400 bg-stone-500/10 border-stone-500/20' },
};

export function FichaPlanta({ planta }: { planta: PlantaFicha }) {
  const termico = termicoLabel[planta.impactoTermico];

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp} custom={0}
      className={`bg-[#0f1a0f]/60 backdrop-blur-md border ${planta.border} rounded-xl p-6 md:p-8 hover:border-emerald-500/40 transition-all duration-500 group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className={`text-xl md:text-2xl font-black tracking-tight ${planta.accent}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{planta.nome}</h4>
          <p className="text-stone-500 text-xs italic font-mono">{planta.cientifico}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[9px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            {planta.parteUsada}
          </span>
          <span className={`text-[8px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${termico.color}`}>
            {termico.label}
          </span>
        </div>
      </div>

      {/* O que melhora */}
      <div className="mb-5">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2">O que melhora no corpo</p>
        <div className="flex flex-wrap gap-1.5">
          {planta.melhora.map(m => (
            <span key={m} className="text-xs bg-white/5 border border-white/10 text-stone-300 px-2.5 py-1 rounded-md">{m}</span>
          ))}
        </div>
      </div>

      {/* Como age */}
      <div className="mb-5">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-1.5">Como age</p>
        <p className="text-stone-300 text-sm leading-relaxed">{planta.comoAge}</p>
      </div>

      {/* ─── NOVOS CAMPOS BIOQUÍMICOS ─── */}

      {/* Compostos ativos */}
      <div className="mb-5 bg-emerald-950/30 border border-emerald-800/15 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Beaker size={13} className="text-emerald-500" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">Compostos ativos</p>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">{planta.compostos}</p>
      </div>

      {/* Sinergias */}
      <div className="mb-5 bg-amber-950/20 border border-amber-800/15 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Zap size={13} className="text-amber-400" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400">Sinergias conhecidas</p>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">{planta.sinergias}</p>
      </div>

      {/* Fresco vs Seco + Impacto Térmico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-[#111a11]/80 border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <FlaskConical size={13} className="text-stone-400" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">Fresco vs Seco</p>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed">{planta.frescoVsSeco}</p>
        </div>
        <div className="bg-[#111a11]/80 border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Thermometer size={13} className={planta.impactoTermico === 'aquecedora' ? 'text-red-400' : planta.impactoTermico === 'refrescante' ? 'text-cyan-400' : 'text-stone-400'} />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">Impacto térmico</p>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed">{planta.impactoTermicoDesc}</p>
        </div>
      </div>

      {/* Preparo & Faixa Segura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-emerald-950/40 border border-emerald-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <FlaskConical size={13} className="text-emerald-500" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">Preparo</p>
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">{planta.preparo}</p>
        </div>
        <div className="bg-emerald-950/40 border border-emerald-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Shield size={13} className="text-emerald-500" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">Faixa segura</p>
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">{planta.faixaSegura}</p>
        </div>
      </div>

      {/* Risco crônico */}
      <div className="mb-5 bg-orange-950/20 border border-orange-800/15 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Clock size={13} className="text-orange-400" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-400">Risco de uso crônico</p>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">{planta.riscoCronico}</p>
      </div>

      {/* Quando NÃO usar como primeira opção */}
      <div className="mb-5 bg-red-950/15 border border-red-800/15 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Ban size={13} className="text-red-400" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-400">Quando NÃO é primeira opção</p>
        </div>
        <p className="text-stone-300 text-xs leading-relaxed">{planta.naoUsarPrimeiro}</p>
      </div>

      {/* Contra & Interações & Suspensão */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <XCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-400"><span className="text-red-400 font-semibold">Contraindicações:</span> {planta.contra}</p>
        </div>
        {planta.interacoes && (
          <div className="flex items-start gap-2">
            <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-400"><span className="text-amber-400 font-semibold">Interações:</span> {planta.interacoes}</p>
          </div>
        )}
        <div className="flex items-start gap-2">
          <Activity size={13} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-400"><span className="text-orange-400 font-semibold">Suspender se:</span> {planta.suspensao}</p>
        </div>
      </div>
    </motion.div>
  );
}
