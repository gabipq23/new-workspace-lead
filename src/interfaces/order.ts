export interface Plan {
  planName: string;
  price: string;
  priceYear: string;
  modalidade?: string;
  servicesIncluded: string[];
}

export interface OrderData {
  planName: string;
  cnpj: string;
  email: string;
  managerName: string;
  users: number;
  isVivoClient: boolean;
  managerPhone: string;
  cpf: string;
  phone: string;
  domainName: string;
  alreadyHaveWorkspace: boolean;
  domainSuggestion1: string;
  domainSuggestion2: string;
  plan: Plan[];
}
