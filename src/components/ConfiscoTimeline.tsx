import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Vault, Lock, AlertTriangle, BookOpen, Bitcoin, Scale, Shield, ArrowDown } from "lucide-react";

const timelineEvents = [
  {
    date: "15/Mar/1990",
    label: "Seu dinheiro no banco.",
    icon: Vault,
    color: "text-muted-foreground",
    borderColor: "border-border",
  },
  {
    date: "16/Mar/1990",
    label: "O Confisco. Bloqueio de 80% das contas.",
    icon: Lock,
    color: "text-chart-red",
    borderColor: "border-destructive",
  },
  {
    date: "Hoje",
    label: "O mecanismo legal para repetir isso ainda existe.",
    icon: AlertTriangle,
    color: "text-gold",
    borderColor: "border-gold-dim",
  },
];

const bulletPoints = [
  {
    title: "O Precedente",
    text: "O que aconteceu em 90 é a prova de que o saldo na sua tela é uma permissão temporária, não uma posse real.",
  },
  {
    title: "A Vulnerabilidade",
    text: "Se o seu patrimônio depende de um banco de dados centralizado, você está a uma assinatura de distância da insolvência.",
  },
  {
    title: "A Resposta Técnica",
    text: "O Bitcoin e a Autocustódia existem para garantir que o seu esforço de vida nunca mais seja passível de sequestro estatal.",
  },
];

const connectorCards = [
  { icon: BookOpen, title: "Economia que Faz Sentido", desc: "A lógica da pilhagem estatal." },
  { icon: Bitcoin, title: "Bitcoin sem Enrolação", desc: "Autocustódia e proteção real." },
  { icon: Scale, title: "Filosofia da Liberdade", desc: "Ética de propriedade e mercado." },
  { icon: Shield, title: "Estratégias de Saída", desc: "Ferramentas de independência operacional." },
];

const ConfiscoTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleComecarAgora = () => {
    const el = document.getElementById("educacao");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-card/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <p className="pre-title">A TRANSIÇÃO: DA TEORIA À CICATRIZ</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            A fraude que você ignora hoje é o confisco que te destruirá amanhã. Para quem viveu
            o Brasil de 1990, a "soberania" não era um conceito técnico — era a diferença entre
            ter o que comer e ver o esforço de uma vida inteira evaporar por um decreto assinado
            em Brasília.
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            O QUE A HISTÓRIA NÃO TE CONTA, <span className="text-gradient-gold">A MATEMÁTICA PROVA.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
            O manifesto que você leu acima não é um aviso sobre o futuro; é a explicação técnica
            de por que o passado se repetirá. O dinheiro no banco não é patrimônio; é um passivo
            que o Estado decide quando e como você pode acessar.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="card-wealth p-6 md:p-10 mb-12"
        >
          <p className="pre-title mb-6">INFOGRÁFICO · LINHA DO TEMPO</p>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
              {timelineEvents.map((event, i) => {
                const Icon = event.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                    className={`relative flex flex-col items-center text-center p-6 rounded-lg border ${event.borderColor} bg-background`}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 ${event.borderColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${event.color}`} />
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mb-2">{event.date}</p>
                    <p className={`text-sm font-medium ${event.color}`}>{event.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Context: 1990 + Bullet Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mb-14"
        >
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
            <p>
              Você acredita que o dinheiro no banco é seu porque ainda não viveu o próximo
              "feriado bancário". Em 16 de março de 1990, milhões de brasileiros acordaram e
              descobriram que seu patrimônio havia sido sequestrado pelo Estado. Não houve aviso.
              Não houve escolha.
            </p>
            <p>
              O confisco foi a demonstração final de que, no sistema fiduciário, você é apenas
              um credor de uma promessa que pode ser quebrada a qualquer momento.
            </p>
          </div>

          {/* Bullet points */}
          <div className="space-y-4">
            {bulletPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex gap-3 items-start"
              >
                <span className="text-gold mt-1 text-lg leading-none">▸</span>
                <div>
                  <span className="text-foreground font-semibold">{point.title}:</span>{" "}
                  <span className="text-muted-foreground">{point.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connector Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-10"
        >
          <p className="pre-title mb-2">O CONECTOR: DA CICATRIZ À SAÍDA OPERACIONAL</p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl mb-8">
            A tecnologia evoluiu. O risco estatal não. Em 1990, não havia para onde fugir. Hoje,
            a barreira entre o seu patrimônio e o próximo decreto estatal é o seu conhecimento
            técnico. Se o sistema bancário é o campo minado, o Bitcoin é a rota de extração.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {connectorCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group relative rounded-lg border border-border bg-background p-6 cursor-pointer overflow-hidden transition-colors duration-300 hover:border-gold/30"
                >
                  {/* Subtle gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center mb-4 group-hover:border-gold/30 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <h4 className="text-sm font-semibold mb-1.5 group-hover:text-gold transition-colors duration-300">{card.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleComecarAgora}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gold text-background font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-gold/90 transition-colors"
            >
              Começar Agora (É Grátis)
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConfiscoTimeline;
