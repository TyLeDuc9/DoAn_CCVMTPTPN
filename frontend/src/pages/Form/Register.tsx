import {  FiEye, FiEyeOff } from "react-icons/fi";
import { useRegister } from "../../hooks/useRegister";
import { useTogglePassword } from "../../hooks/useTogglePassword";

export const Register = () => {
  const { formData, error, loading, handleChange, handleSubmit } = useRegister();
  const { showPassword, togglePassword } = useTogglePassword();

  return (
    <div className="flex items-center justify-center min-h-[400px] mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Đăng ký
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <label className="block mb-1 text-sm">Mật khẩu</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};
