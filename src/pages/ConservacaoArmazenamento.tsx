import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Package, Flame, Droplets, Wheat, Snowflake, Wind, Egg, Leaf, ShieldCheck, Clock, ChevronDown, ChevronUp, AlertTriangle, Beaker } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── SEO: meta keywords target ───
   conservação de alimentos, armazenamento de alimentos, estoque de sobrevivência,
   alimentos de longa duração, métodos de conservação, desidratação de alimentos,
   fermentação caseira, defumação, salga de carnes, congelamento, arroz estoque,
   feijão armazenamento, mel sobrevivência, autossuficiência alimentar brasil,
   preparação emergência alimentos, segurança alimentar, soberania alimentar
─────────────────────────────────── */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.08 },
  }),
};

/* ═══════════════════════════════════════════
   10 ALIMENTOS ESSENCIAIS
   ═══════════════════════════════════════════ */

interface Alimento {
  name: string;
  tagline: string;
  durability: string;
  calories: string;
  icon: typeof Wheat;
  keyFact: string;
  tips: string[];
  varieties?: string[];
  body: string;
}

const ALIMENTOS: Alimento[] = [
  {
    name: 'Arroz',
    tagline: 'O Alimento Base',
    durability: '25–30 anos',
    calories: '~130 kcal/100g cozido',
    icon: Wheat,
    keyFact: 'Arroz branco polido é a escolha ideal para armazenamento de longa duração — o integral oxida em meses.',
    tips: [
      'Recipientes herméticos de vidro ou baldes grau alimentício',
      'Absorvedores de oxigênio dentro dos recipientes',
      'Local seco, escuro e com temperatura estável',
      'Folhas de louro junto ao arroz repelem insetos naturalmente',
      'Etiquete com data de armazenamento para rotatividade',
    ],
    body: 'Carboidrato complexo de excepcional durabilidade. Serve como base para inúmeras preparações, combinando-se facilmente com feijão, carnes desidratadas e legumes em conserva. Exige apenas água e uma fonte de calor.',
  },
  {
    name: 'Feijão',
    tagline: 'Fonte de Proteína Duradoura',
    durability: '10–30 anos',
    calories: '~15g proteína/100g cozido',
    icon: Egg,
    keyFact: 'Quanto mais velho o feijão, maior o tempo de cozimento — rotação periódica garante eficiência energética.',
    tips: [
      'Manter completamente seco e protegido de insetos',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Rotação periódica para eficiência energética no preparo',
    ],
    varieties: ['Preto: rico em antioxidantes', 'Carioca: versátil, cozimento rápido', 'Branco: excelente para sopas', 'Vermelho: textura firme, ideal para saladas', 'Fradinho: essencial para pratos tradicionais'],
    body: 'Rico em proteínas, fibras, ferro, magnésio, potássio e vitaminas do complexo B. Dezenas de variedades disponíveis permitem grande variação no cardápio mesmo com recursos limitados.',
  },
  {
    name: 'Mel',
    tagline: 'O Ouro Líquido da Sobrevivência',
    durability: 'Virtualmente infinito',
    calories: 'Energia rápida + antibacteriano',
    icon: Droplets,
    keyFact: 'Arqueólogos encontraram mel em tumbas egípcias com +3.000 anos que ainda permanecia comestível.',
    tips: [
      'Mel puro, não pasteurizado e sem aditivos',
      'Frascos de vidro bem vedados — evitar metal',
      'Local fresco, ao abrigo da luz direta',
      'Cristalização é natural — banho-maria devolve a consistência',
      'Diferentes tamanhos de embalagem para não contaminar o estoque',
    ],
    body: 'Alto teor de açúcares, baixa umidade e natureza ácida criam ambiente hostil para microrganismos. Propriedades antibacterianas e cicatrizantes comprovadas cientificamente. Alívio de tosse e dor de garganta. ALERTA: Nunca para crianças menores de 1 ano (risco de botulismo).',
  },
  {
    name: 'Sal',
    tagline: 'Conservante Natural e Mineral Essencial',
    durability: 'Ilimitado',
    calories: 'Eletrólito vital',
    icon: Beaker,
    keyFact: 'O sal foi usado como moeda de troca em civilizações antigas. Sua capacidade de desidratar alimentos por osmose é insubstituível.',
    tips: [
      'Recipientes herméticos longe de umidade',
      'Grãos de arroz absorvem umidade residual',
      'Estocar em quantidades generosas para conservação e troca',
    ],
    varieties: ['Refinado: conservação de alimentos', 'Grosso: salga de carnes e curas', 'Marinho: oligoelementos adicionais', 'Iodado: prevenção de distúrbios da tireoide'],
    body: 'Indispensável para transmissão nervosa, contração muscular e equilíbrio hídrico. Em emergências com esforço físico e sudorese, a reposição de eletrólitos previne hiponatremia. Método milenar de conservação por osmose.',
  },
  {
    name: 'Açúcar',
    tagline: 'Fonte de Energia de Longa Duração',
    durability: 'Indefinido',
    calories: '~4 kcal/g',
    icon: Package,
    keyFact: 'Açúcar branco refinado é o mais confiável para longuíssimo prazo. Mascavo tem mais nutrientes mas menor durabilidade.',
    tips: [
      'Recipientes herméticos de vidro, cerâmica ou plástico alimentício',
      'Ambiente seco e com temperatura estável',
      'Proteger da luz direta',
      'Verificar periodicamente compactação',
    ],
    body: 'Fonte concentrada de energia rapidamente disponível. Previne degradação proteica muscular em restrição alimentar extrema. Fundamental para conservação de frutas (compotas), fermentação e produção de vinagres. Em cenários avançados, base para etanol.',
  },
  {
    name: 'Óleo de Coco',
    tagline: 'Gordura Saudável e Estável',
    durability: 'Até 5 anos',
    calories: '~9 kcal/g',
    icon: Leaf,
    keyFact: 'Ácidos graxos de cadeia média saturados proporcionam estabilidade superior — supera soja, canola e girassol.',
    tips: [
      'Recipientes de vidro âmbar, sem luz solar direta',
      'Ambiente fresco e seco',
      'Solidificação abaixo de 24°C é normal e indica pureza',
    ],
    body: 'Triglicerídeos de cadeia média (TCM) são metabolizados como energia rápida. Uso multifuncional: hidratante para pele, lubrificante para ferramentas, base para sabões artesanais, combustível para lamparinas e repelente natural combinado com óleos essenciais.',
  },
  {
    name: 'Leite em Pó',
    tagline: 'Nutrição Concentrada',
    durability: '2–10 anos',
    calories: 'Proteína completa + cálcio',
    icon: Package,
    keyFact: 'Leite em pó desnatado dura mais, mas o integral oferece maior densidade energética em cenários de escassez.',
    tips: [
      'Transferir para recipientes herméticos com absorvedores de O₂',
      'Local fresco, seco e escuro',
      'Após aberto, consumir em até 6 meses',
      'Sistema de rotação para manter frescor',
    ],
    body: 'Concentra praticamente todos os benefícios do leite fresco: proteínas completas, cálcio biodisponível, vitaminas B, A e D. Particularmente valioso para crianças, idosos e gestantes. Versátil em panificação, sopas, molhos e bebidas quentes.',
  },
  {
    name: 'Aveia',
    tagline: 'Carboidrato Complexo e Nutritivo',
    durability: '2–30 anos (grãos inteiros)',
    calories: '~17% proteína em peso seco',
    icon: Wheat,
    keyFact: 'Grãos inteiros em ambiente anaeróbico podem durar 30 anos. Baixo índice glicêmico = saciedade duradoura com porções menores.',
    tips: [
      'Grãos inteiros para longuíssimo prazo, flocos para rotação frequente',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Folhas de louro como repelente natural de pragas',
    ],
    body: 'Carboidratos complexos de liberação lenta. Teor proteico supera outros cereais. Rica em beta-glucanas que reduzem colesterol. Base para pães rústicos, espessante de sopas, extensor de carnes, barras energéticas caseiras e bebidas nutritivas.',
  },
  {
    name: 'Carne Seca',
    tagline: 'Proteína Preservada',
    durability: '6 meses–2 anos',
    calories: '~33g proteína/100g',
    icon: Flame,
    keyFact: 'A desidratação concentra quase o dobro da proteína encontrada na carne fresca.',
    tips: [
      'Embalagens a vácuo ou recipientes herméticos',
      'Absorvedores de oxigênio + sílica gel',
      'Ambiente fresco e seco',
      'Inspecionar periodicamente: odor, manchas, textura',
    ],
    body: 'Método milenar: charque, carne-de-sol e beef jerky. Preserva ferro heme de alta biodisponibilidade, zinco, vitaminas B12, creatina e carnosina. Preparação caseira permite controle total de ingredientes.',
  },
  {
    name: 'Nozes e Sementes',
    tagline: 'Nutrientes Compactos',
    durability: '6 meses–2 anos',
    calories: '~600 kcal/100g',
    icon: Leaf,
    keyFact: 'Sementes como girassol e abóbora têm potencial de cultivo — transcendem o consumo imediato e viram produção.',
    tips: [
      'Priorizar amêndoas e avelãs (menor oxidação)',
      'Recipientes herméticos com absorvedores de oxigênio',
      'Abaixo de 15°C ideal',
      'Rotatividade mais frequente que grãos e leguminosas',
    ],
    body: 'Gorduras saudáveis, proteínas completas e carboidratos de baixo IG. Densidade calórica excepcional para kits de evacuação. Vitamina E, magnésio, selênio, ômega-3 e fitoquímicos anti-inflamatórios. Potencial de cultivo em cenários de crise prolongada.',
  },
];

