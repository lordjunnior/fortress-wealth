import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import BackToHome from "@/components/BackToHome";

import heroImg from "@/assets/palau-v4-hero.jpg";
import clarityImg from "@/assets/palau-v4-clarity.jpg";
import exchangeImg from "@/assets/palau-v4-exchange.jpg";
import neobankImg from "@/assets/palau-v4-neobank.jpg";
import structureImg from "@/assets/palau-v4-structure.jpg";
import errorImg from "@/assets/palau-v4-error.jpg";
import bankImg from "@/assets/palau-v4-bank.jpg";
import islandImg from "@/assets/palau-v4-island.jpg";
import transitionImg from "@/assets/palau-v4-transition.jpg";
import ctaImg from "@/assets/palau-v4-cta.jpg";

const C = {
  base: "#F5EFE4",
  base2: "#EFE6D6",
  ink: "#1F2430",
  ink2: "#5F6673",
  blue: "#1F3560",
  green: "#2E5A4F",
  gold: "#B08A4A",
  white: "#FAF7F1",
};

const SERIF = "'Fraunces', 'Cormorant Garamond', Georgia, serif";
const SANS = "'Inter Tight', 'DM Sans', Inter, system-ui, sans-serif";

const FAQS = [
  { q: "O ID de Palau é cidadania?", a: "Não. Não equivale a uma cidadania completa nem concede, por si só, os direitos típicos de um passaporte ou de uma naturalização formal." },
  { q: "O ID de Palau é residência?", a: "Não exatamente. Não funciona como residência tradicional com direitos de permanência. É um documento emitido por um governo soberano, com usos específicos." },
  { q: "Posso usar o ID de Palau em exchanges?", a: "Algumas exchanges aceitam o documento em verificação, mas as regras mudam com frequência. Cada plataforma deve ser consultada no momento do onboarding." },
  { q: "Posso abrir conta em qualquer banco usando o ID de Palau?", a: "Não. A maioria dos bancos tradicionais exige passaporte e comprovantes adicionais. O ID tende a ser mais útil em neobanks e plataformas digitais." },
  { q: "Preciso de comprovante de endereço?", a: "Em muitos casos, sim. Dependendo da instituição, só o documento não basta. Endereço e outros elementos de verificação podem ser exigidos." },
  { q: "O ID de Palau substitui passaporte?", a: "Não. Não substitui passaporte em processos que exijam documento de viagem ou prova formal de nacionalidade." },
  { q: "Resolve minha vida financeira internacional?", a: "Não sozinho. Pode ser útil em situações específicas, mas funciona melhor como parte de uma estrutura internacional mais ampla." },
  { q: "Quanto custa o ID de Palau?", a: "Os planos variam conforme prazo de validade e taxas aplicáveis. Valores e regras podem mudar ao longo do tempo." },
  { q: "O ID de Palau é legal?", a: "Sim, quando obtido e utilizado dentro das regras da plataforma emissora e das exigências das instituições envolvidas." },
  { q: "Vale a pena fazer o ID de Palau?", a: "Depende do objetivo. Para algumas pessoas, é peça útil de uma estratégia de privacidade e redundância documental. Isoladamente, pode não fazer sentido." },
];

type SceneProps = {
  image: string;
  align?: "left" | "right" | "center";
  overlay?: string;
  children: React.ReactNode;
  height?: string;
  parallaxStrength?: number;
  id?: string;
};

