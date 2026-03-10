import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Eye, Radio, Filter, MessageSquare, Shield, AlertTriangle, BookOpen, Search } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const TECNICAS = [
  { icon: Radio, titulo: 'Enquadramento Narrativo (Framing)', desc: 'A mesma informação é percebida de forma completamente diferente dependendo de como é apresentada. "95% de chance de sobreviver" soa melhor que "5% de chance de morrer", embora sejam idênticas. Governos e mídia selecionam cuidadosamente qual enquadramento usar para direcionar opinião pública.', exemplo: '"Medida de proteção ao consumidor" vs "Controle estatal sobre transações financeiras" — mesma lei, percepções opostas.' },
  { icon: MessageSquare, titulo: 'Novilíngua e Manipulação Semântica', desc: 'Redefinir palavras é redefinir pensamento. Quando "vigilância" vira "proteção" e "censura" vira "moderação de conteúdo", o público perde a capacidade de nomear o que acontece. George Orwell documentou esse mecanismo em 1984; hoje ele opera em escala algorítmica.', exemplo: '"Desinformação" — termo que transfere ao Estado o poder de definir o que é verdade e o que não é.' },
  { icon: Filter, titulo: 'Filtro Algorítmico (Bolha)', desc: 'Plataformas digitais criam câmaras de eco personalizadas. Você não vê "a internet" — vê uma versão curada para maximizar seu tempo de tela. O algoritmo reforça suas crenças existentes e esconde informações desconfortáveis, eliminando pensamento crítico por atrito zero.', exemplo: 'Dois usuários pesquisando a mesma palavra recebem resultados radicalmente diferentes baseados em histórico de navegação.' },
  { icon: Eye, titulo: 'Engenharia de Consentimento', desc: 'Conceito criado por Edward Bernays (sobrinho de Freud): fabricar opinião pública através de técnicas psicológicas aplicadas em massa. Propaganda moderna não precisa mentir — basta selecionar quais verdades mostrar e em qual sequência, criando uma narrativa que parece orgânica mas é projetada.', exemplo: 'Pesquisas de opinião publicadas antes de eleições que influenciam a intenção de voto pelo efeito manada.' },
  { icon: AlertTriangle, titulo: 'Apelo ao Medo e Urgência', desc: 'Medo desliga pensamento analítico e ativa reação emocional. Quando uma população está assustada, aceita medidas que rejeitaria em condições normais. Crises reais são amplificadas e crises artificiais são fabricadas para justificar expansão de controle.', exemplo: '"Se não aprovarmos esta lei AGORA, milhões estarão em risco" — pressão temporal elimina debate público.' },
  { icon: Search, titulo: 'Astroturfing e Falso Consenso', desc: 'Criação de movimentos populares artificiais usando perfis falsos, bots e influenciadores pagos. O objetivo é fabricar a impressão de que "todo mundo pensa assim", ativando o instinto de conformidade social. Redes sociais amplificam isso exponencialmente.', exemplo: 'Hashtags que parecem orgânicas mas são coordenadas por agências de comunicação com centenas de contas automatizadas.' },
];

const HIGIENE_INFO = [
  { titulo: 'Diversifique fontes deliberadamente', desc: 'Leia fontes que discordam entre si. Se toda sua informação vem do mesmo espectro, você está dentro de uma bolha, não de uma análise.' },
  { titulo: 'Aplique a regra "Cui Bono?"', desc: 'Diante de qualquer narrativa, pergunte: quem se beneficia se eu acreditar nisso? Essa pergunta simples desarma a maioria das manipulações.' },
  { titulo: 'Separe fato de interpretação', desc: 'Notícias misturam dados concretos com opiniões editoriais sem sinalizar. Treine-se a identificar onde o fato termina e a interpretação começa.' },
  { titulo: 'Reduza a dieta informacional', desc: 'Assim como ultraprocessados alimentares, existe informação ultraprocessada. Notificações constantes, feed infinito e breaking news criam ansiedade, não conhecimento.' },
];

