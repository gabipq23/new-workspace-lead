import { create } from "zustand";
import type { Plan, OrderData } from "../interfaces/order";

interface BasicInfo {
  isVivoClient: boolean;
  users: number;
  managerPhone: string;
  acceptContact: boolean;
}

interface CompanyInfo {
  email: string;
  domainName: string;
  cnpj: string;
  cpf: string;
  buyersPhone: string;
  alreadyHaveWorkspace: boolean;
  domainSuggestion1: string;
  domainSuggestion2: string;
  acceptContact: boolean;
}

interface OrderFlowStore {
  selectedPlan: Plan | null;
  basicInfo: BasicInfo;
  companyInfo: Partial<CompanyInfo>;
  setSelectedPlan: (plan: Plan) => void;
  updateBasicInfo: (info: Partial<BasicInfo>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  buildCompleteOrder: () => OrderData | null;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderFlowStore>((set, get) => ({
  selectedPlan: null,
  basicInfo: {
    isVivoClient: true,
    users: 1,
    managerPhone: "",
    acceptContact: true,
  },
  companyInfo: {
    email: "",
    domainName: "",
    cnpj: "",
    cpf: "",
    buyersPhone: "",
    alreadyHaveWorkspace: false,
    domainSuggestion1: "",
    domainSuggestion2: "",
    acceptContact: true,
  },

  setSelectedPlan: (plan: Plan) => {
    set({ selectedPlan: plan });
  },

  updateBasicInfo: (info: Partial<BasicInfo>) => {
    set((state) => ({
      basicInfo: { ...state.basicInfo, ...info },
    }));
  },

  updateCompanyInfo: (info: Partial<CompanyInfo>) => {
    set((state) => ({
      companyInfo: { ...state.companyInfo, ...info },
    }));
  },
  // junta todas as infos ja preenchidas em um unico objeto para criar o pedido
  buildCompleteOrder: (): OrderData | null => {
    const state = get();
    if (!state.selectedPlan) return null;
    return {
      plan: [state.selectedPlan],
      users: state.basicInfo.users,
      isVivoClient: state.basicInfo.isVivoClient,
      managerPhone: state.basicInfo.managerPhone,
      email: state.companyInfo.email || "",
      domainName: state.companyInfo.domainName || "",
      cnpj: state.companyInfo.cnpj || "",
      cpf: state.companyInfo.cpf || "",
      buyersPhone: state.companyInfo.buyersPhone || "",
      alreadyHaveWorkspace: state.companyInfo.alreadyHaveWorkspace || false,
      domainSuggestion1: state.companyInfo.domainSuggestion1 || "",
      domainSuggestion2: state.companyInfo.domainSuggestion2 || "",
    };
  },

  clearOrder: () => {
    set({
      selectedPlan: null,
      basicInfo: {
        isVivoClient: true,
        users: 1,
        managerPhone: "",
        acceptContact: true,
      },
      companyInfo: {
        email: "",
        domainName: "",
        cnpj: "",
        cpf: "",
        buyersPhone: "",
        alreadyHaveWorkspace: false,
        domainSuggestion1: "",
        domainSuggestion2: "",
        acceptContact: true,
      },
    });
  },
}));
