import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const avatars = [
  "bg-amber-700", "bg-amber-800", "bg-amber-600", "bg-amber-900", "bg-amber-500",
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pre-title mb-6"
        >
          CENTRO DE COMANDO DA SOBERANIA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Seu dinheiro está{" "}
          <span className="text-chart-red">derretendo</span>.
          <br />
          A culpa não é do{" "}
          <span className="text-gradient-gold">acaso</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Alfabetização monetária, ferramentas de autocustódia e estratégias de saída.
          A infraestrutura técnica e intelectual para quem decidiu parar de financiar
          o próprio roubo.
        </motion.p>

        {/* Action Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => scrollTo("manifesto")}
            className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold tracking-wide text-sm transition-all duration-300"
            style={{ boxShadow: "0 10px 30px rgba(247, 147, 26, 0.3)" }}
          >
            Comece por aqui
          </button>
          <button
            onClick={() => scrollTo("ferramentas")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium tracking-wide text-sm hover:border-gold-dim transition-all duration-300"
          >
            Usar aplicativos
          </button>
          <button
            onClick={() => scrollTo("educacao")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium tracking-wide text-sm hover:border-gold-dim transition-all duration-300"
          >
            Explorar leituras
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {avatars.map((bg, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${bg} border-2 border-background flex items-center justify-center`}
              >
                <span className="text-[9px] font-bold text-white/80">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Junte-se a <span className="text-foreground font-semibold">2.400+</span> soberanos que já baixaram.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
