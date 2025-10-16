import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const bannerMobile = "/vivo-empresas-google-workspace-mobile.jpg";
  const bannerWeb = "/vivo-empresas-google-workspace.jpg";

  return (
    <div className="bg-[#f7f7f7] relative w-full">
      <div className="relative">
        <img
          src={bannerMobile}
          className="w-full h-[440px] md:h-[440px] object-cover block md:hidden"
        />

        <img
          src={bannerWeb}
          className="w-full h-[400px] md:h-[400px] lg:h-[440px] object-cover hidden md:block"
        />
      </div>

      <div
        style={{ margin: 0, padding: 0 }}
        className="absolute inset-0 flex flex-col justify-evenly px-6 md:px-24lg:px-32   "
      >
        <div className="text-start flex gap-2 flex-col px-6 md:py-4 lg:py-6  md:px-24 lg:px-32  ">
          <p
            style={{ lineHeight: "1.", margin: 0 }}
            className="text-[12px] md:text-[12px] lg:text-[16px] text-[#f7f7f7] "
          >
            CONTRATE OU MIGRE PARA A VIVO
          </p>
          <p
            style={{ lineHeight: "1.0", margin: 0 }}
            className="text-[23px] md:text-[28px] lg:text-[38px] text-[#f7f7f7] "
          >
            Google Workspace:
          </p>
          <p
            style={{ lineHeight: "1.0", margin: 0 }}
            className="text-[23px] mdtext-[28px] lg:text-[38px] text-[#f7f7f7] "
          >
            Gmail, Meet e mais
          </p>
          <p
            style={{ lineHeight: "1.0", margin: 0 }}
            className="text-[10px] md:text-[12px] lg:text-[14px] text-[#f7f7f7] "
          >
            PAGUE DIRETO NA SUA FATURA VIVO EMPRESAS
          </p>
        </div>

        <div className="mx-4 md:mx-20 lg:mx-30  ">
          <img
            src="/Vivo_oferta_Workspace.png"
            className="hidden md:block w-56 sm:w-70 md:w-90 lg:w-100 h-auto object-contain"
            alt="Google Workspace"
          />
          <img
            src="/Vivo_oferta_Workspace_mobile.png"
            className="block md:hidden w-40 sm:w-48  h-auto object-contain"
            alt="Google Workspace"
          />
        </div>

        <div className="px-6 py-0 lg:py-2 md:px-24 lg:px-32  ">
          <Button
            style={{ width: "240px", height: "40px" }}
            variant="solid"
            size="large"
            color="magenta"
            onClick={() => navigate("/choose-plan")}
          >
            CONTRATE OU MIGRE AGORA
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
