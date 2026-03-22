import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LayoutGrid, BookOpen, Headphones, Wrench, QrCode, Zap, Library, ShieldAlert, Shield, Globe, Compass, Search } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import GlobalSearch from "@/components/GlobalSearch";

const menuItems = [
  { icon: Compass, label: "Por onde começar?", route: "/por-onde-comecar" },
  { icon: ShieldAlert, label: "Protocolo Inicial", route: "/protocolo-inicial", alert: true },
  { icon: LayoutGrid, label: "Manifesto", targetId: "manifesto" },
  { icon: BookOpen, label: "Educação", route: "/educacao" },
  { icon: Headphones, label: "Audioteca", route: "/audiobooks" },
  { icon: Library, label: "E-books", route: "/ebooks" },
  { icon: Wrench, label: "Ferramentas", route: "/ferramentas" },
  { icon: QrCode, label: "PIX Crypto", route: "/pix-cripto" },
  { icon: Shield, label: "Soberania Orgânica", route: "/soberania-organica" },
  { icon: Globe, label: "Soberania Financeira", route: "/soberania-financeira" },
  { icon: BookOpen, label: "Alfabeto Cripto", route: "/dicionario-cripto" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { level, label, percent } = useReadingProgress();

  const handleNav = (item: { route?: string; targetId?: string }) => {
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

      {open && (
        <div className="absolute top-12 left-0 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 space-y-1 shadow-2xl max-h-[70vh] overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          <div className="pt-1 border-t border-border mt-1">
            {/* Reading level */}
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
              onClick={() => handleNav({ targetId: "apoio" })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-gold-dim/50 text-gold text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              Apoio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
