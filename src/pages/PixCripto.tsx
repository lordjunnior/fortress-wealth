import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, ShieldCheck, AlertTriangle, Smartphone, QrCode, Wallet, CheckCircle2, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import NetworkTicker from "@/components/NetworkTicker";
import qrCodeImg from "@/assets/qrcode-lightning.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const steps = [
  { num: "01", title: "Abra o App", desc: "Entre na área de pagamento e procure o ícone/atalho do PIX (geralmente um leitor de QR Code).", icon: Smartphone },
  { num: "02", title: "Escaneie", desc: "Leia o QR Code do recebedor ou cole o código 'copia e cola' do PIX.", icon: QrCode },
  { num: "03", title: "Escolha o Saldo", desc: "Selecione qual cripto vai usar (BTC, USDT, ETH). A conversão é automática.", icon: Wallet },
  { num: "04", title: "Confirme", desc: "O recebedor recebe em reais via PIX. Para você, foi cripto virando reais no ato.", icon: CheckCircle2 },
];

const PixCripto = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const whatRef = useRef(null);
  const stepsRef = useRef(null);
  const stratRef = useRef(null);
  const riskRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const whatInView = useInView(whatRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const stratInView = useInView(stratRef, { once: true, margin: "-80px" });
  const riskInView = useInView(riskRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[260px] pb-10">
        {/* Back button */}
        <div className="px-6 pt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            VOLTAR AO COMANDO
          </button>
        </div>

        {/* HERO */}
        <section ref={heroRef} className="section-padding pt-8 md:pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-dim/50 bg-gold/5 mb-6"
            >
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-xs font-mono text-gold tracking-wider">GUIA COMPLETO</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Como Fazer e Receber{" "}
              <span className="text-gradient-gold">PIX com Criptomoedas</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Use Bitcoin, USDT ou Ethereum como saldo e pague qualquer QR Code PIX no Brasil.{" "}
              <span className="text-foreground font-semibold">Simples. Rápido. Invisível.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => document.getElementById("tutorial")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-lg gradient-gold text-primary-foreground font-semibold tracking-wide text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                Ver Tutorial Visual
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 rounded-lg border border-border bg-card text-foreground font-semibold tracking-wide text-sm hover:border-gold/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Apoiar Projeto
              </button>
            </motion.div>
          </div>
        </section>

        {/* O QUE É */}
        <section ref={whatRef} className="section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={whatInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <p className="pre-title">CLAREZA TÉCNICA</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                O que é <span className="text-gradient-gold">de verdade</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Sem frases de marketing. Apenas o mecanismo real.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={whatInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8 mb-8"
            >
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                O que acontece quando você "faz PIX com cripto"? O que essas plataformas fazem é simples: usam seu saldo em criptomoedas e, no momento do pagamento,{" "}
                <span className="text-foreground font-medium">convertem automaticamente para reais</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Do outro lado, o recebedor recebe um PIX normal na conta — e{" "}
                <span className="text-foreground font-medium">não precisa saber que você pagou com cripto</span>.
              </p>
            </motion.div>

            {/* Flow visual */}
            <motion.div
              initial="hidden"
              animate={whatInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={2}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            >
              {[
                { label: "Cripto", sub: "BTC / USDT / ETH", color: "text-gold" },
                { label: "→", sub: "", color: "text-muted-foreground" },
                { label: "Liquidação Instantânea", sub: "Conversão automática", color: "text-foreground" },
                { label: "→", sub: "", color: "text-muted-foreground" },
                { label: "Real (BRL)", sub: "PIX recebido", color: "text-green-400" },
              ].map((item, i) =>
                item.label === "→" ? (
                  <span key={i} className="text-2xl text-muted-foreground/50 hidden md:block">⚡</span>
                ) : (
                  <div key={i} className="text-center px-6 py-4 rounded-lg border border-border bg-card/80 min-w-[140px]">
                    <p className={`font-bold text-lg ${item.color}`}>{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                )
              )}
            </motion.div>

            {/* Por que importa */}
            <motion.div
              initial="hidden"
              animate={whatInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="rounded-xl border border-gold-dim/30 bg-gold/5 p-6">
                <h3 className="text-lg font-bold text-gold mb-3">Por que isso importa?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Porque isso reduz fricção. Em vez de "sacar" e esperar, você usa cripto como saldo e paga como se fosse banco.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-red-400">Atenção</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Isso quase sempre envolve custódia (saldo numa corretora) e regras da plataforma.{" "}
                  <span className="text-foreground font-medium">Praticidade ≠ Autocustódia.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PASSO A PASSO */}
        <section ref={stepsRef} id="tutorial" className="section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <p className="pre-title">EXECUÇÃO</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
                Como fazer <span className="text-gradient-gold">(Passo a Passo)</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  animate={stepsInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-gold-dim/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-gold flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gold/60 tracking-wider">{step.num}</span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DICA ESTRATÉGICA */}
        <section ref={stratRef} className="section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={stratInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <p className="pre-title">SEM HYPE</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
                Dica <span className="text-gradient-gold">Estratégica</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial="hidden"
                animate={stratInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={1}
                className="rounded-xl border border-green-500/20 bg-green-500/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-green-400">Estabilidade</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Se você quer previsibilidade para pagamentos do dia a dia, usar{" "}
                  <span className="text-foreground font-medium">Stablecoins (USDT)</span> como saldo evita surpresas com a variação do preço.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={stratInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={2}
                className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-orange-400">Volatilidade</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Se você quer diversificação, mantém parte em BTC/ETH, mas entende que o{" "}
                  <span className="text-foreground font-medium">poder de compra varia diariamente</span>.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate={stratInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              className="rounded-xl border border-border bg-card/80 p-6 text-center"
            >
              <p className="text-muted-foreground">
                Quer ver na prática?{" "}
                <span className="text-foreground font-semibold">Teste com valores pequenos (ex: R$ 10,00)</span>{" "}
                para entender o fluxo e validar se faz sentido para sua rotina.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PLATAFORMA RECOMENDADA */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <p className="pre-title">PLATAFORMA RECOMENDADA</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Desbloqueie o <span className="text-gradient-gold">Terminal de Pagamentos</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Para executar a blindagem financeira com eficiência, é necessário utilizar uma plataforma com liquidez global.
            </p>

            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/30 via-gold/10 to-transparent blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-gold-dim/50 bg-card p-8 text-center">
                  <p className="font-mono text-xs text-gold/60 tracking-wider mb-4">QR CODE DE ACESSO À BYBIT</p>
                  <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden border border-border bg-white p-2">
                    <img src={qrCodeImg} alt="QR Code Bybit" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 font-mono">ESCANEIE PARA ACESSAR</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RISCOS & SEGURANÇA */}
        <section ref={riskRef} className="section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={riskInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <p className="pre-title">O QUE NINGUÉM TE FALA</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Riscos & <span className="text-gradient-gold">Segurança</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Se você quer parecer adulto e não "iniciante empolgado", você precisa saber isso.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial="hidden"
                animate={riskInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={1}
                className="rounded-xl border border-red-500/20 bg-card/50 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-foreground">Custódia</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Para pagar PIX com cripto, quase sempre você precisa manter saldo numa plataforma.{" "}
                  <span className="text-red-400 font-medium">Saldo em exchange ≠ autocustódia.</span>
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={riskInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={2}
                className="rounded-xl border border-orange-500/20 bg-card/50 p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-bold text-foreground">KYC / Regras</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Plataformas exigem verificação e podem impor limites. Regras podem mudar sem aviso.{" "}
                  <span className="text-orange-400 font-medium">Tenha sempre um plano B.</span>
                </p>
              </motion.div>
            </div>

            {/* CONCLUSÃO */}
            <motion.div
              initial="hidden"
              animate={riskInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              className="rounded-xl border border-gold-dim/30 bg-gradient-to-br from-gold/5 to-transparent p-8 text-center"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-bold">Conclusão prática:</span> Usar PIX com cripto é uma ponte útil para a realidade brasileira — mas{" "}
                <span className="text-gold font-semibold">não é substituto de soberania</span>. Use como ferramenta, não como muleta.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default PixCripto;
