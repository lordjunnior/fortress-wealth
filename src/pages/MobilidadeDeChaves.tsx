import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, Lock, Key, Smartphone, Wifi, WifiOff, QrCode, Nfc, Globe, AlertTriangle, CheckCircle, Eye, BookOpen, Play, ChevronDown } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ─── MÉTODOS DE ARMAZENAMENTO ─── */
const METODOS = [
  {
    icon: QrCode,
    titulo: 'SeedQR — Código QR Compacto',
    desc: 'A Krux permite converter sua seed phrase em um código QR compacto (SeedQR ou CompactSeedQR) que pode ser impresso, gravado em metal ou armazenado digitalmente de forma criptografada. O formato CompactSeedQR reduz a densidade do código ao mínimo possível, tornando-o legível mesmo em superfícies pequenas ou com resolução limitada.',
    vantagens: ['Backup visual que dispensa digitação manual', 'Pode ser gravado em placa de metal (resistente a fogo e água)', 'Leitura instantânea pela câmera da Krux', 'Formato padronizado e interoperável'],
    cuidados: ['Sem criptografia nativa — qualquer pessoa com acesso ao QR acessa a seed', 'Para transporte seguro, deve ser combinado com criptografia AES via Krux'],
  },
  {
    icon: Nfc,
    titulo: 'NFC Tags — Armazenamento Invisível',
    desc: 'A Krux agora suporta gravação de dados criptografados em tags NFC comuns (NTAG 215 e NTAG 216). Uma tag NFC custa centavos, é do tamanho de uma moeda e pode ser escondida dentro de objetos, colada em documentos ou costurada em roupas. Quando combinada com criptografia AES e senha forte, torna-se um meio de transporte de chaves praticamente invisível e indetectável.',
    vantagens: ['Tags NTAG 215/216 custam centavos e são facilmente encontradas', 'Sem componente eletrônico ativo — não possui bateria, não emite sinais', 'Pode ser lida apenas por contato próximo (< 4cm)', 'Dados criptografados ficam ilegíveis sem a senha e a Krux'],
    cuidados: ['NTAG 215 possui 504 bytes de armazenamento — suficiente para uma seed criptografada', 'NTAG 216 possui 888 bytes — comporta mais dados ou seeds maiores', 'Tags NFC podem ser danificadas por campos magnéticos muito fortes ou dobras excessivas'],
  },
  {
    icon: Lock,
    titulo: 'Backup Criptografado — Camada de Proteção',
    desc: 'O recurso mais poderoso da Krux para transporte de chaves é a criptografia AES aplicada diretamente sobre a seed antes de exportar para QR ou NFC. A seed é criptografada com uma senha definida pelo usuário, gerando um bloco de dados que só pode ser decifrado com a mesma senha na mesma (ou outra) Krux. Sem a senha, os dados são completamente indecifráveis.',
    vantagens: ['Criptografia AES de nível militar (128/256 bits)', 'Quatro modos disponíveis: AES-ECB, AES-GCM, AES-CTR, AES-CBC', '100.000 iterações de derivação de chave por padrão (PBKDF2)', 'Mesmo que o QR ou NFC seja interceptado, os dados são inúteis sem a senha'],
    cuidados: ['A segurança depende inteiramente da força da senha escolhida', 'Perda da senha = perda permanente do acesso ao backup criptografado', 'AES-ECB é adequado para blocos aleatórios (seeds), mas AES-GCM é recomendado para uso geral'],
  },
];

