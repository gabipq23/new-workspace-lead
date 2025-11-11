import {
  Button,
  Collapse,
  ConfigProvider,
  Modal,
  type CollapseProps,
} from "antd";
import { useOrderInformation } from "./useOrderInformation";
import AddOldPlan from "./addOldPlan";
import AddNewPlan from "./addNewPlan";
import { useState } from "react";

export default function OrderInformation() {
  const {
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
    alreadyHaveWorkspace,
  } = useOrderInformation();
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddNewPlan, setShowAddNewPlan] = useState(false);
  const [modalAlreadyShown, setModalAlreadyShown] = useState(false);
  const [activeCollapseKeys, setActiveCollapseKeys] = useState<string[]>(
    hasWorkspace === "true" ? ["old"] : ["new"]
  );

  const collapseItems: CollapseProps["items"] = [];
  if (hasWorkspace === "true") {
    collapseItems.push({
      key: "old",
      label: (
        <h2
          style={{ margin: 0, padding: 0, fontWeight: "bold" }}
          className="  text-neutral-700 "
        >
          Planos Atuais
        </h2>
      ),
      children: (
        <AddOldPlan
          hasWorkspace="true"
          confirmedPlans={confirmedPlans}
          removePlan={removePlan}
          currentPlanInput={currentPlanInput}
          updateCurrentPlanInput={updateCurrentPlanInput}
          handleCurrentUserIncrease={handleCurrentUserIncrease}
          handleCurrentUserDecrease={handleCurrentUserDecrease}
          addCurrentPlan={addCurrentPlan}
          hasTriedSubmit={hasTriedSubmit}
        />
      ),
    });
  }
  if (showAddNewPlan) {
    collapseItems.push({
      key: "new",
      label: (
        <h2
          style={{ margin: 0, padding: 0, fontWeight: "bold" }}
          className="  text-neutral-700 "
        >
          Novos Planos
        </h2>
      ),
      children: (
        <AddNewPlan
          hasWorkspace={alreadyHaveWorkspace ? "true" : "false"}
          confirmedPlans={confirmedPlans}
          newPlanInput={newPlanInput}
          updateNewPlanInput={updateNewPlanInput}
          handleNewUserDecrease={handleNewUserDecrease}
          handleNewUserIncrease={handleNewUserIncrease}
          addNewPlan={addNewPlan}
          removePlan={removePlan}
          hasTriedSubmit={hasTriedSubmit}
        />
      ),
    });
  }
  return (
    <>
      <div className="flex flex-col flex-1 pb-4 pt-2 justify-between bg-[#f7f7f7] h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin">
        <div className="mb-10">
          <div
            className="flex items-center px-8 mb-2 justify-center gap-2 w-full max-w-[520px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto"
            style={{ minWidth: 0 }}
          >
            <div className="flex flex-col gap-1 items-center min-w-0">
              <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                1
              </div>
              <span className="text-[16px] text-[#660099] font-medium">
                Planos
              </span>
            </div>

            <div className="h-px bg-[#660099] mt-[-12px] flex-1 max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"></div>

            <div className="flex flex-col gap-1 items-center min-w-0">
              <div className="w-8 h-8 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[16px] font-semibold">
                2
              </div>
              <span className="text-[16px] text-[#660099]">Dados</span>
            </div>
            <div className="h-px bg-[#660099] mt-[-12px] flex-1 max-w-[80px] md:max-w-[120px] lg:max-w-[160px]"></div>

            <div className="flex flex-col gap-1 items-center min-w-0">
              <div className="w-8 h-8 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[16px] font-semibold">
                3
              </div>
              <span className="text-[16px] text-[#660099]">Verificação</span>
            </div>
          </div>

          <h1
            style={{ paddingInline: 32 }}
            className="text-[20px] px-8 font-normal text-[#660099]"
          >
            Olá! Vamos iniciar o seu pedido{" "}
            {hasWorkspace === "true" ? "de migração" : ""} online :)
          </h1>

          <div className="bg-orange-100 mx-8 border border-orange-100 rounded-lg p-2  flex items-center">
            <span className="text-orange-600 text-[12px] mr-2">🎁</span>
            <span className="text-orange-600 text-[12px]">
              <strong>Aproveite agora!</strong> Clientes Móvel Vivo Empresas
              ganham +2GB na contratação de Google Workspace
            </span>
          </div>

          <div
            style={{ margin: 0, padding: 0, marginInline: 16 }}
            className="mb-8 "
          >
            {hasWorkspace === "true" ? (
              <>
                {" "}
                <Collapse
                  size="large"
                  items={collapseItems}
                  ghost
                  activeKey={activeCollapseKeys}
                  onChange={(keys) => {
                    if (Array.isArray(keys)) {
                      setActiveCollapseKeys(keys as string[]);
                    } else if (typeof keys === "string") {
                      setActiveCollapseKeys([keys]);
                    }
                  }}
                />
              </>
            ) : (
              <div className="px-4 pt-4">
                <AddNewPlan
                  hasWorkspace={alreadyHaveWorkspace ? "true" : "false"}
                  confirmedPlans={confirmedPlans}
                  newPlanInput={newPlanInput}
                  updateNewPlanInput={updateNewPlanInput}
                  handleNewUserDecrease={handleNewUserDecrease}
                  handleNewUserIncrease={handleNewUserIncrease}
                  addNewPlan={addNewPlan}
                  removePlan={removePlan}
                  hasTriedSubmit={hasTriedSubmit}
                />
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:right-86 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="flex justify-center lg:justify-end  lg:max-w-7xl lg:mx-auto">
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
                onClick={() => {
                  if (
                    !modalAlreadyShown &&
                    hasWorkspace === "true" &&
                    !showAddNewPlan
                  ) {
                    setIsModalOpen(true);
                    setModalAlreadyShown(true);
                  } else {
                    handleSubmit();
                  }
                }}
              >
                Avançar
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Modal para perguntar se quer adicionar novos planos */}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          closable={false}
          footer={null}
          centered
          width={480}
        >
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-[#660099] text-2xl font-bold">
              Deseja aproveitar para adicionar
              <br />
              novos planos?
            </h2>

            <div className="flex justify-center gap-6">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#660099",
                    colorText: "#660099",
                    colorBorder: "#660099",
                    fontSize: 16,
                    colorPrimaryHover: "#9933cc",
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setIsModalOpen(false);
                    setShowAddNewPlan(true);
                    setActiveCollapseKeys(["new"]);
                  }}
                >
                  Sim
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setIsModalOpen(false);
                    handleSubmit();
                  }}
                  loading={isCreatingOrderLoading}
                  disabled={isCreatingOrderLoading}
                  className="self-end"
                >
                  Não
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
