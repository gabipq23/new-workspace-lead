import { useState } from "react";
import { Button, Input, Checkbox, Radio, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp, CircleCheck } from "lucide-react";

export default function CompanyInfo() {
  const [hasWorkspace, setHasWorkspace] = useState(false);
  const [cnpj, setCnpj] = useState("00.000.000/0000-00");

  const [cpf, setCpf] = useState("000.000.000-00");
  const [acceptContact, setAcceptContact] = useState(true);
  const [showServices, setShowServices] = useState(false);
  const [showServicesWeb, setShowServicesWeb] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/order");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] ">
      {/* mobile */}
      <div className="md:hidden flex flex-col bg-[#660099] text-white  pt-2">
        <div className=" flex items-end justify-end text-[12px] gap-2 px-3">
          <span className="text-white">🛒</span>
          <span className="">Seu plano</span>
        </div>

        <h3
          style={{ fontWeight: "bold", paddingInline: "12px" }}
          className="text-[14px] text-white "
        >
          Google Workspace
        </h3>

        <div className="flex justify-between gap-2  px-3">
          <div className="text-start">
            <div className="text-white text-[10px]">Plano</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              Business Starter
            </div>
          </div>
          <div className="text-start">
            <div className="text-white text-[10px]">Usuários</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              1
            </div>
          </div>
          <div className="text-start">
            <div className="text-white text-[10px]">Valor Total</div>
            <div
              style={{ fontWeight: "bold" }}
              className="text-[#ff7f17] text-[13px]"
            >
              R$ 49,00/mês
            </div>
          </div>
        </div>

        <div className="text-center bg-purple-100  ">
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
                  ver mais <ChevronDown className="inline w-3 h-3" />
                </>
              )}
            </Button>
          </ConfigProvider>
        </div>

        {showServices && (
          <div className="p-4 bg-purple-100">
            <h4
              style={{ fontWeight: "bold" }}
              className="text-[#660099] font-medium mb-3 text-[12px]"
            >
              Serviços inclusos
            </h4>

            <div className="flex justify-around">
              <img src="/icone-gmail.svg" alt="Gmail" className="w-8 h-8" />
              <img src="/icone-drive.svg" alt="Drive" className="w-8 h-8" />
              <img
                src="/icone-calendar.svg"
                alt="Calendar"
                className="w-8 h-8"
              />
              <img src="/icone-chat2.svg" alt="Meet" className="w-8 h-8" />
              <img src="/icone-docs.svg" alt="Sheets" className="w-8 h-8" />
              <img src="/icone-sheets.svg" alt="Docs" className="w-8 h-8" />
              <img src="/icone-slides.svg" alt="Slides" className="w-8 h-8" />
              <img src="/icone-form.svg" alt="Forms" className="w-8 h-8" />
              <img src="/icone-sites.svg" alt="Sites" className="w-8 h-8" />
            </div>
            <hr className="my-3 border-t border-gray-200" />
            <div className=" flex flex-col gap-1 text-[#660099] text-[10px]">
              <div className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>E-mail comercial personalizado e seguro</span>
              </div>
              <div className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>Videochamadas com 150 participantes + gravação</span>
              </div>
              <div className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>2 TB de armazenamento em pool por usuário</span>
              </div>
              <div className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>Controles de segurança e gerenciamento</span>
              </div>
              <div className="flex gap-1 items-center ">
                <span className="text-[#4f0077] ">
                  <CircleCheck size={11} />
                </span>
                <span>
                  Suporte Padrão (upgrade pago para o Suporte Avançado)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row items-center justify-between mb-8">
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
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[12px] font-semibold">
                  2
                </div>
                <span className="text-[12px] text-[#660099]">Dados</span>
              </div>
              <div className="w-8 h-px bg-gray-300 mt-[-12px]"></div>

              <div className="flex flex-col gap-1 items-center">
                <div className="w-6 h-6 bg-[#f7f7f7] border-1 border-gray-400 text-gray-500 rounded-full flex items-center justify-center text-[12px] font-semibold">
                  3
                </div>
                <span className="text-[12px] text-gray-400">Confirmação</span>
              </div>
            </div>
          </div>

          <h1 className="text-[18px] font-normal text-[#660099] ">
            Agora, informe os dados abaixo:
          </h1>

          <div className="mb-8 text-[12px]">
            <h3 className="text-[14px] text-gray-800 mb-4">
              Você possui G-Suite ou Workspace?
            </h3>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f97316",
                },
              }}
            >
              <Radio.Group
                value={hasWorkspace}
                onChange={(e) => setHasWorkspace(e.target.value)}
                className="flex gap-6 text-[14px]"
              >
                <Radio
                  onClick={() => setHasWorkspace(false)}
                  value={false}
                  className="text-gray-700 text-[12px]"
                >
                  Não
                </Radio>
                <Radio
                  onClick={() => setHasWorkspace(true)}
                  value={true}
                  className="text-gray-700 text-[12px]"
                >
                  Sim
                </Radio>
              </Radio.Group>
            </ConfigProvider>
          </div>
          {!hasWorkspace && (
            <>
              <div className="bg-orange-100 border border-orange-100 rounded-lg p-2 mb-8 flex items-center">
                <span className="text-orange-600 text-[12px] ">
                  Inclua 2 sugestões de domínios que gostaria de utilizar para
                  sua empresa no Google Workspace. Iremos avaliar a
                  disponibilidade para uso.
                </span>
              </div>
              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label className="flex items-center gap-1  text-[12px] text-gray-600 mb-2">
                    Sugestão 1
                  </label>
                  <Input size="middle" placeholder="dominio@gmail.com" />
                </div>
                <div className="w-full">
                  <label className="flex items-center gap-1  text-[12px] text-gray-600 mb-2">
                    Sugestão 1
                  </label>
                  <Input size="middle" placeholder="dominio@gmail.com" />
                </div>
              </div>
            </>
          )}

          <div className="mb-8 mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
              <div>
                <label className="block text-[12px] text-gray-600 mb-2">
                  CNPJ
                </label>
                <Input
                  size="middle"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-1  text-[12px] text-gray-600 mb-2">
                  CPF do representante
                </label>
                <Input
                  size="middle"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[12px] text-gray-600 mb-2">
                  E-mail
                </label>
                <Input size="middle" placeholder="Informe seu e-mail" />
              </div>

              <div>
                <label className="block  text-[12px] text-gray-600 mb-2">
                  Celular do contratante
                </label>
                <Input size="middle" placeholder="(00) 00000-0000    " />
              </div>
            </div>

            <div className="mb-8">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#f97316",
                  },
                }}
              >
                <Checkbox
                  checked={acceptContact}
                  onChange={(e) => setAcceptContact(e.target.checked)}
                  className="text-gray-600"
                >
                  Aceito e concordo com os termos e ocntratos.
                </Checkbox>
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:right-90 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="flex justify-end max-w-7xl mx-auto">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#22c55e",
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                className=" self-end"
              >
                Concluir pedido
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:flex flex-col  w-90 bg-[#660099] text-white p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white">🛒</span>
          <span className="font-medium">Seu plano</span>
        </div>

        <div className="bg-white text-gray-800 rounded-lg  relative">
          <div className="">
            <h3
              style={{ fontWeight: "bold", padding: "12px" }}
              className="text-[14px] text-[#660099]"
            >
              Google Workspace
            </h3>

            <div className="flex justify-between gap-2 p-3 pt-0 ">
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Plano</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  Business Starter
                </div>
              </div>
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Usuários</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  1
                </div>
              </div>
              <div className="text-start">
                <div className="text-gray-600 text-[10px]">Valor Total</div>
                <div
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] text-[13px]"
                >
                  R$ 49,00/mês
                </div>
              </div>
            </div>

            <div className="text-center bg-purple-100 rounded-b-md ">
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
                  onClick={() => setShowServicesWeb(!showServicesWeb)}
                >
                  {showServicesWeb ? (
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

            {showServicesWeb && (
              <div className="p-4 bg-purple-100">
                <h4
                  style={{ fontWeight: "bold" }}
                  className="text-[#660099] font-medium mb-3 text-[12px]"
                >
                  Serviços inclusos
                </h4>

                <div className="flex justify-around">
                  <img src="/icone-gmail.svg" alt="Gmail" className="w-8 h-8" />
                  <img src="/icone-drive.svg" alt="Drive" className="w-8 h-8" />
                  <img
                    src="/icone-calendar.svg"
                    alt="Calendar"
                    className="w-8 h-8"
                  />
                  <img src="/icone-chat2.svg" alt="Meet" className="w-8 h-8" />
                  <img src="/icone-docs.svg" alt="Sheets" className="w-8 h-8" />
                  <img src="/icone-sheets.svg" alt="Docs" className="w-8 h-8" />
                  <img
                    src="/icone-slides.svg"
                    alt="Slides"
                    className="w-8 h-8"
                  />
                  <img src="/icone-form.svg" alt="Forms" className="w-8 h-8" />
                  <img src="/icone-sites.svg" alt="Sites" className="w-8 h-8" />
                </div>
                <hr className="my-3 border-t border-gray-200" />
                <div className=" flex flex-col gap-1 text-[#660099] text-[11px]">
                  <div className="flex gap-1 items-center ">
                    <span className="text-[#4f0077] ">
                      <CircleCheck size={11} />
                    </span>
                    <span>E-mail comercial personalizado e seguro</span>
                  </div>
                  <div className="flex gap-1 items-center ">
                    <span className="text-[#4f0077] ">
                      <CircleCheck size={11} />
                    </span>
                    <span>Videochamadas com 150 participantes + gravação</span>
                  </div>
                  <div className="flex gap-1 items-center ">
                    <span className="text-[#4f0077] ">
                      <CircleCheck size={11} />
                    </span>
                    <span>2 TB de armazenamento em pool por usuário</span>
                  </div>
                  <div className="flex gap-1 items-center ">
                    <span className="text-[#4f0077] ">
                      <CircleCheck size={11} />
                    </span>
                    <span>Controles de segurança e gerenciamento</span>
                  </div>
                  <div className="flex gap-1 items-center ">
                    <span className="text-[#4f0077] ">
                      <CircleCheck size={11} />
                    </span>
                    <span>
                      Suporte Padrão (upgrade pago para o Suporte Avançado)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
