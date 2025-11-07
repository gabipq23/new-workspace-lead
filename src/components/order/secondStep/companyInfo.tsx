// import { useState } from "react";
// import { Button, Input, Checkbox, ConfigProvider, Tooltip } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { Check, CircleAlert } from "lucide-react";
// import { useOrderStore } from "../../../context/context";
// import { useOrderControler } from "../../../controller/controller";
// import OrderResumeMobile from "../components/orderResumeMobile";
// import OrderResumeDesktop from "../components/orderResumeDesktop";
// import Header from "../components/header";
// import { CNPJInput, PhoneInput } from "../../../utils/input";

// export default function CompanyInfo() {
//   const { secondStepData, updateSecondStepData, confirmedPlans, clearOrder } =
//     useOrderStore();
//   const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

//   const cnpj = secondStepData.cnpj || "";
//   const email = secondStepData.email || "";
//   const managerName = secondStepData.manager_name || "";
//   const managerPhone = secondStepData.managerPhone || "";
//   const domainName = secondStepData.domainName || "";
//   const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
//   const acceptTerms = secondStepData.acceptTerms || false;
//   const [showServices, setShowServices] = useState(false);

//   const getTotalPrice = () => {
//     const confirmedPlansTotal = confirmedPlans.reduce((total, plan) => {
//       const numericPrice = parseFloat(plan.price.replace(",", "."));
//       return total + numericPrice * plan.users;
//     }, 0);
//     return confirmedPlansTotal.toFixed(2).replace(".", ",");
//   };

//   const getTotalUsers = () => {
//     return confirmedPlans.reduce((total, plan) => total + plan.users, 0);
//   };

//   const { orderId } = useParams<{ orderId: string }>();
//   const { updateOrder, isUpdateOrderFetching } = useOrderControler();

//   const navigate = useNavigate();

//   const isFormValid = () => {
//     const hasAcceptedTerms = acceptTerms === true;
//     const hasDomainName = domainName.trim() !== "";
//     const cnpjDigits = cnpj.replace(/\D/g, "");
//     const hasValidCnpj = cnpjDigits.length === 14;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const hasValidEmail = emailRegex.test(email);
//     const hasValidManagerName = managerName.trim() !== "";
//     const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
//     return (
//       hasAcceptedTerms &&
//       hasDomainName &&
//       hasValidCnpj &&
//       hasValidEmail &&
//       hasValidManagerName &&
//       hasValidManagerPhone
//     );
//   };

//   const handleSubmit = async () => {
//     setHasTriedSubmit(true);
//     const updateData = {
//       domainName,
//       alreadyHaveWorkspace: hasWorkspace,
//       acceptTerms: true,
//       cnpj,
//       email,
//       manager_name: managerName,
//       managerPhone,
//     };
//     console.log("Dados enviados no formulário:", updateData);
//     if (!isFormValid()) {
//       return;
//     }
//     updateSecondStepData({
//       domainName,
//       acceptTerms,
//       cnpj,
//       email,
//       manager_name: managerName,
//       managerPhone,
//     });

//     try {
//       await updateOrder({
//         id: Number(orderId),
//         data: updateData,
//       });

//       // await changeOrderStatus({
//       //   id: Number(orderId),
//       //   data: { status: "fechado" },
//       // });

//       clearOrder();

//       navigate(`/verify-information/${orderId}`);
//       window.scrollTo(0, 0);
//     } catch (error) {
//       console.error("Erro ao atualizar pedido:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-[100vh] overflow-y-auto scrollbar-thin">
//         {/* mobile */}
//         <div className="md:hidden flex ">
//           <OrderResumeMobile
//             confirmedPlans={confirmedPlans}
//             getTotalUsers={getTotalUsers}
//             getTotalPrice={getTotalPrice}
//             setShowServices={setShowServices}
//             showServices={showServices}
//           />
//         </div>

//         <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
//           <div>
//             <div className="flex flex-col gap-4 lg:flex-row items-center justify-center mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="flex flex-col gap-1 items-center">
//                   <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
//                     <Check />
//                   </div>
//                   <span className="text-[16px] text-[#660099] font-medium">
//                     Planos
//                   </span>
//                 </div>

//                 <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>

//                 <>
//                   <div className="flex flex-col gap-1 items-center">
//                     <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
//                       2
//                     </div>
//                     <span className="text-[16px] text-[#660099]">Dados</span>
//                   </div>
//                   <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>
//                 </>

