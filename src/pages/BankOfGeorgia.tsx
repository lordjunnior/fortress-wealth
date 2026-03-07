import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Shield, ChevronRight, ExternalLink, AlertTriangle,
  CreditCard, Globe, ArrowRightLeft, Eye, Lock, Check, X,
  HelpCircle, Building2, Smartphone, TrendingUp, Landmark,
  Banknote, Star, Plane, DollarSign,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import heroImg from '@/assets/bank-georgia-hero.jpg';
import appImg from '@/assets/bank-georgia-app.jpg';

/* ── Constants ── */
const MEMBERSHIP_LINK = '#'; // Link para membros do canal

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Specs ── */
const SPECS = [
  { label: 'Tipo', value: 'Banco Real', icon: Landmark },
  { label: 'Jurisdição', value: 'Geórgia 🇬🇪', icon: Globe },
  { label: 'Moedas', value: 'USD · EUR · GBP · GEL', icon: DollarSign },
  { label: 'Cartão', value: 'Visa / MC / Amex', icon: CreditCard },
  { label: 'Plano básico', value: '~10 GEL/mês', icon: Banknote },
  { label: 'Plano premium', value: '~30-60 GEL/mês', icon: Star },
];

/* ── Pros & Cons ── */
const PROS = [
  'Banco real, não fintech — estrutura sólida com agências físicas na Geórgia',
  'Conta multimoeda: USD, EUR, GBP e Lari Georgiano no mesmo app',
  'Limites muito maiores para saque em dinheiro vivo (USD, EUR, GBP)',
  'Crypto friendly — permite comprar Bitcoin e USDT via plataformas parceiras',
  'Cartão funciona em Visa, Mastercard e American Express',
  'Plano premium inclui gerente dedicado que compra passagens e reserva hotéis por você',
  'Acúmulo de pontos para viagens e compras (programa de milhas internacional)',
  'Conversão de moedas direto no app (Currency Exchange integrado)',
  'Transferências internacionais para qualquer banco no mundo (SWIFT)',
  'Possibilidade de investir em ações diretamente pelo app',
  'Abertura presencial entrega cartão no mesmo dia — sem burocracia',
  'Abertura remota disponível — não precisa viajar até a Geórgia',
  'Contas segregadas tipo "caixinhas" para organizar saldos',
  'Fora do ecossistema financeiro brasileiro — não sujeito ao Banco Central do Brasil',
];

const CONS = [
  'Plano premium (Solo) custa entre R$ 120-150/mês — investimento mensal considerável',
  'Investimentos via app recomendados apenas com abertura presencial',
  'App em inglês/georgiano — sem suporte em português',
  'Para abertura remota, necessário contratar serviço intermediário',
  'Primeiro cartão recebido presencialmente não tem nome impresso',
  'Necessário endereço local (Airbnb ou booking aceitos na abertura presencial)',
];

/* ── Features ── */
const FEATURES = [
  { step: '01', title: 'Conta Universal Multimoeda', desc: 'Escolha sua moeda base (USD, EUR ou GBP) e receba em todas as outras. Saldos segregados por moeda, visíveis no mesmo app.' },
  { step: '02', title: 'Conversão Instantânea', desc: 'Currency Exchange integrado: converta EUR → USD, GBP → GEL ou qualquer combinação diretamente no app com taxas competitivas.' },
  { step: '03', title: 'Transferências Internacionais', desc: 'Envie para Bank of America, Revolut, Wise ou qualquer banco no mundo via SWIFT. Tudo dentro do próprio app, sem intermediários.' },
  { step: '04', title: 'Programa de Pontos', desc: 'Acumule pontos a cada transação. No plano Solo, seu gerente pode até comprar passagens aéreas e reservar hotéis usando seus pontos.' },
];

