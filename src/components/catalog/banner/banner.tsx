import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const bannerMobile = "/vivo-empresas-google-workspace-mobile.jpg";
  const bannerWeb = "/vivo-empresas-google-workspace.jpg";

  return (
    <div className="bg-[#f7f7f7] relative w-full">
      <div className="relative">
        <img src={bannerMobile} className="w-full block md:hidden" />

        <img src={bannerWeb} className="w-full hidden md:block" />
      </div>

      <div
        style={{ margin: 0, padding: 0 }}
        className="absolute inset-0 flex flex-col items-start justify-center gap-4 md:justify-evenly lg:justify-evenly lg:gap-4 px-6  md:px-24 lg:px-32   "
      >
        <div className="text-start flex flex-col gap-1 px-6  md:px-24 lg:px-32  ">
          <p
            style={{ lineHeight: "1.3", margin: 0 }}
            className="text-[12px] md:text-[12px] lg:text-[16px] text-[#f7f7f7] "
          >
            SOLUÇÕES COLABORATIVAS
          </p>
          <p
            style={{ lineHeight: "1.3", margin: 0 }}
            className="text-[23px] md:text-[28px] lg:text-[38px] text-[#f7f7f7] "
          >
            Google Workspace:
          </p>
          <p
            style={{ lineHeight: "1.3", margin: 0 }}
            className="text-[23px] mdtext-[28px] lg:text-[38px] text-[#f7f7f7] "
          >
            Gmail, Meet e mais
          </p>
        </div>

        <div className="bg-[#660099] shadow-white shadow-sm p-3 pt-2 pb-2 rounded-lg text-[#f7f7f7] mx-6 md:mx-24 lg:mx-32">
          <p
            style={{ margin: 0 }}
            className="text-[10px] md:text-[12px] lg:text-[16px] mb-1"
          >
            A partir de
          </p>
          <div style={{ margin: 0 }} className="flex items-end gap-1">
            <p
              style={{ margin: 0 }}
              className="text-[16px] md:text-[18px] lg:text-[22px] font-medium"
            >
              R$
            </p>

            <p
              style={{ margin: 0 }}
              className="text-[28px] md:text-[36px] lg:text-[54px] font-bold leading-none"
            >
              49
            </p>

            <div className="flex flex-col leading-tight ml-1">
              <p
                style={{ margin: 0 }}
                className=" text-[10px] md:text-[12px] lg:text-[16px]"
              >
                /mês
              </p>
              <p
                style={{ margin: 0 }}
                className="text-[10px] md:text-[12px] lg:text-[16px]"
              >
                por usuário
              </p>
            </div>
          </div>
        </div>

        <div className="px-6  md:px-24 lg:px-32  ">
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryBg: "#f7f7f7",
                colorPrimaryText: "#660099",

                colorPrimaryHover: "#aa00ff",
              },
            }}
          >
            <Button
              variant="solid"
              size="large"
              onClick={() => navigate("/choose-plan")}
            >
              Contrate
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default Banner;
