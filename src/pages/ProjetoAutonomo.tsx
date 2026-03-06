import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Tent, Siren, Cross, Egg, TreePine, Layers, Thermometer, Bug, Shovel, BookOpen, ChevronDown, Activity, Brain, Zap, Pill, Wind as WindIcon } from 'lucide-react';
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
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

/* ─── PHASE DATA ─── */
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
  {
    nome: "Espinheira Santa",
    sistema: "Digestivo",
    pnl: "A barreira natural contra a dieta industrial inflamatória.",
    uso: "Chá (infusão) das folhas secas.",
    dosagem: "1 colher de sobremesa para 200ml de água. Até 3x ao dia.",
    alerta: "Evitar durante a lactação (pode reduzir a produção de leite).",
    cta: "DOMINAR PROTOCOLO DIGESTIVO"
  },
  {
    nome: "Guaçatonga",
    sistema: "Tegumentar/Gástrico",
    pnl: "O curativo universal que a indústria farmacêutica ignorou.",
    uso: "Tintura ou compressa das folhas.",
    dosagem: "20 gotas em água ou aplicação direta em lesões.",
    alerta: "Não utilizar em feridas abertas profundas sem assepsia prévia.",
    cta: "ACESSAR GUIA DE CICATRIZAÇÃO"
  },
  {
    nome: "Arnica (Nacional)",
    sistema: "Osteomuscular",
    pnl: "Sua primeira linha de defesa contra traumas e impactos físicos.",
    uso: "Uso externo: tintura ou óleo infundido.",
    dosagem: "Aplicar sobre o local da contusão 2 a 3 vezes ao dia.",
    alerta: "Uso estritamente externo. Tóxica se ingerida.",
    cta: "REGENERAR TECIDOS"
  },
  {
    nome: "Poejo",
    sistema: "Respiratório",
    pnl: "Liberdade para respirar sem depender de xaropes sintéticos.",
    uso: "Infusão das partes aéreas.",
    dosagem: "1 colher de chá por xícara. Máximo 2 xícaras/dia.",
    alerta: "Contraindicado para gestantes (potencial abortivo).",
    cta: "LIMPAR VIAS AÉREAS"
  },
  {
    nome: "Capim-Limão",
    sistema: "Nervoso",
    pnl: "O controle da ansiedade sem as amarras dos ansiolíticos de massa.",
    uso: "Infusão das folhas frescas ou secas.",
    dosagem: "Consumo livre até 1 litro por dia para efeito calmante.",
    alerta: "Pode potencializar o efeito de sedativos industriais.",
    cta: "ESTABILIZAR O SISTEMA"
  },
  {
    nome: "Babosa (Aloe Vera)",
    sistema: "Multisistêmico",
    pnl: "A usina de regeneração celular que você planta no quintal.",
    uso: "Gel interno da folha (uso externo ou interno processado).",
    dosagem: "Uso tópico abundante ou 20ml do gel processado (sem aloína).",
    alerta: "A casca contém aloína (laxante irritante); deve ser removida.",
    cta: "ATIVAR REGENERAÇÃO"
  }
];

const SISTEMAS_DATA: Record<string, { plantas: string[]; foco: string; pnl: string; icon: React.ElementType; color: string }> = {
  digestivo: {
    plantas: ["Espinheira Santa", "Carqueja", "Gengibre"],
    foco: "Neutralização de acidez e otimização enzimática.",
    pnl: "O primeiro passo da soberania é não ser refém da má digestão industrial.",
    icon: Flame,
    color: "emerald",
  },
  respiratorio: {
    plantas: ["Poejo", "Sálvia"],
    foco: "Desobstrução e fortalecimento do parênquima pulmonar.",
    pnl: "Respirar sem ajuda química é o nível básico de autonomia física.",
    icon: Wind,
    color: "sky",
  },
  nervoso: {
    plantas: ["Capim-Limão", "Sálvia"],
    foco: "Estabilização de neurotransmissores e modulação de cortisol.",
    pnl: "Mente fria em cenários de crise: o controle vem da natureza, não da farmácia.",
    icon: Brain,
    color: "violet",
  },
  imuno: {
    plantas: ["Equinácea", "Alho", "Babosa"],
    foco: "Ativação de macrófagos e barreira antiviral.",
    pnl: "Sua imunidade é seu exército particular. Treine-o para não depender de terceiros.",
    icon: Shield,
    color: "amber",
  },
  glandular: {
    plantas: ["Dente-de-Leão", "Guaçatonga"],
    foco: "Depuração hepática e equilíbrio endócrino.",
    pnl: "Limpar o filtro do corpo para garantir que o sistema opere em carga máxima.",
    icon: Activity,
    color: "rose",
  },
};

