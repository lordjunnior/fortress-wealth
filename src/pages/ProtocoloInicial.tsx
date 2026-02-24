import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, Cpu } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* MANTIDO: Alert System Particles */}
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
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(220, 38, 38, 0.3); box-shadow: 0 0 15px rgba(220, 38, 38, 0.1); }
          50% { border-color: rgba(220, 38, 38, 0.8); box-shadow: 0 0 30px rgba(220, 38, 38, 0.4); }
        }
        .alert-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent),
            radial-gradient(1px 1px at 35% 45%, rgba(255,255,255,0.2) 100%, transparent),
            radial-gradient(1.5px 1.5px at 55% 70%, rgba(220,38,38,0.25) 100%, transparent),
            radial-gradient(1px 1px at 75% 25%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 92% 60%, rgba(220,38,38,0.2) 100%, transparent);
          background-size: 200px 200px;
          animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 { background-size: 280px 280px; animation: driftAlert 70s linear infinite reverse; opacity: 0.6; }
        .alert-layer-3 { background-size: 360px 360px; animation: driftAlert 100s linear infinite; opacity: 0.3; }
        .alert-pulse {
          position: absolute; top: 30%; left: 50%; width: 400px; height: 400px;
          margin: -200px 0 0 -200px; border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.1); animation: alertPulse 5s ease-in-out infinite;
        }
        .protocolo-shimmer {
          background: linear-gradient(90deg, #dc2626 0%, #ff6b6b 40%, #ffffff 50%, #ff6b6b 60%, #dc2626 100%);
          background-size: 250% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: protocShimmer 3s linear infinite;
        }
        @keyframes protocShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .card-blindado { border: 1px solid rgba(255,255,255,0.05); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-blindado:hover { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.02); transform: translateY(-5px); }
        .glow-red-hover:hover { animation: borderGlow 2s infinite; }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        {/* MANTIDO: Link de Retorno */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        {/* MANTIDO: Header */}
        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Para Leigos Absolutos</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 uppercase">Entenda o Bitcoin</h1>
          <p className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase protocolo-shimmer italic pb-2">ainda hoje</p>
          <p className="text-2xl md:text-3xl font-black text-slate-300 leading-tight max-w-2xl tracking-tight">
            Você não precisa entender de economia, programação ou gráficos.
          </p>
        </header>

        {/* MANTIDO: Intro Section */}
        <section className="space-y-10 mb-32">
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
            Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura.
          </p>
          <div className="border-l-8 border-red-600 pl-8 py-4">
            <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              É o fim das dúvidas e o início da sua liberdade.
            </p>
          </div>
        </section>

        {/* NOVO: BLOCO 01 - A NATUREZA DO DINHEIRO (TRIO DA BLINDAGEM) */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-red-600 font-black uppercase tracking-widest text-xs">01. Gênese</h3>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">O que é dinheiro?</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Dinheiro é uma <span className="text-white font-bold italic">tecnologia de transporte de tempo</span>. Se o que você recebe pelo seu esforço perde valor enquanto você dorme, você está sendo roubado em câmera lenta através da inflação. O sistema fiduciário não tem lastro; ele tem <span className="text-red-600">promessas de políticos insolventes</span>.
            </p>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Coins size={120} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-500">As Leis da Sobrevivência</h4>
            <ul className="space-y-4 font-bold text-sm uppercase tracking-tight">
              <li className="flex gap-3 text-red-500"><Zap size={16}/> Escassez: Ouro é finito. Impressora é infinita.</li>
              <li className="flex gap-3 text-slate-300"><Lock size={16}/> Durabilidade: O papel apodrece. O código é eterno.</li>
              <li className="flex gap-3 text-slate-300"><Globe size={16}/> Portabilidade: Cruzar fronteiras com a mente.</li>
            </ul>
          </div>
        </div>

        {/* NOVO: GRID DE PROPRIEDADES (OS 3 CARDS DE ELITE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { 
              title: "O que é?", 
              desc: "Não é 'moeda digital'. É a descoberta da escassez absoluta em um mundo de impressão infinita.",
              color: "border-orange-600/30",
              icon: <Zap className="text-orange-500" />
            },
            { 
              title: "Por que vale?", 
              desc: "Imutabilidade matemática. 21 milhões. O primeiro dinheiro que não tem um dono para destruí-lo.",
              color: "border-green-600/30",
              icon: <Lock className="text-green-500" />
            },
            { 
              title: "Como comprar?", 
              desc: "Troque papel podre por propriedade real. Mas entenda: sem chaves, sem Bitcoin. Só promessa.",
              color: "border-red-600/30",
              icon: <ShieldCheck className="text-red-500" />
            }
          ].map((card, i) => (
            <div key={i} className={`p-8 rounded-xl bg-[#0B0F19] border ${card.color} card-blindado glow-red-hover`}>
              <div className="mb-6">{card.icon}</div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">{card.title}</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* NOVO: BLOCO TÉCNICO - MINERAÇÃO E 21 MILHÕES (GRÁFICO ANIMADO) */}
        <div className="bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-16 mb-32 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">A Lei dos <span className="text-red-600">21 Milhões</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Diferente do Banco Central, que pode imprimir trilhões em uma tarde, a oferta de Bitcoin é cravada na física. Pela mineração, a rede usa energia real para garantir que o passado não seja alterado. É o dinheiro lastreado na termodinâmica.
              </p>
              <div className="flex gap-6 items-center">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Ano Final</p>
                  <p className="text-2xl font-black text-white italic">2140</p>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Unidades</p>
                  <p className="text-2xl font-black text-white italic">21M</p>
                </div>
              </div>
            </div>
            {/* Gráfico Simulado de Halving */}
            <div className="flex flex-col justify-end gap-2 h-64 border-l border-b border-white/10 p-4">
              <div className="flex items-end gap-2 h-full">
                <div className="bg-red-600 w-full h-[100%] animate-[pulse_3s_infinite]"></div>
                <div className="bg-red-700 w-full h-[50%]"></div>
                <div className="bg-red-800 w-full h-[25%]"></div>
                <div className="bg-red-900 w-full h-[12%] italic text-[8px] text-slate-500 flex items-center justify-center">→ zero</div>
              </div>
              <p className="text-[10px] text-center font-black uppercase tracking-widest text-slate-600">Inflação do Bitcoin decrescente (Halvings)</p>
            </div>
          </div>
        </div>

        {/* NOVO: BLINDAGEM CONTRA MITOS (TRANSFORMAÇÃO VISUAL) */}
        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">Neutralizando Narrativas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { mito: "Bitcoin é anônimo", verdade: "É pseudônimo e totalmente auditável por qualquer pessoa." },
              { mito: "Pode ser hackeado", verdade: "A rede é imune. Só o usuário falha ao perder suas chaves." },
              { mito: "É complicado demais", verdade: "É mais simples que o sistema bancário que te escraviza." },
              { mito: "Não tem lastro", verdade: "Lastreado em Matemática, Física e na Demanda global." }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-slate-900/30 border border-white/5 hover:border-red-600/50 transition-all">
                <p className="text-[10px] text-red-600 font-black uppercase mb-2">Mito {i+1}</p>
                <p className="text-lg font-black uppercase line-through opacity-40 group-hover:opacity-20 transition-opacity">{item.mito}</p>
                <p className="text-white font-bold tracking-tight mt-2 group-hover:translate-x-2 transition-transform">→ {item.verdade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MANTIDO: CARD CENTRAL - PDF */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Por que este material existe</h3>
              <div className="space-y-4 mb-10">
                <p className="text-2xl font-black text-white leading-none uppercase">A queda não é do mercado. <span className="text-red-600 italic">É da consciência.</span></p>
                <p className="text-slate-400 font-medium">A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele. Bitcoin surge como explicação tardia.</p>
              </div>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 animate-[pulse_2s_infinite]">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>
            <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
              <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <ShieldCheck className="text-white/20" size={40} />
                <div>
                  <h4 className="text-3xl font-black leading-none uppercase tracking-tighter italic mb-2">Protocolos de Soberania</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Lord Junnior</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NOVO: O ALERTA FINAL (BLINDAGEM CONTRA GOLPES) */}
        <div className="mb-32 border-2 border-red-600 bg-red-950/20 p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ShieldAlert size={150} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
             <ShieldAlert className="text-red-600" /> Blindagem contra Golpes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold uppercase text-xs tracking-widest">
            <p className="text-slate-300"><span className="text-white block mb-1">Ninguém legítimo pede sua Seed</span> Se pedirem suas 12/24 palavras, é roubo imediato.</p>
            <p className="text-slate-300"><span className="text-white block mb-1">Urgência é Isca</span> Golpistas usam o medo ou a ganância (promessas de lucro) para nublar sua razão.</p>
          </div>
        </div>

        {/* MANTIDO: Próximo Nível */}
        <div className="border-2 border-white p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-40">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-2xl">🗝️</span>
              <h3 className="font-black uppercase tracking-[0.4em] text-sm">Próximo Nível</h3>
            </div>
            <p className="text-slate-400 font-bold uppercase text-sm">Depois de ler, você não será mais leigo. Estará pronto para a prática.</p>
          </div>
          <Link to="/arsenal" className="bg-white text-black px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
            Ir para o Arsenal Técnico <ArrowRight size={18} />
          </Link>
        </div>

        {/* MANTIDO: Footer Manifesto */}
        <footer className="pt-20 border-t border-white/5">
          <div className="text-center space-y-12">
            <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px]">Not your keys, not your money.</p>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Quem não assume a custódia aceita a dependência.</p>
              <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter italic">Autocustódia exige responsabilidade.</p>
            </div>
            <div className="pt-20 pb-10">
              <p className="text-slate-500 font-bold uppercase text-sm tracking-tight mb-2">Lembrem-se: Dependência financeira nunca foi acidente.</p>
              <p className="text-white font-black uppercase text-5xl md:text-7xl tracking-tighter italic leading-none">Sempre foi projeto.</p>
              <p className="text-slate-800 text-[10px] font-black mt-20 tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}