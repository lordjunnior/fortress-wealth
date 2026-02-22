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
    question: "O que é Bitcoin e por que ele é importante?",
    answer:
      "Bitcoin é um sistema de dinheiro eletrônico peer-to-peer criado em 2009 por Satoshi Nakamoto. Diferente do dinheiro fiduciário (Real, Dólar), ele não pode ser impresso por governos, confiscado por bancos ou inflacionado por políticas monetárias. Sua importância está em devolver ao indivíduo o controle total sobre seu próprio patrimônio.",
  },
  {
    question: "O que significa Autocustódia?",
    answer:
      'Autocustódia significa que você — e somente você — controla as chaves privadas que dão acesso aos seus bitcoins. Sem banco, sem corretora, sem intermediário. A frase "not your keys, not your coins" resume o conceito: se outra pessoa guarda suas chaves, o dinheiro não é seu de verdade.',
  },
  {
    question: "Preciso de muito dinheiro para começar?",
    answer:
      "Não. O Bitcoin é divisível em até 100 milhões de partes (satoshis). Você pode começar comprando frações com qualquer valor. O importante não é quanto você investe, mas que você comece a entender o sistema e proteger o que é seu.",
  },
  {
    question: "O confisco de 1990 pode acontecer de novo?",
    answer:
      "O mecanismo legal que permitiu o confisco do Plano Collor nunca foi revogado. Qualquer patrimônio que dependa de um banco de dados centralizado — contas bancárias, investimentos em corretoras — está sujeito a bloqueio por decreto. O Bitcoin em autocustódia é a única forma comprovada de proteção contra esse risco.",
  },
  {
    question: "Lightning Network é segura?",
    answer:
      "Sim. A Lightning Network é uma camada de pagamentos construída sobre o Bitcoin que permite transações instantâneas e com taxas mínimas. Ela herda a segurança da blockchain do Bitcoin e é ideal para transações do dia a dia, enquanto a camada base serve para poupança de longo prazo.",
  },
  {
    question: "Este site vende alguma coisa?",
    answer:
      "Não. Este arsenal é 100% educacional e gratuito. Não vendemos cursos, mentorias, tokens ou qualquer produto financeiro. O objetivo é compartilhar conhecimento que o sistema educacional e a mídia tradicional sistematicamente escondem. Se o conteúdo te ajudou, você pode apoiar voluntariamente via Lightning Network.",
  },
  {
    question: "Por onde devo começar?",
    answer:
      'Comece pela seção "Arsenal de Conhecimento" neste site. Leia os fundamentos sobre dinheiro e sistema monetário, entenda por que a autocustódia é essencial, e depois avance para os guias operacionais de Lightning Network e economia paralela. O ebook gratuito é um excelente ponto de partida.',
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
