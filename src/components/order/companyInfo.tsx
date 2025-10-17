import { useState } from "react";
import { Button, Input, Checkbox, Radio, ConfigProvider, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import { useOrderStore } from "../../context/context";
import { useOrderControler } from "../../controller/controller";

function PlanCard({
  plan,
  index,
}: {
  plan: {
    id: string;
    planName: string;
    price: string;
    users: number;
    type: string;
  };
  index: number;
}) {
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
            R$ {parseInt(plan.price) * plan.users},00/
            {plan.type === "anual" ? "ano" : "mês"}
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

export default function CompanyInfo() {
  const {
    companyInfo,
    updateCompanyInfo,
    confirmedPlans,
    buildCompleteOrder,
    clearOrder,
  } = useOrderStore();

  // Estados locais para os campos do formulário
  const [domainName, setDomainName] = useState(companyInfo.domainName || "");
  const [hasWorkspace, setHasWorkspace] = useState(
    companyInfo.alreadyHaveWorkspace || false
  );
  const [acceptTerms, setAcceptTerms] = useState(
    companyInfo.acceptTerms || false
  );
  const [showServices, setShowServices] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  // Funções para calcular totais
  const getTotalPrice = () => {
    return confirmedPlans.reduce((total, plan) => {
      return total + parseInt(plan.price) * plan.users;
    }, 0);
  };

  const getTotalUsers = () => {
    return confirmedPlans.reduce((total, plan) => total + plan.users, 0);
  };

  const { createOrder } = useOrderControler();

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

    const orderData = buildCompleteOrder();
    if (orderData) {
      try {
        const response = await createOrder({ data: orderData });
        console.log("Resposta completa da API:", response);
        console.log("ID do pedido criado:", response.id);

        clearOrder();

        navigate(`/order/${response.id}`);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
      }
    }
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
              R$ {getTotalPrice()},00/mês
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
                    R$ {parseInt(plan.price) * plan.users},00/
                    {plan.type === "anual" ? "ano" : "mês"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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
                className=" self-end"
              >
                Concluir pedido
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
                    R$ {getTotalPrice()},00/mês
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
