export interface Plan {
  planName: string;
  price: string;
  servicesIncluded: string[];
}

export interface OrderData {
  email: string;
  domainName: string;
  cnpj: string;
  cpf: string;
  buyersPhone: string;
  managerPhone: string;
  users: number;
  isVivoClient: boolean;
  alreadyHaveWorkspace: boolean;
  domainSuggestion1: string;
  domainSuggestion2: string;
  plan: Plan[];
}
