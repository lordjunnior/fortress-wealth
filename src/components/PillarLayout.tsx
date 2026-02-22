import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Headphones, Wrench, Download, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";
import type { Pillar } from "@/lib/pillars";

const resourceIcons = {
  ebook: BookOpen,
  audio: Headphones,
  tool: Wrench,
};

const resourceAccent = {
  ebook: { bg: "bg-gold/10", text: "text-gold", border: "border-gold/20" },
  audio: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  tool: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
};

const resourceLabel = {
  ebook: "EBOOK",
  audio: "AUDIOBOOK",
  tool: "FERRAMENTA",
};

const PillarLayout = ({ pillar }: { pillar: Pillar }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px] pb-10">
        {/* Back button */}
        <div className="section-padding pt-6 pb-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono tracking-wider text-xs">VOLTAR AO COMANDO</span>
          </motion.button>
        </div>

        {/* Hero */}
        <section className="section-padding pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                    {pillar.level}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                    {pillar.badge}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  {pillar.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-gradient-gold">
                    {pillar.title.split(" ").slice(-1)}
                  </span>
                </h1>

                <p className="text-muted-foreground text-lg mb-6">
                  {pillar.subtitle}
                </p>

                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
                    "{pillar.impactText}"
                  </p>
                </div>

                <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
                  {pillar.impactSub}
                </p>
              </motion.div>

              {/* Cover image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
                  <img
                    src={pillar.cover}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-3xl -z-10" />
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                RECURSOS DISPONÍVEIS
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            {/* Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillar.resources.map((resource, i) => {
                const Icon = resourceIcons[resource.type];
                const accent = resourceAccent[resource.type];
                const label = resourceLabel[resource.type];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="card-wealth flex flex-col group cursor-pointer"
                  >
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${accent.text}`} />
                      </div>
                      <span className={`font-mono text-[9px] tracking-widest ${accent.text} ${accent.bg} px-2.5 py-1 rounded border ${accent.border}`}>
                        {label}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {resource.description}
                    </p>

                    {/* Action button */}
                    <button
                      onClick={() => resource.route && navigate(resource.route)}
                      className={`w-full py-3.5 rounded-lg border ${accent.border} ${accent.text} font-semibold text-sm hover:${accent.bg} flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3`}
                    >
                      {resource.type === "ebook" && <Download className="w-4 h-4" />}
                      {resource.type === "audio" && <Play className="w-4 h-4" />}
                      {resource.type === "tool" && <ArrowRight className="w-4 h-4" />}
                      {resource.action}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-16 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mb-4">
                SISTEMA OPERACIONAL DE SOBERANIA
              </p>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </motion.div>
          </div>
        </section>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default PillarLayout;
