import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Archive } from 'lucide-react';
import { FlaskConical } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Wind } from 'lucide-react';
import { Snowflake } from 'lucide-react';
import { Flame } from 'lucide-react';
import { Package } from 'lucide-react';
import { Droplet } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/conservacao-hero.jpg';
import imgDesidratacao from '@/assets/saida/conservacao-desidratacao.jpg';
import imgPressurizada from '@/assets/saida/conservacao-pressurizada.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Metodo {
  num: string;
  nome: string;
  contexto: string;
  validade: string;
  custo: string;
  energia: string;
  passos: string[];
  alimentos: string;
  riscos: string;
  icon: typeof FlaskConical;
}

const METODOS: Metodo[] = [
  {
    num: '01',
    nome: 'Fermentação Láctica',
    contexto: 'Conservação ancestral por bactérias do gênero Lactobacillus em ambiente anaeróbico salgado. Não exige energia elétrica, não exige cocção. Aumenta biodisponibilidade de nutrientes, gera probióticos vivos, preserva enzimas.',
    validade: '6 a 24 meses em ambiente fresco e escuro. Após aberto, 2 a 6 meses sob refrigeração.',
    custo: 'USD 0,30 a 0,80 por litro produzido. Pote de vidro reutilizável + sal grosso + vegetal.',
    energia: 'Zero. Apenas temperatura ambiente entre 18 e 24 °C nos primeiros 7 a 14 dias.',
    icon: FlaskConical,
    passos: [
      'Selecione vegetais firmes e frescos: repolho, cenoura, beterraba, pepino, rabanete, pimentão, gengibre, alho. Lave bem mas não esterilize. As bactérias selvagens da casca são parte do processo.',
      'Calcule a salmoura: 2 a 3 % de sal sobre o peso total do vegetal. Para 1 kg de repolho, use 20 a 30 g de sal grosso sem iodo (sal refinado iodado inibe a fermentação).',
      'Macere ou triture o vegetal misturado ao sal por 10 a 15 minutos. Para vegetais inteiros, prepare salmoura líquida na mesma proporção: 30 g de sal por litro de água filtrada.',
      'Empacote firme em pote de vidro de boca larga, eliminando bolhas de ar. Pressione até o líquido cobrir totalmente. Use peso (pedra esterilizada, saquinho de água, disco de fermentação) para manter submerso.',
      'Cubra com pano respirável ou tampa com airlock. Mantenha em local escuro, 18 a 24 °C. Verifique diariamente nos primeiros 3 dias para liberar gás. Pronto entre 7 e 21 dias dependendo da temperatura.',
      'Após o gosto desejado (azedo limpo, crocância preservada), transfira para refrigerador ou despensa fresca. Fermentação não para, apenas desacelera dramaticamente.',
    ],
    alimentos: 'Repolho (chucrute, kimchi), pepino (picles fermentados), beterraba, cenoura, rabanete, alho preto, pimenta (molho fermentado), missô, kombuchá, kefir, iogurte tradicional.',
    riscos: 'Mofo branco na superfície é parte do processo (kahm yeast), retire e prossiga. Mofo colorido (verde, preto, rosa, azul) ou cheiro pútrido descarte tudo. Salmoura insuficiente (abaixo de 1,5 %) gera proliferação de Clostridium botulinum em vegetais não ácidos. Nunca abaixe de 2 % por excesso de cuidado calórico.',
  },
  {
    num: '02',
    nome: 'Desidratação Solar',
    contexto: 'Método mais antigo registrado, usado por povos indígenas, beduínos e andinos. Energia solar gratuita, zero infraestrutura elétrica. Funciona em climas quentes, secos e ventilados. Depende de luz e ausência de chuva.',
    validade: '6 meses a 2 anos em recipientes vedados ao abrigo de luz e umidade.',
    custo: 'USD 30 a 80 para construir secador solar caseiro com madeira, vidro e tela mosquiteira inox.',
    energia: 'Zero elétrica. Sol direto por 5 a 8 horas/dia durante 2 a 5 dias.',
    icon: Sun,
    passos: [
      'Construa o secador solar: caixa de madeira (60 x 40 x 15 cm), pintada de preto fosco interno, tampa de vidro inclinada 30°, telas de mosquiteiro inox empilhadas em 2 a 3 níveis com espaçamento de 4 cm. Aberturas inferior (entrada de ar) e superior (saída de vapor).',
      'Selecione alimentos maduros e firmes. Lave, descasque se necessário e fatie em espessura uniforme: frutas em 4 a 6 mm, vegetais em 3 a 5 mm, carne em tiras finas de 4 a 6 mm.',
      'Pré-tratamento opcional: frutas (mergulho rápido em água com limão evita escurecimento), vegetais (branqueamento de 2 min em água fervente preserva cor e vitaminas), carne (marinada com sal, pimenta, alho por 6 a 12 h).',
      'Distribua sem sobreposição nas telas. Mantenha o secador exposto ao sol entre 9h e 16h, com inclinação seguindo o sol. Recolha à noite para evitar reabsorção de umidade.',
      'Verifique progressivamente: frutas devem ficar coriáceas e flexíveis (sem umidade ao apertar). Vegetais quebradiços. Carne (jerky) seca, dobrável sem rachar. Tempo: 2 a 5 dias dependendo de umidade ambiente.',
      'Armazene em vidro vedado com sachê absorvente (ou um grão de arroz) ao abrigo de luz. Para conservação máxima, embale a vácuo após estabilização de 24 h em ambiente fechado.',
    ],
    alimentos: 'Frutas (banana, manga, abacaxi, uva, maçã), vegetais (tomate, cebola, pimentão, abobrinha, ervas), carne magra (jerky bovino, peixe, frango). Evite alimentos gordurosos, gordura ranção rapidamente.',
    riscos: 'Umidade residual >10 % gera mofo. Insetos: tela mosquiteiro fina é obrigatória. Carne mal seca proporciona crescimento de Salmonella e E. coli, alcance temperatura interna mínima de 71 °C antes de iniciar secagem (defume rápido ou aqueça em forno por 10 min como pré-tratamento).',
  },
  {
    num: '03',
    nome: 'Desidratação Elétrica',
    contexto: 'Versão controlada com temperatura constante e ventilação forçada. Reduz tempo de 5 dias para 6 a 24 horas. Independência de clima. Custo elétrico baixo.',
    validade: '1 a 3 anos em embalagem vedada com absorvente de oxigênio.',
    custo: 'USD 80 a 350 (desidratador 5 a 10 bandejas). Operação: USD 0,15 a 0,40 por kg processado.',
    energia: 'Elétrica. Consumo: 300 a 800 W por 6 a 12 h em ciclo típico.',
    icon: Wind,
    passos: [
      'Equipamento recomendado: desidratador com ventilação horizontal forçada (Excalibur, Cosori), termostato regulável de 35 a 75 °C e timer.',
      'Temperatura por categoria: ervas (35 a 40 °C), frutas (55 a 60 °C), vegetais (50 a 55 °C), carne (60 a 70 °C). Temperaturas mais altas selam a superfície e impedem a saída de umidade interna.',
      'Espessura uniforme é crítica. Use mandolin ou faca afiada. Variação >2 mm gera diferença de tempo de secagem e produto inconsistente.',
      'Não sobreponha. Espaço de 3 a 5 mm entre fatias para circulação do ar. Rode bandejas a cada 2 a 3 h em desidratadores com ventilação vertical.',
      'Teste de finalização: frutas devem dobrar sem quebrar, vegetais quebradiços, carne quebradiça mas elástica. Resfrie em ambiente fechado por 24 h antes de embalar para igualar umidade.',
      'Armazene em sacos plásticos foil (mylar) com absorvente de oxigênio (oxygen absorber) e sachê de sílica. Vida útil: 3 a 5 anos para grãos e leguminosas em preparação, 1 a 2 anos para frutas e vegetais.',
    ],
    alimentos: 'Tudo que vai no solar com qualidade superior: cogumelos, beef jerky, salmão defumado parcial, banana chips, morango, ervas finas, sopas instantâneas (caldo desidratado), frutas para granola, milho cozido para reidratação.',
    riscos: 'Temperatura insuficiente (abaixo de 50 °C) gera ambiente ideal para Salmonella em carnes. Embalagem sem oxygen absorber permite oxidação e perda de cor, aroma e nutrientes em 6 a 12 meses.',
  },
  {
    num: '04',
    nome: 'Salga e Cura',
    contexto: 'Método milenar de remoção de água por osmose. O sal puro inibe a maioria dos microrganismos. Curas com nitrato e nitrito (sal de cura rosa #1 e #2) eliminam Clostridium botulinum em embutidos e presuntos.',
    validade: '6 meses a vários anos. Bacalhau seco salgado: 1 a 2 anos. Presunto cru tipo Parma: 18 a 36 meses.',
    custo: 'USD 0,50 a 2 por kg processado. Sal grosso, sal de cura, especiarias. Câmara de cura é opcional.',
    energia: 'Zero a baixa. Câmara de cura controlada: 50 W contínuos.',
    icon: Droplet,
    passos: [
      'Salga seca: cubra completamente o alimento (peixe, carne, vegetal) com sal grosso sem iodo. Proporção: 30 a 50 % do peso do alimento. Empilhe em recipiente perfurado para drenagem do líquido extraído.',
      'Salga úmida (salmoura): mergulhe em solução de 18 a 25 % de sal por 6 a 48 h dependendo da espessura. Acelera o processo, gera produto mais uniforme.',
      'Cura curta (5 a 10 dias): bacon, salmão gravlax, peito de pato (magret). Use sal de cura #1 (cloreto de sódio + nitrito de sódio 6,25 %) na proporção exata de 2,5 g por kg de carne. Mistura com especiarias.',
      'Cura longa (semanas a meses): presunto cru, copa, lombo curado. Sal de cura #2 (cloreto + nitrito + nitrato) em proporção 2,5 g/kg. Câmara controlada: 12 a 16 °C, 70 a 85 % UR, ventilação suave.',
      'Lavagem e secagem: após cura, lave em água fria, seque com pano. Pendure em ambiente fresco e ventilado para perda de água adicional (30 a 40 % do peso original) durante 2 a 12 meses.',
      'Armazene fatiado a vácuo ou inteiro envolto em pano de algodão em despensa fresca. Bacon defumado/curado: 6 meses refrigerado, 1 a 2 anos congelado. Presunto cru inteiro: indefinido em ambiente correto.',
    ],
    alimentos: 'Bacalhau (cura por 7 a 30 dias), carne seca brasileira (charque), bacon, presunto cru (Parma, Serrano, prosciutto), copa, peito de pato, salmão gravlax, anchovas em sal, ovos curados em gema.',
    riscos: 'Subdosagem de nitrito em embutido fechado: risco extremo de botulismo (Clostridium botulinum, toxina mortal em 1 mcg). Use balança de precisão 0,1 g e siga proporções exatas. Nunca improvise sal de cura. Compre em fornecedor especializado (não substitui por sal rosa do Himalaia ou refinado iodado).',
  },
  {
    num: '05',
    nome: 'Defumação',
    contexto: 'Combinação de calor controlado, fumaça antibacteriana (compostos fenólicos) e desidratação parcial. Defumação a frio (15 a 30 °C) preserva, defumação a quente (60 a 90 °C) cozinha e preserva.',
    validade: 'Defumação a frio (após cura): 2 a 6 meses refrigerado, 1 a 2 anos congelado. Defumação a quente: 1 a 2 semanas refrigerado.',
    custo: 'USD 100 a 600 (defumador caseiro). Lenha de qualidade: USD 5 a 20 por kg.',
    energia: 'Madeira/serragem como combustível principal. Termômetro digital para controle.',
    icon: Flame,
    passos: [
      'Pré-cura obrigatória para defumação a frio: salga seca ou salmoura por 8 a 48 h conforme tipo. Sem cura prévia, alimento estraga durante o processo.',
      'Tipos de madeira: nogueira (pecan, hickory) para carnes vermelhas, macieira/cerejeira para aves e peixes brancos, carvalho neutro para tudo, ipê para sabor brasileiro intenso. Evite madeiras resinosas (pinus, eucalipto cru) que geram fumaça tóxica.',
      'Defumação a frio (15 a 30 °C): gerador de fumaça externo conectado por duto, separando fonte de calor da câmara. Tempo: 6 a 24 h, em ciclos de 4 a 6 h por dia, com pausa para evitar acúmulo excessivo de fenóis. Produto sai cru, exige refrigeração ou cura adicional.',
      'Defumação a quente (60 a 90 °C): caixa única com fonte de calor e madeira na base. Termômetro de sonda no centro da peça. Tempo: 3 a 8 h até alcançar temperatura interna segura: 71 °C frango, 63 °C carne, 71 °C porco moído, 60 °C peixe.',
      'Resfriamento controlado: deixe descansar em ambiente fresco por 12 a 24 h após defumação para estabilizar sabor e textura. Não corte quente, perde umidade.',
      'Armazene a vácuo refrigerado ou congelado. Defumação não é conservação completa em alimentos frescos, é etapa adicional após cura.',
    ],
    alimentos: 'Salmão, truta, bacon, costela suína, peito de peru, presunto cozido tipo bratwurst, queijo (defumação a frio em <25 °C), pimentão (paprica defumada artesanal), sal e pimenta defumados.',
    riscos: 'Defumação a frio em alimento sem cura prévia gera Listeria e Salmonella. Madeira tratada quimicamente (compensado, móvel descartado, MDF) libera formaldeído e dioxinas cancerígenas. Use exclusivamente madeira limpa de fornecedor culinário.',
  },
  {
    num: '06',
    nome: 'Conservas Pressurizadas (Canning)',
    contexto: 'Esterilização térmica em recipientes vedados sob pressão. Único método doméstico que destrói esporos de Clostridium botulinum em alimentos pouco ácidos (carne, vegetais, sopas).',
    validade: '1 a 5 anos em local fresco, escuro e seco. Carne: 2 a 5 anos. Vegetais: 1 a 3 anos.',
    custo: 'USD 200 a 500 (panela de pressão para canning de boca larga). Frascos Mason: USD 1 a 3/unidade reutilizáveis.',
    energia: 'Elétrica/gás. Operação intensa por 60 a 90 min por ciclo.',
    icon: Package,
    passos: [
      'Equipamento essencial: panela de pressão calibrada para canning (não pressão comum), frascos Mason de boca larga ou estreita, tampas de duas peças (anel + disco com selo), pinça para frascos quentes, funil largo, manômetro calibrado anualmente.',
      'Esterilize frascos: ferver por 10 min ou ciclo completo no lava-louças com calor alto. Mantenha quentes até preencher.',
      'Preparação do alimento: cozinhe parcialmente carne ou vegetal. Encha frasco quente deixando 2 a 3 cm de espaço livre na borda. Adicione sal não iodado se desejado (1 colher de chá por litro). Limpe a borda com pano úmido (qualquer resíduo impede selagem).',
      'Posicione tampa e anel sem apertar excessivamente (apenas firmeza de dedos). Coloque frascos na panela com 2 a 3 cm de água no fundo + grade de apoio. Não submerja frascos.',
      'Pressurize: 11 PSI para altitudes <300 m (10 lb), 12 PSI 300 a 600 m, 13 PSI 600 a 900 m. Tempo: vegetais 25 a 90 min, carne 75 a 90 min, sopas 60 a 75 min. Consulte tabelas USDA específicas por alimento.',
      'Resfriamento natural: deixe a pressão cair sozinha (45 a 60 min). Nunca abra panela ainda quente. Após retirar frascos, descanse por 24 h em pano. Verifique selagem: tampa côncava firme e sem flexibilidade ao apertar.',
    ],
    alimentos: 'Carne bovina e suína em cubos, frango desossado, ensopados, sopas (sem laticínios e sem amido), feijão cozido, milho, ervilha, cenoura, batata, cogumelos, caldo de osso, pasta de tomate concentrada.',
    riscos: 'Botulismo é a ameaça #1. Sintomas surgem 12 a 36 h após ingestão: visão turva, dificuldade de fala, paralisia descendente, morte por insuficiência respiratória. Frasco com tampa abaulada, líquido turvo, gás ao abrir, cheiro estranho: descarte sem provar. Nunca use banho-maria comum (água fervente <100 °C) para alimentos pouco ácidos. Apenas pressão atinge 116 a 121 °C necessários para destruir esporos.',
  },
  {
    num: '07',
    nome: 'Embalagem a Vácuo',
    contexto: 'Remoção de oxigênio em embalagem vedada. Não é conservação por si só, é multiplicador de validade dos outros métodos. Reduz oxidação, queimaduras de freezer e proliferação de bactérias aeróbicas.',
    validade: 'Multiplica em 3 a 5x a validade do método base. Carne fresca refrigerada: 5 a 7 dias vs 2 dias. Carne congelada: 2 a 3 anos vs 6 meses. Café em grão: 12 meses vs 3 meses.',
    custo: 'USD 80 a 400 (seladora doméstica). Sacos texturizados: USD 0,15 a 0,40/unidade.',
    energia: 'Baixíssima. 200 a 500 W por 30 a 60 segundos por ciclo.',
    icon: Package,
    passos: [
      'Selecione seladora a vácuo: modelos externos (FoodSaver, Anova) para uso doméstico, modelos de câmara (chamber sealer) para grandes volumes ou líquidos.',
      'Saco compatível: texturizado (canais permitem aspiração), espessura mínima 90 microns. Sacos lisos comuns não funcionam em seladoras externas.',
      'Pré-congele líquidos e alimentos macios (sopas, frutas vermelhas) por 1 h antes de selar. Caso contrário, vácuo suga líquido e contamina selo.',
      'Posicione alimento no saco deixando 7 a 10 cm livres na boca. Limpe a borda interna do saco antes de selar (gordura ou umidade impedem selo perfeito).',
      'Acione vácuo + selo. Verifique selagem com inspeção visual: linha de selo contínua e firme, sem dobras ou bolhas.',
      'Combine com refrigeração ou congelamento para máxima validade. A vácuo em temperatura ambiente: apenas para alimentos secos (cereais, café, ervas, jerky, biscoitos).',
    ],
    alimentos: 'Carne, peixe, queijo curado, café, café verde, ervas secas, jerky, frutas desidratadas, sementes, cereais, refeições preparadas (sous vide), tabaco, hardware sensível (chips, cabos).',
    riscos: 'Falsa segurança: vácuo não esteriliza nem mata bactérias anaeróbicas (Clostridium, Listeria). Em alimentos úmidos não cozidos a vácuo refrigerado, pode acelerar produção de toxinas. Combine sempre com cura, cozimento, congelamento ou desidratação.',
  },
  {
    num: '08',
    nome: 'Congelamento Estratégico',
    contexto: 'Congelamento abaixo de -18 °C para a maioria dos alimentos, -25 °C para conservação prolongada. Não destrói bactérias, apenas paralisa multiplicação. Após descongelar, contagem retoma.',
    validade: 'Carne vermelha: 6 a 12 meses (até 24 meses a vácuo). Aves: 4 a 9 meses. Peixe gordo: 2 a 3 meses (oxida rápido). Vegetais branqueados: 8 a 12 meses. Pão: 1 a 3 meses.',
    custo: 'Freezer vertical 200 L: USD 400 a 800. Operação: USD 4 a 12/mês de eletricidade.',
    energia: 'Contínua. 100 a 250 W médios em ciclo. Backup com gerador ou solar é estratégia avançada.',
    icon: Snowflake,
    passos: [
      'Branqueamento de vegetais: ferva por 1 a 5 min (depende do tamanho), choque térmico em água com gelo por igual tempo, escorra. Sem branqueamento, enzimas continuam ativas no freezer e degradam textura, cor e nutrientes.',
      'Embale por porção de uso individual. Saquinhos ziplock + extração manual de ar, ou embalagem a vácuo. Etiquete com nome e data (caneta permanente). Use FIFO (primeiro a entrar, primeiro a sair).',
      'Resfrie alimento cozido completamente antes de congelar. Calor residual eleva temperatura do freezer e degrada produtos vizinhos.',
      'Distribua em camadas finas para congelamento rápido (cristais menores preservam textura). Após sólido, empilhe e organize.',
      'Mantenha o freezer 2/3 cheio. Mais vazio gera flutuação térmica, mais cheio impede circulação. Se faltar conteúdo, complete com garrafas de água (também serve como backup em queda de energia).',
      'Plano de queda de energia: freezer fechado mantém temperatura por 24 a 48 h. Tenha gerador a gasolina (3 a 5 kW), inversor solar com bateria de 100 Ah, ou plano de cozimento emergencial dos alimentos prioritários.',
    ],
    alimentos: 'Carne, peixe, aves, frutas (banana descascada, frutas vermelhas), vegetais branqueados, ervas em cubo de azeite, ensopados, pão fatiado, manteiga, queijos duros, gelo, água potável armazenada.',
    riscos: 'Recongelar alimento descongelado dobra a carga bacteriana. Apenas recongele se ainda contém cristais de gelo (parcialmente descongelado). Queimadura de freezer: oxidação superficial por contato com ar, indica embalagem inadequada. Falha elétrica >48 h: descongele e cozinhe imediatamente, ou descarte.',
  },
];

