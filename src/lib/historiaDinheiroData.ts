import { Coins, Scale, Landmark, Clock, AlertTriangle, TrendingDown, Crown, Scroll, Wheat, ShieldAlert } from 'lucide-react';

/* ───────────── NAV ───────────── */
export const NAV_ITEMS = [
  { id: 'hero', label: 'A Origem do Dinheiro' },
  { id: 'escambo', label: 'Antes do Dinheiro' },
  { id: 'ouro', label: 'A Era do Ouro' },
  { id: 'papel', label: 'O Papel-Moeda' },
  { id: 'banco-central', label: 'Bancos Centrais' },
  { id: 'nixon', label: 'O Fim do Padrão Ouro' },
  { id: 'timeline', label: 'Linha do Tempo' },
  { id: 'consequencias', label: 'O Resultado' },
  { id: 'bitcoin-saida', label: 'A Saída' },
  { id: 'faq', label: 'Perguntas Frequentes' },
  { id: 'conclusao', label: 'O Despertar' },
];

/* ───────────── ERAS DO DINHEIRO ───────────── */
export const ERAS = [
  {
    id: 'escambo',
    icon: Wheat,
    titulo: 'Escambo, A Troca Direta',
    periodo: 'Pré-história até ~3000 a.C.',
    conteudo: [
      'Antes do dinheiro, as pessoas trocavam bens diretamente: trigo por carne, peles por ferramentas. O problema era óbvio, você precisava encontrar alguém que quisesse exatamente o que você tinha e tivesse exatamente o que você queria. Os economistas chamam isso de "dupla coincidência de desejos".',
      'Esse sistema limitava severamente o comércio. Você não podia acumular riqueza facilmente (trigo apodrece), não podia dividir valor com precisão (como dar meio boi?) e não podia transportar riqueza a longas distâncias. O escambo funcionava em comunidades pequenas, mas era incompatível com civilizações complexas.',
      'A necessidade de um meio de troca universal, algo que todos aceitassem, que fosse divisível, durável e transportável, levou à invenção mais importante da história econômica: o dinheiro.',
    ],
  },
  {
    id: 'ouro',
    icon: Coins,
    titulo: 'Ouro e Prata, Dinheiro Natural',
    periodo: '~3000 a.C. até Século XX',
    conteudo: [
      'O ouro e a prata emergiram como dinheiro de forma espontânea, em civilizações que nunca tiveram contato entre si, dos sumérios aos incas, dos chineses aos romanos. Não foi uma decisão de governo. Foi uma descoberta do mercado livre.',
      'O ouro possuía todas as propriedades necessárias: era escasso (não podia ser "impresso"), durável (não oxidava), divisível (podia ser fundido), fungível (um grama era igual a outro grama), transportável e universalmente reconhecido como valioso. Por mais de 5.000 anos, o ouro funcionou como dinheiro, sem a necessidade de nenhum governo garantindo seu valor.',
      'Civilizações que mantiveram a integridade de suas moedas de ouro prosperaram por séculos. Civilizações que adulteraram suas moedas, como Roma, que progressivamente reduziu o conteúdo de prata no denário, colapsaram. A lição é clara: quando o dinheiro é corrompido, a civilização é corrompida.',
      'O ouro tinha uma característica que os governos odiavam: não podia ser criado do nada. Para ter mais ouro, era preciso minerá-lo, um processo caro e lento. Isso significava que os governos não podiam simplesmente "imprimir" riqueza para financiar guerras e gastos públicos. Essa limitação era, na verdade, uma proteção para o cidadão.',
    ],
  },
  {
    id: 'papel',
    icon: Scroll,
    titulo: 'Papel-Moeda, O Início da Fraude',
    periodo: 'Século XVII até Presente',
    conteudo: [
      'A transição do ouro para o papel-moeda não aconteceu porque o papel era melhor. Aconteceu porque era mais conveniente para os governos. Inicialmente, o papel-moeda era apenas um recibo, um "certificado de ouro" que garantia ao portador o direito de trocar aquele papel por ouro real no banco. Cada cédula tinha lastro em metal precioso.',
      'O problema começou quando os bancos perceberam que as pessoas raramente iam trocar seus papéis por ouro ao mesmo tempo. Então começaram a emitir mais recibos do que o ouro que possuíam. Se tinham 100 onças de ouro no cofre, emitiam 500 recibos. Isso é o que conhecemos como "reserva fracionária", e é a base de todo o sistema bancário moderno.',
      'Essa fraude funcionava enquanto todos confiavam no sistema. Mas bastava um rumor para que todos corressem ao banco ao mesmo tempo, os famosos "bank runs". Quando isso acontecia, ficava exposto que o dinheiro era uma ilusão: havia mais promessas do que ouro para cumpri-las.',
      'Os governos, em vez de punir essa fraude, a institucionalizaram. Criaram bancos centrais para serem os "emprestadores de última instância", ou seja, para imprimir mais dinheiro quando os bancos comerciais ficassem sem. A fraude foi legalizada. E o cidadão passou a pagar a conta via inflação.',
    ],
  },
  {
    id: 'banco-central',
    icon: Landmark,
    titulo: 'Bancos Centrais, O Monopólio Monetário',
    periodo: '1694 até Presente',
    conteudo: [
      'O primeiro banco central moderno foi o Bank of England, criado em 1694 com um propósito específico: financiar guerras. O rei precisava de dinheiro para lutar contra a França e os impostos já estavam no limite. A solução? Criar uma instituição que pudesse "emprestar" dinheiro ao governo, criando-o do nada.',
      'O modelo se espalhou pelo mundo. O Federal Reserve (EUA) foi criado em 1913. O Banco Central do Brasil em 1964. Todos seguem a mesma lógica: monopólio sobre a emissão de moeda, poder de definir taxas de juros e capacidade ilimitada de criar dinheiro.',
      'O resultado histórico é sempre o mesmo: toda moeda fiduciária (fiat) na história eventualmente perdeu todo o seu valor. O dólar americano perdeu mais de 96% do seu poder de compra desde a criação do Federal Reserve. O real brasileiro perdeu mais de 85% desde o Plano Real em 1994. A libra esterlina perdeu mais de 99% desde 1694.',
      'Os bancos centrais são apresentados como "guardiões da estabilidade monetária". Na prática, são os maiores destruidores de valor da história. Cada nota que eles imprimem dilui o poder de compra de todas as notas que já existem, é um imposto invisível que você paga todos os dias, sem perceber.',
    ],
  },
  {
    id: 'nixon',
    icon: Crown,
    titulo: 'Nixon Shock, A Maior Traição Monetária',
    periodo: '15 de Agosto de 1971',
    conteudo: [
      'Em 15 de agosto de 1971, o presidente Richard Nixon anunciou que os Estados Unidos não trocariam mais dólares por ouro. Com uma canetada, destruiu o último vínculo entre o dinheiro e algo real. Disse que era "temporário". Mais de 50 anos depois, continua valendo.',
      'Antes de 1971, outros países podiam trocar seus dólares por ouro americano a uma taxa fixa de US$ 35 por onça. Isso limitava quanto dinheiro os EUA podiam imprimir, porque se imprimissem demais, outros países pediriam o ouro de volta. A França de De Gaulle fez exatamente isso, enviando navios para buscar o ouro francês.',
      'Nixon fechou a janela do ouro porque os EUA estavam imprimindo dólares demais para financiar a Guerra do Vietnã e programas sociais. Se mantivesse a conversibilidade, os cofres de Fort Knox ficariam vazios. A solução honesta seria cortar gastos. A solução política foi quebrar a promessa.',
      'O resultado foi devastador para o cidadão comum: desde 1971, a desigualdade explodiu, o poder de compra desmoronou, a dívida governamental se tornou exponencial e os ciclos de boom-and-bust se intensificaram. O dinheiro deixou de ser uma reserva de valor e se tornou uma ferramenta de manipulação política. Se existe um momento na história que todo cidadão deveria conhecer, é este.',
    ],
  },
];

