import { useState } from "react";
import { Instagram, Youtube, Twitter, Github, ChevronDown, Zap } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";
import ReadingLevelIndicator from "@/components/ReadingLevelIndicator";
import GlobalSearch from "@/components/GlobalSearch";
import JourneyMap from "@/components/JourneyMap";
import { topNavItems, navGroups, type NavItem } from "@/lib/sidebarNavigation";

const socialLinks = [
  { icon: Instagram, url: "https://instagram.com/lordjunnior", label: "Instagram" },
  { icon: Youtube, url: "https://youtube.com/@lordjunnior", label: "Youtube" },
  { icon: Twitter, url: "https://x.com/lordjunnior", label: "X" },
  { icon: Github, url: "https://github.com/lordjunnior", label: "Github" },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    // Auto-open the group that contains the current route
    const initial = new Set<string>();
    for (const group of navGroups) {
      if (group.items.some(item => item.route && location.pathname.startsWith(item.route))) {
        initial.add(group.label);
      }
    }
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleNav = (item: NavItem) => {
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

  const handleApoio = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("apoio")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("apoio")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (route?: string) => route && location.pathname === route;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] z-50 flex-col border-r border-border/50 bg-[#070A12]/95 backdrop-blur-xl">
      {/* Compact Identity Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
        <img
          src={profilePhoto}
          alt="Lord Junnior"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/30"
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xs tracking-wider text-foreground">LORD JUNNIOR</h2>
          <div className="flex items-center gap-2 mt-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-border/50">
        <GlobalSearch />
      </div>

      {/* Reading Level */}
      <ReadingLevelIndicator />

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Top fixed items */}
        {topNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm ${
              isActive(item.route)
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {item.icon && (
              <div className="relative">
                <item.icon className={`w-4 h-4 ${item.alert ? "text-destructive/80" : "group-hover:text-gold"} transition-colors`} />
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

        {/* Divider */}
        <div className="h-px bg-border/30 mx-2 my-2" />

        {/* Accordion Groups */}
        {navGroups.map((group) => {
          const isOpen = openGroups.has(group.label);
          const hasActiveChild = group.items.some(item => isActive(item.route));

          return (
            <div key={group.label} className="mb-0.5">
              <button
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  hasActiveChild
                    ? "text-foreground bg-secondary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                <group.icon className={`w-4 h-4 ${group.color || "text-muted-foreground"} flex-shrink-0`} />
                <span className="flex-1 text-left truncate">{group.label}</span>
                <span className="font-mono text-[9px] text-muted-foreground/60 mr-1">
                  {group.items.length}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-3 border-l border-border/30 py-1 space-y-0.5">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleNav(item)}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all duration-150 text-[13px] ${
                            isActive(item.route)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground/80 hover:text-foreground hover:bg-secondary/30"
                          }`}
                        >
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary animate-pulse">
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

        {/* Divider */}
        <div className="h-px bg-border/30 mx-2 my-2" />

        {/* Journey Map */}
        <JourneyMap />
      </nav>

      {/* Lightning Support Button */}
      <div className="px-3 py-3 border-t border-border/50">
        <button
          onClick={handleApoio}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold-dim/50 bg-card text-gold font-semibold text-sm hover:border-gold hover:bg-gold/5 transition-all duration-300"
        >
          <Zap className="w-4 h-4" />
          Apoio Lightning
        </button>
        <p className="font-mono text-[8px] text-muted-foreground/40 tracking-widest text-center mt-2">
          AUTOCUSTÓDIA É LIBERDADE
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;
