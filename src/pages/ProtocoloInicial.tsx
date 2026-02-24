import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, XCircle, CheckCircle, AlertTriangle, Clock, Eye, Ban } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* Alert System Particles - simulando estado de alerta */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <div className="alert-layer"></div>
        <div className="alert-layer alert-layer-2"></div>
        <div className="alert-layer alert-layer-3"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="alert-pulse"></div>
      </div>
      <style>{`
        @keyframes driftAlert {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-500px) translateX(60px); }
          100% { transform: translateY(-1000px) translateX(0px); }
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.04; transform: scale(1.2); }
        }
        .alert-layer {
          position: absolute; width: 100%; height: 200%;
          background-image:
            radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent),
            radial-gradient(1px 1px at 35% 45%, rgba(255,255,255,0.2) 100%, transparent),
            radial-gradient(1.5px 1.5px at 55% 70%, rgba(220,38,38,0.25) 100%, transparent),
            radial-gradient(1px 1px at 75% 25%, rgba(255,255,255,0.15) 100%, transparent),
            radial-gradient(2px 2px at 92% 60%, rgba(220,38,38,0.2) 100%, transparent);
          background-size: 200px 200px;
          animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 {
          background-size: 280px 280px;
          animation: driftAlert 70s linear infinite reverse;
          opacity: 0.6;
        }
        .alert-layer-3 {
          background-size: 360px 360px;
          animation: driftAlert 100s linear infinite;
          opacity: 0.3;
        }
        .alert-pulse {
          position: absolute;
          top: 30%; left: 50%;
          width: 400px; height: 400px;
          margin: -200px 0 0 -200px;
          border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.1);
          animation: alertPulse 5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Para Leigos Absolutos</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 uppercase">
            Entenda o Bitcoin
          </h1>
          <p className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase protocolo-shimmer italic pb-2">
            ainda hoje
          </p>
          <style>{`
            .protocolo-shimmer {
              background: linear-gradient(90deg, #dc2626 0%, #ff6b6b 40%, #ffffff 50%, #ff6b6b 60%, #dc2626 100%);
              background-size: 250% 100%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: protocShimmer 3s linear infinite;
            }
            @keyframes protocShimmer {
              0% { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
          `}</style>
          <p className="text-2xl md:text-3xl font-black text-slate-300 leading-tight max-w-2xl tracking-tight">
            Você não precisa entender de economia, programação ou gráficos.
          </p>
        </header>

        <section className="space-y-10 mb-32">
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
            Escrevi este material usando linguagem simples e analogias do dia a dia. Se você sabe enviar um e-mail ou usar o banco, você vai entender o Bitcoin ao terminar esta leitura.
          </p>
          <div className="border-l-8 border-red-600 pl-8 py-4">
            <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              É o fim das dúvidas e o início da sua liberdade.
            </p>
          </div>
          <div className="pt-10">
            <p className="italic text-slate-500 text-xl max-w-2xl">
              "Este material não é um convite à especulação. É uma introdução à soberania individual. Avance apenas se estiver disposto a assumir a responsabilidade total sobre suas escolhas."
            </p>
            <p className="text-red-600 font-black uppercase tracking-widest text-xs mt-6">— Lord Junnior</p>
          </div>
        </section>

        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">O que você vai entender</h3>
          <div className="space-y-6">
            {[
              "A história do dinheiro (explicada como uma história, não uma aula).",
              "Por que o Bitcoin vale algo e por que não pode ser copiado.",
              "Como funciona sua \"senha mestre\" e a segurança da rede."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <span className="text-red-600 font-black text-xl">0{idx+1}</span>
                <p className="text-xl font-bold text-white tracking-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAMADA 1: MITOS QUE VÃO CAIR */}
        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">Mitos que vão cair</h3>
          <div className="space-y-4">
            {[
              { mito: "Bitcoin é coisa de hacker e criminoso.", verdade: "O real é usado 100x mais em lavagem. Bitcoin é rastreável, público e auditável por qualquer pessoa." },
              { mito: "Já é tarde demais para comprar.", verdade: "Menos de 2% da população mundial tem Bitcoin. Você está mais cedo do que imagina." },
              { mito: "O governo pode proibir o Bitcoin.", verdade: "Nenhum governo conseguiu desligar a rede em 15 anos. Ela roda em milhares de computadores no mundo inteiro." },
              { mito: "Preciso comprar 1 Bitcoin inteiro.", verdade: "Você pode comprar frações. Com R$50 você já começa. 1 Bitcoin = 100.000.000 de satoshis." },
              { mito: "Bitcoin não tem lastro.", verdade: "O Real também não. A diferença é que Bitcoin tem oferta fixa de 21 milhões — ninguém pode imprimir mais." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0B0F19] border border-white/5 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-3">
                  <XCircle className="text-red-600 shrink-0 mt-1" size={20} />
                  <p className="text-white font-black uppercase tracking-tight text-lg leading-tight">{item.mito}</p>
                </div>
                <div className="flex items-start gap-4 ml-0 md:ml-9">
                  <CheckCircle className="text-emerald-500 shrink-0 mt-1 hidden md:block" size={16} />
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.verdade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAMADA 2: O QUE ACONTECE SE VOCÊ NÃO ENTENDER */}
        <div className="mb-32">
          <div className="bg-gradient-to-b from-red-950/30 to-transparent border border-red-900/20 p-10 md:p-16">
            <div className="flex items-center gap-4 mb-10">
              <AlertTriangle className="text-red-600" size={28} />
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">O custo de não entender</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { numero: "94%", desc: "do poder de compra do Real foi destruído desde o Plano Real. Seu salário compra menos a cada ano." },
                { numero: "6x", desc: "o governo brasileiro já confiscou ou congelou a poupança do cidadão. Collor foi apenas o mais famoso." },
                { numero: "0", desc: "é o número de vezes que alguém te avisou sobre isso na escola, na faculdade ou no banco." },
              ].map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <p className="text-5xl md:text-6xl font-black text-red-600 leading-none mb-4">{stat.numero}</p>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD CENTRAL: POR QUE ESTE MATERIAL EXISTE */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Por que este material existe</h3>
              <div className="space-y-4 mb-10">
                <p className="text-2xl font-black text-white leading-none uppercase">A queda não é do mercado. <span className="text-red-600 italic">É da consciência.</span></p>
                <p className="text-slate-400 font-medium">
                  A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele. Bitcoin não surge como solução mágica. Surge como explicação tardia.
                </p>
                <p className="text-slate-500 italic text-sm">
                  Quando a água bate no pescoço, muitos finalmente entendem o que ignoraram enquanto tudo parecia normal.
                </p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">Gratuito • Sem Cadastro • Sem Iscas</p>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 animate-[pulse_2s_infinite] shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>

            {/* CAPA DO PDF */}
            <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
              <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <ShieldCheck className="text-white/20" size={40} />
                <div>
                  <h4 className="text-3xl font-black leading-none uppercase tracking-tighter italic mb-2">Protocolos de Soberania</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Lord Junnior</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CAMADA 3: BITCOIN EM 60 SEGUNDOS */}
        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">Bitcoin em 60 segundos</h3>
          <div className="space-y-1">
            {[
              { icone: Clock, titulo: "Limitado", texto: "Só existirão 21 milhões. Ninguém pode criar mais — nem governos, nem bancos, nem hackers." },
              { icone: Eye, titulo: "Transparente", texto: "Todas as transações são públicas e verificáveis. Qualquer pessoa pode auditar a rede a qualquer momento." },
              { icone: Ban, titulo: "Inconfiscável", texto: "Se você guarda suas próprias chaves, ninguém pode congelar, bloquear ou confiscar seus bitcoins." },
              { icone: ShieldCheck, titulo: "Descentralizado", texto: "Não existe um dono. A rede é mantida por milhares de computadores espalhados pelo mundo." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start bg-[#0B0F19] border border-white/5 p-6 md:p-8">
                <div className="bg-red-600/10 p-3 rounded-sm shrink-0">
                  <item.icone className="text-red-600" size={22} />
                </div>
                <div>
                  <p className="text-white font-black uppercase tracking-tight text-lg mb-1">{item.titulo}</p>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAMADA 4: PERGUNTAS QUE TODO LEIGO FAZ */}
        <div className="mb-32">
          <h3 className="text-xl font-black uppercase mb-10 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">Perguntas que todo leigo faz</h3>
          <div className="space-y-6">
            {[
              { p: "Se cair a internet, perco meus bitcoins?", r: "Não. Seus bitcoins existem na blockchain, que é replicada em milhares de computadores. Quando a internet voltar, tudo continua lá. Além disso, já existem formas de enviar Bitcoin via satélite e rádio." },
              { p: "E se eu esquecer minha senha?", r: "No Bitcoin, sua 'senha' são 12 ou 24 palavras (seed phrase). Se você guardar essas palavras com segurança, sempre terá acesso. Se perder, ninguém pode recuperar — por isso a responsabilidade é sua." },
              { p: "Bitcoin consome muita energia?", r: "Bitcoin usa energia para garantir segurança. Mais de 50% da mineração já usa fontes renováveis. A pergunta certa é: quanto custa manter o sistema bancário tradicional funcionando?" },
              { p: "Posso ser preso por ter Bitcoin?", r: "No Brasil, Bitcoin é legal. Você pode comprar, vender e guardar livremente. O que é ilegal é sonegar impostos sobre ganhos, assim como qualquer outro ativo." },
              { p: "Bitcoin é a mesma coisa que cripto?", r: "Não. Bitcoin é a única rede verdadeiramente descentralizada, com oferta fixa e sem fundador ativo. As demais 'criptos' são projetos controlados por empresas ou grupos — a maioria sem utilidade real." },
            ].map((item, idx) => (
              <details key={idx} className="group bg-[#0B0F19] border border-white/5">
                <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 list-none">
                  <p className="text-white font-black uppercase tracking-tight text-base md:text-lg pr-4">{item.p}</p>
                  <span className="text-red-600 font-black text-2xl shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.r}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* PRÓXIMO NÍVEL */}
        <div className="border-2 border-white p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-40">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-2xl">🗝️</span>
              <h3 className="font-black uppercase tracking-[0.4em] text-sm">Próximo Nível</h3>
            </div>
            <p className="text-slate-400 font-bold uppercase text-sm">Depois de ler, você não será mais leigo. Estará pronto para a prática.</p>
          </div>
          <Link to="/arsenal" className="bg-white text-black px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
            Ir para o Arsenal Técnico <ArrowRight size={18} />
          </Link>
        </div>

        {/* FOOTER MANIFESTO */}
        <footer className="pt-20 border-t border-white/5">
          <div className="text-center space-y-12">
            <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px]">Not your keys, not your money.</p>
            
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Quem não assume a custódia aceita a dependência.</p>
              <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter italic">Autocustódia exige responsabilidade.</p>
            </div>

            <div className="pt-20 pb-10">
              <p className="text-slate-500 font-bold uppercase text-sm tracking-tight mb-2">Lembrem-se: Dependência financeira nunca foi acidente.</p>
              <p className="text-white font-black uppercase text-5xl md:text-7xl tracking-tighter italic leading-none">Sempre foi projeto.</p>
              <p className="text-slate-800 text-[10px] font-black mt-20 tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
