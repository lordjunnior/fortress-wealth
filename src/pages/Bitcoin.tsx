import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Shield, Cpu, HardDrive, Key, ExternalLink, ArrowRight,
  Bitcoin as BtcIcon, Home, TrendingUp, Info, CheckCircle2, AlertTriangle, Server, Wifi
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, LineChart, Legend } from "recharts";
import { useEffect } from "react";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";
import cardBitcoin from "@/assets/card-bitcoin.jpg";

// Hardware wallets data
const wallets = [
  {
    name: "Ledger Nano S Plus",
    type: "Hardware Wallet",
    security: "Chip Secure Element (CC EAL5+)",
    price: "~R$ 500",
    link: "https://www.ledger.com",
    pros: ["Mais de 5.500 ativos", "Bluetooth", "Tela grande"],
  },
  {
    name: "Trezor Model One",
    type: "Hardware Wallet",
    security: "Open Source Firmware",
    price: "~R$ 400",
    link: "https://trezor.io",
    pros: ["Código aberto", "Simples de usar", "Comunidade ativa"],
  },
  {
    name: "Coldcard Mk4",
    type: "Air-gapped Wallet",
    security: "Dual Secure Element + Air-gap",
    price: "~R$ 800",
    link: "https://coldcard.com",
    pros: ["100% offline", "Focada em Bitcoin", "Nível militar"],
  },
  {
    name: "SeedSigner",
    type: "DIY Air-gapped",
    security: "Open Source + Raspberry Pi",
    price: "~R$ 200 (DIY)",
    link: "https://seedsigner.com",
    pros: ["Faça você mesmo", "Sem firmware proprietário", "Descartável"],
  },
];

// Node setup steps
const nodeSteps = [
  {
    title: "Escolha o Hardware",
    desc: "Raspberry Pi 4 (4GB+) ou um PC antigo com 1TB de SSD. Custo total: ~R$ 800.",
    icon: Cpu,
  },
  {
    title: "Instale o Sistema",
    desc: "Use Umbrel, Start9, ou RaspiBlitz. Interface gráfica, sem necessidade de linha de comando.",
    icon: Server,
  },
  {
    title: "Sincronize a Blockchain",
    desc: "O node vai baixar e verificar todas as transações desde 2009. Leva de 2 a 7 dias dependendo da conexão.",
    icon: HardDrive,
  },
  {
    title: "Conecte sua Wallet",
    desc: "Aponte sua carteira (Sparrow, Electrum) para o seu próprio node. Agora você não depende de ninguém para verificar suas transações.",
    icon: Wifi,
  },
];

// BTC vs Real Estate comparison data (10 years, indexed to 100)
const comparisonData = [
  { year: "2014", btc: 100, imovel: 100 },
  { year: "2015", btc: 135, imovel: 95 },
  { year: "2016", btc: 280, imovel: 90 },
  { year: "2017", btc: 4200, imovel: 92 },
  { year: "2018", btc: 1100, imovel: 93 },
  { year: "2019", btc: 2200, imovel: 96 },
  { year: "2020", btc: 8500, imovel: 100 },
  { year: "2021", btc: 19000, imovel: 108 },
  { year: "2022", btc: 5500, imovel: 112 },
  { year: "2023", btc: 12000, imovel: 115 },
  { year: "2024", btc: 32000, imovel: 118 },
];

