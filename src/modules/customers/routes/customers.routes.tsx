import CustomerDetailsScreen from "../screens/customer-details.screen";
import CustomersListScreen from "../screens/customers-list.screen";
import RegisterCustomerScreen from "../screens/register-customer.screen";

const customersRoutes = [
  { index: true, element: <CustomersListScreen /> },
  { path: "register-customer", element: <RegisterCustomerScreen /> },
  { path: "details-customer/:id", element: <CustomerDetailsScreen /> },
];

export default customersRoutes;
