import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Tent, Siren, Cross, Egg, TreePine, Layers, Thermometer, Bug, Shovel, BookOpen, ChevronDown, Activity, Brain, Zap, Pill, Wind as WindIcon, ChevronRight, Eye, Target, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

import imgSoberaniaAlimentar from '@/assets/fase03-soberania-alimentar.jpg';
import imgBase72 from '@/assets/fase01-base72.jpg';
import imgAutonomiaBiologica from '@/assets/fase02-autonomia-biologica.jpg';
import imgConhecimentoPerdido from '@/assets/cp-hero-conhecimento.jpg';
import SimboloOculto from '@/components/SimboloOculto';
import RiskBlock from '@/components/RiskBlock';
import { PainelTaticoFisiologico } from '@/components/PainelTaticoFisiologico';
import VersionBadge from '@/components/VersionBadge';

/* ─── SEO: meta keywords target ───
   projeto autônomo, base 72 horas, autonomia biológica, soberania alimentar,
   sobrevivência urbana, horta urbana, plantas medicinais, primeiros socorros,
   autossuficiência alimentar, kit emergência 72h, preparação desastres brasil,
   conservação alimentos, proteína sustentável, fitoterapia, gestão de risco pessoal
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

/* ─── PHASE DATA (all content preserved) ─── */
const BASE72_ITEMS = [
  { icon: Package, label: 'Kit Tático 72h', desc: 'Água, alimento, documentos, rádio e medicamentos para autonomia mínima de 3 dias.', slug: 'kit-72h' },
  { icon: Flame, label: 'Protocolos de Apagão', desc: 'Iluminação, cozimento e aquecimento alternativos quando a rede elétrica está indisponível.', slug: 'protocolos-apagao' },
  { icon: Droplets, label: 'Purificação de Água', desc: 'Fervura, cloração, filtros improvisados. Três métodos validados por defesa civil.', slug: 'purificacao-agua' },
  { icon: Tent, label: 'Abrigo de Emergência', desc: 'Proteção térmica e estrutural com materiais acessíveis em diferentes cenários.', slug: 'abrigo-emergencia' },
  { icon: Siren, label: 'Comunicação sem Internet', desc: 'Rádio AM/FM, sinais visuais e protocolos de ponto de encontro familiar.', slug: 'comunicacao-offline' },
  { icon: Wind, label: 'Navegação Primária', desc: 'Bússola, referências solares e leitura de terreno. Orientação sem dependência digital.', slug: 'navegacao-primaria' },
];

const BIO_ITEMS = [
  { icon: Leaf, label: 'Suporte Fitoterápico', desc: 'Biblioteca técnica de 12 plantas essenciais. Dosagens conservadoras, contraindicações e métodos de preparo.', slug: 'autonomia-biologica' },
  { icon: Cross, label: 'Primeiros Socorros', desc: 'Contenção de sangramento, imobilização, tratamento de queimaduras em ambiente remoto.', slug: 'primeiros-socorros' },
  { icon: Thermometer, label: 'Avaliação Básica de Sinais', desc: 'Interpretar febre, desidratação e sinais vitais com recursos mínimos.', slug: 'sinais-vitais' },
  { icon: Sun, label: 'Saúde Preventiva', desc: 'Exposição solar, qualidade do sono, movimento e alimentação consciente como base preventiva.', slug: 'saude-preventiva' },
  { icon: Sprout, label: 'Fitoterapia Aplicada', desc: 'Protocolos terapêuticos por sistema corporal. Sinergia entre plantas, ciclos de uso e critérios de interrupção.', slug: 'fitoterapia-aplicada' },
  { icon: Bug, label: 'Controle de Vetores', desc: 'Repelentes naturais, manejo de água parada e proteção com métodos de baixo impacto.', slug: 'controle-vetores' },
];

const ALIMENTAR_LAYERS = [
  { icon: Sprout, title: 'Horta Urbana', desc: 'Varandas, janelas e telhados. Espaço mínimo, colheita consistente.', details: 'Vasos autoirrigáveis, cultivo vertical, hidroponia caseira e aproveitamento de recipientes reciclados.', slug: 'horta-urbana' },
  { icon: Layers, title: 'Produção em Pequenos Espaços', desc: 'Planejamento correto transforma 4m² em fonte de alimento.', details: 'Consórcio de culturas, rotação de canteiros e aproveitamento de microclimas urbanos.', slug: 'producao-pequenos-espacos' },
  { icon: Flame, title: 'Conservação e Armazenamento', desc: 'Defumação, salga, fermentação, desidratação. Técnicas milenares validadas.', details: 'Compotas, conservas em vinagre, secagem solar e fermentação lactobacilar.', slug: 'conservacao-armazenamento' },
  { icon: Egg, title: 'Proteína Sustentável', desc: 'Galinhas, codornas, peixes e sistemas compactos de produção animal.', details: 'Aquaponia, galinheiro móvel e criação de tilápia em espaços reduzidos.', slug: 'proteina-sustentavel' },
  { icon: Shovel, title: 'Solo e Fertilidade', desc: 'Compostagem, bokashi, húmus de minhoca. Terra viva gera alimento vivo.', details: 'Análise caseira de pH, cobertura morta, adubação verde e rotação de nutrientes.', slug: 'solo-fertilidade' },
];

