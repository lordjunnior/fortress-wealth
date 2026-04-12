import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BarChart3, Shield, Eye, Globe, Lock,
  Check, X, Minus, AlertTriangle, ChevronRight,
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Full Ranking Data ── */
const PLATFORMS = [
  {
    name: 'Neobankless',
    privacy: 3,
    report: 'Sim',
    country: 'Brasil',
    type: 'Fintech',
    kyc: 'CPF obrigatório',
    crypto: 'USDC, USDT',
    card: 'Visa Infinite',
    link: '/soberania-financeira/contas-internacionais/neobankless',
    notes: 'Bom para conversão BRL→USDC. Provável reporte ao COAF.',
  },
  {
    name: 'Bank of Georgia',
    privacy: 4,
    report: 'Parcial',
    country: 'Geórgia',
    type: 'Banco',
    kyc: 'Passaporte',
    crypto: 'Sim (via parceiros)',
    card: 'Visa/Mastercard',
    link: null,
    notes: 'Jurisdição favorável. CRS parcial. Abertura presencial ou remota.',
  },
  {
    name: 'Wise',
    privacy: 2,
    report: 'Sim',
    country: 'Reino Unido',
    type: 'Fintech',
    kyc: 'Documento + comprovante',
    crypto: 'Não',
    card: 'Visa Debit',
    link: null,
    notes: 'Multi-moeda excelente. Reporta em todas jurisdições.',
  },
  {
    name: 'Exchanges sem KYC',
    privacy: 5,
    report: 'Não',
    country: 'Descentralizado',
    type: 'Exchange',
    kyc: 'Nenhum',
    crypto: 'Sim',
    card: 'Não',
    link: null,
    notes: 'Maior privacidade possível. Risco de liquidez e golpes.',
  },
  {
    name: 'BRICS Pay',
    privacy: 1,
    report: 'Sim',
    country: 'Multi-BRICS',
    type: 'Sistema estatal',
    kyc: 'Total',
    crypto: 'CBDC prevista',
    card: 'Em desenvolvimento',
    link: null,
    notes: 'Infraestrutura geopolítica. Controle estatal total previsto.',
  },
];

const privacyLabel = (n: number) => ['', 'Muito Baixo', 'Baixo', 'Médio', 'Alto', 'Muito Alto'][n];
const privacyColorClass = (n: number) => ['', 'text-rose-500', 'text-rose-400', 'text-amber-400', 'text-emerald-400', 'text-emerald-500'][n];

const ReportIcon = ({ value }: { value: string }) => {
  if (value === 'Não') return <Check className="text-emerald-400" size={14} />;
  if (value === 'Parcial') return <Minus className="text-amber-400" size={14} />;
  return <X className="text-rose-400" size={14} />;
};

const schemaLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Índice de Soberania Financeira — Ranking de Plataformas por Privacidade',
  description: 'Ranking comparativo de contas internacionais, offshore e exchanges por nível de privacidade, reporte e jurisdição.',
  url: 'https://lordjunnior.com.br/indice-de-soberania-financeira',
  itemListElement: PLATFORMS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.notes,
  })),
};

