import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Shield, ChevronRight, ExternalLink, AlertTriangle,
  CreditCard, Globe, ArrowRightLeft, Eye, Lock, Check, X,
  HelpCircle, Building2, Smartphone, TrendingUp, Landmark,
  Banknote, Star, Zap, DollarSign, Users, Clock, Send,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import heroImg from '@/assets/wise-hero.jpg';
import appImg from '@/assets/wise-app.jpg';

/* ── Constants ── */
const AFFILIATE_LINK = 'https://wise.com/invite/ihpn/joaob1972?utm_source=ios-pill-hp-nativeshare&utm_medium=invite&utm_campaign=&utm_content=&referralCode=joaob1972';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Specs ── */
const SPECS = [
  { label: 'Tipo', value: 'Fintech Regulada', icon: Building2 },
  { label: 'Sede', value: 'Londres, UK', icon: Globe },
  { label: 'Moedas', value: '40+ moedas', icon: DollarSign },
  { label: 'Cartão', value: 'Visa Debit', icon: CreditCard },
  { label: 'Taxa de câmbio', value: 'Mid-market (real)', icon: ArrowRightLeft },
  { label: 'Listada em bolsa', value: 'LSE (WISE)', icon: TrendingUp },
];

/* ── Pros & Cons ── */
const PROS = [
  'Taxa de câmbio mid-market real — sem spread oculto como bancos tradicionais',
  'Suporta mais de 40 moedas com contas locais em 10+ países (USD, EUR, GBP, AUD, etc.)',
  'Dados bancários locais: receba como se tivesse conta no país (routing number nos EUA, IBAN na Europa)',
  'Transferências internacionais com custo até 8x menor que bancos tradicionais',
  'Cartão Visa debit aceito globalmente com conversão automática no câmbio real',
  'Empresa listada na London Stock Exchange (LSE) — transparência regulatória total',
  'App extremamente intuitivo e em português',
  'Conversão instantânea entre moedas dentro do app',
  'Ideal para freelancers e nômades digitais que recebem em múltiplas moedas',
  'Integração com plataformas de pagamento (PayPal, Payoneer, etc.)',
  'Abertura 100% online em minutos — sem burocracia',
  'Função "Jar" para separar saldos por objetivo (similar a caixinhas)',
  'Notificações em tempo real de cada transação e conversão',
  'Suporte ao cliente responsivo em múltiplos idiomas',
];

const CONS = [
  'Exige verificação KYC completa — CPF, documento e selfie obrigatórios',
  'Não é banco real — é uma EMI (Electronic Money Institution), sem seguro de depósito bancário tradicional',
  'Limite de saque em caixas eletrônicos (2 saques grátis por mês, depois cobra taxa)',
  'Contas podem ser bloqueadas ou encerradas sem aviso prévio (risco de todas as fintechs)',
  'Reporta para autoridades fiscais dos países onde opera (CRS — Common Reporting Standard)',
  'Não suporta compra direta de Bitcoin ou criptomoedas dentro do app',
  'Limite de valores em conta — não ideal para quem movimenta volumes muito altos',
  'Não oferece investimentos, renda fixa ou ações dentro da plataforma',
  'Pode solicitar comprovação de origem de fundos a qualquer momento',
  'Não é crypto friendly — transferências para exchanges podem ser bloqueadas em alguns casos',
];

/* ── Features ── */
const FEATURES = [
  { step: '01', title: 'Conta Multi-Moeda', desc: 'Mantenha saldos em mais de 40 moedas simultaneamente. Receba pagamentos com dados bancários locais nos EUA (routing number), Europa (IBAN), Reino Unido (sort code) e outros 7+ países.' },
  { step: '02', title: 'Câmbio Real (Mid-Market)', desc: 'A Wise usa a taxa de câmbio mid-market — a mesma que você vê no Google. Sem spread oculto, sem margem escondida. Você paga apenas uma taxa fixa transparente por transferência.' },
  { step: '03', title: 'Cartão Visa Internacional', desc: 'Cartão físico e virtual Visa Debit aceito em mais de 200 países. Ao pagar no exterior, a conversão acontece automaticamente na taxa real, sem IOF de cartão de crédito internacional.' },
  { step: '04', title: 'Transferências Rápidas', desc: 'Envie dinheiro para mais de 80 países com custo até 8x menor que bancos. Transferências para EUA, Europa e Reino Unido chegam em minutos ou poucas horas, não dias.' },
];

