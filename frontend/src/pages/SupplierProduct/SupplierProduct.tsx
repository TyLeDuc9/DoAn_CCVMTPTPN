import React from "react";
import { useParams } from "react-router-dom";
import { useProductSupplier } from "../../hooks/useProductSupplier";
import { Item } from "../../components/Item/Item";
import type { Product } from "../../types/productType";

export const SupplierProduct: React.FC = () => {
  const { supplierSlug } = useParams<{ supplierSlug: string }>();
  const { products, loading, error , supplier} = useProductSupplier(supplierSlug || "");

  if (loading)
    return <div className="text-center my-4">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-center my-4 text-red-500">Lỗi: {error}</div>;
  if (!products || products.length === 0)
    return <div className="text-center my-4">Chưa có sản phẩm nào</div>;

  return (
    <div className="w-[88%] mx-auto min-h-screen">
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Sản phẩm từ nhà cung cấp: {supplier}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mx-4">
        {products.map((product: Product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
