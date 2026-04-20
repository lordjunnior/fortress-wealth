import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FlaskConical, AlertTriangle, ArrowLeft, Leaf } from "lucide-react";
import BackToHome from "@/components/BackToHome";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import ScrollToTop from "@/components/ScrollToTop";
import bgQuelantes from "@/assets/backgrounds/bg-quelantes.jpg";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Planta {
  nome: string;
  cientifico: string;
  alvo: string;       // metal/toxina alvo
  ativos: string;     // compostos ativos
  uso: string;        // posologia
  ciclo: string;
  contra: string;
  sinergia: string;
}

const PLANTAS: Planta[] = [
  {
    nome: "Coentro",
    cientifico: "Coriandrum sativum",
    alvo: "Mercúrio, alumínio (sistema nervoso central)",
    ativos: "Linalol, dodecanal, ácido caféico, quercetina",
    uso: "30-50g de folhas frescas/dia trituradas em sucos verdes ou pesto",
    ciclo: "21 dias on / 7 dias off — repetir 3 ciclos",
    contra: "Hipotensão severa, anticoagulantes (warfarina) — interação",
    sinergia: "OBRIGATÓRIO pareado com Chlorella — coentro mobiliza, chlorella sequestra",
  },
  {
    nome: "Chlorella",
    cientifico: "Chlorella vulgaris / pyrenoidosa",
    alvo: "Mercúrio, chumbo, cádmio, dioxinas",
    ativos: "Parede celular de esporopolenina, clorofila, CGF",
    uso: "2-3g/dia (em pó ou comprimidos), longe de refeições com cobre/zinco",
    ciclo: "Concomitante ao coentro — mesma duração",
    contra: "Alergia a iodo, doença autoimune ativa, anticoagulantes",
    sinergia: "Coentro (essencial), espirulina (potencializa)",
  },
  {
    nome: "Ipê-roxo",
    cientifico: "Handroanthus impetiginosus",
    alvo: "Carga inflamatória sistêmica, suporte hepático na fase 2",
    ativos: "Lapachol, beta-lapachona, naftoquinonas",
    uso: "Decocção de 5g de casca em 500ml — 200ml 2x/dia",
    ciclo: "14 dias on / 14 dias off",
    contra: "Gestação (categoria X), distúrbios de coagulação",
    sinergia: "Sucupira (potencializa anti-inflamatório), cardo-mariano (proteção hepática)",
  },
  {
    nome: "Sucupira",
    cientifico: "Pterodon emarginatus",
    alvo: "Detoxificação articular e linfática, anti-inflamatório",
    ativos: "Diterpenos furânicos, isoflavonas",
    uso: "Tintura 1:5 — 20-30 gotas em água, 2x/dia",
    ciclo: "21 dias on / 14 dias off",
    contra: "Gestação, hipotensos, uso prolongado sem pausa",
    sinergia: "Ipê-roxo (anti-inflamatório), unha-de-gato (modulação imune)",
  },
  {
    nome: "Cardo-mariano",
    cientifico: "Silybum marianum",
    alvo: "Proteção e regeneração hepática durante quelação",
    ativos: "Silimarina (silibina, silidianina, silicristina)",
    uso: "200-400mg de extrato padronizado (70-80% silimarina)/dia",
    ciclo: "Contínuo durante todo protocolo de quelação",
    contra: "Alergia a Asteraceae, doença biliar obstrutiva",
    sinergia: "Suporte universal — usar com TODOS os outros quelantes",
  },
  {
    nome: "Espirulina",
    cientifico: "Arthrospira platensis",
    alvo: "Arsênico, cádmio, suporte nutricional",
    ativos: "Ficocianina, clorofila, ácido gama-linolênico",
    uso: "3-5g/dia em ciclos, longe de café/chá (taninos)",
    ciclo: "Contínuo, com pausa de 7 dias a cada 60",
    contra: "Fenilcetonúria, doença autoimune, gota",
    sinergia: "Chlorella (sinergia em metais), suporte energético geral",
  },
  {
    nome: "Unha-de-gato",
    cientifico: "Uncaria tomentosa",
    alvo: "Modulação imune, suporte sistêmico durante quelação",
    ativos: "Alcaloides oxindólicos, glicosídeos do ácido quinóvico",
    uso: "Decocção 3g de casca em 500ml — 150ml 2x/dia",
    ciclo: "30 dias on / 15 dias off",
    contra: "Gestação, transplantados (imunossupressão), autoimunes ativos",
    sinergia: "Sucupira, ipê-roxo (eixo anti-inflamatório completo)",
  },
  {
    nome: "Quebra-pedra",
    cientifico: "Phyllanthus niruri",
    alvo: "Suporte renal — via de excreção de quelantes ligados",
    ativos: "Filantina, hipofilantina, lignanas",
    uso: "Infusão 1 colher de sopa/xícara — 2-3x/dia",
    ciclo: "21 dias on / 7 dias off",
    contra: "Gestação, hipoglicemia, diuréticos prescritos",
    sinergia: "Cavalinha (ambos renais), sempre durante mobilização de metais",
  },
  {
    nome: "Cavalinha",
    cientifico: "Equisetum arvense",
    alvo: "Suporte mineral durante quelação (sílica, cálcio, magnésio)",
    ativos: "Sílica orgânica, flavonoides, ácidos fenólicos",
    uso: "Infusão 5g/500ml — 250ml 2x/dia",
    ciclo: "14 dias on / 14 dias off",
    contra: "Cardiopatas, deficiência de tiamina, uso prolongado",
    sinergia: "Quebra-pedra (suporte renal duplo)",
  },
  {
    nome: "Carvão ativado vegetal",
    cientifico: "Carbonis activatus",
    alvo: "Sequestro intestinal de toxinas mobilizadas",
    ativos: "Estrutura microporosa de adsorção",
    uso: "1-2g em água, 2h longe de refeições e medicamentos",
    ciclo: "Pontual — máximo 3-5 dias seguidos",
    contra: "TODOS os medicamentos (adsorve fármacos), constipação",
    sinergia: "Uso emergencial em fase de mobilização agressiva",
  },
];

