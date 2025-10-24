import { useState } from "react";

import { useOrderStore } from "../../../context/context";

import OrderResumeMobile from "../components/orderResumeMobile";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import OrderInformation from "./orderInformation";

export default function FirstStep() {
  const { basicInfo, updateBasicInfo, confirmedPlans } = useOrderStore();

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

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh]  ">
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

      <div className="flex flex-col flex-1 px-2 pt-4  justify-between bg-[#f7f7f7] h-[calc(100vh-60px)] overflow-y-auto scrollbar-thin ">
        <OrderInformation
          basicInfo={basicInfo}
          updateBasicInfo={updateBasicInfo}
        />
      </div>

      {/* desktop */}
      <div className="hidden md:flex">
        <OrderResumeDesktop
          confirmedPlans={confirmedPlans}
          getTotalPrice={getTotalPrice}
        />
      </div>
    </div>
  );
}
