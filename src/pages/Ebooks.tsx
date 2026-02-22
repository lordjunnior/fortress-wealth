import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, ShieldCheck } from 'lucide-react';

import coverWhitepaper from '@/assets/cover-whitepaper-btc.jpg';
import coverRedpill from '@/assets/cover-redpill-btc.jpg';
import coverProgramadores from '@/assets/cover-btc-programadores.jpg';
import coverMoedaDigital from '@/assets/cover-moeda-digital.jpg';
import coverIniciantes from '@/assets/cover-btc-iniciantes.jpg';
import coverSeisLicoes from '@/assets/cover-seis-licoes.jpg';
import coverFimBc from '@/assets/cover-fim-banco-central.jpg';
import coverDeusFalhou from '@/assets/cover-deus-falhou.jpg';
import coverEconomiaIndividuo from '@/assets/cover-economia-individuo.jpg';
import coverEconomiaHistoria from '@/assets/cover-economia-historia.jpg';
import coverPaiRico from '@/assets/cover-pai-rico-pobre.jpg';

const EBOOKS_DATA = [
  {
    category: "Engenharia da Liberdade",
    description: "Protocolos técnicos e a matemática da soberania digital.",
    books: [
      { title: "White Paper", author: "Satoshi Nakamoto", file: "White Paper - S.Nakamoto.pdf", color: "from-orange-600 to-yellow-600", cover: coverWhitepaper },
      { title: "Bitcoin Red Pill", author: "Renato Amoedo", file: "Livro Bitcoin Red Pill - 3a Edicao.pdf", color: "from-red-700 to-black", cover: coverRedpill },
      { title: "Bitcoin p/ Programadores", author: "Marco Agner", file: "bitcoin-para-programadores.pdf", color: "from-blue-700 to-slate-900", cover: coverProgramadores },
      { title: "Moeda na Era Digital", author: "Fernando Ulrich", file: "Bitcoin a Moeda Na Era Digital - Fernando Ulrich (2).pdf", color: "from-amber-500 to-orange-800", cover: coverMoedaDigital },
      { title: "Bitcoin para Iniciantes", author: "Ney Carvalho", file: "Bitcoin_para_iniciantes.pdf", color: "from-emerald-600 to-teal-900", cover: coverIniciantes }
    ]
  },
  {
    category: "Fundamentos Soberanos",
    description: "A base moral, econômica e histórica para a independência individual.",
    books: [
      { title: "As Seis Lições", author: "Ludwig von Mises", file: "As Seis Licoes - Ludwig Von Mises.pdf", color: "from-purple-800 to-indigo-950", cover: coverSeisLicoes },
      { title: "Fim do Banco Central", author: "Murray Rothbard", file: "Pelo-fim-do-Banco-Central.pdf", color: "from-slate-800 to-black", cover: coverFimBc },
      { title: "Deus que Falhou", author: "Hans-Hermann Hoppe", file: "Democracia -o-deus-que-falhou.pdf", color: "from-zinc-900 to-black", cover: coverDeusFalhou },
      { title: "Economia do Indivíduo", author: "Rodrigo Constantino", file: "Economia-do-Individuo-O-Legado-da-Escola-Austriaca.pdf", color: "from-blue-900 to-black", cover: coverEconomiaIndividuo },
      { title: "Economia e História", author: "Hans-Hermann Hoppe", file: "Economia-Sociedade-Historia.pdf", color: "from-red-900 to-slate-900", cover: coverEconomiaHistoria },
      { title: "Pai Rico, Pai Pobre", author: "Robert Kiyosaki", file: "Pai_Rico_Pai_Pobre_Edicao_Atualizada_25anos_ExcertoSITE.pdf", color: "from-green-800 to-emerald-950", cover: coverPaiRico }
    ]
  }
];

const Ebooks: React.FC = () => {
  const handleDownload = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    alert(`Iniciando download: ${title}`);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* Dust Particles */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
        <div className="dust-layer-ebook"></div>
        <div className="dust-layer-ebook dust-layer-ebook-2"></div>
        <div className="dust-layer-ebook dust-layer-ebook-3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-28">
        {/* Nav */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.3em] transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Painel
        </Link>

        {/* Header */}
        <header className="mb-24">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 drop-shadow-2xl">E-BOOKS</h1>
          <p className="max-w-2xl text-slate-400 font-medium text-lg leading-relaxed">
            Sua biblioteca de defesa intelectual. Conhecimento verificado para a transição para a soberania total.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">11 Títulos Verificados • Acervo Real</span>
          </div>
        </header>

        {/* Categories */}
        {EBOOKS_DATA.map((section, idx) => (
          <div key={idx} className="mb-24">
            <div className="mb-10 border-l-4 border-red-600 pl-6">
              <h2 className="text-3xl font-black uppercase tracking-tight">{section.category}</h2>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">{section.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {section.books.map((book, bIdx) => (
                <div key={bIdx} className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-red-900/20 relative overflow-hidden border border-white/10">
                    {/* Cover image */}
                    <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    {/* Default info */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-end group-hover:opacity-0 transition-opacity duration-300">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70 block mb-1">{book.author}</span>
                      <h3 className="text-lg font-black leading-tight tracking-tighter drop-shadow-md">{book.title}</h3>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                      <h3 className="text-base font-black tracking-tight text-center px-4">{book.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold">{book.author}</p>
                      <button
                        onClick={(e) => handleDownload(e, book.title)}
                        className="flex items-center gap-2 bg-white text-black font-black px-6 py-3 rounded text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Download size={14} /> Acessar PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-12 text-center pt-16 border-t border-white/5 mt-8 relative z-30">
        <p className="text-xl font-black text-white opacity-80 tracking-tighter">Not your keys, not your money.</p>
        <p className="text-[10px] text-slate-600 uppercase tracking-widest pt-4 font-bold">Lord Junnior © 2026</p>
      </footer>

      {/* CSS */}
      <style>{`
        @keyframes driftEbook {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-1000px) translateX(100px); }
        }
        .dust-layer-ebook {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.5) 100%, transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(16,185,129,0.3) 100%, transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 100%, transparent),
            radial-gradient(1.5px 1.5px at 80% 80%, rgba(255,255,255,0.3) 100%, transparent);
          background-size: 200px 200px;
          animation: driftEbook 50s linear infinite;
        }
        .dust-layer-ebook-2 {
          background-size: 300px 300px;
          animation: driftEbook 70s linear infinite;
          opacity: 0.7;
        }
        .dust-layer-ebook-3 {
          background-size: 400px 400px;
          animation: driftEbook 100s linear infinite;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};

export default Ebooks;
