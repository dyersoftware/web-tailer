import OrderListScreen from "../screens/order-list.screen";
import RegisterCustomerScreen from "../screens/register-customer.screen";

const tmsRoutes = [
  { index: true, element: <OrderListScreen /> },
  { path: "register-customer", element: <RegisterCustomerScreen /> },
];

export default tmsRoutes;
