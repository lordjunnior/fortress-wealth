import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  WifiOff, Wifi, RefreshCw, Copy,
  ShieldCheck, AlertTriangle, MousePointerClick, Fingerprint
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const BIP39_MOCK = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
  "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
  "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
  "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert",
  "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor", "ancient"
];

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

const GeradorEntropy: React.FC = () => {
  const [wordCount, setWordCount] = useState<12 | 24>(12);
  const [progress, setProgress] = useState(0);
  const [seed, setSeed] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [copied, setCopied] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number; y: number}[]>([]);
  const entropyRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); };
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
    if (now - lastMoveTime.current < 30) return;
    lastMoveTime.current = now;
    if (progress < 100) {
      setProgress(prev => {
        const next = Math.min(prev + 0.5, 100);
        if (next >= 100 && prev < 100) { generateSeed(); return 100; }
        return next;
      });
      if (entropyRef.current) {
        const rect = entropyRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouseTrail(prev => [...prev.slice(-19), { x, y }]);
      }
    }
  };

  const handleReset = () => { setProgress(0); setSeed([]); setCopied(false); setMouseTrail([]); };
  const handleCopy = () => { if (seed.length > 0) { navigator.clipboard.writeText(seed.join(' ')); setCopied(true); setTimeout(() => setCopied(false), 2000); } };
  const handleWordCountChange = (count: 12 | 24) => { setWordCount(count); handleReset(); };
  const roundedProgress = Math.round(progress);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: '#050808' }} onMouseMove={handleMouseMove}>

      <Helmet>
        <title>Gerador de Seed Phrase BIP39 Offline — 100% Client-Side | Lord Junnior</title>
        <meta name="description" content="Gerador de Seed Phrase BIP39 Offline: Use entropia real para criar suas chaves privadas de Bitcoin sem enviar dados para a rede. Segurança 100% client-side." />
        <link rel="canonical" href="https://lordjunnior.com.br/ferramentas/entropy" />
        <meta property="og:title" content="Gerador de Seed Offline: Segurança Máxima no Navegador" />
        <meta property="og:description" content="Crie sua seed phrase de 12 ou 24 palavras com entropia real via movimento do mouse. 100% offline, 100% client-side. Nenhum dado enviado ao servidor." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/og-gerador-seed.png" />
        <meta property="og:url" content="https://lordjunnior.com.br/ferramentas/entropy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gerador de Seed Offline: Segurança Máxima no Navegador" />
        <meta name="twitter:description" content="Seed Phrase BIP39 com entropia real. 100% client-side, nenhum dado enviado." />
        <meta name="twitter:image" content="https://lordjunnior.com.br/heroes/og-gerador-seed.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Gerador de Seed Phrase BIP39 Offline",
          "description": "Ferramenta gratuita e 100% client-side para gerar seed phrases de 12 ou 24 palavras usando entropia real via movimento do mouse. Padrão BIP39, nenhum dado transmitido a servidores.",
          "url": "https://lordjunnior.com/ferramentas/entropy",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
          "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com" },
          "browserRequirements": "Requires JavaScript. Works offline after first load.",
          "softwareVersion": "1.0",
          "inLanguage": "pt-BR"
        })}</script>
      </Helmet>
      <ScrollToTop />

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(16,185,129,0.06) 50%, transparent 70%)' }} />
      </div>

      <style>{`
        @keyframes trailFade { 0%{opacity:0.6;transform:scale(1)} 100%{opacity:0;transform:scale(2.5)} }
        .trail-dot { animation: trailFade 1.2s ease-out forwards; }
        @keyframes wordSlide { from{opacity:0;transform:translateY(8px) scale(0.95);filter:blur(4px)} to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
        .word-reveal { animation: wordSlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      <CinematicHero image="/heroes/gerador-entropy.webp" phase="Ferramenta de Segurança" title="Gerador de Entropia"
        subtitle="Crie suas 12 ou 24 palavras de segurança com aleatoriedade real via movimento do mouse. Segurança começa na geração da seed."
        icon={Fingerprint} accentColor="emerald" backLink="/ferramentas" backLabel="Torre de Controle" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-32">

        {/* Header + Status */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Fingerprint size={22} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Gere sua Seed</h2>
              <p className="text-stone-500 text-sm">Crie suas {wordCount} palavras de segurança com aleatoriedade real.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors ${
              isOnline ? 'bg-red-500/8 border-red-500/20 text-red-400 animate-pulse' : 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400'
            }`}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Desconecte a Internet' : 'Air-Gapped (Offline)'}
          </motion.div>
        </motion.div>

        {/* Security Warning */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <motion.div variants={fadeUp} custom={0}
            className="bg-red-500/[0.04] border border-red-500/15 rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/15"><AlertTriangle size={16} className="text-red-400" /></div>
              <h3 className="text-base font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>⚠️ Aviso Crítico de Segurança</h3>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Criar uma seed phrase de 24 palavras com <strong className="text-white">aleatoriedade real</strong> exige que o processo não dependa de computadores, que podem ter algoritmos previsíveis. O padrão utilizado pela maioria das carteiras (BIP39) utiliza uma lista de <strong className="text-white">2048 palavras</strong> específicas.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              Aqui está um método seguro para gerar suas 24 palavras offline usando <strong className="text-white">dados ou moedas</strong>.
            </p>
            <div className="bg-red-950/20 border border-red-500/10 rounded-xl p-4">
              <p className="text-red-400 text-[11px] font-bold leading-relaxed">
                Nunca gere sua seed em um site online, nem tire foto, nem armazene no computador/celular. Escreva as palavras em papel ou grave em metal.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            {/* Word count selector */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-bold">Palavras:</span>
              <div className="flex rounded-xl border border-white/[0.06] overflow-hidden">
                {([12, 24] as const).map(count => (
                  <button key={count} onClick={() => handleWordCountChange(count)}
                    className={`px-5 py-2 text-sm font-bold transition-all duration-300 ${
                      wordCount === count ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-white/[0.02] text-stone-500 hover:text-stone-300'
                    }`}>{count}</button>
                ))}
              </div>
              <span className="text-[10px] text-stone-600">{wordCount === 24 ? '256 bits · máxima segurança' : '128 bits · padrão'}</span>
            </div>

            {/* Entropy collection area */}
            <div ref={entropyRef}
              className="flex-1 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all duration-500 relative overflow-hidden cursor-crosshair backdrop-blur-sm"
              style={{
                borderColor: progress > 0 && progress < 100 ? `rgba(16,185,129,${Math.min(progress / 200, 0.3)})` : progress >= 100 ? 'rgba(16,185,129,0.3)' : undefined,
                boxShadow: progress > 50 ? `0 0 ${progress / 3}px rgba(16,185,129,${progress / 500})` : 'none',
              }}>
              {progress < 100 && mouseTrail.map((point, i) => (
                <div key={i} className="trail-dot absolute w-2 h-2 rounded-full bg-emerald-400/40 pointer-events-none" style={{ left: `${point.x}%`, top: `${point.y}%` }} />
              ))}
              {progress < 100 ? (
                <div className="text-center relative z-10">
                  <MousePointerClick size={40} className="text-stone-600 mx-auto mb-6" style={{ opacity: 0.3 + (progress / 200), filter: `drop-shadow(0 0 ${progress / 5}px rgba(16,185,129,0.5))` }} />
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mova o Cursor</h3>
                  <p className="text-stone-500 text-sm max-w-xs mx-auto">Gere entropia arrastando o cursor nesta área. Quanto mais aleatório o movimento, melhor.</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20" style={{ boxShadow: '0 0 30px rgba(16,185,129,0.15)' }}>
                    <ShieldCheck size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Entropia Coletada</h3>
                  <p className="text-emerald-400 font-mono text-sm mb-8">100% de aleatoriedade atingida.</p>
                  <button onClick={handleReset}
                    className="px-6 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-stone-400 text-sm font-bold flex items-center gap-2 mx-auto hover:bg-white/[0.08] transition-all">
                    <RefreshCw size={14} /> Gerar Novamente
                  </button>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">
                <span>Coletando Entropia</span>
                <span className={roundedProgress === 100 ? 'text-emerald-400' : ''}>{roundedProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%`, boxShadow: progress > 10 ? '0 0 8px rgba(16,185,129,0.4)' : 'none' }} />
              </div>
            </div>
          </div>

          {/* Seed output */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={18} className="text-stone-500" />
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sua Seed Phrase — {wordCount} palavras (Simulação)</h3>
            </div>
            <div className={`grid gap-2.5 mb-8 flex-1 ${wordCount === 24 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
              {progress < 100 ? (
                Array.from({ length: wordCount }).map((_, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl py-3 px-4 flex gap-3 opacity-20">
                    <span className="text-stone-600 font-mono text-sm">{i + 1}.</span>
                    <div className="w-full bg-white/[0.03] rounded h-4 mt-0.5" />
                  </div>
                ))
              ) : (
                seed.map((word, i) => (
                  <div key={i} className="word-reveal bg-white/[0.03] border border-white/[0.06] rounded-xl py-3 px-4 flex gap-3 items-center" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="text-stone-600 font-mono text-xs font-bold w-5 text-right">{i + 1}.</span>
                    <span className="text-white font-mono font-bold text-sm tracking-wide">{word}</span>
                  </div>
                ))
              )}
            </div>
            <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-5 mb-6">
              <p className="text-amber-400/80 text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span><strong className="text-amber-400">Atenção:</strong> Esta é uma ferramenta educativa. Não use estas palavras para guardar fundos reais. Para segurança máxima, use uma Hardware Wallet ou gere offline com dados (dices).</span>
              </p>
            </div>
            <button onClick={handleCopy} disabled={progress < 100}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-wider text-sm ${
                progress < 100 ? 'bg-emerald-500/5 text-emerald-500/20 cursor-not-allowed border border-emerald-500/10'
                : copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              }`}>
              {copied ? <ShieldCheck size={18} /> : <Copy size={18} />}
              {copied ? 'Palavras Copiadas!' : 'Copiar Palavras'}
            </button>
          </div>
        </div>

        {/* SEO: Featured Snippet block */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Como gerar uma seed phrase de 12 palavras offline?
          </h3>
          <div className="text-stone-400 text-sm leading-relaxed space-y-3">
            <p>
              Uma <strong className="text-stone-300">seed phrase</strong> (ou frase-semente) é um conjunto de 12 ou 24 palavras que funciona como backup universal da sua carteira Bitcoin. Este gerador utiliza o <strong className="text-stone-300">padrão BIP39</strong>, o mesmo protocolo usado por hardware wallets como Ledger e Trezor.
            </p>
            <p>
              A entropia é gerada <strong className="text-stone-300">localmente no seu navegador</strong> através dos movimentos aleatórios do seu mouse — nenhum dado é transmitido a servidores externos. Todo o processamento é 100% client-side, garantindo que suas chaves privadas nunca deixem o seu dispositivo.
            </p>
            <p>
              Para segurança máxima, recomendamos: <strong className="text-stone-300">desconecte a internet</strong> antes de gerar, anote as palavras em papel ou metal (nunca digitalmente) e jamais tire foto ou screenshot da sua seed phrase.
            </p>
          </div>
          <p className="mt-6 text-emerald-500/50 text-[10px] font-mono tracking-wide flex items-center gap-1.5">
            <ShieldCheck size={11} className="shrink-0" />
            Privacidade garantida: cálculos realizados localmente em seu navegador. Nenhum dado é enviado ao servidor.
          </p>
        </section>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default GeradorEntropy;
