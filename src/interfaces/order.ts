export interface Plan {
  id?: string;
  planName: string;
  price: string;
  type?: "mensal" | "anual";
  users?: number;
  priceYear?: string;
  newPlan?: boolean;
  servicesIncluded?: string[];
}

export interface OrderData {
  acceptContact?: boolean;
  acceptTerms?: boolean;
  alreadyHaveWorkspace?: boolean;
  already_have_workspace?: number;
  buyers_phone?: string | null;
  client_ip?: string | null;
  company_name?: string | null;
  cnpj?: string;
  consultor_responsavel?: string | null;
  cpf?: string | null;
  credito_servicos?: string | null;
  created_at?: string;
  domainName?: string;
  domain_name?: string;
  email?: string;
  equipe?: string | null;
  finger_print?: string | null;
  id?: number;
  id_crm?: string | null;
  id_vivo_corp?: string | null;
  i_have_authorization?: boolean;
  isVivoClient?: boolean;
  is_vivo_client?: number;
  managerPhone?: string;
  manager_name?: string | null;
  manager_phone?: string;
  obs_consultor?: string | null;
  observacao_consultor?: string;
  ordernumber?: string;
  plan?: Plan[];
  plans?: Plan[];
  second_manager_phone?: string;
  status?: string | null;
  status_pos_venda?: string | null;
  url?: string | null;
}
