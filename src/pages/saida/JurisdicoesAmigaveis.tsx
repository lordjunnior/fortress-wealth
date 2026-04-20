import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Globe2, Scale, Banknote, ShieldCheck, AlertTriangle,
  ArrowRight, ChevronDown, Compass, Bitcoin, Plane, MapPin, Building2
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/jurisdicoes-hero.jpg';
import imgParaguai from '@/assets/saida/jurisdicoes-paraguai.jpg';
import imgDubai from '@/assets/saida/jurisdicoes-dubai.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Pais {
  rank: number;
  nome: string;
  bandeira: string;
  custo: number;
  mobilidade: number;
  segJuridica: number;
  tributacao: number;
  cripto: number;
  total: number;
  perfilIdeal: string;
  fortes: string;
  fracos: string;
  custoVida: string;
  caminhoEntrada: string;
}

const PAISES: Pais[] = [
  {
    rank: 1,
    nome: 'Paraguai',
    bandeira: 'América do Sul',
    custo: 10, mobilidade: 6, segJuridica: 7, tributacao: 10, cripto: 9,
    total: 84,
    perfilIdeal: 'Bitcoiner com baixo capital, urgência e tolerância a infraestrutura latina.',
    fortes: 'Residência permanente em 90 dias, regime territorial puro, custo absurdamente baixo, sem CFC, vizinho do Brasil.',
    fracos: 'Passaporte com mobilidade média (147 países), infraestrutura desigual, sistema bancário com limitações para volumes altos.',
    custoVida: 'USD 1.200 a 2.500/mês',
    caminhoEntrada: 'Residência permanente direta (Lei 6.984), naturalização em 3 anos.',
  },
  {
    rank: 2,
    nome: 'Emirados Árabes (Dubai)',
    bandeira: 'Oriente Médio',
    custo: 4, mobilidade: 9, segJuridica: 9, tributacao: 10, cripto: 10,
    total: 82,
    perfilIdeal: 'Operador com capital, foco em cripto profissional e necessidade de banking premium.',
    fortes: 'Zero imposto sobre renda pessoal, regulação cripto madura via VARA, banking de elite, hub aéreo global.',
    fracos: 'Custo de vida alto, cultura conservadora, dependência política do regime, sem caminho real para cidadania.',
    custoVida: 'USD 3.500 a 8.000/mês',
    caminhoEntrada: 'Golden Visa por investimento, freelance permit, ou empresa em free zone.',
  },
  {
    rank: 3,
    nome: 'El Salvador',
    bandeira: 'América Central',
    custo: 8, mobilidade: 5, segJuridica: 7, tributacao: 9, cripto: 10,
    total: 78,
    perfilIdeal: 'Bitcoiner ideológico que quer viver em país onde Bitcoin é moeda legal.',
    fortes: 'Bitcoin como curso legal desde 2021, zero imposto sobre BTC, programa Freedom Visa por 1 BTC, comunidade ativa.',
    fracos: 'Passaporte fraco (134 países), infraestrutura em construção, dependência da figura presidencial.',
    custoVida: 'USD 1.500 a 3.000/mês',
    caminhoEntrada: 'Freedom Visa (1 BTC reembolsável), residência por investimento, naturalização em 5 anos.',
  },
  {
    rank: 4,
    nome: 'Uruguai',
    bandeira: 'América do Sul',
    custo: 6, mobilidade: 8, segJuridica: 10, tributacao: 9, cripto: 7,
    total: 78,
    perfilIdeal: 'Família que prioriza estabilidade institucional e qualidade de vida sobre custo.',
    fortes: 'Democracia mais sólida da América Latina, tax holiday de 11 anos, sem CFC, banco local sólido.',
    fracos: 'Custo de vida moderado-alto, mercado pequeno, banking local conservador com cripto.',
    custoVida: 'USD 2.500 a 4.500/mês',
    caminhoEntrada: 'Residência fiscal por investimento (USD 525 mil em imóvel) ou renda comprovada.',
  },
  {
    rank: 5,
    nome: 'Panamá',
    bandeira: 'América Central',
    custo: 7, mobilidade: 7, segJuridica: 8, tributacao: 9, cripto: 7,
    total: 77,
    perfilIdeal: 'Empresário com necessidade de offshore + residência integrados.',
    fortes: 'Regime territorial, hub financeiro reconhecido, dolarização (USD oficial), Friendly Nations Visa acessível.',
    fracos: 'Pressão internacional após Panama Papers, banking fica mais restritivo a cada ano, custo médio.',
    custoVida: 'USD 1.800 a 3.500/mês',
    caminhoEntrada: 'Friendly Nations Visa (depósito + atividade econômica) ou Pensionado.',
  },
  {
    rank: 6,
    nome: 'Geórgia',
    bandeira: 'Cáucaso/Europa',
    custo: 9, mobilidade: 7, segJuridica: 8, tributacao: 10, cripto: 7,
    total: 76,
    perfilIdeal: 'Nômade digital ou trader de cripto com baixo capital buscando Europa.',
    fortes: 'Visto de turismo de 1 ano para brasileiros, conta bancária aberta no mesmo dia, regime territorial HNWI, baixíssimo custo.',
    fracos: 'Tensão geopolítica com Rússia, mobilidade do passaporte média (115 países), idioma e alfabeto desafiadores.',
    custoVida: 'USD 1.000 a 2.500/mês',
    caminhoEntrada: 'Entrada turística + extensão, programa HNWI por patrimônio comprovado.',
  },
  {
    rank: 7,
    nome: 'Portugal',
    bandeira: 'Europa (UE)',
    custo: 5, mobilidade: 10, segJuridica: 9, tributacao: 5, cripto: 7,
    total: 73,
    perfilIdeal: 'Quem prioriza acesso à União Europeia e tem cidadania como objetivo final.',
    fortes: 'Passaporte UE pós-naturalização (top 3 mundial), CPLP acelera para 3 anos, cultura próxima ao Brasil.',
    fracos: 'NHR encerrado em 2024, IFICI mais restrito, golden visa imobiliário extinto, custo de vida em alta.',
    custoVida: 'USD 2.500 a 5.000/mês',
    caminhoEntrada: 'Visto D7 (renda passiva), D8 (nômade digital), D2 (empreendedor) ou Golden Visa via fundos.',
  },
  {
    rank: 8,
    nome: 'Malásia',
    bandeira: 'Sudeste Asiático',
    custo: 8, mobilidade: 8, segJuridica: 7, tributacao: 9, cripto: 6,
    total: 71,
    perfilIdeal: 'Aposentado ou rentista que quer base asiática com inglês falado.',
    fortes: 'Regime territorial, programa MM2H consolidado, infraestrutura moderna, inglês como segunda língua oficial.',
    fracos: 'Requisitos do MM2H endurecidos em 2024 (depósito alto), banking conservador com cripto, instabilidade política periódica.',
    custoVida: 'USD 1.500 a 3.500/mês',
    caminhoEntrada: 'Malaysia My Second Home (MM2H) com depósito bancário e renda comprovada.',
  },
  {
    rank: 9,
    nome: 'Suíça',
    bandeira: 'Europa',
    custo: 1, mobilidade: 10, segJuridica: 10, tributacao: 4, cripto: 9,
    total: 70,
    perfilIdeal: 'Patrimônio elevado que prioriza preservação total e jurisdição neutra.',
    fortes: 'Estabilidade absoluta, banking de elite, regulação cripto avançada (Crypto Valley em Zug), passaporte top.',
    fracos: 'Custo de vida proibitivo, residência por lump-sum exige patrimônio alto, naturalização em 10 anos.',
    custoVida: 'USD 5.000 a 12.000/mês',
    caminhoEntrada: 'Lump-sum taxation (acordo fiscal cantonal), visto de trabalho qualificado, ou investimento alto.',
  },
  {
    rank: 10,
    nome: 'Singapura',
    bandeira: 'Sudeste Asiático',
    custo: 2, mobilidade: 10, segJuridica: 10, tributacao: 7, cripto: 8,
    total: 70,
    perfilIdeal: 'Empresário tech ou family office com necessidade de hub asiático premium.',
    fortes: 'Estado de direito impecável, regulação cripto via MAS, hub financeiro asiático, passaporte mais forte do mundo.',
    fracos: 'Custo de vida absurdo, residência permanente extremamente seletiva, controle social rígido.',
    custoVida: 'USD 4.500 a 10.000/mês',
    caminhoEntrada: 'EntrePass (empreendedor), Tech.Pass, ou Global Investor Programme (SGD 10M+).',
  },
];

