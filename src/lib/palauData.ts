import { Building2, CreditCard, Globe, Landmark, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'hero', label: 'Visão Geral' },
  { id: 'crenca', label: 'Quebra de Crença' },
  { id: 'o-que-e', label: 'O Que É' },
  { id: 'inclui', label: 'O Que Inclui' },
  { id: 'precos', label: 'Preços' },
  { id: 'usos', label: 'Onde Usar' },
  { id: 'neobanks', label: 'Neobanks' },
  { id: 'exchanges', label: 'Exchanges' },
  { id: 'limitacoes', label: 'Limitações' },
  { id: 'comparativo', label: 'Comparativo' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta-final', label: 'Fechamento' },
];

export const PALAU_PRICING = [
  {
    duracao: '1 Ano',
    preco: 'USD 248',
    descricao: 'Entrada acessível para validar a estratégia. Renovação anual semelhante a qualquer documento estatal.',
    destaque: false,
  },
  {
    duracao: '5 Anos',
    preco: 'USD 1.000',
    descricao: 'Melhor relação custo-benefício para quem já decidiu integrar o ID à arquitetura de soberania.',
    destaque: true,
  },
  {
    duracao: '10 Anos',
    preco: 'USD 2.000',
    descricao: 'Compromisso de longo prazo com a maior previsibilidade contra mudanças de preço futuras.',
    destaque: false,
  },
];

export const PALAU_INCLUI = [
  {
    icon: ShieldCheck,
    titulo: 'Residência Digital de Palau',
    descricao: 'Identidade emitida por uma nação soberana do Pacífico, válida para fins legais que exijam comprovação de identidade.',
  },
  {
    icon: CreditCard,
    titulo: 'Cartão Físico Enviado Globalmente',
    descricao: 'Cédula física do Palau ID enviada ao seu endereço em qualquer país, em embalagem oficial.',
  },
  {
    icon: Sparkles,
    titulo: 'DID Legal de Palau',
    descricao: 'Identidade descentralizada (Soulbound Token) que pode ser cunhada na sua carteira Web3 preferida.',
  },
  {
    icon: Globe,
    titulo: 'DID de Jurisdição Existente',
    descricao: 'Camada adicional de DID baseada na sua jurisdição atual, permitindo verificação KYC em zero-knowledge.',
  },
];

export const PALAU_USOS = [
  {
    icon: Wallet,
    titulo: 'KYC em Exchanges Cripto',
    descricao: 'Algumas exchanges aceitam o ID para abertura de conta sem expor seu documento brasileiro.',
  },
  {
    icon: Landmark,
    titulo: 'Onboarding em Neobanks',
    descricao: 'Bancos digitais alternativos aceitam o ID, especialmente quando combinado com comprovante local de Palau.',
  },
  {
    icon: Building2,
    titulo: 'Inscrições e Verificações',
    descricao: 'Airbnb, registro em corporações digitais de Palau e plataformas que aceitem identidade governamental.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Privacidade Documental',
    descricao: 'Reduz a exposição do seu CPF e RG em cadastros internacionais não obrigatórios.',
  },
];

export const NEOBANKS = [
  {
    nome: 'The Kingdom Bank',
    nivel: 'verificado',
    descricao: 'Onboarding um pouco lento. O banco está construindo reputação aos poucos e emite cartões internacionais.',
    link: 'https://portal.thekingdombank.com/invite/XSXZJByYrUU',
    aviso: null,
  },
  {
    nome: 'Vexel',
    nivel: 'verificado',
    descricao: 'Famoso no Oriente, usado por chineses e indianos para pagar menos impostos junto com o ID de Palau.',
    link: 'https://vexel.com/?r=NvISzmLhnbfF',
    aviso: null,
  },
  {
    nome: 'Ultimopay',
    nivel: 'cautela',
    descricao: 'Crescendo rápido na Índia, com onboarding fácil e rápido. Emitem cartões.',
    link: 'https://dashboard.ultimopay.io/?rid=69e2aff577977',
    aviso: 'Não deposite grandes valores até que tenha confiança na instituição.',
  },
  {
    nome: 'Black Cat Card',
    nivel: 'cautela',
    descricao: 'Usado por russos, europeus e nômades para maior liberdade. Criação recente.',
    link: 'https://blackcatcard.com/',
    aviso: 'Não deposite grandes valores até que tenha confiança na instituição.',
  },
];

