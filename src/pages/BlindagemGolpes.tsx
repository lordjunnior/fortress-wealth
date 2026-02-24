import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, AlertTriangle, Lock, Eye, Smartphone, Link2, UserX, Bot, TrendingUp, CheckCircle, KeyRound } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'impacto', label: 'O Elo Fraco É Você' },
  { id: 'vetores', label: 'Vetores de Ataque' },
  { id: 'codigo', label: 'Código de Conduta' },
  { id: 'conclusao', label: 'Não Confie, Verifique' },
];

export default function BlindagemGolpes() {
  const [activeSection, setActiveSection] = useState('impacto');
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
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="bg-dust"></div><div className="bg-dust bg-dust-2"></div>
      </div>

      <style>{`
        @keyframes dustDrift { 0%{transform:translateY(0)} 100%{transform:translateY(-1000px)} }
        .bg-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(220,38,38,0.3) 100%,transparent);background-size:200px 200px;animation:dustDrift 55s linear infinite }
        .bg-dust-2 { background-size:300px 300px;animation:dustDrift 80s linear infinite reverse;opacity:0.5 }
        .title-shimmer { background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fff 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShim 3s linear infinite }
        @keyframes tShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes alertBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .alert-blink { animation:alertBlink 2s ease-in-out infinite }
        @keyframes borderPulse { 0%,100%{border-color:rgba(220,38,38,0.15);box-shadow:0 0 10px rgba(220,38,38,0.02)} 50%{border-color:rgba(220,38,38,0.6);box-shadow:0 0 25px rgba(220,38,38,0.08)} }
        .card-threat { border:1px solid rgba(220,38,38,0.15);background:rgba(11,15,25,0.7);transition:all 0.4s ease }
        .card-threat:hover { border-color:rgba(220,38,38,0.5);box-shadow:0 0 20px rgba(220,38,38,0.08);transform:translateY(-3px) }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes redGlow { 0%,100%{box-shadow:0 0 0 rgba(220,38,38,0)} 50%{box-shadow:0 0 12px rgba(220,38,38,0.15)} }
        .nav-active { background:rgba(220,38,38,0.08);border-left:2px solid rgba(220,38,38,0.8);color:#f5f5f5;animation:redGlow 3s ease-in-out infinite }
      `}</style>

      {/* === SIDEBAR === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="text-red-500" size={16} />
              <span className="text-red-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Blindagem</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span>
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
            <ShieldAlert className="text-red-500" size={12} />
            <span className="text-red-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Blindagem</span>
          </div>
          <span className="text-[8px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* === BLOCO DE IMPACTO: O ELO FRACO É VOCÊ === */}
          <header id="impacto" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            {/* Static noise BG */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
            <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.03] -mr-12 -mt-12" size={300} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="text-red-600 alert-blink" size={16} />
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] font-mono alert-blink">Alerta Tático</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                O Elo Fraco<br />
                <span className="title-shimmer italic">É Você</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div className="space-y-5 text-slate-400 leading-relaxed">
                  <p className="font-medium">
                    <strong className="text-white">A Verdade Desconfortável:</strong> O Bitcoin não é roubado por hackers geniais invadindo a blockchain; ele é roubado <strong className="text-red-500">enganando pessoas</strong>. A maioria dos ataques explora a psicologia, a ganância ou o medo, não falhas no código.
                  </p>
                </div>
                <div className="border-2 border-red-600/20 bg-red-950/10 rounded-sm p-8">
                  <p className="text-red-600 font-black uppercase tracking-widest text-[9px] italic font-mono mb-3">Irreversibilidade</p>
                  <p className="text-white font-black text-base leading-tight uppercase italic">
                    Diferente de um cartão de crédito, uma transação de Bitcoin é final. Se você enviar para um golpista, o dinheiro saiu da sua soberania para sempre. Não existe botão de "estorno".
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* === BLOCO DE EXECUÇÃO: OS VETORES DE ATAQUE === */}
          <section id="vetores" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Eye size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Os Vetores de Ataque</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Phishing */}
              <div className="card-threat rounded-sm p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                    <Link2 className="text-red-500" size={18} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Phishing e Farsas</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">
                  E-mails e sites falsos que fingem ser sua carteira ou corretora para roubar sua senha ou Seed Phrase.
                </p>
                <div className="bg-red-950/20 border border-red-600/20 rounded-sm p-4">
                  <p className="text-red-500 text-[10px] font-black uppercase font-mono leading-relaxed">
                    Ninguém legítimo jamais pedirá suas 12/24 palavras.
                  </p>
                </div>
              </div>

              {/* Deepfakes */}
              <div className="card-threat rounded-sm p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                    <Bot className="text-red-500" size={18} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Deepfakes e IA</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">
                  Vídeos falsos de figuras como Michael Saylor prometendo "dobrar seus bitcoins".
                </p>
                <div className="bg-red-950/20 border border-red-600/20 rounded-sm p-4">
                  <p className="text-red-500 text-[10px] font-black uppercase font-mono leading-relaxed">
                    Se parece bom demais para ser verdade, é um ataque.
                  </p>
                </div>
              </div>

              {/* Ponzi */}
              <div className="card-threat rounded-sm p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                    <TrendingUp className="text-red-500" size={18} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Esquemas Ponzi</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">
                  Promessas de "lucro garantido" ou rendimentos astronômicos.
                </p>
                <div className="bg-red-950/20 border border-red-600/20 rounded-sm p-4">
                  <p className="text-red-500 text-[10px] font-black uppercase font-mono leading-relaxed">
                    O lucro vem da valorização e da sua paciência, não de promessas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO DA SOBERANIA: CÓDIGO DE CONDUTA === */}
          <section id="codigo" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Código de Conduta</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] border-b border-white/10 bg-white/[0.02]">
                <div className="p-5 border-r border-white/10">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Ação</span>
                </div>
                <div className="p-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Regra de Ouro</span>
                </div>
              </div>
              {/* Rows */}
              {[
                { action: 'Sua Seed Phrase', rule: 'NUNCA forneça a ninguém. Nem para "suporte técnico".', icon: KeyRound },
                { action: 'Links', rule: 'Salve seus sites de confiança nos favoritos. Não clique em links de e-mails.', icon: Link2 },
                { action: 'Autenticação', rule: 'Use 2FA via App (Google Authenticator), nunca via SMS.', icon: Smartphone },
                { action: 'Verificação', rule: 'Verifique o endereço de destino caractere por caractere antes de confirmar.', icon: CheckCircle },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] group hover:bg-red-600/[0.03] transition-colors ${i < 3 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-5 border-r border-white/5 flex items-center gap-3">
                    <row.icon className="text-red-600 shrink-0" size={14} />
                    <span className="text-white font-black uppercase text-[10px] tracking-wider font-mono">{row.action}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-slate-400 text-xs font-mono font-medium leading-relaxed">{row.rule}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === CONCLUSÃO TÁTICA: NÃO CONFIE, VERIFIQUE === */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-red-600 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulse 3s ease-in-out infinite' }}>
            <style>{`@keyframes borderPulse2 { 0%,100%{border-color:rgba(220,38,38,0.3);box-shadow:0 0 15px rgba(220,38,38,0.03)} 50%{border-color:rgba(220,38,38,0.8);box-shadow:0 0 35px rgba(220,38,38,0.1)} }`}</style>
            <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.03] -mr-10 -mt-10" size={240} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 font-mono">
                Não Confie, <span className="text-red-600 italic">Verifique.</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock className="text-amber-500 shrink-0 mt-1" size={16} />
                    <div>
                      <h4 className="text-amber-400 font-black uppercase text-xs tracking-wider font-mono mb-1">Higiene Digital</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">Mantenha seu software atualizado e sua mente alerta.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <UserX className="text-amber-500 shrink-0 mt-1" size={16} />
                    <div>
                      <h4 className="text-amber-400 font-black uppercase text-xs tracking-wider font-mono mb-1">Silêncio Operacional</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">Não saia espalhando quanto Bitcoin você possui. Alvos silenciosos são alvos mais difíceis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Not your keys, not your money.</p>
              <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white italic">Sempre foi projeto.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-12 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
