import { httpClient } from "../../../resources/axios/send";
import { PAYMENT_PATHS } from "../../../resources/endpoints/api_endpoints.constants";
import type {
  IPayment,
  IPaymentDetail,
  IResPaymentDetail,
  IResPaymentList,
} from "../models/payment.models";

export const getPayments = async (): Promise<IPayment[]> => {
  const response = await httpClient.get<IResPaymentList>(
    PAYMENT_PATHS.PAYMENTS,
  );
  return response.data || [];
};

export const getPaymentsByOrderId = async (
  order_id: string,
): Promise<IPayment[]> => {
  const response = await httpClient.get<IResPaymentList>(
    `${PAYMENT_PATHS.PAYMENTS_BY_ORDER_ID}/${order_id}`,
  );
  return response.data || [];
};

export const getPaymentById = async (
  id: string,
): Promise<IPaymentDetail | null> => {
  const response = await httpClient.get<IResPaymentDetail>(
    `${PAYMENT_PATHS.PAYMENTS}/${id}`,
  );
  return response.data || null;
};
