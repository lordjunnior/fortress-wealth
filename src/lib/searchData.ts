// Central registry of all pages for search functionality
export interface SearchEntry {
  title: string;
  description: string;
  path: string;
  tags: string[];
  category: string;
}

export const SEARCH_ENTRIES: SearchEntry[] = [
  // Bitcoin fundamentals
  { title: "O que é Bitcoin?", description: "Fundamento zero — entenda o protocolo descentralizado", path: "/o-que-e-bitcoin", tags: ["bitcoin", "iniciante", "protocolo", "blockchain"], category: "Bitcoin" },
  { title: "Noções de Bitcoin", description: "Conceitos essenciais para começar", path: "/nocoes-bitcoin", tags: ["bitcoin", "iniciante", "conceitos"], category: "Bitcoin" },
  { title: "Chaves Privadas", description: "Entenda chaves, endereços e propriedade digital", path: "/chaves", tags: ["chaves", "privadas", "segurança", "endereço"], category: "Bitcoin" },
  { title: "Transações Bitcoin", description: "Como funcionam as transações na rede", path: "/transacoes", tags: ["transações", "bitcoin", "rede", "confirmação"], category: "Bitcoin" },
  { title: "Mineração Bitcoin", description: "Proof of Work e a segurança da rede", path: "/mineracao", tags: ["mineração", "proof of work", "hash", "energia"], category: "Bitcoin" },
  { title: "Blockchain", description: "A tecnologia por trás do Bitcoin", path: "/blockchain", tags: ["blockchain", "blocos", "cadeia", "tecnologia"], category: "Bitcoin" },
  { title: "21 Milhões — Hard Cap", description: "A escassez absoluta do Bitcoin", path: "/21-milhoes", tags: ["21 milhões", "escassez", "hard cap", "supply"], category: "Bitcoin" },
  { title: "Halving Bitcoin", description: "O evento que corta a emissão pela metade", path: "/halving-bitcoin", tags: ["halving", "emissão", "ciclo", "redução"], category: "Bitcoin" },
  { title: "Supply Shock", description: "Choque de oferta e impacto no preço", path: "/supply-shock", tags: ["supply", "shock", "oferta", "demanda"], category: "Bitcoin" },
  { title: "Volatilidade Bitcoin", description: "Por que o Bitcoin oscila e por que isso importa", path: "/volatilidade", tags: ["volatilidade", "preço", "oscilação", "risco"], category: "Bitcoin" },
  { title: "Lastro do Bitcoin", description: "O que dá valor ao Bitcoin?", path: "/lastro", tags: ["lastro", "valor", "fundamento", "energia"], category: "Bitcoin" },
  { title: "Futuro do Bitcoin", description: "Cenários e projeções para o BTC", path: "/futuro-bitcoin", tags: ["futuro", "projeção", "cenários", "adoção"], category: "Bitcoin" },
  { title: "Bitcoin Seguro", description: "Segurança e práticas de proteção", path: "/bitcoin-seguro", tags: ["seguro", "segurança", "proteção", "opsec"], category: "Bitcoin" },
  { title: "Bitcoin vs Fiat", description: "Comparação entre Bitcoin e moedas estatais", path: "/bitcoin-vs-fiat", tags: ["fiat", "comparação", "real", "dólar", "inflação"], category: "Bitcoin" },
  { title: "Bitcoin vs Imóvel", description: "Comparação de investimento: BTC vs imóveis", path: "/bitcoin-vs-imovel", tags: ["imóvel", "investimento", "comparação", "patrimônio"], category: "Bitcoin" },
  { title: "Bitcoin vs Altcoins", description: "Por que focar no Bitcoin e não em shitcoins", path: "/bitcoin-vs-altcoins", tags: ["altcoins", "shitcoins", "ethereum", "comparação"], category: "Bitcoin" },
  { title: "BIP-110", description: "A guerra pelo espaço de bloco", path: "/bitcoin/bip-110-guerra-espaco-bloco", tags: ["bip", "bloco", "protocolo", "governança"], category: "Bitcoin" },
  { title: "Candlestick", description: "Leitura de gráficos e padrões de velas", path: "/candlestick", tags: ["candlestick", "gráfico", "velas", "análise técnica"], category: "Bitcoin" },
  { title: "Diversificação", description: "Estratégias de alocação com Bitcoin", path: "/diversificacao", tags: ["diversificação", "alocação", "portfólio", "estratégia"], category: "Bitcoin" },

  // Autocustódia
  { title: "Autocustódia", description: "Seja seu próprio banco — guia completo", path: "/autocustodia", tags: ["autocustódia", "carteira", "wallet", "segurança"], category: "Autocustódia" },
  { title: "Hardware Wallet DIY", description: "Construa sua própria hardware wallet", path: "/autocustodia/hardware-wallet-diy-bitcoin", tags: ["hardware", "wallet", "diy", "construir"], category: "Autocustódia" },
  { title: "Mobilidade de Chaves", description: "Portabilidade e backup seguro de chaves", path: "/mobilidade-de-chaves", tags: ["mobilidade", "backup", "seed", "migração"], category: "Autocustódia" },
  { title: "Blindagem contra Golpes", description: "Proteja-se contra fraudes e engenharia social", path: "/blindagem-golpes", tags: ["golpes", "fraude", "engenharia social", "phishing"], category: "Autocustódia" },
  { title: "Comprar Bitcoin Anônimo", description: "Métodos P2P sem KYC", path: "/comprar-bitcoin-anonimo", tags: ["anônimo", "p2p", "kyc", "privacidade"], category: "Autocustódia" },
  { title: "Dólar Virtual (USDT)", description: "Comprar stablecoins com Jade Wallet e AlfredP2P", path: "/dolar-virtual", tags: ["usdt", "stablecoin", "dólar", "jade", "alfredp2p", "liquid", "tether"], category: "Autocustódia" },

  // Economia
  { title: "Economia", description: "Educação econômica para soberania", path: "/economia", tags: ["economia", "macro", "monetária", "política"], category: "Economia" },
  { title: "História do Dinheiro", description: "Da troca direta ao Bitcoin", path: "/historia-do-dinheiro", tags: ["história", "dinheiro", "moeda", "evolução"], category: "Economia" },
  { title: "Inflação: Imposto Oculto", description: "Como a inflação rouba seu poder de compra", path: "/inflacao-imposto-oculto", tags: ["inflação", "imposto", "poder de compra", "desvalorização"], category: "Economia" },
  { title: "Confisco de 1990", description: "O dia em que o governo roubou a poupança", path: "/confisco-1990", tags: ["confisco", "collor", "poupança", "1990"], category: "Economia" },
  { title: "Taxa de Fuga", description: "Indicadores de saída do sistema", path: "/taxa-de-fuga", tags: ["fuga", "taxa", "indicador", "saída"], category: "Economia" },

  // Soberania Financeira
  { title: "Soberania Financeira", description: "Hub de estratégias de independência financeira", path: "/soberania-financeira", tags: ["soberania", "financeira", "independência", "offshore"], category: "Soberania Financeira" },
  { title: "Teoria das Bandeiras", description: "Diversificação geopolítica de ativos", path: "/teoria-das-bandeiras", tags: ["bandeiras", "flag theory", "offshore", "jurisdição"], category: "Soberania Financeira" },
  { title: "Contas Offshore — Top 10", description: "Melhores contas internacionais", path: "/soberania-financeira/contas-offshore/top-10", tags: ["offshore", "contas", "internacional", "banco"], category: "Soberania Financeira" },
  { title: "Abertura Remota", description: "Como abrir contas no exterior remotamente", path: "/soberania-financeira/contas-offshore/abertura-remota", tags: ["abertura", "remota", "offshore", "conta"], category: "Soberania Financeira" },
  { title: "Neobankless", description: "Banking sem fronteiras", path: "/soberania-financeira/contas-internacionais/neobankless", tags: ["neobankless", "neobank", "digital", "internacional"], category: "Soberania Financeira" },
  { title: "Bank of Georgia", description: "Conta bancária na Geórgia", path: "/soberania-financeira/contas-internacionais/bank-of-georgia", tags: ["geórgia", "bank", "internacional", "conta"], category: "Soberania Financeira" },
  { title: "Wise", description: "Transferências internacionais com Wise", path: "/soberania-financeira/contas-internacionais/wise", tags: ["wise", "transferência", "câmbio", "internacional"], category: "Soberania Financeira" },
  { title: "Payoneer", description: "Receba em dólar com Payoneer", path: "/soberania-financeira/contas-internacionais/payoneer", tags: ["payoneer", "dólar", "receber", "freelancer"], category: "Soberania Financeira" },
  { title: "GrabrFi", description: "Plataforma de banking cripto", path: "/soberania-financeira/contas-internacionais/grabrfi", tags: ["grabrfi", "cripto", "banking", "digital"], category: "Soberania Financeira" },
  { title: "Exchanges sem KYC", description: "Trocas de cripto sem verificação de identidade", path: "/soberania-financeira/exchanges-sem-kyc", tags: ["exchange", "kyc", "privacidade", "troca"], category: "Soberania Financeira" },
  { title: "KYCnot.me", description: "Diretório de serviços sem KYC", path: "/soberania-financeira/exchanges-sem-kyc/kycnot-me", tags: ["kycnot", "privacidade", "sem kyc", "diretório"], category: "Soberania Financeira" },
  { title: "Optima Exchange", description: "Exchange descentralizada", path: "/soberania-financeira/exchanges-sem-kyc/optima-exchange", tags: ["optima", "exchange", "descentralizada", "dex"], category: "Soberania Financeira" },
  { title: "Pegasus Swap", description: "Swap de criptomoedas", path: "/soberania-financeira/exchanges-sem-kyc/pegasus-swap", tags: ["pegasus", "swap", "cripto", "troca"], category: "Soberania Financeira" },
  { title: "BRICS Pay", description: "Sistema de pagamento alternativo", path: "/soberania-financeira/brics-pay", tags: ["brics", "pagamento", "alternativo", "desdolarização"], category: "Soberania Financeira" },
  { title: "KuCoin Pay + Pix", description: "Pagamento cripto via Pix", path: "/soberania-financeira/kucoin-pay-pix", tags: ["kucoin", "pix", "pagamento", "cripto"], category: "Soberania Financeira" },
  { title: "Índice de Soberania Financeira", description: "Meça seu nível de independência", path: "/indice-de-soberania-financeira", tags: ["índice", "soberania", "teste", "avaliação"], category: "Soberania Financeira" },

  // Saída & Infraestrutura
  { title: "Estratégias de Saída", description: "Como sair do sistema fiat com segurança", path: "/saida", tags: ["saída", "fiat", "estratégia", "plano"], category: "Saída" },
  { title: "Gateway", description: "Portais de saída do sistema financeiro", path: "/saida/gateway", tags: ["gateway", "portal", "saída", "sistema"], category: "Saída" },
  { title: "Lightning Network", description: "Pagamentos instantâneos com Bitcoin", path: "/lightning", tags: ["lightning", "pagamento", "instantâneo", "rede"], category: "Infraestrutura" },
  { title: "PIX Cripto", description: "Receba via Pix, converta em cripto", path: "/pix-cripto", tags: ["pix", "cripto", "conversão", "receber"], category: "Infraestrutura" },
  { title: "Economia Paralela", description: "Construindo uma economia fora do sistema", path: "/economia-paralela", tags: ["paralela", "economia", "alternativa", "p2p"], category: "Infraestrutura" },
  { title: "Infraestrutura", description: "Stack técnico de soberania", path: "/infraestrutura", tags: ["infraestrutura", "stack", "técnico", "ferramentas"], category: "Infraestrutura" },
  { title: "DePix", description: "Reporte sobre o futuro do Pix e vigilância", path: "/alertas/depix-reporte-2026", tags: ["depix", "pix", "vigilância", "reporte"], category: "Alertas" },

  // Alertas
  { title: "Central de Alertas", description: "Ameaças à soberania individual", path: "/alertas", tags: ["alertas", "ameaças", "vigilância", "governo"], category: "Alertas" },
  { title: "CBDC Brasil", description: "A moeda digital do banco central", path: "/alertas/cbdc-brasil", tags: ["cbdc", "drex", "banco central", "digital"], category: "Alertas" },
  { title: "Proibição do Dinheiro", description: "O fim do dinheiro físico", path: "/proibicao-dinheiro", tags: ["proibição", "dinheiro", "físico", "cash"], category: "Alertas" },

  // Educação & Conteúdo
  { title: "Educação", description: "Trilha de formação soberanista", path: "/educacao", tags: ["educação", "formação", "trilha", "estudo"], category: "Educação" },
  { title: "Protocolo Inicial", description: "Por onde começar na soberania", path: "/protocolo-inicial", tags: ["protocolo", "início", "começo", "primeiro"], category: "Educação" },
  { title: "Audiobooks", description: "Biblioteca de áudio sobre soberania", path: "/audiobooks", tags: ["audiobook", "áudio", "livro", "podcast"], category: "Educação" },
  { title: "E-books", description: "Biblioteca digital de textos", path: "/ebooks", tags: ["ebook", "livro", "digital", "pdf"], category: "Educação" },
  { title: "Dicionário Cripto", description: "Glossário de termos do ecossistema", path: "/dicionario-cripto", tags: ["dicionário", "glossário", "termos", "definições"], category: "Educação" },
  { title: "Ferramentas", description: "Arsenal de ferramentas práticas", path: "/ferramentas", tags: ["ferramentas", "calculadora", "tools", "prática"], category: "Ferramentas" },
  { title: "Arsenal", description: "Kit completo de soberania", path: "/arsenal", tags: ["arsenal", "kit", "completo", "recursos"], category: "Ferramentas" },
  { title: "Mapa da Soberania", description: "Visualize sua jornada completa", path: "/mapa-da-soberania", tags: ["mapa", "jornada", "progresso", "trilha"], category: "Ferramentas" },

  // Filosofia
  { title: "Filosofia", description: "Fundamentos filosóficos da soberania", path: "/filosofia", tags: ["filosofia", "liberdade", "indivíduo", "ética"], category: "Filosofia" },
  { title: "Índice do Despertar", description: "Meça seu nível de consciência soberana", path: "/indice-do-despertar", tags: ["despertar", "consciência", "índice", "teste"], category: "Filosofia" },
  { title: "O Silêncio da Queda", description: "Reflexão sobre o colapso silencioso", path: "/silencio-queda", tags: ["silêncio", "queda", "colapso", "reflexão"], category: "Filosofia" },

  // Soberania Orgânica
  { title: "Soberania Orgânica", description: "Autonomia prática: alimento, saúde e sobrevivência", path: "/projeto-autonomo", tags: ["autônomo", "autonomia", "sobrevivência", "prática"], category: "Soberania Orgânica" },
  { title: "Kit 72h", description: "Kit de emergência para 72 horas", path: "/projeto-autonomo/kit-72h", tags: ["kit", "72h", "emergência", "sobrevivência"], category: "Soberania Orgânica" },
  { title: "Purificação de Água", description: "Técnicas para purificar água", path: "/projeto-autonomo/purificacao-agua", tags: ["água", "purificação", "filtro", "sobrevivência"], category: "Soberania Orgânica" },
  { title: "Protocolos de Apagão", description: "O que fazer em um blackout", path: "/projeto-autonomo/protocolos-apagao", tags: ["apagão", "blackout", "protocolo", "energia"], category: "Soberania Orgânica" },
  { title: "Abrigo de Emergência", description: "Construção de abrigos temporários", path: "/projeto-autonomo/abrigo-emergencia", tags: ["abrigo", "emergência", "construção", "temporário"], category: "Soberania Orgânica" },
  { title: "Comunicação Offline", description: "Rádio e comunicação sem internet", path: "/projeto-autonomo/comunicacao-offline", tags: ["comunicação", "offline", "rádio", "mesh"], category: "Soberania Orgânica" },
  { title: "Navegação Primária", description: "Orientação sem GPS", path: "/projeto-autonomo/navegacao-primaria", tags: ["navegação", "bússola", "estrelas", "orientação"], category: "Soberania Orgânica" },
  { title: "Horta Urbana", description: "Produção de alimentos em espaços urbanos", path: "/projeto-autonomo/horta-urbana", tags: ["horta", "urbana", "alimento", "cultivo"], category: "Soberania Orgânica" },
  { title: "Autonomia Biológica", description: "Plantas medicinais e ervas", path: "/projeto-autonomo/autonomia-biologica", tags: ["biológica", "plantas", "ervas", "medicinal"], category: "Soberania Orgânica" },
  { title: "Primeiros Socorros", description: "Técnicas básicas de socorro", path: "/projeto-autonomo/primeiros-socorros", tags: ["primeiros socorros", "saúde", "emergência", "medicina"], category: "Soberania Orgânica" },
  { title: "Saúde Preventiva", description: "Prevenção e auto-cuidado", path: "/projeto-autonomo/saude-preventiva", tags: ["saúde", "preventiva", "prevenção", "cuidado"], category: "Soberania Orgânica" },
  { title: "Fitoterapia Aplicada", description: "Uso prático de plantas medicinais", path: "/projeto-autonomo/fitoterapia-aplicada", tags: ["fitoterapia", "plantas", "medicinal", "natural"], category: "Soberania Orgânica" },
  { title: "Conservação & Armazenamento", description: "Técnicas de conservação de alimentos", path: "/projeto-autonomo/conservacao-armazenamento", tags: ["conservação", "armazenamento", "alimento", "estoque"], category: "Soberania Orgânica" },
  { title: "Produção em Pequenos Espaços", description: "Cultivo em apartamentos e varandas", path: "/projeto-autonomo/producao-pequenos-espacos", tags: ["pequenos espaços", "apartamento", "varanda", "cultivo"], category: "Soberania Orgânica" },
  { title: "Proteína Sustentável", description: "Fontes alternativas de proteína", path: "/projeto-autonomo/proteina-sustentavel", tags: ["proteína", "sustentável", "alimento", "alternativa"], category: "Soberania Orgânica" },
  { title: "Solo e Fertilidade", description: "Preparação e manutenção do solo", path: "/projeto-autonomo/solo-fertilidade", tags: ["solo", "fertilidade", "compostagem", "terra"], category: "Soberania Orgânica" },
  { title: "Sabedoria Ancestral", description: "Conhecimentos tradicionais de sobrevivência", path: "/projeto-autonomo/sabedoria-ancestral", tags: ["ancestral", "tradicional", "sabedoria", "conhecimento"], category: "Soberania Orgânica" },
  { title: "Conhecimento Perdido", description: "Habilidades esquecidas pela modernidade", path: "/projeto-autonomo/conhecimento-perdido", tags: ["conhecimento", "perdido", "habilidade", "esquecido"], category: "Soberania Orgânica" },
  { title: "Controle de Vetores", description: "Controle de pragas e vetores de doenças", path: "/projeto-autonomo/controle-vetores", tags: ["vetores", "pragas", "controle", "doenças"], category: "Soberania Orgânica" },

  // Tóxicos Ocultos
  { title: "Tóxicos Ocultos", description: "Ameaças invisíveis à sua autonomia", path: "/projeto-autonomo/toxicos-ocultos", tags: ["tóxicos", "ocultos", "ameaças", "veneno"], category: "Tóxicos Ocultos" },
  { title: "Toxinas Alimentares", description: "Venenos escondidos na sua comida", path: "/projeto-autonomo/toxicos-ocultos/toxinas-alimentares", tags: ["toxinas", "alimentar", "veneno", "comida"], category: "Tóxicos Ocultos" },
  { title: "Manipulação Informacional", description: "Propaganda e controle narrativo", path: "/projeto-autonomo/toxicos-ocultos/manipulacao-informacional", tags: ["manipulação", "informação", "propaganda", "narrativa"], category: "Tóxicos Ocultos" },
  { title: "Dependência Tecnológica", description: "O vício em tecnologia como ferramenta de controle", path: "/projeto-autonomo/toxicos-ocultos/dependencia-tecnologica", tags: ["dependência", "tecnologia", "vício", "controle"], category: "Tóxicos Ocultos" },
  { title: "Toxinas Ambientais", description: "Poluentes e contaminantes no ambiente", path: "/projeto-autonomo/toxicos-ocultos/toxinas-ambientais", tags: ["toxinas", "ambiental", "poluição", "contaminante"], category: "Tóxicos Ocultos" },
];

// Simple fuzzy match
export function fuzzySearch(query: string, entries: SearchEntry[]): SearchEntry[] {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!q) return [];

  return entries
    .map((entry) => {
      const haystack = [entry.title, entry.description, ...entry.tags, entry.category]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Check for direct substring match
      if (haystack.includes(q)) return { entry, score: 3 };

      // Check individual words
      const words = q.split(/\s+/);
      const matches = words.filter((w) => haystack.includes(w)).length;
      if (matches > 0) return { entry, score: matches / words.length };

      return { entry, score: 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.entry);
}
