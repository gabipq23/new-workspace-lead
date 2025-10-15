import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  ColaboracaoContent,
  ComunicacaoContent,
  ControleContent,
  SinergiaContent,
} from "./appsContent";

const onChange = (key: string) => {
  console.log(key);
};

export default function GoogleApps() {
  const items: TabsProps["items"] = [
    {
      key: "comunicacao",
      label: "Comunicação",
      children: <ComunicacaoContent />,
    },
    {
      key: "colaboracao",
      label: "Colaboração",
      children: <ColaboracaoContent />,
    },
    {
      key: "controle",
      label: "Controle",
      children: <ControleContent />,
    },
    {
      key: "sinergia",
      label: "Sinergia com soluções Google",
      children: <SinergiaContent />,
    },
  ];

  return (
    <div
      id="apps"
      className="flex flex-col gap-4 text-gray-600 bg-[#f7f7f7] items-start justify-center w-full py-8 px-6 md:px-24 lg:px-32"
    >
      <div className=" w-full ">
        <h2 className="text-[24px] md:text-[32px] text-[#5f6368] text-start">
          Acesse os apps do Google pelo computador, smartphone ou tablet
        </h2>

        <p style={{ margin: 0 }} className="text-[16px] text-gray-500">
          Tudo o que você precisa para ter mais eficiência e agilidade na sua
          equipe
        </p>
      </div>
      <ConfigProvider theme={{ token: { colorPrimary: "#660099" } }}>
        <div className=" w-full">
          <Tabs
            defaultActiveKey="comunicacao"
            items={items}
            onChange={onChange}
            style={
              {
                "--ant-color-primary": "#7c3aed",
              } as React.CSSProperties
            }
          />
        </div>
      </ConfigProvider>
      <div className="flex w-full items-center gap-8 bg-[#f0f0f0] p-8 rounded-md">
        <img src="/vivo-empresas-selo.png" className="h-28" />

        <div className="flex flex-col gap-2">
          <p style={{ margin: 0 }}>Premier Partners do Google</p>
          <p style={{ margin: 0 }} className="text-[14px]">
            Oferecemos as soluções do Google com suporte de profissionais
            capacitados e certificados.
          </p>
        </div>
      </div>
    </div>
  );
}
