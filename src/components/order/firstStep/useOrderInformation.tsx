import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useOrderControler } from "../../../controller/controller";
import type { Plan } from "../../../interfaces/order";
import { useOrderStore } from "../../../context/context";

export function useOrderInformation() {
  const {
    confirmedPlans,
    addCurrentPlanToConfirmed,
    addNewPlanToConfirmed,
    removePlanFromConfirmed,
    firstStepData,
    updateFirstStepData,
  } = useOrderStore();

  const [currentPlanInput, setCurrentPlanInput] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });

  const [newPlanInput, setNewPlanInput] = useState({
    planName: "",
    price: "",
    users: 1,
    type: "",
  });

  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();
  const { createOrder, isCreatingOrderLoading } = useOrderControler();

  const isFormValid = () => {
    const hasAtLeastOnePlan = confirmedPlans.length > 0;
    return hasAtLeastOnePlan;
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }

    const orderData = {
      isVivoClient:
        sessionStorage.getItem("isVivoClient") === "true" ? true : false,
      alreadyHaveWorkspace:
        sessionStorage.getItem("alreadyHaveWorkspace") === "true"
          ? true
          : false,
      email: "a@email.com",
      cnpj: "12345678945632",
      domainName: "a",
      managerPhone: "21996542233",
      manager_name: "a",
      acceptContact: false,
      acceptTerms: false,
      plan: confirmedPlans,
      url: sessionStorage.getItem("currentUrl") || "",
    };

    try {
      const response = await createOrder({ data: orderData });

      navigate(`/client-information/${response.id}`);
      sessionStorage.setItem("status", "aberto");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao criar pedido parcial:", error);
    }
  };

  const removePlan = (planId: string) => {
    removePlanFromConfirmed(planId);
  };

  const addCurrentPlan = () => {
    if (
      currentPlanInput?.planName &&
      currentPlanInput?.price &&
      currentPlanInput?.type
    ) {
      const newPlan: Plan = {
        id: Date.now().toString(),
        planName: currentPlanInput?.planName,
        price: currentPlanInput?.price,
        users: currentPlanInput?.users,
        type: currentPlanInput?.type as "mensal" | "anual",
      };

      addCurrentPlanToConfirmed(newPlan);
      setCurrentPlanInput({
        planName: "",
        price: "",
        users: 1,
        type: "",
      });
    }
  };

  const updateCurrentPlanInput = (field: string, value: string | number) => {
    setCurrentPlanInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCurrentUserIncrease = () => {
    setCurrentPlanInput((prev) => ({
      ...prev,
      users: prev.users + 1,
    }));
  };

  const handleCurrentUserDecrease = () => {
    if (currentPlanInput.users > 1) {
      setCurrentPlanInput((prev) => ({
        ...prev,
        users: prev.users - 1,
      }));
    }
  };

  const addNewPlan = () => {
    if (newPlanInput?.planName && newPlanInput?.price && newPlanInput?.type) {
      const newPlan: Plan = {
        id: Date.now().toString(),
        planName: newPlanInput?.planName,
        price: newPlanInput?.price,
        users: newPlanInput?.users,
        type: newPlanInput?.type as "mensal" | "anual",
      };

      addNewPlanToConfirmed(newPlan);
      setNewPlanInput({
        planName: "",
        price: "",
        users: 1,
        type: "",
      });
    }
  };

  const updateNewPlanInput = (field: string, value: string | number) => {
    setNewPlanInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewUserIncrease = () => {
    setNewPlanInput((prev) => ({
      ...prev,
      users: prev.users + 1,
    }));
  };

  const handleNewUserDecrease = () => {
    if (newPlanInput.users > 1) {
      setNewPlanInput((prev) => ({
        ...prev,
        users: prev.users - 1,
      }));
    }
  };

  const handleAlreadyHaveWorkspaceChange = (value: boolean) => {
    updateFirstStepData({ alreadyHaveWorkspace: value });
    sessionStorage.setItem("alreadyHaveWorkspace", value.toString());
  };

  return {
    hasTriedSubmit,
    handleSubmit,
    confirmedPlans,
    removePlan,
    currentPlanInput,
    updateCurrentPlanInput,
    handleCurrentUserIncrease,
    handleCurrentUserDecrease,
    addCurrentPlan,
    newPlanInput,
    updateNewPlanInput,
    handleNewUserIncrease,
    handleNewUserDecrease,
    addNewPlan,
    isCreatingOrderLoading,
    alreadyHaveWorkspace: firstStepData.alreadyHaveWorkspace,
    handleAlreadyHaveWorkspaceChange,
  };
}
