import PageFloatingToc from "@/components/PageFloatingToc";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft, Shield, Cpu, HardDrive, Key, ExternalLink, ArrowRight,
  Bitcoin as BtcIcon, Home, TrendingUp, Info, AlertTriangle, Server, Wifi,
  ChevronDown
} from "lucide-react";
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import SimboloOculto from '@/components/SimboloOculto';
import SnippetBait from '@/components/SnippetBait';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wallets = [
  { name: "Ledger Nano S Plus", type: "Hardware Wallet", security: "Chip Secure Element (CC EAL5+)", price: "~R$ 500", link: "https://www.ledger.com", pros: ["Mais de 5.500 ativos", "Bluetooth", "Tela grande"] },
  { name: "Trezor Model One", type: "Hardware Wallet", security: "Open Source Firmware", price: "~R$ 400", link: "https://trezor.io", pros: ["Código aberto", "Simples de usar", "Comunidade ativa"] },
  { name: "Coldcard Mk4", type: "Air-gapped Wallet", security: "Dual Secure Element + Air-gap", price: "~R$ 800", link: "https://coldcard.com", pros: ["100% offline", "Focada em Bitcoin", "Nível militar"] },
  { name: "SeedSigner", type: "DIY Air-gapped", security: "Open Source + Raspberry Pi", price: "~R$ 200 (DIY)", link: "https://seedsigner.com", pros: ["Faça você mesmo", "Sem firmware proprietário", "Descartável"] },
];

const nodeSteps = [
  { title: "Escolha o Hardware", desc: "Raspberry Pi 4 (4GB+) ou um PC antigo com 1TB de SSD. Custo total: ~R$ 800.", icon: Cpu },
  { title: "Instale o Sistema", desc: "Use Umbrel, Start9, ou RaspiBlitz. Interface gráfica, sem necessidade de linha de comando.", icon: Server },
  { title: "Sincronize a Blockchain", desc: "O node vai baixar e verificar todas as transações desde 2009. Leva de 2 a 7 dias.", icon: HardDrive },
  { title: "Conecte sua Wallet", desc: "Aponte sua carteira (Sparrow, Electrum) para o seu próprio node. Agora você não depende de ninguém.", icon: Wifi },
];

const comparisonData = [
  { year: "2014", btc: 100, imovel: 100 }, { year: "2015", btc: 135, imovel: 95 },
  { year: "2016", btc: 280, imovel: 90 }, { year: "2017", btc: 4200, imovel: 92 },
  { year: "2018", btc: 1100, imovel: 93 }, { year: "2019", btc: 2200, imovel: 96 },
  { year: "2020", btc: 8500, imovel: 100 }, { year: "2021", btc: 19000, imovel: 108 },
  { year: "2022", btc: 5500, imovel: 112 }, { year: "2023", btc: 12000, imovel: 115 },
  { year: "2024", btc: 32000, imovel: 118 },
];

const FAQ_ITEMS = [
  { q: "O que é autocustódia de Bitcoin?", a: "Autocustódia significa que você controla as chaves privadas das suas moedas, sem depender de exchanges ou bancos. Se você não tem as chaves, as moedas não são suas." },
  { q: "Qual a melhor hardware wallet para iniciantes?", a: "Para iniciantes, a Trezor Model One ou Ledger Nano S Plus são excelentes opções. São fáceis de usar, têm interfaces intuitivas e custam entre R$ 400-500." },
  { q: "Por que rodar meu próprio node Bitcoin?", a: "Rodar um node significa que você verifica todas as transações sozinho, sem confiar em terceiros. Isso garante privacidade total e contribui para a descentralização da rede." },
  { q: "Bitcoin é melhor investimento que imóvel?", a: "Historicamente, R$ 100 investidos em Bitcoin em 2014 valeriam ~R$ 32.000 hoje, enquanto o mesmo em imóvel estaria em ~R$ 118. Bitcoin supera imóveis pela escassez matemática absoluta de 21 milhões de unidades." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Blindagem Operacional — Soberania Bitcoin",
  description: "Guia completo de autocustódia, hardware wallets, node Bitcoin e comparativo BTC vs imóveis.",
  author: { "@type": "Person", name: "Lord Junnior" },
  publisher: { "@type": "Organization", name: "Lord Junnior" },
  url: "https://lordjunnior.com.br/bitcoin"
};


const TOC_ITEMS = [
  { id: "autocustodia", label: "Autocustódia" },
  { id: "semente", label: "Hardware Wallets" },
  { id: "node", label: "Node Soberano" },
  { id: "btc-vs-imovel", label: "Bitcoin vs Imóvel" },
];

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full"><filter id="grain-btc"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#grain-btc)" /></svg>
  </div>
);
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-1/2 -left-1/4 w-full h-[200%] opacity-[0.02]" style={{ background: 'linear-gradient(115deg, transparent 40%, hsl(40, 92%, 56%) 50%, transparent 60%)' }} />
  </div>
);

