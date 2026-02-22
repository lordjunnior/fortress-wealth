import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Download, 
  Swords, Flame, Lock, Eye, ArrowRight, Star
} from 'lucide-react';

const EBOOKS_DB = [
  {
    id: 'entenda-bitcoin',
    title: 'Entenda o Bitcoin — ainda hoje',
    author: 'Lord Junnior',
    desc: 'Guia definitivo para leigos absolutos. A história do dinheiro, o valor do Bitcoin e a mecânica da rede explicados sem jargões. A porta de entrada para a soberania.',
    category: 'Essencial / Autoral',
    color: 'from-emerald-500/20 to-transparent',
    borderColor: 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-400',
    textColor: 'text-emerald-500',
    bgIcon: 'bg-emerald-500/10 border-emerald-500/30',
    isAuthoral: true
  },
  {
    id: 'servidao',
    title: 'O Discurso da Servidão Voluntária',
    author: 'Étienne de La Boétie',
    desc: 'Por que as massas aceitam estruturas que as exploram e como o poder se sustenta apenas pela obediência.',
    category: 'Fundamentos',
    color: 'from-purple-500/20 to-transparent',
    borderColor: 'border-white/5 hover:border-purple-500/50',
    textColor: 'text-purple-500',
    bgIcon: 'bg-purple-500/10 border-purple-500/20',
    isAuthoral: false
  },
  {
    id: 'estado-nao',
    title: 'Estado Não, Obrigado',
    author: 'James J. Martin',
    desc: 'A desconstrução lógica da necessidade do Estado para a organização da sociedade e da justiça.',
    category: 'Fundamentos',
    color: 'from-red-500/20 to-transparent',
    borderColor: 'border-white/5 hover:border-red-500/50',
    textColor: 'text-red-500',
    bgIcon: 'bg-red-500/10 border-red-500/20',
    isAuthoral: false
  },
  {
    id: 'ciclos',
    title: 'Moeda, Crédito e Ciclos Econômicos',
    author: 'Jesús Huerta de Soto',
    desc: 'Como a manipulação monetária e o sistema de reservas fracionárias criam bolhas e crises inevitáveis.',
    category: 'Economia',
    color: 'from-blue-500/20 to-transparent',
    borderColor: 'border-white/5 hover:border-blue-500/50',
    textColor: 'text-blue-500',
    bgIcon: 'bg-blue-500/10 border-blue-500/20',
    isAuthoral: false
  },
  {
    id: 'intervencionismo',
    title: 'Uma Crítica ao Intervencionismo',
    author: 'Ludwig von Mises',
    desc: 'A prova matemática e lógica de por que controles e regulações sempre geram efeitos colaterais destrutivos.',
    category: 'Economia',
    color: 'from-orange-500/20 to-transparent',
    borderColor: 'border-white/5 hover:border-orange-500/50',
    textColor: 'text-orange-500',
    bgIcon: 'bg-orange-500/10 border-orange-500/20',
    isAuthoral: false
  },
  {
    id: 'fim-bc',
    title: 'Pelo Fim do Banco Central',
    author: 'Murray N. Rothbard',
    desc: 'A anatomia da fraude institucionalizada e o argumento definitivo para a separação entre dinheiro e Estado.',
    category: 'Bitcoin & Fiat',
    color: 'from-gold-500/20 to-transparent',
    borderColor: 'border-white/5 hover:border-gold-500/50',
    textColor: 'text-gold-500',
    bgIcon: 'bg-gold-500/10 border-gold-500/20',
    isAuthoral: false
  }
];

