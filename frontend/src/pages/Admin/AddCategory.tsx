import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategory } from "../../hooks/useCreateCategory";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const { createCategory, loading, error } = useCreateCategory();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Tên danh mục không được để trống");
      return;
    }

    try {
      await createCategory({ name });
      alert("Tạo danh mục thành công");

      // quay lại list category
      navigate("/admin/category");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thêm danh mục</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Tên danh mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập tên danh mục..."
          />
        </div>

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          {loading ? "Đang tạo..." : "Tạo danh mục"}
        </button>
      </form>
    </div>
  );
};