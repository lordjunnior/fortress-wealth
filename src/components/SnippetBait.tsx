import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface SnippetBaitProps {
  text: string;
  cta?: string;
  href?: string;
}

const SnippetBait = ({ text, cta = 'Entenda a blindagem →', href = '/autocustodia' }: SnippetBaitProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: APPLE_EASE }}
      className="relative my-8 md:my-12 max-w-3xl mx-auto group"
    >
      {/* Outer glow layer */}
      <div className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.15), transparent 70%)' }}
      />

      {/* Animated border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(245,158,11,0.5) 10%, transparent 20%, transparent 50%, rgba(245,158,11,0.3) 60%, transparent 70%)',
            animation: 'spin 8s linear infinite',
          }}
        />
      </div>

      {/* Inner card */}
      <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 via-amber-900/10 to-background/80 backdrop-blur-md overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        {/* Atmospheric glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

        <div className="relative px-6 py-6 md:px-8 md:py-7">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-[ping_4s_ease-in-out_infinite]" />
              <div className="relative w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Zap size={16} className="text-amber-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-mono text-[9px] tracking-[0.3em] text-amber-500/70 uppercase mb-2">
                [ALERTA PATRIMONIAL]
              </p>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed font-medium">
                {text}
              </p>
              {cta && href && (
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg 
                    bg-amber-500/10 border border-amber-500/25 
                    hover:bg-amber-500/20 hover:border-amber-400/40 
                    text-amber-400 text-xs font-bold tracking-[0.15em] uppercase 
                    transition-all duration-500 group/cta"
                >
                  {cta}
                  <ArrowRight size={13} className="transition-transform group-hover/cta:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default SnippetBait;