/* ── FAQ ── */
const FAQ_DATA = [
  {
    q: 'O que é o Bank of Georgia e por que ele é diferente de fintechs?',
    a: 'O Bank of Georgia é um banco tradicional com décadas de história, agências físicas e estrutura regulatória completa na Geórgia. Diferente de fintechs que podem travar valores, bloquear transações ou fechar contas arbitrariamente, um banco real oferece estabilidade institucional e limites muito maiores para movimentação.',
  },
  {
    q: 'É possível abrir conta no Bank of Georgia remotamente?',
    a: 'Sim. Existem duas formas: presencialmente em uma agência na Geórgia (mais rápido, cartão no mesmo dia) ou remotamente através de serviços intermediários especializados. Para o passo a passo da abertura remota, é necessário acessar o conteúdo exclusivo para membros.',
  },
  {
    q: 'Quais moedas posso ter na minha conta?',
    a: 'Você pode ter saldos em dólares americanos (USD), euros (EUR), libras esterlinas (GBP) e Lari Georgiano (GEL). Ao abrir a conta, você escolhe sua moeda universal (base), mas pode receber e manter saldo em todas as outras moedas simultaneamente.',
  },
  {
    q: 'O Bank of Georgia é crypto friendly?',
    a: 'Sim. O Bank of Georgia permite que você compre Bitcoin e USDT através de plataformas parceiras integradas. A Geórgia como jurisdição tem uma postura favorável a criptomoedas, o que torna o banco uma opção interessante para quem opera com cripto.',
  },
  {
    q: 'Quanto custa manter uma conta no Bank of Georgia?',
    a: 'O plano básico custa aproximadamente 10 GEL/mês (cerca de R$ 20). O plano premium (Solo) custa entre 30-60 GEL/mês (R$ 120-150), mas inclui gerente dedicado, programa de milhas, acesso a salas VIP e serviços de concierge para viagens.',
  },
  {
    q: 'Posso sacar dinheiro vivo em outras moedas?',
    a: 'Sim, e esse é um dos grandes diferenciais. Você pode sacar dinheiro físico em dólares, euros e libras esterlinas com limites significativamente maiores do que fintechs oferecem. Ideal para quem viaja ou precisa de cash em diferentes moedas.',
  },
  {
    q: 'O Bank of Georgia reporta para a Receita Federal do Brasil?',
    a: 'Não diretamente. O Bank of Georgia está sob jurisdição da Geórgia e não tem acordos automáticos de reporte com o Brasil nos mesmos moldes que bancos europeus ou americanos. Porém, é importante manter suas obrigações fiscais em dia conforme a legislação do seu país de residência.',
  },
  {
    q: 'Quais as vantagens do plano premium (Solo)?',
    a: 'O plano Solo oferece: gerente dedicado que pode comprar passagens aéreas e reservar hotéis por você, acúmulo acelerado de pontos para viagens, acesso a benefícios Visa/Mastercard premium, limites maiores de saque e transferência, e suporte prioritário.',
  },
  {
    q: 'Preciso de comprovante de endereço na Geórgia para abrir conta?',
    a: 'Na abertura presencial, um endereço de Airbnb ou Booking é aceito como comprovante. Não precisa ser residente na Geórgia. Na abertura remota, o serviço intermediário cuida de toda a documentação necessária.',
  },
  {
    q: 'Bank of Georgia é melhor que autocustódia de Bitcoin?',
    a: 'São ferramentas complementares. O Bank of Georgia é excelente para movimentação bancária internacional fora do sistema brasileiro, mas não substitui a autocustódia de Bitcoin para proteção patrimonial absoluta contra confisco e bloqueio.',
  },
];

/* ── Verdict ── */
const VERDICT_FOR = [
  'Quem precisa de uma conta bancária internacional real, não fintech',
  'Quem quer sacar dinheiro vivo em múltiplas moedas com limites altos',
  'Quem busca sair do ecossistema financeiro brasileiro',
  'Nômades digitais e empreendedores internacionais',
  'Quem opera com cripto e quer um banco que não bloqueie transações',
];

const VERDICT_AGAINST = [
  'Quem não quer pagar mensalidade bancária',
  'Quem busca privacidade absoluta (prefira cartões sem KYC)',
  'Quem não pretende movimentar volumes significativos',
  'Quem já pratica autocustódia total e não precisa de sistema bancário',
];