const CRITERIOS = [
  {
    icon: Banknote,
    titulo: 'Custo total de entrada',
    peso: '20%',
    descricao: 'Soma de todos os custos: visto, advogado, depósito bancário, investimento mínimo, taxas governamentais e custo de vida no primeiro ano. Mede acessibilidade real, não promessa de marketing.',
  },
  {
    icon: Plane,
    titulo: 'Mobilidade do passaporte',
    peso: '20%',
    descricao: 'Quantos países o documento final acessa sem visto, quanto tempo até obter cidadania (se aplicável), e se o caminho de naturalização é viável ou apenas teórico.',
  },
  {
    icon: Scale,
    titulo: 'Segurança jurídica',
    peso: '20%',
    descricao: 'Estabilidade institucional, força do Estado de Direito, histórico de respeito a contratos com estrangeiros, ausência de mudanças retroativas em programas de residência.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Eficiência tributária',
    peso: '20%',
    descricao: 'Regime territorial vs. mundial, presença de CFC, tratado de bitributação com Brasil, isenções para holding longo, custo efetivo da carga tributária total.',
  },
  {
    icon: Bitcoin,
    titulo: 'Abertura cripto',
    peso: '20%',
    descricao: 'Existência de regulação clara para Bitcoin, banking que aceita transações cripto sem fechamento de conta, ambiente cultural pró-soberania financeira.',
  },
];

