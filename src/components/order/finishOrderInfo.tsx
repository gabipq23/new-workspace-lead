import { Check } from "lucide-react";

export default function FinishOrderInfo() {
  return (
    <div className="h-[100vh] flex flex-col flex-1 px-8 pt-8 pb-4  bg-[#f7f7f7] ">
      <div className="flex flex-col gap-4 lg:flex-row items-center justify-between ">
        <img src="/Vivo-Empresas.png" alt="Vivo Empresas" className="h-7" />

        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 items-center">
            <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
              <Check size={16} />
            </div>
            <span className="text-[12px] text-[#660099] font-medium">
              Produto
            </span>
          </div>
          <div className="w-8 h-px bg-[#660099] mt-[-12px]"></div>

          <div className="flex flex-col gap-1 items-center">
            <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
              <Check size={16} />
            </div>
            <span className="text-[12px] text-[#660099] font-medium">
              Dados
            </span>
          </div>
          <div className="w-8 h-px bg-[#660099] mt-[-12px]"></div>

          <div className="flex flex-col gap-1 items-center">
            <div className="w-6 h-6 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[12px] font-semibold">
              <Check size={16} />
            </div>
            <span className="text-[12px] text-[#660099] font-medium">
              Confirmação
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full items-center justify-center">
        <div className="max-w-5xl w-full text-center">
          <div className="mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-[16px]  text-gray-700 mb-6">
            Plano contratado com sucesso
          </h1>

          <div className="bg-purple-100 rounded-lg p-2 mb-2">
            <p style={{ margin: 0 }} className="text-gray-600 text-[10px] ">
              O código do seu pedido Google Workspace é{" "}
              <span className="text-orange-500 font-semibold">XEWUCB6LF8</span>
            </p>
          </div>

          <div className="bg-[#660099] text-white rounded-lg p-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
              <div className="space-y-4 text-start">
                <div className="text-start">
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    Plano
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    Google Workspace - Business Starter
                  </p>
                </div>
                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    CNPJ
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    01.234.400/0001-56
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    Usuários
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    1
                  </p>
                </div>
                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    Celular do gestor
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    (00) 00000-0000
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    Valor Total
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    R$ 49,00/mês
                  </p>
                </div>
                <div>
                  <p
                    style={{ margin: 0 }}
                    className="text-purple-200 text-[12px] mb-1"
                  >
                    E-mail
                  </p>
                  <p style={{ margin: 0 }} className="text-[14px]">
                    teste@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bg-[#ecececfa] text-[13px] rounded-lg text-gray-600 p-2">
            <p style={{ margin: 0 }}>
              <strong>Sua solicitação está em análise.</strong> Caso necessário,
              um consultor entrará em contato com você pelo telefone cadastrado
              para concluir a contratação. Você receberá notificações sobre sua
              fatura por e-mail cadastrado. Caso tenha alguma dúvidafale pelo
              WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
