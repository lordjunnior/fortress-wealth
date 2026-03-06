import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AudiotecaSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-14 md:mb-20">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-foreground">
            UNIVERSIDADE <span className="text-destructive italic font-light">SONORA</span>
          </h2>
          <div className="max-w-3xl">
            <h3 className="text-lg md:text-2xl font-black uppercase text-foreground mb-4">
              Sem tempo para ler? Continue aprendendo enquanto vive.
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
              Transforme tempo morto em vantagem competitiva. Audiolivros e leituras comentadas para quem estuda dirigindo, treinando ou cuidando da casa.
            </p>
          </div>
        </header>

        {/* Conversion Copy */}
        <div className="mb-12 md:mb-16 border-l-4 border-destructive pl-6">
          <p className="text-foreground font-black text-lg md:text-xl tracking-tight mb-2">
            Domine o conhecimento enquanto o mundo se distrai.
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            Acesso exclusivo aos conteúdos narrados que moldam a mente de quem não aceita o sistema.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14 md:mb-20">
          {/* Card 01: Fundamentos */}
          <div className="card-wealth p-6 md:p-10 rounded-sm">
            <span className="text-destructive font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Fundamentos</span>
            <h4 className="text-xl md:text-3xl font-black text-foreground mb-4 italic tracking-tight">Pai Rico, Pai Pobre</h4>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Aprenda a diferença entre ativos e passivos enquanto transforma rotina em estudo. (Robert Kiyosaki • 16:31)
            </p>
            <Link to="/audiobooks" className="inline-flex items-center gap-3 text-foreground font-black text-xs uppercase tracking-widest border-b-2 border-destructive pb-1 hover:gap-4 transition-all">
              Ouvir Agora <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 02: Soberania */}
          <div className="card-wealth p-6 md:p-10 rounded-sm">
            <span className="text-destructive font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Soberania</span>
            <h4 className="text-xl md:text-3xl font-black text-foreground mb-4 italic tracking-tight">Série: Autocustódia</h4>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-bold">
              "Not your keys, not your money." Princípios operacionais por Lord Junnior para reduzir dependência.
            </p>
            <Link to="/audiobooks" className="inline-flex items-center gap-3 text-foreground font-black text-xs uppercase tracking-widest border-b-2 border-destructive pb-1 hover:gap-4 transition-all">
              Acessar Playlist <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-14 md:mb-20">
          <Link
            to="/audiobooks"
            className="btn-primary inline-flex items-center gap-3"
          >
            Entrar no Ambiente <ChevronRight size={16} />
          </Link>
        </div>

        {/* Footer de Impacto */}
        <div className="border-t border-border pt-8 md:pt-12 flex flex-col md:flex-row justify-between gap-6 md:gap-8">
          <div className="space-y-2">
            <p className="text-foreground font-black uppercase text-sm tracking-tighter">Quem não assume a custódia aceita a dependência.</p>
            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Autocustódia exige responsabilidade.</p>
          </div>
          <div className="md:text-right">
            <p className="text-destructive font-black uppercase text-sm tracking-tighter">Dependência financeira nunca foi acidente.</p>
            <p className="text-foreground font-bold uppercase text-[10px] tracking-widest italic">Sempre foi projeto.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudiotecaSection;
