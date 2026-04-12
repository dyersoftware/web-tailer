const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_PATHS = {
  LOGIN: `${apiUrl}/auth/login`,
  REGISTER: `${apiUrl}/auth/register`,
  LOGOUT: `${apiUrl}/auth/logout`,
};

export const CUSTOMER_PATHS = {
  ASSIGNED_CUSTOMERS: `${apiUrl}/customers/assigned-customers`,
  REGISTER_CUSTOMER: `${apiUrl}/customers`,
  CUSTOMER_BY_ID: `${apiUrl}/customers`,
};

export const ORDER_PATHS = {
  ORDERS: `${apiUrl}/orders`,
  ORDER_BY_ID: `${apiUrl}/orders`,
};
