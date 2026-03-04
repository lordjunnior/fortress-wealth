import React, { useEffect, useState } from 'react';
import { Hourglass } from 'lucide-react';
import { TimeRemaining } from './types';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4 border border-[#F7931A]/30 bg-black/50 backdrop-blur-sm rounded-lg min-w-[80px] md:min-w-[120px]">
      <span className="text-3xl md:text-6xl font-bold text-[#F7931A] tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center my-10 w-full">
      <div className="flex items-center gap-2 mb-6">
        <Hourglass className="text-[#EF4444] w-5 h-5" />
        <h2 className="text-gray-400 text-sm md:text-base uppercase tracking-[0.3em]">
          Tempo Estimado Até o Halving
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-4">
        <TimeUnit value={timeLeft.days} label="Dias" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
};
