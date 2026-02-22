import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, QrCode, Zap, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MATRIX_CHARS = "0123456789₿⚡∞§#@&%▓░▒█SOBERANIA";

const steps = [
  {
    num: "01",
    time: "30s",
    title: "BAIXE A SUA ARMA",
    icon: Download,
    recommendation: "Baixe a Wallet of Satoshi ou a Phoenix Wallet na sua loja de aplicativos.",
    reason: "Elas são focadas em liquidez imediata (Lightning Network), ideais para o uso no dia a dia e para o protocolo de PIX via Bitcoin.",
  },
  {
    num: "02",
    time: "60s",
    title: "RECEBA SEUS PRIMEIROS SATS",
    icon: QrCode,
    recommendation: "Abra o app, clique em 'Receive' e gere um QR Code.",
    reason: "Você pode usar o nosso Portal de Apoio no rodapé para enviar qualquer valor simbólico de teste para si mesmo ou receber de um par (P2P).",
  },
  {
    num: "03",
    time: "30s",
    title: "TESTE A SAÍDA SOBERANA",
    icon: Zap,
    recommendation: "Use o saldo que você recebeu para pagar um PIX através de um gateway descentralizado.",
    reason: "O dinheiro cai na conta de destino em segundos, sem que nenhum gerente de banco tenha autorizado a transação.",
  },
];

const EmergencyManual = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([false, false, false]);
  const [activated, setActivated] = useState(false);
  const [glitchText, setGlitchText] = useState("SOBERANIA ATIVADA");
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allChecked = checked.every(Boolean);

  const toggle = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    const target = "SOBERANIA ATIVADA";
    let elapsed = 0;

    if (glitchRef.current) clearInterval(glitchRef.current);

    glitchRef.current = setInterval(() => {
      elapsed += 40;
      const progress = Math.min(elapsed / 800, 1);

      const chars = target.split("").map((char, i) => {
        if (char === " ") return " ";
        const settleAt = (i / target.length) * 0.6;
        if (progress > settleAt + 0.4) return char;
        return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
      });

      setGlitchText(chars.join(""));

      if (progress >= 1) {
        if (glitchRef.current) clearInterval(glitchRef.current);
        setGlitchText("SOBERANIA ATIVADA");
        setIsGlitching(false);
      }
    }, 40);
  }, []);

  useEffect(() => {
    if (allChecked && !activated) {
      setActivated(true);
      triggerGlitch();
    }
  }, [allChecked, activated, triggerGlitch]);

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-gold" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold">
              MANUAL DE EMERGÊNCIA
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            120 Segundos para a{" "}
            <span className="text-gradient-gold">Liberdade</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Você já viu a matemática e simulou a operação. Agora é hora de possuir a ferramenta.
            Em menos de 2 minutos, você sairá da teoria e entrará na economia paralela.
          </p>
        </motion.div>

        {/* Military-style card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-2 border-gold/30 rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden"
        >
          {/* Top stripe */}
          <div className="bg-gold/10 border-b border-gold/20 px-6 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold font-bold">
              ⚡ PROTOCOLO OPERACIONAL
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              TEMPO TOTAL: 120s
            </span>
          </div>

          {/* Steps */}
          <div className="p-6 space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isChecked = checked[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                >
                  <div
                    className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 group ${
                      isChecked
                        ? "bg-gold/5 border border-gold/20"
                        : "hover:bg-secondary/30 border border-transparent"
                    }`}
                    onClick={() => toggle(i)}
                  >
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-0.5">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          isChecked
                            ? "bg-gold border-gold"
                            : "border-border group-hover:border-gold/50"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-2xl font-bold text-gold">{step.num}</span>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gold" />
                          <span className="font-mono text-xs font-bold tracking-wider text-foreground">
                            {step.title}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground bg-secondary px-2 py-0.5 rounded ml-auto">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-medium mb-1">
                        {step.recommendation}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.reason}
                      </p>
                    </div>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="ml-7 h-6 border-l-2 border-dashed border-gold/20" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Activation zone */}
          <AnimatePresence>
            {allChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t-2 border-gold/30"
              >
                <div className="p-6 text-center">
                  {/* Matrix text */}
                  <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="font-mono text-2xl md:text-3xl font-bold mb-6 tracking-wider"
                    style={{
                      color: "#EAB308",
                      textShadow: isGlitching
                        ? "0 0 12px rgba(34,197,94,0.7), 0 0 30px rgba(34,197,94,0.4)"
                        : "0 0 8px rgba(234,179,8,0.4), 0 0 20px rgba(234,179,8,0.2)",
                      transition: "text-shadow 0.3s ease",
                    }}
                  >
                    {glitchText.split("").map((char, i) => (
                      <span
                        key={i}
                        className={isGlitching ? "inline-block" : ""}
                        style={{
                          animationDuration: isGlitching ? `${60 + i * 15}ms` : undefined,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => navigate("/bitcoin#autocustodia")}
                    className="px-10 py-4 rounded-lg gradient-gold text-primary-foreground font-bold tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                    style={{ boxShadow: "0 10px 40px rgba(247, 147, 26, 0.4)" }}
                  >
                    EU ESTOU PRONTO
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <p className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.3em] mt-4">
                    NÃO CONFIE. VERIFIQUE.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyManual;
