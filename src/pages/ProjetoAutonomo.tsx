import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Tent, Siren, Cross, Egg, TreePine, Layers, Thermometer, Bug, Shovel } from 'lucide-react';
import { motion } from 'framer-motion';

import imgSoberaniaAlimentar from '@/assets/fase03-soberania-alimentar.jpg';

/* ─── SEO: meta keywords target ───
   projeto autônomo, base 72 horas, autonomia biológica, soberania alimentar,
   sobrevivência urbana, horta urbana, plantas medicinais, primeiros socorros,
   autossuficiência alimentar, kit emergência 72h, preparação desastres brasil,
   conservação alimentos, proteína sustentável, fitoterapia, gestão de risco pessoal
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ─── PHASE 1: BASE 72 ─── */
const BASE72_ITEMS = [
  { icon: Package, label: 'Kit Tático 72h', desc: 'Água, alimento, documentos, rádio e medicamentos para autonomia mínima de 3 dias.', slug: 'kit-72h' },
  { icon: Flame, label: 'Protocolos de Apagão', desc: 'Iluminação, cozimento e aquecimento alternativos quando a rede elétrica está indisponível.', slug: 'protocolos-apagao' },
  { icon: Droplets, label: 'Purificação de Água', desc: 'Fervura, cloração, filtros improvisados. Três métodos validados por defesa civil.', slug: 'purificacao-agua' },
  { icon: Tent, label: 'Abrigo de Emergência', desc: 'Proteção térmica e estrutural com materiais acessíveis em diferentes cenários.', slug: 'abrigo-emergencia' },
  { icon: Siren, label: 'Comunicação sem Internet', desc: 'Rádio AM/FM, sinais visuais e protocolos de ponto de encontro familiar.', slug: 'comunicacao-offline' },
  { icon: Wind, label: 'Navegação Primária', desc: 'Bússola, referências solares e leitura de terreno. Orientação sem dependência digital.', slug: 'navegacao-primaria' },
];

/* ─── PHASE 2: AUTONOMIA BIOLÓGICA ─── */
const BIO_ITEMS = [
  { icon: Leaf, label: 'Suporte Fitoterápico', desc: 'Biblioteca técnica de 12 plantas essenciais. Dosagens conservadoras, contraindicações e métodos de preparo.', slug: 'autonomia-biologica' },
  { icon: Cross, label: 'Primeiros Socorros', desc: 'Contenção de sangramento, imobilização, tratamento de queimaduras em ambiente remoto.', slug: 'primeiros-socorros' },
  { icon: Thermometer, label: 'Avaliação Básica de Sinais', desc: 'Interpretar febre, desidratação e sinais vitais com recursos mínimos.', slug: 'sinais-vitais' },
  { icon: Sun, label: 'Saúde Preventiva', desc: 'Exposição solar, qualidade do sono, movimento e alimentação consciente como base preventiva.', slug: 'saude-preventiva' },
  { icon: Sprout, label: 'Fitoterapia Aplicada', desc: 'Protocolos terapêuticos por sistema corporal. Sinergia entre plantas, ciclos de uso e critérios de interrupção.', slug: 'fitoterapia-aplicada' },
  { icon: Bug, label: 'Controle de Vetores', desc: 'Repelentes naturais, manejo de água parada e proteção com métodos de baixo impacto.', slug: 'controle-vetores' },
];

/* ─── PHASE 3: SOBERANIA ALIMENTAR — SUBCAMADAS ─── */
const ALIMENTAR_LAYERS = [
  {
    icon: Sprout,
    title: 'Horta Urbana',
    desc: 'Varandas, janelas e telhados. Espaço mínimo, colheita consistente.',
    details: 'Vasos autoirrigáveis, cultivo vertical, hidroponia caseira e aproveitamento de recipientes reciclados.',
    slug: 'horta-urbana',
  },
  {
    icon: Layers,
    title: 'Produção em Pequenos Espaços',
    desc: 'Planejamento correto transforma 4m² em fonte de alimento.',
    details: 'Consórcio de culturas, rotação de canteiros e aproveitamento de microclimas urbanos.',
    slug: 'producao-pequenos-espacos',
  },
  {
    icon: Flame,
    title: 'Conservação e Armazenamento',
    desc: 'Defumação, salga, fermentação, desidratação. Técnicas milenares validadas.',
    details: 'Compotas, conservas em vinagre, secagem solar e fermentação lactobacilar.',
    slug: 'conservacao-armazenamento',
  },
  {
    icon: Egg,
    title: 'Proteína Sustentável',
    desc: 'Galinhas, codornas, peixes e sistemas compactos de produção animal.',
    details: 'Aquaponia, galinheiro móvel e criação de tilápia em espaços reduzidos.',
    slug: 'proteina-sustentavel',
  },
  {
    icon: Shovel,
    title: 'Solo e Fertilidade',
    desc: 'Compostagem, bokashi, húmus de minhoca. Terra viva gera alimento vivo.',
    details: 'Análise caseira de pH, cobertura morta, adubação verde e rotação de nutrientes.',
    slug: 'solo-fertilidade',
  },
];

