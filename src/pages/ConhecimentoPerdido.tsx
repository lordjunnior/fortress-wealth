import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Shield, Heart, AlertTriangle, Brain, Flame, Droplets, Wind, Sun, BookOpen, Eye, Sprout, Activity, XCircle, CheckCircle2, Users, PenTool, FlaskConical, Package, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';

import imgHero from '@/assets/cp-hero-conhecimento.jpg';
import imgSistemas from '@/assets/cp-sistemas-corpo.jpg';
import imgPlantas from '@/assets/cp-plantas-pratica.jpg';
import imgFamilia from '@/assets/cp-educacao-familiar.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

/* ═══════════════════════════════════════════════════════════
   DADOS DAS PLANTAS — POR SISTEMA CORPORAL
═══════════════════════════════════════════════════════════ */

interface PlantaFicha {
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
}

const DIGESTIVO: PlantaFicha[] = [
  {
    nome: 'Boldo', cientifico: 'Peumus boldus', parteUsada: 'Folha',
    melhora: ['Sensação de estômago pesado', 'Digestão lenta', 'Desconforto após excesso alimentar'],
    comoAge: 'Estimula produção de bile, facilitando digestão de gorduras.',
    preparo: 'Infusão leve de 1 folha pequena em água quente por 5 a 10 minutos.',
    faixaSegura: 'Uso pontual, até 2 vezes ao dia por curto período.',
    contra: 'Gestantes, obstrução biliar, uso prolongado.',
    interacoes: 'Cautela com medicamentos hepáticos.',
    suspensao: 'Amarelamento da pele, dor abdominal intensa.',
    accent: 'text-green-400', border: 'border-green-500/30',
  },
  {
    nome: 'Hortelã', cientifico: 'Mentha sp.', parteUsada: 'Folha',
    melhora: ['Gases', 'Cólicas leves', 'Desconforto intestinal', 'Halitose'],
    comoAge: 'Mentol relaxa musculatura lisa intestinal, reduzindo espasmos.',
    preparo: 'Infusão de folhas frescas ou secas por 5 a 10 minutos.',
    faixaSegura: 'Uso moderado diário em adultos saudáveis.',
    contra: 'Refluxo severo pode piorar.',
    interacoes: null,
    suspensao: 'Piora do refluxo ou azia.',
    accent: 'text-teal-400', border: 'border-teal-500/30',
  },
  {
    nome: 'Espinheira-santa', cientifico: 'Maytenus ilicifolia', parteUsada: 'Folha',
    melhora: ['Azia leve', 'Desconforto gástrico'],
    comoAge: 'Reduz acidez gástrica e protege mucosa.',
    preparo: 'Infusão de 1 colher de sopa da folha seca por xícara.',
    faixaSegura: 'Uso temporário — até 7 dias.',
    contra: 'Gestantes.',
    interacoes: 'Cautela com antiácidos.',
    suspensao: 'Sem melhora após 5 dias, procurar avaliação.',
    accent: 'text-lime-400', border: 'border-lime-500/30',
  },
];

