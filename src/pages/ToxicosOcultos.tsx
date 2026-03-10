import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search, Apple, Brain, Smartphone, Leaf, Eye, Shield, AlertTriangle, Microscope } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const SPOKES = [
  {
    num: '01', title: 'Toxinas Alimentares', slug: 'toxinas-alimentares',
    subtitle: 'CORPO', accent: '#f59e0b', accentClass: 'amber',
    icon: Apple, desc: 'Aditivos, ultraprocessados, agrotóxicos, açúcar oculto.',
    longDesc: 'Ingredientes que entram silenciosamente na dieta cotidiana. Cada rótulo esconde decisões industriais que afetam saúde metabólica, microbiota e capacidade cognitiva. Este módulo disseca o que a indústria alimentar não quer que você leia.',
    pnl: 'O primeiro passo da autonomia é saber o que entra no seu corpo.',
  },
  {
    num: '02', title: 'Manipulação Informacional', slug: 'manipulacao-informacional',
    subtitle: 'MENTE', accent: '#a855f7', accentClass: 'violet',
    icon: Brain, desc: 'Propaganda, novilíngua, viés algorítmico, engenharia de consentimento.',
    longDesc: 'Da propaganda estatal ao filtro algorítmico, existem camadas de manipulação projetadas para moldar percepções e crenças. Este módulo treina o olhar crítico para identificar padrões de influência invisível.',
    pnl: 'Quem controla a narrativa, controla o comportamento.',
  },
  {
    num: '03', title: 'Dependência Tecnológica', slug: 'dependencia-tecnologica',
    subtitle: 'COMPORTAMENTO', accent: '#06b6d4', accentClass: 'cyan',
    icon: Smartphone, desc: 'Apps de dopamina, rastreamento, obsolescência programada.',
    longDesc: 'Design comportamental, ciclos de dopamina digital, coleta massiva de dados e obsolescência programada. Ferramentas tecnológicas construídas para capturar atenção e moldar decisões sem que você perceba.',
    pnl: 'Recuperar controle sobre o próprio tempo é o primeiro ato de soberania digital.',
  },
  {
    num: '04', title: 'Toxinas Ambientais', slug: 'toxinas-ambientais',
    subtitle: 'AMBIENTE', accent: '#22c55e', accentClass: 'green',
    icon: Leaf, desc: 'Produtos de limpeza, plásticos, poluição indoor, materiais sintéticos.',
    longDesc: 'Contaminantes domésticos, materiais sintéticos, qualidade do ar interno e produtos químicos cotidianos que atravessam a pele e os pulmões diariamente. Proteger o território começa por entender o que está dentro dele.',
    pnl: 'O instinto de proteger o próprio território começa pela consciência do que o contamina.',
  },
];

