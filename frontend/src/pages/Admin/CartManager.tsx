import { useAllCart } from "../../hooks/useAllCart";

export const CartManager = () => {
  const { carts, loading, error } = useAllCart();

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quản lý giỏ hàng</h1>

      {carts.length === 0 ? (
        <p className="text-gray-500">Không có giỏ hàng nào</p>
      ) : (
        <div className="space-y-6">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* User Info */}
              <div className="mb-4 pb-2">
                <p className="font-semibold text-lg">
                  {cart.userId?.name}
                </p>
                <p className="text-gray-600">{cart.userId?.email}</p>
                <p className="text-gray-400 text-sm">
                  {cart.userId?.phone}
                </p>
              </div>

              {/* Items */}
              {cart.items.length === 0 ? (
                <p className="text-gray-400">Giỏ hàng trống</p>
              ) : (
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between rounded-lg p-3"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />

                        <div>
                          <p className="font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Giá: {item.product.price.toLocaleString()}đ
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p>Số lượng: {item.quantity}</p>
                        <p className="font-semibold text-red-500">
                          {(item.product.price * item.quantity).toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="mt-4 text-right font-bold text-lg">
                Tổng tiền:{" "}
                {cart.items
                  .reduce(
                    (total, item) =>
                      total + item.product.price * item.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                đ
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};