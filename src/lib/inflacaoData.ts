import { TrendingDown, Percent, DollarSign, ShoppingCart, Landmark, AlertTriangle, Scale, Clock, Wallet, BarChart3, Flame } from 'lucide-react';

/* ───────────── NAV ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'O Imposto Invisível' },
  { id: 'o-que-e', label: 'O Que É Inflação' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'efeito-cantillon', label: 'Efeito Cantillon' },
  { id: 'numeros', label: 'Os Números Reais' },
  { id: 'timeline', label: 'Linha do Tempo' },
  { id: 'mentiras', label: 'As 3 Mentiras' },
  { id: 'protecao', label: 'Como Se Proteger' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'A Verdade Nua' },
];

/* ───────────── COMO FUNCIONA ───────────── */
export const MECANISMO = [
  {
    icon: Landmark,
    titulo: 'O Banco Central Cria Dinheiro',
    descricao: 'O processo começa quando o banco central "compra" títulos do governo usando dinheiro que não existia antes. Esse dinheiro novo é injetado no sistema bancário. Não houve produção. Não houve riqueza criada. Apenas números em uma tela, que diluem todos os reais que já existem.',
  },
  {
    icon: BarChart3,
    titulo: 'Os Bancos Multiplicam',
    descricao: 'Com o sistema de reserva fracionária, cada R$ 1 que o banco central cria pode se transformar em R$ 10 ou mais através dos empréstimos bancários. O banco recebe R$ 100, guarda R$ 10 como reserva e empresta R$ 90. Quem recebe os R$ 90 deposita em outro banco, que guarda R$ 9 e empresta R$ 81. E assim por diante.',
  },
  {
    icon: ShoppingCart,
    titulo: 'Os Preços Sobem',
    descricao: 'Com mais dinheiro circulando e a mesma quantidade de bens, os preços inevitavelmente sobem. Mas não sobem igualmente para todos. Os primeiros a receber o dinheiro novo (bancos, governo, grandes corporações) compram antes dos preços subirem. Os últimos (você) pagam mais caro por tudo.',
  },
  {
    icon: TrendingDown,
    titulo: 'Seu Poder de Compra Derrete',
    descricao: 'O resultado final: seu salário compra menos. Suas economias valem menos. Seu trabalho rende menos. Você não ficou mais pobre porque ganha pouco, ficou mais pobre porque cada real que você ganha vale menos do que valia ontem. E amanhã valerá ainda menos.',
  },
];

/* ───────────── EFEITO CANTILLON ───────────── */
export const CANTILLON_NIVEIS = [
  { nivel: '1º', quem: 'Governo e Bancos', efeito: 'Recebem o dinheiro novo primeiro, a preços antigos', resultado: 'Compram ativos baratos antes da inflação' },
  { nivel: '2º', quem: 'Grandes Corporações', efeito: 'Acesso a crédito barato e antecipado', resultado: 'Expandem operações e compram concorrentes' },
  { nivel: '3º', quem: 'Classe Média Alta', efeito: 'Acesso a investimentos e financiamentos', resultado: 'Conseguem se proteger parcialmente' },
  { nivel: '4º', quem: 'Trabalhador Assalariado', efeito: 'Último a ver aumento salarial', resultado: 'Paga preços novos com salário velho' },
  { nivel: '5º', quem: 'Poupador / Aposentado', efeito: 'Nunca recebe dinheiro novo', resultado: 'Vê suas economias e aposentadoria derreterem' },
];

/* ───────────── NÚMEROS ───────────── */
export const NUMEROS_REAIS = [
  { moeda: 'Real (BRL)', desde: '1994', perda: '~85%', obs: 'R$ 1.000 de 1994 compram o equivalente a R$ 150 hoje' },
  { moeda: 'Dólar (USD)', desde: '1913', perda: '~96%', obs: 'US$ 1 de 1913 equivale a ~US$ 0.04 hoje' },
  { moeda: 'Libra (GBP)', desde: '1694', perda: '~99%', obs: 'A moeda mais antiga do mundo em circulação, e a mais destruída' },
  { moeda: 'Lira Turca', desde: '2000', perda: '~99%', obs: 'Hiperinflação acelerada nas últimas duas décadas' },
  { moeda: 'Peso Argentino', desde: '2000', perda: '~99.9%', obs: 'A Argentina é o laboratório vivo da destruição monetária' },
];

