import { useParams } from "react-router-dom";
import { useProductCategory } from "../../hooks/useProductCategory";
import { Item } from "../../components/Item/Item";

export const ProductCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const { products, loading, error, nameCategory } = useProductCategory(
    categorySlug || "",
  );

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="w-[88%] mx-auto ">
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Danh sách phẩm: {nameCategory}
      </h1>

      {products?.length === 0 ? (
        <p>Không có sản phẩm</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products?.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
