import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, Leaf, Wheat, AlertTriangle, Heart, Sprout, Package, Flame, Droplets, Wind, Sun, Bug, Tent, Siren, Cross, Apple, Egg, Fish } from 'lucide-react';

const SUBCATEGORIES = [
  {
    id: 'base72',
    icon: Clock,
    title: 'BASE 72',
    subtitle: 'EMERGÊNCIA & SOBREVIVÊNCIA',
    description: 'As primeiras 72 horas após um desastre são críticas. Serviços públicos podem não responder. Você precisa de autonomia mínima por 3 dias.',
    accent: 'from-red-600 to-red-900',
    borderColor: 'border-red-600',
    textColor: 'text-red-500',
    bgColor: 'bg-red-950/20',
    items: [
      { icon: Package, label: 'Kit de Sobrevivência 72h', desc: 'Checklist completo para montar seu kit tático de 3 dias' },
      { icon: Flame, label: 'Protocolos de Apagão', desc: 'O que fazer quando a energia não volta' },
      { icon: Droplets, label: 'Purificação de Água', desc: 'Métodos caseiros para tornar água potável' },
      { icon: Tent, label: 'Abrigo Improvisado', desc: 'Técnicas de abrigo em cenários urbanos e rurais' },
      { icon: Siren, label: 'Comunicação de Crise', desc: 'Rádio, sinais e protocolos sem internet' },
      { icon: Wind, label: 'Navegação sem GPS', desc: 'Orientação por bússola, estrelas e terreno' },
    ]
  },
  {
    id: 'biologica',
    icon: Heart,
    title: 'AUTONOMIA BIOLÓGICA',
    subtitle: 'SAÚDE & MEDICINA NATURAL',
    description: 'Sua saúde não pode depender de um sistema que lucra com sua doença. Plantas medicinais, primeiros socorros e prevenção soberana.',
    accent: 'from-emerald-600 to-emerald-900',
    borderColor: 'border-emerald-600',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-950/20',
    items: [
      { icon: Leaf, label: 'Farmácia Soberana', desc: 'Plantas medicinais que substituem remédios industriais' },
      { icon: Cross, label: 'Primeiros Socorros', desc: 'Protocolos de emergência médica sem hospital' },
      { icon: Bug, label: 'Repelentes Naturais', desc: 'Proteção contra vetores sem químicos industriais' },
      { icon: Sun, label: 'Saúde Preventiva', desc: 'Sol, jejum, movimento — o que a indústria esconde' },
      { icon: Sprout, label: 'Fitoterapia Aplicada', desc: 'Chás, tinturas e cataplasmas com fundamento' },
      { icon: Droplets, label: 'Hidratação & Detox', desc: 'Protocolos de limpeza com ingredientes naturais' },
    ]
  },
  {
    id: 'alimentar',
    icon: Wheat,
    title: 'SOBERANIA ALIMENTAR',
    subtitle: 'PRODUÇÃO & AUTOSSUFICIÊNCIA',
    description: 'Quem controla sua comida, controla você. Hortas, criação de animais e preservação de alimentos para independência total.',
    accent: 'from-amber-600 to-amber-900',
    borderColor: 'border-amber-600',
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-950/20',
    items: [
      { icon: Sprout, label: 'Horta em Casa', desc: 'Monte sua produção em qualquer espaço — varanda ou quintal' },
      { icon: Egg, label: 'Criação de Animais', desc: 'Galinhas, codornas e peixes em sistemas compactos' },
      { icon: Apple, label: 'Comidas Saudáveis', desc: 'Alimentação real vs. ultraprocessados industriais' },
      { icon: Flame, label: 'Conservação de Alimentos', desc: 'Defumação, salga, fermentação e desidratação' },
      { icon: Fish, label: 'Pesca & Caça Urbana', desc: 'Fontes alternativas de proteína em cenários de escassez' },
      { icon: Wheat, label: 'Sementes Crioulas', desc: 'Banco de sementes próprio — independência genética' },
    ]
  }
];

export default function ProjetoAutonomo() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-orange-600 pb-32 relative overflow-hidden">

      {/* Tactical Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

        <Link to="/arsenal" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
          <ArrowLeft size={14} /> Voltar ao Arsenal
        </Link>

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="text-orange-500" size={40} />
            <div>
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">Módulo de Resiliência</p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">
                PROJETO<br /><span className="text-orange-500">AUTÔNOMO</span>
              </h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl font-bold uppercase tracking-wider leading-relaxed">
            O sistema não vai te alimentar quando decidir te desligar. Independência total é a única blindagem real contra o colapso programado.
          </p>
        </header>

        {/* ALERT BANNER */}
        <div className="bg-orange-950/30 border-2 border-orange-600/60 p-6 md:p-8 mb-16 relative overflow-hidden">
          <AlertTriangle className="absolute top-4 right-4 text-orange-600/20" size={80} />
          <div className="relative z-10">
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">⚠ Aviso de Consciência</p>
            <p className="text-sm md:text-base font-bold leading-relaxed max-w-3xl">
              Este conteúdo não é teoria conspiratória. É <span className="text-orange-400">gestão de risco baseada em dados históricos</span> de resposta a desastres. Organizações de emergência no mundo inteiro recomendam autonomia mínima de 72 horas. Você está preparado?
            </p>
          </div>
        </div>

        {/* SUBCATEGORIES */}
        <div className="space-y-8">
          {SUBCATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className={`${cat.bgColor} border ${cat.borderColor}/30 p-8 md:p-12 relative overflow-hidden group hover:${cat.borderColor} transition-all duration-500`}>
              <cat.icon className={`absolute top-6 right-6 ${cat.textColor} opacity-10 group-hover:opacity-20 transition-opacity`} size={120} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <cat.icon className={cat.textColor} size={24} />
                  <p className={`${cat.textColor} text-[10px] font-black uppercase tracking-[0.4em]`}>{cat.subtitle}</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic mb-4">{cat.title}</h2>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider leading-relaxed max-w-2xl mb-8">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item) => (
                    <div key={item.label} className="bg-black/40 border border-white/5 p-5 hover:border-white/20 transition-all group/item cursor-default">
                      <div className="flex items-start gap-3">
                        <item.icon className={`${cat.textColor} mt-0.5 shrink-0`} size={18} />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider mb-1">{item.label}</h4>
                          <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                    📁 Materiais em preparação — Em breve: PDFs, guias e checklists
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-20 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Quem depende do sistema, morre com ele</p>
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic mb-8">
            AUTONOMIA NÃO É OPÇÃO.<br /><span className="text-orange-500">É SOBREVIVÊNCIA.</span>
          </h3>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-3 bg-orange-600 text-black px-10 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all"
          >
            <Shield size={18} /> Voltar ao Arsenal
          </Link>
        </div>

        {/* FOOTER */}
        <div className="mt-32 pt-16 border-t border-white/5 text-right">
          <p className="text-white font-black uppercase text-xl tracking-tighter italic opacity-40">Autossuficiência é o novo luxo.</p>
        </div>
      </div>
    </div>
  );
}
