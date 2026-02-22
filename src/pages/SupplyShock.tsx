import React from 'react';
import { Hourglass, TrendingDown, Lock, AlertTriangle } from 'lucide-react';

const SupplyShock: React.FC = () => {
  const MAX_SUPPLY = 21000000;
  const MINED_SUPPLY = 19650000;
  const LOST_COINS = 4000000;
  const EXCHANGE_BALANCE = 1800000;
  const ETF_HOLDINGS = 900000;

  const REAL_AVAILABLE = EXCHANGE_BALANCE;
  const PERCENT_MINED = (MINED_SUPPLY / MAX_SUPPLY) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-mono">

      <div className="text-center mb-16 space-y-4">
        <Hourglass className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="text-5xl md:text-8xl font-black text-foreground uppercase tracking-tighter">
          Supply Shock
        </h1>
        <p className="text-gold text-xl font-bold uppercase tracking-[0.3em]">
          A porta está fechando
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        {/* Card 1: Mined */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Minerados</span>
          <div className="text-3xl text-foreground font-bold mt-2">19.65 M</div>
          <div className="w-full bg-secondary h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-foreground h-full" style={{ width: `${PERCENT_MINED}%` }}></div>
          </div>
        </div>

        {/* Card 2: Lost */}
        <div className="bg-card border border-border p-6 rounded-lg opacity-60">
          <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2"><Lock className="w-3 h-3" /> Perdidos para sempre</span>
          <div className="text-3xl text-muted-foreground font-bold mt-2">~4.00 M</div>
          <p className="text-[10px] text-muted-foreground mt-2">Chaves perdidas, Satoshi, queimas.</p>
        </div>

        {/* Card 3: ETFs/Treasuries */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">ETFs & Empresas</span>
          <div className="text-3xl text-gold font-bold mt-2">~1.5 M</div>
          <p className="text-[10px] text-gold/70 mt-2 animate-pulse">Absorvendo 10x a produção diária.</p>
        </div>

        {/* Card 4: Real Available */}
        <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-destructive/5 animate-pulse"></div>
          <span className="text-xs text-destructive uppercase tracking-widest font-bold flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" /> Disponível em Exchanges
          </span>
          <div className="text-4xl text-foreground font-black mt-2 tracking-tight">
            {(REAL_AVAILABLE / 1000000).toFixed(2)} M
          </div>
          <p className="text-xs text-destructive mt-2 font-bold">Menos de 9% do total.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="p-8 border border-gold/20 bg-gold/5 rounded-2xl">
          <p className="text-2xl md:text-3xl text-foreground font-serif leading-tight">
            Existem <span className="text-gold font-bold">56 milhões</span> de milionários no mundo.
          </p>
          <p className="text-2xl md:text-3xl text-muted-foreground font-serif leading-tight mt-2">
            Existem menos de <span className="text-foreground font-bold">2 milhões</span> de Bitcoins à venda.
          </p>
        </div>

        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Faça as contas. Não haverá o suficiente nem para 10% deles. <br />
          E você ainda está esperando o "momento certo"?
        </p>
      </div>

    </div>
  );
};

export default SupplyShock;
