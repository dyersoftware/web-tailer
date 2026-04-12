import { httpClient } from "../../../resources/axios/send";
import { ORDER_PATHS } from "../../../resources/endpoints/api_endpoints.constants";
import type { IOrder, IResOrderList } from "../models/orders.models";

export const getOrders = async (): Promise<IOrder[]> => {
  const response = await httpClient.get<IResOrderList>(ORDER_PATHS.ORDERS);
  return response.data || [];
};
