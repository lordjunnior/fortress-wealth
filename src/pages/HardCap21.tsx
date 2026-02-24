import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Gem, Eye, Scale, Zap, ShieldOff, Globe, CheckCircle2, XCircle } from 'lucide-react';
import SatCounter from '@/components/SatCounter';

const NAV_ITEMS = [
  { id: 'escasso', label: 'O Único Ativo Escasso' },
  { id: 'lideres', label: 'A Morte dos Líderes' },
  { id: 'auditoria', label: 'A Auditoria Total' },
  { id: 'comparacao', label: 'Ouro Digital vs. Papel' },
  { id: 'satoshi', label: 'O Conceito de Satoshi' },
];

const COMPARISON = [
  { prop: 'Oferta', gov: 'Infinita / Arbitrária', gold: 'Desconhecida', btc: '21 Milhões (Fixo)', btcWins: true },
  { prop: 'Portabilidade', gov: 'Alta (Digital)', gold: 'Baixa (Pesado)', btc: 'Absoluta (Qualquer Fronteira)', btcWins: true },
  { prop: 'Divisibilidade', gov: 'Baixa', gold: 'Difícil', btc: '100M de Sats/BTC', btcWins: true },
  { prop: 'Auditoria', gov: 'Impossível', gold: 'Lenta / Cara', btc: 'Instantânea / Pública', btcWins: true },
  { prop: 'Confisco', gov: 'Fácil (decreto)', gold: 'Possível (Ordem 6102)', btc: 'Impossível (autocustódia)', btcWins: true },
  { prop: 'Emissor', gov: 'Banco Central', gold: 'Natureza', btc: 'Algoritmo (código aberto)', btcWins: true },
];

// Fake scrolling transactions for the terminal
const FAKE_TXS = [
  'tx 3a7f...c91d → 0.05420000 BTC confirmada bloco #887,241',
  'tx 8b2e...f430 → 1.00000000 BTC confirmada bloco #887,241',
  'tx d1c4...a8e7 → 0.00150000 BTC confirmada bloco #887,240',
  'tx 72fa...3b19 → 0.21000000 BTC confirmada bloco #887,240',
  'tx 9e01...d5c8 → 0.00003400 BTC confirmada bloco #887,239',
  'tx a4b3...7f22 → 2.50000000 BTC confirmada bloco #887,239',
  'tx 1d8c...e901 → 0.00780000 BTC confirmada bloco #887,238',
  'tx f6a2...b4d3 → 0.10000000 BTC confirmada bloco #887,238',
  'tx 5c9e...1a87 → 0.00000547 BTC confirmada bloco #887,237',
  'tx 0b7d...c6f5 → 0.50000000 BTC confirmada bloco #887,237',
];