//                 <div className="flex flex-col gap-1 items-center">
//                   <div className="w-8 h-8 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[16px] font-semibold">
//                     3
//                   </div>
//                   <span className="text-[16px] text-[#660099]">
//                     Verificação
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col gap-1 mb-4">
//               <h1
//                 style={{ margin: 0 }}
//                 className="text-[18px] font-normal text-neutral-800 "
//               >
//                 Olá, vamos completar seu pedido!
//               </h1>
//               <p style={{ margin: 0 }} className="text-[12px]">
//                 Mais alguns passos para você aproveitar os serviços da Vivo na
//                 sua Empresa.
//               </p>
//             </div>

//             {/* 1. Dados da Empresa */}
//             <div className="mb-8">
//               <h2 className="text-[16px] font-semibold text-neutral-800 mb-2">
//                 1. Dados da Empresa
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     CNPJ <span className="text-red-500">*</span>
//                   </label>

//                   <CNPJInput
//                     format="##.###.###/####-##"
//                     value={cnpj}
//                     onChange={(e) =>
//                       updateSecondStepData({ cnpj: e.target.value })
//                     }
//                   />
//                   {hasTriedSubmit && cnpj.replace(/\D/g, "").length !== 14 && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     Razão Social <span className="text-red-500">*</span>
//                   </label>
//                   <Input size="middle" placeholder="Razão Social" />{" "}
//                   {/* {hasTriedSubmit && cnpj.replace(/\D/g, "").length !== 14 && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )} */}
//                 </div>
//                 <div className="">
//                   <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
//                     Domínio
//                     <span className="text-red-500">*</span>{" "}
//                     <Tooltip title="Um domínio é o que aparece depois de 'www'. Você o usuará para configurar endereços de e-mail, como info@example.com. Ajudaremos você a confirmar que o domínio pertence à empresa mais tarde.">
//                       <span className="text-gray-500 cursor-pointer">
//                         <CircleAlert size={14} />
//                       </span>
//                     </Tooltip>
//                   </label>

//                   <Input
//                     value={domainName}
//                     onChange={(e) =>
//                       updateSecondStepData({ domainName: e.target.value })
//                     }
//                     size="middle"
//                     placeholder="dominio@gmail.com"
//                   />
//                   {hasTriedSubmit && domainName.trim() === "" && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* 2. Dados do Gestor */}
//             <div className="mb-8">
//               <h2 className="text-[16px] font-semibold text-neutral-800 mb-2">
//                 2. Dados do Gestor
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     Nome Completo <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     value={managerName}
//                     onChange={(e) =>
//                       updateSecondStepData({ manager_name: e.target.value })
//                     }
//                     size="middle"
//                     placeholder="Nome completo"
//                   />
//                   {hasTriedSubmit && managerName.trim() === "" && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     CPF <span className="text-red-500">*</span>
//                   </label>
//                   <Input size="middle" placeholder="CPF" />
//                   {/* {hasTriedSubmit && managerName.trim() === "" && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )} */}
//                 </div>
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     E-mail <span className="text-red-500">*</span>
//                   </label>
//                   <Input
//                     value={email}
//                     onChange={(e) =>
//                       updateSecondStepData({ email: e.target.value })
//                     }
//                     size="middle"
//                     placeholder="E-mail"
//                   />{" "}
//                   {hasTriedSubmit &&
//                     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
//                       <p
//                         style={{ margin: 0 }}
//                         className="text-red-500 text-xs mt-1"
//                       >
//                         Campo obrigatório
//                       </p>
//                     )}
//                   <span className="text-[11px] text-gray-500">
//                     Sua futura digital será enviada nesse e-mail.
//                   </span>
//                 </div>
//                 <div>
//                   <label className="block text-[13px] text-gray-700 mb-1">
//                     Celular <span className="text-red-500">*</span>
//                   </label>

