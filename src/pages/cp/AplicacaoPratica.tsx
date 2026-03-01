import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Leaf, Activity, Brain, Shield, XCircle, AlertTriangle, Eye, Package, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function AplicacaoPratica() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-[15%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap">
          <Link to="/" className="text-stone-600 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo" className="text-stone-600 hover:text-emerald-400 transition-colors">Projeto Autônomo</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo/conhecimento-perdido" className="text-stone-600 hover:text-emerald-400 transition-colors">Conhecimento Perdido</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Aplicação Prática</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/25">
              <FlaskConical className="text-emerald-400" size={22} />
            </div>
            <span className="text-emerald-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 04 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            APLICAÇÃO <span className="text-emerald-400">PRÁTICA</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Protocolos domésticos estruturados, preparo correto, conservação e uso racional. 
            A diferença entre informação e formação é a estrutura — e aqui, cada detalhe tem padrão técnico fixo.
          </p>
        </motion.header>

        {/* ─── INFORMAÇÃO VS FORMAÇÃO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-emerald-950/40 border border-emerald-800/25 rounded-2xl p-8 md:p-12">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8">
              Cada planta documentada neste módulo segue um <span className="text-emerald-400 font-semibold">padrão técnico fixo</span> que mantém a autoridade do protocolo. 
              A diferença entre informação e formação é a estrutura.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Informação', example: '"Camomila acalma."', type: 'bad' as const },
                { label: 'Formação', example: 'Princípio ativo: apigenina · Mecanismo: modulação GABA · Sinergias: +capim-limão · Térmico: neutro · Risco crônico: absorção de ferro · Dose: 1-2g flor seca/xícara', type: 'good' as const },
              ].map(item => (
                <div key={item.label} className={`p-6 rounded-xl border ${item.type === 'bad' ? 'bg-red-950/20 border-red-800/20' : 'bg-emerald-950/30 border-emerald-700/25'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {item.type === 'bad' ? <XCircle size={16} className="text-red-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
                    <span className={`text-sm font-bold ${item.type === 'bad' ? 'text-red-300' : 'text-emerald-300'}`}>{item.label}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${item.type === 'bad' ? 'text-stone-500 italic' : 'text-stone-300 font-mono'}`}>{item.example}</p>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-5">Padrão fixo de cada ficha técnica</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Leaf, label: 'Nome e espécie' },
                { icon: Activity, label: 'O que melhora' },
                { icon: Brain, label: 'Como age' },
                { icon: FlaskConical, label: 'Compostos ativos' },
                { icon: FlaskConical, label: 'Como preparar' },
                { icon: Shield, label: 'Faixa segura' },
                { icon: XCircle, label: 'Contraindicações' },
                { icon: AlertTriangle, label: 'Interações' },
                { icon: Eye, label: 'Sinais de suspensão' },
                { icon: Package, label: 'Parte utilizada' },
                { icon: Sun, label: 'Impacto térmico' },
                { icon: Activity, label: 'Sinergias' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                  <f.icon size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-stone-300">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── PROTOCOLOS DOMÉSTICOS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-emerald-950/30 border border-emerald-700/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-lg font-bold text-stone-200 mb-6">Protocolos domésticos estruturados</h2>
            <div className="space-y-5 text-stone-400 text-base leading-relaxed max-w-3xl">
              <p>
                Infusão não é "jogar água quente". Decocção não é "ferver qualquer coisa". 
                Maceração não é "deixar de molho e torcer que funcione". Cada método de preparo existe porque 
                <span className="text-emerald-400 font-semibold"> diferentes compostos químicos são extraídos em condições diferentes</span>.
              </p>
              <p>
                Folhas e flores liberam compostos voláteis em infusão (água a 80-90°C, coberta, por 5-10 minutos). 
                Raízes e cascas exigem decocção (fervura direta por 10-20 minutos). 
                Compostos sensíveis ao calor precisam de maceração a frio (8-12 horas).
              </p>
              <p>
                A proporção planta/água, o tempo de contato, a temperatura e o armazenamento pós-preparo 
                determinam a eficácia real do uso. Este bloco documenta cada uma dessas variáveis 
                para que o preparo caseiro tenha <span className="text-stone-200 font-semibold">resultado previsível e reproduzível</span>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/conhecimento-perdido/seguranca-e-limites"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Segurança e Limites
          </Link>
          <Link to="/conhecimento-perdido/continuidade-familiar"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl px-6 py-4 text-emerald-300 text-sm font-bold hover:bg-emerald-600/30 transition-all group">
            Próximo: Continuidade Familiar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
