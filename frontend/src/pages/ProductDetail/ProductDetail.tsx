import { useParams } from "react-router-dom";
import { useGetProductSlug } from "../../hooks/useGetProductSlug";
import type {  AppDispatch } from "../../redux/store";
import { addToCart, fetchCart } from "../../redux/Cart/cartThunk";
import { useDispatch } from "react-redux";
export const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { product, loading, error } = useGetProductSlug(productSlug || "");
   const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    if (!product?._id) return;

    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      alert("Thêm vào giỏ hàng thành công!");
      // Tùy chọn: fetch lại cart để cập nhật UI
      dispatch(fetchCart());
    } catch (err: any) {
      alert(err || "Thêm vào giỏ hàng thất bại");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-500">
        Đang tải sản phẩm...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-lg text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-500">
        Không tìm thấy sản phẩm
      </div>
    );

  return (
    <div className="w-[80%] mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      {/* Tên sản phẩm */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{product.name}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Ảnh sản phẩm */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image_url || "/placeholder.png"}
            alt={product.name}
            className="w-full h-80 md:h-[400px] object-contain rounded-lg shadow-sm"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <p>
            <span className="font-semibold text-gray-700">Giá:</span>{" "}
            <span className="text-red-500 text-xl font-bold">
              {product.price?.toLocaleString() ?? "0"}₫
            </span>
          </p>



          <p>
            <span className="font-semibold text-gray-700">Danh mục:</span>{" "}
            <span className="text-gray-600">
              {product.categoryId && typeof product.categoryId !== "string"
                ? product.categoryId.name
                : "Chưa có"}
            </span>
          </p>

          <p>
            <span className="font-semibold text-gray-700">Nhà cung cấp:</span>{" "}
            <span className="text-gray-600">
              {product.supplierId && typeof product.supplierId !== "string"
                ? product.supplierId.name
                : "Chưa có"}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-700 ">Mô tả:</span>{" "}
            <span className="text-gray-600 line-clamp-6">{product.description}</span>
          </p>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};