import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Leaf, TreePine, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

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
    <>
      <Helmet>
        <title>Contexto Histórico: Como a Medicina Moderna Apagou o Conhecimento Ancestral | Lord Junnior</title>
        <meta name="description" content="Mapeamento documentado da transição entre práticas tradicionais e institucionalização médica. Linha temporal, agentes envolvidos e impactos na autonomia biológica das famílias." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/contexto-historico" />
        <meta property="og:title" content="Contexto Histórico: O Apagamento do Conhecimento Ancestral" />
        <meta property="og:description" content="Como a autonomia biológica das famílias foi sistematicamente substituída pela dependência institucional." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/conhecimento-perdido/contexto-historico" />
      </Helmet>
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />
      <CinematicHero
        image="/heroes/cp-contexto-historico.webp"
        phase="Bloco 01 · Conhecimento Perdido"
        title="Contexto Histórico"
        subtitle="Mapeamento documentado da transição entre práticas tradicionais e institucionalização médica moderna. Linha temporal, agentes envolvidos e impactos sistêmicos na autonomia biológica das famílias."
        icon={BookOpen}
        accentColor="emerald"
        backLink="/projeto-autonomo/conhecimento-perdido"
        backLabel="Conhecimento Perdido"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

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
