import { useState, useEffect, useRef, useCallback } from "react";

// ===== CONFIGURAÇÃO FISCAL (LOA 2025 / Receita Federal) =====
const ARRECADACAO_ANUAL = 3e12; // R$ 3 trilhões (estimativa LOA 2025)
const DIVIDA_PUBLICA_BASE = 8.5e12; // R$ 8,5 tri (jan 2025)
const DIVIDA_CRESCIMENTO_ANUAL = 0.08; // ~8% a.a.
const POPULACAO = 203e6; // 203 milhões
const SEGUNDOS_ANO = 365 * 24 * 3600; // 31.536.000
const IMPOSTO_POR_SEGUNDO = ARRECADACAO_ANUAL / SEGUNDOS_ANO; // ~R$ 95.129/s
const DIVIDA_POR_SEGUNDO = (DIVIDA_PUBLICA_BASE * DIVIDA_CRESCIMENTO_ANUAL) / SEGUNDOS_ANO;
const TICK_MS = 200; // atualização suave a cada 200ms
const INCREMENT_FACTOR = TICK_MS / 1000; // fração do incremento por tick

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
  if (n >= 1e12) return `R$ ${(n / 1e12).toFixed(3).replace(".", ",")} tri`;
  if (n >= 1e9) return `R$ ${(n / 1e9).toFixed(2).replace(".", ",")} bi`;
  if (n >= 1e6) return `R$ ${(n / 1e6).toFixed(1).replace(".", ",")} mi`;
  return `R$ ${n.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
};

const NetworkTicker = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [arrecadacaoHoje, setArrecadacaoHoje] = useState("---");
  const [arrecadacaoAno, setArrecadacaoAno] = useState("---");
  const [dividaPublica, setDividaPublica] = useState("---");
  const [impostoSeg, setImpostoSeg] = useState("---");
  const [impostoPessoa, setImpostoPessoa] = useState("---");
  
  // Mutable accumulators to avoid state on every 200ms tick
  const acumRef = useRef({ hoje: 0, ano: 0, divida: 0 });
  const fiscalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
      } catch {
        // keep null on error
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pause when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        // Recalibrate on return
        acumRef.current.hoje = getSecondsFromDayStart() * IMPOSTO_POR_SEGUNDO;
        acumRef.current.ano = getSecondsFromYearStart() * IMPOSTO_POR_SEGUNDO;
        acumRef.current.divida = DIVIDA_PUBLICA_BASE + getSecondsFromYearStart() * DIVIDA_POR_SEGUNDO;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Fiscal clock — smooth 200ms tick
  const updateDisplay = useCallback(() => {
    const ref = acumRef.current;
    setArrecadacaoHoje(formatBRL(ref.hoje));
    setArrecadacaoAno(formatBRL(ref.ano));
    setDividaPublica(formatBRL(ref.divida));
    setImpostoSeg(formatBRL(Math.round(IMPOSTO_POR_SEGUNDO)));
    setImpostoPessoa(formatBRL(Math.round(ref.ano / POPULACAO)));
  }, []);

  useEffect(() => {
    // Initialize from real time
    acumRef.current.hoje = getSecondsFromDayStart() * IMPOSTO_POR_SEGUNDO;
    acumRef.current.ano = getSecondsFromYearStart() * IMPOSTO_POR_SEGUNDO;
    acumRef.current.divida = DIVIDA_PUBLICA_BASE + getSecondsFromYearStart() * DIVIDA_POR_SEGUNDO;
    updateDisplay();

    fiscalRef.current = setInterval(() => {
      if (!isVisibleRef.current) return; // skip when tab hidden
      const inc = IMPOSTO_POR_SEGUNDO * INCREMENT_FACTOR;
      const dInc = DIVIDA_POR_SEGUNDO * INCREMENT_FACTOR;
      acumRef.current.hoje += inc;
      acumRef.current.ano += inc;
      acumRef.current.divida += dInc;
      updateDisplay();
    }, TICK_MS);

    return () => { if (fiscalRef.current) clearInterval(fiscalRef.current); };
  }, [updateDisplay]);

  const items = [
    { dot: true, label: "BTC/USD", value: priceUsd !== null ? `$${priceUsd.toLocaleString("en-US")}` : "---", status: "up" as const, statusText: "LIVE" },
    { label: "BLOCO", value: block !== null ? block.toLocaleString("pt-BR") : "---" },
    { label: "SELIC", value: "14,25%", status: "down" as const, statusText: "roubo anual" },
    { label: "INFLAÇÃO IPCA", value: "5,06%", status: "down" as const, statusText: "seu dinheiro encolhe" },
    { fiscal: true, label: "🔴 FISCAL HOJE", value: arrecadacaoHoje, status: "down" as const, statusText: "e subindo" },
    { fiscal: true, label: "🏛️ FISCAL ANO", value: arrecadacaoAno, status: "down" as const, statusText: "acumulado" },
    { fiscal: true, label: "💸 IMPOSTO/SEG", value: impostoSeg, status: "down" as const, statusText: "por segundo" },
    { fiscal: true, label: "👤 POR PESSOA", value: impostoPessoa, status: "down" as const, statusText: "per capita" },
    { fiscal: true, label: "📈 DÍVIDA PÚBLICA", value: dividaPublica, status: "down" as const, statusText: "crescendo" },
    { label: "PRÓXIMO HALVING", value: "2028", status: "up" as const, statusText: "programado" },
    { manifesto: true, value: "AUTOCUSTÓDIA É LIBERDADE" },
  ];

  const renderItem = (item: typeof items[0], key: number) => (
    <div
      key={key}
      className={`inline-flex items-center gap-2 px-7 font-mono text-[11px] border-r border-foreground/[0.06] ${
        item.manifesto ? "" : "text-muted-foreground"
      }`}
    >
      {item.dot && (
        <span className="w-[5px] h-[5px] rounded-full bg-chart-green animate-pulse flex-shrink-0" />
      )}
      {item.label && (
        <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: "hsl(220 20% 30%)" }}>
          {item.label}
        </span>
      )}
      <span
        className={`font-bold tracking-[0.05em] ${
          item.manifesto ? "text-gold tracking-[0.12em]" : "text-ice-white"
        }`}
      >
        {item.value}
      </span>
      {item.status === "up" && (
        <span className="text-chart-green text-[10px]">{item.statusText}</span>
      )}
      {item.status === "down" && (
        <span className="text-chart-red text-[10px]">{item.statusText}</span>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: ticker-scroll 55s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[38px] flex items-center overflow-hidden"
        style={{
          background: "hsl(222 50% 4%)",
          borderBottom: "1px solid hsl(var(--gold) / 0.2)",
        }}
      >
        {/* Fade edges */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[60px] z-[2] pointer-events-none"
          style={{ background: "linear-gradient(90deg, hsl(222 50% 4%), transparent)" }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[60px] z-[2] pointer-events-none"
          style={{ background: "linear-gradient(-90deg, hsl(222 50% 4%), transparent)" }}
        />

        {/* Scrolling track — items duplicated for seamless loop */}
        <div className="ticker-track">
          {items.map((item, i) => renderItem(item, i))}
          {items.map((item, i) => renderItem(item, i + items.length))}
        </div>
      </div>
    </>
  );
};

export default NetworkTicker;
