import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const NetworkTicker = () => {
  const [block, setBlock] = useState(893421);
  const [price, setPrice] = useState(104872);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlock((prev) => prev + Math.floor(Math.random() * 2));
      setPrice((prev) => prev + Math.floor(Math.random() * 200 - 80));
    }, 12000);
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
          <span className="font-mono text-[11px] text-foreground">{block.toLocaleString()}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">BTC/USD</span>
          <span className="font-mono text-[11px] text-chart-green">
            ${price.toLocaleString()}
          </span>
        </div>
        <div className="w-px h-3 bg-border" />
        <span className="font-mono text-[10px] text-muted-foreground/50 hidden sm:block">
          REDE SOBERANA · 24/7 · SEM INTERMEDIÁRIOS
        </span>
      </div>
    </motion.div>
  );
};

export default NetworkTicker;
