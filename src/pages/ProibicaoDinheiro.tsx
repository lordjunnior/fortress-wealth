import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Ban, Globe, ShieldAlert, Eye, Banknote, AlertTriangle, Lock, Users, ChevronRight, ChevronDown, Scale, Play, GraduationCap, Zap, BookOpen, HelpCircle } from 'lucide-react';
import { NAV_ITEMS, LIMITES_INTERNACIONAIS, FERRAMENTAS, CONSEQUENCIAS, FAQ_ITEMS, ESCADA_RESTRICAO } from '@/lib/proibicaoDinheiroData';

/* ───────────── FAQ SCHEMA JSON-LD ───────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.pergunta,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.resposta,
    }
  }))
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Governo pode limitar dinheiro vivo no Brasil — Como proteger sua privacidade financeira",
  "description": "Entenda o PL 3.951/2019, os limites ao dinheiro em espécie na Europa e as ferramentas legais para proteger sua soberania financeira com Bitcoin e diversificação jurisdicional.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07",
  "dateModified": "2026-03-07",
  "url": "https://lordjunnior.com.br/proibicao-dinheiro",
  "keywords": "PL 3951, limite dinheiro vivo Brasil, privacidade financeira, Bitcoin sem KYC, teoria das bandeiras, autocustódia Bitcoin"
};

/* ───────────── COMPONENTE ───────────── */
export default function ProibicaoDinheiro() {
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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 overflow-x-hidden">

      {/* ── SEO Meta + Schema ── */}
      <Helmet>
        <title>Governo Limita Dinheiro Vivo no Brasil — PL 3951 | Lord Junnior</title>
        <meta name="description" content="O PL 3.951/2019 abre caminho para limitar o uso de dinheiro em espécie no Brasil. Entenda o projeto, veja os limites na Europa e descubra ferramentas legais para proteger sua privacidade financeira." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/fim-do-dinheiro-vivo" />
        <meta property="og:title" content="Governo Limita Dinheiro Vivo no Brasil — PL 3951" />
        <meta property="og:description" content="Entenda o PL 3.951 e como proteger sua privacidade financeira com Bitcoin P2P, teoria das bandeiras e autocustódia." />
        <meta property="og:url" content="https://lordjunnior.com.br/proibicao-dinheiro" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* ── Partículas ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="surveillance-grid" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="scan-line" />
      </div>

      <style>{`
        @keyframes surveillanceDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .surveillance-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(220,38,38,0.3) 100%,transparent),radial-gradient(1px 1px at 45% 55%,rgba(255,255,255,0.12) 100%,transparent),radial-gradient(2px 2px at 75% 35%,rgba(220,38,38,0.2) 100%,transparent);background-size:220px 220px;animation:surveillanceDrift 65s linear infinite}
        @keyframes scanDown{0%{top:-5%;opacity:0}10%{opacity:0.06}90%{opacity:0.06}100%{top:105%;opacity:0}}
        .scan-line{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(220,38,38,0.25),transparent);animation:scanDown 9s linear infinite}
        .title-shimmer{background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fff 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShim 3.5s linear infinite}
        @keyframes tShim{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes alertBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        .alert-blink{animation:alertBlink 2s ease-in-out infinite}
        .card-threat{border:1px solid rgba(220,38,38,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-threat:hover{border-color:rgba(220,38,38,0.45);box-shadow:0 0 25px rgba(220,38,38,0.07);transform:translateY(-3px)}
        .glass-sidebar{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes redGlow{0%,100%{box-shadow:0 0 0 rgba(220,38,38,0)}50%{box-shadow:0 0 12px rgba(220,38,38,0.15)}}
        .nav-active{background:rgba(220,38,38,0.08);border-left:2px solid rgba(220,38,38,0.8);color:#f5f5f5;animation:redGlow 3s ease-in-out infinite}
        @keyframes borderPulse{0%,100%{border-color:rgba(220,38,38,0.2);box-shadow:0 0 10px rgba(220,38,38,0.02)}50%{border-color:rgba(220,38,38,0.7);box-shadow:0 0 30px rgba(220,38,38,0.1)}}
        .escada-step{position:relative;padding-left:2rem;border-left:2px solid rgba(220,38,38,0.15)}
        .escada-step::before{content:'';position:absolute;left:-6px;top:6px;width:10px;height:10px;border-radius:50%;background:#dc2626;border:2px solid #070A12}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
      `}</style>

      {/* ═══════════ SIDEBAR ═══════════ */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Ban className="text-red-500" size={16} />
              <span className="text-red-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Proibição</span>
            </div>
            <Link to="/protocolo-inicial" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Protocolo
            </Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id ? 'nav-active' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════ MOBILE NAV ═══════════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/protocolo-inicial" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Protocolo
          </Link>
          <div className="flex items-center gap-1">
            <Ban className="text-red-500" size={12} />
            <span className="text-red-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Proibição</span>
          </div>
          <span className="text-[8px] font-black text-red-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
        </div>
      </div>

      {/* ═══════════ MAIN ═══════════ */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* ══════ HERO ══════ */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
            <Banknote className="absolute top-0 right-0 text-red-600/[0.03] -mr-16 -mt-16" size={350} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="text-red-600 alert-blink" size={16} />
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] font-mono alert-blink">Alerta Legislativo</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8 overflow-visible">
                O Governo Quer<br />
                <span className="title-shimmer italic inline-block pt-1">Limitar Seu Dinheiro</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-6 font-medium">
                O Projeto de Lei <strong className="text-white">PL 3.951/2019</strong> abriu caminho para que o governo brasileiro estabeleça <strong className="text-red-500">limites ao uso de dinheiro em espécie</strong>. Hoje começa com transações específicas. Amanhã, pode ser o troco do pão.
              </p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">
                Aqui você vai entender o que está acontecendo, ver como a Europa já avançou nessa agenda, conhecer as ferramentas legais para proteger sua privacidade financeira — e descobrir como <strong className="text-white">manter o poder na sua mão</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={() => scrollTo('ferramentas')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">
                  🛡️ Ver Como Se Proteger
                </button>
                <button onClick={() => scrollTo('video')} className="border border-white/10 bg-white/[0.02] px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
                  <Play size={14} /> Assistir Vídeo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-red-600/20 bg-red-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-red-500 mb-1">PL 3.951</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Projeto de Lei</p>
                </div>
                <div className="border border-red-600/20 bg-red-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-red-500 mb-1">CCJ</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Aprovado na Comissão</p>
                </div>
                <div className="border border-red-600/20 bg-red-950/10 rounded-sm p-6 text-center">
                  <p className="text-3xl font-black text-red-500 mb-1">∞</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Precedente Aberto</p>
                </div>
              </div>
            </div>
          </header>

          {/* ══════ VÍDEO EMBED ══════ */}
          <section id="video" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Play size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Assista ao Vídeo Completo</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {/* SUBSTITUIR o VIDEO_ID pelo ID real do YouTube */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                  title="Governo PROÍBE dinheiro vivo — Conheça as ALTERNATIVAS"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-6 border-t border-white/5">
                <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2">Governo PROÍBE dinheiro vivo — Conheça as ALTERNATIVAS</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  Neste vídeo, Lord Junnior analisa o PL 3.951/2019, explica a agenda global de eliminação do dinheiro físico e apresenta ferramentas práticas para proteger sua privacidade financeira — direto da Patagônia, Argentina.
                </p>
              </div>
            </div>
          </section>

          {/* ══════ PL 3951 — O PRECEDENTE ══════ */}
          <section id="pl3951" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Scale size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">PL 3.951/2019 — O Precedente</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12 mb-8">
              <h3 className="text-white font-black uppercase text-lg tracking-tight mb-6">O Que Esse Projeto Faz</h3>
              <div className="space-y-5 text-slate-400 leading-relaxed">
                <p className="font-medium">
                  A Comissão de Constituição e Justiça (CCJ) aprovou o <strong className="text-white">PL 3.951/2019</strong>, que abre a possibilidade de estabelecer limites para transações realizadas em dinheiro vivo no Brasil. Na tentativa inicial, o texto buscava <strong className="text-red-500">ilegalizar e tornar passível de confisco</strong> transações acima de R$ 10.000 feitas em espécie ou boleto. Diante da resistência, recuaram para uma versão mais "leve" — mas o precedente já foi aberto.
                </p>
                <p className="font-medium">
                  O projeto ainda <strong className="text-white">não define limites exatos</strong>. E é exatamente aí que mora o perigo. Ele cria o <strong className="text-red-500">mecanismo legal</strong> para que, no futuro, o governo possa definir qualquer limite que desejar: R$ 10.000 hoje, R$ 5.000 amanhã, R$ 1.000 depois. A porta foi aberta. Só falta decidir o tamanho do cadeado.
                </p>
                <p className="font-medium">
                  O <strong className="text-white">Conselho Monetário Nacional</strong> (CMN) — o mesmo órgão que já executou o confisco da poupança em 1990 — ficaria responsável por definir esses limites. A história se repete, e dessa vez a ferramenta é digital.
                </p>
              </div>
            </div>

            {/* Escada de restrição */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
              <h3 className="text-white font-black uppercase text-sm tracking-wider mb-8 font-mono flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={14} />
                A Escada da Restrição
              </h3>
              <div className="space-y-8">
                {ESCADA_RESTRICAO.map((step, i) => (
                  <div key={i} className="escada-step pb-2">
                    <span className="text-red-500 font-black text-xl font-mono">{step.valor}</span>
                    <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ AGENDA GLOBAL ══════ */}
          <section id="agenda-global" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Globe size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Agenda Global</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              O Brasil não está inventando a roda. Essa agenda já está <strong className="text-white">avançada na Europa</strong>, onde andar com dinheiro vivo acima de certos valores já é considerado crime. Veja o mapa de restrições que o Estado já impôs em outras jurisdições:
            </p>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden mb-10">
              <div className="grid grid-cols-[1fr_120px_100px] border-b border-white/10 bg-white/[0.02]">
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">País</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Limite</span></div>
                <div className="p-4"><span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Status</span></div>
              </div>
              {LIMITES_INTERNACIONAIS.map((row, i) => (
                <div key={i} className={`grid grid-cols-[1fr_120px_100px] group hover:bg-red-600/[0.03] transition-colors ${i < LIMITES_INTERNACIONAIS.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="p-4 flex items-center gap-2">
                    <span className="text-lg">{row.flag}</span>
                    <span className="text-white font-bold text-sm">{row.pais}</span>
                  </div>
                  <div className="p-4"><span className="text-red-500 font-black text-sm font-mono">{row.limite}</span></div>
                  <div className="p-4"><span className="text-xs font-bold text-amber-500/80 uppercase tracking-wider">{row.status}</span></div>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_120px_100px] bg-red-950/10 border-t border-red-600/20">
                <div className="p-4 flex items-center gap-2">
                  <span className="text-lg">🇧🇷</span>
                  <span className="text-white font-black text-sm">Brasil</span>
                </div>
                <div className="p-4"><span className="text-red-500 font-black text-sm font-mono italic">Em definição</span></div>
                <div className="p-4"><span className="text-xs font-bold text-red-500 uppercase tracking-wider alert-blink">Alerta</span></div>
              </div>
            </div>

            <div className="bg-red-950/10 border border-red-600/20 rounded-sm p-6">
              <p className="text-red-500 text-[10px] font-black uppercase font-mono tracking-wider mb-2">O Padrão é Claro</p>
              <p className="text-white font-black text-base leading-tight uppercase italic">
                Todos esses países começaram com limites "altos". Depois baixaram. Depois baixaram de novo. A direção é sempre a mesma: dinheiro físico zero. Controle total. Soberania individual eliminada.
              </p>
            </div>
          </section>

          {/* ══════ CONSEQUÊNCIAS ══════ */}
          <section id="consequencias" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Eye size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Que Muda Pra Você</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">
              Quando todo dinheiro se torna digital e rastreável, <strong className="text-white">três pilares da sua liberdade financeira</strong> são destruídos simultaneamente:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CONSEQUENCIAS.map((item, i) => (
                <div key={i} className="card-threat rounded-sm p-8 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <item.icon className="text-red-500" size={18} />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ A CONTRADIÇÃO FATAL ══════ */}
          <section id="contradicao" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Users size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">A Contradição Fatal</h2>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p className="font-medium text-base">
                  Existe uma <strong className="text-white">contradição brutal</strong> entre muitos que se dizem libertários e ao mesmo tempo te incentivam a entregar informações financeiras desnecessárias ao governo. O argumento deles é simples: <em className="text-slate-300">"Não tem problema nenhum o governo saber quanto Bitcoin você tem"</em>.
                </p>

                <div className="border-2 border-red-600/20 bg-red-950/10 rounded-sm p-8 my-8">
                  <p className="text-red-600 font-black uppercase tracking-widest text-[9px] italic font-mono mb-4">O Teste Da Realidade</p>
                  <p className="text-white font-black text-lg leading-tight uppercase italic">
                    Você dormiria tranquilo sabendo que organizações criminosas sabem exatamente quanto Bitcoin, stablecoins e patrimônio você possui? Sua família estaria mais segura com essa informação disponível?
                  </p>
                  <p className="text-slate-400 text-sm font-medium mt-4 leading-relaxed">
                    Se a resposta é não, então por que você confia essa mesma informação ao governo — uma organização que historicamente já confiscou, bloqueou e manipulou o patrimônio dos cidadãos?
                  </p>
                </div>

                <p className="font-medium text-base">
                  Não estou falando para sonegar. Não estou falando para omitir. Estou falando para <strong className="text-white">manter o poder na sua mão</strong> — e você decidir, com soberania, o que fazer em seguida. Desconfie especialmente daqueles "libertários" que viveram às custas do Estado, que nunca empreenderam no livre mercado, e que acabam contaminados pela mentalidade de que <strong className="text-red-500">o governo tem alguma utilidade</strong>.
                </p>

                <p className="font-medium text-base">
                  Privacidade financeira não é crime. É um <strong className="text-white">direito natural</strong>. E quem tenta convencer você do contrário está, conscientemente ou não, trabalhando contra a sua soberania individual.
                </p>
              </div>
            </div>
          </section>

          {/* ══════ ARSENAL DE PRIVACIDADE ══════ */}
          <section id="ferramentas" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Arsenal de Privacidade</h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-3xl">
              A boa notícia: existem <strong className="text-white">ferramentas legítimas e completamente legais</strong> para aumentar sua soberania financeira. Use-as com sabedoria. O poder dessas ferramentas é proporcional à sua responsabilidade.
            </p>
            <p className="text-amber-500/80 text-xs font-bold uppercase tracking-wider mb-10 font-mono">
              ⚠ Todas as ferramentas listadas são legais. Utilize-as com responsabilidade e dentro da legislação vigente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FERRAMENTAS.map((tool, i) => (
                <div key={i} className="card-threat rounded-sm p-8 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0">
                      <tool.icon className="text-red-500" size={18} />
                    </div>
                    <div>
                      <h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{tool.titulo}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{tool.subtitulo}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium my-4">{tool.descricao}</p>
                  <div className="bg-red-950/20 border border-red-600/20 rounded-sm p-4">
                    <p className="text-red-500 text-[10px] font-black uppercase font-mono leading-relaxed">{tool.destaque}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ AUTORIDADE — UNIVERSIDADE SATOSHI ══════ */}
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
                  Aprenda a Proteger<br />
                  <span className="text-[#d4af37] italic">Sua Liberdade Financeira</span>
                </h2>

                <p className="text-slate-400 text-base leading-relaxed font-medium mb-4 max-w-2xl">
                  Na <strong className="text-[#d4af37]">Universidade Satoshi</strong> você aprende estratégias avançadas de privacidade financeira, Bitcoin com autocustódia, teoria das bandeiras e internacionalização — com quem já vive fora do sistema e pratica tudo que ensina.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <BookOpen className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Bitcoin Avançado</p>
                  </div>
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <Globe className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Internacionalização</p>
                  </div>
                  <div className="border border-[#d4af37]/15 bg-[#d4af37]/[0.03] rounded-sm p-4 text-center">
                    <ShieldAlert className="text-[#d4af37] mx-auto mb-2" size={20} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]/80 font-mono">Privacidade Total</p>
                  </div>
                </div>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-gold inline-block px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center"
                >
                  🎓 Proteger Minha Privacidade Financeira
                </a>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider mt-4 font-mono">
                  Acesso exclusivo para membros da comunidade
                </p>
              </div>
            </div>
          </section>

          {/* ══════ FAQ SEO ══════ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
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
                      className={`text-red-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                      size={16}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6 border-t border-white/5 pt-4">
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ CONCLUSÃO — O PODER NA SUA MÃO ══════ */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-red-600 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulse 3s ease-in-out infinite' }}>
            <ShieldAlert className="absolute top-0 right-0 text-red-600/[0.03] -mr-10 -mt-10" size={240} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">
                O Poder Fica<br /><span className="text-red-600 italic">Na Sua Mão.</span>
              </h3>

              <div className="space-y-6 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">
                  O dinheiro físico foi a última fronteira de privacidade financeira acessível a qualquer pessoa. Com a digitalização forçada, o Estado ganha <strong className="text-white">controle absoluto</strong> sobre cada transação, cada economia, cada decisão financeira da sua vida.
                </p>
                <p className="font-medium text-base">
                  Mas a tecnologia também criou uma saída. O <strong className="text-white">Bitcoin</strong>, as exchanges P2P, a teoria das bandeiras, a autocustódia — tudo isso existe para devolver a você o que o sistema tenta tirar: <strong className="text-red-500">soberania sobre o seu patrimônio</strong>.
                </p>
              </div>

              {/* Internal Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { to: '/economia-paralela', titulo: 'Economia Paralela', desc: 'Aprenda a operar fora do sistema' },
                  { to: '/autocustodia', titulo: 'Autocustódia', desc: 'Seu Bitcoin, suas chaves' },
                  { to: '/pix-cripto', titulo: 'PIX → Cripto', desc: 'Converta sem intermediários' },
                  { to: '/taxa-de-fuga', titulo: 'Taxa de Fuga', desc: 'Saia enquanto ainda pode' },
                  { to: '/blindagem-golpes', titulo: 'Blindagem Anti-Golpes', desc: 'O elo fraco é você — proteja-se' },
                  { to: '/entenda-bitcoin', titulo: 'Entenda o Bitcoin', desc: 'Do zero à soberania digital' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/10 bg-white/[0.02] rounded-sm p-6 hover:bg-red-600/[0.05] hover:border-red-600/30 transition-all group flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-black uppercase text-xs tracking-wider mb-1 font-mono">{link.titulo}</h4>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{link.desc}</p>
                    </div>
                    <ChevronRight className="text-slate-600 group-hover:text-red-500 transition-colors shrink-0" size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ══════ SEO RICH TEXT ══════ */}
          <section className="mb-20 max-w-3xl">
            <div className="space-y-4 text-slate-500 text-xs leading-relaxed">
              <p>
                <strong className="text-slate-400">Sobre este conteúdo:</strong> Esta página aborda o impacto do PL 3.951/2019 na privacidade financeira dos brasileiros, as restrições ao dinheiro vivo já implementadas na Europa e as ferramentas legítimas disponíveis para proteger sua soberania financeira. O conteúdo não constitui aconselhamento financeiro ou jurídico. Todas as ferramentas mencionadas são legais e de uso público.
              </p>
              <p>
                <strong className="text-slate-400">Temas abordados:</strong> limite de dinheiro vivo no Brasil, PL 3951/2019, governo proibir dinheiro em espécie, como comprar Bitcoin sem KYC, privacidade financeira, comprar Bitcoin P2P, teoria das bandeiras, cédula paraguaia, exchanges descentralizadas, autocustódia Bitcoin, cartões cripto sem KYC, contas internacionais, diversificação jurisdicional.
              </p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Privacidade financeira é um direito, não um crime.</p>
              <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white italic">Sempre foi projeto.</p>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-12 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
