import { Collapse } from "antd";

import { useState } from "react";

const { Panel } = Collapse;

export default function FAQ() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // const handleExpandAll = () => {
  //   if (activeKeys.length === faqItems.length) {
  //     setActiveKeys([]);
  //   } else {
  //     setActiveKeys(faqItems.map((item) => item.key));
  //   }
  // };
  const faqItems = [
    {
      key: "1",
      question:
        "Estou com dúvidas sobre a contratação e ativação do meu serviço, o que devo fazer?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            O nosso suporte está preparado para te orientar, envie sua dúvida
            para o e-mail{" "}
            <a
              href="mailto:servicosdigitais@vivo.com.br"
              className="text-blue-600 underline"
            >
              servicosdigitais@vivo.com.br
            </a>{" "}
            ou através do nosso Canal de Suporte ligue 10315 &gt; Opção 2
            (identificar como PJ) &gt; Opção 2.
          </p>
        </div>
      ),
    },
    {
      key: "2",
      question: "O que é o Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            O Google Workspace é uma solução do Google que aumenta a
            produtividade de pessoas e organizações com ferramentas de
            colaboração para todas as formas de trabalho. Anteriormente
            conhecido como G-Suite, o Google Workspace permite o uso de e-mails
            comerciais personalizados e seguros, criação de documentos,
            formulários, planilhas e apresentações, além de videochamadas para
            conectar sua equipe.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      question: "Posso substituir meu software atual pelo Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Sim, você pode substituir seus pacotes de produtividade existentes
            pelo Google Workspace para criar documentos de texto, planilhas e
            apresentações. Trabalhe em tempo real com outras pessoas e armazene
            arquivos na nuvem com o Google Drive. Os aplicativos do Google
            Workspace funcionam em todos os dispositivos e são compatíveis com
            arquivos de outros programas, como o Microsoft 365 Copilot.
          </p>
        </div>
      ),
    },
    {
      key: "4",
      question:
        "Quais são as ferramentas disponíveis em todos os planos do Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Todos os planos do Google Workspace incluem os seguintes
            aplicativos: Gmail, Drive, Meet, Calendar, Chat, Documentos,
            Planilhas, Apresentações, Keep, Sites e Forms.
          </p>
        </div>
      ),
    },
    {
      key: "5",
      question:
        "Qual a diferença entre o Google Workspace e os aplicativos grátis do Google?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            O Google Workspace oferece serviços empresariais adicionais não
            inclusos nos aplicativos gratuitos do Google. Esses serviços incluem
            e-mail comercial personalizado (@suaempresa), armazenamento em nuvem
            ampliado para Gmail e Google Drive, suporte 24/7 por e-mail e
            telefone, 99,9% de tempo de atividade garantido, interoperabilidade
            com Microsoft Outlook, segurança avançada com autenticação em duas
            etapas e Logon único (SSO), e controles administrativos para contas
            de usuários.
          </p>
        </div>
      ),
    },
    {
      key: "6",
      question: "Quais são as vantagens dos planos do Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Com o Google Workspace, você pode trabalhar em documentos, planilhas
            e apresentações em todos os dispositivos, com ou sem Internet.
            Colabore em tempo real com colegas de equipe, comunique-se pelo chat
            integrado e faça perguntas em comentários. As atualizações de
            arquivos são salvas automaticamente no Google Drive, garantindo
            acesso à versão mais recente.
          </p>
        </div>
      ),
    },
    {
      key: "7",
      question: "Quais são as diferenças entre os planos do Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            O Google Workspace oferece três planos: Basic, Business e
            Enterprise. O plano Basic inclui 30 GB de armazenamento por usuário,
            o Business oferece 5 TB de armazenamento compartilhado, e o
            Enterprise inclui personalização e controles avançados, além de
            armazenamento ilimitado no Enterprise Standard e Plus. Para ajuda na
            escolha do plano, solicite um consultor.
          </p>
        </div>
      ),
    },
    {
      key: "8",
      question:
        "Posso migrar meu e-mail, eventos da agenda e contatos para o Google Workspace?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Sim, você pode migrar seus e-mails, contatos e dados da agenda para
            o Google Workspace. O Google Workspace oferece ferramentas para
            migrar dados do Microsoft Exchange, Outlook, Office 365, IBM Notes e
            outros sistemas de e-mail.
          </p>
        </div>
      ),
    },
    {
      key: "9",
      question:
        "Como funciona o Google Workspace em casos de problemas que precisam de suporte?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            O Google Workspace oferece suporte 24/7 por meio dos canais de
            atendimento do Google, garantindo assistência sempre que necessário.
          </p>
        </div>
      ),
    },
    {
      key: "10",
      question: "O Google Workspace é seguro para minha empresa?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Sim, o Google Workspace oferece segurança avançada com autenticação
            em duas etapas, Logon único (SSO), criptografia de dados e controles
            administrativos para proteger as informações da sua empresa.
          </p>
        </div>
      ),
    },
    {
      key: "11",
      question: "Posso cancelar o Google Workspace quando quiser?",
      answer: (
        <div className="text-[14px] text-[#5f6368] leading-6">
          <p>
            Sim, os planos mensais do Google Workspace permitem cancelamento sem
            cobrança adicional no final do período de utilização pago.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div
      id="duvidas"
      className="flex text-gray-600  px-6 md:px-24 lg:px-32 w-full py-16 justify-center"
    >
      <div className="w-full ">
        <div className="w-full">
          <h2 className="text-[32px] font-normal text-gray-600 mb-8">
            Nós temos as respostas que você precisa
          </h2>

          {/* <div className="mb-2 justify-end flex">
            <Button
              type="default"
              className="border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8] hover:text-white"
              onClick={handleExpandAll}
            >
              {activeKeys.length === faqItems.length
                ? "Fechar tudo"
                : "Abrir tudo"}
            </Button>
          </div> */}

          <Collapse
            ghost
            className="bg-white border-none w-full max-w-4xl"
            activeKey={activeKeys}
            onChange={(keys) =>
              setActiveKeys(Array.isArray(keys) ? keys : [keys].filter(Boolean))
            }
            expandIconPosition="end"
          >
            {faqItems.map((item, index) => (
              <>
                {index === 0 && <hr className="mb-4 mt-4 border-[#dadce0]" />}

                <Panel
                  header={
                    <span className="text-[16px] font-medium text-[#3c4043]">
                      {item.question}
                    </span>
                  }
                  key={item.key}
                  className="border-b border-[#dadce0] last:border-b-0"
                >
                  {item.answer}
                </Panel>
                <hr className="mb-4 mt-4 border-[#dadce0]" />
              </>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
}
