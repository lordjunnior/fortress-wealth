import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Vault, Lock, AlertTriangle } from "lucide-react";

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

const ConfiscoTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Timeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="card-wealth p-6 md:p-10 mb-12"
        >
          <p className="pre-title mb-6">INFOGRÁFICO · LINHA DO TEMPO</p>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
              {timelineEvents.map((event, i) => {
                const Icon = event.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
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

        {/* Context text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl"
        >
          <p className="pre-title">MÓDULO DE CHOQUE</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            O Precedente de <span className="text-chart-red">1990</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Você acredita que o dinheiro no banco é seu porque ainda não viveu o próximo
              "feriado bancário". Em 16 de março de 1990, milhões de brasileiros acordaram e
              descobriram que seu patrimônio havia sido sequestrado pelo Estado. Não houve aviso.
            </p>
            <p>
              O confisco foi a demonstração final de que, no sistema fiduciário, você é apenas
              um credor de uma promessa. Se o seu patrimônio depende de um banco de dados
              centralizado, você está a uma assinatura de distância da insolvência.
            </p>
            <p className="text-foreground font-medium">
              O Bitcoin e a Autocustódia existem para garantir que o seu esforço de vida nunca
              mais seja passível de sequestro estatal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConfiscoTimeline;
