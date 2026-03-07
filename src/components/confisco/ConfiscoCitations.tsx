import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const sources = [
  {
    title: "Medida Provisória n.º 168, de 15 de março de 1990",
    source: "Banco Central do Brasil",
    url: "https://www.bcb.gov.br",
  },
  {
    title: "Plano Collor: O dia em que o Brasil acordou sem dinheiro",
    source: "Folha de São Paulo, 16 de março de 1990",
    url: "https://www.folha.uol.com.br",
  },
  {
    title: "Constituição Federal, Art. 62: Medidas Provisórias",
    source: "Planalto.gov.br",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
  },
  {
    title: "Relatório sobre os efeitos do Plano Collor na economia brasileira",
    source: "Arquivo Nacional",
    url: "https://www.gov.br/arquivonacional",
  },
  {
    title: "PL 3.951/2019: Restrições ao uso de dinheiro em espécie",
    source: "Câmara dos Deputados",
    url: "https://www.camara.leg.br",
  },
];

const ConfiscoCitations = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
      aria-labelledby="sources-heading"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg border border-muted-foreground/20 bg-muted/30 flex items-center justify-center">
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
            FONTES HISTÓRICAS
          </p>
          <h2 id="sources-heading" className="text-xl md:text-2xl font-bold tracking-tight">
            Referências e Documentação
          </h2>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-muted-foreground/20 via-border/50 to-transparent" />

      <ol className="space-y-3 list-decimal list-inside">
        {sources.map((src, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border/30 pl-4 py-1"
          >
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <span className="text-foreground/80 font-medium">{src.title}</span>
              <span className="block text-xs text-muted-foreground/60 mt-0.5">{src.source}</span>
            </a>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
};

export default ConfiscoCitations;
