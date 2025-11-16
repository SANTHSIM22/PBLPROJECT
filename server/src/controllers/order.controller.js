const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

// Create order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Prepare order items and check stock
    const orderItems = [];
    for (const item of cart.items) {
      const product = item.product;

      // Check if product still available
      if (!product.isAvailable || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} is not available or insufficient stock`,
        });
      }

      orderItems.push({
        product: product._id,
        title: product.title,
        price: item.price,
        quantity: item.quantity,
        artisan: product.artisan,
      });

      // Update product stock and sales
      product.stock -= item.quantity;
      product.salesCount = (product.salesCount || 0) + item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      customer: req.user._id,
      items: orderItems,
      totalAmount: cart.totalAmount,
      shippingAddress,
      paymentStatus: "Completed", // Since no real payment, mark as completed
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    // Populate order details
    await order.populate([
      { path: "customer", select: "username email profile" },
      { path: "items.product" },
      { path: "items.artisan", select: "username profile" },
    ]);

    res.json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get customer's orders
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("items.product")
      .populate("items.artisan", "username profile")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get artisan's orders
exports.getArtisanOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.artisan": req.user._id })
      .populate("customer", "username email profile")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("customer", "username email profile")
      .populate("items.product")
      .populate("items.artisan", "username profile");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if user is authorized
    if (
      order.customer._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      // Check if user is artisan of any item
      const isArtisan = order.items.some(
        (item) => item.artisan._id.toString() === req.user._id.toString()
      );

      if (!isArtisan) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to view this order",
        });
      }
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update order status (for artisan/admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Placed", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check authorization
    if (req.user.role !== "admin") {
      const isArtisan = order.items.some(
        (item) => item.artisan.toString() === req.user._id.toString()
      );

      if (!isArtisan) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this order",
        });
      }
    }

    order.status = status;
    if (status === "Delivered") {
      order.deliveryDate = new Date();
    }

    await order.save();

    await order.populate([
      { path: "customer", select: "username email profile" },
      { path: "items.product" },
      { path: "items.artisan", select: "username profile" },
    ]);

    res.json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if customer owns the order
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order",
      });
    }

    // Can only cancel if not shipped
    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel order that has been shipped or delivered",
      });
    }

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock += item.quantity;
        product.salesCount = Math.max(
          0,
          (product.salesCount || 0) - item.quantity
        );
        await product.save();
      }
    }

    order.status = "Cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};
