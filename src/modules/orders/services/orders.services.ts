import { httpClient } from "../../../resources/axios/send";
import { ORDER_PATHS } from "../../../resources/endpoints/api_endpoints.constants";
import type {
  IOrder,
  IResOrderDetail,
  IResOrderList,
} from "../models/orders.models";

export const getOrders = async (customer_id: number): Promise<IOrder[]> => {
  const response = await httpClient.get<IResOrderList>(
    `${ORDER_PATHS.ORDERS}?customer_id=${customer_id}`,
  );
  return response.data || [];
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  const response = await httpClient.get<IResOrderDetail>(
    `${ORDER_PATHS.ORDERS}/${id}`,
  );
  return response.data || null;
};
