import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Network, Users,
  ShieldAlert, Lock, RefreshCw, EyeOff, ArrowRight, ServerOff, Shield
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const EconomiaParalela: React.FC = () => {
  const handleDownload = () => {
    alert("Iniciando download do Guia Operacional P2P...");
  };

  return (
    <article className="min-h-screen bg-background pt-28 pb-12 px-4 animate-fade-in font-sans">

      {/* Navegação */}
      <div className="max-w-5xl mx-auto mb-12">
        <Link to="/educacao" className="text-muted-foreground hover:text-sky-400 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao Arsenal
        </Link>
      </div>

      {/* Hero Section */}
      <motion.header {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto mb-20 border-b border-border/50 pb-12">
        <div className="inline-block px-3 py-1 mb-6 border border-sky-500/20 rounded bg-sky-500/5">
          <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em]">Operações Off-Grid</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          Economia <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-500 to-sky-700">Paralela</span>
        </h1>
        <h2 className="text-xl text-muted-foreground font-light max-w-3xl leading-relaxed mb-10">
          O sistema fiduciário é uma ferramenta de extração, não um destino. <strong className="text-foreground font-medium">Aprenda a entrar e sair dele sem deixar rastros permanentes</strong>, operando fora dos radares de vigilância bancária.
        </h2>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-[0_0_25px_rgba(37,99,235,0.3)] uppercase tracking-wide text-sm"
        >
          <Download className="w-5 h-5" /> Baixar Guia Operacional
        </button>
      </motion.header>

      {/* O Trio da Blindagem */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-5xl mx-auto mb-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4">O Trio da Blindagem</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soberania não se constrói apenas comprando Bitcoin. Se constrói cortando as pontes que ligam o seu patrimônio à sua identidade civil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ServerOff,
              color: 'text-sky-500',
              hoverBorder: 'hover:border-sky-500/30',
              glow: 'group-hover:bg-sky-500/10',
              title: '1. Aquisição sem KYC',
              desc: 'Comprar em corretora tradicional (Exchange) é se registrar voluntariamente em um banco de dados de confisco. Utilize plataformas peer-to-peer (P2P) como BISQ e RoboSats para acumular satoshis anonimamente.',
            },
            {
              icon: RefreshCw,
              color: 'text-chart-green',
              hoverBorder: 'hover:border-chart-green/30',
              glow: 'group-hover:bg-chart-green/10',
              title: '2. Economia Circular',
              desc: 'A verdadeira saída da Matrix não é converter BTC de volta para Reais. É usar Bitcoin como unidade de conta direta. Ofereça seu trabalho por satoshis. Compre produtos de outros soberanos. Ignore o banco.',
            },
            {
              icon: ShieldAlert,
              color: 'text-destructive',
              hoverBorder: 'hover:border-destructive/30',
              glow: 'group-hover:bg-destructive/10',
              title: '3. OpSec (Privacidade)',
              desc: 'Privacidade não é crime, é legítima defesa. Compartimente sua vida digital. Use e-mails alias descartáveis (ex: SimpleLogin), navegue via rede Tor e mantenha o bico fechado sobre o seu patrimônio (Silêncio Operacional).',
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className={`bg-card border border-border rounded-2xl p-8 ${pillar.hoverBorder} transition-colors group relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-48 h-48 bg-transparent blur-[80px] rounded-full pointer-events-none ${pillar.glow}`} />
                <div className="relative z-10">
                  <div className={`p-4 bg-background border border-border rounded-xl ${pillar.color} w-fit mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Mecânica BISQ */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto mb-24 bg-gradient-to-br from-card to-background border border-sky-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50" />

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
            <Network className="w-6 h-6 text-sky-400" />
          </div>
          <h3 className="text-3xl font-serif text-foreground">A Máquina de Liquidez: BISQ</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              O BISQ não é um site onde você faz login. É um software de código aberto rodando no seu computador, conectado diretamente à rede Tor. <strong className="text-foreground">Não há CEO, não há conta bancária central para o governo bloquear e não há exigência de documentos.</strong>
            </p>
            <div className="bg-background/50 border border-border p-6 rounded-xl">
              <h4 className="text-foreground font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-500" /> Como o risco é eliminado?
              </h4>
              <p className="text-muted-foreground text-sm">
                Quando você aceita uma oferta, o Bitcoin do vendedor não vai para o BISQ. Ele vai para um contrato inteligente na Blockchain (<strong className="text-foreground">Multisig 2-de-2</strong>). O BTC só é liberado para a sua carteira quando o vendedor confirma que o seu PIX ou TED caiu direto na conta bancária dele.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: ServerOff, title: 'Descentralização Real', desc: 'Se um servidor cair, nada acontece. A rede é sustentada pelos próprios usuários (nodes).', accent: false },
              { icon: EyeOff, title: 'Sem Rastro de Compra', desc: 'O seu banco acha que você fez um PIX para um conhecido. Ele não sabe que foi uma compra de BTC.', accent: true },
              { icon: Shield, title: 'Custódia Imediata', desc: 'Ao final da operação, os satoshis vão direto para a sua Hardware Wallet. Nunca ficam parados na plataforma.', accent: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-4 rounded-xl border border-border bg-card flex items-start gap-4">
                  <div className={`p-2 rounded mt-1 ${item.accent ? 'bg-sky-500/10 border border-sky-500/20 text-sky-500' : 'bg-secondary text-muted-foreground'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-foreground font-bold text-sm">{item.title}</h5>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Footer Soberano */}
      <footer className="max-w-5xl mx-auto text-center pt-12 border-t border-border/50 space-y-6 mt-12">
        <p className="text-2xl font-serif text-foreground/80">Not your keys, not your money.</p>
        <div className="text-muted-foreground text-sm space-y-1">
          <p>Quem não assume a custódia aceita a dependência.</p>
          <p>Autocustódia exige responsabilidade.</p>
        </div>
        <div className="w-12 h-[1px] bg-border mx-auto my-6" />
        <p className="text-gold/80 text-sm font-medium">
          Dependência financeira nunca foi acidente. Sempre foi projeto.
        </p>
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest pt-4">
          Lord Junnior © 2026
        </p>
        <div className="flex items-center justify-center gap-6 pt-8 pb-8">
          <Link to="#" className="text-xs text-muted-foreground/50 hover:text-gold uppercase tracking-wider transition-colors">Termos</Link>
          <span className="text-border">·</span>
          <Link to="#" className="text-xs text-muted-foreground/50 hover:text-gold uppercase tracking-wider transition-colors">Privacidade</Link>
          <span className="text-border">·</span>
          <Link to="#" className="text-xs text-muted-foreground/50 hover:text-gold uppercase tracking-wider transition-colors flex items-center gap-1">
            <Lock className="w-3 h-3" /> PGP
          </Link>
        </div>
      </footer>

    </article>
  );
};

export default EconomiaParalela;
