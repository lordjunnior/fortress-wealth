import React, { useState, useEffect, useCallback } from 'react';
import { 
  WifiOff, Wifi, RefreshCw, Copy, 
  ShieldCheck, AlertTriangle, MousePointerClick
} from 'lucide-react';

const BIP39_MOCK = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
  "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
  "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
  "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert",
  "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor", "ancient"
];

const GeradorEntropy: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [seed, setSeed] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const generateSeed = useCallback(() => {
    const newSeed: string[] = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * BIP39_MOCK.length);
      newSeed.push(BIP39_MOCK[randomIndex]);
    }
    setSeed(newSeed);
  }, []);

  const handleMouseMove = () => {
    if (progress < 100) {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100 && prev < 100) {
          generateSeed();
          return 100;
        }
        return next;
      });
    }
  };

  const handleReset = () => {
    setProgress(0);
    setSeed([]);
    setCopied(false);
  };

  const handleCopy = () => {
    if (seed.length === 12) {
      navigator.clipboard.writeText(seed.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in font-sans" onMouseMove={handleMouseMove}>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-chart-green/10 border border-chart-green/20 rounded-xl">
            <MousePointerClick className="w-6 h-6 text-chart-green" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Gerador de Seed</h2>
            <p className="text-muted-foreground text-sm">Crie suas 12 palavras de segurança com aleatoriedade real.</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-colors ${
          isOnline
            ? 'bg-destructive/10 border-destructive/30 text-destructive animate-pulse'
            : 'bg-chart-green/10 border-chart-green/30 text-chart-green'
        }`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isOnline ? 'Desconecte a Internet' : 'Air-Gapped (Offline)'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="flex flex-col gap-6">
          <div className="flex-1 border-2 border-dashed border-border bg-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all">
            {progress < 100 ? (
              <div className="text-center opacity-70">
                <MousePointerClick className="w-16 h-16 text-muted-foreground mx-auto mb-6 animate-bounce" />
                <h3 className="text-xl font-bold text-foreground mb-2">Mova o Mouse</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Gere entropia arrastando o cursor nesta tela.
                </p>
              </div>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="w-20 h-20 bg-chart-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-chart-green" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Entropia Coletada</h3>
                <p className="text-chart-green font-mono text-sm mb-8">100% de aleatoriedade atingida.</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-muted-foreground rounded-lg font-medium text-sm transition-colors border border-border flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" /> Gerar Novamente
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Coletando Caos</span>
              <span className={progress === 100 ? 'text-chart-green' : ''}>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-green transition-all duration-75 shadow-[0_0_10px_hsl(var(--chart-green)/0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-bold text-foreground">Sua Seed Phrase (Simulação)</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 flex-1">
            {progress < 100 ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-background/50 border border-border rounded-lg py-3 px-4 flex gap-3 opacity-30">
                  <span className="text-muted-foreground font-mono text-sm">{i + 1}.</span>
                  <div className="w-full bg-secondary/50 rounded h-4 mt-0.5"></div>
                </div>
              ))
            ) : (
              seed.map((word, i) => (
                <div
                  key={i}
                  className="bg-background border border-border rounded-lg py-3 px-4 flex gap-3 items-center animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="text-muted-foreground font-mono text-xs font-bold w-4 text-right">{i + 1}.</span>
                  <span className="text-foreground font-mono font-bold text-sm tracking-wide">{word}</span>
                </div>
              ))
            )}
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 mb-6">
            <p className="text-gold/90 text-xs leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong className="text-gold">Atenção:</strong> Esta é uma ferramenta educativa. Não use estas palavras para guardar fundos reais. Para segurança máxima, use uma Hardware Wallet ou gere offline com dados (dices).
              </span>
            </p>
          </div>

          <button
            onClick={handleCopy}
            disabled={progress < 100}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-sm ${
              progress < 100
                ? 'bg-chart-green/10 text-chart-green/30 cursor-not-allowed'
                : copied
                ? 'bg-chart-green text-foreground'
                : 'bg-chart-green hover:bg-chart-green/90 text-background shadow-[0_0_20px_hsl(var(--chart-green)/0.3)]'
            }`}
          >
            {copied ? <ShieldCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Palavras Copiadas!' : 'Copiar Palavras'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default GeradorEntropy;