/* ── FAQ ── */
const FAQ_DATA = [
  {
    q: 'O que é a Wise e como ela funciona?',
    a: 'A Wise (antiga TransferWise) é uma fintech britânica especializada em transferências internacionais e conta multi-moeda. Ela utiliza a taxa de câmbio mid-market real (sem spread bancário) e cobra apenas uma taxa fixa transparente por operação. Diferente de bancos, não existe margem oculta na conversão.',
  },
  {
    q: 'Wise é segura? Posso confiar meu dinheiro?',
    a: 'A Wise é regulada pelo FCA (Financial Conduct Authority) no Reino Unido e por autoridades locais em cada país onde opera. É listada na London Stock Exchange sob o ticker WISE, com balanços públicos auditados. Entretanto, é uma EMI (Electronic Money Institution), não um banco — o que significa que o dinheiro é mantido em contas segregadas, mas sem o mesmo seguro de depósito bancário.',
  },
  {
    q: 'Posso receber pagamentos em dólar com dados bancários americanos?',
    a: 'Sim. A Wise fornece dados bancários locais nos EUA (ACH routing number e account number), permitindo que você receba pagamentos como se tivesse uma conta americana. Ideal para freelancers que trabalham para empresas americanas ou recebem via plataformas como Upwork, Fiverr ou Deel.',
  },
  {
    q: 'A Wise reporta para a Receita Federal do Brasil?',
    a: 'Sim. A Wise cumpre o CRS (Common Reporting Standard) e reporta informações financeiras para as autoridades fiscais dos países onde os titulares das contas residem. Se você é residente fiscal no Brasil, seus saldos e movimentações serão reportados. Mantenha suas obrigações fiscais em dia.',
  },
  {
    q: 'Posso usar a Wise para comprar Bitcoin?',
    a: 'Não diretamente. A Wise não oferece compra de criptomoedas dentro do app. Além disso, transferências para exchanges de cripto podem ser bloqueadas em alguns casos. Para operações cripto, considere usar a Wise apenas como ponte bancária e não como plataforma principal.',
  },
  {
    q: 'Qual a diferença entre Wise e um banco real como o Bank of Georgia?',
    a: 'A Wise é uma fintech regulada (EMI), ideal para transferências internacionais rápidas e baratas. O Bank of Georgia é um banco real com agências físicas, seguro de depósito, limites maiores e possibilidade de investimentos. A Wise é perfeita para operações do dia a dia; o Bank of Georgia, para diversificação bancária estrutural.',
  },
  {
    q: 'Quanto custa manter uma conta Wise?',
    a: 'A conta Wise é gratuita para manter. Você paga apenas quando faz conversões ou transferências, com taxas que variam por moeda (geralmente entre 0.3% e 2% do valor). O cartão físico custa uma taxa única de emissão. Saques em caixas eletrônicos são gratuitos até 2 por mês.',
  },
  {
    q: 'Wise é melhor que banco para enviar dinheiro ao exterior?',
    a: 'Para transferências internacionais, sim. Bancos brasileiros cobram spread de 2-5% sobre o câmbio comercial, mais taxas SWIFT de R$ 80-250 por operação. A Wise cobra entre 0.3-2% na taxa real, sem custos ocultos. Para quem envia ou recebe em moeda estrangeira regularmente, a economia é significativa.',
  },
  {
    q: 'Posso usar o cartão Wise no Brasil?',
    a: 'Sim. O cartão Wise Visa Debit funciona em qualquer estabelecimento que aceite Visa no Brasil e no mundo. Ao usar no Brasil com saldo em reais, funciona como débito normal. Ao usar no exterior, converte automaticamente na taxa mid-market. Não há IOF de cartão de crédito internacional (6.38%), apenas a taxa Wise.',
  },
  {
    q: 'Wise é uma boa opção para quem busca soberania financeira?',
    a: 'A Wise é uma excelente ferramenta tática para diversificação internacional e operações cambiais eficientes. Porém, não é soberania: exige KYC completo, reporta para o CRS, e como fintech pode bloquear contas. Para soberania real, a Wise complementa — mas não substitui — a autocustódia de Bitcoin.',
  },
];

