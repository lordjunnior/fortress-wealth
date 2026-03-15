import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, XCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

import { CriteriosUso } from '@/components/conhecimento-perdido/CriteriosUso';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

export default function SegurancaLimites() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <ScrollToTop />
      <CinematicHero
        image="/heroes/cp-seguranca-limites.webp"
        phase="Bloco 03 · Conhecimento Perdido"
        title="Segurança e Limites"
        subtitle="Critérios de uso responsável, contraindicações documentadas, interações medicamentosas conhecidas e parâmetros claros de suspensão. Sem essa base, não existe credibilidade."
        icon={Shield}
        accentColor="amber"
        backLink="/projeto-autonomo/conhecimento-perdido"
        backLabel="Conhecimento Perdido"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ─── CRITÉRIOS DE USO RESPONSÁVEL ─── */}
        <CriteriosUso />

        {/* ─── QUANDO NÃO USAR ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-red-950/30 border border-red-800/25 rounded-xl p-6 md:p-8">
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

        {/* ─── BLOCO DE RESPONSABILIDADE ─── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="bg-amber-950/20 border border-amber-700/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-lg font-bold text-stone-200 mb-6">A linha entre remédio e veneno</h2>
            <div className="space-y-5 text-stone-400 text-base leading-relaxed max-w-3xl">
              <p>
                Arnica causa parada cardíaca se ingerida. Boldo destrói o fígado em uso prolongado. 
                Mulungu derruba a pressão de quem já toma medicação anti-hipertensiva. 
                Confrei causa doença veno-oclusiva hepática.
              </p>
              <p>
                Nenhuma planta é inofensiva por ser natural. A diferença entre remédio e veneno é 
                <span className="text-amber-400 font-semibold"> dose, via de uso, tempo de administração e contexto individual</span>. 
                Este bloco existe para documentar exatamente esses limites — faixa segura de uso, contraindicações absolutas e relativas, 
                interações medicamentosas catalogadas, duração máxima recomendada e sinais objetivos para suspensão imediata.
              </p>
              <p>
                Cada ficha técnica deste ecossistema inclui esses parâmetros. Se uma planta não tem contraindicação listada, 
                não é porque ela é segura — é porque não foi documentada adequadamente. E material não documentado não entra aqui.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ENTRE BLOCOS ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/conhecimento-perdido/base-fisiologica"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 hover:border-emerald-400/30 transition-all">
            ← Base Fisiológica
          </Link>
          <Link to="/conhecimento-perdido/aplicacao-pratica"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-xl px-6 py-4 text-amber-300 text-sm font-bold hover:bg-amber-600/30 transition-all group">
            Próximo: Aplicação Prática <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