/* ───────────── TIMELINE ───────────── */
export const TIMELINE_ITEMS = [
  { ano: '~3000 a.C.', evento: 'Primeiras moedas de ouro', desc: 'Civilizações como a Suméria começam a usar ouro e prata como dinheiro, sem governo, sem banco central.' },
  { ano: '~600 a.C.', evento: 'Moedas cunhadas', desc: 'O reino da Lídia (atual Turquia) cunha as primeiras moedas padronizadas de electrum (liga de ouro e prata).' },
  { ano: '27 a.C.', evento: 'Denário romano', desc: 'Roma estabelece o denário como moeda oficial. Séculos depois, a adulteração dessa moeda contribuirá para a queda do Império.' },
  { ano: '1694', evento: 'Bank of England', desc: 'Criado para financiar guerras, inaugura o modelo de banco central, monopólio sobre a emissão de moeda.' },
  { ano: '1913', evento: 'Federal Reserve', desc: 'Os EUA criam seu banco central. Desde então, o dólar perdeu mais de 96% do seu poder de compra.' },
  { ano: '1944', evento: 'Bretton Woods', desc: 'O dólar se torna moeda de reserva mundial, com lastro em ouro a US$ 35/onça. Os países confiam na promessa americana.' },
  { ano: '1964', evento: 'Banco Central do Brasil', desc: 'O Brasil cria seu BC. Nas décadas seguintes, o país terá hiperinflação, confisco e 6 moedas diferentes.' },
  { ano: '1971', evento: 'Nixon Shock', desc: 'Nixon quebra a promessa de Bretton Woods. O dinheiro do mundo inteiro perde lastro em ouro. A era fiat começa.' },
  { ano: '1990', evento: 'Confisco Collor', desc: 'O governo brasileiro confisca as poupanças dos cidadãos. Prova real do que acontece quando o Estado controla o dinheiro.' },
  { ano: '1994', evento: 'Plano Real', desc: 'O Brasil cria o Real. Desde então, R$ 1.000 de 1994 valem menos de R$ 150 em poder de compra.' },
  { ano: '2008', evento: 'Crise financeira global', desc: 'O sistema bancário colapsa. Governos imprimem trilhões para salvar bancos. O cidadão paga a conta.' },
  { ano: '2009', evento: 'Bitcoin é criado', desc: 'Satoshi Nakamoto publica o whitepaper e lança a rede Bitcoin, dinheiro digital, escasso, descentralizado e sem permissão.' },
  { ano: '2020+', evento: 'Impressão monetária sem precedentes', desc: 'COVID-19 leva governos a imprimir mais dinheiro em 2 anos do que em toda a história anterior combinada.' },
];

