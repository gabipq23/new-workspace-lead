import { useState } from "react";
import { useOrderStore } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import { useOrderControler } from "../../../controller/controller";
import type { Plan } from "../../../interfaces/order";

interface BasicInfo {
  cnpj: string;
  email: string;
  manager_name: string;
  managerPhone: string;
  isVivoClient: boolean;
  acceptContact: boolean;
}
export function useOrderInformation(
  basicInfo: BasicInfo,
  updateBasicInfo: (info: Partial<BasicInfo>) => void
) {
  const {
    confirmedPlans,
    addCurrentPlanToConfirmed,
    addNewPlanToConfirmed,
    removePlanFromConfirmed,
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

  const [cnpj, setCnpj] = useState(basicInfo.cnpj);
  const [email, setEmail] = useState(basicInfo.email);
  const [manager_name, setmanager_name] = useState(basicInfo.manager_name);
  const [managerPhone, setManagerPhone] = useState(basicInfo.managerPhone);
  const isVivoClient = sessionStorage.getItem("isVivoClient") === "true";
  const [acceptContact, setAcceptContact] = useState(basicInfo.acceptContact);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const navigate = useNavigate();
  const { createOrder, isCreatingOrderLoading, changeOrderStatus } =
    useOrderControler();

  const hasWorkspace = sessionStorage.getItem("alreadyHaveWorkspace");

  const isFormValid = () => {
    const hasAtLeastOnePlan = confirmedPlans.length > 0;
    const cnpjDigits = cnpj.replace(/\D/g, "");
    const hasValidCnpj = cnpjDigits.length === 14;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = emailRegex.test(email);
    const hasValidmanager_name = manager_name.trim() !== "";
    const hasValidManagerPhone = managerPhone.replace(/\D/g, "").length === 11;
    const hasAcceptedContact = acceptContact === true;
    return (
      hasAtLeastOnePlan &&
      hasValidCnpj &&
      hasValidEmail &&
      hasValidmanager_name &&
      hasValidManagerPhone &&
      hasAcceptedContact
    );
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (!isFormValid()) {
      return;
    }

    updateBasicInfo({
      cnpj: cnpj,
      email: email,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
    });
    const alreadyHaveWorkspace = hasWorkspace === "true";

    const orderData = {
      email: email,
      cnpj: cnpj,
      manager_name: manager_name,
      managerPhone: managerPhone,
      isVivoClient: isVivoClient,
      acceptContact: acceptContact,
      plan: confirmedPlans,
      alreadyHaveWorkspace: alreadyHaveWorkspace,

      domainName: alreadyHaveWorkspace ? "" : "",
      acceptTerms: alreadyHaveWorkspace ? true : false,
    };

    try {
      const response = await createOrder({ data: orderData });

      if (alreadyHaveWorkspace) {
        await changeOrderStatus({
          id: Number(response.id),
          data: { status: "fechado" },
        });

        navigate(`/order/${response.id}`);
      } else {
        navigate(`/client-information/${response.id}`);
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
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

  return {
    cnpj,
    setCnpj,
    email,
    setEmail,
    manager_name,
    setmanager_name,
    managerPhone,
    setManagerPhone,
    isVivoClient,
    acceptContact,
    setAcceptContact,
    hasTriedSubmit,
    handleSubmit,
    confirmedPlans,
    removePlan,
    currentPlanInput,
    updateCurrentPlanInput,
    hasWorkspace,
    handleCurrentUserIncrease,
    handleCurrentUserDecrease,
    addCurrentPlan,
    newPlanInput,
    updateNewPlanInput,
    handleNewUserIncrease,
    handleNewUserDecrease,
    addNewPlan,
    isCreatingOrderLoading,
  };
}
