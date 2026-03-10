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
  { icon: BarChart3, label: "Simulador de Valorização BTC", desc: "Compare Bitcoin vs. Imóveis, Poupança e Bolsa ao longo do tempo" },
  { icon: Shield, label: "Gerador de Seed Offline", desc: "Crie chaves privadas com entropia real, 100% air-gapped" },
  { icon: Cpu, label: "Monitor de Rede Bitcoin", desc: "Hashrate, blocos e taxas da blockchain em tempo real" },
  { icon: Lock, label: "Calculadora de Autocustódia", desc: "Planeje herança soberana e cold storage multisig" },
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

            <blockquote className="font-display text-lg md:text-2xl font-bold text-foreground/90 leading-tight mb-3 uppercase tracking-wide">
              "VOCÊ ESTÁ VENDO APENAS O TOPO DO ICEBERG."
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              O Painel Operacional contém calculadoras de ROI, rastreadores de nodes
              e simuladores de custódia que o público comum não utiliza.
            </p>
            <p className="text-sm font-semibold tracking-wider uppercase text-gradient-gold inline-block border-b border-primary/30 pb-1">
              ⚡ Algumas dessas ferramentas não existem em nenhum outro lugar.
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
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative p-5 rounded-sm border border-primary/20 bg-card/40 backdrop-blur-md overflow-hidden cursor-default
                    hover:border-primary/50 hover:bg-card/60 transition-all duration-500"
                  style={{ boxShadow: '0 0 20px hsl(40 92% 56% / 0.06), inset 0 1px 0 hsl(40 92% 56% / 0.08)' }}
                >
                  {/* Ambient shimmer */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/[0.1] via-transparent to-primary/[0.06]" />
                  </div>

                  {/* Top accent line (always visible) */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all duration-500" />

                  {/* Icon with breathing glow */}
                  <div className="relative w-10 h-10 mb-3 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/15 animate-[pulse_3s_ease-in-out_infinite] group-hover:bg-primary/25" />
                    <Icon className="relative w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground/90 mb-1 transition-colors duration-300 group-hover:text-primary">{item.label}</h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">{item.desc}</p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
