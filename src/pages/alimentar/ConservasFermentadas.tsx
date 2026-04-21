import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FlaskConical, Calendar, ShieldCheck, ChevronDown, AlertTriangle, Thermometer,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/alimentar/fermentadas-hero.jpg';
import imgChucrute from '@/assets/alimentar/fermentadas-chucrute.jpg';
import imgKimchi from '@/assets/alimentar/fermentadas-kimchi.jpg';
import imgKefir from '@/assets/alimentar/fermentadas-kefir.jpg';
import imgFerramentas from '@/assets/alimentar/fermentadas-ferramentas.jpg';
import imgArmazenamento from '@/assets/alimentar/fermentadas-armazenamento.jpg';
import imgMesa from '@/assets/alimentar/fermentadas-mesa.jpg';

/**
 * /soberania-organica/conservas-fermentadas
 * Padrão ouro Apple editorial. Paleta Amber profundo (#7a3a1f) + Amber dourado (#c8902f) + Cream (#f5efe1).
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
    titulo: 'Chucrute: a porta de entrada',
    subtitulo: 'Repolho, sal e tempo. Mais nada.',
    imagem: imgChucrute,
    paragrafos: [
      'O chucrute é a fermentação mais simples do planeta. Você pega repolho, corta fino, adiciona sal, soca até a verdura soltar a própria água e deixa descansar fechado. As bactérias boas que já vivem na superfície do repolho fazem o resto. Sem fogo, sem vinagre, sem nada artificial.',
      'A regra de ouro é a proporção: 2% de sal sobre o peso do repolho. Para 1 quilo de repolho, 20 gramas de sal. Esse sal não conserva como o sal de carne seca — ele só impede as bactérias erradas de aparecerem antes das bactérias certas (Lactobacillus) tomarem conta. Em 7 dias, o repolho vira um alimento vivo.',
      'O resultado fica pronto entre 7 e 21 dias dependendo da temperatura ambiente. Quanto mais quente, mais rápido. Quanto mais lento, mais complexo o sabor. Pense no chucrute como o pão de fermentação natural da família dos vegetais: leva tempo, exige paciência, e o resultado não tem comparação com o industrializado.',
    ],
    praticas: [
      'Use sempre sal grosso sem iodo (o iodo mata as bactérias boas)',
      'Use vidro de boca larga, nunca recipiente de metal',
      'Mantenha o repolho sempre submerso na própria salmoura — se boiar, mofa',
      'Prove a partir do dia 5 e pare quando o sabor estiver no ponto que você gosta',
    ],
    tempo: '7 a 21 dias na bancada',
  },
  {
    num: '02',
    titulo: 'Kimchi: o passo seguinte',
    subtitulo: 'A versão coreana com mais camadas',
    imagem: imgKimchi,
    paragrafos: [
      'Kimchi é o irmão mais ousado do chucrute. Em vez de só repolho e sal, entra acelga (ou repolho normal), pasta de pimenta vermelha coreana (gochugaru), gengibre, alho, cebolinha e nabo. O processo de fermentação é o mesmo, mas o sabor final é picante, complexo e profundamente saboroso.',
      'A diferença prática é uma etapa extra: você primeiro salga a acelga inteira por 2 horas para amolecer e expulsar a água, depois lava, escorre e mistura com a pasta temperada. Só então fecha no vidro e deixa fermentar. Em 3 a 5 dias na bancada já está pronto, e continua melhorando por semanas na geladeira.',
      'Estudos clínicos mostram que kimchi consumido diariamente por 4 semanas reduz colesterol LDL, melhora o perfil de bactérias intestinais e diminui marcadores inflamatórios. Não é moda: é farmácia ancestral em vidro. Uma colher por refeição já entrega o efeito.',
    ],
    praticas: [
      'Compre gochugaru (pimenta coreana em flocos) em casa de produtos asiáticos — não substitua por pimenta-do-reino',
      'Não use alho em pó: precisa ser fresco, picado na hora',
      'Fermentar com a tampa apenas encostada nos primeiros 3 dias para liberar gás',
      'Após pronto, vai para geladeira e dura até 6 meses melhorando o sabor',
    ],
    tempo: '3 a 5 dias na bancada + geladeira',
  },
  {
    num: '03',
    titulo: 'Kefir: probiótico líquido diário',
    subtitulo: 'Os grãos que se multiplicam para sempre',
    imagem: imgKefir,
    paragrafos: [
      'Kefir é uma colônia viva de bactérias e leveduras agrupadas em pequenos grãos brancos parecidos com couve-flor em miniatura. Você coloca os grãos em um vidro com leite (ou água com açúcar mascavo), deixa 24 horas em temperatura ambiente, e o líquido vira uma bebida espumante, levemente ácida, cheia de probióticos.',
      'Os grãos não se gastam. Eles se multiplicam. A cada fermentação você ganha mais grãos do que tinha antes. Em 3 meses você terá grãos suficientes para abastecer toda a família e ainda dar para vizinhos e amigos. É o único alimento fermentado que cresce sozinho enquanto você consome.',
      'Existem dois tipos: kefir de leite (branco, cremoso, parecido com iogurte líquido) e kefir de água (transparente, gaseificado, parecido com refrigerante natural). Os grãos são diferentes e não se misturam. Se você é intolerante a lactose, comece pelo de água — fermenta açúcar, não leite.',
    ],
    praticas: [
      'Consiga grãos de doação local ou grupo de Facebook — kefir tradicionalmente não se vende',
      'Use vidro com tampa de pano (não fechado) para os primeiros dias',
      'Sempre use colher de plástico ou madeira ao manipular os grãos — metal os danifica',
      'Tome 200 a 300 ml por dia em jejum para máximo efeito intestinal',
    ],
    tempo: '24 horas por ciclo, todos os dias',
  },
  {
    num: '04',
    titulo: 'Ferramentas e ambiente',
    subtitulo: 'O setup mínimo para começar hoje',
    imagem: imgFerramentas,
    paragrafos: [
      'Você não precisa comprar nada caro. Vidros de conserva (potes Ball, Weck ou qualquer vidro com tampa de rosca já lavado) servem para 90% das fermentações. Sal grosso sem iodo, uma balança de cozinha barata e um pano de prato cobrindo a boca do vidro nos primeiros dias resolvem.',
      'Os opcionais que melhoram a vida: airlock (uma válvula que deixa o gás sair sem deixar oxigênio entrar — evita mofo na superfície), peso de cerâmica (mantém os vegetais submersos na salmoura) e termômetro de cozinha (para conferir se a sala está entre 18 e 24 °C, faixa ideal para a maioria das fermentações).',
      'O ambiente importa mais do que o equipamento. Lugar fresco, escuro, sem variação grande de temperatura. Cozinha de apartamento serve perfeitamente. Cuidado com janela de sol direto, fogão ligado o dia inteiro ou geladeira pegando vibração da máquina — tudo isso desestabiliza a colônia de bactérias.',
    ],
    praticas: [
      'Esterilize vidros com água fervente por 5 minutos antes do primeiro uso',
      'Mantenha um caderno de fermentação: data de início, temperatura, observação de sabor',
      'Compre balança digital de cozinha (10 a 30 reais) — proporção exata é crítica',
      'Tenha sempre 2 a 3 vidros vazios prontos para iniciar lote novo',
    ],
    tempo: 'Setup inicial: R$ 50 a R$ 150',
  },
  {
    num: '05',
    titulo: 'Armazenamento e rotação',
    subtitulo: 'A despensa viva de longa duração',
    imagem: imgArmazenamento,
    paragrafos: [
      'Fermentado pronto vai para geladeira ou local fresco e dura muito mais do que você imagina. Chucrute em geladeira aguenta 6 meses sem perder qualidade. Kimchi: até 1 ano (e melhora). Picles fermentados: 8 a 12 meses. Você está construindo uma despensa viva que substitui a maior parte da prateleira de conservas industriais.',
      'A regra é simples: enquanto a salmoura cobrir o alimento e não houver mofo branco grosso por cima, está bom. Mofo branco fino e fofo é normal e se chama kahm yeast — basta retirar com colher limpa e continuar. Mofo colorido (verde, preto, rosa) indica contaminação: descarte o lote inteiro.',
      'Para famílias maiores, vale ter 4 a 6 vidros de chucrute, 2 a 3 de kimchi e 1 colônia de kefir ativa o ano inteiro. Você gira os lotes: enquanto come um, outro fermenta na bancada. Em 3 meses essa rotação vira automática e o consumo de probióticos vira parte natural das refeições.',
    ],
    praticas: [
      'Etiquete cada vidro com data de início e data prevista de pico de sabor',
      'Mantenha vidros menores (300 a 500ml) — fermentado aberto perde qualidade rápido',
      'Reserve a parte de baixo da geladeira (mais fria e estável) para fermentados de longa duração',
      'Faça inspeção visual semanal: olhe a superfície de todos os vidros',
    ],
    tempo: 'Rotação contínua, manutenção: 10 min por semana',
  },
];

const ARMADILHAS = [
  { titulo: 'Usar sal de cozinha com iodo',
    detalhe: 'O iodo adicionado no sal comum mata as bactérias Lactobacillus que fazem a fermentação acontecer. Resultado: o vegetal apodrece em vez de fermentar. Use sempre sal grosso sem iodo, sal marinho ou sal rosa. Verifique o rótulo antes de comprar.' },
  { titulo: 'Fechar o vidro hermético nos primeiros dias',
    detalhe: 'A fermentação produz gás carbônico em quantidade. Vidro hermético fechado nos primeiros 3 a 5 dias pode literalmente explodir na sua bancada. Sempre deixe a tampa apenas encostada ou use airlock próprio. Só feche depois que a produção de gás diminuir.' },
  { titulo: 'Vegetal boiando para fora da salmoura',
    detalhe: 'O que está submerso fermenta. O que fica exposto ao ar mofa. Use peso de cerâmica, uma folha de repolho dobrada por cima ou um vidro menor cheio de água por dentro do vidro maior. A regra é absoluta: tudo coberto, sempre.' },
  { titulo: 'Confundir kahm yeast com mofo perigoso',
    detalhe: 'Película branca fina, lisa e fofa é kahm yeast — inofensiva, basta retirar com colher e seguir. Manchas verdes, pretas, azuis ou rosadas são mofo de verdade: descarte o lote inteiro sem pensar duas vezes. Não tente "salvar" tirando só a parte ruim.' },
  { titulo: 'Esperar gosto de pasteurizado',
    detalhe: 'Fermentado vivo é ácido, levemente borbulhante e tem sabor complexo. Quem cresceu comendo só conserva industrializada estranha no início. Comece com pequenas porções (1 colher por refeição) por 2 semanas — o paladar reaprende rápido e depois você não consegue mais comer industrializado.' },
  { titulo: 'Lavar grãos de kefir com sabão ou cloro',
    detalhe: 'Kefir é uma colônia viva. Sabão ou água clorada de torneira mata os grãos em uma única lavagem. Se precisar enxaguar, use apenas água filtrada ou mineral em temperatura ambiente. Idealmente nunca lave — só transfira para vidro novo com leite fresco.' },
];

const FAQ = [
  { q: 'Posso fermentar qualquer vegetal?',
    a: 'A maioria sim, mas alguns funcionam muito melhor. Repolho, pepino, cenoura, rabanete, beterraba, couve-flor e nabo são os campeões. Folhas verdes finas (alface, espinafre) viram massa mole — evite. Tomate fermenta mas exige técnica diferente. Comece pelos clássicos: chucrute e picles de pepino.' },
  { q: 'Fermentado faz mal para quem tem gastrite ou refluxo?',
    a: 'Depende da fase. Em crise aguda, evite. Fora de crise, a maioria das pessoas com problemas digestivos relata melhora significativa após 4 a 6 semanas de consumo diário pequeno (1 colher de sopa por refeição). Os probióticos restauram a flora intestinal e a barreira da mucosa. Comece sempre com porções mínimas e observe.' },
  { q: 'Quanto tempo fermentado dura na geladeira?',
    a: 'Chucrute: 6 a 12 meses. Kimchi: 6 a 12 meses (melhora com tempo). Picles fermentados: 8 a 12 meses. Kefir já fermentado: 3 a 5 dias. Kombucha: 2 semanas. A regra geral: enquanto a salmoura cobrir o alimento e não houver mofo colorido visível, está bom para consumo.' },
  { q: 'Crianças podem comer fermentados?',
    a: 'Sim, a partir de 1 ano de idade, em pequenas porções iniciais. Comece com uma colher de chá de chucrute ou kefir misturado a outras comidas. Aumente gradualmente. Crianças que crescem comendo fermentados costumam ter sistema imune mais robusto e menos alergias alimentares conforme demonstrado em estudos populacionais europeus.' },
  { q: 'Preciso comprar equipamento caro para começar?',
    a: 'Não. Para começar com chucrute você precisa de: 1 vidro de boca larga com tampa, 1 quilo de repolho, 20 gramas de sal sem iodo, 1 pano de prato. Custo total abaixo de R$ 30. Equipamentos profissionais (airlocks, pesos de cerâmica) são úteis depois que você pegar gosto, mas absolutamente não obrigatórios no início.' },
  { q: 'Fermentado tem álcool?',
    a: 'Quantidades muito pequenas em alguns casos. Kombucha tem entre 0,3% e 1% de álcool naturalmente. Chucrute e kimchi têm traços inferiores a 0,1%. Kefir de leite chega a 1% se fermentar mais de 48 horas. Para a maioria das pessoas isso é irrelevante. Para gestantes, religiosos ou pessoas em recuperação de alcoolismo, vale evitar kombucha de fermentação longa.' },
  { q: 'Kefir engorda?',
    a: 'Kefir de leite integral tem em média 60 a 70 calorias por copo de 200 ml — menos que um suco de laranja natural. Kefir de água tem 20 a 30 calorias por copo. Os probióticos melhoram absorção de nutrientes e regulam apetite. Estudos mostram que consumo regular está associado a redução de gordura visceral, não ao contrário.' },
  { q: 'Posso vender meus fermentados caseiros?',
    a: 'Para venda formal no Brasil, exige registro na vigilância sanitária e inspeção do estabelecimento — processo burocrático mas viável. Para troca informal entre amigos e vizinhos, sem fins lucrativos, não há restrição. Muitos guardiões começam vendendo em feiras agroecológicas pequenas como produto artesanal cadastrado.' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#7a3a1f' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.08) contrast(1.03)' }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(122,58,31,0.45) 0%, rgba(122,58,31,0.25) 35%, rgba(245,239,225,0.05) 70%, #f5efe1 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(245,239,225,0.18)', border: '1px solid rgba(245,239,225,0.3)' }}>
          <FlaskConical size={16} style={{ color: '#f5efe1' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f5efe1' }}>
            Despensa Viva · Manual Definitivo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f5efe1' }}>
          O tempo conserva,<br/>
          <span style={{ color: '#ffc878', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(255,200,120,0.5), 0 0 80px rgba(255,200,120,0.3)' }}>
            o sal protege.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(245,239,225,0.9)', fontFamily: "'Inter Tight', sans-serif" }}>
          O manual definitivo de conservas fermentadas: chucrute, kimchi e kefir. A despensa viva que abastece a sua família o ano inteiro sem geladeira, sem indústria, sem dependência.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ConservasFermentadas() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/conservas-fermentadas"
        custom={{
          title: 'Conservas Fermentadas: Chucrute, Kimchi e Kefir Caseiros',
          description: 'Manual completo de fermentação caseira: chucrute, kimchi e kefir. Receitas exatas, ferramentas mínimas e armazenamento de longa duração para sua despensa viva.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/conservas-fermentadas',
          primaryKeyword: 'conservas fermentadas',
          lsiKeywords: ['chucrute caseiro', 'kimchi receita', 'kefir de leite', 'fermentação láctica', 'probióticos naturais', 'lacto fermentação'],
          longTailKeywords: ['como fazer chucrute em casa', 'receita kimchi tradicional', 'kefir de leite passo a passo', 'fermentação vegetal sem vinagre'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Conservas Fermentadas', url: '/soberania-organica/conservas-fermentadas' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica · Autonomia Alimentar',
          relatedPages: ['/soberania-organica', '/soberania-organica/sementes-crioulas', '/soberania-organica/horta-urbana', '/soberania-organica/conservacao-alimentos'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f5efe1', color: '#1f1813', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c8902f' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c8902f' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#7a5a3a' }}>A despensa que respira</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#7a3a1f' }}>
                Antes da geladeira, o homem já sabia{' '}
                <span style={{ color: '#c8902f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  guardar o verão para o inverno.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#3a2820' }}>
                <p>
                  Fermentar é a tecnologia de conservação mais antiga da humanidade. Antes do refrigerador, antes do enlatamento, antes do plástico — havia o vidro, o sal e o tempo. Os romanos fermentavam couve em barris de madeira, os coreanos enterravam kimchi no quintal durante o inverno, os russos viviam de chucrute por 6 meses ao ano. Nada se perdia.
                </p>
                <p>
                  Quando você fermenta, está terceirizando a conservação para milhões de bactérias boas (Lactobacillus, principalmente) que comem o açúcar do vegetal e produzem ácido láctico. Esse ácido baixa o pH a um nível em que nada de ruim consegue sobreviver. O vegetal vira ácido, vivo e estável por meses sem precisar de eletricidade.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c8902f', color: '#7a3a1f', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Cada vidro fermentando na sua bancada é uma fábrica de probióticos que trabalha 24 horas por dia sem cobrar nada.
                </blockquote>
                <p>
                  Este manual é prático em cinco capítulos: chucrute como porta de entrada, kimchi como passo seguinte, kefir como probiótico diário, ferramentas mínimas e armazenamento de longa duração. No final, você terá uma despensa viva que substitui parte significativa do que você compra industrializado e ainda regenera sua flora intestinal sem suplemento de farmácia.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — IMAGEM TOTEM E URGÊNCIA */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#7a3a1f', color: '#f5efe1' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
                <img src={imgMesa} alt="Chucrute caseiro servido à mesa familiar" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-6" style={{ color: '#ffc878' }}>Capítulo 02</span>
                <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f5efe1' }}>
                  O intestino é{' '}
                  <span style={{ color: '#ffc878', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                    a sua segunda saúde mental.
                  </span>
                </h2>
                <p className="text-lg md:text-xl leading-[1.7] font-light mb-6" style={{ color: 'rgba(245,239,225,0.85)' }}>
                  Setenta por cento do sistema imunológico vive no intestino. A flora intestinal — a colônia de bactérias que mora lá dentro — define imunidade, humor, sono, peso, alergias e até clareza mental. Antibiótico, açúcar refinado e ultraprocessado destroem essa colônia em poucos dias.
                </p>
                <p className="text-lg md:text-xl leading-[1.7] font-light" style={{ color: 'rgba(245,239,225,0.85)' }}>
                  Fermentado caseiro entrega bilhões de bactérias vivas por colher de sopa. Suplemento probiótico de farmácia entrega menos da metade — e custa 30 vezes mais. Uma colher de chucrute por refeição equivale a uma cápsula cara de probiótico tomada com água. A diferença é que o chucrute também alimenta a família.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — OS 5 PILARES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#f5efe1' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c8902f' }}>Capítulo 03 · O Manual</span>
              <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.95] tracking-tight" style={{ color: '#7a3a1f' }}>
                Cinco pilares.<br/>
                <span style={{ color: '#c8902f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Do primeiro vidro à despensa rotativa.
                </span>
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-[1.6] font-light max-w-2xl" style={{ color: '#3a2820' }}>
                Construído na ordem em que uma família real começa: do mais simples ao mais técnico. Cada pilar tem o quê fazer, como fazer e quanto tempo leva.
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
                        <div className="absolute top-6 left-6 text-7xl md:text-8xl font-black opacity-95" style={{ color: '#f5efe1', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                          {p.num}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: '#c8902f' }}>Pilar {p.num}</p>
                      <h3 className="text-[clamp(1.85rem,3.5vw,3rem)] font-black leading-[1.05] tracking-tight mb-3" style={{ color: '#7a3a1f' }}>
                        {p.titulo}
                      </h3>
                      <p className="text-lg md:text-xl mb-8 font-light italic" style={{ color: '#7a5a3a', fontFamily: "'Playfair Display', serif" }}>
                        {p.subtitulo}
                      </p>
                      <div className="space-y-5 mb-8 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#3a2820' }}>
                        {p.paragrafos.map((par, idx) => <p key={idx}>{par}</p>)}
                      </div>
                      <div className="border-t pt-6 mt-6" style={{ borderColor: 'rgba(200,144,47,0.3)' }}>
                        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#c8902f' }}>Práticas obrigatórias</p>
                        <ul className="space-y-3">
                          {p.praticas.map((pr, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base md:text-lg leading-[1.6]" style={{ color: '#3a2820' }}>
                              <Thermometer size={18} className="shrink-0 mt-1" style={{ color: '#c8902f' }} />
                              <span>{pr}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(122,58,31,0.08)' }}>
                          <Calendar size={14} style={{ color: '#7a3a1f' }} />
                          <span className="text-sm font-semibold" style={{ color: '#7a3a1f' }}>{p.tempo}</span>
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
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#7a3a1f', color: '#f5efe1' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffc878' }}>Capítulo 04 · Erros que arruínam lotes</span>
              <h2 className="text-[clamp(2.25rem,5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#f5efe1' }}>
                Seis armadilhas{' '}
                <span style={{ color: '#ffc878', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                  que matam fermentações iniciantes.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="p-8 md:p-10" style={{ backgroundColor: 'rgba(245,239,225,0.06)', border: '1px solid rgba(245,239,225,0.12)' }}>
                  <AlertTriangle size={24} className="mb-5" style={{ color: '#ffc878' }} />
                  <h4 className="text-xl md:text-2xl font-bold leading-tight mb-4" style={{ color: '#f5efe1' }}>{a.titulo}</h4>
                  <p className="text-base md:text-lg leading-[1.65] font-light" style={{ color: 'rgba(245,239,225,0.8)' }}>{a.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — FAQ */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#f5efe1' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c8902f' }}>Capítulo 05 · FAQ</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#7a3a1f' }}>
                As oito perguntas{' '}
                <span style={{ color: '#c8902f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que toda família faz no primeiro mês.
                </span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="border-b" style={{ borderColor: 'rgba(122,58,31,0.18)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left">
                      <span className="text-lg md:text-xl font-semibold leading-snug" style={{ color: '#7a3a1f' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-300" style={{ color: '#c8902f', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <p className="pb-7 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#3a2820' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <section className="py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#7a3a1f', color: '#f5efe1' }}>
          <div className="max-w-[1600px] mx-auto text-center">
            <ShieldCheck size={32} className="mx-auto mb-6" style={{ color: '#ffc878' }} />
            <p className="text-xl md:text-3xl font-light leading-[1.5] max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#f5efe1' }}>
              "Quem domina o sal, o vidro e o tempo, não depende da geladeira nem do supermercado para alimentar a família."
            </p>
            <p className="mt-6 text-xs font-bold tracking-[0.4em] uppercase" style={{ color: '#ffc878' }}>Lord Junnior · Guardião da Despensa Viva</p>
          </div>
        </section>
      </div>
    </>
  );
}