const RESPIRATORIO: PlantaFicha[] = [
  {
    nome: 'Guaco', cientifico: 'Mikania glomerata', parteUsada: 'Folha',
    melhora: ['Tosse produtiva', 'Congestão leve'],
    comoAge: 'Cumarina possui efeito broncodilatador leve e expectorante.',
    preparo: 'Infusão das folhas por 10 minutos.',
    faixaSegura: 'Uso curto — até 5 dias.',
    contra: 'Problemas hepáticos graves.',
    interacoes: 'Cautela com anticoagulantes.',
    suspensao: 'Tosse que piora ou persiste além de 7 dias.',
    accent: 'text-green-300', border: 'border-green-400/30',
  },
  {
    nome: 'Eucalipto', cientifico: 'Eucalyptus globulus', parteUsada: 'Folha (inalação)',
    melhora: ['Congestão nasal', 'Muco espesso'],
    comoAge: 'Óleo essencial auxilia fluidificação de secreções respiratórias.',
    preparo: 'Inalação com vapor — 3 a 5 folhas em água quente.',
    faixaSegura: 'Uso inalatório pontual.',
    contra: 'Não ingerir óleo essencial puro. Crianças menores de 2 anos.',
    interacoes: null,
    suspensao: 'Dificuldade respiratória ou irritação mucosa.',
    accent: 'text-cyan-400', border: 'border-cyan-500/30',
  },
  {
    nome: 'Capim-limão', cientifico: 'Cymbopogon citratus', parteUsada: 'Folha',
    melhora: ['Sintomas leves de resfriado', 'Tensão corporal'],
    comoAge: 'Óleos essenciais com ação calmante e levemente antimicrobiana.',
    preparo: 'Infusão de folhas frescas por 5 a 10 minutos.',
    faixaSegura: '1 a 2 xícaras ao dia.',
    contra: 'Sem contraindicações significativas em doses habituais.',
    interacoes: null,
    suspensao: 'Reação alérgica ou irritação gástrica.',
    accent: 'text-yellow-300', border: 'border-yellow-400/30',
  },
];

const NERVOSO: PlantaFicha[] = [
  {
    nome: 'Camomila', cientifico: 'Matricaria chamomilla', parteUsada: 'Flor',
    melhora: ['Ansiedade leve', 'Insônia inicial', 'Cólica leve'],
    comoAge: 'Apigenina atua em receptores GABA, promovendo relaxamento leve documentado.',
    preparo: '1 a 2 g da flor seca por xícara, abafar por 10 minutos.',
    faixaSegura: '1 a 3 xícaras ao dia, até 14 dias.',
    contra: 'Alergia a Asteraceae.',
    interacoes: 'Potencializa sedativos e benzodiazepínicos.',
    suspensao: 'Reação alérgica, sonolência excessiva.',
    accent: 'text-yellow-400', border: 'border-yellow-500/30',
  },
  {
    nome: 'Mulungu', cientifico: 'Erythrina mulungu', parteUsada: 'Casca',
    melhora: ['Agitação leve', 'Dificuldade de relaxamento'],
    comoAge: 'Alcaloides com ação sedativa leve sobre o sistema nervoso central.',
    preparo: 'Decocção controlada da casca — 1 colher de chá por xícara.',
    faixaSegura: 'Uso pontual, não contínuo.',
    contra: 'Hipotensão. Uso excessivo pode causar queda de pressão.',
    interacoes: 'Cautela com anti-hipertensivos.',
    suspensao: 'Tontura, sonolência excessiva ou queda de pressão.',
    accent: 'text-purple-400', border: 'border-purple-500/30',
  },
];

const IMUNE: PlantaFicha[] = [
  {
    nome: 'Alho', cientifico: 'Allium sativum', parteUsada: 'Bulbo',
    melhora: ['Resposta imune', 'Circulação', 'Defesa antimicrobiana'],
    comoAge: 'Allicina possui ação antimicrobiana e moduladora imune.',
    preparo: 'Cru e triturado — aguardar 10 minutos após esmagar para ativar allicina.',
    faixaSegura: '1 a 2 dentes ao dia.',
    contra: 'Cautela com anticoagulantes. Irritação gástrica em excesso.',
    interacoes: 'Warfarina, AAS e outros anticoagulantes.',
    suspensao: 'Sangramento incomum ou irritação gástrica.',
    accent: 'text-amber-300', border: 'border-amber-400/30',
  },
  {
    nome: 'Gengibre', cientifico: 'Zingiber officinale', parteUsada: 'Rizoma',
    melhora: ['Náusea leve', 'Inflamação leve', 'Dor muscular'],
    comoAge: 'Gingerol possui ação anti-inflamatória e antiemética.',
    preparo: 'Decocção de 1 a 2 g da raiz fresca por 5 a 10 minutos.',
    faixaSegura: '1 a 2 xícaras ao dia.',
    contra: 'Cautela com gastrite severa.',
    interacoes: 'Anticoagulantes.',
    suspensao: 'Queimação gástrica persistente.',
    accent: 'text-amber-400', border: 'border-amber-500/30',
  },
];

