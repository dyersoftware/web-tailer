import type { GenericApiResponse } from "../../../resources/models/api.models";

export interface IOrder {
  id: string;
  customer_id: string;
  user_id: string;
  order_number: string;
  total_amount: string;
  payment_type: string;
  payment_status: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
}

export interface IResOrderList extends GenericApiResponse {
  data: IOrder[];
}

export interface IResOrderDetail extends GenericApiResponse {
  data: IOrder;
}
