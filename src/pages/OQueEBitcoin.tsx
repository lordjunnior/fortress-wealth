import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Coins, Lock, Globe, Zap, ShieldCheck, Pickaxe, Layers, TrendingUp, TrendingDown, Key, AlertTriangle } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const NAV_ITEMS = [
  { id: 'definicao', label: '01. Definição' },
  { id: 'utilizacao', label: '02. Utilização' },
  { id: 'vantagens', label: '03. Vantagens' },
  { id: 'infraestrutura', label: '04. Infraestrutura' },
  { id: 'escassez', label: '05. Escassez' },
  { id: 'soberania', label: '06. Soberania' },
  { id: 'alerta', label: 'Alerta Final' },
];

export default function OQueEBitcoin() {
  const [activeSection, setActiveSection] = useState('definicao');
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressVal, setProgressVal] = useState(0);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => scrollProgress.on('change', (v) => setProgressVal(Math.round(v))), [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <Helmet>
        <title>O que é Bitcoin? — Fundamento Zero | Lord Junnior</title>
        <meta name="description" content="Entenda o que é Bitcoin: protocolo descentralizado, escassez absoluta de 21 milhões, blockchain imutável e soberania financeira individual." />
        <meta name="keywords" content="o que é bitcoin, bitcoin explicado, blockchain, descentralização, 21 milhões, satoshi nakamoto" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-600/30 overflow-x-hidden">
        {/* Ambient VFX */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/[0.02] blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
          <motion.div className="h-full bg-orange-500 origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* Floating TOC (Desktop) */}
        <nav className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-lg p-3 space-y-1 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <Coins className="text-orange-500" size={14} />
              <span className="text-orange-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">{progressVal}%</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeSection === item.id
                    ? 'bg-orange-500/10 text-orange-400 border-l-2 border-orange-500'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30 border-l-2 border-transparent'
                }`}
              >{item.label}</button>
            ))}
          </div>
        </nav>

        {/* Back Button */}
        <Link to="/protocolo-inicial" className="fixed top-14 left-4 lg:left-[276px] z-50 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground text-xs font-medium transition-all">
          <ArrowLeft size={14} /> Protocolo Inicial
        </Link>

        {/* Mobile Progress */}
        <div className="xl:hidden fixed bottom-4 right-4 z-50">
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
            <Coins className="text-orange-500" size={12} />
            <span className="text-orange-400 font-mono text-[10px] font-bold">{progressVal}%</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

            {/* HERO */}
            <motion.header style={{ y: heroY }} className="mb-28 relative overflow-hidden rounded-xl p-10 md:p-16 bg-gradient-to-br from-card via-card to-orange-950/20 border border-border/50">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-orange-500/20 blur-[80px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-amber-400/10 blur-[60px]" />
              </div>
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-orange-500/[0.04] pointer-events-none select-none font-black text-[180px] md:text-[280px] leading-none" style={{ fontFamily: 'Arial' }}>₿</div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Fundamento Zero</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                  O que é<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 italic">Bitcoin?</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Ao contrário das moedas fiduciárias impressas ao bel-prazer de burocratas, o Bitcoin é regido por <strong className="text-foreground">leis matemáticas imutáveis</strong>. Uma rede puramente ponto a ponto: valor flui do remetente ao destinatário sem pedir licença a bancos ou governos.
                </p>
              </motion.div>
            </motion.header>

            {/* === 01. DEFINIÇÃO === */}
            <AnimSection>
              <section id="definicao" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Coins size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01. Definição: O que é Bitcoin?</h2>
                </div>
                <div className="bg-card/60 border border-border/50 rounded-xl p-10 md:p-14 space-y-6 text-muted-foreground text-base leading-relaxed">
                  <p>Bitcoin é um <strong className="text-foreground">protocolo de dinheiro digital descentralizado</strong>, criado em 2008 por Satoshi Nakamoto e lançado em janeiro de 2009. Opera sem bancos centrais, sem governos e sem intermediários.</p>
                  <p>É software de código aberto que permite a qualquer pessoa no planeta <strong className="text-foreground">enviar e receber valor pela internet</strong>, sem pedir permissão a ninguém, 24 horas por dia, 365 dias por ano.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[
                      { icon: Globe, title: 'Ponto a Ponto (P2P)', desc: 'Sem intermediários. Você envia valor direto para outra pessoa, em qualquer lugar do mundo.' },
                      { icon: Lock, title: 'Escassez Absoluta', desc: '21 milhões. Nunca haverá mais. A matemática garante o que nenhum político pode prometer.' },
                      { icon: ShieldCheck, title: 'Imutável', desc: 'Uma vez confirmada na blockchain, nenhum governo ou banco pode reverter sua transação.' },
                    ].map((item) => (
                      <div key={item.title} className="p-6 border border-orange-500/15 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 transition-all group">
                        <item.icon className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                        <h4 className="text-foreground font-black uppercase text-xs mb-2 tracking-tighter italic">{item.title}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === 02. UTILIZAÇÃO === */}
            <AnimSection>
              <section id="utilizacao" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Zap size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02. Utilização: Como é Usado?</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Reserva de Valor', desc: 'Proteja seu patrimônio da inflação e do confisco estatal. Muitos tratam o Bitcoin como "ouro digital" — uma reserva de valor soberana e inconfiscável.' },
                    { step: '02', title: 'Meio de Troca', desc: 'Envie e receba pagamentos instantâneos via Lightning Network, sem taxas bancárias, 24/7, para qualquer lugar do planeta.' },
                    { step: '03', title: 'Fuga de Capital', desc: 'Atravesse fronteiras com bilhões na sua mente. Sem alfândega, sem declaração, sem autorização de burocratas.' },
                    { step: '04', title: 'Privacidade Financeira', desc: 'Transacione sem KYC quando mineado ou adquirido P2P. Sua vida financeira é assunto seu, não do Estado.' },
                  ].map((item) => (
                    <div key={item.step} className="bg-card/60 border border-border/50 rounded-xl p-8 flex gap-6 items-start group hover:border-orange-500/20 transition-all">
                      <div className="text-3xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.step}</div>
                      <div>
                        <h4 className="text-foreground font-black uppercase text-sm mb-2 tracking-tighter italic">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* === 03. VANTAGENS === */}
            <AnimSection>
              <section id="vantagens" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <TrendingUp size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03. Vantagens: Por que é Superior?</h2>
                </div>

                {/* Melt Chart: BRL vs BTC */}
                <div className="bg-card/60 border border-border/50 rounded-xl p-8 md:p-12 mb-8">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground font-mono mb-6">Derretimento do Real vs. Ascensão do BTC</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-red-500/20 rounded-lg p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/40" />
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingDown className="text-red-500" size={16} />
                        <span className="text-red-500 font-black uppercase text-[10px] tracking-widest font-mono">Real (BRL)</span>
                      </div>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between text-muted-foreground"><span>Poder de compra desde 1994</span><span className="text-red-400 font-bold">-86%</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Inflação anual (IPCA)</span><span className="text-red-400 font-bold">~5-10%</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Impressão</span><span className="text-red-400 font-bold animate-pulse">∞ ILIMITADA</span></div>
                      </div>
                    </div>
                    <div className="border border-green-500/20 rounded-lg p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/40" />
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-green-500" size={16} />
                        <span className="text-green-500 font-black uppercase text-[10px] tracking-widest font-mono">Bitcoin (BTC)</span>
                      </div>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between text-muted-foreground"><span>Valorização desde 2009</span><span className="text-green-400 font-bold">+∞%</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Retorno anualizado</span><span className="text-green-400 font-bold">~50-100%</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Emissão</span><span className="text-green-400 font-bold">21M FIXO</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Advantage Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { color: 'amber', title: 'Escassez Absoluta', desc: 'Nunca existirão mais de 21 milhões. Enquanto o governo dilui sua riqueza imprimindo papel, o Bitcoin protege seu tempo de vida gravando sua posse em blocos imutáveis.' },
                    { color: 'green', title: 'Divisibilidade Infinita', desc: 'Divisível em 100 milhões de Satoshis. No futuro, você medirá sua riqueza em Sats, não em papel apodrecido.' },
                    { color: 'cyan', title: 'Imutabilidade', desc: 'Uma vez confirmada na Blockchain, ninguém — absolutamente ninguém — pode reverter ou censurar sua transação.' },
                  ].map((card) => (
                    <div key={card.title} className={`rounded-xl p-8 transition-all hover:-translate-y-1 bg-${card.color}-500/5 border border-${card.color}-500/15`}>
                      <h4 className={`text-${card.color}-400 font-black uppercase text-xs mb-3 tracking-wider font-mono`}>{card.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* === 04. INFRAESTRUTURA === */}
            <AnimSection>
              <section id="infraestrutura" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Pickaxe size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04. Infraestrutura: Blockchain e Mineração</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 space-y-4 group hover:border-orange-500/20 transition-all">
                    <Layers className="text-orange-400" size={22} />
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Blockchain</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Uma <strong className="text-foreground">corrente de blocos cronológica</strong> que impede o "gasto duplo". Cada bloco referencia o anterior via hash criptográfico, formando uma cadeia imutável de registros.
                    </p>
                  </div>
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 space-y-4 group hover:border-orange-500/20 transition-all">
                    <Pickaxe className="text-orange-400" size={22} />
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Mineração</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      O processo que protege a rede usando <strong className="text-foreground">energia real</strong> para garantir que transações passadas nunca sejam alteradas. Dinheiro lastreado na física, não em promessas.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { n: '01', t: 'Rede P2P', d: 'Computadores conectados diretamente entre si. Sem servidor central. Cada nó possui uma cópia completa de todas as transações.' },
                    { n: '02', t: 'Proof of Work', d: 'Mineradores competem para resolver um quebra-cabeça matemático. O vencedor adiciona o próximo bloco e recebe BTC como recompensa.' },
                    { n: '03', t: 'Chaves Criptográficas', d: 'Chave pública (endereço para receber) + chave privada (assinatura para enviar). Quem controla a chave privada controla o Bitcoin.' },
                    { n: '04', t: 'Consenso Distribuído', d: 'A rede valida por consenso. Se alguém tentar fraudar, os outros nós rejeitam. A verdade é matemática, não política.' },
                  ].map((item) => (
                    <div key={item.n} className="bg-card/60 border border-border/50 rounded-xl p-6 flex gap-4 items-start group hover:border-orange-500/10 transition-all">
                      <div className="text-2xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.n}</div>
                      <div>
                        <h4 className="text-foreground font-black uppercase text-xs mb-1 tracking-tighter italic">{item.t}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimSection>

            {/* === 05. ESCASSEZ === */}
            <AnimSection>
              <section id="escassez" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Lock size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05. Escassez: O Limite dos 21 Milhões</h2>
                </div>

                <div className="bg-card/60 border border-orange-500/10 rounded-xl p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    O limite de <strong className="text-foreground">21 milhões de bitcoins</strong> é enforced por dezenas de milhares de nós ao redor do mundo. Através do <strong className="text-amber-400">Halving</strong>, a recompensa por bloco cai pela metade a cada ~4 anos, forçando a inflação da rede a tender a zero.
                  </p>

                  {/* Halving Chart */}
                  <div className="mt-6">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground font-mono mb-4">Cronograma de Halvings</h3>
                    <div className="flex items-end gap-2 h-36 border-b border-l border-border/30 p-2">
                      {[
                        { year: '2009', reward: '50', pct: 100 },
                        { year: '2012', reward: '25', pct: 50 },
                        { year: '2016', reward: '12.5', pct: 25 },
                        { year: '2020', reward: '6.25', pct: 12.5 },
                        { year: '2024', reward: '3.125', pct: 6.25 },
                        { year: '2028', reward: '1.56', pct: 3.12 },
                      ].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                          <span className="text-[8px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward}</span>
                          <div
                            className="w-full bg-orange-500/20 border-t border-orange-500 group-hover:bg-orange-500/40 transition-colors rounded-t"
                            style={{ height: `${h.pct}%`, minHeight: '4px' }}
                          />
                          <span className="text-[9px] text-muted-foreground font-mono mt-1">{h.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { label: 'Limite', value: '21M', color: 'text-amber-500' },
                      { label: 'Minerados', value: '~19.8M', color: 'text-foreground' },
                      { label: 'Último', value: '2140', color: 'text-muted-foreground' },
                    ].map((stat) => (
                      <div key={stat.label} className="p-5 border border-border/50 rounded-lg text-center">
                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest font-mono">{stat.label}</p>
                        <p className={`text-2xl font-black italic mt-1 ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === 06. SOBERANIA === */}
            <AnimSection>
              <section id="soberania" className="mb-28 scroll-mt-24">
                <div className="flex items-center gap-3 text-orange-500 mb-10">
                  <Globe size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06. Soberania: Descentralização e Divisibilidade</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/60 border border-border/50 rounded-xl p-8 space-y-4">
                    <h3 className="text-foreground font-black uppercase text-sm tracking-wider font-mono italic">Descentralização</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Não existe CEO, sede ou conselho diretivo. O criador desapareceu. <strong className="text-foreground">Sem líder para ser preso, corrompido ou pressionado</strong>, o Bitcoin é resistente à captura regulatória ou corporativa.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Dezenas de milhares de nós independentes validam as mesmas regras. Alterar o protocolo exige consenso da rede inteira.
                    </p>
                  </div>
                  <div className="bg-card/60 border border-orange-500/10 rounded-xl p-8 space-y-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.4),transparent_70%)]" />
                    <div className="relative z-10">
                      <h3 className="text-amber-400 font-black uppercase text-sm tracking-wider font-mono italic">Divisibilidade</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Cada bitcoin é divisível em <strong className="text-foreground">100 milhões de Satoshis</strong>. Você não precisa comprar 1 BTC inteiro.
                      </p>
                      <div className="text-center">
                        <div className="text-4xl font-black text-foreground italic">1 BTC</div>
                        <div className="text-amber-500 font-black text-lg my-1">=</div>
                        <div className="text-4xl font-black text-amber-500 italic">100.000.000</div>
                        <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mt-1 font-mono">Satoshis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

            {/* === ALERTA FINAL === */}
            <AnimSection>
              <section id="alerta" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 text-destructive mb-10">
                  <AlertTriangle size={20} />
                  <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Alerta Final: Autocustódia</h2>
                </div>

                <div className="bg-card/60 border border-destructive/20 rounded-xl p-10 md:p-14 relative overflow-hidden mb-10">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.5),transparent_60%)]" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                      <Key className="text-destructive mt-1 flex-shrink-0 animate-pulse" size={24} />
                      <div>
                        <h3 className="text-destructive font-black uppercase text-lg tracking-wider font-mono italic mb-3">Not Your Keys, Not Your Coins</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          Muitas pessoas cometem o erro de deixar seus Bitcoins sob a guarda de custodiantes. Entenda: <strong className="text-foreground">Chaves privadas são o que permitem o envio de Bitcoins</strong>.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Se você não controla suas chaves, você <strong className="text-destructive">não tem Bitcoin</strong>; você tem uma promessa de pagamento de um terceiro.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 border border-destructive/20 rounded-lg bg-destructive/5 text-center">
                      <p className="text-destructive font-black uppercase text-sm font-mono tracking-wider animate-pulse">
                        NUNCA COMPARTILHE SUAS CHAVES PRIVADAS
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conclusão */}
                <div className="bg-card/60 border border-orange-500/20 rounded-xl p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.5),transparent_60%)]" />
                  <div className="relative z-10 space-y-8">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
                      O <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Estalo</span> Mental
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: 'Ponto a Ponto', desc: 'Sem intermediários, sem censura. Valor flui direto entre pessoas livres.' },
                        { title: '21 Milhões', desc: 'Oferta fixa contra impressão infinita. Seu suor preservado em código.' },
                        { title: 'Inviolável', desc: 'A rede mais segura do planeta, operando sem parar há mais de uma década.' },
                      ].map((item) => (
                        <div key={item.title} className="space-y-2">
                          <p className="text-orange-400 font-black uppercase text-sm font-mono">{item.title}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimSection>

          </div>
        </div>
      </div>
    </>
  );
}
