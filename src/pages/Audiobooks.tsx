import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Play, Pause, Clock, 
  Headphones, Lock, Volume2, FastForward, Rewind, BarChart2
} from 'lucide-react';
import coverPaiRico from '@/assets/cover-pai-rico.jpg';
import coverPadraoBitcoin from '@/assets/cover-padrao-bitcoin.jpg';
import coverEticaLiberdade from '@/assets/cover-etica-liberdade.jpg';
import coverAnatomiaEstado from '@/assets/cover-anatomia-estado.jpg';
import coverRiquezaNacoes from '@/assets/cover-riqueza-nacoes.jpg';

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
    coverGradient: 'bg-gradient-to-br from-emerald-900 via-emerald-600 to-black',
    accent: 'text-emerald-500',
    coverImage: coverPaiRico
  },
  {
    id: 'padrao-bitcoin',
    title: 'O Padrão Bitcoin',
    author: 'Saifedean Ammous',
    duration: '10:45:00',
    category: 'Soberania Monetária',
    coverGradient: 'bg-gradient-to-br from-orange-900 via-orange-600 to-black',
    accent: 'text-orange-500',
    coverImage: coverPadraoBitcoin
  },
  {
    id: 'etica-liberdade',
    title: 'A Ética da Liberdade',
    author: 'Murray N. Rothbard',
    duration: '14:20:00',
    category: 'Fundamentos',
    coverGradient: 'bg-gradient-to-br from-blue-900 via-blue-600 to-black',
    accent: 'text-blue-500',
    coverImage: coverEticaLiberdade
  },
  {
    id: 'anatomia-estado',
    title: 'A Anatomia do Estado',
    author: 'Murray N. Rothbard',
    duration: '02:15:00',
    category: 'Fundamentos',
    coverGradient: 'bg-gradient-to-br from-red-900 via-red-600 to-black',
    accent: 'text-red-500',
    coverImage: coverAnatomiaEstado
  },
  {
    id: 'riqueza-nacoes',
    title: 'A Riqueza das Nações',
    author: 'Adam Smith',
    duration: '18:45:00',
    category: 'Economia Clássica',
    coverGradient: 'bg-gradient-to-br from-amber-900 via-amber-700 to-black',
    accent: 'text-amber-500',
    coverImage: coverRiquezaNacoes
  }
];

const VisualEqualizer = ({ active }: { active: boolean }) => (
  <div className="flex items-end gap-1 h-4">
    <div className={`w-1 bg-gold-500 rounded-t-sm ${active ? 'animate-[bounce_1s_infinite]' : 'h-1'}`} style={{ animationDelay: '0ms' }}></div>
    <div className={`w-1 bg-gold-500 rounded-t-sm ${active ? 'animate-[bounce_1.2s_infinite]' : 'h-2'}`} style={{ animationDelay: '150ms' }}></div>
    <div className={`w-1 bg-gold-500 rounded-t-sm ${active ? 'animate-[bounce_0.8s_infinite]' : 'h-1'}`} style={{ animationDelay: '300ms' }}></div>
    <div className={`w-1 bg-gold-500 rounded-t-sm ${active ? 'animate-[bounce_1.1s_infinite]' : 'h-3'}`} style={{ animationDelay: '450ms' }}></div>
  </div>
);