const ARMADILHAS = [
  {
    titulo: 'Escolher por preço, sofrer por décadas',
    detalhe: 'Paraguai é barato e funciona, mas se sua estratégia exige acesso UE, vai precisar repetir todo o processo em Portugal. Pense em 10 anos, não em 10 meses.',
  },
  {
    titulo: 'Acreditar em ranking de "passaporte mais forte"',
    detalhe: 'Henley Index mede acesso visa-free. Não mede tributação, segurança patrimonial nem facilidade real de obter. Singapura é top 1 e impossível para 99% das pessoas.',
  },
  {
    titulo: 'Não checar se sua cripto entra na conta local',
    detalhe: 'Banco de Portugal já fechou contas de Bitcoiners brasileiros. Banco de Dubai exige source of wealth detalhado para depósitos cripto. Verifique antes de mudar, não depois.',
  },
  {
    titulo: 'Ignorar o tratado de bitributação',
    detalhe: 'Sem tratado, você pode pagar imposto duas vezes durante a transição. Brasil tem tratado com Portugal, Itália, Argentina, Espanha, Emirados, mas não com Paraguai, Caribe, Geórgia.',
  },
  {
    titulo: 'Comprar imóvel em programa que mudou as regras',
    detalhe: 'Portugal extinguiu o Golden Visa imobiliário em 2023. Malta encerrou o CBI em 2025. Quem comprou pensando em cidadania ficou com imóvel sem benefício migratório.',
  },
  {
    titulo: 'Subestimar o impacto cultural e familiar',
    detalhe: 'Mudar país com filhos pequenos é diferente de mudar solteiro. Idioma, escola, rede social. Países latinos (Paraguai, Uruguai, Argentina) reduzem fricção. Asia é desafio.',
  },
];

const FAQ = [
  {
    q: 'Qual o melhor país para residência fiscal de Bitcoiner?',
    a: 'Não existe "melhor" universal. Para Bitcoiner com baixo capital e urgência: Paraguai. Para Bitcoiner profissional com banking premium: Emirados (Dubai). Para Bitcoiner ideológico: El Salvador. Para acesso UE: Portugal. Para preservação patrimonial máxima: Suíça. A escolha depende do seu perfil de capital, mobilidade desejada e tolerância cultural.',
  },
  {
    q: 'Posso ter residência fiscal em mais de um país?',
    a: 'Em tese, sim. Na prática, gera complexidade enorme. Cada país aplica seus critérios (183 dias, centro de interesses vitais, domicílio físico). Tratados de bitributação resolvem conflitos via "tie-breaker rules", mas um auditor agressivo pode contestar. Recomendação: uma residência fiscal clara, com domicílio físico real, e residências secundárias apenas para acesso operacional.',
  },
  {
    q: 'Paraguai vale a pena mesmo com passaporte fraco?',
    a: 'Vale para a maioria. O passaporte paraguaio acessa 147 países sem visto (incluindo todo Mercosul, Schengen, Reino Unido, Japão, Coreia do Sul). A força real do Paraguai é o regime tributário territorial puro, custo de entrada baixíssimo e proximidade física com o Brasil. Para quem quer segunda residência fiscal sem queimar capital, é a melhor relação custo-benefício do hemisfério.',
  },
  {
    q: 'Dubai realmente não tem nenhum imposto?',
    a: 'Não há imposto de renda pessoal, isso é verdade. Mas há corporate tax de 9% para empresas com lucro acima de AED 375 mil (USD 102 mil) desde 2023. VAT de 5% sobre consumo. Custos altos com housing, transporte e serviços compensam parte do "zero imposto". Ainda assim, para Bitcoiner com renda externa e operação cripto profissional, Dubai segue imbatível em eficiência tributária.',
  },
  {
    q: 'El Salvador é seguro? E a violência?',
    a: 'A política do Bukele reduziu drasticamente a violência desde 2022, com taxa de homicídios atual menor que vários estados brasileiros. Bairros como Santa Tecla, Antiguo Cuscatlán e Surf City (El Zonte) são seguros para estrangeiros. O risco principal não é mais segurança pessoal, é a dependência da figura presidencial e a possibilidade de mudança política após o mandato.',
  },
  {
    q: 'Portugal acabou ou ainda compensa?',
    a: 'O regime perdeu muito da atratividade após 2024 (NHR extinto, IFICI mais restrito, Golden Visa imobiliário encerrado). Ainda compensa para quem quer cidadania UE no longo prazo (5 anos via residência ou 3 via CPLP), tem renda passiva qualificada para D7, ou usa o Golden Visa via fundos. Para residência fiscal pura otimizada, há opções melhores hoje (Paraguai, Emirados).',
  },
  {
    q: 'O que é "tax holiday" do Uruguai?',
    a: 'Regime que isenta novos residentes fiscais uruguaios do imposto sobre renda externa por 11 anos consecutivos. Após esse período, o regime territorial padrão se aplica (renda externa segue parcialmente isenta sob certas condições). É um dos benefícios mais agressivos do mundo para quem busca preservação patrimonial estável e democrática.',
  },
  {
    q: 'Por onde começar se nunca saí do Brasil?',
    a: 'Três passos: (1) Tire o passaporte brasileiro (se ainda não tem) e visite presencialmente 2 países da sua lista curta antes de decidir. (2) Estude o tratado de bitributação Brasil-país-alvo no site da Receita Federal. (3) Leia o guia de Residência Fiscal e Segundo Passaporte deste hub para entender a sequência de bandeiras. Não escolha jurisdição por TikTok ou influencer.',
  },
];

