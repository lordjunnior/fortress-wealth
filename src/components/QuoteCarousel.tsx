import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quotes } from "@/lib/constants";
import { Quote } from "lucide-react";

const QuoteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-wealth relative overflow-hidden min-h-[160px] flex flex-col justify-center">
      <Quote className="absolute top-4 left-4 w-6 h-6 text-gold/20" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-8"
        >
          <p className="text-base md:text-lg text-foreground/90 italic leading-relaxed mb-3">
            "{quotes[currentIndex].text}"
          </p>
          <p className="font-mono text-xs text-gold tracking-wider">
            — {quotes[currentIndex].author}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-gold w-4" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;
