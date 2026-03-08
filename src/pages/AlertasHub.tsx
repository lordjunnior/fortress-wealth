import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, AlertTriangle, Shield, ChevronRight, Zap,
  Eye, Lock, Landmark, TrendingDown, HelpCircle,
  ChevronDown, ExternalLink,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';

/* ── Alertas ativos ── */
const ALERTAS = [
  {
    slug: 'fim-do-dinheiro-vivo',
    titulo: 'O Governo Pode Limitar o Dinheiro Vivo no Brasil',
    subtitulo: 'PL 3.951/2019 · CCJ · Precedente Aberto',
    descricao: 'Entenda o PL 3.951, veja os limites ao dinheiro em espécie na Europa e descubra ferramentas legais para proteger sua privacidade financeira.',
    tag: 'LEGISLATIVO',
    status: 'ATIVO',
    icon: Landmark,
    accent: 'from-red-600/20 to-red-900/10',
    borderAccent: 'hover:border-red-600/30',
  },
  {
    slug: 'cbdc-brasil',
    titulo: 'DREX: A Moeda Digital Programável do Governo',
    subtitulo: 'CBDC · Real Digital · Controle Programável',
    descricao: 'Entenda o DREX, a moeda digital do Banco Central que dá ao governo controle total sobre o seu dinheiro. Veja os riscos e como se proteger.',
    tag: 'MONETÁRIO',
    status: 'ATIVO',
    icon: Eye,
    accent: 'from-amber-600/20 to-amber-900/10',
    borderAccent: 'hover:border-amber-600/30',
  },
  {
    slug: 'depix-reporte-2026',
    titulo: 'DePix Vai Reportar Transações em 2026',
    subtitulo: 'Banco Central · Reporte Obrigatório · Junho 2026',
    descricao: 'Plataformas DePix serão obrigadas a reportar transações a partir de junho de 2026. Entenda os riscos, o IOF aprovado e as alternativas com privacidade real.',
    tag: 'REGULATÓRIO',
    status: 'ATIVO',
    icon: TrendingDown,
    accent: 'from-rose-600/20 to-rose-900/10',
    borderAccent: 'hover:border-rose-600/30',
  },
];

/* ── Próximos alertas ── */
const ALERTAS_PROXIMOS = [
  {
    titulo: 'Imposto Global Sobre Patrimônio',
    subtitulo: 'OCDE · Tributação Internacional · Confisco Legalizado',
    tag: 'TRIBUTÁRIO',
    icon: TrendingDown,
  },
  {
    titulo: 'Rastreamento Financeiro Total',
    subtitulo: 'COAF · Open Banking · Vigilância Patrimonial',
    tag: 'VIGILÂNCIA',
    icon: Lock,
  },
];

