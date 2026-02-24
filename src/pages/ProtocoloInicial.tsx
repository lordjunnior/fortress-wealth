import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, Cpu, History, TrendingDown, Eye, AlertTriangle } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* MANTIDO: Partículas Lord */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <div className="alert-layer"></div>
        <div className="alert-layer alert-layer-2"></div>
      </div>

      <style>{`
        @keyframes driftAlert { 0% { transform: translateY(0); } 100% { transform: translateY(-1000px); } }
        .alert-layer {
          position: absolute; width: 100%; height: 200%;
          background-image: radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.3) 100%, transparent);
          background-size: 200px 200px; animation: driftAlert 50s linear infinite;
        }
        .protocolo-shimmer {
          background: linear-gradient(90deg, #dc2626 0%, #ff6b6b 40%, #ffffff 50%, #ff6b6b 60%, #dc2626 100%);
          background-size: 250% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: protocShimmer 3s linear infinite;
        }
        @keyframes protocShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .card-tatico { border: 1px solid rgba(255,255,255,0.05); background: rgba(11,15,25,0.8); transition: all 0.4s ease; position: relative; overflow: hidden; }
        .card-tatico:hover { border-color: rgba(220,38,38,0.5); transform: translateY(-5px); }
        .bar-grow { animation: barGrow 2s ease-out forwards; transform-origin: bottom; }
        @keyframes barGrow { from { scaleY: 0; } to { scaleY: 1; } }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        {/* HEADER: A FRAUDE FIDUCIÁRIA VS VERDADE DIGITAL */}
        <header className="mb-32">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Manual de Desdoutrinação</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 uppercase">
            A Fraude Fiduciária <br />
            <span className="text-slate-700 italic lowercase">vs.</span> <br />
            <span className="protocolo-shimmer uppercase tracking-tighter">A Verdade Digital</span>
          </h1>
          <p className="text-2xl md:text-4xl font-black text-slate-300 leading-tight max-w-3xl tracking-tight mt-10">
            Você não precisa de bancos. Você precisa de matemática.
          </p>
        </header>

        {/* 01. O QUE É BITCOIN? (FUSÃO TOTAL) */}
        <section className="mb-32 space-y-12">
          <div className="flex items-center gap-4 text-red-600">
            <Zap size={24} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">01. O Antídoto</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-medium">
              <p>
                O Bitcoin é uma moeda digital que oferece transações rápidas e seguras com um suprimento fixo de 21 milhões. É a primeira vez que temos um sistema onde ninguém precisa de permissão para transacionar.
              </p>
              <p>
                Ele funciona como um banco de dados descentralizado chamado blockchain, mantido por milhares de computadores (nós) ao redor do mundo. Nenhuma moeda falsa jamais foi emitida e o banco de dados nunca foi hackeado.
              </p>
            </div>
            <div className="bg-[#0B0F19] p-8 rounded-2xl border border-white/5 border-l-4 border-l-red-600">
              <h4 className="text-white font-black uppercase mb-4 tracking-tighter italic">Como funciona uma transação?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                É uma transferência de valor na blockchain. Usuários usam carteiras para enviar quantias para endereços. Transações são assinadas com chaves privadas e broadcastadas para a rede, onde mineradores as incluem em blocos imutáveis.
              </p>
            </div>
          </div>
        </section>

        {/* 02. CHAVES PÚBLICAS E PRIVADAS (TRIO DA BLINDAGEM) */}
        <section className="mb-32">
          <div className="flex items-center gap-4 text-red-600 mb-12">
            <Lock size={24} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">02. Chaves da Liberdade</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-tatico p-10 rounded-xl">
              <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter italic">Chave Privada</h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Prova a propriedade e assina transações. É o seu segredo mestre. Se você perde a chave e o backup (seed), você perde o acesso para sempre.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-600">
                <ShieldAlert size={14}/> Not your keys, not your money
              </div>
            </div>
            <div className="card-tatico p-10 rounded-xl">
              <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter italic">Chave Pública</h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Derivada da privada, ela é o seu "endereço". Permite que qualquer um verifique sua assinatura e envie fundos sem nunca ver seu segredo.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                <Eye size={14}/> Transparência absoluta na rede
              </div>
            </div>
          </div>
        </section>

        {/* 03. A LEI DOS 21 MILHÕES (GRÁFICO ANIMADO) */}
        <section className="mb-32 bg-[#0B0F19] rounded-3xl border border-white/5 p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Escassez <span className="text-red-600">Absoluta</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                O limite de 21 milhões (Hard Cap) é protegido pelo modelo de governança e incentivos. Mudar isso exigiria consenso de milhares de nós, o que é economicamente suicida para mineradores e usuários.
              </p>
              <ul className="space-y-3 text-sm font-bold uppercase tracking-widest">
                <li className="flex gap-2 text-red-500"><TrendingDown size={16}/> Inflação decrescente (Halvings)</li>
                <li className="flex gap-2 text-slate-300"><History size={16}/> Fim da emissão em ~2140</li>
              </ul>
            </div>
            {/* Gráfico de Barras Animado */}
            <div className="h-48 flex items-end justify-between gap-2 border-b border-white/10 p-4">
              {[100, 50, 25, 12, 6].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="bg-red-600/40 border-t-2 border-red-500 w-full bar-grow origin-bottom" />
              ))}
            </div>
          </div>
        </section>

        {/* 04. SATOSHIS: O PODER DO MICRO */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="p-10 bg-red-950/10 border border-red-900/30 rounded-2xl order-2 md:order-1 relative overflow-hidden">
             <div className="text-6xl font-black text-red-600 mb-2 tracking-tighter">100.000.000</div>
             <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-6 italic">Sats por cada Bitcoin</p>
             <p className="text-slate-400 leading-relaxed font-medium">
               Um bitcoin é divisível em 100 milhões de satoshis. Isso permite microtransações e garante que o Bitcoin seja acessível a todos, independente do preço da unidade inteira. 
             </p>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Acessibilidade <br/> <span className="text-red-600">Soberana</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Você não precisa comprar 1 BTC inteiro. Você acumula Satoshis. Conforme o preço sobe, o "Sat" se tornará a unidade padrão para bens e serviços no dia a dia.
            </p>
          </div>
        </section>

        {/* 05. MITOS NEUTRALIZADOS */}
        <section className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4 italic">Desmontando Mentiras do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { m: "É anônimo", v: "Errado. É pseudônimo e auditável por qualquer pessoa na rede." },
              { m: "Não tem lastro", v: "Lastreado na Matemática e no Custo de Energia." },
              { m: "É inseguro", v: "Blockchain nunca hackeada; usuários é que falham na segurança." },
              { m: "Não tem utilidade", v: "É o banco de dados mais resiliente e imutável da história." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#0B0F19] border border-white/5 group hover:border-red-600 transition-all card-tatico">
                <p className="text-xs text-red-600 font-black uppercase mb-2 tracking-widest italic">Mito {i+1}</p>
                <p className="text-xl font-black uppercase line-through text-slate-700 group-hover:text-red-900 transition-colors mb-4">{item.m}</p>
                <p className="text-white font-bold leading-tight opacity-0 group-hover:opacity-100 transition-all">Verdade: {item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 06. SEGURANÇA E GOLPES (ALERTA VERMELHO) */}
        <section className="mb-32 border-4 border-red-600 bg-red-950/20 p-12 relative overflow-hidden rounded-sm shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-16 -mt-16" size={320} />
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
              <AlertTriangle className="text-red-600 animate-pulse" size={36} /> Blindagem contra Predadores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-bold uppercase text-xs tracking-widest leading-relaxed">
              <div className="space-y-8">
                <p className="text-white"><span className="text-red-600 block mb-2 underline italic text-sm">Engenharia Social</span> Golpistas hackeiam mentes, não redes. Usam urgência, medo e manipulação emocional.</p>
                <p className="text-white"><span className="text-red-600 block mb-2 underline italic text-sm">Phishing e IA</span> Deepfakes de celebridades prometendo lucros são ataques. Ninguém legítimo pede sua SEED.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-black/40 p-6 border border-red-600/30">
                  <h5 className="text-red-600 font-black mb-4 italic">CÓDIGO DE CONDUTA:</h5>
                  <ul className="space-y-3">
                    <li>1. NUNCA revele suas 12/24 palavras.</li>
                    <li>2. SE PARECE BOM DEMAIS, É GOLPE.</li>
                    <li>3. VOCÊ É O RESPONSÁVEL FINAL.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANTIDO: Download Card e Footer */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-40 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Protocolo de Soberania</h3>
              <p className="text-slate-400 font-medium mb-10">Assuma a responsabilidade total. Baixe o guia definitivo para sair da dependência.</p>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>
            <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
              <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-105 transition-all">
                <ShieldCheck className="text-white/20" size={40} />
                <h4 className="text-4xl font-black leading-none uppercase tracking-tighter italic">Soberania</h4>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-20 border-t border-white/5 text-center">
          <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px] mb-12 italic">Not your keys, not your money.</p>
          <div className="space-y-4">
            <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">Sempre foi projeto.</p>
            <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter italic">Soberania exige responsabilidade.</p>
          </div>
          <p className="text-slate-800 text-[10px] font-black mt-20 tracking-[0.5em] uppercase italic">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}