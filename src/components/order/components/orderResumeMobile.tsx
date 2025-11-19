import { Button, ConfigProvider } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";
import type { Plan } from "../../../interfaces/order";

export default function OrderResumeMobile({
  confirmedPlans,
  getTotalUsers,
  getTotalPrice,
  setShowServices,
  showServices,
  orderData,
}: any) {
  return (
    <>
      <div className=" w-full flex flex-col bg-[#660099] text-white  pt-2">
        <div className=" flex items-end justify-end text-[12px] gap-2 px-3">
          <span className="text-white">🛒</span>
          <span className="">Planos</span>
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
              {(orderData?.data?.plans || confirmedPlans)?.length > 0
                ? `${
                    (orderData?.data?.plans || confirmedPlans)?.length
                  } plano(s)`
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

        {(orderData?.data?.plans || confirmedPlans).length > 0 && (
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

        {showServices &&
          (orderData?.data?.plans || confirmedPlans)?.length > 0 && (
            <div className="p-4 bg-purple-100">
              <h4
                style={{ fontWeight: "bold" }}
                className="text-[#660099] font-medium mb-3 text-[12px]"
              >
                Planos selecionados
              </h4>

              {(orderData?.data?.plans || confirmedPlans)?.map(
                (plan: Plan, index: number) => (
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
                )
              )}
            </div>
          )}
      </div>
    </>
  );
}
