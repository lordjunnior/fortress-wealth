import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pre-title"
        >
          SISTEMA OPERACIONAL V1.0
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
        >
          O TRIO DA{" "}
          <span className="text-gradient-gold">BLINDAGEM</span>
          <br />
          PATRIMONIAL.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Alfabetização monetária, ferramentas de autocustódia e estratégias de saída.
          A infraestrutura técnica e intelectual para quem decidiu parar de financiar
          o próprio roubo. Tudo em um único lugar, sem paywalls.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("arsenal")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium tracking-wide text-sm hover:border-gold-dim transition-all duration-300"
          >
            Explorar Biblioteca
          </button>
          <button
            onClick={() => scrollTo("ferramentas")}
            className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold tracking-wide text-sm glow-gold hover:glow-gold-strong transition-all duration-300"
          >
            Acessar Ferramentas
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
