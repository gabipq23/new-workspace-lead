import { Button, Checkbox, ConfigProvider, Input } from "antd";

import { CNPJInput, PhoneInput } from "../../../utils/input";

import { useOrderInformation } from "./useOrderInformation";
import AddOldPlan from "./addOldPlan";
import AddNewPlan from "./addNewPlan";

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
    cnpj,
    setCnpj,
    email,
    setEmail,
    manager_name,
    setmanager_name,
    managerPhone,
    setManagerPhone,
    hasWorkspace,
    acceptContact,
    setAcceptContact,
    hasTriedSubmit,
    handleSubmit,
    confirmedPlans,
    removePlan,
    currentPlanInput,
    updateCurrentPlanInput,
    handleCurrentUserIncrease,
    handleCurrentUserDecrease,
    addCurrentPlan,
    newPlanInput,
    updateNewPlanInput,
    handleNewUserIncrease,
    handleNewUserDecrease,
    addNewPlan,
    isCreatingOrderLoading,
  } = useOrderInformation(basicInfo, updateBasicInfo);

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
            <AddOldPlan
              hasWorkspace={hasWorkspace}
              confirmedPlans={confirmedPlans}
              removePlan={removePlan}
              currentPlanInput={currentPlanInput}
              updateCurrentPlanInput={updateCurrentPlanInput}
              handleCurrentUserIncrease={handleCurrentUserIncrease}
              handleCurrentUserDecrease={handleCurrentUserDecrease}
              addCurrentPlan={addCurrentPlan}
              hasTriedSubmit={hasTriedSubmit}
            />

            {/* plano novo */}
            <AddNewPlan
              hasWorkspace={hasWorkspace}
              confirmedPlans={confirmedPlans}
              newPlanInput={newPlanInput}
              updateNewPlanInput={updateNewPlanInput}
              handleNewUserDecrease={handleNewUserDecrease}
              handleNewUserIncrease={handleNewUserIncrease}
              addNewPlan={addNewPlan}
              removePlan={removePlan}
              hasTriedSubmit={hasTriedSubmit}
            />

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
