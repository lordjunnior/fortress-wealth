import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldAlert, BookOpen, Coins, Lock, Globe, Zap, Eye, Users, Scale, Pickaxe, Hash, HelpCircle, AlertTriangle } from 'lucide-react';

const TOPICS = [
  {
    icon: <Coins size={18} />,
    title: 'O que é Bitcoin?',
    desc: 'Um dinheiro digital, descentralizado e escasso. Sem banco, sem dono, sem impressora. Ponto a ponto.',
    detail: 'Bitcoin é a primeira moeda digital com escassez real — apenas 21 milhões existirão. É software de código aberto que permite transferir valor pela internet sem intermediários, sem censura e sem permissão de nenhum governo.',
    color: 'amber',
  },
  {
    icon: <Scale size={18} />,
    title: 'Como Comprar?',
    desc: 'Exchanges, P2P ou recebendo por serviços. Não é preciso comprar um Bitcoin inteiro.',
    detail: 'Você pode comprar frações (satoshis) por qualquer valor. Use exchanges com boa reputação, nunca deixe seu Bitcoin lá — transfira para sua própria carteira. Se as chaves não são suas, o Bitcoin não é seu.',
    color: 'green',
  },
  {
    icon: <ArrowRight size={18} />,
    title: 'Enviar e Receber',
    desc: 'É como enviar um e-mail de valor. Endereço, valor, confirmar. Simples e irreversível.',
    detail: 'Para receber, compartilhe seu endereço público. Para enviar, insira o endereço do destinatário e o valor. A transação é assinada pela sua chave privada e propagada pela rede. Confirmações levam de minutos a horas.',
    color: 'cyan',
  },
  {
    icon: <Eye size={18} />,
    title: 'Crypto vs. Bitcoin',
    desc: 'Existem milhares de criptomoedas. Apenas uma é escassa, descentralizada e resiliente.',
    detail: 'Altcoins são tokens controlados por empresas ou fundações. Bitcoin não tem CEO, não tem marketing, não tem pré-mineração. É o único ativo digital com verdadeira descentralização e imutabilidade de supply.',
    color: 'red',
  },
  {
    icon: <Lock size={18} />,
    title: 'Chaves Públicas & Privadas',
    desc: 'Sua chave privada é a senha mestre. Se alguém a tiver, tem seus fundos.',
    detail: 'Criptografia de curva elíptica gera pares de chaves. A pública é derivada da privada. Endereços são derivados da pública. Você compartilha endereços para receber; nunca compartilha a chave privada.',
    color: 'orange',
  },
  {
    icon: <HelpCircle size={18} />,
    title: 'Bitcoin é Pirâmide?',
    desc: 'Pirâmides prometem retorno. Bitcoin não promete nada. É propriedade, não investimento.',
    detail: 'Esquemas Ponzi dependem de novos participantes pagando os antigos. Bitcoin não tem administrador, não paga dividendos e não garante lucros. É uma tecnologia monetária aberta e auditável.',
    color: 'emerald',
  },
  {
    icon: <Users size={18} />,
    title: 'Quem é Satoshi Nakamoto?',
    desc: 'Criador anônimo. Publicou o whitepaper em 2008. Desapareceu em 2011. Nunca moveu seus BTC.',
    detail: 'Satoshi Nakamoto é o pseudônimo do criador do Bitcoin. Minerou os primeiros blocos e depois desapareceu. Seu anonimato é uma feature: Bitcoin não depende de líderes.',
    color: 'violet',
  },
  {
    icon: <Globe size={18} />,
    title: 'O que Comprar com BTC?',
    desc: 'Gift cards, viagens, serviços, bens digitais. A adoção cresce diariamente.',
    detail: 'Através da Lightning Network, pagamentos são quase instantâneos e com taxas mínimas. Empresas como Microsoft, Shopify e milhares de comerciantes aceitam Bitcoin diretamente ou via processadores de pagamento.',
    color: 'blue',
  },
  {
    icon: <Zap size={18} />,
    title: 'Bitcoin vs. Ouro',
    desc: 'Ambos são reservas de valor. Mas um é portável, divisível e verificável digitalmente.',
    detail: 'Ouro é físico e pesado. Bitcoin é digital e leve. Ouro pode ser confiscado. Bitcoin é inconfiscável com autocustódia. Ouro tem supply desconhecido. Bitcoin: 21 milhões, verificáveis por qualquer um.',
    color: 'yellow',
  },
  {
    icon: <AlertTriangle size={18} />,
    title: 'Bitcoin é Anônimo?',
    desc: 'Não. É pseudônimo. Todas as transações são públicas e rastreáveis na blockchain.',
    detail: 'Endereços não contêm seu nome, mas padrões de uso podem ser analisados. Para privacidade real, práticas como CoinJoin e uso de Lightning são necessárias. Transparência é uma feature, não um bug.',
    color: 'slate',
  },
  {
    icon: <Hash size={18} />,
    title: 'Moeda Fiduciária',
    desc: 'Dinheiro por decreto. Sem lastro real. Governos imprimem para cobrir dívidas que nunca pagam.',
    detail: 'Desde 1971, nenhuma moeda é lastreada em ouro. O Real perdeu 86% do poder de compra desde 1994. O dólar perdeu 97% desde 1913. Inflação não é "aumento de preços" — é roubo silencioso.',
    color: 'rose',
  },
  {
    icon: <Pickaxe size={18} />,
    title: 'Bitcoin Pode ser Banido?',
    desc: 'Impossível. Roda em satélites, rádios, mesh networks. Código é discurso protegido.',
    detail: 'Governos podem dificultar exchanges centralizadas, mas não podem parar a rede P2P. Bitcoin opera em frequências de rádio, satélites Blockstream e redes mesh. Banir Bitcoin é como banir a matemática.',
    color: 'fuchsia',
  },
  {
    icon: <BookOpen size={18} />,
    title: 'Como Escala?',
    desc: 'Layer 1 (blockchain) + Layer 2 (Lightning). Pagamentos instantâneos e baratos.',
    detail: 'A blockchain processa ~7 transações por segundo. A Lightning Network adiciona milhões de transações instantâneas com taxas de centavos. É como o TCP/IP do dinheiro: base lenta e segura, camadas rápidas em cima.',
    color: 'teal',
  },
  {
    icon: <Lock size={18} />,
    title: 'Bitcoin é Seguro?',
    desc: 'A blockchain nunca foi hackeada. O risco é humano: perder chaves, cair em golpes.',
    detail: 'SHA-256 e prova de trabalho tornam ataques economicamente inviáveis. A rede tem 16+ anos sem downtime. Exchanges são hackeadas, não o Bitcoin. Autocustódia elimina o risco de terceiros.',
    color: 'emerald',
  },
];

