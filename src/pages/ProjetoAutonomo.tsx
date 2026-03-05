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

/* ─── Parallax Image Hero for each Phase ─── */
function PhaseHero({ img, alt, phaseNum, title, highlight, colorClass, iconEl }: {
  img: string; alt: string; phaseNum: string; title: string; highlight: string;
  colorClass: string; iconEl: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.4]);

  return (
    <div ref={ref} className="relative w-full h-72 md:h-96 overflow-hidden">
      <motion.img
        src={img} alt={alt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ y: imgY, scale: imgScale, filter: 'contrast(1.1) saturate(1.15)' }}
      />
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${colorClass}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/30" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)', backgroundSize: '100% 4px' }}
      />

      <motion.div
        className="absolute bottom-8 left-8 md:left-14 z-10"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.2 }}
      >
        <span className={`text-[10px] font-bold tracking-[0.5em] uppercase drop-shadow-lg opacity-80`}
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >Fase {phaseNum}</span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-2 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}<br /><span className="opacity-80">{highlight}</span>
        </h2>
      </motion.div>
      
      <div className="absolute top-6 right-6 opacity-[0.08]">{iconEl}</div>
    </div>
  );
}

/* ─── Module Card with advanced hover ─── */
function ModuleCard({ item, colorBg, colorBorder, colorIcon, colorHoverBorder, basePath }: {
  item: { icon: any; label: string; desc: string; slug: string };
  colorBg: string; colorBorder: string; colorIcon: string; colorHoverBorder: string; basePath: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`${basePath}/${item.slug}`}
      className={`block relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer group ${colorBorder} border`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 20px 40px -15px rgba(0,0,0,0.15)' : '0 2px 8px -4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Shimmer line on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
        <motion.div
          className={`h-full ${colorHoverBorder}`}
          style={{ background: 'linear-gradient(90deg, transparent, currentColor, transparent)' }}
          animate={{ x: hovered ? ['-100%', '200%'] : '-100%' }}
          transition={{ duration: 1.2, ease: 'linear', repeat: hovered ? Infinity : 0 }}
        />
      </div>

      <div className={`${colorBg} p-6 backdrop-blur-sm`}>
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 ${hovered ? 'scale-110 rotate-3' : ''}`}
            style={{ background: hovered ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)' }}
          >
            <item.icon className={colorIcon} size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1.5 text-stone-800 tracking-tight">{item.label}</h4>
            <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        </div>
        <ArrowRight 
          className={`absolute bottom-4 right-4 transition-all duration-500 ${colorIcon}`}
          size={14}
          style={{ opacity: hovered ? 0.6 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)' }}
        />
      </div>
    </Link>
  );
}

/* ─── Layer Card (Soberania Alimentar) ─── */
function LayerCard({ layer, index }: { layer: typeof ALIMENTAR_LAYERS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/projeto-autonomo/${layer.slug}`}
      className="block border border-amber-200/50 rounded-xl overflow-hidden transition-all duration-500 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px -12px rgba(180,130,40,0.15)' : 'none',
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className={`flex items-center gap-4 p-6 md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-amber-100/40 transition-colors duration-500 ${hovered ? 'bg-amber-100/60' : 'bg-amber-50/50'}`}>
          <span className="text-amber-300/50 text-2xl font-black tabular-nums" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>0{index + 1}</span>
          <motion.div
            className="p-2 bg-amber-100/50 rounded-xl"
            animate={{ rotate: hovered ? 6 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: APPLE_EASE }}
          >
            <layer.icon className="text-amber-600 shrink-0" size={20} />
          </motion.div>
          <div>
            <h4 className="text-sm font-bold text-stone-800 tracking-tight">{layer.title}</h4>
            <p className="text-amber-600/60 text-[10px] font-medium mt-0.5">{layer.desc}</p>
          </div>
        </div>
        <div className={`p-6 flex items-center transition-colors duration-500 ${hovered ? 'bg-white/70' : 'bg-white/40'}`}>
          <p className="text-stone-500 text-sm leading-relaxed">{layer.details}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Seed Progression ─── */
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
    <div ref={ref} className="flex items-center justify-center gap-3 md:gap-6 py-8">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: APPLE_EASE, delay: i * 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
              ${i === 0 ? 'bg-emerald-200/60 border-2 border-emerald-400/40' :
                i === 1 ? 'bg-emerald-300/60 border-2 border-emerald-500/40' :
                'bg-emerald-500/30 border-2 border-emerald-600/50'}`}
            >
              <Sprout className="text-emerald-700" size={i === 2 ? 28 : i === 1 ? 24 : 20} />
            </div>
            <span className="text-stone-600 text-xs md:text-sm font-bold">{step}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={visible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.4, ease: APPLE_EASE, delay: i * 0.4 + 0.25 }}
              className="flex items-center mb-6"
            >
              <ArrowRight className="text-emerald-500/50" size={20} />
            </motion.div>
          )}
        </React.Fragment>
      ))}
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

  // Parallax values for floating elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);


  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-stone-900 font-sans selection:bg-emerald-300/50 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ebe5d8 0%, #ddd5c3 12%, #d2dcc4 30%, #c4d4ae 50%, #b8c9a0 70%, #cdd5bd 90%, #e0dace 100%)' }}
    >

      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #059669, #10b981, #d97706)' }}
      />

      {/* ── GRADIENT ORBS — Mouse-reactive + Scroll parallax ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes gradientShift {
            0%, 100% { opacity: 0.25; transform: translate(0, 0); }
            50% { opacity: 0.35; transform: translate(-20px, 10px); }
          }
          @keyframes sporeDrift {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.4; }
            100% { transform: translateY(-800px) translateX(80px) rotate(360deg); opacity: 0; }
          }
          @keyframes pulseRing {
            0%, 100% { transform: scale(1); opacity: 0.15; }
            50% { transform: scale(1.05); opacity: 0.25; }
          }
        `}</style>

        {/* Mouse-reactive gradient orbs */}
        <motion.div
          className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,225,140,0.3) 0%, transparent 65%)',
            animation: 'gradientShift 20s ease-in-out infinite',
            x: springX, y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(160,200,110,0.25) 0%, transparent 65%)',
            animation: 'gradientShift 25s ease-in-out 3s infinite',
            x: useTransform(springX, v => -v * 0.6),
            y: useTransform(springY, v => -v * 0.6),
          }}
        />
        <motion.div
          className="absolute top-[45%] right-[15%] w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,115,85,0.15) 0%, transparent 65%)',
            animation: 'gradientShift 22s ease-in-out 6s infinite',
            x: useTransform(springX, v => v * 0.4),
            y: useTransform(springY, v => v * 0.4),
          }}
        />

        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* ── FLOATING ORGANIC ICONS with Scroll Parallax ── */}
      <motion.div style={{ y: floatY1 }} className="fixed top-[18%] left-[6%] pointer-events-none z-0">
        <Leaf className="text-emerald-700/[0.06]" size={100} />
      </motion.div>
      <motion.div style={{ y: floatY2 }} className="fixed bottom-[12%] right-[4%] pointer-events-none z-0">
        <TreePine className="text-emerald-800/[0.05]" size={130} />
      </motion.div>
      <motion.div style={{ y: floatY3 }} className="fixed top-[60%] left-[80%] pointer-events-none z-0">
        <Wheat className="text-amber-700/[0.06]" size={90} />
      </motion.div>

      {/* ── SPORE PARTICLES ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-600/30"
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28">

        <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 mb-20 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:tracking-[0.4em] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" /> Voltar ao Início
        </Link>

        {/* ═══════════════ HERO HEADER ═══════════════ */}
        <motion.header
          initial="hidden" animate="visible" variants={scaleIn} custom={0}
          className="mb-28"
        >
          <div className="flex items-start gap-5 mb-10">
            <motion.div
              className="p-4 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl mt-1"
              whileHover={{ scale: 1.1, rotate: 5, borderColor: 'rgba(5,150,105,0.4)' }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
            >
              <Shield className="text-emerald-700" size={28} />
            </motion.div>
            <div>
              <motion.p
                className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Engenharia de Resiliência Pessoal
              </motion.p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-stone-800" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
                >PROJETO</motion.span>
                <br />
                <motion.span
                  className="inline-block text-emerald-700"
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.3 }}
                >AUTÔNOMO</motion.span>
              </h1>
              <VersionBadge version="v2.0" date="Mar 2026" className="mt-4" />
            </div>
          </div>

          {/* PNL Hook — Cognitive Dissonance */}
          <motion.div
            className="relative pl-6 border-l-2 border-emerald-500/30 max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-stone-600 text-base md:text-lg leading-relaxed">
              Você terceiriza sua <span className="text-emerald-700 font-bold">comida</span> para uma indústria que lucra com a sua doença.
              Terceiriza sua <span className="text-emerald-700 font-bold">saúde</span> para um sistema que lucra com a sua dependência.
              E terceiriza sua <span className="text-emerald-700 font-bold">segurança</span> para um Estado que lucra com o seu medo.
            </p>
            <p className="text-stone-500 text-sm mt-4 leading-relaxed">
              Quatro fases. Uma progressão lógica. A construção metódica da sua <span className="font-semibold text-stone-700">independência real</span>.
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
              className="flex flex-col items-center gap-2 text-stone-400"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Explorar</span>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </motion.header>

        {/* ═══════════════ PROGRESSION MAP ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {[
            { num: '01', title: 'Base 72', sub: 'Protege o corpo', colorText: 'text-rose-600', colorBg: 'bg-rose-50/70', colorBorder: 'border-rose-200/60', colorHover: 'hover:border-rose-300 hover:shadow-rose-100/40', desc: 'Autonomia mínima nas primeiras 72 horas. Abrigo, água, comunicação e deslocamento.', sectionId: 'fase-01' },
            { num: '02', title: 'Autonomia Biológica', sub: 'Fortalece o corpo', colorText: 'text-emerald-600', colorBg: 'bg-emerald-50/70', colorBorder: 'border-emerald-200/60', colorHover: 'hover:border-emerald-300 hover:shadow-emerald-100/40', desc: 'Saúde preventiva, primeiros socorros e fitoterapia como primeira linha de defesa.', link: '/projeto-autonomo/sabedoria-ancestral' },
            { num: '03', title: 'Soberania Alimentar', sub: 'Alimenta o corpo', colorText: 'text-amber-600', colorBg: 'bg-amber-50/70', colorBorder: 'border-amber-200/60', colorHover: 'hover:border-amber-300 hover:shadow-amber-100/40', desc: 'Produção própria de alimento. Horta, solo, conservação e proteína sustentável.', sectionId: 'fase-03' },
            { num: '04', title: 'Conhecimento Perdido', sub: 'Ensina a entender o corpo', colorText: 'text-teal-600', colorBg: 'bg-teal-50/70', colorBorder: 'border-teal-200/60', colorHover: 'hover:border-teal-300 hover:shadow-teal-100/40', desc: 'Formação bioquímica e botânica. 12 plantas, 5 sistemas, 9 seções técnicas por ficha.', link: '/projeto-autonomo/conhecimento-perdido' },
          ].map((phase, i) => {
            const content = (
              <>
                <span className={`${phase.colorText} text-[10px] font-bold tracking-[0.4em] uppercase opacity-70`}>Fase {phase.num}</span>
                <h3 className="text-xl font-bold tracking-tight mt-3 mb-1 text-stone-800">{phase.title}</h3>
                <p className={`${phase.colorText} text-xs font-semibold uppercase tracking-widest mb-4`}>{phase.sub}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{phase.desc}</p>
                <ArrowRight className={`${phase.colorText} mt-5 opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:translate-x-2`} size={16} />
              </>
            );
            const cls = `${phase.colorBg} ${phase.colorBorder} ${phase.colorHover} border p-8 md:p-10 rounded-2xl backdrop-blur-sm transition-all duration-500 group cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 block`;

            if ('link' in phase && phase.link) {
              return (
                <motion.div key={phase.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}>
                  <Link to={phase.link} className={cls}>{content}</Link>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={phase.num}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}
                onClick={() => document.getElementById(phase.sectionId!)?.scrollIntoView({ behavior: 'smooth' })}
                className={cls}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* ─── Expansão contínua ─── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="flex justify-center mb-28 -mt-20"
        >
          <div className="inline-flex items-center gap-2 bg-stone-200/40 border border-stone-300/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.4em]">Conteúdo em expansão contínua</span>
          </div>
        </motion.div>

        {/* ═══════════════ NOTA CONTEXTUAL ═══════════════ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-stone-100/60 border border-stone-300/40 p-8 md:p-10 mb-28 rounded-2xl backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 p-3 bg-stone-200/60 rounded-xl">
              <AlertTriangle className="text-stone-500" size={18} />
            </div>
            <div>
              <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Gestão de risco — Base técnica</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed text-stone-500">
                <p><span className="text-stone-700 font-semibold">Quem produz parte do que consome</span> reduz exposição a rupturas de abastecimento.</p>
                <p><span className="text-stone-700 font-semibold">Quem entende a cadeia alimentar</span> interpreta melhor preço, escassez e qualidade.</p>
                <p><span className="text-stone-700 font-semibold">Quem domina técnicas básicas de cultivo</span> amplia sua margem de segurança.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════ FASE 01 — BASE 72 ═══════════════ */}
        <motion.section
          id="fase-01" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="border border-rose-200/50 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <PhaseHero
              img={imgBase72} alt="Kit Tático 72h"
              phaseNum="01" title="BASE" highlight="72"
              colorClass="to-rose-50/100"
              iconEl={<Clock className="text-white" size={120} />}
            />

            <div className="bg-rose-50/80 p-10 md:p-14 relative">
              <div className="relative z-10">
                <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                  A referência vem da regra das 72 horas usada em protocolos de defesa civil.
                  Após uma interrupção grave, os primeiros três dias exigem autonomia mínima.
                  Essa preparação é baseada em <span className="font-semibold text-stone-700">dados históricos de resposta a desastres</span>.
                </p>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                  Preparação mínima. Autonomia imediata. Protocolo objetivo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {BASE72_ITEMS.map((item, i) => (
                    <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}>
                      <ModuleCard
                        item={item}
                        colorBg="bg-white/50"
                        colorBorder="border-rose-100/60"
                        colorIcon="text-rose-500"
                        colorHoverBorder="text-rose-400"
                        basePath="/projeto-autonomo"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-rose-100/30 border border-rose-200/30 rounded-xl">
                  <p className="text-rose-600/80 text-sm font-medium">
                    A preparação antecipa a necessidade. Ter um kit básico reduz a dependência de resposta externa nas primeiras horas.
                  </p>
                </div>

                <div className="mt-8">
                  <RiskBlock
                    theme="light"
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
          </div>
        </motion.section>

        {/* ═══════════════ FASE 02 — AUTONOMIA BIOLÓGICA ═══════════════ */}
        <motion.section
          id="fase-02" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="border border-emerald-200/50 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <PhaseHero
              img={imgAutonomiaBiologica} alt="Autonomia Biológica"
              phaseNum="02" title="AUTONOMIA" highlight="BIOLÓGICA"
              colorClass="to-emerald-50/100"
              iconEl={<Heart className="text-white" size={120} />}
            />

            <div className="bg-emerald-50/80 p-10 md:p-14 relative">
              <div className="relative z-10">
                <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                  Fortalecer o corpo é a base da resiliência. Conhecimento tradicional de cuidado
                  complementa o sistema de saúde e amplia a capacidade de resposta em cenários adversos.
                </p>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                  Base preventiva. Suporte tradicional. Complemento ao cuidado convencional.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {BIO_ITEMS.map((item, i) => (
                    <motion.div key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.4}>
                      <ModuleCard
                        item={item}
                        colorBg="bg-white/50"
                        colorBorder="border-emerald-100/60"
                        colorIcon="text-emerald-500"
                        colorHoverBorder="text-emerald-400"
                        basePath="/projeto-autonomo"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* ═══ MAPA DE SISTEMAS FISIOLÓGICOS — Interativo ═══ */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                  className="mt-14 mb-10"
                >
                  <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.5em] mb-2">Mapa Fisiológico</p>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight mb-2">
                    A base que sustenta cada decisão de <span className="text-emerald-600">saúde</span>
                  </h3>
                  <p className="text-stone-500 text-sm mb-8 max-w-xl">Clique em um sistema para revelar as plantas associadas, o foco terapêutico e a estratégia de autonomia.</p>

                  {/* System Icons Row */}
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
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-300/30'
                              : 'bg-white/60 text-stone-600 border-stone-200/60 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700'
                          }`}
                        >
                          <Icon size={16} className={isActive ? 'text-white' : 'text-emerald-500'} />
                          {SISTEMA_LABELS[key]}
                        </motion.button>
                      );
                    })}
                  </div>

                </motion.div>

                {/* Drawer Tático — renderizado via portal-style no final */}
                <PainelTaticoFisiologico
                  isOpen={!!activeSistema}
                  onClose={() => setActiveSistema(null)}
                  nome={activeSistema ? (SISTEMA_LABELS[activeSistema] || activeSistema) : ""}
                  sistema={activeSistema ? SISTEMAS_DATA[activeSistema] : null}
                />

                {/* CTA Hub Sabedoria Ancestral */}
                <Link to="/projeto-autonomo/sabedoria-ancestral"
                  className="mt-10 block bg-gradient-to-r from-emerald-100/50 to-emerald-50/60 border border-emerald-300/50 rounded-xl p-6 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-200/20 hover:scale-[1.01] transition-all duration-500 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-200/50 rounded-xl group-hover:rotate-6 transition-transform duration-500">
                        <Leaf className="text-emerald-600" size={20} />
                      </div>
                      <div>
                        <p className="text-emerald-700 text-sm font-bold">Sabedoria Ancestral</p>
                        <p className="text-stone-500 text-xs mt-0.5">Hub completo: plantas medicinais, saúde natural e soberania alimentar</p>
                      </div>
                    </div>
                    <ArrowRight className="text-emerald-400 group-hover:translate-x-2 transition-transform duration-500" size={18} />
                  </div>
                </Link>

                <div className="mt-4 p-6 bg-emerald-100/30 border border-emerald-200/30 rounded-xl">
                  <p className="text-emerald-600/80 text-sm font-medium">
                    Conhecer plantas medicinais, primeiros socorros e hábitos preventivos amplia autonomia sem substituir acompanhamento profissional.
                  </p>
                </div>

                <div className="mt-8">
                  <RiskBlock
                    theme="light"
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
          </div>
        </motion.section>

        {/* ═══════════════ FASE 03 — SOBERANIA ALIMENTAR ═══════════════ */}
        <motion.section
          id="fase-03" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="border border-amber-200/50 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <PhaseHero
              img={imgSoberaniaAlimentar} alt="Soberania Alimentar"
              phaseNum="03" title="SOBERANIA" highlight="ALIMENTAR"
              colorClass="to-amber-50/100"
              iconEl={<Wheat className="text-white" size={120} />}
            />

            <div className="bg-amber-50/80 p-10 md:p-14 relative">
              <div className="relative z-10">
                <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                  Dependência total da cadeia industrial aumenta vulnerabilidade.
                  Produzir parte do próprio alimento reduz exposição e aumenta qualidade nutricional.
                </p>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                  De narrativa reativa para arquitetura produtiva.
                </p>

                <SeedProgression />

                <div className="space-y-4 mb-10">
                  {ALIMENTAR_LAYERS.map((layer, i) => (
                    <motion.div key={layer.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                      <LayerCard layer={layer} index={i} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-amber-100/30 border border-amber-200/30 rounded-xl">
                  <p className="text-amber-700/80 text-sm font-medium">
                    Comece com um vaso. Depois um canteiro. Depois um sistema.
                    Cada etapa reduz uma camada de dependência.
                  </p>
                </div>

                <div className="mt-8">
                  <RiskBlock
                    theme="light"
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
          </div>
        </motion.section>

        {/* ═══════════════ FASE 04 — CONHECIMENTO PERDIDO ═══════════════ */}
        <motion.section
          id="fase-04" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}
        >
          <div className="border border-teal-200/50 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <PhaseHero
              img={imgConhecimentoPerdido} alt="Conhecimento Perdido"
              phaseNum="04" title="CONHECIMENTO" highlight="PERDIDO"
              colorClass="to-teal-50/100"
              iconEl={<BookOpen className="text-white" size={120} />}
            />

            <div className="bg-teal-50/80 p-10 md:p-14 relative">
              <div className="relative z-10">
                <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                  Fundamentos naturais aplicados à saúde, alimentação e resiliência.
                  Um ecossistema completo com 12 plantas organizadas por sistema corporal,
                  fichas técnicas detalhadas, dosagens seguras, contraindicações e educação botânica familiar.
                </p>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
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
                        className="bg-white/50 border border-teal-100/60 p-6 rounded-xl hover:bg-white/70 hover:shadow-md hover:border-teal-200 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group cursor-pointer h-full"
                      >
                        <div className="p-2.5 bg-teal-100/60 rounded-xl w-fit mb-3 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                          <item.icon className="text-teal-500" size={18} />
                        </div>
                        <h4 className="text-sm font-bold mb-1.5 text-stone-800 tracking-tight">{item.label}</h4>
                        <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/projeto-autonomo/conhecimento-perdido"
                  className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 font-semibold text-sm tracking-wide rounded-xl hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-200/30 hover:scale-[1.02] transition-all duration-500 group"
                >
                  <BookOpen size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Ecossistema Completo
                </Link>

                <div className="mt-10 p-6 bg-teal-100/30 border border-teal-200/30 rounded-xl">
                  <p className="text-teal-700/80 text-sm font-medium">
                    O conhecimento que sustentou civilizações inteiras está sendo esquecido em uma geração.
                    Este módulo documenta e preserva o que não pode se perder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════ STATUS PANEL ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {[
            { phase: 'Base 72', color: 'border-rose-200 text-rose-600', bg: 'bg-rose-50/50' },
            { phase: 'Autonomia Biológica', color: 'border-emerald-200 text-emerald-600', bg: 'bg-emerald-50/50' },
            { phase: 'Soberania Alimentar', color: 'border-amber-200 text-amber-600', bg: 'bg-amber-50/50' },
            { phase: 'Conhecimento Perdido', color: 'border-teal-200 text-teal-600', bg: 'bg-teal-50/50' },
          ].map((s, idx) => (
            <motion.div
              key={s.phase}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={idx}
              className={`border ${s.color} ${s.bg} p-6 text-center rounded-xl backdrop-blur-sm hover:scale-[1.03] transition-all duration-500`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-1">{s.phase}</p>
              <p className="text-stone-400 text-[10px] font-medium">Em construção — guias e materiais em breve</p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════ CTA FINAL ═══════════════ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-center mb-24"
        >
          <p className="text-stone-400 text-xs font-medium uppercase tracking-[0.4em] mb-8">Redução inteligente de dependência</p>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-snug mb-3 text-stone-700">
            Autonomia não é fuga do sistema.
          </h3>
          <p className="text-xl md:text-3xl font-bold tracking-tight text-emerald-600 mb-12">
            É gestão de risco pessoal.
          </p>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-300/30 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
          >
            <Shield size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Voltar ao centro de operações
          </Link>
        </motion.div>

        {/* FOOTER SEAL */}
        <motion.div
          className="pt-16 border-t border-stone-300/30 text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-stone-400 font-medium text-base tracking-tight opacity-40 italic">Quem planta, não implora.</p>
        </motion.div>
      </div>
    </div>
  );
}
