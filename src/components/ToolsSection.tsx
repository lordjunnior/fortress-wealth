import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, BarChart3, Terminal, ArrowRight, Lock, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fadeUp, stagger, staggerChild, viewportOnce } from "@/lib/motion";

const highlights = [
  { icon: BarChart3, label: "Calculadoras de ROI" },
  { icon: Shield, label: "Geradores Air-Gapped" },
  { icon: Cpu, label: "Rastreadores de Blockchain" },
  { icon: Lock, label: "Simuladores de Custódia" },
];

const ToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);
  const navigate = useNavigate();

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <p className="pre-title">PAINEL OPERACIONAL</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Arsenal de <span className="text-gradient-gold">Blindagem</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Ecossistema de ferramentas para Soberania Financeira e gestão de Bitcoin.
          </p>
        </motion.div>

        {/* Central Card — The "Open Loop" */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-sm border border-border bg-card/80 backdrop-blur-sm"
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.07] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-destructive/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 md:p-10">
            {/* Exclusivity Tag */}
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                Acesso Restrito
              </span>
            </div>

            {/* PNL Hook — The Open Loop */}
            <blockquote className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed mb-3 max-w-2xl">
              "Você está vendo apenas o topo do iceberg."
            </blockquote>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
              O Painel Operacional contém calculadoras de ROI, rastreadores de nodes
              e simuladores de custódia que o público comum não utiliza.
              <span className="block mt-2 text-primary/80 font-medium text-xs tracking-wide">
                Algumas dessas ferramentas não existem em nenhum outro lugar.
              </span>
            </p>

            {/* Highlights Grid */}
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
            >
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={staggerChild}
                    className="flex items-center gap-3 p-3 rounded-sm bg-secondary/50 border border-border/50"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground/80">{item.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <button
              onClick={() => navigate("/ferramentas")}
              className="group inline-flex items-center gap-3 btn-secondary py-3.5 px-8 text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              <span className="font-semibold tracking-wide text-sm">Acessar Arsenal Completo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Counter — Social Proof */}
            <p className="mt-6 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
              +12 ferramentas operacionais · 100% gratuitas · execução local
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
