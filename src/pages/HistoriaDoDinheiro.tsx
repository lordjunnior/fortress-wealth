import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, ChevronDown, Play, GraduationCap, Zap, BookOpen, HelpCircle, Clock, ArrowDown, AlertTriangle, Globe, ShieldAlert, Coins, Scale, Landmark, Crown, TrendingDown, Scroll, Wheat } from 'lucide-react';
import { NAV_ITEMS, ERAS, TIMELINE_ITEMS, CONSEQUENCIAS, FAQ_ITEMS } from '@/lib/historiaDinheiroData';

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.pergunta, "acceptedAnswer": { "@type": "Answer", "text": item.resposta } }))
};
const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  "headline": "A História do Dinheiro: Do Escambo ao Bitcoin",
  "description": "A história completa do dinheiro: escambo, ouro, papel-moeda, bancos centrais, Nixon Shock de 1971 e o surgimento do Bitcoin como resposta.",
  "author": { "@type": "Person", "name": "Lord Junnior" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "datePublished": "2026-03-07", "dateModified": "2026-03-07",
  "url": "https://lordjunnior.com.br/historia-do-dinheiro",
  "keywords": "história do dinheiro, origem do dinheiro, como surgiu o dinheiro, padrão ouro, moeda fiat, Nixon Shock 1971, banco central, Bitcoin, o que é dinheiro"
};

const TAMBEM_ACONTECEU: Record<string, { ano: string; fato: string }[]> = {
  'escambo': [
    { ano: '~9000 a.C.', fato: 'Primeiras comunidades agrícolas no Crescente Fértil' },
    { ano: '~5000 a.C.', fato: 'Civilização suméria desenvolve a escrita cuneiforme' },
    { ano: '~3000 a.C.', fato: 'Egito unificado sob o primeiro faraó' },
  ],
  'ouro': [
    { ano: '~600 a.C.', fato: 'Lídia cunha as primeiras moedas padronizadas' },
    { ano: '27 a.C.', fato: 'Roma estabelece o denário como moeda oficial do Império' },
    { ano: '1252', fato: 'Florença cunha o florim de ouro, padrão monetário europeu' },
  ],
  'papel': [
    { ano: '1694', fato: 'Criação do Bank of England para financiar guerras' },
    { ano: '1716', fato: 'John Law cria o primeiro esquema de papel-moeda na França, que colapsa em 4 anos' },
    { ano: '1913', fato: 'Criação do Federal Reserve nos Estados Unidos' },
  ],
  'banco-central': [
    { ano: '1933', fato: 'Roosevelt confisca o ouro dos cidadãos americanos' },
    { ano: '1944', fato: 'Acordo de Bretton Woods estabelece o dólar como reserva mundial' },
    { ano: '1964', fato: 'Criação do Banco Central do Brasil' },
  ],
  'nixon': [
    { ano: '1971', fato: 'Nixon encerra a conversibilidade dólar-ouro' },
    { ano: '1980', fato: 'Brasil entra em espiral de hiperinflação' },
    { ano: '1990', fato: 'Confisco Collor: governo brasileiro congela poupanças' },
    { ano: '2009', fato: 'Satoshi Nakamoto lança a rede Bitcoin' },
  ],
};