/* ───────────── 3 MENTIRAS ───────────── */
export const MENTIRAS = [
  {
    mentira: '"Inflação de 2% é saudável"',
    verdade: 'Inflação de 2% ao ano significa que seu dinheiro perde metade do valor em 35 anos. Não existe inflação "saudável", toda inflação é uma transferência de riqueza de quem poupa para quem imprime. O conceito de "meta de inflação" foi inventado por bancos centrais para normalizar o roubo.',
  },
  {
    mentira: '"A inflação é causada pela ganância dos empresários"',
    verdade: 'Empresários não podem imprimir dinheiro. Apenas o banco central pode. Quando os preços sobem, a causa é sempre a mesma: mais dinheiro perseguindo a mesma quantidade de bens. Culpar empresários é como culpar o termômetro pela febre.',
  },
  {
    mentira: '"O governo controla a inflação"',
    verdade: 'O governo é a causa da inflação, não a solução. Controle de preços nunca funcionou na história, sempre resulta em escassez e mercado negro. A única forma real de controlar a inflação é parar de imprimir dinheiro. Mas isso significaria que o governo não poderia gastar mais do que arrecada, algo politicamente inaceitável.',
  },
];

/* ───────────── FERRAMENTAS ───────────── */
export const FERRAMENTAS = [
  {
    icon: Wallet,
    titulo: 'Bitcoin, Escassez Absoluta',
    subtitulo: 'Reserva de Valor Digital',
    descricao: 'O Bitcoin tem oferta fixa de 21 milhões de unidades, para sempre. Nenhum banco central, governo ou corporação pode criar mais. Enquanto o real perde 85% de valor em 30 anos, o Bitcoin fez o caminho inverso: de zero para dezenas de milhares de dólares. É a resposta tecnológica ao problema monetário.',
    destaque: '21 milhões. Para sempre. Sem exceção.',
  },
  {
    icon: DollarSign,
    titulo: 'Ativos Reais',
    subtitulo: 'Proteção Tangível',
    descricao: 'Historicamente, ativos reais como imóveis, commodities e metais preciosos protegem contra a inflação porque sua oferta é limitada pelo mundo físico. Mas atenção: imóveis podem ser confiscados, ouro pode ser proibido (como fez Roosevelt em 1933). Somente o Bitcoin combina escassez com resistência à censura.',
    destaque: 'Ativos reais protegem. Bitcoin liberta.',
  },
  {
    icon: Percent,
    titulo: 'Educação Financeira Real',
    subtitulo: 'Entenda o Jogo',
    descricao: 'A maior proteção contra a inflação é entender como ela funciona. Quando você compreende que a inflação é um imposto, não uma força da natureza, você para de aceitar narrativas oficiais e começa a tomar decisões financeiras que protejam seu patrimônio em vez de alimentar o sistema.',
    destaque: 'Conhecimento é a primeira camada de proteção.',
  },
  {
    icon: Scale,
    titulo: 'Diversificação Jurisdicional',
    subtitulo: 'Fuga da Moeda Local',
    descricao: 'Não mantenha todo o seu patrimônio denominado em uma única moeda controlada por um único governo. Diversifique entre Bitcoin, stablecoins em dólar, contas internacionais e ativos em diferentes jurisdições. Quanto mais moedas e jurisdições, menor o risco de destruição inflacionária.',
    destaque: 'Não confie todo o seu patrimônio a um único banco central.',
  },
];

