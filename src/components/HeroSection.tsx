import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const wordReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
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

  const line1Words = ["Seu", "dinheiro", "está"];
  const line2Words = ["A", "culpa", "não", "é", "do"];

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-mono text-[10px] md:text-xs uppercase text-muted-foreground mb-8 tracking-[0.3em]"
        >
          CENTRO DE COMANDO DA SOBERANIA
        </motion.p>

        {/* Line 1 */}
        <motion.h1
          variants={wordReveal}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {line1Words.map((word, i) => (
            <motion.span key={i} variants={wordChild} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={wordChild}
            className="inline-block text-chart-red"
            style={{ textShadow: "0 0 40px hsl(0 72% 51% / 0.3)" }}
          >
            derretendo
          </motion.span>
          <motion.span variants={wordChild} className="inline-block text-chart-red">.</motion.span>
        </motion.h1>

        {/* Line 2 */}
        <motion.h1
          variants={wordReveal}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif", transitionDelay: "0.4s" }}
        >
          {line2Words.map((word, i) => (
            <motion.span key={i} variants={wordChild} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={wordChild}
            className="inline-block text-gradient-gold"
          >
            acaso
          </motion.span>
          <motion.span variants={wordChild} className="inline-block text-gradient-gold">.</motion.span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[2px] mx-auto mb-8 origin-left"
          style={{ background: "hsl(var(--gold))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Alfabetização monetária, ferramentas de autocustódia e estratégias de saída.
          A infraestrutura técnica e intelectual para quem decidiu parar de financiar
          o próprio roubo.
        </motion.p>

        {/* Action Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo("manifesto")}
            className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold tracking-wide text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{ boxShadow: "0 10px 30px rgba(247, 147, 26, 0.3)" }}
          >
            Comece por aqui
          </button>
          <button
            onClick={() => scrollTo("ferramentas")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium tracking-wide text-sm hover:border-gold-dim transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Usar aplicativos
          </button>
          <button
            onClick={() => scrollTo("educacao")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium tracking-wide text-sm hover:border-gold-dim transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Explorar leituras
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
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
                  className="w-8 h-8 rounded-full border-2 border-[#070A12] object-cover grayscale"
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
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
