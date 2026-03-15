import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone, Bell, Eye, Lock, Clock, Wifi, Shield, BellOff, Timer, Monitor } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const MECANISMOS = [
  { icon: Bell, titulo: 'Ciclos de Dopamina por Design', desc: 'Cada notificação, cada "like", cada scroll infinito foi projetado por equipes de psicólogos comportamentais para criar loops de recompensa variável — o mesmo mecanismo usado em caça-níqueis. Nir Eyal documentou isso no livro "Hooked": Trigger → Action → Variable Reward → Investment. O objetivo declarado é criar hábito, não oferecer valor.', dado: 'O usuário médio verifica o celular 150 vezes por dia — a maioria sem motivo consciente.' },
  { icon: Eye, titulo: 'Economia da Atenção', desc: 'Sua atenção é o produto sendo vendido. Cada segundo que você passa em uma plataforma é monetizado através de publicidade direcionada. O modelo de negócio não é oferecer informação útil — é maximizar "time on screen". Conteúdo que gera indignação ou ansiedade mantém usuários engajados por mais tempo que conteúdo neutro ou positivo.', dado: 'O mercado global de publicidade digital ultrapassou US$ 700 bilhões em 2024.' },
  { icon: Lock, titulo: 'Coleta Massiva de Dados', desc: 'Cada toque, pausa, scroll e hesitação é registrado. Plataformas constroem "sombras digitais" com mais de 5.000 pontos de dados por usuário, incluindo localização, contatos, hábitos de compra, ciclo de sono e até padrões de digitação. Essas informações alimentam algoritmos de predição comportamental.', dado: 'O Facebook/Meta coleta dados mesmo de pessoas que nunca criaram uma conta na plataforma.' },
  { icon: Clock, titulo: 'Obsolescência Programada', desc: 'Dispositivos são deliberadamente projetados para se tornarem obsoletos em 2-3 anos através de atualizações de software que degradam performance, baterias não substituíveis e ecossistemas fechados que forçam upgrades. O objetivo é garantir ciclos de consumo perpétuos.', dado: 'A Apple pagou US$ 113 milhões em acordo judicial por degradar intencionalmente iPhones antigos via atualizações.' },
  { icon: Wifi, titulo: 'Aprisionamento de Ecossistema', desc: 'Serviços digitais criam dependência cruzada: seu e-mail, fotos, documentos, contatos e pagamentos ficam presos em um único ecossistema. O custo de saída (switching cost) torna-se tão alto que o usuário permanece mesmo insatisfeito. Esta é uma forma de dependência arquitetada, não escolhida.', dado: 'Google processa mais de 8.5 bilhões de buscas por dia — e é a porta de entrada para a maioria da informação consumida globalmente.' },
];

const PROTOCOLO = [
  { icon: BellOff, titulo: 'Auditoria de Notificações', desc: 'Desative todas as notificações que não são de pessoas reais. Apps, promoções e sugestões algorítmicas devem ser silenciadas. Cada notificação é uma interrupção projetada para sequestrar atenção.' },
  { icon: Timer, titulo: 'Blocos de Tempo Offline', desc: 'Reserve 2 horas diárias completamente offline. Sem celular, sem e-mail, sem redes. Use esse tempo para leitura, trabalho profundo ou convívio presencial. Comece com 30 minutos e aumente progressivamente.' },
  { icon: Monitor, titulo: 'Ferramentas Conscientes', desc: 'Substitua serviços que monetizam dados por alternativas que respeitam privacidade: Signal (mensagens), Brave (navegador), ProtonMail (e-mail), DuckDuckGo (busca). Cada substituição reduz um vetor de vigilância.' },
  { icon: Lock, titulo: 'Descentralize seus dados', desc: 'Não mantenha tudo em um único ecossistema. Distribua fotos, documentos, contatos e backups entre serviços diferentes. Se um for comprometido ou desativado, você não perde tudo.' },
];

