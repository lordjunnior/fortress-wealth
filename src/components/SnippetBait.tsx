import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import snippetImage from '@/assets/card-snippet-bait.jpg';

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
      className="relative my-8 md:my-12"
    >
      <div className="relative rounded-2xl border border-amber-500/20 overflow-hidden bg-card/40 backdrop-blur-md">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent z-10" />

        {/* Grid: text left, image right — balanced 50/50 */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* TEXT COLUMN */}
          <div className="relative p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-5">
            {/* Atmospheric glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="font-mono text-[9px] tracking-[0.3em] text-amber-500/70 uppercase mb-3">
                [ALERTA PATRIMONIAL]
              </p>

              <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                {text}
              </p>

              {cta && href && (
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg 
                    bg-amber-500/10 border border-amber-500/25 
                    hover:bg-amber-500/20 hover:border-amber-400/40 
                    text-amber-400 text-xs font-bold tracking-[0.15em] uppercase 
                    transition-all duration-500 group"
                >
                  {cta}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="relative min-h-[200px] md:min-h-0">
            <img
              src={snippetImage}
              alt="Cédulas brasileiras em chamas — metáfora da inflação"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Fade overlay left for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/20 to-transparent md:block hidden" />
            {/* Fade overlay top for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-transparent to-transparent md:hidden" />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-10" />
      </div>
    </motion.div>
  );
};

export default SnippetBait;
