import { useParams, useNavigate } from "react-router-dom";
import { useGetSupplierId } from "../../hooks/useGetSupllierId"; 
import { useUpdateSupplier } from "../../hooks/useUpdateSupplier";
import { useEffect, useState } from "react";

export const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { supplier, loading, error } = useGetSupplierId(id || "");
  const { updateSupplier, loading: updating, error: updateError } =
    useUpdateSupplier();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (supplier) {
      setName(supplier.name || "");
      setEmail(supplier.email || "");
      setPhone(supplier.phone || "");
      setAddress(supplier.address || "");
    }
  }, [supplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // validate đơn giản
    if (!name) return alert("Tên không được để trống");

    await updateSupplier(id, {
      name,
      email,
      phone,
      address,
    });

    alert("Cập nhật thành công");
    navigate("/admin/supplier");
  };

  // loading + error UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Edit Supplier
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <input
          type="text"
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Error update */}
        {updateError && (
          <p className="text-red-500 text-sm">{updateError}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={updating}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};