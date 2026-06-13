"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Bitcoin,
  Globe,
  Lock,
  Cpu,
  Palette,
  Github,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  Shield,
  Wifi,
  Activity,
  Moon,
  Server,
  Zap,
  Terminal,
  Eye,
  Database,
  Network,
  ChevronRight,
  Circle,
  Radio,
  Fingerprint,
  BookOpen,
  Code2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const CYAN = "#22d3ee";
const CYAN_DIM = "#0e7490";
const BG_BASE = "#09090b";
const BG_CARD = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Utility: Reveal on Scroll ─────────────────────────────────────────────────
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Utility: Magnetic Card ────────────────────────────────────────────────────
function MagCard({
  children,
  className = "",
  glowColor = CYAN_DIM,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative rounded-xl border transition-colors duration-300 ${className}`}
      style={{
        background: BG_CARD,
        borderColor: hovered ? `${glowColor}80` : BORDER,
        boxShadow: hovered
          ? `0 0 24px 0 ${glowColor}33, inset 0 0 0 1px ${glowColor}22`
          : "none",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scanline overlay ──────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)",
      }}
    />
  );
}

// ─── Corner accent ─────────────────────────────────────────────────────────────
function CornerAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute ${className} text-cyan-500/20`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M0 20 L0 0 L20 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ─── BLOCK: Profile ────────────────────────────────────────────────────────────
function ProfileBlock() {
  return (
    <MagCard className="p-5 flex flex-col gap-4 h-full backdrop-blur-sm">
      <CornerAccent className="top-2 left-2" />
      <CornerAccent className="bottom-2 right-2 rotate-180" />

      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2"
            style={{ borderColor: `${CYAN_DIM}80` }}
          >
            <div
              className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center"
            >
              <Fingerprint size={24} className="text-cyan-500/60" />
            </div>
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-950"
            style={{ background: "#22c55e" }}
          />
        </div>

        <div>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-0.5">
            OPERADOR
          </p>
          <h2
            className="text-base font-bold tracking-tight text-white"
            style={{ textShadow: `0 0 18px ${CYAN}55` }}
          >
            Lord Junnior
          </h2>
          <p className="text-[11px] text-zinc-500">@lordjunnior</p>
        </div>
      </div>

      {/* Title */}
      <div className="border-t border-white/5 pt-3">
        <p
          className="text-[11px] font-mono tracking-widest uppercase font-semibold"
          style={{ color: CYAN }}
        >
          INTELIGÊNCIA · GEOPOLÍTICA
        </p>
        <p
          className="text-[11px] font-mono tracking-widest uppercase font-semibold"
          style={{ color: CYAN }}
        >
          LIBERDADE DIGITAL
        </p>
      </div>

      {/* Bio snippet */}
      <p className="text-xs text-zinc-400 leading-relaxed">
        Empreendedor, estrategista digital e pesquisador independente. Preparando
        pessoas para a era do monitoramento digital.
      </p>

      {/* Social links */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
        {[
          { icon: Instagram, label: "Instagram" },
          { icon: Twitter, label: "X / Twitter" },
          { icon: Github, label: "GitHub" },
          { icon: Mail, label: "E-mail" },
        ].map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            title={label}
            className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <Icon size={14} />
          </motion.button>
        ))}
      </div>
    </MagCard>
  );
}

// ─── BLOCK: Hero Banner ────────────────────────────────────────────────────────
function HeroBlock() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <MagCard className="relative overflow-hidden min-h-[180px] flex flex-col justify-end p-5 backdrop-blur-sm">
      <CornerAccent className="top-2 left-2" />

      {/* Parallax BG grid */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-10"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Glow blob */}
      <div
        className="absolute top-4 right-8 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: CYAN }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            ONLINE · v2.0.26
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-none"
          style={{ textShadow: `0 0 40px ${CYAN}44` }}
        >
          LORD JUNNIOR
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1 tracking-wide">
          Conhecimento é poder. Soberania é decisão. Ação é liberdade.
        </p>
      </div>
    </MagCard>
  );
}

