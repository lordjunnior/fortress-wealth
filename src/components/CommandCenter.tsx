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

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const CommandCenter = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [fiscalHoje, setFiscalHoje] = useState("---");
  const [fiscalAno, setFiscalAno] = useState("---");
  const [dividaPublica, setDividaPublica] = useState("---");
  const [impostoSeg, setImpostoSeg] = useState("---");
  const [impostoPessoa, setImpostoPessoa] = useState("---");
  const [timestamp, setTimestamp] = useState(formatTime());
  const [isOpen, setIsOpen] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const isVisibleRef = useRef(true);

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

  // Fiscal clock — rAF driven, no flash spam
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

      setFiscalHoje(formatFullBRL(hoje));
      setFiscalAno(formatBRL(ano));
      setDividaPublica(formatFullBRL(divida));
      setImpostoSeg(formatBRL(Math.round(IMPOSTO_POR_SEGUNDO)));
      setImpostoPessoa(formatBRL(Math.round(ano / POPULACAO)));
      setTimestamp(formatTime());
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <style>{`
        .cmd-panel-content {
          transition: max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.25s ease-in-out;
        }
        .cmd-divida-pulse {
          animation: cmd-divida-slow 4s ease-in-out infinite;
        }
        @keyframes cmd-divida-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        .cmd-fiscal-subtle {
          text-shadow: 0 0 6px rgba(255, 59, 59, 0.2);
        }
      `}</style>

      {/* Toggle bar — NOT overlapping content, part of document flow via pt offset */}
      <div
        className="fixed left-0 right-0 z-[9998] lg:left-[260px]"
        style={{ top: "36px" }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full h-[26px] flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase select-none"
          style={{
            background: "#060a0f",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.3)",
            transition: "color 0.25s ease-in-out",
          }}
        >
          <span
            className="inline-block"
            style={{
              transition: "transform 0.25s ease-in-out",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              fontSize: "8px",
            }}
          >
            ▼
          </span>
          <span>{isOpen ? "FECHAR CENTRO DE COMANDO" : "CENTRO DE COMANDO"}</span>
          <span
            className="w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: "#00ff88" }}
          />
        </button>

        {/* Expandable panel */}
        <div
          className="cmd-panel-content overflow-hidden"
          style={{
            maxHeight: isOpen ? "500px" : "0px",
            opacity: isOpen ? 1 : 0,
            background: "#080c12",
          }}
        >
          <div className="px-4 md:px-6 py-4 max-w-5xl mx-auto">
            {/* Header with LIVE + timestamp */}
            <div
              className="flex items-center justify-between pb-3 mb-3 font-mono"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: "#00ff88" }}
                />
                <span style={{ color: "#00ff88", fontWeight: 600 }}>LIVE</span>
                <span>·</span>
                <span>SINCRONIZADO</span>
                <span>·</span>
                <span>UTC-3</span>
              </div>
              <span
                className="font-mono text-[10px] tracking-wider"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {timestamp}
              </span>
            </div>

            {/* Two-column grid: Fiscal (dominant) | Mercado */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Fiscal — 3 cols, visually dominant */}
              <div
                className="md:col-span-3 md:pr-5"
                style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  CARGA FISCAL · BRASIL
                </div>

                <FiscalRow
                  label="FISCAL HOJE"
                  value={fiscalHoje}
                  arrow="up"
                  dominant
                />
                <FiscalRow
                  label="FISCAL ANO"
                  value={fiscalAno}
                  arrow="up"
                  dominant
                />
                <FiscalRow
                  label="IMP/SEG"
                  value={impostoSeg}
                />
                <FiscalRow
                  label="PER CAPITA"
                  value={impostoPessoa}
                />
                <FiscalRow
                  label="DÍVIDA PÚB"
                  value={dividaPublica}
                  arrow="up"
                  pulse
                />
              </div>

              {/* Mercado — 2 cols */}
              <div className="md:col-span-2 md:pl-5 mt-3 md:mt-0">
                <div
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  MERCADO · REDE
                </div>

                <MarketRow
                  label="BTC/USD"
                  value={priceUsd !== null ? `$${priceUsd.toLocaleString("en-US")}` : "---"}
                  color="#00ff88"
                  live
                />
                <MarketRow
                  label="BLOCO"
                  value={block !== null ? block.toLocaleString("pt-BR") : "---"}
                  color="#4da6ff"
                />
                <MarketRow
                  label="SELIC"
                  value="14,25%"
                  color="#ff3b3b"
                  arrow="up"
                />
                <MarketRow
                  label="IPCA"
                  value="5,06%"
                  color="#ff3b3b"
                  arrow="up"
                />
                <MarketRow
                  label="HALVING"
                  value="2028"
                  color="#00ff88"
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-3 pt-2 flex items-center justify-between font-mono text-[8px] tracking-[0.15em] uppercase"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.15)",
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

/* ─── Fiscal Row — dominant styling, subtle glow ─── */
interface FiscalRowProps {
  label: string;
  value: string;
  arrow?: "up" | "down";
  dominant?: boolean;
  pulse?: boolean;
}

const FiscalRow = ({ label, value, arrow, dominant, pulse }: FiscalRowProps) => (
  <div
    className="flex items-center justify-between py-[6px] font-mono"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
  >
    <span
      className="text-[10px] tracking-[0.15em] uppercase font-medium"
      style={{ color: "rgba(255,255,255,0.3)" }}
    >
      {label}
    </span>
    <div className="flex items-center gap-1.5">
      <span
        className={`font-bold tracking-wide ${dominant ? "cmd-fiscal-subtle" : ""} ${pulse ? "cmd-divida-pulse" : ""}`}
        style={{
          color: "#ff3b3b",
          fontSize: dominant ? "14px" : "12px",
        }}
      >
        {value}
      </span>
      {arrow === "up" && (
        <span style={{ color: "#ff3b3b", fontSize: "8px", fontWeight: 700, opacity: 0.7 }}>▲</span>
      )}
    </div>
  </div>
);

/* ─── Market Row — flash on BTC only (via live dot) ─── */
interface MarketRowProps {
  label: string;
  value: string;
  color: string;
  arrow?: "up" | "down";
  live?: boolean;
}

const MarketRow = ({ label, value, color, arrow, live }: MarketRowProps) => (
  <div
    className="flex items-center justify-between py-[6px] font-mono"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
  >
    <div className="flex items-center gap-2">
      {live && (
        <span
          className="w-[4px] h-[4px] rounded-full flex-shrink-0 animate-pulse"
          style={{ background: "#00ff88" }}
        />
      )}
      <span
        className="text-[10px] tracking-[0.15em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {label}
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      <span
        className="text-[12px] font-bold tracking-wide"
        style={{ color }}
      >
        {value}
      </span>
      {arrow === "up" && (
        <span style={{ color: "#ff3b3b", fontSize: "8px", fontWeight: 700, opacity: 0.7 }}>▲</span>
      )}
      {arrow === "down" && (
        <span style={{ color: "#00ff88", fontSize: "8px", fontWeight: 700, opacity: 0.7 }}>▼</span>
      )}
    </div>
  </div>
);

export default CommandCenter;
