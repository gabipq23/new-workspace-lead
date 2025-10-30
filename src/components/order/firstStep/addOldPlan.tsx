import { Button, Input, Modal, Select, Tooltip } from "antd";
import { CircleAlert } from "lucide-react";
import type { Plan } from "../../../interfaces/order";
import { formatPrice } from "../../../utils/formatPrice";
import { useState } from "react";
const { Option } = Select;
export default function AddOldPlan({
  hasWorkspace,
  confirmedPlans,
  removePlan,
  currentPlanInput,
  updateCurrentPlanInput,
  handleCurrentUserIncrease,
  handleCurrentUserDecrease,
  addCurrentPlan,
  hasTriedSubmit,
}: {
  hasWorkspace: string | null;
  confirmedPlans: Plan[];
  removePlan: (id: string) => void;
  currentPlanInput: {
    planName: string;
    price: string;
    users: number;
    type: string;
  };
  updateCurrentPlanInput: (
    field: keyof typeof currentPlanInput,
    value: string | number
  ) => void;
  handleCurrentUserIncrease: () => void;
  handleCurrentUserDecrease: () => void;
  addCurrentPlan: () => void;
  hasTriedSubmit: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Variáveis auxiliares para valores dos planos
  const mensalMap = { Starter: "49,00", Standard: "98,00", Plus: "154,00" };
  const anualMap = { Starter: "32,72", Standard: "81,80", Plus: "128,40" };
  const mensalNumMap = { Starter: "49.00", Standard: "98.00", Plus: "154.00" };
  const anualNumMap = { Starter: "32.72", Standard: "81.80", Plus: "128.40" };
  const planKey = (currentPlanInput.planName || "") as
    | "Starter"
    | "Standard"
    | "Plus";
  const mensalValue = mensalMap[planKey] || "0";
  const anualValue = anualMap[planKey] || "0";
  const mensalNumValue = mensalNumMap[planKey] || "0";
  const anualNumValue = anualNumMap[planKey] || "0";
  const users = currentPlanInput.users;
  const mensalTotal = Number(mensalNumValue.replace(",", ".")) * users * 12;
  const anualTotal = Number(anualNumValue.replace(",", ".")) * users * 12;
  const economia = mensalTotal - anualTotal;

  return (
    <>
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
                  disabled={currentPlanInput?.users <= 1}
                  style={{
                    backgroundColor:
                      currentPlanInput?.users > 1 ? "#f97316" : "#e5e7eb",
                    borderColor: "#d1d5db",
                    color: currentPlanInput.users > 1 ? "white" : "#9ca3af",
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
                  if (value === "mensal") {
                    setIsModalOpen(true);
                  }
                }}
                className="w-[100px]"
              >
                <Option value="mensal">Mensal</Option>
                <Option value="anual">Anual</Option>
              </Select>
              {hasTriedSubmit && !currentPlanInput.type && (
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
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              centered
              bodyStyle={{ padding: 32, borderRadius: 24, background: "#fff" }}
              style={{ borderRadius: 24 }}
            >
              <div style={{ textAlign: "center" }}>
                <h2 className="text-[#660099] text-[24px]">
                  Quer economizar 33% mudando
                  <br />
                  para o plano anual?
                </h2>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>
                    Simulação de economia
                  </span>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 8,
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      overflow: "hidden",
                      fontSize: 18,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRight: "1px solid #d1d5db",
                        background: "#f9fafb",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>Usuários</div>
                      <div>{users}</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRight: "1px solid #d1d5db",
                        background: "#f9fafb",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>Plano Mensal</div>
                      <div>R${formatPrice(mensalValue, users)}/ mês</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: 12,
                        background: "#f9fafb",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>Plano Anual</div>
                      <div>R${formatPrice(anualValue, users)}/ mês</div>
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          background: "#22c55e",
                          color: "#fff",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        -33%
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{ margin: "16px 0", fontSize: 20, fontWeight: 600 }}
                >
                  Economize por ano:{" "}
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>
                    R$
                    {economia.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}
                >
                  Aproveitar o desconto e mudar para o plano anual?
                </div>
                <div
                  style={{ display: "flex", justifyContent: "center", gap: 24 }}
                >
                  <Button
                    type="primary"
                    style={{
                      background: "#7c3aed",
                      borderColor: "#7c3aed",
                      fontWeight: 600,
                      fontSize: 16,
                      padding: "8px 24px",
                      borderRadius: 12,
                    }}
                    onClick={() => {
                      updateCurrentPlanInput("type", "anual");
                      updateCurrentPlanInput("price", anualValue);
                      setIsModalOpen(false);
                    }}
                  >
                    Sim, quero o desconto
                  </Button>
                  <Button
                    type="default"
                    style={{
                      borderColor: "#7c3aed",
                      color: "#7c3aed",
                      fontWeight: 600,
                      fontSize: 16,
                      padding: "8px 24px",
                      borderRadius: 12,
                    }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Não, manter mensal
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