/* ─── MODOS AES ─── */
const MODOS_AES = [
  {
    modo: 'AES-ECB',
    nome: 'Electronic Codebook',
    seguranca: 'Adequado',
    desc: 'Modo mais simples. Cada bloco de 16 bytes é criptografado independentemente com a mesma chave. Para dados verdadeiramente aleatórios como uma seed phrase (que já possui alta entropia), oferece segurança adequada. Não é recomendado para textos ou dados com padrões repetitivos, pois blocos idênticos geram criptogramas idênticos.',
    quando: 'Criptografia única de uma seed phrase que ficará armazenada de forma privada.',
    cor: 'amber',
  },
  {
    modo: 'AES-GCM',
    nome: 'Galois/Counter Mode',
    seguranca: 'Recomendado',
    desc: 'Modo autenticado que combina criptografia e verificação de integridade em uma única operação. Adiciona um nonce (número usado uma vez) e um tag de autenticação, garantindo que qualquer alteração nos dados seja detectada. É o modo mais robusto e versátil disponível na Krux.',
    quando: 'Uso geral, especialmente quando o backup criptografado será utilizado em múltiplos contextos (Ferramentas → Datum, passphrase, etc.).',
    cor: 'emerald',
  },
  {
    modo: 'AES-CTR',
    nome: 'Counter Mode',
    seguranca: 'Bom',
    desc: 'Transforma o AES em um cifrador de fluxo usando um contador incremental. Cada bloco recebe um nonce único, eliminando o problema de blocos idênticos do ECB. Não possui autenticação nativa — se alguém alterar bits do criptograma, a decriptação produz dados corrompidos sem aviso.',
    quando: 'Quando performance é prioridade e a integridade é verificada por outros meios.',
    cor: 'sky',
  },
  {
    modo: 'AES-CBC',
    nome: 'Cipher Block Chaining',
    seguranca: 'Bom',
    desc: 'Cada bloco de texto claro é combinado (XOR) com o bloco criptografado anterior antes de ser cifrado. Isso significa que blocos idênticos geram criptogramas diferentes — resolvendo a principal limitação do ECB. Requer um vetor de inicialização (IV) aleatório para o primeiro bloco.',
    quando: 'Quando se deseja segurança superior ao ECB com complexidade moderada.',
    cor: 'violet',
  },
];

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  {
    q: 'Como levar Bitcoin para outro país com segurança?',
    a: 'Bitcoin não precisa ser "transportado" fisicamente — ele existe na blockchain. O que você transporta é a chave privada (seed phrase) que dá acesso aos seus bitcoins. Usando uma hardwallet air-gapped como a Krux, você pode criptografar sua seed com AES e armazená-la em um QR Code impresso, uma tag NFC ou até memorizá-la. Nenhuma dessas formas é detectável por scanners, raio-X ou revistas de fronteira.',
  },
  {
    q: 'O que é uma hardwallet air-gapped?',
    a: 'Uma hardwallet air-gapped é um dispositivo de assinatura de transações Bitcoin que nunca se conecta à internet, Bluetooth ou qualquer rede. A Krux é um exemplo: ela usa apenas a câmera (para ler QR codes) e o display como interfaces de entrada e saída. Isso elimina vetores de ataque remotos — ninguém pode hackear um dispositivo que não possui conexão de rede.',
  },
  {
    q: 'Qual a diferença entre NTAG 215 e NTAG 216?',
    a: 'A diferença principal é a capacidade de armazenamento. NTAG 215 oferece 504 bytes de memória utilizável — suficiente para uma seed criptografada padrão de 12 ou 24 palavras. NTAG 216 oferece 888 bytes — útil para seeds maiores, múltiplos backups ou dados adicionais como passphrases criptografadas. Ambas são tags NFC passivas (sem bateria) que custam centavos e podem ser lidas por contato próximo (< 4cm).',
  },
  {
    q: 'AES-ECB é inseguro?',
    a: 'Depende do contexto. AES-ECB é considerado fraco para criptografar dados com padrões repetitivos (como texto comum ou imagens), porque blocos idênticos de entrada geram blocos idênticos de saída. Porém, para dados com alta entropia como uma seed phrase BIP39 (que é essencialmente aleatória), este problema não se aplica. Para uso único de backup de seed privada, AES-ECB oferece segurança adequada. Para uso geral ou múltiplos backups, AES-GCM é recomendado.',
  },
  {
    q: 'O que acontece se eu perder a senha da criptografia?',
    a: 'Se você perder a senha usada para criptografar seu backup, não há recuperação possível. A criptografia AES com 100.000 iterações PBKDF2 torna ataques de força bruta computacionalmente inviáveis para senhas fortes. Por isso, a senha deve ser memorizada com segurança ou armazenada em local separado do backup criptografado. Nunca armazene a senha junto com o QR ou NFC criptografado.',
  },
  {
    q: 'Posso usar qualquer tag NFC com a Krux?',
    a: 'A Krux é compatível com tags NFC do tipo NTAG 215 e NTAG 216 (NFC Forum Type 2). Essas tags são amplamente disponíveis, custam centavos por unidade e podem ser compradas em formato adesivo, cartão ou chaveiro. Não use tags NFC de outros tipos (como MIFARE Classic) pois a compatibilidade não é garantida.',
  },
  {
    q: 'Como guardar a seed phrase de forma segura?',
    a: 'Existem múltiplas camadas de segurança disponíveis: (1) Memorização — a seed pode ser memorizada como sequência de palavras; (2) Metal — gravação em placa de aço inox resistente a fogo e água; (3) SeedQR — conversão em código QR compacto; (4) NFC criptografado — armazenamento em tag NFC com AES; (5) Multisig — distribuição de chaves entre múltiplos dispositivos/locais. A abordagem mais segura combina pelo menos dois métodos com armazenamento geográfico separado.',
  },
];

