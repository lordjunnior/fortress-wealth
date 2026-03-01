import React from 'react';
import { motion } from 'framer-motion';
import { FichaPlanta } from './FichaPlanta';
import type { PlantaFicha } from './PlantData';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

interface Props {
  titulo: string;
  subtitulo: string;
  icon: React.ElementType;
  plantas: PlantaFicha[];
  accentColor: string;
  index: number;
}

export function SistemaSection({ titulo, subtitulo, icon: Icon, plantas, accentColor, index }: Props) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
      className="mb-20"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-xl bg-${accentColor}-500/10 border border-${accentColor}-500/20`}>
          <Icon className={`text-${accentColor}-400`} size={22} />
        </div>
        <div>
          <span className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase">Sistema {String(index).padStart(2, '0')}</span>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-stone-200" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {titulo}
          </h3>
        </div>
      </div>
      <p className="text-stone-500 text-sm mb-8 ml-16">{subtitulo}</p>

      <div className="space-y-8">
        {plantas.map(p => <FichaPlanta key={p.nome} planta={p} />)}
      </div>
    </motion.div>
  );
}
