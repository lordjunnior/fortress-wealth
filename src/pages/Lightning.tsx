import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Zap, Scale, Wallet, Network,
  ShieldAlert, ShieldCheck, XCircle, CheckCircle2,
  Key, EyeOff, AlertTriangle
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Lightning: React.FC = () => {
  return (
    <article className="min-h-screen bg-background pt-28 pb-12 px-4 animate-fade-in font-sans">

      <div className="max-w-5xl mx-auto mb-12">
        <Link to="/educacao" className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao Arsenal
        </Link>
      </div>

      {/* Hero */}
      <motion.header {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto mb-20 border-b border-border/50 pb-12">
        <div className="inline-block px-3 py-1 mb-6 border border-gold/20 rounded bg-gold/5">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Zap className="w-3 h-3 fill-current" /> Camada 2 & Velocidade
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          Lightning no <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold to-orange-500">Bolso</span>
        </h1>
        <h2 className="text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
          Liquidez imediata, taxas quase nulas e privacidade. A Lightning Network transforma o Bitcoin de uma reserva de valor estática em um <strong className="text-foreground font-medium">meio de troca letal contra o sistema fiduciário.</strong>
        </h2>
      </motion.header>

      {/* Tribunal vs Bolso */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-5xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif text-foreground mb-4">A Arquitetura em Duas Camadas</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tentaram te convencer de que o Bitcoin é "lento e caro". Eles não entenderam como sistemas monetários robustos funcionam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary rounded-xl"><Scale className="w-6 h-6 text-muted-foreground" /></div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block">Camada 1 (On-chain)</span>
                <h4 className="text-2xl font-bold text-foreground">O Tribunal</h4>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A blockchain base não foi feita para comprar café. Ela é o <strong className="text-foreground">juiz absoluto</strong>. Lenta, pesada e inquestionável. Você usa a Camada 1 para guardar a riqueza de uma vida, não para pagar o almoço.
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-background border border-gold/20 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-[0_0_30px_hsl(var(--gold)/0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 bg-gold/10 border border-gold/30 rounded-xl"><Wallet className="w-6 h-6 text-gold" /></div>
              <div>
                <span className="text-[10px] text-gold uppercase tracking-widest font-bold block">Camada 2 (Lightning)</span>
                <h4 className="text-2xl font-bold text-foreground">O Dinheiro no Bolso</h4>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed relative z-10">
              Uma rede de contratos inteligentes construída <em>sobre</em> o Bitcoin. Transações liquidadas em milissegundos, custando frações de centavo. É o dinheiro físico do ciberespaço.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mecânica */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="max-w-5xl mx-auto mb-24">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-serif text-foreground mb-10 border-b border-border pb-4">Como a mágica acontece</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-5 h-5 text-gold" />
                <h4 className="text-xl font-bold text-foreground">Canais de Pagamento</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pense num canal como a "conta pendurada" num bar. Você e o garçom travam BTC na Camada 1. Durante a noite, vocês atualizam o saldo milhares de vezes instantaneamente. Só quando o bar fecha (canal é fechado), o saldo final é escrito no Tribunal (Camada 1).
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-gold" />
                <h4 className="text-xl font-bold text-foreground">Roteamento (Cebola)</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Você não precisa ter um canal direto com quem vai receber. A rede procura o caminho mais rápido através de terceiros. E graças ao <em>Onion Routing</em>, quem repassa o pagamento não sabe quem é o pagador nem o destino final.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Análise de Ameaça */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto mb-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Análise de Ameaça Operacional</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Usar Lightning de forma errada é trocar o gerente do Itaú por um "gerente de Bitcoin". Entenda a diferença entre praticidade e soberania.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custodial */}
          <div className="bg-card border border-destructive/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-destructive/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-1">Custodial</h4>
                <p className="text-muted-foreground text-sm">Ex: Wallet of Satoshi, Blink</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                <ShieldAlert className="w-6 h-6 text-destructive" />
              </div>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold text-sm block mb-1">Terceirização de Chaves</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">Você não tem as chaves. Se o aplicativo sair do ar ou sofrer pressão estatal, seu saldo desaparece.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold text-sm block mb-1">Rastreamento (KYC Indireto)</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">A empresa processa suas transações e possui logs dos seus endereços IP e invoices.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-destructive/20 pt-6 relative z-10">
              <p className="text-destructive text-sm font-bold uppercase tracking-widest text-center">Veredito: Dinheiro de Pinga</p>
              <p className="text-muted-foreground text-xs text-center mt-2">Use apenas para pequenas transações diárias. Nunca guarde valor aqui.</p>
            </div>
          </div>

          {/* Non-Custodial */}
          <div className="bg-gradient-to-br from-card to-background border border-chart-green/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-chart-green/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-chart-green/10 transition-colors" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-1">Non-Custodial</h4>
                <p className="text-muted-foreground text-sm">Ex: Phoenix, Zeus, Mutiny</p>
              </div>
              <div className="p-3 bg-chart-green/10 rounded-xl border border-chart-green/30">
                <ShieldCheck className="w-6 h-6 text-chart-green" />
              </div>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                <Key className="w-5 h-5 text-chart-green shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold text-sm block mb-1">Soberania Total</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">Você possui a Seed Phrase de 12 palavras. O aplicativo roda um node na própria memória do celular.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border">
                <EyeOff className="w-5 h-5 text-chart-green shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold text-sm block mb-1">Privacidade Máxima</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">Sendo seu próprio node, você assina as transações localmente. O roteamento esconde a origem do pagamento.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-chart-green/30 pt-6 relative z-10">
              <p className="text-chart-green text-sm font-bold uppercase tracking-widest text-center">Veredito: Arma Principal</p>
              <p className="text-muted-foreground text-xs text-center mt-2">A verdadeira economia paralela opera aqui. Exige responsabilidade no backup.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto text-center pt-12 border-t border-border/50 space-y-6 mt-12">
        <p className="text-2xl font-serif text-foreground/80">Not your keys, not your money.</p>
        <div className="text-muted-foreground text-sm space-y-1">
          <p>Lightning custodial é prático, mas não é soberano.</p>
          <p>Soberania exige responsabilidade.</p>
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
            <Key className="w-3 h-3" /> PGP
          </Link>
        </div>
      </footer>

    </article>
  );
};

export default Lightning;
