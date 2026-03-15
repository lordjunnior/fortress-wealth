import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface SnippetBaitProps {
  text: string;
  cta?: string;
  href?: string;
}

const SnippetBait = ({ text, cta = 'Entenda a blindagem →', href = '/autocustodia' }: SnippetBaitProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, ease: APPLE_EASE }}
    className="relative my-8 md:my-12 max-w-3xl mx-auto"
  >
    {/* Gold border glow */}
    <div className="absolute -inset-[1px] rounded-2xl opacity-40" style={{
      background: 'linear-gradient(135deg, rgba(234,179,8,0.4), rgba(245,158,11,0.15) 40%, transparent 60%, rgba(234,179,8,0.3) 90%)',
    }} />

    <div className="relative rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] backdrop-blur-sm px-6 py-5 md:px-8 md:py-6">
      <div className="flex items-start gap-3">
        <Zap size={16} className="text-amber-400 mt-1 flex-shrink-0" />
        <div>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            {text}
          </p>
          {cta && href && (
            <Link
              to={href}
              className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-xs font-bold tracking-[0.1em] uppercase transition-colors"
            >
              {cta}
            </Link>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default SnippetBait;
