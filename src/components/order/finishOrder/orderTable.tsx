interface Plan {
  id: string;
  planName: string;
  price: string;
  users: number;
  type: string;
}
export default function OrderTable({
  confirmedPlans,
}: {
  confirmedPlans: Plan[];
}) {
  const getTotalPrice = () => {
    return confirmedPlans.reduce((total: number, plan: Plan) => {
      return total + parseFloat(plan.price.replace(",", ".")) * plan?.users;
    }, 0);
  };

  const getTotalUsers = () => {
    return confirmedPlans.reduce(
      (total: number, plan: Plan) => total + plan?.users,
      0
    );
  };
  return (
    <>
      <div className="flex flex-col items-center bg-white rounded-[26px] w-full p-4 py-4 ">
        {/* Desktop */}
        <div className="hidden lg:flex flex-col w-full ">
          <div className="flex items-center font-semibold text-[#666666] text-[15px] mb-1">
            <p className="w-64 text-center">Plano</p>
            <p className="w-28 text-center">Usuários</p>
            <p className="w-28 text-center">Modalidade</p>
            <p className="w-32 text-center">Valor Unitário</p>
            <p className="w-40 text-center">Valor Total</p>
          </div>
          <hr className="border-t border-neutral-300 mx-2 mb-1" />
          {confirmedPlans?.map((plan: Plan, index: number) => (
            <div key={plan?.id}>
              <div className="flex items-center py-4 text-[14px] text-neutral-700">
                <p className="text-[14px] font-semibold w-64 text-center">
                  Google Workspace Business {plan?.planName}
                </p>
                <p className="text-[14px] w-28 text-center">{plan?.users}</p>
                <p className="text-[14px] w-28 text-center capitalize">
                  {plan?.type}
                </p>
                <p className="text-[14px] font-semibold w-32 text-center">
                  R${" "}
                  {Number(plan.price.replace(",", "."))
                    .toFixed(2)
                    .replace(".", ",")}
                  /{plan?.type === "anual" ? "mês" : "mês"}
                </p>
                <p className="text-[16px] text-neutral-700 font-semibold w-40 text-center">
                  R${" "}
                  {(Number(plan.price.replace(",", ".")) * (plan?.users ?? 0))
                    .toFixed(2)
                    .replace(".", ",")}
                  /{plan.type === "anual" ? "mês" : "mês"}
                </p>
              </div>
              {index < confirmedPlans?.length - 1 && (
                <hr className="border-t border-neutral-300 mx-2" />
              )}
            </div>
          ))}{" "}
          <hr className="border-t border-neutral-300 mx-2 mb-4" />
          {/* Total row */}
          <div className="flex items-center py-2 text-[15px]  text-neutral-900">
            <p className="w-76 text-center ">Total</p>
            <p className="w-32 text-center ">{getTotalUsers()}</p>
            <p className="w-32 text-center "></p>
            <p className="w-40 text-center "></p>
            <p className="w-40 text-center ">R$ {getTotalPrice()},00/mês</p>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-wrap gap-4 lg:hidden">
          {confirmedPlans.map((plan: Plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col gap-2 border"
            >
              <div className="flex justify-between">
                <span className="font-semibold text-[#666] ">Plano:</span>
                <span className="text-end">
                  Google Workspace Business {plan?.planName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#666]">Usuários:</span>
                <span>{plan.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#666]">Modalidade:</span>
                <span className="capitalize">{plan.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#666]">
                  Valor Unitário:
                </span>
                <span>
                  R${" "}
                  {Number(plan.price.replace(",", "."))
                    .toFixed(2)
                    .replace(".", ",")}
                  /{plan.type === "anual" ? "mês" : "mês"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#666]">Valor Total:</span>
                <span className="font-bold">
                  R${" "}
                  {(Number(plan.price.replace(",", ".")) * (plan?.users ?? 0))
                    .toFixed(2)
                    .replace(".", ",")}
                  /{plan.type === "anual" ? "mês" : "mês"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
