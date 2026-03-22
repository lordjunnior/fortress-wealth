import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Activity, Zap, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

interface SistemaData {
  plantas: string[];
  foco: string;
  pnl: string;
  icon: React.ElementType;
  color: string;
}

interface PainelProps {
  isOpen: boolean;
  onClose: () => void;
  sistema: SistemaData | null;
  nome: string;
}

export const PainelTaticoFisiologico = ({ isOpen, onClose, sistema, nome }: PainelProps) => {
  return (
    <AnimatePresence>
      {isOpen && sistema && (
        <>
          {/* Overlay — Pack da Blindagem: desfoque + escurecimento */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-crosshair"
          />

          {/* Painel Lateral — Terminal Tático Dark */}
          <motion.div
            initial={{ x: "100%", filter: "blur(10px)" }}
            animate={{ x: 0, filter: "blur(0px)" }}
            exit={{ x: "100%", filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-8 z-[101] shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <span className="font-mono text-[10px] tracking-[0.3em] text-orange-500 uppercase">
                Protocolo Ativo // {nome}
              </span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Título do Sistema — PNL */}
            <h2
              className="text-3xl mb-4 text-white uppercase leading-none font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {nome}
            </h2>

            {/* Frase PNL — Trio da Blindagem */}
            <p className="text-gray-400 text-sm leading-relaxed mb-10 italic border-l-2 border-orange-500/30 pl-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "{sistema.pnl}"
            </p>

            {/* Foco Técnico — SEO Authority */}
            <div className="mb-10 p-4 bg-white/[0.03] border border-white/[0.06] rounded-sm">
              <div className="flex items-center gap-2 mb-2 text-white font-mono text-[10px] uppercase tracking-widest">
                <Activity size={14} className="text-orange-500" /> Matriz de Foco
              </div>
              <p className="text-xs text-gray-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {sistema.foco}
              </p>
            </div>

            {/* Arsenal de Plantas — Pack da Blindagem */}
            <div className="space-y-3 mb-12">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-4">
                Plantas do Ecossistema
              </span>
              {sistema.plantas.map((planta, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                  key={planta}
                  className="p-4 bg-zinc-900/50 border border-white/[0.05] flex items-center justify-between group hover:border-orange-500/30 transition-all duration-300 cursor-default"
                >
                  <span className="font-semibold text-gray-200 group-hover:text-orange-500 transition-colors text-sm flex items-center gap-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <Leaf size={13} className="text-emerald-600/60 group-hover:text-emerald-400 transition-colors" />
                    {planta}
                  </span>
                  <Shield size={14} className="text-zinc-700 group-hover:text-orange-500/50 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Indicador de Sistema — Scanline */}
            <div className="mb-8 h-px w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* CTA Final — Trio da Blindagem */}
            <Link
              to="/soberania-organica/autonomia-biologica"
              onClick={onClose}
              className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.2)] hover:shadow-[0_0_50px_rgba(234,88,12,0.35)] flex items-center justify-center gap-3 group"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Zap size={18} className="fill-black group-hover:scale-110 transition-transform duration-300" />
              IMPLEMENTAR PROTOCOLO
            </Link>

            {/* Footer Seal */}
            <p className="text-center text-gray-700 text-[9px] font-mono uppercase tracking-[0.3em] mt-8">
              Terminal Autônomo · Dados Fisiológicos
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
