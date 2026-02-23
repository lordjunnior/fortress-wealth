import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ease } from "@/lib/motion";

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HeroSection = () => {
  const [seedOffset, setSeedOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeedOffset((prev) => prev + 5);
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .hero-shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--gold)) 0%,
            hsl(40 80% 70%) 40%,
            hsl(0 0% 100%) 50%,
            hsl(40 80% 70%) 60%,
            hsl(var(--gold)) 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, ease: ease.sovereign }}
          className="font-mono text-[10px] md:text-xs uppercase text-muted-foreground mb-10 tracking-[0.3em]"
        >
          CENTRO DE COMANDO DA SOBERANIA
        </motion.p>

        {/* Hero Headline — Bebas Neue */}
        <div className="leading-[0.95] mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
          <motion.span
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block text-[clamp(3.5rem,10vw,9rem)] text-ice-white"
          >
            SEU DINHEIRO ESTÁ
          </motion.span>
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block text-[clamp(3.5rem,10vw,9rem)] text-chart-red"
            style={{ textShadow: "0 0 30px hsl(0 72% 51% / 0.7), 0 0 60px hsl(0 72% 51% / 0.3)" }}
          >
            DERRETENDO.
          </motion.span>
          <motion.span
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block text-[clamp(3.5rem,10vw,9rem)] text-ice-white"
          >
            A CULPA NÃO É DO
          </motion.span>
          <motion.span
            custom={3}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block text-[clamp(3.5rem,10vw,9rem)] hero-shimmer"
          >
            ACASO.
          </motion.span>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: ease.smooth }}
          className="w-16 h-[1.5px] mx-auto mb-8 origin-left"
          style={{ background: "hsl(var(--gold) / 0.6)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: ease.sovereign }}
          className="font-display text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        >
          Alfabetização monetária, ferramentas de autocustódia e estratégias de saída.
          A infraestrutura técnica e intelectual para quem decidiu parar de financiar
          o próprio roubo.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: ease.sovereign }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button onClick={() => scrollTo("manifesto")} className="btn-primary">
            Comece por aqui
          </button>
          <button onClick={() => scrollTo("ferramentas")} className="btn-secondary">
            Usar aplicativos
          </button>
          <button onClick={() => scrollTo("educacao")} className="btn-secondary">
            Explorar leituras
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            <AnimatePresence mode="wait">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.img
                  key={`${i}-${seedOffset}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  src={`https://i.pravatar.cc/100?u=${i + seedOffset}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-background object-cover grayscale"
                />
              ))}
            </AnimatePresence>
          </div>
          <p className="text-sm text-muted-foreground">
            Junte-se a <span className="text-foreground font-semibold">2.400+</span> soberanos que já baixaram.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
