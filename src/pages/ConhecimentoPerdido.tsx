import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Shield, Heart, Brain, Flame, Wind, Sun, BookOpen, Eye, Sprout, Activity, XCircle, CheckCircle2, Users, PenTool, FlaskConical, Package, TreePine, AlertTriangle, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import imgHero from '@/assets/cp-hero-conhecimento.jpg';
import imgSistemas from '@/assets/cp-sistemas-corpo.jpg';
import imgPlantas from '@/assets/cp-plantas-pratica.jpg';

import { DIGESTIVO, RESPIRATORIO, NERVOSO, IMUNE, MUSCULAR } from '@/components/conhecimento-perdido/PlantData';
import { SistemaSection } from '@/components/conhecimento-perdido/SistemaSection';
import { CriteriosUso } from '@/components/conhecimento-perdido/CriteriosUso';
import { MatrizComparativa } from '@/components/conhecimento-perdido/MatrizComparativa';
import { EducacaoBotanica } from '@/components/conhecimento-perdido/EducacaoBotanica';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const sidebarItems = [
  { id: 'intro', label: 'Introdução' },
  { id: 'criterios', label: 'Critérios de Uso' },
  { id: 'parte-01', label: '01 · O que nos foi esquecido' },
  { id: 'parte-02', label: '02 · Base natural do corpo' },
  { id: 'parte-03', label: '03 · Plantas na prática' },
  { id: 'matriz', label: 'Matriz Comparativa' },
  { id: 'parte-04', label: '04 · Manual Aplicado' },
  { id: 'parte-05', label: '05 · Educação Familiar' },
  { id: 'integracao', label: 'Integração' },
];

