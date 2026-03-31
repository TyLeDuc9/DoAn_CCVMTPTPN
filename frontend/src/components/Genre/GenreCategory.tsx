import { useAllCategory } from "../../hooks/useAllCategory";
import { Link } from "react-router-dom";

export const GenreCategory = () => {
  const { categories = [], error, loading } = useAllCategory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!categories.length) return <p>Không có danh mục</p>;

  return (
    <div className="flex flex-col uppercase gap-2">
      {categories.map((item) => (
        <Link
          key={item._id}
          to={`/danh-muc/${item.slug}`}
          className="text-green-600 hover:underline"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};