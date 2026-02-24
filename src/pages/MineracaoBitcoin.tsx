import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Pickaxe, Zap, Cpu, ShieldCheck, ShieldAlert, Clock, Users, TrendingUp, TrendingDown, Thermometer, Server, Wifi, Factory } from 'lucide-react';

const SECTIONS = [
  { id: 'impacto', label: 'Minerar ou Comprar?' },
  { id: 'pilares', label: 'Pilares da Rentabilidade' },
  { id: 'estrategia', label: 'Bull vs Bear' },
  { id: 'pools', label: 'Pools de Mineração' },
  { id: 'conclusao', label: 'Comece a Operar' },
];

export default function MineracaoBitcoin() {
  const [activeSection, setActiveSection] = useState('impacto');
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="mn-dust"></div><div className="mn-dust mn-dust-2"></div>
      </div>

      <style>{`
        @keyframes mnDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .mn-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 20%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(234,179,8,0.15) 100%,transparent);background-size:200px 200px;animation:mnDrift 55s linear infinite }
        .mn-dust-2 { background-size:300px 300px;animation:mnDrift 80s linear infinite reverse;opacity:0.5 }
        .mn-shimmer { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:mnShim 3s linear infinite }
        @keyframes mnShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;animation:goldGlow 3s ease-in-out infinite }
        @keyframes kycBurn { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.05)} }
        .kyc-burn { animation:kycBurn 3s ease-in-out infinite }
        @keyframes pulseNode { 0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,0.4)} 50%{box-shadow:0 0 0 8px rgba(245,158,11,0)} }
        .pulse-node { animation:pulseNode 2s ease-in-out infinite }
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
            <Pickaxe className="text-amber-500" size={12} />
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Mineração</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Pickaxe className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Mineração Bitcoin</span>
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

          {/* === BLOCO DE IMPACTO === */}
          <section id="impacto" className="mb-28 scroll-mt-24">
            <header className="relative overflow-hidden rounded-sm p-10 md:p-16 mb-12" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(40,20,5,0.6) 100%)' }}>
              <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(220,38,38,0.25) 0%, transparent 50%)' }} />
              
              {/* Parallax: BTC symbol vs KYC burning */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 text-amber-500/[0.06] font-black text-[160px] md:text-[240px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 select-none pointer-events-none kyc-burn">
                <div className="text-red-600/[0.12] font-black text-[80px] md:text-[140px] leading-none font-mono line-through decoration-red-600/30 decoration-4">KYC</div>
              </div>

              <div className="relative z-10">
                <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">A Escolha da Privacidade</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                  Minerar<br />
                  <span className="text-slate-700 italic lowercase text-3xl md:text-4xl">ou</span>{' '}
                  <span className="mn-shimmer italic">Comprar?</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  A mineração não é apenas uma forma de ganhar Bitcoin. É a única maneira de obtê-los sem entregar sua identidade e sem depender de intermediários.
                </p>
              </div>
            </header>

            {/* 3 Pilares do Impacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.04) 100%)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <ShieldCheck className="text-green-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-green-400 font-black uppercase text-sm mb-3 tracking-tighter italic">A Vantagem Oculta</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Minerar é a única forma de obter <strong className="text-white">Bitcoins Virgens</strong>, sem histórico e sem entregar dados (KYC) para corretoras que vigiam cada movimento seu.</p>
              </div>
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(180,83,9,0.04) 100%)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />
                <Clock className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-amber-400 font-black uppercase text-sm mb-3 tracking-tighter italic">Visão de Longo Prazo</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Para quem opera com horizonte de anos, a mineração é a forma mais eficiente de acumular, suavizando a volatilidade através de <strong className="text-white">depósitos automáticos</strong> na sua carteira.</p>
              </div>
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(8,145,178,0.04) 100%)', border: '1px solid rgba(6,182,212,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }} />
                <Wifi className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-cyan-400 font-black uppercase text-sm mb-3 tracking-tighter italic">Serviço à Rede</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Além do lucro, minerar é um <strong className="text-white">ato de defesa</strong>. Sem mineradores, a rede e a liberdade que ela proporciona deixariam de existir.</p>
              </div>
            </div>
          </section>

          {/* === PILARES DA RENTABILIDADE === */}
          <section id="pilares" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Cpu size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Os Pilares da Rentabilidade</h2>
            </div>

            <div className="space-y-4">
              {/* Hardware ASIC */}
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-10 flex gap-6 items-start group hover:border-amber-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Cpu className="text-amber-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Hardware ASIC</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">O motor da sua operação. Modelos novos são mais caros, mas mineram mais por cada centavo de energia gasto. É uma <strong className="text-white">corrida tecnológica constante</strong>.</p>
                  <div className="flex gap-6 mt-4">
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Eficiência</p><p className="text-lg font-black italic text-amber-400">J/TH</p></div>
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Hash Rate</p><p className="text-lg font-black italic text-amber-400">TH/s</p></div>
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">ROI</p><p className="text-lg font-black italic text-amber-400">Meses</p></div>
                  </div>
                </div>
              </div>

              {/* Ouro Energético */}
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-10 flex gap-6 items-start group hover:border-green-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="text-green-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Ouro Energético</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">O fator decisivo é o <strong className="text-white">preço da eletricidade</strong>. Minerar em casa com tarifas de varejo é inviável; a soberania exige buscar energia excedente, renovável ou negociada diretamente na fonte.</p>
                  <div className="mt-4 p-4 bg-red-950/20 border border-red-600/15 rounded-sm">
                    <p className="text-red-400 text-xs font-bold font-mono uppercase"><ShieldAlert className="inline mr-2" size={12} />Regra: Se paga tarifa residencial, NÃO minere.</p>
                  </div>
                </div>
              </div>

              {/* Uptime */}
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-10 flex gap-6 items-start group hover:border-cyan-500/20 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }} />
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Thermometer className="text-cyan-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm mb-2 tracking-tighter italic font-mono">Tempo de Atividade (Uptime)</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Cada segundo offline é um segundo sem gerar riqueza. <strong className="text-white">Manutenção rápida e refrigeração robusta</strong> são obrigatórias para manter a fortaleza operando.</p>
                  <div className="flex gap-6 mt-4">
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Meta Uptime</p><p className="text-lg font-black italic text-cyan-400">99.5%</p></div>
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Temp. Ideal</p><p className="text-lg font-black italic text-cyan-400">≤35°C</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BULL vs BEAR === */}
          <section id="estrategia" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <TrendingUp size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estratégia de Sobrevivência: Bull vs Bear</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bear */}
              <div className="rounded-sm p-10 relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(30,58,138,0.15) 100%)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                <div className="absolute top-4 right-4 text-blue-500/[0.06] font-black text-[120px] leading-none select-none pointer-events-none">❄</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="text-blue-400" size={20} />
                    <h3 className="text-blue-400 font-black uppercase text-sm tracking-wider font-mono italic">Bear Market (Gelo)</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">O objetivo é a <strong className="text-white">sobrevivência</strong>. Quando outros desistem e desligam as máquinas, a dificuldade da rede cai.</p>
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Dificuldade cai = mais BTC por máquina</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Hardware usado fica barato — hora de expandir</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Acumule sats baratos. Paciência é a arma.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bull */}
              <div className="rounded-sm p-10 relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, rgba(180,83,9,0.15) 100%)', border: '1px solid rgba(249,115,22,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
                <div className="absolute top-4 right-4 text-orange-500/[0.06] font-black text-[120px] leading-none select-none pointer-events-none">🔥</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-orange-400" size={20} />
                    <h3 className="text-orange-400 font-black uppercase text-sm tracking-wider font-mono italic">Bull Market (Fogo)</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">É a hora da <strong className="text-white">colheita</strong>. A competição aumenta, mas o valor em fiat dispara.</p>
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Valor do BTC minerado multiplica em fiat</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Amortize o hardware e fortaleça o caixa</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-orange-400 font-black text-xs mt-0.5">→</span>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">Dificuldade sobe — menos BTC por esforço</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === POOLS DE MINERAÇÃO === */}
          <section id="pools" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Users size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Escudo Coletivo: Pools de Mineração</h2>
            </div>

            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-8 relative overflow-hidden">
              {/* Pool visualization */}
              <div className="flex items-center justify-center gap-4 py-8">
                <div className="flex flex-wrap gap-3 items-center justify-center max-w-xs">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center pulse-node" style={{ animationDelay: `${i * 0.25}s` }}>
                      <Server className="text-slate-500" size={12} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-slate-700 font-mono text-xs">→→→</div>
                </div>
                <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-500/40 flex items-center justify-center pulse-node">
                  <Pickaxe className="text-amber-500" size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">União de Poder</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Mineradores pequenos se unem em <strong className="text-white">Pools</strong> para agregar seu poder de processamento (Hash Rate) e dividir as recompensas de forma frequente e estável, eliminando o fator "loteria" da mineração individual.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Ajuste de Dificuldade</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">A rede se <strong className="text-white">autorregula a cada 2.016 blocos</strong> (~2 semanas), garantindo que novos blocos surjam a cada 10 minutos, não importa quantos mineradores entrem ou saiam.</p>
                  <div className="flex gap-6 mt-2">
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Blocos</p><p className="text-xl font-black italic">~10min</p></div>
                    <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Ajuste</p><p className="text-xl font-black italic">2.016</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === CONCLUSÃO TÁTICA === */}
          <section id="conclusao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Factory size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Conclusão Tática: Comece a Operar</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border-2 border-amber-500/20 bg-amber-950/10 rounded-sm p-10 relative overflow-hidden group hover:border-amber-500/40 transition-all">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />
                <Pickaxe className="text-amber-500 mb-4" size={24} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic mb-3">Indústria de Capital</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A mineração evoluiu de um hobby de cypherpunks para uma <strong className="text-white">indústria competitiva de alto nível</strong>. Quem entra precisa tratar como operação profissional.</p>
              </div>
              <div className="border-2 border-green-500/20 bg-green-950/10 rounded-sm p-10 relative overflow-hidden group hover:border-green-500/40 transition-all">
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
                <Server className="text-green-500 mb-4" size={24} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic mb-3">Mineração Hospedada</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Se você não tem energia barata, a <strong className="text-white">Mineração Hospedada</strong> permite alugar espaço em instalações profissionais, mantendo a posse dos seus sats minerados.</p>
              </div>
            </div>

            {/* Warning */}
            <div className="border-2 border-red-600/20 bg-red-950/10 rounded-sm p-10 relative overflow-hidden">
              <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-10 -mt-10" size={200} />
              <div className="relative z-10">
                <p className="text-red-600 font-black uppercase tracking-widest text-[9px] italic font-mono mb-4">Aviso Operacional</p>
                <p className="text-white font-black text-lg md:text-xl leading-tight uppercase italic mb-4">
                  "Mineração não é renda passiva. É operação ativa que exige capital, energia barata e disciplina."
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Estude os números antes de investir. Calcule o breakeven. Nunca mine com energia cara. E lembre-se: os sats que você minera são seus — sem KYC, sem rastro.
                </p>
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
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Mineração é soberania energética convertida em liberdade financeira.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
