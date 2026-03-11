import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, Shield, Cpu, Wifi, WifiOff, QrCode, HardDrive, Eye, Lock,
  ChevronDown, Wrench, AlertTriangle, CheckCircle2, ArrowRight, Layers,
  Camera, Monitor, Fingerprint, ShieldCheck, KeyRound, Package, Database
} from 'lucide-react';

import heroImg from '@/assets/hw-diy-hero.jpg';
import imgCadeia from '@/assets/hw-diy-cadeia-confianca.jpg';
import imgAirgapped from '@/assets/hw-diy-airgapped.jpg';
import imgComponentes from '@/assets/hw-diy-componentes.jpg';
import imgSeguranca from '@/assets/hw-diy-seguranca.jpg';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ── Nobel Section ── */
const NobelSection = ({ children, className = '', id, delay = 0 }: {
  children: React.ReactNode; className?: string; id?: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, [delay]);
  return <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>{children}</div>;
};

/* ── Cinematic Break ── */
const CinematicBreak: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <section className="relative z-10 py-8 md:py-14">
    <div className="max-w-6xl mx-auto px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: APPLE_EASE }}
        className="relative rounded-2xl overflow-hidden border border-border/20 group"
      >
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Section Divider ── */
const SectionGlow = () => (
  <div className="relative z-10 h-px max-w-5xl mx-auto">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(217,169,78,0.15), transparent)' }} />
  </div>
);

/* ── DIY Projects Data ── */
const PROJECTS = [
  {
    icon: Cpu,
    name: 'SeedSigner',
    accent: '#d4af37',
    desc: 'Utiliza Raspberry Pi Zero com câmera e display pequeno. Focado em simplicidade e assinatura via QR code. Projeto 100% stateless — nunca armazena a seed na memória persistente. Ideal para quem quer o máximo de segurança com componentes acessíveis.',
    features: ['QR code signing', 'Stateless', 'Raspberry Pi Zero', 'BIP39 / BIP85'],
  },
  {
    icon: Lock,
    name: 'Krux',
    accent: '#38bdf8',
    desc: 'Firmware open source que roda em dispositivos como M5Stack e Maix Amigo oferecendo suporte a criptografia avançada e SeedQR. Interface intuitiva com suporte a múltiplas seeds e multisig nativo. Comunidade ativa e documentação em português.',
    features: ['SeedQR', 'Multisig nativo', 'M5Stack / Maix Amigo', 'Criptografia avançada'],
  },
  {
    icon: Monitor,
    name: 'Specter DIY',
    accent: '#34d399',
    desc: 'Projeto baseado em ESP32 que integra perfeitamente com Specter Desktop. Oferece tela touchscreen maior e interface mais refinada. Suporta PSBT (Partially Signed Bitcoin Transactions) e é ideal para quem já usa o ecossistema Specter.',
    features: ['ESP32', 'Touchscreen', 'PSBT', 'Specter Desktop'],
  },
];

/* ── Components Data ── */
const COMPONENTES = [
  { icon: Cpu, label: 'Raspberry Pi Zero', desc: 'Microcomputador compacto que executa o firmware open source' },
  { icon: Monitor, label: 'Display LCD', desc: 'Tela de 1.3" a 2.4" para visualização de QR codes e menus' },
  { icon: Camera, label: 'Câmera', desc: 'Módulo de câmera para leitura de QR codes e PSBTs' },
  { icon: Database, label: 'Cartão microSD', desc: 'Armazena o firmware — único meio de comunicação com o mundo exterior' },
  { icon: Wrench, label: 'Botões físicos', desc: 'Navegação no menu sem necessidade de touchscreen' },
  { icon: Package, label: 'Case 3D', desc: 'Carcaça impressa em 3D para proteção e ergonomia' },
];

