import { Eye, Lock, Ban, Cpu, Zap, Shield, Globe, Wallet, Code, Server, AlertTriangle, Landmark } from 'lucide-react';

/* ───────────── NAV ITEMS ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'O Que É o DREX' },
  { id: 'video', label: 'Assista ao Vídeo' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'diferenca', label: 'DREX vs Bitcoin' },
  { id: 'timeline', label: 'Linha do Tempo' },
  { id: 'riscos', label: 'Os 5 Riscos Reais' },
  { id: 'erro-comum', label: 'O Erro Fatal' },
  { id: 'arsenal', label: 'Arsenal de Defesa' },
  { id: 'autoridade', label: 'Universidade Satoshi' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'A Escolha É Sua' },
];

/* ───────────── CBDC GLOBAL ───────────── */
export const CBDC_GLOBAL = [
  { pais: 'China', moeda: 'e-CNY', status: 'Piloto avançado', flag: '🇨🇳', pop: '1.4 bi' },
  { pais: 'Nigéria', moeda: 'eNaira', status: 'Lançado', flag: '🇳🇬', pop: '220 mi' },
  { pais: 'Bahamas', moeda: 'Sand Dollar', status: 'Lançado', flag: '🇧🇸', pop: '400 mil' },
  { pais: 'Índia', moeda: 'e-Rupee', status: 'Piloto', flag: '🇮🇳', pop: '1.4 bi' },
  { pais: 'União Europeia', moeda: 'Euro Digital', status: 'Em desenvolvimento', flag: '🇪🇺', pop: '450 mi' },
  { pais: 'EUA', moeda: 'Digital Dollar', status: 'Pesquisa', flag: '🇺🇸', pop: '330 mi' },
];

/* ───────────── COMO FUNCIONA ───────────── */
export const COMO_FUNCIONA_ETAPAS = [
  {
    titulo: 'Tokenização de Ativos',
    descricao: 'O DREX permite que ativos reais — imóveis, títulos, veículos — sejam representados digitalmente na blockchain do Banco Central. Isso parece inovação. Mas significa que o governo terá um registro digital completo de tudo o que você possui.',
    icon: Code,
  },
  {
    titulo: 'Smart Contracts Governamentais',
    descricao: 'Contratos inteligentes programáveis pelo Banco Central podem automatizar regras sobre o seu dinheiro. Impostos podem ser cobrados automaticamente. Transferências podem ser bloqueadas automaticamente. Limites de gasto podem ser impostos automaticamente. Sem aviso. Sem recurso.',
    icon: Cpu,
  },
  {
    titulo: 'Intermediação Obrigatória',
    descricao: 'Diferente do Bitcoin, que funciona peer-to-peer, o DREX exige intermediários — bancos e instituições financeiras autorizadas pelo BC. Você não pode usar DREX diretamente. Você precisa de permissão. E quem dá permissão pode tirá-la.',
    icon: Landmark,
  },
  {
    titulo: 'Rastreabilidade Total',
    descricao: 'Cada transação no DREX é registrada, monitorada e vinculada à sua identidade. Não existe anonimato. Não existe privacidade. Cada real movimentado é um dado coletado pelo Estado — em tempo real, para sempre.',
    icon: Eye,
  },
];

/* ───────────── DREX vs BITCOIN ───────────── */
export const COMPARACAO = [
  { aspecto: 'Controle', drex: 'Banco Central do Brasil', bitcoin: 'Nenhuma entidade — descentralizado' },
  { aspecto: 'Privacidade', drex: 'Zero — tudo rastreado', bitcoin: 'Pseudônimo — privacidade por design' },
  { aspecto: 'Oferta', drex: 'Ilimitada — pode ser impressa', bitcoin: 'Fixa — 21 milhões para sempre' },
  { aspecto: 'Confisco', drex: 'Possível com um clique', bitcoin: 'Impossível com autocustódia' },
  { aspecto: 'Programabilidade', drex: 'Pelo governo — contra você', bitcoin: 'Por você — a seu favor' },
  { aspecto: 'Permissão', drex: 'Necessária — o BC decide', bitcoin: 'Dispensável — permissionless' },
  { aspecto: 'Censura', drex: 'Transações podem ser bloqueadas', bitcoin: 'Resistente à censura' },
  { aspecto: 'Fronteiras', drex: 'Limitado ao Brasil', bitcoin: 'Global — sem fronteiras' },
];

