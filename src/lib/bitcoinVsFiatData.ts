import { Shield, TrendingDown, Lock, Eye, Zap, Globe, Coins, Server, Clock, Percent, Users, Ban, Wallet, Scale } from 'lucide-react';

/* ───────────── NAV ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'A Comparação' },
  { id: 'tabela', label: 'Tabela Completa' },
  { id: 'problema-fiat', label: 'O Problema do Fiat' },
  { id: 'solucao-bitcoin', label: 'A Solução Bitcoin' },
  { id: 'objecoes', label: 'Objeções Comuns' },
  { id: 'numeros', label: 'Os Números' },
  { id: 'arsenal', label: 'Primeiros Passos' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'A Escolha' },
];

/* ───────────── COMPARAÇÃO ───────────── */
export const COMPARACAO = [
  { aspecto: 'Emissão', fiat: 'Ilimitada — banco central imprime quando quer', bitcoin: 'Fixa — 21 milhões, para sempre, sem exceção' },
  { aspecto: 'Controle', fiat: 'Centralizado — governo e banco central decidem', bitcoin: 'Descentralizado — nenhuma entidade controla' },
  { aspecto: 'Privacidade', fiat: 'Zero — todas as transações são monitoradas', bitcoin: 'Pseudônimo — privacidade por design' },
  { aspecto: 'Confisco', fiat: 'Possível — com um clique (Plano Collor)', bitcoin: 'Impossível — com autocustódia' },
  { aspecto: 'Inflação', fiat: 'Constante — perde valor todos os dias', bitcoin: 'Deflacionário — tende a valorizar com o tempo' },
  { aspecto: 'Fronteiras', fiat: 'Nacional — limitado por jurisdição', bitcoin: 'Global — funciona em qualquer lugar do mundo' },
  { aspecto: 'Censura', fiat: 'Fácil — transações podem ser bloqueadas', bitcoin: 'Impossível — resistente à censura' },
  { aspecto: 'Permissão', fiat: 'Necessária — o banco decide se você pode operar', bitcoin: 'Dispensável — permissionless' },
  { aspecto: 'Transparência', fiat: 'Opaco — você não sabe quanto é impresso', bitcoin: 'Totalmente transparente — blockchain aberta' },
  { aspecto: 'Horário', fiat: '5 dias por semana, horário bancário', bitcoin: '24/7, 365 dias por ano, sem parar' },
  { aspecto: 'Velocidade Internacional', fiat: 'Dias — SWIFT, intermediários, taxas altas', bitcoin: 'Minutos — direto, sem intermediários' },
  { aspecto: 'Custo de transação', fiat: 'Alto — taxas bancárias, IOF, câmbio', bitcoin: 'Baixo — especialmente via Lightning Network' },
  { aspecto: 'Lastro', fiat: 'Nenhum — confiança no governo (desde 1971)', bitcoin: 'Energia + matemática + consenso distribuído' },
  { aspecto: 'Histórico', fiat: 'Toda moeda fiat foi a zero eventualmente', bitcoin: '15+ anos de funcionamento ininterrupto' },
];

/* ───────────── PROBLEMAS DO FIAT ───────────── */
export const PROBLEMAS_FIAT = [
  {
    icon: TrendingDown,
    titulo: 'Perda Constante de Valor',
    descricao: 'Toda moeda fiat perde valor ao longo do tempo porque bancos centrais imprimem mais dinheiro continuamente. O dólar perdeu 96% desde 1913. O real perdeu 85% desde 1994. Manter dinheiro fiat é aceitar que seu patrimônio encolhe um pouco a cada dia.',
  },
  {
    icon: Lock,
    titulo: 'Confisco e Bloqueios',
    descricao: 'Governos podem congelar, confiscar ou bloquear seu dinheiro a qualquer momento. O Brasil já fez isso em 1990 (Plano Collor). O Canadá fez em 2022 com caminhoneiros. A Grécia fez em 2015 com limite de saques. Seu dinheiro no banco não é seu — é uma promessa do banco.',
  },
  {
    icon: Eye,
    titulo: 'Vigilância Total',
    descricao: 'Cada transação bancária é monitorada, registrada e reportada. O COAF rastreia movimentações. O PIX é totalmente transparente para o governo. Com o DREX, o controle será ainda mais absoluto. Privacidade financeira no sistema fiat é uma ilusão.',
  },
  {
    icon: Ban,
    titulo: 'Censura Financeira',
    descricao: 'O sistema fiat permite que governos e bancos decidam quem pode e quem não pode transacionar. Contas podem ser fechadas por opiniões políticas. Pagamentos podem ser bloqueados por critérios arbitrários. Seu acesso ao dinheiro depende da "boa vontade" de intermediários.',
  },
];

