import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight, Instagram, Github, Youtube } from "lucide-react";
import BackToHome from "@/components/BackToHome";

const ORANGE = "#FF6600";
const BG = "#08090a";

const NAV = [
  { id: "identidade", label: "Identidade" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "prova", label: "Prova" },
  { id: "dominio", label: "Domínio" },
  { id: "catalogo", label: "Catálogo" },
];

const PILLARS = [
  {
    n: "01",
    title: "ARQUITETURA WEB",
    desc: "Desenvolvimento full-stack com React, Next.js e Tailwind. Interfaces reativas, performance otimizada e infraestrutura autônoma.",
    tags: ["Front & Back", "100% Custom"],
  },
  {
    n: "02",
    title: "INTELIGÊNCIA ARTIFICIAL",
    desc: "Implementação de IA local (Ollama) e em nuvem para automação de fluxos de trabalho. Segurança de dados e processamento de alto volume.",
    tags: ["Local & Cloud", "Zero Leak"],
  },
  {
    n: "03",
    title: "DESIGN & BRANDING",
    desc: "17 anos de experiência em direção criativa, UI/UX e motion design. Criação de identidades premium e design systems escaláveis.",
    tags: ["UI / UX / Motion", "High-End"],
  },
  {
    n: "04",
    title: "ENGENHARIA REVERSA",
    desc: "Uma década de bancada dissecando hardware e software. Compreensão profunda de acessos, barreiras e como rompê-las.",
    tags: ["Hardware & OS", "Root Access"],
  },
];

const SKILLS = [
  { label: "Arquitetura Web & Front-end", percent: 95 },
  { label: "Design de Interface & Branding", percent: 96 },
  { label: "Implementação de IA & Automação", percent: 90 },
  { label: "Engenharia Reversa & Hardware", percent: 92 },
  { label: "Motion Design & Audiovisual", percent: 87 },
  { label: "Infraestrutura & DevOps", percent: 85 },
];

const TIMELINE = [
  {
    periodo: "2021 · Presente",
    empresa: "Plataforma Lord Junnior",
    cargo: "Arquiteto de Sistemas & Consultor",
    desc: "Construção de ferramentas open source, automação por IA, design systems e arquitetura de aplicações web soberanas para clientes corporativos.",
  },
  {
    periodo: "2018 · 2021",
    empresa: "Mercado Corporativo",
    cargo: "Consultor de Design & IA",
    desc: "Atuação como parceiro estratégico. Implementação de Inteligência Artificial para alto fluxo, garantindo zero vazamento de dados e unificação de design gráfico com desenvolvimento digital.",
  },
  {
    periodo: "2012 · 2018",
    empresa: "Ecossistema Apple & Agências",
    cargo: "Especialista Técnico & Designer Sênior",
    desc: "Uma década dissecando a arquitetura de hardware e software do ecossistema mais hermético do mercado. Engenharia reversa de sistemas e liderança de design de interface.",
  },
  {
    periodo: "2008 · 2012",
    empresa: "Empresas Locais & RedeTV",
    cargo: "Designer Gráfico & Motion",
    desc: "Início de atuação criativa prestando serviços para empresas locais e emissoras de televisão. Domínio de fluxos de impressão e motion design audiovisual.",
  },
];

const CAMADAS = [
  {
    n: "01",
    title: "Hardware & OS",
    log: "> validacao_hardware: aprovada",
    desc: "Década dissecando a arquitetura de hardware e software do ecossistema mais hermético do mercado. Compreensão profunda de acessos, barreiras e como rompê-las.",
  },
  {
    n: "02",
    title: "Rede & IA Local",
    log: "> validacao_ia: aprovada",
    desc: "Modelos locais sem vazamento de dados. Implementação de infraestrutura blindada. Nuvem corporativa? Não. Hospedagem própria.",
  },
  {
    n: "03",
    title: "Aplicação & UI",
    log: "> validacao_app: aprovada",
    desc: "React, Next.js, TypeScript e Tailwind. Sistemas soberanos do backend ao frontend, design systems escaláveis.",
  },
];

