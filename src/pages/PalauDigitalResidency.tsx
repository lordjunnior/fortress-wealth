import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Compass,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wallet,
  Globe2,
  Building2,
  KeyRound,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import BackToHome from "@/components/BackToHome";

import heroImg from "@/assets/palau-v5-hero.jpg";
import clarityImg from "@/assets/palau-v5-clarity.jpg";
import exchangeImg from "@/assets/palau-v5-exchange.jpg";
import neobankImg from "@/assets/palau-v5-neobank.jpg";
import islandImg from "@/assets/palau-v5-island.jpg";
import bankImg from "@/assets/palau-v5-bank.jpg";
import ctaImg from "@/assets/palau-v5-cta.jpg";

/* ────────────────────────────────────────────────
   PALAU — EDITORIAL EDITION (v5)
   Paleta: Cream / Terracotta / Navy / Clay / Ink
   Type: Fraunces (display) + Inter Tight (body)
   ──────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const PalauDigitalResidency = () => {
  const heroRef = useRef<HTMLElement>(null);
  const islandRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 1], [0.45, 0.85]);
  const heroTitleY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  const { scrollYProgress: islandScroll } = useScroll({
    target: islandRef,
    offset: ["start end", "end start"],
  });
  const islandY = useTransform(islandScroll, [0, 1], ["-15%", "20%"]);

  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaY = useTransform(ctaScroll, [0, 1], ["-10%", "10%"]);

  // Reveal observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("is-in");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>ID de Palau — Identidade Soberana Internacional | Lord Junnior</title>
        <meta
          name="description"
          content="ID de Palau: identidade emitida por governo soberano. Entenda onde funciona, limites reais e como integrar a uma estratégia internacional."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
        .palau-v5 {
          --cream: #F4EEE2;
          --cream-soft: #EFE7D6;
          --cream-deep: #E5DAC4;
          --terracotta: #B8593A;
          --terracotta-soft: #D17A5B;
          --clay: #C89671;
          --navy: #1B2845;
          --navy-soft: #2D3E5F;
          --ink: #1A1614;
          --ink-soft: #4A413B;
          --gold: #B8923D;
          --line: rgba(26, 22, 20, 0.08);
          --line-strong: rgba(26, 22, 20, 0.16);
        }
        .palau-v5 {
          background: var(--cream);
          color: var(--ink);
          font-family: 'Inter Tight', system-ui, sans-serif;
          font-weight: 400;
          letter-spacing: -0.005em;
        }
        .palau-v5 .display { font-family: 'Fraunces', serif; font-optical-sizing: auto; letter-spacing: -0.025em; line-height: 0.95; }
        .palau-v5 .display-italic { font-family: 'Fraunces', serif; font-style: italic; font-weight: 400; letter-spacing: -0.02em; }
        .palau-v5 .eyebrow { font-family: 'Inter Tight', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; }
        .palau-v5 .body-lg { font-size: clamp(1.05rem, 1.4vw, 1.35rem); line-height: 1.65; font-weight: 300; color: var(--ink-soft); }
        .palau-v5 .body { font-size: 1rem; line-height: 1.75; font-weight: 400; color: var(--ink-soft); }
        .palau-v5 .body-sm { font-size: 0.9rem; line-height: 1.7; font-weight: 400; color: var(--ink-soft); }

        .palau-v5 .reveal { opacity: 0; transform: translateY(36px); transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1); }
        .palau-v5 .reveal.is-in { opacity: 1; transform: none; }
        .palau-v5 .reveal.delay-1 { transition-delay: 0.12s; }
        .palau-v5 .reveal.delay-2 { transition-delay: 0.24s; }
        .palau-v5 .reveal.delay-3 { transition-delay: 0.36s; }

        /* Premium button */
        .palau-v5 .btn-primary {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 0.85rem;
          padding: 1.15rem 2.4rem;
          background: var(--ink); color: var(--cream);
          font-family: 'Inter Tight', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          border-radius: 999px;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v5 .btn-primary::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: var(--terracotta);
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.65,0,0.35,1);
        }
        .palau-v5 .btn-primary:hover { transform: translateY(-3px); }
        .palau-v5 .btn-primary:hover::before { transform: translateY(0); }

        .palau-v5 .btn-ghost {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 0.85rem;
          padding: 1.15rem 2.4rem;
          background: transparent; color: var(--ink);
          border: 1px solid var(--line-strong);
          font-family: 'Inter Tight', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          border-radius: 999px;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .palau-v5 .btn-ghost:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); transform: translateY(-3px); }

        /* Marquee */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .palau-v5 .marquee-track { animation: marquee 38s linear infinite; }

        /* Card hover */
        .palau-v5 .card-app { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s; }
        .palau-v5 .card-app:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -20px rgba(26,22,20,0.18); }
        .palau-v5 .card-app .card-img { transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .palau-v5 .card-app:hover .card-img { transform: scale(1.06); }

        /* Number ticker */
        .palau-v5 .num-mega {
          font-family: 'Fraunces', serif;
          font-size: clamp(8rem, 22vw, 22rem);
          font-weight: 300; line-height: 0.85;
          color: var(--terracotta); letter-spacing: -0.04em;
        }

        /* FAQ */
        .palau-v5 details { border-bottom: 1px solid var(--line); }
        .palau-v5 details summary { list-style: none; cursor: pointer; padding: 1.6rem 0; display: flex; justify-content: space-between; align-items: center; gap: 2rem; }
        .palau-v5 details summary::-webkit-details-marker { display: none; }
        .palau-v5 details[open] .faq-icon { transform: rotate(180deg); background: var(--terracotta); border-color: var(--terracotta); color: var(--cream); }
        .palau-v5 .faq-icon { transition: all 0.35s cubic-bezier(0.22,1,0.36,1); }

        /* Step underline */
        .palau-v5 .step-line { background: linear-gradient(to bottom, var(--terracotta) 0%, var(--clay) 100%); }
      `}</style>

      <main className="palau-v5 min-h-screen">
        {/* ════════ HERO — FULL BLEED EDITORIAL ════════ */}
        <section ref={heroRef} className="relative h-[100vh] min-h-[720px] overflow-hidden">
          {/* Background image with parallax */}
          <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
            <img src={heroImg} alt="ID de Palau sobre mapa do Pacífico" className="w-full h-full object-cover" style={{ transform: "scale(1.15)" }} fetchPriority="high" />
          </motion.div>

          {/* Cream warm overlay */}
          <motion.div
            className="absolute inset-0 z-[1]"
            style={{
              opacity: heroOverlayOpacity,
              background:
                "linear-gradient(180deg, rgba(244,238,226,0.2) 0%, rgba(244,238,226,0.05) 35%, rgba(244,238,226,0.7) 80%, rgba(244,238,226,0.98) 100%)",
            }}
          />

          {/* Top nav strip */}
          <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 py-7 flex items-center justify-between">
            <Link to="/" className="eyebrow text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors">
              Lord Junnior · Soberania
            </Link>
            <div className="hidden md:flex items-center gap-8 eyebrow text-[var(--ink-soft)]">
              <span>Vol. 03</span>
              <span>2026</span>
              <span className="text-[var(--terracotta)]">Identidade Internacional</span>
            </div>
          </div>

          {/* Hero content */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24"
            style={{ y: heroTitleY }}
          >
            <div className="max-w-[1500px] mx-auto w-full">
              <div className="grid grid-cols-12 gap-6 items-end">
                {/* Side meta */}
                <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.6, ease: EASE }}>
                    <div className="eyebrow text-[var(--terracotta)] mb-3">Edição Especial</div>
                    <div className="space-y-2.5 border-l border-[var(--line-strong)] pl-5">
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--ink-soft)] opacity-60">Emitido por</div>
                        <div className="display text-lg text-[var(--ink)]">República de Palau</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--ink-soft)] opacity-60">Categoria</div>
                        <div className="display text-lg text-[var(--ink)]">Identidade Soberana</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Title */}
                <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                    <div className="eyebrow text-[var(--terracotta)] mb-5">Estratégia Avançada · Soberania</div>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
                    className="display text-[var(--ink)]"
                    style={{ fontSize: "clamp(4rem, 12vw, 13rem)", fontWeight: 400 }}
                  >
                    ID de <span className="display-italic" style={{ color: "var(--terracotta)" }}>Palau</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                    className="display-italic text-[var(--ink-soft)] mt-5 max-w-2xl"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.7rem)", lineHeight: 1.45 }}
                  >
                    Uma identidade emitida por um governo soberano, fora da sua jurisdição principal — a ferramenta que poucos entendem e menos ainda usam corretamente.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-3"
          >
            <span className="eyebrow text-[var(--ink-soft)] [writing-mode:vertical-rl]">explorar</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} className="text-[var(--terracotta)]" />
            </motion.div>
          </motion.div>
        </section>

        {/* ════════ MARQUEE STRIP ════════ */}
        <section className="border-y border-[var(--line)] bg-[var(--cream-soft)] py-5 overflow-hidden">
          <div className="flex marquee-track whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12 pr-12 shrink-0">
                {["Identidade Soberana", "Processo 100% Online", "Cartão Físico Internacional", "Camada Complementar", "Estado Reconhecido", "Privacidade Operacional", "Acesso Internacional"].map((t, i) => (
                  <span key={i} className="flex items-center gap-12">
                    <span className="display-italic text-[1.4rem] text-[var(--ink)]">{t}</span>
                    <span className="text-[var(--terracotta)] text-2xl">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ════════ CHAPTER 01 — CLAREZA ════════ */}
        <section className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36">
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-20">
              <div className="col-span-12 lg:col-span-5 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 01 · Clareza</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}>
                  O que <span className="display-italic" style={{ color: "var(--terracotta)" }}>não é</span><br />
                  e o que <span className="display-italic" style={{ color: "var(--navy)" }}>realmente</span> é
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal delay-1 flex items-end">
                <p className="body-lg">
                  A maioria erra porque não entende o documento antes de obtê-lo. Clareza primeiro — estrutura depois. Esse é o único caminho para extrair valor real de uma identidade internacional.
                </p>
              </div>
            </div>

            {/* Image + lists */}
            <div className="grid grid-cols-12 gap-6 lg:gap-10">
              {/* Image */}
              <div className="col-span-12 lg:col-span-5 reveal">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img src={clarityImg} alt="Documentos de viagem e mapa de Palau" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute bottom-5 left-5 right-5 bg-[var(--cream)]/95 backdrop-blur p-5 border-l-2 border-[var(--terracotta)]">
                    <div className="eyebrow text-[var(--terracotta)] mb-1.5">Princípio</div>
                    <div className="display-italic text-[var(--ink)] text-lg leading-snug">Ferramenta não é estratégia. Documento não é arquitetura.</div>
                  </div>
                </div>
              </div>

              {/* Lists */}
              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Não é */}
                <div className="reveal delay-1">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center">
                      <XCircle size={16} className="text-[var(--terracotta)]" />
                    </div>
                    <span className="eyebrow text-[var(--terracotta)]">Não é</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Cidadania completa de Palau",
                      "Residência tradicional ou fiscal",
                      "Passaporte para viagens internacionais",
                      "Acesso universal a bancos e serviços",
                      "Solução isolada para estruturas financeiras",
                    ].map((t, i) => (
                      <li key={i} className="display text-[var(--ink)] text-[1.05rem] leading-snug pl-4 border-l border-[var(--terracotta)]/30" style={{ fontWeight: 400 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* É */}
                <div className="reveal delay-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--line)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--navy)]/10 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-[var(--navy)]" />
                    </div>
                    <span className="eyebrow text-[var(--navy)]">É</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Identidade emitida por governo soberano reconhecido",
                      "Utilidade prática em onboarding internacional",
                      "Peça complementar de uma estrutura maior",
                      "Camada adicional com baixo custo de entrada",
                      "Ferramenta real dentro da estratégia correta",
                    ].map((t, i) => (
                      <li key={i} className="display text-[var(--ink)] text-[1.05rem] leading-snug pl-4 border-l border-[var(--navy)]/40" style={{ fontWeight: 400 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 02 — APLICAÇÃO PRÁTICA (BENTO) ════════ */}
        <section className="relative bg-[var(--cream-soft)] px-6 md:px-12 lg:px-16 py-24 md:py-36 border-y border-[var(--line)]">
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-12 gap-6 mb-16 items-end">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 02 · Aplicação Prática</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}>
                  Onde <span className="display-italic" style={{ color: "var(--terracotta)" }}>funciona</span><br />
                  de fato
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal delay-1">
                <p className="body-lg" style={{ borderLeft: "2px solid var(--terracotta)", paddingLeft: "1.25rem" }}>
                  Nem toda utilidade é universal. O valor está em casos específicos — entender esses casos é o que diferencia o uso inteligente do ingênuo.
                </p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-12 gap-3 md:gap-4">
              {/* Card 1 — large left */}
              <article className="card-app col-span-12 lg:col-span-7 lg:row-span-2 relative overflow-hidden rounded-sm bg-[var(--cream)] reveal min-h-[480px] lg:min-h-[640px]">
                <div className="absolute inset-0">
                  <img src={exchangeImg} alt="Exchange internacional no celular" loading="lazy" className="card-img w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,22,20,0.05) 0%, rgba(26,22,20,0.45) 60%, rgba(26,22,20,0.92) 100%)" }} />
                </div>
                <div className="relative h-full flex flex-col justify-end p-7 md:p-10 text-[var(--cream)]">
                  <div className="eyebrow text-[var(--cream)]/70 mb-3">Mercado Cripto</div>
                  <h3 className="display text-[var(--cream)] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                    Exchanges<br /><span className="display-italic" style={{ color: "var(--clay)" }}>internacionais</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-5 max-w-md">
                    {["Coinbase", "Bitget", "Gate.io", "KuCoin", "CEX.IO", "MEXC"].map((n, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-[var(--cream)]/15 py-2">
                        <span className="text-[var(--cream)]/85 text-sm">{n}</span>
                        <ArrowUpRight size={14} className="text-[var(--clay)]" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs italic text-[var(--cream)]/55 max-w-md">
                    Sujeito a mudanças de compliance. Verificar política atual em cada plataforma.
                  </div>
                </div>
              </article>

              {/* Card 2 — neobank */}
              <article className="card-app col-span-12 md:col-span-6 lg:col-span-5 relative overflow-hidden rounded-sm bg-[var(--cream)] reveal delay-1 min-h-[300px]">
                <div className="absolute inset-0">
                  <img src={neobankImg} alt="Cartão neobank" loading="lazy" className="card-img w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(244,238,226,0.4) 0%, rgba(244,238,226,0.92) 80%)" }} />
                </div>
                <div className="relative h-full flex flex-col justify-end p-7 md:p-9">
                  <Wallet size={22} className="text-[var(--terracotta)] mb-4" />
                  <div className="eyebrow text-[var(--terracotta)] mb-2">Serviços Financeiros</div>
                  <h3 className="display text-[var(--ink)] mb-4" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
                    Neobanks & <span className="display-italic">fintechs</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Kingdom Bank", "Vexel", "Ultimopay", "Blackcatcard"].map((n) => (
                      <span key={n} className="text-xs px-3 py-1.5 bg-[var(--ink)]/5 text-[var(--ink)] rounded-full">{n}</span>
                    ))}
                  </div>
                </div>
              </article>

              {/* Card 3 — privacy */}
              <article className="card-app col-span-12 md:col-span-6 lg:col-span-5 relative overflow-hidden rounded-sm reveal delay-2 min-h-[300px]" style={{ background: "var(--navy)" }}>
                <div className="relative h-full flex flex-col justify-between p-7 md:p-9 text-[var(--cream)]">
                  <div>
                    <ShieldCheck size={22} className="text-[var(--clay)] mb-4" />
                    <div className="eyebrow text-[var(--clay)] mb-2">Privacidade Operacional</div>
                    <h3 className="display text-[var(--cream)]" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
                      Jurisdição <span className="display-italic">paralela</span>
                    </h3>
                  </div>
                  <p className="body-sm text-[var(--cream)]/65 mt-6">
                    Menor exposição direta da jurisdição de origem em contextos operacionais e de verificação internacional.
                  </p>
                </div>
              </article>

              {/* Card 4 — operational (full width small) */}
              <article className="card-app col-span-12 lg:col-span-12 relative overflow-hidden rounded-sm reveal delay-3 min-h-[200px]" style={{ background: "var(--cream)" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
                  {[
                    { icon: Globe2, eyebrow: "Operacional", title: "Onboarding Internacional", text: "Camada documental adicional para verificação em plataformas globais." },
                    { icon: Compass, eyebrow: "Estratégico", title: "Mobilidade Patrimonial", text: "Integração a estruturas internacionais de patrimônio e mobilidade." },
                    { icon: KeyRound, eyebrow: "Documental", title: "Redundância Soberana", text: "Documento de respaldo em arquiteturas de soberania pessoal." },
                  ].map((b, i) => {
                    const Ic = b.icon;
                    return (
                      <div key={i} className="p-7 md:p-9 border-r last:border-r-0 border-[var(--line)] flex flex-col justify-between">
                        <Ic size={22} className="text-[var(--terracotta)] mb-4" />
                        <div>
                          <div className="eyebrow text-[var(--terracotta)] mb-2">{b.eyebrow}</div>
                          <h4 className="display text-[var(--ink)] mb-2.5" style={{ fontSize: "1.45rem" }}>{b.title}</h4>
                          <p className="body-sm">{b.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 03 — QUEBRA DE CRENÇA (99%) ════════ */}
        <section className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36 overflow-hidden bg-[var(--cream)]">
          <div className="max-w-[1500px] mx-auto relative">
            <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* Left: Mega 99% */}
              <div className="col-span-12 lg:col-span-6 reveal relative">
                <div className="eyebrow text-[var(--terracotta)] mb-4">Capítulo 03 · Quebra de Crença</div>
                <div className="num-mega leading-none">
                  99<span className="display-italic" style={{ fontSize: "0.4em", color: "var(--ink)" }}>%</span>
                </div>
                <p className="display-italic text-[var(--ink-soft)] mt-2" style={{ fontSize: "1.5rem" }}>
                  cometem o mesmo erro
                </p>
              </div>

              {/* Right: Content */}
              <div className="col-span-12 lg:col-span-6 reveal delay-1">
                <h2 className="display text-[var(--ink)] mb-7" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  O erro não é <span className="display-italic" style={{ color: "var(--terracotta)" }}>comprar</span> o ID.<br />
                  É não saber <span className="display-italic" style={{ color: "var(--navy)" }}>usá-lo</span>.
                </h2>
                <p className="body-lg mb-10">
                  Comprar o ID e imaginar que ele sozinho resolve tudo. É o erro de quem comprou uma peça e achou que tinha o tabuleiro completo.
                </p>

                <div className="space-y-1">
                  {[
                    { n: "01", t: "Comprovante de endereço", d: "Plataformas exigem comprovante de residência válido — independente do documento de identidade." },
                    { n: "02", t: "Número de telefone local", d: "Em alguns casos exige-se verificação por número da jurisdição declarada." },
                    { n: "03", t: "Documentação complementar", d: "O ID raramente opera sozinho — precisa de documentos de suporte para ativação completa." },
                    { n: "04", t: "Alinhamento residência × identidade", d: "Report fiscal depende da residência informada e da política da instituição." },
                    { n: "05", t: "Estratégia estruturada", d: "Sem arquitetura clara, o documento é uma ferramenta sem contexto." },
                  ].map((item) => (
                    <div key={item.n} className="grid grid-cols-12 gap-4 py-5 border-b border-[var(--line)] group">
                      <div className="col-span-2 md:col-span-1">
                        <span className="display-italic text-[var(--terracotta)]" style={{ fontSize: "1.15rem" }}>{item.n}</span>
                      </div>
                      <div className="col-span-10 md:col-span-11">
                        <h4 className="display text-[var(--ink)] mb-1.5" style={{ fontSize: "1.15rem", fontWeight: 500 }}>{item.t}</h4>
                        <p className="body-sm">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 04 — LIMITAÇÕES (split image+text) ════════ */}
        <section className="relative bg-[var(--navy)] text-[var(--cream)] overflow-hidden">
          <div className="grid grid-cols-12 min-h-[100vh]">
            {/* Image left */}
            <div className="col-span-12 lg:col-span-5 relative min-h-[400px] lg:min-h-[100vh]">
              <img src={bankImg} alt="Banco tradicional clássico" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(27,40,69,0.2) 0%, rgba(27,40,69,0.8) 100%)" }} />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="eyebrow text-[var(--clay)] mb-2">Limite Real</div>
                <h3 className="display text-[var(--cream)]" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                  Onde <span className="display-italic">não</span> resolve
                </h3>
              </div>
            </div>

            {/* Content right */}
            <div className="col-span-12 lg:col-span-7 px-6 md:px-12 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
              <div className="max-w-3xl">
                <div className="eyebrow text-[var(--clay)] mb-5 reveal">Capítulo 04 · Honestidade Estratégica</div>
                <h2 className="display text-[var(--cream)] mb-8 reveal delay-1" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                  Um documento útil <span className="display-italic" style={{ color: "var(--clay)" }}>não é</span> um documento <span className="display-italic">total</span>.
                </h2>
                <p className="body-lg text-[var(--cream)]/65 mb-12 reveal delay-2">
                  Clareza antes de qualquer decisão. Vender ilusão é o jogo dos amadores. Vender ferramenta dentro de estratégia é o jogo de quem entrega resultado real.
                </p>

                <div className="space-y-7 reveal delay-3">
                  {[
                    { tag: "Não aceito", title: "Bancos tradicionais clássicos", text: "Bancos convencionais não aceitam apenas um ID local. Passaporte e comprovante robusto continuam padrão." },
                    { tag: "Insuficiente", title: "Comprovação de residência", text: "Não substitui comprovante de endereço. Muitas instituições exigem evidência de residência física." },
                    { tag: "Não aplicável", title: "Substituição de passaporte", text: "Não é passaporte. Não permite viagens internacionais nem substitui o documento principal nacional." },
                    { tag: "Limitado", title: "Planejamento fiscal isolado", text: "Report fiscal depende da residência declarada. Sem estrutura completa, é ferramenta sem contexto." },
                  ].map((l, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 pb-7 border-b border-[var(--cream)]/10">
                      <div className="col-span-12 md:col-span-3">
                        <span className="eyebrow text-[var(--clay)]">{l.tag}</span>
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h4 className="display text-[var(--cream)] mb-2" style={{ fontSize: "1.4rem", fontWeight: 500 }}>{l.title}</h4>
                        <p className="body text-[var(--cream)]/55">{l.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 05 — VALOR (Pull quote) ════════ */}
        <section className="relative bg-[var(--cream)] px-6 md:px-12 lg:px-16 py-28 md:py-40">
          <div className="max-w-[1500px] mx-auto">
            <div className="reveal max-w-5xl">
              <div className="eyebrow text-[var(--terracotta)] mb-6">Capítulo 05 · Por que importa</div>
              <blockquote className="display text-[var(--ink)]" style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.1, fontWeight: 400 }}>
                Sozinho, ele é <span className="display-italic" style={{ color: "var(--terracotta)" }}>limitado</span>.<br />
                Dentro de uma arquitetura maior,<br />
                ele <span className="display-italic" style={{ color: "var(--navy)" }}>muda de patamar</span>.
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-20 pt-12 border-t border-[var(--line)]">
              {[
                { ic: ShieldCheck, t: "Privacidade Operacional", d: "Menor exposição direta da jurisdição de origem em verificações internacionais." },
                { ic: Globe2, t: "Acesso Internacional", d: "Utilidade em plataformas globais, sujeito ao compliance de cada serviço." },
                { ic: Sparkles, t: "Baixo Custo de Entrada", d: "Opção acessível em comparação com passaportes adicionais ou residências formais." },
                { ic: ScrollText, t: "Processo Online", d: "Solicitação digital com emissão e envio físico para qualquer lugar do mundo." },
              ].map((v, i) => {
                const Ic = v.ic;
                return (
                  <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <Ic size={28} className="text-[var(--terracotta)] mb-5" />
                    <h4 className="display text-[var(--ink)] mb-3" style={{ fontSize: "1.3rem", fontWeight: 500 }}>{v.t}</h4>
                    <p className="body-sm">{v.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 06 — JORNADA (Steps) ════════ */}
        <section className="relative bg-[var(--cream-soft)] px-6 md:px-12 lg:px-16 py-24 md:py-36 border-y border-[var(--line)]">
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 06 · Jornada</div>
                <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
                  Como <span className="display-italic" style={{ color: "var(--terracotta)" }}>obter</span><br />
                  o ID de Palau
                </h2>
              </div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--line-strong)] -translate-x-px md:-translate-x-1/2" />

              {[
                { n: "01", t: "Solicitação", d: "Inicie pela plataforma oficial responsável pela emissão do documento.", side: "left" },
                { n: "02", t: "Verificação", d: "Processo de validação de identidade exigido pelo governo de Palau.", side: "right" },
                { n: "03", t: "Emissão", d: "Aprovação e emissão oficial pelo Estado soberano reconhecido.", side: "left" },
                { n: "04", t: "Entrega Física", d: "Cartão físico enviado para qualquer lugar do mundo onde você estiver.", side: "right" },
                { n: "05", t: "Configuração Estratégica", d: "Avalie documentação complementar para integrar à sua estrutura específica.", side: "left" },
              ].map((s, i) => (
                <div key={i} className={`relative grid grid-cols-12 gap-4 mb-12 reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  {/* Mobile: all left | Desktop: alternate */}
                  <div className={`col-span-12 md:col-span-6 ${s.side === "right" ? "md:col-start-7" : ""} pl-16 md:pl-0 ${s.side === "right" ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                    <div className={`flex items-center gap-4 mb-3 ${s.side === "right" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <span className="display-italic text-[var(--terracotta)]" style={{ fontSize: "2.5rem" }}>{s.n}</span>
                      <div className="h-px flex-1 bg-[var(--line-strong)]" />
                    </div>
                    <h3 className="display text-[var(--ink)] mb-3" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>{s.t}</h3>
                    <p className="body">{s.d}</p>
                  </div>
                  {/* Center dot */}
                  <div className="absolute left-6 md:left-1/2 top-3 w-3 h-3 rounded-full bg-[var(--terracotta)] -translate-x-[5px] md:-translate-x-1/2 ring-4 ring-[var(--cream-soft)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 07 — PALAU (CINEMATIC PARALLAX) ════════ */}
        <section ref={islandRef} className="relative h-[100vh] min-h-[700px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: islandY }}>
            <img src={islandImg} alt="Ilhas de Palau ao amanhecer" loading="lazy" className="w-full h-full object-cover" style={{ transform: "scale(1.25)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(27,40,69,0.15) 0%, rgba(27,40,69,0.05) 40%, rgba(27,40,69,0.55) 100%)" }} />

          <div className="relative z-10 h-full flex items-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28">
            <div className="max-w-[1500px] mx-auto w-full grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7 reveal">
                <div className="eyebrow text-[var(--clay)] mb-5">Refúgio Soberano</div>
                <h2 className="display text-[var(--cream)] mb-6" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
                  Palau
                </h2>
                <p className="display-italic text-[var(--cream)]/85 max-w-2xl" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.6rem)", lineHeight: 1.45 }}>
                  Uma identidade emitida por um Estado soberano do Pacífico — com aplicação real no sistema global.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 reveal delay-2 self-end">
                <div className="bg-[var(--cream)]/95 backdrop-blur-sm p-7 md:p-8 rounded-sm border-l-2 border-[var(--terracotta)]">
                  <div className="space-y-4">
                    {[
                      ["Tipo", "Identidade soberana"],
                      ["Emissão", "República de Palau"],
                      ["Formato", "Cartão físico + digital"],
                      ["Processo", "100% online"],
                      ["Potencial isolado", "Limitado"],
                      ["Em estrutura", "Alto"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center pb-3 border-b border-[var(--line)] last:border-0">
                        <span className="eyebrow text-[var(--ink-soft)]">{k}</span>
                        <span className="display text-[var(--ink)] text-[0.95rem]" style={{ fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 08 — FAQ ════════ */}
        <section className="bg-[var(--cream)] px-6 md:px-12 lg:px-16 py-24 md:py-36">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal">
              <div className="eyebrow text-[var(--terracotta)] mb-5">Capítulo 08 · Perguntas Frequentes</div>
              <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
                As dúvidas<br /><span className="display-italic" style={{ color: "var(--terracotta)" }}>mais importantes</span>
              </h2>
            </div>

            <div className="reveal delay-1 border-t border-[var(--line)]">
              {[
                { q: "O ID de Palau é cidadania?", a: "Não. É uma identidade digital emitida pelo governo de Palau, não cidadania. Cidadania envolve direitos legais extensos, passaporte e proteção consular — nada disso está incluído." },
                { q: "O ID de Palau é residência?", a: "Não. Não configura residência legal, não muda sua situação fiscal e não substitui visto ou permissão de residência em qualquer jurisdição." },
                { q: "Posso usar em exchanges cripto?", a: "Em algumas, sim — Coinbase, Bitget, Gate.io, KuCoin, CEX.IO e MEXC são exemplos atuais. Mas as políticas de compliance mudam. Verifique a política vigente antes de depender disso." },
                { q: "Posso abrir conta em qualquer banco?", a: "Não. Bancos tradicionais exigem passaporte e comprovante de residência robusto. O ID pode funcionar em neobanks e fintechs específicas, não em instituições convencionais." },
                { q: "Preciso de comprovante de endereço?", a: "Na maioria dos casos, sim. O ID raramente opera como documento único — ele faz parte de um conjunto de documentação complementar." },
                { q: "Substitui passaporte?", a: "Não. Não pode ser usado para viagens internacionais. Seu passaporte nacional continua sendo o documento principal para viagem e propósitos legais." },
                { q: "Resolve minha vida financeira internacional?", a: "Não. É uma ferramenta dentro de uma estrutura maior. Sozinho tem utilidade limitada. Dentro de uma arquitetura de soberania bem construída, contribui significativamente." },
                { q: "É legal?", a: "Sim. É emitido por um governo soberano reconhecido internacionalmente. O que varia é a aceitação de cada plataforma — uma decisão privada de compliance, não de legalidade do documento." },
                { q: "Vale a pena?", a: "Depende do seu objetivo. Se você entende onde funciona, tem documentação complementar e o insere em uma estratégia maior — pode valer muito. Se espera que resolva tudo sozinho — não vale. A decisão inteligente começa com clareza." },
              ].map((f, i) => (
                <details key={i}>
                  <summary>
                    <span className="display text-[var(--ink)] text-[1.1rem] md:text-[1.3rem] leading-snug" style={{ fontWeight: 500 }}>{f.q}</span>
                    <span className="faq-icon w-9 h-9 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink)] shrink-0">
                      <ChevronDown size={16} />
                    </span>
                  </summary>
                  <div className="pb-7 pr-12">
                    <p className="body">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CHAPTER 09 — CTA FINAL ════════ */}
        <section ref={ctaRef} className="relative h-[100vh] min-h-[680px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: ctaY }}>
            <img src={ctaImg} alt="Estojo de viagem com passaporte e mapa" loading="lazy" className="w-full h-full object-cover" style={{ transform: "scale(1.2)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(244,238,226,0.55) 0%, rgba(244,238,226,0.4) 50%, rgba(244,238,226,0.92) 100%)" }} />

          <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
            <div className="text-center max-w-4xl reveal">
              <div className="eyebrow text-[var(--terracotta)] mb-6">Decisão Consciente</div>
              <h2 className="display text-[var(--ink)]" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}>
                Clareza<br /><span className="display-italic" style={{ color: "var(--terracotta)" }}>primeiro</span>.
              </h2>
              <p className="display-italic text-[var(--ink-soft)] mt-7 max-w-2xl mx-auto" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)", lineHeight: 1.5 }}>
                Você não precisa fazer tudo hoje. Mas precisa começar certo. O valor do ID de Palau não está no hype — está no uso correto.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <Link to="/teoria-das-bandeiras" className="btn-primary">
                  Ver estratégia completa <ArrowUpRight size={16} />
                </Link>
                <Link to="/saida" className="btn-ghost">
                  Como obter o ID
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--ink)] text-[var(--cream)]/70 px-6 md:px-12 lg:px-16 py-10">
          <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="eyebrow text-[var(--cream)]/55">Lord Junnior · Soberania Internacional</div>
            <div className="text-xs text-[var(--cream)]/35 tracking-widest">© 2026 · LORDJUNNIOR.COM.BR</div>
          </div>
        </footer>

        <BackToHome />
      </main>
    </>
  );
};

export default PalauDigitalResidency;
