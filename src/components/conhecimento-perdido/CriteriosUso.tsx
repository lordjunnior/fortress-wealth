import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Pill, Leaf, Stethoscope } from 'lucide-react';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const criterios = [
  {
    icon: Stethoscope,
    titulo: 'Emergência não se trata com planta',
    desc: 'Se alguém está com febre alta que não cede, dor forte, sangramento, confusão mental ou falta de ar — isso não é momento para chá. É momento para hospital. Plantas não fazem triagem, não diagnosticam e não substituem intervenção médica de urgência. Nenhuma.',
    accent: 'red',
  },
  {
    icon: AlertTriangle,
    titulo: 'Sintoma que insiste precisa de profissional',
    desc: 'Usou uma planta por 5 dias e não melhorou? Melhorou e voltou? Piorou gradualmente? Pare. Isso significa que a causa não está sendo tratada — e planta nenhuma resolve o que ela não consegue alcançar. Persistência de sintoma é sinal de que algo maior está acontecendo. Procure avaliação profissional.',
    accent: 'amber',
  },
  {
    icon: Pill,
    titulo: 'Planta e remédio juntos? Cuidado.',
    desc: 'Plantas medicinais têm compostos reais que interagem com medicamentos reais. Quem toma anticoagulante, remédio para pressão, antidepressivo ou insulina precisa saber: uma planta pode aumentar, anular ou desorganizar o efeito do remédio. Antes de misturar, informe-se. Cada ficha deste módulo lista essas interações.',
    accent: 'purple',
  },
  {
    icon: Leaf,
    titulo: 'Natural não é sinônimo de seguro',
    desc: 'Arnica causa parada cardíaca se engolida. Boldo destrói o fígado em uso prolongado. Mulungu derruba a pressão de quem já toma remédio. A diferença entre remédio e veneno é dose, via de uso e tempo. Este módulo existe para documentar exatamente esses limites — não para promover uso livre.',
    accent: 'emerald',
  },
];

export function CriteriosUso() {
  return (
    <motion.section
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
      className="mb-28"
    >
      <div className="bg-gradient-to-br from-stone-950/80 to-[#0f1a0f]/60 border border-stone-700/30 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-600/20">
            <ShieldAlert className="text-stone-300" size={22} />
          </div>
          <div>
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase">Leia antes de tudo</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-stone-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              CRITÉRIOS DE USO <span className="text-stone-400">RESPONSÁVEL</span>
            </h2>
          </div>
        </div>

        <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl mb-4">
          Se você nunca usou planta medicinal na vida, comece por aqui. 
          Estes quatro princípios vêm antes de qualquer ficha, qualquer receita, qualquer preparo. 
          São os limites que separam conhecimento de irresponsabilidade.
        </p>
        <p className="text-stone-500 text-xs leading-relaxed max-w-3xl mb-10">
          Quanto mais você souber sobre o que uma planta <span className="text-stone-300 font-semibold">não pode fazer</span>, mais seguro será o uso do que ela <span className="text-stone-300 font-semibold">pode</span>.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {criterios.map((c, i) => {
            const bgMap: Record<string, string> = {
              red: 'bg-red-950/20 border-red-800/20 hover:border-red-600/30',
              amber: 'bg-amber-950/20 border-amber-800/20 hover:border-amber-600/30',
              purple: 'bg-purple-950/20 border-purple-800/20 hover:border-purple-600/30',
              emerald: 'bg-emerald-950/20 border-emerald-800/20 hover:border-emerald-600/30',
            };
            const iconBgMap: Record<string, string> = {
              red: 'bg-red-800/20',
              amber: 'bg-amber-800/20',
              purple: 'bg-purple-800/20',
              emerald: 'bg-emerald-800/20',
            };
            const iconColorMap: Record<string, string> = {
              red: 'text-red-400',
              amber: 'text-amber-400',
              purple: 'text-purple-400',
              emerald: 'text-emerald-400',
            };

            return (
              <motion.div
                key={c.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className={`border rounded-xl p-6 transition-all duration-500 ${bgMap[c.accent]}`}
              >
                <div className={`p-2 rounded-lg w-fit mb-4 ${iconBgMap[c.accent]}`}>
                  <c.icon className={iconColorMap[c.accent]} size={18} />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-3 leading-tight">{c.titulo}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-stone-700/20">
          <p className="text-stone-500 text-xs italic leading-relaxed">
            Este módulo documenta conhecimento tradicional e bioquímico para uso educativo. 
            Não constitui prescrição médica. Toda decisão terapêutica deve considerar contexto individual, 
            histórico de saúde e, quando necessário, orientação profissional qualificada.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
