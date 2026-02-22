import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Headphones, Play, Clock, 
  Lock, BookOpen, ShieldCheck, TrendingUp
} from 'lucide-react';

interface AudiobooksProps {
  onPlay?: (track: any) => void;
}

const AUDIOBOOKS_DB = [
  {
    id: 'pai-rico',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert T. Kiyosaki',
    duration: '16:31:00',
    category: 'Educação Financeira',
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-emerald-500/0',
    accent: 'text-emerald-500',
    border: 'group-hover:border-emerald-500/50',
    bgIcon: 'bg-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'padrao-bitcoin',
    title: 'O Padrão Bitcoin',
    author: 'Saifedean Ammous',
    duration: '10:45:00',
    category: 'Soberania Monetária',
    icon: ShieldCheck,
    color: 'from-orange-500/20 to-orange-500/0',
    accent: 'text-orange-500',
    border: 'group-hover:border-orange-500/50',
    bgIcon: 'bg-orange-500/10 border-orange-500/20'
  },
  {
    id: 'etica-liberdade',
    title: 'A Ética da Liberdade',
    author: 'Murray N. Rothbard',
    duration: '14:20:00',
    category: 'Fundamentos',
    icon: BookOpen,
    color: 'from-blue-500/20 to-blue-500/0',
    accent: 'text-blue-500',
    border: 'group-hover:border-blue-500/50',
    bgIcon: 'bg-blue-500/10 border-blue-500/20'
  }
];

const Audiobooks: React.FC<AudiobooksProps> = ({ onPlay }) => {
  
  const handlePlayClick = (book: any) => {
    if (onPlay) {
      onPlay({
        id: book.id,
        title: book.title,
        author: book.author,
        url: '#'
      });
    } else {
      alert(`Iniciando a reprodução de: ${book.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] pt-28 pb-12 px-4 animate-fade-in font-sans">
       
       {/* Navegação */}
       <div className="max-w-6xl mx-auto mb-12">
         <Link to="/" className="text-slate-500 hover:text-gold-500 flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
         </Link>
       </div>

       {/* Hero Section */}
       <header className="max-w-6xl mx-auto mb-20 border-b border-white/5 pb-12">
          <div className="inline-block px-3 py-1 mb-6 border border-gold-500/20 rounded bg-gold-500/5 backdrop-blur-md">
            <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <Headphones className="w-3 h-3" /> Biblioteca Sonora
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Conhecimento <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-500 to-orange-500">Injetável</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-3xl leading-relaxed">
            O tempo é o seu ativo mais escasso. Absorva a base intelectual da soberania enquanto opera no mundo real. <strong className="text-white font-medium">Sem desculpas.</strong>
          </p>
       </header>

       {/* Grid de Audiolivros */}
       <section className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             
             {AUDIOBOOKS_DB.map((book) => {
                const Icon = book.icon;
                
                return (
                  <div key={book.id} className={`bg-[#0B0F19] border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden shadow-lg hover:shadow-2xl ${book.border}`}>
                     
                     {/* Efeito de Luz */}
                     <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${book.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2`}></div>
                     
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                           <div className={`p-4 rounded-xl border ${book.bgIcon}`}>
                              <Icon className={`w-6 h-6 ${book.accent}`} />
                           </div>
                           <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold bg-black px-3 py-1.5 rounded-full border border-white/5">
                             {book.category}
                           </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-8 flex-grow">
                          {book.author}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                           <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                              <Clock className="w-4 h-4" /> {book.duration}
                           </div>
                           <button 
                             onClick={() => handlePlayClick(book)}
                             className={`flex items-center gap-2 ${book.accent} hover:text-white text-xs font-bold uppercase tracking-widest transition-colors bg-black px-4 py-2 rounded-lg border border-white/5 hover:border-white/20`}
                           >
                              <Play className="w-4 h-4 fill-current" /> Ouvir Agora
                           </button>
                        </div>
                     </div>
                  </div>
                );
             })}

             {/* Card Placeholder para futuros áudios */}
             <div className="bg-[#0B0F19]/50 border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px] opacity-60">
                <Headphones className="w-8 h-8 text-slate-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-400 mb-2">Acervo em Expansão</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Mais títulos em breve</p>
             </div>

          </div>
       </section>

       {/* Footer Soberano */}
       <footer className="max-w-6xl mx-auto text-center pt-12 border-t border-white/5 space-y-6 mt-12">
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

export default Audiobooks;
