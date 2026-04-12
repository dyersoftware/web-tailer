import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import { FaMoneyBill1 } from "react-icons/fa6";
import { getOrderById } from "../services/orders.services";
import type { IOrder } from "../models/orders.models";
import PaymentListComponent from "../../payments/components/payments-list.component";

export default function OrderDetailScreen() {
  const { id } = useParams();
  const [data, setData] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id!);
      setData(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error mt-10">
        <span>{error}</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="card-title text-2xl">👤 {data.order_number}</h2>
        <div className="badge badge-neutral">ID: {data.id}</div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Order Number" value={data.order_number || "N/A"} />
        <Info label="Customer Name" value={data.customer_name || "N/A"} />
        <Info label="Payment Type" value={data.payment_type || "N/A"} />
        <Info label="Payment Status" value={data.payment_status || "N/A"} />

        <Info label="Created At" value={formatDate(data.created_at)} />
        <Info label="Updated At" value={formatDate(data.updated_at)} />
      </div>
      {/* Actions */}
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-outline btn-sm">Edit</button>
        <button className="btn btn-error btn-sm">Delete</button>
      </div>
      {/* Order List */}
      <div className="divider"></div>
      <div className="flex justify-between items-center px-4 ">
        <h2 className="card-title text-2xl">
          <FaMoneyBill1 />
          Payment List
        </h2>
        <div className="">
          <div className="">
            <Link
              className="btn btn-primary text-white"
              to={navigate_paths.payments_paths.createPayment}
            >
              Create Payment
            </Link>
          </div>
        </div>
      </div>
      <PaymentListComponent />
    </div>
  );
}

/* 🔹 Reusable Info Component */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-base-200 p-3 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold break-words">{value}</p>
    </div>
  );
}

/* 🔹 Date Formatter */
function formatDate(date: string) {
  return new Date(date).toLocaleString();
}
