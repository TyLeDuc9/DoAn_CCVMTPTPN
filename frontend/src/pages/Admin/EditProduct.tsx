import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductId } from "../../hooks/useGetProductId";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading } = useGetProductId(id || "");
  const { updateProduct, loading: updating } = useUpdateProduct();

  // state form
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [organicCertification, setOrganicCertification] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // load data vào form
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description || "");
      setCategoryId(
        typeof product.categoryId === "string"
          ? product.categoryId
          : product.categoryId?._id || ""
      );
      setSupplierId(
        typeof product.supplierId === "string"
          ? product.supplierId
          : product.supplierId?._id || ""
      );
      setOrganicCertification(product.organic_certification || "");
      setPreview(product.image_url || "");
    }
  }, [product]);

  // chọn ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!id) return;

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("supplierId", supplierId);
    formData.append("organic_certification", organicCertification);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await updateProduct(id, formData);

    if (res) {
      alert("Cập nhật thành công");
      navigate("/admin/product");
    }

  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    alert(err?.message || "Update thất bại");
  }
};
  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border p-2"
        />

        <input
          type="number"
          placeholder="Tồn kho"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full border p-2"
        />

        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Supplier ID"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Organic Certification"
          value={organicCertification}
          onChange={(e) => setOrganicCertification(e.target.value)}
          className="w-full border p-2"
        />

        <input type="file" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover"
          />
        )}

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {updating ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};