import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSupplier } from "../../hooks/useCreateSupplier";

export const AddSupplier = () => {
  const navigate = useNavigate();
  const { createSupplier, loading, error } = useCreateSupplier();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await createSupplier(form);

    if (res) {
      alert("Thêm supplier thành công!");
      navigate("/admin/supplier"); // chỉnh lại route nếu khác
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

    

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Create Supplier"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};