const Bitcoin = () => {
  const location = useLocation();
  const [propertyValue, setPropertyValue] = useState(500000);
  const [rentValue, setRentValue] = useState(2500);
  const [showSimResult, setShowSimResult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const BTC_APPRECIATION = 2.85;
  const REAL_ESTATE_APPRECIATION = 0.18;
  const BTC_DCA_MULTIPLIER = 1.9;
  const scenarioSellBuy = propertyValue * (1 + BTC_APPRECIATION);
  const scenarioKeep = propertyValue * (1 + REAL_ESTATE_APPRECIATION);
  const totalRentInvested = rentValue * 36;
  const rentGains = totalRentInvested * BTC_DCA_MULTIPLIER;
  const scenarioRentInvest = propertyValue * (1 + REAL_ESTATE_APPRECIATION) + rentGains;
  const formatCurrency = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => { document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 600);
    } else { window.scrollTo(0, 0); }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>Blindagem Operacional — Soberania Bitcoin | Autonomia do Indivíduo</title>
        <meta name="description" content="Guia completo de autocustódia Bitcoin: hardware wallets (Ledger, Trezor, Coldcard), como rodar seu próprio node e simulador BTC vs Imóveis." />
        <meta name="keywords" content="autocustódia bitcoin, hardware wallet, ledger, trezor, coldcard, node bitcoin, bitcoin vs imóvel, soberania financeira" />
        <meta property="og:title" content="Blindagem Operacional — Soberania Bitcoin" />
        <meta property="og:description" content="Se você não tem as chaves, as moedas não são suas. Guia completo de autocustódia." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/bitcoin" />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      <div className="min-h-screen bg-[#050808] text-foreground font-sans selection:bg-amber-600 selection:text-white relative overflow-hidden">
        <FilmGrain />
        <LightBeams />

        {/* ── Cinematic Hero ── */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
            <div className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url('/heroes/entenda-bitcoin.webp')`, filter: 'brightness(0.4) saturate(0.85)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.15) 0%, rgba(5,8,8,0.5) 50%, rgba(5,8,8,0.92) 80%, rgba(5,8,8,1) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
          </motion.div>
          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16" style={{ opacity: contentOpacity }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retornar ao Comando
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400 opacity-70">NÍVEL 02 · SOBERANIA BITCOIN</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15, ease: APPLE_EASE }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Blindagem<br /><span className="text-amber-400 italic font-light">Operacional</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mt-3">
              A transição da teoria para a posse real do capital. Se você não tem as chaves, as moedas não são suas.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} className="flex items-center gap-2 mt-8">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown size={14} className="text-muted-foreground" /></motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60">Role para explorar</span>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </section>

        {/* ── SnippetBait ── */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20">
          <SnippetBait
            text="O Real perdeu 87% do seu poder de compra desde o Plano Real. Quem entendeu isso, migrou para um ativo com oferta fixa e sem fronteiras. Quem não entendeu, continua financiando o próprio empobrecimento."
            cta="Conheça a autocustódia de elite →"
            href="/autocustodia"
          />
        </div>

        {/* ── Mantra ── */}
        <section id="autocustodia" className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <Key className="w-5 h-5 text-amber-400" />
              <p className="font-mono text-sm md:text-base text-amber-400 font-bold tracking-wider">"NOT YOUR KEYS, NOT YOUR COINS"</p>
              <Key className="w-5 h-5 text-amber-400" />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
              Se as suas moedas estão em uma corretora, você não possui Bitcoin. Você possui uma promessa de pagamento que pode ser bloqueada a qualquer momento.
              <SimboloOculto id="semente" className="ml-1.5 align-middle" />
            </p>
          </div>
        </section>

        {/* ── Hardware Wallets ── */}
        <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">AUTOCUSTÓDIA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {wallets.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-border/30 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-400" /></div>
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-amber-400 transition-colors">{w.name}</h3>
                        <p className="text-[10px] text-muted-foreground font-mono">{w.type}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-amber-400 font-bold">{w.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3"><span className="text-foreground font-medium">Segurança:</span> {w.security}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {w.pros.map((p, j) => (
                      <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-border/30 text-muted-foreground">{p}</span>
                    ))}
                  </div>
                  <a href={w.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-amber-400 hover:underline font-mono">
                    <ExternalLink className="w-3 h-3" /> Site oficial
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Node ── */}
        <section id="node" className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">INFRAESTRUTURA SOBERANA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><Server className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h2 className="font-bold text-xl">Don't Trust, Verify</h2>
                  <p className="text-xs text-muted-foreground font-mono">RODE SEU PRÓPRIO NODE BITCOIN</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Um node Bitcoin é a sua própria cópia da blockchain. Quando você roda um, você <strong className="text-foreground">não precisa confiar em ninguém</strong> para saber se uma transação é legítima.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {nodeSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center bg-[#050808] flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BTC vs Imóvel ── */}
        <section id="btc-vs-imovel" className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SIMULADOR INTEGRADO</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h2 className="font-bold text-lg">Bitcoin vs Imóveis — 10 Anos</h2>
                  <p className="text-xs text-muted-foreground font-mono">PODER DE COMPRA INDEXADO (BASE 100 EM 2014)</p>
                </div>
              </div>
              <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} />
                    <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "monospace" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} scale="log" domain={[50, 50000]} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(222, 40%, 8%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px" }}
                      formatter={(value: number, name: string) => [`${value.toLocaleString("pt-BR")}x`, name === "btc" ? "Bitcoin" : "Imóvel"]} />
                    <Legend formatter={(v) => (v === "btc" ? "Bitcoin" : "Imóvel")} wrapperStyle={{ fontFamily: "monospace", fontSize: "11px" }} />
                    <Line type="monotone" dataKey="btc" stroke="hsl(40, 92%, 56%)" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="imovel" stroke="hsl(215, 15%, 55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-400 font-bold">R$ 100 em Bitcoin em 2014 valeriam ~R$ 32.000 hoje.</span>{" "}
                  O mesmo valor em imóvel estaria em R$ 118, mal acompanhando a inflação.
                </p>
              </div>
            </motion.div>

            {/* Simulator */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><BtcIcon className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h2 className="font-bold text-lg">Simulador: Vender ou Manter?</h2>
                  <p className="text-xs text-muted-foreground font-mono">COMPARE 3 ESTRATÉGIAS EM 3 ANOS</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="text-xs text-muted-foreground font-mono block mb-2">VALOR DO IMÓVEL (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                    <input type="number" value={propertyValue} onChange={(e) => { setPropertyValue(Number(e.target.value)); setShowSimResult(false); }}
                      className="w-full bg-white/[0.03] border border-border/30 rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-amber-400/50 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono block mb-2">ALUGUEL MENSAL (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                    <input type="number" value={rentValue} onChange={(e) => { setRentValue(Number(e.target.value)); setShowSimResult(false); }}
                      className="w-full bg-white/[0.03] border border-border/30 rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-amber-400/50 focus:outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <button onClick={() => setShowSimResult(true)} disabled={propertyValue <= 0}
                className="w-full py-3.5 rounded-lg bg-amber-500 text-black font-bold text-sm disabled:opacity-40 mb-6">Calcular Cenários</button>

              {showSimResult && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-black text-[9px] font-bold font-mono rounded-bl-xl">MAIOR RETORNO</div>
                    <div className="flex items-center gap-3 mb-2"><BtcIcon className="w-5 h-5 text-amber-400" /><h3 className="font-bold text-sm">Vender Imóvel & Comprar Bitcoin</h3></div>
                    <p className="text-2xl font-bold font-mono text-amber-400">{formatCurrency(scenarioSellBuy)}</p>
                    <p className="text-xs font-mono mt-1 text-emerald-400">+{((scenarioSellBuy - propertyValue) / propertyValue * 100).toFixed(0)}% em 3 anos</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/30 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-2"><TrendingUp className="w-5 h-5 text-amber-400" /><h3 className="font-bold text-sm">Alugar & Investir em Bitcoin (DCA)</h3></div>
                    <p className="text-xl font-bold font-mono text-foreground">{formatCurrency(scenarioRentInvest)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Patrimônio preservado + renda potencializada</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/30 bg-white/[0.01] opacity-70">
                    <div className="flex items-center gap-3 mb-2"><Home className="w-5 h-5 text-muted-foreground" /><h3 className="font-bold text-sm">Manter Imóvel</h3></div>
                    <p className="text-xl font-bold font-mono text-muted-foreground">{formatCurrency(scenarioKeep)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Apenas valorização imobiliária (+{(REAL_ESTATE_APPRECIATION * 100).toFixed(0)}%)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 flex gap-3 items-start">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Nota:</strong> Baseado na média histórica de 3 anos. Bitcoin é volátil no curto prazo, mas tende a valorizar exponencialmente frente a ativos físicos.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
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
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">PRÓXIMO NÍVEL: INDEPENDÊNCIA OPERACIONAL</p>
            <Link to="/saida" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-amber-500 text-black font-bold text-sm hover:opacity-90 transition-opacity">
              Avançar para Nível 03 <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border/30 to-transparent mt-10" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mt-4">SISTEMA OPERACIONAL DE SOBERANIA</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Bitcoin;
