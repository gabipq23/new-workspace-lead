// // import { create } from "zustand";
// // import type { Plan, OrderData } from "../interfaces/order";

// // interface BasicInfo {
// //   cnpj: string;
// //   email: string;
// //   manager_name: string;
// //   managerPhone: string;
// //   isVivoClient: boolean;
// //   acceptContact: boolean;
// // }

// // interface ConfirmedPlan {
// //   id: string;
// //   planName: string;
// //   price: string;
// //   users: number;
// //   type: "mensal" | "anual";
// //   newPlan: boolean;
// // }

// // interface CompanyInfo {
// //   domainName: string;
// //   alreadyHaveWorkspace: boolean;
// //   acceptTerms: boolean;
// // }

// // interface OrderFlowStore {
// //   selectedPlan: Plan | null;
// //   confirmedPlans: ConfirmedPlan[];
// //   basicInfo: BasicInfo;
// //   companyInfo: Partial<CompanyInfo>;
// //   setSelectedPlan: (plan: Plan) => void;
// //   setConfirmedPlans: (plans: ConfirmedPlan[]) => void;
// //   addPlanToConfirmed: (plan: Plan) => void;
// //   addCurrentPlanToConfirmed: (plan: Plan) => void;
// //   addNewPlanToConfirmed: (plan: Plan) => void;
// //   removePlanFromConfirmed: (planId: string) => void;
// //   updateBasicInfo: (info: Partial<BasicInfo>) => void;
// //   updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
// //   buildCompleteOrder: () => OrderData | null;
// //   clearOrder: () => void;
// // }

// // export const useOrderStore = create<OrderFlowStore>((set, get) => ({
// //   selectedPlan: null,
// //   confirmedPlans: [],
// //   basicInfo: {
// //     cnpj: "",
// //     email: "",
// //     manager_name: "",
// //     managerPhone: "",
// //     isVivoClient: sessionStorage.getItem("isVivoClient") === "true",
// //     acceptContact: true,
// //   },
// //   companyInfo: {
// //     domainName: "",
// //     alreadyHaveWorkspace: false,
// //     acceptTerms: false,
// //   },

// //   setSelectedPlan: (plan: Plan) => {
// //     set({ selectedPlan: plan });
// //   },

// //   setConfirmedPlans: (plans: ConfirmedPlan[]) => {
// //     set({ confirmedPlans: plans });
// //   },

// //   addPlanToConfirmed: (plan: Plan) => {
// //     const confirmedPlan: ConfirmedPlan = {
// //       id: plan.id || Date.now().toString(),
// //       planName: plan.planName,
// //       price: plan.price,
// //       users: plan.users || 1,
// //       type: plan.type || "anual",
// //       newPlan: true,
// //     };
// //     set((state) => ({
// //       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
// //     }));
// //   },

// //   addCurrentPlanToConfirmed: (plan: Plan) => {
// //     const confirmedPlan: ConfirmedPlan = {
// //       id: plan.id || Date.now().toString(),
// //       planName: plan.planName,
// //       price: plan.price,
// //       users: plan.users || 1,
// //       type: plan.type || "anual",
// //       newPlan: false,
// //     };
// //     set((state) => ({
// //       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
// //     }));
// //   },

// //   addNewPlanToConfirmed: (plan: Plan) => {
// //     const confirmedPlan: ConfirmedPlan = {
// //       id: plan.id || Date.now().toString(),
// //       planName: plan.planName,
// //       price: plan.price,
// //       users: plan.users || 1,
// //       type: plan.type || "anual",
// //       newPlan: true,
// //     };
// //     set((state) => ({
// //       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
// //     }));
// //   },

// //   removePlanFromConfirmed: (planId: string) => {
// //     set((state) => ({
// //       confirmedPlans: state.confirmedPlans.filter((plan) => plan.id !== planId),
// //     }));
// //   },

// //   updateBasicInfo: (info: Partial<BasicInfo>) => {
// //     set((state) => ({
// //       basicInfo: { ...state.basicInfo, ...info },
// //     }));
// //   },

// //   updateCompanyInfo: (info: Partial<CompanyInfo>) => {
// //     set((state) => ({
// //       companyInfo: { ...state.companyInfo, ...info },
// //     }));
// //   },

// //   buildCompleteOrder: (): OrderData | null => {
// //     const state = get();
// //     if (state.confirmedPlans.length === 0) return null;

