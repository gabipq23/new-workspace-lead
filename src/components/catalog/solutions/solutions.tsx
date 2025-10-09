export default function Solutions() {
  return (
    <div className="flex flex-col text-[#5f6368] bg-[#f7f7f7] px-6 md:px-24 lg:px-32 w-full py-16 justify-center items-center">
      <div className="w-full">
        {/* Título */}
        <h2 className="text-[32px] font-normal text-gray-600 mb-8">
          Conheça mais soluções para sua empresa
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Cloud */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col h-full">
            <div className="mb-6">
              <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
                CLOUD
              </span>
              <h3 className="text-[20px] font-normal text-[#3c4043] mt-2 mb-4">
                As melhores tecnologias para aprimorar o seu negócio
              </h3>
            </div>

            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="w-32 h-32">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Nuvem roxa */}
                  <path
                    d="M150 100 C150 80, 120 60, 90 60 C70 60, 50 70, 50 90 C30 90, 20 110, 30 120 C30 140, 50 150, 70 150 L140 150 C160 150, 170 130, 150 100"
                    fill="#8b5cf6"
                  />
                  {/* Seta de upload */}
                  <path
                    d="M100 120 L100 80 M85 95 L100 80 L115 95"
                    stroke="#e879f9"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="#"
                className="inline-flex items-center text-[#8b5cf6] font-medium hover:underline"
              >
                Saiba mais
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card PME */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col h-full">
            <div className="mb-6">
              <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
                PME
              </span>
              <h3 className="text-[20px] font-normal text-[#3c4043] mt-2 mb-4">
                Conheça as ofertas para sua pequena ou média empresa.
              </h3>
            </div>

            <div className="flex-1 flex items-center justify-center mb-6">
              <div className="w-32 h-32">
                <img
                  src="/vivo-pme-card.png"
                  alt="PME Vivo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="#"
                className="inline-flex items-center text-[#8b5cf6] font-medium hover:underline"
              >
                Saiba mais
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
