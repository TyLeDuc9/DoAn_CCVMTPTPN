import { PaginationWrapper } from "../../components/ui/PaginationWrapper";
import { useState } from "react";
import { useAllProducts } from "../../hooks/useAllProduct";
import { Item } from "../../components/Item/Item";

export const AllProduct = () => {
  const [page, setPage] = useState(1);
  const { products, loading, error, totalPages } = useAllProducts(page, 20);

  if (loading)
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="w-[80%] mx-auto py-6">
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">Danh sách sản phẩm </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <PaginationWrapper
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};
