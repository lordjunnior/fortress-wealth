import { motion } from 'framer-motion';

/**
 * SmokeBackground — fumaça atmosférica em loop infinito.
 * Performático: SVG turbulence + 3 camadas de gradientes radiais animadas via CSS transforms.
 * Sutil o suficiente para não distrair leitura, presente o suficiente para reforçar o tema "tóxicos".
 */
export default function SmokeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* SVG turbulence filter — reusable */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="smoke-turb" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3">
              <animate attributeName="baseFrequency" dur="60s" values="0.012;0.018;0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="80" />
          </filter>
        </defs>
      </svg>

      {/* Camada 1 — fumaça baixa, deriva para a direita */}
      <motion.div
        className="absolute -inset-[20%] opacity-[0.28]"
        animate={{ x: ['-5%', '5%', '-5%'], y: ['0%', '-3%', '0%'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 80%, rgba(180,180,190,0.85), transparent 60%), radial-gradient(ellipse 50% 35% at 70% 75%, rgba(160,150,150,0.7), transparent 60%)',
          filter: 'url(#smoke-turb) blur(20px)',
        }}
      />

      {/* Camada 2 — fumaça média, deriva oposta */}
      <motion.div
        className="absolute -inset-[20%] opacity-[0.22]"
        animate={{ x: ['3%', '-4%', '3%'], y: ['-2%', '2%', '-2%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,190,185,0.75), transparent 65%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(170,160,160,0.65), transparent 60%)',
          filter: 'url(#smoke-turb) blur(30px)',
        }}
      />

      {/* Camada 3 — fumaça alta, lenta */}
      <motion.div
        className="absolute -inset-[20%] opacity-[0.18]"
        animate={{ x: ['-2%', '4%', '-2%'], y: ['1%', '-2%', '1%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(210,200,195,0.7), transparent 70%)',
          filter: 'url(#smoke-turb) blur(40px)',
        }}
      />

      {/* Tint vermelho discreto na base — reforço temático */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(239,68,68,0.5), transparent 70%)',
        }}
      />
    </div>
  );
}