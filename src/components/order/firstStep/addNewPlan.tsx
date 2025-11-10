import { Button, Input, Select, Tooltip } from "antd";
import { CircleAlert } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";
import type { Plan } from "../../../interfaces/order";
const { Option } = Select;
export default function AddNewPlan({
  hasWorkspace,
  confirmedPlans,
  newPlanInput,
  updateNewPlanInput,
  handleNewUserDecrease,
  handleNewUserIncrease,
  addNewPlan,
  removePlan,
  hasTriedSubmit,
}: any) {
  return (
    <div className=" mb-16">
      {/* <h2>{hasWorkspace === "true" && "Novos Planos"}</h2> */}
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
        ?.filter((plan: Plan) => plan.newPlan === true)
        ?.map((plan: Plan, index: number) => (
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
                <span className="text-gray-700 text-[13px]">{plan?.users}</span>
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
            {confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
              .length + 1}
            {hasWorkspace === "false" &&
              confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
                .length === 0 && <span className="text-red-500">*</span>}
          </label>
          <Select
            size="middle"
            value={newPlanInput?.planName || undefined}
            onChange={(value) => {
              const priceMap = {
                Starter: { mensal: "49,00", anual: "32,70" },
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
          {hasTriedSubmit &&
            !newPlanInput?.planName &&
            hasWorkspace === "false" &&
            confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
              .length === 0 && (
              <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
            )}
        </div>
        <div className="w-[120px]">
          <label className="block text-[12px] text-gray-600 mb-2">
            Quant. de Usuários
            {hasWorkspace === "false" &&
              confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
                .length === 0 && <span className="text-red-500">*</span>}
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
          {hasTriedSubmit &&
            newPlanInput.users < 1 &&
            hasWorkspace === "false" &&
            confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
              .length === 0 && (
              <p className="text-red-500 text-xs mt-1">
                Selecione pelo menos 1 usuário
              </p>
            )}
        </div>
        <div className="w-[100px]">
          <label className="block text-[12px] text-gray-600 mb-2">
            Modalidade
            {hasWorkspace === "false" &&
              confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
                .length === 0 && <span className="text-red-500">*</span>}
          </label>
          <Select
            size="middle"
            value={newPlanInput.type || undefined}
            onChange={(value) => {
              updateNewPlanInput("type", value);

              if (newPlanInput?.planName) {
                const priceMap = {
                  Starter: { mensal: "49,00", anual: "32,70" },
                  Standard: { mensal: "98,00", anual: "81,80" },
                  Plus: { mensal: "154,00", anual: "128,40" },
                };

                const price =
                  value === "anual"
                    ? priceMap[newPlanInput?.planName as keyof typeof priceMap]
                        .anual
                    : priceMap[newPlanInput?.planName as keyof typeof priceMap][
                        value as "mensal" | "anual"
                      ];

                updateNewPlanInput("price", price);
              }
            }}
            className="w-[100px]"
          >
            <Option value="mensal">Mensal</Option>
            <Option value="anual">Anual</Option>
          </Select>
          {hasTriedSubmit &&
            !newPlanInput.type &&
            hasWorkspace === "false" &&
            confirmedPlans.filter((plan: Plan) => plan.newPlan === true)
              .length === 0 && (
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
                R$ {formatPrice(newPlanInput?.price || "0", newPlanInput.users)}
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
    </div>
  );
}