// ─── BLOCK: Tab Content ────────────────────────────────────────────────────────
const TAB_CONTENT = {
  sobre: {
    heading: "Sobre Mim",
    body: `Lord Junnior é um empreendedor, estrategista digital e pesquisador independente dedicado ao estudo de Bitcoin, geopolítica e privacidade digital.

Transforma conhecimento complexo em ferramentas práticas para quem deseja preservar autonomia financeira, tecnológica e intelectual.

Com mais de 10 anos de experiência em tecnologia, design e comunicação, constrói plataformas, conteúdos e aplicações que unem estratégia, criatividade e liberdade.`,
    callout: {
      icon: Shield,
      title: "MENTALIDADE DE DONO",
      text: "Não espere permissão. Assuma o controle. Construa sua liberdade.",
    },
  },
  expertise: {
    heading: "Expertise",
    items: [
      { icon: Bitcoin, label: "Bitcoin & Autocustódia", desc: "Hardware wallets, multisig, Lightning Network" },
      { icon: Globe, label: "Geopolítica Aplicada", desc: "Mobilidade internacional, flags theory, jurisdições" },
      { icon: Lock, label: "Privacidade Operacional", desc: "OpSec, anonimato digital, redução de exposição" },
      { icon: Code2, label: "Desenvolvimento Full-Stack", desc: "React, TypeScript, Supabase, APIs REST" },
      { icon: Palette, label: "Design Estratégico", desc: "UI/UX, brand identity, motion design" },
      { icon: BookOpen, label: "Educação Digital", desc: "E-books, cursos, conteúdo de alta densidade" },
    ],
  },
  projetos: {
    heading: "Projetos",
    items: [
      {
        title: "Kit de Soberania",
        desc: "Passaporte, Hardware Wallet, Faraday Bag, Linux. Autocustódia e independência financeira.",
        tag: "PRODUTO",
      },
      {
        title: "The Freedom Code",
        desc: "Série de e-books sobre soberania financeira para o século XXI.",
        tag: "E-BOOK",
      },
      {
        title: "lordjunnior.com.br",
        desc: "Plataforma de conteúdo, produtos digitais e hub de soberania.",
        tag: "PLATAFORMA",
      },
    ],
  },
  missao: {
    heading: "Missão",
    body: `Preparar indivíduos para a era do monitoramento digital — onde privacidade, autonomia financeira e soberania pessoal deixaram de ser ideais e se tornaram necessidades operacionais.

A missão é clara: decodificar sistemas complexos, distribuir conhecimento estratégico e construir ferramentas que ampliem a liberdade real de quem recusa depender de sistemas que não controla.`,
    quote: "Preparando-se para os próximos 20 anos.",
  },
};

