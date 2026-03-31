import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/Auth/authSlice";
import { clearCart } from "../../redux/Cart/cartSlice";
export const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()); // xóa user khỏi Redux
    dispatch(clearCart()); // xóa cart khỏi Redux
    localStorage.removeItem("accessToken"); // xóa token cũ
    localStorage.removeItem("user"); // xóa info user
    navigate("/");
  };
  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Order", path: "/admin/order" },
    { name: "Profile", path: "/admin/profile" },
    { name: "User", path: "/admin/user" },
    { name: "Product", path: "/admin/product" },
    { name: "Cart", path: "/admin/cart" },
    {
      name: "Address",
      path: "/admin/address",
    },
    { name: "Category", path: "/admin/category" },
    { name: "Supplier", path: "/admin/supplier" },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-[15%] bg-green-500 text-white flex flex-col fixed h-full p-4 overflow-y-auto">
        <Link to="/">
          <h1 className="text-2xl font-semibold mb-4 pl-2">Organic Food</h1>
        </Link>

        <div className="flex flex-col space-y-2">
          {adminMenu.map((menu) => (
            <Link
              to={menu.path}
              key={menu.path}
              className={`flex items-center gap-3 p-3 font-medium rounded-md transition-all ${
                pathname === menu.path
                  ? "bg-green-700 text-white"
                  : "hover:bg-600"
              }`}
            >
              <span>{menu.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="ml-[15%] w-[85%] bg-gray-100 min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm flex items-center py-4 px-8 sticky top-0 z-10">
          <div className="flex items-center gap-5 ml-auto">
            <button onClick={handleLogout}  className="flex items-center gap-1 text-green-500 hover:text-[#4f7f8c] transition">
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-2 py-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
