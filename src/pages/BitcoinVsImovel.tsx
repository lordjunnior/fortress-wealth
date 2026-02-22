import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Period = 3 | 5 | 10;

const BitcoinVsImovel: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>('500.000,00');
  const [period, setPeriod] = useState<Period>(5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const parsedValue = useMemo(() => {
    const v = parseFloat(initialValue.replace(/\./g, '').replace(',', '.'));
    return isNaN(v) ? 0 : v;
  }, [initialValue]);

  const factors: Record<Period, { btc: number; re: number; hybrid: number }> = {
    3: { btc: 2.5, re: 1.25, hybrid: 1.8 },
    5: { btc: 4.8, re: 1.45, hybrid: 2.5 },
    10: { btc: 45.0, re: 2.1, hybrid: 15.0 },
  };

  const f = factors[period];
  const btcFinal = parsedValue * f.btc;
  const reFinal = parsedValue * f.re;
  const hybridFinal = parsedValue * f.hybrid;

  const history = useMemo(() => {
    if (!hasResult || parsedValue <= 0) return [];
    const data = [];
    for (let i = 0; i <= period * 12; i++) {
      const p = i / (period * 12);
      const month = i;
      const btcVal = parsedValue * (1 + (f.btc - 1) * Math.pow(p, 2));
      const reVal = parsedValue * (1 + (f.re - 1) * p);
      const hybVal = parsedValue * (1 + (f.hybrid - 1) * Math.pow(p, 1.5));
      if (month % (period <= 3 ? 3 : period <= 5 ? 6 : 12) === 0) {
        data.push({
          label: month === 0 ? 'Início' : `${Math.round(month / 12)}a`,
          Bitcoin: Math.round(btcVal),
          Imóvel: Math.round(reVal),
          'Híbrido': Math.round(hybVal),
          Diferença: Math.round(btcVal - reVal),
        });
      }
    }
    return data;
  }, [hasResult, parsedValue, period, f]);

  const barData = useMemo(() => {
    if (!hasResult || parsedValue <= 0) return [];
    return [
      { name: 'Imóvel', valor: Math.round(reFinal), lucro: Math.round(reFinal - parsedValue) },
      { name: 'Bitcoin', valor: Math.round(btcFinal), lucro: Math.round(btcFinal - parsedValue) },
    ];
  }, [hasResult, parsedValue, btcFinal, reFinal]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const formatShort = (val: number) => {
    if (val >= 1_000_000) return `R$ ${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `R$ ${(val / 1_000).toFixed(0)}k`;
    return `R$ ${val}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val) { setInitialValue('0,00'); return; }
    const num = (parseInt(val) / 100).toFixed(2).replace('.', ',');
    setInitialValue(num.replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  };

  const handleCalculate = () => {
    if (parsedValue <= 0) return;
    setIsCalculating(true);
    setHasResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setHasResult(true);
    }, 1000);
  };

  const tooltipStyle = {
    backgroundColor: 'hsl(var(--card))',
    borderColor: 'hsl(var(--border))',
    borderRadius: '12px',
    color: 'hsl(var(--foreground))',
    fontSize: '13px',
    padding: '12px 16px',
  };

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">

      {/* Header */}
      <section className="text-center pt-10 px-4 mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/ferramentas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold text-xs uppercase tracking-widest transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Arsenal
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-foreground">Imóvel</span>{' '}
            <span className="text-muted-foreground/30 font-light">vs</span>{' '}
            <span className="text-gold">Bitcoin</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Insira qualquer valor e veja, graficamente, o que teria acontecido com seu dinheiro
            se tivesse escolhido um caminho diferente.
          </p>
        </motion.div>
      </section>

      {/* Controls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto px-4 mb-16"
      >
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {/* Period */}
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 text-center">
            Horizonte de tempo
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {([3, 5, 10] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => { setPeriod(p); setHasResult(false); }}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  period === p
                    ? 'bg-gold text-background shadow-[0_0_20px_hsl(var(--gold)/0.3)]'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {p} anos
              </button>
            ))}
          </div>

          {/* Value Input */}
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Quanto você investiria?
          </p>
          <div className="relative mb-6">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">R$</span>
            <input
              type="text"
              value={initialValue}
              onChange={handleInputChange}
              className="w-full bg-background border border-border rounded-xl py-4 pl-14 pr-4 text-2xl font-bold text-foreground focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={isCalculating || parsedValue <= 0}
            className="w-full bg-gold text-background font-bold py-4 rounded-xl hover:brightness-110 transition-all active:scale-[0.98] text-base tracking-wide"
          >
            {isCalculating ? 'Processando dados...' : 'Ver Resultado Visual'}
          </button>
        </div>
      </motion.section>

      {/* Results */}
      <AnimatePresence>
        {hasResult && parsedValue > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 space-y-8"
          >

            {/* 3 Cenários */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

              {/* Full Bitcoin */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'hsl(var(--gold) / 0.5)', boxShadow: '0 8px 40px hsl(var(--gold) / 0.08)' }}
                className="bg-card border border-gold/20 rounded-2xl p-8 relative overflow-hidden transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 blur-[60px] rounded-full" />
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-6">Full Bitcoin</p>
                <p className="text-muted-foreground text-xs mb-1">Patrimônio Final</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">{formatCurrency(btcFinal)}</p>
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Ganho Total</span>
                    <span className="text-sm font-bold text-gold">{formatCurrency(btcFinal - parsedValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Valorização</span>
                    <span className="text-sm font-bold text-gold">+{((f.btc - 1) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="mt-5 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
              </motion.div>

              {/* Imóvel Puro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'hsl(var(--muted-foreground) / 0.3)', boxShadow: '0 8px 40px hsl(var(--muted-foreground) / 0.05)' }}
                className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden transition-colors duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-muted-foreground/5 blur-[60px] rounded-full" />
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Imóvel Puro</p>
                <p className="text-muted-foreground text-xs mb-1">Patrimônio Final</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">{formatCurrency(reFinal)}</p>
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Ganho Total</span>
                    <span className="text-sm font-bold text-foreground">{formatCurrency(reFinal - parsedValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Valorização</span>
                    <span className="text-sm font-bold text-foreground">+{((f.re - 1) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="mt-5 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(((f.re - 1) / (f.btc - 1)) * 100, 100)}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-muted-foreground/40 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Híbrido */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -6, borderColor: 'hsl(220 70% 55% / 0.4)', boxShadow: '0 8px 40px hsl(220 70% 55% / 0.06)' }}
                className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(220_70%_55%/0.3)] to-transparent" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(220_70%_55%/0.05)] blur-[60px] rounded-full" />
                <p className="text-xs font-mono text-[hsl(220_70%_55%)] uppercase tracking-widest mb-6">Híbrido (50/50)</p>
                <p className="text-muted-foreground text-xs mb-1">Patrimônio Final</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">{formatCurrency(hybridFinal)}</p>
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Ganho Total</span>
                    <span className="text-sm font-bold text-[hsl(220_70%_55%)]">{formatCurrency(hybridFinal - parsedValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Valorização</span>
                    <span className="text-sm font-bold text-[hsl(220_70%_55%)]">+{((f.hybrid - 1) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="mt-5 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(((f.hybrid - 1) / (f.btc - 1)) * 100, 100)}%` }}
                    transition={{ delay: 0.5, duration: 1.1 }}
                    className="h-full bg-[hsl(220_70%_55%)] rounded-full"
                  />
                </div>
              </motion.div>
            </div>

            {/* Difference callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center py-6"
            >
              <p className="text-muted-foreground text-sm mb-2">
                Diferença de patrimônio após {period} anos
              </p>
              <p className="text-4xl md:text-5xl font-bold text-gold">
                {formatCurrency(btcFinal - reFinal)}
              </p>
              <p className="text-muted-foreground/60 text-xs font-mono mt-2 uppercase tracking-widest">
                a mais no Bitcoin vs Imóvel
              </p>
            </motion.div>

            {/* Main Evolution Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Evolução do seu patrimônio
              </p>
              <p className="text-lg font-bold text-foreground mb-6">
                {formatCurrency(parsedValue)} investidos ao longo de {period} anos
              </p>
              <div className="h-[350px] md:h-[420px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradBtc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradRe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} width={70} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [formatCurrency(value), name]} />
                    <Area type="monotone" dataKey="Imóvel" stroke="hsl(var(--muted-foreground))" strokeWidth={2} fill="url(#gradRe)" />
                    <Area type="monotone" dataKey="Híbrido" stroke="hsl(220 70% 55%)" strokeWidth={2} fill="none" strokeDasharray="6 3" />
                    <Area type="monotone" dataKey="Bitcoin" stroke="hsl(var(--gold))" strokeWidth={3} fill="url(#gradBtc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-muted-foreground rounded-full inline-block" /> Imóvel
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-[hsl(220_70%_55%)] rounded-full inline-block" /> Híbrido
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-[2px] bg-gold rounded-full inline-block" /> Bitcoin
                </span>
              </div>
            </motion.div>

            {/* Gap chart — the growing difference */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                A distância entre as escolhas
              </p>
              <p className="text-lg font-bold text-foreground mb-6">
                Quanto mais tempo passa, maior a diferença
              </p>
              <div className="h-[280px] md:h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradDiff" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-red))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--chart-red))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} width={70} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [formatCurrency(value), 'Custo de oportunidade']} />
                    <Area type="monotone" dataKey="Diferença" stroke="hsl(var(--chart-red))" strokeWidth={2} fill="url(#gradDiff)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xs text-muted-foreground/60 mt-4">
                Este gráfico mostra o quanto você deixou de ganhar, ano a ano, ao escolher imóvel em vez de Bitcoin.
              </p>
            </motion.div>

            {/* Final comparison bars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Resultado final lado a lado
              </p>
              <p className="text-lg font-bold text-foreground mb-6">
                Valor total do patrimônio ao final de {period} anos
              </p>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={formatShort} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={13} tickLine={false} axisLine={false} width={60} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => formatCurrency(value)} cursor={{ fill: 'hsl(var(--muted)/0.3)' }} />
                    <Bar dataKey="valor" radius={[0, 8, 8, 0]} barSize={40}>
                      <Cell fill="hsl(var(--muted-foreground))" />
                      <Cell fill="hsl(var(--gold))" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-background border border-border rounded-2xl p-8 text-center space-y-4 mt-8"
            >
              <p className="text-2xl font-bold text-foreground">Os dados falam por si.</p>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Rentabilidade passada não garante futuro — mas ignorar a história tem um custo real e mensurável.
              </p>
              <Link to="/economia" className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background font-bold rounded-xl hover:brightness-110 transition-all mt-2">
                Entender os fundamentos <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Disclaimer */}
            <p className="text-[10px] text-muted-foreground/40 font-mono text-center max-w-2xl mx-auto leading-relaxed mt-8">
              NOTA LEGAL — Criptoativos são voláteis. Rentabilidade passada não garante resultados futuros.
              Esta ferramenta é estritamente educacional. Os dados de imóvel consideram média FIPEZAP + yield de aluguel.
            </p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BitcoinVsImovel;
