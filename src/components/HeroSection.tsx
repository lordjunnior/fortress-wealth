import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, ShieldAlert, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

// A Coreografia de Elite
const easeApple = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.15, ease: easeApple },
  }),
};

const HeroSection = () => {
  const [seedOffset, setSeedOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeedOffset((prev) => prev + 5);
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden bg-background">
      
      {/* Grade Tática de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-12">
        
        {/* Eyebrow / Tag do Sistema */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 border border-border bg-secondary/50 px-4 py-1.5 rounded-sm">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-bold">
              Centro de Comando da Soberania
            </span>
          </div>
        </motion.div>

        {/* O Conflito Ideológico (Tensão Tipográfica) */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] flex flex-col items-center">
            {/* O Problema: O Velho Mundo (Serif) */}
            <span className="font-editorial italic font-medium text-muted-foreground tracking-normal mb-2 md:mb-0">
              Seu dinheiro está <span className="text-destructive">derretendo.</span>
            </span>
            {/* A Solução: A Verdade Bruta (Grotesk/Sans) */}
            <span className="text-foreground uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              A culpa não é do <span className="text-gold drop-shadow-[0_0_40px_rgba(247,147,26,0.2)]">acaso.</span>
            </span>
          </h1>
        </motion.div>

        {/* Sub-copy Militar */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12 font-medium">
            Alfabetização monetária, ferramentas de autocustódia e estratégias de saída. A infraestrutura técnica e intelectual para quem decidiu parar de financiar o próprio roubo.
          </p>
        </motion.div>

        {/* Botões Brutalistas */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20"
        >
          <button 
            onClick={() => navigate('/protocolo-inicial')}
            className="w-full sm:w-auto btn-primary group"
          >
            Comece por aqui
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/ferramentas')}
              className="w-full sm:w-auto btn-secondary"
            >
              Usar Aplicativos
            </button>
            <button 
              onClick={() => navigate('/educacao')}
              className="w-full sm:w-auto btn-secondary"
            >
              Explorar Leituras
            </button>
          </div>
        </motion.div>

        {/* Prova Social Tecnológica */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-border/50 min-w-[300px]"
        >
          <div className="flex -space-x-3">
            <AnimatePresence mode="wait">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.img
                  key={`${i}-${seedOffset}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: easeApple }}
                  src={`https://i.pravatar.cc/100?u=${i + seedOffset}`}
                  alt="Soberano"
                  className="w-10 h-10 rounded-sm border-2 border-background object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase">
            <ShieldAlert className="w-4 h-4 text-gold" />
            <span>Junte-se a <strong className="text-foreground">2.400+</strong> soberanos operando.</span>
          </div>
        </motion.div>
      </div>

      {/* Indicador de Scroll Dinâmico */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Desça para o Manifesto</span>
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
