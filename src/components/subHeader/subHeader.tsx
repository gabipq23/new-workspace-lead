import { Button, Dropdown } from "antd";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "1",
      label: (
        <a
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("ofertas")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          href="#ofertas"
          className="text-gray-600 hover:text-[#660099] py-2 px-4 block"
        >
          Ofertas
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="#porque-escolher"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("porque-escolher")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="text-gray-600 hover:text-[#660099] py-2 px-4 block"
        >
          Porque Escolher Google Workspace
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          href="#beneficios"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("beneficios")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="text-gray-600 hover:text-[#660099] py-2 px-4 block"
        >
          Benefícios
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          href="#apps"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("apps")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="text-gray-600 hover:text-[#660099] py-2 px-4 block"
        >
          Aplicativos Inclusos
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          href="#duvidas"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("duvidas")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="text-gray-600 hover:text-[#660099] py-2 px-4 block"
        >
          Principais dúvidas
        </a>
      ),
    },
  ];

  return (
    // bg-[#f7f7f7] bg da LP
    // bg-[#f1f1f1] bg do header
    <div className="flex justify-between gap-4 items-center p-2 bg-[#f1f1f1]  py-2  px-6  md:px-24 lg:px-32   shadow-sm border-b border-gray-300 z-2 sticky top-0">
      <div className="flex md:hidden items-center">
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomLeft"
          onOpenChange={setIsOpen}
          className="border-0"
        >
          <div className="flex items-center gap-2 cursor-pointer border border-gray-400 px-3 py-2 rounded">
            <span className="text-[12px] md:text-[16px] font-bold">
              GOOGLE WORKSPACE
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </Dropdown>
      </div>

      <div className="hidden  md:flex items-center justify-center gap-4 ">
        <p
          style={{ margin: 0, fontWeight: "bold" }}
          className="text-[16px] text-[#575757] "
        >
          Google Workspace
        </p>
        <div className="flex  pt-0.5 h-full gap-6 md:text-[10px] lg:text-[14px] text-[#666666] cursor-pointer">
          <a
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("ofertas")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            href="#ofertas"
            className="hover:text-[#660099]"
          >
            Ofertas
          </a>
          <a
            href="#porque-escolher"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("porque-escolher")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="hover:text-[#660099]"
          >
            Porque Escolher Google Workspace
          </a>
          <a
            href="#beneficios"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("beneficios")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="hover:text-[#660099]"
          >
            Benefícios
          </a>
          <a
            href="#apps"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("apps")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="hover:text-[#660099]"
          >
            Aplicativos inclusos
          </a>
          <a
            href="#duvidas"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("duvidas")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="hover:text-[#660099]"
          >
            Principais dúvidas
          </a>
        </div>
      </div>

      <Button
        style={{
          width: "180px",
          height: "35px",
          fontWeight: "bold",
          borderRadius: "14px",
        }}
        variant="solid"
        size="middle"
        color="magenta"
        onClick={() => navigate("/choose-plan")}
      >
        {hasWorkspace === "true" ? "QUERO MIGRAR" : "Contrate agora"}
      </Button>
    </div>
  );
}

export default SubHeader;
