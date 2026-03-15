import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Shield, Sprout, BookOpen, Bitcoin, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

const SILOS = [
  {
    title: "Soberania Financeira",
    desc: "Bitcoin, autocustódia e proteção patrimonial fora do sistema.",
    icon: Bitcoin,
    href: "/soberania-financeira",
    color: "text-amber-400",
    bg: "bg-amber-500/[0.08] border-amber-500/[0.15] hover:bg-amber-500/[0.14]",
  },
  {
    title: "Autonomia Biológica",
    desc: "Saúde, fitoterapia e independência do sistema farmacêutico.",
    icon: Sprout,
    href: "/projeto-autonomo/autonomia-biologica",
    color: "text-emerald-400",
    bg: "bg-emerald-500/[0.08] border-emerald-500/[0.15] hover:bg-emerald-500/[0.14]",
  },
  {
    title: "Conhecimento Perdido",
    desc: "Sabedoria ancestral que o sistema não quer que você aprenda.",
    icon: BookOpen,
    href: "/projeto-autonomo/conhecimento-perdido",
    color: "text-rose-400",
    bg: "bg-rose-500/[0.08] border-rose-500/[0.15] hover:bg-rose-500/[0.14]",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404: Página Confiscada pelo Sistema | Lord Junnior</title>
        <meta name="description" content="Esta página não existe, mas seu conhecimento não pode ser bloqueado. Acesse o Arsenal de Soberania completo." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center px-5 py-20 relative overflow-hidden" style={{ background: '#050808' }}>
        {/* VFX */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-red-500/[0.04] blur-[120px] top-[20%] left-[15%] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-amber-500/[0.03] blur-[100px] bottom-[25%] right-[10%] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center">
          {/* Ícone */}
          <motion.div {...fade(0)} className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/[0.1] border border-red-500/[0.2]">
              <Lock size={36} className="text-red-500" />
            </div>
          </motion.div>

          {/* Copy Principal */}
          <motion.div {...fade(0.1)}>
            <span className="text-red-500 font-mono text-xs font-bold tracking-[0.3em] uppercase mb-3 block">ERRO 404</span>
            <h1 className="text-3xl md:text-5xl font-black text-stone-100 mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
              Página Confiscada pelo Sistema
            </h1>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-2">
              Felizmente, <strong className="text-stone-200">seu conhecimento não pode ser bloqueado</strong>.
            </p>
            <p className="text-stone-500 text-sm font-mono mb-10">
              Rota tentada: <code className="text-red-400/70">{location.pathname}</code>
            </p>
          </motion.div>

          {/* Silos CTAs */}
          <motion.div {...fade(0.25)} className="grid gap-3 mb-10">
            {SILOS.map((silo) => (
              <Link
                key={silo.href}
                to={silo.href}
                className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 text-left group ${silo.bg}`}
              >
                <div className={`flex-shrink-0 ${silo.color}`}>
                  <silo.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-200 group-hover:text-white transition-colors">{silo.title}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{silo.desc}</p>
                </div>
                <ArrowRight size={16} className="text-stone-600 group-hover:text-stone-300 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </motion.div>

          {/* CTA Home + Arsenal */}
          <motion.div {...fade(0.35)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-stone-300 hover:text-white hover:bg-white/[0.1] text-sm font-semibold transition-all"
            >
              <Shield size={14} />
              Voltar à Base
            </Link>
            <Link
              to="/mapa-da-soberania"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/[0.1] border border-amber-500/[0.2] rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-500/[0.15] text-sm font-semibold transition-all"
            >
              Mapa da Soberania
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