export const EXCHANGES = [
  { nome: 'Coinbase', link: 'https://www.coinbase.com/pt-br', regiao: 'Global' },
  { nome: 'Bitget', link: 'https://www.bitget.com/pt/referral/register?clacCode=96UQCJ8S&from=%2Fpt%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter', regiao: 'Global' },
  { nome: 'Gate.io', link: 'https://www.gate.com/pt-br/rewards_hub?ch=RewardsHub&ref=UVJDBlBb&ref_type=145', regiao: 'Global' },
  { nome: 'KuCoin', link: 'https://www.kucoin.com/r/rf/QBAPZG6X', regiao: 'Global' },
  { nome: 'CEX.io', link: 'https://cex.io/join?c=4&a=160308&o=2&s=sc&prid=referral-promo', regiao: 'Europa / Global' },
  { nome: 'MEXC', link: 'https://www.mexc.com/pt-BR/auth/signup?inviteCode=18vuG', regiao: 'Global' },
];

export const LIMITACOES = [
  {
    titulo: 'Não é Cidadania',
    descricao: 'O Palau ID não confere cidadania nem direito a voto. É um documento oficial de identidade emitido por uma nação soberana, com escopo claramente documental.',
  },
  {
    titulo: 'Não é Residência Física',
    descricao: 'Apesar de ser uma "Residência Digital", você não passa a residir fisicamente em Palau. Isso impacta diretamente seu domicílio fiscal.',
  },
  {
    titulo: 'CRS Depende do Endereço',
    descricao: 'O reporte CRS é vinculado ao seu país de residência fiscal, não ao ID. Apenas o documento não muda seu reporte fiscal automático.',
  },
  {
    titulo: 'Bancos Tradicionais Recusam',
    descricao: '99% dos bancos tradicionais — especialmente americanos — exigem passaporte internacional e comprovante de endereço local. O ID resolve apenas o universo neobank e cripto.',
  },
];