const SISTEMA_LABELS: Record<string, string> = {
  digestivo: "Digestivo",
  respiratorio: "Respiratório",
  nervoso: "Nervoso",
  imuno: "Imunológico",
  glandular: "Glandular",
};

/* ─── Phase Color Map ─── */
const PHASE_COLORS = {
  '01': { accent: '#f43f5e', glow: 'rgba(244,63,94,0.15)', border: 'rgba(244,63,94,0.25)', text: 'text-rose-400', bg: 'bg-rose-500/10', borderClass: 'border-rose-500/20', hoverBorder: 'hover:border-rose-400/40' },
  '02': { accent: '#10b981', glow: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.25)', text: 'text-emerald-400', bg: 'bg-emerald-500/10', borderClass: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-400/40' },
  '03': { accent: '#f59e0b', glow: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.25)', text: 'text-amber-400', bg: 'bg-amber-500/10', borderClass: 'border-amber-500/20', hoverBorder: 'hover:border-amber-400/40' },
  '04': { accent: '#14b8a6', glow: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.25)', text: 'text-teal-400', bg: 'bg-teal-500/10', borderClass: 'border-teal-500/20', hoverBorder: 'hover:border-teal-400/40' },
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

/* ─── Cinematic Phase Hero ─── */
function PhaseHero({ img, alt, phaseNum, title, highlight, accentColor, iconEl }: {
  img: string; alt: string; phaseNum: string; title: string; highlight: string;
  accentColor: string; iconEl: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  return (
    <div ref={ref} className="relative w-full h-64 md:h-[420px] overflow-hidden">
      <motion.img
        src={img} alt={alt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ y: imgY, scale: imgScale }}
      />
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0a0f0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      
      {/* Accent glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: `linear-gradient(to top, ${accentColor}10, transparent)` }}
      />

      <motion.div
        className="absolute bottom-8 left-8 md:left-14 z-10"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] rounded-full" style={{ background: accentColor }} />
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: accentColor }}>
            Fase {phaseNum}
          </span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9] text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}<br /><span style={{ color: accentColor }}>{highlight}</span>
        </h2>
      </motion.div>
      
      <div className="absolute top-6 right-6 opacity-[0.06]">{iconEl}</div>
    </div>
  );
}

/* ─── Dark Module Card ─── */
function ModuleCard({ item, accentColor, basePath }: {
  item: { icon: any; label: string; desc: string; slug: string };
  accentColor: string; basePath: string;
}) {
  return (
    <Link
      to={`${basePath}/${item.slug}`}
      className="group block relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl shrink-0 border border-white/[0.06] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
            style={{ background: `${accentColor}15` }}
          >
            <item.icon size={18} style={{ color: accentColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold mb-1.5 text-stone-200 tracking-tight group-hover:text-white transition-colors">{item.label}</h4>
            <p className="text-stone-500 text-xs leading-relaxed group-hover:text-stone-400 transition-colors">{item.desc}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-60 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0">
          <ArrowRight size={14} style={{ color: accentColor }} />
        </div>
      </div>
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />
    </Link>
  );
}

/* ─── Layer Card (Soberania Alimentar) — Dark ─── */
function LayerCard({ layer, index, accentColor }: { layer: typeof ALIMENTAR_LAYERS[0]; index: number; accentColor: string }) {
  return (
    <Link
      to={`/projeto-autonomo/${layer.slug}`}
      className="group block border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center gap-4 p-5 md:p-6 md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <span className="text-2xl font-black tabular-nums opacity-20 text-stone-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            0{index + 1}
          </span>
          <div className="p-2 rounded-xl border border-white/[0.06] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500"
            style={{ background: `${accentColor}12` }}
          >
            <layer.icon size={20} style={{ color: accentColor }} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-200 tracking-tight">{layer.title}</h4>
            <p className="text-[10px] font-medium mt-0.5 opacity-60" style={{ color: accentColor }}>{layer.desc}</p>
          </div>
        </div>
        <div className="p-5 md:p-6 flex items-center">
          <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{layer.details}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Seed Progression — Dark ─── */
function SeedProgression() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const steps = ['1 vaso', '1 canteiro', '1 sistema'];

  return (
    <div ref={ref} className="flex items-center justify-center gap-3 md:gap-6 py-10">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110
              ${i === 0 ? 'bg-amber-500/10 border-amber-500/20' :
                i === 1 ? 'bg-amber-500/15 border-amber-500/25' :
                'bg-amber-500/20 border-amber-500/30'}`}
            >
              <Sprout className="text-amber-400" size={i === 2 ? 28 : i === 1 ? 24 : 20} />
            </div>
            <span className="text-stone-500 text-xs md:text-sm font-bold">{step}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={visible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.4, ease: APPLE_EASE, delay: i * 0.4 + 0.25 }}
              className="flex items-center mb-6"
            >
              <ArrowRight className="text-amber-500/40" size={20} />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Section Divider ─── */
function SectionDivider() {
  return (
    <div className="relative my-4 md:my-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function ProjetoAutonomo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { springX, springY } = useMouseParallax(12);
  const [activeSistema, setActiveSistema] = useState<string | null>(null);

  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/30 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050808 0%, #0a110a 8%, #0d150d 20%, #0f1a0f 40%, #0d150d 70%, #0a110a 90%, #050808 100%)' }}
    >

      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #10b981, #059669, #f59e0b)' }}
      />

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes sporeDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-800px) translateX(80px) rotate(360deg); opacity: 0; }
          }
        `}</style>

        {/* Gradient orbs with mouse parallax */}
        <motion.div
          className="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)',
            x: springX, y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)',
            x: useTransform(springX, v => -v * 0.6),
            y: useTransform(springY, v => -v * 0.6),
          }}
        />
        <motion.div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 65%)',
            x: useTransform(springX, v => v * 0.3),
            y: useTransform(springY, v => v * 0.3),
          }}
        />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* ── FLOATING ICONS with Scroll Parallax ── */}
      <motion.div style={{ y: floatY1 }} className="fixed top-[18%] left-[6%] pointer-events-none z-0">
        <Leaf className="text-emerald-500/[0.04]" size={100} />
      </motion.div>
      <motion.div style={{ y: floatY2 }} className="fixed bottom-[12%] right-[4%] pointer-events-none z-0">
        <TreePine className="text-emerald-500/[0.03]" size={130} />
      </motion.div>
      <motion.div style={{ y: floatY3 }} className="fixed top-[60%] left-[80%] pointer-events-none z-0">
        <Wheat className="text-amber-500/[0.04]" size={90} />
      </motion.div>

      {/* ── SPORE PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400/30"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animation: `sporeDrift ${30 + Math.random() * 40}s linear ${Math.random() * 20}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-24 md:pt-28">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 md:mb-20">
          <Link to="/" className="text-stone-600 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Projeto Autônomo</span>
        </nav>

        {/* ═══════════════ HERO HEADER ═══════════════ */}
        <motion.header
          initial="hidden" animate="visible" variants={scaleIn} custom={0}
          className="mb-24 md:mb-32"
        >
          <div className="flex items-start gap-5 mb-10">
            <motion.div
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mt-1"
              whileHover={{ scale: 1.1, rotate: 5, borderColor: 'rgba(16,185,129,0.4)' }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
            >
              <Shield className="text-emerald-400" size={28} />
            </motion.div>
            <div>
              <motion.p
                className="text-emerald-500/70 text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Engenharia de Resiliência Pessoal
              </motion.p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <motion.span
                  className="inline-block text-white"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
                >PROJETO</motion.span>
                <br />
                <motion.span
                  className="inline-block text-emerald-400"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.3 }}
                >AUTÔNOMO</motion.span>
              </h1>
              <VersionBadge version="v2.0" date="Mar 2026" className="mt-4" />
            </div>
          </div>

          {/* PNL Hook */}
          <motion.div
            className="relative pl-6 border-l-2 border-emerald-500/20 max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-stone-400 text-base md:text-lg leading-relaxed">
              Você terceiriza sua <span className="text-emerald-400 font-bold">comida</span> para uma indústria que lucra com a sua doença.
              Terceiriza sua <span className="text-emerald-400 font-bold">saúde</span> para um sistema que lucra com a sua dependência.
              E terceiriza sua <span className="text-emerald-400 font-bold">segurança</span> para um Estado que lucra com o seu medo.
            </p>
            <p className="text-stone-600 text-sm mt-4 leading-relaxed">
              Quatro fases. Uma progressão lógica. A construção metódica da sua <span className="font-semibold text-stone-300">independência real</span>.
              <SimboloOculto id="folha" className="ml-2 align-middle" />
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-stone-600"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Explorar</span>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </motion.header>

        {/* ═══════════════ PHASE NAVIGATION MAP ═══════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="mb-24 md:mb-32"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Base 72', sub: 'Protege o corpo', color: PHASE_COLORS['01'], desc: 'Autonomia mínima nas primeiras 72 horas. Abrigo, água, comunicação e deslocamento.', sectionId: 'fase-01', icon: Clock },
              { num: '02', title: 'Autonomia Biológica', sub: 'Fortalece o corpo', color: PHASE_COLORS['02'], desc: 'Saúde preventiva, primeiros socorros e fitoterapia como primeira linha de defesa.', sectionId: 'fase-02', icon: Heart },
              { num: '03', title: 'Soberania Alimentar', sub: 'Alimenta o corpo', color: PHASE_COLORS['03'], desc: 'Produção própria de alimento. Horta, solo, conservação e proteína sustentável.', sectionId: 'fase-03', icon: Wheat },
              { num: '04', title: 'Conhecimento Perdido', sub: 'Ensina a entender o corpo', color: PHASE_COLORS['04'], desc: 'Formação bioquímica e botânica. 12 plantas, 5 sistemas, 9 seções técnicas por ficha.', link: '/projeto-autonomo/conhecimento-perdido', icon: BookOpen },
            ].map((phase, i) => {
              const inner = (
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}
                  className={`relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 cursor-pointer group transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 h-full`}
                  style={{ borderColor: phase.color.border }}
                  onClick={!('link' in phase) ? () => document.getElementById(phase.sectionId!)?.scrollIntoView({ behavior: 'smooth' }) : undefined}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at center, ${phase.color.glow}, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg" style={{ background: `${phase.color.accent}15`, border: `1px solid ${phase.color.accent}25` }}>
                        <phase.icon size={16} style={{ color: phase.color.accent }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60" style={{ color: phase.color.accent }}>
                        Fase {phase.num}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-stone-200 group-hover:text-white transition-colors">{phase.title}</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: phase.color.accent + '99' }}>{phase.sub}</p>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{phase.desc}</p>
                    <ArrowRight style={{ color: phase.color.accent }} className="mt-5 opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:translate-x-2" size={16} />
                  </div>
                </motion.div>
              );

              if ('link' in phase && phase.link) {
                return <Link to={phase.link} key={phase.num} className="block">{inner}</Link>;
              }
              return <div key={phase.num}>{inner}</div>;
            })}
          </div>

          {/* Expansão contínua */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex justify-center mt-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-5 py-2.5 rounded-full backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em]">Conteúdo em expansão contínua</span>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════ NOTA CONTEXTUAL ═══════════════ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-white/[0.03] border border-white/[0.06] p-8 md:p-10 mb-24 md:mb-32 rounded-2xl backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 p-3 bg-amber-500/10 border border-amber-500/15 rounded-xl">
              <AlertTriangle className="text-amber-400" size={18} />
            </div>
            <div>
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Gestão de risco — Base técnica</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed text-stone-500">
                <p><span className="text-stone-300 font-semibold">Quem produz parte do que consome</span> reduz exposição a rupturas de abastecimento.</p>
                <p><span className="text-stone-300 font-semibold">Quem entende a cadeia alimentar</span> interpreta melhor preço, escassez e qualidade.</p>
                <p><span className="text-stone-300 font-semibold">Quem domina técnicas básicas de cultivo</span> amplia sua margem de segurança.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════ FASE 01 — BASE 72 ═══════════════ */}
        <motion.section
          id="fase-01" className="mb-24 md:mb-32 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="rounded-3xl border border-white/[0.06] overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent, rgba(244,63,94,0.03))' }}>
            <PhaseHero
              img={imgBase72} alt="Kit Tático 72h"
              phaseNum="01" title="BASE" highlight="72"
              accentColor="#f43f5e"
              iconEl={<Clock className="text-white" size={120} />}
            />

            <div className="p-8 md:p-14">
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                A referência vem da regra das 72 horas usada em protocolos de defesa civil.
                Após uma interrupção grave, os primeiros três dias exigem autonomia mínima.
                Essa preparação é baseada em <span className="font-semibold text-stone-200">dados históricos de resposta a desastres</span>.
              </p>
              <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider mb-12">
                Preparação mínima. Autonomia imediata. Protocolo objetivo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BASE72_ITEMS.map((item, i) => (
                  <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}>
                    <ModuleCard item={item} accentColor="#f43f5e" basePath="/projeto-autonomo" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <RiskBlock
                  theme="dark"
                  title="Sem esta base, o que acontece?"
                  consequences={[
                    "Dependência total de resgate externo nas primeiras 72 horas — tempo em que sistemas públicos estão sobrecarregados.",
                    "Sem água potável ou abrigo, a capacidade de decisão se degrada em poucas horas.",
                    "Comunicação zero com familiares em cenário de apagão ou desastre natural.",
                  ]}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* ═══════════════ FASE 02 — AUTONOMIA BIOLÓGICA ═══════════════ */}
        <motion.section
          id="fase-02" className="mb-24 md:mb-32 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="rounded-3xl border border-white/[0.06] overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.03))' }}>
            <PhaseHero
              img={imgAutonomiaBiologica} alt="Autonomia Biológica"
              phaseNum="02" title="AUTONOMIA" highlight="BIOLÓGICA"
              accentColor="#10b981"
              iconEl={<Heart className="text-white" size={120} />}
            />

            <div className="p-8 md:p-14">
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                Fortalecer o corpo é a base da resiliência. Conhecimento tradicional de cuidado
                complementa o sistema de saúde e amplia a capacidade de resposta em cenários adversos.
              </p>
              <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider mb-12">
                Base preventiva. Suporte tradicional. Complemento ao cuidado convencional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIO_ITEMS.map((item, i) => (
                  <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}>
                    <ModuleCard item={item} accentColor="#10b981" basePath="/projeto-autonomo" />
                  </motion.div>
                ))}
              </div>

              {/* ═══ MAPA DE SISTEMAS FISIOLÓGICOS ═══ */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="mt-16 mb-10"
              >
                <p className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-[0.5em] mb-2">Mapa Fisiológico</p>
                <h3 className="text-xl md:text-2xl font-bold text-stone-200 tracking-tight mb-2">
                  A base que sustenta cada decisão de <span className="text-emerald-400">saúde</span>
                </h3>
                <p className="text-stone-500 text-sm mb-8 max-w-xl">Clique em um sistema para revelar as plantas associadas, o foco terapêutico e a estratégia de autonomia.</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {Object.entries(SISTEMAS_DATA).map(([key, sys]) => {
                    const isActive = activeSistema === key;
                    const Icon = sys.icon;
                    return (
                      <motion.button
                        key={key}
                        onClick={() => setActiveSistema(isActive ? null : key)}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-500 cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
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

              {/* CTA Hub Sabedoria Ancestral */}
              <Link to="/projeto-autonomo/sabedoria-ancestral"
                className="mt-10 block bg-emerald-500/[0.06] border border-emerald-500/15 rounded-xl p-6 hover:border-emerald-400/30 hover:bg-emerald-500/[0.1] transition-all duration-500 group"
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

              <div className="mt-4 p-6 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl">
                <p className="text-emerald-400/60 text-sm font-medium">
                  Conhecer plantas medicinais, primeiros socorros e hábitos preventivos amplia autonomia sem substituir acompanhamento profissional.
                </p>
              </div>

              <div className="mt-10">
                <RiskBlock
                  theme="dark"
                  title="Sem esta base, o que acontece?"
                  consequences={[
                    "Incapacidade de prestar cuidados básicos em situação de emergência antes da chegada de ajuda profissional.",
                    "Desconhecimento de sinais vitais e sintomas impede a tomada de decisão correta sob pressão.",
                    "Dependência absoluta de farmácia e pronto-socorro para qualquer desconforto — sem alternativa complementar.",
                  ]}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* ═══════════════ FASE 03 — SOBERANIA ALIMENTAR ═══════════════ */}
        <motion.section
          id="fase-03" className="mb-24 md:mb-32 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="rounded-3xl border border-white/[0.06] overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.03))' }}>
            <PhaseHero
              img={imgSoberaniaAlimentar} alt="Soberania Alimentar"
              phaseNum="03" title="SOBERANIA" highlight="ALIMENTAR"
              accentColor="#f59e0b"
              iconEl={<Wheat className="text-white" size={120} />}
            />

            <div className="p-8 md:p-14">
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                Dependência total da cadeia industrial aumenta vulnerabilidade.
                Produzir parte do próprio alimento reduz exposição e aumenta qualidade nutricional.
              </p>
              <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider mb-12">
                De narrativa reativa para arquitetura produtiva.
              </p>

              <SeedProgression />

              <div className="space-y-4 mb-10">
                {ALIMENTAR_LAYERS.map((layer, i) => (
                  <motion.div key={layer.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                    <LayerCard layer={layer} index={i} accentColor="#f59e0b" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-amber-500/[0.04] border border-amber-500/10 rounded-xl">
                <p className="text-amber-400/60 text-sm font-medium">
                  Comece com um vaso. Depois um canteiro. Depois um sistema.
                  Cada etapa reduz uma camada de dependência.
                </p>
              </div>

              <div className="mt-10">
                <RiskBlock
                  theme="dark"
                  title="Sem esta base, o que acontece?"
                  consequences={[
                    "100% do alimento vem da cadeia industrial — qualquer ruptura de abastecimento afeta diretamente a mesa.",
                    "Sem conhecimento de cultivo, conservação ou solo, não há margem de manobra em cenários de escassez.",
                    "Custo alimentar cresce sem alternativa de produção própria, mesmo em espaços reduzidos.",
                  ]}
                />
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* ═══════════════ FASE 04 — CONHECIMENTO PERDIDO ═══════════════ */}
        <motion.section
          id="fase-04" className="mb-24 md:mb-32 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="rounded-3xl border border-white/[0.06] overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.03))' }}>
            <PhaseHero
              img={imgConhecimentoPerdido} alt="Conhecimento Perdido"
              phaseNum="04" title="CONHECIMENTO" highlight="PERDIDO"
              accentColor="#14b8a6"
              iconEl={<BookOpen className="text-white" size={120} />}
            />

            <div className="p-8 md:p-14">
              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                Fundamentos naturais aplicados à saúde, alimentação e resiliência.
                Um ecossistema completo com 12 plantas organizadas por sistema corporal,
                fichas técnicas detalhadas, dosagens seguras, contraindicações e educação botânica familiar.
              </p>
              <p className="text-stone-600 text-xs font-semibold uppercase tracking-wider mb-12">
                Resgate de sabedoria ancestral. Aplicação prática e documentada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Leaf, label: '5 Sistemas Corporais', desc: 'Digestivo, respiratório, nervoso, imunológico e circulatório mapeados.', link: '/conhecimento-perdido/base-fisiologica' },
                  { icon: BookOpen, label: '12 Plantas Documentadas', desc: 'Fichas técnicas com dosagens, contraindicações e métodos de preparo.', link: '/conhecimento-perdido/aplicacao-pratica' },
                  { icon: Heart, label: 'Educação Familiar', desc: 'Conteúdo adaptado para ensinar crianças sobre botânica e saúde natural.', link: '/conhecimento-perdido/continuidade-familiar' },
                  { icon: Shield, label: 'Integração Completa', desc: 'Conectado a todo o Protocolo Autônomo como base de conhecimento.', link: '/projeto-autonomo/conhecimento-perdido' },
                ].map((item, idx) => (
                  <Link to={item.link} key={item.label}>
                    <motion.div
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={idx}
                      className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-xl hover:bg-white/[0.06] hover:border-teal-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group cursor-pointer h-full"
                    >
                      <div className="p-2.5 bg-teal-500/10 border border-teal-500/15 rounded-xl w-fit mb-3 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                        <item.icon className="text-teal-400" size={18} />
                      </div>
                      <h4 className="text-sm font-bold mb-1.5 text-stone-200 tracking-tight group-hover:text-white transition-colors">{item.label}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed group-hover:text-stone-400 transition-colors">{item.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <Link
                to="/projeto-autonomo/conhecimento-perdido"
                className="inline-flex items-center gap-3 bg-teal-500 text-white px-8 py-4 font-semibold text-sm tracking-wide rounded-xl hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/20 hover:scale-[1.02] transition-all duration-500 group"
              >
                <BookOpen size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Ecossistema Completo
              </Link>

              <div className="mt-10 p-6 bg-teal-500/[0.04] border border-teal-500/10 rounded-xl">
                <p className="text-teal-400/60 text-sm font-medium">
                  O conhecimento que sustentou civilizações inteiras está sendo esquecido em uma geração.
                  Este módulo documenta e preserva o que não pode se perder.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════ STATUS PANEL ═══════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-24">
          {[
            { phase: 'Base 72', accent: '#f43f5e' },
            { phase: 'Autonomia Biológica', accent: '#10b981' },
            { phase: 'Soberania Alimentar', accent: '#f59e0b' },
            { phase: 'Conhecimento Perdido', accent: '#14b8a6' },
          ].map((s, idx) => (
            <motion.div
              key={s.phase}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={idx}
              className="border border-white/[0.06] bg-white/[0.02] p-4 md:p-6 text-center rounded-xl backdrop-blur-sm hover:bg-white/[0.04] hover:scale-[1.03] transition-all duration-500"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: s.accent }}>{s.phase}</p>
              <p className="text-stone-600 text-[10px] font-medium">Em expansão contínua</p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════ CTA FINAL ═══════════════ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-center mb-24"
        >
          <p className="text-stone-600 text-xs font-medium uppercase tracking-[0.4em] mb-8">Redução inteligente de dependência</p>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-snug mb-3 text-stone-300">
            Autonomia não é fuga do sistema.
          </h3>
          <p className="text-xl md:text-3xl font-bold tracking-tight text-emerald-400 mb-12">
            É gestão de risco pessoal.
          </p>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
          >
            <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao centro de operações
          </Link>
        </motion.div>

        {/* FOOTER SEAL */}
        <motion.div
          className="pt-16 border-t border-white/[0.06] text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem planta, não implora.</p>
        </motion.div>
      </div>
    </div>
  );
}
