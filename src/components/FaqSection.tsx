import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "E se o governo proibir Bitcoin no Brasil?",
    answer:
      "Governos podem dificultar o acesso, mas não podem impedir o funcionamento do protocolo. O Bitcoin opera em uma rede descentralizada global — não existe um servidor para desligar. Países como China tentaram proibir e falharam. O que você precisa é de conhecimento técnico para operar com soberania, independentemente da regulação local.",
  },
  {
    question: "Preciso ser programador para usar?",
    answer:
      "Absolutamente não. Assim como você não precisa entender TCP/IP para usar a internet, você não precisa programar para usar Bitcoin. As ferramentas modernas de autocustódia são intuitivas. O que você precisa é de educação financeira — e é exatamente isso que este arsenal oferece gratuitamente.",
  },
  {
    question: "Bitcoin é pirâmide financeira?",
    answer:
      "Não. Pirâmides dependem de novos participantes pagando os antigos e colapsam quando param de entrar. O Bitcoin é um protocolo matemático com oferta fixa de 21 milhões de unidades, sem dono, sem empresa por trás, sem promessa de retorno. Ele é dinheiro — não um esquema de investimento.",
  },
  {
    question: "Já perdi muito tempo, não vale a pena comprar BTC hoje?",
    answer:
      "O melhor momento para comprar Bitcoin foi ontem. O segundo melhor é hoje. O Bitcoin ainda está no início da curva de adoção global. Menos de 5% da população mundial possui Bitcoin. Você não está atrasado — a maioria das pessoas ainda nem começou a entender o que está acontecendo com o sistema monetário.",
  },
  {
    question: "Posso deixar Bitcoin em corretora?",
    answer:
      'Pode, mas não deveria. Corretoras são bancos de dados centralizados — sujeitas a hacks, bloqueios judiciais, falências e confiscos. A FTX colapsou com bilhões de dólares de clientes. A regra é simples: "Not your keys, not your coins." Aprenda autocustódia e durma em paz.',
  },
  {
    question: "Bitcoin substitui bancos?",
    answer:
      "O Bitcoin não substitui bancos — ele torna bancos opcionais. Você pode enviar, receber e guardar valor sem precisar de permissão de nenhuma instituição. Pela primeira vez na história, o indivíduo pode ser seu próprio banco com soberania total sobre seu patrimônio.",
  },
  {
    question: "Lightning é seguro?",
    answer:
      "Sim. A Lightning Network é uma camada de pagamentos construída sobre o Bitcoin que permite transações instantâneas com taxas próximas de zero. Ela herda a segurança da blockchain e é ideal para pagamentos do dia a dia, enquanto a camada base serve como reserva de valor de longo prazo.",
  },
  {
    question: "Existe risco regulatório?",
    answer:
      "Sempre existe risco regulatório em qualquer ativo. Governos podem criar impostos, restrições de acesso ou regras de compliance. Mas o Bitcoin foi projetado para ser resistente à censura. Com autocustódia e conhecimento técnico de operações P2P, você minimiza drasticamente a exposição regulatória.",
  },
  {
    question: "Como começar com pouco dinheiro?",
    answer:
      "O Bitcoin é divisível em 100 milhões de satoshis. Você pode começar com R$50, R$100 — o valor não importa. O que importa é começar. Compre uma fração, transfira para sua própria carteira, aprenda autocustódia. O hábito de empilhar satoshis regularmente é mais poderoso do que qualquer aporte único.",
  },
];

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-lg border border-border bg-background px-6 data-[state=open]:border-gold/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-sm font-semibold text-left hover:text-gold transition-colors duration-300 py-5 [&[data-state=open]]:text-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
