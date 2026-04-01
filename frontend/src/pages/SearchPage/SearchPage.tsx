import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProductApi } from "../../services/productApi";
import type { Product } from "../../types/productType";

export const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "";
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res: Product[] = await searchProductApi(name);
        setProducts(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

  return (
    <div className="p-4 w-[80%] mx-auto">
       <h1 className="my-12 text-2xl text-center text-green-500 font-medium">Kết quả tìm kiếm cho: "{name}"</h1>
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {products.length === 0 && !loading && <div>Không tìm thấy sản phẩm</div>}
      <div className="grid grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            onClick={()=>navigate(`/chi-tiet/${p.slug}`)}
            key={p._id}
            className="border p-2 rounded shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="w-full h-40 object-contain mb-2 rounded"
            />
            <h3 className="font-semibold text-sm line-clamp-1">{p.name}</h3>
            <p className="text-red-500 font-bold mt-1">
              {p.price.toLocaleString()}₫
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