const MUSCULAR: PlantaFicha[] = [
  {
    nome: 'Arnica', cientifico: 'Arnica montana', parteUsada: 'Flor (USO EXTERNO)',
    melhora: ['Hematomas', 'Contusões', 'Dor muscular localizada'],
    comoAge: 'Helenalina estimula circulação local e reduz resposta inflamatória.',
    preparo: 'Pomada ou gel tópico — aplicar 2 a 3 vezes ao dia.',
    faixaSegura: 'Uso externo limitado à área afetada.',
    contra: 'NUNCA ingerir. Não usar em feridas abertas ou pele lesionada.',
    interacoes: null,
    suspensao: 'Irritação cutânea ou reação alérgica.',
    accent: 'text-orange-400', border: 'border-orange-500/30',
  },
  {
    nome: 'Babosa', cientifico: 'Aloe vera', parteUsada: 'Gel interno da folha',
    melhora: ['Queimaduras leves', 'Irritação cutânea', 'Hidratação da pele'],
    comoAge: 'Polissacarídeos com ação cicatrizante e anti-inflamatória tópica.',
    preparo: 'Aplicação direta do gel fresco da parte interna da folha.',
    faixaSegura: 'Uso tópico — 2 a 3 aplicações ao dia.',
    contra: 'Não ingerir sem orientação técnica. Gestantes.',
    interacoes: null,
    suspensao: 'Irritação ou vermelhidão no local.',
    accent: 'text-emerald-400', border: 'border-emerald-500/30',
  },
];

