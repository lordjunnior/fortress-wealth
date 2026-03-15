import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Package, Flame, Droplets, Tent, Siren, Wind, Leaf, Cross, Thermometer, Sun, Sprout, Bug, Layers, Egg, Shovel } from 'lucide-react';
import { motion } from 'framer-motion';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface ModuleData {
  title: string;
  phase: string;
  phaseLabel: string;
  icon: typeof Package;
  description: string;
  scope: string[];
  progress: number;
  version: string;
  release: string;
  color: {
    bg: string;
    border: string;
    text: string;
  accent: string;
    bar: string;
    iconBg: string;
  };
}

const MODULES: Record<string, ModuleData> = {
  'kit-72h': {
    title: 'Kit Tático 72h',
    phase: '01', phaseLabel: 'Base 72',
    icon: Package,
    description: 'Água, alimento, documentos, rádio e medicamentos para autonomia mínima de 3 dias. Sistema portátil de autonomia com 5 pilares críticos.',
    scope: ['Hidratação estratégica (9–12L por pessoa)', 'Alimento de alta densidade calórica', 'Documentação impermeável e backup digital', 'Rádio AM/FM para informação em apagão', 'Continuidade terapêutica medicamentosa'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'protocolos-apagao': {
    title: 'Protocolos de Apagão',
    phase: '01', phaseLabel: 'Base 72',
    icon: Flame,
    description: 'Iluminação, cozimento e aquecimento alternativos quando a rede elétrica está indisponível. Protocolo de ação progressivo por tempo de apagão.',
    scope: ['Iluminação estratégica em 3 níveis', 'Cocção segura sem eletricidade', 'Conservação de alimentos sem geladeira', 'Controle térmico passivo', 'Energia de emergência', 'Protocolo de ação progressivo'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'purificacao-agua': {
    title: 'Purificação de Água',
    phase: '01', phaseLabel: 'Base 72',
    icon: Droplets,
    description: 'Fervura, cloração e filtração improvisada. Métodos validados em protocolos de defesa civil para ambientes com recursos limitados.',
    scope: ['Protocolo de fervura por altitude', 'Dosagem de hipoclorito por volume', 'Filtro improvisado em camadas', 'Coleta segura e armazenamento', 'Protocolo rápido de decisão', 'Sinais de contaminação'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'abrigo-emergencia': {
    title: 'Abrigo de Emergência',
    phase: '01', phaseLabel: 'Base 72',
    icon: Tent,
    description: 'Proteção térmica, estrutural, psicológica e sanitária em cenários de interrupção prolongada. 10 blocos técnicos com engenharia térmica aplicada.',
    scope: ['6 camadas do abrigo eficiente', 'Isolamento do solo e estrutura', 'Ambiente compacto e camadas corporais', 'Ventilação controlada e higiene sanitária', 'Proteção contra calor e resfriamento passivo', 'Psicologia do abrigo e sinais de hipotermia'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'comunicacao-offline': {
    title: 'Comunicação sem Internet',
    phase: '01', phaseLabel: 'Base 72',
    icon: Siren,
    description: 'Coordenação, informação e organização familiar quando redes móveis e internet estão indisponíveis. 8 blocos com rádio, sinais visuais e contingência física.',
    scope: ['Rádio AM/FM e frequências de emergência', 'Protocolo de ponto de encontro familiar', 'Sinalização visual e código doméstico', 'Rádio amador (VHF/UHF) opcional', 'Organização de informações e gestão de energia', 'Contingência sem tecnologia e segurança da informação'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'navegacao-primaria': {
    title: 'Navegação Primária',
    phase: '01', phaseLabel: 'Base 72',
    icon: Wind,
    description: 'Orientação por bússola, sol, terreno e referências naturais. 8 blocos técnicos para deslocamento seguro sem dependência digital.',
    scope: ['Orientação solar e método do bastão', 'Uso correto da bússola analógica', 'Leitura de terreno e referências urbanas', 'Planejamento de deslocamento e ritmo seguro', 'Marcação de caminho e navegação noturna', 'Sinais de desorientação e protocolo de parada'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },

  // PHASE 2 — AUTONOMIA BIOLÓGICA
  'suporte-fitoterapico': {
    title: 'Suporte Fitoterápico',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Leaf,
    description: 'Biblioteca técnica de 12 plantas essenciais. Dosagens conservadoras, contraindicações, interações medicamentosas e métodos de preparo.',
    scope: ['Fichas técnicas de 12 plantas essenciais', 'Dosagens conservadoras referenciadas', 'Contraindicações e interações medicamentosas', 'Métodos de preparo e conservação'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'primeiros-socorros': {
    title: 'Primeiros Socorros',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Cross,
    description: 'Módulo publicado. Contenção de sangramento, imobilização, queimaduras e kit funcional.',
    scope: ['Protocolo ABCDE de avaliação', 'Técnicas de hemostasia', 'Imobilização com materiais improvisados', 'Kit mínimo de primeiros socorros'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'sinais-vitais': {
    title: 'Avaliação Básica de Sinais',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Thermometer,
    description: 'Módulo publicado. 6 pilares de avaliação funcional com faixas numéricas e critérios de decisão.',
    scope: ['Faixas normais de temperatura e pulso', 'Sinais de desidratação por grau', 'Quando buscar atendimento profissional', 'Registro simplificado de evolução'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'saude-preventiva': {
    title: 'Saúde Preventiva',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Sun,
    description: 'Módulo publicado. Estratégias anti-inflamatórias avançadas e protocolo integrado.',
    scope: ['Protocolo de exposição solar segura', 'Higiene do sono em ambientes adversos', 'Exercícios sem equipamento', 'Princípios de alimentação anti-inflamatória'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'fitoterapia-aplicada': {
    title: 'Fitoterapia Aplicada',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Sprout,
    description: 'Protocolos terapêuticos combinados por sistema corporal. Sinergia entre plantas, ciclos de uso, ajuste por idade e critérios de interrupção.',
    scope: ['Protocolos por sistema corporal', 'Combinações estratégicas de plantas', 'Ciclos de uso e ajuste por idade', 'Critérios de interrupção e encaminhamento'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'controle-vetores': {
    title: 'Controle de Vetores',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Bug,
    description: 'Estratégia sanitária de baixo impacto ambiental. Repelentes naturais, eliminação de criadouros, barreiras físicas e plantas repelentes.',
    scope: ['Repelentes naturais com receita técnica', 'Protocolo semanal de eliminação de criadouros', 'Barreiras físicas (telas e mosquiteiros)', 'Plantas repelentes e controle de roedores'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },

  // PHASE 3 — SOBERANIA ALIMENTAR
  'horta-urbana': {
    title: 'Horta Urbana',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Sprout,
    description: 'Módulo publicado. Guia completo de cultivo urbano com 9 blocos técnicos.',
    scope: ['Vasos autoirrigáveis DIY', 'Cultivo vertical em espaços mínimos', 'Calendário de plantio por região', 'Espécies ideais para iniciantes'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
  'producao-pequenos-espacos': {
    title: 'Produção em Pequenos Espaços',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Layers,
    description: 'Planejamento correto transforma 4m² em fonte de alimento. Consórcio de culturas e aproveitamento de microclimas.',
    scope: ['Layout otimizado de canteiros', 'Consórcio de culturas compatíveis', 'Rotação sazonal de plantio', 'Aproveitamento de microclimas urbanos'],
    progress: 35, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
  'conservacao-armazenamento': {
    title: 'Conservação e Armazenamento',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Flame,
    description: 'Módulo publicado. 10 alimentos essenciais + 18 métodos de conservação validados.',
    scope: ['10 alimentos essenciais de estoque estratégico', '18 métodos de conservação documentados', 'Protocolos de armazenamento por alimento', 'Notas de segurança e alertas técnicos'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
  'proteina-sustentavel': {
    title: 'Proteína Sustentável',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Egg,
    description: 'Galinhas, codornas, peixes e sistemas compactos de produção animal. Proteína de alta qualidade em espaços reduzidos.',
    scope: ['Galinheiro móvel para quintais', 'Criação de codornas em apartamento', 'Aquaponia básica com tilápia', 'Manejo sanitário simplificado'],
    progress: 20, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
  'solo-fertilidade': {
    title: 'Solo e Fertilidade',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Shovel,
    description: 'Compostagem, bokashi, húmus de minhoca. Terra viva gera alimento vivo. Fundamentos de fertilidade para produção contínua.',
    scope: ['Composteira doméstica passo a passo', 'Produção de bokashi', 'Minhocário e húmus líquido', 'Análise caseira de pH do solo'],
    progress: 100, version: '1.0', release: 'Publicado',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
};

export default function ModuloAutonomo() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Redirect to dedicated pages for published modules
  if (slug === 'conservacao-armazenamento') {
    return <Navigate to="/projeto-autonomo/conservacao-armazenamento" replace />;
  }
  if (slug === 'kit-72h') {
    return <Navigate to="/projeto-autonomo/kit-72h" replace />;
  }
  if (slug === 'purificacao-agua') {
    return <Navigate to="/projeto-autonomo/purificacao-agua" replace />;
  }
  if (slug === 'protocolos-apagao') {
    return <Navigate to="/projeto-autonomo/protocolos-apagao" replace />;
  }
  if (slug === 'abrigo-emergencia') {
    return <Navigate to="/projeto-autonomo/abrigo-emergencia" replace />;
  }
  if (slug === 'comunicacao-offline') {
    return <Navigate to="/projeto-autonomo/comunicacao-offline" replace />;
  }
  if (slug === 'navegacao-primaria') {
    return <Navigate to="/projeto-autonomo/navegacao-primaria" replace />;
  }
  if (slug === 'producao-pequenos-espacos') {
    return <Navigate to="/projeto-autonomo/producao-pequenos-espacos" replace />;
  }
  if (slug === 'proteina-sustentavel') {
    return <Navigate to="/projeto-autonomo/proteina-sustentavel" replace />;
  }
  if (slug === 'solo-fertilidade') {
    return <Navigate to="/projeto-autonomo/solo-fertilidade" replace />;
  }
  if (slug === 'horta-urbana') {
    return <Navigate to="/projeto-autonomo/horta-urbana" replace />;
  }
  if (slug === 'primeiros-socorros') {
    return <Navigate to="/projeto-autonomo/primeiros-socorros" replace />;
  }
  if (slug === 'sinais-vitais') {
    return <Navigate to="/projeto-autonomo/avaliacao-sinais" replace />;
  }
  if (slug === 'saude-preventiva') {
    return <Navigate to="/projeto-autonomo/saude-preventiva" replace />;
  }
  if (slug === 'fitoterapia-aplicada') {
    return <Navigate to="/projeto-autonomo/fitoterapia-aplicada" replace />;
  }
  if (slug === 'controle-vetores') {
    return <Navigate to="/projeto-autonomo/controle-vetores" replace />;
  }
  
  const mod = slug ? MODULES[slug] : null;

  if (!mod) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-400 text-sm mb-4">Módulo não encontrado</p>
          <Link to="/projeto-autonomo" className="text-emerald-600 text-sm font-semibold hover:underline">
            Voltar ao Projeto Autônomo
          </Link>
        </div>
      </div>
    );
  }

  const Icon = mod.icon;

  const phaseGradient = mod.phase === '01'
    ? 'linear-gradient(180deg, #f9f1f1 0%, #fdf6f0 30%, #f5f0ea 60%, #ede8e0 100%)'
    : mod.phase === '02'
    ? 'linear-gradient(180deg, #f0f7f0 0%, #f4f8f0 30%, #f0f3ea 60%, #ede8e0 100%)'
    : 'linear-gradient(180deg, #faf6ef 0%, #f8f4ea 30%, #f2ede4 60%, #ede8e0 100%)';

  return (
    <div className="min-h-screen selection:bg-emerald-200" style={{ background: phaseGradient }}>
      <div className="max-w-3xl mx-auto px-5 md:px-6 pt-20 pb-32">

        {/* Back */}
        <Link
          to="/projeto-autonomo"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ══ BLOCO 1: IDENTIDADE DO MÓDULO ══ */}
        <motion.section
          className={`${mod.color.bg} border ${mod.color.border} rounded-2xl p-6 md:p-10 mb-3`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
        >
          <span className={`text-[10px] font-bold tracking-[0.5em] uppercase ${mod.color.accent} opacity-70`}>
            Fase {mod.phase} · {mod.phaseLabel}
          </span>

          <div className="mt-4 flex items-start gap-4 md:gap-5">
            <div className={`p-3 md:p-4 ${mod.color.iconBg} rounded-2xl shrink-0 mt-1`}>
              <Icon className={mod.color.text} size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-stone-800 leading-tight">
                {mod.title}
              </h1>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed mt-3 max-w-xl">
                {mod.description}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Divisor visual PNL ── */}
        <div className="flex items-center gap-3 my-1 px-2">
          <div className={`flex-1 h-px ${mod.color.bar} opacity-20`} />
          <span className="text-stone-400 text-[9px] font-bold tracking-[0.4em] uppercase">Status</span>
          <div className={`flex-1 h-px ${mod.color.bar} opacity-20`} />
        </div>

        {/* ══ BLOCO 2: STATUS E PROGRESSO ══ */}
        <motion.section
          className="bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-2xl p-6 md:p-10 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock size={16} className={mod.color.text} />
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${mod.color.text}`}>
              Módulo em Desenvolvimento
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-500 text-xs font-semibold">Progresso</span>
              <span className={`text-xs font-bold ${mod.color.text}`}>{mod.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${mod.color.bar} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${mod.progress}%` }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.4 }}
              />
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-stone-400 text-[9px] font-semibold uppercase tracking-wider mb-1">Status</p>
              <p className="text-stone-700 text-sm font-semibold">Em estruturação</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-stone-400 text-[9px] font-semibold uppercase tracking-wider mb-1">Versão</p>
              <p className="text-stone-700 text-sm font-semibold">{mod.version}</p>
            </div>
            <div className={`${mod.color.bg} rounded-xl p-3`}>
              <p className="text-stone-400 text-[9px] font-semibold uppercase tracking-wider mb-1">Publicação</p>
              <p className={`text-sm font-semibold ${mod.color.text}`}>{mod.release}</p>
            </div>
          </div>
        </motion.section>

        {/* ── Divisor visual PNL ── */}
        <div className="flex items-center gap-3 my-1 px-2">
          <div className={`flex-1 h-px ${mod.color.bar} opacity-20`} />
          <span className="text-stone-400 text-[9px] font-bold tracking-[0.4em] uppercase">Escopo</span>
          <div className={`flex-1 h-px ${mod.color.bar} opacity-20`} />
        </div>

        {/* ══ BLOCO 3: ESCOPO DO MÓDULO ══ */}
        <motion.section
          className={`${mod.color.bg} border ${mod.color.border} rounded-2xl p-6 md:p-10`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.3 }}
        >
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-6">
            Escopo do Módulo
          </h3>
          <ul className="space-y-3">
            {mod.scope.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 bg-white/60 rounded-xl px-4 py-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: APPLE_EASE, delay: 0.5 + i * 0.08 }}
              >
                <div className={`w-2 h-2 rounded-full ${mod.color.bar} mt-1.5 shrink-0`} />
                <span className="text-stone-600 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Footer note */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-stone-400 text-xs leading-relaxed max-w-md mx-auto">
            Este módulo faz parte da expansão da Biblioteca Técnica do Projeto Autônomo.
            O conteúdo está sendo desenvolvido com base em fontes validadas e protocolos documentados.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
