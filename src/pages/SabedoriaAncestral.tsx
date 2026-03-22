import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Leaf, Sprout, Heart, Sun, Cross, Thermometer, Bug, Shield, Wheat, TreePine, BookOpen, Flame, Layers, Egg, Shovel, ChevronDown, Eye, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

/* ─── GSAP ─── */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

/* ─── MÓDULOS DE SAÚDE & CORPO ─── */
const MODULOS_SAUDE = [
  {
    icon: Leaf,
    title: 'Suporte Fitoterápico',
    desc: '12 plantas essenciais. Dosagens conservadoras, contraindicações e métodos de preparo documentados.',
    link: '/projeto-autonomo/autonomia-biologica',
    tag: 'Publicado',
    numero: '01',
  },
  {
    icon: Sprout,
    title: 'Fitoterapia Aplicada',
    desc: 'Protocolos combinados por sistema corporal. Sinergia entre plantas, ciclos de uso e critérios de interrupção.',
    link: '/projeto-autonomo/fitoterapia-aplicada',
    tag: 'Publicado',
    numero: '02',
  },
  {
    icon: Sun,
    title: 'Saúde Preventiva',
    desc: 'Exposição solar, sono, movimento e alimentação anti-inflamatória como base de fortalecimento.',
    link: '/projeto-autonomo/saude-preventiva',
    tag: 'Publicado',
    numero: '03',
  },
  {
    icon: Cross,
    title: 'Primeiros Socorros',
    desc: 'Contenção de sangramento, imobilização e queimaduras. Kit funcional para ambiente remoto.',
    link: '/projeto-autonomo/primeiros-socorros',
    tag: 'Publicado',
    numero: '04',
  },
  {
    icon: Thermometer,
    title: 'Avaliação de Sinais',
    desc: 'Interpretar febre, desidratação e sinais vitais com recursos mínimos e critérios objetivos.',
    link: '/projeto-autonomo/avaliacao-sinais',
    tag: 'Publicado',
    numero: '05',
  },
  {
    icon: Bug,
    title: 'Controle de Vetores',
    desc: 'Repelentes naturais, eliminação de criadouros, barreiras físicas e plantas repelentes.',
    link: '/projeto-autonomo/controle-vetores',
    tag: 'Publicado',
    numero: '06',
  },
];

/* ─── MÓDULOS DE ALIMENTAÇÃO ─── */
const MODULOS_ALIMENTACAO = [
  {
    icon: Sprout,
    title: 'Horta Urbana',
    desc: 'Transforme varandas e janelas em fonte de alimento. Vasos autoirrigáveis, cultivo vertical e espécies para iniciantes.',
    link: '/projeto-autonomo/horta-urbana',
    tag: 'Publicado',
    numero: '01',
  },
  {
    icon: Layers,
    title: 'Produção em Pequenos Espaços',
    desc: '4m² bem planejados produzem alimento. Consórcio de culturas, rotação e microclimas urbanos.',
    link: '/projeto-autonomo/producao-pequenos-espacos',
    tag: 'Em desenvolvimento',
    numero: '02',
  },
  {
    icon: Flame,
    title: 'Conservação e Armazenamento',
    desc: '10 alimentos essenciais + 18 métodos de conservação validados. Estoque estratégico familiar.',
    link: '/projeto-autonomo/conservacao-armazenamento',
    tag: 'Publicado',
    numero: '03',
  },
  {
    icon: Egg,
    title: 'Proteína Sustentável',
    desc: 'Galinhas, codornas, peixes e sistemas compactos. Proteína de qualidade em espaços reduzidos.',
    link: '/projeto-autonomo/proteina-sustentavel',
    tag: 'Em desenvolvimento',
    numero: '04',
  },
  {
    icon: Shovel,
    title: 'Solo e Fertilidade',
    desc: 'Compostagem, bokashi, húmus de minhoca. A base que sustenta tudo que cresce.',
    link: '/projeto-autonomo/solo-fertilidade',
    tag: 'Publicado',
    numero: '05',
  },
];

