import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";

import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../redux/Address/addressThunk";

import { fetchCart } from "../../redux/Cart/cartThunk";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { addresses } = useSelector((state: RootState) => state.address);
  const { cart } = useSelector((state: RootState) => state.cart);

  // ================= STATE =================
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    isDefault: false,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  // ================= FETCH =================
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCart());
  }, [dispatch]);

  // auto chọn default
  useEffect(() => {
    setSelectedAddressId((prev) => {
      const defaultAddr = addresses.find((a: any) => a.isDefault);
      return defaultAddr ? (prev ?? defaultAddr._id) : prev;
    });
  }, [addresses]);

  // ================= HANDLE =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (editingId) {
      dispatch(updateAddress({ id: editingId, data: form }));
      setEditingId(null);
    } else {
      dispatch(createAddress(form));
    }

    setForm({
      fullName: "",
      phone: "",
      address: "",
      isDefault: false,
    });
  };

  const handleEdit = (addr: any) => {
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      isDefault: addr.isDefault,
    });
    setEditingId(addr._id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xoá?")) {
      dispatch(deleteAddress(id));
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  // ================= TOTAL =================
  const totalPrice =
    cart?.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  return (
    <div className="w-[80%] mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Địa chỉ giao hàng</h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-2xl shadow mb-6 space-y-3"
          >
            <h3 className="text-lg font-semibold">
              {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
            </h3>

            <input
              className="w-full border rounded-lg px-3 py-2"
              name="fullName"
              placeholder="Họ tên"
              value={form.fullName}
              onChange={handleChange}
            />

            <input
              className="w-full border rounded-lg px-3 py-2"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              className="w-full border rounded-lg px-3 py-2"
              name="address"
              placeholder="Địa chỉ"
              value={form.address}
              onChange={handleChange}
            />

            <label className="flex gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
              />
              Mặc định
            </label>

            <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
              {editingId ? "Cập nhật" : "Thêm"}
            </button>
          </form>

          {/* LIST */}
          <div className="space-y-3">
            {addresses.map((addr: any) => (
              <div
                key={addr._id}
                onClick={() => handleSelectAddress(addr._id)}
                className={`border p-4 rounded-xl cursor-pointer ${
                  selectedAddressId === addr._id
                    ? "border-green-500 bg-green-50"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{addr.fullName}</p>
                  {addr.isDefault && (
                    <span className="text-green-600 text-sm">Mặc định</span>
                  )}
                </div>

                <p>{addr.phone}</p>
                <p>{addr.address}</p>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(addr);
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(addr._id);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div>
          <h2 className="text-2xl font-bold mb-4">Sản phẩm</h2>

          {!cart || cart.items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item: any) => (
                <div
                  key={item.product._id}
                  className="flex justify-between border p-4 rounded-xl bg-white"
                >
                  <div>
                    <img
                      src={item.product.image_url}
                      className="w-16 h-16 object-contain"
                    />
                    <p>{item.product.name}</p>
                    <p>SL: {item.quantity}</p>
                  </div>
                  <p>
                    {(item.product.price * item.quantity).toLocaleString()}₫
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <div className="flex justify-between bg-white p-4 rounded-xl">
              <span>Tổng tiền:</span>
              <span className="text-green-600 font-bold">
                {totalPrice.toLocaleString()}₫
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout/two")}
              className="w-full bg-green-600 text-white py-3 mt-10 rounded-xl"
            >
              Tiếp tục đến phương thức thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
