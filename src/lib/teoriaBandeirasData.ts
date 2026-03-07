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
    destaque: 'Você não precisa morar onde paga impostos — e vice-versa.',
  },
  {
    numero: 4,
    icon: Globe,
    titulo: 'Negócios / Empresas',
    subtitulo: 'Onde Você Opera',
    descricao: 'Incorporar empresas em jurisdições com baixa carga tributária, proteção de ativos e simplicidade regulatória é uma estratégia legítima usada por multinacionais — e também acessível a indivíduos e pequenos empresários. Wyoming (EUA), Estônia e Cingapura são exemplos clássicos.',
    exemplos: ['LLC Wyoming (EUA) — sem imposto estadual', 'e-Residency Estônia — gestão 100% digital', 'Cingapura — hub comercial da Ásia', 'Free zones dos Emirados — operação sem impostos'],
    destaque: 'A sede da sua empresa não precisa ser onde você mora.',
  },
  {
    numero: 5,
    icon: Shield,
    titulo: 'Ativos / Patrimônio',
    subtitulo: 'Onde Você Guarda Valor',
    descricao: 'Diversificar onde seus ativos estão armazenados é a camada final de proteção. Bitcoin com autocustódia, ouro em cofres internacionais, imóveis em jurisdições estáveis e investimentos em corretoras globais — cada ativo em um lugar diferente reduz o risco de confisco centralizado.',
    exemplos: ['Bitcoin (autocustódia — qualquer lugar)', 'Ouro físico (Suíça, Cingapura)', 'Imóveis (Paraguai, Uruguai, Portugal)', 'Investimentos (Interactive Brokers, Schwab International)'],
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
  'DREX em desenvolvimento — dinheiro programável controlado pelo Banco Central',
  'Impostos sobre herança em processo de aumento (reforma tributária)',
  'Controles cambiais que podem ser ativados a qualquer momento',
];

/* ───────────── PRIMEIROS PASSOS ───────────── */
export const PRIMEIROS_PASSOS = [
  {
    passo: 1,
    titulo: 'Bitcoin com Autocustódia',
    descricao: 'Comece armazenando valor em Bitcoin com suas próprias chaves privadas. Isso é a Bandeira Zero — patrimônio que nenhum governo pode confiscar, em nenhuma jurisdição.',
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
    descricao: 'Obtenha residência em um segundo país. O Paraguai oferece um dos processos mais rápidos e acessíveis para brasileiros — em questão de semanas.',
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
    descricao: 'O Bitcoin é a Bandeira Zero porque transcende jurisdições. Com 12 palavras memorizadas, você pode cruzar qualquer fronteira carregando todo o seu patrimônio — sem declarar, sem permissão, sem risco de confisco. É a base de qualquer estratégia de diversificação.',
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
    descricao: 'Interactive Brokers, Charles Schwab International e outras corretoras permitem que brasileiros invistam em mercados globais — ações, ETFs, bonds — com proteção SIPC e diversificação monetária real.',
    destaque: 'Seu patrimônio não precisa estar preso ao Brasil.',
  },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'O que é a Teoria das Bandeiras?',
    resposta: 'A Teoria das Bandeiras (Flag Theory) é uma estratégia de diversificação internacional que consiste em distribuir sua vida financeira, jurídica e patrimonial entre múltiplas jurisdições (países). Cada "bandeira" representa uma área: cidadania, contas bancárias, domicílio fiscal, negócios e patrimônio. O objetivo é reduzir o risco de um único governo controlar toda a sua vida.',
  },
  {
    pergunta: 'A Teoria das Bandeiras é legal?',
    resposta: 'Absolutamente. Diversificação internacional é completamente legal. Multinacionais fazem isso rotineiramente. O que é exigido é a declaração correta de ativos e rendimentos no exterior para a Receita Federal brasileira (enquanto você mantém domicílio fiscal no Brasil). A estratégia é sobre otimização legal, não sobre evasão.',
  },
  {
    pergunta: 'Preciso sair do Brasil para aplicar a teoria?',
    resposta: 'Não necessariamente. Muitas "bandeiras" podem ser implementadas sem sair do Brasil: Bitcoin com autocustódia, conta bancária internacional (pode ser aberta remotamente em alguns países), e empresa offshore. A mudança física é o passo final — não o primeiro.',
  },
  {
    pergunta: 'Quanto custa aplicar a Teoria das Bandeiras?',
    resposta: 'O custo varia muito. Bitcoin com autocustódia custa apenas o preço de uma hardware wallet (~R$ 500). Residência no Paraguai pode custar ~US$ 3.000-5.000. Conta internacional pode ser gratuita (Wise) ou custar US$ 500+. Empresa offshore varia de US$ 1.500 a US$ 10.000. Comece com o que cabe no orçamento.',
  },
  {
    pergunta: 'Qual o primeiro passo?',
    resposta: 'Bitcoin com autocustódia. É o passo mais acessível, mais rápido e mais impactante. Com uma hardware wallet e suas 12 palavras, você já tem patrimônio fora do alcance de qualquer governo. A partir daí, os próximos passos (conta internacional, residência secundária) se tornam mais fáceis.',
  },
  {
    pergunta: 'O que é a Cédula Paraguaia?',
    resposta: 'A Cédula Paraguaia é o documento de identidade emitido pelo Paraguai para residentes. Brasileiros podem obter residência temporária e permanente no Paraguai com relativa facilidade. Isso permite abrir contas bancárias paraguaias, operar em exchanges internacionais e ter uma segunda jurisdição legal.',
  },
  {
    pergunta: 'Teoria das Bandeiras funciona para quem ganha pouco?',
    resposta: 'Sim. A Bandeira Zero (Bitcoin com autocustódia) funciona para qualquer orçamento. A diversificação não exige ser rico — exige ser estratégico. Comece com Bitcoin, depois uma conta Wise (gratuita), e progressivamente adicione bandeiras conforme sua capacidade financeira cresce.',
  },
  {
    pergunta: 'Qual a relação entre Teoria das Bandeiras e Bitcoin?',
    resposta: 'O Bitcoin é a tecnologia que tornou a Teoria das Bandeiras acessível a qualquer pessoa. Antes, diversificação internacional era coisa de milionários. Com Bitcoin, qualquer pessoa pode ter patrimônio fora do alcance governamental. Bitcoin é a "Bandeira Zero" — a base sobre a qual todas as outras bandeiras se constroem.',
  },
];
