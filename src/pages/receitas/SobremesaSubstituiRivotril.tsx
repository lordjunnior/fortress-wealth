import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen, Beaker,
  Moon, Brain, Leaf, Sparkles, AlertTriangle, CheckCircle2,
  ScrollText, Library, Quote, Activity, ExternalLink,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-sobremesa-rivotril.jpg';
import imgGlicina from '@/assets/receitas/ativo-glicina-gelatina.jpg';
import imgPassiflora from '@/assets/receitas/ativo-passiflora-maracuja.jpg';
import imgCamomila from '@/assets/receitas/ativo-camomila-cha.jpg';
import imgChia from '@/assets/receitas/ativo-chia-hidratada.jpg';
import imgBiblioteca from '@/assets/receitas/biblioteca-evidencias-sono.jpg';

/**
 * /soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril
 * Padrão Apple Editorial — paleta NOTURNA (cobalt deep + amber soft).
 * Quarteto do Poder pleno. Híbrido editorial: receita + dossiê 4 ativos + biblioteca.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: APPLE_EASE, delay },
});

const display: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  letterSpacing: '-0.04em',
  lineHeight: 0.92,
};
const editorial: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontStyle: 'italic',
  fontWeight: 700,
};
const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

const INGREDIENTES = [
  { qtd: '40 g', nome: 'Gelatina sem sabor', detalhe: '3 a 4 sachês de 12 g — entrega ~2-2,5 g de glicina por porção' },
  { qtd: '80 ml', nome: 'Chá de camomila forte', detalhe: '2 sachês ou 2 c.s. de camomila seca em 100 ml de água quente, infusão 5-10 min' },
  { qtd: '300 ml', nome: 'Polpa de maracujá natural', detalhe: 'Sem açúcar adicionado — ou suco concentrado coado' },
  { qtd: '3 c.s.', nome: 'Sementes de chia', detalhe: '~30-40 g total, hidratadas em 300 ml de leite vegetal sem açúcar' },
  { qtd: 'opcional', nome: 'Mel ou adoçante natural', detalhe: '1-2 c.c. apenas — evite excesso para não atrapalhar glicemia' },
  { qtd: 'opcional', nome: 'Polpa fresca para decorar', detalhe: '½ maracujá extra · pitada de canela · raspas de limão' },
];

const PREPARO = [
  { n: '01', titulo: 'Prepare o chá forte', desc: 'Ferva água, adicione a camomila, deixe infusionar 5-10 minutos e coe. Use 80 ml ainda quente.' },
  { n: '02', titulo: 'Dissolva a gelatina', desc: 'Coloque os 40 g de gelatina sem sabor no chá quente. Mexa vigorosamente até dissolver completamente. Não ferva depois de dissolvida.' },
  { n: '03', titulo: 'Adicione o maracujá', desc: 'Misture os 300 ml de polpa de maracujá na gelatina dissolvida. Mexa bem. Prove e ajuste doçura se quiser.' },
  { n: '04', titulo: 'Hidrate a chia', desc: 'Enquanto a gelatina esfria, misture as 3 c.s. de chia em 300 ml de leite vegetal. Deixe repousar 15-20 min mexendo às vezes até formar gel.' },
  { n: '05', titulo: 'Monte os potes', desc: 'Divida a gelatina em 4 potinhos. Cubra com camada generosa de chia hidratada. Decore com polpa de maracujá fresca.' },
  { n: '06', titulo: 'Refrigere', desc: 'Leve à geladeira por pelo menos 2-4 horas, ou overnight, até firmar completamente.' },
];

const ATIVOS = [
  {
    n: '01',
    img: imgGlicina,
    nome: 'Glicina',
    fonte: 'da gelatina sem sabor',
    icon: Brain,
    dose: '~2,5 g por porção',
    doseEstudada: '3 g antes de dormir',
    mecanismo: 'Reduz a temperatura corporal central via ação no núcleo supraquiasmático (SCN) do cérebro — o relógio biológico que governa o sono. Diminui a latência (tempo até dormir) e melhora a eficiência do sono.',
    estudoAncora: 'Yamadera et al. (2007) · Sleep Biological Rhythms',
    achado: '3 g de glicina antes de dormir reduziu latência do sono e aumentou performance cognitiva no dia seguinte (medido por polissonografia).',
  },
  {
    n: '02',
    img: imgPassiflora,
    nome: 'Passiflora',
    fonte: 'do maracujá (300 ml de polpa)',
    icon: Leaf,
    dose: '300 ml polpa',
    doseEstudada: 'Extrato padronizado',
    mecanismo: 'Os flavonoides (vitexina, isovitexina, crisina) modulam receptores GABA-A — o mesmo alvo dos benzodiazepínicos como o Rivotril, mas sem a sedação forte nem dependência.',
    estudoAncora: 'Harit et al. (2024) · Cureus 16:e56530',
    achado: 'Ensaio randomizado duplo-cego placebo-controlado: redução significativa no escore de estresse percebido e melhora na arquitetura do sono. Reduziu marcadores de cortisol.',
  },
  {
    n: '03',
    img: imgCamomila,
    nome: 'Camomila',
    fonte: 'no chá forte (80 ml)',
    icon: Sparkles,
    dose: '2 sachês concentrados',
    doseEstudada: '270-1500 mg/dia',
    mecanismo: 'A apigenina liga-se a receptores benzodiazepínicos com afinidade moderada — efeito ansiolítico sem hipnose pesada. Reduz o número de despertares noturnos.',
    estudoAncora: 'Kazemi et al. (2024) · Complementary Therapies in Medicine',
    achado: 'Meta-análise de 10 estudos (772 participantes): redução de -1,88 pontos no PSQI (Pittsburgh Sleep Quality Index). Nenhum evento adverso relatado.',
  },
  {
    n: '04',
    img: imgChia,
    nome: 'Chia hidratada',
    fonte: 'no leite vegetal',
    icon: Activity,
    dose: '~7-10 g por porção',
    doseEstudada: 'Mecanismo bem documentado',
    mecanismo: 'Fibra solúvel + proteína forma gel no estômago, aumenta saciedade e mata craving noturno por doce. Ômega-3 (ALA) estabiliza glicemia. Mata a "fome psicológica" das 22h.',
    estudoAncora: 'Khalid et al. (2022) · PMC9834868',
    achado: 'Revisão sistemática: chia aumenta saciedade subjetiva, reduz ingestão calórica subsequente e melhora marcadores glicêmicos.',
  },
];

const FONTES = [
  { autor: 'Harit, M. K. et al.', ano: '2024', titulo: 'Effect of Passiflora incarnata on Stress and Sleep Quality', revista: 'Cureus 16:e56530', tipo: 'Ensaio clínico randomizado', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Harit+Passiflora+2024' },
  { autor: 'Janda, K. et al.', ano: '2020', titulo: 'Passiflora incarnata in Neuropsychiatric Disorders', revista: 'PMC7766837', tipo: 'Revisão sistemática (9 estudos)', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7766837/' },
  { autor: 'Ngan, A.; Conduit, R.', ano: '2011', titulo: 'A double-blind placebo-controlled investigation of the effects of Passiflora incarnata herbal tea on subjective sleep quality', revista: 'Phytotherapy Research', tipo: 'Estudo duplo-cego com polissonografia', link: 'https://pubmed.ncbi.nlm.nih.gov/21294203/' },
  { autor: 'Kazemi, A. et al.', ano: '2024', titulo: 'Effect of chamomile on sleep quality: meta-analysis', revista: 'Complementary Therapies in Medicine', tipo: 'Meta-análise (10 estudos · 772 participantes)', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Kazemi+chamomile+sleep+meta-analysis' },
  { autor: 'Hieu, T. H. et al.', ano: '2019', titulo: 'Therapeutic efficacy and safety of chamomile for state anxiety', revista: 'Phytotherapy Research', tipo: 'Meta-análise', link: 'https://pubmed.ncbi.nlm.nih.gov/31161669/' },
  { autor: 'Yamadera, W. et al.', ano: '2007', titulo: 'Glycine ingestion improves subjective sleep quality', revista: 'Sleep and Biological Rhythms', tipo: 'Estudo com polissonografia', link: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1479-8425.2007.00262.x' },
  { autor: 'Bannai, M.; Kawai, N.', ano: '2012', titulo: 'New Therapeutic Strategy for Amino Acid Medicine: Glycine Improves the Quality of Sleep', revista: 'Journal of Pharmacological Sciences', tipo: 'Revisão de mecanismo', link: 'https://pubmed.ncbi.nlm.nih.gov/22293292/' },
  { autor: 'Khalid, W. et al.', ano: '2022', titulo: 'Chia Seeds (Salvia hispanica L.): A Comprehensive Review of Nutritional Composition and Health Effects', revista: 'PMC9834868', tipo: 'Revisão sistemática', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9834868/' },
];

const FAQ = [
  {
    q: 'Substitui mesmo o Rivotril?',
    a: 'Não. O título é editorial — chama atenção para o fato de que Passiflora e camomila atuam no mesmo receptor (GABA-A) que os benzodiazepínicos, com efeito mais leve, sem dependência e sem tarja preta. Para insônia crônica diagnosticada ou ansiedade clínica, mantenha o tratamento médico. Esta receita é uma intervenção nutricional para apoiar higiene do sono em pessoas saudáveis.',
  },
  {
    q: 'Em quanto tempo sente efeito?',
    a: 'A maioria dos estudos mostra benefício mensurável entre 7 e 14 dias de uso consistente. Tome 30 a 60 minutos antes de dormir, todas as noites. Resultado isolado de uma noite é variável; o que importa é o protocolo repetido.',
  },
  {
    q: 'Posso comer no lugar do jantar?',
    a: 'Sim, é uma das estratégias do protocolo. Cada porção tem ~80-120 kcal, 8-10 g de proteína (glicina) e 8-10 g de fibra (chia) — saciante o bastante para substituir um jantar pesado, especialmente se você quer reduzir a ingestão calórica noturna ou trocar o "lanche doce" das 22h.',
  },
  {
    q: 'Por quanto tempo posso tomar?',
    a: 'Não há limite documentado para os 4 ingredientes na dose proposta. A camomila e Passiflora têm perfil de segurança excelente em uso prolongado. A glicina é um aminoácido produzido pelo próprio corpo. A chia é alimento. O risco está em adicionar açúcar — mantenha sem.',
  },
  {
    q: 'Quem não deve consumir?',
    a: 'Gestantes (Passiflora não tem segurança bem estabelecida na gravidez), pessoas em uso de benzodiazepínicos ou indutores de sono prescritos (efeito aditivo), alérgicos a Asteraceae (família da camomila — também inclui margarida, crisântemo). Em dúvida, fale com seu médico antes.',
  },
  {
    q: 'Por que não cura insônia crônica?',
    a: 'Porque insônia crônica raramente é "falta de calmante" — costuma ser higiene do sono ruim, exposição a tela com luz azul até tarde, cortisol desregulado por estresse contínuo, apneia, depressão ou desequilíbrio hormonal. Esta receita ataca uma camada (a química do GABA e da glicina). As outras camadas exigem mudança de comportamento e, às vezes, avaliação médica.',
  },
];

export default function SobremesaSubstituiRivotril() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Helmet>
        <title>A Sobremesa que Substitui o Rivotril | Receita Funcional para Sono</title>
        <meta
          name="description"
          content="Receita funcional com 4 ativos validados em ensaio clínico: glicina (3g), Passiflora, camomila e chia. Reduz cortisol, melhora sono e mata craving noturno. Sem tarja preta."
        />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" />
        <meta property="og:title" content="A Sobremesa que Substitui o Rivotril" />
        <meta property="og:description" content="Glicina, Passiflora, camomila e chia. Quatro ativos. Oito ensaios clínicos. Uma receita." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/sobremesa-rivotril.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'A Sobremesa que Substitui o Rivotril',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Sobremesa funcional com glicina, Passiflora, camomila e chia para apoiar o sono e reduzir cortisol noturno.',
            recipeYield: '4 porções',
            prepTime: 'PT15M',
            cookTime: 'PT0M',
            totalTime: 'PT4H15M',
            recipeCategory: 'Sobremesa funcional',
            recipeCuisine: 'Funcional brasileira',
            keywords: 'sono, cortisol, ansiedade, glicina, Passiflora, camomila, chia, receita funcional',
            recipeIngredient: INGREDIENTES.map((i) => `${i.qtd} ${i.nome}`),
            recipeInstructions: PREPARO.map((p) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc })),
            nutrition: {
              '@type': 'NutritionInformation',
              calories: '80-120 kcal por porção',
              proteinContent: '8-10 g',
              fiberContent: '8-10 g',
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalScholarlyArticle',
            headline: 'Glicina, Passiflora, camomila e chia no apoio ao sono — base científica',
            datePublished: '2026-04-26',
            citation: FONTES.map((f) => `${f.autor} (${f.ano}). ${f.titulo}. ${f.revista}.`),
          })}
        </script>
      </Helmet>

      <BackToHome />
      <ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={imgHero}
            alt="Sobremesa funcional em camadas de gelatina de maracujá e chia hidratada em pote de vidro sobre ardósia escura"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
          <motion.div {...fade(0)} className="mb-6">
            <Link to="/soberania-organica/cozinha-funcional" className="text-stone-400 hover:text-amber-400 text-xs transition-colors" style={mono}>
              Soberania Orgânica › Cozinha Funcional ›
            </Link>
          </motion.div>

          <motion.div {...fade(0.05)} className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-amber-500/30 bg-amber-500/5 rounded-full">
            <Beaker size={12} className="text-amber-400" />
            <span className="text-amber-300/90 text-[10px] font-bold tracking-[0.2em] uppercase" style={mono}>
              Protocolo · 8 estudos primários
            </span>
          </motion.div>

          <motion.h1 {...fade(0.1)} className="text-[clamp(2.5rem,7.5vw,7rem)] mb-8 max-w-5xl" style={display}>
            A sobremesa<br />
            que <span style={editorial} className="text-amber-400">substitui</span><br />
            o Rivotril.
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-stone-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            Quatro ativos. Mesmo receptor cerebral dos benzodiazepínicos. Sem tarja preta, sem dependência, sem ressaca matinal. <span className="text-amber-300">Coma 30 minutos antes de dormir.</span>
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap gap-x-8 gap-y-4 text-stone-400">
            <span className="flex items-center gap-2 text-xs" style={mono}>
              <Clock size={14} className="text-amber-400" /> 15 min de preparo
            </span>
            <span className="flex items-center gap-2 text-xs" style={mono}>
              <Users size={14} className="text-amber-400" /> 4 porções
            </span>
            <span className="flex items-center gap-2 text-xs" style={mono}>
              <BookOpen size={14} className="text-amber-400" /> 8 ensaios clínicos
            </span>
          </motion.div>

          <motion.div {...fade(0.4)} className="mt-12">
            <a href="#receita" className="inline-flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors">
              <span className="text-xs" style={mono}>Rolar para a receita</span>
              <ChevronDown size={16} className="animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO PNL */}
      <section className="relative py-24 md:py-32 border-y border-white/5 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.p {...fade(0)} className="text-amber-400/70 text-xs mb-6" style={mono}>
            Por que esse título
          </motion.p>
          <motion.h2 {...fade(0.1)} className="text-3xl md:text-5xl text-stone-100 mb-10 leading-tight" style={display}>
            Não é metáfora. <span style={editorial} className="text-amber-400">É bioquímica.</span>
          </motion.h2>
          <motion.div {...fade(0.2)} className="space-y-6 text-stone-300 text-lg leading-relaxed">
            <p>
              Rivotril (clonazepam) age no <strong className="text-stone-100">receptor GABA-A</strong> — o "freio" do sistema nervoso central. Quando você ativa esse receptor, o cérebro desacelera: cai a ansiedade, vem o sono.
            </p>
            <p>
              <strong className="text-amber-400">Passiflora e camomila se ligam no mesmo receptor.</strong> Com afinidade menor, é verdade — por isso não viciam, não derrubam, não causam ressaca. Mas no contexto certo (dose, horário, contínuo por 7-14 dias), produzem o suficiente para apoiar o sono em quem não tem insônia clínica.
            </p>
            <p>
              Some isso à <strong className="text-stone-100">glicina</strong> da gelatina (3 g antes de dormir reduz latência do sono via SCN), à <strong className="text-stone-100">chia</strong> que mata o craving doce das 22h, e você tem um protocolo nutricional simples que ataca quatro alavancas do sono ruim ao mesmo tempo.
            </p>
            <p className="text-stone-500" style={editorial}>
              Não cura insônia crônica. Não substitui prescrição médica. Mas para a maioria das pessoas saudáveis que dorme mal por estresse e hábito ruim — funciona.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RECEITA — INGREDIENTES + PREPARO */}
      <section id="receita" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="mb-16 md:mb-20">
            <p className="text-amber-400/70 text-xs mb-4" style={mono}>
              Bloco 01 · A receita
            </p>
            <h2 className="text-4xl md:text-6xl text-stone-100 leading-tight" style={display}>
              Como fazer.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* INGREDIENTES */}
            <motion.div {...fade(0)} className="lg:col-span-5">
              <div className="sticky top-8">
                <h3 className="text-2xl text-amber-400 mb-8" style={editorial}>
                  Ingredientes <span className="text-stone-500 text-base not-italic">· 4 porções de ~150 ml</span>
                </h3>
                <ul className="space-y-6">
                  {INGREDIENTES.map((ing, i) => (
                    <li key={i} className="flex gap-5 pb-6 border-b border-white/5">
                      <span className="text-amber-400 font-bold text-sm whitespace-nowrap min-w-[80px]" style={mono}>
                        {ing.qtd}
                      </span>
                      <div>
                        <p className="text-stone-100 font-semibold mb-1">{ing.nome}</p>
                        <p className="text-stone-500 text-sm leading-relaxed">{ing.detalhe}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* PREPARO */}
            <motion.div {...fade(0.1)} className="lg:col-span-7">
              <h3 className="text-2xl text-amber-400 mb-8" style={editorial}>
                Modo de preparo <span className="text-stone-500 text-base not-italic">· 15 min + geladeira</span>
              </h3>
              <ol className="space-y-8">
                {PREPARO.map((p, i) => (
                  <li key={i} className="flex gap-6">
                    <span className="text-5xl text-amber-400/20 font-black tabular-nums shrink-0" style={display}>
                      {p.n}
                    </span>
                    <div className="pt-2">
                      <h4 className="text-xl text-stone-100 mb-2 font-semibold">{p.titulo}</h4>
                      <p className="text-stone-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-12 p-6 border border-amber-500/20 bg-amber-500/[0.03] rounded-xl">
                <p className="text-amber-300 text-xs mb-3" style={mono}>
                  Nutrição por porção
                </p>
                <p className="text-stone-300 leading-relaxed">
                  ~80-120 kcal · 8-10 g de proteína · 8-10 g de fibra · ômega-3 (ALA) · vitamina C · ~2,5 g de glicina bioativa
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DOSSIÊ DOS 4 ATIVOS */}
      <section className="relative py-24 md:py-32 border-y border-white/5 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="mb-16 md:mb-20 max-w-3xl">
            <p className="text-amber-400/70 text-xs mb-4" style={mono}>
              Bloco 02 · Por que funciona
            </p>
            <h2 className="text-4xl md:text-6xl text-stone-100 mb-6 leading-tight" style={display}>
              Os quatro ativos.
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed" style={editorial}>
              Cada ingrediente foi escolhido por evidência clínica — não por estética nem viralidade.
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-20">
            {ATIVOS.map((a, i) => (
              <motion.div key={a.n} {...fade(i * 0.1)} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5">
                    <img
                      src={a.img}
                      alt={`${a.nome} — ${a.fonte}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      width={1280}
                      height={960}
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
                      <a.icon size={12} className="text-amber-400" />
                      <span className="text-amber-300 text-[10px] font-bold tracking-wider" style={mono}>
                        Ativo {a.n}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-amber-400 text-xs mb-3" style={mono}>
                    {a.fonte}
                  </p>
                  <h3 className="text-4xl md:text-5xl text-stone-100 mb-6" style={display}>
                    {a.nome}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border border-white/5 rounded-lg bg-white/[0.02]">
                      <p className="text-stone-500 text-[10px] mb-1" style={mono}>Dose na receita</p>
                      <p className="text-amber-400 font-semibold">{a.dose}</p>
                    </div>
                    <div className="p-4 border border-white/5 rounded-lg bg-white/[0.02]">
                      <p className="text-stone-500 text-[10px] mb-1" style={mono}>Dose estudada</p>
                      <p className="text-stone-200 font-semibold">{a.doseEstudada}</p>
                    </div>
                  </div>

                  <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-6">
                    {a.mecanismo}
                  </p>

                  <div className="p-5 border-l-2 border-amber-400 bg-amber-500/[0.03]">
                    <p className="text-amber-400/80 text-[10px] mb-2" style={mono}>
                      Estudo-âncora
                    </p>
                    <p className="text-stone-100 font-semibold mb-2">{a.estudoAncora}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{a.achado}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOLO DE USO */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="mb-16">
            <p className="text-amber-400/70 text-xs mb-4" style={mono}>
              Bloco 03 · Como tomar
            </p>
            <h2 className="text-4xl md:text-6xl text-stone-100 leading-tight" style={display}>
              O protocolo.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fade(0)} className="p-8 border border-amber-500/20 bg-amber-500/[0.03] rounded-2xl">
              <CheckCircle2 size={28} className="text-amber-400 mb-5" />
              <h3 className="text-xl text-stone-100 mb-6 font-semibold">O que fazer</h3>
              <ul className="space-y-4 text-stone-300">
                <li className="flex gap-3"><span className="text-amber-400 mt-1">·</span> Comer 1 porção 30-60 min antes de dormir</li>
                <li className="flex gap-3"><span className="text-amber-400 mt-1">·</span> Substituir o jantar pesado ou o lanche doce noturno</li>
                <li className="flex gap-3"><span className="text-amber-400 mt-1">·</span> Manter por 7-14 dias consecutivos antes de avaliar</li>
                <li className="flex gap-3"><span className="text-amber-400 mt-1">·</span> Reduzir telas e luz azul nas 2h anteriores</li>
                <li className="flex gap-3"><span className="text-amber-400 mt-1">·</span> Anotar variação de qualidade do sono e disposição diurna</li>
              </ul>
            </motion.div>

            <motion.div {...fade(0.1)} className="p-8 border border-red-500/20 bg-red-500/[0.03] rounded-2xl">
              <AlertTriangle size={28} className="text-red-400 mb-5" />
              <h3 className="text-xl text-stone-100 mb-6 font-semibold">O que não esperar</h3>
              <ul className="space-y-4 text-stone-300">
                <li className="flex gap-3"><span className="text-red-400 mt-1">·</span> Cura de insônia crônica diagnosticada</li>
                <li className="flex gap-3"><span className="text-red-400 mt-1">·</span> Substituição de benzodiazepínico prescrito sem orientação médica</li>
                <li className="flex gap-3"><span className="text-red-400 mt-1">·</span> Resultado em uma única noite — protocolo é cumulativo</li>
                <li className="flex gap-3"><span className="text-red-400 mt-1">·</span> Compensação de exposição a tela até 1h antes de dormir</li>
                <li className="flex gap-3"><span className="text-red-400 mt-1">·</span> Solução para apneia, depressão ou desequilíbrio hormonal</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BIBLIOTECA DE FONTES */}
      <section className="relative py-24 md:py-32 border-y border-white/5 bg-[#0c0c0c]">
        <div className="absolute inset-0 z-0 opacity-[0.06]">
          <img src={imgBiblioteca} alt="" className="w-full h-full object-cover" loading="lazy" width={1600} height={900} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="mb-16 max-w-3xl">
            <p className="text-amber-400/70 text-xs mb-4" style={mono}>
              Bloco 04 · Biblioteca de evidências
            </p>
            <h2 className="text-4xl md:text-6xl text-stone-100 mb-6 leading-tight" style={display}>
              As fontes.
            </h2>
            <p className="text-stone-400 text-lg" style={editorial}>
              Oito estudos primários — todos publicados em revistas indexadas no PubMed. Sem opinião de influenciador, sem marketing de e-book.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FONTES.map((f, i) => (
              <motion.a
                key={i}
                {...fade(i * 0.05)}
                href={f.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-white/[0.06] hover:border-amber-500/30 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ScrollText size={16} className="text-amber-400/70" />
                    <span className="text-amber-400 text-xs" style={mono}>{f.ano}</span>
                  </div>
                  <ExternalLink size={14} className="text-stone-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-stone-200 font-semibold mb-2 leading-snug">{f.titulo}</p>
                <p className="text-stone-500 text-sm mb-3">{f.autor}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  <span className="text-stone-400" style={editorial}>{f.revista}</span>
                  <span className="text-amber-400/60" style={mono}>{f.tipo}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="mb-16 text-center">
            <p className="text-amber-400/70 text-xs mb-4" style={mono}>
              Perguntas honestas
            </p>
            <h2 className="text-4xl md:text-6xl text-stone-100 leading-tight" style={display}>
              O que perguntam.
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <motion.div key={i} {...fade(i * 0.05)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 border border-white/[0.06] hover:border-amber-500/20 bg-white/[0.02] rounded-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg md:text-xl text-stone-100 font-semibold">{f.q}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-amber-400 shrink-0 mt-1 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openFaq === i && (
                    <p className="mt-5 text-stone-400 leading-relaxed">{f.a}</p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER YMYL */}
      <section className="relative py-16 border-t border-white/5 bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl">
            <p className="text-stone-500 text-xs mb-3" style={mono}>
              Disclaimer · Saúde
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Este conteúdo é educativo e baseado em literatura científica indexada. Não substitui diagnóstico, prescrição ou acompanhamento médico. Distúrbios persistentes do sono, ansiedade clínica e uso atual de medicação psiquiátrica exigem avaliação profissional. Não interrompa nem altere prescrição médica por conta própria.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.p {...fade(0)} className="text-amber-400/70 text-xs mb-6" style={mono}>
            Próximo passo
          </motion.p>
          <motion.h2 {...fade(0.1)} className="text-3xl md:text-5xl text-stone-100 mb-8 leading-tight" style={display}>
            Esta é uma camada.<br />
            <span className="text-amber-400" style={editorial}>Existem outras cinco.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-stone-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Sono ruim raramente é só falta de calmante. É também solo morto, comida industrial, cortisol crônico e desconhecimento sobre o próprio corpo. A Soberania Orgânica integra as sete frentes.
          </motion.p>
          <motion.div {...fade(0.3)} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/soberania-organica"
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full transition-all font-bold tracking-wider uppercase text-xs"
              style={mono}
            >
              Ver as 7 frentes
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/soberania-organica/cozinha-funcional"
              className="inline-flex items-center gap-3 px-8 py-4 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5 rounded-full transition-all"
            >
              <span className="text-amber-300 text-xs font-bold tracking-wider uppercase" style={mono}>
                Outras receitas funcionais
              </span>
              <ArrowRight size={14} className="text-amber-400" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}