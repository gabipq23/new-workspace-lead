import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      onSuccess: () => {
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
      onMutate: async () =>
        await queryClient.cancelQueries({ queryKey: ["order"] }),
      onSuccess: () => {
        toast.success("Pedido alterado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["order"] });
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
    onMutate: async () =>
      await queryClient.cancelQueries({ queryKey: ["order"] }),
    onSuccess: () => {
      toast.success("Status do pedido alterado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["order"] });
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
