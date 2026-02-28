import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Shield, Heart, AlertTriangle, Flame, Droplets, Sun, Thermometer, CheckCircle2, XCircle, FlaskConical, BookOpen, Clock, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';

import imgMetodosPreparo from '@/assets/bio-metodos-preparo.jpg';
import img12Plantas from '@/assets/bio-12-plantas.jpg';
import imgArmazenamento from '@/assets/bio-armazenamento.jpg';

/* ─── SEO: meta keywords target ───
   autonomia biológica, fitoterapia responsável, plantas medicinais, camomila,
   boldo, arnica, babosa, gengibre, hortelã, erva-doce, alecrim, calêndula,
   capim-limão, guaco, tanchagem, suporte fitoterápico, trio da blindagem
─────────────────────────────────── */

const PLANTAS = [
  {
    nome: 'Camomila',
    cientifico: 'Matricaria chamomilla',
    usos: ['Ansiedade leve', 'Tensão', 'Desconforto digestivo leve', 'Cólicas'],
    parte: 'Flores secas',
    preparo: 'Infusão 1 colher de sopa para 200ml',
    dose: '1–3 xícaras ao dia',
    contra: 'Alergia a plantas da família Asteraceae',
    interacao: 'Pode potencializar sedativos',
    cor: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
  },
  {
    nome: 'Boldo',
    cientifico: 'Peumus boldus',
    usos: ['Má digestão', 'Sensação de estufamento', 'Apoio hepático leve'],
    parte: 'Folhas',
    preparo: 'Infusão leve (não ferver)',
    dose: '1 xícara após refeição pesada',
    contra: 'Gestantes. Uso prolongado não recomendado.',
    interacao: null,
    cor: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  {
    nome: 'Arnica',
    cientifico: 'Uso externo',
    usos: ['Contusões', 'Hematomas', 'Dor muscular'],
    parte: 'Pomada ou compressa',
    preparo: 'Uso tópico apenas',
    dose: 'Aplicar na região afetada',
    contra: 'Feridas abertas. NUNCA ingerir.',
    interacao: null,
    cor: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
  },
  {
    nome: 'Babosa',
    cientifico: 'Aloe vera',
    usos: ['Queimaduras leves', 'Irritações', 'Hidratação cutânea'],
    parte: 'Gel interno da folha',
    preparo: 'Uso tópico direto',
    dose: 'Aplicar na pele',
    contra: 'Uso interno somente sob orientação. Pode ter efeito laxativo.',
    interacao: null,
    cor: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    nome: 'Hortelã',
    cientifico: 'Mentha sp.',
    usos: ['Náusea leve', 'Desconforto digestivo', 'Refrescante respiratório leve'],
    parte: 'Folhas frescas',
    preparo: 'Infusão 1 colher de sopa folhas frescas',
    dose: '1–2 xícaras ao dia',
    contra: null,
    interacao: null,
    cor: 'from-teal-500/20 to-teal-600/10',
    border: 'border-teal-500/30',
    accent: 'text-teal-400',
  },
  {
    nome: 'Gengibre',
    cientifico: 'Zingiber officinale',
    usos: ['Náusea', 'Resfriado leve', 'Apoio imunológico'],
    parte: 'Rizoma',
    preparo: 'Decocção leve',
    dose: '1–2 xícaras ao dia',
    contra: 'Excesso pode irritar estômago',
    interacao: null,
    cor: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
  {
    nome: 'Erva-doce',
    cientifico: 'Pimpinella anisum',
    usos: ['Gases', 'Cólicas leves'],
    parte: 'Sementes',
    preparo: 'Infusão sementes amassadas',
    dose: '1–2 xícaras ao dia',
    contra: null,
    interacao: null,
    cor: 'from-lime-500/20 to-lime-600/10',
    border: 'border-lime-500/30',
    accent: 'text-lime-400',
  },
  {
    nome: 'Alecrim',
    cientifico: 'Rosmarinus officinalis',
    usos: ['Fadiga leve', 'Circulação'],
    parte: 'Folhas',
    preparo: 'Infusão leve',
    dose: '1–2 xícaras ao dia',
    contra: 'Evitar em hipertensos descompensados',
    interacao: null,
    cor: 'from-sky-500/20 to-sky-600/10',
    border: 'border-sky-500/30',
    accent: 'text-sky-400',
  },
  {
    nome: 'Calêndula',
    cientifico: 'Calendula officinalis',
    usos: ['Inflamações cutâneas leves', 'Irritação'],
    parte: 'Flores',
    preparo: 'Uso tópico — infusão ou pomada',
    dose: 'Aplicar na região afetada',
    contra: null,
    interacao: null,
    cor: 'from-orange-400/20 to-yellow-500/10',
    border: 'border-orange-400/30',
    accent: 'text-orange-300',
  },
  {
    nome: 'Capim-limão',
    cientifico: 'Cymbopogon citratus',
    usos: ['Relaxamento', 'Sono leve'],
    parte: 'Folhas',
    preparo: 'Infusão',
    dose: '1–2 xícaras ao dia',
    contra: null,
    interacao: null,
    cor: 'from-yellow-400/20 to-green-500/10',
    border: 'border-yellow-400/30',
    accent: 'text-yellow-300',
  },
  {
    nome: 'Guaco',
    cientifico: 'Mikania glomerata',
    usos: ['Tosse leve'],
    parte: 'Folhas',
    preparo: 'Infusão ou xarope',
    dose: '1–2 xícaras ao dia',
    contra: 'Evitar uso prolongado',
    interacao: null,
    cor: 'from-green-400/20 to-emerald-500/10',
    border: 'border-green-400/30',
    accent: 'text-green-300',
  },
  {
    nome: 'Tanchagem',
    cientifico: 'Plantago major',
    usos: ['Gargarejo para irritação leve', 'Compressas'],
    parte: 'Folhas',
    preparo: 'Infusão para gargarejo ou compressa',
    dose: '2–3 vezes ao dia',
    contra: null,
    interacao: null,
    cor: 'from-emerald-400/20 to-teal-500/10',
    border: 'border-emerald-400/30',
    accent: 'text-emerald-300',
  },
];

const METODOS_PREPARO = [
  { titulo: 'Infusão', desc: 'Para folhas e flores', detalhe: 'Água quente sobre a planta. Descansar 5–10 minutos.', icon: Droplets },
  { titulo: 'Decocção', desc: 'Para raízes e cascas', detalhe: 'Ferver 5–15 minutos.', icon: Flame },
  { titulo: 'Maceração', desc: 'Extração a frio', detalhe: 'Planta em água fria por 8–12 horas.', icon: Clock },
  { titulo: 'Tintura', desc: 'Extração alcoólica', detalhe: 'Uso mais técnico. Conservação prolongada.', icon: FlaskConical },
  { titulo: 'Pomada / Cataplasma', desc: 'Uso tópico', detalhe: 'Aplicação direta sobre a pele.', icon: Package },
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
            Fortalecer o corpo é fortalecer<br />
            <span className="text-green-400">a base da resiliência</span>
          </motion.h1>
          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              Autonomia biológica não significa substituir o sistema de saúde.
              <span className="text-foreground font-semibold"> Significa reduzir vulnerabilidade.</span>
            </p>
            <p>Significa entender:</p>
            <ul className="space-y-1 pl-4">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Como o corpo reage</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Como prevenir</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Como apoiar processos naturais</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" /> Quando NÃO usar algo</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Quando buscar atendimento profissional</li>
            </ul>
          </motion.div>
        </motion.section>

        {/* ─── CONHECIMENTO TRADICIONAL ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-20">
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/40 to-emerald-950/20 border border-green-800/30 p-8 md:p-12 rounded-sm">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Conhecimento tradicional não é superstição.<br />
              <span className="text-foreground font-semibold">É prática acumulada por séculos.</span>
            </p>
            <p className="text-muted-foreground mb-4">Quando usado com responsabilidade, ele:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Complementa o cuidado convencional',
                'Reduz carga inflamatória leve',
                'Apoia sistema digestivo',
                'Favorece equilíbrio nervoso',
                'Amplia capacidade de resposta em cenários adversos',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ─── TRIO DA BLINDAGEM ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.1)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-500/70 block mb-2">🔺 Aplicado à Autonomia Biológica</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">O Trio da Blindagem</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                titulo: 'Base Metabólica',
                desc: 'Sono, alimentação simples, hidratação adequada.',
                nota: 'Sem isso, nenhuma planta resolve.',
                icon: Sun,
                gradient: 'from-amber-500/15 to-amber-600/5',
                border: 'border-amber-500/30',
                accent: 'text-amber-400',
              },
              {
                num: '02',
                titulo: 'Base Imunológica',
                desc: 'Redução de inflamação crônica leve, microbiota equilibrada, suporte antioxidante.',
                nota: null,
                icon: Shield,
                gradient: 'from-green-500/15 to-green-600/5',
                border: 'border-green-500/30',
                accent: 'text-green-400',
              },
              {
                num: '03',
                titulo: 'Base de Resposta Aguda',
                desc: 'Saber o que usar em: desconforto digestivo, tensão nervosa, pequenas inflamações, irritações cutâneas.',
                nota: 'Fitoterapia atua principalmente nos níveis 2 e 3.',
                icon: Heart,
                gradient: 'from-red-500/15 to-red-600/5',
                border: 'border-red-500/30',
                accent: 'text-red-400',
              },
            ].map((pilar) => (
              <motion.div key={pilar.num} variants={staggerChild} className={`bg-gradient-to-br ${pilar.gradient} border ${pilar.border} p-8 rounded-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500`}>
                <span className={`text-6xl font-black ${pilar.accent} opacity-10 absolute top-4 right-4`}>{pilar.num}</span>
                <pilar.icon className={`${pilar.accent} mb-4`} size={28} />
                <h3 className="text-xl font-bold mb-3 text-foreground">{pilar.titulo}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pilar.desc}</p>
                {pilar.nota && <p className="text-xs mt-4 font-mono text-foreground/60 border-t border-white/5 pt-3">{pilar.nota}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── SUPORTE FITOTERÁPICO INTRO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="mb-20">
          <div className="border-l-2 border-green-500/50 pl-6 md:pl-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Suporte Fitoterápico</h2>
            <p className="text-muted-foreground text-lg">
              Uso tradicional documentado como complemento ao cuidado de saúde.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Como usar', 'Quanto usar', 'Quando NÃO usar', 'Como preparar', 'Como conservar'].map((item) => (
                <span key={item} className="text-xs font-mono tracking-wide text-green-400/80 bg-green-500/10 px-3 py-2 rounded-sm text-center">{item}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── BLOCO 01 — FUNDAMENTOS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-10">
            <span className="pre-title">Bloco 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Fundamentos da Fitoterapia Responsável</h2>
            <p className="text-muted-foreground max-w-2xl">
              Fitoterapia não é "chá aleatório". Envolve:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {['Parte correta da planta', 'Forma correta de extração', 'Dose adequada', 'Tempo adequado', 'Observação de contraindicações'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <BookOpen size={14} className="text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Métodos de Preparo */}
          <motion.div variants={staggerChild} className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Métodos de Preparo</h3>
          </motion.div>

          {/* Imagem Métodos */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgMetodosPreparo} alt="Métodos de preparo fitoterápico" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-green-400/70">Infusão · Decocção · Maceração · Tintura · Cataplasma</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {METODOS_PREPARO.map((m) => (
              <motion.div key={m.titulo} variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 rounded-sm group hover:border-green-600/40 transition-colors duration-500">
                <m.icon size={20} className="text-green-500 mb-3" />
                <h4 className="font-bold text-foreground mb-1">{m.titulo}</h4>
                <p className="text-xs text-green-400/70 font-mono mb-3">{m.desc}</p>
                <p className="text-sm text-muted-foreground">{m.detalhe}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── BLOCO 02 — 12 PLANTAS ESSENCIAIS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.05)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Fichas Técnicas das 12 Plantas Essenciais</h2>
            <p className="text-muted-foreground">Todas abaixo possuem uso tradicional documentado.</p>
          </motion.div>

          {/* Imagem 12 Plantas */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={img12Plantas} alt="Painel das 12 plantas essenciais" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
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
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Uso tradicional</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {p.usos.map((u) => (
                        <span key={u} className="text-xs bg-white/5 px-2 py-0.5 rounded-sm text-foreground/80">{u}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground block">Parte usada</span>
                      <span className="text-foreground/80">{p.parte}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Dose</span>
                      <span className="text-foreground/80">{p.dose}</span>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-muted-foreground block">Preparo</span>
                    <span className="text-foreground/80">{p.preparo}</span>
                  </div>

                  {p.contra && (
                    <div className="flex items-start gap-1.5 text-xs bg-red-500/10 border border-red-500/20 p-2 rounded-sm">
                      <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-red-300/90">{p.contra}</span>
                    </div>
                  )}

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

        {/* ─── BLOCO 03 — DOSAGENS ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Dosagens Referenciadas</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-8 md:p-10 rounded-sm">
            <h3 className="text-lg font-bold mb-6 text-foreground">Regra prática segura:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-2 border-green-500/50 pl-4">
                <span className="text-green-400 font-bold text-sm">Adultos</span>
                <p className="text-muted-foreground text-sm mt-1">1 colher de sopa planta seca para 200ml.</p>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-4">
                <span className="text-amber-400 font-bold text-sm">Crianças</span>
                <p className="text-muted-foreground text-sm mt-1">Metade da dose adulta.</p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <span className="text-red-400 font-bold text-sm">Uso contínuo</span>
                <p className="text-muted-foreground text-sm mt-1">Máximo 7–14 dias sem orientação profissional.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO 04 — INTERAÇÕES ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Interações Importantes</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/30 p-8 md:p-10 rounded-sm">
            <p className="text-muted-foreground mb-6">Evitar uso sem orientação se a pessoa:</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Usa anticoagulante',
                'Usa antidepressivo',
                'Está grávida',
                'Tem doença hepática',
                'Tem doença renal',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-mono text-foreground/60 border-t border-white/5 pt-4">
              Fitoterapia é complemento, não substituto.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO 05 — CONSERVAÇÃO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Bloco 05</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Conservação Correta</h2>
          </motion.div>

          {/* Imagem Armazenamento */}
          <motion.div variants={staggerChild} className="mb-8 rounded-sm overflow-hidden relative">
            <img src={imgArmazenamento} alt="Armazenamento correto de ervas" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/30 to-background border border-amber-800/20 p-8 md:p-10 rounded-sm">
            <h3 className="text-lg font-bold mb-6 text-foreground">Armazenar:</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Em pote de vidro escuro', icon: Package },
                { label: 'Ambiente seco', icon: Thermometer },
                { label: 'Longe de luz direta', icon: Sun },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/15 p-4 rounded-sm">
                  <item.icon size={18} className="text-amber-400 shrink-0" />
                  <span className="text-sm text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-l-2 border-amber-500/50 pl-4">
                <span className="text-amber-400 font-bold text-sm">Validade média</span>
                <p className="text-muted-foreground text-sm mt-1">6–12 meses para planta seca.</p>
              </div>
              <div className="border-l-2 border-green-500/50 pl-4">
                <span className="text-green-400 font-bold text-sm">Tinturas</span>
                <p className="text-muted-foreground text-sm mt-1">Até 2 anos.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── BLOCO FINAL — INTEGRAÇÃO ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-20">
          <motion.div variants={staggerChild}>
            <span className="pre-title">Integração Estratégica</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Integração com o Trio da Blindagem</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/40 to-emerald-950/20 border border-green-800/30 p-8 md:p-12 rounded-sm">
            <p className="text-lg text-muted-foreground mb-6">
              Fitoterapia não funciona isoladamente.<br />
              <span className="text-foreground font-semibold">Ela potencializa quando:</span>
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {[
                'Sono é adequado',
                'Alimentação é simples',
                'Intestino está equilibrado',
                'Exposição solar moderada',
                'Estresse está sob controle',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-green-500/20 pt-6">
              <p className="text-foreground font-bold text-lg mb-4">Autonomia biológica é construção. Não é improviso.</p>
              <p className="text-muted-foreground text-sm mb-4">Agora você tem:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  'Fundamentos técnicos',
                  '12 fichas essenciais',
                  'Dosagens',
                  'Contraindicações',
                  'Interações',
                  'Métodos de preparo',
                  'Conservação',
                  'Integração estratégica',
                ].map((item) => (
                  <span key={item} className="text-xs font-mono text-green-400/80 bg-green-500/10 px-3 py-2 rounded-sm text-center">{item}</span>
                ))}
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
