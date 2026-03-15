import { Link } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';

interface MicroCtaResistenciaProps {
  variant?: 'default' | 'alimentar' | 'saude' | 'conhecimento';
}

const COPY: Record<string, { titulo: string; corpo: string; cta: string; link: string }> = {
  default: {
    titulo: 'Blindagem Patrimonial',
    corpo: 'Autonomia física sem soberania financeira é incompleta. Se o Estado pode confiscar seu capital para taxar sua terra, de nada adianta produzir seu próprio alimento.',
    cta: 'Blindar minha saída →',
    link: '/autocustodia',
  },
  alimentar: {
    titulo: 'Soberania Alimentar + Financeira',
    corpo: 'Cultivar sua própria comida é o primeiro passo. O segundo é garantir que ninguém possa confiscar o capital que financia sua autonomia.',
    cta: 'Proteger meu patrimônio →',
    link: '/autocustodia',
  },
  saude: {
    titulo: 'Saúde Soberana, Patrimônio Blindado',
    corpo: 'Cuidar da sua saúde sem depender do sistema é essencial. Mas se o Estado pode congelar sua conta, até remédio vira luxo. Blinde sua reserva.',
    cta: 'Aprender autocustódia →',
    link: '/autocustodia',
  },
  conhecimento: {
    titulo: 'Conhecimento + Proteção',
    corpo: 'O conhecimento ancestral te liberta do sistema de saúde. A autocustódia te liberta do sistema financeiro. Um sem o outro é blindagem pela metade.',
    cta: 'Completar minha blindagem →',
    link: '/autocustodia',
  },
};

export default function MicroCtaResistencia({ variant = 'default' }: MicroCtaResistenciaProps) {
  const c = COPY[variant];

  return (
    <div className="my-12 mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] via-orange-500/[0.03] to-transparent p-6 md:p-8">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Shield size={20} className="text-amber-400" />
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-1">{c.titulo}</h4>
            <p className="text-stone-400 text-sm leading-relaxed">{c.corpo}</p>
          </div>

          <Link
            to={c.link}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-500 group"
          >
            {c.cta}
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