//                   <PhoneInput
//                     format="(##) #####-####"
//                     value={managerPhone}
//                     onChange={(e) =>
//                       updateSecondStepData({ managerPhone: e.target.value })
//                     }
//                   />
//                   {hasTriedSubmit && managerPhone.trim() === "" && (
//                     <p
//                       style={{ margin: 0 }}
//                       className="text-red-500 text-xs mt-1"
//                     >
//                       Campo obrigatório
//                     </p>
//                   )}
//                   <div className="my-2">
//                     <ConfigProvider
//                       theme={{
//                         token: {
//                           colorPrimary: "#660099",
//                         },
//                       }}
//                     >
//                       <Checkbox>
//                         <p
//                           style={{ margin: 0 }}
//                           className="text-[11px] text-gray-500"
//                         >
//                           Tenho autorização legal para contratar em nome da
//                           empresa.
//                         </p>
//                       </Checkbox>
//                     </ConfigProvider>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-8 mt-4">
//               <div className="mb-8">
//                 <ConfigProvider
//                   theme={{
//                     token: {
//                       colorPrimary: "#f97316",
//                     },
//                   }}
//                 >
//                   <Checkbox
//                     checked={acceptTerms}
//                     onChange={(e) =>
//                       updateSecondStepData({ acceptTerms: e.target.checked })
//                     }
//                     className="text-gray-600"
//                   >
//                     <span className="text-red-500">*</span> Aceito e concordo
//                     com os termos e contratos.
//                   </Checkbox>
//                 </ConfigProvider>
//                 {hasTriedSubmit && !acceptTerms && (
//                   <p className="text-red-500 text-xs mt-1">
//                     Você deve aceitar os termos para continuar
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="fixed bottom-0 left-0 right-0 md:right-86 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
//             <div className="flex justify-end max-w-7xl mx-auto">
//               <ConfigProvider
//                 theme={{
//                   token: {
//                     colorPrimary: "#22c55e",
//                   },
//                 }}
//               >
//                 <Button
//                   type="primary"
//                   size="large"
//                   onClick={handleSubmit}
//                   loading={isUpdateOrderFetching}
//                   disabled={isUpdateOrderFetching}
//                   className=" self-end"
//                 >
//                   {isUpdateOrderFetching ? "Avançando..." : "Avançar"}
//                 </Button>
//               </ConfigProvider>
//             </div>
//           </div>
//         </div>

//         {/* desktop */}
//         <div className="hidden md:flex">
//           <OrderResumeDesktop
//             confirmedPlans={confirmedPlans}
//             getTotalPrice={getTotalPrice}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button, Input, ConfigProvider, Tooltip, Checkbox } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Check, CircleAlert } from "lucide-react";
import { useOrderStore } from "../../../context/context";
import { useOrderControler } from "../../../controller/controller";
import OrderResumeMobile from "../components/orderResumeMobile";
import OrderResumeDesktop from "../components/orderResumeDesktop";
import Header from "../components/header";
import { CNPJInput, PhoneInput } from "../../../utils/input";