/* ── Verdict ── */
const VERDICT_FOR = [
  'Freelancers e nômades digitais que recebem em moeda estrangeira',
  'Quem faz transferências internacionais frequentes e quer economizar',
  'Quem precisa de dados bancários locais nos EUA, Europa ou UK',
  'Quem viaja e quer um cartão com câmbio real sem IOF',
  'Quem está começando a diversificação internacional',
];

const VERDICT_AGAINST = [
  'Quem busca privacidade total (Wise reporta via CRS)',
  'Quem quer movimentar volumes muito altos (limites de fintech)',
  'Quem precisa de um banco real com seguro de depósito',
  'Quem opera exclusivamente com cripto (Wise pode bloquear)',
];

export default function Wise() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const specsRef = useRef(null);
  const specsInView = useInView(specsRef, { once: true, margin: '-60px' });
  const prosRef = useRef(null);
  const prosInView = useInView(prosRef, { once: true, margin: '-60px' });
  const verdictRef = useRef(null);
  const verdictInView = useInView(verdictRef, { once: true, margin: '-60px' });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-[#050808] text-foreground font-sans overflow-x-hidden">
      <ScrollToTop />
      <Helmet>
        <title>Wise (TransferWise): Conta Multi-Moeda Internacional — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise completa da Wise: conta multi-moeda com câmbio real mid-market, cartão Visa internacional, dados bancários em 10+ países. Prós, contras e veredicto editorial." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/wise" />
        <meta property="og:title" content="Wise: Conta Multi-Moeda Internacional — Análise Completa 2026" />
        <meta property="og:description" content="Review editorial da Wise: câmbio real, cartão Visa global e dados bancários locais em 10+ países. Vale a pena?" />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/wise" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-image.png" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Wise (TransferWise): Conta Multi-Moeda Internacional — Análise Completa 2026',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          datePublished: '2026-03-07',
          description: 'Review editorial completo da Wise: fintech regulada com câmbio mid-market real, conta multi-moeda e cartão Visa internacional.',
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://lordjunnior.com.br/' },
            { '@type': 'ListItem', position: 2, name: 'Soberania Financeira', item: 'https://lordjunnior.com.br/soberania-financeira' },
            { '@type': 'ListItem', position: 3, name: 'Wise', item: 'https://lordjunnior.com.br/soberania-financeira/contas-internacionais/wise' },
          ],
        })}</script>
      </Helmet>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      {/* Light Beam */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, hsla(145,60%,40%,0.03) 0%, transparent 40%, transparent 60%, hsla(145,60%,40%,0.02) 100%)' }}
      />

      <div className="relative z-10">

        {/* ══════════════════════════════════════════
            CHAPTER 01 — HERO / CURIOSIDADE
        ══════════════════════════════════════════ */}
        <section ref={heroRef} id="hero" className="relative overflow-hidden min-h-[85vh] flex items-end">
          <div className="absolute inset-0">
            <img src={heroImg} alt="" className="w-full h-full object-cover brightness-[0.25] saturate-[0.7]"
              style={{ transform: 'translate3d(0,0,0)' }} data-parallax="0.08" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/40 via-[#050808]/70 to-[#050808]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-[#050808]/60" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pb-24 pt-28 w-full">
            {/* Breadcrumb */}
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-16 text-[10px] font-bold uppercase tracking-[0.4em] font-mono transition-colors">
              <ArrowLeft size={14} /> Soberania Financeira
            </Link>

            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                  <Send className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Review Editorial</span>
              </div>
            </motion.div>

            <motion.h1 initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="font-['Bebas_Neue'] text-5xl md:text-8xl lg:text-9xl tracking-tight uppercase mb-6 leading-[0.9]"
            >
              Wise<br />
              <span className="text-emerald-400">Análise Completa</span>
            </motion.h1>

            <motion.p initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Space_Grotesk']"
            >
              A fintech que matou o spread bancário. Conta multi-moeda com câmbio real,
              dados bancários locais em 10+ países e um cartão que funciona no mundo inteiro
              sem o roubo silencioso do IOF.
            </motion.p>

            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}
              className="mt-8 flex flex-wrap gap-3"
            >
              <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-sm">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                  40+ moedas · Câmbio real
                </span>
              </div>
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-wider font-mono">
                  Listada na LSE
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 02 — SPECS GRID / DADOS TÉCNICOS
        ══════════════════════════════════════════ */}
        <section ref={specsRef} id="ficha-tecnica" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 mb-2">Capítulo 02</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Ficha <span className="text-emerald-400">Técnica</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SPECS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div key={i} initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={i + 1}
                  className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-emerald-500/60 mb-3" />
                  <p className="font-['Bebas_Neue'] text-2xl text-foreground mb-1">{spec.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{spec.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 03 — COMO FUNCIONA / BENTO GRID
        ══════════════════════════════════════════ */}
        <section id="funcionalidades" className="bg-[#0a0d12]">
          <div className="max-w-5xl mx-auto px-6 py-24">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 mb-2">Capítulo 03</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
                O que a Wise <span className="text-emerald-400">oferece</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/30 to-transparent mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* App screenshot */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="border border-border/40 bg-white/[0.02] rounded-sm p-6 md:row-span-2 flex items-center justify-center"
              >
                <img src={appImg} alt="Interface da Wise" className="w-full max-w-xs rounded-sm opacity-90" />
              </motion.div>

              {FEATURES.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-emerald-500/20 transition-colors"
                >
                  <span className="text-emerald-500/30 font-['Bebas_Neue'] text-4xl">{item.step}</span>
                  <h3 className="font-['Space_Grotesk'] font-bold text-foreground text-lg mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 04 — WISE VS BANCOS TRADICIONAIS
        ══════════════════════════════════════════ */}
        <section id="comparativo" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 mb-2">Capítulo 04</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Wise vs <span className="text-destructive">Bancos Tradicionais</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Câmbio', wise: 'Taxa mid-market real (Google rate)', bank: 'Spread de 2-5% sobre câmbio comercial', color: 'emerald' },
              { title: 'Taxa por transferência', wise: '0.3% a 2% fixo e transparente', bank: 'R$ 80-250 por SWIFT + spread', color: 'emerald' },
              { title: 'Velocidade', wise: 'Minutos a horas (maioria)', bank: '2-5 dias úteis via SWIFT', color: 'emerald' },
              { title: 'IOF em gastos no exterior', wise: '0% (cartão Visa Debit)', bank: '6.38% (cartão de crédito)', color: 'emerald' },
              { title: 'Dados bancários locais', wise: 'EUA, Europa, UK, Austrália + 6', bank: 'Apenas no país de origem', color: 'emerald' },
              { title: 'Abertura de conta', wise: 'Online, 10 minutos', bank: 'Presencial, 1-5 dias', color: 'emerald' },
            ].map((row, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border/40 bg-white/[0.02] rounded-sm p-6"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">{row.title}</p>
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-['Space_Grotesk']">{row.wise}</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <X className="w-4 h-4 text-destructive/60 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground/60 font-['Space_Grotesk']">{row.bank}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 05 — PRÓS E CONTRAS / MEDO RACIONAL
        ══════════════════════════════════════════ */}
        <section ref={prosRef} id="pros-contras" className="bg-[#0a0d12]">
          <div className="max-w-5xl mx-auto px-6 py-24">
            <motion.div initial="hidden" animate={prosInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 mb-2">Capítulo 05</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
                Prós e <span className="text-destructive">Contras</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/30 to-transparent mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial="hidden" animate={prosInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
                className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-sm p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-['Bebas_Neue'] text-2xl text-emerald-400 uppercase">Vantagens</h3>
                </div>
                <ul className="space-y-4">
                  {PROS.map((pro, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk'] leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial="hidden" animate={prosInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
                className="border border-destructive/20 bg-destructive/[0.03] rounded-sm p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-5 h-5 text-destructive" />
                  <h3 className="font-['Bebas_Neue'] text-2xl text-destructive uppercase">Desvantagens</h3>
                </div>
                <ul className="space-y-4">
                  {CONS.map((con, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk'] leading-relaxed">
                      <X className="w-4 h-4 text-destructive/60 shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Alert Box — Aviso KYC/CRS */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 border border-amber-500/30 bg-amber-500/[0.05] rounded-sm p-6 flex gap-4 items-start"
            >
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['Space_Grotesk'] font-bold text-amber-400 text-sm mb-2 uppercase tracking-wider">Aviso de Privacidade</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">
                  A Wise cumpre o CRS (Common Reporting Standard) e reporta automaticamente para autoridades fiscais.
                  Seus saldos e movimentações em conta Wise são visíveis pela Receita Federal.
                  <strong className="text-foreground/80"> Se privacidade financeira é prioridade, a Wise é uma ferramenta tática, não uma solução de soberania.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 06 — VEREDICTO / SOLUÇÃO
        ══════════════════════════════════════════ */}
        <section ref={verdictRef} id="veredicto" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60 mb-2">Capítulo 06</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Veredicto <span className="text-emerald-400">Final</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-sm p-8"
            >
              <h3 className="font-['Bebas_Neue'] text-xl text-emerald-400 uppercase mb-4">Para quem serve</h3>
              <ul className="space-y-3">
                {VERDICT_FOR.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk']">
                    <ChevronRight className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
              className="border border-border/40 bg-white/[0.02] rounded-sm p-8"
            >
              <h3 className="font-['Bebas_Neue'] text-xl text-muted-foreground uppercase mb-4">Para quem não serve</h3>
              <ul className="space-y-3">
                {VERDICT_AGAINST.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground/60 font-['Space_Grotesk']">
                    <Lock className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA Premium — Affiliate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent p-10 md:p-14"
          >
            {/* Pulse ring */}
            <div className="absolute top-6 right-6 w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" />
              <span className="relative block w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/80">Convite exclusivo</span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4 leading-[0.95]">
              Abra sua conta Wise<br /><span className="text-emerald-400">com link de convite</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-8 font-['Space_Grotesk']">
              Crie sua conta Wise usando o link exclusivo e tenha acesso a todos os benefícios da conta multi-moeda
              com câmbio real. Abertura 100% online em menos de 10 minutos, sem burocracia bancária.
              Sua primeira transferência pode sair sem taxa.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-emerald-600 text-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_hsla(145,60%,40%,0.4)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative font-['Space_Grotesk']">Criar conta Wise</span>
                <ExternalLink size={14} className="relative" />
              </a>
              <Link
                to="/soberania-financeira/contas-internacionais/bank-of-georgia"
                className="inline-flex items-center gap-2 border border-border/50 text-muted-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:border-foreground/30 hover:text-foreground transition-colors font-['Space_Grotesk']"
              >
                Ver Bank of Georgia
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 07 — SOBERANIA CTA
        ══════════════════════════════════════════ */}
        <section id="soberania" className="bg-[#0a0d12]">
          <div className="max-w-5xl mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="border border-border/30 bg-white/[0.02] rounded-sm p-10 md:p-14 text-center"
            >
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase mb-4">
                Fintech não é <span className="text-destructive">soberania</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed mb-8 font-['Space_Grotesk']">
                A Wise é uma ferramenta excelente para transferências internacionais e diversificação cambial,
                mas nenhuma fintech substitui a autocustódia. A Wise reporta, exige KYC e pode bloquear contas.
                Para proteção real contra confisco e bloqueio, a resposta continua sendo Bitcoin com custódia própria.
              </p>
              <Link to="/bitcoin"
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-border/40 text-foreground font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm hover:bg-white/[0.08] hover:border-primary/20 transition-all font-['Space_Grotesk']"
              >
                Explorar protocolo Bitcoin <ChevronRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 08 — FAQ / SEO
        ══════════════════════════════════════════ */}
        <section ref={faqRef} id="faq" className="max-w-3xl mx-auto px-6 py-24 pb-32">
          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500/60">Capítulo 08</p>
                <h2 className="font-['Bebas_Neue'] text-2xl md:text-3xl tracking-tight uppercase">
                  Dúvidas sobre a Wise
                </h2>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-emerald-500/30 via-border/50 to-transparent" />
          </motion.div>

          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}
                  className="border border-border/30 rounded-sm bg-white/[0.02] px-6 data-[state=open]:border-emerald-500/20 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-5 text-foreground/90 font-['Space_Grotesk']">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 font-['Space_Grotesk']">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-6 pb-16">
          <div className="pt-12 border-t border-border/20 text-center">
            <p className="text-muted-foreground/30 text-[9px] font-black tracking-[0.5em] uppercase font-mono">
              Análise independente · Lord Junnior © 2026
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
