import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import {
  Bitcoin, Globe, Lock, Terminal, ArrowRight, Shield, BookOpen,
  Award, GraduationCap, Wrench, Mail, Instagram, Github,
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import btcBackground from "@/assets/bitcoin-hero-coin.jpg";





const ORANGE = "#f7931a";
const BLUE = "#4F9DFF";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">{number}</span>
      <div className="h-px flex-1 bg-slate-300/60" />
      <h2 className="font-black text-2xl md:text-3xl tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {title}
      </h2>
    </div>
  );
}

function PillarRing({ percent, delay }: { percent: number; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-60px" });
  const r = 32;
  const c = 2 * Math.PI * r;
  const off = c - (c * percent) / 100;
  useEffect(() => {
    if (inView && ref.current) {
      const t = setTimeout(() => { if (ref.current) ref.current.style.strokeDashoffset = String(off); }, delay);
      return () => clearTimeout(t);
    }
  }, [inView, off, delay]);
  return (
    <div ref={wrapRef} className="relative w-20 h-20">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="4" />
        <circle ref={ref} cx="40" cy="40" r={r} fill="none" stroke={ORANGE} strokeWidth="4"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-slate-900">{percent}%</div>
    </div>
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
        <span className="font-mono text-white/60">{percent}%</span>
      </div>
      <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-[width] duration-[1500ms] ease-out"
          style={{ width: `${w}%`, background: BLUE, boxShadow: `0 0 10px ${BLUE}80` }} />
      </div>
    </div>
  );
}

const TIMELINE = [
  { periodo: "2021 · Presente", empresa: "Plataforma Lord Junnior", cargo: "Arquiteto de Soberania & Pesquisador", desc: "Construção de ferramentas open source, manuais de autocustódia, automação por IA local e produção de conteúdo sobre geopolítica e o tabuleiro financeiro global." },
  { periodo: "2020 · 2021", empresa: "Pivô Cripto & Web3", cargo: "Minerador & Investidor de Criptoativos", desc: "Com o fechamento do comércio físico durante a pandemia, redirecionamento de capital para a montagem de rigs de mineração de BTC e atuação estratégica em jogos NFT." },
  { periodo: "2012 · 2020", empresa: "Atuação Independente & Varejo", cargo: "Especialista em Engenharia Reversa & Sistemas Móveis", desc: "Início reparando sistemas Linux em celulares Motorola e Android, evoluindo para desbloqueios e recuperação total via hardware (boxes). Tornou-se o profissional mais requisitado da cidade." },
  { periodo: "2008 · 2012", empresa: "Empresas Locais & RedeTV", cargo: "Designer Gráfico & Motion", desc: "Início de atuação criativa prestando serviços para empresas locais e emissoras de televisão. Domínio de fluxos de impressão e motion design audiovisual." },
];

const SKILLS_LIST = [
  { label: "Autocustódia & Bitcoin", percent: 95 },
  { label: "Engenharia Reversa & Hardware", percent: 92 },
  { label: "Implementação de IA & Automação", percent: 90 },
  { label: "Design de Interface & Branding", percent: 96 },
  { label: "Geopolítica & Privacidade", percent: 88 },
];

const HUD_NODES = [
  { code: "PS", name: "Photoshop", cat: "Design", level: "Expert" },
  { code: "AI", name: "Illustrator", cat: "Design", level: "Advanced" },
  { code: "FIG", name: "Figma", cat: "UI/UX", level: "Expert" },
  { code: "PR", name: "Premiere Pro", cat: "Vídeo", level: "Advanced" },
  { code: "AE", name: "After Effects", cat: "Motion", level: "Advanced" },
  { code: "LR", name: "Lightroom", cat: "Foto", level: "Expert" },
  { code: "OBS", name: "OBS Studio", cat: "Streaming", level: "Advanced" },
  { code: "OLL", name: "Ollama", cat: "IA Local", level: "Advanced" },
  { code: "OAI", name: "OpenAI API", cat: "Automação", level: "Expert" },
  { code: "RC", name: "React", cat: "Frontend", level: "Advanced" },
  { code: "TW", name: "Tailwind CSS", cat: "Frontend", level: "Expert" },
  { code: "TS", name: "TypeScript", cat: "Frontend", level: "Advanced" },
];

const PILLARS = [
  { node: "NODE 01", title: "BITCOIN", Icon: Bitcoin, desc: "Engenharia de risco e tecnologia de fuga. Autocustódia verdadeira, sem intermediário e sem permissão.", tags: ["Sistema Ativo", "100% Seguro"] },
  { node: "NODE 02", title: "GEOPOLÍTICA", Icon: Globe, desc: "Teoria das bandeiras, leitura do avanço dos CBDCs e do tabuleiro global que decide sua liberdade.", tags: ["Mapa Atualizado", "Tendência Definida"] },
  { node: "NODE 03", title: "PRIVACIDADE", Icon: Lock, desc: "Criptografia, ofuscação de rede e higiene digital contra o rastreamento que te transforma em produto.", tags: ["Blindagem Total", "Rastro Oculto"] },
  { node: "NODE 04", title: "CÓDIGO", Icon: Terminal, desc: "Infraestrutura autônoma para não terceirizar o domínio da tecnologia que sustenta a sua soberania.", tags: ["Infra Própria", "Sem Dependência"] },
];

const CREDENTIALS = [
  { title: "Engenharia Reversa de Sistemas", text: "Uma década dissecando a arquitetura de hardware e software do ecossistema mais hermético do mercado. Não se trata de conserto, e sim de entender como a tecnologia dita as regras de acesso e como romper essa barreira." },
  { title: "Arquitetura Soberana", text: "Vivência prática na construção de redes, criptografia aplicada e arquitetura de aplicações web modernas, que funcionam sem depender de licenças ou servidores corporativos." },
  { title: "Laboratório de Ferramentas", text: "Simuladores, calculadoras de risco e geradores de entropia. Código construído do zero, hospedado de forma autônoma. Se a ferramenta não existe, ela é construída aqui." },
  { title: "Editoria Técnica", text: "Da infraestrutura ao design system, a plataforma inteira é erguida manualmente. E-books e audiobooks são manuais de referência escritos, revisados e narrados com padrão de estúdio." },
];

export default function SobreMim() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      if (blob1.current) blob1.current.style.transform = `translate(${x}px, ${y}px)`;
      if (blob2.current) blob2.current.style.transform = `translate(${-x}px, ${-y}px)`;
      if (blob3.current) blob3.current.style.transform = `translate(${x * 0.5}px, ${-y * 0.5}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  const node = activeNode !== null ? HUD_NODES[activeNode] : null;

  return (
    <>
      <Helmet>
        <title>Sobre Mim, Lord Junnior · Dossiê do Operador</title>
        <meta name="description" content="Dossiê do operador Lord Junnior: pesquisador, investidor e arquiteto de sistemas dedicado a soberania individual, Bitcoin, privacidade e geopolítica." />
        <link rel="canonical" href="https://lordjunnior.com.br/sobre-mim" />
        <meta property="og:title" content="Sobre Mim, Lord Junnior · Dossiê do Operador" />
        <meta property="og:description" content="Perfil, missão, convicções e domínio técnico do operador." />
        <meta property="og:type" content="profile" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      <main className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
        {/* Interactive blob background */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50">
          <div ref={blob1} className="absolute rounded-full blur-[100px] opacity-40 transition-transform duration-300 ease-out will-change-transform"
            style={{ width: 800, height: 800, background: ORANGE, top: "-15%", left: "-10%" }} />
          <div ref={blob2} className="absolute rounded-full blur-[100px] opacity-20 transition-transform duration-300 ease-out will-change-transform"
            style={{ width: 700, height: 700, background: "#3B82F6", bottom: "-15%", right: "-10%" }} />
          <div ref={blob3} className="absolute rounded-full blur-[100px] opacity-[0.15] transition-transform duration-300 ease-out will-change-transform"
            style={{ width: 600, height: 600, background: "#8B5CF6", top: "40%", left: "50%" }} />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 pb-24">
          <div className="mb-6">
            <BackToHome />
          </div>

          {/* Inline nav */}
          <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-black tracking-tight text-slate-900 text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LORD JUNNIOR</span>
            <div className="flex flex-wrap gap-1 text-sm">
              {[
                { l: "Dossiê", h: "#dossie" },
                { l: "Currículo", h: "#curriculo" },
                { l: "Domínio", h: "#dominio" },
                { l: "Catálogo", h: "#catalogo" },
              ].map((i) => (
                <a key={i.h} href={i.h} className="px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium transition-colors">{i.l}</a>
              ))}
            </div>
          </nav>

          {/* HERO */}
          <Reveal>
            <section id="dossie">
            <section className="relative rounded-3xl border border-white/70 p-8 md:p-14 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
              {/* Bitcoin blurred background */}
              <div className="absolute inset-0 -z-10">
                <img
                  src={btcBackground}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-[0.22]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-50/88" />
              </div>
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: ORANGE }} />





              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ORANGE }} />
                    <span className="font-mono text-[10px] tracking-[0.25em] text-orange-700 uppercase">Dossiê 001</span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">Perfil do Operador</span>
                </div>

                <h1
                  className="font-black tracking-tight text-slate-900 leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Fuja da matriz.
                  <br />
                  <span style={{ color: ORANGE }}>Abrace a rede.</span>
                </h1>

                <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                  O dinheiro tradicional foi desenhado para te controlar. A engenharia do Bitcoin foi desenhada para te libertar. Autocustódia, privacidade e código aberto são as suas armas neste novo tabuleiro geopolítico.
                </p>

                <div className="flex flex-wrap gap-2 mt-8">
                  {["SOBERANIA", "PRIVACIDADE", "GEOPOLÍTICA", "BITCOIN", "\u20BF"].map((t) => (
                    <span key={t} className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-md border border-slate-300 bg-white/60 text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase text-slate-500">
                  Lord Junnior · Pesquisador, Investidor e Arquiteto de Sistemas
                </p>
              </div>
            </section>
            </section>
          </Reveal>

          {/* 01 · IDENTIDADE */}
          <section className="mt-20">
            <Reveal>
              <SectionHeader number="01 · Identidade" title="A Assinatura" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-snug mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Lord Junnior não é uma persona de internet. É a assinatura de quem decidiu operar fora do radar.
                </p>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>Atrás deste nome está um pesquisador, investidor e arquiteto de sistemas que passou a última década mapeando as falhas da engenharia de controle estatal, e estudando como a tecnologia pode blindar o seu patrimônio contra elas.</p>
                  <p>O sistema financeiro atual foi desenhado para te manter exatamente onde está: trabalhando até o fim da vida para pagar a inflação que o próprio governo criou. Você não é cliente do banco. Você é a garantia do banco.</p>
                  <p>Não veio de berço de ouro. Não herdou imóveis. Não tem um time de assessores engravatados atrás. O que existe é uma bagagem densa de leitura, erros caros pagos do próprio bolso e conversas com gente que já perdeu tudo em confisco, hiperinflação e canetadas governamentais que nunca pediram licença.</p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 02 · MISSÃO */}
          <section className="mt-20">
            <Reveal>
              <SectionHeader number="02 · Missão" title="O Objetivo" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-snug mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Tirar o conhecimento da prateleira e colocar na mesa da cozinha.
                </p>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>A missão é uma só: equipar pessoas comuns com as ferramentas, a linguagem e a coragem para sair da posição de gado e assumir a posição de proprietário.</p>
                  <p>O conhecimento sobre Bitcoin, geopolítica e privacidade digital existe há anos. Mas vive trancado em inglês, em jargão técnico, em livros acadêmicos e em cursos vendidos como passe de elite para a classe dominante. A proposta aqui é simples: traduzir teoria de elite em engenharia de risco aplicável, sem gordura e sem letra miúda.</p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 03 · CONVICÇÕES */}
          <section className="mt-20">
            <Reveal>
              <SectionHeader number="03 · Convicções" title="Os pilares de atuação" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map(({ node, title, Icon, desc, tags }, i) => {
                const pct = [95, 88, 92, 90][i];
                return (
                <Reveal key={title} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="h-full rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:border-orange-400/50 hover:shadow-[0_20px_50px_rgba(247,147,26,0.15)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-orange-500/25 bg-orange-500/10">
                        <Icon size={20} style={{ color: ORANGE }} />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">{node}</span>
                    </div>
                    <PillarRing percent={pct} delay={i * 120} />
                    </div>
                    <h3 className="font-black text-lg tracking-tight text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                          <span className="w-1 h-1 rounded-full" style={{ background: ORANGE }} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              );})}
            </div>
          </section>

          {/* 04 · TRAJETÓRIA (dark floating cards) */}
          <section id="curriculo" className="mt-20">
            <Reveal>
              <SectionHeader number="04 · Trajetória" title="Competências & Experiência" />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Perfil + Skills */}
              <Reveal>
                <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-[84px] h-[84px] rounded-full border-2 border-white/10 bg-gradient-to-br from-orange-500/40 to-orange-500/10 flex items-center justify-center mb-4">
                      <span className="font-black text-3xl text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LJ</span>
                    </div>
                    <h4 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Lord Junnior</h4>
                    <p className="text-white/70 text-sm mt-1">Arquiteto de Sistemas & Engenharia Reversa</p>
                  </div>
                  <p className="text-white/70 text-sm leading-7 mb-8">
                    Traduzo teoria de elite em engenharia de risco aplicável. Da engenharia reversa de hardware à automação por IA local e arquitetura web autônoma.
                  </p>
                  <h5 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Habilidades</h5>
                  <div className="space-y-5">
                    {SKILLS_LIST.map((s, i) => (<SkillBar key={s.label} {...s} delay={i * 120} />))}
                  </div>
                </div>
              </Reveal>

              {/* Timeline */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-8 h-full">
                  <h5 className="text-white font-bold text-lg mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Experiência</h5>
                  <div className="relative">
                    <div className="absolute left-[1px] top-1.5 bottom-1.5 w-[2px] rounded-full"
                      style={{ background: "linear-gradient(180deg, #00D9FF 0%, rgba(79,157,255,0.6) 40%, rgba(45,108,168,0.3) 70%, rgba(30,58,95,0.1) 100%)", boxShadow: "0 0 8px rgba(79,157,255,0.4)" }} />
                    {TIMELINE.map((t, i) => {
                      const dotColors = ["#00D9FF", "#4F9DFF", "#2D6CA8", "#1E3A5F"];
                      const shadows = ["0 0 12px #00D9FF", "0 0 8px rgba(79,157,255,0.6)", "0 0 4px rgba(45,108,168,0.4)", "none"];
                      return (
                        <motion.div
                          key={t.periodo}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="relative pl-7 pb-12 last:pb-0"
                        >
                          <span className="absolute -left-[5px] top-1 w-3 h-3 rounded-full border-2 border-slate-900"
                            style={{ background: dotColors[i], boxShadow: shadows[i], animation: i === 0 ? "pulse 2s infinite" : undefined }} />
                          <p className="text-white/50 text-xs mb-2 font-mono tracking-wider">{t.periodo}</p>
                          <h6 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.empresa}</h6>
                          <p className="text-white/80 text-sm mt-1 mb-3">{t.cargo}</p>
                          <p className="text-white/70 text-sm leading-7">{t.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Educação + Prêmios + Ferramentas */}
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-8">
                    <h5 className="text-white font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <GraduationCap size={18} /> Educação
                    </h5>
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 hover:border-blue-400/30 hover:bg-white/[0.05] transition-all">
                        <p className="text-white font-bold">Autodidata Contínuo</p>
                        <p className="text-white/70 text-sm mt-1">Bitcoin, criptografia aplicada, geopolítica e engenharia de risco.</p>
                      </div>
                      <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 hover:border-blue-400/30 hover:bg-white/[0.05] transition-all">
                        <p className="text-white font-bold">Certificação em UX & Frontend</p>
                        <p className="text-white/70 text-sm mt-1">Google UX Design & stack moderno React/TypeScript.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-8">
                    <h5 className="text-white font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <Award size={18} /> Prêmios
                    </h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-white font-bold">Awwwards SOTD</p>
                        <p className="text-white/60 text-sm">2023 · Site of the Day</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">CSS Design Awards</p>
                        <p className="text-white/60 text-sm">2022 · Special Kudos</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-8">
                    <h5 className="text-white font-bold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <Wrench size={18} /> Ferramentas
                    </h5>
                    <div className="grid grid-cols-3 gap-3">
                      {["Figma", "After FX", "Photoshop", "Blender", "VS Code", "Framer"].map((t) => (
                        <div key={t} className="rounded-xl bg-white/[0.03] border border-white/5 p-3 text-center text-white/80 text-xs font-semibold hover:bg-white/[0.06] hover:opacity-100 opacity-70 transition-all">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 05 · DOMÍNIO TÉCNICO */}
          <section id="dominio" className="mt-20">
            <Reveal>
              <SectionHeader number="05 · Domínio Técnico" title="As ferramentas por trás de cada entrega" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/70 bg-white/50 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 flex flex-col justify-center">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-600 mb-3">// STATUS DO SISTEMA</p>
                    <h4 className="font-black text-2xl tracking-tight text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {node ? node.name : "SELECIONE UM NÓ"}
                    </h4>
                    {node ? (
                      <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-mono text-xs uppercase text-slate-400">Categoria:</span> {node.cat}</p>
                        <p><span className="font-mono text-xs uppercase text-slate-400">Nível:</span> <span className="font-semibold text-orange-600">{node.level}</span></p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Passe o mouse sobre os módulos para visualizar as especificações operacionais.
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {HUD_NODES.map((n, i) => (
                      <button
                        key={n.code}
                        onMouseEnter={() => setActiveNode(i)}
                        onMouseLeave={() => setActiveNode(null)}
                        className="aspect-square rounded-2xl bg-white/40 border border-slate-900/5 flex flex-col items-center justify-center gap-1 hover:border-orange-400/40 hover:bg-white/90 hover:shadow-[inset_0_0_20px_rgba(247,147,26,0.1)] transition-all"
                      >
                        <span className="font-mono text-xs font-bold text-slate-700 opacity-60 hover:opacity-100 transition-opacity">{n.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section id="catalogo" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal>
              <Link
                to="/protocolo-inicial"
                className="group block h-full rounded-2xl border border-orange-400/40 bg-gradient-to-br from-orange-50 to-white p-8 shadow-[0_8px_32px_rgba(247,147,26,0.1)] hover:shadow-[0_20px_50px_rgba(247,147,26,0.2)] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} style={{ color: ORANGE }} />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-orange-700">Recurso Estratégico</span>
                </div>
                <h3 className="font-black text-2xl tracking-tight text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  PROTOCOLO INICIAL
                </h3>
                <p className="text-sm text-slate-600 mb-5">O primeiro passo tático para sair da gaiola fiat e assumir o controle do seu patrimônio.</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
                  Iniciar Protocolo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/ebooks"
                className="group block h-full rounded-2xl border border-slate-300 bg-white/70 backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:border-slate-400 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-slate-700" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">Biblioteca</span>
                </div>
                <h3 className="font-black text-2xl tracking-tight text-slate-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  THE FREEDOM CODE
                </h3>
                <p className="text-sm text-slate-600 mb-5">Soberania financeira para o século XXI. E-books e manuais escritos com padrão de estúdio.</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-slate-700 group-hover:text-slate-900">
                  Abrir Biblioteca <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          </section>

          {/* CLOSING */}
          <Reveal>
            <footer className="mt-24 text-center">
              <p className="font-black text-2xl md:text-3xl tracking-tight text-slate-900 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                CONHECIMENTO É PODER.
                <br />
                SOBERANIA É DECISÃO.
                <br />
                <span style={{ color: ORANGE }}>AÇÃO É LIBERDADE.</span>
              </p>
              <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500">
                contato@lordjunnior.com.br · © 2026 Lord Junnior
              </p>
            </footer>
          </Reveal>
        </div>
      </main>
    </>
  );
}