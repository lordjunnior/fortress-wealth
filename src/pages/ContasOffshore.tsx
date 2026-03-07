import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Shield, ChevronRight, AlertTriangle, Lock, Building2,
  CheckCircle, XCircle, AlertCircle, MapPin,
  ExternalLink, Star, ChevronDown, Bookmark,
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

import heroImg from '@/assets/offshore-hero.jpg';
import cardsImg from '@/assets/offshore-cards.jpg';

/* ═══════════════════════════════════════════════════════════
   MOTION SYSTEM — Netflix/BBC Scroll Storytelling
   Each chapter fades in with blur + parallax offset
   ═══════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const chapterReveal = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

/* ═══ Chapter Divider — Netflix-style ═══ */
const ChapterDivider = ({ number, title, id }: { number: string; title: string; id: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={chapterReveal}
      className="relative py-20 md:py-28 flex items-center justify-center"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.8), transparent 70%)' }} />
      </div>

      <div className="relative text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-[120px] md:text-[180px] font-black text-white pointer-events-none select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {number}
        </motion.span>
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/60 mb-3 relative z-10">
          Capítulo {number}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="h-px w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent origin-center"
        />
      </div>
    </motion.div>
  );
};

/* ═══ Scroll-aware Section with Parallax ═══ */
const ScrollSection = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={chapterReveal}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══ Reading Progress Bar ═══ */
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, rgba(245,158,11,0.6), rgba(245,158,11,1), rgba(16,185,129,0.8))',
      }}
    />
  );
};

/* ═══ Floating TOC ═══ */
const CHAPTERS = [
  { id: 'condicao', label: 'A Condição', num: '01' },
  { id: 'ranking', label: 'Ranking', num: '02' },
  { id: 'comparativo', label: 'Comparativo', num: '03' },
  { id: 'assessoria', label: 'Assessoria', num: '04' },
  { id: 'faq', label: 'FAQ', num: '05' },
];