const Bitcoin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simulator state
  const [propertyValue, setPropertyValue] = useState(500000);
  const [rentValue, setRentValue] = useState(2500);
  const [showSimResult, setShowSimResult] = useState(false);

  const BTC_APPRECIATION = 2.85;
  const REAL_ESTATE_APPRECIATION = 0.18;
  const BTC_DCA_MULTIPLIER = 1.9;

  const scenarioSellBuy = propertyValue * (1 + BTC_APPRECIATION);
  const scenarioKeep = propertyValue * (1 + REAL_ESTATE_APPRECIATION);
  const totalRentInvested = rentValue * 36;
  const rentGains = totalRentInvested * BTC_DCA_MULTIPLIER;
  const scenarioRentInvest = propertyValue * (1 + REAL_ESTATE_APPRECIATION) + rentGains;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [location.hash]);

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
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">NÍVEL 02</span>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">SOBERANIA BITCOIN</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  Blindagem{" "}<span className="text-gradient-gold">Operacional</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A transição da teoria para a posse real do capital. Se você não tem as chaves, as moedas não são suas.
                </p>
                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
                    "O Bitcoin não é um investimento para 'ficar rico rápido'; é a única propriedade privada no mundo que não depende da permissão de terceiros para existir ou ser transacionada."
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
                  <img src={cardBitcoin} alt="Bitcoin" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== AUTOCUSTÓDIA ===== */}
        <section id="autocustodia" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">AUTOCUSTÓDIA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            {/* Mantra */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gold/20 bg-gold/5">
                <Key className="w-5 h-5 text-gold" />
                <p className="font-mono text-sm md:text-base text-gold font-bold tracking-wider">
                  "NOT YOUR KEYS, NOT YOUR COINS"
                </p>
                <Key className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
                Se as suas moedas estão em uma corretora, você não possui Bitcoin. Você possui uma promessa de pagamento que pode ser bloqueada a qualquer momento.
              </p>
            </motion.div>

            {/* Hardware Wallets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {wallets.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-wealth group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-gold transition-colors">{w.name}</h3>
                        <p className="text-[10px] text-muted-foreground font-mono">{w.type}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gold font-bold">{w.price}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="text-foreground font-medium">Segurança:</span> {w.security}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {w.pros.map((p, j) => (
                      <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                        {p}
                      </span>
                    ))}
                  </div>

                  <a
                    href={w.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-gold hover:underline font-mono"
                  >
                    <ExternalLink className="w-3 h-3" /> Site oficial
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== NODE ===== */}
        <section id="node" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">INFRAESTRUTURA SOBERANA</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="card-wealth mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Don't Trust, Verify</h2>
                  <p className="text-xs text-muted-foreground font-mono">RODE SEU PRÓPRIO NODE BITCOIN</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Um node Bitcoin é a sua própria cópia da blockchain. Quando você roda um, você <strong className="text-foreground">não precisa confiar em ninguém</strong> para saber se uma transação é legítima. Você verifica sozinho.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {nodeSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-background flex-shrink-0">
                        <span className="font-mono text-xs font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                      </div>
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

        {/* ===== SIMULADOR BTC VS IMÓVEL ===== */}
        <section id="btc-vs-imovel" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SIMULADOR INTEGRADO</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            {/* 10-year comparison chart */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="card-wealth mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Bitcoin vs Imóveis — 10 Anos</h2>
                  <p className="text-xs text-muted-foreground font-mono">PODER DE COMPRA INDEXADO (BASE 100 EM 2014)</p>
                </div>
              </div>

              <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} />
                    <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "hsl(220, 20%, 16%)" }} scale="log" domain={[50, 50000]} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(222, 40%, 8%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "12px" }}
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString("pt-BR")}x`,
                        name === "btc" ? "Bitcoin" : "Imóvel",
                      ]}
                    />
                    <Legend formatter={(v) => (v === "btc" ? "Bitcoin" : "Imóvel")} wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: "11px" }} />
                    <Line type="monotone" dataKey="btc" stroke="hsl(40, 92%, 56%)" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="imovel" stroke="hsl(215, 15%, 55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-gold/5 border border-gold/10">
                <Info className="w-4 h-4 text-gold flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-gold font-bold">R$ 100 em Bitcoin em 2014 valeriam ~R$ 32.000 hoje.</span>{" "}
                  O mesmo valor em imóvel estaria em R$ 118, mal acompanhando a inflação.
                </p>
              </div>
            </motion.div>

            {/* Interactive Simulator */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="card-wealth">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <BtcIcon className="w-5 h-5 text-gold" />
                </div>
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
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-gold/50 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono block mb-2">ALUGUEL MENSAL (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                    <input type="number" value={rentValue} onChange={(e) => { setRentValue(Number(e.target.value)); setShowSimResult(false); }}
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground focus:border-gold/50 focus:outline-none transition-colors" />
                  </div>
                </div>
              </div>

              <button onClick={() => setShowSimResult(true)} disabled={propertyValue <= 0}
                className="w-full py-3.5 rounded-lg gradient-gold text-primary-foreground font-bold text-sm disabled:opacity-40 mb-6">
                Calcular Cenários
              </button>

              {showSimResult && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Sell & Buy BTC */}
                  <div className="p-4 rounded-xl border border-gold/30 bg-gold/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 gradient-gold text-primary-foreground text-[9px] font-bold font-mono rounded-bl-xl">MAIOR RETORNO</div>
                    <div className="flex items-center gap-3 mb-2">
                      <BtcIcon className="w-5 h-5 text-gold" />
                      <h3 className="font-bold text-sm">Vender Imóvel & Comprar Bitcoin</h3>
                    </div>
                    <p className="text-2xl font-bold font-mono text-gold">{formatCurrency(scenarioSellBuy)}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: "hsl(142, 71%, 45%)" }}>
                      +{((scenarioSellBuy - propertyValue) / propertyValue * 100).toFixed(0)}% em 3 anos
                    </p>
                  </div>

                  {/* Rent & Invest */}
                  <div className="p-4 rounded-xl border border-border bg-secondary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      <h3 className="font-bold text-sm">Alugar & Investir em Bitcoin (DCA)</h3>
                    </div>
                    <p className="text-xl font-bold font-mono text-foreground">{formatCurrency(scenarioRentInvest)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Patrimônio preservado + renda potencializada</p>
                  </div>

                  {/* Keep */}
                  <div className="p-4 rounded-xl border border-border bg-secondary/10 opacity-70">
                    <div className="flex items-center gap-3 mb-2">
                      <Home className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-bold text-sm">Manter Imóvel</h3>
                    </div>
                    <p className="text-xl font-bold font-mono text-muted-foreground">{formatCurrency(scenarioKeep)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Apenas valorização imobiliária (+{(REAL_ESTATE_APPRECIATION * 100).toFixed(0)}%)</p>
                  </div>

                  <div className="p-3 rounded-lg bg-gold/5 border border-gold/10 flex gap-3 items-start">
                    <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Nota:</strong> Baseado na média histórica de 3 anos. Bitcoin é volátil no curto prazo, mas tende a valorizar exponencialmente frente a ativos físicos no longo prazo pela escassez matemática absoluta.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="section-padding py-12">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">PRÓXIMO NÍVEL: INDEPENDÊNCIA OPERACIONAL</p>
            <button onClick={() => navigate("/saida")} className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-bold text-sm hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all">
              Avançar para Nível 03 →
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

export default Bitcoin;
