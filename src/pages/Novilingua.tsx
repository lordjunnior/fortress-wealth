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
