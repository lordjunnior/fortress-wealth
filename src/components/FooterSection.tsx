import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Zap, Smartphone, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import qrCodeImage from "@/assets/qrcode-lightning.jpeg";
import SatCounter from "@/components/SatCounter";

const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";

const fundingLevels = [
  { sats: "1.000", label: "Infraestrutura" },
  { sats: "5.000", label: "Ferramentas" },
  { sats: "10.000", label: "Conteúdos" },
  { sats: "Valor Livre", label: "Independência" },
];

const steps = [
  { num: "01", text: "Instale uma carteira compatível com Lightning." },
  { num: "02", text: "Copie o endereço ou escaneie o QR Code do alvo." },
  { num: "03", text: "Envie qualquer valor em sats. Simples, direto e sem bancos." },
];

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <footer ref={ref}>
      <section className="section-padding bg-card/50 border-t border-border">
        <div className="max-w-4xl mx-auto">

          {/* 1. CABEÇALHO E CONTEXTO */}
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Apoie Este Projeto <span className="text-gradient-gold">Independente</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Sem anúncios. Sem rastreadores. Sem paywall. Este arsenal é mantido de forma
              aberta, direta e voluntária. Se o conteúdo e as ferramentas geraram valor para
              a sua blindagem patrimonial, forneça o combustível para manter o sistema online.
            </p>
          </motion.div>

          {/* 2. MÓDULO DE EXECUÇÃO */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center mb-16">
            <div className="card-wealth inline-block p-8 mb-4">
              <img
                src={qrCodeImage}
                alt="QR Code Lightning"
                className="w-52 h-52 rounded-lg block"
              />
            </div>

            <div
              className="flex items-center justify-center gap-2 mb-3 cursor-pointer group"
              onClick={handleCopy}
            >
              <code className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors select-all break-all text-center">
                {LIGHTNING_ADDRESS}
              </code>
              {copied ? (
                <Check className="w-4 h-4 text-chart-green flex-shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
              )}
            </div>
            {copied && (
              <p className="text-xs text-chart-green mb-2 animate-pulse">Copiado!</p>
            )}

            <SatCounter />
          </motion.div>

          {/* 3. O QUE É LIGHTNING + CARTEIRAS */}
          <motion.div {...fadeUp(0.2)} className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="card-wealth">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-sm tracking-wide uppercase text-foreground">
                  O que é?
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A camada de pagamentos do Bitcoin. Transferências quase instantâneas, com
                taxas microscópicas, ideal para apoio direto sem intermediários estatais.
              </p>
            </div>

            <div className="card-wealth">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-sm tracking-wide uppercase text-foreground">
                  Equipamento Recomendado
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="text-foreground font-medium">Wallet of Satoshi (WoS):</span>{" "}
                  Custodial. Ideal para iniciantes operarem liquidez rápida.
                </li>
                <li>
                  <span className="text-foreground font-medium">Phoenix Wallet:</span>{" "}
                  Não-custodial. Equilíbrio entre praticidade e soberania real.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* 4. PROTOCOLO DE EXECUÇÃO */}
          <motion.div {...fadeUp(0.3)} className="mb-16">
            <p className="pre-title text-center mb-6">PROTOCOLO DE EXECUÇÃO</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div key={step.num} className="card-wealth text-center">
                  <span className="font-mono text-2xl font-bold text-gold block mb-2">
                    {step.num}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. NÍVEIS DE FINANCIAMENTO */}
          <motion.div {...fadeUp(0.4)} className="mb-16 text-center">
            <p className="pre-title mb-6">ESCOLHA COMO APOIAR</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {fundingLevels.map((level, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedLevel(i === selectedLevel ? null : i)}
                  className={`p-4 rounded-lg border text-sm font-medium transition-all duration-300 flex flex-col items-center gap-1 ${
                    selectedLevel === i
                      ? "border-gold bg-gold/10 text-gold glow-gold"
                      : "border-border bg-card hover:border-gold-dim text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {level.sats} Sats
                  </span>
                  <span className="text-xs opacity-70">{level.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 6. BOTÕES DE AÇÃO */}
          <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={`lightning:${LIGHTNING_ADDRESS}`}
              className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-2"
            >
              APOIAR AGORA
              <Zap className="w-4 h-4" />
            </a>
            <Link
              to="/guia-lightning"
              className="px-8 py-3.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-gold-dim hover:text-foreground transition-all duration-300 flex items-center gap-2"
            >
              Aprender sobre Lightning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. FOOTER FINAL */}
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
              &copy; LORD JUNNIOR &middot; 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
