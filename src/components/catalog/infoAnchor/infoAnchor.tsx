export default function InfoAnchor() {
  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");
  return (
    <div
      id="porque-escolher"
      className="flex flex-col gap-4 text-gray-600 bg-[#f7f7f7] items-start justify-center w-full py-16 px-6 md:px-24 lg:px-32  lg:pr-0 "
    >
      {hasWorkspace === "true" ? (
        <>
          {" "}
          <div className=" ">
            <h2 className="text-[24px] md:text-[32px] text-[#5f6368] text-start  ">
              Veja como é fácil migrar o pagamento da sua conta Workspace para a
              Vivo Empresas.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center ">
            <div className="lg:hidden  mb-6">
              <img
                src="/vivo-empresas-google-workspace-solucoes.png"
                className="w-full "
              />
            </div>

            <div className=" lg:flex-1 lg:pr-8">
              <div className="flex flex-col gap-2 py-4 text-start">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <h4 className="text-[16px] font-medium text-gray-800">
                      1. Insira os dados da sua empresa e conta Workspace
                    </h4>
                  </div>
                  <p className="text-gray-600 text-[14px] ml-5">
                    Preencha as informações da sua empresa e da conta Google
                    Workspace que será migrada.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <h4 className="text-[16px] font-medium text-gray-800">
                      2. Aceite o termo eletrônico enviado pela Vivo
                    </h4>
                  </div>
                  <p className="text-gray-600 text-[14px] ml-5">
                    Após preencher os dados, você receberá um aceite eletrônico
                    para confirmar a migração.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <h4 className="text-[16px] font-medium text-gray-800">
                      3. Receba as instruções de migração
                    </h4>
                  </div>
                  <p className="text-gray-600 text-[14px] ml-5">
                    Com o aceite aprovado, enviaremos as instruções de ativação
                    da nova forma de pagamento.
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <h4 className="text-[16px] font-medium text-gray-800">
                      4. Pronto! Em poucos minutos sua conta estará migrada
                    </h4>
                  </div>
                  <p className="text-gray-600 text-[14px] ml-5">
                    Todo o processo é digital, rápido e sem burocracia — leva
                    menos de 2 minutos.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:flex-1 ">
              <img
                src="/vivo-empresas-google-workspace-solucoes.png"
                className="w-full h-full"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className=" ">
              <h2 className="text-[24px] md:text-[32px] text-[#5f6368] text-start  ">
                Por que escolher o Google Workspace?
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center ">
              <div className="lg:hidden  mb-6">
                <img
                  src="/vivo-empresas-google-workspace-solucoes.png"
                  className="w-full "
                />
              </div>

              <div className=" lg:flex-1 lg:pr-8">
                <h3 className="text-[20px] mb-6">
                  Soluções flexíveis: trabalhe de qualquer lugar
                </h3>

                <div className="flex flex-col gap-2 py-4 text-start">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Nativo da nuvem
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Funciona em qualquer smartphone, computador ou tablet
                      desde que tenha um navegador web, online e off-line.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Sempre Acessível
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Em caso de problema com o dispositivo, ele permite que
                      você mude rapidamente para outro terminal para acessar o
                      mesmo ambiente de trabalho.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Otimização de custos
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Economia em hardware e software integrando mais recursos e
                      operando em qualquer smartphone, computador ou tablet.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Mais Mobilidade
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Não há mais vínculo com um determinado dispositivo e todo
                      o ambiente de trabalho está disponível em qualquer lugar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block lg:flex-1 ">
                <img
                  src="/vivo-empresas-google-workspace-solucoes.png"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center  lg:pr-16">
              <div className="lg:hidden mb-6">
                <img
                  src="/vivo-empresas-google-workspace-design.png"
                  className="w-full"
                />
              </div>

              <div className="hidden lg:block lg:flex-1 lg:pr-8">
                <img
                  src="/vivo-empresas-google-workspace-design.png"
                  className="w-full"
                />
              </div>

              <div className="mx-6 lg:flex-1">
                <h3 className="text-[20px] mb-6">
                  Design simples: aumente a produtividade
                </h3>

                <div className="flex flex-col gap-6 py-4 text-start">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Mais Facilidade
                      </h4>
                    </div>
                    <div className="ml-5">
                      <p className="text-gray-600 text-[14px] mb-2">
                        Todas as ferramentas do Google tem o foco de trazer
                        ainda mais produtividade para o seu negócio.
                      </p>
                      <p className="text-gray-600 text-[14px]">
                        O design eficiente da interface, integra apenas as
                        funções mais úteis que são realmente utilizadas.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Inteligência Artificial Nativa
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Google Workspace integra recursos baseados em IA que
                      automatizam tarefas.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Manutenção Integrada
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      As equipes de TI não precisam mais se preocupar com
                      atualizações e podem se concentrar no gerenciamento de
                      usuários.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="lg:hidden mb-6">
                <img
                  src="/vivo-empresas-google-workspace-ferramentas.png"
                  className="w-full"
                />
              </div>

              <div className=" lg:flex-1 lg:pr-8">
                <h3 className="text-[20px] mb-6">
                  Ferramentas úteis: melhorar a colaboração
                </h3>

                <div className="flex flex-col gap-6 py-4 text-start">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Ambiente colaborativo completo
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Mudança de paradigma, fomentando a colaboração total entre
                      todas as equipes de uma empresa
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Transformação Digital
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Movimentar o ambiente produtivo no Google Workspace
                      implica uma mudança radical na cultura da empresa
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Versão única entre todos
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      Documentos em nuvem incentivam o trabalho em equipe na
                      mesma versão em tempo real
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <h4 className="text-[16px] font-medium text-gray-800">
                        Segurança e Privacidade
                      </h4>
                    </div>
                    <p className="text-gray-600 text-[14px] ml-5">
                      A mesma infraestrutura segura que o Google usa na nuvem
                      com proteção de dados integrados
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block md:flex-1">
                <img
                  src="/vivo-empresas-google-workspace-ferramentas.png"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:pr-16">
              <div className="lg:hidden ">
                <img src="/vivo-google-gemini.png" className="w-full" />
              </div>

              <div className="hidden lg:block lg:flex-1 lg:pr-8">
                <img src="/vivo-google-gemini.png" className="w-full" />
              </div>

              <div className="mr-6 md:flex-1">
                <h3 className="text-[20px] mb-6">
                  Google Gemini: IA Generativa integrada ao Google Workspace
                </h3>

                <div className="flex flex-col gap-6 py-4 text-start">
                  <div>
                    <p className="text-gray-600 text-[14px] mb-4">
                      Afinal, o que é Gemini do Google? O assistente de
                      inteligência artificial oferece funcionalidades avançadas
                      que aumentam sua produtividade para mudar a forma como
                      você trabalha.
                    </p>
                    <p className="text-gray-600 text-[14px] mb-4">
                      Com o Gemini AI, você pode otimizar a redação de e-mails,
                      criar imagens e slides personalizados e organizar dados de
                      forma automática, tudo com apenas alguns cliques,
                      interface intuitiva e integração com as ferramentas do
                      Google Workspace.
                    </p>
                    <p className="text-gray-600 text-[14px]">
                      O Google Gemini está disponível sem custos adicionais nos
                      planos Business e Enterprise do Google Workspace,
                      incluindo as seguintes ferramentas: Gmail, Documentos,
                      Planilhas, Slides, Google Meet e AppSheet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
