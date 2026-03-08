import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, BarChart3, Terminal, ArrowRight, Lock, Cpu, Crosshair } from "lucide-react";
import { useNavigate } from "react-router-dom";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const highlights = [
  { icon: BarChart3, label: "Calculadoras de ROI", desc: "Simule crescimento patrimonial em BTC" },
  { icon: Shield, label: "Geradores Air-Gapped", desc: "Seeds com entropia real, 100% offline" },
  { icon: Cpu, label: "Rastreadores Blockchain", desc: "Dados ao vivo da rede Bitcoin" },
  { icon: Lock, label: "Simuladores de Custódia", desc: "Planeje sua herança soberana" },
];

const ToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden">
      {/* ── CINEMATIC HERO BACKGROUND ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('/heroes/arsenal-operacional.webp')`,
            filter: "brightness(0.4) saturate(0.85)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,8,8,0.3) 0%, rgba(5,8,8,0.6) 30%, rgba(5,8,8,0.92) 70%, rgba(5,8,8,1) 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 40%, transparent 30%, rgba(5,8,8,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Pre-title */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
              Painel Operacional — Acesso Restrito
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Arsenal de{" "}
            <span className="text-gradient-gold">Blindagem</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Ecossistema de ferramentas para Soberania Financeira e gestão de Bitcoin.
          </motion.p>

          {/* PNL Open Loop */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative mb-12 p-6 md:p-8 rounded-sm border border-border/50 bg-card/30 backdrop-blur-sm max-w-3xl"
          >
            {/* Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/[0.08] rounded-full blur-3xl pointer-events-none" />

            <blockquote className="text-base md:text-lg font-medium text-foreground/90 leading-relaxed mb-3 italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Você está vendo apenas o topo do iceberg."
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              O Painel Operacional contém calculadoras de ROI, rastreadores de nodes
              e simuladores de custódia que o público comum não utiliza.
            </p>
            <p className="text-xs text-primary/80 font-medium tracking-wide">
              Algumas dessas ferramentas não existem em nenhum outro lugar.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={4 + i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="group p-4 rounded-sm border border-border/40 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/20 transition-all duration-500"
                >
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Row */}
          <motion.div
            custom={8}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <button
              onClick={() => navigate("/ferramentas")}
              className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-primary/30 bg-primary/[0.08] hover:bg-primary/[0.15] hover:border-primary/50 text-primary font-semibold tracking-wide text-sm transition-all duration-300"
            >
              <Crosshair className="w-4 h-4" />
              Acessar Arsenal Completo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>

            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
              +12 ferramentas · 100% gratuitas · execução local
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
