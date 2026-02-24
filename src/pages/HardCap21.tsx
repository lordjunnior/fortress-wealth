import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Pickaxe, Users, Scale, Database, Cpu, ShieldAlert, Layers, AlertTriangle, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'bloco-01', label: '01: O Hard Cap' },
  { id: 'bloco-02', label: '02: Por que 21 Milhões?' },
  { id: 'bloco-03', label: '03: Modelo de Incentivos' },
  { id: 'bloco-04', label: '04: Modelo de Governança' },
  { id: 'bloco-05', label: '05: Cenário Hipotético' },
  { id: 'bloco-06', label: '06: Halvings e Emissão' },
];

const HALVING_DATA = [
  { year: '2009', reward: 50, pct: 100 },
  { year: '2012', reward: 25, pct: 50 },
  { year: '2016', reward: 12.5, pct: 25 },
  { year: '2020', reward: 6.25, pct: 12.5 },
  { year: '2024', reward: 3.125, pct: 6.25 },
  { year: '2028', reward: 1.5625, pct: 3.12 },
];

const DENOMINATION_TABLE = [
  { name: 'Bitcoin (BTC)', btc: '1.0', sats: '100.000.000' },
  { name: 'centiBitcoin (cBTC)', btc: '0.01', sats: '1.000.000' },
  { name: 'milliBitcoin (mBTC)', btc: '0.001', sats: '100.000' },
  { name: 'microBitcoin (μBTC)', btc: '0.000001', sats: '100' },
  { name: 'Satoshi (Sat)', btc: '0.00000001', sats: '1', highlight: true },
];