const Audiobooks: React.FC<AudiobooksProps> = ({ onPlay }) => {
  const [activeTrack, setActiveTrack] = useState(AUDIOBOOKS_DB[1]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackClick = (book: any) => {
    setActiveTrack(book);
    setIsPlaying(true);
    if (onPlay) {
      onPlay({
        id: book.id,
        title: book.title,
        author: book.author,
        url: '#' 
      });
    }
  };

  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#070A12] font-sans selection:bg-gold-500 selection:text-black pb-24 relative overflow-hidden">

       {/* Sound Wave Particles Background */}
       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
         <div className="sound-wave-layer"></div>
         <div className="sound-wave-layer sound-wave-layer-2"></div>
         <div className="sound-wave-layer sound-wave-layer-3"></div>
       </div>

       {/* Horizontal Frequency Lines */}
       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="freq-line freq-line-1"></div>
         <div className="freq-line freq-line-2"></div>
         <div className="freq-line freq-line-3"></div>
         <div className="freq-line freq-line-4"></div>
         <div className="freq-line freq-line-5"></div>
       </div>

       <style>{`
         @keyframes driftSound {
           0% { transform: translateY(0) translateX(0) scale(1); }
           50% { transform: translateY(-500px) translateX(60px) scale(1.05); }
           100% { transform: translateY(-1000px) translateX(120px) scale(1); }
         }
         @keyframes pulseLine {
           0%, 100% { opacity: 0.03; transform: scaleY(1); }
           50% { opacity: 0.08; transform: scaleY(1.5); }
         }
         .sound-wave-layer {
           position: absolute; width: 100%; height: 200%;
           background-image:
             radial-gradient(2px 2px at 10% 15%, rgba(234,179,8,0.35) 100%, transparent),
             radial-gradient(1.5px 1.5px at 25% 40%, rgba(234,179,8,0.25) 100%, transparent),
             radial-gradient(1px 1px at 45% 65%, rgba(255,255,255,0.2) 100%, transparent),
             radial-gradient(2px 2px at 65% 25%, rgba(234,179,8,0.3) 100%, transparent),
             radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.15) 100%, transparent),
             radial-gradient(1.5px 1.5px at 50% 50%, rgba(234,179,8,0.2) 100%, transparent);
           background-size: 200px 200px;
           animation: driftSound 60s linear infinite;
         }
         .sound-wave-layer-2 {
           background-size: 280px 280px;
           animation: driftSound 85s linear infinite reverse;
           opacity: 0.6;
         }
         .sound-wave-layer-3 {
           background-size: 350px 350px;
           animation: driftSound 110s linear infinite;
           opacity: 0.3;
         }
         .freq-line {
           position: absolute;
           left: 0; right: 0;
           height: 1px;
           background: linear-gradient(90deg, transparent 0%, rgba(234,179,8,0.15) 30%, rgba(234,179,8,0.25) 50%, rgba(234,179,8,0.15) 70%, transparent 100%);
           animation: pulseLine 4s ease-in-out infinite;
         }
         .freq-line-1 { top: 18%; animation-delay: 0s; }
         .freq-line-2 { top: 35%; animation-delay: 0.8s; }
         .freq-line-3 { top: 52%; animation-delay: 1.6s; }
         .freq-line-4 { top: 70%; animation-delay: 2.4s; }
         .freq-line-5 { top: 87%; animation-delay: 3.2s; }
       `}</style>
       
       <div className="pt-28 px-4 max-w-6xl mx-auto mb-8">
         <Link to="/" className="text-slate-500 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar ao Comando
         </Link>
       </div>

       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LADO ESQUERDO: Player em Destaque */}
          <div className="lg:col-span-5 flex flex-col gap-8">
             <div className="sticky top-32">
                <div className="text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-6 opacity-60">
                  <Headphones className="w-4 h-4" /> Em Destaque
                </div>
                
                <div className="w-full aspect-square rounded-3xl mb-8 relative overflow-hidden shadow-2xl border border-white/5 group">
                    <img src={activeTrack.coverImage} alt={activeTrack.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                   <button 
                     onClick={togglePlayState}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]"
                   >
                     {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
                   </button>
                </div>

                <div>
                   <h1 className="text-4xl font-sans font-black text-white mb-2 leading-tight tracking-tight">
                     {activeTrack.title}
                   </h1>
                   <p className="text-xl text-slate-400 font-light mb-6">
                     {activeTrack.author}
                   </p>
                   
                   <div className="flex items-center justify-between p-4 bg-[#0B0F19] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-4">
                         <button className="text-slate-500 hover:text-white transition-colors"><Rewind className="w-5 h-5" /></button>
                         <button onClick={togglePlayState} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                           {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                         </button>
                         <button className="text-slate-500 hover:text-white transition-colors"><FastForward className="w-5 h-5" /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-slate-500" />
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="w-2/3 h-full bg-slate-400 rounded-full"></div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* LADO DIREITO: Tracklist */}
          <div className="lg:col-span-7 pt-4 lg:pt-14">
             <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-sans font-extrabold text-white tracking-tight">Acervo Sonoro</h2>
                <span className="text-xs text-slate-500 font-mono">{AUDIOBOOKS_DB.length} Obras</span>
             </div>

             <div className="space-y-3">
                {AUDIOBOOKS_DB.map((book, index) => {
                   const isActive = activeTrack.id === book.id;

                   return (
                     <div 
                       key={book.id} 
                       onClick={() => handleTrackClick(book)}
                       className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                         isActive 
                           ? 'bg-white/5 border-white/10 shadow-lg' 
                           : 'bg-transparent border-transparent hover:bg-[#0B0F19] hover:border-white/5'
                       }`}
                     >
                        <div className="w-8 flex justify-center shrink-0">
                           {isActive && isPlaying ? (
                             <VisualEqualizer active={true} />
                           ) : (
                             <span className={`text-sm font-mono font-bold ${isActive ? 'text-gold-500' : 'text-slate-600 group-hover:text-white'}`}>
                               {(index + 1).toString().padStart(2, '0')}
                             </span>
                           )}
                        </div>

                         <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden shadow-md">
                            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                         </div>

                        <div className="flex-1 min-w-0">
                           <h3 className={`text-base font-bold truncate transition-colors ${isActive ? 'text-gold-500' : 'text-white group-hover:text-gold-400'}`}>
                             {book.title}
                           </h3>
                           <div className="flex items-center gap-3 text-sm mt-0.5">
                              <span className="text-slate-400 truncate">{book.author}</span>
                              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                              <span className="text-slate-500 text-xs uppercase tracking-widest truncate">{book.category}</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 pl-4">
                           <span className="text-slate-500 font-mono text-xs hidden sm:block">
                             {book.duration}
                           </span>
                           <button className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                             isActive
                               ? 'border-gold-500 text-gold-500 bg-gold-500/10'
                               : 'border-white/10 text-white opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:border-white'
                           }`}>
                             {isActive && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                           </button>
                        </div>
                     </div>
                   );
                })}
             </div>

             <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest">
                  Lord Junnior © 2026
                </p>
                <div className="flex items-center gap-6">
                  <Link to="#" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-wider transition-colors">Termos</Link>
                  <Link to="#" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1">
                    <Lock className="w-3 h-3" /> PGP
                  </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Audiobooks;