export default function MobilidadeDeChaves() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Como levar sua chave de Bitcoin para o exterior com segurança",
    "description": "Guia técnico completo sobre transporte de seeds Bitcoin usando Krux, SeedQR, NFC tags e criptografia AES.",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "publisher": { "@type": "Person", "name": "Lord Junnior" },
    "url": "https://lordjunnior.com.br/mobilidade-de-chaves",
    "image": "https://lordjunnior.com.br/heroes/mobilidade-chaves.webp",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Como Levar sua Chave de Bitcoin para o Exterior com Segurança | Lord Junnior</title>
        <meta name="description" content="Guia completo: como transportar sua seed phrase Bitcoin com segurança usando Krux, SeedQR, NFC tags e criptografia AES. Backup air-gapped, NTAG 215/216 e modos de criptografia explicados." />
        <meta name="keywords" content="como levar bitcoin para outro país, como transportar bitcoin, como guardar seed phrase, backup seed bitcoin, krux hardwallet, seedqr, nfc bitcoin, criptografia aes seed, ntag 215, ntag 216, autocustódia bitcoin, air-gapped wallet" />
        <meta property="og:title" content="Como Levar sua Chave de Bitcoin para o Exterior com Segurança" />
        <meta property="og:description" content="Riqueza que atravessa fronteiras em poucos bytes criptografados. Guia técnico com Krux, SeedQR, NFC e AES." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/mobilidade-chaves.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/mobilidade-de-chaves" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />

      {/* CinematicHero */}
      <CinematicHero
        image="/heroes/mobilidade-chaves.webp"
        phase="Bitcoin & Soberania"
        title="Mobilidade de Chaves"
        subtitle="Como transportar sua soberania Bitcoin pelo mundo. Krux, SeedQR, NFC tags e criptografia AES: riqueza que atravessa fronteiras em poucos bytes criptografados."
        icon={Key}
        accentColor="amber"
        backLink="/autocustodia"
        backLabel="Autocustódia"
      />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 01 — POR QUE TRANSPORTAR CHAVES COM SEGURANÇA IMPORTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              POR QUE TRANSPORTAR <span className="text-amber-400">CHAVES IMPORTA</span>
            </h2>
          </motion.div>

          {/* PNL Opening */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-8 md:p-12 mb-16 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
            <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Durante séculos, riqueza foi pesada, visível e fácil de confiscar.
            </p>
            <p className="text-amber-400 text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bitcoin mudou isso. Hoje, milhões podem atravessar fronteiras em poucos bytes criptografados."
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Ouro precisava de cofres. Propriedade precisava de registro estatal. Fronteiras sempre significaram risco de confisco.
              Bitcoin introduziu algo quase paradoxal: riqueza que pode viajar dentro da cabeça de alguém ou escondida em poucos bytes invisíveis.
              Nenhum scanner de aeroporto detecta uma seed phrase memorizada. Nenhum agente de fronteira identifica uma tag NFC criptografada.
              A soberania financeira, pela primeira vez na história, tornou-se genuinamente portátil.
            </p>
          </motion.div>

          {/* Context blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Globe, title: 'Mobilidade Global', desc: 'Sua riqueza não está presa a nenhum banco, país ou jurisdição. A seed phrase é a chave que abre seu cofre em qualquer lugar do mundo.' },
              { icon: Shield, title: 'Resistência a Confisco', desc: 'Governos podem congelar contas bancárias em segundos. Ninguém pode confiscar uma seed phrase que existe apenas na sua memória ou em bytes criptografados.' },
              { icon: Eye, title: 'Privacidade Absoluta', desc: 'Sem declaração de fronteira, sem registros bancários internacionais, sem rastreamento. A criptografia transforma soberania em dados indistinguíveis de ruído aleatório.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/15 w-fit mb-4">
                  <item.icon size={20} className="text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{item.title}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 02 — KRUX: O DISPOSITIVO AIR-GAPPED
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              KRUX — O DISPOSITIVO <span className="text-amber-400">AIR-GAPPED</span>
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl">
              A Krux é uma hardwallet de código aberto que opera completamente offline — sem Wi-Fi, sem Bluetooth, sem USB de dados.
              Toda comunicação acontece via câmera (leitura de QR codes) e display (exibição de QR codes). Isso elimina todos os vetores de ataque remoto.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-16"
          >
            <h3 className="text-lg font-bold text-stone-200 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Por que Air-Gapped importa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <WifiOff size={18} className="text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-300">Zero conexão de rede</h4>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Sem Wi-Fi, Bluetooth, NFC de leitura passiva ou conexão USB de dados. A Krux é um computador isolado que nunca tocou a internet.
                  Hackers remotos precisam de um vetor de rede para atacar — a Krux simplesmente não oferece nenhum.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <QrCode size={18} className="text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-300">Comunicação verificável</h4>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Toda informação que entra e sai do dispositivo passa por QR codes — um formato auditável visualmente.
                  Você pode inspecionar cada byte transferido antes de confirmar. Não há canal oculto de comunicação.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen size={18} className="text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-300">Código aberto</h4>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">
                  O firmware da Krux é completamente open-source. Qualquer pessoa pode auditar o código, compilar sua própria versão
                  e verificar que não existem backdoors ou transmissões ocultas. Segurança por transparência, não por confiança cega.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Nfc size={18} className="text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-300">NFC para gravação</h4>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">
                  O NFC da Krux é utilizado exclusivamente para gravar dados criptografados em tags passivas. Diferente de smartphones,
                  a Krux não lê tags arbitrárias — ela grava dados que já foram criptografados internamente no dispositivo air-gapped.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 03 — MÉTODOS DE ARMAZENAMENTO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MÉTODOS DE <span className="text-amber-400">ARMAZENAMENTO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Três formas de armazenar e transportar suas chaves com a Krux. Cada método possui características distintas de segurança, portabilidade e resiliência.
            </p>
          </motion.div>

          <div className="space-y-6">
            {METODOS.map((metodo, i) => (
              <motion.div key={metodo.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-8 md:p-10"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                      <metodo.icon size={24} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-stone-200 mb-4">{metodo.titulo}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-6">{metodo.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-wider mb-3">Vantagens</p>
                        <ul className="space-y-2">
                          {metodo.vantagens.map((v) => (
                            <li key={v} className="flex items-start gap-2">
                              <CheckCircle size={12} className="text-emerald-400/60 mt-0.5 shrink-0" />
                              <span className="text-stone-400 text-xs leading-relaxed">{v}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400/70 font-bold uppercase tracking-wider mb-3">Cuidados</p>
                        <ul className="space-y-2">
                          {metodo.cuidados.map((c) => (
                            <li key={c} className="flex items-start gap-2">
                              <AlertTriangle size={12} className="text-amber-400/60 mt-0.5 shrink-0" />
                              <span className="text-stone-500 text-xs leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 04 — CRIPTOGRAFIA EXPLICADA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              CRIPTOGRAFIA <span className="text-amber-400">EXPLICADA</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              A Krux oferece quatro modos de criptografia AES. Cada um possui características distintas de segurança e aplicação.
              O número de iterações padrão de 100.000 (PBKDF2) é suficiente para qualquer um dos modos.
              Recomendamos que você pesquise mais sobre cada modo e escolha o mais adequado à sua aplicação.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {MODOS_AES.map((modo, i) => (
              <motion.div key={modo.modo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                  style={{ background: `linear-gradient(to right, ${modo.cor === 'amber' ? '#f59e0b' : modo.cor === 'emerald' ? '#10b981' : modo.cor === 'sky' ? '#0ea5e9' : '#8b5cf6'}, transparent)` }} />

                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-stone-200 font-mono">{modo.modo}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded
                    ${modo.cor === 'emerald' ? 'text-emerald-400 bg-emerald-500/10' : modo.cor === 'amber' ? 'text-amber-400 bg-amber-500/10' : modo.cor === 'sky' ? 'text-sky-400 bg-sky-500/10' : 'text-violet-400 bg-violet-500/10'}`}>
                    {modo.seguranca}
                  </span>
                </div>

                <p className="text-stone-600 text-[10px] font-bold uppercase tracking-wider mb-3">{modo.nome}</p>
                <p className="text-stone-400 text-xs leading-relaxed mb-5">{modo.desc}</p>

                <div className="border-l-2 pl-4"
                  style={{ borderColor: modo.cor === 'amber' ? '#f59e0b40' : modo.cor === 'emerald' ? '#10b98140' : modo.cor === 'sky' ? '#0ea5e940' : '#8b5cf640' }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: modo.cor === 'amber' ? '#f59e0b90' : modo.cor === 'emerald' ? '#10b98190' : modo.cor === 'sky' ? '#0ea5e990' : '#8b5cf690' }}>Quando usar</p>
                  <p className="text-stone-500 text-xs leading-relaxed">{modo.quando}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Configuração */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8 mb-10"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">Configuração na Krux</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-3">
                  Para alterar o modo de criptografia: <span className="font-mono text-amber-400/80">Configurações → Criptografia → Modo de criptografia</span>.
                  O modo padrão é AES-ECB. Se você pretende usar a criptografia para múltiplas aplicações (Ferramentas → Datum, passphrase, etc.), altere para AES-GCM antes de criptografar.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  O número de iterações padrão de 100.000 é suficiente para todas as aplicações. Aumentar esse número torna a derivação mais lenta (mais segura contra força bruta), mas o ganho marginal para senhas fortes é mínimo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 05 — A IMPORTÂNCIA DE UMA SENHA FORTE
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 05</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SEGURANÇA REAL — <span className="text-amber-400">SENHA FORTE</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Em todos os casos — independente do modo AES, do método de armazenamento ou do número de iterações — o fator mais importante é a <strong className="text-stone-200">força da senha</strong>.
              Só uma senha forte de verdade protege seus dados. Todo o resto é complementar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="p-6 rounded-xl border border-red-500/15 bg-red-500/[0.03]"
            >
              <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle size={16} /> Senhas Fracas (NÃO USE)
              </h4>
              <ul className="space-y-2">
                {['123456, bitcoin, senha123', 'Datas de nascimento, nomes de família', 'Palavras do dicionário isoladas', 'Sequências de teclado (qwerty, asdf)', 'Qualquer senha com menos de 12 caracteres'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400/60 text-xs mt-0.5">✕</span>
                    <span className="text-stone-400 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}
              className="p-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]"
            >
              <h4 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle size={16} /> Senhas Fortes (RECOMENDADO)
              </h4>
              <ul className="space-y-2">
                {['Mínimo 16 caracteres, idealmente 20+', 'Mistura de maiúsculas, minúsculas, números e símbolos', 'Frases longas sem sentido óbvio (passphrase)', 'Geradas por geradores de entropia confiáveis', 'Nunca reutilizadas entre serviços'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400/60 mt-0.5 shrink-0" />
                    <span className="text-stone-400 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="border-l-2 border-amber-500/40 pl-6 mb-10"
          >
            <p className="text-amber-400/80 text-sm italic leading-relaxed">
              "A criptografia mais sofisticada do mundo é inútil se a senha for '12345'. AES-256 com 100.000 iterações PBKDF2 protege contra supercomputadores — mas não protege contra senhas fracas. Sua segurança começa e termina na qualidade da sua senha."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 06 — VÍDEO DEMONSTRATIVO + CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 06</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GUIA <span className="text-amber-400">DEMONSTRATIVO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Assista ao guia completo e aprenda a transportar suas chaves com segurança. O vídeo demonstra passo a passo o processo de criptografia, gravação em NFC e leitura de SeedQR na Krux.
            </p>
          </motion.div>

          {/* Video Placeholder / CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-12 md:p-16 text-center mb-16 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30"
              style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.1), transparent 60%)' }} />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform duration-500 cursor-pointer">
                <Play size={32} className="text-amber-400 ml-1" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-stone-200 mb-4">
                Assista ao guia completo
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
                Processo completo de criptografia AES na Krux, gravação em tag NFC NTAG 216, geração de SeedQR criptografado e demonstração de recuperação.
              </p>
              <p className="text-stone-600 text-xs italic">
                Vídeo disponível no canal — link será adicionado em breve.
              </p>
            </div>
          </motion.div>

          {/* Dual CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Link to="/autocustodia"
                className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8 text-center"
              >
                <Key size={24} className="text-amber-400 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-stone-200 mb-2">Aprender Autocustódia</h4>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">Guia completo sobre custódia própria de Bitcoin: cold storage, multisig e backup em metal.</p>
                <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Explorar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}>
              <Link to="/chaves"
                className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8 text-center"
              >
                <Shield size={24} className="text-amber-400 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-stone-200 mb-2">Entender Chaves Bitcoin</h4>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">O que são chaves públicas, privadas, seed phrases e como elas protegem seus bitcoins.</p>
                <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Explorar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-amber-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={item.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <h4 className="text-sm font-bold text-stone-200 mb-3">{item.q}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Conclusão</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bitcoin permite que soberania
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-amber-400 mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              atravesse fronteiras.
            </p>
            <Link to="/autocustodia"
              className="inline-flex items-center gap-3 bg-amber-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
            >
              <Key size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Autocustódia Completa
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem carrega a chave, carrega a liberdade.</p>
      </div>
    </div>
  );
}
