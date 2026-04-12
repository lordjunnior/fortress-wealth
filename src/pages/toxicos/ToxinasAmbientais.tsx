import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Leaf, Droplets, Wind, Home, Beaker, Shield, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
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

const CONTAMINANTES = [
  { icon: Droplets, titulo: 'Plásticos e Microplásticos', desc: 'Presentes em recipientes alimentares, garrafas, embalagens e utensílios de cozinha. Bisfenol A (BPA) e ftalatos são disruptores endócrinos que migram para alimentos quando aquecidos. Microplásticos foram encontrados no sangue humano, placenta e leite materno.', impacto: 'Disrupção hormonal, infertilidade, desenvolvimento anormal em crianças, potencial carcinogênico.', solucao: 'Substituir recipientes plásticos por vidro, aço inox ou cerâmica. Nunca aquecer alimentos em plástico.' },
  { icon: Beaker, titulo: 'Produtos de Limpeza Convencionais', desc: 'Detergentes, desinfetantes e alvejantes contêm compostos orgânicos voláteis (COVs), formaldeído e cloro que se acumulam no ar interno. A exposição crônica está associada a problemas respiratórios, dermatites e sensibilização alérgica.', impacto: 'Irritação respiratória, asma ocupacional, dermatite de contato, disrupção endócrina.', solucao: 'Usar vinagre branco, bicarbonato de sódio e sabão de coco como base. Evitar aerossóis e fragrâncias sintéticas.' },
  { icon: Wind, titulo: 'Qualidade do Ar Interno', desc: 'O ar dentro de casa pode ser 2 a 5 vezes mais poluído que o ar externo. Tintas, vernizes, móveis de MDF, carpetes e purificadores de ar liberam COVs continuamente. A falta de ventilação adequada concentra esses compostos a níveis críticos.', impacto: 'Síndrome do edifício doente, fadiga crônica, dores de cabeça, irritação de mucosas.', solucao: 'Ventilação cruzada diária de 15 minutos. Plantas purificadoras (espada-de-são-jorge, jiboia). Evitar ambientadores sintéticos.' },
  { icon: Home, titulo: 'Materiais de Construção e Mobiliário', desc: 'MDF, compensados e aglomerados liberam formaldeído por anos após a instalação. Tintas e vernizes convencionais emitem COVs durante meses. Tapetes e cortinas acumulam retardantes de chama bromados (PBDEs) que são neurotóxicos.', impacto: 'Carcinogênico (formaldeído é Grupo 1 pela IARC), neurotoxicidade, disrupção tireoidiana.', solucao: 'Optar por madeira maciça ou MDF E1 (baixa emissão). Usar tintas à base de água. Lavar tecidos novos antes do uso.' },
  { icon: AlertTriangle, titulo: 'Cosméticos e Higiene Pessoal', desc: 'Parabenos, triclosan, alumínio, sulfatos e fragrâncias sintéticas estão presentes em desodorantes, shampoos, cremes e protetores solares. A pele absorve até 60% do que é aplicado sobre ela, e esses compostos se acumulam em tecidos adiposos ao longo de décadas.', impacto: 'Disrupção endócrina, bioacumulação, sensibilização alérgica, potencial carcinogênico.', solucao: 'Ler rótulos de cosméticos como lê rótulos de alimentos. Priorizar marcas com INCI transparente e poucos ingredientes.' },
];

const ACOES_IMEDIATAS = [
  'Substitua recipientes plásticos por vidro na cozinha',
  'Ventile a casa por 15 minutos todas as manhãs',
  'Troque produtos de limpeza sintéticos por vinagre e bicarbonato',
  'Lave roupas novas antes do primeiro uso',
  'Elimine ambientadores e velas perfumadas sintéticas',
  'Filtre a água da torneira (cloro residual + metais pesados)',
  'Escolha cosméticos com até 5 ingredientes reconhecíveis',
  'Instale pelo menos 1 planta purificadora por cômodo',
];

