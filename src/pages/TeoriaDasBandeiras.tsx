import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, ChevronDown, HelpCircle, ArrowDown, Shield, Globe, Flag, MapPin, Landmark, CreditCard, Plane, FileText, Users, Scale, AlertTriangle, BookOpen, Wallet, Zap, Check } from 'lucide-react';
import { NAV_ITEMS, BANDEIRAS, POR_QUE_AGORA, CASO_BRASIL, PRIMEIROS_PASSOS, FERRAMENTAS, FAQ_ITEMS } from '@/lib/teoriaBandeirasData';

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } })) };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Teoria das Bandeiras: Diversificação Jurisdicional para Soberania Pessoal", "description": "A Teoria das Bandeiras (Flag Theory) é a estratégia de distribuir sua vida financeira e jurídica entre múltiplas jurisdições. Entenda como aplicar.", "author": { "@type": "Person", "name": "Lord Junnior" }, "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" }, "datePublished": "2026-03-07", "url": "https://lordjunnior.com.br/teoria-das-bandeiras", "keywords": "teoria das bandeiras, flag theory, diversificação jurisdicional, residência no exterior, segundo passaporte, offshore" };

export default function TeoriaDasBandeiras() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeBandeira, setActiveBandeira] = useState(0);

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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-emerald-600 overflow-x-hidden">
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

      <style>{`
        @keyframes emeraldDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .emerald-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(16,185,129,0.2) 100%,transparent),radial-gradient(1px 1px at 55% 45%,rgba(255,255,255,0.08) 100%,transparent);background-size:220px 220px;animation:emeraldDrift 65s linear infinite}
        .title-shimmer-e{background:linear-gradient(90deg,#10b981 0%,#34d399 40%,#fff 50%,#34d399 60%,#10b981 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShimE 3.5s linear infinite}
        @keyframes tShimE{0%{background-position:200% center}100%{background-position:-200% center}}
        .glass-sb{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes emeraldGlow{0%,100%{box-shadow:0 0 0 rgba(16,185,129,0)}50%{box-shadow:0 0 12px rgba(16,185,129,0.15)}}
        .nav-active-e{background:rgba(16,185,129,0.08);border-left:2px solid rgba(16,185,129,0.8);color:#f5f5f5;animation:emeraldGlow 3s ease-in-out infinite}
        .card-flag{border:1px solid rgba(16,185,129,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-flag:hover{border-color:rgba(16,185,129,0.4);box-shadow:0 0 25px rgba(16,185,129,0.07);transform:translateY(-3px)}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
        @keyframes borderPulseE{0%,100%{border-color:rgba(16,185,129,0.2)}50%{border-color:rgba(16,185,129,0.7)}}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15"><div className="emerald-grid" /></div>

      {/* SIDEBAR */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sb m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3"><Flag className="text-emerald-500" size={16} /><span className="text-emerald-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Teoria das Bandeiras</span></div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono"><ArrowLeft size={10} /> Início</Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1"><span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span><span className="text-[7px] font-black text-emerald-500 font-mono">{Math.round(scrollProgress)}%</span></div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} /></div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (<button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${activeSection === item.id ? 'nav-active-e' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'}`}>{item.label}</button>))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sb border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono"><ArrowLeft size={10} /> Início</Link>
          <div className="flex items-center gap-1"><Flag className="text-emerald-500" size={12} /><span className="text-emerald-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Bandeiras</span></div>
          <span className="text-[8px] font-black text-emerald-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} /></div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><span className="text-emerald-500" itemProp="name">Teoria das Bandeiras</span><meta itemProp="position" content="2" /></li>
            </ol>
          </nav>

          {/* HERO */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <Globe className="absolute top-0 right-0 text-emerald-600/[0.03] -mr-16 -mt-16" size={350} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8"><Flag className="text-emerald-500" size={16} /><span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Soberania Pessoal</span></div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8">Teoria das<br /><span className="title-shimmer-e italic inline-block pt-1">Bandeiras</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">A estratégia de distribuir sua vida financeira, jurídica e patrimonial entre <strong className="text-white">múltiplas jurisdições</strong> para que nenhum governo tenha <strong className="text-emerald-500">controle total sobre sua existência</strong>.</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">Entenda as <strong className="text-white">5 bandeiras clássicas</strong>, por que a diversificação jurisdicional é urgente no Brasil e como dar os primeiros passos, mesmo com orçamento limitado.</p>
              <button onClick={() => scrollTo('o-que-e')} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-10 group"><ArrowDown size={14} className="text-emerald-500 group-hover:translate-y-1 transition-transform" /> Entenda a estratégia</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('primeiros-passos')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">🏴 Primeiros Passos</button>
                <button onClick={() => scrollTo('bandeiras')} className="border border-white/10 bg-white/[0.02] px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2"><Flag size={14} /> As 5 Bandeiras</button>
              </div>
            </div>
          </header>

          {/* O QUE É */}
          <section id="o-que-e" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><Globe size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Que É a Teoria das Bandeiras</h2></div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
              <div className="space-y-5 text-slate-400 leading-relaxed">
                <p className="font-medium text-base">A <strong className="text-white">Teoria das Bandeiras</strong> (Flag Theory) foi popularizada por Harry D. Schultz nos anos 1960 e expandida por W.G. Hill nos anos 1980. A ideia central é simples: <strong className="text-emerald-500">não dependa de um único governo para tudo</strong>.</p>
                <p className="font-medium text-base">A maioria das pessoas nasce, vive, trabalha, guarda dinheiro, paga impostos e morre sob a jurisdição de um único país. Isso significa que <strong className="text-white">um único governo controla 100% da sua existência</strong>: pode confiscar sua poupança, congelar sua conta, tributar sua renda, impedir sua saída e regular cada aspecto da sua vida financeira.</p>
                <p className="font-medium text-base">A Teoria das Bandeiras propõe que você distribua esses elementos entre múltiplas jurisdições, assim como um investidor diversifica sua carteira. Se um governo age contra seus interesses, você tem alternativas. Não é sobre fugir. É sobre <strong className="text-emerald-500">ter opções</strong>.</p>
              </div>
            </div>
          </section>

          {/* AS 5 BANDEIRAS */}
          <section id="bandeiras" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><Flag size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">As 5 Bandeiras</h2></div>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {BANDEIRAS.map((b, i) => (
                <button key={i} onClick={() => setActiveBandeira(i)} className={`px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-wider font-mono transition-all ${activeBandeira === i ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-white/[0.02] border border-white/5 text-slate-500 hover:text-white'}`}>
                  {b.numero}ª {b.titulo.split(' / ')[0]}
                </button>
              ))}
            </div>

            {/* Active bandeira */}
            {BANDEIRAS.map((b, i) => activeBandeira === i && (
              <div key={i} className="card-flag rounded-sm p-8 md:p-12">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><b.icon className="text-emerald-500" size={22} /></div>
                  <div>
                    <span className="text-emerald-500/60 font-black text-[10px] font-mono tracking-wider">BANDEIRA {b.numero}</span>
                    <h3 className="text-white font-black uppercase text-lg tracking-tighter italic">{b.titulo}</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest font-mono">{b.subtitulo}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium my-6">{b.descricao}</p>
                <div className="space-y-2 mb-6">
                  {b.exemplos.map((ex, j) => (
                    <div key={j} className="flex items-start gap-2"><Check className="text-emerald-500 shrink-0 mt-0.5" size={14} /><span className="text-slate-300 text-xs font-medium">{ex}</span></div>
                  ))}
                </div>
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-sm p-4"><p className="text-emerald-500 text-[10px] font-black uppercase font-mono leading-relaxed">{b.destaque}</p></div>
              </div>
            ))}
          </section>

          {/* POR QUE AGORA */}
          <section id="por-que" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><AlertTriangle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Por Que Agora</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {POR_QUE_AGORA.map((item, i) => (
                <div key={i} className="card-flag rounded-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><item.icon className="text-emerald-500" size={18} /></div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CASO BRASIL */}
          <section id="brasil" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><AlertTriangle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Caso Brasil</h2></div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">O Brasil é um dos países onde a Teoria das Bandeiras é mais urgente. Não por ser o pior, mas porque combina <strong className="text-white">instabilidade histórica com poder estatal crescente</strong>:</p>
              <div className="space-y-3">
                {CASO_BRASIL.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-red-500 font-black text-[8px] font-mono">{i + 1}</span></div>
                    <span className="text-slate-300 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-red-950/10 border border-red-500/20 rounded-sm p-6 mt-8">
                <p className="text-red-500 text-[10px] font-black uppercase font-mono tracking-wider mb-2">Conclusão</p>
                <p className="text-white font-black text-sm leading-tight uppercase italic">Quem tem 100% da vida sob uma única jurisdição está 100% vulnerável a decisões de um único governo.</p>
              </div>
            </div>
          </section>

          {/* PRIMEIROS PASSOS */}
          <section id="primeiros-passos" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><Wallet size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Primeiros Passos</h2></div>
            <div className="space-y-4">
              {PRIMEIROS_PASSOS.map((step) => (
                <div key={step.passo} className="card-flag rounded-sm p-8 flex gap-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-emerald-500 font-black text-lg font-mono">{step.passo}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic mb-1">{step.titulo}</h3>
                    <div className="flex gap-3 mb-3">
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-500/60 font-mono">Dificuldade: {step.dificuldade}</span>
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 font-mono">Custo: {step.custo}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">{step.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FERRAMENTAS */}
          <section id="ferramentas" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><Shield size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Arsenal Prático</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FERRAMENTAS.map((tool, i) => (
                <div key={i} className="card-flag rounded-sm p-8 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0"><tool.icon className="text-emerald-500" size={18} /></div>
                    <div><h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{tool.titulo}</h3><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{tool.subtitulo}</p></div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium my-4">{tool.descricao}</p>
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-sm p-4"><p className="text-emerald-500 text-[10px] font-black uppercase font-mono leading-relaxed">{tool.destaque}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-emerald-500 mb-10"><HelpCircle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Perguntas Frequentes</h2></div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"><h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3><ChevronDown className={`text-emerald-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} /></button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}><div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p></div></div>
                </div>
              ))}
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-emerald-500 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulseE 3s ease-in-out infinite' }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">Soberania<br /><span className="text-emerald-500 italic">Pessoal.</span></h3>
              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">A Teoria das Bandeiras não é sobre paranoia. É sobre <strong className="text-white">planejamento racional</strong>. Não é sobre fugir do Brasil. É sobre ter <strong className="text-emerald-500">opções reais</strong> caso o Brasil (ou qualquer país) tome decisões que prejudiquem sua vida financeira.</p>
                <p className="font-medium text-base">Comece com Bitcoin. Depois, uma conta internacional. Depois, uma segunda residência. Cada bandeira que você planta é <strong className="text-white">uma camada a mais de proteção</strong> entre você e um governo que pode mudar as regras a qualquer momento.</p>
              </div>
              <Link to="/autocustodia" className="cta-gold flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center mb-8 w-full md:w-auto md:inline-flex">₿ Começar com Autocustódia</Link>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] font-mono mb-4">Continue Aprendendo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { to: '/historia-do-dinheiro', titulo: 'História do Dinheiro', desc: 'Como chegamos até aqui' },
                  { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação rouba seu dinheiro' },
                  { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação definitiva' },
                  { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/5 bg-white/[0.01] rounded-sm px-5 py-4 hover:bg-emerald-500/[0.03] hover:border-white/10 transition-all group flex items-center justify-between">
                    <div><span className="text-white/80 font-bold uppercase text-[10px] tracking-wider font-mono">{link.titulo}</span><span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span></div>
                    <ChevronRight className="text-slate-700 group-hover:text-emerald-500 transition-colors shrink-0" size={14} />
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
                { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'A comparação direta e definitiva', tag: 'COMPARAÇÃO' },
                { to: '/alertas/cbdc-brasil', titulo: 'DREX: CBDC Brasil', desc: 'A moeda digital programável do governo', tag: 'ALERTA' },
                { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à soberania financeira', tag: 'FUNDAMENTO' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all group">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{link.tag}</span>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-emerald-500 transition-colors">{link.titulo}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20 max-w-3xl"><div className="space-y-4 text-slate-500 text-xs leading-relaxed"><p><strong className="text-slate-400">Temas abordados:</strong> teoria das bandeiras, flag theory, diversificação jurisdicional, residência no exterior, segundo passaporte, offshore, cidadania por investimento, conta bancária internacional, Paraguai, Panamá, Portugal, domicílio fiscal, Bitcoin autocustódia.</p></div></section>
        </div>
      </div>
    </div>
  );
}
