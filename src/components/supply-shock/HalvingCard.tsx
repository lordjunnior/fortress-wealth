import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { TimeRemaining } from './types';

interface HalvingCardProps {
  estimatedDate: Date;
}

export const HalvingCard: React.FC<HalvingCardProps> = ({ estimatedDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = +estimatedDate - +new Date();
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
  }, [estimatedDate]);

  const units = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  const formattedDate = estimatedDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />

      <div className="relative z-10 text-center space-y-8">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em] font-mono font-black mb-2">Contagem regressiva para o</p>
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">Halving do Bitcoin</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
          {units.map((u) => (
            <div key={u.label} className="border border-amber-500/20 bg-[#080C14] rounded-sm p-4 md:p-6">
              <span className="text-3xl md:text-5xl font-black text-amber-500 tabular-nums font-mono block">
                {u.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-mono mt-1 block">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-slate-500 text-sm font-mono">
          Data estimada: <strong className="text-white">{formattedDate}</strong>
        </p>
      </div>
    </div>
  );
};
