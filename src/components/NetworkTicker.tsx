import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const NetworkTicker = () => {
  const [block, setBlock] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, blockRes] = await Promise.all([
          fetch("https://mempool.space/api/v1/prices"),
          fetch("https://mempool.space/api/blocks/tip/height"),
        ]);
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          setPrice(priceData.USD);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-[#070A12]/90 backdrop-blur-md"
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-center gap-8 py-2 px-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-chart-green animate-pulse" />
          <span className="font-mono text-[11px] text-muted-foreground">BLOCK</span>
          <span className="font-mono text-[11px] text-foreground">{block !== null ? block.toLocaleString("pt-BR") : "---"}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">BTC/USD</span>
          <span className="font-mono text-[11px] text-chart-green">
            {price !== null ? `$${price.toLocaleString("en-US")}` : "---"}
          </span>
        </div>
        <div className="w-px h-3 bg-border" />
        <span className="font-mono text-[10px] text-muted-foreground/50 hidden sm:block">
          BITCOIN · FUNCIONA 24H, TODO DIA · SEM BANCOS
        </span>
      </div>
    </motion.div>
  );
};

export default NetworkTicker;
