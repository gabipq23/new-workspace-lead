import { useState } from "react";
import { Button, Input, Select, Checkbox, Radio, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useOrderStore } from "../../context/context";
import { CNPJInput } from "../../utils/input";

const { Option } = Select;

export default function GetStartInfo() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [managerName, setManagerName] = useState("");
  const [users, setUsers] = useState(1);
  const [isVivoClient, setIsVivoClient] = useState(true);
  const [acceptContact, setAcceptContact] = useState(true);
  const [showServicesWeb, setShowServicesWeb] = useState(true);
  const { selectedPlan, updateBasicInfo, setSelectedPlan } = useOrderStore();

  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }
    updateBasicInfo({
      planName: selectedPlan?.planName || "Starter",
      cnpj: cnpj,
      email: email,
      managerName: managerName,
      users: users,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
    });
    navigate("/client-information");
    window.scrollTo(0, 0);
  };

  const handleUserIncrease = () => {
    setUsers(users + 1);
  };

  const handleUserDecrease = () => {
    if (users > 1) {
      setUsers(users - 1);
    }
  };

  const getPlanPrice = () => {
    if (selectedPlan?.price) {
      return parseInt(selectedPlan.price);
    }

    return 49;
  };

  const getPlanName = () => {
    if (selectedPlan?.planName) {
      return `Business ${selectedPlan.planName}`;
    }

    return "Business Starter";
  };

  const getPlanDetails = () => {
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

    const planKey = selectedPlan?.planName || "Starter";
    return details[planKey as keyof typeof details] || details["Starter"];
  };

  const isFormValid = () => {
    const hasValidPlan = selectedPlan !== null;
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidManagerName = managerName.trim() !== "";
    const hasValidUsers = users >= 1;
    const hasAcceptedContact = acceptContact === true;
    return (
      hasValidPlan &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidManagerName &&
      hasValidUsers &&
      hasAcceptedContact
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] ">
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
            <div className="text-white text-[10px]">Plano</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              {getPlanName()}
            </div>
          </div>
          <div className="text-start">
            <div className="text-white text-[10px]">Usuários</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              {users}
            </div>
          </div>
          <div className="text-start">
            <div className="text-white text-[10px]">Valor Total</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              R$ {getPlanPrice() * users},00/mês
            </div>
          </div>
        </div>

        <div className="text-center bg-purple-100  ">
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
                  ver mais <ChevronDown className="inline w-3 h-3" />
                </>
              )}
            </Button>
          </ConfigProvider>
        </div>

        {showServices && (
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
              <img
                src="/icone-calendar.svg"
                alt="Calendar"
                className="w-8 h-8"
              />
              <img src="/icone-chat2.svg" alt="Meet" className="w-8 h-8" />
              <img src="/icone-docs.svg" alt="Sheets" className="w-8 h-8" />
              <img src="/icone-sheets.svg" alt="Docs" className="w-8 h-8" />
              <img src="/icone-slides.svg" alt="Slides" className="w-8 h-8" />
              <img src="/icone-form.svg" alt="Forms" className="w-8 h-8" />
              <img src="/icone-sites.svg" alt="Sites" className="w-8 h-8" />
            </div>
            <hr className="my-3 border-t border-gray-200" />
            <div className=" flex flex-col gap-1 text-[#660099] text-[10px]">
              {getPlanDetails().map((detail, index) => (
                <div key={index} className="flex gap-1 items-center ">
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

      <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
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

          <div className="bg-orange-100 border border-orange-100 rounded-lg p-2 mb-8 flex items-center">
            <span className="text-orange-600 text-[12px] mr-2">🎁</span>
            <span className="text-orange-600 text-[12px] ">
              <strong>Aproveite agora!</strong> Clientes Móvel Vivo Empresas
              ganham +2GB na contratação de Google Workspace
            </span>
          </div>

          <div className="mb-8 text-[12px]">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[12px] text-gray-600 mb-2">
                  Plano <span className="text-red-500">*</span>
                </label>
                <Select
                  size="middle"
                  value={selectedPlan?.planName || "Starter"}
                  onChange={(value) => {
                    // Mapear os preços baseado na seleção
                    const priceMap = {
                      Starter: "49",
                      Standard: "98",
                      Plus: "154",
                    };

                    setSelectedPlan({
                      planName: value,
                      price: priceMap[value as keyof typeof priceMap],
                      servicesIncluded: [],
                    });
                  }}
                  className="w-full"
                >
                  <Option value="Starter">Business Starter</Option>
                  <Option value="Standard">Business Standard</Option>
                  <Option value="Plus">Business Plus</Option>
                </Select>
                {hasTriedSubmit && !selectedPlan && (
                  <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] text-gray-600 mb-2">
                  Quantidade de Usuários <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Button
                    size="middle"
                    onClick={handleUserDecrease}
                    disabled={users <= 1}
                    style={{
                      backgroundColor: users > 1 ? "#f97316" : "#e5e7eb",
                      borderColor: "#d1d5db",
                      color: users > 1 ? "white" : "#9ca3af",
                      borderRadius: "6px 0 0 6px",
                      width: "40px",
                      height: "32px",
                    }}
                  >
                    −
                  </Button>
                  <Input
                    value={users}
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
                    onClick={handleUserIncrease}
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
                {hasTriedSubmit && users < 1 && (
                  <p className="text-red-500 text-xs mt-1">
                    Selecione pelo menos 1 usuário
                  </p>
                )}
              </div>
              <div>
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

              <div>
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

              <div>
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
            </div>

            <div className="mb-8">
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

        <div className="bg-white text-gray-800 rounded-lg  relative">
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

            <div className="flex justify-between gap-2 p-3 pt-0 ">
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Plano</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  {getPlanName()}
                </div>
              </div>
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Usuários</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  {users}
                </div>
              </div>
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Valor Total</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  R$ {getPlanPrice() * users},00/mês
                </div>
              </div>
            </div>

            <div className="text-center bg-purple-100 rounded-b-md ">
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
                  onClick={() => setShowServicesWeb(!showServicesWeb)}
                >
                  {showServicesWeb ? (
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

            {showServicesWeb && (
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
                  <img
                    src="/icone-calendar.svg"
                    alt="Calendar"
                    className="w-8 h-8"
                  />
                  <img src="/icone-chat2.svg" alt="Meet" className="w-8 h-8" />
                  <img src="/icone-docs.svg" alt="Sheets" className="w-8 h-8" />
                  <img src="/icone-sheets.svg" alt="Docs" className="w-8 h-8" />
                  <img
                    src="/icone-slides.svg"
                    alt="Slides"
                    className="w-8 h-8"
                  />
                  <img src="/icone-form.svg" alt="Forms" className="w-8 h-8" />
                  <img src="/icone-sites.svg" alt="Sites" className="w-8 h-8" />
                </div>
                <hr className="my-3 border-t border-gray-200" />
                <div className=" flex flex-col gap-1 text-[#660099] text-[11px]">
                  {getPlanDetails().map((detail, index) => (
                    <div key={index} className="flex gap-1 items-center ">
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
        </div>
      </div>
    </div>
  );
}
