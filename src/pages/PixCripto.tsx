import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Zap, ArrowRight, ShieldCheck,
  Smartphone, QrCode, RefreshCcw
} from 'lucide-react';

const PixCripto: React.FC = () => {
  const [brlValue, setBrlValue] = useState<string>('350.00');
  const [pixKey, setPixKey] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const BRL_TO_SATS_RATE = 285.71;
  const satsValue = Math.floor(Number(brlValue) * BRL_TO_SATS_RATE);

  const handleSimulate = () => {
    if (!brlValue || !pixKey) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/ferramentas" className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit mb-12">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Arsenal
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Coluna Esquerda: Simulador Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[360px]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative bg-card border border-border rounded-[2.5rem] p-6 shadow-2xl h-[700px] flex flex-col overflow-hidden">

              {/* Top Bar Mobile */}
              <div className="flex justify-between items-center mb-8 text-muted-foreground text-xs font-bold font-mono">
                <span>21:47</span>
                <span className="flex items-center gap-1 text-gold"><Zap className="w-3 h-3 fill-current" /> Lightning</span>
              </div>

              {/* Saldo */}
              <div className="mb-10">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Saldo Disponível</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-foreground tracking-tighter">1.247.830</span>
                  <span className="text-gold font-bold text-sm">sats</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">≈ R$ 4.367,50</span>
              </div>

              {/* Input Area */}
              <div className="bg-background border border-border rounded-2xl p-5 mb-auto">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-4">Enviar PIX</span>

                <div className="space-y-4">
                  <div className="relative">
                    <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Chave PIX (E-mail, CPF, Celular)"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      className="w-full bg-card border border-border rounded-lg py-3 pl-10 pr-4 text-foreground text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex-1">
                      <span className="text-xs text-muted-foreground block mb-1">Valor R$</span>
                      <input
                        type="number"
                        value={brlValue}
                        onChange={(e) => setBrlValue(e.target.value)}
                        className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground font-bold text-lg focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <ArrowRight className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-5" />

                    <div className="flex-1 text-right">
                      <span className="text-xs text-muted-foreground block mb-1">Débito Estimado</span>
                      <div className="bg-card border border-border/50 rounded-lg py-3 px-4">
                        <span className="text-gold font-bold text-lg">{satsValue.toLocaleString('pt-BR')}</span>
                        <span className="text-xs text-gold/70 ml-1">sats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulate}
                disabled={isProcessing || success}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all ${
                  success
                    ? 'bg-chart-green text-background'
                    : isProcessing
                    ? 'bg-gold/50 text-background cursor-not-allowed'
                    : 'bg-gold hover:brightness-110 text-background shadow-[0_0_20px_hsl(var(--gold)/0.3)]'
                }`}
              >
                {success ? (
                  <><ShieldCheck className="w-5 h-5" /> PIX Enviado com Sucesso</>
                ) : isProcessing ? (
                  <><RefreshCcw className="w-5 h-5 animate-spin" /> Roteando na Rede...</>
                ) : (
                  <><Zap className="w-5 h-5 fill-current" /> Confirmar via Lightning</>
                )}
              </button>

              <div className="text-center mt-4">
                <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest font-mono">Gateway Descentralizado · Sem KYC</span>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Argumentação */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest font-bold border border-gold/20 px-3 py-1 rounded-full bg-gold/5 mb-6 inline-block">
                Estratégia de Saída
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                O Fim da Desculpa:<br />
                <span className="text-gold">PIX via Bitcoin</span>
              </h1>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                A maior mentira que te contaram é que o Bitcoin é "difícil de usar" ou "apenas para o futuro". Essa narrativa serve exclusivamente para te manter dentro do curral bancário.
              </p>
              <p>
                Aprenda a manter seu capital em Bitcoin — <strong className="text-foreground">inalcançável por bloqueios judiciais e confiscos</strong> — e converta para PIX apenas no segundo exato do pagamento, usando gateways descentralizados.
              </p>
              <div className="p-6 border-l-2 border-gold bg-gold/5 text-foreground font-medium text-xl">
                Liquidez em qualquer balcão do Brasil, sem pedir permissão a gerente de banco.
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="text-foreground font-bold mb-4 uppercase text-xs tracking-widest">Aplicações Práticas</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex gap-3 bg-card p-4 rounded-xl border border-border">
                  <Smartphone className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm text-muted-foreground">Pagamento de contas do dia a dia.</span>
                </li>
                <li className="flex gap-3 bg-card p-4 rounded-xl border border-border">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm text-muted-foreground">Fuga de bloqueios do BacenJud.</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PixCripto;