/* ───────────── CONSEQUÊNCIAS ───────────── */
export const CONSEQUENCIAS = [
  {
    icon: TrendingDown,
    titulo: 'Destruição do Poder de Compra',
    descricao: 'Desde que os bancos centrais assumiram o controle monetário, todas as moedas fiat perdem valor continuamente. O dólar perdeu 96%. O real perdeu 85%. A lira turca perdeu 99%. Seu salário compra menos a cada ano, não porque você ganha pouco, mas porque o dinheiro vale menos.',
  },
  {
    icon: Scale,
    titulo: 'Explosão da Desigualdade',
    descricao: 'Quando o banco central cria dinheiro novo, ele não aparece igualmente na conta de todos. Ele vai primeiro para os bancos e grandes corporações, que compram ativos antes dos preços subirem. Quando o dinheiro novo chega até você, tudo já está mais caro. Isso chama-se Efeito Cantillon.',
  },
  {
    icon: AlertTriangle,
    titulo: 'Ciclos de Boom e Bust',
    descricao: 'Juros artificialmente baixos criam bolhas de crédito. As pessoas se endividam, os preços sobem artificialmente. Quando a bolha estoura, os cidadãos perdem tudo, mas os bancos são "resgatados" com dinheiro público. O risco é socializado. O lucro é privatizado.',
  },
];

