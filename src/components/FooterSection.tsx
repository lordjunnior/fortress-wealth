import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Zap } from "lucide-react";

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
          <p className="pre-title">SUSTENTABILIDADE</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Fortalecer a <span className="text-gradient-gold">Infraestrutura</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Diferente do sistema tradicional, aqui não há anúncios, venda de dados ou
            cursos de "fique rico". Valor se paga com valor. Se os manuais e aplicativos
            foram úteis para a sua blindagem patrimonial, considere manter o projeto ativo
            para os próximos enviando satoshis diretamente.
          </p>

          {/* Lightning address */}
          <div className="card-wealth inline-flex items-center gap-3 mb-6">
            <Zap className="w-4 h-4 text-gold flex-shrink-0" />
            <code className="font-mono text-sm text-foreground select-all break-all">
              {LIGHTNING_ADDRESS}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleCopy}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-gold-dim transition-all duration-300 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-chart-green" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar Endereço"}
            </button>
            <button className="px-6 py-3 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              ENVIAR SATOSHIS via QR
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