const COMPARATIVO = [
  ['Critério', 'Fermentação', 'Desidratação', 'Salga/Cura', 'Defumação', 'Conserva', 'Vácuo', 'Congelamento'],
  ['Energia', 'Zero', 'Sol ou baixa', 'Zero', 'Madeira', 'Alta', 'Mínima', 'Contínua'],
  ['Validade', '6 a 24 m', '1 a 3 anos', '6 m a 3 anos', '6 m a 2 anos', '1 a 5 anos', 'Multiplica 3x', '6 a 24 m'],
  ['Custo inicial', 'USD 10', 'USD 80 a 350', 'USD 50', 'USD 100 a 600', 'USD 200 a 500', 'USD 80 a 400', 'USD 400 a 800'],
  ['Risco técnico', 'Baixo', 'Médio (carne)', 'Alto (cura)', 'Alto', 'Crítico', 'Médio', 'Baixo'],
  ['Independência elétrica', 'Total', 'Solar: total', 'Total', 'Total', 'Não', 'Não', 'Não'],
  ['Escala doméstica', '1 a 50 L', '5 a 50 kg', '10 a 100 kg', '5 a 30 kg', '20 a 200 frascos', 'Ilimitada', '100 a 400 L'],
];

const ERROS = [
  'Usar sal iodado em fermentação: o iodo inibe os Lactobacillus e mata o processo. Use somente sal grosso, marinho ou rocha sem iodo.',
  'Banho-maria em alimento pouco ácido (carne, vegetal sem vinagre): risco crítico de botulismo. Apenas pressão a 116 °C garante destruição dos esporos.',
  'Improvisar sal de cura para presunto/embutido sem balança de precisão: subdose mata. Pese com 0,1 g de exatidão.',
  'Defumar carne crua sem cura prévia em defumação a frio: ambiente perfeito para Listeria, Salmonella e Clostridium.',
  'Recongelar carne descongelada acima de 4 °C por mais de 2 horas: a contagem bacteriana dobra a cada 20 min entre 4 e 60 °C.',
  'Armazenar conserva caseira em armário quente próximo a fogão: temperaturas acima de 25 °C aceleram degradação e podem reativar esporos sobreviventes.',
];

