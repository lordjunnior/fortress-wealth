import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Hourglass, ShieldCheck, Zap, Cpu, Lock, TrendingUp, Layers, Timer, Flame, Gauge, Activity, CircuitBoard } from 'lucide-react';

const SECTIONS = [
  { id: 'fim-emissao', label: 'O Ano de 2140' },
  { id: 'fortaleza', label: 'Fortaleza da Mineração' },
  { id: 'deflacao', label: 'A Cura da Deflação' },
  { id: 'taxas-l2', label: 'Taxas e Camadas (L2)' },
  { id: 'conclusao', label: 'Conclusão Tática' },
];

export default function FuturoBitcoin() {
  const [activeSection, setActiveSection] = useState('fim-emissao');
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

  // Countdown to 2140
  const yearsLeft = 2140 - new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="fb-dust"></div><div className="fb-dust fb-dust-2"></div>
      </div>

      <style>{`
        @keyframes fbDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .fb-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 20%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(234,179,8,0.15) 100%,transparent);background-size:200px 200px;animation:fbDrift 55s linear infinite }
        .fb-dust-2 { background-size:300px 300px;animation:fbDrift 80s linear infinite reverse;opacity:0.5 }
        .fb-shimmer-gold { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:fbShim 3s linear infinite }
        .fb-shimmer-blue { background:linear-gradient(90deg,#3b82f6 0%,#60a5fa 40%,#fff 50%,#60a5fa 60%,#3b82f6 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:fbShim 3s linear infinite }
        @keyframes fbShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;animation:goldGlow 3s ease-in-out infinite }
        @keyframes countdownPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .countdown-pulse { animation:countdownPulse 2s ease-in-out infinite }
        @keyframes lnGlow { 0%,100%{box-shadow:0 0 20px rgba(245,158,11,0.1)} 50%{box-shadow:0 0 40px rgba(245,158,11,0.25)} }
        .ln-glow { animation:lnGlow 3s ease-in-out infinite }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
        <div className="h-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-[2px] left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/protocolo-inicial" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Protocolo
          </Link>
          <div className="flex items-center gap-1">
            <Hourglass className="text-amber-500" size={12} />
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Futuro BTC</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Hourglass className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Futuro do Bitcoin</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
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

          {/* === BLOCO 1: O ANO DE 2140 === */}
          <section id="fim-emissao" className="mb-28 scroll-mt-24">
            <header className="relative overflow-hidden rounded-sm p-10 md:p-16 mb-12" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(40,20,5,0.5) 100%)' }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-amber-500/[0.04] text-[10px] leading-5 break-all overflow-hidden p-4 select-none" aria-hidden>
                {Array.from({ length: 80 }).map((_, i) => (
                  <span key={i}>21000000 </span>
                ))}
              </div>

              {/* Countdown regressive */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 text-right select-none pointer-events-none">
                <div className="text-[8px] text-slate-600 uppercase font-black tracking-[0.3em] font-mono mb-1">Contagem regressiva</div>
                <div className="text-5xl md:text-7xl font-black text-amber-500/20 font-mono countdown-pulse">{yearsLeft}</div>
                <div className="text-[8px] text-slate-700 uppercase font-black tracking-[0.3em] font-mono">anos restantes</div>
              </div>

              <div className="relative z-10">
                <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">O Fim da Emissão</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                  O Ano de<br />
                  <span className="fb-shimmer-gold italic">2140</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Quando o último Satoshi for minerado, a inflação do Bitcoin será zero. Para sempre.
                </p>
              </div>
            </header>

            <div className="space-y-6">
              <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Timer className="text-amber-500" size={20} />
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">A Verdade Matemática</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Por volta do ano <strong className="text-amber-400">2140</strong>, o último Satoshi será minerado. A partir desse momento, a inflação do Bitcoin será <strong className="text-white">zero absoluto</strong>. Diferente do Real ou do Dólar, onde a impressora nunca para, o Bitcoin tem um ponto final definitivo.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enquanto bancos centrais ao redor do mundo imprimem trilhões para cobrir déficits fiscais, diluindo o valor de cada unidade monetária em circulação, o Bitcoin segue seu cronograma imutável: a cada ~4 anos a emissão é cortada pela metade (halving), convergindo assintoticamente para 21 milhões.
                </p>

                {/* Visual comparison */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-red-950/20 border border-red-600/15 rounded-sm p-6 text-center">
                    <p className="text-[8px] text-red-500 uppercase font-black tracking-widest font-mono mb-2">Moeda Fiat</p>
                    <p className="text-3xl font-black text-red-500/60 italic">&#8734;</p>
                    <p className="text-red-400/60 text-[10px] font-mono mt-2">Impressão infinita</p>
                  </div>
                  <div className="bg-amber-950/20 border border-amber-500/15 rounded-sm p-6 text-center">
                    <p className="text-[8px] text-amber-500 uppercase font-black tracking-widest font-mono mb-2">Bitcoin</p>
                    <p className="text-3xl font-black text-amber-500 italic">21M</p>
                    <p className="text-amber-400/60 text-[10px] font-mono mt-2">Limite absoluto</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="text-amber-500" size={20} />
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Mecanismo de Recompensa Pós-2140</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Após 2140, os mineradores <strong className="text-white">não receberão mais novos bitcoins</strong>, mas serão sustentados integralmente pelas <strong className="text-amber-400">taxas de transação</strong>. O mercado de taxas garantirá que a rede continue sendo a mais segura do planeta enquanto houver valor sendo transacionado.
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Este modelo é autossustentável: quanto mais valor a rede processa, mais incentivo os mineradores têm para protegê-la, criando um ciclo virtuoso de segurança e adoção.
                </p>

                <div className="flex items-center gap-4 mt-6 p-4 bg-amber-950/15 border border-amber-500/10 rounded-sm">
                  <div className="text-center flex-1">
                    <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Hoje</p>
                    <p className="text-sm font-black text-white mt-1">Subsídio + Taxas</p>
                  </div>
                  <ArrowRight className="text-amber-500 shrink-0" size={16} />
                  <div className="text-center flex-1">
                    <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">2140+</p>
                    <p className="text-sm font-black text-amber-400 mt-1">100% Taxas</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 2: FORTALEZA DA MINERAÇÃO === */}
          <section id="fortaleza" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-green-500 mb-10">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Fortaleza da Mineração</h2>
            </div>

            <div className="space-y-4">
              {/* Segurança e Dificuldade */}
              <div className="bg-[#0B0F19]/60 border border-green-500/10 rounded-sm p-8 md:p-10 group hover:border-green-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Gauge className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono">Segurança e Dificuldade</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      A rede se ajusta automaticamente. Se mineradores saem, a <strong className="text-white">dificuldade cai</strong>; se o preço sobe, a competição aumenta. O Bitcoin é um <strong className="text-green-400">organismo autorregulado</strong> que sempre encontra o equilíbrio para permanecer online.
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Esse mecanismo garante que nenhum fator externo — seja uma queda de preço, um desastre natural ou uma proibição governamental — consiga derrubar a rede permanentemente. Ela se adapta, sobrevive e continua produzindo blocos a cada 10 minutos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lastro em Energia */}
              <div className="bg-[#0B0F19]/60 border border-green-500/10 rounded-sm p-8 md:p-10 group hover:border-green-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono">Lastro em Energia Real</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      A mineração converte <strong className="text-white">eletricidade em segurança imutável</strong>. Mineradores buscam a energia mais barata e desperdiçada do planeta — excedentes de hidrelétricas, gás queimado em flares, geotérmica — tornando o Bitcoin um <strong className="text-green-400">catalisador de eficiência energética global</strong>.
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Diferente do ouro, cujo lastro é geológico e estático, o lastro do Bitcoin é termodinâmico: cada bloco representa energia real gasta, impossível de falsificar ou reverter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eficiência Exponencial */}
              <div className="bg-[#0B0F19]/60 border border-green-500/10 rounded-sm p-8 md:p-10 group hover:border-green-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CircuitBoard className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono">Eficiência Exponencial</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      O hardware (ASICs) evolui constantemente, permitindo que a rede processe <strong className="text-white">mais segurança com menos custo energético</strong>, mantendo o sistema lucrativo e inexpugnável. A cada geração de chips, o custo por terahash cai, enquanto a segurança total da rede só aumenta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 3: A CURA DA DEFLAÇÃO === */}
          <section id="deflacao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-blue-500" size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono text-blue-500">A Cura da Deflação</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-4xl mb-10">
              Poder de compra no tempo: enquanto moedas fiat perdem valor, o Bitcoin recompensa quem poupa.
            </p>

            <div className="space-y-4">
              {/* Moeda Forte */}
              <div className="bg-[#0B0F19]/60 border border-blue-500/10 rounded-sm p-8 md:p-10 group hover:border-blue-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono flex items-center gap-3">
                  <Lock className="text-blue-400" size={18} />
                  Moeda Forte
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  O Bitcoin já é <strong className="text-white">mais escasso que o ouro</strong> e menos inflacionário que qualquer moeda estatal. Ele é o único sistema onde o seu dinheiro <strong className="text-blue-400">ganha valor</strong> conforme a tecnologia avança e a adoção cresce.
                </p>

                {/* Comparison chart */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-blue-950/20 border border-blue-500/10 rounded-sm p-4 text-center">
                    <p className="text-[8px] text-blue-400/60 uppercase font-black tracking-widest font-mono mb-1">Ouro</p>
                    <p className="text-lg font-black text-slate-400 italic">~1.5%</p>
                    <p className="text-[9px] text-slate-600 font-mono mt-1">Inflação anual</p>
                  </div>
                  <div className="bg-red-950/20 border border-red-500/10 rounded-sm p-4 text-center">
                    <p className="text-[8px] text-red-400/60 uppercase font-black tracking-widest font-mono mb-1">Real (BRL)</p>
                    <p className="text-lg font-black text-red-400 italic">~6-10%</p>
                    <p className="text-[9px] text-slate-600 font-mono mt-1">Inflação anual</p>
                  </div>
                  <div className="bg-amber-950/20 border border-amber-500/10 rounded-sm p-4 text-center">
                    <p className="text-[8px] text-amber-400/60 uppercase font-black tracking-widest font-mono mb-1">Bitcoin</p>
                    <p className="text-lg font-black text-amber-400 italic">~0.8%</p>
                    <p className="text-[9px] text-slate-600 font-mono mt-1">E caindo a cada halving</p>
                  </div>
                </div>
              </div>

              {/* Divisibilidade Infinita */}
              <div className="bg-[#0B0F19]/60 border border-blue-500/10 rounded-sm p-8 md:p-10 group hover:border-blue-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono flex items-center gap-3">
                  <Activity className="text-blue-400" size={18} />
                  Divisibilidade Infinita
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <em className="text-blue-300">"Não haverá bitcoins para todos"</em> é um mito. Cada bitcoin é composto por <strong className="text-white">100 milhões de Satoshis</strong>. Se o preço subir, transacionamos em frações menores. O que importa é o <strong className="text-blue-400">poder de compra do seu suor</strong>, não o número de unidades nominais.
                </p>
                <div className="flex items-center justify-center gap-4 mt-6 p-6 bg-blue-950/15 border border-blue-500/10 rounded-sm">
                  <div className="text-center">
                    <p className="text-4xl font-black text-white italic">1 BTC</p>
                  </div>
                  <div className="text-blue-500 font-black text-xl">=</div>
                  <div className="text-center">
                    <p className="text-4xl font-black fb-shimmer-blue italic">100.000.000</p>
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest font-mono mt-1">satoshis</p>
                  </div>
                </div>
              </div>

              {/* Pensamento de Longo Prazo */}
              <div className="bg-[#0B0F19]/60 border border-blue-500/10 rounded-sm p-8 md:p-10 group hover:border-blue-500/25 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic font-mono flex items-center gap-3">
                  <Hourglass className="text-blue-400" size={18} />
                  Pensamento de Longo Prazo
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  O Bitcoin te cura da necessidade de consumir lixo instantâneo. Ele incentiva a <strong className="text-white">poupança, o investimento e a construção de um futuro real</strong>, recompensando quem tem <strong className="text-blue-400">baixa preferência temporal</strong>. Numa economia deflacionária, cada decisão de gasto é ponderada — e cada decisão de poupar é recompensada.
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 4: TAXAS E CAMADAS (L2) === */}
          <section id="taxas-l2" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Escudo Final: Taxas e Camadas (L2)</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/15 rounded-sm p-10 md:p-14 space-y-8 relative overflow-hidden">
              {/* Lightning glow */}
              <div className="flex items-center justify-center py-6">
                <div className="w-24 h-24 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center ln-glow">
                  <Zap className="text-amber-500" size={40} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Mecanismo de Escala</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Nem toda transação precisa estar na blockchain principal (L1). A <strong className="text-amber-400">Lightning Network</strong> permite transações instantâneas e quase gratuitas, enquanto a rede principal serve como o <strong className="text-white">tribunal final de liquidação</strong>.
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Assim como o sistema financeiro tradicional tem camadas (banco central, bancos comerciais, sistemas de pagamento), o Bitcoin se escala em camadas sem comprometer a segurança da base.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Valor vs. Preço</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    O <strong className="text-white">preço do Bitcoin em moeda fiduciária</strong> pode oscilar, mas o seu valor como reserva de valor soberana apenas se consolida a cada bloco minerado. Preço é o que você paga; <strong className="text-amber-400">valor é o que você recebe</strong>.
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    A volatilidade é o preço da admissão para um ativo que está sendo monetizado do zero para se tornar a reserva de valor global. Com o tempo, conforme a adoção cresce, a volatilidade diminui naturalmente.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900/40 border border-white/5 rounded-sm p-6 text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Camada 1 (L1)</p>
                  <p className="text-sm font-black text-white italic mt-2">Tribunal Final</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Liquidação definitiva</p>
                </div>
                <div className="bg-amber-950/20 border border-amber-500/10 rounded-sm p-6 text-center">
                  <p className="text-[8px] text-amber-500 uppercase font-black tracking-widest font-mono">Camada 2 (L2)</p>
                  <p className="text-sm font-black text-amber-400 italic mt-2">Lightning Network</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Pagamentos instantâneos</p>
                </div>
              </div>
            </div>
          </section>

          {/* === CONCLUSÃO TÁTICA === */}
          <section id="conclusao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Sistema Mais Honesto da História</h2>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-sm p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight italic mb-10">
                  Conclusão <span className="fb-shimmer-gold">Tática</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Lock className="text-amber-500 shrink-0" size={20} />
                      <h4 className="text-white font-black uppercase text-sm tracking-tighter italic">Imutável</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">Regras gravadas em código, imunes a políticos, banqueiros e burocratas.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Flame className="text-amber-500 shrink-0" size={20} />
                      <h4 className="text-white font-black uppercase text-sm tracking-tighter italic">Escasso</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">21 milhões é o limite. O resto é ruído. Nenhum banco central pode imprimir mais.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-amber-500 shrink-0" size={20} />
                      <h4 className="text-white font-black uppercase text-sm tracking-tighter italic">Soberano</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">Você é o dono do seu banco. Sem permissão. Sem intermediários. Sem censura.</p>
                  </div>
                </div>

                <p className="text-slate-700 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">O futuro pertence a quem entende o código.</p>
              </div>
            </div>
          </section>

          {/* Próximo Nível */}
          <div className="border-2 border-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-sm group hover:border-amber-500/50 transition-all">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-white mb-1 font-mono">Continue Aprendendo</h3>
              <p className="text-slate-400 font-bold uppercase text-xs">Volte ao Protocolo e avance nos módulos.</p>
            </div>
            <Link to="/protocolo-inicial" className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 hover:text-black transition-all flex items-center gap-3 rounded-sm">
              Protocolo Inicial <ArrowRight size={16} />
            </Link>
          </div>

          {/* Footer */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">21 milhões. Ponto final.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
