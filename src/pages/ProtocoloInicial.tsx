import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, Cpu, History, Search, Scale, HelpCircle, AlertTriangle, TrendingDown, Eye } from 'lucide-react';

export default function ProtocoloInicial() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white font-sans selection:bg-red-600 pb-32 overflow-x-hidden">
      {/* MANTIDO: Alert System Particles Original */}
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
          background-image: radial-gradient(2px 2px at 15% 15%, rgba(220,38,38,0.35) 100%, transparent);
          background-size: 200px 200px; animation: driftAlert 50s linear infinite;
        }
        .alert-layer-2 { background-size: 280px 280px; animation: driftAlert 70s linear infinite reverse; opacity: 0.6; }
        .alert-layer-3 { background-size: 360px 360px; animation: driftAlert 100s linear infinite; opacity: 0.3; }
        .alert-pulse {
          position: absolute; top: 30%; left: 50%; width: 400px; height: 400px;
          margin: -200px 0 0 -200px; border-radius: 50%; border: 1px solid rgba(220,38,38,0.1);
          animation: alertPulse 5s ease-in-out infinite;
        }
        .protocolo-shimmer {
          background: linear-gradient(90deg, #dc2626 0%, #ff6b6b 40%, #ffffff 50%, #ff6b6b 60%, #dc2626 100%);
          background-size: 250% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: protocShimmer 3s linear infinite;
        }
        @keyframes protocShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .bar-grow { animation: barGrow 2s ease-out forwards; transform-origin: bottom; }
        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white mb-20 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
          <ArrowLeft size={14} /> Retornar ao Início
        </Link>

        {/* HEADER */}
        <header className="mb-24">
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Para Leigos Absolutos</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 uppercase text-white">
            Entenda o Bitcoin
          </h1>
          <p className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase protocolo-shimmer italic pb-2">
            A Fraude Fiduciária vs Verdade Digital
          </p>
        </header>

        {/* 01. GÊNESE E NATUREZA DO DINHEIRO */}
        <section className="mb-32 space-y-12">
          <div className="flex items-center gap-4 text-red-600">
            <Coins size={24} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">01. O que é dinheiro?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed">
            <div className="space-y-6">
              <p>
                Dinheiro é uma tecnologia de transporte de tempo e esforço através do espaço e do tempo. No sistema atual, governos imprimem moeda sem custo, diluindo o valor do seu trabalho. Isso é inflação: um roubo invisível e constante.
              </p>
              <p>
                O Bitcoin surge como o antídoto: uma moeda digital descentralizada que oferece transações rápidas e seguras com um suprimento fixo. É a primeira vez na história que a humanidade descobriu a escassez absoluta.
              </p>
            </div>
            <div className="bg-slate-900/40 p-8 border border-white/5 rounded-2xl">
              <h4 className="text-white font-black uppercase mb-4 italic text-sm tracking-widest">Leis da Moeda Forte:</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-tight">
                <li className="flex gap-3 text-red-500 font-black"><Zap size={16}/> Escassez: Ouro é finito. Impressora é infinita.</li>
                <li className="flex gap-3 text-slate-200"><Lock size={16}/> Imutabilidade: Ninguém altera o código.</li>
                <li className="flex gap-3 text-slate-200"><Globe size={16}/> Soberania: Sem bancos, sem permissão.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 02. COMO FUNCIONAM AS TRANSAÇÕES */}
        <section className="mb-32 space-y-10">
          <div className="flex items-center gap-4 text-red-600">
            <TrendingDown size={24} className="rotate-90" />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">02. A Mecânica da Transação</h2>
          </div>
          <p className="text-slate-400 text-xl leading-relaxed max-w-3xl font-medium">
            Uma transação é uma transferência de valor em Bitcoin na blockchain. Diferente do PIX ou cartões, elas são irreversíveis uma vez adicionadas à rede.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
              <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Inputs</h4>
              <p className="text-xs text-slate-500 leading-relaxed uppercase">O endereço de onde o Bitcoin está saindo. É a prova de que você recebeu esse valor anteriormente.</p>
            </div>
            <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
              <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Outputs</h4>
              <p className="text-xs text-slate-500 leading-relaxed uppercase">O endereço de destino. É a chave pública que passará a ter o controle sobre esse valor.</p>
            </div>
            <div className="p-8 bg-[#0B0F19] border border-white/5 rounded-xl">
              <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic">Taxas</h4>
              <p className="text-xs text-slate-500 leading-relaxed uppercase">O incentivo para mineradores. Quanto maior a taxa, mais rápido sua transação é confirmada no bloco.</p>
            </div>
          </div>
        </section>

        {/* 03. CHAVES PÚBLICAS E PRIVADAS */}
        <section className="mb-32">
          <div className="flex items-center gap-4 text-red-600 mb-12">
            <Lock size={24} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">03. Chaves e Propriedade</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                O Bitcoin usa criptografia de chave pública para provar ownership. Você tem um par de chaves: a <strong>Pública</strong> (seu endereço para receber) e a <strong>Privada</strong> (seu segredo para gastar).
              </p>
              <p>
                A chave privada gera a assinatura digital necessária para autorizar transações. Se alguém tiver sua chave privada, tem seus bitcoins. Se você perder sua chave privada e não tiver o backup (seed), seus fundos estão perdidos para sempre.
              </p>
            </div>
            <div className="border-2 border-red-600/20 bg-red-950/10 p-10 rounded-sm space-y-6">
              <p className="text-red-600 font-black uppercase tracking-widest text-xs italic">Aviso Operacional:</p>
              <p className="text-white font-black text-xl leading-tight uppercase italic">
                "Bitcoin wallets não guardam bitcoins. Elas guardam as CHAVES que dão acesso às suas moedas gravadas na blockchain."
              </p>
            </div>
          </div>
        </section>

        {/* 04. A LEI DOS 21 MILHÕES (COM GRÁFICO) */}
        <section className="mb-32 bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">O Limite de <span className="text-red-600">21 Milhões</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                O suprimento de Bitcoin é fixo. Diferente do dinheiro fiduciário, ninguém pode alterar este limite sem o consenso da rede. Este limite é garantido pela política monetária cravada no código e protegida por nós e mineradores.
              </p>
              <div className="flex gap-10">
                <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Última Unidade</p><p className="text-3xl font-black italic text-white">Ano 2140</p></div>
                <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Mecanismo</p><p className="text-3xl font-black italic text-white">Halving</p></div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-3 border-b border-l border-white/10 p-4 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-red-600/5 to-transparent pointer-events-none"></div>
              {[100, 50, 25, 12, 6, 3].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div style={{ height: `${h}%` }} className="bg-red-600/30 border-t-2 border-red-500 group-hover:bg-red-600 transition-all bar-grow origin-bottom" />
                  <span className="text-[8px] text-center mt-2 text-slate-600 font-black">Bloco {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05. SEGURANÇA E HACKS */}
        <section className="mb-32 space-y-12">
          <div className="flex items-center gap-4 text-red-600">
            <ShieldCheck size={24} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">04. O Bitcoin pode ser hackeado?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed font-medium">
            <div className="space-y-6">
              <p>
                A blockchain do Bitcoin nunca foi hackeada. O sistema é economicamente e tecnicamente imune à corrupção devido à sua natureza distribuída.
              </p>
              <p>
                Para corromper a rede, seria necessário um <strong>Ataque de 51%</strong>: controlar mais poder computacional do que todos os outros mineradores juntos. O custo de energia e hardware para isso é proibitivo e suicida.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                O verdadeiro risco não está no código, mas no usuário. A maioria dos "hacks" são, na verdade, erros humanos: perda de chaves, esquecimento de senhas ou ataques de engenharia social.
              </p>
              <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl flex items-start gap-4">
                <AlertTriangle className="text-red-600 shrink-0" size={24} />
                <p className="text-sm font-bold uppercase tracking-tight text-white leading-relaxed">
                  "Nenhum sistema digital é 100% perfeito, mas o Bitcoin é o sistema monetário mais seguro já inventado pela humanidade."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06. SATOSHIS E DIVISIBILIDADE */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 p-12 bg-[#0B0F19] border border-white/5 rounded-3xl relative overflow-hidden group">
              <Coins className="absolute -top-10 -right-10 text-white opacity-[0.03] group-hover:scale-110 transition-transform" size={300} />
              <div className="text-7xl font-black text-white italic mb-2">100.000.000</div>
              <p className="text-red-600 font-black uppercase tracking-[0.5em] text-xs mb-8">Satoshis em cada Bitcoin</p>
              <p className="text-slate-400 leading-relaxed font-medium relative z-10">
                Você não precisa de um Bitcoin inteiro. Ele é divisível em 8 casas decimais. Um Satoshi (sat) é a menor unidade: 0,00000001 BTC. Isso permite microtransações e acessibilidade para qualquer pessoa.
              </p>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] italic">A Escala da <br/> <span className="text-red-600">Liberdade</span></h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium italic">
                "Não conte seu patrimônio em uma moeda que pode ser impressa. Conte em satoshis, a unidade de medida da escassez absoluta."
              </p>
            </div>
          </div>
        </section>

        {/* 07. MITOS NEUTRALIZADOS (CARDS TÁTICOS) */}
        <section className="mb-32">
          <h3 className="text-xl font-black uppercase mb-12 tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4 italic">Neutralizando o Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { m: "Bitcoin é anônimo", v: "Errado. Ele é pseudônimo e o sistema financeiro mais transparente e auditável do mundo." },
              { m: "Não tem valor intrínseco", v: "Seu valor vem da utilidade como banco de dados imutável e sua escassez matematicamente provada." },
              { m: "Bitcoin é difícil de usar", v: "É o único dinheiro onde você é 100% dono. A soberania exige apenas um passo inicial." },
              { m: "Vai ser banido", v: "Impossível banir um código que vive em satélites, rádios e na mente de milhões." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#0B0F19] border border-white/5 group hover:border-red-600 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">Mito {i+1}</span>
                  <AlertTriangle size={14} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                </div>
                <p className="text-xl font-black uppercase line-through text-slate-700 group-hover:text-red-900 transition-colors mb-4">{item.m}</p>
                <p className="text-white font-bold leading-tight opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 italic">→ {item.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 08. BLINDAGEM CONTRA GOLPES (ALERTA VERMELHO AGRESSIVO) */}
        <section className="mb-40 border-4 border-red-600 bg-red-950/20 p-12 relative overflow-hidden rounded-sm shadow-[0_0_60px_rgba(220,38,38,0.15)]">
          <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-20 -mt-20" size={400} />
          <div className="relative z-10">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-12 flex items-center gap-6 italic">
              <ShieldAlert className="text-red-600 animate-pulse" size={48} /> Blindagem contra Predadores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-bold uppercase text-xs tracking-[0.2em] leading-loose">
              <div className="space-y-8">
                <p className="text-white"><span className="text-red-600 block mb-2 underline italic text-sm font-black">Engenharia Social</span> Golpistas hackeiam mentes, não redes. Usam manipulação emocional, golpes românticos e falsas urgências de familiares.</p>
                <p className="text-white"><span className="text-red-600 block mb-2 underline italic text-sm font-black">Phishing e Deepfakes</span> Sites falsos e vídeos de IA (como Michael Saylor falso) prometendo lucro fácil são ataques. Se parece bom demais, é roubo.</p>
              </div>
              <div className="bg-black/60 p-8 border border-red-600/40 rounded-sm">
                <h5 className="text-red-600 font-black mb-6 italic text-sm tracking-[0.3em]">O CÓDIGO DO SOBERANO:</h5>
                <ul className="space-y-4 text-slate-200">
                  <li className="flex gap-4 items-start"><span className="text-red-600">01</span> NUNCA forneça sua Seed Phrase (12/24 palavras) para ninguém.</li>
                  <li className="flex gap-4 items-start"><span className="text-red-600">02</span> Autenticação 2FA via App (Authenticator), NUNCA via SMS.</li>
                  <li className="flex gap-4 items-start"><span className="text-red-600">03</span> Use Cold Storage para grandes quantias. Higiene digital é vida.</li>
                  <li className="flex gap-4 items-start font-black text-white italic"><span className="text-red-600">!!</span> NO BITCOIN, VOCÊ É O RESPONSÁVEL FINAL.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MANTIDO: CARD CENTRAL ORIGINAL: POR QUE ESTE MATERIAL EXISTE */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/5 overflow-hidden mb-32 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center text-white">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">Por que este material existe</h3>
              <div className="space-y-4 mb-10">
                <p className="text-2xl font-black text-white leading-none uppercase">A queda não é do mercado. <span className="text-red-600 italic">É da consciência.</span></p>
                <p className="text-slate-400 font-medium">
                  A maioria só começa a perguntar como o dinheiro funciona quando percebe que já não tem controle sobre ele. Bitcoin não surge como solução mágica. Surge como explicação tardia.
                </p>
              </div>
              <button className="bg-white text-black font-black py-6 px-10 rounded-none text-xs uppercase tracking-[0.3em] transition-all hover:bg-red-600 hover:text-white flex items-center justify-center gap-3 animate-[pulse_2s_infinite] shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Download size={18} /> Baixar PDF Gratuito
              </button>
            </div>
            <div className="bg-[#0E131F] p-12 flex items-center justify-center border-l border-white/5">
              <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-red-700 via-red-900 to-black rounded-sm shadow-2xl relative p-8 flex flex-col justify-between border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <ShieldCheck className="text-white/20" size={40} />
                <div>
                  <h4 className="text-3xl font-black leading-none uppercase tracking-tighter italic mb-2 text-white">Protocolos de Soberania</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-white">Lord Junnior</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MANTIDO: PRÓXIMO NÍVEL ORIGINAL */}
        <div className="border-2 border-white p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-40">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-2xl">🗝️</span>
              <h3 className="font-black uppercase tracking-[0.4em] text-sm text-white">Próximo Nível</h3>
            </div>
            <p className="text-slate-400 font-bold uppercase text-sm">Depois de ler, você não será mais leigo. Estará pronto para a prática.</p>
          </div>
          <Link to="/arsenal" className="bg-white text-black px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3">
            Ir para o Arsenal Técnico <ArrowRight size={18} />
          </Link>
        </div>

        {/* MANTIDO: FOOTER MANIFESTO ORIGINAL */}
        <footer className="pt-20 border-t border-white/5">
          <div className="text-center space-y-12">
            <p className="text-slate-700 font-black uppercase tracking-[1em] text-[10px]">Not your keys, not your money.</p>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white italic">Sempre foi projeto.</p>
              <p className="text-red-600 font-black uppercase text-xl md:text-2xl tracking-tighter italic">Autocustódia exige responsabilidade.</p>
            </div>
            <div className="pt-20 pb-10 text-white">
              <p className="text-slate-800 text-[10px] font-black mt-20 tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