const PLANTAS_SOBERANAS = [
  { nome: "Espinheira Santa", sistema: "Digestivo", pnl: "A barreira natural contra a dieta industrial inflamatória.", uso: "Chá (infusão) das folhas secas.", dosagem: "1 colher de sobremesa para 200ml de água. Até 3x ao dia.", alerta: "Evitar durante a lactação (pode reduzir a produção de leite).", cta: "DOMINAR PROTOCOLO DIGESTIVO" },
  { nome: "Guaçatonga", sistema: "Tegumentar/Gástrico", pnl: "O curativo universal que a indústria farmacêutica ignorou.", uso: "Tintura ou compressa das folhas.", dosagem: "20 gotas em água ou aplicação direta em lesões.", alerta: "Não utilizar em feridas abertas profundas sem assepsia prévia.", cta: "ACESSAR GUIA DE CICATRIZAÇÃO" },
  { nome: "Arnica (Nacional)", sistema: "Osteomuscular", pnl: "Sua primeira linha de defesa contra traumas e impactos físicos.", uso: "Uso externo: tintura ou óleo infundido.", dosagem: "Aplicar sobre o local da contusão 2 a 3 vezes ao dia.", alerta: "Uso estritamente externo. Tóxica se ingerida.", cta: "REGENERAR TECIDOS" },
  { nome: "Poejo", sistema: "Respiratório", pnl: "Liberdade para respirar sem depender de xaropes sintéticos.", uso: "Infusão das partes aéreas.", dosagem: "1 colher de chá por xícara. Máximo 2 xícaras/dia.", alerta: "Contraindicado para gestantes (potencial abortivo).", cta: "LIMPAR VIAS AÉREAS" },
  { nome: "Capim-Limão", sistema: "Nervoso", pnl: "O controle da ansiedade sem as amarras dos ansiolíticos de massa.", uso: "Infusão das folhas frescas ou secas.", dosagem: "Consumo livre até 1 litro por dia para efeito calmante.", alerta: "Pode potencializar o efeito de sedativos industriais.", cta: "ESTABILIZAR O SISTEMA" },
  { nome: "Babosa (Aloe Vera)", sistema: "Multisistêmico", pnl: "A usina de regeneração celular que você planta no quintal.", uso: "Gel interno da folha (uso externo ou interno processado).", dosagem: "Uso tópico abundante ou 20ml do gel processado (sem aloína).", alerta: "A casca contém aloína (laxante irritante); deve ser removida.", cta: "ATIVAR REGENERAÇÃO" },
];

const SISTEMAS_DATA: Record<string, { plantas: string[]; foco: string; pnl: string; icon: React.ElementType; color: string }> = {
  digestivo: { plantas: ["Espinheira Santa", "Carqueja", "Gengibre"], foco: "Neutralização de acidez e otimização enzimática.", pnl: "O primeiro passo da soberania é não ser refém da má digestão industrial.", icon: Flame, color: "emerald" },
  respiratorio: { plantas: ["Poejo", "Sálvia"], foco: "Desobstrução e fortalecimento do parênquima pulmonar.", pnl: "Respirar sem ajuda química é o nível básico de autonomia física.", icon: Wind, color: "sky" },
  nervoso: { plantas: ["Capim-Limão", "Sálvia"], foco: "Estabilização de neurotransmissores e modulação de cortisol.", pnl: "Mente fria em cenários de crise: o controle vem da natureza, não da farmácia.", icon: Brain, color: "violet" },
  imuno: { plantas: ["Equinácea", "Alho", "Babosa"], foco: "Ativação de macrófagos e barreira antiviral.", pnl: "Sua imunidade é seu exército particular. Treine-o para não depender de terceiros.", icon: Shield, color: "amber" },
  glandular: { plantas: ["Dente-de-Leão", "Guaçatonga"], foco: "Depuração hepática e equilíbrio endócrino.", pnl: "Limpar o filtro do corpo para garantir que o sistema opere em carga máxima.", icon: Activity, color: "rose" },
};

const SISTEMA_LABELS: Record<string, string> = {
  digestivo: "Digestivo", respiratorio: "Respiratório", nervoso: "Nervoso", imuno: "Imunológico", glandular: "Glandular",
};

