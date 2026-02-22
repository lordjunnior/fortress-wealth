import React from 'react';
import { ArrowLeft, Download, ArrowRight, Key, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SilencioQueda: React.FC = () => {
  const handleDownload = () => {
    alert("Iniciando download do seu material autoral...");
  };

  return (
    <div className="min-h-screen bg-[#070A12] pt-28 pb-12 px-4 animate-fade-in font-sans">
       
       {/* Navegação */}
       <div className="max-w-3xl mx-auto mb-12">
         <Link to="/" className="text-slate-500 hover:text-gold-500 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar ao Início
         </Link>
       </div>

       {/* Hero Content */}
       <div className="max-w-3xl mx-auto space-y-8 mb-16 border-b border-white/5 pb-12">
          <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest border border-gold-500/20 px-3 py-1.5 rounded bg-gold-500/5">
            Para Leigos Absolutos
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            Entenda o Bitcoin <br/>
            <span className="text-slate-500 italic font-normal text-3xl md:text-5xl">— ainda hoje</span>
          </h1>
          
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
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
       </div>

       {/* Bloco de Citação */}
       <div className="max-w-3xl mx-auto mb-16">
          <blockquote className="bg-[#0B0F19] border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 p-24 bg-gold-500/5 blur-[80px] rounded-full pointer-events-none"></div>
             <p className="text-slate-400 italic mb-8 relative z-10 leading-relaxed text-lg">
               "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
             </p>
             <footer className="text-gold-500 font-bold text-sm tracking-widest relative z-10 uppercase flex items-center gap-3">
               <span className="w-8 h-[1px] bg-gold-500/50"></span> Lord Junnior
             </footer>
          </blockquote>
       </div>

       {/* O que você vai entender */}
       <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-8">O que você vai entender</h2>
          <div className="grid gap-4">
            {[
              "A história do dinheiro (explicada como uma história, não uma aula).",
              "Por que o Bitcoin vale algo e por que não pode ser copiado.",
              "Como funciona sua \"senha mestre\" e a segurança da rede."
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start p-6 border border-white/5 rounded-xl bg-[#0B0F19] hover:border-gold-500/30 transition-colors group">
                 <span className="text-3xl font-serif text-slate-700 font-bold leading-none select-none group-hover:text-gold-500/50 transition-colors">0{idx + 1}.</span>
                 <p className="text-slate-300 pt-1 text-lg">{item}</p>
              </div>
            ))}
          </div>
       </div>

       {/* Por que este material existe & CTA */}
       <div className="max-w-3xl mx-auto mb-20">
          <div className="p-8 md:p-12 bg-gradient-to-br from-[#0B0F19] to-black border border-white/10 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-white mb-10">Por que este material existe</h2>
              <div className="space-y-6 text-slate-400 leading-relaxed mb-12 text-lg">
                <p>A queda não é do mercado. <strong className="text-white">É da consciência.</strong></p>
                <p>A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele.</p>
                <div className="pl-6 border-l border-gold-500/50 py-2">
                  <p className="text-white">Bitcoin não surge como solução mágica.</p>
                  <p className="text-slate-400">Surge como explicação tardia.</p>
                </div>
                <p>Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.</p>
              </div>

              <div className="bg-black/50 rounded-2xl p-8 border border-white/5 backdrop-blur-sm text-center">
                <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
                  Este material é gratuito, não exige cadastro e não é uma "isca" para vender curso. Baixe, leia e tire suas conclusões.
                </p>
                
                {/* Botão com Efeito Pulsante (Glow Animado) */}
                <div className="relative inline-block w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gold-500 rounded-xl blur opacity-40 animate-pulse"></div>
                  <button
                    onClick={handleDownload}
                    className="relative w-full sm:w-auto mx-auto bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-10 rounded-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-wide text-sm shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                  >
                    <Download className="w-5 h-5" /> Baixar PDF Gratuito
                  </button>
                </div>
              </div>
            </div>
          </div>
       </div>

       {/* Next Steps */}
       <div className="max-w-3xl mx-auto text-center py-16 border-t border-white/5">
          <div className="inline-flex p-5 rounded-2xl bg-[#0B0F19] border border-white/5 mb-8">
             <Key className="w-8 h-8 text-gold-500" />
          </div>
          <h3 className="text-3xl font-serif text-white mb-6">Próximo Nível</h3>
          <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            Depois de ler, você não será mais leigo. Aí sim, estará pronto para a prática.
          </p>
          <Link to="/educacao" className="inline-flex items-center gap-3 text-gold-500 hover:text-gold-400 font-bold uppercase tracking-widest text-sm border-b border-gold-500/30 pb-2 hover:border-gold-500 transition-all group">
             Ir para o Arsenal Técnico <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
       </div>

       {/* Footer Soberano */}
       <footer className="max-w-3xl mx-auto text-center pt-12 border-t border-white/5 space-y-6 mt-12">
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
          <div className="flex items-center justify-center gap-6 pt-8 pb-8">
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
