import { api } from "../configs/api";
import type { OrderData } from "../interfaces/order";

export class GetWorkspacePlanService {
  async createOrder(data: OrderData) {
    const response = await api.post(`/workspace/pedidos`, data);
    return response.data;
  }
}
