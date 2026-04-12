import {
  Compass, ShieldAlert, Shield, Globe, BookOpen, Headphones, Library,
  Wrench, QrCode, Zap, LayoutGrid, Bitcoin, Lock, TrendingUp,
  AlertTriangle, Leaf, FlaskConical, Skull, Map, GraduationCap,
  Landmark, CreditCard, ArrowRightLeft, Building2, Wallet,
  Fingerprint, Radio, Droplets, Sun, Heart, Bug, Sprout,
  Package, Beef, Mountain, Scroll, Brain, Flame, FileWarning,
  Smartphone, Factory, BookOpenCheck
} from "lucide-react";

export interface NavItem {
  label: string;
  route?: string;
  targetId?: string;
  icon?: any;
  badge?: string;
  alert?: boolean;
}

export interface NavGroup {
  label: string;
  icon: any;
  color?: string;
  items: NavItem[];
}

export const topNavItems: NavItem[] = [
  { label: "Por onde começar?", route: "/por-onde-comecar", icon: Compass },
  { label: "Protocolo Inicial", route: "/protocolo-inicial", icon: ShieldAlert, alert: true },
  { label: "Manifesto", targetId: "manifesto", icon: LayoutGrid },
];

export const navGroups: NavGroup[] = [
  {
    label: "Bitcoin — Fundamentos",
    icon: Bitcoin,
    color: undefined,
    items: [
      { label: "O que é Bitcoin?", route: "/o-que-e-bitcoin" },
      { label: "Noções Essenciais", route: "/nocoes-bitcoin" },
      { label: "Chaves Privadas", route: "/chaves" },
      { label: "Transações", route: "/transacoes" },
      { label: "Mineração", route: "/mineracao" },
      { label: "Blockchain", route: "/blockchain" },
      { label: "21 Milhões", route: "/21-milhoes" },
      { label: "Halving", route: "/halving-bitcoin" },
      { label: "Supply Shock", route: "/supply-shock" },
      { label: "Volatilidade", route: "/volatilidade" },
      { label: "Lastro", route: "/lastro" },
      { label: "Futuro do Bitcoin", route: "/futuro-bitcoin" },
      { label: "BIP-110", route: "/bitcoin/bip-110-guerra-espaco-bloco" },
      { label: "Polymarket IA + BTC", route: "/polymarket-rede-neural-btc", badge: "Novo" },
    ],
  },
  {
    label: "Segurança & Autocustódia",
    icon: Lock,
    color: undefined,
    items: [
      { label: "Bitcoin Seguro", route: "/bitcoin-seguro" },
      { label: "Autocustódia", route: "/autocustodia" },
      { label: "Blindagem Golpes", route: "/blindagem-golpes" },
      { label: "Lightning Network", route: "/lightning" },
      { label: "Mobilidade de Chaves", route: "/mobilidade-de-chaves" },
      { label: "Hardware Wallet DIY", route: "/autocustodia/hardware-wallet-diy-bitcoin" },
      { label: "Krux + Passphrase", route: "/autocustodia/krux-passphrase-bluewallet", badge: "Novo" },
      { label: "Comprar BTC Anônimo", route: "/comprar-bitcoin-anonimo" },
    ],
  },
  {
    label: "Economia & Filosofia",
    icon: TrendingUp,
    color: undefined,
    items: [
      { label: "Economia", route: "/economia" },
      { label: "Bitcoin vs Fiat", route: "/bitcoin-vs-fiat" },
      { label: "Bitcoin vs Imóvel", route: "/bitcoin-vs-imovel" },
      { label: "Bitcoin vs Altcoins", route: "/bitcoin-vs-altcoins" },
      { label: "Taxa de Fuga", route: "/taxa-de-fuga" },
      { label: "Filosofia", route: "/filosofia" },
      { label: "Candlestick", route: "/candlestick" },
      { label: "Diversificação", route: "/diversificacao" },
      { label: "Inflação: Imposto Oculto", route: "/inflacao-imposto-oculto" },
      { label: "História do Dinheiro", route: "/historia-do-dinheiro" },
      { label: "Confisco 1990", route: "/confisco-1990" },
    ],
  },
  {
    label: "Soberania Financeira",
    icon: Globe,
    color: undefined,
    items: [
      { label: "Hub Financeiro", route: "/soberania-financeira" },
      { label: "Exchanges sem KYC", route: "/soberania-financeira/exchanges-sem-kyc" },
      { label: "KYCnot.me", route: "/soberania-financeira/exchanges-sem-kyc/kycnot-me" },
      { label: "Optima Exchange", route: "/soberania-financeira/exchanges-sem-kyc/optima-exchange" },
      { label: "Pegasus Swap", route: "/soberania-financeira/exchanges-sem-kyc/pegasus-swap" },
      { label: "Neobankless", route: "/soberania-financeira/contas-internacionais/neobankless" },
      { label: "Bank of Georgia", route: "/soberania-financeira/contas-internacionais/bank-of-georgia" },
      { label: "Wise", route: "/soberania-financeira/contas-internacionais/wise" },
      { label: "Payoneer", route: "/soberania-financeira/contas-internacionais/payoneer" },
      { label: "GrabrFi", route: "/soberania-financeira/contas-internacionais/grabrfi" },
      { label: "Contas Offshore Top 10", route: "/soberania-financeira/contas-offshore/top-10" },
      { label: "Abertura Remota", route: "/soberania-financeira/contas-offshore/abertura-remota" },
      { label: "BRICS Pay", route: "/soberania-financeira/brics-pay" },
      { label: "KuCoin Pay PIX", route: "/soberania-financeira/kucoin-pay-pix" },
      { label: "Dólar Virtual", route: "/dolar-virtual" },
      { label: "Cartão Bipa Bitcoin", route: "/bitpark-cartao-bitcoin", badge: "Novo" },
      { label: "Teoria das Bandeiras", route: "/teoria-das-bandeiras" },
    ],
  },
  {
    label: "Soberania Orgânica",
    icon: Leaf,
    color: undefined,
    items: [
      { label: "Hub Soberania Orgânica", route: "/soberania-organica" },
      { label: "Saúde Preventiva", route: "/soberania-organica/saude-preventiva" },
      { label: "Babosa & Acemannan", route: "/soberania-organica/babosa-acemannan", badge: "Dossiê" },
      { label: "Óleo de Rícino", route: "/soberania-organica/oleo-ricino-biohacker", badge: "Dossiê" },
      { label: "Autonomia Biológica", route: "/soberania-organica/autonomia-biologica" },
      { label: "Fitoterapia Aplicada", route: "/soberania-organica/fitoterapia-aplicada" },
      { label: "Horta Urbana", route: "/soberania-organica/horta-urbana" },
      { label: "Solo & Fertilidade", route: "/soberania-organica/solo-fertilidade" },
      { label: "Produção Pequenos Espaços", route: "/soberania-organica/producao-pequenos-espacos" },
      { label: "Proteína Sustentável", route: "/soberania-organica/proteina-sustentavel" },
      { label: "Conservação", route: "/soberania-organica/conservacao-armazenamento" },
      { label: "Primeiros Socorros", route: "/soberania-organica/primeiros-socorros" },
      { label: "Avaliação de Sinais", route: "/soberania-organica/avaliacao-sinais" },
      { label: "Controle de Vetores", route: "/soberania-organica/controle-vetores" },
      { label: "Sabedoria Ancestral", route: "/soberania-organica/sabedoria-ancestral" },
      { label: "Conhecimento Perdido", route: "/soberania-organica/conhecimento-perdido" },
    ],
  {
    label: "Sobrevivência & Resiliência",
    icon: Shield,
    color: undefined,
    items: [
      { label: "Kit 72h", route: "/soberania-organica/kit-72h" },
      { label: "Purificação de Água", route: "/soberania-organica/purificacao-agua" },
      { label: "Protocolos de Apagão", route: "/soberania-organica/protocolos-apagao" },
      { label: "Abrigo Emergência", route: "/soberania-organica/abrigo-emergencia" },
      { label: "Comunicação Offline", route: "/soberania-organica/comunicacao-offline" },
      { label: "Navegação Primária", route: "/soberania-organica/navegacao-primaria" },
    ],
  },
  {
    label: "Alertas & Dossiês",
    icon: AlertTriangle,
    color: undefined,
    items: [
      { label: "Hub de Alertas", route: "/alertas" },
      { label: "CBDC Brasil", route: "/alertas/cbdc-brasil" },
      { label: "Fim do Dinheiro Vivo", route: "/alertas/fim-do-dinheiro-vivo" },
      { label: "DEPIX Reporte 2026", route: "/alertas/depix-reporte-2026" },
      { label: "Confisco de Bitcoin", route: "/alertas/governo-tomar-bitcoins", alert: true },
      { label: "Tóxicos Ocultos", route: "/soberania-organica/toxicos-ocultos" },
      { label: "Toxinas Alimentares", route: "/soberania-organica/toxicos-ocultos/toxinas-alimentares" },
      { label: "Toxinas Ambientais", route: "/soberania-organica/toxicos-ocultos/toxinas-ambientais" },
      { label: "Manipulação Informacional", route: "/soberania-organica/toxicos-ocultos/manipulacao-informacional" },
      { label: "Dependência Tecnológica", route: "/soberania-organica/toxicos-ocultos/dependencia-tecnologica" },
      { label: "Índice do Despertar", route: "/indice-do-despertar" },
    ],
  },
  {
    label: "Saída & Infraestrutura",
    icon: ArrowRightLeft,
    color: undefined,
    items: [
      { label: "Estratégias de Saída", route: "/saida" },
      { label: "Gateway", route: "/saida/gateway" },
      { label: "PIX Cripto", route: "/pix-cripto" },
      { label: "Infraestrutura", route: "/infraestrutura" },
      { label: "Economia Paralela", route: "/economia-paralela" },
      { label: "Silêncio e Queda", route: "/silencio-queda" },
    ],
  },
  {
    label: "Biblioteca & Educação",
    icon: GraduationCap,
    color: undefined,
    items: [
      { label: "Educação", route: "/educacao" },
      { label: "Audiobooks", route: "/audiobooks" },
      { label: "E-books", route: "/ebooks" },
      { label: "Alfabeto Cripto", route: "/dicionario-cripto" },
      { label: "Ferramentas", route: "/ferramentas" },
      { label: "Arsenal", route: "/arsenal" },
      { label: "Mapa da Soberania", route: "/mapa-da-soberania" },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { label: "Mapa da Jornada", icon: Map },
  { label: "Apoio Lightning", icon: Zap, targetId: "apoio" },
];
