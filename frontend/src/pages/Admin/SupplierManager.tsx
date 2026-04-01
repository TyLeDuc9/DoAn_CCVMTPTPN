import { useNavigate } from "react-router-dom";
import { useAllSupplier } from "../../hooks/useAllSupplier";
import { useDeleteSupplier } from "../../hooks/useDeleteSupplier";
export const SupplierManager = () => {
  const { suppliers, loading, error } = useAllSupplier();
  const navigate = useNavigate();
  const { deleteSupplier } = useDeleteSupplier();
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Bạn có chắc muốn xóa không?");
    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);
      alert("Xóa thành công");
      window.location.reload();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  if (loading) {
    return <div className="p-6">Loading suppliers...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Quản lý nhà cung cấp
      </h2>
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => navigate("/admin/add/supplier")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Thêm
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-500 text-white uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No suppliers found
                </td>
              </tr>
            ) : (
              suppliers.map((s) => (
                <tr key={s._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{s.name}</td>

                  <td className="px-4 py-3">{s.email}</td>

                  <td className="px-4 py-3">{s.phone}</td>

                  <td className="px-4 py-3">{s.address}</td>

                  <td className="px-4 py-3">
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString()
                      : ""}
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button onClick={()=>navigate(`/admin/edit/supplier/${s._id}`)}  className="text-blue-500 hover:underline">
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-500 hover:underline"
                    >
                    Xóa
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
