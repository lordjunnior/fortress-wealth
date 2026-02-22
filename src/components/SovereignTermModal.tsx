import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, Skull, Crosshair } from "lucide-react";

const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン₿⚡";
const TYPEWRITER_SPEED = 28;

const terms = [
  {
    icon: Lock,
    title: "A Custódia é Sua",
    text: "Não existem gerentes, não existe 'esqueci minha senha' e não existe estorno. Se você perder suas chaves, seu capital está perdido para sempre.",
  },
  {
    icon: Skull,
    title: "A Verdade é Insuportável",
    text: "O conteúdo aqui exposto destrói narrativas estatais confortáveis. O conhecimento exige ação e a ignorância não será mais uma desculpa.",
  },
  {
    icon: Crosshair,
    title: "Não sou seu Consultor",
    text: "Este arsenal é uma ferramenta de guerra intelectual e técnica. Eu entrego a arma, mas quem puxa o gatilho da sua liberdade é você.",
  },
];

const SovereignTermModal = () => {
  const [visible, setVisible] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  const headerFull = "PROTOCOLO DE ACESSO: TERMO DE RESPONSABILIDADE";

  useEffect(() => {
    const accepted = localStorage.getItem("sovereign-term-accepted");
    if (!accepted) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Typewriter for header
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setHeaderText(headerFull.slice(0, i));
      if (i >= headerFull.length) {
        clearInterval(interval);
        setTimeout(() => setShowTerms(true), 400);
        setTimeout(() => setShowButtons(true), 1800);
      }
    }, TYPEWRITER_SPEED);
    return () => clearInterval(interval);
  }, [visible]);

  // Matrix unlock effect
  const triggerUnlock = useCallback(() => {
    setUnlocking(true);
    const cols = 40;
    const rows = 25;
    const total = cols * rows;
    const chars: string[] = [];
    for (let i = 0; i < total; i++) {
      chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
    }
    setMatrixChars(chars);

    // Cycle matrix chars
    const interval = setInterval(() => {
      setMatrixChars((prev) =>
        prev.map(() => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
      );
    }, 60);

    setTimeout(() => {
      clearInterval(interval);
      localStorage.setItem("sovereign-term-accepted", "true");
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
      setVisible(false);
    }, 2000);
  }, []);

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#070A12]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Matrix unlock overlay */}
        <AnimatePresence>
          {unlocking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/90" />
              <div
                className="absolute inset-0 font-mono text-[10px] leading-[14px] text-green-500/70 break-all p-2 overflow-hidden"
                style={{ textShadow: "0 0 8px rgba(34,197,94,0.5)" }}
              >
                {matrixChars.join("")}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="relative z-10 text-center"
              >
                <p
                  className="font-mono text-2xl md:text-4xl font-bold tracking-widest"
                  style={{
                    color: "hsl(var(--gold))",
                    textShadow: "0 0 30px rgba(234,179,8,0.6), 0 0 60px rgba(234,179,8,0.3)",
                  }}
                >
                  ACESSO AUTORIZADO
                </p>
                <p className="font-mono text-xs text-green-500 mt-3 tracking-[0.3em] animate-pulse">
                  SISTEMA DESTRAVADO
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Alert border */}
          <motion.div
            className="rounded-xl p-[1px]"
            style={{
              background: unlocking
                ? "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--amber)))"
                : "linear-gradient(135deg, hsl(0 72% 51%), hsl(0 72% 35%))",
            }}
            animate={{
              boxShadow: unlocking
                ? "0 0 40px rgba(234,179,8,0.3)"
                : [
                    "0 0 20px rgba(239,68,68,0.2)",
                    "0 0 40px rgba(239,68,68,0.3)",
                    "0 0 20px rgba(239,68,68,0.2)",
                  ],
            }}
            transition={{ duration: 2, repeat: unlocking ? 0 : Infinity }}
          >
            <div className="bg-[#0a0d16] rounded-xl p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-destructive flex-shrink-0" />
                <h2
                  className="font-mono text-sm md:text-base font-bold tracking-wider text-destructive"
                  style={{ textShadow: "0 0 10px rgba(239,68,68,0.3)" }}
                >
                  {headerText}
                  <span className="animate-pulse">_</span>
                </h2>
              </div>

              {/* Intro text */}
              <AnimatePresence>
                {showTerms && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed mb-8 border-l-2 border-destructive/50 pl-4">
                      Você está entrando em uma zona de soberania individual absoluta. Ao
                      prosseguir, você reconhece que:
                    </p>

                    {/* Terms */}
                    <div className="space-y-5 mb-8">
                      {terms.map((term, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.3, duration: 0.5 }}
                          className="flex gap-4 items-start"
                        >
                          <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center flex-shrink-0">
                            <term.icon className="w-5 h-5 text-destructive" />
                          </div>
                          <div>
                            <h3 className="font-mono text-sm font-bold text-foreground mb-1">
                              {term.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {term.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Question */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="font-mono text-xs text-center text-muted-foreground mb-6 italic"
                    >
                      "Deseja assumir o controle total da sua vida ou prefere continuar
                      terceirizando sua liberdade?"
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={triggerUnlock}
                      disabled={unlocking}
                      className="w-full py-3.5 rounded-lg font-mono text-sm font-bold tracking-wider transition-all duration-300 gradient-gold text-primary-foreground hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] disabled:opacity-60"
                    >
                      ⚡ EU ASSUMO A RESPONSABILIDADE
                    </button>
                    <button
                      onClick={handleReject}
                      className="w-full py-3 rounded-lg font-mono text-xs tracking-wider text-muted-foreground border border-border hover:border-destructive/50 hover:text-destructive transition-colors"
                    >
                      NÃO ESTOU PRONTO
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SovereignTermModal;
