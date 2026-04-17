import { Globe, MapPin, Shield, Landmark, Plane, CreditCard, FileText, Users, Scale, AlertTriangle, BookOpen, Flag } from 'lucide-react';

/* ───────────── NAV ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'Teoria das Bandeiras' },
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'bandeiras', label: 'As 5 Bandeiras' },
  { id: 'por-que', label: 'Por Que Agora' },
  { id: 'brasil', label: 'O Caso Brasil' },
  { id: 'primeiros-passos', label: 'Primeiros Passos' },
  { id: 'ferramentas', label: 'Arsenal Prático' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'Soberania Pessoal' },
];

/* ───────────── 5 BANDEIRAS ───────────── */
export const BANDEIRAS = [
  {
    numero: 1,
    icon: FileText,
    titulo: 'Cidadania / Residência',
    subtitulo: 'Onde Você é Cidadão',
    descricao: 'Ter cidadania ou residência em mais de um país garante que nenhum governo pode prendê-lo administrativa ou financeiramente. Programas como o de residência no Paraguai, Panamá ou Portugal permitem que brasileiros diversifiquem sua existência legal rapidamente e com baixo custo.',
    exemplos: ['Cédula Paraguaia (residência simplificada)', 'Golden Visa Portugal (via investimento)', 'Residência Panamá (amigo do estrangeiro)', 'Cidadania por descendência (Itália, Espanha, Alemanha)'],
    destaque: 'Um passaporte é uma saída de emergência. Dois passaportes são uma estratégia.',
  },
  {
    numero: 2,
    icon: Landmark,
    titulo: 'Contas Bancárias',
    subtitulo: 'Onde Você Guarda Dinheiro',
    descricao: 'Manter todo o seu dinheiro em bancos de um único país é o mesmo que dar ao governo total poder sobre seu patrimônio. Com contas em múltiplas jurisdições, um bloqueio no Brasil não congela toda a sua vida financeira. Países como Geórgia, Uruguai e Cingapura oferecem contas com processos simplificados.',
    exemplos: ['Contas em USD (Geórgia, EUA)', 'Contas em EUR (Portugal, Lituânia)', 'Corretoras internacionais (Interactive Brokers)', 'Stablecoins como reserva de valor líquida'],
    destaque: 'Dinheiro que está todo em um único banco está todo sob um único governo.',
  },
  {
    numero: 3,
    icon: MapPin,
    titulo: 'Domicílio Fiscal',
    subtitulo: 'Onde Você Paga Impostos',
    descricao: 'Seu domicílio fiscal determina qual governo tributa sua renda mundial. Alguns países oferecem regimes tributários territoriais (você só paga impostos sobre renda gerada localmente), como Panamá, Paraguai e Costa Rica. Mudar o domicílio fiscal pode ser a decisão financeira mais impactante da sua vida.',
    exemplos: ['Paraguai (tributação territorial, 10% máx.)', 'Panamá (tributação territorial)', 'Emirados Árabes (0% imposto de renda)', 'Portugal (programa NHR para novos residentes)'],
    destaque: 'Você não precisa morar onde paga impostos, e vice-versa.',
  },
  {
    numero: 4,
    icon: Globe,
    titulo: 'Negócios / Empresas',
    subtitulo: 'Onde Você Opera',
    descricao: 'Incorporar empresas em jurisdições com baixa carga tributária, proteção de ativos e simplicidade regulatória é uma estratégia legítima usada por multinacionais, e também acessível a indivíduos e pequenos empresários. Wyoming (EUA), Estônia e Cingapura são exemplos clássicos.',
    exemplos: ['LLC Wyoming (EUA), sem imposto estadual', 'e-Residency Estônia, gestão 100% digital', 'Cingapura, hub comercial da Ásia', 'Free zones dos Emirados, operação sem impostos'],
    destaque: 'A sede da sua empresa não precisa ser onde você mora.',
  },
  {
    numero: 5,
    icon: Shield,
    titulo: 'Ativos / Patrimônio',
    subtitulo: 'Onde Você Guarda Valor',
    descricao: 'Diversificar onde seus ativos estão armazenados é a camada final de proteção. Bitcoin com autocustódia, ouro em cofres internacionais, imóveis em jurisdições estáveis e investimentos em corretoras globais, cada ativo em um lugar diferente reduz o risco de confisco centralizado.',
    exemplos: ['Bitcoin (autocustódia, qualquer lugar)', 'Ouro físico (Suíça, Cingapura)', 'Imóveis (Paraguai, Uruguai, Portugal)', 'Investimentos (Interactive Brokers, Schwab International)'],
    destaque: 'A melhor proteção patrimonial é a dispersão geográfica.',
  },
];

