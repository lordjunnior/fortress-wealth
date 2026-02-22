import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* Alert System Particles - simulando estado de alerta */}
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
          background-image:
            radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent),
            radial-gradient(1px 1px at 35% 45%, rgba(255,255,255,0.2) 100%, transparent),
            radial-gradient(1.5px 1.5px at 55% 70%, rgba(220,38,38,0.25) 100%, transparent),
            radial-gradient(1px 1px at 75% 25%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 92% 60%, rgba(220,38,38,0.2) 100%, transparent);
          background-size: 200px 200px;
          animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 {
          background-size: 280px 280px;
          animation: driftAlert 70s linear infinite reverse;
          opacity: 0.6;
        }
        .alert-layer-3 {
          background-size: 360px 360px;
          animation: driftAlert 100s linear infinite;
          opacity: 0.3;
        }
        .alert-pulse {
          position: absolute;
          top: 30%; left: 50%;
          width: 400px; height: 400px;
          margin: -200px 0 0 -200px;
          border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.1);
          animation: alertPulse 5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Para Leigos Absolutos</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
            Entenda o Bitcoin<br/><span className="text-red-600 italic underline decoration-white/10">ainda hoje</span>
          </h1>
          <p className="text-2xl md:text-3xl font-black text-slate-300 leading-tight max-w-2xl tracking-tight">
            Você não precisa entender de economia, programação ou gráficos.
          </p>
        </header>

        <section className="space-y-10 mb-32">
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
            Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura.
          </p>
          <div className="border-l-8 border-red-600 pl-8 py-4">
            <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              É o fim das dúvidas e o início da sua liberdade.
            </p>
          </div>
          <div className="pt-10">
            <p className="italic text-slate-500 text-xl max-w-2xl">
              "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
            </p>
            <p className="text-red-600 font-black uppercase tracking-widest text-xs mt-6">— Lord Junnior</p>
          </div>
        </section>

        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">O que você vai entender</h3>
          <div className="space-y-6">
            {[
              "A história do dinheiro (explicada como uma história, não uma aula).",
              "Por que o Bitcoin vale algo e por que não pode ser copiado.",
              "Como funciona sua \"senha mestre\" e a segurança da rede."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <span className="text-red-600 font-black text-xl">0{idx+1}</span>
                <p className="text-xl font-bold text-white tracking-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CARD CENTRAL: POR QUE ESTE MATERIAL EXISTE */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Por que este material existe</h3>
              <div className="space-y-4 mb-10">
                <p className="text-2xl font-black text-white leading-none uppercase">A queda não é do mercado. <span className="text-red-600 italic">É da consciência.</span></p>
                <p className="text-slate-400 font-medium">
                  A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele. Bitcoin não surge como solução mágica. Surge como explicação tardia.
                </p>
                <p className="text-slate-500 italic text-sm">
                  Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.
                </p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">Gratuito • Sem Cadastro • Sem Iscas</p>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 animate-[pulse_2s_infinite] shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>

            {/* CAPA DO PDF */}
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

        {/* PRÓXIMO NÍVEL */}
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

        {/* FOOTER MANIFESTO */}
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
