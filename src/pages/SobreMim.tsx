import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import {
  Bitcoin, Globe, Lock, Terminal, ArrowRight, Shield, BookOpen,
  Cpu, Code2, Palette, Camera, Film, Layers, Server, Database, Wind,
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import btcBackground from "@/assets/bitcoin-bg-sobre-mim-light.jpg";




const ORANGE = "#f7931a";

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

function SkillCircle({ label, percent, Icon, delay }: { label: string; percent: number; Icon: any; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-60px" });
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const targetOffset = circumference - (circumference * percent) / 100;

  useEffect(() => {
    if (inView && ref.current) {
      const t = setTimeout(() => {
        if (ref.current) ref.current.style.strokeDashoffset = String(targetOffset);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [inView, targetOffset, delay]);

  return (
    <div ref={wrapRef} className="group flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
          <circle
            ref={ref}
            cx="50" cy="50" r={r} fill="none"
            stroke={ORANGE}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon size={22} className="text-slate-700 group-hover:text-[color:var(--orange)] transition-colors" style={{ ["--orange" as any]: ORANGE }} />
          <span className="font-mono text-[10px] font-semibold text-slate-500 mt-0.5">{percent}%</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-700 text-center">{label}</p>
    </div>
  );
}

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

const SKILLS: { label: string; percent: number; Icon: any }[] = [
  { label: "Photoshop", percent: 95, Icon: Palette },
  { label: "Illustrator", percent: 90, Icon: Palette },
  { label: "Premiere", percent: 88, Icon: Film },
  { label: "After FX", percent: 82, Icon: Film },
  { label: "Lightroom", percent: 92, Icon: Camera },
  { label: "React", percent: 85, Icon: Code2 },
  { label: "Tailwind", percent: 95, Icon: Wind },
  { label: "TypeScript", percent: 85, Icon: Code2 },
  { label: "Supabase", percent: 80, Icon: Database },
  { label: "Vite", percent: 85, Icon: Layers },
  { label: "Linux", percent: 90, Icon: Server },
  { label: "Node.js", percent: 83, Icon: Cpu },
];

export default function SobreMim() {
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

      {/* Bitcoin blurred background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={btcBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-[0.20]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-50/90" />
      </div>



      <main className="relative min-h-screen text-slate-900 overflow-x-hidden">
        {/* Ambient background */}

        <div className="pointer-events-none fixed inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 20%, rgba(247,147,26,0.5), transparent 45%), radial-gradient(circle at 80% 70%, rgba(15,23,42,0.35), transparent 55%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>


        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 pb-24">
          <div className="mb-10">
            <BackToHome />
          </div>

          {/* HERO */}
          <Reveal>
            <section className="relative rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl p-8 md:p-14 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
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
              {PILLARS.map(({ node, title, Icon, desc, tags }, i) => (
                <Reveal key={title} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="h-full rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:border-orange-400/50 hover:shadow-[0_20px_50px_rgba(247,147,26,0.15)] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-orange-500/25 bg-orange-500/10">
                        <Icon size={20} style={{ color: ORANGE }} />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">{node}</span>
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
              ))}
            </div>
          </section>

          {/* 04 · CREDENCIAIS */}
          <section className="mt-20">
            <Reveal>
              <SectionHeader number="04 · Credenciais" title="Por que ouvir" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-slate-700 mb-8 max-w-3xl leading-relaxed">
                Diploma não blindou ninguém de confisco, inflação ou censura. O que sustenta cada linha desta plataforma é tempo de bancada, código em produção e a leitura minuciosa de como o mundo realmente funciona.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CREDENTIALS.map((c, i) => (
                <Reveal key={c.title} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-6 md:p-7 shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:border-orange-400/40 transition-all"
                  >
                    <h4 className="font-bold text-lg text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {c.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 05 · DOMÍNIO TÉCNICO */}
          <section className="mt-20">
            <Reveal>
              <SectionHeader number="05 · Domínio Técnico" title="As ferramentas por trás de cada entrega" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
                  {SKILLS.map((s, i) => (
                    <SkillCircle key={s.label} {...s} delay={i * 90} />
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
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