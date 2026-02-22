import { useState } from "react";
import { Menu, X, LayoutGrid, BookOpen, Headphones, Wrench, QrCode, Zap } from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Manifesto", targetId: "manifesto" },
  { icon: BookOpen, label: "Educação", targetId: "educacao" },
  { icon: Headphones, label: "Audioteca", targetId: "audioteca" },
  { icon: Wrench, label: "Ferramentas", targetId: "ferramentas" },
  { icon: QrCode, label: "PIX Crypto", targetId: "pix-crypto" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-md border border-border flex items-center justify-center text-foreground"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-12 left-0 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 space-y-1 shadow-2xl">
          {menuItems.map((item) => (
            <button
              key={item.targetId}
              onClick={() => scrollTo(item.targetId)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          <div className="pt-1 border-t border-border mt-1">
            <button
              onClick={() => scrollTo("apoio")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-gold-dim/50 text-gold text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              Apoio ⚡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
