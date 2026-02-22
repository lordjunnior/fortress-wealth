import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Play, 
  Info, ChevronRight, Lock
} from 'lucide-react';
import coverServidao from '@/assets/cover-servidao.jpg';
import coverEstadoNao from '@/assets/cover-estado-nao.jpg';
import coverCiclos from '@/assets/cover-ciclos.jpg';
import coverIntervencionismo from '@/assets/cover-intervencionismo.jpg';
import coverFimBc from '@/assets/cover-fim-bc.jpg';

const FEATURED_BOOK = {
  id: 'entenda-bitcoin',
  title: 'Entenda o Bitcoin — ainda hoje',
  author: 'Lord Junnior',
  desc: 'Guia definitivo para leigos absolutos. A história do dinheiro, o valor do Bitcoin e a mecânica da rede explicados sem jargões. A porta de entrada para a soberania.',
  tags: ['Leitura Obrigatória', 'Para Iniciantes', 'Material Autoral'],
  color: 'from-emerald-900/60 via-emerald-900/20 to-transparent'
};

const CATEGORIES = [
  {
    title: "Fundamentos da Liberdade",
    books: [
      {
        id: 'servidao',
        title: 'O Discurso da Servidão Voluntária',
        author: 'Étienne de La Boétie',
        desc: 'Por que as massas aceitam estruturas que as exploram e como o poder se sustenta pela obediência.',
        color: 'from-purple-900/60 to-black',
        cover: coverServidao
      },
      {
        id: 'estado-nao',
        title: 'Estado Não, Obrigado',
        author: 'James J. Martin',
        desc: 'A desconstrução lógica da necessidade do Estado para a organização da sociedade.',
        color: 'from-red-900/60 to-black',
        cover: coverEstadoNao
      }
    ]
  },
  {
    title: "Engenharia Econômica",
    books: [
      {
        id: 'ciclos',
        title: 'Moeda, Crédito e Ciclos',
        author: 'Jesús Huerta de Soto',
        desc: 'Como a manipulação monetária cria bolhas e crises inevitáveis.',
        color: 'from-blue-900/60 to-black',
        cover: coverCiclos
      },
      {
        id: 'intervencionismo',
        title: 'Crítica ao Intervencionismo',
        author: 'Ludwig von Mises',
        desc: 'A prova de por que regulações sempre geram efeitos colaterais destrutivos.',
        color: 'from-orange-900/60 to-black',
        cover: coverIntervencionismo
      },
      {
        id: 'fim-bc',
        title: 'Pelo Fim do Banco Central',
        author: 'Murray N. Rothbard',
        desc: 'A anatomia da fraude e o argumento para a separação entre dinheiro e Estado.',
        color: 'from-gold-900/60 to-black',
        cover: coverFimBc
      }
    ]
  }
];

