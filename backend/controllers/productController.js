const Product = require("../models/Product");
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const slugify = require('slugify');
const mongoose = require('mongoose');
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra id hợp lệ
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Tìm product + populate category & supplier
    const product = await Product.findById(id)
      .populate("categoryId", "name") 
      .populate("supplierId", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("Error getProductById:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Vui lòng cung cấp tên sản phẩm" });
    }

    const products = await Product.find({
      name: { $regex: name, $options: 'i' } 
    }).populate('categoryId supplierId');

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getFourProductsByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params; // /products/category/organic

    if (!categorySlug) {
      return res.status(400).json({ message: 'Category slug is required' });
    }

    // Tìm category theo slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Lấy 4 sản phẩm theo categoryId
    const products = await Product.find({ categoryId: category._id })
      .limit(4)
      .sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getProductsBySupplierSlug = async (req, res) => {
  try {
    const { supplierSlug } = req.params;

    // Tìm supplier theo slug
    const supplier = await Supplier.findOne({ slug: supplierSlug });
    if (!supplier) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
    }

    // Lấy tất cả sản phẩm của nhà cung cấp
    const products = await Product.find({ supplierId: supplier._id })
      .populate('categoryId', 'name slug')
      .populate('supplierId', 'name slug');

    res.json({
      supplier: {
        _id: supplier._id,
        name: supplier.name,
        slug: supplier.slug,
      },
      total: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
exports.getProductByCategory = async (req, res) => {
    try {
        const { categorySlug } = req.params; 

        if (!categorySlug) {
            return res.status(400).json({
                success: false,
                message: 'Category slug is required'
            });
        }

        const category = await Category.findOne({ slug: categorySlug });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const products = await Product.find({ categoryId: category._id })
            .populate('categoryId', 'name slug')
            .populate('supplierId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getLatestProduct = async (req, res) => {
    try {
        const latestProducts = await Product.find()
            .sort({ createdAt: -1 }) 
            .limit(8);            

        res.status(200).json(latestProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm mới' });
    }
};
exports.createProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        stock,
        categoryId,
        supplierId,
        organic_certification,
      } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: "Tên và giá là bắt buộc" });
      }

      const image_url = req.file ? req.file.path : "";

      const product = await Product.create({
        name,
        description,
        price,
        stock,
        categoryId,
        supplierId,
        organic_certification,
        image_url,
      });

      res.status(201).json({
        message: "Tạo sản phẩm thành công",
        product,
      });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }
  };

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();

    const products = await Product.find()
      .populate("categoryId", "name slug")
      .populate("supplierId", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("categoryId", "name slug")
      .populate("supplierId", "name");

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const {
      name,
      description,
      price,
      stock,
      categoryId,
      supplierId,
      organic_certification,
    } = req.body;

    // ✅ Chỉ update field có giá trị
    let updateData = {};

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true }); // FIX slug
    }

    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (categoryId) updateData.categoryId = categoryId;
    if (supplierId) updateData.supplierId = supplierId;
    if (organic_certification) updateData.organic_certification = organic_certification;

    // ✅ Update ảnh nếu có
    if (req.file) {
      updateData.image_url = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true, // ✅ validate schema
      }
    );

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({
      message: "Cập nhật thành công",
      product,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