/* ─── Componente de Ficha Técnica ─── */
function FichaPlanta({ planta }: { planta: PlantaFicha }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp} custom={0}
      className={`bg-[#0f1a0f]/60 backdrop-blur-md border ${planta.border} rounded-xl p-6 md:p-8 hover:border-emerald-500/40 transition-all duration-500 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className={`text-xl md:text-2xl font-black tracking-tight ${planta.accent}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{planta.nome}</h4>
          <p className="text-stone-500 text-xs italic font-mono">{planta.cientifico}</p>
        </div>
        <span className="text-[9px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
          {planta.parteUsada}
        </span>
      </div>

      {/* O que melhora */}
      <div className="mb-5">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2">O que melhora no corpo</p>
        <div className="flex flex-wrap gap-1.5">
          {planta.melhora.map(m => (
            <span key={m} className="text-xs bg-white/5 border border-white/10 text-stone-300 px-2.5 py-1 rounded-md">{m}</span>
          ))}
        </div>
      </div>

      {/* Como age */}
      <div className="mb-5">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-1.5">Como age</p>
        <p className="text-stone-300 text-sm leading-relaxed">{planta.comoAge}</p>
      </div>

      {/* Preparo & Faixa Segura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-emerald-950/40 border border-emerald-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <FlaskConical size={13} className="text-emerald-500" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">Preparo</p>
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">{planta.preparo}</p>
        </div>
        <div className="bg-emerald-950/40 border border-emerald-800/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Shield size={13} className="text-emerald-500" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400">Faixa segura</p>
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">{planta.faixaSegura}</p>
        </div>
      </div>

      {/* Contra & Interações & Suspensão */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <XCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-400"><span className="text-red-400 font-semibold">Contraindicações:</span> {planta.contra}</p>
        </div>
        {planta.interacoes && (
          <div className="flex items-start gap-2">
            <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-400"><span className="text-amber-400 font-semibold">Interações:</span> {planta.interacoes}</p>
          </div>
        )}
        <div className="flex items-start gap-2">
          <Activity size={13} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-400"><span className="text-orange-400 font-semibold">Suspender se:</span> {planta.suspensao}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Seção de Sistema Corporal ─── */
function SistemaSection({ titulo, subtitulo, icon: Icon, plantas, accentColor, index }: {
  titulo: string; subtitulo: string; icon: React.ElementType; plantas: PlantaFicha[]; accentColor: string; index: number;
}) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
      className="mb-20"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-xl bg-${accentColor}-500/10 border border-${accentColor}-500/20`}>
          <Icon className={`text-${accentColor}-400`} size={22} />
        </div>
        <div>
          <span className="text-stone-600 text-[10px] font-bold tracking-[0.5em] uppercase">Sistema {String(index).padStart(2, '0')}</span>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-stone-200" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {titulo}
          </h3>
        </div>
      </div>
      <p className="text-stone-500 text-sm mb-8 ml-16">{subtitulo}</p>

      <div className="grid md:grid-cols-2 gap-5">
        {plantas.map(p => <FichaPlanta key={p.nome} planta={p} />)}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
═══════════════════════════════════════════════════════════ */
export default function ConhecimentoPerdido() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/50 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d08 0%, #0f1a0f 8%, #111f11 20%, #142214 40%, #111f11 70%, #0f1a0f 90%, #0a0d08 100%)' }}
    >
      {/* ─── Atmospheric glow ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes cpGlow {
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.06); }
          }
        `}</style>
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,100,50,0.18) 0%, transparent 70%)', animation: 'cpGlow 20s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,120,40,0.10) 0%, transparent 70%)', animation: 'cpGlow 26s ease-in-out 5s infinite' }} />
      </div>

      <Leaf className="fixed top-[15%] right-[6%] text-emerald-900/8 pointer-events-none z-0" size={140} />
      <TreePine className="fixed bottom-[18%] left-[3%] text-emerald-900/6 pointer-events-none z-0" size={160} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-32">

        {/* ─── NAV ─── */}
        <Link to="/projeto-autonomo/sabedoria-ancestral" className="inline-flex items-center gap-2 text-stone-600 hover:text-emerald-400 mb-16 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300">
          <ArrowLeft size={14} /> Sabedoria Ancestral
        </Link>

        {/* ═══════════════════════════════════════════════════
            HERO — CONHECIMENTO PERDIDO
        ═══════════════════════════════════════════════════ */}
        <motion.header initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-8">
          {/* Hero Image */}
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src={imgHero} alt="Conhecimento Perdido" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-10">
              <span className="text-emerald-400/60 text-[10px] font-bold tracking-[0.5em] uppercase">Fase 02 · Autonomia Biológica</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mt-2 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                CONHECIMENTO<br /><span className="text-emerald-400">PERDIDO</span>
              </h1>
            </div>
          </div>

          <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Fundamentos naturais aplicados à saúde, alimentação e resiliência
          </p>
        </motion.header>

        {/* ═══════════════════════════════════════════════════
            PARTE 1 — O QUE NOS FOI ESQUECIDO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 01</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-8 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            O QUE NOS FOI <span className="text-emerald-400">ESQUECIDO</span>
          </h2>

          <div className="max-w-3xl space-y-6">
            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              Durante gerações, famílias plantavam, colhiam e criavam seus próprios recursos de subsistência. Não por ideologia — por necessidade. Cada quintal era uma farmácia. Cada avó era uma enciclopédia viva.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Com o tempo, a vida urbana substituiu a prática rural. O conhecimento que era transmitido pela observação da terra deixou de ser ensinado. O que era rotina virou exceção. O que era óbvio virou "alternativo".
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border-l-2 border-emerald-500/40 pl-6 py-3">
              <p className="text-emerald-300/90 text-lg md:text-xl font-medium leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Não nos tiraram esse conhecimento. Nos desconectamos dele. Lentamente. Geração após geração, o que era natural virou discutível."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base md:text-lg leading-relaxed">
              Hoje, a maioria das pessoas não reconhece uma folha de <span className="text-emerald-400 font-semibold">hortelã</span>. Não sabe diferenciar <span className="text-emerald-400 font-semibold">poejo</span> de capim. Não entende o que é <span className="text-emerald-400 font-semibold">inflamação crônica</span>. Não associa <span className="text-emerald-400 font-semibold">sono ruim</span> com imunidade baixa.
            </motion.p>

            <motion.p variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-stone-400 text-base leading-relaxed">
              Isso não é culpa de ninguém. É resultado da <span className="text-stone-200 font-semibold">desconexão prática com a base biológica</span>. Este módulo reconecta essa base.
            </motion.p>
          </div>

          {/* ─── Os 3 pilares técnicos ─── */}
          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {[
              {
                icon: BookOpen, title: 'Base Histórica',
                desc: 'Farmacopeias europeias, medicina tradicional asiática, sistemas agrícolas familiares. A farmacologia moderna nasceu da extração de compostos vegetais. Ácido acetilsalicílico veio do salgueiro. Digitálicos vieram da dedaleira. A planta veio antes do laboratório.',
                accent: 'emerald',
              },
              {
                icon: Brain, title: 'Base Fisiológica',
                desc: 'Flavonoides reduzem estresse oxidativo. Compostos amargos estimulam o fígado. Fibras modulam microbiota intestinal. Óleos essenciais possuem ação antimicrobiana. Nada aqui é crença — é bioquímica aplicada.',
                accent: 'emerald',
              },
              {
                icon: Shield, title: 'Base de Segurança',
                desc: 'Nenhuma planta é inofensiva por ser natural. Faixa segura de uso, contraindicações, interações medicamentosas, duração recomendada e sinais de suspensão. Sem isso, não há responsabilidade. E sem responsabilidade, não há autoridade.',
                accent: 'emerald',
              },
            ].map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-6 md:p-8 hover:border-emerald-600/30 transition-all duration-500">
                <div className="p-2.5 bg-emerald-800/20 rounded-xl w-fit mb-4">
                  <p.icon className="text-emerald-500" size={20} />
                </div>
                <h4 className="text-base font-bold text-stone-200 mb-3">{p.title}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 2 — A BASE NATURAL DO CORPO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 02</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-4 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            A BASE NATURAL <span className="text-emerald-400">DO CORPO</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
            Organização por sistemas fisiológicos. Cada sistema recebe suas plantas específicas, com mecanismo de ação documentado.
          </p>

          {/* Hero Image */}
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgSistemas} alt="Os 5 sistemas fisiológicos" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex flex-wrap gap-2">
                {['Digestivo', 'Respiratório', 'Nervoso', 'Imune', 'Muscular'].map(s => (
                  <span key={s} className="text-[10px] font-bold tracking-widest uppercase bg-emerald-500/15 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Aviso clínico */}
          <div className="bg-red-950/30 border border-red-800/25 rounded-xl p-6 md:p-8 mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-red-400" />
              <h3 className="text-sm font-bold text-red-300 uppercase tracking-wider">Quando NÃO usar fitoterapia sozinha</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                'Febre persistente > 38,5°C', 'Sintomas que pioram após 48h',
                'Dor intensa ou localizada', 'Confusão mental ou prostração',
                'Sangramento inesperado', 'Gestante ou lactante sem orientação',
                'Criança < 2 anos', 'Uso de medicação contínua',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/15 p-2.5 rounded-lg">
                  <XCircle size={12} className="text-red-400 shrink-0" />
                  <span className="text-stone-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 italic">Em qualquer dessas situações, busque atendimento médico profissional.</p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 3 — PLANTAS MEDICINAIS NA PRÁTICA
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 03</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-4 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            PLANTAS MEDICINAIS <span className="text-emerald-400">NA PRÁTICA</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-4">
            Fundamentos biológicos e aplicações seguras. Cada ficha segue padrão técnico fixo: nome, princípio ativo, mecanismo, preparo, faixa segura, contraindicações, interações e sinais de suspensão.
          </p>

          {/* Hero Image */}
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgPlantas} alt="Plantas medicinais na prática" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
          </div>

          {/* ─── FICHAS POR SISTEMA ─── */}
          <SistemaSection titulo="DIGESTIVO" subtitulo="Bile, motilidade intestinal e proteção da mucosa gástrica." icon={Flame} plantas={DIGESTIVO} accentColor="green" index={1} />
          <SistemaSection titulo="RESPIRATÓRIO" subtitulo="Broncodilatação, fluidificação de muco e ação antimicrobiana leve." icon={Wind} plantas={RESPIRATORIO} accentColor="cyan" index={2} />
          <SistemaSection titulo="NERVOSO" subtitulo="Modulação GABA, relaxamento e qualidade do sono." icon={Brain} plantas={NERVOSO} accentColor="purple" index={3} />
          <SistemaSection titulo="IMUNE" subtitulo="Modulação da resposta imune, ação antimicrobiana e anti-inflamatória." icon={Shield} plantas={IMUNE} accentColor="amber" index={4} />
          <SistemaSection titulo="MUSCULAR & INFLAMATÓRIO" subtitulo="Circulação local, cicatrização e redução da inflamação tópica." icon={Heart} plantas={MUSCULAR} accentColor="orange" index={5} />
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 4 — MANUAL APLICADO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 04</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-8 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            MANUAL <span className="text-emerald-400">APLICADO</span>
          </h2>

          <div className="bg-emerald-950/40 border border-emerald-800/25 rounded-2xl p-8 md:p-12">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8">
              Cada planta documentada neste módulo segue um <span className="text-emerald-400 font-semibold">padrão técnico fixo</span> que mantém a autoridade do protocolo. A diferença entre informação e formação é a estrutura.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Informação', example: '"Camomila acalma."', type: 'bad' },
                { label: 'Formação', example: 'Princípio ativo: apigenina · Mecanismo: modulação GABA · Indicação: ansiedade leve · Contraindicação: alergia a Asteraceae · Dose: 1-2g flor seca/xícara', type: 'good' },
              ].map(item => (
                <div key={item.label} className={`p-6 rounded-xl border ${item.type === 'bad' ? 'bg-red-950/20 border-red-800/20' : 'bg-emerald-950/30 border-emerald-700/25'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {item.type === 'bad' ? <XCircle size={16} className="text-red-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
                    <span className={`text-sm font-bold ${item.type === 'bad' ? 'text-red-300' : 'text-emerald-300'}`}>{item.label}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${item.type === 'bad' ? 'text-stone-500 italic' : 'text-stone-300 font-mono'}`}>{item.example}</p>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-5">Padrão fixo de cada ficha técnica</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { icon: Leaf, label: 'Nome e espécie' },
                { icon: Activity, label: 'O que melhora' },
                { icon: Brain, label: 'Como age' },
                { icon: FlaskConical, label: 'Como preparar' },
                { icon: Shield, label: 'Faixa segura' },
                { icon: XCircle, label: 'Contraindicações' },
                { icon: AlertTriangle, label: 'Interações' },
                { icon: Eye, label: 'Sinais de suspensão' },
                { icon: Package, label: 'Parte utilizada' },
                { icon: BookOpen, label: 'Nome científico' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                  <f.icon size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-stone-300">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            PARTE 5 — EDUCAÇÃO BOTÂNICA FAMILIAR
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase font-mono">Parte 05</span>
            <div className="flex-1 h-px bg-emerald-800/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-200 mb-4 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            EDUCAÇÃO BOTÂNICA <span className="text-emerald-400">FAMILIAR</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
            Continuidade geracional. O conhecimento só sobrevive se for ensinado.
          </p>

          {/* Hero Image */}
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden mb-14">
            <img src={imgFamilia} alt="Educação botânica familiar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/30 to-transparent" />
            <div className="absolute bottom-5 left-6">
              <p className="text-emerald-300/80 text-sm font-medium italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Quem ensina uma criança a reconhecer uma planta, planta autonomia para sempre."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Eye, title: 'Identificação Sensorial',
                desc: 'Ensinar formato da folha, cheiro e textura. Cada planta tem uma assinatura sensorial única — a criança aprende a reconhecer pelo toque, pelo aroma e pela forma antes de precisar de qualquer livro.',
              },
              {
                icon: Heart, title: 'Associação Funcional',
                desc: 'Vincular cada planta à função corporal simples. "Esta é a planta da barriga." "Esta é a planta do sono." Linguagem direta que cria memória permanente.',
              },
              {
                icon: Sprout, title: 'Participação Ativa',
                desc: 'Colher, preparar e observar resultados. A criança que participa do preparo de uma infusão entende o ciclo completo: da terra ao corpo. Isso é educação funcional.',
              },
              {
                icon: PenTool, title: 'Caderno de Campo',
                desc: 'Registro familiar com data, planta utilizada, forma de preparo e resposta do corpo. Cria um documento vivo de conhecimento prático que atravessa gerações.',
              },
            ].map((m, i) => (
              <motion.div key={m.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-7 hover:border-emerald-600/30 transition-all duration-500">
                <div className="p-2.5 bg-emerald-800/20 rounded-xl w-fit mb-4">
                  <m.icon className="text-emerald-500" size={20} />
                </div>
                <h4 className="text-base font-bold text-stone-200 mb-3">{m.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════
            INTEGRAÇÃO — ENCERRAMENTO
        ═══════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-gradient-to-br from-emerald-950/50 to-[#0a0d08]/80 border border-emerald-800/20 rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">Núcleo biológico do protocolo</h2>
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                Este bloco se conecta com todos os módulos do Projeto Autônomo. <span className="text-emerald-400 font-semibold">Sem corpo saudável, não há autonomia real.</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Saúde Preventiva', link: '/projeto-autonomo/saude-preventiva' },
                  { label: 'Fitoterapia Aplicada', link: '/projeto-autonomo/fitoterapia-aplicada' },
                  { label: 'Primeiros Socorros', link: '/projeto-autonomo/primeiros-socorros' },
                  { label: 'Avaliação de Sinais', link: '/projeto-autonomo/avaliacao-sinais' },
                  { label: 'Controle de Vetores', link: '/projeto-autonomo/controle-vetores' },
                  { label: 'Horta Urbana', link: '/projeto-autonomo/horta-urbana' },
                ].map(m => (
                  <Link key={m.label} to={m.link}
                    className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/15 rounded-lg px-3 py-2.5 hover:bg-emerald-500/20 hover:border-emerald-400/30 transition-all duration-300 group">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span className="text-xs text-stone-300 group-hover:text-emerald-300 transition-colors">{m.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-emerald-800/20 pt-6 mt-6">
                <p className="text-stone-400 text-sm leading-relaxed">
                  Corpo forte → Resposta melhor. Inflamação controlada → Recuperação mais rápida. Alimentação limpa → Sistema imune funcional.
                </p>
                <p className="text-emerald-400 font-semibold text-sm mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Autonomia não começa no estoque. Começa no corpo.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/projeto-autonomo/sabedoria-ancestral" className="btn-secondary text-center">
                ← Voltar à Sabedoria Ancestral
              </Link>
              <Link to="/projeto-autonomo" className="btn-secondary text-center">
                Projeto Autônomo
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ─── Disclaimer ─── */}
        <div className="text-center">
          <p className="text-stone-600 text-[10px] font-mono tracking-widest uppercase">
            Conteúdo educativo · Não substitui orientação médica profissional
          </p>
        </div>
      </div>
    </div>
  );
}
