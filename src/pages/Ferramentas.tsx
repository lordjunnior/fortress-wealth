import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calculator, Plane,
  BookA, ShieldCheck, Clock, Terminal, Hourglass, Search, Timer, ExternalLink
} from 'lucide-react';
import verificabrCover from '@/assets/verificabr-cover.png';

import BitcoinVsImovel from './BitcoinVsImovel';
import TaxaDeFuga from './TaxaDeFuga';
import Novilingua from './Novilingua';
import GeradorEntropy from './GeradorEntropy';
import SupplyShock from './SupplyShock';

const VerdadeSalarial = () => (
  <div className="p-8 text-center text-foreground pt-32">
    <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
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
    color: 'from-red-500/20 to-red-500/0',
    borderColor: 'group-hover:border-red-500/50',
    textColor: 'text-red-400',
    icon: BookA,
    component: Novilingua
  },
  {
    id: 'fuga',
    title: 'Calculadora Taxa de Fuga',
    badge: 'O Preço da Liberdade',
    desc: 'Calcule quanto custa sair do alcance estatal. Passaporte, vistos e custos de realocação para refúgios soberanos ao redor do mundo.',
    cta: 'Calcular Saída',
    color: 'from-sky-500/20 to-sky-500/0',
    borderColor: 'group-hover:border-sky-500/50',
    textColor: 'text-sky-400',
    icon: Plane,
    component: TaxaDeFuga
  },
  {
    id: 'btc-imovel',
    title: 'Bitcoin vs. Imóveis',
    badge: 'Cálculo de Valorização',
    desc: 'Simulador de valorização histórica. Compare dinheiro escasso versus setor imobiliário inflado com dados reais e atualizados.',
    cta: 'Abrir Calculadora',
    color: 'from-amber-500/20 to-amber-500/0',
    borderColor: 'group-hover:border-amber-500/50',
    textColor: 'text-gold',
    icon: Calculator,
    component: BitcoinVsImovel
  },
  {
    id: 'entropy',
    title: 'Gere sua Seed',
    badge: 'Crie sua Seed Offline',
    desc: 'Ferramenta de segurança máxima que usa o caos dos seus movimentos do mouse para gerar chaves privadas completamente offline.',
    cta: 'Gerar Seed',
    color: 'from-emerald-500/20 to-emerald-500/0',
    borderColor: 'group-hover:border-emerald-500/50',
    textColor: 'text-emerald-400',
    icon: ShieldCheck,
    component: GeradorEntropy
  },
  {
    id: 'supply-shock',
    title: 'O Último Bloco',
    badge: 'A Porta Está Fechando',
    desc: 'Visualize o choque de oferta do Bitcoin em tempo real. Moedas perdidas, ETFs absorvendo e menos de 9% disponível. A matemática não mente.',
    cta: 'Ver os Números',
    color: 'from-orange-500/20 to-orange-500/0',
    borderColor: 'group-hover:border-orange-500/50',
    textColor: 'text-orange-400',
    icon: Hourglass,
    component: SupplyShock
  },
  {
    id: 'verificabr',
    title: 'VerificaBR',
    badge: 'Em Teste',
    desc: 'Cruza dados públicos para mapear risco financeiro de políticos. A partir do CPF de agentes públicos, organiza transferências federais, contratos e vínculos empresariais.',
    cta: 'Em Breve',
    color: 'from-blue-500/20 to-blue-500/0',
    borderColor: 'group-hover:border-blue-500/50',
    textColor: 'text-blue-400',
    icon: Search,
    component: null,
    cover: verificabrCover
  },
  {
    id: 'verdade-salarial',
    title: 'Amigo CLT — Salário Líquido',
    badge: 'O Custo do Estado',
    desc: 'Descubra o custo real do trabalho formal. Quanto o Estado extrai do seu esforço antes que o dinheiro chegue na sua mão.',
    cta: 'Calcular Roubo',
    color: 'from-purple-500/20 to-purple-500/0',
    borderColor: 'group-hover:border-purple-500/50',
    textColor: 'text-purple-400',
    icon: Clock,
    component: VerdadeSalarial
  },
  {
    id: 'horajusta',
    title: 'HoraJusta',
    badge: 'Controle de Ponto',
    desc: 'Controle de ponto inteligente que registra jornada, calcula horas extras automaticamente e gera relatórios com verificação antifraude para comprovar presença no trabalho.',
    cta: 'Abrir App',
    color: 'from-cyan-500/20 to-cyan-500/0',
    borderColor: 'group-hover:border-cyan-500/50',
    textColor: 'text-cyan-400',
    icon: Timer,
    component: null,
    iframeUrl: 'https://minhahorajusta.vercel.app'
  },
  {
    id: 'dev',
    title: 'Em Desenvolvimento',
    badge: 'Em Breve',
    desc: 'Novas ferramentas para P2P e gestão de UTXO chegando em breve. Desenvolvimento ativo e contínuo.',
    cta: 'Aguarde',
    color: 'from-slate-500/20 to-slate-500/0',
    borderColor: 'group-hover:border-slate-500/30',
    textColor: 'text-muted-foreground',
    icon: Terminal,
    component: null
  }
];

