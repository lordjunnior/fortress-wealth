import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';

const TERMS = [
  { term: "Justiça Social", real: "Redistribuição forçada de riqueza produzida por terceiros, sem consentimento, sob ameaça de violência estatal." },
  { term: "Regulação", real: "Barreiras burocráticas que protegem monopólios existentes e impedem a concorrência de novos entrantes." },
  { term: "Investimento Público", real: "Gasto político com dinheiro alheio, sem prestação de contas real ou incentivo de eficiência." },
  { term: "Política Monetária", real: "Manipulação da oferta de dinheiro que dilui o poder de compra de quem poupa e trabalha." },
  { term: "Função Social da Propriedade", real: "Pretexto jurídico para o Estado confiscar propriedade privada quando julgar conveniente." },
  { term: "Progressividade Fiscal", real: "Punição crescente para quem produz mais. Quanto mais você trabalha, maior a fatia que o Estado toma." },
  { term: "Contribuição Social", real: "Imposto com nome bonito. Você não 'contribui', você é obrigado sob ameaça de prisão." },
  { term: "Bem Comum", real: "Conceito abstrato usado para justificar qualquer medida autoritária que beneficie o grupo no poder." },
  { term: "Estímulo Econômico", real: "Impressão de dinheiro ou aumento de gastos que gera inflação futura e dívida para a próxima geração." },
  { term: "Direito Adquirido", real: "Privilégio permanente concedido a grupos conectados ao Estado, pago pelos que não têm acesso ao poder." },
  { term: "Soberania Nacional", real: "Monopólio territorial de violência que impede cidadãos de escolher livremente sob qual jurisdição viver." },
  { term: "Segurança Jurídica", real: "Previsibilidade das regras — que o Estado altera retroativamente quando lhe convém." },
  { term: "Democracia", real: "Sistema onde 51% da população decide o que fazer com a propriedade e a liberdade dos outros 49%." },
  { term: "Estado de Direito", real: "Monopólio legislativo onde o próprio Estado cria, interpreta e aplica as regras — e se isenta delas." },
  { term: "Servidor Público", real: "Funcionário do Estado com estabilidade vitalícia, sem vínculo real com produtividade ou resultado." },
  { term: "Imposto", real: "Extração compulsória de riqueza sob ameaça de multa, penhora ou prisão. Não é voluntário." },
  { term: "Programa Social", real: "Transferência de renda dos que produzem para os que votam. Mecanismo de dependência eleitoral." },
  { term: "Saúde Pública", real: "Serviço monopolizado pelo Estado com filas de meses, falta de insumos e hospitais sucateados." },
  { term: "Educação Pública", real: "Sistema de doutrinação estatal onde o conteúdo é definido por burocratas, não por pais ou alunos." },
  { term: "Segurança Pública", real: "Promessa estatal de proteção que nunca se materializa — enquanto o cidadão é proibido de se defender." },
  { term: "Reforma Tributária", real: "Rearranjo da forma de cobrar impostos, nunca uma redução real. O bolo é redistribuído, mas nunca diminui." },
  { term: "Transparência", real: "Publicação obrigatória de dados que ninguém lê, em portais que ninguém entende, sobre gastos que ninguém aprova." },
  { term: "Responsabilidade Fiscal", real: "Lei que o próprio governo descumpre com créditos extraordinários, pedaladas e mudanças de meta." },
  { term: "Desenvolvimento Sustentável", real: "Slogan vago usado para justificar regulações que encarecem tudo e beneficiam ONGs e consultorias." },
  { term: "Inclusão Social", real: "Criação de dependência estatal que mantém populações vulneráveis como base eleitoral cativa." },
  { term: "Banco Central Independente", real: "Instituição que controla o dinheiro sem responder a ninguém. Independente do povo, submisso ao sistema financeiro." },
  { term: "Taxa de Juros", real: "Preço do dinheiro manipulado artificialmente por burocratas que nunca empreenderam." },
  { term: "Inflação", real: "Roubo silencioso do poder de compra, causado pela expansão monetária e chamado de 'aumento de preços'." },
  { term: "Meta de Inflação", real: "Admissão oficial de que o governo planeja roubar entre 3% e 4,5% do seu dinheiro por ano." },
  { term: "Superávit Primário", real: "O governo arrecadou mais do que gastou — ignorando trilhões em juros da dívida que ele mesmo criou." },
  { term: "Dívida Pública", real: "Promessa de pagamento feita por políticos usando o dinheiro das gerações futuras que não votaram." },
  { term: "Privatização", real: "Devolução ao setor privado do que nunca deveria ter sido estatizado. Tratada como escândalo pela mídia estatal." },
  { term: "Estatização", real: "Quando o governo toma controle de uma empresa funcional e a transforma em cabide de empregos." },
  { term: "Reserva Fracionária", real: "Sistema onde bancos emprestam dinheiro que não possuem, multiplicando risco com proteção estatal." },
  { term: "Seguro Depósito (FGC)", real: "Garantia de que o contribuinte vai pagar a conta quando o banco quebrar por irresponsabilidade." },
  { term: "Moeda Fiduciária", real: "Dinheiro que vale porque o governo manda — até o dia em que não vale mais nada." },
  { term: "Câmbio Administrado", real: "Manipulação estatal do preço do dólar para esconder a desvalorização real da moeda local." },
  { term: "Compliance", real: "Burocracia regulatória que impede cidadãos honestos de usar seu dinheiro livremente." },
  { term: "KYC/AML", real: "Vigilância financeira total sobre cidadãos comuns — enquanto o crime organizado opera livremente." },
  { term: "Proteção ao Consumidor", real: "Regulamentação que encarece produtos, elimina opções baratas e protege grandes empresas da concorrência." },
  { term: "Salário Mínimo", real: "Proibição legal de trabalhar abaixo de um valor arbitrário, que exclui os mais vulneráveis do mercado." },
  { term: "CLT", real: "Conjunto de leis trabalhistas que reduz o salário real do trabalhador em até 70% em encargos ocultos." },
  { term: "Previdência Social", real: "Esquema Ponzi estatal onde você paga a aposentadoria de hoje e torce para alguém pagar a sua amanhã." },
  { term: "FGTS", real: "Poupança forçada com rendimento abaixo da inflação. O governo te obriga a perder dinheiro lentamente." },
  { term: "Concurso Público", real: "Processo seletivo para cargos vitalícios sem avaliação de desempenho, financiado por quem produz." },
  { term: "Desigualdade", real: "Diferença natural de resultado usada como pretexto para confisco e controle social." },
  { term: "Carga Tributária", real: "Percentual da riqueza nacional tomado à força pelo Estado. No Brasil, ultrapassa 33% do PIB." },
  { term: "Nota Fiscal", real: "Recibo de imposto embutido. O cidadão paga sem perceber e o Estado arrecada sem resistência." },
  { term: "Guerra às Drogas", real: "Política proibicionista que financia o tráfico, superlota presídios e nunca reduziu o consumo." },
  { term: "Ordem Pública", real: "Pretexto para restringir liberdades individuais em nome da 'convivência harmônica' definida pelo Estado." },
  { term: "Desinformação", real: "Qualquer informação que contradiga a narrativa oficial, independente de ser verdadeira." },
  { term: "Fact-Checking", real: "Verificação seletiva de fatos que protege narrativas oficiais e censura opiniões dissidentes." },
  { term: "Fake News", real: "Termo genérico usado para deslegitimar qualquer informação inconveniente para o poder estabelecido." },
  { term: "Regulação de Plataformas", real: "Censura estatal da internet disfarçada de proteção ao usuário." },
  { term: "Concessão Pública", real: "O Estado te aluga o direito de usar algo que deveria ser livre — e cobra por isso." },
  { term: "Licenciamento Ambiental", real: "Burocracia que paralisa obras por anos, encarece projetos e alimenta uma indústria de consultorias." },
  { term: "Zona Franca", real: "Área onde o Estado rouba menos — provando que a solução é roubar menos em todo lugar." },
  { term: "Subsídio", real: "Dinheiro dos impostos direcionado para empresas escolhidas por políticos. Capitalismo de compadres." },
  { term: "BNDES", real: "Banco estatal que empresta dinheiro barato para grandes empresários com conexões políticas." },
  { term: "Fundo Eleitoral", real: "Bilhões de reais dos impostos usados para financiar campanhas de políticos que você não escolheu." },
  { term: "Imunidade Parlamentar", real: "Privilégio que protege políticos de serem julgados como qualquer cidadão comum." },
  { term: "Foro Privilegiado", real: "Tribunal especial para políticos, onde processos demoram décadas e prescrevem convenientemente." },
  { term: "Auxílio-Moradia", real: "Benefício milionário para juízes e parlamentares que já possuem imóveis próprios." },
  { term: "Teto de Gastos", real: "Limite de gastos públicos que é furado sistematicamente com 'exceções' e 'créditos extraordinários'." },
  { term: "Pacto Federativo", real: "Acordo entre esferas de governo sobre como dividir o dinheiro tomado dos cidadãos." },
  { term: "Política de Cotas", real: "Discriminação institucionalizada que trata indivíduos como membros de grupos, não como pessoas." },
  { term: "Renda Básica Universal", real: "Dependência estatal massificada. O governo te dá migalhas do que antes tomou em impostos." },
  { term: "Lockdown", real: "Prisão domiciliar coletiva imposta sem julgamento, destruindo negócios e saúde mental." },
  { term: "Estado de Emergência", real: "Suspensão legal de direitos individuais com prazo indefinido e fiscalização nula." },
  { term: "Vacinação Obrigatória", real: "Violação da autonomia corporal individual em nome de uma 'saúde coletiva' definida pelo Estado." },
  { term: "PIB", real: "Indicador que soma gastos do governo como 'produção', inflando artificialmente a economia no papel." },
  { term: "Pleno Emprego", real: "Meta utópica que ignora que o Estado não cria riqueza — apenas redistribui e destrói." },
  { term: "Déficit Público", real: "Quando o governo gasta mais do que rouba — e cobre a diferença com dívida ou impressão de dinheiro." },
  { term: "Acordo de Paris", real: "Tratado global onde países ricos ditam regras ambientais que travam o desenvolvimento dos pobres." },
  { term: "ESG", real: "Critérios subjetivos impostos por fundos bilionários para controlar empresas e narrativas sociais." },
  { term: "Agenda 2030", real: "Plano centralizado da ONU para definir como 8 bilhões de pessoas devem viver, sem serem consultadas." },
  { term: "Tribunal de Contas", real: "Órgão que fiscaliza o governo e é composto por indicados do próprio governo." },
  { term: "Orçamento Secreto", real: "Destinação bilionária de recursos públicos sem transparência, negociada em troca de apoio político." },
  { term: "Emenda Parlamentar", real: "Dinheiro dos impostos direcionado pelo político para sua base eleitoral em troca de votos futuros." },
  { term: "Sigilo de 100 Anos", real: "Classificação que impede o povo de saber o que o governo fez com o dinheiro do povo." },
];

const Novilingua: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = TERMS.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.real.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <BookOpen className="w-4 h-4" />
          Dicionário de Novilíngua
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Tradutor de <span className="text-gold">Mentiras</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A mídia e o Estado operam através de eufemismos. Aqui, cada termo é traduzido para a realidade nua e crua.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar termo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-gold/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  "{item.term}"
                </h3>
                <p className="text-sm text-destructive/80 font-mono uppercase tracking-wider mb-2">Tradução real:</p>
                <p className="text-muted-foreground leading-relaxed">{item.real}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          Nenhum termo encontrado. Tente outra busca.
        </div>
      )}
    </div>
  );
};

export default Novilingua;
