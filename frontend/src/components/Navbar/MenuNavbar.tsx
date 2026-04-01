import { NavLink } from "react-router-dom";
import { FaUser, FaLock, FaBox } from "react-icons/fa";

export const MenuNavbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-green-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-full lg:w-[260px] h-80 bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Tài khoản
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/user/profile" className={linkClass}>
          <FaUser />
          <span>Thông tin cá nhân</span>
        </NavLink>

        <NavLink to="/user/change-password" className={linkClass}>
          <FaLock />
          <span>Đổi mật khẩu</span>
        </NavLink>

        <NavLink to="/user/order" className={linkClass}>
          <FaBox />
          <span>Đơn hàng</span>
        </NavLink>
      </nav>
    </div>
  );
};