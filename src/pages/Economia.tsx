import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Play, Calculator, TrendingDown, Clock, Banknote, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";
import cardEconomia from "@/assets/card-economia.jpg";
import SimboloOculto from '@/components/SimboloOculto';

// Dados de desvalorização do Real (poder de compra de R$100 ao longo dos anos)
const devaluationData = [
  { year: "1994", valor: 100 },
  { year: "1998", valor: 78 },
  { year: "2002", valor: 52 },
  { year: "2006", valor: 41 },
  { year: "2010", valor: 33 },
  { year: "2014", valor: 24 },
  { year: "2018", valor: 18 },
  { year: "2022", valor: 13 },
  { year: "2024", valor: 11 },
];

const CARGA_TRIBUTARIA = 0.42; // ~42% carga tributária brasileira
const HORAS_DIA = 8;
const MINUTOS_DIA = HORAS_DIA * 60;

const Economia = () => {
  const navigate = useNavigate();
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    if (hourlyRate <= 0) return null;
    const dailyEarning = hourlyRate * HORAS_DIA;
    const taxPerDay = dailyEarning * CARGA_TRIBUTARIA;
    const minutesForState = Math.round(MINUTOS_DIA * CARGA_TRIBUTARIA);
    const hoursForState = Math.floor(minutesForState / 60);
    const remainingMinutes = minutesForState % 60;
    const monthlyTax = taxPerDay * 22;
    const yearlyTax = monthlyTax * 12;
    return { minutesForState, hoursForState, remainingMinutes, taxPerDay, monthlyTax, yearlyTax };
  }, [hourlyRate]);

  const handleCalculate = () => {
    if (hourlyRate > 0) setShowResult(true);
  };

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px] pb-20">
        {/* Back button */}
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

        {/* Hero Header */}
        <section className="section-padding pt-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                    NÍVEL 01
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                    DESPERTAR MONETÁRIO
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  A Lógica da{" "}
                  <span className="text-gradient-gold">Pilhagem</span>
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Entenda como o sistema fiduciário rouba o tempo do indivíduo através da inflação, o imposto silencioso.
                </p>

                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
                    "A maioria das pessoas acredita que a economia é um sistema complexo demais para ser compreendido. Isso é um projeto. A complexidade serve apenas para esconder o fato de que a inflação é um imposto silencioso, cobrado sem votação e sem consentimento."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
                  <img src={cardEconomia} alt="Economia" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Devaluation Chart */}
        <section className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-wealth"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Derretimento do Real</h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    PODER DE COMPRA DE R$ 100 DESDE O PLANO REAL (1994)
                  </p>
                </div>
              </div>

              <div className="h-[280px] md:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={devaluationData}>
                    <defs>
                      <linearGradient id="devalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                      axisLine={{ stroke: "hsl(220, 20%, 16%)" }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                      axisLine={{ stroke: "hsl(220, 20%, 16%)" }}
                      tickFormatter={(v) => `R$${v}`}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222, 40%, 8%)",
                        border: "1px solid hsl(220, 20%, 16%)",
                        borderRadius: "8px",
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Poder de Compra"]}
                      labelStyle={{ color: "hsl(215, 15%, 55%)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="valor"
                      stroke="hsl(0, 72%, 51%)"
                      strokeWidth={2}
                      fill="url(#devalGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                 <p className="text-xs text-muted-foreground">
                   <span className="text-destructive font-bold">R$ 100 em 1994 compram hoje o equivalente a R$ 11.</span>{" "}
                   O Banco Central destruiu 89% do seu poder de compra em 30 anos.
                   <SimboloOculto id="chama" className="ml-1.5 align-middle" />
                 </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Download Blocks */}
        <section className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                ARSENAL DISPONÍVEL
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ebook Download */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -4 }}
                className="card-wealth group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Download className="w-6 h-6 text-gold" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                    EBOOK
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">
                  O Caminho da Soberania
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  O guia de entrada para entender a transição do sistema de dívida para o sistema de capital real. PDF pronto para download.
                </p>
                <a
                  href="/o-caminho-da-soberania.pdf"
                  download="o-caminho-da-soberania.pdf"
                  className="w-full py-3.5 rounded-lg border border-gold/20 text-gold font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gold/5 group-hover:gap-3"
                >
                  <Download className="w-4 h-4" />
                  Baixar Ebook
                </a>
              </motion.div>

              {/* Audio Player */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                whileHover={{ y: -4 }}
                className="card-wealth group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    AUDIOBOOK
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                  Série: Mitos Econômicos
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Desmontando as mentiras sistemáticas sobre juros, inflação e PIB em áudios de 15 minutos.
                </p>
                <button
                  onClick={() => navigate("/#audioteca")}
                  className="w-full py-3.5 rounded-lg border border-emerald-500/20 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:bg-emerald-500/5 group-hover:gap-3"
                >
                  <Play className="w-4 h-4" />
                  Ouvir Agora
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Calculadora da Verdade Salarial */}
        <section id="verdade-salarial" className="section-padding py-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                FERRAMENTA INTEGRADA
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="card-wealth max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Calculadora da Verdade Salarial</h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    QUANTO DO SEU DIA PERTENCE AO ESTADO?
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Coloque o valor da sua hora de trabalho e descubra quantos minutos por dia você trabalha <strong className="text-foreground">exclusivamente</strong> para sustentar a máquina pública. Carga tributária brasileira média: <span className="text-gold font-mono font-bold">42%</span>.
              </p>

              {/* Input */}
              <div className="mb-6">
                <label className="text-xs text-muted-foreground font-mono block mb-2">
                  VALOR DA SUA HORA DE TRABALHO (R$)
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                    <input
                      type="number"
                      value={hourlyRate || ""}
                      onChange={(e) => {
                        setHourlyRate(Number(e.target.value));
                        setShowResult(false);
                      }}
                      placeholder="0,00"
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-lg font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleCalculate}
                    disabled={hourlyRate <= 0}
                    className="px-6 py-3 rounded-lg gradient-gold text-primary-foreground font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {/* Result */}
              {showResult && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Big number */}
                  <div className="text-center py-6 border border-destructive/20 rounded-xl bg-destructive/5 mb-6">
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">
                      MINUTOS TRABALHADOS PARA O ESTADO POR DIA
                    </p>
                    <p className="text-5xl md:text-6xl font-bold text-destructive font-mono">
                      {result.minutesForState}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      = <span className="text-foreground font-bold">{result.hoursForState}h {result.remainingMinutes}min</span> do seu dia
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                      <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/DIA</p>
                        <p className="font-mono font-bold text-sm text-gold">
                          R$ {result.taxPerDay.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                      <Banknote className="w-5 h-5 text-gold flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/MÊS</p>
                        <p className="font-mono font-bold text-sm text-gold">
                          R$ {result.monthlyTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-muted-foreground">IMPOSTO/ANO</p>
                        <p className="font-mono font-bold text-sm text-destructive">
                          R$ {result.yearlyTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                      <span>SEU DIA DE TRABALHO (8h)</span>
                      <span>{MINUTOS_DIA} minutos</span>
                    </div>
                    <div className="w-full h-8 rounded-lg bg-secondary/50 overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${CARGA_TRIBUTARIA * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-destructive/60 flex items-center justify-center"
                      >
                        <span className="text-[9px] font-mono font-bold text-foreground">
                          ESTADO ({(CARGA_TRIBUTARIA * 100).toFixed(0)}%)
                        </span>
                      </motion.div>
                      <div className="h-full flex-1 bg-gold/20 flex items-center justify-center">
                        <span className="text-[9px] font-mono font-bold text-gold">
                          VOCÊ ({((1 - CARGA_TRIBUTARIA) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-gold/40 pl-4 mt-6">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "Você não paga impostos porque o Estado precisa. Você paga porque o Estado decide o quanto precisa tirar de você e ajusta a narrativa depois."
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="section-padding py-12"
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">
              PRÓXIMO NÍVEL: SOBERANIA BITCOIN
            </p>
            <button
              onClick={() => navigate("/bitcoin")}
              className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-bold text-sm hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all"
            >
              Avançar para Nível 02 →
            </button>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-10" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mt-4">
              SISTEMA OPERACIONAL DE SOBERANIA
            </p>
          </div>
        </motion.div>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default Economia;