export default function HardCap21() {
  const [activeSection, setActiveSection] = useState('bloco-01');
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="hc-dust"></div><div className="hc-dust hc-dust-2"></div>
      </div>

      <style>{`
        @keyframes hcDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .hc-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(234,179,8,0.15) 100%,transparent);background-size:200px 200px;animation:hcDrift 60s linear infinite }
        .hc-dust-2 { background-size:280px 280px;animation:hcDrift 90s linear infinite reverse;opacity:0.4 }
        .hc-shimmer { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:hcShim 3s linear infinite }
        @keyframes hcShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
        @keyframes barScale { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes lockPulse { 0%,100%{text-shadow:0 0 0 rgba(245,158,11,0)} 50%{text-shadow:0 0 30px rgba(245,158,11,0.3)} }
        .lock-pulse { animation:lockPulse 3s ease-in-out infinite }
        .table-shimmer { position:relative;overflow:hidden }
        .table-shimmer::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(245,158,11,0.06) 50%,transparent 100%);background-size:250% 100%;animation:hcShim 4s linear infinite }
      `}</style>

      {/* === BÚSSOLA LATERAL (Desktop) === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Hard Cap</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Progresso</span>
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
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Hard Cap</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #b45309, #f59e0b)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[260px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* HEADER */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(45,20,0,0.5) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.5) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(180,83,9,0.3) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.06] font-black text-[160px] md:text-[260px] leading-none select-none pointer-events-none lock-pulse" style={{ fontFamily: 'Arial' }}>21M</div>
            <div className="relative z-10">
              <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Protocolo de Imutabilidade</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                O Hard Cap<br />
                <span className="hc-shimmer italic">dos 21 Milhões</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Entenda por que o limite de fornecimento de 21 milhões de Bitcoins não pode ser alterado. Os modelos de incentivo e governança do protocolo garantem que essa regra é inquebrável.
              </p>
            </div>
          </header>

          {/* === BLOCO 01: O QUE É O HARD CAP === */}
          <section id="bloco-01" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: O Que É o Hard Cap?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                O Hard Cap do Bitcoin é o <strong className="text-white">número máximo de bitcoins que podem existir: 21 milhões de BTC</strong>. Este limite absoluto na oferta total é a característica fundamental da política monetária do Bitcoin, projetada para criar escassez e impedir a inflação.
              </p>
              <p>
                <strong className="text-amber-400">Satoshi Nakamoto</strong> codificou esse limite diretamente no código-fonte do Bitcoin, e ele é imposto por dezenas de milhares de nós da rede ao redor do mundo.
              </p>
              <p>
                O Hard Cap é alcançado através do processo de <strong className="text-white">Halving</strong>: a recompensa por minerar novos blocos é cortada pela metade aproximadamente a cada 4 anos, reduzindo gradualmente a taxa de criação de novos bitcoins até que o limite seja atingido. Estima-se que o último bitcoin será minerado por volta de <strong className="text-white">2140</strong>.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-900/40 p-6 rounded-sm border border-white/5 text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Limite</p>
                  <p className="text-3xl font-black text-amber-500 italic mt-1">21M</p>
                </div>
                <div className="bg-slate-900/40 p-6 rounded-sm border border-white/5 text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Minerados</p>
                  <p className="text-3xl font-black text-white italic mt-1">~19.8M</p>
                </div>
                <div className="bg-slate-900/40 p-6 rounded-sm border border-white/5 text-center">
                  <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Último BTC</p>
                  <p className="text-3xl font-black text-slate-500 italic mt-1">2140</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 02: POR QUE 21 MILHÕES? === */}
          <section id="bloco-02" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Scale size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: Por Que Satoshi Escolheu 21 Milhões?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">O Raciocínio de Satoshi</h3>
                <p>
                  Em uma troca de e-mails com <strong className="text-white">Martti Malmi</strong>, um dos primeiros colaboradores do Bitcoin, Satoshi explicou que a decisão foi um <strong className="text-amber-400">"palpite educado"</strong>, já que o número precisava ser decidido antecipadamente, sem saber como o futuro do Bitcoin se desdobraria.
                </p>
                <p>
                  Satoshi buscou um número que eventualmente tornasse os preços denominados em Bitcoin comparáveis às moedas existentes, com alta divisibilidade para flexibilidade de precificação.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-10 space-y-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.4) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <h3 className="text-amber-400 font-black uppercase text-sm tracking-wider font-mono italic">A Divisibilidade</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Cada bitcoin pode ser dividido em <strong className="text-white">100 milhões de unidades chamadas satoshis</strong>. Isso significa que, mesmo com uma oferta aparentemente baixa, o Bitcoin pode servir como meio de troca para transações de qualquer valor.
                  </p>
                  <div className="mt-6 text-center">
                    <div className="text-4xl md:text-5xl font-black text-white italic">1 BTC</div>
                    <div className="text-amber-500 font-black text-lg my-2">=</div>
                    <div className="text-4xl md:text-5xl font-black text-amber-500 italic">100.000.000 sats</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 03: MODELO DE INCENTIVOS === */}
          <section id="bloco-03" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Pickaxe size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: O Modelo de Incentivos Protege o Hard Cap</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Não existe incentivo para aumentar a oferta de Bitcoin porque isso resultaria em <strong className="text-red-400">inflação e destruiria a tese central de investimento</strong> — a escassez. Para muitos investidores, o apelo do Bitcoin é exatamente a oferta previsível e fixa.
              </p>
              <p>
                Gestores de patrimônio como <strong className="text-white">Paul Tudor Jones</strong> e instituições como a <strong className="text-white">BlackRock</strong> creditaram a escassez do Bitcoin como um motor significativo para a valorização do ativo.
              </p>
              <div className="bg-red-950/20 border border-red-900/30 rounded-sm p-8 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-red-400 font-black uppercase text-xs tracking-widest font-mono mb-3">Suicídio Econômico dos Mineradores</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Embora a mudança aumentasse a receita dos mineradores em termos de bitcoin, a <strong className="text-white">perda de fé na rede</strong> resultaria em um colapso de preço catastrófico e irreversível. Como quase todos os mineradores pagam seus custos (equipamento, salários, energia) em moeda fiduciária, eles são mais preocupados com a receita em dólar/real — que despencaria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 04: MODELO DE GOVERNANÇA === */}
          <section id="bloco-04" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Users size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: O Modelo de Governança Protege o Hard Cap</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Descentralização Real</h3>
                <p>
                  O modelo de governança do Bitcoin é <strong className="text-white">descentralizado</strong>. Mudanças no protocolo requerem consenso amplo. Qualquer alteração no Hard Cap exigiria que a maioria dos <strong className="text-amber-400">nós da rede</strong> adotasse a nova regra — o que é extremamente improvável.
                </p>
                <p>
                  Existem dezenas de <strong className="text-white">versões diferentes</strong> do software Bitcoin sendo executadas simultaneamente. Alterar o código-fonte de uma versão é trivial; convencer dezenas de milhares de nós a adotar essa mudança não é.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Mineradores Não Controlam as Regras</h3>
                <p>
                  Os mineradores <strong className="text-red-400">não controlam a rede</strong> nem suas regras. Eles seguem as regras impostas pelos full nodes para serem recompensados com bitcoin. Quando um minerador submete um bloco, dezenas de milhares de nós verificam independentemente se ele é válido.
                </p>
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-sm p-6 mt-4">
                  <h4 className="text-amber-400 font-black uppercase text-[10px] tracking-widest font-mono mb-2">Guerra dos Blocos — 2017</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Esta teoria foi validada quando <strong className="text-white">95% dos mineradores</strong> concordaram em aumentar o tamanho do bloco. Os nós e usuários, no entanto, <strong className="text-amber-400">recusaram a mudança</strong> e forçaram os mineradores a adotar uma solução alternativa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 05: CENÁRIO HIPOTÉTICO === */}
          <section id="bloco-05" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Database size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: E Se Tentassem Mudar?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-amber-500/10 rounded-sm p-10 md:p-14 space-y-8">
              <p className="text-slate-400 text-base leading-relaxed">
                Apesar dos modelos de incentivo e governança, mudar o Hard Cap é <strong className="text-white">teoricamente possível</strong>, mas exigiria a colaboração simultânea de vários grupos:
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Proposta dos Desenvolvedores', desc: 'Desenvolvedores teriam que propor e escrever o código para implementar a mudança. Haveria discussão comunitária extremamente controversa.' },
                  { step: '02', title: 'Consenso da Comunidade', desc: 'A comunidade teria que concordar com um caminho de ativação, garantindo a transição coletiva da rede para o novo conjunto de regras.' },
                  { step: '03', title: 'Hard Fork Obrigatório', desc: 'Seria necessário um Hard Fork: todos os nós da rede teriam que adotar as mudanças ou seriam forçados para fora da rede.' },
                  { step: '04', title: 'Fork Minoritário Sobrevive', desc: 'Nós e mineradores que recusassem operariam um fork minoritário, preservando o Bitcoin original. As duas redes competiriam por mercado e hashrate.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <span className="text-amber-500 font-black text-xs font-mono">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-sm tracking-tighter italic mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-sm p-8 mt-4">
                <p className="text-amber-400 font-black uppercase text-sm tracking-tight italic text-center">
                  "A oferta de 21 milhões do Bitcoin original nunca pode ser alterada — porque o fork original sempre sobreviverá."
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 06: HALVINGS & TABELA === */}
          <section id="bloco-06" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10">
              <Layers size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Cronograma de Emissão — Halvings</h2>
            </div>

            {/* Halving Chart */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 mb-6">
              <h3 className="text-white font-black uppercase text-xs tracking-widest font-mono italic mb-8">Recompensa por Bloco ao Longo do Tempo</h3>
              <div className="h-48 flex items-end justify-between gap-3 border-b border-l border-white/10 p-2">
                {HALVING_DATA.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                    <span className="text-[9px] text-amber-500 font-black font-mono mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{h.reward} BTC</span>
                    <div
                      style={{ height: `${h.pct}%`, animation: `barScale 1.5s ease-out ${i * 0.2}s both`, transformOrigin: 'bottom' }}
                      className="w-full bg-amber-500/20 border-t-2 border-amber-500 group-hover:bg-amber-500/40 transition-colors rounded-t-sm"
                    />
                    <span className="text-[8px] text-slate-600 font-black mt-2 font-mono">{h.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Denominações */}
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-white font-black uppercase text-xs tracking-widest font-mono italic">Tabela de Denominações</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Nome</th>
                      <th className="text-right p-4 text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Valor em BTC</th>
                      <th className="text-right p-4 text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Valor em Sats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DENOMINATION_TABLE.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${row.highlight ? 'table-shimmer' : ''}`}
                      >
                        <td className={`p-4 font-mono text-sm font-bold ${row.highlight ? 'text-amber-400' : 'text-slate-300'}`}>{row.name}</td>
                        <td className={`p-4 font-mono text-sm text-right ${row.highlight ? 'text-amber-400 font-black' : 'text-slate-500'}`}>{row.btc}</td>
                        <td className={`p-4 font-mono text-sm text-right ${row.highlight ? 'text-amber-400 font-black' : 'text-slate-500'}`}>{row.sats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CONCLUSÃO TÁTICA */}
          <section className="mb-20">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-sm p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <ShieldCheck className="text-amber-500 mx-auto mb-6" size={40} />
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight italic">
                  Conclusão:<br />O Limite é <span className="hc-shimmer">Inquebrável</span>
                </h2>
                <div className="max-w-2xl mx-auto mt-8 space-y-4 text-slate-400 text-sm leading-relaxed text-left">
                  <p className="flex gap-3 items-start">
                    <Zap className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Incentivo Econômico:</strong> Destruir a escassez é destruir o valor. Nenhum participante racional ganha com isso.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <Cpu className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Governança Descentralizada:</strong> Dezenas de milhares de nós independentes rejeitariam qualquer bloco inválido.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <ShieldAlert className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Prova Histórica:</strong> A Guerra dos Blocos de 2017 provou que os nós vencem, não os mineradores.</span>
                  </p>
                </div>
                <p className="text-slate-600 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">21 Milhões. Ponto Final.</p>
              </div>
            </div>
          </section>

          <footer className="text-center">
            <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] font-mono">Lord Junnior © 2026</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
