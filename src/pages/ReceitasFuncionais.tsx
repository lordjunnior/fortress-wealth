import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, FlaskConical, BookOpen, Clock, Users,
  Leaf, ChefHat, Salad, AlertTriangle, CheckCircle2, Compass, Apple,
} from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';

import imgHubHero from '@/assets/receitas/hub-cozinha-funcional-light.jpg';
import imgSobremesa from '@/assets/receitas/hero-sobremesa-light.jpg';

/**
 * /soberania-organica/cozinha-funcional
 * 7ª frente da Soberania Orgânica.
 * Padrão editorial CLARO obrigatório (sand+sage+terracotta) — referência Jurisdições Amigáveis.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// PALETA: Cream sand + Sage profundo + Terracotta
const C = {
  cream: '#faf6f0',
  sand: '#f1e9dd',
  sandDeep: '#e8dcc8',
  sage: '#3d4a36',
  sageDark: '#2a3324',
  terracotta: '#c4632a',
  terraSoft: '#e09a6a',
  ink: '#1c2418',
  inkSoft: '#3d4a36',
  borderLight: '#dccfb6',
};

const display = { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 as const, letterSpacing: '-0.04em', lineHeight: 0.95 };
const editorial = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' as const, fontWeight: 400 as const };
const monoStyle = { fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em', textTransform: 'uppercase' as const };

const RECEITAS = [
  {
    slug: 'sobremesa-substitui-rivotril',
    titulo: 'A Sobremesa que Substitui o Rivotril',
    pretitulo: 'Sono · Cortisol · Ansiedade',
    resumo: 'Quatro ativos com ensaio clínico. Glicina (3 g), Passiflora, camomila e chia hidratada. Comer 30 a 60 minutos antes de dormir, por 7 a 14 dias.',
    img: imgSobremesa,
    tempo: '15 min de preparo',
    porcoes: '4 porções',
    estudos: '8 estudos primários',
    disponivel: true,
    alt: 'Quatro potinhos de gelatina de maracujá com camada de chia hidratada decorados com flores de camomila e folhas de melissa sobre toalha de linho cor creme',
  },
];

const PILARES = [
  { icon: Apple, titulo: 'Comida com função clínica', desc: 'Cada prato é montado para entregar uma dose bioativa específica, validada em literatura científica indexada. Não é dieta, é bioquímica aplicada na cozinha.' },
  { icon: Leaf, titulo: 'Ativos da terra, não da farmácia', desc: 'Camomila, Passiflora, gengibre, chia, gelatina, mel cru. Substituem prescrições leves quando o problema é hábito ruim, e não doença instalada.' },
  { icon: BookOpen, titulo: 'Cada receita é um dossiê', desc: 'Mecanismo, dose estudada, estudo-âncora, contraindicação. Sem modismo, sem influencer, sem e-book pago. PubMed e cozinha.' },
];

const FAQ = [
  { q: 'O que é Cozinha Funcional dentro da Soberania Orgânica?',
    a: 'É a 7ª frente. Onde as outras seis tratam de solo, água, plantas, abrigo, autonomia mental e fitoterapia, esta cuida especificamente de receitas com base científica que substituem soluções leves da indústria farmacêutica e da indústria alimentar ultraprocessada.' },
  { q: 'Substitui medicamento prescrito?',
    a: 'Não. Nenhuma receita aqui substitui prescrição médica em vigor, diagnóstico clínico ou acompanhamento profissional. O foco é apoiar pessoas saudáveis a recuperar sono, saciedade, digestão e energia através de comida bem montada — antes que o problema vire receita azul.' },
  { q: 'Por que comida pode ter função clínica?',
    a: 'Porque alimentos contêm moléculas bioativas: glicina na gelatina age no SCN cerebral, flavonoides do maracujá modulam GABA-A, apigenina da camomila tem afinidade ansiolítica, fibra solúvel da chia modula glicemia. Quando você junta dose, horário e contexto certos, o efeito é mensurável e replicável.' },
  { q: 'Posso seguir mesmo morando em apartamento sem horta?',
    a: 'Sim. Todos os ingredientes desta coleção são compráveis em mercado, feira ou empório. A horta é a 3ª frente da Soberania Orgânica e é um avanço posterior. Aqui você começa pela cozinha, com o que já está no carrinho.' },
  { q: 'Em quanto tempo se sente diferença?',
    a: 'A maioria dos protocolos pede de 7 a 14 dias de uso consistente para mostrar efeito mensurável. Resultado de uma noite ou um dia isolado é variável demais. O ganho real está na repetição e na higiene de hábito que vem junto.' },
  { q: 'Quem não deve seguir estas receitas?',
    a: 'Gestantes, lactantes, pessoas em uso de medicação psiquiátrica ou cardiovascular contínua, alérgicos conhecidos a Asteraceae (camomila, margarida) e quem tem doença crônica diagnosticada devem conversar com seu médico antes. As receitas são educativas, não tratamento.' },
];

const TRILHA = [
  { to: '/soberania-organica', titulo: 'Soberania Orgânica', desc: 'O hub das sete frentes. Volte para o mapa completo da blindagem biológica.', label: 'Voltar ao hub' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos que sustentam toda comida funcional: sono, glicemia, cortisol, microbiota.', label: 'Continuar' },
  { to: '/soberania-organica/horta-urbana', titulo: 'Horta Urbana', desc: 'Cultive em casa os ingredientes que aparecem em cada receita: ervas, microverdes, chás vivos.', label: 'Avançar' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHubHero} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110" style={{ filter: 'saturate(1.05) contrast(1.02)' }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(61,74,54,0.45) 0%, rgba(61,74,54,0.25) 35%, rgba(250,246,240,0.05) 70%, ${C.cream} 100%)`,
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <ChefHat size={16} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            7ª frente · Soberania Orgânica
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream }}>
          Coma o que{' '}
          <span style={{ ...editorial, color: C.terraSoft, fontWeight: 400, textShadow: '0 0 40px rgba(224,154,106,0.5), 0 0 80px rgba(224,154,106,0.25)' }}>
            cura.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.9)', fontFamily: "'Inter Tight', sans-serif" }}>
          Receitas com base científica que devolvem hormônio, sono, saciedade e disposição. O oposto da prateleira da farmácia, montado dentro da sua geladeira.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ReceitasFuncionais() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Cozinha Funcional: Receitas que Substituem a Farmácia | Lord Junnior</title>
        <meta name="description" content="A 7ª frente da Soberania Orgânica: receitas com base científica que substituem ansiolíticos leves, ultraprocessados e dependência da indústria farmacêutica." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional" />
        <meta property="og:title" content="Cozinha Funcional: Coma o que Cura" />
        <meta property="og:description" content="7ª frente da Soberania Orgânica. Receitas com ensaio clínico que substituem soluções leves da indústria farmacêutica." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/cozinha-funcional.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Cozinha Funcional — 7ª frente da Soberania Orgânica',
            description: 'Coleção de receitas com base científica que substituem soluções leves da indústria farmacêutica.',
            url: 'https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional',
            isPartOf: { '@type': 'WebSite', name: 'Lord Junnior', url: 'https://www.lordjunnior.com.br' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.lordjunnior.com.br' },
                { '@type': 'ListItem', position: 2, name: 'Soberania Orgânica', item: 'https://www.lordjunnior.com.br/soberania-organica' },
                { '@type': 'ListItem', position: 3, name: 'Cozinha Funcional', item: 'https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional' },
              ],
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>
        <ScrollToTop />

        <Hero />

        {/* CAPÍTULO 1 — Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: C.terracotta }} />
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>O ponto de virada</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Não é dieta.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>É bioquímica.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  A indústria do diet vendeu a ideia de que comida saudável é privação. A indústria farmacêutica vendeu a ideia de que sono, ansiedade leve e cansaço são problemas de tarja preta. Aqui invertemos as duas mentiras ao mesmo tempo.
                </p>
                <p>
                  Cada receita desta coleção é um protocolo nutricional. Tem dose, tem horário, tem mecanismo bioquímico documentado. O sabor não é desculpa, é veículo. A geladeira deixa de ser depósito de ultraprocessado e vira a primeira linha de defesa do seu sistema nervoso.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Quem domina a própria cozinha, dispensa metade da farmácia.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — TRÊS PILARES (faixa sage escura, alto contraste) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 02 · Fundamento</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Três pilares,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>uma cozinha.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Toda receita publicada aqui passa pelos três filtros antes de entrar na coleção. Sem um deles, vira modismo.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(250,246,240,0.12)' }}>
              {PILARES.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.06)}
                  className="group relative p-8 md:p-10 transition-all duration-500"
                  style={{ backgroundColor: C.sage }}>
                  <div className="p-3 rounded-xl mb-8 inline-block transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: 'rgba(224,154,106,0.18)', border: '1px solid rgba(224,154,106,0.32)' }}>
                    <p.icon size={22} style={{ color: C.terraSoft }} />
                  </div>
                  <h3 className="text-2xl md:text-[1.7rem] font-black leading-tight mb-4" style={{ color: C.cream }}>
                    {p.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.72)' }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — RECEITAS DISPONÍVEIS */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 flex items-end justify-between flex-wrap gap-8">
              <div className="max-w-3xl">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 03 · Coleção</span>
                <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                  Protocolos{' '}
                  <span style={{ ...editorial, color: C.terracotta }}>disponíveis.</span>
                </h2>
              </div>
              <p className="text-base md:text-lg max-w-md font-light leading-relaxed" style={{ color: C.inkSoft }}>
                {RECEITAS.length} receita{RECEITAS.length !== 1 && 's'} ativa{RECEITAS.length !== 1 && 's'}. Cada novo protocolo só entra depois de passar pelos três pilares.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {RECEITAS.map((r, i) => (
                <motion.article key={r.slug} {...fade(i * 0.1)} className="lg:col-span-8">
                  <Link to={`/soberania-organica/cozinha-funcional/${r.slug}`}
                    className="group block h-full rounded-3xl overflow-hidden transition-all duration-700"
                    style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                    <div className="relative h-[360px] md:h-[480px] overflow-hidden">
                      <img src={r.img} alt={r.alt} loading="lazy" width={1920} height={1080}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <span className="px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                          style={{ ...monoStyle, backgroundColor: 'rgba(250,246,240,0.85)', color: C.sage }}>
                          {r.pretitulo}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12">
                      <h3 className="text-3xl md:text-5xl mb-6 leading-[1.05]" style={{ ...display, color: C.sage }}>
                        {r.titulo}
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed font-light mb-8" style={{ color: C.inkSoft }}>
                        {r.resumo}
                      </p>
                      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 pb-8 border-b" style={{ borderColor: C.borderLight }}>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <Clock size={14} style={{ color: C.terracotta }} /> {r.tempo}
                        </span>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <Users size={14} style={{ color: C.terracotta }} /> {r.porcoes}
                        </span>
                        <span className="flex items-center gap-2 text-sm" style={{ color: C.inkSoft }}>
                          <BookOpen size={14} style={{ color: C.terracotta }} /> {r.estudos}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-3 text-sm font-bold transition-all group-hover:gap-5"
                        style={{ ...monoStyle, color: C.terracotta }}>
                        Abrir protocolo <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}

              {/* Slot reservado */}
              <motion.div {...fade(0.2)} className="lg:col-span-4">
                <div className="h-full min-h-[400px] rounded-3xl flex flex-col items-center justify-center p-10 text-center"
                  style={{ backgroundColor: C.sandDeep, border: `2px dashed ${C.borderLight}` }}>
                  <FlaskConical size={36} className="mb-6" style={{ color: C.terracotta }} />
                  <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terracotta }}>Em desenvolvimento</p>
                  <p className="text-base leading-relaxed max-w-xs" style={{ ...editorial, color: C.inkSoft }}>
                    Próximo protocolo em validação. A coleção cresce devagar para entregar profundo.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — CHECKLIST */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 04 · Operação</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Antes de abrir a primeira receita,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>monte sua cozinha.</span>
              </h2>
            </motion.div>

            <ol className="space-y-4">
              {[
                'Limpe a geladeira: descarte ou doe ultraprocessados, refrigerante, embutidos com nitrito e doces de pacote.',
                'Estoque base: gelatina sem sabor, chia, mel cru, gengibre fresco, limão, sal de boa procedência, leite vegetal sem açúcar.',
                'Compre ervas vivas ou em sachê de boa origem: camomila, melissa, hortelã, cidreira. Evite chá em pó industrial.',
                'Tenha 4 a 6 potes de vidro pequenos com tampa para porcionar receitas de geladeira da semana inteira.',
                'Defina dois dias fixos de preparo: domingo e quarta. Receita funcional só funciona com repetição, não com inspiração.',
                'Anote sono, disposição e desejo por doce noturno por 14 dias antes e depois de iniciar qualquer protocolo.',
              ].map((item, i) => (
                <motion.li key={i} {...fade(i * 0.04)}
                  className="flex items-start gap-6 p-6 md:p-7 rounded-2xl transition-all duration-500 hover:translate-x-2"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-black"
                    style={{ backgroundColor: C.terracotta, color: C.cream }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed font-light pt-1.5" style={{ color: C.inkSoft }}>{item}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Perguntas honestas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O que perguntam{' '}
                <span style={{ ...editorial, color: C.terracotta }}>antes de começar.</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff8ef' : C.sand, border: `1px solid ${open ? C.terracotta : C.borderLight}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: C.sage }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: C.terracotta, transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTINUE SUA TRILHA */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <Compass size={32} style={{ color: C.terracotta }} className="mb-6" />
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                A cozinha é uma camada.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>Existem outras seis.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TRILHA.map((t, i) => (
                <motion.div key={t.to} {...fade(i * 0.08)}>
                  <Link to={t.to} className="group block h-full p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                    <Salad size={24} style={{ color: C.terracotta }} className="mb-6" />
                    <h3 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ ...display, color: C.sage }}>
                      {t.titulo}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light mb-8" style={{ color: C.inkSoft }}>
                      {t.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4"
                      style={{ ...monoStyle, color: C.terracotta }}>
                      {t.label} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER + CTA */}
        <section className="relative py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em literatura científica indexada. Não substitui diagnóstico, prescrição ou acompanhamento médico. Distúrbios persistentes do sono, ansiedade clínica e uso de medicação contínua exigem avaliação profissional. Não interrompa nem altere prescrição médica por conta própria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
