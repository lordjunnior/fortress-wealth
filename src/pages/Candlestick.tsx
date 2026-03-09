import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, CandlestickChart, TrendingUp, TrendingDown, Eye, Brain, AlertTriangle, ChevronDown, Target, BarChart3 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(s = 15) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const h = useCallback((e: MouseEvent) => { mx.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * s); my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * s); }, [mx, my, s]);
  useEffect(() => { window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, [h]);
  return { sx, sy };
}

const ANATOMIA = [
  { parte: 'Corpo (Body)', desc: 'A parte mais larga da vela. Representa a diferença entre o preço de abertura e o preço de fechamento. Se o fechamento é ACIMA da abertura, o corpo é verde/branco (alta). Se é ABAIXO, o corpo é vermelho/preto (queda).', cor: '#d4af37' },
  { parte: 'Sombra Superior (Upper Wick)', desc: 'A linha fina acima do corpo. Indica o preço MÁXIMO que o ativo atingiu naquele período. Uma sombra longa significa que os compradores empurraram o preço para cima, mas os vendedores forçaram de volta.', cor: '#34d399' },
  { parte: 'Sombra Inferior (Lower Wick)', desc: 'A linha fina abaixo do corpo. Indica o preço MÍNIMO atingido. Uma sombra inferior longa indica que vendedores derrubaram o preço, mas compradores reagiram com força.', cor: '#38bdf8' },
  { parte: 'Timeframe (Período)', desc: 'Cada vela representa um período: 1 minuto, 1 hora, 4 horas, 1 dia, 1 semana. Timeframes maiores mostram tendências macro; menores mostram ruído e volatilidade de curto prazo. Para Bitcoin, o gráfico semanal é o mais revelador.', cor: '#c084fc' },
];

const PADROES = [
  { nome: 'Doji', tipo: 'Indecisão', desc: 'Corpo minúsculo ou inexistente. Abertura ≈ Fechamento. Sinaliza equilíbrio entre compradores e vendedores. Após uma tendência forte, pode indicar reversão.', sinal: 'neutro' },
  { nome: 'Martelo (Hammer)', tipo: 'Reversão de Alta', desc: 'Corpo pequeno no topo, sombra inferior longa (2-3x o corpo). Aparece após uma queda e sinaliza que compradores absorveram a pressão vendedora. Confirmação vem na vela seguinte.', sinal: 'alta' },
  { nome: 'Estrela Cadente (Shooting Star)', tipo: 'Reversão de Baixa', desc: 'Oposto do martelo: corpo no fundo, sombra superior longa. Aparece após uma alta e sinaliza que vendedores rejeitaram preços elevados. O mercado tentou subir e foi empurrado de volta.', sinal: 'baixa' },
  { nome: 'Engolfo de Alta (Bullish Engulfing)', tipo: 'Reversão de Alta', desc: 'Uma vela verde grande "engole" completamente o corpo da vela vermelha anterior. Quanto maior a vela engolfante, mais forte o sinal. Volume alto confirma a reversão.', sinal: 'alta' },
  { nome: 'Engolfo de Baixa (Bearish Engulfing)', tipo: 'Reversão de Baixa', desc: 'Uma vela vermelha grande engole a vela verde anterior. Sinaliza que vendedores assumiram o controle. Se aparece em uma resistência conhecida, a probabilidade de queda aumenta significativamente.', sinal: 'baixa' },
  { nome: 'Três Soldados Brancos', tipo: 'Continuação de Alta', desc: 'Três velas verdes consecutivas com corpos crescentes. Cada vela abre dentro do corpo da anterior e fecha em nova máxima. Indica que os compradores estão dominando consistentemente.', sinal: 'alta' },
  { nome: 'Três Corvos Negros', tipo: 'Continuação de Baixa', desc: 'Três velas vermelhas consecutivas com corpos crescentes. Cada abertura dentro do corpo anterior e fechamento em nova mínima. Sinal de capitulação vendedora em progresso.', sinal: 'baixa' },
  { nome: 'Estrela da Manhã (Morning Star)', tipo: 'Reversão de Alta', desc: 'Padrão de três velas: grande vermelha → pequena (doji/spinning top) com gap → grande verde. A vela do meio mostra exaustão dos vendedores. A terceira vela confirma que compradores retomaram o controle.', sinal: 'alta' },
];

