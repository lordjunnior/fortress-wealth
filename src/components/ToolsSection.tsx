import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Shield, Compass, BarChart3, Bitcoin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const miniChartData = [
  { v: 100 }, { v: 95 }, { v: 88 }, { v: 80 }, { v: 70 },
  { v: 55 }, { v: 45 }, { v: 35 }, { v: 22 }, { v: 15 }, { v: 8 },
];

const tools = [
  {
    title: "BITCOIN VS. IMÓVEIS",
    icon: Bitcoin,
    description: "Simulador de valorização histórica. Compare dinheiro escasso versus setor imobiliário inflado com dados reais e atualizados.",
    button: "Abrir Calculadora",
    tag: "CALCULADORA",
    route: "/bitcoin-vs-imovel",
  },
  {
    title: "TRADUTOR DE NOVILÍNGUA",
    icon: BookOpen,
    description: "A mídia e o Estado operam através de eufemismos. Decifre a linguagem da manipulação antes que ela se torne o seu pensamento. Banco de dados offline.",
    button: "Traduzir Mentiras",
    tag: "OFFLINE",
  },
  {
    title: "GERADOR DE SEED BIP39",
    icon: Shield,
    description: "Não confie em geradores automáticos. Crie suas 12 ou 24 palavras de segurança com aleatoriedade real usando o caos dos seus movimentos de mouse. 100% offline e executado localmente.",
    button: "Gerar Fortaleza (Offline)",
    tag: "AIR-GAPPED",
  },
  {
    title: "TAXA DE FUGA",
    icon: Compass,
    description: "O Estado mede o quanto pode te extrair antes de você ir embora. Calcule o custo matemático da sua saída e planeje sua liberdade geográfica.",
    button: "Calcular Custos de Saída",
    tag: "SIMULADOR",
    route: "/taxa-de-fuga",
  },
  {
    title: "SUPPLY SHOCK",
    icon: BarChart3,
    description: "Visualização matemática do choque de oferta. Menos de 7% de todo o Bitcoin restante no mundo está disponível para mineração. A porta está fechando.",
    button: "Acessar Painel de Dados",
    tag: "93%+ MINERADOS",
    progress: 93.4,
  },
];

const ToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="pre-title">PAINEL OPERACIONAL</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Ferramentas de <span className="text-gradient-gold">Operação</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Aplicativos locais e simuladores. Escolha sua ferramenta de blindagem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="card-wealth flex flex-col relative overflow-hidden">
                {/* Background mini chart */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={miniChartData}>
                      <Area type="monotone" dataKey="v" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51%)" fillOpacity={0.3} strokeWidth={1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">
                    {tool.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight mb-3">{tool.title}</h3>
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
                        animate={isInView ? { width: `${tool.progress}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full gradient-gold rounded-full"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => tool.route && navigate(tool.route)}
                  className="w-full py-3 rounded-lg border border-gold-dim text-gold font-medium text-sm hover:bg-gold/5 transition-all duration-300"
                >
                  {tool.button}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
