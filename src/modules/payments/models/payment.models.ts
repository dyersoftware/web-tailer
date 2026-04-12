import type { GenericApiResponse } from "../../../resources/models/api.models";

export interface IPayment {
  id: string;
  order_id: string;
  customer_id: string;
  user_id: string;
  amount: string;
  payment_method: string;
  status: string;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface IResPaymentList extends GenericApiResponse {
  data: IPayment[];
}

export interface IResPaymentDetail extends GenericApiResponse {
  data: IPayment;
}
