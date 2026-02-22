import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Flame, Droplets, Lock, EyeOff, Network, Layers } from 'lucide-react';

export default function Autocustodia() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32">
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        
        <Link to="/arsenal" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.4em]">
          <ArrowLeft size={14} /> Voltar à Central
        </Link>

        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Arquitetura de<br/><span className="text-red-600 italic">Autocustódia</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-3xl leading-relaxed">
            Não basta ter uma seed phrase anotada no papel. Autocustódia real envolve a <span className="text-white border-b border-red-600">camada física</span> (sobrevivência a desastres), criptografia de comunicação e estruturas avançadas de assinatura.
          </p>
        </header>

        {/* CAMADA FÍSICA: O PROBLEMA DO MUNDO REAL */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Layers className="text-red-600" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">Camada Física: O Problema do Mundo Real</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Frágil: Papel */}
            <div className="bg-[#0B0F19]/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-8">
                <span className="bg-zinc-800 text-[10px] font-black px-3 py-1 uppercase tracking-widest text-zinc-500">Frágil</span>
                <span className="text-zinc-700 font-black text-4xl italic opacity-20">ILEGÍVEL</span>
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Papel</h3>
              <p className="text-slate-500 text-sm mb-6">Suscetível a umidade, fogo, insetos e desgaste natural. É uma aposta contra o tempo.</p>
              <div className="flex gap-4 text-zinc-600">
                <Flame size={18} /> <Droplets size={18} />
              </div>
            </div>

            {/* Robusto: Metal */}
            <div className="bg-gradient-to-br from-[#161B22] to-[#0B0F19] border border-red-600/30 p-8 rounded-2xl relative overflow-hidden group shadow-[0_0_30px_rgba(220,38,38,0.05)]">
              <div className="flex justify-between items-start mb-8">
                <span className="bg-red-600 text-[10px] font-black px-3 py-1 uppercase tracking-widest text-white">Robusto</span>
                <span className="text-red-600 font-black text-4xl italic opacity-20">LEGÍVEL</span>
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Metal</h3>
              <p className="text-slate-300 text-sm mb-6">Aço inoxidável ou titânio. Resiste a 1100°C, corrosão e inundações. A única forma de vencer a entropia.</p>
              <div className="flex gap-4 text-red-600">
                <Flame size={18} /> <Droplets size={18} /> <Shield size={18} />
              </div>
            </div>
          </div>

          <blockquote className="text-center text-xl italic text-slate-500 mb-20">
            "No mundo real, o problema não é hacker. É fogo, água e tempo."
          </blockquote>

          {/* ESTRUTURA DE RISCO */}
          <div className="max-w-md mx-auto space-y-4 text-center mb-32">
            <div className="p-4 bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">Mundo Digital (Sua Seed)</div>
            <div className="h-8 w-px bg-red-600 mx-auto"></div>
            <div className="p-6 bg-red-600 text-white font-black uppercase tracking-tighter text-xl italic">Camada Física (O Elo)</div>
            <div className="h-8 w-px bg-red-600 mx-auto"></div>
            <div className="p-4 bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">Mundo Real (Patrimônio)</div>
            <p className="text-xs text-red-600 font-bold mt-4 uppercase tracking-widest">Se a camada física falha, o mundo real destrói o digital.</p>
          </div>
        </section>

        {/* PROTOCOLOS DIGITAIS */}
        <section className="mb-32">
          <h2 className="text-3xl font-black uppercase mb-12 tracking-tighter border-b border-white/5 pb-4">Protocolos Digitais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 bg-[#0B0F19] border border-white/5 hover:border-white/20 transition-all">
              <Lock className="text-red-600 mb-4" size={24} />
              <h4 className="text-lg font-black uppercase mb-2">PGP Encryption</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">Criado em 1991, é a base da comunicação soberana. Garante que apenas o destinatário leia a mensagem.</p>
            </div>
            <div className="p-8 bg-[#0B0F19] border border-white/5 hover:border-white/20 transition-all">
              <Network className="text-red-600 mb-4" size={24} />
              <h4 className="text-lg font-black uppercase mb-2">VPN & TOR</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">Mascare seu tráfego. ISP não precisa saber que você acessa serviços de Bitcoin.</p>
            </div>
            <div className="p-8 bg-[#0B0F19] border border-white/5 hover:border-white/20 transition-all">
              <Shield className="text-red-600 mb-4" size={24} />
              <h4 className="text-lg font-black uppercase mb-2">Multisig (Electrum)</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">Elimine o ponto único de falha. Exija múltiplas chaves em locais físicos distintos.</p>
            </div>
            <div className="p-8 bg-[#0B0F19] border border-white/5 hover:border-white/20 transition-all">
              <EyeOff className="text-red-600 mb-4" size={24} />
              <h4 className="text-lg font-black uppercase mb-2">Wasabi & Coinjoin</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">Quebre o rastro. Embaralhe UTXOs para proteger sua privacidade transacional.</p>
            </div>
          </div>
        </section>

        {/* RODAPÉ DE BLINDAGEM */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <div className="space-y-4 mb-20">
            <p className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Autocustódia não é sobre acreditar.</p>
            <p className="text-red-600 font-black uppercase text-3xl md:text-5xl tracking-tighter italic">É sobre ter certeza.</p>
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 font-black text-[10px] uppercase tracking-[0.8em]">Not your keys, not your money.</p>
            <p className="text-white font-black uppercase text-4xl tracking-tighter">Sempre foi projeto.</p>
            <p className="text-slate-800 text-[10px] font-black mt-16 uppercase tracking-widest">Lord Junnior © 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
