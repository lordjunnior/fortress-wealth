import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Wind, Droplets, Layers, Calendar, Sprout, Beaker, Thermometer, AlertTriangle, ChevronRight, CheckCircle2, XCircle, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

import imgLuzSolar from '@/assets/horta-luz-solar.jpg';
import imgVasoAutoirrigavel from '@/assets/horta-vaso-autoirrigavel.jpg';
import imgVertical from '@/assets/horta-vertical.jpg';
import imgCalendario from '@/assets/horta-calendario-plantio.jpg';
import imgEspecies from '@/assets/horta-especies-iniciantes.jpg';
import imgErros from '@/assets/horta-erros-comuns.jpg';
import imgSubstrato from '@/assets/solo-substrato-ideal.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

/* ═══════════════════════════════════════════════
   REUSABLE CARD COMPONENTS
   ═══════════════════════════════════════════════ */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-10 px-2">
      <div className="flex-1 h-px bg-emerald-600 opacity-20" />
      <span className="text-stone-400 text-[9px] font-bold tracking-[0.4em] uppercase">{label}</span>
      <div className="flex-1 h-px bg-emerald-600 opacity-20" />
    </div>
  );
}

function ImageCard({ src, alt, children }: { src: string; alt: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}
      className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl overflow-hidden hover:shadow-lg hover:scale-[1.003] transition-all duration-500"
    >
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-10">{children}</div>
    </motion.div>
  );
}

