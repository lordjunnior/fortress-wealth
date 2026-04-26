import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, FlaskConical, BookOpen, Clock, Users } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';

import imgHubHero from '@/assets/receitas/hub-receitas-funcionais-hero.jpg';
import imgSobremesaRivotril from '@/assets/receitas/hero-sobremesa-rivotril.jpg';

/**
 * /receitas-funcionais
 * Hub de receitas funcionais — primeira de uma série.
 * Padrão Apple Editorial. Bento grid expansível.
 * Quarteto do Poder: SEO + PNL + Curiosidade + Autoridade.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: APPLE_EASE, delay },
});

const RECEITAS = [
  {
    slug: 'sobremesa-substitui-rivotril',
    titulo: 'A Sobremesa que Substitui o Rivotril',
    pretitulo: 'Sono · Cortisol · Ansiedade',
    resumo: 'Quatro ativos com ensaio clínico randomizado. Glicina (3g), Passiflora, camomila e chia hidratada. Comer 30 a 60 minutos antes de dormir.',
    icon: Moon,
    img: imgSobremesaRivotril,
    tempo: '15 min preparo',
    porcoes: '4 porções',
    estudos: '8 estudos primários',
    disponivel: true,
  },
];

const display: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  letterSpacing: '-0.04em',
  lineHeight: 0.92,
};
const editorial: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontStyle: 'italic',
  fontWeight: 700,
};
const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

export default function ReceitasFuncionais() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Helmet>
        <title>Receitas Funcionais | Cozinha que Devolve Hormônio | Lord Junnior</title>
        <meta
          name="description"
          content="Receitas funcionais com base científica. Cada prato é um protocolo: glicina para sono, Passiflora para cortisol, fibra para saciedade. Cozinha que cura, não que entretém."
        />
        <link rel="canonical" href="https://www.lordjunnior.com.br/receitas-funcionais" />
        <meta property="og:title" content="Receitas Funcionais — Cozinha que Devolve Hormônio" />
        <meta property="og:description" content="Cada receita é um protocolo nutricional com ensaio clínico. Não é dieta. É bioquímica aplicada na cozinha." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/receitas-funcionais.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Receitas Funcionais',
            description: 'Coleção de receitas funcionais com base em ensaios clínicos randomizados.',
            url: 'https://www.lordjunnior.com.br/receitas-funcionais',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Lord Junnior',
              url: 'https://www.lordjunnior.com.br',
            },
          })}
        </script>
      </Helmet>

      <BackToHome />
      <ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={imgHubHero}
            alt="Quarto silencioso à noite com luz de abajur quente — atmosfera de descanso restaurador"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
          <motion.div {...fade(0)}>
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 border border-amber-500/30 bg-amber-500/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300/90 text-[10px] font-bold tracking-[0.2em] uppercase" style={mono}>
                Cozinha Funcional · Bioquímica Aplicada
              </span>
            </div>
          </motion.div>

          <motion.h1 {...fade(0.1)} className="text-[clamp(3rem,8vw,7.5rem)] mb-6 max-w-5xl" style={display}>
            Receitas que devolvem
            <br />
            <span className="text-amber-400">hormônio.</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-stone-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8" style={editorial}>
            Não é dieta. Não é "fitness". É bioquímica aplicada na cozinha. Cada receita aqui tem ensaio clínico randomizado por trás de cada ingrediente.
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap gap-x-8 gap-y-3 text-stone-400 text-sm" style={mono}>
            <span>· Sem influencer</span>
            <span>· Sem e-book pago</span>
            <span>· Só PubMed e cozinha</span>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-24 md:py-32 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.p {...fade(0)} className="text-amber-400/70 text-xs mb-8" style={mono}>
            O que é uma receita funcional
          </motion.p>
          <motion.h2 {...fade(0.1)} className="text-3xl md:text-5xl text-stone-100 mb-8 leading-tight" style={display}>
            Comida com <span className="text-amber-400" style={editorial}>função clínica</span>.
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-stone-400 text-lg leading-relaxed">
            A indústria do diet vendeu a ideia de que comida saudável é privação. Aqui invertemos: cada prato é montado para entregar uma <strong className="text-stone-200">dose bioativa específica</strong> — glicina para o sono, flavonoide para o cortisol, fibra solúvel para a saciedade noturna. O sabor não é desculpa. É veículo.
          </motion.p>
        </div>
      </section>

      {/* GRID DE RECEITAS */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fade(0)} className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-6">
            <div>
              <p className="text-amber-400/60 text-xs mb-4" style={mono}>
                Coleção · {RECEITAS.length} receita{RECEITAS.length !== 1 && 's'} ativa{RECEITAS.length !== 1 && 's'}
              </p>
              <h2 className="text-4xl md:text-6xl text-stone-100" style={display}>
                Protocolos disponíveis
              </h2>
            </div>
            <p className="text-stone-500 text-sm max-w-md" style={editorial}>
              Novas receitas são adicionadas conforme cada protocolo passa pela validação científica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECEITAS.map((r, i) => (
              <motion.div key={r.slug} {...fade(i * 0.1)} className={i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}>
                <Link
                  to={`/receitas-funcionais/${r.slug}`}
                  className="group block h-full relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-700 ease-apple"
                >
                  <div className={`relative ${i === 0 ? 'h-72 md:h-[440px]' : 'h-64'} overflow-hidden`}>
                    <img
                      src={r.img}
                      alt={r.titulo}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-apple"
                      loading="lazy"
                      width={i === 0 ? 1920 : 1280}
                      height={i === 0 ? 1080 : 960}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full backdrop-blur-sm">
                      <span className="text-amber-300 text-[10px] font-bold tracking-wider uppercase" style={mono}>
                        {r.pretitulo}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 right-0">
                      <div className="flex items-center gap-3 mb-3">
                        <r.icon size={i === 0 ? 24 : 18} className="text-amber-400" />
                        <span className="text-stone-400 text-xs" style={mono}>
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className={`${i === 0 ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} text-white mb-3 leading-tight`} style={display}>
                        {r.titulo}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-6 group-hover:text-stone-300 transition-colors">
                      {r.resumo}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 pt-6 border-t border-white/5">
                      <span className="flex items-center gap-2 text-stone-500 text-xs" style={mono}>
                        <Clock size={12} className="text-amber-400/70" />
                        {r.tempo}
                      </span>
                      <span className="flex items-center gap-2 text-stone-500 text-xs" style={mono}>
                        <Users size={12} className="text-amber-400/70" />
                        {r.porcoes}
                      </span>
                      <span className="flex items-center gap-2 text-stone-500 text-xs" style={mono}>
                        <BookOpen size={12} className="text-amber-400/70" />
                        {r.estudos}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 group-hover:gap-3 transition-all">
                      <span className="text-xs font-bold uppercase tracking-wider" style={mono}>
                        Abrir protocolo
                      </span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Slot reservado — em breve */}
            <motion.div {...fade(0.2)}>
              <div className="h-full min-h-[400px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-8 text-center">
                <FlaskConical size={32} className="text-stone-700 mb-4" />
                <p className="text-stone-500 text-xs mb-2" style={mono}>
                  Em desenvolvimento
                </p>
                <p className="text-stone-600 text-sm max-w-xs" style={editorial}>
                  Próximo protocolo passando por validação científica.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-stone-500 text-sm mb-6" style={editorial}>
            Receitas funcionais fazem parte de um sistema maior.
          </p>
          <Link
            to="/soberania-organica"
            className="inline-flex items-center gap-3 px-8 py-4 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5 rounded-full transition-all"
          >
            <span className="text-amber-300 text-xs font-bold tracking-wider uppercase" style={mono}>
              Voltar à Soberania Orgânica
            </span>
            <ArrowRight size={14} className="text-amber-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}