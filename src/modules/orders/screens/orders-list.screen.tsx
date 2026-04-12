import { Link } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import OrdersListComponents from "../components/orders-list.component";

function OrdersListScreen() {
  return (
    <>
      <div className="bg-base-100  shadow-sm p-2 rounded-lg flex items-center justify-end">
        <div className="">
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.orders_paths.createOrder}
          >
            Create Order
          </Link>
        </div>
      </div>

      <OrdersListComponents />
    </>
  );
}

export default OrdersListScreen;
