import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Shield, Heart, AlertTriangle, Flame, Droplets, Sun, Thermometer, CheckCircle2, XCircle, FlaskConical, BookOpen, Clock, Package, Brain, Pill, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';

import imgMetodosPreparo from '@/assets/bio-metodos-preparo.jpg';
import img12Plantas from '@/assets/bio-12-plantas.jpg';
import imgArmazenamento from '@/assets/bio-armazenamento.jpg';

import imgCamomila from '@/assets/planta-camomila.jpg';
import imgBoldo from '@/assets/planta-boldo.jpg';
import imgArnica from '@/assets/planta-arnica.jpg';
import imgBabosa from '@/assets/planta-babosa.jpg';
import imgHortela from '@/assets/planta-hortela.jpg';
import imgGengibre from '@/assets/planta-gengibre.jpg';
import imgErvaDoce from '@/assets/planta-erva-doce.jpg';
import imgAlecrim from '@/assets/planta-alecrim.jpg';
import imgCalendula from '@/assets/planta-calendula.jpg';
import imgCapimLimao from '@/assets/planta-capim-limao.jpg';
import imgGuaco from '@/assets/planta-guaco.jpg';
import imgTanchagem from '@/assets/planta-tanchagem.jpg';

const PLANTAS = [
  {
    nome: 'Camomila',
    cientifico: 'Matricaria chamomilla',
    melhora: ['Ansiedade leve', 'Insônia leve', 'Cólicas', 'Irritação gastrointestinal', 'Inflamação leve'],
    ativos: ['Apigenina (ação ansiolítica leve)', 'Bisabolol (anti-inflamatório)', 'Camazuleno (calmante)'],
    mecanismo: 'Atua em receptores GABA no sistema nervoso central, promovendo relaxamento leve. Reduz inflamação via modulação de citocinas inflamatórias.',
    dose: 'Infusão: 1 colher de sopa flores secas / 200 ml — 1–3 xícaras ao dia. Tintura: 20–40 gotas, até 3x/dia.',
    continuo: 'Até 14 dias sem orientação.',
    contra: 'Alergia a Asteraceae. Uso concomitante com sedativos.',
    interacao: 'Pode potencializar benzodiazepínicos e antidepressivos sedativos.',
    cor: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30', accent: 'text-yellow-400',
    imagem: imgCamomila,
  },
  {
    nome: 'Boldo',
    cientifico: 'Peumus boldus',
    melhora: ['Má digestão', 'Sensação de peso hepático', 'Náusea leve', 'Distensão abdominal'],
    ativos: ['Boldina (ação colerética)'],
    mecanismo: 'Estimula produção de bile. Melhora digestão de gorduras.',
    dose: 'Infusão leve: 1 colher de chá / 200 ml — máximo 1 xícara ao dia.',
    continuo: 'Máximo 5 dias consecutivos.',
    contra: 'Gravidez. Obstrução biliar. Doença hepática grave.',
    interacao: 'Pode interferir com medicamentos hepatotóxicos e anticoagulantes.',
    cor: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', accent: 'text-green-400',
    imagem: imgBoldo,
  },
  {
    nome: 'Arnica',
    cientifico: 'Uso externo',
    melhora: ['Hematomas', 'Dor muscular', 'Contusões', 'Inflamação local'],
    ativos: ['Helenalina (anti-inflamatória)'],
    mecanismo: 'Reduz resposta inflamatória local e melhora circulação na área aplicada.',
    dose: 'Pomada 2–3x/dia na região afetada.',
    continuo: null,
    contra: 'NUNCA ingerir. Não usar em feridas abertas.',
    interacao: null,
    cor: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', accent: 'text-orange-400',
    imagem: imgArnica,
  },
  {
    nome: 'Babosa',
    cientifico: 'Aloe vera',
    melhora: ['Queimaduras leves', 'Irritação cutânea', 'Hidratação da pele', 'Prisão de ventre (uso interno controlado)'],
    ativos: ['Aloína (laxativa)', 'Polissacarídeos cicatrizantes'],
    mecanismo: 'Ação cicatrizante e hidratante tópica. Efeito laxativo por via oral.',
    dose: 'Tópico: aplicar gel fresco 2–3x/dia.',
    continuo: null,
    contra: 'Gravidez. Doença intestinal inflamatória. Uso interno não recomendado sem orientação.',
    interacao: null,
    cor: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', accent: 'text-emerald-400',
    imagem: imgBabosa,
  },
  {
    nome: 'Hortelã',
    cientifico: 'Mentha sp.',
    melhora: ['Náusea', 'Gases', 'Tensão digestiva', 'Halitose'],
    ativos: ['Mentol (antiespasmódico)'],
    mecanismo: 'Ação antiespasmódica no trato gastrointestinal.',
    dose: '1 colher sopa folhas frescas / 200 ml.',
    continuo: null,
    contra: 'Evitar excesso em refluxo severo.',
    interacao: null,
    cor: 'from-teal-500/20 to-teal-600/10', border: 'border-teal-500/30', accent: 'text-teal-400',
    imagem: imgHortela,
  },
  {
    nome: 'Gengibre',
    cientifico: 'Zingiber officinale',
    melhora: ['Náusea', 'Resfriado leve', 'Dor leve', 'Inflamação leve'],
    ativos: ['Gingerol (anti-inflamatório)'],
    mecanismo: 'Ação anti-inflamatória e antiemética.',
    dose: '1–2 g raiz fresca em decocção leve.',
    continuo: null,
    contra: 'Evitar com anticoagulante.',
    interacao: null,
    cor: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', accent: 'text-amber-400',
    imagem: imgGengibre,
  },
  {
    nome: 'Erva-doce',
    cientifico: 'Pimpinella anisum',
    melhora: ['Cólicas', 'Gases', 'Desconforto intestinal'],
    ativos: ['Anetol (carminativo)'],
    mecanismo: 'Relaxa musculatura lisa do trato digestivo.',
    dose: '1 colher chá sementes esmagadas / 200 ml.',
    continuo: null,
    contra: null,
    interacao: null,
    cor: 'from-lime-500/20 to-lime-600/10', border: 'border-lime-500/30', accent: 'text-lime-400',
    imagem: imgErvaDoce,
  },
  {
    nome: 'Alecrim',
    cientifico: 'Rosmarinus officinalis',
    melhora: ['Fadiga leve', 'Circulação', 'Concentração'],
    ativos: ['Ácido rosmarínico', 'Carnosol'],
    mecanismo: 'Estimulante circulatório e antioxidante.',
    dose: 'Infusão leve — 1–2 xícaras ao dia.',
    continuo: null,
    contra: 'Evitar em hipertensão descontrolada.',
    interacao: null,
    cor: 'from-sky-500/20 to-sky-600/10', border: 'border-sky-500/30', accent: 'text-sky-400',
    imagem: imgAlecrim,
  },
  {
    nome: 'Calêndula',
    cientifico: 'Calendula officinalis',
    melhora: ['Inflamação cutânea', 'Assaduras', 'Pequenas irritações'],
    ativos: ['Flavonoides', 'Triterpenoides'],
    mecanismo: 'Anti-inflamatória e cicatrizante tópica.',
    dose: 'Uso tópico — infusão ou pomada.',
    continuo: null,
    contra: null,
    interacao: null,
    cor: 'from-orange-400/20 to-yellow-500/10', border: 'border-orange-400/30', accent: 'text-orange-300',
    imagem: imgCalendula,
  },
  {
    nome: 'Capim-limão',
    cientifico: 'Cymbopogon citratus',
    melhora: ['Ansiedade leve', 'Insônia leve', 'Tensão muscular'],
    ativos: ['Citral (sedativo leve)'],
    mecanismo: 'Ação calmante sobre o sistema nervoso.',
    dose: 'Infusão — 1–2 xícaras ao dia.',
    continuo: null,
    contra: null,
    interacao: null,
    cor: 'from-yellow-400/20 to-green-500/10', border: 'border-yellow-400/30', accent: 'text-yellow-300',
    imagem: imgCapimLimao,
  },
  {
    nome: 'Guaco',
    cientifico: 'Mikania glomerata',
    melhora: ['Tosse leve', 'Secreção leve'],
    ativos: ['Cumarina (broncodilatador)'],
    mecanismo: 'Relaxa musculatura brônquica e facilita expectoração.',
    dose: 'Infusão ou xarope — 1–2 xícaras ao dia.',
    continuo: null,
    contra: 'Evitar uso prolongado.',
    interacao: null,
    cor: 'from-green-400/20 to-emerald-500/10', border: 'border-green-400/30', accent: 'text-green-300',
    imagem: imgGuaco,
  },
  {
    nome: 'Tanchagem',
    cientifico: 'Plantago major',
    melhora: ['Irritação de garganta', 'Inflamação leve', 'Pequenas lesões cutâneas'],
    ativos: ['Aucubina (anti-inflamatória)', 'Mucilagens'],
    mecanismo: 'Forma película protetora sobre mucosas inflamadas.',
    dose: 'Gargarejo ou compressa — 2–3 vezes ao dia.',
    continuo: null,
    contra: null,
    interacao: null,
    cor: 'from-emerald-400/20 to-teal-500/10', border: 'border-emerald-400/30', accent: 'text-emerald-300',
    imagem: imgTanchagem,
  },
];

