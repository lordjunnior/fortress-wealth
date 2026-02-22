import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Shield, Lock, Flame, Eye,
  Layers, Shuffle, Globe, Key, AlertTriangle, CheckCircle2,
  XCircle, Hammer, ArrowRight, BookOpen
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Autocustodia: React.FC = () => {
  return (
    <article className="min-h-screen bg-background pt-28 pb-12 px-4 animate-fade-in font-sans">

      {/* Navegação */}
      <div className="max-w-5xl mx-auto mb-12">
        <Link to="/educacao" className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao Arsenal
        </Link>
      </div>

      {/* Hero Section */}
      <motion.header {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto mb-20 border-b border-border/50 pb-12">
        <div className="inline-block px-3 py-1 mb-6 border border-gold/20 rounded bg-gold/5">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Arsenal Técnico</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          Arquitetura de <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground/50">Autocustódia</span>
        </h1>
        <h2 className="text-xl text-muted-foreground font-light max-w-3xl leading-relaxed mb-10">
          Não basta ter uma seed phrase anotada no papel. Autocustódia real envolve a <strong className="text-foreground font-medium">camada física</strong> (sobrevivência a desastres), criptografia de comunicação e estruturas avançadas de assinatura.
        </h2>

        <Link to="/educacao" className="inline-flex items-center gap-3 px-8 py-4 bg-secondary border border-border hover:border-gold hover:bg-gold hover:text-background rounded-xl text-foreground text-sm font-bold uppercase tracking-wide transition-all group shadow-lg">
          <BookOpen className="w-5 h-5" /> Acessar Manuais Detalhados
        </Link>
      </motion.header>

      {/* Camada Física */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-5xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-l-2 border-gold pl-6">
          <div>
            <h3 className="text-3xl font-serif text-foreground mb-2">Camada Física</h3>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">O Problema do Mundo Real</p>
          </div>
          <div className="mt-4 md:mt-0 text-muted-foreground text-sm max-w-xs text-right italic">
            "O que acontece quando o desastre bate na porta?"
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Papel - Negativo */}
          <div className="p-8 md:p-10 rounded-2xl bg-card border border-destructive/20 hover:border-destructive/40 transition-colors group relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-destructive/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-destructive/10 rounded-xl text-destructive border border-destructive/20"><AlertTriangle className="w-8 h-8" /></div>
                <span className="text-destructive font-bold text-xs uppercase tracking-widest border border-destructive/20 px-3 py-1.5 rounded bg-destructive/5">Frágil</span>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">Papel</h4>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                Suscetível a umidade, fogo, insetos e desgaste natural. É uma aposta contra o tempo.
              </p>
              <div className="inline-flex items-center gap-2 text-destructive font-bold text-lg bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/20">
                <XCircle className="w-5 h-5" /> ILEGÍVEL
              </div>
            </div>
          </div>

          {/* Metal - Positivo */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-card to-background border border-chart-green/30 hover:border-chart-green/50 transition-colors group relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-chart-green/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-chart-green/10 rounded-xl text-chart-green border border-chart-green/20"><Shield className="w-8 h-8" /></div>
                <span className="text-chart-green font-bold text-xs uppercase tracking-widest border border-chart-green/20 px-3 py-1.5 rounded bg-chart-green/5">Robusto</span>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">Metal</h4>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                Aço inoxidável ou titânio. Resiste a 1100°C, corrosão e inundações. A única forma de vencer a entropia.
              </p>
              <div className="inline-flex items-center gap-2 text-chart-green font-bold text-lg bg-chart-green/10 px-4 py-2 rounded-lg border border-chart-green/20">
                <CheckCircle2 className="w-5 h-5" /> LEGÍVEL
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl text-center">
          <p className="text-muted-foreground text-lg">
            "No mundo real, o problema não é hacker. <strong className="text-foreground">É fogo, água e tempo.</strong>"
          </p>
        </div>
      </motion.section>

      {/* Estrutura & Mentalidade */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Estrutura de Risco */}
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-10 border-b border-border pb-4">Estrutura de Risco</h3>
            <div className="space-y-6 relative ml-4">
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-border via-gold/50 to-border" />

              <div className="relative flex items-center gap-8">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center z-10">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="bg-card border border-border p-4 rounded-xl flex-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1 font-bold">Mundo Digital</span>
                  <p className="text-foreground font-medium">Sua Seed (12/24 Palavras)</p>
                </div>
              </div>

              <div className="relative flex items-center gap-8">
                <div className="w-12 h-12 rounded-full bg-background border border-gold flex items-center justify-center z-10 shadow-[0_0_20px_hsl(var(--gold)/0.3)]">
                  <Layers className="w-5 h-5 text-gold" />
                </div>
                <div className="bg-gold/5 border border-gold/30 p-4 rounded-xl flex-1">
                  <span className="text-[10px] text-gold uppercase tracking-widest block mb-1 font-bold">Camada Física (O Elo)</span>
                  <p className="text-foreground font-bold">Papel <span className="text-muted-foreground mx-2 font-normal">|</span> <span className="text-gold">Metal</span></p>
                </div>
              </div>

              <div className="relative flex items-center gap-8">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center z-10">
                  <Flame className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="bg-card border border-border p-4 rounded-xl flex-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1 font-bold">Mundo Real</span>
                  <p className="text-muted-foreground text-sm">Se a camada física falha, o mundo real destrói o digital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentalidade */}
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-10 border-b border-border pb-4">Mentalidade</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-card border border-destructive/10 opacity-80">
                <span className="text-xs text-destructive font-bold uppercase tracking-widest block mb-6">Suposição (Erro)</span>
                <ul className="space-y-4 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-destructive rounded-full" />Seed em Papel</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-destructive rounded-full" />Nunca Testada</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-destructive rounded-full" />Confiança Emocional</li>
                </ul>
                <p className="text-sm text-destructive/80 font-mono border-t border-border pt-4">"Eu acho que funciona"</p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-chart-green/30 shadow-lg">
                <span className="text-xs text-chart-green font-bold uppercase tracking-widest block mb-6">Certeza (Fato)</span>
                <ul className="space-y-4 text-sm text-foreground mb-8">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-chart-green rounded-full shadow-[0_0_8px_hsl(var(--chart-green))]" />Seed em Metal</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-chart-green rounded-full shadow-[0_0_8px_hsl(var(--chart-green))]" />Recuperação Testada</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-chart-green rounded-full shadow-[0_0_8px_hsl(var(--chart-green))]" />Confiança Verificada</li>
                </ul>
                <p className="text-sm text-chart-green font-mono font-bold border-t border-chart-green/20 pt-4">"Eu SEI que funciona"</p>
              </div>
            </div>
            <div className="mt-8 text-center bg-gold/5 border border-gold/20 p-6 rounded-xl">
              <p className="text-foreground font-serif text-xl">
                Autocustódia não é sobre acreditar.<br /><span className="text-gold font-bold">É sobre ter certeza.</span>
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Checklist */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-5xl mx-auto mb-24 p-8 md:p-12 rounded-3xl bg-card border border-border relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

        <h3 className="text-3xl font-serif text-foreground mb-12 text-center">Checklist de Escolha</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4 group">
            <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
              <Eye className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <h4 className="text-foreground font-bold text-lg">Clareza Visual</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Você consegue ler as letras sob estresse extremo ou no escuro?</p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
              <Hammer className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <h4 className="text-foreground font-bold text-lg">Montagem</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Você consegue montar as palavras sem errar a ordem e sem se machucar?</p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
              <Flame className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <h4 className="text-foreground font-bold text-lg">Resistência</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">O material aguenta 1100°C (incêndio) e corrosão por água salgada?</p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
              <Key className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <h4 className="text-foreground font-bold text-lg">Discrição</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Se encontrada por terceiros, parece valiosa ou passa despercebida?</p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="px-10 py-4 bg-gold text-background rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gold/90 transition-all shadow-[0_0_20px_hsl(var(--gold)/0.3)] hover:-translate-y-1">
            Ver Opção Recomendada
          </button>
        </div>
      </motion.section>

      {/* Protocolos Digitais */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="max-w-5xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h3 className="text-3xl font-serif text-foreground mb-2">Protocolos Digitais</h3>
            <p className="text-muted-foreground text-sm">A blindagem no ciberespaço.</p>
          </div>
          <span className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-wider bg-card px-6 py-3 rounded-lg border border-gold/30 group cursor-default">
            O que não te contaram sobre autocustódia <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Lock, title: 'PGP Encryption', layer: 'Camada Digital', desc: 'Criado em 1991, o PGP é a base da comunicação soberana. Garante que apenas o destinatário com a chave privada leia a mensagem.' },
            { icon: Globe, title: 'VPN & TOR', layer: 'Camada de Rede', desc: 'Seu ISP sabe que você acessa serviços de Bitcoin. Use o TOR para mascarar seu tráfego e uma VPN paga (sem logs) como camada extra.' },
            { icon: Layers, title: 'Multisig (Electrum)', layer: 'Camada de Assinatura', desc: 'Single-sig tem ponto único de falha. Multisig (ex: 2-de-3) exige que chaves distintas em locais físicos distintos assinem a transação.' },
            { icon: Shuffle, title: 'Wasabi & Coinjoin', layer: 'Camada de Privacidade', desc: 'O Bitcoin é transparente. Coinjoin embaralha UTXOs de múltiplos usuários, quebrando o rastro (heurística).' },
          ].map((protocol) => {
            const Icon = protocol.icon;
            return (
              <div key={protocol.title} className="group p-8 rounded-2xl bg-card border border-border hover:border-muted-foreground/30 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-background border border-border rounded-xl"><Icon className="w-6 h-6 text-muted-foreground" /></div>
                  <h4 className="text-xl font-bold text-foreground">{protocol.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">{protocol.layer}</span>
                  {protocol.desc}
                </p>
              </div>
            );
          })}
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

export default Autocustodia;