// //     const apiPlans: Plan[] = state.confirmedPlans.map((plan) => ({
// //       planName: `Google Workspace Business ${plan.planName}`,
// //       price: plan.price,
// //       type: plan.type as "mensal" | "anual",
// //       users: plan.users,
// //       newPlan: plan.newPlan,
// //     }));

// //     return {
// //       email: state.basicInfo.email,
// //       domainName: state.companyInfo.domainName || "",
// //       cnpj: state.basicInfo.cnpj,
// //       managerPhone: state.basicInfo.managerPhone,
// //       manager_name: state.basicInfo.manager_name,
// //       isVivoClient: state.basicInfo.isVivoClient,
// //       alreadyHaveWorkspace: state.companyInfo.alreadyHaveWorkspace || false,
// //       acceptContact: state.basicInfo.acceptContact,
// //       acceptTerms: state.companyInfo.acceptTerms || false,
// //       plan: apiPlans,
// //     };
// //   },

// //   clearOrder: () => {
// //     set({
// //       selectedPlan: null,
// //       confirmedPlans: [],
// //       basicInfo: {
// //         cnpj: "",
// //         email: "",
// //         manager_name: "",
// //         managerPhone: "",
// //         isVivoClient: true,
// //         acceptContact: true,
// //       },
// //       companyInfo: {
// //         domainName: "",
// //         alreadyHaveWorkspace: false,
// //         acceptTerms: false,
// //       },
// //     });
// //   },
// // }));

// import { create } from "zustand";
// import type { Plan, OrderData } from "../interfaces/order";

// interface ConfirmedPlan {
//   id: string;
//   planName: string;
//   price: string;
//   users: number;
//   type: "mensal" | "anual";
//   newPlan: boolean;
// }

// interface FirstStepData {
//   isVivoClient: boolean;
//   alreadyHaveWorkspace: boolean;
// }

// interface SecondStepData {
//   domainName: string;
//   cnpj: string;
//   email: string;
//   manager_name: string;
//   managerPhone: string;
//   acceptContact: boolean;
//   acceptTerms: boolean;
// }

// interface OrderFlowStore {
//   selectedPlan: Plan | null;
//   confirmedPlans: ConfirmedPlan[];
//   firstStepData: FirstStepData;
//   secondStepData: Partial<SecondStepData>;
//   setSelectedPlan: (plan: Plan) => void;
//   setConfirmedPlans: (plans: ConfirmedPlan[]) => void;
//   addPlanToConfirmed: (plan: Plan) => void;
//   addCurrentPlanToConfirmed: (plan: Plan) => void;
//   addNewPlanToConfirmed: (plan: Plan) => void;
//   removePlanFromConfirmed: (planId: string) => void;
//   updateFirstStepData: (info: Partial<FirstStepData>) => void;
//   updateSecondStepData: (info: Partial<SecondStepData>) => void;
//   buildCompleteOrder: () => OrderData | null;
//   clearOrder: () => void;
// }

// export const useOrderStore = create<OrderFlowStore>((set, get) => ({
//   selectedPlan: null,
//   confirmedPlans: [],
//   firstStepData: {
//     isVivoClient: sessionStorage.getItem("isVivoClient") === "true",
//     alreadyHaveWorkspace:
//       sessionStorage.getItem("alreadyHaveWorkspace") === "true",
//   },
//   secondStepData: {
//     domainName: "",
//     cnpj: "",
//     email: "",
//     manager_name: "",
//     managerPhone: "",
//     acceptContact: true,
//     acceptTerms: false,
//   },

//   setSelectedPlan: (plan: Plan) => {
//     set({ selectedPlan: plan });
//   },

//   setConfirmedPlans: (plans: ConfirmedPlan[]) => {
//     set({ confirmedPlans: plans });
//   },

//   addPlanToConfirmed: (plan: Plan) => {
//     const confirmedPlan: ConfirmedPlan = {
//       id: plan.id || Date.now().toString(),
//       planName: plan.planName,
//       price: plan.price,
//       users: plan.users || 1,
//       type: plan.type || "anual",
//       newPlan: true,
//     };
//     set((state) => ({
//       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
//     }));
//   },

