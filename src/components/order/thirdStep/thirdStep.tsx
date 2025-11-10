import { Check } from "lucide-react";
import OrderResumeMobile from "../components/orderResumeMobile";
import Header from "../components/header";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import { useOrderStore } from "../../../context/context";
import { useState } from "react";
import { Button, Checkbox, ConfigProvider } from "antd";
import { PhoneInput } from "../../../utils/input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useOrderControler,
  useOrderById,
} from "../../../controller/controller";

export default function ThirdStep() {
  const { thirdStepData, updateThirdStepData, confirmedPlans, clearOrder } =
    useOrderStore();
  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const buyers_phone = thirdStepData.buyers_phone || "";
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
      buyers_phone: buyers_phone || undefined,
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
      clearOrder();
      navigate(`/order/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };
  // Pre-fill with phone from order if available, fallback to store
  const managerPhone =
    orderData?.data?.managerPhone ||
    orderData?.data?.manager_phone ||
    thirdStepData.managerPhone ||
    "";

  return (
    <>
      <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
        <Header />
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

          <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
            <div className="mb-10">
              <div
                className="flex items-center justify-center gap-2 w-full max-w-[520px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto"
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

              {/* Confirmação via SMS */}
              <div className="flex flex-col gap-2 mb-4 mt-4">
                <h1
                  style={{ margin: 0 }}
                  className="text-[18px] font-normal text-neutral-800 "
                >
                  Confirmação via SMS
                </h1>
                <p style={{ margin: 0 }} className="text-[14px]">
                  <strong className="text-red-500">IMPORTANTE:</strong> O SMS
                  para realização da biometria será enviado ao número informado
                  abaixo
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  {" "}
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
                </div>
                <div className="">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Segundo número de contato (Opcional)
                  </label>
                  <PhoneInput
                    format="(##) #####-####"
                    value={buyers_phone}
                    onValueChange={(values) =>
                      updateThirdStepData({ buyers_phone: values.value })
                    }
                    placeholder="Digite o segundo número de contato"
                  />
                  <span className="text-[11px] text-gray-500">
                    Se desejar, adicione um segundo número de contato para
                    garantir o recebimento da mensagem.
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 mb-20 md:mb-10">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#660099",
                    },
                  }}
                >
                  <div className="flex items-start justify-start  self-start gap-3">
                    <Checkbox
                      checked={acceptContact}
                      onChange={(e) =>
                        updateThirdStepData({ acceptContact: e.target.checked })
                      }
                    />
                    <p
                      style={{ margin: 0 }}
                      className="text-[14px] text-gray-500"
                    >
                      Autorizo ser contatado pelo telefone e e-mail preenchidos,
                      para receber informações sobre o meu pedido.
                    </p>
                  </div>
                  <div className="flex items-start justify-start self-start gap-1">
                    <Checkbox
                      checked={acceptTerms}
                      onChange={(e) =>
                        updateThirdStepData({ acceptTerms: e.target.checked })
                      }
                    />
                    <p
                      style={{ margin: 0 }}
                      className="text-[14px] text-gray-500"
                    >
                      <span className="text-red-500">*</span> Aceito e concordo
                      com os termos e contratos.
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
              confirmedPlans={plans}
              getTotalPrice={getTotalPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
}