const FAQ = [
  {
    q: 'Qual o método mais seguro para iniciante?',
    a: 'Fermentação láctica de vegetais (chucrute, kimchi, picles fermentados). O ambiente ácido gerado pelos Lactobacillus inibe quase todos os patógenos perigosos. Risco de botulismo é praticamente nulo em vegetais corretamente salgados (2 a 3 % de sal). Em segundo lugar, congelamento e desidratação solar de frutas. Evite conservas pressurizadas, salga de carne crua e defumação até dominar os fundamentos.',
  },
  {
    q: 'Posso fazer conserva de carne em panela de pressão comum?',
    a: 'Não. Panela de pressão comum atinge ~110 °C com tampa fechada, mas não mantém pressão constante por 75 a 90 min, e não tem manômetro calibrado. Para canning de carne é obrigatório usar panela específica (Presto, All American), com capacidade para frascos de 1 L em pé e manômetro testado anualmente. Investimento: USD 200 a 500 vs risco de botulismo letal.',
  },
  {
    q: 'Como saber se um vegetal fermentado estragou?',
    a: 'Sinais de fermentação saudável: cheiro azedo limpo (lembra picles), borbulhamento moderado nos primeiros dias, líquido turvo é normal, mofo branco superficial (kahm yeast) é inofensivo. Sinais de descarte: mofo colorido (preto, verde, rosa, azul), cheiro pútrido ou de podridão, textura pegajosa ou gelatinosa, gás excessivo após 21 dias. Em dúvida, descarte. Nunca prove para confirmar suspeita.',
  },
  {
    q: 'Sal rosa do Himalaia substitui sal de cura?',
    a: 'Não, é o erro mais perigoso da conservação caseira. Sal rosa do Himalaia é cloreto de sódio com traços de minerais. Sal de cura #1 e #2 contém nitrito e nitrato de sódio em proporção exata (6,25 % de nitrito), únicos compostos que destroem Clostridium botulinum em embutidos fechados. Compre em fornecedores específicos como Defumare, Ataua, Sosa, Modernist Pantry ou similares.',
  },
  {
    q: 'Quanto tempo dura comida desidratada solar?',
    a: 'Dependendo do alimento e do armazenamento: frutas 6 a 12 meses em vidro vedado, vegetais 1 a 2 anos com absorvente de oxigênio, carne (jerky) 1 a 6 meses sem refrigeração, 1 a 2 anos refrigerado ou congelado. Vida útil duplica ou triplica com embalagem a vácuo + sachê de sílica. Sempre armazene ao abrigo de luz, calor e umidade.',
  },
  {
    q: 'Existe risco de botulismo em alimento fermentado?',
    a: 'Em vegetais fermentados (chucrute, kimchi) com sal correto (≥2 %): praticamente zero. O ambiente ácido gerado por Lactobacillus (pH <4,6) inibe Clostridium botulinum. Em fermentações de baixa acidez (peixe fermentado tradicional, carne crua, alho cru em óleo): risco real. Evite alho cru em óleo sem refrigeração ou acidificação prévia (vinagre).',
  },
  {
    q: 'Vale a pena ter freezer em casa em zona com queda elétrica frequente?',
    a: 'Sim, mas com plano de redundância. Freezer fechado mantém temperatura segura por 24 a 48 h. Plano completo: gerador a gasolina (USD 600 a 1500), inversor solar com 200 a 400 W painel + bateria 100 Ah (USD 1500 a 3000), ou estratégia mista de congelamento + desidratação + fermentação para diversificar dependência. Em zona de mais de 4 quedas/mês acima de 6 h, priorize fermentação e desidratação como primários.',
  },
  {
    q: 'Como começar do zero com baixo investimento?',
    a: 'Tier 1 (USD 50): 6 potes Mason 1 L, 5 kg sal grosso sem iodo, balança digital 0,1 g, repolho, beterraba, cenoura, cúrcuma, pimenta. Faça 4 fermentações em 30 dias. Tier 2 (USD 200): adicione desidratador 5 bandejas. Tier 3 (USD 800): seladora a vácuo, congelador horizontal 200 L. Tier 4 (USD 2000+): panela de pressão para canning, defumador caseiro, gerador, inversor solar.',
  },
];