const HUD_NODES = [
  { code: "PS", name: "Photoshop", desc: "Design gráfico avançado, composição e retoque de alto nível." },
  { code: "AI", name: "Illustrator", desc: "Vetorização, identidade visual e design system escalável." },
  { code: "FIG", name: "Figma", desc: "Prototipagem, design systems e colaboração em produto." },
  { code: "PR", name: "Premiere Pro", desc: "Edição audiovisual profissional e finalização." },
  { code: "AE", name: "After Effects", desc: "Motion design, animação de UI e VFX." },
  { code: "LR", name: "Lightroom", desc: "Tratamento fotográfico e color grading." },
  { code: "OBS", name: "OBS Studio", desc: "Streaming e captura profissional multicâmera." },
  { code: "OLL", name: "Ollama", desc: "IA local sem vazamento de dados. Modelos on-premise." },
  { code: "OAI", name: "OpenAI API", desc: "Automação e integração de agentes em fluxo corporativo." },
  { code: "RC", name: "React", desc: "Aplicações reativas, arquitetura de componentes e estado." },
  { code: "TW", name: "Tailwind CSS", desc: "Design system utilitário, escalável e performático." },
  { code: "TS", name: "TypeScript", desc: "Tipagem estática, contratos e segurança em escala." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ label, percent, delay }: { label: string; percent: number; delay: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-40px" });
  const [w, setW] = useState(0);
  useEffect(() => {
    if (inView) { const t = setTimeout(() => setW(percent), delay); return () => clearTimeout(t); }
  }, [inView, percent, delay]);
  return (
    <div ref={wrapRef}>
      <div className="flex justify-between text-sm text-white/85 mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-white/50 text-xs">{percent}%</span>
      </div>
      <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-[1500ms] ease-out"
          style={{ width: `${w}%`, background: "#4F9DFF", boxShadow: "0 0 10px rgba(79,157,255,0.5)" }}
        />
      </div>
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function SectionMark({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <span className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase">{n}</span>
      <div className="h-px flex-1 bg-white/10" />
      <h2 className="font-bold text-xl md:text-2xl tracking-tight text-white uppercase">{title}</h2>
    </div>
  );
}

export default function SobreMim() {
  const [activeNode, setActiveNode] = useState<(typeof HUD_NODES)[number] | null>(null);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: BG, fontFamily: "'Inter Tight', system-ui, sans-serif" }}
    >
      <Helmet>
        <title>Lord Junnior · Arquiteto de Sistemas & Design Estratégico</title>
        <meta name="description" content="17 anos unindo engenharia reversa, arquitetura web full-stack e IA local. Consultoria técnica sênior para empresas que exigem soberania e alto padrão de entrega." />
      </Helmet>

      <BackToHome />

      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090a]/80 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="font-mono text-sm tracking-[0.3em] font-bold">LORD JUNNIOR</div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                {it.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:contato@lordjunnior.com"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold px-4 py-2 border border-white/20 hover:bg-white hover:text-[#08090a] transition-colors"
          >
            Contato
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-40 relative">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ORANGE }} />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50">DOSSIÊ 001 · PERFIL DO OPERADOR</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-bold tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-8xl">
              Arquiteto de<br />
              Sistemas
              <span className="text-white/40"> &</span><br />
              <span style={{ color: ORANGE }}>Design Estratégico.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
              17 anos de mercado unindo engenharia reversa de hardware, desenvolvimento full-stack e automação por Inteligência Artificial.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap gap-3">
              {["Arquitetura Web", "Engenharia Reversa", "Inteligência Artificial", "Design de Interface"].map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-[0.2em] px-3 py-2 border border-white/15 text-white/70">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01 IDENTIDADE */}
      <section id="identidade" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="01 · IDENTIDADE" title="A Assinatura" />
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <p className="text-lg text-white/75 leading-relaxed">
              Lord Junnior é o nome de operação de um profissional dedicado à interseção entre tecnologia, design e infraestrutura autônoma.
            </p>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Minha atuação não se limita a uma única camada do desenvolvimento. Com mais de uma década de experiência prática, dissecando a arquitetura de hardware e software do ecossistema mais hermético do mercado, evoluí para a arquitetura de aplicações web modernas e implementação de Inteligência Artificial local.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/75 leading-relaxed">
              O objetivo é claro: construir sistemas que funcionem sem depender de licenças, terceiros ou nuvens corporativas, garantindo eficiência, segurança e controle total.
            </p>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Seja desenhando uma interface de alto nível, estruturando um design system escalável ou treinando modelos de IA locais para automação corporativa, meu trabalho traduz teoria técnica complexa em engenharia de risco aplicável e entregas de alto impacto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 ATUAÇÃO */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionMark n="02 · ATUAÇÃO" title="O Que Eu Faço" />
          <Reveal>
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 leading-snug max-w-4xl">
              Do design gráfico ao deploy de IA local, a ponte entre estética e engenharia.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-12">
            <Reveal delay={0.1}>
              <p className="text-lg text-white/70 leading-relaxed">
                Atuo como parceiro estratégico para empresas e projetos que exigem um padrão de entrega sênior. A proposta é eliminar a barreira entre a interface do usuário e a infraestrutura de backend, unificando design system, código limpo e automação inteligente.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-white/70 leading-relaxed">
                Implemento Inteligência Artificial local para alto fluxo corporativo, garantindo zero vazamento de dados e segurança absoluta. Desenvolvo aplicações em React e Next.js, crio identidades visuais premium e ergo plataformas inteiras do zero, sem dependência de soluções genéricas.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 CAPACIDADES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="03 · CAPACIDADES" title="Os Pilares de Atuação" />
        <Reveal>
          <p className="text-white/60 mb-14 max-w-2xl text-lg">Quatro frentes técnicas que sustentam todas as minhas entregas.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="bg-[#08090a] p-8 md:p-10 h-full group hover:bg-white/[0.02] transition-colors">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs tracking-[0.3em] text-white/40">{p.n}</span>
                  <div className="h-px flex-1 mx-4 bg-white/10" />
                  <span className="w-2 h-2 rounded-full" style={{ background: ORANGE }} />
                </div>
                <h3 className="font-bold text-xl md:text-2xl tracking-tight mb-4">{p.title}</h3>
                <p className="text-white/65 leading-relaxed mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 border border-white/15 text-white/60">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 TRAJETÓRIA */}
      <section id="trajetoria" className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionMark n="04 · TRAJETÓRIA" title="Competências & Experiência" />

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14">
            <Reveal>
              <div className="border border-white/10 p-8 md:p-10 bg-[#0c0d10]">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">OPERADOR</div>
                <h3 className="font-bold text-3xl tracking-tight mb-2">Lord Junnior</h3>
                <p className="text-white/60 mb-6">Arquiteto de Sistemas & Engenharia Reversa</p>
                <p className="text-white/70 leading-relaxed mb-10">
                  17 anos de mercado. Da engenharia reversa de hardware à automação por IA local e arquitetura web soberana.
                </p>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">HABILIDADES</div>
                <div className="space-y-5">
                  {SKILLS.map((s, i) => (
                    <SkillBar key={s.label} label={s.label} percent={s.percent} delay={i * 120} />
                  ))}
                </div>
              </div>
            </Reveal>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">EXPERIÊNCIA</div>
              <div className="relative pl-8 border-l border-white/10 space-y-10">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.periodo} delay={i * 0.08}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full border-2" style={{ borderColor: ORANGE, background: BG }} />
                      <div className="font-mono text-xs text-white/50 mb-1">{t.periodo}</div>
                      <h4 className="font-bold text-xl">{t.empresa}</h4>
                      <p className="text-sm mb-3" style={{ color: ORANGE }}>{t.cargo}</p>
                      <p className="text-white/65 leading-relaxed">{t.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 PROVA */}
      <section id="prova" className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionMark n="05 · PROVA DE TRABALHO" title="Arquitetura Verificada" />
        <Reveal>
          <p className="text-white/60 max-w-2xl text-lg mb-14">Infraestrutura autônoma, automação por IA e engenharia de sistemas forjados na prática.</p>
        </Reveal>

        {/* Selo + counters */}
        <div className="grid md:grid-cols-4 gap-px bg-white/[0.06] mb-16">
          <div className="bg-[#08090a] p-8">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">SELO DIGITAL</div>
            <div className="font-mono text-sm text-white/85">Assinatura: 0x4F3A...B92</div>
            <div className="font-mono text-xs mt-1" style={{ color: ORANGE }}>Nó: ARQUITETO_SÊNIOR</div>
          </div>
          {[
            { v: 17, s: "", l: "Anos de Iteração" },
            { v: 0, s: "", l: "Vazamentos em IA" },
            { v: 100, s: "%", l: "Infraestrutura Autônoma" },
          ].map((c) => (
            <div key={c.l} className="bg-[#08090a] p-8">
              <div className="text-5xl font-bold tracking-tight mb-2" style={{ color: ORANGE }}>
                <Counter target={c.v} suffix={c.s} />
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">{c.l}</div>
            </div>
          ))}
        </div>

        {/* Fluxo Problema → Solução */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 mb-16 border border-white/10 p-8 md:p-10 bg-[#0c0d10]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">PROBLEMA</div>
            <p className="text-white/85 text-lg">Dependência de terceiros, ineficiência, plataformas genéricas.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">FLUXO</div>
            <ArrowRight className="w-6 h-6" style={{ color: ORANGE }} />
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">SOLUÇÃO</div>
            <p className="text-white/85 text-lg">Soberania, automação por IA, infraestrutura própria.</p>
          </div>
        </div>

        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">CAMADAS DE ATUAÇÃO NO SISTEMA</div>
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {CAMADAS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <div className="bg-[#08090a] p-8 h-full">
                <div className="font-mono text-xs tracking-[0.3em] text-white/40 mb-3">{c.n}</div>
                <h4 className="font-bold text-lg mb-3">{c.title}</h4>
                <div className="font-mono text-xs mb-4" style={{ color: ORANGE }}>{c.log}</div>
                <p className="text-white/65 leading-relaxed text-sm">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 DOMÍNIO */}
      <section id="dominio" className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionMark n="06 · DOMÍNIO TÉCNICO" title="As Ferramentas Por Trás de Cada Entrega" />

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
            <div className="border border-white/10 bg-[#0c0d10] p-8">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// STATUS DO SISTEMA</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {HUD_NODES.map((n) => {
                  const active = activeNode?.code === n.code;
                  return (
                    <button
                      key={n.code}
                      onMouseEnter={() => setActiveNode(n)}
                      onClick={() => setActiveNode(n)}
                      className={`aspect-square flex items-center justify-center border font-mono text-sm font-bold tracking-wider transition-all ${
                        active
                          ? "border-transparent text-[#08090a]"
                          : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                      style={active ? { background: ORANGE, boxShadow: `0 0 20px ${ORANGE}55` } : {}}
                    >
                      {n.code}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0c0d10] p-8 flex flex-col justify-center">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">// NÓ SELECIONADO</div>
              <div className="min-h-[140px]">
                <div className="text-3xl font-bold tracking-tight mb-2 transition-all" style={{ color: activeNode ? ORANGE : "rgba(255,255,255,0.4)" }}>
                  {activeNode ? activeNode.name : "SELECIONE UM NÓ"}
                </div>
                <p className="text-white/70 leading-relaxed">
                  {activeNode ? activeNode.desc : "Passe o mouse sobre os módulos para visualizar as especificações operacionais."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOLO DE AÇÃO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// PROTOCOLO DE AÇÃO</div>
        <Reveal>
          <h2 className="font-bold text-4xl md:text-6xl tracking-tight leading-[1] max-w-4xl">
            O sistema está posto.<br />
            <span style={{ color: ORANGE }}>Você vai construir ou só consumir?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg text-white/70 leading-relaxed">
            Você ainda acredita que soluções genéricas de prateleira vão escalar o seu negócio, ou já aceitou que a verdadeira autonomia exige arquitetura própria?
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="mailto:contato@lordjunnior.com"
            className="inline-flex items-center gap-3 mt-10 px-8 py-5 font-bold uppercase tracking-[0.2em] text-sm transition-colors"
            style={{ background: ORANGE, color: "#08090a" }}
          >
            Iniciar Protocolo de Autonomia
            <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>
      </section>

      {/* CATÁLOGO / ARSENAL */}
      <section id="catalogo" className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">// ARSENAL TÉCNICO</div>
          <Reveal>
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight mb-14">Ferramentas para a sua autonomia.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
            <Reveal>
              <div className="bg-[#08090a] p-10 h-full flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">DISPONIBILIDADE</div>
                <h3 className="font-bold text-2xl mb-4">CONSULTORIA TÉCNICA</h3>
                <p className="text-white/70 leading-relaxed mb-8 flex-1">
                  Parceria estratégica para automação por IA, arquitetura web e design systems.
                </p>
                <a
                  href="mailto:contato@lordjunnior.com"
                  className="flex items-center justify-center gap-2 w-full py-5 bg-white text-[#08090a] font-bold hover:opacity-90 uppercase tracking-[0.2em] text-sm"
                  style={{ transition: "background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = ORANGE; (e.currentTarget as HTMLAnchorElement).style.color = "#08090a"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; (e.currentTarget as HTMLAnchorElement).style.color = "#08090a"; }}
                >
                  Iniciar Conversa <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-[#08090a] p-10 h-full flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">ECOSSISTEMA</div>
                <h3 className="font-bold text-2xl mb-4">THE FREEDOM CODE</h3>
                <p className="text-white/70 leading-relaxed mb-8 flex-1">
                  Ferramentas open source, e-books e simuladores construídos do zero.
                </p>
                <a
                  href="/"
                  className="flex items-center justify-center gap-2 w-full py-5 border border-white text-white font-bold hover:bg-white hover:text-[#08090a] transition-colors uppercase tracking-[0.2em] text-sm"
                >
                  Ver Biblioteca <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48 text-center">
        <Reveal>
          <p className="font-bold text-3xl md:text-5xl tracking-tight leading-[1.15]">
            CONHECIMENTO É PODER.<br />
            AUTONOMIA É DECISÃO.<br />
            <span style={{ color: ORANGE }}>AÇÃO É ENGENHARIA.</span>
          </p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#06070a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-mono text-sm tracking-[0.3em] font-bold mb-4">LORD JUNNIOR</div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Arquiteto de Sistemas. Engenharia reversa, IA local e design de alto padrão.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">NAVEGAÇÃO</div>
            <ul className="space-y-2 text-white/70">
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              {NAV.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:text-white transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">CONEXÃO</div>
            <div className="flex flex-col gap-3 text-white/70">
              <a href="mailto:contato@lordjunnior.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> Email Direto
              </a>
              <a href="https://instagram.com/lord.junnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://youtube.com/@LordJunnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" /> YouTube
              </a>
              <a href="https://github.com/lordjunnior" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 flex justify-between">
            <span>© {new Date().getFullYear()} LORD JUNNIOR</span>
            <span>DOSSIÊ 001 · v2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}