const Address = require('../models/Address');
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().populate('userId'); 
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 1. Tạo địa chỉ
exports.createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, address, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const newAddress = await Address.create({
      userId,
      fullName,
      phone,
      address,
      isDefault
    });

    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 2. Lấy tất cả
exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id })
      .sort({ isDefault: -1, createdAt: -1 });

    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 3. Lấy theo ID (có check user)
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 4. Update
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.body.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 5. Xóa
exports.deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ 6. Set default
exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    await Address.updateMany({ userId }, { isDefault: false });

    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};