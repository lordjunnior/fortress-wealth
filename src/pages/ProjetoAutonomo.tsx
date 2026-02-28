import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Tent, Siren, Cross, Apple, Egg, Fish, Mountain, TreePine, Layers, Thermometer, Bug, Shovel } from 'lucide-react';

/* ─── SEO: meta keywords target ───
   projeto autônomo, base 72 horas, autonomia biológica, soberania alimentar,
   sobrevivência urbana, horta urbana, plantas medicinais, primeiros socorros,
   autossuficiência alimentar, kit emergência 72h, preparação desastres brasil,
   conservação alimentos, proteína sustentável, fitoterapia, gestão de risco pessoal
─────────────────────────────────── */

/* ─── PHASE 1: BASE 72 ─── */
const BASE72_ITEMS = [
  { icon: Package, label: 'Kit Tático 72h', desc: 'Água, alimento, documentos, rádio e medicamentos — o mínimo para 3 dias sem sistema' },
  { icon: Flame, label: 'Protocolos de Apagão', desc: 'Iluminação, cozimento e aquecimento quando a rede elétrica colapsa' },
  { icon: Droplets, label: 'Purificação de Água', desc: 'Fervura, cloro, filtros improvisados — 3 métodos que salvam vidas' },
  { icon: Tent, label: 'Abrigo de Emergência', desc: 'Proteção térmica e estrutural com materiais disponíveis em qualquer cenário' },
  { icon: Siren, label: 'Comunicação sem Internet', desc: 'Rádio AM/FM, sinais visuais e protocolos de ponto de encontro familiar' },
  { icon: Wind, label: 'Navegação Primária', desc: 'Bússola, referências solares e leitura de terreno — zero dependência digital' },
];

/* ─── PHASE 2: AUTONOMIA BIOLÓGICA ─── */
const BIO_ITEMS = [
  { icon: Leaf, label: 'Farmácia Natural', desc: 'Camomila, boldo, arnica, babosa — o que a natureza oferece antes da farmácia' },
  { icon: Cross, label: 'Primeiros Socorros', desc: 'Estancar sangue, imobilizar fraturas, tratar queimaduras — sem hospital por perto' },
  { icon: Thermometer, label: 'Diagnóstico Básico', desc: 'Interpretar febre, desidratação e sinais vitais com zero equipamento' },
  { icon: Sun, label: 'Saúde Preventiva', desc: 'Sol, jejum intermitente, sono e movimento — os 4 pilares que a indústria ignora' },
  { icon: Sprout, label: 'Fitoterapia Aplicada', desc: 'Tinturas, cataplasmas e infusões com dosagem e indicação fundamentada' },
  { icon: Bug, label: 'Defesa contra Vetores', desc: 'Repelentes naturais, manejo de água parada e proteção sem químicos industriais' },
];

/* ─── PHASE 3: SOBERANIA ALIMENTAR — SUBCAMADAS ─── */
const ALIMENTAR_LAYERS = [
  {
    icon: Sprout,
    title: 'Horta Urbana',
    desc: 'Produção em varandas, janelas e telhados. Espaço mínimo, colheita máxima.',
    details: 'Vasos autoirrigáveis, vertical gardening, cultivo em PET e hidroponia caseira',
  },
  {
    icon: Layers,
    title: 'Produção em Pequenos Espaços',
    desc: 'Quintal de 4m² pode alimentar uma família com planejamento correto.',
    details: 'Consórcio de culturas, rotação de canteiros, aproveitamento de microclimas',
  },
  {
    icon: Flame,
    title: 'Conservação & Armazenamento',
    desc: 'Defumação, salga, fermentação, desidratação — técnicas milenares que funcionam.',
    details: 'Compotas, conservas em vinagre, secagem solar, fermentação lactobacilar',
  },
  {
    icon: Egg,
    title: 'Proteína Sustentável',
    desc: 'Galinhas, codornas, peixes e insetos comestíveis em sistemas compactos.',
    details: 'Aquaponia, galinheiro móvel, criação de tilápia em caixa d\'água',
  },
  {
    icon: Shovel,
    title: 'Solo & Fertilidade',
    desc: 'Compostagem, bokashi, húmus de minhoca — terra viva produz comida viva.',
    details: 'Análise caseira de pH, cobertura morta, adubação verde e rotação de nutrientes',
  },
];

