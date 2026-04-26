import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

interface BackNavProps {
  /** Rota do hub (ex: /soberania-organica/cozinha-funcional) */
  backTo: string;
  /** Rótulo do botão voltar */
  backLabel?: string;
}

const BackNav = ({ backTo, backLabel = "Voltar" }: BackNavProps) => (
  <div className="inline-flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.2em]">
    <Link
      to={backTo}
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      {backLabel}
    </Link>
    <span className="opacity-30">/</span>
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
    >
      <Home size={14} className="group-hover:scale-110 transition-transform" />
      Início
    </Link>
  </div>
);

export default BackNav;
