import { Eye, Lock, Ban, MapPin, Shield, CreditCard, Globe } from 'lucide-react';

/* ───────────── LIMITES INTERNACIONAIS ───────────── */
export const LIMITES_INTERNACIONAIS = [
  { pais: 'França', limite: '€ 1.000', status: 'Em vigor', flag: '🇫🇷' },
  { pais: 'Espanha', limite: '€ 1.000', status: 'Em vigor', flag: '🇪🇸' },
  { pais: 'Itália', limite: '€ 5.000', status: 'Em vigor', flag: '🇮🇹' },
  { pais: 'Grécia', limite: '€ 500', status: 'Em vigor', flag: '🇬🇷' },
  { pais: 'Portugal', limite: '€ 3.000', status: 'Em vigor', flag: '🇵🇹' },
  { pais: 'Bélgica', limite: '€ 3.000', status: 'Em vigor', flag: '🇧🇪' },
];

/* ───────────── FERRAMENTAS ───────────── */
export const FERRAMENTAS = [
  {
    icon: MapPin,
    titulo: 'Teoria das Bandeiras',
    subtitulo: 'Diversificação Jurisdicional',
    descricao: 'Sair financeiramente do Brasil não exige sair fisicamente. Documentações como a Cédula Paraguaia ou ID de Palau permitem abrir contas em exchanges internacionais, operar fora do alcance de um único governo e distribuir sua existência financeira entre múltiplas jurisdições.',
    destaque: 'Quanto mais bandeiras, menor o risco de confisco centralizado.',
  },
  {
    icon: Shield,
    titulo: 'Bitcoin P2P — Sem Intermediários',
    subtitulo: 'Exchanges Descentralizadas',
    descricao: 'Plataformas como Bisq, Spike to Spike e RoboSats permitem comprar e vender Bitcoin diretamente entre indivíduos, sem exigir documentos invasivos (KYC). Você negocia ponto a ponto, como o dinheiro foi projetado para funcionar — antes do estado sequestrar o conceito.',
    destaque: 'Sem KYC = Sem registro permanente vinculado à sua identidade.',
  },
  {
    icon: CreditCard,
    titulo: 'Cartões Cripto Sem KYC',
    subtitulo: 'Gastos Com Privacidade',
    descricao: 'Existem serviços que oferecem cartões de débito vinculados a criptomoedas sem exigir verificação de identidade. Isso significa que você pode gastar seus satoshis no dia a dia sem criar um rastro financeiro permanente vinculado ao seu CPF ou passaporte.',
    destaque: 'Comprar com privacidade. Gastar com privacidade. Ciclo completo.',
  },
  {
    icon: Globe,
    titulo: 'Contas Internacionais',
    subtitulo: 'Diversificação Bancária Global',
    descricao: 'Com documentação estrangeira em mãos, você pode abrir contas em mais de 10 jurisdições diferentes. Cada conta é uma camada adicional de proteção contra bloqueios, confiscos e decisões arbitrárias de um único governo sobre o seu patrimônio.',
    destaque: 'Dinheiro distribuído é dinheiro protegido.',
  },
];

