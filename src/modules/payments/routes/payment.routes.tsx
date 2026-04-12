import CreatePaymentScreen from "../screens/create-payment.screen";
import PaymentDetailScreen from "../screens/payment-detail.screen";
import PaymentListScreen from "../screens/payment-list.screen";

const paymentsRoutes = [
  { index: true, element: <PaymentListScreen /> },
  { path: "create-payment", element: <CreatePaymentScreen /> },
  { path: "payment-detail/:id", element: <PaymentDetailScreen /> },
];

export default paymentsRoutes;
