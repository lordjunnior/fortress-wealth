import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, ArrowRight, Users } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface SovereignDisclaimerProps {
  /** Type of page for contextual copy */
  variant?: 'exchange' | 'bank' | 'payment' | 'offshore' | 'surveillance';
}

const contextCopy: Record<string, { badge: string; title: string; body: string }> = {
  exchange: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Este conteúdo existe por um único motivo.',
    body: 'Dezenas de seguidores no Instagram relataram que suas contas em exchanges tradicionais foram comprometidas, bloqueadas ou confiscadas — e pediram ajuda para criar uma alternativa sigilosa, fora do radar. Este tutorial não é uma recomendação de uso. É uma resposta direta a quem já perdeu o acesso ao próprio dinheiro e precisa de uma rota de contingência.',
  },
  bank: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Conta internacional não substitui autocustódia.',
    body: 'Este guia foi criado porque dezenas de seguidores no Instagram pediram ajuda para diversificar jurisdições após terem contas bloqueadas ou valores retidos. Nenhuma conta bancária — nacional ou internacional — te dá posse real do seu dinheiro. Isso aqui é um plano B tático, não a solução final.',
  },
  payment: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Pagar com cripto via Pix não é autocustódia.',
    body: 'Vários seguidores no Instagram pediram este tutorial porque já estão com contas comprometidas e querem criar uma rota alternativa — totalmente sigilosa — para movimentar valores sem depender de bancos tradicionais. Não estamos recomendando que você mantenha fundos em exchanges. Estamos ensinando uma saída tática para quem já precisa.',
  },
  offshore: {
    badge: 'AVISO DE SOBERANIA',
    title: 'Offshore é blindagem. Não é soberania.',
    body: 'Pedidos da comunidade no Instagram motivaram este material: pessoas com patrimônio retido, contas bloqueadas sem justificativa e medo real de confisco. Uma conta offshore diversifica jurisdição, mas não te dá controle absoluto. Para isso, você precisa de autocustódia.',
  },
  surveillance: {
    badge: 'ALERTA DE SOBERANIA',
    title: 'Vigilância financeira é real. Este conteúdo é defesa.',
    body: 'A comunidade no Instagram pediu este material após enfrentar bloqueios, monitoramento e restrições reais em suas contas. Este conteúdo documenta ameaças e oferece protocolos práticos de proteção — não é teoria conspiratória, é preparação baseada em fatos.',
  },
};

export default function SovereignDisclaimer({ variant = 'exchange' }: SovereignDisclaimerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const copy = contextCopy[variant];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto max-w-4xl my-12 md:my-16"
    >
      <div className="relative overflow-hidden rounded-sm border border-amber-500/30 bg-amber-500/[0.04] backdrop-blur-md">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        
        {/* Pulsing glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(245,158,11,0.06),_transparent_60%)]" />

        <div className="relative p-6 md:p-10">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-[ping_3s_ease-in-out_infinite]" />
              <AlertTriangle className="relative w-5 h-5 text-amber-500" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-amber-500 uppercase font-bold">
              {copy.badge}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            {copy.title}
          </h3>

          {/* Body */}
          <div className="flex items-start gap-3 mb-5">
            <Users className="w-5 h-5 text-amber-500/70 mt-0.5 shrink-0" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {copy.body}
            </p>
          </div>

          {/* Core message */}
          <div className="flex items-start gap-3 p-4 rounded-sm bg-card/60 border border-amber-500/15 mb-6">
            <Shield className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/90 leading-relaxed">
              <span className="font-bold text-amber-500">A tese deste site é uma só:</span>{' '}
              seu dinheiro só é seu quando está sob sua custódia direta — sem intermediários, 
              sem permissão de terceiros, sem risco de confisco. Tudo que sai dessa premissa é 
              ferramenta tática, não destino final.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/autocustodia"
            className="group inline-flex items-center gap-3 py-3 px-6 rounded-sm border border-amber-500/30 
              bg-amber-500/[0.06] hover:bg-amber-500/[0.15] hover:border-amber-500/50 
              text-amber-500 font-semibold text-sm tracking-wide transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Entenda a Autocustódia — a verdadeira solução
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>
    </motion.section>
  );
}
