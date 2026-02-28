import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Tent, Thermometer, Wind, Droplets, AlertTriangle, Shield, Home, TreePine, Layers, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import imgQuartoNucleo from '@/assets/abrigo-quarto-nucleo.jpg';
import imgAquecedorVela from '@/assets/abrigo-aquecedor-vela.jpg';
import imgAFrame from '@/assets/abrigo-a-frame.jpg';
import imgOrganizacao from '@/assets/abrigo-organizacao.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: APPLE_EASE, delay },
});

export default function AbrigoEmergencia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen selection:bg-rose-200" style={{ background: 'linear-gradient(180deg, #f9f1f1 0%, #fdf6f0 30%, #f5f0ea 60%, #ede8e0 100%)' }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-20 pb-32">

        {/* Back */}
        <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-12">
          <ArrowLeft size={14} /> Projeto Autônomo
        </Link>

        {/* ══ HERO ══ */}
        <motion.section className="mb-16" {...fade()}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-rose-500/70">Fase 01 · Base 72</span>
          </div>
          <div className="flex items-start gap-4 md:gap-5 mb-6">
            <div className="p-3 md:p-4 bg-rose-100 rounded-2xl shrink-0 mt-1">
              <Tent className="text-rose-600" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-800 leading-tight">Abrigo de Emergência</h1>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed mt-3 max-w-2xl">
                Proteção térmica e estrutural com materiais acessíveis em diferentes cenários. Sem abrigo adequado, o corpo perde calor <strong className="text-stone-700">25x mais rápido</strong> com vento e até <strong className="text-stone-700">5x mais rápido</strong> com umidade.
              </p>
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-5 md:p-6">
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              Hipotermia não é fenômeno de montanha. <strong className="text-stone-800">Pode acontecer dentro de casa após apagão prolongado.</strong>
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              Este módulo ensina técnicas práticas, aplicáveis imediatamente, usando recursos comuns. O abrigo deve cumprir quatro funções:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {[
                { icon: Thermometer, label: 'Isolamento térmico' },
                { icon: Wind, label: 'Proteção contra vento' },
                { icon: Droplets, label: 'Proteção contra umidade' },
                { icon: Shield, label: 'Segurança estrutural' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/70 rounded-xl p-3 text-center">
                  <Icon size={18} className="text-rose-500 mx-auto mb-1.5" />
                  <span className="text-[11px] font-semibold text-stone-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ 1 — ISOLAMENTO TÉRMICO DOMÉSTICO ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Isolamento Térmico Doméstico</h2>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed mb-4">O corpo humano perde calor por quatro vias:</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { title: 'Condução', desc: 'Contato com superfícies frias' },
              { title: 'Convecção', desc: 'Vento' },
              { title: 'Radiação', desc: 'Perda térmica natural' },
              { title: 'Evaporação', desc: 'Suor e umidade' },
            ].map(item => (
              <div key={item.title} className="bg-white/80 border border-stone-200/60 rounded-xl p-3">
                <span className="text-xs font-bold text-rose-600 block mb-1">{item.title}</span>
                <span className="text-[11px] text-stone-500">{item.desc}</span>
              </div>
            ))}
          </div>

          {/* Técnica 1 — Quarto Núcleo */}
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl overflow-hidden mb-4">
            <img src={imgQuartoNucleo} alt="Quarto Núcleo preparado para emergência" className="w-full h-48 md:h-64 object-cover" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Home size={16} className="text-rose-500" />
                <h3 className="text-lg font-bold text-stone-800">Técnica 1 — "Quarto Núcleo"</h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Em caso de frio intenso, escolha o <strong className="text-stone-800">menor cômodo da casa</strong>. Quanto menor o volume de ar, mais fácil manter temperatura.
              </p>
              <div className="space-y-2">
                {[
                  'Fechar todas as portas internas',
                  'Isolar frestas com toalhas',
                  'Cobrir janelas com papelão + manta',
                  'Usar tapetes ou papelão no chão',
                  'Concentrar todos no mesmo ambiente',
                ].map(step => (
                  <div key={step} className="flex items-start gap-2">
                    <span className="text-rose-500 text-sm mt-0.5">✔</span>
                    <span className="text-stone-600 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Técnica 2 — Isolamento do Solo */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-800 mb-3">Técnica 2 — Isolamento do Solo</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              <strong className="text-stone-800">Nunca dormir diretamente no chão frio.</strong> O chão drena calor corporal continuamente.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Papelão em camadas', 'Tapetes empilhados', 'Colchões infláveis', 'Madeira reaproveitada'].map(item => (
                <div key={item} className="bg-white/70 rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ 2 — AQUECIMENTO SEGURO SEM ENERGIA ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Aquecimento Seguro sem Energia</h2>
          </div>

          {/* Alerta CO */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-700">Nunca usar churrasqueira ou fogão a carvão dentro de casa</span>
            </div>
            <p className="text-red-600 text-xs leading-relaxed">Risco de monóxido de carbono é real. Monóxido é invisível e letal.</p>
          </div>

          {/* Aquecimento passivo */}
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl p-5 md:p-6 mb-4">
            <h3 className="text-base font-bold text-stone-800 mb-3">Método Seguro — Aquecimento Passivo</h3>
            <div className="space-y-2">
              {[
                'Camadas de roupa (não uma peça grossa)',
                'Cobertores múltiplos',
                'Gorro (perda de calor pela cabeça é significativa)',
                'Água morna em garrafa PET envolta em pano',
              ].map(step => (
                <div key={step} className="flex items-start gap-2">
                  <span className="text-rose-500 text-sm mt-0.5">✔</span>
                  <span className="text-stone-600 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aquecedor de vela */}
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl overflow-hidden">
            <img src={imgAquecedorVela} alt="Aquecedor artesanal de vela com vasos de cerâmica" className="w-full h-48 md:h-64 object-cover" />
            <div className="p-5 md:p-6">
              <h3 className="text-base font-bold text-stone-800 mb-3">Técnica Manual — Aquecedor de Vela Controlado</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-2">Materiais</span>
                  <ul className="space-y-1">
                    {['2 vasos de cerâmica', '1 vela grossa', 'Base não inflamável'].map(m => (
                      <li key={m} className="text-stone-600 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-2">Montagem</span>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Colocar vaso menor invertido sobre vela. Vaso maior cobrindo parcialmente. A cerâmica acumula calor e libera lentamente.
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                <p className="text-amber-700 text-xs font-semibold">⚠ Usar somente em ambiente ventilado e sob supervisão.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ 3 — PROTEÇÃO CONTRA VENTO ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Proteção Contra Vento</h2>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            <strong className="text-stone-800">Vento remove calor mais rápido que frio estático.</strong>
          </p>
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-800 mb-3">Técnica Manual de Vedação</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Fita adesiva larga',
                'Espuma expansiva (se disponível)',
                'Toalhas enroladas na base da porta',
                'Plástico grosso fixado em janelas',
              ].map(item => (
                <div key={item} className="bg-stone-50 rounded-xl p-3 flex items-center gap-2">
                  <Wind size={14} className="text-rose-400 shrink-0" />
                  <span className="text-xs font-semibold text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ 4 — CONTROLE DE UMIDADE ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Controle de Umidade</h2>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            Umidade aumenta risco de <strong className="text-stone-800">hipotermia e infecção respiratória</strong>.
          </p>
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-800 mb-3">Estratégias Simples</h3>
            <div className="space-y-2">
              {[
                'Ventilar ambiente brevemente 2x ao dia',
                'Manter roupas secas',
                'Não cozinhar dentro do quarto núcleo',
                'Elevar colchões do chão',
              ].map(step => (
                <div key={step} className="flex items-start gap-2">
                  <span className="text-rose-500 text-sm mt-0.5">✔</span>
                  <span className="text-stone-600 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ 5 — ABRIGO IMPROVISADO FORA DE CASA ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Abrigo Improvisado Fora de Casa</h2>
          </div>

          {/* A-Frame */}
          <div className="bg-white/80 border border-stone-200/60 rounded-2xl overflow-hidden mb-4">
            <img src={imgAFrame} alt="Abrigo A-Frame com lona" className="w-full h-48 md:h-64 object-cover" />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <TreePine size={16} className="text-rose-500" />
                <h3 className="text-lg font-bold text-stone-800">Técnica 1 — Abrigo com Lona (A-Frame)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-2">Materiais</span>
                  <ul className="space-y-1">
                    {['Lona', 'Corda', 'Galhos'].map(m => (
                      <li key={m} className="text-stone-600 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-2">Montagem</span>
                  <ol className="space-y-1">
                    {[
                      'Amarrar corda entre duas árvores',
                      'Estender lona formando triângulo',
                      'Fixar laterais ao solo',
                      'Isolar chão com folhas secas + plástico',
                    ].map((s, i) => (
                      <li key={i} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="text-rose-500 font-bold text-xs mt-0.5">{i + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Material Urbano */}
          <div className="bg-stone-100/80 border border-stone-200/60 rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-bold text-stone-800 mb-3">Técnica 2 — Abrigo com Material Urbano</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              <strong className="text-stone-800">Criar barreira contra vento é prioridade maior que estética.</strong>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Paletes', 'Portas antigas', 'Placas de madeira', 'Estruturas metálicas'].map(item => (
                <div key={item} className="bg-white/70 rounded-lg p-2.5 text-center">
                  <span className="text-xs font-semibold text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ 6 — ORGANIZAÇÃO INTERNA ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Organização Interna do Abrigo</h2>
          </div>

          <div className="bg-white/80 border border-stone-200/60 rounded-2xl overflow-hidden">
            <img src={imgOrganizacao} alt="Abrigo organizado com áreas definidas" className="w-full h-48 md:h-64 object-cover" />
            <div className="p-5 md:p-6">
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                <strong className="text-stone-800">Evitar caos.</strong> Ordem reduz estresse e aumenta eficiência.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Layers, label: 'Área de dormir' },
                  { icon: Shield, label: 'Área de armazenamento' },
                  { icon: Thermometer, label: 'Área de iluminação' },
                  { icon: Droplets, label: 'Área de higiene' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-rose-50/60 rounded-xl p-3 flex items-center gap-2">
                    <Icon size={14} className="text-rose-500 shrink-0" />
                    <span className="text-xs font-semibold text-stone-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ RISCOS REAIS ══ */}
        <motion.section className="mb-14" {...fade()}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={20} className="text-red-500" />
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Riscos Reais</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-amber-700 mb-3">Hipotermia Leve</h3>
              <ul className="space-y-1.5">
                {['Tremores', 'Confusão', 'Fala lenta'].map(s => (
                  <li key={s} className="text-stone-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200/60 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-red-700 mb-3">Hipotermia Grave</h3>
              <ul className="space-y-1.5">
                {['Sonolência', 'Perda de coordenação', 'Diminuição de pulso'].map(s => (
                  <li key={s} className="text-stone-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm font-semibold flex items-start gap-2">
              <Heart size={16} className="shrink-0 mt-0.5" />
              Em caso grave → aquecimento gradual, nunca água muito quente direta.
            </p>
          </div>
        </motion.section>

        {/* ══ PRINCÍPIO CENTRAL ══ */}
        <motion.section className="mb-8" {...fade()}>
          <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8 text-center">
            <Tent size={28} className="mx-auto mb-4 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold mb-3">Princípio Operacional</h2>
            <p className="text-stone-300 text-sm leading-relaxed max-w-lg mx-auto mb-4">
              Abrigo não é luxo. É controle térmico. É proteção energética. É preservação fisiológica.
            </p>
            <p className="text-rose-400 text-sm font-bold">
              Nos primeiros três dias, ele define resistência física e mental.
            </p>
          </div>
        </motion.section>

        {/* Back bottom */}
        <div className="text-center pt-8">
          <Link to="/projeto-autonomo" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-700 text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
            <ArrowLeft size={14} /> Voltar ao Projeto Autônomo
          </Link>
        </div>
      </div>
    </div>
  );
}
