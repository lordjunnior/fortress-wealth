import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, Shield, Lock, Eye,
  Server, Code, QrCode, Terminal, Download,
  CheckCircle2, XCircle, Fingerprint, Globe,
  ChevronRight, ShieldAlert, Zap, Copy, ExternalLink,
  Ban, FileCode2, HardDrive, KeyRound,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';
import BackToHome from '@/components/BackToHome';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgHero from '@/assets/pix-anonimo-hero.jpg';
import imgCodigo from '@/assets/pix-anonimo-codigo.jpg';
import imgQrcode from '@/assets/pix-anonimo-qrcode.jpg';
import imgServidor from '@/assets/pix-anonimo-servidor.jpg';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const BG = '#050808';

/* ── GSAP Section ── */
const GS = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, []);
  return <div ref={ref} id={id} className={className}>{children}</div>;
};

/* ── FAQ Data ── */
const FAQ = [
  {
    q: 'Receber PIX sem mostrar meus dados pessoais e CPF e legal?',
    a: 'Sim. Utilizar gateways de pagamento que geram QR Codes dinamicos e uma pratica comum no comercio eletronico. A diferenca e que, ao inves de vincular o pagamento diretamente a sua conta bancaria pessoal, voce utiliza uma API intermediaria. O pagador ve apenas as informacoes do gateway, nao as suas. Isso nao configura evasao fiscal ou fraude — e apenas uma camada de privacidade na transacao, similar ao que grandes empresas fazem com seus proprios gateways.',
  },
  {
    q: 'Qual a diferenca entre este metodo e o PIX comum?',
    a: 'No PIX comum, quando alguem te paga, ele ve seu nome completo, CPF parcial e banco. Com este metodo, o pagador escaneia um QR Code gerado por uma API de pagamento. Ele ve apenas os dados do gateway (como "Pagamento Processado por [Nome do Gateway]"). Seus dados pessoais ficam completamente ocultos da outra parte. O dinheiro cai na conta vinculada ao gateway, que voce controla.',
  },
  {
    q: 'Por que nao posso hospedar em plataformas como Netlify ou Vercel?',
    a: 'Porque o script que gera o QR Code utiliza PHP com execucao server-side. Plataformas como Netlify, Vercel e GitHub Pages sao feitas para hospedagem de sites estaticos (HTML, CSS, JavaScript puro). Elas NAO executam PHP. O script precisa de um servidor com suporte a PHP 7.4+ e cURL habilitado. Isso significa VPS (DigitalOcean, Contabo, Hetzner) ou hospedagem compartilhada que suporte PHP (como Hostinger ou InfinityFree).',
  },
  {
    q: 'Quais APIs de pagamento posso usar?',
    a: 'Existem diversas opcoes no mercado brasileiro: Mercado Pago, PagSeguro, Asaas, Pagar.me, entre outras. Cada uma tem seu processo de cadastro e taxas. A logica do script e a mesma para todas: voce faz uma requisicao POST com o valor desejado, recebe um payload PIX (o "copia e cola") e um QR Code. A diferenca esta nos headers de autenticacao e no endpoint da API.',
  },
  {
    q: 'Como funciona a autenticacao com a API?',
    a: 'Cada gateway fornece uma chave de API (API Key ou Access Token) apos o cadastro. No script PHP, essa chave e enviada no header Authorization de cada requisicao. NUNCA exponha essa chave no frontend (JavaScript do navegador). O script PHP roda no servidor, mantendo a chave invisivel para o usuario final. Este e o motivo pelo qual PHP server-side e necessario.',
  },
  {
    q: 'Posso usar este metodo para vender produtos online?',
    a: 'Sim. Este e exatamente o uso principal. Voce pode criar uma pagina de vendas com um botao "Pagar com PIX", que ao ser clicado, chama o script PHP no backend. O script gera o QR Code dinamicamente com o valor do produto. O cliente paga, e voce recebe uma notificacao via webhook do gateway confirmando o pagamento. Tudo automatizado.',
  },
  {
    q: 'Preciso declarar os valores recebidos?',
    a: 'Sim. Independente do metodo utilizado para receber pagamentos, a legislacao tributaria brasileira exige declaracao de renda. Este metodo protege sua privacidade perante TERCEIROS (o pagador nao ve seus dados), mas nao substitui obrigacoes fiscais. O gateway de pagamento reporta movimentacoes ao COAF conforme os mesmos criterios de qualquer instituicao financeira.',
  },
  {
    q: 'Como recebo notificacao quando alguem paga?',
    a: 'Atraves de webhooks. Voce configura uma URL no painel do gateway que sera chamada automaticamente quando um pagamento for confirmado. O gateway envia um POST para essa URL com os dados da transacao (valor, status, ID). Seu script PHP recebe esses dados e pode atualizar um banco de dados, enviar um email, ou executar qualquer logica de negocios.',
  },
  {
    q: 'E seguro hospedar em VPS barata?',
    a: 'Sim, desde que voce tome precaucoes basicas: use HTTPS (certificado SSL gratuito via Lets Encrypt), mantenha o PHP atualizado, nunca exponha credenciais no codigo publico, e configure firewall (UFW no Ubuntu). VPS de R$20-30/mes em provedores como Contabo ou Hetzner sao mais do que suficientes para este tipo de aplicacao.',
  },
  {
    q: 'Qual o custo para montar esta infraestrutura?',
    a: 'VPS basica: R$15-40/mes. Dominio: R$40-60/ano. Taxa do gateway por transacao: 1% a 3.5% dependendo do provedor. Certificado SSL: gratuito (Lets Encrypt). Total mensal fixo: menos de R$50. O investimento e minimo comparado a privacidade que voce ganha.',
  },
];