function CentralTabsBlock() {
  const [active, setActive] = useState("sobre");

  return (
    <MagCard className="p-0 overflow-hidden backdrop-blur-sm h-full">
      <CornerAccent className="top-2 left-2" />
      <CornerAccent className="bottom-2 right-2 rotate-180" />

      <Tabs value={active} onValueChange={setActive} className="h-full flex flex-col">
        <TabsList className="w-full rounded-none bg-transparent border-b border-white/6 px-4 pt-3 pb-0 gap-1 justify-start h-auto shrink-0">
          {[
            { value: "sobre", label: "SOBRE MIM" },
            { value: "expertise", label: "EXPERTISE" },
            { value: "projetos", label: "PROJETOS" },
            { value: "missao", label: "MISSÃO" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`
                rounded-none text-[10px] font-mono tracking-widest px-3 py-2 border-b-2 transition-all
                data-[state=active]:bg-transparent data-[state=active]:shadow-none
                data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-400
                data-[state=inactive]:text-zinc-600 data-[state=inactive]:border-transparent
                hover:text-zinc-300
              `}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {/* SOBRE */}
              <TabsContent value="sobre" className="mt-0 p-5 space-y-4">
                <div className="space-y-2">
                  {TAB_CONTENT.sobre.body.split("\n\n").map((p, i) => (
                    <p key={i} className="text-xs text-zinc-400 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div
                  className="flex items-start gap-3 rounded-lg p-3 border"
                  style={{ background: `${CYAN}08`, borderColor: `${CYAN_DIM}40` }}
                >
                  <TAB_CONTENT.sobre.callout.icon
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: CYAN }}
                  />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest font-bold" style={{ color: CYAN }}>
                      {TAB_CONTENT.sobre.callout.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{TAB_CONTENT.sobre.callout.text}</p>
                  </div>
                </div>
              </TabsContent>

              {/* EXPERTISE */}
              <TabsContent value="expertise" className="mt-0 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TAB_CONTENT.expertise.items.map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-2.5 rounded-lg p-2.5 border border-white/5 hover:border-white/10 transition-colors"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <Icon size={14} className="shrink-0 mt-0.5" style={{ color: CYAN }} />
                      <div>
                        <p className="text-[11px] font-semibold text-zinc-200">{label}</p>
                        <p className="text-[10px] text-zinc-500 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* PROJETOS */}
              <TabsContent value="projetos" className="mt-0 p-5 space-y-2.5">
                {TAB_CONTENT.projetos.items.map((p) => (
                  <div
                    key={p.title}
                    className="group flex items-start justify-between gap-3 rounded-lg p-3 border border-white/5 hover:border-cyan-500/20 transition-all cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className="text-[9px] font-mono tracking-widest px-1.5 py-0 rounded-sm border-0"
                          style={{ background: `${CYAN_DIM}30`, color: CYAN }}
                        >
                          {p.tag}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-zinc-200">{p.title}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                    <ExternalLink
                      size={13}
                      className="shrink-0 text-zinc-700 group-hover:text-cyan-400 mt-1 transition-colors"
                    />
                  </div>
                ))}
              </TabsContent>

              {/* MISSÃO */}
              <TabsContent value="missao" className="mt-0 p-5 space-y-4">
                <div className="space-y-2">
                  {TAB_CONTENT.missao.body.split("\n\n").map((p, i) => (
                    <p key={i} className="text-xs text-zinc-400 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <p
                  className="text-[11px] font-mono tracking-wide italic border-l-2 pl-3"
                  style={{ color: CYAN, borderColor: CYAN }}
                >
                  "{TAB_CONTENT.missao.quote}"
                </p>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </MagCard>
  );
}

// ─── BLOCK: Tools Stack ────────────────────────────────────────────────────────
const TOOLS = [
  { label: "Photoshop", color: "#31a8ff" },
  { label: "Illustrator", color: "#ff9a00" },
  { label: "Premiere", color: "#9999ff" },
  { label: "After Effects", color: "#9999ff" },
  { label: "Lightroom", color: "#31a8ff" },
  { label: "Vite", color: "#bd34fe" },
  { label: "React", color: "#61dafb" },
  { label: "Tailwind", color: "#38bdf8" },
  { label: "Supabase", color: "#3ecf8e" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Framer", color: "#0055ff" },
  { label: "Linux", color: "#f5a623" },
];

function ToolsBlock() {
  return (
    <MagCard className="p-5 backdrop-blur-sm">
      <CornerAccent className="top-2 right-2 -scale-x-100" />
      <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
        FERRAMENTAS E TECNOLOGIAS
      </p>
      <div className="flex flex-wrap gap-2">
        {TOOLS.map(({ label, color }) => (
          <motion.span
            key={label}
            whileHover={{ scale: 1.06 }}
            className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono border cursor-default select-none"
            style={{
              background: `${color}10`,
              borderColor: `${color}30`,
              color: `${color}cc`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            {label}
          </motion.span>
        ))}
      </div>
    </MagCard>
  );
}

// ─── BLOCK: Three Pillars ──────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Bitcoin,
    title: "BITCOIN",
    desc: "Autocustódia, preservação patrimonial e proteção contra inflação monetária.",
    color: "#f7931a",
  },
  {
    icon: Globe,
    title: "GEOPOLÍTICA",
    desc: "Compreenda as forças que moldam moedas, governos e liberdade econômica.",
    color: CYAN,
  },
  {
    icon: Lock,
    title: "PRIVACIDADE",
    desc: "Reduza sua exposição digital e recupere o controle sobre seus dados.",
    color: "#a78bfa",
  },
  {
    icon: Shield,
    title: "SOBERANIA",
    desc: "Ferramentas e conhecimento para depender menos de terceiros.",
    color: "#34d399",
  },
];

function PillarsBlock() {
  return (
    <MagCard className="p-5 backdrop-blur-sm">
      <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
        O QUE VOCÊ ENCONTRA AQUI
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PILLARS.map(({ icon: Icon, title, desc, color }) => (
          <motion.div
            key={title}
            whileHover={{ y: -3 }}
            className="flex flex-col gap-2 rounded-lg p-3 border border-white/5 hover:border-white/10 transition-all cursor-default"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{ background: `${color}15` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color }}>
                {title}
              </p>
              <p className="text-[10px] text-zinc-500 leading-snug mt-0.5">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </MagCard>
  );
}

// ─── BLOCK: System Status Sidebar ─────────────────────────────────────────────
function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-400" : "bg-zinc-600"} ${active ? "animate-pulse" : ""}`}
    />
  );
}

function SystemStatusBlock() {
  const [uptime, setUptime] = useState(0);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const t = setInterval(() => {
      setUptime((s) => s + 1);
      setPing(Math.floor(10 + Math.random() * 8));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const widgets = [
    {
      icon: Activity,
      label: "PING",
      value: `${ping}ms`,
      active: true,
      color: "#22c55e",
    },
    {
      icon: Server,
      label: "UPTIME",
      value: fmt(uptime),
      active: true,
      color: CYAN,
    },
    {
      icon: Moon,
      label: "MODO",
      value: "NOTURNO",
      active: true,
      color: "#818cf8",
    },
    {
      icon: Wifi,
      label: "REDE",
      value: "TOR · VPN",
      active: true,
      color: "#34d399",
    },
    {
      icon: Database,
      label: "NÓ BTC",
      value: "ATIVO",
      active: true,
      color: "#f7931a",
    },
    {
      icon: Radio,
      label: "SINAL",
      value: "FORTE",
      active: true,
      color: CYAN,
    },
    {
      icon: Network,
      label: "BLOCKCHAIN",
      value: "SYNC",
      active: true,
      color: "#22c55e",
    },
    {
      icon: Eye,
      label: "EXPOSIÇÃO",
      value: "MÍNIMA",
      active: true,
      color: "#a78bfa",
    },
  ];

  return (
    <MagCard className="p-4 backdrop-blur-sm h-full flex flex-col gap-3">
      <CornerAccent className="top-2 right-2 -scale-x-100" />

      <div className="flex items-center gap-2 mb-1">
        <Terminal size={12} style={{ color: CYAN }} />
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          STATUS DO SISTEMA
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {widgets.map(({ icon: Icon, label, value, active, color }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md px-2.5 py-2 border border-white/5"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-2">
              <Icon size={12} style={{ color }} />
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest">{label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusDot active={active} />
              <span className="text-[10px] font-mono font-semibold" style={{ color }}>
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sovereignty Kit CTA */}
      <div
        className="mt-auto rounded-lg border p-3"
        style={{ background: `${CYAN}08`, borderColor: `${CYAN_DIM}40` }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Zap size={11} style={{ color: CYAN }} />
          <p className="text-[10px] font-mono tracking-widest font-bold" style={{ color: CYAN }}>
            KIT DE SOBERANIA
          </p>
        </div>
        <p className="text-[10px] text-zinc-400 leading-snug mb-2">
          Passaporte. Hardware Wallet. Faraday Bag. Linux. Autonomia total.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-1 rounded px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest transition-colors"
          style={{ background: `${CYAN_DIM}40`, color: CYAN }}
        >
          VER BIBLIOTECA <ChevronRight size={10} />
        </motion.button>
      </div>
    </MagCard>
  );
}

// ─── BLOCK: Pillars Icons Row (top nav icons) ──────────────────────────────────
function PillarIconsBlock() {
  const items = [
    { icon: Bitcoin, label: "BITCOIN", color: "#f7931a" },
    { icon: Globe, label: "GEOPOLÍTICA", color: CYAN },
    { icon: Lock, label: "PRIVACIDADE", color: "#a78bfa" },
    { icon: Cpu, label: "TECNOLOGIA", color: "#34d399" },
    { icon: Palette, label: "DESIGN", color: "#fb923c" },
  ];

  return (
    <MagCard className="p-4 backdrop-blur-sm">
      <div className="flex items-center justify-around">
        {items.map(({ icon: Icon, label, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex flex-col items-center gap-1.5 cursor-default"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                background: `${color}12`,
                borderColor: `${color}25`,
              }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500">{label}</span>
          </motion.div>
        ))}
      </div>
    </MagCard>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t border-white/6 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-600 tracking-widest"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Mail size={11} /> contato@lordjunnior.com.br
        </span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Globe size={11} /> lordjunnior.com.br
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Circle size={8} className="fill-cyan-500 text-cyan-500 animate-pulse" />
        <span style={{ color: CYAN }}>CONHECIMENTO É PODER · SOBERANIA É DECISÃO</span>
      </div>
      <span className="flex items-center gap-1.5">
        <Instagram size={11} /> @lordjunnior
      </span>
    </footer>
  );
}

// ─── MAIN PORTFOLIO ────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div
      className="min-h-screen font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-200"
      style={{ background: BG_BASE, color: "#e4e4e7" }}
    >
      <Scanlines />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: CYAN }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.03] blur-3xl"
          style={{ background: "#818cf8" }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-6 space-y-4">

        {/* ── ROW 1: Profile + Hero + System Status ─────────────────────── */}
        <RevealBlock delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_200px] gap-4">
            <ProfileBlock />
            <HeroBlock />
            <div className="hidden md:block">
              <SystemStatusBlock />
            </div>
          </div>
        </RevealBlock>

        {/* ── ROW 2: Pillar Icons ──────────────────────────────────────── */}
        <RevealBlock delay={0.08}>
          <PillarIconsBlock />
        </RevealBlock>

        {/* ── ROW 3: Central Tabs + System Status (mobile) ─────────────── */}
        <RevealBlock delay={0.14}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4">
            <CentralTabsBlock />
            <div className="md:hidden">
              <SystemStatusBlock />
            </div>
          </div>
        </RevealBlock>

        {/* ── ROW 4: Tools ─────────────────────────────────────────────── */}
        <RevealBlock delay={0.2}>
          <ToolsBlock />
        </RevealBlock>

        {/* ── ROW 5: Pillars ───────────────────────────────────────────── */}
        <RevealBlock delay={0.26}>
          <PillarsBlock />
        </RevealBlock>

      </div>

      <Footer />
    </div>
  );
}
