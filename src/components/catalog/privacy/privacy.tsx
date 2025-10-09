export default function Privacy() {
  return (
    <div
      id="beneficios"
      className="flex flex-col gap-4 text-gray-600 bg-[#f7f7f7] items-start justify-center w-full  px-6 md:px-24 lg:px-32  "
    >
      <div className=" mx-8 ">
        <h2 className="text-[24px] md:text-[32px] text-[#5f6368] text-start  ">
          Principais benefícios do Google Workspace para sua empresa:{" "}
        </h2>
      </div>

      <div className="mx-8 w-full">
        {/* Layout Mobile - Vertical */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex items-start gap-4 mr-10  ">
            <div className="flex-shrink-0">
              <div className="w-12 h-12">
                <img src="/vivo-empresas-calendario.svg" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Use agendas compartilhadas para ver quando outras pessoas estão
                disponíveis e programe reuniões com convites automáticos por
                e-mail.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mr-10 ">
            <div className="flex-shrink-0">
              <div className="w-12 h-12">
                <img src="/vivo-empresas-upload-documentos.svg" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Trabalhe com facilidade em documentos, planilhas e apresentações
                em todos os seus dispositivos, com ou sem internet.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mr-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12">
                <img src="/vivo-empresas-arquivo.svg" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Centralize todo seu trabalho com acesso fácil e seguro, sem
                precisar usar anexos de e-mail.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mr-10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12">
                <img src="/vivo-empresas-escudo.svg" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Proteja os dados da sua empresa com diferentes opções de
                segurança, e use o gerenciamento de endpoints para manter os
                dados seguros.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Desktop - 4 Colunas Horizontais */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-8 md:py-8">
          <div className="flex flex-col items-start text-start">
            <div className="mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src="/vivo-empresas-calendario.svg"
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-[#666666] md:text-[14px] lg:text-[16px] leading-relaxed">
              Use agendas compartilhadas para ver quando outras pessoas estão
              disponíveis e programe reuniões com convites automáticos por
              e-mail.
            </p>
          </div>

          <div className="flex flex-col items-start text-start">
            <div className="mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src="/vivo-empresas-upload-documentos.svg"
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-[#666666] md:text-[14px] lg:text-[16px] leading-relaxed">
              Trabalhe com facilidade em documentos, planilhas e apresentações
              em todos os seus dispositivos, com ou sem internet.
            </p>
          </div>

          <div className="flex flex-col items-start text-start">
            <div className="mb-6">
              <div className="w-20 h-20 flex ">
                <img
                  src="/vivo-empresas-arquivo.svg"
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-[#666666] md:text-[14px] lg:text-[16px] leading-relaxed">
              Centralize todo seu trabalho com acesso fácil e seguro, sem
              precisar usar anexos de e-mail.
            </p>
          </div>

          <div className="flex flex-col items-start text-start">
            <div className="mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src="/vivo-empresas-escudo.svg"
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-[#666666] md:text-[14px] lg:text-[16px] leading-relaxed">
              Proteja os dados da sua empresa com diferentes opções de
              segurança, e use o gerenciamento de endpoints para manter os dados
              seguros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
