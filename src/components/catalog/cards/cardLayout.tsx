import { Button, ConfigProvider, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useOrderStore } from "../../../context/context";
import { useNavigate } from "react-router-dom";

export default function CardLayout({ cardData }: any) {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  // Cada card tem seu próprio estado de pricing
  const [selectedPricingType, setSelectedPricingType] =
    useState<string>("monthly");

  const toggleDetails = (cardType: string) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };
  const { setSelectedPlan, confirmedPlans, setConfirmedPlans } =
    useOrderStore();

  const handlePlanSelection = (cardData: any) => {
    // Define a modalidade baseada na seleção do usuário
    const modalidade = selectedPricingType === "monthly" ? "mensal" : "anual";

    // Define o preço baseado na modalidade selecionada
    const price =
      selectedPricingType === "monthly" ? cardData?.price : cardData?.priceYear;

    console.log("=== DEBUG PLAN SELECTION ===");
    console.log("Card clicado:", cardData?.title);
    console.log("Modalidade selecionada:", selectedPricingType);
    console.log("Modalidade convertida:", modalidade);
    console.log("Preço mensal (cardData.price):", cardData?.price);
    console.log("Preço anual (cardData.priceYear):", cardData?.priceYear);
    console.log("Preço final selecionado:", price);

    // Cria o novo plano
    const newPlan = {
      id: Date.now().toString(),
      planName: cardData?.title,
      price: price,
      users: 1, // Padrão de 1 usuário
      modalidade: modalidade,
    };

    console.log("Plano criado:", newPlan);
    console.log("Planos confirmados antes:", confirmedPlans);

    // Adiciona o plano aos planos confirmados
    setConfirmedPlans([...confirmedPlans, newPlan]);

    console.log("=== FIM DEBUG ===");

    // Também define como plano selecionado (para compatibilidade)
    setSelectedPlan({
      planName: cardData?.title,
      price: cardData?.price,
      priceYear: cardData?.priceYear,
      servicesIncluded: [],
    });

    navigate("/choose-plan");
    window.scrollTo(0, 0);
  };
  console.log(cardData);
  return (
    <>
      <div className="flex flex-col w-full items-center relative">
        {cardData?.badge && (
          <div
            className={`${cardData?.badgeStyle} absolute self-start rounded-r-sm rounded-tl-sm -top-2 z-10`}
          >
            {cardData?.badge}
          </div>
        )}
        <div className="flex w-full max-w-[260px] flex-col border border-gray-300 rounded-sm bg-white shadow-sm">
          <div className=" flex flex-col gap-2">
            <div className="text-start pt-6 px-4">
              <p style={{ margin: 0 }} className=" text-[16px] ">
                Business
              </p>
              <h3 className="text-[32px]  ">{cardData?.title}</h3>
            </div>
            <div className="px-4">
              <div className="flex  gap-1 ">
                <img src="/icone-google (16).svg" className="w-4 h-6 " />
                <p className="text-gray-700 text-sm text-start">
                  {cardData?.storage}
                </p>
              </div>
              <div className="flex gap-1 ">
                <img src="/icone-google (16).svg" className="w-4 h-6" />
                <p className="text-gray-700 text-sm">Gemini Incluso</p>
                <p> </p>
              </div>
            </div>

            <div className=" mx-4 mb-4 flex flex-col items-start bg-[#f0f0f0] p-4 px-2 rounded text-[14px]">
              <p style={{ margin: 0 }} className=" text-[12px] ">
                Apps
              </p>

              <div className="flex items-center gap-2 ">
                <p style={{ margin: 0 }} className=" text-[12px]">
                  disponíveis
                </p>
                <img src="/icone-gmail.svg" className="w-4 h-6" alt="Gmail" />
                <img src="/icone-drive.svg" className="w-4 h-6" alt="Drive" />
                <img src="/icone-calendar.svg" className="w-4 h-6" alt="Meet" />
                <img src="/icone-meet.svg" className="w-4 h-6" alt="Calendar" />
                <img src="/icone-chat2.svg" className="w-4 h-6" alt="Docs" />
              </div>
            </div>

            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#660099",
                },
              }}
            >
              <div className="px-4 flex text-start flex-col gap-2">
                <Radio.Group
                  value={selectedPricingType}
                  onChange={(e: RadioChangeEvent) =>
                    setSelectedPricingType(e.target.value)
                  }
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-start">
                    <Radio
                      value="monthly"
                      style={{
                        color: "#660099",
                      }}
                    />
                    <div className="flex flex-col">
                      <p
                        style={{ margin: 0 }}
                        className="text-gray-900 text-[20px]"
                      >
                        R$ {cardData?.price}{" "}
                        <span className="text-[20px] text-gray-600">/mês*</span>
                      </p>
                      <p className="text-gray-600 text-[12px]">
                        por usuário no plano mensal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Radio
                      value="yearly"
                      style={{
                        color: "#660099",
                      }}
                    />
                    <div className="flex flex-col">
                      <p
                        style={{ margin: 0 }}
                        className="text-gray-900 text-[20px]"
                      >
                        R$ {cardData?.priceYear}{" "}
                        <span className="text-[20px] text-gray-600">/mês*</span>
                      </p>
                      <p className="text-gray-600 text-[12px]">
                        por usuário no plano anual
                      </p>
                    </div>
                  </div>
                </Radio.Group>
              </div>
            </ConfigProvider>

            <Button
              className="self-center mb-4 mx-6 w-56"
              style={{ width: "140px", height: "50px" }}
              variant="solid"
              size="large"
              color="magenta"
              onClick={() => handlePlanSelection(cardData)}
            >
              Contratar
            </Button>
            <ConfigProvider
              theme={{
                token: {
                  colorBgTextHover: "none",
                  colorBgTextActive: "none",
                  colorText: "#666666",
                  fontSize: 10,
                },
              }}
            >
              <Button
                type="text"
                size="small"
                className=" cursor-pointer "
                onClick={() => toggleDetails(cardData?.id)}
              >
                {expandedCard === cardData?.id ? (
                  <>
                    Menos Detalhes <ChevronUp className="inline w-3 h-3" />
                  </>
                ) : (
                  <>
                    Mais Detalhes <ChevronDown className="inline w-3 h-3" />
                  </>
                )}
              </Button>
            </ConfigProvider>
            {expandedCard === cardData?.id && (
              <div className=" p-4 text-start bg-[#f0f0f0]  rounded-sm border-t">
                <div className="flex items-start flex-col gap-3 text-sm text-gray-700">
                  {cardData?.details?.map(
                    (
                      detail: { title: string; subtitle?: string },
                      index: number
                    ) => (
                      <div key={index}>
                        <p style={{ margin: 0 }} className="font-medium  mb-1">
                          {detail?.title}
                        </p>
                        {detail?.subtitle && (
                          <p style={{ margin: 0 }} className="text-gray-500">
                            {detail?.subtitle}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
