import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackToHome = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-[0.2em] transition-colors group"
  >
    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
    Início
  </Link>
);

export default BackToHome;