export default function BankOfGeorgia() {
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
        <title>Bank of Georgia: Conta Bancária Internacional Real — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise completa do Bank of Georgia: banco real na Geórgia, conta multimoeda (USD/EUR/GBP), crypto friendly, saques em dinheiro vivo e abertura remota. Prós, contras e veredicto." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/contas-internacionais/bank-of-georgia" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Bank of Georgia: Conta Bancária Internacional Real — Análise Completa 2026',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          datePublished: '2026-03-07',
          description: 'Review editorial completo do Bank of Georgia: banco real crypto friendly na Geórgia com conta multimoeda e abertura remota.',
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map(f => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })}</script>
      </Helmet>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      <div className="relative z-10">

        {/* ══════════════════════════════════════════
            HERO — CURIOSIDADE
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="" className="w-full h-full object-cover brightness-[0.3] saturate-[0.8]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/60 via-[#050808]/80 to-[#050808]" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-24">
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-16 text-[10px] font-bold uppercase tracking-[0.4em] font-mono transition-colors">
              <ArrowLeft size={14} /> Soberania Financeira
            </Link>

            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-primary" />
                </div>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px] font-mono">Review Editorial</span>
              </div>
            </motion.div>

            <motion.h1 initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="font-['Bebas_Neue'] text-5xl md:text-8xl tracking-tight uppercase mb-6 leading-[0.9]"
            >
              Bank of Georgia<br />
              <span className="text-primary">Análise Completa</span>
            </motion.h1>

            <motion.p initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Space_Grotesk']"
            >
              Um banco tradicional na Geórgia 🇬🇪 — não é fintech. Ideal para quem busca uma conta bancária internacional real,
              com estrutura sólida, crypto friendly e possibilidade de movimentar volumes maiores.
            </motion.p>

            {/* Badge */}
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}
              className="mt-8 inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-sm"
            >
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                Banco real · Fora do sistema financeiro brasileiro
              </span>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SPECS GRID — DADOS TÉCNICOS
        ══════════════════════════════════════════ */}
        <section ref={specsRef} className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Ficha técnica</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Especificações <span className="text-primary">do Banco</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SPECS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div key={i} initial="hidden" animate={specsInView ? 'visible' : 'hidden'} variants={fadeUp} custom={i + 1}
                  className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-primary/60 mb-3" />
                  <p className="font-['Bebas_Neue'] text-2xl text-foreground mb-1">{spec.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{spec.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            COMO FUNCIONA — BENTO GRID
        ══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Funcionalidades</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              O que o app <span className="text-primary">oferece</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* App screenshot */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="border border-border/40 bg-white/[0.02] rounded-sm p-6 md:row-span-2 flex items-center justify-center"
            >
              <img src={appImg} alt="Interface do Bank of Georgia" className="w-full max-w-xs rounded-sm opacity-90" />
            </motion.div>

            {FEATURES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="border border-border/40 bg-white/[0.02] rounded-sm p-6 hover:border-primary/20 transition-colors"
              >
                <span className="text-primary/30 font-['Bebas_Neue'] text-4xl">{item.step}</span>
                <h3 className="font-['Space_Grotesk'] font-bold text-foreground text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABERTURA DE CONTA
        ══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Como abrir</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Duas formas de <span className="text-primary">abrir conta</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-['Bebas_Neue'] text-xl text-emerald-400 uppercase">Presencialmente</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Vá a uma agência do Bank of Georgia em Tbilisi',
                  'Leve passaporte + endereço local (Airbnb aceito)',
                  'Cartão entregue no mesmo dia — sem espera',
                  'Acesso completo a investimentos e todas as features',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk'] leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-500/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="border border-primary/20 bg-primary/[0.03] rounded-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-['Bebas_Neue'] text-xl text-primary uppercase">Remotamente</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Sem necessidade de viajar até a Geórgia',
                  'Processo intermediado por serviço especializado',
                  'Conta 100% funcional com app e cartão',
                  'Passo a passo exclusivo para membros do canal',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk'] leading-relaxed">
                    <Check className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PRÓS E CONTRAS — MEDO RACIONAL
        ══════════════════════════════════════════ */}
        <section ref={prosRef} className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div initial="hidden" animate={prosInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Análise sem filtro</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Prós e <span className="text-destructive">Contras</span>
            </h2>
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

          {/* Crypto Friendly Alert */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 border border-emerald-500/30 bg-emerald-500/[0.05] rounded-sm p-6 flex gap-4 items-start"
          >
            <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-['Space_Grotesk'] font-bold text-emerald-400 text-sm mb-2 uppercase tracking-wider">Diferencial: Banco Real vs. Fintech</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">
                A grande vantagem do Bank of Georgia sobre fintechs é a estabilidade institucional.
                Fintechs podem travar valores, bloquear transações e fechar contas sem aviso prévio.
                Um banco real tem regulação bancária completa, seguro de depósito e obrigações legais que protegem o correntista.
                <strong className="text-foreground/80"> Para movimentação de volumes maiores, um banco real é incomparavelmente mais seguro que qualquer fintech.</strong>
              </p>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            VEREDICTO — SOLUÇÃO
        ══════════════════════════════════════════ */}
        <section ref={verdictRef} className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Conclusão editorial</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Veredicto <span className="text-primary">Final</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div initial="hidden" animate={verdictInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="border border-primary/20 bg-primary/[0.03] rounded-sm p-8"
            >
              <h3 className="font-['Bebas_Neue'] text-xl text-primary uppercase mb-4">Para quem serve</h3>
              <ul className="space-y-3">
                {VERDICT_FOR.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground font-['Space_Grotesk']">
                    <ChevronRight className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
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

          {/* CTA Premium — Membership */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-white/[0.02] to-transparent p-10 md:p-14"
          >
            {/* Pulse ring */}
            <div className="absolute top-6 right-6 w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
              <span className="relative block w-3 h-3 rounded-full bg-primary" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-5 h-5 text-primary" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80">Conteúdo exclusivo para membros</span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4 leading-[0.95]">
              Quer abrir sua conta<br /><span className="text-primary">remotamente?</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-8 font-['Space_Grotesk']">
              Aprenda o passo a passo completo para abrir sua conta no Bank of Georgia sem sair de casa.
              Tutorial exclusivo com todos os detalhes, serviços intermediários e dicas práticas.
              Torne-se membro por um valor de uma pizza.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={MEMBERSHIP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative font-['Space_Grotesk']">Tornar-se membro</span>
                <ExternalLink size={14} className="relative" />
              </a>
              <Link
                to="/autocustodia"
                className="inline-flex items-center gap-2 border border-border/50 text-muted-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:border-foreground/30 hover:text-foreground transition-colors font-['Space_Grotesk']"
              >
                Prefiro autocustódia
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SOBERANIA CTA
        ══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border border-border/30 bg-white/[0.02] rounded-sm p-10 md:p-14 text-center"
          >
            <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase mb-4">
              Conta bancária não é <span className="text-destructive">soberania</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed mb-8 font-['Space_Grotesk']">
              O Bank of Georgia é uma excelente ferramenta para diversificação bancária internacional,
              mas nenhum banco substitui a autocustódia. Para proteção real contra confisco, reporte e bloqueio,
              a resposta continua sendo Bitcoin com custódia própria.
            </p>
            <Link to="/bitcoin"
              className="inline-flex items-center gap-2 bg-white/[0.05] border border-border/40 text-foreground font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm hover:bg-white/[0.08] hover:border-primary/20 transition-all font-['Space_Grotesk']"
            >
              Explorar protocolo Bitcoin <ChevronRight size={14} />
            </Link>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ — SEO
        ══════════════════════════════════════════ */}
        <section ref={faqRef} className="max-w-3xl mx-auto px-6 pb-32">
          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">Perguntas frequentes</p>
                <h2 className="font-['Bebas_Neue'] text-2xl md:text-3xl tracking-tight uppercase">
                  Dúvidas sobre o Bank of Georgia
                </h2>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-primary/30 via-border/50 to-transparent" />
          </motion.div>

          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}
                  className="border border-border/30 rounded-sm bg-white/[0.02] px-6 data-[state=open]:border-primary/20 transition-colors duration-300"
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
