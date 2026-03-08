import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldAlert, Lock, Globe, Cpu, Zap, ArrowRight,
  ShieldCheck, AlertTriangle, Crosshair, Skull, Eye, Fingerprint
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import NoiseBackground from '@/components/NoiseBackground';
import AppSidebar from '@/components/AppSidebar';
import MobileNav from '@/components/MobileNav';
import NetworkTicker from '@/components/NetworkTicker';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    to: '/autocustodia',
    icon: Lock,
    label: 'CUSTÓDIA',
    title: 'Arquitetura de Autocustódia',
    hook: 'A posse real das chaves.',
    desc: 'Use chaves privadas para provar propriedade e assinar transações sem intermediários.',
    accent: 'gold',
  },
  {
    to: '/economia-paralela',
    icon: Globe,
    label: 'P2P',
    title: 'Economia Paralela',
    hook: 'Privacidade e P2P.',
    desc: 'O Bitcoin é pseudônimo, não anônimo. Proteja seu rastro através de transações diretas.',
    accent: 'emerald',
  },
  {
    to: '/infraestrutura',
    icon: Cpu,
    label: 'NODO',
    title: 'Rede de Validação',
    hook: 'Rodando seu próprio nó.',
    desc: 'Seja o auditor da rede. Verifique cada transação e garanta o limite de 21 milhões.',
    accent: 'sky',
  },
  {
    to: '/lightning',
    icon: Zap,
    label: 'LIGHTNING',
    title: 'Lightning no Bolso',
    hook: 'Microtransações em Sats.',
    desc: 'Transfira frações de centavo instantaneamente. O Satoshi é a unidade do futuro soberano.',
    accent: 'amber',
  },
];

