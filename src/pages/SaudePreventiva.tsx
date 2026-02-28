import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Sun, Moon, Activity, Salad, Brain, Flame, Droplets, CheckCircle2, Heart, Shield, Dna, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerChild, viewportOnce } from '@/lib/motion';

import imgMicrobiota from '@/assets/saude-microbiota.jpg';
import imgCortisol from '@/assets/saude-cortisol.jpg';

const SaudePreventiva = () => {
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
            Saúde<br />
            <span className="text-emerald-400">Preventiva</span>
          </motion.h1>
          <motion.p variants={staggerChild} className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-6">
            Base Biológica e Estratégias Anti-Inflamatórias Avançadas
          </motion.p>

          <motion.div variants={staggerChild} className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-sm">Saúde preventiva é a manutenção da <span className="text-foreground/80 font-medium">homeostase.</span></p>
            <p className="text-sm">Homeostase é a capacidade do corpo de manter equilíbrio interno mesmo sob estresse.</p>
            <p className="text-sm text-foreground/80 font-medium">Quando esse equilíbrio falha, surge:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Inflamação crônica', 'Resistência à insulina', 'Disfunção hormonal', 'Fadiga persistente', 'Vulnerabilidade imunológica'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  <span className="text-foreground/80">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-8 max-w-3xl">
            <p className="text-foreground/80 font-bold text-sm mb-4">Este módulo integra:</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Exposição solar', icon: Sun, color: 'text-amber-400' },
                { label: 'Sono', icon: Moon, color: 'text-indigo-400' },
                { label: 'Movimento', icon: Activity, color: 'text-green-400' },
                { label: 'Alimentação', icon: Salad, color: 'text-emerald-400' },
                { label: 'Estratégias anti-inflamatórias', icon: Dna, color: 'text-purple-400' },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 p-3 rounded-sm">
                  <p.icon size={16} className={`${p.color} shrink-0`} />
                  <span className="text-foreground/80">{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* INFLAMAÇÃO CRÔNICA                              */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Base</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Entendendo a Inflamação Crônica</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/30 to-background border border-red-800/20 p-6 md:p-8 rounded-sm mb-4">
            <div className="flex items-start gap-4 mb-6">
              <div>
                <p className="text-sm text-foreground/80 mb-2">Inflamação aguda é <span className="text-green-400 font-bold">protetora.</span></p>
                <p className="text-sm text-foreground/80">Inflamação crônica é <span className="text-red-400 font-bold">destrutiva.</span></p>
                <p className="text-sm text-muted-foreground mt-3">Ela ocorre quando o sistema imune permanece ativado de forma leve e constante.</p>
              </div>
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Marcadores envolvidos:</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {['IL-6', 'TNF-alpha', 'PCR ultrasensível', 'Cortisol elevado'].map((m) => (
                <div key={m} className="bg-red-500/10 border border-red-500/15 p-3 rounded-sm text-center">
                  <span className="text-sm font-semibold text-red-400">{m}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Consequências:</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Danos vasculares', 'Rigidez arterial', 'Disfunção metabólica', 'Alteração do humor', 'Fadiga'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Flame size={12} className="text-red-400 shrink-0" />
                  {c}
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6 border-t border-white/5 pt-3 italic">
              O objetivo preventivo é reduzir inflamação basal sem bloquear o sistema imune.
            </p>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* EXPOSIÇÃO SOLAR                                 */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Pilar 01</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Exposição Solar e Modulação Imune</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/30 to-background border border-amber-800/20 p-6 md:p-8 rounded-sm">
            <p className="text-sm text-foreground/80 mb-4">A vitamina D atua como <span className="text-amber-400 font-semibold">reguladora imunológica.</span></p>

            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Ela:</h4>
            <div className="space-y-1.5 mb-6">
              {['Reduz citocinas inflamatórias', 'Melhora resposta antiviral', 'Regula expressão genética'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Sun size={12} className="text-amber-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Baixos níveis estão associados a:</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Infecções recorrentes', 'Depressão', 'Osteopenia', 'Fadiga crônica'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-amber-500/10 border border-amber-500/15 p-3 rounded-sm">
                  <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SONO                                            */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Pilar 02</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Sono e Reparo Inflamatório</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-indigo-950/30 to-background border border-indigo-800/20 p-6 md:p-8 rounded-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Privação de sono aumenta:</h4>
                <div className="space-y-2">
                  {['IL-6', 'PCR', 'Cortisol'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                      <AlertTriangle size={12} className="text-red-400 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Durante sono profundo ocorre:</h4>
                <div className="space-y-2">
                  {['Liberação de hormônio do crescimento', 'Reparação celular', 'Regulação do eixo HPA'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm bg-indigo-500/10 border border-indigo-500/15 p-3 rounded-sm">
                      <Moon size={12} className="text-indigo-400 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 bg-amber-500/10 border border-amber-500/20 p-3 rounded-sm">
              <p className="text-xs text-foreground/80 font-semibold">Sem sono adequado, <span className="text-amber-400">nenhuma estratégia anti-inflamatória se sustenta.</span></p>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* MOVIMENTO                                       */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Pilar 03</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Movimento como Anti-Inflamatório Natural</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/30 to-background border border-green-800/20 p-6 md:p-8 rounded-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Exercício moderado:</h4>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {['Reduz TNF-alpha', 'Melhora sensibilidade à insulina', 'Aumenta mitocôndrias', 'Diminui gordura visceral'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/15 p-3 rounded-sm">
                  <Activity size={12} className="text-green-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-sm">
              <p className="text-xs text-foreground/80">Exercício excessivo sem recuperação pode <span className="text-amber-400 font-semibold">aumentar inflamação.</span> Equilíbrio é essencial.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* ALIMENTAÇÃO ANTI-INFLAMATÓRIA                   */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Pilar 04</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Alimentação Anti-Inflamatória</h2>
            <p className="text-muted-foreground text-sm">Camada Avançada</p>
          </motion.div>

          {/* Controle Glicêmico */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-amber-950/20 to-background border border-amber-800/15 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-2">1. Controle de Pico Glicêmico</h3>
            <p className="text-sm text-muted-foreground mb-4">Picos de glicose aumentam estresse oxidativo.</p>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Estratégias:</h4>
            <div className="space-y-2 mb-4">
              {[
                'Consumir proteína antes do carboidrato',
                'Incluir fibras solúveis',
                'Evitar carboidrato isolado',
                'Caminhar 10 minutos após refeição',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="text-[10px] font-mono text-amber-400 w-4 shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
            <p className="text-xs text-emerald-400 font-semibold">Impacto: Reduz resistência à insulina.</p>
          </motion.div>

          {/* Microbiota */}
          <motion.div variants={staggerChild} className="mb-4">
            <div className="rounded-sm overflow-hidden relative mb-4">
              <img src={imgMicrobiota} alt="Microbiota saudável vs disbiose" className="w-full h-64 md:h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono tracking-widest uppercase text-emerald-400/70">Equilíbrio · Disbiose · Microbiota</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-950/30 to-background border border-emerald-800/20 p-6 md:p-8 rounded-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">2. Microbiota Intestinal</h3>
              <p className="text-sm text-foreground/80 mb-4">70% do sistema imune está ligado ao intestino.</p>

              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Disbiose gera:</h4>
              <div className="grid sm:grid-cols-3 gap-2 mb-6">
                {['Inflamação sistêmica', 'Distensão abdominal', 'Alteração de humor'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                    <AlertTriangle size={12} className="text-red-400 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Estratégias:</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {['Fermentados naturais', 'Fibras prebióticas', 'Variedade vegetal', 'Redução de ultraprocessados'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm bg-emerald-500/10 border border-emerald-500/15 p-3 rounded-sm">
                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Micronutrientes */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-purple-950/20 to-background border border-purple-800/15 p-6 md:p-8 rounded-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">3. Micronutrientes Anti-Inflamatórios</h3>
            <div className="space-y-3">
              {[
                { nome: 'Magnésio', funcao: 'Relaxamento muscular e redução de estresse', color: 'text-blue-400' },
                { nome: 'Zinco', funcao: 'Função imunológica', color: 'text-sky-400' },
                { nome: 'Ômega 3', funcao: 'Redução de citocinas inflamatórias', color: 'text-cyan-400' },
                { nome: 'Vitamina C', funcao: 'Antioxidante celular', color: 'text-orange-400' },
                { nome: 'Curcumina', funcao: 'Modulação inflamatória', color: 'text-amber-400' },
              ].map((n) => (
                <div key={n.nome} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-sm">
                  <span className={`text-sm font-bold ${n.color} min-w-[100px]`}>{n.nome}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                  <span className="text-sm text-foreground/80">{n.funcao}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 border-t border-white/5 pt-3 italic">
              Sempre dentro de faixa segura. Evitar megadoses sem orientação.
            </p>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* CONTROLE DE ESTRESSE                            */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Pilar 05</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Controle de Estresse e Cortisol</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="mb-4 rounded-sm overflow-hidden relative">
            <img src={imgCortisol} alt="Regulação do cortisol" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-red-950/20 to-background border border-red-800/15 p-6 md:p-8 rounded-sm mb-4">
            <p className="text-sm text-foreground/80 mb-4">Estresse crônico mantém cortisol elevado.</p>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Cortisol alto por tempo prolongado causa:</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Resistência à insulina', 'Perda muscular', 'Aumento de gordura abdominal', 'Supressão imune'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/15 p-3 rounded-sm">
                  <AlertTriangle size={12} className="text-red-400 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/20 to-background border border-green-800/15 p-6 md:p-8 rounded-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Estratégias práticas:</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'Respiração nasal lenta (4-6 ciclos/minuto)', icon: Wind },
                { label: 'Caminhada ao ar livre', icon: Activity },
                { label: 'Exposição solar matinal', icon: Sun },
                { label: 'Sono regular', icon: Moon },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/15 p-3 rounded-sm">
                  <item.icon size={14} className="text-green-400 shrink-0" />
                  <span className="text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════ */}
        {/* PROTOCOLO INTEGRADO                             */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger(0.08)} className="mb-24">
          <motion.div variants={staggerChild} className="mb-6">
            <span className="pre-title">Protocolo</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Protocolo Integrado Anti-Inflamatório</h2>
          </motion.div>

          <motion.div variants={staggerChild} className="bg-gradient-to-br from-emerald-950/30 to-background border border-emerald-800/20 p-6 md:p-8 rounded-sm mb-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Base diária:</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: '15–30 min de sol', icon: Sun, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
                { label: '20–30 min de movimento', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/15' },
                { label: 'Fibras e proteína adequada', icon: Salad, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' },
                { label: '7–9h de sono', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/15' },
                { label: 'Hidratação consistente', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
                { label: 'Regulação emocional', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/15' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 ${item.bg} border ${item.border} p-4 rounded-sm`}>
                  <item.icon size={18} className={`${item.color} shrink-0`} />
                  <span className="text-sm text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sinais de Redução */}
          <motion.div variants={staggerChild} className="bg-gradient-to-br from-green-950/20 to-background border border-green-800/15 p-6 md:p-8 rounded-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Sinais de Redução de Inflamação</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {['Energia estável', 'Sono profundo', 'Menos dores articulares', 'Melhor digestão', 'Humor mais estável'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/15 p-3 rounded-sm">
                  <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                  <span className="text-foreground/80">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ─── CONCLUSÃO ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-sm mb-6">
          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
            Saúde preventiva não é ausência de doença. É a capacidade de <span className="text-emerald-400 font-semibold">adaptação fisiológica.</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {['Inflamação controlada', 'Metabolismo eficiente', 'Hormônios regulados', 'Sistema imune equilibrado'].map((item) => (
              <div key={item} className="text-xs text-center bg-white/5 border border-white/10 p-2 rounded-sm text-foreground/70">{item}</div>
            ))}
          </div>
          <p className="text-sm text-foreground/80 mt-4">
            Quando os pilares básicos são aplicados e as estratégias avançadas são integradas, o corpo retorna ao estado de <span className="text-green-400 font-bold">autorregulação.</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">Isso é base biológica real.</p>
        </motion.div>

        {/* ─── DISCLAIMER ─── */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp} className="bg-amber-950/20 border border-amber-800/30 p-6 rounded-sm mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 mb-1">Aviso Legal</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Este conteúdo é de caráter educativo e informativo. Não substitui avaliação médica profissional, diagnóstico ou tratamento. Consulte sempre um profissional de saúde antes de modificar sua rotina, especialmente se possui condições pré-existentes.
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
          <Link to="/projeto-autonomo/avaliacao-sinais" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono flex items-center gap-2">
            Avaliação de Sinais
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SaudePreventiva;
