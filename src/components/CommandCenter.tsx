import { useState, useEffect, useRef } from "react";

// ===== CONFIGURAÇÃO FISCAL (LOA 2025 / Receita Federal) =====
const ARRECADACAO_ANUAL = 3e12;
const DIVIDA_PUBLICA_BASE = 8.5e12;
const DIVIDA_CRESCIMENTO_ANUAL = 0.08;
const POPULACAO = 203e6;
const SEGUNDOS_ANO = 365 * 24 * 3600;
const IMPOSTO_POR_SEGUNDO = ARRECADACAO_ANUAL / SEGUNDOS_ANO;
const DIVIDA_POR_SEGUNDO = (DIVIDA_PUBLICA_BASE * DIVIDA_CRESCIMENTO_ANUAL) / SEGUNDOS_ANO;
const TICK_MS = 200;

const getSecondsFromYearStart = () => {
  const now = Date.now();
  const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  return (now - startOfYear) / 1000;
};

const getSecondsFromDayStart = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return (now.getTime() - startOfDay) / 1000;
};

const formatBRL = (n: number) => {
  if (n >= 1e12) return `R$ ${(n / 1e12).toFixed(3).replace(".", ",")} TRI`;
  if (n >= 1e9) return `R$ ${(n / 1e9).toFixed(2).replace(".", ",")} BI`;
  if (n >= 1e6) return `R$ ${(n / 1e6).toFixed(1).replace(".", ",")} MI`;
  return `R$ ${n.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
};

const formatFullBRL = (n: number) =>
  `R$ ${Math.floor(n).toLocaleString("pt-BR")}`;

interface FlashState {
  fiscal: "up" | "down" | null;
  divida: "up" | "down" | null;
}

const CommandCenter = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [fiscalHoje, setFiscalHoje] = useState("---");
  const [fiscalAno, setFiscalAno] = useState("---");
  const [dividaPublica, setDividaPublica] = useState("---");
  const [impostoSeg, setImpostoSeg] = useState("---");
  const [impostoPessoa, setImpostoPessoa] = useState("---");
  const [flash, setFlash] = useState<FlashState>({ fiscal: null, divida: null });
  const [isOpen, setIsOpen] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const isVisibleRef = useRef(true);
  const prevFiscalRef = useRef(0);
  const prevDividaRef = useRef(0);

  // Bitcoin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, blockRes] = await Promise.all([
          fetch("https://mempool.space/api/v1/prices"),
          fetch("https://mempool.space/api/blocks/tip/height"),
        ]);
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          setPriceUsd(priceData.USD);
        }
        if (blockRes.ok) {
          const blockData = await blockRes.text();
          setBlock(parseInt(blockData, 10));
        }
      } catch { /* silent */ }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Visibility
  useEffect(() => {
    const handler = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) lastFrameRef.current = 0;
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Fiscal clock
  useEffect(() => {
    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (!isVisibleRef.current) return;
      if (now - lastFrameRef.current < TICK_MS) return;
      lastFrameRef.current = now;

      const secsDay = getSecondsFromDayStart();
      const secsYear = getSecondsFromYearStart();
      const hoje = secsDay * IMPOSTO_POR_SEGUNDO;
      const ano = secsYear * IMPOSTO_POR_SEGUNDO;
      const divida = DIVIDA_PUBLICA_BASE + secsYear * DIVIDA_POR_SEGUNDO;

      // Flash detection
      if (prevFiscalRef.current > 0) {
        if (hoje > prevFiscalRef.current) setFlash(f => ({ ...f, fiscal: "up" }));
      }
      if (prevDividaRef.current > 0) {
        if (divida > prevDividaRef.current) setFlash(f => ({ ...f, divida: "up" }));
      }
      prevFiscalRef.current = hoje;
      prevDividaRef.current = divida;

      // Clear flash after 300ms
      setTimeout(() => setFlash({ fiscal: null, divida: null }), 300);

      setFiscalHoje(formatFullBRL(hoje));
      setFiscalAno(formatBRL(ano));
      setDividaPublica(formatFullBRL(divida));
      setImpostoSeg(formatBRL(Math.round(IMPOSTO_POR_SEGUNDO)));
      setImpostoPessoa(formatBRL(Math.round(ano / POPULACAO)));
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cmd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes cmd-glow {
          0%, 100% { text-shadow: 0 0 4px currentColor; }
          50% { text-shadow: 0 0 12px currentColor; }
        }
        .cmd-flash-up {
          animation: cmd-flash-green 0.3s ease-out;
        }
        .cmd-flash-down {
          animation: cmd-flash-red 0.3s ease-out;
        }
        @keyframes cmd-flash-green {
          0% { background-color: rgba(0,255,136,0.15); }
          100% { background-color: transparent; }
        }
        @keyframes cmd-flash-red {
          0% { background-color: rgba(255,59,59,0.15); }
          100% { background-color: transparent; }
        }
        .cmd-divida {
          animation: cmd-pulse 3s ease-in-out infinite;
        }
        .cmd-fiscal-glow {
          animation: cmd-glow 4s ease-in-out infinite;
        }
        .cmd-panel {
          transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }
      `}</style>

      {/* Toggle button — sits right below the ticker */}
      <div
        className="fixed left-0 right-0 z-[9998] lg:left-[260px]"
        style={{ top: "36px" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[28px] flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
          style={{
            background: isOpen ? "#0b0f14" : "rgba(11,15,20,0.85)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span
            className="inline-block transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
          <span>CENTRO DE COMANDO</span>
          <span
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: "#00ff88", animation: "cmd-pulse 2s ease-in-out infinite" }}
          />
        </button>

        {/* Panel */}
        <div
          className="cmd-panel overflow-hidden"
          style={{
            maxHeight: isOpen ? "400px" : "0px",
            opacity: isOpen ? 1 : 0,
            background: "#0b0f14",
            borderBottom: isOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div className="px-4 md:px-6 py-4 max-w-5xl mx-auto">
            {/* Header */}
            <div
              className="flex items-center gap-2 pb-3 mb-3 font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                style={{ background: "#00ff88", animation: "cmd-pulse 2s ease-in-out infinite" }}
              />
              BASE MACROECONÔMICA — TEMPO REAL
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Coluna esquerda — Fiscal */}
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }} className="md:pr-5">
                <Row
                  label="FISCAL HOJE"
                  value={fiscalHoje}
                  color="#ff3b3b"
                  arrow="up"
                  flash={flash.fiscal}
                  glow
                />
                <Row
                  label="FISCAL ANO"
                  value={fiscalAno}
                  color="#ff3b3b"
                  arrow="up"
                />
                <Row
                  label="IMP/SEG"
                  value={impostoSeg}
                  color="#ff3b3b"
                />
                <Row
                  label="PER CAPITA"
                  value={impostoPessoa}
                  color="#ff3b3b"
                />
                <Row
                  label="DÍVIDA PÚB"
                  value={dividaPublica}
                  color="#ff3b3b"
                  arrow="up"
                  flash={flash.divida}
                  pulse
                />
              </div>

              {/* Coluna direita — Mercado */}
              <div className="md:pl-5 mt-2 md:mt-0">
                <Row
                  label="BTC/USD"
                  value={priceUsd !== null ? `$${priceUsd.toLocaleString("en-US")}` : "---"}
                  color="#00ff88"
                  live
                />
                <Row
                  label="BLOCO"
                  value={block !== null ? block.toLocaleString("pt-BR") : "---"}
                  color="#4da6ff"
                />
                <Row
                  label="SELIC"
                  value="14,25%"
                  color="#ff3b3b"
                  arrow="up"
                />
                <Row
                  label="IPCA"
                  value="5,06%"
                  color="#ff3b3b"
                  arrow="up"
                />
                <Row
                  label="HALVING"
                  value="2028"
                  color="#00ff88"
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-3 pt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.15em] uppercase"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              <span>PROJEÇÃO LOA 2025 · TESOURO NACIONAL</span>
              <span>AUTOCUSTÓDIA É LIBERDADE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Row component ─── */
