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
import Gateway from "./pages/Gateway";
import PixCripto from "./pages/PixCripto";
import NotFound from "./pages/NotFound";

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
          <Route path="/pix-cripto" element={<PixCripto />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
