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
import { Button, ConfigProvider, Modal } from "antd";
import { useState, useEffect } from "react";
import Testimonials from "./testimonials/testimonials";

export default function Catalog() {
  const queryClient = new QueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1 = workspace question, 2 = vivo client question

  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
  useEffect(() => {
    // Modal sempre abre quando o site é carregado
    setIsModalOpen(true);
  }, []);
  const handleIsVivoClientResponse = (isVivoClient: boolean) => {
    sessionStorage.setItem("isVivoClient", isVivoClient.toString());
    // Fecha o modal após responder a pergunta do Vivo
    setIsModalOpen(false);
  };

  const handleWorkspaceResponse = (hasWorkspace: boolean) => {
    sessionStorage.setItem("alreadyHaveWorkspace", hasWorkspace.toString());
    // Vai para a próxima pergunta (Vivo client)
    setModalStep(2);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <SubHeader />
        <Banner />
        <BannerOffers />
        {hasWorkspace === "true" ? <Testimonials /> : <Cards />}

        <InfoAnchor />
        <Privacy />
        <GoogleApps />
        <FAQ />
        <Footer />

        <Modal
          centered
          title=""
          open={isModalOpen}
          footer={null}
          width={700}
          closable={false}
          maskClosable={false}
          keyboard={false}
        >
          <div>
            {modalStep === 1 ? (
              // Primeira pergunta: Já possui workspace?
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1
                      style={{ margin: 0 }}
                      className="text-[24px] text-center text-gray-800"
                    >
                      Clientes Vivo têm acesso a uma oferta especial
                    </h1>

                    <h1
                      style={{ margin: 0 }}
                      className="text-[24px] text-center text-gray-800"
                    >
                      do Google Workspace
                    </h1>
                  </div>

                  <p
                    style={{ margin: 0 }}
                    className="text-[14px] text-center text-gray-600"
                  >
                    Centralize o pagamento, tenha suporte especializado e ainda
                    ganhe +2GB de internet por conta contratada ou migrada para
                    a Vivo.
                  </p>
                </div>

                <div className="flex items-center  justify-center gap-8 my-2">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <img
                      src="/Google_Workspace_Logo.svg.png"
                      className="h-5 md:h-8 hover:cursor-pointer"
                      alt="Workspace Ofertas"
                    />
                    <img
                      src="/Workspace-Icons.svg"
                      className="h-5 md:h-6 hover:cursor-pointer"
                      alt="Workspace Icons"
                    />
                  </div>
                  <div className=" flex items-center justify-center pt-4 ">
                    <img
                      src="/Vivo_oferta_Workspace.png"
                      className="h-5 md:h-26 hover:cursor-pointer "
                      alt="Workspace Ofertas"
                    />
                  </div>
                </div>

                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-[24px] text-center text-gray-800"
                  >
                    Você já possui conta Google Workspace?
                  </p>
                  <div className="flex gap-4 items-center justify-center my-4">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#660099",
                          colorText: "#660099",
                          colorBorder: "#660099",
                          fontSize: 18,
                        },
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        className=" cursor-pointer w-44"
                        onClick={() => handleWorkspaceResponse(true)}
                      >
                        Sim
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        className=" cursor-pointer  w-44"
                        onClick={() => handleWorkspaceResponse(false)}
                      >
                        Não
                      </Button>
                    </ConfigProvider>
                  </div>
                </div>
              </>
            ) : (
              // Segunda pergunta: É cliente Vivo?
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1
                      style={{ margin: 0 }}
                      className="text-[24px] text-center text-gray-800"
                    >
                      É cliente Vivo?
                    </h1>
                  </div>

                  <p
                    style={{ margin: 0 }}
                    className="text-[14px] text-center text-gray-600"
                  >
                    Clientes Vivo têm benefícios especiais e ganham +2GB de
                    internet por conta contratada.
                  </p>
                </div>

                <div className="flex gap-4 items-center justify-center my-4">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#660099",
                        colorText: "#660099",
                        colorBorder: "#660099",
                        fontSize: 18,
                      },
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      className=" cursor-pointer w-44"
                      onClick={() => handleIsVivoClientResponse(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      className=" cursor-pointer  w-44"
                      onClick={() => handleIsVivoClientResponse(false)}
                    >
                      Não
                    </Button>
                  </ConfigProvider>
                </div>
              </>
            )}
          </div>
        </Modal>
      </QueryClientProvider>
    </>
  );
}
