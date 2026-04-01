import React from "react";
import { useFourProduct } from "../../hooks/useFourProduct";
import { Item } from "../Item/Item";

interface FourProductProps {
  categorySlug: string;
}

export const FourProduct: React.FC<FourProductProps> = ({ categorySlug }) => {
  const { products, loading, error } = useFourProduct(categorySlug);

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (products.length === 0) return <div>Không có sản phẩm nào trong danh mục này</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mx-4 lg:w-[80%] lg:mx-auto">
      {products.map((product) => (
        <Item key={product._id} product={product} />
      ))}
    </div>
  );
};