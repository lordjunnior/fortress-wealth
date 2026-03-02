import { useCodigoAutonomia, SIMBOLOS } from '@/hooks/useCodigoAutonomia';
import { Leaf, Flame, Sprout, Shield, Anchor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SimboloId } from '@/hooks/useCodigoAutonomia';

const ICON_MAP: Record<SimboloId, React.ElementType> = {
  folha: Leaf,
  chama: Flame,
  semente: Sprout,
  escudo: Shield,
  raiz: Anchor,
};

export default function CodigoAutonomiaModal() {
  const { showUnlock, dismissUnlock } = useCodigoAutonomia();

  return (
    <AnimatePresence>
      {showUnlock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={dismissUnlock}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-md w-full rounded-2xl border border-amber-500/20 bg-[#0a0d08]/98 p-10 text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={dismissUnlock}
              className="absolute top-4 right-4 text-stone-600 hover:text-stone-400 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Symbols row */}
            <div className="flex justify-center gap-4 mb-8">
              {SIMBOLOS.map((s, i) => {
                const Icon = ICON_MAP[s.id];
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Icon size={18} className="text-amber-400" />
                    </div>
                    <span className="text-[9px] text-stone-600 font-bold tracking-[0.2em] uppercase">{s.nome}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-amber-500/50 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
                Código de Autonomia
              </p>
              <h2
                className="text-2xl md:text-3xl font-extrabold text-stone-100 tracking-wide uppercase mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}
              >
                DESBLOQUEADO
              </h2>

              <div className="space-y-4 text-stone-400 text-sm leading-relaxed">
                <p>
                  Você encontrou os cinco símbolos. Poucos chegam até aqui.
                </p>
                <p className="text-stone-300 font-medium">
                  Quem presta atenção ao que é sutil, entende o que é fundamental.
                </p>
                <p>
                  Autonomia não se ensina — se reconhece.
                  Você demonstrou que observa além da superfície.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800">
                <p className="font-mono text-[10px] text-amber-500/40 tracking-[0.3em] uppercase">
                  Independência começa pela atenção
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
