import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Heart, Brain, Flame, Wind, BookOpen, TreePine, Compass, ChevronRight, FlaskConical, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import imgHero from '@/assets/cp-hero-conhecimento.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const BLOCOS = [
  {
    num: '01',
    title: 'Contexto Histórico',
    desc: 'Mapeamento documentado da transição entre práticas tradicionais e institucionalização médica moderna. Linha temporal, agentes envolvidos e impactos sistêmicos.',
    icon: BookOpen,
    color: 'emerald',
    link: '/conhecimento-perdido/contexto-historico',
  },
  {
    num: '02',
    title: 'Base Fisiológica',
    desc: 'Organização técnica por sistemas corporais, mecanismos bioquímicos e resposta adaptativa do organismo.',
    icon: Brain,
    color: 'cyan',
    link: '/conhecimento-perdido/base-fisiologica',
  },
  {
    num: '03',
    title: 'Segurança e Limites',
    desc: 'Critérios de uso responsável, contraindicações, interações medicamentosas e parâmetros claros de suspensão.',
    icon: Shield,
    color: 'amber',
    link: '/conhecimento-perdido/seguranca-e-limites',
  },
  {
    num: '04',
    title: 'Aplicação Prática',
    desc: 'Protocolos domésticos estruturados, preparo correto, conservação e uso racional.',
    icon: FlaskConical,
    color: 'green',
    link: '/conhecimento-perdido/aplicacao-pratica',
  },
  {
    num: '05',
    title: 'Continuidade Familiar',
    desc: 'Educação botânica aplicada, identificação segura e construção progressiva de autonomia biológica.',
    icon: Users,
    color: 'purple',
    link: '/conhecimento-perdido/continuidade-familiar',
  },
];

const colorMap: Record<string, { card: string; iconBg: string; icon: string; btn: string; glow: string }> = {
  emerald: {
    card: 'bg-emerald-950/30 border-emerald-700/25 hover:border-emerald-500/50 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] hover:bg-emerald-950/45',
    iconBg: 'bg-emerald-500/15 border border-emerald-500/25',
    icon: 'text-emerald-400',
    btn: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/25',
    glow: 'bg-emerald-400',
  },
  cyan: {
    card: 'bg-cyan-950/30 border-cyan-700/25 hover:border-cyan-500/50 hover:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] hover:bg-cyan-950/45',
    iconBg: 'bg-cyan-500/15 border border-cyan-500/25',
    icon: 'text-cyan-400',
    btn: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500/25',
    glow: 'bg-cyan-400',
  },
  amber: {
    card: 'bg-amber-950/30 border-amber-700/25 hover:border-amber-500/50 hover:shadow-[0_0_50px_-12px_rgba(245,158,11,0.25)] hover:bg-amber-950/45',
    iconBg: 'bg-amber-500/15 border border-amber-500/25',
    icon: 'text-amber-400',
    btn: 'bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/25',
    glow: 'bg-amber-400',
  },
  green: {
    card: 'bg-green-950/30 border-green-700/25 hover:border-green-500/50 hover:shadow-[0_0_50px_-12px_rgba(34,197,94,0.25)] hover:bg-green-950/45',
    iconBg: 'bg-green-500/15 border border-green-500/25',
    icon: 'text-green-400',
    btn: 'bg-green-500/15 text-green-400 border-green-500/25 hover:bg-green-500/25',
    glow: 'bg-green-400',
  },
  purple: {
    card: 'bg-purple-950/30 border-purple-700/25 hover:border-purple-500/50 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)] hover:bg-purple-950/45',
    iconBg: 'bg-purple-500/15 border border-purple-500/25',
    icon: 'text-purple-400',
    btn: 'bg-purple-500/15 text-purple-400 border-purple-500/25 hover:bg-purple-500/25',
    glow: 'bg-purple-400',
  },
};

