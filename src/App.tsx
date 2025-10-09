import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import GetStartInfo from "./components/order/getStartInfo";
import CompanyInfo from "./components/order/companyInfo";
import FinishOrderInfo from "./components/order/finishOrderInfo";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="text-[#5f6368] bg-[#f7f7f7]">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/choose-plan" element={<GetStartInfo />} />

          <Route path="/client-information" element={<CompanyInfo />} />

          <Route path="/order" element={<FinishOrderInfo />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
