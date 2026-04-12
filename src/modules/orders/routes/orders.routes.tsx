import CreateOrderScreen from "../screens/create-order.screen";
import OrderDetailScreen from "../screens/order-details.screen";
import OrdersListScreen from "../screens/orders-list.screen";

const ordersRoutes = [
  { index: true, element: <OrdersListScreen /> },
  { path: "create-order", element: <CreateOrderScreen /> },
  { path: "order-detail/:id", element: <OrderDetailScreen /> },
];

export default ordersRoutes;
