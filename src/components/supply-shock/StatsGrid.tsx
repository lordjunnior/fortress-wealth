import React from 'react';
import { Database, Layers, Activity } from 'lucide-react';
import { BitcoinStats } from './types';
import { BTC_CONSTANTS } from './constants';

interface StatsGridProps {
  stats: BitcoinStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4 mb-12 z-10 relative">
      <div className="border border-gray-800 bg-gray-900/50 p-6 rounded-sm flex flex-col items-center text-center hover:border-[#F7931A]/50 transition-colors group">
        <Layers className="text-gray-500 group-hover:text-[#F7931A] w-8 h-8 mb-3 transition-colors" />
        <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Bloco Atual</span>
        <span className="text-2xl md:text-3xl text-white font-mono font-bold">
          {stats.blockHeight.toLocaleString()}
        </span>
      </div>

      <div className="border border-gray-800 bg-gray-900/50 p-6 rounded-sm flex flex-col items-center text-center hover:border-[#F7931A]/50 transition-colors group">
        <Activity className="text-gray-500 group-hover:text-[#F7931A] w-8 h-8 mb-3 transition-colors" />
        <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Blocos Restantes</span>
        <span className="text-2xl md:text-3xl text-white font-mono font-bold">
          {stats.blocksToHalving.toLocaleString()}
        </span>
      </div>

      <div className="border border-gray-800 bg-gray-900/50 p-6 rounded-sm flex flex-col items-center text-center hover:border-[#F7931A]/50 transition-colors group">
        <Database className="text-gray-500 group-hover:text-[#F7931A] w-8 h-8 mb-3 transition-colors" />
        <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Progresso Época</span>
        <span className="text-2xl md:text-3xl text-white font-mono font-bold">
          {((1 - (stats.blocksToHalving / BTC_CONSTANTS.HALVING_INTERVAL)) * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
