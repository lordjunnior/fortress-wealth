import { useState } from "react";
import { Zap, Copy, Check, ArrowRight, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { LIGHTNING_ADDRESS } from "@/lib/constants";
import DonationPhoneMockup from "@/components/DonationPhoneMockup";

const DonationCTA = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-16 mb-8">
      {/* ── BLOCO PRINCIPAL: COMBUSTÍVEL OPERACIONAL ── */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gold" />
          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground uppercase">
            Combustível Operacional
          </h3>
        </div>

        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
          <p>
            Este conteúdo foi construído sem patrocinadores, sem anúncios invasivos e sem nenhum vínculo
            com corretoras ou instituições financeiras. Cada linha que você leu aqui custou{" "}
            <span className="text-foreground font-semibold">tempo, pesquisa e infraestrutura</span> — mantidos
            exclusivamente por quem acredita que{" "}
            <span className="text-gold font-bold">informação de qualidade não deveria ter dono corporativo</span>.
          </p>
          <p>
            Se este material te deu clareza, te poupou de um erro ou te mostrou um caminho que você não
            conhecia, você pode retribuir da forma mais soberana possível:{" "}
            <span className="text-foreground font-semibold">
              enviando sats diretamente, sem intermediários, sem burocracia, sem rastro bancário
            </span>.
          </p>
          <p className="text-foreground font-medium">
            Cada sat enviado é um voto direto pela independência editorial.
            Você não está "doando". Você está{" "}
            <span className="text-gold font-bold">financiando soberania</span>.
          </p>
        </div>

        {/* ── ENDEREÇO LIGHTNING ── */}
        <div className="bg-background/60 border border-border rounded-lg p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
            <Zap className="w-3 h-3 inline mr-1 text-gold" />
            Endereço Lightning (Layer 2 do Bitcoin)
          </p>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleCopy}
          >
            <code className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors select-all break-all">
              {LIGHTNING_ADDRESS}
            </code>
            {copied ? (
              <Check className="w-4 h-4 text-chart-green flex-shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
            )}
          </div>
          {copied && (
            <p className="text-xs text-chart-green mt-1 animate-pulse">Endereço copiado!</p>
          )}
        </div>

        {/* ── TUTORIAL LIGHTNING ── */}
        <div className="bg-background/40 border border-border/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-gold" />
            <p className="text-sm font-semibold text-foreground">
              Não sabe usar a Lightning Network?
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Sem problema. Criamos um guia completo que te leva do zero à primeira transação
            em menos de 10 minutos. Aprenda o que é, como funciona e qual carteira usar.
          </p>
          <Link
            to="/lightning"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300"
          >
            APRENDER A USAR LIGHTNING
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── ALTERNATIVA PIX ── */}
        <div className="bg-background/40 border border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">
              Prefere enviar Bitcoin via PIX?
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Se o anonimato não é a sua prioridade no momento, você também pode adquirir
            Bitcoin usando PIX e enviar para o endereço acima. Rápido, simples e funcional
            — o importante é que o valor chegue{" "}
            <span className="text-foreground font-medium">sem depender de plataformas centralizadas</span>.
          </p>
          <Link
            to="/comprar-bitcoin-anonimo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-gold-dim hover:text-foreground transition-all duration-300"
          >
            VER TUTORIAL: BITCOIN VIA PIX
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;
