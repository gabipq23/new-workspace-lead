import { Button, ConfigProvider, Collapse, Spin } from "antd";
import type { CollapseProps } from "antd";

import { useParams } from "react-router-dom";
import { useOrderById } from "../../../controller/controller";
import OrderTable from "./orderTable";
import Header from "../components/header";
import {
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  MessageSquareMore,
} from "lucide-react";
import InfoComprador from "./buyersInfo";

export default function FinishOrderInfo() {
  const { id } = useParams<{ id: string }>();

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
        company_name: orderDetails.company_name || orderDetails.company_name,
        cpf: orderDetails.cpf || orderDetails.cpf,
        buyers_phone: orderDetails.buyers_phone || orderDetails.buyers_phone,
        domain: orderDetails.domain_name,
        alreadyHaveWorkspace:
          orderDetails.alreadyHaveWorkspace ||
          orderDetails.already_have_workspace,
      }
    : null;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between ">
          <p className="text-[15px] min-w-[140px]">Detalhes dos Planos</p>
          <div className="flex w-full justify-end">
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
      ),
      children: <OrderTable confirmedPlans={confirmedPlans} />,
    },
    {
      key: "2",
      label: <p className="text-[15px]">Informações do Comprador</p>,
      children: <InfoComprador basicInfo={basicInfo} />,
    },
  ];

  return (
    <div className="min-h-[100vh] ">
      <Header />

      <div className="flex gap-4  items-center  mb-8 flex-col px-6 pt-4 pb-4 ">
        {/* Main Content */}
        <div className="flex flex-col min-h-[617px]">
          {/* Top Section: Title and Alert */}
          <div className="flex flex-col lg:flex-row w-full gap-1 mb-1">
            <div className="flex flex-col gap-2 py-2 pb-4  lg:w-4/6">
              <div className="flex items-center gap-2">
                <div className="text-[#660099] ">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h2
                    style={{ margin: 0 }}
                    className="text-[20px] flex  items-center gap-2  text-[#222] "
                  >
                    Seu pedido está quase concluído!
                  </h2>
                  <p style={{ margin: 0 }} className="text-[15px] text-[#222]">
                    Em breve, você receberá um SMS para realizar a biometria e
                    dar continuidade ao seu pedido.
                  </p>
                </div>
              </div>

              {/* Próximos Passos */}
              <div className="flex flex-col gap-4 bg-white rounded-[26px] w-full p-4 ">
                <h3 className="text-[15px]">PRÓXIMOS PASSOS</h3>

                <div className="flex flex-col gap-2 text-[14px]">
                  <div className="flex items-start gap-2">
                    <span className="font-bold min-w-[120px] flex gap-2 items-start text-[#660099]">
                      <MessageSquareMore /> Fique atento:
                    </span>
                    <span>
                      Você receberá um <span className="font-bold">SMS</span>{" "}
                      com as instruções para fazer sua biometria e finalizar
                      esta etapa.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#660099]">
                      <MessageCircle />
                    </span>
                    <span>
                      Se for necessário confirmar seus dados, vamos entrar em
                      contato pelo Whatsapp{" "}
                      <span className="font-bold">(11) 3386-2721</span>.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Box */}
            <div className="flex flex-2 lg:w-2/6 gap-4 flex-col justify-center items-center bg-[#fffbe6] border border-[#ffe58f] rounded-[16px] p-6 mb-4 md:mb-2 py-4 min-h-[140px] shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#faad14] ">
                  <AlertTriangle size={28} />
                </span>
                <span className="text-[#660099] font-bold text-[16px]">
                  FIQUE ATENTO:
                </span>
              </div>

              <p className="text-[14px]">
                A Vivo nunca entra em contato solicitando dados bancários ou de
                cartão de crédito. Para sua segurança, nunca forneça estes
                dados.
              </p>
            </div>
          </div>

          {/* Collapse for Detalhes dos Planos and Informações do Comprador */}
          <Collapse items={items} ghost defaultActiveKey={["1"]} />
        </div>
      </div>
    </div>
  );
}
