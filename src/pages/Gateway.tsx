import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Zap, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Copy, Check, Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

type Stage = "input" | "processing" | "success";

const Gateway = () => {
  const [pixKey, setPixKey] = useState("");
  const [valueBRL, setValueBRL] = useState<number>(0);
  const [btcPriceBRL, setBtcPriceBRL] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("input");
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const fakeTxId = "b7e3f1a9c4d2e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4";
  const SALDO_SATS = 1247830;

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Gateway PIX via Bitcoin | Liquidez Descentralizada</title>
        <meta name="description" content="Converta Bitcoin em PIX instantaneamente via Lightning Network. Sem KYC, sem banco, sem intermediário. Taxa de ~1 sat." />
        <meta name="keywords" content="pix via bitcoin, lightning network pix, gateway bitcoin, converter bitcoin reais, bitcoin sem kyc, pagamento lightning" />
        <meta property="og:title" content="Gateway PIX via Bitcoin | Lightning Network" />
        <meta property="og:description" content="Converta Bitcoin em PIX instantaneamente. Sem KYC, taxa de ~1 sat." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lordjunnior.com.br/saida/gateway" />
      </Helmet>

      <ScrollToTop />

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
      />

      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(245,158,11,0.06) 50%, transparent 70%)' }} />
      </div>

      {/* ═══ CINEMATIC HERO ═══ */}
      <CinematicHero
        image="/heroes/economia-paralela.webp"
        phase="Gateway Descentralizado"
        title={<>PIX via <span style={{ color: '#f59e0b' }}>Bitcoin</span></>}
        subtitle="Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco. Conversão instantânea via Lightning Network com taxa de ~1 satoshi."
        icon={Zap}
        accentColor="amber"
        backLink="/saida"
        backLabel="Estratégias de Saída"
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative z-10 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Phone Simulator */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex justify-center"
          >
            <div className="relative w-[320px] rounded-[40px] border-2 border-white/[0.08] p-3 shadow-2xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-b-2xl z-10" style={{ background: '#050808' }} />
              <div className="w-full rounded-[32px] overflow-hidden" style={{ background: '#0a0e0e' }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-8 pb-3">
                  <span className="font-mono text-[10px] text-stone-600">21:47</span>
                  <div className="flex gap-1 items-center">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="font-mono text-[10px] text-amber-400">Lightning</span>
                  </div>
                </div>

                <div className="px-5 pb-6">
                  {/* Balance */}
                  <div className="mb-6">
                    <p className="text-[10px] text-stone-600 font-mono mb-1">SALDO DISPONÍVEL</p>
                    <p className="text-2xl font-bold text-white">
                      {SALDO_SATS.toLocaleString("pt-BR")}{" "}
                      <span className="text-sm text-amber-400">sats</span>
                    </p>
                    <p className="text-[9px] text-stone-600 font-mono mt-1">
                      BTC/BRL {btcPriceBRL ? `R$ ${btcPriceBRL.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---"}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {stage === "input" && (
                      <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="mb-4">
                          <label className="text-[10px] text-stone-600 font-mono block mb-1.5">CHAVE PIX DO DESTINATÁRIO</label>
                          <input
                            type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)}
                            placeholder="email, CPF ou telefone"
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-stone-700 focus:border-amber-500/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="text-[10px] text-stone-600 font-mono block mb-1.5">VALOR EM R$</label>
                          <input
                            type="number" value={valueBRL || ""} onChange={(e) => setValueBRL(Number(e.target.value))}
                            placeholder="0,00"
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-stone-700 focus:border-amber-500/50 focus:outline-none transition-colors"
                          />
                        </div>
                        {valueBRL > 0 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border border-white/[0.08] rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[10px] text-stone-600 font-mono">VALOR</p>
                                <p className="text-lg font-semibold text-white">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-amber-400" />
                              <div className="text-right">
                                <p className="text-[10px] text-stone-600 font-mono">DÉBITO</p>
                                <p className="text-lg font-semibold text-amber-400">{satsAmount.toLocaleString("pt-BR")} sats</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                              <span className="text-[9px] text-stone-600 font-mono">TAXA DA REDE</span>
                              <span className="text-[9px] text-emerald-400 font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                            </div>
                          </motion.div>
                        )}
                        <button
                          onClick={handleConfirm} disabled={!pixKey || valueBRL <= 0}
                          className="w-full rounded-lg py-3 text-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity font-semibold text-sm text-stone-900"
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                        >
                          Confirmar via Lightning
                        </button>
                        <p className="text-[9px] text-stone-700 text-center mt-3 font-mono">GATEWAY DESCENTRALIZADO · SEM KYC</p>
                      </motion.div>
                    )}

                    {stage === "processing" && (
                      <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
                        <p className="font-mono text-sm text-amber-400 animate-pulse">Gerando Invoice...</p>
                        <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                          <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />
                        </div>
                        <p className="text-[9px] text-stone-600 font-mono text-center">VALIDANDO INVOICE · PROPAGANDO HTLC · CONFIRMANDO ROTA</p>
                      </motion.div>
                    )}

                    {stage === "success" && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 flex flex-col items-center gap-3">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        <p className="font-bold text-white">Operação Concluída</p>
                        <div className="w-full border border-white/[0.08] rounded-lg p-3 space-y-2">
                          <div className="flex justify-between text-xs"><span className="text-stone-600">Destino PIX</span><span className="text-white font-mono">{pixKey}</span></div>
                          <div className="flex justify-between text-xs"><span className="text-stone-600">Valor</span><span className="text-white">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
                          <div className="flex justify-between text-xs"><span className="text-stone-600">Debitado</span><span className="text-amber-400 font-bold">{satsAmount.toLocaleString("pt-BR")} sats</span></div>
                          <div className="flex justify-between text-xs"><span className="text-stone-600">Taxa</span><span className="text-emerald-400">1 sat</span></div>
                          <div className="pt-2 border-t border-white/[0.06]">
                            <p className="text-[9px] text-stone-600 font-mono mb-1">TX ID</p>
                            <div className="flex items-center gap-1 cursor-pointer group" onClick={handleCopyTx}>
                              <code className="text-[8px] text-stone-600 break-all group-hover:text-white transition-colors">{fakeTxId}</code>
                              {copied ? <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" /> : <Copy className="w-3 h-3 text-stone-600 flex-shrink-0" />}
                            </div>
                          </div>
                        </div>
                        <button onClick={reset} className="w-full mt-2 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/5 transition-colors">
                          Nova Operação
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <div className="space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Sem KYC", desc: "Nenhuma informação pessoal é coletada. Sem CPF, sem selfie, sem gerente.", accent: '#f59e0b' },
                { icon: Zap, title: "Taxa Real: ~1 sat", desc: "Enquanto bancos cobram R$ 10+ por TED, a Lightning cobra frações de centavo.", accent: '#f59e0b' },
                { icon: CheckCircle2, title: "Liquidação Instantânea", desc: "O pagamento PIX chega em segundos. Sem dias úteis, sem horário comercial.", accent: '#10b981' },
              ].map((rule, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border" style={{ background: `${rule.accent}10`, borderColor: `${rule.accent}25` }}>
                    <rule.icon className="w-5 h-5" style={{ color: rule.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-1">{rule.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{rule.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Comparison */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <div className="rounded-2xl border border-white/[0.06] p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="font-mono text-[10px] tracking-widest text-stone-600 mb-4 uppercase">Comparativo de Taxas</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">TED Bancário</span>
                    <span className="text-red-400 font-mono font-bold">R$ 10,00 – R$ 22,00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">PIX (com taxa oculta de dados)</span>
                    <span className="text-red-400 font-mono font-bold">Seu CPF + Rastreio</span>
                  </div>
                  <div className="h-px bg-white/[0.06] my-1" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">Lightning Network</span>
                    <span className="text-emerald-400 font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Not your keys. Not your money.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Gateway;
