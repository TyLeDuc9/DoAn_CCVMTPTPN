
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// 1. Lấy giỏ hàng của user
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.user._id; // req.user đã có _id từ verifyToken
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// 2. Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    // Kiểm tra userId có tồn tại không
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: 'User không hợp lệ' });

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ product: productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // cộng dồn
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// 3. Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: 'User không hợp lệ' });

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Sản phẩm không có trong giỏ' });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// 4. Xóa sản phẩm khỏi giỏ hàng
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: 'User không hợp lệ' });

    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};


exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("userId") // lấy info user
      .populate("items.product"); // lấy info product

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy giỏ hàng",
      error: error.message,
    });
  }
};