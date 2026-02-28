import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Tent, Siren, Cross, Egg, Mountain, TreePine, Layers, Thermometer, Bug, Shovel } from 'lucide-react';

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
    <div className="min-h-screen text-stone-900 font-sans selection:bg-emerald-300/50 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #e8e0d4 0%, #d4cbb8 15%, #c9d4b8 35%, #b8c9a0 55%, #a8bf92 75%, #c9d4b8 100%)' }}
    >

      {/* Living organic background layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Warm sunlight patches */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255,220,130,0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(180,210,120,0.5) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(139,115,85,0.3) 0%, transparent 70%)' }} />
        
        {/* Rain-washed texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 2px 3px at 20% 30%, rgba(100,80,50,0.4), transparent),
              radial-gradient(ellipse 3px 2px at 50% 60%, rgba(100,80,50,0.3), transparent),
              radial-gradient(ellipse 2px 4px at 80% 40%, rgba(100,80,50,0.3), transparent)
            `,
            backgroundSize: '120px 100px, 90px 130px, 150px 110px'
          }}
        />
      </div>

      {/* Floating organic elements */}
      <style>{`
        @keyframes breathe { 
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.08; }
          50% { transform: translateY(-20px) scale(1.05) rotate(3deg); opacity: 0.15; }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0) rotate(-2deg); opacity: 0.06; }
          50% { transform: translateX(15px) rotate(2deg); opacity: 0.12; }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.05; }
          33% { transform: translateY(-15px) translateX(10px); opacity: 0.1; }
          66% { transform: translateY(-5px) translateX(-8px); opacity: 0.08; }
        }
        .breathe { animation: breathe 12s ease-in-out infinite; }
        .sway { animation: sway 18s ease-in-out infinite; }
        .drift { animation: drift 20s ease-in-out 2s infinite; }
      `}</style>
      <Leaf className="fixed top-[15%] left-[8%] text-emerald-700 breathe pointer-events-none z-0" size={120} />
      <TreePine className="fixed bottom-[15%] right-[5%] text-emerald-800 sway pointer-events-none z-0" size={180} />
      <Wheat className="fixed top-[55%] left-[75%] text-amber-700 drift pointer-events-none z-0" size={100} />
      <Sprout className="fixed top-[75%] left-[15%] text-green-700 breathe pointer-events-none z-0" size={90} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

        <Link to="/arsenal" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 mb-16 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
          <ArrowLeft size={14} /> Voltar ao Arsenal
        </Link>

        {/* ═══════════════ HEADER ═══════════════ */}
        <header className="mb-16">
          <div className="flex items-start gap-5 mb-8">
            <div className="p-4 bg-emerald-700/20 border border-emerald-600/30 rounded-2xl mt-1 backdrop-blur-sm">
              <Shield className="text-emerald-700" size={32} />
            </div>
            <div>
              <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Engenharia de Resiliencia Pessoal</p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                PROJETO<br /><span className="text-emerald-700">AUTONOMO</span>
              </h1>
            </div>
          </div>
          <p className="text-stone-600 text-sm md:text-base max-w-3xl font-bold leading-relaxed">
            Autonomia verdadeira nao e fuga do sistema. E <span className="text-emerald-700 font-black">reducao inteligente de dependencia</span> dentro dele. Tres fases. Uma progressao. Zero ideologia. Pura engenharia de risco.
          </p>
        </header>

        {/* ═══════════════ PROGRESSION MAP ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {[
            { num: '01', title: 'BASE 72', sub: 'Sobreviver', color: 'text-rose-700', bg: 'bg-rose-50/80', border: 'border-rose-300', hoverBg: 'hover:bg-rose-100/90', desc: 'Primeiras 72h de qualquer crise. Agua, abrigo, comunicacao.' },
            { num: '02', title: 'AUTONOMIA BIOLOGICA', sub: 'Fortalecer', color: 'text-emerald-700', bg: 'bg-emerald-50/80', border: 'border-emerald-300', hoverBg: 'hover:bg-emerald-100/90', desc: 'Fortalecer o corpo para nao depender de correcao externa.' },
            { num: '03', title: 'SOBERANIA ALIMENTAR', sub: 'Produzir', color: 'text-amber-700', bg: 'bg-amber-50/80', border: 'border-amber-300', hoverBg: 'hover:bg-amber-100/90', desc: 'Produzir o proprio sustento. Capacidade real. Risco reduzido.' },
          ].map((phase) => (
            <a key={phase.num} href={`#fase-${phase.num}`}
              className={`${phase.bg} ${phase.border} ${phase.hoverBg} border-2 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg`}>
              <span className={`${phase.color} text-[10px] font-black tracking-[0.5em] uppercase`}>Fase {phase.num}</span>
              <h3 className="text-xl font-black uppercase tracking-tighter mt-2 mb-1 text-stone-800">{phase.title}</h3>
              <p className={`${phase.color} text-xs font-black uppercase tracking-widest mb-3`}>{phase.sub}</p>
              <p className="text-stone-500 text-[11px] font-bold leading-relaxed">{phase.desc}</p>
              <ArrowRight className={`${phase.color} mt-4 opacity-0 group-hover:opacity-100 transition-opacity`} size={16} />
            </a>
          ))}
        </div>

        {/* ═══════════════ ALERTA CONTEXTUAL ═══════════════ */}
        <div className="bg-amber-50/80 border-2 border-amber-400/50 p-6 md:p-8 mb-20 rounded-2xl backdrop-blur-sm shadow-sm relative overflow-hidden">
          <AlertTriangle className="absolute top-3 right-3 text-amber-300/20" size={80} />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 p-3 bg-amber-200/50 border border-amber-400/40 rounded-xl">
              <AlertTriangle className="text-amber-700" size={20} />
            </div>
            <div>
              <p className="text-amber-800 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Engenharia de Risco — Nao Ideologia</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-bold leading-relaxed text-stone-600">
                <p><span className="text-stone-800">Quem produz parte do que consome</span> reduz risco de abastecimento.</p>
                <p><span className="text-stone-800">Quem entende cadeia alimentar</span> entende preco, escassez e qualidade.</p>
                <p><span className="text-stone-800">Quem domina tecnicas basicas de cultivo</span> ganha margem de seguranca.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ FASE 01 — BASE 72 ═══════════════ */}
        <section id="fase-01" className="mb-24 scroll-mt-32">
          <div className="bg-rose-50/70 border-2 border-rose-300/60 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-sm relative overflow-hidden">
            <Clock className="absolute top-6 right-6 text-rose-200/30" size={200} />
            <div className="relative z-10">
              <span className="text-rose-600 text-[10px] font-black tracking-[0.5em] uppercase">Fase 01 — Emergencia</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-3 leading-none mt-2 text-stone-800">
                BASE <span className="text-rose-600">72</span>
              </h2>
              <p className="text-stone-600 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                A referencia vem da "regra das 72 horas" usada em protocolos de emergencia e defesa civil. Apos um desastre, as primeiras 72 horas sao criticas. Servicos publicos podem nao responder.
              </p>
              <p className="text-rose-600/80 text-xs font-black uppercase tracking-wider mb-10">
                Preparacao minima essencial. Autossuficiencia imediata. Mentalidade pratica.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BASE72_ITEMS.map((item) => (
                  <div key={item.label} className="bg-white/60 border border-rose-200/60 p-5 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-rose-300 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg shrink-0">
                        <item.icon className="text-rose-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider mb-1 text-stone-700">{item.label}</h4>
                        <p className="text-stone-500 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-rose-100/50 border border-rose-300/40 rounded-xl">
                <p className="text-rose-700 text-[11px] font-black uppercase tracking-[0.2em]">
                  Monte seu kit 72h hoje. Nao amanha. O sistema nao avisa quando falha.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FASE 02 — AUTONOMIA BIOLÓGICA ═══════════════ */}
        <section id="fase-02" className="mb-24 scroll-mt-32">
          <div className="bg-emerald-50/70 border-2 border-emerald-300/60 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-sm relative overflow-hidden">
            <Heart className="absolute top-6 right-6 text-emerald-200/30" size={200} />
            <div className="relative z-10">
              <span className="text-emerald-600 text-[10px] font-black tracking-[0.5em] uppercase">Fase 02 — Saude</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-3 leading-none mt-2 text-stone-800">
                AUTONOMIA<br /><span className="text-emerald-600">BIOLOGICA</span>
              </h2>
              <p className="text-stone-600 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                Sua saude nao pode depender de um sistema que lucra com a sua doenca. Fortalecer o corpo e a primeira linha de defesa antes de qualquer colapso.
              </p>
              <p className="text-emerald-600/80 text-xs font-black uppercase tracking-wider mb-10">
                Quem nao cuida do corpo, nao sobrevive ao caos. Saude e a base de tudo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIO_ITEMS.map((item) => (
                  <div key={item.label} className="bg-white/60 border border-emerald-200/60 p-5 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-emerald-300 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                        <item.icon className="text-emerald-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider mb-1 text-stone-700">{item.label}</h4>
                        <p className="text-stone-500 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-emerald-100/50 border border-emerald-300/40 rounded-xl">
                <p className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.2em]">
                  Aprenda o basico antes de precisar. Quando a farmacia fechar, a natureza continua aberta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FASE 03 — SOBERANIA ALIMENTAR ═══════════════ */}
        <section id="fase-03" className="mb-24 scroll-mt-32">
          <div className="bg-amber-50/70 border-2 border-amber-300/60 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-sm relative overflow-hidden">
            <Wheat className="absolute top-6 right-6 text-amber-200/30" size={200} />
            <div className="relative z-10">
              <span className="text-amber-700 text-[10px] font-black tracking-[0.5em] uppercase">Fase 03 — Producao</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-3 leading-none mt-2 text-stone-800">
                SOBERANIA<br /><span className="text-amber-700">ALIMENTAR</span>
              </h2>
              <p className="text-stone-600 text-sm font-bold leading-relaxed max-w-2xl mb-3">
                Quem controla sua comida, controla voce. Plantar, colher, criar, armazenar, preservar. Isso nao e metafora. E capacidade real.
              </p>
              <p className="text-amber-700/80 text-xs font-black uppercase tracking-wider mb-10">
                Saiu de narrativa reativa. Entrou em arquitetura produtiva.
              </p>

              <div className="space-y-4 mb-10">
                {ALIMENTAR_LAYERS.map((layer, i) => (
                  <div key={layer.title} className="bg-white/60 border border-amber-200/60 rounded-xl hover:bg-white/80 hover:shadow-md hover:border-amber-300 transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex items-center gap-4 p-5 md:p-6 md:w-80 shrink-0 bg-amber-100/40 border-b md:border-b-0 md:border-r border-amber-200/40">
                        <span className="text-amber-400/60 text-3xl font-black">0{i + 1}</span>
                        <div className="p-2 bg-amber-200/50 rounded-lg">
                          <layer.icon className="text-amber-700 shrink-0" size={22} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-wider text-stone-700">{layer.title}</h4>
                          <p className="text-amber-600/70 text-[10px] font-black uppercase tracking-widest mt-0.5">{layer.desc}</p>
                        </div>
                      </div>
                      <div className="p-5 md:p-6 flex items-center">
                        <p className="text-stone-500 text-[11px] font-bold leading-relaxed">{layer.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-amber-100/50 border border-amber-300/40 rounded-xl">
                <p className="text-amber-800 text-[11px] font-black uppercase tracking-[0.2em]">
                  Comece com um vaso. Depois um canteiro. Depois um sistema. Cada semente plantada e uma dependencia eliminada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ STATUS PANEL ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {[
            { phase: 'Base 72', status: 'Em construcao', color: 'border-rose-300 text-rose-700', bg: 'bg-rose-50/70' },
            { phase: 'Autonomia Biologica', status: 'Em construcao', color: 'border-emerald-300 text-emerald-700', bg: 'bg-emerald-50/70' },
            { phase: 'Soberania Alimentar', status: 'Em construcao', color: 'border-amber-300 text-amber-700', bg: 'bg-amber-50/70' },
          ].map((s) => (
            <div key={s.phase} className={`border-2 ${s.color} ${s.bg} p-5 text-center rounded-xl backdrop-blur-sm`}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">{s.phase}</p>
              <p className="text-stone-500 text-[9px] font-black uppercase tracking-[0.3em]">{s.status} — PDFs e guias em breve</p>
            </div>
          ))}
        </div>

        {/* ═══════════════ CTA FINAL ═══════════════ */}
        <div className="text-center mb-20">
          <p className="text-stone-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Reducao inteligente de dependencia</p>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4 text-stone-800">
            AUTONOMIA NAO E FUGA<br />DO SISTEMA.
          </h3>
          <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-emerald-700 mb-10">
            E ENGENHARIA DE RISCO.
          </p>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-emerald-700 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-emerald-800 hover:shadow-xl transition-all duration-300"
          >
            <Shield size={18} /> Voltar ao Centro de Operacoes
          </Link>
        </div>

        {/* FOOTER SEAL */}
        <div className="pt-16 border-t border-stone-400/20 text-right">
          <p className="text-stone-500 font-black uppercase text-lg tracking-tighter opacity-50">Quem planta, nao implora.</p>
        </div>
      </div>
    </div>
  );
}