//   addCurrentPlanToConfirmed: (plan: Plan) => {
//     const confirmedPlan: ConfirmedPlan = {
//       id: plan.id || Date.now().toString(),
//       planName: plan.planName,
//       price: plan.price,
//       users: plan.users || 1,
//       type: plan.type || "anual",
//       newPlan: false,
//     };
//     set((state) => ({
//       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
//     }));
//   },

//   addNewPlanToConfirmed: (plan: Plan) => {
//     const confirmedPlan: ConfirmedPlan = {
//       id: plan.id || Date.now().toString(),
//       planName: plan.planName,
//       price: plan.price,
//       users: plan.users || 1,
//       type: plan.type || "anual",
//       newPlan: true,
//     };
//     set((state) => ({
//       confirmedPlans: [...state.confirmedPlans, confirmedPlan],
//     }));
//   },

//   removePlanFromConfirmed: (planId: string) => {
//     set((state) => ({
//       confirmedPlans: state.confirmedPlans.filter((plan) => plan.id !== planId),
//     }));
//   },

//   updateFirstStepData: (info: Partial<FirstStepData>) => {
//     set((state) => ({
//       firstStepData: { ...state.firstStepData, ...info },
//     }));
//   },

//   updateSecondStepData: (info: Partial<SecondStepData>) => {
//     set((state) => ({
//       secondStepData: { ...state.secondStepData, ...info },
//     }));
//   },

//   buildCompleteOrder: (): OrderData | null => {
//     const state = get();
//     if (state.confirmedPlans.length === 0) return null;

//     const apiPlans: Plan[] = state.confirmedPlans.map((plan) => ({
//       planName: `Google Workspace Business ${plan.planName}`,
//       price: plan.price,
//       type: plan.type as "mensal" | "anual",
//       users: plan.users,
//       newPlan: plan.newPlan,
//     }));

//     return {
//       email: state.secondStepData.email || "",
//       domainName: state.secondStepData.domainName || "",
//       cnpj: state.secondStepData.cnpj || "",
//       managerPhone: state.secondStepData.managerPhone || "",
//       manager_name: state.secondStepData.manager_name || "",
//       isVivoClient: state.firstStepData.isVivoClient,
//       alreadyHaveWorkspace: state.firstStepData.alreadyHaveWorkspace,
//       acceptContact: state.secondStepData.acceptContact || false,
//       acceptTerms: state.secondStepData.acceptTerms || false,
//       plan: apiPlans,
//     };
//   },

//   clearOrder: () => {
//     set({
//       selectedPlan: null,
//       confirmedPlans: [],
//       firstStepData: {
//         isVivoClient: true,
//         alreadyHaveWorkspace: false,
//       },
//       secondStepData: {
//         domainName: "",
//         cnpj: "",
//         email: "",
//         manager_name: "",
//         managerPhone: "",
//         acceptContact: true,
//         acceptTerms: false,
//       },
//     });
//   },
// }));

import { create } from "zustand";
import type { Plan, OrderData } from "../interfaces/order";

export interface ConfirmedPlan {
  id: string;
  planName: string;
  price: string;
  users: number;
  type: "mensal" | "anual";
  newPlan: boolean;
}

export interface FirstStepData {
  isVivoClient: boolean;
  alreadyHaveWorkspace: boolean;
}

export interface SecondStepData {
  domainName: string;
  cnpj: string;
  email: string;
  manager_name: string;
  managerPhone: string;
}

export interface ThirdStepData {
  managerPhone: string;
  secondaryPhone: string;
  acceptContact: boolean;
  acceptTerms: boolean;
}

