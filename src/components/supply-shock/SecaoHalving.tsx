import React, { useState, useEffect, useRef } from 'react';
import { Timer, BarChart3, TrendingUp, ChevronRight } from 'lucide-react';
import { fetchBitcoinStats } from './bitcoinService';
import { BitcoinStats, TimeRemaining } from './types';

/* ── Halving historical data ── */
const HALVING_CYCLES = [
  { year: 2012, block: 210000, prePrice: 12, postPeakPrice: 1150, roi: '~9,483%', months: 12 },
  { year: 2016, block: 420000, prePrice: 650, postPeakPrice: 19783, roi: '~2,943%', months: 17 },
  { year: 2020, block: 630000, prePrice: 8700, postPeakPrice: 69000, roi: '~693%', months: 18 },
];

/* ── Static comparison data (annualized %) ── */
const ASSET_DATA: Record<string, Record<string, number>> = {
  '1 ano': { BTC: 120, Ouro: 8, 'S&P 500': 12, DXY: -3 },
  '4 anos': { BTC: 800, Ouro: 45, 'S&P 500': 60, DXY: -8 },
  '8 anos': { BTC: 25000, Ouro: 90, 'S&P 500': 140, DXY: -12 },
};

const ASSET_COLORS: Record<string, string> = {
  BTC: '#f59e0b',
  Ouro: '#eab308',
  'S&P 500': '#3b82f6',
  DXY: '#6b7280',
};

const PERIODS = ['1 ano', '4 anos', '8 anos'] as const;

