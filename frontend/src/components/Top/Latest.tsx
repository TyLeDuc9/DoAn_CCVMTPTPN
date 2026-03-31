import { useLatestProduct } from "../../hooks/useLatestProduct"; 
import { Item } from "../Item/Item";

export const Latest = () => {
  const { products, loading, error } = useLatestProduct();

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mx-4 lg:w-[80%] lg:mx-auto">
      {products.map((product) => (
        <Item key={product._id} product={product} />
      ))}
    </div>
  );
};