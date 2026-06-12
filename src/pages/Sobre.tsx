import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bitcoin,
  Globe2,
  Shield,
  BookOpen,
  Headphones,
  Wrench,
  Mail,
  Compass,
  Target,
  Flag,
  Eye,
} from "lucide-react";
import heroImg from "@/assets/sobre/hero-lord-junnior.jpg";
import bitcoinImg from "@/assets/sobre/missao-bitcoin.jpg";
import geoImg from "@/assets/sobre/geopolitica.jpg";
import privacyImg from "@/assets/sobre/privacidade.jpg";
import bibliotecaImg from "@/assets/sobre/biblioteca.jpg";

const SAND = "#faf6f0";
const SAND_DEEP = "#ece2d3";
const TEAL = "#0e3b3a";
const COPPER = "#c4632a";
const COPPER_LIGHT = "#ffb37a";
const INK = "#171612";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div
    className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
    style={{ color: light ? COPPER_LIGHT : COPPER }}
  >
    {children}
  </div>
);

const H2: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <h2
    className="text-4xl md:text-6xl lg:text-7xl leading-[0.95]"
    style={{
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 900,
      color: light ? SAND : INK,
      letterSpacing: "-0.02em",
    }}
  >
    {children}
  </h2>
);

const Body: React.FC<{ children: React.ReactNode; light?: boolean; large?: boolean }> = ({
  children,
  light,
  large,
}) => (
  <p
    className={`${large ? "text-xl md:text-2xl" : "text-lg md:text-xl"} leading-relaxed`}
    style={{
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 400,
      color: light ? "rgba(250,246,240,0.85)" : "rgba(23,22,18,0.82)",
    }}
  >
    {children}
  </p>
);

const Pull: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div className="border-l-4 pl-6 md:pl-8 py-2 my-10" style={{ borderColor: COPPER }}>
    <p
      className="text-2xl md:text-3xl leading-snug"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        color: light ? SAND : INK,
      }}
    >
      {children}
    </p>
  </div>
);

