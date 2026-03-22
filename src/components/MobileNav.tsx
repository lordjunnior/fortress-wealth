import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Zap, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import GlobalSearch from "@/components/GlobalSearch";
import { topNavItems, navGroups, type NavItem } from "@/lib/sidebarNavigation";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const { level, label, percent } = useReadingProgress();

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupLabel)) next.delete(groupLabel);
      else next.add(groupLabel);
      return next;
    });
  };

  const handleNav = (item: NavItem) => {
    setOpen(false);
    if (item.route) {
      navigate(item.route);
    } else if (item.targetId) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.targetId!)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.getElementById(item.targetId!)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (route?: string) => route && location.pathname === route;

  return (
    <div className="lg:hidden fixed top-[46px] left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-md border border-border flex items-center justify-center text-foreground"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Search trigger for mobile */}
      <div className="lg:hidden fixed top-[46px] right-4 z-50">
        <GlobalSearch />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 shadow-2xl max-h-[75vh] overflow-y-auto"
          >
            {/* Top items */}
            {topNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                  isActive(item.route)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.icon && (
                  <div className="relative">
                    <item.icon className={`w-4 h-4 ${item.alert ? "text-destructive" : ""}`} />
                    {item.alert && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive/60 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                      </span>
                    )}
                  </div>
                )}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="h-px bg-border/30 my-2" />

            {/* Accordion Groups */}
            {navGroups.map((group) => {
              const isGroupOpen = openGroups.has(group.label);

              return (
                <div key={group.label} className="mb-0.5">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all text-sm font-medium"
                  >
                    <group.icon className={`w-4 h-4 ${group.color || ""} flex-shrink-0`} />
                    <span className="flex-1 text-left truncate">{group.label}</span>
                    <span className="font-mono text-[9px] text-muted-foreground/50 mr-1">{group.items.length}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isGroupOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 pl-3 border-l border-border/30 py-1 space-y-0.5">
                          {group.items.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNav(item)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-md transition-all text-[13px] ${
                                isActive(item.route)
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground/80 hover:text-foreground hover:bg-secondary/30"
                              }`}
                            >
                              {item.label}
                              {item.badge && (
                                <span className="ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="h-px bg-border/30 my-2" />

            {/* Reading level + Apoio */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[8px] tracking-wider text-muted-foreground">NÍVEL {level}</span>
                <span className="font-mono text-[8px] text-gold">{percent}%</span>
              </div>
              <p className="text-[9px] text-foreground font-medium mb-1.5">{label}</p>
              <div className="h-[2px] bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
              </div>
            </div>
            <button
              onClick={() => handleNav({ targetId: "apoio", label: "Apoio" })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-gold-dim/50 text-gold text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              Apoio
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
