import { useState } from "react";
import { useOrderStore } from "../../../context/context";
import OrderResumeMobile from "../components/orderResumeMobile";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import OrderInformation from "./orderInformation";
import Header from "../components/header";
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
export default function FirstStep() {
  const { confirmedPlans } = useOrderStore();
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();
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
    <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
      <Header />

      {sessionStorage.getItem("status") === "fechado" ? (
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
                    navigate(`/order/${sessionStorage.getItem("id")}`);
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
          <div className="flex flex-col mb-20 md:flex-row min-h-[100vh] overflow-y-auto scrollbar-thin">
            {/* mobile */}
            <div className="md:hidden flex">
              <OrderResumeMobile
                confirmedPlans={confirmedPlans}
                getTotalUsers={getTotalUsers}
                getTotalPrice={getTotalPrice}
                setShowServices={setShowServices}
                showServices={showServices}
              />
            </div>

            <div className="flex flex-col flex-1 px-2 pt-4 justify-between bg-[#f7f7f7] min-h-[100vh] overflow-y-auto scrollbar-thin">
              <OrderInformation />
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
