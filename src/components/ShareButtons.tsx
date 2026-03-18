import { Share2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description?: string;
  className?: string;
}

const ShareButtons = ({ title, description = "", className = "" }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${title}${description ? ` — ${description}` : ""}`;

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      color: "hover:text-emerald-400 hover:border-emerald-500/30",
    },
    {
      label: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: "hover:text-sky-400 hover:border-sky-500/30",
    },
    {
      label: "X",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-foreground hover:border-foreground/30",
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase mr-1">Compartilhar</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground transition-all duration-300 ${link.color}`}
          aria-label={`Compartilhar no ${link.label}`}
        >
          <link.icon className="w-3.5 h-3.5" />
        </a>
      ))}
      <button
        onClick={handleNativeShare}
        className="p-2 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
        aria-label="Compartilhar ou copiar link"
      >
        {copied ? (
          <span className="text-[10px] font-mono text-primary">✓</span>
        ) : (
          <Share2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