export default function ToxicosOcultos() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Removendo Tóxicos Ocultos — Laboratório de Discernimento",
    "description": "Módulo investigativo sobre dependências invisíveis: toxinas alimentares, manipulação informacional, dependência tecnológica e toxinas ambientais.",
    "url": "https://lordjunnior.com.br/projeto-autonomo/toxicos-ocultos",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Removendo Tóxicos Ocultos — Laboratório de Discernimento | Lord Junnior</title>
        <meta name="description" content="Identifique e remova dependências invisíveis: toxinas alimentares, manipulação informacional, dependência tecnológica e contaminantes ambientais." />
        <meta property="og:title" content="Removendo Tóxicos Ocultos — Laboratório de Discernimento" />
        <meta property="og:description" content="Corpo, mente, comportamento e ambiente. Quatro dimensões de autonomia pessoal." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/toxicos-ocultos.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/toxicos-ocultos" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }} />

      {/* Back button */}
      <Link to="/projeto-autonomo"
        className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground transition-colors text-xs"
      >
        <ArrowLeft size={14} /> Projeto Autônomo
      </Link>

      {/* Hero */}
      <CinematicHero
        title="REMOVENDO TÓXICOS"
        titleAccent="OCULTOS"
        subtitle="Laboratório de Discernimento"
        description="Corpo, mente, comportamento e ambiente. Quatro dimensões de investigação sobre influências invisíveis que reduzem clareza, saúde e liberdade de escolha."
        imageSrc="/heroes/toxicos-ocultos.webp"
        accentColor="#ef4444"
      />

      {/* Quadratura visual */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-red-500 rounded-full" />
              <span className="text-red-400 text-[10px] font-bold tracking-[0.5em] uppercase">Quadratura da Autonomia</span>
              <div className="w-8 h-[2px] bg-red-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              QUATRO VETORES DE <span className="text-red-400">INFLUÊNCIA INVISÍVEL</span>
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Cada vetor atua em um nível diferente da vida humana. Juntos, formam um ciclo completo de análise:
              o visitante percebe influências físicas, depois mentais, e finalmente as estruturas tecnológicas que moldam comportamento coletivo.
            </p>
          </motion.div>

          {/* 4-dimensional flow */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-20">
            {['Corpo', 'Mente', 'Comportamento', 'Ambiente'].map((dim, i) => (
              <motion.div key={dim} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border
                  ${i === 0 ? 'bg-amber-500/10 border-amber-500/20' : i === 1 ? 'bg-violet-500/10 border-violet-500/20' : i === 2 ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                  {i === 0 ? <Apple className="text-amber-400" size={20} /> : i === 1 ? <Brain className="text-violet-400" size={20} /> : i === 2 ? <Smartphone className="text-cyan-400" size={20} /> : <Leaf className="text-green-400" size={20} />}
                </div>
                <span className="text-stone-400 text-xs md:text-sm font-bold uppercase tracking-wider">{dim}</span>
                {i < 3 && <ArrowRight className="text-stone-700 ml-2 hidden md:block" size={16} />}
              </motion.div>
            ))}
          </div>

          {/* Spoke Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SPOKES.map((spoke, i) => (
              <motion.div key={spoke.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}>
                <Link to={`/projeto-autonomo/toxicos-ocultos/${spoke.slug}`}
                  className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-1 p-8 md:p-10"
                  style={{ ['--spoke-accent' as string]: spoke.accent }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at bottom right, ${spoke.accent}12, transparent 60%)` }} />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                    style={{ background: `linear-gradient(to right, ${spoke.accent}, transparent)` }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spoke.num}</span>
                      <div className="p-3 rounded-xl border group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                        style={{ background: `${spoke.accent}15`, borderColor: `${spoke.accent}25` }}>
                        <spoke.icon size={22} style={{ color: spoke.accent }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] ml-auto" style={{ color: `${spoke.accent}99` }}>{spoke.subtitle}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-3 group-hover:text-white transition-colors">
                      {spoke.title}
                    </h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-4" style={{ color: `${spoke.accent}80` }}>{spoke.desc}</p>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 group-hover:text-stone-400 transition-colors">
                      {spoke.longDesc}
                    </p>

                    {/* PNL quote */}
                    <div className="border-l-2 pl-4 mb-6" style={{ borderColor: `${spoke.accent}40` }}>
                      <p className="text-xs italic" style={{ color: `${spoke.accent}90` }}>"{spoke.pnl}"</p>
                    </div>

                    <div className="flex items-center gap-2 transition-colors" style={{ color: `${spoke.accent}70` }}>
                      <Eye size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Investigar módulo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Princípio Operacional</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tóxico oculto não é apenas química.
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-red-400 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              É qualquer influência invisível que reduz sua liberdade de escolha.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mx-auto mb-12">
              Cada módulo deste laboratório investiga um vetor diferente. Corpo, mente, comportamento e ambiente formam a quadratura completa do discernimento.
              Identificar o que entra silenciosamente na vida cotidiana é o primeiro passo para recuperar consciência e autonomia.
            </p>
            <Link to="/projeto-autonomo"
              className="inline-flex items-center gap-3 bg-red-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-red-400 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
            >
              <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao Projeto Autônomo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem investiga, não é manipulado.</p>
      </div>
    </div>
  );
}
