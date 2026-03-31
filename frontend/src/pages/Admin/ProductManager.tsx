import { PaginationWrapper } from "../../components/ui/PaginationWrapper";
import { useState } from "react";
import { useAllProducts } from "../../hooks/useAllProduct";
import { Item } from "../../components/Item/Item";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
export const ProductManager = () => {
  const [page, setPage] = useState(1);
  const { products, loading, error, totalPages } = useAllProducts(page, 20);
  const navigate = useNavigate();
  const { deleteProduct, loading: deleting } = useDeleteProduct();
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Bạn có chắc muốn xóa không?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Xóa thành công");
      window.location.reload();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };
  if (loading)
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Quản lý sản phẩm
      </h2>
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => navigate("/admin/add/product")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div>
            <Item key={product._id} product={product} />
            <td className="px-4 py-3 flex justify-center gap-3">
              <button
                onClick={() => navigate(`/admin/edit/product/${product._id}`)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                disabled={deleting}
                className="text-red-500 hover:underline disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </td>
          </div>
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