/* ───────────── VANTAGENS BITCOIN ───────────── */
export const VANTAGENS_BITCOIN = [
  {
    icon: Shield,
    titulo: 'Escassez Absoluta',
    descricao: 'Apenas 21 milhões de bitcoins existirão — isso é garantido por matemática e consenso distribuído, não por promessas de políticos. Nenhum banco central, governo ou CEO pode alterar essa regra. É a primeira vez na história que a humanidade tem acesso a um ativo com escassez verificável e absoluta.',
  },
  {
    icon: Zap,
    titulo: 'Resistência à Censura',
    descricao: 'Ninguém pode impedir uma transação de Bitcoin. Não existe "bloqueio judicial". Não existe "congelamento". Se você tem suas chaves privadas, você pode enviar Bitcoin para qualquer pessoa no mundo, a qualquer hora, sem pedir permissão a ninguém.',
  },
  {
    icon: Globe,
    titulo: 'Sem Fronteiras',
    descricao: 'O Bitcoin funciona identicamente no Brasil, no Japão, na Argentina ou em El Salvador. Não existem "câmbios", "IOF" ou "limites de remessa". Você pode carregar bilhões de dólares em valor cruzando qualquer fronteira — na sua cabeça, memorizando 12 palavras.',
  },
  {
    icon: Users,
    titulo: 'Sem Intermediários',
    descricao: 'Bitcoin funciona peer-to-peer: de pessoa para pessoa, sem bancos, sem processadoras, sem governos no meio. Você não precisa de conta bancária. Não precisa de aprovação de crédito. Não precisa de identidade. Você só precisa de internet e uma carteira.',
  },
];

/* ───────────── OBJEÇÕES ───────────── */
export const OBJECOES = [
  {
    objecao: '"Bitcoin é muito volátil"',
    resposta: 'Volatilidade é o preço da descoberta de valor de um ativo que cresce de zero para trilhões de dólares em capitalização. O dólar não é "estável" — ele perde valor consistentemente há 110 anos. O Bitcoin é volátil no curto prazo, mas consistentemente valoriza no longo prazo. Nenhuma moeda fiat pode dizer o mesmo.',
  },
  {
    objecao: '"Bitcoin não tem lastro"',
    resposta: 'Bitcoin é lastreado em energia, matemática e consenso distribuído. Para criar 1 bitcoin, é preciso gastar energia elétrica real em um processo de mineração. O dólar não é lastreado em nada desde 1971. O real não é lastreado em nada desde a criação. O "lastro" do fiat é apenas a confiança no governo — e governos quebram promessas rotineiramente.',
  },
  {
    objecao: '"O governo pode proibir Bitcoin"',
    resposta: 'Governos já tentaram proibir Bitcoin — e falharam. A China "proibiu" Bitcoin 7 vezes e ainda tem a segunda maior base de mineradores do mundo. O Bitcoin funciona via internet, satélite, rádio e até Bluetooth. Proibir Bitcoin é como proibir a matemática — tecnicamente impossível.',
  },
  {
    objecao: '"Bitcoin é usado por criminosos"',
    resposta: 'O dólar americano é a moeda mais usada para atividades ilícitas no mundo — de longe. O sistema bancário tradicional lava mais dinheiro em um ano do que todo o Bitcoin já movimentou. O argumento "criminosos usam" se aplica a qualquer tecnologia: internet, telefones, carros, dinheiro em espécie.',
  },
  {
    objecao: '"Bitcoin gasta muita energia"',
    resposta: 'Bitcoin usa energia para garantir a segurança de uma rede de trilhões de dólares — assim como mineração de ouro, data centers bancários e bases militares. A diferença: mais de 50% da energia do Bitcoin já vem de fontes renováveis, e a mineração frequentemente utiliza energia que seria desperdiçada (gás queimado, hidrelétricas em períodos chuvosos).',
  },
];

/* ───────────── NÚMEROS ───────────── */
export const NUMEROS = [
  { label: 'Oferta de Bitcoin', valor: '21.000.000', desc: 'Fixa, verificável, imutável' },
  { label: 'Oferta de USD criada em 2020-2021', valor: '~40%', desc: 'De todos os dólares que já existiram' },
  { label: 'Valorização BTC (2009-2026)', valor: '+100.000.000%', desc: 'De US$ 0 para dezenas de milhares' },
  { label: 'Desvalorização USD (1913-2026)', valor: '-96%', desc: 'Perdeu quase todo o poder de compra' },
  { label: 'Tempo de operação do Bitcoin', valor: '15+ anos', desc: 'Uptime de 99.98% sem interrupção' },
  { label: 'Países onde Bitcoin funciona', valor: '195+', desc: 'Todos os países com internet' },
];