const METODOS_PREPARO = [
  {
    titulo: 'Infusão',
    indicacao: 'Folhas e flores — compostos voláteis e delicados',
    passos: ['200 ml de água a 90–95°C', '1 colher de sopa da planta seca', 'Abafar por 5–10 minutos', 'Coar imediatamente'],
    resultado: 'Preserva flavonoides e óleos essenciais.',
    icon: Droplets,
  },
  {
    titulo: 'Decocção',
    indicacao: 'Raízes, cascas, sementes duras — estruturas fibrosas',
    passos: ['200 ml de água', 'Adicionar planta', 'Ferver 5–15 minutos', 'Descansar 5 minutos', 'Coar'],
    resultado: 'Extrai taninos e alcaloides resistentes.',
    icon: Flame,
  },
  {
    titulo: 'Tintura',
    indicacao: 'Extração concentrada — maior durabilidade',
    passos: ['Planta seca', 'Álcool de cereais 70%', 'Proporção 1:5', 'Macerar 15–30 dias', 'Agitar diariamente', 'Filtrar'],
    resultado: 'Maior durabilidade e concentração.',
    icon: FlaskConical,
  },
  {
    titulo: 'Uso Tópico',
    indicacao: 'Pomada / gel / cataplasma',
    passos: ['Inflamação local', 'Hematoma', 'Irritação', 'Feridas superficiais'],
    resultado: 'Aplicação direta sobre a pele.',
    icon: Package,
  },
];

