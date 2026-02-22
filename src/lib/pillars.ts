import cardEconomia from "@/assets/card-economia.jpg";
import cardBitcoin from "@/assets/card-bitcoin.jpg";
import cardFilosofia from "@/assets/card-filosofia.jpg";
import cardEstrategias from "@/assets/card-estrategias.jpg";

export interface PillarResource {
  type: "ebook" | "audio" | "tool";
  title: string;
  description: string;
  action: string;
  route?: string;
}

export interface Pillar {
  slug: string;
  level: string;
  badge: string;
  title: string;
  subtitle: string;
  cover: string;
  impactText: string;
  impactSub: string;
  resources: PillarResource[];
}

export const pillars: Pillar[] = [
  {
    slug: "economia",
    level: "NÍVEL 01",
    badge: "DESPERTAR MONETÁRIO",
    title: "Economia que Faz Sentido",
    subtitle: "A base para entender como o sistema fiduciário rouba o tempo do indivíduo.",
    cover: cardEconomia,
    impactText: "Você trabalha 5 meses por ano só para pagar impostos. E nos outros 7, a inflação devora o que sobrou. Isso não é economia — é extorsão legalizada.",
    impactSub: "Antes de proteger seu dinheiro, você precisa entender por que ele derrete. Este é o ponto zero da soberania.",
    resources: [
      {
        type: "ebook",
        title: "O Caminho da Soberania",
        description: "O manual que desmonta o mito do dinheiro estatal e revela a engenharia por trás do confisco silencioso.",
        action: "Baixar Ebook",
      },
      {
        type: "audio",
        title: "Série: Mitos Econômicos",
        description: "7 episódios que destroem as mentiras que você aprendeu na escola sobre dinheiro, bancos e governo.",
        action: "Ouvir Agora",
      },
      {
        type: "tool",
        title: "Calculadora da Verdade Salarial",
        description: "Descubra quanto do seu salário é realmente seu após impostos diretos, indiretos e inflação acumulada.",
        action: "Calcular Agora",
        route: "/taxa-de-fuga",
      },
    ],
  },
  {
    slug: "bitcoin",
    level: "NÍVEL 02",
    badge: "SOBERANIA BITCOIN",
    title: "Bitcoin sem Enrolação",
    subtitle: "A transição da teoria para a posse real do capital.",
    cover: cardBitcoin,
    impactText: "Enquanto você guarda dinheiro no banco, o banco empresta 10x o que você depositou. Seu saldo é uma promessa. Bitcoin é posse.",
    impactSub: "Autocustódia não é paranoia — é a única forma de garantir que ninguém congele, confisque ou inflacione o que é seu.",
    resources: [
      {
        type: "ebook",
        title: "Guia de Hardware Wallets",
        description: "Comparativo técnico das melhores cold wallets do mercado com tutorial passo-a-passo de configuração segura.",
        action: "Baixar Guia",
      },
      {
        type: "audio",
        title: "Tutorial de Autocustódia",
        description: "Áudio-guia completo: da criação da seed phrase à primeira transação soberana sem intermediários.",
        action: "Ouvir Tutorial",
      },
      {
        type: "tool",
        title: "Simulador Bitcoin vs Imóveis",
        description: "Compare a valorização real do Bitcoin contra imóveis nos últimos 10 anos com dados verificáveis.",
        action: "Abrir Simulador",
        route: "/bitcoin-vs-imovel",
      },
    ],
  },
  {
    slug: "saida",
    level: "NÍVEL 03",
    badge: "DEFESA PATRIMONIAL",
    title: "Estratégias de Saída",
    subtitle: "Independência operacional: protocolos de herança, privacidade e liberdade geográfica.",
    cover: cardEstrategias,
    impactText: "O Estado não precisa te prender para te controlar. Basta congelar sua conta, bloquear seu CPF e cancelar seu passaporte. Você já é refém — só não percebeu.",
    impactSub: "Estratégias de saída não são teoria conspiratória. São o plano B que separa quem sobrevive de quem implora.",
    resources: [
      {
        type: "ebook",
        title: "Protocolos de Herança Cripto",
        description: "Como estruturar multisig e timelock para que seus herdeiros acessem seu patrimônio sem inventário nem burocracia estatal.",
        action: "Baixar Protocolo",
      },
      {
        type: "audio",
        title: "Privacidade On-chain",
        description: "Técnicas avançadas de privacidade em transações Bitcoin: CoinJoin, PayJoin e boas práticas de UTXO management.",
        action: "Ouvir Série",
      },
      {
        type: "tool",
        title: "PIX via Bitcoin (Lightning)",
        description: "Receba pagamentos PIX convertidos automaticamente em Bitcoin na sua wallet. Sem banco, sem KYC.",
        action: "Configurar Agora",
      },
    ],
  },
  {
    slug: "filosofia",
    level: "NÍVEL 04",
    badge: "COSMOVISÃO & DISCERNIMENTO",
    title: "Filosofia da Liberdade",
    subtitle: "Ética, propriedade e os fundamentos morais da soberania individual.",
    cover: cardFilosofia,
    impactText: "Democracia é dois lobos e uma ovelha votando o que terão para o jantar. Liberdade é a ovelha armada contestando a votação.",
    impactSub: "Sem fundamento filosófico, sua soberania financeira é só técnica. Com ele, é convicção inabalável.",
    resources: [
      {
        type: "ebook",
        title: "A Ética da Liberdade",
        description: "A obra definitiva de Murray Rothbard sobre direitos de propriedade, não-agressão e a imoralidade do Estado.",
        action: "Baixar Ebook",
      },
      {
        type: "audio",
        title: "Teologia do Trabalho e Riqueza",
        description: "Estudos sobre mordomia cristã, propriedade privada e o dever moral de prosperar sem depender de César.",
        action: "Ouvir Estudos",
      },
      {
        type: "tool",
        title: "Biblioteca de Discernimento",
        description: "Curadoria de textos essenciais sobre liberdade individual, economia austríaca e filosofia política.",
        action: "Acessar Biblioteca",
      },
    ],
  },
];
