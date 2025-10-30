import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");

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
        className="absolute inset-0 flex flex-col justify-evenly px-6 md:px-24 lg:px-32   "
      >
        <div className="text-start flex gap-2 flex-col px-6 md:py-4 lg:py-6  md:px-24 lg:px-32  ">
          {hasWorkspace === "true" ? (
            <>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[23px] md:text-[28px] lg:text-[28px] text-[#f7f7f7] "
              >
                MIGRE SUA CONTA WORKSPACE
              </p>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[23px] mdtext-[28px] lg:text-[28px] text-[#f7f7f7] "
              >
                PRA VIVO E TENHA BENEFÍCIOS
              </p>
            </>
          ) : (
            <>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[23px] md:text-[28px] lg:text-[38px] text-[#f7f7f7] "
              >
                Contrate Google Workspace
              </p>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[23px] mdtext-[28px] lg:text-[38px] text-[#f7f7f7] "
              >
                através da Vivo e ganhe benefícios
              </p>
            </>
          )}
          {hasWorkspace === "true" ? (
            <>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[10px] md:text-[20px] lg:text-[26px] text-[#f7f7f7] "
              >
                Garanta esta oferta por tempo limitado
              </p>
            </>
          ) : (
            <>
              <p
                style={{ lineHeight: "1.0", margin: 0 }}
                className="text-[10px] md:text-[14px] lg:text-[18px] text-[#f7f7f7] "
              >
                A partir de R$32,72/ mês
              </p>
            </>
          )}
        </div>

        <div className="mx-4 md:mx-20 lg:mx-28  ">
          <img
            src="/oferta_new_7.png"
            className=" w-56 sm:w-60 md:w-70 lg:w-80 h-auto object-contain"
            alt="Google Workspace"
          />
        </div>

        <div className="px-6 py-0 lg:py-2 md:px-24 lg:px-32 ">
          <Button
            style={{
              width: "200px",
              height: "46px",
              fontWeight: "bold",
              borderRadius: "14px",
            }}
            variant="solid"
            size="large"
            color="magenta"
            onClick={() => navigate("/choose-plan")}
          >
            {hasWorkspace === "true" ? "QUERO MIGRAR" : "CONTRATE AGORA"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
