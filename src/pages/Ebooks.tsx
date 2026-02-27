import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, ShieldCheck, Lock, Globe } from 'lucide-react';

import coverWhitepaper from '@/assets/cover-whitepaper-btc.jpg';
import coverRedpill from '@/assets/cover-redpill-btc.jpg';
import coverProgramadores from '@/assets/cover-btc-programadores.jpg';
import coverMoedaDigital from '@/assets/cover-moeda-digital.jpg';

import coverSeisLicoes from '@/assets/cover-seis-licoes.jpg';
import coverFimBc from '@/assets/cover-fim-banco-central.jpg';
import coverDeusFalhou from '@/assets/cover-deus-falhou.jpg';
import coverEconomiaIndividuo from '@/assets/cover-economia-individuo.jpg';
import coverEconomiaHistoria from '@/assets/cover-economia-historia.jpg';
import coverPaiRico from '@/assets/cover-pai-rico-pobre.jpg';
import coverSilencioQueda from '@/assets/cover-silencio-queda.jpg';
import coverAutocustodia from '@/assets/autocustodiadeelite.jpg';
import coverMercadoParalelo from '@/assets/omercado-paralelo.jpg';

const EBOOKS_DATA = [
  {
    category: "Engenharia Bitcoin",
    description: "Protocolos técnicos e a matemática da soberania digital.",
    books: [
      { title: "White Paper", author: "Satoshi Nakamoto", pdf: "/pdfs/bitcoin-whitepaper.pdf", color: "from-orange-600 to-yellow-600", cover: coverWhitepaper },
      { title: "Bitcoin Red Pill", author: "Renato Amoedo", pdf: "/pdfs/bitcoin-redpill.pdf", color: "from-red-700 to-black", cover: coverRedpill },
      { title: "Bitcoin p/ Programadores", author: "Marco Agner", pdf: "/pdfs/bitcoin-programadores.pdf", color: "from-blue-700 to-slate-900", cover: coverProgramadores },
      { title: "Moeda na Era Digital", author: "Fernando Ulrich", pdf: "/pdfs/bitcoin-moeda-digital.pdf", color: "from-amber-500 to-orange-800", cover: coverMoedaDigital },
      { title: "O Valor do Bitcoin", author: "Diversos", pdf: "/pdfs/O_valor_do_Bitcoin.pdf", color: "from-emerald-600 to-teal-900" },
      { title: "Mastering Bitcoin", author: "Andreas Antonopoulos", pdf: "/pdfs/Mastering Bitcoin.pdf", color: "from-indigo-700 to-slate-900" },
      { title: "O Padrão Bitcoin", author: "Saifedean Ammous", pdf: "/pdfs/o_padrao_bitcoin_ediao_brasileira_a_alternativa_descentralizada.pdf", color: "from-yellow-600 to-amber-900" },
      { title: "A Internet do Dinheiro", author: "Andreas Antonopoulos", pdf: "/pdfs/a internet do dinheiro 2020 andreas antonopoulos.pdf", color: "from-cyan-600 to-blue-900" },
      { title: "Graças a Deus pelo Bitcoin", author: "Derek Waltchack", pdf: "/pdfs/Graças a Deus pelo Bitcoin - Derek Waltchack.pdf", color: "from-amber-700 to-yellow-950" },
    ]
  },
  {
    category: "Economia Austríaca",
    description: "A base teórica da liberdade econômica e do livre mercado.",
    books: [
      { title: "As Seis Lições", author: "Ludwig von Mises", pdf: "/pdfs/seis-licoes.pdf", color: "from-purple-800 to-indigo-950", cover: coverSeisLicoes },
      { title: "Fim do Banco Central", author: "Murray Rothbard", pdf: "/pdfs/fim-banco-central.pdf", color: "from-slate-800 to-black", cover: coverFimBc },
      { title: "Economia do Indivíduo", author: "Rodrigo Constantino", pdf: "/pdfs/economia-individuo.pdf", color: "from-blue-900 to-black", cover: coverEconomiaIndividuo },
      { title: "Economia e História", author: "Hans-Hermann Hoppe", pdf: "/pdfs/economia-historia.pdf", color: "from-red-900 to-slate-900", cover: coverEconomiaHistoria },
      { title: "Microeconomia", author: "Diversos", pdf: "/pdfs/microeconomia-compress.pdf", color: "from-teal-800 to-slate-900" },
      { title: "Mises e a Escola Austríaca", author: "Ludwig von Mises", pdf: "/pdfs/Mises-e-a-Escola-Austriaca-–-uma-visao-pessoal.pdf", color: "from-violet-800 to-indigo-950" },
      { title: "Cálculo Econômico Socialista", author: "Diversos", pdf: "/pdfs/Historia-do-Debate-do-Calculo-Economico-Socialista-xdcspd.pdf", color: "from-rose-900 to-black" },
      { title: "Moeda, Crédito e Ciclos", author: "Jesús Huerta de Soto", pdf: "/pdfs/Moeda-Credito-Bancario-e-Ciclos-Economicos.pdf", color: "from-zinc-700 to-black" },
    ]
  },
  {
    category: "Filosofia & Estado",
    description: "A crítica moral e filosófica ao poder estatal.",
    books: [
      { title: "Deus que Falhou", author: "Hans-Hermann Hoppe", pdf: "/pdfs/democracia-deus-falhou.pdf", color: "from-zinc-900 to-black", cover: coverDeusFalhou },
      { title: "Estado? Não, Obrigado!", author: "Marcelo Werlang", pdf: "/pdfs/Estado-Nao-Obrigado-n45ol7.pdf", color: "from-red-800 to-zinc-900" },
      { title: "Educação Livre e Obrigatória", author: "Murray Rothbard", pdf: "/pdfs/Educacao-Livre-e-Obrigatoria-sypcgb.pdf", color: "from-sky-800 to-slate-900" },
    ]
  },
  {
    category: "Inteligência Financeira",
    description: "Estratégias práticas para prosperar fora do sistema.",
    books: [
      { title: "Pai Rico, Pai Pobre", author: "Robert Kiyosaki", pdf: "/pdfs/pai-rico-pai-pobre.pdf", color: "from-green-800 to-emerald-950", cover: coverPaiRico },
      { title: "Economia 3.0", author: "Diversos", pdf: "/pdfs/Economia-3.0-Do-escambo-ate-as-financas-descentralizadas-iznesy.pdf", color: "from-orange-700 to-red-950" },
    ]
  }
];