export default function HistoriaDoDinheiro() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      <Helmet>
        <title>A História do Dinheiro: Do Escambo ao Bitcoin | Lord Junnior</title>
        <meta name="description" content="A história completa do dinheiro: do escambo ao ouro, do papel-moeda aos bancos centrais, do Nixon Shock ao Bitcoin. Entenda como o dinheiro foi corrompido e como se proteger." />
        <link rel="canonical" href="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:title" content="A História do Dinheiro: Do Escambo ao Bitcoin" />
        <meta property="og:description" content="Entenda como o dinheiro foi criado, corrompido e como o Bitcoin representa a resposta." />
        <meta property="og:url" content="https://lordjunnior.com.br/historia-do-dinheiro" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <style>{`
        @keyframes coinDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}
        .coin-grid{position:absolute;width:100%;height:200%;background-image:radial-gradient(1.5px 1.5px at 15% 25%,rgba(245,158,11,0.25) 100%,transparent),radial-gradient(1px 1px at 45% 55%,rgba(255,255,255,0.1) 100%,transparent);background-size:220px 220px;animation:coinDrift 65s linear infinite}
        .title-shimmer-gold{background:linear-gradient(90deg,#f59e0b 0%,#fbbf24 40%,#fff 50%,#fbbf24 60%,#f59e0b 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:tShimG 3.5s linear infinite}
        @keyframes tShimG{0%{background-position:200% center}100%{background-position:-200% center}}
        .glass-sb{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes amberGlow{0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)}50%{box-shadow:0 0 12px rgba(245,158,11,0.15)}}
        .nav-active-g{background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;animation:amberGlow 3s ease-in-out infinite}
        .card-era{border:1px solid rgba(245,158,11,0.12);background:rgba(11,15,25,0.75);transition:all 0.4s ease}
        .card-era:hover{border-color:rgba(245,158,11,0.4);box-shadow:0 0 25px rgba(245,158,11,0.07);transform:translateY(-3px)}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
        @keyframes borderPulseG{0%,100%{border-color:rgba(245,158,11,0.2)}50%{border-color:rgba(245,158,11,0.7)}}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15"><div className="coin-grid" /></div>

      {/* SIDEBAR */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sb m-3 rounded-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3"><Coins className="text-amber-500" size={16} /><span className="text-amber-500 font-black uppercase text-[9px] tracking-[0.3em] font-mono">História do Dinheiro</span></div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono"><ArrowLeft size={10} /> Início</Link>
          </div>
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1"><span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span><span className="text-[7px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span></div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} /></div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (<button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${activeSection === item.id ? 'nav-active-g' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'}`}>{item.label}</button>))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sb border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono"><ArrowLeft size={10} /> Início</Link>
          <div className="flex items-center gap-1"><Coins className="text-amber-500" size={12} /><span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Dinheiro</span></div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} /></div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* BREADCRUMBS */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><span className="text-amber-500" itemProp="name">História do Dinheiro</span><meta itemProp="position" content="2" /></li>
            </ol>
          </nav>

          {/* HERO */}
          <header id="hero" className="mb-28 scroll-mt-24 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <Coins className="absolute top-0 right-0 text-amber-600/[0.03] -mr-16 -mt-16" size={350} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8"><Coins className="text-amber-500" size={16} /><span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Educação Monetária</span></div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase mb-8">A História do Dinheiro<br /><span className="title-shimmer-gold italic inline-block pt-1">Que Nunca Te Contaram</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">Do escambo ao ouro, do <strong className="text-white">papel-moeda aos bancos centrais</strong>, do padrão ouro ao <strong className="text-amber-500">Nixon Shock de 1971</strong>, e finalmente ao Bitcoin. A história completa de como o dinheiro foi criado, corrompido e como a humanidade encontrou uma saída.</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl mb-10 font-medium">Entenda como surgiu o dinheiro, o que é o padrão ouro, por que toda moeda fiat perde valor e como o <strong className="text-white">Bitcoin</strong> representa a resposta tecnológica ao problema monetário mais antigo da civilização.</p>
              <button onClick={() => scrollTo('escambo')} className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-10 group"><ArrowDown size={14} className="text-amber-500 group-hover:translate-y-1 transition-transform" /> Começar a jornada</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('bitcoin-saida')} className="cta-gold px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-center">🔓 Descobrir a Saída</button>
                <button onClick={() => scrollTo('timeline')} className="border border-white/10 bg-white/[0.02] px-8 py-4 rounded-sm font-black uppercase text-sm tracking-widest text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2"><Clock size={14} /> Ver Linha do Tempo</button>
              </div>
            </div>
          </header>

          {/* ERAS DO DINHEIRO */}
          {ERAS.map((era) => (
            <section key={era.id} id={era.id} className="mb-28 scroll-mt-24">
              <div className="flex items-center gap-3 text-amber-500 mb-10"><era.icon size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">{era.titulo}</h2></div>
              <div className="flex items-center gap-2 mb-6"><Clock className="text-slate-600" size={12} /><span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] font-mono">{era.periodo}</span></div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 md:p-12">
                <div className="space-y-5 text-slate-400 leading-relaxed">
                  {era.conteudo.map((p, i) => (<p key={i} className="font-medium text-base" dangerouslySetInnerHTML={{ __html: p.replace(/(".*?")/g, '<em class="text-slate-300">$1</em>') }} />))}
                </div>
              </div>

              {/* TAMBÉM ACONTECEU NESTA ÉPOCA */}
              {TAMBEM_ACONTECEU[era.id] && (
                <div className="mt-6 bg-amber-950/10 border border-amber-500/20 rounded-sm p-6">
                  <p className="text-amber-500 text-[10px] font-black uppercase font-mono tracking-wider mb-4">Também aconteceu nesta época</p>
                  <div className="space-y-3">
                    {TAMBEM_ACONTECEU[era.id].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-amber-500/60 font-black text-[10px] font-mono tracking-wider shrink-0 w-20">{item.ano}</span>
                        <span className="text-slate-400 text-xs font-medium">{item.fato}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* TIMELINE */}
          <section id="timeline" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10"><Clock size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Linha do Tempo Monetária</h2></div>
            <div className="relative">
              <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />
              <div className="space-y-8">
                {TIMELINE_ITEMS.map((item, i) => (
                  <div key={i} className="relative flex gap-6 group">
                    <div className="relative z-10 shrink-0"><div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center ${i === TIMELINE_ITEMS.length - 1 ? 'border-amber-500 bg-amber-500/20' : 'border-amber-500/30 bg-[#0a0a0a] group-hover:border-amber-500/60'} transition-colors`}><span className="text-amber-500 font-black text-[8px] font-mono">{item.ano}</span></div></div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 flex-1 group-hover:border-amber-500/20 transition-colors"><h3 className="text-white font-black uppercase text-sm tracking-tight mb-2">{item.evento}</h3><p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONSEQUÊNCIAS */}
          <section id="consequencias" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10"><AlertTriangle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">O Resultado</h2></div>
            <p className="text-slate-400 text-base leading-relaxed font-medium mb-10 max-w-3xl">O que acontece quando governos controlam o dinheiro sem lastro em nada real? Três consequências que você vive todos os dias, mesmo sem perceber:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CONSEQUENCIAS.map((item, i) => (
                <div key={i} className="card-era rounded-sm p-8"><div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><item.icon className="text-amber-500" size={18} /></div><h3 className="text-white font-black uppercase text-sm tracking-tighter italic">{item.titulo}</h3></div><p className="text-slate-400 text-xs leading-relaxed font-medium">{item.descricao}</p></div>
              ))}
            </div>
          </section>

          {/* A SAÍDA: BITCOIN */}
          <section id="bitcoin-saida" className="mb-28 scroll-mt-24">
            <div className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/10 to-[#0a0a0a] rounded-sm p-8 md:p-12 relative overflow-hidden" style={{ animation: 'borderPulseG 3s ease-in-out infinite' }}>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6"><Zap className="text-amber-500" size={14} /><span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">A Resposta</span></div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">Em 2009, Surgiu<br /><span className="text-amber-500 italic">A Saída.</span></h3>
                <div className="space-y-5 text-slate-400 leading-relaxed">
                  <p className="font-medium text-base">Em 3 de janeiro de 2009, em meio à maior crise financeira desde 1929, um programador (ou grupo) sob o pseudônimo <strong className="text-white">Satoshi Nakamoto</strong> lançou a rede Bitcoin. Na primeira transação, gravou na blockchain a manchete do jornal The Times: <em className="text-amber-500">"Chancellor on brink of second bailout for banks"</em>, Chanceler à beira de segundo resgate aos bancos.</p>
                  <p className="font-medium text-base">O Bitcoin foi projetado como o <strong className="text-white">oposto exato do dinheiro estatal</strong>: oferta fixa (21 milhões), descentralizado (sem banco central), resistente à censura (ninguém pode bloqueá-lo), transparente (blockchain pública) e permissionless (não precisa de aprovação para usar).</p>
                  <p className="font-medium text-base">Pela primeira vez em 5.000 anos, a humanidade tem acesso a uma forma de dinheiro que <strong className="text-white">não pode ser corrompida por governos</strong>. Não pode ser impressa. Não pode ser confiscada com autocustódia. Não pode ser censurada. O Bitcoin é a resposta tecnológica ao problema monetário mais antigo da civilização.</p>
                </div>
                <div className="mt-8"><Link to="/o-que-e-bitcoin" className="cta-gold inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-black uppercase text-xs tracking-[0.2em]">₿ O Que é o Bitcoin</Link></div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-amber-500 mb-10"><HelpCircle size={20} /><h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Perguntas Frequentes</h2></div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <h3 className="text-white font-bold text-sm leading-snug pr-4">{item.pergunta}</h3>
                    <ChevronDown className={`text-amber-500 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 border-t border-white/5 pt-4"><p className="text-slate-400 text-sm leading-relaxed font-medium">{item.resposta}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONCLUSÃO */}
          <section id="conclusao" className="mb-28 scroll-mt-24 border-2 border-amber-500 bg-[#0a0a0a] p-10 md:p-14 rounded-sm relative overflow-hidden" style={{ animation: 'borderPulseG 3s ease-in-out infinite' }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-8 font-mono">O Despertar<br /><span className="text-amber-500 italic">Começa Aqui.</span></h3>
              <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
                <p className="font-medium text-base">Agora você sabe o que <strong className="text-white">nunca te ensinaram na escola</strong>: que o dinheiro foi corrompido, que a inflação é um imposto, que bancos centrais destroem poder de compra e que o sistema atual é projetado para beneficiar quem imprime, não quem trabalha.</p>
                <p className="font-medium text-base">Mas saber não basta. O próximo passo é <strong className="text-amber-500">agir</strong>. Entender o Bitcoin. Praticar autocustódia. Diversificar jurisdições. Construir soberania financeira real.</p>
              </div>
              <Link to="/entenda-bitcoin" className="cta-gold flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em] text-center mb-8 w-full md:w-auto md:inline-flex">₿ Entender o Bitcoin</Link>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] font-mono mb-4">Continue Aprendendo</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação rouba seu dinheiro' },
                  { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Fiat', desc: 'Comparação direta e definitiva' },
                  { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', desc: 'Diversificação jurisdicional' },
                  { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro' },
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="border border-white/5 bg-white/[0.01] rounded-sm px-5 py-4 hover:bg-amber-500/[0.03] hover:border-white/10 transition-all group flex items-center justify-between">
                    <div><span className="text-white/80 font-bold uppercase text-[10px] tracking-wider font-mono">{link.titulo}</span><span className="text-slate-600 text-[9px] font-bold uppercase tracking-wider ml-2">{link.desc}</span></div>
                    <ChevronRight className="text-slate-700 group-hover:text-amber-500 transition-colors shrink-0" size={14} />
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
                { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação funciona e rouba seu poder de compra', tag: 'EDUCAÇÃO' },
                { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'Fim do Dinheiro Vivo', desc: 'PL 3.951 e os limites ao dinheiro em espécie', tag: 'ALERTA' },
                { to: '/entenda-bitcoin', titulo: 'Entenda o Bitcoin', desc: 'Do zero à soberania financeira completa', tag: 'FUNDAMENTO' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all group">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{link.tag}</span>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mt-2 mb-1 group-hover:text-amber-500 transition-colors">{link.titulo}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO RICH TEXT */}
          <section className="mb-20 max-w-3xl">
            <div className="space-y-4 text-slate-500 text-xs leading-relaxed">
              <p><strong className="text-slate-400">Sobre este conteúdo:</strong> Esta página apresenta a história completa do dinheiro, do escambo primitivo ao Bitcoin, explicando como o dinheiro foi criado, como foi corrompido por governos e bancos centrais, e como a tecnologia oferece uma saída.</p>
              <p><strong className="text-slate-400">Temas abordados:</strong> história do dinheiro, origem do dinheiro, como surgiu o dinheiro, padrão ouro, moeda fiat, Nixon Shock 1971, banco central, Federal Reserve, inflação, escambo, papel-moeda, Bitcoin, Satoshi Nakamoto, Bretton Woods, confisco Collor.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
