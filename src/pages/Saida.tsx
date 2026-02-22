import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Zap, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Copy, Check,
  Users, Lock, Globe, AlertTriangle, ExternalLink, Radio, Banknote
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";
import EmergencyManual from "@/components/EmergencyManual";
import cardEstrategias from "@/assets/card-estrategias.jpg";

type Stage = "input" | "processing" | "success";

const p2pPlatforms = [
  {
    name: "Bisq",
    desc: "Exchange descentralizada, open-source, sem KYC. Roda no seu computador como um node P2P.",
    link: "https://bisq.network",
    tags: ["Open Source", "Desktop", "Sem KYC"],
  },
  {
    name: "RoboSats",
    desc: "Troca P2P via Lightning Network com identidades descartáveis (robôs). Rápido e privado.",
    link: "https://robosats.com",
    tags: ["Lightning", "Tor", "Anônimo"],
  },
  {
    name: "Peach Bitcoin",
    desc: "App mobile para comprar Bitcoin sem KYC. Matchmaking P2P com escrow automático.",
    link: "https://peachbitcoin.com",
    tags: ["Mobile", "Escrow", "Simples"],
  },
];

const Saida = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Gateway simulator state
  const [pixKey, setPixKey] = useState("");
  const [valueBRL, setValueBRL] = useState<number>(0);
  const [btcPriceBRL, setBtcPriceBRL] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("input");
  const [copied, setCopied] = useState(false);

  const fakeTxId = "b7e3f1a9c4d2e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4";
  const SALDO_SATS = 1247830;

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [location.hash]);

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

  const resetGateway = () => {
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
        {/* Back */}
        <div className="section-padding pt-6 pb-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono tracking-wider text-xs">VOLTAR AO COMANDO</span>
          </motion.button>
        </div>

        {/* Hero */}
        <section className="section-padding pt-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">NÍVEL 03</span>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">DEFESA PATRIMONIAL</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  Independência{" "}<span className="text-gradient-gold">Operacional</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Protocolos de liquidez imediata, privacidade on-chain e liberdade geográfica. Sem intermediários, sem permissão.
                </p>
                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
                    "Não basta possuir Bitcoin; é preciso saber utilizá-lo como uma ferramenta de saída do curral bancário."
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
                  <img src={cardEstrategias} alt="Estratégias de Saída" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== LIGHTNING ===== */}
        <section id="lightning" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">LIGHTNING NETWORK</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-wealth">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Pagamentos na Velocidade da Luz</h2>
                  <p className="text-xs text-muted-foreground font-mono">CAMADA 2 DO BITCOIN</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                A Lightning Network é uma segunda camada construída sobre o Bitcoin que permite <strong className="text-foreground">transações instantâneas com taxas microscópicas</strong>. Enquanto uma TED bancária custa R$ 10+ e leva horas, uma transação Lightning custa ~1 satoshi (frações de centavo) e se confirma em milissegundos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Zap, title: "Instantâneo", desc: "Confirmação em menos de 3 segundos. Sem dias úteis.", color: "text-gold" },
                  { icon: Banknote, title: "Taxa: ~1 sat", desc: "Equivalente a R$ 0,003. Literalmente centésimos de centavo.", color: "text-gold" },
                  { icon: Globe, title: "Global 24/7", desc: "Funciona em qualquer lugar do mundo, a qualquer hora.", color: "text-gold" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-xl bg-secondary/30 border border-border text-center"
                  >
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="mt-8 overflow-hidden rounded-lg border border-border">
                <div className="grid grid-cols-3 text-[10px] font-mono tracking-wider text-muted-foreground bg-secondary/50 px-4 py-2">
                  <span>MÉTODO</span><span className="text-center">TAXA</span><span className="text-right">TEMPO</span>
                </div>
                {[
                  { method: "TED Bancário", fee: "R$ 10–20", time: "1–24h", highlight: false },
                  { method: "PIX", fee: "Grátis*", time: "Segundos", highlight: false },
                  { method: "Lightning ⚡", fee: "~R$ 0,003", time: "< 3s", highlight: true },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-border ${row.highlight ? "bg-gold/5" : ""}`}>
                    <span className={row.highlight ? "text-gold font-bold" : "text-foreground"}>{row.method}</span>
                    <span className={`text-center ${row.highlight ? "text-gold font-mono font-bold" : "text-muted-foreground"}`}>{row.fee}</span>
                    <span className={`text-right ${row.highlight ? "text-gold font-mono font-bold" : "text-muted-foreground"}`}>{row.time}</span>
                  </div>
                ))}
                <div className="px-4 py-2 text-[9px] text-muted-foreground bg-secondary/30">
                  *PIX é gratuito, mas o Banco Central controla, rastreia e pode bloquear a qualquer momento.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== GATEWAY SIMULATOR ===== */}
        <section id="gateway" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">O FIM DA DESCULPA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Phone Simulator */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex justify-center">
                <div className="relative w-[320px] rounded-[40px] border-2 border-border bg-card p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-10" />
                  <div className="w-full rounded-[32px] bg-background overflow-hidden">
                    <div className="flex items-center justify-between px-6 pt-8 pb-3">
                      <span className="font-mono text-[10px] text-muted-foreground">21:47</span>
                      <div className="flex gap-1 items-center">
                        <Zap className="w-3 h-3 text-gold" />
                        <span className="font-mono text-[10px] text-gold">Lightning</span>
                      </div>
                    </div>

                    <div className="px-5 pb-6">
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
                          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">CHAVE PIX DO DESTINATÁRIO</label>
                              <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="email, CPF ou telefone"
                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none transition-colors" />
                            </div>
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">VALOR EM R$</label>
                              <input type="number" value={valueBRL || ""} onChange={(e) => setValueBRL(Number(e.target.value))} placeholder="0,00"
                                className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none transition-colors" />
                            </div>
                            {valueBRL > 0 && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border border-border rounded-lg p-3 mb-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-[10px] text-muted-foreground font-mono">VALOR</p>
                                    <p className="text-lg font-semibold">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-gold" />
                                  <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground font-mono">DÉBITO</p>
                                    <p className="text-lg font-semibold text-gold">{satsAmount.toLocaleString("pt-BR")} sats</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                                  <span className="text-[9px] text-muted-foreground font-mono">TAXA DA REDE</span>
                                  <span className="text-[9px] text-gold font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                                </div>
                              </motion.div>
                            )}
                            <button onClick={handleConfirm} disabled={!pixKey || valueBRL <= 0}
                              className="w-full gradient-gold rounded-lg py-3 text-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
                              <span className="text-sm font-semibold text-primary-foreground">Confirmar via Lightning</span>
                            </button>
                            <p className="text-[9px] text-muted-foreground text-center mt-3 font-mono">GATEWAY DESCENTRALIZADO · SEM KYC</p>
                          </motion.div>
                        )}

                        {stage === "processing" && (
                          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 flex flex-col items-center gap-4">
                            <Loader2 className="w-10 h-10 text-gold animate-spin" />
                            <p className="font-mono text-sm text-gold animate-pulse">Gerando Invoice...</p>
                            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                              <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} className="h-full gradient-gold rounded-full" />
                            </div>
                            <p className="text-[9px] text-muted-foreground font-mono text-center">VALIDANDO INVOICE · PROPAGANDO HTLC · CONFIRMANDO ROTA</p>
                          </motion.div>
                        )}

                        {stage === "success" && (
                          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 flex flex-col items-center gap-3">
                            <CheckCircle2 className="w-12 h-12" style={{ color: "hsl(142, 71%, 45%)" }} />
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
                                <span style={{ color: "hsl(142, 71%, 45%)" }}>1 sat</span>
                              </div>
                              <div className="pt-2 border-t border-border/50">
                                <p className="text-[9px] text-muted-foreground font-mono mb-1">TX ID</p>
                                <div className="flex items-center gap-1 cursor-pointer group" onClick={handleCopyTx}>
                                  <code className="text-[8px] text-muted-foreground break-all group-hover:text-foreground transition-colors">{fakeTxId}</code>
                                  {copied ? <Check className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(142, 71%, 45%)" }} /> : <Copy className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                                </div>
                              </div>
                            </div>
                            <button onClick={resetGateway} className="w-full mt-2 py-2.5 rounded-lg border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/5 transition-colors">
                              Nova Operação
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="lg:pt-8">
                <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">GATEWAY DESCENTRALIZADO</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 mt-4 leading-tight">
                  PIX via{" "}<span className="text-gradient-gold">Bitcoin</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "Sem KYC", desc: "Nenhuma informação pessoal é coletada. Sem CPF, sem selfie, sem gerente." },
                    { icon: Zap, title: "Taxa Real: ~1 sat", desc: "Enquanto bancos cobram R$ 10+ por TED, a Lightning cobra frações de centavo." },
                    { icon: CheckCircle2, title: "Liquidação Instantânea", desc: "O pagamento PIX chega em segundos. Sem dias úteis, sem horário comercial." },
                  ].map((rule, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.15 }} className="flex gap-4 items-start">
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== P2P ===== */}
        <section id="p2p" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">ECONOMIA PARALELA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Transações P2P Sem KYC</h2>
                  <p className="text-xs text-muted-foreground font-mono">COMPRE E VENDA BITCOIN DIRETAMENTE, SEM INTERMEDIÁRIOS</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                P2P (Peer-to-Peer) significa que <strong className="text-foreground">você negocia diretamente com outra pessoa</strong>, sem nenhuma exchange centralizando seus dados ou retendo seus fundos. As plataformas abaixo são apenas pontos de encontro — a transação acontece entre vocês.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {p2pPlatforms.map((platform, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-wealth group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg group-hover:text-gold transition-colors">{platform.name}</h3>
                    <Lock className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{platform.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {platform.tags.map((tag, j) => (
                      <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded bg-gold/5 border border-gold/10 text-gold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-gold hover:underline font-mono">
                    <ExternalLink className="w-3 h-3" /> Acessar plataforma
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/10 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-bold mb-1">Regra de Ouro do P2P</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nunca envie Bitcoin antes de confirmar o recebimento do pagamento em fiat. Use sempre o escrow da plataforma quando disponível. Comece com valores pequenos para construir reputação.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== EMERGENCY MANUAL ===== */}
        <section className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PROTOCOLO FINAL</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>
            <EmergencyManual />
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="section-padding py-12">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">NÍVEL FINAL: COSMOVISÃO & DISCERNIMENTO</p>
            <button onClick={() => navigate("/filosofia")} className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-bold text-sm hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all">
              Avançar para Nível 04 →
            </button>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-10" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mt-4">SISTEMA OPERACIONAL DE SOBERANIA</p>
          </div>
        </motion.div>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default Saida;
