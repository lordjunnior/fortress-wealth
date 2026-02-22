import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, KeyRound, BookOpen, AlertTriangle } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const EntendaBitcoin: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">

        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Link
            to="/educacao"
            className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Retornar ao Início
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-chart-green bg-chart-green/10 px-3 py-1.5 rounded-full border border-chart-green/20 inline-block mb-6">
            Para Leigos Absolutos
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-2">
            Entenda o Bitcoin
          </h1>
          <p className="text-3xl md:text-5xl font-bold text-gold mb-8">— ainda hoje</p>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-6">
            Você não precisa entender de economia, programação ou gráficos.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura. É o fim das dúvidas e o início da sua liberdade.
          </p>

          {/* Quote */}
          <div className="border-l-2 border-gold/40 pl-6 py-2 mb-4">
            <p className="text-foreground/80 text-sm italic leading-relaxed">
              "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
            </p>
            <p className="text-gold text-xs font-bold mt-3 uppercase tracking-widest">Lord Junnior</p>
          </div>
        </motion.div>

        {/* O que você vai entender */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">O que você vai entender</h2>
          <div className="space-y-4">
            {[
              'A história do dinheiro (explicada como uma história, não uma aula).',
              'Por que o Bitcoin vale algo e por que não pode ser copiado.',
              'Como funciona sua "senha mestre" e a segurança da rede.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Por que este material existe */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Por que este material existe</h2>
          <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <p className="text-foreground font-bold text-lg">A queda não é do mercado. É da consciência.</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bitcoin não surge como solução mágica. Surge como <strong className="text-foreground">explicação tardia</strong>.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.
            </p>
            <div className="pt-4 border-t border-border/50">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Este material é gratuito, não exige cadastro e não é uma "isca" para vender curso. Baixe, leia e tire suas conclusões.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.35 }} className="mb-16">
          <button className="w-full py-5 rounded-2xl bg-gold hover:bg-gold/90 text-background font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_hsl(var(--gold)/0.2)] hover:shadow-[0_0_40px_hsl(var(--gold)/0.3)]">
            <Download className="w-5 h-5" />
            Baixar PDF Gratuito
          </button>
        </motion.div>

        {/* Próximo Nível */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="mb-16">
          <div className="bg-card border border-gold/20 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-gold/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold/10 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <KeyRound className="w-10 h-10 text-gold mx-auto mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Próximo Nível</p>
              <p className="text-foreground text-sm leading-relaxed mb-6">
                Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática.
              </p>
              <Link
                to="/educacao"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/5 transition-all"
              >
                Ir para o Arsenal Técnico <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.45 }} className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 mb-16">
          <p className="text-destructive text-xs font-bold flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            Not your keys, not your money. Quem não assume a custódia aceita a dependência. Autocustódia exige responsabilidade.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="text-center space-y-3 pt-8 border-t border-border/30">
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

export default EntendaBitcoin;