export default function NocoesBitcoin() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    amber: { border: 'rgba(245,158,11,0.3)', bg: 'rgba(245,158,11,0.06)', text: '#f59e0b', glow: 'rgba(245,158,11,0.08)' },
    green: { border: 'rgba(34,197,94,0.3)', bg: 'rgba(34,197,94,0.06)', text: '#22c55e', glow: 'rgba(34,197,94,0.08)' },
    cyan: { border: 'rgba(6,182,212,0.3)', bg: 'rgba(6,182,212,0.06)', text: '#06b6d4', glow: 'rgba(6,182,212,0.08)' },
    red: { border: 'rgba(220,38,38,0.3)', bg: 'rgba(220,38,38,0.06)', text: '#dc2626', glow: 'rgba(220,38,38,0.08)' },
    orange: { border: 'rgba(249,115,22,0.3)', bg: 'rgba(249,115,22,0.06)', text: '#f97316', glow: 'rgba(249,115,22,0.08)' },
    emerald: { border: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.06)', text: '#10b981', glow: 'rgba(16,185,129,0.08)' },
    violet: { border: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.06)', text: '#8b5cf6', glow: 'rgba(139,92,246,0.08)' },
    blue: { border: 'rgba(59,130,246,0.3)', bg: 'rgba(59,130,246,0.06)', text: '#3b82f6', glow: 'rgba(59,130,246,0.08)' },
    yellow: { border: 'rgba(234,179,8,0.3)', bg: 'rgba(234,179,8,0.06)', text: '#eab308', glow: 'rgba(234,179,8,0.08)' },
    slate: { border: 'rgba(148,163,184,0.3)', bg: 'rgba(148,163,184,0.06)', text: '#94a3b8', glow: 'rgba(148,163,184,0.08)' },
    rose: { border: 'rgba(244,63,94,0.3)', bg: 'rgba(244,63,94,0.06)', text: '#f43f5e', glow: 'rgba(244,63,94,0.08)' },
    fuchsia: { border: 'rgba(192,38,211,0.3)', bg: 'rgba(192,38,211,0.06)', text: '#c026d3', glow: 'rgba(192,38,211,0.08)' },
    teal: { border: 'rgba(20,184,166,0.3)', bg: 'rgba(20,184,166,0.06)', text: '#14b8a6', glow: 'rgba(20,184,166,0.08)' },
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="nb-dust"></div><div className="nb-dust nb-dust-2"></div>
      </div>

      <style>{`
        @keyframes nbDrift { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-500px) translateX(30px)} 100%{transform:translateY(-1000px) translateX(0)} }
        .nb-dust { position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 20% 20%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 60% 50%,rgba(255,255,255,0.12) 100%,transparent);background-size:200px 200px;animation:nbDrift 55s linear infinite }
        .nb-dust-2 { background-size:300px 300px;animation:nbDrift 80s linear infinite reverse;opacity:0.5 }
        .nb-shimmer { background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:nbShim 3s linear infinite }
        @keyframes nbShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
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
            <BookOpen className="text-amber-500" size={12} />
            <span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Noções Básicas</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="text-amber-500" size={16} />
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Noções Básicas</span>
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
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[1px]">
            {TOPICS.map((t, i) => (
              <button
                key={i}
                onClick={() => document.getElementById(`topic-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full text-left px-3 py-2 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-l-2 border-transparent hover:border-amber-500/40 truncate"
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* Hero with Parallax */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(30,20,5,0.6) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(234,179,8,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.05] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
            <div className="relative z-10">
              <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">Aprenda o Básico sobre Bitcoin</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                Noções Básicas<br />
                <span className="nb-shimmer italic">sobre Bitcoin</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                Tudo o que você precisa saber antes de comprar seu primeiro satoshi. Sem jargões desnecessários. Sem promessas de lucro. Apenas a verdade sobre o dinheiro mais resiliente já criado.
              </p>
            </div>
          </header>

          {/* Topics Grid */}
          <section className="mb-28">
            <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] mb-8 font-mono">Fundamentos — {TOPICS.length} Tópicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOPICS.map((topic, i) => {
                const c = colorMap[topic.color] || colorMap.amber;
                const isOpen = expanded === i;
                return (
                  <div
                    key={i}
                    id={`topic-${i}`}
                    className="scroll-mt-24 rounded-sm overflow-hidden transition-all duration-500 cursor-pointer group"
                    style={{
                      background: isOpen ? c.bg : 'rgba(11,15,25,0.6)',
                      border: `1px solid ${isOpen ? c.border : 'rgba(255,255,255,0.05)'}`,
                      boxShadow: isOpen ? `0 0 30px ${c.glow}` : 'none',
                    }}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="p-8 relative overflow-hidden">
                      {/* Shimmer line on hover */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }}
                      />
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                        >
                          {topic.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-black uppercase text-sm tracking-tighter italic transition-colors duration-300" style={{ color: isOpen ? c.text : '#fff' }}>
                              {topic.title}
                            </h4>
                            <span className="text-[8px] font-black uppercase tracking-widest font-mono" style={{ color: c.text, opacity: 0.5 }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{topic.desc}</p>
                          {isOpen && (
                            <div className="mt-5 pt-5 border-t" style={{ borderColor: `${c.border}` }}>
                              <p className="text-slate-400 text-sm leading-relaxed">{topic.detail}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Warning */}
          <div className="border-2 border-red-600/20 bg-red-950/10 rounded-sm p-10 mb-28 relative overflow-hidden">
            <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-10 -mt-10" size={200} />
            <div className="relative z-10">
              <p className="text-red-600 font-black uppercase tracking-widest text-[9px] italic font-mono mb-4">Aviso Operacional</p>
              <p className="text-white font-black text-lg md:text-xl leading-tight uppercase italic mb-4">
                "Nenhum destes conceitos substitui a prática da autocustódia."
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Entender o básico é o primeiro passo. Mas soberania real exige ação: suas chaves, seu nó, sua responsabilidade.
              </p>
            </div>
          </div>

          {/* Próximo Nível */}
          <div className="border-2 border-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-sm group hover:border-amber-500/50 transition-all">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-white mb-1 font-mono">Próximo Nível</h3>
              <p className="text-slate-400 font-bold uppercase text-xs">Volte ao Protocolo e avance nos módulos.</p>
            </div>
            <Link to="/protocolo-inicial" className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 hover:text-black transition-all flex items-center gap-3 rounded-sm">
              Protocolo Inicial <ArrowRight size={16} />
            </Link>
          </div>

          {/* Footer */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Conhecimento é a primeira camada de defesa.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
