import React from 'react';
import { ArrowLeft, Download, ArrowRight, Key, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import coverImage from '@/assets/cover-silencio-queda.jpg';

const SilencioQueda: React.FC = () => {
  const handleDownload = () => {
    alert("Iniciando o download do Material Autoral...");
  };

  return (
    <div className="min-h-screen bg-[#070A12] pt-28 pb-12 px-4 animate-fade-in font-sans relative overflow-hidden">

      {/* Ink/Literary Particles - páginas caindo */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="ink-layer"></div>
        <div className="ink-layer ink-layer-2"></div>
        <div className="ink-layer ink-layer-3"></div>
      </div>
      <style>{`
        @keyframes driftInk {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          100% { transform: translateY(-1000px) translateX(50px) rotate(2deg); }
        }
        .ink-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1.5px 1.5px at 10% 20%, rgba(234,179,8,0.25) 100%, transparent),
            radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 55% 30%, rgba(234,179,8,0.2) 100%, transparent),
            radial-gradient(1px 1px at 75% 70%, rgba(255,255,255,0.1) 100%, transparent),
            radial-gradient(1.5px 1.5px at 90% 45%, rgba(234,179,8,0.15) 100%, transparent);
          background-size: 240px 240px;
          animation: driftInk 55s linear infinite;
        }
        .ink-layer-2 {
          background-size: 320px 320px;
          animation: driftInk 75s linear infinite reverse;
          opacity: 0.6;
        }
        .ink-layer-3 {
          background-size: 400px 400px;
          animation: driftInk 100s linear infinite;
          opacity: 0.3;
        }
      `}</style>
       
       {/* Navegação */}
       <div className="max-w-6xl mx-auto mb-8">
         <Link to="/" className="text-slate-500 hover:text-gold-500 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar ao Início
         </Link>
       </div>

       {/* O CARD GIGANTE (Módulo Central) */}
       <main className="max-w-6xl mx-auto bg-[#0B0F19] border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mb-16">
          
          {/* Efeitos de Luz de Fundo do Card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* PARTE SUPERIOR DO CARD: Capa + Hero Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 mb-20">
             
             {/* Coluna Esquerda: Mockup da Capa do Livro */}
             <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                   <img src={coverImage} alt="O Silêncio da Queda - Entenda o Bitcoin" className="w-full h-full object-cover" />
                </div>
             </div>

             {/* Coluna Direita: Argumentação e CTA */}
             <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest border border-gold-500/20 px-3 py-1.5 rounded bg-gold-500/5 w-fit mb-6">
                  Para Leigos Absolutos
                </span>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-8">
                  Entenda o Bitcoin <br/>
                  <span className="text-slate-400 italic font-normal">— ainda hoje</span>
                </h1>

                <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light mb-10">
                  <p>
                    Você não precisa entender de economia, programação ou gráficos.
                  </p>
                  <p>
                    Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura.
                  </p>
                  <p className="text-xl text-white font-medium border-l-2 border-gold-500 pl-6 py-2 bg-gold-500/5 rounded-r-lg">
                    É o fim das dúvidas e o início da sua liberdade.
                  </p>
                </div>

                <blockquote className="border-l-4 border-slate-700 pl-6 mb-12">
                   <p className="text-slate-400 italic mb-4 relative z-10 text-base">
                     "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
                   </p>
                   <footer className="text-gold-500 font-bold text-xs tracking-widest uppercase">
                     — Lord Junnior
                   </footer>
                </blockquote>

                {/* Botão Pulsante */}
                 <button
                   onClick={handleDownload}
                   className="relative w-full sm:w-auto bg-white text-black font-black py-5 px-14 rounded-xl transition-all transform hover:-translate-y-1 hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                 >
                   <Download className="w-5 h-5" /> Baixar PDF Gratuito
                 </button>
             </div>
          </div>

          {/* PARTE INFERIOR DO CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/5 relative z-10">
             
             <div>
                <h3 className="text-2xl font-serif text-white mb-8">O que você vai entender</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                     <div className="mt-1 bg-black p-1 rounded-full border border-white/10 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-gold-500" />
                     </div>
                     <p className="text-slate-300">A história do dinheiro (explicada como uma história, não uma aula).</p>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="mt-1 bg-black p-1 rounded-full border border-white/10 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-gold-500" />
                     </div>
                     <p className="text-slate-300">Por que o Bitcoin vale algo e por que não pode ser copiado.</p>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="mt-1 bg-black p-1 rounded-full border border-white/10 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-gold-500" />
                     </div>
                     <p className="text-slate-300">Como funciona sua "senha mestre" e a segurança da rede.</p>
                  </li>
                </ul>
             </div>

             <div className="bg-black/30 p-8 rounded-2xl border border-white/5">
                <h3 className="text-2xl font-serif text-white mb-6">Por que este material existe</h3>
                <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                   <p>A queda não é do mercado. <strong className="text-white">É da consciência.</strong></p>
                   <p>A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele.</p>
                   <div className="pl-4 border-l-2 border-gold-500/50 py-1 my-4">
                     <p className="text-white">Bitcoin não surge como solução mágica.</p>
                     <p className="text-slate-400">Surge como explicação tardia.</p>
                   </div>
                   <p>Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.</p>
                   <p className="mt-6 pt-6 border-t border-white/5 italic">
                     Este material é gratuito, não exige cadastro e não é uma "isca" para vender curso. Baixe, leia e tire suas conclusões.
                   </p>
                </div>
             </div>

          </div>
       </main>

       {/* Next Steps */}
       <div className="max-w-3xl mx-auto text-center py-12">
          <div className="inline-flex p-4 rounded-2xl bg-[#0B0F19] border border-white/5 mb-6 shadow-lg">
             <Key className="w-6 h-6 text-gold-500" />
          </div>
          <h3 className="text-3xl font-serif text-white mb-4">Próximo Nível</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-base leading-relaxed">
            Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática.
          </p>
          <Link to="/educacao" className="inline-flex items-center gap-3 text-gold-500 hover:text-gold-400 font-bold uppercase tracking-widest text-sm border-b border-gold-500/30 pb-2 hover:border-gold-500 transition-all group">
             Ir para o Arsenal Técnico <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
       </div>

       {/* Footer Soberano */}
       <footer className="max-w-6xl mx-auto text-center pt-12 border-t border-white/5 space-y-6 mt-8 mb-12">
          <p className="text-2xl font-serif text-white opacity-80">Not your keys, not your money.</p>
          <div className="text-slate-500 text-sm space-y-1 opacity-80">
            <p>Quem não assume a custódia aceita a dependência.</p>
            <p>Autocustódia exige responsabilidade.</p>
          </div>
          <div className="w-12 h-[1px] bg-white/10 mx-auto my-6"></div>
          <p className="text-gold-600/80 text-sm font-medium">
            Dependência financeira nunca foi acidente. Sempre foi projeto.
          </p>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-4">
            Lord Junnior © 2026
          </p>
          <div className="flex items-center justify-center gap-6 pt-8 pb-4">
            <Link to="#" className="text-xs text-slate-600 hover:text-gold-500 uppercase tracking-wider transition-colors">Termos</Link>
            <span className="text-slate-800">•</span>
            <Link to="#" className="text-xs text-slate-600 hover:text-gold-500 uppercase tracking-wider transition-colors">Privacidade</Link>
            <span className="text-slate-800">•</span>
            <Link to="#" className="text-xs text-slate-600 hover:text-gold-500 uppercase tracking-wider transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> PGP
            </Link>
          </div>
       </footer>
    </div>
  );
};

export default SilencioQueda;