/* ───────────── POR QUE AGORA ───────────── */
export const POR_QUE_AGORA = [
  {
    icon: AlertTriangle,
    titulo: 'DREX e CBDCs',
    descricao: 'Moedas digitais de banco central dão ao governo poder sem precedentes sobre o dinheiro: bloqueio, confisco e programação de gastos. A teoria das bandeiras é a resposta direta a esse risco.',
  },
  {
    icon: Scale,
    titulo: 'Carga Tributária Crescente',
    descricao: 'O Brasil possui uma das maiores cargas tributárias do mundo para o retorno que entrega ao cidadão. Impostos sobre herança, renda, consumo e patrimônio continuam subindo. Diversificação fiscal é sobrevivência patrimonial.',
  },
  {
    icon: Users,
    titulo: 'Instabilidade Política',
    descricao: 'O Brasil já confiscou poupanças (1990), congelou preços (múltiplas vezes) e muda regras tributárias retroativamente. A dependência de um único sistema jurídico controlado por políticos é um risco patrimonial real.',
  },
];

/* ───────────── CASO BRASIL ───────────── */
export const CASO_BRASIL = [
  'Confisco da poupança em 1990 (Plano Collor)',
  'Hiperinflação com 6 trocas de moeda em menos de 10 anos',
  'Carga tributária de ~34% do PIB com serviços públicos de qualidade questionável',
  'Decisões judiciais que bloqueiam contas e patrimônio sem aviso prévio',
  'PL 3.951 abrindo precedente para limitar dinheiro em espécie',
  'DREX em desenvolvimento, dinheiro programável controlado pelo Banco Central',
  'Impostos sobre herança em processo de aumento (reforma tributária)',
  'Controles cambiais que podem ser ativados a qualquer momento',
];

/* ───────────── PRIMEIROS PASSOS ───────────── */
export const PRIMEIROS_PASSOS = [
  {
    passo: 1,
    titulo: 'Bitcoin com Autocustódia',
    descricao: 'Comece armazenando valor em Bitcoin com suas próprias chaves privadas. Isso é a Bandeira Zero, patrimônio que nenhum governo pode confiscar, em nenhuma jurisdição.',
    dificuldade: 'Fácil',
    custo: 'Baixo',
  },
  {
    passo: 2,
    titulo: 'Conta Bancária Internacional',
    descricao: 'Abra uma conta em USD ou EUR em uma jurisdição estrangeira. Geórgia, Portugal e Uruguai são opções populares para brasileiros.',
    dificuldade: 'Médio',
    custo: 'Variável',
  },
  {
    passo: 3,
    titulo: 'Residência Secundária',
    descricao: 'Obtenha residência em um segundo país. O Paraguai oferece um dos processos mais rápidos e acessíveis para brasileiros, em questão de semanas.',
    dificuldade: 'Médio',
    custo: 'Moderado',
  },
  {
    passo: 4,
    titulo: 'Estrutura Empresarial Offshore',
    descricao: 'Incorpore uma empresa em uma jurisdição favorável para operar internacionalmente e otimizar sua carga tributária de forma legal.',
    dificuldade: 'Avançado',
    custo: 'Moderado a Alto',
  },
  {
    passo: 5,
    titulo: 'Mudança de Domicílio Fiscal',
    descricao: 'Para proteção máxima, mude seu domicílio fiscal para um país com tributação territorial. Isso garante que apenas a renda gerada localmente é tributada.',
    dificuldade: 'Avançado',
    custo: 'Alto',
  },
];

