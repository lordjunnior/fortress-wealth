import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, Cpu, History, AlertTriangle, TrendingDown, Eye, Database, Pickaxe, HelpCircle, Scale, Key } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'genese', label: '01. Gênese: O que é Dinheiro?' },
  { id: 'antidoto', label: '02. O Antídoto: O que é Bitcoin?' },
  { id: 'escassez', label: '03. Matemática da Escassez' },
  { id: 'chaves', label: '04. Soberania das Chaves' },
  { id: 'mineracao', label: '05. A Prova de Trabalho' },
  { id: 'mitos', label: '06. Neutralização de Mitos' },
  { id: 'blindagem', label: 'Blindagem Mental' },
];

export default function ProtocoloInicial() {
  const [activeSection, setActiveSection] = useState('genese');
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 overflow-x-hidden">
      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <div className="alert-layer"></div>
        <div className="alert-layer alert-layer-2"></div>
        <div className="alert-layer alert-layer-3"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="alert-pulse"></div>
      </div>

      <style>{`
        @keyframes driftAlert {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-500px) translateX(60px); }
          100% { transform: translateY(-1000px) translateX(0px); }
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.04; transform: scale(1.2); }
        }
        .alert-layer {
          position: absolute; width: 100%; height: 200%;
          background-image: radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent);
          background-size: 200px 200px; animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 { background-size: 280px 280px; animation: driftAlert 70s linear infinite reverse; opacity: 0.6; }
        .alert-layer-3 { background-size: 360px 360px; animation: driftAlert 100s linear infinite; opacity: 0.3; }
        .alert-pulse {
          position: absolute; top: 30%; left: 50%; width: 400px; height: 400px;
          margin: -200px 0 0 -200px; border-radius: 50%; border: 1px solid rgba(220,38,38,0.1);
          animation: alertPulse 5s ease-in-out infinite;
        }
        .protocolo-shimmer {
          background: linear-gradient(90deg, #dc2626 0%, #ff6b6b 40%, #ffffff 50%, #ff6b6b 60%, #dc2626 100%);
          background-size: 250% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: protocShimmer 3s linear infinite;
        }
        @keyframes protocShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(220,38,38,0.3); box-shadow: 0 0 20px rgba(220,38,38,0.05); }
          50% { border-color: rgba(220,38,38,0.8); box-shadow: 0 0 40px rgba(220,38,38,0.15); }
        }
        .border-pulse { animation: borderPulse 3s ease-in-out infinite; }
        @keyframes glowIcon {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(245,158,11,0.3)); }
          50% { filter: drop-shadow(0 0 12px rgba(245,158,11,0.7)); }
        }
        .icon-glow:hover { animation: glowIcon 2s ease-in-out infinite; }
        .glass-nav {
          background: rgba(11, 15, 25, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.03);
        }
        .glass-nav:hover {
          border-color: rgba(220,38,38,0.2);
          box-shadow: 0 0 40px rgba(220,38,38,0.05), inset 0 0 0 1px rgba(255,255,255,0.05);
        }
      `}</style>

      {/* BÚSSOLA LATERAL — Navegação Tática */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] z-50 flex-col">
        <div className="glass-nav m-4 rounded-2xl flex-1 flex flex-col overflow-hidden transition-all duration-500">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="text-red-600" size={20} />
              <span className="text-red-600 font-black uppercase text-xs tracking-[0.3em]">Protocolo Inicial</span>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all">
              <ArrowLeft size={12} /> Retornar ao Início
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4 pb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">Progresso</span>
              <span className="text-[8px] font-black text-red-600">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? 'text-white bg-red-600/10 border-l-2 border-red-600'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] border-l-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-[0.2em]">
            <ArrowLeft size={12} /> Início
          </Link>
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-red-600" size={14} />
            <span className="text-red-600 font-black uppercase text-[9px] tracking-[0.2em]">Protocolo Inicial</span>
          </div>
          <span className="text-[9px] font-black text-slate-500">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} className="relative z-10 lg:ml-[280px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-24 lg:pt-28">

          {/* === BLOCO DE IMPACTO: A FRAUDE vs. VERDADE === */}
          <header className="mb-32 relative overflow-hidden rounded-2xl p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.9) 0%, rgba(30,10,5,0.7) 100%)' }}>
            {/* Parallax BG - notas derretendo (blur) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(220,38,38,0.2) 0%, transparent 50%)' }} />
            {/* Bitcoin symbol - solid foreground */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 text-orange-500/10 font-black text-[200px] md:text-[300px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial, sans-serif' }}>₿</div>

            <div className="relative z-10">
              <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Para Leigos Absolutos</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-2 uppercase text-white">
                A Fraude Fiduciária
              </h1>
              <p className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                <span className="text-slate-600 italic lowercase text-4xl md:text-5xl">vs.</span>{' '}
                <span className="protocolo-shimmer italic">A Verdade Digital</span>
              </p>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium mt-8">
                O dinheiro que você conhece é uma dívida que nunca será paga. O Bitcoin é o único ativo no universo com escassez matemática absoluta. Enquanto o Estado imprime inflação, a matemática grava liberdade.
              </p>
            </div>
          </header>

          {/* === GRID DE PROPRIEDADES: 3 CARDS === */}
          <section className="mb-32">
            <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px] mb-8">Conceito</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Conceito */}
              <div className="relative overflow-hidden rounded-xl p-8 group transition-all duration-500 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(180,83,9,0.08) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.05), transparent)', backgroundSize: '200% 100%', animation: 'protocShimmer 3s linear infinite' }} />
                <h4 className="text-orange-400 font-black uppercase text-lg mb-4 tracking-tighter italic relative z-10">Conceito</h4>
                <p className="text-slate-300 text-sm leading-relaxed font-medium relative z-10">
                  O que é Bitcoin? Não é moeda digital para especular. É a descoberta da escassez absoluta. Ponto a Ponto. Sem permissão.
                </p>
              </div>
              {/* Card 2: Valor */}
              <div className="relative overflow-hidden rounded-xl p-8 group transition-all duration-500 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(22,101,52,0.08) 100%)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <h4 className="text-green-400 font-black uppercase text-lg mb-4 tracking-tighter italic">Valor</h4>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  Por que é Valioso? Não é opinião. É imutabilidade. 21 Milhões. O primeiro dinheiro na história que não tem um dono para destruí-lo.
                </p>
              </div>
              {/* Card 3: Ação */}
              <div className="relative overflow-hidden rounded-xl p-8 group transition-all duration-500 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.12) 0%, rgba(120,53,15,0.08) 100%)', border: '1px solid rgba(180,83,9,0.2)' }}>
                <h4 className="text-amber-500 font-black uppercase text-lg mb-4 tracking-tighter italic">Como Comprar?</h4>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  Troque papel podre por propriedade real. Mas entenda: se as chaves não são suas, o Bitcoin também não é.
                </p>
              </div>
            </div>
          </section>

          {/* === 01. GÊNESE: O QUE É DINHEIRO? === */}
          <section id="genese" className="mb-32 scroll-mt-24 space-y-12">
            <div className="flex items-center gap-4 text-red-600">
              <Coins size={24} />
              <h2 className="text-2xl font-black uppercase tracking-[0.2em]">01. Gênese: O que é Dinheiro?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed">
              <div className="space-y-6">
                <p>
                  Dinheiro é uma tecnologia de transporte de tempo e esforço através do espaço e do tempo. No sistema atual, governos imprimem moeda sem custo, diluindo o valor do seu trabalho. Isso é inflação: um roubo invisível e constante.
                </p>
                <p>
                  O Bitcoin surge como o antídoto: uma moeda digital descentralizada que oferece transações rápidas e seguras com um suprimento fixo. É a primeira vez na história que a humanidade descobriu a escassez absoluta.
                </p>
              </div>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-2xl">
                <h4 className="text-white font-black uppercase mb-4 italic text-sm tracking-widest">Leis da Moeda Forte:</h4>
                <ul className="space-y-4 text-sm font-bold uppercase tracking-tight">
                  <li className="flex gap-3 text-red-500 font-black"><Zap size={16}/> Escassez: Ouro é finito. Impressora é infinita.</li>
                  <li className="flex gap-3 text-slate-200"><Lock size={16}/> Imutabilidade: Ninguém altera o código.</li>
                  <li className="flex gap-3 text-slate-200"><Globe size={16}/> Soberania: Sem bancos, sem permissão.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* === 02. O ANTÍDOTO === */}
          <section id="antidoto" className="mb-32 scroll-mt-24 space-y-10">
            <div className="flex items-center gap-4 text-red-600">
              <Zap size={24} />
              <h2 className="text-2xl font-black uppercase tracking-[0.2em]">02. O Antídoto: O que é Bitcoin?</h2>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed max-w-3xl font-medium">
              Uma transação é uma transferência de valor em Bitcoin na blockchain. Diferente do PIX ou cartões, elas são irreversíveis uma vez adicionadas à rede.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
                <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Inputs</h4>
                <p className="text-xs text-slate-500 leading-relaxed uppercase">O endereço de onde o Bitcoin está saindo. É a prova de que você recebeu esse valor anteriormente.</p>
              </div>
              <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
                <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Outputs</h4>
                <p className="text-xs text-slate-500 leading-relaxed uppercase">O endereço de destino. É a chave pública que passará a ter o controle sobre esse valor.</p>
              </div>
              <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
                <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Taxas</h4>
                <p className="text-xs text-slate-500 leading-relaxed uppercase">O incentivo para mineradores. Quanto maior a taxa, mais rápido sua transação é confirmada no bloco.</p>
              </div>
            </div>
          </section>

          {/* === 03. MATEMÁTICA DA ESCASSEZ === */}
          <section id="escassez" className="mb-32 scroll-mt-24 bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">O Limite de <span className="text-red-600">21 Milhões</span></h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  O suprimento de Bitcoin é fixo. Diferente do dinheiro fiduciário, ninguém pode alterar este limite sem o consenso da rede. Este limite é garantido pela política monetária cravada no código.
                </p>
                <div className="flex gap-10">
                  <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Última Unidade</p><p className="text-3xl font-black italic text-white">Ano 2140</p></div>
                  <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Mecanismo</p><p className="text-3xl font-black italic text-white">Halving</p></div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-3 border-b border-l border-white/10 p-4 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-red-600/5 to-transparent pointer-events-none"></div>
                {[100, 50, 25, 12, 6, 3].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div style={{ height: `${h}%`, animation: `barGrow 1.5s ease-out ${i * 0.2}s both` }} className="bg-red-600/30 border-t-2 border-red-500 group-hover:bg-red-600 transition-all origin-bottom" />
                    <span className="text-[8px] text-center mt-2 text-slate-600 font-black">Bloco {i+1}</span>
                  </div>
                ))}
              </div>
            </div>
            <style>{`@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>
          </section>

          {/* === 04. SOBERANIA DAS CHAVES === */}
          <section id="chaves" className="mb-32 scroll-mt-24">
            <div className="flex items-center gap-4 text-red-600 mb-12">
              <Key size={24} />
              <h2 className="text-2xl font-black uppercase tracking-[0.2em]">04. Soberania das Chaves</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  O Bitcoin usa criptografia de chave pública para provar ownership. Você tem um par de chaves: a <strong className="text-white">Pública</strong> (seu endereço para receber) e a <strong className="text-white">Privada</strong> (seu segredo para gastar).
                </p>
                <p>
                  A chave privada gera a assinatura digital necessária para autorizar transações. Se alguém tiver sua chave privada, tem seus bitcoins. Se você perder sua chave privada e não tiver o backup (seed), seus fundos estão perdidos para sempre.
                </p>
              </div>
              <div className="border-2 border-red-600/20 bg-red-950/10 p-10 rounded-sm space-y-6">
                <p className="text-red-600 font-black uppercase tracking-widest text-xs italic">Aviso Operacional:</p>
                <p className="text-white font-black text-xl leading-tight uppercase italic">
                  "Bitcoin wallets não guardam bitcoins. Elas guardam as CHAVES que dão acesso às suas moedas gravadas na blockchain."
                </p>
              </div>
            </div>
          </section>

          {/* === 05. A PROVA DE TRABALHO === */}
          <section id="mineracao" className="mb-32 scroll-mt-24 space-y-12">
            <div className="flex items-center gap-4 text-red-600">
              <ShieldCheck size={24} />
              <h2 className="text-2xl font-black uppercase tracking-[0.2em]">05. A Prova de Trabalho</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed font-medium">
              <div className="space-y-6">
                <p>
                  A blockchain do Bitcoin nunca foi hackeada. O sistema é economicamente e tecnicamente imune à corrupção devido à sua natureza distribuída.
                </p>
                <p>
                  Para corromper a rede, seria necessário um <strong className="text-white">Ataque de 51%</strong>: controlar mais poder computacional do que todos os outros mineradores juntos. O custo é proibitivo e economicamente suicida.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  O verdadeiro risco não está no código, mas no usuário. A maioria dos "hacks" são erros humanos: perda de chaves ou ataques de engenharia social.
                </p>
                <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl flex items-start gap-4">
                  <AlertTriangle className="text-red-600 shrink-0" size={24} />
                  <p className="text-sm font-bold uppercase tracking-tight text-white leading-relaxed">
                    "Nenhum sistema digital é 100% perfeito, mas o Bitcoin é o sistema monetário mais seguro já inventado pela humanidade."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === A MURALHA TÉCNICA === */}
          <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Esquerda: Fundamentos e Defesa */}
              <div>
                <h3 className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mb-8 border-b border-white/5 pb-4">Fundamentos e Defesa</h3>
                <div className="space-y-4">
                  <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl flex gap-6 items-start group hover:border-orange-500/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 icon-glow">
                      <Database className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-black uppercase text-sm mb-2 tracking-wider">Armazenamento</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">Deixe de ser um cliente e torne-se um soberano. Chaves privadas são a sua arma.</p>
                    </div>
                  </div>
                  <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl flex gap-6 items-start group hover:border-orange-500/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 icon-glow">
                      <Scale className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-black uppercase text-sm mb-2 tracking-wider">Impostos</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">Conheça o pedágio do sistema, mas proteja sua privacidade técnica.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Direita: Infraestrutura e Ataque */}
              <div>
                <h3 className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mb-8 border-b border-white/5 pb-4">Infraestrutura e Ataque</h3>
                <div className="space-y-4">
                  <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl flex gap-6 items-start group hover:border-green-500/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 icon-glow">
                      <Pickaxe className="text-green-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-green-400 font-black uppercase text-sm mb-2 tracking-wider">Mineração</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">A segurança do Bitcoin é lastreada em energia e nas leis da física, não em promessas de políticos.</p>
                    </div>
                  </div>
                  <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl flex gap-6 items-start group hover:border-green-500/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 icon-glow">
                      <HelpCircle className="text-green-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-green-400 font-black uppercase text-sm mb-2 tracking-wider">Mitos</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">O Bitcoin não é anônimo, é pseudônimo. Ele não é inseguro, ele é o banco de dados mais resiliente da história humana.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === 06. NEUTRALIZAÇÃO DE MITOS === */}
          <section id="mitos" className="mb-32 scroll-mt-24">
            <h3 className="text-xl font-black uppercase mb-12 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4 italic">Neutralizando o Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { m: "Bitcoin é anônimo", v: "Errado. Ele é pseudônimo e o sistema financeiro mais transparente e auditável do mundo." },
                { m: "Não tem valor intrínseco", v: "Seu valor vem da utilidade como banco de dados imutável e sua escassez matematicamente provada." },
                { m: "Bitcoin é difícil de usar", v: "É o único dinheiro onde você é 100% dono. A soberania exige apenas um passo inicial." },
                { m: "Vai ser banido", v: "Impossível banir um código que vive em satélites, rádios e na mente de milhões." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-[#0B0F19] border border-white/5 group hover:border-red-600 transition-all rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">Mito {i+1}</span>
                    <AlertTriangle size={14} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                  </div>
                  <p className="text-xl font-black uppercase line-through text-slate-700 group-hover:text-red-900 transition-colors mb-4">{item.m}</p>
                  <p className="text-white font-bold leading-tight opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 italic">→ {item.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* === BLINDAGEM CONTRA GOLPES — Terminal Style === */}
          <section id="blindagem" className="mb-40 scroll-mt-24 border-2 border-red-600 bg-[#0a0a0a] p-10 md:p-14 relative overflow-hidden rounded-sm border-pulse">
            <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-16 -mt-16" size={320} />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2 flex items-center gap-4">
                <AlertTriangle className="text-red-600 animate-pulse" size={28} />
                <span className="text-slate-400">Blindagem contra Golpes:</span>
                <span className="text-red-600 italic">O Código do Soberano</span>
              </h3>
              <div className="mt-8 font-mono text-base md:text-lg leading-relaxed space-y-4">
                <p className="text-red-500 font-bold">
                  Ninguém legítimo pedirá sua Seed Phrase.
                </p>
                <p className="text-red-400">
                  Se prometerem lucro, é golpe. Se pedirem urgência, é roubo.
                </p>
                <p className="text-white font-black text-xl md:text-2xl italic mt-6">
                  No Bitcoin, você é o responsável final.
                </p>
              </div>
            </div>
          </section>

          {/* === CARD: POR QUE ESTE MATERIAL EXISTE === */}
          <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center text-white">
                <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Por que este material existe</h3>
                <div className="space-y-4 mb-10">
                  <p className="text-2xl font-black text-white leading-none uppercase">A queda não é do mercado. <span className="text-red-600 italic">É da consciência.</span></p>
                  <p className="text-slate-400 font-medium">
                    A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele. Bitcoin não surge como solução mágica. Surge como explicação tardia.
                  </p>
                </div>
                <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 animate-[pulse_2s_infinite] shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <Download size={18} /> Baixar PDF Gratuito
                </button>
              </div>
              <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
                <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                  <ShieldCheck className="text-white/20" size={40} />
                  <div>
                    <h4 className="text-3xl font-black leading-none uppercase tracking-tighter italic mb-2 text-white">Protocolos de Soberania</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-white">Lord Junnior</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRÓXIMO NÍVEL */}
          <div className="border-2 border-white p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-40">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-sm text-white mb-2">Próximo Nível</h3>
              <p className="text-slate-400 font-bold uppercase text-sm">Depois de ler, você não será mais leigo. Estará pronto para a prática.</p>
            </div>
            <Link to="/arsenal" className="bg-white text-black px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
              Ir para o Arsenal Técnico <ArrowRight size={18} />
            </Link>
          </div>

          {/* FOOTER */}
          <footer className="pt-20 border-t border-white/5">
            <div className="text-center space-y-12">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px]">Not your keys, not your money.</p>
              <div className="space-y-4">
                <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white italic">Sempre foi projeto.</p>
                <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter italic">Autocustódia exige responsabilidade.</p>
              </div>
              <div className="pt-20 pb-10">
                <p className="text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
