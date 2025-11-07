import { Check } from "lucide-react";
import OrderResumeMobile from "../components/orderResumeMobile";
import Header from "../components/header";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import { useOrderStore } from "../../../context/context";
import { useState } from "react";
import { Button, Checkbox, ConfigProvider } from "antd";
import { PhoneInput } from "../../../utils/input";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderControler } from "../../../controller/controller";

export default function ThirdStep() {
  const { thirdStepData, updateThirdStepData, confirmedPlans, clearOrder } =
    useOrderStore();

  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const managerPhone = thirdStepData.managerPhone || "";
  const secondaryPhone = thirdStepData.secondaryPhone || "";
  const acceptContact = thirdStepData.acceptContact || false;
  const acceptTerms = thirdStepData.acceptTerms || false;

  const { orderId } = useParams<{ orderId: string }>();
  const { updateOrder, changeOrderStatus, isUpdateOrderFetching } =
    useOrderControler();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    const confirmedPlansTotal = confirmedPlans.reduce((total, plan) => {
      const numericPrice = parseFloat(plan.price.replace(",", "."));
      return total + numericPrice * plan.users;
    }, 0);
    return confirmedPlansTotal.toFixed(2).replace(".", ",");
  };

  const getTotalUsers = () => {
    return confirmedPlans.reduce((total, plan) => total + plan.users, 0);
  };

  const isFormValid = () => {
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasAcceptedContact = acceptContact === true;
    const hasAcceptedTerms = acceptTerms === true;
    return hasValidManagerPhone && hasAcceptedContact && hasAcceptedTerms;
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);

    if (!isFormValid()) {
      return;
    }

    const updateData = {
      managerPhone,
      secondaryPhone: secondaryPhone || undefined,
      acceptContact,
      acceptTerms,
    };

    console.log("Dados enviados no ThirdStep:", updateData);

    try {
      await updateOrder({
        id: Number(orderId),
        data: updateData,
      });

      // Muda o status do pedido para "fechado"
      await changeOrderStatus({
        id: Number(orderId),
        data: { status: "fechado" },
      });

      clearOrder();
      navigate(`/order/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
        <Header />
        <div className="flex flex-col md:flex-row min-h-[100vh] overflow-y-auto scrollbar-thin">
          {/* mobile */}
          <div className="md:hidden flex ">
            <OrderResumeMobile
              confirmedPlans={confirmedPlans}
              getTotalUsers={getTotalUsers}
              getTotalPrice={getTotalPrice}
              setShowServices={setShowServices}
              showServices={showServices}
            />
          </div>

          <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
            <div>
              <div className="flex flex-col gap-4 lg:flex-row items-center justify-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                      <Check />
                    </div>
                    <span className="text-[16px] text-[#660099] font-medium">
                      Planos
                    </span>
                  </div>

                  <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>

                  <>
                    <div className="flex flex-col gap-1 items-center">
                      <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                        <Check />
                      </div>
                      <span className="text-[16px] text-[#660099]">Dados</span>
                    </div>
                    <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>
                  </>

                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                      3
                    </div>
                    <span className="text-[16px] text-[#660099]">
                      Verificação
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirmação via SMS */}
              <div className="flex flex-col gap-1 mb-4">
                <h1
                  style={{ margin: 0 }}
                  className="text-[18px] font-normal text-neutral-800 "
                >
                  Confirmação via SMS
                </h1>
                <p style={{ margin: 0 }} className="text-[12px]">
                  <strong className="text-red-500">IMPORTANTE:</strong> O SMS
                  para realização da biometria será enviado ao número informado
                  abaixo
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-[13px] text-gray-700 mb-1">
                  Telefone Principal <span className="text-red-500">*</span>
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

                <label className="block text-[13px] text-gray-700 mb-1 mt-4">
                  Segundo número de contato (Opcional)
                </label>
                <PhoneInput
                  format="(##) #####-####"
                  value={secondaryPhone}
                  onValueChange={(values) =>
                    updateThirdStepData({ secondaryPhone: values.value })
                  }
                  placeholder="Digite o segundo número de contato"
                />
              </div>

              <div className="flex flex-col gap-3 mb-20 md:mb-10">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#660099",
                    },
                  }}
                >
                  <Checkbox
                    checked={acceptContact}
                    onChange={(e) =>
                      updateThirdStepData({ acceptContact: e.target.checked })
                    }
                  >
                    <span className="text-red-500">*</span> Autorizo ser
                    contatado pelo telefone e e-mail preenchidos, para receber
                    informações sobre o meu pedido.
                  </Checkbox>
                  {hasTriedSubmit && !acceptContact && (
                    <p className="text-red-500 text-xs mt-1">
                      Você deve autorizar o contato para continuar
                    </p>
                  )}

                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) =>
                      updateThirdStepData({ acceptTerms: e.target.checked })
                    }
                  >
                    <span className="text-red-500">*</span> Aceito e concordo
                    com os termos e contratos.
                  </Checkbox>
                  {hasTriedSubmit && !acceptTerms && (
                    <p className="text-red-500 text-xs mt-1">
                      Você deve aceitar os termos para continuar
                    </p>
                  )}
                </ConfigProvider>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 md:right-86 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
              <div className="flex justify-end max-w-7xl mx-auto">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#22c55e",
                    },
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    loading={isUpdateOrderFetching}
                    disabled={isUpdateOrderFetching}
                    className="self-end"
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
              confirmedPlans={confirmedPlans}
              getTotalPrice={getTotalPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
}
