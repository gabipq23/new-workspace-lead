import { Button, ConfigProvider, Collapse, Spin } from "antd";
import type { CollapseProps } from "antd";
import { Check } from "lucide-react";
import { MailOutlined, SignatureOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useOrderById } from "../../../controller/controller";
import OrderTable from "./orderTable";

export default function FinishOrderInfo() {
  const { id } = useParams<{ id: string }>();
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");

  const { data: orderData, isLoading } = useOrderById(Number(id));
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
        <span className="ml-4">Carregando dados do pedido...</span>
      </div>
    );
  }

  const orderDetails = orderData?.data;
  const confirmedPlans =
    orderDetails?.plan ||
    orderDetails?.plans ||
    orderDetails?.workspace_plans ||
    [];
  const basicInfo = orderDetails
    ? {
        cnpj: orderDetails.cnpj || orderDetails.company_cnpj,
        email: orderDetails.email || orderDetails.manager_email,
        manager_name:
          orderDetails.manager_name ||
          orderDetails.manager_name ||
          orderDetails.name,
        managerPhone: orderDetails.managerPhone || orderDetails.manager_phone,
        isVivoClient: orderDetails.isVivoClient || orderDetails.is_vivo_client,
        acceptContact:
          orderDetails.acceptContact || orderDetails.accept_contact,
      }
    : null;

  const companyInfo = orderDetails
    ? {
        domainName:
          orderDetails.domainName ||
          orderDetails.domain_name ||
          orderDetails.company_domain,
        alreadyHaveWorkspace:
          orderDetails.alreadyHaveWorkspace ||
          orderDetails.already_have_workspace,
        acceptTerms: orderDetails.acceptTerms || orderDetails.accept_terms,
      }
    : null;

  interface Plan {
    id: string;
    planName: string;
    price: string;
    users: number;
    type: string;
  }

  const getTotalPrice = () => {
    return confirmedPlans.reduce((total: number, plan: Plan) => {
      return total + parseFloat(plan.price.replace(",", ".")) * plan.users;
    }, 0);
  };

  const getTotalUsers = () => {
    return confirmedPlans.reduce(
      (total: number, plan: Plan) => total + plan.users,
      0
    );
  };
  // Informações do Comprador
  const infoComprador = (
    <div className="flex flex-col items-start rounded-[26px] w-full p-4 gap-8 ">
      <div className="flex flex-col bg-white text-neutral-800 gap-2 w-full  rounded-lg min-h-[120px] p-4">
        {/* CNPJ e Nome do Gestor */}
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Nome do Gestor:</strong> {basicInfo?.manager_name || "-"}
          </p>{" "}
          <p>
            <strong>CNPJ:</strong> {basicInfo?.cnpj || "-"}
          </p>
        </div>

        {/* Mobile: CNPJ e Nome do Gestor em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px] w-full text-neutral-700">
          <p>
            <strong>Nome do Gestor:</strong> {basicInfo?.manager_name || "-"}
          </p>{" "}
          <p>
            <strong>CNPJ:</strong> {basicInfo?.cnpj || "-"}
          </p>
        </div>

        {/* Email e Telefone */}
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Cliente Vivo:</strong>{" "}
            {basicInfo?.isVivoClient ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Email:</strong> {basicInfo?.email || "-"}
          </p>
        </div>

        {/* Mobile: Email e Cliente Vivo em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px] w-full text-neutral-700">
          <p>
            <strong>Cliente Vivo:</strong>{" "}
            {basicInfo?.isVivoClient ? "Sim" : "Não"}
          </p>{" "}
          <p>
            <strong>Email:</strong> {basicInfo?.email || "-"}
          </p>
        </div>
        {/* Email e Telefone */}
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Já possui Workspace:</strong>{" "}
            {companyInfo?.alreadyHaveWorkspace ? "Sim" : "Não"}
          </p>{" "}
          <p>
            <strong>Domínio da Empresa:</strong>{" "}
            {companyInfo?.domainName || "-"}
          </p>
        </div>

        {/* Mobile: Email e Cliente Vivo em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px]  text-neutral-700">
          <p>
            <strong>Já possui Workspace:</strong>{" "}
            {companyInfo?.alreadyHaveWorkspace ? "Sim" : "Não"}
          </p>{" "}
          <p>
            <strong>Domínio da Empresa:</strong>{" "}
            {companyInfo?.domainName || "-"}
          </p>
        </div>
      </div>
    </div>
  );

  // Resumo do Pedido
  const resumoPedido = (
    <div className="flex flex-col bg-white items-start rounded-[26px] w-full pr-10 p-4 gap-8">
      <div className="flex m-3 flex-col w-full gap-4">
        <div className="px-2">
          <p className="text-[15px]">Resumo Google Workspace</p>
        </div>

        <div className="flex w-full justify-between px-2">
          <p className="text-[14px] text-[#666666]">Quantidade de Planos</p>
          <p className="text-end">{confirmedPlans.length}</p>
        </div>
        <hr className="border-t border-neutral-300 mb-2 w-full" />

        <div className="flex w-full justify-between px-2">
          <p className="text-[14px] text-[#666666]">Total de Usuários</p>
          <p className="text-end">{getTotalUsers()}</p>
        </div>
        <hr className="border-t border-neutral-300  w-full" />
      </div>

      <div className="flex flex-col w-full items-start mx-3 gap-2">
        <div className="flex w-full justify-between text-[16px] font-bold">
          <p className="text-[#666666]">Valor Total Mensal</p>
          <p className="text-end text-[#660099]">R$ {getTotalPrice()},00/mês</p>
        </div>
      </div>
    </div>
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <p className="text-[15px]">Detalhes dos Planos</p>,
      children: <OrderTable confirmedPlans={confirmedPlans} />,
    },
    {
      key: "2",
      label: <p className="text-[15px]">Informações do Comprador</p>,
      children: infoComprador,
    },

    {
      key: "3",
      label: <p className="text-[15px]">Resumo do Pedido</p>,
      children: resumoPedido,
    },
  ];

  return (
    <div className="min-h-[100vh] flex flex-col flex-1 px-8 pt-8 pb-4 bg-[#f1f1f1]">
      <div className="flex flex-col gap-4 lg:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4 ">
          <img
            src="/Vivo-Empresas.png"
            className="h-5 md:h-8 hover:cursor-pointer"
            alt="Vivo Empresas"
          />

          <div className="h-4 md:h-6 border-l border-gray-400"></div>

          <a
            href="https://www.goldempresas.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Gold-Logo.png"
              className="h-5 md:h-10"
              alt="Gold Empresas"
            />
          </a>
        </div>
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
          {hasWorkspace !== "true" && (
            <>
              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
                  <Check size={16} />
                </div>
                <span className="text-[12px] text-[#660099] font-medium">
                  Dados
                </span>
              </div>
              <div className="w-8 h-px bg-[#660099] mt-[-12px]"></div>
            </>
          )}

          <div className="flex flex-col gap-1 items-center">
            <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
              <Check size={16} />
            </div>
            <span className="text-[12px] text-[#660099] font-medium">
              Confirmação
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-[617px]">
        <div className="flex w-full justify-between mb-2">
          <h1 className="flex items-center justify-center text-[18px] md:text-[20px] lg:text-[20px] font-semibold">
            Pedido Nº {orderDetails?.id || "-"}
          </h1>
          <div className="">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorBorder: "#660099",
                    colorText: "#660099",
                    colorPrimaryHover: "#cb1ef5",
                    colorPrimaryBorderHover: "#cb1ef5",
                  },
                },
              }}
            >
              <Button type="default" variant="solid" disabled>
                Gerar PDF
              </Button>
            </ConfigProvider>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 gap-4 mb-6">
          <div className="flex gap-2 items-start justify-center w-full max-w-[900px]">
            <div className="text-[36px] md:text-[64px] lg:text-[64px] flex text-[#660099] mr-2">
              <MailOutlined />
            </div>
            <div className="flex flex-col text-[13px] md:text-[16px] lg:text-[16px]">
              <p>
                <span className="font-bold">1.</span> Em breve você receberá um
                e-mail da VIVO através do remetente{" "}
                <span className="font-bold">noreply@vivo.com.br</span> para dar
                o <span className="font-bold">aceite digital.</span>
              </p>
              <p>
                <span className="text-red-700 font-bold">Importante:</span> Caso
                não encontre o e-mail em sua caixa de entrada, lembre-se de
                verificar o{" "}
                <span className="font-bold">spam ou lixo eletrônico</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 w-full max-w-[900px]">
            <div className="text-[36px] md:text-[64px] lg:text-[64px] text-[#660099] flex mr-2">
              <SignatureOutlined />
            </div>
            <div className="text-[13px] md:text-[16px] lg:text-[16px]">
              <p>
                <span className="font-bold">2.</span> Uma vez validado, o pedido
                tramitará e as licenças estarão disponíveis para utilização. Um
                consultor técnico estará em contato para auxiliá-lo em qualquer
                dúvida que possa surgir. Caso o seu processo seja de migração,
                fique tranquilo: nada na sua conta será alterado. Apenas
                vincularemos a cobrança a Vivo, deixado de utilizá-la com o
                fornecedor atual.
              </p>
            </div>
          </div>
        </div>

        <Collapse items={items} ghost defaultActiveKey={["1"]} />
      </div>
    </div>
  );
}