/* ── ERROS FATAIS ── */
const ERROS_FATAIS = [
  {
    icon: Server,
    titulo: 'Hospedar em plataforma estatica',
    desc: 'Netlify, Vercel, GitHub Pages NAO executam PHP. Seu script simplesmente nao funciona. O QR Code nunca sera gerado. E voce nao recebe nenhum erro claro — apenas uma pagina em branco ou um erro 500.',
    solucao: 'Use VPS com PHP 7.4+ (DigitalOcean, Contabo, Hetzner) ou hospedagem compartilhada com suporte PHP.',
  },
  {
    icon: KeyRound,
    titulo: 'Expor a API Key no frontend',
    desc: 'Se voce colocar sua chave de API no JavaScript do navegador, QUALQUER pessoa pode inspecionar o codigo e usar sua chave para gerar cobranças em seu nome. Isso e uma vulnerabilidade critica.',
    solucao: 'Mantenha a API Key APENAS no backend (PHP). Nunca no HTML, CSS ou JavaScript publico.',
  },
  {
    icon: Lock,
    titulo: 'Nao usar HTTPS',
    desc: 'Sem SSL, os dados trafegam em texto puro. Qualquer intermediario na rede (ISP, WiFi publico, atacante) pode interceptar a comunicacao entre seu servidor e a API do gateway, incluindo tokens de autenticacao.',
    solucao: 'Instale certificado SSL gratuito via Lets Encrypt. Em VPS Ubuntu: sudo certbot --apache ou --nginx.',
  },
  {
    icon: FileCode2,
    titulo: 'Content-Type incorreto na requisicao',
    desc: 'Se o header Content-Type nao estiver configurado como application/json, a API rejeita a requisicao silenciosamente. Voce recebe um erro generico ou uma resposta vazia sem entender o motivo.',
    solucao: 'Adicione explicitamente: Content-Type: application/json no header da requisicao cURL do PHP.',
  },
];