interface OrderFlowStore {
  selectedPlan: Plan | null;
  confirmedPlans: ConfirmedPlan[];
  firstStepData: FirstStepData;
  secondStepData: Partial<SecondStepData>;
  thirdStepData: Partial<ThirdStepData>;
  setSelectedPlan: (plan: Plan) => void;
  setConfirmedPlans: (plans: ConfirmedPlan[]) => void;
  addPlanToConfirmed: (plan: Plan) => void;
  addCurrentPlanToConfirmed: (plan: Plan) => void;
  addNewPlanToConfirmed: (plan: Plan) => void;
  removePlanFromConfirmed: (planId: string) => void;
  updateFirstStepData: (info: Partial<FirstStepData>) => void;
  updateSecondStepData: (info: Partial<SecondStepData>) => void;
  updateThirdStepData: (info: Partial<ThirdStepData>) => void;
  buildCompleteOrder: () => OrderData | null;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderFlowStore>((set, get) => ({
  selectedPlan: null,
  confirmedPlans: [],
  firstStepData: {
    isVivoClient: sessionStorage.getItem("isVivoClient") === "true",
    alreadyHaveWorkspace:
      sessionStorage.getItem("alreadyHaveWorkspace") === "true",
  },
  secondStepData: {
    domainName: "",
    cnpj: "",
    email: "",
    manager_name: "",
    managerPhone: "",
  },
  thirdStepData: {
    managerPhone: "",
    secondaryPhone: "",
    acceptContact: false,
    acceptTerms: false,
  },

  setSelectedPlan: (plan: Plan) => {
    set({ selectedPlan: plan });
  },

  setConfirmedPlans: (plans: ConfirmedPlan[]) => {
    set({ confirmedPlans: plans });
  },

  addPlanToConfirmed: (plan: Plan) => {
    const confirmedPlan: ConfirmedPlan = {
      id: plan.id || Date.now().toString(),
      planName: plan.planName,
      price: plan.price,
      users: plan.users || 1,
      type: plan.type || "anual",
      newPlan: true,
    };
    set((state) => ({
      confirmedPlans: [...state.confirmedPlans, confirmedPlan],
    }));
  },

  addCurrentPlanToConfirmed: (plan: Plan) => {
    const confirmedPlan: ConfirmedPlan = {
      id: plan.id || Date.now().toString(),
      planName: plan.planName,
      price: plan.price,
      users: plan.users || 1,
      type: plan.type || "anual",
      newPlan: false,
    };
    set((state) => ({
      confirmedPlans: [...state.confirmedPlans, confirmedPlan],
    }));
  },

  addNewPlanToConfirmed: (plan: Plan) => {
    const confirmedPlan: ConfirmedPlan = {
      id: plan.id || Date.now().toString(),
      planName: plan.planName,
      price: plan.price,
      users: plan.users || 1,
      type: plan.type || "anual",
      newPlan: true,
    };
    set((state) => ({
      confirmedPlans: [...state.confirmedPlans, confirmedPlan],
    }));
  },

  removePlanFromConfirmed: (planId: string) => {
    set((state) => ({
      confirmedPlans: state.confirmedPlans.filter((plan) => plan.id !== planId),
    }));
  },

  updateFirstStepData: (info: Partial<FirstStepData>) => {
    set((state) => ({
      firstStepData: { ...state.firstStepData, ...info },
    }));
  },

  updateSecondStepData: (info: Partial<SecondStepData>) => {
    set((state) => ({
      secondStepData: { ...state.secondStepData, ...info },
    }));
  },

  updateThirdStepData: (info: Partial<ThirdStepData>) => {
    set((state) => ({
      thirdStepData: { ...state.thirdStepData, ...info },
    }));
  },

  buildCompleteOrder: (): OrderData | null => {
    const state = get();
    if (state.confirmedPlans.length === 0) return null;

    const apiPlans: Plan[] = state.confirmedPlans.map((plan) => ({
      planName: `Google Workspace Business ${plan.planName}`,
      price: plan.price,
      type: plan.type as "mensal" | "anual",
      users: plan.users,
      newPlan: plan.newPlan,
    }));

    return {
      email: state.secondStepData.email || "",
      domainName: state.secondStepData.domainName || "",
      cnpj: state.secondStepData.cnpj || "",
      managerPhone:
        state.thirdStepData.managerPhone ||
        state.secondStepData.managerPhone ||
        "",
      manager_name: state.secondStepData.manager_name || "",
      isVivoClient: state.firstStepData.isVivoClient,
      alreadyHaveWorkspace: state.firstStepData.alreadyHaveWorkspace,
      acceptContact: state.thirdStepData.acceptContact || false,
      acceptTerms: state.thirdStepData.acceptTerms || false,
      plan: apiPlans,
    };
  },

  clearOrder: () => {
    set({
      selectedPlan: null,
      confirmedPlans: [],
      firstStepData: {
        isVivoClient: true,
        alreadyHaveWorkspace: false,
      },
      secondStepData: {
        domainName: "",
        cnpj: "",
        email: "",
        manager_name: "",
        managerPhone: "",
      },
      thirdStepData: {
        managerPhone: "",
        secondaryPhone: "",
        acceptContact: false,
        acceptTerms: false,
      },
    });
  },
}));