/* ═══════════════════════════════════════════
   18 MÉTODOS DE CONSERVAÇÃO
   ═══════════════════════════════════════════ */

interface Metodo {
  name: string;
  principle: string;
  icon: typeof Flame;
  summary: string;
  details: string[];
  safetyNote?: string;
}

const METODOS: Metodo[] = [
  {
    name: 'Enlatamento',
    principle: 'Esterilização térmica + vedação hermética',
    icon: Package,
    summary: 'Conserva por 1–30 anos. Banho-maria para ácidos (frutas, picles). Panela de pressão para baixa acidez (carnes, legumes).',
    details: ['Receitas testadas e aprovadas são obrigatórias', 'Tempos e pressões específicos por alimento e altitude', 'Verificar vedação: tampas côncavas e firmes', 'Investimento em equipamentos se paga com autonomia'],
    safetyNote: 'Alimentos de baixa acidez (pH > 4,6) EXIGEM panela de pressão para prevenir Clostridium botulinum.',
  },
  {
    name: 'Desidratação',
    principle: 'Redução de umidade para 10–20%',
    icon: Wind,
    summary: 'Reduz volume em até 1/6. Armazenamento de 1–5 anos. Solar, forno doméstico ou desidratadores elétricos.',
    details: ['Frutas: ácido ascórbico previne escurecimento', 'Vegetais: branqueamento prévio recomendado', 'Carnes: remoção de gorduras + cura com sal', 'Ervas: temperaturas mais baixas preservam aromas'],
  },
  {
    name: 'Fermentação',
    principle: 'Microrganismos benéficos criam ambiente hostil para patógenos',
    icon: Beaker,
    summary: 'Chucrute, kimchi, kombucha, kefir. Aumenta biodisponibilidade de nutrientes e gera probióticos vivos.',
    details: ['Higiene rigorosa sem esterilização completa', 'Sal de qualidade nas concentrações apropriadas', 'Matéria-prima submersa em fermentações líquidas', 'Culturas (SCOBY, kefir, massa-mãe) são recursos permanentes'],
  },
  {
    name: 'Defumação',
    principle: 'Compostos fenólicos + desidratação parcial',
    icon: Flame,
    summary: 'Técnica de +80.000 anos. Quente (60–80°C, horas) ou fria (25–30°C, dias a semanas).',
    details: ['Frutíferas: fumaça suave para aves e peixes', 'Carvalho/nogueira: robusta para carnes vermelhas', 'NUNCA usar madeiras resinosas (pinus, eucalipto)', 'Controle da combustão evita compostos cancerígenos'],
  },
  {
    name: 'Salga',
    principle: 'Osmose + redução de atividade de água',
    icon: Beaker,
    summary: 'Método de +4.000 anos. Seca, úmida (salmoura) ou mista. Especialmente eficaz para carnes e peixes.',
    details: ['Sal não iodado e sem aditivos para conservação', 'Trabalhar com temperaturas baixas (0–4°C ideal)', 'Nitrito/nitrato de sódio para carnes sem cocção posterior', 'Frequentemente é o primeiro passo de processos combinados'],
  },
  {
    name: 'Congelamento',
    principle: 'Conversão de água em cristais de gelo a -18°C',
    icon: Snowflake,
    summary: 'Mantém características próximas ao alimento fresco. Carnes: 8–12 meses. Frutas/vegetais: 8–12 meses.',
    details: ['Congelamento rápido (-30°C) preserva melhor a textura', 'Embalagem hermética previne queima por congelamento', 'Branqueamento de vegetais antes de congelar', 'Limitação crítica: depende de energia elétrica contínua'],
  },
  {
    name: 'Conserva em Vinagre',
    principle: 'Acidificação (pH < 4,6)',
    icon: Droplets,
    summary: 'Ácido acético penetra membranas celulares microbianas. Técnica milenar com sabores complexos.',
    details: ['pH ideal entre 3,0 e 3,5', 'Combinação com sal potencializa o efeito', 'Picles, cebolas, pimentas, legumes variados', 'Armazenamento prolongado sem refrigeração'],
  },
  {
    name: 'Conserva em Açúcar',
    principle: 'Ambiente hiperosmótico inibe microrganismos',
    icon: Package,
    summary: 'Compotas, geleias e frutas em calda. Alta concentração de açúcar cria ambiente inóspito para bactérias.',
    details: ['Proporção mínima de 60% açúcar para conservação segura', 'Esterilização de frascos é essencial', 'Aproveitamento de frutas sazonais', 'Duração de meses a anos quando bem vedado'],
  },
  {
    name: 'Conserva em Óleo',
    principle: 'Barreira contra oxigênio e umidade',
    icon: Droplets,
    summary: 'Tomates secos, ervas, alho, pimentas. O óleo cria camada protetora que impede contato com ar.',
    details: ['Alimentos devem estar completamente submersos', 'Azeite de oliva é o mais estável', 'Manter sob refrigeração após aberto', 'Atenção ao risco de botulismo em alho/ervas frescas'],
    safetyNote: 'Alho e ervas frescas em óleo à temperatura ambiente podem gerar toxina botulínica. Refrigerar sempre.',
  },
  {
    name: 'Liofilização',
    principle: 'Sublimação: água sólida → vapor sem fase líquida',
    icon: Snowflake,
    summary: 'Preserva até 97% dos nutrientes originais. Vida útil de 25+ anos. Resultado mais leve que desidratação convencional.',
    details: ['Requer equipamento especializado', 'Melhor preservação de textura e nutrientes', 'Reidratação rápida e quase completa', 'Ideal para kits de emergência e ração de campo'],
  },
  {
    name: 'Embalagem a Vácuo',
    principle: 'Remoção de oxigênio retarda oxidação',
    icon: Package,
    summary: 'Multiplica a vida útil de grãos, carnes e desidratados. Remove o oxigênio que alimenta deterioração.',
    details: ['Seladora a vácuo é investimento que se paga', 'Combinar com absorvedores de oxigênio', 'Ideal para porcionamento de estoques grandes', 'Funciona como complemento a outros métodos'],
  },
  {
    name: 'Pasteurização',
    principle: 'Calor controlado elimina patógenos sem esterilização total',
    icon: Flame,
    summary: 'Temperatura mais baixa que enlatamento (60–85°C). Usada para sucos, leites e conservas ácidas.',
    details: ['Não elimina todos os microrganismos', 'Requer refrigeração posterior na maioria dos casos', 'Preserva melhor características sensoriais', 'Flash pasteurization: alta temperatura por segundos'],
  },
  {
    name: 'Cura',
    principle: 'Sal + nitrito/nitrato + tempo = proteção microbiológica',
    icon: Clock,
    summary: 'Base de embutidos tradicionais: linguiça, salame, presunto. Combinação química que preserva e desenvolve sabor.',
    details: ['Sal de cura #1 (nitrito) para cura rápida', 'Sal de cura #2 (nitrato) para cura longa', 'Controle de temperatura e umidade é crítico', 'Peso exato dos ingredientes é inegociável'],
  },
  {
    name: 'Irradiação',
    principle: 'Radiação ionizante elimina patógenos',
    icon: ShieldCheck,
    summary: 'Método industrial aprovado pela OMS. Não torna o alimento radioativo. Usado em especiarias, grãos e carnes.',
    details: ['Disponível apenas em escala industrial', 'Aprovado por mais de 60 países', 'Não altera significativamente sabor ou nutrientes', 'Símbolo radura identifica alimentos irradiados'],
  },
  {
    name: 'Atmosfera Modificada',
    principle: 'Substituição do ar por gases inertes (N₂, CO₂)',
    icon: Wind,
    summary: 'Retarda oxidação e respiração celular. Usada comercialmente em saladas, carnes e panificação.',
    details: ['Nitrogênio desloca oxigênio sem reagir com alimentos', 'CO₂ tem efeito bacteriostático adicional', 'Combinar com refrigeração para máximo efeito', 'Adaptação caseira: flush de nitrogênio em baldes'],
  },
  {
    name: 'Defumação Líquida',
    principle: 'Compostos de fumaça condensados aplicados ao alimento',
    icon: Droplets,
    summary: 'Alternativa moderna à defumação tradicional. Menor risco de compostos cancerígenos. Sabor controlável.',
    details: ['Dosagem precisa e reprodutível', 'Sem exposição direta à combustão', 'Aplicação por imersão, spray ou injeção', 'Disponível comercialmente em forma concentrada'],
  },
  {
    name: 'Confitagem',
    principle: 'Imersão e cozimento lento em gordura',
    icon: Flame,
    summary: 'Técnica francesa clássica. Pato, porco e vegetais cozidos e preservados em sua própria gordura.',
    details: ['Gordura cria barreira contra oxigênio', 'Cozimento lento a baixa temperatura (80–90°C)', 'Armazenamento em recipiente coberto pela gordura', 'Sob refrigeração, conserva por meses'],
  },
  {
    name: 'Uso de Conservantes Naturais',
    principle: 'Compostos antimicrobianos de plantas e especiarias',
    icon: Leaf,
    summary: 'Alho, cúrcuma, orégano, cravo, canela. Compostos bioativos que inibem deterioração naturalmente.',
    details: ['Alicina (alho) tem ação antibacteriana comprovada', 'Curcumina (cúrcuma) é antioxidante potente', 'Eugenol (cravo) inibe fungos e bactérias', 'Sempre como complemento, não método único'],
  },
];

