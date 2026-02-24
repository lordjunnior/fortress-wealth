import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Zap, Lock, Globe, Scale, AlertTriangle, Banknote, Gem, CheckCircle2, XCircle } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'mito', label: 'O Mito do Lastro' },
  { id: 'halving', label: 'Halving & Escassez' },
  { id: 'ouro', label: 'Ouro Digital vs. Fraude' },
  { id: 'alerta', label: 'Alerta de Risco' },
  { id: 'conclusao', label: 'Conclusão Tática' },
];

const HALVING_DATA = [
  { year: '2009', reward: '50 BTC', supply: '0%', pct: 100 },
  { year: '2012', reward: '25 BTC', supply: '50%', pct: 50 },
  { year: '2016', reward: '12.5 BTC', supply: '75%', pct: 25 },
  { year: '2020', reward: '6.25 BTC', supply: '87.5%', pct: 12.5 },
  { year: '2024', reward: '3.125 BTC', supply: '93.75%', pct: 6.25 },
  { year: '2028', reward: '1.5625 BTC', supply: '96.88%', pct: 3.125 },
];

const GOLD_VS_BTC = [
  { prop: 'Escassez', gold: 'Limitada (geológica)', btc: 'Absoluta (21M)', btcWins: true },
  { prop: 'Portabilidade', gold: 'Difícil (pesado)', btc: 'Invisível (digital)', btcWins: true },
  { prop: 'Auditoria', gold: 'Complexa (assays)', btc: 'Instantânea (blockchain)', btcWins: true },
  { prop: 'Divisibilidade', gold: 'Limitada', btc: '100M satoshis/BTC', btcWins: true },
  { prop: 'Confiscável', gold: 'Sim (Ordem 6102)', btc: 'Não (autocustódia)', btcWins: true },
  { prop: 'Histórico', gold: '5.000+ anos', btc: '15 anos', btcWins: false },
];

