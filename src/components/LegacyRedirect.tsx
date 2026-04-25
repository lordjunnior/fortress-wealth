import { Navigate, useLocation } from "react-router-dom";

/**
 * LegacyRedirect — Redireciona slugs antigos para novos preservando query/hash.
 * Equivalente a um 301 no client (React Router faz replace).
 * Para SEO: o sitemap.xml aponta apenas para os slugs NOVOS, então o Google
 * eventualmente removerá os antigos do índice. Backlinks externos continuam funcionando.
 */
interface LegacyRedirectProps {
  to: string;
}

export default function LegacyRedirect({ to }: LegacyRedirectProps) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
}