/* ── Lazy Observer hook ── */
function useLazyVisible(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '200px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ════════════════════════════════════════════
   NÍVEL 1 — CONTAGEM REGRESSIVA
   ════════════════════════════════════════════ */
const CountdownBlock: React.FC<{ stats: BitcoinStats | null }> = ({ stats }) => {
  const [time, setTime] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!stats) return;
    const calc = () => {
      const diff = +stats.estimatedHalvingDate - +new Date();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [stats]);

  const units = [
    { value: time.days, label: 'Dias' },
    { value: time.hours, label: 'Horas' },
    { value: time.minutes, label: 'Minutos' },
    { value: time.seconds, label: 'Segundos' },
  ];

  return (
    <div className="text-center mb-32 md:mb-40">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.08em] text-white mb-4">
        Contagem Regressiva
      </h2>
      <p className="text-slate-500 text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-16">
        Próximo Halving do Bitcoin
      </p>

      {/* Countdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-14">
        {units.map((u, i) => (
          <div key={i} className="relative">
            <div className="halving-unit rounded-sm p-6 md:p-8 border border-white/[0.06]">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-black tabular-nums text-white halving-glow font-mono leading-none">
                {u.value.toString().padStart(u.label === 'Dias' ? 3 : 2, '0')}
              </span>
              <span className="block text-[10px] md:text-xs text-slate-600 uppercase tracking-[0.4em] font-mono mt-3">
                {u.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Copy */}
      <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
        O protocolo segue um ritmo matemático previsível. A cada ciclo, a emissão é reduzida.{' '}
        <strong className="text-white">Escassez programada. Evento inevitável.</strong>{' '}
        O tempo está correndo.
      </p>

      {/* CTA */}
      <button
        onClick={() => document.getElementById('historico-halving')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-flex items-center gap-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/20 px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300"
      >
        Explorar ciclos anteriores <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ════════════════════════════════════════════
   NÍVEL 2 — HISTÓRICO PÓS-HALVING
   ════════════════════════════════════════════ */
const HistoryBlock: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useLazyVisible(ref as React.RefObject<HTMLElement>);

  return (
    <div id="historico-halving" className="mb-32 md:mb-40 scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 text-amber-500 mb-4">
        <BarChart3 size={18} />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] font-mono">Nível 2</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
        Impacto Histórico <span className="halving-shimmer">Pós-Halving</span>
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-12">
        Após cada halving, o Bitcoin passou por ciclos de reprecificação significativos. Embora desempenho passado não garanta resultados futuros, os dados mostram padrões recorrentes de oferta reduzida e ajuste de mercado.
      </p>

      {visible && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="bg-[#0a0e17]/80 border border-white/[0.04] rounded-sm p-8">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-8">Performance Pós-Halving (%)</h3>
            <div className="space-y-6">
              {HALVING_CYCLES.map((cycle, i) => {
                const maxRoi = 9483;
                const numRoi = parseFloat(cycle.roi.replace(/[^0-9.]/g, ''));
                const barWidth = Math.max((numRoi / maxRoi) * 100, 4);
                return (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-sm font-mono">{cycle.year}</span>
                      <span className="text-amber-400 font-mono text-xs font-bold">{cycle.roi}</span>
                    </div>
                    <div className="h-3 bg-white/[0.03] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${barWidth}%`,
                          background: `linear-gradient(90deg, rgba(245,158,11,0.6) 0%, rgba(249,115,22,0.9) 100%)`,
                          boxShadow: '0 0 12px rgba(245,158,11,0.3)',
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-slate-600 text-[10px] font-mono">${cycle.prePrice.toLocaleString()}</span>
                      <span className="text-slate-500 text-[10px] font-mono">→ ${cycle.postPeakPrice.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-slate-600 text-[10px] font-mono mt-6 text-center">Preço pré-halving → Pico do ciclo. Meses até pico indicados.</p>
          </div>

          {/* Table */}
          <div className="bg-[#0a0e17]/80 border border-white/[0.04] rounded-sm p-8">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono mb-8">Dados dos Ciclos</h3>
            <div className="space-y-1">
              <div className="grid grid-cols-5 gap-2 text-[9px] text-slate-600 uppercase tracking-widest font-mono pb-3 border-b border-white/5">
                <span>Ano</span><span>Bloco</span><span>Antes</span><span>Pico</span><span>Meses</span>
              </div>
              {HALVING_CYCLES.map((c, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 text-xs font-mono py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <span className="text-amber-400 font-bold">{c.year}</span>
                  <span className="text-slate-400">{c.block.toLocaleString()}</span>
                  <span className="text-slate-400">${c.prePrice.toLocaleString()}</span>
                  <span className="text-white font-bold">${c.postPeakPrice.toLocaleString()}</span>
                  <span className="text-slate-500">{c.months}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 border border-amber-500/10 rounded-sm bg-amber-500/[0.03]">
              <p className="text-amber-400/80 text-[10px] font-mono leading-relaxed">
                <strong className="text-amber-400">Nota:</strong> Desempenho passado não garante resultados futuros. Os dados são apresentados apenas como referência histórica.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-10">
        <button
          onClick={() => document.getElementById('comparativo-ativos')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/20 px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300"
        >
          Analisar dados completos <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   NÍVEL 3 — COMPARATIVO MULTI-ATIVO
   ════════════════════════════════════════════ */
const ComparisonBlock: React.FC = () => {
  const [period, setPeriod] = useState<typeof PERIODS[number]>('4 anos');
  const ref = useRef<HTMLDivElement>(null);
  const visible = useLazyVisible(ref as React.RefObject<HTMLElement>);

  const data = ASSET_DATA[period];
  const maxVal = Math.max(...Object.values(data));

  return (
    <div id="comparativo-ativos" className="scroll-mt-24" ref={ref}>
      <div className="flex items-center gap-3 text-amber-500 mb-4">
        <TrendingUp size={18} />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] font-mono">Nível 3</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
        Bitcoin vs <span className="halving-shimmer">Outros Ativos</span>
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10">
        Enquanto moedas fiduciárias expandem oferta, o Bitcoin mantém política monetária fixa. Compare desempenho e volatilidade frente a ouro, S&P 500 e dólar ao longo do tempo.
      </p>

      {/* Period Toggle */}
      <div className="flex gap-1 mb-10 bg-white/[0.03] rounded-sm p-1 w-fit border border-white/[0.04]">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 ${
              period === p
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-600 hover:text-slate-400 border border-transparent'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {visible && (
        <div className="bg-[#0a0e17]/80 border border-white/[0.04] rounded-sm p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono">Retorno acumulado — {period}</h3>
            <div className="flex gap-4">
              {Object.entries(ASSET_COLORS).map(([name, color]) => (
                <div key={name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[9px] font-mono text-slate-500">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {Object.entries(data).map(([asset, value]) => {
              const barW = Math.max((Math.abs(value) / maxVal) * 100, 2);
              const isNeg = value < 0;
              return (
                <div key={asset} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: ASSET_COLORS[asset] }} />
                      <span className="text-white font-bold text-sm font-mono">{asset}</span>
                    </div>
                    <span className={`font-mono text-sm font-bold ${isNeg ? 'text-red-400' : 'text-white'}`}>
                      {isNeg ? '' : '+'}{value.toLocaleString()}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-white/[0.03] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${barW}%`,
                        background: isNeg
                          ? 'linear-gradient(90deg, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.7) 100%)'
                          : `linear-gradient(90deg, ${ASSET_COLORS[asset]}66 0%, ${ASSET_COLORS[asset]} 100%)`,
                        boxShadow: isNeg ? 'none' : `0 0 10px ${ASSET_COLORS[asset]}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-slate-600 text-[10px] font-mono mt-8 text-center">
            Dados aproximados para fins comparativos. Desempenho passado não garante resultados futuros.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-10">
        <button
          onClick={() => document.getElementById('conclusao')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/20 px-6 py-3 rounded-sm text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300"
        >
          Ver análise macro detalhada <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   MAIN SECTION EXPORT
   ════════════════════════════════════════════ */
export const SecaoHalving: React.FC<{ stats: BitcoinStats | null }> = ({ stats }) => {
  return (
    <section
      id="secao-halving"
      className="relative scroll-mt-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0b0b0f 0%, #14141c 50%, #0b0b0f 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-[120px]">
        <CountdownBlock stats={stats} />
        <HistoryBlock />
        <ComparisonBlock />
      </div>

      {/* Styles */}
      <style>{`
        .halving-unit {
          background: rgba(255,255,255,0.015);
          backdrop-filter: blur(8px);
        }
        .halving-glow {
          text-shadow: 0 0 40px rgba(245,158,11,0.12), 0 0 80px rgba(245,158,11,0.06);
        }
        .halving-shimmer {
          background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 40%, #fff 50%, #fbbf24 60%, #f59e0b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: halvShim 3s linear infinite;
        }
        @keyframes halvShim {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};
