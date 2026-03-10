import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "O que é o Bitcoin e por que ele é valioso?",
    answer:
      "O Bitcoin é a primeira moeda digital descentralizada e escassa. Seu valor vem da matemática e da rede global que garante que apenas 21 milhões de unidades existirão, servindo como proteção contra a inflação estatal.",
  },
  {
    question: "O que significa fazer a autocustódia de Bitcoin?",
    answer:
      "Autocustódia é o ato de possuir suas próprias chaves privadas. Ao retirar seus Bitcoins das corretoras e usar uma carteira própria, você se torna seu próprio banco, eliminando o risco de terceiros.",
  },
  {
    question: "Como proteger meu patrimônio contra a inflação?",
    answer:
      "O Bitcoin é uma ferramenta de preservação de valor a longo prazo. Diferente das moedas fiduciárias que perdem poder de compra, o BTC possui uma política monetária fixa e imutável.",
  },
  {
    question: "O que é Cold Storage e por que é importante?",
    answer:
      "Cold Storage é o armazenamento de chaves privadas offline. É o método mais seguro de guardar Bitcoin, protegendo seus ativos contra ataques hackers e engenharia social.",
  },
  {
    question: "É possível comprar Bitcoin de forma privada?",
    answer:
      "Sim. Através de métodos P2P e ferramentas que não exigem vigilância corporativa (KYC), é possível adquirir e transacionar Bitcoin preservando sua privacidade financeira.",
  },
  {
    question: "O que são chaves privadas e sementes (seed phrases)?",
    answer:
      "São as provas de propriedade do seu Bitcoin. A chave privada permite assinar transações, enquanto a seed phrase é o backup universal que garante o acesso aos seus fundos em caso de perda da carteira.",
  },
  {
    question: "O Bitcoin é legal no Brasil?",
    answer:
      "Sim, o Bitcoin é uma propriedade digital reconhecida. A autocustódia é um direito do indivíduo de gerir sua própria riqueza de forma independente.",
  },
  {
    question: "Como começar na autocustódia de elite?",
    answer:
      "O primeiro passo é entender a responsabilidade de gerar suas próprias chaves. O uso de hardware wallets e o estudo sobre segurança digital são essenciais para uma blindagem completa.",
  },
  {
    question: "Onde aprender sobre Bitcoin e soberania financeira de graça?",
    answer:
      "No site lordjunnior.com, oferecemos ebooks, audiobooks e tutoriais gratuitos focados em educação técnica, matemática aplicada e ferramentas de privacidade para BTC.",
  },
];

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return faqItems.length - 1;
        if (next >= faqItems.length) return 0;
        return next;
      });
    },
    []
  );

  // Auto-advance every 8s
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="pre-title">PERGUNTAS FREQUENTES</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Dúvidas <span className="text-gradient-gold">Comuns</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Card container */}
          <div className="relative rounded-lg border border-border bg-background overflow-hidden min-h-[280px] md:min-h-[240px]">
            {/* Counter */}
            <div className="absolute top-5 right-5 z-10">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {String(current + 1).padStart(2, "0")}/{String(faqItems.length).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="p-8 md:p-10"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-9 h-9 rounded-md border border-border bg-card flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold leading-snug">
                    {faqItems[current].question}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-[52px]">
                  {faqItems[current].answer}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 z-10">
              <button
                onClick={() => paginate(-1)}
                className="w-8 h-8 rounded-md border border-border bg-card flex items-center justify-center hover:border-gold/30 hover:text-gold transition-colors duration-300 text-muted-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-8 h-8 rounded-md border border-border bg-card flex items-center justify-center hover:border-gold/30 hover:text-gold transition-colors duration-300 text-muted-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-5">
            {faqItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
