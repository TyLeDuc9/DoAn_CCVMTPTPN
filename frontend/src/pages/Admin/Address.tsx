import { useAllAddress } from "../../hooks/useAllAddress";

export const Address = () => {
  const { addresses, loading, error } = useAllAddress();

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý địa chỉ</h1>

      </div>

      {/* List Address */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500">Chưa có địa chỉ nào</p>
        ) : (
          addresses.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">
                    {item.fullName}
                    {item.isDefault && (
                      <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        Mặc định
                      </span>
                    )}
                  </p>
                  <p className="text-gray-600">{item.phone}</p>
                </div>

                <div className="flex gap-3">
                  <button className="text-blue-500 hover:underline">
                    Sửa
                  </button>
                  <button className="text-red-500 hover:underline">
                    Xoá
                  </button>
                </div>
              </div>

              {/* Address */}
              <p className="mt-2 text-gray-700">{item.address}</p>

              {/* User info (do đã populate) */}
              <p className="mt-2 text-sm text-gray-400">
                User: {item.userId?.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};