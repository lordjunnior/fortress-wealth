import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronDown, HelpCircle, Shield, Globe, Flag, AlertTriangle, BookOpen, Wallet, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, BANDEIRAS, POR_QUE_AGORA, CASO_BRASIL, PRIMEIROS_PASSOS, FERRAMENTAS, FAQ_ITEMS } from '@/lib/teoriaBandeirasData';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Teoria das Bandeiras: Diversificação Jurisdicional para Soberania Pessoal", "description": "A Teoria das Bandeiras (Flag Theory) é a estratégia de distribuir sua vida financeira e jurídica entre múltiplas jurisdições.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/teoria-das-bandeiras", "keywords": "teoria das bandeiras, flag theory, diversificação jurisdicional, offshore" };

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};


const TOC_ITEMS = [
  { id: "o-que-e", label: "O Que É" },
  { id: "bandeiras", label: "As 5 Bandeiras" },
  { id: "por-que", label: "Por Que Agora" },
  { id: "brasil", label: "O Caso Brasil" },
  { id: "primeiros-passos", label: "Primeiros Passos" },
  { id: "ferramentas", label: "Arsenal Prático" },
  { id: "faq", label: "FAQ" },
];

export default function TeoriaDasBandeiras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeBandeira, setActiveBandeira] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Teoria das Bandeiras: Diversificação Jurisdicional | Lord Junnior</title>
        <meta name="description" content="A Teoria das Bandeiras (Flag Theory) é a estratégia de distribuir cidadania, contas, empresas e patrimônio entre múltiplas jurisdições. Entenda as 5 bandeiras e como aplicar no Brasil." />
        <link rel="canonical" href="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:title" content="Teoria das Bandeiras: Soberania Através da Diversificação" />
        <meta property="og:description" content="As 5 bandeiras para proteger seu patrimônio e sua liberdade." />
        <meta property="og:url" content="https://lordjunnior.com.br/teoria-das-bandeiras" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="amber" />

      <ScrollToTop />

      {/* ── VFX Stack ── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px] top-[20%] left-[10%] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-[100px] bottom-[20%] right-[15%] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(120deg,transparent_40%,hsl(160_84%_39%/0.015)_50%,transparent_60%)]" />

      <CinematicHero
        image="/heroes/diversificacao.webp"
        phase="Estratégia Avançada"
        title="Teoria das Bandeiras"
        subtitle="A estratégia de distribuir sua vida financeira, jurídica e patrimonial entre múltiplas jurisdições para que nenhum governo tenha controle total sobre sua existência."
        icon={Flag}
        accentColor="emerald"
        backLink="/"
        backLabel="Início"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ── O QUE É ── */}
        <motion.section id="o-que-e" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <Globe size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">O Que É a Teoria das Bandeiras</h2>
          </div>
          <div className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="space-y-5 text-stone-400 leading-relaxed">
              <p className="text-base">A <strong className="text-stone-100">Teoria das Bandeiras</strong> (Flag Theory) foi popularizada por Harry D. Schultz nos anos 1960. A ideia central é simples: <strong className="text-emerald-400">não dependa de um único governo para tudo</strong>.</p>
              <p className="text-base">A maioria das pessoas nasce, vive, trabalha, guarda dinheiro e morre sob a jurisdição de um único país. Isso significa que <strong className="text-stone-100">um único governo controla 100% da sua existência</strong>.</p>
              <p className="text-base">A Teoria das Bandeiras propõe que você distribua esses elementos entre múltiplas jurisdições. Não é sobre fugir. É sobre <strong className="text-emerald-400">ter opções</strong>.</p>
            </div>
          </div>
        </motion.section>

        {/* ── AS 5 BANDEIRAS ── */}
        <motion.section id="bandeiras" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <Flag size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">As 5 Bandeiras</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {BANDEIRAS.map((b, i) => (
              <button key={i} onClick={() => setActiveBandeira(i)} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeBandeira === i ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-stone-800/30 border border-stone-700/20 text-stone-500 hover:text-stone-200'}`}>
                {b.numero}ª {b.titulo.split(' / ')[0]}
              </button>
            ))}
          </div>

          {BANDEIRAS.map((b, i) => activeBandeira === i && (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="bg-stone-900/40 border border-emerald-500/15 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><b.icon className="text-emerald-400" size={22} /></div>
                <div>
                  <span className="text-emerald-400/60 font-bold text-[10px] tracking-wider">BANDEIRA {b.numero}</span>
                  <h3 className="text-stone-100 font-bold text-lg uppercase tracking-tight">{b.titulo}</h3>
                  <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">{b.subtitulo}</p>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed my-6">{b.descricao}</p>
              <div className="space-y-2 mb-6">
                {b.exemplos.map((ex, j) => (
                  <div key={j} className="flex items-start gap-2"><Check className="text-emerald-400 shrink-0 mt-0.5" size={14} /><span className="text-stone-300 text-xs">{ex}</span></div>
                ))}
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4"><p className="text-emerald-400 text-[10px] font-bold uppercase leading-relaxed">{b.destaque}</p></div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── POR QUE AGORA ── */}
        <motion.section id="por-que" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <AlertTriangle size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Por Que Agora</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POR_QUE_AGORA.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 backdrop-blur-sm hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><item.icon className="text-emerald-400" size={18} /></div>
                  <h3 className="text-stone-200 font-bold text-sm uppercase tracking-tight">{item.titulo}</h3>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{item.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── CASO BRASIL ── */}
        <motion.section id="brasil" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-red-400 mb-10">
            <AlertTriangle size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">O Caso Brasil</h2>
          </div>
          <div className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <p className="text-stone-400 text-sm leading-relaxed mb-8">O Brasil combina <strong className="text-stone-100">instabilidade histórica com poder estatal crescente</strong>:</p>
            <div className="space-y-3">
              {CASO_BRASIL.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-red-400 font-bold text-[8px]">{i + 1}</span></div>
                  <span className="text-stone-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 mt-8">
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-2">Conclusão</p>
              <p className="text-stone-100 font-bold text-sm leading-tight uppercase">Quem tem 100% da vida sob uma única jurisdição está 100% vulnerável.</p>
            </div>
          </div>
        </motion.section>

        {/* ── PRIMEIROS PASSOS ── */}
        <motion.section id="primeiros-passos" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <Wallet size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Primeiros Passos</h2>
          </div>
          <div className="space-y-4">
            {PRIMEIROS_PASSOS.map((step) => (
              <motion.div key={step.passo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={step.passo * 0.2}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 flex gap-6 backdrop-blur-sm hover:border-emerald-500/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-bold text-lg">{step.passo}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mb-1">{step.titulo}</h3>
                  <div className="flex gap-3 mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400/60">Dificuldade: {step.dificuldade}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-stone-600">Custo: {step.custo}</span>
                  </div>
                  <p className="text-stone-400 text-xs leading-relaxed">{step.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── ARSENAL PRÁTICO ── */}
        <motion.section id="ferramentas" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <Shield size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Arsenal Prático</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAMENTAS.map((tool, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 backdrop-blur-sm hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-emerald-400" size={18} /></div>
                  <div><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight">{tool.titulo}</h3><p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{tool.subtitulo}</p></div>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed my-4">{tool.descricao}</p>
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4"><p className="text-emerald-400 text-[10px] font-bold uppercase leading-relaxed">{tool.destaque}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        <motion.section id="faq" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-emerald-400 mb-10">
            <HelpCircle size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-stone-900/40 border border-stone-700/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-stone-800/30 transition-colors">
                  <h3 className="text-stone-200 font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                  <ChevronDown className={`text-emerald-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-stone-700/20 pt-4"><p className="text-stone-400 text-sm leading-relaxed">{item.resposta}</p></div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── CONCLUSÃO CTA ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="relative overflow-hidden bg-stone-900/40 border-2 border-emerald-500/30 rounded-2xl p-10 md:p-14 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-8">Soberania <span className="text-emerald-400">Pessoal.</span></h3>
              <div className="space-y-5 text-stone-400 leading-relaxed mb-10">
                <p className="text-base">A Teoria das Bandeiras não é sobre paranoia. É sobre <strong className="text-stone-100">planejamento racional</strong>. Cada bandeira que você planta é <strong className="text-emerald-400">uma camada a mais de proteção</strong>.</p>
                <p className="text-base">Comece com Bitcoin. Depois, uma conta internacional. Depois, uma segunda residência.</p>
              </div>
              <Link to="/autocustodia" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-emerald-500 text-stone-950 font-bold uppercase text-sm tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                ₿ Começar com Autocustódia <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── Leia Também ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 text-stone-500 mb-8"><BookOpen size={16} /><h2 className="text-sm font-bold uppercase tracking-wider">Leia Também</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação definitiva', tag: 'COMPARAÇÃO' },
              { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
              { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à soberania financeira', tag: 'FUNDAMENTO' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 hover:border-emerald-500/20 hover:bg-stone-800/30 transition-all duration-300 group backdrop-blur-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600">{link.tag}</span>
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-emerald-400 transition-colors">{link.titulo}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
