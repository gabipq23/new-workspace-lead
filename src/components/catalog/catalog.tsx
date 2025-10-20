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
import BannerOffers from "./bannerOffers/bannerOffers";
import { Modal } from "antd";

export default function Catalog() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <SubHeader />
        <Banner />
        <BannerOffers />
        <Cards />
        <InfoAnchor />
        <Privacy />
        <GoogleApps />
        <FAQ />
        <Footer />

        <Modal>
          <div>Modal Content</div>
        </Modal>
      </QueryClientProvider>
    </>
  );
}