interface RowProps {
  label: string;
  value: string;
  color: string;
  arrow?: "up" | "down";
  flash?: "up" | "down" | null;
  pulse?: boolean;
  glow?: boolean;
  live?: boolean;
}

const Row = ({ label, value, color, arrow, flash, pulse, glow, live }: RowProps) => (
  <div
    className={`flex items-center justify-between py-[7px] font-mono ${flash === "up" ? "cmd-flash-up" : flash === "down" ? "cmd-flash-down" : ""}`}
    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
  >
    <div className="flex items-center gap-2">
      {live && (
        <span
          className="w-[5px] h-[5px] rounded-full flex-shrink-0 animate-pulse"
          style={{ background: "#00ff88" }}
        />
      )}
      <span
        className="text-[10px] tracking-[0.15em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      <span
        className={`text-[13px] font-bold tracking-wide ${pulse ? "cmd-divida" : ""} ${glow ? "cmd-fiscal-glow" : ""}`}
        style={{ color }}
      >
        {value}
      </span>
      {arrow === "up" && (
        <span style={{ color: "#ff3b3b", fontSize: "9px", fontWeight: 700 }}>▲</span>
      )}
      {arrow === "down" && (
        <span style={{ color: "#00ff88", fontSize: "9px", fontWeight: 700 }}>▼</span>
      )}
    </div>
  </div>
);

export default CommandCenter;
