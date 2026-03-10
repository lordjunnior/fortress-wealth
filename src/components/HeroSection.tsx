import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Shield, AlertTriangle } from "lucide-react";
import { ease } from "@/lib/motion";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, -60]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  // Mouse parallax for depth layers
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSeedOffset((p) => p + 5), 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-[110vh] flex items-center overflow-hidden"
    >
      {/* ── Parallax Background Layers ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        {/* Radial glow — deep red */}
        <div
          className="absolute top-1/4 -left-[20%] w-[70vw] h-[70vw] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, hsl(var(--chart-red)) 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Radial glow — gold */}
        <div
          className="absolute bottom-1/4 -right-[15%] w-[60vw] h-[60vw] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </motion.div>

      {/* ── Shimmer keyframes ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .hero-shimmer {
          background: linear-gradient(90deg, hsl(var(--gold)) 0%, hsl(40 80% 70%) 40%, hsl(0 0% 100%) 50%, hsl(40 80% 70%) 60%, hsl(var(--gold)) 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .hero-scanline {
          position: absolute;
          left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, hsl(var(--gold) / 0.15), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
        @keyframes typeReveal {
          from { max-width: 0; }
          to { max-width: 100%; }
        }
        .type-reveal {
          overflow: hidden;
          white-space: nowrap;
          animation: typeReveal 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
        }
      `}</style>

      {/* Scanline effect */}
      <div className="hero-scanline z-[1]" />

      {/* ── Main Content — Full Width Layout ── */}
      <motion.div
        style={{ y: textY, opacity: opacityFade }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-28"
      >
        {/* ─── CAMADA 1: Anzol / Filtro de Audiência ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: ease.sovereign }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 border border-chart-red/40 px-5 py-2.5 rounded-sm bg-chart-red/5 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 text-chart-red animate-pulse" />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-chart-red/80 font-semibold">
              Enquanto você lê isto, seu patrimônio está sendo confiscado
            </span>
          </div>
        </motion.div>

        {/* ─── CAMADA 2: Título Principal — Wide & Cinematic ─── */}
        <div className="mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
          <div className="leading-[0.92]">
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(3.2rem,9vw,8.5rem)] text-ice-white"
            >
              SEU DINHEIRO ESTÁ
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(3.2rem,9vw,8.5rem)] text-chart-red"
              style={{ textShadow: "0 0 40px hsl(0 72% 51% / 0.6), 0 0 80px hsl(0 72% 51% / 0.2)" }}
            >
              DERRETENDO.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(3.2rem,9vw,8.5rem)] text-ice-white"
            >
              A CULPA NÃO É DO
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(3.2rem,9vw,8.5rem)] hero-shimmer"
            >
              ACASO.
            </motion.span>
          </div>
        </div>

        {/* ─── CAMADA 3: Choque Cognitivo ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: ease.sovereign }}
          className="mb-10 max-w-3xl"
        >
          <div className="relative pl-5 border-l-2 border-chart-red/40">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="font-display text-lg md:text-xl text-foreground/90 font-semibold leading-relaxed"
            >
              Você não possui dinheiro no banco.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="font-display text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Você possui <span className="text-gold font-bold">permissão temporária</span> para utilizá-lo.
            </motion.p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: ease.smooth }}
          className="w-32 h-px mb-8 origin-left"
          style={{ background: "linear-gradient(90deg, hsl(var(--gold) / 0.6), transparent)" }}
        />

        {/* ─── Subtitle / Mission ─── */}
        {/* ─── CAMADA 4: Subtítulo PNL + CTA ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0, ease: ease.sovereign }}
          className="font-display text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed mb-10"
        >
          O manual que o sistema não quer que você leia.{" "}
          <span className="text-foreground/90 font-semibold">
            Alfabetização monetária, autocustódia e estratégias de saída
          </span>{" "}
          — a infraestrutura para quem decidiu parar de financiar o próprio roubo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2, ease: ease.sovereign }}
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const manifesto = document.getElementById('manifesto');
              if (manifesto) manifesto.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-sm font-display font-bold text-sm md:text-base tracking-wide uppercase overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(40 80% 45%))",
              color: "hsl(var(--background))",
              boxShadow: "0 0 30px hsl(var(--gold) / 0.3), 0 4px 20px hsl(var(--gold) / 0.2)",
            }}
          >
            <Shield className="w-5 h-5" />
            <span>Comece pelo Despertar</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
          </motion.button>

          <motion.button
            onClick={() => {
              const heroEl = document.getElementById('hero-section');
              const target = heroEl?.nextElementSibling;
              if (target) target.scrollIntoView({ behavior: 'smooth' });
              else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
            </motion.div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
              Ou explore o arsenal
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
