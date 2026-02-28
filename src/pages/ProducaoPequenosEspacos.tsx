import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Sprout, Leaf, Sun, Droplets, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import imgLayout from '@/assets/producao-layout-canteiros.jpg';
import imgConsorcio from '@/assets/producao-consorcio-culturas.jpg';
import imgRotacao from '@/assets/producao-rotacao-sazonal.jpg';
import imgMicroclimas from '@/assets/producao-microclimas.jpg';

/* ─── SEO: meta keywords target ───
   produção em pequenos espaços, horta 4m², canteiros organizados, consórcio de culturas,
   rotação sazonal de plantio, microclimas urbanos, agricultura urbana, horta urbana,
   produção de alimentos em casa, soberania alimentar, autossuficiência alimentar brasil,
   cultivo em pequenos espaços, milho feijão abóbora, planejamento de horta
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

interface ModuleSection {
  num: string;
  title: string;
  subtitle: string;
  image: string;
  icon: typeof Layers;
  analogy: string;
  body: string;
  points: string[];
  insight: string;
}

const SECTIONS: ModuleSection[] = [
  {
    num: '01',
    title: 'Layout Otimizado de Canteiros',
    subtitle: 'Cada coisa no lugar certo',
    image: imgLayout,
    icon: Layers,
    analogy: 'Um canteiro organizado é como uma cozinha profissional: cada coisa no lugar certo. Um canteiro desorganizado é como um quarto bagunçado — você perde espaço e não aproveita nada direito.',
    body: 'Organizar um espaço de 4m² com inteligência multiplica a capacidade produtiva. Canteiros estreitos, escalonamento por altura e corredores mínimos transformam metros em alimento.',
    points: [
      'Canteiros estreitos para alcançar o centro sem pisar',
      'Plantas altas atrás, médias no meio, baixas na frente',
      'Corredores pequenos apenas para passagem',
      'Melhora luz, ventilação e facilita manutenção',
    ],
    insight: 'Espaço pequeno não é limitação. Falta de organização é.',
  },
  {
    num: '02',
    title: 'Consórcio de Culturas Compatíveis',
    subtitle: 'Plantas que se ajudam',
    image: imgConsorcio,
    icon: Sprout,
    analogy: 'É como montar um time onde cada jogador tem uma função. Milho cresce alto e serve de suporte. Feijão sobe no milho e devolve nutrientes ao solo. Abóbora cobre o chão e protege a terra do sol.',
    body: 'Quando as plantas cooperam, o solo fica mais saudável e o trabalho diminui. Juntas, elas produzem mais do que separadas. Esse método ancestral é validado por séculos de agricultura indígena.',
    points: [
      'Milho: estrutura vertical e suporte natural',
      'Feijão: fixação de nitrogênio no solo',
      'Abóbora: cobertura viva contra evaporação',
      'Sistema integrado reduz pragas e aumenta produção',
    ],
    insight: 'Cooperação entre espécies é a engenharia mais antiga do mundo.',
  },
  {
    num: '03',
    title: 'Rotação Sazonal de Plantio',
    subtitle: 'Alternar para manter',
    image: imgRotacao,
    icon: Sun,
    analogy: 'Plantar sempre a mesma coisa no mesmo lugar desgasta o solo. É como usar o mesmo músculo todos os dias sem descanso. Rotação significa alternar para equilibrar.',
    body: 'Cada grupo de plantas usa nutrientes diferentes. Folhas, leguminosas, raízes e frutos em rotação mantêm o solo equilibrado. Solo equilibrado produz por mais tempo com menos insumos.',
    points: [
      'Folhas: consomem nitrogênio superficial',
      'Leguminosas: devolvem nitrogênio ao solo',
      'Raízes: acessam nutrientes profundos',
      'Frutos: exigem fósforo e potássio',
    ],
    insight: 'Solo equilibrado é solo que produz por décadas.',
  },
  {
    num: '04',
    title: 'Aproveitamento de Microclimas Urbanos',
    subtitle: 'Diferentes "salas" no mesmo espaço',
    image: imgMicroclimas,
    icon: Droplets,
    analogy: 'Mesmo dentro do mesmo terreno existem diferenças. Um lado pode receber sol o dia inteiro. Outro pode ter sombra à tarde. Isso é microclima — como diferentes "salas" dentro do mesmo espaço.',
    body: 'Plantas que gostam de sol forte ficam na área mais quente. Plantas que preferem sombra ficam no lado protegido. Observar antes de plantar aumenta muito a chance de sucesso.',
    points: [
      'Sol forte: tomates, pimentas, manjericão',
      'Meia sombra: alface, rúcula, salsinha',
      'Sombra total: hortelã, samambaias, gengibre',
      'Áreas protegidas do vento para mudas jovens',
    ],
    insight: 'Observar antes de plantar é a primeira técnica de cultivo.',
  },
];

const RESULTS = [
  'Folhas frescas',
  'Legumes',
  'Temperos',
  'Frutos pequenos',
];

export default function ProducaoPequenosEspacos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf6ef 0%, #f5efe3 20%, #ede5d4 40%, #e4ddc8 60%, #ddd5c0 80%, #d8cfb8 100%)' }}
    >
      {/* Organic background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes breatheProducao {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.06; }
            50% { transform: translateY(-12px) scale(1.02); opacity: 0.1; }
          }
        `}</style>
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,170,80,0.2) 0%, transparent 65%)', animation: 'breatheProducao 20s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(120,160,60,0.15) 0%, transparent 65%)', animation: 'breatheProducao 25s ease-in-out 5s infinite' }} />
      </div>

      {/* Floating icons */}
      <Leaf className="fixed top-[20%] left-[5%] text-amber-700 pointer-events-none z-0" size={70}
        style={{ opacity: 0.06, animation: 'breatheProducao 16s ease-in-out infinite' }} />
      <Sprout className="fixed bottom-[15%] right-[6%] text-emerald-700 pointer-events-none z-0" size={80}
        style={{ opacity: 0.05, animation: 'breatheProducao 22s ease-in-out 3s infinite' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pt-20">

        {/* Back */}
        <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 mb-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300">
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ═══ HEADER ═══ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-start gap-5 mb-8">
            <div className="p-4 bg-amber-500/10 border border-amber-400/20 rounded-2xl mt-1">
              <Layers className="text-amber-700" size={28} />
            </div>
            <div>
              <p className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-3">
                Fase 03 · Soberania Alimentar
              </p>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-stone-800" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                PRODUÇÃO EM<br /><span className="text-amber-700">PEQUENOS ESPAÇOS</span>
              </h1>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-8 md:p-10">
            <p className="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight mb-4">
              4m² podem virar uma fonte real de alimento
            </p>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-2xl">
              Quatro metros quadrados parecem pouco. Mas pense assim: é o tamanho de uma vaga de estacionamento pequena.
              <span className="text-amber-700 font-semibold"> Se cabe um carro, também cabe comida.</span>
            </p>
            <p className="text-stone-400 text-sm mt-4 leading-relaxed max-w-xl">
              Produzir em pouco espaço não depende de tamanho. Depende de organização.
              Quando o espaço é planejado, ele funciona como uma pequena fábrica natural.
            </p>
          </div>
        </motion.header>

        {/* ═══ MÓDULOS ═══ */}
        {SECTIONS.map((section, idx) => (
          <motion.section
            key={section.num}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={idx * 0.5}
            className="mb-16"
          >
            {/* Divider */}
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
              <span className="text-stone-400 text-[9px] font-bold tracking-[0.4em] uppercase">
                Módulo {section.num}
              </span>
              <div className="flex-1 h-px bg-amber-500 opacity-20" />
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl overflow-hidden hover:shadow-lg hover:scale-[1.005] transition-all duration-500">
              {/* Image */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 md:left-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-xl border border-amber-300/30">
                      <section.icon className="text-amber-200" size={18} />
                    </div>
                    <div>
                      <span className="text-amber-300/80 text-[9px] font-bold tracking-[0.4em] uppercase block">
                        {section.num} — {section.subtitle}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Analogy — PNL anchor */}
                <div className="bg-amber-50/70 border border-amber-200/40 rounded-2xl p-5 md:p-6 mb-6">
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed italic">
                    "{section.analogy}"
                  </p>
                </div>

                <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-6">
                  {section.body}
                </p>

                {/* Points */}
                <ul className="space-y-3 mb-6">
                  {section.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: APPLE_EASE, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 bg-stone-50/80 rounded-xl px-4 py-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span className="text-stone-600 text-sm leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Insight */}
                <div className="border-l-3 border-amber-500/50 pl-5">
                  <p className="text-amber-700 text-sm font-semibold leading-relaxed">
                    {section.insight}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══ VISÃO FINAL ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
            <span className="text-stone-400 text-[9px] font-bold tracking-[0.4em] uppercase">Visão Final</span>
            <div className="flex-1 h-px bg-amber-500 opacity-20" />
          </div>

          <div className="bg-amber-50/70 border border-amber-200/50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight mb-6">
              4m² organizados produzem:
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {RESULTS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-white/70 border border-amber-200/40 rounded-xl p-4 text-center hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                >
                  <Sprout className="text-amber-600 mx-auto mb-2" size={20} />
                  <p className="text-stone-700 text-sm font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 text-stone-500 text-sm leading-relaxed">
              <p>Espaço pequeno <span className="text-amber-700 font-semibold">não é limitação</span>.</p>
              <p>Falta de planejamento é.</p>
              <p className="text-stone-600 font-medium pt-2">
                Quando o espaço é entendido como sistema, ele começa a trabalhar a favor de quem cultiva.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ NAVIGATION ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-between"
        >
          <Link
            to="/projeto-autonomo/horta-urbana"
            className="flex items-center gap-3 bg-white/50 border border-stone-200/50 rounded-2xl px-6 py-4 hover:bg-white/80 hover:shadow-md transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="text-stone-400 group-hover:text-amber-600 transition-colors" />
            <div>
              <span className="text-stone-400 text-[9px] font-bold uppercase tracking-wider">Anterior</span>
              <p className="text-stone-700 text-sm font-semibold">Horta Urbana</p>
            </div>
          </Link>

          <Link
            to="/projeto-autonomo/conservacao-armazenamento"
            className="flex items-center gap-3 bg-white/50 border border-stone-200/50 rounded-2xl px-6 py-4 hover:bg-white/80 hover:shadow-md transition-all duration-300 group justify-end"
          >
            <div className="text-right">
              <span className="text-stone-400 text-[9px] font-bold uppercase tracking-wider">Próximo</span>
              <p className="text-stone-700 text-sm font-semibold">Conservação e Armazenamento</p>
            </div>
            <ArrowRight size={16} className="text-stone-400 group-hover:text-amber-600 transition-colors" />
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-stone-400 text-xs leading-relaxed max-w-md mx-auto">
            Este módulo faz parte da Fase 03 — Soberania Alimentar do Projeto Autônomo.
            Conteúdo baseado em técnicas validadas de agricultura urbana e permacultura.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
