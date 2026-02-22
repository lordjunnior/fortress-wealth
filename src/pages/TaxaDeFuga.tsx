import React, { useState } from 'react';
import { ArrowLeft, Plane, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DESTINATIONS = [
  { id: 'el-salvador', name: 'El Salvador (Bitcoin City)', baseCost: 8000, visaCost: 0, note: 'Paraíso Bitcoin.' },
  { id: 'paraguai', name: 'Paraguai', baseCost: 2000, visaCost: 2500, note: 'Baixos impostos, perto do Brasil.' },
  { id: 'portugal', name: 'Portugal', baseCost: 5500, visaCost: 1500, note: 'Porta de entrada Europa.' },
  { id: 'uruguai', name: 'Uruguai', baseCost: 3000, visaCost: 1000, note: 'Estabilidade na América Latina.' },
  { id: 'dubai', name: 'Dubai (EAU)', baseCost: 7000, visaCost: 20000, note: 'Imposto Zero.' },
];

const PASSPORT_COST = 257.25;

const TaxaDeFuga: React.FC = () => {
  const [people, setPeople] = useState(1);
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [monthsReserva, setMonthsReserva] = useState(3);
  const [monthlyCost] = useState(3000);
  const navigate = useNavigate();

  const totalPassport = people * PASSPORT_COST;
  const totalFlights = people * destination.baseCost;
  const totalDocs = people * destination.visaCost;
  const totalReserva = people * monthlyCost * monthsReserva;

  const GRAND_TOTAL = totalPassport + totalFlights + totalDocs + totalReserva;
  const BTC_PRICE_BRL = 350000;
  const totalInBTC = GRAND_TOTAL / BTC_PRICE_BRL;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Plane className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Taxa de Fuga</h1>
              <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                SIMULADOR
              </span>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl border-l-2 pl-4 py-2" style={{ borderColor: 'hsl(var(--gold))' }}>
            A liberdade geográfica tem um preço, mas é mais barato que o custo de ficar e pagar a conta da irresponsabilidade fiscal alheia.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-8 card-wealth p-8">
            <div className="space-y-3">
              <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Destino Soberano
              </label>
              <div className="grid grid-cols-1 gap-3">
                {DESTINATIONS.map(dest => (
                  <button
                    key={dest.id}
                    onClick={() => setDestination(dest)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all ${
                      destination.id === dest.id
                        ? 'bg-gold/10 border-gold-dim text-foreground'
                        : 'bg-background border-border text-muted-foreground hover:border-border/80'
                    }`}
                  >
                    <span className="font-bold block text-sm">{dest.name}</span>
                    <span className="text-xs opacity-70">{dest.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">Tamanho da Família</label>
              <input
                type="range" min="1" max="6" step="1"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[hsl(var(--gold))]"
              />
              <div className="flex justify-between font-mono text-sm bg-background p-2 rounded border border-border">
                <span>{people} Pessoa{people > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">Reserva de Emergência (Meses)</label>
              <input
                type="range" min="1" max="12" step="1"
                value={monthsReserva}
                onChange={(e) => setMonthsReserva(parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[hsl(var(--gold))]"
              />
              <div className="flex justify-between font-mono text-sm bg-background p-2 rounded border border-border">
                <span>{monthsReserva} Meses de Custo de Vida</span>
              </div>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-[hsl(var(--ice-white))] text-background p-8 rounded-xl shadow-2xl relative font-mono transform rotate-1 lg:rotate-2">
            <div className="text-center border-b-2 border-background pb-6 mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-tighter">Fatura da Liberdade</h2>
              <p className="text-xs uppercase mt-1 opacity-60">Soberania Individual Inc.</p>
            </div>

            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between">
                <span>Passaportes ({people}x)</span>
                <span className="font-bold">R$ {totalPassport.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Passagens Aéreas (Est.)</span>
                <span className="font-bold">R$ {totalFlights.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Vistos/Docs</span>
                <span className="font-bold">R$ {totalDocs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between opacity-60">
                <span>Reserva ({monthsReserva} meses)</span>
                <span className="font-bold">R$ {totalReserva.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t-2 border-background border-dashed pt-6 mt-6">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-xl uppercase">Total BRL</span>
                <span className="font-black text-2xl">R$ {GRAND_TOTAL.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between items-center" style={{ color: 'hsl(var(--gold))' }}>
                <span className="font-bold text-sm uppercase flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Em Bitcoin
                </span>
                <span className="font-bold text-lg">₿ {totalInBTC.toFixed(8)}</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] uppercase opacity-50">
                O preço de sair é alto.<br />
                O preço de ficar pode ser tudo o que você tem.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase">
          Pensar ainda é permitido · Conteúdo em atualização contínua · Desenvolvido por Lord Junnior
        </footer>
      </div>
    </div>
  );
};

export default TaxaDeFuga;
