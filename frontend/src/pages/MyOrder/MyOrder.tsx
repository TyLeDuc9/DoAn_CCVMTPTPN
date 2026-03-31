import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getUserOrdersThunk } from "../../redux/Order/orderThunk";
import type { PopulatedOrder } from "../../types/orderType";
import { useNavigate } from "react-router-dom";

export const MyOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  if (loading) return <div className="text-center py-20 text-green-600 font-medium italic">Đang tải đơn hàng...</div>;
  if (error) return <div className="text-red-500 text-center py-20 font-medium">Lỗi: {error}</div>;
  if (!orders || orders.length === 0)
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg mx-4 mt-10">
        <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào</p>
        <button onClick={() => navigate("/")} className="text-green-600 font-semibold underline">
          Tiếp tục mua sắm
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Đơn hàng của tôi</h1>

      <div className="space-y-8">
        {orders.map((order: PopulatedOrder) => (
          <div
            key={order._id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Header đơn hàng: Mã & Trạng thái */}
            <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Mã đơn hàng</span>
                <span className="text-sm font-mono font-bold text-gray-700 truncate max-w-[200px] sm:max-w-none">
                  #{order._id.toUpperCase()}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  order.status === "processing" ? "bg-blue-100 text-blue-700" :
                  order.status === "delivered" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Nội dung chính: Chia cột trên Desktop */}
            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-8">
              
              {/* Cột 1: Danh sách sản phẩm */}
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Sản phẩm</h3>
                <div className="space-y-4">
                  {order.products.map((item) => (
                    <div key={item.productId._id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg border p-1">
                        <img
                          src={item.productId.image_url || "/placeholder.png"}
                          alt={item.productId.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.productId.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x {item.price.toLocaleString()}₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cột 2: Địa chỉ & Thanh toán */}
              <div className="md:w-1/3 border-t md:border-t-0 md:border-l md:pl-8 pt-6 md:pt-0">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Giao nhận</h3>
                <div className="text-sm space-y-1 text-gray-700">
                  <p className="font-bold text-gray-900">{order.shippingAddressId.fullName}</p>
                  <p>{order.shippingAddressId.phone}</p>
                  <p className="italic leading-relaxed">{order.shippingAddressId.address}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-dashed">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-500 uppercase text-[10px] font-bold">Thanh toán</span>
                    <span className="font-medium text-gray-800 italic">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 uppercase text-xs">Tổng tiền</span>
                    <span className="text-xl font-black text-green-600">
                      {order.total_amount.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer của Card: Ngày tháng & Nút */}
            <div className="bg-gray-50/50 p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[11px] text-gray-400 font-medium italic">
                Đặt ngày: {new Date(order.createdAt).toLocaleString("vi-VN")}
              </p>
              <button
                onClick={() => navigate("/user/order")}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm font-bold rounded-lg transition-colors shadow-sm active:scale-95"
              >
                Quay lại
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};