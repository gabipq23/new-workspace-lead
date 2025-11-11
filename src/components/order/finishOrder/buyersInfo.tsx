import { formatCNPJ } from "../../../utils/formatCNPJ";
import { formatCPF } from "../../../utils/formatCPF";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";

export default function InfoComprador(basicInfo: any) {
  console.log(basicInfo);
  return (
    <div className="flex flex-col items-start rounded-[26px] w-full p-4 pt-0 gap-8 ">
      <div className="flex flex-col bg-white text-neutral-800 gap-2 w-full  rounded-lg min-h-[120px] p-4">
        {/* CNPJ e Nome do Gestor */}
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Razão Social:</strong>{" "}
            {basicInfo.basicInfo?.company_name || "-"}
          </p>{" "}
          <p>
            <strong>CNPJ:</strong>{" "}
            {formatCNPJ(basicInfo.basicInfo?.cnpj) || "-"}
          </p>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Nome:</strong> {basicInfo.basicInfo?.manager_name || "-"}
          </p>{" "}
          <p>
            <strong>CPF:</strong> {formatCPF(basicInfo.basicInfo?.cpf) || "-"}
          </p>
        </div>

        {/* Mobile: CNPJ e Nome do Gestor em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px] w-full text-neutral-700">
          <p>
            <strong>Razão Social:</strong>{" "}
            {basicInfo.basicInfo?.company_name || "-"}
          </p>{" "}
          <p>
            <strong>CNPJ:</strong>{" "}
            {formatCNPJ(basicInfo.basicInfo?.cnpj) || "-"}
          </p>
        </div>

        {/* Mobile: CNPJ e Nome do Gestor em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px] w-full text-neutral-700">
          <p>
            <strong>Nome:</strong> {basicInfo.basicInfo?.manager_name || "-"}
          </p>{" "}
          <p>
            <strong>CPF:</strong> {formatCPF(basicInfo.basicInfo?.cpf) || "-"}
          </p>
        </div>

        {/* Email e Telefone */}
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Telefone:</strong>{" "}
            {formatPhoneNumber(basicInfo.basicInfo?.managerPhone) || "-"}
          </p>
          <p>
            <strong>Email:</strong> {basicInfo.basicInfo?.email || "-"}
          </p>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Telefone Secundário:</strong>{" "}
            {formatPhoneNumber(basicInfo.basicInfo?.second_manager_phone) ||
              "-"}
          </p>
          <p>
            <strong>Cliente Vivo:</strong>{" "}
            {basicInfo.basicInfo?.isVivoClient ? "Sim" : "Não"}
          </p>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-28 text-[14px] w-full text-neutral-700">
          <p>
            <strong>Já possui Workspace:</strong>
            {basicInfo.basicInfo?.alreadyHaveWorkspace ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Domínio:</strong> {basicInfo.basicInfo?.domain || "-"}
          </p>
        </div>

        {/* Mobile: Email e Cliente Vivo em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px] w-full text-neutral-700">
          <p>
            <strong>Telefone:</strong>{" "}
            {formatPhoneNumber(basicInfo.basicInfo?.managerPhone) || "-"}
          </p>
          <p>
            <strong>Email:</strong> {basicInfo.basicInfo?.email || "-"}
          </p>
        </div>

        {/* Mobile: Email e Cliente Vivo em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px]  text-neutral-700">
          <p>
            <strong>Telefone Secundário:</strong>{" "}
            {formatPhoneNumber(basicInfo.basicInfo?.second_manager_phone) ||
              "-"}
          </p>
          <p>
            <strong>Cliente Vivo:</strong>{" "}
            {basicInfo.basicInfo?.isVivoClient ? "Sim" : "Não"}
          </p>
        </div>
        {/* Mobile: Email e Cliente Vivo em coluna */}
        <div className="flex flex-col gap-2 md:hidden text-[14px]  text-neutral-700">
          <p>
            <strong>Já possui Workspace:</strong>
            {basicInfo.basicInfo?.alreadyHaveWorkspace ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Domínio:</strong> {basicInfo.basicInfo?.domain || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
