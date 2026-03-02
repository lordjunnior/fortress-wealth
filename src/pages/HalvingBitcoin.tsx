import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, Shield, Coins, Target, Eye } from 'lucide-react';
import NoiseBackground from '@/components/NoiseBackground';
import halvingHero from '@/assets/halving-hero.png';
import halvingImpacto from '@/assets/halving-impacto.png';

const HalvingBitcoin = () => {
  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Halving do Bitcoin</span>
        </nav>

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          VOLTAR AO INÍCIO
        </Link>

        {/* Page title */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
          Halving do Bitcoin: saiba quando será o próximo
        </h1>

        {/* Hero image */}
        <div className="w-full rounded-sm overflow-hidden border border-border mb-10">
          <img src={halvingHero} alt="Halving do Bitcoin" className="w-full h-auto object-cover" />
        </div>

        {/* Table of contents */}
        <div className="card-wealth mb-10">
          <h2 className="text-sm font-black uppercase tracking-[0.15em] font-mono mb-4 text-primary">Conteúdo</h2>
          <nav className="space-y-2">
            {[
              { id: 'o-que-e', label: 'O que é halving do Bitcoin?' },
              { id: 'proximo-halving', label: 'Quando vai acontecer o próximo halving do Bitcoin?' },
              { id: 'impacto-valor', label: 'Como o halving do Bitcoin pode afetar o valor da moeda?' },
              { id: 'todos-minerados', label: 'O que vai acontecer quando todos os Bitcoins forem minerados?' },
              { id: 'como-investir', label: 'Como investir em Bitcoin?' },
              { id: 'conclusao', label: 'Conclusão: atente-se às oportunidades 👀' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm font-mono text-muted-foreground hover:text-primary transition-colors pl-3 border-l-2 border-border hover:border-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Intro */}
        <div className="prose-custom space-y-6 mb-12">
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            O halving do Bitcoin é um evento que desperta grande atenção na comunidade de criptomoedas a cada quatro anos, gerando especulações e debates sobre seu impacto no mercado. O último halving ocorreu em abril de 2024, reduzindo a recompensa dos mineradores pela metade, de 6,25 para 3,125 bitcoins por bloco.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Esse fenômeno automático e previsível pode influenciar significativamente o valor da criptomoeda mais conhecida e negociada do mundo.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Neste artigo, explicaremos o funcionamento do halving e analisaremos suas possíveis consequências para o preço do Bitcoin, fornecendo informações úteis para entusiastas e investidores que desejam compreender melhor o tema.
          </p>
        </div>

        {/* ═══ SEÇÃO 1: O que é halving ═══ */}
        <section id="o-que-e" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Coins className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">O que é halving do Bitcoin?</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              O halving é um evento programado que acontece a cada 210 mil blocos minerados, o que corresponde, aproximadamente, a um intervalo de quatro anos. A cada halving, a recompensa concedida aos mineradores pela validação e adição de novos blocos à blockchain do Bitcoin é reduzida pela metade, impactando diretamente a taxa de emissão de novos bitcoins.
            </p>
            <p>
              Quando o Bitcoin foi lançado, em 2009, a recompensa inicial era de 50 bitcoins por bloco. Até hoje, o processo de halvings foi o seguinte:
            </p>

            {/* Timeline dos halvings */}
            <div className="space-y-3 pl-4 border-l-2 border-primary/30">
              <div className="relative">
                <div className="absolute -left-[calc(1rem+5px)] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <p><strong className="text-foreground">2012</strong> — A recompensa caiu para <strong className="text-foreground">25 bitcoins</strong> por bloco</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[calc(1rem+5px)] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <p><strong className="text-foreground">2016</strong> — Foi reduzida para <strong className="text-foreground">12,5 bitcoins</strong></p>
              </div>
              <div className="relative">
                <div className="absolute -left-[calc(1rem+5px)] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <p><strong className="text-foreground">2020</strong> — O terceiro halving reduziu para <strong className="text-foreground">6,25 bitcoins</strong></p>
              </div>
              <div className="relative">
                <div className="absolute -left-[calc(1rem+5px)] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <p><strong className="text-foreground">2024</strong> — A redução atual levou a recompensa para <strong className="text-foreground">3,125 bitcoins</strong> por bloco</p>
              </div>
            </div>

            <p>
              O objetivo do halving é controlar a oferta de novos Bitcoins, limitando a quantidade total que será colocada em circulação. Esse mecanismo de emissão previsível é uma característica fundamental do protocolo do Bitcoin que foi desenvolvido por Satoshi Nakamoto.
            </p>
            <p>
              Na prática, ele é projetado para fornecer uma certa escassez da moeda ao longo do tempo. A ideia por trás disso é influenciar a oferta e a demanda, o que pode afetar potencialmente o valor do Bitcoin no mercado.
            </p>
          </div>
        </section>

        {/* ═══ SEÇÃO 2: Próximo halving ═══ */}
        <section id="proximo-halving" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Clock className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Quando será o próximo halving do Bitcoin?</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              Quando vai acontecer o próximo halving do Bitcoin? O próximo halving do Bitcoin deve acontecer em <strong className="text-primary">abril de 2028</strong>. Com o novo corte, a recompensa para os mineradores será reduzida de 3,125 bitcoins para <strong className="text-foreground">1,5625</strong> para cada bloco minerado.
            </p>
            <p>
              Sendo assim, precisamos destacar que para aqueles que investem ou pensam em investir no Bitcoin, é muito importante ficar atento ao halving e as variações que ele pode gerar na cotação da moeda digital.
            </p>
            <p>
              Por falar em cotação, no próximo tópico vamos explicar como o corte na recompensa paga aos mineradores, pode influenciar na oferta e demanda pela moeda, e por consequência, no seu valor de mercado.
            </p>
          </div>
        </section>

        {/* ═══ SEÇÃO 3: Impacto no valor ═══ */}
        <section id="impacto-valor" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Como o halving do Bitcoin pode afetar o valor da moeda?</h2>
          </div>

          {/* Imagem interna */}
          <div className="w-full rounded-sm overflow-hidden border border-border mb-8">
            <img src={halvingImpacto} alt="Impacto do halving no valor do Bitcoin" className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              O halving do Bitcoin pode afetar o valor da moeda de diversas maneiras, embora seja importante notar que o mercado é complexo e influenciado por uma variedade de fatores. Na sequência, nós vamos explicar o que pode acontecer e explicar as expectativas do mercado em torno desse evento. Confira!
            </p>

            {/* Cards de impacto */}
            <div className="grid grid-cols-1 gap-4">
              <div className="card-wealth border-l-4 border-l-green-500">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Aumento da escassez</h3>
                <p className="text-sm text-muted-foreground">
                  O halving reduz pela metade a recompensa para os mineradores, limitando a quantidade de novos Bitcoins que entram em circulação, o que, por sua vez, cria uma escassez e pode contribuir para aumentar o valor da moeda digital.
                </p>
              </div>

              <div className="card-wealth border-l-4 border-l-blue-500">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Aumento da demanda</h3>
                <p className="text-sm text-muted-foreground">
                  O halving do Bitcoin pode atrair novos investidores interessados em aproveitar o evento para obter ganhos, aumentando a demanda, enquanto a oferta da criptomoeda diminui, o que por sua vez, tende a elevar a cotação do BTC.
                </p>
              </div>

              <div className="card-wealth border-l-4 border-l-primary">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Impacto psicológico</h3>
                <p className="text-sm text-muted-foreground">
                  O halving pode ter um impacto psicológico no mercado, levando a sentimentos de otimismo entre os investidores, especialmente aqueles que olham para o evento como um sinal de que o Bitcoin está se tornando cada vez mais valioso.
                </p>
              </div>
            </div>

            <p>
              Em função dos elementos que destacamos acima, historicamente, sempre que houve um halving, o preço do Bitcoin decolou logo em seguida. No entanto, isso não deve ser visto como uma garantia.
            </p>
            <p>
              É importante destacar que o mercado é altamente volátil e imprevisível. O valor do Bitcoin pode ser influenciado por uma série de fatores externos, como regulamentações e eventos econômicos globais.
            </p>
            <p>
              Na prática, o halving do Bitcoin é apenas um dos muitos elementos que podem impactar o valor da criptomoeda, com isso, os investidores devem considerar todos esses fatores ao tomar decisões.
            </p>
          </div>
        </section>

        {/* ═══ SEÇÃO 4: Todos minerados ═══ */}
        <section id="todos-minerados" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Target className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">O que vai acontecer quando todos os Bitcoins forem minerados?</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              O que vai acontecer quando a taxa de remuneração dos mineradores ficar muito baixa ou todos os Bitcoins forem minerados?
            </p>
            <p>
              Quando a taxa de remuneração dos mineradores ficar muito baixa devido ao halving repetido do Bitcoin e, eventualmente, quando todas as 21 milhões de Bitcoins forem minerados, várias mudanças podem ocorrer.
            </p>
            <p>
              Na sequência, vamos apresentar algumas hipóteses sobre esse evento futuro que preocupa mineradores e investidores.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="card-wealth border-l-4 border-l-red-500">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Redução do número de mineradores</h3>
                <p className="text-sm text-muted-foreground">
                  Com o halving periódico, a recompensa dos mineradores diminui gradualmente, o que afeta a rentabilidade da mineração e pode levar alguns mineradores a saírem da rede.
                </p>
              </div>

              <div className="card-wealth border-l-4 border-l-yellow-500">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Dependência das taxas de transação</h3>
                <p className="text-sm text-muted-foreground">
                  À medida que a recompensa por bloco diminui, a importância das taxas de transação vai aumentar. Os mineradores dependerão mais das taxas pagas pelos usuários para processar as transações e o seu valor pode aumentar.
                </p>
              </div>

              <div className="card-wealth border-l-4 border-l-green-500">
                <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-2">Valorização da moeda</h3>
                <p className="text-sm text-muted-foreground">
                  Se a criptomoeda for amplamente adotada e aceita como uma reserva de valor, a escassez programada pode contribuir para a valorização do Bitcoin, com base na oferta e demanda.
                </p>
              </div>
            </div>

            <p>
              Além dos itens acima, é importante destacar que a rede Bitcoin continuará exigindo poder computacional, mesmo após a mineração de todos os Bitcoins, devido à necessidade de validar transações de compra e venda, bem como, de manter a segurança da rede.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary bg-primary/5 p-5 rounded-sm">
              <p className="text-sm italic text-foreground leading-relaxed mb-3">
                "O impacto do halving na oferta e no preço é menor do que no passado, pois o mercado já é muito maior e a diminuição diária de bitcoins novo é pequena em relação ao total em circulação. Porém, no atual cenário de déficits fiscais e impressão de moeda global, essa redução de oferta reforça a narrativa de escassez do Bitcoin, o que pode aumentar a demanda, inclusive para ETFs."
              </p>
              <cite className="text-xs text-muted-foreground font-mono not-italic">
                — André Portilho, head de digital assets do BTG Pactual
              </cite>
            </blockquote>
          </div>
        </section>

        {/* ═══ SEÇÃO 5: Como investir ═══ */}
        <section id="como-investir" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Como investir em Bitcoin?</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>Se você deseja começar a investir nessa criptomoeda, siga as orientações abaixo:</p>

            <div className="space-y-4">
              <div className="card-wealth">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-black font-mono text-lg">01</span>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-1">Escolha de plataforma de negociação</h3>
                    <p className="text-sm text-muted-foreground">Selecione uma plataforma de negociação confiável e segura para comprar e vender Bitcoins.</p>
                  </div>
                </div>
              </div>

              <div className="card-wealth">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-black font-mono text-lg">02</span>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-1">Escolha do tipo de carteira</h3>
                    <p className="text-sm text-muted-foreground">Escolha um modelo de carteira para armazenar seus Bitcoins. Existem carteiras online (hot wallets) e offline (cold wallets), cada uma com suas próprias vantagens em termos de segurança.</p>
                  </div>
                </div>
              </div>

              <div className="card-wealth">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-black font-mono text-lg">03</span>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider font-mono text-foreground mb-1">Compra do Bitcoin</h3>
                    <p className="text-sm text-muted-foreground">
                      Após criar uma conta na plataforma de negociação e configurar sua carteira, você pode comprar Bitcoins usando dinheiro fiat (moeda tradicional) ou outras criptomoedas, dependendo das opções oferecidas pela plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>Ao investir em Bitcoins ou em qualquer outro tipo de criptomoeda, tome os seguintes cuidados:</p>

            <div className="card-wealth bg-destructive/5 border-destructive/20">
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-0.5">▸</span>
                  Considere a alocação de seus investimentos de forma equilibrada e evite colocar todo o seu capital em criptomoedas.
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-0.5">▸</span>
                  Esteja ciente da volatilidade do mercado e preparado para flutuações de preço.
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-0.5">▸</span>
                  Reforce a segurança de suas contas usando autenticação de dois fatores (2FA).
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive mt-0.5">▸</span>
                  Mantenha suas chaves privadas (se você usa uma carteira não custodial) em um local seguro e não compartilhe informações sensíveis.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 6: Conclusão ═══ */}
        <section id="conclusao" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Eye className="text-primary w-4 h-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Conclusão: atente-se às oportunidades 👀</h2>
          </div>

          <div className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              Com halving ou sem halving, o importante é estar atento as oportunidade que as criptomoedas oferecem, para isso, uma das ferramentas mais úteis é o Rankings de Criptomoedas, por lá, é possível ver quais criptos estão com maior capitalização de mercado, aquelas com as maiores altas, além das mais negociadas recentemente.
            </p>
            <p>
              Nossos rankings permitem não só acompanhar o desempenho geral do mercado de cripto, mas identificar padrões e descobrir ativos em potencial. Para quem quer tomar decisões mais informadas e não apenas seguir o hype, os rankings vão fazer toda a diferença.
            </p>
          </div>
        </section>

        {/* Back to home */}
        <div className="pt-8 border-t border-border">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HalvingBitcoin;
