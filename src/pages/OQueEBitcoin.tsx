import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coins, Lock, Globe, Zap, ShieldCheck, ShieldAlert, Pickaxe, Layers, TrendingUp, TrendingDown, Key, AlertTriangle } from 'lucide-react';

const SECTIONS = [
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      const sects = SECTIONS.map(s => ({ id: s.id, el: document.getElementById(s.id) }));
      for (let i = sects.length - 1; i >= 0; i--) {
        if (sects[i].el && sects[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sects[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-orange-600 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="oqb-dust"></div><div className="oqb-dust oqb-dust-2"></div>
      </div>

      <style>{`
        @keyframes oqbDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(35px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .oqb-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 18% 22%,rgba(249,115,22,0.25) 100%,transparent),radial-gradient(1px 1px at 55% 48%,rgba(255,255,255,0.12) 100%,transparent);background-size:200px 200px;animation:oqbDrift 55s linear infinite }
        .oqb-dust-2 { background-size:300px 300px;animation:oqbDrift 80s linear infinite reverse;opacity:0.5 }
        .oqb-shimmer { background:linear-gradient(90deg,#f97316 0%,#fb923c 40%,#fff 50%,#fb923c 60%,#f97316 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:oqbShim 3s linear infinite }
        @keyframes oqbShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 12px rgba(249,115,22,0.15)} }
        .nav-active { background:rgba(249,115,22,0.08);border-left:2px solid rgba(249,115,22,0.8);color:#f5f5f5;animation:goldGlow 3s ease-in-out infinite }
        @keyframes alertPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .alert-pulse { animation:alertPulse 2s ease-in-out infinite }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
        <div className="h-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-[2px] left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/protocolo-inicial" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Protocolo
          </Link>
          <div className="flex items-center gap-1">
            <Coins className="text-orange-500" size={12} />
            <span className="text-orange-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">O que é Bitcoin</span>
          </div>
          <span className="text-[8px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="text-orange-500" size={16} />
              <span className="text-orange-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">O que é Bitcoin</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>

          {/* Status */}
          <div className="px-5 pt-3 pb-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-[5px] h-[5px] rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-green-500/70 font-mono">Status: Operacional</span>
              <span className="text-[7px] font-black text-slate-600 font-mono ml-auto">5 min</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id ? 'nav-active' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* Hero */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(40,15,5,0.6) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(249,115,22,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-orange-500/[0.05] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
            <div className="relative z-10">
              <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Fundamento Zero</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                O que é<br />
                <span className="oqb-shimmer italic">Bitcoin?</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Ao contrário das moedas fiduciárias impressas ao bel-prazer de burocratas, o Bitcoin é regido por <strong className="text-white">leis matemáticas imutáveis</strong>. Uma rede puramente ponto a ponto: valor flui do remetente ao destinatário sem pedir licença a bancos ou governos. É o fim da "terceira parte confiável" que sempre traiu sua confiança.
              </p>
            </div>
          </header>

          {/* === 01. DEFINIÇÃO === */}
          <section id="definicao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Coins size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01. Definição: O que é Bitcoin?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Bitcoin é um <strong className="text-white">protocolo de dinheiro digital descentralizado</strong>, criado em 2008 por Satoshi Nakamoto e lançado em janeiro de 2009. Opera sem bancos centrais, sem governos e sem intermediários.
              </p>
              <p>
                É software de código aberto que permite a qualquer pessoa no planeta <strong className="text-white">enviar e receber valor pela internet</strong>, sem pedir permissão a ninguém, 24 horas por dia, 365 dias por ano. É o fim da "terceira parte confiável" que, historicamente, sempre traiu sua confiança confiscando seu poder de compra.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <Globe className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Ponto a Ponto (P2P)</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Sem intermediários. Você envia valor direto para outra pessoa, em qualquer lugar do mundo.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <Lock className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Escassez Absoluta</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">21 milhões. Nunca haverá mais. A matemática garante o que nenhum político pode prometer.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <ShieldCheck className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Imutável</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Uma vez confirmada na blockchain, nenhum governo ou banco pode reverter sua transação.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === 02. UTILIZAÇÃO === */}
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
              ].map((item, i) => (
                <div key={i} className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 flex gap-6 items-start group hover:border-orange-500/20 transition-all">
                  <div className="text-3xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.step}</div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-2 tracking-tighter italic">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === 03. VANTAGENS === */}
          <section id="vantagens" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <TrendingUp size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03. Vantagens: Por que é Superior?</h2>
            </div>

            {/* Melt Chart: BRL vs BTC */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12 mb-8">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">Derretimento do Real vs. Ascensão do BTC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-500/20 rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/40"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="text-red-500" size={16} />
                    <span className="text-red-500 font-black uppercase text-[10px] tracking-widest font-mono">Real (BRL)</span>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between text-slate-500"><span>Poder de compra desde 1994</span><span className="text-red-400 font-bold">-86%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Inflação anual (IPCA)</span><span className="text-red-400 font-bold">~5-10%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Impressão</span><span className="text-red-400 font-bold animate-pulse">∞ ILIMITADA</span></div>
                  </div>
                </div>
                <div className="border border-green-500/20 rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/40"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-green-500 font-black uppercase text-[10px] tracking-widest font-mono">Bitcoin (BTC)</span>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between text-slate-500"><span>Valorização desde 2009</span><span className="text-green-400 font-bold">+∞%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Retorno anualizado</span><span className="text-green-400 font-bold">~50-100%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Emissão</span><span className="text-green-400 font-bold">21M FIXO</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Advantage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h4 className="text-amber-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">Escassez Absoluta</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Nunca existirão mais de 21 milhões. Enquanto o governo dilui sua riqueza imprimindo papel, o Bitcoin protege seu <strong className="text-white">tempo de vida</strong> gravando sua posse em blocos imutáveis.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">Divisibilidade Infinita</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Divisível em <strong className="text-white">100 milhões de Satoshis</strong>. No futuro, você medirá sua riqueza em Sats, não em papel apodrecido.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(8,145,178,0.04) 100%)', border: '1px solid rgba(6,182,212,0.12)' }}>
                <h4 className="text-cyan-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">Imutabilidade</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Uma vez confirmada na Blockchain, <strong className="text-white">ninguém — absolutamente ninguém</strong> — pode reverter ou censurar sua transação.</p>
              </div>
            </div>
          </section>

          {/* === 04. INFRAESTRUTURA === */}
          <section id="infraestrutura" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Pickaxe size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04. Infraestrutura: Blockchain e Mineração</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4 group hover:border-orange-500/20 transition-all"
                style={{ boxShadow: '0 0 0 rgba(249,115,22,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(249,115,22,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(249,115,22,0)')}
              >
                <Layers className="text-orange-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Blockchain</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Uma <strong className="text-white">corrente de blocos cronológica</strong> que impede o "gasto duplo". Cada bloco referencia o anterior via hash criptográfico, formando uma cadeia imutável de registros que nenhum poder terrestre pode alterar.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4 group hover:border-orange-500/20 transition-all"
                style={{ boxShadow: '0 0 0 rgba(249,115,22,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(249,115,22,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(249,115,22,0)')}
              >
                <Pickaxe className="text-orange-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Mineração</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  O processo que protege a rede usando <strong className="text-white">energia real</strong> para garantir que transações passadas nunca sejam alteradas. É o dinheiro lastreado na física, não em promessas de políticos insolventes.
                </p>
              </div>
            </div>

            {/* How it works steps */}
            <div className="space-y-3">
              {[
                { n: '01', t: 'Rede P2P', d: 'Computadores conectados diretamente entre si. Sem servidor central. Cada nó possui uma cópia completa de todas as transações.' },
                { n: '02', t: 'Proof of Work', d: 'Mineradores competem para resolver um quebra-cabeça matemático. O vencedor adiciona o próximo bloco e recebe BTC como recompensa.' },
                { n: '03', t: 'Chaves Criptográficas', d: 'Chave pública (endereço para receber) + chave privada (assinatura para enviar). Quem controla a chave privada controla o Bitcoin.' },
                { n: '04', t: 'Consenso Distribuído', d: 'A rede valida por consenso. Se alguém tentar fraudar, os outros nós rejeitam. A verdade é matemática, não política.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-6 flex gap-4 items-start group hover:border-orange-500/10 transition-all">
                  <div className="text-2xl font-black text-orange-500/20 group-hover:text-orange-500/50 transition-colors font-mono shrink-0">{item.n}</div>
                  <div>
                    <h4 className="text-white font-black uppercase text-xs mb-1 tracking-tighter italic">{item.t}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === 05. ESCASSEZ === */}
          <section id="escassez" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05. Escassez: O Limite dos 21 Milhões</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-8 md:p-12 space-y-6">
              <p className="text-slate-400 text-base leading-relaxed">
                O limite de <strong className="text-white">21 milhões de bitcoins</strong> é enforced por dezenas de milhares de nós ao redor do mundo. Através do <strong className="text-amber-400">Halving</strong>, a recompensa por bloco cai pela metade a cada ~4 anos, forçando a inflação da rede a tender a zero.
              </p>

              {/* Halving Chart */}
              <div className="mt-6">
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-4">Cronograma de Halvings</h3>
                <div className="flex items-end gap-2 h-36 border-b border-l border-white/10 p-2">
                  {[
                    { year: '2009', reward: '50', pct: 100 },
                    { year: '2012', reward: '25', pct: 50 },
                    { year: '2016', reward: '12.5', pct: 25 },
                    { year: '2020', reward: '6.25', pct: 12.5 },
                    { year: '2024', reward: '3.125', pct: 6.25 },
                    { year: '2028', reward: '1.56', pct: 3.12 },
                  ].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[8px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward}</span>
                      <div
                        className="w-full bg-orange-500/20 border-t border-orange-500 group-hover:bg-orange-500/40 transition-colors rounded-t-sm"
                        style={{ height: `${h.pct}%`, minHeight: '4px' }}
                      />
                      <span className="text-[9px] text-slate-500 font-mono mt-1">{h.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-5 border border-white/5 rounded-sm text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Limite</p>
                  <p className="text-2xl font-black text-amber-500 italic mt-1">21M</p>
                </div>
                <div className="p-5 border border-white/5 rounded-sm text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Minerados</p>
                  <p className="text-2xl font-black text-white italic mt-1">~19.8M</p>
                </div>
                <div className="p-5 border border-white/5 rounded-sm text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Último</p>
                  <p className="text-2xl font-black text-slate-500 italic mt-1">2140</p>
                </div>
              </div>
            </div>
          </section>

          {/* === 06. SOBERANIA === */}
          <section id="soberania" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Globe size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06. Soberania: Descentralização e Divisibilidade</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Descentralização</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Não existe CEO, sede ou conselho diretivo. O criador desapareceu. <strong className="text-white">Sem líder para ser preso, corrompido ou pressionado</strong>, o Bitcoin é resistente à captura regulatória ou corporativa.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Dezenas de milhares de nós independentes validam as mesmas regras. Alterar o protocolo exige consenso da rede inteira — algo que nenhuma entidade controla.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-8 space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.4) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <h3 className="text-amber-400 font-black uppercase text-sm tracking-wider font-mono italic">Divisibilidade</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Cada bitcoin é divisível em <strong className="text-white">100 milhões de Satoshis</strong>. Você não precisa comprar 1 BTC. No futuro, mediremos riqueza em Sats, não em papel apodrecido.
                  </p>
                  <div className="text-center">
                    <div className="text-4xl font-black text-white italic">1 BTC</div>
                    <div className="text-amber-500 font-black text-lg my-1">=</div>
                    <div className="text-4xl font-black text-amber-500 italic">100.000.000</div>
                    <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mt-1 font-mono">Satoshis</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === ALERTA FINAL === */}
          <section id="alerta" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Alerta Final: Autocustódia</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-red-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden mb-10">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <Key className="text-red-500 mt-1 flex-shrink-0 alert-pulse" size={24} />
                  <div>
                    <h3 className="text-red-400 font-black uppercase text-lg tracking-wider font-mono italic mb-3">Not Your Keys, Not Your Coins</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Muitas pessoas cometem o erro de deixar seus Bitcoins sob a guarda de custodiantes. Entenda de uma vez por todas: <strong className="text-white">Chaves privadas são o que permitem o envio de Bitcoins</strong>.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Se você não controla suas chaves, você <strong className="text-red-400">não tem Bitcoin</strong>; você tem uma promessa de pagamento de um terceiro.
                    </p>
                  </div>
                </div>
                <div className="p-6 border border-red-500/20 rounded-sm bg-red-500/5 text-center">
                  <p className="text-red-400 font-black uppercase text-sm font-mono tracking-wider alert-pulse">
                    NUNCA COMPARTILHE SUAS CHAVES PRIVADAS
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusão */}
            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 space-y-8">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                  O <span className="oqb-shimmer">"Estalo"</span> Mental
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-orange-400 font-black uppercase text-sm font-mono">Ponto a Ponto</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Sem intermediários, sem censura. Valor flui direto entre pessoas livres.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-orange-400 font-black uppercase text-sm font-mono">21 Milhões</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Oferta fixa contra impressão infinita. Seu suor preservado em código.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-orange-400 font-black uppercase text-sm font-mono">Inviolável</p>
                    <p className="text-slate-400 text-sm leading-relaxed">A rede mais segura do planeta, operando sem parar há mais de uma década.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