export const FAQ_PALAU = [
  {
    pergunta: 'Como obter o ID de Palau passo a passo',
    resposta: 'O processo é 100% online via plataforma RNS ID, protocolo oficial autorizado pelo governo de Palau. Você acessa o site, preenche o formulário com seus dados, envia documento de identidade do seu país atual e foto biométrica, escolhe a duração (1, 5 ou 10 anos), efetua o pagamento (cartão, ETH, USDT, USDC ou BNB) e em algumas semanas recebe o cartão físico em casa, em qualquer país do mundo. O preço de entrada é de USD 248 para a versão de 1 ano.',
  },
  {
    pergunta: 'O ID de Palau serve para abrir conta em banco internacional',
    resposta: 'Para bancos tradicionais, especialmente americanos, não. Eles exigem passaporte e comprovante de endereço local. Para neobanks alternativos, sim: instituições como The Kingdom Bank, Vexel, Ultimopay e Black Cat Card aceitam o ID de Palau para onboarding. Para reduzir fricção, é recomendável combinar o ID com um comprovante de endereço de Palau, como número de telefone fixo ou móvel local.',
  },
  {
    pergunta: 'Quais exchanges cripto aceitam o ID de Palau',
    resposta: 'Atualmente, Coinbase, Bitget, Gate.io, KuCoin, CEX.io e MEXC aceitam o ID de Palau para KYC. As políticas de compliance mudam constantemente, então sempre verifique no momento do cadastro. Algumas exchanges brasileiras também alegam aceitar via regulação local, mas isso varia caso a caso.',
  },
  {
    pergunta: 'Palau ID é cidadania ou residência',
    resposta: 'Nenhum dos dois no sentido tradicional. O ID de Palau é uma identificação oficial emitida por uma nação soberana, com aspectos documentais semelhantes a um RG nacional. Não confere passaporte, não dá direito a voto, não permite residência física automática e não muda seu domicílio fiscal. É uma camada documental adicional para fins de KYC, privacidade e operação internacional.',
  },
  {
    pergunta: 'O ID de Palau muda meu domicílio fiscal',
    resposta: 'Não automaticamente. O reporte CRS é feito ao país onde você é residente fiscal, não ao país que emitiu seu ID. Para realmente alterar seu domicílio fiscal, você precisa entregar a Declaração de Saída Definitiva no Brasil e estabelecer residência efetiva em outra jurisdição. O ID isoladamente não resolve esse problema.',
  },
  {
    pergunta: 'Quanto custa renovar o ID de Palau',
    resposta: 'A versão de 1 ano custa USD 248. A versão de 5 anos sai por USD 1.000 (USD 200/ano). A versão de 10 anos custa USD 2.000 (USD 200/ano). A versão mais longa garante maior previsibilidade contra eventuais mudanças de preço, que podem acontecer em casos de mudança legislativa.',
  },
  {
    pergunta: 'A Bybit aceita o ID de Palau',
    resposta: 'Existem relatos contraditórios. Em testes recentes, o cadastro com ID de Palau na Bybit não foi concluído. A política pode mudar a qualquer momento. Sempre teste o cadastro antes de assumir compatibilidade.',
  },
  {
    pergunta: 'A KAST aceita o ID de Palau',
    resposta: 'A KAST opera mais como uma corretora-cartão do que como banco tradicional, e isso a torna favorável a documentos alternativos. Como as políticas de compliance dela mudam frequentemente, o melhor é tentar o cadastro diretamente para validar. Se aceito, pode resolver simultaneamente o problema de banco e cartão para quem já opera com o ID de Palau.',
  },
  {
    pergunta: 'Preciso de comprovante de endereço de Palau',
    resposta: 'Sim, para a maioria dos neobanks. O ID isoladamente resolve uma das camadas de KYC, mas a maioria das instituições financeiras exige também comprovante de endereço local. Soluções: contratar um número de telefone fixo ou móvel local de Palau (que serve como utility bill) ou aguardar serviços de endereço postal oficial em Palau, ainda em desenvolvimento via RNS ID.',
  },
  {
    pergunta: 'Vale a pena criar uma e-corporation de Palau',
    resposta: 'Para a maioria dos casos, não. As e-corporations de Palau têm imposto corporativo de 12% e exigem que a receita seja efetivamente gerada lá, o que raramente faz sentido para operações reais. Para estruturas offshore, jurisdições como Wyoming (LLC), Estônia (e-Residency) ou os Emirados Árabes oferecem condições muito mais competitivas.',
  },
];

export const PALAU_VS_PARAGUAI = [
  {
    criterio: 'Tipo de documento',
    palau: 'ID digital + cartão físico (Soulbound Web3)',
    paraguai: 'Cédula de identidade física (residência permanente)',
  },
  {
    criterio: 'Custo de entrada',
    palau: 'USD 248 (1 ano)',
    paraguai: 'USD 3.000 a 5.000 (com despachante)',
  },
  {
    criterio: 'Tempo de obtenção',
    palau: 'Algumas semanas, 100% online',
    paraguai: 'Algumas semanas, presencial em Assunção',
  },
  {
    criterio: 'Renovação',
    palau: 'Anual, 5 ou 10 anos',
    paraguai: 'Permanente após 3 anos',
  },
  {
    criterio: 'Domicílio fiscal alternativo',
    palau: 'Não confere automaticamente',
    paraguai: 'Confere com Saída Definitiva e RUC local',
  },
  {
    criterio: 'KYC em exchanges',
    palau: 'Aceito em algumas grandes (Coinbase, KuCoin etc.)',
    paraguai: 'Aceito amplamente, inclusive em bancos',
  },
  {
    criterio: 'Bancos tradicionais',
    palau: 'Apenas neobanks alternativos',
    paraguai: 'Bancos paraguaios e parte dos internacionais',
  },
];
