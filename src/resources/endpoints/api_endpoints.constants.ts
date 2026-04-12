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
