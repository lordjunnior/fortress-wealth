import { useReadingProgress } from "@/hooks/useReadingProgress";
import { motion } from "framer-motion";

const ReadingLevelIndicator = () => {
  const { level, label, percent } = useReadingProgress();

  return (
    <div className="px-5 py-3 border-b border-border/50">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
          Nível {level}
        </span>
        <span className="font-mono text-[9px] text-gold">
          {percent}%
        </span>
      </div>
      <p className="text-[10px] text-foreground font-medium tracking-wide mb-2">
        {label}
      </p>
      <div className="h-[3px] bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full gradient-gold rounded-full"
        />
      </div>
    </div>
  );
};

export default ReadingLevelIndicator;
