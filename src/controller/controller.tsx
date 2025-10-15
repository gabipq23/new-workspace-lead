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
  return { createOrder, isCreatingOrderLoading };
}
