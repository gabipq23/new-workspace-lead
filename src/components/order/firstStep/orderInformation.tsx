import { Button, Checkbox, ConfigProvider, Input, Select, Tooltip } from "antd";
import { CircleAlert } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";
import { CNPJInput, PhoneInput } from "../../../utils/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Plan } from "../../../interfaces/order";
import { useOrderControler } from "../../../controller/controller";
import { useOrderStore } from "../../../context/context";
const { Option } = Select;

interface OrderInformationProps {
  basicInfo: {
    cnpj: string;
    email: string;
    manager_name: string;
    managerPhone: string;
    isVivoClient: boolean;
    acceptContact: boolean;
  };
  updateBasicInfo: (info: Partial<OrderInformationProps["basicInfo"]>) => void;
}

export default function OrderInformation({
  basicInfo,
  updateBasicInfo,
}: OrderInformationProps) {
  const {
    confirmedPlans,
    addCurrentPlanToConfirmed,
    addNewPlanToConfirmed,
    removePlanFromConfirmed,
  } = useOrderStore();

  const [currentPlanInput, setCurrentPlanInput] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });

  const [newPlanInput, setNewPlanInput] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });

  const [cnpj, setCnpj] = useState(basicInfo.cnpj);
  const [email, setEmail] = useState(basicInfo.email);
  const [manager_name, setmanager_name] = useState(basicInfo.manager_name);
  const [managerPhone, setManagerPhone] = useState(basicInfo.managerPhone);
  const isVivoClient = sessionStorage.getItem("isVivoClient") === "true";
  const [acceptContact, setAcceptContact] = useState(basicInfo.acceptContact);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();
  const { createOrder, isCreatingOrderLoading, changeOrderStatus } =
    useOrderControler();

  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");

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

    updateBasicInfo({
      cnpj: cnpj,
      email: email,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
    });
    const alreadyHaveWorkspace = hasWorkspace === "true";

    const orderData = {
      email: email,
      cnpj: cnpj,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
      plan: confirmedPlans,
      alreadyHaveWorkspace: alreadyHaveWorkspace,

      domainName: alreadyHaveWorkspace ? "" : "",
      acceptTerms: alreadyHaveWorkspace ? true : false,
    };

    try {
      const response = await createOrder({ data: orderData });

      if (alreadyHaveWorkspace) {
        await changeOrderStatus({
          id: Number(response.id),
          data: { status: "fechado" },
        });

        navigate(`/order/${response.id}`);
      } else {
        navigate(`/client-information/${response.id}`);
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
    }
  };

  const removePlan = (planId: string) => {
    removePlanFromConfirmed(planId);
  };

  const addCurrentPlan = () => {
    if (
      currentPlanInput?.planName &&
      currentPlanInput?.price &&
      currentPlanInput?.type
    ) {
      const newPlan: Plan = {
        id: Date.now().toString(),
        planName: currentPlanInput?.planName,
        price: currentPlanInput?.price,
        users: currentPlanInput?.users,
        type: currentPlanInput?.type as "mensal" | "anual",
      };

      addCurrentPlanToConfirmed(newPlan);
      setCurrentPlanInput({
        planName: "",
        price: "",
        users: 1,
        type: "",
      });
    }
  };

  const updateCurrentPlanInput = (field: string, value: string | number) => {
    setCurrentPlanInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrentUserIncrease = () => {
    setCurrentPlanInput((prev) => ({
      ...prev,
      users: prev.users + 1,
    }));
  };

  const handleCurrentUserDecrease = () => {
    if (currentPlanInput.users > 1) {
      setCurrentPlanInput((prev) => ({
        ...prev,
        users: prev.users - 1,
      }));
    }
  };

  const addNewPlan = () => {
    if (newPlanInput?.planName && newPlanInput?.price && newPlanInput?.type) {
      const newPlan: Plan = {
        id: Date.now().toString(),
        planName: newPlanInput?.planName,
        price: newPlanInput?.price,
        users: newPlanInput?.users,
        type: newPlanInput?.type as "mensal" | "anual",
      };

      addNewPlanToConfirmed(newPlan);
      setNewPlanInput({
        planName: "",
        price: "",
        users: 1,
        type: "",
      });
    }
  };

  const updateNewPlanInput = (field: string, value: string | number) => {
    setNewPlanInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewUserIncrease = () => {
    setNewPlanInput((prev) => ({
      ...prev,
      users: prev.users + 1,
    }));
  };

  const handleNewUserDecrease = () => {
    if (newPlanInput.users > 1) {
      setNewPlanInput((prev) => ({
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
              {hasWorkspace !== "true" && (
                <>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-gray-400 text-gray-500 rounded-full flex items-center justify-center text-[12px] font-semibold">
                      2
                    </div>
                    <span className="text-[12px] text-gray-400">Dados</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300 mt-[-12px]"></div>
                </>
              )}

              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-gray-400 text-gray-500 rounded-full flex items-center justify-center text-[12px] font-semibold">
                  {hasWorkspace === "true" ? 2 : 3}
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

          <div className="mb-8">
            {/* plano antigo */}
            {hasWorkspace === "true" && (
              <>
                <h2>{hasWorkspace === "true" && "Planos Atuais"}</h2>
                <h3 className="flex  items-center gap-2 text-[14px] text-gray-800 mb-4">
                  Qual plano você possui atualmente e deseja migrar ?
                  <Tooltip title="Você pode escolher 1 ou mais planos.">
                    <span className="text-gray-500 cursor-pointer">
                      <CircleAlert size={14} />
                    </span>
                  </Tooltip>
                </h3>

                {confirmedPlans
                  ?.filter((plan) => plan.newPlan === false)
                  ?.map((plan, index: number) => (
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

                      <div className="w-[260px]">
                        <label className="block text-[12px] text-gray-600 mb-2">
                          Valor Total
                        </label>
                        <div className="flex gap-2">
                          <div className="w-[220px] h-8 pl-3 border border-gray-300 rounded-md bg-white flex items-center justify-between">
                            <span className="text-gray-700 text-[13px] font-bold">
                              R$ {formatPrice(plan?.price, plan?.users)}/
                              {plan?.type === "anual" ? "mês" : "mês"}
                            </span>
                            {plan?.type === "anual" && (
                              <span className="bg-green-600 text-white rounded-md p-1.5 text-[14px]">
                                {" "}
                                - 33%
                              </span>
                            )}
                          </div>
                          <Button
                            size="middle"
                            onClick={() =>
                              removePlan(plan?.id?.toString() || "0")
                            }
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
                      Plano{" "}
                      {confirmedPlans.filter((plan) => plan.newPlan === false)
                        .length + 1}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Select
                      size="middle"
                      value={currentPlanInput?.planName || undefined}
                      onChange={(value) => {
                        const priceMap = {
                          Starter: { mensal: "49,00", anual: "32,72" },
                          Standard: { mensal: "98,00", anual: "81,80" },
                          Plus: { mensal: "154,00", anual: "128,40" },
                        };
                        updateCurrentPlanInput("planName", value);
                        updateCurrentPlanInput("type", "anual");
                        updateCurrentPlanInput(
                          "price",
                          priceMap[value as keyof typeof priceMap].anual
                        );
                      }}
                      className="w-full"
                    >
                      <Option value="Starter">Business Starter</Option>
                      <Option value="Standard">Business Standard</Option>
                      <Option value="Plus">Business Plus</Option>
                    </Select>
                    {hasTriedSubmit && !currentPlanInput?.planName && (
                      <p className="text-red-500 text-xs mt-1">
                        Campo obrigatório
                      </p>
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
                        disabled={currentPlanInput?.users <= 1}
                        style={{
                          backgroundColor:
                            currentPlanInput?.users > 1 ? "#f97316" : "#e5e7eb",
                          borderColor: "#d1d5db",
                          color:
                            currentPlanInput.users > 1 ? "white" : "#9ca3af",
                          borderRadius: "6px 0 0 6px",
                          width: "40px",
                          height: "32px",
                        }}
                      >
                        −
                      </Button>
                      <Input
                        value={currentPlanInput.users}
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
                    {hasTriedSubmit && currentPlanInput.users < 1 && (
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
                      value={currentPlanInput.type || undefined}
                      onChange={(value) => {
                        updateCurrentPlanInput("type", value);

                        if (currentPlanInput?.planName) {
                          const priceMap = {
                            Starter: { mensal: "49,00", anual: "32,72" },
                            Standard: { mensal: "98,00", anual: "81,80" },
                            Plus: { mensal: "154,00", anual: "128,40" },
                          };

                          const price =
                            value === "anual"
                              ? priceMap[
                                  currentPlanInput?.planName as keyof typeof priceMap
                                ].anual
                              : priceMap[
                                  currentPlanInput?.planName as keyof typeof priceMap
                                ][value as "mensal" | "anual"];

                          updateCurrentPlanInput("price", price);
                        }
                      }}
                      className="w-[100px]"
                    >
                      <Option value="mensal">Mensal</Option>
                      <Option value="anual">Anual</Option>
                    </Select>
                    {hasTriedSubmit && !currentPlanInput.type && (
                      <p className="text-red-500 text-xs mt-1">
                        Campo obrigatório
                      </p>
                    )}
                  </div>
                  <div className="w-[260px]">
                    <label className="block text-[12px] text-gray-600 mb-2">
                      Valor Total
                    </label>
                    <div className="flex gap-2">
                      <div className="w-[220px] h-8 pl-3 border border-gray-300 rounded-md bg-white flex items-center justify-between">
                        <span
                          style={{ fontWeight: "bold" }}
                          className="text-gray-600 text-[13px]"
                        >
                          R${" "}
                          {formatPrice(
                            currentPlanInput?.price || "0",
                            currentPlanInput.users
                          )}
                          /{currentPlanInput.type === "anual" ? "mês" : "mês"}
                        </span>
                        {currentPlanInput?.type === "anual" && (
                          <span className="bg-green-600 text-white rounded-md p-1.5 text-[14px]">
                            {" "}
                            - 33%
                          </span>
                        )}
                      </div>
                      <Button
                        size="middle"
                        onClick={addCurrentPlan}
                        disabled={
                          !currentPlanInput?.planName || !currentPlanInput.type
                        }
                        style={{
                          backgroundColor:
                            currentPlanInput?.planName && currentPlanInput.type
                              ? "#f97316"
                              : "#e5e7eb",
                          borderColor:
                            currentPlanInput?.planName && currentPlanInput.type
                              ? "#f97316"
                              : "#d1d5db",
                          color:
                            currentPlanInput?.planName && currentPlanInput.type
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
              </>
            )}

            {/* plano novo */}
            <h2>{hasWorkspace === "true" && "Novos Planos"}</h2>
            <h3 className="flex  items-center gap-2 text-[14px] text-gray-800 mb-4">
              {hasWorkspace === "true"
                ? "Deseja aproveitar para adicionar novos planos?"
                : "Defina seus planos"}{" "}
              {}
              <Tooltip title="Você pode escolher 1 ou mais planos.">
                <span className="text-gray-500 cursor-pointer">
                  <CircleAlert size={14} />
                </span>
              </Tooltip>
            </h3>

            {confirmedPlans
              ?.filter((plan) => plan.newPlan === true)
              ?.map((plan, index: number) => (
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

                  <div className="w-[260px]">
                    <label className="block text-[12px] text-gray-600 mb-2">
                      Valor Total
                    </label>
                    <div className="flex gap-2">
                      <div className="w-[220px] h-8 pl-3 border border-gray-300 rounded-md bg-white flex items-center justify-between">
                        <span className="text-gray-700 text-[13px] font-bold">
                          R$ {formatPrice(plan?.price, plan?.users)}/
                          {plan?.type === "anual" ? "mês" : "mês"}
                        </span>{" "}
                        {plan?.type === "anual" && (
                          <span className="bg-green-600 text-white rounded-md p-1.5 text-[14px]">
                            {" "}
                            - 33%
                          </span>
                        )}
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
                  Plano{" "}
                  {confirmedPlans.filter((plan) => plan.newPlan === true)
                    .length + 1}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={newPlanInput?.planName || undefined}
                  onChange={(value) => {
                    const priceMap = {
                      Starter: { mensal: "49,00", anual: "32,72" },
                      Standard: { mensal: "98,00", anual: "81,80" },
                      Plus: { mensal: "154,00", anual: "128,40" },
                    };
                    updateNewPlanInput("planName", value);
                    updateNewPlanInput("type", "anual");
                    updateNewPlanInput(
                      "price",
                      priceMap[value as keyof typeof priceMap].anual
                    );
                  }}
                  className="w-full"
                >
                  <Option value="Starter">Business Starter</Option>
                  <Option value="Standard">Business Standard</Option>
                  <Option value="Plus">Business Plus</Option>
                </Select>
                {hasTriedSubmit && !newPlanInput?.planName && (
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
                    onClick={handleNewUserDecrease}
                    disabled={newPlanInput?.users <= 1}
                    style={{
                      backgroundColor:
                        newPlanInput?.users > 1 ? "#f97316" : "#e5e7eb",
                      borderColor: "#d1d5db",
                      color: newPlanInput.users > 1 ? "white" : "#9ca3af",
                      borderRadius: "6px 0 0 6px",
                      width: "40px",
                      height: "32px",
                    }}
                  >
                    −
                  </Button>
                  <Input
                    value={newPlanInput.users}
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
                    onClick={handleNewUserIncrease}
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
                {hasTriedSubmit && newPlanInput.users < 1 && (
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
                  value={newPlanInput.type || undefined}
                  onChange={(value) => {
                    updateNewPlanInput("type", value);

                    if (newPlanInput?.planName) {
                      const priceMap = {
                        Starter: { mensal: "49,00", anual: "32,72" },
                        Standard: { mensal: "98,00", anual: "81,80" },
                        Plus: { mensal: "154,00", anual: "128,40" },
                      };

                      const price =
                        value === "anual"
                          ? priceMap[
                              newPlanInput?.planName as keyof typeof priceMap
                            ].anual
                          : priceMap[
                              newPlanInput?.planName as keyof typeof priceMap
                            ][value as "mensal" | "anual"];

                      updateNewPlanInput("price", price);
                    }
                  }}
                  className="w-[100px]"
                >
                  <Option value="mensal">Mensal</Option>
                  <Option value="anual">Anual</Option>
                </Select>
                {hasTriedSubmit && !newPlanInput.type && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="w-[260px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Valor Total
                </label>
                <div className="flex gap-2">
                  <div className="w-[220px] h-8 pl-3 border border-gray-300 rounded-md bg-white flex items-center justify-between">
                    <span
                      style={{ fontWeight: "bold" }}
                      className="text-gray-600 text-[13px]"
                    >
                      R${" "}
                      {formatPrice(
                        newPlanInput?.price || "0",
                        newPlanInput.users
                      )}
                      /{newPlanInput.type === "anual" ? "mês" : "mês"}
                    </span>{" "}
                    {newPlanInput?.type === "anual" && (
                      <span className="bg-green-600 text-white rounded-md p-1.5 text-[14px]">
                        {" "}
                        - 33%
                      </span>
                    )}
                  </div>
                  <Button
                    size="middle"
                    onClick={addNewPlan}
                    disabled={!newPlanInput?.planName || !newPlanInput.type}
                    style={{
                      backgroundColor:
                        newPlanInput?.planName && newPlanInput.type
                          ? "#f97316"
                          : "#e5e7eb",
                      borderColor:
                        newPlanInput?.planName && newPlanInput.type
                          ? "#f97316"
                          : "#d1d5db",
                      color:
                        newPlanInput?.planName && newPlanInput.type
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
                loading={isCreatingOrderLoading}
                disabled={isCreatingOrderLoading}
                className="self-end"
              >
                {isCreatingOrderLoading
                  ? hasWorkspace === "true"
                    ? "Concluindo pedido..."
                    : "Criando pedido..."
                  : hasWorkspace === "true"
                  ? "Concluir pedido"
                  : "Continuar"}
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}
