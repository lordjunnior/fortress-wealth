import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Wallet, ShieldCheck, QrCode, Zap, ArrowRight,
  AlertTriangle, Smartphone, Lock, Eye, Ban,
  CheckCircle2, ExternalLink, Download, Copy, Shield,
  ArrowDownUp, Globe, Fingerprint
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import CinematicHero from "@/components/CinematicHero";
import ScrollToTop from "@/components/ScrollToTop";
import SovereignDisclaimer from "@/components/SovereignDisclaimer";
import BackToHome from "@/components/BackToHome";
import PageFloatingToc from "@/components/PageFloatingToc";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

const BG_DARK = "#050808";
const BG_ALT = "#070b0b";

const tocItems = [
  { id: "problema", label: "O Problema" },
  { id: "metodo", label: "O Método" },
  { id: "passo1", label: "1. Blockstream Wallet" },
  { id: "passo2", label: "2. SpikeTuSpike" },
  { id: "passo3", label: "3. Executar Compra" },
  { id: "passo4", label: "4. Liquid → On-Chain" },
  { id: "comparativo", label: "Comparativo" },
  { id: "faq", label: "FAQ" },
];

const problems = [
  { icon: Ban, label: "Contas bloqueadas sem aviso prévio" },
  { icon: Eye, label: "Cada centavo monitorado pelo Banco Central" },
  { icon: Lock, label: "Limites impostos por terceiros sobre SEU dinheiro" },
  { icon: AlertTriangle, label: "Fundos congelados por ordem judicial em segundos" },
];

const faqData = [
  {
    q: "Preciso de conta em banco para usar SpikeTuSpike?",
    a: "Não para receber Bitcoin. Para enviar o PIX de pagamento, você usa qualquer conta bancária (pode ser de terceiro, familiar, etc). O Bitcoin cai direto na sua Blockstream Wallet sem vínculo com banco nenhum.",
  },
  {
    q: "É legal comprar Bitcoin via P2P sem KYC no Brasil?",
    a: "Sim. A legislação brasileira não proíbe transações P2P de criptomoedas. O que existe são obrigações de reporte para exchanges centralizadas. Plataformas P2P como SpikeTuSpike operam na camada de comunicação entre compradores e vendedores.",
  },
  {
    q: "O que é a rede Liquid e por que usar ela?",
    a: "Liquid é uma sidechain do Bitcoin desenvolvida pela Blockstream. Ela oferece transações confidenciais (ninguém vê o valor nem o ativo transacionado), taxas mais baratas e confirmações mais rápidas. Ideal para acumular antes de converter para a camada principal.",
  },
  {
    q: "Qual o valor mínimo para comprar na SpikeTuSpike?",
    a: "Via DPIX automático (pelo celular), você pode comprar a partir de R$ 10 até R$ 500 na primeira ordem. Após 24h, o limite sobe para R$ 6.000 por ordem. Para boleto e TED, são necessárias 3 ordens prévias de até R$ 2.000.",
  },
  {
    q: "Posso converter Liquid Bitcoin para Bitcoin on-chain?",
    a: "Sim. Dentro da própria Blockstream Wallet, use a função 'Swap' para converter L-BTC para BTC on-chain. O mínimo é 0.0025 BTC (aproximadamente R$ 1.700 na cotação atual).",
  },
  {
    q: "E se meu canal ou conta for censurada, como acompanho?",
    a: "Mantenha backup em grupos de Telegram e WhatsApp do projeto. Links estão na descrição dos vídeos e na página principal do site.",
  },
];

