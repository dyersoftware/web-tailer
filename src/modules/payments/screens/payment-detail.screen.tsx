import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";
import { FaMoneyBill1 } from "react-icons/fa6";
import type { IPaymentDetail } from "../models/payment.models";
import { getPaymentById } from "../services/payment.services";

export default function PaymentDetailScreen() {
  const { id } = useParams();
  const [data, setData] = useState<IPaymentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchPayment = async () => {
    try {
      const res = await getPaymentById(id!);
      setData(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to load payment");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayment();
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
        <h2 className="card-title text-2xl">👤 {data.customer_name}</h2>
        <div className="badge badge-neutral">Amount: {data.amount}</div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Order Number" value={data.payment_method || "N/A"} />
        <Info label="Customer Name" value={data.status || "N/A"} />

        <Info label="Created At" value={formatDate(data.created_at)} />
        <Info label="Updated At" value={formatDate(data.updated_at)} />
      </div>
      {/* Actions */}
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-outline btn-sm">Edit</button>
        <button className="btn btn-error btn-sm">Delete</button>
      </div>
      {/* Order List */}
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