/* ───────────── TIMELINE ───────────── */
export const TIMELINE_ITEMS = [
  { ano: '1913', evento: 'Federal Reserve criado', desc: 'Os EUA criam seu banco central. A era da impressão monetária ilimitada começa.' },
  { ano: '1933', evento: 'Roosevelt confisca ouro', desc: 'O governo americano torna ilegal possuir ouro. Cidadãos são forçados a entregar seus metais a US$ 20.67/onça.' },
  { ano: '1944', evento: 'Bretton Woods', desc: 'O dólar se torna a moeda de reserva mundial, com lastro em ouro. A promessa durará apenas 27 anos.' },
  { ano: '1971', evento: 'Nixon Shock', desc: 'O lastro em ouro é abandonado. Todas as moedas do mundo se tornam puramente fiduciárias. A era fiat começa.' },
  { ano: '1980', evento: 'Hiperinflação brasileira', desc: 'O Brasil começa uma década de inflação descontrolada que chegará a 2.477% ao ano em 1993.' },
  { ano: '1990', evento: 'Confisco Collor', desc: 'O governo brasileiro confisca as poupanças. A prova definitiva do que o Estado faz quando controla o dinheiro.' },
  { ano: '1994', evento: 'Plano Real', desc: 'O Real é criado. A inflação é "controlada", mas o poder de compra continua caindo silenciosamente, ano após ano.' },
  { ano: '2008', evento: 'Crise financeira', desc: 'Bancos colapsam. Governos imprimem trilhões para salvá-los. O cidadão paga a conta via inflação nos anos seguintes.' },
  { ano: '2020', evento: 'Impressão COVID', desc: 'Governos ao redor do mundo imprimem mais dinheiro em 2 anos do que em toda a história anterior combinada.' },
  { ano: '2021+', evento: 'Inflação global', desc: 'A conta chega. Inflação global dispara. Alimentos, energia, moradia, tudo sobe. A causa? Impressão monetária.' },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'O que causa a inflação?',
    resposta: 'A causa fundamental da inflação é a expansão da oferta monetária, ou seja, a criação de dinheiro novo pelo banco central. Quando há mais dinheiro circulando sem aumento correspondente na produção de bens e serviços, os preços sobem. Milton Friedman resumiu: "A inflação é sempre e em todo lugar um fenômeno monetário."',
  },
  {
    pergunta: 'A inflação é um imposto?',
    resposta: 'Sim. A inflação funciona exatamente como um imposto, mas sem votação, sem transparência e sem limite. Quando o governo imprime dinheiro, ele transfere poder de compra de quem já tem dinheiro (você) para quem acaba de criá-lo (o governo e os bancos). É o imposto mais regressivo que existe, afeta mais quem tem menos.',
  },
  {
    pergunta: 'Como a inflação rouba meu dinheiro?',
    resposta: 'A inflação rouba seu dinheiro silenciosamente, reduzindo o poder de compra de cada real que você possui. Se a inflação oficial é 5% ao ano, seu dinheiro perde metade do valor em 14 anos. Na prática, a inflação real (alimentos, moradia, energia) costuma ser muito maior que a oficial.',
  },
  {
    pergunta: 'Como me proteger da inflação?',
    resposta: 'As estratégias principais são: (1) Bitcoin, oferta fixa de 21 milhões, impossível de inflacionar; (2) Ativos reais, imóveis, commodities, ouro; (3) Diversificação jurisdicional, não mantenha tudo em uma moeda; (4) Educação financeira real, entenda o jogo para não ser vítima dele.',
  },
  {
    pergunta: 'O que é o Efeito Cantillon?',
    resposta: 'O Efeito Cantillon descreve como o dinheiro novo beneficia quem o recebe primeiro (bancos, governo, grandes corporações) às custas de quem o recebe por último (trabalhadores, poupadores, aposentados). É o mecanismo pelo qual a inflação aumenta a desigualdade, transferindo riqueza dos pobres para os ricos.',
  },
  {
    pergunta: 'Inflação de 2% é boa?',
    resposta: 'Não. Inflação de 2% ao ano significa que seu dinheiro perde metade do valor em 35 anos. Uma vida inteira de trabalho e poupança, destruída pela metade. O conceito de "meta de inflação" foi criado por bancos centrais para normalizar a perda constante de poder de compra. Nenhum roubo se torna aceitável por ser gradual.',
  },
  {
    pergunta: 'Bitcoin protege contra inflação?',
    resposta: 'O Bitcoin é provavelmente a melhor proteção contra inflação já inventada. Sua oferta é matematicamente fixa em 21 milhões de unidades, nenhum banco central pode criar mais. Enquanto moedas fiat perdem valor continuamente, o Bitcoin tende a valorizar ao longo do tempo exatamente porque é escasso e sua escassez é verificável.',
  },
  {
    pergunta: 'Qual a inflação real no Brasil?',
    resposta: 'A inflação oficial (IPCA) geralmente subestima a perda real de poder de compra. O IPCA mede uma cesta "média" que frequentemente não reflete os gastos reais das famílias. Alimentos, moradia, educação e saúde costumam subir muito mais que o índice oficial. A inflação que você sente no dia a dia é, quase sempre, maior que o número divulgado.',
  },
];