import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Server, HardDrive, Cpu,
  ShieldCheck, Network, EyeOff, Lock, AlertTriangle, BookOpen
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Infraestrutura: React.FC = () => {
  return (
    <article className="min-h-screen bg-background pt-28 pb-12 px-4 animate-fade-in font-sans">

      {/* Navegação */}
      <div className="max-w-5xl mx-auto mb-12">
        <Link to="/educacao" className="text-muted-foreground hover:text-purple-400 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao Arsenal
        </Link>
      </div>

      {/* Hero */}
      <motion.header {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto mb-20 border-b border-border/50 pb-12">
        <div className="inline-block px-3 py-1 mb-6 border border-purple-500/20 rounded bg-purple-500/5">
          <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">Don't Trust. Verify.</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          Rodando com o <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600">Urso Dov</span>
        </h1>
        <h2 className="text-xl text-muted-foreground font-light max-w-3xl leading-relaxed mb-10">
          Se você não roda seu próprio node, você está confiando no computador de outra pessoa para dizer quanto dinheiro você tem e ditando as regras. <strong className="text-foreground font-medium">Isso não é soberania. É terceirização da verdade.</strong>
        </h2>

        <button className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-[0_0_25px_rgba(147,51,234,0.3)] uppercase tracking-wide text-sm">
          <BookOpen className="w-5 h-5" /> Acessar Guia de Montagem
        </button>
      </motion.header>

      {/* O Falso Soberano */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-5xl mx-auto mb-24">
        <div className="bg-card border border-destructive/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-3xl font-serif text-foreground">A Ilusão da Privacidade</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Muitos compram uma Hardware Wallet (Ledger, Trezor) e acham que estão 100% protegidos. O problema é o software (Ledger Live, Trezor Suite). Ao usá-los sem um Node próprio, sua carteira consulta os servidores da fabricante para checar seu saldo.
            </p>
            <div className="bg-background/50 border border-destructive/20 p-6 rounded-xl">
              <h4 className="text-destructive font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                <EyeOff className="w-4 h-4" /> O que eles descobrem:
              </h4>
              <ul className="space-y-3 text-foreground/80 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-destructive rounded-full" /> Seu endereço IP (sua localização física).</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-destructive rounded-full" /> Todos os seus endereços de Bitcoin.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-destructive rounded-full" /> Seu saldo total e histórico de transações.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* O que é um Node */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="max-w-5xl mx-auto mb-24 text-center">
        <h3 className="text-3xl font-serif text-foreground mb-6">O seu Banco Central Pessoal</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          Um Node é um computador que baixa e valida de forma independente toda a blockchain do Bitcoin, desde o bloco gênesis em 2009. Ele garante matematicamente que as regras do consenso estão sendo seguidas e que <strong className="text-foreground">ninguém está imprimindo dinheiro falso</strong> (inflação não autorizada pelo código).
        </p>
      </motion.section>

      {/* Hardware Bento Grid */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto mb-24">
        <div className="flex items-center gap-4 mb-10 border-l-2 border-purple-500 pl-6">
          <div>
            <h3 className="text-3xl font-serif text-foreground mb-2">Hardware & Setup</h3>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">A Máquina de Validação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: 'O Cérebro (Mini PC/Pi)',
              desc: 'Você não precisa de um supercomputador, mas de uma máquina dedicada que rode 24/7 com baixo consumo de energia.',
              spec: 'Recomendado: Raspberry Pi 4/5 ou Mini PC Intel N100',
            },
            {
              icon: HardDrive,
              title: 'O Cofre (SSD 1TB+)',
              desc: 'O histórico completo do Bitcoin pesa mais de 500GB e cresce diariamente. HDDs mecânicos são proibidos (causam lentidão severa na sincronização).',
              spec: 'Obrigatório: SSD NVMe ou SATA de 1TB (Mínimo)',
            },
            {
              icon: Server,
              title: 'O Sistema (OS)',
              desc: 'Softwares modernos transformaram a configuração de um Node em uma experiência "Plug and Play", instalável em poucos cliques.',
              spec: 'Sistemas: Umbrel, Start9 ou RoninDojo',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-8 hover:border-purple-500/30 transition-colors group">
                <div className="p-4 bg-background border border-border rounded-xl text-purple-400 w-fit mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="text-xs text-purple-400 font-mono bg-purple-500/10 px-3 py-2 rounded border border-purple-500/20 inline-block">
                  {item.spec}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Validação Soberana */}
      <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-5xl mx-auto mb-24 bg-gradient-to-br from-card to-background border border-purple-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-3xl font-serif text-foreground">O Objetivo: Validação Soberana</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              O objetivo final de construir o Urso Dov é <strong className="text-foreground">conectar sua Hardware Wallet exclusivamente ao seu próprio Node</strong> via rede Tor ou rede local.
            </p>
            <div className="p-6 bg-purple-500/5 border-l-2 border-purple-500 rounded-r-xl">
              <p className="text-foreground font-medium">
                Isso impede que os servidores dos fabricantes da carteira saibam seus endereços e saldos, garantindo <span className="text-purple-400 font-bold uppercase tracking-wider">privacidade total</span>.
              </p>
            </div>
          </div>

          <div className="bg-background/80 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="text-center">
                <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <span className="text-xs text-muted-foreground font-bold uppercase">Sua Carteira</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-purple-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500/20 px-2 py-1 rounded text-[10px] text-purple-400 font-bold uppercase whitespace-nowrap">Rede Local / Tor</div>
              </div>
              <div className="text-center">
                <Server className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <span className="text-xs text-purple-400 font-bold uppercase">Seu Node</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-border relative" />
              <div className="text-center opacity-50">
                <Network className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <span className="text-xs text-muted-foreground font-bold uppercase">Rede BTC</span>
              </div>
            </div>
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

export default Infraestrutura;
