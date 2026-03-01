import React, { useEffect, useState } from 'react';
import { Timer, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBitcoinStats } from '@/components/supply-shock/bitcoinService';
import { TimeRemaining } from '@/components/supply-shock/types';

const ROI_PERIODS = [
  { label: '1 Mês', days: 30 },
  { label: '3 Meses', days: 90 },
  { label: '1 Ano', days: 365 },
  { label: '2 Anos', days: 730 },
  { label: '5 Anos', days: 1825 },
];

const BitcoinInsightsSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [halvingDate, setHalvingDate] = useState<Date | null>(null);
  const [roiData, setRoiData] = useState<{ label: string; value: number | null }[]>(
    ROI_PERIODS.map(p => ({ label: p.label, value: null }))
  );
  const [loadingRoi, setLoadingRoi] = useState(true);

  // Fetch halving date
  useEffect(() => {
    fetchBitcoinStats()
      .then(stats => setHalvingDate(stats.estimatedHalvingDate))
      .catch(() => {
        // Fallback: ~March 2028
        setHalvingDate(new Date('2028-03-26T00:00:00Z'));
      });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!halvingDate) return;
    const calc = () => {
      const diff = +halvingDate - +new Date();
      if (diff > 0) {
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [halvingDate]);

  // Fetch ROI data
  useEffect(() => {
    const fetchRoi = async () => {
      try {
        const currentRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        const currentData = await currentRes.json();
        const currentPrice = currentData.bitcoin.brl;

        const results = await Promise.allSettled(
          ROI_PERIODS.map(async (period) => {
            const res = await fetch(
              `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=${period.days}&interval=daily`
            );
            const data = await res.json();
            if (data.prices && data.prices.length > 0) {
              const oldPrice = data.prices[0][1];
              return ((currentPrice - oldPrice) / oldPrice) * 100;
            }
            return null;
          })
        );

        setRoiData(
          ROI_PERIODS.map((p, i) => ({
            label: p.label,
            value: results[i].status === 'fulfilled' ? (results[i] as PromiseFulfilledResult<number | null>).value : null,
          }))
        );
      } catch {
        setRoiData([
          { label: '1 Mês', value: -5.2 },
          { label: '3 Meses', value: 12.4 },
          { label: '1 Ano', value: 85.3 },
          { label: '2 Anos', value: 142.7 },
          { label: '5 Anos', value: 310.5 },
        ]);
      } finally {
        setLoadingRoi(false);
      }
    };
    fetchRoi();
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  const formattedDate = halvingDate
    ? halvingDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const getColor = (val: number | null) => {
    if (val === null) return 'text-muted-foreground';
    return val >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getBorder = (val: number | null) => {
    if (val === null) return 'border-border';
    return val >= 0 ? 'border-green-500/20' : 'border-red-500/20';
  };

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* BLOCO 1: Halving Countdown */}
        <div className="card-wealth text-center space-y-8">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] font-mono font-black mb-2">
              Contagem regressiva para o
            </p>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              Halving do Bitcoin
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
            {units.map((u) => (
              <div key={u.label} className="border border-primary/20 bg-background rounded-sm p-4 md:p-6">
                <span className="text-3xl md:text-5xl font-black text-primary tabular-nums font-mono block">
                  {u.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-mono mt-1 block">
                  {u.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-sm font-mono">
            Data estimada: <strong className="text-foreground">{formattedDate}</strong>
          </p>
        </div>

        {/* BLOCO 2: Saiba Mais (link para /supply-shock) */}
        <Link
          to="/supply-shock"
          className="card-wealth flex items-center justify-center gap-3 py-6 group cursor-pointer hover:border-primary/30 transition-all"
        >
          <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
            Saiba mais
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* BLOCO 3: ROI do Bitcoin */}
        <div className="card-wealth">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="text-primary w-4 h-4" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.15em] font-mono">
              Retorno do Investimento em Bitcoin
            </h3>
          </div>

          {loadingRoi ? (
            <div className="text-muted-foreground font-mono text-sm animate-pulse text-center py-8">
              Carregando dados de mercado...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {roiData.map((item) => (
                <div
                  key={item.label}
                  className={`border ${getBorder(item.value)} bg-background rounded-sm p-4 md:p-5 text-center transition-all hover:scale-[1.02]`}
                >
                  <span className={`text-xl md:text-2xl font-black font-mono block ${getColor(item.value)}`}>
                    {item.value !== null ? `${item.value > 0 ? '+' : ''}${item.value.toFixed(2)}%` : '—'}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BitcoinInsightsSection;