const Sobre: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lord Junnior",
    alternateName: "Lord Junnior",
    url: "https://lordjunnior.com.br",
    image: "https://lordjunnior.com.br" + heroImg,
    jobTitle: "Educador em Soberania Individual, Bitcoin e Geopolítica",
    description:
      "Lord Junnior é educador brasileiro focado em Bitcoin, autocustódia, geopolítica e privacidade digital. Constrói a maior plataforma em português sobre soberania individual.",
    knowsAbout: [
      "Bitcoin",
      "Autocustódia",
      "Geopolítica",
      "Privacidade digital",
      "Soberania individual",
      "Teoria das bandeiras",
      "Economia paralela",
      "Lightning Network",
    ],
    sameAs: [
      "https://instagram.com/lordjunnior",
      "https://youtube.com/@lordjunnior",
      "https://x.com/lordjunnior",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Lord Junnior",
      url: "https://lordjunnior.com.br",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://lordjunnior.com.br/" },
      { "@type": "ListItem", position: 2, name: "Sobre", item: "https://lordjunnior.com.br/sobre" },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: SAND, color: INK }}>
      <Helmet>
        <title>Sobre Lord Junnior, Bitcoin, Geopolítica e Privacidade Digital</title>
        <meta
          name="description"
          content="Quem é Lord Junnior, a missão por trás do projeto e por que ele fala sobre Bitcoin, geopolítica e privacidade digital. Conheça as ferramentas, e-books e audiobooks."
        />
        <link rel="canonical" href="https://lordjunnior.com.br/sobre" />
        <meta property="og:title" content="Sobre Lord Junnior" />
        <meta
          property="og:description"
          content="A história, a missão e o porquê do maior projeto em português sobre Bitcoin, geopolítica e soberania individual."
        />
        <meta property="og:url" content="https://lordjunnior.com.br/sobre" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section ref={heroRef} className="relative h-[92vh] w-full overflow-hidden" style={{ background: INK }}>
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImg}
            alt="Mesa de trabalho de Lord Junnior com Bitcoin, atlas mundial e hardware wallet"
            className="w-full h-full object-cover"
            width={1920}
            height={1280}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,59,58,0.35) 0%, rgba(14,59,58,0.55) 60%, rgba(23,22,18,0.92) 100%)",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: APPLE_EASE }}
            >
              <div
                className="text-[10px] font-bold tracking-[0.5em] uppercase mb-6"
                style={{ color: COPPER_LIGHT }}
              >
                Sobre
              </div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] max-w-5xl"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  color: SAND,
                  letterSpacing: "-0.025em",
                }}
              >
                Lord Junnior.
                <br />
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}>
                  Soberania individual,
                </span>{" "}
                sem cerimônia.
              </h1>
              <p
                className="mt-8 text-xl md:text-2xl max-w-3xl"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 300,
                  color: "rgba(250,246,240,0.8)",
                }}
              >
                Bitcoin, geopolítica e privacidade digital, traduzidos em ferramentas práticas para
                quem cansou de terceirizar a própria vida.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUEM É */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <Kicker>01. Quem é</Kicker>
            <H2>Um brasileiro cansado de ver gente boa quebrada.</H2>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Body large>
              Lord Junnior é o nome de batalha de um pesquisador, investidor e construtor brasileiro
              que passou anos estudando como o dinheiro, o Estado e a tecnologia se encaixam, e como
              esse encaixe decide quem dorme tranquilo e quem dorme com medo.
            </Body>
            <div className="h-6" />
            <Body>
              Não veio de berço de ouro, não herdou imóvel, não tem time de assessores caros. O que
              tem é um histórico denso de leitura, de erros caros pagos com o próprio bolso e de
              conversas com gente que já perdeu tudo em confisco, em hiperinflação e em decisões
              tomadas por governos que nunca pediram licença.
            </Body>
            <div className="h-6" />
            <Body>
              Esse projeto nasceu da constatação simples de que conhecimento de alto padrão sobre
              Bitcoin, geopolítica e privacidade existe, mas vive trancado em inglês, em jargão, em
              livros caros e em cursos vendidos como passe de elite. A proposta aqui é tirar isso da
              prateleira e colocar na mesa da cozinha, para qualquer brasileiro adulto entender e
              aplicar.
            </Body>
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="py-24 md:py-40 px-6 md:px-10" style={{ background: SAND_DEEP }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <img
                src={bitcoinImg}
                alt="Hardware wallet de Bitcoin sob luz editorial"
                className="w-full rounded-sm shadow-2xl"
                loading="lazy"
                width={1600}
                height={1067}
              />
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <Kicker>02. Missão</Kicker>
              <H2>Devolver ao indivíduo o que foi terceirizado para o Estado.</H2>
              <div className="h-8" />
              <Body>
                A missão deste projeto é uma só, e cabe em uma frase: equipar pessoas comuns com as
                ferramentas, a linguagem e a coragem para sair da posição de gado e assumir a
                posição de proprietário da própria vida.
              </Body>
              <Pull>
                Quem não controla o próprio dinheiro, não controla as próprias escolhas. E quem não
                controla as próprias escolhas, é controlado.
              </Pull>
              <Body>
                Isso passa por três frentes que se conversam: dinheiro que ninguém pode imprimir
                nem confiscar (Bitcoin), entendimento do tabuleiro onde a sua vida é jogada
                (geopolítica) e blindagem dos seus rastros digitais (privacidade). Sem uma das
                três, as outras duas ficam capengas.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE BITCOIN */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <Kicker>03. Bitcoin</Kicker>
            <div className="flex items-center gap-4 mb-6">
              <Bitcoin className="w-10 h-10" style={{ color: COPPER }} />
            </div>
            <H2>Por que falo sobre Bitcoin.</H2>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Body large>
              Bitcoin não é investimento, é tecnologia de fuga. É a primeira vez na história que um
              brasileiro pode guardar valor fora do alcance do Banco Central, fora do alcance do
              Tesouro, fora do alcance de qualquer ministro com canetada fácil.
            </Body>
            <div className="h-6" />
            <Body>
              Em 1990, o governo brasileiro confiscou poupança do dia para a noite. Em 2024, o
              Pix passou a relatar movimentações automaticamente. Em 2025, o DREX entrou em testes
              com programabilidade. O padrão se repete há um século: quando o orçamento aperta,
              quem paga é a sua reserva.
            </Body>
            <div className="h-6" />
            <Body>
              Falo de Bitcoin porque ele resolve isso na raiz. Mas falo do Bitcoin de verdade, o
              que mora em hardware wallet sob a sua custódia, não o que mora em exchange centralizada
              esperando o próximo bloqueio judicial. Aqui você não vai encontrar promessa de
              enriquecimento rápido, vai encontrar engenharia de risco para guardar valor por
              décadas.
            </Body>
          </div>
        </div>
      </section>

      {/* POR QUE GEOPOLÍTICA */}
      <section
        className="py-24 md:py-40 px-6 md:px-10 relative"
        style={{ background: TEAL, color: SAND }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6">
              <Kicker light>04. Geopolítica</Kicker>
              <div className="flex items-center gap-4 mb-6">
                <Globe2 className="w-10 h-10" style={{ color: COPPER_LIGHT }} />
              </div>
              <H2 light>Por que falo sobre geopolítica.</H2>
              <div className="h-8" />
              <Body light large>
                Porque o seu Real, o seu trabalho e o seu passaporte são peças de um tabuleiro que
                você não desenhou. Ignorar isso é jogar xadrez de olhos vendados.
              </Body>
              <div className="h-6" />
              <Body light>
                A teoria das bandeiras, os BRICS, o dólar digital americano, a guerra cambial entre
                China e Estados Unidos, o avanço dos CBDCs, a captura regulatória das exchanges, a
                rota Brasil, Paraguai, Geórgia, El Salvador, Portugal, Dubai. Tudo isso decide se
                você vai conseguir manter sua liberdade financeira nos próximos vinte anos ou não.
              </Body>
              <Pull light>
                Você não precisa ser geopolítico de carreira. Você precisa apenas enxergar o
                tabuleiro antes que ele decida por você.
              </Pull>
            </div>
            <div className="md:col-span-6">
              <img
                src={geoImg}
                alt="Globo terrestre antigo iluminado com mapa político da Europa"
                className="w-full rounded-sm shadow-2xl"
                loading="lazy"
                width={1600}
                height={1067}
              />
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE PRIVACIDADE */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-6">
            <img
              src={privacyImg}
              alt="Lente de câmera lacrada com fita preta e Faraday pouch, simbolizando privacidade digital"
              className="w-full rounded-sm shadow-2xl"
              loading="lazy"
              width={1600}
              height={1067}
            />
          </div>
          <div className="md:col-span-6">
            <Kicker>05. Privacidade</Kicker>
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-10 h-10" style={{ color: COPPER }} />
            </div>
            <H2>Por que falo sobre privacidade digital.</H2>
            <div className="h-8" />
            <Body large>
              Privacidade não é esconder. Privacidade é poder escolher quem vê o quê. Quem perde
              esse direito, perde tudo o que vem em seguida, do crédito ao emprego, do plano de
              saúde à reputação.
            </Body>
            <div className="h-6" />
            <Body>
              Cada Pix é catalogado. Cada login com Google é vendido. Cada metadado é guardado por
              décadas em servidores que você nunca viu. Em um mundo de IA que cruza tudo com tudo, o
              indivíduo sem higiene digital fica nu, sem perceber, na frente de pessoas que ele
              nunca vai conhecer.
            </Body>
            <div className="h-6" />
            <Body>
              Aqui você aprende a separar identidade real de identidade pública, a configurar
              navegadores, e-mails, telefones, redes e roteadores como um adulto, e a transformar o
              seu rastro digital de pegada de elefante em pegada de gato.
            </Body>
          </div>
        </div>
      </section>

      {/* OBJETIVO */}
      <section className="py-24 md:py-40 px-6 md:px-10" style={{ background: INK, color: SAND }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <Kicker light>06. Objetivo da plataforma</Kicker>
            <H2 light>Construir a maior biblioteca em português sobre soberania individual.</H2>
            <div className="h-8" />
            <Body light large>
              Não é canal de notícia. Não é blog de opinião. Não é newsletter de hype. É uma
              plataforma editorial que funciona como manual de campo, atualizado capítulo a
              capítulo, com texto denso, dados verificáveis e ferramentas prontas para serem
              usadas hoje mesmo.
            </Body>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Compass,
                title: "Trilhas guiadas",
                desc: "Quatro níveis de leitura, do zero ao operador soberano, com progresso salvo.",
              },
              {
                icon: Target,
                title: "Manuais práticos",
                desc: "Cada artigo termina em ação, não em teoria de novela.",
              },
              {
                icon: Flag,
                title: "Linguagem direta",
                desc: "Sem rodeio acadêmico, sem promessa de enriquecimento, sem tom de seita.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-8 rounded-sm border"
                style={{ borderColor: "rgba(250,246,240,0.12)", background: "rgba(250,246,240,0.03)" }}
              >
                <p.icon className="w-8 h-8 mb-5" style={{ color: COPPER_LIGHT }} />
                <h3
                  className="text-2xl mb-3"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, color: SAND }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "'Inter Tight', sans-serif", color: "rgba(250,246,240,0.75)" }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FERRAMENTAS / EBOOKS / AUDIOBOOKS */}
      <section className="py-24 md:py-40 px-6 md:px-10" style={{ background: SAND_DEEP }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center mb-20">
            <div className="md:col-span-5">
              <Kicker>07. Catálogo</Kicker>
              <H2>Ferramentas gratuitas, e-books e audiobooks.</H2>
            </div>
            <div className="md:col-span-7 md:pt-4">
              <Body large>
                Tudo o que dá para entregar de graça, é entregue de graça. O que demanda produção
                profunda vira e-book ou audiobook, com preço de livro, não de curso.
              </Body>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/ferramentas" className="group block">
              <div
                className="p-8 md:p-10 rounded-sm border h-full transition-all duration-500 group-hover:-translate-y-1"
                style={{
                  borderColor: "rgba(23,22,18,0.12)",
                  background: SAND,
                  boxShadow: "0 10px 40px -20px rgba(23,22,18,0.2)",
                }}
              >
                <Wrench className="w-9 h-9 mb-6" style={{ color: COPPER }} />
                <div
                  className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                  style={{ color: COPPER }}
                >
                  Grátis
                </div>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: INK }}
                >
                  Ferramentas
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter Tight', sans-serif", color: "rgba(23,22,18,0.7)" }}
                >
                  Simuladores, calculadoras de soberania, geradores de entropia, índice de
                  desespertar, mapa de jurisdições. Tudo gratuito, sem cadastro.
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: COPPER }}
                >
                  Acessar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link to="/ebooks" className="group block">
              <div
                className="p-8 md:p-10 rounded-sm border h-full transition-all duration-500 group-hover:-translate-y-1"
                style={{
                  borderColor: "rgba(23,22,18,0.12)",
                  background: SAND,
                  boxShadow: "0 10px 40px -20px rgba(23,22,18,0.2)",
                }}
              >
                <BookOpen className="w-9 h-9 mb-6" style={{ color: COPPER }} />
                <div
                  className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                  style={{ color: COPPER }}
                >
                  Biblioteca
                </div>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: INK }}
                >
                  E-books
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter Tight', sans-serif", color: "rgba(23,22,18,0.7)" }}
                >
                  Manuais densos sobre autocustódia, saída do Brasil, blindagem patrimonial e
                  privacidade. Material para ler com lápis na mão.
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: COPPER }}
                >
                  Ver biblioteca <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link to="/audiobooks" className="group block">
              <div
                className="p-8 md:p-10 rounded-sm border h-full transition-all duration-500 group-hover:-translate-y-1"
                style={{
                  borderColor: "rgba(23,22,18,0.12)",
                  background: SAND,
                  boxShadow: "0 10px 40px -20px rgba(23,22,18,0.2)",
                }}
              >
                <Headphones className="w-9 h-9 mb-6" style={{ color: COPPER }} />
                <div
                  className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                  style={{ color: COPPER }}
                >
                  Audiotec
                </div>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: INK }}
                >
                  Audiobooks
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter Tight', sans-serif", color: "rgba(23,22,18,0.7)" }}
                >
                  Mesmo conteúdo dos e-books, em formato para o trânsito, a caminhada e o
                  treino. Para quem aprende com fone no ouvido.
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: COPPER }}
                >
                  Ouvir <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-16">
            <img
              src={bibliotecaImg}
              alt="Livros, kindle e fone, simbolizando a biblioteca digital de Lord Junnior"
              className="w-full rounded-sm shadow-2xl"
              loading="lazy"
              width={1600}
              height={1067}
            />
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <Kicker>10. Contato</Kicker>
          <H2>Antes de escrever, leia o que já está escrito.</H2>
          <div className="h-8" />
          <div className="max-w-3xl mx-auto">
            <Body>
              A plataforma já responde quase tudo que entra na minha caixa. Antes de mandar
              pergunta, vale dar uma volta pela trilha, pelo glossário e pelas ferramentas. O que
              não estiver lá, manda direto.
            </Body>
          </div>
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contato@lordjunnior.com.br"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all hover:-translate-y-0.5"
              style={{ background: INK, color: SAND }}
            >
              <Mail className="w-4 h-4" />
              contato@lordjunnior.com.br
            </a>
            <a
              href="https://instagram.com/lordjunnior"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm font-semibold text-sm tracking-wider uppercase transition-all hover:-translate-y-0.5 border-2"
              style={{ borderColor: INK, color: INK }}
            >
              <Eye className="w-4 h-4" />
              @lordjunnior
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;