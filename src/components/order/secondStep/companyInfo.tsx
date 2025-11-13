import { useState } from "react";
import { Button, Input, ConfigProvider, Tooltip, Checkbox } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Check, CircleAlert } from "lucide-react";
import { useOrderStore } from "../../../context/context";
import {
  useOrderById,
  useOrderControler,
} from "../../../controller/controller";
import OrderResumeMobile from "../components/orderResumeMobile";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import Header from "../components/header";
import { CNPJInput, CPFInput, PhoneInput } from "../../../utils/input";

export default function CompanyInfo() {
  const { secondStepData, updateSecondStepData, confirmedPlans } =
    useOrderStore();
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const company_name = secondStepData.company_name || "";
  const cpf = secondStepData.cpf || "";
  const cnpj = secondStepData.cnpj || "";
  const email = secondStepData.email || "";
  const managerName = secondStepData.manager_name || "";
  const managerPhone = secondStepData.managerPhone || "";
  const domainName = secondStepData.domainName || "";
  const i_have_authorization = secondStepData.i_have_authorization || false;
  const [showServices, setShowServices] = useState(false);

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
  const { updateOrder, isUpdateOrderFetching } = useOrderControler();
  const { data: orderData } = useOrderById(Number(orderId));
  const navigate = useNavigate();

  const isFormValid = () => {
    const hasDomainName = domainName.trim() !== "";
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidManagerName = managerName.trim() !== "";
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasValidSecondPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasAuthorization = i_have_authorization === true;
    const hasValidCpf = cpf.replace(/\D/g, "").length === 11;

    return (
      hasDomainName &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidManagerName &&
      hasValidManagerPhone &&
      hasValidCpf &&
      hasValidSecondPhone &&
      hasAuthorization
    );
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);

    if (!isFormValid()) {
      return;
    }

    const updateData = {
      domainName,
      cnpj,
      email,
      manager_name: managerName,
      managerPhone,
      company_name,
      cpf,
      i_have_authorization,
    };

    updateSecondStepData({
      domainName,
      cnpj,
      email,
      manager_name: managerName,
      managerPhone,
      company_name,
      cpf,
      i_have_authorization,
    });

    try {
      await updateOrder({
        id: Number(orderId),
        data: updateData,
      });

      // clearOrder();
      navigate(`/verify-information/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
      <Header />

      {orderData?.data.status === "fechado" ? (
        <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
          <div className="flex flex-col items-center gap-4 min-h-[60vh] justify-center overflow-y-auto scrollbar-thin">
            <span>Seu pedido já foi finalizado!</span>

            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: "#660099",
                      colorPrimaryHover: "#883fa2",
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  variant="solid"
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    navigate(`/order/${orderData?.data.id}`);
                  }}
                >
                  Resumo do pedido
                </Button>{" "}
              </ConfigProvider>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
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

            <div className="flex flex-col flex-1 px-8 pt-6 pb-4 justify-between bg-[#f7f7f7] ">
              <div className="mb-12">
                <div
                  className="flex items-center mb-2 justify-center gap-2 w-full max-w-[520px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto"
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
                      2
                    </div>
                    <span className="text-[16px] text-[#660099]">Dados</span>
                  </div>
                  <div className="h-px bg-[#660099] mt-[-12px] flex-1 max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"></div>

                  <div className="flex flex-col gap-1 items-center min-w-0">
                    <div className="w-8 h-8 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[16px] font-semibold">
                      3
                    </div>
                    <span className="text-[16px] text-[#660099]">
                      Verificação
                    </span>
                  </div>
                </div>

                <div className="bg-white pl-6 p-3 rounded-2xl">
                  <div className="flex flex-col mb-4">
                    <h1 className="text-[20px] font-normal text-[#660099]">
                      Vamos completar seu pedido!
                    </h1>
                    <p style={{ margin: 0 }} className="text-[12px]">
                      Mais alguns passos para você aproveitar os serviços da
                      Vivo na sua Empresa.
                    </p>
                  </div>

                  {/* 1. Dados da Empresa */}
                  <div className="mb-8">
                    <h2
                      style={{
                        margin: 0,
                        padding: 0,
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                      className="  text-neutral-700 "
                    >
                      1. Dados da Empresa
                    </h2>
                    <div className="flex  gap-4 flex-wrap">
                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          CNPJ <span className="text-red-500">*</span>
                        </label>
                        <CNPJInput
                          name="cnpj"
                          format="##.###.###/####-##"
                          value={cnpj}
                          onValueChange={(values) =>
                            updateSecondStepData({ cnpj: values.value })
                          }
                          autoComplete="on"
                        />
                        {hasTriedSubmit &&
                          cnpj.replace(/\D/g, "").length !== 14 && (
                            <p
                              style={{ margin: 0, marginTop: 4 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              Campo obrigatório
                            </p>
                          )}
                      </div>

                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Razão Social
                          <span className="text-red-500">*</span>{" "}
                        </label>

                        <Input
                          name="company_name"
                          autoComplete="on"
                          value={company_name}
                          onChange={(e) =>
                            updateSecondStepData({
                              company_name: e.target.value,
                            })
                          }
                          size="middle"
                          placeholder="Razão Social"
                        />
                        {hasTriedSubmit && company_name.trim() === "" && (
                          <p
                            style={{ margin: 0, marginTop: 4 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            Campo obrigatório
                          </p>
                        )}
                      </div>

                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Domínio
                          <span className="text-red-500">*</span>{" "}
                          <Tooltip title="Um domínio é o que aparece depois de 'www'. Você o usuará para configurar endereços de e-mail, como info@example.com. Ajudaremos você a confirmar que o domínio pertence à empresa mais tarde.">
                            <span className="text-gray-500 cursor-pointer">
                              <CircleAlert size={14} />
                            </span>
                          </Tooltip>
                        </label>

                        <Input
                          name="domain_name"
                          autoComplete="on"
                          value={domainName}
                          onChange={(e) =>
                            updateSecondStepData({ domainName: e.target.value })
                          }
                          size="middle"
                          placeholder="dominio.com.br"
                        />
                        {hasTriedSubmit && domainName.trim() === "" && (
                          <p
                            style={{ margin: 0, marginTop: 4 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            Campo obrigatório
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2. Dados do Gestor */}
                  <div className="mb-8">
                    <h2
                      style={{
                        margin: 0,
                        padding: 0,
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                      className="  text-neutral-700 "
                    >
                      2. Dados do Gestor
                    </h2>
                    <div className="flex  gap-4 flex-wrap">
                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="managerName"
                          autoComplete="on"
                          value={managerName}
                          onChange={(e) =>
                            updateSecondStepData({
                              manager_name: e.target.value,
                            })
                          }
                          size="middle"
                          placeholder="Nome completo"
                        />
                        {hasTriedSubmit && managerName.trim() === "" && (
                          <p
                            style={{ margin: 0, marginTop: 4 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            Campo obrigatório
                          </p>
                        )}
                      </div>

                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1 text-[14px] text-gray-600 mb-2">
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          autoComplete="on"
                          value={email}
                          onChange={(e) =>
                            updateSecondStepData({ email: e.target.value })
                          }
                          size="middle"
                          placeholder="Informe seu e-mail"
                        />{" "}
                        {hasTriedSubmit &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                            <p
                              style={{ margin: 0, marginTop: 4 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              Campo obrigatório
                            </p>
                          )}
                        <p
                          style={{ margin: 0, marginTop: 8 }}
                          className="text-[11px] text-gray-500"
                        >
                          Sua assinatura digital será enviada nesse e-mail.
                        </p>
                      </div>

                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          Celular <span className="text-red-500">*</span>
                        </label>

                        <PhoneInput
                          name="manager_phone"
                          autoComplete="on"
                          format="(##) #####-####"
                          value={managerPhone}
                          onValueChange={(values) =>
                            updateSecondStepData({ managerPhone: values.value })
                          }
                        />
                        {hasTriedSubmit &&
                          managerPhone.replace(/\D/g, "").length !== 11 && (
                            <p
                              style={{ margin: 0, marginTop: 4 }}
                              className="text-red-500 text-xs "
                            >
                              Campo obrigatório
                            </p>
                          )}
                      </div>
                      <div className=" max-w-[200px] w-full">
                        <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                          CPF do representante legal{" "}
                          <span className="text-red-500">*</span>{" "}
                          <Tooltip title="CPF do administrador que possui responsabilidade integral sobre todos os atos da empresa.">
                            <span className="text-gray-500 cursor-pointer">
                              <CircleAlert size={14} />
                            </span>
                          </Tooltip>
                        </label>

                        <CPFInput
                          name="cpf"
                          autoComplete="on"
                          format="###.###.###-##"
                          value={cpf}
                          onValueChange={(values) =>
                            updateSecondStepData({ cpf: values.value })
                          }
                        />

                        {hasTriedSubmit && cpf.trim() === "" && (
                          <p
                            style={{ margin: 0, marginTop: 4 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            Campo obrigatório
                          </p>
                        )}

                        <ConfigProvider
                          theme={{
                            token: {
                              colorPrimary: "#660099",
                            },
                          }}
                        >
                          <div className="flex  items-start justify-start self-start gap-1 mt-2">
                            <Checkbox
                              checked={i_have_authorization}
                              onChange={(e) =>
                                updateSecondStepData({
                                  i_have_authorization: e.target.checked,
                                })
                              }
                            />
                            <p
                              style={{ margin: 0, marginTop: 4 }}
                              className="text-[11px] text-gray-500"
                            >
                              Tenho autorização legal para contratar em nome da
                              empresa.
                            </p>{" "}
                          </div>
                        </ConfigProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 pr-8 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
                <div className="flex justify-center lg:justify-end  lg:mx-auto">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#22c55e",
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        borderRadius: 20,

                        height: 44,
                        fontSize: "20px",
                      }}
                      size="large"
                      className="self-end w-full md:max-w-[600px] lg:max-w-[200px]"
                      onClick={handleSubmit}
                      loading={isUpdateOrderFetching}
                      disabled={isUpdateOrderFetching}
                    >
                      {isUpdateOrderFetching ? "Avançando..." : "Avançar"}
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
        </>
      )}
    </div>
  );
}