const Ferramentas: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const activeTool = TOOLS_LIST.find(t => t.id === activeToolId);

  const handleSetActive = useCallback((id: string | null) => {
    setIframeLoaded(false);
    setActiveToolId(id);
  }, []);

  // Render active tool inline
  if (activeTool && activeTool.id !== 'dev' && activeTool.id !== 'verificabr') {
    const Component = activeTool.component;
    const iframeUrl = 'iframeUrl' in activeTool ? (activeTool as any).iframeUrl : null;

    if (Component || iframeUrl) {
      return (
        <div className="relative min-h-screen bg-background">
          <div className="fixed top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-background via-background/90 to-transparent pointer-events-none">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => handleSetActive(null)}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-gold hover:text-gold rounded-lg text-muted-foreground text-xs font-bold uppercase tracking-widest transition-all shadow-2xl"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar aos Aplicativos
            </motion.button>
          </div>
          {iframeUrl ? (
            <div className="pt-20 w-full flex flex-col">
              <div className="px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ferramenta gratuita</p>
                <h2 className="text-xl font-bold text-foreground mt-1">{activeTool.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{activeTool.desc}</p>
              </div>
              <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background z-10">
                    <div className="w-8 h-8 border-2 border-border border-t-gold rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground font-mono tracking-wider">Carregando ferramenta...</p>
                    <div className="w-full max-w-md px-8 space-y-3 mt-4">
                      <div className="h-3 bg-secondary rounded-full animate-pulse" />
                      <div className="h-3 bg-secondary rounded-full animate-pulse w-4/5" />
                      <div className="h-3 bg-secondary rounded-full animate-pulse w-3/5" />
                    </div>
                  </div>
                )}
                <iframe
                  src={iframeUrl}
                  title={activeTool.title}
                  className="w-full h-full border-0"
                  allow="clipboard-read; clipboard-write"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
              <div className="px-6 py-5 border-t border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">Gostou da ferramenta?</p>
                  <p className="text-xs text-muted-foreground">Compartilhe com um amigo.</p>
                </div>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activeTool.title, url: iframeUrl });
                    } else {
                      navigator.clipboard.writeText(iframeUrl);
                    }
                  }}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:border-gold hover:text-gold transition-all"
                >
                  Compartilhar
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-24 pb-12">
              <Component />
            </div>
          )}
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
            const isInactive = tool.id === 'dev';
            const hasCover = 'cover' in tool && (tool as any).cover;
            const hasIframe = 'iframeUrl' in tool && (tool as any).iframeUrl;

            const handleClick = () => {
              if (isInactive) return;
              if (tool.id !== 'verificabr') setActiveToolId(tool.id);
            };

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                onClick={handleClick}
                className={`group relative bg-card rounded-2xl overflow-hidden border transition-all duration-500 ${isInactive ? 'border-dashed border-border cursor-default opacity-90' : `border-border cursor-pointer hover:-translate-y-1 ${tool.borderColor} shadow-lg hover:shadow-2xl`}`}
              >
                {hasCover && (
                  <div className="w-full h-40 overflow-hidden">
                    <img src={(tool as any).cover} alt={tool.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-8">
                {!isInactive && (
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${tool.color} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2`} />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl bg-secondary border border-border ${tool.textColor} shadow-inner`}>
                      <Icon className={`w-7 h-7 ${isInactive && 'animate-pulse'}`} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${tool.textColor} bg-secondary px-3 py-1.5 rounded-full border border-border`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                    {tool.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {tool.desc}
                  </p>

                  <div className={`mt-auto inline-flex items-center gap-2 ${tool.textColor} font-bold text-sm uppercase tracking-wider ${!isInactive && 'group-hover:gap-4'} transition-all`}>
                    {tool.cta} {!isInactive && <ArrowRight className="w-4 h-4" />}
                  </div>
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
