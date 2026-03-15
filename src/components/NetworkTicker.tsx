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

const NetworkTicker = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [priceBrl, setPriceBrl] = useState<number | null>(null);

  const [arrecadacaoHoje, setArrecadacaoHoje] = useState("---");
  const [arrecadacaoAno, setArrecadacaoAno] = useState("---");
  const [dividaPublica, setDividaPublica] = useState("---");
  const [impostoSeg, setImpostoSeg] = useState("---");
  const [impostoPessoa, setImpostoPessoa] = useState("---");

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
          if (priceData.BRL) {
            setPriceBrl(priceData.BRL);
          } else if (priceData.USD) {
            setPriceBrl(Math.round(priceData.USD * 5.5));
          }
        }
        if (blockRes.ok) {
          const blockData = await blockRes.text();
          setBlock(parseInt(blockData, 10));
        }
      } catch { /* keep null */ }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pause when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) lastFrameRef.current = 0;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
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

      setArrecadacaoHoje(formatBRL(hoje));
      setArrecadacaoAno(formatBRL(ano));
      setDividaPublica(formatBRL(divida));
      setImpostoSeg(formatBRL(Math.round(IMPOSTO_POR_SEGUNDO)));
      setImpostoPessoa(formatBRL(Math.round(ano / POPULACAO)));
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const items = [
    { label: "BTC/USD", value: priceUsd !== null ? `$${priceUsd.toLocaleString("en-US")}` : "---", color: "green" as const, live: true },
    { label: "BTC/BRL", value: priceBrl !== null ? `R$ ${priceBrl.toLocaleString("pt-BR")}` : "---", color: "green" as const },
    { label: "BLOCO", value: block !== null ? block.toLocaleString("pt-BR") : "---", color: "neutral" as const },
    { label: "SELIC", value: "14,25%", color: "red" as const, arrow: "up" as const },
    { label: "IPCA", value: "5,06%", color: "red" as const, arrow: "up" as const },
    { label: "FISCAL HOJE", value: arrecadacaoHoje, color: "red" as const, arrow: "up" as const },
    { label: "FISCAL ANO", value: arrecadacaoAno, color: "red" as const, arrow: "up" as const },
    { label: "IMP/SEG", value: impostoSeg, color: "red" as const },
    { label: "PER CAPITA", value: impostoPessoa, color: "red" as const },
    { label: "DIVIDA PUB", value: dividaPublica, color: "red" as const, arrow: "up" as const },
    { label: "HALVING", value: "2028", color: "green" as const },
    { label: "", value: "AUTOCUSTODIA E LIBERDADE", color: "gold" as const },
  ];

  const renderItem = (item: typeof items[0], key: number) => (
    <div
      key={key}
      className="ticker-item inline-flex items-center gap-1.5 px-5 py-1 font-mono text-[11px] tracking-wide transition-all duration-200 cursor-default border-r border-border/30"
    >
      {/* Live pulse dot */}
      {item.live && (
        <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 animate-pulse ticker-dot-green" />
      )}

      {/* Label */}
      {item.label && (
        <span className="uppercase tracking-[0.12em] font-medium text-muted-foreground/50 text-[10px]">
          {item.label}
        </span>
      )}

      {/* Value */}
      <span
        className={`font-bold tracking-[0.04em] ${
          item.color === "green" ? "ticker-val-green" :
          item.color === "red" ? "ticker-val-red" :
          item.color === "gold" ? "ticker-val-gold text-[10px] tracking-[0.18em]" :
          "text-muted-foreground"
        }`}
        style={{ fontSize: item.color === "gold" ? "10px" : "12px" }}
      >
        {item.value}
      </span>

      {/* Arrow indicator */}
      {item.arrow === "up" && (
        <span className="ticker-val-red text-[9px] font-bold">▲</span>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes bloomberg-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bloomberg-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: bloomberg-scroll 50s linear infinite;
        }
        .bloomberg-track:hover {
          animation-play-state: paused;
        }
        .ticker-dot-green { background: hsl(var(--success)); }
        .ticker-val-green { color: hsl(var(--success)); }
        .ticker-val-red { color: hsl(var(--danger)); }
        .ticker-val-gold { color: hsl(var(--gold)); }
        .ticker-item:hover {
          background: hsl(var(--muted) / 0.5);
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-[9999] h-[36px] flex items-center overflow-hidden bg-secondary border-b border-border">
        {/* Edge masks using semantic background */}
        <div className="absolute top-0 bottom-0 left-0 w-[50px] z-[2] pointer-events-none bg-gradient-to-r from-secondary to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-[50px] z-[2] pointer-events-none bg-gradient-to-l from-secondary to-transparent" />

        {/* Scrolling track */}
        <div className="bloomberg-track">
          {items.map((item, i) => renderItem(item, i))}
          {items.map((item, i) => renderItem(item, i + items.length))}
        </div>
      </div>
    </>
  );
};

export default NetworkTicker;