/* ═══════════════════════════════════════════
   EXPANDABLE CARD COMPONENT
   ═══════════════════════════════════════════ */

function AlimentoCard({ item, index }: { item: Alimento; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={index}
      className="bg-white/60 border border-stone-200/60 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 md:p-8 flex items-start gap-4 group cursor-pointer"
      >
        <div className="p-3 bg-amber-100/60 rounded-xl shrink-0 mt-0.5">
          <Icon className="text-amber-700" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-800 transition-colors">{item.name}</h3>
              <p className="text-amber-700 text-xs font-semibold uppercase tracking-wider mt-0.5">{item.tagline}</p>
            </div>
            <div className="shrink-0">
              {open ? <ChevronUp className="text-stone-400" size={18} /> : <ChevronDown className="text-stone-400" size={18} />}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200/50">
              {item.durability}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200/50">
              {item.calories}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-stone-100 pt-6">
              <p className="text-stone-600 text-sm leading-relaxed mb-4">{item.body}</p>
              
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 mb-4">
                <p className="text-amber-800 text-sm font-medium leading-relaxed">
                  <span className="font-bold">↳ </span>{item.keyFact}
                </p>
              </div>

              {item.varieties && (
                <div className="mb-4">
                  <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-2">Variedades</p>
                  <div className="flex flex-wrap gap-2">
                    {item.varieties.map(v => (
                      <span key={v} className="text-xs text-stone-600 bg-stone-50 border border-stone-200/50 px-3 py-1.5 rounded-lg">{v}</span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-2">Protocolo de Armazenamento</p>
              <ul className="space-y-1.5">
                {item.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-stone-500 text-xs leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MetodoCard({ item, index }: { item: Metodo; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={index}
      className="bg-white/60 border border-emerald-100/60 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 group cursor-pointer"
      >
        <div className="p-2.5 bg-emerald-100/60 rounded-xl shrink-0 mt-0.5">
          <Icon className="text-emerald-700" size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-stone-800 group-hover:text-emerald-800 transition-colors">{item.name}</h3>
            <div className="shrink-0">
              {open ? <ChevronUp className="text-stone-400" size={16} /> : <ChevronDown className="text-stone-400" size={16} />}
            </div>
          </div>
          <p className="text-emerald-600/80 text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.principle}</p>
          <p className="text-stone-500 text-xs leading-relaxed mt-2">{item.summary}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 border-t border-stone-100 pt-4">
              <ul className="space-y-1.5 mb-3">
                {item.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="text-stone-600 text-xs leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              {item.safetyNote && (
                <div className="bg-rose-50/60 border border-rose-200/50 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                  <p className="text-rose-700 text-xs font-medium leading-relaxed">{item.safetyNote}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function ConservacaoArmazenamento() {
  return (
    <div
      className="min-h-screen text-stone-900 font-sans selection:bg-amber-300/50 pb-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ebe5d8 0%, #ddd5c3 12%, #d2dcc4 30%, #c4d4ae 50%, #b8c9a0 70%, #cdd5bd 90%, #e0dace 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,200,80,0.2) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,200,110,0.2) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24">
        
        {/* Nav */}
        <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 mb-16">
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ═══ HERO ═══ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-amber-600 text-[10px] font-bold tracking-[0.5em] uppercase opacity-70">Fase 03 · Soberania Alimentar</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-stone-800 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            CONSERVAÇÃO &<br /><span className="text-amber-700">ARMAZENAMENTO</span>
          </h1>
          <p className="text-stone-500 text-base md:text-lg max-w-3xl leading-relaxed mb-4">
            Quem controla a conservação dos seus alimentos <span className="text-stone-800 font-semibold">não depende da cadeia de frio industrial</span>. 
            Este módulo reúne os 10 alimentos essenciais para estoque de longa duração e 18 métodos validados de preservação — 
            de técnicas milenares a protocolos modernos.
          </p>
          <p className="text-stone-400 text-sm max-w-2xl leading-relaxed">
            Desastres naturais, instabilidades econômicas ou interrupções na cadeia de suprimentos podem tornar o acesso a alimentos frescos temporariamente impossível. 
            Uma preparação adequada transforma vulnerabilidade em autonomia.
          </p>
        </motion.header>

        {/* ═══ FRAMEWORK VISUAL ═══ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-stone-100/60 border border-stone-300/40 p-8 md:p-10 rounded-2xl backdrop-blur-sm mb-20"
        >
          <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Critérios de seleção do estoque</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-500">
            <div className="flex items-start gap-3">
              <Clock className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-700 font-semibold mb-1">Durabilidade extrema</p>
                <p className="text-xs leading-relaxed">Armazenamento prolongado sem deterioração — muitos ultrapassam 5 anos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Flame className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-700 font-semibold mb-1">Densidade calórica</p>
                <p className="text-xs leading-relaxed">Alto teor calórico e nutricional. Energia sustentável em situações de escassez.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-stone-700 font-semibold mb-1">Independência elétrica</p>
                <p className="text-xs leading-relaxed">Sem necessidade de refrigeração. Funciona em condições de falta de energia.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ SEÇÃO 1: 10 ALIMENTOS ═══ */}
        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-amber-600 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 01 — Estoque Estratégico</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-800">
              Os 10 Alimentos <span className="text-amber-700">Essenciais</span>
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-3 max-w-2xl">
              Selecionados por durabilidade, valor nutricional, versatilidade e custo acessível. 
              Um estoque bem planejado combina carboidratos, proteínas, gorduras saudáveis e micronutrientes essenciais.
            </p>
          </div>

          <div className="space-y-4">
            {ALIMENTOS.map((item, i) => (
              <AlimentoCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {/* CTA intermediário */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mt-10 bg-amber-50/60 border border-amber-200/50 p-8 rounded-2xl text-center"
          >
            <p className="text-amber-800 text-sm font-semibold mb-2">O ambiente ideal é fresco, seco e escuro.</p>
            <p className="text-stone-500 text-xs max-w-lg mx-auto leading-relaxed">
              Temperatura e umidade elevadas são os principais inimigos. Recipientes herméticos, absorvedores de oxigênio e 
              rotulagem adequada prolongam significativamente a vida útil. Adote a estratégia "primeiro a entrar, primeiro a sair".
            </p>
          </motion.div>
        </motion.section>

        {/* ═══ SEÇÃO 2: 18 MÉTODOS ═══ */}
        <motion.section className="mb-28" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="mb-10">
            <span className="text-emerald-600 text-[10px] font-bold tracking-[0.4em] uppercase">Bloco 02 — Arsenal de Técnicas</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-stone-800">
              18 Métodos de <span className="text-emerald-700">Conservação</span>
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-3 max-w-2xl">
              Sabedoria ancestral combinada com tecnologias modernas. A escolha do método depende do tipo de alimento, 
              recursos disponíveis, condições climáticas e prazo desejado de conservação.
            </p>
          </div>

          {/* Classificação visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Redução de umidade', methods: 'Desidratação, Liofilização, Salga' },
              { label: 'Ambiente hostil', methods: 'Fermentação, Vinagre, Açúcar, Óleo' },
              { label: 'Calor', methods: 'Enlatamento, Pasteurização' },
              { label: 'Frio', methods: 'Congelamento' },
              { label: 'Atmosfera', methods: 'Vácuo, Atmosfera Modificada' },
              { label: 'Outros', methods: 'Irradiação, Cura, Confitagem, Conservantes Naturais' },
            ].map(cat => (
              <div key={cat.label} className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4">
                <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">{cat.label}</p>
                <p className="text-stone-500 text-xs">{cat.methods}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {METODOS.map((item, i) => (
              <MetodoCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ═══ CTA FINAL ═══ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-center"
        >
          <div className="bg-stone-800 text-stone-100 p-10 md:p-14 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-emerald-600/10 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-amber-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Engenharia de Resiliência</p>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Dominar estas técnicas é <span className="text-amber-400">liberdade operacional</span>.
              </h3>
              <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
                Não se trata de medo. Se trata de compreender a cadeia que sustenta o que você come — e ter alternativas 
                quando ela falha. Quem conserva não desperdiça. Quem armazena não depende. Quem sabe não teme.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/projeto-autonomo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-stone-900 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <ArrowLeft size={14} /> Voltar ao Projeto Autônomo
                </Link>
                <Link
                  to="/projeto-autonomo/horta-urbana"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-stone-600 text-stone-300 font-bold text-xs uppercase tracking-widest rounded-lg hover:border-amber-500 hover:text-amber-400 transition-colors"
                >
                  Módulo: Horta Urbana <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
