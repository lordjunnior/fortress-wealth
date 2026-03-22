import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X, CheckCircle, Circle } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { navGroups } from "@/lib/sidebarNavigation";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const JourneyMap = () => {
  const [open, setOpen] = useState(false);
  const { visited, total, percent, label, level } = useReadingProgress();
  const navigate = useNavigate();

  const visitedSet = new Set<string>();
  try {
    const raw = localStorage.getItem("bp_reading_progress");
    if (raw) JSON.parse(raw).forEach((p: string) => visitedSet.add(p));
  } catch {}

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 group"
      >
        <Map className="w-4 h-4 group-hover:text-gold transition-colors" />
        <span className="text-[13px] font-medium">Mapa da Jornada</span>
        <span className="ml-auto font-mono text-[9px] text-gold">{percent}%</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-border/40 bg-[#0a0d14]/98 backdrop-blur-xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/30 sticky top-0 bg-[#0a0d14]/98 backdrop-blur-xl z-10">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Map className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground text-lg tracking-tight">Mapa da Jornada</h2>
                      <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                        NÍVEL {level} — {label} · <span className="text-gold">{visited}/{total} páginas · {percent}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Global progress */}
              <div className="px-6 py-3 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[5px] bg-secondary/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: EASE }}
                      className="h-full gradient-gold rounded-full"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-gold font-bold">{percent}%</span>
                </div>
              </div>

              {/* Categories - using navGroups for consistency */}
              <div className="overflow-y-auto max-h-[calc(85vh-160px)] px-6 py-5 space-y-6">
                {navGroups.map((group) => {
                  const pages = group.items.filter(i => i.route);
                  const catVisited = pages.filter(p => visitedSet.has(p.route!)).length;
                  const catPercent = pages.length > 0 ? Math.round((catVisited / pages.length) * 100) : 0;

                  return (
                    <div key={group.label}>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                          <group.icon className={`w-4 h-4 ${group.color || "text-muted-foreground"}`} />
                          <h3 className="text-sm font-bold text-foreground">{group.label}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-[3px] bg-secondary/40 rounded-full overflow-hidden">
                            <div className="h-full gradient-gold rounded-full transition-all" style={{ width: `${catPercent}%` }} />
                          </div>
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {catVisited}/{pages.length}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {pages.map((page) => {
                          const isVisited = visitedSet.has(page.route!);
                          return (
                            <button
                              key={page.route}
                              onClick={() => {
                                setOpen(false);
                                navigate(page.route!);
                              }}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[12px] transition-all duration-200 ${
                                isVisited
                                  ? "bg-gold/8 text-foreground border border-gold/15"
                                  : "bg-secondary/20 text-muted-foreground border border-transparent hover:border-border/40 hover:text-foreground hover:bg-secondary/40"
                              }`}
                            >
                              {isVisited ? (
                                <CheckCircle className="w-3 h-3 text-gold shrink-0" />
                              ) : (
                                <Circle className="w-3 h-3 text-muted-foreground/25 shrink-0" />
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JourneyMap;