/* ── Steps Data ── */
const PASSOS = [
  { num: '01', title: 'Adquira os componentes', desc: 'Compre os eletrônicos genéricos em lojas comuns — Raspberry Pi Zero, câmera, display LCD, botões e cartão microSD. Nenhum fabricante sabe que você está montando uma hardware wallet.' },
  { num: '02', title: 'Baixe o firmware oficial', desc: 'Acesse o repositório oficial do projeto (SeedSigner, Krux ou Specter) no GitHub. Verifique a assinatura GPG do release para garantir integridade do código.' },
  { num: '03', title: 'Grave no cartão microSD', desc: 'Use ferramentas como Balena Etcher ou dd para gravar a imagem do firmware no cartão microSD. O cartão se torna o "cérebro" do dispositivo.' },
  { num: '04', title: 'Monte o dispositivo', desc: 'Conecte o display, a câmera e os botões ao Raspberry Pi Zero. Se tiver acesso a uma impressora 3D, imprima a case do projeto para finalização profissional.' },
  { num: '05', title: 'Inicialize e gere sua seed', desc: 'Insira o cartão, ligue o dispositivo e gere uma nova seed phrase usando entropia do dado (dice rolls) ou da câmera. Importe uma seed existente se preferir — o dispositivo nunca armazena nada.' },
];

/* ── Chain of Trust Risks ── */
const RISCOS_CADEIA = [
  { icon: Package, label: 'Fabricante', desc: 'Firmware malicioso embutido de fábrica que pode vazar suas chaves' },
  { icon: HardDrive, label: 'Transporte', desc: 'Interceptação e adulteração física durante envio — "evil maid attack"' },
  { icon: Eye, label: 'Distribuição', desc: 'Revendedores não autorizados que vendem dispositivos pré-configurados com seeds comprometidas' },
  { icon: Fingerprint, label: 'Atualização', desc: 'Atualizações de firmware centralizadas que podem introduzir backdoors silenciosamente' },
];

