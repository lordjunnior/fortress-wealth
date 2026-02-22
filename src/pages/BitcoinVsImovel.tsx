import React, { useState } from 'react';
import { Bitcoin, Home, TrendingUp, ArrowRight, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BitcoinVsImovel: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [rentValue, setRentValue] = useState<number>(2500);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const REAL_ESTATE_APPRECIATION = 0.18;
  const BTC_APPRECIATION = 2.85;
  const BTC_DCA_MULTIPLIER = 1.9;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const scenarioKeep = propertyValue * (1 + REAL_ESTATE_APPRECIATION);
  const scenarioSellBuy = propertyValue * (1 + BTC_APPRECIATION);
  const totalRentInvested = rentValue * 36;
  const rentGains = totalRentInvested * BTC_DCA_MULTIPLIER;
  const scenarioRentInvest = propertyValue * (1 + REAL_ESTATE_APPRECIATION) + rentGains;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>

        {/* Header */}
        <div className="card-wealth p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Bitcoin vs Imóvel</h1>
              <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                EDUCACIONAL
              </span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
            Compare 3 estratégias: vender o imóvel e comprar Bitcoin, manter o imóvel ou alugar e investir em BTC.
            Descubra qual teria <strong className="text-foreground">multiplicado seu patrimônio</strong> nos últimos 3 anos.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {['Bitcoin', 'Imóveis', 'Investimentos'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-border bg-secondary text-muted-foreground text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-medium">Valor do Imóvel (Hoje)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-medium">Valor do Aluguel (Mensal)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <input
                  type="number"
                  value={rentValue}
                  onChange={(e) => setRentValue(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-lg border border-gold-dim text-gold font-medium text-sm hover:bg-gold/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Calcular <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Resultado em 3 Anos</h2>

            {/* Card 1: Sell & Buy BTC */}
            <div className="card-wealth p-6 relative overflow-hidden border-gold-dim">
              <div className="absolute top-0 right-0 px-3 py-1 gradient-gold text-background text-[10px] font-bold rounded-bl-xl">
                MAIOR RETORNO
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Bitcoin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold">Vender Imóvel & Comprar Bitcoin</h3>
                  <p className="text-muted-foreground text-xs">All-in na escassez digital</p>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{formatCurrency(scenarioSellBuy)}</div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div className="h-full gradient-gold rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-sm flex items-center gap-1 font-medium" style={{ color: 'hsl(142 71% 45%)' }}>
                <TrendingUp className="w-3 h-3" /> +{((scenarioSellBuy - propertyValue) / propertyValue * 100).toFixed(0)}% de lucro
              </p>
            </div>

            {/* Card 2: Rent & Invest */}
            <div className="card-wealth p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold">Alugar & Investir em Bitcoin</h3>
                  <p className="text-muted-foreground text-xs">Estratégia Híbrida (DCA)</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-muted-foreground mb-2">{formatCurrency(scenarioRentInvest)}</div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: `${(scenarioRentInvest / scenarioSellBuy) * 100}%`, background: 'hsl(var(--gold))' }} />
              </div>
              <p className="text-sm text-muted-foreground">Patrimônio Preservado + Renda Potencializada</p>
            </div>

            {/* Card 3: Keep Property */}
            <div className="card-wealth p-6 opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Home className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Manter Imóvel</h3>
                  <p className="text-muted-foreground text-xs">Apenas valorização imobiliária</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-muted-foreground mb-2">{formatCurrency(scenarioKeep)}</div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div className="h-full bg-muted-foreground/50 rounded-full" style={{ width: `${(scenarioKeep / scenarioSellBuy) * 100}%` }} />
              </div>
              <p className="text-sm text-muted-foreground">Perda de custo de oportunidade massiva</p>
            </div>

            <div className="card-wealth p-4 flex gap-3 items-start border-gold-dim/30">
              <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Nota:</strong> Cálculo baseado na média histórica dos últimos ciclos (3 anos). O Bitcoin é volátil no curto prazo, mas tende a se valorizar exponencialmente frente a ativos físicos no longo prazo devido à sua escassez matemática absoluta.
              </p>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase">
          Pensar ainda é permitido · Conteúdo em atualização contínua · Desenvolvido por Lord Junnior
        </footer>
      </div>
    </div>
  );
};

export default BitcoinVsImovel;
