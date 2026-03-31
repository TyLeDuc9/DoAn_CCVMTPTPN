const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message
    });
  }
};
exports.getMeUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, gender, birthday, phone, role } = req.body
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Không có quyền sửa user khác' });
    }
    const updateData = { name, email, gender, birthday, phone, };
    if (req.user.role === 'admin' && role) {
      updateData.role = role;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    const { password: _, ...userWithoutPassword } = updated.toObject();
    res.json({ message: 'Cập nhật thành công', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}
exports.changePassword = async (req, res) => {
  try {
    console.log('req.user từ token:', req.user);
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ mật khẩu cũ và mới" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi server" });
  }
};