const FAQ_ITEMS = [
  { q: 'Poluição indoor é realmente pior que a externa?', a: 'Sim, segundo a EPA (Agência de Proteção Ambiental dos EUA), os níveis de poluentes internos são tipicamente 2 a 5 vezes maiores que os externos, podendo chegar a 100 vezes em alguns casos. Considerando que passamos cerca de 90% do tempo em ambientes fechados, a exposição cumulativa é significativa.' },
  { q: 'Plantas realmente purificam o ar?', a: 'O estudo da NASA de 1989 (Clean Air Study) demonstrou que certas plantas podem remover COVs do ar. Porém, seriam necessárias muitas plantas para ter impacto mensurável em um cômodo. As plantas ajudam marginalmente, mas a ventilação mecânica ou natural é muito mais eficaz. Use plantas como complemento, não como solução única.' },
  { q: 'Vale a pena comprar purificador de ar?', a: 'Para pessoas com asma, alergias ou moradores de áreas com poluição externa elevada, sim. Purificadores com filtro HEPA H13 removem 99.97% das partículas acima de 0.3 mícron. Para COVs, filtros de carvão ativado ajudam. Mas nenhum purificador substitui ventilação adequada e controle de fontes emissoras.' },
];

export default function ToxinasAmbientais() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question", "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const claimReviewSchema = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    "url": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-ambientais",
    "claimReviewed": "O ar dentro de casa é mais limpo que o ar externo por estar protegido da poluição urbana",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 1,
      "bestRating": 5,
      "worstRating": 1,
      "alternateName": "Falso"
    },
    "itemReviewed": {
      "@type": "CreativeWork",
      "author": { "@type": "Organization", "name": "Senso Comum" }
    }
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-green-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Toxinas Ambientais — Contaminantes Domésticos e Poluição Indoor | Lord Junnior</title>
        <meta name="description" content="Plásticos, produtos de limpeza, qualidade do ar interno e cosméticos. Identifique contaminantes domésticos que atravessam pele e pulmões diariamente." />
        <meta property="og:title" content="Toxinas Ambientais — O que contamina seu espaço sem você ver" />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/toxinas-ambientais.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-ambientais" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(claimReviewSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #22c55e, #10b981)' }} />
      <CinematicHero
        image="/heroes/toxinas-ambientais.webp"
        phase="Vetor 04 · Ambiente"
        title="Toxinas Ambientais"
        subtitle="Contaminantes domésticos, materiais sintéticos, qualidade do ar interno e produtos químicos que atravessam a pele e os pulmões diariamente."
        icon={Leaf}
        accentColor="green"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Chapter 1: Contaminantes */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MAPA DE <span className="text-green-400">CONTAMINANTES</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Cinco categorias de contaminantes que estão dentro da sua casa agora. Cada ficha documenta a fonte, o impacto e a solução prática.
            </p>
          </motion.div>

          <div className="space-y-4">
            {CONTAMINANTES.map((cont, i) => (
              <motion.div key={cont.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-green-500 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center">
                      <cont.icon size={20} className="text-green-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-stone-200 mb-3">{cont.titulo}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{cont.desc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border-l-2 border-red-500/30 pl-4">
                        <p className="text-[10px] text-red-400/60 font-bold uppercase tracking-wider mb-1">Impacto</p>
                        <p className="text-stone-500 text-xs leading-relaxed">{cont.impacto}</p>
                      </div>
                      <div className="border-l-2 border-green-500/30 pl-4">
                        <p className="text-[10px] text-green-400/60 font-bold uppercase tracking-wider mb-1">Solução</p>
                        <p className="text-stone-500 text-xs leading-relaxed">{cont.solucao}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      </div>

      {/* Chapter 2: Ações Imediatas */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-green-500 rounded-full" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8 AÇÕES <span className="text-green-400">IMEDIATAS</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Mudanças simples que reduzem exposição a contaminantes domésticos. Cada uma pode ser implementada hoje, sem custo significativo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACOES_IMEDIATAS.map((acao, i) => (
              <motion.div key={acao} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <CheckCircle size={16} className="text-green-400/60 mt-0.5 shrink-0" />
                <p className="text-stone-300 text-sm">{acao}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      </div>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-green-400">FREQUENTES</span>
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
      <section className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro vetores. <span className="text-red-400">Uma missão.</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mx-auto mb-10">
              Corpo, mente, comportamento e ambiente. Cada módulo investigou um vetor diferente de influência invisível.
              O próximo passo é continuar construindo autonomia real dentro do Soberania Orgânica.
            </p>
            <Link to="/soberania-organica/toxicos-ocultos"
              className="inline-flex items-center gap-3 bg-red-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-red-400 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao Laboratório
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Proteger o território começa por dentro.</p>
      </div>
    </div>
  );
}