export default function ConhecimentoPerdido() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      {/* ─── Atmospheric glow ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes cpGlow {
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.06); }
          }
        `}</style>
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,100,50,0.18) 0%, transparent 70%)', animation: 'cpGlow 20s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,120,40,0.10) 0%, transparent 70%)', animation: 'cpGlow 26s ease-in-out 5s infinite' }} />
      </div>

      <Leaf className="fixed top-[15%] right-[6%] text-emerald-900/8 pointer-events-none z-0" size={140} />
      <TreePine className="fixed bottom-[18%] left-[3%] text-emerald-900/6 pointer-events-none z-0" size={160} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap">
          <Link to="/" className="text-stone-600 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo" className="text-stone-600 hover:text-emerald-400 transition-colors">Projeto Autônomo</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Conhecimento Perdido</span>
        </nav>

        {/* ═══════════════════════════════════════════════════
            HERO — CONHECIMENTO PERDIDO
        ═══════════════════════════════════════════════════ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src={imgHero} alt="Conhecimento Perdido" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-10">
              <span className="text-emerald-400/60 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 04 · Núcleo Biológico</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide uppercase leading-[0.95] mt-2 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                CONHECIMENTO<br /><span className="text-emerald-400">PERDIDO</span>
              </h1>
            </div>
          </div>

          <div className="max-w-3xl space-y-5">
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Este não é um guia genérico de "chás que fazem bem". É o <span className="text-emerald-400 font-semibold">núcleo biológico</span> do Projeto Autônomo — a base que sustenta toda decisão de saúde quando sistemas formais não estão disponíveis, são insuficientes ou simplesmente falharam.
            </p>
            <p className="text-stone-400 text-base leading-relaxed">
              Aqui, cada planta é tratada como ferramenta técnica: com compostos bioativos identificados, mecanismo de ação documentado, dosagem segura, contraindicações reais e limites de uso. Nada de misticismo. Nada de promessa vaga. Bioquímica aplicada com responsabilidade.
            </p>
            <div className="border-l-2 border-emerald-500/40 pl-6 py-2">
              <p className="text-emerald-300/80 text-base font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "A diferença entre quem sabe e quem acha que sabe é a profundidade do que documenta — e a honestidade do que admite não saber."
              </p>
            </div>
          </div>
        </motion.header>

        {/* ═══════════════════════════════════════════════════
            MAPA DE SISTEMAS FISIOLÓGICOS
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-gradient-to-br from-[#0f1a0f]/80 to-[#111f11]/60 border border-emerald-700/30 rounded-2xl p-6 md:p-10 shadow-[0_0_60px_-15px_rgba(16,185,129,0.12)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25">
                <Compass className="text-emerald-400" size={18} />
              </div>
              <h3 className="text-base font-extrabold text-emerald-300 uppercase tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}>
                Mapa de Sistemas Fisiológicos
              </h3>
            </div>
            <p className="text-stone-400 text-sm mb-8 max-w-2xl leading-relaxed">
              5 sistemas do corpo. 12 plantas documentadas. Cada uma atua em vias bioquímicas específicas — não em "energia" ou "equilíbrio".
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Flame, label: 'Digestivo', plantas: 'Boldo · Hortelã · Espinheira-santa', color: 'green' },
                { icon: Wind, label: 'Respiratório', plantas: 'Guaco · Eucalipto · Capim-limão', color: 'cyan' },
                { icon: Brain, label: 'Nervoso', plantas: 'Camomila · Mulungu', color: 'purple' },
                { icon: Shield, label: 'Imune', plantas: 'Alho · Gengibre', color: 'amber' },
                { icon: Heart, label: 'Muscular', plantas: 'Arnica · Babosa', color: 'orange' },
              ].map((s, i) => {
                const styles: Record<string, { card: string; icon: string; glow: string }> = {
                  green: { card: 'bg-green-500/10 border-green-500/25 hover:border-green-400/50 hover:bg-green-500/15 hover:shadow-[0_0_30px_-8px_rgba(34,197,94,0.25)]', icon: 'text-green-400', glow: 'bg-green-400' },
                  cyan: { card: 'bg-cyan-500/10 border-cyan-500/25 hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.25)]', icon: 'text-cyan-400', glow: 'bg-cyan-400' },
                  purple: { card: 'bg-purple-500/10 border-purple-500/25 hover:border-purple-400/50 hover:bg-purple-500/15 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.25)]', icon: 'text-purple-400', glow: 'bg-purple-400' },
                  amber: { card: 'bg-amber-500/10 border-amber-500/25 hover:border-amber-400/50 hover:bg-amber-500/15 hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.25)]', icon: 'text-amber-400', glow: 'bg-amber-400' },
                  orange: { card: 'bg-orange-500/10 border-orange-500/25 hover:border-orange-400/50 hover:bg-orange-500/15 hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.25)]', icon: 'text-orange-400', glow: 'bg-orange-400' },
                };
                const st = styles[s.color];
                return (
                  <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className={`rounded-xl p-5 border transition-all duration-500 cursor-default group ${st.card}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <s.icon className={`${st.icon} group-hover:scale-110 transition-transform duration-300`} size={20} />
                      <div className={`w-1.5 h-1.5 rounded-full ${st.glow} opacity-60 animate-pulse`} />
                    </div>
                    <p className="text-stone-200 text-sm font-bold mb-1.5">{s.label}</p>
                    <p className="text-stone-500 text-[11px] leading-relaxed">{s.plantas}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            GRID DE 5 BLOCOS — ECOSSISTEMA MODULAR
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Ecossistema</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-4 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            BLOCOS DE <span className="text-emerald-400">PROFUNDIDADE</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-12">
            Cada bloco é uma rota independente com conteúdo próprio, SEO próprio e possibilidade de expansão ilimitada.
            Navegue pelo que precisa. Aprofunde no que importa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOCOS.map((bloco, i) => {
              const cm = colorMap[bloco.color];
              return (
                <motion.div key={bloco.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Link to={bloco.link}
                    className={`block border rounded-2xl p-7 md:p-8 transition-all duration-500 group h-full ${cm.card}`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl ${cm.iconBg}`}>
                        <bloco.icon className={`${cm.icon} group-hover:scale-110 transition-transform duration-300`} size={20} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${cm.glow} opacity-50 animate-pulse`} />
                        <span className={`${cm.icon} text-[9px] font-bold tracking-[0.4em] uppercase opacity-60`}>Bloco {bloco.num}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-stone-200 mb-3 group-hover:text-white transition-colors">
                      {bloco.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 group-hover:text-stone-400 transition-colors">
                      {bloco.desc}
                    </p>

                    <div className={`inline-flex items-center gap-2 border rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${cm.btn}`}>
                      Acessar <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PUBLICAÇÃO EM PRODUÇÃO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-700/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a0f] via-[#111f11] to-[#0a150a]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
                  <div>
                    <span className="text-emerald-500/60 text-[9px] font-bold tracking-[0.5em] uppercase">Publicação independente</span>
                    <p className="text-stone-200 text-lg font-bold mt-0.5">Material em produção</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[9px] font-bold tracking-widest uppercase">Em progresso</span>
                </div>
              </div>

              <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                O que existe hoje neste módulo é o núcleo inicial. A publicação final vai além — cobrindo dezenas de plantas organizadas por bioma, 
                centenas de fichas técnicas com profundidade farmacológica, protocolos sazonais regionalizados, 
                guias completos de formação familiar e exercícios práticos de campo.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed max-w-2xl mb-8">
                Um material denso, técnico e independente — construído para funcionar mesmo sem internet, sem app e sem plataforma.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {[
                  { label: 'Fichas técnicas expandidas', value: 'Catálogo completo por bioma' },
                  { label: 'Protocolos sazonais', value: 'Regionalização por clima' },
                  { label: 'Matriz de decisão clínica', value: 'Sintoma → planta → preparo' },
                  { label: 'Formação familiar completa', value: 'Exercícios de campo e identificação' },
                  { label: 'Farmacologia aplicada', value: 'Mecanismos, vias e compostos' },
                  { label: 'Guia de cultivo medicinal', value: 'Da semente à colheita correta' },
                ].map(item => (
                  <div key={item.label} className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3.5 hover:bg-emerald-500/10 transition-colors">
                    <p className="text-stone-200 text-xs font-semibold">{item.label}</p>
                    <p className="text-stone-500 text-[10px] mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-emerald-800/20">
                <Leaf size={14} className="text-emerald-500/50" />
                <p className="text-stone-600 text-xs leading-relaxed">
                  O título e formato final serão divulgados quando o material estiver pronto para publicação.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            INTEGRAÇÃO — LINKS BIDIRECIONAIS
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-gradient-to-br from-emerald-950/50 to-[#0a0d08]/80 border border-emerald-800/20 rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">Núcleo biológico do protocolo</h2>
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                Este bloco se conecta com todos os módulos do Projeto Autônomo. <span className="text-emerald-400 font-semibold">Sem corpo saudável, não há autonomia real.</span>
              </p>

              {/* ─── Link bidirecional: Sabedoria Ancestral ─── */}
              <Link to="/projeto-autonomo/sabedoria-ancestral"
                className="flex items-center justify-between bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-5 hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-emerald-500/15 rounded-xl">
                    <Leaf size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-emerald-300 text-sm font-bold">Sabedoria Ancestral</p>
                    <p className="text-stone-500 text-xs mt-0.5">Hub de saúde natural, soberania alimentar e módulos práticos</p>
                  </div>
                </div>
                <ChevronRight className="text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" size={18} />
              </Link>

              {/* ─── Conexão direta com Saúde Preventiva ─── */}
              <Link to="/projeto-autonomo/saude-preventiva"
                className="flex items-center justify-between bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-5 hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-emerald-500/15 rounded-xl">
                    <Heart size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-emerald-300 text-sm font-bold">Saúde Preventiva</p>
                    <p className="text-stone-500 text-xs mt-0.5">Protocolos de rotina para manter o corpo funcionando antes de precisar de qualquer planta</p>
                  </div>
                </div>
                <ChevronRight className="text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" size={18} />
              </Link>

              <div className="mt-4">
                <Link to="/projeto-autonomo" className="btn-secondary text-center inline-block">
                  ← Projeto Autônomo
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── Disclaimer ─── */}
        <div className="text-center">
          <p className="text-stone-600 text-[10px] font-mono tracking-widest uppercase">
            Conteúdo educativo · Não substitui orientação médica profissional
          </p>
        </div>
      </div>
    </div>
  );
}
