import { FaSearch } from "react-icons/fa";
import { useState , useEffect} from "react";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [query, setQuery] = useState("");
  const { products, loading, error, searchProduct } = useSearchProduct();
  const navigate = useNavigate();
  useEffect(() => {
    if (!query.trim()) return;
    searchProduct(query); // ✅ cập nhật products bên trong hook
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Khi nhấn Enter, chuyển sang trang SearchPage
    navigate(`/search?name=${encodeURIComponent(query.trim())}`);
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   searchProduct(query);
  // };

  return (
    <div className="relative w-80">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border rounded w-full overflow-hidden bg-white text-black"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="px-3 py-1 outline-none w-full"
        />
        <button type="submit" className="px-3">
          <FaSearch />
        </button>
      </form>

      {/* Hiển thị kết quả tìm kiếm */}
      {loading && (
        <div className="absolute bg-white w-full mt-1 p-2 shadow">
          Đang tải...
        </div>
      )}
      {error && (
        <div className="absolute bg-white w-full mt-1 p-2 shadow text-red-500">
          {error}
        </div>
      )}
      {products.length > 0 && (
        <ul className="absolute bg-white w-full mt-1 p-2 shadow max-h-64 overflow-y-auto z-50">
          {products.map((p) => (
            <li
              key={p._id}
              onClick={() => navigate(`chi-tiet/${p.slug}`)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* Ảnh sản phẩm */}
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                  No Image
                </div>
              )}

              {/* Tên và giá */}
              <div className="flex flex-col">
                <span className="text-green-700 font-medium line-clamp-1">
                  {p.name}
                </span>
                <span className="text-red-500 font-medium">
                  {p.price.toLocaleString()}₫
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
