import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "bp_reading_progress";

const TRACKED_PAGES = [
  "/economia", "/economia-paralela", "/bitcoin-vs-imovel", "/taxa-de-fuga",
  "/bitcoin", "/autocustodia", "/o-que-e-bitcoin",
  "/nocoes-bitcoin", "/chaves", "/transacoes", "/mineracao", "/lightning",
  "/supply-shock", "/halving-bitcoin", "/volatilidade", "/lastro",
  "/futuro-bitcoin", "/21-milhoes", "/bitcoin-seguro", "/blindagem-golpes",
  "/saida", "/saida/gateway", "/pix-cripto", "/infraestrutura",
  "/soberania-organica", "/soberania-organica/kit-72h", "/soberania-organica/protocolos-apagao",
  "/soberania-organica/purificacao-agua", "/soberania-organica/abrigo-emergencia",
  "/soberania-organica/comunicacao-offline", "/soberania-organica/navegacao-primaria",
  "/soberania-organica/autonomia-biologica", "/soberania-organica/primeiros-socorros",
  "/soberania-organica/avaliacao-sinais", "/soberania-organica/saude-preventiva",
  "/soberania-organica/fitoterapia-aplicada", "/soberania-organica/controle-vetores",
  "/soberania-organica/horta-urbana", "/soberania-organica/producao-pequenos-espacos",
  "/soberania-organica/conservacao-armazenamento", "/soberania-organica/proteina-sustentavel",
  "/soberania-organica/solo-fertilidade", "/soberania-organica/sabedoria-ancestral",
  "/soberania-organica/conhecimento-perdido",
  "/filosofia", "/educacao", "/protocolo-inicial", "/ebooks", "/audiobooks",
  "/blockchain", "/candlestick", "/diversificacao", "/bitcoin-vs-altcoins",
];

export interface ReadingLevel {
  level: number;
  label: string;
  sublabel: string;
  percent: number;
  visited: number;
  total: number;
}

const LEVELS: { min: number; label: string; sublabel: string }[] = [
  { min: 0, label: "Formação básica", sublabel: "Iniciante" },
  { min: 25, label: "Formação aplicada", sublabel: "Praticante" },
  { min: 50, label: "Formação estrutural", sublabel: "Estruturado" },
  { min: 75, label: "Formação completa", sublabel: "Transmissor" },
];

function getVisited(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVisited(pages: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function useReadingProgress(): ReadingLevel {
  const location = useLocation();
  const [visited, setVisited] = useState<string[]>(getVisited);

  useEffect(() => {
    const path = location.pathname;
    if (TRACKED_PAGES.includes(path)) {
      setVisited((prev) => {
        if (prev.includes(path)) return prev;
        const next = [...prev, path];
        saveVisited(next);
        return next;
      });
    }
  }, [location.pathname]);

  const total = TRACKED_PAGES.length;
  const count = visited.length;
  const percent = Math.round((count / total) * 100);

  let currentLevel = LEVELS[0];
  for (const l of LEVELS) {
    if (percent >= l.min) currentLevel = l;
  }

  const levelNum = LEVELS.indexOf(currentLevel) + 1;

  return {
    level: levelNum,
    label: currentLevel.label,
    sublabel: currentLevel.sublabel,
    percent,
    visited: count,
    total,
  };
}
