import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import BitcoinVsImovel from "./pages/BitcoinVsImovel";
import TaxaDeFuga from "./pages/TaxaDeFuga";
import Economia from "./pages/Economia";
import Bitcoin from "./pages/Bitcoin";
import Filosofia from "./pages/Filosofia";
import Saida from "./pages/Saida";
import Ferramentas from "./pages/Ferramentas";
import Educacao from "./pages/Educacao";

import Autocustodia from "./pages/Autocustodia";
import EconomiaParalela from "./pages/EconomiaParalela";
import Infraestrutura from "./pages/Infraestrutura";
import LightningPage from "./pages/Lightning";
import Gateway from "./pages/Gateway";
import PixCripto from "./pages/PixCripto";
import Audiobooks from "./pages/Audiobooks";
import Ebooks from "./pages/Ebooks";
import SilencioQueda from "./pages/SilencioQueda";
import ProtocoloInicial from "./pages/ProtocoloInicial";
import Arsenal from "./pages/Arsenal";
import NotFound from "./pages/NotFound";
import BlindagemGolpes from "./pages/BlindagemGolpes";
import ProibicaoDinheiro from "./pages/ProibicaoDinheiro";
import AlertasHub from "./pages/AlertasHub";
import CbdcBrasil from "./pages/CbdcBrasil";
import HistoriaDoDinheiro from "./pages/HistoriaDoDinheiro";
import InflacaoImpostoOculto from "./pages/InflacaoImpostoOculto";
import BitcoinVsFiat from "./pages/BitcoinVsFiat";
import TeoriaDasBandeiras from "./pages/TeoriaDasBandeiras";
import PalauDigitalResidency from "./pages/PalauDigitalResidency";
import IndiceDoDesespertar from "./pages/IndiceDoDesespertar";
import HardCap21 from "./pages/HardCap21";
import BitcoinSeguro from "./pages/BitcoinSeguro";
import ChavesPage from "./pages/ChavesPage";
import TransacoesBitcoin from "./pages/TransacoesBitcoin";
import NocoesBitcoin from "./pages/NocoesBitcoin";
import OQueEBitcoin from "./pages/OQueEBitcoin";
import MineracaoBitcoin from "./pages/MineracaoBitcoin";
import FuturoBitcoin from "./pages/FuturoBitcoin";
import SupplyShock from "./pages/SupplyShock";
import HalvingBitcoin from "./pages/HalvingBitcoin";
import VolatilidadeBitcoin from "./pages/VolatilidadeBitcoin";
import LastroBitcoin from "./pages/LastroBitcoin";
import ProjetoAutonomo from "./pages/ProjetoAutonomo";
import ModuloAutonomo from "./pages/ModuloAutonomo";
import ConservacaoArmazenamento from "./pages/ConservacaoArmazenamento";
import ProducaoPequenosEspacos from "./pages/ProducaoPequenosEspacos";
import ProteinaSustentavel from "./pages/ProteinaSustentavel";
import SoloFertilidade from "./pages/SoloFertilidade";
import HortaUrbana from "./pages/HortaUrbana";
import AutonomiaBiologica from "./pages/AutonomiaBiologica";
import PlantaDetalhe from "./pages/PlantaDetalhe";
import PrimeirosSocorros from "./pages/PrimeirosSocorros";
import AvaliacaoSinais from "./pages/AvaliacaoSinais";
import SaudePreventiva from "./pages/SaudePreventiva";
import FitoterapiaAplicada from "./pages/FitoterapiaAplicada";
import ControleVetores from "./pages/ControleVetores";
import SabedoriaAncestral from "./pages/SabedoriaAncestral";
import Kit72h from "./pages/Kit72h";
import PurificacaoAgua from "./pages/PurificacaoAgua";
import ProtocolosApagao from "./pages/ProtocolosApagao";
import AbrigoEmergencia from "./pages/AbrigoEmergencia";
import ComunicacaoOffline from "./pages/ComunicacaoOffline";
import NavegacaoPrimaria from "./pages/NavegacaoPrimaria";
import ConhecimentoPerdido from "./pages/ConhecimentoPerdido";
import Confisco1990 from "./pages/Confisco1990";
import Neobankless from "./pages/Neobankless";
import SoberaniaFinanceira from "./pages/SoberaniaFinanceira";
import BankOfGeorgia from "./pages/BankOfGeorgia";
import WisePage from "./pages/Wise";
import PayoneerPage from "./pages/Payoneer";
import ContasOffshore from "./pages/ContasOffshore";
import AberturaRemota from "./pages/AberturaRemota";
import IndiceSoberaniaFinanceira from "./pages/IndiceSoberaniaFinanceira";
import KycNotMe from "./pages/KycNotMe";
import BricsPay from "./pages/BricsPay";
import DepixReporte from "./pages/DepixReporte";
import OptimaExchange from "./pages/OptimaExchange";
import PegasusSwap from "./pages/PegasusSwap";
import BybitBinanceReportam from "./pages/exchanges/BybitBinanceReportam";
import RicosNaoInvestemFiis from "./pages/mercado-tradicional/RicosNaoInvestemFiis";
import GrabrFi from "./pages/GrabrFi";
import ExchangesSemKyc from "./pages/ExchangesSemKyc";
import KucoinPayPix from "./pages/KucoinPayPix";
import BlockchainPage from "./pages/Blockchain";
import CandlestickPage from "./pages/Candlestick";
import DiversificacaoPage from "./pages/Diversificacao";
import BitcoinVsAltcoinsPage from "./pages/BitcoinVsAltcoins";
import DicionarioCripto from "./pages/DicionarioCripto";
import ComprarBitcoinAnonimo from "./pages/ComprarBitcoinAnonimo";
import DolarVirtual from "./pages/DolarVirtual";
import Bip110 from "./pages/Bip110";
import MobilidadeDeChaves from "./pages/MobilidadeDeChaves";
import HardwareWalletDiy from "./pages/HardwareWalletDiy";
import KruxPassphraseBluewallet from "./pages/KruxPassphraseBluewallet";
import CpContextoHistorico from "./pages/cp/ContextoHistorico";
import CpBaseFisiologica from "./pages/cp/BaseFisiologica";
import CpSegurancaLimites from "./pages/cp/SegurancaLimites";
import CpAplicacaoPratica from "./pages/cp/AplicacaoPratica";
import CpContinuidadeFamiliar from "./pages/cp/ContinuidadeFamiliar";
import ToxicosOcultos from "./pages/ToxicosOcultos";
import ToxinasAlimentares from "./pages/toxicos/ToxinasAlimentares";
import ManipulacaoInformacional from "./pages/toxicos/ManipulacaoInformacional";
import DependenciaTecnologica from "./pages/toxicos/DependenciaTecnologica";
import ToxinasAmbientais from "./pages/toxicos/ToxinasAmbientais";
import RapeDossie from "./pages/rape/RapeDossie";
import ProtocoloQuelantes from "./pages/rape/ProtocoloQuelantes";
import PlantasSubutilizadas from "./pages/PlantasSubutilizadas";
import Jurubeba from "./pages/plantas/Jurubeba";
import QuebraPedra from "./pages/plantas/QuebraPedra";
import EspinheiraSanta from "./pages/plantas/EspinheiraSanta";
import Guaco from "./pages/plantas/Guaco";
import Tanchagem from "./pages/plantas/Tanchagem";
import Pariparoba from "./pages/plantas/Pariparoba";
import ChapeuDeCouro from "./pages/plantas/ChapeuDeCouro";
import Umburana from "./pages/plantas/Umburana";
import Artemisia from "./pages/plantas/Artemisia";
import AristolochiaAlerta from "./pages/plantas/AristolochiaAlerta";
import CodigoAutonomiaModal from "./components/CodigoAutonomiaModal";
import ScrollToTop from "./components/ScrollToTop";
import MapaDaSoberania from "./pages/MapaDaSoberania";
import BabosaAcemannan from "./pages/BabosaAcemannan";
import PorOndeComecar from "./pages/PorOndeComecar";
import OleoRicinoBiohacker from "./pages/OleoRicinoBiohacker";
import VazamentoDados from "./pages/VazamentoDados";
import PixSemBanco from "./pages/PixSemBanco";
import ConfiscoBitcoin from "./pages/ConfiscoBitcoin";
import BitparkCartao from "./pages/BitparkCartao";
import PolymarketRedeNeural from "./pages/PolymarketRedeNeural";
import PixAnonimo from "./pages/PixAnonimo";
import MultisigBitcoin from "./pages/MultisigBitcoin";
import NovaLeiContaCorrente from "./pages/NovaLeiContaCorrente";
import ExitIntentLeadMagnet from "./components/ExitIntentLeadMagnet";
import LegacyRedirect from "./components/LegacyRedirect";
import Novilingua from "./pages/Novilingua";
import Propolis from "./pages/Propolis";
import SegundoPassaporte from "./pages/saida/SegundoPassaporte";
import ResidenciaFiscal from "./pages/saida/ResidenciaFiscal";
import JurisdicoesAmigaveis from "./pages/saida/JurisdicoesAmigaveis";
import SementesCrioulas from "./pages/alimentar/SementesCrioulas";
import ConservasFermentadas from "./pages/alimentar/ConservasFermentadas";
import AquaponiaResidencial from "./pages/alimentar/AquaponiaResidencial";
import PreservacaoAncestral from "./pages/alimentar/PreservacaoAncestral";
import EngenhariaVicioAlimentar from "./pages/alimentar/EngenhariaVicioAlimentar";
import GestaoAguaMicro from "./pages/alimentar/GestaoAguaMicro";
import ReceitasFuncionais from "./pages/ReceitasFuncionais";
import SobremesaSubstituiRivotril from "./pages/receitas/SobremesaSubstituiRivotril";
import GelatinaAntiparasitaria from "./pages/receitas/GelatinaAntiparasitaria";
import GarrafadaDigestivaAncestral from "./pages/receitas/GarrafadaDigestivaAncestral";
import ChaPressaoHibisco from "./pages/receitas/ChaPressaoHibisco";
import InfusaoDorInflamacao from "./pages/receitas/InfusaoDorInflamacao";
import SucoRefluxoEspinheiraSanta from "./pages/receitas/SucoRefluxoEspinheiraSanta";
import SeedPhraseAco from "./pages/autocustodia/SeedPhraseAco";
import CoinjoinPrivacidade from "./pages/autocustodia/CoinjoinPrivacidade";
import HerancaBitcoin from "./pages/autocustodia/HerancaBitcoin";
import PrimeirosSocorrosTaticos from "./pages/soberania-organica/PrimeirosSocorrosTaticos";
import EDC from "./pages/soberania-organica/EDC";
import ProtocoloFogo from "./pages/soberania-organica/ProtocoloFogo";
import ConservacaoAlimentos from "./pages/soberania-organica/ConservacaoAlimentos";
import DefesaPessoal from "./pages/soberania-organica/DefesaPessoal";
import DefesaDomiciliar from "./pages/soberania-organica/DefesaDomiciliar";
import HigieneMental from "./pages/soberania-organica/HigieneMental";
import AutonomiaVeicular from "./pages/soberania-organica/AutonomiaVeicular";
import DefesaDigital from "./pages/soberania-organica/DefesaDigital";
import ComunicacaoSegura from "./pages/soberania-organica/ComunicacaoSegura";
import AutonomiaEnergetica from "./pages/soberania-organica/AutonomiaEnergetica";
import RefugioRural from "./pages/soberania-organica/RefugioRural";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CodigoAutonomiaModal />
        <ExitIntentLeadMagnet />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/bitcoin-vs-imovel" element={<BitcoinVsImovel />} />
          <Route path="/taxa-de-fuga" element={<TaxaDeFuga />} />
          <Route path="/economia" element={<Economia />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/filosofia" element={<Filosofia />} />
          <Route path="/saida" element={<Saida />} />
          <Route path="/saida/gateway" element={<Gateway />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/:toolId" element={<Ferramentas />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/entenda-bitcoin" element={<LegacyRedirect to="/bitcoin/o-que-e" />} />
          <Route path="/autocustodia" element={<Autocustodia />} />
          <Route path="/autocustodia/hardware-wallet-diy-bitcoin" element={<HardwareWalletDiy />} />
          <Route path="/autocustodia/seed-phrase-em-aco" element={<SeedPhraseAco />} />
          <Route path="/autocustodia/coinjoin-privacidade" element={<CoinjoinPrivacidade />} />
          <Route path="/autocustodia/heranca-bitcoin" element={<HerancaBitcoin />} />
          <Route path="/autocustodia/krux-passphrase-bluewallet" element={<KruxPassphraseBluewallet />} />
          <Route path="/economia-paralela" element={<EconomiaParalela />} />
          <Route path="/infraestrutura" element={<Infraestrutura />} />
          <Route path="/lightning" element={<LightningPage />} />
          <Route path="/pix-cripto" element={<PixCripto />} />
          <Route path="/audiobooks" element={<Audiobooks />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/silencio-queda" element={<SilencioQueda />} />
          <Route path="/protocolo-inicial" element={<ProtocoloInicial />} />
          <Route path="/recursos-e-ferramentas" element={<Arsenal />} />
          <Route path="/arsenal" element={<LegacyRedirect to="/recursos-e-ferramentas" />} />
          <Route path="/blindagem-golpes" element={<BlindagemGolpes />} />
          <Route path="/proibicao-dinheiro" element={<ProibicaoDinheiro />} />
          <Route path="/alertas" element={<AlertasHub />} />
          <Route path="/alertas/cbdc-brasil" element={<CbdcBrasil />} />
          <Route path="/alertas/fim-do-dinheiro-vivo" element={<ProibicaoDinheiro />} />
          <Route path="/alertas/depix-reporte-2026" element={<DepixReporte />} />
          <Route path="/alertas/protecao-patrimonial-bitcoin" element={<ConfiscoBitcoin />} />
          <Route path="/alertas/governo-tomar-bitcoins" element={<LegacyRedirect to="/alertas/protecao-patrimonial-bitcoin" />} />
          <Route path="/historia-do-dinheiro" element={<HistoriaDoDinheiro />} />
          <Route path="/inflacao-imposto-oculto" element={<InflacaoImpostoOculto />} />
          <Route path="/bitcoin-vs-fiat" element={<BitcoinVsFiat />} />
          <Route path="/teoria-das-bandeiras" element={<TeoriaDasBandeiras />} />
          <Route path="/palau-digital-residency" element={<PalauDigitalResidency />} />
          <Route path="/indice-da-soberania" element={<IndiceDoDesespertar />} />
          <Route path="/indice-do-despertar" element={<LegacyRedirect to="/indice-da-soberania" />} />
          <Route path="/confisco-1990" element={<Confisco1990 />} />
          <Route path="/soberania-financeira" element={<SoberaniaFinanceira />} />
          <Route path="/soberania-financeira/contas-internacionais/neobankless" element={<Neobankless />} />
          <Route path="/neobankless" element={<Navigate to="/soberania-financeira/contas-internacionais/neobankless" replace />} />
          <Route path="/soberania-financeira/contas-internacionais/bank-of-georgia" element={<BankOfGeorgia />} />
          <Route path="/soberania-financeira/contas-internacionais/wise" element={<WisePage />} />
          <Route path="/soberania-financeira/contas-internacionais/payoneer" element={<PayoneerPage />} />
          <Route path="/soberania-financeira/contas-internacionais/grabrfi" element={<GrabrFi />} />
          <Route path="/soberania-financeira/contas-offshore/top-10" element={<ContasOffshore />} />
          <Route path="/soberania-financeira/contas-offshore/abertura-remota" element={<AberturaRemota />} />
          <Route path="/indice-de-soberania-financeira" element={<IndiceSoberaniaFinanceira />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc" element={<ExchangesSemKyc />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" element={<KycNotMe />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" element={<OptimaExchange />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" element={<PegasusSwap />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros" element={<BybitBinanceReportam />} />
          <Route path="/mercado-tradicional/ricos-nao-investem-fiis" element={<RicosNaoInvestemFiis />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/kycnot-me" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/optima-exchange" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/pegasus-swap" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" />} />
          <Route path="/soberania-financeira/brics-pay" element={<BricsPay />} />
          <Route path="/soberania-financeira/kucoin-pay-pix" element={<KucoinPayPix />} />
          <Route path="/soberania-financeira/pix-sem-banco" element={<PixSemBanco />} />
          <Route path="/bitpark-cartao-bitcoin" element={<BitparkCartao />} />
          <Route path="/21-milhoes" element={<HardCap21 />} />
          <Route path="/bitcoin-seguro" element={<BitcoinSeguro />} />
          <Route path="/chaves" element={<ChavesPage />} />
          <Route path="/transacoes" element={<TransacoesBitcoin />} />
          <Route path="/bitcoin/nocoes-basicas" element={<NocoesBitcoin />} />
          <Route path="/bitcoin/o-que-e" element={<OQueEBitcoin />} />
          <Route path="/nocoes-bitcoin" element={<LegacyRedirect to="/bitcoin/nocoes-basicas" />} />
          <Route path="/o-que-e-bitcoin" element={<LegacyRedirect to="/bitcoin/o-que-e" />} />
          <Route path="/mineracao" element={<MineracaoBitcoin />} />
          <Route path="/futuro-bitcoin" element={<FuturoBitcoin />} />
          <Route path="/supply-shock" element={<SupplyShock />} />
          <Route path="/halving-bitcoin" element={<HalvingBitcoin />} />
          <Route path="/volatilidade" element={<VolatilidadeBitcoin />} />
          <Route path="/lastro" element={<LastroBitcoin />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/candlestick" element={<CandlestickPage />} />
          <Route path="/diversificacao" element={<DiversificacaoPage />} />
          <Route path="/bitcoin-vs-altcoins" element={<BitcoinVsAltcoinsPage />} />
          <Route path="/dicionario-cripto" element={<DicionarioCripto />} />
          <Route path="/comprar-bitcoin-com-privacidade" element={<ComprarBitcoinAnonimo />} />
          <Route path="/comprar-bitcoin-anonimo" element={<LegacyRedirect to="/comprar-bitcoin-com-privacidade" />} />
          <Route path="/dolar-virtual" element={<DolarVirtual />} />
          <Route path="/bitcoin/bip-110-guerra-espaco-bloco" element={<Bip110 />} />
          <Route path="/protocolo-bitcoin/bip-110" element={<Navigate to="/bitcoin/bip-110-guerra-espaco-bloco" replace />} />
          <Route path="/bip-110" element={<Navigate to="/bitcoin/bip-110-guerra-espaco-bloco" replace />} />
          <Route path="/mobilidade-de-chaves" element={<MobilidadeDeChaves />} />
          <Route path="/soberania-organica" element={<ProjetoAutonomo />} />
          <Route path="/soberania-organica/armazenamento-longo-prazo" element={<ConservacaoArmazenamento />} />
          <Route path="/soberania-organica/conservacao-armazenamento" element={<LegacyRedirect to="/soberania-organica/armazenamento-longo-prazo" />} />
          <Route path="/soberania-organica/producao-pequenos-espacos" element={<ProducaoPequenosEspacos />} />
          <Route path="/soberania-organica/proteina-sustentavel" element={<ProteinaSustentavel />} />
          <Route path="/soberania-organica/solo-fertilidade" element={<SoloFertilidade />} />
          <Route path="/soberania-organica/horta-urbana" element={<HortaUrbana />} />
          <Route path="/soberania-organica/autonomia-biologica" element={<AutonomiaBiologica />} />
          <Route path="/soberania-organica/planta/:slug" element={<PlantaDetalhe />} />
          <Route path="/soberania-organica/primeiros-socorros" element={<PrimeirosSocorros />} />
          <Route path="/soberania-organica/avaliacao-sinais" element={<AvaliacaoSinais />} />
          <Route path="/soberania-organica/saude-preventiva" element={<SaudePreventiva />} />
          <Route path="/soberania-organica/fitoterapia-aplicada" element={<FitoterapiaAplicada />} />
          <Route path="/soberania-organica/controle-vetores" element={<ControleVetores />} />
          <Route path="/soberania-organica/sabedoria-ancestral" element={<SabedoriaAncestral />} />
          <Route path="/soberania-organica/babosa-acemannan" element={<BabosaAcemannan />} />
          <Route path="/soberania-organica/kit-72h" element={<Kit72h />} />
          <Route path="/soberania-organica/purificacao-agua" element={<PurificacaoAgua />} />
          <Route path="/soberania-organica/protocolos-apagao" element={<ProtocolosApagao />} />
          <Route path="/soberania-organica/abrigo-emergencia" element={<AbrigoEmergencia />} />
          <Route path="/soberania-organica/comunicacao-offline" element={<ComunicacaoOffline />} />
          <Route path="/soberania-organica/navegacao-primaria" element={<NavegacaoPrimaria />} />
          <Route path="/soberania-organica/conhecimento-perdido" element={<ConhecimentoPerdido />} />
          <Route path="/soberania-organica/conhecimento-perdido/rape" element={<RapeDossie />} />
          <Route path="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" element={<ProtocoloQuelantes />} />
          <Route path="/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros" element={<LegacyRedirect to="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" />} />
          <Route path="/soberania-organica/conhecimento-perdido/protocolo-quelantes" element={<LegacyRedirect to="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" />} />
          <Route path="/soberania-organica/plantas-subutilizadas" element={<PlantasSubutilizadas />} />
          <Route path="/soberania-organica/plantas-subutilizadas/jurubeba" element={<Jurubeba />} />
          <Route path="/soberania-organica/plantas-subutilizadas/quebra-pedra" element={<QuebraPedra />} />
          <Route path="/soberania-organica/plantas-subutilizadas/espinheira-santa" element={<EspinheiraSanta />} />
          <Route path="/soberania-organica/plantas-subutilizadas/guaco" element={<Guaco />} />
          <Route path="/soberania-organica/plantas-subutilizadas/tanchagem" element={<Tanchagem />} />
          <Route path="/soberania-organica/plantas-subutilizadas/pariparoba" element={<Pariparoba />} />
          <Route path="/soberania-organica/plantas-subutilizadas/chapeu-de-couro" element={<ChapeuDeCouro />} />
          <Route path="/soberania-organica/plantas-subutilizadas/umburana" element={<Umburana />} />
          <Route path="/soberania-organica/plantas-subutilizadas/artemisia" element={<Artemisia />} />
          <Route path="/soberania-organica/plantas-subutilizadas/aristolochia-alerta" element={<AristolochiaAlerta />} />
          <Route path="/conhecimento-perdido/contexto-historico" element={<CpContextoHistorico />} />
          <Route path="/conhecimento-perdido/base-fisiologica" element={<CpBaseFisiologica />} />
          <Route path="/conhecimento-perdido/seguranca-e-limites" element={<CpSegurancaLimites />} />
          <Route path="/conhecimento-perdido/aplicacao-pratica" element={<CpAplicacaoPratica />} />
          <Route path="/conhecimento-perdido/continuidade-familiar" element={<CpContinuidadeFamiliar />} />
          <Route path="/soberania-organica/toxicos-ocultos" element={<ToxicosOcultos />} />
          <Route path="/soberania-organica/toxicos-ocultos/toxinas-alimentares" element={<ToxinasAlimentares />} />
          <Route path="/soberania-organica/toxicos-ocultos/manipulacao-informacional" element={<ManipulacaoInformacional />} />
          <Route path="/soberania-organica/toxicos-ocultos/dependencia-tecnologica" element={<DependenciaTecnologica />} />
          <Route path="/soberania-organica/toxicos-ocultos/toxinas-ambientais" element={<ToxinasAmbientais />} />
          <Route path="/soberania-organica/oleo-ricino-biohacker" element={<OleoRicinoBiohacker />} />
          <Route path="/soberania-organica/:slug" element={<ModuloAutonomo />} />
          {/* Redirects from old projeto-autonomo URLs */}
          <Route path="/projeto-autonomo" element={<Navigate to="/soberania-organica" replace />} />
          <Route path="/projeto-autonomo/*" element={<Navigate to="/soberania-organica" replace />} />
          <Route path="/mapa-da-soberania" element={<MapaDaSoberania />} />
          <Route path="/por-onde-comecar" element={<PorOndeComecar />} />
          <Route path="/vazamento-dados" element={<VazamentoDados />} />
          <Route path="/polymarket-rede-neural-btc" element={<PolymarketRedeNeural />} />
          <Route path="/pix-privacidade" element={<PixAnonimo />} />
            <Route path="/pix-anonimo" element={<LegacyRedirect to="/pix-privacidade" />} />
            <Route path="/multisig-bitcoin" element={<MultisigBitcoin />} />
            <Route path="/nova-lei-conta-corrente" element={<NovaLeiContaCorrente />} />
            <Route path="/alertas/nova-lei-conta-corrente" element={<NovaLeiContaCorrente />} />
            <Route path="/novilingua" element={<Novilingua />} />
            <Route path="/soberania-organica/propolis" element={<Propolis />} />
            <Route path="/propolis" element={<Propolis />} />
            <Route path="/saida/segundo-passaporte" element={<SegundoPassaporte />} />
            <Route path="/saida/residencia-fiscal" element={<ResidenciaFiscal />} />
            <Route path="/saida/jurisdicoes-amigaveis" element={<JurisdicoesAmigaveis />} />
            <Route path="/soberania-organica/sementes-crioulas" element={<SementesCrioulas />} />
            <Route path="/soberania-organica/conservas-fermentadas" element={<ConservasFermentadas />} />
            <Route path="/soberania-organica/aquaponia-residencial" element={<AquaponiaResidencial />} />
            <Route path="/soberania-organica/preservacao-ancestral" element={<PreservacaoAncestral />} />
            <Route path="/soberania-organica/engenharia-vicio-alimentar" element={<EngenhariaVicioAlimentar />} />
            {/* Cozinha Funcional — 7ª frente da Soberania Orgânica */}
            <Route path="/soberania-organica/cozinha-funcional" element={<ReceitasFuncionais />} />
            <Route path="/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" element={<SobremesaSubstituiRivotril />} />
            <Route path="/soberania-organica/cozinha-funcional/gelatina-antiparasitaria" element={<GelatinaAntiparasitaria />} />
            <Route path="/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral" element={<GarrafadaDigestivaAncestral />} />
            <Route path="/soberania-organica/cozinha-funcional/cha-pressao-hibisco" element={<ChaPressaoHibisco />} />
            <Route path="/soberania-organica/cozinha-funcional/infusao-dor-inflamacao" element={<InfusaoDorInflamacao />} />
            <Route path="/soberania-organica/cozinha-funcional/suco-refluxo-espinheira-santa" element={<SucoRefluxoEspinheiraSanta />} />
            {/* Redirects das URLs antigas (preserva SEO e bookmarks) */}
            <Route path="/receitas-funcionais" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional" />} />
            <Route path="/receitas-funcionais/sobremesa-substitui-rivotril" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" />} />
            <Route path="/receitas-funcionais/gelatina-antiparasitaria" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/gelatina-antiparasitaria" />} />
            <Route path="/receitas-funcionais/garrafada-digestiva-ancestral" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral" />} />
            <Route path="/soberania-organica/gestao-agua-micro" element={<GestaoAguaMicro />} />
            <Route path="/soberania-organica/primeiros-socorros-taticos" element={<PrimeirosSocorrosTaticos />} />
            <Route path="/soberania-organica/edc" element={<EDC />} />
            <Route path="/soberania-organica/protocolo-fogo" element={<ProtocoloFogo />} />
            <Route path="/soberania-organica/conservacao" element={<ConservacaoAlimentos />} />
            <Route path="/soberania-organica/conservacao-alimentos" element={<LegacyRedirect to="/soberania-organica/conservacao" />} />
            <Route path="/soberania-organica/defesa-pessoal" element={<DefesaPessoal />} />
            <Route path="/soberania-organica/defesa-domiciliar" element={<DefesaDomiciliar />} />
            <Route path="/soberania-organica/higiene-mental" element={<HigieneMental />} />
            <Route path="/soberania-organica/autonomia-veicular" element={<AutonomiaVeicular />} />
            <Route path="/soberania-organica/soberania-veicular" element={<Navigate to="/soberania-organica/autonomia-veicular" replace />} />
            <Route path="/soberania-organica/defesa-digital" element={<DefesaDigital />} />
            <Route path="/soberania-organica/comunicacao-segura" element={<ComunicacaoSegura />} />
            <Route path="/soberania-organica/autonomia-energetica" element={<AutonomiaEnergetica />} />
            <Route path="/soberania-organica/refugio-rural" element={<RefugioRural />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
