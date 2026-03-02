import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';

const TIMELINE = [
  {
    year: '~1500 a.C.',
    title: 'Papiro de Ebers',
    desc: 'Primeiro registro farmacológico conhecido. 700 fórmulas com plantas medicinais documentadas no Egito Antigo.',
    accent: 'amber',
  },
  {
    year: '~400 a.C.',
    title: 'Corpus Hippocraticum',
    desc: 'Hipócrates cataloga mais de 400 substâncias de origem vegetal. Nasce a farmacologia ocidental.',
    accent: 'amber',
  },
  {
    year: '77 d.C.',
    title: 'De Materia Medica',
    desc: 'Dioscórides documenta 600 plantas medicinais. Referência por 1.500 anos, sem ser superada.',
    accent: 'amber',
  },
  {
    year: 'Séc. X–XV',
    title: 'Tradição Oral e Monástica',
    desc: 'Mosteiros preservam o conhecimento. Curandeiras e parteiras transmitem saberes por via oral nas comunidades rurais.',
    accent: 'green',
  },
  {
    year: '1760–1840',
    title: 'Revolução Industrial',
    desc: 'Migração massiva para as cidades. Ruptura com ciclos agrícolas, perda de acesso a plantas e jardins medicinais.',
    accent: 'red',
  },
  {
    year: '1910',
    title: 'Relatório Flexner',
    desc: 'Padronização da medicina nos EUA. Escolas de fitoterapia e homeopatia fechadas. Início da marginalização institucional do saber tradicional.',
    accent: 'red',
  },
  {
    year: '1950–1980',
    title: 'Urbanização Acelerada',
    desc: 'Êxodo rural no Brasil. Avós que sabiam identificar 50 plantas criaram netos que não reconhecem 5. Transmissão oral interrompida.',
    accent: 'red',
  },
  {
    year: '2000+',
    title: 'Reconexão Contemporânea',
    desc: 'Etnobotânica, fitoterápicos regulamentados (ANVISA), e uma nova geração que busca autonomia — não por moda, mas por necessidade.',
    accent: 'emerald',
  },
];

const accentColors: Record<string, { dot: string; line: string; text: string; bg: string }> = {
  amber: { dot: 'bg-amber-400', line: 'border-amber-500/30', text: 'text-amber-300', bg: 'bg-amber-500/8' },
  green: { dot: 'bg-green-400', line: 'border-green-500/30', text: 'text-green-300', bg: 'bg-green-500/8' },
  red: { dot: 'bg-red-400', line: 'border-red-500/30', text: 'text-red-300', bg: 'bg-red-500/8' },
  emerald: { dot: 'bg-emerald-400', line: 'border-emerald-500/30', text: 'text-emerald-300', bg: 'bg-emerald-500/8' },
};

export default function LinhaDoTempoOculta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger — data antiga discreta */}
      <button
        onClick={() => setOpen(true)}
        className="text-stone-700 hover:text-amber-500/60 text-[10px] font-mono tracking-widest transition-colors duration-700 cursor-default"
        title=""
        aria-label="elemento decorativo"
      >
        1500 a.C.
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-amber-500/15 bg-[#0d0b08]/98 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-[#0d0b08]/95 backdrop-blur-sm border-b border-amber-800/20 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-amber-400/60" />
                  <div>
                    <p className="text-amber-500/50 text-[9px] font-bold tracking-[0.4em] uppercase">Linha do tempo</p>
                    <h3 className="text-stone-200 text-sm font-bold tracking-wide">A Ruptura do Saber</h3>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-stone-600 hover:text-stone-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="px-8 py-8">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/30 via-red-500/20 to-emerald-500/30" />

                  <div className="space-y-8">
                    {TIMELINE.map((item, i) => {
                      const c = accentColors[item.accent];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                          className="flex gap-5 items-start"
                        >
                          <div className={`w-[15px] h-[15px] rounded-full ${c.dot} flex-shrink-0 mt-1 shadow-lg`}
                            style={{ boxShadow: `0 0 12px ${item.accent === 'red' ? 'rgba(239,68,68,0.3)' : item.accent === 'emerald' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}
                          />
                          <div className={`flex-1 ${c.bg} border ${c.line} rounded-xl p-4`}>
                            <span className={`${c.text} text-[10px] font-bold tracking-[0.3em] uppercase font-mono`}>
                              {item.year}
                            </span>
                            <h4 className="text-stone-200 text-sm font-bold mt-1 mb-1.5">{item.title}</h4>
                            <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-stone-800/50 text-center">
                  <p className="text-stone-600 text-[10px] font-mono tracking-[0.2em] uppercase">
                    O conhecimento que não é transmitido morre em uma geração
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
