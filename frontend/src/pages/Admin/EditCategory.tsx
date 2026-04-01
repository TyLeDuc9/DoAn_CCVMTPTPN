import { useParams, useNavigate } from "react-router-dom";
import { useGetCategoryId } from "../../hooks/useGetCategoryId";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { useEffect, useState } from "react";

export const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { category, loading, error } = useGetCategoryId(id || "");
  const { updateCategory, loading: updating } = useUpdateCategory();

  const [name, setName] = useState("");

  useEffect(() => {
    if (category && name === "") {
      setName(category.name);
    }
  }, [category, name]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCategory(id!, { name });
      alert("Cập nhật thành công");
      navigate("/admin/category");
    } catch (err) {
      alert("Cập nhật thất bại");
    }
  };

  // 👉 loading UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};
