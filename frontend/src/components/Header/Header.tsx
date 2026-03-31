import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa"; // Thêm icon menu
import { GenreCategory } from "../Genre/GenreCategory";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/Auth/authSlice";
import { clearCart } from "../../redux/Cart/cartSlice";
import { Search } from "../Search/Search";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth) as any;
  const { cart } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State cho Mobile Menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { name: "Giới thiệu", path: "/gioi-thieu" },
    { name: "Tất cả sản phẩm", path: "/tat-ca-san-pham" },
    { name: "Danh mục", dropdown: true },
    { name: "Nhà cung cấp", path: "/nha-cung-cap" },
    ...(user
      ? []
      : [
          { name: "Đăng ký", path: "/dang-ky" },
          { name: "Đăng nhập", path: "/dang-nhap" },
        ]),
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      return;
    }
    navigate("/gio-hang");
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-green-500 text-white sticky top-0 z-[100] shadow-md">
      <header className="flex items-center justify-between p-4 lg:p-6 w-[88%] mx-auto relative">
        {/* LOGO */}
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold italic whitespace-nowrap"
        >
          Organic Food
        </Link>

        {/* SEARCH - Ẩn trên mobile nếu quá chật, hoặc hiển thị thu nhỏ */}
        <div className="hidden md:block flex-1 mx-8">
          <Search />
        </div>

        {/* RIGHT SECTION: Cart & Hamburger */}
        <div className="flex items-center gap-4">
          {/* Cart Icon luôn hiện */}
          <div
            onClick={handleCartClick}
            className="relative text-xl cursor-pointer mr-6"
          >
            <FaShoppingCart />
            {(cart?.items?.length ?? 0) > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex justify-center items-center rounded-full border-2 border-green-500">
                {cart?.items?.length}
              </span>
            )}
          </div>

          {/* Hamburger Button (Chỉ hiện trên Mobile/Tablet) */}
          <button
            className="text-2xl lg:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* NAVIGATION MENU */}
        <nav
          className={`
          absolute lg:static top-full left-0 w-full lg:w-auto bg-green-600 lg:bg-transparent
          flex flex-col lg:flex-row items-center gap-4 lg:gap-6 font-medium
          transition-all duration-300 ease-in-out p-6 lg:p-0
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}
        `}
        >
          {/* Search box chỉ hiện trong menu khi ở mobile */}
          <div className="w-full md:hidden mb-4">
            <Search />
          </div>

          {navItems.map((item, index) => (
            <div key={index} className="relative w-full lg:w-auto text-center">
              {item.dropdown ? (
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Cho mobile tap
                  className="cursor-pointer py-2 lg:py-0"
                >
                  {item.name}
                  {dropdownOpen && (
                    <div className="lg:absolute top-full left-1/2 lg:-translate-x-1/2 bg-white text-black shadow-xl mt-2 rounded-lg p-3 min-w-[200px] z-50">
                      <GenreCategory />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className="block py-2 lg:py-0 hover:text-green-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* USER ACTIONS */}
          {user && (
            <div className="flex flex-col lg:flex-row items-center gap-4 border-t lg:border-none border-green-400 pt-4 lg:pt-0 w-full lg:w-auto">
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:underline "
                >
                  Admin
                </Link>
              )}

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/user");
                  setIsMenuOpen(false);
                }}
              >
                <FaUser />
                <span className="lg:hidden">{user.name || "Tài khoản"}</span>
              </div>

              <button
                onClick={handleLogout}
                className="text-white px-4 py-1 rounded-full transition"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};
