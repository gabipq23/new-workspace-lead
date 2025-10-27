import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <div
      id="depoimentos"
      className="flex flex-col text-[#5f6368] bg-[#f7f7f7] px-6 md:px-24 lg:px-32 w-full py-14 justify-center items-center"
    >
      <p
        style={{ margin: 0 }}
        className="text-[18px] font-normal text-gray-600 "
      >
        DEPOIMENTOS
      </p>
      <h2 className="text-[32px] font-normal text-[#660099] mb-8">
        O que os clientes dizem
      </h2>

      <div className="flex flex-wrap mt-4 flex-row items-center justify-center gap-8">
        <div className="relative  flex justify-center items-center bg-gray-100 w-[300px] h-[240px] py-12 pb-6 px-6 border-2 border-gray-200 rounded-2xl shadow-md">
          <span className="absolute top-2 left-2 text-gray-600 rotate-180 ">
            <Quote />
          </span>

          <p className="text-[18px] text-center">
            Centralizamos o pagamento na fatura Vivo e liberamos o limite do
            cartão para outras despesas. Isso facilitou nosso fluxo de caixa.
          </p>

          <span className="absolute bottom-3 right-2 text-gray-600 ">
            <Quote />
          </span>
        </div>

        <div className="relative bg-gray-100 flex justify-center items-center w-[300px] h-[240px] py-12 pb-6 px-6 border-2 border-gray-200 rounded-2xl shadow-md">
          <span className="absolute top-2 left-2 text-gray-600 rotate-180 ">
            <Quote />
          </span>

          <p className="text-[18px] text-center">
            Em poucas horas tudo estava configurado e a equipe de suporte deixou
            tudo funcionando. Recomendo para empresas que precisam agilidade.
          </p>

          <span className="absolute bottom-3 right-2 text-gray-600 ">
            <Quote />
          </span>
        </div>

        <div className="relative bg-gray-100 flex justify-center items-center w-[300px] h-[240px] py-12 pb-6 px-6 border-2 border-gray-200 rounded-2xl shadow-md">
          <span className="absolute top-2 left-2 text-gray-600 rotate-180 ">
            <Quote />
          </span>

          <p className="text-[18px] text-center">
            A Vivo cuidou da migração e da parte técnica; minha equipe pôde
            continuar trabalhando sem interrupção.
          </p>

          <span className="absolute bottom-3 right-2 text-gray-600 ">
            <Quote />
          </span>
        </div>
      </div>
    </div>
  );
}
