import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, Github, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useReadingProgress } from "@/hooks/useReadingProgress";

const socialLinks = [
  { icon: Instagram, url: "https://instagram.com/lordjunnior", label: "Instagram" },
  { icon: Youtube, url: "https://youtube.com/@lordjunnior", label: "Youtube" },
  { icon: Twitter, url: "https://x.com/lordjunnior", label: "X" },
  { icon: Github, url: "https://github.com/lordjunnior", label: "Github" },
];

const SovereignHeader = () => {
  const { percent } = useReadingProgress();

  // Square ring calculations
  const imageSize = 240;
  const strokeWidth = 2;
  const pad = 8;
  const totalSize = imageSize + pad * 2;
  const perimeter = (totalSize - strokeWidth) * 4;

  return (
    <div className="px-3 pt-5 pb-4 border-b border-border/30 flex flex-col items-center text-center">
      {/* Square Tactical Ring + Photo */}
      <div
        className="relative flex items-center justify-center group"
        style={{ width: `${totalSize}px`, height: `${totalSize}px` }}
      >
        {/* SVG Square Progress Ring */}
        <svg
          width={totalSize}
          height={totalSize}
          viewBox={`0 0 ${totalSize} ${totalSize}`}
          className="absolute inset-0 -rotate-90"
        >
          {/* Background ring */}
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={totalSize - strokeWidth}
            height={totalSize - strokeWidth}
            fill="transparent"
            stroke="hsl(var(--border) / 0.3)"
            strokeWidth={strokeWidth}
            rx={16}
          />
          {/* Progress ring */}
          <motion.rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={totalSize - strokeWidth}
            height={totalSize - strokeWidth}
            fill="transparent"
            stroke="hsl(var(--gold))"
            strokeWidth={strokeWidth}
            strokeDasharray={perimeter}
            initial={{ strokeDashoffset: perimeter }}
            animate={{ strokeDashoffset: perimeter - (perimeter * percent) / 100 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            rx={16}
          />
        </svg>

        {/* Square photo */}
        <div className="rounded-2xl overflow-hidden border border-border/20 shadow-[0_0_50px_-8px_hsl(var(--gold)/0.35)] relative z-10"
          style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
        >
          <img
            src={profilePhoto}
            alt="Lord Junnior — Estrategista de Soberania Individual"
            className="w-full h-full object-cover brightness-90 saturate-90 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-700"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      </div>

      {/* Authority Title */}
      <h2 className="text-lg font-black text-foreground tracking-tight mt-4 uppercase">
        Lord Junnior
      </h2>
      <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60 mt-0.5 uppercase">
        Estrategista de Soberania
      </p>

      {/* Progress Badge */}
      <div className="flex items-center gap-1.5 mt-3 bg-card/80 px-3 py-1.5 rounded-full border border-border/30">
        <Zap className="w-3.5 h-3.5 text-gold" />
        <span className="text-xs font-bold text-foreground">{percent}%</span>
        <span className="font-mono text-[8px] tracking-tight text-muted-foreground uppercase">Blindado</span>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3 mt-3">
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
  );
};

export default SovereignHeader;
