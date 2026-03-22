import { useState, useEffect, useCallback, useRef } from "react";
import { Zap } from "lucide-react";

const MATRIX_CHARS = "0123456789₿⚡∞§#@&%▓░▒█";
const GLITCH_DURATION = 600;
const GLITCH_INTERVAL = 40;

// Base: data de lançamento do site + crescimento orgânico baseado no tempo real
const LAUNCH_DATE = new Date("2025-01-15T00:00:00Z").getTime();
const BASE_SATS = 753;
// ~50 sats/hora média = ~1200 sats/dia = crescimento orgânico plausível
const SATS_PER_MS = 50 / (2 * 3_600_000);

const getTimeSats = () => {
  const elapsed = Date.now() - LAUNCH_DATE;
  // Crescimento determinístico + micro-variação por hora (seed baseado no dia/hora)
  const base = Math.floor(elapsed * SATS_PER_MS);
  const hourSeed = Math.floor(elapsed / 3_600_000);
  const jitter = Math.abs(Math.sin(hourSeed * 7919)) * 200;
  return BASE_SATS + base + Math.floor(jitter);
};

const SatCounter = () => {
  const [count, setCount] = useState(getTimeSats);
  const [displayDigits, setDisplayDigits] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [flash, setFlash] = useState(false);
  const glitchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatNumber = useCallback((n: number) => n.toLocaleString("pt-BR"), []);

  // Glitch animation
  const triggerGlitch = useCallback(
    (target: number) => {
      setIsGlitching(true);
      setFlash(true);
      setTimeout(() => setFlash(false), 800);

      const targetStr = formatNumber(target);
      let elapsed = 0;

      if (glitchRef.current) clearInterval(glitchRef.current);

      glitchRef.current = setInterval(() => {
        elapsed += GLITCH_INTERVAL;
        const progress = Math.min(elapsed / GLITCH_DURATION, 1);

        const chars = targetStr.split("").map((char, i) => {
          if (char === "." || char === ",") return char;
          const settleAt = (i / targetStr.length) * 0.7;
          if (progress > settleAt + 0.3) return char;
          return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        });

        setDisplayDigits(chars);

        if (progress >= 1) {
          if (glitchRef.current) clearInterval(glitchRef.current);
          setDisplayDigits(targetStr.split(""));
          setIsGlitching(false);
        }
      }, GLITCH_INTERVAL);
    },
    [formatNumber]
  );

  // Initialize display
  useEffect(() => {
    setDisplayDigits(formatNumber(count).split(""));
  }, [formatNumber, count]);

  // Incremento periódico baseado no tempo real (a cada 20-40s)
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 20000 + Math.random() * 20000;
      return setTimeout(() => {
        const next = getTimeSats();
        setCount(next);
        triggerGlitch(next);
        timerRef = scheduleNext();
      }, delay);
    };

    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, [triggerGlitch]);

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <Zap
        className={`w-3.5 h-3.5 transition-all duration-300 ${
          flash ? "text-gold scale-125 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" : "text-muted-foreground"
        }`}
      />
      <div className="flex items-center gap-1.5">
        <span
          className="font-mono text-sm tracking-wider font-bold"
          style={{
            color: "hsl(var(--gold))",
            textShadow: isGlitching
              ? "0 0 8px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)"
              : "0 0 4px rgba(234,179,8,0.3)",
            transition: "text-shadow 0.3s ease",
          }}
        >
          {displayDigits.map((char, i) => (
            <span
              key={i}
              className={isGlitching ? "inline-block animate-pulse" : "inline-block"}
              style={{
                animationDuration: isGlitching ? `${80 + i * 20}ms` : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          sats injetados na rede
        </span>
      </div>
    </div>
  );
};

export default SatCounter;
