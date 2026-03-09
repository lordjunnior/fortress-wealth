import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, PieChart, AlertTriangle, TrendingDown, ShieldCheck, Flame, ChevronDown, Scale, Target, Skull, Crown, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diversificacaoImg from '@/assets/diversificacao-falacia.jpg';

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

const FALHAS = [
  { icon: TrendingDown, title: 'Correlação em Crise', accent: '#f43f5e', desc: 'Em momentos de pânico sistêmico (2008, 2020), TODOS os ativos tradicionais caem juntos. Ações, imóveis, commodities — tudo correlaciona para 1.0. A diversificação que deveria proteger falha exatamente quando você mais precisa dela. O motivo: todos esses ativos estão denominados na mesma moeda fiat e sujeitos às mesmas políticas monetárias.' },
  { icon: Flame, title: 'Inflação Devora Rendimentos', accent: '#f59e0b', desc: 'Com inflação real de 8-15% ao ano no Brasil (não o IPCA maquiado), um portfólio "diversificado" rendendo 12% ao ano está simplesmente empatando — ou perdendo poder de compra. Você diversifica entre 10 ativos diferentes e todos perdem para a impressão de dinheiro. Não é diversificação, é diluição organizada.' },
  { icon: Scale, title: 'Custos Ocultos Multiplicados', accent: '#38bdf8', desc: 'Cada ativo na carteira tem sua própria camada de custos: taxa de administração, performance, custódia, corretagem, imposto sobre ganho de capital. Multiplicar ativos multiplica taxas. Estudos mostram que, após custos, a maioria dos fundos "diversificados" perde para o CDI — e todos perdem para o Bitcoin no longo prazo.' },
  { icon: Skull, title: 'Risco de Contraparte Sistêmico', accent: '#c084fc', desc: 'Ações dependem de empresas que podem falir. Títulos dependem de governos que podem dar calote. Fundos dependem de gestores que podem fraudar. Imóveis dependem de regulação que pode mudar. Cada ativo "diversificado" carrega um risco de contraparte. O Bitcoin, em autocustódia, tem risco de contraparte ZERO — você é o banco, o custodiante e o auditor.' },
];

const COMPARATIVO = [
  { ativo: 'Poupança', retorno10a: '+70%', vsInflacao: '-40%', risco: 'Confisco, congelamento', confiscavel: true },
  { ativo: 'CDI', retorno10a: '+130%', vsInflacao: '-15%', risco: 'Tributação progressiva', confiscavel: true },
  { ativo: 'Ibovespa', retorno10a: '+90%', vsInflacao: '-30%', risco: 'Risco sistêmico, político', confiscavel: true },
  { ativo: 'Imóveis', retorno10a: '+80%', vsInflacao: '-35%', risco: 'Iliquidez, regulação, IPTU', confiscavel: true },
  { ativo: 'Ouro', retorno10a: '+120%', vsInflacao: '-10%', risco: 'Confisco (já aconteceu)', confiscavel: true },
  { ativo: 'Bitcoin', retorno10a: '+26.000%', vsInflacao: '+25.800%', risco: 'Volatilidade de curto prazo', confiscavel: false },
];

const ARGUMENTOS = [
  { contra: '"Não coloque todos os ovos na mesma cesta"', resposta: 'Quando todas as cestas estão no mesmo barco furado (sistema fiat), diversificar entre cestas é inútil. O Bitcoin é outro barco — com motor próprio, sem capitão e sem destino pré-definido por políticos.' },
  { contra: '"Bitcoin é muito volátil para concentrar"', resposta: 'Volatilidade é o preço da assimetria. Um ativo que pode cair 50% mas subir 1.000% não é arriscado — é oportunidade mal compreendida. A volatilidade do Bitcoin diminui a cada ciclo enquanto a adoção cresce exponencialmente.' },
  { contra: '"Profissionais sempre diversificam"', resposta: 'Warren Buffett: "Diversificação é proteção contra a ignorância. Faz pouco sentido se você sabe o que está fazendo." Michael Saylor: "Concentre em Bitcoin. Diversificar em ativos inferiores é diluir sua vantagem."' },
  { contra: '"E se o Bitcoin cair para zero?"', resposta: 'Para o Bitcoin ir a zero, seria necessário desligar a internet global, destruir milhares de nós em dezenas de países e convencer bilhões de pessoas a abandonar o ativo de melhor performance da história. O Real já perdeu 99.7% contra o dólar desde 1994. Qual está mais perto de zero?' },
];

