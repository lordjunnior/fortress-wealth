import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Server, HardDrive, Cpu, ShieldCheck, Network,
  EyeOff, Lock, AlertTriangle, ArrowRight
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 } }),
};

function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2; const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => { window.addEventListener('mousemove', handleMouse); return () => window.removeEventListener('mousemove', handleMouse); }, [handleMouse]);
  return { springX, springY };
}

export default function Infraestrutura() {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(t > 0 ? Math.min((window.scrollY / t) * 100, 100) : 0); };
    window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-purple-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Infraestrutura — Rode seu Próprio Node Bitcoin | Lord Junnior</title>
        <meta name="description" content="Aprenda a montar seu próprio Node Bitcoin: hardware, software, validação soberana. Se você não roda seu próprio node, está confiando no computador de outra pessoa." />
      </Helmet>
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #a855f7, #7c3aed)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(168,85,247,0.06) 50%, transparent 70%)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }} className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      <CinematicHero image="/heroes/infraestrutura-node.webp" phase="Don't Trust. Verify." title="Rodando com o Urso Dov"
        subtitle="Se você não roda seu próprio node, você está confiando no computador de outra pessoa para dizer quanto dinheiro você tem. Isso não é soberania. É terceirização da verdade."
        icon={Server} accentColor="purple" backLink="/educacao" backLabel="Arsenal Técnico" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* Cap 01 — A Ilusão da Privacidade */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <div className="flex items-center gap-3 mb-2"><AlertTriangle size={16} className="text-red-400" /><span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-400/60">Alerta Tático</span></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Ilusão da Privacidade</h2>
          </motion.div>
          <motion.div variants={scaleIn} custom={1} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="text-stone-400 leading-relaxed">
                <p>Muitos compram uma Hardware Wallet (Ledger, Trezor) e acham que estão 100% protegidos. O problema é o software (Ledger Live, Trezor Suite). Ao usá-los sem um Node próprio, sua carteira consulta os servidores da fabricante para checar seu saldo.</p>
              </div>
              <div className="bg-red-950/15 border border-red-500/15 rounded-xl p-8">
                <div className="flex items-center gap-2 mb-4"><EyeOff size={16} className="text-red-400" /><span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/60">O que eles descobrem:</span></div>
                <ul className="space-y-3 text-stone-300 text-sm">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" /> Seu endereço IP (sua localização física).</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" /> Todos os seus endereços de Bitcoin.</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" /> Seu saldo total e histórico de transações.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* Cap 02 — Banco Central Pessoal */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-purple-400/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O seu Banco Central Pessoal</h2>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <p className="text-stone-400 text-base leading-relaxed">
              Um Node é um computador que baixa e valida de forma independente toda a blockchain do Bitcoin, desde o bloco gênesis em 2009. Ele garante matematicamente que as regras do consenso estão sendo seguidas e que <strong className="text-white">ninguém está imprimindo dinheiro falso</strong> (inflação não autorizada pelo código).
            </p>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* Cap 03 — Hardware & Setup */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-purple-400/60">Capítulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Hardware & Setup</h2>
            <p className="text-stone-500 text-sm mt-2">A Máquina de Validação</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: 'O Cérebro (Mini PC/Pi)', desc: 'Você não precisa de um supercomputador, mas de uma máquina dedicada que rode 24/7 com baixo consumo de energia.', spec: 'Raspberry Pi 4/5 ou Mini PC Intel N100' },
              { icon: HardDrive, title: 'O Cofre (SSD 1TB+)', desc: 'O histórico completo do Bitcoin pesa mais de 500GB e cresce diariamente. HDDs mecânicos são proibidos (causam lentidão severa na sincronização).', spec: 'SSD NVMe ou SATA de 1TB (Mínimo)' },
              { icon: Server, title: 'O Sistema (OS)', desc: 'Softwares modernos transformaram a configuração de um Node em uma experiência "Plug and Play", instalável em poucos cliques.', spec: 'Umbrel, Start9 ou RoninDojo' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} custom={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 hover:bg-purple-500/[0.02] transition-all duration-500 group">
                <div className="p-3 rounded-xl bg-purple-500/8 border border-purple-500/15 w-fit mb-6 group-hover:bg-purple-500/15 transition-all">
                  <item.icon size={22} className="text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/15 font-mono">{item.spec}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* Cap 04 — Validação Soberana */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-purple-400/60">Capítulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Validação Soberana</h2>
          </motion.div>
          <motion.div variants={scaleIn} custom={1}
            className="bg-purple-500/[0.03] border border-purple-500/15 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-stone-400 leading-relaxed">
                  O objetivo final de construir o Urso Dov é <strong className="text-white">conectar sua Hardware Wallet exclusivamente ao seu próprio Node</strong> via rede Tor ou rede local.
                </p>
                <div className="bg-purple-500/[0.06] border-l-2 border-purple-500/50 rounded-r-xl p-6">
                  <p className="text-white font-medium leading-relaxed">
                    Isso impede que os servidores dos fabricantes da carteira saibam seus endereços e saldos, garantindo <span className="text-purple-400 font-bold">privacidade total</span>.
                  </p>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="text-center"><Lock size={24} className="text-stone-500 mx-auto mb-2" /><span className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Sua Carteira</span></div>
                  <div className="flex-1 border-t-2 border-dashed border-purple-500/30 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 px-2 py-1 rounded text-[9px] text-purple-400 font-bold uppercase whitespace-nowrap border border-purple-500/20">Rede Local / Tor</div>
                  </div>
                  <div className="text-center"><Server size={24} className="text-purple-400 mx-auto mb-2" /><span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">Seu Node</span></div>
                  <div className="flex-1 border-t-2 border-dashed border-white/10" />
                  <div className="text-center opacity-40"><Network size={24} className="text-stone-500 mx-auto mb-2" /><span className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Rede BTC</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp} custom={0} className="bg-white/[0.02] border border-purple-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Not your node, not your <span className="text-purple-400">rules.</span>
              </h2>
              <div className="pt-4">
                <Link to="/autocustodia" className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/25 rounded-xl px-8 py-4 text-purple-400 text-sm font-bold uppercase tracking-wider hover:bg-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 group">
                  Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
