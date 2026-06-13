"use client";

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  BookOpen,
  Code2,
  ChevronLeft
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

// ─── Terminal Logs System ─────────────────────────────────────────────────────
const LOG_LINES = [
  "[SYS] Camuflagem de metadados ativa.",
  "[NET] Roteamento Onion estabelecido.",
  "[SEC] Tráfego de saída encriptado.",
  "[BTC] Bloco sincronizado com sucesso.",
  "[NET] Conexão VPN multi-hop verificada.",
  "[SYS] Daemon de segurança [HULK] em vigília.",
  "[SEC] 42 rastreadores bloqueados.",
  "[PGP] Assinatura digital autenticada.",
];

function LiveTerminalLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, LOG_LINES[index]];
        if (newLogs.length > 3) newLogs.shift();
        return newLogs;
      });
      index = (index + 1) % LOG_LINES.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 right-4 text-right hidden sm:block pointer-events-none">
      <AnimatePresence>
        {logs.map((log, i) => (
          <motion.div
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[9px] font-mono tracking-widest uppercase mb-1"
            style={{ color: `${CYAN}80` }}
          >
            {log} <span className="inline-block w-1 h-2 bg-cyan-500/50 ml-1 animate-pulse" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── BLOCK: Profile ────────────────────────────────────────────────────────────
function ProfileBlock() {
  return (
    <MagCard className="p-5 flex flex-col gap-4 h-full backdrop-blur-sm">
      <CornerAccent className="top-2 left-2" />
      <CornerAccent className="bottom-2 right-2 rotate-180" />

      {/* Avatar com a sua imagem oficial */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2"
            style={{ borderColor: `${CYAN_DIM}80` }}
          >
            <img
              src="[https://res.cloudinary.com/dcgkqpg2w/image/upload/v1781309270/Homem_quieto_em_foto_dram%C3%A1tica_ztrqxy.png](https://res.cloudinary.com/dcgkqpg2w/image/upload/v1781309270/Homem_quieto_em_foto_dram%C3%A1tica_ztrqxy.png)"
              alt="Lord Junnior"
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
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

      <p className="text-xs text-zinc-400 leading-relaxed">
        Estrategista digital, pesquisador e construtor. Preparando
        pessoas para a era do monitoramento digital.
      </p>

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
        {[
          { icon: Instagram, label: "Instagram", url: "[https://instagram.com/lordjunnior](https://instagram.com/lordjunnior)" },
          { icon: Twitter, label: "X / Twitter", url: "[https://x.com/lordjunnior](https://x.com/lordjunnior)" },
          { icon: Github, label: "GitHub", url: "[https://github.com/lordjunnior](https://github.com/lordjunnior)" },
          { icon: Mail, label: "E-mail", url: "mailto:contato@lordjunnior.com.br" },
        ].map(({ icon: Icon, label, url }) => (
          <motion.a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            title={label}
            className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <Icon size={14} />
          </motion.a>
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

      {/* Parallax BG grid com Radar */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20"
        aria-hidden
      >
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <motion.div 
            className="absolute left-0 right-0 h-[2px]"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
              boxShadow: `0px 0px 15px 3px ${CYAN}66`
            }}
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>

      <div
        className="absolute top-4 right-8 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: CYAN }}
        aria-hidden
      />

      <div className="relative z-10 w-full">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            SISTEMA OPERACIONAL ATIVO
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-none"
          style={{ textShadow: `0 0 40px ${CYAN}44` }}
        >
          LORD JUNNIOR
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-1 tracking-wide">
          A liberdade não é concedida. Ela é construída.
        </p>
      </div>

      <LiveTerminalLogs />
    </MagCard>
  );
}

// ─── BLOCK: Tab Content ────────────────────────────────────────────────────────
const TAB_CONTENT = {
  sobre: {
    body: `Um brasileiro cansado de ver gente boa quebrada. Lord Junnior é o nome de batalha de um pesquisador, investidor e construtor dedicado a entender como o dinheiro, o Estado e a tecnologia se encaixam.\n\nCom mais de duas décadas transitando entre tecnologia, design e educação digital, a constatação foi simples: o conhecimento existe, mas vive restrito. A missão é equipar pessoas comuns com ferramentas para assumir o controle do próprio tabuleiro.`,
    callout: {
      icon: Shield,
      title: "MENTALIDADE DE DONO",
      text: "Indivíduos preparados sobrevivem. Dependentes são controlados.",
    },
  },
  expertise: {
    items: [
      { icon: Bitcoin, label: "Bitcoin & Autocustódia", desc: "Hardware wallets, proteção contra confiscos." },
      { icon: Globe, label: "Geopolítica (O Tabuleiro)", desc: "Entendimento do cenário, CBDCs e jurisdições." },
      { icon: Lock, label: "Privacidade (Blindagem)", desc: "Ofuscação de rastro digital e higiene cibernética." },
      { icon: Code2, label: "Arquitetura Web", desc: "Desenvolvimento estrutural autônomo e de alta performance." },
      { icon: Palette, label: "Narrativa Visual", desc: "Design estratégico e posicionamento audiovisual." },
      { icon: BookOpen, label: "Educação Soberana", desc: "Manuais operacionais de autodefesa financeira." },
    ],
  },
  projetos: {
    items: [
      {
        title: "A Plataforma",
        desc: "A maior biblioteca em português sobre soberania individual.",
        tag: "SISTEMA",
        url: "/ferramentas"
      },
      {
        title: "The Freedom Code",
        desc: "Série densa de e-books para serem lidos com lápis na mão.",
        tag: "BIBLIOTECA",
        url: "/ebooks"
      },
      {
        title: "Vapt Marketplace",
        desc: "Desenvolvimento e construção do zero de infraestrutura web.",
        tag: "TECNOLOGIA",
        url: "#"
      },
    ],
  },
  missao: {
    body: `Devolver ao indivíduo o que foi terceirizado para o Estado.\n\nO século XXI será marcado pela disputa entre autonomia e dependência. Quem compreender dinheiro, tecnologia e poder terá mais chances de preservar sua liberdade. Quem ignorar, terá sua vida decidida por terceiros.\n\nNão vendo notícias. Não sigo tendências. Construo ferramentas e discernimento para quem deseja assumir a responsabilidade pela própria vida.`,
    quote: "Conhecimento é poder. Soberania é decisão. Ação é liberdade.",
  },
};

function CentralTabsBlock() {
  const [active, setActive] = useState("sobre");

  return (
    <MagCard className="p-0 overflow-hidden backdrop-blur-sm h-full">
      <CornerAccent className="top-2 left-2" />
      <CornerAccent className="bottom-2 right-2 rotate-180" />

      <Tabs value={active} onValueChange={setActive} className="h-full flex flex-col">
        <TabsList className="w-full rounded-none bg-transparent border-b border-white/6 px-4 pt-3 pb-0 gap-1 justify-start h-auto shrink-0 overflow-x-auto no-scrollbar">
          {[
            { value: "sobre", label: "O OPERADOR" },
            { value: "expertise", label: "ARSENAL" },
            { value: "projetos", label: "CONSTRUÇÕES" },
            { value: "missao", label: "DIRETRIZES" },
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
              {active === "sobre" && (
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
              )}

              {active === "expertise" && (
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
              )}

              {active === "projetos" && (
                <TabsContent value="projetos" className="mt-0 p-5 space-y-2.5">
                  {TAB_CONTENT.projetos.items.map((p) => (
                    <Link
                      key={p.title}
                      to={p.url}
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
                    </Link>
                  ))}
                </TabsContent>
              )}

              {active === "missao" && (
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
              )}
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
  { label: "Linux", color: "#f5a623" },
];

function ToolsBlock() {
  return (
    <MagCard className="p-5 backdrop-blur-sm">
      <CornerAccent className="top-2 right-2 -scale-x-100" />
      <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
        FERRAMENTAS E TECNOLOGIAS (STACK)
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
    desc: "Engenharia de risco e tecnologia de fuga. Autocustódia verdadeira.",
    color: "#f7931a",
  },
  {
    icon: Globe,
    title: "GEOPOLÍTICA",
    desc: "Teoria das bandeiras, leitura do avanço dos CBDCs e do tabuleiro global.",
    color: CYAN,
  },
  {
    icon: Lock,
    title: "PRIVACIDADE",
    desc: "Criptografia, ofuscação de rede e higiene digital contra rastreamentos.",
    color: "#a78bfa",
  },
  {
    icon: Terminal,
    title: "CÓDIGO",
    desc: "Infraestrutura autônoma para não terceirizar o domínio da tecnologia.",
    color: "#34d399",
  },
];

function PillarsBlock() {
  return (
    <MagCard className="p-5 backdrop-blur-sm">
      <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
        OS PILARES DE ATUAÇÃO
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
    { icon: Activity, label: "PING", value: `${ping}ms`, active: true, color: "#22c55e" },
    { icon: Server, label: "UPTIME", value: fmt(uptime), active: true, color: CYAN },
    { icon: Moon, label: "MODO", value: "NOTURNO", active: true, color: "#818cf8" },
    { icon: Wifi, label: "REDE", value: "TOR · VPN", active: true, color: "#34d399" },
    { icon: Database, label: "NÓ BTC", value: "ATIVO", active: true, color: "#f7931a" },
    { icon: Radio, label: "SINAL", value: "FORTE", active: true, color: CYAN },
    { icon: Network, label: "BLOCKCHAIN", value: "SYNC", active: true, color: "#22c55e" },
    { icon: Eye, label: "EXPOSIÇÃO", value: "MÍNIMA", active: true, color: "#a78bfa" },
  ];

  return (
    <MagCard className="p-4 backdrop-blur-sm h-full flex flex-col gap-3">
      <CornerAccent className="top-2 right-2 -scale-x-100" />

      <div className="flex items-center gap-2 mb-1">
        <Terminal size={12} style={{ color: CYAN }} />
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          MÉTRICAS DO SISTEMA
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

      <div
        className="mt-auto rounded-lg border p-3"
        style={{ background: `${CYAN}08`, borderColor: `${CYAN_DIM}40` }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <BookOpen size={11} style={{ color: CYAN }} />
          <p className="text-[10px] font-mono tracking-widest font-bold" style={{ color: CYAN }}>
            THE FREEDOM CODE
          </p>
        </div>
        <p className="text-[10px] text-zinc-400 leading-snug mb-2">
          Acesse os manuais e ferramentas de autocustódia.
        </p>
        <Link
          to="/ebooks"
          className="w-full flex items-center justify-center gap-1 rounded px-2 py-1.5 text-[10px] font-mono font-bold tracking-widest transition-all hover:scale-[1.02] active:scale-[0.97]"
          style={{ background: `${CYAN_DIM}40`, color: CYAN }}
        >
          ACESSAR CONTEÚDO <ChevronRight size={10} />
        </Link>
      </div>
    </MagCard>
  );
}

// ─── BLOCK: Pillars Icons Row ──────────────────────────────────────────────────
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
      <div className="flex items-center gap-2 text-center">
        <Circle size={8} className="fill-cyan-500 text-cyan-500 animate-pulse hidden sm:block" />
        <span style={{ color: CYAN }}>PREPARANDO PESSOAS PARA A ERA DO MONITORAMENTO DIGITAL</span>
      </div>
      <span className="flex items-center gap-1.5">
        <Instagram size={11} /> @lordjunnior
      </span>
    </footer>
  );
}

// ─── MAIN PORTFOLIO COMPONENT ──────────────────────────────────────────────────
export default function Sobre() {
  const personSchema = {
    "@context": "[https://schema.org](https://schema.org)",
    "@type": "Person",
    name: "Lord Junnior",
    alternateName: "Lord Junnior",
    url: "[https://lordjunnior.com.br](https://lordjunnior.com.br)",
    image: "[https://res.cloudinary.com/dcgkqpg2w/image/upload/v1781309270/Homem_quieto_em_foto_dram%C3%A1tica_ztrqxy.png](https://res.cloudinary.com/dcgkqpg2w/image/upload/v1781309270/Homem_quieto_em_foto_dram%C3%A1tica_ztrqxy.png)",
    jobTitle: "Educador em Soberania Individual, Bitcoin e Geopolítica",
    description:
      "Lord Junnior é educador brasileiro focado em Bitcoin, autocustódia, geopolítica e privacidade digital. Constrói a maior plataforma em português sobre soberania individual.",
    knowsAbout: [
      "Bitcoin",
      "Autocustódia",
      "Geopolítica",
      "Privacidade digital",
      "Soberania individual",
      "Teoria das bandeiras",
      "Desenvolvimento Web",
    ],
    sameAs: [
      "[https://instagram.com/lordjunnior](https://instagram.com/lordjunnior)",
      "[https://youtube.com/@lordjunnior](https://youtube.com/@lordjunnior)",
      "[https://x.com/lordjunnior](https://x.com/lordjunnior)",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Lord Junnior",
      url: "[https://lordjunnior.com.br](https://lordjunnior.com.br)",
    },
  };

  const breadcrumbSchema = {
    "@context": "[https://schema.org](https://schema.org)",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "[https://lordjunnior.com.br/](https://lordjunnior.com.br/)" },
      { "@type": "ListItem", position: 2, name: "Sobre", item: "[https://lordjunnior.com.br/sobre](https://lordjunnior.com.br/sobre)" },
    ],
  };

  return (
    <div
      className="min-h-screen font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-200"
      style={{ background: BG_BASE, color: "#e4e4e7" }}
    >
      <Helmet>
        <title>Sobre Lord Junnior, Bitcoin, Geopolítica e Privacidade Digital</title>
        <meta
          name="description"
          content="Pesquisador, construtor e estrategista brasileiro. Conhecimento prático e ferramentas sobre autodefesa financeira, geopolítica e privacidade digital."
        />
        <link rel="canonical" href="[https://lordjunnior.com.br/sobre](https://lordjunnior.com.br/sobre)" />
        <meta property="og:title" content="Sobre Lord Junnior" />
        <meta
          property="og:description"
          content="A história, a missão e o porquê do maior projeto em português sobre Bitcoin, geopolítica e soberania individual."
        />
        <meta property="og:url" content="[https://lordjunnior.com.br/sobre](https://lordjunnior.com.br/sobre)" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

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

      {/* COMANDO DE RETORNO À BASE */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500 hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft size={14} />
          Retornar à Base
        </Link>
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

```
