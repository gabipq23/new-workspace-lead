import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetWorkspacePlanService } from "../services/order";
import type { OrderData } from "../interfaces/order";

export function useOrderControler() {
  const queryClient = useQueryClient();

  const orderService = new GetWorkspacePlanService();

  const { mutateAsync: createOrder, isPending: isCreatingOrderLoading } =
    useMutation({
      mutationFn: async ({ data }: { data: OrderData }) =>
        orderService.createOrder(data),
      onMutate: async () =>
        await queryClient.cancelQueries({ queryKey: ["order"] }),
      onSuccess: (response) => {
        toast.success(`Pedido criado com sucesso! ID: ${response.id}`);
        queryClient.invalidateQueries({ queryKey: ["order"] });
      },
      onError: (error) => {
        toast.error("Houve um erro ao criar o pedido. Tente novamente");
        console.error(error.message);
      },
    });

  const { mutate: updateOrder, isPending: isUpdateOrderFetching } = useMutation(
    {
      mutationFn: async ({ id, data }: { id: number; data: any }) =>
        orderService.updateOrder(id, data),
      onMutate: async ({ id }) =>
        await queryClient.cancelQueries({ queryKey: ["order", id] }),
      onSuccess: (response, { id }) => {
        toast.success("Pedido alterado com sucesso!");
        queryClient.setQueryData(["order", id], response);
      },
      onError: (error) => {
        toast.error("Houve um erro ao alterar o pedido. Tente novamente");
        console.error(error.message);
      },
    }
  );

  const { mutate: changeOrderStatus } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: { status: string };
    }) => orderService.changeOrderStatus(id, data),
    onMutate: async ({ id }) =>
      await queryClient.cancelQueries({ queryKey: ["order", id] }),
    onSuccess: (response, { id }) => {
      toast.success("Status do pedido alterado com sucesso!");
      queryClient.setQueryData(["order", id], response);
    },
    onError: (error) => {
      toast.error("Houve um erro ao alterar o status do pedido.");
      console.error(error.message);
    },
  });

  return {
    createOrder,
    isCreatingOrderLoading,
    updateOrder,
    isUpdateOrderFetching,
    changeOrderStatus,
  };
}

export function useOrderById(orderId: number) {
  const orderService = new GetWorkspacePlanService();

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      return orderService.getOrderById(orderId);
    },
    enabled: !!orderId && !isNaN(orderId) && orderId > 0,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useConsultByCnpj(cnpj: string) {
  const orderService = new GetWorkspacePlanService();

  return useQuery({
    queryKey: ["cnpj", cnpj],
    queryFn: () => {
      return orderService.getCnpjInfo(cnpj);
    },
    enabled: !!cnpj && cnpj.length === 14,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
