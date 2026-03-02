import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nivel-zero';
const VISIT_KEY = 'nivel-zero-visits';

function getWeeklyVisits(): number[] {
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    if (!raw) return [];
    const visits: number[] = JSON.parse(raw);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return visits.filter(v => v > weekAgo);
  } catch {
    return [];
  }
}

function recordVisit() {
  const visits = getWeeklyVisits();
  visits.push(Date.now());
  localStorage.setItem(VISIT_KEY, JSON.stringify(visits));
  return visits.length;
}

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dismissed';
  } catch {
    return false;
  }
}

export default function NivelZero() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(wasDismissed);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrolledRef = useRef(false);
  const timeMetRef = useRef(false);
  const triggeredRef = useRef(false);

  const tryTrigger = useCallback(() => {
    if (triggeredRef.current || dismissed) return;
    // Need at least 2 of 3 conditions: scroll 100%, 7min, 3 visits
    let conditions = 0;
    if (scrolledRef.current) conditions++;
    if (timeMetRef.current) conditions++;
    const visits = getWeeklyVisits();
    if (visits.length >= 3) conditions++;
    
    if (conditions >= 2) {
      triggeredRef.current = true;
      setShow(true);
    }
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Record visit
    recordVisit();

    // Timer: 7 minutes
    timerRef.current = setTimeout(() => {
      timeMetRef.current = true;
      tryTrigger();
    }, 7 * 60 * 1000);

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercent = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercent >= 0.97) {
        scrolledRef.current = true;
        tryTrigger();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed, tryTrigger]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9998] max-w-md w-[90vw]"
        >
          <div className="relative rounded-2xl border border-amber-500/15 bg-[#0a0d08]/97 backdrop-blur-lg p-8 shadow-2xl shadow-black/50">
            {/* Top accent */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            <div className="text-center">
              <div className="flex justify-center gap-1.5 mb-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="w-1 h-1 rounded-full bg-amber-400"
                  />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-amber-500/40 text-[9px] font-bold tracking-[0.5em] uppercase mb-3"
              >
                Nível 0
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-stone-200 text-lg font-bold tracking-wide mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Quem chega até aqui não está apenas lendo.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-stone-500 text-sm leading-relaxed mb-6"
              >
                Atenção sustentada é a primeira forma de autonomia. Você demonstrou que observa com profundidade — e isso é raro.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleDismiss}
                  className="text-amber-500/40 text-[10px] font-mono tracking-[0.3em] uppercase hover:text-amber-400/60 transition-colors duration-500"
                >
                  Entendido
                </button>
              </motion.div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
