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
  id?: number;
  email?: string;
  domainName?: string;
  domain_name?: string;

  cnpj?: string;
  managerPhone?: string;
  manager_phone?: string;
  status?: string | null;
  status_pos_venda?: string | null;
  id_vivo_corp?: string | null;
  consultor_responsavel?: string | null;
  equipe?: string | null;
  id_crm?: string | null;
  obs_consultor?: string | null;
  manager_name?: string | null;
  created_at?: string;
  ordernumber?: string;
  isVivoClient?: boolean;
  alreadyHaveWorkspace?: boolean;
  already_have_workspace?: number;

  acceptContact?: boolean;
  acceptTerms?: boolean;
  plan?: Plan[];

  // New fields from backend

  buyers_phone?: string | null;
  client_ip?: string | null;
  company_name?: string | null;
  cpf?: string | null;
  credito_servicos?: string | null;
  finger_print?: string | null;
  is_vivo_client?: number;
  plans?: Plan[];
  url?: string | null;
}
