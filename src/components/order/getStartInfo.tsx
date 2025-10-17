import { useState } from "react";
import { Button, Input, Select, Checkbox, Radio, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useOrderStore } from "../../context/context";
import { CNPJInput, PhoneInput } from "../../utils/input";

const { Option } = Select;

// Função helper para formatar valores monetários
const formatPrice = (price: string | number, users: number = 1) => {
  // Se for string, converte vírgula para ponto antes de fazer parseFloat
  const numericPrice =
    typeof price === "string" ? parseFloat(price.replace(",", ".")) : price;
  const total = numericPrice * users;
  // Retorna no formato brasileiro com vírgula
  return total.toFixed(2).replace(".", ",");
};

function PlanCard({ plan, index }: { plan: any; index: number }) {
  const [showDetails, setShowDetails] = useState(false);

  const getPlanNameForCard = (planName: string) => {
    return `Business ${planName}`;
  };

  const getPlanDetailsForCard = (planName: string) => {
    const details = {
      Starter: [
        "E-mail comercial personalizado e seguro",
        "Videochamadas com 100 participantes",
        "30 GB de armazenamento em pool por usuário",
        "Controles de segurança e gerenciamento",
        "Suporte Padrão",
      ],
      Standard: [
        "E-mail comercial personalizado e seguro",
        "Videochamadas com 150 participantes + gravação",
        "2 TB de armazenamento em pool por usuário",
        "Controles de segurança e gerenciamento",
        "Suporte Padrão (upgrade pago para o Suporte Avançado)",
      ],
      Plus: [
        "E-mail corporativo personalizado e protegido, e-discovery e retenção",
        "Videochamadas com 500 participantes, gravação de reuniões e controle de presença",
        "5 TB de armazenamento em pool por usuário",
        "Segurança reforçada e controles de gerenciamento, incluindo o Vault e o Gerenciamento avançado de endpoints",
        "Suporte Padrão (upgrade pago para o Suporte Avançado)",
      ],
    };

    return details[planName as keyof typeof details] || details["Starter"];
  };

  return (
    <div className="border-b border-gray-200 pb-2">
      <div className="flex justify-between gap-2 p-3">
        <div className="text-start">
          <div className="text-gray-600 text-[10px]">Plano {index}</div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            {getPlanNameForCard(plan.planName)}
          </div>
        </div>
        <div className="text-start">
          <div className="text-gray-600 text-[10px]">Usuários</div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            {plan.users}
          </div>
        </div>
        <div className="text-start">
          <div className="text-gray-600 text-[10px]">Valor Total</div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            R$ {formatPrice(plan.price, plan.users)}/
            {plan.type === "anual" ? "mês" : "mês"}
          </div>
        </div>
      </div>

      <div className="text-center bg-purple-100">
        <ConfigProvider
          theme={{
            token: {
              colorBgTextHover: "none",
              colorBgTextActive: "none",
              colorText: "#660099",
            },
          }}
        >
          <Button
            size="small"
            type="text"
            variant="text"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                ver menos <ChevronUp className="inline w-3 h-3" />
              </>
            ) : (
              <>
                ver mais <ChevronDown className="inline w-3 h-3" />
              </>
            )}
          </Button>
        </ConfigProvider>
      </div>

      {showDetails && (
        <div className="p-4 bg-purple-100">
          <h4
            style={{ fontWeight: "bold" }}
            className="text-[#660099] font-medium mb-3 text-[12px]"
          >
            Serviços inclusos
          </h4>

          <div className="flex justify-around">
            <img src="/icone-gmail.svg" alt="Gmail" className="w-8 h-8" />
            <img src="/icone-drive.svg" alt="Drive" className="w-8 h-8" />
            <img src="/icone-calendar.svg" alt="Calendar" className="w-8 h-8" />
            <img src="/icone-chat2.svg" alt="Meet" className="w-8 h-8" />
            <img src="/icone-docs.svg" alt="Sheets" className="w-8 h-8" />
            <img src="/icone-sheets.svg" alt="Docs" className="w-8 h-8" />
            <img src="/icone-slides.svg" alt="Slides" className="w-8 h-8" />
            <img src="/icone-form.svg" alt="Forms" className="w-8 h-8" />
            <img src="/icone-sites.svg" alt="Sites" className="w-8 h-8" />
          </div>
          <hr className="my-3 border-t border-gray-200" />
          <div className=" flex flex-col gap-1 text-[#660099] text-[11px]">
            {getPlanDetailsForCard(plan.planName).map((detail, detailIndex) => (
              <div key={detailIndex} className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GetStartInfo() {
  const { basicInfo, updateBasicInfo, confirmedPlans, setConfirmedPlans } =
    useOrderStore();

  const [cnpj, setCnpj] = useState(basicInfo.cnpj);
  const [email, setEmail] = useState(basicInfo.email);
  const [managerName, setManagerName] = useState(basicInfo.managerName);
  const [managerPhone, setManagerPhone] = useState(basicInfo.managerPhone);
  const [isVivoClient, setIsVivoClient] = useState(basicInfo.isVivoClient);
  const [acceptContact, setAcceptContact] = useState(basicInfo.acceptContact);

  const [currentPlan, setCurrentPlan] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });

  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }
    updateBasicInfo({
      cnpj: cnpj,
      email: email,
      managerName: managerName,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
    });
    navigate("/client-information");
    window.scrollTo(0, 0);
  };

  const addNewPlan = () => {
    if (currentPlan.planName && currentPlan.price && currentPlan.type) {
      const newConfirmedPlan = {
        id: Date.now().toString(),
        planName: currentPlan.planName,
        price: currentPlan.price,
        users: currentPlan.users,
        type: currentPlan.type,
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
    setConfirmedPlans(confirmedPlans.filter((plan) => plan.id !== planId));
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

  const getTotalPrice = () => {
    const confirmedPlansTotal = confirmedPlans.reduce((total, plan) => {
      // Converte vírgula para ponto antes de fazer parseFloat
      const numericPrice = parseFloat(plan.price.replace(",", "."));
      return total + numericPrice * plan.users;
    }, 0);
    return confirmedPlansTotal.toFixed(2).replace(".", ",");
  };

  const getTotalUsers = () => {
    return confirmedPlans.reduce((total, plan) => total + plan.users, 0);
  };

  const isFormValid = () => {
    const hasAtLeastOnePlan = confirmedPlans.length > 0;
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidManagerName = managerName.trim() !== "";
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasAcceptedContact = acceptContact === true;
    return (
      hasAtLeastOnePlan &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidManagerName &&
      hasValidManagerPhone &&
      hasAcceptedContact
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh]  ">
      {/* mobile */}
      <div className="md:hidden flex flex-col bg-[#660099] text-white  pt-2">
        <div className=" flex items-end justify-end text-[12px] gap-2 px-3">
          <span className="text-white">🛒</span>
          <span className="">Seu plano</span>
        </div>

        <h3
          style={{ fontWeight: "bold", paddingInline: "12px" }}
          className="text-[14px] text-white "
        >
          Google Workspace
        </h3>

        <div className="flex justify-between gap-2  px-3">
          <div className="text-start">
            <div className="text-white text-[10px]">Planos</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              {confirmedPlans.length > 0
                ? `${confirmedPlans.length} plano(s)`
                : "Nenhum plano"}
            </div>
          </div>
          <div className="text-start">
            <div className="text-white text-[10px]">Usuários</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              {getTotalUsers()}
            </div>
          </div>

          <div className="text-start">
            <div className="text-white text-[10px]">Valor Total</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              R$ {getTotalPrice()}/mês
            </div>
          </div>
        </div>

        {confirmedPlans.length > 0 && (
          <div className="text-center bg-purple-100">
            <ConfigProvider
              theme={{
                token: {
                  colorBgTextHover: "none",
                  colorBgTextActive: "none",
                  colorText: "#660099",
                },
              }}
            >
              <Button
                size="small"
                type="text"
                variant="text"
                onClick={() => setShowServices(!showServices)}
              >
                {showServices ? (
                  <>
                    ver menos <ChevronUp className="inline w-3 h-3" />
                  </>
                ) : (
                  <>
                    ver planos <ChevronDown className="inline w-3 h-3" />
                  </>
                )}
              </Button>
            </ConfigProvider>
          </div>
        )}

        {showServices && confirmedPlans.length > 0 && (
          <div className="p-4 bg-purple-100">
            <h4
              style={{ fontWeight: "bold" }}
              className="text-[#660099] font-medium mb-3 text-[12px]"
            >
              Planos selecionados
            </h4>

            {confirmedPlans.map((plan, index) => (
              <div key={plan.id} className="mb-3 p-3 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#660099] font-bold text-[11px]">
                    Plano {index + 1}: Business {plan.planName}
                  </span>
                  <span className="text-[#660099] font-bold text-[11px]">
                    {plan.users} usuário(s)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[10px] capitalize">
                    Modalidade: {plan.type}
                  </span>
                  <span className="text-[#ff7f17] font-bold text-[11px]">
                    R$ {formatPrice(plan.price, plan.users)}/
                    {plan.type === "anual" ? "mês" : "mês"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-8 pt-4  justify-between bg-[#f7f7f7] h-[calc(100vh-60px)] overflow-y-auto scrollbar-thin ">
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
            Olá! Vamos iniciar sua pedido online :)
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
            <h3 className="text-[14px] text-gray-800 mb-4">Defina seu plano</h3>

            {confirmedPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="flex flex-wrap justify-between gap-4 mb-1 max-w-[800px] bg-green-50 py-2 rounded-r-md"
              >
                <div className="w-[170px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Plano {index + 1}
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                    <span className="text-gray-700 text-[13px]">
                      Business {plan.planName}
                    </span>
                  </div>
                </div>

                <div className="w-[140px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Quant. de Usuários
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center justify-center">
                    <span className="text-gray-700 text-[13px]">
                      {plan.users}
                    </span>
                  </div>
                </div>

                <div className="w-[90px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Modalidade
                  </label>
                  <div className="h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                    <span className="text-gray-700 text-[13px] capitalize">
                      {plan.type}
                    </span>
                  </div>
                </div>

                <div className="w-[280px]">
                  <label className="block text-[12px] text-gray-600 mb-2">
                    Valor Total
                  </label>
                  <div className="flex gap-2">
                    <div className="w-[180px] h-8 px-3 py-1 border border-gray-300 rounded-md bg-white flex items-center">
                      <span className="text-gray-700 text-[13px] font-bold">
                        R$ {formatPrice(plan.price, plan.users)}/
                        {plan.type === "anual" ? "mês" : "mês"}
                      </span>
                    </div>
                    <Button
                      size="middle"
                      onClick={() => removePlan(plan.id)}
                      style={{
                        backgroundColor: "#dc2626",
                        borderColor: "#dc2626",
                        color: "white",
                        height: "32px",
                        fontSize: "11px",
                        padding: "0 8px",
                        width: "140px",
                      }}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex max-w-[800px] flex-wrap justify-between gap-2 mb-6">
              <div className="w-[170px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Plano {confirmedPlans.length + 1}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={currentPlan.planName || undefined}
                  placeholder="Selecione um plano"
                  onChange={(value) => {
                    const priceMap = {
                      Starter: { mensal: "49,00", anual: "32,72" },
                      Standard: { mensal: "98,00", anual: "81,80" },
                      Plus: { mensal: "154,00", anual: "128,40" },
                    };

                    updateCurrentPlan("planName", value);

                    // Define o preço baseado na type atual
                    const type = currentPlan.type as "mensal" | "anual";
                    if (type) {
                      updateCurrentPlan(
                        "price",
                        priceMap[value as keyof typeof priceMap][type]
                      );
                    } else {
                      // Se não há type definida, usa o preço mensal como padrão
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
                {hasTriedSubmit && !currentPlan.planName && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>
              <div className="w-[140px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Quant. de Usuários <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Button
                    size="middle"
                    onClick={handleCurrentUserDecrease}
                    disabled={currentPlan.users <= 1}
                    style={{
                      backgroundColor:
                        currentPlan.users > 1 ? "#f97316" : "#e5e7eb",
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
              <div className="w-[90px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Modalidade <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={currentPlan.type || undefined}
                  onChange={(value) => {
                    updateCurrentPlan("type", value);

                    // Recalcula o preço quando a modalidade muda
                    if (currentPlan.planName) {
                      const priceMap = {
                        Starter: { mensal: "49,00", anual: "32,72" },
                        Standard: { mensal: "98,00", anual: "81,80" },
                        Plus: { mensal: "154,00", anual: "128,40" },
                      };

                      updateCurrentPlan(
                        "price",
                        priceMap[currentPlan.planName as keyof typeof priceMap][
                          value as "mensal" | "anual"
                        ]
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
              <div className="w-[280px]">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Valor Total
                </label>
                <div className="flex gap-2">
                  <div className="w-[180px] h-8 px-3 py-1 border border-gray-300 rounded-md bg-gray-50 flex items-center">
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
                    disabled={!currentPlan.planName || !currentPlan.type}
                    style={{
                      backgroundColor:
                        currentPlan.planName && currentPlan.type
                          ? "#f97316"
                          : "#e5e7eb",
                      borderColor:
                        currentPlan.planName && currentPlan.type
                          ? "#f97316"
                          : "#d1d5db",
                      color:
                        currentPlan.planName && currentPlan.type
                          ? "white"
                          : "#9ca3af",
                      height: "32px",
                      fontSize: "11px",
                      padding: "0 8px",
                      width: "140px",
                    }}
                  >
                    Adicionar novo plano
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex  max-w-[800px] flex-wrap justify-between gap-6 mb-6">
              <div className=" w-[170px] ">
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

              <div className=" w-[210px] ">
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

              <div className=" w-[200px] ">
                <label className="block text-[12px] text-gray-600 mb-2">
                  Nome do Gestor <span className="text-red-500">*</span>
                </label>
                <Input
                  size="middle"
                  placeholder="Informe o nome do gestor"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
                {hasTriedSubmit && managerName.trim() === "" && (
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
                className="self-end"
              >
                Continuar
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:flex flex-col  w-90 bg-[#660099] text-white p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white">🛒</span>
          <span className="font-medium">Seu plano</span>
        </div>

        <div className="bg-white text-gray-800 rounded-lg relative">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-xl text-[10px] inline-block mb-4 absolute -top-2 right-2">
            + 2GB na linha móvel
          </div>

          <div className="">
            <h3
              style={{ fontWeight: "bold", padding: "12px" }}
              className="text-[14px] text-[#660099]"
            >
              Google Workspace
            </h3>

            {/* Todos os planos confirmados */}
            {confirmedPlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index + 1} />
            ))}

            {/* Resumo Total */}
            {confirmedPlans.length > 0 && (
              <div className="p-3 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-700">
                    Total Geral:
                  </span>
                  <span className="text-[14px] font-bold text-[#660099]">
                    R$ {getTotalPrice()}/mês
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