/* ── PASSOS ── */
const PASSOS = [
  {
    num: '01',
    titulo: 'Criar Conta no Gateway de Pagamento',
    desc: 'Cadastre-se em uma API de pagamento (Mercado Pago, PagSeguro, Asaas, entre outras). Apos a aprovacao, voce recebera uma API Key (chave de acesso) que sera usada para autenticar as requisicoes do seu script PHP. Guarde essa chave com seguranca absoluta.',
    detalhe: 'O cadastro geralmente exige CNPJ ou CPF. Algumas plataformas permitem pessoa fisica. O processo leva de 5 minutos a 48 horas para aprovacao. Apos aprovado, acesse a area de "Integracao" ou "Desenvolvedores" para obter sua chave.',
    img: imgQrcode,
  },
  {
    num: '02',
    titulo: 'Provisionar um Servidor com PHP',
    desc: 'Contrate uma VPS (Virtual Private Server) com suporte a PHP 7.4 ou superior e extensao cURL habilitada. Provedores recomendados: DigitalOcean (US$4/mes), Contabo (a partir de 4 euros/mes), Hetzner (3.29 euros/mes). Instale Apache ou Nginx + PHP.',
    detalhe: 'Comandos basicos para Ubuntu 22.04: sudo apt update && sudo apt install apache2 php php-curl php-json -y. Apos instalacao, crie um diretorio para seu projeto em /var/www/html/pagamento/ e coloque seu script PHP la.',
    img: imgServidor,
  },
  {
    num: '03',
    titulo: 'Implementar o Script PHP',
    desc: 'O script PHP e simples: recebe o valor via POST (ou query string), monta o payload JSON com os dados da cobranca, envia para o endpoint da API via cURL, e retorna o QR Code e o codigo "copia e cola" do PIX. Tudo acontece no servidor — o usuario final nunca ve a API Key.',
    detalhe: 'A logica principal em pseudocodigo: 1) Receber valor do formulario; 2) Montar array com dados da cobranca (valor, descricao, expiracao); 3) Converter para JSON; 4) Enviar via cURL POST para o endpoint /v1/payments ou equivalente; 5) Decodificar a resposta JSON; 6) Extrair o campo qr_code e qr_code_base64; 7) Renderizar na pagina.',
    img: imgCodigo,
  },
  {
    num: '04',
    titulo: 'Configurar SSL e Webhook',
    desc: 'Instale certificado HTTPS via Lets Encrypt (gratuito) e configure o webhook no painel do gateway. O webhook e a URL que o gateway chama automaticamente quando um pagamento e confirmado. Isso permite automacao total: confirmar pedidos, liberar downloads, enviar emails.',
    detalhe: 'Para SSL: sudo apt install certbot python3-certbot-apache -y && sudo certbot --apache. Para webhook: no painel do gateway, va em Configuracoes > Notificacoes > Webhooks. Insira a URL do seu script de callback (ex: https://seudominio.com/webhook.php).',
    img: imgQrcode,
  },
];

/* ── COMPARATIVO ── */
const COMPARATIVO = [
  { feature: 'Dados pessoais visiveis ao pagador', pix: true, metodo: false },
  { feature: 'CPF/CNPJ aparece na transacao', pix: true, metodo: false },
  { feature: 'Nome completo exposto', pix: true, metodo: false },
  { feature: 'Banco identificado', pix: true, metodo: false },
  { feature: 'QR Code dinamico automatico', pix: false, metodo: true },
  { feature: 'Webhook de confirmacao', pix: false, metodo: true },
  { feature: 'Integravel com e-commerce', pix: false, metodo: true },
  { feature: 'Funciona sem conta bancaria pessoal', pix: false, metodo: true },
];