/* ───────────── FERRAMENTAS ───────────── */
export const FERRAMENTAS = [
  {
    icon: Wallet,
    titulo: 'Autocustódia de Bitcoin',
    subtitulo: 'Suas Chaves, Seu Dinheiro',
    descricao: 'O primeiro passo é armazenar Bitcoin em uma carteira onde só você controla as chaves privadas. Hardware wallets como Ledger, Trezor ou Coldcard garantem que ninguém — nem exchanges, nem governos — pode acessar seus fundos.',
    destaque: 'Not your keys, not your coins.',
  },
  {
    icon: Zap,
    titulo: 'Lightning Network',
    subtitulo: 'Pagamentos Instantâneos',
    descricao: 'A Lightning Network permite transações de Bitcoin quase instantâneas e com taxas de centavos. É o "PIX do Bitcoin" — mas descentralizado, privado e global. Perfeito para o dia a dia.',
    destaque: 'Velocidade do PIX. Soberania do Bitcoin.',
  },
  {
    icon: Users,
    titulo: 'Bitcoin P2P',
    subtitulo: 'Sem KYC, Sem Intermediários',
    descricao: 'Plataformas como Bisq, Spike to Spike e RoboSats permitem comprar Bitcoin diretamente de outras pessoas, sem verificação de identidade. É como o dinheiro foi projetado para funcionar: ponto a ponto.',
    destaque: 'Privacidade por design.',
  },
  {
    icon: Globe,
    titulo: 'Diversificação Global',
    subtitulo: 'Teoria das Bandeiras',
    descricao: 'Não mantenha todo o seu patrimônio sob a jurisdição de um único governo. Distribua entre Bitcoin (soberania individual), contas internacionais (diversificação bancária) e múltiplas jurisdições (proteção jurídica).',
    destaque: 'Soberania financeira é soberania jurisdicional.',
  },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'Bitcoin é melhor que o Real?',
    resposta: 'Como reserva de valor, sim. O Real perdeu mais de 85% do poder de compra desde 1994. O Bitcoin, apesar da volatilidade de curto prazo, valorizou milhões de porcento desde 2009. O Real tem oferta ilimitada controlada pelo governo. O Bitcoin tem oferta fixa de 21 milhões. Para preservar patrimônio ao longo do tempo, o Bitcoin é superior a qualquer moeda fiat.',
  },
  {
    pergunta: 'Qual a diferença entre Bitcoin e dinheiro?',
    resposta: 'O Bitcoin é dinheiro — mas com propriedades superiores ao fiat. É escasso (21 milhões), descentralizado (sem banco central), global (sem fronteiras), resistente à censura (ninguém pode bloqueá-lo) e transparente (blockchain pública). O Real é uma moeda fiduciária com oferta ilimitada, controlada por um governo com histórico de confisco.',
  },
  {
    pergunta: 'Vantagens do Bitcoin sobre moedas tradicionais?',
    resposta: 'Escassez absoluta (21 milhões), descentralização total, funcionamento 24/7, transações globais sem intermediários, resistência à censura e confisco, transparência via blockchain, divisibilidade (até 100 milhões de satoshis), e o mais importante: nenhum governo pode imprimir mais.',
  },
  {
    pergunta: 'Bitcoin pode substituir o dinheiro tradicional?',
    resposta: 'O Bitcoin já funciona como dinheiro em El Salvador (onde é moeda de curso legal) e em milhares de comunidades ao redor do mundo. Com a Lightning Network, transações são instantâneas e baratas. O Bitcoin não precisa substituir completamente o fiat — basta existir como alternativa soberana para quem valoriza privacidade, liberdade e preservação de valor.',
  },
  {
    pergunta: 'Por que Bitcoin é considerado escasso?',
    resposta: 'O protocolo do Bitcoin limita matematicamente a oferta total a 21 milhões de unidades. Essa regra é aplicada por milhares de nós distribuídos ao redor do mundo e não pode ser alterada sem consenso de toda a rede. É a primeira vez na história que a humanidade tem um ativo com escassez absoluta e verificável.',
  },
  {
    pergunta: 'Bitcoin é seguro?',
    resposta: 'A rede Bitcoin nunca foi hackeada em 15+ anos de operação. É protegida pela maior rede de computação do mundo. Os riscos existem em exchanges centralizadas (não no Bitcoin em si). Com autocustódia (hardware wallet), seus bitcoins são matematicamente impossíveis de confiscar ou acessar sem suas chaves privadas.',
  },
];
