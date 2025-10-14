import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Banner from "./banner/banner";
import Cards from "./cards/cards";
import InfoAnchor from "./infoAnchor/infoAnchor";
import Privacy from "./privacy/privacy";
import FAQ from "./faq/faq";
import GoogleApps from "./googleApps/googleApps";
import Header from "../header/header";
import SubHeader from "../subHeader/subHeader";
import Footer from "../footer/footer";

export default function Catalog() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <SubHeader />
        <Banner />
        <Cards />
        <InfoAnchor />
        <Privacy />
        <GoogleApps />
        <FAQ />
        <Footer />
      </QueryClientProvider>
    </>
  );
}
