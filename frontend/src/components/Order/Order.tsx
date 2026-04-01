// Order.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getUserOrdersThunk } from "../../redux/Order/orderThunk";
import type { PopulatedOrder } from "../../types/orderType";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  if (loading) return <div className="text-center py-10 text-green-600 font-medium italic">Đang tải danh sách đơn hàng...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-medium">Lỗi: {error}</div>;

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Đơn hàng của tôi
      </h2>

      {orders.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center border-2 border-dashed">
          <p className="text-gray-500 italic">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: PopulatedOrder) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header của thẻ đơn hàng */}
              <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Mã đơn hàng</span>
                  <p 
                    onClick={() => navigate(`${order._id}`)} 
                    className="font-mono text-sm text-green-700 cursor-pointer hover:underline font-bold"
                  >
                    #{order._id.slice(-10).toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                   <span className="hidden sm:block text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                   </span>
                   <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === "pending" ? " text-yellow-600" : 
                      order.status === "processing" ? " text-blue-600" : 
                      order.status === "delivered" ? " text-green-600" : 
                      " text-red-600"
                    }`}
                  >
                    {order.status === "pending" ? "Chờ xử lý" : 
                     order.status === "delivered" ? "Đã giao" : order.status}
                  </span>
                </div>
              </div>

              {/* Nội dung chính */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Cột sản phẩm (Chiếm 7 cột trên PC) */}
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Sản phẩm đã mua</p>
                  <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {order.products.map((item) => (
                      <div key={item.productId._id} className="flex items-center gap-4 mb-3 last:mb-0">
                        <img
                          src={item.productId.image_url || "/placeholder.png"}
                          alt={item.productId.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.productId.name}</p>
                          <p className="text-xs text-gray-500">SL: {item.quantity} x {item.price.toLocaleString()}₫</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cột thông tin giao hàng & Giá (Chiếm 5 cột trên PC) */}
                <div className="md:col-span-5  p-4 rounded-lg flex flex-col justify-between">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex justify-between font-medium text-gray-800">
                      <span>Người nhận:</span>
                      <span>{order.shippingAddressId.fullName}</span>
                    </p>
                    <p className="text-xs text-right italic">{order.shippingAddressId.phone}</p>
                    <p className="text-xs text-right truncate" title={order.shippingAddressId.address}>
                      {order.shippingAddressId.address}
                    </p>
                    <p className="text-xs text-right text-gray-400">PTTT: {order.payment_method}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-end">
                    <span className="text-sm font-bold text-gray-700 uppercase">Tổng cộng:</span>
                    <span className="text-xl font-black text-red-500">
                      {order.total_amount.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút Xem chi tiết cho Mobile */}
              <div className="p-4 bg-white md:hidden border-t">
                 <button 
                  onClick={() => navigate(`${order._id}`)}
                  className="w-full py-2 bg-green-50 text-green-600 text-sm font-bold rounded-lg"
                 >
                   Xem chi tiết đơn hàng
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};