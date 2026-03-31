import { useAllOrder } from "../../hooks/useAllOrder";

export const OrderManager = () => {
  const { orders, loading, error } = useAllOrder();

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Đang tải đơn hàng...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500">{error}</div>
    );

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h2>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Chưa có đơn hàng nào
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left  font-medium">
                  ID Đơn
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Người đặt
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Tổng tiền
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Trạng thái
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Thanh toán
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Ngày tạo
                </th>
                <th className="px-4 py-2 text-left  font-medium">
                  Sản phẩm
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
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
                        className="flex items-center mb-1"
                      >
                        <img
                          src={p.productId.image_url}
                          alt={p.productId.name}
                          className="w-12 h-12 object-cover rounded mr-2"
                        />
                        <div>
                          <span className="font-medium">
                            {p.productId.name}
                          </span>{" "}
                          x {p.quantity} - {p.price.toLocaleString()}₫
                        </div>
                      </div>
                    ))}
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