import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Lock, Globe, Cpu, Zap, ArrowRight, ArrowLeft, ShieldCheck, Database, Key, AlertTriangle } from 'lucide-react';

export default function Arsenal() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 relative overflow-hidden">

      {/* MANTIDO: Tactical Radar Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="radar-layer"></div>
        <div className="radar-layer radar-layer-2"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="radar-sweep"></div>
      </div>
      <style>{`
        @keyframes driftRadar { 0% { transform: translateY(0); } 100% { transform: translateY(-1000px); } }
        @keyframes radarSweep { 0% { transform: rotate(0deg); opacity: 0.04; } 100% { transform: rotate(360deg); opacity: 0.04; } }
        .radar-layer {
          position: absolute; width: 100%; height: 200%;
          background-image: radial-gradient(2px 2px at 20% 15%, rgba(220,38,38,0.3) 100%, transparent);
          background-size: 200px 200px; animation: driftRadar 55s linear infinite;
        }
        .radar-layer-2 { animation: driftRadar 80s linear infinite reverse; opacity: 0.5; }
        .radar-sweep {
          position: absolute; top: 50%; left: 50%; width: 600px; height: 600px; margin: -300px 0 0 -300px;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(220,38,38,0.06) 30deg, transparent 60deg);
          border-radius: 50%; animation: radarSweep 12s linear infinite;
        }
        .glow-red:hover { box-shadow: 0 0 20px rgba(220,38,38,0.2); border-color: rgba(220,38,38,0.5); }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <header className="mb-20">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4 leading-none italic">CENTRAL DE <br/><span className="text-red-600">OPERAÇÕES</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">Domínio Técnico e Defesa de Ativos</p>
        </header>

        {/* CARD MASTER: PROTOCOLO INICIAL (MANTIDO) */}
        <section className="mb-16">
          <Link to="/protocolo-inicial" className="group block">
            <div className="bg-red-600 p-12 md:p-20 rounded-none relative overflow-hidden transition-all duration-500 hover:bg-white">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform text-black">
                <ShieldAlert size={220} />
              </div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 italic text-black leading-none">PROTOCOLO INICIAL</h2>
                <p className="text-black font-black text-xl md:text-2xl max-w-2xl leading-tight mb-8">
                  Neutralize o tédio e a mentira. Aprenda por que o limite de 21 milhões é a lei suprema e como sua semente (seed) é seu único exército.
                </p>
                <div className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 font-black text-xs uppercase tracking-[0.3em] group-hover:bg-red-600 transition-all">
                  REPROGRAMAR CONSCIÊNCIA <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* OS QUATRO PILARES REABASTECIDOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          
          <Link to="/autocustodia" className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all group glow-red">
            <Lock className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Arquitetura de Autocustódia</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest mb-4">A posse real das chaves.</p>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase">Use chaves privadas para provar propriedade e assinar transações sem intermediários.</p>
          </Link>

          <Link to="/economia-paralela" className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all group glow-red">
            <Globe className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Economia Paralela</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest mb-4">Privacidade e P2P.</p>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase">O Bitcoin é pseudônimo, não anônimo. Proteja seu rastro através de transações diretas.</p>
          </Link>

          <Link to="/infraestrutura" className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all group glow-red">
            <Cpu className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Rede de Validação</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest mb-4">Rodando seu próprio nó.</p>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase">Seja o auditor da rede. Verifique cada transação e garanta o limite de 21 milhões.</p>
          </Link>

          <Link to="/lightning" className="bg-[#0B0F19] border border-white/5 p-10 hover:border-red-600/50 transition-all group glow-red">
            <Zap className="text-red-600 mb-8" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Lightning no Bolso</h3>
            <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-widest mb-4">Microtransações em Sats.</p>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase">Transfira frações de centavo instantaneamente. O Satoshi é a unidade do futuro soberano.</p>
          </Link>

        </div>

        {/* NOVO: MÓDULO DE DEFESA CONTRA PREDADORES */}
        <div className="bg-red-950/10 border-2 border-red-600 p-10 md:p-16 relative overflow-hidden group">
          <AlertTriangle className="absolute top-0 right-0 text-red-600/5 -mr-12 -mt-12 group-hover:scale-110 transition-transform" size={300} />
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 italic flex items-center gap-4">
              <ShieldAlert size={32} className="text-red-600" /> BLINDAGEM CONTRA GOLPES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
                  <span className="text-red-600 underline">Engenharia Social:</span> Hackers não quebram o SHA-256, eles quebram sua confiança usando medo e urgência.
                </p>
                <p className="text-sm font-black uppercase tracking-widest leading-relaxed">
                  <span className="text-red-600 underline">A Regra de Ouro:</span> Ninguém legítimo jamais pedirá suas 12/24 palavras (Seed Phrase). Se pedirem, é roubo.
                </p>
              </div>
              <div className="bg-black/50 p-8 border border-red-600/30 font-bold text-xs uppercase tracking-[0.2em] leading-loose">
                A blockchain nunca foi hackeada. A segurança individual depende da sua higiene digital: use Cold Storage, autenticação 2FA por app e nunca clique em links suspeitos.
              </div>
            </div>
          </div>
        </div>

        {/* PROJETO AUTÔNOMO - MÓDULO DE RESILIÊNCIA */}
        <Link to="/projeto-autonomo" className="block mt-16 group">
          <div className="bg-gradient-to-r from-orange-950/30 to-amber-950/20 border-2 border-orange-600/40 p-12 md:p-16 relative overflow-hidden hover:border-orange-500 transition-all duration-500">
            <ShieldCheck className="absolute top-0 right-0 text-orange-600/5 -mr-8 -mt-8 group-hover:scale-110 transition-transform" size={250} />
            <div className="relative z-10">
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Módulo de Resiliência</p>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-6 leading-none">PROJETO <span className="text-orange-500">AUTÔNOMO</span></h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider leading-relaxed max-w-2xl mb-8">
                Base 72 · Autonomia Biológica · Soberania Alimentar — Preparação real para quando o sistema falhar.
              </p>
              <div className="inline-flex items-center gap-4 bg-orange-600 text-black px-10 py-5 font-black text-xs uppercase tracking-[0.3em] group-hover:bg-white transition-all">
                ACESSAR PROTOCOLO <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>

        {/* RODAPÉ DE BLINDAGEM (MANTIDO) */}
        <div className="mt-32 pt-16 border-t border-white/5 text-right">
            <p className="text-white font-black uppercase text-xl tracking-tighter italic opacity-40">Not your keys, not your money.</p>
        </div>
      </div>
    </div>
  );
}
