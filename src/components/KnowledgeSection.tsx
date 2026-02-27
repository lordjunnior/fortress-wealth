import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Download, BookOpen, FileText } from "lucide-react";
import FormationSection from "@/components/FormationSection";
import { fadeUp, stagger, staggerChild, viewportOnce, ease } from "@/lib/motion";

import bookSeisLicoes from "@/assets/book-seis-licoes.jpg";
import bookDemocracia from "@/assets/book-democracia.jpg";
import bookBancoCentral from "@/assets/book-banco-central.jpg";
import bookWhitepaper from "@/assets/book-whitepaper.jpg";
import bookRedpill from "@/assets/book-redpill.jpg";

const trails = [
  { level: "Iniciante", title: "Fundamentos do Dinheiro", desc: "Entenda por que o sistema fiduciário falha e a história da moeda.", btn: "Ler Artigo", route: "/economia" },
  { level: "Essencial", title: "Autocustódia", desc: "Arquitetura de chaves privadas, Cold Wallets e o fim da dependência bancária.", btn: "Acessar Guia", route: "/autocustodia" },
  { level: "Intermediário", title: "Rede Lightning", desc: "A camada de liquidez que torna o Bitcoin dinheiro corrente instantâneo.", btn: "Acessar Guia", route: "/lightning" },
  { level: "Técnico", title: "Infraestrutura Soberana", desc: "Rode seu próprio Node. 'Don't Trust, Verify'.", btn: "Acessar Guia", route: "/infraestrutura" },
  { level: "Avançado", title: "Economia Paralela", desc: "Operações P2P via BISQ e transações sem intermediários e KYC.", btn: "Acessar Guia", route: "/economia-paralela" },
  { level: "Extremo", title: "Herança Soberana", desc: "Estruture suas chaves (multisig/timelock) para seus herdeiros acessarem seu patrimônio sem inventários.", btn: "Acessar Protocolo", route: "/filosofia" },
];

const books = [
  {
    title: "As Seis Lições",
    author: "Ludwig von Mises",
    cover: bookSeisLicoes,
    desc: "A cartilha definitiva da Escola Austríaca: inflação, intervencionismo e o colapso inevitável do estado planejador.",
    pages: "106 págs",
    tag: "ECONOMIA",
    pdf: "/pdfs/seis-licoes.pdf",
  },
  {
    title: "Democracia: O Deus que Falhou",
    author: "Hans-Hermann Hoppe",
    cover: bookDemocracia,
    desc: "Por que a democracia destrói a civilização mais rápido que qualquer monarquia. Análise radical e sem filtros.",
    pages: "322 págs",
    tag: "FILOSOFIA POLÍTICA",
    pdf: "/pdfs/democracia-deus-falhou.pdf",
  },
  {
    title: "Pelo Fim do Banco Central",
    author: "Murray Rothbard",
    cover: bookBancoCentral,
    desc: "Rothbard disseca o sistema bancário de reservas fracionárias e demonstra como o Fed rouba seu poder de compra.",
    pages: "198 págs",
    tag: "SISTEMA MONETÁRIO",
    pdf: "/pdfs/fim-banco-central.pdf",
  },
  {
    title: "Bitcoin White Paper",
    author: "Satoshi Nakamoto",
    cover: bookWhitepaper,
    desc: "O documento que iniciou a revolução: um sistema de dinheiro eletrônico peer-to-peer sem terceiros de confiança.",
    pages: "9 págs",
    tag: "CRIPTOGRAFIA",
    pdf: "/pdfs/bitcoin-whitepaper.pdf",
  },
  {
    title: "Bitcoin Red Pill",
    author: "Renato Amoedo & Alan Schramm",
    cover: bookRedpill,
    desc: "O despertar sobre dinheiro, liberdade e soberania individual através do Bitcoin. A pílula vermelha brasileira.",
    pages: "284 págs",
    tag: "BITCOIN",
    pdf: "/pdfs/bitcoin-redpill.pdf",
  },
];

const KnowledgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);
  const navigate = useNavigate();

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <p className="pre-title">ARSENAL DE CONHECIMENTO</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
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
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-3 mb-16"
        >
          {trails.map((trail, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="card-wealth flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group cursor-pointer"
              onClick={() => navigate(trail.route)}
            >
              <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded w-fit whitespace-nowrap">
                {trail.level.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm mb-1">{trail.title}</h4>
                <p className="text-xs text-muted-foreground">{trail.desc}</p>
              </div>
              <button className="flex items-center gap-2 text-gold text-sm font-medium whitespace-nowrap group-hover:gap-3 transition-all duration-500">
                {trail.btn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF Library */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-gold" />
            <h3 className="font-display text-xl font-semibold">Biblioteca em PDF</h3>
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {books.map((book, i) => (
              <motion.a
                key={i}
                variants={staggerChild}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: ease.sovereign }}
                className="group cursor-pointer"
                href={book.pdf}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-wealth p-0 overflow-hidden flex flex-col h-full">
                  {/* Cover Image */}
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                      <span className="flex items-center gap-2 text-gold font-semibold text-sm">
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </span>
                    </div>
                    {/* Tag */}
                    <span className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-gold bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                      {book.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-sm font-bold mb-1 group-hover:text-gold transition-colors duration-500 leading-tight">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed flex-1">
                      {book.desc}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {book.pages}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
