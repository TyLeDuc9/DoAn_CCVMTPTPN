const Supplier = require('../models/Supplier');

// ===== CREATE SUPPLIER =====
exports.createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name) return res.status(400).json({ message: "Tên nhà cung cấp bắt buộc" });

    const supplier = await Supplier.create({ name, email, phone, address });
    res.status(201).json({ message: "Tạo nhà cung cấp thành công", supplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== GET ALL SUPPLIERS =====
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== GET SUPPLIER BY ID =====
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Nhà cung cấp không tồn tại" });
    res.json(supplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== UPDATE SUPPLIER =====
exports.updateSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Nhà cung cấp không tồn tại" });

    if (name) supplier.name = name;   // pre-save sẽ tự động update slug
    if (email) supplier.email = email;
    if (phone) supplier.phone = phone;
    if (address) supplier.address = address;

    await supplier.save();
    res.json({ message: "Cập nhật nhà cung cấp thành công", supplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===== DELETE SUPPLIER =====
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Nhà cung cấp không tồn tại" });
    res.json({ message: "Xóa nhà cung cấp thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};