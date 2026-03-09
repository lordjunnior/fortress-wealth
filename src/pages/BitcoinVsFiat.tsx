import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, ChevronDown, HelpCircle, Clock, ArrowDown, Shield, TrendingDown, Lock, Eye, Zap, Globe, Ban, Users, Wallet, Scale, BookOpen, Check, X } from 'lucide-react';
import { NAV_ITEMS, COMPARACAO, PROBLEMAS_FIAT, VANTAGENS_BITCOIN, OBJECOES, NUMEROS, FERRAMENTAS, FAQ_ITEMS } from '@/lib/bitcoinVsFiatData';

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Bitcoin vs Dinheiro Fiat: A Comparação Definitiva", "description": "Compare Bitcoin e moedas fiduciárias em 14 aspectos fundamentais. Entenda por que o Bitcoin é superior ao dinheiro estatal.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/bitcoin-vs-fiat", "keywords": "bitcoin vs real, bitcoin vs dinheiro, bitcoin vs fiat, vantagens do bitcoin, comparação bitcoin dólar" };

export default function BitcoinVsFiat() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openObjecao, setOpenObjecao] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) { if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) { setActiveSection(sections[i].id); break; } }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-orange-600 overflow-x-hidden">
      <Helmet>
        <title>Bitcoin vs Dinheiro Fiat: A Comparação Definitiva | Lord Junnior</title>
        <meta name="description" content="Compare Bitcoin e moedas fiduciárias como Real e Dólar em 14 aspectos fundamentais: escassez, controle, inflação, privacidade, censura e mais. Entenda por que o Bitcoin é superior." />
        <link rel="canonical" href="https://lordjunnior.com.br/bitcoin-vs-fiat" />
        <meta property="og:title" content="Bitcoin vs Dinheiro Fiat: A Comparação Definitiva" />
        <meta property="og:description" content="14 fatores que mostram por que o Bitcoin é superior ao dinheiro estatal." />
        <meta property="og:url" content="https://lordjunnior.com.br/bitcoin-vs-fiat" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <style>{`
        @keyframes orangeDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .orange-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(249,115,22,0.2) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(255,255,255,0.08) 100%,transparent);background-size:220px 220px;animation:orangeDrift 65s linear infinite}
        .title-shimmer-o{background:linear-gradient(90deg,#f97316 0%,#fb923c 40%,#fff 50%,#fb923c 60%,#f97316 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShimO 3.5s linear infinite}
        @keyframes tShimO{0%{background-position:200% center}100%{background-position:-200% center}}
        .glass-sb{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes orangeGlow{0%,100%{box-shadow:0 0 0 rgba(249,115,22,0)}50%{box-shadow:0 0 12px rgba(249,115,22,0.15)}}
        .nav-active-o{background:rgba(249,115,22,0.08);border-left:2px solid rgba(249,115,22,0.8);color:#f5f5f5;animation:orangeGlow 3s ease-in-out infinite}
        .card-vs{border:1px solid rgba(249,115,22,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-vs:hover{border-color:rgba(249,115,22,0.4);box-shadow:0 0 25px rgba(249,115,22,0.07);transform:translateY(-3px)}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
        @keyframes borderPulseO{0%,100%{border-color:rgba(249,115,22,0.2)}50%{border-color:rgba(249,115,22,0.7)}}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15"><div className="orange-grid" /></div>

      {/* SIDEBAR */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sb m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3"><Zap className="text-orange-500" size={16} /><span className="text-orange-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Bitcoin vs Fiat</span></div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono"><ArrowLeft size={10} /> Início</Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1"><span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span><span className="text-[7px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span></div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} /></div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (<button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${activeSection === item.id ? 'nav-active-o' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'}`}>{item.label}</button>))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sb border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono"><ArrowLeft size={10} /> Início</Link>
          <div className="flex items-center gap-1"><Zap className="text-orange-500" size={12} /><span className="text-orange-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">BTC vs Fiat</span></div>
          <span className="text-[8px] font-black text-orange-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} /></div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><span className="text-orange-500" itemProp="name">Bitcoin vs Fiat</span><meta itemProp="position" content="2" /></li>
            </ol>
          </nav>

          {/* HERO */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <Zap className="absolute top-0 right-0 text-orange-600/[0.03] -mr-16 -mt-16" size={350} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8"><Zap className="text-orange-500" size={16} /><span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Comparação Definitiva</span></div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8">Bitcoin vs<br /><span className="title-shimmer-o italic inline-block pt-1">Dinheiro Fiat</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">Uma comparação direta entre o <strong className="text-white">Bitcoin</strong> e as moedas fiduciárias como o <strong className="text-orange-500">Real, o Dólar e o Euro</strong>. 14 fatores analisados. Sem propaganda, sem viés: apenas fatos verificáveis.</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">Entenda por que governos temem o Bitcoin, por que moedas estatais perdem valor e como o <strong className="text-white">dinheiro descentralizado</strong> está mudando a economia global.</p>
              <button onClick={() => scrollTo('tabela')} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-10 group"><ArrowDown size={14} className="text-orange-500 group-hover:translate-y-1 transition-transform" /> Ver a comparação</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('arsenal')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">🔓 Primeiros Passos</button>
                <button onClick={() => scrollTo('tabela')} className="border border-white/10 bg-white/[0.02] px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2"><Scale size={14} /> Tabela Completa</button>
              </div>
            </div>
          </header>

          {/* TABELA COMPARATIVA */}
          <section id="tabela" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><Scale size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Tabela Comparativa Completa</h2></div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] border-b border-white/10 bg-white/[0.02]">
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Aspecto</span></div>
                <div className="p-4 border-l border-white/5"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 font-mono">💀 Fiat</span></div>
                <div className="p-4 border-l border-white/5"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500 font-mono">₿ Bitcoin</span></div>
              </div>
              {COMPARACAO.map((row, i) => (
                <div key={i} className={`grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr] group hover:bg-orange-500/[0.03] transition-colors ${i < COMPARACAO.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4"><span className="text-white font-bold text-xs">{row.aspecto}</span></div>
                  <div className="p-4 border-l border-white/5 flex items-start gap-2"><X className="text-red-500/60 shrink-0 mt-0.5" size={12} /><span className="text-slate-400 text-xs font-medium">{row.fiat}</span></div>
                  <div className="p-4 border-l border-white/5 flex items-start gap-2"><Check className="text-emerald-500 shrink-0 mt-0.5" size={12} /><span className="text-slate-300 text-xs font-medium">{row.bitcoin}</span></div>
                </div>
              ))}
            </div>
          </section>

          {/* PROBLEMA FIAT */}
          <section id="problema-fiat" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><TrendingDown size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Problema do Dinheiro Estatal</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROBLEMAS_FIAT.map((item, i) => (
                <div key={i} className="card-vs rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"><item.icon className="text-red-500" size={18} /></div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SOLUÇÃO BITCOIN */}
          <section id="solucao-bitcoin" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><Shield size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Solução: Bitcoin</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VANTAGENS_BITCOIN.map((item, i) => (
                <div key={i} className="card-vs rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"><item.icon className="text-orange-500" size={18} /></div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* OBJEÇÕES */}
          <section id="objecoes" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><HelpCircle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Objeções Comuns (Respondidas)</h2></div>
            <div className="space-y-2">
              {OBJECOES.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenObjecao(openObjecao === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <h3 className="text-white font-bold text-sm leading-snug pr-4">{item.objecao}</h3>
                    <ChevronDown className={`text-orange-500 shrink-0 transition-transform duration-300 ${openObjecao === i ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openObjecao === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NÚMEROS */}
          <section id="numeros" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><Scale size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Os Números Falam</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {NUMEROS.map((n, i) => (
                <div key={i} className="card-vs rounded-sm p-8 text-center">
                  <span className="text-3xl md:text-4xl font-black text-orange-500 font-mono">{n.valor}</span>
                  <h3 className="text-white font-black uppercase text-xs tracking-tight mt-3 mb-1">{n.label}</h3>
                  <p className="text-slate-500 text-[10px] font-medium">{n.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ARSENAL */}
          <section id="arsenal" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><Wallet size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Primeiros Passos</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FERRAMENTAS.map((tool, i) => (
                <div key={i} className="card-vs rounded-sm p-8 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-orange-500" size={18} /></div>
                    <div><h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{tool.titulo}</h3><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{tool.subtitulo}</p></div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium my-4">{tool.descricao}</p>
                  <div className="bg-orange-950/20 border border-orange-500/20 rounded-sm p-4"><p className="text-orange-500 text-[10px] font-black uppercase font-mono leading-relaxed">{tool.destaque}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-orange-500 mb-10"><HelpCircle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Perguntas Frequentes</h2></div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"><h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3><ChevronDown className={`text-orange-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} /></button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}><div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p></div></div>
                </div>
              ))}
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-orange-500 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulseO 3s ease-in-out infinite' }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">A Escolha<br /><span className="text-orange-500 italic">É Sua.</span></h3>
              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">Você pode continuar aceitando que seu dinheiro perde valor todos os dias, que governos controlam cada transação, que bancos podem congelar sua conta a qualquer momento.</p>
                <p className="font-medium text-base">Ou você pode escolher <strong className="text-orange-500">soberania</strong>. Escolher um dinheiro que ninguém pode imprimir, confiscar ou censurar. A tecnologia já existe. A escolha é sua.</p>
              </div>
              <Link to="/o-que-e-bitcoin" className="cta-gold flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center mb-8 w-full md:w-auto md:inline-flex">₿ O Que é o Bitcoin</Link>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] font-mono mb-4">Continue Aprendendo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Como chegamos até aqui' },
                  { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação rouba seu dinheiro' },
                  { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', desc: 'Diversificação jurisdicional' },
                  { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/5 bg-white/[0.01] rounded-sm px-5 py-4 hover:bg-orange-500/[0.03] hover:border-white/10 transition-all group flex items-center justify-between">
                    <div><span className="text-white/80 font-bold uppercase text-[10px] tracking-wider font-mono">{link.titulo}</span><span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span></div>
                    <ChevronRight className="text-slate-700 group-hover:text-orange-500 transition-colors shrink-0" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* LEIA TAMBÉM */}
          <section className="mb-28">
            <div className="flex items-center gap-3 text-slate-500 mb-8"><BookOpen size={16} /><h2 className="text-sm font-black uppercase tracking-[0.15em] font-mono">Leia Também</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Do escambo ao Bitcoin', tag: 'EDUCAÇÃO' },
                { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
                { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro', tag: 'PRÁTICA' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-orange-500/20 hover:bg-orange-500/[0.02] transition-all group">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{link.tag}</span>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-orange-500 transition-colors">{link.titulo}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20 max-w-3xl"><div className="space-y-4 text-slate-500 text-xs leading-relaxed"><p><strong className="text-slate-400">Temas abordados:</strong> bitcoin vs real, bitcoin vs dinheiro, bitcoin vs fiat, vantagens do bitcoin, comparação bitcoin dólar, moeda fiat, escassez bitcoin, inflação, autocustódia, Lightning Network, resistência à censura, descentralização.</p></div></section>
        </div>
      </div>
    </div>
  );
}
