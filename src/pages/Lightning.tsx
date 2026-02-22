import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Zap, Layers, Repeat, Smartphone, Coffee, ZapOff } from 'lucide-react';

export default function Lightning() {
  const { scrollY } = useScroll();
  
  const xLeft = useTransform(scrollY, [0, 1000], [-100, 100]);
  const xRight = useTransform(scrollY, [0, 1000], [100, -100]);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-yellow-500 pb-32 overflow-x-hidden">
      
      {/* LINHAS DE VELOCIDADE LUZ (BACKGROUND) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <motion.div style={{ x: xLeft }} className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <motion.div style={{ x: xRight }} className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <motion.div style={{ x: xLeft }} className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/arsenal" className="group inline-flex items-center gap-2 text-slate-600 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.4em]">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Voltar à Central</span>
          </Link>
        </motion.div>

        <header className="mb-32">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-yellow-500 font-black uppercase tracking-[0.6em] text-[10px] mb-6 block"
          >
            Protocolo de Alta Frequência
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8 leading-[0.8] italic">
            Lightning<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 italic">No Bolso</span>
          </h1>
          <p className="text-2xl font-medium text-slate-400 max-w-3xl leading-tight">
            O Bitcoin L1 é o tribunal final: lento e caro. Para a rua, precisamos de <span className="text-white border-b border-yellow-500/50 italic">velocidade luz</span> e soberania instantânea.
          </p>
        </header>

        {/* SEÇÃO 01: O TRIBUNAL VS A RUA */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-10 bg-[#0B0F19]/40 border border-white/5 group">
            <h3 className="text-zinc-600 font-black uppercase text-xs tracking-widest mb-6 italic">Layer 1: O Tribunal</h3>
            <p className="text-3xl font-black uppercase tracking-tighter text-zinc-500 mb-4">Lento. Seguro. Caro.</p>
            <p className="text-sm text-slate-600 font-medium">Arbitragem final. Liquidação de grandes volumes. Ouro digital.</p>
          </div>
          <div className="p-10 bg-yellow-500/5 border border-yellow-500/20 group">
            <h3 className="text-yellow-500 font-black uppercase text-xs tracking-widest mb-6 italic">Layer 2: A Rua</h3>
            <p className="text-3xl font-black uppercase tracking-tighter text-white mb-4">Instantâneo. Privado. Barato.</p>
            <p className="text-sm text-slate-400 font-medium">Transações do dia a dia. Café, serviços, circularidade. Moeda de troca.</p>
          </div>
        </section>

        {/* SEÇÃO 02: MECÂNICA DE CANAIS */}
        <section className="mb-40 py-20 border-y border-white/5 relative overflow-hidden">
          <h2 className="text-center text-4xl font-black uppercase tracking-tighter mb-20 italic">Infraestrutura de Canais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-zinc-900 border border-white/10 mx-auto flex items-center justify-center group-hover:border-yellow-500 transition-colors">
                <Layers size={24} className="text-yellow-500" />
              </div>
              <h4 className="font-black uppercase text-xs tracking-widest">Abertura</h4>
              <p className="text-[10px] text-slate-500 font-bold px-4 uppercase leading-relaxed italic">Contrato Multisig travado na Blockchain.</p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                 <Zap size={100} className="text-yellow-500" />
              </div>
              <h4 className="font-black uppercase text-xl tracking-tighter mb-4 italic">Roteamento Onion</h4>
              <p className="text-xs text-slate-400 font-medium px-4">Intermediários não sabem quem paga nem quem recebe. Privacidade por padrão.</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-zinc-900 border border-white/10 mx-auto flex items-center justify-center group-hover:border-yellow-500 transition-colors">
                <Repeat size={24} className="text-yellow-500" />
              </div>
              <h4 className="font-black uppercase text-xs tracking-widest">Fechamento</h4>
              <p className="text-[10px] text-slate-500 font-bold px-4 uppercase leading-relaxed italic">Só o saldo final é liquidado no Tribunal L1.</p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 03: A ESCOLHA DA ARMA */}
        <section className="mb-40">
          <h2 className="text-3xl font-black uppercase mb-16 tracking-tighter italic text-center">A Escolha da Arma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div whileHover={{ y: -5 }} className="bg-[#0B0F19] p-12 border border-white/5 relative group grayscale hover:grayscale-0 transition-all">
              <div className="flex justify-between items-start mb-12">
                <Coffee size={32} className="text-zinc-600" />
                <span className="text-red-900 font-black text-[10px] uppercase tracking-widest">Risco Máximo</span>
              </div>
              <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter italic">Custodial</h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">Wallet of Satoshi. Se o servidor cair, você é apenas um passageiro sem bilhete. Seus sats não são seus.</p>
              <div className="flex items-center gap-3 text-red-900 opacity-50">
                 <ZapOff size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Dependência do Sistema</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-yellow-500/10 to-transparent p-12 border border-yellow-500/30 relative group shadow-[0_0_50px_rgba(234,179,8,0.05)]">
              <div className="flex justify-between items-start mb-12">
                <Smartphone size={32} className="text-yellow-500" />
                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-widest animate-pulse">Soberania Total</span>
              </div>
              <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter italic">Non-Custodial</h3>
              <p className="text-slate-300 mb-8 leading-relaxed font-bold italic">Phoenix / Zeus. As chaves moram no seu dispositivo. Ninguém, nem o desenvolvedor, pode congelar seus fundos.</p>
              <div className="flex items-center gap-3 text-yellow-500">
                 <Zap size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Independência Absoluta</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER MANIFESTO */}
        <footer className="pt-40 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              Quem facilita a custódia,<br/>facilita a <span className="text-yellow-500 underline decoration-white/20">censura.</span>
            </h2>
            
            <div className="pt-32 space-y-4">
              <p className="text-slate-600 font-black text-xs uppercase tracking-[0.8em] italic">Not your keys, not your money.</p>
              <p className="text-white font-black uppercase text-4xl md:text-6xl tracking-tighter">Sempre foi projeto.</p>
              <p className="text-slate-900 text-[10px] font-black uppercase mt-20 tracking-[0.5em]">Lord Junnior © 2026</p>
            </div>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}
