import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Cpu, Globe, ShieldAlert, Eye, AlertTriangle, Lock, Ban, ChevronRight, ChevronDown, Play, GraduationCap, Zap, BookOpen, HelpCircle, Clock, ArrowDown, Wallet, Server, Code, Landmark } from 'lucide-react';
import { NAV_ITEMS, CBDC_GLOBAL, COMO_FUNCIONA_ETAPAS, COMPARACAO, RISCOS, FERRAMENTAS, TIMELINE_ITEMS, FAQ_ITEMS } from '@/lib/cbdcBrasilData';

/* ───────────── SCHEMAS ───────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.pergunta,
    "acceptedAnswer": { "@type": "Answer", "text": item.resposta }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "DREX — A Moeda Digital do Banco Central que pode controlar seu dinheiro",
  "description": "Entenda o que é o DREX (Real Digital), como a CBDC brasileira funciona, os riscos para sua privacidade financeira e como se proteger com Bitcoin e diversificação jurisdicional.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07",
  "dateModified": "2026-03-07",
  "url": "https://lordjunnior.com.br/alertas/cbdc-brasil",
  "keywords": "DREX, moeda digital banco central, CBDC Brasil, real digital, Drex como funciona, moeda digital programável, dinheiro digital governo, DREX riscos, DREX vs Bitcoin"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como se proteger do DREX e da moeda digital do governo",
  "description": "Estratégias práticas para proteger sua soberania financeira contra o dinheiro programável do Banco Central.",
  "step": [
    { "@type": "HowToStep", "name": "Entenda o DREX", "text": "Compreenda como a moeda digital do Banco Central funciona, seus riscos e implicações para sua privacidade financeira." },
    { "@type": "HowToStep", "name": "Adquira Bitcoin com autocustódia", "text": "Armazene valor em um ativo descentralizado onde só você controla as chaves privadas — impossível de confiscar." },
    { "@type": "HowToStep", "name": "Use Bitcoin P2P", "text": "Compre Bitcoin sem KYC em plataformas descentralizadas como Bisq, Spike to Spike e RoboSats." },
    { "@type": "HowToStep", "name": "Diversifique jurisdições", "text": "Distribua patrimônio, documentação e contas entre múltiplas jurisdições para reduzir risco de controle centralizado." },
    { "@type": "HowToStep", "name": "Aprenda Lightning Network", "text": "Use a rede Lightning para transações rápidas, baratas e privadas — o oposto do DREX." }
  ]
};

/* ───────────── COMPONENTE ───────────── */
export default function CbdcBrasil() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-purple-600 overflow-x-hidden">

      {/* ── SEO ── */}
      <Helmet>
        <title>DREX — Moeda Digital do Banco Central do Brasil (CBDC) | Lord Junnior</title>
        <meta name="description" content="O DREX (Real Digital) é a moeda digital programável do Banco Central do Brasil. Entenda como funciona, os riscos para sua privacidade financeira e como se proteger com Bitcoin e autocustódia." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/cbdc-brasil" />
        <meta property="og:title" content="DREX — A Moeda Digital Programável do Governo Brasileiro" />
        <meta property="og:description" content="Entenda o DREX, a CBDC brasileira que dá ao governo controle total sobre o seu dinheiro. Veja os riscos e como se proteger." />
        <meta property="og:url" content="https://lordjunnior.com.br/alertas/cbdc-brasil" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      {/* ── Partículas ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="cbdc-grid" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="cbdc-scan" />
      </div>

      <style>{`
        @keyframes cbdcDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .cbdc-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(147,51,234,0.3) 100%,transparent),radial-gradient(1px 1px at 45% 55%,rgba(255,255,255,0.12) 100%,transparent),radial-gradient(2px 2px at 75% 35%,rgba(147,51,234,0.2) 100%,transparent);background-size:220px 220px;animation:cbdcDrift 65s linear infinite}
        @keyframes cbdcScan{0%{top:-5%;opacity:0}10%{opacity:0.06}90%{opacity:0.06}100%{top:105%;opacity:0}}
        .cbdc-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(147,51,234,0.25),transparent);animation:cbdcScan 9s linear infinite}
        .title-shimmer-purple{background:linear-gradient(90deg,#9333ea 0%,#c084fc 40%,#fff 50%,#c084fc 60%,#9333ea 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShimP 3.5s linear infinite}
        @keyframes tShimP{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes alertBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        .alert-blink{animation:alertBlink 2s ease-in-out infinite}
        .card-cbdc{border:1px solid rgba(147,51,234,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-cbdc:hover{border-color:rgba(147,51,234,0.45);box-shadow:0 0 25px rgba(147,51,234,0.07);transform:translateY(-3px)}
        .glass-sidebar-cbdc{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes purpleGlow{0%,100%{box-shadow:0 0 0 rgba(147,51,234,0)}50%{box-shadow:0 0 12px rgba(147,51,234,0.15)}}
        .nav-active-cbdc{background:rgba(147,51,234,0.08);border-left:2px solid rgba(147,51,234,0.8);color:#f5f5f5;animation:purpleGlow 3s ease-in-out infinite}
        @keyframes borderPulsePurple{0%,100%{border-color:rgba(147,51,234,0.2);box-shadow:0 0 10px rgba(147,51,234,0.02)}50%{border-color:rgba(147,51,234,0.7);box-shadow:0 0 30px rgba(147,51,234,0.1)}}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
      `}</style>

      {/* ═══════════ SIDEBAR ═══════════ */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar-cbdc m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="text-purple-500" size={16} />
              <span className="text-purple-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">CBDC Brasil</span>
            </div>
            <Link to="/alertas" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Alertas
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-purple-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id ? 'nav-active-cbdc' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════ MOBILE NAV ═══════════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sidebar-cbdc border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/alertas" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Alertas
          </Link>
          <div className="flex items-center gap-1">
            <Cpu className="text-purple-500" size={12} />
            <span className="text-purple-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">DREX</span>
          </div>
          <span className="text-[8px] font-black text-purple-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
        </div>
      </div>

      {/* ═══════════ MAIN ═══════════ */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* ══════ BREADCRUMBS ══════ */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/alertas" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Alertas</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-purple-500" itemProp="name">CBDC Brasil — DREX</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* ══════ HERO ══════ */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
            <Cpu className="absolute top-0 right-0 text-purple-600/[0.03] -mr-16 -mt-16" size={350} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="text-purple-600 alert-blink" size={16} />
                <span className="text-purple-600 font-black uppercase tracking-[0.4em] text-[9px] font-mono alert-blink">Alerta Monetário</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8 overflow-visible">
                O Governo Quer<br />
                <span className="title-shimmer-purple italic inline-block pt-1">Programar Seu Dinheiro</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">
                O <strong className="text-white">DREX</strong> é a moeda digital do Banco Central do Brasil — uma <strong className="text-purple-500">CBDC programável</strong> que dá ao governo controle absoluto sobre cada transação, cada real e cada decisão financeira da sua vida.
              </p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">
                Entenda o que é o DREX, como a moeda digital do Banco Central funciona na prática, quais são os riscos reais para sua privacidade financeira e como proteger sua <strong className="text-white">soberania monetária</strong> com ferramentas que nenhum governo pode controlar.
              </p>

              <button onClick={() => scrollTo('como-funciona')} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-10 group">
                <ArrowDown size={14} className="text-purple-500 group-hover:translate-y-1 transition-transform" />
                Entenda como funciona
              </button>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={() => scrollTo('arsenal')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">
                  🛡️ Ver Como Se Proteger
                </button>
                <button onClick={() => scrollTo('video')} className="border border-white/10 bg-white/[0.02] px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
                  <Play size={14} /> Assistir Vídeo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-purple-600/20 bg-purple-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-purple-500 mb-1">DREX</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Real Digital</p>
                </div>
                <div className="border border-purple-600/20 bg-purple-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-purple-500 mb-1">CBDC</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Moeda Programável</p>
                </div>
                <div className="border border-purple-600/20 bg-purple-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-purple-500 mb-1">215 mi</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Brasileiros Afetados</p>
                </div>
              </div>
            </div>
          </header>

          {/* ══════ VÍDEO ══════ */}
          <section id="video" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <Play size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Assista ao Vídeo Completo</h2>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                  title="DREX — O que o governo não quer que você saiba sobre a moeda digital"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-6 border-t border-white/5">
                <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2">DREX — O que o governo não quer que você saiba sobre a moeda digital</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  Neste vídeo, Lord Junnior analisa a moeda digital do Banco Central do Brasil, os riscos para sua privacidade financeira e as estratégias práticas para proteger sua soberania monetária.
                </p>
              </div>
            </div>
          </section>

          {/* ══════ COMO FUNCIONA ══════ */}
          <section id="como-funciona" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <Code size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Como o DREX Funciona</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              O DREX opera em uma <strong className="text-white">blockchain permissionada</strong> (Hyperledger Besu) controlada exclusivamente pelo Banco Central. Diferente do Bitcoin, onde qualquer pessoa pode participar da rede, no DREX apenas instituições autorizadas têm acesso. Entenda cada camada dessa arquitetura de controle:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {COMO_FUNCIONA_ETAPAS.map((etapa, i) => (
                <div key={i} className="card-cbdc rounded-sm p-8 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
                      <etapa.icon className="text-purple-500" size={18} />
                    </div>
                    <div>
                      <span className="text-purple-500/60 font-black text-[10px] font-mono tracking-wider">CAMADA {i + 1}</span>
                      <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{etapa.titulo}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{etapa.descricao}</p>
                </div>
              ))}
            </div>

            {/* CBDC Global */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Globe className="text-purple-500" size={14} />
                  <h3 className="text-white font-black uppercase text-sm tracking-tight">CBDCs no Mundo — O Cerco Global</h3>
                </div>
                <p className="text-slate-500 text-xs font-medium mt-2">Mais de 130 países estão desenvolvendo moedas digitais de banco central. O Brasil não está sozinho nessa agenda.</p>
              </div>
              <div className="grid grid-cols-[1fr_100px_120px_80px] border-b border-white/10 bg-white/[0.02]">
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">País</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Moeda</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Status</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Pop.</span></div>
              </div>
              {CBDC_GLOBAL.map((row, i) => (
                <div key={i} className={`grid grid-cols-[1fr_100px_120px_80px] group hover:bg-purple-600/[0.03] transition-colors ${i < CBDC_GLOBAL.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4 flex items-center gap-2">
                    <span className="text-lg">{row.flag}</span>
                    <span className="text-white font-bold text-sm">{row.pais}</span>
                  </div>
                  <div className="p-4"><span className="text-purple-500 font-black text-xs font-mono">{row.moeda}</span></div>
                  <div className="p-4"><span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">{row.status}</span></div>
                  <div className="p-4"><span className="text-slate-500 text-xs font-mono">{row.pop}</span></div>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_100px_120px_80px] bg-purple-950/10 border-t border-purple-600/20">
                <div className="p-4 flex items-center gap-2">
                  <span className="text-lg">🇧🇷</span>
                  <span className="text-white font-black text-sm">Brasil</span>
                </div>
                <div className="p-4"><span className="text-purple-500 font-black text-xs font-mono">DREX</span></div>
                <div className="p-4"><span className="text-xs font-bold text-purple-500 uppercase tracking-wider alert-blink">Em testes</span></div>
                <div className="p-4"><span className="text-slate-500 text-xs font-mono">215 mi</span></div>
              </div>
            </div>
          </section>

          {/* ══════ DREX vs BITCOIN ══════ */}
          <section id="diferenca" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">DREX vs Bitcoin</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              Muita gente confunde DREX com Bitcoin porque ambos usam "blockchain". Mas as semelhanças param aí. O DREX é o <strong className="text-white">oposto filosófico e tecnológico</strong> do Bitcoin. Um é ferramenta de controle. O outro é ferramenta de libertação.
            </p>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="grid grid-cols-[120px_1fr_1fr] border-b border-white/10 bg-white/[0.02]">
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Aspecto</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-500 font-mono">DREX</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono">Bitcoin</span></div>
              </div>
              {COMPARACAO.map((row, i) => (
                <div key={i} className={`grid grid-cols-[120px_1fr_1fr] group hover:bg-white/[0.02] transition-colors ${i < COMPARACAO.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4"><span className="text-white font-bold text-xs">{row.aspecto}</span></div>
                  <div className="p-4"><span className="text-red-400/80 text-xs font-medium">{row.drex}</span></div>
                  <div className="p-4"><span className="text-emerald-400/80 text-xs font-medium">{row.bitcoin}</span></div>
                </div>
              ))}
            </div>

            <div className="bg-purple-950/10 border border-purple-600/20 rounded-sm p-6 mt-6">
              <p className="text-purple-500 text-[10px] font-black uppercase font-mono tracking-wider mb-2">A Diferença Fundamental</p>
              <p className="text-white font-black text-base leading-tight uppercase italic">
                O DREX é dinheiro do governo, controlado pelo governo, para benefício do governo. O Bitcoin é dinheiro do indivíduo, controlado pelo indivíduo, para soberania do indivíduo.
              </p>
            </div>
          </section>

          {/* ══════ TIMELINE ══════ */}
          <section id="timeline" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <Clock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Linha do Tempo do DREX</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              A construção do DREX não começou ontem. Cada passo foi calculado para <strong className="text-white">normalizar a digitalização</strong> antes de implementar o controle total:
            </p>

            <div className="relative">
              <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-600/40 via-purple-600/20 to-transparent" />
              <div className="space-y-8">
                {TIMELINE_ITEMS.map((item, i) => (
                  <div key={i} className="relative flex gap-6 group">
                    <div className="relative z-10 shrink-0">
                      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${
                        i === TIMELINE_ITEMS.length - 1
                          ? 'border-purple-600 bg-purple-600/20'
                          : 'border-purple-600/30 bg-[#0a0a0a] group-hover:border-purple-600/60'
                      } transition-colors`}>
                        <span className="text-purple-500 font-black text-[10px] font-mono">{item.ano}</span>
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 flex-1 group-hover:border-purple-600/20 transition-colors">
                      <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2">{item.evento}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ 5 RISCOS ══════ */}
          <section id="riscos" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Os 5 Riscos Reais do DREX</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              O Banco Central apresenta o DREX como "inovação". A mídia repete. Os bancos aplaudem. Mas quando você remove a camada de marketing institucional, o que sobra é uma <strong className="text-white">ferramenta de controle financeiro sem precedentes</strong>:
            </p>

            <div className="space-y-4">
              {RISCOS.map((risco, i) => (
                <div key={i} className="card-cbdc rounded-sm p-8 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600/10 border border-purple-600/20 flex items-center justify-center shrink-0">
                      <risco.icon className="text-purple-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{risco.titulo}</h3>
                        <span className={`text-[8px] font-black uppercase tracking-[0.3em] font-mono px-2 py-0.5 rounded-sm ${
                          risco.gravidade === 'CRÍTICO' ? 'text-red-500 bg-red-950/30' : 'text-amber-500 bg-amber-950/30'
                        }`}>{risco.gravidade}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">{risco.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ O ERRO FATAL ══════ */}
          <section id="erro-comum" className="mb-28 scroll-mt-24">
            <div className="border-2 border-amber-500/20 bg-gradient-to-br from-amber-950/10 to-[#0a0a0a] rounded-sm p-8 md:p-12 relative overflow-hidden">
              <AlertTriangle className="absolute top-0 right-0 text-amber-500/[0.04] -mr-8 -mt-8" size={200} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="text-amber-500" size={14} />
                  <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Atenção</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 leading-tight">
                  O Erro Fatal Que<br /><span className="text-amber-500 italic">Quase Todos Cometem</span>
                </h3>
                <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-3xl">
                  A maioria das pessoas ouve falar do DREX e pensa: <strong className="text-white">"É só uma versão digital do Real. Não muda nada."</strong> Esse é o erro. A mudança não é na forma do dinheiro — é no <strong className="text-purple-500">poder sobre o dinheiro</strong>.
                </p>
                <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-3xl">
                  Quando o dinheiro se torna programável pelo governo, ele deixa de ser um meio de troca neutro e se transforma em uma <strong className="text-white">ferramenta de controle social</strong>. O governo pode definir onde você gasta, quanto você gasta, quando você gasta — e pode mudar essas regras a qualquer momento, sem aviso, sem consulta, sem recurso.
                </p>
                <p className="text-slate-400 text-base leading-relaxed font-medium mb-6 max-w-3xl">
                  Isso não é teoria da conspiração. A China já faz isso com o e-CNY. A Nigéria já tentou com o eNaira. A tecnologia está pronta. A infraestrutura está sendo construída. A única pergunta é: <strong className="text-white">quando</strong>.
                </p>
                <p className="text-white font-black text-sm uppercase tracking-wider">
                  As ferramentas abaixo existem para devolver o poder a quem ele pertence: você.
                </p>
              </div>
            </div>
          </section>

          {/* ══════ ARSENAL DE DEFESA ══════ */}
          <section id="arsenal" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Arsenal de Defesa</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-3xl">
              O DREX é uma ferramenta de controle. Mas o controle só funciona quando não existem alternativas. E as alternativas existem — são <strong className="text-white">legais, funcionais e cada vez mais acessíveis</strong>. Cada ferramenta abaixo é uma camada de proteção contra o dinheiro programável do governo.
            </p>
            <p className="text-amber-500/80 text-xs font-bold uppercase tracking-wider mb-10 font-mono">
              ⚠ Todas as ferramentas listadas são legais. Utilize-as com responsabilidade e dentro da legislação vigente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FERRAMENTAS.map((tool, i) => (
                <div key={i} className="card-cbdc rounded-sm p-8 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-600/10 border border-purple-600/20 flex items-center justify-center shrink-0">
                      <tool.icon className="text-purple-500" size={18} />
                    </div>
                    <div>
                      <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{tool.titulo}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{tool.subtitulo}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium my-4">{tool.descricao}</p>
                  <div className="bg-purple-950/20 border border-purple-600/20 rounded-sm p-4">
                    <p className="text-purple-500 text-[10px] font-black uppercase font-mono leading-relaxed">{tool.destaque}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/autocustodia" className="cta-gold inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-black uppercase text-xs tracking-[0.2em]">
                🔐 Aprender Autocustódia Agora
              </Link>
              <p className="text-slate-600 text-[9px] font-bold uppercase tracking-wider mt-3 font-mono">
                O antídoto contra o dinheiro programável
              </p>
            </div>
          </section>

          {/* ══════ AUTORIDADE ══════ */}
          <section id="autoridade" className="mb-28 scroll-mt-24">
            <div className="relative overflow-hidden rounded-sm border border-[#d4af37]/20 bg-gradient-to-br from-[#0a0a0a] via-[#0d0b05] to-[#0a0a0a]" style={{ animation: 'goldPulse 4s ease-in-out infinite' }}>
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
              <GraduationCap className="absolute top-0 right-0 text-[#d4af37]/[0.03] -mr-12 -mt-12" size={280} />

              <div className="relative z-10 p-10 md:p-14">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="text-[#d4af37]" size={14} />
                  <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[9px] font-mono">Formação Avançada</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">
                  Domine as Ferramentas<br />
                  <span className="text-[#d4af37] italic">Contra o DREX</span>
                </h2>

                <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-2xl">
                  Na <strong className="text-[#d4af37]">Universidade Satoshi</strong> você aprende estratégias avançadas de autocustódia, privacidade financeira, Lightning Network e internacionalização — com quem já vive fora do sistema e pratica tudo que ensina.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <BookOpen className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Autocustódia</p>
                  </div>
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <Zap className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Lightning Network</p>
                  </div>
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <Globe className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Internacionalização</p>
                  </div>
                </div>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-gold inline-block px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center"
                >
                  🎓 Assumir Minha Soberania Financeira
                </a>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider mt-4 font-mono">
                  Acesso exclusivo para membros da comunidade
                </p>
              </div>
            </div>
          </section>

          {/* ══════ FAQ ══════ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-purple-600 mb-10">
              <HelpCircle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Perguntas Frequentes</h2>
            </div>

            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                    <ChevronDown
                      className={`text-purple-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                      size={16}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ CONCLUSÃO ══════ */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-purple-600 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulsePurple 3s ease-in-out infinite' }}>
            <Cpu className="absolute top-0 right-0 text-purple-600/[0.03] -mr-10 -mt-10" size={240} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">
                A Escolha<br /><span className="text-purple-600 italic">É Sua.</span>
              </h3>

              <div className="space-y-6 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">
                  O DREX não é inevitável. Ele é inevitável <strong className="text-white">para quem não se prepara</strong>. Para quem entende o jogo, existe Bitcoin. Existe autocustódia. Existe a Lightning Network. Existem jurisdições que respeitam a privacidade financeira. Existe um mundo inteiro fora do alcance do Banco Central.
                </p>
                <p className="font-medium text-base">
                  A tecnologia que o governo usa para controlar também pode ser usada para <strong className="text-purple-500">libertar</strong>. A diferença está em quem controla: o Estado ou você. O DREX é a resposta do governo. O <strong className="text-white">Bitcoin é a resposta do indivíduo</strong>.
                </p>
              </div>

              <Link to="/autocustodia" className="cta-gold flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center mb-8 w-full md:w-auto md:inline-flex">
                🔐 Aprender Autocustódia Agora
              </Link>

              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] font-mono mb-4">Continue Aprendendo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'Fim do Dinheiro Vivo', desc: 'PL 3.951 e limites ao espécie' },
                  { to: '/economia-paralela', titulo: 'Economia Paralela', desc: 'Operar fora do sistema' },
                  { to: '/lightning', titulo: 'Lightning Network', desc: 'Pagamentos soberanos' },
                  { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à soberania' },
                  { to: '/blindagem-golpes', titulo: 'Blindagem Anti-Golpes', desc: 'Proteger o elo fraco' },
                  { to: '/alertas', titulo: 'Central de Alertas', desc: 'Todos os alertas ativos' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/5 bg-white/[0.01] rounded-sm px-5 py-4 hover:bg-purple-600/[0.03] hover:border-white/10 transition-all group flex items-center justify-between">
                    <div>
                      <span className="text-white/80 font-bold uppercase text-[10px] tracking-wider font-mono">{link.titulo}</span>
                      <span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span>
                    </div>
                    <ChevronRight className="text-slate-700 group-hover:text-purple-500 transition-colors shrink-0" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ LEIA TAMBÉM ══════ */}
          <section className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-slate-500 mb-8">
              <BookOpen size={16} />
              <h2 className="text-sm font-black uppercase tracking-[0.15em] font-mono">Leia Também</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'Fim do Dinheiro Vivo', desc: 'PL 3.951 e os limites ao dinheiro em espécie no Brasil', tag: 'ALERTA' },
                { to: '/autocustodia', titulo: 'Autocustódia de Bitcoin', desc: 'O antídoto contra o dinheiro programável do governo', tag: 'FUNDAMENTO' },
                { to: '/alertas', titulo: 'Central de Alertas', desc: 'Todos os alertas de soberania em um só lugar', tag: 'HUB' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-purple-600/20 hover:bg-purple-600/[0.02] transition-all group">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{link.tag}</span>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-purple-500 transition-colors">{link.titulo}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ══════ SEO RICH TEXT ══════ */}
          <section className="mb-20 max-w-3xl">
            <div className="space-y-4 text-slate-500 text-xs leading-relaxed">
              <p>
                <strong className="text-slate-400">Sobre este conteúdo:</strong> Esta página aborda o DREX (Real Digital), a moeda digital do Banco Central do Brasil (CBDC), seus mecanismos de funcionamento, os riscos para a privacidade financeira dos cidadãos e as ferramentas legítimas disponíveis para proteger a soberania monetária individual. O conteúdo não constitui aconselhamento financeiro ou jurídico.
              </p>
              <p>
                <strong className="text-slate-400">Temas abordados:</strong> DREX, moeda digital banco central, CBDC Brasil, real digital, Drex como funciona, moeda digital programável, dinheiro digital governo, DREX riscos, DREX vs Bitcoin, e-CNY, eNaira, euro digital, autocustódia Bitcoin, Lightning Network, privacidade financeira, dinheiro programável, blockchain permissionada, Hyperledger Besu, tokenização de ativos.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
