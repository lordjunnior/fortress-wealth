import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Shield, ChevronRight, ExternalLink, AlertTriangle,
  CreditCard, Globe, ArrowRightLeft, Eye, Lock, Check, X,
  HelpCircle, Building2, Smartphone, TrendingUp, Landmark,
  Banknote, Star, Zap, DollarSign, Users, Clock, Send, Briefcase,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import heroImg from '@/assets/payoneer-hero.jpg';
import appImg from '@/assets/payoneer-app.jpg';

/* ── Constants ── */
const AFFILIATE_LINK = '#'; // Placeholder — user can add affiliate link later

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Specs ── */
const SPECS = [
  { label: 'Tipo', value: 'Fintech / PSP', icon: Building2 },
  { label: 'Sede', value: 'Nova York, EUA', icon: Globe },
  { label: 'Moedas', value: 'USD · EUR · GBP · JPY +', icon: DollarSign },
  { label: 'Cartão', value: 'Mastercard Prepaid', icon: CreditCard },
  { label: 'Foco principal', value: 'Freelancers & B2B', icon: Briefcase },
  { label: 'Fundação', value: '2005 (20+ anos)', icon: Clock },
];

/* ── Pros & Cons ── */
const PROS = [
  'Dados bancários locais nos EUA (ACH), Europa (IBAN), UK (Sort Code), Japão e Austrália',
  'Integração nativa com marketplaces: Amazon, Fiverr, Upwork, Airbnb, Google AdSense',
  'Empresa com mais de 20 anos de mercado — solidez institucional comprovada',
  'Regulada nos EUA (FinCEN), Europa (FCA) e em múltiplas jurisdições',
  'Cartão Mastercard prepaid para saques e compras internacionais',
  'Permite receber de clientes corporativos via transferência bancária local',
  'Conversão de moedas dentro do app com taxas competitivas',
  'Pagamento em massa (Mass Payouts) para quem paga fornecedores internacionais',
  'Saque direto para conta bancária brasileira em reais',
  'App em português com suporte ao cliente em múltiplos idiomas',
  'Ideal para quem trabalha com e-commerce cross-border e exportação de serviços',
  'Capital de giro disponível para vendedores qualificados (Working Capital)',
  'Verificação de identidade relativamente rápida (1-3 dias)',
];

const CONS = [
  'Exige KYC completo — documentos, selfie e comprovante de atividade profissional',
  'Taxa de câmbio não é mid-market: spread de até 2% sobre a conversão',
  'Taxa de saque para conta bancária: até 2% do valor convertido',
  'Cartão Mastercard prepaid tem limites de saque e taxas em ATMs',
  'Reporta para autoridades fiscais via CRS (Common Reporting Standard)',
  'Conta pode ser bloqueada por suspeita de atividade irregular',
  'Não é crypto friendly — transferências para exchanges podem ser recusadas',
  'Foco em B2B/freelancer: menos útil para quem não recebe de empresas internacionais',
  'Taxas de recebimento podem ser altas dependendo da moeda e do corredor',
  'Não oferece investimentos ou renda fixa dentro da plataforma',
];

/* ── Features ── */
const FEATURES = [
  { step: '01', title: 'Recebimento Global', desc: 'Receba pagamentos de marketplaces (Amazon, Fiverr, Upwork, Airbnb) e clientes corporativos em USD, EUR, GBP e mais 4 moedas com dados bancários locais. O dinheiro cai como se você tivesse conta no país do pagador.' },
  { step: '02', title: 'Saque para Banco Brasileiro', desc: 'Converta seus saldos em moeda estrangeira diretamente para reais e saque para qualquer banco brasileiro. O processo leva 2-5 dias úteis dependendo do valor e da verificação.' },
  { step: '03', title: 'Cartão Mastercard', desc: 'Cartão prepaid Mastercard para saques em caixas eletrônicos no mundo inteiro e compras online/presenciais. Saldo em USD convertido automaticamente na moeda local do país onde você está.' },
  { step: '04', title: 'Pagamentos em Massa', desc: 'Para empresas que pagam fornecedores internacionais, a Payoneer oferece Mass Payouts: envie pagamentos para centenas de beneficiários em diferentes países com uma única operação.' },
];