const AutonomiaBiologica = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/projeto-autonomo" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono">
            <ArrowLeft size={16} />
            <span>Projeto Autônomo</span>
          </Link>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-green-500/70">Fase 02</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* ─── HERO ─── */}
        <motion.section initial="hidden" animate="visible" variants={stagger(0.1)} className="mb-20">
          <motion.span variants={staggerChild} className="text-green-500 text-[10px] font-bold tracking-[0.4em] uppercase opacity-70 block mb-4">
            Fase 02 · Autonomia Biológica
          </motion.span>
          <motion.h1 variants={staggerChild} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6">
            Suporte<br />
            <span className="text-green-400">Fitoterápico</span>
          </motion.h1>
          <motion.p variants={staggerChild} className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-6">
            Biblioteca técnica de plantas medicinais — uso individual, dosagem segura e limites claros
          </motion.p>

          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Este módulo é uma <span className="text-foreground/90 font-semibold">base preventiva de uso cotidiano</span>. Cada planta é documentada individualmente com dosagem conservadora, contraindicações claras e limites seguros de uso contínuo.
            </p>
            <p className="text-foreground/80 font-medium">Foco deste módulo:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Sintomas leves', 'Apoio imunológico', 'Equilíbrio digestivo', 'Sono e ansiedade leve', 'Pequenos desconfortos', 'Segurança primeiro'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <Activity size={14} className="text-green-500 shrink-0" />
                  <span className="text-foreground/80">{s}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              Aqui você aprende <strong className="text-foreground/80">o que usar</strong>, <strong className="text-foreground/80">quando usar</strong>, <strong className="text-foreground/80">quando NÃO usar</strong> e <strong className="text-foreground/80">quando encaminhar para atendimento médico</strong>.
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-6 bg-green-500/10 border border-green-500/20 p-5 rounded-sm max-w-3xl">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="text-green-400 font-bold">Uso domiciliar seguro.</span> Dosagens conservadoras, aplicação simples, manutenção da saúde.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Para protocolos combinados e estratégias terapêuticas por sistema corporal, veja o módulo <Link to="/projeto-autonomo/fitoterapia-aplicada" className="text-green-400 hover:underline font-semibold">Fitoterapia Aplicada →</Link>
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-4 bg-red-500/10 border border-red-500/20 p-5 rounded-sm max-w-3xl">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="text-red-400 font-bold">Não substitui tratamento médico.</span> Complementa quando usada corretamente.
            </p>
            <p className="text-sm text-muted-foreground mt-3">O erro comum é usar sem entender:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Parte correta da planta', 'Dose adequada', 'Duração segura', 'Interações'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs">
                  <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                  <span className="text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── QUANDO BUSCAR ATENDIMENTO MÉDICO ─── */}
          <motion.div variants={staggerChild} className="mt-6 max-w-3xl">
            <div className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/20 p-6 rounded-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-red-400" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Quando NÃO usar fitoterapia sozinha</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Febre persistente > 38,5°C',
                  'Sintomas que pioram após 48h',
                  'Dor intensa ou localizada',
                  'Confusão mental ou prostração',
                  'Sangramento inesperado',
                  'Gestante ou lactante sem orientação',
                  'Criança < 2 anos sem orientação',
                  'Uso concomitante de medicação contínua',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-500/15 p-2.5 rounded-sm">
                    <XCircle size={12} className="text-red-400 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">Em qualquer dessas situações, busque atendimento médico profissional.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO 01 — MÉTODOS TÉCNICOS DE PREPARO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-10">
            <span className="pre-title">Bloco 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Métodos Técnicos de Preparo</h2>
          </motion.div>

          {/* Imagem Métodos */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgMetodosPreparo} alt="Métodos de preparo fitoterápico" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-green-400/70">Infusão · Decocção · Tintura · Uso Tópico</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {METODOS_PREPARO.map((m) => (
              <motion.div key={m.titulo} variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 rounded-sm group hover:border-green-600/40 transition-colors duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <m.icon size={20} className="text-green-500" />
                  <h4 className="font-bold text-foreground text-lg">{m.titulo}</h4>
                </div>
                <p className="text-xs text-green-400/70 font-mono mb-4">{m.indicacao}</p>
                <div className="space-y-1.5 mb-4">
                  {m.passos.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="text-[10px] font-mono text-muted-foreground w-4">{i + 1}.</span>
                      {p}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic border-t border-white/5 pt-3">{m.resultado}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── BLOCO 02 — 12 PLANTAS ESSENCIAIS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.05)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Fichas Técnicas Completas das 12 Plantas</h2>
          </motion.div>

          {/* Imagem 12 Plantas */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={img12Plantas} alt="Painel das 12 plantas essenciais" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {PLANTAS.map((p, i) => (
              <motion.div key={p.nome} variants={staggerChild} className={`bg-gradient-to-br ${p.cor} border ${p.border} p-6 rounded-sm relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}.</span>
                    <h4 className={`text-xl font-bold ${p.accent}`}>{p.nome}</h4>
                    <span className="text-[11px] italic text-muted-foreground">{p.cientifico}</span>
                  </div>
                  <Leaf size={20} className={`${p.accent} opacity-30`} />
                </div>

                <div className="space-y-3 text-sm">
                  {/* O que melhora */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Heart size={10} className="text-green-500" /> O que melhora no corpo
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {p.melhora.map((u) => (
                        <span key={u} className="text-xs bg-white/5 px-2 py-0.5 rounded-sm text-foreground/80">{u}</span>
                      ))}
                    </div>
                  </div>

                  {/* Princípios ativos */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Pill size={10} className="text-blue-400" /> Princípios ativos
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {p.ativos.map((a) => (
                        <span key={a} className="text-xs bg-blue-500/10 border border-blue-500/15 px-2 py-0.5 rounded-sm text-blue-300/90">{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Mecanismo de ação */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Brain size={10} className="text-purple-400" /> Mecanismo de ação
                    </span>
                    <p className="text-xs text-foreground/70 mt-1 leading-relaxed">{p.mecanismo}</p>
                  </div>

                  {/* Dosagem */}
                  <div className="bg-white/5 p-3 rounded-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Dosagem segura</span>
                    <p className="text-xs text-foreground/80 mt-1">{p.dose}</p>
                    {p.continuo && <p className="text-[10px] text-muted-foreground mt-1">Uso contínuo: {p.continuo}</p>}
                  </div>

                  {/* Contraindicações */}
                  {p.contra && (
                    <div className="flex items-start gap-1.5 text-xs bg-red-500/10 border border-red-500/20 p-2 rounded-sm">
                      <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-red-300/90">{p.contra}</span>
                    </div>
                  )}

                  {/* Interações */}
                  {p.interacao && (
                    <div className="flex items-start gap-1.5 text-xs bg-amber-500/10 border border-amber-500/20 p-2 rounded-sm">
                      <AlertTriangle size={12} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-amber-300/90">{p.interacao}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── BLOCO 03 — DOSAGENS SEGURAS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Dosagens Seguras Organizadas</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-8 md:p-10 rounded-sm">
            <h3 className="text-lg font-bold mb-6 text-foreground">Regra geral segura:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-2 border-green-500/50 pl-4">
                <span className="text-green-400 font-bold text-sm">Planta seca</span>
                <p className="text-muted-foreground text-sm mt-1">1 colher de sopa / 200 ml</p>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-4">
                <span className="text-amber-400 font-bold text-sm">Crianças</span>
                <p className="text-muted-foreground text-sm mt-1">50% da dose adulta</p>
              </div>
              <div className="border-l-2 border-sky-500/50 pl-4">
                <span className="text-sky-400 font-bold text-sm">Idosos</span>
                <p className="text-muted-foreground text-sm mt-1">Iniciar com 50% e observar resposta</p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <span className="text-red-400 font-bold text-sm">Uso contínuo</span>
                <p className="text-muted-foreground text-sm mt-1">7–14 dias máximo sem orientação</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO 04 — INTERAÇÕES MEDICAMENTOSAS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Interações Medicamentosas Organizadas</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/30 p-8 md:p-10 rounded-sm">
            <p className="text-muted-foreground mb-6">⚠️ Atenção especial se a pessoa usa:</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Anticoagulantes',
                'Antidepressivos',
                'Anti-hipertensivos',
                'Hipoglicemiantes',
                'Sedativos',
                'Medicamentos hepáticos',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-mono text-foreground/60 border-t border-white/5 pt-4">
              Sempre iniciar com dose mínima.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO 05 — CONSERVAÇÃO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 05</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Conservação</h2>
          </motion.div>

          {/* Imagem Armazenamento */}
          <motion.div variants={staggerChild} className="mb-8 rounded-sm overflow-hidden relative">
            <img src={imgArmazenamento} alt="Armazenamento correto de ervas" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/30 to-background border border-amber-800/20 p-8 md:p-10 rounded-sm">
            <h3 className="text-lg font-bold mb-6 text-foreground">Plantas secas:</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Pote de vidro escuro', icon: Package },
                { label: 'Ambiente seco', icon: Thermometer },
                { label: 'Sem luz direta', icon: Sun },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/15 p-4 rounded-sm">
                  <item.icon size={18} className="text-amber-400 shrink-0" />
                  <span className="text-sm text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-l-2 border-amber-500/50 pl-4">
                <span className="text-amber-400 font-bold text-sm">Validade</span>
                <p className="text-muted-foreground text-sm mt-1">6–12 meses</p>
              </div>
              <div className="border-l-2 border-green-500/50 pl-4">
                <span className="text-green-400 font-bold text-sm">Tinturas</span>
                <p className="text-muted-foreground text-sm mt-1">Até 2 anos</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── DISCLAIMER ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/20 border border-amber-800/30 p-6 rounded-sm mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este conteúdo é de caráter educativo e informativo, baseado em uso tradicional documentado. Não substitui consulta médica, diagnóstico ou tratamento profissional. Consulte sempre um profissional de saúde antes de iniciar qualquer prática fitoterápica, especialmente se você possui condições de saúde pré-existentes, faz uso de medicamentos ou está gestante.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── NAV FOOTER ─── */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link to="/projeto-autonomo" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono flex items-center gap-2">
            <ArrowLeft size={14} />
            Projeto Autônomo
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AutonomiaBiologica;