export default function ProjetoAutonomo() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-amber-700 pb-32 relative overflow-hidden">

      {/* Organic Grid — subtle natural pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(120,80,30,0.15), transparent),
            radial-gradient(ellipse 600px 800px at 80% 70%, rgba(40,80,40,0.1), transparent),
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px'
        }}
      />

      {/* Organic floating particles */}
      <style>{`
        @keyframes floatOrganic { 
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
          50% { transform: translateY(-30px) rotate(5deg); opacity: 0.06; }
        }
        .organic-float { animation: floatOrganic 15s ease-in-out infinite; }
        .organic-float-2 { animation: floatOrganic 22s ease-in-out infinite reverse; }
        .organic-float-3 { animation: floatOrganic 18s ease-in-out 3s infinite; }
      `}</style>
      <TreePine className="fixed top-[20%] left-[5%] text-emerald-800 organic-float pointer-events-none z-0" size={200} />
      <Mountain className="fixed bottom-[10%] right-[3%] text-amber-900 organic-float-2 pointer-events-none z-0" size={250} />
      <Wheat className="fixed top-[60%] left-[80%] text-amber-800 organic-float-3 pointer-events-none z-0" size={160} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

        <Link to="/arsenal" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
          <ArrowLeft size={14} /> Voltar ao Arsenal
        </Link>

        {/* ═══════════════════════════════════════════ */}
        {/* HEADER — IDENTIDADE DO PROJETO              */}
        {/* ═══════════════════════════════════════════ */}
        <header className="mb-16">
          <div className="flex items-start gap-5 mb-8">
            <div className="p-3 bg-amber-900/20 border border-amber-700/30 rounded-sm mt-1">
              <Shield className="text-amber-500" size={32} />
            </div>
            <div>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Engenharia de Resiliência Pessoal</p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] italic">
                PROJETO<br /><span className="text-amber-500">AUTONOMO</span>
              </h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl font-bold leading-relaxed">
            Autonomia verdadeira nao e fuga do sistema. E <span className="text-amber-400">reducao inteligente de dependencia</span> dentro dele. Tres fases. Uma progressao. Zero ideologia. Pura engenharia de risco.
          </p>
        </header>

        {/* ═══════════════════════════════════════════ */}
        {/* PROGRESSION MAP — A LÓGICA DOS 3 ESTÁGIOS   */}
        {/* ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 border border-white/5 overflow-hidden">
          {[
            { num: '01', title: 'BASE 72', sub: 'Sobreviver', color: 'text-red-500', bg: 'bg-red-950/20', border: 'border-red-600/30', desc: 'Primeiras 72h de qualquer crise. Agua, abrigo, comunicacao.' },
            { num: '02', title: 'AUTONOMIA BIOLOGICA', sub: 'Fortalecer', color: 'text-emerald-500', bg: 'bg-emerald-950/20', border: 'border-emerald-600/30', desc: 'Fortalecer o corpo para nao depender de correcao externa.' },
            { num: '03', title: 'SOBERANIA ALIMENTAR', sub: 'Produzir', color: 'text-amber-500', bg: 'bg-amber-950/20', border: 'border-amber-600/30', desc: 'Produzir o proprio sustento. Capacidade real. Risco reduzido.' },
          ].map((phase, i) => (
            <a key={phase.num} href={`#fase-${phase.num}`} className={`${phase.bg} p-8 md:p-10 ${i < 2 ? 'md:border-r' : ''} ${phase.border} hover:bg-white/[0.02] transition-all group cursor-pointer`}>
              <span className={`${phase.color} text-[10px] font-black tracking-[0.5em] uppercase`}>Fase {phase.num}</span>
              <h3 className="text-xl font-black uppercase tracking-tighter italic mt-2 mb-1">{phase.title}</h3>
              <p className={`${phase.color} text-xs font-black uppercase tracking-widest mb-3`}>{phase.sub}</p>
              <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{phase.desc}</p>
              <ArrowRight className={`${phase.color} mt-4 opacity-0 group-hover:opacity-100 transition-opacity`} size={16} />
            </a>
          ))}
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* ALERTA CONTEXTUAL — DADOS, NÃO MEDO         */}
        {/* ═══════════════════════════════════════════ */}
        <div className="bg-amber-950/10 border border-amber-700/30 p-6 md:p-8 mb-20 relative overflow-hidden">
          <AlertTriangle className="absolute top-3 right-3 text-amber-600/10" size={80} />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 p-2 bg-amber-900/30 border border-amber-700/40 rounded-sm">
              <AlertTriangle className="text-amber-500" size={20} />
            </div>
            <div>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Engenharia de Risco — Nao Ideologia</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-bold leading-relaxed text-slate-400">
                <p><span className="text-white">Quem produz parte do que consome</span> reduz risco de abastecimento.</p>
                <p><span className="text-white">Quem entende cadeia alimentar</span> entende preco, escassez e qualidade.</p>
                <p><span className="text-white">Quem domina tecnicas basicas de cultivo</span> ganha margem de seguranca.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* FASE 01 — BASE 72                           */}
        {/* ═══════════════════════════════════════════ */}
        <section id="fase-01" className="mb-24 scroll-mt-32">
          <div className="bg-red-950/10 border border-red-600/20 p-8 md:p-12 relative overflow-hidden">
            <Clock className="absolute top-6 right-6 text-red-600 opacity-[0.05]" size={200} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-red-500 text-[10px] font-black tracking-[0.5em] uppercase">Fase 01 — Emergencia</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-3 leading-none">
                BASE <span className="text-red-500">72</span>
              </h2>
              <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                A referencia vem da "regra das 72 horas" usada em protocolos de emergencia e defesa civil. Apos um desastre, as primeiras 72 horas sao criticas. Servicos publicos podem nao responder.
              </p>
              <p className="text-red-400/80 text-xs font-black uppercase tracking-wider mb-10">
                Preparacao minima essencial. Autossuficiencia imediata. Mentalidade pratica. Protocolo objetivo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {BASE72_ITEMS.map((item) => (
                  <div key={item.label} className="bg-black/50 border border-red-900/20 p-5 hover:border-red-600/40 transition-all">
                    <div className="flex items-start gap-3">
                      <item.icon className="text-red-500 mt-0.5 shrink-0" size={18} />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider mb-1">{item.label}</h4>
                        <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-950/30 border border-red-800/30">
                <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  CTA: Monte seu kit 72h hoje. Nao amanha. O sistema nao avisa quando falha.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* FASE 02 — AUTONOMIA BIOLÓGICA               */}
        {/* ═══════════════════════════════════════════ */}
        <section id="fase-02" className="mb-24 scroll-mt-32">
          <div className="bg-emerald-950/10 border border-emerald-600/20 p-8 md:p-12 relative overflow-hidden">
            <Heart className="absolute top-6 right-6 text-emerald-600 opacity-[0.05]" size={200} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Fase 02 — Saude</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-3 leading-none">
                AUTONOMIA<br /><span className="text-emerald-500">BIOLOGICA</span>
              </h2>
              <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                Sua saude nao pode depender de um sistema que lucra com a sua doenca. Fortalecer o corpo e a primeira linha de defesa antes de qualquer colapso.
              </p>
              <p className="text-emerald-400/80 text-xs font-black uppercase tracking-wider mb-10">
                Quem nao cuida do corpo, nao sobrevive ao caos. Saude e a base de tudo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {BIO_ITEMS.map((item) => (
                  <div key={item.label} className="bg-black/50 border border-emerald-900/20 p-5 hover:border-emerald-600/40 transition-all">
                    <div className="flex items-start gap-3">
                      <item.icon className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider mb-1">{item.label}</h4>
                        <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-emerald-950/30 border border-emerald-800/30">
                <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  CTA: Aprenda o basico antes de precisar. Quando a farmacia fechar, a natureza continua aberta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* FASE 03 — SOBERANIA ALIMENTAR               */}
        {/* ═══════════════════════════════════════════ */}
        <section id="fase-03" className="mb-24 scroll-mt-32">
          <div className="bg-amber-950/10 border border-amber-600/20 p-8 md:p-12 relative overflow-hidden">
            <Wheat className="absolute top-6 right-6 text-amber-600 opacity-[0.05]" size={200} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-amber-500 text-[10px] font-black tracking-[0.5em] uppercase">Fase 03 — Producao</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-3 leading-none">
                SOBERANIA<br /><span className="text-amber-500">ALIMENTAR</span>
              </h2>
              <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                Quem controla sua comida, controla voce. Plantar, colher, criar, armazenar, preservar. Isso nao e metafora. E capacidade real.
              </p>
              <p className="text-amber-400/80 text-xs font-black uppercase tracking-wider mb-10">
                Saiu de narrativa reativa. Entrou em arquitetura produtiva.
              </p>

              {/* SUBCAMADAS — Deep Architecture */}
              <div className="space-y-3 mb-10">
                {ALIMENTAR_LAYERS.map((layer, i) => (
                  <div key={layer.title} className="bg-black/50 border border-amber-900/20 hover:border-amber-600/40 transition-all overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Number + Icon */}
                      <div className="flex items-center gap-4 p-5 md:p-6 md:w-80 shrink-0 bg-amber-950/20 border-b md:border-b-0 md:border-r border-amber-900/20">
                        <span className="text-amber-600/30 text-3xl font-black italic">0{i + 1}</span>
                        <layer.icon className="text-amber-500 shrink-0" size={22} />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-wider">{layer.title}</h4>
                          <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-widest mt-0.5">{layer.desc}</p>
                        </div>
                      </div>
                      {/* Right: Details */}
                      <div className="p-5 md:p-6 flex items-center">
                        <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{layer.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-950/30 border border-amber-800/30">
                <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  CTA: Comece com um vaso. Depois um canteiro. Depois um sistema. Cada semente plantada e uma dependencia eliminada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* STATUS PANEL — Material Status               */}
        {/* ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-20">
          {[
            { phase: 'Base 72', status: 'Em construcao', color: 'border-red-600/30 text-red-500' },
            { phase: 'Autonomia Biologica', status: 'Em construcao', color: 'border-emerald-600/30 text-emerald-500' },
            { phase: 'Soberania Alimentar', status: 'Em construcao', color: 'border-amber-600/30 text-amber-500' },
          ].map((s) => (
            <div key={s.phase} className={`border ${s.color} bg-white/[0.01] p-5 text-center`}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">{s.phase}</p>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">{s.status} — PDFs e guias em breve</p>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* CTA FINAL — ENCERRAMENTO COM PNL            */}
        {/* ═══════════════════════════════════════════ */}
        <div className="text-center mb-20">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Reducao inteligente de dependencia</p>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight mb-4">
            AUTONOMIA NAO E FUGA<br />DO SISTEMA.
          </h3>
          <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic text-amber-500 mb-10">
            E ENGENHARIA DE RISCO.
          </p>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-amber-700 text-black px-10 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all"
          >
            <Shield size={18} /> Voltar ao Centro de Operacoes
          </Link>
        </div>

        {/* FOOTER SEAL */}
        <div className="pt-16 border-t border-white/5 text-right">
          <p className="text-white font-black uppercase text-lg tracking-tighter italic opacity-30">Quem planta, nao implora.</p>
        </div>
      </div>
    </div>
  );
}
