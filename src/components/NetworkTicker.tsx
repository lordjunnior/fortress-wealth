import { useState, useEffect } from "react";

const NetworkTicker = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [priceUsd, setPriceUsd] = useState<number | null>(null);

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

  const items = [
    { dot: true, label: "BTC/USD", value: priceUsd !== null ? `$${priceUsd.toLocaleString("en-US")}` : "---", status: "up" as const, statusText: "LIVE" },
    { label: "BLOCO", value: block !== null ? block.toLocaleString("pt-BR") : "---" },
    { label: "SELIC", value: "14,25%", status: "down" as const, statusText: "roubo anual" },
    { label: "INFLAÇÃO IPCA", value: "5,06%", status: "down" as const, statusText: "seu dinheiro encolhe" },
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
          animation: ticker-scroll 35s linear infinite;
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