const FAQ_ITEMS = [
  { q: 'Redes sociais são realmente viciantes?', a: 'Sim. Ex-funcionários do Facebook, Google e Apple confirmaram publicamente que recursos como scroll infinito, pull-to-refresh e notificações push foram deliberadamente projetados para criar hábitos compulsivos. Tristan Harris (ex-Google) fundou o Center for Humane Technology especificamente para alertar sobre design persuasivo em plataformas digitais.' },
  { q: 'Preciso abandonar toda tecnologia?', a: 'Não. O objetivo é autonomia tecnológica, não rejeição total. Use tecnologia como ferramenta, não como ambiente. A diferença está em quem controla quem: se você decide quando e como usar, é ferramenta; se o app decide por você através de notificações e algoritmos, é dependência.' },
  { q: 'VPN e navegação privada protegem minha privacidade?', a: 'Parcialmente. VPNs protegem contra monitoramento de rede mas não contra rastreamento de plataformas. Navegação privada não salva histórico local mas o provedor ainda vê tudo. Privacidade real exige uma abordagem em camadas: navegador (Brave/Tor), buscador (DuckDuckGo), DNS (Cloudflare 1.1.1.1), VPN e compartimentalização de identidades digitais.' },
];

export default function DependenciaTecnologica() {
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

  const claimReviewSchema = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    "url": "https://lordjunnior.com.br/projeto-autonomo/toxicos-ocultos/dependencia-tecnologica",
    "claimReviewed": "Redes sociais e aplicativos são projetados apenas para oferecer valor ao usuário, sem mecanismos de dependência",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 1,
      "bestRating": 5,
      "worstRating": 1,
      "alternateName": "Falso"
    },
    "itemReviewed": {
      "@type": "CreativeWork",
      "author": { "@type": "Organization", "name": "Big Tech" }
    }
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-cyan-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Dependência Tecnológica — Design Comportamental e Autonomia Digital | Lord Junnior</title>
        <meta name="description" content="Design comportamental, ciclos de dopamina digital, coleta de dados e obsolescência programada. Recupere controle sobre seu tempo e decisões." />
        <meta property="og:title" content="Dependência Tecnológica — Recupere o controle do seu tempo" />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/dependencia-tecnologica.webp" />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/toxicos-ocultos/dependencia-tecnologica" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(claimReviewSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)' }} />
      <CinematicHero
        image="/heroes/dependencia-tecnologica.webp"
        phase="Vetor 03 · Comportamento"
        title="Dependência Tecnológica"
        subtitle="Ferramentas digitais construídas para capturar atenção e moldar decisões. Ciclos de dopamina, coleta de dados e obsolescência programada."
        icon={Smartphone}
        accentColor="cyan"
        backLink="/projeto-autonomo/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Chapter 1: Mecanismos */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MECANISMOS DE <span className="text-cyan-400">CAPTURA</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Cinco sistemas projetados para transformar tempo e atenção humana em receita corporativa.
              Nenhum deles é acidental — todos foram deliberadamente engenheirados.
            </p>
          </motion.div>

          <div className="space-y-4">
            {MECANISMOS.map((mec, i) => (
              <motion.div key={mec.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-cyan-500 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">
                      <mec.icon size={20} className="text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-bold text-stone-200 mb-3">{mec.titulo}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{mec.desc}</p>
                    <div className="border-l-2 border-cyan-500/30 pl-4">
                      <p className="text-cyan-400/70 text-xs italic">{mec.dado}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* Chapter 2: Protocolo */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PROTOCOLO DE <span className="text-cyan-400">AUTONOMIA DIGITAL</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROTOCOLO.map((item, i) => (
              <motion.div key={item.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/15">
                    <item.icon size={18} className="text-cyan-400" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{item.titulo}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-cyan-400">FREQUENTES</span>
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
            <Link to="/projeto-autonomo/toxicos-ocultos/toxinas-ambientais"
              className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-green-400 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              Toxinas Ambientais <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem controla suas notificações, controla seus pensamentos.</p>
      </div>
    </div>
  );
}
