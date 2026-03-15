import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, Sun, Moon, Activity, Salad, Brain, Flame, Droplets, CheckCircle2, Heart, Shield, Dna, Wind, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import CinematicHero from '@/components/CinematicHero';

import imgMicrobiota from '@/assets/saude-microbiota.jpg';
import imgCortisol from '@/assets/saude-cortisol.jpg';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const SaudePreventiva = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Saúde Preventiva: Blindagem Imunológica Sem Dependência do Sistema | Lord Junnior</title>
        <meta name="description" content="Estratégias anti-inflamatórias avançadas, exposição solar segura, higiene do sono e alimentação funcional. Longevidade e saúde fora do sistema convencional." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/saude-preventiva" />
        <meta property="og:title" content="Saúde Preventiva: Protocolo de Blindagem Imunológica" />
        <meta property="og:description" content="Fortaleça seu sistema imunológico com protocolos validados. Sol, sono, movimento e alimentação anti-inflamatória." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/saude-preventiva" />
      </Helmet>
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050808 0%, #0a0d08 8%, #0f1a0f 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <CinematicHero
        image="/heroes/saude-preventiva.webp"
        phase="Fase 02 · Autonomia Biológica"
        title="Saúde Preventiva"
        subtitle="Base Biológica e Estratégias Anti-Inflamatórias Avançadas"
        icon={Heart}
        accentColor="emerald"
        backLink="/projeto-autonomo"
        backLabel="Projeto Autônomo"
      />

      {/* ─── READING PROGRESS ─── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-emerald-500" style={{ width: progressWidth }} />

      {/* ─── ATMOSPHERIC ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[25%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-emerald-400/20"
            style={{
              left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite ${Math.random() * 5}s`,
            }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* Hero context */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="mb-28 max-w-3xl space-y-4 text-stone-300 leading-relaxed">
          <p className="text-sm">Saúde preventiva é a manutenção da <span className="text-stone-100 font-medium">homeostase.</span></p>
          <p className="text-sm">Homeostase é a capacidade do corpo de manter equilíbrio interno mesmo sob estresse.</p>
          <p className="text-sm text-stone-100 font-medium">Quando esse equilíbrio falha, surge:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {['Inflamação crônica', 'Resistência à insulina', 'Disfunção hormonal', 'Fadiga persistente', 'Vulnerabilidade imunológica'].map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs bg-red-950/30 border border-red-800/15 rounded-xl px-3 py-2">
                <AlertTriangle size={11} className="text-red-400 shrink-0" />
                <span className="text-stone-300">{s}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Module integration */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-10 mb-28 max-w-3xl">
          <p className="text-stone-200 font-bold text-sm mb-4">Este módulo integra:</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Exposição solar', icon: Sun, color: 'text-amber-400' },
              { label: 'Sono', icon: Moon, color: 'text-indigo-400' },
              { label: 'Movimento', icon: Activity, color: 'text-green-400' },
              { label: 'Alimentação', icon: Salad, color: 'text-emerald-400' },
              { label: 'Estratégias anti-inflamatórias', icon: Dna, color: 'text-purple-400' },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="group flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300">
                  <Icon size={16} className={`${p.color} shrink-0`} />
                  <span className="text-sm text-stone-300">{p.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ INFLAMAÇÃO CRÔNICA ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-red-950/20 border border-red-800/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-red-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Base</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Entendendo a Inflamação Crônica
              </h2>

              <div className="mb-8">
                <p className="text-sm text-stone-300 mb-2">Inflamação aguda é <span className="text-green-400 font-bold">protetora.</span></p>
                <p className="text-sm text-stone-300">Inflamação crônica é <span className="text-red-400 font-bold">destrutiva.</span></p>
                <p className="text-sm text-stone-400 mt-3">Ela ocorre quando o sistema imune permanece ativado de forma leve e constante.</p>
              </div>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Marcadores envolvidos</h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {['IL-6', 'TNF-alpha', 'PCR ultrasensível', 'Cortisol elevado'].map((m) => (
                  <div key={m} className="bg-red-500/10 border border-red-500/15 rounded-xl p-4 text-center hover:bg-red-500/15 transition-colors">
                    <span className="text-sm font-bold text-red-400 font-mono">{m}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Consequências</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Danos vasculares', 'Rigidez arterial', 'Disfunção metabólica', 'Alteração do humor', 'Fadiga'].map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-stone-300">
                    <Flame size={13} className="text-red-400 shrink-0" />
                    {c}
                  </div>
                ))}
              </div>

              <p className="text-xs text-stone-500 mt-8 border-t border-white/5 pt-4 italic">
                O objetivo preventivo é reduzir inflamação basal sem bloquear o sistema imune.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ EXPOSIÇÃO SOLAR ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-amber-950/20 border border-amber-800/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-amber-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Pilar 01</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Exposição Solar e Modulação Imune
              </h2>

              <p className="text-sm text-stone-300 mb-6">A vitamina D atua como <span className="text-amber-400 font-semibold">reguladora imunológica.</span></p>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Ela:</h4>
              <div className="space-y-2 mb-8">
                {['Reduz citocinas inflamatórias', 'Melhora resposta antiviral', 'Regula expressão genética'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-stone-300">
                    <Sun size={13} className="text-amber-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Baixos níveis estão associados a:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Infecções recorrentes', 'Depressão', 'Osteopenia', 'Fadiga crônica'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm bg-amber-500/10 border border-amber-500/15 rounded-xl p-4 hover:bg-amber-500/15 transition-colors">
                    <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                    <span className="text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SONO ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-indigo-950/20 border border-indigo-800/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-indigo-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Pilar 02</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sono e Reparo Inflamatório
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Privação de sono aumenta:</h4>
                  <div className="space-y-3">
                    {['IL-6', 'PCR', 'Cortisol'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm bg-red-500/10 border border-red-500/15 rounded-xl p-4">
                        <AlertTriangle size={13} className="text-red-400 shrink-0" />
                        <span className="text-stone-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Durante sono profundo ocorre:</h4>
                  <div className="space-y-3">
                    {['Liberação de hormônio do crescimento', 'Reparação celular', 'Regulação do eixo HPA'].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm bg-indigo-500/10 border border-indigo-500/15 rounded-xl p-4">
                        <Moon size={13} className="text-indigo-400 shrink-0" />
                        <span className="text-stone-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-amber-500/10 border border-amber-500/15 rounded-xl p-5">
                <p className="text-sm text-stone-300 font-semibold">Sem sono adequado, <span className="text-amber-400">nenhuma estratégia anti-inflamatória se sustenta.</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOVIMENTO ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-green-950/20 border border-green-800/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-green-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Pilar 03</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Movimento como Anti-Inflamatório Natural
              </h2>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Exercício moderado:</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {['Reduz TNF-alpha', 'Melhora sensibilidade à insulina', 'Aumenta mitocôndrias', 'Diminui gordura visceral'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm bg-green-500/10 border border-green-500/15 rounded-xl p-4 hover:bg-green-500/15 transition-colors">
                    <Activity size={13} className="text-green-400 shrink-0" />
                    <span className="text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/10 border border-amber-500/15 rounded-xl p-5">
                <p className="text-sm text-stone-300">Exercício excessivo sem recuperação pode <span className="text-amber-400 font-semibold">aumentar inflamação.</span> Equilíbrio é essencial.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ ALIMENTAÇÃO ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-amber-950/15 border border-amber-800/10 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-amber-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Pilar 04</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Alimentação Anti-Inflamatória
              </h2>
              <p className="text-stone-500 text-sm mb-10">Camada Avançada</p>

              {/* Sub 1: Controle Glicêmico */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 mb-5">
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Controle de Pico Glicêmico</h3>
                <p className="text-sm text-stone-400 mb-5">Picos de glicose aumentam estresse oxidativo.</p>
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Estratégias:</h4>
                <div className="space-y-2 mb-5">
                  {[
                    'Consumir proteína antes do carboidrato',
                    'Incluir fibras solúveis',
                    'Evitar carboidrato isolado',
                    'Caminhar 10 minutos após refeição',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-stone-300">
                      <span className="text-[10px] font-mono text-amber-400 w-5 shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      {step}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-400 font-semibold">Impacto: Reduz resistência à insulina.</p>
              </div>

              {/* Sub 2: Microbiota */}
              <div className="rounded-2xl overflow-hidden relative mb-5">
                <img src={imgMicrobiota} alt="Microbiota saudável vs disbiose" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/70">Equilíbrio · Disbiose · Microbiota</span>
                </div>
              </div>
              <div className="bg-emerald-950/25 border border-emerald-700/15 rounded-2xl p-7 mb-5">
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. Microbiota Intestinal</h3>
                <p className="text-sm text-stone-300 mb-5">70% do sistema imune está ligado ao intestino.</p>

                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Disbiose gera:</h4>
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {['Inflamação sistêmica', 'Distensão abdominal', 'Alteração de humor'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 rounded-xl p-3">
                      <AlertTriangle size={12} className="text-red-400 shrink-0" />
                      <span className="text-stone-300">{item}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Estratégias:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {['Fermentados naturais', 'Fibras prebióticas', 'Variedade vegetal', 'Redução de ultraprocessados'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-3 hover:bg-emerald-500/15 transition-colors">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      <span className="text-stone-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub 3: Micronutrientes */}
              <div className="bg-purple-950/20 border border-purple-800/15 rounded-2xl p-7">
                <h3 className="text-lg font-bold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. Micronutrientes Anti-Inflamatórios</h3>
                <div className="space-y-3">
                  {[
                    { nome: 'Magnésio', funcao: 'Relaxamento muscular e redução de estresse', color: 'text-blue-400' },
                    { nome: 'Zinco', funcao: 'Função imunológica', color: 'text-sky-400' },
                    { nome: 'Ômega 3', funcao: 'Redução de citocinas inflamatórias', color: 'text-cyan-400' },
                    { nome: 'Vitamina C', funcao: 'Antioxidante celular', color: 'text-orange-400' },
                    { nome: 'Curcumina', funcao: 'Modulação inflamatória', color: 'text-amber-400' },
                  ].map((n) => (
                    <div key={n.nome} className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.06] transition-colors">
                      <span className={`text-sm font-bold ${n.color} min-w-[100px] font-mono`}>{n.nome}</span>
                      <span className="text-stone-600">→</span>
                      <span className="text-sm text-stone-300">{n.funcao}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-5 border-t border-white/5 pt-4 italic">
                  Sempre dentro de faixa segura. Evitar megadoses sem orientação.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CONTROLE DE ESTRESSE ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="rounded-2xl overflow-hidden relative mb-5">
            <img src={imgCortisol} alt="Regulação do cortisol" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/40 to-transparent" />
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-red-950/15 border border-red-800/10 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-red-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Pilar 05</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Controle de Estresse e Cortisol
              </h2>

              <p className="text-sm text-stone-300 mb-5">Estresse crônico mantém cortisol elevado.</p>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Cortisol alto por tempo prolongado causa:</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {['Resistência à insulina', 'Perda muscular', 'Aumento de gordura abdominal', 'Supressão imune'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm bg-red-500/10 border border-red-500/15 rounded-xl p-4">
                    <AlertTriangle size={13} className="text-red-400 shrink-0" />
                    <span className="text-stone-300">{item}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-4">Estratégias práticas:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'Respiração nasal lenta (4-6 ciclos/minuto)', icon: Wind },
                  { label: 'Caminhada ao ar livre', icon: Activity },
                  { label: 'Exposição solar matinal', icon: Sun },
                  { label: 'Sono regular', icon: Moon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 text-sm bg-green-500/10 border border-green-500/15 rounded-xl p-4 hover:bg-green-500/15 transition-colors">
                      <Icon size={14} className="text-green-400 shrink-0" />
                      <span className="text-stone-300">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ PROTOCOLO INTEGRADO ═══ */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950/25 border border-emerald-700/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Protocolo</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Protocolo Integrado Anti-Inflamatório
              </h2>

              <h3 className="text-sm font-bold text-stone-300 mb-5">Base diária:</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {[
                  { label: '15-30 min de sol', icon: Sun, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
                  { label: '20-30 min de movimento', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/15' },
                  { label: 'Fibras e proteína adequada', icon: Salad, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' },
                  { label: '7-9h de sono', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/15' },
                  { label: 'Hidratação consistente', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
                  { label: 'Regulação emocional', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/15' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={`flex items-center gap-3 ${item.bg} border ${item.border} rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300`}>
                      <Icon size={18} className={`${item.color} shrink-0`} />
                      <span className="text-sm text-stone-300">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <h3 className="text-sm font-bold text-stone-300 mb-5">Sinais de Redução de Inflamação</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Energia estável', 'Sono profundo', 'Menos dores articulares', 'Melhor digestão', 'Humor mais estável'].map((s) => (
                  <div key={s} className="flex items-center gap-3 text-sm bg-green-500/10 border border-green-500/15 rounded-xl p-4">
                    <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                    <span className="text-stone-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── CONCLUSÃO ─── */}
        <div className="gsap-reveal mb-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950/30 border border-emerald-500/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="relative p-8 md:p-12">
              <p className="text-sm text-stone-300 leading-relaxed mb-3">
                Saúde preventiva não é ausência de doença. É a capacidade de <span className="text-emerald-400 font-semibold">adaptação fisiológica.</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {['Inflamação controlada', 'Metabolismo eficiente', 'Hormônios regulados', 'Sistema imune equilibrado'].map((item) => (
                  <div key={item} className="text-xs text-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 text-stone-400">{item}</div>
                ))}
              </div>
              <p className="text-sm text-stone-300 mt-5">
                Quando os pilares básicos são aplicados e as estratégias avançadas são integradas, o corpo retorna ao estado de <span className="text-green-400 font-bold">autorregulação.</span>
              </p>
              <p className="text-xs text-stone-500 mt-3 italic">Isso é base biológica real.</p>
            </div>
          </div>
        </div>

        {/* ─── DISCLAIMER ─── */}
        <div className="gsap-reveal mb-12">
          <div className="bg-amber-950/20 border border-amber-800/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Este conteúdo é de caráter educativo e informativo. Não substitui avaliação médica profissional, diagnóstico ou tratamento. Consulte sempre um profissional de saúde antes de modificar sua rotina, especialmente se possui condições pré-existentes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── NAV FOOTER ─── */}
        <div className="gsap-reveal flex flex-col sm:flex-row gap-4">
          <Link to="/projeto-autonomo"
            className="flex-1 group flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-stone-400 text-sm font-bold hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400 transition-all duration-300">
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Projeto Autônomo
          </Link>
          <Link to="/projeto-autonomo/avaliacao-sinais"
            className="flex-1 group flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-5 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all duration-300">
            Avaliação de Sinais
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <ScrollToTop />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          66% { transform: translateY(-10px) translateX(-8px); opacity: 0.15; }
        }
      `}</style>
    </div>
    </>
  );
};

export default SaudePreventiva;
