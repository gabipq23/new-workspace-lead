import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import { Button, ConfigProvider } from "antd";
import type { Plan } from "../../../interfaces/order";

export function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [showDetails, setShowDetails] = useState(false);

  const getPlanNameForCard = (planName: string) => {
    return `Business ${planName}`;
  };

  const getPlanDetailsForCard = (planName: string) => {
    const details = {
      Starter: [
        "E-mail comercial personalizado e seguro",
        "Videochamadas com 100 participantes",
        "30 GB de armazenamento em pool por usuário",
        "Controles de segurança e gerenciamento",
        "Suporte Padrão",
      ],
      Standard: [
        "E-mail comercial personalizado e seguro",
        "Videochamadas com 150 participantes + gravação",
        "2 TB de armazenamento em pool por usuário",
        "Controles de segurança e gerenciamento",
        "Suporte Padrão (upgrade pago para o Suporte Avançado)",
      ],
      Plus: [
        "E-mail corporativo personalizado e protegido, e-discovery e retenção",
        "Videochamadas com 500 participantes, gravação de reuniões e controle de presença",
        "5 TB de armazenamento em pool por usuário",
        "Segurança reforçada e controles de gerenciamento, incluindo o Vault e o Gerenciamento avançado de endpoints",
        "Suporte Padrão (upgrade pago para o Suporte Avançado)",
      ],
    };

    return details[planName as keyof typeof details] || details["Starter"];
  };

  return (
    <div className="border-b border-gray-200 pb-2">
      <div className="flex justify-between gap-2 p-3">
        <div className="text-start">
          <div className="text-gray-600 text-[10px] h-5 flex items-center  gap-2">
            Plano {index}{" "}
            <span className="bg-green-200 p-0.5 px-2 rounded-md">
              {plan.newPlan ? "Novo" : "Atual"}
            </span>
          </div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            {getPlanNameForCard(plan?.planName)}
          </div>
        </div>
        <div className="text-start">
          <div className="text-gray-600 text-[10px] h-5">Usuários</div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            {plan?.users}
          </div>
        </div>
        <div className="text-start">
          <div className="text-gray-600 text-[10px] h-5">Valor Total</div>
          <div
            style={{ fontWeight: "bold" }}
            className="text-[#660099] text-[13px]"
          >
            R$ {formatPrice(plan?.price, plan?.users)}/
            {plan?.type === "anual" ? "mês" : "mês"}
          </div>
        </div>
      </div>

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
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                ver menos <ChevronUp className="inline w-3 h-3" />
              </>
            ) : (
              <>
                ver mais <ChevronDown className="inline w-3 h-3" />
              </>
            )}
          </Button>
        </ConfigProvider>
      </div>

      {showDetails && (
        <div className="p-3 py-2 bg-purple-100">
          <h4
            style={{ fontWeight: "bold" }}
            className="text-[#660099] font-medium mb-3 text-[12px]"
          >
            Serviços inclusos
          </h4>

          <div className="flex justify-around">
            <img src="/icone-gmail.svg" alt="Gmail" className="w-7 h-7" />
            <img src="/icone-drive.svg" alt="Drive" className="w-7 h-7" />
            <img src="/icone-calendar.svg" alt="Calendar" className="w-7 h-7" />
            <img src="/icone-chat2.svg" alt="Meet" className="w-7 h-7" />
            <img src="/icone-docs.svg" alt="Sheets" className="w-7 h-7" />
            <img src="/icone-sheets.svg" alt="Docs" className="w-7 h-7" />
            <img src="/icone-slides.svg" alt="Slides" className="w-7 h-7" />
            <img src="/icone-form.svg" alt="Forms" className="w-7 h-7" />
            <img src="/icone-sites.svg" alt="Sites" className="w-7 h-7" />
          </div>
          <hr className="my-3 border-t border-gray-200" />
          <div className=" flex flex-col gap-1 text-[#660099] text-[11px]">
            {getPlanDetailsForCard(plan?.planName).map(
              (detail, detailIndex) => (
                <div key={detailIndex} className="flex gap-1 items-center ">
                  <span className="text-[#4f0077] ">
                    <CircleCheck size={11} />
                  </span>
                  <span>{detail}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
