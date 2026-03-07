import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function AlertBanner() {
  return (
    <div className="section-padding py-0">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/alertas/fim-do-dinheiro-vivo"
          className="block relative overflow-hidden rounded-sm border border-red-600/20 bg-gradient-to-r from-red-950/20 via-[#0a0a0a] to-red-950/20 p-6 md:p-8 group hover:border-red-600/40 transition-all"
          style={{ animation: 'alertBannerPulse 4s ease-in-out infinite' }}
        >
          <style>{`@keyframes alertBannerPulse{0%,100%{box-shadow:0 0 0 rgba(220,38,38,0)}50%{box-shadow:0 0 20px rgba(220,38,38,0.06)}}`}</style>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-500" size={18} style={{ animation: 'alertBlink 2s ease-in-out infinite' }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500 font-mono bg-red-950/40 px-2 py-0.5 rounded-sm">Novo Alerta</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono" style={{ animation: 'alertBlink 2s ease-in-out infinite' }}>● ATIVO</span>
                </div>
                <p className="text-white font-black text-sm md:text-base uppercase tracking-tight">
                  O governo pode limitar o uso de dinheiro vivo no Brasil
                </p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider font-mono mt-1 hidden md:block">
                  PL 3.951/2019 · Análise completa + ferramentas de proteção
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider font-mono hidden sm:block group-hover:text-white transition-colors">Ler Análise</span>
              <ChevronRight className="text-red-500 group-hover:text-white transition-colors" size={18} />
            </div>
          </div>

          <style>{`@keyframes alertBlink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        </Link>
      </div>
    </div>
  );
}
