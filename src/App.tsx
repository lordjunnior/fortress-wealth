import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BitcoinVsImovel from "./pages/BitcoinVsImovel";
import TaxaDeFuga from "./pages/TaxaDeFuga";
import Economia from "./pages/Economia";
import Bitcoin from "./pages/Bitcoin";
import Filosofia from "./pages/Filosofia";
import Saida from "./pages/Saida";
import Ferramentas from "./pages/Ferramentas";
import Educacao from "./pages/Educacao";
import EntendaBitcoin from "./pages/EntendaBitcoin";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bitcoin-vs-imovel" element={<BitcoinVsImovel />} />
          <Route path="/taxa-de-fuga" element={<TaxaDeFuga />} />
          <Route path="/economia" element={<Economia />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/filosofia" element={<Filosofia />} />
          <Route path="/saida" element={<Saida />} />
          <Route path="/saida/gateway" element={<Gateway />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/entenda-bitcoin" element={<EntendaBitcoin />} />
          <Route path="/autocustodia" element={<Autocustodia />} />
          <Route path="/economia-paralela" element={<EconomiaParalela />} />
          <Route path="/infraestrutura" element={<Infraestrutura />} />
          <Route path="/lightning" element={<LightningPage />} />
          <Route path="/pix-cripto" element={<PixCripto />} />
          <Route path="/audiobooks" element={<Audiobooks />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/silencio-queda" element={<SilencioQueda />} />
          <Route path="/protocolo-inicial" element={<ProtocoloInicial />} />
          <Route path="/arsenal" element={<Arsenal />} />
          <Route path="/blindagem-golpes" element={<BlindagemGolpes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
