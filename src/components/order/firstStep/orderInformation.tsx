import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  Radio,
  Select,
  Tooltip,
} from "antd";
import { CircleAlert } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";
import { CNPJInput, PhoneInput } from "../../../utils/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Plan } from "../../../interfaces/order";
import { useOrderControler } from "../../../controller/controller";
const { Option } = Select;
export default function OrderInformation({
  basicInfo,
  updateBasicInfo,
  confirmedPlans,
  setConfirmedPlans,
}: any) {
  const [currentPlan, setCurrentPlan] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });
  const [cnpj, setCnpj] = useState(basicInfo.cnpj);
  const [email, setEmail] = useState(basicInfo.email);
  const [manager_name, setmanager_name] = useState(basicInfo.manager_name);
  const [managerPhone, setManagerPhone] = useState(basicInfo.managerPhone);
  const [isVivoClient, setIsVivoClient] = useState(basicInfo.isVivoClient);
  const [acceptContact, setAcceptContact] = useState(basicInfo.acceptContact);
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();
  const { createOrder, isCreatingOrderLoading } = useOrderControler();

  const isFormValid = () => {
    const hasAtLeastOnePlan = confirmedPlans.length > 0;
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidmanager_name = manager_name.trim() !== "";
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasAcceptedContact = acceptContact === true;
    return (
      hasAtLeastOnePlan &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidmanager_name &&
      hasValidManagerPhone &&
      hasAcceptedContact
    );
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }

    // Atualiza o contexto com os dados básicos
    updateBasicInfo({
      cnpj: cnpj,
      email: email,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
    });

    // Cria pedido parcial com os dados do primeiro step
    const partialOrderData = {
      email: email,
      cnpj: cnpj,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
      plan: confirmedPlans,
      // Dados do second step como vazios (serão preenchidos depois)
      domainName: "",
      alreadyHaveWorkspace: false,
      acceptTerms: false,
    };

    try {
      const response = await createOrder({ data: partialOrderData });
      console.log("Pedido parcial criado com ID:", response.id);

      // Navega para second step com o ID do pedido
      navigate(`/client-information/${response.id}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao criar pedido parcial:", error);
    }
  };

  const addNewPlan = () => {
    if (currentPlan?.planName && currentPlan?.price && currentPlan?.type) {
      const newConfirmedPlan = {
        id: Date.now().toString(),
        planName: currentPlan?.planName,
        price: currentPlan?.price,
        users: currentPlan?.users,
        type: currentPlan?.type,
      };

      setConfirmedPlans([...confirmedPlans, newConfirmedPlan]);

      setCurrentPlan({
        planName: "",
        price: "",
        users: 1,
        type: "",
      });
    }
  };

  const removePlan = (planId: string) => {
    setConfirmedPlans(
      confirmedPlans.filter((plan: Plan) => plan?.id?.toString() !== planId)
    );
  };

  const updateCurrentPlan = (field: string, value: string | number) => {
    setCurrentPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrentUserIncrease = () => {
    setCurrentPlan((prev) => ({
      ...prev,
      users: prev.users + 1,
    }));
  };

  const handleCurrentUserDecrease = () => {
    if (currentPlan.users > 1) {
      setCurrentPlan((prev) => ({
        ...prev,
        users: prev.users - 1,
      }));
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 px-8 pt-2  justify-between bg-[#f7f7f7] h-[calc(100vh-60px)] overflow-y-auto scrollbar-thin ">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row items-center justify-between mb-8">
            <img src="/Vivo-Empresas.png" alt="Vivo Empresas" className="h-7" />

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[12px] font-semibold">
                  1
                </div>
                <span className="text-[12px] text-[#660099] font-medium">
                  Produto
                </span>
              </div>
              <div className="w-8 h-px bg-[#660099] mt-[-12px]"></div>

              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-gray-400 text-gray-500 rounded-full flex items-center justify-center text-[12px] font-semibold">
                  2
                </div>
                <span className="text-[12px] text-gray-400">Dados</span>
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
            Olá! Vamos iniciar o seu pedido{" "}
            {hasWorkspace === "true" ? "de migração" : ""} online :)
          </h1>

          <div className="bg-orange-100 border border-orange-100 rounded-lg p-2 mb-4 flex items-center">
            <span className="text-orange-600 text-[12px] mr-2">🎁</span>
            <span className="text-orange-600 text-[12px] ">
              <strong>Aproveite agora!</strong> Clientes Móvel Vivo Empresas
              ganham +2GB na contratação de Google Workspace
            </span>
          </div>

          <div className="mb-6 text-[12px]">
            <h3 className="text-[14px] text-gray-800 mb-4">
              É cliente Vivo Empresas Móvel?
            </h3>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f97316",
                },
              }}
            >
              <Radio.Group
                value={isVivoClient}
                onChange={(e) => setIsVivoClient(e.target.value)}
                className="flex gap-6 text-[14px]"
              >
                <Radio value={true} className="text-gray-700 text-[12px]">
                  Sim, sou cliente
                </Radio>
                <Radio value={false} className="text-gray-700 text-[12px]">
                  Não sou cliente
                </Radio>
              </Radio.Group>
            </ConfigProvider>
          </div>

          <div className="mb-8">
            <h3 className="flex  items-center gap-2 text-[14px] text-gray-800 mb-4">
              {hasWorkspace === "true"
                ? "Informe os detalhes do plano que você deseja migrar"
                : "Defina seus planos"}{" "}
              {}
              <Tooltip title="Você pode escolher 1 ou mais planos.">
                <span className="text-gray-500 cursor-pointer">
                  <CircleAlert size={14} />
                </span>
              </Tooltip>
            </h3>

            {confirmedPlans?.map((plan: Plan, index: number) => (
              <div
                key={plan?.id}
                className="flex flex-wrap justify-start gap-2 mb-1 max-w-[800px] bg-green-50 py-2 rounded-r-md"
              >
                <div className="w-[160px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Plano {index + 1}
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                    <span className="text-gray-700 text-[13px]">
                      Business {plan?.planName}
                    </span>
                  </div>
                </div>

                <div className="w-[120px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Quant. de Usuários
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center justify-center">
                    <span className="text-gray-700 text-[13px]">
                      {plan?.users}
                    </span>
                  </div>
                </div>

                <div className="w-[100px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Modalidade
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                    <span className="text-gray-700 text-[13px] capitalize">
                      {plan?.type}
                    </span>
                  </div>
                </div>

                <div className="w-[250px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Valor Total
                  </label>
                  <div className="flex gap-2">
                    <div className="w-[150px] h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                      <span className="text-gray-700 text-[13px] font-bold">
                        R$ {formatPrice(plan?.price, plan?.users)}/
                        {plan?.type === "anual" ? "mês" : "mês"}
                      </span>
                    </div>
                    <Button
                      size="middle"
                      onClick={() => removePlan(plan?.id?.toString() || "0")}
                      style={{
                        backgroundColor: "#dc2626",
                        borderColor: "#dc2626",
                        color: "white",
                        height: "32px",
                        fontSize: "11px",
                        padding: "0 8px",
                        width: "100px",
                      }}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex max-w-[800px] flex-wrap justify-start gap-2 mb-6">
              <div className="w-[160px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Plano {confirmedPlans.length + 1}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={currentPlan?.planName || undefined}
                  onChange={(value) => {
                    const priceMap = {
                      Starter: { mensal: "49,00", anual: "32,72" },
                      Standard: { mensal: "98,00", anual: "81,80" },
                      Plus: { mensal: "154,00", anual: "128,40" },
                    };
                    updateCurrentPlan("planName", value);
                    const type = currentPlan.type as "mensal" | "anual";
                    if (type) {
                      updateCurrentPlan(
                        "price",
                        priceMap[value as keyof typeof priceMap][type]
                      );
                    } else {
                      updateCurrentPlan(
                        "price",
                        priceMap[value as keyof typeof priceMap].mensal
                      );
                    }
                  }}
                  className="w-full"
                >
                  <Option value="Starter">
                    Business Starter{" "}
                    {/* <span className="text-[12px] text-gray-500">
                      R$ 49,00/mês ou{" "}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      R$ 32,72/mês
                    </span> */}
                  </Option>
                  <Option value="Standard">
                    Business Standard{" "}
                    {/* <span className="text-[12px] text-gray-500">
                      R$ 98,00/mês ou{" "}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      R$ 81,80/mês
                    </span> */}
                  </Option>
                  <Option value="Plus">
                    Business Plus{" "}
                    {/* <span className="text-[12px] text-gray-500">
                      R$ 154,00/mês ou{" "}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      R$ 128,40/mês
                    </span> */}
                  </Option>
                </Select>
                {hasTriedSubmit && !currentPlan?.planName && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="w-[120px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Quant. de Usuários <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Button
                    size="middle"
                    onClick={handleCurrentUserDecrease}
                    disabled={currentPlan?.users <= 1}
                    style={{
                      backgroundColor:
                        currentPlan?.users > 1 ? "#f97316" : "#e5e7eb",
                      borderColor: "#d1d5db",
                      color: currentPlan.users > 1 ? "white" : "#9ca3af",
                      borderRadius: "6px 0 0 6px",
                      width: "40px",
                      height: "32px",
                    }}
                  >
                    −
                  </Button>
                  <Input
                    value={currentPlan.users}
                    readOnly
                    size="middle"
                    style={{
                      textAlign: "center",
                      borderRadius: "0",
                      borderLeft: "none",
                      borderRight: "none",
                      height: "32px",
                    }}
                  />
                  <Button
                    size="middle"
                    onClick={handleCurrentUserIncrease}
                    style={{
                      backgroundColor: "#f97316",
                      borderColor: "#f97316",
                      color: "white",
                      borderRadius: "0 6px 6px 0",
                      width: "40px",
                      height: "32px",
                    }}
                  >
                    +
                  </Button>
                </div>
                {hasTriedSubmit && currentPlan.users < 1 && (
                  <p className="text-red-500 text-xs mt-1">
                    Selecione pelo menos 1 usuário
                  </p>
                )}
              </div>
              <div className="w-[100px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Modalidade <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={currentPlan.type || undefined}
                  onChange={(value) => {
                    updateCurrentPlan("type", value);

                    if (currentPlan?.planName) {
                      const priceMap = {
                        Starter: { mensal: "49,00", anual: "32,72" },
                        Standard: { mensal: "98,00", anual: "81,80" },
                        Plus: { mensal: "154,00", anual: "128,40" },
                      };

                      updateCurrentPlan(
                        "price",
                        priceMap[
                          currentPlan?.planName as keyof typeof priceMap
                        ][value as "mensal" | "anual"]
                      );
                    }
                  }}
                  className="w-[100px]"
                >
                  <Option value="mensal">Mensal</Option>
                  <Option value="anual">Anual</Option>
                </Select>
                {hasTriedSubmit && !currentPlan.type && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="w-[250px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Valor Total
                </label>
                <div className="flex gap-2">
                  <div className="w-[150px] h-8 px-3 py-1 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span
                      style={{ fontWeight: "bold" }}
                      className="text-gray-600 text-[13px]"
                    >
                      R${" "}
                      {formatPrice(
                        currentPlan?.price || "0",
                        currentPlan.users
                      )}
                      /{currentPlan.type === "anual" ? "mês" : "mês"}
                    </span>
                  </div>
                  <Button
                    size="middle"
                    onClick={addNewPlan}
                    disabled={!currentPlan?.planName || !currentPlan.type}
                    style={{
                      backgroundColor:
                        currentPlan?.planName && currentPlan.type
                          ? "#f97316"
                          : "#e5e7eb",
                      borderColor:
                        currentPlan?.planName && currentPlan.type
                          ? "#f97316"
                          : "#d1d5db",
                      color:
                        currentPlan?.planName && currentPlan.type
                          ? "white"
                          : "#9ca3af",
                      height: "32px",
                      fontSize: "11px",
                      padding: "0 8px",
                      width: "100px",
                    }}
                  >
                    Adicionar plano
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-start max-w-[800px] flex-wrap  gap-2 mb-6">
              <div className=" w-[160px] ">
                <label className="block text-[12px] text-gray-600 mb-2">
                  CNPJ <span className="text-red-500">*</span>
                </label>
                <CNPJInput
                  format="##.###.###/####-##"
                  value={cnpj}
                  onValueChange={(values) => setCnpj(values.value)}
                />
                {hasTriedSubmit && cnpj.replace(/\D/g, "").length !== 14 && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>

              <div className=" w-[200px] ">
                <label className="block text-[12px] text-gray-600 mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <Input
                  size="middle"
                  placeholder="Informe seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {hasTriedSubmit &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                    <p className="text-red-500 text-xs mt-1">
                      Campo obrigatório
                    </p>
                  )}
              </div>

              <div className=" w-[150px] ">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Nome do Gestor <span className="text-red-500">*</span>
                </label>
                <Input
                  size="middle"
                  placeholder="Informe o nome do gestor"
                  value={manager_name}
                  onChange={(e) => setmanager_name(e.target.value)}
                />
                {hasTriedSubmit && manager_name.trim() === "" && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className=" w-[140px] ">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  format="(##) #####-####"
                  value={managerPhone}
                  onValueChange={(values) => setManagerPhone(values.value)}
                />
                {hasTriedSubmit &&
                  managerPhone.replace(/\D/g, "").length !== 11 && (
                    <p className="text-red-500 text-xs mt-1">
                      Campo obrigatório
                    </p>
                  )}
              </div>
            </div>

            <div className="mb-20 md:mb-10">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#f97316",
                  },
                }}
              >
                <Checkbox
                  checked={acceptContact}
                  onChange={(e) => setAcceptContact(e.target.checked)}
                  className="text-gray-600"
                >
                  Autorizo ser contatado pelo telefone e e-mail preenchidos,
                  para receber informações sobre o meu pedido.
                </Checkbox>
              </ConfigProvider>
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
                loading={isCreatingOrderLoading}
                disabled={isCreatingOrderLoading}
                className="self-end"
              >
                {isCreatingOrderLoading ? "Criando pedido..." : "Continuar"}
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