const VITRINE_EBOOKS = [
  {
    title: "O SILÊNCIO DA QUEDA",
    description: "Descubra o que é o Bitcoin, por que ele é valioso e como a matemática garante a sua liberdade contra a inflação estatal. Um guia fundamental para entender o Bitcoin como refúgio em um mundo desnorteado.",
    cover: coverSilencioQueda,
    tags: ["E-book", "Gratuito"],
    available: true,
    btnText: "Resgatar E-book",
    route: "/silencio-queda",
  },
  {
    title: "Autocustódia de Elite",
    description: "Aprenda a ser seu próprio banco. Geração de chaves, cold storage e blindagem contra ataques de engenharia social.",
    cover: coverAutocustodia,
    tags: ["E-book", "Em Breve"],
    available: false,
    btnText: "Indisponível",
  },
  {
    title: "O Mercado Paralelo",
    description: "Como comprar e vender de forma privada, fugindo da vigilância corporativa e estatal usando as ferramentas corretas.",
    cover: coverMercadoParalelo,
    tags: ["E-book", "Em Breve"],
    available: false,
    btnText: "Indisponível",
  },
];

const Ebooks: React.FC = () => {
  const handleDownload = (e: React.MouseEvent, pdf: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = pdf;
    link.download = '';
    link.click();
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
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">22 Títulos Verificados • Acervo Real</span>
          </div>
        </header>

        {/* VITRINE TÁTICA DE E-BOOKS (ESTILO MOCKUP 3D) */}
        <div className="mb-40">
          <header className="mb-12">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
              Arsenal de <span className="text-red-600">Protocolos</span>
            </h3>
            <p className="text-slate-400 font-medium mt-4">
              Aprofunde seu conhecimento com materiais densos sobre soberania digital e fuga do sistema fiduciário.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VITRINE_EBOOKS.map((ebook, idx) => (
                <div
                  key={idx}
                  className={`bg-[#0B0F19] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-red-600/40 transition-all duration-500 shadow-xl ${!ebook.available ? 'opacity-80 hover:opacity-100' : ''}`}
                >
                  {/* Container do Mockup 3D */}
                  <div className="bg-gradient-to-br from-[#121826] to-[#070A12] rounded-xl aspect-[4/3] mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 ${ebook.available ? 'bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.1)_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05)_0%,transparent_60%)]'}`}></div>
                    
                    {ebook.cover ? (
                      <div className="w-[140px] h-[200px] shadow-[15px_15px_30px_rgba(0,0,0,0.8)] rounded-sm group-hover:scale-105 transition-all duration-500 relative z-10 overflow-hidden"
                        style={{ transform: 'perspective(800px) rotateY(12deg) rotateX(2deg)', transition: 'transform 0.5s ease, scale 0.5s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(800px) rotateY(12deg) rotateX(2deg)'; }}
                      >
                        <img src={ebook.cover} alt={`Capa ${ebook.title}`} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className="w-[140px] h-[200px] bg-gradient-to-br from-slate-700 to-black shadow-[15px_15px_30px_rgba(0,0,0,0.8),inset_2px_0_5px_rgba(255,255,255,0.2)] rounded-sm group-hover:scale-105 transition-all duration-500 relative z-10 flex flex-col p-4"
                        style={{ transform: 'perspective(800px) rotateY(12deg) rotateX(2deg)', transition: 'transform 0.5s ease, scale 0.5s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(800px) rotateY(12deg) rotateX(2deg)'; }}
                      >
                        <p className="text-white font-black uppercase text-[10px] leading-tight italic mt-auto">{ebook.title}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags Táticas */}
                  <div className="flex gap-2 mb-4 px-2">
                    {ebook.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          tag === "Em Breve"
                            ? "bg-red-600/20 border border-red-600/30 text-red-500"
                            : "bg-white/5 border border-white/10 text-slate-400"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Textos */}
                  <div className="px-2 flex-1 flex flex-col">
                    <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2 italic">
                      {ebook.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                      {ebook.description}
                    </p>

                    {ebook.available ? (
                      <Link
                        to={ebook.route || "#"}
                        className="mt-auto w-full py-4 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-colors text-center block"
                      >
                        {ebook.btnText}
                      </Link>
                    ) : (
                      <button className="mt-auto w-full py-4 border border-white/10 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl cursor-not-allowed">
                        {ebook.btnText}
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

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
                    {book.cover ? (
                      <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${book.color} flex flex-col items-center justify-center p-5 text-center`}>
                        <BookOpen size={28} className="text-white/40 mb-3" />
                        <h3 className="text-sm font-black leading-tight tracking-tight text-white/90">{book.title}</h3>
                        <p className="text-[9px] text-white/50 mt-2 font-bold uppercase tracking-widest">{book.author}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-5 flex flex-col justify-end group-hover:opacity-0 transition-opacity duration-300">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70 block mb-1">{book.author}</span>
                      <h3 className="text-lg font-black leading-tight tracking-tighter drop-shadow-md">{book.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                      <h3 className="text-base font-black tracking-tight text-center px-4">{book.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold">{book.author}</p>
                      <button
                        onClick={(e) => handleDownload(e, book.pdf)}
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
