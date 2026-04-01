  import { useNavigate } from "react-router";
  import { useAllOrder } from "../../hooks/useAllOrder";

  export const OrderManager = () => {
    const { orders, loading, error } = useAllOrder();
    const navigate = useNavigate();

    if (loading)
      return (
        <div className="text-center py-10 text-gray-500">
          Đang tải đơn hàng...
        </div>
      );
    if (error)
      return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
      <div className="p-6 min-h-screen bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Quản lý đơn hàng
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Chưa có đơn hàng nào
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    ID Đơn
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Người đặt
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Tổng tiền
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Thanh toán
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Sản phẩm
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Sửa
                  </th>
                  <th className="px-4 py-3 text-left font-semibold uppercase text-sm">
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {order._id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {order.userId?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {order.total_amount.toLocaleString()}₫
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-semibold ${
                        order.status === "pending"
                          ? "text-yellow-500"
                          : order.status === "processing"
                            ? "text-blue-500"
                            : order.status === "delivered"
                              ? "text-green-500"
                              : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {order.payment_method}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {order.products.map((p) => (
                        <div
                          key={p.productId._id}
                          className="flex items-center mb-2"
                        >
                          <img
                            src={p.productId.image_url}
                            alt={p.productId.name}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                          <div className="ml-2">
                            <div className="font-medium text-gray-800">
                              {p.productId.name}
                            </div>
                            <div className="text-gray-500 text-sm">
                              x{p.quantity} - {p.price.toLocaleString()}₫
                            </div>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="px-2 py-1">
                      <button
                        onClick={() => navigate(`/admin/edit/order/${order._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Sửa
                      </button>
                    </td>
                    <td className="px-2 py-1">
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
