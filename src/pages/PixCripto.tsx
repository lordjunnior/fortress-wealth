import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft, Zap, ArrowRight, ShieldCheck,
  Smartphone, QrCode, RefreshCcw, ChevronDown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import qrCodeLightning from '@/assets/qrcode-lightning.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* Card que "respira" — hover leve, borda reage */
const BreathingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={delay}
    whileHover={{
      y: -6,
      scale: 1.015,
      borderColor: 'hsl(40 92% 56% / 0.3)',
      boxShadow: '0 8px 40px hsl(40 92% 56% / 0.06)',
      transition: { duration: 0.3, ease: 'easeOut' },
    }}
    className={`bg-card border border-border rounded-2xl transition-colors duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

/* Card que "grita" — pulso na borda, brilho persistente, hover agressivo */
const ScreamingCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  color?: 'destructive' | 'gold';
}> = ({ children, className = '', delay = 0, color = 'destructive' }) => {
  const borderColor = color === 'destructive' ? 'hsl(0 72% 51% / 0.4)' : 'hsl(40 92% 56% / 0.4)';
  const glowColor = color === 'destructive' ? 'hsl(0 72% 51% / 0.12)' : 'hsl(40 92% 56% / 0.12)';
  const hoverGlow = color === 'destructive' ? 'hsl(0 72% 51% / 0.2)' : 'hsl(40 92% 56% / 0.2)';
  const hoverBorder = color === 'destructive' ? 'hsl(0 72% 51% / 0.7)' : 'hsl(40 92% 56% / 0.7)';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      animate={{
        boxShadow: [
          `0 0 0px ${glowColor}, inset 0 0 0px transparent`,
          `0 0 30px ${glowColor}, inset 0 1px 0 ${glowColor}`,
          `0 0 0px ${glowColor}, inset 0 0 0px transparent`,
        ],
        borderColor: [
          borderColor,
          hoverBorder,
          borderColor,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        y: -8,
        scale: 1.025,
        boxShadow: `0 12px 50px ${hoverGlow}`,
        borderColor: hoverBorder,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className={`bg-card border rounded-2xl relative overflow-hidden ${className}`}
    >
      {/* Subtle shimmer line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: color === 'destructive'
            ? 'linear-gradient(90deg, transparent, hsl(0 72% 51% / 0.5), transparent)'
            : 'linear-gradient(90deg, transparent, hsl(40 92% 56% / 0.5), transparent)',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </motion.div>
  );
};

const PixCripto: React.FC = () => {
  const [brlValue, setBrlValue] = useState<string>('350.00');
  const [pixKey, setPixKey] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);

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
    <div className="min-h-screen bg-background pt-28 pb-0 px-4 font-sans">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/ferramentas" className="text-muted-foreground hover:text-gold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors w-fit mb-12">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Arsenal
          </Link>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SEÇÃO 1: Simulador + Argumentação */}
        {/* ═══════════════════════════════════════════════════════════ */}
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
              <div className="flex justify-between items-center mb-8 text-muted-foreground text-xs font-bold font-mono">
                <span>21:47</span>
                <span className="flex items-center gap-1 text-gold"><Zap className="w-3 h-3 fill-current" /> Lightning</span>
              </div>
              <div className="mb-10">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Saldo Disponível</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-foreground tracking-tighter">1.247.830</span>
                  <span className="text-gold font-bold text-sm">sats</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">≈ R$ 4.367,50</span>
              </div>
              <div className="bg-background border border-border rounded-2xl p-5 mb-auto">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-4">Enviar PIX</span>
                <div className="space-y-4">
                  <div className="relative">
                    <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Chave PIX (E-mail, CPF, Celular)" value={pixKey} onChange={(e) => setPixKey(e.target.value)}
                      className="w-full bg-card border border-border rounded-lg py-3 pl-10 pr-4 text-foreground text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex-1">
                      <span className="text-xs text-muted-foreground block mb-1">Valor R$</span>
                      <input type="number" value={brlValue} onChange={(e) => setBrlValue(e.target.value)}
                        className="w-full bg-card border border-border rounded-lg py-3 px-4 text-foreground font-bold text-lg focus:outline-none focus:border-gold transition-colors" />
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
              <button onClick={handleSimulate} disabled={isProcessing || success}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all ${
                  success ? 'bg-chart-green text-background' : isProcessing ? 'bg-gold/50 text-background cursor-not-allowed'
                  : 'bg-gold hover:brightness-110 text-background shadow-[0_0_20px_hsl(var(--gold)/0.3)]'
                }`}>
                {success ? (<><ShieldCheck className="w-5 h-5" /> PIX Enviado com Sucesso</>) : isProcessing ? (<><RefreshCcw className="w-5 h-5 animate-spin" /> Roteando na Rede...</>) : (<><Zap className="w-5 h-5 fill-current" /> Confirmar via Lightning</>)}
              </button>
              <div className="text-center mt-4">
                <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest font-mono">Gateway Descentralizado · Sem KYC</span>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Argumentação */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="space-y-8">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-widest font-bold border border-gold/20 px-3 py-1 rounded-full bg-gold/5 mb-6 inline-block">
                Estratégia de Saída
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                O Fim da Desculpa:<br /><span className="text-gold">PIX via Bitcoin</span>
              </h1>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>A maior mentira que te contaram é que o Bitcoin é "difícil de usar" ou "apenas para o futuro". Essa narrativa serve exclusivamente para te manter dentro do curral bancário.</p>
              <p>Aprenda a manter seu capital em Bitcoin — <strong className="text-foreground">inalcançável por bloqueios judiciais e confiscos</strong> — e converta para PIX apenas no segundo exato do pagamento, usando gateways descentralizados.</p>
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

        <div className="w-full h-px bg-border my-24" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* GUIA COMPLETO — HERO */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold">Guia completo · Brasil · PIX + Cripto</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Como Fazer e RECEBER PIX com Criptomoedas no Brasil{' '}
              <span className="text-muted-foreground">(Bitcoin, USDT, Ethereum)</span> — Guia Completo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Após muitos pedidos de implementação do PIX dentro do ecossistema cripto, criamos esta página para mostrar o que de fato acontece "por trás" e como usar com clareza e segurança.
            </p>
            <div className="p-6 border-l-2 border-gold bg-gold/5 text-foreground text-lg text-left">
              A ideia é simples: você paga com cripto, o outro lado recebe um PIX comum em reais — sem precisar saber nada sobre cripto.
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <a href="#passo-a-passo" className="px-6 py-3 bg-gold text-background font-bold rounded-lg text-sm hover:brightness-110 transition-all">Ver passo a passo agora</a>
              <a href="#como-funciona" className="px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg text-sm hover:border-gold/50 transition-all">Entender como funciona</a>
              <a href="#apoiar" className="px-6 py-3 bg-card border border-border text-gold font-bold rounded-lg text-sm hover:border-gold/50 transition-all">Apoiar com Lightning</a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 text-xs text-muted-foreground font-mono uppercase tracking-wider">
              <span>Sem cadastro aqui</span><span>Sem promessa</span><span>Sem recomendação de investimento</span><span>Didático + direto</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* O QUE VOCÊ VAI APRENDER — cards que respiram */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">O que você vai aprender</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Um tutorial objetivo, com autoridade, sem hype. Você vai entender: conversão automática, como pagar, como receber, e os riscos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: '1', title: 'Como funciona (de verdade)', desc: 'Cripto → conversão → real → PIX.' },
              { num: '2', title: 'Como fazer o PIX com cripto', desc: 'QR Code / chave PIX, igual banco.' },
              { num: '3', title: 'Riscos & segurança', desc: 'Custódia, KYC, travas e dependências.' },
            ].map((item, i) => (
              <BreathingCard key={item.num} delay={i} className="p-8 text-center">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 text-gold font-bold text-lg flex items-center justify-center mx-auto mb-5"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                >
                  {item.num}
                </motion.div>
                <h4 className="text-foreground font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </BreathingCard>
            ))}
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* PASSO A PASSO */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection id="passo-a-passo">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-4">Passo a passo</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Como fazer (passo a passo)</h3>
            <p className="text-muted-foreground text-lg mb-12">
              É parecido com o seu banco: escanear QR, colar código ou inserir chave PIX. A diferença é que você escolhe qual cripto vira reais.
            </p>

            <h4 className="text-foreground font-bold uppercase text-xs tracking-widest mb-8">Passo a passo objetivo</h4>

            <div className="space-y-0">
              {[
                { step: '01', title: 'Abra o app da plataforma', desc: 'Entre na área de pagamento e procure o ícone/atalho do PIX (geralmente um leitor de QR Code).' },
                { step: '02', title: 'Escaneie o QR Code ou cole o código', desc: 'Você pode ler o QR Code do recebedor ou colar o "copia e cola" do PIX.' },
                { step: '03', title: 'Escolha o "saldo" de pagamento', desc: 'Selecione qual cripto vai usar (BTC, USDT, ETH, etc.). A plataforma converte automaticamente para reais.' },
                { step: '04', title: 'Confirme e finalize', desc: 'O recebedor recebe em reais via PIX. Para ele, é um PIX normal. Para você, foi cripto virando reais no ato.' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex gap-6 pb-10 relative group"
                >
                  {i < 3 && <div className="absolute left-5 top-12 w-px h-[calc(100%-2rem)] bg-border" />}
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 text-gold font-mono font-bold text-sm flex items-center justify-center shrink-0 relative z-10 transition-all duration-300 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_hsl(40_92%_56%/0.15)]"
                  >
                    {item.step}
                  </motion.div>
                  <div className="pt-1">
                    <h5 className="text-foreground font-bold mb-1 transition-colors duration-300 group-hover:text-gold">{item.title}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dica estratégica — card que respira */}
            <BreathingCard delay={0} className="p-8 mt-8 space-y-4">
              <h4 className="text-foreground font-bold">Dica estratégica (sem hype)</h4>
              <p className="text-muted-foreground leading-relaxed">
                Se você quer <strong className="text-foreground">estabilidade</strong> para pagamentos do dia a dia, usar stablecoins (ex.: USDT) como saldo costuma ser mais previsível do que BTC/ETH.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Se você quer <strong className="text-foreground">diversificação</strong>, mantém parte em BTC/ETH, mas entende que o preço varia.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground font-medium">Estabilidade: stablecoins</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground font-medium">Volatilidade: BTC/ETH</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-muted-foreground">Sem travas = depende da plataforma</span>
              </div>
            </BreathingCard>

            {/* CTA intermediário — card que respira */}
            <BreathingCard delay={1} className="p-8 mt-8 text-center space-y-4">
              <h4 className="text-foreground font-bold text-lg">Quer ver isso na prática?</h4>
              <p className="text-muted-foreground">
                Você pode testar com valores pequenos para entender o fluxo e validar se faz sentido para sua rotina.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#riscos" className="px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg text-sm hover:border-gold/50 transition-all">Ver riscos antes</a>
                <a href="#apoiar" className="px-6 py-3 bg-gold/10 border border-gold/20 text-gold font-bold rounded-lg text-sm hover:bg-gold/20 transition-all">Apoiar</a>
              </div>
            </BreathingCard>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* RISCOS & SEGURANÇA — cards que GRITAM */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection id="riscos">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-4">Riscos & segurança</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Riscos & segurança (o que ninguém te fala)</h3>
            <p className="text-muted-foreground text-lg mb-12">
              Se você quer parecer adulto e não "iniciante empolgado", você precisa saber isso. Aqui é onde você ganha autoridade.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Custódia — GRITA */}
              <ScreamingCard delay={0} color="destructive" className="p-8 space-y-4">
                <h4 className="text-foreground font-bold text-lg">Custódia</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para pagar PIX com cripto, quase sempre você precisa manter saldo numa plataforma.
                </p>
                <p className="text-sm text-muted-foreground">Saldo em exchange ≠ autocustódia.</p>
                <div className="border-t border-destructive/20 pt-4 mt-4">
                  <p className="text-foreground font-bold text-sm">Not your keys…</p>
                  <p className="text-destructive text-sm font-medium">…not your money</p>
                </div>
              </ScreamingCard>

              {/* KYC — GRITA */}
              <ScreamingCard delay={1} color="destructive" className="p-8 space-y-4">
                <h4 className="text-foreground font-bold text-lg">KYC / Regras</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plataformas costumam exigir verificação e podem impor limites. Regras podem mudar sem aviso.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">Limites</span>
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">Bloqueios</span>
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">Mudanças de política</span>
                </div>
              </ScreamingCard>

              {/* Risco regulatório — GRITA */}
              <ScreamingCard delay={2} color="destructive" className="p-8 space-y-4">
                <h4 className="text-foreground font-bold text-lg">Risco regulatório</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O ambiente regulatório pode mudar. Isso afeta disponibilidade, taxas, limites e operações.
                </p>
                <p className="text-sm text-muted-foreground">Planeje com margem.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">Sem certezas</span>
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md text-xs text-destructive">Tenha plano B</span>
                </div>
              </ScreamingCard>
            </div>

            {/* Conclusão prática — grita com gold */}
            <ScreamingCard delay={0} color="gold" className="mt-12 p-8">
              <h4 className="text-foreground font-bold text-lg mb-3">Conclusão prática</h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Usar PIX com cripto é uma ponte útil para a realidade brasileira — mas não é substituto de soberania. Use como ferramenta, não como muleta.
              </p>
            </ScreamingCard>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="#faq" className="px-6 py-3 bg-card border border-border text-foreground font-bold rounded-lg text-sm hover:border-gold/50 transition-all">Tirar dúvidas (FAQ)</a>
              <a href="#apoiar" className="px-6 py-3 bg-gold/10 border border-gold/20 text-gold font-bold rounded-lg text-sm hover:bg-gold/20 transition-all">Manter gratuito</a>
            </div>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CLAREZA TÉCNICA — cards que respiram */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection id="como-funciona">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-4">Clareza técnica</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">O que é (clareza técnica)</h3>
            <p className="text-muted-foreground mb-8">Sem frases de marketing. Apenas o mecanismo real do PIX com cripto.</p>

            <BreathingCard delay={0} className="p-8 space-y-6">
              <h4 className="text-foreground font-bold text-lg">O que acontece quando você "faz PIX com cripto"?</h4>
              <p className="text-muted-foreground leading-relaxed">
                O que essas plataformas fazem é simples: usam seu saldo em criptomoedas e, no momento do pagamento, convertem automaticamente para reais.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Do outro lado, o recebedor recebe um PIX normal na conta — e não precisa saber que você pagou com cripto.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-background border border-gold/20 rounded-lg text-sm text-gold font-medium">Cripto → Real</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Liquidação instantânea</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Recebedor recebe BRL</span>
              </div>
            </BreathingCard>

            <BreathingCard delay={1} className="p-8 space-y-6 mt-6">
              <h4 className="text-foreground font-bold text-lg">Por que isso importa?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Porque isso reduz fricção. Em vez de "sacar" e esperar, você usa cripto como saldo e paga como se fosse banco.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mas atenção: isso quase sempre envolve custódia (saldo numa corretora) e regras da plataforma.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Praticidade</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-muted-foreground">Depende da plataforma</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-muted-foreground">Não substitui autocustódia</span>
              </div>
            </BreathingCard>

            {/* Plataforma revelável */}
            <div className="mt-8">
              <motion.button
                onClick={() => setShowPlatform(!showPlatform)}
                whileHover={{ scale: 1.01, borderColor: 'hsl(40 92% 56% / 0.4)' }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-card border border-border rounded-2xl p-6 text-left transition-all flex items-center justify-between"
              >
                <span className="text-foreground font-bold">Qual plataforma faz isso hoje? (clique para revelar)</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${showPlatform ? 'rotate-180' : ''}`} />
              </motion.button>
              {showPlatform && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-card border border-border border-t-0 rounded-b-2xl p-8 -mt-2">
                  <p className="text-foreground font-bold text-lg mb-2">Bybit</p>
                  <p className="text-muted-foreground leading-relaxed">
                    A Bybit oferece funcionalidade de pagamento via PIX usando saldo em criptomoedas. Verifique sempre as regras, limites e taxas diretamente no app antes de operar.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-4 font-mono">
                    Isso não é recomendação. Pesquise, teste com valores pequenos, e tire suas próprias conclusões.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FAQ — items que respiram */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection id="faq">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-4">FAQ</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">FAQ (respostas diretas)</h3>
            <p className="text-muted-foreground mb-10">Perguntas que todo mundo faz — respondidas sem enrolação.</p>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: 'Quem recebe o PIX precisa ter conta em cripto?', a: 'Não. O recebedor recebe um PIX normal em reais. Ele não precisa saber que você usou criptomoedas para pagar. Para ele, é um PIX comum.' },
                { q: 'Eu pago em BTC/USDT/ETH e a pessoa recebe em reais?', a: 'Sim. A plataforma converte automaticamente o saldo da cripto escolhida para reais no momento do pagamento. O recebedor recebe BRL via PIX.' },
                { q: 'Isso substitui autocustódia?', a: 'Não. Para usar esse serviço, você precisa manter saldo na plataforma (exchange). Isso é custódia terceirizada. Para soberania real, mantenha a maior parte do seu Bitcoin em carteira própria.' },
                { q: 'Posso ser bloqueado?', a: 'Sim, dependendo da plataforma e das regras vigentes. Exchanges podem impor limites, exigir verificação adicional ou bloquear operações sem aviso prévio. Tenha sempre um plano B.' },
                { q: 'Isso é recomendação de investimento?', a: 'Não. Todo conteúdo aqui é estritamente educacional. Não fazemos recomendação de compra, venda ou uso de qualquer plataforma ou criptoativo.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 overflow-hidden transition-colors duration-300 hover:border-gold/30">
                    <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline py-5">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            <p className="text-xs text-muted-foreground/50 mt-8 text-center font-mono leading-relaxed">
              Aviso: Conteúdo educacional. Não é recomendação de investimento. Plataformas e telas podem mudar. Verifique sempre taxas, limites e regras no app que você usar.
            </p>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-border my-20" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* APOIAR COM LIGHTNING */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection id="apoiar">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold">Apoie este projeto</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Apoie este projeto (Lightning)</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Você acessa tudo de graça. Sem paywall. Sem assinatura. Se isso te ajudou, apoie voluntariamente — é assim que projetos soberanos sobrevivem.
            </p>

            <BreathingCard delay={0} className="p-8 space-y-6 text-left">
              <h4 className="text-foreground font-bold">Por que doar?</h4>
              <p className="text-muted-foreground leading-relaxed">Tempo de curadoria, construção de páginas, organização de biblioteca, apps e guias.</p>
              <p className="text-muted-foreground leading-relaxed">Se você quer ver isso crescendo (mais apps, mais guias, mais material), Lightning é o caminho mais coerente.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Voluntário</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Sem pressão</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground">Direto ao ponto</span>
              </div>
            </BreathingCard>

            <BreathingCard delay={1} className="p-8 flex flex-col items-center">
              <img src={qrCodeLightning} alt="QR Code Lightning Network" className="w-48 h-48 rounded-xl border border-border object-cover" />
              <p className="text-xs text-muted-foreground/50 mt-4 font-mono">Lightning Network</p>
            </BreathingCard>
          </div>
        </AnimatedSection>

      </div>

      {/* FOOTER */}
      <div className="border-t border-border mt-24">
        <div className="max-w-6xl mx-auto py-16 px-4 text-center space-y-4">
          <p className="text-foreground font-bold text-lg">Soberania não é discurso. É prática.</p>
          <p className="text-muted-foreground text-sm">Pensar ainda é permitido. Agir também.</p>
          <p className="text-xs text-muted-foreground/40 font-mono mt-8">© Lord Junnior · 2026</p>
        </div>
      </div>
    </div>
  );
};

/* Componente auxiliar para animação de seção */
const AnimatedSection: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      {children}
    </motion.section>
  );
};

export default PixCripto;
