import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  Globe, Shield, Eye, CreditCard, ArrowRightLeft, Building2,
  ChevronRight, Lock, Landmark, Banknote, Search, BarChart3,
  AlertTriangle, ExternalLink, Smartphone, TrendingUp,
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

/* ── Animation ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Category Data ── */
const CATEGORIES = [
  {
    id: 'contas-internacionais',
    icon: Globe,
    color: 'blue',
    title: 'Contas Internacionais',
    subtitle: 'Plataformas reguladas com acesso global',
    description: 'Contas bancárias e fintechs com conversão multi-moeda, cartões internacionais e transferências cross-border. Para quem precisa operar legalmente fora do sistema bancário nacional.',
    items: [
      { name: 'Neobankless', status: 'review', link: '/soberania-financeira/contas-internacionais/neobankless' },
      { name: 'Bank of Georgia', status: 'review', link: '/soberania-financeira/contas-internacionais/bank-of-georgia' },
      { name: 'Wise', status: 'em breve', link: null },
      { name: 'Payoneer', status: 'em breve', link: null },
    ],
    privacyLevel: 'Médio',
    link: '/soberania-financeira/contas-internacionais',
  },
  {
    id: 'contas-offshore',
    icon: Building2,
    color: 'amber',
    title: 'Contas Offshore',
    subtitle: 'Estruturas fora da jurisdição nacional',
    description: '10 contas offshore cripto que NÃO reportam — abertura remota, jurisdições favoráveis e análise de risco de cada uma. Ranking técnico baseado em privacidade real.',
    items: [
      { name: 'Top 10 contas offshore cripto', status: 'em breve', link: null },
      { name: 'Guia de abertura remota', status: 'em breve', link: null },
    ],
    privacyLevel: 'Alto',
    link: '/soberania-financeira/contas-offshore',
  },
  {
    id: 'exchanges-sem-kyc',
    icon: Eye,
    color: 'emerald',
    title: 'Exchanges sem KYC',
    subtitle: 'Plataformas cripto sem verificação obrigatória',
    description: 'Todas as plataformas cripto sem KYC que existem atualmente. Exchanges que entregam dinheiro vivo, KYCNot.me e o ecossistema de ferramentas fora do sistema tradicional.',
    items: [
      { name: 'KYCNot.me — Guia completo', status: 'em breve', link: null },
      { name: 'Exchange que entrega dinheiro vivo', status: 'em breve', link: null },
      { name: 'Plataformas sem verificação', status: 'em breve', link: null },
    ],
    privacyLevel: 'Muito Alto',
    link: '/soberania-financeira/exchanges-sem-kyc',
  },
  {
    id: 'sistemas-alternativos',
    icon: Landmark,
    color: 'rose',
    title: 'Sistemas Financeiros Alternativos',
    subtitle: 'Infraestrutura geopolítica e monetária emergente',
    description: 'BRICS Pay, apps da "Nova Ordem Mundial" e a infraestrutura financeira paralela que está sendo construída fora do sistema SWIFT. Análise técnica e geopolítica.',
    items: [
      { name: 'BRICS Pay — Análise técnica', status: 'em breve', link: null },
      { name: 'App da Nova Ordem Mundial', status: 'em breve', link: null },
    ],
    privacyLevel: 'Variável',
    link: '/soberania-financeira/sistemas-alternativos',
  },
];

/* ── Ranking preview ── */
const RANKING_PREVIEW = [
  { name: 'Neobankless', privacy: 'Médio', report: 'Sim', country: 'Brasil', color: 'text-amber-400' },
  { name: 'Bank of Georgia', privacy: 'Alto', report: 'Parcial', country: 'Geórgia', color: 'text-emerald-400' },
  { name: 'Contas offshore cripto', privacy: 'Muito Alto', report: 'Não', country: 'Vários', color: 'text-emerald-500' },
  { name: 'KYCNot.me (exchanges)', privacy: 'Muito Alto', report: 'Não', country: 'Descentralizado', color: 'text-emerald-500' },
  { name: 'BRICS Pay', privacy: 'Baixo', report: 'Sim', country: 'Multi-BRICS', color: 'text-rose-400' },
];

/* ── Color maps ── */
const colorMap: Record<string, { text: string; bg: string; border: string; badge: string }> = {
  blue:    { text: 'text-blue-400', bg: 'bg-blue-500/8', border: 'border-blue-500/20', badge: 'bg-blue-500/15 text-blue-300' },
  amber:   { text: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20', badge: 'bg-amber-500/15 text-amber-300' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', badge: 'bg-emerald-500/15 text-emerald-300' },
  rose:    { text: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/20', badge: 'bg-rose-500/15 text-rose-300' },
};

const privacyColor: Record<string, string> = {
  'Baixo': 'text-rose-400',
  'Médio': 'text-amber-400',
  'Alto': 'text-emerald-400',
  'Muito Alto': 'text-emerald-500',
  'Variável': 'text-stone-400',
};

/* ── Schema ── */
const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Soberania Financeira — Contas, Exchanges e Infraestrutura Fora do Sistema',
  description: 'Hub completo de ferramentas de soberania financeira: contas internacionais, contas offshore, exchanges sem KYC e sistemas financeiros alternativos.',
  url: 'https://autonomiadoindividuo.com/soberania-financeira',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: CATEGORIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      description: c.description,
    })),
  },
};