const FloatingToc = () => {
  const [active, setActive] = useState('');
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setShow(v > 0.08 && v < 0.95);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    CHAPTERS.forEach(c => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex flex-col gap-3"
        >
          {CHAPTERS.map(c => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`group flex items-center gap-3 transition-all duration-300 ${active === c.id ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
            >
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${active === c.id ? 'bg-amber-400 scale-125' : 'bg-stone-600'}`} />
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors ${active === c.id ? 'text-amber-400' : 'text-stone-600'}`}>
                {c.label}
              </span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ═══ Account Data ═══ */
interface Account {
  rank: number;
  name: string;
  jurisdiction: string;
  flag: string;
  type: 'fintech' | 'banco';
  currencies: string[];
  openWith: ('BR' | 'PY' | 'Outro')[];
  receiveTransfers: boolean;
  transferMethods: string[];
  cardAvailable: boolean;
  feeLevel: 'baixa' | 'média' | 'alta';
  privacyLevel: 'alto' | 'médio' | 'baixo';
  highlights: string[];
  redFlags: string[];
  verdict: string;
  restricted?: string;
}

const ACCOUNTS: Account[] = [
  {
    rank: 1, name: 'RedotPay', jurisdiction: 'Hong Kong', flag: '🇭🇰', type: 'fintech',
    currencies: ['USD', 'EUR', 'BRL'], openWith: ['BR', 'PY'], receiveTransfers: true,
    transferMethods: ['Depósito próprio'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: [
      'Empréstimos colateralizados em Bitcoin — gaste sem vender seu BTC',
      'Aceita cédula paraguaia para abertura com privacidade total',
      'Cartão de crédito disponível para gastos internacionais',
    ],
    redFlags: [
      'Taxas de compra de BTC dentro da plataforma são elevadas — evite comprar BTC diretamente',
      'Taxas do cartão acima da média de mercado comparado a concorrentes',
      'Se abrir com documento BR, fica à mercê de eventual reporte retroativo',
    ],
    verdict: 'Ideal para quem quer alavancagem em BTC sem vender. Use com cédula paraguaia para privacidade. Evite o cartão como opção primária — as taxas não compensam frente a alternativas.',
  },
  {
    rank: 2, name: 'OffRamp', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['ACH', 'Wire Transfer'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: [
      'Recebe transferências em dólares de terceiros via ACH — conta real nos EUA',
      'Câmbio mais atrativo que a RedotPay para gastos no cartão',
      'Wire Transfer direto para conta americana — útil para receber de empregadores',
    ],
    redFlags: [
      'Não recebe transferências em euros — limitado ao ecossistema USD',
      'Sem empréstimos colateralizados — não substitui a RedotPay nesse aspecto',
    ],
    verdict: 'A melhor opção para receber dólares de terceiros com câmbio competitivo. Se você recebe em USD de clientes ou empregadores, esta é a escolha primária.',
  },
  {
    rank: 3, name: 'Etherfy', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['Transferência internacional'], cardAvailable: true, feeLevel: 'baixa', privacyLevel: 'alto',
    highlights: [
      'Taxa de 0,2% para receber transferências internacionais em USD — menor do mercado',
      'Economia significativa vs OffRamp (0,5%) em transferências recorrentes',
      'Plataforma focada em eficiência de custos para freelancers internacionais',
    ],
    redFlags: ['Plataforma relativamente nova — menos tempo de mercado para validar confiabilidade'],
    verdict: 'A mais barata para receber transferências internacionais. Se o seu fluxo principal é receber USD do exterior, a economia de 0,3% por transação se acumula rapidamente.',
  },
  {
    rank: 4, name: 'Use Picnick', jurisdiction: 'Reino Unido', flag: '🇬🇧', type: 'fintech',
    currencies: ['USD', 'Cripto'], openWith: ['BR'], receiveTransfers: false,
    transferMethods: [], cardAvailable: true, feeLevel: 'baixa', privacyLevel: 'baixo',
    highlights: [
      'Melhor câmbio para quem está no Brasil e quer comprar no dia a dia com cartão cripto',
      'Cashback em compras — vantagem competitiva para gastos recorrentes',
      'Excelente para viajantes brasileiros que querem pagar menos em câmbio',
    ],
    redFlags: [
      'Só aceita documento brasileiro — IMPOSSÍVEL abrir com cédula paraguaia',
      'Não recebe transferências de terceiros internacionalmente',
      'Localizada no Reino Unido — risco de reporte via CRS ao governo brasileiro',
      'ALERTA: Receita Federal tem identificado brasileiros com cartões cripto internacionais abertos com CPF',
    ],
    verdict: 'Melhor câmbio do mercado, porém ZERO privacidade. Use apenas se seu dinheiro já é 100% declarado e você quer eficiência, não sigilo.',
  },
  {
    rank: 5, name: 'Mero', jurisdiction: 'Internacional', flag: '🌐', type: 'fintech',
    currencies: ['USD'], openWith: ['PY'], receiveTransfers: true,
    transferMethods: ['Wise', 'Revolut', 'Outros'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: [
      'Sem limite para recebimento em dólares — ideal para volumes maiores',
      'Aceita cédula paraguaia para abertura com privacidade',
      'Compatível com Wise, Revolut e múltiplas plataformas de envio',
    ],
    redFlags: ['Menos conhecida — validar suporte e liquidez antes de enviar valores altos'],
    verdict: 'A opção mais flexível para receber de múltiplas fontes sem limites. Ideal para empreendedores digitais que operam com volumes variáveis.',
  },
  {
    rank: 6, name: 'Grabfy', jurisdiction: 'Estados Unidos', flag: '🇺🇸', type: 'fintech',
    currencies: ['USD'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'ACH'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: [
      'Recebe diretamente por SWIFT — diferencial único para clientes fora dos EUA',
      'Conta em dólares nos Estados Unidos — endereço bancário real',
      'Ideal para quem tem empregador/clientes na Ásia ou Europa que pagam via SWIFT',
    ],
    redFlags: ['Funcionalidades cripto podem ser mais limitadas que concorrentes especializados'],
    verdict: 'A escolha certa se você precisa de SWIFT. A maioria das fintechs só aceita ACH — a Grabfy resolve o problema de receber de empregadores globais.',
  },
  {
    rank: 7, name: 'UglyCash', jurisdiction: 'América Latina', flag: '🌎', type: 'fintech',
    currencies: ['USD'], openWith: ['PY'], receiveTransfers: true,
    transferMethods: ['Transferência'], cardAvailable: true, feeLevel: 'média', privacyLevel: 'alto',
    highlights: [
      'Aceita exclusivamente cédula paraguaia — máxima privacidade documental',
      'Opera na região da América Latina — familiaridade regulatória',
    ],
    redFlags: [
      'Restrição geográfica: exige geolocalização em Argentina ou Paraguai para abrir conta',
      'NÃO funciona com documento brasileiro — impossível abrir do Brasil',
      'Se você não está fisicamente na região, não consegue nem iniciar o cadastro',
    ],
    restricted: 'Requer geolocalização em Argentina ou Paraguai',
    verdict: 'Opção exclusiva para quem já está na região. Se você mora ou viaja frequentemente para Argentina/Paraguai, é uma alternativa sólida com privacidade máxima.',
  },
  {
    rank: 8, name: 'Chapo Bank', jurisdiction: 'Gibraltar', flag: '🇬🇮', type: 'banco',
    currencies: ['USD', 'EUR', 'GBP'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'SEPA'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: [
      'Multi-moeda real: USD, EUR e GBP — raro entre as opções cripto',
      'Gibraltar: jurisdição com legislação de privacidade financeira estabelecida',
      'Todos os Fiat recebidos são convertidos automaticamente — camada extra de separação',
    ],
    redFlags: [
      'Taxa anual de US$ 1.000 — posiciona como opção premium, não para iniciantes',
      'Compliance extremamente agressivo — pedem documentação extensiva para transações pequenas',
      'Receber Fiat de terceiros pode acionar alertas de compliance imediatamente',
    ],
    verdict: 'Para quem movimenta volumes maiores e precisa de multi-moeda com privacidade jurisdicional. O custo alto e o compliance rigoroso eliminam amadores — é isso que faz a plataforma funcionar.',
  },
  {
    rank: 9, name: 'Dukascopy', jurisdiction: 'Suíça', flag: '🇨🇭', type: 'banco',
    currencies: ['USD', 'EUR'], openWith: ['PY', 'Outro'], receiveTransfers: true,
    transferMethods: ['SWIFT', 'SEPA'], cardAvailable: true, feeLevel: 'alta', privacyLevel: 'alto',
    highlights: [
      'Banco suíço real — não é fintech, é instituição bancária regulada',
      'Gerente de banco dedicado que responde diretamente por você',
      'Suíça: padrão-ouro em privacidade bancária historicamente',
    ],
    redFlags: [
      'Abertura exige chamada de vídeo — processo mais burocrático',
      'Taxas de saque cripto para carteira pessoal são mais altas',
      'Processo de abertura mais lento que fintechs — espere dias, não minutos',
    ],
    verdict: 'O tanque de guerra das opções: lento, pesado, caro — mas blindado. Conta bancária suíça real com gerente dedicado. Para quem quer a solidez institucional que nenhuma fintech pode oferecer.',
  },
];

const privacyConfig = {
  alto: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Alto' },
  médio: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Médio' },
  baixo: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Baixo' },
};
const feeConfig = {
  baixa: { color: 'text-emerald-400', label: 'Baixas' },
  média: { color: 'text-amber-400', label: 'Médias' },
  alta: { color: 'text-rose-400', label: 'Altas' },
};

/* ═══ FAQ ═══ */
const FAQ = [
  { q: 'Preciso de cédula paraguaia para abrir essas contas?', a: 'Para obter privacidade real (sem reporte ao governo brasileiro), sim — a maioria das contas exige documentação de jurisdição que não reporta. Abrir com CPF brasileiro expõe você ao reporte automático via CRS. O processo de obtenção da cédula paraguaia é explicado em conteúdo exclusivo para membros do canal.' },
  { q: 'Essas contas são legais?', a: 'Sim. Todas as plataformas listadas são fintechs e bancos regulados em suas respectivas jurisdições. Ter conta internacional é legal. O que você faz com ela — declarar ou não — é uma decisão pessoal com consequências legais que variam por país.' },
  { q: 'Qual é a melhor conta para receber dólares de clientes?', a: 'OffRamp para ACH (EUA), Grabfy para SWIFT (global) e Etherfy para quem quer a menor taxa (0,2%). Depende do método de pagamento do seu cliente.' },
  { q: 'Posso usar cartão cripto sem KYC no dia a dia?', a: 'Existem opções de cartão cripto completamente anônimas (sem nome impresso). O autor utiliza uma dessas opções para gastos diários, evitando exposição de dados pessoais mesmo em cenários de vazamento de dados.' },
  { q: 'A Receita Federal consegue rastrear essas contas?', a: 'Se você abrir com documento brasileiro, sim — o CRS (Common Reporting Standard) permite troca automática de informações entre 100+ países. Com documentação de jurisdição não-CRS, a probabilidade de rastreamento cai drasticamente.' },
  { q: 'Qual a diferença entre fintech e banco nesta lista?', a: 'Fintechs (RedotPay, OffRamp, Etherfy, etc.) são mais ágeis, baratas e fáceis de abrir. Bancos (Chapo Bank, Dukascopy) oferecem mais solidez institucional, multi-moeda e gerentes dedicados — mas custam mais e exigem mais documentação.' },
  { q: 'Posso usar essas contas do Brasil?', a: 'A maioria sim, com exceção da UglyCash que exige geolocalização em Argentina/Paraguai. As demais podem ser abertas e operadas remotamente de qualquer lugar do mundo.' },
  { q: 'Qual é o custo para se tornar membro e acessar a assessoria?', a: 'O valor para se tornar membro do canal é equivalente ao preço de uma pizza (aproximadamente R$ 50). Com a adesão, você tem acesso ao processo assessorado e acelerado de abertura de conta com cédula paraguaia.' },
];

const schemaLD = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: '10 Contas Offshore Cripto que NÃO Reportam — Abertura Remota',
  description: 'Ranking técnico de 10 fintechs e bancos cripto internacionais em paraísos fiscais que não reportam transações.',
  url: 'https://autonomiadoindividuo.com/soberania-financeira/contas-offshore/top-10',
};
const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

/* ═══ ACCOUNT CARD — with breathing hover state ═══ */
const AccountCard = ({ account, idx }: { account: Account; idx: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const privacy = privacyConfig[account.privacyLevel];
  const fee = feeConfig[account.feeLevel];
  const isWarning = account.privacyLevel === 'baixo';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="group relative"
    >
      {/* Screaming state for low-privacy cards */}
      {isWarning && (
        <div className="absolute -inset-[1px] rounded-3xl animate-pulse opacity-30"
          style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.3), transparent 50%, rgba(244,63,94,0.2))' }} />
      )}

      <motion.div
        variants={staggerChild}
        className={`relative rounded-3xl border overflow-hidden transition-all duration-700 ${
          isWarning
            ? 'border-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_0_60px_-10px_rgba(244,63,94,0.15)]'
            : 'border-white/[0.06] hover:border-amber-500/20 hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.1)]'
        } bg-white/[0.02]`}
        whileHover={{ y: -4, transition: { duration: 0.4, ease: EASE } }}
      >
        {/* Rank badge */}
        <div className="absolute top-0 left-0 z-10">
          <motion.div variants={staggerChild} className="bg-amber-500/20 backdrop-blur-md border-r border-b border-amber-500/20 rounded-br-2xl px-5 py-3">
            <span className="text-amber-400 font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              #{account.rank}
            </span>
          </motion.div>
        </div>

        {/* Header */}
        <div className="px-6 md:px-8 pt-10 pb-6 border-b border-white/[0.04]">
          <motion.div variants={staggerChild} className="flex items-start justify-between mb-4">
            <div className="pl-14">
              <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {account.name}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-stone-500 text-xs flex items-center gap-1.5">
                  <MapPin size={11} /> {account.flag} {account.jurisdiction}
                </span>
                <span className="text-stone-600 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">
                  {account.type}
                </span>
              </div>
            </div>
            <div className={`px-3.5 py-2 rounded-full ${privacy.bg} border ${privacy.border}`}>
              <span className={`text-[9px] font-bold tracking-[0.15em] uppercase ${privacy.color}`}>
                <Lock size={9} className="inline mr-1 -mt-px" /> {privacy.label}
              </span>
            </div>
          </motion.div>

          {/* Specs row — staggered */}
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Moedas', value: account.currencies.join(', ') },
              { label: 'Abertura', value: account.openWith.join(' / ') },
              { label: 'Taxas', value: fee.label, color: fee.color },
              { label: 'Cartão', value: account.cardAvailable ? 'Disponível' : 'Não', color: account.cardAvailable ? 'text-emerald-400' : 'text-stone-600' },
            ].map(spec => (
              <motion.div key={spec.label} variants={staggerChild} className="bg-white/[0.02] rounded-xl px-3.5 py-3 border border-white/[0.04]">
                <p className="text-[9px] text-stone-600 uppercase tracking-wider mb-1">{spec.label}</p>
                <p className={`text-xs font-semibold ${spec.color || 'text-stone-300'}`}>{spec.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Body — pros/cons */}
        <motion.div variants={staggerChild} className="px-6 md:px-8 py-7 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400/80 mb-4 flex items-center gap-1.5">
              <CheckCircle size={12} /> Vantagens
            </p>
            <ul className="space-y-3">
              {account.highlights.map((h, i) => (
                <motion.li key={i} variants={staggerChild} className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5">
                  <span className="text-emerald-500 mt-1 shrink-0 text-sm">+</span> {h}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-400/80 mb-4 flex items-center gap-1.5">
              <AlertCircle size={12} /> Alertas
            </p>
            <ul className="space-y-3">
              {account.redFlags.map((r, i) => (
                <motion.li key={i} variants={staggerChild} className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5">
                  <span className="text-rose-500 mt-1 shrink-0 text-sm">!</span> {r}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Restricted notice */}
        {account.restricted && (
          <motion.div variants={staggerChild} className="mx-6 md:mx-8 mb-5 px-5 py-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/15">
            <p className="text-amber-400/80 text-xs flex items-center gap-2.5">
              <AlertTriangle size={13} className="shrink-0" />
              <span><strong>Restrição:</strong> {account.restricted}</span>
            </p>
          </motion.div>
        )}

        {/* Verdict */}
        <motion.div variants={staggerChild} className="px-6 md:px-8 py-6 border-t border-white/[0.04] bg-white/[0.01]">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400/70 mb-2.5">Veredicto Editorial</p>
          <p className="text-stone-300 text-sm md:text-[15px] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "{account.verdict}"
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE — Scroll Storytelling Architecture
   ═══════════════════════════════════════════════════════════ */
const ContasOffshore = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Helmet>
        <title>10 Contas Offshore Cripto que NÃO Reportam — Abertura Remota | Soberania Financeira</title>
        <meta name="description" content="Ranking técnico de 10 fintechs e bancos cripto internacionais em paraísos fiscais que não reportam transações. RedotPay, OffRamp, Etherfy, Dukascopy e mais. Análise completa." />
        <link rel="canonical" href="https://autonomiadoindividuo.com/soberania-financeira/contas-offshore/top-10" />
        <script type="application/ld+json">{JSON.stringify(schemaLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <ScrollToTop />
      <ReadingProgressBar />
      <FloatingToc />

      <div className="min-h-screen bg-[#050808] text-stone-200">

        {/* ═══ FILM GRAIN ═══ */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%"><filter id="co-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#co-grain)" /></svg>
        </div>

        {/* ═══ LIGHT BEAMS ═══ */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.5), transparent 70%)' }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.4), transparent 70%)' }} />
        </div>

        {/* ═══ HERO — Cinematic Parallax ═══ */}
        <div ref={heroRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 scale-110">
              <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.05) 0%, rgba(5,8,8,0.4) 35%, rgba(5,8,8,0.88) 65%, #050808 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 15%, transparent 25%, rgba(5,8,8,0.92) 100%)' }} />
          </motion.div>

          <motion.div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24" style={{ opacity: heroOpacity }}>
            <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-10">
              <ChevronRight size={14} className="rotate-180" /> Soberania Financeira
            </Link>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400/70">CONTAS OFFSHORE · RANKING TÉCNICO</span>
            </motion.div>

            <div className="flex items-start gap-5 mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 shrink-0 backdrop-blur-sm">
                <Building2 className="text-amber-400" size={30} />
              </motion.div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.92]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  10 Contas Offshore<br />Cripto que <span className="text-amber-400">NÃO</span><br />Reportam
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                  className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl">
                  Fintechs cripto internacionais, contas bancárias em paraísos fiscais e cartões sem KYC.
                  Ranking técnico baseado em privacidade, taxas e funcionalidade real — testadas na prática.
                </motion.p>
              </div>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="flex flex-wrap gap-8 mt-10">
              {[
                { label: 'Contas', value: '9' },
                { label: 'Jurisdições', value: '7' },
                { label: 'Abertura Remota', value: '8/9' },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-500">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 mt-10">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <ChevronDown size={14} className="text-stone-500" />
              </motion.div>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Role para explorar</span>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050808)' }} />
        </div>

        {/* ═══════════════════════════════════════
           CAPÍTULO 01 — A CONDIÇÃO
           ═══════════════════════════════════════ */}
        <ChapterDivider number="01" title="A Condição que Ninguém te Conta" id="condicao" />

        <ScrollSection className="max-w-4xl mx-auto px-6 pb-20">
          {/* Alert box */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.div variants={staggerChild}
              className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 md:p-10 backdrop-blur-sm mb-12">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                  <AlertTriangle className="text-amber-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Antes de Continuar, Entenda Isso
                  </h2>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">
                    Todas essas contas permitem comprar, enviar, receber transferências internacionais e converter para Bitcoin ou USDT.
                    <strong className="text-stone-200"> Mas tem uma condição crítica:</strong>
                  </p>
                  <motion.div variants={staggerChild}
                    className="rounded-xl bg-black/40 border border-white/[0.06] p-6">
                    <p className="text-white text-sm md:text-base font-semibold leading-relaxed">
                      Se você abrir conta com o documento brasileiro (CPF), você <span className="text-rose-400 font-bold">PODE</span> ter problemas.
                      O CRS (Common Reporting Standard) permite troca automática de informações financeiras entre 100+ países —
                      incluindo o Brasil.
                    </p>
                    <motion.div variants={staggerChild} className="mt-5 pt-5 border-t border-white/[0.06]">
                      <p className="text-amber-400 text-sm md:text-base font-medium leading-relaxed">
                        A solução? Abrir com documentação de jurisdição que não reporta.
                        O processo assessorado está disponível exclusivamente para membros do canal.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Context image with parallax */}
          <div className="relative rounded-2xl overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE }}
            >
              <img src={cardsImg} alt="Cartões cripto offshore" className="w-full h-72 md:h-96 object-cover" style={{ filter: 'brightness(0.45) saturate(0.8)' }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/50 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute bottom-8 left-8 right-8"
            >
              <p className="text-stone-300 text-sm md:text-base italic leading-relaxed max-w-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                "O cartão que eu uso no dia a dia não tem nem nome. Mesmo que haja vazamento de dados, meus dados estão protegidos."
              </p>
            </motion.div>
          </div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 02 — RANKING
           ═══════════════════════════════════════ */}
        <ChapterDivider number="02" title="As 9 Contas Analisadas" id="ranking" />

        <section className="max-w-5xl mx-auto px-6 pb-24">
          <ScrollSection className="text-center mb-16">
            <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
              Ordenadas por relevância prática. Cada conta foi testada pessoalmente e avaliada por privacidade, taxas, funcionalidade e red flags.
            </p>
          </ScrollSection>

          <div className="space-y-10">
            {ACCOUNTS.map((acc, idx) => (
              <AccountCard key={acc.name} account={acc} idx={idx} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CAPÍTULO 03 — COMPARATIVO
           ═══════════════════════════════════════ */}
        <ChapterDivider number="03" title="Comparativo Rápido" id="comparativo" />

        <ScrollSection className="max-w-6xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.02] overflow-hidden backdrop-blur-sm overflow-x-auto"
          >
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  {['#', 'Conta', 'Jurisdição', 'Moedas', 'Doc', 'Recebe $', 'Taxas', 'Privacidade'].map(h => (
                    <th key={h} className="px-4 py-4 text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((acc, i) => (
                  <motion.tr
                    key={acc.name}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className={`${i !== ACCOUNTS.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}
                  >
                    <td className="px-4 py-4 text-amber-400 font-bold text-sm">{acc.rank}</td>
                    <td className="px-4 py-4 text-stone-200 font-medium text-sm">{acc.name}</td>
                    <td className="px-4 py-4 text-stone-500 text-xs">{acc.flag} {acc.jurisdiction}</td>
                    <td className="px-4 py-4 text-stone-400 text-xs">{acc.currencies.join(', ')}</td>
                    <td className="px-4 py-4 text-xs">{acc.openWith.includes('PY') ? <span className="text-emerald-400">PY</span> : <span className="text-rose-400">BR</span>}</td>
                    <td className="px-4 py-4 text-xs">{acc.receiveTransfers ? <CheckCircle size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-rose-400" />}</td>
                    <td className={`px-4 py-4 text-xs font-semibold ${feeConfig[acc.feeLevel].color}`}>{feeConfig[acc.feeLevel].label}</td>
                    <td className={`px-4 py-4 text-xs font-semibold ${privacyConfig[acc.privacyLevel].color}`}>{privacyConfig[acc.privacyLevel].label}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 04 — CTA MEMBRO
           ═══════════════════════════════════════ */}
        <ChapterDivider number="04" title="Assessoria Privada" id="assessoria" />

        <ScrollSection className="max-w-4xl mx-auto px-6 pb-24">
          <div className="relative rounded-3xl border border-amber-500/20 overflow-hidden">
            {/* Animated border glow — screaming state */}
            <div className="absolute -inset-[1px] rounded-3xl opacity-20"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.4), transparent 40%, rgba(245,158,11,0.2) 80%, transparent)' }} />
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-[1px] rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.3), transparent 50%)' }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent" />
            <div className="relative p-8 md:p-14 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 inline-flex mb-8"
              >
                <Shield className="text-amber-400" size={32} />
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quer abrir essas contas<br /><span className="text-amber-400">sem ser reportado?</span>
              </h2>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
                O processo assessorado de obtenção da cédula paraguaia e abertura de conta com privacidade
                está disponível exclusivamente para membros do canal. Valor: o preço de uma pizza.
              </p>
              <a
                href="https://www.youtube.com/@autonomiadoindividuo/join"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-base hover:bg-amber-500/25 hover:scale-[1.03] transition-all duration-300"
              >
                <Star size={20} className="group-hover:rotate-12 transition-transform" /> Tornar-se Membro <ExternalLink size={14} />
              </a>
              <p className="text-stone-600 text-[10px] mt-5 tracking-[0.2em] uppercase">
                Assessoria + Cédula Paraguaia + Abertura Acelerada
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* ═══════════════════════════════════════
           CAPÍTULO 05 — FAQ
           ═══════════════════════════════════════ */}
        <ChapterDivider number="05" title="Dúvidas Estratégicas" id="faq" />

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="space-y-4">
            {FAQ.map((faq, i) => (
              <ScrollSection key={i}>
                <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.1] transition-colors">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                    <span className="text-stone-200 text-sm md:text-base font-medium pr-4">{faq.q}</span>
                    <ChevronRight size={16} className="text-stone-500 shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-stone-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </ScrollSection>
            ))}
          </div>
        </section>

        {/* ═══ DISCLAIMER ═══ */}
        <ScrollSection className="max-w-4xl mx-auto px-6 pb-24">
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                <AlertTriangle className="text-amber-400" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aviso Legal</h3>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Este conteúdo é <strong className="text-stone-300">estritamente educacional e analítico</strong>.
                  Todas as plataformas listadas são empresas reguladas em suas jurisdições.
                  Nenhum conteúdo aqui constitui recomendação de evasão fiscal ou atividade ilícita.
                  Consulte sempre um profissional qualificado antes de tomar decisões financeiras.
                </p>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.04] py-12 text-center">
          <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">
            Contas Offshore Cripto · Privacidade · Soberania · Ranking Técnico
          </p>
        </footer>
      </div>
    </>
  );
};

export default ContasOffshore;