export default function CompanyInfo() {
  const { secondStepData, updateSecondStepData, confirmedPlans, clearOrder } =
    useOrderStore();
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const cnpj = secondStepData.cnpj || "";
  const email = secondStepData.email || "";
  const managerName = secondStepData.manager_name || "";
  const managerPhone = secondStepData.managerPhone || "";
  const domainName = secondStepData.domainName || "";
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

  const { orderId } = useParams<{ orderId: string }>();
  const { updateOrder, isUpdateOrderFetching } = useOrderControler();

  const navigate = useNavigate();

  const isFormValid = () => {
    const hasDomainName = domainName.trim() !== "";
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidManagerName = managerName.trim() !== "";
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    return (
      hasDomainName &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidManagerName &&
      hasValidManagerPhone
    );
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);

    if (!isFormValid()) {
      return;
    }

    const updateData = {
      domainName,
      cnpj,
      email,
      manager_name: managerName,
      managerPhone,
    };

    console.log("Dados enviados no formulário:", updateData);

    updateSecondStepData({
      domainName,
      cnpj,
      email,
      manager_name: managerName,
      managerPhone,
    });

    try {
      await updateOrder({
        id: Number(orderId),
        data: updateData,
      });

      clearOrder();
      navigate(`/verify-information/${orderId}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] overflow-y-auto scrollbar-thin">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[100vh] overflow-y-auto scrollbar-thin">
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

        <div className="flex flex-col flex-1 px-8 pt-8 pb-4 justify-between bg-[#f7f7f7] ">
          <div>
            <div className="flex flex-col gap-4 lg:flex-row items-center justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1 items-center">
                  <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                    <Check />
                  </div>
                  <span className="text-[16px] text-[#660099] font-medium">
                    Planos
                  </span>
                </div>

                <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>

                <>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-8 h-8 bg-[#660099] border-1 border-[#660099] text-white rounded-full flex items-center justify-center text-[16px] font-semibold">
                      2
                    </div>
                    <span className="text-[16px] text-[#660099]">Dados</span>
                  </div>
                  <div className="w-60 h-px bg-[#660099] mt-[-12px]"></div>
                </>

                <div className="flex flex-col gap-1 items-center">
                  <div className="w-8 h-8 bg-[#f7f7f7] border-1 border-[#660099] text-[#660099] rounded-full flex items-center justify-center text-[16px] font-semibold">
                    3
                  </div>
                  <span className="text-[16px] text-[#660099]">
                    Verificação
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <h1
                style={{ margin: 0 }}
                className="text-[18px] font-normal text-neutral-800 "
              >
                Olá, vamos completar seu pedido!
              </h1>
              <p style={{ margin: 0 }} className="text-[12px]">
                Mais alguns passos para você aproveitar os serviços da Vivo na
                sua Empresa.
              </p>
            </div>

            {/* 1. Dados da Empresa */}
            <div className="mb-8">
              <h2 className="text-[16px] font-semibold text-neutral-800 mb-2">
                1. Dados da Empresa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    CNPJ <span className="text-red-500">*</span>
                  </label>
                  <CNPJInput
                    format="##.###.###/####-##"
                    value={cnpj}
                    onValueChange={(values) =>
                      updateSecondStepData({ cnpj: values.value })
                    }
                  />
                  {hasTriedSubmit && cnpj.replace(/\D/g, "").length !== 14 && (
                    <p
                      style={{ margin: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Campo obrigatório
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                    Razão Social
                    <span className="text-red-500">*</span>{" "}
                  </label>

                  <Input size="middle" placeholder="Razão Social" />
                  {hasTriedSubmit && domainName.trim() === "" && (
                    <p
                      style={{ margin: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Campo obrigatório
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="flex items-center gap-1  text-[14px] text-gray-600 mb-2">
                    Domínio
                    <span className="text-red-500">*</span>{" "}
                    <Tooltip title="Um domínio é o que aparece depois de 'www'. Você o usuará para configurar endereços de e-mail, como info@example.com. Ajudaremos você a confirmar que o domínio pertence à empresa mais tarde.">
                      <span className="text-gray-500 cursor-pointer">
                        <CircleAlert size={14} />
                      </span>
                    </Tooltip>
                  </label>

                  <Input
                    value={domainName}
                    onChange={(e) =>
                      updateSecondStepData({ domainName: e.target.value })
                    }
                    size="middle"
                    placeholder="dominio.com.br"
                  />
                  {hasTriedSubmit && domainName.trim() === "" && (
                    <p
                      style={{ margin: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Campo obrigatório
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Dados do Gestor */}
            <div className="mb-8">
              <h2 className="text-[16px] font-semibold text-neutral-800 mb-2">
                2. Dados do Gestor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={managerName}
                    onChange={(e) =>
                      updateSecondStepData({ manager_name: e.target.value })
                    }
                    size="middle"
                    placeholder="Nome completo"
                  />
                  {hasTriedSubmit && managerName.trim() === "" && (
                    <p
                      style={{ margin: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Campo obrigatório
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    CPF <span className="text-red-500">*</span>
                  </label>
                  <Input size="middle" placeholder="CPF" />
                  {hasTriedSubmit && managerName.trim() === "" && (
                    <p
                      style={{ margin: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Campo obrigatório
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={email}
                    onChange={(e) =>
                      updateSecondStepData({ email: e.target.value })
                    }
                    size="middle"
                    placeholder="E-mail"
                  />{" "}
                  {hasTriedSubmit &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <p
                        style={{ margin: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        Campo obrigatório
                      </p>
                    )}
                  <span className="text-[11px] text-gray-500">
                    Sua assinatura digital será enviada nesse e-mail.
                  </span>
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Celular <span className="text-red-500">*</span>
                  </label>

                  <PhoneInput
                    format="(##) #####-####"
                    value={managerPhone}
                    onValueChange={(values) =>
                      updateSecondStepData({ managerPhone: values.value })
                    }
                  />
                  {hasTriedSubmit &&
                    managerPhone.replace(/\D/g, "").length !== 11 && (
                      <p
                        style={{ margin: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        Campo obrigatório
                      </p>
                    )}
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#660099",
                      },
                    }}
                  >
                    <Checkbox>
                      <p
                        style={{ margin: 0 }}
                        className="text-[11px] text-gray-500"
                      >
                        Tenho autorização legal para contratar em nome da
                        empresa.
                      </p>{" "}
                    </Checkbox>
                  </ConfigProvider>
                </div>
              </div>
            </div>

            <div className="mb-20 md:mb-10"></div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 md:right-86 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
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
                  loading={isUpdateOrderFetching}
                  disabled={isUpdateOrderFetching}
                  className=" self-end"
                >
                  {isUpdateOrderFetching ? "Avançando..." : "Avançar"}
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden md:flex">
          <OrderResumeDesktop
            confirmedPlans={confirmedPlans}
            getTotalPrice={getTotalPrice}
          />
        </div>
      </div>
    </div>
  );
}
