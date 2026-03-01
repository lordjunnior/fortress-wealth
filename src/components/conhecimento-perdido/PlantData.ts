/* ═══════════════════════════════════════════════════════════
   DADOS EXPANDIDOS DAS 12+ PLANTAS — BIOQUÍMICA REAL
   Cada ficha: compostos ativos, sinergias, fresco vs seco,
   impacto térmico, risco crônico, quando NÃO é primeira opção.
═══════════════════════════════════════════════════════════ */

export interface PlantaFicha {
  nome: string;
  cientifico: string;
  parteUsada: string;
  melhora: string[];
  comoAge: string;
  preparo: string;
  faixaSegura: string;
  contra: string;
  interacoes: string | null;
  suspensao: string;
  accent: string;
  border: string;
  /* ─── Novos campos bioquímicos ─── */
  compostos: string;
  sinergias: string;
  frescoVsSeco: string;
  impactoTermico: 'aquecedora' | 'refrescante' | 'neutra';
  impactoTermicoDesc: string;
  riscoCronico: string;
  naoUsarPrimeiro: string;
}

/* ═══════════════════════════════════════════
   SISTEMA DIGESTIVO
═══════════════════════════════════════════ */
export const DIGESTIVO: PlantaFicha[] = [
  {
    nome: 'Boldo',
    cientifico: 'Peumus boldus',
    parteUsada: 'Folha',
    melhora: ['Sensação de estômago pesado', 'Digestão lenta', 'Desconforto após excesso alimentar'],
    comoAge: 'Estimula produção de bile, facilitando digestão de gorduras. A boldina (alcaloide principal) atua diretamente nos colangiócitos, aumentando o fluxo biliar e relaxando o esfíncter de Oddi.',
    preparo: 'Infusão leve de 1 folha pequena em água quente por 5 a 10 minutos. Nunca ferver — compostos voláteis se degradam acima de 90°C.',
    faixaSegura: 'Uso pontual, até 2 vezes ao dia por no máximo 5 dias consecutivos.',
    contra: 'Gestantes, obstrução biliar, hepatites agudas, uso prolongado.',
    interacoes: 'Cautela com medicamentos hepáticos (paracetamol, estatinas). Potencializa efeitos de anticoagulantes.',
    suspensao: 'Amarelamento da pele, dor abdominal intensa, urina escura.',
    accent: 'text-green-400',
    border: 'border-green-500/30',
    compostos: 'Boldina (0,1-0,5%), 1,8-cineol, ascaridol, flavonoides (catequina, isoramnetina). A boldina é o alcaloide com maior evidência colerética na literatura.',
    sinergias: 'Boldo + Espinheira-santa: proteção gástrica sinérgica. Boldo + Hortelã: alívio digestivo completo (bile + espasmo).',
    frescoVsSeco: 'Folha seca concentra mais boldina por peso, mas perde compostos voláteis (cineol). Preferir folha seca para efeito colerético; fresca para ação carminativa leve.',
    impactoTermico: 'aquecedora',
    impactoTermicoDesc: 'Estimula secreção gástrica e biliar, gerando sensação de calor digestivo. Contraindicada em quadros de calor gástrico (gastrite aguda).',
    riscoCronico: 'Uso superior a 10 dias consecutivos pode causar hepatotoxicidade por acúmulo de ascaridol. Ciclo recomendado: 5 dias de uso, 10 dias de intervalo.',
    naoUsarPrimeiro: 'Dor epigástrica aguda, suspeita de cálculo biliar, icterícia. Nesses quadros, avaliação médica é obrigatória antes de qualquer fitoterapia.',
  },
  {
    nome: 'Hortelã',
    cientifico: 'Mentha sp.',
    parteUsada: 'Folha',
    melhora: ['Gases', 'Cólicas leves', 'Desconforto intestinal', 'Halitose'],
    comoAge: 'Mentol relaxa musculatura lisa intestinal, reduzindo espasmos. Atua bloqueando canais de cálcio nos miócitos do trato gastrointestinal, com efeito antiespasmódico documentado.',
    preparo: 'Infusão de folhas frescas ou secas por 5 a 10 minutos. Para máxima liberação de mentol, esmagar levemente as folhas antes de infundir.',
    faixaSegura: 'Uso moderado diário em adultos saudáveis — até 3 xícaras.',
    contra: 'Refluxo gastroesofágico severo (mentol relaxa esfíncter esofágico inferior). Crianças menores de 3 anos.',
    interacoes: 'Pode reduzir absorção de medicamentos orais se consumida simultaneamente. Separar por 2 horas.',
    suspensao: 'Piora do refluxo, azia persistente ou irritação oral.',
    accent: 'text-teal-400',
    border: 'border-teal-500/30',
    compostos: 'Mentol (40-50% do óleo essencial), mentona (15-25%), acetato de mentila, ácido rosmarínico, flavonoides (luteolina, apigenina).',
    sinergias: 'Hortelã + Erva-doce: efeito carminativo potencializado (gases + espasmo). Hortelã + Gengibre: náusea pós-prandial.',
    frescoVsSeco: 'Fresca: maior teor de mentol livre (mais refrescante, maior ação antiespasmódica). Seca: concentra ácido rosmarínico (mais anti-inflamatória). Para gases, preferir fresca.',
    impactoTermico: 'refrescante',
    impactoTermicoDesc: 'O mentol ativa receptores TRPM8 (sensação de frio) na mucosa. Efeito refrescante em todo o trato digestivo. Útil em desconfortos com sensação de calor.',
    riscoCronico: 'Uso contínuo prolongado pode causar irritação da mucosa oral e redução do tônus do esfíncter esofágico inferior. Alternar com erva-cidreira a cada 2 semanas.',
    naoUsarPrimeiro: 'Refluxo diagnosticado (DRGE), úlcera esofágica ativa, crianças com histórico de broncoespasmo (mentol inalado pode agravar).',
  },
  {
    nome: 'Espinheira-santa',
    cientifico: 'Maytenus ilicifolia',
    parteUsada: 'Folha',
    melhora: ['Azia leve', 'Desconforto gástrico', 'Sensação de queimação'],
    comoAge: 'Reduz secreção ácida gástrica e forma película protetora sobre a mucosa. Taninos condensados adsorvem-se à mucosa, criando barreira física contra HCl. Friedelin e friedelanol possuem ação antiulcerogênica documentada.',
    preparo: 'Infusão de 1 colher de sopa da folha seca por xícara. Abafar 10 minutos. Consumir morna, 30 minutos antes das refeições.',
    faixaSegura: 'Uso temporário — até 7 dias. Repetir ciclo após 7 dias de intervalo.',
    contra: 'Gestantes (ação embriotóxica em estudos animais). Lactantes.',
    interacoes: 'Cautela com antiácidos e inibidores de bomba de prótons — efeito aditivo.',
    suspensao: 'Sem melhora após 5 dias, dor que irradia para costas, vômitos com sangue.',
    accent: 'text-lime-400',
    border: 'border-lime-500/30',
    compostos: 'Taninos condensados (proantocianidinas), triterpenos pentacíclicos (friedelin, friedelanol), flavonoides (kaempferol). Teor de taninos varia de 7-14% na folha seca.',
    sinergias: 'Espinheira-santa + Boldo: proteção gástrica + estímulo biliar. Espinheira-santa + Camomila: azia + componente ansioso.',
    frescoVsSeco: 'Folha seca é preferível — concentra taninos protetores. Folha fresca pode causar irritação gástrica inicial pela presença de compostos ainda não estabilizados.',
    impactoTermico: 'refrescante',
    impactoTermicoDesc: 'Efeito "apagador" sobre acidez gástrica. Reduz sensação de calor epigástrico. Indicada quando há queimação.',
    riscoCronico: 'Taninos em uso prolongado (>14 dias) podem reduzir absorção de ferro e cálcio. Contraindicada em anemia ferropriva.',
    naoUsarPrimeiro: 'Dor abdominal aguda, vômito com sangue, perda de peso inexplicada. Esses sinais exigem investigação de úlcera complicada ou neoplasia.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA RESPIRATÓRIO
═══════════════════════════════════════════ */
export const RESPIRATORIO: PlantaFicha[] = [
  {
    nome: 'Guaco',
    cientifico: 'Mikania glomerata',
    parteUsada: 'Folha',
    melhora: ['Tosse produtiva', 'Congestão leve', 'Broncoespasmo moderado'],
    comoAge: 'Cumarina possui efeito broncodilatador leve e expectorante. Atua inibindo fosfodiesterase, aumentando AMPc no músculo liso brônquico — mecanismo similar (porém mais leve) ao da aminofilina.',
    preparo: 'Infusão das folhas por 10 minutos. Xarope caseiro: decocção concentrada + mel. Para crianças >6 anos, diluir pela metade.',
    faixaSegura: 'Uso curto — até 5 dias. 1 a 2 xícaras ao dia.',
    contra: 'Problemas hepáticos graves. Distúrbios de coagulação.',
    interacoes: 'Cautela com anticoagulantes (cumarina potencializa efeito). Warfarina, heparina e AAS.',
    suspensao: 'Tosse que piora ou persiste além de 7 dias, hemoptise, dispneia progressiva.',
    accent: 'text-green-300',
    border: 'border-green-400/30',
    compostos: 'Cumarina (0,2-1,0%), ácido caurenóico (diterpeno), ácidos cinâmico e clorogênico, estigmasterol. A cumarina é o marcador farmacognóstico principal.',
    sinergias: 'Guaco + Eucalipto (inalação): broncodilatação + fluidificação sinérgica. Guaco + Gengibre: tosse com componente inflamatório.',
    frescoVsSeco: 'Folha fresca libera mais cumarina volátil (aroma característico de feno). Seca concentra ácido caurenóico (mais anti-inflamatória). Para xarope, preferir fresca. Para chá, seca funciona bem.',
    impactoTermico: 'neutra',
    impactoTermicoDesc: 'Impacto térmico neutro — não gera calor nem frescor perceptível. Ação localizada no epitélio brônquico.',
    riscoCronico: 'Cumarina em uso prolongado (>10 dias) pode causar hepatotoxicidade subclínica. Monitorar se houver histórico hepático.',
    naoUsarPrimeiro: 'Asma severa em crise (requer broncodilatador de resgate), pneumonia, tuberculose, hemoptise. Esses quadros exigem intervenção farmacológica imediata.',
  },
  {
    nome: 'Eucalipto',
    cientifico: 'Eucalyptus globulus',
    parteUsada: 'Folha (inalação)',
    melhora: ['Congestão nasal', 'Muco espesso', 'Sinusite leve'],
    comoAge: 'O 1,8-cineol (eucaliptol) fluidifica secreções respiratórias e possui ação antimicrobiana leve contra Staphylococcus aureus e Streptococcus pneumoniae in vitro.',
    preparo: 'Inalação com vapor — 3 a 5 folhas em água quente. Cobrir cabeça com toalha, 10 minutos. Distância mínima de 30cm do vapor.',
    faixaSegura: 'Uso inalatório pontual — até 3 sessões por dia, máximo 5 dias.',
    contra: 'NUNCA ingerir óleo essencial puro. Crianças menores de 2 anos. Asmáticos severos (pode causar broncoespasmo paradoxal).',
    interacoes: 'Pode acelerar metabolismo hepático de outros fármacos (indução CYP3A4).',
    suspensao: 'Dificuldade respiratória, irritação mucosa intensa, broncoespasmo.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    compostos: '1,8-cineol (eucaliptol, 60-80% do óleo essencial), α-pineno, limoneno, globulol. O cineol é o composto com maior evidência para ação mucolítica.',
    sinergias: 'Eucalipto (inalação) + Guaco (oral): desobstrução respiratória em dois níveis. Eucalipto + Capim-limão: congestão + relaxamento corporal.',
    frescoVsSeco: 'Folha fresca libera significativamente mais cineol no vapor (2-3x). Para inalação, SEMPRE preferir fresca. Seca serve apenas quando fresca não disponível.',
    impactoTermico: 'refrescante',
    impactoTermicoDesc: 'Eucaliptol ativa receptores TRPM8 nas vias aéreas, gerando sensação imediata de frescor e desobstrução. O efeito é mais perceptivo que fisiológico, mas clinicamente útil.',
    riscoCronico: 'Inalação crônica pode dessensibilizar receptores olfatórios e causar irritação da mucosa nasal. Limitar a 5 dias consecutivos.',
    naoUsarPrimeiro: 'Asma em crise aguda, crianças <2 anos, obstrução por corpo estranho, epiglotite. Quadros de emergência ventilatória.',
  },
  {
    nome: 'Capim-limão',
    cientifico: 'Cymbopogon citratus',
    parteUsada: 'Folha',
    melhora: ['Sintomas leves de resfriado', 'Tensão corporal', 'Ansiedade situacional leve'],
    comoAge: 'Citral (geranial + neral) possui ação antimicrobiana, analgésica leve e ansiolítica moderada. O mirceno contribui com efeito sedativo e relaxante muscular.',
    preparo: 'Infusão de folhas frescas por 5 a 10 minutos. Quanto mais frescas, maior o teor de citral. Pode-se macerar antes de infundir.',
    faixaSegura: '1 a 2 xícaras ao dia. Uso prolongado aceitável em doses baixas.',
    contra: 'Sem contraindicações significativas em doses habituais. Gestantes devem limitar a 1 xícara/dia.',
    interacoes: 'Pode potencializar levemente sedativos e anti-hipertensivos.',
    suspensao: 'Reação alérgica cutânea, irritação gástrica, sonolência excessiva.',
    accent: 'text-yellow-300',
    border: 'border-yellow-400/30',
    compostos: 'Citral (geranial + neral, 65-85% do óleo essencial), mirceno (12-25%), geraniol, linalol. Citral é o marcador farmacognóstico.',
    sinergias: 'Capim-limão + Camomila: relaxamento profundo. Capim-limão + Gengibre: gripes leves com componente inflamatório e tensional.',
    frescoVsSeco: 'Fresco é vastamente superior — citral se degrada rapidamente na secagem (perda de 40-60% em 30 dias). Para ação terapêutica significativa, usar fresco.',
    impactoTermico: 'neutra',
    impactoTermicoDesc: 'Levemente aquecedora quando combinada com gengibre, mas isoladamente neutra. Conforto térmico depende da temperatura da infusão.',
    riscoCronico: 'Uma das plantas mais seguras para uso continuado. Em doses elevadas, pode causar irritação gástrica leve por acidez do citral.',
    naoUsarPrimeiro: 'Quadros respiratórios com febre >38°C, infecção bacteriana confirmada, pneumonia. Não substitui antibioticoterapia.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA NERVOSO
═══════════════════════════════════════════ */
export const NERVOSO: PlantaFicha[] = [
  {
    nome: 'Camomila',
    cientifico: 'Matricaria chamomilla',
    parteUsada: 'Flor',
    melhora: ['Ansiedade leve', 'Insônia inicial', 'Cólica leve', 'Irritabilidade'],
    comoAge: 'Apigenina (flavonoide) atua como agonista parcial de receptores GABA-A (subunidade benzodiazepínica), promovendo relaxamento sem depressão respiratória. Bisabolol possui ação anti-inflamatória e antiespasmódica.',
    preparo: '1 a 2 g da flor seca por xícara, abafar por 10 minutos. Não ferver — apigenina é termossensível em ebulição prolongada.',
    faixaSegura: '1 a 3 xícaras ao dia, ciclos de até 14 dias com 7 dias de intervalo.',
    contra: 'Alergia a Asteraceae (margarida, crisântemo). Gestantes no primeiro trimestre.',
    interacoes: 'Potencializa sedativos, benzodiazepínicos e anti-histamínicos. Pode interagir com ciclosporina.',
    suspensao: 'Reação alérgica (urticária, edema), sonolência excessiva diurna.',
    accent: 'text-yellow-400',
    border: 'border-yellow-500/30',
    compostos: 'Apigenina (1-2%), α-bisabolol (10-25% do óleo essencial), camazuleno (formado durante destilação), ácido angélico, matricina. Apigenina é o composto com maior evidência ansiolítica.',
    sinergias: 'Camomila + Capim-limão: ansiedade leve noturna. Camomila + Mulungu: ansiedade moderada (usar com cautela). Camomila + Espinheira-santa: azia por componente emocional.',
    frescoVsSeco: 'Flor seca concentra apigenina (principal ativo ansiolítico). Fresca tem mais bisabolol volátil (anti-inflamatório). Para sono e ansiedade, seca é preferível.',
    impactoTermico: 'neutra',
    impactoTermicoDesc: 'Sem impacto térmico perceptível. O efeito é predominantemente neurológico (GABA) e não termogênico.',
    riscoCronico: 'Uso >30 dias contínuos pode causar leve inibição da absorção de ferro (taninos). Sensibilização alérgica progressiva em predispostos. Ciclar sempre.',
    naoUsarPrimeiro: 'Ansiedade severa com ataques de pânico, ideação suicida, insônia crônica resistente >3 semanas. Quadros que exigem avaliação psiquiátrica.',
  },
  {
    nome: 'Mulungu',
    cientifico: 'Erythrina mulungu',
    parteUsada: 'Casca',
    melhora: ['Agitação leve', 'Dificuldade de relaxamento', 'Tensão muscular por estresse'],
    comoAge: 'Alcaloides eritrínicos (eritravina, erisopina) possuem ação sedativa sobre o SNC, reduzindo excitabilidade neuronal. Mecanismo parcialmente GABAérgico, parcialmente por bloqueio colinérgico nicotínico.',
    preparo: 'Decocção controlada da casca — 1 colher de chá por xícara, ferver por 5 minutos, repousar 10. Filtrar bem.',
    faixaSegura: 'Uso pontual e intermitente. Máximo 3 dias consecutivos.',
    contra: 'Hipotensão arterial. Gestantes. Crianças. Uso excessivo pode causar paralisia muscular transitória.',
    interacoes: 'Cautela com anti-hipertensivos, sedativos, anestésicos. Efeito aditivo significativo.',
    suspensao: 'Tontura, sonolência excessiva, queda de pressão, fraqueza muscular.',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
    compostos: 'Eritravina, erisopina, erisotrina (alcaloides eritrínicos), flavonoides (formononetina). Os alcaloides são estruturalmente relacionados ao curare — daí a ação miorrelaxante.',
    sinergias: 'Mulungu + Camomila (dose reduzida de ambas): relaxamento sem sedação profunda. NÃO combinar com Capim-limão em doses altas — risco de sonolência excessiva.',
    frescoVsSeco: 'Casca seca é o padrão de uso — alcaloides se preservam bem na secagem. Casca fresca pode conter teor variável, dificultando dosagem.',
    impactoTermico: 'neutra',
    impactoTermicoDesc: 'Sem impacto térmico significativo. A ação é exclusivamente neurológica e muscular.',
    riscoCronico: 'ALTO. Alcaloides eritrínicos em uso crônico podem causar hipotensão postural, bradicardia e dependência funcional. Jamais usar por mais de 3 dias sem intervalo de pelo menos 10 dias.',
    naoUsarPrimeiro: 'Depressão diagnosticada, uso de ISRS/ISRN, arritmia cardíaca, hipotensão arterial. Mulungu tem potencial de interação grave com psicotrópicos.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA IMUNE
═══════════════════════════════════════════ */
export const IMUNE: PlantaFicha[] = [
  {
    nome: 'Alho',
    cientifico: 'Allium sativum',
    parteUsada: 'Bulbo',
    melhora: ['Resposta imune', 'Circulação periférica', 'Defesa antimicrobiana', 'Pressão arterial leve'],
    comoAge: 'Allicina (formada pela enzima alinase ao esmagar) possui ação antimicrobiana de amplo espectro — bactérias, fungos e alguns vírus. Atua inibindo enzimas tiol-dependentes nos patógenos. Ajoeno contribui com efeito antiplaquetário.',
    preparo: 'Cru e triturado — aguardar 10 minutos após esmagar para ativar allicina via alinase. O cozimento destrói alinase. Para uso terapêutico, SEMPRE cru.',
    faixaSegura: '1 a 2 dentes ao dia, preferencialmente com alimento para reduzir irritação.',
    contra: 'Cautela com anticoagulantes. Irritação gástrica em excesso. Suspender 7 dias antes de cirurgias.',
    interacoes: 'Warfarina, AAS, clopidogrel, heparina e outros anticoagulantes/antiplaquetários. Pode reduzir eficácia de saquinavir (HIV).',
    suspensao: 'Sangramento incomum (gengival, nasal), irritação gástrica persistente, odor corporal excessivo.',
    accent: 'text-amber-300',
    border: 'border-amber-400/30',
    compostos: 'Aliina (precursor), allicina (composto bioativo principal), ajoeno, dialil dissulfeto, S-alilcisteína. Allicina é instável — meia-vida de ~16h em temperatura ambiente.',
    sinergias: 'Alho + Gengibre: potente combinação anti-inflamatória e imunomoduladora (uso tradicional em caldos). Alho + Mel: ação antimicrobiana potencializada (osmolaridade do mel + allicina).',
    frescoVsSeco: 'FRESCO é absolutamente superior. Alho seco/em pó perde até 90% da allicina. Suplementos precisam ter revestimento entérico para preservar alinase. Para uso terapêutico real, apenas cru e fresco.',
    impactoTermico: 'aquecedora',
    impactoTermicoDesc: 'Forte efeito termogênico — allicina e compostos sulfurados aumentam circulação periférica. Gera calor corporal perceptível. Excelente em climas frios ou início de resfriados.',
    riscoCronico: 'Uso contínuo em dose alta pode causar anemia hemolítica em indivíduos com deficiência de G6PD. Irritação gástrica cumulativa. Dose terapêutica sustentável: 1 dente/dia.',
    naoUsarPrimeiro: 'Infecção bacteriana confirmada com febre alta (requer antibioticoterapia). Coagulopatia diagnosticada. Pré-operatório (<7 dias). Uso de anticoagulantes de margem terapêutica estreita.',
  },
  {
    nome: 'Gengibre',
    cientifico: 'Zingiber officinale',
    parteUsada: 'Rizoma',
    melhora: ['Náusea leve', 'Inflamação sistêmica leve', 'Dor muscular', 'Circulação', 'Enjoo de movimento'],
    comoAge: 'Gingerol (6-gingerol) e shogaol inibem COX-2 e LOX-5, reduzindo prostaglandinas e leucotrienos inflamatórios. Ação antiemética via antagonismo serotoninérgico (5-HT3) no centro do vômito.',
    preparo: 'Decocção de 1 a 2 g da raiz fresca ralada por 5 a 10 minutos. Para náusea: mascar fatia fina de rizoma fresco.',
    faixaSegura: '1 a 2 xícaras ao dia. Até 4g de raiz fresca/dia.',
    contra: 'Cautela com gastrite severa (gingerol é irritante gástrico em doses altas). Coagulopatias.',
    interacoes: 'Anticoagulantes (aditivo). Anti-hipertensivos (pode potencializar). Hipoglicemiantes (efeito aditivo leve).',
    suspensao: 'Queimação gástrica persistente, sangramento incomum, palpitações.',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    compostos: '6-gingerol (principal composto bioativo), 6-shogaol (formado na desidratação), zingerona, sesquiterpenos (zingibereno). Gingerol se converte em shogaol quando desidratado — ambos são bioativos.',
    sinergias: 'Gengibre + Alho: anti-inflamatório sistêmico potente (base de caldos terapêuticos). Gengibre + Capim-limão: gripe leve com dor corporal. Gengibre + Mel + Limão: protocolo clássico para início de infecção respiratória.',
    frescoVsSeco: 'Fresco: mais gingerol (anti-inflamatório, antiemético). Seco/Pó: mais shogaol (2x mais picante, mais termogênico). Para náusea, preferir FRESCO. Para circulação e calor, seco funciona melhor.',
    impactoTermico: 'aquecedora',
    impactoTermicoDesc: 'Fortemente termogênico — gingerol e shogaol aumentam termogênese e circulação periférica. Ideal para climas frios, início de resfriado, dor muscular por frio. Evitar em quadros com calor (febre alta).',
    riscoCronico: 'Uso >30 dias em dose alta pode causar irritação gástrica cumulativa e potencializar risco hemorrágico. Ciclo recomendado: 2 semanas de uso, 1 semana de intervalo.',
    naoUsarPrimeiro: 'Úlcera gástrica ativa, doença de Crohn em crise, uso de anticoagulantes de dose ajustada (INR controlado). Náusea por obstrução intestinal (requer diagnóstico).',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA MUSCULAR & INFLAMATÓRIO
═══════════════════════════════════════════ */
export const MUSCULAR: PlantaFicha[] = [
  {
    nome: 'Arnica',
    cientifico: 'Arnica montana',
    parteUsada: 'Flor (USO EXTERNO)',
    melhora: ['Hematomas', 'Contusões', 'Dor muscular localizada', 'Edema por trauma'],
    comoAge: 'Helenalina (lactona sesquiterpênica) inibe fator de transcrição NF-κB, reduzindo expressão de TNF-α e IL-6 no local de aplicação. Estimula microcirculação por vasodilatação local.',
    preparo: 'Pomada ou gel tópico — aplicar 2 a 3 vezes ao dia sobre pele íntegra. Compressa: infusão concentrada (5g/100ml) aplicada com gaze.',
    faixaSegura: 'Uso externo limitado à área afetada. Máximo 7 dias contínuos na mesma região.',
    contra: 'NUNCA ingerir (helenalina é cardiotóxica por via oral). Não usar em feridas abertas, pele lesionada ou mucosas.',
    interacoes: 'Potencializa anticoagulantes tópicos (heparinoides).',
    suspensao: 'Irritação cutânea, dermatite de contato, vermelhidão persistente.',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    compostos: 'Helenalina (0,2-0,8%), dihidrohelenalina, arnifolin, flavonoides (isoquercetina, astragalina), carotenoides, ácido cafeico.',
    sinergias: 'Arnica tópica + Gengibre oral: dor muscular pós-exercício (anti-inflamatório sistêmico + local). Arnica + Babosa: trauma com componente de pele irritada (anti-inflamatório + cicatrizante).',
    frescoVsSeco: 'Para preparo de pomada, flor seca é padrão (concentração controlada). Para compressa, fresca libera mais helenalina. Em ambos os casos: SOMENTE USO EXTERNO.',
    impactoTermico: 'aquecedora',
    impactoTermicoDesc: 'Aplicação tópica gera aquecimento local por vasodilatação. Sensação de calor na região aplicada — efeito desejado para mobilizar hematoma.',
    riscoCronico: 'Dermatite de contato alérgica em uso prolongado (>10 dias) — especialmente em peles sensíveis. Não aplicar em grandes áreas corporais.',
    naoUsarPrimeiro: 'Fraturas suspeitas (imobilizar primeiro), feridas abertas, queimaduras, hematomas profundos com suspeita de lesão vascular. Arnica é para trauma superficial.',
  },
  {
    nome: 'Babosa',
    cientifico: 'Aloe vera',
    parteUsada: 'Gel interno da folha',
    melhora: ['Queimaduras leves (1º grau)', 'Irritação cutânea', 'Hidratação da pele', 'Prurido leve'],
    comoAge: 'Acemanana (polissacarídeo) estimula macrófagos e fibroblastos, acelerando cicatrização. Aloína (antraquinona da camada amarela) possui ação laxante — não utilizar na aplicação tópica.',
    preparo: 'Cortar folha, remover gel translúcido interno (evitar látex amarelo/aloína). Aplicar diretamente sobre a área limpa.',
    faixaSegura: 'Uso tópico — 2 a 3 aplicações ao dia sobre pele íntegra.',
    contra: 'Não ingerir sem orientação técnica (aloína é laxante potente e hepatotóxica em dose alta). Gestantes. Não aplicar em feridas profundas infectadas.',
    interacoes: 'Uso tópico: sem interações significativas. Uso oral (não recomendado): interage com diuréticos e digitálicos.',
    suspensao: 'Irritação, vermelhidão ou prurido no local de aplicação.',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    compostos: 'Acemanana (polissacarídeo principal), aloína A e B (antraquinonas — na camada amarela), ácido salicílico, lignina, saponinas, vitaminas A, C, E.',
    sinergias: 'Babosa + Arnica: trauma com abrasão superficial (cicatrização + anti-inflamatório). Babosa + Mel: queimaduras leves (hidratação + antimicrobiano).',
    frescoVsSeco: 'FRESCO exclusivamente. Gel de Aloe perde polissacarídeos ativos rapidamente após extração. Usar dentro de 2 horas após coleta. Gel comercial estabilizado é alternativa aceitável.',
    impactoTermico: 'refrescante',
    impactoTermicoDesc: 'Gel fresco produz sensação imediata de frescor e alívio em queimaduras. O efeito é mecânico (gel hidratado) e bioquímico (ácido salicílico).',
    riscoCronico: 'Uso tópico prolongado: sem riscos significativos. Uso oral crônico: diarreia, desequilíbrio eletrolítico, melanose coli, hepatotoxicidade. Via oral é contraindicada sem supervisão.',
    naoUsarPrimeiro: 'Queimaduras de 2º grau com bolhas extensas, queimaduras de 3º grau, feridas profundas ou infectadas. Essas lesões requerem manejo médico.',
  },
];

/* ═══════════════════════════════════════════
   DADOS DA MATRIZ COMPARATIVA
═══════════════════════════════════════════ */
export interface MatrizEntry {
  planta: string;
  sistema: string;
  compostosPrincipais: string;
  usoPontual: string;
  evitarEm: string;
  termico: 'Aquecedora' | 'Refrescante' | 'Neutra';
}

export const MATRIZ_DADOS: MatrizEntry[] = [
  { planta: 'Boldo', sistema: 'Digestivo', compostosPrincipais: 'Boldina, 1,8-cineol', usoPontual: 'Digestão pesada, pós-excesso', evitarEm: 'Obstrução biliar, gestantes', termico: 'Aquecedora' },
  { planta: 'Hortelã', sistema: 'Digestivo', compostosPrincipais: 'Mentol, ác. rosmarínico', usoPontual: 'Gases, cólica leve', evitarEm: 'Refluxo (DRGE)', termico: 'Refrescante' },
  { planta: 'Espinheira-santa', sistema: 'Digestivo', compostosPrincipais: 'Taninos, friedelin', usoPontual: 'Azia, queimação gástrica', evitarEm: 'Gestantes, anemia', termico: 'Refrescante' },
  { planta: 'Guaco', sistema: 'Respiratório', compostosPrincipais: 'Cumarina, ác. caurenóico', usoPontual: 'Tosse produtiva', evitarEm: 'Anticoagulantes, hepatopatia', termico: 'Neutra' },
  { planta: 'Eucalipto', sistema: 'Respiratório', compostosPrincipais: '1,8-cineol (eucaliptol)', usoPontual: 'Congestão nasal, sinusite', evitarEm: 'Crianças <2a, asma severa', termico: 'Refrescante' },
  { planta: 'Capim-limão', sistema: 'Respiratório', compostosPrincipais: 'Citral, mirceno', usoPontual: 'Resfriado leve, tensão', evitarEm: 'Gestantes (dose alta)', termico: 'Neutra' },
  { planta: 'Camomila', sistema: 'Nervoso', compostosPrincipais: 'Apigenina, bisabolol', usoPontual: 'Ansiedade leve, insônia', evitarEm: 'Alergia a Asteraceae', termico: 'Neutra' },
  { planta: 'Mulungu', sistema: 'Nervoso', compostosPrincipais: 'Eritravina, erisopina', usoPontual: 'Agitação, tensão muscular', evitarEm: 'Hipotensão, psicotrópicos', termico: 'Neutra' },
  { planta: 'Alho', sistema: 'Imune', compostosPrincipais: 'Allicina, ajoeno', usoPontual: 'Defesa imune, antimicrobiano', evitarEm: 'Anticoagulantes, pré-cirurgia', termico: 'Aquecedora' },
  { planta: 'Gengibre', sistema: 'Imune', compostosPrincipais: '6-gingerol, shogaol', usoPontual: 'Náusea, inflamação leve', evitarEm: 'Úlcera ativa, coagulopatia', termico: 'Aquecedora' },
  { planta: 'Arnica', sistema: 'Muscular', compostosPrincipais: 'Helenalina, flavonoides', usoPontual: 'Hematomas, contusões (tópico)', evitarEm: 'USO ORAL, feridas abertas', termico: 'Aquecedora' },
  { planta: 'Babosa', sistema: 'Muscular', compostosPrincipais: 'Acemanana, ác. salicílico', usoPontual: 'Queimaduras leves, hidratação', evitarEm: 'Uso oral, feridas profundas', termico: 'Refrescante' },
];
