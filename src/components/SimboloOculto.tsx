import { useCodigoAutonomia, type SimboloId, SIMBOLOS } from '@/hooks/useCodigoAutonomia';
import { Leaf, Flame, Sprout, Shield, Anchor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_MAP: Record<SimboloId, React.ElementType> = {
  folha: Leaf,
  chama: Flame,
  semente: Sprout,
  escudo: Shield,
  raiz: Anchor,
};

interface Props {
  id: SimboloId;
  className?: string;
  size?: number;
}

/**
 * Símbolo oculto do Código de Autonomia.
 * Aparece como um ícone quase invisível. Ao clicar, é "descoberto".
 */
export default function SimboloOculto({ id, className = '', size = 14 }: Props) {
  const { discover, isFound, justFound, dismissJustFound } = useCodigoAutonomia();
  const Icon = ICON_MAP[id];
  const info = SIMBOLOS.find(s => s.id === id)!;
  const alreadyFound = isFound(id);
  const wasJustFound = justFound === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!alreadyFound) {
      discover(id);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center transition-all duration-700 cursor-default group ${className}`}
        style={{ opacity: alreadyFound ? 0.5 : 0.08 }}
        title={alreadyFound ? `${info.nome} — descoberto` : undefined}
        aria-label="elemento decorativo"
      >
        <Icon
          size={size}
          className={`transition-all duration-500 ${
            alreadyFound
              ? 'text-amber-400/60'
              : 'text-current hover:opacity-30 hover:text-amber-400/40 cursor-pointer'
          }`}
        />
      </button>

      {/* Toast de descoberta */}
      <AnimatePresence>
        {wasJustFound && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              setTimeout(dismissJustFound, 3000);
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          >
            <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-amber-500/20 bg-[#0d0f08]/95 backdrop-blur-md shadow-2xl shadow-amber-900/20">
              <Icon size={16} className="text-amber-400" />
              <div>
                <p className="text-amber-300 text-xs font-bold tracking-[0.15em] uppercase">
                  Símbolo descoberto
                </p>
                <p className="text-stone-400 text-[11px] mt-0.5">
                  {info.nome} — {info.descricao}
                </p>
              </div>
              <div className="ml-3 flex gap-1">
                {SIMBOLOS.map(s => (
                  <div
                    key={s.id}
                    className={`w-1.5 h-1.5 rounded-full ${
                      isFound(s.id) || s.id === id ? 'bg-amber-400' : 'bg-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
