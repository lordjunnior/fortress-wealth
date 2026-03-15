import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Leaf, Shield, AlertTriangle, Droplets, Flame, FlaskConical, Package, Activity, XCircle, ChevronRight, Heart, Thermometer, Sun, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANTAS } from '@/lib/plantData';
import CinematicHero from '@/components/CinematicHero';

import imgMetodosPreparo from '@/assets/bio-metodos-preparo.jpg';
import imgArmazenamento from '@/assets/bio-armazenamento.jpg';

gsap.registerPlugin(ScrollTrigger);

const METODOS_PREPARO = [
  {
    titulo: 'Infusão',
    indicacao: 'Folhas e flores — compostos voláteis e delicados',
    passos: ['200 ml de água a 90–95°C', '1 colher de sopa da planta seca', 'Abafar por 5–10 minutos', 'Coar imediatamente'],
    resultado: 'Preserva flavonoides e óleos essenciais.',
    icon: Droplets,
  },
  {
    titulo: 'Decocção',
    indicacao: 'Raízes, cascas, sementes duras — estruturas fibrosas',
    passos: ['200 ml de água', 'Adicionar planta', 'Ferver 5–15 minutos', 'Descansar 5 minutos', 'Coar'],
    resultado: 'Extrai taninos e alcaloides resistentes.',
    icon: Flame,
  },
  {
    titulo: 'Tintura',
    indicacao: 'Extração concentrada — maior durabilidade',
    passos: ['Planta seca', 'Álcool de cereais 70%', 'Proporção 1:5', 'Macerar 15–30 dias', 'Agitar diariamente', 'Filtrar'],
    resultado: 'Maior durabilidade e concentração.',
    icon: FlaskConical,
  },
  {
    titulo: 'Uso Tópico',
    indicacao: 'Pomada / gel / cataplasma',
    passos: ['Inflamação local', 'Hematoma', 'Irritação', 'Feridas superficiais'],
    resultado: 'Aplicação direta sobre a pele.',
    icon: Package,
  },
];

