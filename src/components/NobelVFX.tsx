import React, { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

interface NobelVFXProps {
  accentColor?: 'emerald' | 'amber' | 'purple' | 'teal' | 'orange';
}

const colorMap = {
  emerald: { primary: 'rgba(16,185,129,', secondary: 'rgba(245,158,11,', tertiary: 'rgba(20,184,166,' },
  amber: { primary: 'rgba(245,158,11,', secondary: 'rgba(16,185,129,', tertiary: 'rgba(168,85,247,' },
  purple: { primary: 'rgba(168,85,247,', secondary: 'rgba(16,185,129,', tertiary: 'rgba(245,158,11,' },
  teal: { primary: 'rgba(20,184,166,', secondary: 'rgba(245,158,11,', tertiary: 'rgba(168,85,247,' },
  orange: { primary: 'rgba(255,106,0,', secondary: 'rgba(16,185,129,', tertiary: 'rgba(245,158,11,' },
};

const orbClasses = {
  emerald: 'from-emerald-500/40',
  amber: 'from-amber-500/40',
  purple: 'from-purple-500/40',
  teal: 'from-teal-400/40',
  orange: 'from-orange-500/40',
};

const orbClasses2 = {
  emerald: 'from-amber-500/30',
  amber: 'from-emerald-500/30',
  purple: 'from-emerald-500/30',
  teal: 'from-amber-500/30',
  orange: 'from-emerald-500/30',
};

const orbClasses3 = {
  emerald: 'from-teal-400/20',
  amber: 'from-purple-400/20',
  purple: 'from-amber-400/20',
  teal: 'from-purple-400/20',
  orange: 'from-teal-400/20',
};

const particleClasses = {
  emerald: 'bg-emerald-400/20',
  amber: 'bg-amber-400/20',
  purple: 'bg-purple-400/20',
  teal: 'bg-teal-400/20',
  orange: 'bg-orange-400/20',
};

const gridColor = {
  emerald: 'rgba(16,185,129,0.1)',
  amber: 'rgba(245,158,11,0.1)',
  purple: 'rgba(168,85,247,0.1)',
  teal: 'rgba(20,184,166,0.1)',
  orange: 'rgba(255,106,0,0.1)',
};

export default function NobelVFX({ accentColor = 'emerald' }: NobelVFXProps) {
  const { springX, springY } = useMouseParallax(8);
  const colors = colorMap[accentColor];

  return (
    <>
      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <motion.div className="absolute inset-0 opacity-[0.04]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ background: `linear-gradient(125deg, transparent 20%, ${colors.primary}0.12) 35%, transparent 50%, ${colors.secondary}0.08) 65%, transparent 80%)`, backgroundSize: '300% 300%' }} />
        <motion.div className="absolute inset-0 opacity-[0.03]"
          animate={{ backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ background: `linear-gradient(225deg, transparent 30%, ${colors.primary}0.08) 45%, transparent 60%, ${colors.tertiary}0.06) 75%, transparent 90%)`, backgroundSize: '400% 400%' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: `linear-gradient(${gridColor[accentColor]} 1px, transparent 1px), linear-gradient(90deg, ${gridColor[accentColor]} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[10%] left-[8%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className={`w-full h-full rounded-full bg-gradient-radial ${orbClasses[accentColor]} to-transparent blur-3xl`} />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[15%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          animate={{ scale: [1.1, 0.95, 1.1], rotate: [0, -3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
          <div className={`w-full h-full rounded-full bg-gradient-radial ${orbClasses2[accentColor]} to-transparent blur-3xl`} />
        </motion.div>
        <motion.div
          className="absolute top-[50%] left-[50%] w-[700px] h-[700px] rounded-full opacity-[0.025]"
          animate={{ scale: [0.9, 1.1, 0.9], x: [-50, 50, -50], y: [-30, 30, -30] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}>
          <div className={`w-full h-full rounded-full bg-gradient-radial ${orbClasses3[accentColor]} to-transparent blur-3xl`} />
        </motion.div>
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className={`absolute w-1 h-1 rounded-full ${particleClasses[accentColor]}`}
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}
      </div>
    </>
  );
}

export { useMouseParallax };