export default function ProtocoloQuelantes() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Protocolo de Quelantes Brasileiros — Fichas Técnicas",
    "url": "https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros",
    "description": "10 plantas brasileiras quelantes com fichas técnicas completas: alvo tóxico, compostos ativos, posologia, contraindicações e sinergias.",
    "lastReviewed": "2026-04-20",
  };

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Helmet>
        <title>Protocolo de Quelantes Brasileiros: 10 Plantas | Lord Junnior</title>
        <meta name="description" content="Fichas técnicas de 10 plantas brasileiras quelantes: coentro, chlorella, ipê-roxo, sucupira, cardo-mariano e mais. Posologia, ciclos, contraindicações." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <FixedThematicBackground image={bgQuelantes} intensity="heavy" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <section className="relative z-10 px-6 md:px-12 lg:px-20 pt-12 pb-16">
        <div className="max-w-5xl">
          <Link
            to="/soberania-organica/conhecimento-perdido/rape"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400 mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={12} /> Voltar ao Dossiê do Rapé
          </Link>

          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-emerald-400/80 uppercase mb-6">
            [ FICHAS TÉCNICAS · DETOXIFICAÇÃO ASSISTIDA ]
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: APPLE_EASE }}
            className="text-foreground font-bold leading-[0.95] tracking-tight mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 7.5vw, 6rem)",
              letterSpacing: "0.01em",
            }}
          >
            PROTOCOLO DE <br />
            <span className="text-emerald-400/90 italic font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              quelantes brasileiros
            </span>
          </motion.h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
            Dez plantas medicinais nativas e adotadas pela tradição brasileira que mobilizam, sequestram e excretam
            metais pesados e toxinas acumuladas. Cada ficha contém posologia, ciclos, contraindicações e sinergias —
            sem espaço para amadorismo.
          </p>
        </div>
      </section>

      {/* AVISO YMYL */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-12">
        <div className="max-w-5xl">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 backdrop-blur p-6 flex gap-4 items-start">
            <AlertTriangle className="text-destructive shrink-0 mt-1" size={22} />
            <p className="text-sm text-foreground/85 leading-7">
              <strong>Aviso técnico:</strong> a quelação mobiliza metais armazenados — fase mais perigosa que o estado
              estacionário. Sempre executar com suporte hepático (cardo-mariano) e renal (quebra-pedra/cavalinha).
              Acompanhamento médico obrigatório em portadores de doença crônica, gestantes e usuários de medicação contínua.
            </p>
          </div>
        </div>
      </section>

      {/* FICHAS */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-5xl space-y-6">
          {PLANTAS.map((p, i) => (
            <motion.article
              key={p.nome}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.05, ease: APPLE_EASE }}
              className="rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border/20">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                    <Leaf className="text-emerald-400" size={22} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/70 mb-1">
                      Ficha {String(i + 1).padStart(2, "0")} de {PLANTAS.length}
                    </p>
                    <h2
                      className="text-foreground font-bold text-3xl md:text-4xl tracking-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                    >
                      {p.nome}
                    </h2>
                    <p className="italic text-muted-foreground text-sm mt-1">{p.cientifico}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 text-sm md:text-base">
                  <Field label="Alvo" v={p.alvo} />
                  <Field label="Compostos ativos" v={p.ativos} />
                  <Field label="Posologia" v={p.uso} />
                  <Field label="Ciclo" v={p.ciclo} />
                  <Field label="Contraindicações" v={p.contra} danger />
                  <Field label="Sinergia" v={p.sinergia} accent />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA RETORNO */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl">
          <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/30 to-card/40 backdrop-blur p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="text-emerald-400" size={20} />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-400/80">[ COMPLETE O CICLO ]</p>
            </div>
            <h3
              className="text-foreground font-bold text-3xl md:text-5xl tracking-tight mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              VOLTE AO DOSSIÊ DO RAPÉ
            </h3>
            <p className="text-muted-foreground leading-8 mb-6 max-w-2xl">
              Quelantes sem o protocolo de modulação vagal são meia-estratégia. Volte e leia a integração completa
              com respiração, eixo HPA e rotina de blindagem.
            </p>
            <Link
              to="/soberania-organica/conhecimento-perdido/rape"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-[0.18em] uppercase hover:bg-emerald-500/25 transition-all"
            >
              <ArrowLeft size={14} /> Acessar o Dossiê do Rapé
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}

function Field({ label, v, danger, accent }: { label: string; v: string; danger?: boolean; accent?: boolean }) {
  const color = danger ? "text-destructive/90" : accent ? "text-emerald-400/90" : "text-muted-foreground";
  return (
    <div>
      <p className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-1.5 ${color}`}>{label}</p>
      <p className="text-foreground/85 leading-7">{v}</p>
    </div>
  );
}