export default function Diversificacao() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>A Falácia da Diversificação — Por Que Bitcoin é a Resposta | Arsenal Técnico</title>
        <meta name="description" content="Por que diversificar em ativos fiat é diluir patrimônio. Dados, comparativos e argumentos técnicos sobre concentração estratégica em Bitcoin." />
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div className="absolute inset-0 z-0" style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 120]) }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/heroes/diversificacao.webp')`, filter: 'brightness(0.35) saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.2) 0%, rgba(5,8,8,0.55) 40%, rgba(5,8,8,0.92) 75%, rgba(5,8,8,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 40%, rgba(5,8,8,0.85) 100%)' }} />
        </motion.div>

        <nav className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] z-20">
          <Link to="/educacao" className="text-stone-600 hover:text-yellow-400 transition-colors flex items-center gap-2"><ArrowLeft size={12} /> Arsenal Técnico</Link>
          <span className="text-stone-700">/</span>
          <span className="text-yellow-400">Diversificação</span>
        </nav>

        <div className="max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div className="p-3.5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl" whileHover={{ scale: 1.1, rotate: 5 }}>
                <PieChart className="text-yellow-400" size={24} />
              </motion.div>
              <span className="text-yellow-500/60 text-[10px] font-bold uppercase tracking-[0.5em]">Análise Estratégica</span>
            </div>
          </motion.div>

          <h1 className="leading-[0.85] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <motion.span className="block text-5xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-white" initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.1 }}>
              A FALÁCIA DA
            </motion.span>
            <motion.span className="block text-5xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter" style={{ color: '#d4af37' }} initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.3 }}>
              DIVERSIFICAÇÃO
            </motion.span>
          </h1>

          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-4">
              Diversificar entre ativos <span className="font-bold text-yellow-400">denominados na mesma moeda podre</span> não é estratégia — é diluição de patrimônio com ilusão de segurança.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              O que Wall Street chama de "portfólio equilibrado", Satoshi chamaria de <span className="text-stone-300 font-semibold">"múltiplas formas de perder para a impressora"</span>.
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

      {/* ══ DISCLAIMER DE SOBERANIA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.03), transparent 70%)' }}
          >
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{ boxShadow: ['inset 0 0 0px rgba(245,158,11,0)', 'inset 0 0 30px rgba(245,158,11,0.05)', 'inset 0 0 0px rgba(245,158,11,0)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-0.5">
                <Shield className="text-amber-400" size={22} />
              </div>
              <div>
                <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-3">⚠ Aviso de Posicionamento</p>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-3">
                  <span className="text-white font-bold">Este conteúdo não constitui recomendação financeira.</span> A tese de concentração em Bitcoin apresentada aqui é <span className="text-amber-400 font-semibold">uma análise estratégica pessoal</span>, baseada em dados históricos e na filosofia de autocustódia que permeia todo este ecossistema.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed mb-3">
                  Este material foi criado <span className="text-stone-200 font-semibold">como ferramenta educacional</span> a pedido recorrente da comunidade. Cada indivíduo deve fazer sua própria pesquisa e tomar decisões com base em sua realidade financeira e tolerância a risco.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed italic">
                  "A convicção vem do estudo profundo, não da opinião alheia." — Faça sua própria análise antes de agir.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM CINEMATOGRÁFICA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={diversificacaoImg} alt="Ativos tradicionais se desintegrando ao redor do Bitcoin" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.7) saturate(0.9)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Quando tudo é denominado na mesma moeda podre, diversificar é ilusão</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ POR QUE FALHA ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Diagnóstico</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              4 razões pelas quais <span className="text-red-400">diversificação falha</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FALHAS.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${f.accent}06, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${f.accent}10, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl border" style={{ background: `${f.accent}10`, borderColor: `${f.accent}25` }}>
                        <Icon size={18} style={{ color: f.accent }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: f.accent }}>0{i + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TABELA COMPARATIVA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Os Números</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              10 anos em <span className="text-yellow-400">perspectiva</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Ativo</th>
                  <th className="text-right py-3 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Retorno 10A</th>
                  <th className="text-right py-3 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">vs Inflação Real</th>
                  <th className="text-left py-3 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Risco Principal</th>
                  <th className="text-center py-3 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Confiscável?</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((c, i) => (
                  <motion.tr key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                    className={`border-b border-white/[0.04] ${c.ativo === 'Bitcoin' ? 'bg-yellow-500/[0.04]' : 'hover:bg-white/[0.02]'} transition-colors`}
                  >
                    <td className={`py-4 px-4 font-bold ${c.ativo === 'Bitcoin' ? 'text-yellow-400' : 'text-white'}`}>{c.ativo}</td>
                    <td className={`py-4 px-4 text-right font-mono font-bold ${c.ativo === 'Bitcoin' ? 'text-emerald-400' : 'text-stone-400'}`}>{c.retorno10a}</td>
                    <td className={`py-4 px-4 text-right font-mono font-bold ${c.vsInflacao.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{c.vsInflacao}</td>
                    <td className="py-4 px-4 text-stone-500 text-xs">{c.risco}</td>
                    <td className="py-4 px-4 text-center">{c.confiscavel ? <span className="text-red-400 font-bold">SIM</span> : <span className="text-emerald-400 font-bold">NÃO*</span>}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-stone-700 text-[10px] mt-4 font-mono">* Em autocustódia. Bitcoins em exchanges são confiscáveis.</p>
        </div>
      </section>

      {/* ══ CONTRA-ARGUMENTOS ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Debate Encerrado</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Respostas que <span className="text-yellow-400">encerram discussões</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {ARGUMENTOS.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="rounded-2xl border border-white/[0.06] hover:border-yellow-500/20 p-6 md:p-8 transition-all duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.03), transparent 60%)' }}
              >
                <p className="text-stone-400 font-mono text-xs italic mb-3">{a.contra}</p>
                <div className="w-8 h-px bg-yellow-500/30 mb-3" />
                <p className="text-stone-400 text-sm leading-relaxed">{a.resposta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Crown className="mx-auto text-yellow-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Concentração não é risco. É <span className="text-yellow-400">convicção.</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Quem entende o Bitcoin não diversifica — acumula. A assimetria de retorno não se repete em nenhum outro ativo da história humana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/21-milhoes" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4">
                21 Milhões — O Limite <ArrowRight size={16} />
              </Link>
              <Link to="/bitcoin-vs-altcoins" className="inline-flex items-center gap-3 border border-yellow-500/30 hover:border-yellow-500/60 text-yellow-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Bitcoin vs Altcoins <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Diversificar em fraqueza é multiplicar a perda.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
