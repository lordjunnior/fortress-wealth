import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Shield, ChevronRight, ExternalLink, AlertTriangle,
  CreditCard, Globe, ArrowRightLeft, Eye, Lock, Check, X,
  HelpCircle, Zap, Building2, Smartphone, TrendingUp,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import heroImg from '@/assets/neobankless-hero.jpg';
import appImg from '@/assets/neobankless-app.jpg';

/* ── Constants ── */
const AFFILIATE_LINK = 'https://neobankless.com/join?code=X7W';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Specs ── */
const SPECS = [
  { label: 'Limite PIX/dia', value: 'R$ 50.000', icon: Zap },
  { label: 'Taxa conversão', value: '0.5%', icon: ArrowRightLeft },
  { label: 'Sede', value: 'Florianópolis, BR', icon: Building2 },
  { label: 'Cartão', value: 'Visa Infinite', icon: CreditCard },
  { label: 'Moedas', value: 'BRL · USD · EUR', icon: Globe },
  { label: 'Cripto suportado', value: 'USDC · USDT', icon: TrendingUp },
];

/* ── Pros & Cons ── */
const PROS = [
  'Limite de R$ 50.000/dia via PIX — muito acima de alternativas brasileiras',
  'Taxa de 0.5% — inferior a exchanges e plataformas tradicionais',
  'Conversão BRL → USDC direta, sem intermediários complexos',
  'Suporte a envios em EUR — ideal para quem está migrando para Europa',
  'Cartão Visa Infinite com benefícios Visa (sala VIP, seguro viagem, no-show)',
  'Possibilidade de sacar USDC em euros para conta própria',
  'Interface simples e direta, sem burocracia excessiva por transação',
];

const CONS = [
  'Exige CPF na abertura — provável reporte ao COAF e Receita Federal',
  'Sede em Florianópolis — sujeita às regulações brasileiras de 2026',
  'Envios apenas para si mesmo (após regulação do Banco Central)',
  'Cartão disponível apenas por convite limitado',
  'Rendimento (earn) abaixo do tesouro americano — não vale a pena',
  'Limite USDC → BRL de apenas R$ 10.000/dia (assimétrico)',
  'Sem diferencial real de privacidade em relação a exchanges tradicionais',
];

/* ── FAQ ── */
const FAQ_DATA = [
  {
    q: 'O que é a Neobankless e como funciona?',
    a: 'A Neobankless é uma fintech com sede em Florianópolis que oferece uma conta internacional com suporte a BRL, USD (via stablecoins) e EUR. Você pode receber via PIX, converter para USDC e enviar para contas em euros ou cripto.',
  },
  {
    q: 'A Neobankless reporta transações para a Receita Federal?',
    a: 'Muito provavelmente sim. A plataforma exige CPF na abertura, tem sede no Brasil e está sujeita às regulações de 2026. Um dos fundadores confirmou em redes sociais que a empresa se submete a todas as regulamentações governamentais.',
  },
  {
    q: 'Qual a diferença entre Neobankless e exchanges tradicionais?',
    a: 'A principal vantagem é a taxa de 0.5% (menor que muitas exchanges) e o limite de R$ 50.000/dia via PIX. Porém, em termos de privacidade, não há diferencial significativo — ambas exigem KYC e provavelmente reportam.',
  },
  {
    q: 'O cartão Visa Infinite da Neobankless vale a pena?',
    a: 'Se liberado para você, sim. O cartão Visa Infinite oferece benefícios providos pela própria Visa (não pelo banco emissor): seguro no-show, extravio de malas, seguro locação veicular e acesso a salas VIP via Visa Airport Companion. São benefícios premium reais.',
  },
  {
    q: 'Posso usar a Neobankless após dar saída fiscal do Brasil?',
    a: 'Essa é a grande questão. Se a plataforma aceitar seu CPF mesmo após a saída fiscal, e você não for mais residente tributário no Brasil, a conta pode se tornar interessante por potencialmente não estar sujeita ao reporte brasileiro. Porém, isso não está claramente documentado pela empresa.',
  },
  {
    q: 'Neobankless é melhor que Bitcoin para proteção patrimonial?',
    a: 'Não. A Neobankless é uma ferramenta de conveniência para movimentação de valores, não de soberania. Para proteção patrimonial real, autocustódia de Bitcoin continua sendo a única solução onde nenhum terceiro pode confiscar, bloquear ou reportar seus ativos.',
  },
  {
    q: 'Como abrir conta na Neobankless?',
    a: 'Atualmente, a Neobankless funciona por convite. Você precisa acessar um link de convite de um founder existente para se tornar parte da plataforma. Após o cadastro, passa pelo KYC básico (CPF e documentos) e ganha acesso ao app.',
  },
  {
    q: 'A Neobankless é segura e legalizada?',
    a: 'A empresa opera dentro das regulamentações brasileiras e se submete às normas do Banco Central. Isso significa que é legal e regulada, mas também significa que não oferece vantagens de privacidade em relação ao sistema bancário tradicional.',
  },
];