const PixSemBanco = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: BG_DARK }}>
      <Helmet>
        <title>Como Receber PIX Sem Banco | Tutorial Completo com SpikeTuSpike + Blockstream 2026</title>
        <meta name="description" content="Tutorial passo a passo: compre Bitcoin com PIX via SpikeTuSpike sem KYC, receba na Blockstream Wallet via rede Liquid. Sem conta bancária, sem documentos." />
        <meta name="keywords" content="pix sem banco, spiketuspike tutorial, blockstream wallet, bitcoin liquid, comprar bitcoin sem kyc, pix para bitcoin, bitcoin privado brasil" />
        <meta property="og:title" content="PIX → Bitcoin Privado: Tutorial Completo 2026" />
        <meta property="og:description" content="Compre Bitcoin com PIX a partir de R$10, sem KYC, sem exchange. SpikeTuSpike + Blockstream Wallet + Rede Liquid." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-financeira/pix-sem-banco" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Como Comprar Bitcoin com PIX sem KYC usando SpikeTuSpike",
          "description": "Tutorial completo para comprar Bitcoin de forma privada usando PIX, SpikeTuSpike e Blockstream Wallet na rede Liquid.",
          "totalTime": "PT15M",
          "supply": [
            { "@type": "HowToSupply", "name": "Smartphone com acesso à internet" },
            { "@type": "HowToSupply", "name": "PIX (qualquer banco)" },
          ],
          "tool": [
            { "@type": "HowToTool", "name": "Blockstream Green Wallet" },
            { "@type": "HowToTool", "name": "SpikeTuSpike.com" },
          ],
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Baixar Blockstream Wallet", "text": "Instale o app Blockstream Green na Play Store ou App Store. Crie sua carteira e anote as 12 palavras de recuperação." },
            { "@type": "HowToStep", "position": 2, "name": "Criar conta no SpikeTuSpike", "text": "Acesse spiketuspike.com, gere sua chave privada (sem e-mail, sem CPF) e guarde-a com segurança." },
            { "@type": "HowToStep", "position": 3, "name": "Executar primeira compra", "text": "Selecione Bitcoin, rede Liquid, valor a partir de R$10. Cole seu endereço Liquid da Blockstream e pague o PIX gerado." },
            { "@type": "HowToStep", "position": 4, "name": "Converter Liquid para On-Chain", "text": "Na Blockstream Wallet, use Swap para converter L-BTC para BTC on-chain quando acumular 0.0025 BTC." },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        })}</script>
      </Helmet>

      <ScrollToTop />
      <PageFloatingToc items={tocItems} />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: "128px 128px" }} />
      </div>

      {/* ═══ HERO ═══ */}
      <CinematicHero
        image="/heroes/economia-paralela.webp"
        phase="Soberania Financeira"
        title={<>PIX → Bitcoin Privado: <span style={{ color: "#f59e0b" }}>Tutorial Completo</span></>}
        subtitle="Compre Bitcoin com PIX a partir de R$ 10, sem KYC, sem exchange, sem documento. SpikeTuSpike + Blockstream Wallet + Rede Liquid. Tudo que você precisa, passo a passo."
        icon={Wallet}
        accentColor="amber"
        backLink="/soberania-financeira"
        backLabel="Soberania Financeira"
      />

      {/* ═══ ALERTA PIX ═══ */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl border-2 border-destructive/40 p-6" style={{ background: "rgba(239,68,68,0.06)" }}>
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">⚠️ PIX NÃO É PRIVADO</p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  O PIX é apenas o <strong className="text-white">mecanismo de entrada</strong>. Cada transação PIX é 100% rastreada pelo Banco Central. 
                  Este guia existe para quem aceita esse nível inicial de exposição e quer converter rapidamente para um ativo soberano (Bitcoin na rede Liquid, com transações confidenciais). 
                  A privacidade real começa <strong className="text-white">depois</strong> que o valor sai do sistema bancário.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ O PROBLEMA ═══ */}
      <section id="problema" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">O problema real</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Hong Kong já criminalizou quem se recusa a entregar chaves privadas
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-4">
              Pena: <strong className="text-white">1 ano de prisão + multa de HK$ 100.000</strong> (R$ 67.000). A lei vale para estrangeiros em trânsito — até no aeroporto.
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-4">
              No Brasil: IOF sobre stablecoins, reporte diário de saldos ao Banco Central, e o governo já discute o fim do limite de R$ 36.000 de isenção.
            </p>
            <p className="text-base md:text-lg text-white font-medium leading-relaxed">
              A pergunta não é "se" vai apertar. É: <span className="text-amber-400">você já protegeu o seu?</span>
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="grid grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1}
                className="rounded-2xl border border-red-500/10 p-5 flex flex-col items-center gap-3 text-center"
                style={{ background: "rgba(239,68,68,0.04)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/20">
                  <p.icon className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-sm text-stone-400 leading-snug">{p.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ O MÉTODO ═══ */}
      <section id="metodo" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_DARK }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">O método completo</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              PIX → Bitcoin Privado em 4 Passos
            </h2>
            <p className="text-base md:text-lg text-stone-400 max-w-3xl mx-auto leading-relaxed">
              Ferramentas reais, nomes reais, links reais. Sem enrolação. Sem "baixe uma carteira qualquer". 
              Este é o protocolo exato que funciona hoje no Brasil.
            </p>
          </motion.div>

          {/* Visual pipeline */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: "01", label: "Blockstream Wallet", sub: "Sua carteira", icon: Download },
              { num: "02", label: "SpikeTuSpike", sub: "Mercado P2P", icon: Globe },
              { num: "03", label: "PIX → L-BTC", sub: "Compra privada", icon: ArrowDownUp },
              { num: "04", label: "Liquid → On-Chain", sub: "Consolidação", icon: Shield },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-xl border border-amber-500/10 p-5 text-center flex flex-col items-center gap-3"
                style={{ background: "rgba(245,158,11,0.03)" }}>
                <span className="font-mono text-3xl font-black text-amber-400/30">{s.num}</span>
                <s.icon className="w-6 h-6 text-amber-400" />
                <p className="text-sm font-semibold text-white">{s.label}</p>
                <p className="text-xs text-stone-500">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PASSO 1: BLOCKSTREAM WALLET ═══ */}
      <section id="passo1" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-5xl font-black text-amber-400/20">01</span>
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase">Passo 01</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Baixe a <span className="text-amber-400">Blockstream Green Wallet</span>
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-6">
              A Blockstream Green é uma carteira non-custodial com suporte nativo à <strong className="text-white">rede Liquid</strong> — 
              a sidechain do Bitcoin que oferece transações confidenciais (ninguém vê valor nem ativo transacionado).
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Baixe o app na Play Store ou App Store (busque 'Blockstream Green')",
                "Crie uma nova carteira e aceite os termos",
                "ANOTE AS 12 PALAVRAS DE RECUPERAÇÃO em papel físico — nunca em print ou nuvem",
                "Vá em Segurança para verificar suas chaves privadas",
                "Ative a rede Liquid: toque em 'Adicionar Conta' → selecione 'Liquid'",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/15 p-5" style={{ background: "rgba(245,158,11,0.04)" }}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-200/80 leading-relaxed">
                  <strong className="text-white">Por que Blockstream?</strong> É a empresa que criou a rede Liquid. Carteira open-source, 
                  sem KYC, suporte a multisig, e a única que integra Liquid nativamente no mobile.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              {/* Phone mockup */}
              <div className="p-6 border-b border-white/[0.06] text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20" style={{ background: "rgba(16,185,129,0.08)" }}>
                  <Wallet className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-white mb-1">Blockstream Green</p>
                <p className="text-xs text-stone-500 font-mono">Non-Custodial · Open Source · Liquid</p>
              </div>
              <div className="p-6 space-y-3">
                <a href="https://play.google.com/store/apps/details?id=com.greenaddress.greenbits_android_wallet" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] hover:border-emerald-500/30 transition-colors group"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white">Android (Play Store)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-600 group-hover:text-emerald-400 transition-colors" />
                </a>
                <a href="https://apps.apple.com/app/green-bitcoin-wallet/id1402243590" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] hover:border-emerald-500/30 transition-colors group"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white">iOS (App Store)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-600 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PASSO 2: SPIKETUSPIKE ═══ */}
      <section id="passo2" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_DARK }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="flex justify-center lg:order-1">
            <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="p-6 border-b border-white/[0.06] text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20" style={{ background: "rgba(245,158,11,0.08)" }}>
                  <Fingerprint className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-lg font-semibold text-white mb-1">SpikeTuSpike</p>
                <p className="text-xs text-stone-500 font-mono">P2P · Sem KYC · Sem E-mail · DPIX</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="rounded-lg border border-amber-500/10 p-4" style={{ background: "rgba(245,158,11,0.03)" }}>
                  <p className="text-xs text-stone-500 font-mono uppercase mb-2">Limites de compra</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-400">1ª ordem (DPIX)</span>
                      <span className="text-white font-medium">R$ 10 – R$ 500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Após 24h (DPIX)</span>
                      <span className="text-white font-medium">até R$ 6.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Boleto/TED (desktop)</span>
                      <span className="text-white font-medium">após 3 ordens</span>
                    </div>
                  </div>
                </div>
                <a href="https://spiketuspike.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-semibold text-stone-900 transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  <Globe className="w-4 h-4" />
                  Acessar SpikeTuSpike.com
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-5xl font-black text-amber-400/20">02</span>
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase">Passo 02</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Crie sua conta no <span className="text-amber-400">SpikeTuSpike</span>
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-6">
              SpikeTuSpike é uma rede social P2P que permite comprar e vender Bitcoin de forma privada. 
              <strong className="text-white"> Sem e-mail, sem CPF, sem selfie.</strong> Sua identidade é uma chave privada.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Acesse spiketuspike.com no navegador do celular",
                "Menu ☰ → Trade → Criar conta",
                "Escolha login por chave privada (não precisa de e-mail)",
                "Gere sua chave privada e ANOTE EM PAPEL — é seu login permanente",
                "Se já tem chave, cole no campo e clique em 'Prosseguir'",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-red-500/15 p-5" style={{ background: "rgba(239,68,68,0.04)" }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-200/80 leading-relaxed">
                  <strong className="text-white">ATENÇÃO:</strong> Se você não guardar sua chave privada, 
                  perderá acesso à conta, reputação e limites de negociação. Sem chave = sem conta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PASSO 3: EXECUTAR COMPRA ═══ */}
      <section id="passo3" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-5xl font-black text-amber-400/20">03</span>
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase">Passo 03 — Execução</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Execute sua primeira <span className="text-amber-400">compra privada</span>
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-6">
              Agora vem a parte prática. Você vai conectar a Blockstream Wallet ao SpikeTuSpike 
              e executar sua primeira compra de Bitcoin via PIX — tudo automático, processado pelo robô SpikeBorg.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { text: "No SpikeTuSpike, selecione: Crypto = Bitcoin, Fiat = BRL", highlight: false },
                { text: "Escolha o valor (mínimo R$ 10 na primeira ordem)", highlight: false },
                { text: "Selecione a rede: LIQUID (obrigatório para DPIX automático)", highlight: true },
                { text: "Clique em 'Prosseguir' — o SpikeBorg (robô) vai solicitar seu endereço Liquid", highlight: false },
                { text: "Vá na Blockstream Wallet → Bitcoin Liquid → Receive → copie o endereço", highlight: true },
                { text: "Cole o endereço Liquid no chat do SpikeBorg", highlight: false },
                { text: "O SpikeBorg gera um QR Code PIX — pague com qualquer banco", highlight: false },
                { text: "Após pagamento, clique em 'Confirmar Pagamento'", highlight: false },
                { text: "Bitcoin chega na sua Blockstream Wallet em ~4 segundos", highlight: true },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-3 ${step.highlight ? "bg-amber-500/5 rounded-lg p-3 -mx-3 border border-amber-500/10" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${step.highlight ? "bg-amber-500/20 border border-amber-500/30" : "bg-amber-500/10 border border-amber-500/20"}`}>
                    <span className={`text-xs font-bold ${step.highlight ? "text-amber-300" : "text-amber-400"}`}>{i + 1}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${step.highlight ? "text-white font-medium" : "text-stone-300"}`}>{step.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="flex justify-center">
            {/* Simulated flow */}
            <div className="w-full max-w-sm space-y-4">
              {[
                { label: "Rede", value: "Liquid (Confidencial)", color: "emerald" },
                { label: "Valor", value: "R$ 10,00 (mínimo)", color: "amber" },
                { label: "Atendente", value: "SpikeBorg (robô automático)", color: "blue" },
                { label: "Método", value: "DPIX (Pix descentralizado)", color: "amber" },
                { label: "Tempo médio", value: "~4 segundos após pagamento", color: "emerald" },
                { label: "Dados exigidos", value: "Nenhum (sem e-mail, sem CPF)", color: "emerald" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i * 0.5}
                  className="rounded-xl border border-white/[0.06] p-4 flex items-center justify-between"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-xs text-stone-500 font-mono uppercase">{item.label}</span>
                  <span className={`text-sm font-medium ${item.color === "emerald" ? "text-emerald-400" : item.color === "blue" ? "text-blue-400" : "text-amber-400"}`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PASSO 4: LIQUID → ON-CHAIN ═══ */}
      <section id="passo4" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_DARK }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="flex justify-center lg:order-1">
            <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="text-center mb-6">
                <p className="font-mono text-[10px] tracking-widest text-stone-600 uppercase mb-3">Conversão</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-blue-500/20 mx-auto mb-2" style={{ background: "rgba(59,130,246,0.08)" }}>
                      <span className="text-lg font-bold text-blue-400">L</span>
                    </div>
                    <p className="text-xs text-stone-500">Liquid</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-amber-500/20 mx-auto mb-2" style={{ background: "rgba(245,158,11,0.08)" }}>
                      <span className="text-lg font-bold text-amber-400">₿</span>
                    </div>
                    <p className="text-xs text-stone-500">On-Chain</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t border-white/[0.06] pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Mínimo para swap</span>
                  <span className="text-white font-mono">0.0025 BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">≈ em BRL</span>
                  <span className="text-amber-400 font-mono">~R$ 1.700</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Onde fazer</span>
                  <span className="text-emerald-400 font-mono">Blockstream Wallet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Função</span>
                  <span className="text-white font-mono">Swap (L-BTC → BTC)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-5xl font-black text-amber-400/20">04</span>
              <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase">Passo 04 — Consolidação</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Converta <span className="text-amber-400">Liquid → On-Chain</span>
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-6">
              Depois de acumular Bitcoin na rede Liquid, você pode consolidar para a camada principal (on-chain) 
              quando atingir o mínimo de <strong className="text-white">0.0025 BTC (~R$ 1.700)</strong>.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Na Blockstream Wallet, toque no saldo Liquid",
                "Clique em 'Swap'",
                "Insira a quantia (mínimo 0.0025 BTC)",
                "Confirme a conversão L-BTC → BTC",
                "O saldo aparece na camada principal em poucos minutos",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-emerald-500/15 p-5" style={{ background: "rgba(16,185,129,0.04)" }}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-emerald-200/80 leading-relaxed">
                  <strong className="text-white">Resultado:</strong> Você agora tem Bitcoin real, na camada principal, 
                  comprado com PIX, sem ter passado um único documento. Seu banco não sabe. A exchange não sabe. Ninguém sabe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPARATIVO ═══ */}
      <section id="comparativo" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Comparativo direto</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Exchange com KYC vs. Compra Privada (SpikeTuSpike)
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={1}
            className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="grid grid-cols-3 gap-0">
              <div className="p-4 md:p-6 border-b border-r border-white/[0.06]">
                <p className="font-mono text-[10px] tracking-widest text-stone-600 uppercase">Critério</p>
              </div>
              <div className="p-4 md:p-6 border-b border-r border-white/[0.06] text-center">
                <p className="font-mono text-[10px] tracking-widest text-red-400 uppercase">Exchange (Binance, etc.)</p>
              </div>
              <div className="p-4 md:p-6 border-b border-white/[0.06] text-center">
                <p className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">SpikeTuSpike + Liquid</p>
              </div>
              {[
                ["Documentos exigidos", "CPF, selfie, comprovante de residência", "Nenhum — chave privada como login"],
                ["Reporte ao governo", "Saldos reportados diariamente ao BC", "Sem reporte — P2P descentralizado"],
                ["Risco de bloqueio", "Pode bloquear saques a qualquer momento", "Impossível — Bitcoin na sua carteira"],
                ["Privacidade", "Histórico completo rastreável", "Transações confidenciais (Liquid)"],
                ["IOF / Impostos", "IOF sobre stablecoins, ganhos tributados", "Sem IOF — compra direta P2P"],
                ["Velocidade", "Depende de aprovação + limite de saque", "~4 segundos após pagamento PIX"],
                ["Valor mínimo", "Varia por exchange", "R$ 10 (DPIX automático)"],
              ].map(([criterio, exchange, spike], i) => (
                <div key={i} className="contents">
                  <div className="p-4 md:p-6 border-b border-r border-white/[0.06]">
                    <p className="text-sm text-white font-medium">{criterio}</p>
                  </div>
                  <div className="p-4 md:p-6 border-b border-r border-white/[0.06] text-center">
                    <p className="text-sm text-stone-500">{exchange}</p>
                  </div>
                  <div className="p-4 md:p-6 border-b border-white/[0.06] text-center">
                    <p className="text-sm text-emerald-400 font-medium">{spike}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_DARK }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Próximo passo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Enquanto eles querem tomar o seu, proteja o que é seu
            </h2>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-10">
              Você acabou de ver o método completo. Não é teoria. Não é promessa. É um protocolo que funciona hoje, 
              com R$ 10, sem pedir permissão a ninguém. A diferença entre quem protege e quem perde 
              é uma única decisão.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://spiketuspike.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-3 text-stone-900 transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                <Zap className="w-4 h-4" />
                EXECUTAR PRIMEIRA COMPRA PRIVADA
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/alertas/governo-tomar-bitcoins"
                className="px-8 py-4 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-3 text-white border border-white/10 hover:border-red-500/30 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                VER ALERTA DE CONFISCO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative z-10 py-20 px-6 md:px-16 lg:px-24" style={{ background: BG_ALT }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-400/70 uppercase mb-4">Dúvidas frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Perguntas que você precisa responder
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-white/[0.06] px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <AccordionTrigger className="text-left text-white hover:text-amber-400 transition-colors text-sm md:text-base py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-stone-400 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Not your keys. Not your money.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PixSemBanco;
