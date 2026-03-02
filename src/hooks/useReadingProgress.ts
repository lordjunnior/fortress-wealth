import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "bp_reading_progress";

const TRACKED_PAGES = [
  "/economia", "/economia-paralela", "/bitcoin-vs-imovel", "/taxa-de-fuga",
  "/bitcoin", "/entenda-bitcoin", "/autocustodia", "/o-que-e-bitcoin",
  "/nocoes-bitcoin", "/chaves", "/transacoes", "/mineracao", "/lightning",
  "/supply-shock", "/halving-bitcoin", "/volatilidade", "/lastro",
  "/futuro-bitcoin", "/21-milhoes", "/bitcoin-seguro", "/blindagem-golpes",
  "/saida", "/saida/gateway", "/pix-cripto", "/infraestrutura",
  "/projeto-autonomo", "/projeto-autonomo/kit-72h", "/projeto-autonomo/protocolos-apagao",
  "/projeto-autonomo/purificacao-agua", "/projeto-autonomo/abrigo-emergencia",
  "/projeto-autonomo/comunicacao-offline", "/projeto-autonomo/navegacao-primaria",
  "/projeto-autonomo/autonomia-biologica", "/projeto-autonomo/primeiros-socorros",
  "/projeto-autonomo/avaliacao-sinais", "/projeto-autonomo/saude-preventiva",
  "/projeto-autonomo/fitoterapia-aplicada", "/projeto-autonomo/controle-vetores",
  "/projeto-autonomo/horta-urbana", "/projeto-autonomo/producao-pequenos-espacos",
  "/projeto-autonomo/conservacao-armazenamento", "/projeto-autonomo/proteina-sustentavel",
  "/projeto-autonomo/solo-fertilidade", "/projeto-autonomo/sabedoria-ancestral",
  "/projeto-autonomo/conhecimento-perdido",
  "/filosofia", "/educacao", "/protocolo-inicial", "/ebooks", "/audiobooks",
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
