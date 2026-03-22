import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Circle, TrendingDown, Shield, Activity, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useSiloProgress } from "@/hooks/useSiloProgress";
import { navGroups } from "@/lib/sidebarNavigation";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const authorityIndicators = [
  { label: "Páginas Técnicas", value: "90+", icon: Activity, color: "text-amber-500" },
  { label: "Dossiês de Autoridade", value: "14", icon: Shield, color: "text-emerald-400" },
  { label: "Inflação Acumulada (2020–2026)", value: "42.7%", icon: TrendingDown, color: "text-destructive" },
  { label: "Bitcoin Halvings Restantes", value: "~28", icon: Flame, color: "text-amber-400" },
];

const RightSidebar = () => {
  const { visited, total, percent, level, label } = useReadingProgress();
  const siloProgress = useSiloProgress();
  const navigate = useNavigate();
  const location = useLocation();

  const visitedSet = new Set<string>();
  try {
    const raw = localStorage.getItem("bp_reading_progress");
    if (raw) JSON.parse(raw).forEach((p: string) => visitedSet.add(p));
  } catch {}

  return (
    <aside className="hidden 2xl:flex fixed right-0 top-[36px] bottom-0 w-[340px] z-40 flex-col border-l border-border/30 bg-[#060810]/95 backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Mapa da Jornada
          </h3>
          <span className="font-mono text-[11px] text-gold font-bold">{percent}%</span>
        </div>
        <p className="text-[11px] text-foreground font-medium mb-2">
          Nível {level} — {label}
        </p>
        <div className="h-[4px] bg-secondary/40 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-full gradient-gold rounded-full"
          />
        </div>
        <p className="font-mono text-[9px] text-muted-foreground mt-1.5">
          {visited}/{total} páginas concluídas
        </p>
      </div>

      {/* Authority Indicators */}
      <div className="px-4 py-3 border-b border-border/30">
        <h4 className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground uppercase mb-2.5">
          Indicadores de Autoridade
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {authorityIndicators.map((ind) => (
            <div
              key={ind.label}
              className="bg-card/50 border border-border/30 rounded-lg px-3 py-2.5 flex flex-col items-center text-center"
            >
              <ind.icon className={`w-3.5 h-3.5 ${ind.color} mb-1`} />
              <span className="font-mono text-sm font-bold text-foreground">{ind.value}</span>
              <span className="text-[8px] text-muted-foreground leading-tight mt-0.5">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Silo Progress */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {navGroups.map((group) => {
          const progress = siloProgress[group.label];
          const pages = group.items.filter(i => i.route);

          return (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-1.5">
                <group.icon className={`w-3.5 h-3.5 ${group.color || "text-muted-foreground"}`} />
                <span className="text-[11px] font-semibold text-foreground flex-1 truncate">{group.label}</span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {progress?.visited || 0}/{progress?.total || pages.length}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="h-[3px] bg-secondary/40 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full gradient-gold rounded-full transition-all duration-700"
                  style={{ width: `${progress?.percent || 0}%` }}
                />
              </div>
              {/* Page checklist */}
              <div className="space-y-0.5">
                {pages.map((page) => {
                  const isVisited = visitedSet.has(page.route!);
                  const isActive = location.pathname === page.route;
                  return (
                    <button
                      key={page.route}
                      onClick={() => navigate(page.route!)}
                      className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[10px] transition-all ${
                        isActive
                          ? "text-gold font-semibold bg-gold/5"
                          : isVisited
                          ? "text-foreground/70"
                          : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary/20"
                      }`}
                    >
                      {isVisited ? (
                        <CheckCircle className="w-2.5 h-2.5 text-gold shrink-0" />
                      ) : (
                        <Circle className="w-2.5 h-2.5 text-muted-foreground/20 shrink-0" />
                      )}
                      <span className="truncate">{page.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer stamp */}
      <div className="px-4 py-3 border-t border-border/30">
        <p className="font-mono text-[7px] text-muted-foreground/30 tracking-[0.25em] text-center">
          SISTEMA DE SOBERANIA INDIVIDUAL
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
