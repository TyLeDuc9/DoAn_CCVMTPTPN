import { useNavigate } from "react-router-dom";
import { useAllCategory } from "../../hooks/useAllCategory";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";

export const Category = () => {
  const { categories, loading, error } = useAllCategory();
  const { deleteCategory, loading: deleting } = useDeleteCategory();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Bạn có chắc muốn xóa không?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      alert("Xóa thành công");
      window.location.reload();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  if (loading) {
    return <div className="p-6">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Quản lý danh mục
      </h2>

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => navigate("/admin/add/category")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-500 text-white uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>

                  <td className="px-4 py-3">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString()
                      : ""}
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button onClick={()=>navigate(`/admin/edit/category/${c._id}`)} className="text-blue-500 hover:underline">
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      disabled={deleting}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};