import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Apple, AlertTriangle, ShieldAlert, Eye, Search, Beaker, List, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const ADITIVOS = [
  { nome: 'Glutamato Monossódico (MSG)', codigo: 'E621', risco: 'Excitotoxina — superestimula neurônios, pode causar dores de cabeça, alterações de apetite e resistência à leptina.', onde: 'Salgadinhos, temperos prontos, sopas instantâneas, molhos industriais.' },
  { nome: 'Xarope de Milho de Alta Frutose (HFCS)', codigo: 'N/A', risco: 'Metabolizado diretamente pelo fígado, contribui para esteatose hepática, resistência insulínica e obesidade visceral.', onde: 'Refrigerantes, sucos industriais, pães, cereais matinais, barras de cereal.' },
  { nome: 'Nitrito de Sódio', codigo: 'E250', risco: 'Forma nitrosaminas (cancerígenas) quando aquecido. Classificado como Grupo 1 pela IARC/OMS em carnes processadas.', onde: 'Presunto, salsicha, bacon, linguiça, mortadela.' },
  { nome: 'Tartrazina', codigo: 'E102', risco: 'Corante azoico associado a hiperatividade infantil, reações alérgicas e urticária. Proibido em alguns países europeus.', onde: 'Gelatinas, balas, refrigerantes amarelos, macarrão instantâneo.' },
  { nome: 'BHT / BHA', codigo: 'E320/E321', risco: 'Antioxidantes sintéticos com potencial carcinogênico demonstrado em estudos animais. Disruptores endócrinos suspeitos.', onde: 'Cereais, batatas chips, óleos, margarinas, goma de mascar.' },
  { nome: 'Aspartame', codigo: 'E951', risco: 'Classificado como "possivelmente cancerígeno" (Grupo 2B) pela IARC em 2023. Metabolizado em formaldeído e ácido aspártico.', onde: 'Refrigerantes diet, adoçantes de mesa, iogurtes light, chicletes sem açúcar.' },
];

const ESTRATEGIAS = [
  { titulo: 'Leia a lista de ingredientes, não a embalagem', desc: 'A embalagem é marketing. A lista de ingredientes é o documento real. Se o primeiro ingrediente é açúcar ou farinha refinada, o produto é basicamente isso.' },
  { titulo: 'Regra dos 5 ingredientes', desc: 'Se um produto possui mais de 5 ingredientes que você não reconheceria na natureza, ele foi engenheirado para paladar, não para nutrição.' },
  { titulo: 'Evite o corredor central do supermercado', desc: 'Os ultraprocessados ficam nas prateleiras centrais. Os alimentos reais ficam nas laterais: hortifruti, açougue, padaria artesanal.' },
  { titulo: 'Substitua progressivamente', desc: 'Não tente mudar tudo de uma vez. Substitua um ultraprocessado por semana por uma versão caseira ou in natura. Consistência vence radicalismo.' },
  { titulo: 'Cozinhe mais, compre menos pronto', desc: 'Cada refeição caseira é uma decisão de soberania alimentar. Você controla sal, gordura, açúcar e a qualidade dos ingredientes.' },
];

const FAQ_ITEMS = [
  { q: 'Ultraprocessados são realmente perigosos?', a: 'Estudos epidemiológicos como o NOVA (USP) e o NutriNet-Santé (França) demonstram correlação entre consumo de ultraprocessados e aumento de obesidade, diabetes tipo 2, doenças cardiovasculares e certos tipos de câncer. O risco não está em um ingrediente isolado, mas na combinação de aditivos, baixa densidade nutricional e design hiperpalatável.' },
  { q: 'Orgânicos fazem diferença real?', a: 'Sim, mas com nuances. Orgânicos certificados possuem limites mais baixos de resíduos de pesticidas. A diferença nutricional é modesta, mas a redução na exposição a agroquímicos é significativa, especialmente para crianças e gestantes. Priorize orgânicos nos itens mais contaminados (morangos, maçãs, folhosos).' },
  { q: 'Qual a diferença entre aditivo e contaminante?', a: 'Aditivo é adicionado intencionalmente (corantes, conservantes, aromatizantes). Contaminante é acidental (resíduos de pesticidas, metais pesados, microplásticos). Ambos precisam de atenção, mas a estratégia de evitação é diferente para cada um.' },
];

