import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, AlertTriangle, Vault, Lock, Users, Scale, TrendingDown, BookOpen } from "lucide-react";
import presidenteImg from "@/assets/presidente-confisco-1990.jpg";

const chapters = [
  {
    phase: "CAPÍTULO 1",
    title: "O Cenário: Brasil, 1989",
    icon: Calendar,
    content: [
      "O Brasil vivia uma hiperinflação que ultrapassava 80% ao mês. Os preços mudavam várias vezes por dia. Supermercados remarcavam produtos enquanto os clientes ainda estavam nas filas. A moeda perdia valor tão rápido que as pessoas corriam para gastar o salário no mesmo dia em que recebiam.",
      "A população estava desesperada. Qualquer político que prometesse acabar com a inflação teria o voto de milhões. Foi exatamente isso que aconteceu.",
      "Fernando Collor de Mello, um político jovem e carismático, venceu as eleições com a promessa de combater a inflação e modernizar o país. Tomou posse em 15 de março de 1990. No dia seguinte, o Brasil nunca mais seria o mesmo.",
    ],
  },
  {
    phase: "CAPÍTULO 2",
    title: "A Noite Antes do Confisco",
    icon: Vault,
    content: [
      "Na noite de 15 de março de 1990, enquanto milhões de brasileiros dormiam, a equipe econômica de Collor, liderada pela ministra Zélia Cardoso de Mello, finalizava os detalhes do Plano Collor.",
      "Nenhum cidadão foi avisado. Nenhum jornal antecipou. Nenhum congressista votou. O decreto foi assinado usando o mecanismo de Medida Provisória, que tem força de lei imediata, sem necessidade de aprovação legislativa prévia.",
      "Enquanto você dormia, o presidente da república assinava um papel que confiscava o seu dinheiro.",
    ],
  },
  {
    phase: "CAPÍTULO 3",
    title: "16 de Março, 1990: O Dia em que o Brasil Acordou Sem Nada",
    icon: Lock,
    content: [
      "Na manhã de 16 de março, os brasileiros descobriram que não tinham mais acesso ao próprio dinheiro. Contas correntes, poupanças, aplicações financeiras: tudo acima de NCz$ 50.000 (equivalente a cerca de US$ 1.200 na época) foi bloqueado por 18 meses.",
      "Não importava se o dinheiro era para pagar o aluguel, comprar remédios, pagar funcionários ou alimentar a família. O governo decidiu que aquele dinheiro não era mais seu.",
      "Filas enormes se formaram nos bancos. Pessoas choravam. Idosos que tinham guardado uma vida inteira de economia viram tudo desaparecer de uma hora para outra. Empresários não conseguiam pagar salários. Pequenos negócios fecharam em semanas.",
      "Estima-se que o governo confiscou o equivalente a US$ 80 bilhões da população, aproximadamente 80% de toda a liquidez do sistema financeiro brasileiro.",
    ],
  },
  {
    phase: "CAPÍTULO 4",
    title: "As Consequências Humanas",
    icon: Users,
    content: [
      "O confisco não foi apenas um evento econômico. Foi uma tragédia humana.",
      "Pessoas cometeram suicídio ao descobrir que perderam tudo. Idosos morreram sem conseguir pagar tratamentos médicos. Casamentos se desfizeram pela pressão financeira. Crianças foram tiradas de escolas. Famílias inteiras passaram fome.",
      "O empresário Sérgio Saraiva, dono de uma rede de supermercados em São Paulo, se matou dias após o confisco. Ele não conseguia pagar seus 500 funcionários. Sua história se repetiu milhares de vezes pelo país.",
      "Para quem viveu aquele período, a palavra 'confisco' não é um conceito acadêmico. É uma cicatriz que nunca cicatrizou.",
    ],
  },
  {
    phase: "CAPÍTULO 5",
    title: "O Dinheiro Nunca Voltou (Como Prometido)",
    icon: TrendingDown,
    content: [
      "O governo prometeu devolver o dinheiro em 18 meses, corrigido monetariamente. Na prática, a devolução foi feita em parcelas, ao longo de anos, com correção abaixo da inflação real.",
      "Quem tinha NCz$ 100.000 bloqueados recebeu de volta o equivalente a uma fração do poder de compra original. O confisco foi, na prática, uma transferência forçada de riqueza da população para o governo.",
      "A inflação, que o plano prometia eliminar, voltou com força meses depois. O Plano Collor fracassou em todos os seus objetivos declarados, mas cumpriu perfeitamente o objetivo real: confiscar a riqueza da população.",
    ],
  },
  {
    phase: "CAPÍTULO 6",
    title: "O Mecanismo Legal Ainda Existe",
    icon: Scale,
    content: [
      "O artigo 62 da Constituição Federal, que permitiu o confisco via Medida Provisória, nunca foi revogado. Ele continua ativo, exatamente como estava em 1990.",
      "Isso significa que, tecnicamente, o mesmo mecanismo jurídico que permitiu o confisco de 80% da liquidez nacional pode ser usado novamente. A qualquer momento. Por qualquer presidente.",
      "O PL 3.951/2019, que cria limites para transações em dinheiro vivo, é apenas o próximo capítulo dessa mesma história. Primeiro eliminam o dinheiro físico. Depois controlam o digital. O padrão é sempre o mesmo: concentração de poder sobre o seu patrimônio.",
    ],
  },
  {
    phase: "CAPÍTULO 7",
    title: "A Lição que Ninguém Ensina",
    icon: BookOpen,
    content: [
      "O confisco de 1990 prova três verdades que o sistema educacional brasileiro nunca vai ensinar:",
      "Primeira: o dinheiro no banco não é seu. É uma promessa de devolução que pode ser quebrada a qualquer momento por quem controla o sistema.",
      "Segunda: nenhum governo na história jamais resistiu à tentação de confiscar quando precisa de dinheiro. Se o mecanismo legal existe, ele será usado.",
      "Terceira: a única proteção real contra o confisco é possuir ativos que nenhum governo pode bloquear, congelar ou confiscar. Em 1990, essa tecnologia não existia. Hoje, ela se chama Bitcoin.",
    ],
  },
];