/* ─── Seed Progression Component ─── */
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
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center
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

export default function ProjetoAutonomo() {
  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-emerald-300/50 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ebe5d8 0%, #ddd5c3 12%, #d2dcc4 30%, #c4d4ae 50%, #b8c9a0 70%, #cdd5bd 90%, #e0dace 100%)' }}
    >

      {/* Living background — subtle animated gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes gradientShift {
            0%, 100% { opacity: 0.25; transform: translate(0, 0); }
            50% { opacity: 0.35; transform: translate(-20px, 10px); }
          }
          @keyframes breatheSlow {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.06; }
            50% { transform: translateY(-15px) scale(1.02); opacity: 0.1; }
          }
          @keyframes swayGentle {
            0%, 100% { transform: translateX(0) rotate(-1deg); opacity: 0.05; }
            50% { transform: translateX(10px) rotate(1deg); opacity: 0.09; }
          }
        `}</style>
        
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,225,140,0.3) 0%, transparent 65%)', animation: 'gradientShift 20s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,200,110,0.25) 0%, transparent 65%)', animation: 'gradientShift 25s ease-in-out 3s infinite' }} />
        <div className="absolute top-[45%] right-[15%] w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,115,85,0.15) 0%, transparent 65%)', animation: 'gradientShift 22s ease-in-out 6s infinite' }} />
      </div>

      {/* Floating organic icons — very subtle */}
      <Leaf className="fixed top-[18%] left-[6%] text-emerald-700 pointer-events-none z-0" size={80}
        style={{ animation: 'breatheSlow 14s ease-in-out infinite' }} />
      <TreePine className="fixed bottom-[12%] right-[4%] text-emerald-800 pointer-events-none z-0" size={110}
        style={{ animation: 'swayGentle 20s ease-in-out infinite' }} />
      <Wheat className="fixed top-[60%] left-[80%] text-amber-700 pointer-events-none z-0" size={70}
        style={{ animation: 'breatheSlow 18s ease-in-out 4s infinite' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28">

        <Link to="/arsenal" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 mb-20 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300">
          <ArrowLeft size={14} /> Voltar ao Arsenal
        </Link>

        {/* ═══════════════ HEADER ═══════════════ */}
        <motion.header
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="mb-24"
        >
          <div className="flex items-start gap-5 mb-10">
            <div className="p-4 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl mt-1">
              <Shield className="text-emerald-700" size={28} />
            </div>
            <div>
              <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-3">Engenharia de Resiliencia Pessoal</p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-stone-800" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                PROJETO<br /><span className="text-emerald-700">AUTONOMO</span>
              </h1>
            </div>
          </div>
          <p className="text-stone-500 text-base md:text-lg max-w-3xl leading-relaxed">
            Autonomia verdadeira nao e fuga do sistema.
            E <span className="text-emerald-700 font-semibold">reducao inteligente de dependencia</span> dentro dele.
          </p>
          <p className="text-stone-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Tres fases. Uma progressao logica. Gestao de risco pessoal com base em protocolos reais.
          </p>
        </motion.header>

        {/* ═══════════════ PROGRESSION MAP ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28">
          {[
            { num: '01', title: 'Base 72', sub: 'Sobreviver', colorText: 'text-rose-600', colorBg: 'bg-rose-50/70', colorBorder: 'border-rose-200/60', colorHover: 'hover:border-rose-300 hover:shadow-rose-100/40', desc: 'Autonomia mínima nas primeiras 72 horas de qualquer interrupcao.' },
            { num: '02', title: 'Autonomia Biologica', sub: 'Fortalecer', colorText: 'text-emerald-600', colorBg: 'bg-emerald-50/70', colorBorder: 'border-emerald-200/60', colorHover: 'hover:border-emerald-300 hover:shadow-emerald-100/40', desc: 'Fortalecer o corpo como primeira linha de protecao. Complemento ao sistema de saude.' },
            { num: '03', title: 'Soberania Alimentar', sub: 'Produzir', colorText: 'text-amber-600', colorBg: 'bg-amber-50/70', colorBorder: 'border-amber-200/60', colorHover: 'hover:border-amber-300 hover:shadow-amber-100/40', desc: 'Capacidade real de produzir parte do proprio sustento.' },
          ].map((phase, i) => (
            <motion.a
              key={phase.num}
              href={`#fase-${phase.num}`}
              initial="hidden" animate="visible" variants={fadeUp} custom={i + 1}
              className={`${phase.colorBg} ${phase.colorBorder} ${phase.colorHover} border p-8 md:p-10 rounded-2xl backdrop-blur-sm transition-all duration-300 group cursor-pointer hover:shadow-lg hover:scale-[1.02]`}
            >
              <span className={`${phase.colorText} text-[10px] font-bold tracking-[0.4em] uppercase opacity-70`}>Fase {phase.num}</span>
              <h3 className="text-xl font-bold tracking-tight mt-3 mb-1 text-stone-800">{phase.title}</h3>
              <p className={`${phase.colorText} text-xs font-semibold uppercase tracking-widest mb-4`}>{phase.sub}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{phase.desc}</p>
              <ArrowRight className={`${phase.colorText} mt-5 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-1`} size={16} />
            </motion.a>
          ))}
        </div>

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
              <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Gestao de risco — base tecnica</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed text-stone-500">
                <p><span className="text-stone-700 font-semibold">Quem produz parte do que consome</span> reduz exposicao a rupturas de abastecimento.</p>
                <p><span className="text-stone-700 font-semibold">Quem entende a cadeia alimentar</span> interpreta melhor preco, escassez e qualidade.</p>
                <p><span className="text-stone-700 font-semibold">Quem domina tecnicas basicas de cultivo</span> amplia sua margem de seguranca.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════ FASE 01 — BASE 72 ═══════════════ */}
        <motion.section
          id="fase-01" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
        >
          <div className="bg-rose-50/50 border border-rose-200/50 p-10 md:p-14 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <Clock className="absolute top-8 right-8 text-rose-200/20" size={160} />
            <div className="relative z-10">
              <span className="text-rose-500 text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">Fase 01</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight mt-2 text-stone-800">
                Base <span className="text-rose-600">72</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                A referencia vem da regra das 72 horas usada em protocolos de defesa civil.
                Apos uma interrupcao grave, os primeiros tres dias exigem autonomia minima.
                Essa preparacao e baseada em dados historicos de resposta a desastres.
              </p>
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                Preparacao minima. Autonomia imediata. Protocolo objetivo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BASE72_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                  >
                    <Link
                      to={`/projeto-autonomo/${item.slug}`}
                      className="block bg-white/50 border border-rose-100/60 p-6 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-rose-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-rose-100/60 rounded-xl shrink-0">
                          <item.icon className="text-rose-500" size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1.5 text-stone-700">{item.label}</h4>
                          <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-rose-100/30 border border-rose-200/30 rounded-xl">
                <p className="text-rose-600/80 text-sm font-medium">
                  A preparacao antecipa a necessidade. Ter um kit basico reduz a dependencia de resposta externa nas primeiras horas.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════ FASE 02 — AUTONOMIA BIOLÓGICA ═══════════════ */}
        <motion.section
          id="fase-02" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
        >
          <div className="bg-emerald-50/50 border border-emerald-200/50 p-10 md:p-14 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <Heart className="absolute top-8 right-8 text-emerald-200/20" size={160} />
            <div className="relative z-10">
              <span className="text-emerald-500 text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">Fase 02</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight mt-2 text-stone-800">
                Autonomia<br /><span className="text-emerald-600">Biologica</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                Fortalecer o corpo e a base da resiliencia. Conhecimento tradicional de cuidado
                complementa o sistema de saude e amplia a capacidade de resposta em cenarios adversos.
              </p>
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                Base preventiva. Suporte tradicional. Complemento ao cuidado convencional.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIO_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                  >
                    <Link
                      to={`/projeto-autonomo/${item.slug}`}
                      className="block bg-white/50 border border-emerald-100/60 p-6 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-emerald-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-emerald-100/60 rounded-xl shrink-0">
                          <item.icon className="text-emerald-500" size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1.5 text-stone-700">{item.label}</h4>
                          <p className="text-stone-400 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* ─── CTA Hub Sabedoria Ancestral ─── */}
              <Link to="/projeto-autonomo/sabedoria-ancestral"
                className="mt-10 block bg-gradient-to-r from-emerald-100/50 to-emerald-50/60 border border-emerald-300/50 rounded-xl p-6 hover:border-emerald-400 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-200/50 rounded-xl">
                      <Leaf className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <p className="text-emerald-700 text-sm font-bold">Sabedoria Ancestral</p>
                      <p className="text-stone-500 text-xs mt-0.5">Hub completo: plantas medicinais, saúde natural e soberania alimentar</p>
                    </div>
                  </div>
                  <ArrowRight className="text-emerald-400 group-hover:translate-x-1 transition-transform" size={18} />
                </div>
              </Link>

              <div className="mt-4 p-6 bg-emerald-100/30 border border-emerald-200/30 rounded-xl">
                <p className="text-emerald-600/80 text-sm font-medium">
                  Conhecer plantas medicinais, primeiros socorros e habitos preventivos amplia autonomia sem substituir acompanhamento profissional.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════ FASE 03 — SOBERANIA ALIMENTAR ═══════════════ */}
        <motion.section
          id="fase-03" className="mb-28 scroll-mt-32"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
        >
          <div className="border border-amber-200/50 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            {/* Hero image band — top portion only with fade */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <img src={imgSoberaniaAlimentar} alt="Soberania Alimentar" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-50/100" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20" />
              {/* Title overlay on image */}
              <div className="absolute bottom-6 left-8 md:left-14 z-10">
                <span className="text-amber-300 text-[10px] font-bold tracking-[0.4em] uppercase drop-shadow-lg">Fase 03</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mt-1 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  Soberania<br /><span className="text-amber-300">Alimentar</span>
                </h2>
              </div>
              <Wheat className="absolute top-6 right-6 text-white/10" size={120} />
            </div>

            {/* Content area — clean background */}
            <div className="bg-amber-50/80 p-10 md:p-14 relative">
            <div className="relative z-10">
              <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                Dependencia total da cadeia industrial aumenta vulnerabilidade.
                Produzir parte do proprio alimento reduz exposicao e aumenta qualidade nutricional.
              </p>
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-12">
                De narrativa reativa para arquitetura produtiva.
              </p>

              {/* Seed Progression */}
              <SeedProgression />

              {/* SUBCAMADAS */}
              <div className="space-y-4 mb-10">
                {ALIMENTAR_LAYERS.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                  >
                    <Link
                      to={`/projeto-autonomo/${layer.slug}`}
                      className="block bg-white/50 border border-amber-100/60 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-amber-200 hover:scale-[1.01] transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center gap-4 p-6 md:w-80 shrink-0 bg-amber-50/50 border-b md:border-b-0 md:border-r border-amber-100/40">
                          <span className="text-amber-300/50 text-2xl font-bold">0{i + 1}</span>
                          <div className="p-2 bg-amber-100/50 rounded-xl">
                            <layer.icon className="text-amber-600 shrink-0" size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-stone-700">{layer.title}</h4>
                            <p className="text-amber-500/60 text-[10px] font-medium mt-0.5">{layer.desc}</p>
                          </div>
                        </div>
                        <div className="p-6 flex items-center">
                          <p className="text-stone-400 text-sm leading-relaxed">{layer.details}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-amber-100/30 border border-amber-200/30 rounded-xl">
                <p className="text-amber-700/80 text-sm font-medium">
                  Comece com um vaso. Depois um canteiro. Depois um sistema.
                  Cada etapa reduz uma camada de dependencia.
                </p>
            </div>
            </div>
          </div>
          </div>
        </motion.section>

        {/* ═══════════════ STATUS PANEL ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          {[
            { phase: 'Base 72', color: 'border-rose-200 text-rose-600', bg: 'bg-rose-50/50' },
            { phase: 'Autonomia Biologica', color: 'border-emerald-200 text-emerald-600', bg: 'bg-emerald-50/50' },
            { phase: 'Soberania Alimentar', color: 'border-amber-200 text-amber-600', bg: 'bg-amber-50/50' },
          ].map((s) => (
            <div key={s.phase} className={`border ${s.color} ${s.bg} p-6 text-center rounded-xl backdrop-blur-sm`}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-1">{s.phase}</p>
              <p className="text-stone-400 text-[10px] font-medium">Em construcao — guias e materiais em breve</p>
            </div>
          ))}
        </div>

        {/* ═══════════════ CTA FINAL ═══════════════ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-center mb-24"
        >
          <p className="text-stone-400 text-xs font-medium uppercase tracking-[0.4em] mb-8">Reducao inteligente de dependencia</p>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-snug mb-3 text-stone-700">
            Autonomia nao e fuga do sistema.
          </h3>
          <p className="text-xl md:text-3xl font-bold tracking-tight text-emerald-600 mb-12">
            E gestao de risco pessoal.
          </p>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-4 font-semibold text-sm tracking-wide rounded-xl hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200/30 transition-all duration-300"
          >
            <Shield size={18} /> Voltar ao centro de operacoes
          </Link>
        </motion.div>

        {/* FOOTER SEAL */}
        <div className="pt-16 border-t border-stone-300/30 text-right">
          <p className="text-stone-400 font-medium text-base tracking-tight opacity-40">Quem planta, nao implora.</p>
        </div>
      </div>
    </div>
  );
}