export default function PixAnonimo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { scrollYProgress } = useScroll();
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const howToSchema = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: 'Como Receber PIX Sem Mostrar Seus Dados Pessoais',
    description: 'Guia tecnico completo para configurar um sistema de recebimento de PIX via gateway de pagamento, ocultando dados pessoais do pagador.',
    totalTime: 'PT2H',
    step: PASSOS.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: p.titulo, text: p.desc })),
  };
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'TechArticle',
    headline: 'PIX Anonimo: Como Receber Pagamentos Sem Expor Dados Pessoais',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    publisher: { '@type': 'Organization', name: 'Universidade Satoshi' },
    url: 'https://lordjunnior.com.br/pix-anonimo',
    datePublished: '2026-04-12', dateModified: '2026-04-12',
    proficiencyLevel: 'Intermediate',
    dependencies: 'PHP 7.4+, VPS, API de Pagamento, Certificado SSL',
  };

  return (
    <div className="min-h-screen text-foreground font-sans overflow-x-hidden" style={{ background: BG }}>
      <ScrollToTop />
      <Helmet>
        <title>PIX Sem Mostrar Dados: Receba Pagamentos Com Privacidade Total | Lord Junnior</title>
        <meta name="description" content="Aprenda a receber PIX sem expor CPF, nome ou banco. Guia tecnico com script PHP, API de pagamento e QR Code dinamico. Proteja sua identidade em cada transacao." />
        <link rel="canonical" href="https://lordjunnior.com.br/pix-anonimo" />
        <meta name="keywords" content="pix anonimo, receber pix sem mostrar dados, pix privado, pix sem cpf, qr code pix automatico, gateway pagamento pix, pix php script, pix api, receber pix sem banco, pix sem expor identidade, pagamento privado brasil, pix descentralizado, privacidade financeira pix, como esconder dados pix, pix sem nome aparecendo, anonymous pix brazil, receive pix privately, pix payment gateway, hide personal data pix, pix qr code generator" />
        <meta property="og:title" content="O Metodo Para Receber PIX Sem Mostrar Seus Dados" />
        <meta property="og:description" content="Seu nome, CPF e banco aparecem toda vez que alguem te paga via PIX. Existe um metodo tecnico para mudar isso." />
        <meta property="og:url" content="https://lordjunnior.com.br/pix-anonimo" />
        <meta property="og:type" content="article" />
        <html lang="pt-BR" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-chart-green z-50 origin-left" style={{ width: pw }} />

      {/* ══ HERO FULL-BLEED ══ */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <img src={imgHero} alt="QR Code PIX gerado automaticamente via script PHP em tela de terminal" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/70 to-[#050808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="relative z-20 mb-8">
            <BackToHome />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-chart-green/10 border border-chart-green/30">
                <span className="w-2 h-2 rounded-full bg-chart-green animate-pulse" />
                <span className="text-chart-green font-black uppercase tracking-[0.4em] text-[8px] font-mono">Privacidade Ativa</span>
              </div>
              <span className="px-3 py-1.5 rounded-sm bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-[8px] tracking-[0.3em] uppercase font-bold">
                Novo
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
            className="font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-6 max-w-4xl"
          >
            Receba PIX Sem Mostrar{' '}
            <span className="text-chart-green">Seus Dados</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Inter_Tight'] font-medium mb-10"
          >
            Toda vez que alguem te paga via PIX, seu nome completo, CPF parcial e banco ficam expostos.
            Este guia tecnico ensina como configurar um sistema onde o pagador ve apenas o gateway de pagamento.
            <span className="text-foreground font-bold"> Sua identidade real permanece oculta.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-border/20"
          >
            {[
              { label: 'Dados expostos por PIX', value: '04' },
              { label: 'Erros fatais documentados', value: '04' },
              { label: 'Custo mensal', value: 'R$50' },
              { label: 'Tempo de setup', value: '2h' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-['Bebas_Neue'] text-4xl text-foreground">{s.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">

        {/* ══ SEÇÃO 1: O PROBLEMA — O QUE O PIX EXPÕE ══ */}
        <GS id="problema" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">O que o PIX entrega sobre voce</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-[1.05]">
                Cada PIX Que Voce Recebe<br />
                <span className="text-destructive">Expoe Sua Identidade</span>
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { dado: 'Nome Completo', desc: 'Seu nome civil completo aparece para quem paga. Qualquer pessoa que faz um PIX para voce sabe exatamente quem voce e.' },
                  { dado: 'CPF Parcial', desc: 'Os primeiros e ultimos digitos do seu CPF ficam visiveis. Com tecnicas de OSINT basicas, e possivel reconstruir o CPF completo a partir de bases de dados publicas.' },
                  { dado: 'Instituicao Bancaria', desc: 'O nome do banco ou fintech onde voce tem conta fica exposto. Isso revela informacoes sobre seu perfil financeiro e cria vetores de engenharia social.' },
                  { dado: 'Tipo de Chave PIX', desc: 'Se sua chave for CPF, email ou telefone, o pagador tem um dado pessoal adicional sobre voce. Mesmo chaves aleatorias revelam o banco.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white/[0.02] border border-destructive/20 rounded-sm p-5 hover:border-destructive/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center shrink-0">
                        <Eye className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-sm mb-1 font-['Inter_Tight']">{item.dado}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-sm p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-bold text-sm mb-1">Risco Real Documentado</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Golpistas usam dados expostos pelo PIX para montar ataques de engenharia social.
                      Com nome + banco + CPF parcial, e possivel ligar para a vitima se passando pelo banco,
                      solicitar "confirmacao de dados" e obter acesso a conta. Isso acontece todos os dias no Brasil.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-sm overflow-hidden">
              <img src={imgQrcode} alt="QR Code PIX gerando dados de pagamento anonimamente" className="w-full h-full object-cover aspect-[16/10]" loading="lazy" width={1344} height={768} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/80 mb-2">Protocolo ativo</p>
                <p className="text-foreground/90 text-sm font-['Inter_Tight'] font-semibold italic leading-relaxed">
                  "O que o pagador ve: dados do gateway. O que ele NAO ve: voce."
                </p>
              </div>
            </div>
          </div>
        </GS>

        {/* ── Cinematic Break ── */}
        <div className="relative h-48 overflow-hidden">
          <img src={imgCodigo} alt="Codigo PHP gerando payload PIX via API" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase text-foreground/80 text-center px-6">
              Um script PHP. Uma API. <span className="text-chart-green">Privacidade total.</span>
            </p>
          </div>
        </div>

        {/* ══ SEÇÃO 2: COMO FUNCIONA — ARQUITETURA ══ */}
        <GS id="arquitetura" className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/70 mb-4">Infraestrutura tecnica</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
            Como o Sistema <span className="text-chart-green">Funciona</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-12">
            A logica e direta: em vez de vincular o PIX a sua conta bancaria pessoal,
            voce utiliza uma API de pagamento como intermediaria. O pagador interage com o gateway.
            O gateway processa o pagamento. Voce recebe o dinheiro. Seus dados pessoais nunca aparecem.
          </p>

          {/* Fluxo Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Globe, label: 'Pagador', desc: 'Acessa sua pagina de pagamento e insere o valor' },
              { icon: Code, label: 'Script PHP', desc: 'Recebe o valor e faz POST para API do gateway' },
              { icon: QrCode, label: 'QR Code', desc: 'API retorna payload PIX + QR Code dinamico' },
              { icon: Shield, label: 'Privacidade', desc: 'Pagador ve dados do GATEWAY, nao os seus' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative bg-white/[0.02] border border-border/30 rounded-sm p-6 text-center group hover:border-chart-green/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-sm bg-chart-green/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-chart-green" />
                  </div>
                  <p className="font-['Bebas_Neue'] text-xl mb-2">{step.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed font-['Inter_Tight']">{step.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-chart-green/30 z-20" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Pseudo-código */}
          <div className="bg-[#0a0f0f] border border-chart-green/15 rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 bg-chart-green/5 border-b border-chart-green/10">
              <Terminal className="w-4 h-4 text-chart-green" />
              <span className="text-chart-green font-mono text-[11px] font-bold tracking-wider">gerar-pix.php — Pseudocodigo Simplificado</span>
            </div>
            <pre className="p-6 text-sm font-mono text-muted-foreground overflow-x-auto leading-7">
{`// 1. Receber valor do formulario
$valor = $_POST['valor'];

// 2. Montar payload da cobranca
$payload = [
    'transaction_amount' => (float) $valor,
    'description' => 'Pagamento via QR Code',
    'payment_method_id' => 'pix',
    'payer' => [
        'email' => 'comprador@email.com'
    ]
];

// 3. Enviar para API do gateway via cURL
$ch = curl_init('https://api.gateway.com/v1/payments');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer SUA_API_KEY_AQUI',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch));
curl_close($ch);

// 4. Extrair QR Code da resposta
$qr_code = $response->point_of_interaction
    ->transaction_data->qr_code;
$qr_code_base64 = $response->point_of_interaction
    ->transaction_data->qr_code_base64;

// 5. Renderizar para o usuario
echo '<img src="data:image/png;base64,' . $qr_code_base64 . '">';
echo '<p>Copia e Cola: ' . $qr_code . '</p>';`}
            </pre>
          </div>
        </GS>

        {/* ══ SEÇÃO 3: PASSO A PASSO ══ */}
        <GS id="tutorial" className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Implementacao completa</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
            Passo a Passo <span className="text-primary">Tecnico</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-16">
            Do zero ao QR Code funcionando. Sem atalhos, sem omissoes, sem amadorismo.
            Cada passo inclui os comandos, as configuracoes e os erros mais comuns.
          </p>

          <div className="space-y-16">
            {PASSOS.map((passo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: APPLE_EASE }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-['Bebas_Neue'] text-5xl text-chart-green/20">{passo.num}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-chart-green/20 to-transparent" />
                    </div>
                    <h3 className="font-['Inter_Tight'] font-bold text-xl md:text-2xl mb-4 text-foreground">{passo.titulo}</h3>
                    <p className="text-muted-foreground text-sm leading-7 font-['Inter_Tight'] mb-4">{passo.desc}</p>
                    <div className="bg-white/[0.02] border border-border/20 rounded-sm p-5">
                      <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-chart-green/60 mb-2">Detalhes tecnicos</p>
                      <p className="text-muted-foreground text-xs leading-6 font-['Inter_Tight']">{passo.detalhe}</p>
                    </div>
                  </div>
                  <div className={`relative rounded-sm overflow-hidden ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img src={passo.img} alt={passo.titulo} className="w-full aspect-[16/10] object-cover" loading="lazy" width={1344} height={768} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/80 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GS>

        {/* ══ SEÇÃO 4: ERROS FATAIS ══ */}
        <GS id="erros" className="py-20" >
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">Armadilhas tecnicas</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
              Erros Que <span className="text-destructive">Destroem</span> Seu Setup
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-12">
              Estes sao os erros mais comuns que fazem o sistema falhar silenciosamente.
              Cada um deles ja custou horas de debug para quem tentou sem este guia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ERROS_FATAIS.map((erro, i) => {
                const Icon = erro.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white/[0.02] border border-destructive/15 rounded-sm overflow-hidden hover:border-destructive/30 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <XCircle className="w-3 h-3 text-destructive" />
                            <span className="text-destructive text-[8px] font-black uppercase tracking-[0.3em] font-mono">Erro Fatal</span>
                          </div>
                          <h4 className="text-foreground font-bold text-sm font-['Inter_Tight']">{erro.titulo}</h4>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight'] mb-4">{erro.desc}</p>
                      <div className="bg-chart-green/5 border border-chart-green/15 rounded-sm p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-3 h-3 text-chart-green" />
                          <span className="text-chart-green text-[8px] font-black uppercase tracking-[0.3em] font-mono">Correcao</span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed font-['Inter_Tight']">{erro.solucao}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GS>

        {/* ── Cinematic Break 2 ── */}
        <div className="relative h-64 overflow-hidden">
          <img src={imgServidor} alt="Servidor VPS com LEDs verdes processando pagamentos PIX" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase text-foreground/80 text-center px-6">
              Seu servidor. Suas regras. <span className="text-chart-green">Seus dados protegidos.</span>
            </p>
          </div>
        </div>

        {/* ══ SEÇÃO 5: COMPARATIVO ══ */}
        <GS id="comparativo" className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Analise comparativa</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-8 leading-[1.05]">
            PIX Comum vs. <span className="text-chart-green">PIX Via Gateway</span>
          </h2>

          <div className="bg-white/[0.02] border border-border/30 rounded-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-white/[0.03] border-b border-border/20">
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Caracteristica</div>
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-destructive text-center">PIX Comum</div>
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-chart-green text-center">Via Gateway</div>
            </div>
            {COMPARATIVO.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-border/10 hover:bg-white/[0.01] transition-colors">
                <div className="p-4 text-sm text-foreground font-['Inter_Tight']">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.pix ? (
                    <XCircle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-chart-green" />
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {row.metodo ? (
                    <CheckCircle2 className="w-5 h-5 text-chart-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </GS>

        {/* ══ ALERTA PIX NÃO É PRIVADO ══ */}
        <GS className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-destructive/5 border-2 border-destructive/30 rounded-sm p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-destructive/15 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-destructive mb-3">TRANSPARENCIA OBRIGATORIA</h3>
                <p className="text-foreground text-sm leading-7 font-['Inter_Tight'] mb-4">
                  Este metodo protege sua identidade perante <span className="font-bold">o pagador</span> (terceiros).
                  O gateway de pagamento ainda reporta movimentacoes ao COAF conforme legislacao vigente.
                  PIX, em qualquer formato, passa pelo sistema bancario brasileiro e esta sujeito a regulacao do Banco Central.
                </p>
                <p className="text-muted-foreground text-sm leading-7 font-['Inter_Tight']">
                  Para privacidade financeira TOTAL, o caminho e a autocustodia de Bitcoin via rede Lightning,
                  com aquisicao P2P sem KYC. Este guia resolve o problema imediato de exposicao de dados em transacoes PIX,
                  mas nao substitui uma infraestrutura soberana completa.
                </p>
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 mt-4 text-primary text-xs font-bold uppercase tracking-wider font-mono hover:gap-3 transition-all"
                >
                  Conhecer autocustodia real <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </GS>

        <MicroCtaResistencia variant="default" />

        {/* ══ SEÇÃO 6: FAQ ══ */}
        <GS id="faq" className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Perguntas frequentes</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-8 leading-[1.05]">
            Tudo Que Voce Precisa <span className="text-chart-green">Saber</span>
          </h2>

          <Accordion type="multiple" className="space-y-2">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/20 rounded-sm bg-white/[0.01] px-6">
                <AccordionTrigger className="text-left text-sm font-['Inter_Tight'] font-semibold text-foreground hover:text-chart-green transition-colors py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-7 font-['Inter_Tight'] pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GS>

        {/* ══ CTA FINAL ══ */}
        <GS className="max-w-5xl mx-auto px-6 py-20">
          <div className="relative bg-white/[0.02] border border-chart-green/20 rounded-sm p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-chart-green/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative">
              <Shield className="w-12 h-12 text-chart-green mx-auto mb-6" />
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4">
                Proteja Sua Identidade<br /><span className="text-chart-green">Em Cada Transacao</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto font-['Inter_Tight'] mb-8">
                Voce nao precisa expor nome, CPF e banco toda vez que alguem te paga.
                A infraestrutura existe. O conhecimento esta aqui. A decisao e sua.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-chart-green/10 border border-chart-green/30 rounded-sm text-chart-green text-xs font-bold uppercase tracking-wider hover:bg-chart-green/20 transition-all"
                >
                  <KeyRound className="w-4 h-4" />
                  Protocolo de Autocustodia
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/soberania-financeira/pix-sem-banco"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 border border-primary/30 rounded-sm text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  PIX Sem Banco
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </GS>

        <FooterSection />
      </div>
    </div>
  );
}
