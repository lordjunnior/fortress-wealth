import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Repeat, Landmark, ShieldAlert } from 'lucide-react';

export default function EconomiaParalela() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 relative overflow-hidden">

      {/* Stealth Network Particles - rede P2P invisível */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <div className="p2p-layer"></div>
        <div className="p2p-layer p2p-layer-2"></div>
        <div className="p2p-layer p2p-layer-3"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="p2p-scan"></div>
      </div>
      <style>{`
        @keyframes driftP2P {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-400px) translateX(50px); }
          66% { transform: translateY(-800px) translateX(-30px); }
          100% { transform: translateY(-1200px) translateX(20px); }
        }
        @keyframes scanLine {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.08; }
          90% { opacity: 0.08; }
          100% { top: 110%; opacity: 0; }
        }
        .p2p-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1.5px 1.5px at 12% 22%, rgba(220,38,38,0.25) 100%, transparent),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 50% 40%, rgba(220,38,38,0.2) 100%, transparent),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.1) 100%, transparent),
            radial-gradient(1.5px 1.5px at 88% 30%, rgba(220,38,38,0.3) 100%, transparent);
          background-size: 250px 250px;
          animation: driftP2P 70s linear infinite;
        }
        .p2p-layer-2 {
          background-size: 320px 320px;
          animation: driftP2P 95s linear infinite reverse;
          opacity: 0.6;
        }
        .p2p-layer-3 {
          background-size: 400px 400px;
          animation: driftP2P 130s linear infinite;
          opacity: 0.3;
        }
        .p2p-scan {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent);
          animation: scanLine 8s linear infinite;
        }
      `}</style>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        
        <Link to="/arsenal" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.4em]">
          <ArrowLeft size={14} /> Voltar à Central
        </Link>

        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-4 block">Soberania P2P</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Economia<br/><span className="text-red-600 italic underline decoration-white/10">Paralela</span>
          </h1>
          <p className="text-2xl font-bold text-slate-300 leading-tight max-w-3xl">
            O sistema fiduciário é uma ferramenta, não um destino. Aprenda a entrar e sair dele sem deixar rastros permanentes e sem pedir permissão.
          </p>
        </header>

        {/* SEÇÃO 01: O MOTOR BISQ */}
        <section className="mb-32">
          <div className="bg-[#0B0F19] border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter italic">BISQ: A Saída de Emergência</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                  BISQ é um software open-source, não um site. Ele conecta compradores e vendedores via Tor. Não há CEO, não há conta bancária central, não há KYC.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black italic shrink-0">!</div>
                    <p className="text-sm text-slate-300"><strong className="text-white uppercase">Fiat (BRL):</strong> O dinheiro viaja entre contas bancárias (PIX/TED). O estado vê a transferência, mas não o motivo.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-black italic shrink-0">!</div>
                    <p className="text-sm text-slate-300"><strong className="text-white uppercase">Bitcoin (BTC):</strong> Travado em Multisig 2-de-2. A matemática garante a entrega, não a confiança.</p>
                  </div>
                </div>
                <button className="bg-white text-black font-black px-10 py-5 rounded-none text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 animate-pulse">
                  <Download size={18} /> Baixar Guia BISQ
                </button>
              </div>
              <div className="bg-[#070A12] border border-white/5 p-8 rounded-xl">
                 <div className="text-[10px] font-black text-slate-600 uppercase mb-8 tracking-widest text-center">Protocolo de Segurança BISQ</div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-full h-12 border border-dashed border-slate-700 flex items-center justify-center text-[10px] uppercase font-black text-slate-500 italic">Usuário A (Comprador)</div>
                    <div className="h-8 w-px bg-red-600"></div>
                    <div className="w-20 h-20 rounded-full border-2 border-red-600 flex items-center justify-center text-red-600 font-black italic text-xs text-center px-2">Multisig 2-de-2</div>
                    <div className="h-8 w-px bg-red-600"></div>
                    <div className="w-full h-12 border border-dashed border-slate-700 flex items-center justify-center text-[10px] uppercase font-black text-slate-500 italic">Usuário B (Vendedor)</div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 02: ECONOMIA CIRCULAR */}
        <section className="mb-32">
          <h2 className="text-3xl font-black uppercase mb-12 tracking-tighter">Trocas Voluntárias e Circularidade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-zinc-900 border border-white/5 hover:border-red-600/30 transition-all">
              <Repeat className="text-red-600 mb-6" size={32} />
              <h4 className="text-xl font-black uppercase mb-4 tracking-tight italic">O Fim do Intermediário</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                A melhor forma de obter BTC é oferecendo bens e serviços por ele. Isso cria uma economia circular que ignora completamente o sistema bancário. Se você é designer, programador ou marceneiro: <strong className="text-white">cobre em Sats.</strong>
              </p>
            </div>
            <div className="p-10 bg-zinc-900 border border-white/5 hover:border-red-600/30 transition-all">
              <Landmark className="text-zinc-600 mb-6" size={32} />
              <h4 className="text-xl font-black uppercase mb-4 tracking-tight italic text-zinc-500 underline decoration-red-600/50">Vigilância Passiva</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Entenda que toda transação bancária é vigiada e armazenada para sempre. O PIX não é de graça; o preço é a sua privacidade absoluta.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 03: MATRIZ DE OPSEC */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <ShieldAlert className="text-red-600" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight italic text-red-600 underline decoration-white/20">Protocolos de Silêncio e Compartimentação</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-white/5 bg-[#0B0F19] group">
              <h5 className="font-black uppercase text-xs text-red-600 mb-4 tracking-widest italic">01. Silêncio</h5>
              <p className="text-sm text-slate-400 font-bold leading-relaxed italic">Não fale sobre suas posses. No mundo real, o maior risco de ataque não é o hacker, é o sequestrador.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#0B0F19] group">
              <h5 className="font-black uppercase text-xs text-red-600 mb-4 tracking-widest italic">02. Identidade</h5>
              <p className="text-sm text-slate-400 font-bold leading-relaxed italic">Use e-mails específicos e dedicados para suas operações. Compartimentação é a chave para não ser rastreado.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#0B0F19] group">
              <h5 className="font-black uppercase text-xs text-red-600 mb-4 tracking-widest italic">03. OpSec Física</h5>
              <p className="text-sm text-slate-400 font-bold leading-relaxed italic">Nunca instale aplicativos de carteiras "quentes" em aparelhos que você carrega na rua vinculados ao seu rosto ou digital.</p>
            </div>
          </div>
        </section>

        {/* RODAPÉ DE BLINDAGEM FINAL */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <div className="space-y-6">
            <p className="text-slate-600 font-black text-xs uppercase tracking-[0.8em] mb-12 italic">Not your keys, not your money.</p>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Quem não assume a custódia aceita a dependência.</p>
              <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter">Autocustódia exige responsabilidade.</p>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest mb-4">Lembrem-se: Dependência financeira nunca foi acidente.</p>
            <p className="text-white font-black uppercase text-5xl md:text-7xl tracking-tighter leading-none italic">Sempre foi projeto.</p>
            <p className="text-slate-900 text-[10px] font-black mt-20 uppercase tracking-[0.5em]">Lord Junnior © 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
