import { httpClient } from "../../../resources/axios/send";
import { CUSTOMER_PATHS } from "../../../resources/endpoints/api_endpoints.constants";
import type { ICustomer, ICustomersResponse } from "../models/customers.models";

export const customersService = {
  async getAssignedCustomers(): Promise<ICustomer[]> {
    const response = await httpClient.get<ICustomersResponse>(
      CUSTOMER_PATHS.ASSIGNED_CUSTOMERS,
    );
    return response.data || [];
  },
};
