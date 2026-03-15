import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FlaskConical, Leaf, Activity, Brain, Shield, XCircle, AlertTriangle, Eye, Package, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import CinematicHero from '@/components/CinematicHero';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const FICHA_FIELDS = [
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
];

export default function AplicacaoPratica() {
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
        <title>Aplicação Prática: Fichas Técnicas de Plantas Medicinais com Dosagem e Segurança | Lord Junnior</title>
        <meta name="description" content="Fichas técnicas completas de plantas medicinais com compostos ativos, mecanismo de ação, dosagem segura, contraindicações e sinergias. Conhecimento perdido documentado com rigor." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/aplicacao-pratica" />
        <meta property="og:title" content="Aplicação Prática: Fichas Técnicas de Plantas Medicinais" />
        <meta property="og:description" content="Cada planta com ficha completa: compostos, dosagem, preparo, contraindicações e sinergias documentadas." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/aplicacao-pratica" />
      </Helmet>
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />
      <CinematicHero
        image="/heroes/cp-aplicacao-pratica.webp"
        phase="Bloco 04 · Conhecimento Perdido"
        title="Aplicação Prática"
        subtitle="Protocolos domésticos estruturados, preparo correto, conservação e uso racional. A diferença entre informação e formação é a estrutura — e aqui, cada detalhe tem padrão técnico fixo."
        icon={FlaskConical}
        accentColor="emerald"
        backLink="/projeto-autonomo/conhecimento-perdido"
        backLabel="Conhecimento Perdido"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">
        {/* ─── INFORMAÇÃO VS FORMAÇÃO ─── */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950/30 border border-emerald-700/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="relative p-8 md:p-14">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Informação vs Formação
              </h2>

              <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
                Cada planta documentada neste módulo segue um <span className="text-emerald-400 font-semibold">padrão técnico fixo</span> que mantém a autoridade do protocolo. 
                A diferença entre informação e formação é a estrutura.
              </p>

              {/* Comparison cards */}
              <div className="grid md:grid-cols-2 gap-5 mb-14">
                <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-red-950/30 border border-red-800/20 rounded-2xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle size={18} className="text-red-400" />
                      <span className="text-sm font-bold text-red-300 tracking-wider uppercase">Informação</span>
                    </div>
                    <p className="text-stone-500 italic text-sm leading-relaxed">"Camomila acalma."</p>
                  </div>
                </div>

                <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-emerald-950/40 border border-emerald-700/25 rounded-2xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={18} className="text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-300 tracking-wider uppercase">Formação</span>
                    </div>
                    <p className="text-stone-300 font-mono text-xs leading-relaxed">
                      Princípio ativo: apigenina · Mecanismo: modulação GABA · Sinergias: +capim-limão · Térmico: neutro · Risco crônico: absorção de ferro · Dose: 1-2g flor seca/xícara
                    </p>
                  </div>
                </div>
              </div>

              {/* Ficha fields - Bento Grid */}
              <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-6">Padrão fixo de cada ficha técnica</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {FICHA_FIELDS.map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04, duration: 0.5, ease: APPLE_EASE }}
                      className="group flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <Icon size={14} className="text-emerald-500/80 shrink-0 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs text-stone-300 group-hover:text-stone-200 transition-colors">{f.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── PROTOCOLOS DOMÉSTICOS ─── */}
        <div className="gsap-reveal mb-28">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-emerald-950/25 border border-emerald-700/15 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            <div className="relative p-8 md:p-14">

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <FlaskConical size={20} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Protocolos Domésticos
                </h2>
              </div>

              <div className="space-y-6 text-stone-300 text-base leading-relaxed max-w-3xl">
                <p>
                  Infusão não é "jogar água quente". Decocção não é "ferver qualquer coisa". 
                  Maceração não é "deixar de molho e torcer que funcione". Cada método de preparo existe porque 
                  <span className="text-emerald-400 font-semibold"> diferentes compostos químicos são extraídos em condições diferentes</span>.
                </p>
                <p>
                  Folhas e flores liberam compostos voláteis em infusão (água a 80-90°C, coberta, por 5-10 minutos). 
                  Raízes e cascas exigem decocção (fervura direta por 10-20 minutos). 
                  Compostos sensíveis ao calor precisam de maceração a frio (8-12 horas).
                </p>
                <p>
                  A proporção planta/água, o tempo de contato, a temperatura e o armazenamento pós-preparo 
                  determinam a eficácia real do uso. Este bloco documenta cada uma dessas variáveis 
                  para que o preparo caseiro tenha <span className="text-stone-100 font-semibold">resultado previsível e reproduzível</span>.
                </p>
              </div>

              {/* Method cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-10">
                {[
                  { title: 'Infusão', temp: '80-90°C', time: '5-10 min', parts: 'Folhas e flores', color: 'emerald' },
                  { title: 'Decocção', temp: 'Fervura direta', time: '10-20 min', parts: 'Raízes e cascas', color: 'amber' },
                  { title: 'Maceração', temp: 'Frio', time: '8-12 horas', parts: 'Compostos sensíveis', color: 'blue' },
                ].map((method, idx) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: APPLE_EASE }}
                    className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03]"
                    style={{ perspective: '800px' }}
                  >
                    <div className={`absolute inset-0 bg-${method.color === 'emerald' ? 'emerald' : method.color === 'amber' ? 'amber' : 'blue'}-950/30 border border-white/[0.08] rounded-2xl`} />
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${method.color === 'emerald' ? 'emerald' : method.color === 'amber' ? 'amber' : 'blue'}-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative p-6">
                      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${method.color === 'emerald' ? 'text-emerald-500/60' : method.color === 'amber' ? 'text-amber-500/60' : 'text-blue-500/60'}`}>Método</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{method.title}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-500">Temperatura</span>
                          <span className="text-stone-300 font-mono">{method.temp}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-500">Tempo</span>
                          <span className="text-stone-300 font-mono">{method.time}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-500">Partes</span>
                          <span className="text-stone-300 font-mono">{method.parts}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="gsap-reveal flex flex-col sm:flex-row gap-4 mt-20">
          <Link to="/conhecimento-perdido/seguranca-e-limites"
            className="flex-1 group flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-stone-400 text-sm font-bold hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400 transition-all duration-300">
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Segurança e Limites
          </Link>
          <Link to="/conhecimento-perdido/continuidade-familiar"
            className="flex-1 group flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-5 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all duration-300">
            Próximo: Continuidade Familiar
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
}
