import { Check } from "lucide-react";
import OrderResumeMobile from "../components/orderResumeMobile";
import Header from "../components/header";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import { useOrderStore } from "../../../context/context";
import { useState } from "react";
import { Button, Checkbox, ConfigProvider, Modal } from "antd";
import { PhoneInput } from "../../../utils/input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useOrderControler,
  useOrderById,
} from "../../../controller/controller";

export default function ThirdStep() {
  const { thirdStepData, updateThirdStepData, confirmedPlans } =
    useOrderStore();
  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const second_manager_phone = thirdStepData.second_manager_phone || "";
  const acceptContact = thirdStepData.acceptContact || false;
  const acceptTerms = thirdStepData.acceptTerms || false;

  const { orderId } = useParams<{ orderId: string }>();
  const { updateOrder, changeOrderStatus, isUpdateOrderFetching } =
    useOrderControler();
  const { data: orderData } = useOrderById(Number(orderId));
  const navigate = useNavigate();

  const plans =
    orderData?.data?.plans || orderData?.data?.plan || confirmedPlans || [];

  const getTotalPrice = () => {
    const total = plans.reduce((sum: number, plan: any) => {
      const numericPrice = parseFloat(plan.price.replace(",", "."));
      return sum + numericPrice * (plan.users ?? 0);
    }, 0);
    return total.toFixed(2).replace(".", ",");
  };

  const getTotalUsers = () => {
    return plans.reduce((sum: number, plan: any) => sum + (plan.users ?? 0), 0);
  };

  const isFormValid = () => {
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;

    const hasAcceptedTerms = acceptTerms === true;

    return hasValidManagerPhone && hasAcceptedTerms;
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }
    const updateData = {
      managerPhone,
      second_manager_phone,
      acceptContact,
      acceptTerms,
    };

    try {
      await updateOrder({
        id: Number(orderId),
        data: updateData,
      });
      await changeOrderStatus({
        id: Number(orderId),
        data: { status: "fechado" },
      });
      sessionStorage.setItem("status", "fechado");
      sessionStorage.setItem("id", orderId || "");

      // clearOrder();
      navigate(`/order/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  const managerPhone =
    orderData?.data?.managerPhone ||
    orderData?.data?.manager_phone ||
    thirdStepData.managerPhone ||
    "";

  return (
    <>
      <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
        <Header />

        {orderData?.data.status === "fechado" ? (
          <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
            <div className="flex flex-col items-center gap-4 min-h-[60vh] justify-center overflow-y-auto scrollbar-thin">
              <span>Seu pedido já foi finalizado!</span>

              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: "#660099",
                        colorPrimaryHover: "#883fa2",
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    variant="solid"
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      navigate(`/order/${orderData?.data.id}`);
                    }}
                  >
                    Resumo do pedido
                  </Button>{" "}
                </ConfigProvider>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row min-h-[100vh] overflow-y-auto scrollbar-thin">
              {/* mobile */}
              <div className="md:hidden flex ">
                <OrderResumeMobile
                  confirmedPlans={plans}
                  getTotalUsers={getTotalUsers}
                  getTotalPrice={getTotalPrice}
                  setShowServices={setShowServices}
                  showServices={showServices}
                />
              </div>

              <div className="flex flex-col flex-1 px-8 pt-6 pb-4 justify-between bg-[#f7f7f7] ">
                <div className="mb-12">
                  <div
                    className="flex items-center mb-2 justify-center gap-2 w-full max-w-[520px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto"
                    style={{ minWidth: 0 }}
                  >
                    <div className="flex flex-col gap-1 items-center min-w-0">
                      <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                        <Check />
                      </div>
                      <span className="text-[16px] text-[#660099] font-medium">
                        Planos
                      </span>
                    </div>

                    <div className="h-px bg-[#660099] mt-[-12px] flex-1 max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"></div>

                    <div className="flex flex-col gap-1 items-center min-w-0">
                      <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                        <Check />
                      </div>
                      <span className="text-[16px] text-[#660099]">Dados</span>
                    </div>
                    <div className="h-px bg-[#660099] mt-[-12px] flex-1 max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"></div>

                    <div className="flex flex-col gap-1 items-center min-w-0">
                      <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                        3
                      </div>
                      <span className="text-[16px] text-[#660099]">
                        Verificação
                      </span>
                    </div>
                  </div>

                  <div className="bg-white pl-6  p-3 rounded-2xl">
                    {/* Confirmação via SMS */}
                    <div className="flex flex-col mb-4 mt-4">
                      <h1 className="text-[20px] font-normal text-[#660099]">
                        Confirmação via SMS
                      </h1>
                      <p style={{ margin: 0 }} className="text-[14px]">
                        <strong className="text-red-500">IMPORTANTE:</strong> O
                        SMS para realização da biometria será enviado ao número
                        informado abaixo
                      </p>
                    </div>

                    <div className="flex  gap-4 flex-wrap">
                      <div className="min-w-[140px] max-w-[180px] ">
                        {" "}
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Telefone Principal{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                          format="(##) #####-####"
                          value={managerPhone}
                          onValueChange={(values) =>
                            updateThirdStepData({ managerPhone: values.value })
                          }
                          placeholder="Digite o telefone principal"
                        />
                        {hasTriedSubmit &&
                          managerPhone.replace(/\D/g, "").length !== 11 && (
                            <p className="text-red-500 text-xs mt-1">
                              Campo obrigatório
                            </p>
                          )}
                      </div>
                      <div className="min-w-[260px] max-w-[260px]  w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Segundo número de contato (Opcional)
                        </label>
                        <PhoneInput
                          name="second_manager_phone"
                          autoComplete="on"
                          format="(##) #####-####"
                          value={second_manager_phone}
                          onValueChange={(values) =>
                            updateThirdStepData({
                              second_manager_phone: values.value,
                            })
                          }
                          placeholder="Digite o segundo número de contato"
                        />
                        <p
                          style={{ margin: 0, marginTop: 8 }}
                          className="text-[11px] text-gray-500"
                        >
                          Se desejar, adicione um segundo número de contato para
                          garantir o recebimento da mensagem.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 mb-20 md:mb-10 mt-4">
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#660099",
                          },
                        }}
                      >
                        <div className="flex items-start justify-start  self-start gap-2">
                          <Checkbox
                            checked={acceptContact}
                            onChange={(e) =>
                              updateThirdStepData({
                                acceptContact: e.target.checked,
                              })
                            }
                          />
                          <p
                            style={{ margin: 0 }}
                            className="text-[14px] text-gray-500"
                          >
                            Autorizo ser contatado pelo telefone e e-mail
                            preenchidos, para receber informações sobre o meu
                            pedido.
                          </p>
                        </div>
                        <div className="flex items-start justify-start self-start gap-0.5">
                          <Checkbox
                            checked={acceptTerms}
                            onChange={(e) =>
                              updateThirdStepData({
                                acceptTerms: e.target.checked,
                              })
                            }
                          />
                          <p
                            style={{ margin: 0 }}
                            className="text-[14px] text-gray-500"
                          >
                            <span className="text-red-500">*</span> Aceito e
                            concordo com os{" "}
                            <button
                              style={{ color: "#660099" }}
                              className="underline  cursor-pointer"
                              onClick={() => setIsModalOpen(true)}
                            >
                              termos e contratos
                            </button>
                            .
                          </p>
                          {hasTriedSubmit && !acceptTerms && (
                            <p className="text-red-500 text-xs mt-1">
                              Você deve aceitar os termos para continuar
                            </p>
                          )}
                        </div>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0  bg-white border-t border-gray-200 p-4 pr-8 shadow-lg z-50">
                  <div className="flex justify-center lg:justify-end   lg:mx-auto">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#22c55e",
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          borderRadius: 20,

                          height: 44,
                          fontSize: "20px",
                        }}
                        size="large"
                        onClick={handleSubmit}
                        loading={isUpdateOrderFetching}
                        disabled={isUpdateOrderFetching}
                        className="self-end w-full md:max-w-[600px] lg:max-w-[200px]"
                      >
                        {isUpdateOrderFetching
                          ? "Finalizando..."
                          : "Finalizar pedido"}
                      </Button>
                    </ConfigProvider>
                  </div>
                </div>
              </div>

              {/* desktop */}
              <div className="hidden md:flex">
                <OrderResumeDesktop
                  confirmedPlans={plans}
                  getTotalPrice={getTotalPrice}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          footer={null}
          title="Termos e Contratos"
          centered
          width={560}
        >
          <div className="text-center flex flex-col gap-4">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            {/* <div className="flex justify-center gap-6">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#660099",
                    colorText: "#660099",
                    colorBorder: "#660099",
                    fontSize: 14,
                    colorPrimaryHover: "#9933cc",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                 Aceito
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="self-end"
                >
                  Não
                </Button>
              </ConfigProvider>
            </div> */}
          </div>
        </Modal>
      )}
    </>
  );
}