/* ─── Mouse Parallax Hook ─── */
function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — COMPLETE LAYOUT REDESIGN
═══════════════════════════════════════════════════════════════ */
export default function ProjetoAutonomo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { springX, springY } = useMouseParallax(12);
  const [activeSistema, setActiveSistema] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const phases = [
    { num: '01', title: 'Base 72', sub: 'Protege o corpo', accent: '#f43f5e', sectionId: 'fase-01', icon: Clock },
    { num: '02', title: 'Autonomia Biológica', sub: 'Fortalece o corpo', accent: '#10b981', sectionId: 'fase-02', icon: Heart },
    { num: '03', title: 'Soberania Alimentar', sub: 'Alimenta o corpo', accent: '#f59e0b', sectionId: 'fase-03', icon: Wheat },
    { num: '04', title: 'Conhecimento Perdido', sub: 'Ensina a entender o corpo', accent: '#14b8a6', sectionId: 'fase-04', icon: BookOpen },
    { num: '05', title: 'Tóxicos Ocultos', sub: 'Remove dependências invisíveis', accent: '#ef4444', sectionId: 'fase-05', icon: Eye },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/30 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      {/* ── SCROLL PROGRESS ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #10b981, #f59e0b)' }}
      />

      {/* ── AMBIENT BG ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes sporeDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-800px) translateX(80px) rotate(360deg); opacity: 0; }
          }
        `}</style>
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)', x: springX, y: springY }}
        />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 60%)',
            x: useTransform(springX, v => -v * 0.5), y: useTransform(springY, v => -v * 0.5) }}
        />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
        />
      </div>

      {/* ── SPORE PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-emerald-400/30"
            style={{ width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`, left: `${Math.random() * 100}%`, bottom: `-${Math.random() * 20}px`, animation: `sporeDrift ${30 + Math.random() * 40}s linear ${Math.random() * 20}s infinite` }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 1 — FULL-VIEWPORT CINEMATIC HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Hero background image with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url('/heroes/projeto-autonomo.webp')`,
              filter: 'brightness(0.45) saturate(0.85)',
            }}
          />
          {/* Cinematic overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(5,8,8,0.25) 0%, rgba(5,8,8,0.6) 40%, rgba(5,8,8,0.92) 75%, rgba(5,8,8,1) 100%)',
            }}
          />
          {/* Side vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.8) 100%)',
            }}
          />
        </motion.div>
        {/* Breadcrumb — top left */}
        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link to="/" className="text-stone-600 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Projeto Autônomo</span>
        </nav>

        {/* Version — top right */}
        <div className="absolute top-6 right-6 md:right-16">
          <VersionBadge version="v2.0" date="Mar 2026" />
        </div>

        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Shield className="text-emerald-400" size={24} />
              </motion.div>
              <span className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">
                Engenharia de Resiliência Pessoal
              </span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white"
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}
            >PROJETO</motion.span>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-emerald-400"
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}
            >AUTÔNOMO</motion.span>
          </h1>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              Você terceiriza sua <span className="text-emerald-400 font-bold">comida</span> para uma indústria que lucra com a sua doença.
              Terceiriza sua <span className="text-emerald-400 font-bold">saúde</span> para um sistema que lucra com a sua dependência.
              E terceiriza sua <span className="text-emerald-400 font-bold">segurança</span> para um Estado que lucra com o seu medo.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quatro fases. Uma progressão lógica. A construção metódica da sua <span className="font-semibold text-stone-300">independência real</span>.
              <SimboloOculto id="folha" className="ml-2 align-middle" />
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom center */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar</span>
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>

        {/* Decorative side line */}
        <motion.div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
          <span className="text-emerald-500/30 text-[9px] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr]">4 Fases</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2 — HORIZONTAL PHASE TIMELINE
         (Completely new layout — replaces the old 4-card grid)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-emerald-500/50 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Progressão Estrutural</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quatro camadas. <span className="text-emerald-400">Uma blindagem.</span>
            </h2>
          </motion.div>

          {/* Timeline — Vertical journey layout with alternating sides */}
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/30 via-emerald-500/20 via-amber-500/20 to-teal-500/30 hidden md:block" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/30 via-emerald-500/20 via-amber-500/20 to-teal-500/30 md:hidden" />

            {phases.map((phase, i) => {
              const isLeft = i % 2 === 0;
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.num}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i * 0.5}
                  className={`relative flex items-start gap-6 md:gap-0 mb-16 md:mb-24 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: phase.accent, background: `${phase.accent}15` }}
                    >
                      <Icon size={18} style={{ color: phase.accent }} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 ${isLeft ? 'md:w-[45%] md:pr-16' : 'md:w-[45%] md:pl-16'} ${isLeft ? '' : 'md:ml-auto'}`}>
                    <div
                      className="group cursor-pointer rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${phase.accent}08, transparent 60%)` }}
                      onClick={() => {
                        if (phase.num === '04') {
                          window.location.href = '/projeto-autonomo/conhecimento-perdido';
                        } else {
                          document.getElementById(phase.sectionId)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {/* Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ background: `radial-gradient(ellipse at top left, ${phase.accent}12, transparent 60%)` }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: phase.accent }}>
                            Fase {phase.num}
                          </span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-50 transition-all duration-500 group-hover:translate-x-1" style={{ color: phase.accent }} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">{phase.title}</h3>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-70" style={{ color: phase.accent }}>{phase.sub}</p>
                        <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: phase.accent + '40' }} />
                        <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                          {i === 0 && 'Autonomia mínima nas primeiras 72 horas. Abrigo, água, comunicação e deslocamento.'}
                          {i === 1 && 'Saúde preventiva, primeiros socorros e fitoterapia como primeira linha de defesa.'}
                          {i === 2 && 'Produção própria de alimento. Horta, solo, conservação e proteína sustentável.'}
                          {i === 3 && 'Formação bioquímica e botânica. 12 plantas, 5 sistemas, 9 seções técnicas por ficha.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expansion badge */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="flex justify-center mt-16">
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-5 py-2.5 rounded-full backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em]">Conteúdo em expansão contínua</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         MANIFESTO BREAK — Full-width quote (NEW ELEMENT)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <AlertTriangle className="mx-auto text-amber-500/40 mb-6" size={28} />
            <p className="text-amber-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Gestão de risco — Base técnica</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { bold: 'Quem produz parte do que consome', rest: 'reduz exposição a rupturas de abastecimento.' },
                { bold: 'Quem entende a cadeia alimentar', rest: 'interpreta melhor preço, escassez e qualidade.' },
                { bold: 'Quem domina técnicas básicas de cultivo', rest: 'amplia sua margem de segurança.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                  <div className="h-px w-10 bg-amber-500/20 mx-auto mb-4" />
                  <p className="text-stone-500 text-sm leading-relaxed">
                    <span className="text-stone-200 font-semibold block mb-1">{item.bold}</span>
                    {item.rest}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         FASE 01 — BASE 72 — BENTO GRID LAYOUT (was: simple 3-col grid)
      ═══════════════════════════════════════════════════════════ */}
      <section id="fase-01" className="relative z-10 scroll-mt-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Phase Hero — Full-width immersive banner (new: split layout) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="relative rounded-3xl overflow-hidden mb-16 md:mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
              {/* Image half */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <motion.img src={imgBase72} alt="Kit Tático 72h" className="absolute inset-0 w-full h-full object-cover"
                  whileInView={{ scale: [1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.5, ease: APPLE_EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0f0d] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0f0d] lg:hidden" />
              </div>
              {/* Content half */}
              <div className="relative flex flex-col justify-center p-8 md:p-14 lg:pl-0" style={{ background: 'linear-gradient(135deg, #0d0f0d, #0a0c0a)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-rose-500 rounded-full" />
                  <span className="text-rose-400 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 01</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  BASE <span className="text-rose-400">72</span>
                </h2>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-lg mb-4">
                  A referência vem da regra das 72 horas usada em protocolos de defesa civil.
                  Após uma interrupção grave, os primeiros três dias exigem autonomia mínima.
                  Essa preparação é baseada em <span className="font-semibold text-stone-200">dados históricos de resposta a desastres</span>.
                </p>
                <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider">
                  Preparação mínima. Autonomia imediata. Protocolo objetivo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* BENTO GRID — 2 featured + 4 small (was: equal 6-card grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {/* Featured cards — span 2 rows on desktop */}
            {BASE72_ITEMS.slice(0, 2).map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className={i === 0 ? 'lg:row-span-2' : ''}
              >
                <Link to={`/projeto-autonomo/${item.slug}`}
                  className={`group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-rose-500/20 transition-all duration-500 hover:-translate-y-1 ${i === 0 ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(ellipse at bottom right, rgba(244,63,94,0.08), transparent 60%)' }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/15 w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <item.icon size={i === 0 ? 24 : 20} className="text-rose-400" />
                    </div>
                    <h4 className={`${i === 0 ? 'text-xl md:text-2xl' : 'text-base'} font-bold text-stone-200 tracking-tight mb-2 group-hover:text-white transition-colors`}>
                      {item.label}
                    </h4>
                    <p className={`text-stone-500 ${i === 0 ? 'text-sm' : 'text-xs'} leading-relaxed group-hover:text-stone-400 transition-colors flex-1`}>
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-rose-400/50 group-hover:text-rose-400/80 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Acessar módulo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-rose-500 to-transparent" />
                </Link>
              </motion.div>
            ))}

            {/* Remaining 4 cards */}
            {BASE72_ITEMS.slice(2).map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i + 2) * 0.2}>
                <Link to={`/projeto-autonomo/${item.slug}`}
                  className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-rose-500/15 transition-all duration-500 hover:-translate-y-1 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-rose-500/8 border border-rose-500/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={16} className="text-rose-400/70" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-300 mb-1 group-hover:text-white transition-colors">{item.label}</h4>
                      <p className="text-stone-600 text-xs leading-relaxed group-hover:text-stone-500 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <RiskBlock theme="dark" title="Sem esta base, o que acontece?" consequences={[
            "Dependência total de resgate externo nas primeiras 72 horas — tempo em que sistemas públicos estão sobrecarregados.",
            "Sem água potável ou abrigo, a capacidade de decisão se degrada em poucas horas.",
            "Comunicação zero com familiares em cenário de apagão ou desastre natural.",
          ]} />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FASE 02 — AUTONOMIA BIOLÓGICA — MAGAZINE LAYOUT
         (was: same card grid, now: hero + 2-column split + interactive map)
      ═══════════════════════════════════════════════════════════ */}
      <section id="fase-02" className="relative z-10 scroll-mt-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Split Hero — Image right, content left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="relative rounded-3xl overflow-hidden mb-16 md:mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
              {/* Content first on mobile, second on desktop */}
              <div className="relative flex flex-col justify-center p-8 md:p-14 order-2 lg:order-1" style={{ background: 'linear-gradient(135deg, #0a0d0a, #080b08)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-emerald-500 rounded-full" />
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 02</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  AUTONOMIA <span className="text-emerald-400">BIOLÓGICA</span>
                </h2>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-lg mb-4">
                  Fortalecer o corpo é a base da resiliência. Conhecimento tradicional de cuidado
                  complementa o sistema de saúde e amplia a capacidade de resposta em cenários adversos.
                </p>
                <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider">
                  Base preventiva. Suporte tradicional. Complemento ao cuidado convencional.
                </p>
              </div>
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
                <motion.img src={imgAutonomiaBiologica} alt="Autonomia Biológica" className="absolute inset-0 w-full h-full object-cover"
                  whileInView={{ scale: [1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.5, ease: APPLE_EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0d0a] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0d0a] lg:hidden" />
              </div>
            </div>
          </motion.div>

          {/* BENTO GRID — Asymmetric layout: 1 tall featured + 2 medium + 3 compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {/* Featured — tall card spanning 2 rows */}
            {BIO_ITEMS.slice(0, 1).map((item) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                className="lg:row-span-2"
              >
                <Link to={`/projeto-autonomo/${item.slug}`}
                  className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-500 hover:-translate-y-1 p-8 md:p-10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(ellipse at bottom left, rgba(16,185,129,0.08), transparent 60%)' }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15 w-fit mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <item.icon size={24} className="text-emerald-400" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-3 group-hover:text-white transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed flex-1 group-hover:text-stone-400 transition-colors">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-emerald-400/50 group-hover:text-emerald-400/80 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Explorar catálogo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-emerald-500 to-transparent" />
                </Link>
              </motion.div>
            ))}

            {/* Medium cards — second tier */}
            {BIO_ITEMS.slice(1, 3).map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i + 1) * 0.3}>
                <Link to={`/projeto-autonomo/${item.slug}`}
                  className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(ellipse at top right, rgba(16,185,129,0.06), transparent 60%)' }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/15 w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <item.icon size={20} className="text-emerald-400" />
                    </div>
                    <h4 className="text-base font-bold text-stone-200 tracking-tight mb-2 group-hover:text-white transition-colors">{item.label}</h4>
                    <p className="text-stone-500 text-xs leading-relaxed flex-1 group-hover:text-stone-400 transition-colors">{item.desc}</p>
                    <div className="flex items-center gap-2 mt-4 text-emerald-400/50 group-hover:text-emerald-400/80 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Acessar módulo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-emerald-500 to-transparent" />
                </Link>
              </motion.div>
            ))}

            {/* Compact cards — bottom row */}
            {BIO_ITEMS.slice(3).map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i + 3) * 0.2}>
                <Link to={`/projeto-autonomo/${item.slug}`}
                  className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/15 transition-all duration-500 hover:-translate-y-1 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-emerald-500/8 border border-emerald-500/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={16} className="text-emerald-400/70" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-300 mb-1 group-hover:text-white transition-colors">{item.label}</h4>
                      <p className="text-stone-600 text-xs leading-relaxed group-hover:text-stone-500 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* PHYSIOLOGICAL MAP — Interactive */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-emerald-500/50 text-[10px] font-bold uppercase tracking-[0.5em] mb-2">Mapa Fisiológico</p>
                <h3 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight">
                  A base que sustenta cada decisão de <span className="text-emerald-400">saúde</span>
                </h3>
              </div>
              <p className="text-stone-600 text-xs max-w-sm">Clique em um sistema para revelar plantas, foco terapêutico e estratégia de autonomia.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(SISTEMAS_DATA).map(([key, sys]) => {
                const isActive = activeSistema === key;
                const Icon = sys.icon;
                return (
                  <motion.button key={key}
                    onClick={() => setActiveSistema(isActive ? null : key)}
                    whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-500 cursor-pointer ${
                      isActive ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-white/[0.04] text-stone-400 border-white/[0.08] hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-emerald-500/70'} />
                    {SISTEMA_LABELS[key]}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <PainelTaticoFisiologico
            isOpen={!!activeSistema}
            onClose={() => setActiveSistema(null)}
            nome={activeSistema ? (SISTEMA_LABELS[activeSistema] || activeSistema) : ""}
            sistema={activeSistema ? SISTEMAS_DATA[activeSistema] : null}
          />

          {/* Sabedoria Ancestral CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
            <Link to="/projeto-autonomo/sabedoria-ancestral"
              className="group block bg-emerald-500/[0.06] border border-emerald-500/15 rounded-xl p-6 hover:border-emerald-400/30 hover:bg-emerald-500/[0.1] transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/15 rounded-xl group-hover:rotate-6 transition-transform duration-500">
                    <Leaf className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <p className="text-emerald-300 text-sm font-bold">Sabedoria Ancestral</p>
                    <p className="text-stone-500 text-xs mt-0.5">Hub completo: plantas medicinais, saúde natural e soberania alimentar</p>
                  </div>
                </div>
                <ArrowRight className="text-emerald-500/40 group-hover:translate-x-2 group-hover:text-emerald-400 transition-all duration-500" size={18} />
              </div>
            </Link>
          </motion.div>

          <div className="p-5 bg-emerald-500/[0.03] border border-emerald-500/8 rounded-xl mb-10">
            <p className="text-emerald-400/50 text-sm font-medium">
              Conhecer plantas medicinais, primeiros socorros e hábitos preventivos amplia autonomia sem substituir acompanhamento profissional.
            </p>
          </div>

          <RiskBlock theme="dark" title="Sem esta base, o que acontece?" consequences={[
            "Incapacidade de prestar cuidados básicos em situação de emergência antes da chegada de ajuda profissional.",
            "Desconhecimento de sinais vitais e sintomas impede a tomada de decisão correta sob pressão.",
            "Dependência absoluta de farmácia e pronto-socorro para qualquer desconforto — sem alternativa complementar.",
          ]} />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FASE 03 — SOBERANIA ALIMENTAR — JOURNEY PIPELINE
         (was: simple list cards, now: vertical pipeline with connected nodes)
      ═══════════════════════════════════════════════════════════ */}
      <section id="fase-03" className="relative z-10 scroll-mt-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Full-width hero with centered text over image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="relative rounded-3xl overflow-hidden mb-16 md:mb-20 h-72 md:h-[450px]"
          >
            <motion.img src={imgSoberaniaAlimentar} alt="Soberania Alimentar" className="absolute inset-0 w-full h-full object-cover"
              whileInView={{ scale: [1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.5, ease: APPLE_EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-black/50 to-black/30" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 03</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                SOBERANIA <span className="text-amber-400">ALIMENTAR</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-xl">
                Dependência total da cadeia industrial aumenta vulnerabilidade.
                Produzir parte do próprio alimento reduz exposição e aumenta qualidade nutricional.
              </p>
            </div>
          </motion.div>

          {/* Seed Progression — visual step */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex items-center justify-center gap-4 md:gap-8 mb-16"
          >
            {['1 vaso', '1 canteiro', '1 sistema'].map((step, i) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 md:w-18 md:h-18 rounded-full flex items-center justify-center border hover:scale-110 transition-all
                    ${i === 0 ? 'bg-amber-500/10 border-amber-500/20' : i === 1 ? 'bg-amber-500/15 border-amber-500/25' : 'bg-amber-500/20 border-amber-500/35'}`}>
                    <Sprout className="text-amber-400" size={i === 2 ? 28 : i === 1 ? 24 : 20} />
                  </div>
                  <span className="text-stone-500 text-xs md:text-sm font-bold">{step}</span>
                </motion.div>
                {i < 2 && <ArrowRight className="text-amber-500/30 mb-6" size={20} />}
              </React.Fragment>
            ))}
          </motion.div>

          {/* BENTO GRID — 2 large featured + 3 compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {/* Featured cards — first 2 get large treatment */}
            {ALIMENTAR_LAYERS.slice(0, 2).map((layer, i) => (
              <motion.div key={layer.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className={i === 0 ? 'lg:row-span-2' : ''}
              >
                <Link to={`/projeto-autonomo/${layer.slug}`}
                  className={`group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 ${i === 0 ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at ${i === 0 ? 'bottom right' : 'top left'}, rgba(245,158,11,0.08), transparent 60%)` }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <layer.icon size={i === 0 ? 24 : 20} className="text-amber-400" />
                      </div>
                    </div>
                    <h4 className={`${i === 0 ? 'text-xl md:text-2xl' : 'text-base'} font-bold text-stone-200 tracking-tight mb-2 group-hover:text-white transition-colors`}>
                      {layer.title}
                    </h4>
                    <p className="text-amber-400/50 text-[10px] font-semibold uppercase tracking-wider mb-3">{layer.desc}</p>
                    <p className={`text-stone-500 ${i === 0 ? 'text-sm' : 'text-xs'} leading-relaxed group-hover:text-stone-400 transition-colors flex-1`}>
                      {layer.details}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-amber-400/50 group-hover:text-amber-400/80 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Acessar módulo</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                </Link>
              </motion.div>
            ))}

            {/* Compact cards — remaining 3 */}
            {ALIMENTAR_LAYERS.slice(2).map((layer, i) => (
              <motion.div key={layer.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i + 2) * 0.2}>
                <Link to={`/projeto-autonomo/${layer.slug}`}
                  className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/15 transition-all duration-500 hover:-translate-y-1 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-lg font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 3}</span>
                      <div className="p-2 rounded-lg bg-amber-500/8 border border-amber-500/10 group-hover:scale-110 transition-transform duration-500">
                        <layer.icon size={16} className="text-amber-400/70" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-300 mb-1 group-hover:text-white transition-colors">{layer.title}</h4>
                      <p className="text-stone-600 text-xs leading-relaxed group-hover:text-stone-500 transition-colors">{layer.details}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="p-5 bg-amber-500/[0.03] border border-amber-500/8 rounded-xl mb-10">
            <p className="text-amber-400/50 text-sm font-medium">
              Comece com um vaso. Depois um canteiro. Depois um sistema.
              Cada etapa reduz uma camada de dependência.
            </p>
          </div>

          <RiskBlock theme="dark" title="Sem esta base, o que acontece?" consequences={[
            "100% do alimento vem da cadeia industrial — qualquer ruptura de abastecimento afeta diretamente a mesa.",
            "Sem conhecimento de cultivo, conservação ou solo, não há margem de manobra em cenários de escassez.",
            "Custo alimentar cresce sem alternativa de produção própria, mesmo em espaços reduzidos.",
          ]} />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FASE 04 — CONHECIMENTO PERDIDO — SHOWCASE GRID
         (was: equal 4-card grid, now: large visual showcase)
      ═══════════════════════════════════════════════════════════ */}
      <section id="fase-04" className="relative z-10 scroll-mt-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Full-width image hero — centered overlay */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="relative rounded-3xl overflow-hidden mb-16 md:mb-20 h-72 md:h-[450px]"
          >
            <motion.img src={imgConhecimentoPerdido} alt="Conhecimento Perdido" className="absolute inset-0 w-full h-full object-cover"
              whileInView={{ scale: [1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.5, ease: APPLE_EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-black/40 to-black/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-teal-500 rounded-full" />
                <span className="text-teal-400 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 04</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                CONHECIMENTO <span className="text-teal-400">PERDIDO</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Fundamentos naturais aplicados à saúde, alimentação e resiliência.
                Um ecossistema completo com 12 plantas organizadas por sistema corporal,
                fichas técnicas detalhadas, dosagens seguras, contraindicações e educação botânica familiar.
              </p>
            </div>
          </motion.div>

          {/* BENTO GRID — 1 large featured spanning + 3 compact */}
          {(() => {
            const cpItems = [
              { icon: Leaf, label: '5 Sistemas Corporais', desc: 'Digestivo, respiratório, nervoso, imunológico e circulatório mapeados.', longDesc: 'Cada sistema é documentado com suas plantas associadas, foco terapêutico e estratégia de autonomia. O mapa fisiológico conecta todos os pontos.', link: '/conhecimento-perdido/base-fisiologica' },
              { icon: BookOpen, label: '12 Plantas Documentadas', desc: 'Fichas técnicas com dosagens, contraindicações e métodos de preparo.', longDesc: 'Cada ficha possui 9 seções técnicas: identificação, princípios ativos, dosagens, contraindicações, interações, métodos de preparo, conservação, referências e aplicação prática.', link: '/conhecimento-perdido/aplicacao-pratica' },
              { icon: Heart, label: 'Educação Familiar', desc: 'Conteúdo adaptado para ensinar crianças sobre botânica e saúde natural.', longDesc: 'Atividades práticas de identificação botânica, jogos de reconhecimento de plantas e protocolos seguros de preparo supervisionado.', link: '/conhecimento-perdido/continuidade-familiar' },
              { icon: Shield, label: 'Integração Completa', desc: 'Conectado a todo o Protocolo Autônomo como base de conhecimento.', longDesc: 'Hub central com navegação entre todos os blocos: contexto histórico, base fisiológica, segurança, aplicação prática e continuidade familiar.', link: '/projeto-autonomo/conhecimento-perdido' },
            ];
            const Icon0 = cpItems[0].icon;
            const Icon1 = cpItems[1].icon;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {/* Featured — large card spanning 2 rows */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="lg:row-span-2">
                  <Link to={cpItems[0].link}
                    className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-500/20 transition-all duration-500 hover:-translate-y-1 p-8 md:p-10"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: 'radial-gradient(ellipse at bottom left, rgba(20,184,166,0.08), transparent 60%)' }}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/15 w-fit mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon0 size={24} className="text-teal-400" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-3 group-hover:text-white transition-colors">
                        {cpItems[0].label}
                      </h4>
                      <p className="text-stone-500 text-sm leading-relaxed flex-1 group-hover:text-stone-400 transition-colors">
                        {cpItems[0].longDesc}
                      </p>
                      <div className="flex items-center gap-2 mt-6 text-teal-400/50 group-hover:text-teal-400/80 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Explorar sistemas</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-teal-500 to-transparent" />
                  </Link>
                </motion.div>

                {/* Medium card */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
                  <Link to={cpItems[1].link}
                    className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: 'radial-gradient(ellipse at top right, rgba(20,184,166,0.06), transparent 60%)' }}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/15 w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon1 size={20} className="text-teal-400" />
                      </div>
                      <h4 className="text-base font-bold text-stone-200 tracking-tight mb-2 group-hover:text-white transition-colors">{cpItems[1].label}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed flex-1 group-hover:text-stone-400 transition-colors">{cpItems[1].longDesc}</p>
                      <div className="flex items-center gap-2 mt-4 text-teal-400/50 group-hover:text-teal-400/80 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Ver fichas</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-teal-500 to-transparent" />
                  </Link>
                </motion.div>

                {/* Compact cards — bottom */}
                {cpItems.slice(2).map((item, i) => (
                  <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={(i + 2) * 0.2}>
                    <Link to={item.link}
                      className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-500/15 transition-all duration-500 hover:-translate-y-1 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-teal-500/8 border border-teal-500/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <item.icon size={16} className="text-teal-400/70" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-stone-300 mb-1 group-hover:text-white transition-colors">{item.label}</h4>
                          <p className="text-stone-600 text-xs leading-relaxed group-hover:text-stone-500 transition-colors">{item.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            );
          })()}

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="/projeto-autonomo/conhecimento-perdido"
              className="inline-flex items-center justify-center gap-3 bg-teal-500 text-white px-8 py-4 font-semibold text-sm tracking-wide rounded-xl hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/20 hover:scale-[1.02] transition-all duration-500 group"
            >
              <BookOpen size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Ecossistema Completo
            </Link>
          </motion.div>

          <div className="p-5 bg-teal-500/[0.03] border border-teal-500/8 rounded-xl">
            <p className="text-teal-400/50 text-sm font-medium">
              O conhecimento que sustentou civilizações inteiras está sendo esquecido em uma geração.
              Este módulo documenta e preserva o que não pode se perder.
            </p>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FASE 05 — TÓXICOS OCULTOS — LABORATÓRIO DE DISCERNIMENTO
      ═══════════════════════════════════════════════════════════ */}
      <section id="fase-05" className="relative z-10 scroll-mt-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="relative rounded-3xl overflow-hidden mb-16 md:mb-20 h-72 md:h-[450px]"
          >
            <motion.img src="/heroes/toxicos-ocultos.webp" alt="Tóxicos Ocultos" className="absolute inset-0 w-full h-full object-cover"
              whileInView={{ scale: [1.1, 1] }} viewport={{ once: true }} transition={{ duration: 1.5, ease: APPLE_EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-black/50 to-black/30" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-red-500 rounded-full" />
                <span className="text-red-400 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 05</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TÓXICOS <span className="text-red-400">OCULTOS</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Laboratório de discernimento: corpo, mente, comportamento e ambiente.
                Quatro vetores de investigação sobre influências invisíveis que reduzem clareza, saúde e liberdade de escolha.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: Target, label: 'Toxinas Alimentares', desc: 'Aditivos, ultraprocessados, açúcar oculto e agrotóxicos na dieta cotidiana.', link: '/projeto-autonomo/toxicos-ocultos/toxinas-alimentares', color: 'amber' },
              { icon: Brain, label: 'Manipulação Informacional', desc: 'Propaganda, novilíngua, viés algorítmico e engenharia de consentimento.', link: '/projeto-autonomo/toxicos-ocultos/manipulacao-informacional', color: 'violet' },
              { icon: Compass, label: 'Dependência Tecnológica', desc: 'Design comportamental, dopamina digital, rastreamento e obsolescência.', link: '/projeto-autonomo/toxicos-ocultos/dependencia-tecnologica', color: 'cyan' },
              { icon: Eye, label: 'Toxinas Ambientais', desc: 'Plásticos, produtos de limpeza, poluição indoor e cosméticos tóxicos.', link: '/projeto-autonomo/toxicos-ocultos/toxinas-ambientais', color: 'green' },
            ].map((item, i) => (
              <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}>
                <Link to={item.link}
                  className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-500/15 transition-all duration-500 hover:-translate-y-1 p-6"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-red-500 to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-red-500/8 border border-red-500/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={18} className="text-red-400/70" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-200 mb-1 group-hover:text-white transition-colors">{item.label}</h4>
                      <p className="text-stone-600 text-xs leading-relaxed group-hover:text-stone-500 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Link to="/projeto-autonomo/toxicos-ocultos"
              className="inline-flex items-center justify-center gap-3 bg-red-500 text-white px-8 py-4 font-semibold text-sm tracking-wide rounded-xl hover:bg-red-400 hover:shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-500 group"
            >
              <Eye size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Laboratório Completo
            </Link>
          </motion.div>
        </div>
      </section>


         (was: status grid + text CTA, now: immersive closing)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/[0.04]">
        {/* Status indicators — horizontal ribbon */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20">
            {[
              { phase: 'Base 72', accent: '#f43f5e' },
              { phase: 'Autonomia Biológica', accent: '#10b981' },
              { phase: 'Soberania Alimentar', accent: '#f59e0b' },
              { phase: 'Conhecimento Perdido', accent: '#14b8a6' },
            ].map((s) => (
              <div key={s.phase} className="flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>{s.phase}</span>
              </div>
            ))}
          </div>

          {/* Closing manifesto */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Redução inteligente de dependência</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-stone-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Autonomia não é fuga do sistema.
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-emerald-400 mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              É gestão de risco pessoal.
            </p>
            <Link to="/arsenal"
              className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
            >
              <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao centro de operações
            </Link>
          </motion.div>

          {/* Seal */}
          <div className="pt-12 border-t border-white/[0.04] text-right">
            <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem planta, não implora.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
