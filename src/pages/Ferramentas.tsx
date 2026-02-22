import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Bitcoin, BookOpen, Shield, Compass, BarChart3, Zap } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";

const miniChartData = [
  { v: 100 }, { v: 95 }, { v: 88 }, { v: 80 }, { v: 70 },
  { v: 55 }, { v: 45 }, { v: 35 }, { v: 22 }, { v: 15 }, { v: 8 },
];

const tools = [
  {
    id: "verdade-salarial",
    title: "VERDADE SALARIAL",
    icon: Compass,
    description: "Coloque o valor da sua hora de trabalho e descubra quanto, em minutos, você trabalha por dia apenas para sustentar a máquina pública.",
    button: "Calcular Custos de Saída",
    tag: "SIMULADOR",
    route: "/taxa-de-fuga",
    origin: "NÍVEL 01 · ECONOMIA",
  },
  {
    id: "btc-vs-imoveis",
    title: "BITCOIN VS. IMÓVEIS",
    icon: Bitcoin,
    description: "Uma análise matemática fria sobre qual ativo realmente preservou o seu esforço de vida contra a inflação na última década.",
    button: "Abrir Simulador",
    tag: "CALCULADORA",
    route: "/bitcoin-vs-imovel",
    origin: "NÍVEL 02 · BITCOIN",
  },
  {
    id: "pix-bitcoin",
    title: "PIX VIA BITCOIN",
    icon: Zap,
    description: "O guia de execução para converter seus Satoshis em liquidez imediata no balcão do comércio local, sem pedir permissão a gerente de banco.",
    button: "Configurar Agora",
    tag: "LIGHTNING",
    origin: "NÍVEL 03 · SAÍDA",
  },
  {
    id: "tradutor-novilingua",
    title: "TRADUTOR DE NOVILÍNGUA",
    icon: BookOpen,
    description: "A mídia e o Estado operam através de eufemismos. Decifre a linguagem da manipulação antes que ela se torne o seu pensamento. Banco de dados offline.",
    button: "Traduzir Mentiras",
    tag: "OFFLINE",
    origin: "EM DESENVOLVIMENTO",
  },
  {
    id: "gerador-seed",
    title: "GERADOR DE SEED BIP39",
    icon: Shield,
    description: "Não confie em geradores automáticos. Crie suas 12 ou 24 palavras de segurança com aleatoriedade real usando o caos dos seus movimentos de mouse. 100% offline.",
    button: "Gerar Fortaleza (Offline)",
    tag: "AIR-GAPPED",
    origin: "EM DESENVOLVIMENTO",
  },
  {
    id: "supply-shock",
    title: "SUPPLY SHOCK",
    icon: BarChart3,
    description: "Visualização matemática do choque de oferta. Menos de 7% de todo o Bitcoin restante no mundo está disponível para mineração. A porta está fechando.",
    button: "Acessar Painel de Dados",
    tag: "93%+ MINERADOS",
    progress: 93.4,
    origin: "EM DESENVOLVIMENTO",
  },
];

const Ferramentas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 600);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px] pb-10">
        {/* Back button */}
        <div className="section-padding pt-6 pb-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono tracking-wider text-xs">VOLTAR AO COMANDO</span>
          </motion.button>
        </div>

        <section className="section-padding pt-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                  PAINEL OPERACIONAL
                </span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                  {tools.length} FERRAMENTAS
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Central de Ferramentas{" "}
                <span className="text-gradient-gold">Soberanas</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-3xl">
                Simuladores, calculadoras e protocolos de execução. Todas as armas do arsenal
                reunidas em um único painel de operação. Escolha sua ferramenta de blindagem.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                ARSENAL DISPONÍVEL
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.id}
                    id={tool.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="card-wealth flex flex-col relative overflow-hidden group cursor-pointer"
                  >
                    {/* Background mini chart */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={miniChartData}>
                          <Area type="monotone" dataKey="v" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51%)" fillOpacity={0.3} strokeWidth={1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Top bar */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[9px] tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                          {tool.tag}
                        </span>
                        <span className="font-mono text-[8px] tracking-wider text-muted-foreground/60">
                          {tool.origin}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-gold transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {tool.description}
                    </p>

                    {tool.progress !== undefined && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-muted-foreground">Minerados</span>
                          <span className="font-mono text-xs text-gold">{tool.progress}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tool.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full gradient-gold rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => tool.route && navigate(tool.route)}
                      className="w-full py-3.5 rounded-lg border border-gold-dim text-gold font-semibold text-sm hover:bg-gold/5 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                    >
                      {tool.button}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mb-4">
                SISTEMA OPERACIONAL DE SOBERANIA
              </p>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </motion.div>
          </div>
        </section>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default Ferramentas;