const Confisco1990 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Confisco de 1990: A História Real que o Brasil Quer Esquecer</title>
        <meta name="description" content="Em 16 de março de 1990, o governo brasileiro confiscou 80% do dinheiro da população enquanto dormia. Esta é a história completa do maior roubo institucional da história do Brasil." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={presidenteImg}
            alt="Presidente com faixa presidencial, 1990"
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-destructive mb-6">
              16 DE MARÇO DE 1990
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] mb-6">
              ELE ASSINOU.
              <br />
              <span className="text-destructive">VOCÊ PERDEU TUDO.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              A história real do maior confisco da história do Brasil.
              80% do dinheiro da população, bloqueado por um decreto assinado enquanto você dormia.
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 tracking-widest">
              O MECANISMO LEGAL AINDA ESTÁ ATIVO
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </motion.div>
      </section>

      {/* Chapters */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        {chapters.map((chapter, i) => {
          const Icon = chapter.icon;
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Chapter header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {chapter.phase}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    {chapter.title}
                  </h2>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-border/50" />

              {/* Content */}
              <div className="space-y-5">
                {chapter.content.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          );
        })}

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-destructive/30 rounded-xl bg-destructive/5 p-8 md:p-12 text-center space-y-6"
        >
          <AlertTriangle className="w-10 h-10 text-destructive mx-auto" />
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Quanto do seu patrimônio está a uma assinatura de distância de desaparecer?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Em 1990 não existia alternativa. Hoje existe.
            O Bitcoin é a única tecnologia que garante que nenhum presidente, nenhum decreto e nenhuma medida provisória pode tocar no seu dinheiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/autocustodia"
              className="inline-flex items-center justify-center gap-2 bg-gold text-background font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-gold/90 transition-colors"
            >
              Proteger Meu Patrimônio
            </Link>
            <Link
              to="/historia-do-dinheiro"
              className="inline-flex items-center justify-center gap-2 border border-border bg-background font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-card transition-colors"
            >
              Entender a História
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="pt-16 border-t border-border/20 text-center space-y-6">
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Quem não conhece a história está condenado a repeti-la.
          </p>
          <p className="text-foreground/40 text-[9px] font-mono tracking-[0.5em] uppercase">
            Lord Junnior © 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Confisco1990;
