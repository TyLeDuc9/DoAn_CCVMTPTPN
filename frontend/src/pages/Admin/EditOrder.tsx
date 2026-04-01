import { useNavigate, useParams } from "react-router";
import { useUpdateOrder } from "../../hooks/useUpdadateOrder";
import { useState } from "react";

export const EditOrder = () => {
  const { id } = useParams();
  const { updateStatus, loading, error } = useUpdateOrder();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "pending" | "processing" | "delivered" | "cancelled"
  >("pending");

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as typeof status;
    setStatus(newStatus);

    if (!id) {
      alert("Không có ID đơn hàng!");
      return;
    }

    try {
      const updatedOrder = await updateStatus(id, newStatus);
      alert("Cập nhật trạng thái thành công!");
      navigate("/admin/order");
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cập nhật trạng thái đơn hàng
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Trạng thái
          </label>

          <select
            value={status}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="pending"> Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* trạng thái loading */}
        {loading && (
          <div className="text-center text-blue-500 font-medium">
             Đang cập nhật...
          </div>
        )}

        {/* lỗi */}
        {error && (
          <div className="text-center text-red-500 font-medium mt-2">
             {error}
          </div>
        )}

        {/* button quay lại */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
};
