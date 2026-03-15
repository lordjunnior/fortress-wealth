import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronDown, HelpCircle, ArrowDown, Shield, TrendingDown, Scale, BookOpen, Check, X, Zap, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, COMPARACAO, PROBLEMAS_FIAT, VANTAGENS_BITCOIN, OBJECOES, NUMEROS, FERRAMENTAS, FAQ_ITEMS } from '@/lib/bitcoinVsFiatData';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Bitcoin vs Dinheiro Fiat: A Comparação Definitiva", "description": "Compare Bitcoin e moedas fiduciárias em 14 aspectos fundamentais.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/bitcoin-vs-fiat", "keywords": "bitcoin vs real, bitcoin vs dinheiro, bitcoin vs fiat, vantagens do bitcoin" };

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

export default function BitcoinVsFiat() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openObjecao, setOpenObjecao] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-orange-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Bitcoin vs Real: Por Que o Seu Dinheiro Está Morrendo? | Lord Junnior</title>
        <meta name="description" content="Descubra por que o Real perde valor todo dia enquanto o Bitcoin se fortalece. 14 comparações brutais entre moeda estatal e dinheiro soberano. Dados verificáveis." />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin-vs-fiat" />
        <meta property="og:title" content="Bitcoin vs Real: A Morte Silenciosa do Seu Dinheiro" />
        <meta property="og:description" content="14 fatores que provam por que guardar Real é perder patrimônio. Comparação definitiva com dados reais." />
        <meta property="og:url" content="https://lordjunnior.com.br/bitcoin-vs-fiat" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ── VFX Stack ── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-500/[0.04] blur-[120px] top-[20%] left-[10%] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-red-500/[0.03] blur-[100px] bottom-[30%] right-[15%] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(120deg,transparent_40%,hsl(25_95%_53%/0.015)_50%,transparent_60%)]" />

      <CinematicHero
        image="/heroes/bitcoin-vs-altcoins.webp"
        phase="Comparação Definitiva"
        title="Bitcoin vs Dinheiro Fiat"
        subtitle="Uma comparação direta entre o Bitcoin e as moedas fiduciárias como o Real, o Dólar e o Euro. 14 fatores analisados. Sem propaganda, sem viés: apenas fatos verificáveis."
        icon={Zap}
        accentColor="amber"
        backLink="/"
        backLabel="Início"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ── TABELA COMPARATIVA ── */}
        <motion.section id="tabela" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <Scale size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Tabela Comparativa Completa</h2>
          </div>
          <div className="bg-stone-900/40 border border-stone-700/20 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] border-b border-stone-700/20 bg-stone-800/20">
              <div className="p-4"><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Aspecto</span></div>
              <div className="p-4 border-l border-stone-700/15"><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">💀 Fiat</span></div>
              <div className="p-4 border-l border-stone-700/15"><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">₿ Bitcoin</span></div>
            </div>
            {COMPARACAO.map((row, i) => (
              <div key={i} className={`grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] group hover:bg-amber-500/[0.03] transition-colors ${i < COMPARACAO.length - 1 ? 'border-b border-stone-700/15' : ''}`}>
                <div className="p-4"><span className="text-stone-200 font-bold text-xs">{row.aspecto}</span></div>
                <div className="p-4 border-l border-stone-700/15 flex items-start gap-2"><X className="text-red-500/60 shrink-0 mt-0.5" size={12} /><span className="text-stone-400 text-xs">{row.fiat}</span></div>
                <div className="p-4 border-l border-stone-700/15 flex items-start gap-2"><Check className="text-emerald-400 shrink-0 mt-0.5" size={12} /><span className="text-stone-300 text-xs">{row.bitcoin}</span></div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── PROBLEMA FIAT ── */}
        <motion.section id="problema-fiat" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-red-400 mb-10">
            <TrendingDown size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">O Problema do Dinheiro Estatal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROBLEMAS_FIAT.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                className="bg-stone-900/40 border border-red-500/10 rounded-2xl p-8 backdrop-blur-sm hover:border-red-500/25 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"><item.icon className="text-red-400" size={18} /></div>
                  <h3 className="text-stone-200 font-bold text-sm uppercase tracking-tight">{item.titulo}</h3>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{item.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── SOLUÇÃO BITCOIN ── */}
        <motion.section id="solucao-bitcoin" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <Shield size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">A Solução: Bitcoin</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VANTAGENS_BITCOIN.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                className="bg-stone-900/40 border border-amber-500/10 rounded-2xl p-8 backdrop-blur-sm hover:border-amber-500/25 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><item.icon className="text-amber-400" size={18} /></div>
                  <h3 className="text-stone-200 font-bold text-sm uppercase tracking-tight">{item.titulo}</h3>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">{item.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── OBJEÇÕES ── */}
        <motion.section id="objecoes" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <HelpCircle size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Objeções Comuns (Respondidas)</h2>
          </div>
          <div className="space-y-2">
            {OBJECOES.map((item, i) => (
              <div key={i} className="bg-stone-900/40 border border-stone-700/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                <button onClick={() => setOpenObjecao(openObjecao === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-stone-800/30 transition-colors">
                  <h3 className="text-stone-200 font-bold text-sm leading-snug pr-4">{item.objecao}</h3>
                  <ChevronDown className={`text-amber-400 shrink-0 transition-transform duration-300 ${openObjecao === i ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openObjecao === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-stone-700/20 pt-4"><p className="text-stone-400 text-sm leading-relaxed">{item.resposta}</p></div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── NÚMEROS ── */}
        <motion.section id="numeros" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <Scale size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Os Números Falam</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {NUMEROS.map((n, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 text-center backdrop-blur-sm hover:border-amber-500/20 transition-all duration-300">
                <span className="text-3xl md:text-4xl font-black text-amber-400">{n.valor}</span>
                <h3 className="text-stone-200 font-bold uppercase text-xs tracking-tight mt-3 mb-1">{n.label}</h3>
                <p className="text-stone-500 text-[10px]">{n.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── ARSENAL ── */}
        <motion.section id="arsenal" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <Wallet size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Primeiros Passos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAMENTAS.map((tool, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
                className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-8 backdrop-blur-sm hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-amber-400" size={18} /></div>
                  <div><h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight">{tool.titulo}</h3><p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{tool.subtitulo}</p></div>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed my-4">{tool.descricao}</p>
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4"><p className="text-amber-400 text-[10px] font-bold uppercase leading-relaxed">{tool.destaque}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        <motion.section id="faq" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28 scroll-mt-24">
          <div className="flex items-center gap-3 text-amber-400 mb-10">
            <HelpCircle size={20} />
            <h2 className="text-xl font-black uppercase tracking-wider">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-stone-900/40 border border-stone-700/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-stone-800/30 transition-colors">
                  <h3 className="text-stone-200 font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                  <ChevronDown className={`text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
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
          <div className="relative overflow-hidden bg-stone-900/40 border-2 border-amber-500/30 rounded-2xl p-10 md:p-14 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-8">A Escolha <span className="text-amber-400">É Sua.</span></h3>
              <div className="space-y-5 text-stone-400 leading-relaxed mb-10">
                <p className="text-base">Você pode continuar aceitando que seu dinheiro perde valor todos os dias, que governos controlam cada transação, que bancos podem congelar sua conta a qualquer momento.</p>
                <p className="text-base">Ou você pode escolher <strong className="text-amber-400">soberania</strong>. Escolher um dinheiro que ninguém pode imprimir, confiscar ou censurar.</p>
              </div>
              <Link to="/o-que-e-bitcoin" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-amber-500 text-stone-950 font-bold uppercase text-sm tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                ₿ O Que é o Bitcoin <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── Leia Também ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 text-stone-500 mb-8"><BookOpen size={16} /><h2 className="text-sm font-bold uppercase tracking-wider">Leia Também</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Do escambo ao Bitcoin', tag: 'EDUCAÇÃO' },
              { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
              { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro', tag: 'PRÁTICA' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className="bg-stone-900/40 border border-stone-700/20 rounded-2xl p-6 hover:border-amber-500/20 hover:bg-stone-800/30 transition-all duration-300 group backdrop-blur-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600">{link.tag}</span>
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-amber-400 transition-colors">{link.titulo}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
