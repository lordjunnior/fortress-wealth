import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, Ban, ChevronRight, Zap } from 'lucide-react';

const ALERTAS = [
  {
    slug: 'fim-do-dinheiro-vivo',
    titulo: 'O Governo Pode Limitar o Dinheiro Vivo no Brasil',
    subtitulo: 'PL 3.951/2019 · CCJ · Precedente Aberto',
    descricao: 'Entenda o PL 3.951, veja os limites ao dinheiro em espécie na Europa e descubra ferramentas legais para proteger sua privacidade financeira.',
    tag: 'LEGISLATIVO',
    status: 'ATIVO',
  },
  // Futuras páginas SEO:
  // { slug: 'cbdc-brasil', titulo: 'DREX — A Moeda Digital do Banco Central', ... },
  // { slug: 'imposto-global', titulo: 'O Imposto Global Sobre Patrimônio', ... },
  // { slug: 'rastreamento-financeiro', titulo: 'Rastreamento Financeiro Total', ... },
];

export default function AlertasHub() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 overflow-x-hidden">
      <Helmet>
        <title>Alertas de Soberania — Ameaças à Sua Liberdade Financeira | Lord Junnior</title>
        <meta name="description" content="Alertas sobre ameaças à sua liberdade financeira: projetos de lei, restrições ao dinheiro vivo, CBDCs, impostos globais e rastreamento financeiro. Mantenha-se informado." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas" />
      </Helmet>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
        <div style={{
          position: 'absolute', width: '100%', height: '200%',
          backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, rgba(220,38,38,0.25) 100%, transparent)',
          backgroundSize: '200px 200px',
          animation: 'surveillanceDrift 70s linear infinite',
        }} />
      </div>
      <style>{`@keyframes surveillanceDrift{0%{transform:translateY(0)}100%{transform:translateY(-1200px)}}`}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.4em] font-mono">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-red-600" size={18} />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] font-mono">Central de Alertas</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Alertas de<br /><span className="text-red-600 italic">Soberania</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium">
            Análises aprofundadas sobre ameaças reais à sua liberdade financeira. Cada alerta é uma página dedicada com contexto, dados internacionais e ferramentas práticas de proteção.
          </p>
        </header>

        <div className="space-y-4">
          {ALERTAS.map((alerta) => (
            <Link
              key={alerta.slug}
              to={`/alertas/${alerta.slug}`}
              className="block bg-[#0a0a0a] border border-white/5 rounded-sm p-8 hover:border-red-600/30 hover:bg-red-600/[0.02] transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500 font-mono bg-red-950/30 px-2 py-1 rounded-sm">{alerta.tag}</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono" style={{ animation: 'alertBlink 2s ease-in-out infinite' }}>● {alerta.status}</span>
                  </div>
                  <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">{alerta.titulo}</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-mono mb-3">{alerta.subtitulo}</p>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{alerta.descricao}</p>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-red-500 transition-colors shrink-0 mt-2" size={24} />
              </div>
            </Link>
          ))}
        </div>

        {/* Placeholder futuro */}
        <div className="mt-12 border border-dashed border-white/10 rounded-sm p-8 text-center">
          <Zap className="text-slate-700 mx-auto mb-3" size={24} />
          <p className="text-slate-600 text-xs font-black uppercase tracking-widest font-mono">Novos alertas em breve</p>
          <p className="text-slate-700 text-[10px] font-bold uppercase tracking-wider mt-1">CBDC · Imposto Global · Rastreamento Financeiro</p>
        </div>

        <footer className="pt-20 border-t border-white/5 mt-20">
          <div className="text-center">
            <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase font-mono">Lord Junnior © 2026</p>
          </div>
        </footer>
      </div>

      <style>{`@keyframes alertBlink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
