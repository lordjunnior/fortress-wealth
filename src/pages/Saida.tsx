import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Zap, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Copy, Check,
  Users, Lock, Globe, AlertTriangle, ExternalLink, Banknote, ChevronDown
} from "lucide-react";
import EmergencyManual from "@/components/EmergencyManual";
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Stage = "input" | "processing" | "success";

const p2pPlatforms = [
  { name: "Bisq", desc: "Exchange descentralizada, open-source, sem KYC. Roda no seu computador como um node P2P.", link: "https://bisq.network", tags: ["Open Source", "Desktop", "Sem KYC"] },
  { name: "RoboSats", desc: "Troca P2P via Lightning Network com identidades descartáveis (robôs). Rápido e privado.", link: "https://robosats.com", tags: ["Lightning", "Tor", "Anônimo"] },
  { name: "Peach Bitcoin", desc: "App mobile para comprar Bitcoin sem KYC. Matchmaking P2P com escrow automático.", link: "https://peachbitcoin.com", tags: ["Mobile", "Escrow", "Simples"] },
];

const FAQ_ITEMS = [
  { q: "O que é Lightning Network?", a: "É uma segunda camada construída sobre o Bitcoin que permite transações instantâneas com taxas microscópicas (~1 satoshi). Enquanto uma transação on-chain pode levar 10 minutos, a Lightning confirma em menos de 3 segundos." },
  { q: "O que significa comprar Bitcoin sem KYC?", a: "KYC (Know Your Customer) é a exigência de identificação pessoal. Comprar sem KYC significa adquirir Bitcoin sem fornecer documentos, CPF ou selfie, preservando sua privacidade financeira." },
  { q: "O que é uma exchange P2P?", a: "É uma plataforma onde você negocia Bitcoin diretamente com outra pessoa, sem intermediário centralizado. Exemplos: Bisq, RoboSats e Peach Bitcoin." },
  { q: "É seguro usar plataformas P2P?", a: "Sim, quando se segue a regra de ouro: nunca envie Bitcoin antes de confirmar o recebimento em fiat. Use sempre o escrow da plataforma e comece com valores pequenos para construir reputação." },
  { q: "Qual a diferença entre Lightning e PIX?", a: "O PIX é gratuito mas controlado, rastreado e pode ser bloqueado pelo Banco Central a qualquer momento. A Lightning é descentralizada, privada e funciona 24/7 globalmente sem depender de nenhuma autoridade." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Independência Operacional — Defesa Patrimonial",
  description: "Protocolos de liquidez imediata via Lightning Network, P2P sem KYC e gateway descentralizado PIX-Bitcoin.",
  author: { "@type": "Person", name: "Lord Junnior" },
  publisher: { "@type": "Organization", name: "Autonomia do Indivíduo" },
  url: "https://autonomiadoindividuo.com/saida"
};

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full"><filter id="grain-exit"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#grain-exit)" /></svg>
  </div>
);
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-1/2 -left-1/4 w-full h-[200%] opacity-[0.02]" style={{ background: 'linear-gradient(115deg, transparent 40%, hsl(var(--destructive)) 50%, transparent 60%)' }} />
  </div>
);

