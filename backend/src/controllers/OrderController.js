const OrderService = require("../services/OrderService");
const Order = require("../models/OrderProduct");
const createOrder = async (req, res) => {
  try {
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

// Controller: Cancel order
const cancelOrderDetails = async (req, res) => {
  const { id: orderId } = req.params; // Lấy orderId từ URL params

  try {
    if (!orderId) {
      return res.status(400).json({
        status: "ERR",
        message: "OrderId is required",
      });
    }

    // Call service to cancel the order
    const result = await OrderService.cancelOrderDetails(orderId);

    if (result.status === "ERR") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result); // Return success response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR",
      message: "Something went wrong.",
    });
  }
};
const updatePaymentStatus = async (req, res) => {
  const { id: orderId } = req.params; // Lấy orderId từ URL params
  const { isPaid } = req.body; // Lấy trạng thái thanh toán từ request body

  // Kiểm tra nếu không có orderId hoặc isPaid không hợp lệ
  if (!orderId) {
    return res.status(400).json({
      status: "ERR",
      message: "OrderId is required",
    });
  }

  if (!isPaid || !["pending", "paid", "cancel"].includes(isPaid)) {
    return res.status(400).json({
      status: "ERR",
      message:
        "Invalid payment status. It should be 'pending', 'paid', or 'cancel'.",
    });
  }

  try {
    // Gọi service để cập nhật trạng thái thanh toán
    const result = await OrderService.updatePaymentStatus(orderId, isPaid);

    if (result.status === "ERR") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result); // Trả về kết quả thành công
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR",
      message: "Something went wrong.",
    });
  }
};
const updateOrderDetails = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const updatedData = req.body;

    if (!orderId || !updatedData) {
      return res.status(400).json({
        status: "ERR",
        message: "OrderId and updated data are required",
      });
    }

    const result = await OrderService.updateOrderDetails(orderId, updatedData);

    if (result.status === "ERR") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR",
      message: "Something went wrong.",
    });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};
const searchOrdersByName = async (req, res) => {
  try {
    const { name } = req.query; // Lấy tên cần tìm kiếm từ query params

    if (!name) {
      return res.status(400).json({
        status: "ERR",
        message: "The name query parameter is required.",
      });
    }

    // Gọi service để tìm kiếm đơn hàng
    const response = await OrderService.searchOrdersByName(name);

    if (response.status === "ERR") {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while searching orders.",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  updatePaymentStatus,
  updateOrderDetails,
  searchOrdersByName,
};
