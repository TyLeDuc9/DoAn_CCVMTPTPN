import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { getMeUser, updateUser } from "../../redux/User/userThunk";

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "unknown" as "male" | "female" | "unknown",
    birthday: "",
  });

  // Load user data vào form khi có userProfile
  useEffect(() => {
    dispatch(getMeUser());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userProfile) {
        setFormData({
          name: userProfile.name || "",
          phone: userProfile.phone || "",
          gender: userProfile.gender || "unknown",
          birthday: userProfile.birthday
            ? new Date(userProfile.birthday).toISOString().substr(0, 10)
            : "",
        });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [userProfile]);

  // Xử lý input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile?._id) return;
    try {
      await dispatch(
        updateUser({ id: userProfile._id, data: formData }),
      ).unwrap();
      alert("Cập nhật thành công!");
      dispatch(getMeUser()); 
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-4">Lỗi: {error}</div>;

  return (
    <div className="w-full mx-auto shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Thông tin cá nhân
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-gray-600 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-600 font-semibold mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-600 font-semibold mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-gray-600 font-semibold mb-1">
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};
