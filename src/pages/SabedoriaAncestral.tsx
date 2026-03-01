import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Sprout, Heart, Sun, Cross, Thermometer, Bug, Shield, Wheat, TreePine, BookOpen, Flame, Layers, Egg, Shovel } from 'lucide-react';
import { motion } from 'framer-motion';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ─── MÓDULOS DE SAÚDE & CORPO ─── */
const MODULOS_SAUDE = [
  {
    icon: Leaf,
    title: 'Suporte Fitoterápico',
    desc: '12 plantas essenciais. Dosagens conservadoras, contraindicações e métodos de preparo documentados.',
    link: '/projeto-autonomo/autonomia-biologica',
    tag: 'Publicado',
  },
  {
    icon: Sprout,
    title: 'Fitoterapia Aplicada',
    desc: 'Protocolos combinados por sistema corporal. Sinergia entre plantas, ciclos de uso e critérios de interrupção.',
    link: '/projeto-autonomo/fitoterapia-aplicada',
    tag: 'Publicado',
  },
  {
    icon: Sun,
    title: 'Saúde Preventiva',
    desc: 'Exposição solar, sono, movimento e alimentação anti-inflamatória como base de fortalecimento.',
    link: '/projeto-autonomo/saude-preventiva',
    tag: 'Publicado',
  },
  {
    icon: Cross,
    title: 'Primeiros Socorros',
    desc: 'Contenção de sangramento, imobilização e queimaduras. Kit funcional para ambiente remoto.',
    link: '/projeto-autonomo/primeiros-socorros',
    tag: 'Publicado',
  },
  {
    icon: Thermometer,
    title: 'Avaliação de Sinais',
    desc: 'Interpretar febre, desidratação e sinais vitais com recursos mínimos e critérios objetivos.',
    link: '/projeto-autonomo/avaliacao-sinais',
    tag: 'Publicado',
  },
  {
    icon: Bug,
    title: 'Controle de Vetores',
    desc: 'Repelentes naturais, eliminação de criadouros, barreiras físicas e plantas repelentes.',
    link: '/projeto-autonomo/controle-vetores',
    tag: 'Publicado',
  },
];

/* ─── MÓDULOS DE ALIMENTAÇÃO ─── */
const MODULOS_ALIMENTACAO = [
  {
    icon: Sprout,
    title: 'Horta Urbana',
    desc: 'Transforme varandas e janelas em fonte de alimento. Vasos autoirrigáveis, cultivo vertical e espécies para iniciantes.',
    link: '/projeto-autonomo/horta-urbana',
    tag: 'Publicado',
  },
  {
    icon: Layers,
    title: 'Produção em Pequenos Espaços',
    desc: '4m² bem planejados produzem alimento. Consórcio de culturas, rotação e microclimas urbanos.',
    link: '/projeto-autonomo/producao-pequenos-espacos',
    tag: 'Em desenvolvimento',
  },
  {
    icon: Flame,
    title: 'Conservação e Armazenamento',
    desc: '10 alimentos essenciais + 18 métodos de conservação validados. Estoque estratégico familiar.',
    link: '/projeto-autonomo/conservacao-armazenamento',
    tag: 'Publicado',
  },
  {
    icon: Egg,
    title: 'Proteína Sustentável',
    desc: 'Galinhas, codornas, peixes e sistemas compactos. Proteína de qualidade em espaços reduzidos.',
    link: '/projeto-autonomo/proteina-sustentavel',
    tag: 'Em desenvolvimento',
  },
  {
    icon: Shovel,
    title: 'Solo e Fertilidade',
    desc: 'Compostagem, bokashi, húmus de minhoca. A base que sustenta tudo que cresce.',
    link: '/projeto-autonomo/solo-fertilidade',
    tag: 'Publicado',
  },
];