/* ───────────── 5 RISCOS ───────────── */
export const RISCOS = [
  {
    icon: Eye,
    titulo: 'Vigilância Financeira Absoluta',
    descricao: 'Cada transação registrada em tempo real. Cada compra, cada doação, cada pagamento vinculado à sua identidade. O Estado saberá exatamente como, quando e com quem você gasta cada centavo — e poderá usar essa informação contra você a qualquer momento.',
    gravidade: 'CRÍTICO',
  },
  {
    icon: Lock,
    titulo: 'Dinheiro Programável Contra Você',
    descricao: 'Smart contracts governamentais podem definir regras sobre como, quando e onde você pode gastar seu dinheiro. Imagine um cenário onde seu DREX só pode ser gasto em estabelecimentos autorizados, com limites diários, em horários específicos. Parece ficção científica? A China já faz isso com o e-CNY.',
    gravidade: 'CRÍTICO',
  },
  {
    icon: Ban,
    titulo: 'Confisco Digital Instantâneo',
    descricao: 'Com dinheiro programável, o governo pode congelar, confiscar ou redirecionar seus fundos com um clique. Sem ordem judicial presencial. Sem aviso prévio. Sem recurso imediato. O Plano Collor 2.0 — só que dessa vez, digital e irreversível.',
    gravidade: 'CRÍTICO',
  },
  {
    icon: Zap,
    titulo: 'Eliminação do Dinheiro Físico',
    descricao: 'O DREX é a infraestrutura final para abolir o dinheiro em espécie. Quando toda a economia estiver digitalizada no sistema do BC, o dinheiro físico se torna "desnecessário". A consequência: zero privacidade financeira para 215 milhões de brasileiros.',
    gravidade: 'ALTO',
  },
  {
    icon: Server,
    titulo: 'Ponto Único de Falha',
    descricao: 'Todo o sistema depende da infraestrutura do Banco Central. Um ataque cibernético, uma falha técnica, uma decisão política — qualquer um desses eventos pode paralisar toda a economia do país. Com dinheiro físico, você ainda pode transacionar. Com DREX? Tudo para.',
    gravidade: 'ALTO',
  },
];

/* ───────────── FERRAMENTAS DE DEFESA ───────────── */
export const FERRAMENTAS = [
  {
    icon: Shield,
    titulo: 'Bitcoin com Autocustódia',
    subtitulo: 'Soberania Total',
    descricao: 'Armazene seus bitcoins em carteiras onde só você controla as chaves privadas. Nenhum governo, banco ou plataforma pode congelar, confiscar ou bloquear seus fundos. Isso é o oposto exato do DREX — é dinheiro que só obedece a você.',
    destaque: 'Suas chaves, seu Bitcoin. Sem chaves, sem Bitcoin.',
  },
  {
    icon: Globe,
    titulo: 'Diversificação Jurisdicional',
    subtitulo: 'Teoria das Bandeiras',
    descricao: 'Distribua sua vida financeira entre múltiplas jurisdições. Documentação estrangeira, contas internacionais, exchanges em diferentes países. Quanto mais bandeiras, menor o risco de um único governo — e um único DREX — controlar todo o seu patrimônio.',
    destaque: 'Não coloque todo o seu patrimônio sob uma única jurisdição.',
  },
  {
    icon: Wallet,
    titulo: 'Bitcoin P2P — Sem Intermediários',
    subtitulo: 'Exchanges Descentralizadas',
    descricao: 'Plataformas como Bisq, Spike to Spike e RoboSats permitem comprar e vender Bitcoin diretamente entre indivíduos, sem KYC. Enquanto o DREX exige intermediários autorizados pelo BC, o Bitcoin funciona como o dinheiro deveria: ponto a ponto.',
    destaque: 'Sem KYC = Sem registro permanente vinculado à sua identidade.',
  },
  {
    icon: Cpu,
    titulo: 'Lightning Network',
    subtitulo: 'Pagamentos Instantâneos',
    descricao: 'A Lightning Network permite transações de Bitcoin quase instantâneas e com taxas mínimas. É o "PIX do Bitcoin" — só que descentralizado, privado e sem a vigilância do Banco Central. Funciona globalmente, 24 horas por dia, 365 dias por ano.',
    destaque: 'Velocidade do PIX. Privacidade do dinheiro. Soberania do Bitcoin.',
  },
];