export default function ToxinasAlimentares() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const claimReviewSchema = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    "url": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-alimentares",
    "claimReviewed": "Aditivos alimentares industriais como MSG, HFCS e Nitrito de Sódio são seguros para consumo diário",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 2,
      "bestRating": 5,
      "worstRating": 1,
      "alternateName": "Parcialmente falso"
    },
    "itemReviewed": {
      "@type": "CreativeWork",
      "author": { "@type": "Organization", "name": "Indústria Alimentícia" }
    }
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Toxinas Alimentares — Aditivos Ocultos nos Alimentos | Lord Junnior</title>
        <meta name="description" content="Dissecando ingredientes ocultos, ultraprocessados, açúcar disfarçado e pesticidas. Aprenda a ler rótulos e retomar controle sobre o que entra no seu corpo." />
        <meta property="og:title" content="Toxinas Alimentares — O que a indústria alimentar esconde" />
        <meta property="og:description" content="Aditivos, ultraprocessados, agrotóxicos e açúcar oculto. Investigue o que realmente entra na sua dieta." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/toxinas-alimentares.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-alimentares" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(claimReviewSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }} />
      <CinematicHero
        image="/heroes/toxinas-alimentares.webp"
        phase="Vetor 01 · Corpo"
        title="Toxinas Alimentares"
        subtitle="O que a indústria alimentar adiciona silenciosamente à sua dieta. Aditivos, ultraprocessados, açúcar disfarçado e resíduos de pesticidas."
        icon={Apple}
        accentColor="amber"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Chapter 1: O Problema */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A DIETA QUE VOCÊ <span className="text-amber-400">NÃO ESCOLHEU</span>
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl">
              O brasileiro médio consome mais de 500 aditivos alimentares por ano sem saber. A indústria projeta alimentos para vício palatável, não para nutrição.
              Cada ingrediente listado em código alfanumérico (E621, E102, E320) esconde uma substância que seu corpo precisa processar — muitas vezes sem conseguir.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: '500+', label: 'Aditivos alimentares autorizados no Brasil' },
              { value: '70%', label: 'Das calorias do brasileiro vêm de ultraprocessados' },
              { value: '4.7kg', label: 'Média de agrotóxicos por brasileiro/ano' },
              { value: '22', label: 'Nomes diferentes para açúcar nos rótulos' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
              >
                <p className="text-2xl md:text-3xl font-black text-amber-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Chapter 2: Dossiê de Aditivos */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              DOSSIÊ DE <span className="text-amber-400">ADITIVOS CRÍTICOS</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Cada ficha abaixo documenta um aditivo com alto impacto na saúde metabólica.
              Não são todos os aditivos existentes — são os que aparecem com maior frequência na dieta brasileira e possuem evidência científica robusta de risco.
            </p>
          </motion.div>

          <div className="space-y-4">
            {ADITIVOS.map((aditivo, i) => (
              <motion.div key={aditivo.nome} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                      <AlertTriangle size={20} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-base md:text-lg font-bold text-stone-200">{aditivo.nome}</h4>
                      <span className="text-[10px] font-mono font-bold text-amber-400/60 bg-amber-500/10 px-2 py-0.5 rounded">{aditivo.codigo}</span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed mb-3">{aditivo.risco}</p>
                    <div className="flex items-start gap-2">
                      <Search size={12} className="text-amber-400/50 mt-0.5 shrink-0" />
                      <p className="text-stone-600 text-xs leading-relaxed"><strong className="text-stone-500">Onde encontrar:</strong> {aditivo.onde}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Chapter 3: Estratégias */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PROTOCOLO DE <span className="text-amber-400">DESCONTAMINAÇÃO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Ação prática e progressiva. Cada passo reduz uma camada de dependência industrial sem exigir mudanças radicais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESTRATEGIAS.map((est, i) => (
              <motion.div key={est.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                  <CheckCircle size={18} className="text-amber-400/60" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{est.titulo}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{est.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-amber-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={item.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <h4 className="text-sm font-bold text-stone-200 mb-3">{item.q}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-6">Próximo vetor</p>
            <Link to="/soberania-organica/toxicos-ocultos/manipulacao-informacional"
              className="inline-flex items-center gap-3 bg-violet-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-violet-400 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              Manipulação Informacional <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem lê o rótulo, não é refém da prateleira.</p>
      </div>
    </div>
  );
}