/* ───────────── CONSEQUÊNCIAS ───────────── */
export const CONSEQUENCIAS = [
  {
    icon: Eye,
    titulo: 'Monitoramento Total',
    descricao: 'Todas as transações podem ser monitoradas em tempo real. Cada café, cada presente, cada doação. O Estado saberá exatamente como, quando e com quem você gasta cada centavo.',
  },
  {
    icon: Lock,
    titulo: 'Bloqueios Instantâneos',
    descricao: 'Seu dinheiro pode ser bloqueado, congelado ou confiscado com um clique. Sem aviso. Sem julgamento. Sem recurso imediato. Você depende da "boa vontade" de quem controla o sistema.',
  },
  {
    icon: Ban,
    titulo: 'Privacidade Eliminada',
    descricao: 'A privacidade financeira deixa de existir. Não há mais economia informal, não há mais liberdade de transacionar sem prestação de contas. Cada real movimentado é um dado coletado contra você.',
  },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'O governo vai proibir o dinheiro vivo no Brasil?',
    resposta: 'Não necessariamente uma proibição total imediata. O PL 3.951/2019 cria o mecanismo legal para que o Conselho Monetário Nacional estabeleça limites para transações em dinheiro em espécie. Na prática, isso abre um precedente para restrições progressivas — hoje R$ 10.000, amanhã pode ser R$ 1.000. A direção é clara: digitalização forçada para controle total.',
  },
  {
    pergunta: 'O que é o PL 3951/2019?',
    resposta: 'É um Projeto de Lei aprovado pela Comissão de Constituição e Justiça (CCJ) que permite a criação de limites para pagamentos realizados em dinheiro vivo no Brasil. Inicialmente, tentou-se ilegalizar transações acima de R$ 10.000 em espécie, com possibilidade de confisco. Após resistência, o texto foi suavizado, mas o precedente legislativo permanece ativo.',
  },
  {
    pergunta: 'Existe limite de dinheiro vivo na Europa?',
    resposta: 'Sim. Diversos países europeus já possuem limites rigorosos: França e Espanha limitam a €1.000, Grécia a €500, Itália a €5.000, Portugal e Bélgica a €3.000. A União Europeia planeja um limite continental de €10.000. Todos esses países começaram com limites mais altos e foram reduzindo progressivamente.',
  },
  {
    pergunta: 'Como comprar Bitcoin sem KYC?',
    resposta: 'Existem plataformas descentralizadas como Bisq, Spike to Spike e RoboSats que permitem a compra e venda de Bitcoin diretamente entre pessoas (P2P), sem exigir verificação de identidade (KYC). Essas plataformas são legais e funcionam como o dinheiro foi projetado para funcionar: transações diretas entre indivíduos.',
  },
  {
    pergunta: 'O que é a Teoria das Bandeiras?',
    resposta: 'É uma estratégia de diversificação jurisdicional que consiste em distribuir sua vida financeira, documentação e patrimônio entre múltiplas jurisdições (países). Isso inclui obter documentos como a Cédula Paraguaia, abrir contas internacionais e operar em diferentes exchanges pelo mundo, reduzindo o risco de um único governo controlar todo o seu patrimônio.',
  },
  {
    pergunta: 'Privacidade financeira é ilegal?',
    resposta: 'Não. Privacidade financeira é um direito fundamental. Utilizar ferramentas legais para proteger sua privacidade — como exchanges P2P, cartões sem KYC ou contas internacionais — é completamente legal. O que muda é o nível de informação que você voluntariamente entrega ao Estado. Manter o poder de decisão na sua mão não é crime.',
  },
  {
    pergunta: 'O que acontece quando o dinheiro físico é abolido?',
    resposta: 'Três mudanças fundamentais ocorrem: (1) todas as transações passam a ser monitoradas em tempo real; (2) bloqueios e confiscos financeiros se tornam instantâneos e sem necessidade de ordem judicial presencial; (3) a privacidade financeira desaparece completamente, eliminando qualquer forma de economia informal ou transação privada.',
  },
  {
    pergunta: 'O que é autocustódia de Bitcoin?',
    resposta: 'Autocustódia significa que você controla as chaves privadas do seu Bitcoin — sem intermediários, sem exchanges, sem bancos. Seus bitcoins ficam em uma carteira que só você pode acessar. Isso garante que nenhum governo, banco ou plataforma pode congelar, confiscar ou bloquear seus fundos.',
  },
  {
    pergunta: 'Existe limite para dinheiro vivo no Brasil?',
    resposta: 'Atualmente não existe um limite legal definido para transações em dinheiro vivo no Brasil. No entanto, o PL 3.951/2019, aprovado pela CCJ, cria o mecanismo para que o Conselho Monetário Nacional possa estabelecer esses limites a qualquer momento — sem necessidade de nova aprovação legislativa. Transações acima de R$ 10.000 já devem ser comunicadas ao COAF por instituições financeiras.',
  },
  {
    pergunta: 'Quanto dinheiro posso carregar em espécie?',
    resposta: 'No Brasil, não há lei que proíba carregar dinheiro em espécie. No entanto, valores acima de R$ 10.000 devem ser declarados ao cruzar fronteiras internacionais. Internamente, instituições financeiras são obrigadas a reportar movimentações suspeitas ao COAF. Com o avanço do PL 3.951, limites para pagamentos em espécie podem ser definidos pelo Conselho Monetário Nacional no futuro.',
  },
];

/* ───────────── NAV ITEMS ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'O Fim do Dinheiro Vivo' },
  { id: 'video', label: 'Assista ao Vídeo' },
  { id: 'pl3951', label: 'PL 3951 — O Precedente' },
  { id: 'agenda-global', label: 'A Agenda Global' },
  { id: 'timeline', label: 'Linha do Tempo' },
  { id: 'consequencias', label: 'O Que Muda Pra Você' },
  { id: 'contradicao', label: 'A Contradição Fatal' },
  { id: 'ferramentas', label: 'Arsenal de Privacidade' },
  { id: 'autoridade', label: 'Universidade Satoshi' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'O Poder Na Sua Mão' },
];

/* ───────────── ESCADA DA RESTRIÇÃO ───────────── */
export const ESCADA_RESTRICAO = [
  { valor: 'R$ 10.000', desc: 'Primeira tentativa — confisco e ilegalização de transações acima desse valor.' },
  { valor: 'R$ 5.000', desc: 'O próximo degrau lógico. Menos barulho político, mesmo impacto no controle.' },
  { valor: 'R$ 1.000', desc: 'O objetivo final. Nessa faixa, até compras rotineiras ficam sob vigilância total.' },
  { valor: 'R$ 0', desc: 'O endgame. Dinheiro físico completamente abolido. Tudo digital. Tudo rastreado. Tudo tributado.' },
];

/* ───────────── LINHA DO TEMPO ───────────── */
export const TIMELINE_ITEMS = [
  { ano: '2020', evento: 'PIX lançado', desc: 'O governo cria a infraestrutura de pagamentos digitais instantâneos — gratuita, rápida e totalmente rastreável.' },
  { ano: '2022', evento: 'DREX anunciado', desc: 'O Banco Central anuncia o Real Digital (DREX), moeda programável com controle total sobre cada transação.' },
  { ano: '2023', evento: 'Discussões sobre CBDC avançam', desc: 'Testes piloto do DREX começam com instituições financeiras. A infraestrutura de controle se consolida.' },
  { ano: '2025', evento: 'PL 3.951 avança na CCJ', desc: 'O projeto que limita transações em dinheiro vivo é aprovado na Comissão de Constituição e Justiça.' },
  { ano: '2026+', evento: 'Limites ao dinheiro vivo', desc: 'O precedente está aberto. Limites podem ser definidos a qualquer momento pelo Conselho Monetário Nacional.' },
];

/* ───────────── O QUE O PL NÃO FAZ ───────────── */
export const PL_NAO_FAZ = [
  'Não proíbe o dinheiro vivo imediatamente',
  'Não define limites específicos neste momento',
  'Não criminaliza a posse de dinheiro em espécie',
];

export const PL_MAS_FAZ = 'Cria o mecanismo legal para que o Conselho Monetário Nacional defina limites a qualquer momento — sem necessidade de nova aprovação legislativa.';

