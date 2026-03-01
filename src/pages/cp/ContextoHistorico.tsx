import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Leaf, TreePine, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function ContextoHistorico() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,100,50,0.15) 0%, transparent 70%)' }} />
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
          <span className="text-emerald-400">Contexto Histórico</span>
        </nav>

        {/* ─── HERO ─── */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/25">
              <BookOpen className="text-emerald-400" size={22} />
            </div>
            <span className="text-emerald-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Bloco 01 · Conhecimento Perdido</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
            CONTEXTO <span className="text-emerald-400">HISTÓRICO</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Mapeamento documentado da transição entre práticas tradicionais e institucionalização médica moderna. 
            Linha temporal, agentes envolvidos e impactos sistêmicos na autonomia biológica das famílias.
          </p>
        </motion.header>

        {/* ─── CONTEÚDO PRINCIPAL ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="max-w-3xl space-y-6">
            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Durante gerações, famílias plantavam, colhiam e criavam seus próprios recursos de subsistência. 
              Não por ideologia — por necessidade. Cada quintal era uma farmácia. Cada avó era uma enciclopédia viva.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Com o tempo, a vida urbana substituiu a prática rural. O conhecimento que era transmitido pela observação 
              da terra deixou de ser ensinado. O que era rotina virou exceção. O que era óbvio virou "alternativo".
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border-l-2 border-emerald-500/40 pl-6 py-3">
              <p className="text-emerald-300/90 text-lg md:text-xl font-medium leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Não nos tiraram esse conhecimento. Nos desconectamos dele. Lentamente. Geração após geração, o que era natural virou discutível."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Hoje, a maioria das pessoas não reconhece uma folha de <span className="text-emerald-400 font-semibold">hortelã</span>. 
              Não sabe diferenciar <span className="text-emerald-400 font-semibold">poejo</span> de capim. 
              Não entende o que é <span className="text-emerald-400 font-semibold">inflamação crônica</span>. 
              Não associa <span className="text-emerald-400 font-semibold">sono ruim</span> com imunidade baixa.
            </motion.p>

            <motion.p variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base leading-relaxed">
              Isso não é culpa de ninguém. É resultado da <span className="text-stone-200 font-semibold">desconexão prática com a base biológica</span>. 
              Este módulo reconecta essa base.
            </motion.p>
          </div>

          {/* ─── Base Histórica expandida ─── */}
          <div className="mt-14 bg-emerald-950/30 border border-emerald-700/25 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">A farmácia veio do quintal</h2>
            </div>
            <div className="space-y-5 text-stone-400 text-base leading-relaxed max-w-3xl">
              <p>
                Farmacopeias europeias, medicina tradicional asiática, sistemas agrícolas familiares. 
                A farmacologia moderna nasceu da extração de compostos vegetais. 
                Ácido acetilsalicílico veio do salgueiro. Digitálicos vieram da dedaleira. 
                A planta veio antes do laboratório.
              </p>
              <p>
                A institucionalização da medicina ao longo do século XX criou uma separação artificial entre 
                "saber popular" e "saber científico". O que antes era complementar virou antagônico. 
                As mesmas moléculas que a indústria farmacêutica isola e vende já existiam — e continuam existindo — 
                nos quintais que deixamos de cultivar.
              </p>
              <p>
                Este bloco documenta essa transição. Não como ataque à medicina moderna — que salvou e salva vidas — 
                mas como mapeamento do que foi <span className="text-stone-200 font-semibold">perdido no processo</span>. 
                A autonomia biológica que sustentou famílias por séculos não precisava ter sido abandonada 
                para que a ciência avançasse. Ambas podiam — e devem — coexistir.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/projeto-autonomo/conhecimento-perdido"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Voltar ao Hub
          </Link>
          <Link to="/conhecimento-perdido/base-fisiologica"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl px-6 py-4 text-emerald-300 text-sm font-bold hover:bg-emerald-600/30 transition-all group">
            Próximo: Base Fisiológica <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
