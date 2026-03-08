import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, ArrowRight, ShieldAlert, AlertTriangle, Lock, Eye,
  Smartphone, Link2, UserX, Bot, TrendingUp, CheckCircle, KeyRound,
  Shield, Fingerprint
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

/* ─── SEO: meta keywords target ───
   blindagem golpes bitcoin, segurança bitcoin, phishing bitcoin,
   seed phrase segurança, opsec cripto, deepfake bitcoin, ponzi bitcoin,
   código conduta bitcoin, não confie verifique
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

const NAV_ITEMS = [
  { id: 'impacto', label: 'O Elo Fraco É Você' },
  { id: 'vetores', label: 'Vetores de Ataque' },
  { id: 'codigo', label: 'Código de Conduta' },
  { id: 'conclusao', label: 'Não Confie, Verifique' },
];

export default function BlindagemGolpes() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('impacto');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-400/50 relative overflow-hidden"
      style={{ background: '#050808' }}>

      <Helmet>
        <title>Blindagem contra Golpes — Segurança Operacional Bitcoin | Lord Junnior</title>
        <meta name="description" content="Proteja-se dos principais vetores de ataque em Bitcoin: phishing, deepfakes, esquemas Ponzi. Código de conduta, opsec e protocolos de segurança para sua soberania." />
      </Helmet>

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
      </div>

      {/* ─── FLOATING TOC ─── */}
      <nav className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className={`text-right px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              activeSection === item.id
                ? 'text-red-400 bg-red-500/8 border border-red-500/15'
                : 'text-stone-600 hover:text-stone-400 border border-transparent'
            }`}>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(220,38,38,0.06) 50%, transparent 70%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[25%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-red-600/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/blindagem-golpes.webp"
        phase="Segurança Operacional"
        title="Blindagem contra Golpes"
        subtitle="O Bitcoin não é roubado por hackers geniais invadindo a blockchain — ele é roubado enganando pessoas. A maioria dos ataques explora a psicologia, a ganância ou o medo."
        icon={ShieldAlert}
        accentColor="rose"
        backLink="/protocolo-inicial"
        backLabel="Protocolo Inicial"
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — O ELO FRACO É VOCÊ
        ═══════════════════════════════════════════════════════ */}
        <motion.section id="impacto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={16} className="text-red-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Alerta Tático</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Elo Fraco É Você
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.02] -mr-10 -mt-10" size={280} />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-5 text-stone-400 leading-relaxed">
                <p>
                  <strong className="text-white">A Verdade Desconfortável:</strong> O Bitcoin não é roubado por hackers geniais invadindo a blockchain; ele é roubado <strong className="text-red-400">enganando pessoas</strong>. A maioria dos ataques explora a psicologia, a ganância ou o medo, não falhas no código.
                </p>
                <p className="text-stone-500 text-sm">
                  Engenharia social é a arma mais poderosa do cibercriminoso. Não importa quantas camadas de criptografia protejam seus fundos se você voluntariamente entrega as chaves ao atacante.
                </p>
              </div>
              <div className="bg-red-950/15 border border-red-500/15 rounded-xl p-8">
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-red-400/60 mb-3">Irreversibilidade</p>
                <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Diferente de um cartão de crédito, uma transação de Bitcoin é final. Se você enviar para um golpista, o dinheiro saiu da sua soberania para sempre. Não existe botão de "estorno".
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — OS VETORES DE ATAQUE
        ═══════════════════════════════════════════════════════ */}
        <motion.section id="vetores" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Os Vetores de Ataque
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Link2, title: 'Phishing e Farsas',
                desc: 'E-mails e sites falsos que fingem ser sua carteira ou corretora para roubar sua senha ou Seed Phrase.',
                warning: 'Ninguém legítimo jamais pedirá suas 12/24 palavras.'
              },
              {
                icon: Bot, title: 'Deepfakes e IA',
                desc: 'Vídeos falsos de figuras como Michael Saylor prometendo "dobrar seus bitcoins". IA gerativa que clona vozes e rostos.',
                warning: 'Se parece bom demais para ser verdade, é um ataque.'
              },
              {
                icon: TrendingUp, title: 'Esquemas Ponzi',
                desc: 'Promessas de "lucro garantido" ou rendimentos astronômicos. Plataformas que pagam "juros" com dinheiro de novos investidores.',
                warning: 'O lucro vem da valorização e da sua paciência, não de promessas.'
              },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-red-500/10 rounded-2xl p-8 relative overflow-hidden
                           hover:border-red-500/25 hover:shadow-[0_0_40px_rgba(220,38,38,0.05)] transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-red-500/8 border border-red-500/15
                                 group-hover:bg-red-500/15 transition-all duration-500">
                    <item.icon size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                <div className="bg-red-950/20 border border-red-500/10 rounded-xl p-4">
                  <p className="text-red-400 text-[11px] font-bold leading-relaxed">
                    {item.warning}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 03 — O CÓDIGO DE CONDUTA
        ═══════════════════════════════════════════════════════ */}
        <motion.section id="codigo" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Código de Conduta
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] border-b border-white/[0.06] bg-white/[0.02]">
              <div className="p-5 border-r border-white/[0.06]">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Ação</span>
              </div>
              <div className="p-5">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-stone-600">Regra de Ouro</span>
              </div>
            </div>
            {[
              { action: 'Sua Seed Phrase', rule: 'NUNCA forneça a ninguém. Nem para "suporte técnico". Quem pede sua seed é um atacante.', icon: KeyRound },
              { action: 'Links', rule: 'Salve seus sites de confiança nos favoritos. Não clique em links de e-mails ou mensagens suspeitas.', icon: Link2 },
              { action: 'Autenticação', rule: 'Use 2FA via App (Google Authenticator ou Aegis), nunca via SMS. SIM swap é trivial.', icon: Smartphone },
              { action: 'Verificação', rule: 'Verifique o endereço de destino caractere por caractere antes de confirmar cada transação.', icon: CheckCircle },
            ].map((row, i) => (
              <div key={i}
                className={`grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] group hover:bg-red-500/[0.02] transition-all duration-300 ${
                  i < 3 ? 'border-b border-white/[0.04]' : ''
                }`}>
                <div className="p-5 border-r border-white/[0.04] flex items-center gap-3">
                  <row.icon className="text-red-400 shrink-0" size={14} />
                  <span className="text-white font-bold text-[10px] tracking-wider uppercase">{row.action}</span>
                </div>
                <div className="p-5">
                  <span className="text-stone-400 text-sm leading-relaxed">{row.rule}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── SECTION DIVIDER ─── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 04 — NÃO CONFIE, VERIFIQUE
        ═══════════════════════════════════════════════════════ */}
        <motion.section id="conclusao" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28 scroll-mt-24">
          <motion.div variants={fadeUp} custom={0}
            className="bg-red-500/[0.04] border border-red-500/15 rounded-2xl p-8 md:p-12 relative overflow-hidden
                       hover:border-red-500/25 transition-all duration-500">
            {/* Shimmer top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.02] -mr-8 -mt-8" size={200} />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Não Confie, <span className="text-red-400">Verifique.</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/15 shrink-0 mt-0.5">
                    <Lock size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-bold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Higiene Digital
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Mantenha seu software atualizado e sua mente alerta. Cada nova versão corrige vulnerabilidades conhecidas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/15 shrink-0 mt-0.5">
                    <UserX size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-bold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Silêncio Operacional
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Não saia espalhando quanto Bitcoin você possui. Alvos silenciosos são alvos mais difíceis de identificar e atacar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════
            CTA FINAL — PRÓXIMOS PASSOS
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-red-500/[0.02] via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">
                Not your keys, not your money.
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sempre foi projeto.
              </h2>
              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4
                             text-amber-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 group">
                  Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/economia-paralela"
                  className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-8 py-4
                             text-red-400 text-sm font-bold uppercase tracking-wider
                             hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-500 group">
                  Economia Paralela <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
