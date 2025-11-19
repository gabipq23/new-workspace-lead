import type { Plan } from "../../../interfaces/order";
import { PlanCard } from "../firstStep/planCard";

export default function OrderResumeDesktop({
  confirmedPlans,
  getTotalPrice,
  orderData,
}: any) {
  return (
    <>
      <div className="hidden md:flex flex-col w-86 bg-[#660099] text-white p-6 mt-22 rounded-2xl mr-8 h-fit">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white">🛒</span>
          <span className="font-medium">Planos</span>
        </div>

        <div className="bg-white text-gray-800 rounded-lg relative">
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

            {(orderData?.data?.plans || confirmedPlans)?.map(
              (plan: Plan, index: number) => (
                <PlanCard key={plan?.id} plan={plan} index={index + 1} />
              )
            )}

            {/* Resumo Total */}
            {(orderData?.data?.plans || confirmedPlans)?.length > 0 && (
              <div className="p-3 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-gray-700">
                    Total Geral:
                  </span>
                  <span className="text-[14px] font-bold text-[#660099]">
                    R$ {getTotalPrice()}/mês
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
