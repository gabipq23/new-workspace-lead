import { create } from "zustand";
import type { Plan, OrderData } from "../interfaces/order";

interface BasicInfo {
  planName: string;
  cnpj: string;
  email: string;
  managerName: string;
  users: number;
  isVivoClient: boolean;
  acceptContact: boolean;
}

interface CompanyInfo {
  managerPhone: string;
  cpf: string;
  phone: string;
  domainName: string;
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
    planName: "",
    cnpj: "",
    email: "",
    managerName: "",
    users: 1,
    isVivoClient: true,
    acceptContact: true,
  },
  companyInfo: {
    managerPhone: "2199884465451",
    cpf: "",
    phone: "",
    domainName: "",
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
      planName: state.basicInfo.planName,
      cnpj: state.basicInfo.cnpj,
      email: state.basicInfo.email,
      managerName: state.basicInfo.managerName,
      isVivoClient: state.basicInfo.isVivoClient,
      managerPhone: state.companyInfo.managerPhone || "",
      cpf: state.companyInfo.cpf || "",
      phone: state.companyInfo.phone || "",
      domainName: state.companyInfo.domainName || "",
      alreadyHaveWorkspace: state.companyInfo.alreadyHaveWorkspace || false,
      domainSuggestion1: state.companyInfo.domainSuggestion1 || "",
      domainSuggestion2: state.companyInfo.domainSuggestion2 || "",
    };
  },

  clearOrder: () => {
    set({
      selectedPlan: null,
      basicInfo: {
        planName: "",
        cnpj: "",
        email: "",
        managerName: "",
        users: 1,
        isVivoClient: true,
        acceptContact: true,
      },
      companyInfo: {
        cpf: "",
        phone: "",
        domainName: "",
        alreadyHaveWorkspace: false,
        domainSuggestion1: "",
        domainSuggestion2: "",
        acceptContact: true,
      },
    });
  },
}));
