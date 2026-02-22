import { useState, useEffect, useCallback, useRef } from "react";
import { Zap } from "lucide-react";

const MATRIX_CHARS = "0123456789₿⚡∞§#@&%▓░▒█";
const GLITCH_DURATION = 600;
const GLITCH_INTERVAL = 40;

const SatCounter = () => {
  const [count, setCount] = useState(753);
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
    setDisplayDigits(formatNumber(753).split(""));
  }, [formatNumber]);

  // Random increment timer
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 30000;
      return setTimeout(() => {
        const increment = 1 + Math.floor(Math.random() * 5);
        setCount((prev) => {
          const next = prev + increment;
          triggerGlitch(next);
          return next;
        });
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
          flash ? "text-gold scale-125 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" : "text-gold-dim"
        }`}
      />
      <div className="flex items-center gap-1.5">
        <span
          className="font-mono text-sm tracking-wider font-bold"
          style={{
            color: "#EAB308",
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
        <span className="font-mono text-xs text-gold-dim tracking-wider">
          sats injetados na rede
        </span>
      </div>
    </div>
  );
};

export default SatCounter;
