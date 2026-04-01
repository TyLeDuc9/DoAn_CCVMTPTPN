import { useState } from "react";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const { createProduct, loading, error } = useCreateProduct();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: "",
    organic_certification: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // handle change input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // validate đơn giản
  const validate = () => {
    if (!form.name) return "Tên sản phẩm không được để trống";
    if (!form.price) return "Giá không được để trống";
    if (Number(form.price) <= 0) return "Giá phải > 0";
    return null;
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", Number(form.price).toString());
    formData.append("stock", Number(form.stock).toString());

    if (form.categoryId) {
      formData.append("categoryId", form.categoryId);
    }

    if (form.supplierId) {
      formData.append("supplierId", form.supplierId);
    }

    if (form.organic_certification) {
      formData.append(
        "organic_certification",
        form.organic_certification
      );
    }

    if (image) {
      formData.append("image_url", image);
    }

    const res = await createProduct(formData);

    if (res) {
      alert("Tạo sản phẩm thành công!");
      navigate("/admin/product"); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Stock */}
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Category */}
        <input
          name="categoryId"
          type="text"
          placeholder="Category ID"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Supplier */}
        <input
          name="supplierId"
          type="text"
          placeholder="Supplier ID"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Certification */}
        <input
          name="organic_certification"
          type="text"
          placeholder="Organic Certification (VD: VietGAP, USDA...)"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        {/* Image */}
        <div>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};