export default function HardCap21() {
  const [activeSection, setActiveSection] = useState('escasso');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

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

  // Terminal animation
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTerminalLines(prev => {
        const next = [...prev, FAKE_TXS[idx % FAKE_TXS.length]];
        if (next.length > 8) next.shift();
        return next;
      });
      idx++;
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="hc-dust"></div><div className="hc-dust hc-dust-2"></div>
      </div>

      <style>{`
        @keyframes hcDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .hc-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(234,179,8,0.15) 100%,transparent);background-size:200px 200px;animation:hcDrift 60s linear infinite }
        .hc-dust-2 { background-size:280px 280px;animation:hcDrift 90s linear infinite reverse;opacity:0.4 }
        .hc-shimmer { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:hcShim 3s linear infinite }
        .hc-shimmer-red { background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fff 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:hcShim 2.5s linear infinite }
        @keyframes hcShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
        @keyframes lockPulse { 0%,100%{text-shadow:0 0 0 rgba(245,158,11,0)} 50%{text-shadow:0 0 30px rgba(245,158,11,0.3)} }
        .lock-pulse { animation:lockPulse 3s ease-in-out infinite }
        @keyframes asteroidFloat { 0%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(15px,-20px) rotate(120deg)} 66%{transform:translate(-10px,10px) rotate(240deg)} 100%{transform:translate(0,0) rotate(360deg)} }
        .asteroid { animation:asteroidFloat 20s ease-in-out infinite }
        .table-shimmer { position:relative;overflow:hidden }
        .table-shimmer::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(245,158,11,0.06) 50%,transparent 100%);background-size:250% 100%;animation:hcShim 4s linear infinite;pointer-events:none }
        @keyframes terminalBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .term-cursor { animation:terminalBlink 1s step-end infinite }
      `}</style>

      {/* === SIDEBAR === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Hard Cap: 21M</span>
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
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #b45309, #f59e0b)' }} />
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
            <Lock className="text-amber-500" size={12} />
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">21M</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #b45309, #f59e0b)' }} />
        </div>
      </div>

      {/* === MAIN === */}
      <div className="relative z-10 lg:ml-[260px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* HEADER — Asteroid parallax */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(45,20,0,0.5) 100%)' }}>
            {/* Floating asteroids */}
            {[
              { size: 6, x: '15%', y: '20%', delay: '0s', opacity: 0.15 },
              { size: 10, x: '70%', y: '30%', delay: '3s', opacity: 0.1 },
              { size: 4, x: '40%', y: '70%', delay: '7s', opacity: 0.2 },
              { size: 8, x: '80%', y: '60%', delay: '5s', opacity: 0.12 },
              { size: 3, x: '25%', y: '50%', delay: '10s', opacity: 0.25 },
            ].map((a, i) => (
              <div
                key={i}
                className="absolute rounded-full asteroid"
                style={{
                  width: `${a.size}px`, height: `${a.size}px`,
                  left: a.x, top: a.y,
                  background: `rgba(245,158,11,${a.opacity})`,
                  boxShadow: `0 0 ${a.size * 2}px rgba(245,158,11,${a.opacity * 0.5})`,
                  animationDelay: a.delay,
                  animationDuration: `${15 + i * 5}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.5) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(180,83,9,0.3) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.06] font-black text-[160px] md:text-[260px] leading-none select-none pointer-events-none lock-pulse" style={{ fontFamily: 'Arial' }}>21M</div>
            <div className="relative z-10">
              <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Escassez Matemática Absoluta</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                O Único Ativo<br />
                <span className="hc-shimmer italic">Escasso no Universo</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Ouro é escasso na Terra, mas abundante no cosmos. Moedas estatais têm oferta infinita. O Bitcoin é o <strong className="text-white">único ativo com escassez matemática absoluta</strong> — 21 milhões, cravados em código imutável.
              </p>
            </div>
          </header>

          {/* === BLOCO 1: O ÚNICO ATIVO ESCASSO === */}
          <section id="escasso" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Gem size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Único Ativo Escasso no Universo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(153,27,27,0.06) 100%)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <h4 className="text-red-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Falha do Sistema</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Ouro é escasso na Terra, mas <strong className="text-white">abundante no universo</strong> — trilhões em asteroides que um dia inundarão o mercado. Moedas governamentais têm oferta infinita, impressas conforme o humor de burocratas.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(180,83,9,0.05) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <h4 className="text-amber-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">A Verdade Blindada</h4>
                <p className="text-slate-400 text-xs leading-relaxed">O Bitcoin é o único ativo com <strong className="text-white">escassez matemática absoluta</strong>. Satoshi Nakamoto cravou o limite de 21 milhões no algoritmo, tornando-o imune à vontade humana.</p>
              </div>
              <div className="rounded-sm p-8 transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-xs mb-3 tracking-wider font-mono">O Estalo Mental</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Você não compra Bitcoin para "ganhar dinheiro"; você compra para <strong className="text-white">não ser diluído</strong> pela impressão infinita de quem detém o poder.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-6 text-center">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Limite</p>
                <p className="text-3xl font-black text-amber-500 italic mt-1">21M</p>
                <p className="text-[9px] text-amber-500/50 font-mono mt-1">imutável</p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-6 text-center">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Minerados</p>
                <p className="text-3xl font-black text-white italic mt-1">~19.8M</p>
                <p className="text-[9px] text-slate-500 font-mono mt-1">94.3%</p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-6 text-center">
                <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Último BTC</p>
                <p className="text-3xl font-black text-slate-500 italic mt-1">2140</p>
                <p className="text-[9px] text-slate-600 font-mono mt-1">~116 anos</p>
              </div>
            </div>
          </section>

          {/* === BLOCO 2: A MORTE DOS LÍDERES === */}
          <section id="lideres" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <ShieldOff size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Morte dos Líderes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-red-500/10 rounded-sm p-8 space-y-4">
                <h3 className="text-red-400 font-black uppercase text-sm tracking-wider font-mono italic">Ponto de Falha Zero</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  O criador do Bitcoin <strong className="text-white">desapareceu</strong>, deixando o sistema nas mãos dos usuários. Sem um líder para ser preso, corrompido ou pressionado, o Bitcoin é <strong className="text-white">resistente à captura</strong> regulatória ou corporativa.
                </p>
                <div className="font-mono text-[10px] space-y-1.5 pt-3 border-t border-white/5">
                  <div className="flex justify-between text-slate-500"><span>CEO</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                  <div className="flex justify-between text-slate-500"><span>Sede</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                  <div className="flex justify-between text-slate-500"><span>Conselho</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                  <div className="flex justify-between text-slate-500"><span>Ponto de Falha</span><span className="text-green-400 font-bold">ZERO</span></div>
                </div>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <h3 className="text-amber-400 font-black uppercase text-sm tracking-wider font-mono italic">Imutabilidade Tática</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A descentralização garante que as regras do jogo — como a <strong className="text-white">oferta finita</strong> — jamais sejam alteradas por votações ou reuniões trimestrais.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  É o dinheiro que <strong className="text-white">não tem dono</strong>, portanto, não tem ponto fraco. Dezenas de milhares de nós independentes ao redor do mundo garantem a imutabilidade do protocolo.
                </p>
                <div className="p-4 border border-amber-500/10 rounded-sm bg-amber-500/5 text-center mt-3">
                  <p className="text-amber-400 font-mono font-bold text-xs">
                    Sem líder = Sem alvo<br/>
                    Sem alvo = <span className="text-white">Indestrível</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 3: A AUDITORIA TOTAL === */}
          <section id="auditoria" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Eye size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Auditoria Total</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Terminal */}
              <div className="bg-[#080C14] border border-green-500/20 rounded-sm overflow-hidden font-mono">
                <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <span className="text-[9px] text-green-500/60 uppercase tracking-widest">bitcoin_node --audit</span>
                  <span className="text-green-500 term-cursor text-xs">█</span>
                </div>
                <div className="p-4 min-h-[240px] flex flex-col justify-end">
                  <p className="text-[10px] text-green-500/40 mb-2">{'>'}  Conectado à rede Bitcoin. Auditando blockchain...</p>
                  <p className="text-[10px] text-green-500/40 mb-3">{'>'}  Supply total verificada: 19.843.750 / 21.000.000 BTC</p>
                  {terminalLines.map((line, i) => (
                    <p key={i} className="text-[10px] text-green-400/70 leading-relaxed">
                      <span className="text-green-500/40">{'>'} </span>{line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="space-y-6">
                <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Transparência vs. Segredo</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Enquanto os bancos centrais decidem o seu futuro <strong className="text-white">a portas fechadas</strong>, o livro-razão do Bitcoin é <strong className="text-green-400">público e permanente</strong>. Cada transação, cada bloco, cada satoshi — visível para qualquer um.
                  </p>
                </div>
                <div className="bg-[#0B0F19]/60 border border-green-500/10 rounded-sm p-8 space-y-4">
                  <h3 className="text-green-400 font-black uppercase text-sm tracking-wider font-mono italic">Seu Próprio Auditor</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Qualquer pessoa, em qualquer lugar, pode auditar a rede inteira executando um nó. Sem essa transparência total, a escassez poderia ser manipulada nos bastidores. Aqui, a <strong className="text-white">confiança foi substituída pela verificação matemática</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 4: COMPARAÇÃO === */}
          <section id="comparacao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Scale size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Ouro Digital vs. Papel Moeda</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm overflow-hidden table-shimmer">
              <div className="grid grid-cols-4 text-[9px] font-black uppercase tracking-widest font-mono border-b border-white/5">
                <div className="p-4 text-slate-600">Propriedade</div>
                <div className="p-4 text-red-400 text-center">Moeda Gov.</div>
                <div className="p-4 text-amber-500 text-center">Ouro</div>
                <div className="p-4 text-amber-400 text-center">Bitcoin</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={i} className="grid grid-cols-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <div className="p-4 text-white text-xs font-bold">{row.prop}</div>
                  <div className="p-4 text-slate-500 text-[11px] text-center flex items-center justify-center gap-1">
                    <XCircle size={10} className="text-red-500/50 flex-shrink-0" />
                    <span>{row.gov}</span>
                  </div>
                  <div className="p-4 text-slate-400 text-[11px] text-center">{row.gold}</div>
                  <div className="p-4 text-[11px] text-center flex items-center justify-center gap-1">
                    {row.btcWins && <CheckCircle2 size={10} className="text-green-400 flex-shrink-0" />}
                    <span className={row.btcWins ? 'text-amber-400 font-bold' : 'text-slate-400'}>{row.btc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Transport & Audit cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <Globe className="text-amber-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Transporte Invisível</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Você não pode cruzar fronteiras com quilos de ouro sem ser notado. Você pode atravessar qualquer fronteira com <strong className="text-white">bilhões em Bitcoin na sua mente</strong> ou em um dispositivo menor que um pen drive.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 space-y-4">
                <Eye className="text-green-400" size={22} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Auditoria Instantânea</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Qualquer pessoa com um celular pode auditar a rede inteira <strong className="text-white">em segundos</strong> para garantir que ninguém está trapaceando ou imprimindo moedas "por baixo do pano".
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 5: CONCEITO DE SATOSHI === */}
          <section id="satoshi" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Conceito de Satoshi</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-amber-500/20 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
                      Pare de Pensar em<br/><span className="hc-shimmer">Moedas Inteiras</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      O Bitcoin é divisível em <strong className="text-white">100 milhões de Satoshis</strong> (1 sat = 0,00000001 BTC). Isso permite que qualquer pessoa comece com qualquer quantia, protegendo-se da inflação que corrói o dólar e o real há décadas.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Você não precisa de milhares de dólares para ser livre. Comece a <strong className="text-amber-400">empilhar sats</strong> hoje.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-black text-white italic">1 BTC</div>
                    <div className="text-amber-500 font-black text-lg my-2">=</div>
                    <div className="text-4xl md:text-5xl font-black text-amber-500 italic">100.000.000</div>
                    <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mt-2 font-mono">Satoshis</p>
                  </div>
                </div>

                {/* SatCounter */}
                <div className="pt-6 border-t border-white/5">
                  <SatCounter />
                </div>

                {/* Conclusion */}
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6 text-center">Conclusão Tática</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 text-center">
                      <p className="text-amber-400 font-black uppercase text-sm font-mono">Sem Intermediários</p>
                      <p className="text-slate-400 text-xs leading-relaxed">Transações ponto a ponto, sem censura e sem fronteiras.</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-amber-400 font-black uppercase text-sm font-mono">Independência</p>
                      <p className="text-slate-400 text-xs leading-relaxed">Valor da demanda global e segurança criptográfica, não de decretos.</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-amber-400 font-black uppercase text-sm font-mono">Soberania</p>
                      <p className="text-slate-400 text-xs leading-relaxed">Resolve a fragilidade do ouro e a fraude do papel moeda.</p>
                    </div>
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
