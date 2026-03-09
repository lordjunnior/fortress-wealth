import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, BookOpen, AlertTriangle, Zap, Shield, Globe, Flag, TrendingDown, Coins, Lock, Wallet, GraduationCap, ArrowRight } from 'lucide-react';

const TRILHA = [
  {
    fase: 1,
    titulo: 'Entendendo o Sistema',
    cor: 'amber',
    desc: 'Antes de buscar soluções, você precisa entender o problema. Essas páginas revelam como o sistema monetário funciona e por que ele trabalha contra você.',
    itens: [
      { to: '/historia-do-dinheiro', titulo: 'A História do Dinheiro', desc: 'Do escambo ao ouro, do papel-moeda ao Bitcoin. A história que nunca te contaram na escola.', icon: Coins, tag: 'FUNDAMENTO' },
      { to: '/inflacao-imposto-oculto', titulo: 'Inflação: O Imposto Oculto', desc: 'Como a inflação funciona, quem se beneficia e por que seu dinheiro vale menos a cada dia.', icon: TrendingDown, tag: 'EDUCAÇÃO' },
    ],
  },
  {
    fase: 2,
    titulo: 'Reconhecendo os Riscos',
    cor: 'red',
    desc: 'Os alertas que mostram o que está acontecendo agora, no Brasil e no mundo. Controle financeiro, vigilância e o fim da privacidade monetária.',
    itens: [
      { to: '/alertas/fim-do-dinheiro-vivo', titulo: 'O Fim do Dinheiro Vivo', desc: 'O PL 3.951/2019, os limites ao dinheiro em espécie e o caminho para o controle total.', icon: AlertTriangle, tag: 'ALERTA' },
      { to: '/alertas/cbdc-brasil', titulo: 'DREX: A CBDC Brasileira', desc: 'A moeda digital programável do Banco Central e seus riscos para sua privacidade e liberdade.', icon: Lock, tag: 'ALERTA' },
    ],
  },
  {
    fase: 3,
    titulo: 'Descobrindo a Alternativa',
    cor: 'orange',
    desc: 'O Bitcoin não é uma moda. É a resposta tecnológica ao problema monetário mais antigo da civilização. Entenda por que ele é diferente de tudo que veio antes.',
    itens: [
      { to: '/bitcoin-vs-fiat', titulo: 'Bitcoin vs Dinheiro Fiat', desc: 'Comparação direta em 14 fatores: escassez, controle, inflação, privacidade, censura e mais.', icon: Zap, tag: 'COMPARAÇÃO' },
      { to: '/o-que-e-bitcoin', titulo: 'O Que é o Bitcoin', desc: 'Do zero à compreensão completa. O que é, como funciona e por que importa.', icon: BookOpen, tag: 'FUNDAMENTO' },
    ],
  },
  {
    fase: 4,
    titulo: 'Construindo Soberania',
    cor: 'emerald',
    desc: 'Saber não basta. Essas páginas transformam conhecimento em ação prática. Autocustódia, diversificação e independência financeira real.',
    itens: [
      { to: '/autocustodia', titulo: 'Autocustódia Bitcoin', desc: 'Suas chaves, seu dinheiro. Como armazenar Bitcoin de forma que ninguém possa confiscar.', icon: Shield, tag: 'PRÁTICA' },
      { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', desc: 'Diversificação jurisdicional: cidadania, contas, empresas e patrimônio em múltiplas jurisdições.', icon: Flag, tag: 'ESTRATÉGIA' },
    ],
  },
];

const corMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-500', glow: 'hover:border-amber-500/40' },
  red: { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-500', glow: 'hover:border-red-500/40' },
  orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-500', glow: 'hover:border-orange-500/40' },
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-500', glow: 'hover:border-emerald-500/40' },
};

export default function IndiceDoDesespertar() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-600 overflow-x-hidden">
      <Helmet>
        <title>Índice do Despertar: Guia da Soberania Financeira | Lord Junnior</title>
        <meta name="description" content="O mapa completo para entender o sistema monetário, reconhecer os riscos financeiros e construir soberania pessoal. Do zero à liberdade financeira." />
        <link rel="canonical" href="https://lordjunnior.com.br/indice-do-despertar" />
        <meta property="og:title" content="Índice do Despertar: Guia da Soberania Financeira" />
        <meta property="og:url" content="https://lordjunnior.com.br/indice-do-despertar" />
        <meta property="og:type" content="website" />
      </Helmet>

      <style>{`
        .glass-sb{background:rgba(11,15,25,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6)}
        @keyframes goldPulse{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)}50%{box-shadow:0 0 40px rgba(212,175,55,0.25)}}
        .cta-gold{background:linear-gradient(135deg,#d4af37 0%,#f5d060 50%,#d4af37 100%);color:#0a0a0a;animation:goldPulse 3s ease-in-out infinite;transition:all 0.3s ease}
        .cta-gold:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(212,175,55,0.3)}
      `}</style>

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-sb border-b border-white/5 px-6 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono"><ArrowLeft size={10} /> Início</Link>
          <div className="flex items-center gap-1"><GraduationCap className="text-amber-500" size={12} /><span className="text-amber-500 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Índice do Despertar</span></div>
          <div />
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20">

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-mono" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><Link to="/" className="text-slate-600 hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
              <ChevronRight className="text-slate-800" size={10} />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><span className="text-amber-500" itemProp="name">Índice do Despertar</span><meta itemProp="position" content="2" /></li>
            </ol>
          </nav>

          {/* HERO */}
          <header className="mb-20 relative overflow-hidden rounded-sm p-10 md:p-16 bg-[#0a0a0a] border border-white/5">
            <GraduationCap className="absolute top-0 right-0 text-amber-600/[0.03] -mr-16 -mt-16" size={350} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8"><GraduationCap className="text-amber-500" size={16} /><span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Mapa de Estudos</span></div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] uppercase mb-8">Índice do<br /><span className="text-amber-500 italic">Despertar</span></h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mb-4 font-medium">O caminho completo, do <strong className="text-white">choque cognitivo</strong> à <strong className="text-amber-500">soberania financeira</strong>. Cada fase constrói sobre a anterior. Leia na ordem para máximo impacto.</p>
              <p className="text-base text-slate-500 leading-relaxed max-w-3xl font-medium">4 fases. 8 páginas essenciais. A jornada que transforma curiosidade em estratégia de vida.</p>
            </div>
          </header>

          {/* TRILHA */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] md:left-[32px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/40 via-red-500/20 via-orange-500/20 to-emerald-500/40" />

            <div className="space-y-16">
              {TRILHA.map((fase) => {
                const cores = corMap[fase.cor];
                return (
                  <div key={fase.fase} className="relative">
                    {/* Phase header */}
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${cores.bg} border-2 ${cores.border} flex items-center justify-center shrink-0`}>
                        <span className={`${cores.text} font-black text-lg font-mono`}>{fase.fase}</span>
                      </div>
                      <div>
                        <span className={`${cores.text} text-[9px] font-black uppercase tracking-[0.3em] font-mono`}>Fase {fase.fase}</span>
                        <h2 className="text-white font-black uppercase text-xl tracking-tighter">{fase.titulo}</h2>
                      </div>
                    </div>

                    <div className="ml-[28px] md:ml-[32px] pl-8 border-l-0">
                      <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6 max-w-2xl">{fase.desc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fase.itens.map((item, j) => (
                          <Link key={j} to={item.to} className={`bg-[#0a0a0a] border border-white/5 rounded-sm p-6 ${cores.glow} hover:bg-white/[0.02] transition-all group`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full ${cores.bg} border ${cores.border} flex items-center justify-center shrink-0`}>
                                <item.icon className={cores.text} size={18} />
                              </div>
                              <div className="flex-1">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">{item.tag}</span>
                                <h3 className={`text-white font-black uppercase text-sm tracking-tight mt-1 mb-2 group-hover:${cores.text} transition-colors`}>{item.titulo}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                              </div>
                              <ArrowRight className="text-slate-700 group-hover:text-white transition-colors shrink-0 mt-1" size={14} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">Comece pela <span className="text-amber-500 italic">Fase 1</span></h3>
            <p className="text-slate-500 text-sm font-medium mb-8 max-w-xl mx-auto">Se você nunca estudou esses temas, comece pela História do Dinheiro. É a base de tudo que vem depois.</p>
            <Link to="/historia-do-dinheiro" className="cta-gold inline-flex items-center justify-center gap-3 px-10 py-5 rounded-sm font-black uppercase text-sm tracking-[0.2em]">📖 Começar a Jornada</Link>
          </div>

          <section className="mt-20 mb-20 max-w-3xl mx-auto"><div className="space-y-4 text-slate-500 text-xs leading-relaxed text-center"><p><strong className="text-slate-400">Temas abordados:</strong> soberania financeira, educação monetária, história do dinheiro, inflação, CBDC, DREX, Bitcoin, autocustódia, teoria das bandeiras, diversificação jurisdicional, liberdade financeira.</p></div></section>
        </div>
      </div>
    </div>
  );
}
