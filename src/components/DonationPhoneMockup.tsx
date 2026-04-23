import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Copy, Check, Bitcoin } from "lucide-react";
import { LIGHTNING_ADDRESS } from "@/lib/constants";

const PRESET_VALUES = [
  { sats: 1000, brl: "~R$ 3,30" },
  { sats: 5000, brl: "~R$ 16,50" },
  { sats: 21000, brl: "~R$ 69,30" },
];

const DonationPhoneMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(1);
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(PRESET_VALUES[selected].sats));
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  return (
    <div ref={ref} className="flex justify-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative w-[300px] h-[600px] rounded-[44px] border-2 border-border bg-card p-3 shadow-2xl"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-10" />

        {/* Glow ring */}
        <div className="absolute inset-0 rounded-[44px] ring-1 ring-gold/20 pointer-events-none" />

        {/* Screen */}
        <div className="w-full h-full rounded-[36px] bg-background overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-8 pb-3">
            <span className="font-mono text-[10px] text-muted-foreground">21:47</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-gold fill-gold" />
              <span className="font-mono text-[10px] text-gold">Lightning</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-5 pt-2 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Bitcoin className="w-4 h-4 text-gold" />
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Doar via Lightning
              </p>
            </div>
            <p className="text-base font-semibold text-foreground leading-tight mb-4">
              Combustível Soberano
            </p>

            {/* Lightning address */}
            <div className="border border-border rounded-lg p-3 mb-4 bg-card/40">
              <p className="text-[9px] text-muted-foreground font-mono mb-1.5 uppercase tracking-wider">
                Endereço Lightning
              </p>
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-between gap-2 group"
              >
                <code className="font-mono text-[11px] text-foreground truncate text-left">
                  {LIGHTNING_ADDRESS}
                </code>
                {copiedAddr ? (
                  <Check className="w-3.5 h-3.5 text-chart-green flex-shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
                )}
              </button>
            </div>

            {/* Amount presets */}
            <p className="text-[9px] text-muted-foreground font-mono mb-2 uppercase tracking-wider">
              Valor sugerido (sats)
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {PRESET_VALUES.map((v, i) => (
                <button
                  key={v.sats}
                  onClick={() => setSelected(i)}
                  className={`rounded-lg border py-2 px-1 transition-all ${
                    selected === i
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold-dim"
                  }`}
                >
                  <p className="text-[11px] font-bold leading-tight">
                    {v.sats.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-[8px] opacity-70 mt-0.5">{v.brl}</p>
                </button>
              ))}
            </div>

            {/* Selected amount detail */}
            <div className="border border-border rounded-lg p-3 mb-3 bg-card/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider">
                    Valor a enviar
                  </p>
                  <p className="text-lg font-bold text-gold leading-tight">
                    {PRESET_VALUES[selected].sats.toLocaleString("pt-BR")}{" "}
                    <span className="text-xs">sats</span>
                  </p>
                </div>
                <button
                  onClick={handleCopyAmount}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-gold transition-colors px-2 py-1 rounded border border-border"
                >
                  {copiedAmount ? (
                    <>
                      <Check className="w-3 h-3 text-chart-green" /> Ok
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Send button */}
            <button
              onClick={handleCopyAddress}
              className="gradient-gold rounded-lg py-3 text-center mt-auto mb-3 hover:opacity-90 transition-opacity"
            >
              <span className="text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-primary-foreground" />
                Enviar via Lightning
              </span>
            </button>

            <p className="text-[9px] text-muted-foreground text-center mb-4 font-mono uppercase tracking-wider">
              P2P · Sem KYC · Sem intermediários
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationPhoneMockup;