const SceneFullBleed: React.FC<SceneProps> = ({
  image, align = "left", overlay, children, height = "min-h-[100vh]", parallaxStrength = 0.15, id,
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallaxStrength * 100}%`, `${parallaxStrength * 100}%`]);
  const justify = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
  const textAlign = align === "center" ? "text-center" : "text-left";

  return (
    <section ref={ref} id={id} className={`relative ${height} w-full overflow-hidden flex items-center ${justify}`}>
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={image} alt="" className="w-full h-[120%] object-cover" loading="lazy" />
      </motion.div>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: overlay || (
            align === "left"
              ? "linear-gradient(90deg, rgba(31,36,48,0.82) 0%, rgba(31,36,48,0.55) 38%, rgba(31,36,48,0.15) 68%, rgba(31,36,48,0) 100%)"
              : align === "right"
              ? "linear-gradient(270deg, rgba(31,36,48,0.82) 0%, rgba(31,36,48,0.55) 38%, rgba(31,36,48,0.15) 68%, rgba(31,36,48,0) 100%)"
              : "linear-gradient(180deg, rgba(31,36,48,0.55) 0%, rgba(31,36,48,0.4) 50%, rgba(31,36,48,0.7) 100%)"
          ),
        }}
      />
      <div className={`relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 py-24 ${textAlign}`}>
        {children}
      </div>
    </section>
  );
};

const Divider: React.FC = () => (
  <div className="w-full flex justify-center py-2" style={{ background: C.base }}>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-[60%] origin-left"
      style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
    />
  </div>
);

const PremiumBtn: React.FC<{ children: React.ReactNode; variant?: "primary" | "ghost"; href?: string }> = ({
  children, variant = "primary", href,
}) => {
  const styles = variant === "primary"
    ? { background: C.white, color: C.ink, border: `1px solid ${C.white}` }
    : { background: "transparent", color: C.white, border: `1px solid rgba(250,247,241,0.45)` };

  const content = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] -skew-x-12"
        style={{ background: variant === "primary" ? C.gold : C.white, width: "140%", left: "-20%" }}
      />
      <span className="relative z-10 group-hover:text-[#1F2430] transition-colors duration-500" style={{ fontFamily: SANS }}>
        {children}
      </span>
    </>
  );

  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden px-9 py-5 text-[13px] uppercase tracking-[0.28em] font-semibold transition-all duration-500 cursor-pointer"
      style={styles}
    >
      {content}
    </a>
  );
};

const FloatBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-5 py-3 backdrop-blur-md rounded-sm border"
    style={{ background: "rgba(250,247,241,0.12)", borderColor: "rgba(250,247,241,0.25)" }}>
    <p className="text-[11px] uppercase tracking-[0.25em] text-white/95" style={{ fontFamily: SANS, fontWeight: 500 }}>{label}</p>
  </div>
);

const PalauDigitalResidency: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(hp, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(hp, [0, 0.7], [1, 0]);

  const islandRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ip } = useScroll({ target: islandRef, offset: ["start end", "end start"] });
  const islandY = useTransform(ip, [0, 1], ["-20%", "25%"]);

  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: jp } = useScroll({ target: journeyRef, offset: ["start 0.7", "end 0.3"] });
  const lineH = useTransform(jp, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    document.body.style.background = C.base;
    document.body.style.color = C.ink;
    return () => { document.body.style.background = ""; document.body.style.color = ""; };
  }, []);

  return (
    <>
      <Helmet>
        <title>ID de Palau: o que é, onde funciona e como usar com estratégia</title>
        <meta name="description" content="Entenda o ID de Palau: o que é, onde pode ser usado, suas limitações e como ele se encaixa em uma estratégia internacional de soberania pessoal." />
        <link rel="canonical" href="https://lordjunnior.com/palau-digital-residency" />
        <link rel="preload" as="image" href={heroImg} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter+Tight:wght@300;400;500;600;700&display=swap" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "TechArticle",
          headline: "ID de Palau: o que é, onde funciona e como usar com estratégia",
          description: "Guia editorial sobre o ID de Palau, suas aplicações, limitações e papel em uma estratégia maior de soberania pessoal.",
          author: { "@type": "Person", name: "Lord Junnior" },
          publisher: { "@type": "Organization", name: "Lord Junnior" },
          mainEntityOfPage: { "@type": "WebPage", "@id": "https://lordjunnior.com/palau-digital-residency" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "HowTo", name: "Como obter o ID de Palau",
          step: [
            { "@type": "HowToStep", name: "Solicitação", text: "Inicie o pedido pela plataforma responsável." },
            { "@type": "HowToStep", name: "Verificação", text: "Passe pelo processo de validação exigido." },
            { "@type": "HowToStep", name: "Emissão", text: "Aguarde a aprovação e a emissão do documento." },
            { "@type": "HowToStep", name: "Entrega", text: "Receba o cartão físico." },
            { "@type": "HowToStep", name: "Uso estratégico", text: "Avalie documentação complementar para usos específicos." },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })}</script>
      </Helmet>

      <style>{`
        .palau-page { font-family: ${SANS}; background: ${C.base}; color: ${C.ink}; }
        .palau-page h1, .palau-page h2, .palau-page h3 { font-family: ${SERIF}; font-weight: 400; letter-spacing: -0.01em; }
        .palau-page p { line-height: 1.75; }
        .float-y { animation: floaty 6s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>

      <div className="palau-page" style={{ background: C.base }}>
        <BackToHome />

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <img src={heroImg} alt="ID de Palau sobre mapa-múndi e passaporte" className="w-full h-[115%] object-cover" fetchPriority="high" />
          </motion.div>
          <div className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(95deg, rgba(31,36,48,0.85) 0%, rgba(31,36,48,0.6) 38%, rgba(31,36,48,0.15) 65%, rgba(31,36,48,0) 90%)" }} />

          <motion.div style={{ opacity: heroOpacity }}
            className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-16 pt-32 md:pt-44 pb-24 grid md:grid-cols-12 gap-10 items-center min-h-screen">
            <div className="md:col-span-7 lg:col-span-6">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] mb-8"
                style={{ color: C.gold, fontFamily: SANS, fontWeight: 600 }}>
                Estratégia Avançada de Soberania
              </motion.p>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-white leading-[0.92]"
                style={{ fontFamily: SERIF, fontSize: "clamp(64px, 11vw, 180px)", fontWeight: 300 }}>
                ID de <em style={{ color: C.gold, fontStyle: "italic", fontWeight: 400 }}>Palau</em>
              </motion.h1>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.7 }}
                className="h-px w-32 my-10 origin-left" style={{ background: C.gold }} />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/85 max-w-xl mb-6"
                style={{ fontFamily: SERIF, fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.4 }}>
                Uma identidade fora da sua jurisdição principal.
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
                className="text-white/65 max-w-lg mb-12" style={{ fontSize: "clamp(17px, 1.2vw, 19px)", lineHeight: 1.7 }}>
                Nem tudo exige cidadania. Mas tudo exige estratégia. Esta página mostra,
                de forma clara e prática, onde o ID de Palau funciona — e onde não.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4">
                <PremiumBtn href="#onde-funciona" variant="primary">Começar agora</PremiumBtn>
                <PremiumBtn href="#como-obter" variant="ghost">Onde funciona</PremiumBtn>
              </motion.div>
            </div>

            <div className="hidden md:block md:col-span-5 lg:col-span-6 relative h-full">
              <div className="absolute top-[18%] right-[8%] float-y"><FloatBadge label="Emitido por Estado soberano" /></div>
              <div className="absolute top-[42%] right-[22%] float-y" style={{ animationDelay: "1s" }}><FloatBadge label="Processo 100% online" /></div>
              <div className="absolute top-[66%] right-[6%] float-y" style={{ animationDelay: "2s" }}><FloatBadge label="Aplicação internacional" /></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/70" style={{ fontFamily: SANS, fontWeight: 500 }}>Role para entender</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={18} className="text-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* CENA 02 — O QUE NÃO É */}
        <SceneFullBleed image={clarityImg} align="left" parallaxStrength={0.12}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>Cena 01 — Clareza</p>
            <h2 className="text-white mb-12" style={{ fontSize: "clamp(44px, 6.5vw, 96px)", lineHeight: 1.02 }}>
              O que o ID<br />de Palau <em style={{ color: C.gold }}>não é</em>.
            </h2>
            <div className="space-y-5 mb-14">
              {["Não é cidadania completa", "Não é residência tradicional", "Não é passaporte", "Não resolve tudo sozinho"].map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-5 text-white/90"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)", fontFamily: SERIF, fontWeight: 300 }}>
                  <span className="h-px w-10" style={{ background: C.gold }} />
                  <span>{t}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-l-2 pl-7" style={{ borderColor: C.gold }}>
              <p className="text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: C.gold, fontWeight: 600 }}>O que ele é</p>
              <p className="text-white/85" style={{ fontSize: "clamp(20px, 1.5vw, 24px)", lineHeight: 1.55, fontFamily: SERIF }}>
                Um documento emitido por um Estado soberano, com utilidade específica em contextos internacionais —
                quando inserido em uma estratégia maior.
              </p>
            </div>
          </motion.div>
        </SceneFullBleed>

        <Divider />

        {/* CENA 03 — ONDE FUNCIONA */}
        <section id="onde-funciona" className="relative py-32 md:py-40" style={{ background: C.base }}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-20 md:mb-28 text-center">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>
              Cena 02 — Aplicação
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
              style={{ fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 1.05, color: C.ink }}>
              Onde o ID de Palau<br /><em style={{ color: C.green }}>funciona na prática</em>.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mt-8" style={{ fontSize: 20, color: C.ink2, fontFamily: SERIF }}>
              Nem toda utilidade é universal. O valor está em casos específicos.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: C.base2 }}>
            {[
              { img: exchangeImg, tag: "01 — Exchanges", title: "Onboarding internacional", copy: "Algumas exchanges aceitam o ID em verificação. Compliance varia.", list: ["Coinbase", "KuCoin", "Gate.io", "MEXC", "Bitget", "CEX.IO"] },
              { img: neobankImg, tag: "02 — Neobanks", title: "Operação global simplificada", copy: "Plataformas digitais podem aceitar o documento. Reputação deve ser verificada caso a caso.", list: ["The Kingdom Bank", "Vexel", "Ultimopay", "Blackcatcard"] },
              { img: structureImg, tag: "03 — Estrutura", title: "Camada operacional", copy: "Peça complementar de uma arquitetura internacional de documentação e redundância.", list: ["Documentação", "Redundância", "Mobilidade", "Acesso global"] },
            ].map((card, i) => (
              <motion.div key={card.tag} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }} className="group relative overflow-hidden cursor-pointer"
                style={{ background: C.white, minHeight: "70vh" }}>
                <div className="relative h-[55vh] overflow-hidden">
                  <motion.img src={card.img} alt={card.title} loading="lazy"
                    className="w-full h-full object-cover" whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: "linear-gradient(180deg, rgba(31,36,48,0) 40%, rgba(31,36,48,0.85) 100%)" }} />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="text-[11px] uppercase tracking-[0.35em] mb-3" style={{ color: C.gold, fontWeight: 600 }}>{card.tag}</p>
                    <h3 className="text-white" style={{ fontSize: "clamp(28px, 2.4vw, 38px)", lineHeight: 1.1 }}>{card.title}</h3>
                  </div>
                </div>
                <div className="p-9">
                  <p style={{ fontSize: 18, color: C.ink2, lineHeight: 1.7, marginBottom: 24 }}>{card.copy}</p>
                  <ul className="space-y-2.5">
                    {card.list.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px]" style={{ color: C.ink, fontWeight: 500 }}>
                        <span className="h-px w-5" style={{ background: C.gold }} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CENA 04 — ERRO 99% */}
        <SceneFullBleed image={errorImg} align="center" height="min-h-[90vh]"
          overlay="linear-gradient(180deg, rgba(15,18,25,0.85) 0%, rgba(15,18,25,0.7) 50%, rgba(15,18,25,0.9) 100%)">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2 }} className="max-w-5xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: C.gold, fontWeight: 600 }}>Cena 03 — Verdade</p>
            <h2 className="text-white mb-10" style={{ fontSize: "clamp(48px, 8vw, 130px)", lineHeight: 0.98 }}>
              O erro não é<br /><em style={{ color: C.gold }}>comprar</em> o ID.
            </h2>
            <h2 className="text-white/80" style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: 1.05 }}>
              É não saber <em style={{ color: C.gold }}>usar</em>.
            </h2>
            <div className="h-px w-32 mx-auto my-12" style={{ background: C.gold }} />
            <p className="text-white/75 max-w-2xl mx-auto" style={{ fontSize: "clamp(20px, 1.4vw, 24px)", lineHeight: 1.6, fontFamily: SERIF }}>
              O documento sozinho não resolve. Sem estrutura — comprovante de endereço, alinhamento jurisdicional,
              planejamento real — ele perde valor.
            </p>
          </motion.div>
        </SceneFullBleed>

        {/* CENA 05 — LIMITAÇÃO */}
        <SceneFullBleed image={bankImg} align="right" parallaxStrength={0.1}>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1 }} className="max-w-xl ml-auto">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>Cena 04 — Limites</p>
            <h2 className="text-white mb-10" style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.02 }}>
              Onde <em style={{ color: C.gold }}>não</em> resolve.
            </h2>
            <ul className="space-y-6 mb-12">
              {[
                "Bancos tradicionais costumam exigir passaporte",
                "Comprovante de residência robusto é frequente",
                "ID local não define residência fiscal",
                "Não substitui uma estrutura internacional completa",
              ].map((t, i) => (
                <motion.li key={t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }} className="text-white/85 flex gap-5"
                  style={{ fontSize: "clamp(18px, 1.3vw, 22px)", lineHeight: 1.5, fontFamily: SERIF }}>
                  <span className="text-white/40 mt-1" style={{ fontSize: 14, fontFamily: SANS }}>0{i + 1}</span>
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>
            <p className="border-l-2 pl-6 text-white/95"
              style={{ borderColor: C.gold, fontFamily: SERIF, fontSize: "clamp(24px, 2vw, 32px)", lineHeight: 1.3, fontStyle: "italic" }}>
              Ferramenta não é estratégia.
            </p>
          </motion.div>
        </SceneFullBleed>

        <Divider />

        {/* CENA 06 — VANTAGENS */}
        <section className="relative py-32 md:py-44" style={{ background: C.base2 }}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="mb-20 md:mb-28 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>Cena 05 — Por quê</p>
              <h2 style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05, color: C.ink }}>
                Por que tantas pessoas se interessam<br />pelo <em style={{ color: C.green }}>ID de Palau</em>.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: C.base }}>
              {[
                { n: "01", t: "Privacidade operacional", c: "Menor exposição direta da jurisdição de origem em alguns contextos." },
                { n: "02", t: "Acesso internacional", c: "Possível utilidade em plataformas globais, sujeito a critérios de compliance." },
                { n: "03", t: "Baixo custo de entrada", c: "Opção relativamente acessível em comparação com outras estruturas internacionais." },
                { n: "04", t: "Processo online", c: "Solicitação digital, com emissão e envio físico do documento." },
              ].map((v, i) => (
                <motion.div key={v.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="p-12 md:p-16 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(31,36,48,0.25)]"
                  style={{ background: C.base2 }}>
                  <div className="flex items-baseline gap-6 mb-7">
                    <span style={{ fontFamily: SERIF, fontSize: 56, color: C.gold, fontWeight: 300 }}>{v.n}</span>
                    <div className="h-px flex-1" style={{ background: C.ink + "20" }} />
                  </div>
                  <h3 className="mb-5" style={{ fontSize: "clamp(28px, 2.5vw, 40px)", color: C.ink, lineHeight: 1.15 }}>{v.t}</h3>
                  <p style={{ fontSize: 19, color: C.ink2, lineHeight: 1.7 }}>{v.c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CENA 07 — JORNADA */}
        <section id="como-obter" className="relative py-32 md:py-44" style={{ background: C.base }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-16">
            <div className="mb-24 text-center">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>Cena 06 — Caminho</p>
              <h2 style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05, color: C.ink }}>
                Como <em style={{ color: C.green }}>obter</em>.
              </h2>
            </div>
            <div ref={journeyRef} className="relative pl-20 md:pl-28">
              <div className="absolute left-7 md:left-10 top-0 bottom-0 w-px" style={{ background: C.ink + "15" }} />
              <motion.div className="absolute left-7 md:left-10 top-0 w-[2px] origin-top"
                style={{ height: lineH, background: C.gold }} />
              {[
                { n: "01", t: "Solicitação", d: "Inicie o pedido pela plataforma responsável pela emissão do documento." },
                { n: "02", t: "Verificação", d: "Passe pelo processo de validação exigido — KYC e checagem de identidade." },
                { n: "03", t: "Emissão", d: "Aguarde a aprovação e a emissão oficial pelo governo soberano." },
                { n: "04", t: "Entrega", d: "Receba o cartão físico no endereço informado, em qualquer lugar do mundo." },
                { n: "05", t: "Uso estratégico", d: "Avalie documentação complementar (endereço, telefone) para casos específicos." },
              ].map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="relative pb-20 last:pb-0">
                  <div className="absolute -left-[60px] md:-left-[80px] top-2 w-4 h-4 rounded-full border-2 bg-[#F5EFE4] z-10"
                    style={{ borderColor: C.gold }} />
                  <p className="text-[11px] uppercase tracking-[0.35em] mb-3" style={{ color: C.gold, fontWeight: 600 }}>Passo {s.n}</p>
                  <h3 style={{ fontSize: "clamp(32px, 3.5vw, 52px)", color: C.ink, lineHeight: 1.1, marginBottom: 14 }}>{s.t}</h3>
                  <p style={{ fontSize: 20, color: C.ink2, lineHeight: 1.7, maxWidth: 600 }}>{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CENA 08 — TRANSIÇÃO */}
        <SceneFullBleed image={transitionImg} align="center" parallaxStrength={0.18}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2 }} className="max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: C.gold, fontWeight: 600 }}>Cena 07 — Estratégia</p>
            <h2 className="text-white mb-8" style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 1.02 }}>
              Não é o <em style={{ color: C.gold }}>começo</em>.
            </h2>
            <h2 className="text-white/80 mb-12" style={{ fontSize: "clamp(32px, 4.5vw, 70px)", lineHeight: 1.05 }}>
              É uma <em style={{ color: C.gold }}>peça</em>.
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto" style={{ fontSize: "clamp(20px, 1.5vw, 26px)", lineHeight: 1.55, fontFamily: SERIF }}>
              Sozinho, é limitado. Dentro de uma arquitetura maior — soberania pessoal, redundância documental,
              presença internacional — muda de patamar.
            </p>
          </motion.div>
        </SceneFullBleed>

        {/* CENA 09 — PALAU */}
        <section ref={islandRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
          <motion.div className="absolute inset-0 z-0" style={{ y: islandY }}>
            <img src={islandImg} alt="Palau, ilhas tropicais" loading="lazy" className="w-full h-[140%] object-cover" />
          </motion.div>
          <div className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(180deg, rgba(31,53,96,0.35) 0%, rgba(31,53,96,0.5) 60%, rgba(15,18,25,0.85) 100%)" }} />
          <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 py-32">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: C.gold, fontWeight: 600 }}>Refúgio Digital</p>
              <h2 className="text-white mb-12" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.9, fontWeight: 300 }}>Palau.</h2>
              <div className="h-px w-32 mb-12" style={{ background: C.gold }} />
              <p className="text-white/90 mb-12 max-w-xl" style={{ fontSize: "clamp(22px, 1.8vw, 30px)", lineHeight: 1.45, fontFamily: SERIF }}>
                Uma identidade emitida por um Estado soberano, com aplicação real no sistema global.
              </p>
              <ul className="space-y-4 mb-14">
                {["Documento oficial", "Processo online", "Potencial crescente"].map((t) => (
                  <li key={t} className="flex items-center gap-5 text-white/85" style={{ fontSize: 20, fontFamily: SERIF }}>
                    <span className="h-px w-10" style={{ background: C.gold }} />{t}
                  </li>
                ))}
              </ul>
              <PremiumBtn href="#cta-final" variant="primary">Ver como usar corretamente</PremiumBtn>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* CENA 10 — FAQ */}
        <section className="relative py-32 md:py-44" style={{ background: C.base }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-16">
            <div className="mb-20 text-center">
              <p className="text-[11px] uppercase tracking-[0.4em] mb-6" style={{ color: C.gold, fontWeight: 600 }}>Cena 08 — Esclarecimentos</p>
              <h2 style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05, color: C.ink }}>
                Perguntas <em style={{ color: C.green }}>frequentes</em>.
              </h2>
            </div>
            <div>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-t" style={{ borderColor: C.ink + "15" }}>
                    <button onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-8 py-8 md:py-10 text-left transition-colors group">
                      <h3 className="transition-colors duration-300"
                        style={{ fontSize: "clamp(22px, 2vw, 30px)", color: isOpen ? C.green : C.ink, lineHeight: 1.25, fontWeight: 400 }}>
                        {f.q}
                      </h3>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4 }}
                        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border"
                        style={{ borderColor: isOpen ? C.gold : C.ink + "30", color: isOpen ? C.gold : C.ink }}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </motion.div>
                    </button>
                    <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="pb-10 pr-4 md:pr-20 max-w-3xl" style={{ fontSize: 20, color: C.ink2, lineHeight: 1.7 }}>{f.a}</p>
                    </motion.div>
                  </div>
                );
              })}
              <div className="border-t" style={{ borderColor: C.ink + "15" }} />
            </div>
          </div>
        </section>

        {/* CENA 11 — CTA FINAL */}
        <SceneFullBleed image={ctaImg} align="left" height="min-h-[95vh]" parallaxStrength={0.1}
          overlay="linear-gradient(95deg, rgba(31,53,96,0.92) 0%, rgba(31,53,96,0.7) 40%, rgba(31,53,96,0.25) 75%, rgba(31,53,96,0) 100%)">
          <div id="cta-final" />
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }} transition={{ duration: 1.2 }} className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-8" style={{ color: C.gold, fontWeight: 600 }}>Cena Final — Decisão</p>
            <h2 className="text-white mb-6" style={{ fontSize: "clamp(48px, 7vw, 110px)", lineHeight: 0.98 }}>
              <em style={{ color: C.gold }}>Clareza</em><br />primeiro.
            </h2>
            <h2 className="text-white/80 mb-12" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.05 }}>Estrutura depois.</h2>
            <div className="h-px w-32 mb-10" style={{ background: C.gold }} />
            <p className="text-white/85 mb-14 max-w-xl" style={{ fontSize: "clamp(20px, 1.4vw, 24px)", lineHeight: 1.6, fontFamily: SERIF }}>
              Você não precisa fazer tudo hoje. Mas precisa começar certo.
              O valor do ID de Palau não está no hype — está no uso correto.
            </p>
            <div className="flex flex-wrap gap-4">
              <PremiumBtn href="https://rns.id/?rc_by=UaXUiIDb" variant="primary">Começar com o ID</PremiumBtn>
              <PremiumBtn href="/teoria-das-bandeiras" variant="ghost">Ver estratégia completa</PremiumBtn>
            </div>
          </motion.div>
        </SceneFullBleed>

        <div className="py-12 text-center" style={{ background: C.base, color: C.ink2, fontSize: 13 }}>
          <p>Conteúdo educacional. Verifique sempre as regras vigentes de cada plataforma.</p>
        </div>
      </div>
    </>
  );
};

export default PalauDigitalResidency;
