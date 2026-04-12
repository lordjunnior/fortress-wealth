import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Bitcoin, Sprout, BookOpen, AlertTriangle, Zap, Globe, Wallet, Lock, Radio, Heart, Flame, Map } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: APPLE_EASE, delay },
});

interface SiloLink {
  title: string;
  href: string;
}

interface Silo {
  title: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  links: SiloLink[];
}

const SILOS: Silo[] = [
  {
    title: "Bitcoin & Economia",
    icon: Bitcoin,
    color: "text-amber-400",
    borderColor: "border-amber-500/[0.15]",
    bgColor: "bg-amber-500/[0.06]",
    links: [
      { title: "O que é Bitcoin", href: "/o-que-e-bitcoin" },
      { title: "Blockchain: Como Funciona", href: "/blockchain" },
      { title: "Noções Fundamentais", href: "/nocoes-bitcoin" },
      { title: "Bitcoin Seguro", href: "/bitcoin-seguro" },
      { title: "Chaves Privadas", href: "/chaves" },
      { title: "Transações Bitcoin", href: "/transacoes" },
      { title: "Mineração", href: "/mineracao" },
      { title: "Lightning Network", href: "/lightning" },
      { title: "Hard Cap 21 Milhões", href: "/21-milhoes" },
      { title: "Supply Shock", href: "/supply-shock" },
      { title: "Halving Bitcoin", href: "/halving-bitcoin" },
      { title: "Volatilidade", href: "/volatilidade" },
      { title: "Lastro do Bitcoin", href: "/lastro" },
      { title: "Candlestick", href: "/candlestick" },
      { title: "Diversificação: A Falácia", href: "/diversificacao" },
      { title: "Bitcoin vs Altcoins", href: "/bitcoin-vs-altcoins" },
      { title: "Bitcoin vs Fiat", href: "/bitcoin-vs-fiat" },
      { title: "Bitcoin vs Imóvel", href: "/bitcoin-vs-imovel" },
      { title: "Futuro do Bitcoin", href: "/futuro-bitcoin" },
      { title: "Dicionário Cripto", href: "/dicionario-cripto" },
      { title: "BIP-110: Guerra do Espaço de Bloco", href: "/bitcoin/bip-110-guerra-espaco-bloco" },
    ],
  },
  {
    title: "Autocustódia & Segurança",
    icon: Lock,
    color: "text-sky-400",
    borderColor: "border-sky-500/[0.15]",
    bgColor: "bg-sky-500/[0.06]",
    links: [
      { title: "Autocustódia de Elite", href: "/autocustodia" },
      { title: "Hardware Wallet DIY", href: "/autocustodia/hardware-wallet-diy-bitcoin" },
      { title: "Mobilidade de Chaves", href: "/mobilidade-de-chaves" },
      { title: "Blindagem Contra Golpes", href: "/blindagem-golpes" },
      { title: "Gerador de Entropia", href: "/ferramentas" },
    ],
  },
  {
    title: "Soberania Financeira",
    icon: Globe,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/[0.15]",
    bgColor: "bg-emerald-500/[0.06]",
    links: [
      { title: "Hub de Soberania Financeira", href: "/soberania-financeira" },
      { title: "Neobankless", href: "/soberania-financeira/contas-internacionais/neobankless" },
      { title: "Bank of Georgia", href: "/soberania-financeira/contas-internacionais/bank-of-georgia" },
      { title: "Wise", href: "/soberania-financeira/contas-internacionais/wise" },
      { title: "Payoneer", href: "/soberania-financeira/contas-internacionais/payoneer" },
      { title: "GrabrFi", href: "/soberania-financeira/contas-internacionais/grabrfi" },
      { title: "Contas Offshore: Top 10", href: "/soberania-financeira/contas-offshore/top-10" },
      { title: "Abertura Remota", href: "/soberania-financeira/contas-offshore/abertura-remota" },
      { title: "Exchanges sem KYC", href: "/soberania-financeira/exchanges-sem-kyc" },
      { title: "KYCnot.me", href: "/soberania-financeira/exchanges-sem-kyc/kycnot-me" },
      { title: "Optima Exchange", href: "/soberania-financeira/exchanges-sem-kyc/optima-exchange" },
      { title: "Pegasus Swap", href: "/soberania-financeira/exchanges-sem-kyc/pegasus-swap" },
      { title: "BRICS Pay", href: "/soberania-financeira/brics-pay" },
      { title: "KuCoin Pay + PIX", href: "/soberania-financeira/kucoin-pay-pix" },
      { title: "PIX → Cripto", href: "/pix-cripto" },
      { title: "Índice de Soberania", href: "/indice-de-soberania-financeira" },
      { title: "Teoria das Bandeiras", href: "/teoria-das-bandeiras" },
      { title: "Taxa de Fuga", href: "/taxa-de-fuga" },
    ],
  },
  {
    title: "Alertas & Economia",
    icon: AlertTriangle,
    color: "text-red-400",
    borderColor: "border-red-500/[0.15]",
    bgColor: "bg-red-500/[0.06]",
    links: [
      { title: "Central de Alertas", href: "/alertas" },
      { title: "CBDC Brasil: O Perigo", href: "/alertas/cbdc-brasil" },
      { title: "DePIX: Reporte 2026", href: "/alertas/depix-reporte-2026" },
      { title: "Proibição do Dinheiro Vivo", href: "/proibicao-dinheiro" },
      { title: "Confisco de 1990", href: "/confisco-1990" },
      { title: "Inflação: Imposto Oculto", href: "/inflacao-imposto-oculto" },
      { title: "História do Dinheiro", href: "/historia-do-dinheiro" },
      { title: "Economia Paralela", href: "/economia-paralela" },
    ],
  },
  {
    title: "Soberania Orgânica — Base 72",
    icon: Flame,
    color: "text-rose-400",
    borderColor: "border-rose-500/[0.15]",
    bgColor: "bg-rose-500/[0.06]",
    links: [
      { title: "Hub do Soberania Orgânica", href: "/soberania-organica" },
      { title: "Kit Tático 72h", href: "/soberania-organica/kit-72h" },
      { title: "Purificação de Água", href: "/soberania-organica/purificacao-agua" },
      { title: "Protocolos de Apagão", href: "/soberania-organica/protocolos-apagao" },
      { title: "Abrigo de Emergência", href: "/soberania-organica/abrigo-emergencia" },
      { title: "Comunicação Offline", href: "/soberania-organica/comunicacao-offline" },
      { title: "Navegação Primária", href: "/soberania-organica/navegacao-primaria" },
      { title: "Conservação e Armazenamento", href: "/soberania-organica/conservacao-armazenamento" },
    ],
  },
  {
    title: "Soberania Alimentar",
    icon: Sprout,
    color: "text-lime-400",
    borderColor: "border-lime-500/[0.15]",
    bgColor: "bg-lime-500/[0.06]",
    links: [
      { title: "Horta Urbana", href: "/soberania-organica/horta-urbana" },
      { title: "Solo e Fertilidade", href: "/soberania-organica/solo-fertilidade" },
      { title: "Produção em Pequenos Espaços", href: "/soberania-organica/producao-pequenos-espacos" },
      { title: "Proteína Sustentável", href: "/soberania-organica/proteina-sustentavel" },
    ],
  },
  {
    title: "Autonomia Biológica & Saúde",
    icon: Heart,
    color: "text-pink-400",
    borderColor: "border-pink-500/[0.15]",
    bgColor: "bg-pink-500/[0.06]",
    links: [
      { title: "Hub Autonomia Biológica", href: "/soberania-organica/autonomia-biologica" },
      { title: "Primeiros Socorros", href: "/soberania-organica/primeiros-socorros" },
      { title: "Avaliação de Sinais Vitais", href: "/soberania-organica/avaliacao-sinais" },
      { title: "Saúde Preventiva", href: "/soberania-organica/saude-preventiva" },
      { title: "Fitoterapia Aplicada", href: "/soberania-organica/fitoterapia-aplicada" },
      { title: "Controle de Vetores", href: "/soberania-organica/controle-vetores" },
      { title: "Sabedoria Ancestral", href: "/soberania-organica/sabedoria-ancestral" },
      { title: "Babosa & Acemannan", href: "/soberania-organica/babosa-acemannan" },
      { title: "Óleo de Rícino: Dossiê Biohacker", href: "/soberania-organica/oleo-ricino-biohacker" },
      { title: "Tóxicos Ocultos", href: "/soberania-organica/toxicos-ocultos" },
      { title: "Toxinas Alimentares", href: "/soberania-organica/toxicos-ocultos/toxinas-alimentares" },
      { title: "Toxinas Ambientais", href: "/soberania-organica/toxicos-ocultos/toxinas-ambientais" },
      { title: "Manipulação Informacional", href: "/soberania-organica/toxicos-ocultos/manipulacao-informacional" },
      { title: "Dependência Tecnológica", href: "/soberania-organica/toxicos-ocultos/dependencia-tecnologica" },
    ],
  },
  {
    title: "Conhecimento Perdido",
    icon: BookOpen,
    color: "text-violet-400",
    borderColor: "border-violet-500/[0.15]",
    bgColor: "bg-violet-500/[0.06]",
    links: [
      { title: "Hub Conhecimento Perdido", href: "/soberania-organica/conhecimento-perdido" },
      { title: "Contexto Histórico", href: "/conhecimento-perdido/contexto-historico" },
      { title: "Base Fisiológica", href: "/conhecimento-perdido/base-fisiologica" },
      { title: "Segurança e Limites", href: "/conhecimento-perdido/seguranca-e-limites" },
      { title: "Aplicação Prática", href: "/conhecimento-perdido/aplicacao-pratica" },
      { title: "Continuidade Familiar", href: "/conhecimento-perdido/continuidade-familiar" },
    ],
  },
  {
    title: "Educação & Biblioteca",
    icon: BookOpen,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/[0.15]",
    bgColor: "bg-cyan-500/[0.06]",
    links: [
      { title: "Audiobooks Soberanos", href: "/audiobooks" },
      { title: "E-books e PDFs", href: "/ebooks" },
      { title: "Silêncio e Queda", href: "/silencio-queda" },
      { title: "Índice do Despertar", href: "/indice-do-despertar" },
      { title: "Protocolo Inicial", href: "/protocolo-inicial" },
      { title: "Arsenal Completo", href: "/arsenal" },
    ],
  },
];

