import { motion } from 'framer-motion';

/**
 * ChipDustBackground — fundo temático persistente para Engenharia do Vício Alimentar.
 * Evoca pó de tempero/colorante industrial caindo sobre superfície clara/escura.
 * Camadas:
 *  1. Halos amarelo-nuclear / laranja queimado / vermelho pimenta nos cantos.
 *  2. Padrão SVG de partículas/cristais de sal & tempero (mosaico).
 *  3. Pó industrial em queda lenta (amarelo/laranja).
 *  4. Grão fractal sutil.
 * Pensado para conviver com fundo BONE (#f4ede1) das seções claras E ONYX (#0a0a0a) das escuras,
 * por isso usa mix-blend-mode multiply para escurecer no claro e screen para clarear no escuro
 * de forma equilibrada (opacity baixa).
 */
export default function ChipDustBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Halos cromáticos Doritos */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,196,48,0.12) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 45% at 88% 30%, rgba(232,99,28,0.10) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 70% 90%, rgba(200,16,46,0.08) 0%, transparent 65%),' +
            'radial-gradient(ellipse 60% 50% at 25% 85%, rgba(244,196,48,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Padrão de cristais/temperos repetido */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'>
              <g fill='%23e8631c'>
                <polygon points='30,20 36,28 32,38 24,36 22,26' />
                <polygon points='110,50 118,55 116,65 106,66 102,57' />
                <polygon points='150,130 158,138 154,148 144,146 142,135' />
                <polygon points='60,140 66,148 60,156 52,150 54,142' />
                <polygon points='90,90 96,96 92,104 84,102 84,94' />
              </g>
              <g fill='%23f4c430'>
                <circle cx='70' cy='40' r='2.4' />
                <circle cx='140' cy='80' r='2' />
                <circle cx='40' cy='100' r='2.6' />
                <circle cx='160' cy='160' r='1.8' />
                <circle cx='20' cy='160' r='2' />
                <circle cx='130' cy='20' r='1.6' />
              </g>
              <g fill='%23c8102e' opacity='0.6'>
                <circle cx='95' cy='150' r='1.4' />
                <circle cx='15' cy='60' r='1.2' />
                <circle cx='170' cy='110' r='1.3' />
              </g>
            </svg>`
          )}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* Pó industrial caindo */}
      <style>{`
        @keyframes chipDust {
          0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.35; }
          100% { transform: translateY(110vh) translateX(-40px); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => {
          const size = 1.5 + Math.random() * 2.5;
          const left = Math.random() * 100;
          const dur = 28 + Math.random() * 40;
          const delay = Math.random() * 20;
          const tone = i % 3;
          const color =
            tone === 0
              ? 'rgba(244,196,48,0.6)'
              : tone === 1
              ? 'rgba(232,99,28,0.55)'
              : 'rgba(200,16,46,0.45)';
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `-${Math.random() * 20}px`,
                background: color,
                boxShadow: `0 0 8px ${color}`,
                animation: `chipDust ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Pulso quente lento, base */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 60%, rgba(244,196,48,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Grão fractal — textura de pó */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cd'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cd)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}