/* ── FAQ ── */
const FAQ_DATA = [
  {
    q: 'O que é a Payoneer e para quem ela serve?',
    a: 'A Payoneer é uma fintech americana fundada em 2005, especializada em pagamentos internacionais para freelancers, exportadores de serviços e vendedores de e-commerce cross-border. Ela fornece dados bancários locais em múltiplos países para que você receba como se tivesse conta local, além de permitir saque direto para bancos brasileiros.',
  },
  {
    q: 'Payoneer é segura? Posso confiar meu dinheiro nela?',
    a: 'A Payoneer é regulada pelo FinCEN nos EUA, pela FCA no Reino Unido e por autoridades financeiras em diversas jurisdições. Com mais de 20 anos de operação e milhões de usuários ativos, é uma das plataformas mais estabelecidas do mercado de pagamentos internacionais. Entretanto, como toda fintech, pode bloquear contas por suspeita de irregularidade.',
  },
  {
    q: 'Qual a diferença entre Payoneer e Wise?',
    a: 'A Wise é focada em transferências pessoais com câmbio mid-market real (sem spread). A Payoneer é focada em recebimento de pagamentos corporativos e marketplaces. Se você recebe de Amazon, Fiverr ou clientes B2B, a Payoneer é mais adequada. Se você faz transferências pessoais, a Wise tem melhor câmbio.',
  },
  {
    q: 'A Payoneer reporta para a Receita Federal do Brasil?',
    a: 'Sim. A Payoneer cumpre o CRS (Common Reporting Standard) e reporta informações financeiras para as autoridades fiscais dos países onde os titulares residem. Se você é residente fiscal no Brasil, seus saldos e movimentações serão reportados automaticamente.',
  },
  {
    q: 'Posso usar a Payoneer para receber da Amazon?',
    a: 'Sim, e esse é um dos usos mais populares. A Payoneer tem integração direta com Amazon, permitindo que vendedores recebam seus pagamentos em USD, EUR ou GBP sem precisar de conta bancária no país do marketplace. O saldo pode ser sacado para banco brasileiro em reais.',
  },
  {
    q: 'Quanto a Payoneer cobra de taxa?',
    a: 'As taxas variam por tipo de operação: recebimento de marketplaces geralmente é gratuito, conversão de moeda tem spread de até 2%, saque para banco brasileiro cobra até 2% do valor, e o cartão Mastercard tem taxas de saque em ATM. Não há mensalidade para manter a conta ativa.',
  },
  {
    q: 'Posso usar Payoneer para comprar Bitcoin?',
    a: 'Não é recomendado. A Payoneer não é crypto friendly e pode recusar transferências para exchanges de criptomoedas. Para operações com Bitcoin, use a Payoneer apenas como ponte de recebimento e saque para banco, e então opere cripto por outras vias.',
  },
  {
    q: 'A Payoneer tem cartão que funciona no Brasil?',
    a: 'Sim. O cartão Mastercard prepaid da Payoneer funciona em qualquer máquina que aceite Mastercard no Brasil e no mundo. Porém, o saldo é mantido em USD e a conversão para BRL no ponto de venda inclui taxa de câmbio. Para uso no Brasil, pode ser mais vantajoso sacar para conta bancária.',
  },
  {
    q: 'Qual a diferença entre Payoneer e PayPal?',
    a: 'A Payoneer oferece dados bancários locais em múltiplos países (o PayPal não), tem taxas geralmente menores para recebimentos B2B e permite saque direto para banco brasileiro com câmbio mais competitivo. O PayPal é mais popular para transações P2P e compras online, mas cobra taxas mais altas em operações internacionais.',
  },
  {
    q: 'Payoneer é boa opção para soberania financeira?',
    a: 'A Payoneer é uma ferramenta tática excelente para quem precisa receber pagamentos internacionais. Porém, não é soberania: exige KYC total, reporta via CRS e pode bloquear contas. Para diversificação internacional é útil, mas para proteção real contra confisco, a resposta é autocustódia de Bitcoin.',
  },
];

/* ── Verdict ── */
const VERDICT_FOR = [
  'Freelancers que recebem de clientes internacionais ou marketplaces',
  'Vendedores de e-commerce cross-border (Amazon, eBay, Shopify)',
  'Quem precisa de dados bancários locais nos EUA, Europa ou UK para recebimento',
  'Empresas que fazem pagamentos em massa para fornecedores internacionais',
  'Quem já usa Upwork, Fiverr, Airbnb ou Google AdSense',
];

const VERDICT_AGAINST = [
  'Quem busca privacidade financeira (Payoneer reporta via CRS)',
  'Quem quer o melhor câmbio possível (Wise tem câmbio real melhor)',
  'Quem opera exclusivamente com cripto (Payoneer pode bloquear)',
  'Quem não recebe pagamentos de empresas internacionais (pouco útil para uso pessoal)',
];