/* ───────────── FERRAMENTAS ───────────── */
export const FERRAMENTAS = [
  {
    icon: Shield,
    titulo: 'Bitcoin + Autocustódia',
    subtitulo: 'Bandeira Zero',
    descricao: 'O Bitcoin é a Bandeira Zero porque transcende jurisdições. Com 12 palavras memorizadas, você pode cruzar qualquer fronteira carregando todo o seu patrimônio, sem declarar, sem permissão, sem risco de confisco. É a base de qualquer estratégia de diversificação.',
    destaque: 'A bandeira que nenhum governo pode baixar.',
  },
  {
    icon: CreditCard,
    titulo: 'Cartões Internacionais',
    subtitulo: 'Gastos Globais',
    descricao: 'Cartões de débito internacionais (Wise, Payoneer, cartões cripto) permitem que você gaste em qualquer moeda, em qualquer país, sem depender do sistema bancário brasileiro. Alguns funcionam sem KYC completo.',
    destaque: 'Acesso ao mundo financeiro global no seu bolso.',
  },
  {
    icon: Plane,
    titulo: 'Consultoria de Imigração',
    subtitulo: 'Residências e Cidadanias',
    descricao: 'Existem escritórios especializados em residências e cidadanias para brasileiros. Paraguai, Panamá, Portugal e vários outros países têm programas acessíveis. O investimento varia de US$ 2.000 a US$ 50.000 dependendo do país.',
    destaque: 'Planejamento jurídico é investimento, não gasto.',
  },
  {
    icon: Globe,
    titulo: 'Corretoras Internacionais',
    subtitulo: 'Investimentos Globais',
    descricao: 'Interactive Brokers, Charles Schwab International e outras corretoras permitem que brasileiros invistam em mercados globais (ações, ETFs, bonds) com proteção SIPC e diversificação monetária real.',
    destaque: 'Seu patrimônio não precisa estar preso ao Brasil.',
  },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'Como abrir conta internacional sendo brasileiro',
    resposta: 'Brasileiros podem abrir conta internacional de forma 100% remota em fintechs como Wise (multimoedas, sem mensalidade) e Payoneer, ou presencialmente em jurisdições amigáveis como Geórgia (Bank of Georgia, abertura em 1 dia com passaporte), Uruguai e Portugal. Os requisitos básicos são passaporte válido, comprovante de residência e, em alguns casos, comprovante de origem de fundos. A conta internacional protege contra bloqueios judiciais no Brasil, congelamento do PIX e fornece liquidez em moeda forte (USD ou EUR).',
  },
  {
    pergunta: 'Vale a pena ter segunda residência no exterior',
    resposta: 'Sim, e para a maioria dos brasileiros é um dos melhores investimentos de soberania que existe. Uma segunda residência permite abrir contas bancárias locais, ter um endereço fiscal alternativo, operar empresas em outras jurisdições e funciona como saída de emergência caso a situação política ou econômica do Brasil se deteriore. O Paraguai oferece o programa mais acessível para brasileiros (cerca de US$ 3.000–5.000), com Cédula em poucas semanas. Portugal, Panamá e Uruguai também têm programas competitivos.',
  },
  {
    pergunta: 'Como proteger patrimônio fora do Brasil de forma legal',
    resposta: 'A proteção patrimonial internacional é totalmente legal desde que declarada corretamente. As principais camadas são: (1) Bitcoin com autocustódia em hardware wallet, (2) contas bancárias internacionais em USD/EUR, (3) investimentos via corretoras internacionais (Interactive Brokers, Charles Schwab International), (4) imóveis em jurisdições estáveis e (5) empresas offshore para operação internacional. Enquanto você mantiver residência fiscal no Brasil, declare tudo na DIRPF e DCBE conforme exigido pela Receita Federal.',
  },
  {
    pergunta: 'O que é residência fiscal e como mudar',
    resposta: 'Residência fiscal é o país que tributa sua renda mundial. No Brasil, você é considerado residente fiscal se permanecer mais de 183 dias por ano no país ou tiver vínculo permanente. Para mudar a residência fiscal, é necessário entregar a Declaração de Saída Definitiva do País à Receita Federal e estabelecer residência efetiva em outra jurisdição. Países com tributação territorial (Paraguai, Panamá, Costa Rica) ou regimes especiais (Portugal NHR, Emirados Árabes 0% IR) são os destinos mais procurados por brasileiros.',
  },
  {
    pergunta: 'Como funciona identidade digital internacional',
    resposta: 'A identidade digital internacional é uma nova camada de soberania emitida por uma nação soberana, permitindo acesso a serviços financeiros, exchanges e plataformas globais sem depender exclusivamente do CPF. O programa de Palau (Palau Digital Residency) é hoje o mais acessível: emite uma ID válida internacionalmente, reconhecida em centenas de instituições financeiras e exchanges, com processo 100% online. Não substitui passaporte nem residência física, mas adiciona uma camada de redundância documental e flexibilidade operacional muito relevante.',
  },
  {
    pergunta: 'A Teoria das Bandeiras é legal no Brasil',
    resposta: 'Sim, é totalmente legal. Diversificação internacional é prática comum entre empresas e indivíduos em todo o mundo. O ponto crítico é declarar corretamente: enquanto for residente fiscal no Brasil, você precisa informar bens e direitos no exterior na DIRPF e, acima de US$ 1 milhão, fazer a Declaração de Capitais Brasileiros no Exterior (DCBE) ao Banco Central. Estratégia bem aplicada é otimização legal; não declarar é que configura ilegalidade.',
  },
  {
    pergunta: 'Quanto custa começar a aplicar a Teoria das Bandeiras',
    resposta: 'O custo de entrada é muito menor do que parece. Bitcoin com autocustódia: R$ 500–800 (hardware wallet). Conta internacional Wise: gratuita. Residência no Paraguai: US$ 3.000–5.000 incluindo despachante. Empresa LLC em Wyoming: US$ 1.500–2.500 no primeiro ano. Identidade digital de Palau: cerca de US$ 248 por ano. É possível começar com menos de R$ 1.000 e progredir conforme orçamento e necessidade.',
  },
  {
    pergunta: 'Qual o primeiro passo prático para começar hoje',
    resposta: 'Bitcoin com autocustódia em hardware wallet. Esse é, isoladamente, o passo de maior impacto e menor fricção: você não precisa de visto, passaporte, advogado ou despachante. Em poucos dias, você já tem patrimônio armazenado fora do alcance de qualquer governo, em qualquer jurisdição. Em seguida: abrir uma conta Wise (gratuita, 100% online) para ter acesso a USD/EUR. Esses dois movimentos sozinhos já elevam dramaticamente sua resiliência financeira.',
  },
  {
    pergunta: 'O que acontece se eu mantiver tudo só no Brasil',
    resposta: 'Você fica 100% exposto a qualquer decisão tomada por uma única jurisdição. Historicamente, isso já significou: confisco de poupança (Plano Collor, 1990), múltiplas trocas de moeda em menos de uma década, hiperinflação destruindo poder de compra, bloqueios judiciais sem aviso prévio, mudanças retroativas de regras tributárias e, agora, o avanço do DREX como dinheiro programável. Concentração não é prudência; é exposição máxima a um único ponto de falha.',
  },
  {
    pergunta: 'Bitcoin substitui as outras bandeiras da estratégia',
    resposta: 'Não. Bitcoin é a Bandeira Zero, a base sobre a qual as outras se constroem, mas não substitui as demais. Você precisa de contas internacionais para receber renda em moeda fiat, residência alternativa para mobilidade jurídica, estrutura empresarial para operar globalmente e domicílio fiscal otimizado para eficiência tributária. Bitcoin protege patrimônio; as outras bandeiras protegem operação, mobilidade e estrutura jurídica. As camadas se complementam.',
  },
];