/* ── Verdict ── */
const VERDICT_FOR = [
  'Quem precisa converter BRL → stablecoin com taxa baixa',
  'Quem está migrando para Europa e precisa de envio em EUR',
  'Quem já tem dados reportados e quer uma alternativa mais barata',
  'Quem valoriza o cartão Visa Infinite',
];

const VERDICT_AGAINST = [
  'Quem busca privacidade financeira real',
  'Quem não quer CPF vinculado a transações cripto',
  'Quem já pratica autocustódia e usa DEX',
  'Quem busca rendimentos em stablecoins',
];

export default function Neobankless() {
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
        <title>Neobankless: Conta Global Cripto — Análise Completa 2026 | Lord Junnior</title>
        <meta name="description" content="Análise honesta da Neobankless: conta internacional com PIX, conversão BRL→USDC a 0.5%, cartão Visa Infinite. Veja prós, contras e se ela reporta para a Receita Federal." />
        <link rel="canonical" href="https://lordjunnior.com.br/neobankless" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Neobankless: Conta Global Cripto — Análise Completa 2026',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Lord Junnior' },
          datePublished: '2026-03-07',
          description: 'Review editorial completo da Neobankless com análise de privacidade, taxas, limites e comparação com alternativas.',
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
          {/* Hero Image */}
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
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px] font-mono">Review Editorial</span>
              </div>
            </motion.div>

            <motion.h1 initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              className="font-['Bebas_Neue'] text-5xl md:text-8xl tracking-tight uppercase mb-6 leading-[0.9]"
            >
              Neobankless<br />
              <span className="text-primary">Análise Completa</span>
            </motion.h1>

            <motion.p initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Space_Grotesk']"
            >
              Conta internacional com PIX, conversão para stablecoins e cartão Visa Infinite.
              Mas será que ela reporta? Análise sem filtro com prós, contras e veredicto final.
            </motion.p>

            {/* Alert badge */}
            <motion.div initial="hidden" animate={heroInView ? 'visible' : 'hidden'} variants={fadeUp} custom={3}
              className="mt-8 inline-flex items-center gap-2 border border-destructive/20 bg-destructive/5 px-4 py-2 rounded-sm"
            >
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-destructive text-xs font-bold uppercase tracking-wider font-mono">
                Reporte provável · Fundador confirmou submissão regulatória
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
              Especificações <span className="text-primary">da Plataforma</span>
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
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-2">Fluxo operacional</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Como <span className="text-primary">Funciona</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* App screenshot */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="border border-border/40 bg-white/[0.02] rounded-sm p-6 md:row-span-2 flex items-center justify-center"
            >
              <img src={appImg} alt="Interface da Neobankless" className="w-full max-w-xs rounded-sm opacity-90" />
            </motion.div>

            {/* Steps */}
            {[
              { step: '01', title: 'Deposite via PIX', desc: 'Receba até R$ 50.000/dia diretamente no app. O valor aparece em reais na sua conta.' },
              { step: '02', title: 'Converta para USDC', desc: 'Conversão instantânea BRL → USDC com taxa de 0.5%. Sem burocracia extra por transação.' },
              { step: '03', title: 'Envie para fora', desc: 'Saque em EUR para conta própria na Europa, ou envie USDC para carteira cripto.' },
            ].map((item, i) => (
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
            {/* Prós */}
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

            {/* Contras */}
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

          {/* Privacy Warning */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 border border-destructive/30 bg-destructive/[0.05] rounded-sm p-6 flex gap-4 items-start"
          >
            <Eye className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h4 className="font-['Space_Grotesk'] font-bold text-destructive text-sm mb-2 uppercase tracking-wider">Alerta de Privacidade</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">
                Um dos fundadores da Neobankless confirmou publicamente que a empresa se submete a todas as regulamentações governamentais.
                Com CPF obrigatório e sede em Florianópolis, o reporte de transações ao COAF e Receita Federal é praticamente inevitável a partir de 2026.
                <strong className="text-foreground/80"> Para privacidade real, autocustódia de Bitcoin continua sendo a única alternativa soberana.</strong>
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

          {/* CTA Premium — Affiliate */}
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
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80">Convite exclusivo Founder</span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4 leading-[0.95]">
              Quer testar a<br /><span className="text-primary">Neobankless?</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-8 font-['Space_Grotesk']">
              Acesse como Founder com convite exclusivo. Limite de R$ 50.000/dia via PIX,
              taxa de 0.5% e conversão direta para stablecoins. Vagas limitadas.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative font-['Space_Grotesk']">Criar conta Founder</span>
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
            SOBERANIA CTA — CONVERSÃO
        ══════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border border-border/30 bg-white/[0.02] rounded-sm p-10 md:p-14 text-center"
          >
            <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase mb-4">
              Conveniência não é <span className="text-destructive">soberania</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed mb-8 font-['Space_Grotesk']">
              A Neobankless pode ser útil como gateway de conversão, mas não substitui a autocustódia.
              Se você quer proteção real contra confisco, reporte e bloqueio, a resposta continua sendo Bitcoin com custódia própria.
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
                  Dúvidas sobre a Neobankless
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
