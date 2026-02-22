import { Instagram, Youtube, Twitter, Github, LayoutGrid, BookOpen, Headphones, Wrench, QrCode, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const menuItems = [
  { icon: LayoutGrid, label: "Manifesto", targetId: "manifesto" },
  { icon: BookOpen, label: "Educação", targetId: "educacao" },
  { icon: Headphones, label: "Audioteca", targetId: "audioteca" },
  { icon: Wrench, label: "Ferramentas", targetId: "ferramentas" },
  { icon: QrCode, label: "PIX Crypto", targetId: "pix-crypto" },
];

const socialLinks = [
  { icon: Instagram, url: "https://instagram.com/lordjunnior", label: "Instagram" },
  { icon: Youtube, url: "https://youtube.com/@lordjunnior", label: "Youtube" },
  { icon: Twitter, url: "https://x.com/lordjunnior", label: "X" },
  { icon: Github, url: "https://github.com/lordjunnior", label: "Github" },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const AppSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] z-50 flex-col border-r border-border/50 bg-[#070A12]/95 backdrop-blur-xl">
      {/* Profile Photo - Square, full width */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={profilePhoto}
          alt="Lord Junnior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Identity */}
      <div className="px-5 py-4 border-b border-border/50">
        <h2 className="font-bold text-sm tracking-wider text-foreground">LORD JUNNIOR</h2>
        <div className="flex items-center gap-3 mt-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Alert Text */}
      <div className="px-5 py-4 border-b border-border/50">
        <p className="text-[10px] text-muted-foreground leading-relaxed tracking-wide uppercase">
          AQUI EU NÃO VENDO BITCOIN... EU ENSINO COMO SAIR DO CABRESTO ESTATAL...
        </p>
        <p className="text-[10px] text-foreground font-bold leading-relaxed mt-2">
          Autocustódia é liberdade. Banco central é servidão.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.targetId}
            onClick={() => scrollToSection(item.targetId)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 group"
          >
            <item.icon className="w-4 h-4 group-hover:text-gold transition-colors" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Lightning Support Button */}
      <div className="px-3 pb-4">
        <button
          onClick={() => scrollToSection("apoio")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gold-dim/50 bg-card text-gold font-semibold text-sm hover:border-gold hover:bg-gold/5 transition-all duration-300"
        >
          <Zap className="w-4 h-4" />
          Apoio ⚡ Lightning
        </button>
      </div>

      {/* Footer seal */}
      <div className="px-5 py-3 border-t border-border/50">
        <p className="font-mono text-[9px] text-muted-foreground/50 tracking-widest text-center">
          NOT YOUR KEYS · NOT YOUR MONEY
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;
