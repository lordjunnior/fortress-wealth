import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send, Wallet, FileText, Coins, Cpu, Clock, Shield, AlertTriangle, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'bloco-01', label: '01: O que é uma Transação?' },
  { id: 'bloco-02', label: '02: Como Funciona' },
  { id: 'bloco-03', label: '03: Anatomia da Transação' },
  { id: 'bloco-04', label: '04: Taxas e Prioridade' },
  { id: 'bloco-05', label: '05: Da Mempool ao Bloco' },
  { id: 'bloco-06', label: '06: Regras de Ouro' },
];

export default function TransacoesBitcoin() {
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-cyan-600 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="tx-dust"></div><div className="tx-dust tx-dust-2"></div>
      </div>

      <style>{`
        @keyframes txDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .tx-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(6,182,212,0.2) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(8,145,178,0.12) 100%,transparent);background-size:200px 200px;animation:txDrift 60s linear infinite }
        .tx-dust-2 { background-size:280px 280px;animation:txDrift 90s linear infinite reverse;opacity:0.4 }
        .tx-shimmer { background:linear-gradient(90deg,#0891b2 0%,#22d3ee 40%,#fff 50%,#22d3ee 60%,#0891b2 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:txShim 3s linear infinite }
        @keyframes txShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes cyanGlow { 0%,100%{box-shadow:0 0 0 rgba(6,182,212,0)} 50%{box-shadow:0 0 12px rgba(6,182,212,0.15)} }
        .nav-active { background:rgba(6,182,212,0.08);border-left:2px solid rgba(6,182,212,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(6,182,212,0.05);animation:cyanGlow 3s ease-in-out infinite }
        .tx-flow-card { transition:all 0.4s cubic-bezier(0.4,0,0.2,1) }
        .tx-flow-card:hover { transform:translateY(-6px) scale(1.02);box-shadow:0 0 40px rgba(6,182,212,0.1) }
        @keyframes txPulse { 0%,100%{border-color:rgba(6,182,212,0.15);box-shadow:0 0 10px rgba(6,182,212,0.02)} 50%{border-color:rgba(6,182,212,0.5);box-shadow:0 0 25px rgba(6,182,212,0.08)} }
        .tx-pulse { animation:txPulse 3s ease-in-out infinite }
        @keyframes flowLine { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .flow-line { height:2px;background:linear-gradient(90deg,transparent,rgba(6,182,212,0.6),transparent);background-size:200% 100%;animation:flowLine 3s linear infinite }
      `}</style>

      {/* === SIDEBAR DESKTOP === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Send className="text-cyan-500" size={16} />
              <span className="text-cyan-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Transações</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo Inicial
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Progresso</span>
              <span className="text-[7px] font-black text-cyan-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #155e75, #22d3ee)' }} />
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
            <Send className="text-cyan-500" size={12} />
            <span className="text-cyan-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Transações</span>
          </div>
          <span className="text-[8px] font-black text-cyan-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #155e75, #22d3ee)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[260px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* HEADER com Parallax */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(0,20,30,0.5) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(6,182,212,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(8,145,178,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-[0.04] pointer-events-none select-none">
              <Send size={240} strokeWidth={0.5} />
            </div>
            <div className="relative z-10">
              <span className="text-cyan-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Mecânica de Transferência de Valor</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                Como Funcionam<br />
                <span className="tx-shimmer italic">As Transações?</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Uma transação é uma transferência de valor em Bitcoin na blockchain. Transações são irreversíveis depois de adicionadas à blockchain. Sem intermediários, sem permissão.
              </p>
            </div>
          </header>

          {/* === BLOCO 01: O QUE É === */}
          <section id="bloco-01" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <FileText size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">01: O que é uma Transação Bitcoin?</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Uma transação é uma <strong className="text-white">transferência de valor Bitcoin na blockchain</strong>. Em termos simples, é quando o participante A envia uma quantidade designada de Bitcoin que possui para o participante B.
              </p>
              <p>
                Transações são criadas através de <strong className="text-cyan-400">carteiras (wallets)</strong>: seja no celular, desktop ou hardware especializado. Sem banco, sem intermediário, sem autorização de terceiros.
              </p>
              <div className="flow-line my-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="tx-flow-card bg-cyan-950/20 border border-cyan-900/30 rounded-sm p-6 text-center">
                  <Wallet className="text-cyan-500 mx-auto mb-3" size={24} />
                  <p className="text-[8px] text-cyan-600 uppercase font-black tracking-widest font-mono mb-2">Origem</p>
                  <p className="text-white font-black text-sm italic">Carteira do Remetente</p>
                </div>
                <div className="tx-flow-card bg-cyan-950/20 border border-cyan-900/30 rounded-sm p-6 text-center">
                  <Send className="text-cyan-500 mx-auto mb-3" size={24} />
                  <p className="text-[8px] text-cyan-600 uppercase font-black tracking-widest font-mono mb-2">Transmissão</p>
                  <p className="text-white font-black text-sm italic">Rede P2P Global</p>
                </div>
                <div className="tx-flow-card bg-cyan-950/20 border border-cyan-900/30 rounded-sm p-6 text-center">
                  <Shield className="text-cyan-500 mx-auto mb-3" size={24} />
                  <p className="text-[8px] text-cyan-600 uppercase font-black tracking-widest font-mono mb-2">Confirmação</p>
                  <p className="text-white font-black text-sm italic">Bloco na Blockchain</p>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 02: COMO FUNCIONA === */}
          <section id="bloco-02" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <Cpu size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">02: Como Funciona por Dentro</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Para o usuário, enviar Bitcoin é tão simples quanto inserir um <strong className="text-white">valor e um endereço</strong> na carteira e pressionar "enviar". Mas por trás dos bastidores, a <strong className="text-cyan-400">criptografia de chave pública</strong> garante a integridade de cada transação.
              </p>
              <p>
                Cada participante possui pares de <strong className="text-white">chaves públicas</strong> e <strong className="text-white">chaves privadas</strong> que controlam seus bitcoins. A chave pública funciona como um endereço para receber; a chave privada autoriza o gasto.
              </p>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-sm mt-6">
                <h4 className="text-cyan-400 font-black uppercase mb-4 italic text-xs tracking-widest font-mono">Fluxo de Assinatura:</h4>
                <div className="space-y-4">
                  {[
                    { n: '01', t: 'Assinatura', d: 'O remetente usa sua chave privada para criar uma assinatura digital da transação.' },
                    { n: '02', t: 'Broadcast', d: 'A transação é transmitida para a rede Bitcoin peer-to-peer.' },
                    { n: '03', t: 'Verificação', d: 'Nós da rede verificam que a assinatura corresponde à chave pública do remetente.' },
                    { n: '04', t: 'Confirmação', d: 'Mineradores incluem a transação em um bloco, tornando-a irreversível.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4 items-start group">
                      <div className="w-9 h-9 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                        <span className="text-cyan-500 font-black text-[10px] font-mono">{step.n}</span>
                      </div>
                      <div>
                        <h5 className="text-white font-black uppercase text-xs tracking-tighter italic mb-0.5">{step.t}</h5>
                        <p className="text-slate-500 text-sm leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-950/15 border border-amber-900/20 rounded-sm p-6 mt-4 tx-pulse">
                <p className="text-amber-400 font-bold text-sm italic text-center">
                  ⚠ Os termos "endereço" e "chave pública" são frequentemente usados de forma intercambiável. Um endereço é uma representação da chave pública, usado por segurança e brevidade.
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 03: ANATOMIA === */}
          <section id="bloco-03" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <FileText size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">03: Anatomia de uma Transação</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6">
              <p className="text-slate-400 text-base leading-relaxed">
                Exemplo: <strong className="text-white">Alice quer enviar 0.05 BTC para Bob</strong>. Uma transação possui três componentes fundamentais:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="tx-flow-card bg-[#0B0F19]/60 border border-cyan-900/20 rounded-sm p-8 space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <ArrowRight className="text-cyan-500" size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Inputs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">O endereço de onde o Bitcoin sai. Prova de que Alice recebeu valor anteriormente e agora deseja gastá-lo.</p>
                </div>
                <div className="tx-flow-card bg-[#0B0F19]/60 border border-cyan-900/20 rounded-sm p-8 space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Wallet className="text-cyan-500" size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Outputs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">A chave pública ou endereço de Bob — o destinatário que controlará o valor após a confirmação.</p>
                </div>
                <div className="tx-flow-card bg-[#0B0F19]/60 border border-cyan-900/20 rounded-sm p-8 space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Coins className="text-cyan-500" size={20} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">Valor</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">A quantidade de Bitcoin que Alice deseja enviar. A diferença entre inputs e outputs se torna a taxa do minerador.</p>
                </div>
              </div>
              <div className="flow-line my-6" />
              <div className="bg-cyan-950/15 border border-cyan-900/20 rounded-sm p-6">
                <p className="text-cyan-400 font-bold text-sm italic text-center">
                  Uma transação pode conter múltiplos inputs e outputs. Desde que a soma dos inputs supere a dos outputs, a transação é válida.
                </p>
              </div>
            </div>
          </section>

          {/* === BLOCO 04: TAXAS === */}
          <section id="bloco-04" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <Coins size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">04: Taxas e Prioridade</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">O Mercado de Taxas</h3>
                <p>Usuários controlam a velocidade de processamento definindo a <strong className="text-white">taxa de comissão (fee rate)</strong>. Quanto maior a taxa, mais rápida a confirmação.</p>
                <p>Cada bloco na blockchain comporta até <strong className="text-cyan-400">~1MB de dados</strong>. Espaço limitado = competição. Mineradores priorizam transações com maiores taxas.</p>
              </div>
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 relative overflow-hidden">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">Incentivo dos Mineradores</h3>
                <p className="text-slate-400 leading-relaxed">Mineradores recebem duas recompensas: o <strong className="text-white">subsídio de bloco</strong> (bitcoins recém-criados) e as <strong className="text-cyan-400">taxas de transação</strong>.</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-[8px] text-slate-600 uppercase font-black tracking-widest font-mono">Taxa Baixa</p>
                    <Clock className="text-slate-600 mx-auto my-2" size={24} />
                    <p className="text-slate-500 text-xs font-bold">Horas / Dias</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-cyan-600 uppercase font-black tracking-widest font-mono">Taxa Alta</p>
                    <Zap className="text-cyan-400 mx-auto my-2" size={24} />
                    <p className="text-cyan-400 text-xs font-bold">~10 Minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BLOCO 05: DA MEMPOOL AO BLOCO === */}
          <section id="bloco-05" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <Cpu size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">05: Da Mempool ao Bloco</h2>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                Após a assinatura, a transação é transmitida para a rede. Ela entra na <strong className="text-white">Mempool</strong> — a "sala de espera" onde todas as transações aguardam confirmação.
              </p>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-sm mt-6">
                <h4 className="text-white font-black uppercase mb-6 italic text-xs tracking-widest font-mono">Ciclo de Vida de uma TX:</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {[
                    { label: 'Criação', desc: 'Carteira cria e assina', icon: Wallet },
                    { label: 'Broadcast', desc: 'Transmitida para nós', icon: Send },
                    { label: 'Mempool', desc: 'Aguarda na fila', icon: Clock },
                    { label: 'Mineração', desc: 'Incluída em bloco', icon: Cpu },
                    { label: 'Confirmada', desc: 'Irreversível', icon: Shield },
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="text-center flex-1">
                        <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                          <step.icon className="text-cyan-500" size={18} />
                        </div>
                        <p className="text-white font-black uppercase text-[10px] tracking-widest font-mono">{step.label}</p>
                        <p className="text-[9px] text-slate-600 mt-1 font-mono">{step.desc}</p>
                      </div>
                      {i < 4 && <ArrowRight className="text-cyan-500/30 hidden md:block flex-shrink-0" size={20} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="mt-6">
                Quando um minerador resolve o próximo bloco, as transações nele se tornam <strong className="text-cyan-400">imutáveis</strong>. Cada confirmação adicional (bloco subsequente) torna a reversão exponencialmente mais cara.
              </p>
            </div>
          </section>

          {/* === BLOCO 06: REGRAS DE OURO === */}
          <section id="bloco-06" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-cyan-500 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">06: Regras de Ouro</h2>
            </div>
            <div className="border-2 border-cyan-600/30 bg-[#0a0a0a] p-10 md:p-12 relative overflow-hidden rounded-sm tx-pulse">
              <Send className="absolute top-0 right-0 text-cyan-600/5 -mr-14 -mt-14" size={280} />
              <div className="relative z-10">
                <h3 className="text-sm md:text-base font-black uppercase tracking-wider mb-6 flex items-center gap-3 font-mono">
                  <Shield className="text-cyan-500" size={20} />
                  <span className="text-slate-500">Código do Soberano:</span>
                  <span className="text-cyan-400 italic">Transações</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { rule: 'Transações são irreversíveis', detail: 'Não existe "estorno" no Bitcoin. Verifique o endereço antes de enviar.' },
                    { rule: 'Quem controla as chaves, controla o dinheiro', detail: 'Sua chave privada = sua assinatura. Sem ela, sem acesso.' },
                    { rule: 'Taxas controlam velocidade', detail: 'Urgência? Aumente a taxa. Sem pressa? Taxa mínima basta.' },
                    { rule: 'UTXOs, não saldos', detail: 'Bitcoin não usa "contas". Usa fragmentos de transações anteriores (UTXOs) como inputs.' },
                    { rule: 'Cada confirmação aumenta a segurança', detail: '1 confirmação = incluído. 6 confirmações = praticamente irreversível.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-7 h-7 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                        <span className="text-cyan-500 font-black text-[9px] font-mono">{String(i+1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <p className="text-white font-black uppercase text-sm tracking-tighter italic">{item.rule}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KEY TAKEAWAYS */}
          <div className="bg-[#0B0F19]/60 border border-cyan-900/20 rounded-sm p-10 mb-28">
            <h3 className="text-cyan-500 font-black uppercase text-xs tracking-[0.3em] font-mono mb-6">Conclusões Operacionais</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-slate-400 text-sm leading-relaxed">
                <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                <span>Uma transação Bitcoin é uma transferência de bitcoin de um endereço para outro. A transação válida deve ser <strong className="text-white">assinada pelo remetente</strong>.</span>
              </li>
              <li className="flex gap-3 items-start text-slate-400 text-sm leading-relaxed">
                <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                <span>Bitcoin não possui contas. Fragmentos de Bitcoin de tamanhos arbitrários são associados a endereços — são os <strong className="text-white">UTXOs (Unspent Transaction Outputs)</strong>.</span>
              </li>
              <li className="flex gap-3 items-start text-slate-400 text-sm leading-relaxed">
                <ArrowRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={14} />
                <span>Todas as transações são publicadas na <strong className="text-white">mempool</strong> como "pendentes". Quando um minerador as adiciona a um bloco, são consideradas <strong className="text-cyan-400">confirmadas</strong>.</span>
              </li>
            </ul>
          </div>

          {/* VOLTAR */}
          <div className="border-2 border-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-sm">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-white mb-1 font-mono">Protocolo Inicial</h3>
              <p className="text-slate-400 font-bold uppercase text-xs">Voltar ao índice de formação.</p>
            </div>
            <Link to="/protocolo-inicial" className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-cyan-600 hover:text-white transition-all flex items-center gap-3 rounded-sm">
              <ArrowLeft size={16} /> Retornar
            </Link>
          </div>

          {/* FOOTER */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Transações são irreversíveis. Verifique sempre.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
