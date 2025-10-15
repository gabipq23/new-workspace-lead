export default function BannerOffers() {
  return (
    <div className="flex flex-col text-[#5f6368] bg-[#f7f7f7] items-start justify-around text-center px-6 md:px-24 lg:px-32 pt-10  w-full ">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex  flex-col gap-2 items-center justify-centertext-center ">
          <h2
            style={{ margin: 0 }}
            className="text-[26px] md:text-[32px] text-[#660099]"
          >
            Benefícios Exclusivos para clientes Vivo Empresas
          </h2>
          <p className="text-gray-600 text-[16px] text-center">
            No app Vivo o colaborador tem acesso a benefícios que oferece
            gratuidades, descontos e experiências que podem ser resgatadas a
            qualquer momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {/* Perplexity */}
          <div className=" flex flex-col py-4 items-center justify-center gap-2 bg-white border border-gray-200 rounded-sm  px-4 text-center shadow-sm">
            <div className="w-full flex flex-col ">
              <img
                src="/perplexity.png"
                alt="Perplexity Logo"
                className=" w-36 self-center h-8"
              />
              <hr className="border-gray-300 mt-4 mb-2" />
            </div>

            <div className="">
              <div className="text-sm text-gray-500 line-through">
                de R$1137,90*
              </div>
              <div className="text-sm text-gray-500">
                por <strong className="text-gray-700">R$0,00</strong>
              </div>
            </div>

            <div className="text-md font-bold text-gray-700">
              1 ano grátis da
              <br />
              assinatura Pro
            </div>
          </div>

          {/* Cinemark */}
          <div className=" flex flex-col  py-4 items-center justify-center gap-2 bg-white border border-gray-200 rounded-sm  px-4 text-center shadow-sm">
            <div className="w-full flex flex-col ">
              <img
                src="/cinemark.svg"
                alt="Cinemark Logo"
                className=" w-36 self-center h-8"
              />
              <hr className="border-gray-300 mt-4 mb-2" />
            </div>

            <div className="">
              <div className="text-sm text-gray-500 line-through">
                de R$144,00
              </div>
              <div className="text-sm text-gray-500">
                por <strong className="text-gray-700">R$77,00</strong>
              </div>
            </div>
            <div className="text-md font-bold text-gray-700">
              50% de desconto
              <br />
              em ingressos**
            </div>
          </div>

          {/* Decolar */}
          <div className=" flex flex-col  py-4 items-center justify-center gap-2 bg-white border border-gray-200 rounded-sm  px-4 text-center shadow-sm">
            <div className="w-full flex flex-col ">
              <img
                src="/decolar-.png"
                alt="Decolar Logo"
                className=" w-28 self-center h-10"
              />
              <hr className="border-gray-300 mt-4 mb-2" />
            </div>
            <div className="">
              <div className="text-sm text-gray-500 ">Até 40% de desconto</div>
              <div className="text-md font-bold text-gray-700">+</div>
            </div>
            <div className="text-md font-bold text-gray-700">
              até 15% de
              <br />
              desconto adicional
            </div>
          </div>

          {/* Vale Bonus */}
          <div className=" flex flex-col  py-4 items-center justify-center gap-2 bg-white border border-gray-200 rounded-sm  px-4 text-center shadow-sm">
            <div className="w-full flex flex-col ">
              <img
                src="/vale_bonus.png"
                alt="Vale Bonus Logo"
                className=" w-36 self-center h-10"
              />
              <hr className="border-gray-300 mt-4 mb-2" />
            </div>
            <div className="">
              <div className="text-sm text-gray-500">
                Bônus para utilizar em
                <br />
                qualquer parceiro no APP
              </div>
            </div>
            <div className="text-md font-bold text-gray-700">
              Ganhe R$100 em
              <br />
              Vale Bonus
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xl font-medium text-gray-800">
            São mais de{" "}
            <span className="text-[#660099] font-bold">
              R$1.200,00 de economia.
            </span>{" "}
            <span className="font-bold">
              Oferta por tempo limitado. Aproveite!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