export default function Payoneer() {
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
        <title>Payoneer: Receba Pagamentos Internacionais — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise completa da Payoneer: receba de Amazon, Fiverr e clientes globais com dados bancários locais em 10+ países. Cartão Mastercard, taxas, prós, contras e veredicto." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/payoneer" />
        <meta property="og:title" content="Payoneer: Receba Pagamentos Internacionais — Análise Completa 2026" />
        <meta property="og:description" content="Review editorial da Payoneer: dados bancários locais, integração com marketplaces e saque para banco brasileiro. Vale a pena?" />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/payoneer" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-image.png" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Payoneer: Receba Pagamentos Internacionais — Análise Completa 2026',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          datePublished: '2026-03-07',
          description: 'Review editorial completo da Payoneer: fintech de pagamentos internacionais para freelancers e e-commerce cross-border.',
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
            { '@type': 'ListItem', position: 3, name: 'Payoneer', item: 'https://lordjunnior.com.br/soberania-financeira/contas-internacionais/payoneer' },
          ],
        })}</script>
      </Helmet>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      {/* Light Beam */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, hsla(20,80%,50%,0.03) 0%, transparent 40%, transparent 60%, hsla(20,80%,50%,0.02) 100%)' }}
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
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-16 text-[10px] font-bold uppercase tracking-[0.4em] font-mono transition-colors">
              <ArrowLeft size={14} /> Soberania Financeira
            </Link>

            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm border border-orange-500/20 bg-orange-500/5 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-orange-400 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Review Editorial</span>
              </div>
            </motion.div>

            <motion.h1 initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="font-['Bebas_Neue'] text-5xl md:text-8xl lg:text-9xl tracking-tight uppercase mb-6 leading-[0.9]"
            >
              Payoneer<br />
              <span className="text-orange-400">Análise Completa</span>
            </motion.h1>

            <motion.p initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Space_Grotesk']"
            >
              A plataforma que transformou freelancers brasileiros em profissionais globais.
              Dados bancários locais nos EUA, Europa e UK para receber de Amazon, Fiverr
              e qualquer cliente corporativo como se você estivesse no país deles.
            </motion.p>

            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}
              className="mt-8 flex flex-wrap gap-3"
            >
              <div className="inline-flex items-center gap-2 border border-orange-500/20 bg-orange-500/5 px-4 py-2 rounded-sm">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider font-mono">
                  B2B & Freelancers
                </span>
              </div>
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-wider font-mono">
                  20+ anos de mercado
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 02 — SPECS GRID
        ══════════════════════════════════════════ */}
        <section ref={specsRef} id="ficha-tecnica" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60 mb-2">Capítulo 02</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Ficha <span className="text-orange-400">Técnica</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SPECS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div key={i} initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={i + 1}
                  className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-orange-500/60 mb-3" />
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
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60 mb-2">Capítulo 03</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
                O que a Payoneer <span className="text-orange-400">oferece</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/30 to-transparent mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="border border-border/40 bg-white/[0.02] rounded-sm p-6 md:row-span-2 flex items-center justify-center"
              >
                <img src={appImg} alt="Interface da Payoneer" className="w-full max-w-xs rounded-sm opacity-90" />
              </motion.div>

              {FEATURES.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-orange-500/20 transition-colors"
                >
                  <span className="text-orange-500/30 font-['Bebas_Neue'] text-4xl">{item.step}</span>
                  <h3 className="font-['Space_Grotesk'] font-bold text-foreground text-lg mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 04 — PAYONEER VS WISE VS BANCOS
        ══════════════════════════════════════════ */}
        <section id="comparativo" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60 mb-2">Capítulo 04</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Payoneer vs <span className="text-orange-400">Wise</span> vs <span className="text-destructive">Bancos</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground p-4 border-b border-border/30">Critério</th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400 p-4 border-b border-border/30">Payoneer</th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 p-4 border-b border-border/30">Wise</th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60 p-4 border-b border-border/30">Banco BR</th>
                </tr>
              </thead>
              <tbody className="font-['Space_Grotesk'] text-sm">
                {[
                  { criterion: 'Foco', payoneer: 'B2B / Freelancers', wise: 'Pessoal / Freelancers', bank: 'Generalista' },
                  { criterion: 'Câmbio', payoneer: 'Spread ~2%', wise: 'Mid-market (real)', bank: 'Spread 2-5%' },
                  { criterion: 'Dados bancários locais', payoneer: 'EUA, EU, UK, JP, AU', wise: 'EUA, EU, UK + 7', bank: 'Apenas Brasil' },
                  { criterion: 'Integração marketplaces', payoneer: 'Amazon, Fiverr, Upwork', wise: 'Limitada', bank: 'Nenhuma' },
                  { criterion: 'Saque para banco BR', payoneer: 'Sim (taxa ~2%)', wise: 'Sim (taxa ~1.5%)', bank: 'N/A' },
                  { criterion: 'Crypto friendly', payoneer: 'Não', wise: 'Parcialmente', bank: 'Não' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-muted-foreground font-medium">{row.criterion}</td>
                    <td className="p-4 text-foreground">{row.payoneer}</td>
                    <td className="p-4 text-foreground">{row.wise}</td>
                    <td className="p-4 text-muted-foreground/60">{row.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 05 — PRÓS E CONTRAS
        ══════════════════════════════════════════ */}
        <section ref={prosRef} id="pros-contras" className="bg-[#0a0d12]">
          <div className="max-w-5xl mx-auto px-6 py-24">
            <motion.div initial="hidden" animate={prosInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60 mb-2">Capítulo 05</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
                Prós e <span className="text-destructive">Contras</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/30 to-transparent mt-6" />
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

            {/* Alert Box */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 border border-amber-500/30 bg-amber-500/[0.05] rounded-sm p-6 flex gap-4 items-start"
            >
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['Space_Grotesk'] font-bold text-amber-400 text-sm mb-2 uppercase tracking-wider">Aviso sobre Marketplaces</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">
                  Se você recebe exclusivamente de marketplaces como Amazon ou Fiverr, a Payoneer é provavelmente
                  a melhor opção pelo custo-benefício e integração nativa. Para transferências pessoais ou
                  câmbio puro, a Wise oferece taxa mid-market real (melhor câmbio).
                  <strong className="text-foreground/80"> Use cada ferramenta para o que ela foi desenhada.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CHAPTER 06 — VEREDICTO
        ══════════════════════════════════════════ */}
        <section ref={verdictRef} id="veredicto" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60 mb-2">Capítulo 06</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase">
              Veredicto <span className="text-orange-400">Final</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/30 to-transparent mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="border border-orange-500/20 bg-orange-500/[0.03] rounded-sm p-8"
            >
              <h3 className="font-['Bebas_Neue'] text-xl text-orange-400 uppercase mb-4">Para quem serve</h3>
              <ul className="space-y-3">
                {VERDICT_FOR.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk']">
                    <ChevronRight className="w-4 h-4 text-orange-500/60 shrink-0 mt-0.5" />
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm border border-orange-500/30 bg-gradient-to-br from-orange-500/[0.08] via-white/[0.02] to-transparent p-10 md:p-14"
          >
            <div className="absolute top-6 right-6 w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-40" />
              <span className="relative block w-3 h-3 rounded-full bg-orange-500" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Send className="w-5 h-5 text-orange-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/80">Receba pagamentos globais</span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4 leading-[0.95]">
              Abra sua conta<br /><span className="text-orange-400">Payoneer</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-8 font-['Space_Grotesk']">
              Crie sua conta Payoneer e comece a receber pagamentos de clientes e marketplaces internacionais
              com dados bancários locais nos EUA, Europa e UK. Abertura 100% online, sem mensalidade.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-orange-600 text-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_hsla(20,80%,50%,0.4)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative font-['Space_Grotesk']">Criar conta Payoneer</span>
                <ExternalLink size={14} className="relative" />
              </a>
              <Link
                to="/soberania-financeira/contas-internacionais/wise"
                className="inline-flex items-center gap-2 border border-border/50 text-muted-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:border-foreground/30 hover:text-foreground transition-colors font-['Space_Grotesk']"
              >
                Comparar com Wise
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
                A Payoneer é uma ferramenta tática poderosa para quem precisa receber pagamentos internacionais,
                mas nenhuma fintech substitui a autocustódia. A Payoneer reporta via CRS, exige KYC e pode
                bloquear contas. Para proteção real contra confisco e bloqueio, Bitcoin com custódia própria.
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
            CHAPTER 08 — FAQ
        ══════════════════════════════════════════ */}
        <section ref={faqRef} id="faq" className="max-w-3xl mx-auto px-6 py-24 pb-32">
          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm border border-orange-500/20 bg-orange-500/5 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-500/60">Capítulo 08</p>
                <h2 className="font-['Bebas_Neue'] text-2xl md:text-3xl tracking-tight uppercase">
                  Dúvidas sobre a Payoneer
                </h2>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-orange-500/30 via-border/50 to-transparent" />
          </motion.div>

          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}
                  className="border border-border/30 rounded-sm bg-white/[0.02] px-6 data-[state=open]:border-orange-500/20 transition-colors duration-300"
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
