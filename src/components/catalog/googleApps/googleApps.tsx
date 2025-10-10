import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

export default function GoogleApps() {
  const ComunicacaoContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Gmail */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-gmail.svg" alt="Gmail" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Gmail</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            E-mail comercial seguro, @gmail.com possibilidade de integração ao
            domínio do cliente, integrado e compatível com outras ferramentas.
          </p>
        </div>
      </div>

      {/* Agenda */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-calendar.svg" alt="Agenda" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Agenda</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Programe eventos rapidamente verificando a disponibilidade de
            colegas de trabalho ou sobrepondo agendas.
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-chat2.svg" alt="Chat" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Chat</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Veja todas as mensagens em um só lugar, com salas virtuais dedicadas
            para organizar projetos.
          </p>
        </div>
      </div>

      {/* Meet */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-meet.svg" alt="Meet" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Meet</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Videochamadas criptografadas e eficientes com interface rápida e
            leve, para todos os tipos de empresa.
          </p>
        </div>
      </div>

      {/* Currents */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-currents.svg" alt="Currents" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Currents</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crie suas próprias comunidades para interagir e compartilhar todas
            as informações com suas equipes.
          </p>
        </div>
      </div>
    </div>
  );

  const ColaboracaoContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Drive */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-drive.svg" alt="Drive" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Drive</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Armazene, acesse e compartilhe seus arquivos com opções flexíveis e
            centralizadas.
          </p>
        </div>
      </div>

      {/* Documentos */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-docs.svg" alt="Documentos" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Documentos</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crie e edite documentos de texto com edição, comentários e bate-papo
            em tempo real.
          </p>
        </div>
      </div>

      {/* Planilhas */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-sheets.svg" alt="Planilhas" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Planilhas</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mais facilidade para colaborar e compartilhar informações com
            recursos ágeis.
          </p>
        </div>
      </div>

      {/* Apresentações */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-slides.svg"
            alt="Apresentações"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Apresentações
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crie e edite apresentações sofisticadas com slides fáceis de criar.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-form.svg" alt="Formulário" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Formulário</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pesquisas e questionários personalizados com fácil acesso e análise
            de resultados.
          </p>
        </div>
      </div>

      {/* Keep */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-keep.svg" alt="Keep" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Keep</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Organize e registre ideias, tarefas e lembretes com edição de notas
            sincronizada em parceria com colegas.
          </p>
        </div>
      </div>

      {/* Sites */}
      <div className="flex flex-col items-start">
        <div className="mb-4  ">
          <img src="/icone-sites.svg" alt="Sites" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sites</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crie facilmente páginas web sem programação para sua equipe ou
            empresa e publique-o rapidamente.
          </p>
        </div>
      </div>

      {/* Jamboard */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-jamboard.svg" alt="Jamboard" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Jamboard</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enriqueça sessões remotas com quadros de mídia interativos em tempo
            real para incentivar a criatividade.
          </p>
        </div>
      </div>
    </div>
  );

  const ControleContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Security Center */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-security.svg"
            alt="Security Center"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Security Center
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Visualize possíveis problemas de segurança e controle ameaças com
            informações e insights acionáveis no Security Center.
          </p>
        </div>
      </div>

      {/* Endpoint Management */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-endpoint-management.png"
            alt="Endpoint Management"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Endpoint Management
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Gerencie o conteúdo e dispositivos de forma centralizada para
            segurança completa.
          </p>
        </div>
      </div>

      {/* Admin */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-admin.svg" alt="Admin" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Admin</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Gerencie todas as ferramentas e dispositivos, usuários, defina a
            segurança e as configurações com facilidade.
          </p>
        </div>
      </div>

      {/* Vault */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img src="/icone-vault.png" alt="Vault" className="w-16 h-16" />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Vault</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Salve dados de arquivos ou e-mails ou mensagens de uma empresa para
            cumprir as normas legais e de auditoria.
          </p>
        </div>
      </div>

      {/* Cloud Search */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-cloud-search.png"
            alt="Cloud Search"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Cloud Search
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Ajuda a encontrar informações em aplicativos do Google usando IA.
          </p>
        </div>
      </div>
    </div>
  );

  const SinergiaContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {/* Google Sala de Aula */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-classroom.svg"
            alt="Google Sala de Aula"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Google Sala de Aula
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Reúna todas as ferramentas de aprendizagem e gerencie várias turmas
            em uma plataforma central e colaborativa.
          </p>
        </div>
      </div>

      {/* Appsheet */}
      <div className="flex gap-4 md:gap-0  md:flex-col items-start">
        <div className="mb-4">
          <img
            src="/icone-appsheet2.svg"
            alt="Appsheet"
            className="w-16 h-16"
          />
        </div>
        <div className="w-4/5">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Appsheet</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crie seu aplicativo de negócios sem conhecimento de código
            capturando os dados da sua empresa.
          </p>
        </div>
      </div>
    </div>
  );

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
