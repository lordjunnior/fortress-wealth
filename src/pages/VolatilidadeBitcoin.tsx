import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, Shield, Activity, Eye, Scale, BarChart3, Flame } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'choque', label: 'O Preço da Liberdade' },
  { id: 'causas', label: 'Por que o Preço Pulsa?' },
  { id: 'destino', label: 'O Destino da Oscilação' },
  { id: 'conclusao', label: 'Conclusão Tática' },
];

// Fake candlestick data for visual effect
const CANDLES = Array.from({ length: 40 }, (_, i) => {
  const base = 60 + Math.sin(i * 0.3) * 20 + Math.random() * 15;
  const open = base + (Math.random() - 0.5) * 10;
  const close = base + (Math.random() - 0.5) * 10;
  const high = Math.max(open, close) + Math.random() * 8;
  const low = Math.min(open, close) - Math.random() * 8;
  return { open, close, high, low, bullish: close > open };
});

export default function VolatilidadeBitcoin() {
  const [activeSection, setActiveSection] = useState('choque');
  const [scrollProgress, setScrollProgress] = useState(0);
  const candleRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 overflow-x-hidden">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="vl-dust"></div><div className="vl-dust vl-dust-2"></div>
      </div>

      <style>{`
        @keyframes vlDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .vl-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 15%,rgba(220,38,38,0.3) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(245,158,11,0.2) 100%,transparent);background-size:200px 200px;animation:vlDrift 55s linear infinite }
        .vl-dust-2 { background-size:300px 300px;animation:vlDrift 80s linear infinite reverse;opacity:0.5 }
        .vl-shimmer { background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fbbf24 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:vlShim 2.5s linear infinite }
        .vl-shimmer-gold { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:vlShim 3s linear infinite }
        @keyframes vlShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
        @keyframes candleFlicker { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .candle-flicker { animation:candleFlicker 3s ease-in-out infinite }
        @keyframes trendLine { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
        .trend-line { stroke-dasharray:1000;animation:trendLine 3s ease-out forwards }
      `}</style>

      {/* === SIDEBAR === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="text-red-500" size={16} />
              <span className="text-red-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Volatilidade</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
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

      {/* === MOBILE NAV === */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/protocolo-inicial" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Protocolo
          </Link>
          <div className="flex items-center gap-1">
            <Activity className="text-red-500" size={12} />
            <span className="text-red-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Volatilidade</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
        </div>
      </div>

      {/* === MAIN === */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* === HEADER with Candlestick Background === */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(30,10,5,0.6) 100%)' }}>
            {/* Candlestick chart background */}
            <div ref={candleRef} className="absolute inset-0 flex items-end justify-center gap-[3px] px-8 pb-8 opacity-15 candle-flicker pointer-events-none">
              {CANDLES.map((c, i) => {
                const bodyTop = Math.min(c.open, c.close);
                const bodyHeight = Math.abs(c.close - c.open);
                const wickTop = c.high;
                const wickBottom = c.low;
                return (
                  <div key={i} className="relative flex-1" style={{ height: '100%' }}>
                    {/* Wick */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        width: '1px',
                        bottom: `${wickBottom}%`,
                        height: `${wickTop - wickBottom}%`,
                        background: c.bullish ? 'rgba(34,197,94,0.5)' : 'rgba(220,38,38,0.5)',
                      }}
                    />
                    {/* Body */}
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        bottom: `${bodyTop}%`,
                        height: `${Math.max(bodyHeight, 1)}%`,
                        background: c.bullish ? 'rgba(34,197,94,0.6)' : 'rgba(220,38,38,0.6)',
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(220,38,38,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.2) 0%, transparent 50%)' }} />
            <div className="relative z-10">
              <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">O Preço da Soberania</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                Volati<span className="vl-shimmer">lidade</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                O sistema te ensinou que "estabilidade" é manter seu dinheiro em um papel que perde <strong className="text-white">10% de poder de compra ao ano</strong>. Isso não é estabilidade. É um <strong className="text-red-400">derretimento controlado</strong>.
              </p>
            </div>
          </header>

          {/* === BLOCO 1: O PREÇO DA LIBERDADE === */}
          <section id="choque" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <Flame size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Preço da Liberdade</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(153,27,27,0.06) 100%)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <h4 className="text-red-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Falha de Percepção</h4>
                <p className="text-slate-400 text-xs leading-relaxed">O sistema te ensinou que "estabilidade" é manter dinheiro em papel que <strong className="text-white">perde 10% ao ano</strong>. Isso não é estabilidade — é um derretimento controlado.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h4 className="text-amber-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Verdade Blindada</h4>
                <p className="text-slate-400 text-xs leading-relaxed">A volatilidade é o reflexo de um ativo saindo de <strong className="text-white">zero para moeda de reserva global</strong>. É a descoberta de preço sem o colchão artificial dos BCs.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">O Estalo Mental</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Num mercado livre, o preço oscila para encontrar a verdade. Volatilidade é o sinal de que o Bitcoin é <strong className="text-white">vivo, soberano e incorruptível</strong>.</p>
              </div>
            </div>

            {/* Real vs BTC comparison */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">Estabilidade Real vs. Volatilidade Soberana</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-500/20 rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/40"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="text-red-500" size={16} />
                    <span className="text-red-500 font-black uppercase text-[10px] tracking-widest font-mono">Real Brasileiro (BRL)</span>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between text-slate-500"><span>Inflação anual (IPCA)</span><span className="text-red-400 font-bold">~5-10%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Perda em 10 anos</span><span className="text-red-400 font-bold">-60%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Volatilidade percebida</span><span className="text-green-400 font-bold">"Estável"</span></div>
                    <div className="flex justify-between text-slate-500"><span>Direção real</span><span className="text-red-400 font-bold animate-pulse">↓ Sempre para baixo</span></div>
                  </div>
                </div>
                <div className="border border-amber-500/20 rounded-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500/40"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-amber-500" size={16} />
                    <span className="text-amber-500 font-black uppercase text-[10px] tracking-widest font-mono">Bitcoin (BTC)</span>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between text-slate-500"><span>Retorno anualizado</span><span className="text-green-400 font-bold">~50-100%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Ganho em 10 anos</span><span className="text-green-400 font-bold">+10.000%</span></div>
                    <div className="flex justify-between text-slate-500"><span>Volatilidade percebida</span><span className="text-red-400 font-bold">"Perigoso"</span></div>
                    <div className="flex justify-between text-slate-500"><span>Direção real</span><span className="text-green-400 font-bold">↑ Up only (longo prazo)</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 2: POR QUE O PREÇO PULSA === */}
          <section id="causas" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <BarChart3 size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Por que o Preço "Pulsa"?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon: Scale,
                  color: 'amber',
                  title: 'Mercado Pequeno',
                  text: 'Com capitalização de ~US$ 1 trilhão (10% do ouro), qualquer grande entrada ou saída de capital causa ondas de choque. Você opera em um ativo que ainda é um segredo aberto.',
                  data: [
                    { label: 'Market Cap BTC', value: '~$1.6T' },
                    { label: 'Market Cap Ouro', value: '~$14T' },
                  ],
                },
                {
                  icon: Eye,
                  color: 'red',
                  title: 'Sem Lastro Fiduciário',
                  text: 'O Bitcoin não tem fluxos de caixa ou dividendos; seu valor depende exclusivamente da sua utilidade como dinheiro soberano. Para uns vale zero, para outros é o infinito.',
                  data: [
                    { label: 'Dividendos', value: 'ZERO' },
                    { label: 'Utilidade', value: 'INFINITA' },
                  ],
                },
                {
                  icon: Shield,
                  color: 'green',
                  title: 'Mercados em Construção',
                  text: 'Os produtos de defesa (derivativos) do Bitcoin ainda estão maturando. À medida que o mercado cresce, a volatilidade diminui — mas a oportunidade de ganhos assimétricos também.',
                  data: [
                    { label: 'Maturidade', value: '15 anos' },
                    { label: 'Bolsas trad.', value: '200+ anos' },
                  ],
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4 group hover:border-amber-500/20 transition-all hover:-translate-y-1"
                  style={{ boxShadow: '0 0 0 rgba(245,158,11,0)' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(245,158,11,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(245,158,11,0)')}
                >
                  <card.icon className={`text-${card.color === 'amber' ? 'amber-400' : card.color === 'red' ? 'red-400' : 'green-400'}`} size={22} />
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">{card.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{card.text}</p>
                  <div className="pt-3 border-t border-white/5 space-y-1.5 font-mono">
                    {card.data.map((d, j) => (
                      <div key={j} className="flex justify-between text-[10px]">
                        <span className="text-slate-600 uppercase tracking-widest">{d.label}</span>
                        <span className="text-white font-bold">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === BLOCO 3: O DESTINO DA OSCILAÇÃO === */}
          <section id="destino" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <TrendingUp size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Destino da Oscilação</h2>
            </div>

            {/* Trend Line Visual */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12 mb-6 relative overflow-hidden">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-4">Tendência de Longo Prazo (ignora o ruído)</h3>
              <svg viewBox="0 0 800 200" className="w-full h-auto" preserveAspectRatio="none">
                {/* Noise */}
                <polyline
                  fill="none"
                  stroke="rgba(220,38,38,0.15)"
                  strokeWidth="1"
                  points="0,180 20,150 40,170 60,120 80,140 100,90 120,130 140,80 160,110 180,60 200,100 220,50 240,90 260,40 280,80 300,30 320,70 340,45 360,75 380,35 400,60 420,40 440,55 460,30 480,50 500,25 520,45 540,20 560,40 580,15 600,35 620,18 640,30 660,12 680,25 700,10 720,22 740,8 760,18 780,5 800,12"
                />
                {/* Trend line */}
                <line
                  x1="0" y1="180" x2="800" y2="10"
                  stroke="rgba(245,158,11,0.8)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  className="trend-line"
                />
                {/* Label */}
                <text x="650" y="40" fill="rgba(245,158,11,0.6)" fontSize="12" fontFamily="monospace" fontWeight="bold">UP ONLY ↑</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">A Domesticação da Fera</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Conforme o Bitcoin se torna mais caro e distribuído, será necessário <strong className="text-white">cada vez mais capital fiduciário</strong> para mover o preço. O que hoje é um tsunami, amanhã será uma marola em um oceano de liquidez.
                </p>
                <div className="font-mono text-[10px] space-y-1 pt-3 border-t border-white/5">
                  <div className="flex justify-between text-slate-500"><span>2011 — Vol. anual</span><span className="text-red-400 font-bold">~200%</span></div>
                  <div className="flex justify-between text-slate-500"><span>2017 — Vol. anual</span><span className="text-amber-400 font-bold">~100%</span></div>
                  <div className="flex justify-between text-slate-500"><span>2024 — Vol. anual</span><span className="text-green-400 font-bold">~50%</span></div>
                  <div className="flex justify-between text-slate-500"><span>Tendência</span><span className="text-green-400 font-bold">↓ Decrescente</span></div>
                </div>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">A Grande Substituição</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Os grandes detentores têm duas opções: ou <strong className="text-white">seguram o ativo</strong> (restringindo a oferta) ou <strong className="text-white">vendem</strong> (distribuindo para novos soberanos). Em ambos os casos, a rede se fortalece.
                </p>
                <div className="mt-4 p-4 border border-amber-500/10 rounded-sm bg-amber-500/5">
                  <p className="text-amber-400 text-xs font-mono font-bold text-center">
                    HOLD → Oferta ↓ → Preço ↑<br/>
                    SELL → Distribuição ↑ → Descentralização ↑
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === CONCLUSÃO TÁTICA === */}
          <section id="conclusao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Conclusão Tática</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-8">
                  Não Olhe Para o Preço,<br/>Olhe Para o <span className="vl-shimmer-gold">Valor</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="space-y-2">
                    <p className="text-red-400 font-black uppercase text-sm font-mono">Curto Prazo</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Ruído, especulação e emoção. Manchetes que vendem medo. Gráficos que parecem o fim do mundo.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Longo Prazo</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Escassez matemática imutável e soberania individual. 21 milhões. Zero inflação. Zero confisco.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-400 font-black uppercase text-sm font-mono">A Regra de Ouro</p>
                    <p className="text-slate-400 text-sm leading-relaxed">A volatilidade assusta quem quer <strong className="text-white">ficar rico rápido</strong>, mas recompensa quem quer <strong className="text-amber-400">não ser pobre devagar</strong>.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center">
                  <p className="text-white font-black uppercase text-sm tracking-widest font-mono">
                    "A volatilidade assusta quem quer ficar rico rápido,<br/>
                    <span className="vl-shimmer-gold">mas recompensa quem quer não ser pobre devagar.</span>"
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