const accentMap: Record<string, { text: string; bg: string; border: string }> = {
  gold: { text: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  sky: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
};

const defenseItems = [
  {
    icon: Skull,
    title: 'Engenharia Social',
    desc: 'Hackers não quebram o SHA-256, eles quebram sua confiança usando medo e urgência.',
  },
  {
    icon: Eye,
    title: 'A Regra de Ouro',
    desc: 'Ninguém legítimo jamais pedirá suas 12/24 palavras (Seed Phrase). Se pedirem, é roubo.',
  },
  {
    icon: Fingerprint,
    title: 'Higiene Digital',
    desc: 'Use Cold Storage, autenticação 2FA por app e nunca clique em links suspeitos.',
  },
];

export default function Arsenal() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const protocoloRef = useRef(null);
  const protocoloInView = useInView(protocoloRef, { once: true, margin: '-100px' });

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-80px' });

  const defenseRef = useRef(null);
  const defenseInView = useInView(defenseRef, { once: true, margin: '-80px' });

  const autonomoRef = useRef(null);
  const autonomoInView = useInView(autonomoRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen bg-[#050808] text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px]">
        {/* Cinematic Hero */}
        <CinematicHero
          image="/heroes/arsenal-operacional.webp"
          phase="Arsenal Técnico"
          title="Central de Operações"
          subtitle="Domínio técnico e defesa de ativos. A soberania começa quando você detém as ferramentas certas."
          icon={Crosshair}
          accentColor="rose"
          backLink="/"
          backLabel="Voltar ao Comando"
        />

        <div className="px-6 md:px-12 lg:px-20 pb-24">

          {/* ═══════════════════════════════════════════
              CAPÍTULO 1 — PROTOCOLO INICIAL
          ═══════════════════════════════════════════ */}
          <section ref={protocoloRef} className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={protocoloInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              <Link to="/protocolo-inicial" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-destructive/20 bg-white/[0.02] backdrop-blur-sm p-10 md:p-16 transition-all duration-700 hover:border-destructive/50 hover:bg-white/[0.04]">
                  {/* Background icon */}
                  <ShieldAlert
                    size={280}
                    className="absolute -top-8 -right-8 text-destructive/[0.04] group-hover:text-destructive/[0.08] group-hover:scale-110 transition-all duration-1000"
                  />

                  {/* Shimmer line */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-destructive/40 to-transparent group-hover:left-full transition-all duration-[1.5s] ease-in-out" />
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block font-mono text-[10px] tracking-[0.4em] text-destructive/80 bg-destructive/10 border border-destructive/20 px-3 py-1.5 rounded-md mb-6">
                      PONTO DE PARTIDA
                    </span>

                    <h2
                      className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[0.95]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Protocolo{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-red-400">
                        Inicial
                      </span>
                    </h2>

                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                      Neutralize o tédio e a mentira. Aprenda por que o limite de 21 milhões é a lei suprema
                      e como sua semente (seed) é seu único exército.
                    </p>

                    <motion.div
                      whileHover={{ x: 6 }}
                      className="inline-flex items-center gap-3 bg-destructive/90 hover:bg-destructive text-white px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-colors duration-500"
                    >
                      REPROGRAMAR CONSCIÊNCIA
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>

          {/* Section divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50">
              OS QUATRO PILARES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* ═══════════════════════════════════════════
              CAPÍTULO 2 — OS QUATRO PILARES
          ═══════════════════════════════════════════ */}
          <section ref={pillarsRef} className="pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pillars.map((pillar, i) => {
                const colors = accentMap[pillar.accent];
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: APPLE_EASE }}
                  >
                    <Link to={pillar.to} className="group block h-full">
                      <div className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 transition-all duration-700 hover:border-gold/30 hover:bg-white/[0.04]`}>
                        {/* Glow on hover */}
                        <div className={`absolute -inset-1 rounded-3xl ${colors.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                        <div className="relative z-10">
                          {/* Icon + Tag */}
                          <div className="flex items-center justify-between mb-6">
                            <motion.div
                              animate={{
                                boxShadow: [
                                  '0 0 0px rgba(212,175,55,0)',
                                  '0 0 14px rgba(212,175,55,0.12)',
                                  '0 0 0px rgba(212,175,55,0)',
                                ],
                              }}
                              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.8 }}
                              className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}
                            >
                              <Icon className={`w-7 h-7 ${colors.text}`} />
                            </motion.div>
                            <span className={`font-mono text-[9px] tracking-[0.3em] ${colors.text} ${colors.bg} border ${colors.border} px-2.5 py-1 rounded-md`}>
                              {pillar.label}
                            </span>
                          </div>

                          <h3
                            className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-gold transition-colors duration-500"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {pillar.title}
                          </h3>

                          <p className="text-gold/60 text-xs font-semibold tracking-widest uppercase mb-3">
                            {pillar.hook}
                          </p>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {pillar.desc}
                          </p>

                          <div className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-500">
                            Acessar Módulo
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Shimmer */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Section divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50">
              DEFESA CONTRA PREDADORES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* ═══════════════════════════════════════════
              CAPÍTULO 3 — BLINDAGEM CONTRA GOLPES
          ═══════════════════════════════════════════ */}
          <section ref={defenseRef} className="pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={defenseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-destructive/20 bg-white/[0.02] backdrop-blur-sm p-8 md:p-14">
                {/* Background icon */}
                <AlertTriangle
                  size={250}
                  className="absolute -bottom-10 -right-10 text-destructive/[0.03] pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                      <ShieldAlert className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3
                        className="text-2xl md:text-3xl font-bold tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Blindagem Contra Golpes
                      </h3>
                      <p className="text-muted-foreground text-xs mt-1">A blockchain nunca foi hackeada. Sua segurança depende de você.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {defenseItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={defenseInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: APPLE_EASE }}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-destructive/30 transition-colors duration-500"
                        >
                          <Icon className="w-5 h-5 text-destructive mb-4" />
                          <h4 className="text-sm font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Link
                    to="/blindagem-golpes"
                    className="inline-flex items-center gap-2 text-destructive text-sm font-medium mt-8 hover:gap-3 transition-all duration-500"
                  >
                    Acessar Protocolo Completo
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ═══════════════════════════════════════════
              CAPÍTULO 4 — PROJETO AUTÔNOMO
          ═══════════════════════════════════════════ */}
          <section ref={autonomoRef} className="pb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={autonomoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              <Link to="/projeto-autonomo" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-white/[0.02] backdrop-blur-sm p-10 md:p-16 transition-all duration-700 hover:border-amber-500/50 hover:bg-white/[0.04]">
                  {/* Background icon */}
                  <ShieldCheck
                    size={260}
                    className="absolute -top-6 -right-6 text-amber-500/[0.04] group-hover:text-amber-500/[0.08] group-hover:scale-110 transition-all duration-1000"
                  />

                  {/* Shimmer */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:left-full transition-all duration-[1.5s] ease-in-out" />
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block font-mono text-[10px] tracking-[0.4em] text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md mb-6">
                      MÓDULO DE RESILIÊNCIA
                    </span>

                    <h3
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Projeto{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                        Autônomo
                      </span>
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed mb-4">
                      Base 72 · Autonomia Biológica · Soberania Alimentar — Preparação real para quando o sistema falhar.
                    </p>

                    <motion.div
                      whileHover={{ x: 6 }}
                      className="inline-flex items-center gap-3 bg-amber-500/90 hover:bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-colors duration-500"
                    >
                      ACESSAR PROTOCOLO
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>

          {/* Bottom signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 pt-10 border-t border-border/30 text-center"
          >
            <p
              className="text-muted-foreground/30 font-bold uppercase tracking-[0.2em] text-xs italic"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Not your keys, not your money.
            </p>
          </motion.div>
        </div>
      </div>

      <NetworkTicker />
    </div>
  );
}