const HardwareWalletDiy = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.05]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hardware Wallet DIY Bitcoin — Como Construir Seu Próprio Dispositivo de Assinatura",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "publisher": { "@type": "Organization", "name": "Lord Junnior" },
    "datePublished": "2026-03-10",
    "description": "Guia completo de hardware wallets DIY e dispositivos air-gapped para autocustódia Bitcoin.",
  };

  return (
    <>
      <Helmet>
        <title>Hardware Wallet DIY Bitcoin | Como Construir Seu Próprio Dispositivo de Assinatura</title>
        <meta name="description" content="Aprenda como construir hardware wallets DIY como SeedSigner, Krux e Specter. Guia completo de autocustódia Bitcoin, segurança de seeds e dispositivos air-gapped." />
        <link rel="canonical" href="https://lordjunnior.com/autocustodia/hardware-wallet-diy-bitcoin" />
        <meta property="og:title" content="Hardware Wallet DIY Bitcoin | Construa Seu Dispositivo de Assinatura" />
        <meta property="og:description" content="Guia completo de hardware wallets DIY para autocustódia Bitcoin soberana." />
        <meta property="og:image" content="/heroes/hardware-wallet-diy.webp" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* ══ Back Button ══ */}
      <Link to="/autocustodia" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border text-muted-foreground hover:text-foreground transition-all text-sm">
        <ArrowLeft className="w-4 h-4" /> Autocustódia
      </Link>

      {/* ══ Progress Bar ══ */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left" style={{ scaleX: scrollYProgress, background: 'linear-gradient(to right, #d4af37, #f59e0b)' }} />

      <div className="min-h-screen bg-background text-foreground">

        {/* ══ HERO ══ */}
        <motion.section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ opacity: heroOpacity }}>
          <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
            <img src={heroImg} alt="Hardware Wallet DIY" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.7)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,8,8,0.3) 0%, rgba(5,8,8,0.85) 70%, hsl(var(--background)) 100%)' }} />
          </motion.div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
              <motion.p variants={fadeUp} custom={0} className="text-amber-500/80 font-mono text-xs tracking-[0.3em] uppercase mb-6">
                Autocustódia Avançada
              </motion.p>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Hardware Wallets DIY
                <span className="block text-amber-500/90 text-2xl md:text-4xl lg:text-5xl mt-2">
                  construa seu próprio dispositivo de assinatura Bitcoin
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                A autocustódia verdadeira começa quando você remove intermediários até mesmo da segurança do seu dinheiro.
              </motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <a href="#problema" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all text-sm font-semibold">
                  Aprender a montar <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ══ O PROBLEMA ══ */}
        <section id="problema" className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 01</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O problema da cadeia de confiança
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Muitas pessoas acreditam que comprar uma hardware wallet resolve completamente a segurança do Bitcoin. Na prática ainda existe uma <strong className="text-foreground">cadeia de confiança</strong> composta por fabricante, fábrica, transporte e distribuição. Cada etapa cria um possível ponto de falha.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-16">
                Projetos DIY surgiram para <strong className="text-amber-500">eliminar essa dependência</strong>. O usuário compra componentes eletrônicos genéricos e instala diretamente firmware open source auditável. Nenhum fabricante sabe que você está montando uma hardware wallet.
              </p>

              {/* Risk Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RISCOS_CADEIA.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-5 rounded-xl border border-red-500/10 hover:border-red-500/25 transition-all duration-500"
                    style={{ background: 'rgba(239,68,68,0.04)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <r.icon className="w-5 h-5 text-red-400" />
                      <h4 className="font-bold text-foreground text-sm">{r.label}</h4>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgCadeia} alt="Cadeia de confiança quebrada" caption="Cada elo na cadeia de confiança é um ponto de vulnerabilidade — elimine todos" />
        <SectionGlow />

        {/* ══ AIR-GAPPED ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 02</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O conceito de dispositivo air-gapped
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Dispositivos air-gapped <strong className="text-foreground">nunca se conectam à internet</strong>. Eles assinam transações offline usando QR codes ou cartão SD. A chave privada nunca sai do dispositivo — e em projetos stateless como o SeedSigner, ela nem sequer é armazenada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: WifiOff, label: 'Zero conexão', desc: 'Sem WiFi, Bluetooth, USB data ou qualquer canal de comunicação digital' },
                  { icon: QrCode, label: 'QR Code', desc: 'Transações assinadas são transmitidas via QR code — canal visual unidirecional' },
                  { icon: SdCard, label: 'Cartão SD', desc: 'Alternativa ao QR: PSBTs exportados via cartão microSD removível' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border border-amber-500/10 hover:border-amber-500/25 transition-all duration-500 text-center"
                    style={{ background: 'rgba(217,169,78,0.04)' }}
                  >
                    <item.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <h4 className="font-bold text-foreground text-sm mb-2">{item.label}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgAirgapped} alt="Dispositivo air-gapped com QR code" caption="A assinatura acontece offline — a chave privada nunca toca a internet" />
        <SectionGlow />

        {/* ══ PROJETOS DIY ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 03</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Projetos DIY populares
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-16">
                Três projetos open source dominam o ecossistema de hardware wallets DIY. Cada um atende perfis diferentes de usuário.
              </p>

              <div className="grid grid-cols-1 gap-8">
                {PROJECTS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="relative p-8 rounded-2xl border border-border/30 hover:border-border/60 transition-all duration-500 group"
                    style={{ background: `linear-gradient(135deg, ${p.accent}08, transparent 60%)` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30` }}>
                        <p.icon className="w-6 h-6" style={{ color: p.accent }} />
                      </div>
                      <h3 className="text-2xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", color: p.accent }}>{p.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.features.map(f => (
                        <span key={f} className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border" style={{ borderColor: `${p.accent}30`, color: p.accent, background: `${p.accent}08` }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <SectionGlow />

        {/* ══ COMPONENTES ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 04</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Componentes necessários
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Um kit SeedSigner típico inclui componentes eletrônicos genéricos que podem ser adquiridos em qualquer loja de eletrônicos — nenhum fornecedor sabe para que serve.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMPONENTES.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-5 rounded-xl border border-border/20 hover:border-amber-500/20 transition-all duration-500 group"
                    style={{ background: 'rgba(217,169,78,0.03)' }}
                  >
                    <c.icon className="w-6 h-6 text-amber-500/70 mb-3 group-hover:text-amber-500 transition-colors" />
                    <h4 className="font-bold text-foreground text-sm mb-1">{c.label}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgComponentes} alt="Componentes de hardware wallet DIY" caption="Componentes genéricos — ninguém sabe que você está montando uma hardware wallet" />
        <SectionGlow />

        {/* ══ PASSO A PASSO ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 05</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Passo a passo básico
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-16">
                Do zero ao dispositivo funcional em cinco etapas. Nenhuma exige conhecimento técnico avançado.
              </p>

              <div className="space-y-6">
                {PASSOS.map((p, i) => (
                  <motion.div
                    key={p.num}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="flex gap-6 p-6 rounded-xl border border-border/20 hover:border-amber-500/15 transition-all duration-500"
                    style={{ background: 'rgba(217,169,78,0.03)' }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border border-amber-500/20" style={{ background: 'rgba(217,169,78,0.08)' }}>
                      <span className="text-amber-500 font-black text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.num}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-2">{p.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <SectionGlow />

        {/* ══ SEGURANÇA ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">Capítulo 06</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Segurança real na autocustódia
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Dispositivos de assinatura são apenas <strong className="text-foreground">uma camada</strong>. Segurança real envolve backup adequado da seed, redundância geográfica e armazenamento físico seguro. Lembre-se: o dispositivo assina, mas o backup protege.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: KeyRound, title: 'Backup da seed', desc: 'Grave suas 12 ou 24 palavras em placa de metal (aço ou titânio). Papel é vulnerável a fogo, água e tempo.' },
                  { icon: Layers, title: 'Redundância geográfica', desc: 'Mantenha backups em locais fisicamente separados. Um incêndio ou desastre natural não deve comprometer todos os acessos.' },
                  { icon: ShieldCheck, title: 'Passphrase (25ª palavra)', desc: 'Adicione uma passphrase à sua seed para criar uma camada extra de proteção. Mesmo que alguém encontre suas 24 palavras, não consegue acessar os fundos.' },
                  { icon: AlertTriangle, title: 'Verificação de firmware', desc: 'Sempre verifique a assinatura GPG do firmware antes de gravar no cartão SD. Nunca confie em downloads de fontes não oficiais.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border border-border/20 hover:border-amber-500/20 transition-all duration-500"
                    style={{ background: 'rgba(217,169,78,0.04)' }}
                  >
                    <item.icon className="w-6 h-6 text-amber-500 mb-3" />
                    <h4 className="font-bold text-foreground text-sm mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgSeguranca} alt="Segurança em autocustódia Bitcoin" caption="Segurança real = dispositivo de assinatura + backup em metal + redundância geográfica" />
        <SectionGlow />

        {/* ══ CONCLUSÃO ══ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <NobelSection>
              <p className="text-amber-500/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-6">Conclusão</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Soberania começa no hardware
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Bitcoin permite riqueza protegida por <strong className="text-foreground">matemática</strong> em vez de instituições. Construir seu próprio dispositivo de assinatura representa o nível mais profundo de soberania financeira — você não confia em nenhum fabricante, nenhum intermediário, nenhuma entidade.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12">
                Sua seed, seu dispositivo, suas regras. <span className="text-amber-500 font-semibold">Sem exceções.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/autocustodia" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all text-sm font-semibold">
                  <ArrowLeft className="w-4 h-4" /> Voltar à Autocustódia
                </Link>
                <Link to="/mobilidade-de-chaves" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 transition-all text-sm font-semibold">
                  Mobilidade de Chaves <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </NobelSection>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
};

export default HardwareWalletDiy;
