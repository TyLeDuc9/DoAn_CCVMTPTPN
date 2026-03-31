import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../../redux/Cart/cartThunk";
import { clearCart } from "../../redux/Cart/cartSlice";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Lấy cart khi user login, xóa cart khi logout
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  const handleQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(updateCartItem({ productId, quantity: newQuantity })).unwrap();
    } catch (err: any) {
      alert(err || "Cập nhật thất bại");
    }
  };

  const handleRemove = async (productId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await dispatch(removeCartItem({ productId })).unwrap();
    } catch (err: any) {
      alert(err || "Xóa thất bại");
    }
  };

  const totalPrice =
    cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  if (!user)
    return <div className="p-6">Vui lòng đăng nhập để xem giỏ hàng!</div>;
  if (loading) return <div className="p-6">Đang tải giỏ hàng...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!cart || cart.items.length === 0)
    return <div className="p-6 text-center min-h-screen">Giỏ hàng trống</div>;

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto p-4 md:p-6 mb-20 bg-white shadow-lg rounded-xl mt-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        Giỏ hàng của bạn
      </h1>

      <div className="flex flex-col gap-6">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-6 relative"
          >
            {/* Ảnh sản phẩm */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2">
              <img
                src={item.product.image_url || "/placeholder.png"}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
              <h3 className="font-semibold text-gray-800 line-clamp-1">
                {item.product.name}
              </h3>
              <p className="text-red-500 font-bold text-lg">
                {item.product.price.toLocaleString()}₫
              </p>

              {/* Bộ điều khiển số lượng */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                <button
                  onClick={() => handleQuantity(item.product._id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantity(item.product._id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Thành tiền & Xóa */}
            <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 sm:hidden">Thành tiền:</p>
                <p className="font-bold text-gray-900 text-lg">
                  {(item.product.price * item.quantity).toLocaleString()}₫
                </p>
              </div>
              
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-sm px-4 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Giỏ hàng */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 p-4 rounded-xl">
        <div className="text-center sm:text-left">
          <p className="text-gray-600">Tổng thanh toán:</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-red-600">
            {totalPrice.toLocaleString()}₫
          </h2>
        </div>
        
        <button
          onClick={() => navigate("/checkout")}
          className="w-full sm:w-auto px-10 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 active:scale-95 transition-all text-lg"
        >
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
};