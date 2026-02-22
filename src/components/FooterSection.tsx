import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Zap } from "lucide-react";
import qrCodeImage from "@/assets/qrcode-lightning.jpeg";

const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={ref}>
      {/* Donation Section */}
      <section className="section-padding bg-card/50 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Apoie Este Projeto <span className="text-gradient-gold">Independente</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Sem anúncios. Sem rastreadores. Sem paywall. Este projeto é mantido de forma
            aberta, direta e voluntária. Se o conteúdo, as ferramentas e os estudos
            publicados aqui geraram valor para você, existe uma forma simples de fortalecer
            essa missão agora.
          </p>

          {/* QR Code */}
          <div className="mb-6">
            <img
              src={qrCodeImage}
              alt="QR Code Lightning"
              className="w-48 h-48 mx-auto rounded-lg"
            />
          </div>

          {/* Lightning address */}
          <div className="inline-flex items-center gap-2 mb-6 cursor-pointer" onClick={handleCopy}>
            <code className="font-mono text-sm text-muted-foreground select-all break-all">
              {LIGHTNING_ADDRESS}
            </code>
            {copied ? <Check className="w-4 h-4 text-chart-green" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
          </div>
          {copied && <p className="text-xs text-chart-green mb-4">Copiado!</p>}

          <div>
            <button className="px-6 py-3 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-2 mx-auto">
              <Zap className="w-4 h-4" />
              Apoiar com Lightning
            </button>
          </div>
        </motion.div>
      </section>

      {/* Bottom footer */}
      <div className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            PENSAR AINDA É PERMITIDO. AGIR TAMBÉM.
          </p>
          <p className="text-xs text-muted-foreground">
            DEPENDÊNCIA FINANCEIRA NUNCA FOI ACIDENTE. SEMPRE FOI PROJETO.
          </p>
          <p className="font-mono text-xs text-gold tracking-widest">
            NOT YOUR KEYS. NOT YOUR MONEY.
          </p>
          <div className="pt-4 border-t border-border/50">
            <p className="font-mono text-xs text-muted-foreground tracking-wider">
              LORD JUNNIOR · 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
