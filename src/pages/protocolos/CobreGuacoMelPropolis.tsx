import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Wind,
  Shield,
  Beaker,
  FlaskConical,
  AlertTriangle,
  Clock,
  Leaf,
  BookOpen,
  Eye,
  History,
  Droplets,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import heroCobre from '@/assets/cobre-protocolo/cobre-hero.jpg';
import imgPropolisTipos from '@/assets/cobre-protocolo/propolis-tipos.jpg';
import imgGuacoMel from '@/assets/cobre-protocolo/guaco-mel.jpg';
import imgCobreHistoria from '@/assets/cobre-protocolo/cobre-historia.jpg';

const SLUG = 'cobre-guaco-mel-propolis-beneficios';
const CANONICAL = `https://lordjunnior.com.br/soberania-organica/${SLUG}`;
const META_TITLE =
  'O Cobre Tem 2 Poderes Que Quase Ninguém Conhece: O Protocolo Natural que Fortalece Pulmões e Imunidade';
const META_DESCRIPTION =
  'Descubra como o cobre, o guaco, o mel cru e o própolis atuam juntos para fortalecer o sistema respiratório e imunológico. Guia técnico completo com aplicação prática, tipos de própolis e cuidados essenciais.';

const FAQ = [
  {
    question: 'O cobre realmente ajuda na imunidade?',
    answer:
      'Sim. O cobre é cofator de enzimas como superóxido dismutase Cu/Zn e ceruloplasmina, que participam diretamente da resposta antioxidante e da maturação de células de defesa. O ponto crítico é o equilíbrio com zinco e ferro, não a dose isolada.',
  },
  {
    question: 'Guaco pode ser usado todos os dias?',
    answer:
      'Em ciclos. O ideal é usar por 7 a 14 dias e fazer pausa de 7 dias. Uso contínuo prolongado pode irritar mucosa gástrica em pessoas sensíveis e, em altas doses, a cumarina interfere na coagulação.',
  },
  {
    question: 'Mel pode substituir açúcar?',
    answer:
      'Funcionalmente, sim. Biologicamente, depende da origem. Mel cru não filtrado mantém enzimas, peróxido de hidrogênio enzimático e compostos fenólicos. Mel industrial pasteurizado vira basicamente xarope de glicose e frutose.',
  },
  {
    question: 'Própolis sem álcool funciona?',
    answer:
      'Funciona, com menor potência relativa. A extração hidroalcoólica solubiliza melhor flavonoides e ácidos fenólicos. As versões aquosas e glicólicas servem para crianças, gestantes e quem não tolera álcool, mas tendem a exigir doses maiores.',
  },
  {
    question: 'Como saber se o própolis é de qualidade real?',
    answer:
      'Cor intensa (verde, marrom ou vermelho profundo), sabor forte e amargo persistente, sedimentação natural após repouso, percentual de extrato seco declarado no rótulo (acima de 11% é referência boa) e procedência apícola identificável.',
  },
  {
    question: 'Posso beber água em recipiente de cobre?',
    answer:
      'Sim, com critério. Use cobre puro alimentar (sem revestimento interno), deixe a água no máximo 8 a 12 horas, evite líquidos ácidos como suco de limão dentro do vaso, e faça pausas no uso para não sobrecarregar a homeostase do mineral.',
  },
  {
    question: 'Qual o erro mais comum nesse protocolo?',
    answer:
      'Comprar versões diluídas pelo preço, misturar tudo sem janela de uso e esperar resultado em 48 horas. Protocolo natural exige consistência, qualidade e respeito ao ritmo biológico de cada composto.',
  },
];