/* ───────────── FAQ ───────────── */
export const FAQ_ITEMS = [
  {
    pergunta: 'O que é dinheiro?',
    resposta: 'Dinheiro é qualquer bem amplamente aceito como meio de troca, unidade de conta e reserva de valor. Durante milênios, o ouro cumpriu esse papel naturalmente. Hoje, o "dinheiro" (moeda fiat como o Real) é apenas papel com valor decretado pelo governo, sem lastro em nada físico, com oferta ilimitada e poder de compra decrescente.',
  },
  {
    pergunta: 'Como surgiu o dinheiro?',
    resposta: 'O dinheiro surgiu espontaneamente no mercado livre como solução para os problemas do escambo. Comunidades ao redor do mundo convergiram independentemente para metais preciosos (ouro e prata) como dinheiro, por suas propriedades naturais: escassez, durabilidade, divisibilidade e fungibilidade. Não foi uma invenção governamental.',
  },
  {
    pergunta: 'O que é o padrão ouro?',
    resposta: 'O padrão ouro era um sistema monetário onde cada unidade de moeda podia ser trocada por uma quantidade fixa de ouro. Isso limitava a capacidade dos governos de criar dinheiro do nada. O padrão ouro foi abandonado definitivamente em 1971, quando Nixon encerrou a conversibilidade do dólar em ouro.',
  },
  {
    pergunta: 'Por que o dinheiro perde valor?',
    resposta: 'O dinheiro fiat perde valor porque os bancos centrais imprimem cada vez mais. Quando a oferta de dinheiro aumenta mais rápido que a produção de bens, os preços sobem, isso é inflação. Desde 1971, sem lastro em ouro, a impressão monetária se tornou ilimitada e a perda de valor, constante.',
  },
  {
    pergunta: 'O que aconteceu em 1971?',
    resposta: 'Em 15 de agosto de 1971, o presidente Nixon anunciou que os EUA não trocariam mais dólares por ouro. Isso encerrou o sistema de Bretton Woods e removeu o último lastro real do dinheiro mundial. Desde então, todas as moedas são puramente fiduciárias, seu valor depende apenas da confiança no governo emissor.',
  },
  {
    pergunta: 'O que é moeda fiat?',
    resposta: 'Moeda fiat (do latim "fiat" = "que assim seja") é dinheiro que não tem lastro em nenhum ativo real. Seu valor existe apenas por decreto governamental. O Real, o Dólar e o Euro são moedas fiat. Historicamente, toda moeda fiat eventualmente perde todo o seu valor, sem exceção.',
  },
  {
    pergunta: 'Bitcoin é dinheiro?',
    resposta: 'Bitcoin é o dinheiro mais próximo do ouro que a humanidade já criou, mas com propriedades superiores: oferta fixa de 21 milhões (escassez absoluta), descentralizado (sem banco central), digital (transportável globalmente), divisível (até 100 milhões de satoshis) e resistente à censura. É dinheiro livre de controle estatal.',
  },
  {
    pergunta: 'Qual a diferença entre dinheiro e moeda?',
    resposta: 'Dinheiro é uma reserva de valor duradoura (como o ouro ou o Bitcoin). Moeda é apenas um meio de troca (como o Real ou o Dólar). A diferença crucial: o dinheiro mantém poder de compra ao longo do tempo. A moeda fiat perde valor continuamente porque pode ser impressa sem limite pelo governo.',
  },
];