import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Droplets, Bone, Flame, Package, CheckCircle2, XCircle, Clock, Shield, ArrowUp, Hand } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';

import imgHemostasia from '@/assets/ps-hemostasia.jpg';
import imgImobilizacao from '@/assets/ps-imobilizacao.jpg';
import imgQueimaduras from '@/assets/ps-queimaduras.jpg';
import imgKit from '@/assets/ps-kit.jpg';

const PrimeirosSocorros = () => {
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
            Primeiros<br />
            <span className="text-red-400">Socorros</span>
          </motion.h1>
          <motion.p variants={staggerChild} className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-6">
            Estabilização imediata até chegada de suporte especializado
          </motion.p>

          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Primeiros socorros são intervenções imediatas aplicadas após uma lesão ou acidente, com o objetivo de:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Evitar agravamento', 'Reduzir dor', 'Prevenir complicações', 'Ganhar tempo com segurança'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  <span className="text-foreground/80">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 bg-red-500/10 border border-red-500/20 p-5 rounded-sm max-w-3xl">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="text-red-400 font-bold">Eles não substituem atendimento médico.</span> Eles preservam a condição da vítima até que ele ocorra.
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-6 max-w-3xl">
            <p className="text-foreground/80 font-medium text-sm mb-3">Este módulo aborda três pilares críticos:</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Controle de sangramento', icon: Droplets, color: 'text-red-400' },
                { label: 'Estabilização de fraturas', icon: Bone, color: 'text-sky-400' },
                { label: 'Tratamento de queimaduras', icon: Flame, color: 'text-amber-400' },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 p-3 rounded-sm">
                  <p.icon size={16} className={`${p.color} shrink-0`} />
                  <span className="text-foreground/80">{p.label}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">E um quarto elemento essencial: <span className="text-foreground/80 font-medium">Organização de um kit funcional</span></p>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* BLOCO 01 — CONTENÇÃO DE SANGRAMENTO           */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Contenção de Sangramento</h2>
            <p className="text-muted-foreground text-sm">(Hemostasia)</p>
          </motion.div>

          {/* Imagem */}
          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgHemostasia} alt="Controle de sangramento" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-red-400/70">Compressão · Elevação · Torniquete</span>
            </div>
          </motion.div>

          <motion.p variants={staggerChild} className="text-muted-foreground mb-8 max-w-3xl">
            Hemorragias são uma das principais causas evitáveis de morte em trauma. Existem três níveis práticos de resposta.
          </motion.p>

          {/* Compressão Direta */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/20 p-6 md:p-8 rounded-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Hand size={20} className="text-red-400" />
              <h3 className="text-lg font-bold text-foreground">Compressão Direta</h3>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded-sm">Primeira e principal técnica</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-4">Passo a passo:</p>
            <div className="space-y-2">
              {[
                'Coloque gaze ou pano limpo sobre o ferimento',
                'Pressione firmemente com a palma da mão',
                'Mantenha pressão contínua por no mínimo 5 minutos',
                'Se o material saturar, coloque outro por cima (não retire o primeiro)',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-red-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-4 border-t border-white/5 pt-3">A pressão contínua permite que o sangue forme coágulo.</p>
          </motion.div>

          {/* Elevação */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/20 to-background border border-red-800/15 p-6 md:p-8 rounded-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUp size={20} className="text-red-400" />
              <h3 className="text-lg font-bold text-foreground">Elevação do Membro</h3>
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">Indicado quando:</p>
            <div className="space-y-1.5 mb-4">
              {['O sangramento é em braço ou perna', 'Não há suspeita de fratura grave'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">Elevar acima do nível do coração ajuda a reduzir o fluxo sanguíneo.</p>
          </motion.div>

          {/* Torniquete */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/40 to-background border border-red-600/30 p-6 md:p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-amber-400" />
              <h3 className="text-lg font-bold text-foreground">Torniquete</h3>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-sm">Uso Restrito</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">Indicado apenas quando:</p>
            <div className="space-y-1.5 mb-4">
              {['Sangramento arterial intenso', 'Compressão direta falhou'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">Aplicação:</p>
            <div className="space-y-1.5 mb-4">
              {[
                '5–7 cm acima da lesão',
                'Apertar até cessar o sangramento',
                'Registrar horário',
                'Nunca afrouxar periodicamente',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-amber-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* BLOCO 02 — IMOBILIZAÇÃO                        */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Imobilização com Materiais Improvisados</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgImobilizacao} alt="Imobilização improvisada" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-400/70">Braço · Perna · Materiais Improvisados</span>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-sm mb-6 max-w-3xl">
            <p className="text-sm text-foreground/80 leading-relaxed">
              Movimentar uma fratura pode causar: <span className="text-red-400 font-semibold">aumento da dor, lesão vascular, agravamento da fratura.</span> O objetivo da imobilização é impedir movimento.
            </p>
          </motion.div>

          {/* Sinais de Fratura */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-sky-950/30 to-background border border-sky-800/20 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Sinais de Possível Fratura</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Dor intensa ao toque', 'Inchaço rápido', 'Deformidade', 'Incapacidade de movimentar'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                  <span className="text-foreground/80">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
              <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <span className="text-red-300/90 text-xs font-semibold">Nunca tentar "colocar no lugar".</span>
            </div>
          </motion.div>

          {/* Braço */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-sky-950/20 to-background border border-sky-800/15 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-3">Imobilização de Braço</h3>
            <p className="text-xs text-muted-foreground font-mono mb-3">Materiais possíveis: revista grossa, tábua, papelão rígido</p>
            <div className="space-y-2">
              {[
                'Posicionar suporte rígido lateral',
                'Fixar com faixa ou pano',
                'Sustentar com tipoia improvisada',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-sky-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Perna */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-sky-950/20 to-background border border-sky-800/15 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-3">Imobilização de Perna</h3>
            <div className="space-y-2 mb-4">
              {[
                'Colocar duas superfícies rígidas laterais',
                'Fixar acima e abaixo da lesão',
                'Não apertar excessivamente',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-sky-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic border-t border-white/5 pt-3">Verificar circulação após imobilizar (cor e temperatura do pé ou mão).</p>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* BLOCO 03 — QUEIMADURAS                         */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Tratamento de Queimaduras</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgQueimaduras} alt="Classificação de queimaduras" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-400/70">1º Grau · 2º Grau · 3º Grau</span>
            </div>
          </motion.div>

          <motion.p variants={staggerChild} className="text-muted-foreground mb-8 max-w-3xl">
            Queimaduras continuam lesionando a pele mesmo após retirada da fonte de calor. A ação rápida reduz profundidade da lesão.
          </motion.p>

          {/* Classificação */}
          <motion.div variants={staggerChild} className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { grau: '1º Grau', desc: 'Vermelhidão e dor leve.', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30' },
              { grau: '2º Grau', desc: 'Bolhas e dor intensa.', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30' },
              { grau: '3º Grau', desc: 'Área esbranquiçada, escura ou carbonizada.', color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/30' },
            ].map((q) => (
              <div key={q.grau} className={`bg-gradient-to-br ${q.color} border ${q.border} p-5 rounded-sm`}>
                <h4 className="font-bold text-foreground mb-2">{q.grau}</h4>
                <p className="text-sm text-foreground/70">{q.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Conduta Inicial */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/30 to-background border border-amber-800/20 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Conduta Inicial</h3>
            <div className="space-y-2">
              {[
                'Interromper a fonte de calor',
                'Resfriar com água corrente por 10–20 minutos',
                'Não usar gelo',
                'Não estourar bolhas',
                'Cobrir com pano limpo',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-amber-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </motion.div>

          {/* O que NÃO fazer */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/30 p-6 md:p-8 rounded-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <XCircle size={18} className="text-red-400" />
              O que NÃO Fazer
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                'Não aplicar manteiga',
                'Não usar pasta de dente',
                'Não aplicar pó de café',
                'Não usar substâncias contaminadas',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* BLOCO 04 — KIT DE PRIMEIROS SOCORROS            */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Bloco 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Kit Mínimo de Primeiros Socorros</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-10 rounded-sm overflow-hidden relative">
            <img src={imgKit} alt="Kit de primeiros socorros organizado" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-mono tracking-widest uppercase text-green-400/70">Organizado · Acessível · Revisado</span>
            </div>
          </motion.div>

          <motion.p variants={staggerChild} className="text-muted-foreground mb-8 max-w-3xl">
            Um kit organizado reduz tempo de resposta.
          </motion.p>

          {/* Itens */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Itens essenciais:</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'Gaze estéril',
                'Ataduras',
                'Fita médica',
                'Tesoura',
                'Luvas descartáveis',
                'Antisséptico',
                'Soro fisiológico',
                'Torniquete',
                'Tala dobrável',
                'Cobertor térmico',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/15 p-3 rounded-sm">
                  <Package size={14} className="text-green-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Organização */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/20 to-background border border-green-800/15 p-6 md:p-8 rounded-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Organização Estratégica</h3>
            <p className="text-xs text-muted-foreground font-mono mb-3">Separar por categorias internas:</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { cat: 'Hemorragia', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/15' },
                { cat: 'Imobilização', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/15' },
                { cat: 'Queimaduras', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
                { cat: 'Higienização', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/15' },
              ].map((c) => (
                <div key={c.cat} className={`${c.bg} border ${c.border} p-3 rounded-sm text-center`}>
                  <span className={`text-sm font-semibold ${c.color}`}>{c.cat}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-white/5 pt-4">
              {['Revisar validade a cada 6 meses.', 'Guardar em local acessível.'].map((note) => (
                <div key={note} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={12} className="text-green-400 shrink-0" />
                  {note}
                </div>
              ))}
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
                Este conteúdo é de caráter educativo e informativo, baseado em protocolos validados por organizações de defesa civil e saúde. Não substitui treinamento presencial certificado, consulta médica, diagnóstico ou tratamento profissional. Em emergências, acione o SAMU (192) ou Corpo de Bombeiros (193).
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
          <Link to="/projeto-autonomo/autonomia-biologica" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono flex items-center gap-2">
            Suporte Fitoterápico
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PrimeirosSocorros;
