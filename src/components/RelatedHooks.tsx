import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RelatedHook {
  titulo: string;
  descricao: string;
  rota: string;
  selo?: string;
}

interface Props {
  titulo?: string;
  subtitulo?: string;
  hooks: RelatedHook[];
  /** Tema visual: 'light' (fundo claro) ou 'dark' (fundo escuro). Default: 'light' */
  tema?: 'light' | 'dark';
}

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const RelatedHooks = ({
  titulo = 'Continue a jornada',
  subtitulo = 'Estes módulos se conectam diretamente com o que você acabou de ler',
  hooks,
  tema = 'light',
}: Props) => {
  const isDark = tema === 'dark';

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-12"
      style={{
        backgroundColor: isDark ? 'hsl(28 18% 12%)' : 'hsl(36 30% 92%)',
        backgroundImage: isDark
          ? 'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(18 62% 42% / 0.18), transparent 55%), radial-gradient(ellipse 55% 45% at 88% 82%, hsl(40 50% 50% / 0.12), transparent 55%)'
          : 'radial-gradient(ellipse 65% 55% at 6% 14%, hsl(28 60% 82% / 0.5), transparent 55%), radial-gradient(ellipse 55% 45% at 92% 86%, hsl(22 52% 38% / 0.18), transparent 55%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: APPLE_EASE }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <p
            className="text-[11px] tracking-[0.32em] uppercase mb-4 font-medium"
            style={{ color: isDark ? 'hsl(28 60% 70%)' : 'hsl(18 62% 42%)' }}
          >
            Trilha conectada
          </p>
          <h2
            className="font-black tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: 1.05,
              color: isDark ? 'hsl(36 30% 92%)' : 'hsl(28 32% 14%)',
              fontFamily: '"Inter Tight", system-ui, sans-serif',
              fontWeight: 900,
            }}
          >
            {titulo}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: isDark ? 'hsl(28 14% 70%)' : 'hsl(28 18% 36%)' }}
          >
            {subtitulo}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {hooks.map((hook, i) => (
            <motion.div
              key={hook.rota}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: APPLE_EASE, delay: i * 0.06 }}
            >
              <Link
                to={hook.rota}
                className="group block h-full p-7 md:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: isDark
                    ? 'hsl(28 18% 16% / 0.6)'
                    : 'hsl(36 30% 96% / 0.7)',
                  borderColor: isDark
                    ? 'hsl(28 18% 28%)'
                    : 'hsl(28 14% 78%)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  {hook.selo ? (
                    <span
                      className="text-[10px] tracking-[0.28em] uppercase px-2.5 py-1 rounded font-semibold"
                      style={{
                        color: isDark ? 'hsl(36 30% 92%)' : 'hsl(28 32% 14%)',
                        backgroundColor: isDark
                          ? 'hsl(18 62% 42% / 0.25)'
                          : 'hsl(28 60% 82% / 0.6)',
                      }}
                    >
                      {hook.selo}
                    </span>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRight
                    className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45"
                    style={{ color: isDark ? 'hsl(28 60% 70%)' : 'hsl(18 62% 42%)' }}
                  />
                </div>
                <h3
                  className="font-bold mb-3 leading-tight"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                    color: isDark ? 'hsl(36 30% 94%)' : 'hsl(28 32% 14%)',
                    fontFamily: '"Inter Tight", system-ui, sans-serif',
                  }}
                >
                  {hook.titulo}
                </h3>
                <p
                  className="text-sm md:text-[15px] leading-relaxed"
                  style={{ color: isDark ? 'hsl(28 14% 68%)' : 'hsl(28 18% 36%)' }}
                >
                  {hook.descricao}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedHooks;