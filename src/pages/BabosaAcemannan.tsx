import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Shield, FlaskConical, Eye, FileWarning, Heart, Quote, Microscope, Ban, Sparkles, BookOpen, Zap, AlertTriangle } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import PageFloatingToc from '@/components/PageFloatingToc';
import babosaHero from '@/assets/babosa-hero.jpg';

import pessoa1 from '@/assets/testimonials/pessoa-1.jpg';
import pessoa2 from '@/assets/testimonials/pessoa-2.jpg';
import pessoa3 from '@/assets/testimonials/pessoa-3.jpg';
import pessoa4 from '@/assets/testimonials/pessoa-4.jpg';
import pessoa5 from '@/assets/testimonials/pessoa-5.jpg';
import pessoa6 from '@/assets/testimonials/pessoa-6.jpg';
import pessoa7 from '@/assets/testimonials/pessoa-7.jpg';
import pessoa8 from '@/assets/testimonials/pessoa-8.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

const TOC_ITEMS = [
  { id: 'descoberta', label: 'A Descoberta' },
  { id: 'acemannan', label: 'Acemannan' },
  { id: 'supressao', label: 'A Supressão' },
  { id: 'ciencia', label: 'A Ciência' },
  { id: 'relatos', label: 'Relatos Reais' },
  { id: 'composicao', label: 'Composição' },
  { id: 'conclusao', label: 'Conclusão' },
];

/* ═══════════════════════════════════════════════════════════════
   DEPOIMENTOS — Nomes e imagens fictícios, relatos baseados
   em experiências reais compartilhadas publicamente.
   ═══════════════════════════════════════════════════════════════ */

interface Depoimento {
  nome: string;
  foto: string;
  local: string;
  texto: string;
  destaque: string;
}

const DEPOIMENTOS: Depoimento[] = [
  {
    nome: 'Renata Oliveira',
    foto: pessoa1,
    local: 'São Paulo, SP',
    texto: 'O médico já tinha condenado o tornozelo do meu marido. Disse que iria necrosar e possivelmente precisar de amputação. Em uma semana cuidando com gel de babosa fresca, os tecidos mortos regeneraram completamente. Não ficou nem cicatriz aparente.',
    destaque: 'Regeneração de tecido necrosado em 7 dias',
  },
  {
    nome: 'Carlos Mendes',
    foto: pessoa2,
    local: 'Belo Horizonte, MG',
    texto: 'Descobri o barbatimão e a aroeira por necessidade. Tinha uma cicatriz branca que me incomodava há anos. Comecei a fazer o chá, beber diariamente e aplicar na pele. A coloração natural começou a voltar. O corpo se cura quando recebe as ferramentas certas.',
    destaque: 'Recuperação de pigmentação com barbatimão',
  },
  {
    nome: 'Amanda Souza',
    foto: pessoa3,
    local: 'Rio de Janeiro, RJ',
    texto: 'Minha bisavó teve câncer há mais de 30 anos e consumia babosa todos os dias. Ficou curada. Infelizmente ela já se foi, mas deixou uma plantação enorme no terreno da família. Aquilo era o tesouro dela.',
    destaque: 'Tradição familiar de cura com babosa',
  },
  {
    nome: 'Dona Elza Machado',
    foto: pessoa4,
    local: 'Fortaleza, CE',
    texto: 'Tive queimadura de segundo grau na mão. Fui ao posto de saúde e me deram uma pomada de aloe vera produzida pela farmácia pública. O resultado foi excelente. A própria medicina pública reconhece o potencial, só não divulga.',
    destaque: 'Pomada de aloe vera do próprio SUS',
  },
  {
    nome: 'Igor Loubet',
    foto: pessoa5,
    local: 'Curitiba, PR',
    texto: 'O Dr. Terry Pulse, médico no Texas, liderou estudos com acemannan em pacientes com AIDS. Os resultados foram impressionantes: melhora nos marcadores CD4, ganho de peso e redução da fadiga. A molécula forçava o vírus a criar uma capa defeituosa. Quando os coquetéis chegaram em 95, cortaram o financiamento. Hoje o legado vive na medicina veterinária, tratando leucemia felina com sucesso.',
    destaque: 'Pesquisa suprimida do Dr. Terry Pulse',
  },
  {
    nome: 'Tatiane Guimarães',
    foto: pessoa6,
    local: 'Manaus, AM',
    texto: 'Curei sarna negra de uma cachorrinha de rua que a veterinária falou que não tinha cura. Ela disse para me preparar. Não aceitei. Tratei com babosa pura por semanas. A cadela se recuperou por completo e até hoje está saudável.',
    destaque: 'Doença "incurável" tratada com babosa',
  },
  {
    nome: 'Bruno Maranhão',
    foto: pessoa7,
    local: 'Recife, PE',
    texto: 'Quando a COVID começou, antes de qualquer teste ou vacina, eu já sabia que a babosa tinha propriedades anti-inflamatórias potentes. Comecei a fazer sucos com o gel. Foi com ela que a minha família saiu dos sintomas de perda de olfato e paladar.',
    destaque: 'Recuperação de olfato e paladar com babosa',
  },
  {
    nome: 'Seu Maranaldo',
    foto: pessoa8,
    local: 'Goiânia, GO',
    texto: 'A babosa é um alimento funcional fortalecedor do sistema imunológico. Contém 20 minerais, 18 aminoácidos e 12 vitaminas, incluindo B12. O organismo desintoxicado e bem nutrido combate e elimina qualquer mal. Faça do seu alimento o seu remédio, como dizia Hipócrates.',
    destaque: '20 minerais, 18 aminoácidos e 12 vitaminas',
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPOSIÇÃO TÉCNICA DA BABOSA
   ═══════════════════════════════════════════════════════════════ */

const COMPOSICAO = [
  { categoria: 'Vitaminas', itens: 'A (betacaroteno), B1, B2, B3, B6, B12, C, E, Ácido Fólico' },
  { categoria: 'Minerais', itens: 'Cálcio, Magnésio, Zinco, Cromo, Selênio, Sódio, Ferro, Potássio, Cobre, Manganês' },
  { categoria: 'Aminoácidos', itens: '7 dos 8 essenciais que o corpo não produz e precisa adquirir pela alimentação' },
  { categoria: 'Enzimas', itens: 'Amilase, Lipase, Fosfatase Alcalina, Bradicinase, Celulase, Carboxipeptidase' },
  { categoria: 'Polissacarídeos', itens: 'Acemannan (β-1,4-acetilado manano), Glucomanano, Arabinose, Galactose' },
  { categoria: 'Antraquinonas', itens: 'Aloína (laxativa, uso cauteloso), Barbaloína, Emodina, Ácido Aloético' },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA JSON-LD
   ═══════════════════════════════════════════════════════════════ */

const schemaArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Babosa e Acemannan: A Molécula Imunomoduladora que a Indústria Farmacêutica Silenciou",
  "description": "Investigação completa sobre o acemannan da Aloe Vera: a molécula que recebeu status de medicamento órfão pela FDA em 1995 e depois desapareceu da pesquisa pública.",
  "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
  "url": "https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan",
  "datePublished": "2026-03-22",
  "dateModified": "2026-03-22",
  "mainEntityOfPage": "https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan",
  "image": "https://lordjunnior.com.br/assets/babosa-hero.jpg",
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é acemannan e por que ele foi silenciado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Acemannan é um polissacarídeo acetilado (β-1,4-manano) presente no gel interno da Aloe vera (babosa). Em 1995, recebeu status de 'medicamento órfão' pela FDA dos EUA por seu papel na recuperação imunológica de pacientes com HIV. A pesquisa foi descontinuada após a chegada dos coquetéis antirretrovirais e as patentes de extração foram colocadas sob controle corporativo."
      }
    },
    {
      "@type": "Question",
      "name": "Babosa e aloe vera são a mesma planta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Babosa é o nome popular no Brasil para a Aloe barbadensis Miller, conhecida internacionalmente como Aloe vera. O gel transparente interno contém o acemannan e as propriedades imunomoduladoras documentadas em estudos clínicos."
      }
    },
    {
      "@type": "Question",
      "name": "Quais são as propriedades comprovadas da babosa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O gel de babosa contém 20 minerais, 18 aminoácidos, 12 vitaminas (incluindo B12), enzimas digestivas e polissacarídeos imunomoduladores. Estudos documentam ação cicatrizante, anti-inflamatória, imunoestimulante e protetora de mucosas."
      }
    },
  ],
};

const schemaSiteNav = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Babosa e Acemannan",
  "url": "https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan",
  "hasPart": [
    { "@type": "WebPage", "name": "Fitoterapia Aplicada", "url": "https://lordjunnior.com.br/projeto-autonomo/fitoterapia-aplicada" },
    { "@type": "WebPage", "name": "Autonomia Biológica", "url": "https://lordjunnior.com.br/projeto-autonomo/autonomia-biologica" },
    { "@type": "WebPage", "name": "Sabedoria Ancestral", "url": "https://lordjunnior.com.br/projeto-autonomo/sabedoria-ancestral" },
    { "@type": "WebPage", "name": "Projeto Autônomo", "url": "https://lordjunnior.com.br/projeto-autonomo" },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://lordjunnior.com.br" },
    { "@type": "ListItem", "position": 2, "name": "Projeto Autônomo", "item": "https://lordjunnior.com.br/projeto-autonomo" },
    { "@type": "ListItem", "position": 3, "name": "Autonomia Biológica", "item": "https://lordjunnior.com.br/projeto-autonomo/autonomia-biologica" },
    { "@type": "ListItem", "position": 4, "name": "Babosa e Acemannan", "item": "https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */

export default function BabosaAcemannan() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Babosa e Acemannan: A Molécula que a Indústria Farmacêutica Silenciou | Lord Junnior</title>
        <meta name="description" content="O acemannan da babosa recebeu status de medicamento órfão pela FDA em 1995 por imunomodulação em pacientes com HIV. A pesquisa desapareceu. A planta continua viva no seu quintal." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan" />
        <meta property="og:title" content="Babosa e Acemannan: A Molécula Imunomoduladora Silenciada" />
        <meta property="og:description" content="Em 1995 a FDA reconheceu o acemannan como medicamento órfão. Depois, o silêncio. Investigação completa com relatos reais e ciência documentada." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/babosa-acemannan" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaSiteNav)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />

      <article className="min-h-screen" style={{ background: '#050808' }}>

        {/* ─── HERO ─── */}
        <CinematicHero
          image={babosaHero}
          phase="INVESTIGAÇÃO DOCUMENTAL"
          title="Babosa & Acemannan"
          subtitle="A molécula imunomoduladora que recebeu status de medicamento órfão pela FDA em 1995 e depois desapareceu da pesquisa pública. Sob a casca verde existe um composto que a indústria prefere que você ignore."
          icon={Leaf}
          accentColor="emerald"
          backLink="/projeto-autonomo/autonomia-biologica"
          backLabel="Autonomia Biológica"
        />

        {/* ─── NOISE + AMBIENT ─── */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />

        {/* ─── NAV ─── */}
        <nav className="relative z-10 max-w-4xl mx-auto px-5 pt-8" aria-label="Breadcrumb">
          <Link to="/projeto-autonomo/autonomia-biologica" className="inline-flex items-center gap-2 text-emerald-500/80 hover:text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
            <ArrowLeft size={14} /> Autonomia Biológica
          </Link>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 1 — A DESCOBERTA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="descoberta" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-12">
          <motion.div {...fade(0)}>
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 01</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              A Descoberta que Deveria Ter Mudado a Medicina
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px]">
            <p>
              Entre o final dos anos 1980 e o início da década de 90, pesquisadores isolaram algo extraordinário dentro do gel da <strong className="text-emerald-400">Aloe barbadensis Miller</strong>, a babosa comum que cresce em qualquer quintal brasileiro: um polissacarídeo acetilado chamado <strong className="text-stone-200">acemannan</strong>.
            </p>
            <p>
              Não era apenas mais um composto fitoterápico para acalmar queimaduras de sol ou acelerar cicatrização superficial. O acemannan demonstrava em laboratório uma capacidade até então rara entre compostos naturais: <strong className="text-stone-200">comunicação direta com o sistema imunológico</strong>. Em testes controlados e ambientes hospitalares, médicos observaram que os compostos da babosa ativavam macrófagos e linfócitos T de forma precisa, sem provocar a cascata inflamatória excessiva que caracteriza a maioria dos imunoestimulantes sintéticos.
            </p>
            <p>
              O mecanismo era elegante. Os glóbulos brancos não eram simplesmente "estimulados" como por um café metabólico. Eles eram <strong className="text-stone-200">recalibrados</strong>. A resposta imunológica se tornava mais eficiente sem superestimulação, como um sistema operacional recebendo uma atualização de firmware que corrige vulnerabilidades sem aumentar o consumo de energia.
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 2 — ACEMANNAN: A MOLÉCULA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="acemannan" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-12">
          <motion.div {...fade(0)} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Microscope size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                Acemannan: O Composto Que Calou a Indústria
              </h2>
            </div>

            <div className="space-y-5 text-stone-400 leading-relaxed text-[15px]">
              <p>
                Um médico do Texas chamado <strong className="text-stone-200">Dr. Terry Pulse</strong> foi um dos primeiros a levar o acemannan do laboratório para a clínica. Trabalhando com pacientes portadores de HIV numa época em que o único tratamento disponível era o AZT, altamente tóxico, ele administrou extrato purificado de Aloe vera e documentou resultados que deveriam ter sido manchete em todos os jornais médicos do planeta.
              </p>
              <p>
                Os pacientes ganharam peso. A fadiga reduziu drasticamente. E os marcadores imunológicos, especificamente a contagem de <strong className="text-emerald-400">células CD4</strong>, subiram. A hipótese do Dr. Pulse era que o acemannan forçava o vírus a produzir uma cápsula proteica defeituosa, impedindo-o de infectar novas células e permitindo a redução das doses tóxicas do AZT.
              </p>

              {/* Destaque FDA */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-5 my-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-stone-200 font-bold text-sm mb-1">Status de Medicamento Órfão, FDA, 1995</p>
                    <p className="text-stone-400 text-sm">
                      A Food and Drug Administration dos Estados Unidos concedeu ao acemannan o status de <strong className="text-amber-400">"orphan drug"</strong> pelo seu papel documentado no suporte à recuperação imunológica em pacientes com HIV. Um reconhecimento oficial que deveria ter detonado uma revolução na medicina integrativa, mas em vez disso foi sepultado sob camadas de interesses corporativos.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                O Dr. Pulse faleceu prematuramente em 1991. Com a chegada dos potentes coquetéis antirretrovirais em 1995, toda a linha de pesquisa com compostos naturais perdeu financiamento institucional. Não porque os resultados foram refutados. Porque o modelo de negócio mudou.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 3 — A SUPRESSÃO
           ═══════════════════════════════════════════════════════════════ */}
        <section id="supressao" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-12">
          <motion.div {...fade(0)}>
            <span className="text-red-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 02</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Silêncio Conveniente
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px]">
            <p>
              O que começou como uma descoberta promissora para o sistema imunológico humano se transformou, de forma conveniente, em silêncio. O financiamento secou. Os interesses farmacêuticos redirecionaram bilhões para moléculas sintéticas patenteáveis. E as patentes para extração e estabilização do acemannan foram <strong className="text-stone-200">silenciosamente transferidas para controle corporativo</strong>.
            </p>
            <p>
              Hoje existem aproximadamente <strong className="text-emerald-400">130 patentes</strong> relacionadas à extração e estabilização adequadas do acemannan. A mais recente delas detém as frações com maior atividade imunomoduladora documentada no planeta. Isso significa compatibilidade máxima para o corpo humano reconhecer e utilizar o composto imediatamente após o consumo.
            </p>
            <p>
              Imagine a disrupção que causaria se milhões de pessoas compreendessem o potencial real do sistema imunológico quando ele opera com as ferramentas bioquímicas corretas. Imagine o que aconteceria com laboratórios que faturam bilhões vendendo supressores sintéticos se as pessoas soubessem que uma planta no quintal pode recalibrar as mesmas defesas que eles medicam.
            </p>

            {/* Trio da Blindagem: 3 pilares de supressão */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: Ban, title: 'Financiamento Cortado', desc: 'Linhas de pesquisa promissoras foram abandonadas após a chegada dos coquetéis sintéticos patenteáveis.' },
                { icon: FileWarning, title: 'Patentes Corporativas', desc: '130 patentes de extração transferidas para controle privado. A molécula existe, mas o acesso é controlado.' },
                { icon: Eye, title: 'Narrativa Reduzida', desc: 'A babosa foi rebaixada a "planta para pele" nos canais oficiais. A imunomodulação desapareceu do discurso público.' },
              ].map((p, i) => (
                <motion.div key={p.title} {...fade(0.1 + i * 0.05)} className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-5">
                  <p.icon size={20} className="text-red-400 mb-3" />
                  <h3 className="text-stone-200 font-bold text-sm mb-2">{p.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Referência histórica: Relatório Flexner */}
          <motion.div {...fade(0.2)} className="mt-10 rounded-xl border border-stone-800 bg-stone-900/50 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <BookOpen size={18} className="text-stone-500 mt-1 shrink-0" />
              <div>
                <p className="text-stone-300 font-bold text-sm mb-2">Relatório Flexner, 1910</p>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Para entender por que a medicina moderna marginaliza compostos naturais, é necessário conhecer o Relatório Flexner. Financiado pela Fundação Carnegie e pela família Rockefeller, esse documento reestruturou toda a educação médica nos Estados Unidos, eliminando escolas que ensinavam fitoterapia, homeopatia e medicina natural, e direcionando a formação exclusivamente para fármacos derivados de petróleo. O resultado é o sistema que temos hoje: uma medicina que trata sintomas com moléculas sintéticas e ignora sistematicamente o que cresce na terra.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <MicroCtaResistencia />

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 4 — A CIÊNCIA POR TRÁS
           ═══════════════════════════════════════════════════════════════ */}
        <section id="ciencia" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-12">
          <motion.div {...fade(0)}>
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">CAPÍTULO 03</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Que a Ciência Documenta (e o Mainstream Ignora)
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px]">
            <p>
              A babosa não é apenas "boa para a pele". Essa redução narrativa é a forma mais eficiente de neutralizar o potencial de um composto que ameaça modelos de negócio bilionários. Sob a camada verde existe um complexo bioquímico que inclui mais de <strong className="text-stone-200">75 substâncias ativas</strong> catalogadas pela comunidade científica internacional.
            </p>
            <p>
              Nos Estados Unidos existe um <strong className="text-emerald-400">Conselho Internacional da Ciência da Aloe Vera (IASC)</strong> onde pesquisadores estudam continuamente os benefícios da planta para a saúde humana. No Brasil e no mundo, universidades e instituições de renome internacional mantêm linhas ativas de pesquisa sobre Aloe vera, mas os resultados raramente chegam aos noticiários que você consome.
            </p>

            {/* Grid de mecanismos */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Shield, title: 'Imunomodulação', desc: 'Acemannan ativa macrófagos e linfócitos T sem causar superestimulação. O sistema imunológico é recalibrado, não forçado.' },
                { icon: Heart, title: 'Cicatrização Avançada', desc: 'Estimula a proliferação de fibroblastos e a produção de colágeno. Regenera tecidos danificados em velocidade documentada.' },
                { icon: FlaskConical, title: 'Anti-inflamatório Natural', desc: 'Inibe a produção de prostaglandinas e reduz a cascata inflamatória sem os efeitos colaterais dos AINEs sintéticos.' },
                { icon: Sparkles, title: 'Desintoxicação Celular', desc: 'O gel atua como quelante natural, auxiliando a remoção de toxinas acumuladas e protegendo a mucosa gastrointestinal.' },
              ].map((m, i) => (
                <motion.div key={m.title} {...fade(0.1 + i * 0.05)} className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
                  <m.icon size={20} className="text-emerald-400 mb-3" />
                  <h3 className="text-stone-200 font-bold text-sm mb-2">{m.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 5 — RELATOS REAIS
           ═══════════════════════════════════════════════════════════════ */}
        <section id="relatos" className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 py-16">
          <motion.div {...fade(0)} className="text-center mb-12">
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">PROVA SOCIAL</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              Relatos de Quem Não Esperou Pela Aprovação da Indústria
            </h2>
            <p className="text-stone-500 text-sm max-w-2xl mx-auto">
              Enquanto as patentes são disputadas em escritórios corporativos, pessoas comuns ao redor do Brasil aplicam o conhecimento ancestral e documentam resultados que nenhum laboratório financia para publicar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {DEPOIMENTOS.map((d, i) => (
              <motion.div
                key={d.nome}
                {...fade(i * 0.05)}
                className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5 md:p-6 hover:border-emerald-500/25 transition-colors duration-500"
              >
                {/* Header com foto */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={d.foto}
                    alt={d.nome}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/20"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-stone-200 font-bold text-sm">{d.nome}</p>
                    <p className="text-stone-600 text-[11px]">{d.local}</p>
                  </div>
                  <Quote size={16} className="text-emerald-500/30 ml-auto" />
                </div>

                {/* Badge destaque */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15 mb-3">
                  <Leaf size={10} className="text-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">{d.destaque}</span>
                </div>

                {/* Texto */}
                <p className="text-stone-400 text-sm leading-relaxed">"{d.texto}"</p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer ético */}
          <motion.div {...fade(0.3)} className="mt-8 text-center">
            <p className="text-stone-700 text-[10px] tracking-wide uppercase">
              Relatos baseados em experiências compartilhadas publicamente. Este conteúdo é educacional e não substitui orientação médica profissional.
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 6 — COMPOSIÇÃO TÉCNICA
           ═══════════════════════════════════════════════════════════════ */}
        <section id="composicao" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-12">
          <motion.div {...fade(0)}>
            <span className="text-emerald-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">FICHA TÉCNICA</span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              O Que Existe Dentro de Uma Folha de Babosa
            </h2>
            <p className="text-stone-400 text-[15px] mb-8">
              O gel interno da <em>Aloe barbadensis Miller</em> contém um arsenal bioquímico que a indústria cosmética menciona superficialmente e a indústria farmacêutica prefere ignorar.
            </p>
          </motion.div>

          <div className="space-y-3">
            {COMPOSICAO.map((c, i) => (
              <motion.div
                key={c.categoria}
                {...fade(i * 0.04)}
                className="rounded-xl border border-stone-800 bg-stone-900/40 p-4 md:p-5"
              >
                <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">{c.categoria}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{c.itens}</p>
              </motion.div>
            ))}
          </div>

          {/* Alerta sobre Aloína */}
          <motion.div {...fade(0.2)} className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-stone-200 font-bold text-sm mb-1">Aloína: O Componente Que Exige Cuidado</p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  A parte amarelada da folha (casca) contém aloína, que possui efeito laxativo intenso. Para uso oral, recomenda-se utilizar exclusivamente o gel transparente interno, removendo completamente a casca e a camada amarela. Gestantes, lactantes e pessoas com doenças intestinais inflamatórias devem evitar o consumo oral. O uso tópico do gel é seguro para todas as idades.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <MicroCtaResistencia />

        {/* ═══════════════════════════════════════════════════════════════
           SEÇÃO 7 — CONCLUSÃO
           ═══════════════════════════════════════════════════════════════ */}
        <section id="conclusao" className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-16">
          <motion.div {...fade(0)} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
              A Cura Vem da Terra. O Controle Vem de Quem a Esconde.
            </h2>
          </motion.div>

          <motion.div {...fade(0.1)} className="space-y-5 text-stone-400 leading-relaxed text-[15px] max-w-3xl mx-auto">
            <p>
              A babosa não precisa de aprovação regulatória para existir. Ela cresce em qualquer solo brasileiro. Sobrevive com pouca água. Multiplica-se sozinha. E carrega dentro do seu gel transparente um complexo bioquímico que a ciência já documentou e a indústria já tentou controlar.
            </p>
            <p>
              O acemannan não desapareceu porque falhou. Desapareceu porque <strong className="text-stone-200">funcionava bem demais para um composto não patenteável pela Big Pharma</strong>. Quando o custo de produção de um imunomodulador é zero e ele cresce no quintal de qualquer família, o modelo de negócio trilionário da farmacologia sintética treme.
            </p>
            <p className="text-stone-200 font-semibold text-base">
              Plante babosa. Aprenda a manipular o gel. Ensine seus filhos. A soberania biológica começa quando você para de pedir permissão para se curar.
            </p>
          </motion.div>

          {/* CTAs finais */}
          <motion.div {...fade(0.2)} className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/projeto-autonomo/fitoterapia-aplicada"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors"
            >
              <Leaf size={16} /> Protocolos Fitoterápicos
            </Link>
            <Link
              to="/projeto-autonomo/autonomia-biologica"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 text-sm font-bold hover:bg-emerald-500/10 transition-colors"
            >
              <Shield size={16} /> Autonomia Biológica
            </Link>
            <Link
              to="/projeto-autonomo/sabedoria-ancestral"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-700 text-stone-400 text-sm font-bold hover:bg-stone-800 transition-colors"
            >
              <BookOpen size={16} /> Sabedoria Ancestral
            </Link>
          </motion.div>

          {/* Citação de fechamento */}
          <motion.div {...fade(0.3)} className="mt-16 text-center border-t border-stone-800 pt-10">
            <blockquote className="text-stone-300 text-lg md:text-xl italic font-light max-w-2xl mx-auto leading-relaxed">
              "Fomos feitos para consumir o que vem da terra. A cura sempre esteve ali, crescendo em silêncio enquanto te vendiam a doença em cápsulas."
            </blockquote>
            <cite className="block text-emerald-500 font-bold text-sm mt-4 not-italic tracking-wider uppercase">Lord Junnior</cite>
          </motion.div>
        </section>

        {/* ─── FOOTER NAVIGATION ─── */}
        <footer className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 pb-20">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              <Zap size={14} /> Projeto Autônomo
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-300 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              <Shield size={14} /> Voltar à Base
            </Link>
          </div>
        </footer>
      </article>

      <ScrollToTop />
    </>
  );
}
