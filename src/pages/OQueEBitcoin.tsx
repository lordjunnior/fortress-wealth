import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Coins, Lock, Globe, Zap, ShieldCheck, ShieldAlert, Pickaxe, Hash, Users, Clock, Layers } from 'lucide-react';

const SECTIONS = [
  { id: 'definicao', label: 'Definição' },
  { id: 'problema', label: 'O Problema' },
  { id: 'propriedades', label: 'Propriedades' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'satoshi', label: 'Satoshi Nakamoto' },
  { id: 'por-que-valor', label: 'Por que Tem Valor' },
  { id: 'diferencial', label: 'O Diferencial' },
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
      {/* Particles */}
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
          <div className="px-5 pt-3 pb-1">
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
                Não é moeda digital para especular. É a descoberta da escassez absoluta no universo digital. O primeiro dinheiro sem dono, sem fronteira e sem impressora.
              </p>
            </div>
          </header>

          {/* === DEFINIÇÃO === */}
          <section id="definicao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <BookOpen size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Definição</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Bitcoin é um <strong className="text-white">protocolo de dinheiro digital descentralizado</strong>, criado em 2008 e lançado em 2009. Opera sem bancos centrais, sem governos e sem intermediários.
              </p>
              <p>
                É software de código aberto que permite a qualquer pessoa no planeta <strong className="text-white">enviar e receber valor pela internet</strong>, sem pedir permissão a ninguém, 24 horas por dia, 365 dias por ano.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <Hash className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Digital</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Existe apenas em formato digital. Não há moedas físicas reais de Bitcoin.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <Globe className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Descentralizado</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Nenhuma entidade controla a rede. Milhares de nós independentes validam transações.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                  <Lock className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={20} />
                  <h4 className="text-white font-black uppercase text-xs mb-2 tracking-tighter italic">Escasso</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Apenas 21 milhões existirão. Nunca. Jamais. A matemática garante.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === O PROBLEMA === */}
          <section id="problema" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Problema que o Bitcoin Resolve</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-950/20 border border-red-600/15 rounded-sm p-10 space-y-5">
                <h3 className="text-red-500 font-black uppercase text-sm tracking-wider font-mono italic">Dinheiro Fiduciário</h3>
                <ul className="space-y-4 text-slate-400 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-red-600 font-black">✗</span> Governos imprimem sem limite, roubando seu poder de compra.</li>
                  <li className="flex gap-3"><span className="text-red-600 font-black">✗</span> Bancos podem congelar sua conta a qualquer momento.</li>
                  <li className="flex gap-3"><span className="text-red-600 font-black">✗</span> Transferências internacionais levam dias e custam fortunas.</li>
                  <li className="flex gap-3"><span className="text-red-600 font-black">✗</span> O Real perdeu 86% do poder de compra desde 1994.</li>
                </ul>
              </div>
              <div className="bg-green-950/15 border border-green-600/15 rounded-sm p-10 space-y-5">
                <h3 className="text-green-400 font-black uppercase text-sm tracking-wider font-mono italic">Bitcoin</h3>
                <ul className="space-y-4 text-slate-400 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-green-500 font-black">✓</span> Supply fixo de 21 milhões. Ninguém pode criar mais.</li>
                  <li className="flex gap-3"><span className="text-green-500 font-black">✓</span> Inconfiscável com autocustódia. Você é o dono.</li>
                  <li className="flex gap-3"><span className="text-green-500 font-black">✓</span> Transferências globais em minutos, 24/7.</li>
                  <li className="flex gap-3"><span className="text-green-500 font-black">✓</span> Valorização média anual de ~50% desde 2009.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* === PROPRIEDADES === */}
          <section id="propriedades" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Layers size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">As 6 Propriedades do Bitcoin</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <Lock size={18} />, title: 'Escasso', desc: '21 milhões. Hard cap imutável protegido por consenso de dezenas de milhares de nós.', color: '#f97316' },
                { icon: <Globe size={18} />, title: 'Descentralizado', desc: 'Sem ponto único de falha. Roda em satélites, rádios e milhares de computadores pelo mundo.', color: '#22c55e' },
                { icon: <ShieldCheck size={18} />, title: 'Imutável', desc: 'Uma vez confirmada, a transação é permanente. Nenhum governo pode reverter.', color: '#06b6d4' },
                { icon: <Zap size={18} />, title: 'Sem Permissão', desc: 'Não precisa de banco, de identidade nem de autorização. Basta um celular.', color: '#eab308' },
                { icon: <Users size={18} />, title: 'Transparente', desc: 'Todas as transações são públicas e verificáveis. A blockchain é o livro-razão aberto.', color: '#8b5cf6' },
                { icon: <Clock size={18} />, title: 'Programável', desc: 'Regras escritas em código. Halvings automáticos. Sem decisões políticas.', color: '#f43f5e' },
              ].map((prop, i) => (
                <div key={i} className="p-8 bg-[#0B0F19]/60 border border-white/5 rounded-sm group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${prop.color}, transparent)` }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: `${prop.color}10`, border: `1px solid ${prop.color}30`, color: prop.color }}>
                    {prop.icon}
                  </div>
                  <h4 className="text-white font-black uppercase text-sm mb-3 tracking-tighter italic">{prop.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{prop.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* === COMO FUNCIONA === */}
          <section id="como-funciona" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Pickaxe size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Como Funciona (Simplificado)</h2>
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Rede Peer-to-Peer', desc: 'Bitcoin opera numa rede de computadores (nós) conectados diretamente entre si. Não existe servidor central. Cada nó possui uma cópia completa de todas as transações já realizadas.' },
                { step: '02', title: 'Blockchain', desc: 'Todas as transações são agrupadas em "blocos" e encadeadas cronologicamente. Cada bloco referencia o anterior via hash criptográfico, formando uma corrente imutável — a blockchain.' },
                { step: '03', title: 'Mineração (Proof of Work)', desc: 'Mineradores competem para resolver um quebra-cabeça matemático. O vencedor adiciona o próximo bloco e recebe bitcoin como recompensa. Isso consome energia real, lastreando a segurança em termodinâmica.' },
                { step: '04', title: 'Chaves Criptográficas', desc: 'Cada usuário possui um par de chaves: a pública (endereço para receber) e a privada (assinatura para enviar). Quem controla a chave privada, controla o Bitcoin.' },
                { step: '05', title: 'Consenso Distribuído', desc: 'A rede valida transações por consenso. Se alguém tentar fraudar, os outros nós rejeitam. Não há árbitro central — a verdade é matemática.' },
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

          {/* === SATOSHI NAKAMOTO === */}
          <section id="satoshi" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Users size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Satoshi Nakamoto</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 leading-relaxed relative overflow-hidden">
              <div className="absolute top-6 right-6 text-white/[0.03] font-black text-[120px] leading-none select-none pointer-events-none">?</div>
              <p>
                <strong className="text-white">Satoshi Nakamoto</strong> é o pseudônimo do criador (ou criadores) do Bitcoin. Em 31 de outubro de 2008, publicou o <strong className="text-white">whitepaper</strong> "Bitcoin: A Peer-to-Peer Electronic Cash System" numa lista de e-mails de criptografia.
              </p>
              <p>
                Em 3 de janeiro de 2009, minerou o <strong className="text-white">bloco gênesis</strong> — o primeiro bloco da blockchain do Bitcoin. A mensagem embutida nele dizia: <em className="text-orange-400">"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."</em>
              </p>
              <p>
                Satoshi participou ativamente do desenvolvimento até 2011, quando desapareceu. Seus bitcoins (~1.1 milhão de BTC) <strong className="text-white">nunca foram movidos</strong>. Sua identidade permanece desconhecida — e isso é uma <em>feature</em>, não um bug.
              </p>
              <div className="flex gap-8 mt-6 pt-6 border-t border-white/5">
                <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Whitepaper</p><p className="text-xl font-black italic">2008</p></div>
                <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Bloco Gênesis</p><p className="text-xl font-black italic">2009</p></div>
                <div><p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Desapareceu</p><p className="text-xl font-black italic">2011</p></div>
              </div>
            </div>
          </section>

          {/* === POR QUE TEM VALOR === */}
          <section id="por-que-valor" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Coins size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Por que o Bitcoin Tem Valor?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 leading-relaxed">
              <p>Bitcoin não tem valor porque alguém decidiu. Tem valor porque possui as <strong className="text-white">propriedades superiores do dinheiro</strong>:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { label: 'Escassez', value: '21M', sub: 'Hard cap' },
                  { label: 'Divisibilidade', value: '10⁸', sub: 'Satoshis' },
                  { label: 'Portabilidade', value: '∞', sub: 'Global' },
                  { label: 'Durabilidade', value: '16+', sub: 'Anos sem downtime' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 border border-white/5 rounded-sm bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all group">
                    <p className="text-3xl font-black italic text-white group-hover:text-orange-400 transition-colors">{stat.value}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-orange-500 font-mono mt-1">{stat.label}</p>
                    <p className="text-[9px] text-slate-600 mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">
                O ouro é valioso porque é escasso e durável. Bitcoin é <strong className="text-white">mais escasso, mais durável, mais divisível, mais portável e mais verificável</strong> que o ouro. É a evolução monetária.
              </p>
            </div>
          </section>

          {/* === O DIFERENCIAL === */}
          <section id="diferencial" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Diferencial Absoluto</h2>
            </div>
            <div className="border-2 border-orange-600/20 bg-orange-950/10 rounded-sm p-10 md:p-14 relative overflow-hidden">
              <ShieldCheck className="absolute top-0 right-0 text-orange-600/5 -mr-14 -mt-14" size={280} />
              <div className="relative z-10 space-y-6">
                <p className="text-white font-black text-xl md:text-2xl leading-tight uppercase italic">
                  "Bitcoin é o primeiro bem no universo com escassez matemática absoluta."
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Ouro pode ser minerado em asteroides. Imóveis podem ser construídos. Ações podem ser emitidas. <strong className="text-white">Bitcoin não pode ser criado além de 21 milhões</strong>. Essa é a revolução.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Não é uma empresa. Não é um investimento. É <strong className="text-white">propriedade digital soberana</strong>. É o primeiro dinheiro na história que nenhum rei, presidente ou banco central pode inflacionar, confiscar ou censurar.
                </p>
                <div className="pt-6 border-t border-orange-600/15">
                  <p className="text-orange-500 font-black uppercase tracking-widest text-[9px] font-mono">Not your keys, not your coins.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Próximo Nível */}
          <div className="border-2 border-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-sm group hover:border-orange-500/50 transition-all">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-white mb-1 font-mono">Continue Aprendendo</h3>
              <p className="text-slate-400 font-bold uppercase text-xs">Volte ao Protocolo e avance nos módulos.</p>
            </div>
            <Link to="/protocolo-inicial" className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 hover:text-black transition-all flex items-center gap-3 rounded-sm">
              Protocolo Inicial <ArrowRight size={16} />
            </Link>
          </div>

          {/* Footer */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">A ignorância monetária é o imposto mais caro que você paga.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
