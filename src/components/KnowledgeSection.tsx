import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import FormationSection from "@/components/FormationSection";

const trails = [
  { level: "Iniciante", title: "Fundamentos do Dinheiro", desc: "Entenda por que o sistema fiduciário falha e a história da moeda.", btn: "Ler Artigo" },
  { level: "Essencial", title: "Autocustódia", desc: "Arquitetura de chaves privadas, Cold Wallets e o fim da dependência bancária.", btn: "Acessar Guia" },
  { level: "Intermediário", title: "Rede Lightning", desc: "A camada de liquidez que torna o Bitcoin dinheiro corrente instantâneo.", btn: "Acessar Guia" },
  { level: "Técnico", title: "Infraestrutura Soberana", desc: "Rode seu próprio Node. 'Don't Trust, Verify'.", btn: "Acessar Guia" },
  { level: "Avançado", title: "Economia Paralela", desc: "Operações P2P via BISQ e transações sem intermediários e KYC.", btn: "Acessar Guia" },
  { level: "Extremo", title: "Herança Soberana", desc: "Estruture suas chaves (multisig/timelock) para seus herdeiros acessarem seu patrimônio sem inventários.", btn: "Acessar Protocolo" },
];

const books = [
  { title: "As Seis Lições", author: "Ludwig von Mises" },
  { title: "Democracia: O Deus que Falhou", author: "Hans-Hermann Hoppe" },
  { title: "Pelo Fim do Banco Central", author: "Murray Rothbard" },
  { title: "Bitcoin White Paper", author: "Satoshi Nakamoto" },
  { title: "Bitcoin Red Pill", author: "Renato Amoedo & Alan Schramm" },
];

const KnowledgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="pre-title">ARSENAL DE CONHECIMENTO</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            A Base <span className="text-gradient-gold">Intelectual</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Antes de proteger o bolso, você blinda a mente. Manuais técnicos, documentações
            e teoria econômica sem rastro de CPF e sem propagandas.
          </p>
        </motion.div>

        {/* Formation Levels */}
        <FormationSection />

        {/* Learning trails */}
        <div className="space-y-3 mb-16">
          {trails.map((trail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="card-wealth flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group cursor-pointer"
            >
              <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded w-fit whitespace-nowrap">
                {trail.level.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{trail.title}</h4>
                <p className="text-xs text-muted-foreground">{trail.desc}</p>
              </div>
              <button className="flex items-center gap-2 text-gold text-sm font-medium whitespace-nowrap group-hover:gap-3 transition-all duration-300">
                {trail.btn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* PDF Library */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-semibold">Biblioteca em PDF</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {books.map((book, i) => (
              <div
                key={i}
                className="card-wealth flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-14 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
