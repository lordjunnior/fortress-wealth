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
    titulo: 'Não substitui atendimento emergencial',
    desc: 'Quadros agudos — febre alta persistente, dor intensa, sangramento, confusão mental, dispneia — exigem avaliação médica imediata. Nenhuma planta substitui triagem, diagnóstico ou intervenção farmacológica de urgência.',
    accent: 'red',
  },
  {
    icon: AlertTriangle,
    titulo: 'Sintomas persistentes exigem avaliação profissional',
    desc: 'Qualquer sintoma que persista por mais de 5 a 7 dias sem melhora, que se agrave progressivamente ou que reapareça após intervalo curto não é adequado para manejo exclusivamente fitoterápico. A persistência é um sinal de que a causa não está sendo tratada.',
    accent: 'amber',
  },
  {
    icon: Pill,
    titulo: 'Uso concomitante com medicamentos deve ser avaliado',
    desc: 'Plantas medicinais possuem compostos bioativos que interagem com fármacos. Anticoagulantes, anti-hipertensivos, antidepressivos, imunossupressores e hipoglicemiantes são especialmente sensíveis. A interação pode potencializar, anular ou alterar o efeito do medicamento.',
    accent: 'purple',
  },
  {
    icon: Leaf,
    titulo: 'Natural não significa inofensivo',
    desc: 'Arnica é cardiotóxica por via oral. Boldo causa hepatotoxicidade em uso prolongado. Mulungu pode causar hipotensão severa. A diferença entre remédio e veneno é a dose, a via de administração e o tempo de uso. Este módulo existe para documentar exatamente esses limites.',
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
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase">Obrigatório</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-stone-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              CRITÉRIOS DE USO <span className="text-stone-400">RESPONSÁVEL</span>
            </h2>
          </div>
        </div>

        <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
          Autoridade técnica real exige limites claros. Os quatro princípios abaixo são inegociáveis 
          e precedem qualquer ficha técnica deste módulo. Não existe autonomia sem responsabilidade.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {criterios.map((c, i) => (
            <motion.div
              key={c.titulo}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              className={`bg-${c.accent}-950/20 border border-${c.accent}-800/20 rounded-xl p-6 hover:border-${c.accent}-600/30 transition-all duration-500`}
            >
              <div className={`p-2 bg-${c.accent}-800/20 rounded-lg w-fit mb-4`}>
                <c.icon className={`text-${c.accent}-400`} size={18} />
              </div>
              <h4 className="text-sm font-bold text-stone-200 mb-3 leading-tight">{c.titulo}</h4>
              <p className="text-stone-500 text-xs leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
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
