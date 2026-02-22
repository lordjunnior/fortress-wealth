import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Engenharia da Liberdade",
    subtitle: "Bitcoin & Técnica",
    books: [
      { id: 'white-paper', title: 'White Paper', author: 'Satoshi Nakamoto', color: 'from-orange-900/60' },
      { id: 'btc-iniciantes', title: 'Bitcoin para Iniciantes', author: 'Lord Junnior', color: 'from-emerald-900/60' },
      { id: 'btc-programadores', title: 'Bitcoin para Programadores', author: 'Lord Junnior', color: 'from-blue-900/60' },
      { id: 'ulrich-digital', title: 'Moeda na Era Digital', author: 'Fernando Ulrich', color: 'from-yellow-900/60' },
      { id: 'red-pill', title: 'Bitcoin Red Pill', author: 'Renato Amoedo', color: 'from-red-900/60' }
    ]
  },
  {
    title: "Fundamentos Soberanos",
    subtitle: "Economia & História",
    books: [
      { id: 'mises-6', title: 'As Seis Lições', author: 'Ludwig von Mises', color: 'from-purple-900/60' },
      { id: 'fim-bc', title: 'Fim do Banco Central', author: 'Murray Rothbard', color: 'from-amber-900/60' },
      { id: 'hoppe-deus', title: 'Deus que Falhou', author: 'Hans-Hermann Hoppe', color: 'from-slate-900/60' },
      { id: 'individuo', title: 'Economia do Indivíduo', author: 'Escola Austríaca', color: 'from-green-900/60' },
      { id: 'economia-historia', title: 'Economia, Sociedade e História', author: 'Hans-Hermann Hoppe', color: 'from-cyan-900/60' },
      { id: 'pai-rico', title: 'Pai Rico, Pai Pobre', author: 'Robert Kiyosaki', color: 'from-indigo-900/60' }
    ]
  }
];

const Ebooks: React.FC = () => {
  const handleDownload = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    alert(`Iniciando download: ${title}`);
  };

  return (
    <div className="min-h-screen bg-[#070A12] font-sans pb-24 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Dust Particles */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="dust-layer"></div>
        <div className="dust-layer dust-layer-2"></div>
      </div>

      {/* Nav */}
      <div className="absolute top-28 left-4 md:left-12 z-50">
        <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit group bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retornar
        </Link>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-28">
        {/* Header */}
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
            BIBLIOTECA
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Acervo Real • 11 Títulos Verificados
          </p>
        </header>

        {/* Categories */}
        {CATEGORIES.map((cat, idx) => (
          <section key={idx} className="mb-16 w-full">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer w-fit">
              <div className="w-1 h-8 bg-red-600 rounded-full"></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{cat.title}</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{cat.subtitle}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-hide">
              {cat.books.map((book) => (
                <div
                  key={book.id}
                  className="relative shrink-0 w-[200px] md:w-[220px] aspect-[2/3] rounded-md overflow-hidden snap-start group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-40 shadow-lg border border-white/5"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-[#0B0F19]"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${book.color} to-black opacity-50`}></div>

                  {/* Default state */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{book.author}</span>
                    <h3 className="text-lg font-black text-white leading-tight tracking-tighter drop-shadow-md">{book.title}</h3>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/95 p-5 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <h3 className="text-base font-black text-white mb-2 leading-tight tracking-tight">{book.title}</h3>
                    <p className="text-slate-400 text-xs mb-1 font-bold">{book.author}</p>
                    <button
                      onClick={(e) => handleDownload(e, book.title)}
                      className="mt-6 w-full flex items-center justify-center gap-2 bg-white hover:bg-red-600 text-black hover:text-white font-black py-2.5 rounded transition-all text-[10px] uppercase tracking-widest"
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

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-12 text-center pt-16 border-t border-white/5 mt-8 relative z-30">
        <p className="text-xl font-black text-white opacity-80 tracking-tighter">Not your keys, not your money.</p>
        <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-4 font-bold">
          Lord Junnior © 2026
        </p>
      </footer>

      {/* CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes drift {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-1000px) translateX(80px); }
        }
        .dust-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 30% 50%, rgba(255,255,255,0.3) 100%, transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 100%, transparent);
          background-size: 200px 200px;
          animation: drift 60s linear infinite;
        }
        .dust-layer-2 {
          background-size: 350px 350px;
          animation: drift 90s linear infinite;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default Ebooks;