const CHECKLIST = [
  'Dia 1-3: Inventário do que você consome e descarta. Liste itens que vencem antes de serem usados. Esses são os primeiros candidatos à conservação.',
  'Dia 4-7: Compre kit base de fermentação. 6 potes Mason 1 L, 2 kg sal grosso sem iodo, balança digital 0,1 g, 1 kg repolho, 500 g cenoura. Faça primeiro chucrute.',
  'Dia 8-14: Acompanhe a fermentação diariamente. Anote temperatura ambiente, dia em que começou a borbulhar, dia da degustação (entre 7 e 14). Refrigere após pronto.',
  'Dia 15-21: Inicie desidratação solar de frutas (banana, manga). Construa secador caseiro ou use forno em 60 °C por 6 a 8 h com porta entreaberta. Armazene em vidro com absorvente.',
  'Dia 22-30: Compre seladora a vácuo básica. Selar e congelar 2 kg de carne em porções de uso. Selar 1 kg de café em grão para conservar aroma.',
  'Mês 2: Adicione conserva ácida (picles em vinagre, geleia, conserva de tomate em banho-maria por ser ácido). Não tente carne ou vegetal pouco ácido até ter pressão calibrada.',
  'Mês 3-4: Teste salga e cura simples: bacalhau seco caseiro (10 dias), bacon curado (7 dias com sal de cura #1), salmão gravlax (48 h).',
  'Mês 5-6: Construa defumador caseiro com bombona ou tijolo. Treine defumação a quente de costela, peito de peru e pimentões.',
  'Mês 7-12: Adquira panela de pressão para canning. Comece com sopas e ensopados em frascos de 500 ml. Avance para carne em cubos após 3 lotes consecutivos perfeitos.',
  'Anual: Recalibre manômetro de canning, troque selos de frascos Mason, faça inventário FIFO de toda a despensa, descarte itens fora da validade.',
];

