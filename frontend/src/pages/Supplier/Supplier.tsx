import { useAllSupplier } from "../../hooks/useAllSupplier";
import { useHandleSlugSupplier } from "../../hooks/useHandleSlugSupplier";

export const Supplier: React.FC = () => {
  const { suppliers = [], error, loading } = useAllSupplier();
  const { handleSlug } = useHandleSlugSupplier();

  return (
    <div className="min-h-screen w-[80%] mx-auto py-10">

      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Đối tác cung cấp sản phẩm chất lượng uy tín của chúng tôi
      </h1>


      {loading && (
        <p className="text-center mt-10 text-gray-500">Đang tải...</p>
      )}


      {error && (
        <p className="text-center mt-10 text-red-500">{error}</p>
      )}


      {!loading && !error && suppliers.length > 0 && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {suppliers.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center hover:shadow-xl transition duration-300"
            >
  
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      
                <span className="text-gray-400 font-bold text-lg">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>


              <h2 className="text-lg font-semibold text-green-600 mb-1 text-center">
                {item.name}
              </h2>

      
              <p className="text-sm text-gray-500 text-center">
                {item.address || "Chưa cập nhật"}
              </p>

              <button
                onClick={() => handleSlug(item)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && suppliers.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          Chưa có nhà cung cấp
        </p>
      )}
    </div>
  );
};