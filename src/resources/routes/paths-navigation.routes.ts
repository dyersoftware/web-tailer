export const navigate_paths = {
  dashboard: "/dashboard",
  auth: {
    login: "/",
    register: "/auth/register",
  },

  customers_paths: {
    customers: "/customers",
    registerCustomer: "/customers/register-customer",
    customerDetails: "/customers/details-customer",
  },
  orders_paths: {
    orders: "/orders",
    createOrder: "/orders/create-order",
    orderDetails: "/orders/order-detail/:id",
  },
  payments_paths: {
    payments: "/payments",
    createPayment: "/payments/create-payment",
    paymentDetails: "/payments/payment-detail/:id",
  },
};