/* ── FAQ otimizado para SEO de alto volume ── */
const FAQ_DATA = [
  {
    q: 'O governo pode proibir o dinheiro em espécie no Brasil?',
    a: 'Sim. O PL 3.951/2019 já está em tramitação na CCJ e propõe limites ao uso de cédulas. Na Europa, países como França e Itália já impõem tetos de pagamento em dinheiro vivo. A tendência global é restringir o papel-moeda para aumentar o controle fiscal.',
  },
  {
    q: 'O que é o DREX e por que ele é perigoso?',
    a: 'O DREX é a moeda digital do Banco Central do Brasil (CBDC). Diferente do PIX, o DREX é programável: o governo pode definir onde, quando e como você gasta. Isso significa que seu dinheiro pode ter prazo de validade, restrições de uso e ser bloqueado sem ordem judicial.',
  },
  {
    q: 'Qual a diferença entre PIX e DREX?',
    a: 'O PIX é um sistema de transferência que move reais entre contas bancárias. O DREX substitui o próprio real por uma moeda digital controlada diretamente pelo Banco Central, com capacidade de programação, rastreamento total e bloqueio remoto.',
  },
  {
    q: 'Como proteger meu patrimônio de confisco?',
    a: 'Diversificação jurisdicional, autocustódia de Bitcoin, ativos fora do sistema bancário tradicional e conhecimento sobre proteção patrimonial legal. O primeiro passo é entender que dinheiro no banco não é seu: é um crédito que o banco te deve.',
  },
  {
    q: 'Bitcoin pode ser confiscado pelo governo?',
    a: 'Se você pratica autocustódia correta (hardware wallet com seed phrase segura), nenhum governo pode confiscar seus bitcoins. Diferente de contas bancárias, imóveis ou veículos, o Bitcoin não depende de intermediários e não pode ser apreendido fisicamente.',
  },
  {
    q: 'O que aconteceu no confisco de 1990 no Brasil?',
    a: 'Em março de 1990, o governo Collor congelou 80% de todos os depósitos bancários e aplicações financeiras do país. De um dia para o outro, milhões de brasileiros perderam acesso ao próprio dinheiro. Alguns morreram sem recuperar os valores.',
  },
  {
    q: 'É legal comprar e usar Bitcoin no Brasil?',
    a: 'Sim. O Marco Legal das Criptomoedas (Lei 14.478/2022) regulamentou o uso de criptoativos no Brasil. Comprar, vender, guardar e transacionar Bitcoin é completamente legal. A obrigação é declarar no Imposto de Renda.',
  },
  {
    q: 'O que é autocustódia e por que ela é essencial?',
    a: 'Autocustódia significa guardar seus próprios bitcoins em uma carteira que só você controla, sem depender de corretoras ou bancos. "Not your keys, not your coins": se outra pessoa guarda seu Bitcoin, ela decide se você pode acessá-lo.',
  },
];

