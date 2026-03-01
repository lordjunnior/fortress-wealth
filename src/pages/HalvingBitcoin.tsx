import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NoiseBackground from '@/components/NoiseBackground';

const HalvingBitcoin = () => {
  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Halving do Bitcoin</span>
        </nav>

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          VOLTAR AO INÍCIO
        </Link>

        {/* Page title */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
          Halving do Bitcoin: saiba quando será o próximo
        </h1>

        {/* Placeholder for content the user will provide */}
        <div className="card-wealth p-8 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            Conteúdo em breve...
          </p>
        </div>
      </div>
    </div>
  );
};

export default HalvingBitcoin;
