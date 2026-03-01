import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, TrendingUp, Zap, Lock, Globe, Scale, AlertTriangle, Landmark, Building2, Gem, BarChart3 } from 'lucide-react';
import SatCounter from '@/components/SatCounter';
import NetworkTicker from '@/components/NetworkTicker';
import { TerminalHeader } from '@/components/supply-shock/TerminalHeader';
import { CountdownTimer } from '@/components/supply-shock/CountdownTimer';
import { StatsGrid } from '@/components/supply-shock/StatsGrid';
import { SupplyBar } from '@/components/supply-shock/SupplyBar';
import { fetchBitcoinStats } from '@/components/supply-shock/bitcoinService';
import { BitcoinStats } from '@/components/supply-shock/types';
import { STRINGS } from '@/components/supply-shock/constants';

const NAV_ITEMS = [
  { id: 'dados-vivos', label: 'Dados ao Vivo' },
  { id: 'escala', label: 'A Escala da Soberania' },
  { id: 'ilusao', label: 'A Ilusão do Market Cap' },
  { id: 'ouro-digital', label: 'Ouro Digital vs. BC' },
  { id: 'vetor', label: 'Oferta Fixa vs. Demanda' },
  { id: 'conclusao', label: 'Conclusão Tática' },
];

const BUBBLE_DATA = [
  { label: 'Derivativos', value: '$610T', size: 280, color: 'rgba(220,38,38,0.25)', border: 'rgba(220,38,38,0.5)', x: 50, y: 50 },
  { label: 'Imóveis', value: '$330T', size: 210, color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', x: 28, y: 55 },
  { label: 'Ações', value: '$115T', size: 140, color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', x: 72, y: 35 },
  { label: 'Ouro', value: '$14T', size: 70, color: 'rgba(234,179,8,0.2)', border: 'rgba(234,179,8,0.4)', x: 20, y: 25 },
  { label: 'Bitcoin', value: '$1.6T', size: 24, color: 'rgba(249,115,22,0.6)', border: 'rgba(249,115,22,0.9)', x: 82, y: 75 },
];

const ORDER_BOOK = [
  { price: '87,000', qty: '0.5', total: '43,500', side: 'ask' },
  { price: '87,500', qty: '0.3', total: '26,250', side: 'ask' },
  { price: '88,000', qty: '0.1', total: '8,800', side: 'ask' },
  { price: '90,000', qty: '0.05', total: '4,500', side: 'ask' },
  { price: '95,000', qty: '0.02', total: '1,900', side: 'ask' },
  { price: '100,000', qty: '0.01', total: '1,000', side: 'ask' },
  { price: '150,000', qty: '---', total: '---', side: 'empty' },
  { price: '∞', qty: '0', total: 'ESGOTADO', side: 'empty' },
];

const INSTITUTIONS = [
  { name: 'MicroStrategy', btc: '~214.000 BTC', icon: Building2 },
  { name: 'BlackRock iShares', btc: '~290.000 BTC', icon: Landmark },
  { name: 'Fidelity', btc: '~180.000 BTC', icon: BarChart3 },
  { name: 'Governos (EUA, El Salvador)', btc: '~250.000 BTC', icon: Globe },
];

export default function SupplyShock() {
  const [activeSection, setActiveSection] = useState('dados-vivos');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [btcStats, setBtcStats] = useState<BitcoinStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Fetch live Bitcoin stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchBitcoinStats();
        setBtcStats(stats);
      } catch (err) {
        console.error('Failed to fetch BTC stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      <NetworkTicker />

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="ss-dust"></div><div className="ss-dust ss-dust-2"></div>
      </div>

      <style>{`
        @keyframes ssDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .ss-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 15%,rgba(245,158,11,0.3) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(249,115,22,0.2) 100%,transparent);background-size:200px 200px;animation:ssDrift 55s linear infinite }
        .ss-dust-2 { background-size:300px 300px;animation:ssDrift 80s linear infinite reverse;opacity:0.5 }
        .ss-shimmer-gold { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:ssShim 3s linear infinite }
        .ss-shimmer-blue { background:linear-gradient(90deg,#3b82f6 0%,#60a5fa 40%,#fbbf24 50%,#60a5fa 60%,#3b82f6 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:ssShim 3s linear infinite }
        @keyframes ssShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
        @keyframes bubblePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        .bubble-btc { animation:bubblePulse 2s ease-in-out infinite }
        @keyframes terminalBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .terminal-cursor { animation:terminalBlink 1s step-end infinite }
        .order-row:hover { background:rgba(245,158,11,0.05) }
      `}</style>

      {/* === SIDEBAR (Desktop) === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 mt-[50px] rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono mb-3">
              <ArrowLeft size={10} /> Voltar ao Início
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Relógio do Juízo Final</span>
            </div>
          </div>

          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />
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
      <div className="lg:hidden fixed top-[38px] left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Início
          </Link>
          <div className="flex items-center gap-1">
            <Scale className="text-amber-500" size={12} />
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Juízo Final</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-28 lg:pt-24">

          {/* HEADER */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(30,20,5,0.6) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(249,115,22,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.07] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
            <div className="relative z-10">
              <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Oferta Fixa vs. Demanda Infinita</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                Contagem<br />
                <span className="ss-shimmer-gold italic">Regressiva</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Você não está comprando um ativo "caro". Você está comprando uma tecnologia que começou a absorver o valor de um sistema financeiro de <strong className="text-white">US$ 1.000.000.000.000.000</strong> que está apodrecendo.
              </p>
            </div>
          </header>

          {/* === BLOCO 0: DADOS AO VIVO === */}
          <section id="dados-vivos" className="mb-28 scroll-mt-24">
            <div className="flex flex-col items-center">
              <TerminalHeader />

              {loading ? (
                <div className="text-slate-500 font-mono text-sm animate-pulse my-12">
                  Conectando à rede Bitcoin...
                </div>
              ) : btcStats ? (
                <>
                  <StatsGrid stats={btcStats} />
                  <SupplyBar
                    circulatingSupply={btcStats.circulatingSupply}
                    percentageMined={btcStats.percentageMined}
                  />
                  <CountdownTimer targetDate={btcStats.estimatedHalvingDate} />
                </>
              ) : (
                <div className="text-red-500 font-mono text-sm my-12">
                  Falha ao conectar à rede. Recarregue a página.
                </div>
              )}

              <p className="text-slate-600 text-xs font-mono mt-8 tracking-widest">
                {STRINGS.FOOTER}
              </p>
            </div>
          </section>

          {/* === BLOCO 1: A ESCALA DA SOBERANIA === */}
          <section id="escala" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <TrendingUp size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Escala da Soberania</h2>
            </div>

            {/* Bubble Chart */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12 mb-6 relative overflow-hidden" style={{ minHeight: '420px' }}>
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">Capitalização Global de Ativos</h3>
              <div className="relative w-full" style={{ height: '340px' }}>
                {BUBBLE_DATA.map((b, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full flex flex-col items-center justify-center text-center transition-all duration-500 ${b.label === 'Bitcoin' ? 'bubble-btc z-10' : 'z-0'}`}
                    style={{
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: b.color,
                      border: `1px solid ${b.border}`,
                      boxShadow: b.label === 'Bitcoin' ? '0 0 30px rgba(249,115,22,0.4)' : 'none',
                    }}
                  >
                    <span className={`font-black uppercase tracking-wider ${b.label === 'Bitcoin' ? 'text-orange-400' : 'text-white/60'}`} style={{ fontSize: b.size > 100 ? '11px' : '8px' }}>
                      {b.label}
                    </span>
                    <span className={`font-mono font-bold text-[9px] ${b.label === 'Bitcoin' ? 'text-orange-300' : 'text-white/40'}`}>
                      {b.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(180,83,9,0.06) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <h4 className="text-amber-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">O Tamanho</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Com ~US$ 1,6 trilhão de capitalização, o Bitcoin representa apenas <strong className="text-white">0,1%</strong> da riqueza mundial.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(153,27,27,0.05) 100%)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <h4 className="text-red-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">O Oceano</h4>
                <p className="text-slate-400 text-xs leading-relaxed">O mundo detém mais de <strong className="text-white">US$ 1 quatrilhão</strong> em ativos: ações, imóveis, dívidas e derivativos.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Verdade</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Uma tecnologia absorvendo valor de um sistema de <strong className="text-white">US$ 1 quadrilhão</strong> que apodrece em inflação e dívida.</p>
              </div>
            </div>
          </section>

          {/* === BLOCO 2: A ILUSÃO DO MARKET CAP === */}
          <section id="ilusao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Ilusão da Capitalização de Mercado</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Terminal / Order Book */}
              <div className="bg-[#080C14] border border-amber-500/20 rounded-sm overflow-hidden font-mono">
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <span className="text-[9px] text-amber-500/60 uppercase tracking-widest">order_book.exe</span>
                  <span className="text-amber-500 terminal-cursor text-xs">█</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-600 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
                    <span>Preço (USD)</span>
                    <span className="text-right">Qtd (BTC)</span>
                    <span className="text-right">Total</span>
                  </div>
                  {ORDER_BOOK.map((row, i) => (
                    <div key={i} className={`order-row grid grid-cols-3 gap-2 text-[11px] py-1.5 border-b border-white/[0.03] transition-colors ${row.side === 'empty' ? 'opacity-40' : ''}`}>
                      <span className={row.side === 'ask' ? 'text-red-400' : 'text-slate-600'}>${row.price}</span>
                      <span className="text-right text-slate-400">{row.qty}</span>
                      <span className={`text-right font-bold ${row.total === 'ESGOTADO' ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}>{row.total}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-3 border-t border-amber-500/10">
                    <p className="text-[10px] text-amber-500/70">
                      <span className="text-amber-400">{'>'}</span> Tentativa de comprar 21M BTC...
                    </p>
                    <p className="text-[10px] text-red-500 mt-1 font-bold">
                      <span className="text-red-400">{'>'}</span> ERRO: Oferta insuficiente. Livro de ordens liquidado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-6">
                <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Impossível de Comprar Todos</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Embora o valor total seja de US$ 1,6 trilhão, você <strong className="text-white">jamais</strong> conseguiria comprar todos os Bitcoins por esse preço. Milhões estão <strong className="text-white">perdidos para sempre</strong> ou trancados em cofres de soberanos que não aceitam papel moeda em troca.
                  </p>
                </div>
                <div className="bg-[#0B0F19]/60 border border-red-500/10 rounded-sm p-8 space-y-4">
                  <h3 className="text-red-400 font-black uppercase text-sm tracking-wider font-mono italic">O Choque de Oferta</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Se alguém tentasse comprar toda a oferta, o preço <strong className="text-white">dispararia para o infinito</strong> em minutos. Cada compra executada limpa o livro de ordens e força o próximo preço a ser mais alto. O Bitcoin é o ativo com a <strong className="text-white">menor elasticidade de oferta do planeta</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 3: OURO DIGITAL VS. BANCOS CENTRAIS === */}
          <section id="ouro-digital" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Ouro Digital vs. Bancos Centrais</h2>
            </div>

            {/* Institution Shields */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {INSTITUTIONS.map((inst, i) => (
                <div key={i} className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-5 text-center group hover:border-amber-500/30 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)', boxShadow: '0 0 20px rgba(245,158,11,0.1)' }}>
                    <inst.icon className="text-amber-500" size={18} />
                  </div>
                  <p className="text-white font-bold text-xs mb-1">{inst.name}</p>
                  <p className="text-amber-500 font-mono text-[10px] font-bold">{inst.btc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-sm p-8 space-y-3" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <Lock className="text-amber-400" size={20} />
                <h4 className="text-amber-400 font-black uppercase text-xs tracking-wider font-mono">Proteção contra Confisco</h4>
                <p className="text-slate-400 text-xs leading-relaxed">O principal motor de crescimento do Bitcoin é a busca por proteção contra a inflação e economias planificadas.</p>
              </div>
              <div className="rounded-sm p-8 space-y-3" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(30,64,175,0.05) 100%)', border: '1px solid rgba(59,130,246,0.12)' }}>
                <Gem className="text-blue-400" size={20} />
                <h4 className="text-blue-400 font-black uppercase text-xs tracking-wider font-mono">Instrumento ao Portador</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Diferente de ações ou depósitos bancários, o Bitcoin é um instrumento ao portador não nacional. Não depende de um sistema bancário para existir.</p>
              </div>
              <div className="rounded-sm p-8 space-y-3" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <TrendingUp className="text-green-400" size={20} />
                <h4 className="text-green-400 font-black uppercase text-xs tracking-wider font-mono">A Tese dos Grandes</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Gestores de elite já entenderam: o Bitcoin é a alternativa descentralizada e de livre mercado à política monetária falida dos Bancos Centrais.</p>
              </div>
            </div>
          </section>

          {/* === BLOCO 4: OFERTA FIXA VS. DEMANDA INFINITA === */}
          <section id="vetor" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Oferta Fixa vs. Demanda Infinita</h2>
            </div>

            {/* Live Data */}
            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-8 md:p-12 mb-6">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">Dados ao Vivo da Rede</h3>
              <SatCounter />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-white/5 rounded-sm">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono mb-2">Limite Absoluto</p>
                  <p className="text-4xl font-black text-white italic">21M</p>
                  <p className="text-amber-500 text-[10px] font-mono mt-1">imutável</p>
                </div>
                <div className="text-center p-6 border border-white/5 rounded-sm">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono mb-2">Próximo Halving</p>
                  <p className="text-4xl font-black text-amber-400 italic">2028</p>
                  <p className="text-amber-500/60 text-[10px] font-mono mt-1">recompensa ÷ 2</p>
                </div>
                <div className="text-center p-6 border border-red-500/10 rounded-sm">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono mb-2">Disponível em Exchanges</p>
                  <p className="text-4xl font-black text-red-400 italic">~9%</p>
                  <p className="text-red-500/60 text-[10px] font-mono mt-1 animate-pulse">e caindo</p>
                </div>
              </div>
            </div>

            {/* Halving Chart */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8">
              <h3 className="text-white font-black uppercase text-xs tracking-wider font-mono italic mb-6">Cronograma dos Halvings</h3>
              <div className="flex items-end gap-2 h-40 border-b border-l border-white/10 p-2">
                {[
                  { year: '2009', reward: '50', pct: 100 },
                  { year: '2012', reward: '25', pct: 50 },
                  { year: '2016', reward: '12.5', pct: 25 },
                  { year: '2020', reward: '6.25', pct: 12.5 },
                  { year: '2024', reward: '3.125', pct: 6.25 },
                  { year: '2028', reward: '1.5625', pct: 3.125 },
                ].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[8px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward} BTC</span>
                    <div
                      className="w-full bg-amber-500/20 border-t border-amber-500 group-hover:bg-amber-500/40 transition-colors rounded-t-sm"
                      style={{ height: `${h.pct}%`, minHeight: '4px' }}
                    />
                    <span className="text-[9px] text-slate-500 font-mono mt-1">{h.year}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-4 font-mono text-center">
                A cada 4 anos, a emissão cai pela metade. <strong className="text-white">Enquanto a demanda cresce, a oferta encolhe.</strong>
              </p>
            </div>
          </section>

          {/* === CONCLUSÃO TÁTICA === */}
          <section id="conclusao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Conclusão Tática</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 space-y-8">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  O Sistema Mais <span className="ss-shimmer-gold">Honesto</span> da História
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Imutável</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Regras gravadas em código, imunes a políticos. Nenhum decreto, nenhum banco central pode alterar o protocolo.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Escasso</p>
                    <p className="text-slate-400 text-sm leading-relaxed">21 milhões é o limite. Não há negociação, não há exceção. O resto é ruído inflacionário.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Soberano</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Você é o dono do seu banco. Sem intermediários, sem censura, sem confisco. Autocustódia é liberdade.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center">
                  <p className="text-slate-500 text-sm font-mono mb-4">
                    Existem <span className="text-white font-bold">56 milhões</span> de milionários no mundo. Existem menos de <span className="text-amber-400 font-bold">2 milhões</span> de Bitcoins à venda.
                  </p>
                  <p className="text-white font-black uppercase text-xs tracking-widest font-mono">
                    Faça as contas. A porta está fechando.
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
