import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Wind, Brain, Sprout, FlaskConical, Skull, ShieldCheck,
  ArrowRight, AlertTriangle, BookOpen, Leaf, Activity, Eye
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BackToHome from "@/components/BackToHome";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import PageFloatingToc from "@/components/PageFloatingToc";
import ScrollToTop from "@/components/ScrollToTop";
import bgRape from "@/assets/backgrounds/bg-rape-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ── 6 ATOS ── */
const ATOS = [
  { id: "ato-1-origem", num: "01", titulo: "Origem e Função Real", icon: BookOpen },
  { id: "ato-2-sequestro", num: "02", titulo: "O Sequestro Cultural", icon: Skull },
  { id: "ato-3-bioquimica", num: "03", titulo: "A Bioquímica do Vagal", icon: Brain },
  { id: "ato-4-protocolo", num: "04", titulo: "Protocolo de Aplicação", icon: ShieldCheck },
  { id: "ato-5-quelantes", num: "05", titulo: "Sinergia com Quelantes", icon: FlaskConical },
  { id: "ato-6-rotina", num: "06", titulo: "Rotina de Blindagem Total", icon: Sprout },
];

const tocItems = ATOS.map((a) => ({ id: a.id, label: a.titulo }));

export default function RapeDossie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, filter: "blur(8px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Rapé: Dossiê Técnico de Modulação Biológica Ancestral",
    "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/rape",
    "description": "Estudo técnico do rapé amazônico: origem, sequestro cultural, bioquímica vagal, protocolo de aplicação e sinergia com quelantes brasileiros.",
    "audience": { "@type": "Audience", "audienceType": "Adultos pesquisadores de fitoterapia e neurofisiologia" },
    "about": [
      { "@type": "Thing", "name": "Rapé amazônico" },
      { "@type": "Thing", "name": "Nervo vago" },
      { "@type": "Thing", "name": "Eixo HPA" },
      { "@type": "Thing", "name": "Quelantes naturais" },
    ],
    "lastReviewed": "2026-04-20",
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-foreground overflow-x-hidden">
      <Helmet>
        <title>Rapé: Dossiê Técnico — Modulação Biológica Ancestral | Lord Junnior</title>
        <meta
          name="description"
          content="Não é um produto. É uma ferramenta de modulação vagal sequestrada pela indústria do bem-estar. Bioquímica, protocolo e sinergia com quelantes brasileiros."
        />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/rape" />
        <meta property="og:title" content="Rapé: a ferramenta ancestral que foi banalizada" />
        <meta property="og:description" content="Dossiê técnico completo: origem, bioquímica vagal, protocolo de uso, quelantes e rotina de blindagem." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://lordjunnior.com.br/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <FixedThematicBackground image={bgRape} intensity="medium" />

      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500/80 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <PageFloatingToc items={tocItems} />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pt-12 pb-24 md:pb-32">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-6"
          >
            [ DOSSIÊ TÉCNICO · MODULAÇÃO BIOLÓGICA ANCESTRAL ]
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: APPLE_EASE }}
            className="text-foreground font-bold leading-[0.95] tracking-tight mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              letterSpacing: "0.01em",
            }}
          >
            RAPÉ <br />
            <span className="text-emerald-400/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              não é um produto.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: APPLE_EASE }}
            className="text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-3xl"
          >
            É uma <span className="text-foreground font-semibold">ferramenta ancestral de modulação biológica</span> —
            sequestrada pela indústria do bem-estar, banalizada pelo homem moderno, ignorada pela medicina oficial.
            Este dossiê reconstitui sua função real e o protocolo técnico de uso responsável.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: APPLE_EASE }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {ATOS.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full border border-border/30 hover:border-emerald-500/40"
              >
                {a.num} · {a.titulo}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ALERTA YMYL ── */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-5xl">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 backdrop-blur-sm p-6 md:p-8 flex gap-5 items-start">
            <AlertTriangle className="text-destructive shrink-0 mt-1" size={22} />
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive mb-2">[ AVISO TÉCNICO ]</p>
              <p className="text-sm md:text-base text-foreground/85 leading-7">
                Este conteúdo é <strong>educacional e antropológico</strong>. Não constitui prescrição médica.
                Substâncias contendo nicotina apresentam risco cardiovascular, dependência e contraindicações em
                gestantes, hipertensos, cardiopatas e portadores de transtornos psiquiátricos. A leitura não substitui
                acompanhamento de profissional habilitado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATO 01: ORIGEM ── */}
      <Section id="ato-1-origem" num="01" titulo="Origem e Função Real" icon={BookOpen}>
        <p>
          O rapé — <em>nũ-nũ</em>, <em>hapé</em>, <em>rapeh</em> conforme a etnia — é um pó cerimonial composto por
          tabaco amazônico (<em>Nicotiana rustica</em>, espécie distinta do tabaco industrial) finamente moído com
          cinzas alcalinas de cascas vegetais sagradas como a <em>tsunu</em> (<em>Platycyamus regnellii</em>),
          <em> murici</em> ou <em>parika</em>. A combinação não é arbitrária: a alcalinidade das cinzas modula o pH
          nasal e potencia a absorção dos alcaloides pela mucosa.
        </p>
        <p>
          Para os Yawanawá, Huni Kuin, Katukina e Nukini, o rapé é instrumento de <strong>centralização de foco</strong>,
          <strong> alinhamento corpo-mente</strong> antes de decisões críticas, <strong>limpeza de campo energético</strong> e
          <strong> ferramenta diagnóstica</strong> — o pajé observa a reação física como um médico ocidental observa exames.
          Não é recreativo. Não é místico decorativo. É <strong>tecnologia biocultural</strong> com função operacional.
        </p>
        <p>
          Etnobotânicos como Plotkin (1993) e Schultes &amp; Raffauf (1990) documentaram seu uso ritual há séculos.
          O homem moderno conheceu a substância pelo Instagram — não pela floresta.
        </p>
      </Section>

      {/* ── ATO 02: SEQUESTRO ── */}
      <Section id="ato-2-sequestro" num="02" titulo="O Sequestro Cultural" icon={Skull} accent="rose">
        <p>
          Em menos de uma década, o rapé saiu da maloca e entrou no festival de yoga. <strong>Marcas urbanas</strong> compram
          o pó por preço aviltado de comunidades indígenas, reembalam em frascos de design escandinavo e revendem
          com markup de 800%. O ritual virou produto. A medicina virou estética.
        </p>
        <p>
          Pior: instrutores sem formação aplicam altas dosagens em iniciantes despreparados, ignoram contraindicações
          cardiovasculares e tratam reações adversas (vertigem, vômito, taquicardia severa) como
          <em> "limpeza emocional"</em>. O resultado é previsível — internações silenciosas, traumas, e em casos
          documentados, óbitos.
        </p>
        <p>
          O Estado, por sua vez, não regula. <strong>Não há agência sanitária classificando o produto</strong>, não há
          padrão de pureza, não há rastreabilidade de origem. A liberdade ancestral é instrumentalizada justamente
          porque o sistema oficial fingiu que ela não existia.
        </p>
        <p className="text-emerald-400/90 font-medium">
          Soberania não é consumir o exótico. É entender o mecanismo antes de usar.
        </p>
      </Section>

      {/* ── ATO 03: BIOQUÍMICA ── */}
      <Section id="ato-3-bioquimica" num="03" titulo="A Bioquímica do Vagal" icon={Brain} accent="cyan">
        <p>
          O efeito biológico do rapé é mensurável e reproduzível. Em segundos após a aplicação, três sistemas reagem
          em cascata:
        </p>
        <ul className="list-none space-y-4 my-6">
          <Bullet
            t="1. Estimulação do trigêmeo nasal"
            d="A mucosa nasal possui terminações do nervo trigêmeo (V par craniano) que, quando estimuladas, disparam reflexo de centralização postural — explica o efeito de 'ancoragem' relatado universalmente."
          />
          <Bullet
            t="2. Ativação do nervo vago (X par craniano)"
            d="A descarga simpática inicial dispara, em 60-90 segundos, contra-resposta vagal: queda de frequência cardíaca, ativação parassimpática, tônus vagal elevado. É o mesmo eixo modulado por respiração diafragmática profunda — em escala mais intensa."
          />
          <Bullet
            t="3. Modulação do eixo HPA (Hipotálamo-Hipófise-Adrenal)"
            d="A nicotina interage com receptores nicotínicos colinérgicos centrais, atenuando o circuito de cortisol crônico. Estudos com Nicotiana spp. (Picciotto, 2012) mostram ação ansiolítica aguda em doses microgramas, distinta do efeito do cigarro industrial."
          />
        </ul>
        <p>
          A diferença crítica: o tabaco industrial entrega nicotina por inalação pulmonar profunda, em ciclos curtos
          de 5-10 segundos, gerando padrão de dependência. O rapé entrega por absorção nasal, dose única, com janela
          refratária de horas. <strong>São farmacocinéticas opostas.</strong>
        </p>
      </Section>

      {/* ── ATO 04: PROTOCOLO ── */}
      <Section id="ato-4-protocolo" num="04" titulo="Protocolo de Aplicação Responsável" icon={ShieldCheck} accent="amber">
        <p>
          A aplicação técnica exige <strong>kuripe</strong> (autoaplicador) ou <strong>tepi</strong> (aplicação assistida),
          ambos esculpidos em madeira ou bambu. Frascos plásticos genéricos comprometem a química do pó por reação
          eletrostática.
        </p>
        <ProtocolBlock
          fase="01"
          titulo="Preparação"
          itens={[
            "Jejum mínimo de 60 min (estômago vazio reduz náusea reflexa).",
            "Postura sentada estável — nunca em pé. Risco de síncope vagal nos primeiros usos.",
            "Hidratação prévia (200-300ml de água sem gás).",
            "Ambiente silencioso, ventilado, sem estímulo visual excessivo.",
          ]}
        />
        <ProtocolBlock
          fase="02"
          titulo="Microdose Inicial"
          itens={[
            "Iniciante absoluto: dose menor que um grão de arroz por narina.",
            "Aplicação bilateral: narina esquerda primeiro (lado emocional na tradição), depois direita.",
            "Inalação não é necessária — a absorção é por contato com mucosa nasal.",
            "Aguardar 90-180 segundos imobilizado antes de qualquer movimento.",
          ]}
        />
        <ProtocolBlock
          fase="03"
          titulo="Critérios de Suspensão"
          itens={[
            "Pressão arterial sistólica > 140 mmHg em qualquer momento.",
            "Frequência cardíaca > 110 bpm sustentada após 5 min.",
            "Vertigem prolongada além de 10 min — interromper sequência imediatamente.",
            "Qualquer histórico de arritmia, gestação, lactação, transtorno bipolar não-controlado.",
          ]}
        />
      </Section>

      {/* ── ATO 05: QUELANTES ── */}
      <Section id="ato-5-quelantes" num="05" titulo="Sinergia com Quelantes Brasileiros" icon={FlaskConical} accent="emerald">
        <p>
          O uso ancestral do rapé sempre veio acompanhado de <strong>protocolo de limpeza orgânica</strong>. A floresta
          oferece quelantes naturais para metais pesados e toxinas acumuladas — vetores que a vida urbana injeta
          diariamente no corpo: alumínio (panelas, antitranspirantes), mercúrio (peixes contaminados, amálgamas),
          chumbo (canos antigos, tinta), cádmio (ar industrial).
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { n: "Coentro", a: "Coriandrum sativum", q: "Mobiliza mercúrio e alumínio do tecido nervoso. Uso: 30-50g de folha fresca/dia em ciclo de 3 semanas." },
            { n: "Chlorella", a: "Chlorella vulgaris", q: "Captura metais mobilizados pelo coentro. Uso pareado obrigatório: 2-3g/dia em ciclo conjunto." },
            { n: "Ipê-roxo", a: "Handroanthus impetiginosus", q: "Anti-inflamatório sistêmico, suporte hepático. Decocção da casca, 200ml 2x/dia, ciclos de 14 dias." },
            { n: "Sucupira", a: "Pterodon emarginatus", q: "Detoxificação articular e linfática. Tintura 20-30 gotas 2x/dia, ciclo de 21 dias." },
          ].map((p) => (
            <div key={p.n} className="rounded-xl border border-emerald-900/30 bg-card/30 backdrop-blur p-5">
              <p className="text-emerald-400 font-bold text-sm tracking-wider">{p.n}</p>
              <p className="text-xs italic text-muted-foreground mb-2">{p.a}</p>
              <p className="text-sm text-foreground/85 leading-7">{p.q}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur p-6">
          <p className="text-sm text-foreground/90 leading-7 mb-4">
            Para o protocolo completo com 10 plantas brasileiras quelantes, fichas técnicas individuais com compostos
            ativos, contraindicações e sinergias:
          </p>
          <Link
            to="/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-[0.18em] uppercase hover:bg-emerald-500/25 transition-all"
          >
            Acessar Protocolo de Quelantes
            <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ── ATO 06: ROTINA ── */}
      <Section id="ato-6-rotina" num="06" titulo="Rotina de Blindagem Total" icon={Sprout} accent="emerald">
        <p>
          O rapé sozinho não é estratégia. É <strong>componente</strong> de um sistema integrado de modulação
          biológica que combina respiração, fitoterapia, exposição solar, sono profundo e desintoxicação contínua.
          A indústria do bem-estar vende fragmentos. A soberania exige o ciclo completo.
        </p>
        <ul className="list-none space-y-4 my-6">
          <Bullet t="Manhã" d="Exposição solar direta 10-15 min sem filtro. Respiração diafragmática 4-7-8 por 5 ciclos. Hidratação com sal mineral (não refinado)." />
          <Bullet t="Meio-dia" d="Janela alimentar com proteína animal de pasto + folhas verdes. Coentro fresco no preparo. Pausa de 90 min sem telas." />
          <Bullet t="Tarde" d="Movimento de carga: agachamento, suspensão, caminhada com peso. Protocolo de quelantes conforme ciclo (coentro+chlorella ou ipê)." />
          <Bullet t="Noite" d="Bloqueio de luz azul 2h antes de dormir. Quarto a 18-20°C, blackout total. Microdose de rapé apenas em contexto cerimonial específico — nunca rotineiro." />
          <Bullet t="Ciclo semanal" d="1 dia de jejum hídrico de 16-18h. 1 sessão de sauna ou banho frio para choque vasomotor. Reavaliação do protocolo a cada 21 dias." />
        </ul>

        <div className="mt-12 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/30 to-card/40 backdrop-blur p-8 md:p-10">
          <p
            className="text-foreground text-xl md:text-2xl leading-relaxed"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            "Autonomia não é isolamento. É redução inteligente de dependência —
            inclusive da indústria do bem-estar que vende ancestralidade em frasco."
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mt-6">
            — Lord Junnior · Estrategista de Soberania Individual
          </p>
        </div>
      </Section>

      {/* ── CTAs FINAIS ── */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-400/80 uppercase mb-4">[ CONTINUE A IMERSÃO ]</p>
          <div className="grid md:grid-cols-3 gap-4">
            <NextCard to="/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros" titulo="Protocolo de Quelantes" desc="10 plantas brasileiras com fichas técnicas completas." />
            <NextCard to="/soberania-organica/conhecimento-perdido" titulo="Conhecimento Perdido (Hub)" desc="Educação botânica e fitoterapia documentada." />
            <NextCard to="/soberania-organica/saude-preventiva" titulo="Saúde Preventiva" desc="Sono, sol, microbiota e alimentação anti-inflamatória." />
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}

/* ─── Helpers ─── */
function Section({
  id, num, titulo, icon: Icon, children, accent = "emerald",
}: {
  id: string; num: string; titulo: string; icon: React.ElementType;
  children: React.ReactNode; accent?: string;
}) {
  return (
    <section id={id} className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28 gsap-reveal">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-xl bg-${accent}-500/10 border border-${accent}-500/25`}>
            <Icon className={`text-${accent}-400`} size={22} />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Ato {num}</p>
            <h2
              className="text-foreground font-bold tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
            >
              {titulo}
            </h2>
          </div>
        </div>
        <div className="space-y-5 text-foreground/85 text-base md:text-lg leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}

function Bullet({ t, d }: { t: string; d: string }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="mt-2 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
      <div>
        <p className="text-foreground font-semibold text-base mb-1">{t}</p>
        <p className="text-muted-foreground text-sm md:text-base leading-7">{d}</p>
      </div>
    </li>
  );
}

function ProtocolBlock({ fase, titulo, itens }: { fase: string; titulo: string; itens: string[] }) {
  return (
    <div className="my-6 rounded-xl border border-amber-500/20 bg-amber-950/10 backdrop-blur p-6">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-amber-400 text-xs tracking-[0.3em]">FASE {fase}</span>
        <span className="text-foreground font-bold text-lg">{titulo}</span>
      </div>
      <ul className="space-y-2">
        {itens.map((i, k) => (
          <li key={k} className="flex gap-3 text-sm md:text-base text-foreground/85 leading-7">
            <span className="text-amber-400/70 mt-1 shrink-0">›</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NextCard({ to, titulo, desc }: { to: string; titulo: string; desc: string }) {
  return (
    <Link to={to} className="group rounded-xl border border-border/30 bg-card/30 backdrop-blur p-6 hover:border-emerald-500/40 transition-all">
      <p className="text-foreground font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">{titulo}</p>
      <p className="text-sm text-muted-foreground leading-7 mb-4">{desc}</p>
      <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400">
        Acessar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