const ERROS = [
  { erro: 'Operar um único padrão isoladamente', fix: 'Sempre confirme com volume, suporte/resistência e o timeframe superior. Um martelo em área de resistência é irrelevante.' },
  { erro: 'Ignorar o contexto da tendência', fix: 'Padrões de reversão só funcionam CONTRA uma tendência estabelecida. Um martelo no meio de um range lateral não significa nada.' },
  { erro: 'Over-trading em timeframes curtos', fix: 'Gráficos de 1 minuto e 5 minutos são dominados por ruído. Para Bitcoin, o mínimo recomendado é 4 horas; o ideal é diário e semanal.' },
  { erro: 'Não definir stop-loss antes de entrar', fix: 'Candlestick mostra probabilidade, não certeza. Sem gestão de risco, até o melhor padrão pode destruir seu capital.' },
];

export default function Candlestick() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Candlestick — Leitura de Gráficos para Bitcoin | Arsenal Técnico</title>
        <meta name="description" content="Domine a leitura de candlestick: anatomia das velas, padrões de reversão e continuação, erros fatais e aplicação prática no Bitcoin." />
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #34d399, #10b981)' }} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/heroes/candlestick.webp')`, filter: 'brightness(0.30) saturate(0.7)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.55) 40%, rgba(5,8,8,0.92) 75%, rgba(5,8,8,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
        </motion.div>

        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/educacao" className="text-stone-600 hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowLeft size={12} /> Arsenal Técnico</Link>
          <span className="text-stone-700">/</span>
          <span className="text-emerald-400">Candlestick</span>
        </nav>

        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl" whileHover={{ scale: 1.1, rotate: 5 }}>
                <CandlestickChart className="text-emerald-400" size={24} />
              </motion.div>
              <span className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">Análise Técnica Fundamental</span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}>
              CANDLE
            </motion.span>
            <motion.span className="block text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-emerald-400" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}>
              STICK
            </motion.span>
          </h1>

          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              A <span className="font-bold text-emerald-400">linguagem visual do mercado</span>. Cada vela conta uma história de batalha entre compradores e vendedores — em qualquer ativo, em qualquer timeframe.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Inventado no <span className="text-stone-300 font-semibold">Japão do século XVIII</span> por comerciantes de arroz. Mais de 300 anos depois, continua sendo a ferramenta mais eficaz para ler a psicologia do mercado.
            </p>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-1 text-center">Explorar</span>
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ ANATOMIA DA VELA ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Fundamentos</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Anatomia de uma <span className="text-emerald-400">vela</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANATOMIA.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${a.cor}08, transparent 60%)` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${a.cor}12, transparent 60%)` }} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block" style={{ color: a.cor }}>0{i + 1}</span>
                <h3 className="text-lg font-bold text-white mb-3">{a.parte}</h3>
                <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PADRÕES ══ */}
      <section className="relative z-10 py-20 md:py-32 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Arsenal de Padrões</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8 padrões que <span className="text-emerald-400">você precisa dominar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PADROES.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.1}
                className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 transition-all duration-500 hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${p.sinal === 'alta' ? 'rgba(52,211,153,0.04)' : p.sinal === 'baixa' ? 'rgba(239,68,68,0.04)' : 'rgba(212,175,55,0.04)'}, transparent 60%)` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{p.nome}</h3>
                  <span className={`text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-md border ${
                    p.sinal === 'alta' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                    p.sinal === 'baixa' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                    'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                  }`}>
                    {p.sinal === 'alta' ? <TrendingUp size={10} className="inline mr-1" /> : p.sinal === 'baixa' ? <TrendingDown size={10} className="inline mr-1" /> : null}
                    {p.tipo}
                  </span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ERROS FATAIS ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <AlertTriangle className="text-red-500/40 mb-4" size={28} />
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Erros Fatais</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que <span className="text-red-400">destrói</span> traders iniciantes
            </h2>
          </motion.div>

          <div className="space-y-6">
            {ERROS.map((e, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="rounded-2xl border border-red-500/10 hover:border-red-500/20 p-6 md:p-8 transition-all duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.03), transparent 60%)' }}
              >
                <p className="text-red-400 font-bold text-sm mb-2">❌ {e.erro}</p>
                <p className="text-stone-500 text-sm leading-relaxed">
                  <span className="text-emerald-400 font-bold">✓ Correção: </span>{e.fix}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Eye className="mx-auto text-emerald-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Leia o mercado. Não <span className="text-emerald-400">siga o rebanho.</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Candlestick não prevê o futuro — revela a psicologia do presente. Combine com gestão de risco e timeframes adequados. A disciplina separa o operador do apostador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/volatilidade" className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4">
                Volatilidade do Bitcoin <ArrowRight size={16} />
              </Link>
              <Link to="/supply-shock" className="inline-flex items-center gap-3 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Supply Shock <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">As velas não mentem. As emoções sim.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
