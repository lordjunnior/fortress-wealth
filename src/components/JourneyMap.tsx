import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X, CheckCircle, Circle, ChevronRight } from "lucide-react";
import { useReadingProgress, type ReadingLevel } from "@/hooks/useReadingProgress";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface JourneyCategory {
  name: string;
  pages: { path: string; title: string }[];
}

const JOURNEY_CATEGORIES: JourneyCategory[] = [
  {
    name: "Bitcoin — Fundamentos",
    pages: [
      { path: "/o-que-e-bitcoin", title: "O que é Bitcoin?" },
      { path: "/nocoes-bitcoin", title: "Noções Essenciais" },
      { path: "/chaves", title: "Chaves Privadas" },
      { path: "/transacoes", title: "Transações" },
      { path: "/mineracao", title: "Mineração" },
      { path: "/blockchain", title: "Blockchain" },
      { path: "/21-milhoes", title: "21 Milhões" },
      { path: "/halving-bitcoin", title: "Halving" },
      { path: "/supply-shock", title: "Supply Shock" },
      { path: "/volatilidade", title: "Volatilidade" },
      { path: "/lastro", title: "Lastro" },
      { path: "/futuro-bitcoin", title: "Futuro" },
    ],
  },
  {
    name: "Segurança & Autocustódia",
    pages: [
      { path: "/bitcoin-seguro", title: "Bitcoin Seguro" },
      { path: "/autocustodia", title: "Autocustódia" },
      { path: "/blindagem-golpes", title: "Blindagem Golpes" },
      { path: "/bitcoin", title: "Bitcoin Hub" },
      { path: "/lightning", title: "Lightning" },
    ],
  },
  {
    name: "Economia & Filosofia",
    pages: [
      { path: "/economia", title: "Economia" },
      { path: "/bitcoin-vs-fiat", title: "Bitcoin vs Fiat" },
      { path: "/bitcoin-vs-imovel", title: "Bitcoin vs Imóvel" },
      { path: "/taxa-de-fuga", title: "Taxa de Fuga" },
      { path: "/filosofia", title: "Filosofia" },
      { path: "/candlestick", title: "Candlestick" },
      { path: "/diversificacao", title: "Diversificação" },
      { path: "/bitcoin-vs-altcoins", title: "Bitcoin vs Altcoins" },
    ],
  },
  {
    name: "Saída & Infraestrutura",
    pages: [
      { path: "/saida", title: "Estratégias de Saída" },
      { path: "/saida/gateway", title: "Gateway" },
      { path: "/pix-cripto", title: "PIX Cripto" },
      { path: "/infraestrutura", title: "Infraestrutura" },
      { path: "/economia-paralela", title: "Economia Paralela" },
    ],
  },
  {
    name: "Educação & Conteúdo",
    pages: [
      { path: "/educacao", title: "Educação" },
      { path: "/protocolo-inicial", title: "Protocolo Inicial" },
      { path: "/ebooks", title: "E-books" },
      { path: "/audiobooks", title: "Audiobooks" },
    ],
  },
  {
    name: "Soberania Orgânica",
    pages: [
      { path: "/soberania-organica", title: "Hub Autônomo" },
      { path: "/soberania-organica/kit-72h", title: "Kit 72h" },
      { path: "/soberania-organica/protocolos-apagao", title: "Protocolos Apagão" },
      { path: "/soberania-organica/purificacao-agua", title: "Purificação Água" },
      { path: "/soberania-organica/abrigo-emergencia", title: "Abrigo Emergência" },
      { path: "/soberania-organica/comunicacao-offline", title: "Comunicação Offline" },
      { path: "/soberania-organica/navegacao-primaria", title: "Navegação Primária" },
      { path: "/soberania-organica/autonomia-biologica", title: "Autonomia Biológica" },
      { path: "/soberania-organica/horta-urbana", title: "Horta Urbana" },
      { path: "/soberania-organica/primeiros-socorros", title: "Primeiros Socorros" },
      { path: "/soberania-organica/avaliacao-sinais", title: "Avaliação Sinais" },
      { path: "/soberania-organica/saude-preventiva", title: "Saúde Preventiva" },
      { path: "/soberania-organica/fitoterapia-aplicada", title: "Fitoterapia" },
      { path: "/soberania-organica/controle-vetores", title: "Controle Vetores" },
      { path: "/soberania-organica/conservacao-armazenamento", title: "Conservação" },
      { path: "/soberania-organica/producao-pequenos-espacos", title: "Pequenos Espaços" },
      { path: "/soberania-organica/proteina-sustentavel", title: "Proteína Sustentável" },
      { path: "/soberania-organica/solo-fertilidade", title: "Solo & Fertilidade" },
      { path: "/soberania-organica/sabedoria-ancestral", title: "Sabedoria Ancestral" },
      { path: "/soberania-organica/conhecimento-perdido", title: "Conhecimento Perdido" },
    ],
  },
];

const JourneyMap = () => {
  const [open, setOpen] = useState(false);
  const { visited, total, percent, label, level } = useReadingProgress();
  const navigate = useNavigate();

  const visitedSet = new Set<string>();
  // Get visited pages from localStorage directly
  try {
    const raw = localStorage.getItem("bp_reading_progress");
    if (raw) JSON.parse(raw).forEach((p: string) => visitedSet.add(p));
  } catch {}

  return (
    <>
      {/* Trigger - shows in sidebar area */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 group"
      >
        <Map className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="text-sm font-medium">Mapa da Jornada</span>
        <span className="ml-auto font-mono text-[9px] text-primary">{percent}%</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-xl z-10">
                <div>
                  <h2 className="font-bold text-foreground text-lg font-display">Mapa da Jornada</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[10px] text-muted-foreground">NÍVEL {level} — {label}</span>
                    <span className="font-mono text-[10px] text-primary">{visited}/{total} páginas · {percent}%</span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="px-6 py-3 border-b border-border/30">
                <div className="h-[4px] bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: EASE }}
                    className="h-full gradient-gold rounded-full"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="overflow-y-auto max-h-[calc(80vh-140px)] px-6 py-4 space-y-6">
                {JOURNEY_CATEGORIES.map((cat) => {
                  const catVisited = cat.pages.filter((p) => visitedSet.has(p.path)).length;
                  const catPercent = Math.round((catVisited / cat.pages.length) * 100);

                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {catVisited}/{cat.pages.length} · {catPercent}%
                        </span>
                      </div>
                      <div className="h-[2px] bg-secondary rounded-full overflow-hidden mb-3">
                        <div className="h-full gradient-gold rounded-full transition-all" style={{ width: `${catPercent}%` }} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {cat.pages.map((page) => {
                          const isVisited = visitedSet.has(page.path);
                          return (
                            <button
                              key={page.path}
                              onClick={() => {
                                setOpen(false);
                                navigate(page.path);
                              }}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                                isVisited
                                  ? "bg-primary/10 text-foreground border border-primary/20"
                                  : "bg-secondary/30 text-muted-foreground border border-transparent hover:border-border/50 hover:text-foreground"
                              }`}
                            >
                              {isVisited ? (
                                <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                              ) : (
                                <Circle className="w-3 h-3 text-muted-foreground/30 shrink-0" />
                              )}
                              <span className="truncate">{page.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JourneyMap;
