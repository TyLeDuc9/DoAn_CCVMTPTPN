const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Address = require('../models/Address');
exports.getAllOrders = async (req, res) => {
  try {
    // Lấy tất cả đơn hàng, populate user và sản phẩm nếu cần
    const orders = await Order.find()
      .populate('userId', 'name email') // populate thông tin user (chỉ lấy name và email)
      .populate('products.productId', 'name price image_url') // populate thông tin sản phẩm
      .populate('shippingAddressId'); // populate địa chỉ

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng' });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
    const [overview, status, revenueByDay, topProducts, payment] =
      await Promise.all([
        // 1. Tổng đơn + doanh thu
        Order.aggregate([
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalRevenue: { $sum: "$total_amount" },
            },
          },
        ]),

        // 2. Trạng thái
        Order.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]),

        // 3. Doanh thu theo ngày
        Order.aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
                day: { $dayOfMonth: "$createdAt" },
              },
              revenue: { $sum: "$total_amount" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
        ]),

        // 4. Top sản phẩm
        Order.aggregate([
          { $unwind: "$products" },
          {
            $group: {
              _id: "$products.productId",
              totalSold: { $sum: "$products.quantity" },
            },
          },
          { $sort: { totalSold: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
        ]),

        // 5. Payment
        Order.aggregate([
          {
            $group: {
              _id: "$payment_method",
              total: { $sum: "$total_amount" },
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

    res.json({
      overview: overview[0] || { totalOrders: 0, totalRevenue: 0 },
      status,
      revenueByDay,
      topProducts,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi dashboard",
      error: error.message,
    });
  }
};
// Tạo Order từ Cart
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // từ middleware auth
    const { shippingAddressId, payment_method } = req.body;

    // Lấy Cart của user
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Map Cart items thành products cho Order
    const products = cart.items.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const total_amount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Kiểm tra shipping address
    const address = await Address.findById(shippingAddressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Tạo Order
    const order = new Order({
      userId,
      products,
      total_amount,
      shippingAddressId,
      payment_method
    });

    await order.save();

    // Xóa Cart sau khi đặt hàng
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả Order của user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate('products.productId')
      .populate('shippingAddressId')
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy chi tiết 1 Order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('products.productId')
      .populate('shippingAddressId');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật trạng thái Order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // pending, processing, delivered, cancelled

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};