export default function ConservacaoAlimentos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/conservacao-alimentos"
        custom={{
          title: 'Conservação de Alimentos: Fermentação, Desidratação, Cura, Defumação e Conservas',
          description: 'Manual completo de conservação alimentar: fermentação láctica, desidratação solar e elétrica, salga, cura, defumação, conservas pressurizadas, vácuo e congelamento estratégico.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/conservacao-alimentos',
          primaryKeyword: 'conservação de alimentos',
          lsiKeywords: ['fermentação láctica', 'desidratação solar', 'salga e cura de carne', 'defumação caseira', 'conserva pressurizada', 'embalagem a vácuo', 'congelamento estratégico'],
          longTailKeywords: ['como conservar alimentos sem energia', 'fermentação láctica passo a passo', 'desidratação solar caseira', 'cura de bacon caseiro', 'conserva de carne em panela de pressão', 'como fazer chucrute caseiro'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Conservação de Alimentos', url: '/soberania-organica/conservacao-alimentos' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/protocolo-fogo', '/soberania-organica/horta-urbana', '/soberania-organica/conservacao-armazenamento', '/soberania-organica/kit-72h'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-stone-100 relative z-10">
        <CinematicHero
          image={heroImg}
          phase="Soberania Orgânica · Autonomia Alimentar"
          title={
            <>
              Conservação de Alimentos:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o que sua despensa guarda quando o supermercado para</span>
            </>
          }
          subtitle="Conservação não é hobby de avó nem fetiche zero waste. É infraestrutura. Quem domina fermentação, desidratação, cura, defumação e conserva pressurizada tem 6 a 36 meses de autonomia alimentar. Quem depende de geladeira moderna tem 48 horas em apagão."
          icon={Archive}
          accentColor="amber"
          backLink="/soberania-organica"
          backLabel="Soberania Orgânica"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05] mb-8" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              A despensa é o orçamento real{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">da sua autonomia.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                A geladeira moderna criou a ilusão de despensa infinita. Você compra para a semana, descarta o que vence, repõe na sexta. Em colapso de cadeia (greve de caminhoneiros, queda elétrica regional, sanção econômica, escassez de combustível), a fila no mercado começa em 6 horas e acaba em 48. Quem não tem despensa real come o que acumulou ou negocia com vizinhos.
              </p>
              <p>
                Conservação alimentar é a ponte entre a fartura sazonal e a escassez programada. A safra de tomate de janeiro vira conserva pressurizada de molho até dezembro. O excedente de repolho de inverno vira chucrute de 18 meses. A picanha em promoção vira charque desidratado. O bacalhau em oferta de Natal vira reserva proteica do ano inteiro. Não é nostalgia, é matemática operacional.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                Despensa cheia é dinheiro convertido em comida que não se desvaloriza. Em economia inflacionária, é hedge térmico contra papel impresso.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — 8 MÉTODOS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Oito métodos,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">cada um para um tipo de alimento e cenário.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Não existe método único superior. Cada técnica resolve uma classe de problema: energia disponível, tipo de alimento, validade alvo, espaço, tolerância a risco. Combine.
            </p>
          </motion.div>

          <div className="space-y-10">
            {METODOS.map((m, i) => (
              <motion.div
                key={m.num}
                {...fade(i * 0.04)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-10 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-6 mb-8 pb-8 border-b border-stone-800">
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <span className="text-7xl md:text-8xl font-black text-amber-400/90 leading-none" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
                      {m.num}
                    </span>
                    <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20 inline-flex">
                      <m.icon size={20} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="md:col-span-9 space-y-3">
                    <h3 className="text-3xl md:text-5xl font-black uppercase text-stone-100 leading-[1.1]" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
                      {m.nome}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-light italic">{m.contexto}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Validade</p>
                        <p className="text-amber-400 text-xs font-bold font-mono leading-snug">{m.validade}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Custo</p>
                        <p className="text-amber-400 text-xs font-bold font-mono leading-snug">{m.custo}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Energia</p>
                        <p className="text-amber-400 text-xs font-bold font-mono leading-snug">{m.energia}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-7">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400 mb-4">Sequência operacional</p>
                    <ol className="space-y-3">
                      {m.passos.map((p, idx) => (
                        <li key={idx} className="flex gap-3 text-stone-300 text-sm leading-relaxed font-light">
                          <span className="text-amber-400 font-mono text-xs font-bold pt-0.5 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="md:col-span-5 space-y-5">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-2">Alimentos compatíveis</p>
                      <p className="text-stone-300 text-xs leading-relaxed font-light">{m.alimentos}</p>
                    </div>
                    <div className="p-4 rounded-sm bg-red-950/20 border border-red-900/40">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-2">Riscos críticos</p>
                      <p className="text-stone-300 text-xs leading-relaxed font-light">{m.riscos}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM DESIDRATAÇÃO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgDesidratacao}
              alt="Bandejas de desidratador empilhadas com tiras de jerky bovino, fatias de manga e tomate, ao lado de cristais de sal grosso e timer analógico vintage, fotografia cinematográfica documental em tons quentes."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Métodos 02 e 03 · Desidratação</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase italic max-w-2xl leading-[1.2]" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
                Remover água é remover o tempo da decomposição.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — TABELA COMPARATIVA */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Comparativo objetivo{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">dos oito métodos.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Use a tabela para definir prioridade de investimento e combinação ideal para sua realidade de espaço, energia e tolerância a risco.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-sm border border-stone-800">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="bg-stone-950 border-b border-stone-800">
                  {COMPARATIVO[0].map((h, i) => (
                    <th key={i} className="text-left p-3 md:p-4 text-amber-400 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.slice(1).map((row, i) => (
                  <tr key={i} className="border-b border-stone-800/60 hover:bg-stone-900/30 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`p-3 md:p-4 ${j === 0 ? 'text-stone-100 font-bold' : 'text-stone-300 font-light'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* IMAGEM PRESSURIZADA */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgPressurizada}
              alt="Panela de pressão para canning com manômetro vintage sobre fogão, frascos Mason de molho de tomate, picles e tomates inteiros enfileirados em bancada de slate, fotografia documental cinematográfica."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Método 06 · Conservas Pressurizadas</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase italic max-w-2xl leading-[1.2]" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
                A linha entre 100 °C e 121 °C separa segurança alimentar de botulismo.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — ERROS FATAIS */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-red-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Seis erros fatais{' '}
              <span className="italic font-serif text-red-400 font-light normal-case tracking-tight">que matam mais que falta de comida.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Conservação mal executada é mais perigosa que comida estragada visível. Patógenos invisíveis (Clostridium, Listeria, Salmonella) não alteram aparência nem cheiro. Mate o erro antes que ele te mate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {ERROS.map((e, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="flex gap-4 p-5 rounded-sm bg-red-950/15 border border-red-900/40 hover:border-red-700/60 transition-all duration-500"
              >
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 text-sm leading-relaxed font-light">{e}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 5 — CHECKLIST */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05] mb-6" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Checklist 12 meses{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">para construir uma despensa real.</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {CHECKLIST.map((c, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.03)}
                className="flex gap-4 p-5 rounded-sm bg-stone-950/60 border border-stone-800 hover:border-amber-500/30 transition-all duration-500"
              >
                <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300 text-sm leading-relaxed font-light">{c}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-12 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Dúvidas Operacionais</span>
            <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase text-stone-100 leading-[1.05]" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Perguntas frequentes
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.03)}
                className="rounded-sm border border-stone-800 bg-stone-950/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-stone-900/60 transition-colors"
                >
                  <span className="text-stone-100 text-base font-medium leading-snug">{f.q}</span>
                  <ChevronDown size={18} className={`text-amber-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="rounded-sm border border-amber-500/30 bg-gradient-to-br from-stone-950 via-stone-950 to-amber-950/20 p-8 md:p-14 text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Próximo Movimento</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase text-stone-100 leading-[1.1] mb-5" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em' }}>
              Conservação fecha o ciclo{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">da autonomia alimentar.</span>
            </h3>
            <p className="text-stone-400 max-w-2xl mx-auto text-base leading-relaxed font-light mb-8">
              Combine com horta urbana, protocolo de fogo e armazenamento de longa duração. A despensa cheia é o final lógico da autonomia que começa no quintal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/soberania-organica/horta-urbana" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors">
                Horta Urbana <ArrowRight size={14} />
              </Link>
              <Link to="/soberania-organica/protocolo-fogo" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-amber-500/40 text-amber-400 font-bold uppercase tracking-wider text-xs hover:bg-amber-500/10 transition-colors">
                Protocolo de Fogo <ArrowRight size={14} />
              </Link>
              <Link to="/soberania-organica/conservacao-armazenamento" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-xs hover:border-stone-500 transition-colors">
                Armazenamento Longo Prazo <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
