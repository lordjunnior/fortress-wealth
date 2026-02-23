import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calculator, Plane,
  BookA, ShieldCheck, Clock, Terminal, Hourglass
} from 'lucide-react';

import BitcoinVsImovel from './BitcoinVsImovel';
import TaxaDeFuga from './TaxaDeFuga';
import Novilingua from './Novilingua';
import GeradorEntropy from './GeradorEntropy';
import SupplyShock from './SupplyShock';

const VerdadeSalarial = () => (
  <div className="p-8 text-center text-foreground pt-32">
    <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest mb-6">
      <Clock className="w-4 h-4" />
      Em Desenvolvimento
    </div>
    <h2 className="text-3xl font-bold mb-4">Calculadora Salarial</h2>
    <p className="text-muted-foreground">Em codificação. Disponível em breve.</p>
  </div>
);

const TOOLS_LIST = [
  {
    id: 'novilingua',
    title: 'Tradutor de Novilíngua',
    badge: 'Decifre a Mídia',
    desc: 'Um dicionário satírico que traduz termos jornalísticos e estatais — "Justiça Social", "Regulação" — para a realidade nua e crua.',
    cta: 'Traduzir Mentiras',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-destructive',
    icon: BookA,
    component: Novilingua
  },
  {
    id: 'fuga',
    title: 'Calculadora Taxa de Fuga',
    badge: 'O Preço da Liberdade',
    desc: 'Calcule quanto custa sair do alcance estatal. Passaporte, vistos e custos de realocação para refúgios soberanos ao redor do mundo.',
    cta: 'Calcular Saída',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-gold',
    icon: Plane,
    component: TaxaDeFuga
  },
  {
    id: 'btc-imovel',
    title: 'Bitcoin vs. Imóveis',
    badge: 'Cálculo de Valorização',
    desc: 'Simulador de valorização histórica. Compare dinheiro escasso versus setor imobiliário inflado com dados reais e atualizados.',
    cta: 'Abrir Calculadora',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-gold',
    icon: Calculator,
    component: BitcoinVsImovel
  },
  {
    id: 'entropy',
    title: 'Gerador de Entropia Real',
    badge: 'Crie sua Seed Offline',
    desc: 'Ferramenta de segurança máxima que usa o caos dos seus movimentos do mouse para gerar chaves privadas completamente offline.',
    cta: 'Gerar Seed',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-gold',
    icon: ShieldCheck,
    component: GeradorEntropy
  },
  {
    id: 'supply-shock',
    title: 'Supply Shock',
    badge: 'A Porta Está Fechando',
    desc: 'Visualize o choque de oferta do Bitcoin em tempo real. Moedas perdidas, ETFs absorvendo e menos de 9% disponível. A matemática não mente.',
    cta: 'Ver os Números',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-gold',
    icon: Hourglass,
    component: SupplyShock
  },
  {
    id: 'verdade-salarial',
    title: 'Amigo CLT — Salário Líquido',
    badge: 'O Custo do Estado',
    desc: 'Descubra o custo real do trabalho formal. Quanto o Estado extrai do seu esforço antes que o dinheiro chegue na sua mão.',
    cta: 'Calcular Roubo',
    color: 'from-gold/10 to-gold/0',
    borderColor: 'group-hover:border-gold/50',
    textColor: 'text-gold',
    icon: Clock,
    component: VerdadeSalarial
  },
  {
    id: 'dev',
    title: 'Em Desenvolvimento',
    badge: 'Em Breve',
    desc: 'Novas ferramentas para P2P e gestão de UTXO chegando em breve. Desenvolvimento ativo e contínuo.',
    cta: 'Aguarde',
    color: 'from-muted/10 to-muted/0',
    borderColor: 'group-hover:border-border',
    textColor: 'text-muted-foreground',
    icon: Terminal,
    component: null
  }
];

const Ferramentas: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const activeTool = TOOLS_LIST.find(t => t.id === activeToolId);

  // Render active tool inline
  if (activeTool && activeTool.id !== 'dev') {
    const Component = activeTool.component;
    if (Component) {
      return (
        <div className="relative min-h-screen bg-background">
          <div className="fixed top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-background via-background/90 to-transparent pointer-events-none">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setActiveToolId(null)}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-gold hover:text-gold rounded-lg text-muted-foreground text-xs font-bold uppercase tracking-widest transition-all shadow-2xl"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar aos Aplicativos
            </motion.button>
          </div>
          <div className="pt-24 pb-12">
            <Component />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 font-sans relative overflow-hidden">

      {/* Tool/Gear Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="tool-layer"></div>
        <div className="tool-layer tool-layer-2"></div>
      </div>
      <style>{`
        @keyframes driftTool {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          100% { transform: translateY(-1000px) translateX(70px) rotate(3deg); }
        }
        .tool-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1.5px 1.5px at 18% 22%, rgba(234,179,8,0.3) 100%, transparent),
            radial-gradient(1px 1px at 42% 58%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 68% 32%, rgba(234,179,8,0.2) 100%, transparent),
            radial-gradient(1px 1px at 88% 72%, rgba(255,255,255,0.1) 100%, transparent);
          background-size: 210px 210px;
          animation: driftTool 58s linear infinite;
        }
        .tool-layer-2 {
          background-size: 310px 310px;
          animation: driftTool 82s linear infinite reverse;
          opacity: 0.5;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link to="/" className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit mb-8">
            <ArrowLeft className="w-4 h-4" /> Centro de Comando
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Arsenal <span className="text-gold">Operacional</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Aplicativos desenvolvidos para auxiliar no cálculo de custos de oportunidade, verificação de privacidade e gestão de patrimônio fora do sistema tradicional. Todas gratuitas, sem rastreamento e com código auditável.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_LIST.map((tool, i) => {
            const Icon = tool.icon;
            const isDev = tool.id === 'dev';

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                onClick={() => !isDev && setActiveToolId(tool.id)}
                className={`group relative bg-card rounded-2xl p-8 overflow-hidden border transition-all duration-500 ${isDev ? 'border-dashed border-border cursor-default opacity-80' : `border-border cursor-pointer hover:-translate-y-1 ${tool.borderColor} shadow-lg hover:shadow-2xl`}`}
              >
                {!isDev && (
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${tool.color} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2`} />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl bg-secondary border border-border ${tool.textColor} shadow-inner`}>
                      <Icon className={`w-7 h-7 ${isDev && 'animate-pulse'}`} />
                    </div>
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${tool.textColor} bg-secondary px-3 py-1.5 rounded-full border border-border`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                    {tool.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {tool.desc}
                  </p>

                  <div className={`mt-auto inline-flex items-center gap-2 ${tool.textColor} font-mono font-bold text-[10px] uppercase tracking-widest ${!isDev && 'group-hover:gap-4'} transition-all`}>
                    {tool.cta} {!isDev && <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Ferramentas;
