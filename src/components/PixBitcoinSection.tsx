import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, ArrowRight, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PixBitcoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px] h-[560px] rounded-[40px] border-2 border-border bg-card p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl" />

              {/* Screen content */}
              <div className="w-full h-full rounded-[32px] bg-background overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-8 pb-3">
                  <span className="font-mono text-[10px] text-muted-foreground">21:47</span>
                  <div className="flex gap-1">
                    <Zap className="w-3 h-3 text-gold" />
                    <span className="font-mono text-[10px] text-gold">Lightning</span>
                  </div>
                </div>

                {/* Wallet content */}
                <div className="flex-1 px-5 pt-4">
                  <p className="text-[10px] text-muted-foreground font-mono mb-1">SALDO DISPONÍVEL</p>
                  <p className="text-2xl font-bold text-foreground mb-1">1.247.830 <span className="text-sm text-gold">sats</span></p>
                  <p className="text-xs text-muted-foreground mb-8">≈ R$ 4.127,50</p>

                  <div className="border border-border rounded-lg p-4 mb-4">
                    <p className="text-[10px] text-muted-foreground font-mono mb-2">ENVIAR PIX</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">fulano@email.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Valor</p>
                        <p className="text-lg font-semibold text-foreground">R$ 350,00</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold" />
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Débito</p>
                        <p className="text-lg font-semibold text-gold">105.782 sats</p>
                      </div>
                    </div>
                  </div>

                  <div className="gradient-gold rounded-lg py-3 text-center">
                    <span className="text-sm font-semibold text-primary-foreground">Confirmar via Lightning</span>
                  </div>

                  <p className="text-[9px] text-muted-foreground text-center mt-3 font-mono">
                    GATEWAY DESCENTRALIZADO · SEM KYC
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="pre-title">ESTRATÉGIA DE SAÍDA</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              O Fim da Desculpa: <span className="text-gradient-gold">PIX via Bitcoin</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
              <p>
                A maior mentira que te contaram é que o Bitcoin é "difícil de usar" ou
                "apenas para o futuro". Essa narrativa serve para te manter no curral bancário.
              </p>
              <p>
                Aprenda a manter seu capital em Bitcoin — inalcançável por bloqueios judiciais — e
                converta para PIX apenas no segundo exato do pagamento usando gateways
                descentralizados.
              </p>
              <p className="text-foreground font-medium">
                Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco.
              </p>
            </div>

            <button
              onClick={() => navigate("/saida/gateway")}
              className="px-8 py-4 rounded-lg gradient-gold text-primary-foreground font-semibold tracking-wide text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-3"
            >
              <Zap className="w-4 h-4" />
              EXECUTAR PRIMEIRA OPERAÇÃO SOBERANA
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PixBitcoinSection;