/* ─── Pilares do conhecimento ─── */
const PILARES = [
  { icon: Leaf, label: 'Catálogo de Plantas Medicinais', texto: 'Fichas técnicas completas com dosagens, contraindicações, mecanismos de ação e métodos de preparo validados.' },
  { icon: Heart, label: 'Protocolos de Saúde Natural', texto: 'Estratégias preventivas, fortalecimento imunológico e manutenção da saúde com o que a natureza entrega.' },
  { icon: Wheat, label: 'Soberania Alimentar', texto: 'Da semente ao prato. Produção, conservação e armazenamento de alimento com autonomia real.' },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */

const TOC_ITEMS = [
  { id: "narrativa-heading", label: "A Narrativa" },
  { id: "pilares-heading", label: "Os Pilares" },
  { id: "eixo01-heading", label: "Saúde & Autonomia" },
  { id: "eixo02-heading", label: "Soberania" },
  { id: "manifesto-heading", label: "Por Que Importa" },
];

export default function SabedoriaAncestral() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── GSAP ScrollTrigger reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)',
            duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Parallax on section images */
      gsap.utils.toArray<HTMLElement>('.gsap-parallax-img').forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Sabedoria Ancestral: Conhecimentos Perdidos de Saúde, Solo e Sobrevivência | Lord Junnior</title>
        <meta name="description" content="Hub completo de conhecimentos ancestrais de sobrevivência. Plantas medicinais, saúde natural, soberania alimentar e técnicas antigas validadas pela ciência moderna. O que não é transmitido morre." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/sabedoria-ancestral" />
        <meta property="og:title" content="Sabedoria Ancestral: Conhecimentos que o Sistema Apagou" />
        <meta property="og:description" content="Plantas medicinais, produção de alimentos e saúde natural. O conhecimento que suas avós tinham e você precisa recuperar." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/sabedoria-ancestral" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />
    <div ref={containerRef} className="min-h-screen font-sans selection:bg-amber-300/30 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />

      <CinematicHero
        image="/heroes/sabedoria-ancestral.webp"
        phase="Soberania Orgânica · Sabedoria Ancestral"
        title="O Que a Terra Ensina"
        subtitle="Conhecimento que alimentou famílias por séculos. Preservado aqui como ferramenta de soberania."
        icon={Leaf}
        accentColor="amber"
        backLink="/projeto-autonomo"
        backLabel="Soberania Orgânica"
      />

      {/* ─── Schema.org / SEO Microdados ─── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Sabedoria Ancestral — Soberania Orgânica",
        "description": "Hub de conhecimento ancestral sobre plantas medicinais, saúde natural e soberania alimentar.",
        "url": "https://verificabr.com/projeto-autonomo/sabedoria-ancestral",
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": MODULOS_SAUDE.length + MODULOS_ALIMENTACAO.length,
          "itemListElement": [...MODULOS_SAUDE, ...MODULOS_ALIMENTACAO].map((m, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": m.title,
            "description": m.desc,
            "url": `https://verificabr.com${m.link}`
          }))
        }
      })}} />

      {/* ─── Reading Progress Bar ─── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, hsl(40 92% 56%), hsl(35 95% 50%))' }} />

      {/* ─── Spore/Seed Particles ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70" aria-hidden="true">
        <style>{`
          @keyframes sporeDrift { from { transform: translateY(0) translateX(0) rotate(0deg); } to { transform: translateY(-1200px) translateX(80px) rotate(180deg); } }
          @keyframes sporeDrift2 { from { transform: translateY(0) translateX(0) rotate(0deg); } to { transform: translateY(-1000px) translateX(-60px) rotate(-120deg); } }
          @keyframes sporeDrift3 { from { transform: translateY(0) translateX(0); } to { transform: translateY(-800px) translateX(40px); } }
          .spore-layer { position:absolute;width:100%;height:250%;
            background-image:
              radial-gradient(1.5px 1.5px at 8% 15%,rgba(180,140,60,0.5) 100%,transparent),
              radial-gradient(1px 1px at 22% 45%,rgba(160,120,50,0.4) 100%,transparent),
              radial-gradient(2px 2px at 35% 70%,rgba(120,90,40,0.3) 100%,transparent),
              radial-gradient(1px 1px at 55% 25%,rgba(200,160,70,0.35) 100%,transparent),
              radial-gradient(1.5px 1.5px at 68% 60%,rgba(140,110,50,0.4) 100%,transparent),
              radial-gradient(1px 1px at 82% 80%,rgba(100,80,35,0.3) 100%,transparent),
              radial-gradient(2px 2px at 45% 40%,rgba(80,120,50,0.25) 100%,transparent),
              radial-gradient(1px 1px at 90% 15%,rgba(160,140,60,0.35) 100%,transparent);
            background-size:220px 220px;animation:sporeDrift 55s linear infinite; }
          .spore-layer-2 { background-size:320px 320px;animation:sporeDrift2 75s linear infinite;opacity:0.6; }
          .spore-layer-3 { background-size:180px 180px;animation:sporeDrift3 95s linear infinite;opacity:0.35; }
        `}</style>
        <div className="spore-layer" />
        <div className="spore-layer spore-layer-2" />
        <div className="spore-layer spore-layer-3" />
      </div>

      <div className="relative z-10">

        {/* ══════════════════════════════════════════════════════════
            NARRATIVA — Full-width immersive text
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-32 px-6 md:px-16 lg:px-24 gsap-reveal" aria-labelledby="narrativa-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="narrativa-heading" className="sr-only">A narrativa do guardião</h2>

            <div className="space-y-10">
              <p className="text-stone-200 text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Minha família planta, colhe e cria animais há gerações. Meu avô conhecia cada planta do quintal pelo nome e sabia exatamente o que cada uma curava. Minha avó nunca comprou um remédio para dor de estômago — ela ia ao quintal.
              </p>

              <p className="text-stone-400 text-lg md:text-xl leading-relaxed">
                Isso não era "alternativo". Era o padrão. Durante séculos, famílias inteiras viveram com o que a terra oferecia. Conheciam os ciclos, respeitavam os tempos, entendiam que a saúde começa no solo e no alimento — não na prateleira.
              </p>

              <p className="text-stone-400 text-lg md:text-xl leading-relaxed">
                Hoje, se você mostrar um pé de <span className="text-amber-400 font-semibold">poejo</span> para uma criança, ela não sabe o que é. Se colocar uma folha de <span className="text-amber-400 font-semibold">hortelã</span> na mão de um adolescente, ele não reconhece. Uma simples <span className="text-amber-400 font-semibold">folha de couve</span> — o alimento mais acessível e nutritivo que existe — virou algo "estranho".
              </p>
            </div>

            {/* Quote block — 3D subtle transform */}
            <motion.blockquote className="relative mt-16 gsap-reveal"
              whileHover={{ rotateY: 2, rotateX: -1, scale: 1.01 }}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}>
              <div className="border-l-[3px] pl-8 py-6" style={{ borderColor: 'hsl(40 92% 56% / 0.4)' }}>
                <p className="text-2xl md:text-3xl font-medium leading-relaxed italic"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(40 92% 56% / 0.7)' }}>
                  "Não é que esse conhecimento foi proibido. Ele foi substituído. Lentamente. Geração após geração, o que era natural virou 'alternativo'. O que era óbvio virou 'discutível'."
                </p>
              </div>
            </motion.blockquote>

            <div className="space-y-8 mt-16 gsap-reveal">
              <p className="text-stone-400 text-lg md:text-xl leading-relaxed">
                Com o passar dos anos, técnicas que alimentaram famílias inteiras foram esquecidas. O conhecimento sobre quais plantas fortalecem o corpo, quais raízes aliviam a dor, como conservar alimento sem eletricidade, como ler o solo — tudo isso está desaparecendo.
              </p>

              <p className="text-stone-200 text-xl md:text-2xl font-medium leading-relaxed">
                Este espaço existe para preservar esse conhecimento. Não como nostalgia — como <span className="font-bold" style={{ color: 'hsl(40 92% 56%)' }}>ferramenta de soberania</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PILARES — Bento Grid com 3 cards
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-24 px-6 md:px-16 lg:px-24" aria-labelledby="pilares-heading">
          <div className="max-w-6xl mx-auto">
            <div className="gsap-reveal mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-amber-400" size={20} aria-hidden="true" />
                <h2 id="pilares-heading" className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: 'hsl(40 92% 56%)' }}>
                  O que está sendo construído aqui
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PILARES.map((pilar, i) => {
                const PilarIcon = pilar.icon;
                return (
                  <motion.div key={pilar.label}
                    className="gsap-reveal group relative overflow-hidden rounded-2xl border border-white/[0.06] p-8 md:p-10"
                    style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
                    whileHover={{ scale: 1.03, y: -6, rotateX: -2, rotateY: 1 }}
                    transition={{ duration: 0.5, ease: APPLE_EASE }}
                    role="article"
                    aria-label={pilar.label}>
                    {/* Glow hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, rgba(180,140,50,0.08), transparent 70%)' }} />
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(90deg, transparent, hsl(40 92% 56% / 0.5), transparent)' }} />

                    <div className="relative z-10">
                      <div className="p-3 bg-amber-700/15 border border-amber-600/15 rounded-xl w-fit mb-6 group-hover:bg-amber-700/25 transition-colors">
                        <PilarIcon className="text-amber-400" size={22} aria-hidden="true" />
                      </div>
                      <h3 className="text-stone-200 text-lg font-bold mb-3">{pilar.label}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{pilar.texto}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            EIXO 01 — SAÚDE & FORTALECIMENTO — Bento Grid
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 md:px-16 lg:px-24" aria-labelledby="eixo01-heading">
          {/* Section divider */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(142 71% 45% / 0.15), transparent)' }} />

          <div className="max-w-6xl mx-auto">
            <div className="gsap-reveal mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: 'hsl(142 71% 45% / 0.6)' }}>Eixo 01</span>
              <h2 id="eixo01-heading" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mt-3 leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="text-stone-200">SAÚDE & </span>
                <span style={{ color: 'hsl(142 71% 45%)' }}>FORTALECIMENTO</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
                Plantas medicinais, protocolos preventivos e técnicas de avaliação. O corpo como primeira linha de defesa.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULOS_SAUDE.map((mod, i) => {
                const ModIcon = mod.icon;
                const isFeatured = i === 0;
                return (
                  <motion.div key={mod.title}
                    className={`gsap-reveal ${isFeatured ? 'lg:row-span-2' : ''}`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: APPLE_EASE }}>
                    <Link to={mod.link}
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-emerald-500/25 ${isFeatured ? 'h-full p-8 md:p-10' : 'p-6'}`}
                      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(6px)' }}
                      aria-label={`${mod.title} — ${mod.desc}`}>

                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(16,185,129,0.06), transparent 60%)' }} />
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(90deg, transparent, hsl(142 71% 45% / 0.4), transparent)' }} />

                      <div className="relative z-10 flex-1 flex flex-col">
                        {/* Numero */}
                        <span className="text-[64px] md:text-[80px] font-black leading-none tracking-tighter opacity-[0.04] absolute -top-2 -right-2 select-none pointer-events-none"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{mod.numero}</span>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-emerald-900/30 rounded-xl group-hover:bg-emerald-800/40 transition-colors">
                            <ModIcon className="text-emerald-400" size={isFeatured ? 22 : 18} aria-hidden="true" />
                          </div>
                          <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                            mod.tag === 'Publicado'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-amber-500/15 text-amber-400'
                          }`}>{mod.tag}</span>
                        </div>

                        <h3 className={`text-stone-200 font-bold mb-2 ${isFeatured ? 'text-xl md:text-2xl' : 'text-sm'}`}>
                          {mod.title}
                        </h3>
                        <p className={`text-stone-500 leading-relaxed flex-1 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                          {mod.desc}
                        </p>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-emerald-400 transition-colors">
                            Acessar módulo
                          </span>
                          <ArrowRight className="text-stone-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            EIXO 02 — SOBERANIA ALIMENTAR — Bento Grid
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 md:px-16 lg:px-24" aria-labelledby="eixo02-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(35 95% 50% / 0.15), transparent)' }} />

          <div className="max-w-6xl mx-auto">
            <div className="gsap-reveal mb-14">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: 'hsl(35 95% 50% / 0.6)' }}>Eixo 02</span>
              <h2 id="eixo02-heading" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mt-3 leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="text-stone-200">SOBERANIA </span>
                <span style={{ color: 'hsl(35 95% 50%)' }}>ALIMENTAR</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
                Produzir, conservar e armazenar. Reduzir a dependência estrutural de alimento industrializado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULOS_ALIMENTACAO.map((mod, i) => {
                const ModIcon = mod.icon;
                const isFeatured = i === 0;
                return (
                  <motion.div key={mod.title}
                    className={`gsap-reveal ${isFeatured ? 'lg:row-span-2' : ''}`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: APPLE_EASE }}>
                    <Link to={mod.link}
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-amber-500/25 ${isFeatured ? 'h-full p-8 md:p-10' : 'p-6'}`}
                      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(6px)' }}
                      aria-label={`${mod.title} — ${mod.desc}`}>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(200,150,50,0.06), transparent 60%)' }} />
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(90deg, transparent, hsl(35 95% 50% / 0.4), transparent)' }} />

                      <div className="relative z-10 flex-1 flex flex-col">
                        <span className="text-[64px] md:text-[80px] font-black leading-none tracking-tighter opacity-[0.04] absolute -top-2 -right-2 select-none pointer-events-none"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{mod.numero}</span>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-amber-900/25 rounded-xl group-hover:bg-amber-800/35 transition-colors">
                            <ModIcon className="text-amber-400" size={isFeatured ? 22 : 18} aria-hidden="true" />
                          </div>
                          <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                            mod.tag === 'Publicado'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-amber-500/15 text-amber-400'
                          }`}>{mod.tag}</span>
                        </div>

                        <h3 className={`text-stone-200 font-bold mb-2 ${isFeatured ? 'text-xl md:text-2xl' : 'text-sm'}`}>
                          {mod.title}
                        </h3>
                        <p className={`text-stone-500 leading-relaxed flex-1 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                          {mod.desc}
                        </p>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-amber-400 transition-colors">
                            Acessar módulo
                          </span>
                          <ArrowRight className="text-stone-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            MANIFESTO ENCERRAMENTO — Immersive block
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-32 px-6 md:px-16 lg:px-24 gsap-reveal" aria-labelledby="manifesto-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(40 92% 56% / 0.1), transparent)' }} />

          <div className="max-w-5xl mx-auto">
            <motion.div className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-10 md:p-16 lg:p-20"
              style={{ background: 'linear-gradient(135deg, rgba(30,25,18,0.8), rgba(20,18,15,0.9))', backdropFilter: 'blur(12px)' }}
              whileHover={{ rotateX: -1, rotateY: 1 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}>

              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(180,140,50,0.08), transparent 70%)' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <BookOpen className="text-amber-400" size={22} aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'hsl(40 92% 56% / 0.7)' }}>
                    Por que isso importa
                  </span>
                </div>

                <h2 id="manifesto-heading" className="sr-only">Por que isso importa</h2>

                <div className="max-w-3xl space-y-8">
                  <p className="text-stone-200 text-xl md:text-2xl leading-relaxed font-light"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Quando uma geração perde a capacidade de identificar uma planta, de preparar um alimento sem embalagem, de entender o que o próprio corpo está dizendo — ela se torna dependente.
                  </p>
                  <p className="text-stone-400 text-base md:text-lg leading-relaxed">
                    Dependente de quem vende o remédio. De quem embala o alimento. De quem interpreta os sintomas. De quem define o que é "saudável". Não é teoria. É o que aconteceu.
                  </p>
                  <p className="text-stone-400 text-base md:text-lg leading-relaxed">
                    Aqui não se trata de rejeitar a medicina moderna ou viver isolado. Se trata de <span className="font-semibold" style={{ color: 'hsl(40 92% 56%)' }}>não depender exclusivamente de um sistema que pode falhar</span>. De ter autonomia para cuidar do básico. De reconhecer que o conhecimento que sustentou famílias por séculos não é "ultrapassado" — é <span className="text-stone-200 font-bold">fundamento</span>.
                  </p>

                  <blockquote className="border-l-[3px] pl-8 py-4 mt-10" style={{ borderColor: 'hsl(40 92% 56% / 0.3)' }}>
                    <p className="text-lg md:text-xl italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: 'hsl(40 92% 56% / 0.6)' }}>
                      "Meu avô dizia: quem conhece a terra, nunca passa fome. Quem conhece as plantas, raramente fica doente. E quem conhece os dois, tem o que nenhum governo pode tirar."
                    </p>
                  </blockquote>
                </div>

                <div className="mt-12 pt-8 border-t border-white/[0.06]">
                  <p className="text-stone-600 text-xs leading-relaxed max-w-2xl">
                    Este projeto é uma tentativa de documentar e preservar o que foi passado de geração em geração. O conteúdo é técnico, referenciado e organizado para consulta prática — não para substituir tratamento médico, mas para devolver a autonomia que sempre foi sua.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA — CONHECIMENTO PERDIDO — Featured card
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-20 px-6 md:px-16 lg:px-24 gsap-reveal" aria-label="Módulo Especial: Conhecimento Perdido">
          <div className="max-w-5xl mx-auto">
            <motion.div whileHover={{ scale: 1.01, y: -4 }} transition={{ duration: 0.5, ease: APPLE_EASE }}>
              <Link to="/projeto-autonomo/conhecimento-perdido"
                className="group relative flex items-center gap-8 overflow-hidden rounded-3xl border border-amber-600/15 p-10 md:p-14 transition-all duration-500 hover:border-amber-500/30"
                style={{ background: 'linear-gradient(135deg, rgba(40,30,15,0.5), rgba(25,20,12,0.6))', backdropFilter: 'blur(8px)' }}>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(180,140,50,0.06), transparent 70%)' }} />

                <div className="relative z-10 flex items-center gap-6 md:gap-10 flex-col md:flex-row w-full">
                  <div className="p-5 bg-amber-700/15 border border-amber-600/20 rounded-2xl shrink-0 group-hover:bg-amber-700/25 transition-colors">
                    <BookOpen className="text-amber-400" size={28} aria-hidden="true" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: 'hsl(40 92% 56% / 0.6)' }}>Módulo Especial</span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-stone-200 mt-2 mb-3 uppercase tracking-wide"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                      CONHECIMENTO PERDIDO
                    </h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-xl">
                      Fundamentos naturais aplicados à saúde, alimentação e resiliência. 12 plantas organizadas por sistema corporal com fichas técnicas completas, dosagens, contraindicações e educação botânica familiar.
                    </p>
                  </div>
                  <ArrowRight className="text-stone-700 group-hover:text-amber-400 group-hover:translate-x-2 transition-all duration-500 shrink-0" size={28} />
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        <MicroCtaResistencia variant="conhecimento" />

        {/* ─── CTA FINAL ─── */}
        <div className="relative py-20 px-6 md:px-16 lg:px-24 gsap-reveal">
          <div className="text-center">
            <Link to="/projeto-autonomo"
              className="inline-flex items-center gap-3 text-stone-600 hover:text-amber-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-3 py-2"
              aria-label="Voltar ao Soberania Orgânica">
              <ArrowLeft size={14} aria-hidden="true" /> Voltar ao Soberania Orgânica
            </Link>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
