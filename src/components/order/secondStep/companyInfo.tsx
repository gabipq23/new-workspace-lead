import { useState, useEffect } from "react";
import { Button, Input, Checkbox, Radio, ConfigProvider, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Check, CircleAlert } from "lucide-react";
import { useOrderStore } from "../../../context/context";
import { useOrderControler } from "../../../controller/controller";
import OrderResumeMobile from "../components/orderResumeMobile";
import OrderResumeDesktop from "../components/orderResumeDesktop";

export default function CompanyInfo() {
  const { companyInfo, updateCompanyInfo, confirmedPlans, clearOrder } =
    useOrderStore();

  const [domainName, setDomainName] = useState(companyInfo.domainName || "");
  const [hasWorkspace, setHasWorkspace] = useState(
    companyInfo.alreadyHaveWorkspace || false
  );
  const [acceptTerms, setAcceptTerms] = useState(
    companyInfo.acceptTerms || false
  );
  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  useEffect(() => {
    const savedWorkspaceValue = sessionStorage.getItem("alreadyHaveWorkspace");
    if (savedWorkspaceValue !== null) {
      const boolValue = savedWorkspaceValue === "true";
      setHasWorkspace(boolValue);
    }
  }, []);

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

  const { orderId } = useParams<{ orderId: string }>();
  const { updateOrder, isUpdateOrderFetching, changeOrderStatus } =
    useOrderControler();

  const navigate = useNavigate();

  const isFormValid = () => {
    const hasAcceptedTerms = acceptTerms === true;
    const hasDomainName = domainName.trim() !== "";

    return hasAcceptedTerms && hasDomainName;
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }

    updateCompanyInfo({
      domainName: domainName,
      alreadyHaveWorkspace: hasWorkspace,
      acceptTerms: acceptTerms,
    });

    const updateData = {
      domainName: domainName,
      alreadyHaveWorkspace: hasWorkspace,
      acceptTerms: acceptTerms,
    };

    try {
      await updateOrder({
        id: Number(orderId),
        data: updateData,
      });

      changeOrderStatus({
        id: Number(orderId),
        data: { status: "fechado" },
      });

      clearOrder();

      navigate(`/order/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] ">
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
          <div className="flex flex-col gap-4 lg:flex-row items-center justify-between mb-8">
            <img src="/Vivo-Empresas.png" alt="Vivo Empresas" className="h-7" />

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
                  <Check size={16} />
                </div>
                <span className="text-[12px] text-[#660099] font-medium">
                  Produto
                </span>
              </div>
              <div className="w-8 h-px bg-[#660099] mt-[-12px]"></div>

              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[12px] font-semibold">
                  2
                </div>
                <span className="text-[12px] text-[#660099]">Dados</span>
              </div>
              <div className="w-8 h-px bg-gray-300 mt-[-12px]"></div>

              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-gray-400 text-gray-500 rounded-full flex items-center justify-center text-[12px] font-semibold">
                  3
                </div>
                <span className="text-[12px] text-gray-400">Confirmação</span>
              </div>
            </div>
          </div>

          <h1 className="text-[18px] font-normal text-[#660099] ">
            Agora, informe os dados abaixo:
          </h1>

          <div className="mb-8 text-[12px]">
            <h3 className="text-[14px] text-gray-800 mb-4">
              Você possui G-Suite ou Workspace?
            </h3>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f97316",
                },
              }}
            >
              <Radio.Group
                value={hasWorkspace}
                onChange={(e) => setHasWorkspace(e.target.value)}
                className="flex gap-6 text-[14px]"
              >
                <Radio
                  onClick={() => setHasWorkspace(false)}
                  value={false}
                  className="text-gray-700 text-[12px]"
                >
                  Não
                </Radio>
                <Radio
                  onClick={() => setHasWorkspace(true)}
                  value={true}
                  className="text-gray-700 text-[12px]"
                >
                  Sim
                </Radio>
              </Radio.Group>
            </ConfigProvider>
          </div>
          {/* {!hasWorkspace ? (
            <>
              <div className="bg-orange-100 border border-orange-100 rounded-lg p-2 mb-8 flex items-center">
                <span className="text-orange-600 text-[12px] ">
                  Inclua abaixo 2 sugestões de nome para identificação do seu
                  domínio Google Workspace. Nós iremos avaliar a disponibilidade
                  de uso.
                </span>
              </div>
              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label className="flex items-center gap-1  text-[12px] text-gray-600 mb-2">
                    Sugestão 1 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={domainSuggestion1}
                    onChange={(e) => setDomainSuggestion1(e.target.value)}
                    size="middle"
                    placeholder="dominio@gmail.com"
                  />
                  {hasTriedSubmit &&
                    !hasWorkspace &&
                    domainSuggestion1.trim() === "" && (
                      <p className="text-red-500 text-xs mt-1">
                        Campo obrigatório
                      </p>
                    )}
                </div>
                <div className="w-full">
                  <label className="flex items-center gap-1  text-[12px] text-gray-600 mb-2">
                    Sugestão 2 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={domainSuggestion2}
                    onChange={(e) => setDomainSuggestion2(e.target.value)}
                    size="middle"
                    placeholder="dominio@gmail.com"
                  />
                  {hasTriedSubmit &&
                    !hasWorkspace &&
                    domainSuggestion2.trim() === "" && (
                      <p className="text-red-500 text-xs mt-1">
                        Campo obrigatório
                      </p>
                    )}
                </div>
              </div>
            </>
          ) : ( */}
          <>
            <div className="">
              <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                Qual é o nome do domínio da sua empresa?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-start mb-4 gap-2 ">
                <p className="text-[11px]" style={{ margin: 0 }}>
                  Você usará para configurar endereços de e-mail, como
                  info@example.com
                </p>
                <Tooltip title="Um domínio é o que aparece depois de 'www'. Você o usuará para configurar endereços de e-mail, como info@example.com. Ajudaremos você a confirmar que o domínio pertence à empresa mais tarde.">
                  <span className="text-gray-500 cursor-pointer">
                    <CircleAlert size={14} />
                  </span>
                </Tooltip>
              </div>

              <Input
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                size="middle"
                placeholder="dominio@gmail.com"
                className="max-w-[300px]"
              />
              {hasTriedSubmit && domainName.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
              )}
            </div>
          </>

          <div className="mb-8 mt-4">
            <div className="mb-8">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#f97316",
                  },
                }}
              >
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="text-gray-600"
                >
                  <span className="text-red-500">*</span> Aceito e concordo com
                  os termos e contratos.
                </Checkbox>
              </ConfigProvider>
              {hasTriedSubmit && !acceptTerms && (
                <p className="text-red-500 text-xs mt-1">
                  Você deve aceitar os termos para continuar
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:right-90 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
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
                className=" self-end"
              >
                {isUpdateOrderFetching ? "Finalizando..." : "Concluir pedido"}
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
  );
}
