import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Lock, Globe, Cpu, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Arsenal() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.3em]">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <header className="mb-20">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4 leading-none">CENTRAL DE <span className="text-red-600">OPERAÇÕES</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">Arsenal Técnico e Protocolos de Defesa</p>
        </header>

        {/* CARD MASTER: O PROTOCOLO INICIAL */}
        <section className="mb-12">
          <Link to="/protocolo-inicial" className="group block">
            <div className="bg-red-600 p-12 md:p-20 rounded-none relative overflow-hidden transition-all duration-500 hover:bg-white group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform text-black">
                <ShieldAlert size={220} />
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 italic text-black">PROTOCOLO INICIAL</h2>
                <p className="text-black font-black text-xl md:text-2xl max-w-2xl leading-tight mb-8">
                  A blindagem mental necessária antes de tocar em qualquer ferramenta. Onde o leigo deixa de ser alvo.
                </p>
                <div className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 font-black text-xs uppercase tracking-[0.3em] group-hover:bg-red-600 transition-all">
                  INICIAR REPROGRAMAÇÃO <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* OS QUATRO PILARES TÉCNICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all group cursor-help">
            <Lock className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Arquitetura de Autocustódia</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest">Cold Wallets, PGP, Multisig & Wasabi.</p>
          </div>

          <div className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all cursor-help">
            <Globe className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Economia Paralela</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest">Mercados BISQ, P2P & OpSec.</p>
          </div>

          <div className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all cursor-help">
            <Cpu className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Rodando com o Urso Dov</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest">Full Nodes, Hardware & Validação.</p>
          </div>

          <div className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all cursor-help">
            <Zap className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Lightning no Bolso</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest">Camada 2, Phoenix & Velocidade.</p>
          </div>

        </div>

        {/* RODAPÉ DE BLINDAGEM */}
        <div className="mt-32 pt-16 border-t border-white/5 text-right">
            <p className="text-white font-black uppercase text-xl tracking-tighter italic opacity-40">Not your keys, not your money.</p>
        </div>
      </div>
    </div>
  );
}
