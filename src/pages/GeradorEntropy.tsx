import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MousePointer, Copy, Check } from 'lucide-react';

const BIP39_SAMPLE = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
  "acoustic", "acquire", "across", "act", "action", "actor", "actress", "actual",
  "adapt", "add", "addict", "address", "adjust", "admit", "adult", "advance",
  "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
  "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album",
];

const GeradorEntropy: React.FC = () => {
  const [entropy, setEntropy] = useState<number[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = Math.min(entropy.length / 256, 1);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (words.length > 0) return;
    setGenerating(true);
    setEntropy(prev => {
      if (prev.length >= 256) return prev;
      const val = (e.clientX * e.clientY * Date.now()) % 2048;
      return [...prev, val];
    });
  }, [words.length]);

  const generateWords = useCallback(() => {
    if (entropy.length < 256) return;
    const generated = Array.from({ length: 12 }, (_, i) => {
      const idx = entropy[i * 20] % BIP39_SAMPLE.length;
      return BIP39_SAMPLE[idx];
    });
    setWords(generated);
  }, [entropy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(words.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setEntropy([]);
    setWords([]);
    setGenerating(false);
  };

  if (entropy.length >= 256 && words.length === 0) {
    generateWords();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-chart-green/10 text-chart-green px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <ShieldCheck className="w-4 h-4" />
          Air-Gapped · 100% Offline
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Gerador de <span className="text-gold">Entropia Real</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mova o mouse caoticamente na área abaixo para gerar aleatoriedade real. Nenhum dado sai do seu navegador.
        </p>
      </div>

      {words.length === 0 ? (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative bg-card border-2 border-dashed border-border rounded-2xl h-80 flex flex-col items-center justify-center cursor-crosshair hover:border-gold/50 transition-colors"
        >
          <MousePointer className="w-8 h-8 text-muted-foreground mb-4 animate-bounce" />
          <p className="text-muted-foreground font-mono text-sm mb-6">
            {generating ? 'Coletando entropia...' : 'Mova o mouse aqui'}
          </p>
          <div className="w-64 h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-3">
            {Math.round(progress * 100)}% — {entropy.length}/256 bits
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-card border border-gold/30 rounded-2xl p-8">
            <p className="font-mono text-xs text-gold mb-4 uppercase tracking-widest">Sua Seed (12 palavras):</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {words.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-secondary rounded-lg p-3 text-center"
                >
                  <span className="text-muted-foreground text-xs font-mono">{i + 1}.</span>
                  <span className="text-foreground font-bold ml-1">{w}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-sm text-destructive">
            ⚠️ <strong>ATENÇÃO:</strong> Esta é uma demonstração educacional. Para uso real, utilize hardware wallets e geradores verificados com entropia criptográfica adequada.
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 rounded-lg border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/5 transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Seed'}
            </button>
            <button
              onClick={reset}
              className="flex-1 py-3 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:bg-secondary transition-all"
            >
              Gerar Nova
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeradorEntropy;