const Saida = () => {
  const location = useLocation();
  const [pixKey, setPixKey] = useState("");
  const [valueBRL, setValueBRL] = useState<number>(0);
  const [btcPriceBRL, setBtcPriceBRL] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>("input");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fakeTxId = "b7e3f1a9c4d2e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4";
  const SALDO_SATS = 1247830;

  useEffect(() => {
    if (location.hash) { setTimeout(() => { document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 600); }
    else { window.scrollTo(0, 0); }
  }, [location.hash]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const [mempoolRes, fxRes] = await Promise.all([fetch("https://mempool.space/api/v1/prices"), fetch("https://open.er-api.com/v6/latest/USD")]);
        if (mempoolRes.ok && fxRes.ok) { const m = await mempoolRes.json(); const f = await fxRes.json(); setBtcPriceBRL(m.USD * (f.rates?.BRL ?? 5.1)); }
      } catch { setBtcPriceBRL(540000); }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const satsAmount = valueBRL > 0 && btcPriceBRL ? Math.round((valueBRL / btcPriceBRL) * 100_000_000) : 0;
  const handleConfirm = () => { if (!pixKey || valueBRL <= 0) return; setStage("processing"); setTimeout(() => setStage("success"), 3500); };
  const handleCopyTx = () => { navigator.clipboard.writeText(fakeTxId); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const resetGateway = () => { setStage("input"); setPixKey(""); setValueBRL(0); };

  return (
    <>
      <Helmet>
        <title>Independência Operacional — Defesa Patrimonial | Autonomia do Indivíduo</title>
        <meta name="description" content="Protocolos de liquidez imediata via Lightning Network, P2P sem KYC e gateway descentralizado PIX-Bitcoin. Sem intermediários, sem permissão." />
        <meta name="keywords" content="lightning network, bitcoin p2p, sem kyc, bisq, robosats, peach bitcoin, pix bitcoin, gateway descentralizado" />
        <meta property="og:title" content="Independência Operacional — Defesa Patrimonial" />
        <meta property="og:description" content="Não basta possuir Bitcoin; é preciso saber utilizá-lo como ferramenta de saída do curral bancário." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://autonomiadoindividuo.com/saida" />
        <link rel="canonical" href="https://autonomiadoindividuo.com/saida" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#050808] text-foreground font-sans selection:bg-destructive selection:text-destructive-foreground relative overflow-hidden">
        <FilmGrain />
        <LightBeams />
        <ScrollToTop />

        {/* ── Cinematic Hero ── */}
        <CinematicHero
          image="/heroes/economia-paralela.webp"
          phase="Nível 03 · Defesa Patrimonial"
          title={<>Independência<br /><span className="text-destructive italic font-light">Operacional</span></>}
          subtitle="Protocolos de liquidez imediata, privacidade on-chain e liberdade geográfica. Sem intermediários, sem permissão."
          icon={Zap}
          accentColor="rose"
          backLink="/"
          backLabel="Retornar ao Comando"
        />

        {/* ── Lightning Network ── */}
        <section id="lightning" className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">LIGHTNING NETWORK</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center"><Zap className="w-6 h-6 text-amber-400" /></div>
                <div>
                  <h2 className="font-bold text-xl">Pagamentos na Velocidade da Luz</h2>
                  <p className="text-xs text-muted-foreground font-mono">CAMADA 2 DO BITCOIN</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                A Lightning Network é uma segunda camada construída sobre o Bitcoin que permite <strong className="text-foreground">transações instantâneas com taxas microscópicas</strong>. Enquanto uma TED bancária custa R$ 10+ e leva horas, uma transação Lightning custa ~1 satoshi e se confirma em milissegundos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Zap, title: "Instantâneo", desc: "Confirmação em menos de 3 segundos. Sem dias úteis." },
                  { icon: Banknote, title: "Taxa: ~1 sat", desc: "Equivalente a R$ 0,003. Centésimos de centavo." },
                  { icon: Globe, title: "Global 24/7", desc: "Funciona em qualquer lugar do mundo, a qualquer hora." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/[0.03] border border-border/30 text-center">
                    <item.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-lg border border-border/30">
                <div className="grid grid-cols-3 text-[10px] font-mono tracking-wider text-muted-foreground bg-white/[0.03] px-4 py-2">
                  <span>MÉTODO</span><span className="text-center">TAXA</span><span className="text-right">TEMPO</span>
                </div>
                {[
                  { method: "TED Bancário", fee: "R$ 10–20", time: "1–24h", highlight: false },
                  { method: "PIX", fee: "Grátis*", time: "Segundos", highlight: false },
                  { method: "Lightning", fee: "~R$ 0,003", time: "< 3s", highlight: true },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-border/30 ${row.highlight ? "bg-amber-500/5" : ""}`}>
                    <span className={row.highlight ? "text-amber-400 font-bold" : "text-foreground"}>{row.method}</span>
                    <span className={`text-center ${row.highlight ? "text-amber-400 font-mono font-bold" : "text-muted-foreground"}`}>{row.fee}</span>
                    <span className={`text-right ${row.highlight ? "text-amber-400 font-mono font-bold" : "text-muted-foreground"}`}>{row.time}</span>
                  </div>
                ))}
                <div className="px-4 py-2 text-[9px] text-muted-foreground bg-white/[0.02]">*PIX é gratuito, mas o Banco Central controla, rastreia e pode bloquear a qualquer momento.</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Gateway Simulator ── */}
        <section id="gateway" className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">O FIM DA DESCULPA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Phone Simulator */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center">
                <div className="relative w-[320px] rounded-[40px] border-2 border-border/30 bg-card p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#050808] rounded-b-2xl z-10" />
                  <div className="w-full rounded-[32px] bg-[#050808] overflow-hidden">
                    <div className="flex items-center justify-between px-6 pt-8 pb-3">
                      <span className="font-mono text-[10px] text-muted-foreground">21:47</span>
                      <div className="flex gap-1 items-center"><Zap className="w-3 h-3 text-amber-400" /><span className="font-mono text-[10px] text-amber-400">Lightning</span></div>
                    </div>
                    <div className="px-5 pb-6">
                      <div className="mb-6">
                        <p className="text-[10px] text-muted-foreground font-mono mb-1">SALDO DISPONÍVEL</p>
                        <p className="text-2xl font-bold text-foreground">{SALDO_SATS.toLocaleString("pt-BR")} <span className="text-sm text-amber-400">sats</span></p>
                        <p className="text-[9px] text-muted-foreground font-mono mt-1">BTC/BRL {btcPriceBRL ? `R$ ${btcPriceBRL.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}` : "---"}</p>
                      </div>
                      <AnimatePresence mode="wait">
                        {stage === "input" && (
                          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">CHAVE PIX DO DESTINATÁRIO</label>
                              <input type="text" value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="email, CPF ou telefone"
                                className="w-full bg-white/[0.03] border border-border/30 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-amber-400/50 focus:outline-none transition-colors" />
                            </div>
                            <div className="mb-4">
                              <label className="text-[10px] text-muted-foreground font-mono block mb-1.5">VALOR EM R$</label>
                              <input type="number" value={valueBRL || ""} onChange={(e) => setValueBRL(Number(e.target.value))} placeholder="0,00"
                                className="w-full bg-white/[0.03] border border-border/30 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-amber-400/50 focus:outline-none transition-colors" />
                            </div>
                            {valueBRL > 0 && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border border-border/30 rounded-lg p-3 mb-4">
                                <div className="flex items-center justify-between">
                                  <div><p className="text-[10px] text-muted-foreground font-mono">VALOR</p><p className="text-lg font-semibold">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p></div>
                                  <ArrowRight className="w-4 h-4 text-amber-400" />
                                  <div className="text-right"><p className="text-[10px] text-muted-foreground font-mono">DÉBITO</p><p className="text-lg font-semibold text-amber-400">{satsAmount.toLocaleString("pt-BR")} sats</p></div>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                                  <span className="text-[9px] text-muted-foreground font-mono">TAXA DA REDE</span>
                                  <span className="text-[9px] text-amber-400 font-mono font-bold">~1 sat (≈ R$ 0,00)</span>
                                </div>
                              </motion.div>
                            )}
                            <button onClick={handleConfirm} disabled={!pixKey || valueBRL <= 0}
                              className="w-full bg-amber-500 rounded-lg py-3 text-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
                              <span className="text-sm font-semibold text-black">Confirmar via Lightning</span>
                            </button>
                            <p className="text-[9px] text-muted-foreground text-center mt-3 font-mono">GATEWAY DESCENTRALIZADO · SEM KYC</p>
                          </motion.div>
                        )}
                        {stage === "processing" && (
                          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 flex flex-col items-center gap-4">
                            <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
                            <p className="font-mono text-sm text-amber-400 animate-pulse">Gerando Invoice...</p>
                            <div className="w-full bg-white/[0.03] rounded-full h-1.5 overflow-hidden">
                              <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} className="h-full bg-amber-500 rounded-full" />
                            </div>
                            <p className="text-[9px] text-muted-foreground font-mono text-center">VALIDANDO INVOICE · PROPAGANDO HTLC · CONFIRMANDO ROTA</p>
                          </motion.div>
                        )}
                        {stage === "success" && (
                          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 flex flex-col items-center gap-3">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                            <p className="font-bold text-foreground">Operação Concluída</p>
                            <div className="w-full border border-border/30 rounded-lg p-3 space-y-2">
                              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Destino PIX</span><span className="text-foreground font-mono">{pixKey}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Valor</span><span className="text-foreground">R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Debitado</span><span className="text-amber-400 font-bold">{satsAmount.toLocaleString("pt-BR")} sats</span></div>
                              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Taxa</span><span className="text-emerald-400">1 sat</span></div>
                              <div className="pt-2 border-t border-border/20">
                                <p className="text-[9px] text-muted-foreground font-mono mb-1">TX ID</p>
                                <div className="flex items-center gap-1 cursor-pointer group" onClick={handleCopyTx}>
                                  <code className="text-[8px] text-muted-foreground break-all group-hover:text-foreground transition-colors">{fakeTxId}</code>
                                  {copied ? <Check className="w-3 h-3 flex-shrink-0 text-emerald-400" /> : <Copy className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                                </div>
                              </div>
                            </div>
                            <button onClick={resetGateway} className="w-full mt-2 py-2.5 rounded-lg border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/5 transition-colors">Nova Operação</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side */}
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pt-8">
                <span className="font-mono text-[10px] tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">GATEWAY DESCENTRALIZADO</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 mt-4 leading-tight">
                  PIX via <span className="text-amber-400">Bitcoin</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco.</p>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "Sem KYC", desc: "Nenhuma informação pessoal é coletada. Sem CPF, sem selfie, sem gerente." },
                    { icon: Zap, title: "Taxa Real: ~1 sat", desc: "Enquanto bancos cobram R$ 10+ por TED, a Lightning cobra frações de centavo." },
                    { icon: CheckCircle2, title: "Liquidação Instantânea", desc: "O pagamento PIX chega em segundos. Sem dias úteis, sem horário comercial." },
                  ].map((rule, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0"><rule.icon className="w-5 h-5 text-amber-400" /></div>
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

        {/* ── P2P ── */}
        <section id="p2p" className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">ECONOMIA PARALELA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-amber-400" /></div>
              <div>
                <h2 className="font-bold text-xl">Transações P2P Sem KYC</h2>
                <p className="text-xs text-muted-foreground font-mono">COMPRE E VENDA BITCOIN DIRETAMENTE</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              P2P (Peer-to-Peer) significa que <strong className="text-foreground">você negocia diretamente com outra pessoa</strong>, sem nenhuma exchange centralizando seus dados ou retendo seus fundos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {p2pPlatforms.map((platform, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-border/30 group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg group-hover:text-amber-400 transition-colors">{platform.name}</h3>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{platform.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {platform.tags.map((tag, j) => (
                      <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/5 border border-amber-500/10 text-amber-400">{tag}</span>
                    ))}
                  </div>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-amber-400 hover:underline font-mono">
                    <ExternalLink className="w-3 h-3" /> Acessar plataforma
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-bold mb-1">Regra de Ouro do P2P</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nunca envie Bitcoin antes de confirmar o recebimento do pagamento em fiat. Use sempre o escrow da plataforma quando disponível. Comece com valores pequenos para construir reputação.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Emergency Manual ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PROTOCOLO FINAL</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <EmergencyManual />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">PERGUNTAS FREQUENTES</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-xl border border-border/30 bg-white/[0.02] overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                    <span className="text-sm font-semibold text-foreground pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">NÍVEL FINAL: COSMOVISÃO & DISCERNIMENTO</p>
            <Link to="/filosofia" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-destructive text-destructive-foreground font-bold text-sm hover:opacity-90 transition-opacity">
              Avançar para Nível 04 <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border/30 to-transparent mt-10" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mt-4">SISTEMA OPERACIONAL DE SOBERANIA</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Saida;
