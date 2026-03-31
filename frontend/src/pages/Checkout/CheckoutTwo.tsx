import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { createOrderThunk } from "../../redux/Order/orderThunk";

export const CheckoutTwo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { addresses } = useSelector((state: RootState) => state.address);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { loading, error } = useSelector((state: RootState) => state.order);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses[0]?._id || null,
  );
  const [paymentMethod, setPaymentMethod] = useState<"Code" | "VNPAY">("Code");

  const handleCreateOrder = async () => {
    if (!cart || cart.items.length === 0) return alert("Giỏ hàng trống");
    if (!selectedAddressId) return alert("Vui lòng chọn địa chỉ");

    try {
      const resultAction = await dispatch(
        createOrderThunk({
          shippingAddressId: selectedAddressId,
          payment_method: paymentMethod,
        }),
      );

      if (createOrderThunk.fulfilled.match(resultAction)) {
        alert("Đặt hàng thành công!");
        navigate("/user/order");
      } else {
        alert("Đặt hàng thất bại: " + resultAction.payload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Tính tổng tiền
  const totalPrice = cart?.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="w-[80%] mx-auto p-6 min-h-screen bg-white my-8 shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-semibold">Đặt hàng</h2>

      {/* Giỏ hàng */}
      {cart && cart.items.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Giỏ hàng của bạn</h3>
          <div className="rounded-md overflow-hidden">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between border my-2 p-4 rounded-xl"
              >
                <div>
                  <img
                    src={item.product.image_url}
                    className="w-16 h-16 object-contain"
                  />
                  <p>{item.product.name}</p>
                  <p>SL: {item.quantity}</p>
                </div>
                <p>{(item.product.price * item.quantity).toLocaleString()}₫</p>
              </div>
            ))}
          </div>
          <p className="text-right font-bold text-lg">
            Tổng tiền: {totalPrice?.toLocaleString()}₫
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Giỏ hàng trống</p>
      )}

      {/* Địa chỉ */}
      <div className="space-y-2">
        <label className="block text-lg font-medium">Chọn địa chỉ:</label>
        <select
          value={selectedAddressId || ""}
          onChange={(e) => setSelectedAddressId(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.fullName} - {addr.phone} - {addr.address}
            </option>
          ))}
        </select>
      </div>

      {/* Phương thức thanh toán */}
      <div className="space-y-2">
        <label className="block text-lg font-medium">
          Chọn phương thức thanh toán:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Code"
              checked={paymentMethod === "Code"}
              onChange={() => setPaymentMethod("Code")}
              className="accent-green-500"
            />
            CODE
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="VNPAY"
              checked={paymentMethod === "VNPAY"}
              onChange={() => setPaymentMethod("VNPAY")}
              className="accent-green-500"
            /> VNPAY
          </label>
        </div>
      </div>

      {/* Nút đặt hàng */}
      <button
        onClick={handleCreateOrder}
        disabled={loading || !cart || cart.items.length === 0}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Đang tạo đơn..." : "Đặt hàng"}
      </button>

      {/* Lỗi */}
      {error && <p className="text-red-500 font-medium">{error}</p>}
    </div>
  );
};
