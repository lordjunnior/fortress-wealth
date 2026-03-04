import React, { useEffect, useState } from 'react';
import { fetchBitcoinStats } from '@/components/supply-shock/bitcoinService';
import { BitcoinStats } from '@/components/supply-shock/types';
import { TerminalHeader } from '@/components/supply-shock/TerminalHeader';
import { CountdownTimer } from '@/components/supply-shock/CountdownTimer';
import { SupplyBar } from '@/components/supply-shock/SupplyBar';
import { StatsGrid } from '@/components/supply-shock/StatsGrid';
import { STRINGS } from '@/components/supply-shock/constants';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SupplyShock() {
  const [stats, setStats] = useState<BitcoinStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchBitcoinStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Erro de conexão com a Blockchain. Tentando reconectar...');
        setLoading(false);
      }
    };

    init();
    const interval = setInterval(init, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono selection:bg-[#F7931A] selection:text-black overflow-x-hidden relative flex flex-col items-center">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", filter: 'brightness(1) contrast(1.5)' }} />
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      </div>

      {/* Back nav */}
      <div className="w-full max-w-5xl px-6 pt-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors font-mono">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center relative z-10 w-full max-w-5xl">
        
        <TerminalHeader />

        {loading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#F7931A] animate-spin" />
            <p className="text-[#F7931A] animate-pulse tracking-widest uppercase">Sincronizando com a Mempool...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 border border-[#EF4444] bg-[#EF4444]/10 rounded-sm">
            <p className="text-[#EF4444] font-bold">{error}</p>
          </div>
        ) : stats ? (
          <>
            <CountdownTimer targetDate={stats.estimatedHalvingDate} />
            <SupplyBar
              circulatingSupply={stats.circulatingSupply}
              percentageMined={stats.percentageMined}
            />
            <StatsGrid stats={stats} />
          </>
        ) : null}

      </main>

      <footer className="w-full py-8 text-center border-t border-gray-900 bg-black relative z-10 mt-auto">
        <p className="text-gray-600 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">
          {STRINGS.FOOTER}
        </p>
      </footer>
    </div>
  );
}
