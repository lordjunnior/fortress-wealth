import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, Leaf, Wind, Brain, Stethoscope, Bone, Shield, Clock, CheckCircle2, XCircle, Activity, Zap, Moon, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

/* ═══════════════════════════════════════════════════════════════
   PROTOCOLOS POR SISTEMA CORPORAL
   ═══════════════════════════════════════════════════════════════ */

interface Protocolo {
  condicao: string;
  plantas: string[];
  forma: string;
  ciclo: string;
  ajusteIdade: string;
  criterioInterrupcao: string;
  alerta?: string;
}

interface SistemaCorporal {
  nome: string;
  icon: typeof Wind;
  cor: { accent: string; bg: string; border: string; pill: string };
  descricao: string;
  protocolos: Protocolo[];
}

const SISTEMAS: SistemaCorporal[] = [
  {
    nome: 'Sistema Respiratório',
    icon: Wind,
    cor: { accent: 'text-sky-400', bg: 'from-sky-500/15 to-sky-600/5', border: 'border-sky-500/25', pill: 'bg-sky-500/15 text-sky-300 border-sky-500/20' },
    descricao: 'Protocolos para congestão, tosse produtiva e irritação de vias aéreas superiores.',
    protocolos: [
      { condicao: 'Tosse produtiva leve', plantas: ['Guaco (broncodilatador)', 'Gengibre (anti-inflamatório)', 'Hortelã (descongestionante)'], forma: 'Infusão de guaco + gengibre ralado fresco (manhã e tarde). Inalação com hortelã à noite.', ciclo: '5–7 dias. Se não houver melhora, reavaliar.', ajusteIdade: 'Crianças > 6 anos: 50% da dose. Idosos: dose padrão com observação.', criterioInterrupcao: 'Suspender se surgir falta de ar, febre > 38,5°C ou escarro com sangue.', alerta: 'Não usar guaco por mais de 10 dias consecutivos (cumarina).' },
      { condicao: 'Congestão nasal e sinusite leve', plantas: ['Hortelã (mentol descongestionante)', 'Alecrim (anti-inflamatório)', 'Gengibre (vasoativo)'], forma: 'Inalação com vapor: folhas de hortelã + alecrim em água quente por 10 min, 2x/dia. Chá de gengibre com limão 2x/dia.', ciclo: '3–5 dias.', ajusteIdade: 'Crianças: inalação supervisionada apenas. Evitar gengibre em excesso em menores de 6 anos.', criterioInterrupcao: 'Suspender se houver dor facial intensa, febre ou secreção purulenta.' },
      { condicao: 'Irritação de garganta', plantas: ['Tanchagem (película protetora)', 'Camomila (anti-inflamatória)', 'Gengibre (analgésico leve)'], forma: 'Gargarejo com infusão de tanchagem + camomila morna, 3x/dia. Decocção leve de gengibre para beber.', ciclo: '3–5 dias.', ajusteIdade: 'Gargarejo apenas para maiores de 5 anos.', criterioInterrupcao: 'Suspender se dor aumentar, surgir dificuldade para engolir ou febre.' },
    ],
  },
  {
    nome: 'Sistema Digestivo',
    icon: Activity,
    cor: { accent: 'text-amber-400', bg: 'from-amber-500/15 to-amber-600/5', border: 'border-amber-500/25', pill: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
    descricao: 'Protocolos para desconforto gástrico, gases, má digestão e irregularidade intestinal.',
    protocolos: [
      { condicao: 'Má digestão e peso pós-refeição', plantas: ['Boldo (colerético)', 'Hortelã (antiespasmódico)', 'Erva-doce (carminativo)'], forma: 'Infusão de boldo 30 min após refeição (1 xícara). Chá de hortelã + erva-doce entre refeições.', ciclo: '3–5 dias. Máximo 5 dias de boldo consecutivo.', ajusteIdade: 'Idosos: iniciar com metade da dose de boldo. Crianças: apenas hortelã + erva-doce.', criterioInterrupcao: 'Suspender boldo se surgir náusea intensa, urina escura ou dor abdominal aguda.', alerta: 'Boldo é contraindicado em gestantes e pessoas com obstrução biliar.' },
      { condicao: 'Gases e distensão abdominal', plantas: ['Erva-doce (anetol relaxante)', 'Hortelã (mentol antiespasmódico)', 'Gengibre (procinético)'], forma: 'Infusão combinada de erva-doce + hortelã após almoço e jantar. Gengibre ralado em água morna pela manhã.', ciclo: '5–7 dias. Pausa de 3 dias e reavaliar.', ajusteIdade: 'Seguro para crianças > 3 anos na metade da dose.', criterioInterrupcao: 'Suspender se houver cólica intensa, vômito ou alteração significativa no hábito intestinal.' },
      { condicao: 'Constipação leve', plantas: ['Babosa/Aloe vera (aloína laxativa)', 'Erva-doce (relaxante intestinal)'], forma: 'Gel de babosa fresco (2 cm) em água pela manhã em jejum. Chá de erva-doce 2x/dia.', ciclo: 'Máximo 3 dias consecutivos de babosa oral.', ajusteIdade: 'Babosa oral: apenas adultos. Crianças: somente erva-doce.', criterioInterrupcao: 'Suspender babosa oral imediatamente se surgir cólica intensa ou diarreia.', alerta: 'Babosa oral é contraindicada em gestantes, lactantes e doença intestinal inflamatória.' },
    ],
  },
  {
    nome: 'Sistema Nervoso',
    icon: Brain,
    cor: { accent: 'text-purple-400', bg: 'from-purple-500/15 to-purple-600/5', border: 'border-purple-500/25', pill: 'bg-purple-500/15 text-purple-300 border-purple-500/20' },
    descricao: 'Protocolos para insônia leve, ansiedade situacional, tensão e fadiga mental.',
    protocolos: [
      { condicao: 'Insônia leve', plantas: ['Camomila (apigenina — receptor GABA)', 'Capim-limão (citral sedativo)', 'Passiflora (flavonoides ansiolíticos)'], forma: 'Infusão combinada de camomila + capim-limão 1h antes de dormir. Tintura de passiflora (30 gotas) 30 min antes de deitar.', ciclo: '10–14 dias. Pausa de 7 dias. Reavaliar necessidade.', ajusteIdade: 'Crianças > 5 anos: apenas camomila + capim-limão (50% dose). Idosos: dose padrão.', criterioInterrupcao: 'Suspender se surgir sonolência diurna excessiva, confusão ou piora do sono.', alerta: 'Não combinar com benzodiazepínicos ou antidepressivos sedativos sem orientação médica.' },
      { condicao: 'Ansiedade situacional', plantas: ['Camomila (calmante leve)', 'Capim-limão (sedativo)', 'Alecrim (equilíbrio — estimulante leve)'], forma: 'Camomila + capim-limão pela manhã e à tarde. Alecrim em dose leve pela manhã para evitar prostração.', ciclo: '7–10 dias. Avaliar resposta.', ajusteIdade: 'Seguro em dose reduzida para crianças > 6 anos.', criterioInterrupcao: 'Suspender se ansiedade piorar, surgir palpitação ou crise de pânico.' },
      { condicao: 'Fadiga mental e falta de concentração', plantas: ['Alecrim (ácido rosmarínico — circulação cerebral)', 'Gengibre (estimulante metabólico)'], forma: 'Infusão de alecrim pela manhã. Gengibre ralado em água morna no início da tarde.', ciclo: '5–7 dias. Pausa de 3 dias.', ajusteIdade: 'Evitar alecrim em hipertensos não controlados.', criterioInterrupcao: 'Suspender se surgir cefaleia, agitação ou taquicardia.' },
    ],
  },
  {
    nome: 'Sistema Músculo-Esquelético',
    icon: Bone,
    cor: { accent: 'text-orange-400', bg: 'from-orange-500/15 to-orange-600/5', border: 'border-orange-500/25', pill: 'bg-orange-500/15 text-orange-300 border-orange-500/20' },
    descricao: 'Protocolos para dor muscular, contusões, inflamação articular e recuperação pós-esforço.',
    protocolos: [
      { condicao: 'Dor muscular pós-esforço', plantas: ['Arnica (helenalina — uso tópico)', 'Gengibre (gingerol anti-inflamatório)', 'Alecrim (circulação local)'], forma: 'Pomada de arnica na região afetada 3x/dia. Decocção de gengibre para beber 2x/dia. Compressas mornas com infusão de alecrim.', ciclo: '3–5 dias.', ajusteIdade: 'Arnica tópica: segura para todas idades. Gengibre oral: crianças > 6 anos (50% dose).', criterioInterrupcao: 'Suspender se surgir inchaço significativo, deformidade ou incapacidade funcional.', alerta: 'NUNCA ingerir arnica. Não aplicar arnica em feridas abertas.' },
      { condicao: 'Inflamação articular leve', plantas: ['Gengibre (anti-inflamatório sistêmico)', 'Calêndula (anti-inflamatória tópica)', 'Camomila (modulação inflamatória)'], forma: 'Decocção de gengibre 2x/dia. Compressas de calêndula na articulação 2x/dia. Camomila à noite para reduzir inflamação basal.', ciclo: '7–10 dias. Pausa de 5 dias e reavaliar.', ajusteIdade: 'Idosos: dose padrão com monitoramento.', criterioInterrupcao: 'Suspender se houver aumento do edema, calor local intenso ou limitação progressiva de movimento.' },
    ],
  },
  {
    nome: 'Sistema Imunológico',
    icon: Shield,
    cor: { accent: 'text-emerald-400', bg: 'from-emerald-500/15 to-emerald-600/5', border: 'border-emerald-500/25', pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' },
    descricao: 'Protocolos para fortalecimento imune preventivo e suporte durante infecções leves.',
    protocolos: [
      { condicao: 'Resfriado leve / início de gripe', plantas: ['Gengibre (imunoestimulante)', 'Guaco (broncodilatador)', 'Camomila (anti-inflamatória)'], forma: 'Decocção forte de gengibre com limão e mel, 3x/dia. Guaco em infusão 2x/dia. Camomila à noite.', ciclo: '5–7 dias. Se febre persistir > 48h, buscar atendimento.', ajusteIdade: 'Crianças > 6 anos: 50% dose de gengibre e guaco. Mel proibido para < 1 ano.', criterioInterrupcao: 'Suspender se febre > 38,5°C por mais de 48h, falta de ar ou prostração.' },
      { condicao: 'Fortalecimento imune preventivo (sazonalidade)', plantas: ['Gengibre (gingerol)', 'Alecrim (antioxidante)', 'Camomila (modulação imune)'], forma: 'Rotação semanal: Semana 1 — gengibre diário. Semana 2 — alecrim diário. Semana 3 — camomila diária. Semana 4 — pausa.', ciclo: 'Ciclo de 4 semanas. Repetir conforme sazonalidade.', ajusteIdade: 'Seguro para adultos e crianças > 6 anos (dose ajustada).', criterioInterrupcao: 'Não é protocolo de tratamento. Suspender se surgir qualquer reação adversa.' },
      { condicao: 'Recuperação pós-infecção', plantas: ['Alecrim (restaurador)', 'Gengibre (anti-inflamatório)', 'Erva-doce (digestivo)'], forma: 'Alecrim + erva-doce pela manhã (restauração). Gengibre leve à tarde. Descanso e hidratação como prioridade.', ciclo: '5–7 dias pós-recuperação.', ajusteIdade: 'Dose padrão.', criterioInterrupcao: 'Suspender se sintomas retornarem.' },
    ],
  },
];

const FitoterapiaAplicada = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Fitoterapia Aplicada: Protocolos Combinados por Sistema Corporal | Lord Junnior</title>
        <meta name="description" content="Protocolos fitoterápicos estratégicos organizados por sistema corporal. Sinergia entre plantas, ciclos de uso, ajuste por idade e critérios de interrupção documentados." />
        <link rel="canonical" href="https://lordjunnior.com.br/projeto-autonomo/fitoterapia-aplicada" />
        <meta property="og:title" content="Fitoterapia Aplicada: Protocolos Terapêuticos Combinados" />
        <meta property="og:description" content="Combinação estratégica de plantas medicinais por condição. Ciclos de uso, dosagem por idade e critérios de segurança." />
        <meta property="og:url" content="https://lordjunnior.com.br/projeto-autonomo/fitoterapia-aplicada" />
      </Helmet>
    <div className="min-h-screen text-stone-100" style={{ background: 'linear-gradient(180deg, #050808 0%, #0a0d0a 8%, #0d120d 20%, #0a0d0a 60%, #050808 100%)' }}>
      <CinematicHero
        image="/heroes/fitoterapia-aplicada.webp"
        phase="Fase 02 · Autonomia Biológica"
        title="Fitoterapia Aplicada"
        subtitle="Estratégia terapêutica organizada — protocolos combinados por sistema corporal"
        icon={Leaf}
        accentColor="emerald"
        backLink="/projeto-autonomo"
        backLabel="Projeto Autônomo"
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* ─── INTRO ─── */}
        <motion.section initial="hidden" animate="visible" variants={stagger(0.1)} className="mb-20">
          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-stone-400 leading-relaxed">
            <p>
              Este módulo vai além do uso individual de plantas. Aqui, cada condição recebe um <span className="text-stone-200 font-semibold">protocolo estruturado</span> com combinação de plantas, forma de uso, duração, ajuste por idade e critérios claros de interrupção.
            </p>
            <p className="text-stone-300 font-medium">Diferença para o Suporte Fitoterápico:</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <p className="text-xs font-mono text-green-400/70 uppercase tracking-wider mb-2">Suporte Fitoterápico</p>
                <p className="text-sm text-stone-300">Biblioteca técnica de plantas individuais. Uso isolado, dosagem conservadora, segurança.</p>
                <Link to="/projeto-autonomo/autonomia-biologica" className="text-xs text-green-400 hover:underline mt-2 block">Ver módulo →</Link>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                <p className="text-xs font-mono text-purple-400/70 uppercase tracking-wider mb-2">Fitoterapia Aplicada</p>
                <p className="text-sm text-stone-300">Protocolos combinados por condição. Sinergia entre plantas, ciclos e ajustes estratégicos.</p>
                <span className="text-xs text-purple-400 mt-2 block">Você está aqui</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 bg-red-500/10 border border-red-500/20 p-5 rounded-xl max-w-3xl">
            <p className="text-sm text-stone-300 leading-relaxed">
              <span className="text-red-400 font-bold">Não substitui tratamento médico.</span> Os protocolos aqui são estratégias complementares para quadros leves e delimitados.
            </p>
            <p className="text-xs text-stone-500 mt-2">
              Cada protocolo inclui critérios objetivos de interrupção e indicação para buscar atendimento profissional.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── PRINCÍPIOS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-20">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Fundamentos</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Princípios dos Protocolos</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Leaf, title: 'Sinergia', desc: 'Plantas combinadas potencializam efeitos. A associação correta supera o uso isolado.' },
              { icon: Clock, title: 'Ciclos', desc: 'Cada protocolo tem duração definida. Uso contínuo indefinido não é estratégia.' },
              { icon: Zap, title: 'Ajuste por Idade', desc: 'Doses e plantas variam por faixa etária. Crianças, adultos e idosos respondem diferente.' },
              { icon: Thermometer, title: 'Avaliação de Resposta', desc: 'Monitorar sinais objetivos durante o ciclo. Sem melhora em 48-72h = reavaliar.' },
              { icon: XCircle, title: 'Critérios de Interrupção', desc: 'Todo protocolo tem gatilho de parada. Saber quando parar é tão importante quanto começar.' },
              { icon: Stethoscope, title: 'Encaminhamento', desc: 'Limites claros entre suporte fitoterápico e necessidade de atendimento profissional.' },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-transparent border border-green-800/20 p-5 rounded-xl">
                <item.icon size={20} className="text-green-500 mb-3" />
                <h4 className="font-bold text-stone-200 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── PROTOCOLOS POR SISTEMA CORPORAL ─── */}
        {SISTEMAS.map((sistema, sIdx) => (
          <motion.section key={sistema.nome} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.06)} className="mb-24">
            <motion.div variants={staggerChild} className="mb-8">
              <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Sistema {String(sIdx + 1).padStart(2, '0')}</span>
              <div className="flex items-center gap-3 mb-2">
                <sistema.icon size={24} className={sistema.cor.accent} />
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-100">{sistema.nome}</h2>
              </div>
              <p className="text-stone-500 text-sm max-w-2xl">{sistema.descricao}</p>
            </motion.div>

            <div className="space-y-5">
              {sistema.protocolos.map((proto, pIdx) => (
                <motion.div key={proto.condicao} variants={staggerChild} className={`bg-gradient-to-br ${sistema.cor.bg} border ${sistema.cor.border} p-6 md:p-8 rounded-xl`}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span className="text-[10px] font-mono text-stone-500">Protocolo {sIdx + 1}.{pIdx + 1}</span>
                      <h3 className={`text-xl font-bold ${sistema.cor.accent}`}>{proto.condicao}</h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                      <Leaf size={10} className="text-green-500" /> Combinação de plantas
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proto.plantas.map((p) => (
                        <span key={p} className={`text-xs border px-3 py-1 rounded-full ${sistema.cor.pill}`}>{p}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 bg-white/[0.04] p-4 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Forma de uso</span>
                    <p className="text-sm text-stone-300 mt-1 leading-relaxed">{proto.forma}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="border-l-2 border-white/10 pl-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <Clock size={10} /> Ciclo
                      </span>
                      <p className="text-xs text-stone-300 mt-1">{proto.ciclo}</p>
                    </div>
                    <div className="border-l-2 border-white/10 pl-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <Zap size={10} /> Ajuste por idade
                      </span>
                      <p className="text-xs text-stone-300 mt-1">{proto.ajusteIdade}</p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400/80 flex items-center gap-1">
                      <XCircle size={10} /> Critério de interrupção
                    </span>
                    <p className="text-xs text-stone-300 mt-1">{proto.criterioInterrupcao}</p>
                  </div>

                  {proto.alerta && (
                    <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                      <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-300/90">{proto.alerta}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* ─── REGRAS GERAIS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-20">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="text-stone-600 text-[10px] font-bold tracking-[0.4em] uppercase">Segurança</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-stone-100">Regras Gerais dos Protocolos</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-800/20 p-8 md:p-10 rounded-xl">
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Nunca combinar mais de 3 plantas sem conhecimento avançado',
                'Sempre iniciar com dose mínima e observar resposta',
                'Respeitar pausas entre ciclos — nunca uso contínuo indefinido',
                'Gestantes e lactantes: consultar profissional antes de qualquer protocolo',
                'Crianças < 2 anos: nenhum protocolo sem orientação médica',
                'Interação medicamentosa: se usa medicação contínua, consultar antes',
              ].map((regra) => (
                <div key={regra} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <span className="text-stone-300">{regra}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6">
              <h4 className="text-sm font-bold text-stone-200 mb-4">Buscar atendimento médico imediatamente se:</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Febre > 38,5°C persistente por mais de 48h',
                  'Reação alérgica (inchaço, coceira, falta de ar)',
                  'Piora progressiva dos sintomas',
                  'Confusão mental ou prostração',
                  'Dor intensa que não cede',
                  'Qualquer sangramento inesperado',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/15 p-2.5 rounded-xl">
                    <XCircle size={12} className="text-red-400 shrink-0" />
                    <span className="text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── DISCLAIMER ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/20 border border-amber-800/30 p-6 rounded-xl mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
              <p className="text-xs text-stone-500 leading-relaxed">
                Este conteúdo é de caráter educativo e informativo, baseado em uso tradicional documentado e referências fitoterapêuticas reconhecidas. Não substitui consulta médica, diagnóstico ou tratamento profissional.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── NAV FOOTER ─── */}
        <div className="flex items-center justify-between pt-8 border-t border-white/[0.06]">
          <Link to="/projeto-autonomo" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm font-mono flex items-center gap-2">
            <ArrowLeft size={14} />
            Projeto Autônomo
          </Link>
          <Link to="/projeto-autonomo/autonomia-biologica" className="text-stone-500 hover:text-emerald-400 transition-colors text-sm font-mono flex items-center gap-2">
            Suporte Fitoterápico →
          </Link>
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default FitoterapiaAplicada;
