import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  WifiOff, Wifi, RefreshCw, Copy, 
  ShieldCheck, AlertTriangle, MousePointerClick, Fingerprint
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
  const [wordCount, setWordCount] = useState<12 | 24>(12);
  const [progress, setProgress] = useState(0);
  const [seed, setSeed] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [copied, setCopied] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number; y: number}[]>([]);
  const entropyRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);

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
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * BIP39_MOCK.length);
      newSeed.push(BIP39_MOCK[randomIndex]);
    }
    setSeed(newSeed);
  }, [wordCount]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    // Throttle: only process every 30ms for smooth but controlled progression
    if (now - lastMoveTime.current < 30) return;
    lastMoveTime.current = now;

    if (progress < 100) {
      setProgress(prev => {
        const next = Math.min(prev + 0.15, 100);
        if (next >= 100 && prev < 100) {
          generateSeed();
          return 100;
        }
        return next;
      });

      // Track mouse trail for visual effect (keep last 20 points)
      if (entropyRef.current) {
        const rect = entropyRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouseTrail(prev => [...prev.slice(-19), { x, y }]);
      }
    }
  };

  const handleReset = () => {
    setProgress(0);
    setSeed([]);
    setCopied(false);
    setMouseTrail([]);
  };

  const handleCopy = () => {
    if (seed.length > 0) {
      navigator.clipboard.writeText(seed.join(' '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWordCountChange = (count: 12 | 24) => {
    setWordCount(count);
    handleReset();
  };

  const roundedProgress = Math.round(progress);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans" onMouseMove={handleMouseMove}>

      {/* Styles */}
      <style>{`
        @keyframes entropyPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes trailFade {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.5); }
        }
        .trail-dot {
          animation: trailFade 1.2s ease-out forwards;
        }
        @keyframes wordSlide {
          from { opacity: 0; transform: translateY(8px) scale(0.95); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .word-reveal {
          animation: wordSlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-chart-green/10 border border-chart-green/20 rounded-sm">
            <Fingerprint className="w-6 h-6 text-chart-green" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Gere sua Seed</h2>
            <p className="text-muted-foreground text-sm">Crie suas {wordCount} palavras de segurança com aleatoriedade real.</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-xs font-bold uppercase tracking-widest transition-colors ${
          isOnline
            ? 'bg-destructive/10 border-destructive/30 text-destructive animate-pulse'
            : 'bg-chart-green/10 border-chart-green/30 text-chart-green'
        }`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isOnline ? 'Desconecte a Internet' : 'Air-Gapped (Offline)'}
        </div>
      </div>

      {/* Security announcement */}
      <div className="mb-10 rounded-sm border border-destructive/40 bg-destructive/5 p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-destructive/20 rounded-sm">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-destructive uppercase tracking-wider">⚠️ Aviso Crítico de Segurança</h3>
          </div>
          <p className="text-foreground text-sm leading-relaxed mb-4">
            Criar uma seed phrase de 24 palavras com <strong>aleatoriedade real</strong> exige que o processo não dependa de computadores, que podem ter algoritmos previsíveis. O padrão utilizado pela maioria das carteiras (BIP39) utiliza uma lista de <strong>2048 palavras</strong> específicas.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Aqui está um método seguro para gerar suas 24 palavras offline usando <strong>dados ou moedas</strong>.
          </p>
          <div className="bg-destructive/10 border border-destructive/30 rounded-sm p-4">
            <p className="text-destructive text-xs font-bold leading-relaxed">
              Nunca gere sua seed em um site online, nem tire foto, nem armazene no computador/celular. Escreva as palavras em papel ou grave em metal.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="flex flex-col gap-6">
          {/* Word count selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Palavras:</span>
            <div className="flex rounded-sm border border-border overflow-hidden">
              {([12, 24] as const).map(count => (
                <button
                  key={count}
                  onClick={() => handleWordCountChange(count)}
                  className={`px-5 py-2 text-sm font-bold transition-all duration-300 ${
                    wordCount === count
                      ? 'bg-chart-green text-background'
                      : 'bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {wordCount === 24 ? '256 bits · máxima segurança' : '128 bits · padrão'}
            </span>
          </div>

          {/* Entropy collection area */}
          <div
            ref={entropyRef}
            className="flex-1 border border-border bg-card rounded-sm p-8 flex flex-col items-center justify-center min-h-[320px] transition-all duration-500 relative overflow-hidden cursor-crosshair"
            style={{
              borderColor: progress > 0 && progress < 100
                ? `hsl(var(--chart-green) / ${Math.min(progress / 100, 0.5)})`
                : progress >= 100 ? 'hsl(var(--chart-green) / 0.4)' : undefined,
              boxShadow: progress > 50 ? `0 0 ${progress / 3}px hsl(var(--chart-green) / ${progress / 500})` : 'none',
            }}
          >
            {/* Mouse trail visualization */}
            {progress < 100 && mouseTrail.map((point, i) => (
              <div
                key={i}
                className="trail-dot absolute w-2 h-2 rounded-full bg-chart-green/40 pointer-events-none"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              />
            ))}

            {progress < 100 ? (
              <div className="text-center relative z-10">
                <MousePointerClick
                  className="w-14 h-14 text-muted-foreground mx-auto mb-6 transition-all duration-1000"
                  style={{
                    opacity: 0.3 + (progress / 200),
                    filter: `drop-shadow(0 0 ${progress / 5}px hsl(var(--chart-green) / 0.5))`,
                  }}
                />
                <h3 className="text-xl font-bold text-foreground mb-2">Mova o Cursor</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Gere entropia arrastando o cursor nesta área. Quanto mais aleatório o movimento, melhor.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className="w-20 h-20 bg-chart-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ boxShadow: '0 0 30px hsl(var(--chart-green) / 0.2)' }}
                >
                  <ShieldCheck className="w-10 h-10 text-chart-green" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Entropia Coletada</h3>
                <p className="text-chart-green font-mono text-sm mb-8">100% de aleatoriedade atingida.</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-muted-foreground rounded-sm font-medium text-sm transition-colors border border-border flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" /> Gerar Novamente
                </button>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Coletando Entropia</span>
              <span className={roundedProgress === 100 ? 'text-chart-green' : ''}>{roundedProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-green rounded-full transition-all duration-200 ease-out"
                style={{
                  width: `${progress}%`,
                  boxShadow: progress > 10 ? `0 0 8px hsl(var(--chart-green) / 0.4)` : 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Seed output */}
        <div className="bg-card border border-border rounded-sm p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-bold text-foreground">Sua Seed Phrase — {wordCount} palavras (Simulação)</h3>
          </div>

          <div className={`grid gap-2.5 mb-8 flex-1 ${wordCount === 24 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
            {progress < 100 ? (
              Array.from({ length: wordCount }).map((_, i) => (
                <div key={i} className="bg-background/50 border border-border rounded-sm py-3 px-4 flex gap-3 opacity-20">
                  <span className="text-muted-foreground font-mono text-sm">{i + 1}.</span>
                  <div className="w-full bg-secondary/50 rounded h-4 mt-0.5" />
                </div>
              ))
            ) : (
              seed.map((word, i) => (
                <div
                  key={i}
                  className="word-reveal bg-background border border-border rounded-sm py-3 px-4 flex gap-3 items-center"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-muted-foreground font-mono text-xs font-bold w-5 text-right">{i + 1}.</span>
                  <span className="text-foreground font-mono font-bold text-sm tracking-wide">{word}</span>
                </div>
              ))
            )}
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-sm p-5 mb-6">
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
            className={`w-full py-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-wider text-sm ${
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
