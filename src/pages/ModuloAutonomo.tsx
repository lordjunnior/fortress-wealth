import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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
    description: 'Montagem completa do kit de autonomia mínima para os primeiros três dias após uma interrupção grave. Inclui checklist validado, priorização por peso e volume, e adaptações para diferentes perfis familiares.',
    scope: ['Checklist completo de itens essenciais', 'Protocolo de montagem por prioridade', 'Variações por clima e região', 'Lista de fornecedores acessíveis'],
    progress: 45, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'protocolos-apagao': {
    title: 'Protocolos de Apagão',
    phase: '01', phaseLabel: 'Base 72',
    icon: Flame,
    description: 'Procedimentos técnicos para manter iluminação, cozimento e aquecimento quando a rede elétrica está indisponível. Alternativas testadas com materiais acessíveis.',
    scope: ['Fontes alternativas de iluminação', 'Métodos de cozimento sem eletricidade', 'Aquecimento seguro em ambientes fechados', 'Gestão de combustível reserva'],
    progress: 30, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'purificacao-agua': {
    title: 'Purificação de Água',
    phase: '01', phaseLabel: 'Base 72',
    icon: Droplets,
    description: 'Três métodos validados por defesa civil para tornar água potável em situações de emergência. Fervura, cloração e filtros improvisados com materiais domésticos.',
    scope: ['Protocolo de fervura e tempos mínimos', 'Dosagem de hipoclorito por volume', 'Construção de filtro com areia e carvão', 'Indicadores visuais de potabilidade'],
    progress: 55, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'abrigo-emergencia': {
    title: 'Abrigo de Emergência',
    phase: '01', phaseLabel: 'Base 72',
    icon: Tent,
    description: 'Proteção térmica e estrutural com materiais acessíveis. Técnicas de improviso para diferentes cenários climáticos e geográficos.',
    scope: ['Abrigos temporários com lonas e cordas', 'Isolamento térmico improvisado', 'Proteção contra chuva e vento', 'Critérios de escolha de local'],
    progress: 20, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'comunicacao-offline': {
    title: 'Comunicação sem Internet',
    phase: '01', phaseLabel: 'Base 72',
    icon: Siren,
    description: 'Protocolos de comunicação familiar e comunitária quando infraestrutura digital está indisponível. Rádio, sinais visuais e pontos de encontro.',
    scope: ['Frequências de rádio AM/FM de emergência', 'Sinais visuais padronizados', 'Protocolo de ponto de encontro familiar', 'Comunicação por rádio amador básico'],
    progress: 25, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },
  'navegacao-primaria': {
    title: 'Navegação Primária',
    phase: '01', phaseLabel: 'Base 72',
    icon: Wind,
    description: 'Orientação sem dependência digital. Bússola, referências solares, leitura de terreno e técnicas de navegação terrestre.',
    scope: ['Uso de bússola analógica', 'Orientação por posição solar', 'Leitura de relevo e vegetação', 'Marcação de trilhas e rotas de fuga'],
    progress: 15, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', accent: 'text-rose-500', bar: 'bg-rose-500', iconBg: 'bg-rose-100' },
  },

  // PHASE 2 — AUTONOMIA BIOLÓGICA
  'suporte-fitoterapico': {
    title: 'Suporte Fitoterápico',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Leaf,
    description: 'Camomila, boldo, arnica, babosa. Uso tradicional documentado como complemento ao cuidado de saúde. Referências de dosagem e contraindicações.',
    scope: ['Fichas técnicas de 12 plantas essenciais', 'Dosagens referenciadas por fontes confiáveis', 'Contraindicações e interações', 'Métodos de preparo e conservação'],
    progress: 40, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'primeiros-socorros': {
    title: 'Primeiros Socorros',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Cross,
    description: 'Contenção de sangramento, imobilização, tratamento de queimaduras. Protocolos validados para ambientes com recursos limitados.',
    scope: ['Protocolo ABCDE de avaliação', 'Técnicas de hemostasia', 'Imobilização com materiais improvisados', 'Kit mínimo de primeiros socorros'],
    progress: 50, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'sinais-vitais': {
    title: 'Avaliação Básica de Sinais',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Thermometer,
    description: 'Interpretar febre, desidratação e sinais vitais com recursos mínimos. Referências numéricas e critérios de decisão.',
    scope: ['Faixas normais de temperatura e pulso', 'Sinais de desidratação por grau', 'Quando buscar atendimento profissional', 'Registro simplificado de evolução'],
    progress: 35, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'saude-preventiva': {
    title: 'Saúde Preventiva',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Sun,
    description: 'Exposição solar, qualidade do sono, movimento e alimentação consciente como pilares da base preventiva de saúde.',
    scope: ['Protocolo de exposição solar segura', 'Higiene do sono em ambientes adversos', 'Exercícios sem equipamento', 'Princípios de alimentação anti-inflamatória'],
    progress: 30, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'fitoterapia-aplicada': {
    title: 'Fitoterapia Aplicada',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Sprout,
    description: 'Tinturas, cataplasmas e infusões com dosagem referenciada. Uso como complemento, não substituição de tratamento convencional.',
    scope: ['Preparação de tinturas hidroalcoólicas', 'Cataplasmas para uso tópico', 'Infusões terapêuticas documentadas', 'Armazenamento e validade'],
    progress: 20, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },
  'controle-vetores': {
    title: 'Controle de Vetores',
    phase: '02', phaseLabel: 'Autonomia Biológica',
    icon: Bug,
    description: 'Repelentes naturais, manejo de água parada e proteção contra vetores com métodos de baixo impacto ambiental.',
    scope: ['Repelentes naturais eficazes', 'Eliminação de criadouros', 'Proteção física de ambientes', 'Plantas repelentes para cultivo'],
    progress: 15, version: '1.0', release: 'Q3 2026',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'text-emerald-500', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100' },
  },

  // PHASE 3 — SOBERANIA ALIMENTAR
  'horta-urbana': {
    title: 'Horta Urbana',
    phase: '03', phaseLabel: 'Soberania Alimentar',
    icon: Sprout,
    description: 'Varandas, janelas e telhados. Espaço mínimo, colheita consistente. Guia prático de cultivo em ambientes urbanos reduzidos.',
    scope: ['Vasos autoirrigáveis DIY', 'Cultivo vertical em espaços mínimos', 'Calendário de plantio por região', 'Espécies ideais para iniciantes'],
    progress: 60, version: '1.0', release: 'Q2 2026',
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
    progress: 30, version: '1.0', release: 'Q2 2026',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600', bar: 'bg-amber-500', iconBg: 'bg-amber-100' },
  },
};

export default function ModuloAutonomo() {
  const { slug } = useParams<{ slug: string }>();
  
  // Redirect to dedicated pages for published modules
  if (slug === 'conservacao-armazenamento') {
    return <Navigate to="/projeto-autonomo/conservacao-armazenamento" replace />;
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

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-200">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-32">

        {/* Back */}
        <Link
          to="/projeto-autonomo"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-16"
        >
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* Phase tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: APPLE_EASE }}
        >
          <span className={`text-[10px] font-bold tracking-[0.5em] uppercase ${mod.color.accent} opacity-70`}>
            Fase {mod.phase} · {mod.phaseLabel}
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mt-4 mb-10 flex items-start gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.1 }}
        >
          <div className={`p-4 ${mod.color.iconBg} rounded-2xl shrink-0 mt-1`}>
            <Icon className={mod.color.text} size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-800 leading-tight">
              {mod.title}
            </h1>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed mt-3 max-w-xl">
              {mod.description}
            </p>
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          className={`${mod.color.bg} border ${mod.color.border} rounded-2xl p-8 md:p-10 mb-10`}
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
            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${mod.color.bar} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${mod.progress}%` }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.4 }}
              />
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-stone-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Status</p>
              <p className="text-stone-700 text-sm font-semibold">Em estruturação</p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Versão Planejada</p>
              <p className="text-stone-700 text-sm font-semibold">{mod.version}</p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Publicação Prevista</p>
              <p className={`text-sm font-semibold ${mod.color.text}`}>{mod.release}</p>
            </div>
          </div>
        </motion.div>

        {/* Scope */}
        <motion.div
          className="bg-white border border-stone-200 rounded-2xl p-8 md:p-10"
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
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: APPLE_EASE, delay: 0.5 + i * 0.08 }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${mod.color.bar} mt-1.5 shrink-0`} />
                <span className="text-stone-600 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

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
