import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Headphones, Play, Pause, Clock, Volume2 } from "lucide-react";

const audioBooks = [
  { title: "As Seis Lições", author: "Ludwig von Mises", duration: "3h 42min", chapters: 6, progress: 0 },
  { title: "Democracia: O Deus que Falhou", author: "H-H. Hoppe", duration: "8h 15min", chapters: 14, progress: 0 },
  { title: "Pelo Fim do Banco Central", author: "Murray Rothbard", duration: "4h 28min", chapters: 11, progress: 0 },
  { title: "Bitcoin White Paper", author: "Satoshi Nakamoto", duration: "0h 35min", chapters: 12, progress: 0 },
];

const AudiotecaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-wealth mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center glow-gold">
                <Headphones className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Playlist Soberana</p>
                <p className="text-xs text-muted-foreground">{audioBooks.length} títulos · Sem propaganda</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gold/60 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Audio tracks */}
        <div className="space-y-3">
          {audioBooks.map((book, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.015, x: 4 }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={`card-wealth cursor-pointer transition-all duration-300 ${
                  isActive ? "!border-gold/40 glow-gold" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Play button */}
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-gold text-background shadow-lg shadow-gold/20"
                        : "bg-secondary hover:bg-gold/20"
                    }`}
                  >
                    {isActive ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 text-muted-foreground ml-0.5" />
                    )}
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate transition-colors ${
                      isActive ? "text-gold" : ""
                    }`}>
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </div>

                  {/* Meta */}
                  <div className="hidden sm:flex items-center gap-4 text-muted-foreground shrink-0">
                    <span className="font-mono text-[10px] flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {book.duration}
                    </span>
                    <span className="font-mono text-[10px] bg-secondary px-2 py-0.5 rounded">
                      {book.chapters} caps
                    </span>
                  </div>
                </div>

                {/* Progress bar (visible when active) */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-3 border-t border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-muted-foreground">0:00</span>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "15%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full"
                        />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{book.duration}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudiotecaSection;
