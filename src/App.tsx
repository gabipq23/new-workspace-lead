import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import CompanyInfo from "./components/order/secondStep/companyInfo";
import FirstStep from "./components/order/firstStep/firstStep";
import FinishOrderInfo from "./components/order/finishOrder/finishOrderInfo";
import ThirdStep from "./components/order/thirdStep/thirdStep";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="text-[#5f6368] bg-[#f7f7f7]">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/choose-plan" element={<FirstStep />} />
          <Route
            path="/client-information/:orderId"
            element={<CompanyInfo />}
          />
          <Route path="/verify-information/:orderId" element={<ThirdStep />} />
          <Route path="/order/:id" element={<FinishOrderInfo />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