export default function SabedoriaAncestral() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a1f16 0%, #1e2518 8%, #222d1c 20%, #263220 35%, #2a3724 50%, #263220 70%, #222d1c 85%, #1a1f16 100%)' }}
    >
      {/* ─── Atmospheric background ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes ancestralGlow {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.05); }
          }
          @keyframes leafDrift {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.04; }
            50% { transform: translateY(-20px) rotate(3deg); opacity: 0.08; }
          }
        `}</style>
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,120,60,0.2) 0%, transparent 70%)', animation: 'ancestralGlow 18s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,140,60,0.12) 0%, transparent 70%)', animation: 'ancestralGlow 22s ease-in-out 4s infinite' }} />
      </div>

      {/* Floating icons */}
      <Leaf className="fixed top-[20%] right-[8%] text-emerald-800/10 pointer-events-none z-0" size={120}
        style={{ animation: 'leafDrift 16s ease-in-out infinite' }} />
      <TreePine className="fixed bottom-[20%] left-[5%] text-emerald-900/8 pointer-events-none z-0" size={140}
        style={{ animation: 'leafDrift 20s ease-in-out 3s infinite' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-16 flex-wrap">
          <Link to="/" className="text-stone-500 hover:text-emerald-400 transition-colors">Início</Link>
          <span className="text-stone-700">/</span>
          <Link to="/projeto-autonomo" className="text-stone-500 hover:text-emerald-400 transition-colors">Projeto Autônomo</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Sabedoria Ancestral</span>
        </nav>

        {/* ═══════════════════════════════════════════════════
            HERO — NARRATIVA DO GUARDIÃO
        ═══════════════════════════════════════════════════ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-24">
          <div className="flex items-start gap-5 mb-8">
            <div className="p-4 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl mt-1">
              <Leaf className="text-emerald-400" size={28} />
            </div>
            <div>
              <p className="text-emerald-500/70 text-[10px] font-bold uppercase tracking-[0.5em] mb-3">Projeto Autônomo · Sabedoria Ancestral</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span className="text-stone-200">O QUE A</span><br />
                <span className="text-emerald-400">TERRA ENSINA</span>
              </h1>
            </div>
          </div>

          {/* ─── A Narrativa ─── */}
          <div className="max-w-3xl space-y-6 mt-12">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Minha família planta, colhe e cria animais há gerações. Meu avô conhecia cada planta do quintal pelo nome e sabia exatamente o que cada uma curava. Minha avó nunca comprou um remédio para dor de estômago — ela ia ao quintal.
            </motion.p>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Isso não era "alternativo". Era o padrão. Durante séculos, famílias inteiras viveram com o que a terra oferecia. Conheciam os ciclos, respeitavam os tempos, entendiam que a saúde começa no solo e no alimento — não na prateleira.
            </motion.p>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Hoje, se você mostrar um pé de <span className="text-emerald-400 font-semibold">poejo</span> para uma criança, ela não sabe o que é. Se colocar uma folha de <span className="text-emerald-400 font-semibold">hortelã</span> na mão de um adolescente, ele não reconhece. Uma simples <span className="text-emerald-400 font-semibold">folha de couve</span> — o alimento mais acessível e nutritivo que existe — virou algo "estranho".
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="border-l-2 border-emerald-500/40 pl-6 py-2">
              <p className="text-emerald-300/90 text-lg md:text-xl font-medium leading-relaxed italic">
                "Não é que esse conhecimento foi proibido. Ele foi substituído. Lentamente. Geração após geração, o que era natural virou 'alternativo'. O que era óbvio virou 'discutível'."
              </p>
            </motion.div>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={5}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Com o passar dos anos, técnicas que alimentaram famílias inteiras foram esquecidas. O conhecimento sobre quais plantas fortalecem o corpo, quais raízes aliviam a dor, como conservar alimento sem eletricidade, como ler o solo — tudo isso está desaparecendo.
            </motion.p>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={6}
              className="text-stone-300 text-lg md:text-xl font-medium leading-relaxed">
              Este espaço existe para preservar esse conhecimento. Não como nostalgia — como <span className="text-emerald-400 font-bold">ferramenta de soberania</span>.
            </motion.p>
          </div>
        </motion.header>

        {/* ═══════════════════════════════════════════════════
            O QUE VOCÊ VAI ENCONTRAR AQUI
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-emerald-950/40 border border-emerald-800/25 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">O que está sendo construído aqui</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <p className="text-stone-200 font-semibold">Catálogo de Plantas Medicinais</p>
                <p className="text-stone-500 leading-relaxed">Fichas técnicas completas com dosagens, contraindicações, mecanismos de ação e métodos de preparo validados.</p>
              </div>
              <div className="space-y-2">
                <p className="text-stone-200 font-semibold">Protocolos de Saúde Natural</p>
                <p className="text-stone-500 leading-relaxed">Estratégias preventivas, fortalecimento imunológico e manutenção da saúde com o que a natureza entrega.</p>
              </div>
              <div className="space-y-2">
                <p className="text-stone-200 font-semibold">Soberania Alimentar</p>
                <p className="text-stone-500 leading-relaxed">Da semente ao prato. Produção, conservação e armazenamento de alimento com autonomia real.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            BLOCO 1 — SAÚDE & FORTALECIMENTO DO CORPO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0} className="mb-28">
          <div className="mb-10">
            <span className="text-emerald-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Eixo 01</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-200 mt-2 leading-tight">
              Saúde & <span className="text-emerald-400">Fortalecimento</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Plantas medicinais, protocolos preventivos e técnicas de avaliação. O corpo como primeira linha de defesa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {MODULOS_SAUDE.map((mod, i) => (
              <motion.div key={mod.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}>
                <Link to={mod.link}
                  className="block bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-6 hover:bg-emerald-950/50 hover:border-emerald-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-emerald-800/30 rounded-xl shrink-0 group-hover:bg-emerald-700/30 transition-colors">
                      <mod.icon className="text-emerald-500" size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-stone-200">{mod.title}</h4>
                        <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          mod.tag === 'Publicado' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                        }`}>{mod.tag}</span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed">{mod.desc}</p>
                    </div>
                    <ArrowRight className="text-emerald-600/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" size={16} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            BLOCO 2 — SOBERANIA ALIMENTAR
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0} className="mb-28">
          <div className="mb-10">
            <span className="text-amber-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Eixo 02</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-200 mt-2 leading-tight">
              Soberania <span className="text-amber-400">Alimentar</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Produzir, conservar e armazenar. Reduzir a dependência estrutural de alimento industrializado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {MODULOS_ALIMENTACAO.map((mod, i) => (
              <motion.div key={mod.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}>
                <Link to={mod.link}
                  className="block bg-amber-950/20 border border-amber-800/20 rounded-xl p-6 hover:bg-amber-950/35 hover:border-amber-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-amber-800/25 rounded-xl shrink-0 group-hover:bg-amber-700/30 transition-colors">
                      <mod.icon className="text-amber-500" size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-stone-200">{mod.title}</h4>
                        <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          mod.tag === 'Publicado' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                        }`}>{mod.tag}</span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed">{mod.desc}</p>
                    </div>
                    <ArrowRight className="text-amber-600/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" size={16} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            BLOCO MANIFESTO — ENCERRAMENTO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-gradient-to-br from-emerald-950/50 to-stone-950/50 border border-emerald-800/20 rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-emerald-400" size={20} />
              <span className="text-emerald-400/70 text-[10px] font-bold uppercase tracking-[0.4em]">Por que isso importa</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
                Quando uma geração perde a capacidade de identificar uma planta, de preparar um alimento sem embalagem, de entender o que o próprio corpo está dizendo — ela se torna dependente.
              </p>
              <p className="text-stone-400 text-base leading-relaxed">
                Dependente de quem vende o remédio. De quem embala o alimento. De quem interpreta os sintomas. De quem define o que é "saudável". Não é teoria. É o que aconteceu.
              </p>
              <p className="text-stone-400 text-base leading-relaxed">
                Aqui não se trata de rejeitar a medicina moderna ou viver isolado. Se trata de <span className="text-emerald-400 font-semibold">não depender exclusivamente de um sistema que pode falhar</span>. De ter autonomia para cuidar do básico. De reconhecer que o conhecimento que sustentou famílias por séculos não é "ultrapassado" — é <span className="text-stone-200 font-bold">fundamento</span>.
              </p>

              <div className="border-l-2 border-emerald-500/30 pl-6 py-3 mt-8">
                <p className="text-emerald-300/80 text-base italic leading-relaxed">
                  "Meu avô dizia: quem conhece a terra, nunca passa fome. Quem conhece as plantas, raramente fica doente. E quem conhece os dois, tem o que nenhum governo pode tirar."
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-emerald-800/20">
              <p className="text-stone-500 text-xs leading-relaxed max-w-2xl">
                Este projeto é uma tentativa de documentar e preservar o que foi passado de geração em geração. O conteúdo é técnico, referenciado e organizado para consulta prática — não para substituir tratamento médico, mas para devolver a autonomia que sempre foi sua.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── CTA CONHECIMENTO PERDIDO ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
          <Link to="/projeto-autonomo/conhecimento-perdido"
            className="block bg-emerald-950/40 border border-emerald-600/25 rounded-2xl p-8 md:p-10 hover:border-emerald-500/40 hover:bg-emerald-950/60 transition-all duration-500 group"
          >
            <div className="flex items-start gap-5">
              <div className="p-3 bg-emerald-600/15 border border-emerald-500/20 rounded-xl shrink-0 group-hover:bg-emerald-600/25 transition-colors">
                <BookOpen className="text-emerald-400" size={22} />
              </div>
              <div className="flex-1">
                <span className="text-emerald-500/60 text-[10px] font-bold tracking-[0.5em] uppercase">Módulo Especial</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-stone-200 mt-1 mb-2 uppercase tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                  CONHECIMENTO PERDIDO
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Fundamentos naturais aplicados à saúde, alimentação e resiliência. 12 plantas organizadas por sistema corporal com fichas técnicas completas, dosagens, contraindicações e educação botânica familiar.
                </p>
              </div>
              <ArrowRight className="text-emerald-600/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-3" size={20} />
            </div>
          </Link>
        </motion.div>

        {/* ─── CTA FINAL ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center">
          <Link to="/projeto-autonomo"
            className="inline-flex items-center gap-2 text-emerald-500/70 hover:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft size={14} /> Voltar ao Projeto Autônomo
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