const IndiceSoberaniaFinanceira = () => {
  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Índice de Soberania Financeira — Ranking de Privacidade por Plataforma</title>
        <meta name="description" content="Ranking comparativo de plataformas financeiras por nível de privacidade, status de reporte e jurisdição. Compare contas internacionais, offshore e exchanges sem KYC." />
        <link rel="canonical" href="https://lordjunnior.com.br/indice-de-soberania-financeira" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
      </Helmet>
      <ScrollToTop />

      <div className="min-h-screen bg-[#050808] text-stone-200">
        {/* ── Header ── */}
        <div className="pt-20 pb-12 px-6 max-w-6xl mx-auto">
          <Link
            to="/soberania-financeira"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Soberania Financeira
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-emerald-400/70 mb-3">
              FERRAMENTA DE DECISÃO ESTRATÉGICA
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Índice de Soberania<br />
              <span className="text-emerald-400">Financeira</span>
            </h1>
            <p className="text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Comparativo técnico de plataformas financeiras avaliadas por
              privacidade, reporte fiscal e jurisdição. Cada linha é uma decisão — não uma recomendação.
            </p>
          </motion.div>
        </div>

        {/* ── Legend ── */}
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-[0.15em] uppercase text-stone-500">
            <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Não reporta</span>
            <span className="flex items-center gap-1.5"><Minus size={12} className="text-amber-400" /> Parcial</span>
            <span className="flex items-center gap-1.5"><X size={12} className="text-rose-400" /> Reporta</span>
            <span className="ml-4 flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> Privacidade 5/5 = máximo</span>
          </div>
        </section>

        {/* ── Table ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] overflow-hidden">
            <div className="grid grid-cols-8 gap-2 px-6 py-4 border-b border-white/5 text-[10px] font-bold tracking-[0.15em] uppercase text-stone-500">
              <span className="col-span-2">Plataforma</span>
              <span>Privacidade</span>
              <span>Reporta</span>
              <span>Jurisdição</span>
              <span>KYC</span>
              <span>Cripto</span>
              <span>Cartão</span>
            </div>
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className={`grid grid-cols-8 gap-2 px-6 py-4 items-center text-xs ${i !== PLATFORMS.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}
              >
                <div className="col-span-2">
                  <p className="text-stone-200 font-semibold text-sm">{p.name}</p>
                  <p className="text-stone-600 text-[10px] mt-0.5">{p.type}</p>
                </div>
                <span className={`${privacyColorClass(p.privacy)} font-bold`}>
                  {privacyLabel(p.privacy)} ({p.privacy}/5)
                </span>
                <span className="flex items-center gap-1.5">
                  <ReportIcon value={p.report} /> {p.report}
                </span>
                <span className="text-stone-400">{p.country}</span>
                <span className="text-stone-500">{p.kyc}</span>
                <span className="text-stone-400">{p.crypto}</span>
                <span className="text-stone-500">{p.card}</span>
              </motion.div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{p.name}</p>
                    <p className="text-stone-600 text-[10px] uppercase tracking-wider">{p.type}</p>
                  </div>
                  <span className={`${privacyColorClass(p.privacy)} text-xs font-bold`}>
                    {p.privacy}/5
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="text-stone-600">Privacidade:</span> <span className={privacyColorClass(p.privacy)}>{privacyLabel(p.privacy)}</span></div>
                  <div><span className="text-stone-600">Reporta:</span> <span className="text-stone-300 inline-flex items-center gap-1"><ReportIcon value={p.report} /> {p.report}</span></div>
                  <div><span className="text-stone-600">País:</span> <span className="text-stone-400">{p.country}</span></div>
                  <div><span className="text-stone-600">KYC:</span> <span className="text-stone-400">{p.kyc}</span></div>
                  <div><span className="text-stone-600">Cripto:</span> <span className="text-stone-400">{p.crypto}</span></div>
                  <div><span className="text-stone-600">Cartão:</span> <span className="text-stone-400">{p.card}</span></div>
                </div>
                <p className="text-stone-500 text-[10px] mt-3 leading-relaxed border-t border-white/5 pt-3">{p.notes}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Metodologia de avaliação
            </h2>
            <div className="space-y-3 text-xs text-stone-400 leading-relaxed">
              <p>
                <strong className="text-stone-300">Privacidade (1-5):</strong> Avalia o nível de exposição de dados pessoais e financeiros
                à plataforma e terceiros. 1 = controle total pelo Estado; 5 = anonimato prático.
              </p>
              <p>
                <strong className="text-stone-300">Reporte:</strong> Indica se a plataforma reporta automaticamente transações
                a órgãos fiscais (COAF, IRS, HMRC). "Parcial" significa CRS limitado ou acordos bilaterais incompletos.
              </p>
              <p>
                <strong className="text-stone-300">Jurisdição:</strong> País de incorporação ou operação principal.
                Jurisdições com maior sigilo bancário e menor adesão ao CRS recebem pontuação mais alta.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
              <p className="text-stone-400 text-xs leading-relaxed">
                Este índice é uma <strong className="text-stone-300">ferramenta de análise comparativa</strong>.
                Não constitui recomendação financeira, fiscal ou jurídica. Consulte profissionais qualificados
                antes de tomar qualquer decisão. As avaliações podem mudar conforme regulamentações evoluem.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 text-center">
          <Link to="/soberania-financeira" className="text-stone-600 text-xs tracking-widest uppercase hover:text-stone-400 transition-colors">
            ← Voltar ao Hub de Soberania Financeira
          </Link>
        </footer>
      </div>
    </>
  );
};

export default IndiceSoberaniaFinanceira;
