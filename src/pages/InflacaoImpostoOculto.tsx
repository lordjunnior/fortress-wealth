import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, ChevronDown, HelpCircle, Clock, ArrowDown, AlertTriangle, TrendingDown, Percent, DollarSign, ShoppingCart, Landmark, BarChart3, Wallet, Scale, Flame, BookOpen, Zap, Globe, ShieldAlert, Calculator } from 'lucide-react';
import { NAV_ITEMS, MECANISMO, CANTILLON_NIVEIS, NUMEROS_REAIS, MENTIRAS, FERRAMENTAS, TIMELINE_ITEMS, FAQ_ITEMS } from '@/lib/inflacaoData';

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Inflação: O Imposto Oculto. Como a Inflação Rouba Seu Dinheiro", "description": "Entenda como a inflação funciona, por que ela é um imposto invisível e como proteger seu patrimônio.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/inflacao-imposto-oculto", "keywords": "inflação, inflação como funciona, inflação rouba dinheiro, o que causa inflação, Efeito Cantillon, imposto inflacionário, proteger dinheiro da inflação, Bitcoin inflação" };

export default function InflacaoImpostoOculto() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcValor, setCalcValor] = useState(1000);
  const [calcAno, setCalcAno] = useState(1994);

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

  // Inflation calculator: approximate cumulative IPCA
  const inflacaoAcumulada: Record<number, number> = {
    1994: 0.85, 1995: 0.83, 1996: 0.82, 1997: 0.81, 1998: 0.80,
    1999: 0.79, 2000: 0.77, 2001: 0.74, 2002: 0.70, 2003: 0.65,
    2004: 0.62, 2005: 0.59, 2006: 0.57, 2007: 0.55, 2008: 0.52,
    2009: 0.50, 2010: 0.47, 2011: 0.44, 2012: 0.41, 2013: 0.38,
    2014: 0.35, 2015: 0.30, 2016: 0.25, 2017: 0.23, 2018: 0.21,
    2019: 0.18, 2020: 0.15, 2021: 0.10, 2022: 0.06, 2023: 0.04,
    2024: 0.02, 2025: 0.01,
  };
  const perda = inflacaoAcumulada[calcAno] ?? 0.85;
  const valorHoje = calcValor * (1 - perda);
  const perdaReais = calcValor - valorHoje;

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 overflow-x-hidden">
      <Helmet>
        <title>Inflação: O Imposto Oculto. Como Seu Dinheiro Está Derretendo | Lord Junnior</title>
        <meta name="description" content="Entenda como a inflação funciona, por que ela é um imposto invisível que rouba seu poder de compra todos os dias e como proteger seu patrimônio com Bitcoin e diversificação." />
        <link rel="canonical" href="https://lordjunnior.com.br/inflacao-imposto-oculto" />
        <meta property="og:title" content="Inflação: O Imposto Oculto. Como Seu Dinheiro Está Derretendo" />
        <meta property="og:url" content="https://lordjunnior.com.br/inflacao-imposto-oculto" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <style>{`
        @keyframes redDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .red-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(239,68,68,0.2) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(255,255,255,0.08) 100%,transparent);background-size:220px 220px;animation:redDrift 65s linear infinite}
        .title-shimmer-red{background:linear-gradient(90deg,#ef4444 0%,#f87171 40%,#fff 50%,#f87171 60%,#ef4444 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShimR 3.5s linear infinite}
        @keyframes tShimR{0%{background-position:200% center}100%{background-position:-200% center}}
        .glass-sb{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes redGlow{0%,100%{box-shadow:0 0 0 rgba(239,68,68,0)}50%{box-shadow:0 0 12px rgba(239,68,68,0.15)}}
        .nav-active-r{background:rgba(239,68,68,0.08);border-left:2px solid rgba(239,68,68,0.8);color:#f5f5f5;animation:redGlow 3s ease-in-out infinite}
        .card-inf{border:1px solid rgba(239,68,68,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-inf:hover{border-color:rgba(239,68,68,0.4);box-shadow:0 0 25px rgba(239,68,68,0.07);transform:translateY(-3px)}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
        @keyframes borderPulseR{0%,100%{border-color:rgba(239,68,68,0.2)}50%{border-color:rgba(239,68,68,0.7)}}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15"><div className="red-grid" /></div>

      {/* SIDEBAR */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sb m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3"><TrendingDown className="text-red-500" size={16} /><span className="text-red-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Inflação</span></div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono"><ArrowLeft size={10} /> Início</Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1"><span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span><span className="text-[7px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span></div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }} /></div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (<button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${activeSection === item.id ? 'nav-active-r' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'}`}>{item.label}</button>))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sb border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono"><ArrowLeft size={10} /> Início</Link>
          <div className="flex items-center gap-1"><TrendingDown className="text-red-500" size={12} /><span className="text-red-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Inflação</span></div>
          <span className="text-[8px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }} /></div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><span className="text-red-500" itemProp="name">Inflação: O Imposto Oculto</span><meta itemProp="position" content="2" /></li>
            </ol>
          </nav>

          {/* HERO */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <TrendingDown className="absolute top-0 right-0 text-red-600/[0.03] -mr-16 -mt-16" size={350} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8"><TrendingDown className="text-red-500" size={16} /><span className="text-red-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Educação Monetária</span></div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8">Inflação:<br /><span className="title-shimmer-red italic inline-block pt-1">O Imposto Oculto</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">A inflação não é um fenômeno natural. É uma <strong className="text-white">política deliberada</strong> dos bancos centrais que funciona como um <strong className="text-red-500">imposto invisível</strong>, roubando silenciosamente o poder de compra do seu dinheiro, todos os dias, sem que você perceba.</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">Entenda o que causa a inflação, como ela funciona, por que a inflação rouba seu dinheiro e como proteger seu patrimônio contra a <strong className="text-white">desvalorização monetária</strong> que governos do mundo inteiro promovem.</p>
              <button onClick={() => scrollTo('o-que-e')} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-10 group"><ArrowDown size={14} className="text-red-500 group-hover:translate-y-1 transition-transform" /> Entenda o que está acontecendo</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('protecao')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">🛡️ Como Se Proteger</button>
              </div>
            </div>
          </header>

          {/* O QUE É */}
          <section id="o-que-e" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><Percent size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Que É Inflação, De Verdade</h2></div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
              <div className="space-y-5 text-slate-400 leading-relaxed">
                <p className="font-medium text-base">A definição oficial diz que inflação é o <strong className="text-white">"aumento generalizado dos preços"</strong>. Isso é tecnicamente correto, mas profundamente enganoso. É como dizer que a febre é "o aumento da temperatura do corpo" sem mencionar a infecção que a causou.</p>
                <p className="font-medium text-base">A inflação real, a causa e não o sintoma, é a <strong className="text-red-500">expansão da oferta monetária</strong>. Quando o banco central cria dinheiro novo, cada real que já existe perde um pouco de valor. Mais dinheiro perseguindo a mesma quantidade de bens = preços mais altos. É matemática básica.</p>
                <p className="font-medium text-base">O economista Milton Friedman resumiu: <em className="text-white">"A inflação é sempre e em todo lugar um fenômeno monetário."</em> Não é causada por empresários "gananciosos", não é causada por secas ou guerras. Essas coisas causam aumento de preços específicos, não aumento generalizado. A inflação é causada por uma coisa e apenas uma coisa: <strong className="text-white">impressão de dinheiro</strong>.</p>
              </div>
            </div>
          </section>

          {/* CALCULADORA */}
          <section id="calculadora" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><Calculator size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Calculadora da Inflação</h2></div>
            <div className="bg-[#0a0a0a] border border-red-500/20 rounded-sm p-8 md:p-12">
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">Descubra quanto do seu dinheiro a inflação já devorou. Insira um valor e o ano para ver o poder de compra real hoje.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono block mb-2">Valor em Reais (R$)</label>
                  <input type="number" value={calcValor} onChange={(e) => setCalcValor(Number(e.target.value) || 0)} className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-black text-lg font-mono focus:border-red-500/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono block mb-2">Ano de Referência</label>
                  <select value={calcAno} onChange={(e) => setCalcAno(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-black text-lg font-mono focus:border-red-500/50 focus:outline-none transition-colors appearance-none">
                    {Object.keys(inflacaoAcumulada).map(ano => (
                      <option key={ano} value={ano} className="bg-[#0a0a0a]">{ano}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-950/20 border border-red-500/20 rounded-sm p-6 text-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500/60 font-mono">Valor Original ({calcAno})</span>
                  <p className="text-2xl font-black text-white font-mono mt-2">R$ {calcValor.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-red-950/30 border border-red-500/30 rounded-sm p-6 text-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500/60 font-mono">Poder de Compra Hoje</span>
                  <p className="text-2xl font-black text-red-500 font-mono mt-2">R$ {valorHoje.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-red-950/40 border border-red-500/40 rounded-sm p-6 text-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500/60 font-mono">A Inflação Devorou</span>
                  <p className="text-2xl font-black text-red-400 font-mono mt-2">R$ {perdaReais.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                  <p className="text-[10px] font-black text-red-500/80 font-mono mt-1">{(perda * 100).toFixed(0)}% de perda</p>
                </div>
              </div>
              <p className="text-slate-600 text-[10px] font-medium mt-4 text-center">Valores aproximados baseados no IPCA acumulado. A inflação real (alimentos, moradia, energia) costuma ser maior que o índice oficial.</p>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section id="como-funciona" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><Landmark size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Como a Inflação Funciona</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MECANISMO.map((item, i) => (
                <div key={i} className="card-inf rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"><item.icon className="text-red-500" size={18} /></div>
                    <div><span className="text-red-500/60 font-black text-[10px] font-mono tracking-wider">ETAPA {i + 1}</span><h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3></div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* EFEITO CANTILLON */}
          <section id="efeito-cantillon" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><Scale size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Efeito Cantillon: Quem Ganha e Quem Perde</h2></div>
            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">O dinheiro novo não aparece igualmente para todos. Ele segue uma <strong className="text-white">hierarquia de acesso</strong>, e você está no final da fila:</p>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              {CANTILLON_NIVEIS.map((n, i) => (
                <div key={i} className={`grid grid-cols-[60px_1fr_1fr_1fr] group hover:bg-red-500/[0.03] transition-colors ${i < CANTILLON_NIVEIS.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4 flex items-center justify-center"><span className={`font-black text-sm font-mono ${i >= 3 ? 'text-red-500' : 'text-emerald-500/60'}`}>{n.nivel}</span></div>
                  <div className="p-4"><span className="text-white font-bold text-xs">{n.quem}</span></div>
                  <div className="p-4"><span className="text-slate-400 text-xs font-medium">{n.efeito}</span></div>
                  <div className="p-4"><span className={`text-xs font-bold ${i >= 3 ? 'text-red-400' : 'text-emerald-400/60'}`}>{n.resultado}</span></div>
                </div>
              ))}
            </div>
            <div className="bg-red-950/10 border border-red-500/20 rounded-sm p-6 mt-6">
              <p className="text-red-500 text-[10px] font-black uppercase font-mono tracking-wider mb-2">A Verdade Brutal</p>
              <p className="text-white font-black text-base leading-tight uppercase italic">A inflação é a maior máquina de transferência de riqueza da história: dos pobres para os ricos, dos poupadores para os impressores, dos últimos para os primeiros.</p>
            </div>
          </section>

          {/* NÚMEROS REAIS */}
          <section id="numeros" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><BarChart3 size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Os Números Reais</h2></div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_80px_1fr] border-b border-white/10 bg-white/[0.02]">
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Moeda</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Desde</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Perda</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Na prática</span></div>
              </div>
              {NUMEROS_REAIS.map((n, i) => (
                <div key={i} className={`grid grid-cols-[1fr_80px_80px_1fr] group hover:bg-red-500/[0.03] transition-colors ${i < NUMEROS_REAIS.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4"><span className="text-white font-bold text-sm">{n.moeda}</span></div>
                  <div className="p-4"><span className="text-slate-500 text-xs font-mono">{n.desde}</span></div>
                  <div className="p-4"><span className="text-red-500 font-black text-sm font-mono">{n.perda}</span></div>
                  <div className="p-4"><span className="text-slate-400 text-xs font-medium">{n.obs}</span></div>
                </div>
              ))}
            </div>
          </section>

          {/* TIMELINE */}
          <section id="timeline" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><Clock size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Linha do Tempo da Destruição</h2></div>
            <div className="relative">
              <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/40 via-red-500/20 to-transparent" />
              <div className="space-y-8">
                {TIMELINE_ITEMS.map((item, i) => (
                  <div key={i} className="relative flex gap-6 group">
                    <div className="relative z-10 shrink-0"><div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-red-500 bg-red-500/20' : 'border-red-500/30 bg-[#0a0a0a] group-hover:border-red-500/60'} transition-colors`}><span className="text-red-500 font-black text-[8px] font-mono">{item.ano}</span></div></div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 flex-1 group-hover:border-red-500/20 transition-colors"><h3 className="text-white font-black uppercase text-sm tracking-tight mb-2">{item.evento}</h3><p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 MENTIRAS */}
          <section id="mentiras" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><AlertTriangle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">As 3 Mentiras Sobre Inflação</h2></div>
            <div className="space-y-4">
              {MENTIRAS.map((m, i) => (
                <div key={i} className="card-inf rounded-sm p-8">
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2 italic">{m.mentira}</h3>
                  <p className="text-red-500 text-[10px] font-black uppercase font-mono tracking-wider mb-3">A Verdade:</p>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{m.verdade}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROTEÇÃO */}
          <section id="protecao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><ShieldAlert size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Como Se Proteger</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FERRAMENTAS.map((tool, i) => (
                <div key={i} className="card-inf rounded-sm p-8 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-red-500" size={18} /></div>
                    <div><h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{tool.titulo}</h3><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{tool.subtitulo}</p></div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium my-4">{tool.descricao}</p>
                  <div className="bg-red-950/20 border border-red-500/20 rounded-sm p-4"><p className="text-red-500 text-[10px] font-black uppercase font-mono leading-relaxed">{tool.destaque}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center"><Link to="/entenda-bitcoin" className="cta-gold inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-black uppercase text-xs tracking-[0.2em]">₿ Entender o Bitcoin</Link></div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-500 mb-10"><HelpCircle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Perguntas Frequentes</h2></div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"><h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3><ChevronDown className={`text-red-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} /></button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}><div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p></div></div>
                </div>
              ))}
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-red-500 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulseR 3s ease-in-out infinite' }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">A Verdade Nua:<br /><span className="text-red-500 italic">Inflação É Roubo.</span></h3>
              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">Agora você entende o que <strong className="text-white">99% da população não entende</strong>: a inflação não é um acidente, não é uma força da natureza e não é culpa dos empresários. É uma política deliberada que transfere riqueza de quem trabalha para quem imprime.</p>
                <p className="font-medium text-base">O próximo passo é <strong className="text-red-500">agir</strong>. Converter conhecimento em proteção. O Bitcoin, a diversificação e a educação financeira real são as armas que você tem.</p>
              </div>
              <Link to="/bitcoin-vs-fiat" className="cta-gold flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center mb-8 w-full md:w-auto md:inline-flex">⚡ Bitcoin vs Fiat: A Comparação</Link>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] font-mono mb-4">Continue Aprendendo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Do escambo ao Bitcoin' },
                  { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação definitiva' },
                  { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', desc: 'Diversificação jurisdicional' },
                  { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/5 bg-white/[0.01] rounded-sm px-5 py-4 hover:bg-red-500/[0.03] hover:border-white/10 transition-all group flex items-center justify-between">
                    <div><span className="text-white/80 font-bold uppercase text-[10px] tracking-wider font-mono">{link.titulo}</span><span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span></div>
                    <ChevronRight className="text-slate-700 group-hover:text-red-500 transition-colors shrink-0" size={14} />
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
                { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Como o dinheiro foi criado e corrompido', tag: 'EDUCAÇÃO' },
                { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação direta e definitiva', tag: 'COMPARAÇÃO' },
                { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all group">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{link.tag}</span>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-red-500 transition-colors">{link.titulo}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20 max-w-3xl"><div className="space-y-4 text-slate-500 text-xs leading-relaxed"><p><strong className="text-slate-400">Temas abordados:</strong> inflação, o que causa inflação, inflação como funciona, inflação rouba dinheiro, imposto inflacionário, Efeito Cantillon, expansão monetária, banco central, impressão de dinheiro, desvalorização, poder de compra, Bitcoin inflação, proteção contra inflação.</p></div></section>
        </div>
      </div>
    </div>
  );
}