const SoberaniaFinanceira = () => {
  const rankingRef = useRef(null);
  const rankingInView = useInView(rankingRef, { once: true, margin: '-80px' });

  return (
    <>
      <Helmet>
        <title>Soberania Financeira — Contas Internacionais, Offshore e Cripto sem KYC</title>
        <meta name="description" content="Hub completo de ferramentas de soberania financeira: contas internacionais, contas offshore cripto, exchanges sem KYC e sistemas financeiros alternativos. O maior acervo em português." />
        <link rel="canonical" href="https://autonomiadoindividuo.com/soberania-financeira" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ScrollToTop />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        {/* ── Hero ── */}
        <CinematicHero
          image="/heroes/soberania-financeira.webp"
          phase="ECOSSISTEMA FINANCEIRO"
          title="Soberania Financeira"
          subtitle="Contas internacionais, estruturas offshore e infraestrutura financeira fora do sistema tradicional. Análise técnica, sem alarmismo — apenas dados."
          icon={Shield}
          accentColor="blue"
          backLink="/"
          backLabel="Início"
        />

        {/* ── Intro ── */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-blue-400/70 mb-4">
              POR QUE ESTE HUB EXISTE
            </p>
            <h2
              className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Seu dinheiro está preso em uma jurisdição.<br />
              <span className="text-blue-400">Suas opções não precisam estar.</span>
            </h2>
            <p className="text-stone-400 leading-relaxed text-sm md:text-base">
              Este ecossistema reúne análises técnicas de contas internacionais, estruturas offshore,
              exchanges sem verificação obrigatória e sistemas financeiros emergentes. Cada ferramenta
              é avaliada por <strong className="text-stone-300">nível de privacidade</strong>,{' '}
              <strong className="text-stone-300">status de reporte</strong> e{' '}
              <strong className="text-stone-300">jurisdição</strong> — para que você tome decisões
              informadas sobre sua infraestrutura financeira pessoal.
            </p>
          </motion.div>
        </section>

        {/* ── Category Cards ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, idx) => {
              const colors = colorMap[cat.color];
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={idx}
                  className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-6 md:p-8 group hover:border-opacity-50 transition-all duration-500`}
                >
                  {/* Privacy badge */}
                  <div className="absolute top-5 right-5">
                    <span className={`text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${privacyColor[cat.privacyLevel]} bg-white/5`}>
                      🔒 {cat.privacyLevel}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                      <Icon className={colors.text} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">{cat.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-400 text-sm leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  {/* Items list */}
                  <div className="space-y-2 mb-6">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <span className="text-stone-300">{item.name}</span>
                        {item.status === 'review' && item.link ? (
                          <Link to={item.link} className={`${colors.text} hover:underline flex items-center gap-1`}>
                            Ver review <ChevronRight size={12} />
                          </Link>
                        ) : (
                          <span className="text-stone-600 italic">em breve</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/5">
                    <span className={`text-xs font-semibold ${colors.text} flex items-center gap-1.5 opacity-50`}>
                      <Lock size={12} /> Categoria em construção
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Ranking Preview (Índice de Soberania) ── */}
        <section ref={rankingRef} className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-emerald-400/70 mb-3">
              FERRAMENTA DE DECISÃO
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Índice de Soberania Financeira
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto">
              Ranking comparativo de plataformas por privacidade, reporte e jurisdição.
              Transforme a busca por privacidade em um processo de decisão técnica.
            </p>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rankingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
              <span>Plataforma</span>
              <span>Privacidade</span>
              <span>Reporta</span>
              <span>Jurisdição</span>
            </div>
            {/* Rows */}
            {RANKING_PREVIEW.map((row, i) => (
              <div key={row.name} className={`grid grid-cols-4 gap-4 px-6 py-3.5 text-sm ${i !== RANKING_PREVIEW.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}>
                <span className="text-stone-200 font-medium text-xs md:text-sm">{row.name}</span>
                <span className={`${row.color} font-semibold text-xs`}>{row.privacy}</span>
                <span className={`text-xs ${row.report === 'Não' ? 'text-emerald-400' : row.report === 'Parcial' ? 'text-amber-400' : 'text-rose-400'}`}>
                  {row.report}
                </span>
                <span className="text-stone-500 text-xs">{row.country}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA to full ranking */}
          <div className="text-center mt-8">
            <Link
              to="/indice-de-soberania-financeira"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/15 transition-all"
            >
              <BarChart3 size={16} /> Ver ranking completo <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={20} />
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Aviso importante sobre privacidade financeira
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Todo o conteúdo deste hub é de natureza <strong className="text-stone-300">educacional e analítica</strong>.
                  As informações apresentadas são baseadas em pesquisa independente e experiência prática.
                  Nenhum conteúdo aqui constitui recomendação de evasão fiscal, lavagem de dinheiro ou qualquer
                  atividade ilícita. O objetivo é fornecer <strong className="text-stone-300">transparência sobre ferramentas</strong> que
                  existem no mercado global e que são legais em suas respectivas jurisdições.
                  Consulte sempre um profissional qualificado antes de tomar decisões financeiras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-10 text-center">
          <p className="text-stone-600 text-xs tracking-widest uppercase">
            Soberania Financeira · Análise · Privacidade · Jurisdição
          </p>
        </footer>
      </div>
    </>
  );
};

export default SoberaniaFinanceira;
