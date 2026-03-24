import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, AlertTriangle } from "lucide-react";
import { ease } from "@/lib/motion";

const HERO_VIDEO_URL = "/heroes/hero-loop-optimized.mp4";

/* ── Thanos Disintegration Effect for "DERRETENDO." ── */
const ThanosText = ({ text, delay = 0.5 }: { text: string; delay?: number }) => {
  const letters = text.split("");

  return (
    <span className="relative inline-block">
      {letters.map((char, i) => (
        <ThanosLetter key={i} char={char} index={i} total={letters.length} delay={delay} />
      ))}
    </span>
  );
};

const ThanosLetter = ({
  char,
  index,
  total,
  delay,
}: {
  char: string;
  index: number;
  total: number;
  delay: number;
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 80,
      y: -(Math.random() * 120 + 30),
      rotation: (Math.random() - 0.5) * 360,
      scale: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 1.5 + 1.5,
      delay: Math.random() * 0.5,
    }));
  }, []);

  const letterDelay = delay + 2.5 + (index / total) * 0.8;

  return (
    <span className="relative inline-block">
      {/* Solid letter that fades */}
      <motion.span
        className="inline-block text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0.7, 1] }}
        transition={{
          duration: 3,
          delay: letterDelay,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 left-0 w-[3px] h-[3px] rounded-[1px] pointer-events-none"
          style={{
            backgroundColor: p.id % 2 === 0 ? "#FFFFFF" : "#F4F4F5",
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0.6, 0],
            x: p.x,
            y: p.y,
            scale: [0, p.scale, p.scale * 0.5, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: letterDelay + p.delay,
            repeat: Infinity,
            repeatDelay: 6 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </span>
  );
};

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const tryPlayVideo = useCallback(() => {
    const vid = videoRef.current;
    if (vid && vid.paused) {
      vid.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const events = ["touchstart", "click", "scroll"] as const;
    const handler = () => {
      tryPlayVideo();
      events.forEach(e => document.removeEventListener(e, handler));
    };
    events.forEach(e => document.addEventListener(e, handler, { once: true, passive: true }));
    return () => events.forEach(e => document.removeEventListener(e, handler));
  }, [tryPlayVideo]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, -60]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-[110vh] flex items-center overflow-hidden"
    >
      {/* ── Cinematic Video Background ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/heroes/hero-poster.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: "brightness(0.3) saturate(0.7)" }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/heroes/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: "brightness(0.3) saturate(0.7)" }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,8,8,0.4) 0%, rgba(5,8,8,0.6) 40%, rgba(5,8,8,0.85) 80%, hsl(var(--background)) 100%)",
          }}
        />

        {/* Subtle white radial glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translate(calc(-50% + ${mousePos.x * -15}px), ${mousePos.y * -10}px)`,
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
            transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </motion.div>

      {/* ── Scanline ── */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .hero-scanline {
          position: absolute;
          left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
      `}</style>
      <div className="hero-scanline z-[1]" />

      {/* ── Main Content — Full Width Centered Layout for 2K ── */}
      <motion.div
        style={{ y: textY, opacity: opacityFade }}
        className="relative z-10 w-full flex justify-center"
      >
        <div className="w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 flex flex-col items-center md:items-end text-center md:text-right">

          {/* ─── CAMADA 1: Anzol ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: ease.sovereign }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 border border-white/20 px-5 py-2.5 rounded-sm bg-white/[0.03] backdrop-blur-sm">
              <AlertTriangle className="w-4 h-4 text-white/70 animate-pulse" />
              <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-white/60 font-semibold">
                Enquanto você lê isto, seu patrimônio está sendo confiscado
              </span>
            </div>
          </motion.div>

          {/* ─── CAMADA 2: Título Principal — Inter Tight Black ─── */}
          <div className="mb-8" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 }}>
            <div className="leading-[0.95]">
              <motion.span
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(2.4rem,7.5vw,7rem)] text-white uppercase"
              >
                SEU DINHEIRO ESTÁ
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(2.4rem,7.5vw,7rem)] text-white uppercase"
              >
                <ThanosText text="DERRETENDO." delay={0.5} />
              </motion.span>
            </div>
          </div>

          {/* ─── "A CULPA NÃO É DO ACASO." — Menor, abaixo ─── */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.1rem,2.5vw,2rem)] text-white/80 uppercase tracking-[0.15em] mb-10"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700 }}
          >
            A CULPA NÃO É DO ACASO.
          </motion.p>

          {/* ─── CAMADA 3: Choque Cognitivo ─── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: ease.sovereign }}
            className="mb-10 max-w-3xl"
          >
            <div className="relative pl-5 border-l-2 border-white/20">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="font-display text-lg md:text-xl text-white/90 font-semibold leading-relaxed"
              >
                Você não possui dinheiro no banco.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="font-display text-base md:text-lg text-white/50 leading-relaxed"
              >
                Você possui <span className="text-white font-bold">permissão temporária</span> para utilizá-lo.
              </motion.p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: ease.smooth }}
            className="w-32 h-px mb-8 origin-right"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4))" }}
          />

          {/* ─── CAMADA 4: Subtítulo + CTA ─── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease: ease.sovereign }}
            className="font-display text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mb-10"
          >
            O manual que o sistema não quer que você leia.{" "}
            <span className="text-white/80 font-semibold">
              Alfabetização monetária, autocustódia e estratégias de saída
            </span>{" "}
            — a infraestrutura para quem decidiu parar de financiar o próprio roubo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2, ease: ease.sovereign }}
            className="flex flex-wrap items-center justify-center md:justify-end gap-4 mb-14"
          >
            {/* ── Botão Preto Fosco ── */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const manifesto = document.getElementById('manifesto');
                if (manifesto) manifesto.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-sm font-display font-bold text-sm md:text-base tracking-wide uppercase overflow-hidden transition-all duration-300 border border-white/10"
              style={{
                background: "#0a0a0a",
                color: "#FFFFFF",
              }}
            >
              <Shield className="w-5 h-5" />
              <span>Comece pelo Despertar</span>
              <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
            </motion.button>

            <motion.button
              onClick={() => {
                const heroEl = document.getElementById('hero-section');
                const target = heroEl?.nextElementSibling;
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </motion.div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                Ou explore o arsenal
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