export default function CobreGuacoMelPropolis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta
          name="keywords"
          content="benefícios do cobre imunidade, guaco para pulmão, própolis tipos, mel cru benefícios, fortalecer imunidade naturalmente, protocolo respiratório natural, cobre antimicrobiano, própolis com álcool sem álcool"
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://lordjunnior.com.br/src/assets/cobre-protocolo/cobre-hero.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: META_TITLE,
          description: META_DESCRIPTION,
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          mainEntityOfPage: CANONICAL,
          about: [
            { '@type': 'Thing', name: 'Cobre (Cu)' },
            { '@type': 'Thing', name: 'Guaco (Mikania glomerata)' },
            { '@type': 'Thing', name: 'Mel cru' },
            { '@type': 'Thing', name: 'Própolis verde brasileira' },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Soberania Orgânica',
              item: 'https://lordjunnior.com.br/soberania-organica',
            },
            { '@type': 'ListItem', position: 3, name: 'Protocolo Cobre + Guaco + Mel + Própolis', item: CANONICAL },
          ],
        })}</script>
      </Helmet>

      <ScrollToTop />
      <BackToHome />

      <div className="min-h-screen bg-[#07080c] text-stone-200">
        {/* HERO */}
        <section className="relative h-screen min-h-[700px] w-full flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${heroCobre})`, filter: 'brightness(0.55) saturate(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/30 via-[#07080c]/55 to-[#07080c]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 30%, rgba(7,8,12,0.9) 100%)',
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
            <Link
              to="/soberania-organica"
              className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Soberania Orgânica
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/80 mb-6">
                Protocolo Respiratório e Imunológico
              </span>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white max-w-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.01em' }}
              >
                O cobre tem 2 poderes <br />
                que quase ninguém conhece
              </h1>
              <p
                className="text-stone-300 text-lg md:text-xl lg:text-2xl leading-relaxed mt-8 max-w-3xl"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Combinado com guaco, mel cru e própolis, ele forma um dos protocolos naturais mais
                eficientes para pulmão, imunidade e defesa do corpo. Sem misticismo. Com base
                bioquímica.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-12 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                <span className="text-amber-400/80">4 elementos integrados</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Aplicação prática</span>
                <span className="w-px h-4 bg-stone-700 hidden md:block" />
                <span>Mobile first</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-16 inline-flex items-center gap-3 text-stone-500"
            >
              <ChevronDown size={16} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                Descobrir o protocolo completo
              </span>
            </motion.div>
          </div>
        </section>

        {/* CAP 01 — COBRE ALÉM DO ÓBVIO */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                Capítulo 01
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                O cobre além do óbvio.
              </h2>
            </div>
            <div
              className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <p>
                Você foi ensinado a ver o cobre como um metal comum, peça de fiação ou enfeite. Isso
                está incompleto. O cobre é um elemento funcional dentro da biologia humana, presente
                em pelo menos 12 enzimas que regulam respiração celular, defesa antioxidante e
                formação de tecido conjuntivo.
              </p>
              <p>
                Civilizações antigas usavam cobre em vasos de água, instrumentos cirúrgicos e
                superfícies de contato hospitalar. Não era estética. Era estratégia sanitária
                empírica, hoje confirmada pela ciência.
              </p>
            </div>
          </div>

          {/* Os 2 poderes reais */}
          <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
            {[
              {
                titulo: 'Ação antimicrobiana de contato',
                texto:
                  'Íons Cu²⁺ rompem membranas bacterianas, oxidam proteínas virais e interrompem replicação. Estudos hospitalares mostram redução de 83% da carga bacteriana em superfícies de cobre versus aço inox.',
                icone: Shield,
              },
              {
                titulo: 'Suporte enzimático ao sistema imune',
                texto:
                  'Cofator essencial da SOD-Cu/Zn, ceruloplasmina e citocromo c oxidase. Cobre funcional baixo significa imunidade reduzida, recuperação lenta e maior vulnerabilidade respiratória.',
                icone: Beaker,
              },
            ].map((p, i) => {
              const Icon = p.icone;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-8 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-amber-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-amber-100 mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    className="text-stone-300 leading-relaxed"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {p.texto}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CAP 02 — ERRO MODERNO COM O COBRE */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-amber-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                Capítulo 02
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                O erro moderno com o cobre.
              </h2>
              <p
                className="text-stone-400 text-lg mt-6 leading-relaxed"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Hoje o problema raramente é deficiência absoluta. É desequilíbrio funcional. Você
                pode ter cobre sérico normal e ainda assim ter cobre biologicamente indisponível.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  titulo: 'Excesso de zinco isolado',
                  texto:
                    'Suplementação contínua de zinco acima de 40 mg/dia sem cobre derruba ceruloplasmina e cria deficiência funcional silenciosa em 3 a 6 meses.',
                },
                {
                  titulo: 'Solo empobrecido',
                  texto:
                    'Agricultura intensiva com NPK sem mineralização micronutriente entrega vegetais e cereais com 40% a 60% menos cobre que registros de 1950.',
                },
                {
                  titulo: 'Absorção intestinal comprometida',
                  texto:
                    'Disbiose, uso crônico de inibidores de bomba de prótons e dietas ricas em fitatos reduzem captação de cobre no duodeno proximal.',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-amber-500/30 transition-all duration-500"
                >
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {c.titulo}
                  </h3>
                  <p
                    className="text-stone-400 leading-relaxed"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {c.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAP 03 — GUACO E MEL (com imagem cinematográfica) */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden border border-white/10 mb-14">
              <img
                src={imgGuacoMel}
                alt="Folha fresca de guaco, chá escuro fumegante e favo de mel cru sobre ardósia"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Wind className="text-emerald-400" size={20} />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">
                    Capítulo 03 — Guaco
                  </span>
                </div>
                <h3
                  className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  O expansor respiratório.
                </h3>
                <p
                  className="text-stone-300 text-lg leading-relaxed mb-5"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  <em
                    className="not-italic text-emerald-300"
                    style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
                  >
                    Mikania glomerata
                  </em>{' '}
                  age como broncodilatador natural por relaxamento da musculatura lisa brônquica. O
                  composto chave é a cumarina, que reduz sensação de aperto no peito e facilita
                  entrada de ar em quadros de tosse seca persistente.
                </p>
                <p
                  className="text-stone-400 leading-relaxed"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  Uso ideal: xarope caseiro com mel cru ou infusão das folhas frescas, sempre em
                  ciclos curtos. Cumarina em alta dose interfere na coagulação, então não é tratamento
                  contínuo nem para quem usa anticoagulante.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="text-amber-400" size={20} />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                    Capítulo 04 — Mel cru
                  </span>
                </div>
                <h3
                  className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  O carreador biológico.
                </h3>
                <p
                  className="text-stone-300 text-lg leading-relaxed mb-5"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  Mel cru não é açúcar comum. Ele carrega glicose oxidase enzimática que produz
                  peróxido de hidrogênio em baixa concentração contínua, defensinas antimicrobianas e
                  compostos fenólicos que potencializam outros bioativos veiculados nele.
                </p>
                <p
                  className="text-stone-400 leading-relaxed"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  Mel industrial pasteurizado perde enzimas e vira xarope calórico. Mel cru não
                  filtrado, com pólen e propolissoma residual, mantém atividade funcional. É o
                  veículo natural ideal para o própolis e para o guaco.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAP 05 — PRÓPOLIS: TIPOS COMPARATIVO */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-emerald-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className="text-emerald-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-emerald-400/70">
                  Capítulo 05 — Própolis
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                A guerra invisível e os 3 tipos no mercado.
              </h2>
              <p
                className="text-stone-400 text-lg mt-6 leading-relaxed"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Própolis é antiviral, antibacteriano e anti-inflamatório, com mais de 300 compostos
                identificados, principalmente flavonoides (galangina, pinocembrina) e ácidos fenólicos
                (cafeico, ferúlico, p-cumárico). Mas o que chega na sua mão depende do tipo de
                extração.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 mb-12">
              <img
                src={imgPropolisTipos}
                alt="Três frascos de própolis verde brasileira: extrato com álcool, sem álcool e versão diluída comercial"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  badge: 'Tipo 01',
                  titulo: 'Própolis com álcool',
                  cor: 'emerald',
                  destaque: 'Extração mais potente',
                  pontos: [
                    'Solubiliza melhor flavonoides e ácidos fenólicos',
                    'Maior concentração de extrato seco (geralmente 11% a 38%)',
                    'Absorção sublingual rápida e eficiente',
                    'Limite: nem todos toleram álcool, principalmente crianças',
                  ],
                },
                {
                  badge: 'Tipo 02',
                  titulo: 'Própolis sem álcool',
                  cor: 'amber',
                  destaque: 'Indicado para sensíveis',
                  pontos: [
                    'Extração aquosa, glicólica ou em mel',
                    'Mais suave para mucosa bucal e gástrica',
                    'Apropriado para crianças, gestantes e abstinentes',
                    'Potência relativa menor, exige dose maior',
                  ],
                },
                {
                  badge: 'Tipo 03',
                  titulo: 'Própolis "puro" comercial',
                  cor: 'red',
                  destaque: 'Cuidado de mercado',
                  pontos: [
                    'Muitos rótulos com baixa concentração real',
                    'Adoçados artificialmente para mascarar sabor',
                    'Marketing forte, substância funcional fraca',
                    'Verifique sempre o percentual de extrato seco',
                  ],
                },
              ].map((t, i) => {
                const cores: Record<string, string> = {
                  emerald:
                    'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/60 text-emerald-200',
                  amber:
                    'border-amber-500/30 bg-amber-500/5 hover:border-amber-400/60 text-amber-200',
                  red: 'border-red-500/30 bg-red-500/5 hover:border-red-400/60 text-red-200',
                };
                const acentos: Record<string, string> = {
                  emerald: 'text-emerald-400',
                  amber: 'text-amber-400',
                  red: 'text-red-400',
                };
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 ${cores[t.cor]}`}
                  >
                    <span
                      className={`text-[10px] font-bold tracking-[0.4em] uppercase ${acentos[t.cor]}`}
                    >
                      {t.badge}
                    </span>
                    <h3
                      className="text-2xl font-bold text-white mt-3 mb-2"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                    >
                      {t.titulo}
                    </h3>
                    <p
                      className={`text-sm font-bold uppercase tracking-wide mb-5 ${acentos[t.cor]}`}
                    >
                      {t.destaque}
                    </p>
                    <ul className="space-y-3">
                      {t.pontos.map((p, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed"
                          style={{ fontFamily: "'Inter Tight', sans-serif" }}
                        >
                          <ChevronRight
                            size={14}
                            className={`${acentos[t.cor]} mt-1 flex-shrink-0`}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Como identificar qualidade */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <Eye size={18} className="text-emerald-400" />
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                >
                  Como identificar qualidade real
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                {[
                  'Cor intensa: verde profundo, marrom escuro ou vermelho amazônico',
                  'Sabor amargo persistente, com ardência leve no fundo da garganta',
                  'Sedimentação natural após dias parado',
                  'Procedência apícola identificável no rótulo',
                  'Percentual de extrato seco declarado, idealmente acima de 11%',
                  'Sem adoçantes, corantes ou conservantes na lista',
                ].map((m, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-3 text-stone-300"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <ChevronRight size={14} className="text-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>{m}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CAP 06 — PROTOCOLO DIÁRIO */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-amber-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                  Capítulo 06 — Protocolo aplicado
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Janela diária integrada.
              </h2>
              <p
                className="text-stone-400 text-lg mt-6 leading-relaxed"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Aplicação direta para fortalecimento respiratório e imunológico em ciclos de 14 a 21
                dias com pausa de 7 dias.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  hora: 'Manhã, em jejum',
                  titulo: 'Abertura imunológica',
                  itens: [
                    '200 ml de água morna filtrada',
                    '10 a 15 gotas de própolis verde com álcool (ou 30 gotas sem álcool)',
                    '1 colher de chá de mel cru não filtrado',
                    'Aguardar 20 minutos antes da primeira refeição',
                  ],
                },
                {
                  hora: 'Tarde',
                  titulo: 'Suporte respiratório',
                  itens: [
                    '1 xícara de chá de guaco (folhas frescas amassadas)',
                    'Infusão por 5 minutos, abafada',
                    'Adoçar com mel cru se desejado',
                    'Não combinar com anticoagulante',
                  ],
                },
                {
                  hora: 'Noite',
                  titulo: 'Reforço antimicrobiano',
                  itens: [
                    'Repetir própolis + mel cru',
                    'Opcional: água armazenada por 8h em vaso de cobre puro alimentar',
                    'Evitar líquidos ácidos no recipiente de cobre',
                    'Uma noite por semana sem nada para janela hormética',
                  ],
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-7 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-500"
                >
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/80">
                    {b.hora}
                  </span>
                  <h3
                    className="text-2xl font-bold text-white mt-3 mb-5"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {b.titulo}
                  </h3>
                  <ul className="space-y-3">
                    {b.itens.map((it, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAP 07 — HISTÓRIA E O QUE FOI ESQUECIDO */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-amber-950/10 via-transparent to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden border border-white/10 mb-14">
              <img
                src={imgCobreHistoria}
                alt="Sino antigo de bronze, moedas de cobre, jarro de cobre e instrumentos médicos sobre altar de pedra"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <History className="text-amber-400" size={20} />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                    Capítulo 07
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  O que foi abandonado, e por que isso importa.
                </h2>
              </div>
              <div
                className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-stone-300"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <p>
                  Antes da industrialização, vasos de cobre armazenavam água em casas, hospitais
                  ayurvédicos e mosteiros. A Egyptian Smith Papyrus, datada de 2.400 a.C., já
                  registrava cobre para esterilizar feridas e tratar água. Civilizações mediterrâneas
                  forjavam instrumentos cirúrgicos em ligas de cobre, intuitivamente conscientes do
                  efeito antisséptico de contato.
                </p>
                <p>
                  Os sinos de igreja eram feitos de bronze (cobre + estanho) por durabilidade e
                  ressonância acústica capaz de viajar quilômetros. O som não cura no sentido
                  antimicrobiano, mas a frequência sonora interfere no estado emocional e na
                  ancoragem temporal de comunidades inteiras. Era infraestrutura sensorial coletiva.
                </p>
                <p>
                  Existem estudos agronômicos demonstrando que solos suplementados com cobre
                  micronutriente em equilíbrio aumentam produtividade e resistência fúngica de
                  videiras, oliveiras e cítricos. Não é magia direta. É bioquímica do solo.
                </p>
                <p
                  className="border-l-2 border-amber-400 pl-5 italic text-stone-200"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  O cobre não foi escondido. Foi abandonado em troca de soluções patenteáveis. A
                  diferença está na forma, não no elemento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAP 08 — ERROS QUE DESTROEM */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-red-400/80">
                  Capítulo 08 — Erros que destroem o resultado
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Onde o protocolo deixa de funcionar.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                'Comprar própolis pelo preço, sem checar percentual de extrato seco',
                'Usar mel industrial pasteurizado como veículo, anulando enzimas',
                'Usar guaco em uso contínuo sem janela de pausa',
                'Misturar cobre com líquidos ácidos no mesmo recipiente',
                'Suplementar zinco em doses altas sem reposição de cobre',
                'Esperar resposta em 48 horas, abandonar antes de 14 dias',
              ].map((e, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 hover:border-red-400/50 transition-all duration-500"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80">
                    Erro {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="text-stone-200 leading-relaxed mt-3"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {e}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-transparent to-[#05060a]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/70">
                Perguntas frequentes
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Respostas diretas, sem rodeio.
              </h2>
            </div>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/40 transition-all"
                >
                  <summary
                    className="cursor-pointer p-6 md:p-7 text-lg md:text-xl font-bold text-white list-none flex items-start justify-between gap-4"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    <span>{f.question}</span>
                    <ChevronDown
                      className="flex-shrink-0 mt-1 group-open:rotate-180 transition-transform text-amber-400"
                      size={20}
                    />
                  </summary>
                  <p
                    className="px-6 md:px-7 pb-6 md:pb-7 text-stone-300 leading-relaxed"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Versão diluída entrega resultado diluído.
              </h2>
              <p
                className="text-stone-400 text-lg mt-6 leading-relaxed"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Ajuste seu própolis, escolha mel de verdade, use guaco com estratégia. Seu corpo
                responde à qualidade, não à intenção.
              </p>
            </div>
            <MicroCtaResistencia />
            <div className="mt-16 grid md:grid-cols-2 gap-6">
              <Link
                to="/soberania-organica/plantas-subutilizadas"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-500"
              >
                <BookOpen size={20} className="text-amber-400 mb-4" />
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}
                >
                  Hub das 10 plantas subutilizadas
                </h3>
                <p
                  className="text-stone-400 text-sm"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  Veja jurubeba, quebra-pedra, espinheira-santa, guaco e mais 6 espécies com função
                  real e protocolo integrado.
                </p>
              </Link>
              <Link
                to="/soberania-organica/fitoterapia-aplicada"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-500"
              >
                <Leaf size={20} className="text-amber-400 mb-4" />
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}
                >
                  Fitoterapia aplicada
                </h3>
                <p
                  className="text-stone-400 text-sm"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  Sistema completo de uso terapêutico de plantas brasileiras, com critérios de
                  segurança e ciclos.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}