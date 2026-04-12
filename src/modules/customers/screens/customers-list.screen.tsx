import { Link } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import CustomersListComponents from "../components/customers-list.component";

function CustomersListScreen() {
  return (
    <>
      <div className="bg-base-100  shadow-sm p-2 rounded-lg flex items-center justify-end">
        <div className="">
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.customers_paths.registerCustomer}
          >
            Register Customer
          </Link>
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.orders_paths.orders}
          >
            order list
          </Link>
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.orders_paths.createOrder}
          >
            create order
          </Link>
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.orders_paths.orderDetails}
          >
            order details
          </Link>

          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.payments_paths.payments}
          >
            payment List
          </Link>
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.payments_paths.paymentDetails}
          >
            payment details
          </Link>
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.payments_paths.createPayment}
          >
            payment create
          </Link>
        </div>
      </div>

      <CustomersListComponents />
    </>
  );
}

export default CustomersListScreen;