function InfoCard({ color, icon: Icon, title, children }: { color: string; icon: typeof Sun; title: string; children: React.ReactNode }) {
  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    green: { bg: 'bg-emerald-50/70', border: 'border-emerald-200/50', text: 'text-emerald-800', iconBg: 'bg-emerald-100' },
    yellow: { bg: 'bg-yellow-50/70', border: 'border-yellow-200/50', text: 'text-yellow-800', iconBg: 'bg-yellow-100' },
    blue: { bg: 'bg-sky-50/70', border: 'border-sky-200/50', text: 'text-sky-800', iconBg: 'bg-sky-100' },
    red: { bg: 'bg-red-50/70', border: 'border-red-200/50', text: 'text-red-800', iconBg: 'bg-red-100' },
    amber: { bg: 'bg-amber-50/70', border: 'border-amber-200/50', text: 'text-amber-800', iconBg: 'bg-amber-100' },
    teal: { bg: 'bg-teal-50/70', border: 'border-teal-200/50', text: 'text-teal-800', iconBg: 'bg-teal-100' },
  };
  const c = colorMap[color] || colorMap.green;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}
      className={`${c.bg} border ${c.border} rounded-3xl p-6 md:p-10 hover:shadow-md transition-all duration-500`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 ${c.iconBg} rounded-xl`}>
          <Icon className={c.text} size={20} />
        </div>
        <h3 className={`text-lg md:text-xl font-bold tracking-tight ${c.text}`}>{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function BulletList({ items, color = 'bg-emerald-500' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed">
          <span className={`w-1.5 h-1.5 rounded-full ${color} mt-2 shrink-0`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}

function CompareRow({ good, bad }: { good: string; bad: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="flex items-start gap-2 text-emerald-700">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
        <span>{good}</span>
      </div>
      <div className="flex items-start gap-2 text-red-600">
        <XCircle size={16} className="mt-0.5 shrink-0" />
        <span>{bad}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function HortaUrbana() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen selection:bg-emerald-200"
      style={{ background: 'linear-gradient(180deg, #eef7ee 0%, #f2f8ef 30%, #f5f3ea 60%, #ede8e0 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-5 md:px-6 pt-20 pb-32">

        {/* Back */}
        <Link
          to="/projeto-autonomo"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ══ HERO ══ */}
        <motion.section
          className="bg-emerald-50/80 border border-emerald-200/50 rounded-3xl p-6 md:p-10 mb-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-600 opacity-70">
            Fase 03 · Soberania Alimentar
          </span>

          <div className="mt-4 flex items-start gap-4 md:gap-5">
            <div className="p-3 md:p-4 bg-emerald-100 rounded-2xl shrink-0 mt-1">
              <Sprout className="text-emerald-700" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-stone-800 leading-tight">
                Horta Urbana
              </h1>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed mt-3 max-w-xl">
                Varandas, janelas e telhados. Espaço mínimo, colheita consistente. Guia técnico completo de cultivo em ambientes urbanos reduzidos.
              </p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-emerald-400/40 pl-5">
            <p className="text-stone-700 text-sm md:text-base leading-relaxed italic">
              "Produzir alimento em cidade não é adaptação improvisada. É engenharia de espaço."
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Sistema respiratório', desc: 'Troca de ar' },
              { label: 'Sistema circulatório', desc: 'Água e nutrientes' },
              { label: 'Sistema estrutural', desc: 'Raízes e suporte' },
              { label: 'Sistema metabólico', desc: 'Fotossíntese' },
            ].map((s, i) => (
              <div key={i} className="bg-white/50 rounded-xl p-3 text-center">
                <p className="text-emerald-700 text-xs font-bold">{s.label}</p>
                <p className="text-stone-400 text-[10px] mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══ BLOCO 01 — LUZ SOLAR ══ */}
        <SectionDivider label="Bloco 01 · Fundamentos" />

        <ImageCard src={imgLuzSolar} alt="Incidência solar em varanda urbana">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="text-yellow-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Luz Solar: O Fator Determinante</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Sem luz suficiente, não existe produção consistente. Observe sua varanda durante um dia inteiro e marque os horários de incidência direta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Sol Pleno */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-400/60 p-5"
              style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)' }}>
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-yellow-500/30 blur-lg" />
              <Sun size={24} className="text-yellow-700 mb-2" />
              <p className="font-black text-base text-yellow-900">Sol Pleno</p>
              <p className="text-yellow-800 text-sm font-semibold mt-1">6–8h diretas</p>
              <p className="text-yellow-900/70 text-xs mt-2 leading-relaxed">Tomate, pimentão, frutíferas</p>
            </div>

            {/* Meia-Sombra */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 p-5"
              style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fb923c 100%)' }}>
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-amber-500/30 blur-lg" />
              <Sun size={24} className="text-amber-800 mb-2" />
              <p className="font-black text-base text-amber-900">Meia-Sombra</p>
              <p className="text-amber-800 text-sm font-semibold mt-1">3–5h diretas</p>
              <p className="text-amber-900/70 text-xs mt-2 leading-relaxed">Alface, rúcula, cebolinha</p>
            </div>

            {/* Luz Indireta */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-stone-400/50 p-5"
              style={{ background: 'linear-gradient(135deg, #e7e5e4 0%, #d6d3d1 50%, #a8a29e 100%)' }}>
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-stone-400/30 blur-lg" />
              <Sun size={24} className="text-stone-700 mb-2" />
              <p className="font-black text-base text-stone-800">Luz Indireta</p>
              <p className="text-stone-700 text-sm font-semibold mt-1">Claridade o dia todo</p>
              <p className="text-stone-700/70 text-xs mt-2 leading-relaxed">Hortelã, salsinha, agrião</p>
            </div>
          </div>

          <InfoCard color="amber" icon={Wind} title="Vento e Proteção">
            <p className="text-stone-500 text-sm mb-4">Prédios criam túneis de vento que causam desidratação rápida, quebra de caules e queda de flores.</p>
            <BulletList items={[
              'Use treliças como barreira contra vento',
              'Posicione plantas maiores protegendo menores',
              'Coloque vasos atrás de paredes ou muretas',
              'Evite posições de corredor entre prédios',
            ]} />
          </InfoCard>
        </ImageCard>

        {/* ══ BLOCO 02 — VASO AUTOIRRIGÁVEL DIY ══ */}
        <SectionDivider label="Bloco 02 · Irrigação Inteligente" />

        <ImageCard src={imgVasoAutoirrigavel} alt="Vaso autoirrigável em corte transversal">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-sky-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Vaso Autoirrigável DIY</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            A irrigação irregular é o maior erro em horta urbana. O vaso autoirrigável cria um reservatório inferior que libera água gradualmente — funciona como um <strong className="text-stone-700">pulmão hídrico</strong>.
          </p>

          <h4 className="text-stone-700 font-bold text-sm mb-3">Componentes necessários:</h4>
          <BulletList items={[
            'Recipiente grande (balde ou caixa plástica)',
            'Separador interno (grade ou garrafa cortada)',
            'Tubo de abastecimento vertical',
            'Substrato leve e aerado',
            'Dreno de segurança lateral',
          ]} color="bg-sky-500" />

          <h4 className="text-stone-700 font-bold text-sm mt-6 mb-3">Montagem passo a passo:</h4>
          <StepList steps={[
            'Fure a lateral inferior para criar o dreno de segurança',
            'Instale o separador a 5–7 cm do fundo',
            'Coloque manta bidim ou tecido permeável sobre o separador',
            'Insira o tubo vertical para abastecimento de água',
            'Adicione substrato leve e aerado por cima',
            'Plante suas mudas ou sementes',
            'Encha o reservatório pelo tubo até o nível do dreno',
          ]} />

          <div className="mt-6 bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p className="text-sky-800 text-sm font-semibold">⏱ Reabastecimento médio: a cada 4–7 dias</p>
            <p className="text-sky-600 text-xs mt-1">Depende da espécie, temperatura e umidade ambiente.</p>
          </div>
        </ImageCard>

        {/* ══ BLOCO 03 — CULTIVO VERTICAL ══ */}
        <SectionDivider label="Bloco 03 · Multiplicação de Área" />

        <ImageCard src={imgVertical} alt="Horta vertical em varanda urbana">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="text-emerald-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Cultivo Vertical em Espaços Mínimos</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Produção vertical é <strong className="text-stone-700">multiplicação de área útil</strong>. Se você tem 1m² no chão, pode ter 3–4m² na vertical.
          </p>

          <h4 className="text-stone-700 font-bold text-sm mb-3">Estruturas possíveis:</h4>
          <BulletList items={[
            'Pallets tratados fixados na parede',
            'Treliças metálicas com ganchos',
            'Jardineiras suspensas escalonadas',
            'Tubos PVC com cortes laterais',
            'Estantes metálicas resistentes à água',
          ]} />

          <div className="mt-6">
            <InfoCard color="red" icon={AlertTriangle} title="Engenharia de Peso">
              <p className="text-stone-500 text-sm mb-3">Água pesa. Solo pesa. Vasos acumulados pesam. Antes de instalar:</p>
              <BulletList items={[
                'Verifique o limite estrutural da varanda',
                'Distribua peso uniformemente',
                'Use suportes fixados com parafusos adequados',
                'Prefira substratos leves (fibra de coco, perlita)',
              ]} color="bg-red-400" />
            </InfoCard>
          </div>
        </ImageCard>

        {/* ══ BLOCO 04 — CALENDÁRIO DE PLANTIO ══ */}
        <SectionDivider label="Bloco 04 · Planejamento Regional" />

        <ImageCard src={imgCalendario} alt="Calendário de plantio por região do Brasil">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-teal-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Calendário de Plantio por Região</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            O Brasil possui zonas climáticas distintas. Respeitar o ritmo natural da sua região é a diferença entre colher e perder.
          </p>

          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
              <h4 className="text-sky-800 font-bold text-sm mb-2">🧊 Sul / Sudeste</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-stone-600">
                <div>
                  <p className="font-semibold text-stone-700 text-xs mb-1">Outono/Inverno:</p>
                  <p>Alface, rúcula, couve, beterraba</p>
                </div>
                <div>
                  <p className="font-semibold text-stone-700 text-xs mb-1">Primavera/Verão:</p>
                  <p>Tomate, pimentão, manjericão</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h4 className="text-amber-800 font-bold text-sm mb-2">☀️ Nordeste / Norte</h4>
              <p className="text-stone-600 text-sm">Clima quente predominante: coentro, cebolinha, quiabo, alface resistente ao calor.</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <h4 className="text-emerald-800 font-bold text-sm mb-2">🌿 Centro-Oeste</h4>
              <p className="text-stone-600 text-sm">Estação seca definida. Irrigação constante no inverno, período chuvoso produtivo no verão.</p>
            </div>
          </div>

          <div className="mt-6 bg-stone-100/60 rounded-xl p-4">
            <p className="text-stone-600 text-sm">
              <strong className="text-stone-800">Regra prática:</strong> Temperatura ideal para maioria das hortaliças: <span className="text-emerald-700 font-bold">15°C – 28°C</span>.
            </p>
          </div>
        </ImageCard>

        {/* ══ BLOCO 05 — ESPÉCIES PARA INICIANTES ══ */}
        <SectionDivider label="Bloco 05 · Primeiras Espécies" />

        <ImageCard src={imgEspecies} alt="Hortaliças para iniciantes em varanda urbana">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="text-emerald-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Espécies Ideais para Iniciantes</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Critérios: crescimento rápido, alta tolerância, baixa exigência nutricional.
          </p>

          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <h4 className="text-emerald-800 font-bold text-sm mb-3">Nível 1 — Extremamente Fáceis</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Cebolinha', 'Alface crespa', 'Rúcula', 'Manjericão', 'Hortelã'].map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-600 text-sm">
                    <Leaf size={12} className="text-emerald-500" /> {p}
                  </div>
                ))}
              </div>
              <p className="text-emerald-600 text-xs font-semibold mt-3">⏱ Tempo médio: 25–45 dias</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <h4 className="text-amber-800 font-bold text-sm mb-3">Nível 2 — Intermediário</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Tomate cereja', 'Pimentão', 'Berinjela', 'Morango'].map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-600 text-sm">
                    <Leaf size={12} className="text-amber-500" /> {p}
                  </div>
                ))}
              </div>
              <p className="text-amber-600 text-xs font-semibold mt-3">Exigem mais luz e adubação regular</p>
            </div>
          </div>
        </ImageCard>

        {/* ══ BLOCO 06 — SUBSTRATO IDEAL ══ */}
        <SectionDivider label="Bloco 06 · Base Produtiva" />

        <ImageCard src={imgSubstrato} alt="Mistura de substrato ideal para horta urbana">
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="text-amber-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Substrato Ideal para Horta Urbana</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { pct: '40%', item: 'Terra vegetal peneirada', color: 'bg-amber-100 text-amber-800' },
              { pct: '30%', item: 'Composto orgânico', color: 'bg-emerald-100 text-emerald-800' },
              { pct: '20%', item: 'Areia grossa lavada', color: 'bg-stone-100 text-stone-700' },
              { pct: '10%', item: 'Húmus de minhoca', color: 'bg-yellow-100 text-yellow-800' },
            ].map((s, i) => (
              <div key={i} className={`${s.color} rounded-xl p-3 text-center`}>
                <p className="text-2xl font-bold">{s.pct}</p>
                <p className="text-xs mt-1">{s.item}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-emerald-800 text-sm font-semibold">✓ Textura final: solta, aerada, sem compactação</p>
            <p className="text-emerald-600 text-xs mt-1">Teste: regar → infiltrar rápido → sem poça.</p>
          </div>
        </ImageCard>

        {/* ══ BLOCO 07 — IRRIGAÇÃO CORRETA ══ */}
        <SectionDivider label="Bloco 07 · Irrigação" />

        <InfoCard color="blue" icon={Droplets} title="Irrigação Correta">
          <p className="text-stone-600 text-sm mb-4 font-medium">Excesso mata mais que falta.</p>

          <div className="bg-white/50 rounded-xl p-5 mb-4">
            <h4 className="text-stone-800 font-bold text-sm mb-3">Regra prática do dedo:</h4>
            <StepList steps={[
              'Enfie o dedo 3 cm no solo do vaso',
              'Se estiver úmido → NÃO regue',
              'Se estiver seco → regue lentamente até escorrer pelo dreno',
            ]} />
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p className="text-sky-800 text-sm font-semibold">🌅 Melhor horário: manhã cedo</p>
            <p className="text-sky-600 text-xs mt-1">Evita evaporação rápida e permite absorção antes do calor máximo.</p>
          </div>
        </InfoCard>

        {/* ══ BLOCO 08 — MICROCLIMAS ══ */}
        <SectionDivider label="Bloco 08 · Microclimas" />

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}
          className="rounded-3xl overflow-hidden border-2 border-amber-400/40 p-6 md:p-10"
          style={{ background: 'linear-gradient(145deg, #451a03 0%, #78350f 40%, #92400e 70%, #b45309 100%)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-400/20 rounded-xl">
              <Thermometer className="text-amber-300" size={22} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-amber-100">Microclimas Urbanos</h3>
          </div>
          <p className="text-amber-200/70 text-sm mb-6">Cidades criam ilhas de calor. Use isso estrategicamente.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              { local: 'Parede branca', efeito: 'Reflete luz — bom para plantas de meia-sombra', icon: '◻' },
              { local: 'Piso escuro', efeito: 'Aquece — acelera amadurecimento', icon: '◼' },
              { local: 'Telhado', efeito: 'Acumula calor — ideal para espécies tropicais', icon: '△' },
              { local: 'Varanda fechada', efeito: 'Retém umidade — bom para folhosas', icon: '▣' },
            ].map((m, i) => (
              <div key={i} className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-4 hover:bg-amber-900/60 transition-colors">
                <p className="text-amber-200 font-bold text-sm mb-1">{m.local}</p>
                <p className="text-amber-300/60 text-xs leading-relaxed">{m.efeito}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-400/10 border border-amber-500/20 rounded-xl p-5 space-y-2">
            <p className="text-amber-200 text-sm">
              <strong className="text-amber-100">Exemplo:</strong> Tomate próximo à parede quente → amadurece melhor.
            </p>
            <p className="text-amber-200 text-sm">
              <strong className="text-amber-100">Exemplo:</strong> Alface em área protegida → menos estresse térmico.
            </p>
          </div>
        </motion.div>

        {/* ══ BLOCO 09 — ERROS CRÍTICOS ══ */}
        <SectionDivider label="Bloco 09 · O Que Evitar" />

        <ImageCard src={imgErros} alt="Comparação entre erros e acertos em horta urbana">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-600" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight">Erros Críticos em Horta Urbana</h2>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Produção urbana não falha por falta de espaço. <strong className="text-stone-700">Falha por falta de estrutura.</strong>
          </p>

          <div className="space-y-3">
            <CompareRow good="Vaso com furos de drenagem" bad="Vaso sem drenagem" />
            <CompareRow good="Solo solto e aerado" bad="Solo compacto e pesado" />
            <CompareRow good="Adubação regular orgânica" bad="Falta de adubação" />
            <CompareRow good="Mínimo 3h de sol direto" bad="Pouca ou nenhuma luz" />
            <CompareRow good="1–2 plantas por vaso" bad="Excesso de plantas no mesmo vaso" />
            <CompareRow good="Poda de manutenção" bad="Falta de poda" />
          </div>
        </ImageCard>

        {/* ══ CONCLUSÃO ══ */}
        <SectionDivider label="Conclusão" />

        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="bg-emerald-50/80 border border-emerald-200/50 rounded-3xl p-6 md:p-10 text-center"
        >
          <Sprout className="text-emerald-600 mx-auto mb-4" size={32} />
          <h2 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight mb-4">
            Seu Metro Quadrado Produz
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed max-w-lg mx-auto mb-6">
            Uma horta urbana bem planejada funciona como um mercado particular que se renova sozinho. Não é autossuficiência total — é <strong className="text-stone-700">redução consistente de dependência</strong>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Luz mapeada', 'Irrigação controlada', 'Solo vivo', 'Colheita constante'].map((item, i) => (
              <div key={i} className="bg-white/60 rounded-xl p-3">
                <CheckCircle2 size={16} className="text-emerald-500 mx-auto mb-1" />
                <p className="text-stone-700 text-xs font-semibold">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/projeto-autonomo/solo-fertilidade"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Solo e Fertilidade <ChevronRight size={16} />
            </Link>
            <Link
              to="/projeto-autonomo/producao-pequenos-espacos"
              className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors"
            >
              Produção em Pequenos Espaços <ChevronRight size={16} />
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-stone-300 text-[10px] font-bold tracking-[0.5em] uppercase">
            Sistema Operacional de Soberania
          </p>
        </div>
      </div>
    </div>
  );
}