/* ───────────── TIMELINE ───────────── */
export const TIMELINE_ITEMS = [
  { ano: '2020', evento: 'PIX é lançado', desc: 'O governo cria a infraestrutura de pagamentos digitais instantâneos — gratuita, rápida e totalmente rastreável. A isca perfeita.' },
  { ano: '2022', evento: 'DREX é anunciado', desc: 'O Banco Central anuncia oficialmente o projeto do Real Digital (DREX) — uma moeda digital programável com controle total sobre cada transação.' },
  { ano: '2023', evento: 'Piloto com bancos', desc: 'Testes piloto do DREX começam com instituições financeiras selecionadas. A infraestrutura de controle se consolida em silêncio.' },
  { ano: '2024', evento: 'Testes de tokenização', desc: 'O BC testa tokenização de títulos públicos e depósitos bancários no ambiente DREX. A fusão entre dinheiro e vigilância avança.' },
  { ano: '2025', evento: 'Expansão dos testes', desc: 'Mais instituições entram no piloto. Casos de uso se multiplicam: imóveis, veículos, contratos. O cerco se fecha.' },
  { ano: '2026+', evento: 'Lançamento público', desc: 'O DREX se torna disponível para a população. O dinheiro programável do governo entra na vida de 215 milhões de brasileiros.' },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'O que é o DREX?',
    resposta: 'O DREX (antes chamado de Real Digital) é a moeda digital do Banco Central do Brasil — uma CBDC (Central Bank Digital Currency). Diferente do PIX, que é um sistema de pagamentos, o DREX é uma nova forma de dinheiro: totalmente digital, programável pelo governo e rastreável em cada transação.',
  },
  {
    pergunta: 'DREX é o mesmo que Bitcoin?',
    resposta: 'Absolutamente não. O Bitcoin é descentralizado, tem oferta fixa de 21 milhões de unidades, é resistente à censura e funciona sem intermediários. O DREX é centralizado no Banco Central, tem oferta ilimitada (pode ser "impresso"), permite censura e confisco, e exige intermediários autorizados. São opostos filosóficos e tecnológicos.',
  },
  {
    pergunta: 'O DREX vai substituir o dinheiro físico?',
    resposta: 'Oficialmente, o Banco Central afirma que não. Mas a infraestrutura do DREX torna o dinheiro físico progressivamente obsoleto. Quando toda a economia operar digitalmente, manter dinheiro em espécie se tornará cada vez mais difícil e custoso — até que simplesmente desapareça.',
  },
  {
    pergunta: 'O governo pode bloquear meu DREX?',
    resposta: 'Sim. Como o DREX é controlado pelo Banco Central e opera através de intermediários autorizados, o governo pode congelar, bloquear ou confiscar seus fundos digitalmente. Isso pode ser feito instantaneamente, sem necessidade de ordem judicial presencial.',
  },
  {
    pergunta: 'DREX como funciona na prática?',
    resposta: 'O DREX funciona em uma blockchain permissionada (Hyperledger Besu) controlada pelo Banco Central. Instituições financeiras autorizadas tokenizam depósitos e ativos. Você acessa o DREX através de bancos e fintechs — nunca diretamente. Cada transação é registrada, monitorada e vinculada à sua identidade fiscal.',
  },
  {
    pergunta: 'O que é uma CBDC?',
    resposta: 'CBDC significa Central Bank Digital Currency — Moeda Digital de Banco Central. É dinheiro digital emitido e controlado pelo governo. Mais de 130 países estão desenvolvendo CBDCs. A diferença fundamental: enquanto o dinheiro físico permite transações privadas, uma CBDC registra cada movimentação e permite controle programável pelo Estado.',
  },
  {
    pergunta: 'Como me proteger do DREX?',
    resposta: 'As estratégias principais são: (1) Bitcoin com autocustódia — armazene valor em um ativo que nenhum governo pode confiscar; (2) Diversificação jurisdicional — distribua patrimônio entre múltiplas jurisdições; (3) Bitcoin P2P — adquira sem KYC; (4) Lightning Network — transacione com privacidade e velocidade.',
  },
  {
    pergunta: 'O DREX é seguro?',
    resposta: 'Depende da sua definição de "seguro". Tecnologicamente, a blockchain do BC é robusta. Mas segurança financeira não é apenas tecnológica — é também política. O DREX é "seguro" no sentido de que funciona. Mas é extremamente inseguro no sentido de que dá ao governo poder absoluto sobre o seu dinheiro, sem contrapesos.',
  },
  {
    pergunta: 'Qual a diferença entre DREX e PIX?',
    resposta: 'O PIX é um sistema de pagamentos instantâneos que movimenta reais entre contas bancárias tradicionais. O DREX é uma nova forma de dinheiro — uma moeda digital programável. Com o PIX, você transfere dinheiro. Com o DREX, o governo pode programar como, quando e onde esse dinheiro pode ser usado.',
  },
  {
    pergunta: 'O DREX já está funcionando?',
    resposta: 'Em 2026, o DREX está em fase de expansão dos testes piloto com instituições financeiras. O lançamento público está previsto para os próximos anos. Mas a infraestrutura já está sendo construída — e quando estiver pronta, a transição pode ser muito rápida.',
  },
];
