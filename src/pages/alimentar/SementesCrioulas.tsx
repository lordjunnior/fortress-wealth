import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sprout, Archive, Repeat, Leaf, Calendar, ShieldCheck,
  ChevronDown, AlertTriangle, Compass,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/alimentar/sementes-crioulas-hero.jpg';
import imgBanco from '@/assets/alimentar/sementes-banco-pessoal.jpg';
import imgVariedades from '@/assets/alimentar/sementes-variedades.jpg';
import imgExtracao from '@/assets/alimentar/sementes-extracao.jpg';
import imgArmazenamento from '@/assets/alimentar/sementes-armazenamento.jpg';
import imgTroca from '@/assets/alimentar/sementes-troca.jpg';
import imgGerminacao from '@/assets/alimentar/sementes-germinacao.jpg';

/**
 * /soberania-organica/sementes-crioulas
 * Padrão ouro Apple editorial. Paleta Moss (#3a4a2e) + Terracotta (#c46b3a) + Sand (#f5efe4).
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

interface Pilar {
  num: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  paragrafos: string[];
  praticas: string[];
  tempo: string;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    titulo: 'Por que crioulas, e não híbridas',
    subtitulo: 'A diferença entre soberania e dependência genética',
    imagem: imgVariedades,
    paragrafos: [
      'Sementes híbridas (F1) são produzidas pelo cruzamento controlado de duas linhagens parentais. A planta resultante carrega vigor híbrido na primeira geração e perde uniformidade na segunda. Por isso o agricultor é forçado a recomprar todo ano. É um modelo de assinatura, não de cultivo.',
      'Crioulas são variedades selecionadas por gerações de agricultores, adaptadas ao microclima local. Você planta, colhe, separa as melhores e replanta. A variedade evolui com você, não com a Monsanto. Cada geração se torna mais resistente às pragas, ao solo e ao clima da sua região específica.',
      'No Brasil, há mais de 3.000 variedades crioulas catalogadas pela Embrapa Recursos Genéticos. Milho roxo do Cerrado, feijão guandu do Nordeste, abóbora moranga do Sul. Patrimônio imaterial que está sendo silenciosamente substituído por OGMs e híbridos comerciais protegidos por patente.',
    ],
    praticas: [
      'Identifique 3 variedades crioulas tradicionais da sua região via Embrapa ou rede AS-PTA',
      'Compre apenas de produtores rurais conhecidos, feiras agroecológicas ou bancos comunitários',
      'Evite catálogos online genéricos sem rastreabilidade da origem',
      'Documente a procedência de cada lote: produtor, ano, microclima',
    ],
    tempo: 'Pesquisa inicial: 1 fim de semana',
  },
  {
    num: '02',
    titulo: 'Extração, fermentação e secagem',
    subtitulo: 'O processo que separa amador de guardião',
    imagem: imgExtracao,
    paragrafos: [
      'Sementes mal processadas mofam, perdem viabilidade ou germinam contaminadas. O método varia por família botânica. Tomates, pepinos e abóboras exigem fermentação de 2 a 4 dias para dissolver o gel protetor das sementes. Sem isso, a taxa de germinação despenca para menos de 30%.',
      'Para tomates: corte horizontalmente, raspe sementes com gel para um copo, adicione um dedo de água, cubra com pano, deixe fermentar 3 dias em temperatura ambiente até formar película branca. Lave em peneira até a água sair limpa. Seque sobre papel não-acetinado por 7 dias em local arejado, longe de sol direto.',
      'Para feijões e milho: deixe secar na própria planta até a vagem ou espiga estar completamente seca. Debulhe, separe sementes quebradas e pequenas, mantenha apenas as íntegras e maiores. Estas serão a sua próxima geração — você está fazendo seleção genética manual.',
    ],
    praticas: [
      'Use sempre utensílios de vidro ou cerâmica, nunca metal reativo',
      'Etiquete imediatamente: variedade, data de extração, planta-mãe',
      'Teste de viabilidade: jogue 10 sementes em água. Se mais de 7 afundam, lote bom',
      'Descarte sementes que boiarem após 5 minutos de imersão',
    ],
    tempo: '3 a 10 dias por variedade',
  },
  {
    num: '03',
    titulo: 'O banco pessoal de sementes',
    subtitulo: 'Sua arca botânica em vidro e papel',
    imagem: imgBanco,
    paragrafos: [
      'Um banco de sementes funcional não é uma caixa de sapato no armário. É um sistema com classificação por família botânica, controle de umidade, rotação anual e backup geográfico. Tratado como infraestrutura crítica, porque é exatamente isso que ele é.',
      'Use vidros de boca larga com tampa de rosca, lavados e secos perfeitamente. Adicione um pequeno pacote de sílica gel ou arroz cru envolvido em pano, como dessecante. Etiquete cada vidro com: variedade, ano de colheita, planta-mãe, observações fenotípicas (resistência, sabor, produtividade).',
      'Armazene em local fresco, escuro e seco. Idealmente entre 5 °C e 15 °C com umidade relativa abaixo de 50%. Geladeira funciona para variedades sensíveis (alface, cenoura). Adega ou despensa coberta serve para a maioria. Nunca em sótão quente nem garagem com variação térmica.',
    ],
    praticas: [
      'Sistema de etiquetas padronizado: nome popular / científico / ano / origem',
      'Caderno de campo com fenótipos observados a cada geração',
      'Backup duplicado em casa de familiar ou amigo de confiança',
      'Inventário anual com teste de germinação por amostragem',
    ],
    tempo: 'Setup inicial: 1 fim de semana',
  },
  {
    num: '04',
    titulo: 'Vida útil real de cada semente',
    subtitulo: 'O cronograma silencioso da viabilidade',
    imagem: imgArmazenamento,
    paragrafos: [
      'Toda semente tem prazo. Algumas duram 1 ano, outras passam de 10. Tomate, pimentão e berinjela: até 6 anos em condições ideais. Feijões e ervilhas: 3 a 5 anos. Cenoura, salsa e cebola: apenas 1 a 2 anos, depois despencam. Milho: 2 a 3 anos com queda visível na germinação.',
      'Esse cronograma define sua rotação. Variedades de vida curta precisam ser cultivadas e colhidas todo ano para regenerar o banco. Variedades de vida longa permitem armazenamento estratégico. Se você não regenera no prazo, perde a variedade — não importa quão "bem guardada" estava.',
      'Faça teste de germinação anual: coloque 10 sementes entre folhas de papel toalha úmido em recipiente fechado. Aguarde o tempo típico da espécie (5 a 14 dias). Conte quantas brotaram. Abaixo de 70% de germinação, é hora de regenerar a variedade plantando em escala.',
    ],
    praticas: [
      'Caderno de viabilidade com data-limite de cada variedade',
      'Calendário anual de regeneração: quais plantar este ano para refazer o banco',
      'Teste de germinação obrigatório antes de cada plantio importante',
      'Marcação visual no vidro: ano de colheita em vermelho quando próximo do limite',
    ],
    tempo: 'Auditoria anual: 1 dia',
  },
  {
    num: '05',
    titulo: 'Rede de troca: o multiplicador final',
    subtitulo: 'Por que guardar sozinho é frágil',
    imagem: imgTroca,
    paragrafos: [
      'Banco individual é vulnerável. Incêndio, enchente, mudança forçada, doença prolongada — tudo pode liquidar anos de seleção genética em um dia. A resposta não é só backup físico. É rede social de guardiões. Cada variedade que você compartilha multiplica sua resiliência geográfica.',
      'Participe de feiras agroecológicas, encontros de guardiões de sementes (a Bionatur, a Rede Sementes da Mata Atlântica, a AS-PTA mantêm bancos comunitários), ou simplesmente troque com vizinhos do bairro que cultivam. A regra ancestral é simples: você dá um punhado, recebe outro punhado.',
      'Documente cada troca: de quem veio, quando, qual variedade, com que descrição. Em 5 anos você terá uma rede mapeada de fontes confiáveis e variedades resistentes. Esta rede vale mais que qualquer estoque pessoal — é a sua infraestrutura social de soberania alimentar.',
    ],
    praticas: [
      'Mantenha sempre um excedente de 30% para troca, nunca ofereça suas últimas sementes',
      'Caderno de trocas com contato e data',
      'Frequente feiras agroecológicas locais pelo menos 2 vezes ao ano',
      'Conecte-se a redes formais: AS-PTA, Bionatur, Articulação no Semiárido (ASA)',
    ],
    tempo: 'Construção da rede: 6 a 12 meses',
  },
];

const ARMADILHAS = [
  { titulo: 'Comprar sementes "orgânicas" de marca grande',
    detalhe: 'Muitas embalagens de supermercado rotuladas como "orgânicas" são híbridas F1. Plantam, mas não se reproduzem fielmente. Confira sempre o termo "polinização aberta" ou "OP" no rótulo, e a procedência.' },
  { titulo: 'Guardar sementes na geladeira sem secar bem',
    detalhe: 'Umidade residual dentro do vidro fechado em ambiente frio gera condensação interna e mofo silencioso. A semente apodrece sem você perceber. Seque por mais tempo do que você acha necessário — paranoia salva variedades.' },
  { titulo: 'Cultivar variedades polinizadas pelo vento muito perto',
    detalhe: 'Milho, abóbora, beterraba e espinafre cruzam-se com facilidade. Se você planta duas variedades de milho a 50 metros uma da outra, a próxima geração será uma mistura sem identidade. Distância mínima ou diferença de ciclo é obrigatória.' },
  { titulo: 'Confiar em pacotes de "kit de emergência" online',
    detalhe: 'Vendedores de "doomsday seed vault" enviam saches genéricos sem origem rastreada. Frequentemente híbridos em embalagem dramática. Compre direto de produtor, nunca de marketplace genérico.' },
  { titulo: 'Esquecer da regeneração e perder variedades raras',
    detalhe: 'Aquela variedade rara que você ganhou em 2020 e nunca cultivou desde então provavelmente está morta. Sementes precisam de ciclo. Sem cultivo, sem futuro. Calendarize a regeneração ou doe a quem vai cultivar.' },
  { titulo: 'Misturar sementes de diferentes anos no mesmo vidro',
    detalhe: 'Você perde rastreabilidade de viabilidade. Um vidro com lote velho contamina o teste de germinação de toda a coleção. Um vidro, um lote, um ano. Sem exceção.' },
];

const FAQ = [
  { q: 'Por que não posso simplesmente comprar sementes em supermercado?',
    a: 'Pode, mas a maioria absoluta dessas sementes é híbrida F1 ou variedade comercial protegida. Funcionam para uma colheita única. Não se reproduzem fielmente. Você fica preso ao ciclo de recompra anual e dependente da empresa fornecedora. Sementes crioulas (polinização aberta) são as únicas que mantêm soberania genética geração após geração.' },
  { q: 'Quanto tempo dura uma semente bem guardada?',
    a: 'Depende da espécie. Tomate, pimentão e berinjela: até 6 anos em condições ideais. Feijão e ervilha: 3 a 5 anos. Milho: 2 a 3 anos. Cenoura, salsa, cebola e alface: apenas 1 a 2 anos. A regra é: quanto menor a semente, mais curta a viabilidade. Faça teste de germinação anual para saber o que ainda funciona.' },
  { q: 'Onde encontro sementes crioulas confiáveis no Brasil?',
    a: 'Bionatur (RS), Rede Sementes da Mata Atlântica (SP/RJ), AS-PTA (PE/PB), Articulação no Semiárido Brasileiro (ASA), feiras agroecológicas locais (frequente em capitais), bancos comunitários de sementes em assentamentos. Embrapa Recursos Genéticos mantém um catálogo nacional. Evite marketplaces genéricos.' },
  { q: 'Posso guardar sementes em saco plástico?',
    a: 'Em emergência, sim, por curto prazo. Para banco real, não. Plástico retém umidade residual, gera condensação interna em variação térmica, e degrada-se em contato com óleos naturais das sementes. Use vidro com tampa rosqueada, papel não-acetinado para envelopes internos, e dessecante (sílica ou arroz seco).' },
  { q: 'Como sei se uma semente vai germinar antes de plantar?',
    a: 'Faça o teste do papel toalha. Coloque 10 sementes entre 2 folhas de papel toalha úmido (não encharcado) dentro de um recipiente fechado. Mantenha em temperatura ambiente. Após o tempo típico da espécie (tomate 7 dias, feijão 5 dias, milho 7 dias), conte quantas brotaram. Acima de 70%, lote viável. Abaixo, regenere a variedade urgente.' },
  { q: 'Vale a pena fazer banco de sementes em apartamento?',
    a: 'Vale, e muito. Você não precisa cultivar para guardar. Pode receber por troca ou compra de produtores e armazenar. O banco em apartamento é o mais seguro contra incêndio rural, enchente em sítio, ou roubo de propriedade. Use armário fresco, longe de cozinha (umidade) e janela (calor). Microbanco é viável em qualquer lugar.' },
  { q: 'Sementes geneticamente modificadas (OGM) podem virar crioulas?',
    a: 'Não. OGMs são protegidos por patente e o cruzamento natural com crioulas vizinhas pode contaminar a linhagem original — esse é um dos maiores riscos para a biodiversidade brasileira. Evite plantar OGMs perto de coleções crioulas. Mantenha distância mínima de 200 metros ou diferença de ciclo de floração.' },
  { q: 'Como começar do zero sem nenhuma semente?',
    a: 'Três passos: (1) Identifique a feira agroecológica mais próxima e compre 5 a 10 variedades de produtores diretos. (2) Cadastre-se em uma rede como AS-PTA ou Rede Sementes para participar de trocas. (3) Comece com 3 espécies fáceis de reproduzir: feijão, tomate cereja crioulo e abóbora. Em 2 ciclos você terá banco próprio e participará da rede ativa.' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#3a4a2e' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(58,74,46,0.45) 0%, rgba(58,74,46,0.25) 35%, rgba(245,239,228,0.05) 70%, #f5efe4 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(245,239,228,0.18)', border: '1px solid rgba(245,239,228,0.3)' }}>
          <Sprout size={16} style={{ color: '#f5efe4' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f5efe4' }}>
            Banco Botânico Pessoal · Manual Definitivo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f5efe4' }}>
          Quem guarda sementes,<br/>
          <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(255,179,122,0.5), 0 0 80px rgba(255,179,122,0.3)' }}>
            guarda o futuro.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(245,239,228,0.9)', fontFamily: "'Inter Tight', sans-serif" }}>
          O manual definitivo para construir o seu banco pessoal de sementes crioulas brasileiras. Da extração à rede de troca. O ativo biológico que nenhum confisco alcança.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function SementesCrioulas() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/sementes-crioulas"
        custom={{
          title: 'Sementes Crioulas: Manual do Banco Pessoal e Soberania Genética',
          description: 'Manual completo: como extrair, fermentar, armazenar e trocar sementes crioulas brasileiras. Construa seu banco pessoal de variedades resistentes em 5 capítulos.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/sementes-crioulas',
          primaryKeyword: 'sementes crioulas',
          lsiKeywords: ['banco de sementes', 'sementes orgânicas brasileiras', 'polinização aberta', 'preservação genética', 'AS-PTA', 'Bionatur', 'Embrapa sementes'],
          longTailKeywords: ['como guardar sementes crioulas em casa', 'banco pessoal de sementes brasileiras', 'fermentação de sementes de tomate', 'rede de troca de sementes Brasil'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Sementes Crioulas', url: '/soberania-organica/sementes-crioulas' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica · Autonomia Alimentar',
          relatedPages: ['/soberania-organica', '/soberania-organica/horta-urbana', '/soberania-organica/solo-fertilidade', '/soberania-organica/producao-pequenos-espacos'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f5efe4', color: '#1c1f17', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c46b3a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c46b3a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6450' }}>O ativo biológico esquecido</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#3a4a2e' }}>
                Toda revolução alimentar começa{' '}
                <span style={{ color: '#c46b3a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  num punhado de sementes.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3324' }}>
                <p>
                  Quem controla as sementes, controla a comida. Quem controla a comida, controla as pessoas. Esta frase, atribuída a Henry Kissinger nos anos 70, descreve com precisão o sistema que estamos vivendo agora. Quatro corporações concentram mais de 60% do mercado mundial de sementes. As patentes substituíram a partilha. O agricultor virou cliente.
                </p>
                <p>
                  Sementes crioulas — também chamadas de varietais, tradicionais ou de polinização aberta — são as únicas que se reproduzem fielmente geração após geração. Você planta, colhe, separa as melhores e replanta. Sem royalties. Sem contrato. Sem dependência. É o equivalente botânico da autocustódia em Bitcoin.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c46b3a', color: '#3a4a2e', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Um banco de sementes é um cofre vivo. Cada variedade é uma chave para a sua próxima safra de soberania.
                </blockquote>
                <p>
                  Este manual é um caminho prático em cinco capítulos. Você vai aprender a escolher variedades reais, extrair sementes corretamente, montar seu banco pessoal, calcular vida útil e construir uma rede de troca regional. No final, você terá uma infraestrutura biológica que nenhum supermercado, nenhuma corporação e nenhum governo conseguem desligar.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — IMAGEM TOTEM E URGÊNCIA */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#3a4a2e', color: '#f5efe4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
                <img src={imgGerminacao} alt="Semente germinando" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-6" style={{ color: '#ffb37a' }}>Capítulo 02</span>
                <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f5efe4' }}>
                  Cada semente é uma{' '}
                  <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                    declaração de independência.
                  </span>
                </h2>
                <p className="text-lg md:text-xl leading-[1.7] font-light mb-6" style={{ color: 'rgba(245,239,228,0.85)' }}>
                  Em 1900, o mundo cultivava mais de 7.000 variedades comerciais de maçã. Hoje, restam menos de 100. O mesmo padrão se repete em milho, arroz, feijão, tomate. A erosão genética é a forma mais silenciosa e definitiva de perder soberania alimentar.
                </p>
                <p className="text-lg md:text-xl leading-[1.7] font-light" style={{ color: 'rgba(245,239,228,0.85)' }}>
                  No Brasil, a Embrapa estima que 90% das variedades agrícolas tradicionais estão sob risco de extinção em duas gerações. Cada guardião que monta um banco pessoal age como uma célula de resistência genética. Não é hobby. É infraestrutura crítica.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — OS 5 PILARES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#f5efe4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c46b3a' }}>Capítulo 03 · O Manual</span>
              <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.95] tracking-tight" style={{ color: '#3a4a2e' }}>
                Cinco pilares.<br/>
                <span style={{ color: '#c46b3a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Da escolha à rede.
                </span>
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-[1.6] font-light max-w-2xl" style={{ color: '#2d3324' }}>
                Construído na ordem em que um guardião real opera. Cada pilar tem o quê fazer, como fazer e quanto tempo leva. Sem floreio.
              </p>
            </motion.div>

            <div className="space-y-32 md:space-y-40">
              {PILARES.map((p, i) => {
                const reverso = i % 2 === 1;
                return (
                  <motion.article key={p.num} {...fade(0.1)} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-2' : ''}`}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img src={p.imagem} alt={p.titulo} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute top-6 left-6 text-7xl md:text-8xl font-black opacity-95" style={{ color: '#f5efe4', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                          {p.num}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: '#c46b3a' }}>Pilar {p.num}</p>
                      <h3 className="text-[clamp(1.85rem,3.5vw,3rem)] font-black leading-[1.05] tracking-tight mb-3" style={{ color: '#3a4a2e' }}>
                        {p.titulo}
                      </h3>
                      <p className="text-lg md:text-xl mb-8 font-light italic" style={{ color: '#5a6450', fontFamily: "'Playfair Display', serif" }}>
                        {p.subtitulo}
                      </p>
                      <div className="space-y-5 mb-8 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#2d3324' }}>
                        {p.paragrafos.map((par, idx) => <p key={idx}>{par}</p>)}
                      </div>
                      <div className="border-t pt-6 mt-6" style={{ borderColor: 'rgba(196,107,58,0.3)' }}>
                        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#c46b3a' }}>Práticas obrigatórias</p>
                        <ul className="space-y-3">
                          {p.praticas.map((pr, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base md:text-lg leading-[1.6]" style={{ color: '#2d3324' }}>
                              <Sprout size={18} className="shrink-0 mt-1" style={{ color: '#c46b3a' }} />
                              <span>{pr}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(58,74,46,0.08)' }}>
                          <Calendar size={14} style={{ color: '#3a4a2e' }} />
                          <span className="text-sm font-semibold" style={{ color: '#3a4a2e' }}>{p.tempo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — ARMADILHAS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#3a4a2e', color: '#f5efe4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Capítulo 04 · Erros que matam coleções</span>
              <h2 className="text-[clamp(2.25rem,5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#f5efe4' }}>
                Seis armadilhas{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                  que arruínam guardiões iniciantes.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="p-8 md:p-10" style={{ backgroundColor: 'rgba(245,239,228,0.06)', border: '1px solid rgba(245,239,228,0.12)' }}>
                  <AlertTriangle size={24} className="mb-5" style={{ color: '#ffb37a' }} />
                  <h4 className="text-xl md:text-2xl font-bold leading-tight mb-4" style={{ color: '#f5efe4' }}>{a.titulo}</h4>
                  <p className="text-base md:text-lg leading-[1.65] font-light" style={{ color: 'rgba(245,239,228,0.8)' }}>{a.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — FAQ */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#f5efe4' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c46b3a' }}>Capítulo 05 · FAQ</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#3a4a2e' }}>
                As oito perguntas{' '}
                <span style={{ color: '#c46b3a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que todo guardião faz no primeiro ano.
                </span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="border-b" style={{ borderColor: 'rgba(58,74,46,0.18)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left">
                      <span className="text-lg md:text-xl font-semibold leading-snug" style={{ color: '#3a4a2e' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-300" style={{ color: '#c46b3a', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <p className="pb-7 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#2d3324' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <section className="py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#3a4a2e', color: '#f5efe4' }}>
          <div className="max-w-[1600px] mx-auto text-center">
            <ShieldCheck size={32} className="mx-auto mb-6" style={{ color: '#ffb37a' }} />
            <p className="text-xl md:text-3xl font-light leading-[1.5] max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#f5efe4' }}>
              "Quem guarda uma semente, guarda a possibilidade de uma colheita. Quem guarda mil, guarda o direito de não pedir licença para comer."
            </p>
            <p className="mt-6 text-xs font-bold tracking-[0.4em] uppercase" style={{ color: '#ffb37a' }}>Lord Junnior · Guardião de Sementes</p>
          </div>
        </section>
      </div>
    </>
  );
}