const Ebooks: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    alert(`Iniciando download do acervo: ${title}`);
  };

  return (
    <div className="min-h-screen bg-[#070A12] font-sans overflow-x-hidden pb-12 selection:bg-gold-500 selection:text-black">
       
       {/* Navegação Flutuante */}
       <div className="absolute top-28 left-4 md:left-12 z-50">
         <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar
         </Link>
       </div>

       {/* HERO SECTION (Estilo Netflix Featured) */}
       <section className="relative w-full h-[75vh] min-h-[500px] flex items-center mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-[#070A12]">
             
             {/* SISTEMA DE POEIRA FLUTUANTE */}
             <div className="dust-particles">
                <div className="dust-layer"></div>
                <div className="dust-layer"></div>
                <div className="dust-layer"></div>
             </div>

             <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-[#070A12]/80 to-transparent z-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent z-10"></div>
             <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${FEATURED_BOOK.color} z-0`}></div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12 w-full pt-20">
             <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2 mb-6">
                  {FEATURED_BOOK.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                  {FEATURED_BOOK.title}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed drop-shadow-md max-w-xl font-light">
                  {FEATURED_BOOK.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                   <button 
                     onClick={() => navigate('/silencio-queda')}
                     className="flex items-center gap-3 bg-white hover:bg-slate-200 text-black font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 text-sm uppercase tracking-wide shadow-xl"
                   >
                     <Play className="w-5 h-5 fill-current" /> Acessar Material
                   </button>
                   <button 
                     onClick={() => navigate('/silencio-queda')}
                     className="flex items-center gap-3 bg-black/40 hover:bg-white/10 text-white backdrop-blur-md font-bold py-3 px-8 rounded-lg transition-colors text-sm uppercase tracking-wide border border-white/20"
                   >
                     <Info className="w-5 h-5" /> Sinopse
                   </button>
                </div>
             </div>
          </div>
       </section>

       {/* CARROSSÉIS DE CATEGORIAS */}
       <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-30 space-y-12">
          
          {CATEGORIES.map((category, catIdx) => (
             <section key={catIdx} className="w-full">
                <div className="flex items-center justify-between mb-4 group cursor-pointer w-fit">
                   <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">{category.title}</h2>
                   <ChevronRight className="w-6 h-6 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-hide">
                   {category.books.map((book) => (
                      <div 
                        key={book.id} 
                        className="relative shrink-0 w-[200px] md:w-[240px] aspect-[2/3] rounded-md overflow-hidden snap-start group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-40 shadow-lg border border-white/5"
                      >
                         <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />

                         <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">{book.author}</span>
                            <h3 className="text-lg font-bold text-white leading-tight shadow-black drop-shadow-md">{book.title}</h3>
                         </div>

                         <div className="absolute inset-0 bg-black/95 p-5 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                            <h3 className="text-base font-bold text-white mb-2">{book.title}</h3>
                            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                              {book.desc}
                            </p>
                            <button 
                              onClick={(e) => handleDownload(e, book.title)}
                              className="mt-auto w-full flex items-center justify-center gap-2 border border-white/20 hover:bg-white hover:text-black text-white font-bold py-2.5 rounded transition-colors text-[10px] uppercase tracking-widest"
                            >
                               <Download className="w-4 h-4" /> Baixar PDF
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </section>
          ))}

       </div>

       {/* Footer Soberano */}
       <footer className="max-w-7xl mx-auto text-center pt-16 border-t border-white/5 space-y-6 mt-8 relative z-30">
          <p className="text-xl font-serif text-white opacity-80">Not your keys, not your money.</p>
          <div className="w-8 h-[1px] bg-white/10 mx-auto my-4"></div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-2">
            Lord Junnior © 2026
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            <Link to="#" className="text-xs text-slate-600 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> PGP
            </Link>
          </div>
       </footer>

       {/* CSS Injetado */}
       <style>{`
         .scrollbar-hide::-webkit-scrollbar {
             display: none;
         }
         .scrollbar-hide {
             -ms-overflow-style: none;
             scrollbar-width: none;
         }

         @keyframes drift {
            from { transform: translateY(0) translateX(0); }
            to { transform: translateY(-1000px) translateX(100px); }
         }
         
         .dust-particles {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 5;
            opacity: 0.6;
         }
         
         .dust-layer {
            position: absolute;
            width: 100%;
            height: 200%;
            background-image: 
               radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.4) 100%, transparent),
               radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.5) 100%, transparent),
               radial-gradient(2px 2px at 40% 70%, rgba(16,185,129,0.3) 100%, transparent),
               radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 100%, transparent),
               radial-gradient(1.5px 1.5px at 80% 80%, rgba(255,255,255,0.3) 100%, transparent);
            background-size: 200px 200px;
            animation: drift 50s linear infinite;
         }
         
         .dust-layer:nth-child(2) {
            background-size: 300px 300px;
            animation: drift 70s linear infinite;
            opacity: 0.7;
         }
         
         .dust-layer:nth-child(3) {
            background-size: 400px 400px;
            animation: drift 100s linear infinite;
            opacity: 0.4;
         }
       `}</style>
    </div>
  );
};

export default Ebooks;
