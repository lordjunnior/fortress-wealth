import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { confiscoFaqData } from "@/lib/confiscoData";

const ConfiscoFaq = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      aria-labelledby="faq-heading"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">
              PERGUNTAS FREQUENTES
            </p>
            <h2
              id="faq-heading"
              className="text-xl md:text-2xl font-bold tracking-tight"
            >
              O que você precisa saber
            </h2>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-primary/30 via-border/50 to-transparent" />

        <Accordion type="single" collapsible className="space-y-3">
          {confiscoFaqData.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/40 rounded-xl bg-card/30 backdrop-blur-sm px-5 data-[state=open]:border-primary/20 transition-colors duration-300"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-4 text-foreground/90">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default ConfiscoFaq;
