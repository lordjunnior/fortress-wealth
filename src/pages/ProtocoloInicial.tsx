import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, TrendingDown } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* MANTIDO: Sistema de Partículas e Alerta Original */}
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
          100% { transform: translateY(-1000px) translateX(0px); }
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.04; transform: scale(1.2); }
        }
        @keyframes barGrow { from { scaleY: 0; } to { scaleY: 1; } }
        .alert-layer {
          position: absolute; width: 100%; height: 200%;
          background-image: radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent);
          background-size: 200px 200px; animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 { animation: driftAlert 70s linear infinite reverse; opacity: 0.6; }
        .alert-layer-3 { animation: driftAlert 100s linear infinite; opacity: 0.3; }
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
        .card-blindado { border: 1px solid rgba(255,255,255,0.05); transition: all 0.5s ease; }
        .card-blindado:hover { border-color: rgba(220,38,38,0.5); background: rgba(220,38,38,0.02); transform: translateY(-5px); }
        .shimmer-card::after {
          content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent, rgba(220,38,38,0.1), transparent);
          transform: rotate(45deg); animation: shimmerMove 4s infinite;
        }
        @keyframes shimmerMove { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(100%) rotate(45deg); } }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        {/* HEADER: A FRAUDE FIDUCIÁRIA VS VERDADE DIGITAL */}
        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Blindagem para Leigos</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 uppercase">
            A Fraude Fiduciária <br />
            <span className="text-slate-700 italic lowercase">vs.</span> <br />
            <span className="protocolo-shimmer uppercase">A Verdade Digital</span>
          </h1>
          <p className="text-2xl md:text-3xl font-black text-slate-300 leading-tight max-w-2xl tracking-tight mt-8">
            O dinheiro que você conhece é uma dívida que nunca será paga. O Bitcoin é a primeira descoberta da escassez absoluta.
          </p>
        </header>

        {/* TRIO DA BLINDAGEM: CARDS DE ELITE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <div className="p-8 rounded-xl bg-[#0B0F19] card-blindado shimmer-card relative overflow-hidden group">
            <Zap className="text-orange-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-black uppercase italic mb-4">Conceito</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Não é 'moeda digital' para especular. É a separação entre Dinheiro e Estado. Ponto a Ponto. Sem permissão.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[#0B0F19] card-blindado shimmer-card relative overflow-hidden group">
            <Lock className="text-green-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-black uppercase italic mb-4">Valor</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Imutabilidade matemática. 21 milhões. O primeiro dinheiro na história que não tem um dono para destruí-lo.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[#0B0F19] card-blindado shimmer-card relative overflow-hidden group">
            <ShieldCheck className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-black uppercase italic mb-4">Ação</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Troque papel podre por propriedade real. Mas entenda: se as chaves não são suas, o Bitcoin também não é.
            </p>
          </div>
        </div>

        {/* GRÁFICO DE ESCASSEZ: A LEI DOS 21 MILHÕES */}
        <div className="bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-16 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">A Lei dos <span className="text-red-600">21 Milhões</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Diferente do Banco Central, que pode imprimir trilhões em uma tarde, a oferta de Bitcoin é cravada na física. É o dinheiro lastreado na termodinâmica.
              </p>
              <div className="flex gap-8">
                <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Ano Final</p><p className="text-2xl font-black italic">2140</p></div>
                <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Limite</p><p className="text-2xl font-black italic">21.000.000</p></div>
              </div>
            </div>
            {/* Animação de Barras de Halving */}
            <div className="h-48 flex items-end justify-between gap-2 border-b border-white/10">
              {[100, 50, 25, 12, 6].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="bg-red-600/40 border-t border-red-500 w-full origin-bottom" />
              ))}
            </div>
          </div>
        </div>

        {/* NEUTRALIZAÇÃO DE MITOS */}
        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">Neutralizando Mitos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { m: "Bitcoin é anônimo", v: "É pseudônimo e auditável." },
              { m: "Não tem lastro", v: "Lastreado na Matemática e Energia." },
              { m: "Pode ser hackeado", v: "A rede é imune; o usuário é o elo fraco." },
              { m: "É difícil de usar", v: "É o único dinheiro 100% seu." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-900/30 border border-white/5 group hover:border-red-600/50 transition-all">
                <p className="text-lg font-black uppercase line-through opacity-40 group-hover:text-red-900">{item.m}</p>
                <p className="text-white font-bold tracking-tight mt-2 opacity-0 group-hover:opacity-100 transition-all">→ {item.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MANTIDO: Sistema de Download Original */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Protocolos de Soberania</h3>
              <p className="text-slate-400 font-medium mb-10">
                A queda não é do mercado. É da consciência. Baixe o guia definitivo para assumir sua responsabilidade.
              </p>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>
            <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
              <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-105 transition-all">
                <ShieldCheck className="text-white/20" size={40} />
                <h4 className="text-3xl font-black leading-none uppercase tracking-tighter italic mb-2">Soberania</h4>
              </div>
            </div>
          </div>
        </div>

        {/* ALERTA: BLINDAGEM CONTRA GOLPES */}
        <div className="mb-40 p-10 border-2 border-red-600 bg-red-950/10 rounded-2xl relative overflow-hidden">
          <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-10 -mt-10" size={240} />
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3"><ShieldAlert className="text-red-600" /> Blindagem contra Golpes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold text-sm tracking-widest uppercase">
            <p className="text-slate-400"><span className="text-white block mb-1 underline">A Seed é Sagrada</span> Ninguém legítimo pedirá suas 12/24 palavras.</p>
            <p className="text-slate-400"><span className="text-white block mb-1 underline">Urgência é Roubo</span> Golpistas usam o medo para roubar sua razão.</p>
          </div>
        </div>

        {/* MANTIDO: Footer Manifesto Original */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px] mb-12">Not your keys, not your money.</p>
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic">Sempre foi projeto.</p>
          <p className="text-red-600 font-black uppercase text-xl tracking-tighter italic">Dependência financeira não é acidente.</p>
          <p className="text-slate-800 text-[10px] font-black mt-20 tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}