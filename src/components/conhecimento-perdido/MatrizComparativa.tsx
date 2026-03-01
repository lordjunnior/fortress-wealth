import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { MATRIZ_DADOS } from './PlantData';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const termicoColor: Record<string, string> = {
  Aquecedora: 'text-red-400 bg-red-500/10',
  Refrescante: 'text-cyan-400 bg-cyan-500/10',
  Neutra: 'text-stone-400 bg-stone-500/10',
};

export function MatrizComparativa() {
  return (
    <motion.section
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
      className="mb-28"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Visão Sistêmica</span>
        <div className="flex-1 h-px bg-emerald-800/30" />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className="text-emerald-400" size={22} />
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 leading-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          MATRIZ <span className="text-emerald-400">COMPARATIVA</span>
        </h2>
      </div>
      <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
        Visão panorâmica das 12 plantas por sistema, compostos, aplicação pontual, restrições e perfil térmico. 
        Use como referência rápida antes de consultar a ficha completa.
      </p>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-emerald-800/25 bg-[#0f1a0f]/60 backdrop-blur-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-emerald-800/30">
              {['Planta', 'Sistema', 'Compostos Principais', 'Uso Pontual', 'Evitar Em', 'Térmico'].map(h => (
                <th key={h} className="px-4 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIZ_DADOS.map((row, i) => (
              <tr key={row.planta} className={`border-b border-white/5 hover:bg-emerald-500/5 transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                <td className="px-4 py-3 text-sm font-bold text-stone-200">{row.planta}</td>
                <td className="px-4 py-3 text-xs text-stone-400">{row.sistema}</td>
                <td className="px-4 py-3 text-xs text-stone-400 font-mono">{row.compostosPrincipais}</td>
                <td className="px-4 py-3 text-xs text-stone-300">{row.usoPontual}</td>
                <td className="px-4 py-3 text-xs text-red-400/80">{row.evitarEm}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${termicoColor[row.termico]}`}>
                    {row.termico}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {MATRIZ_DADOS.map(row => (
          <div key={row.planta} className="bg-[#0f1a0f]/60 border border-emerald-800/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-stone-200">{row.planta}</h4>
              <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${termicoColor[row.termico]}`}>
                {row.termico}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-stone-400"><span className="text-stone-500 font-semibold">Sistema:</span> {row.sistema}</p>
              <p className="text-stone-400"><span className="text-stone-500 font-semibold">Compostos:</span> <span className="font-mono">{row.compostosPrincipais}</span></p>
              <p className="text-stone-300"><span className="text-stone-500 font-semibold">Uso pontual:</span> {row.usoPontual}</p>
              <p className="text-red-400/80"><span className="text-red-500/60 font-semibold">Evitar em:</span> {row.evitarEm}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