export default function MapaDaSoberania() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <SeoHead path="/mapa-da-soberania" />

      <div className="min-h-screen" style={{ background: '#050808' }}>
        {/* VFX */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[140px] top-[10%] left-[5%] animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-rose-500/[0.03] blur-[120px] bottom-[20%] right-[10%] animate-pulse" style={{ animationDuration: '14s' }} />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-20 pb-12 px-5 md:px-8 max-w-6xl mx-auto text-center">
          <motion.div {...fade(0)}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/[0.1] border border-amber-500/[0.2] mb-6">
              <Map size={28} className="text-amber-400" />
            </div>
            <span className="text-amber-500 font-mono text-xs font-bold tracking-[0.3em] uppercase block mb-3">ÍNDICE MESTRE</span>
            <h1 className="text-4xl md:text-6xl font-black text-stone-100 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
              Mapa da Soberania
            </h1>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Todo o conhecimento proibido, organizado. <strong className="text-stone-200">97+ páginas</strong> distribuídas em silos estratégicos de soberania individual.
            </p>
          </motion.div>
        </div>

        {/* Silos Grid */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SILOS.map((silo, idx) => (
              <motion.div
                key={silo.title}
                {...fade(idx * 0.05)}
                className={`rounded-2xl border p-5 md:p-6 ${silo.bgColor} ${silo.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <silo.icon size={20} className={silo.color} />
                  <h2 className="text-base font-bold text-stone-200">{silo.title}</h2>
                </div>
                <div className="space-y-1">
                  {silo.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block text-sm text-stone-500 hover:text-stone-200 transition-colors py-1 pl-2 border-l border-white/[0.06] hover:border-white/[0.2]"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Bottom */}
          <motion.div {...fade(0.3)} className="text-center mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-stone-500 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              <Shield size={14} /> Voltar à Base
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
