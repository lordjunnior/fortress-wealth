import React from 'react';
import { Zap } from 'lucide-react';
import { STRINGS } from './constants';

export const TerminalHeader: React.FC = () => {
  return (
    <header className="mb-12 text-center relative z-10">
      <div className="inline-flex items-center gap-2 mb-2 border border-[#F7931A] px-4 py-1 rounded-sm bg-[#F7931A]/10">
        <Zap className="w-4 h-4 text-[#F7931A] animate-pulse" />
        <span className="text-[#F7931A] text-xs font-bold tracking-[0.2em] uppercase">
          System Secure
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2">
        {STRINGS.TITLE}
      </h1>
      <p className="text-[#EF4444] text-lg md:text-xl font-bold tracking-widest uppercase animate-pulse">
        {STRINGS.SUBTITLE}
      </p>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F7931A] to-transparent mt-6 opacity-50" />
    </header>
  );
};
