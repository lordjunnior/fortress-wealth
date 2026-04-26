import { motion } from 'framer-motion';

/**
 * OrganicLivingBackground — fundo temático persistente para Soberania Orgânica.
 * Camadas:
 *  1. Gradiente radial âmbar/esmeralda muito sutil (vida vegetal).
 *  2. Padrão SVG de folhas em mosaico repetido (opacity 0.05).
 *  3. Esporos animados em deriva lenta (orgânico, sem distrair).
 *  4. Grão fractal quase imperceptível.
 * Tudo fixed inset-0 z-0, pointer-events-none. Performático, sem imagens externas.
 */
export default function OrganicLivingBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Base sólida */}
      <div className="absolute inset-0" style={{ background: '#050808' }} />

      {/* Glows radiais temáticos */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 18% 22%, rgba(16,185,129,0.10) 0%, transparent 65%),' +
            'radial-gradient(ellipse 60% 50% at 82% 78%, rgba(245,158,11,0.07) 0%, transparent 65%),' +
            'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(20,184,166,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Padrão de folhas SVG repetido — mosaico botânico */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'>
              <g fill='none' stroke='%2310b981' stroke-width='1.1' stroke-linecap='round'>
                <path d='M40 60 Q70 30 100 60 Q70 90 40 60 Z' />
                <path d='M70 60 L70 60' />
                <path d='M55 60 Q70 50 85 60' />
                <path d='M55 60 Q70 70 85 60' />
                <path d='M150 130 Q180 100 200 140 Q170 165 150 130 Z' />
                <path d='M165 135 Q180 125 195 140' />
                <path d='M165 135 Q180 145 195 140' />
                <path d='M30 170 Q55 145 80 175 Q55 200 30 170 Z' />
                <path d='M45 173 Q55 165 70 178' />
                <circle cx='130' cy='40' r='2.5' />
                <circle cx='180' cy='200' r='1.8' />
                <circle cx='15' cy='110' r='2' />
              </g>
            </svg>`
          )}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
          mixBlendMode: 'screen',
        }}
      />

      {/* Esporos em deriva ascendente */}
      <style>{`
        @keyframes organicSpore {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-110vh) translateX(60px); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => {
          const size = 2 + Math.random() * 3;
          const left = Math.random() * 100;
          const dur = 35 + Math.random() * 45;
          const delay = Math.random() * 25;
          const isAmber = i % 3 === 0;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: `-${Math.random() * 30}px`,
                background: isAmber ? 'rgba(245,180,90,0.5)' : 'rgba(110,220,170,0.45)',
                boxShadow: isAmber
                  ? '0 0 10px rgba(245,180,90,0.5)'
                  : '0 0 10px rgba(110,220,170,0.45)',
                animation: `organicSpore ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Camada respiratória: pulso muito lento em verde profundo */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Grão fractal */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='og'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23og)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}