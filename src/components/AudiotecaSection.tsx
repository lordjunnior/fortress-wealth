import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Headphones, Play } from "lucide-react";

const audioBooks = [
  { title: "As Seis Lições", author: "Ludwig von Mises", duration: "3h 42min" },
  { title: "Democracia: O Deus que Falhou", author: "H-H. Hoppe", duration: "8h 15min" },
  { title: "Pelo Fim do Banco Central", author: "Murray Rothbard", duration: "4h 28min" },
  { title: "Bitcoin White Paper", author: "Satoshi Nakamoto", duration: "0h 35min" },
];

const AudiotecaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="pre-title">AUDIOTECA SOBERANA</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Sem tempo para ler?{" "}
            <span className="text-gradient-gold">Ouça enquanto produz.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Audiobooks e conteúdos narrados para blindar sua mente no trânsito, na academia ou no trabalho.
          </p>
        </motion.div>

        <div className="card-wealth">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Playlist Soberana</p>
              <p className="text-xs text-muted-foreground">{audioBooks.length} títulos · Sem propaganda</p>
            </div>
          </div>

          <div className="space-y-2">
            {audioBooks.map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Play className="w-3 h-3 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{book.duration}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudiotecaSection;
