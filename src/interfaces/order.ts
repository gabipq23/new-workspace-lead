export interface Plan {
  id?: number;
  planName: string;
  price: string;
  type?: "mensal" | "anual";
  users?: number;
  priceYear?: string;
  servicesIncluded?: string[];
}

export interface OrderData {
  id?: number;
  email: string;
  domainName: string;
  cnpj: string;
  managerPhone: string;
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
  isVivoClient: boolean;
  alreadyHaveWorkspace: boolean;
  acceptContact: boolean;
  acceptTerms: boolean;
  plan: Plan[];
}