const Ebooks: React.FC = () => {
  const navigate = useNavigate();

  const handleAction = (book: any) => {
    if (book.isAuthoral) {
      navigate('/silencio-queda');
    } else {
      alert(`Iniciando download seguro de: ${book.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] font-sans">
       
       {/* Hero Section com Parallax */}
       <div 
         className="relative pt-28 pb-24 px-4 bg-fixed bg-center bg-cover border-b border-white/5"
         style={{ 
           backgroundImage: 'linear-gradient(to bottom, rgba(7,10,18,0.8), rgba(7,10,18,1)), url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")' 
         }}
       >
         <div className="max-w-6xl mx-auto relative z-10">
           <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group mb-12 bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar ao Início
           </Link>

           <div className="inline-block px-4 py-1.5 mb-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-md">
             <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
               <BookOpen className="w-4 h-4" /> Acervo Textual
             </span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
             Armamento <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600">Intelectual</span>
           </h1>
           
           <p className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed drop-shadow-md">
             Textos fundamentais, sem censura e sem filtro. A base teórica para quem decidiu parar de terceirizar o próprio pensamento.
           </p>
         </div>
       </div>

       {/* O Trio da Blindagem Intelectual */}
       <section className="max-w-6xl mx-auto py-24 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">O Trio da Blindagem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              A soberania não começa no código, começa na mente. Siga esta progressão lógica para destruir as narrativas estatais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B0F19] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all group relative overflow-hidden">
               <div className="p-4 bg-black border border-white/5 rounded-xl text-slate-300 w-fit mb-6"><Eye className="w-6 h-6"/></div>
               <h3 className="text-xl font-bold text-white mb-3">1. Despertar</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Entenda a anatomia do Estado e a psicologia da obediência. Como o sistema convence a maioria a financiar a própria servidão.
               </p>
            </div>
            
            <div className="bg-[#0B0F19] border border-white/5 rounded-2xl p-8 hover:border-gold-500/30 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-24 bg-gold-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-gold-500/10"></div>
               <div className="p-4 bg-black border border-white/5 rounded-xl text-gold-500 w-fit mb-6"><Flame className="w-6 h-6"/></div>
               <h3 className="text-xl font-bold text-white mb-3">2. A Fraude</h3>
               <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                 A mecânica dos ciclos econômicos e da inflação. O dinheiro fiduciário como ferramenta primária de extração de riqueza.
               </p>
            </div>

            <div className="bg-[#0B0F19] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all group relative overflow-hidden">
               <div className="p-4 bg-black border border-white/5 rounded-xl text-slate-300 w-fit mb-6"><Swords className="w-6 h-6"/></div>
               <h3 className="text-xl font-bold text-white mb-3">3. O Contra-Ataque</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Soluções práticas e teóricas para a separação entre dinheiro e Estado. A infraestrutura ética e técnica para a liberdade.
               </p>
            </div>
          </div>
       </section>

       {/* Grid de Ebooks */}
       <section className="max-w-6xl mx-auto pb-24 px-4">
          <div className="flex items-center gap-4 mb-12 border-l-2 border-slate-500 pl-6">
             <div>
               <h3 className="text-3xl font-serif text-white mb-2">Acervo Disponível</h3>
               <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">PDFs Oficiais e Sem DRM</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {EBOOKS_DB.map((book) => (
                <div key={book.id} className={`bg-[#0B0F19]/80 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-2xl ${book.borderColor}`}>
                   
                   <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${book.color} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2`}></div>
                   
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                         <div className={`p-4 rounded-xl border ${book.bgIcon}`}>
                            {book.isAuthoral ? <Star className={`w-6 h-6 ${book.textColor}`} /> : <BookOpen className={`w-6 h-6 ${book.textColor}`} />}
                         </div>
                         <span className={`text-[10px] uppercase tracking-widest font-bold bg-black px-3 py-1.5 rounded-full border border-white/5 ${book.isAuthoral ? book.textColor : 'text-slate-400'}`}>
                           {book.category}
                         </span>
                      </div>
                      
                      <h4 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                        {book.title}
                      </h4>
                      <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${book.textColor}`}>
                        {book.author}
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">
                        {book.desc}
                      </p>
                      
                      <button 
                        onClick={() => handleAction(book)}
                        className={`w-full flex items-center justify-center gap-3 bg-black hover:bg-white/5 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl border border-white/10 transition-all ${book.isAuthoral ? 'border-emerald-500/50 hover:border-emerald-400' : 'group-hover:border-slate-500/50'}`}
                      >
                         {book.isAuthoral ? (
                           <><ArrowRight className="w-4 h-4 text-emerald-500" /> Ver Material Completo</>
                         ) : (
                           <><Download className="w-4 h-4" /> Baixar PDF</>
                         )}
                      </button>
                   </div>
                </div>
             ))}

          </div>
       </section>

       {/* Footer Soberano */}
       <footer className="max-w-6xl mx-auto text-center pt-12 border-t border-white/5 space-y-6 mt-12 mb-12 px-4">
          <p className="text-2xl font-serif text-white opacity-80">Not your keys, not your money.</p>
          <div className="text-slate-500 text-sm space-y-1 opacity-80">
            <p>A ignorância é o principal pilar de sustentação do Estado.</p>
            <p>O conhecimento exige ação.</p>
          </div>
          <div className="w-12 h-[1px] bg-white/10 mx-auto my-6"></div>
          <p className="text-gold-600/80 text-sm font-medium">
            Dependência financeira nunca foi acidente. Sempre foi projeto.
          </p>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-4">
            Lord Junnior © 2026
          </p>

          <div className="flex items-center justify-center gap-6 pt-8 pb-8">
            <Link to="#" className="text-xs text-slate-600 hover:text-white uppercase tracking-wider transition-colors">Termos</Link>
            <span className="text-slate-800">•</span>
            <Link to="#" className="text-xs text-slate-600 hover:text-white uppercase tracking-wider transition-colors">Privacidade</Link>
            <span className="text-slate-800">•</span>
            <Link to="#" className="text-xs text-slate-600 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> PGP
            </Link>
          </div>
       </footer>

    </div>
  );
};

export default Ebooks;