/* ── Animação ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AlertasHub() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const alertRef = useRef(null);
  const alertInView = useInView(alertRef, { once: true, margin: '-60px' });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-[#050808] text-foreground font-sans overflow-x-hidden">
      <ScrollToTop />
      <Helmet>
        <title>Alertas de Soberania: Ameaças à Liberdade Financeira no Brasil | Lord Junnior</title>
        <meta name="description" content="Monitoramento de ameaças à sua liberdade financeira: DREX, fim do dinheiro vivo, impostos globais e rastreamento total. Entenda os riscos e proteja seu patrimônio." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas" />
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
          '@type': 'CollectionPage',
          name: 'Alertas de Soberania',
          description: 'Central de monitoramento de ameaças à liberdade financeira no Brasil.',
          url: 'https://lordjunnior.com.br/alertas',
        })}</script>
      </Helmet>

      {/* ── Film Grain ── */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      <div className="relative z-10">

        {/* ══════════════════════════════════════════════
            SEÇÃO 1: HERO — CURIOSIDADE
        ══════════════════════════════════════════════ */}
        <section ref={heroRef} className="max-w-5xl mx-auto px-6 pt-28 pb-20">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-16 text-[10px] font-bold uppercase tracking-[0.4em] font-mono transition-colors">
            <ArrowLeft size={14} /> Voltar ao Início
          </Link>

          <motion.div
            initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm border border-destructive/20 bg-destructive/5 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-destructive font-black uppercase tracking-[0.4em] text-[9px] font-mono">Central de Alertas</span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="font-['Bebas_Neue'] text-6xl md:text-8xl tracking-tight uppercase mb-6 leading-[0.9]"
          >
            Alertas de<br />
            <span className="text-destructive">Soberania</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={2}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-['Space_Grotesk']"
          >
            Análises aprofundadas sobre ameaças reais à sua liberdade financeira.
            Cada alerta é uma página dedicada com contexto, dados internacionais e ferramentas práticas de proteção.
          </motion.p>

          {/* Stat bar — prova social */}
          <motion.div
            initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={3}
            className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/30"
          >
            {[
              { label: 'Alertas ativos', value: '02' },
              { label: 'Em produção', value: '02' },
              { label: 'Países monitorados', value: '12+' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-['Bebas_Neue'] text-3xl text-foreground">{s.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════
            SEÇÃO 2: ALERTAS ATIVOS — MEDO RACIONAL
        ══════════════════════════════════════════════ */}
        <section ref={alertRef} className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            initial="hidden" animate={alertInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0}
            className="mb-8"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/60 mb-2">Ameaças identificadas</p>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
              Alertas <span className="text-destructive">Ativos</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {ALERTAS.map((alerta, i) => {
              const Icon = alerta.icon;
              return (
                <motion.div
                  key={alerta.slug}
                  initial="hidden" animate={alertInView ? 'visible' : 'hidden'}
                  variants={fadeUp} custom={i + 1}
                >
                  <Link
                    to={`/alertas/${alerta.slug}`}
                    className={`block bg-white/[0.02] border border-border/40 rounded-sm p-8 ${alerta.borderAccent} hover:bg-white/[0.04] transition-all duration-300 group relative overflow-hidden`}
                  >
                    {/* Gradient accent */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${alerta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex gap-5 flex-1">
                        <div className="w-12 h-12 rounded-sm border border-border/40 bg-white/[0.03] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-destructive font-mono bg-destructive/10 px-2.5 py-1 rounded-sm">{alerta.tag}</span>
                            <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {alerta.status}
                            </span>
                          </div>
                          <h3 className="text-foreground font-bold text-xl md:text-2xl tracking-tight mb-2 group-hover:text-destructive transition-colors font-['Space_Grotesk']">
                            {alerta.titulo}
                          </h3>
                          <p className="text-muted-foreground/60 text-xs font-bold uppercase tracking-wider font-mono mb-3">{alerta.subtitulo}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed font-['Space_Grotesk']">{alerta.descricao}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground/30 group-hover:text-destructive transition-colors shrink-0 mt-3" size={24} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SEÇÃO 3: CTA PREMIUM — SOLUÇÃO
        ══════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-white/[0.01] to-transparent p-10 md:p-14"
          >
            {/* Pulse ring */}
            <div className="absolute top-6 right-6 w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
              <span className="relative block w-3 h-3 rounded-full bg-primary" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80">Protocolo de proteção</span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4 leading-[0.95]">
              Não espere o próximo<br />confisco para agir
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-8 font-['Space_Grotesk']">
              Cada alerta inclui ferramentas práticas de proteção. Comece pela autocustódia de Bitcoin
              e construa sua soberania financeira antes que a janela se feche.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/bitcoin"
                className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Iniciar protocolo</span>
                <ExternalLink size={14} className="relative" />
              </Link>
              <Link
                to="/confisco-1990"
                className="inline-flex items-center gap-2 border border-border/50 text-muted-foreground font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                Entenda o confisco de 1990
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════
            SEÇÃO 4: PRÓXIMOS ALERTAS — EM PRODUÇÃO
        ══════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-amber-500" size={16} />
            <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-[9px] font-mono">Próximos Alertas</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALERTAS_PROXIMOS.map((alerta, i) => {
              const Icon = alerta.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i}
                  className="border border-dashed border-border/30 rounded-sm p-7 hover:border-border/60 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm border border-border/30 bg-white/[0.02] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">{alerta.tag}</span>
                      <h3 className="text-foreground/60 font-bold uppercase text-sm tracking-tight mt-2 mb-1 font-['Space_Grotesk']">{alerta.titulo}</h3>
                      <p className="text-muted-foreground/30 text-[10px] font-bold uppercase tracking-wider font-mono">{alerta.subtitulo}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
                        <span className="text-amber-500/50 text-[8px] font-black uppercase tracking-[0.3em] font-mono">Em produção</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SEÇÃO 5: FAQ — CONVERSÃO
        ══════════════════════════════════════════════ */}
        <section ref={faqRef} className="max-w-3xl mx-auto px-6 pb-32">
          <motion.div
            initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">Perguntas frequentes</p>
                <h2 className="font-['Bebas_Neue'] text-2xl md:text-3xl tracking-tight uppercase">
                  O que você precisa saber
                </h2>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-primary/30 via-border/50 to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden" animate={faqInView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
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

        {/* ── Footer ── */}
        <footer className="max-w-5xl mx-auto px-6 pb-16">
          <div className="pt-12 border-t border-border/20 text-center">
            <p className="text-muted-foreground/30 text-[9px] font-black tracking-[0.5em] uppercase font-mono">
              Pensar ainda é permitido · Lord Junnior © 2026
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