export default function AutonomiaBiologica() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Card reveals with stagger + blur
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 50, filter: 'blur(6px)', scale: 0.96 },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
            duration: 0.8,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Section reveals
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Parallax on hero images
      const parallaxImages = containerRef.current?.querySelectorAll('.parallax-img');
      parallaxImages?.forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Autonomia Biológica: 12 Plantas Medicinais com Fichas Técnicas Completas | Lord Junnior</title>
        <meta name="description" content="Biblioteca técnica de 12 plantas medicinais essenciais com dosagens, contraindicações, métodos de preparo e mecanismos de ação. Biohacking e saúde soberana documentados com rigor farmacológico." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/autonomia-biologica" />
        <meta property="og:title" content="Autonomia Biológica: Protocolos de Biohacking e Saúde Soberana" />
        <meta property="og:description" content="12 plantas medicinais documentadas com rigor farmacológico. Fichas técnicas, dosagens seguras e métodos de preparo validados." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/autonomia-biologica" />
      </Helmet>
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/30"
      style={{ background: 'linear-gradient(180deg, #050808 0%, #060806 6%, #0a0f0a 15%, #0d150d 30%, #0a0f0a 60%, #060806 85%, #050808 100%)' }}>

      <CinematicHero
        image="/heroes/suporte-fitoterapico.webp"
        phase="Fase 02 · Autonomia Biológica"
        title="Suporte Fitoterápico"
        subtitle="Biblioteca técnica de 12 plantas medicinais documentadas com rigor farmacológico. Cada planta possui sua própria ficha completa."
        icon={Leaf}
        accentColor="emerald"
        backLink="/projeto-autonomo"
        backLabel="Projeto Autônomo"
      />

      {/* Fixed ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">

        {/* Intro context */}
        <section className="mb-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl mb-8">
            {['Foto da planta', 'Nome científico', 'Para que serve', 'Preparo correto', 'Limite de uso', 'Contraindicações'].map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <Activity size={14} className="text-emerald-500 shrink-0" />
                <span className="text-stone-300">{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-5 max-w-3xl">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-stone-200 leading-relaxed">
                  <span className="text-red-400 font-bold">Não substitui tratamento médico.</span> Material educativo baseado em farmacopeias reconhecidas.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {['Febre > 38,5°C', 'Piora após 48h', 'Dor intensa', 'Gestante/lactante'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-stone-400">
                      <XCircle size={11} className="text-red-400 shrink-0" />
                      {item} → buscar médico
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CATÁLOGO DE PLANTAS ═══ */}
        <section className="mb-28">
          <div className="mb-10">
            <span className="text-emerald-500/40 text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">Catálogo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              12 Plantas Essenciais
            </h2>
            <p className="text-stone-500 text-sm mt-2">Clique em cada planta para acessar a ficha técnica completa.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLANTAS.map((p, i) => (
              <Link
                key={p.slug}
                ref={(el) => { cardsRef.current[i] = el; }}
                to={`/projeto-autonomo/planta/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 hover:border-white/15 transition-all duration-700 block"
                style={{ perspective: '800px' }}
              >
                {/* Image with parallax */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <img src={p.imagem} alt={`${p.nome} — ${p.cientifico}`}
                    className="parallax-img absolute inset-0 w-full h-[130%] object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060806] via-[#060806]/40 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-700" />

                  {/* Number badge */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-[#060806]">
                  <h3 className={`text-xl font-bold ${p.accent} mb-0.5 group-hover:translate-x-1 transition-transform duration-500`}>
                    {p.nome}
                  </h3>
                  <p className="text-stone-600 text-xs italic mb-3">{p.cientifico}</p>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4">{p.resumo}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.melhora.slice(0, 3).map((m) => (
                      <span key={m} className={`text-[10px] ${p.accentBg} ${p.accent} border ${p.accentBorder} px-2 py-0.5 rounded-full`}>
                        {m}
                      </span>
                    ))}
                    {p.melhora.length > 3 && (
                      <span className="text-[10px] bg-white/5 text-stone-500 px-2 py-0.5 rounded-full">
                        +{p.melhora.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-500">
                    <span>Ver ficha completa</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ MÉTODOS DE PREPARO ═══ */}
        <section ref={(el) => { sectionsRef.current[0] = el; }} className="mb-28">
          <div className="mb-10">
            <span className="text-emerald-500/40 text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">Técnicas</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Métodos de Preparo
            </h2>
          </div>

          <div className="mb-10 rounded-2xl overflow-hidden relative h-64 md:h-80">
            <img src={imgMetodosPreparo} alt="Métodos de preparo fitoterápico"
              className="parallax-img absolute inset-0 w-full h-[130%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060806] via-[#060806]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400/60">
                Infusão · Decocção · Tintura · Uso Tópico
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {METODOS_PREPARO.map((m) => (
              <div key={m.titulo} className="bg-emerald-500/3 border border-emerald-500/10 rounded-xl p-6 hover:bg-emerald-500/6 hover:border-emerald-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <m.icon size={20} className="text-emerald-400" />
                  <h4 className="font-bold text-stone-200 text-lg">{m.titulo}</h4>
                </div>
                <p className="text-xs text-emerald-500/50 font-bold tracking-wider uppercase mb-4">{m.indicacao}</p>
                <div className="space-y-1.5 mb-4">
                  {m.passos.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-stone-400">
                      <span className="text-[10px] text-stone-600 w-4">{i + 1}.</span>
                      {p}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-600 italic border-t border-white/5 pt-3">{m.resultado}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONSERVAÇÃO ═══ */}
        <section ref={(el) => { sectionsRef.current[1] = el; }} className="mb-28">
          <div className="mb-10">
            <span className="text-emerald-500/40 text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">Armazenamento</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Conservação
            </h2>
          </div>

          <div className="mb-8 rounded-2xl overflow-hidden relative h-64 md:h-80">
            <img src={imgArmazenamento} alt="Armazenamento de ervas"
              className="parallax-img absolute inset-0 w-full h-[130%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060806] via-[#060806]/30 to-transparent" />
          </div>

          <div className="bg-amber-500/3 border border-amber-500/10 rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-bold mb-6 text-stone-200">Plantas secas — armazenamento correto</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Pote de vidro escuro', icon: Package },
                { label: 'Ambiente seco', icon: Thermometer },
                { label: 'Sem luz direta', icon: Sun },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-amber-500/8 border border-amber-500/15 p-4 rounded-xl">
                  <item.icon size={18} className="text-amber-400 shrink-0" />
                  <span className="text-sm text-stone-300">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-l-2 border-amber-500/40 pl-4">
                <span className="text-amber-400 font-bold text-sm">Validade</span>
                <p className="text-stone-500 text-sm mt-1">6–12 meses</p>
              </div>
              <div className="border-l-2 border-emerald-500/40 pl-4">
                <span className="text-emerald-400 font-bold text-sm">Tinturas</span>
                <p className="text-stone-500 text-sm mt-1">Até 2 anos</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DOSAGENS SEGURAS ═══ */}
        <section ref={(el) => { sectionsRef.current[2] = el; }} className="mb-28">
          <div className="mb-10">
            <span className="text-emerald-500/40 text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">Referência Rápida</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dosagens Seguras
            </h2>
          </div>
          <div className="bg-emerald-500/3 border border-emerald-500/10 rounded-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-2 border-emerald-500/40 pl-4">
                <span className="text-emerald-400 font-bold text-sm">Planta seca</span>
                <p className="text-stone-500 text-sm mt-1">1 colher de sopa / 200 ml</p>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-4">
                <span className="text-amber-400 font-bold text-sm">Crianças</span>
                <p className="text-stone-500 text-sm mt-1">50% da dose adulta</p>
              </div>
              <div className="border-l-2 border-sky-500/40 pl-4">
                <span className="text-sky-400 font-bold text-sm">Idosos</span>
                <p className="text-stone-500 text-sm mt-1">Iniciar com 50%</p>
              </div>
              <div className="border-l-2 border-red-500/40 pl-4">
                <span className="text-red-400 font-bold text-sm">Uso contínuo</span>
                <p className="text-stone-500 text-sm mt-1">7–14 dias máximo</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DISCLAIMER ═══ */}
        <section ref={(el) => { sectionsRef.current[3] = el; }} className="mb-16">
          <div className="bg-stone-900/50 border border-stone-700/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Este conteúdo é de caráter educativo e informativo. Não substitui consulta médica, diagnóstico ou tratamento profissional.
                  Consulte sempre um profissional de saúde antes de iniciar qualquer prática fitoterápica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NAV FOOTER ═══ */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
          <Link to="/projeto-autonomo"
            className="flex-1 flex items-center justify-center gap-2 bg-white/3 border border-white/8 rounded-xl px-6 py-4 text-stone-400 text-sm font-bold hover:bg-white/5 hover:text-emerald-400 transition-all duration-500">
            <ArrowLeft size={16} />
            Projeto Autônomo
          </Link>
          <Link to="/projeto-autonomo/fitoterapia-aplicada"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 transition-all duration-500 group">
            Fitoterapia Aplicada
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}