export default function JurisdicoesAmigaveis() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/jurisdicoes-amigaveis"
        custom={{
          title: 'Jurisdições Amigáveis: Ranking 2026 dos 10 Melhores Países',
          description: 'Ranking objetivo dos 10 melhores países para residência fiscal e segunda bandeira em 2026: Paraguai, Dubai, El Salvador, Uruguai, Portugal, Geórgia. Critérios e custos reais.',
          canonical: 'https://lordjunnior.com.br/saida/jurisdicoes-amigaveis',
          primaryKeyword: 'jurisdições amigáveis',
          lsiKeywords: ['melhores países para residência fiscal', 'ranking jurisdições 2026', 'paraíso fiscal Bitcoin', 'paraguai vs uruguai', 'dubai golden visa', 'el salvador bitcoin'],
          longTailKeywords: ['melhor país para residência fiscal brasileiro 2026', 'jurisdições amigáveis bitcoin', 'comparativo paraguai uruguai panama', 'morar em dubai como bitcoiner'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Jurisdições Amigáveis', url: '/saida/jurisdicoes-amigaveis' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: ['/saida', '/saida/segundo-passaporte', '/saida/residencia-fiscal', '/teoria-das-bandeiras', '/palau-digital-residency'],
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
          phase="Saída · Cartografia Soberana"
          title={
            <>
              Jurisdições amigáveis:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o ranking sem hipocrisia</span>
            </>
          }
          subtitle="Dez países, cinco critérios objetivos, zero conversa de marketing. O ranking real de para onde ir em 2026 quando o objetivo é soberania, não fuga emocional. Custos auditáveis, prazos reais e armadilhas que ninguém posta no Instagram."
          icon={Trophy}
          accentColor="amber"
          backLink="/saida"
          backLabel="Saída & Infraestrutura"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Não existe melhor país.{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">Existe melhor para você.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                Toda lista que afirma "o melhor país para morar" está vendendo alguma coisa. Imóvel em Lisboa, consultoria em Dubai, curso de "blueprint internacional". A verdade é que a melhor jurisdição depende do seu perfil de capital, da sua urgência, da sua estratégia de longo prazo e da tolerância cultural da sua família.
              </p>
              <p>
                Este ranking foi montado com cinco critérios objetivos, cada um valendo 20% do score final: custo total de entrada, mobilidade do passaporte, segurança jurídica, eficiência tributária e abertura cripto. Cada país recebe nota de 1 a 10 em cada critério. Soma simples. Sem opinião editorial, sem patrocínio, sem afiliado.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                A bandeira certa é a que sua vida real consegue carregar por dez anos.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — CRITÉRIOS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Os cinco critérios{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">do ranking.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mt-5 text-base leading-relaxed font-light">
              Cada critério vale 20% da nota final. Score de 0 a 100. Países classificados objetivamente, sem patrocínio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {CRITERIOS.map((c, i) => (
              <motion.div
                key={c.titulo}
                {...fade(i * 0.05)}
                className="group relative overflow-hidden rounded-sm border border-amber-500/15 bg-stone-950/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <span aria-hidden className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded bg-amber-500/[0.08] border border-amber-500/20">
                    <c.icon size={18} className="text-amber-400" />
                  </div>
                  <span className="font-mono text-xs text-amber-400 font-bold">{c.peso}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-stone-100 leading-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {c.titulo}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{c.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM PARAGUAI */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgParaguai}
              alt="Vista aérea cinematográfica de Assunção no Paraguai ao entardecer com rio Paraguai em primeiro plano, palmeiras e silhueta de prédios baixos sob luz dourada, representando jurisdição latina acessível para residência fiscal."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Paraguai · Score 84</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Onde a soberania custa menos do que o aluguel de um apartamento em Pinheiros.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — RANKING */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O ranking,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">dez posições reais.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Ordenados por score total. Notas de 1 a 10 por critério. Empates desempatados pelo critério de eficiência tributária.
            </p>
          </motion.div>

          <div className="space-y-4">
            {PAISES.map((p, i) => (
              <motion.div
                key={p.nome}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-amber-500/30 hover:bg-stone-950/80 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-5 md:gap-6 items-start">
                  {/* RANK + NOME */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-5xl md:text-6xl font-black text-amber-400/90 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {String(p.rank).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-stone-100 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {p.nome}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 mt-1 block">{p.bandeira}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{p.total}</span>
                      <span className="text-xs font-mono text-stone-500 uppercase tracking-[0.2em]">/100</span>
                    </div>
                  </div>

                  {/* SCORES */}
                  <div className="md:col-span-3 space-y-1.5">
                    {[
                      { label: 'Custo', v: p.custo },
                      { label: 'Mobilidade', v: p.mobilidade },
                      { label: 'Seg. Jurídica', v: p.segJuridica },
                      { label: 'Tributação', v: p.tributacao },
                      { label: 'Cripto', v: p.cripto },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2 text-[11px]">
                        <span className="text-stone-500 font-mono uppercase tracking-wider w-24 shrink-0">{s.label}</span>
                        <div className="flex-1 h-1 bg-stone-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${s.v * 10}%` }} />
                        </div>
                        <span className="text-stone-300 font-mono font-bold w-6 text-right">{s.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* DETALHES */}
                  <div className="md:col-span-6 space-y-3">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Perfil ideal</p>
                      <p className="text-stone-200 text-sm leading-relaxed font-light italic">{p.perfilIdeal}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400/80 mb-1">Pontos fortes</p>
                        <p className="text-stone-300 text-xs leading-relaxed font-light">{p.fortes}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400/80 mb-1">Pontos fracos</p>
                        <p className="text-stone-300 text-xs leading-relaxed font-light">{p.fracos}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-stone-800">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Custo de vida</p>
                        <p className="text-stone-100 text-sm font-semibold">{p.custoVida}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Caminho de entrada</p>
                        <p className="text-stone-300 text-xs leading-relaxed">{p.caminhoEntrada}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM DUBAI */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[440px] md:h-[560px] border border-stone-900">
            <img
              src={imgDubai}
              alt="Skyline noturno cinematográfico de Dubai Marina nos Emirados Árabes Unidos com arranha-céus iluminados refletindo na água calma sob céu azul profundo, representando jurisdição premium para Bitcoiners profissionais."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.25) 55%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Dubai · Score 82</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Capital, regulação cripto madura e zero imposto pessoal. O preço é o aluguel.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — MATRIZ DE DECISÃO */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Matriz de decisão{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">por perfil.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light mt-4">
              Em vez de "qual o melhor país", pergunte: qual encaixa no meu perfil? Use a tabela abaixo como ponto de partida, depois aprofunde nas páginas específicas.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              { perfil: 'Capital baixo (até R$ 80 mil), urgência, tolerância latina', resposta: 'Paraguai. Residência permanente em 90 dias, sem CFC, custo absurdamente baixo.' },
              { perfil: 'Bitcoiner profissional com volume, banking premium, ambiente de trabalho global', resposta: 'Emirados (Dubai). Zero imposto pessoal, regulação VARA, hub aéreo mundial.' },
              { perfil: 'Bitcoiner ideológico, vida simples, comunidade Bitcoin', resposta: 'El Salvador. Bitcoin como moeda legal, Freedom Visa por 1 BTC reembolsável.' },
              { perfil: 'Família com filhos, prioridade em estabilidade institucional', resposta: 'Uruguai. Tax holiday de 11 anos, democracia mais sólida da América Latina.' },
              { perfil: 'Empresário com necessidade de offshore + residência integrados', resposta: 'Panamá. Friendly Nations Visa, dolarização, hub financeiro reconhecido.' },
              { perfil: 'Nômade digital trader cripto com baixo capital, foco europeu', resposta: 'Geórgia. Conta bancária aberta no dia, regime HNWI, custo baixíssimo.' },
              { perfil: 'Quer cidadania UE no longo prazo, valoriza acesso Schengen', resposta: 'Portugal. Visto D7 ou D8, naturalização em 5 anos, em 3 via CPLP.' },
              { perfil: 'Aposentado ou rentista buscando base asiática com inglês', resposta: 'Malásia. Programa MM2H consolidado, regime territorial, infraestrutura moderna.' },
              { perfil: 'Patrimônio elevado (8+ dígitos USD), preservação total prioritária', resposta: 'Suíça ou Singapura. Banking de elite, jurisdições neutras, estado de direito impecável.' },
            ].map((linha, i) => (
              <motion.div key={i} {...fade(i * 0.03)} className="grid md:grid-cols-12 gap-4 p-5 rounded-sm border border-stone-800 bg-stone-950/40 hover:border-amber-500/25 transition-colors">
                <div className="md:col-span-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Se você é</p>
                  <p className="text-stone-200 text-sm md:text-base leading-relaxed font-light">{linha.perfil}</p>
                </div>
                <div className="md:col-span-7 md:border-l md:border-stone-800 md:pl-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400/80 mb-1">Sua bandeira</p>
                  <p className="text-stone-100 text-sm md:text-base leading-relaxed font-medium">{linha.resposta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 5 — ARMADILHAS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-red-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis armadilhas{' '}
              <span className="italic font-serif text-red-400 font-light normal-case tracking-tight">que custam anos de vida.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARMADILHAS.map((arm, i) => (
              <motion.div
                key={arm.titulo}
                {...fade(i * 0.04)}
                className="rounded-sm border border-red-500/15 bg-stone-950/60 p-6 hover:border-red-500/35 transition-all duration-500"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-stone-100 leading-snug">{arm.titulo}</h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{arm.detalhe}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 6 — CHECKLIST */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 06</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Checklist de{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">escolha em 30 dias.</span>
            </h2>

            <div className="space-y-4">
              {[
                'Definir perfil real: capital disponível (em USD), prazo desejado, presença ou não de família em deslocamento.',
                'Listar 3 países da matriz de decisão compatíveis com o perfil. Eliminar emocionalmente, ranquear por critérios.',
                'Estudar tratado de bitributação Brasil-país-alvo no site oficial da Receita Federal (gov.br/receitafederal).',
                'Visitar presencialmente os 2 finalistas, mínimo 14 dias cada, fora de temporada turística.',
                'Conversar com 3 brasileiros que já residem no país-alvo há mais de 2 anos (não influencer pago).',
                'Validar acesso bancário cripto: testar abertura de conta com declaração de fonte de renda em Bitcoin.',
                'Orçar advogado tributarista local credenciado na ordem do país (não despachante intermediário).',
                'Calcular custo total realista: visto + advogado + 12 meses de vida + traduções + emergência (mínimo USD 30 mil).',
                'Decidir e comprometer prazo: data de visto, data de saída do Brasil, data de DSD.',
                'Iniciar a Bandeira 01 (Segundo Passaporte) e Bandeira 02 (Residência Fiscal) em paralelo.',
              ].map((item, i) => (
                <motion.div key={i} {...fade(i * 0.03)} className="flex items-start gap-4 p-4 rounded-sm border border-stone-800 bg-stone-950/40 hover:border-amber-500/25 transition-colors">
                  <div className="shrink-0 w-7 h-7 rounded-full border border-amber-500/40 bg-amber-500/[0.06] flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-stone-200 text-sm md:text-base leading-relaxed font-light pt-0.5">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="text-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Dúvidas operacionais</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Perguntas{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que separam quem age de quem só assiste.</span>
            </h2>
          </motion.div>

          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <motion.div key={i} {...fade(i * 0.03)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left rounded-sm border border-stone-800 bg-stone-950/60 hover:border-amber-500/30 transition-all p-5 md:p-6 flex items-start justify-between gap-4 group"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-stone-100 text-base md:text-lg font-semibold leading-snug pr-4">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-amber-400 shrink-0 mt-1 transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4, ease: APPLE_EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 py-5 text-stone-300 text-base leading-relaxed font-light border-l-2 border-amber-500/40 ml-2 mt-2">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FECHAMENTO */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
          <motion.div {...fade(0)}>
            <Compass size={32} className="text-amber-400/70 mx-auto mb-6" />
            <p className="text-stone-200 text-xl md:text-2xl italic font-serif font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              País não se escolhe por sentimento. Se escolhe por matemática, por estratégia, por custo de oportunidade ao longo de uma década inteira.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/saida/segundo-passaporte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold text-sm uppercase tracking-[0.2em] hover:bg-amber-400 transition-colors"
              >
                Bandeira 01: Passaporte <ArrowRight size={14} />
              </Link>
              <Link
                to="/saida/residencia-fiscal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-200 font-bold text-sm uppercase tracking-[0.2em] hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                Bandeira 02: Residência Fiscal
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
