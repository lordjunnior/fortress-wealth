import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, ShieldAlert, ShieldCheck, Lock, Key, AlertTriangle, Smartphone, Monitor, Server, Eye, EyeOff, UserX, Bug, Fingerprint, HardDrive, Cpu } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'bloco-01', label: '01: A Verdade sobre Segurança' },
  { id: 'bloco-02', label: '02: A Rede é Inquebrável' },
  { id: 'bloco-03', label: '03: O Elo Fraco É Você' },
  { id: 'bloco-04', label: '04: Vetores de Ataque' },
  { id: 'bloco-05', label: '05: Corretoras e Custódia' },
  { id: 'bloco-06', label: '06: Código de Conduta' },
];

export default function BitcoinSeguro() {
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-green-600 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="bs-dust"></div><div className="bs-dust bs-dust-2"></div>
      </div>

      <style>{`
        @keyframes bsDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .bs-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(34,197,94,0.2) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(22,163,74,0.12) 100%,transparent);background-size:200px 200px;animation:bsDrift 60s linear infinite }
        .bs-dust-2 { background-size:280px 280px;animation:bsDrift 90s linear infinite reverse;opacity:0.4 }
        .bs-shimmer { background:linear-gradient(90deg,#16a34a 0%,#4ade80 40%,#fff 50%,#4ade80 60%,#16a34a 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:bsShim 3s linear infinite }
        @keyframes bsShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes greenGlow { 0%,100%{box-shadow:0 0 0 rgba(34,197,94,0)} 50%{box-shadow:0 0 12px rgba(34,197,94,0.15)} }
        .nav-active { background:rgba(34,197,94,0.08);border-left:2px solid rgba(34,197,94,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(34,197,94,0.05);animation:greenGlow 3s ease-in-out infinite }
        @keyframes redPulse { 0%,100%{border-color:rgba(220,38,38,0.2);box-shadow:0 0 15px rgba(220,38,38,0.03)} 50%{border-color:rgba(220,38,38,0.6);box-shadow:0 0 25px rgba(220,38,38,0.08)} }
        .red-pulse { animation:redPulse 3s ease-in-out infinite }
        .threat-card { transition:all 0.3s ease }
        .threat-card:hover { transform:translateY(-4px);box-shadow:0 0 30px rgba(220,38,38,0.1) }
      `}</style>

      {/* === BÚSSOLA LATERAL (Desktop) === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-green-500" size={16} />
              <span className="text-green-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Segurança</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Progresso</span>
              <span className="text-[7px] font-black text-green-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #15803d, #4ade80)' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id ? 'nav-active' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'
                }`}
              >{item.label}</button>
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
            <Shield className="text-green-500" size={12} />
            <span className="text-green-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Segurança</span>
          </div>
          <span className="text-[8px] font-black text-green-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #15803d, #4ade80)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[260px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* HEADER */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(5,30,15,0.5) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(34,197,94,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(22,163,74,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-green-500/[0.05] font-black text-[140px] md:text-[220px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>
              <Shield size={220} strokeWidth={0.5} />
            </div>
            <div className="relative z-10">
              <span className="text-green-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Análise de Segurança Operacional</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                O Bitcoin<br />
                <span className="bs-shimmer italic">É Seguro?</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                O banco de dados do Bitcoin, a blockchain, é praticamente imune a ataques ou corrupção. No entanto, indivíduos ainda podem perder seus bitcoins de diversas maneiras. A segurança depende de você.
              </p>
            </div>
          </header>

          {/* === BLOCO 01: A VERDADE === */}
          <section id="bloco-01" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-green-500 mb-10">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: A Verdade sobre Segurança</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                A rede Bitcoin é robusta contra falhas e ataques. A blockchain em si é <strong className="text-white">econômica e tecnicamente impermeável à corrupção</strong>.
              </p>
              <p>
                Bilhões de dólares foram investidos em bitcoin. Se não fosse seguro, esse dinheiro teria sido roubado e o Bitcoin nunca teria se tornado um ativo de <strong className="text-green-400">trilhões de dólares</strong>.
              </p>
              <p>
                A questão da segurança na blockchain do Bitcoin tem menos a ver com sua implementação técnica e muito mais a ver com <strong className="text-red-400">práticas inseguras dos usuários</strong> e concepções incorretas sobre o que o Bitcoin realmente é.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-green-950/20 border border-green-900/30 rounded-sm p-6 text-center">
                  <p className="text-[8px] text-green-600 uppercase font-black tracking-widest font-mono mb-2">Blockchain</p>
                  <p className="text-white font-black text-lg italic">Nunca Hackeada</p>
                </div>
                <div className="bg-green-950/20 border border-green-900/30 rounded-sm p-6 text-center">
                  <p className="text-[8px] text-green-600 uppercase font-black tracking-widest font-mono mb-2">Uptime</p>
                  <p className="text-white font-black text-lg italic">99.98%</p>
                </div>
                <div className="bg-green-950/20 border border-green-900/30 rounded-sm p-6 text-center">
                  <p className="text-[8px] text-green-600 uppercase font-black tracking-widest font-mono mb-2">Custo de Ataque 51%</p>
                  <p className="text-white font-black text-lg italic">Bilhões USD</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 02: A REDE É INQUEBRÁVEL === */}
          <section id="bloco-02" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-green-500 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: A Rede É Inquebrável</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                O Bitcoin é simultaneamente um <strong className="text-white">banco de dados blockchain</strong> e uma <strong className="text-white">rede de computadores</strong> que se comunicam para construir e atualizar esse banco de dados. Com isso em mente: <strong className="text-green-400">a blockchain nunca foi hackeada</strong>.
              </p>
              <p>
                Economica e logisticamente, hackear a blockchain do Bitcoin é <strong className="text-white">praticamente impossível</strong>. Fazê-lo custaria bilhões de dólares e exigiria níveis sem precedentes de preparação e coordenação.
              </p>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-sm mt-6">
                <h4 className="text-green-400 font-black uppercase mb-4 italic text-xs tracking-widest font-mono">Por que é Imune:</h4>
                <ul className="space-y-3 text-sm font-bold">
                  <li className="flex gap-3 items-start"><Cpu className="text-green-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-slate-300">Dezenas de milhares de nós independentes verificam cada transação.</span></li>
                  <li className="flex gap-3 items-start"><HardDrive className="text-green-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-slate-300">O custo energético de um ataque de 51% é proibitivo para qualquer entidade.</span></li>
                  <li className="flex gap-3 items-start"><Fingerprint className="text-green-500 mt-0.5 flex-shrink-0" size={16} /><span className="text-slate-300">Criptografia de nível militar protege cada bloco da cadeia.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* === BLOCO 03: O ELO FRACO É VOCÊ === */}
          <section id="bloco-03" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: O Elo Fraco É Você</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-red-900/20 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed red-pulse">
              <p>
                A forma mais comum de perder bitcoins <strong className="text-red-400">não é através de um hack</strong>, mas sim por <strong className="text-white">erro humano</strong>.
              </p>
              <p>
                Quando você usa uma carteira Bitcoin, seus bitcoins não são armazenados diretamente nela. Ao invés disso, sua carteira guarda as <strong className="text-white">chaves privadas</strong> que controlam seus bitcoins. Qualquer pessoa que acesse suas chaves privadas pode gastar seus bitcoins. Ao mesmo tempo, se você perder o acesso às suas chaves, será incapaz de movimentar seus fundos.
              </p>
              <p>
                Graças a padrões da indústria como as <strong className="text-white">Seed Phrases</strong> (frases de recuperação mnemônicas), usuários de Bitcoin podem rastrear um número virtualmente ilimitado de chaves com um único conjunto de <strong className="text-amber-400">12 a 24 palavras</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-red-950/20 border border-red-900/30 rounded-sm p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <EyeOff className="text-red-500" size={16} />
                    <h4 className="text-red-400 font-black uppercase text-[10px] tracking-widest font-mono">Perda de Chaves</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Se você perder suas chaves privadas e sua seed phrase, seus bitcoins estarão perdidos para sempre. Não existe "esqueci minha senha" no Bitcoin.</p>
                </div>
                <div className="bg-red-950/20 border border-red-900/30 rounded-sm p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <UserX className="text-red-500" size={16} />
                    <h4 className="text-red-400 font-black uppercase text-[10px] tracking-widest font-mono">Irreversibilidade</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Transações Bitcoin são finais. Se você enviar para um endereço errado ou para um golpista, não existe botão de estorno. A soberania vem com responsabilidade total.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 04: VETORES DE ATAQUE === */}
          <section id="bloco-04" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10">
              <Bug size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Vetores de Ataque ao Indivíduo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="threat-card bg-[#0B0F19]/60 border border-red-900/20 rounded-sm p-8 space-y-4">
                <div className="w-12 h-12 rounded-sm bg-red-950/40 border border-red-900/30 flex items-center justify-center">
                  <Eye className="text-red-500" size={20} />
                </div>
                <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Engenharia Social</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Ataques de engenharia social focam em convencer a vítima a divulgar informações voluntariamente. Atacantes podem ligar, enviar e-mails ou mensagens fingindo ser funcionários da sua carteira ou corretora.</p>
                <div className="bg-red-950/30 border border-red-900/30 rounded-sm p-3">
                  <p className="text-[10px] text-red-400 font-black uppercase font-mono">Nenhum serviço legítimo pedirá sua senha ou seed phrase.</p>
                </div>
              </div>

              <div className="threat-card bg-[#0B0F19]/60 border border-red-900/20 rounded-sm p-8 space-y-4">
                <div className="w-12 h-12 rounded-sm bg-red-950/40 border border-red-900/30 flex items-center justify-center">
                  <Monitor className="text-red-500" size={20} />
                </div>
                <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Malware e Hacking</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Qualquer dispositivo conectado à internet pode ser hackeado. Se um computador com uma carteira Bitcoin for comprometido, o usuário pode perder seus fundos. Pirataria, sites inseguros e downloads desconhecidos são portas de entrada.</p>
                <div className="bg-green-950/30 border border-green-900/30 rounded-sm p-3">
                  <p className="text-[10px] text-green-400 font-black uppercase font-mono">Solução: Cold Storage (armazenamento offline).</p>
                </div>
              </div>

              <div className="threat-card bg-[#0B0F19]/60 border border-red-900/20 rounded-sm p-8 space-y-4">
                <div className="w-12 h-12 rounded-sm bg-red-950/40 border border-red-900/30 flex items-center justify-center">
                  <Smartphone className="text-red-500" size={20} />
                </div>
                <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Phishing e Farsas</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Sites e e-mails falsos que imitam sua carteira ou corretora para roubar credenciais. Links maliciosos são o vetor de ataque mais comum e mais eficaz contra usuários desatentos.</p>
                <div className="bg-green-950/30 border border-green-900/30 rounded-sm p-3">
                  <p className="text-[10px] text-green-400 font-black uppercase font-mono">Solução: Salve sites nos favoritos. Nunca clique em links de e-mail.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 05: CORRETORAS === */}
          <section id="bloco-05" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-green-500 mb-10">
              <Server size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Corretoras e Risco de Custódia</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">O Risco das Exchanges</h3>
                <p>Corretoras são obrigadas a manter parte dos bitcoins em <strong className="text-red-400">hot wallets</strong> (conectadas à internet) para processar saques. Isso as torna alvos permanentes de hackers.</p>
                <p>Carteiras de exchanges já foram <strong className="text-white">hackeadas em diversas ocasiões</strong>, expondo usuários a perdas enormes. A maioria mantém a grande maioria dos fundos em cold storage, mas o risco nunca é zero.</p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Risco Regulatório</h3>
                <p>Governos podem <strong className="text-red-400">fechar exchanges</strong> por diversos motivos, incluindo tentativas de banir o Bitcoin. Diversas exchanges já foram forçadas a congelar ou entregar fundos de usuários a governos locais.</p>
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-sm p-6 mt-4">
                  <h4 className="text-amber-400 font-black uppercase text-[10px] tracking-widest font-mono mb-2">A Regra de Ouro</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Quando <strong className="text-white">você</strong> controla suas próprias chaves, o risco de ter fundos congelados ou perdidos é eliminado. Autocustódia é soberania.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 06: CÓDIGO DE CONDUTA === */}
          <section id="bloco-06" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-green-500 mb-10">
              <Key size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Código de Conduta — Segurança Operacional</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-white font-black uppercase text-xs tracking-widest font-mono italic">Protocolo de Segurança Pessoal</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Ação</th>
                      <th className="text-left p-4 text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Regra de Ouro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { action: 'Seed Phrase', rule: 'NUNCA forneça a ninguém. Nem para "suporte técnico". Guarde offline em local seguro.' },
                      { action: 'Links & Sites', rule: 'Salve seus sites de confiança nos favoritos. Nunca clique em links de e-mails ou mensagens.' },
                      { action: 'Autenticação', rule: 'Use 2FA via App (Google Authenticator ou similar). NUNCA use 2FA via SMS.' },
                      { action: 'Verificação', rule: 'Verifique o endereço de destino caractere por caractere antes de confirmar qualquer transação.' },
                      { action: 'Cold Storage', rule: 'Armazene a maioria dos seus fundos offline. Separe atividades de navegação das de Bitcoin.' },
                      { action: 'Carteira', rule: 'Escolha carteiras de código aberto e de fontes confiáveis. Hardware wallets são o padrão ouro.' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono text-sm font-black text-green-400 uppercase tracking-tight">{row.action}</td>
                        <td className="p-4 text-sm text-slate-400 leading-relaxed">{row.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CONCLUSÃO TÁTICA */}
          <section className="mb-20">
            <div className="bg-green-500/5 border border-green-500/20 rounded-sm p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <ShieldCheck className="text-green-500 mx-auto mb-6" size={40} />
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight italic">
                  Conclusão:<br />Não Confie, <span className="bs-shimmer">Verifique</span>
                </h2>
                <div className="max-w-2xl mx-auto mt-8 space-y-4 text-slate-400 text-sm leading-relaxed text-left">
                  <p className="flex gap-3 items-start">
                    <ShieldCheck className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">A rede é segura.</strong> A blockchain nunca foi hackeada e hackear exigiria bilhões de dólares em recursos.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">O risco é humano.</strong> Hackers visam pessoas, não o protocolo. Engenharia social é o vetor principal.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <Key className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Autocustódia é proteção.</strong> Quando as chaves são suas, nenhum governo, empresa ou hacker pode congelar ou confiscar seus fundos.</span>
                  </p>
                </div>
                <p className="text-slate-600 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">Not your keys, not your coins.</p>
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
