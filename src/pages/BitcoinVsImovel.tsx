import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Calculator, TrendingUp, Home, PieChart, Share2, Info, AlertTriangle, ArrowRight, LayoutTemplate, LayoutList, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Period = 3 | 5 | 10;
type Mode = 'simple' | 'advanced';

interface SimulationResult {
  bitcoin: { final: number; growth: number; difference: number };
  realEstate: { final: number; growth: number; difference: number };
  hybrid: { final: number; growth: number; difference: number };
  history: { year: string; Bitcoin: number; 'Imóvel': number; 'Híbrido': number }[];
  opportunityCost: number;
  bestStrategy: string;
}

const BitcoinVsImovel: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>('500.000,00');
  const [period, setPeriod] = useState<Period>(5);
  const [mode, setMode] = useState<Mode>('simple');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const value = parseFloat(initialValue.replace(/\./g, '').replace(',', '.'));
      if (isNaN(value) || value <= 0) {
        setIsCalculating(false);
        return;
      }

      const factors = {
        3: { btc: 2.5, realEstate: 1.25, hybrid: 1.8 },
        5: { btc: 4.8, realEstate: 1.45, hybrid: 2.5 },
        10: { btc: 45.0, realEstate: 2.1, hybrid: 15.0 },
      };

      const f = factors[period];
      const btcFinal = value * f.btc;
      const reFinal = value * f.realEstate;
      const hybridFinal = value * f.hybrid;

      const history = [];
      for (let i = 0; i <= period; i++) {
        const p = i / period;
        history.push({
          year: `Ano ${i}`,
          Bitcoin: Math.round(value * (1 + (f.btc - 1) * Math.pow(p, 2))),
          'Imóvel': Math.round(value * (1 + (f.realEstate - 1) * p)),
          'Híbrido': Math.round(value * (1 + (f.hybrid - 1) * Math.pow(p, 1.5))),
        });
      }

      const best = Math.max(btcFinal, reFinal, hybridFinal);
      const worst = Math.min(btcFinal, reFinal, hybridFinal);

      setResult({
        bitcoin: { final: btcFinal, growth: ((btcFinal - value) / value) * 100, difference: btcFinal - value },
        realEstate: { final: reFinal, growth: ((reFinal - value) / value) * 100, difference: reFinal - value },
        hybrid: { final: hybridFinal, growth: ((hybridFinal - value) / value) * 100, difference: hybridFinal - value },
        history,
        opportunityCost: best - worst,
        bestStrategy: btcFinal === best ? 'Bitcoin' : reFinal === best ? 'Imóvel' : 'Híbrido',
      });
      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val) { setInitialValue('0,00'); return; }
    const num = (parseInt(val) / 100).toFixed(2).replace('.', ',');
    setInitialValue(num.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  };

  return (
    <div className="min-h-screen bg-background pb-20 space-y-12 font-sans">

      {/* Header */}
      <section className="text-center space-y-6 pt-10 px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/ferramentas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold text-xs uppercase tracking-widest transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Arsenal
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            <span className="text-foreground">Imóvel</span>{' '}
            <span className="text-muted-foreground/50">vs</span>{' '}
            <span className="text-gold">Bitcoin</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Compare qual estratégia teria multiplicado seu patrimônio ao longo do tempo
          </p>
          <div className="w-24 h-1 bg-gold/30 mx-auto mt-6 rounded-full" />
          <p className="text-sm text-muted-foreground/60 mt-4 font-mono uppercase tracking-widest">
            Veja como o tempo transforma decisões financeiras
          </p>
        </motion.div>
      </section>

      {/* Controls */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center gap-4 mb-10">
            {([3, 5, 10] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  period === p
                    ? 'bg-gold text-background shadow-[0_0_15px_hsl(var(--gold)/0.4)]'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {p} Anos
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto space-y-8">
            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">Valor Inicial do Investimento</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">R$</span>
                <input
                  type="text"
                  value={initialValue}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-foreground focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calculateSimulation}
                disabled={isCalculating}
                className="flex-1 bg-gold text-background font-bold py-4 rounded-xl hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <span className="animate-pulse">Calculando...</span>
                ) : (
                  <><Calculator size={20} /> Calcular Comparação</>
                )}
              </button>
              <button
                onClick={() => { setResult(null); setInitialValue('0,00'); }}
                className="px-6 py-4 bg-background border border-border text-muted-foreground rounded-xl hover:text-foreground hover:border-muted-foreground transition-all"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="max-w-6xl mx-auto px-4 space-y-16"
          >
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="bg-card p-1 rounded-xl border border-border flex gap-1">
                <button
                  onClick={() => setMode('simple')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    mode === 'simple' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutTemplate size={16} /> Visual Simplificado
                </button>
                <button
                  onClick={() => setMode('advanced')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    mode === 'advanced' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutList size={16} /> Visual Avançado
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Real Estate */}
              <motion.div whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border ${result.bestStrategy === 'Imóvel' ? 'bg-card border-chart-green/50 shadow-[0_0_20px_hsl(var(--chart-green)/0.1)]' : 'bg-card border-border opacity-80'}`}
              >
                <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                  <Home size={24} />
                  <h3 className="font-bold">Imóvel (Aluguel + Valorização)</h3>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{formatCurrency(result.realEstate.final)}</div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-chart-green">+{result.realEstate.growth.toFixed(0)}%</span>
                  <span className="text-muted-foreground/30">|</span>
                  <span className="text-muted-foreground">Lucro: {formatCurrency(result.realEstate.difference)}</span>
                </div>
                {result.bestStrategy === 'Imóvel' && <div className="mt-4 text-xs font-bold text-chart-green uppercase tracking-wider">Melhor Estratégia</div>}
              </motion.div>

              {/* Hybrid */}
              <motion.div whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border ${result.bestStrategy === 'Híbrido' ? 'bg-card border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-card border-border opacity-80'}`}
              >
                <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                  <PieChart size={24} />
                  <h3 className="font-bold">Híbrido (50/50)</h3>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{formatCurrency(result.hybrid.final)}</div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-blue-400">+{result.hybrid.growth.toFixed(0)}%</span>
                  <span className="text-muted-foreground/30">|</span>
                  <span className="text-muted-foreground">Lucro: {formatCurrency(result.hybrid.difference)}</span>
                </div>
                {result.bestStrategy === 'Híbrido' && <div className="mt-4 text-xs font-bold text-blue-500 uppercase tracking-wider">Melhor Estratégia</div>}
              </motion.div>

              {/* Bitcoin */}
              <motion.div whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border ${result.bestStrategy === 'Bitcoin' ? 'bg-card border-gold shadow-[0_0_30px_hsl(var(--gold)/0.15)]' : 'bg-card border-border opacity-80'}`}
              >
                <div className="flex items-center gap-3 mb-4 text-gold">
                  <TrendingUp size={24} />
                  <h3 className="font-bold">Bitcoin (Soberania)</h3>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{formatCurrency(result.bitcoin.final)}</div>
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-gold">+{result.bitcoin.growth.toFixed(0)}%</span>
                  <span className="text-muted-foreground/30">|</span>
                  <span className="text-muted-foreground">Lucro: {formatCurrency(result.bitcoin.difference)}</span>
                </div>
                {result.bestStrategy === 'Bitcoin' && <div className="mt-4 text-xs font-bold text-gold uppercase tracking-wider">Melhor Estratégia</div>}
              </motion.div>
            </div>

            {/* Opportunity Cost */}
            <div className="bg-gradient-to-r from-chart-red/10 to-card border-l-4 border-chart-red p-8 rounded-r-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="text-chart-red" size={20} /> Custo de Oportunidade
                  </h3>
                  <p className="text-muted-foreground">
                    A diferença entre a melhor e a pior decisão estratégica neste período foi de:
                  </p>
                </div>
                <div className="text-4xl font-bold text-chart-red font-mono">
                  {formatCurrency(result.opportunityCost)}
                </div>
              </div>
            </div>

            {/* Advanced Charts */}
            {mode === 'advanced' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-12">
                <div className="bg-card p-8 rounded-3xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">Evolução Patrimonial</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="Imóvel" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Híbrido" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Bitcoin" stroke="hsl(var(--gold))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">Composição do Retorno (Bitcoin)</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Valor Inicial', value: parseFloat(initialValue.replace(/\./g, '').replace(',', '.')) },
                        { name: 'Valorização', value: result.bitcoin.difference }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="value" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]}>
                          <Cell fill="hsl(var(--muted-foreground))" />
                          <Cell fill="hsl(var(--gold))" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <div className="bg-background border border-border rounded-2xl p-8 text-center space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Compare dados. Decida com consciência.</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Números passados não garantem futuro, mas ignorar a história é um erro caro.
                Entenda os fundamentos antes de alocar seu suor.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/economia" className="px-8 py-3 bg-gold text-background font-bold rounded-lg hover:brightness-110 transition-colors flex items-center gap-2">
                  Aprender Fundamentos <ArrowRight size={18} />
                </Link>
                <button className="px-8 py-3 bg-card border border-border text-foreground font-medium rounded-lg hover:border-muted-foreground transition-colors flex items-center gap-2">
                  <Share2 size={18} /> Compartilhar Simulação
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-muted-foreground/50 font-mono text-center max-w-3xl mx-auto leading-relaxed">
              <p className="flex items-center justify-center gap-2 mb-2">
                <Info size={12} /> NOTA LEGAL
              </p>
              Criptoativos são voláteis. Rentabilidade passada não garante resultados futuros.
              Esta ferramenta é estritamente educacional e não constitui recomendação de investimento.
              Os dados de "Imóvel" consideram média de valorização FIPEZAP + Yield médio de aluguel.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BitcoinVsImovel;