export default function ConhecimentoPerdido() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sidebarItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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

      {/* ─── FIXED SIDEBAR INDEX (desktop only) ─── */}
      <nav className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1.5">
        {sidebarItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 max-w-[180px] truncate ${
              activeSection === item.id
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-white/3 border-white/5 text-stone-600 hover:text-stone-400 hover:border-white/10'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── NAV ─── */}
        <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-600 hover:text-emerald-400 mb-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300">
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ═══════════════════════════════════════════════════
            HERO — CONHECIMENTO PERDIDO
        ═══════════════════════════════════════════════════ */}
        <motion.header id="intro" initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-10">
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

          {/* ─── POSICIONAMENTO FORTE ─── */}
          <div className="max-w-3xl space-y-5 mb-10">
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

          {/* ─── MAPA VISUAL DOS SISTEMAS ─── */}
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

          <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mt-10">
            Fundamentos naturais aplicados à saúde, alimentação e resiliência
          </p>
        </motion.header>

        {/* ═══════════════════════════════════════════════════
            CRITÉRIOS DE USO RESPONSÁVEL (TOPO)
        ═══════════════════════════════════════════════════ */}
        <div id="criterios">
          <CriteriosUso />
        </div>

        {/* ═══════════════════════════════════════════════════
            PARTE 1 — O QUE NOS FOI ESQUECIDO
        ═══════════════════════════════════════════════════ */}
        <motion.section id="parte-01" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 01</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-8 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            O QUE NOS FOI <span className="text-emerald-400">ESQUECIDO</span>
          </h2>

          <div className="max-w-3xl space-y-6">
            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Durante gerações, famílias plantavam, colhiam e criavam seus próprios recursos de subsistência. Não por ideologia — por necessidade. Cada quintal era uma farmácia. Cada avó era uma enciclopédia viva.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Com o tempo, a vida urbana substituiu a prática rural. O conhecimento que era transmitido pela observação da terra deixou de ser ensinado. O que era rotina virou exceção. O que era óbvio virou "alternativo".
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border-l-2 border-emerald-500/40 pl-6 py-3">
              <p className="text-emerald-300/90 text-lg md:text-xl font-medium leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Não nos tiraram esse conhecimento. Nos desconectamos dele. Lentamente. Geração após geração, o que era natural virou discutível."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Hoje, a maioria das pessoas não reconhece uma folha de <span className="text-emerald-400 font-semibold">hortelã</span>. Não sabe diferenciar <span className="text-emerald-400 font-semibold">poejo</span> de capim. Não entende o que é <span className="text-emerald-400 font-semibold">inflamação crônica</span>. Não associa <span className="text-emerald-400 font-semibold">sono ruim</span> com imunidade baixa.
            </motion.p>

            <motion.p variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base leading-relaxed">
              Isso não é culpa de ninguém. É resultado da <span className="text-stone-200 font-semibold">desconexão prática com a base biológica</span>. Este módulo reconecta essa base.
            </motion.p>
          </div>

          {/* ─── Os 3 pilares técnicos ─── */}
          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {[
              {
                icon: BookOpen, title: 'Base Histórica',
                desc: 'Farmacopeias europeias, medicina tradicional asiática, sistemas agrícolas familiares. A farmacologia moderna nasceu da extração de compostos vegetais. Ácido acetilsalicílico veio do salgueiro. Digitálicos vieram da dedaleira. A planta veio antes do laboratório.',
                color: 'emerald',
              },
              {
                icon: Brain, title: 'Base Fisiológica',
                desc: 'Flavonoides reduzem estresse oxidativo. Compostos amargos estimulam o fígado. Fibras modulam microbiota intestinal. Óleos essenciais possuem ação antimicrobiana. Nada aqui é crença — é bioquímica aplicada.',
                color: 'cyan',
              },
              {
                icon: Shield, title: 'Base de Segurança',
                desc: 'Nenhuma planta é inofensiva por ser natural. Faixa segura de uso, contraindicações, interações medicamentosas, duração recomendada e sinais de suspensão. Sem isso, não há responsabilidade. E sem responsabilidade, não há autoridade.',
                color: 'amber',
              },
            ].map((p, i) => {
              const colorStyles: Record<string, { card: string; iconBg: string; icon: string }> = {
                emerald: { card: 'bg-emerald-950/30 border-emerald-700/25 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] hover:bg-emerald-950/40', iconBg: 'bg-emerald-500/15 border border-emerald-500/25', icon: 'text-emerald-400' },
                cyan: { card: 'bg-cyan-950/30 border-cyan-700/25 hover:border-cyan-500/40 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)] hover:bg-cyan-950/40', iconBg: 'bg-cyan-500/15 border border-cyan-500/25', icon: 'text-cyan-400' },
                amber: { card: 'bg-amber-950/30 border-amber-700/25 hover:border-amber-500/40 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)] hover:bg-amber-950/40', iconBg: 'bg-amber-500/15 border border-amber-500/25', icon: 'text-amber-400' },
              };
              const cs = colorStyles[p.color];
              return (
                <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className={`border rounded-xl p-6 md:p-8 transition-all duration-500 cursor-default group ${cs.card}`}>
                  <div className={`p-2.5 rounded-xl w-fit mb-5 ${cs.iconBg}`}>
                    <p.icon className={`${cs.icon} group-hover:scale-110 transition-transform duration-300`} size={20} />
                  </div>
                  <h4 className="text-base font-bold text-stone-200 mb-3">{p.title}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 2 — A BASE NATURAL DO CORPO
        ═══════════════════════════════════════════════════ */}
        <motion.section id="parte-02" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 02</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-4 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            A BASE NATURAL <span className="text-emerald-400">DO CORPO</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
            Organização por sistemas fisiológicos. Cada sistema recebe suas plantas específicas, com mecanismo de ação documentado.
          </p>

          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgSistemas} alt="Os 5 sistemas fisiológicos" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex flex-wrap gap-2">
                {['Digestivo', 'Respiratório', 'Nervoso', 'Imune', 'Muscular'].map(s => (
                  <span key={s} className="text-[10px] font-bold tracking-widest uppercase bg-emerald-500/15 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Aviso clínico */}
          <div className="bg-red-950/30 border border-red-800/25 rounded-xl p-6 md:p-8 mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-red-400" />
              <h3 className="text-sm font-bold text-red-300 uppercase tracking-wider">Quando NÃO usar fitoterapia sozinha</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                'Febre persistente > 38,5°C', 'Sintomas que pioram após 48h',
                'Dor intensa ou localizada', 'Confusão mental ou prostração',
                'Sangramento inesperado', 'Gestante ou lactante sem orientação',
                'Criança < 2 anos', 'Uso de medicação contínua',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/15 p-2.5 rounded-lg">
                  <XCircle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 italic">Em qualquer dessas situações, busque atendimento médico profissional.</p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 3 — PLANTAS MEDICINAIS NA PRÁTICA
        ═══════════════════════════════════════════════════ */}
        <motion.section id="parte-03" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 03</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-4 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            PLANTAS MEDICINAIS <span className="text-emerald-400">NA PRÁTICA</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-4">
            Fichas técnicas completas com compostos ativos, sinergias documentadas, diferença entre uso fresco e seco, 
            impacto térmico, risco de uso crônico e quando a planta NÃO é primeira opção.
          </p>

          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgPlantas} alt="Plantas medicinais na prática" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
          </div>

          {/* ─── FICHAS POR SISTEMA ─── */}
          <SistemaSection titulo="DIGESTIVO" subtitulo="Bile, motilidade intestinal e proteção da mucosa gástrica." icon={Flame} plantas={DIGESTIVO} accentColor="green" index={1} />
          <SistemaSection titulo="RESPIRATÓRIO" subtitulo="Broncodilatação, fluidificação de muco e ação antimicrobiana leve." icon={Wind} plantas={RESPIRATORIO} accentColor="cyan" index={2} />
          <SistemaSection titulo="NERVOSO" subtitulo="Modulação GABA, relaxamento e qualidade do sono." icon={Brain} plantas={NERVOSO} accentColor="purple" index={3} />
          <SistemaSection titulo="IMUNE" subtitulo="Modulação da resposta imune, ação antimicrobiana e anti-inflamatória." icon={Shield} plantas={IMUNE} accentColor="amber" index={4} />
          <SistemaSection titulo="MUSCULAR & INFLAMATÓRIO" subtitulo="Circulação local, cicatrização e redução da inflamação tópica." icon={Heart} plantas={MUSCULAR} accentColor="orange" index={5} />
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            MATRIZ COMPARATIVA DAS 12 PLANTAS
        ═══════════════════════════════════════════════════ */}
        <div id="matriz">
          <MatrizComparativa />
        </div>

        {/* ═══════════════════════════════════════════════════
            PARTE 4 — MANUAL APLICADO
        ═══════════════════════════════════════════════════ */}
        <motion.section id="parte-04" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 04</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide text-stone-200 mb-8 leading-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            MANUAL <span className="text-emerald-400">APLICADO</span>
          </h2>

          <div className="bg-emerald-950/40 border border-emerald-800/25 rounded-2xl p-8 md:p-12">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8">
              Cada planta documentada neste módulo segue um <span className="text-emerald-400 font-semibold">padrão técnico fixo</span> que mantém a autoridade do protocolo. A diferença entre informação e formação é a estrutura.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Informação', example: '"Camomila acalma."', type: 'bad' as const },
                { label: 'Formação', example: 'Princípio ativo: apigenina · Mecanismo: modulação GABA · Sinergias: +capim-limão · Térmico: neutro · Risco crônico: absorção de ferro · Dose: 1-2g flor seca/xícara', type: 'good' as const },
              ].map(item => (
                <div key={item.label} className={`p-6 rounded-xl border ${item.type === 'bad' ? 'bg-red-950/20 border-red-800/20' : 'bg-emerald-950/30 border-emerald-700/25'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {item.type === 'bad' ? <XCircle size={16} className="text-red-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
                    <span className={`text-sm font-bold ${item.type === 'bad' ? 'text-red-300' : 'text-emerald-300'}`}>{item.label}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${item.type === 'bad' ? 'text-stone-500 italic' : 'text-stone-300 font-mono'}`}>{item.example}</p>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-5">Padrão fixo de cada ficha técnica</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Leaf, label: 'Nome e espécie' },
                { icon: Activity, label: 'O que melhora' },
                { icon: Brain, label: 'Como age' },
                { icon: FlaskConical, label: 'Compostos ativos' },
                { icon: FlaskConical, label: 'Como preparar' },
                { icon: Shield, label: 'Faixa segura' },
                { icon: XCircle, label: 'Contraindicações' },
                { icon: AlertTriangle, label: 'Interações' },
                { icon: Eye, label: 'Sinais de suspensão' },
                { icon: Package, label: 'Parte utilizada' },
                { icon: Sun, label: 'Impacto térmico' },
                { icon: Activity, label: 'Sinergias' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                  <f.icon size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-stone-300">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 5 — EDUCAÇÃO BOTÂNICA FAMILIAR (EXPANDIDA)
        ═══════════════════════════════════════════════════ */}
        <div id="parte-05">
          <EducacaoBotanica />
        </div>

        {/* ═══════════════════════════════════════════════════
            BLOCO ESTRATÉGICO — LIVRO EM EDIÇÃO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-gradient-to-br from-amber-950/30 to-[#0f1a0f]/60 border border-amber-800/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-[8px] font-bold tracking-[0.4em] uppercase bg-amber-500/15 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                Em desenvolvimento
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-amber-400" size={20} />
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-[0.3em]">Livro em Edição</h3>
            </div>
            <h4 className="text-2xl md:text-3xl font-extrabold tracking-wide text-stone-200 mb-4 uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
              AUTOCUSTÓDIA <span className="text-amber-400">BIOLÓGICA</span>
            </h4>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
              Todo o conteúdo deste módulo está sendo estruturado como publicação técnica independente. 
              Fichas expandidas, protocolos sazonais, matriz de decisão por sintoma, e guia prático de formação familiar 
              — compilados em formato que funciona mesmo sem internet.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: '12 fichas técnicas', value: 'Padrão 9 seções' },
                { label: 'Matriz comparativa', value: 'Visão sistêmica' },
                { label: '9 exercícios práticos', value: 'Formação familiar' },
                { label: 'Protocolos sazonais', value: 'Em desenvolvimento' },
              ].map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-stone-300 text-xs font-semibold">{item.label}</p>
                  <p className="text-stone-500 text-[10px] mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-stone-600 text-xs italic">
              Acompanhe o desenvolvimento. Quando estiver pronto, você será o primeiro a saber.
            </p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            INTEGRAÇÃO — ENCERRAMENTO
        ═══════════════════════════════════════════════════ */}
        <motion.section id="integracao" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-gradient-to-br from-emerald-950/50 to-[#0a0d08]/80 border border-emerald-800/20 rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">Núcleo biológico do protocolo</h2>
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                Este bloco se conecta com todos os módulos do Projeto Autônomo. <span className="text-emerald-400 font-semibold">Sem corpo saudável, não há autonomia real.</span>
              </p>

              {/* ─── Conexão direta com Saúde Preventiva ─── */}
              <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={16} className="text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-300">Conexão direta: Saúde Preventiva</p>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed mb-3">
                  Este módulo complementa diretamente o módulo de <span className="text-emerald-300 font-semibold">Saúde Preventiva</span>. 
                  Lá você encontra protocolos de rotina para manter o corpo funcionando antes de precisar de qualquer planta. 
                  Aqui, você age quando o corpo sinaliza que algo saiu do equilíbrio. Um sem o outro é incompleto.
                </p>
                <Link to="/projeto-autonomo/saude-preventiva" className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold hover:text-emerald-300 transition-colors">
                  Acessar Saúde Preventiva <ChevronRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Fitoterapia Aplicada', link: '/projeto-autonomo/fitoterapia-aplicada' },
                  { label: 'Primeiros Socorros', link: '/projeto-autonomo/primeiros-socorros' },
                  { label: 'Avaliação de Sinais', link: '/projeto-autonomo/avaliacao-sinais' },
                  { label: 'Controle de Vetores', link: '/projeto-autonomo/controle-vetores' },
                  { label: 'Horta Urbana', link: '/projeto-autonomo/horta-urbana' },
                  { label: 'Solo e Fertilidade', link: '/projeto-autonomo/solo-fertilidade' },
                ].map(m => (
                  <Link key={m.label} to={m.link}
                    className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/15 rounded-lg px-3 py-2.5 hover:bg-emerald-500/20 hover:border-emerald-400/30 transition-all duration-300 group">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span className="text-xs text-stone-300 group-hover:text-emerald-300 transition-colors">{m.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-emerald-800/20 pt-6 mt-6">
                <p className="text-stone-400 text-sm leading-relaxed">
                  Corpo forte → Resposta melhor. Inflamação controlada → Recuperação mais rápida. Alimentação limpa → Sistema imune funcional.
                </p>
                <p className="text-emerald-400 font-semibold text-sm mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Autonomia não começa no estoque. Começa no corpo.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/projeto-autonomo/sabedoria-ancestral" className="btn-secondary text-center">
                ← Voltar à Sabedoria Ancestral
              </Link>
              <Link to="/projeto-autonomo" className="btn-secondary text-center">
                Projeto Autônomo
              </Link>
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
