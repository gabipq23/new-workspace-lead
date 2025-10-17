import { create } from "zustand";
import type { Plan, OrderData } from "../interfaces/order";

interface BasicInfo {
  cnpj: string;
  email: string;
  managerName: string;
  managerPhone: string;
  isVivoClient: boolean;
  acceptContact: boolean;
}

interface ConfirmedPlan {
  id: string;
  planName: string;
  price: string;
  users: number;
  modalidade: string;
}

interface CompanyInfo {
  domainName: string;
  alreadyHaveWorkspace: boolean;
  acceptTerms: boolean;
}

interface OrderFlowStore {
  selectedPlan: Plan | null;
  confirmedPlans: ConfirmedPlan[];
  basicInfo: BasicInfo;
  companyInfo: Partial<CompanyInfo>;
  setSelectedPlan: (plan: Plan) => void;
  setConfirmedPlans: (plans: ConfirmedPlan[]) => void;
  updateBasicInfo: (info: Partial<BasicInfo>) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  buildCompleteOrder: () => OrderData | null;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderFlowStore>((set, get) => ({
  selectedPlan: null,
  confirmedPlans: [],
  basicInfo: {
    cnpj: "",
    email: "",
    managerName: "",
    managerPhone: "",
    isVivoClient: true,
    acceptContact: true,
  },
  companyInfo: {
    domainName: "",
    alreadyHaveWorkspace: false,
    acceptTerms: false,
  },

  setSelectedPlan: (plan: Plan) => {
    set({ selectedPlan: plan });
  },

  setConfirmedPlans: (plans: ConfirmedPlan[]) => {
    set({ confirmedPlans: plans });
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
    if (state.confirmedPlans.length === 0) return null;

    // Converte os planos confirmados para o formato da API
    const apiPlans: Plan[] = state.confirmedPlans.map((plan) => ({
      planName: `Google Workspace Business ${plan.planName}`,
      price: plan.price,
      type: plan.modalidade as "mensal" | "anual",
      users: plan.users,
    }));

    return {
      email: state.basicInfo.email,
      domainName: state.companyInfo.domainName || "",
      cnpj: state.basicInfo.cnpj,
      managerPhone: state.basicInfo.managerPhone,
      manager_name: state.basicInfo.managerName,
      isVivoClient: state.basicInfo.isVivoClient,
      alreadyHaveWorkspace: state.companyInfo.alreadyHaveWorkspace || false,
      acceptContact: state.basicInfo.acceptContact,
      acceptTerms: state.companyInfo.acceptTerms || false,
      plan: apiPlans,
    };
  },

  clearOrder: () => {
    set({
      selectedPlan: null,
      confirmedPlans: [],
      basicInfo: {
        cnpj: "",
        email: "",
        managerName: "",
        managerPhone: "",
        isVivoClient: true,
        acceptContact: true,
      },
      companyInfo: {
        domainName: "",
        alreadyHaveWorkspace: false,
        acceptTerms: false,
      },
    });
  },
}));
