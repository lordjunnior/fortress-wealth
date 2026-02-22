import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Globe, Server, Zap, BookOpen, AlertTriangle } from 'lucide-react';

const cards = [
  {
    icon: AlertTriangle,
    title: 'Protocolo Inicial',
    desc: 'A blindagem mental antes de tocar em qualquer ferramenta.',
    color: 'text-destructive',
    borderHover: 'hover:border-destructive/50',
    bg: 'from-destructive/10 to-destructive/0',
    route: '/protocolo-inicial',
  },
  {
    icon: ShieldCheck,
    title: 'Arquitetura de Autocustódia',
    desc: 'Cold Wallets, PGP, Multisig & Wasabi.',
    color: 'text-gold',
    borderHover: 'hover:border-gold/50',
    bg: 'from-gold/10 to-gold/0',
    route: '/autocustodia',
  },
  {
    icon: Globe,
    title: 'Economia Paralela',
    desc: 'Mercados BISQ, P2P & OpSec.',
    color: 'text-sky-400',
    borderHover: 'hover:border-sky-500/50',
    bg: 'from-sky-500/10 to-sky-500/0',
    route: '/economia-paralela',
  },
  {
    icon: Server,
    title: 'Rodando com o Urso Dov',
    desc: 'Full Nodes, Hardware & Validação.',
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/50',
    bg: 'from-emerald-500/10 to-emerald-500/0',
    route: '/infraestrutura',
  },
  {
    icon: Zap,
    title: 'Lightning no Bolso',
    desc: 'Camada 2, Phoenix & Velocidade.',
    color: 'text-purple-400',
    borderHover: 'hover:border-purple-500/50',
    bg: 'from-purple-500/10 to-purple-500/0',
    route: '/lightning',
  },
];

const Educacao: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 font-sans">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Retornar ao Início
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Arsenal <span className="text-gold">Técnico</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mb-12">
            Estes materiais não são dicas de investimento. São manuais técnicos de operação para quem decidiu assumir a responsabilidade total sobre seu patrimônio. Escolha sua arma.
          </p>
        </motion.div>

        {/* Essencial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Link to="/entenda-bitcoin" className="block mb-12">
            <div className="bg-card border border-gold/20 rounded-2xl p-8 relative overflow-hidden group hover:border-gold/40 transition-all cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold/10 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
                    Essencial
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-chart-green bg-chart-green/10 px-3 py-1.5 rounded-full border border-chart-green/20">
                    Fácil e Rápido
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Comece pelo Básico</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">
                  Antes de operar as ferramentas abaixo, leia <strong className="text-foreground">"Entenda o Bitcoin — ainda hoje"</strong>. É um guia para leigos absolutos, sem termos técnicos. Entenda o "porquê" antes do "como".
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  Acessar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                onClick={() => card.route && navigate(card.route)}
                className={`group relative bg-card rounded-2xl p-8 overflow-hidden border border-border ${card.borderHover} transition-all duration-500 ${card.route ? 'cursor-pointer' : 'cursor-default'} hover:-translate-y-1 shadow-lg hover:shadow-2xl`}
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${card.bg} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2`} />
                <div className="relative z-10">
                  <div className={`p-4 rounded-xl bg-secondary border border-border ${card.color} shadow-inner w-fit mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">{card.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{card.desc}</p>
                  {card.route && (
                    <span className={`inline-flex items-center gap-2 ${card.color} font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all`}>
                      Acessar <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 mb-16"
        >
          <p className="text-destructive text-xs font-bold flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            Not your keys, not your money. Quem não assume a custódia aceita a dependência. Autocustódia exige responsabilidade.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center space-y-3 pt-8 border-t border-border/30"
        >
          <p className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
            Dependência financeira nunca foi acidente. Sempre foi projeto.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest">
            Lord Junnior © 2026
          </p>
        </motion.footer>

      </div>
    </div>
  );
};

export default Educacao;
