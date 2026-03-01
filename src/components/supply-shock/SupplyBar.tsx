import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';
import { BTC_CONSTANTS, STRINGS } from './constants';

interface SupplyBarProps {
  circulatingSupply: number;
  percentageMined: number;
}

export const SupplyBar: React.FC<SupplyBarProps> = ({ circulatingSupply, percentageMined }) => {
  const percentageLeft = 100 - percentageMined;
  const formatNumber = (num: number) => num.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

  return (
    <div className="w-full max-w-4xl px-4 mt-8 mb-12 relative z-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-500">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wider uppercase font-mono">Minerado</span>
          </div>
          <span className="text-2xl font-mono text-white">
            {formatNumber(circulatingSupply)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold tracking-wider uppercase text-slate-500 font-mono">Total Absoluto</span>
          <div className="text-2xl font-mono text-slate-500">
            {formatNumber(BTC_CONSTANTS.MAX_SUPPLY)}
          </div>
        </div>
      </div>

      <div className="relative h-8 md:h-12 bg-[#0B0F19] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_15px_rgba(247,147,26,0.2)]">
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-r border-black/50 h-full" />
          ))}
        </div>
        <div
          className="h-full bg-amber-500 relative transition-all duration-1000"
          style={{ width: `${percentageMined}%` }}
        >
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:10px_10px]" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500 px-6 py-4 rounded-sm animate-pulse">
          <AlertTriangle className="text-red-500 w-6 h-6" />
          <p className="text-red-500 font-black text-sm md:text-lg tracking-widest uppercase font-mono">
            {STRINGS.WARNING.replace('{remaining}', percentageLeft.toFixed(4) + '%')}
          </p>
        </div>
      </div>
    </div>
  );
};
