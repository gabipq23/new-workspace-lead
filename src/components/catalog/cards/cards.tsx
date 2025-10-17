import { useState, useRef, useEffect } from "react";
import CardLayout from "./cardLayout";

export default function Cards() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // width of card + gap
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const cardsData = [
    {
      id: "starter",
      badge: "",
      badgeStyle:
        "text-[#1659b1] px-4 py-1 rounded-t-sm text-[11px] font-medium h-6",
      title: "Starter",
      storage: "30 GB de armazenamento em nuvem por usuário",
      price: "49,00",
      priceYear: "32,72",
      details: [
        {
          title: "E-mail @gmail",
          subtitle: "com possibilidade de integração ao domínio do cliente",
        },
        { title: "Videochamadas com 100 participantes" },
        { title: "Controles de segurança e gerenciamento" },
        { title: "Suporte padrão" },
      ],
    },
    {
      id: "standard",
      badge: "MAIS VENDIDO",
      badgeStyle:
        "bg-[#660099] text-white px-4 py-1 text-[10px] font-medium text-center",
      title: "Standard",
      storage: "2 TB de armazenamento em nuvem por usuário",
      price: "98,00",
      priceYear: "81,80",
      details: [
        {
          title: "E-mail comercial personalizado",
          subtitle:
            "você@suaempresa.com + layouts personalizados e mala direta",
        },
        { title: "Videochamadas com gravação e limite de 150 participantes" },
        { title: "Assistente de IA Gemini avançado" },
        { title: "Páginas de agendamento de horário" },
        { title: "Assinatura eletrônica em documentos" },
      ],
    },
    {
      id: "plus",
      badge: "",
      badgeStyle:
        "text-[#1659b1] px-4 py-1 rounded-t-sm text-[11px] font-medium h-6",
      title: "Plus",
      storage: "5 TB de armazenamento em nuvem por usuário",
      price: "154,00",
      priceYear: "128,40",
      details: [
        {
          title: "Todos os recursos do Standard",
          subtitle: "mais recursos avançados de segurança",
        },
        { title: "Videochamadas com até 500 participantes" },
        { title: "Controles avançados de conformidade" },
        { title: "Auditoria e relatórios avançados" },
        { title: "Suporte premium 24/7" },
      ],
    },
  ];

  return (
    <>
      <div
        id="ofertas"
        className="flex flex-col text-[#5f6368] bg-[#f7f7f7] items-start justify-around text-center px-6  md:px-24 lg:px-32   pt-16  w-full "
      >
        <h2
          style={{ margin: 0 }}
          className="text-[26px] md:text-[32px] text-[#5f6368] text-start "
        >
          Confira as ofertas com o Gemini incluso:
        </h2>
        <div className="w-full items-start justify-start flex lg:gap-8 ">
          {/* MOBILE  */}
          <div className="flex lg:hidden w-full flex-col ">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 px-6 py-6 w-full scrollbar-none"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {cardsData.map((cardData) => (
                <div
                  key={cardData.id}
                  className="flex-shrink-0 w-[260px] "
                  style={{ scrollSnapAlign: "center" }}
                >
                  <CardLayout cardData={cardData} />
                </div>
              ))}
            </div>

            {/* Custom Dots Indicator */}
            <div className="flex gap-2 mt-4">
              {cardsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-purple-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex py-8 gap-4">
            {cardsData.map((cardData) => (
              <CardLayout key={cardData.id} cardData={cardData} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start   justify-start text-start">
          <p style={{ margin: 0 }} className="text-[14px] text-[#5f6368] ">
            * Sujeito a análise de crédito
          </p>

          <p style={{ margin: 0 }} className="text-[14px] text-[#5f6368] ">
            * *Oferta válida para novos clientes Google Workspace, sujeito a
            análise de crédito
          </p>
        </div>
      </div>
    </>
  );
}
