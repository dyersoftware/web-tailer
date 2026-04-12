import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../services/customers.services";
import type { ICustomerDetails } from "../models/customers.models";

export default function CustomerDetailsScreen() {
  const { id } = useParams();
  const [data, setData] = useState<ICustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCustomer = async () => {
    try {
      const res = await getCustomerById(id!);
      setData(res?.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to load customer");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomer();
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
    <div className="max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="card-title text-2xl">👤 {data.name}</h2>
        <div className="badge badge-neutral">ID: {data.id}</div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Email" value={data.email || "N/A"} />
        <Info label="Phone" value={data.phone} />
        <Info label="Address" value={data.address} />
        <Info label="Admin ID" value={data.admin_user_id} />

        <Info label="Created At" value={formatDate(data.created_at)} />
        <Info label="Updated At" value={formatDate(data.updated_at)} />
      </div>

      {/* Actions */}
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-outline btn-sm">Edit</button>
        <button className="btn btn-error btn-sm">Delete</button>
      </div>
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
