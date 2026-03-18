import { Clock } from "lucide-react";

interface ReadingTimeProps {
  /** Number of words in the article. If not provided, pass a ref to calculate. */
  wordCount?: number;
  /** Direct minutes override */
  minutes?: number;
  className?: string;
}

const WORDS_PER_MINUTE = 200; // Average Portuguese reading speed

const ReadingTime = ({ wordCount, minutes: directMinutes, className = "" }: ReadingTimeProps) => {
  const minutes = directMinutes ?? Math.max(1, Math.ceil((wordCount ?? 0) / WORDS_PER_MINUTE));

  return (
    <div className={`inline-flex items-center gap-1.5 text-muted-foreground ${className}`}>
      <Clock className="w-3.5 h-3.5" />
      <span className="text-xs font-mono tracking-wide">
        {minutes} min de leitura
      </span>
    </div>
  );
};

export default ReadingTime;
