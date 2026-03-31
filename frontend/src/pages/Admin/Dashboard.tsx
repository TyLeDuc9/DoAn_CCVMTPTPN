// pages/admin/Dashboard.tsx
import { useDashboard } from "../../hooks/useDashboard";

export const Dashboard = () => {
  const { data, loading, error } = useDashboard();

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Tổng đơn hàng</h2>
          <p className="text-2xl font-bold">
            {data?.overview.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Tổng doanh thu</h2>
          <p className="text-2xl font-bold text-red-500">
            {data?.overview.totalRevenue.toLocaleString()} đ
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold mb-3">Trạng thái đơn</h2>
        <div className="flex gap-4 flex-wrap">
          {data?.status.map((s) => (
            <div
              key={s._id}
              className="px-4 py-2 bg-gray-100 rounded"
            >
              {s._id}: <b>{s.count}</b>
            </div>
          ))}
        </div>
      </div>

      {/* REVENUE BY DAY */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold mb-3">Doanh thu theo ngày</h2>
        <div className="space-y-2">
          {data?.revenueByDay.map((r, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {r._id.day}/{r._id.month}/{r._id.year}
              </span>
              <span className="font-medium text-red-500">
                {r.revenue.toLocaleString()} đ
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold mb-3">Top sản phẩm</h2>
        <div className="space-y-3">
          {data?.topProducts.map((p) => (
            <div
              key={p._id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.product.image_url}
                  alt={p.product.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{p.product.name}</p>
                  <p className="text-gray-500 text-sm">
                    Giá: {p.product.price.toLocaleString()} đ
                  </p>
                </div>
              </div>

              <div className="font-bold text-blue-500">
                {p.totalSold} đã bán
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="font-semibold mb-3">Thanh toán</h2>
        <div className="space-y-2">
          {data?.payment.map((p) => (
            <div key={p._id} className="flex justify-between">
              <span>{p._id}</span>
              <span>
                {p.count} đơn - {p.total.toLocaleString()} đ
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};