export default function LastroBitcoin() {
  const [activeSection, setActiveSection] = useState('mito');
  const [scrollProgress, setScrollProgress] = useState(0);

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
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="lb-dust"></div><div className="lb-dust lb-dust-2"></div>
      </div>

      <style>{`
        @keyframes lbDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .lb-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 15%,rgba(220,38,38,0.3) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(245,158,11,0.2) 100%,transparent);background-size:200px 200px;animation:lbDrift 55s linear infinite }
        .lb-dust-2 { background-size:300px 300px;animation:lbDrift 80s linear infinite reverse;opacity:0.5 }
        .lb-shimmer { background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fff 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:lbShim 2.5s linear infinite }
        .lb-shimmer-gold { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:lbShim 3s linear infinite }
        @keyframes lbShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
        @keyframes meltDrop { 0%{transform:translateY(-100%) scaleY(0.3);opacity:0} 30%{opacity:0.6} 100%{transform:translateY(200%) scaleY(1.5);opacity:0} }
        .melt-drop { position:absolute;width:3px;border-radius:0 0 2px 2px;animation:meltDrop linear infinite }
        @keyframes alertPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .alert-pulse { animation:alertPulse 2s ease-in-out infinite }
        @keyframes barGrow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
      `}</style>

      {/* === SIDEBAR === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="text-red-500" size={16} />
              <span className="text-red-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Lastro Bitcoin</span>
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
            <Scale className="text-red-500" size={12} />
            <span className="text-red-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Lastro</span>
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

          {/* HEADER — Melting banknotes effect */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(40,10,5,0.6) 100%)' }}>
            {/* Melt drops */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="melt-drop"
                style={{
                  left: `${5 + i * 5.3}%`,
                  top: '0',
                  height: `${20 + Math.random() * 30}px`,
                  background: `linear-gradient(180deg, rgba(220,38,38,${0.15 + Math.random() * 0.2}) 0%, transparent 100%)`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(220,38,38,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.3) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-red-500/[0.05] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>$</div>
            <div className="relative z-10">
              <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Lastro, Escassez & Soberania</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                O Mito do<br />
                <span className="lb-shimmer italic">Lastro</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Todas as moedas do mundo hoje são <strong className="text-white">fiduciárias</strong> — sem lastro além da "promessa" de governos insolventes. O Bitcoin é lastreado na <strong className="text-red-400">Matemática</strong>, na <strong className="text-amber-400">Criptografia</strong> e na <strong className="text-green-400">Termodinâmica</strong>.
              </p>
            </div>
          </header>

          {/* === BLOCO 1: O MITO DO LASTRO === */}
          <section id="mito" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <Banknote size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Mito do Lastro</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(153,27,27,0.06) 100%)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <h4 className="text-red-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Mentira Fiduciária</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Dólar, Real, Euro — <strong className="text-white">nenhuma</strong> possui lastro além da "promessa" de governos insolventes. O valor depende da confiança em políticos que imprimem dinheiro para pagar dívidas que eles mesmos criaram.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h4 className="text-amber-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Verdade Blindada</h4>
                <p className="text-slate-400 text-xs leading-relaxed">O Bitcoin não é lastreado por promessas, mas pela <strong className="text-white">Matemática e Criptografia</strong>. Escassez absoluta, segurança inquebrável e previsibilidade total — sem garantia externa necessária.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">O Estalo Mental</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Lastro é uma <strong className="text-white">muleta para moedas fracas</strong>. O Bitcoin é o próprio ativo final — assim como o ouro. Não precisa representar outro valor; <strong className="text-white">ele é o valor</strong>.</p>
              </div>
            </div>

            {/* Timeline: end of gold standard */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">A Morte do Lastro (Timeline)</h3>
              <div className="space-y-4">
                {[
                  { year: '1944', event: 'Bretton Woods: Dólar lastreado em ouro', color: 'green' },
                  { year: '1971', event: 'Nixon encerra a conversibilidade ouro-dólar', color: 'red' },
                  { year: '1994', event: 'Plano Real: nasce sem lastro real', color: 'red' },
                  { year: '2008', event: 'Crise financeira: impressão em massa (QE)', color: 'red' },
                  { year: '2009', event: 'Bitcoin: nasce com escassez matemática', color: 'amber' },
                  { year: '2024', event: '~19.6M BTC minerados de 21M possíveis', color: 'amber' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-16 text-right">
                      <span className={`font-mono font-black text-sm text-${item.color === 'green' ? 'green' : item.color === 'red' ? 'red' : 'amber'}-${item.color === 'green' ? '400' : item.color === 'red' ? '500' : '400'}`}>
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 ${item.color === 'green' ? 'border-green-400 bg-green-400/20' : item.color === 'red' ? 'border-red-500 bg-red-500/20' : 'border-amber-400 bg-amber-400/20'}`} />
                      {i < 5 && <div className="w-[1px] h-6 bg-white/10 mt-1" />}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === BLOCO 2: HALVING & ESCASSEZ === */}
          <section id="halving" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Halving e a Escassez</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Halving Chart */}
              <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-8">
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">Emissão por Bloco (BTC)</h3>
                <div className="flex items-end gap-2 h-44 border-b border-l border-white/10 p-2">
                  {HALVING_DATA.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[8px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward}</span>
                      <div
                        className="w-full bg-amber-500/20 border-t border-amber-500 group-hover:bg-amber-500/40 transition-colors rounded-t-sm"
                        style={{ height: `${h.pct}%`, minHeight: '4px', animation: `barGrow 1.5s ease-out ${i * 0.15}s both`, transformOrigin: 'bottom' }}
                      />
                      <span className="text-[9px] text-slate-500 font-mono mt-1">{h.year}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-[10px] mt-3 font-mono text-center">Inflação → 0% até 2140</p>
              </div>

              {/* BTC vs Fiat emission */}
              <div className="bg-[#0B0F19]/60 border border-red-500/10 rounded-sm p-8">
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-6">BTC vs. Impressão Estatal</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-amber-400 font-bold uppercase tracking-widest">Bitcoin</span>
                      <span className="text-slate-400">21.000.000 (fixo)</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-amber-500/60 rounded-sm" style={{ width: '93.5%' }} />
                    </div>
                    <p className="text-[9px] text-amber-500/60 font-mono mt-1">93.5% já minerado • previsível até 2140</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-red-400 font-bold uppercase tracking-widest">Dólar (M2)</span>
                      <span className="text-slate-400">$21T+ (e subindo)</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-red-500/60 rounded-sm animate-pulse" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[9px] text-red-500/60 font-mono mt-1">∞ impressão • sem limite • sem auditoria</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-red-400 font-bold uppercase tracking-widest">Real (M2)</span>
                      <span className="text-slate-400">R$6T+ (e subindo)</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-sm overflow-hidden">
                      <div className="h-full bg-red-500/40 rounded-sm animate-pulse" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[9px] text-red-500/60 font-mono mt-1">Perdeu 86% desde 1994 • IPCA 5%+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Previsibilidade */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic mb-4">Previsibilidade Tática</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Você sabe <strong className="text-white">exatamente</strong> quantos bitcoins existirão daqui a 100 anos: <strong className="text-amber-400">21.000.000</strong>.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Você consegue dizer quantos Reais existirão daqui a <strong className="text-red-400">10 minutos</strong>? A escassez matemática é o seu escudo contra a diluição do seu tempo de vida.
                  </p>
                </div>
                <div className="text-center p-6 border border-amber-500/10 rounded-sm bg-amber-500/5">
                  <div className="text-5xl md:text-6xl font-black text-white italic">21M</div>
                  <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mt-2 font-mono">para sempre</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 3: OURO DIGITAL VS. FRAUDE === */}
          <section id="ouro" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Gem size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Ouro Digital vs. Fraude Estatal</h2>
            </div>

            {/* Comparison Table */}
            <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm overflow-hidden mb-8">
              <div className="grid grid-cols-3 text-[9px] font-black uppercase tracking-widest font-mono border-b border-white/5">
                <div className="p-4 text-slate-600">Propriedade</div>
                <div className="p-4 text-amber-500 text-center">Ouro</div>
                <div className="p-4 text-amber-400 text-center">Bitcoin</div>
              </div>
              {GOLD_VS_BTC.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <div className="p-4 text-white text-xs font-bold">{row.prop}</div>
                  <div className="p-4 text-slate-400 text-xs text-center flex items-center justify-center gap-1.5">
                    {!row.btcWins && <CheckCircle2 size={12} className="text-green-400 flex-shrink-0" />}
                    {row.gold}
                  </div>
                  <div className="p-4 text-xs text-center flex items-center justify-center gap-1.5">
                    {row.btcWins && <CheckCircle2 size={12} className="text-green-400 flex-shrink-0" />}
                    <span className={row.btcWins ? 'text-amber-400 font-bold' : 'text-slate-400'}>{row.btc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <Globe className="text-amber-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Transporte Invisível</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Você não pode cruzar fronteiras com quilos de ouro sem ser notado. Mas pode atravessar qualquer fronteira com <strong className="text-white">bilhões em Bitcoin na sua mente</strong> ou em um dispositivo menor que um pen drive.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <ShieldAlert className="text-amber-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Auditoria Instantânea</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Qualquer pessoa com um celular pode auditar a rede inteira <strong className="text-white">em segundos</strong> para garantir que ninguém está trapaceando ou imprimindo mais moedas "por baixo do pano".
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 4: ALERTA DE RISCO === */}
          <section id="alerta" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Alerta de Risco</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-red-500/20 rounded-sm p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-red-400 font-black uppercase text-sm tracking-wider font-mono italic alert-pulse">A Armadilha do Lastro</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Moedas "atreladas" ou "lastreadas" <strong className="text-white">falham no momento</strong> em que os cidadãos perdem a fé na capacidade do emissor de honrar a troca. Quando a confiança quebra, o colapso é <strong className="text-red-400">instantâneo</strong>.
                  </p>
                  <div className="space-y-2 font-mono text-[10px] pt-3 border-t border-white/5">
                    {[
                      { name: 'Venezuela (Bolívar)', status: 'COLAPSO', color: 'red' },
                      { name: 'Argentina (Peso)', status: 'DERRETENDO', color: 'red' },
                      { name: 'Turquia (Lira)', status: 'DERRETENDO', color: 'red' },
                      { name: 'Brasil (Real)', status: 'ERODINDO', color: 'amber' },
                    ].map((c, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-slate-500">{c.name}</span>
                        <span className={`text-${c.color}-${c.color === 'red' ? '500' : '400'} font-bold ${c.color === 'red' ? 'animate-pulse' : ''}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-green-400 font-black uppercase text-sm tracking-wider font-mono italic">Sua Defesa</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    O Bitcoin <strong className="text-white">não pede sua fé</strong>; ele oferece a <strong className="text-green-400">Verificação</strong>.
                  </p>
                  <div className="p-6 border border-amber-500/10 rounded-sm bg-amber-500/5 text-center">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono tracking-wider">
                      "Don't Trust,<br/><span className="text-white text-lg">Verify."</span>
                    </p>
                    <p className="text-slate-500 text-[10px] font-mono mt-2">Não confie em ninguém. Verifique o código.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === CONCLUSÃO === */}
          <section id="conclusao" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Conclusão Tática</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 space-y-8">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  A Soberania é <span className="lb-shimmer-gold">Matemática</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Sem Intermediários</p>
                    <p className="text-slate-400 text-sm leading-relaxed">Transações ponto a ponto, sem censura e sem fronteiras. Nenhum banco, nenhum burocrata no meio.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Independência</p>
                    <p className="text-slate-400 text-sm leading-relaxed">O valor vem da demanda global e da segurança criptográfica, não de decretos de políticos falidos.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-amber-400 font-black uppercase text-sm font-mono">Soberania</p>
                    <p className="text-slate-400 text-sm leading-relaxed">O Bitcoin resolve a fragilidade do ouro e a fraude do papel moeda. É o ativo final da humanidade.</p>
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
