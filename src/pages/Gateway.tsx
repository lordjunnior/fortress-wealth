import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";

type Stage = "input" | "processing" | "success";

const Gateway = () => {
  const navigate = useNavigate();
  const [pixKey, setPixKey] = useState("");
  const [valueBRL, setValueBRL] = useState<number>(0);
  const [btcPriceBRL, setBtcPriceBRL] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("input");
  const [copied, setCopied] = useState(false);

  const fakeTxId = "b7e3f1a9c4d2e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4";
  const SALDO_SATS = 1247830;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const [mempoolRes, fxRes] = await Promise.all([
          fetch("https://mempool.space/api/v1/prices"),
          fetch("https://open.er-api.com/v6/latest/USD"),
        ]);
        if (mempoolRes.ok && fxRes.ok) {
          const mempoolData = await mempoolRes.json();
          const fxData = await fxRes.json();
          const usdBrl = fxData.rates?.BRL ?? 5.1;
          setBtcPriceBRL(mempoolData.USD * usdBrl);
        }
      } catch {
        setBtcPriceBRL(540000);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const satsAmount = valueBRL > 0 && btcPriceBRL
    ? Math.round((valueBRL / btcPriceBRL) * 100_000_000)
    : 0;

  const handleConfirm = () => {
    if (!pixKey || valueBRL <= 0) return;
    setStage("processing");
    setTimeout(() => setStage("success"), 3500);
  };

  const handleCopyTx = () => {
    navigator.clipboard.writeText(fakeTxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStage("input");
    setPixKey("");
    setValueBRL(0);
  };

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px] pb-20">
        <div className="section-padding pt-6 pb-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono tracking-wider text-xs">VOLTAR</span>
          </motion.button>
        </div>

        <section className="section-padding pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Phone Simulator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div className="relative w-[320px] rounded-[40px] border-2 border-border bg-card p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-10" />

                  <div className="w-full rounded-[32px] bg-background overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-8 pb-3">
                      <span className="font-mono text-[10px] text-muted-foreground">21:47</span>
                      <div className="flex gap-1 items-center">
                        <Zap className="w-3 h-3 text-gold" />
                        <span className="font-mono text-[10px] text-gold">Lightning</span>
                      </div>
                    </div>

                    <div className="px-5 pb-6">
                      {/* Balance */}
                      <div className="mb-6">
                        <p className="text-[10px] text-muted-foreground font-mono mb-1">SALDO DISPONÍVEL</p>
                        <p className="text-2xl font-bold text-foreground">
                          {SALDO_SATS.toLocaleString("pt-BR")}{" "}
                          <span className="text-sm text-gold">sats</span>
                        </p>
                        <p className="text-[9px] text-muted-foreground font-mono mt-1">
                          BTC/BRL {btcPriceBRL ? `R$ ${btcPriceBRL.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---"}
                        </p>
                      </div>

                      <AnimatePresence mode="wait">
                        {stage === "input" && (
                          <motion.div
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {/* PIX Key */}
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">
                                CHAVE PIX DO DESTINATÁRIO
                              </label>
                              <input
                                type="text"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                placeholder="email, CPF ou telefone"
                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none transition-colors"
                              />
                            </div>

                            {/* Value */}
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">
                                VALOR EM R$
                              </label>
                              <input
                                type="number"
                                value={valueBRL || ""}
                                onChange={(e) => setValueBRL(Number(e.target.value))}
                                placeholder="0,00"
                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none transition-colors"
                              />
                            </div>

                            {/* Conversion */}
                            {valueBRL > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="border border-border rounded-lg p-3 mb-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-[10px] text-muted-foreground font-mono">VALOR</p>
                                    <p className="text-lg font-semibold">
                                      R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-gold" />
                                  <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground font-mono">DÉBITO</p>
                                    <p className="text-lg font-semibold text-gold">
                                      {satsAmount.toLocaleString("pt-BR")} sats
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                                  <span className="text-[9px] text-muted-foreground font-mono">TAXA DA REDE</span>
                                  <span className="text-[9px] text-gold font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                                </div>
                              </motion.div>
                            )}

                            {/* Confirm Button */}
                            <button
                              onClick={handleConfirm}
                              disabled={!pixKey || valueBRL <= 0}
                              className="w-full gradient-gold rounded-lg py-3 text-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                            >
                              <span className="text-sm font-semibold text-primary-foreground">
                                Confirmar via Lightning
                              </span>
                            </button>

                            <p className="text-[9px] text-muted-foreground text-center mt-3 font-mono">
                              GATEWAY DESCENTRALIZADO · SEM KYC
                            </p>
                          </motion.div>
                        )}

                        {stage === "processing" && (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-10 flex flex-col items-center gap-4"
                          >
                            <Loader2 className="w-10 h-10 text-gold animate-spin" />
                            <p className="font-mono text-sm text-gold animate-pulse">Gerando Invoice...</p>
                            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.2, ease: "easeInOut" }}
                                className="h-full gradient-gold rounded-full"
                              />
                            </div>
                            <p className="text-[9px] text-muted-foreground font-mono text-center">
                              VALIDANDO INVOICE · PROPAGANDO HTLC · CONFIRMANDO ROTA
                            </p>
                          </motion.div>
                        )}

                        {stage === "success" && (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-6 flex flex-col items-center gap-3"
                          >
                            <CheckCircle2 className="w-12 h-12 text-chart-green" />
                            <p className="font-bold text-foreground">Operação Concluída</p>
                            <div className="w-full border border-border rounded-lg p-3 space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Destino PIX</span>
                                <span className="text-foreground font-mono">{pixKey}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Valor</span>
                                <span className="text-foreground">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Debitado</span>
                                <span className="text-gold font-bold">{satsAmount.toLocaleString("pt-BR")} sats</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Taxa</span>
                                <span className="text-chart-green">1 sat</span>
                              </div>
                              <div className="pt-2 border-t border-border/50">
                                <p className="text-[9px] text-muted-foreground font-mono mb-1">TX ID</p>
                                <div
                                  className="flex items-center gap-1 cursor-pointer group"
                                  onClick={handleCopyTx}
                                >
                                  <code className="text-[8px] text-muted-foreground break-all group-hover:text-foreground transition-colors">
                                    {fakeTxId}
                                  </code>
                                  {copied ? (
                                    <Check className="w-3 h-3 text-chart-green flex-shrink-0" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={reset}
                              className="w-full mt-2 py-2.5 rounded-lg border border-gold-dim text-gold font-semibold text-sm hover:bg-gold/5 transition-colors"
                            >
                              Nova Operação
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:pt-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                    GATEWAY DESCENTRALIZADO
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  PIX via{" "}
                  <span className="text-gradient-gold">Bitcoin</span>
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco.
                </p>

                {/* Rules */}
                <div className="space-y-4 mb-10">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Sem KYC",
                      desc: "Nenhuma informação pessoal é coletada. Sem CPF, sem selfie, sem gerente.",
                    },
                    {
                      icon: Zap,
                      title: "Taxa Real: ~1 sat",
                      desc: "Enquanto bancos cobram R$ 10+ por TED, a Lightning cobra frações de centavo.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Liquidação Instantânea",
                      desc: "O pagamento PIX chega em segundos. Sem dias úteis, sem horário comercial.",
                    },
                  ].map((rule, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <rule.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-0.5">{rule.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="card-wealth"
                >
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">
                    COMPARATIVO DE TAXAS
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">TED Bancário</span>
                      <span className="text-chart-red font-mono font-bold">R$ 10,00 – R$ 22,00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">PIX (com taxa oculta de dados)</span>
                      <span className="text-chart-red font-mono font-bold">Seu CPF + Rastreio</span>
                    </div>
                    <div className="h-px bg-border my-1" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">Lightning Network</span>
                      <span className="text-chart-green font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default Gateway;
