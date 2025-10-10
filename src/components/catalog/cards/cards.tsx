import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Cards() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleDetails = (cardType: string) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };

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
      price: "49",
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
      price: "98",
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
      price: "154",
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

  const Card = ({ cardData }: { cardData: (typeof cardsData)[0] }) => (
    <div className="flex flex-col w-full items-center relative">
      {cardData.badge && (
        <div
          className={`${cardData.badgeStyle} absolute self-start rounded-r-sm rounded-tl-sm -top-2 z-10`}
        >
          {cardData.badge}
        </div>
      )}
      <div className="flex w-full max-w-[260px] flex-col border border-gray-300 rounded-sm bg-white shadow-sm">
        <div className=" flex flex-col gap-2">
          <div className="text-start pt-6 px-4">
            <p style={{ margin: 0 }} className=" text-[16px] ">
              Business
            </p>
            <h3 className="text-[32px]  ">{cardData.title}</h3>
          </div>
          <div className="px-4">
            <div className="flex  gap-1 ">
              <img src="/icone-google (16).svg" className="w-4 h-6 " />
              <p className="text-gray-700 text-sm text-start">
                {cardData.storage}
              </p>
            </div>
            <div className="flex gap-1 ">
              <img src="/icone-google (16).svg" className="w-4 h-6" />
              <p className="text-gray-700 text-sm">Gemini Incluso</p>
              <p> </p>
            </div>
          </div>

          <div className=" mx-4 mb-4 flex flex-col items-start bg-[#f0f0f0] p-4 px-2 rounded text-[14px]">
            <p style={{ margin: 0 }} className=" text-[12px] ">
              Apps
            </p>

            <div className="flex items-center gap-2 ">
              <p style={{ margin: 0 }} className=" text-[12px]">
                disponíveis
              </p>
              <img src="/icone-gmail.svg" className="w-4 h-6" alt="Gmail" />
              <img src="/icone-drive.svg" className="w-4 h-6" alt="Drive" />
              <img src="/icone-calendar.svg" className="w-4 h-6" alt="Meet" />
              <img src="/icone-meet.svg" className="w-4 h-6" alt="Calendar" />
              <img src="/icone-chat2.svg" className="w-4 h-6" alt="Docs" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1  mx-4">
            <p style={{ margin: 0 }} className=" text-[20px] text-gray-900">
              R$ {cardData.price}{" "}
              <span className="text-[20px] text-gray-600">/mês*</span>
            </p>
            <p className="text-[12px] text-gray-600">por usuário</p>
          </div>

          <Button
            className="self-center mb-4 mx-6 w-56"
            style={{
              backgroundColor: "#cb2166",
              borderColor: "#cb2166",
              color: "white",
            }}
            size="large"
            onClick={() => (navigate("/choose-plan"), window.scrollTo(0, 0))}
          >
            Contratar
          </Button>

          <Button
            type="text"
            size="small"
            className=" cursor-pointer "
            onClick={() => toggleDetails(cardData.id)}
          >
            {expandedCard === cardData.id ? (
              <>
                Menos Detalhes <ChevronUp className="inline w-3 h-3" />
              </>
            ) : (
              <>
                Mais Detalhes <ChevronDown className="inline w-3 h-3" />
              </>
            )}
          </Button>

          {expandedCard === cardData.id && (
            <div className=" p-4 text-start bg-[#f0f0f0]  rounded-sm border-t">
              <div className="flex items-start flex-col gap-3 text-sm text-gray-700">
                {cardData.details.map((detail, index) => (
                  <div key={index}>
                    <p style={{ margin: 0 }} className="font-medium  mb-1">
                      {detail.title}
                    </p>
                    {detail.subtitle && (
                      <p style={{ margin: 0 }} className="text-gray-500">
                        {detail.subtitle}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
                  <Card cardData={cardData} />
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
              <Card key={cardData.id} cardData={cardData} />
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
