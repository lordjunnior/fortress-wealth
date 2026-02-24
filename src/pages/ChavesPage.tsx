import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Key, Lock, Unlock, Send, ShieldCheck, Eye, EyeOff, Fingerprint, HardDrive, Smartphone, ArrowRight, AlertTriangle } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'bloco-01', label: '01: Chave Privada vs Pública' },
  { id: 'bloco-02', label: '02: Geração da Chave' },
  { id: 'bloco-03', label: '03: Anatomia de uma Transação' },
  { id: 'bloco-04', label: '04: Assinaturas Digitais' },
  { id: 'bloco-05', label: '05: Armazenamento de Chaves' },
  { id: 'bloco-06', label: '06: Cold vs Hot Wallet' },
];

export default function ChavesPage() {
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-orange-600 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="ck-dust"></div><div className="ck-dust ck-dust-2"></div>
      </div>

      <style>{`
        @keyframes ckDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .ck-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(249,115,22,0.2) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(234,88,12,0.12) 100%,transparent);background-size:200px 200px;animation:ckDrift 60s linear infinite }
        .ck-dust-2 { background-size:280px 280px;animation:ckDrift 90s linear infinite reverse;opacity:0.4 }
        .ck-shimmer { background:linear-gradient(90deg,#ea580c 0%,#fb923c 40%,#fff 50%,#fb923c 60%,#ea580c 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:ckShim 3s linear infinite }
        @keyframes ckShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes orangeGlow { 0%,100%{box-shadow:0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 12px rgba(249,115,22,0.15)} }
        .nav-active { background:rgba(249,115,22,0.08);border-left:2px solid rgba(249,115,22,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(249,115,22,0.05);animation:orangeGlow 3s ease-in-out infinite }
        .flow-arrow { color:rgba(249,115,22,0.4) }
      `}</style>

      {/* === SIDEBAR DESKTOP === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Key className="text-orange-500" size={16} />
              <span className="text-orange-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Chaves</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Progresso</span>
              <span className="text-[7px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #9a3412, #f97316)' }} />
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
            <Key className="text-orange-500" size={12} />
            <span className="text-orange-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Chaves</span>
          </div>
          <span className="text-[8px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #9a3412, #f97316)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[260px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* HEADER */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(40,15,0,0.5) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(249,115,22,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(234,88,12,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-[0.04] pointer-events-none select-none">
              <Key size={240} strokeWidth={0.5} />
            </div>
            <div className="relative z-10">
              <span className="text-orange-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Criptografia Fundamental</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                Chaves Públicas<br />
                <span className="text-slate-700 italic lowercase text-3xl md:text-4xl">&</span>{' '}
                <span className="ck-shimmer italic">Privadas</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Uma chave privada prova propriedade e assina transações para enviar bitcoins. Da chave privada se deriva a chave pública. Quem controla as chaves, controla o dinheiro.
              </p>
            </div>
          </header>

          {/* === BLOCO 01: CHAVE PRIVADA VS PÚBLICA === */}
          <section id="bloco-01" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Key size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: Chave Privada vs Chave Pública</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                O Bitcoin utiliza <strong className="text-white">criptografia de chave pública</strong> para criar um par de chaves — uma chave pública e uma chave privada correspondente — que controla a propriedade dos bitcoins.
              </p>
              <p>
                A <strong className="text-orange-400">chave pública</strong> é usada para receber bitcoin, enquanto a <strong className="text-red-400">chave privada</strong> permite assinar transações criando uma assinatura digital, gastando assim os bitcoins. Quando um usuário apresenta uma chave pública e uma assinatura, qualquer pessoa na rede Bitcoin pode verificar e aceitar a transação como válida.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-orange-950/20 border border-orange-900/30 rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Eye className="text-orange-500" size={18} />
                    </div>
                    <h4 className="text-orange-400 font-black uppercase text-xs tracking-widest font-mono">Chave Pública</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Usada para <strong className="text-white">receber</strong> bitcoin</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Pode ser compartilhada livremente</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Funciona como seu "endereço bancário"</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-orange-500 mt-1 flex-shrink-0" /> Derivada da chave privada</li>
                  </ul>
                </div>
                <div className="bg-red-950/20 border border-red-900/30 rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <EyeOff className="text-red-500" size={18} />
                    </div>
                    <h4 className="text-red-400 font-black uppercase text-xs tracking-widest font-mono">Chave Privada</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex gap-2"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Usada para <strong className="text-white">enviar</strong> bitcoin</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> NUNCA deve ser compartilhada</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Funciona como sua "senha mestra"</li>
                    <li className="flex gap-2"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Prova de propriedade absoluta</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 02: GERAÇÃO DA CHAVE === */}
          <section id="bloco-02" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Fingerprint size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: Como uma Chave Privada é Gerada?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Chaves privadas são normalmente geradas pela carteira Bitcoin do usuário. No entanto, o usuário quase nunca precisa ver ou interagir diretamente com suas chaves privadas, pois a carteira cuida de toda a <strong className="text-white">matemática complexa</strong> nos bastidores.
              </p>
              <p>
                As carteiras Bitcoin utilizam um padrão da indústria para derivar chaves privadas. Primeiro, a carteira usa um <strong className="text-orange-400">gerador de números aleatórios seguro</strong> para gerar uma seed (semente), que pode ser usada para derivar tantas chaves quanto o usuário precisar.
              </p>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-sm mt-6">
                <h4 className="text-white font-black uppercase mb-6 italic text-xs tracking-widest font-mono">Fluxo de Derivação:</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {[
                    { label: 'Entropia', desc: 'Números aleatórios seguros', icon: Fingerprint },
                    { label: 'Seed Phrase', desc: '12-24 palavras mnemônicas', icon: Lock },
                    { label: 'Chave Privada', desc: 'Número secreto derivado', icon: EyeOff },
                    { label: 'Chave Pública', desc: 'Endereço para receber', icon: Eye },
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="text-center flex-1">
                        <div className="w-12 h-12 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-3">
                          <step.icon className="text-orange-500" size={18} />
                        </div>
                        <p className="text-white font-black uppercase text-[10px] tracking-widest font-mono">{step.label}</p>
                        <p className="text-[9px] text-slate-600 mt-1 font-mono">{step.desc}</p>
                      </div>
                      {i < 3 && <ArrowRight className="flow-arrow hidden md:block flex-shrink-0" size={20} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="bg-orange-950/15 border border-orange-900/20 rounded-sm p-6 mt-4">
                <p className="text-orange-400 font-bold text-sm italic text-center">
                  Uma única seed faz backup de todas as suas chaves. Você não precisa guardar cada chave individualmente.
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 03: ANATOMIA DE UMA TRANSAÇÃO === */}
          <section id="bloco-03" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Send size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: Anatomia de uma Transação</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6">
              <p className="text-slate-400 text-base leading-relaxed">
                Exemplo: <strong className="text-white">Bob quer enviar 1 BTC para Alice</strong>. Veja o que acontece:
              </p>
              <div className="space-y-4 mt-6">
                {[
                  { step: '01', title: 'Bob insere o endereço de Alice', desc: 'Bob abre sua carteira e insere a chave pública de Alice no campo de destinatário.' },
                  { step: '02', title: 'A carteira cria e assina a transação', desc: 'O software da carteira cria uma transação e a assina usando as chaves privadas de Bob. Se a assinatura digital corresponder aos fundos, a rede aceita a transação como válida.' },
                  { step: '03', title: 'Alice recebe os fundos', desc: 'Os fundos agora podem ser acessados por quem possuir as chaves privadas correspondentes à chave pública de Alice. Neste caso, apenas Alice.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-orange-500 font-black text-xs font-mono">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-sm tracking-tighter italic mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-sm p-6 mt-6">
                <p className="text-amber-400 font-bold text-sm italic text-center">
                  Carteiras Bitcoin não guardam bitcoins. Elas guardam as chaves que dão acesso aos bitcoins na blockchain — assim como uma conta bancária está armazenada no banco de dados do banco.
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 04: ASSINATURAS DIGITAIS === */}
          <section id="bloco-04" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Fingerprint size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Assinaturas Digitais</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Como Funcionam</h3>
                <p>
                  Chaves privadas são usadas para criar <strong className="text-white">assinaturas</strong>. Uma assinatura é um dado que só pode ser criado usando a chave privada. No entanto, a <strong className="text-orange-400">validade</strong> da assinatura pode ser verificada usando apenas a chave pública.
                </p>
                <p>
                  Isso permite que a chave privada funcione como uma <strong className="text-white">identidade inforjável</strong>. No contexto do Bitcoin, essa funcionalidade garante que os bitcoins só podem ser gastos pelo seu legítimo proprietário.
                </p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-orange-500/10 rounded-sm p-10 space-y-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.4) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <h3 className="text-orange-400 font-black uppercase text-sm tracking-wider font-mono italic">O Fluxo Criptográfico</h3>
                  <div className="space-y-6 mt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0"><EyeOff size={14} className="text-red-500" /></div>
                      <div>
                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Passo 1</p>
                        <p className="text-white text-sm font-bold">Chave privada assina a mensagem</p>
                      </div>
                    </div>
                    <div className="border-l border-orange-500/20 ml-4 h-6"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0"><Fingerprint size={14} className="text-orange-500" /></div>
                      <div>
                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Passo 2</p>
                        <p className="text-white text-sm font-bold">Assinatura digital é gerada</p>
                      </div>
                    </div>
                    <div className="border-l border-orange-500/20 ml-4 h-6"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-sm bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0"><Eye size={14} className="text-green-500" /></div>
                      <div>
                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest font-mono">Passo 3</p>
                        <p className="text-white text-sm font-bold">Qualquer um verifica com a chave pública</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 05: ARMAZENAMENTO === */}
          <section id="bloco-05" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Armazenamento de Chaves</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Quando você possui Bitcoin, o que realmente possui é uma <strong className="text-white">chave privada</strong> para controlar esses fundos na blockchain. Se perder suas chaves privadas e não tiver a seed phrase da carteira, você perde acesso aos fundos <strong className="text-red-400">para sempre</strong>.
              </p>
              <div className="bg-red-950/20 border border-red-900/30 rounded-sm p-8 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-red-400 font-black uppercase text-xs tracking-widest font-mono mb-3">Regras Invioláveis</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2 text-slate-400"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Nunca armazene seed phrases digitalmente</li>
                      <li className="flex gap-2 text-slate-400"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Faça backups físicos em locais separados</li>
                      <li className="flex gap-2 text-slate-400"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Use apenas carteiras de código aberto e verificadas</li>
                      <li className="flex gap-2 text-slate-400"><ArrowRight size={12} className="text-red-500 mt-1 flex-shrink-0" /> Considere metal plates para resistência a fogo/água</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 06: COLD VS HOT === */}
          <section id="bloco-06" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10">
              <HardDrive size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Cold Storage vs Hot Wallet</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-blue-900/20 rounded-sm p-10 space-y-5 group hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <HardDrive className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Cold Storage</h3>
                    <p className="text-[9px] text-blue-400 uppercase font-black tracking-widest font-mono">Armazenamento Offline</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Hardware wallets (Ledger, Trezor, Coldcard)</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Máxima segurança para grandes quantias</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Desconectado da internet = imune a hacks</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-blue-400 mt-1 flex-shrink-0" /> Você é o responsável total pela segurança</li>
                </ul>
                <div className="bg-blue-950/30 border border-blue-900/30 rounded-sm p-4 mt-4">
                  <p className="text-[10px] text-blue-400 font-black uppercase font-mono text-center">Padrão ouro para autocustódia</p>
                </div>
              </div>

              <div className="bg-[#0B0F19]/60 border border-orange-900/20 rounded-sm p-10 space-y-5 group hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Smartphone className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Hot Wallet</h3>
                    <p className="text-[9px] text-orange-400 uppercase font-black tracking-widest font-mono">Carteira Conectada</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Apps mobile ou web (Phoenix, BlueWallet)</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Acesso rápido e conveniente</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Ideal para pequenas quantias do dia a dia</li>
                  <li className="flex gap-2"><ArrowRight size={12} className="text-orange-400 mt-1 flex-shrink-0" /> Maior exposição a riscos digitais</li>
                </ul>
                <div className="bg-orange-950/30 border border-orange-900/30 rounded-sm p-4 mt-4">
                  <p className="text-[10px] text-orange-400 font-black uppercase font-mono text-center">Carteira de bolso — não o cofre</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section className="mb-20">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-sm p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.5) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <ShieldCheck className="text-orange-500 mx-auto mb-6" size={40} />
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight italic">
                  Suas Chaves,<br /><span className="ck-shimmer">Seu Bitcoin</span>
                </h2>
                <div className="max-w-2xl mx-auto mt-8 space-y-4 text-slate-400 text-sm leading-relaxed text-left">
                  <p className="flex gap-3 items-start">
                    <Key className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Propriedade é controle de chaves.</strong> Quem conhece a chave privada controla todos os bitcoins sob aquela chave.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <Lock className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Chaves privadas são números gigantes.</strong> Adivinhar uma chave válida é mais difícil do que adivinhar um cartão de crédito com PIN.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <Unlock className="text-orange-500 mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Not your keys, not your coins.</strong> Sem as chaves, você depende de terceiros. Autocustódia é soberania.</span>
                  </p>
                </div>
                <p className="text-slate-600 font-black text-[9px] uppercase mt-12 tracking-[0.5em] font-mono">A chave é a fronteira entre liberdade e servidão.</p>
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
