import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ClosingManifesto = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay },
  });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-3xl mx-auto">

        {/* PRE-TITLE */}
        <motion.div {...fadeUp()} className="text-center mb-10">
          <p className="pre-title mb-3">NOTA PESSOAL</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            <span className="text-gradient-gold">O PREÇO DA LIBERDADE</span>{" "}
            NÃO É O BITCOIN.{" "}
            <span className="text-chart-red">É O DESPREZO.</span>
          </h2>
        </motion.div>

        {/* HISTÓRIA PESSOAL */}
        <motion.div {...fadeUp(0.15)} className="card-wealth p-6 md:p-10 mb-8">
          <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              Quando comprei meus primeiros Satoshis, eu não recebi parabéns.
              Eu recebi risadas. Por anos, ouvi a mesma pergunta em tom de deboche:
            </p>

            <blockquote className="border-l-2 border-gold/60 pl-4 py-2 text-foreground font-semibold text-base md:text-lg italic">
              "E AÍ, JÁ FICOU MILIONÁRIO?"
            </blockquote>

            <p>
              Quem me perguntava isso ainda estava mergulhado no sono profundo do sistema.
              Eles buscavam o "milhão" de um papel que apodrece a cada dia.
              Eu não. Eu nunca busquei o luxo. Eu buscava o <span className="text-foreground font-semibold">ponto de saída</span>.
            </p>

            <p>
              Passei por humilhações que muitos não aguentariam, mas segui firme porque entendi
              que a minha liberdade não pode depender do Governo A ou B.
              Enquanto eles riam da volatilidade, eu ria da minha dependência diminuir.
            </p>

            <p className="text-foreground font-medium text-base md:text-lg">
              Hoje, eu não dependo deles. Eles ainda dependem do sistema.
            </p>
          </div>
        </motion.div>

        {/* BLOCO DE COMANDO */}
        <motion.div {...fadeUp(0.25)} className="mb-8">
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gold" />
              <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground">
                ASSUMA O SEU CONTROLE. NO SEU RITMO.
              </h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                A soberania é uma prática. Se você está começando com pouco, como eu comecei,
                use ferramentas de entrada como a <span className="text-foreground font-semibold">Wallet of Satoshi</span> para
                sentir o sistema funcionando.
              </p>
              <p>
                Mas se você já entendeu a gravidade do que está em jogo e vai mover valores significativos,
                não aceite menos que a <span className="text-foreground font-semibold">custódia total</span> via
                carteiras de hardware.
              </p>
              <p className="text-foreground font-medium">
                Não ligue para o barulho. Se você tem R$ 10,00 ou R$ 10.000,00,
                o que importa é o desejo de não ser mais um escravo.
                Comece pequeno, ou comece grande, mas <span className="text-gold font-bold">comece agora</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* VALIDE SUA LIBERDADE */}
        <motion.div {...fadeUp(0.35)} className="mb-10">
          <div className="bg-chart-red/5 border border-chart-red/20 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-chart-red" />
              <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground">
                VALIDE SUA LIBERDADE
              </h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Não saia desta página apenas com teoria. Se este tutorial te deu o mapa, faça o teste.
                Use sua ferramenta e, se este projeto te ajudou, envie seus primeiros sats como um sinal
                de que você agora domina o sistema.
              </p>
              <p>
                Não é pelo valor. É para provar ao seu cérebro que, a partir de hoje,
                <span className="text-foreground font-semibold"> você sabe operar fora das grades</span>.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Este conteúdo foi criado a partir de pedidos reais de pessoas que querem entender
                como tudo isso funciona na prática. Se te ajudou de alguma forma, já cumpriu o propósito.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/comprar-bitcoin-com-privacidade"
            className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-2"
          >
            COMEÇAR COM R$10
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#apoio"
            className="px-8 py-3.5 rounded-lg border border-gold/30 text-gold font-medium text-sm hover:bg-gold/5 transition-all duration-300 flex items-center gap-2"
          >
            ENVIAR MEUS PRIMEIROS SATS
            <Zap className="w-4 h-4" />
          </a>
        </motion.div>

        {/* ASSINATURA FINAL */}
        <motion.div {...fadeUp(0.5)} className="text-center">
          <p className="font-mono text-xs text-muted-foreground/50 tracking-[0.3em] uppercase">
            EXIT_BRAZIL // PROTOCOLO_LIBERDADE // LORD_JUNNIOR
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ClosingManifesto;