const FAQ_ITEMS = [
  { q: 'Propaganda é a mesma coisa que publicidade?', a: 'Não. Publicidade vende produtos; propaganda vende ideias, valores e visões de mundo. A propaganda política utiliza técnicas psicológicas para moldar percepções coletivas sobre realidade, moral e estrutura social. Edward Bernays, considerado o pai das relações públicas, explicitamente documentou como técnicas de propaganda podem ser usadas para "engenheirar o consentimento" de populações inteiras.' },
  { q: 'Algoritmos realmente influenciam opinião?', a: 'Sim, e isso é documentado. O estudo de Epstein & Robertson (2015) demonstrou que a ordem dos resultados de busca pode alterar a preferência de eleitores indecisos em até 20%. Plataformas como YouTube, TikTok e Instagram utilizam sistemas de recomendação que priorizam engajamento emocional, não precisão factual — criando câmaras de eco que radicalizam posições ao longo do tempo.' },
  { q: 'Como diferenciar informação de manipulação?', a: 'Informação honesta apresenta dados, cita fontes verificáveis e admite limitações. Manipulação apela para emoção, cria urgência artificial, usa linguagem carregada e nunca admite incerteza. A presença de uma "solução" imediata e radical para um "problema" recém-apresentado é um sinal clássico de manipulação.' },
];

export default function ManipulacaoInformacional() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question", "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-violet-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Manipulação Informacional — Propaganda, Novilíngua e Filtros Algorítmicos | Lord Junnior</title>
        <meta name="description" content="Identifique técnicas de propaganda moderna, enquadramento narrativo, manipulação semântica e filtros algorítmicos. Higiene informacional para autonomia mental." />
        <meta property="og:title" content="Manipulação Informacional — O que molda suas crenças sem você perceber" />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/manipulacao-informacional.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/toxicos-ocultos/manipulacao-informacional" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #a855f7, #6366f1)' }} />

      <Link to="/projeto-autonomo/toxicos-ocultos"
        className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground transition-colors text-xs"
      >
        <ArrowLeft size={14} /> Tóxicos Ocultos
      </Link>

      <CinematicHero
        title="MANIPULAÇÃO"
        titleAccent="INFORMACIONAL"
        subtitle="Vetor 02 — Mente"
        description="Da propaganda estatal ao filtro algorítmico, existem camadas de manipulação projetadas para moldar percepções e crenças. Treine o olhar crítico para identificar padrões de influência invisível que operam sobre bilhões de mentes diariamente."
        imageSrc="/heroes/manipulacao-informacional.webp"
        accentColor="#a855f7"
      />

      {/* Chapter 1: Arsenal de Técnicas */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ARSENAL DE <span className="text-violet-400">MANIPULAÇÃO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Seis técnicas documentadas que operam em escala industrial. Cada uma explora uma vulnerabilidade psicológica diferente.
              Reconhecê-las é o primeiro passo para neutralizá-las.
            </p>
          </motion.div>

          <div className="space-y-4">
            {TECNICAS.map((tec, i) => (
              <motion.div key={tec.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-violet-500 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                      <tec.icon size={20} className="text-violet-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-stone-200 mb-3">{tec.titulo}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{tec.desc}</p>
                    <div className="border-l-2 border-violet-500/30 pl-4">
                      <p className="text-violet-400/70 text-xs italic">{tec.exemplo}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      {/* Chapter 2: Higiene Informacional */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              HIGIENE <span className="text-violet-400">INFORMACIONAL</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HIGIENE_INFO.map((item, i) => (
              <motion.div key={item.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-black text-stone-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                  <Shield size={16} className="text-violet-400/60" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{item.titulo}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-violet-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={item.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <h4 className="text-sm font-bold text-stone-200 mb-3">{item.q}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-6">Próximo vetor</p>
            <Link to="/projeto-autonomo/toxicos-ocultos/dependencia-tecnologica"
              className="inline-flex items-center gap-3 bg-cyan-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              Dependência Tecnológica <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem controla a narrativa, controla o comportamento.</p>
      </div>
    </div>
  );
}
