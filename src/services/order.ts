import { api } from "../configs/api";
import type { OrderData } from "../interfaces/order";

export class GetWorkspacePlanService {
  async createOrder(data: OrderData) {
    const response = await api.post(`/workspace/pedidos`, data);
    return response.data;
  }

  async updateOrder(id: number, data: any): Promise<any> {
    const response = await api.put(`/workspace/pedidos/${id}`, data);
    return response.data;
  }

  async changeOrderStatus(id: number, data: { status: string }) {
    await api.patch(`/workspace/pedidos/${id}/status`, data);
  }

  async getOrderById(id: number | number) {
    const response = await api.get(`/workspace/pedidos/${id}`);
    return response.data;
  }
}
