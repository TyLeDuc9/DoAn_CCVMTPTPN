import React, { useState, useEffect } from "react";
import type { RootState, AppDispatch } from "../../redux/store";
import { clearMessage } from "../../redux/User/userSlice";
import { changePassword } from "../../redux/User/userThunk";
import { useDispatch, useSelector } from "react-redux";
export const ChangePass = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage } = useSelector(
    (state: RootState) => state.user,
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (newPassword !== confirmPassword) {
      setLocalError("Mật khẩu mới và xác nhận mật khẩu không trùng nhau");
      return;
    }

    dispatch(changePassword({ oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch(() => {});
  };

  return (
    <div className="w-full mx-auto  p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Mật khẩu cũ</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {(localError || error) && (
          <p className="text-red-500">{localError || error}</p>
        )}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
};
